# AI CLI Tools Community Digest 2026-08-20

> Generated: 2026-08-20 01:09 UTC | Tools covered: 9

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool AI CLI Comparison Report — 2026-08-20

## 1. Ecosystem Overview

The AI CLI tool landscape is maturing rapidly, with **Claude Code, OpenAI Codex, Gemini CLI, and Copilot CLI** as the dominant commercial players, while **OpenCode, Pi, Qwen Code, and DeepSeek TUI** carve out significant open-source niches. Across all eight tools, the community's focus has shifted from basic codegen to **multi-agent orchestration, cross-tool standardization, security hardening, and reliability under parallel workloads**. Standardization pressure is mounting—Claude Code's AGENTS.md issue (4,669 👍) signals that users expect interoperable configuration, not siloed ecosystems. Meanwhile, **Windows support, MCP protocol maturity, and sandbox/permission consistency** are recurring pain points across every tool, indicating that foundational infrastructure still lags behind feature velocity.

---

## 2. Activity Comparison

| Tool | Issues Active Today | PRs Active Today | Releases Today | Notable |
|---|---|---|---|---|
| **Claude Code** | 50 | 1 | 2 (v2.1.236, v2.1.237) | AGENTS.md issue at 4,669 👍; 2 security gaps newly reported |
| **OpenAI Codex** | ~30 | 10 (all closed) | 1 (rust-v0.149.0-alpha.2) | Heavy security hardening (Git isolation); Windows/MCP leak reports dominate |
| **Gemini CLI** | 10 flagged hot | 10 (5 merged) | 2 (v0.57.0-preview.0, v0.56.0) | Subagent reliability false-success is #1 concern; Whisper hardening landed |
| **Copilot CLI** | 27 | 0 (maintainers shipping direct) | 5 (v1.0.81-2 through -5) | Regressions in sandbox, MCP handshake, and terminal input in 1.0.81 series |
| **Kimi Code** | 1 | 0 | 0 | ACP Grep/Glob restriction closed without comment — low transparency |
| **OpenCode** | 10 hot | 10 (5 closed) | 0 | Billing/credit issues on Go subscription; V2 development aggressive |
| **Pi** | 12 closed | 10 (7 merged) | 0 | Heavy bug-fix day; session-scoped model persistence landed (#5263 → #8356) |
| **Qwen Code** | 10 hot | 10 (most closed) | 1 (v0.21.14) | `/effort max` bricks sessions on OpenAI-compatible; token-count fix in-flight |
| **DeepSeek TUI** | 10 highlighted | 10 (5 closed) | 0 | v0.9.10 release lane (76 commits) — retention, identity, durable approvals |

**Density note:** Copilot CLI is shipping more releases per day than any other tool but merging zero community PRs — a sustain-maintenance phase. Gemini and Pi have the highest merge-throughput per PR count.

---

## 3. Shared Feature Directions

The following requirements appear across **multiple** tool communities, representing cross-cutting user demand:

| Requirement | Tools Where It Appears | Specific Signals |
|---|---|---|
| **Cross-tool config standardization (AGENTS.md)** | Claude Code, (implied: Codex, Amp, Cursor) | #6235 at 4,669 👍 — CLAUDE.md isolates CC from multi-agent workflows |
| **Subagent reliability & truthful completion signals** | Gemini CLI, OpenCode, DeepSeek TUI, Qwen Code | Gemini #22323 (false "GOAL success"), OpenCode #37852 (aborted stream = clean stop), Qwen #9509 (launch failures reported as success), DeepSeek #1425 (hang indistinguishable from death) |
| **Configurable per-model/per-provider settings** | Pi, Codex, Qwen, Copilot | Compaction model decoupled (#22486), reasoning effort persistence (#4530), thinking-level catalog accuracy (#8336) |
| **MCP protocol hardening & interoperability** | Copilot, OpenCode, Kimi, DeepSeek | OAuth discovery failures (#4480), mixed protocol versions (#4525), ACP Grep/Glob blocking (#2609), typed image content (#5515) |
| **Permission/sandbox consistency** | Copilot, Claude Code, Gemini, Pi | Sandbox override violations (#4521/#4522), Read bypasses deny (#84634), deterministic redaction (#26525), consent on env changes (#28863) |
| **Billing/usage transparency** | OpenCode, Claude Code, Qwen | Go subscription credit drain (#43409), agent-hours metric (#88085), token-count leaks across model switches (#9454) |
| **Cross-session state & orchestration** | Claude Code, OpenCode, Gemini, Pi | `notify_when_idle` (CC 2.1.236), optimistic prompt admission (#43520), hot-reload (#43538), GCS trajectory logging (#28922), session-scoped persistence (#8356) |
| **Windows first-class support** | Every tool with a desktop/CLI | Keybinding conflicts, path handling (`\\?\` verbatim), process leaks, MCP server reaping, Computer Use screenshot failures |

---

## 4. Differentiation Analysis

| Tool | Primary Focus | Target User | Technical Approach | Key Differentiator |
|---|---|---|---|---|
| **Claude Code** | Conversational coding with deep enterprise reliance on the Claude model family | Professional developers in large orgs; multi-agent workflows | Heavy prompt engineering; anthropic-owned model stack; sandbox via permissions | AGENTS.md pressure suggests it's becoming the **default standard** against which others are measured |
| **OpenAI Codex** | Rust-based agent platform emphasizing control and security | Developers running automated/parallel workflows | Rust core; plugin marketplace; strict known-safe classification for tools; Guardian extension system | Security-first posture (Git isolation, credential refresh) — most rigorous plugin/security architecture |
| **Gemini CLI** | Multi-model agent via Google's Gemini ecosystem | Developers wanting tight Google integration (Cloud Workstations, GCS) | Open-source; strong subagent hierarchy; Whisper/Speech input; sandbox variant | Fastest PR merge cadence; uniquely invests in **trajectory sharing and observability** |
| **Copilot CLI** | Enterprise-managed AI pair programming | GitHub-heavy orgs with managed policies | Managed settings, org model catalogs, prompt-mode (`-p`) for CI/CD | **Enterprise compliance** — but suffers most from sandbox and MCP regressions |
| **Kimi Code** | Minimal, fast CLI for Moonshot models | Developers seeking a lightweight alternative | ACP (Agent Client Protocol) integration for editor/IDE contexts | **Smallest surface area** — but ACP restrictiveness and opaqueness hinder adoption |
| **OpenCode** | Ambitious open-source v2 platform (TUI + desktop + web) | Power users wanting self-hosted, multi-provider flexibility | TypeScript; schema-mint IDs; optimistic prompt admission; hot-reload; cross-spawn fixes | **Most aggressive feature velocity** in open-source; billing transparency gaps are a trust risk |
| **Pi** | Dev-facing conversational CLI with interactive TUI | TUI-affinity developers; mixed local+cloud backends | Go; adapter-based multi-provider routing; visual-line caching; user-agent identification | **Most polished bug-fix discipline** — 12 issues/PRs closed in a day; strong Windows tracking |
| **Qwen Code** | Qwen-ecosystem agent with team/coordination features | Alibaba/China-market developers; multi-agent teams | Electron→Tauri consolidation; Aone Code review chain; DingTalk integration | **Most China-ecosystem-integrated**; CI resilience is a growing concern |
| **DeepSeek TUI** | Interactive TUI for DeepSeek models | DeepSeek power users, long-session analysts | Rust; i18n dictionary spine; durable approval logs; MCP typed content | **Strongest long-session memory management**; Chinese localization is a strategic wedge |

**Core technical differentiations:**
- **Security model:** Codex (Git isolation) > Copilot (managed settings) > Claude Code (permissions.deny) > others
- **Orchestration:** OpenCode (optimistic admission, hot-reload) and Gemini (trajectory sharing) lead
- **Enterprise readiness:** Copilot (managed policy) and Claude Code (enterprise proxies) lead; OpenCode/DeepSeek lag

---

## 5. Community Momentum & Maturity

**Rapidly iterating (high release & PR velocity):**
- **OpenCode** — V2 development is aggressive: optimistic prompt admission, hot-reload, interrupt simplification, 10 PRs in a day. Expect instability alongside speed.
- **Gemini CLI** — Two releases today, 10 PRs, 5 merged; subagent reliability fixes are top-of-mind. High community engagement on correctness.
- **DeepSeek TUI** — 76-commit release lane in flight; 12 issues/PRs closed in a day. Newer project but disciplined pace.
- **Qwen Code** — Shipping fixes for P1 bugs within a day (token counts, agent launch errors). High responsiveness, but CI fragility is a concern.

**Stable but reactive:**
- **Claude Code** — Two minor releases, but the AGENTS.md issue at 4,669 👍 is a **strategic inflection point**; community expects cross-tool support within weeks, not months.
- **Copilot CLI** — Five patches in 24h but zero community PRs merged; this is a maintenance treadmill, not a feature engine. Regression cluster (sandbox, MCP, terminal input) suggests QA debt.

**Community engagement intensity (by issue depth & upvote counts):**
1. **Claude Code** (deepest engagement — 4,669 👍 on standardization; multi-issue 100+ 👍)
2. **Copilot CLI** (high engagement on bugs, but features are shallow)
3. **OpenCode** (high topic diversity; billing issues are attracting rapid reaction)
4. **Gemini CLI** (focused, technical, reliability-driven)
5. **Pi** (most sustainable discipline — consistent small wins)
6. **Qwen Code** (responsive but smaller user base)
7. **DeepSeek TUI** (young, passionate, Chinese-community-driven)
8. **Kimi Code** (lowest engagement; closed-without-comment raises transparency concerns)

**Maturity signal:** Claude Code's AGENTS.md demand is the **single most significant community-driven standardization request** in the ecosystem. Its outcome will likely define cross-tool config conventions for years.

---

## 6. Trend Signals

1. **AGENTS.md is becoming the de facto cross-tool standard.** Claude Code's 4,669 👍 is not just a feature request — it's a **mandate**. Expect Anthropic to ship AGENTS.md support with a CLAUDE.md fallback in a minor release soon, and for other tools to follow suit as users adopt shared configs for multi-agent teams.

2. **Subagent reliability is the new correctness frontier.** False "success" reports (Gemini #22323, Qwen #9509, OpenCode #37852) erode trust across every tool. The industry is converging on the need for **truthful, observable completion signals** and **surfaced failure modes** — not just "the model stopped." Expect tool teams to add explicit outcome metadata (success/failure/aborted) and trajectory sharing (Gemini's GCS approach, CC's `notify_when_idle`).

3. **Windows support is a compounding liability.** Every tool — especially Copilot, Codex, Claude Code, and DeepSeek TUI — faces Windows-specific process leaks, path-handling bugs, and terminal-emulator incompatibilities. As AI CLIs become daily drivers for enterprise devs on Windows, **these gaps are becoming competitive differentiators**. Expect a Windows-hardening wave across all tools within 2–3 quarters.

4. **MCP protocol maturity is lagging its adoption curve.** Copilot's OAuth discovery breaks (#4480), mixed protocol versions (#4525), Kimi's ACP restrictions (#2609), and OpenCode's plugin version mismatches (#43460) all point to an **immature extension ecosystem**. The protocol is winning, but the *implementations* are brittle. Widespread fixes are needed before MCP becomes a trusted integration layer.

5. **Billing & cost transparency is becoming a trust issue.** OpenCode's Go subscription drains 42% in 4 hours (#43409), Qwen's token counts leak across model switches (#9454), and Claude Code's "agent-hours" proposal (#88085) — users increasingly treat AI agents as **labor**, not API calls, and demand auditability. Tools that expose clear, real-time usage metrics will win enterprise trust.

6. **Sandbox and permission models are inconsistent across tools — and sometimes within a tool.** Claude Code's Read-bypasses-deny (#84634) and Copilot's sandbox-override (#4521/#4522) are security-relevant defects that **undermine the entire safety model** when discovered. Expect security-hardening PRs (like Codex's Git isolation #39520/#39524) to become a template for other tools.

7. **Cross-session orchestration and state persistence are emerging as core features.** From Claude Code's `notify_when_idle` to OpenCode's optimistic prompt admission and hot-reload, to Pi's session-scoped model persistence — the community is building **multi-session, multi-agent workflows** as a primary use case. Tools that don't offer graceful session state, resumability, and state-carrying primitives will be left behind for complex agent teams.

8. **Open-source alternatives are closing the feature gap.** OpenCode's V2, Pi's disciplined bug-fix pace, and DeepSeek TUI's rapid release lanes demonstrate that **OSS AI CLIs are no longer "budget options"** — they're credible alternatives for power users who want control, transparency, and customization.

---

## Bottom Line for Technical Decision-Makers

- **Choose Claude Code** if you need the most mature model integration and are planning multi-agent workflows (but wait for AGENTS.md support).
- **Choose OpenAI Codex** for security-critical automation and plugin-heavy environments (Rust performance, best security posture).
- **Choose Gemini CLI** for Google-cloud-native teams wanting fast iteration and strong observability.
- **Choose Copilot CLI** for GitHub-managed enterprises, but be prepared for sandbox/MCP regressions in the 1.0.81 series.
- **Consider OpenCode or Pi** if you want OSS transparency, aggressive feature velocity, and are comfortable managing rapid-change instability.
- **Monitor Qwen Code** for China-market teams; **DeepSeek TUI** for DeepSeek-model-centric long-session work.

---

*Generated 2026-08-20 from community digests of anthropics/claude-code, openai/codex, google-gemini/gemini-cli, github/copilot-cli, MoonshotAI/kimi-cli, anomalyco/opencode, badlogic/pi-mono (earendil-works), QwenLM/qwen-code, and Hmbown/DeepSeek-TUI (CodeWhale).*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-08-20 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The five most-discussed Skills in the repository, ranked by community attention:

**#1 — skill-creator bug fixes** ([PR #1298](https://github.com/anthropics/skills/pull/1298), [PR #1050](https://github.com/anthropics/skills/pull/1050), [PR #1099](https://github.com/anthropics/skills/pull/1099))
   - **Functionality:** Multiple PRs targeting the skill-creator meta-skill, specifically fixing `run_eval.py` which reports `recall=0%` for all descriptions — breaking the description-optimization loop. Additional fixes address Windows subprocess incompatibility (`claude.cmd` not resolved via PATHEXT) and stream-reading failures.
   - **Discussion highlights:** Ten+ independent reproductions of the 0% recall bug ([Issue #556](https://github.com/anthropics/skills/issues/556)); the eval loop is "optimizing against noise." Windows users experience total failure — every query recorded as "not triggered."
   - **Status:** Open (three competing PRs; no merge yet). Moderated by MartinCajiao, joshuawowk, gstreet-ops.

**#2 — document-typography** ([PR #514](https://github.com/anthropics/skills/pull/514))
   - **Functionality:** Typographic quality control for AI-generated documents — prevents orphan word wrap, widow paragraphs (stranded section headers), and numbering misalignment in generated output.
   - **Discussion highlights:** Addresses a universal pain point — "these issues affect every document Claude generates," and users rarely request typographic corrections explicitly.
   - **Status:** Open since March 2026. Author: PGTBoos.

**#3 — ODT skill** ([PR #486](https://github.com/anthropics/skills/pull/486))
   - **Functionality:** OpenDocument Format (.odt, .ods) creation, template filling, and ODT→HTML conversion. Triggered by mentions of ODT/ODS/ODF/OpenDocument/LibreOffice.
   - **Discussion highlights:** Broad ISO-standard document format support beyond the existing docx/pdf skills; LibreOffice ecosystem integration.
   - **Status:** Open since March 2026. Author: GitHubNewbie0.

**#4 — frontend-design skill revision** ([PR #210](https://github.com/anthropics/skills/pull/210))
   - **Functionality:** Complete revision of the existing frontend-design skill for clarity, actionability, and internal coherence — ensures every instruction is executable within a single conversation and guidance steers behavior effectively.
   - **Discussion highlights:** Community focus on skill quality — making instructions "specific enough to steer behavior" rather than vague developer documentation.
   - **Status:** Open since January 2026. Author: justinwetch.

**#5 — self-audit skill** ([PR #1367](https://github.com/anthropics/skills/pull/1367))
   - **Functionality:** Audits AI output before delivery — mechanical file verification first (every claimed output file exists), then four-dimension reasoning audit in damage-severity priority order. Universal across projects, tech stacks, and models.
   - **Discussion highlights:** Companion to the reasoning quality gate pipeline proposal ([Issue #1385](https://github.com/anthropics/skills/issues/1385)). Deliberate name change from "agent-governance" ([Issue #412](https://github.com/anthropics/skills/issues/412)) following community feedback.
   - **Status:** Open since June 2026, v1.3.0. Author: YuhaoLin2005.

**#6 — testing-patterns** ([PR #723](https://github.com/anthropics/skills/pull/723))
   - **Functionality:** Comprehensive testing-stack coverage — Testing Trophy model, AAA pattern, React Testing Library, what to test vs. what NOT to test.
   - **Discussion highlights:** Fills an obvious gap in the skills collection; broad community interest in test generation/guidance.
   - **Status:** Open since March 2026. Author: 4444J99.

---

## 2. Community Demand Trends

Distilled from the highest-activity Issues, the most-anticipated new Skill directions:

- **Security & Trust Boundary Management** ([Issue #492](https://github.com/anthropics/skills/issues/492), 43 comments): Community skills distributed under the `anthropic/` namespace impersonate official skills, enabling trust boundary abuse — elevated permissions granted to skills users believe are official. The highest-activity issue in the repository.
- **Quality Assurance & Evaluation Tooling** ([Issue #556](https://github.com/anthropics/skills/issues/556), 12 comments): The broken `run_eval.py` undermines the entire skill-creator feedback loop. Community needs working evaluation tooling for skill descriptions.
- **Org-Wide Skill Sharing** ([Issue #228](https://github.com/anthropics/skills/issues/228), 16 comments): Direct in-product skill sharing within organizations — no more Slack/Teams file transfers and manual uploads.
- **Governance & Safety Patterns for Agents** ([Issue #412](https://github.com/anthropics/skills/issues/412), [Issue #1385](https://github.com/anthropics/skills/issues/1385)): Policy enforcement, threat detection, trust scoring, audit trails, and multi-stage reasoning quality gates.
- **Context Window Management** ([Issue #1487](https://github.com/anthropics/skills/issues/1487)): The bundled `claude-api` skill injects ~156k tokens in a single tool call, exhausting context windows — demand for token-efficient skill design.
- **Skill Deduplication** ([Issue #189](https://github.com/anthropics/skills/issues/189), 9 👍): `document-skills` and `example-skills` plugins install identical content, causing duplicate skills in the context window.

---

## 3. High-Potential Pending Skills

Active PRs not yet merged — likely to land soon:

- **testing-patterns** ([PR #723](https://github.com/anthropics/skills/pull/723)) — fills a clear gap; comprehensive testing guidance; active since March.
- **self-audit** ([PR #1367](https://github.com/anthropics/skills/pull/1367)) — v1.3.0, refined through community feedback; strong proposal backing.
- **ServiceNow platform skill** ([PR #568](https://github.com/anthropics/skills/pull/568)) — ITSM, ITOM, ITAM/SAM, FSM, HRSD/CSM, SPM/PPM, Vulnerability Response, IntegrationHub; broad enterprise platform coverage; updated as recently as August.
- **pyxel / retro game development** ([PR #525](https://github.com/anthropics/skills/pull/525)) — MCP server integration for the Pyxel retro game engine; niche but well-defined; long review period (March → July).
- **skill-quality-analyzer + skill-security-analyzer** ([PR #83](https://github.com/anthropics/skills/pull/83)) — meta-skills evaluating other skills across five dimensions (structure, documentation, examples, resources); aligns with the community's emphasis on skill quality.

---

## 4. Skills Ecosystem Insight

The community's most concentrated demand is for **quality assurance infrastructure**: working evaluation tooling for skill creators, security/trust validation for distributed skills, and reasoning/audit gates that verify AI output before delivery — the ecosystem is maturing from "what skills exist" to "how do we ensure skills are safe, effective, and correctly evaluated."

---

# Claude Code Community Digest — 2026-08-20

## Today's Highlights
Two minor releases shipped today with practical developer-focused improvements: a new built-in "Concise" output style to cut preamble/narration overhead, and an `ANTHROPIC_DEFAULT_MODEL` env var for setting new-session model defaults. The community remains highly energized around AGENTS.md standardization — the oldest issue in the tracker has surged to 4,669 👍 and 361 comments, signaling a strong push for cross-tool compatibility beyond CLAUDE.md.

## Releases
**v2.1.237** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.237)
- Fixed prompt caching for sessions using an LLM gateway or custom base URL — resolves a subtle performance regression for enterprise setups that route through proxies.
- Added built-in "Concise" output style: Claude leads with results, skips preamble/narration, without reducing thoroughness. Selectable via `/config` under Output style.

**v2.1.236** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.236)
- Added `ANTHROPIC_DEFAULT_MODEL` environment variable: sets the model new sessions start on. Unlike `ANTHROPIC_MODEL`, a `/model` pick still overrides it and persists across restarts.
- Added `notify_when_idle` option to cross-session `SendMessage`, enabling one Claude Code session to notify another when its work finishes.

## Hot Issues

**1. [AGENTS.md Standardization Support](https://github.com/anthropics/claude-code/issues/6235)** — CLOSED, 4,669 👍, 361 comments
The highest-signal issue in tracker history. Users demand support for the cross-tool `AGENTS.md` standard (already adopted by Codex, Amp, Cursor), noting that CLAUDE.md isolates Claude Code from multi-agent collaboration workflows. Expect to see a dedicated release response soon.

**2. [Opus 4.8 Toxic Tone / Opus 5.0 Incoherence](https://github.com/anthropics/claude-code/issues/77136)** — OPEN, 196 👍, 31 comments
Developers report a stark behavior regression across flagship models: Opus 4.8's tone is described as "incessantly toxic," while Opus 5.0 suffers from incoherence. The community is actively comparing notes on prompt-structure workarounds. Anthropic has not yet responded.

**3. [Model-Specific 'heron_brook' Prompt Injection, No Opt-Out](https://github.com/anthropics/claude-code/issues/80988)** — OPEN, 57 👍, 30 comments
v2.1.219 injects a system-prompt section instructing Opus 5 to avoid AgentTool delegation, silently overriding user-configured delegation policy. The lack of an opt-out flag is the core complaint — a policy/control issue more than a technical one.

**4. [Multi-Account Switching in Claude Mobile](https://github.com/anthropics/claude-code/issues/36151)** — OPEN, 611 👍, 160 comments
Despite involving the mobile app, this issue continues to attract Claude Code users who need account-switching for work/personal separation. Community expectation: single-account restriction is untenable for professional usage.

**5. [Multi-Agent Rate Limits at Highest Paid Tier](https://github.com/anthropics/claude-code/issues/62426)** — CLOSED, 6 comments
Parallel workflows (5–6 concurrent instances) frequently hit rate limits even on the priciest plan. Closing comments suggest Anthropic engineers recommended reducing concurrency or implementing their own backoff, suggesting a recurring support blind spot.

**6. [VSCode Extension Loses Conversation History](https://github.com/anthropics/claude-code/issues/29017)** — OPEN, 20 👍, 30 comments
A long-running reliability bug, still unaddressed after six months. Users report losing substantial session history on macOS, making the IDE extension unreliable for structured debugging work.

**7. [Read Tool Ignores permissions.deny](https://github.com/anthropics/claude-code/issues/84634)** — OPEN, 1 comment
Security-defect report: the Read tool bypasses `permissions.deny` rules (verified via `/permissions`), while Bash correctly enforces the equivalent sandbox restriction. Permission-model inconsistency accessible to any agent prompting.

**8. [Sandbox allowedDomains Not Enforced on macOS](https://github.com/anthropics/claude-code/issues/77045)** — OPEN, 1 comment
Reproduced security gap: built-in proxy CONNECTs to non-allowlisted hosts. Reproducible on both CLI and desktop app. Anthropic has not acknowledged.

**9. [Remote Sessions Can't Make Outbound SSH](https://github.com/anthropics/claude-code/issues/84967)** — OPEN, 1 comment
Web-based remote sessions cannot initiate SSH connections, breaking direct VPS/server management workflows. A feature gap limiting the utility of remote sessions for infrastructure engineers.

**10. [Agent-Hours: Labor Metric for Agent Teams](https://github.com/anthropics/claude-code/issues/88085)** — OPEN, 1 comment, fresh today
A novel proposal for measuring agent work capacity (sum of active wall-clock time across main sessions, subagents, workflows) rather than just token spend. Complements the existing agent-time/cost debate with a labor-analog for capacity planning.

## Key PR Progress
Only 1 PR was updated in the last 24h:

**#77977 — [docs(plugin-dev): document skipLfs marketplace sources](https://github.com/anthropics/claude-code/pull/77977)** — OPEN, updated 2026-08-19
A docs-only PR documenting the `skipLfs` option for GitHub/git marketplace source objects, with examples for GitHub shorthand and generic Git URL sources that skip Git LFS downloads. Addresses reference to issue #63035. Small, but valuable for plugin marketplace maintainers with large repos.

## Feature Request Trends
1. **Cross-tool standardization (AGENTS.md)** — The dominant trend. Users insist that Claude Code must interoperate with other AI coding agents via shared config files rather than remaining CLAUDE.md-only.

2. **Model selection and conversation control defaults** — Requests for per-session default model env vars (v2.1.236 just shipped this) and the demand for `/session --name` flag (`#69836`) suggest mature usage patterns: teams now customize their CLI like they do their editors.

3. **Artifact-free troubleshooting utilities** — Request for "agent-hours" (#88085) reflects a shift to treating AI agents as a labor force, not just an API spend line — users want better observability and capacity-planning metrics.

4. **cross-session orchestration primitives** — `notify_when_idle` (shipped in 2.1.236) and the demand for outbound SSH from remote sessions (#84967) show users are building multi-session, multi-machine workflows and need explicit IPC/connectivity capabilities.

## Developer Pain Points
1. **Permission model inconsistencies** — Tools bypassing configured denials (Read vs Bash, `#84634`) and silent prompt injections overriding user delegation policy (`#80988`) erode trust in the safety model. The community is sharp about security-relevant drift.

2. **Reliability under multi-agent/parallel workloads** — Rate limiting at paid tiers (`#62426`), forced data loss (robocopy deletion `#80660`), and session history loss in VSCode (`#29017`) — users are stressing the system far beyond what Anthropic initially supported, and the gaps are loud.

3. **Windows packaging and update instability** — Auto-update failures (`#65093`), MSIX update blocking via service lock (`#88101`), desktop crashes requiring repairs (`#85199`), and VM boot timeouts on ARM (`#39636`) — Windows native users are disproportionately affected by update/packaging regressions.

4. **Auto-mode behavior misalignment** — Two separate issues report auto-mode's system prompt pushing Bash/sed/heredoc file edits over the Edit/Write tools, breaking `/rewind` and producing silent failures (`#87575`, `#88041`). Core tooling reliability remains the #1 complaint even in newer traffic.

---
*Digest generated from GitHub activity on anthropics/claude-code between 2026-08-19 and 2026-08-20. Data based on 2 releases, 50 issues, and 1 PR.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-20

## Today's Highlights
The Codex ecosystem saw a significant security hardening push today, with a series of PRs isolating Git operations for plugins and removing Git commands from the known-safe classification to prevent repository-config-driven helper execution. On the stability front, Windows users continue to bear the brunt of reported issues, particularly around Computer Use screenshot failures and MCP server process leaks, while a high-engagement bug report on browser plugin initialization failures has accumulated 78 comments, indicating a deeply investigated problem. Notably, a closed PR addresses the long-standing issue of thread shutdown races, fixing a case where terminal sessions could report completion despite unflushed rollout persistence.

## Releases
- **rust-v0.149.0-alpha.2** — Released; no detailed changelog provided. [View release](https://github.com/openai/codex/releases)

## Hot Issues
1. **[#39136 — Codex built-in browser plugin initialization fails: Trusted RPC dependency is not within a trusted code path](https://github.com/openai/codex/issues/39136)** — Windows users report the in-app browser plugin fails to start due to a trusted RPC path validation error. With 78 comments and 41 👍, this is the most actively discussed issue today, affecting ChatGPT Plus users on Windows. 

2. **[#38455 — ChatGPT desktop repeatedly spawns Computer Use workers and crashes with V8 OOM on macOS](https://github.com/openai/codex/issues/38455)** — A serious regression where the app SIGABRTs through `node::OOMErrorHandler` with 187 named `computer-use` threads, 98 seconds after launch, even while idle. 30 comments; users note version 26.730.61639 worked fine.

3. **[#25178 — Windows Computer Use screenshot fails on Windows 10 22H2 when SetIsBorderRequired is called](https://github.com/openai/codex/issues/25178)** — The Computer Use agent can list/activate windows and send input, but any `get_window_state` with screenshots fails with `不支持此接口 (0x80004002)`. Open since May; 28 comments.

4. **[#35050 — GPT-5.6 often serializes independent Code Mode calls; explicit batching reduced weighted usage by 27–45%](https://github.com/openai/codex/issues/35050)** — A model-behavior report showing significant token-cost savings when explicitly batching tool calls. Highly upvoted (40 👍), suggesting broad user interest in improved tool-call batching strategy.

5. **[#38350 — Recurring scheduled tasks disable themselves after successful runs without user authorization](https://github.com/openai/codex/issues/38350)** — Automations on ChatGPT Web intermittently switch from enabled to paused without user action; four unrelated tasks were found disabled in one incident. 21 comments.

6. **[#39239 — Windows: `thread/archive` fails with "os error 2" after `thread/resume` stores a `\\?\` (verbatim) rollout_path](https://github.com/openai/codex/issues/39239)** — Path-equality mismatch with Windows verbatim paths causes archive failures after resume, with the file queued twice. 17 comments; a clear Windows-path-handling bug.

7. **[#34301 — GPT Sol and Terra threads cannot spawn Luna subagents because of Luna Multi Agent version](https://github.com/openai/codex/issues/34301)** — Cross-model subagent spawning is blocked on Windows CLI due to version incompatibility. 10 comments, 34 👍 — high community interest in the Sol/Terra/Luna agent hierarchy.

8. **[#38754 — Local stdio MCP servers are repeatedly spawned and not reaped within a single task](https://github.com/openai/codex/issues/38754)** — Windows Codex app spawns a new MCP server process per turn and never reaps them, suggesting a resource leak compounding over long sessions. 10 comments.

9. **[#25744 — macOS: Codex accumulates Computer Use / MCP helper processes and unreaped zombie children, causing HID lag](https://github.com/openai/codex/issues/25744)** — Long-running sessions accumulate zombie helper processes, degrading input latency and causing WindowServer/TCC stalls. 20 comments; related to #38754 on Windows.

10. **[#39552 — Restoring a persisted Google sign-in tab in the in-app browser pins the renderer at 100% CPU](https://github.com/openai/codex/issues/39552)** — macOS users on 26.814.41407 report that restoring a persisted Google sign-in tab causes sustained 100% CPU usage. New issue; 3 comments.

## Key PR Progress
1. **[#31155 — fix: release thread writer after failed shutdown](https://github.com/openai/codex/pull/31155)** *(CLOSED)* — Fixes a rollout-persistence bug where the writer lease remained registered after shutdown, allowing retries. This was a long-running PR (opened July 5) that addresses a subtle race condition.

2. **[#39524 — Stop treating Git commands as inherently safe](https://github.com/openai/codex/pull/39524)** *(CLOSED)* — Removes Git commands from the known-safe classification on Unix/macOS; repo config can trigger helper execution even for read-only commands. Security hardening.

3. **[#39520 — Isolate automatic plugin Git operations](https://github.com/openai/codex/pull/39520)** *(CLOSED)* — Prevents background marketplace/plugin refreshes from inheriting repository-local Git configuration that could redirect remotes or invoke helpers. Complements #39524.

4. **[#39410 — Refresh expired AWS credentials for Bedrock](https://github.com/openai/codex/pull/39410)** *(CLOSED)* — Adds an `aws.auth_refresh` provider config with configurable command and timeout so Bedrock sessions can recover from credential expiry mid-request.

5. **[#39452 — Remove the feature gate for async user messages](https://github.com/openai/codex/pull/39452)** *(CLOSED)* — Exposes `send_user_message_async` to root agents automatically when the model supports it; keeps `send_async_message` as a compatibility flag.

6. **[#39493 — Make head-tail buffer capacity const generic](https://github.com/openai/codex/pull/39493)** *(CLOSED)* — Parameterizes `HeadTailBuffer` by `MAX_BYTES` const generic and derives head/tail budgets from it; keeps `UNIFIED_EXEC_OUTPUT_MAX_BYTES` as production default.

7. **[#39515 — Use `mem::take` to drain unified exec output buffers](https://github.com/openai/codex/pull/39515)** *(CLOSED)* — Simplifies the output-collection code by replacing custom `HeadTailBuffer::drain` with `std::mem::take`, resetting the buffer to empty state.

8. **[#39514 — Use stored item types when materializing turn summaries](https://github.com/openai/codex/pull/39514)** *(CLOSED)* — Reads `item_type` from the materialized column with a fallback to `item_json`, ensuring backward compatibility with older clients.

9. **[#39510 — Track built-in control tool calls in analytics](https://github.com/openai/codex/pull/39510)** *(CLOSED)* — Emits `codex_control_tool_call_event` for tools like `request_user_input`, `update_plan`, `view_image`, and goal tools, with correlation/timing metadata.

10. **[#39474 — Consolidate Guardian extensions into `codex-guardian-v2`](https://github.com/openai/codex/pull/39474)** *(CLOSED)* — Moves thread lifecycle contributor and subagent-spawn context into a single extension entry point, reducing duplicated extension wiring.

## Feature Request Trends
- **Configurable context compaction model** ([#22486](https://github.com/openai/codex/issues/22486)) — Users want the compaction model decoupled from the active session model, recognizing that compaction is a distinct workload better served by a cheaper/faster model.
- **Per-server MCP OAuth issuer overrides** ([#38944](https://github.com/openai/codex/issues/38944)) — Multi-server MCP deployments need explicit trust overrides for OAuth issuers when protected-resource metadata diverges.
- **Model/tool-call batching improvements** ([#35050](https://github.com/openai/codex/issues/35050)) — Users see large cost savings with manual batching and want the model to do this automatically more often.
- **Better multi-agent version interoperability** ([#34301](https://github.com/openai/codex/issues/34301)) — The community expects subagents (Sol/Terra/Luna) to spawn reliably regardless of CLI version.

## Developer Pain Points
- **Windows process/thread lifecycle leaks** — Multiple open issues describe unreaped child processes for MCP servers and Computer Use helpers on both Windows (#38754) and macOS (#25744), leading to degraded input latency and OOM crashes (#38455).
- **Windows path handling bugs** — NT verbatim paths (`\\?\`) break session archiving (#39239), and `SetIsBorderRequired` failures block Computer Use screenshots (#25178).
- **Plugin/browser trust and installation issues** — Windows users consistently hit problems with the Chrome extension native host not being created (#28950, #39531), and the trusted RPC path validation failure in the built-in browser (#39136) is the top-discussed issue today.
- **Git operation safety in repositories** — The cluster of PRs (#39520, #39524) addresses an emerging concern: repository-level Git config can hijack automatic plugin operations, a security risk the maintainers are actively mitigating.

---
*Digest generated from [openai/codex](https://github.com/openai/codex) GitHub activity for 2026-08-20.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-20

## Today's Highlights
Two releases shipped today: **v0.57.0-preview.0** with OAuth fixes for Cloud Workstations, and **v0.56.0** (stable). The community is actively discussing subagent reliability (false success reports, hangs) and the new Auto Memory system's security and retry behavior. Several PRs landed to harden Whisper model downloads, fix stdin handling, and normalize sandbox DEBUG flag semantics.

---

## Releases
- **[v0.57.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0-preview.0)**: Fixes OAuth redirect URI resolution for Cloud Workstations proxy flows and resolves a swallowed directory mismatch in IDE connections.
- **[v0.56.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0)**: General availability release; no detailed changelog provided in the data.

---

## Hot Issues
1. **[#22323 — Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** *(12 comments, P1)*  
   `codebase_investigator` subagent reports `status: "success"` despite hitting MAX_TURNS before any analysis. Misleading success signals erode trust in agent reliability — a serious correctness concern.

2. **[#21409 — Generalist agent hangs indefinitely](https://github.com/google-gemini/gemini-cli/issues/21409)** *(8 comments, P1)*  
   The generalist agent hangs on trivial tasks (e.g., folder creation) for up to an hour. Users must explicitly instruct the model not to defer to subagents to work around it. High community engagement (8 👍).

3. **[#19873 — Zero-dependency OS sandboxing & post-execution intent routing](https://github.com/google-gemini/gemini-cli/issues/19873)** *(8 comments, P2)*  
   Proposal to leverage Gemini 3's native bash affinity via POSIX tool chaining with proper OS sandboxing, balancing model strengths against user security.

4. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** *(5 comments, P2)*  
   Sessions deemed low-signal are never marked processed, causing repeated re-surfacing and wasted extractor cycles. Calls for a processed-state marker regardless of read outcome.

5. **[#26525 — Deterministic redaction and reduced Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** *(4 comments, P2, Security)*  
   Secrets may reach model context before redaction prompts; logging can also leak existing skill definitions. Strong need for deterministic pre-send redaction.

6. **[#25166 — Shell command stuck with "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** *(4 comments, P1)*  
   Simple CLI commands hang post-completion while UI shows them as active. Highly reproducible and disruptive to workflows.

7. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** *(4 comments, P1)*  
   Browser agent terminates with "GOAL" without performing tasks on Wayland sessions. Platform-specific compatibility gap.

8. **[#24246 — 400 error with >128 tools enabled](https://github.com/google-gemini/gemini-cli/issues/24246)** *(3 comments, P2)*  
   The API rejects requests when tool count exceeds limits; users expect smarter tool scoping instead of hard failures.

9. **[#23571 — Model creates tmp scripts in random locations](https://github.com/google-gemini/gemini-cli/issues/23571)** *(3 comments, P2)*  
   When restricted from shell execution, the model scatters edit scripts across directories, creating cleanup overhead for commits.

10. **[#20079 — Symlinked agent files not recognized](https://github.com/google-gemini/gemini-cli/issues/20079)** *(4 comments, P2)*  
    `~/.gemini/agents/filename.md` as a symlink is ignored. Simple but impactful for users managing agent configs via dotfiles.

---

## Key PR Progress
1. **[#28910 — Add Gemini 3.7 Flash and 3.6 Flash model configurations](https://github.com/google-gemini/gemini-cli/pull/28910)** *(CLOSED, size/xl, P2)*  
   Full model resolution configs for Gemini 3.7 Flash, 3.6 Flash, and 3.5 Flash-Lite across core and CLI packages.

2. **[#28892 — Preserve empty text turns with tools/media in curated history](https://github.com/google-gemini/gemini-cli/pull/28892)** *(CLOSED)*  
   Fixes `isValidContent` to keep model turns with `text: ''` when carrying tool requests or multimodal payloads.

3. **[#28914 — Inject on-retry nudge into contents to preserve prefix caching](https://github.com/google-gemini/gemini-cli/pull/28914)** *(OPEN, size/l)*  
   Moves retry nudges from `systemInstruction` to the end of `contents` to preserve static prompt prefix caching.

4. **[#28916 — Buffer partial stdout chunks in WhisperTranscriptionProvider](https://github.com/google-gemini/gemini-cli/pull/28916)** *(OPEN, size/m)*  
   Line-buffers stdout to prevent timestamped transcription lines being dropped when split across data events (fixes #28648).

5. **[#28917 — Atomic download & failure cleanup in WhisperModelManager](https://github.com/google-gemini/gemini-cli/pull/28917)** *(OPEN, size/m)*  
   Writes to temp files, respects backpressure, verifies lengths, and atomically renames on success (fixes #28644).

6. **[#28655 — Make Whisper model downloads failure-atomic](https://github.com/google-gemini/gemini-cli/pull/28655)** *(CLOSED)*  
   Prevents partial/corrupt model files at the installed path by adding proper await & cleanup logic.

7. **[#28922 — GCS trajectory logging and artifact preservation for PR generation](https://github.com/google-gemini/gemini-cli/pull/28922)** *(OPEN, size/l)*  
   Persists stream chunks and diffs to Google Cloud Storage for debugging and post-mortem during coding/repair loops.

8. **[#28889 — Restore paused stdin after capability detection](https://github.com/google-gemini/gemini-cli/pull/28889)** *(OPEN, P1)*  
   Fixes stdin flow-state corruption caused by `detectCapabilities()` attaching data handlers (fixes #28799).

9. **[#28863 — Prompt for consent on environment changes in MCP extensions](https://github.com/google-gemini/gemini-cli/pull/28863)** *(OPEN, size/m)*  
   Sanitizes runtime-altering environment variables and includes MCP server env configs in consent strings.

10. **[#28911 / #28904 — Normalize sandbox DEBUG flag semantics](https://github.com/google-gemini/gemini-cli/pull/28911)** *(OPEN, size/m)*  
    Only honor `DEBUG=true`/`1` in sandbox launcher and container entrypoint; `DEBUG=false`/`0` are now respected.

---

## Feature Request Trends
- **Subagent observability & trajectory sharing**: Multiple requests ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598), [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)) to expose subagent trajectories via `/chat share` and include them in `/bug` reports for easier debugging and evaluation.
- **AST-aware code navigation**: Investigations ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) into AST-aware file reads, search, and mapping to reduce token noise and improve read precision.
- **Agent self-awareness & safety**: Requests ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432), [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)) for the CLI to understand its own flags/hotkeys and to discourage destructive commands (e.g., `git reset --force`) via safer alternatives.
- **Configurable tool scoping**: Accommodate large tool counts ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) by intelligently limiting in-scope tools rather than failing with 400 errors.

---

## Developer Pain Points
- **Subagent reliability is the #1 concern**: False "GOAL success" reports ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)) and indefinite hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) top the charts. Users are actively working around by disabling subagent delegation.
- **Shell/process management fragility**: Commands hanging with "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)) and stuck interactive prompts (e.g., Vite) break core workflows.
- **Token-efficiency frustration**: "Firehosing" large files into context ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) and scatter of tmp scripts ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) create cleanup and cost overhead.
- **Security & privacy in Auto Memory**: Content sent to models before redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)) and invalid patch handling ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523)) raise concerns for enterprise users.
- **Platform inconsistencies**: Wayland browser failures ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) and symlink-ignored configs ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)) point to rough edges in cross-platform support.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-20

## Today's Highlights
The Copilot CLI team shipped five rapid-fire patch releases (v1.0.81-2 through v1.0.81-5) fixing pending-transcript duplication and other stability issues. However, the community is reporting a cluster of regressions in the 1.0.81 series, including a critical sandbox override violation, MCP authentication failures, and an MCP protocol handshake conflict. The issue tracker is heating up with 27 active discussions, many of them concentrated on sandbox behavior, MCP interoperability, and terminal input regressions.

---

## Releases
The team pushed five releases in the last 24 hours, all incremental patches on the 1.0.81 branch:
- **[v1.0.81-5](https://github.com/github/copilot-cli/releases/tag/v1.0.81-5)**: Fixes a bug where a prompt sent while the agent is working left a duplicate `(pending)` line at the bottom of the transcript after being answered.
- **[v1.0.81-4](https://github.com/github/copilot-cli/releases/tag/v1.0.81-4)**: "Fixes and changes" (unreleased details).
- **[v1.0.81-3](https://github.com/github/copilot-cli/releases/tag/v1.0.81-3)**: "Fixes and changes" (unreleased details).
- **[v1.0.81-2](https://github.com/github/copilot-cli/releases/tag/v1.0.81-2)**: "Fixes and changes" (unreleased details).

No PRs were merged in the last 24 hours; the release cadence appears to be outpacing community PR contributions.

---

## Hot Issues
Top 10 issues by community engagement and severity:

1. **[#2082 — ctrl+shift+c no longer copies to clipboard on Linux](https://github.com/github/copilot-cli/issues/2082)** (👍 12, 💬 24)  
   A long-standing regression since v1.0.4 affecting Ubuntu 24.04 users. The terminal's standard copy shortcut silently does nothing, forcing users to adapt to alternative copy methods. The thread has been active for five months, indicating this is a persistent compatibility gap with the Linux terminal ecosystem.

2. **[#4522 — Copilot CLI forces sandbox while managed policy is undetermined, overriding sandbox.enabled=false](https://github.com/github/copilot-cli/issues/4522)** (👍 7, 💬 2)  
   A serious enterprise-facing regression in 1.0.81-1: the local sandbox activates even when the user explicitly disabled it (`"sandbox": { "enabled": false }`) and no server-managed policy exists. High visibility because it breaks local development workflows without an opt-out.

3. **[#4390 — Enabled organization models missing from catalogue (Claude Sonnet 5/Opus 5 and Kimi K3)](https://github.com/github/copilot-cli/issues/4390)** (👍 7, 💬 15)  
   Copilot Business orgs that explicitly enable Anthropic and Kimi models get `This model is disabled by your organization` errors in Copilot CLI even though the same models work in the IDE. Closed as a duplicate/related to an internal fix, but community discussion is rich with model availability questions.

4. **[#4480 — Atlassian MCP OAuth fails with "Incompatible authorization server" on 1.0.79 — regression from 1.0.71](https://github.com/github/copilot-cli/issues/4480)** (👍 6, 💬 6)  
   Remote MCP servers using OAuth discovery (RFC 8414 §3.3) fail with an issuer-mismatch error. Particularly painful for teams using Atlassian's MCP server daily. A follow-up [issue #4490](https://github.com/github/copilot-cli/issues/4490) confirms the same failure persists in 1.0.80 for other users — the community is clearly waiting on a fix.

5. **[#4534 — autoUpdate: false is ignored; CLI re-execs a cached prerelease build](https://github.com/github/copilot-cli/issues/4534)** (💬 0)  
   A fresh triage-tagged issue: the CLI keeps launching a cached prerelease under `~/.copilot/pkg/` even when `"autoUpdate": false` is set and a stable npm version is installed. This undermines the documented configuration contract and should be watched by anyone deploying via npm.

6. **[#4533 — Terminal UI stops consuming events when a turn spawns parallel subagents](https://github.com/github/copilot-cli/issues/4533)** (💬 0)  
   On prerelease channels (1.0.81-4, -5), the UI input and scrolling become completely dead when parallel subagents are spawned, while the Rust runtime keeps working silently in the background for minutes. A serious usability bug if parallel agent execution becomes more common.

7. **[#4521 — Sandbox cannot be disabled](https://github.com/github/copilot-cli/issues/4521)** (👍 4, 💬 2)  
   Sandbox config displays as disabled but the CLI still enables and uses it. Related to #4522, indicating a wider sandbox state-management problem in the 1.0.81 series.

8. **[#4528 — Non-interactive sessions bypass disableBypassPermissionsMode managed setting](https://github.com/github/copilot-cli/issues/4528)** (💬 0)  
   `copilot -p --allow-all` ignores enterprise-managed `.github-private/copilot/managed-settings.json` permissions. A compliance and security concern for organizations that enforce permission boundaries via managed settings.

9. **[#4527 — `copilot -p` fails with 401 on GHEC data residency since 1.0.81-1](https://github.com/github/copilot-cli/issues/4527)** (💬 0)  
   Prompt mode on GHEC data-residency tenants fetches the model catalog from `api.githubcopilot.com` instead of the tenant endpoint, causing a startup 401 — while interactive mode works normally. Another sign that prompt mode (`-p`) is under-tested in enterprise configurations.

10. **[#4525 — 1.0.81-1 sends legacy `initialize` after successful modern `server/discover`, causing -32022](https://github.com/github/copilot-cli/issues/4525)** (💬 1)  
    MCP initialization against Python MCP SDK 2.0.0 servers fails because the CLI mixes protocol versions: it probes with a modern `server/discover` carrying a modern protocolVersion, then falls back to legacy `initialize`. Interop regression likely to affect a growing number of MCP servers.

---

## Key PR Progress
No pull requests were updated or created in the last 24 hours (0 items tracked). The project appears to be in a sustain/maintenance phase with the maintainers shipping releases directly rather than merging community PRs at the moment. The community is actively filing bugs, but code contributions are quiet.

---

## Feature Request Trends
Distilling the open feature requests across recent issues:

1. **Persist reasoning effort across sessions** ([#4530](https://github.com/github/copilot-cli/issues/4530))  
   Users want `/config` to persist not just the model but also the reasoning-effort setting. Today it resets to Medium after every restart, which breaks reproducibility for users who deliberately tune effort levels.

2. **Durable context across repeated compactions** ([#4441](https://github.com/github/copilot-cli/issues/4441))  
   Each compaction re-summarizes the previous summary, so early decisions and gotchas degrade with every cycle. Users are asking for a mechanism to preserve durable decisions, gotchas, and constraints across multiple compaction cycles.

3. **Plugin marketplace search/filter** ([#4523](https://github.com/github/copilot-cli/issues/4523))  
   `copilot plugin marketplace browse` returns a long flat list with no search or filtering. As marketplace catalogues grow, users want an interactive search input, fuzzy filtering, and category browsing to make plugins discoverable.

4. **Sandbox path grants must work for JVM/Java processes** ([#4516](https://github.com/github/copilot-cli/issues/4516))  
   Sandbox RW grants (e.g., `~/.m2/repository`) don't propagate to Java-based tools (Maven, `javac`). The community sees this as a systemic gap in how sandbox grants interact with subprocesses, not just a Java-specific quirk.

---

## Developer Pain Points
Several recurring frustrations emerged from the last 24 hours:

1. **Sandbox control is fragile and inconsistent**  
   Four separate issues (#4521, #4522, #4524, #4516) cover different facets of sandbox misbehavior: cannot disable it, overrides user config, blocks git and JVM processes, and creates overly restrictive defaults. The sandbox feature shipped recently, and the community is finding multiple edge cases where it breaks established workflows.

2. **MCP OAuth and protocol handshaking is a recurring regression source**  
   Issues #4480, #4490, #4525, and #4526 all revolve around MCP interoperability failures: OAuth discovery (RFC 8414) breaks between versions, legacy and modern protocol mixes cause -32022 errors, and forced re-auth appends `prompt=select_account` even for non-Microsoft OAuth providers. MCP is clearly a growing surface area with immature polish.

3. **Terminal input / keyboard handling keeps regressing**  
   Linux clipboard shortcut (ctrl+shift+c), backspace deleting entire words (#4447), and event drops when terminal panes are unfocused (#4213) — plus the new UI freeze on parallel subagents (#4533) — paint a picture of an input layer that's fragile across platforms and terminal emulators.

4. **Prompt-mode (`-p`) is under-tested in enterprise deployments**  
   Two independent enterprise issues: GHEC data residency 401 (#4527) and managed-settings bypass (#4528). Prompt mode is important for CI/CD and scripting, but it's clearly not receiving the same testing coverage as interactive mode.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI Community Digest**  
**Date: 2026-08-20**

---

### 1. Today's Highlights

The community’s focus remains on stability for ACP (Agent Client Protocol) integrations, with a critical issue surfacing around the restriction of `Grep` and `Glob` tools within ACP runtimes causing workflow disruptions. While there were no new releases or merged PRs in the last 24 hours, the active diagnosis of this blocking issue suggests upcoming patches will prioritize ACP parity. Developer sentiment indicates frustration is building over these terminal capability limitations, as they directly impact code search efficiency in external editors.

---

### 2. Releases

No new releases were published in the last 24 hours. The most recent stable version remains **0.37.1**.

---

### 3. Hot Issues

Only one issue was updated in the last 24 hours:

- **[#2609: [ACP] Grep/Glob blocked: "ACP runtime only supports interactive Bash tool processes"](https://github.com/MoonshotAI/kimi-cli/issues/2609)** — `CLOSED`  
  **Author:** SolomonFang | **Reactions:** 0 👍  
  **Why it matters:** This issue highlights a significant functional gap in the ACP adapter. Users relying on `kimi acp` within editors (e.g., Zed) cannot utilize the native `Grep` and `Glob` tools, forcing them to rely on external search. While `Read` works, the lack of search capability severely limits practical code exploration.  
  **Community reaction:** The issue was closed without comments, which may indicate a silent fix or internal resolution, but the lack of transparency could frustrate users awaiting a changelog entry.

---

### 4. Key PR Progress

No Pull Requests were updated or merged in the last 24 hours, resulting in no new progress to report on feature integrations or bug fixes.

---

### 5. Feature Request Trends

Based on recent community activity and the latest issue, the primary trending request is:

- **Full native tool support within ACP sessions.** Users expect feature parity between the interactive CLI mode and the ACP runtime. Specifically, file-searching tools (`Grep` and `Glob`) are heavily requested to function seamlessly inside non-interactive editor contexts. This trend points toward a broader demand for making the CLI's context engine unbiased when it comes to execution environments.

---

### 6. Developer Pain Points

- **ACP Terminal Restrictions:** The most recurring frustration is the limitation on non-interactive Bash processes. Developers integrating `kimi` into their IDE workflows face a roadblock when the tool refuses to execute standard utilities, forcing them to either switch contexts or manually intervene.
- **Lack of Transparency on Resolutions:** With the closing of issue #2609 without comments, there is a visible communication gap. Developers are left unsure whether a bug exists in their configuration or if an update addressed the problem silently, creating confusion and duplicate issue reports.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-20

## Today's Highlights
The OpenCode team continues aggressive v2 development, with significant refactors around session interruption handling and optimistic prompt admission. A cluster of billing and credit-consumption issues on the new OpenCode Go subscription service is drawing community attention, alongside continued reports of provider-stream error handling problems. Several contributors are actively addressing MCP connection reliability, plugin loading, and TUI polish items.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#37852 — Aborted provider stream recorded as clean stop](https://github.com/anomalyco/opencode/issues/37852)** — 56 👍, 19 comments
   Provider streams that terminate mid-generation are recorded with `finish=unknown`, zero tokens, and no text, then treated as a normal completion. Subagents return empty with no error. High community interest; could silently corrupt agent workflows.

2. **[#27906 — v1.15.1+ Breaks Bun Installs](https://github.com/anomalyco/opencode/issues/27906)** — 14 👍, 24 comments
   Postinstall lifecycle scripts are now required, but Bun (and other non-NPM package managers) block these by default. Global installs break. Long-running issue with strong signal for package-manager compatibility.

3. **[#43367 — subagents: gpt-5.6-sol-fast fails when prompt_cache_retention is injected](https://github.com/anomalyco/opencode/issues/43367)** — 10 👍, 2 comments
   Three review subagents failed within minutes because OpenCode injects an unsupported `prompt_cache_retention` option. New issue but high upvote velocity — likely hitting many users on this model variant.

4. **[#13626 — [FEATURE]: Auto-sync projects in web UI from server](https://github.com/anomalyco/opencode/issues/13626)** — 15 👍, 12 comments
   Opening OpenCode Web on a new device should auto-fetch projects from the server. Ongoing demand for better multi-device web experience.

5. **[#43409 — Abnormal Credit Consumption on OpenCode Go (42% in ~4 hours)](https://github.com/anomalyco/opencode/issues/43409)** — 0 👍, 3 comments
   New Go subscription service seems to drain credits at an alarming rate — 42% of monthly limit in ~4.5 hours. Billing accuracy concern for paid users.

6. **[#43416 — Usage-based billing doesn't match total subscription usage](https://github.com/anomalyco/opencode/issues/43416)** — 0 👍, 6 comments
   User shows ~$9 of usage over three days but the Go subscription reflects only $20 total. Dashboard and billing mismatch.

7. **[#43424 — Weekly quota incorrectly exhausted — Go subscription](https://github.com/anomalyco/opencode/issues/43424)** — 0 👍, 3 comments
   New subscriber with ~$11 total spend reports weekly quota exhausted. Similar billing logic concerns as above — appears systemic.

8. **[#9296 — Plan mode handover uses plan agent's model](https://github.com/anomalyco/opencode/issues/9296)** — 11 👍, 8 comments (CLOSED)
   Handover from PLAN to BUILD used the plan agent's model instead of the configured build model. Closed, but the demand for consistent multi-agent model handling is clear.

9. **[#43364 — Luna session isn't working in opencode go](https://github.com/anomalyco/opencode/issues/43364)** — 3 👍, 8 comments
   GPT 5.6 Luna sessions error with `invalid_encrypted_content`. Encrypted content verification fails for console-go users.

10. **[#43295 — Web UI V2 prompt controls overlap send button on narrow displays](https://github.com/anomalyco/opencode/issues/43295)** — 1 👍, 4 comments
    On narrow viewports, agent/model/variant controls render over the submit button. UI responsiveness regression in V2 web.

## Key PR Progress

1. **[#43520 — Optimistic prompt admission with client-minted IDs](https://github.com/anomalyco/opencode/pull/43520)** (CLOSED, contributor)
   Idempotent prompt sends that render instantly using client-minted inbox IDs with durable echo reconciliation. Major UX improvement for V2.

2. **[#42810 — Simplify interrupt continuation](https://github.com/anomalyco/opencode/pull/42810)** (CLOSED, contributor)
   Replaces a complex continuation state machine with a three-line post-cleanup check. Significant core simplification for session interrupt handling.

3. **[#43542 — Use schema ID minting instead of hand-rolled encoder](https://github.com/anomalyco/opencode/pull/43542)** (CLOSED, contributor)
   Deletes the web app's duplicated ID generator in favor of the schema identifier's encoding. Reduces drift between client and schema IDs.

4. **[#43541 — Default unknown model token limits](https://github.com/anomalyco/opencode/pull/43541)** (CLOSED, contributor)
   Uncatalogued models default to 200k context / 32k output limits with documented override paths. Sensible fallback for custom providers.

5. **[#43538 — Hot-reload skills, commands, agents and config](https://github.com/anomalyco/opencode/pull/43538)** (OPEN)
   Opt-in hot reload behind `OPENCODE_EXPERIMENTAL_HOT_RELOAD=true`. Watches config dirs and `.opencode` directories. Addresses long-standing #8751.

6. **[#43511 — Fix cross-spawn close event hang on Windows](https://github.com/anomalyco/opencode/pull/43511)** (CLOSED)
   Prevents `bash` tool from blocking until timeout when a grandchild process keeps stdio open (dev servers, daemons). Falls back from `close` to `exit` detection.

7. **[#43537 — Show skills in slash autocomplete; group /skills by source](https://github.com/anomalyco/opencode/pull/43537)** (OPEN)
   Skills now appear in slash autocomplete and the `/skills` dialog groups by source. Closes the remaining gaps from #7846.

8. **[#42978 — Show current worktree branch](https://github.com/anomalyco/opencode/pull/42978)** (OPEN)
   Fixes new-session context so manually created Git worktrees resolve their branch correctly in Desktop.

9. **[#43498 — Preserve Vertex Anthropic tool continuations](https://github.com/anomalyco/opencode/pull/43498)** (OPEN)
   Handles Vertex's HTTP 404 when Claude tool continuations end with native system messages after local tool results. Fixes #43478.

10. **[#43460 — Decode plugin tool input with schema's own instance](https://github.com/anomalyco/opencode/pull/43460)** (OPEN)
    Fixes `Invalid tool input` errors when config plugins bundle a different `effect` version than the server. Targeted dependency-version mismatch fix.

## Feature Request Trends

- **Cross-client state sync**: Auto-sync projects in web UI (#13626), shared unread/viewed state (#42811), and desktop approval notifications (#43493) signal demand for consistent experience across TUI, desktop, and web.
- **Billing transparency**: Multiple Go subscription issues (#43409, #43416, #43424) point to a need for real-time usage dashboards and accurate quota enforcement.
- **Model & agent workflow improvements**: Switching models for all agents (#3028), plan/build model consistency (#9296), and skill/agent hot-reloading (#43538) indicate power users want faster, more consistent configuration.
- **Approval & notification ergonomics**: Sound/notification on approval requests (#43493), keyboard shortcuts for agent switching (#41742) — users want to reduce context-switching overhead.
- **Provider compatibility**: Vertex tool continuations (#43498), Copilot HTTP 400 handling (#42089), and plugin tool input decoding (#43460) show growing pain with multi-provider setups.

## Developer Pain Points

- **Billing & quota surprises**: The Go subscription's credit consumption and quota exhaustion complaints are the most urgent — users are paying real money and feel misled by the dashboard. Expect backlash if this isn't addressed quickly.
- **Provider stream reliability**: Silent failures with no error surfaced (#37852), unsupported tool schema errors, and model-specific options like `prompt_cache_retention` (#43367) make agent runs unpredictable.
- **Package manager fragmentation**: Bun installs breaking (#27906) alongside plugin loading issues under SEA (#42485) and different `effect` versions (#43460) — ecosystem integration remains fragile.
- **Session state correctness**: Interrupt handling (#42810), worktree branch resolution (#42978), and plan/build model handover (#9296) highlight that session state still has edge cases that confuse users.
- **Desktop/TUI parity**: Missing notification on approval (#43493), no paste in questions tool (#43516), and window freeze under WSL (#43518) — desktop users face workflow-blocking issues that TUI doesn't have and vice versa.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-20

## Today's Highlights
The Pi project saw a heavy day of bug-fixing and quality-of-life improvements, with **12 issues and PRs closed** in the last 24 hours. Key themes include **Windows platform polish** (keybinding conflicts, CJK rendering), **session-scoped model persistence** (a long-requested change from #5263 landed via PR #8356), and a wave of **API adapter fixes** covering OpenAI timeout handling, Bedrock reasoning round-trips, and provider catalog accuracy.

---

## Releases
No new releases in the last 24 hours. Current version remains **0.84.x**.

---

## Hot Issues

1. **[#7547 — [Windows] How do you use Pi on Windows? What issues are you seeing?](https://github.com/earendil-works/pi/issues/7547)** — *31 comments, still open.* The community is aggregating Windows pain points to prioritize fixes. Comments span WSL vs. native, keybinding conflicts, and shell path issues. This is the central tracking thread for Windows support.

2. **[#5263 — Make in-session model/thinking-level changes ephemeral by default](https://github.com/earendil-works/pi/issues/5263)** — *13 👍, closed.* Highly-upvoted request: `/model` and thinking-level changes currently persist to global defaults, surprising users. **Resolved today via PR #8356** (session-scoped by default; explicit `/settings` for global).

3. **[#7829 — Invalid settings.json silently ignored; misleading 'bash not found' error on Windows](https://github.com/earendil-works/pi/issues/7829)** — *6 comments, closed.* Unescaped backslashes in `settings.json` produce a confusing downstream error. Community wants validation errors surfaced at load time.

4. **[#8206 — opencode-go: qwen3.6-plus and minimax-m2.7 cataloged as openai-completions but only served on /v1/messages](https://github.com/earendil-works/pi/issues/8206)** — *4 comments, in progress.* Catalog routing mismatch causes 404s for these models. Pending provider-side verification.

5. **[#8323 — OpenAI client created with no timeout](https://github.com/earendil-works/pi/issues/8323)** — *3 comments, closed.* Local models thinking >10 min get cut off by the SDK's 600s default. **Fixed** — `timeoutMs` is now plumbed through properly.

6. **[#8322 — isRecoverableLength misses exact-limit truncation](https://github.com/earendil-works/pi/issues/8322)** — *3 comments, closed.* Off-by-one: `usage.output < desiredMaxOutput` should be `<=`. Exact-limit hits were treated as non-recoverable, breaking continuation.

7. **[#8328 — Threshold compaction never fires for zero-usage providers](https://github.com/earendil-works/pi/issues/8328)** — *3 comments, closed.* Providers omitting the final `usage` block defeat auto-compaction entirely. Needs fallback to pure estimation.

8. **[#8336 — glm-5.3 zai catalog entry makes thinking levels a no-op](https://github.com/earendil-works/pi/issues/8336)** — *3 comments, closed.* Catalog ships `supportsReasoningEffort: false` with no `thinkingLevelMap`; the UI selector is cosmetic for this model.

9. **[#8337 — UTF-8 BOM breaks frontmatter parsing and settings.json loading](https://github.com/earendil-works/pi/issues/8337)** — *2 comments, closed.* A leading U+FEFF defeats both `startsWith("---")` checks and JSON parsing. Quiet failures cause confusing downstream behavior.

10. **[#8372 — Windows terminal (WSL or native) key-bindings](https://github.com/earendil-works/pi/issues/8372)** — *2 comments, open.* Continuing the Windows thread: keybinding conflicts in Windows Terminal need a documented strategy (rebind vs. special-case).

---

## Key PR Progress

1. **[#8356 — fix(coding-agent): keep model and thinking level changes session scoped](https://github.com/earendil-works/pi/pull/8356)** — *Merged.* Directly addresses #5263. `/model` and thinking toggles now apply to the active session only; global persistence happens exclusively via `/settings`.

2. **[#8361 — Add pi user-agent to most api adapters](https://github.com/earendil-works/pi/pull/8361)** — *Merged.* Adds Pi's default UA to 7 adapters (OpenAI, Anthropic, Azure, Google, Vertex, Mistral). Providers can now identify Pi traffic; closes #8305.

3. **[#8365/#8366 — feat: emit input event for built-in slash commands](https://github.com/earendil-works/pi/pull/8365)** — *Merged (both duplicates).* Extensions now get visibility into `/share`, `/export`, `/settings` execution. Addresses #8364.

4. **[#8246 — feat(ai): openai-completions reasoning details](https://github.com/earendil-works/pi/pull/8246)** — *Merged.* Fixes signed-text `reasoning_details` round-trip (was dropping non-encrypted entries). Based on an 870-trial OpenRouter benchmark (#7994).

5. **[#8377 — fix(coding-agent): respect min-release-age when checking npm package updates](https://github.com/earendil-works/pi/pull/8377)** — *Merged.* Update banner was reporting versions npm itself wouldn't install due to `min-release-age`. Now uses the effective cutoff.

6. **[#8374 — fix(coding-agent): abort active run before forking from a user message](https://github.com/earendil-works/pi/pull/8374)** — *Merged.* Fixes a race between fork and in-flight agent run when invoking fork during "stop gen" or retry sleep.

7. **[#8302 — feat(ai): amazon bedrock mantle](https://github.com/earendil-works/pi/pull/8302)** — *Open, WIP.* Adds Mantle (OpenAI-compatible Converse alternative). GPT-5.x models were failing via Converse; awaiting API perms for e2e tests.

8. **[#8383 — fix(ai): derive Gemini's disabled-thinking level from the catalog](https://github.com/earendil-works/pi/pull/8383)** — *Open.* Replaces fragile id-regex thinking detection (`isGemini3FlashModel`) with catalog-declared capabilities. `gemini-3.7-flash` is currently misdetected.

9. **[#8359 — fix: detect reasoning_content via proxy/gateway routes + guard content iteration](https://github.com/earendil-works/pi/pull/8359)** — *Merged.* DeepSeek via LiteLLM/opencode-zen now correctly parsed for `reasoning_content`; guards against bad content blocks.

10. **[#8066 — fix(tui): add visual lines caching to avoid unnecessary computes](https://github.com/earendil-works/pi/pull/8066)** — *Open.* Caches visual-line results keyed by width+text. Addresses #8029 (perf regression in large sessions).

---

## Feature Request Trends

1. **Session-scoped vs. global state** — Strong demand for clearer separation between ephemeral in-session changes and persistent global config. #5263 (landed), #8376 (scoped model persistence), and #3966 (profile-based isolation) all point here.

2. **Windows first-class support** — Not just bug reports; the community wants documented keybinding strategies (#8372), reliable shell-path handling (#7829), and a consolidated Windows experience (#7547). Active maintainers in the thread, likely a roadmap priority.

3. **Extension visibility & interception** — Extensions currently can't hook built-in slash commands (#8364), detect queued continuations (#8349), or register inactive tools (#8379). Trend: treat extensions as first-class TUI participants, not just LLM-side hooks.

4. **Per-model/per-provider configuration** — Compaction settings per model (#8133), timeout per model (#8323), model-selection persistence scope (#8376). Users increasingly run mixed local+cloud setups.

5. **Cache optimization** — Forked sessions lose prompt cache (#8348); Muse Spark 1.2 Contributor cache misses (#8362). Cost-sensitive users want cache efficiency across session boundaries.

---

## Developer Pain Points

1. **Silent failures are the worst failures** — Invalid settings.json (#7829), UTF-8 BOMs (#8337), and missing usage blocks (#8328) all degrade quietly. Recurring theme: **fail loudly at load/parse time**.

2. **API adapter inconsistency** — Timeout dropped in `streamSimple` (#8321), reasoning details not round-tripped (#7994), wrong endpoint routing (#8206), missing reasoning effort support (#8381). The multi-provider matrix is hard to keep correct.

3. **Windows is still rough** — Keybinding conflicts (#8183, #8372), Git Bash path issues (#7829), and CJK input rendering under SSH (#8382). Developer experience gap vs. macOS/Linux.

4. **Thinking/reasoning controls are fragile** — GLM-5.3 selector is cosmetic (#8336), Gemini uses regex detection (#8383), grok-build-0.1 rejects the parameter entirely (#8381). Model capabilities change faster than catalog entries.

5. **TUI polish matters** — Elapsed duration disappears after toggling thinking (#8350), wheel-scroll too slow on trackpads (#8369), link colors leak in wrapped tables (#8335). Small visual bugs erode daily-driver trust.

---

*Digest generated from earendil-works/pi activity for 2026-08-20. All links point to the GitHub repository.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-20

## Today's Highlights
v0.21.14 shipped with a new `qwen sessions ps` command and live-session registry for managing running interactive sessions, alongside critical fixes for agent launch failure reporting and model-switch token count leaks. The community is actively reporting P1 bugs around `/effort max` bricking sessions on OpenAI-compatible providers and token accounting issues after model switches, with maintainers already shipping targeted fixes. CI infrastructure continues to be a focus, with several PRs addressing GitHub Actions workflow limits and runner wedge conditions.

## Releases
- **v0.21.14** — Adds `qwen sessions ps` command and live-session registry to list and manage running interactive sessions with JSON output ([#8969](https://github.com/QwenLM/qwen-code/pull/8969), [#9261](https://github.com/QwenLM/qwen-code/pull/9261), [#9366](https://github.com/QwenLM/qwen-code/pull/9366)). Includes daemon skill-toggling improvements from the nightly build.

## Hot Issues

1. **[#9459 — `/effort max` bricks the session on OpenAI-compatible providers](https://github.com/QwenLM/qwen-code/issues/9459)** (P1, 4 comments) — `clampReasoningEffort()` fails to clamp `max`, causing every subsequent request to fail with HTTP 400 until the tier is manually changed. Critical UX blocker for users on non-Qwen backends.

2. **[#9450 — `task_list` falsely triggers duplicate tool-call loop detection](https://github.com/QwenLM/qwen-code/issues/9450)** (P2, 4 comments) — In multi-agent teams, identical `task_list` arguments are treated as duplicate tool calls even though team state may have changed. Causes agents to be stopped mid-coordination.

3. **[#9454 — Model switches reuse prompt/output token counts from previous route](https://github.com/QwenLM/qwen-code/issues/9454)** (P1, 3 comments) — `GeminiChat` retains token counts across `/model` switches, leading to inaccurate usage reporting. Fix already in progress via PR #9506.

4. **[#9509 — Agent launch failures reported as successful tool calls](https://github.com/QwenLM/qwen-code/issues/9509)** (P2, 3 comments) — Two failure paths in the Agent tool omit the `error` field, causing the scheduler to treat failures as successes. Fix shipping in PR #9519.

5. **[#9493 — Persistent "update available" notification for Homebrew installs](https://github.com/QwenLM/qwen-code/issues/9493)** (P2, 3 comments) — Homebrew users see update prompts on every startup when npm `latest` is newer, even when brew has nothing newer to install. PR #9502 addresses this.

6. **[#9309 — "Somewhere in compression seems incorrect"](https://github.com/QwenLM/qwen-code/issues/9309)** (P3, 5 comments) — Users report `/compress-fast` followed by `/compress` produces unexpected results, with the second compression on already-compressed context yielding confusing output.

7. **[#9219 — `/review` presubmit overlap matching is exact-line only](https://github.com/QwenLM/qwen-code/issues/9219)** (P2, 4 comments) — Review deduplication misses multi-line ranges and semantic duplicates, allowing redundant findings to pass as non-conflicting.

8. **[#9480 — CI hardened wipe guard wedges runner with symlinked workspace](https://github.com/QwenLM/qwen-code/issues/9480)** (P1, 3 comments) — The fail-closed wipe guard introduced in #9277 breaks when a runner's workspace is replaced by a symlink, wedging the runner entirely.

9. **[#9494 — Slash command menu selection resets while streaming](https://github.com/QwenLM/qwen-code/issues/9494)** (P3, 3 comments) — During response streaming, the slash command menu highlight jumps back to the first item, forcing users to re-navigate.

10. **[#5267 — `context.fileName` in settings doesn't work](https://github.com/QwenLM/qwen-code/issues/5267)** (12 comments, closed) — Long-standing issue about custom context file attachment not functioning. Recently closed with need-information status; community had significant engagement.

## Key PR Progress

1. **[#9491 — Post `/review` comments to Aone Code via a1 CLI](https://github.com/QwenLM/qwen-code/pull/9491)** — Implements the write path for the Aone Code review chain, allowing authorized runs to post composed reviews through the org-standard CLI.

2. **[#9519 — Mark agent launch failures as failed tool calls](https://github.com/QwenLM/qwen-code/pull/9519)** — Sets the `error` field on two Agent-tool launch-failure paths (subagent-not-found and `failWorktreeProvisioning`), fixing the silent-success bug from #9509.

3. **[#9506 — Invalidate token counts for switched model routes](https://github.com/QwenLM/qwen-code/pull/9506)** — Scopes GeminiChat token counts to the model route that produced them and invalidates on route change, addressing #9454.

4. **[#9421 — Collapse duplicate in-flight `tool_group` rendering](https://github.com/QwenLM/qwen-code/pull/9421)** — Fixes TUI bug where the most recent tool call renders twice while executing, caused by presence in both committed history and pending list.

5. **[#9502 — Suppress Homebrew update notification when brew has nothing newer](https://github.com/QwenLM/qwen-code/pull/9502)** — Queries local Homebrew metadata (`brew info --json=v2`) with a 5s timeout before showing update prompts, fixing #9493.

6. **[#9517 — Keep `qwen-autofix.yml` under GitHub's 500 KB limit](https://github.com/QwenLM/qwen-code/pull/9517)** — Addresses silent workflow start failures when the workflow file exceeds 512,000 bytes — GitHub refuses to start the run without any annotation.

7. **[#9518 — Stop counting wedged queued runs as in-flight in the shepherd](https://github.com/QwenLM/qwen-code/pull/9518)** — Fixes a deadlock where GitHub-created queued runs with zero jobs cannot be cancelled or deleted (HTTP 500/403), wedging the CI shepherd.

8. **[#9520 — Add agent orchestration contract documentation](https://github.com/QwenLM/qwen-code/pull/9520)** — Design document mapping the agent orchestration contract across all six launch routes (in-process subagents, forks, teammates, workflow agents, Cursor SDK/CLI).

9. **[#9406 — Hide workspace Browse on headless daemon hosts](https://github.com/QwenLM/qwen-code/pull/9406)** — Teaches the daemon to advertise Browse capability conditionally, avoiding native directory picker failures on headless hosts.

10. **[#9394 — Add DingTalk Workspace channel](https://github.com/QwenLM/qwen-code/pull/9394)** — New built-in channel using authenticated DWS CLI profiles, supporting DMs, @mentions, ambient groups, and document-mention notifications.

## Feature Request Trends
- **Multi-agent orchestration hardening** — Several issues and PRs focus on agent team coordination: duplicate tool-call detection false positives, launch failure reporting, and orchestration contract documentation.
- **Native Advisor capability** — Continued interest in aligning with Claude Code's Advisor tool ([#6542](https://github.com/QwenLM/qwen-code/issues/6542), [#9036](https://github.com/QwenLM/qwen-code/issues/9036)) for read-only second-opinion review during complex tasks.
- **Enhanced review tooling** — The `/review` skill is actively evolving: Aone Code integration, publish-time convergence advisories ([#9278](https://github.com/QwenLM/qwen-code/issues/9278)), and overlapped finding detection.
- **Desktop consolidation** — Deprecating the Electron app in favor of the Tauri shell ([#8596](https://github.com/QwenLM/qwen-code/issues/8596)) signals a platform distribution direction.

## Developer Pain Points
- **Model compatibility friction** — Repeated issues with OpenAI-compatible providers ([#9459](https://github.com/QwenLM/qwen-code/issues/9459), [#5821](https://github.com/QwenLM/qwen-code/pull/5821)) suggest users are heavily mixing backends and hitting provider-specific quirks.
- **Token accounting unreliability** — Token count leaks across model switches ([#9454](https://github.com/QwenLM/qwen-code/issues/9454)) and unclear compression behavior ([#9309](https://github.com/QwenLM/qwen-code/issues/9309), [#4098](https://github.com/QwenLM/qwen-code/issues/4098)) show usage visibility remains a pain point.
- **CI/CD infrastructure fragility** — GitHub Actions limits ([#9517](https://github.com/QwenLM/qwen-code/pull/9517)), wedged runners ([#9480](https://github.com/QwenLM/qwen-code/issues/9480)), and shepherd deadlocks ([#9518](https://github.com/QwenLM/qwen-code/pull/9518)) indicate the automated pipeline needs ongoing resilience work.
- **Silent failure modes** — Agent launch failures reported as successes ([#9509](https://github.com/QwenLM/qwen-code/issues/9509)) and hidden/unrecognized events mutating state ([#8823](https://github.com/QwenLM/qwen-code/issues/8823)) frustrate developers who can't trust the tool's self-reporting.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-20

---

## 1. Today's Highlights

The v0.9.10 release train is rolling with **retention, identity, and durable approvals** as headline themes (PR #5513, 76 commits), while the web i18n dictionary migration (#5337) continues to move pages onto the locale spine. Two fresh bugs surfaced post-v0.9.9: an **HTTP 400 max_tokens regression** (#5516) and an **emergency compaction firing too early** on V4 routes (#5518). Meanwhile, the approval-outcomes persistence work (#5491) closes #5360, and a suite of older issues — from flaky verifier tests (#5056) to Chinese garbled output (#1675) — were finally closed.

---

## 2. Releases

No new stable releases in the last 24 hours. The **v0.9.10 release PR (#5513)** is open and carries a 76-commit lane covering: memory retention fixes (per #5472), identity improvements, first-run experience, and durable one-shot approvals (#5360). Expect a cut once review completes.

---

## 3. Hot Issues

Selected 10 noteworthy issues from the last 24h of activity:

### 3.1 [#5516 — HTTP 400 max_tokens=384000 exceeds model limit after upgrading to v0.9.9](https://github.com/Hmbown/CodeWhale/issues/5516)
**Open, 1 comment.** Every request fails post-upgrade with `max_tokens=384000 cannot be greater than max_model_len=262144` despite no manual config. The user set no custom values — suggests a regression in output-headroom budgeting or default config resolution. **Why it matters:** blocking for all v0.9.9 users with 262K-context routes.

### 3.2 [#5518 — Emergency compaction triggers around ~85K–105K tokens on DeepSeek V4 despite 327,680-token route context](https://github.com/Hmbown/CodeWhale/issues/5518)
**Open, 3 comments.** Reproduction with local vLLM-hosted V4-Flash and `context_window = 327680`, `auto_compact = false`. Compaction fires at ~1/3 of the configured window. Suspected causes: excessive output-headroom budgeting and handoff state contamination. **Why it matters:** undermines long-session reliability and wastes tokens.

### 3.3 [#5512 — Header status indicator (cw/whale/dots) never renders since 0.9.7](https://github.com/Hmbown/CodeWhale/issues/5512)
**Open, 2 comments.** On Windows 11 / Windows Terminal / PowerShell 7.6, the `status_indicator` setting (`cw`/`whale`/`dots`/`off`) renders nothing since 0.9.7, worked in 0.8.64 era. **Why it matters:** visual regression, likely a rendering-layer change in the header.

### 3.4 [#5472 — TUI memory retention: every Bash call's full stdout/stderr is kept in memory for 1h](https://github.com/Hmbown/CodeWhale/issues/5472)
**Closed, 1 comment.** Audit found in-process retention of full Bash stdout/stderr for 1h plus smaller retainers. Host hit 11 GB swap during v0.9.9 session, attributed in part to this. **Why it matters:** memory leak class bug affecting long sessions.

### 3.5 [#5519 — Web: the isZh migration is losing ground](https://github.com/Hmbown/CodeWhale/issues/5519)
**Open, 1 comment.** Files branching on `locale === "zh"` grew from 12 → 31 over 90 days; 10 new branches added in last 30 days, only 6 removed. Proposes a one-way ceiling to force convergence. **Why it matters:** i18n refactoring is net-negative right now; needs process enforcement.

### 3.6 [#5478 — /rename mid-turn leaves in-flight shell tool row stuck at "running"](https://github.com/Hmbown/CodeWhale/issues/5478)
**Closed, 1 comment.** Repro: `/rename` during a running bash tool leaves the tool row perpetually "running" even though the job completes. **Why it matters:** UX bug breaking session state tracking.

### 3.7 [#5056 — Flaky verifier background tests + /workspace-sensitive fixtures](https://github.com/Hmbown/CodeWhale/issues/5056)
**Closed, 9 comments.** `run_verifiers_background_advertises_detached_start` and `run_verifiers_background_starts_shell_jobs_and_returns_task_ids` still flake under full-suite parallelism; 12 untriaged `#[ignore]` tests. **Why it matters:** CI reliability blocks merge confidence.

### 3.8 [#1425 — Large text processing session hangs on agent_wait timeout](https://github.com/Hmbown/CodeWhale/issues/1425)
**Closed, 8 comments.** Analyzing a 3M-character novel spawned 10 subagents; parent session locked up on `agent_wait` timeout. Maintainer confirmed the session was interrupted, not dead — but the UX is indistinguishable to the user. **Why it matters:** subagent orchestration needs better timeout/error surfacing.

### 3.9 [#5482 — EPIC: review, partially restructure, and fully localize documentation to Chinese](https://github.com/Hmbown/CodeWhale/issues/5482)
**Open, 1 comment.** Docs are English-only at scale; Chinese userbase growing. MT introduces errors, some source docs are stale. **Why it matters:** localization is a strategic investment as the userbase shifts.

### 3.10 [#5403 — main is red on both platforms across all four completed runs](https://github.com/Hmbown/CodeWhale/issues/5403)
**Closed, 4 comments.** Plugin e2e acceptance on macOS and NSIS provisioning on Windows are failing on main. **Why it matters:** release-blocking platform-specific breakage.

---

## 4. Key PR Progress

### 4.1 [#5513 — Release: Codewhale v0.9.10 — retention, identity, and durable approvals](https://github.com/Hmbown/CodeWhale/pull/5513)
**Open.** Complete 76-commit release lane rebased over public `main`. Covers memory retention, identity, first-run, and release-hardening. The v0.9.10 release train.

### 4.2 [#5491 — Persist approval outcomes before execution](https://github.com/Hmbown/CodeWhale/pull/5491)
**Closed.** Approval requests and terminal outcomes now persist in a session-owned log **before** execution. Denies execution when receipts can't be persisted; rejects stale decisions; reconstructs state on resume. **Closes #5360.**

### 4.3 [#5517 — Move docs/constitution and docs/runtime-api onto the dictionary spine](https://github.com/Hmbown/CodeWhale/pull/5517)
**Closed.** Phase 2 of #5337: 14 `isZh` branches eliminated per page, both added to `check-locales.mjs` for key/token parity enforcement.

### 4.4 [#5504 — Move docs/hooks and docs/troubleshooting onto the dictionary spine](https://github.com/Hmbown/CodeWhale/pull/5504)
**Closed.** Continues the #5337 series. Two smallest remaining page bodies migrated out of two-language ternaries; 16 partial localizations consolidated.

### 4.5 [#5515 — Forward MCP image results as typed content](https://github.com/Hmbown/CodeWhale/pull/5515)
**Open.** Converts standard MCP `image` content into provider-neutral rich tool-result blocks, removes inline base64 from text receipts while preserving semantics. Reuses existing image validation, 5 MiB limit, one-image bound.

### 4.6 [#5514 — Extract stream processing from turn loop](https://github.com/Hmbown/CodeWhale/pull/5514)
**Open.** Refactors response-stream state machine out of `handle_deepseek_turn` into `process_stream`, returning stream-produced state via `StreamOutcome`. Paves the way for cleaner stream handling and testability.

### 4.7 [#5509 — Restore /title as an independent terminal window title](https://github.com/Hmbown/CodeWhale/pull/5509)
**Open.** `/title` and `/rename` were merged in `24c7dee46`; this PR restores `/title` as its own command for setting the terminal window title. **Addresses #5430.**

### 4.8 [#5506 — Command context adapters and migration gate (FEAT-015)](https://github.com/Hmbown/CodeWhale/pull/5506)
**Closed.** Builds TUI-owned DI and migration infrastructure for extracting slash-command implementations incrementally. Zero production command groups migrated — infrastructure only.

### 4.9 [#5510 — Restore the star history chart in README](https://github.com/Hmbown/CodeWhale/pull/5510)
**Closed.** Re-adds the star history chart removed in `4bc02de` due to GitHub's third-party API restrictions. **Why it matters:** community visibility — contributors want to see project growth.

### 4.10 [#5511 — Show repository context in git chrome](https://github.com/Hmbown/CodeWhale/pull/5511)
**Closed.** Header now displays `repo · branch*`, `repo/worktree · branch*` for linked worktrees, and ahead/behind counts. **Addresses #5437.**

---

## 5. Feature Request Trends

Distilled from all issues/PRs in the last 24h:

| Trend | Supporting signals | Momentum |
|---|---|---|
| **i18n dictionary spine migration** — kill `isZh` branches, enforce parity | #5337 series: #5504, #5517, #5519 | High — deliberate, multi-PR effort |
| **Chinese docs localization** — docs tree restructure, per-language folders | EPIC #5482, PR #5507 | High — Tier 1 landed, community-driven |
| **Durable, auditable approval flow** — fail-closed semantics | #5360, #5491 | High — shipped in v0.9.10 |
| **Memory retention / leak hardening** — bounding Bash output and other retainers | #5472, v0.9.10 release notes | High — addressing production pain |
| **Subagent orchestration UX** — timeout surfacing, better progress visibility | #1425, #5478 | Medium — recurring in long-session reports |
| **Repository context in header** — worktree/branch visibility | #5437, #5511 | Medium — small but polished UX win |
| **MCP rich content parity** — typed images, structured tool results | #5515 | Medium — ecosystem alignment |

---

## 6. Developer Pain Points

Recurring frustrations and high-frequency requests from the last 24h:

### 6.1 Regression-prone release cadence
- #5516: v0.9.9 ships with broken max_tokens defaults; every request fails with HTTP 400. No manual config.
- #5512: header status indicator silently broken since 0.9.7, unreported for two releases.
- #5403: main red on both platforms across four runs — release-blocking breakage.

### 6.2 Long-session reliability
- #5518: emergency compaction fires at ~⅓ of the configured window on V4 routes.
- #5472: Bash stdout/stderr retained for an hour per call; host went to 11 GB swap.
- #1425: subagent `agent_wait` timeouts cause session "hang" indistinguishable from death.

### 6.3 CI flakiness and untriaged ignores
- #5056: verifier background tests still flaky under parallelism; 12 untriaged `#[ignore]` tests.

### 6.4 i18n refactoring is losing ground
- #5519: `isZh` branch count growing (12 → 31 files over 90 days) — migration needs a one-way ceiling to converge.

### 6.5 Chinese user experience
- #1675: garbled Chinese output in agent real-time output (closed, but recurring class).
- #5482: docs barrier for non-English-fluent Chinese users.
- #5507: documentation localization is now community-led — a signal that maintainers aren't keeping pace.

### 6.6 Windows-specific visual regressions
- #5512 (header status indicator), #894 (image rendering chaos) — both Windows/terminal-specific rendering issues.

---

*Digest generated from Hmbown/CodeWhale (DeepSeek-TUI) repository activity, 2026-08-19 00:00 → 2026-08-20 00:00 UTC.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*