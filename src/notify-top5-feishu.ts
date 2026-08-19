import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { toCstDateStr } from "./date.ts";

interface Top5Payload {
  date: string;
  usedLlm: boolean;
  picks: Array<{
    rank: number;
    title: string;
    url: string;
    score: number;
    reason: string;
    audience: string;
    risk: string;
    source?: string;
    signals?: string[];
  }>;
}

const PAGES_URL_DEFAULT = "https://duanyytop.github.io/agents-radar";

function getWebhookUrls(): string[] {
  const raw = process.env["FEISHU_WEBHOOK_URLS"] ?? process.env["FEISHU_WEBHOOK_URL"] ?? "";
  return raw
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
}

function getPagesUrl(): string {
  return (process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
}

function loadPayload(): Top5Payload | null {
  const date = process.env["TOP5_DATE"] ?? toCstDateStr(new Date());
  const file = path.join("digests", date, "top5.json");
  if (!fs.existsSync(file)) {
    console.log("[top5:feishu] " + file + " not found; skipping.");
    return null;
  }
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Top5Payload;
}

function buildContent(payload: Top5Payload): string {
  const pagesUrl = getPagesUrl();
  const htmlUrl = pagesUrl + "/digests/" + payload.date + "/top5.html";
  const lines = [
    "**Agents Radar Top 5 · " + payload.date + "**",
    "",
    "今日已抓取 30 条候选链接，并" + (payload.usedLlm ? "由 LLM 重排" : "使用规则兜底") + "生成 5 条推荐。",
    "",
  ];

  for (const pick of payload.picks) {
    lines.push("**" + pick.rank + ". [" + pick.title + "](" + pick.url + ") · " + pick.score + "**");
    lines.push("- 来源：" + (pick.source ?? "Unknown") + "；信号：" + (pick.signals ?? []).join("，"));
    lines.push("- 推荐理由：" + pick.reason);
    lines.push("- 适合：" + pick.audience);
    lines.push("- 注意：" + pick.risk);
    lines.push("");
  }

  lines.push("[打开适配手机和电脑的阅读版](" + htmlUrl + ")");
  return lines.join("\n");
}

async function sendToOneWebhook(webhookUrl: string, title: string, content: string): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      msg_type: "interactive",
      card: {
        header: {
          title: { tag: "plain_text", content: title },
          template: "blue",
        },
        elements: [{ tag: "markdown", content }],
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error("Feishu API " + res.status + ": " + body);
  }
}

async function main(): Promise<void> {
  const urls = getWebhookUrls();
  if (!urls.length) {
    console.log("[top5:feishu] FEISHU_WEBHOOK_URLS not set; skipping.");
    return;
  }

  const payload = loadPayload();
  if (!payload) return;

  const title = "Agents Radar Top 5 · " + payload.date;
  const content = buildContent(payload);
  const results = await Promise.allSettled(urls.map((url) => sendToOneWebhook(url, title, content)));
  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length) {
    const messages = failures.map((result) => (result as PromiseRejectedResult).reason);
    console.error("[top5:feishu] " + failures.length + "/" + urls.length + " webhook(s) failed:", messages);
    if (failures.length === urls.length) throw new Error("All Feishu webhooks failed");
  }
  console.log("[top5:feishu] Done!");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error("[top5:feishu]", err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
