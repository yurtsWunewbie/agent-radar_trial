# OpenClaw Ecosystem Digest 2026-08-22

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-22 01:09 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyagi)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-08-22

---

## 1. Today's Overview

OpenClaw is currently operating under significant stability pressure. The project saw extremely high activity in the last 24 hours — 500 issues and 500 PRs updated — but the majority of that activity is churn on a large backlog of long-standing, high-severity bugs. The most urgent problems cluster around two themes: **resource leaks** (memory, zombie processes) and **message delivery reliability** (session state loss, stuck final replies, OAuth refresh failures). Many P0/P1 issues have been open for weeks or months (e.g., the gateway memory leak dated June 9) with "needs-maintainer-review" tags, suggesting maintainer bandwidth is strained. On the positive side, there is a steady stream of small, well-scoped UI and CLI fixes from the maintainer team (steipete, jesse-merhi), and a significant Codex integration upgrade PR (#127724) is in review. No new releases were published today.

---

## 2. Releases

No new releases were published in the last 24 hours. The most recent release validation in progress is **v2026.8.1-beta.2** ([Issue #125626](https://github.com/openclaw/openclaw/issues/125626)), which is being tested against a real production gateway. Operators on **2026.5.12** should note two known, unresolved issues: the Codex compact 404 bug ([Issue #123799](https://github.com/openclaw/openclaw/issues/123799)) and the `anthropic:claude-cli` OAuth refresh dead-end ([Issue #83598](https://github.com/openclaw/openclaw/issues/83598)).

---

## 3. Project Progress

Today's merged/closed PRs (124) and commits show progress on several fronts:

- **CLI robustness**: [#127721](https://github.com/openclaw/openclaw/pull/127721) — `openclaw status --json` now returns proper JSON errors for invalid timeouts; [#127169](https://github.com/openclaw/openclaw/pull/127169) — Claude CLI stream failures now report exact causes instead of a generic "output exceeded limit" message.
- **Web UI**: [#127733](https://github.com/openclaw/openclaw/pull/127733) — panel actions survive browser session-storage unavailability; [#127646](https://github.com/openclaw/openclaw/pull/127646) — terminal transcript projections now settle correctly after a run completes.
- **Gateway & cron**: PRs #119923 and #127731 fix silent drops and failure-alert suppression cases. PR #126424 (closed) enforced that conversation delivery respects agent bindings.

One of the most significant pending advances is **[PR #127724](https://github.com/openclaw/openclaw/pull/127724)** — "feat(codex): upgrade to 0.149 and harden the complete app-server integration" — which is a large, cross-cutting change touching reply delivery, approval enforcement, and sandbox isolation.

---

## 4. Community Hot Topics

The highest-traffic threads this week all center on **production reliability**, with users sharing detailed diagnostic reports:

- **[Issue #91588](https://github.com/openclaw/openclaw/issues/91588)** (P0, 23 comments) — **Gateway memory leak**: RSS grows from 350MB to 15.5GB over days, causing OOM kill loops. This is the single most active bug thread and has been open since early June. Users are clearly frustrated by the lack of a fix for such a fundamental issue.

- **[Issue #91009](https://github.com/openclaw/openclaw/issues/91009)** (P1, 22 comments) — **Codex PreToolUse hook CPU spike**: short-lived `openclaw-hooks` processes consume >100% CPU each and stall gateway RPC, severely degrading agent responsiveness.

- **[Issue #87744](https://github.com/openclaw/openclaw/issues/87744)** (P1, 18 comments) — **Codex-backed Telegram turns time out**: repeated failures to reach `turn/completed` mean users never get final answers, a direct hit to the core value proposition of a personal AI assistant.

- **[Issue #126821](https://github.com/openclaw/openclaw/issues/126821)** (P0, 6 comments) — **SQLite corruption recurring on pristine DBs** within 15–24 hours on the 2026.8.1-beta.2. This is a new and alarming data-integrity regression that will likely block the beta from going stable.

**Underlying need**: The community is adopting OpenClaw for autonomous, always-on operation (Telegram, WhatsApp, Slack). The implicit demand is a "run forever without intervention" guarantee. The recurring themes of memory growth, zombie processes, and stuck message states show that this guarantee is not yet being met.

---

## 5. Bugs & Stability

Ranked by severity and impact:

| Severity | Issue | Summary | Fix PR? |
|----------|-------|---------|---------|
| **P0** | [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway memory leak → OOM crash loops (open 2+ months) | None in review |
| **P0** | [#126821](https://github.com/openclaw/openclaw/issues/126821) | SQLite corruption recurs within 24h on the current beta | None in review |
| **P1** | [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook CPU-bound processes stall RPC | None in review |
| **P1** | [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram turns never reach `completed` | None in review |
| **P1** | [#53408](https://github.com/openclaw/openclaw/issues/53408) | `write`/`exec` tool params silently dropped after ~15 turns | None in review |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie child processes accumulate, degrading runtime | None in review |
| **P1** | [#83598](https://github.com/openclaw/openclaw/issues/83598) | `anthropic:claude-cli` OAuth refresh dead-ends main lane | [#125471](https://github.com/openclaw/openclaw/pull/125471) closed |
| **P1** | [#86215](https://github.com/openclaw/openclaw/issues/86215) | Codex OAuth refresh failures wedge agents for hours | None in review |
| **P1** | [#45224](https://github.com/openclaw/openclaw/issues/45224) | Playwright unhandled assertion crashes Gateway entirely | None in review |

**Key concern**: The top P0 and P1 issues — memory leaks, CPU storms, process leaks — have no fix PRs in flight. This is a systemic reliability problem rather than a set of one-off regressions.

---

## 6. Feature Requests & Roadmap Signals

Looking at the most-upvoted and most-discussed requests (which are heavy on UX polish and operator control):

- **MathJax/LaTeX in Control UI** ([#42840](https://github.com/openclaw/openclaw/issues/42840), 10 👍) — Very likely to ship soon; it's a self-contained frontend change.
- **Skill priority configuration** ([#50199](https://github.com/openclaw/openclaw/issues/50199)) — Likely to be addressed via the broader "skill management" roadmap (see PR #122425 on slash-skills).
- **Persistent task-status surface** ([#52640](https://github.com/openclaw/openclaw/issues/52640)) — A natural evolution of the current typing-indicator infra; medium-term.
- **Session labels/nicknames** ([#55249](https://github.com/openclaw/openclaw/issues/55249)) — Small UX win; possible for the next minor release.
- **Multiple provider accounts UI management** — Actively being implemented in [#122396](https://github.com/openclaw/openclaw/pull/122396).

**Prediction**: The next release (post-8.1) will focus on the multi-account management UI, and the stability fixes for the Codex integration are likely to be gated on the big upgrade PR [#127724](https://github.com/openclaw/openclaw/pull/127724).

---

## 7. User Feedback Summary

The dominant sentiment in the issue tracker is **frustration over reliability**, particularly among users who rely on OpenClaw as an always-on assistant:

- **"Silent failure" pain**: Multiple threads (e.g., #87744, #53408) describe scenarios where the agent does work but the user sees nothing — no final answer, no error, no status. This is the most damaging behavior for trust.
- **Hardcoded path bug**: [#51429](https://github.com/openclaw/openclaw/issues/51429) — a very public embarrassment where a developer's `~/Users/wangtao` path was merged and shipped, creating a random directory for all users. This has negative reactions (0 👍) and is a credibility hit.
- **Operational burden**: Users on constrained VPSs ([#53600](https://github.com/openclaw/openclaw/issues/53600)) and Windows ([#86612](https://github.com/openclaw/openclaw/issues/86612)) report issues that feel niche but are real deployment barriers.
- **Positive notes**: The maintainers' rapid-fire small fixes (UI spacing, session storage, JSON CLI output) are being well-received, and the community's AI-assisted PRs are getting merged — a sign of a healthy contributor base.

---

## 8. Backlog Watch

These items are either long-open, high-impact, or at risk of being forgotten:

- **[Issue #91588](https://github.com/openclaw/openclaw/issues/91588)** — Gateway memory leak, P0, open since June 9. This is the single most important issue in the tracker and it is unstaffed.
- **[Issue #87744](https://github.com/openclaw/openclaw/issues/87744)** — Codex/Telegram timeout bug, P1, open since May 28. Directly impacts the primary use case.
- **[Issue #44502](https://github.com/openclaw/openclaw/issues/44502)** — Discord mention-gating regression, P1, labeled platinum hermit; no fix PR in review.
- **[Issue #53008](https://github.com/openclaw/openclaw/issues/53008)** — Memory compaction blocks the main lane for 10+ minutes, P1, open since March 23. This is a "silent freeze" bug that drives users away.

**Needs attention**: These issues all carry the `clawsweeper:needs-maintainer-review` tag, meaning an automated sweep has flagged them but a human has not yet triaged them to a fix. With the SQLite corruption issue (#126821) now on the current beta, it's critical that maintainers prioritize a stability-focused patch release before the next feature drop.

---

*Digest generated from OpenClaw public GitHub data for 2026-08-22.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant & Agent Open-Source Ecosystem
**Date:** 2026-08-22

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a **mature growth phase**, characterized by high-velocity feature development, active community contributions, and a clear shift from "greenfield capability building" to **production-hardening and reliability engineering**. Across the nine active projects analyzed, recurring themes dominate: multi-channel messaging integration (Telegram, WhatsApp, Slack, Discord), session-state integrity, memory management, and platform-specific stability (particularly Windows and macOS). The ecosystem is bifurcating into **general-purpose assistant platforms** (OpenClaw, Hermes, ZeroClaw, NanoClaw) and **niche/specialized tools** (Moltis, PicoClaw, NullClaw), with the former exhibiting significantly higher community engagement and PR throughput. Security and data privacy (prompt injection defense, redaction, sandboxing) are emerging as top-tier concerns, signaling a maturing user base running these agents autonomously in production environments.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release Status | Health Score* | Overall Tempo |
|---------|-------------|-----------|----------------|---------------|---------------|
| **OpenClaw** | 500 updated | 500 updated | None (beta validation) | ⚠️ **Moderate** – P0/P1 backlog, strained maintainers | High churn, backlog-bound |
| **Hermes** | 50 updated | 50 updated (0 merged) | v0.20.5 (Aug 19) | ✅ **Good** – clear direction, delivery cadence | Consolidation, review-bound |
| **ZeroClaw** | 50 updated | 50 updated | None | ⚠️ **Moderate** – security-critical bugs, healthy review queue | High, active triage |
| **NanoBot** | 5 new, 4 closed | 23 merged / 14 open | None | ✅ **Very Good** – fast merge rate, clean triage | **Rapid iteration** |
| **NanoClaw** | — | 24 updated (11 merged) | None | ✅ **Good** – coordinated sprints, clean merges | **High velocity, focused** |
| **IronClaw** | 15 touched | 36 updated (16 merged) | None (maintenance on `release/2026-08-17`) | ✅ **Very Good** – disciplined engineering, CI overhaul | High, organized |
| **CoPaw** | 34 updated | 36 updated (15 merged) | v2.1.1b2 imminent | ✅ **Good** – healthy community, some backlog | High, moderate backlog |
| **Moltis** | 2 new | 8 updated (1 merged) | None (v0.9.10 pending) | ✅ **Good** – responsive, focused | Moderate, stabilization |
| **LobsterAI** | 0 new | 12 merged/closed | Release `2026.8.21` merged | ✅ **Good** – housekeeping + features | Moderate, release-focused |
| **PicoClaw** | 1 open | 4 merged/closed (all cleared) | None | ✅ **Very Good** – clear PR backlog, stable | Quiet, maintenance |
| **NullClaw** | 0 | 1 open (new) | None | ✅ **Strong** – no defects, stable | **Low activity, stable** |
| **TinyClaw** | — | — | — | — | **Dormant** |
| **ZeptoClaw** | — | — | — | — | **Dormant** |

*\*Health Score is a qualitative composite of triage responsiveness, severity of open bugs, and merge velocity.*

---

## 3. OpenClaw's Position

**Advantages:**
- **Scale:** With 500+ issues/PRs updated in 24h, OpenClaw is the clear **community leader by engagement volume**, with 10x the activity of its nearest peer.
- **Critical mass:** This volume translates into a large user base, extensive feature surface, and a broad ecosystem of integrations.
- **Maintainer responsiveness:** Despite the backlog, maintainers (steipete, jesse-merhi) are delivering a steady stream of small, well-scoped fixes.

**Technical Approach:**
- OpenClaw is a **provider-agnostic gateway** with a mature plugin/skill system, emphasizing longevity and "run-forever" autonomy. Its architecture is increasingly complex (Codex integration, gateway RPC, OAuth flows), which is its primary strength and its primary liability.

**Community Size:**
- OpenClaw's community is **2-5x larger** (in engagement) than nearest rivals ZeroClaw/Hermes. It is the "name brand" in this space. However, this scale carries a cost: the P0/P1 backlog (memory leaks, SQLite corruption) is unstaffed, eroding user trust.

**Key Vulnerability:**
- OpenClaw's **fix-debt ratio is unfavorable**. The top P0/P1 issues (memory leak #91588, SQLite corruption #126821) have **no fix PRs in flight**, exposing a systemic backlog problem. Peers like NanoBot and IronClaw are closing critical issues in days to weeks.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects Affected | Specific Needs |
|------------|-------------------|----------------|
| **Message Delivery Reliability** | OpenClaw, NanoBot, Moltis, ZeroClaw, Hermes | Stuck final replies, unreachable "completed" states, delivery routing to originating chat |
| **Memory Management & Leaks** | OpenClaw (gateway RSS 350MB→15.5GB), CoPaw (7.6G DB), Hermes (session-state persistence) | Memory growth, zombie processes, unbounded DB writes, durable state |
| **Session-State Integrity** | OpenClaw (SQLite corruption), Hermes (proof-carrying state), CoPaw (cross-session contamination), ZeroClaw (turn progress loss) | Durability, proof of freshness, recovery from corruption, prevention of state leakage |
| **Provider Auth & OAuth Reliability** | OpenClaw (`anthropic:claude-cli` dead-ends), IronClaw (GitHub CLI mediation), ZeroClaw (device-flow) | OAuth refresh, credential staging, fail-closed security |
| **CI/CD Stability & Reliability** | IronClaw (CI expedite program), Hermes (stale skills index), ZeroClaw (Windows test flakes), NanoBot (Node 22) | Deterministic tests, canonical preflight, platform-aware pipelines |
| **Multi-Channel & Platform Parity** | Hermes (Discord/WhatsApp/Slack parity epics), NanoClaw (Mattermost, Telegram multi-instance), Moltis (WhatsApp files), ZeroClaw (iMessage voice) | Feature parity across messaging platforms, cross-platform consistency |
| **Security & Privacy Controls** | NanoBot (PromptGuard), IronClaw (sandbox credential mediation), Moltis (sandbox image validation), ZeroClaw (block_high_risk bypass) | Prompt injection defense, credential isolation, redaction before egress |
| **UI/UX for Long Sessions** | CoPaw (markdown jank), OpenClaw (terminal transcript fix), NanoBot (PWA safe-area) | Responsive streaming, collapsible reasoning, session filters |
| **Configuration & Operational Control** | CoPaw (per-session overrides), NanoBot (model switching), ZeroClaw (context window cap honored) | Dynamic reconfiguration, granular control, honoring configured limits |

---

## 5. Differentiation Analysis

| Project | Primary Focus | Target User | Architecture Distinction |
|---------|---------------|-------------|--------------------------|
| **OpenClaw** | General-purpose gateway, "run forever" autonomy | Power users, developers, self-hosted operators | Provider-agnostic, plugin/skill framework, heavy Codex integration |
| **Hermes** | Reliability engineering, architectural rigor ("sixth law" completion) | Production-complexity users, enterprises | Proof-carrying state, adversarial verification, desktop HUD |
| **ZeroClaw** | Feature breadth, large-context support, ZeroCode IDE tooling | Power users, aggressive feature adopters | SOP engine, ZeroRelay transport, GitHub Codespaces integration |
| **NanoBot** | Rapid iteration, security-first (PromptGuard) | Fullstack developers, security-conscious users | Typed provider contracts, unified usage backend, PWA support |
| **NanoClaw** | Multi-channel onboarding UX, template-driven creation | Non-technical operators, multi-tenant deployments | Wizard-driven setup, template-based agent creation, multi-instance bots |
| **IronClaw** | Disciplined engineering, sandbox security, CI quality | Rust-forward developers, near-adjacent ecosystem | Sandbox credential mediation, durable inbox, CI expedite program |
| **CoPaw** | Conversational productivity, agent creation, self-hosted Hub | Desktop users, solo developers (China-leaning, i18n growing) | Built-in tools, creator providers, memory with embedding health |
| **Moltis** | Practical automation, platform-specific polish | SMBs, non-technical chat users | WhatsApp-native rendering, cron delivery fix, stealth browser |
| **LobsterAI** | Document/library management, IM integration | Enterprise document workflows (Youdao ecosystem) | Library UX (sharing, favorites), scheduled tasks, DSH telemetry |
| **PicoClaw** | Minimalist, maintenance of core features | Light contributors, embedded developers | Long-lived dormant PRs, provider protocol (Anthropic Messages) |
| **NullClaw** | Provider gateway aggregation | Developers needing regional/single-key access | Abstraction over OpenAI-compatible providers, EUR compliance |

**Key Architectural Differences:**
- **Monolithic vs. Modular:** OpenClaw/Hermes/ZeroClaw are monolithic gateways with rich ecosystems; NanoBot/NanoClaw are modular channel+agent stacks; Moltis/PicoClaw are lightweight, task-focused.
- **Reliability Doctrine:** Hermes is unique in attempting to codify reliability invariants as executable "laws"; OpenClaw is reactive; IronClaw is process-driven (CI expedite).
- **Deployment Model:** IronClaw targets near-adjacent/fleet scenarios; CoPaw offers a self-hosted Hub; NanoClaw pushes wizard-driven multi-tenant setup; NullClaw is pure provider aggregation.

---

## 6. Community Momentum & Maturity

**Tier 1 – Rapid Iteration (High Velocity, High Community Engagement):**
- **OpenClaw** – Massive scale, but churn-bound with critical backlog risk.
- **NanoBot** – Highest merge rate relative to open PRs; exceptionally nimble.
- **NanoClaw** – Coordinated sprint cadence; strong core-team contribution; very responsive.
- **IronClaw** – Disciplined, process-driven; excellent at structural improvements.

**Tier 2 – Strong Steady-State (Moderate-High Velocity, Healthy Community):**
- **Hermes** – Strong delivery cadence (v0.20.5), but merge pause; architectural rigor offsets review lag.
- **ZeroClaw** – Active triage, security-aware, but burdened by S0/S1 bugs and open XL PRs.
- **CoPaw** – Healthy contributor base, first-time PRs landing; aging PRs and Windows issues need attention.

**Tier 3 – Stabilization / Maintenance (Low-to-Moderate Activity, Focused):**
- **Moltis** – Focused on platform-specific fixes; release imminent.
- **LobsterAI** – Housekeeping and release-prep; healthy cleanup of stale items.
- **PicoClaw** – PR backlog cleared; minimal open issues; low activity but no defects.

**Tier 4 – Low Activity / Dormant:**
- **NullClaw** – Quiet, stable, single-PR review. Likely a hobby-side project.
- **TinyClaw, ZeptoClaw** – No activity detected; likely deprecated or frozen.

---

## 7. Trend Signals

1. **Reliability is the New Differentiator:** OpenClaw's P0/P1 backlog, Hermes' "proof-carrying state" architecture, IronClaw's CI expedite program, and Moltis' cron-delivery fix all underscore a shift: **feature breadth is table stakes; autonomous, silent, forever-running stability is the competitive edge.** Decision-makers should prioritize projects with clear reliability roadmaps (Hermes, IronClaw, NanoBot) over those with churning backlogs.

2. **Platform Parity is a Requirement, Not a Feature:** Hermes (Discord/WhatsApp/Slack epics), NanoClaw (Mattermost, Telegram multi-instance), Moltis (WhatsApp file persistence), and ZeroClaw (iMessage voice) all indicate that **users expect every messaging surface to be a first-class citizen** — with native formatting, media handling, and full tool access. Projects that treat channels as "add-ons" will lose users.

3. **Security Controls Are Become Opt-In-by-Default:** NanoBot's PromptGuard merge, IronClaw's bash-command credential staging, Moltis' sandbox validation, and ZeroClaw's high-risk-command bypass report show an **ecosystem-wide push toward defense-in-depth, fail-closed behavior, and granular admin controls**. Expect stricter defaults and more security headlines.

4. **Context Windows are a UX Battleground:** ZeroClaw's 32k cap vs. 131k `max_context_tokens`, CoPaw's `/compact` regression, and NanoBot's model-switching limitation all highlight that **users want the full advertised context to be honored, with graceful degradation**. Hard-coded limits and silent truncation are top trust-eroders.

5. **Session State Integrity is the New Frontier:** OpenClaw's SQLite corruption, Hermes' durable row-ID watermarks, CoPaw's cross-session memory leakage, and ZeroClaw's interrupted turn persistence all point to **state management as the next major differentiator**. The projects that solve "session never lost, never corrupted, never confused" will dominate enterprise adoption.

6. **CI/CD Stability is Both Internal and External Value:** IronClaw's "CI expedite" program, Hermes' stale skills index, and ZeroClaw's Windows test flakes show that **developer experience is a strategic investment**. Fast, deterministic CI directly enhances contributor retention and user trust.

7. **i18n and Regionalization are Rising:** LobsterAI's i18n fixes, CoPaw's Traditional Chinese locale PR, and ZeroClaw's macOS Word-deletion request indicate a **growing global user base**, requiring locale-aware development and documentation as a baseline.

8. **Autonomous Operation is the End-State:** The overwhelming theme across all active projects is **"set it and forget it" autonomy.** Users are pushing for less approval friction (CoPaw), smarter scheduling (Moltis, NanoBot), and better queueing (PicoClaw's "after-turn" request). The projects that achieve truly reliable background operation will define the next era of AI assistants.

---

## Summary for Decision-Makers

- **For production adopters:** Prioritize **IronClaw** (process-rigor, sandbox security) and **Hermes** (reliability architecture), with **NanoBot** as a fast-moving, security-forward alternative.
- **For multi-channel, low-touch deployments:** **NanoClaw**'s wizard-driven multi-instance setup and **Moltis**' practical channel fixes are strong near-term choices.
- **For developers seeking a stable, low-churn base:** **NullClaw** and **PicoClaw** are quiet but solid; **LobsterAI** offers release-cadence maturity.
- **For pure ecosystem leadership:** **OpenClaw** still has the community and mindshare, but **fix-debt must be addressed** before it cedes the reliability crown to more nimble peers.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

Based on the GitHub data provided for NanoBot (HKUDS/nanobot) on 2026-08-22, here is the project digest:

---

# NanoBot Project Digest — 2026-08-22

## 1. Today's Overview
NanoBot is experiencing a period of **intense development and maintenance activity**. The project saw a high volume of merged pull requests (23) against a smaller number of open PRs (14), indicating a strong, sustained commit cadence and an effective code review process. While no new official releases were cut today, the team prioritized **stability fixes**, **provider infrastructure refactoring**, and **UI/UX improvements**. The issue tracker shows a healthy triage rate, with 4 of 5 recent issues closed, although a few critical bugs remain open, notably around the DingTalk integration and streaming retry logic.

## 2. Releases
No new releases were published for NanoBot during this 24-hour window. Consequently, there are no changelogs, breaking changes, or migration notes to detail.

## 3. Project Progress
The merged PRs advanced several key areas, with a strong focus on **robustness and code quality**.

- **Provider Abstraction & Stability:** Multiple PRs by `chengyongru` were merged, defining a **typed LLM usage contract** ([#5478](https://github.com/HKUDS/nanobot/pull/5478)) and a **unified provider usage backend** ([#5479](https://github.com/HKUDS/nanobot/pull/5479)). This refactoring aims to normalize token accounting across OpenAI, Anthropic, and Bedrock providers, improving cost tracking and reliability.
- **Reliability & Bug Fixes:** A critical fix for the **Cron engine** ([#5407](https://github.com/HKUDS/nanobot/pull/5407)) ensures that disabled heartbeat/dream jobs are properly retired. Another significant fix addressed the **Dream memory cursor** ([#5442](https://github.com/HKUDS/nanobot/pull/5442)), preventing infinite reprocessing loops when tool errors were recovered.
- **Security & Safety:** A long-standing PR for **PromptGuard** ([#1149](https://github.com/HKUDS/nanobot/pull/1149)) was finally merged, adding a defense layer against prompt injection attacks.
- **UI/UX Polish:** The team merged fixes for **iOS PWA safe-area controls** ([#5477](https://github.com/HKUDS/nanobot/pull/5477)) and a feature to **render LaTeX as Unicode** in the TUI ([#5476](https://github.com/HKUDS/nanobot/pull/5476)), enhancing user experience.
- **New Providers & Integrations:** Support for **DeepSeek V4 Flash Vision** was added ([#5474](https://github.com/HKUDS/nanobot/pull/5474)).

## 4. Community Hot Topics
The most active discussions center around provider reliability and system-level changes.

- **Model Switching Limitation (Issue #5198):** The highest-comment issue, highlighting a UX pain point where users **cannot switch models in an active session** without full reconfiguration. This suggests a strong user desire for more dynamic control, similar to cloud SaaS offerings. [Link](https://github.com/HKUDS/nanobot/issues/5198)
- **Operator-Facing Refactors:** The PRs defining the typed usage contract ([#5478](https://github.com/HKUDS/nanobot/pull/5478)) and the trajectory backend ([#5479](https://github.com/HKUDS/nanobot/pull/5479)) are generating significant discussion, indicating the importance and potential impact of this infrastructure work on the broader community.

## 5. Bugs & Stability
Several bugs were reported and fixed, but significant ones remain open.

- **High Severity (P1):** The issue **"DingTalk does not observe or drain inbound background tasks"** ([#5463](https://github.com/HKUDS/nanobot/issues/5463)) is the only open bug and poses a risk of task leaks or crashes in the DingTalk channel.
- **Medium Severity (P2):**
    - Two critical fixes were merged today: one ensuring disabled cron jobs stop firing ([#5407](https://github.com/HKUDS/nanobot/pull/5407)) and another fixing the Dream memory cursor loop ([#5442](https://github.com/HKUDS/nanobot/pull/5442)).
    - A fix for a **streaming retry bug** ([#5454](https://github.com/HKUDS/nanobot/issues/5454)) was also closed.
- **Security (P2):** A fix for **Slack file download validation across redirects** ([#5414](https://github.com/HKUDS/nanobot/pull/5414)) was merged, closing a potential SSRF/security hole.

## 6. Feature Requests & Roadmap Signals
The merge of the **PromptGuard safety module** ([#1149](https://github.com/HKUDS/nanobot/pull/1149)) signals a clear roadmap focus on **security and defense-in-depth**. Additionally, several open PRs point towards the next version's features:

- **Metasearch Provider (PR #5234):** The integration of `mst-python` as a metasearch provider is a strong candidate for the next release, offering aggregated search results. [Link](https://github.com/HKUDS/nanobot/pull/5234)
- **Manual-Only Skill Invocation (PR #5405):** This feature will allow skills to be configured so they cannot be automatically invoked by the model, catering to safer operations. [Link](https://github.com/HKUDS/nanobot/pull/5405)
- **Turn Observability (PR #5420):** PR to improve the WebUI by projecting each user turn into a single answer surface is likely in the pipeline.

## 7. User Feedback Summary
- **Pain Points:** A significant portion of recent user feedback revolves around **configuration complexity and the need for more granular control**. This is evident in the model-switching issue ([#5198](https://github.com/HKUDS/nanobot/issues/5198)) and the PR for manual-only skill invocation ([#5405](https://github.com/HKUDS/nanobot/pull/5405)).
- **Provider Compatibility:** The issue with **Notion MCP connection failures** ([#1168](https://github.com/HKUDS/nanobot/issues/1168)) highlights ongoing user friction when integrating with third-party services and the expectation for out-of-the-box interoperability.
- **Trust & Reliability:** Reports and fixes around the Dream memory consistency ([#5441](https://github.com/HKUDS/nanobot/issues/5441)) and retry logic ([#5454](https://github.com/HKUDS/nanobot/issues/5454)) indicate that users are deeply reliant on the system's autonomous operation and are sensitive to errors that cause token waste or state duplication.

## 8. Backlog Watch
There is a notable lack of long-unanswered issues. The oldest items in today's digest are closed, and the team is actively addressing new reports. However, attention is needed on the following:

- **Critical Security PR (Issue #1149):** While the PR was merged, the community has been watching it for a long time. The next steps should involve comprehensive testing and documentation.
- **Strategic Refactors (PRs #5478, #5479):** While merged, these are part of a larger, ongoing refactoring effort (See PR #5480). Maintaining this momentum is crucial, as it touches core provider logic.
- **P1 Bug (Issue #5463):** The just-filed DingTalk background task leak should be prioritized and assigned to maintainers for an immediate fix. [Link](https://github.com/HKUDS/nanobot/issues/5463)

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest
**Date:** 2026-08-22

---

## 1. Today's Overview

Hermes Agent is in a period of high-velocity, stability-focused development. Activity is intense: 50 issues and 50 PRs were updated in the last 24 hours, but notably **zero PRs were merged or closed today**, indicating a consolidation phase where the team is reviewing and restacking a large queue of in-flight work rather than landing new features. The release of **v0.20.5** (August 19) rolled up ~323 PRs into a stable tagged release, confirming a strong delivery cadence. Current focus is heavily weighted toward reliability engineering: fixing installation/update reliability across platforms, hardening session-state management, and addressing Windows-specific gateway bugs. The project has a clear architectural north star around "proof-carrying state" and adversarial verification, with multiple issues (#90866, #90049, #88758) formalizing these invariants. The community is active with external contributors filing detailed bug reports and submitting PRs, though maintainer bandwidth appears to be a bottleneck given the volume of unmerged work.

---

## 2. Releases

### v0.20.5 (v2026.8.19) — Released August 19, 2026

**Type:** Patch release

This tag rolls up **~323 PRs** merged since v0.20.4 into a stable tagged release for downstream consumers (Docker images, hosted deployments, fresh installs).

**Key Details:**
- Stable tag for production deployments
- Intended for Docker images, hosted deployments, and fresh installs
- Consolidates three weeks of fixes and features

**No breaking changes or migration notes were provided in the release announcement.**

---

## 3. Project Progress

**No PRs were merged or closed in the last 24 hours.** This is a notable pause in the delivery pipeline. However, the release of v0.20.5 earlier this week indicates a major consolidation point was recently reached.

**Notable PRs in active review (not yet merged):**

- **#84409** ([PR](https://github.com/NousResearch/hermes-agent/pull/84409)) — Fix for Windows gateway post-update spawn via `schtasks`; second half of fix for #84185. P2 severity.
- **#91956** ([PR](https://github.com/NousResearch/hermes-agent/pull/91956)) — Fix to refresh the gateway launcher for **every** profile, not just one, on Windows updates. Addresses a class of multi-profile update failures.
- **#91961** ([PR](https://github.com/NousResearch/hermes-agent/pull/91961)) — Full `state.db` integrity probe (beyond 16-byte header check) in the desktop app's update preflight, adding a distinct "unverified" verdict to prevent backing up corrupt databases.
- **#88256** ([PR](https://github.com/NousResearch/hermes-agent/pull/88256)) — Auto-close stale OPEN sessions (7 days idle) during auto-prune maintenance to prevent session state accumulation.
- **#91953** ([PR](https://github.com/NousResearch/hermes-agent/pull/91953)) — Gate adapter-less cron tickers on gateway liveness to prevent a second OlmMachine instance from corrupting the Matrix crypto store.

**Major epic progress:**
- **#78647** ([Issue](https://github.com/NousResearch/hermes-agent/issues/78647)) — Large-file decomposition epic **completed** (20/20 tasks done), representing a significant refactoring milestone in eliminating god-files.

---

## 4. Community Hot Topics

### Most Active Discussions

1. **#78647 — Large-file decomposition: 20/20 done** ([Issue](https://github.com/NousResearch/hermes-agent/issues/78647)) — *78 comments*
   - **Status:** Closed/Complete
   - **Analysis:** The community (led by andrexibiza) closely tracked this refactoring epic. The completion is a major signal that the codebase is becoming more modular and maintainable.

2. **#66616 — Skills index is stale or degraded** ([Issue](https://github.com/NousResearch/hermes-agent/issues/66616)) — *72 comments*
   - **Status:** Open, P3
   - **Analysis:** Automated freshness probe failing (index is 29.8h old vs 26h limit). This is a persistent, long-running infrastructure issue (open since July 18) with high engagement, indicating the skills documentation is critical to users. The issue has been in "degraded" state for over a month, suggesting chronic under-maintenance of the CI pipeline.

3. **#91277 — Fleet update reliability: one deployment plan** ([Issue](https://github.com/NousResearch/hermes-agent/issues/91277)) — *7 comments*
   - **Status:** Open, P1
   - **Analysis:** This is a **P1 tracking issue** acknowledging that install/update is "our least reliable capability" with ~30 open issues and ~15 open PRs all patching the same class of bugs. The community is consolidating around a unified solution.

4. **Discord Feature Parity (#79564)** ([Issue](https://github.com/NousResearch/hermes-agent/issues/79564)), **WhatsApp Parity (#79890)** ([Issue](https://github.com/NousResearch/hermes-agent/issues/79890)), **Slack Parity (#79772)** ([Issue](https://github.com/NousResearch/hermes-agent/issues/79772)) — *6-9 comments each*
   - **Status:** All Open, P3, meta-issues
   - **Analysis:** Active campaigns to bring each messaging platform surface to full API parity. These are well-structured epics with sub-issues and PRs tracking progress toward feature completeness.

5. **#90866 — Make observable state proof-carrying** ([Issue](https://github.com/NousResearch/hermes-agent/issues/90866)) — *7 comments*
   - **Status:** Open, P3, needs-decision
   - **Analysis:** Architectural proposal to make all observable state "proof-carrying from source to side effect." This is part of a broader reliability architecture series from andrexibiza.

### Underlying Needs

The community is overwhelmingly focused on **reliability and trust**: making updates not break installations, ensuring session state is never lost, and making the system's internal state verifiable rather than merely claimed. There's also a strong desire for **platform parity** across Discord, WhatsApp, Slack, and others.

---

## 5. Bugs & Stability

### High Severity (P1/P2)

1. **#91277 — Fleet update reliability is "least reliable capability"** ([Issue](https://github.com/NousResearch/hermes-agent/issues/91277)) — **P1, Tracking**
   - ~30 open issues + ~15 open PRs all patch corners of the same problem. No fix PR yet; this issue calls for a unified plan.

2. **#91675 — Windows: gateway start prints ✓ then dies after 6s liveness poll** ([Issue](https://github.com/NousResearch/hermes-agent/issues/91675)) — **P2**
   - Reproduced on v0.20.5. Follow-up to closed #84185. **Fix PR exists:** #84409 is in review.

3. **#89083 — Desktop permanently unresponsive after macOS sleep/wake** ([Issue](https://github.com/NousResearch/hermes-agent/issues/89083)) — **P2**
   - Half-open WebSocket never detected; reconnect guarded by `gatewayOpen()`. No fix PR yet. Significant UX impact for macOS users.

4. **#91684 — Desktop approval responds 4001 "session not found" when routed to non-owning gateway** ([Issue](https://github.com/NousResearch/hermes-agent/issues/91684)) — **P2**
   - Cross-profile session routing failure. No fix PR yet.

5. **#91927 — Gemini session title generation fails** ([Issue](https://github.com/NousResearch/hermes-agent/issues/91927)) — **P2**
   - Default thinking tokens consume the `max_tokens` budget, producing mangled titles. No fix PR yet.

6. **#88758 / #88740 — Compression: durable row-ID watermarks lost** ([Issues](https://github.com/NousResearch/hermes-agent/issues/88758), [88740](https://github.com/NousResearch/hermes-agent/issues/88740)) — **P2**
   - Session-state integrity bugs where live backups and restores can fail to prove freshness correctly. PR #88247 ([link](https://github.com/NousResearch/hermes-agent/pull/88247)) addresses part of this.

### Medium Severity (P3)

- **#87041 — Docs link WhatsApp setup to wrong bridge (whatsmeow vs Baileys)** ([Issue](https://github.com/NousResearch/hermes-agent/issues/87041)) — Documentation bug, easy fix.
- **#82851 — HUD drag broken on Linux/Wayland** ([Issue](https://github.com/NousResearch/hermes-agent/issues/82851)) — Platform-specific desktop bug.
- **#91260 — IM entry cannot drive real multi-bot pipeline (SOUL handoff is fiction)** ([Issue](https://github.com/NousResearch/hermes-agent/issues/91260)) — Feature gap for multi-profile fleets.
- **#76385 — Buzz gateway stays connected while agent appears offline** ([Issue](https://github.com/NousResearch/hermes-agent/issues/76385)) — Transport/client presence contract mismatch.
- **#91916 — Python 3.14+ compatibility: DaemonThreadPoolExecutor crash** ([Issue](https://github.com/NousResearch/hermes-agent/issues/91916)) — Closed as duplicate.

---

## 6. Feature Requests & Roadmap Signals

### Strong Signals (Multiple issues / architectural momentum)

1. **Proof-carrying state architecture** — Issues #90866, #90049, #90144, #90145, #91230 form a coherent architectural vision where Hermes is moving toward "adversarially verified" state transitions. This is likely to shape the next major release's internal architecture.

2. **Unified transactional deployment plan** — #91277 (P1 tracking) and #88683 propose a single source of truth for install/update/bootstrap. This is the #1 priority for the project based on issue severity.

3. **Platform parity campaigns** — Discord (#79564), WhatsApp (#79890), Slack (#79772) all have active meta-issues to bring features to parity with official APIs. This suggests the next releases will see significant platform surface expansions.

4. **Bot Mode unified control plane** — #91911 proposes consolidating bot identity, capability, delivery, and cancellation into one control-plane object. New architecture proposal.

5. **Exact-object completion as "sixth Hermes law"** — #91230 proposes making task completion verification an executable law governing all changes to load-bearing artifacts.

### Moderate Signals

- **Session list filters** — PR #91950 adds `--after`/`--before` date filters to `hermes sessions list`.
- **Delegation attribution IDs** — PR #91963 exposes stable `delegation_id`, `subagent_id`, `child_session_id`.
- **Windows doctor preflight** — PR #91960 adds Windows environment checks to `hermes doctor`.

### Prediction for Next Release

The next minor release (v0.21.x) will likely focus on: (1) the unified deployment plan for install/update reliability, (2) Windows gateway spawn fixes, (3) continued progress on proof-carrying state architecture, and (4) more platform-parity feature landings.

---

## 7. User Feedback Summary

### Pain Points (Recurring)

- **Install/update fragility** is by far the most common complaint. Users report broken gateways after updates, stale profiles, and Windows-specific failures (#91675, #91956, #91277).
- **Session state loss or corruption** — Users are frustrated by sessions that disappear, session tabs that vanish (#88534), approvals that route to wrong sessions (#91684), and durability issues across restores (#88740).
- **Desktop app issues on macOS** — Sleep/wake leaves the app permanently unresponsive (#89083); users must restart to recover.
- **Documentation drift** — The WhatsApp setup guide links to the wrong bridge ([#87041](https://github.com/NousResearch/hermes-agent/issues/87041)), and the Skills Hub index is chronically stale ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616)).

### Satisfaction Indicators

- **High engagement with architecture discussions** — Issues like #90866 and #91230 have substantive, multi-comment discussions, indicating a sophisticated user base that values the project's engineering direction.
- **Active external contributions** — Many PRs today are from outside contributors (wevial, dliu120, chelsealong, mss-col, jackulau, aryn-lacy), showing a healthy open-source community.
- **"WhatsApp setup guide links to whatsmeow, but the bridge is Node/Baileys"** — Direct, specific, actionable feedback; typical of users who deeply understand the product.

### Overall Sentiment

Constructively critical. Users are engaged and contributing fixes, but there is clear frustration with update reliability and session-state integrity. The project's transparency (acknowledging install/update as "least reliable capability" in a public issue) is viewed as honest, and users appreciate the architectural rigor being applied to structural problems.

---

## 8. Backlog Watch

### Items Needing Maintainer Attention

1. **#66616 — Skills index is stale or degraded** ([Issue](https://github.com/NousResearch/hermes-agent/issues/66616))
   - **Age:** Open since July 18, 2026 (35+ days)
   - **Impact:** The Skills Hub documentation site is permanently stale; automated probes have been failing for over a month.
   - **Action Needed:** Likely needs a maintainer to fix the CI cron job or the deployment pipeline.

2. **#50164 — test: add memory context validation reports** ([PR](https://github.com/NousResearch/hermes-agent/pull/50164))
   - **Age:** Open since June 21, 2026 (2 months)
   - **Impact:** Well-constructed test coverage for memory persistence; has been sitting unreviewed for 2 months.
   - **Action Needed:** Review and merge to improve test coverage.

3. **#43054 — Gmail get returns only top-level MIME part** ([Issue](https://github.com/NousResearch/hermes-agent/issues/43054))
   - **Age:** Open since June 9, 2026 (2.5 months)
   - **Impact:** Forwarded/nested email bodies are silently dropped, causing data loss for users relying on Gmail skills.
   - **Action Needed:** Complex MIME parsing fix; requires maintainer review of the `productivity/google-workspace` skill.

4. **#77162 — Secret redaction missing on tool-result → provider egress path** ([Issue](https://github.com/NousResearch/hermes-agent/issues/77162))
   - **Age:** Open since August 3, 2026 (19 days)
   - **Impact:** **Security issue** — applied secrets may leak to the model provider via tool results.
   - **Action Needed:** High-priority security fix needing immediate maintainer attention.

5. **#85644 — Webhook multi-target delivery fan-out** ([PR](https://github.com/NousResearch/hermes-agent/pull/85644))
   - **Age:** Open since August 13, 2026 (9 days)
   - **Status:** Marked `invalid` and as a merge blocker ("mixed fan-out result truth remains a merge blocker").
   - **Action Needed:** Core logic must be corrected to support mixed-success results safely before merge.

6. **#86354 — Gmail-style app passwords normalization** ([PR](https://github.com/NousResearch/hermes-agent/pull/86354))
   - **Age:** Open since August 14, 2026 (8 days)
   - **Status:** Marked `invalid` — "live submitted head — do not merge"; normalization happens before the auth endpoint is known, which is unsafe.
   - **Action Needed:** Requires architectural fix to defer normalization until after the authentication method is determined.

### Maintenance Debt

- **#88246 — chore: add shunkakinoki to AUTHOR_MAP** ([PR](https://github.com/NousResearch/hermes-agent/pull/88246)) — Simple metadata fix blocking a contributor attribution; should be merged immediately.

---

## Project Health Summary

| Metric | Assessment |
|---|---|
| **Release Cadence** | Healthy (v0.20.5 with ~323 PRs) |
| **Contributor Activity** | Strong (many external PRs) |
| **PR Merge Rate (24h)** | **Zero** — attention needed |
| **Open Issue Volume** | High (50 updated in 24h) |
| **Architectural Direction** | Clear, well-documented |
| **Reliability** | Improving but uneven (Windows/macOS gaps) |
| **Documentation** | Stale in places (#66616, #87041) |
| **Security** | One open secret-redaction issue (#77162) |

**Overall:** Hermes Agent is a rapidly evolving project with strong architectural discipline and an engaged community. The primary risk is **technical debt accumulation in the update pipeline** (acknowledged by maintainers as P1) and a **backlog of unreviewed PRs** that could stall contributor momentum. The project's willingness to formalize reliability invariants into "laws" and "proof-carrying" architectures is a differentiator that should yield compounding stability benefits in future releases.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-22

## 1. Today's Overview

PicoClaw's activity is concentrated in the pull request pipeline today, with all four PRs having been merged or closed within the last 24 hours after months of dormancy. There is just one open feature request issue, whose 0 comments and 0 reactions suggest it was recently filed and has not yet drawn community engagement. No new releases were published during this period, and GitHub API data shows zero open PRs, indicating that the maintainers have successfully cleared the existing PR backlog. The low open-issue count (1 active) combined with a completely flushed PR queue points to a project in healthy maintenance state, with attention now shifting to integration of newly merged features.

## 2. Releases

*No new releases were published during this period.*

## 3. Project Progress

All four merged/closed PRs represent long-pending work (spanning 5–6 months) that was finally integrated today:

- **[#647 — WebFetchTool text extraction enhancement](https://github.com/sipeed/picoclaw/pull/647)** (enhancement, domain: tool): Improves HTML entity decoding (`&amp;`, `&lt;`, etc.) and preserves structural readability by inserting newlines after block-level elements. This raises the quality of web-fetched content consumed by the agent.
- **[#1158 — Anthropic Messages protocol support](https://github.com/sipeed/picoclaw/pull/1158)** (feature; fixes #269): Adds `anthropic-messages` protocol prefix, enabling native Anthropic `/v1/messages` API format support. This resolves provider compatibility issues where certain Anthropic-compatible gateways only accept native API format.
- **[#714 — Skills CLI refactor and reinstall support](https://github.com/sipeed/picoclaw/pull/714)** (enhancement, domain: skill): Refactors into `skillsCmd`, adds `reinstall` subcommand with force overwrite capability, and implements GitHub Trees API-based production installs supporting `repo@branch` and optional subpaths.
- **[#1182 — AGENTS.md documentation refinement](https://github.com/sipeed/picoclaw/pull/1182)** (documentation): Converts `AGENTS.md` into a principle-first, lightweight guide for AI agents/contributors; designates `go.mod` as the source of truth for Go versioning.

No clear regressions or bugs were introduced per the merged PR descriptions.

## 4. Community Hot Topics

The single open issue, **[#3342 — Opt-in "after-turn" steering mode](https://github.com/sipeed/picoclaw/issues/3342)** (filed 2026-08-21), has no comments or reactions yet, so it cannot be classified as a "hot topic." Given the overall low issue volume and the recent flush of merged PRs, there is no community discussion thread currently dominating the repository. Maintainer attention may be better directed at triaging the newly filed issue (see Section 6) and preparing documentation for the Anthropic protocol and skills CLI changes above.

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported in the last 24 hours. The only issue on the board is a feature request, not a defect. The closed PRs contained only additive enhancements and documentation updates without noted security or stability implications. The project currently appears stable with no open defect reports.

## 6. Feature Requests & Roadmap Signals

The only new signal today is **[#3342 — Opt-in "after-turn" steering mode](https://github.com/sipeed/picoclaw/issues/3342)** (feature request, filed 2026-08-21). The proposal: when a user sends a second message while the agent is mid-task, the current design aborts Task #1's remaining tool calls (logged as *"Skipped due to queued user message"*) and injects Message #2 as a course correction. The requester wants an opt-in mode that instead *queues* the busy-session message until the current turn finishes, enabling dispatch patterns without interruption.

Given the project's rapid flush of the PR backlog and a single pending issue, this has a strong chance of being scoped for an upcoming 2026-Q4 release if maintainers accept the use case. Related groundwork (#714 skills CLI, #1158 provider protocol) may indicate a broader effort to make agent orchestration flows more controllable — the "after-turn" queue fits that trajectory. As it currently has no community traction (0 👍, 0 comments), concrete roadmap commitment is not yet observable.

## 7. User Feedback Summary

No direct user feedback (comments, reactions, or error reports) was recorded today. The sole issue author's use case explicitly targets **non-interrupting, queue-based steering** for multi-turn agent tasks — implying current mid-task interruption behavior is a real friction point for dispatcher-style or batch workloads. The three merged feature PRs (WebFetch text quality, Anthropic-native API support, skills reinstall) each correspond to previously filed requests (#269 for Anthropic support, plus web-fetch and skills pain points), indicating the maintainers are responsive to community-identified gaps. Satisfaction signals remain implicit; absent bug reports and a fully cleared PR queue suggest stable, positively received development.

## 8. Backlog Watch

**Items needing maintainer attention:**

1. **[#3342 — Opt-in "after-turn" steering mode](https://github.com/sipeed/picoclaw/issues/3342)** — *New (2026-08-21), 0 comments*. Requester is awaiting a maintainer response or triage label. Given the project has zero open PRs and one open issue, prompt triage would keep the board clean and signal continued responsiveness.
2. **Merged PRs needing follow-up documentation/blog visibility** — PRs #647, #1158, #714 have landed with no release notes or migration guidance (especially `skills reinstall` behavior change and the new `anthropic-messages` protocol prefix). A changelog entry or release note preparing users for these changes would close the loop.

No issues or PRs are stale (>30 days) or unanswered in a way that suggests abandonment; the current backlog is minimal and healthy.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-22

## 1. Today's Overview

NanoClaw is in a period of high-velocity channel integration and developer-experience hardening. Activity surged significantly over the past 24 hours, with 24 PRs updated (13 open, 11 merged/closed), indicating a mature CI loop and several coordinated feature branches landing. The core focus is clearly on expanding multi-channel support — Telegram bot instances, Mattermost integration, and Dial channel completion — alongside critical reliability fixes for the agent runtime and CI infrastructure. One new bug was reported regarding `send_card` button handling, highlighting an API contract issue between documentation, agents, and the bridge layer. No new releases were cut today, suggesting the maintainers are accumulating changes for a consolidated release.

## 2. Releases

No new releases were published in the last 24 hours. The project appears to be in a build-up phase, with multiple feature branches (Telegram multi-instance, template-based agent creation, Dial channel completion) converging toward what will likely be a significant minor or feature release in the coming days.

## 3. Project Progress

**11 PRs merged/closed today**, covering three major thrusts:

**Channel Integrations (Mattermost, WhatsApp, Matrix):**
- [PR #3202](https://github.com/nanocoai/nanoclaw/pull/3202) — **Mattermost channel integration** merged, adding a new Chat SDK channel following the `slack.ts` pattern and wrapping the community `chat-adapter-mattermost` package.
- [PR #3401](https://github.com/nanocoai/nanoclaw/pull/3401) — Fixed the WhatsApp Cloud skill so its payload remains compatible with `main`, resolving a registry-helper dependency issue.

**Registry & Skill Infrastructure:**
- [PR #3424](https://github.com/nanocoai/nanoclaw/pull/3424) — **CI test coverage for registry-backed skills** merged: the pipeline now discovers all `add-*` skills, applies them to fresh checkouts pinned to a registry snapshot, and runs their build/test flows.
- [PR #3402](https://github.com/nanocoai/nanoclaw/pull/3402) — Providers now **accept file events** emitted by branch-backed providers (no runtime or delivery changes).
- [PR #3403](https://github.com/nanocoai/nanoclaw/pull/3403) — Fixed the Matrix adapter's extensionless ESM imports (which failed under Node 22) with a committed pnpm patch.
- [PR #3433](https://github.com/nanocoai/nanoclaw/pull/3433) — `/add-dial-number` skill converted to use `nc` directives, fixing registry discovery.
- [PR #3429](https://github.com/nanocoai/nanoclaw/pull/3429) — **Driver attach surface ratified**: new `SessionExecSpec { bin, argsTty, argsPlain }` contract — drivers now *describe* their exec argv, providing a clean seam for interactive terminal attachment.

**CI & Runtime Stability:**
- [PR #3430](https://github.com/nanocoai/nanoclaw/pull/3430) — Fixed the required `ci` check after the Node 22/24 matrix renamed reported checks to `ci (22)` / `ci (24)`, which had left the exact `ci` check permanently pending.
- [PR #3439](https://github.com/nanocoai/nanoclaw/pull/3439) — Bumped container dependencies: Claude Code CLI 2.1.197 → 2.1.238, agent SDK ^0.3.197 → ^0.3.238.

## 4. Community Hot Topics

Several PRs show unusual coordination among core-team members (amit-shafnir, zvi-fried, glifocat, gavrielc), indicating a focused sprint on setup wizard and channel onboarding UX:

- **[PR #3396](https://github.com/nanocoai/nanoclaw/pull/3396) — Create agents from templates in chat** (amit-shafnir): The `create_agent` tool gains an optional `template` ref; a read-only `ncl templates list` verb enumerates local or registry templates. This is a major UX upgrade for agent creation workflows.

- **[PR #3428](https://github.com/nanocoai/nanoclaw/pull/3428) — Telegram/Slack template ref carry-through** (amit-shafnir): Re-ports the Slack creation flow to carry the template ref end-to-end. Notably, it supersedes #3397, which was merged out of order and reverted — evidence of a fast-moving but careful review process.

- **[PR #3436](https://github.com/nanocoai/nanoclaw/pull/3436) — Named Telegram bot instances** (amit-shafnir): `TELEGRAM_INSTANCES` environment variable enables multiple bot instances with instance-bound pairing. This is the largest feature in flight.

- **[PR #3438](https://github.com/nanocoai/nanoclaw/pull/3438) — Setup wizard "add another bot" path** (amit-shafnir): Directly builds on #3436, making multi-bot configuration wizard-driven.

The underlying need across these PRs: **operators managing multiple tenants or environments need first-class multi-instance support with guided, idempotent setup**, not manual config editing.

## 5. Bugs & Stability

**Severity: Medium**

- **[Issue #3426](https://github.com/nanocoai/nanoclaw/issues/3426) — `send_card` docs promise callback buttons the bridge drops** (glifocat): The `send_card` documentation tells agents they can supply `actions` (buttons), but the bridge silently discards any action lacking a `url`. The agent sees its buttons vanish, reads the only hint (`fallbackText` about platforms without card support), and incorrectly tells the user the platform cannot render buttons — misattributing a bridge limitation to the platform.

**Fix status:** No fix PR yet. This is a documentation-vs-behavior contract defect with an AI-facing failure mode (misleading error attribution). Likely to be picked up quickly given glifocat is also active on fix PRs (#3432).

**Severity: Low (addressed)**

- **[PR #3431](https://github.com/nanocoai/nanoclaw/pull/3431) — Telegram pairing card says 6 digits** — Cosmetic mismatch in the setup wizard.
- **[PR #3434](https://github.com/nanocoai/nanoclaw/pull/3434) — Polling adapters don't open the webhook server** — Correctness fix for polling-mode adapters.
- **[PR #3432](https://github.com/nanocoai/nanoclaw/pull/3432) — Dial post-merge follow-ups** — Credential re-run, step captions, registry CI fixes from glifocat.

## 6. Feature Requests & Roadmap Signals

**Clearly on the near-term roadmap (in active PRs):**

- **Template-based agent creation** (#3396) and its Telegram/Slack carry-through (#3428) — expect agents to be instantiable from curated templates via natural-language chat commands.
- **Multi-instance Telegram support** (#3436, #3438, #3435) — named bot instances via `TELEGRAM_INSTANCES`, instance-aware pairing, and wizard-driven multi-bot setup. This, combined with the Dial channel work (#3050 merged earlier), makes NanoClaw a strong multi-channel, multi-tenant gateway.

**Signals for the next release:**

- **Driver attach surface** (#3429) — the ratified `SessionExecSpec` contract strongly implies imminent support for interactive terminal attach in the chat SDK or CLI. This pairs with the template work to deliver a richer "agent as a session" experience.
- **Mattermost** (#3202) just merged — expect announcement in the next release notes.

## 7. User Feedback Summary

User pain points voiced in the last 24 hours are minimal but sharp:

- **Wrong blame attribution** (Issue #3426): When card actions fail, agents blame the platform. This is a trust-eroding failure: users may think the channel doesn't support interactive cards when the bottleneck is NanoClaw's own bridge. Documentation must align with bridge behavior, or the bridge should surface a more accurate error.

- **Multi-channel setup friction**: The rapid-fire wizard PRs (#3438, #3435, #3431) suggest users found initial Telegram pairing confusing (wrong digit count, unclear instance concepts). The team is responding with guided flows rather than documentation patches — a good sign.

- **Compatibility anxiety** (PR #3403, #3401): Node 22 failures and registry-helper mismatches indicate that channel skills can break when composed with main. The new registry CI (#3424) is the direct systemic fix for this class of pain.

Overall satisfaction appears high given the sustained core-team contribution velocity; no user-facing complaints about core agent behavior surfaced today.

## 8. Backlog Watch

- **[PR #3287](https://github.com/nanocoai/nanoclaw/pull/3287) — Strip agent-group suffix from inbound platform message ID** (wakqasahmed): Opened 2026-08-17, still open after 5 days with no comments. Fixes Issue #3153. It addresses `getMessageIdBySeq()` returning inbound `messages_in.id` verbatim when it isn't the platform message ID. This is a correctness fix for cross-platform message threading; it deserves a review to avoid regression risk in the group-agent model.

- **[PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050) — Dial in the channel picker** (OmriBenShoham): Opened 2026-07-14, recently closed (likely superseded by later Dial work from glifocat). No action needed, but worth noting the original author's scope has been absorbed by the core team's Dial push.

- **No stale issues**: Issue #3426 is the only open bug and is fresh. No long-abandoned user issues need attention today.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw Project Digest — 2026-08-22

## 1. Today's Overview

NullClaw is currently in a **low-activity maintenance phase**, with zero issues updated in the past 24 hours and no new releases published. The single piece of activity is an **open pull request (#990)** proposing Eden AI as an OpenAI-compatible gateway provider, which has been open for just one day. While the low issue volume suggests a stable and quiet period, the presence of an active PR indicates ongoing feature development continues. No regressions, bugs, or user complaints were reported today, pointing to a healthy, stable codebase. Overall project health appears **solid** — the quiet is likely a lull rather than stagnation.

## 2. Releases

**No new releases** were published in the last 24 hours. The most recent release history remains unchanged; users should refer to prior release notes for migration guidance.

## 3. Project Progress

**No PRs were merged or closed** in the last 24 hours. The only PR activity is the newly-opened contribution described below. The project's feature pipeline appears to be accumulating changes rather than shipping them today.

## 4. Community Hot Topics

**[PR #990 — feat(providers): add Eden AI as an OpenAI-compatible gateway](https://github.com/nullclaw/nullclaw/pull/990)**
- **Author:** MVS-source | **Created:** 2026-08-21 | **Comments:** 0 | **👍:** 0

This is the sole active discussion item. The PR follows the established pattern of **#922 (NEAR AI Cloud and Atlas Cloud)** — implementing Eden AI through the existing `OpenAiCompatibleProvider` rather than building new provider logic. The underlying need: **users want a single-key gateway to multiple upstream vendors**, with Eden AI specifically offering EU-based infrastructure. The lack of comments and reactions suggests early-stage review. The maintainer's response time and the PR's acceptance will likely be watched by the community as a signal of the project's openness to new provider integrations.

## 5. Bugs & Stability

**No bugs, crashes, or regressions** were reported in the last 24 hours. With zero open issues and zero updated issues, there is no new stability concern to surface. The project continues to demonstrate **strong stability** with no outstanding defect backlog visible in the reported data.

## 6. Feature Requests & Roadmap Signals

The **Eden AI gateway PR (#990)** is a direct response to a clear user demand: **aggregated access to multiple AI vendors through a single API key**, with a preference for **EU-based data residency** (Eden AI's European operations are an explicit selling point). The PR's alignment with the precedent set by #922 suggests the maintainers have **established a pattern for accepting gateway-style providers** — this is a low-risk, high-value addition. Given the clean implementation (no new provider code, just configuration), it is **highly likely this will land in the next minor version** if no review objections arise. Future roadmap signal: expect more vendor gateways targeting regional compliance (e.g., other EU providers) or specialized domains.

## 7. User Feedback Summary

With no issue activity and zero comments on the open PR, **direct user feedback data is unavailable** for today. Indirect signals from the PR itself: the contributing user found the existing `OpenAiCompatibleProvider` abstraction sufficient and intuitive, indicating **satisfaction with the provider architecture** and its extensibility. The absence of bug reports or complaints is a weak but positive indicator — 24 hours with no issue traffic implies **no acute pain points** among the user base. Developers appear to be in a **stable usage phase**, building on existing abstractions rather than fighting them.

## 8. Backlog Watch

**No items require maintainer attention** in the backlog today. There are zero open/active issues, zero unanswered PRs older than 24 hours, and no long-dormant discussions. The only pending item is **PR #990**, which is fresh (one day old) and should receive a timely first review. The maintainers' attention this week should be focused on **triaging and responding to PR #990** — both to integrate a useful provider and to signal responsiveness to the contributor community. A prompt review will reinforce the project's health and openness.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-22

## 1. Today's Overview

IronClaw is in a period of exceptionally high development velocity and disciplined engineering. The 24-hour window shows a heavily active CI/CD consolidation initiative (Issues #7798–#7801, the "CI expedite" program) led by a core contributor, alongside substantial parallel work in sandbox security mediation and notification infrastructure. With 36 PRs updated and 15 issues touched in a day, the project is clearly past the "greenfield" phase and deep into hardening, scaling, and developer-experience optimization. The team is executing a clear strategy: reduce CI flakiness and latency, centralize credential management, and build out a durable notification and inbox system. Notably, there are zero new releases today, suggesting the project is consolidating a large body of merged work before the next tag.

## 2. Releases

No new releases were published in the last 24 hours. The most recent release remains `release/2026-08-17`, which is actively receiving forward-ports of bug fixes (see PR #7804 and #7805), indicating an active maintenance LTS-style branch.

## 3. Project Progress

Today saw **16 PRs merged or closed**, with several significant features landing:

- **CI/CD Expedite Program (Tasks 1–4):** While the core PRs (#7809, #7798–#7801) remain open, foundational work is landing. The "CI expedite" initiative is systematically replacing a patchwork of 43 scattered toolchain invocations, sequential test loops, and divergent PR/queue gates with a single canonical gate list and unified setup action.
- **Sandbox GitHub CLI Mediation (PR #7807, #7806, #7796):** A series of PRs merged to mediate `gh` command credentials through the sandbox, adding direct-executable sandbox paths, invocation-scoped credential staging, and fail-closed audit handling (Railway).
- **Telegram Channel Reliability (PR #7803):** Fixed a bug where paired Telegram bots would die without a personal device-link credential, and de-conflated workspace-bot pairing from personal account auth.
- **Forward-Ports (PR #7804, #7805):** Critical fixes for `IRONCLAW_REBORN_WORKSPACE_ROOT` and Clippy 1.98 lint failures were backported to the maintenance release branch, unblocking PR CI for that track.
- **Guidance Audit (PR #7797):** A massive housekeeping effort pruned 21.5k lines of agent-guidance docs and consolidated tests onto the `AGENTS.md` convention.
- **Notification Infrastructure (PR #7699, #7700):** Merged PRs that publish actionable run gates and authoritative, journal-derived run outcomes to the durable user Inbox, completing a major phase of the notification center generalization.

## 4. Community Hot Topics

- **[Issue #7801 — CI expedite T4: canonical preflight](https://github.com/nearai/ironclaw/issues/7801) (3 comments):** This issue is part of a 4-issue series (with #7798, #7799, #7800) authored by a core maintainer, dissecting CI pain into parallel work tracks. The high comment count on each suggests these are not just tickets but detailed engineering blueprints. The underlying need is clear: **CI is a bottleneck to contributor velocity**, and the team is investing heavily in making it canonical, fast, and deterministic.
- **[Issue #7664 — Pluggable memory over MCP](https://github.com/nearai/ironclaw/issues/7664) (2 comments):** A long-running epic (open since Aug 14) to make external memory providers bindable. The comments reference a strategy decision about taint/redaction responsibilities, indicating active architectural discussion between the host and provider crates. The underlying need is **extensibility and privacy** — allowing specialized memory backends without compromising data security.
- **[Issue #7799 — CI expedite T2: nextest pipeline](https://github.com/nearai/ironclaw/issues/7799) (3 comments):** The move to `cargo-nextest` and per-test JUnit roll-ups represents a significant quality-of-life upgrade for debugging CI failures, addressing the pain point of "one failing test hides twenty others."

## 5. Bugs & Stability

Several bugs were reported or fixed today, ranked by potential impact:

- **[High] [Issue #7813 — UI: heading cropped by suggestions panel](https://github.com/nearai/ironclaw/issues/7813):** A visible UI regression on the chat home screen where the main heading is cut off. This is a user-facing polish issue, likely a CSS flex layout bug. No fix PR yet.
- **[Medium] [Issue #7808 — Memory write path: redaction + taint metadata required](https://github.com/nearai/ironclaw/issues/7808):** A security-adjacent blocker for the pluggable memory feature. The host currently egresses verbatim conversation content to external providers, which is unacceptable. This is correctly gating the feature from going live.
- **[Low/Medium] [PR #7804 & #7805 (Merged)] — Forward-port fixes:** The `IRONCLAW_REBORN_WORKSPACE_ROOT` env var was missing from the release branch (breaking workspace overrides), and Clippy 1.98 lint errors were failing all PRs on the release line. Both fixed today.
- **[Low] [PR #7796 (Merged)] — Railway audit append failures:** The sandbox now fail-closes when it cannot append audit records to the Railway proxy, preventing silent security log loss.

## 6. Feature Requests & Roadmap Signals

- **Pluggable Memory (Issue #7664):** The architecture is being finalized. Expect the `ironclaw_memory_mcp` provider crate to be merged soon, enabling external memory backends like Mnesis Core. This will likely be a headline feature of the next minor release.
- **Durable User Inbox (Epic #7687):** The foundation is merged. The next steps will be generalizing the frontend even further and adding more notification types.
- **[PR #7810 & #7807 — Sandbox GitHub CLI Mediation](https://github.com/nearai/ironclaw/issues/7810):** This adds a huge capability: allowing users to safely run `gh` inside the sandbox with permission-aware credential injection. This unlocks a new class of "agentic DevOps" workflows.
- **[PR #7811 — Bundled Xquik Hosted MCP](https://github.com/nearai/ironclaw/pull/7811):** A new contributor bundled Xquik for Twitter/X data with modern OAuth 2.1. This is a good sign for ecosystem growth and the MCP marketplace.
- **Design System (PR #7257, #7750):** Phase 1 of the WebUI design system (Storybook + catalog) is nearing completion, with PRs being recreated cleanly to avoid merge tangles. This points to a major UI uniformity push in upcoming releases.

## 7. User Feedback Summary

- **Developer Experience (CI):** The sheer volume of "CI expedite" issues (4 large tracks in one day) signals strong internal dissatisfaction with CI latency and flakiness. The team is responding with a structural overhaul, not band-aids. This is a positive sign for open-source contributors, as fast, reliable CI directly impacts contribution velocity.
- **UI Polish:** Issues #7813 (heading crop) and the ongoing migration to `InlineNotice` (#7793) and shared page primitives (#7792) suggest that while features are landing, there is a conscious effort to clean up visual inconsistencies and technical debt.
- **Telegram UX:** The closed bug (Issue #7715) about the confusing bot/personal account connection flow was fixed in PR #7803, demonstrating a tight bug-fix cycle for QA-reported issues on the Railway test instance.
- **Data Privacy:** Issue #7808 highlights a real user concern: the fear of external services reading raw conversation data. The project is treating this seriously by blocking the feature until proper redaction and taint metadata are implemented.

## 8. Backlog Watch

- **[PR #7456 — Durable storage profile-agnostic](https://github.com/nearai/ironclaw/pull/7456) (Open since Aug 10):** A large PR (XL) with medium risk. It remains open for 12 days, which is unusual given the velocity elsewhere. It requires a "typed security envelope" and may be blocked on architectural review. This is a critical foundation for multi-profile tenancy.
- **[PR #7516 — WebUI operator surface for IronHub agent link](https://github.com/nearai/ironclaw/pull/7516) (Open since Aug 12):** Open for 10 days. This is a UI feature by a new contributor (neo-sky). It may need maintainer review attention to avoid stagnation, especially since the environment-variable-gated operator flows it replaces are being removed elsewhere (see PR #7802).
- **[Issue #7687 — WebUI notification center to user inbox epic](https://github.com/nearai/ironclaw/issues/7687):** While substantial parts are merged, the epic itself remains open. Maintainers must ensure the remaining generalizing work (informational notifications, etc.) is scheduled before the epic goes stale.
- **[PR #7491 — OMP core-tool contract (+6 months?)](https://github.com/nearai/ironclaw/pull/7491):** Open since Aug 11, this is a massive XL change to the core coding tool surface. It appears to be a significant breaking change (removing old file tools) and needs a maintainer to shepherd it through code review and merge to avoid a long-lived branch that diverges from `main`.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-22

## 1. Today's Overview

LobsterAI shipped a new release (`2026.8.21`) merged into `main` via PR #2519, bundling three significant changes: an update of the experimental DeepSeek Harness (DSH) runtime to `0.1.1-rc.1`, improved Windows integration reliability, and new privacy-conscious analytics for DSH feature usage. The library module saw substantial UX polish—better file sharing/favorites handling, refined preview dialogs, and improved empty-state distinction—across four merged PRs. Twelve PRs were closed or merged today (including 7 stale items from April), signaling healthy cleanup of long-pending work alongside active feature development. One PR remains open and merits attention (see Backlog Watch). Two stale issues were closed administratively without code changes, neither requiring runtime intervention. Overall activity is robust and release-focused, with no regressions reported post-merge.

## 2. Releases

**No new versions released today** (the `2026.8.21` release was merged to `main` but not tagged as a new version in the monitored period). The just-merged release bundle (PR #2519) will presumably become the next tagged version; highlights from the merge include:
- **DSH runtime updated to `0.1.1-rc.1`** — experimental harness improvements (PR #2516).
- **Windows integration reliability fixes** (part of PR #2515/#2519).
- **New DSH usage analytics** — fire-and-forget tracking of enable-toggle and workbench-open success/failure with error codes (PR #2515, refactored renderer-side in PR #2518).

No new breaking changes or migration notes were documented in the merged release PRs. Users on the DSH experimental track should expect behavioral changes from the runtime update; stable-track users are unaffected.

## 3. Project Progress

Twelve PRs were merged or closed. Notable merged work today:

- **DSH runtime bump & analytics backend** — PR #2516 (dep update to `0.1.1-rc.1`), PR #2515 (main-process analytics reporter), PR #2518 (moved analytics event building from main to renderer for cleaner IPC separation). This family of work makes DSH usage observable without performance risk to IPC callers.
- **Library UX overhaul** — PR #2514 (preview dialog sizing, removed delete-file entries, distinct empty/filter-no-result states, one-click clear for search boxes, fixed duplicated placeholder substitution in quota modals, i18n/docs/type updates) and PR #2517 (Unicode-safe filename packing when sharing, fallback to original titles for legacy files, instant favorite-state updates with rollback on failure, dedup of list refreshes, unified subscription/quota modal styling and behavior). These changes meaningfully improve artifact management ergonomics.
- **IM chat handler fix** (PR #1215, stale, merged) — chat handler now always rebuilds on `setConfig` even when platform-specific credential saves omit the `settings` key; previously systemPrompt/sk… changes could go stale for DingTalk/Telegram saves. Important correctness fix for multi-platform IM users.
- **Scheduled-task sorting rewrite** (PR #1218, stale, merged) — task list no longer sorts by UUID (random); now ordered by creation semantics, making new tasks appear predictably and enabled/disabled tasks distinguishable.
- **Cowork rendering & query performance** — PR #1219 (added `React.memo` to session list items; consolidated 4 independent `useSelector` hooks in `CoworkSessionDetail`) and PR #1220 (eliminated N+1 queries in `recentChats()` and `conversationSearch()` by batching latest-message lookups). Both address jank during streaming output and long session lists.
- **i18n & modal UX fixes for agent creation** (PR #1224, stale, merged) — replaced hardcoded Chinese label `'输入文件'` with `i18nService.t('coworkInputFileLabel')` (English users now see "Input file"); added Escape-key close and double-click protection to `AgentCreateModal`/`AgentSettingsPanel`.

## 4. Community Hot Topics

No issues or PRs received above-average engagement today; all items have **zero 👍 reactions** and modest comment counts (**2 comments** on each of the two closed issues).

The most substantive discussion centers on **issue #1223** (i18n/UX bugs in the agent prompt input and modals) — closed via PR #1224, with 2 comments. It reflects a broader user concern: **non-Chinese users still encounter hardcoded Chinese strings in the product**. The fix pattern (i18n key introduction) is likely to be replicated as more hardcoded strings are discovered.

Second is **issue #1217** (intermittent gateway restarts occurring 3–5 times daily on Windows 10) — closed as stale without a code fix. The user provided detailed logs and environment info; the closure without resolution may disappoint affected users, but the low report count (single reporter) suggests limited blast radius.

## 5. Bugs & Stability

**No new bugs were reported today.** The two closed issues (#1217, #1223) were resolved or administratively closed:

- **Medium severity (historical, closed as stale):** Intermittent gateway restarts on Windows 10 (Issue #1217) — user saw 3–5 daily restarts, provided logs (`lobsterai-logs-20260401-180401.zip`). No fix merged; closed for inactivity. Regression risk if it recurs.
- **Low severity (fixed):** Hardcoded Chinese label in `CoworkPromptInput` (Issue #1223) — fixed in PR #1224.

No crashes, data loss, or regressions were reported in the last 24h. The merged release (PR #2519) touched analytics and DSH internals; no post-merge issues have surfaced yet.

## 6. Feature Requests & Roadmap Signals

- **DSH telemetry (PR #2515, #2518):** Analytics for enable-toggle and workbench-open signals indicate the team is preparing to validate DSH adoption metrics — expect possible product decisions informed by these data points (e.g., graduation from experimental status).
- **Library UX trajectory (PR #2514, #2517):** The continued investment in artifact preview, sharing, and favorite interactions suggests the library is becoming a core surface; watch for deeper cloud-integration features (search-box clear, empty-state distinctions).
- **Windows reliability work (in release #2519):** Ongoing Windows integration fixes suggest cross-platform parity is a roadmap priority.

No new explicit feature requests were filed today.

## 7. User Feedback Summary

- **Positive:** Library users benefit from Unicode-safe sharing (fixes filename mangling for non-ASCII titles), improved favorites handling (instant updates + rollback), and clearer empty states. IM admins get correct handler refresh on credential saves.
- **Negative/Pain points:** The i18n gap is the loudest recurring them — English users are still seeing Chinese strings baked into prompts and UI; this was fixed only in the agent-creation flow, not globally. The stale-closed gateway restart issue (Issue #1217) remains unresolved; affected users may feel unheard despite detailed logs.
- **Neutral:** DSH analytics are privacy-conscious (fire-and-forget, documented shapes), which may reassure users concerned about telemetry.

## 8. Backlog Watch

**Open PR #1550** (`fix(scheduledTask)`: 投递模式为"不通知"时, 去除发送给网关的 channel/to 字段) — open since **2026-04-07**, last updated **2026-08-21** (merged?) — wait, it shows OPEN but was updated yesterday; in the data it is listed as 1 open PR. It fixes a real runtime bug: scheduled tasks created via chat/IM with delivery mode "none" fail at trigger time with "Channel is required when multiple channels are configured", while UI-created tasks work. The root cause (different delivery-object construction paths) is clearly documented. This has been open for **4.5 months** despite a complete diagnosis and fix; it needs maintainer review or explicit deprecation.

**Issue #1217** (intermittent gateway restarts, Windows 10, 3–5× daily) — closed as stale with no fix. If it resurfaces in new reports, should be re-opened and prioritized, as it affects daily usability on a major OS.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

Here is the Moltis project digest for **2026-08-22**.

---

# Moltis Project Digest — 2026-08-22

## 1. Today's Overview
Moltis is in a **high-velocity integration and stabilization phase**. Activity over the last 24 hours was substantial, with **8 PRs updated** (7 open, 1 merged/closed) and **2 new open issues**. The maintainer team is actively addressing **critical platform-specific bugs**, particularly around the WhatsApp connector (file persistence, Markdown rendering), cron/scheduler logic (heartbeat, delivery routing), and browser stealth mode. The community is contributing quality fixes, notably a significant Traditional Chinese locale overhaul. While no new releases shipped, the volume of merged and in-flight PRs suggests a **release candidate is likely imminent** as the team clears a backlog of platform fixes. Project health is strong, with high responsiveness and active community participation.

## 2. Releases
**No new releases were published in the last 24 hours.**
*(The latest available version remains v0.9.10, referenced in PR #468 testing.)*

## 3. Project Progress
One PR was merged/closed, and several high-impact fixes are progressing rapidly.

- **Merged — WhatsApp Markdown Rendering (#1220)**: Closed by `rubenssoto`. This fix converts model-generated Markdown into WhatsApp-native markup (bold, italics, etc.) for outbound text messages and media captions. Crucially, the original Markdown is preserved in session history and the web UI, ensuring fidelity for developers while improving the UX for end-users.
- **In Review — WhatsApp Inbound File Persistence (#1228)**: Aims to download and persist inbound documents/photos to a stable `local_path` (with a 20 MB limit) so local tools can process them, rather than receiving only metadata.
- **In Review — Cron Delivery Routing (#1226)**: Fixes a critical flaw where scheduled task outputs were not being delivered back to the originating chat; adds a `payload.deliver_to_current_chat` shortcut to resolve the destination from gateway context.
- **In Review — Obscura Stealth Mode (#1227)**: Proposes enabling the Obscura browser's stealth mode by default while adding a `tools.browser.obscura_stealth` config toggle (default `true`) for operators.
- **In Review — Sandbox Image Validation (#1222)**: Adds strict validation for image references/package names before container use, and restricts such builds to administrators—a key security hardening step.

## 4. Community Hot Topics
While no issues have comments or reactions yet, the most actively discussed PRs reveal pressing operational needs.

- **[#1226] Cron Delivery to Originating Chat**: This PR addresses a fundamental expectation gap—users expect scheduled tasks to report back to the chat where they were created. The underlying need is for a **more intuitive and conversational automation model**.
- **[#1228] WhatsApp File Persistence**: The most critical connector gap. Users need full omni-channel tooling, meaning files from messaging apps must be transparently available to the AI's local processing tools.
- **[#1208] Heartbeat Active Hours Have No Effect**: This long-standing bug (opened 8/17) indicates a silent failure in a core feature. The active community contribution to fix it signals that users rely on `active_hours` for cost control and scheduling, but discovered it was non-functional.

## 5. Bugs & Stability
Two new bugs were reported, both serious but with existing or imminent fixes.

- **Bug #1223 — `heartbeat.active_hours` has no effect** *(Medium Severity)*: A logic flaw in `is_within_active_hours` means the feature never suppresses job execution, rendering the configuration useless. **Fix: PR #1208 is open and directly addresses this regression.**
- **Bug #1224 — Tools stop working in shared Slack channels** *(High Severity)*: A critical integration failure for team deployments. The report lacks full context (user did not include session logs). **Fix: No specific PR attached yet; requires immediate maintainer investigation.**

## 6. Feature Requests & Roadmap Signals
- **Native Markdown Support (WhatsApp)**: The merged fix in #1220 signals a roadmap emphasis on **platform-native content formatting** across all connectors.
- **Browser Stealth/Privacy by Default**: PR #1227 suggests a shift toward **privacy-forward defaults** for the browser tool, with an operational opt-out.
- **Enhanced Security Controls**: PR #1222 indicates a focus on **hardening the web sandbox** and restricting privileged operations to admins, a move toward enterprise-grade security.
- **Locale Expansion**: PR #1225 highlights ongoing investment in **internationalization** (i18n) to improve accessibility for global users (zh-TW in this case).

## 7. User Feedback Summary
- **Pain Point (Automation)**: Users report scheduled tasks ("cron") silently failing to return output to the expected chat, breaking their automation workflows.
- **Pain Point (Configuration)**: The `heartbeat.active_hours` setting is confusing because it appears to work in docs but has no runtime effect, eroding trust.
- **Pain Point (Cross-Platform)**: Users confirm Windows compatibility is still a concern, and require `cmd.exe` support for shell hooks (PR #468).
- **Request (Data Access)**: A user specifically needs WhatsApp media to be available to AI tools, indicating a desire to use Moltis for **data-rich, multi-modal interactions** from chat platforms.
- **Satisfaction**: The swift community-driven fixes (e.g., Markdown rendering, locale improvements) indicate a generally positive sentiment toward the project's direction and technical approach.

## 8. Backlog Watch
- **[#468] Use `cmd.exe` for shell hooks on Windows** *(Open since 2026-03-23)*: This PR has been waiting for over **5 months** and is essential for basic functionality on Windows. It is tested (including on Windows 10 and CI) and remains unmerged, blocking a significant user base from a core feature. This is the highest-priority item needing maintainer attention.
- **[#1208] Honor heartbeat active hours** *(Open since 2026-08-17)*: While a fix exists, this PR is tied to a real bug and needs review/merge to prevent further config confusion.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-22

## 1. Today's Overview

The project is in a **high-velocity stabilization and feature expansion phase**, with 34 issues and 36 PRs updated in the last 24 hours. Development activity is heavily concentrated on bug fixes stemming from the recent 2.1.x releases, with significant effort going into MCP connection resilience, session context integrity, and UI/UX polish. Notably, two **first-time contributor PRs** (#7211, #6808) indicate a healthy, growing open-source community. The PR pipeline is robust, with 21 open PRs awaiting review/merge, while 15 were closed/merged — suggesting maintainers are actively triaging but may have a slight review backlog. No new releases were cut today, but a version bump PR to v2.1.1b2 (#7200) signals an imminent patch release.

## 2. Releases

No new releases were published in the last 24 hours. However, `PR #7200 — chore: bump the version to v2.1.1b2` was merged, indicating a beta release is imminent. Users on v2.1.1-beta.1 are currently experiencing a regression in `/compact` functionality (see Issue #7206), so this upcoming beta likely contains fixes for that and other post-2.1.0 regressions.

## 3. Project Progress

Fifteen PRs were merged or closed today. Notable merges and their significance:

- **`#7187 — fix(chat): disable thinking for title generation`**: Addresses reasoning models emitting "thinking process" text during auto-title generation, polluting titles. Ships with regression coverage.
- **`#7205 — test(coverage): fix Windows integration coverage always reading 0`**: Fixes a significant testing blind spot — Windows nightly integration coverage has been silently reporting 0 executed lines since June 26 (#5531). Adds fail-closed guard to prevent silent empty collections.
- **`#7112 — feat(hub): add self-hosted multi-user Hub`**: Merged despite being recently opened; introduces an opt-in self-hosted control plane (`qwenpaw hub`) running isolated QwenPaw instances for local accounts — a significant architectural addition.
- **`#7176 — perf(console): keep long chat sessions responsive`**: Addresses UI jank during streaming Markdown-heavy sessions by eliminating redundant synchronous reparse work.
- **`#7200 — chore: bump version to v2.1.1b2`**: Version bump for upcoming beta.
- **`#7205` (same as above)** and **`#7200`** were today's closures.

Additionally, legacy testing backlog items (#5580, #5437, #5433, #5419, #5007, #5006, #5005, #5004) were closed, completing the frontend/backend unit test coverage sprints (M1–M4), which adds ~585 test cases to the project.

## 4. Community Hot Topics

The most active discussions center on **operational reliability and session management**:

- **[#6524 — MCP backend restart breaks client connection (6 comments)](https://github.com/agentscope-ai/QwenPaw/issues/6524)** — *Open*: When a remote MCP Server restarts, CoPaw reuses a stale `mcp-session-id` and fails. Workaround requires manual `list mcp` command. This highlights an important edge case in long-running agent operations where external dependencies are ephemeral.
- **[#6780 — App freezes after idle ~30 min (4 comments)](https://github.com/agentscope-ai/QwenPaw/issues/6780)** — *Closed*: Idle timeout causing process hang; user forced to kill/restart. Closed without visible fix note suggests either a known upstream issue or works-as-intended behavior being communicated.
- **[#7016 — Tool call returns 404 in streaming sessions (3 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7016)** — *Open*: `/api/tool-calls/{session_id}/{tool_call_id}/offload` returns `{"detail":"Tool call not found"}`. Likely a race condition between session state and async tool offload.
- **[#7156 — Embedding health check hardcoded 5s timeout (3 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7156)** — *Open*: Even when Ollama is warm, health check times out (10.4s elapsed vs 5s cap) and silently degrades to BM25-only retrieval. Timeout is hardcoded with no config option — a UX and flexibility gap.

**Underlying need**: Users are consistently hitting edge cases around **session lifecycle and state management** — connection resets, idleness, timeout handling. The common thread is a desire for CoPaw to be more resilient and self-healing without requiring user intervention.

## 5. Bugs & Stability

Ranked by severity and potential impact:

| Severity | Issue | Description | Status |
|----------|-------|-------------|--------|
| **High** | [#7206 — v2.1.1-beta.1 `/compact` fails with pydantic ValidationError](https://github.com/agentscope-ai/QwenPaw/issues/7206) | Regression in beta; manual compact always fails when `compact_threshold_ratio == 0.9`. Confirmed via rollback. | Open, 2 comments |
| **High** | [#7168 — history.db ballooned to 7.6G (closed)](https://github.com/agentscope-ai/QwenPaw/issues/7168) | `ToolResultCapMiddleware` writes full tool output into `conversation_history` beyond 3000 tokens, causing unbounded DB growth and duplicate writes. | Closed |
| **High** | [#7210 — Built-in tools not injected into agent schema](https://github.com/agentscope-ai/QwenPaw/issues/7210) | Tools enabled in agent.json but missing from session function schema (console/dingtalk channels) — inconsistent tool surface. | Open, 1 comment |
| **Medium** | [#7199 — `daily_paper` crashes on PDFs with surrogate characters](https://github.com/agentscope-ai/QwenPaw/issues/7199) | `UnicodeEncodeError: surrogates not allowed` in `write_atomic` kills entire job. | Open, 1 comment |
| **Medium** | [#6427 — WebView2 renderer crash on v2.0.0+post.4 (7s after launch)](https://github.com/agentscope-ai/QwenPaw/issues/6427) | Deterministic assertion failure at `msedge.dll+0x36c7f6d`; post.3 works fine — frontend change regression. | Open, stale (>28 days) |
| **Medium** | [#7136 — Chinese filenames show percent-encoded mojibake](https://github.com/agentscope-ai/QwenPaw/issues/7136) | File cards display encoded garbage when `send_file_to_user` handles non-ASCII names. | Open, 2 comments |
| **Low-Med** | [#7193 — Cross-session memory contamination (web)](https://github.com/agentscope-ai/QwenPaw/issues/7193) | Agent recalls content from another session of the same agent during memory search. | Open, 1 comment |
| **Low-Med** | [#6430 — Startup hang ~85s on desktop](https://github.com/agentscope-ai/QwenPaw/issues/6430) | Consistent background startup stall in Tauri+PyInstaller build. | Open, stale |

**Fix PRs in flight**: [#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211) (prevent injected context persisting as user history — likely related to #7193), [#7194](https://github.com/agentscope-ai/QwenPaw/pull/7194) (cancellation-safe workspace startup), [#7209](https://github.com/agentscope-ai/QwenPaw/pull/7209) (repair e2e cases against redesigned console).

## 6. Feature Requests & Roadmap Signals

Several notable features are being requested or in development, indicating roadmap direction:

- **Per-session model overrides** ([PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992), *open, under review*) — Let a single agent use different LLMs per conversation. High-demand capability for power users.
- **Transactional patching & managed PTY sessions** ([PR #7113](https://github.com/agentscope-ai/QwenPaw/pull/7113)) — Strengthens tooling layer for file edits and shell command management.
- **Session-scoped multi-project directories** ([PR #6976](https://github.com/agentscope-ai/QwenPaw/pull/6976)) — Bind a chat to multiple directories; enables more complex multi-repo development flows.
- **Token usage by agent** ([PR #7207](https://github.com/agentscope-ai/QwenPaw/pull/7207)) — Attribution of token consumption to specific agents for cost management.
- **Global-hotkey quick-input window** ([PR #6607](https://github.com/agentscope-ai/QwenPaw/pull/6607)) — Doubao-style floating desktop input (implements #6568). Long-running PR (since July 31) — may need maintainer attention.
- **Creator 1.1.0 provider expansion** ([PR #7167](https://github.com/agentscope-ai/QwenPaw/pull/7167)) — Broad mix of image/video providers, Anthropic/Gemini protocols — signals integration expansion.
- **Self-hosted multi-user Hub** ([PR #7112](https://github.com/agentscope-ai/QwenPaw/pull/7112), merged) — Implies enterprise/multi-tenant ambition.
- **UI refinements** (multiple issues): Collapsible thinking/reasoning display (#7196), tool-call visibility toggle (#7203), per-provider media caps (#7201), smarter approval policies (#7198).

**Likely next-version items**: v2.1.1b2 will likely roll up the bug fixes (#7206 regression, #7187 title thinking). The per-session overrides (#5992) and multi-project directories (#6976) are candidates for 2.2.

## 7. User Feedback Summary

**Positive signals**: First-time contributors are arriving with meaningful fixes (PR #7211, #6808). The project has active community support around testing and CI quality.

**Recurring concerns**:
- **UI/UX visual noise**: Multiple users (rerbin across #7203, #7196, #7198) complain about excessive visual interference — always-visible reasoning traces and tool calls — requesting configurable toggles. Similar request pattern as "hermes"-style collapsible panels.
- **Session sorting pain**: Historical sessions are not sorted by "last used" — user called it "anti-human" design (#4816, closed). Likely UX debt.
- **Approval flow friction**: Current approval modes trigger excessive prompts for intermediate/temp-file operations, making overnight automation impractical (#7198). This is a workflow-blocking issue for autonomous use cases.
- **MCP ecosystem frustration**: Connection instability after server restarts (#6524) and hidden custom channel tools in authorization rules (#7197) create integration friction.
- **Windows desktop disappointments**: WebView2 crash (#6427), startup hang (#6430), and request for multi-file drag/drop and no-size-limit uploads (#4855/4854, closed).

A clear pattern: **power users are pushing CoPaw towards a "fire-and-forget" autonomous agent**, and the current approval flows and visual noise are the main obstacles.

## 8. Backlog Watch

Items that have been open for a while without maintainer action, requiring attention:

- **[#6430 — startup hang ~85s (since Jul 24)](https://github.com/agentscope-ai/QwenPaw/issues/6430)** and **[#6427 — WebView2 crash (since Jul 24)](https://github.com/agentscope-ai/QwenPaw/issues/6427)** — Two stale Windows desktop bugs with no recent maintainer response; one is a regression from a version bump. These should be prioritized.
- **[#6399 — reranker UI config panel (PR, since Jul 23)](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — Marked "Under Review" for nearly a month; complements a backend reranker feature.
- **[#5992 — per-session model overrides (PR, since Jul 12)](https://github.com/agentscope-ai/QwenPaw/pull/5992)** — Quiet for over a month; this is a high-value feature that would benefit from maintainer review or explicit deferral.
- **[#6607 — global-hotkey quick-input (PR, since Jul 31)](https://github.com/agentscope-ai/QwenPaw/pull/6607)** — Feature-building for over 3 weeks without review; may need a maintainer to check architecture fit.
- **[#6524 — MCP reconnect issue (since Jul 28)](https://github.com/agentscope-ai/QwenPaw/issues/6524)** — Top-commented open issue without maintainer acknowledgment; important for enterprise adoption.

The project shows healthy throughput, but the **aging PRs and silent Windows desktop issues** are worth flagging for maintainer attention to avoid contributor attrition and user churn.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest
**Date:** 2026-08-22

---

## 1. Today's Overview

ZeroClaw is experiencing a period of sustained high activity with 50 issues and 50 PRs updated in the last 24 hours, indicating a robust and actively maintained open-source ecosystem. The project is currently processing a significant number of merge-ready contributions across domains including plugin architecture, security hardening, and user experience improvements. While security-related issues dominate the priority p0-p1 level, the project demonstrates healthy momentum with a substantial queue of PRs awaiting review and integration.

Community engagement is strong, with maintainers actively collaborating with ⁠distinguished contributors and community developers. Notable patterns include recurring themes around security-sandbox compliance, large-context-window support, and cross-platform consistency (particularly Windows), suggesting a mature project in a refinement phase. ZeroClaw continues integrating new features while simultaneously stabilizing security and runtime reliability.

---

## 2. Releases

**No new releases were published in the last 24 hours.**

---

## 3. Project Progress

Today's merged and closed items show progress on a range of issues, though the overall PR merge rate remains modest relative to the backlog:

### Merged/Closed PRs

- **#10203:** fix(log): bridge log-facade records into the tracing pipeline — resolved an issue where dependencies using the `log` crate, such as whatsapp-rust, had their records dropped entirely due to a missing logger bridge. Adds a bridge so `log`-facade records reach the tracing subscriber.
- **#10209:** fix(memory): run pgvector setup inside the postgres-memory-init thread — fixed a runtime issue where synchronous `postgres` client calls used `block_on` internally within a Tokio runtime, causing a potential deadlock when constructing `PostgresMemory` with `pgvector_enabled = true`.

Overall, the merge rate is steady, with leadership acting on critical fixes promptly, including a high-priority log pipeline fix that went from issue to merged PR within 24 hours.

---

## 4. Community Hot Topics

### Highest Engagement

- **#10165** (updated 2026-08-21, 3 comments) — [Bug]: independent delegate bypasses `block_high_risk_commands` on its own risk profile
  - [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)
  - **Severity:** S0 data loss/security risk
  - A high-risk command succeeds when run through an independent delegate, even when the delegate's own `risk_profile` has `block_high_risk_commands = true`
  - Active discussion indicates strong security concerns among community members
- **#10074** (closed, 3 comments) — SECURITY.md documents a CI job that was removed in April, so the container checks are convention now
  - [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10074)
  - **Status:** closed — documentation gap resolved; container checks now handled through updated CI conventions, no longer requiring the documented workflow
- **#10068** (updated 2026-08-18, 3 comments) — [Bug]: Interactive agent session caps context at 32,000 tokens, ignoring max_context_tokens = 131072
  - [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10068)
  - Users are actively seeking full utilization of large context windows; this limitation degrades behavior for complex tasks
- **#10066** (updated 2026-08-17, 3 comments) — [Bug]: SOP engine promotes and runs later steps before recording a step's output-schema rejection
  - [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)
  - Workflow-blocking severity, where later steps execute despite earlier schema validation failures; the issue remains unresolved
- **#10165** (updated 2026-08-21, 3 comments) — [Bug]: independent delegate bypasses `block_high_risk_commands` on its own risk profile
  - [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)
  - Continued scrutiny of security controls indicates confidence in the project's security focus

---

## 5. Bugs & Stability

### Critical (S0 / P0)

- **#10066** (S1) — SOP engine promotes and runs later steps before recording a step's output-schema rejection. Later steps actually execute before the rejection is logged, creating workflow failures. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)

### High (S1/P1)

- **#10121** — Partial Code/ACP turns disappear if the process exits before completion. Marked S0 data loss, but discussed as workflow-blocking semantics; a fix PR exists. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) | [PR #10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)
- **#10061** — Provider-rejected image poisons later turns in a vision-capable session, blocking subsequent attempts with S1 severity. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10061)
- **#10116** — Oversized tool results are cut byte-wise middle-out, causing loss of critical tool output; fix proposed to spill to a file handle instead like `web_fetch` does. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10116)

### Medium (S2/P2)

- **#10068** — Interactive agent session caps context at 32k tokens, ignoring configured `max_context_tokens = 131072` (S2 degraded behavior). [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10068)
- **#10175** — Google TTS API key header not marked sensitive, possibly leaking keys in debug-logs/request dumps. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10175)
- **#10199** — Plugin egress connect-deadline cannot cancel a blocking `getaddrinfo`, causing plugin hangs. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10199)

### Platform/Test Reliability

- **#10161** — `process_stats` rapid-resample test flakes under the Parallel Runtime Test gate due to timing assumptions. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10161)
- **#10230** — Daemon startup or reload can overflow during agent initialization when applying Quickstart configuration from ZeroCode (S1 blocked). [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)

### Fix PRs in Flight

- For #10121, PR #10197 (fix(acp): persist interrupted turn progress, size:XL) is open.
- For #10202, PR #10203 (fix(log): bridge log-facade records) has landed.
- For #10162, a fix is being discussed to make plugin install and config-entry seeding recoverable as one operation.

---

## 6. Feature Requests & Roadmap Signals

### Strong Signals (Likely Next Release)

- **Streaming by Default:** #10166 (default `stream_mode` to `partial`) — promotes incremental replies by default, improving perceived performance
- **Stall Watchdog Default On:** #10168 (enable `stall_timeout_secs` by default) — provides a safe non-zero default to abort stalled turns
- **WhatsApp Bot Display Name:** #10200 (optional `push_name` from config) — enhances product identity for WhatsApp bot users; PR #10201 already exists with the implementation
- **iMessage Voice Memo Transcription:** #10140 (transcribe inbound voice messages) — brings iMessage channel parity with Telegram, Slack, and Discord

### Emerging Interests

- **Git Channel in Docker Debian Image:** #10138 — user wants Git Channel compiled and available in the official `zeroclaw:debian` image
- **Selectable ZeroCode Logs:** #10086 — making logs copyable via mouse/keyboard
- **Word Deletion in ZeroCode:** #10059 — Option-Backspace support for macOS users
- **Plugin Install Recovery:** #10162 — transactional plugin installation with retry logic for config seeding

---

## 7. User Feedback Summary

### Pain Points

- **Security Controls:** Users repeatedly emphasize security expectations — two related issues about `block_high_risk_commands` (#10165 and #10164) suggest the current behavior is counter-intuitive and can lead to unexpected command execution or over-blocking
- **Context Limits:** Users expect configured model context windows (e.g., 131,072 tokens) to be honored; the 32k token hard cap (#10068) is widely seen as a limiting constraint
- **Cross-Platform Fragility:** Windows-specific test failures (#10208) and path normalization issues highlight the need for more platform-aware CI and tooling

### What Users Appreciate

- The rapid turnaround on specific issues (notice #10203 closing within 24 hours of the issue being filed)
- Regular labeling and categorization of issues (accepted, in-progress, no-stale) suggests maintainers are actively triaging and acknowledging community reports
- The PR for the ZeroRelay transport (#10142) shows major architectural improvements are underway, indicating active development on multiple fronts

---

## 8. Backlog Watch

### Issues Needing Maintainer Attention

- **#10062** — TodoWrite plan leaks across ZeroCode session switches (P2, in-progress, open since 2026-08-17). [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10062)
  - Tagged `in-progress`, but no linked PR specifically addressing it; monitored by Audacity88 and may benefit from a focused fix
- **#10058** — ZeroCode file explorer search mode ignores row and page navigation (P2, good first issue, open since 2026-08-17). [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10058)
  - Tagged `good first issue` and `in-progress` but still open; likely a candidate for contributor onboarding

### PRs Awaiting Review

- **#9637** — fix(ci): guard temporary React Router RSC exception — tagged `needs-author-action`, `do-not-merge`, and priority p1; potentially blocked on author updates. [PR Link](https://github.com/zeroclaw-labs/zeroclaw/pull/9637)
- **#9645** — feat(providers): ZeroRouter preset and device-flow login (size:XL) — tagged `needs-author-action`, long-running since 2026-08-01. [PR Link](https://github.com/zeroclaw-labs/zeroclaw/pull/9645)
- **#10146** — feat(plugins): activate logical channel instances (size:XL) — tagged `needs-author-action`. [PR Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10146)
- **#10201** — feat(whatsapp-web): set push name from channel config (size:S) — tagged `needs-author-action`. [PR Link](https://github.com/zeroclaw-labs/zeroclaw/pull/10201)

### Long-Running Items

- **PR #9638** (feat(acp): select standalone default agent) has been open since 2026-08-01 and is updated weekly by Audacity88 — may need a final review or merge decision. [PR Link](https://github.com/zeroclaw-labs/zeroclaw/pull/9638)
- **Issue #10143** (provider-call accounting lifecycle-complete, 2026-08-19) is tagged `in-progress` but has no linked PR, suggesting active WIP not yet surfaced. [Issue Link](https://github.com/zeroclaw-labs/zeroclaw/issues/10143)

---

*Digest generated from public GitHub data on 2026-08-22*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*