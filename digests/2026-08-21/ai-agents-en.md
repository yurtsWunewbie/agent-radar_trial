# OpenClaw Ecosystem Digest 2026-08-21

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-21 01:13 UTC

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

# OpenClaw Project Digest — 2026-08-21

## 1. Today's Overview

OpenClaw shows continued high maintenance activity with a stable open issue volume of approximately 469 active issues and 359 open PRs — neither indicator suggests a backlog crisis. The project appears to be in a late-beta stabilization phase for the v2026.8.1 release line, with several P0/P1 regressions from prior versions actively being addressed by maintainer-reviewed PRs. Community engagement remains elevated, with the top 50 active issues averaging 7+ comments each, indicating sustained user investment in the tool. Developer throughput is strong with numerous small-to-medium-sized test-fix and documentation PRs merged or closed in the last 24 hours, alongside more substantial gateway and UI reliability improvements.

## 2. Releases

No new releases were published in the last 24 hours. The most recent tracked version is the `v2026.8.1-beta.2` candidate, which is in active release validation via issue #125626.

## 3. Project Progress

Merged/closed PRs in the last 24 hours signal progress on several fronts:

- **Security**: PR #116489 (merged) introduces a security boundary for plugin/skill installation — `security.installPolicy` can now return `warn`, requiring explicit user acknowledgment before proceeding. PR #120900 (closed) pairs with this, adding a Control UI review surface for install-policy warnings.
- **Gateway reliability**: PR #126640 (open, ready for review) gives scheduler-owned agent runs a proper Gateway request context, addressing potential availability issues from improperly-scoped operations.
- **Session state**: PR #124393 (closed/merged) fixes a critical data-loss bug in `replaceTranscriptEventsSync` that could delete concurrently committed transcript rows.
- **UI/UX**: PR #123535 fixes session catalog refresh storms in the Control UI, while PR #125820 improves sidebar row action placement.
- **Developer experience**: PR #123975 fixes a hang in the `tsgo` typecheck script, unblocking local and CI lanes. PR #119309 fixes the dev runtime to rebuild when core packages change.

## 4. Community Hot Topics

The most active discussions in the current backlog highlight a few core concerns:

- **Cost governance is the #1 conversation**: Issue #42475 "Per-agent cost budget enforcement at the gateway level" remains the most discussed issue with 23 comments. Users want daily/monthly caps enforced before model dispatch, not after the fact. High demand likely means a cost-control feature is on the roadmap.

- **Release validation is highly visible**: Issue #125626, the v2026.8.1-beta.2 validation worksheet, has 17 comments as users walk through real-world upgrade scenarios. This shows the community is engaged and invested in testing the next release.

- **P0 startup regression strains trust**: Issue #108435 (14 comments, 3 👍) — the gateway failing to start on a recent update — has a `regression` label and is a major tension point. The community is watching this closely for a fix in the next patch.

- **Docs ahead of release**: Issue #48920 (10 comments, 4 👍) notes the "Live Docs are ahead of release" — a common source of friction for users trying to use new config features that aren't in their installed version.

- **DeepSeek V4 Flash incompleteness**: Issue #88657 (11 comments) about a specific model regression (incomplete turns) is a concrete provider-integration pain point.

Underlying needs: These hot topics indicate users need robust cost controls, stable versioning cadence, quick regression fixes, and clear documentation-version alignment.

## 5. Bugs & Stability

Ranked by severity, with fix PRs linked where available:

**P0 / Critical**
- **Gateway startup failure after update** (Issue #108435) — Update to 2026.7.1 breaks gateway startup via systemd, ollama, and manual launch. Currently 14 comments, no linked fix PR in the top 50. Highest-priority regression.
- **File tools strip leading `@` from paths** (Issue #119270) — silent data corruption (write/delete wrong file). 6 comments. No fix PR linked.
- **Codex restricted tool policy drops `AGENTS.md`** (Issue #125431) — silent loss of workspace context. Fix PR #126891 is open and has sufficient proof.
- **SQLite snapshot restore lacks end-to-end guarantees** (Issue #113306) — data integrity/consistency issue.

**P1 / High**
- **DeepSeek V4 Flash incomplete turn regression** (Issue #88657) — message loss.
- **Zombie process leak** (Issue #97616) — runtime degradation over time. 8 comments.
- **Google Antigravity ban due to tool schema reloading** (Issue #44134) — banned provider account, which is a critical integration risk.
- **HTTP completions 10-15s TTFB** (Issue #68920) — unusable for real-time voice; needs lightContext/voice mode.
- **Gateway holds stale module paths after rollback** (Issue #92241) — inbound messages silently dropped.
- **anthropic:claude-cli OAuth refresh still dead-ends** (Issue #83598) — even after a prior fix; significant auth reliability concern.
- **Telegram durable outbound stuck in `send_attempt_started`** (Issue #126246) — message loss on restart.

**P2 / Medium**
- **Memory management chaos** (Issue #43747) — inconsistent memory storage behaviors across users.
- **Usage-cost refresh lock never releasable in containers** (Issue #114234) — permanent cache freeze.
- **Active-memory blocks replies / QMD overload** (Issue #72015) — multi-agent gateway reliability.
- **Image attachments fail for named agents** (Issue #123273).
- **iOS app duplicates assistant replies** (Issue #124751).

## 6. Feature Requests & Roadmap Signals

Several feature requests show signs of gathering momentum:

- **Cost budget enforcement** (Issue #42475) — 23 comments, highest activity. The strong signal here suggests a future gateway-level cost-control feature is likely in the next major/minor release.
- **Configurable upload size limit** (Issue #71142) — 8 comments; a clear UX blocker for the Control UI.
- **Visible agent-to-agent messaging for ACP** (Issue #50798) — 5 comments; a specific interoperability gap.
- **Configurable session startup message** (`session.resetPrompt`, Issue #45501) — 6 comments.
- **Reasoning stream** (Issue #42276) — 6 comments; users want a more interactive thinking indicator.
- **JSON schema generation on bootstrap** (Issue #55235) — 5 comments; low-hanging dev-experience win.
- **Provider fallback by failure class** (Issue #47910) — 8 comments; intelligent failover is a sophisticated ask.

The highest-probability roadmap candidates for the next version are: **cost budgeting** (#42475) and a **HTTP endpoint performance overhaul** (#68920), given their user pain and explicit problem framing.

## 7. User Feedback Summary

Common pain points from the last 24h reflect a mix of infrastructure and daily-use frustrations:

- **Deployment & startup issues**: The gateway failure (#108435) and Docker restart loops (#86612) point to fragility in the container/daemon lifecycle.
- **Model provider integration is fragile**: Multiple issues showing provider-specific failures (DeepSeek, Google Vertex, Anthropic CLI OAuth) indicate a need for more robust provider abstraction and testing.
- **Data integrity anxieties are real and vocal**: User comments and upvotes on issues about memory loss (#43747), file mishandling (#119270), and transcript deletions (#124393) show users are actively monitoring and worried about data — and are relieved when fixes land (evidenced by the merged PR for #124393).
- **UX friction in the app surface**: iOS double-rendering (#124751) and Android dictation fallback (#125323) are mobile-first complaints; Control UI approval can swing the roadmap.
- **Regressions undermine confidence**: Multiple `regression`-tagged issues across releases (from 2026.3.x to 2026.7.x) contribute to a perception of instability in the update path.

Overall, satisfaction is mixed. Users are deeply engaged and appreciate the tool, but the frequency and severity of regressions in the last few months are a significant source of dissatisfaction.

## 8. Backlog Watch

Issues requiring maintainer attention due to age, severity, or lack of movement:

- **P0 Gateway startup failure** (#108435) — Open since July 15, 2026, with 3 upvotes and low activity. Needs a fix PR or a maintainer explanation.
- **P0 File tool `@` stripping** (#119270) — Open since early August, 6 comments, no fix PR yet. **Hidden memory loss risk** for users.
- **P1 DeepSeek V4 Flash incomplete turn** (#88657) — Open since late May, 11 comments, no linked fix PR. This has been unresolved for nearly 3 months.
- **P1 Google Antigravity ban** (#44134) — Open since March, 8 comments, no linked fix. A reputational risk for the project.
- **P1 Memory management chaos** (#43747) — Open since March, 11 comments. The problem is serious but the fix is unclear; needs a maintainer proposal.
- **P1 HTTP TTFB performance** (#68920) — Open since April, 6 comments. High-value performance fix with no PR in sight.
- **P2 Configurable upload limit** (#71142) — Open since April, 8 comments. Sounds like a 1-line config change.
- **P3 Reasoning stream** (#42276) — Open since March, 6 comments. User demand is clear; standard feature in competitors.

**Maintainer response summary**: The project is responsive on recent regressions (e.g., agile fix PRs for Codex AGENTS.md, Telegram outbound, and session state) but has a persistent backlog of medium-severity issues that lack clear ownership. Focus on P0/P1 issues and community-requested features will likely define the project's next stability release.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant Open-Source Ecosystem
**Date:** 2026-08-21

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape is in a phase of intense maturation, with projects converging on reliability, security, and cost governance as the primary battlegrounds. While feature velocity remains high, the dominant theme across repositories is **stability hardening** — fixing regressions, addressing data-integrity bugs, and patching security vulnerabilities (CWE-306 in Moltis, credential overwrites in NanoBot). A clear architectural shift is emerging: monolithic agent runtimes are evolving into **plugin/WASM-based ecosystems** (ZeroClaw's "everything is a plugin," OpenClaw's install-policy security boundary), and channel integrations (Slack, WhatsApp, Telegram) are being treated as first-class citizens requiring robust file-delivery abstraction and engagement-routing correctness. Cross-cutting user demands for **cost budget enforcement, native provider breadth (Anthropic, Vertex AI, SenseNova), and Windows desktop reliability** signal that the ecosystem is transitioning from demo-grade tools to production-grade infrastructure.

---

## 2. Activity Comparison

| Project | Open Issues | Open PRs | PRs Merged/Closed (24h) | Release Status | Health Score* |
|---|---|---|---|---|---|
| **OpenClaw** | ~469 | ~359 | ~15 | v2026.8.1-beta.2 in validation | B+ |
| **NanoBot** | 5 (updated) | 17 | 12 | No release | A- |
| **Hermes Agent** | 50 (updated) | 50 (updated) | 2 | No release | B |
| **PicoClaw** | 3 | 8 | 3 (5 deps) | v0.3.1 (stale) | C+ |
| **NanoClaw** | 2 (active) | ~20 | 15 | No release | A |
| **IronClaw** | 17 (active) | 19 | 14 | Tracking v1.4.0 | A- |
| **LobsterAI** | 2 | 1 | 6 | No release | B |
| **Moltis** | ~5 | 5 | 4 | **20260820.01 (security patch)** | A- |
| **CoPaw (QwenPaw)** | 28 | 50 | 28 | **v2.1.1-beta.1** | B+ |
| **ZeroClaw** | 50 | 48 | ~5 | No release | B- |

*Health Score: Composite of responsiveness, backlog management, regression rate, and community engagement (A = excellent, C = needs attention)

**Notable observations:**
- **NanoClaw** shows the best responsiveness-to-issue ratio with a focused maintenance wave.
- **Moltis** demonstrates best-in-class security posture with a 24-hour critical-vuln fix-to-release cycle.
- **ZeroClaw** and **OpenClaw** have the largest backlogs, indicating scale but also potential review bottlenecks.
- **PicoClaw** shows healthy maintenance but a stale release cadence and unaddressed UX bug.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Largest community and ecosystem gravity** (~469 issues, 359 PRs, 23 comments on top cost-governance issue) — nearly 10x the issue volume of NanoClaw or IronClaw, indicating the broadest adoption and install base.
- **Active security hardening** with the new `security.installPolicy` boundary (PR #116489) — a governance feature few peers offer at the plugin/skill installation layer.
- **Broad channel and provider coverage** with an active release-validation process engaging the community (17 comments on the beta validation worksheet).

**Technical approach differences:**
- OpenClaw's architecture centers on a **gateway-based orchestration layer** with cost-budget and reliability concerns at the platform level (scheduler-owned runs, gateway request context), whereas NanoBot and Moltis focus on **channel adapter correctness** and NanoClaw on **skill/tooling ecosystems**.
- OpenClaw emphasizes **session-state integrity** (fixing `replaceTranscriptEventsSync` data loss) as a core trust anchor — a concern PicoClaw and CoPaw are only beginning to address.

**Community size comparison:**
- OpenClaw's community is an order of magnitude larger and more vocal, but this cuts both ways: the project carries the highest regression burden (P0 gateway startup failure, file `@` stripping, SQLite snapshot issues) and the most visible user dissatisfaction with update-path stability.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects | Specific Needs |
|---|---|---|
| **Cost governance & budgets** | OpenClaw (#42475), Hermes (delegation loop cap #91122), CoPaw (automatic model routing #6436) | Per-agent daily/monthly caps, provider fallback by failure class, runaway-delegation circuit breakers |
| **Provider breadth & robustness** | NanoBot (Vertex AI #5459, SenseNova #5453), OpenClaw (DeepSeek V4 Flash #88657), Hermes (zai catalog #91149, GCP 404 #32678), PicoClaw (Anthropic native protocol #1158), ZeroClaw (Hailo-Ollama #9109) | Native cloud auth (GCP service accounts), provider-abstraction testing, mid-stream retry logic |
| **Data integrity & session state** | OpenClaw (#124393 transcript loss, #119270 file `@` stripping), Hermes (`state.db` corruption #89293, WAL contention #85079), NanoBot (memory consolidation #5379), CoPaw (corrupt `envs.json` #7118) | Crash-safe persistence, concurrent-write protection, clear error surfacing, snapshot restore guarantees |
| **Channel reliability & file delivery** | NanoClaw (WhatsApp mounts #2715, `mention-sticky` #3369), Moltis (WhatsApp reply/name fixes), OpenClaw (Telegram outbound #126246), CoPaw (QQ session isolation #7169) | Cross-container file inbox abstraction, engagement-route correctness on threaded platforms, durable outbound queues |
| **Windows desktop reliability** | Hermes (updater deletes app #83846), OpenClaw (systemd startup #108435), CoPaw (packaging #1555), ZeroClaw (entry-point #10111) | Transactional install/update plans, predictable rollback, fail-closed error reporting |
| **Plugin/skill security model** | OpenClaw (`installPolicy` warn), ZeroClaw (WASM egress policy, grant ceremony), Moltis (untrusted-turn ceiling) | Per-execution confirmation for high-risk actions, credential-preserving OAuth stores, sandbox policy enforcement |

---

## 5. Differentiation Analysis

| Project | Feature Focus | Target Users | Technical Architecture |
|---|---|---|---|
| **OpenClaw** | Commercial-grade gateway orchestration, cost controls, federated agents | Enterprises & power users needing governance | Monolithic core with plugin/skill boundary, gateway-centric session model |
| **NanoBot** | Community-driven channel breadth (Matrix, Slack, Telegram), TUI/WebUI session continuity | Hobbyists & self-hosters on diverse channels | Lightweight Python agent with rich channel adapters and background task management |
| **Hermes Agent** | Desktop-first experience, kanban/agent lifecycle management, delegation frameworks | Individual professionals & small teams on desktop | Electron-based desktop app with `state.db`-backed session store, multi-process dashboard |
| **PicoClaw** | Protocol abstraction (Anthropic native), multi-agent orchestration (Blackboard model) | Developers building custom agent workflows | Modular agent core with pluggable model protocols and shared-context pools |
| **NanoClaw** | One-click setup skills (`/add-slack`, `/add-cursor`), skill audit ecosystem | Channel-centric tinkerers & community builders | Skill/plugin-centric architecture with engagement router (`evaluateEngage`) |
| **IronClaw** | Design-system-driven UX, agent lifecycle hooks (after-turn, compaction), CI resilience | Teams needing disciplined UX + predictable release engineering | Epic/phase-driven monorepo with Storybook design system, Rust toolchain |
| **LobsterAI** | Chinese-market UX, in-chat file preview, settings discoverability | Chinese-language users & multilingual teams | Electron/desktop app with bilingual (zh/en) interface, scheduled tasks & IM bot integration |
| **Moltis** | Security-first channel ops, WhatsApp specialization, untrusted-turn policy | Ops teams running secure channel bots | Minimalist core with per-channel security ceilings |
| **CoPaw (QwenPaw)** | Media/video handling, always-on skills, multi-agent hub | Creators & media-heavy workflows | Desktop app with video dispatch, skill "always-on" mode, channel session isolation |
| **ZeroClaw** | WASM plugin architecture, sandboxing, configurable security policies | Advanced developers & enterprise architects | Runtime-owned session model, WASM-hosted plugins, granular shell-policy engine |

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapidly Iterating (Weekly releases, high feature throughput):**
- **NanoClaw** — 15 PRs merged today, actively burning down a skill-audit backlog; one-click setup pattern signals product maturity push.
- **IronClaw** — 14 merges/day, disciplined epic/phase structure, same-day CI fixes; clearly shipping on a cadence.
- **CoPaw (QwenPaw)** — 28 PRs merged, beta release cut; fast but risk of regression accumulation.

**Tier 2 — Stabilizing (Feature-complete, focused on hardening):**
- **OpenClaw** — Late-beta stabilization for v2026.8.1, active regression fixing; community scale makes this the most watched project for update-path confidence.
- **Moltis** — Security-patch release cadence, minimal churn; mature and focused on ops excellence.
- **NanoBot** — Healthy mix of provider expansion and stability fixes; moderate velocity with strong contributor diversity.

**Tier 3 — Maintenance Mode / Slow Burn:**
- **PicoClaw** — Steady dependency updates but UX bugs (web UI lag) unaddressed for 31 days; feature PRs closed without merge.
- **LobsterAI** — Responding to issues but low open-issue count suggests a narrow feature-set; stale docs and small PRs awaiting review.
- **Hermes Agent** — High activity but few merges (2/50 PRs); the gap between PR volume and merge rate suggests either a heavy review pipeline or a change in maintainer capacity.
- **ZeroClaw** — Intense architectural debate (RFCs) but blocked PRs (`needs-author-action` on critical security fixes) stall forward progress; risk of community fatigue.

**No activity:** NullClaw, TinyClaw, ZeptoClaw (dormant or in hiatus).

---

## 7. Trend Signals

**For AI agent developers, the following trends are unambiguous:**

1. **Cost governance is the next killer feature.** OpenClaw's #42475 (23 comments) and Hermes' delegation-loop cap both signal that **runaway API spend** is a top user anxiety. Developers should build cost-budgeting into agent frameworks from day one — per-agent caps, pre-dispatch enforcement, and provider fallback by failure class.

2. **Data integrity is table stakes.** Repeated `state.db` corruption (Hermes), silent file-path corruption (OpenClaw), and transcript loss (OpenClaw, NanoBot) show that **users are actively auditing agent memory and session state**. Agents that can't guarantee crash-safe persistence will lose trust — and market share.

3. **Platform-native auth is a requirement, not a nice-to-have.** Problems with Google Vertex AI (NanoBot, Hermes), OpenAI OAuth in Docker (NanoBot), and Anthropic CLI OAuth (OpenClaw) indicate that **enterprise users expect drop-in GCP/Azure/AWS credential support**. Generic OpenAI-compatible gateways are insufficient.

4. **Threaded-channel engagement is still broken.** `mention-sticky` leaks (NanoClaw), reply-to-bot addressing (Moltis), and Telegram outbound hangs (OpenClaw) reveal that **multi-turn conversation routing on Slack/WhatsApp/Telegram remains a correctness minefield** — a core differentiator for any assistant claiming production readiness.

5. **Windows desktop reliability is underserved.** Hermes' updater-deletes-app saga and OpenClaw's systemd startup regression both hit non-Linux/CI users. The **transactional update pattern** (single deploy plan, fail-closed, rollback-able) is a clear gap in the ecosystem.

6. **Security hardening is accelerating.** CWE-306 vault bypass (Moltis), credential-overwrite OAuth stores (NanoBot), and plugin install-policy boundaries (OpenClaw, ZeroClaw) show that **security is moving from "roadmap" to "immediate"**. Agents that will handle real user data need security reviews built into the contribution pipeline.

7. **The "one-click setup" pattern is winning.** NanoClaw's `/add-slack` and `/add-cursor` skills, alongside Moltis' push-name fixes, indicate that **frictionless channel onboarding** is a primary adoption driver. Expect this pattern to spread across the ecosystem.

---

**Bottom line for decision-makers:** The ecosystem is consolidating around **reliability, cost control, and security** as the differentiators that separate production-grade agents from demos. OpenClaw leads in community scale and governance features but carries the highest regression risk; NanoClaw and IronClaw offer the best maintenance hygiene. Choose based on whether you prioritize ecosystem depth (OpenClaw), developer velocity (IronClaw), or channel-specific polish (Moltis, NanoClaw).

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest
**Date:** 2026-08-21  
**Repository:** [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

---

## 1. Today's Overview

NanoBot shows **moderate-to-high activity** with 29 pull requests and 5 issues updated in the last 24 hours. The project is in a **healthy, feature-forward state**: no release was cut today, but the PR pipeline is substantial — 12 PRs were merged/closed while 17 remain open, indicating steady review throughput. The most active contributors are addressing **provider robustness** (fallback logic, error retries, new providers) and **channel reliability** (Matrix, Slack, Telegram, WebUI). Notably, a **cluster of fixes around background task management and exception boundaries** suggests the maintainers are focused on production stability. The community is also pushing for **new provider integrations** (Google Vertex AI, SenseNova) and **paid MCP service integrations**, reflecting commercialization interest in the ecosystem.

---

## 2. Releases

**No new releases** were published in the last 24 hours. The most recent release information is not available in this data window; users should check the [releases page](https://github.com/HKUDS/nanobot/releases) for the latest tagged versions.

---

## 3. Project Progress

**Merged/Closed PRs (12 total)** — the following are noteworthy:

- **[#1203 — fix(cli): workaround 'Event loop is closed' on linux (issue #550)](https://github.com/HKUDS/nanobot/pull/1203)** — **Merged.** This long-dormant PR (created 2026-02-25) finally lands a workaround for the `RuntimeError: Event loop is closed` on Linux (Python 3.11). This is a **significant stability win** for CLI users.

- **[#5452 — feat(tui): print resume command on exit](https://github.com/HKUDS/nanobot/pull/5452)** — **Merged.** The TUI now prints a ready-to-run `nanobot agent --session websocket:<id>` command on exit, improving session continuity UX; includes renderer and terminal smoke tests.

- **[#5240 — refactor(webui): unify floating controls](https://github.com/HKUDS/nanobot/pull/5240)** — **Merged.** Centralizes floating-surface styling and item styling for menus, popovers, and comboboxes; standardize selected/destructive states.

- **[#5447 — Paid security-scan MCP integration (nanobot + ScanPay x402)](https://github.com/HKUDS/nanobot/issues/5447)** — **Closed** (likely as not-planned or via discussion; see Hot Topics).

No new provider or major feature was merged today; most merged PRs are fixes/refactors. However, **PRs merged in this window indicate the team is cleaning up long-standing technical debt** (e.g., #1203) while consolidating WebUI component architecture.

---

## 4. Community Hot Topics

The most active items by comment count/reactions:

- **[#5447 — Paid security-scan MCP integration (nanobot + ScanPay x402)](https://github.com/HKUDS/nanobot/issues/5447)** — **Closed.** This request proposed integrating a Solana x402 micropayment security scanner (0.0007 SOL/scan) plus an agent job manager ("AgentBridge"). Its closure without a merged PR suggests the maintainers either politely declined or redirected to a discussion; this is a **commercialization signal** worth watching.

- **[#5444 — [bug] Failed to ogin OpenAI via OAuth in Docker](https://github.com/HKUDS/nanobot/issues/5444)** — **Open, 1 comment.** Docker users cannot complete OpenAI OAuth login; the redirect URL callback (`http://localhost:1455/auth/callback`) likely fails due to container network isolation. **Underlying need:** Docker-first onboarding must be seamless for OAuth flows.

- **[#5459 — Feature request: Add native Google Vertex AI provider for Claude models](https://github.com/HKUDS/nanobot/issues/5459)** — **Open, 0 comments.** Users want a first-class Vertex AI provider instead of only generic OpenAI-compat gateways. **Demand signal:** enterprise users need cloud-native auth (GCP service accounts) for Claude models.

- **[#5454 — [bug] Streaming providers: mid-stream server_error skips retry once content has streamed](https://github.com/HKUDS/nanobot/issues/5454)** — **Open, 0 comments.** Paired directly with PR #5455 (see Bugs section). The retry logic only catches errors before the first delta; mid-stream failures are fatal.

**Analysis:** The community is split between **enterprise/cloud integration needs** (Vertex AI, OAuth in Docker) and **monetization experiments** (ScanPay). The maintainers appear receptive to provider breadth but cautious about MCP marketplaces.

---

## 5. Bugs & Stability

Ranked by severity:

1. **[#5454 — Mid-stream server_error skips retry (HIGH)](https://github.com/HKUDS/nanobot/issues/5454)** — For streaming providers (e.g., Codex), if a `server_error` occurs after content has streamed, no retry is attempted. **Fix PR:** [#5455](https://github.com/HKUDS/nanobot/pull/5455) adds `"server_error"` to transient markers, but **only covers the pre-stream case**; the issue remains open for the mid-stream scenario.

2. **[#5444 — OpenAI OAuth login fails in Docker (MEDIUM-HIGH)](https://github.com/HKUDS/nanobot/issues/5444)** — Non-trivial login breakage for container users; likely needs port-binding documentation or a configurable host. **No fix PR yet.**

3. **[#5425 — Legacy socks:// proxy URLs unsupported (MEDIUM, CLOSED)](https://github.com/HKUDS/nanobot/issues/5425)** — Custom OpenAI-compatible providers fail when config/env uses `socks://`. **Closed** — presumably resolved or triaged; worth verifying if a fix shipped.

4. **[#5457 — Channel dispatcher exception boundary (MEDIUM, fix in review)](https://github.com/HKUDS/nanobot/pull/5457)** — An outbound message error could kill the background dispatcher task, freezing all further sends. PR scopes the exception boundary to message processing; **not yet merged**.

5. **[#5431 / #5430 — Background task failure reporting & task-group cleanup (LOW-MEDIUM)](https://github.com/HKUDS/nanobot/pull/5431)** — Together, these fix silent background-task exceptions and memory leaks in `AgentLoop`. **Open.**

6. **[#5338 — MCP OAuth credentials overwritten on read failure (LOW-MEDIUM)](https://github.com/HKUDS/nanobot/pull/5338)** — A read failure in the OAuth store was treated as empty, risking credential overwrite for other servers. **Open, flagged with [conflict]**.

7. **[#5379 — Memory consolidation drops raw fallback characters (MEDIUM)](https://github.com/HKUDS/nanobot/pull/5379)** — Preserves full consolidation input across `history.jsonl`; **flagged [conflict]**, needs rebase.

**Overall stability picture:** Good — no critical crash reports today. The team is actively hardening error paths (fallback policy for raised exceptions in #5413, SSRF-safe Slack downloads in #5414, and log flushing in #5412).

---

## 6. Feature Requests & Roadmap Signals

| Request | Evidence | Likelihood for Next Release |
|---|---|---|
| **Native Google Vertex AI provider** | [Issue #5459](https://github.com/HKUDS/nanobot/issues/5459) | **Moderate** — enterprise demand, but requires GCP auth complexity; may wait for contributor. |
| **SenseNova (商汤日日新) provider** | [PR #5453](https://github.com/HKUDS/nanobot/pull/5453) | **High** — PR is complete with models list & tests; likely merges once CI passes. |
| **Turn-level observability in WebUI** | [PR #5420](https://github.com/HKUDS/nanobot/pull/5420) | **High** — rich feature (per-turn surfaces, usage accumulation, recovery UI) already in review; could land in next minor release. |
| **Reusable Telegram stickers** | [PR #5387](https://github.com/HKUDS/nanobot/pull/5387) | **Moderate-High** — community-driven channel improvement; mature PR. |
| **MCP SDK v2 migration** | [#5179](https://github.com/HKUDS/nanobot/pull/5179), [#5180](https://github.com/HKUDS/nanobot/pull/5180) | **Moderate** — two competing approaches; [conflict] tags; likely next major/minor version due to API surface change. |
| **Paid x402 MCP integrations** | [Issue #5447](https://github.com/HKUDS/nanobot/issues/5447) | **Low** — closed; no official roadmap signal. |

**Prediction:** The next release will likely include **SenseNova**, **TUI resume command**, **WebUI floating control refactor**, and the **event-loop fix**. Vertex AI will need a contributor to champion it.

---

## 7. User Feedback Summary

**Positive signals:**
- **Session continuity improving:** TUI resume command (#5452) and WebUI turn recovery (#5420) directly address reported UX pain ("I lost my session", "can't resume work").
- **Quick triage on proxy issue:** #5425 closed within 48h indicates responsive maintainers on config-related bugs.

**Pain points:**
- **Docker OAuth friction (top complaint):** #5444 shows that even standard flows (OpenAI login) break in containers; users expect "it just works" with `docker run`.
- **Mid-stream failures lose work:** #5454 highlights that partial responses are not automatically recovered — users must manually restart, losing context.
- **Custom providers still have rough edges:** socks:// proxies (#5425) and fallback-on-exception gaps (#5413) show that "OpenAI-compatible" isn't always drop-in.

**Satisfaction:** Generally positive; the volume of contributor PRs from 10+ distinct authors (Bennett-Yang, pxy0592, xuayan-nokia, akinolur, Misterio070, Re-bin, dajiaohuang, Shizoqua, mameikagou, KDB-Wind, yu-xin-c, chengyongru, bingqilinweimaotai, morandot) suggests a healthy, engaged community.

---

## 8. Backlog Watch

Items needing maintainer attention (long-lived or conflicting):

- **[#5180 — chore(mcp): evaluate minimal SDK v2 migration](https://github.com/HKUDS/nanobot/pull/5180)** — Open since 2026-07-30; [conflict]. The evaluation draft is ready for review; decision needed on #5179 vs #5180.

- **[#5179 — Migrate MCP integration to SDK v2 with legacy compatibility](https://github.com/HKUDS/nanobot/pull/5179)** — Open since 2026-07-30; [conflict], priority p1. The larger migration; needs maintainer decision to avoid diverging forks.

- **[#5338 — fix(mcp): preserve credentials when OAuth store read fails](https://github.com/HKUDS/nanobot/pull/5338)** — Open since 2026-08-11; [conflict]. Security-relevant (credential overwrite); should be prioritized despite conflicts.

- **[#5379 — fix(memory): preserve full consolidation input](https://github.com/HKUDS/nanobot/pull/5379)** — Open since 2026-08-13; [conflict]. Data-integrity fix for memory consolidation; needs rebase.

- **[#1203 — Event loop fix](https://github.com/HKUDS/nanobot/pull/1203)** — **RESOLVED today**; good sign that old PRs can be revived and merged.

**Recommendation:** The maintainers should schedule a "conflict-clearing day" to resolve the [conflict] tags on #5338, #5379, #5179/#5180 and issue a decision on the MCP v2 migration path. These are the longest-pending items and represent the highest technical debt.

---

*Data coverage: Last 24 hours from 2026-08-21; 5 issues, 29 PRs, 0 releases.*

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

Based on the GitHub data provided for Hermes Agent (github.com/nousresearch/hermes-agent) for 2026-08-21, here is the project digest.

---

# Hermes Agent Project Digest — 2026-08-21

## 1. Today's Overview

The project is experiencing a period of high activity driven primarily by bug fixing and stability hardening. While no new releases were cut today, the 50 updated issues and 50 updated pull requests indicate a healthy, sustained development pace. The most significant concentration of effort is clearly on the **Windows desktop installer/updater**, which accounts for nearly a third of all top issues and over ten dedicated PRs. Simultaneously, the team is actively addressing **critical session-state persistence and corruption issues** (P0/P1) and introducing fixes for a broad range of agent, gateway, and kanban bugs, reflecting a project in a focused "stability and reliability" phase.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Despite the lack of merged PRs today (only 2 of 50 active PRs were closed/merged), a substantial number of open PRs are actively moving toward completion. These represent significant progress across several domains, with multiple "fix-ready" PRs addressing the highest-profile issues:

- **Windows Installer/Updater Overhaul:** Multiple PRs target the cluster of critical windows updater bugs. These include [#91196](https://github.com/NousResearch/hermes-agent/pull/91196) (fail clearly before PowerShell ConstrainedLanguage mutates anything) and [#90128](https://github.com/NousResearch/hermes-agent/pull/90128) (refuse ConstrainedLanguage with a reason). PR [#85997](https://github.com/NousResearch/hermes-agent/pull/85997) addresses the Node version gate failure during the update/rebuild process, which is a contributing factor to several of the P1 updater bugs. Additionally, PR [#91207](https://github.com/NousResearch/hermes-agent/pull/91207) preserves macOS Electron Framework JIT entitlements, fixing startup crashes after self-signing on macOS.

- **Session State and Persistence Fixes:** PR [#91197](https://github.com/NousResearch/hermes-agent/pull/91197) ensures resumed session cwd precedence is consistent. PR [#91210](https://github.com/NousResearch/hermes-agent/pull/91210) fixes a POSIX logging rollover race condition, which is a significant step towards resolving the multiprocess logging bug in issue [#27649](https://github.com/NousResearch/hermes-agent/issues/27649).

- **Agent & Gateway Robustness:** PR [#91209](https://github.com/NousResearch/hermes-agent/pull/91209) fixes a bug where null errors in structured tool results could be misinterpreted. PR [#91122](https://github.com/NousResearch/hermes-agent/pull/91122) adds a critical cap to runaway delegation loops to prevent burning user API allowances (e.g., Codex) and makes stop/supersede fail closed.

- **Kanban & Cron Fixes:** A series of PRs are addressing worker and task-state management. This includes [#91162](https://github.com/NousResearch/hermes-agent/pull/91162) (defer manual reclaim until worker termination is proven), [#91206](https://github.com/NousResearch/hermes-agent/pull/91206) (requeue workers after transient provider failures), and [#91205](https://github.com/NousResearch/hermes-agent/pull/91205) (preserve worktree repository bindings).

## 4. Community Hot Topics

The most active issues, measured by comments, highlight critical pain points and are driving the current development focus:

- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616) - Skills Index Stale/Degraded (66 comments):** This is the most active issue by far. The automated freshness probe keeps failing because the skills index is older than the 26-hour limit. The prolonged nature of this problem (created a month ago) and its high comment count suggest it's a deeply frustrating, ongoing reliability issue for users who depend on skills.

- **[#83846](https://github.com/NousResearch/hermes-agent/issues/83846) - Windows Desktop App Deleted by Update (13 comments, 1👍):** A high-severity bug where the desktop app is deleted and not rebuilt, yet the system reports "Already up to date". This is one of the three related, highly visible Windows updater bugs that are clearly the primary community pain point this week.

- **[#86443](https://github.com/NousResearch/hermes-agent/issues/86443) - `hermes update` deletes Desktop app and exits 0 (6 comments):** A related issue that compounds the problem. The updater deletes the exe, fails to rebuild, and still reports success, leaving the user with no working desktop app and no indication of failure.

- **[#73379](https://github.com/NousResearch/hermes-agent/issues/73379) - Orphaned Dashboard on Non-systemd Systems (5 comments):** A significant infrastructure issue where `hermes update` orphans a non-systemd-supervised dashboard, breaking its respawn loop and leaving the old process holding the port.

- **[#75801](https://github.com/NousResearch/hermes-agent/issues/75801) - OpenCode Go Omits finish_reason (7 comments, 1👍):** A compounding bug causing fake "network mid-stream" continuations and stripped answers specifically when using OpenCode Go's gpt-5.6-luna model.

## 5. Bugs & Stability

A significant number of new bugs were filed today, signaling both heavy usage and a need for regression testing in certain areas.

**Critical (P0/P1):**
- **[#90971](https://github.com/NousResearch/hermes-agent/issues/90971) [P0] - Anthropic cache control is not idempotent:** This is the most severe issue. The description itself has been updated with a correction noting the original scenarios are "unreachable", making the nature of the actual bug unclear and in need of re-evaluation.
- **[#85079](https://github.com/NousResearch/hermes-agent/issues/85079) [P1] - Session persistence failure on contended WAL append:** A hard-fail with an opaque error (`returned NULL without setting an exception`) under concurrent subagent writes, classifying as an `unknown` error.
- **[#89293](https://github.com/NousResearch/hermes-agent/issues/89293) [P1] - Repeated `state.db` corruption on busy host:** A production user reports 3 corruption incidents in 8 days, requiring offline rebuilds and partial data loss. This represents a serious data integrity concern for demanding deployments.

**High (P2):**
- Multiple Windows installer/updater issues, including [#90829](https://github.com/NousResearch/hermes-agent/issues/90829) (Daily Desktop update fails due to a fail-closed get-windows gate) and [#44225](https://github.com/NousResearch/hermes-agent/issues/44225) (hermes update destroys executable on failed Electron rebuild).
- **[#90477](https://github.com/NousResearch/hermes-agent/issues/90477) - Desktop profile switch on SSH remote spawns local backend:** A major misrouting bug where switching profiles on an SSH remote connection launches a local backend and reconnects to a different host, which could potentially cause security or data-leak issues.
- **[#90493](https://github.com/NousResearch/hermes-agent/issues/90493) - Session persistence failure swallows real SQLite error:** Corruptions are masked by generic error messages, hindering diagnosis.
- **[#91149](https://github.com/NousResearch/hermes-agent/issues/91149) - zai provider uses wrong models.dev catalog entry:** Configuration is resolving to incorrect context sizes, which could lead to unexpected billing or model failures.

**Low (P3):**
- Several other issues filed, including a kanban bug ([#91178](https://github.com/NousResearch/hermes-agent/issues/91178)), a double-promotion of `blocked` tasks, and a stale list item narration issue ([#91153](https://github.com/NousResearch/hermes-agent/issues/91153)).

## 6. Feature Requests & Roadmap Signals

New feature requests and architectural proposals hint at a strong focus on governance, reliability, and standardization:

- **[#90866](https://github.com/NousResearch/hermes-agent/issues/90866) - Make observable state proof-carrying from source to side effect:** Proposes making all state changes audit-proof and verifiable. This is a sophisticated architectural goal that suggests the project is thinking about enterprise-grade compliance and robustness.
- **[#88683](https://github.com/NousResearch/hermes-agent/issues/88683) - Make install/update/bootstrap obey one transactional deployment plan:** A clear response to the Windows updater bug class. This proposal aims to introduce a single source of truth for deployments and will likely be a major roadmap item to fix the recurrent failures.
- **[#91202](https://github.com/NousResearch/hermes-agent/issues/91202) - Approval Workflow for Memory and Skill Modifications:** Users want more control over agent self-modification, asking for an approval gating mechanism similar to shell commands for memory and skill writes.
- **[#91149](https://github.com/NousResearch/hermes-agent/issues/91149) - Preview pane route localhost through remote/SSH backend:** A UX feature to make the desktop preview pane work seamlessly when connected to remote backends.

## 7. User Feedback Summary

The voice of the user today is loud and clear: **Windows desktop reliability is the #1 pain point.** Users are experiencing significant breaks in their workflows, including the complete loss of their desktop application after an update ([#83846](https://github.com/NousResearch/hermes-agent/issues/83846)). The feedback is colored by a sense of being misled by the software, with reports that updates are "reported as successful" or "already up to date" even when the core application has been deleted.

Beyond the Windows installer, there is a clear undercurrent of concern regarding **data integrity and system stability**. The repeated `state.db` corruption ([#89293](https://github.com/NousResearch/hermes-agent/issues/89293)) and the arbitrary orphaning of a dashboard ([#73379](https://github.com/NousResearch/hermes-agent/issues/73379)) are high-impact problems that undermine trust in the agent's core functionality. A user even reported their "entire environment just spun down" ([#90929](https://github.com/NousResearch/hermes-agent/issues/90929)), highlighting the stake of these stability issues. The active development with multiple open PRs to fix these exact issues is a positive signal, but the volume of critical user-impacting bugs is notably high.

## 8. Backlog Watch

Several long-running issues remain open and continue to be actively updated, indicating they are either complex, increasingly relevant, or waiting for a definitive fix:

- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616) [OPEN, 1 month old] - Skills Index is stale or degraded:** The most commented issue. It appears to be a persistent reliability problem that needs a permanent solution.

- **[#73379](https://github.com/NousResearch/hermes-agent/issues/73379) [OPEN, 3 weeks old] - Orphaned dashboard on non-systemd systems:** This issue remains unchanged and is a known limitation for users with custom supervision setups.

- **[#27649](https://github.com/NousResearch/hermes-agent/issues/27649) [CLOSED today] - Multiprocess logging can keep writing to rotated logs:** While the issue was closed today, its closure seems attributable to a **new PR**, not a merged one. The fix PR [#91210](https://github.com/NousResearch/hermes-agent/pull/91210) is still open, so the underlying work is still in progress.

- **[#32678](https://github.com/NousResearch/hermes-agent/issues/32678) [OPEN, ~3 months old] - GCP Vertex AI connection fails with 404:** This long-standing, unanswered integration problem remains a significant gap for any user on Google Cloud infrastructure and needs maintainer investigation.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest
**Digest Date: 2026-08-21 | Data Window: Last 24 Hours**

---

## 1. Today's Overview

PicoClaw is in a steady maintenance phase with a modest but meaningful flow of activity. Three issues and eight PRs were touched in the last 24 hours, though the majority of PR traffic consists of automated dependency bumps (5 of 8) rather than feature development. Notably, two long-running feature PRs — **#1158 (Anthropic native protocol)** and **#423 (multi-agent collaboration framework)** — have been closed after months of development, marking significant milestones for the project. The issue tracker shows three open requests, two of which are feature requests targeting transcription flexibility and dynamic model selection, indicating active community demand for extended model ecosystem support. Overall, the project appears healthy with regular maintenance, though the dependency update backlog flagged as `stale` suggests a need for review.

---

## 2. Releases

**No new releases** in the last 24 hours. The latest version remains **v0.3.1** (referenced in Issue #3281). No changelog, breaking change, or migration notes are available for this digest period.

---

## 3. Project Progress

Three PRs were closed in the last 24 hours:

| PR | Title | Description |
|---|---|---|
| **#1158** | [feat: add anthropic-messages protocol for native Anthropic API format](https://github.com/sipeed/picoclaw/pull/1158) | Adds `anthropic-messages` protocol prefix supporting Anthropic's native `/v1/messages` endpoint, resolving Issue #269 where providers only support Anthropic's native format. |
| **#423** | [feat: base multi-agent collaboration framework & shared context](https://github.com/sipeed/picoclaw/pull/423) | WIP that was closed; builds on #213 and #131 to add a "Blackboard" (thread-safe shared context pool), agent handoff, and discovery tools. |
| **#3318** | [fix(web): repair unparseable pnpm-lock.yaml](https://github.com/sipeed/picoclaw/pull/3318) | Fixes duplicate `semver@7.8.5` mapping keys in `web/frontend/pnpm-lock.yaml` causing `ERR_PNPM_BROKEN_LOCKFILE` during install. |

Both #1158 and #423 address critical architecture gaps — native Anthropic support and multi-agent orchestration — and were highly anticipated (both created months ago in Feb/Mar 2026). Their closure, while not marking a merge event in this window, signals movement toward broader model protocol support and advanced agent workflows.

---

## 4. Community Hot Topics

**Issue #3281** — *[BUG] Web UI chat input is very laggy when history gets long* — is the most active item with **6 comments and 1 👍 reaction**. The issue describes severe input lag in the web interface as session history grows. The `stale` label suggests the issue has lacked recent maintainer feedback. This represents a core UX pain point affecting everyday usage.  
🔗 [View Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)

**PR #1158** — *Anthropic native protocol support* — despite being closed, generated significant user interest (created Mar 2026, remained active until Aug 20), proving strong demand for broader provider compatibility.  
🔗 [View PR #1158](https://github.com/sipeed/picoclaw/pull/1158)

**PR #423** — *Multi-agent collaboration framework* — similar longevity and community anticipation; closing it may disappoint users awaiting this capability.  
🔗 [View PR #423](https://github.com/sipeed/picoclaw/pull/423)

**Underlying need analysis:** The community is converging on two themes: (1) **Provider flexibility** — support more API formats natively (Anthropic) and more transcription models (Issue #3331), and (2) **Multi-agent orchestration** — dynamic model selection per sub-agent (Issue #3330) and shared context (PR #423).

---

## 5. Bugs & Stability

| Severity | Issue | Description | Fix Available? |
|---|---|---|---|
| **High** | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI input lag with long chat history — core usability degradation | ❌ No fix PR detected |
| **Medium** | [#3318](https://github.com/sipeed/picoclaw/pull/3318) | Broken `pnpm-lock.yaml` blocking web frontend installs | ✅ Fixed & closed |
| **Low** | — | No other crashes or regressions reported | — |

The web UI lag issue (#3281) is the most critical stability concern, directly impacting the primary interface. No commit or PR has been linked to address it yet. The lockfile fix (#3318) shows the project is responsive to build-breaking issues.

---

## 6. Feature Requests & Roadmap Signals

**Active feature requests:**

| # | Feature | Description | Likelihood for next version |
|---|---|---|---|
| **#3331** | [Flexible transcription endpoint support](https://github.com/sipeed/picoclaw/issues/3331) | Allow any model with `/audio/transcriptions` endpoint, not just `*-whisper-*` which is considered "too old and slow" | **High** — clear use case and trivial config change (`whisper-transcription: true` flag) |
| **#3330** | [Dynamic model override in delegate/spawn/subagent tools](https://github.com/sipeed/picoclaw/issues/3330) | Allow model selection at call time for subagent tools | **Medium** — requires architectural change to agent runtime |

**Roadmap signals:** The closure of PR #1158 (Anthropic) and PR #423 (multi-agent) suggests the maintainers are actively working on protocol abstraction and multi-agent workflows. Issue #3330 complements #423 by enhancing subagent tooling. Expect **vNext** to include:
- Native Anthropic Messages API support
- Enhanced multi-agent configuration (dynamic models)
- Possibly transcription provider flexibility (lower effort, high value)

---

## 7. User Feedback Summary

**Pain points expressed:**
- **Web UI latency with history** (#3281) — Users experience degradation proportional to session length; directly impacts daily conversational workflows
- **Limited transcription model support** (#3331) — User explicitly calls existing `*-whisper-*` models "too old and slow," indicating performance dissatisfaction
- **Rigid model assignment** (#3330) — Users want per-call model control in delegated agents, suggesting the static config approach is limiting complex workflows

**Satisfaction signals:**
- Low negative reactions (only 1 👍 on the top issue, suggesting frustration is moderate rather than widespread)
- Active dependency maintenance (5 PRs) shows healthy engineering practice

**Overall sentiment:** Neutral-to-positive, with targeted complaints around performance and configurability rather than fundamental functionality.

---

## 8. Backlog Watch

| Item | Age | Issue | Why it needs attention |
|---|---|---|---|
| [#3281](https://github.com/sipeed/picoclaw/issues/3281) — Web UI lag | Open since **2026-07-21** (~31 days) | Labeled `stale`; 6 comments, no maintainer response | High-severity UX bug with community engagement; should be triaged |
| [#3330](https://github.com/sipeed/picoclaw/issues/3330) — Dynamic model override | Open since **2026-08-13** (~8 days) | Only 1 comment; `stale` label | Feature is complementary to #423; maintainers should coordinate response |
| [#3331](https://github.com/sipeed/picoclaw/issues/3331) — Transcription flexibility | Open since **2026-08-13** (~8 days) | Only 1 comment; `stale` label | Straightforward enhancement; quick win |
| **Dependency backlog** — PRs #3332–#3336 | Created **2026-08-13** | All labeled `stale`; AWS, Anthropic SDK, and mautrix updates pending | Unmerged for 8 days; low risk but blocks SDK security/feature updates |

**Recommendation:** Maintainers should prioritize a response on #3281 (UX bug) and triage the `stale` labels on #3330 and #3331, as they represent high-value, low-effort features. The dependabot PRs, while minor, should be merged to avoid accumulation of technical debt.

---

*Digest generated automatically from PicoClaw GitHub activity data for 2026-08-21.*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest
**2026-08-21**

---

## 1. Today's Overview

NanoClaw is in a period of intense, focused maintenance and channel-hardening activity. While no new releases were cut today, the repository saw a remarkable surge of 50 pull requests updated in the last 24 hours, with 15 of those being merged or closed. The bulk of activity centers on a large "skill audit" wave (PRs #3414–#3420) led by core-team member `gavrielc`, systematically fixing bugs across a dozen integration skills, alongside critical router logic fixes (PR #3422) addressing a nuanced engagement-mode bug. Community issue reporting remains steady, with two open issues highlighting real user-facing problems: WhatsApp attachments being unreachable by agents (#2715) and a `mention-sticky` engagement bug on threaded platforms (#3369). The project is healthy and responsive, though the sheer volume of stacked PRs suggests a maintenance backlog is being actively burned down.

---

## 2. Releases

**No new releases** were published in the last 24 hours. The latest release remains unchanged.

---

## 3. Project Progress

15 pull requests were merged or closed today. The most notable items include:

- **One-Click Slack Setup (#3421)** — Merged. This closes the loop on the `/add-slack` setup flow, providing documentation and setup for a one-click Slack agent installation experience, including app and avatar creation and workspace install.
- **Malformed Cron Handling (#3247)** — Open but actively updated; this fix will prevent a never-ending error loop by retiring malformed cron strings rather than re-erroring every sweep tick.
- **Feature: Create New Session (#1311)** — Closed. A long-running feature request (open since March) has been resolved and merged.
- **Skill Audits & Fixes** — A massive stack of core-team PRs by `gavrielc` (stacked on #3408) was actively updated to fix deep integration issues across skills: `add-dashboard` (portable SQL, #3417), `add-anydoc` (install-scoped ncl, #3419), `add-clidash` (refresh fan-out fix, #3414), `add-macos-statusbar` (slug-aware labels, #3420), `add-ollama-tool` (per-group MCP seam, #3416), `add-atomic-chat-tool` (config surface fix, #3415), and `add-tavily-tool` (honest smoke tests, #3418).
- **Provider SDKs** — Active work on adding Cursor Agent SDK payload (#3356) and a new `/add-cursor` agent provider skill (#3355).

---

## 4. Community Hot Topics

The most active discussions today center on user-facing integration bugs:

1. **Inbound WhatsApp Media Unreachable (#2715)** — *[1 comment]* — This issue describes a critical path failure: WhatsApp attachments are saved to a host directory not mounted into the agent container, so the agent receives a `/workspace/attachments/...` path that doesn't exist. The underlying need is for reliable, cross-container file delivery in channel adapters — a core functionality expectation. Several fix PRs from the core team (e.g., #3402 for codex files) indicate this delivery problem is a known systemic issue being addressed across channels.

2. **`mention-sticky` Engages Without a Mention (#3369)** — *[0 comments]* — A subtle behavioral bug on threaded platforms like Slack. When `engage_mode: 'mention-sticky'` is combined with `ignored_message_policy: 'accumulate'`, the agent starts replying in threads where it was never mentioned. The issue correctly identifies the root cause: the `accumulate` policy creates a session row that becomes the subscription trigger. A dedicated fix PR (#3422) has been opened by `teran13`, though its description suggests it may only partially address the issue.

3. **`engage_mode='always'` Drops Messages (#2606)** — *[0 comments], Closed* — This bug was closed today. It highlighted a silent failure where the `always` mode wasn't handled in `evaluateEngage()`, dropping all messages. The closure indicates maintainers have addressed the gap.

---

## 5. Bugs & Stability

Three bugs are prominent today, ranked by severity:

| Severity | Issue/PR | Description | Fix Status |
|----------|----------|-------------|------------|
| **Critical** | [#2715](https://github.com/nanocoai/nanoclaw/issues/2715) | Inbound WhatsApp media (images/docs/audio) is completely unreachable by the agent due to incorrect volume mounts. This is a functional failure of a core channel feature. | No direct fix PR; systemic fix likely via per-channel config work (#3402, #3401). |
| **High** | [#3369](https://github.com/nanocoai/nanoclaw/issues/3369) | `mention-sticky` subscription leak — the agent can reply in threads where it was never mentioned, violating user intent and potentially spamming channels. | PR [#3422](https://github.com/nanocoai/nanoclaw/pull/3422) opened and actively updated; needs review. |
| **Medium** | [#3423](https://github.com/nanocoai/nanoclaw/pull/3423) | `/add-slack` setup flow omits the `app_mentions:read` scope, so the event subscription (app_mention) will fail to function for new installs. | Fix PR open by `marcelomarra` — awaiting merge. |
| **Medium** | [#3247](https://github.com/nanocoai/nanoclaw/pull/3247) | Malformed cron strings cause a re-error loop on every sweep tick, potentially spamming logs and wasting cycles. | Fix PR open by `jsboige` — awaiting merge. |

*Note: The `mention-sticky` and `no_agent_engaged` issues highlight that the engagement router (`evaluateEngage()` in `src/router.ts`) has had several edge-case failures. The core team should consider a comprehensive test suite for this module.*

---

## 6. Feature Requests & Roadmap Signals

Based on today's activity, several clear roadmap signals emerge:

- **Cursor Integration (Likely Next Release)** — Active PRs for both a provider SDK payload (#3356) and a setup skill (`/add-cursor`, #3355) are highly active. This strongly suggests Cursor Agent SDK support is a near-term priority alongside the existing OpenAI/Anthropic providers.
- **One-Click Setup Experience** — The merged "one-click Slack agents" announcement (#3421) and the sidebar flip it stacks on (#3404) point to a broader roadmap push: reducing setup friction to a single command. Expect more channel `add-*` skills to adopt this pattern.
- **File Delivery Abstraction** — Multiple PRs today touch on file delivery (`send_file`, provider-generated files, #3402) and the WhatsApp attachment bug (#2715) exposes the lack of a unified container-mounted inbox. A formal, cross-platform file-delivery contract appears to be an emerging architectural priority.
- **Tool/Provider Ecosystem Expansion** — Audits and fixes to Ollama, Tavily, and Atomic Chat tool skills (#3416, #3418, #3415) demonstrate intent to keep the non-native tool ecosystem robust and battle-tested.

**Prediction:** The next minor release will likely include Cursor SDK support, the one-click Slack setup, and the batch of skill audit fixes bundled together. The WhatsApp attachment fix may be held back if a deeper file-delivery re-architecture is planned.

---

## 7. User Feedback Summary

- **Pain Point — Silent Context Loops (new report, #3369):** A user reports that "accumulate" silent context is not truly silent; it leaks into engagement. The user explicitly points out that "accumulate is documented as storing a non-engaging message as *silent context*," implying the documentation and behavior are out of sync. This is a trust-damaging defect for threaded channels.
- **Pain Point — Broken WhatsApp Media (aging, #2715):** A user (reporter `jon-ruth`) cannot use inbound media at all on WhatsApp. This has been open for over 2 months, suggesting the v2 migration left attachments half-wired — a frustrating gap for a primary channel.
- **Field Reports on Setup Failures (PRs #3423, #3247):** Users are hitting errors during the setup flow itself (missing scopes for Slack) and with malformed cron configs. While not formal feedback, these indicate the documentation and validation logic need to be more robust to edge cases in user input.
- **Positive Signal — Skill Audit Completeness:** The community's expectation that contributed skills are production-ready is being validated by the core team's audit (PRs #3414–#3420). The fact that audits are finding and fixing dead-config paths (e.g., `add-ollama-tool` and `add-atomic-chat-tool` reading `process.env` instead of the live config) suggests earlier user frustration, but the proactive audit is a strong corrective signal.

---

## 8. Backlog Watch

**Needing Maintainer Attention:**

| Issue/PR | Age | Why It Matters |
|----------|-----|----------------|
| [#2715](https://github.com/nanocoai/nanoclaw/issues/2715) — WhatsApp attachments unmounted | **74 days** | **Critical functional gap** for a primary messaging channel. No direct fix PR exists. This needs either a targeted fix or a clear architecture decision on attachment delivery. High user visibility. |
| [#3189](https://github.com/nanocoai/nanoclaw/pull/3189) — `feat(skill): add-why` utility skill | **16 days** | A user-requested utility to explain what happened to a message. Open with no comments from maintainers. Useful skill; needs review/merge or feedback. |
| [#3196](https://github.com/nanocoai/nanoclaw/pull/3196) — `fix: add mount readonly` | **14 days** | A straightforward security-hardening fix (readonly mounts) with no maintainer traffic. |
| [#3270](https://github.com/nanocoai/nanoclaw/pull/3270) — `feat: ncl token usage` | **5 days** | Opens the question of token usage telemetry — a roadmap-significant feature. Needs maintainer direction. |

**Overall Backlog Health:** The repository shows strong maintainer responsiveness to new bugs (most open PRs are < 24 hours old), but a small set of user-submitted fixes and features (especially from community member `teran13`) have been waiting for weeks. The core team's own stacked audit PRs may be absorbing review capacity; these community PRs should be prioritized to avoid contributor burnout.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-21

## 1. Today's Overview

IronClaw shows strong momentum with 21 issues and 33 PRs updated in the last 24 hours, split between active work (17 open issues, 19 open PRs) and recently closed items (4 issues, 14 PRs/merges). Activity is concentrated on a few major fronts: the WebUI design system program is being actively re-scoped into a phase-based epic structure, the agent lifecycle hook system (#7770) is advancing with the AfterTurn point under review, and a Rust 1.98 clippy update caused a CI break that was fixed the same day. The work is well-organized with clear epic/phase tracking, and the 14 merged/closed PRs indicate solid throughput. Notably, there are no new releases, suggesting open-source community users of IronClaw may want to watch for the v1.4.0 milestone Epics.

## 2. Releases

No new releases in the last 24 hours. The project is tracking toward **v1.4.0**, which is referenced by two active epics (#7732, #7781).

## 3. Project Progress

**Merged/Closed PR highlights:**

- **CI unblocked after Rust 1.98 rollout** — Two PRs (#7777, #7778) cleared a clippy lint cascade that broke the merge queue and all-branch CI. The toolchain floats on stable, so the new lints (`chunks_exact_to_arrays`, and others) hit all branches at once; both fixes landed the same day. (#7777, #7778)
- **Automation run-now feature shipped** (#7729, closes #7193) — Manual fire for automations across the trigger domain, capability surface, and WebUI. The underlying issue (#7193) was closed.
- **Slack deployment card improved** (#7738) — Per-field help text on the Slack admin config card, complementing the earlier Telegram work.
- **Canonical subagent docs** (#7763) — Seven design docs (7,000+ lines) consolidated into one README, net −9,713 lines.
- **Storybook phase-1 PR recreated clean** (#7750 on top of #7039) — Linear branch, superseding the tangled prior attempt.
- **Fixture/docs/vocabulary cleanups** — Turn/subagent vocabulary collapse (#7755 closed), executor test-support split (#7785), and capability-port test extraction (#7784) keep the codebase healthy.
- **Suggestions generation hotfix** (#7786, closed) — Fixed `uniqueItems` breaking all OpenAI strict structured-output generation (SEV), plus dead allowlist cleanup and extension-gated cards.
- **OAuth login ordering** (#7304, closed) — OAuth provider buttons now render above the gateway token form on the WebChat v2 login card.

## 4. Community Hot Topics

- **Epic #7732 — Persistent per-user sandbox with iron-proxy** (8 comments, open): The most active issue. Active work continues with PR #7779 (Step 2 of the epic) routing sandbox egress through a managed per-user proxy. The "defer loop executors" scope indicates focus is on the sandbox path first.
- **Issue #7770 — Agent lifecycle hooks epic** (3 comments, open): The AfterTurn hook PR (#7765) has already generated three follow-up issues (#7780, #7775, #7776), showing a rigorous review process that is catching real design gaps before they land.
- **Issue #7038 — Design System Phase 1** (2 comments, open): Significantly re-scoped with phases 2–3 moved to #7781 and phases 4–5 split into #7782; the superseded epic #7733 was closed. This is active product direction, not just internal cleanup.
- **Issue #7783 — LLM timeout policy flaw** (1 comment, open): Active bug discussion. Structured-output finalization runs on the non-streaming client, so TTFT can't be measured and the retry budget can't fit the 75s deadline; a single transport stall kills the run.

The busiest cluster is the lifecycle-hook work around #7770, where the review on PR #7765 has already surfaced three distinct follow-on issues — a sign of a healthy, thorough design process but also a feature that needs to be watched for scope creep.

## 5. Bugs & Stability

**High severity:**

- **LLM timeout policy is structurally broken** (#7783, open): The 60s wall-clock cap can't measure TTFT on the non-streaming client, and the retry budget can't fit the 75s finalization deadline. A single provider stall kills a run. **No fix PR yet**; this could benefit from owner assignment.
- **memory.write lacks expected-version mode** (#7776, open): Full-document rewrites can silently overwrite concurrent writes. The "CAS makes this safe" claim in PR #7765 was found to be half-true. Found by review; **no fix PR yet** — this is a data-integrity concern.
- **AfterTurn doesn't fire on scheduler-side failure terminalization** (#7780, open): Runs that reach terminal state via driver/exit-application failure bypass the AfterTurn hook entirely. Follow-up from the #7765 review.
- **Suggestions generation SEV already fixed** (#7786, merged/closed): `uniqueItems: true` in the suggestions JSON schema broke every OpenAI strict structured-output call. Minimal fix landed and can be cherry-picked independently.

**Medium severity:**

- **Hosted MCP OAuth registration for Attio fails** (#7308, closed): Invalid scope cannot be corrected; the underlying auth-gate failure blocks install/connect.
- **Automation presenter tests are timezone-fragile** (#7767, open; fix PR #7774 open): Assertions assume UTC and break in Asia/Shanghai. Low-risk but touches a shipped feature's test suite.
- **Unbound runs abort on gating capability** (#7775, open): `GateNotSupportedStrategy` turns a gate into a terminal failure when there's no conversation surface; proposal is to skip instead of abort for background work.

**CI/Infra:**

- Two PRs (#7777, #7778) already fixed the Rust 1.98 clippy break; main is green again.

## 6. Feature Requests & Roadmap Signals

- **Design System phases (clear roadmap):** Phase 1 (Storybook + catalog) is in PR #7750; Phases 2–3 under epic #7781 (DESIGN.md governance + theme reskin); Phases 4–5 in #7782 (agentic interactions, components, IA). This is a committed multi-phase UX investment.
- **Persistent per-user sandbox** (#7732): Step 2 is in PR #7779 (per-user proxy routing). This is shaping toward a v1.4.0 ship target.
- **Agent lifecycle hooks** (#7770): The AfterTurn hook is in review; the epic explicitly lists after-turn, before-turn, compaction, and tool-result seams. Expect more phases to land independently.
- **Notification center generalization** (PR #7698, #7699): Both are still open (20 days old), moving from automation-only to a durable, authenticated inbox with typed actions and lifecycle states.
- **Coding tool unification** (PR #7491, open 10 days): One coding-tool surface (`read/write/edit/glob/grep/bash`) replacing the mixed old/new surface; "omp core-tool contract" suggests this aligns with an Open Model Protocol effort.

## 7. User Feedback Summary

- **Daily failure taxonomy (internal)**: The most recent analysis (#7771) reports officeqa's 58 failures are overwhelmingly genuine model-quality errors (DeepSeek-V4-Flash agent misnavigation), not platform bugs — implying the harness is stable enough to surface model issues distinctly.
- **Configure modal misleads users** (#7769): Extension setup API returns authoritative `phase` and `blockers`, but Configure only handles the Hosted MCP auth blocker, so other blockers are discarded and the modal incorrectly claims no configuration is required.
- **Design docs were contradictory**: PR #7763 notes the subagent design record had "three design generations" that were "mutually contradictory" — now consolidated into one canonical README (−9,713 lines), which should reduce implementer confusion.
- **Sandbox UX needs real per-user persistence**: #7732's problem statement makes it explicit that the current per-command container creation isn't the "persistent user computer" they want to ship in v1.4.0.
- **Slack setup docs drift**: PR #7737 catches scope lists that drifted within a day of the manifest update, showing operational docs need tighter coupling to the manifest.

## 8. Backlog Watch

- **PR #7698 and #7699 (both open, 4 days, XL size, medium risk)**: The notification center generalization (webui + server-side publishing). Both have been untouched for 3–4 days. These are large, but they touch a user-visible feature (notifications) and could go stale. Worth watching.
- **PR #7491 (open 10 days, XL, medium risk)**: Coding tool contract cross-cutting PR. It's a large surface change to a core tool surface — fine for a slice-based PR, but it's been sitting for 10 days without merge. If reviews are blocked, a check-in could help.
- **Issue #7308 (closed, but note)**: The Attio OAuth failure was closed with 1 comment — verify that the companion issue (referred to as "companion issue" in the summary) actually tracks the fix, or the platform may silently leave users stuck.
- **Issue #7755**: Explicitly gated on #7752 merging before it lands — confirm #7752 is still on track so this doesn't linger.

**Overall health**: Good. The project is shipping (14 merges today), fixing CI same-day, running a disciplined epic/phase structure, and reviews are catching real design gaps before they land. The main risks to watch are the unreviewed large PRs (#7491, #7698/#7699) and the unresolved timeout-policy bug (#7783), which could cause user-facing run failures that are hard to diagnose.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-21

## 1. Today's Overview

LobsterAI shows steady maintenance activity with **7 PRs updated in the last 24 hours (6 merged/closed, 1 open)** and **2 open issues touched** — both stale backlog items rather than new reports. No new releases were published, indicating work is concentrated on feature integration and bug fixes ahead of the next version. The merged work clusters around UX improvements: file preview capabilities, settings navigation, Agent switching fixes, and a packaging build repair. Overall, the project is in a healthy state with moderate throughput, though the stale issue count warrants attention.

## 2. Releases

No new releases were published in the reporting window. The last release remains unchanged; users should stay tuned for the next tag which will likely bundle the merged features below.

## 3. Project Progress

Six PRs were merged/closed, advancing several feature areas:

- **[#1553 — Write tool FileCard & Split Preview Panel](https://github.com/netease-youdao/LobsterAI/pull/1553)** (merged, closes #1552): Adds inline file cards for Write tool outputs with a resizable right-side preview panel supporting Markdown, HTML sandboxed iframe, SVG, images, and code syntax highlighting. Directly resolves the long-standing pain point of in-chat file preview.
- **[#1557 — Settings Sidebar Search/Filter](https://github.com/netease-youdao/LobsterAI/pull/1557)** (merged): Adds search-as-you-type filtering to the settings sidebar with bilingual keyword matching (Chinese/English), NFKC normalization, and automatic tab fallback when current selection is filtered out.
- **[#1560 — Fix Agent switch back to chat after editing](https://github.com/netease-youdao/LobsterAI/pull/1560)** (merged): Resolves bug where clicking the previously selected Agent after editing kept user on "My Agents" screen instead of returning to chat.
- **[#1545 — Sync activeSkillIds on Agent update](https://github.com/netease-youdao/LobsterAI/pull/1545)** (merged, fixes #1502): Immediately updates Active Skill Badges in chat when saving skill modifications, eliminating the need to switch Agents to see changes.
- **[#1546 — Engine startup overlay escape buttons](https://github.com/netease-youdao/LobsterAI/pull/1546)** (merged): Adds "Cancel Launch" and "View Logs" buttons after 30s of engine startup, replacing a 5-minute hard wait with actionable escape hatches.
- **[#1555 — Fix macOS x64 packaging failure](https://github.com/netease-youdao/LobsterAI/pull/1555)** (merged): Replaces `sha256sum` with `shasum` compatibility in build script since macOS lacks `sha256sum`.

Still open:

- **[#1547 — Scheduled task notification channel reset fix](https://github.com/netease-youdao/LobsterAI/pull/1547)** (open): Fixes bug where "Do Not Notify" option doesn't persist when re-editing scheduled tasks; a small two-line change to `TaskForm.tsx`.

## 4. Community Hot Topics

Only two issues were active in the window (both stale, no new user reports):

- **[#1552 — Markdown preview & file card support](https://github.com/netease-youdao/LobsterAI/issues/1552)** (2 comments): The top hot topic — user requested always-visible file cards after Write tool calls plus preview capabilities. This issue was actively addressed; merged PR #1553 implements exactly this. High user value confirmed by the issue's existence since April.
- **[#1556 — Docs 404: IM bot configuration guide](https://github.com/netease-youdao/LobsterAI/issues/1556)** (2 comments): Documentation link points to a missing page. Low complexity, but the link is user-facing and should be prioritized for docs health.

**Underlying need analysis**: The file preview demand (#1552) reflects a broader UX pattern — users expect AI agents to integrate seamlessly into their file workflow rather than demanding extra manual steps. The merge of #1553 signals the team is responsive to workflow-focused feedback.

## 5. Bugs & Stability

Two bugs were fixed, none newly reported:

| Severity | Issue | Status | Notes |
|----------|-------|--------|-------|
| Medium | **Agent skill badges not syncing after save** (#1502 → fixed by #1545) | Merged | UX inconsistency requiring manual workaround |
| Medium | **Cannot switch back to chat after Agent edit** (fixed by #1560) | Merged | Navigation regression after editing, discoverable via chat UI |
| Low | **Scheduled task notification channel cannot revert to "No Notification"** (fixed in #1547) | Open PR | Persistence logic bug in form state; fix is small, awaits review |
| Low | **macOS x64 packaging fails** (fixed by #1555) | Merged | Build toolchain incompatibility (`sha256sum` vs `shasum`) |

No crashes or severe regressions reported in this window.

## 6. Feature Requests & Roadmap Signals

From the merged PRs and open issues, likely next-version features:

- **File card + preview panel (implemented in #1553)**: High confidence this ships next. Aligns with agent-as-writer use case.
- **Settings search (implemented in #1557)**: Improves discoverability as settings tabs grow — signals the app is accumulating configuration surface area.
- **Engine startup escape (implemented in #1546)**: Direct response to startup hang pain; improves operational robustness.
- **Scheduled task notification fixes (#1547)**: Small UX fix expected in next patch release once reviewed.

No brand-new feature requests were voiced this window; the backlog remains dominated by already-implemented or in-flight items.

## 7. User Feedback Summary

- **Positive signal**: Users are actively configuring Agents (skills, scheduling, IM integration) and hitting edge cases in those flows — evidence of real adoption.
- **Pain points voiced** (via issues/PRs):
  - Can't preview files the Agent writes without switching apps ("体验较差" — poor experience).
  - Settings panel is getting hard to navigate as tabs multiply.
  - Engine startup stalls leave users helpless without visual feedback.
  - Documentation link broken for IM bot setup (low severity but user-facing).
- **Overall sentiment**: Constructive, feature-driven. No strong negative sentiment; merged PRs indicate the team is resolving feedback promptly.

## 8. Backlog Watch

Items needing maintainer attention:

- **[#1556 — Docs 404 for IM bot guide](https://github.com/netease-youdao/LobsterAI/issues/1556)**: Open since **April 8**, stale, only 2 comments. This is a low-effort fix (restore/redirect docs page) but has high user-facing impact. Should be prioritized for docs hygiene.
- **[#1552 — Markdown preview & file card support](https://github.com/netease-youdao/LobsterAI/issues/1552)**: Now resolved by merged PR #1553; needs closure once verified.
- **[#1547 — Scheduled task notification fix](https://github.com/netease-youdao/LobsterAI/pull/1547)**: Small PR open since April 7; minor but should be merged to close the loop.

**Maintainer action items**: Close #1552 (implemented), triage #1556 (fix docs link), and review/merge #1547. The 14-week staleness on all backlog items suggests a backlog cleanup pass may be worthwhile.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-21

## 1. Today's Overview

Moltis is showing solid momentum with a busy development day: **1 issue resolved, 8 pull requests touched, and a new release shipped**. Activity is concentrated on security hardening and WhatsApp channel improvements, with maintainers actively merging fixes. The steady cadence of merged PRs (4) alongside ongoing work (4 open) indicates a healthy, responsive maintenance cycle. Notably, a **critical security vulnerability (CWE-306)** was patched and released within the same window, demonstrating strong security posture.

## 2. Releases

**New release: `20260820.01` (2026-08-20)**

This patch release is primarily a **security and bugfix release**. Key contents inferred from merged PRs:
- **Critical fix:** Vault unlock/recovery endpoints now require authentication (fixes CWE-306).
- **WhatApp fixes:** Push name no longer hardcoded to "Moltis"; replies to bot are now correctly treated as addressing it.
- **Channel tooling:** Introduced a configurable ceiling for the untrusted-turn tool policy.

**Migration notes:** No breaking changes expected. WhatsApp users should verify bot display name behavior after update. Operators with custom tool policy configurations should review the new untrusted-turn ceiling setting.

## 3. Project Progress (Merged/Closed PRs)

Four PRs were merged/closed today:

- **PR #1216 — Vault authentication fix** (merged): Adds required `AuthSession` to vault unlock/recovery endpoints, eliminating unauthenticated brute-force risk. Directly resolves Issue #1177.
- **PR #1217 — WhatsApp reply addressing** (merged): In group chats with `mention_mode = "mention"`, replies to bot messages now count as addressing the bot, matching user expectations.
- **PR #1218 — WhatsApp push name** (merged): Removes hardcoded "Moltis" push name so bots configured with custom names display correctly to non-contacts.
- **PR #1219 — Configurable tool ceiling** (merged): Makes the untrusted-turn tool ceiling configurable, restoring access to public-audience tools that were unintentionally blocked by an earlier hardcoded policy (from #1170).

## 4. Community Hot Topics

The most active discussion centers on **security and platform compatibility**:

- **Issue #1177 — Vault auth bypass** ([link](https://github.com/moltis-org/moltis/issues/1177)): Reported by a community member; zero comments but critical severity (CWE-306). The rapid fix (PR #1216) within 24h indicates the maintainers treated this with high priority.
- **PR #468 — Windows shell hooks** ([link](https://github.com/moltis-org/moltis/pull/468)): Open since March 2026, updated today. Requests using `cmd.exe /C` instead of `sh -c` on Windows. Community interest in Windows support is clear; this PR has been stale for months and is worth attention.

**Underlying need:** Users want robust security guarantees and cross-platform reliability. The Windows PR signals demand for proper Windows-native behavior.

## 5. Bugs & Stability

**Critical (fixed):**
- **Vault unlock/recovery unauthenticated access** — Issue #1177, fixed by PR #1216. Any unauthenticated remote caller could brute-force vault recovery. Patch available in release `20260820.01`.

**Moderate (fixed):**
- **WhatsApp push name hardcoded** — Corrected in PR #1218 so custom bot names display properly.
- **WhatsApp mention handling** — Replies to bot were dropped in mention-mode groups; fixed in PR #1217.

**Under review:**
- **Open PRs #1220 & #1221** address Markdown rendering and Snyk supply-chain pinning respectively; both are validation-pending.

No new regressions reported today. Project stability appears strong.

## 6. Feature Requests & Roadmap Signals

No explicit new feature requests were filed today, but signals from open PRs suggest near-term priorities:

- **WhatsApp Markdown rendering (PR #1220):** Converting model-generated Markdown to WhatsApp-native markup. This improves UX in chat channels and will likely ship soon.
- **Supply-chain hardening (PR #1221):** Pinning Snyk Agent Scan version; aligns with security-first posture and may land with #1220.
- **Windows shell compatibility (PR #468):** Long-pending; ongoing updates suggest maintainers are actively reviewing. Could land in a future minor release.

**Prediction:** The next version will likely include WhatsApp Markdown conversion and Snyk pinning, both pending validation.

## 7. User Feedback Summary

- **Security sensitivity:** The community quickly flagged and reported the vault authentication gap, and the maintainers' 24-hour turnaround reflects well on responsiveness.
- **WhatsApp UX expectations:** Users expect natural behaviors (replies = mentions, custom bot names). These fixes improve day-to-day trust and usability.
- **Windows users:** The lingering #468 PR shows real demand for Windows support; the update today suggests it remains relevant. Maintainers should prioritize merging or explicitly deprecating it.

Overall sentiment is **positive** given the security fix velocity and functional improvements.

## 8. Backlog Watch

- **PR #468 — Windows shell hooks** ([link](https://github.com/moltis-org/moltis/pull/468)): Open since **2026-03-23** (5 months). Updated today by the author. Still awaiting maintainer review/merge. Windows users likely blocked on this. **Moderate urgency** — no comms from maintainers since update.
- **Issue #1177** is now closed; no other stale issues surfaced in the data.

**Maintainer call to action:** Review #468 to either merge with updated tests or provide clear guidance on Windows support roadmap.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

Based on the GitHub data for CoPaw (referenced as QwenPaw in the repository), here is the project digest for 2026-08-21.

---

### 1. Today's Overview

CoPaw (QwenPaw) is showing a high level of activity, with 28 issues and 50 pull requests updated in the last 24 hours. A significant portion of this activity involves merged/closed PRs (28) and closed issues (13), indicating a strong focus on bug fixes and feature delivery. The release of `v2.1.1-beta.1` signals an ongoing, rapid release cycle. The community is actively reporting bugs and submitting feature requests, with a particular concentration on execution stability, performance, and usability, suggesting a project in an active maturation phase.

---

### 2. Releases

**New Release: v2.1.1-beta.1**

This new beta release includes the following notable changes:

- **Improved Console UI:** The editor tab overflow navigation has been improved, enhancing the user experience when managing many tabs ([PR #6983](https://github.com/agentscope-ai/QwenPaw/pull/6983)).
- **Reduced Log Noise:** The log level for the rate limiter initialization has been lowered, reducing potential confusion in the logs ([PR #6988](https://github.com/agentscope-ai/QwenPaw/pull/6988)).

**Migration Notes:** This is a beta release with no identified breaking changes or specific migration steps.

---

### 3. Project Progress

The project saw a substantial number of PRs merged or closed, focusing on fixing bugs, refactoring, and enhancing stability. Key advancements include:

- **Security & Data Integrity:**
    - Fixed a critical bug where a corrupt `envs.json` file was silently overwritten, losing all stored environment variables ([Issue #7118](https://github.com/agentscope-ai/QwenPaw/issues/7118), [PR #7135](https://github.com/agentscope-ai/QwenPaw/pull/7135)).
    - Fixed file-handling fallback logic that could fail to switch to an alternative downloader after a timeout ([Issue #6370](https://github.com/agentscope-ai/QwenPaw/issues/6370), [PR #6371](https://github.com/agentscope-ai/QwenPaw/pull/6371)).
- **Video & Media Handling:**
    - Updated the release build to bundle the `qwenpawmail` MCP as a standalone sidecar, simplifying packaging ([PR #7166](https://github.com/agentscope-ai/QwenPaw/pull/7166)).
- **Features & UX:**
    - Added an "Always-on" mode for Skills, allowing them to be loaded into the system prompt for specialized agents ([Issue #7182](https://github.com/agentscope-ai/QwenPaw/issues/7182), [PR #7183](https://github.com/agentscope-ai/QwenPaw/pull/7183)).
    - Refined session-level thinking modes (Off, Low, Medium, High) for better control over model reasoning ([PR #7163](https://github.com/agentscope-ai/QwenPaw/pull/7163)).
    - Enhanced QQ channel support to isolate conversation sessions by type and preserve message reply routes ([PR #7169](https://github.com/agentscope-ai/QwenPaw/pull/7169)).

---

### 4. Community Hot Topics

- **[Issue #6921: Agent stops prematurely without notification](https://github.com/agentscope-ai/QwenPaw/issues/6921)** (Open, 10 comments): This is the most discussed issue. Users report that the agent frequently pauses after planning a multi-step task (e.g., "Now 2.1, 3.1, 3.2. Let me do all three.") without providing any output or visible cue, requiring a "continue" prompt. This highlights a major pain point with user trust and task reliability.

- **[Issue #7102: Application freeze during operations](https://github.com/agentscope-ai/QwenPaw/issues/7102)** (Closed, 9 comments): Users report the desktop app freezing for over 10 minutes without any token output, even when using a third-party model (GLM). This was closed, but its high engagement indicates a serious stability concern.

- **[Issue #6643: Organize task outputs into separate directories](https://github.com/agentscope-ai/QwenPaw/issues/6643)** (Closed, 6 comments): Users are asking for better organization of task artifacts, wanting each task to have its own directory instead of everything piling into a single `media` folder.

---

### 5. Bugs & Stability

New bugs reported today, ranked by potential severity:

- **High: History database bloat** ([Issue #7168](https://github.com/agentscope-ai/QwenPaw/issues/7168)): The `history.db` file can grow to a massive size (7.6GB) due to the recall history feature storing full tool outputs. This is a critical stability and performance issue for long-running agents.
- **High: Streaming interruption fatal error** ([Issue #7162](https://github.com/agentscope-ai/QwenPaw/issues/7162), [Issue #7102](https://github.com/agentscope-ai/QwenPaw/issues/7102)): The agent throws a `UNKNOWN_AGENT_ERROR` (due to `httpx.ReadError`) when a stream connection is interrupted mid-response. The retry logic is incomplete as it doesn't handle this error type. A similar issue was reported about freezing for over 10 minutes. Both severely disrupt user workflows.
- **Medium: Embedding health check timeout** ([Issue #7156](https://github.com/agentscope-ai/QwenPaw/issues/7156)): The health check for Ollama embedding backends times out even when the service is warm, causing a fallback to BM25-only search. The timeout is hardcoded, making it impossible to configure.
- **Medium: Network recovery** ([Issue #6932](https://github.com/agentscope-ai/QwenPaw/issues/6932)): After a temporary network outage, the application fails to automatically recover, requiring a manual restart. This is a significant UX issue but may have been addressed.
- **Low: Un-downloadable image breaks session** ([Issue #7110](https://github.com/agentscope-ai/QwenPaw/issues/7110)): A single image link that cannot be accessed will completely break the entire conversation, making it unusable until reset.

---

### 6. Feature Requests & Roadmap Signals

Several feature requests signal the community's desired direction for the project:

- **Automatic Model Routing** ([Issue #6436](https://github.com/agentscope-ai/QwenPaw/issues/6436)): A popular request to route each request to the most suitable model (small, large, vision) based on the content, rather than pinning to one model.
- **Unified Tools & Interactive Panel** ([Issue #7013](https://github.com/agentscope-ai/QwenPaw/issues/7013)): A call for a unified "workbench" in the Chat page, integrating file previews, diffs, web service previews, and an interactive terminal, showing a desire for a more complete agent development environment.
- **Enhanced Agent and Channel Management** ([Issue #7179](https://github.com/agentscope-ai/QwenPaw/issues/7179), [Issue #7158](https://github.com/agentscope-ai/QwenPaw/issues/7158), [Issue #7159](https://github.com/agentscope-ai/QwenPaw/issues/7159)): The community is asking for better UX for managing many agents, as well as more configurable context modes for channel group chats (DingTalk) and scheduled messaging for QQ bots.
- **Third-party Integrations and Improvements** ([Issue #7182](https://github.com/agentscope-ai/QwenPaw/issues/7182), [Issue #7181](https://github.com/agentscope-ai/QwenPaw/issues/7181)): Requests for supporting new third-party agent harnesses (like `qwen_code`) and more granular control over long-term memory.

**Predictions for next version:** The high level of engagement and the existence of WIP PRs suggest that features like the [Hub](https://github.com/agentscope-ai/QwenPaw/pull/7112), [always-on skills](https://github.com/agentscope-ai/QwenPaw/pull/7183), and the [video dispatch and effects library](https://github.com/agentscope-ai/QwenPaw/pull/7167) are strong candidates for the next release.

---

### 7. User Feedback Summary

- **Pain Points:** The most prominent user complaints revolve around **task reliability and stability**. Users are frustrated by the agent stopping without warning ([#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)), freezing ([#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102)), and failing to recover from network issues ([#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932)). One user also reported a database bloat to 7.6GB, indicating a concern for long-term data management ([#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168)).
- **Usability:** Users are requesting improvements in the overall experience, including better organization of task artifacts ([#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643)), preservation of original filenames in Chinese ([#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453)), easier agent switching ([#7179](https://github.com/agentscope-ai/QwenPaw/issues/7179)), and a more accessible deploy platform homepage ([#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)).
- **Satisfaction:** Despite the bugs, the high volume of feature requests and PRs from the community indicates a deeply engaged user base that sees potential in the platform. The active response to bugs and the rapid release cycle suggest a team committed to improvement.

---

### 8. Backlog Watch

- **[PR #6399: Reranker UI config panel](https://github.com/agentscope-ai/QwenPaw/pull/6399)**: This PR was created on July 23 and has been marked "Under Review" for quite some time. Its long stay in review may be holding back progress on the broader memory/reranker feature set.
- **[Issue #7177: Optimize the deploy platform homepage](https://github.com/agentscope-ai/QwenPaw/issues/7177)**: This request from a very active user (rerbin) highlights a specific usability issue on the `platform.agentscope.io/deploy` page, particularly for mobile users. The simplicity of the request and its potential to improve accessibility merit attention.
- **[Issue #6370: Continue downloader fallback after timeout](https://github.com/agentscope-ai/QwenPaw/issues/6370)**: While a fix PR was closed yesterday, this issue is very old (from July 22) and related to unreliable downloads. It's worth verifying the fix is effective in edge cases, as it addresses a core file-handling robustness issue.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

Here is the ZeroClaw project digest for 2026-08-21.

---

# ZeroClaw Project Digest
**Date:** 2026-08-21

## 1. Today's Overview

ZeroClaw is in a period of intense architectural evolution, with 50 open issues and 48 open PRs signaling a high-velocity but arguably congested development cycle. The primary focus is on hardening the system's security and runtime architecture, particularly around shell command execution, WASM plugin egress, and sandboxing policies. While the volume of activity is high, the sheer number of PRs awaiting author action or maintainer review suggests that the review process may be a bottleneck. The project is also actively managing technical debt through dedicated trackers, such as the Rust anti-slop cleanup, indicating a mature approach to codebase health.

## 2. Releases

No new releases were published in the last 24 hours.

## 3. Project Progress

Given the high number of open PRs, the project is actively integrating major features. Key areas of advancement visible in the PR queue include:

- **Plugin Architecture (WASM):** A significant push toward a more secure and dynamic plugin system is underway. PRs [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) and [#9582](https://github.com/zeroclaw-labs/zeroclaw/pull/9582) are stacked efforts to enforce a host-owned egress policy for `wasi:http` and introduce a "grant ceremony" for plugin installation, which are critical for the "everything is a plugin" roadmap.
- **Provider Enhancements:** Functionality is expanding with PR [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809), which adds support for multiple models per provider profile, and PR [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109), introducing native Hailo-Ollama support. PR [#9999](https://github.com/zeroclaw-labs/zeroclaw/pull/9999) and [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) are actively fixing response classification errors for OpenAI-compatible and Anthropic providers.
- **Security & Config Hardening:** Several high-priority fixes are in flight, including hardening the Git shell policy arguments (PR [#9678](https://github.com/zeroclaw-labs/zeroclaw/pull/9678)), making cron mutations atomic (PR [#10177](https://github.com/zeroclaw-labs/zeroclaw/pull/10177)), and fixing channel config defaults (PR [#10033](https://github.com/zeroclaw-labs/zeroclaw/pull/10033)).

## 4. Community Hot Topics

The most contentious and active discussions are centered on architecture and security.

- **[Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) - RFC: Per-execution confirmation for high-risk shell commands (23 comments):** This is the most active topic, proposing a Claude Code-style allow/ask/deny policy for shell commands. It highlights a real user need for greater control over high-risk autonomous actions and has been refined over multiple revisions, indicating a complex design process.
- **[Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) - RFC: Runtime-owned conversation sessions (22 comments):** A major architectural proposal to shift session management from channels to a runtime-owned model. The long comment thread and revisions indicate this is a foundational change with significant implications.
- **[Issue #10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) - Tracker: Rust anti-slop policy debt remediation (16 comments):** This tracker coordinates fixing 307 candidates for "anti-slop" patterns in the Rust codebase. The high level of engagement suggests strong maintainer interest in code quality and consistency.
- **[Issue #6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) - RFC: Decouple memory lifecycle policy (14 comments):** Users and maintainers are discussing how to separate the policy for memory consolidation and governance from the actual storage backends, indicating a desire for more modular and customizable memory management.
- **[Issue #8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) - RFC: Realtime speech-to-speech channel for Gemini Live (14 comments):** A feature request for a realtime voice channel, showing interest in advancing ZeroClaw's interaction capabilities beyond text.

## 5. Bugs & Stability

Several bugs were reported today, with severity varying. No new fix PRs were specifically identified for the newly filed bugs.

- **High Priority (P1):**
    - **[Issue #10194](https://github.com/zeroclaw-labs/zeroclaw/issues/10194) - PR reviewer publishes in-flight results after the PR merges:** A CI tooling bug where the AI reviewer posts results on a PR after it has been merged, which could lead to confusion. This was closed.
- **Medium Priority (P2):**
    - **[Issue #10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) - Interactive agent session caps context at 32,000 tokens:** A runtime bug where the agent session ignores the configured `max_context_tokens` (131072) and caps at 32k, degrading performance. Status is in-progress.
    - **[Issue #10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) - SECURITY.md documents a removed CI job:** A documentation and CI inconsistency where `SECURITY.md` references a Docker check job that was removed in April.
    - **[Issue #10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) - Exact proxy selectors reject supported transcription services:** A configuration bug where the proxy routing for transcription services (e.g., `transcription.groq`) is too strict and rejects the supported services.
- **Low Priority (P3):**
    - **[Issue #10103](https://github.com/zeroclaw-labs/zeroclaw/issues/10103) - ZeroCode Health status values misalign in French and Spanish:** A localization UI bug in the TUI where labels are too long for the fixed padding.
- **Resolved/Closed:**
    - **[Issue #10111](https://github.com/zeroclaw-labs/zeroclaw/issues/10111) - Windows: Entry Point Not Found:** A support issue for the desktop app that was closed as a duplicate.
    - **[Issue #9016](https://github.com/zeroclaw-labs/zeroclaw/issues/9016) - OpenAI tool turns fail when Chat Completions rejects reasoning effort:** This bug was closed, presumably resolved.

## 6. Feature Requests & Roadmap Signals

There is a clear roadmap signal toward a more modular, secure, and portable system.

- **"Everything is a Plugin":** The combination of RFCs like [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) and trackers like [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) strongly suggests the next major release will focus on a comprehensive WASM plugin architecture, moving optional channels and tools to runtime plugins.
- **Enhanced Security & Control:** The high level of activity around shell command policies ([#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)), sandboxing ([#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)), and plugin permissions ([#8398](https://github.com/zeroclaw-labs/zeroclaw/issues/8398) and [#9582](https://github.com/zeroclaw-labs/zeroclaw/pull/9582)) points to a future version with granular security controls. This is a key selling point for enterprise or power users.
- **Agent Portability:** The new RFC on [Agent Portability](https://github.com/zeroclaw-labs/zeroclaw/issues/10069) is a strong candidate for a future feature, allowing users to export and share agents between deployments.
- **Better Defaults:** Issues like [#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168) (enabling the stall watchdog) and [#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166) (enabling streaming by default) suggest an upcoming focus on usability and improving the out-of-the-box experience.

## 7. User Feedback Summary

- **Pain Point - Complexity of Security & Configuration:** The numerous RFCs on shell policy, sandboxing, and plugin permissions indicate that users and maintainers find the current state of security and configuration complex and in need of a more coherent model. There's a clear desire for easier, more granular control.
- **Pain Point - Missing Defaults:** There are bugs and feature requests specifically about turning on helpful defaults, like streaming responses and the stall watchdog. This suggests users are hitting silent performance issues or hangs because these features are off by default.
- **Pain Point - Hardware Support:** Requests like Hailo-Ollama support ([#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)) and MariaDB backend ([#4668](https://github.com/zeroclaw-labs/zeroclaw/issues/4668)) highlight a demand for supporting diverse hardware and existing infrastructure, not just the most common cloud-native stacks.
- **Positive Signal - Community Engagement:** The high number of contributions labeled as `distinguished contributor` or `principal contributor` and the thoughtful, multi-revision RFC process show a healthy and engaged community.

## 8. Backlog Watch

Several important long-running issues and PRs are awaiting decisions or action.

- **RFCs Awaiting Maintainer Review:** Many high-priority architectural RFCs are tagged `needs-maintainer-review`. These include the foundational runtime session model ([#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)), the plugin permission model ([#8398](https://github.com/zeroclaw-labs/zeroclaw/issues/8398)), and the swarm feature ([#10025](https://github.com/zeroclaw-labs/zeroclaw/issues/10025)). The maintainer decision queue tracker ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) exists for this, but decisions on these are lagging.
- **Long-Standing Feature Requests:** The request for [MariaDB memory support](https://github.com/zeroclaw-labs/zeroclaw/issues/4668) has been open since March and is still `status:accepted` but not `in-progress`.
- **Blocked/Stacked PRs:** The major PRs for the plugin egress policy ([#9582](https://github.com/zeroclaw-labs/zeroclaw/pull/9582) and [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)) are open but one is marked as `needs-author-action`. Similarly, the fix for Anthropic response classification ([#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)) is `needs-author-action`, and it is blocking the OpenAI-compatible fix ([#9999](https://github.com/zeroclaw-labs/zeroclaw/pull/9999)). The progress on these critical security/correctness fixes is stalled on the authors.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*