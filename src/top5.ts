import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { fetchHnData } from "./hn.ts";
import { fetchTrendingData } from "./trending.ts";
import { fetchLobstersData } from "./lobsters.ts";
import { toCstDateStr } from "./date.ts";
import { callLlm, parseLlmJson } from "./report.ts";

type SourceName = "GitHub Trending" | "GitHub Search" | "Hacker News" | "Lobsters";

interface RadarLink {
  title: string;
  url: string;
  source: SourceName;
  sourceScore: number;
  freshnessScore: number;
  relevanceScore: number;
  popularityScore: number;
  totalScore: number;
  ruleReason: string;
  details: string[];
}

interface LlmPick {
  rank: number;
  title: string;
  url: string;
  score: number;
  reason: string;
  audience: string;
  risk: string;
}

interface LlmTop5Response {
  picks: LlmPick[];
}

interface Top5Payload {
  date: string;
  generatedAt: string;
  usedLlm: boolean;
  fallbackError?: string;
  picks: Array<LlmPick & { source?: SourceName; signals?: string[] }>;
  candidates: RadarLink[];
}

const TARGET_LINKS = 30;
const TOP_PICKS = 5;
const RERANK_TOKENS = 2048;

const KEYWORDS = [
  "agent", "agents", "ai", "llm", "openai", "claude", "deepseek", "rag", "vector",
  "coding", "cli", "workflow", "automation", "developer", "model", "inference", "browser", "search",
];

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      parsed.searchParams.delete(key);
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url.trim();
  }
}

function keywordScore(text: string): number {
  const haystack = text.toLowerCase();
  return KEYWORDS.reduce((sum, word) => sum + (haystack.includes(word) ? 4 : 0), 0);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scoreItem(item: Omit<RadarLink, "totalScore" | "ruleReason">): RadarLink {
  const totalScore = clampScore(item.sourceScore + item.freshnessScore + item.relevanceScore + item.popularityScore);
  const ruleReason = [
    item.source,
    item.details[0] ?? "link signal",
    item.relevanceScore >= 18 ? "high AI/Agent match" : "topic match",
  ].join(" - ");

  return { ...item, totalScore, ruleReason };
}

function dedupe(items: RadarLink[]): RadarLink[] {
  const seen = new Set<string>();
  const output: RadarLink[] = [];

  for (const item of items) {
    const normalized = normalizeUrl(item.url);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push({ ...item, url: normalized });
  }

  return output;
}

function markdownEscape(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function collectLinks(): Promise<RadarLink[]> {
  const [trending, hn, lobsters] = await Promise.all([fetchTrendingData(), fetchHnData(), fetchLobstersData()]);
  const items: RadarLink[] = [];

  for (const repo of trending.trendingRepos) {
    items.push(scoreItem({
      title: repo.fullName,
      url: repo.url,
      source: "GitHub Trending",
      sourceScore: 22,
      freshnessScore: repo.todayStars > 0 ? 18 : 10,
      relevanceScore: keywordScore(repo.fullName + " " + repo.description + " " + repo.language),
      popularityScore: Math.min(26, repo.todayStars * 2 + Math.log10(repo.totalStars + 1) * 4),
      details: [String(repo.todayStars) + " stars today", repo.language || "unknown language"],
    }));
  }

  for (const repo of trending.searchRepos) {
    items.push(scoreItem({
      title: repo.fullName,
      url: repo.url,
      source: "GitHub Search",
      sourceScore: 18,
      freshnessScore: 16,
      relevanceScore: keywordScore(repo.fullName + " " + (repo.description ?? "") + " " + repo.searchQuery) + 8,
      popularityScore: Math.min(24, Math.log10(repo.stargazersCount + 1) * 6),
      details: [String(repo.stargazersCount) + " stars", "topic: " + repo.searchQuery],
    }));
  }

  for (const story of hn.stories) {
    items.push(scoreItem({
      title: story.title,
      url: story.url,
      source: "Hacker News",
      sourceScore: 18,
      freshnessScore: 18,
      relevanceScore: keywordScore(story.title),
      popularityScore: Math.min(26, story.points / 8 + story.comments / 5),
      details: [String(story.points) + " points", String(story.comments) + " comments"],
    }));
  }

  for (const story of lobsters.stories) {
    items.push(scoreItem({
      title: story.title,
      url: story.url,
      source: "Lobsters",
      sourceScore: 14,
      freshnessScore: 14,
      relevanceScore: keywordScore(story.title + " " + story.tags.join(" ")),
      popularityScore: Math.min(20, story.score * 2 + story.commentCount),
      details: [String(story.score) + " score", String(story.commentCount) + " comments"],
    }));
  }

  return dedupe(items).sort((a, b) => b.totalScore - a.totalScore).slice(0, TARGET_LINKS);
}

function buildRerankPrompt(links: RadarLink[]): string {
  const candidates = links.map((item, index) => ({
    id: index + 1,
    title: item.title,
    url: item.url,
    source: item.source,
    ruleScore: item.totalScore,
    signals: item.details,
    ruleReason: item.ruleReason,
  }));

  return [
    "You are an information radar editor for open-source AI tools.",
    "Select exactly 5 recommendations from the 30 candidates.",
    "Optimize for: usefulness to builders, novelty, project quality, practical value, and signal diversity.",
    "Avoid picking near-duplicates. Prefer projects or links with clear hands-on value.",
    "Return only valid JSON, no markdown fences.",
    "Schema: {\"picks\":[{\"rank\":1,\"title\":\"...\",\"url\":\"...\",\"score\":90,\"reason\":\"Chinese reason\",\"audience\":\"Chinese audience\",\"risk\":\"Chinese caveat\"}]}",
    "Candidates:",
    JSON.stringify(candidates, null, 2),
  ].join("\n");
}

function fallbackPicks(links: RadarLink[]): LlmPick[] {
  return links.slice(0, TOP_PICKS).map((item, index) => ({
    rank: index + 1,
    title: item.title,
    url: item.url,
    score: item.totalScore,
    reason: item.ruleReason,
    audience: "Builders tracking AI tools and open-source projects.",
    risk: "Rule-ranked fallback; not LLM reranked.",
  }));
}

async function rerankWithLlm(links: RadarLink[]): Promise<{ picks: LlmPick[]; usedLlm: boolean; error?: string }> {
  try {
    const raw = await callLlm(buildRerankPrompt(links), RERANK_TOKENS);
    const parsed = parseLlmJson<LlmTop5Response>(raw);
    const knownUrls = new Set(links.map((item) => item.url));
    const picks = (parsed.picks ?? [])
      .filter((pick) => knownUrls.has(normalizeUrl(pick.url)))
      .slice(0, TOP_PICKS)
      .map((pick, index) => ({ ...pick, rank: index + 1, url: normalizeUrl(pick.url) }));

    if (picks.length !== TOP_PICKS) {
      throw new Error("LLM returned " + picks.length + " valid picks, expected " + TOP_PICKS);
    }

    return { picks, usedLlm: true };
  } catch (err) {
    return { picks: fallbackPicks(links), usedLlm: false, error: String(err) };
  }
}

function findSource(links: RadarLink[], url: string): RadarLink | undefined {
  const normalized = normalizeUrl(url);
  return links.find((item) => item.url === normalized);
}

function enrichPicks(links: RadarLink[], picks: LlmPick[]): Top5Payload["picks"] {
  return picks.map((pick) => {
    const source = findSource(links, pick.url);
    return { ...pick, source: source?.source, signals: source?.details };
  });
}

function buildReport(payload: Top5Payload): string {
  const lines = [
    "# Agents Radar Top 5 - " + payload.date,
    "",
    "> Collected and deduped " + payload.candidates.length + " links, rule-scored the candidate pool, then " + (payload.usedLlm ? "reranked with LLM" : "used rule fallback") + " to produce 5 recommendations.",
    "",
  ];

  if (payload.fallbackError) {
    lines.push("> Rerank fallback reason: " + markdownEscape(payload.fallbackError));
    lines.push("");
  }

  lines.push("## Top 5 Recommendations");
  lines.push("");

  for (const pick of payload.picks) {
    lines.push("### " + pick.rank + ". [" + pick.title + "](" + pick.url + ")");
    lines.push("");
    lines.push("- Score: " + pick.score);
    lines.push("- Source: " + (pick.source ?? "Unknown"));
    lines.push("- Why: " + pick.reason);
    lines.push("- Best for: " + pick.audience);
    lines.push("- Watch out: " + pick.risk);
    if (pick.signals) lines.push("- Signals: " + pick.signals.join(", "));
    lines.push("");
  }

  lines.push("## 30-Candidate Pool");
  lines.push("");
  lines.push("| # | Rule score | Source | Title | Signals |");
  lines.push("|---:|---:|---|---|---|");

  for (const [index, item] of payload.candidates.entries()) {
    lines.push("| " + (index + 1) + " | " + item.totalScore + " | " + item.source + " | [" + markdownEscape(item.title) + "](" + item.url + ") | " + markdownEscape(item.details.join(", ")) + " |");
  }

  lines.push("");
  lines.push("_Generated by agents-radar top5._");
  lines.push("");
  return lines.join("\n");
}

function buildHtml(payload: Top5Payload): string {
  const cards = payload.picks.map((pick) => `
    <article class="pick">
      <div class="score">${pick.score}</div>
      <div>
        <a class="title" href="${escapeHtml(pick.url)}" target="_blank" rel="noreferrer">${pick.rank}. ${escapeHtml(pick.title)}</a>
        <p class="why">${escapeHtml(pick.reason)}</p>
        <dl>
          <div><dt>Best for</dt><dd>${escapeHtml(pick.audience)}</dd></div>
          <div><dt>Watch out</dt><dd>${escapeHtml(pick.risk)}</dd></div>
          <div><dt>Signal</dt><dd>${escapeHtml([pick.source ?? "Unknown", ...(pick.signals ?? [])].join(" · "))}</dd></div>
        </dl>
      </div>
    </article>`).join("\n");

  const rows = payload.candidates.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.totalScore}</td>
        <td>${escapeHtml(item.source)}</td>
        <td><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a></td>
        <td>${escapeHtml(item.details.join(", "))}</td>
      </tr>`).join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Agents Radar Top 5 - ${escapeHtml(payload.date)}</title>
  <style>
    :root { --bg:#f6f7fb; --panel:#fff; --ink:#172033; --muted:#667085; --line:#dfe4ee; --blue:#245fd3; --green:#13795b; }
    * { box-sizing: border-box; }
    body { margin:0; background:var(--bg); color:var(--ink); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, "Microsoft YaHei", sans-serif; line-height:1.55; }
    main { width:min(1040px, calc(100vw - 28px)); margin:0 auto; padding:28px 0 44px; }
    header { display:flex; justify-content:space-between; gap:16px; align-items:flex-end; margin-bottom:18px; }
    h1 { margin:0 0 6px; font-size:clamp(28px, 5vw, 46px); line-height:1.08; letter-spacing:0; }
    .meta { color:var(--muted); margin:0; }
    .badge { border:1px solid var(--line); background:var(--panel); border-radius:999px; padding:6px 12px; color:var(--muted); white-space:nowrap; }
    .grid { display:grid; gap:12px; }
    .pick { display:grid; grid-template-columns:64px 1fr; gap:14px; padding:16px; background:var(--panel); border:1px solid var(--line); border-radius:10px; box-shadow:0 10px 26px rgba(23,32,51,.06); }
    .score { width:56px; height:56px; border-radius:10px; display:grid; place-items:center; background:#eef6f2; color:var(--green); font-size:20px; font-weight:800; }
    .title { color:var(--blue); font-size:19px; font-weight:800; text-decoration:none; word-break:break-word; }
    .why { margin:7px 0 12px; font-size:15px; }
    dl { margin:0; display:grid; gap:7px; }
    dl div { display:grid; grid-template-columns:86px 1fr; gap:8px; }
    dt { color:var(--muted); font-weight:700; }
    dd { margin:0; }
    h2 { margin:28px 0 10px; font-size:20px; }
    .table-wrap { overflow:auto; background:var(--panel); border:1px solid var(--line); border-radius:10px; }
    table { width:100%; border-collapse:collapse; min-width:760px; }
    th, td { padding:10px 12px; border-bottom:1px solid var(--line); text-align:left; vertical-align:top; }
    th { color:var(--muted); font-size:13px; }
    td:first-child, td:nth-child(2) { width:58px; font-weight:700; }
    footer { margin-top:22px; color:var(--muted); font-size:13px; }
    @media (max-width: 680px) { main { width:min(100vw - 20px, 1040px); padding-top:18px; } header { display:block; } .badge { display:inline-block; margin-top:12px; } .pick { grid-template-columns:50px 1fr; padding:13px; } .score { width:44px; height:44px; font-size:17px; } .title { font-size:17px; } dl div { grid-template-columns:1fr; gap:0; } }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>Agents Radar Top 5</h1>
        <p class="meta">${escapeHtml(payload.date)} · ${payload.candidates.length} candidates · ${payload.usedLlm ? "LLM reranked" : "rule fallback"}</p>
      </div>
      <span class="badge">GMT+8 18:00 daily radar</span>
    </header>
    <section class="grid">${cards}
    </section>
    <h2>30-Candidate Pool</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Score</th><th>Source</th><th>Title</th><th>Signals</th></tr></thead>
        <tbody>${rows}
        </tbody>
      </table>
    </div>
    <footer>Generated by agents-radar top5.</footer>
  </main>
</body>
</html>
`;
}

async function main(): Promise<void> {
  const dateStr = toCstDateStr(new Date());
  console.log("[top5] Collecting " + TARGET_LINKS + " links...");
  const links = await collectLinks();
  console.log("[top5] Reranking with LLM...");
  const rerank = await rerankWithLlm(links);
  const payload: Top5Payload = {
    date: dateStr,
    generatedAt: new Date().toISOString(),
    usedLlm: rerank.usedLlm,
    fallbackError: rerank.error,
    picks: enrichPicks(links, rerank.picks),
    candidates: links,
  };

  const dir = path.join("digests", dateStr);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "top5.md"), buildReport(payload), "utf-8");
  fs.writeFileSync(path.join(dir, "top5.html"), buildHtml(payload), "utf-8");
  fs.writeFileSync(path.join(dir, "top5.json"), JSON.stringify(payload, null, 2) + "\n", "utf-8");

  console.log("[top5] Saved " + path.join(dir, "top5.md"));
  console.log("[top5] Saved " + path.join(dir, "top5.html"));
  console.log("[top5] Rerank: " + (rerank.usedLlm ? "LLM" : "rule fallback"));
  console.log("[top5] Top " + TOP_PICKS + ":");
  for (const pick of payload.picks) {
    console.log("  " + pick.rank + ". " + pick.score + " " + pick.title);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
