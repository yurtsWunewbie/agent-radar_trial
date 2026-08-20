# OpenClaw Ecosystem Digest 2026-08-20

> Issues: 500 | PRs: 500 | Projects covered: 13 | Generated: 2026-08-20 01:09 UTC

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

Based on the GitHub data provided for OpenClaw (github.com/openclaw/openclaw) on 2026-08-20, here is the project digest:

---

## OpenClaw Project Digest: 2026-08-20

### 1. Today's Overview
OpenClaw is in a period of intense maintenance and stabilization, evidenced by a very high velocity of activity: 500 issues and 500 PRs were updated in the last 24 hours, though the vast majority remain open (466 and 422, respectively). This suggests a large community actively reporting bugs and submitting fixes, with maintainers working through a substantial queue. The backlog is dominated by a high number of P0/P1 issues tagged with `clawsweeper:needs-maintainer-review` and `needs-product-decision`, indicating a bottleneck in triage and strategic planning. There are no new releases today, and the project is operating without a published stable version, relying on beta channels. The sheer number of open, high-severity issues points to a critical need for a stabilization release to address widespread regressions and data-loss concerns.

### 2. Releases
No new releases were published today. The most recent release-validation issue, `#125626 [Release validation: v2026.8.1-beta.2]`, is still open, suggesting the team is actively testing the next beta candidate but has not finalized it.

### 3. Project Progress
This section is inferred from the 78 merged/closed PRs today, though specific PR titles were not in the top-30 by comments. Key fixes were merged or closed, indicating progress on several fronts:
- **Security & Policy:** PR `#116489 (feat(security): require acknowledgement for install policy warnings)` was closed, and `#120900 (feat(ui): review install policy warnings)` was also closed, suggesting security-hardening features are landing.
- **Platform Stability:** PR `#126250 (fix(discord): route polls through canonical delivery)` was closed, addressing message-delivery inconsistencies for Discord.
- **Configuration & Performance:** PR `#126421 (fix(compaction): default maintenance reasoning to low)` was closed, addressing performance issues with silent compaction tasks.
- **Performance:** `#123535 (fix(ui): avoid session catalog refresh storms)` is ready for review, indicating work on UI efficiency.

### 4. Community Hot Topics
The most active discussions highlight the community's biggest frustrations and most complex problems:
- **Silent Agent Failures (Issue #44925 - Diamond Lobster):** The top issue, with 26 comments, describes subagent completions being silently lost on timeouts or errors. Users need reliable orchestration with retries and notifications, not silent failures.
- **Agent Behavior Monitoring (Issue #77598):** A maintainer-led issue with 22 comments tracks the live behavior of a dev agent, showing a deep community interest in observability and transparency of the agent's decision-making process.
- **Critical Regressions (Issues #108435, #38327):** Two high-severity regressions (gateway startup failure and a Google Vertex error) have 14 comments each, showing user frustration with breakages that stop core functionality.
- **Data Loss (Issue #40001):** The `write` tool's lack of append mode causing data loss in shared files has 14 comments, highlighting a design flaw that can destroy user data.

### 5. Bugs & Stability
The project is facing a significant stability crisis, with numerous P0 and P1 regressions and data-loss issues.
- **P0 Regressions & Corruption:**
    - `#108435 [P0]`: Gateway fails to start after a 2026.7.1 update (crash-loop, release blocker).
    - `#119270 [P0]`: File tools strip leading `@` from paths, causing writes to wrong files (data loss).
    - `#117742 [P0]`: Failed multi-file `apply_patch` leaves earlier deletions committed (data loss).
    - `#123327 [P0]`: SQLite database corruption on ext4 due to WAL checkpoint copying.
- **P1 Regressions & Data Loss:**
    - `#44925 [P1]`: Subagent completions silently lost.
    - `#40001 [P1]`: Write tool overwrites files in isolated cron sessions.
    - `#119796 [P1]`: Windows EBUSY lock on agent state DB.
    - `#125679 [P1]`: Matrix channel infinite restart loop (regression, bisected).
    - `#114211 [P1]`: Matrix room agents looping and replaying stale state.
- **Trends:** Many P1 issues are associated with `clawsweeper:no-new-fix-pr` and `needs-maintainer-review` tags, meaning they are known and reproduced but awaiting a decision or fix. The presence of multiple long-standing P0 data-corruption issues indicates that data integrity is the weakest point of the current release.

### 6. Feature Requests & Roadmap Signals
While bug fixes dominate, several feature requests point to future roadmap items:
- **Reliability Features:** Issues like `#6625 (Graceful sub-agent timeout)` and `#44925 (silent subagent failure)` signal a push for more robust agent orchestration with better error handling and user visibility.
- **Model/Provider Flexibility:** `#56781 (fallback model chain for compaction)` and `#9016 (expose OpenRouter usage cost)` suggest a desire for more resilient and cost-transparent AI integrations.
- **Architecture Enhancements:** `#60572 (Multi-Slot Memory Architecture)` and `#116470 (Runtime agent registry)` are significant architectural asks that, if implemented, would be major features in a future release.
- **UX Improvements:** `#16670 (Mandatory Memory/Embedding setup in onboarding)` and `#42276 (Reasoning stream)` are user-facing improvements that would lower the barrier to entry and improve the interactive experience.

### 7. User Feedback Summary
- **Frustration with Silent Failures:** A dominant theme is the silent loss of work and sessions. Users report that errors are not surfaced, notifications are missing, and there is no recovery mechanism, leading to a sense of untrustworthiness.
- **Pain with Regressions:** Many comments are on regression reports, indicating user frustration that updates break previously working features (e.g., Matrix restart loop, gateway startup failure).
- **Demand for Observability:** The interest in tracking agent behavior (#77598) and the need for cost tracking (#9016) show that users want more insight into what the agent is doing and why.
- **Data Safety Concerns:** The multiple P0 issues around file corruption, overwrites, and incorrect deletions are the most critical pain points. Users are reporting actual data loss, which is the highest form of dissatisfaction.

### 8. Backlog Watch
Several issues have been open for months and are flagged as needing maintainer review or product decisions, but with no new fix PRs.
- **`#70903 [P0, stale]`:** Persistent provider cooldown blocks users for hours after billing recovery. This has been open since April and is a severe UX and availability problem, yet it is marked `stale`.
- **`#16670 [P2]`:** Onboarding Wizard should include Memory/Embedding setup (open since Feb). This is a key onboarding friction point that is often requested but not prioritized.
- **`#60572 [P3]`:** Multi-Slot Memory Architecture (open since April). A major architectural feature that has attracted discussion but remains in the backlog.
- **`#9016 [P2]`:** Expose OpenRouter usage cost (open since Feb). A simple, high-value feature that is still waiting for a decision.
- **`#38327 [P1]`:** Google Vertex regression from March. This is a long-standing regression, and its persistence in the backlog suggests it may be difficult to fix with the current provider architecture.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Personal AI Assistant Open-Source Ecosystem
**Date: 2026-08-20**

---

## 1. Ecosystem Overview

The personal AI assistant open-source ecosystem is experiencing a **hyper-growth phase characterized by intense stabilization efforts** rather than greenfield feature development. Projects like OpenClaw, Hermes Agent, and ZeroClaw are processing 100+ issues/PRs daily, with OpenClaw alone seeing 500 issues and 500 PRs updated in 24 hours—indicating massive community adoption meeting mature project complexity. The dominant theme across all active projects is **reliability and data integrity**: silent agent failures, data-loss bugs, and Windows-specific stability issues are the most complained-about problems. Meanwhile, architectural maturation is evident in the proliferation of RFCs around session ownership, multi-agent isolation, and plugin ecosystems (ZeroClaw, IronClaw, NanoClaw), suggesting the ecosystem is transitioning from "demo-ready" to "production-grade" tooling. The landscape splits between heavyweight generalists (OpenClaw, Hermes), specialized assistants (NanoBot, IronClaw), and channel-focused implementations (PicoClaw, CoPaw), with notable gaps in consistent Windows support and long-running task reliability across nearly all projects.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | PRs Merged/Closed (24h) | Release Status | Health Score* |
|---------|----------------------|-------------------|--------------------------|----------------|---------------|
| **OpenClaw** | 500 | 500 | 78 | No new release; beta validation in progress | **2/10** — Critical backlog, P0 data-loss issues, triage bottleneck |
| **Hermes Agent** | ~100 | ~100 | 5 | v0.20.0 stable | **5/10** — Active fixes, but critical Windows bugs (BSOD) unresolved |
| **NanoBot** | ~10 | 23 | 8 | No new release | **7/10** — Healthy fix cycle, responsive maintainers |
| **PicoClaw** | 1 | 5 | 2 | No new release | **7/10** — Stable, low issue volume, stale PRs need attention |
| **NanoClaw** | 3 | 34 | 25 | No new release | **7/10** — High momentum, bugs have matching fix PRs |
| **NullClaw** | 0 | 1 | 0 | No new release | **8/10** — Quiet, stable, minor maintenance only |
| **IronClaw** | ~30 | ~23 | 18 | v1.3.0 promoted to stable (2026-08-19) | **7/10** — Active refactoring, CI stabilized |
| **LobsterAI** | 6 | 8 | 8 | No new release | **4/10** — All 6 issues stale (4+ months), critical bugs unanswered |
| **TinyClaw** | 0 | 0 | 0 | No activity | **N/A** — Dormant |
| **Moltis** | 3 | 9 | 4 | 20260818.10 released (2026-08-18) | **8/10** — Good bug-fix cycle, responsive, security work active |
| **CoPaw** | 50 | 46 | 16 | QwenPaw Desktop 2.1.0 | **5/10** — High activity, data-loss issue closed without acknowledge |
| **ZeroClaw** | 43 | 50 | 2 | v0.8.4 | **6/10** — Architecturally ambitious, Windows debt, large PR queue |
| **ZeptoClaw** | 0 | 0 | 0 | No activity | **N/A** — Dormant |

*\*Health Score: Composite of issue responsiveness, bug severity, fix pipeline velocity, and community satisfaction signals. 1 = critical risk, 10 = excellent.*

---

## 3. OpenClaw's Position

**Advantages vs. Peers:**
- **Community scale**: OpenClaw's 500/500 issue/PR daily activity dwarfs all competitors—the next closest (ZeroClaw at 43/50, CoPaw at 50/46) represent roughly 10% of OpenClaw's volume. This is the reference implementation of the ecosystem, with the largest contributor base.
- **Issue velocity as adoption signal**: The sheer volume of bugs reported (many P0) indicates extreme real-world usage. Competitors simply don't have this many users hitting edge cases.
- **Ecosystem gravity**: With 78 PRs merged/closed in a day, OpenClaw has the fastest fix pipeline. The active security policy work (install warnings, policy acknowledgments) shows mature governance.

**Technical Approach Differences:**
- OpenClaw uses a **beta-channel model** with no stable release, unlike IronClaw (v1.3.0 stable) or Hermes (v0.20.0). This trades stability for feature velocity.
- Its architecture is **monolithic core with channel adapters** (Discord, Matrix, Telegram), similar to ZeroClaw's approach, but with a much larger integration surface. PicoClaw and NanoClaw target more specific niches.
- OpenClaw treats the **"claw" pattern** (all channels aggregated into one agent) as the design center; Hermes differentiates with a desktop app + headless gateway split.

**Community Size Comparison:**
- OpenClaw: Massive — 500+ daily issues/PRs, 1000 total items updated.
- Hermes: Large — 100+ daily updates, but 9x smaller than OpenClaw.
- ZeroClaw: Medium — ~50 daily updates.
- Moltis/PicoClaw/NanoBot: Small but active — 5-23 PRs daily.
- NullClaw/TinyClaw/ZeptoClaw: Dormant/minimal.

**Key Risk**: OpenClaw's greatest weakness is also its greatest strength—the scale of community engagement creates a triage bottleneck (466 open issues, 422 open PRs) and the accumulation of P0 data-loss bugs (#108435, #119270, #117742, #123327) without a stable release to anchor user trust.

---

## 4. Shared Technical Focus Areas

| Focus Area | Projects (with specific needs) |
|------------|--------------------------------|
| **Agent Reliability & Error Handling** | **OpenClaw** (silent subagent failures #44925, graceful timeouts); **NanoBot** (background task stale saves, memory cursor stuck); **LobsterAI** (silent no-op after prompt #1569, identical responses #1566); **Hermes** (Bot Mode hangs, timeout issues); **IronClaw** ("got confused" total failure #7748) |
| **Data Integrity & Loss Prevention** | **OpenClaw** (file path stripping, multi-file patch atomicity, SQLite corruption); **CoPaw** (workspace deletion #2884, missing rollback #2590); **NanoBot** (stale session overwrites, memory duplication); **Hermes** (config.yaml corruption from dotted keys #84064) |
| **Windows Support & Stability** | **Hermes** (BSOD via svchost kill #89614, app silent deletion #83846, update destroys install #83529); **ZeroClaw** (74 Windows test failures #7462, installer crash #9290); **OpenClaw** (Windows EBUSY lock #119796); **CoPaw** (antivirus process termination #6847) |
| **Session & Context Management** | **ZeroClaw** (RFC: runtime-owned sessions #9487, session usability #10141); **OpenClaw** (RFC: multi-slot memory #60572); **CoPaw** (task state loss on channel switch #2723); **PicoClaw** (routed agent context loss #3316) |
| **Model Flexibility & Fallback Chains** | **OpenClaw** (fallback model for compaction #56781); **PicoClaw** (configurable fallback chain #3200); **CoPaw** (model ladder #2301, rate-limit fallback #2089); **Hermes** (fallback chain validation #63852) |
| **Agent Observability & Transparency** | **OpenClaw** (agent behavior tracking #77598, reasoning stream #42276); **NanoBot** (turn observability PR #5420); **CoPaw** (approval UX clarity #2845); **Hermes** (false-positive warnings #90299) |
| **Security Hardening** | **Moltis** (CWE-306 vault auth bypass); **ZeroClaw** (credential logging #9976, fail-closed WhatsApp #9397); **NanoClaw** (fail-closed sign-in verification); **OpenClaw** (install policy acknowledgments) |
| **Self-Hosted Multi-User & Enterprise** | **CoPaw** (QwenPaw Hub #7112); **ZeroClaw** (lighter core RFC #6165); **IronClaw** (persistent per-user sandbox #7732); **NanoClaw** (agent mailbox registry #3349) |

---

## 5. Differentiation Analysis

| Project | Core Differentiator | Target Users | Architecture |
|---------|---------------------|--------------|--------------|
| **OpenClaw** | The "everything agent"—largest channel coverage, most integrations | Power users, self-hosters, multi-channel operations | Monolithic core + channel adapters, beta-channel releases |
| **Hermes Agent** | Desktop-first with headless gateway; **strong macOS/Windows focus** | Desktop-centric users, workflows needing local GUI | Electron desktop + Python backend, gateway separation |
| **NanoBot** | Lightweight, memory-centric agent with WebUI | Developers and individual users wanting a clean, small-footprint assistant | Compact core, conversation-based memory, Docker-friendly |
| **PicoClaw** | Channel-specialized (Telegram-first), agent routing | Telegram-centric users, community bots | Lightweight core, routed agents, interactive chat UX |
| **NanoClaw** | **Setup/install robustness, Slack enterprise workflows** | Enterprise Slack users, fresh-install environments | Node-based, provisioning-focused, feature-flag installs |
| **IronClaw** | **AI-first design system, container-based sandboxing** | Devs wanting embedded AI in apps, sandbox-heavy workflows | Rust core (per PR activity), container-per-command (moving to persistent) |
| **LobsterAI** | Chinese-market (钉钉/飞书), **IM-first with slash commands** | Chinese-speaking users, IM-centric workflows | Multi-IM channel adapters, installer-heavy, scheduled tasks |
| **CoPaw** | **Deep model integration (Qwen), long-running batch automation** | Chinese-speaking desktop users, heavy batch processing | Desktop app (Electron-like), sandboxed agents, multi-agent collaboration |
| **ZeroClaw** | **Rust-based, WASM plugin architecture, RFC-driven governance** | Security-conscious users, enterprise multi-tenant | Rust core, WASM plugins, strict security posture |
| **Moltis** | **Apple Container backend, WhatsApp/enterprise chat focus** | Apple ecosystem users, vault/security-focused | Apple Container sandboxing, vault encryption, model-aware routing |
| **NullClaw / TinyClaw / ZeptoClaw** | Minimal, almost dormant | Niche/experimental | Not significantly maintained |

---

## 6. Community Momentum & Maturity

### Tier 1: Hypergrowth / Scaling Under Load
- **OpenClaw** — Rapidly iterating but struggling to keep up with its own scale. 78 PRs merged daily yet the open queue grows. **Risk of stabilization crisis.**
- **ZeroClaw** — High architectural ambition with strong governance (RFCs, risk labels, trackers). Fast-moving but with a large open PR queue and Windows debt. **Expansion phase.**
- **Hermes Agent** — High-intensity stabilization with active fix cycles (Bot Mode triple-fix today). **Hardening phase while scaling.**

### Tier 2: Healthy Sustained Growth
- **IronClaw** — Executing a major refactor while shipping stable v1.3.0. CI stabilization suggests mature process. **Consolidation + feature expansion.**
- **CoPaw** — Merging 16 PRs/day with a large Chinese-speaking community. **Steady growth with reliability concerns.**
- **NanoBot** — Healthy fix cycles, responsive maintainers, growing feature set with observability focus. **Stabilizing then expanding.**
- **NanoClaw** — Core-team-driven feature expansion (Slack architecture) with community bug reports receiving quick fixes. **Feature-forward with solid response.**

### Tier 3: Mature / Stabilizing
- **PicoClaw** — Low churn, no new bugs, consolidating existing features (Telegram UX). **Plateauing.**
- **Moltis** — Small but healthy: 9 PRs daily, all bugs closed with fixes, recent release. **Mature and responsive.**

### Tier 4: Stagnant / At Risk
- **LobsterAI** — 8 PRs merged but **all 6 open issues stale (4+ months) with no maintainer responses** on critical bugs. **Declining community trust.**
- **NullClaw / TinyClaw / ZeptoClaw** — Effectively dormant.

---

## 7. Trend Signals

**1. From "Demo" to "Production": Reliability is the #1 Gap**
Across OpenClaw, Hermes, LobsterAI, and CoPaw, the most common complaint is **silent failures**: agents don't error, they just stop. Users demand retries, notifications, and recovery mechanisms. For agent developers, this signals a market opportunity: **observability and self-healing agent runtimes** are the next competitive differentiator.

**2. Windows Support is the Ecosystem's Collective Achilles Heel**
No fewer than 6 projects report Windows-specific blockers (BSOD in Hermes, 74 test failures in ZeroClaw, EBUSY locks in OpenClaw, antivirus conflicts in CoPaw). The ecosystem is disproportionately macOS/Linux-first. Agent developers targeting Windows, or building cross-platform abstraction layers, are addressing a genuine void.

**3. Data Integrity Fear is Eroding Trust**
With OpenClaw's P0 file-corruption bugs, CoPaw's workspace deletion, and NanoBot's session overwrites, **data loss is the single most damaging class of bug** for user adoption. The next wave of meaningful features will be: rollback, file-operations transactions, append-mode writes, and safe multi-file patch semantics. This is a specific—and currently underserved—technical niche.

**4. Session Ownership & Continuity is the Architectural Battleground**
ZeroClaw's RFC (#9487), OpenClaw's multi-slot memory (#60572), and CoPaw's task-loss-on-channel-switch (#2723) all point to the same need: **agents must maintain durable, addressable state across conversations, channels, and time.** The projects that ship clean session abstraction first will define the API contracts the rest of the ecosystem follows.

**5. Model Fallback Chains Move from "Nice-to-Have" to "Table Stakes"**
Five projects (OpenClaw, CoPaw, PicoClaw, Hermes, IronClaw) have open work on fallback models, rate-limit resilience, and model "ladders." As AI costs fluctuate and providers fail, **automatic failover to alternative providers without user intervention** is emerging as a must-have for serious agent deployments.

**6. A Split Emerges: Channel-Centric vs. Desktop-Centric**
NanoClaw, PicoClaw, and LobsterAI are doubling down on specific channels (Slack, Telegram, 钉钉/飞书), while Hermes and CoPaw invest in desktop GUIs. **The channel-centric approach appears more aligned with headless/enterprise/automation use cases**, while desktop-centric projects cater to individual power users. OpenClaw sits neutral in the middle, which is both its strength (broad appeal) and its challenge (lacking a killer UX hook).

**7. Agent Security is Moving from "Written In The Docs" to "Enforced In Code"**
Moltis (CWE-306 fix), ZeroClaw (credential logging, fail-closed permissions), and NanoClaw (fail-closed sign-in) represent a shift toward **secure-by-default agent configuration**. This will be mandatory for enterprise adoption; expecting agent developers to follow security best practices without enforced defaults is proving insufficient.

**8. The "Write-Back" Problem is Unsolved**
Every project struggles with agents writing to shared files (OpenClaw's append-mode gap, CoPaw's rollback absence, IronClaw's sandboxing approach). **The ability to persist agent outputs safely, transactionally, and with conflict resolution** is a foundational capability with no clear leader. This is the highest-value unsolved problem for AI agent infrastructure in the current ecosystem.

---

*Report generated 2026-08-20. All data sourced from public GitHub activity for the listed projects.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

Based on the provided GitHub data for NanoBot (HKUDS/nanobot) on 2026-08-20, here is the project digest:

---

# NanoBot Project Digest — 2026-08-20

## 1. Today's Overview
NanoBot is in a highly active development and maintenance phase, evidenced by 23 pull requests (PRs) updated in the last 24 hours. The development focus is clearly on hardening the agent core, memory management, and infrastructure stability. Key areas of work include fixing agent session lifecycle issues, memory token consolidation, and Docker/OAuth integration problems. The community is also actively proposing new features, such as a paid MCP security scanner integration and a core timer tool. While no new releases were cut today, the high volume of activity suggests a significant release may be imminent.

## 2. Releases
No new releases were published in the last 24 hours (as of 2026-08-20).

## 3. Project Progress
Eight PRs were closed/merged today. Notable progress includes:

- **WebUI/UX Improvements:** PR #5438 closed, fixing Ctrl-C handling in the WebUI gateway to ensure prompt shutdown. PR #4527 (ask_clarification tool) was also closed, adding a new built-in tool for agent clarification.
- **Memory & Performance:** PR #5440 was closed, optimizing local compaction by reusing conversation prefixes.
- **Accessibility & Compatibility:** PR #5443 closed, exposing the `/exit` command in the TUI menu. PR #5341 closed, making the weather skill Windows-safe by fixing the `curl` alias issue in PowerShell.
- **Settings/File Management:** PR #4282 (feat: add file management features to the settings view) was closed, enabling users to browse and modify generated files directly from the UI.

## 4. Community Hot Topics
The most active discussions and PRs indicate a strong focus on agent reliability and observability:

- **PR #5420 [OPEN] feat(webui): add turn observability and safe recovery** (Re-bin): This high-comment PR aims to improve the WebUI by projecting each user turn into a single answer surface while retaining all intermediate activity (reasoning, tool usage). It also addresses safe recovery from interrupted work, suggesting a user desire for better transparency and control over long-running tasks.
- **Issue #5425 [OPEN] [bug] Support legacy socks:// proxy URLs** (pxy0592): This is the only issue with comments today. It highlights a real-world integration problem where a common non-standard proxy scheme (`socks://`) fails, indicating a need for broader protocol compatibility.
- **Issue #5447 [OPEN] Paid security-scan MCP integration** (Misterio070): This feature proposal suggests integrating a Solana x402 micropayment-based security scanner. This signals community interest in monetizing agent capabilities and expanding the ecosystem with paid, specialized MCP services.

## 5. Bugs & Stability
Several bugs were reported today, and most have corresponding fix PRs already submitted, showing a healthy response cycle.

- **Priority P1 (High):**
    - **OAuth Login Failure in Docker (Issue #5444):** Users are unable to log in to OpenAI via OAuth when running in Docker due to path permission issues. Fix PRs #5446 and #5445 are open, aiming to route OAuth token storage through NanoBot's managed data directory for persistence and correct permissions.
- **Priority P2 (Medium):**
    - **Legacy `socks://` Proxy Support (Issue #5425):** Failures occur when proxy URLs use the non-standard `socks://` alias. Fix PR #5439 is open to support only the standard `socks5://` scheme, which may be an acceptable resolution.
    - **Memory File Cursor Stuck (Issue #5441):** A recovered tool error blocks the memory cursor, causing valid edits to be reprocessed and duplicated. A fix PR #5442 is open to advance the cursor on recovered errors.
- **Agent Background Task Issues:**
    - **PR #5271 [priority: p0]** addresses a critical bug where stale background task saves overwrite session data after a `/new` command, preventing data loss.
    - **PR #5430 & #5431** are open to fix related agent task management issues: releasing completed task groups and reporting background task failures.

## 6. Feature Requests & Roadmap Signals
- **Agent Interruptibility & Recovery (PR #5420):** The community wants turn-level observability and the ability to safely recover from interrupted work. This is a strong signal for a more robust and debuggable agent runtime.
- **`nano_timer` Core Tool (PR #4853):** A long-pending PR (since July 8) proposes a core tool for time management, indicating a desire for standard, time-aware agent capabilities. The PR is marked as `conflict`, requiring maintainer attention.
- **Paid Security-Scan MCP (Issue #5447):** The proposal for a paid MCP service suggests a requirement for monetization and integration with external payment systems, potentially a niche but valuable direction.
- **File Management in Settings (PR #4282):** Merged today, this addresses a common usability pain point by allowing users to manage agent-generated files without SSH access to the host.

## 7. User Feedback Summary
Today's feedback highlights a mix of pain points and feature desires:

- **Infrastructure Pain Points:** Users are frustrated by operational issues, specifically Docker environment failures (OAuth login) and configuration incompatibilities (legacy proxy URLs). The rapid submission of fix PRs indicates the maintainers are responsive to these issues.
- **Agent Reliability:** The bugs around session data loss (PR #5271) and memory cursor duplication (Issue #5441) show high sensitivity to data integrity and agent trust.
- **Desire for Agent Observability:** The request for turn observability in the WebUI (PR #5420) is a positive signal, showing users want to understand how the agent arrives at its conclusions.
- **Ecosystem Expansion:** The proposal for a paid security scanner (Issue #5447) indicates users are exploring new, commercial applications for NanoBot.

## 8. Backlog Watch
The following PRs are long-running and may need maintainer attention to either merge or close:

- **PR #4853 (feat: add nano_timer core tool) [Open since 2026-07-08]:** This feature has been open for over a month and is marked as having a `conflict`. It needs review to resolve the conflict or clarify its future.
- **PR #5271 (fix: prevent stale background task saves) [priority: p0, Open since 2026-08-06]:** Despite being critical for preventing session data overwrites, this PR remains open.
- **PR #5403 (fix: use API-reported prompt tokens) [priority: p1, Open since 2026-08-16]:** This fix addresses a significant issue where token consolidation may never trigger, but it has a `conflict` that needs resolution.
- **PR #5405 (feat: support manual-only invocation) [Open since 2026-08-16]:** This feature request is a step towards safety for side-effect-heavy tasks but remains in review with a noted `conflict`.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-20

## 1. Today's Overview

Hermes Agent is in a period of **high-intensity stabilization**, with 100 issues and PRs updated in the last 24 hours. The project is at **v0.20.0** with no new releases today, indicating that engineering effort is concentrated on bug fixing and hardening rather than feature rollouts. The **most critical signal is a cluster of severe Windows-specific stability bugs**, including a reported blue-screen issue (#89614) and a catastrophic update routine that can delete the desktop app (#83846). The **Bot Mode feature is in active repair**, with three separate merged PRs addressing different failure modes in the same `host.openSession` function (#90405, #90203, #89638, #89832). The issue tracker shows a healthy balance of 41 open/active vs. 9 closed items, and maintainers are actively triaging newly filed bugs, though a few long-standing PRs (#39429, #56633) remain open for over two months.

## 2. Releases

**No new releases today.** The project remains on **v0.20.0 (2026.8.3)** as referenced in bug reports. The next release should be highly anticipated given the substantial backlog of fixes queued in master.

## 3. Project Progress

**5 PRs were merged or closed today** — all bug fixes with no new feature merges. Key accomplishments:

- **Bot Chat stability (3 PRs merged as a coordinated fix):**
  - [#90405 — fix(desktop): opening a Bot Chat wakes reliably instead of hanging, stranding, or emptying Sessions](https://github.com/NousResearch/hermes-agent/pull/90405). Note: this PR intentionally combined three conflicting fixes into one landing to resolve a merge-threat situation.
  - [#90203 — fix(desktop): keep Sessions workspace when opening a Bot Chat](https://github.com/NousResearch/hermes-agent/pull/90203). Prevents the Sessions sidebar from being scoped to the bot profile.
  - [#89638 — fix(desktop): retry a hydration timeout once when opening a Bot chat](https://github.com/NousResearch/hermes-agent/pull/89638). Fixes a race condition when the profile backend is still waking up.
  - [#89832 — fix(desktop): bound the profile-activation half of a Bot Chat wake](https://github.com/NousResearch/hermes-agent/pull/89832). Adds a deadline to an unbounded profile-switch await.

- **Activity in related PRs (still open):**
  - [#90398 — fix(desktop): keep Bot Mode group chats in one workspace](https://github.com/NousResearch/hermes-agent/pull/90398) — prevents group chats rendering in both panes.
  - [#90033 — fix(kanban): respawn active_pr only after a real run](https://github.com/NousResearch/hermes-agent/pull/90033) — marked **"Do not merge"** for incident investigation.

## 4. Community Hot Topics

**Blockers for Windows Update Reliability (2 Issues, highest attention)**

- [#83846 — ZIP fallback deletes the built desktop app and never rebuilds it](https://github.com/NousResearch/hermes-agent/issues/83846) has **12 comments and 1 👍**. The user details a silently disappearing desktop app on Windows, where shortcuts remain but the executable is deleted. A strong candidate for matching the highest 🎯 reaction count in the dataset.
- [#89614 — Hermes kills svchost.exe via stale-PID taskkill → repeated blue screens](https://github.com/NousResearch/hermes-agent/issues/89614) — **5 comments in its first day**. This is a jaw-dropping severity: a stale-PID `taskkill /F /PID` targeting a recycled svchost.exe PID causes 0xEF CRITICAL_PROCESS_DIED BSODs. Filed yesterday; no fix PR yet.

**Bot Mode Group Chat Usability (Meta-issue)**

- [#89995 — Expose Bot Mode group chat rooms in web dashboard & gateway](https://github.com/NousResearch/hermes-agent/issues/89995) — **4 comments, needs-decision**. The community is pointing out a major feature gap: group chats are desktop-only, while the web/gateway only shows 1:1. Expect this to be a roadmap candidate.

**False-Positive Warning (High-Churn User Frustration)**

- [#90299 — False-positive "TERMINAL_CWD found in .env" deprecation warning on every startup](https://github.com/NousResearch/hermes-agent/issues/90299) — **3 comments in one day**. The root cause is pinpointed in the issue (`warn_deprecated_cwd_env_vars()` reads from a different path than the user's env), making this a quick fix candidate.

## 5. Bugs & Stability

### Critical / High Severity

1. **[CRITICAL] [#89614 — Windows: kills svchost.exe → repeated blue screens](https://github.com/NousResearch/hermes-agent/issues/89614)** (P1, Windows)
   - **Impact:** Blue-screen crashes. Stale-PID `taskkill /F` hits a recycled system PID. **No fix PR exists yet** — this should be the top priority.

2. **[HIGH] [#83846 — ZIP fallback deletes the built desktop app](https://github.com/NousResearch/hermes-agent/issues/83846)** (P1, Windows)
   - **Impact:** Desktop app silently disappears; subsequent updates say "Already up to date." No fix PR identified yet.

3. **[HIGH] [#83529 — `hermes update` destroys hermes](https://github.com/NousResearch/hermes-agent/issues/83529)** (P1, Debian)
   - **Impact:** Update routine fails catastrophically on Debian Trixie. No fix PR identified yet.

### Medium Severity (P2)

4. **[#90159 — `hermes update` installs mcp 2.0.0 over the declared mcp==1.28.1 pin](https://github.com/NousResearch/hermes-agent/issues/90159)** — silently breaks every HTTP/SSE MCP server while gateway reports healthy. This is a dependency-pinning failure; a fix PR exists (#90400).

5. **[#84064 — `hermes config set/unset` breaks on provider keys containing a literal dot](https://github.com/NousResearch/hermes-agent/issues/84064)** — silent corruption of `config.yaml`. No fix PR yet.

6. **[#90365 — Desktop model settings can't confirm data-training tiers](https://github.com/NousResearch/hermes-agent/issues/90365)** — warning modal shows but the confirm button is missing, making the user stuck.

7. **[#85605 — Desktop Electron fails to connect to `hermes serve` headless backend](https://github.com/NousResearch/hermes-agent/issues/85605)** — 404 on session token handshake.

### Low Severity / Newly Reported

8. **[#90211 — Remote-primary Desktop still starts a loopback agent](https://github.com/NousResearch/hermes-agent/issues/90316)** — marked invalid, but shows confusion in usage.
9. **Many "needs-repro" issues:** #90229 (file tree stuck), #89497 (bots hang in rooms), #90134 (blockmap.js build fail).

### Bugs with Active Fix PRs

- **#90299** (false-positive deprecated warning) — no PR yet but root cause identified.
- **#90159** (mcp 2.0.0 pin breakage) — PR #90400.
- **#89823** (Bot Mode create picker) — was fixed and closed today.

## 6. Feature Requests & Roadmap Signals

- **Web Dashboard Group Chats** — The most actionable new signal. The community is asking for parity with the desktop-only Bot Mode rooms ([#89995](https://github.com/NousResearch/hermes-agent/issues/89995)). Predict this enters the `hermes-web` or `comp/gateway` backlog for an incremental release.

- **Low-Memory Windows Execution Profile** — [#90007](https://github.com/NousResearch/hermes-agent/issues/90007) requests a single operator-facing profile that coordinates context size, local providers, and fallbacks for constrained machines. With the current Windows stability problems, this could be merged into the stabilization effort.

- **Resolved Connection Mode Exposure** — [#82140](https://github.com/NousResearch/hermes-agent/issues/82140) was **closed today** (presumably implemented), meaning skills and MCP will now see the local/remote connection mode. This is a quiet but notable addition to the extension API.

- **Native Fallback-Chain Readiness** — [#63852](https://github.com/NousResearch/hermes-agent/issues/63852) is a long-standing request (since July 13) to validate fallback models without starting a full agent session. Slow progress — likely waiting on the architecture proposal #90144.

## 7. User Feedback Summary

**Pain Points:**

- **Windows update/install instability is the #1 theme.** Users describe catastrophic failures ("destroys hermes" — #83529, "repeated blue screens" — #89614, "app disappears" — #83846). These are destructive and block trust in automatic updates.
- **Configuration corruption:** literal dots in provider keys breaking `config.yaml` (#84064) and the false-positive `.env` warning (#90299) are eroding CLI reliability.
- **Bot Mode is unreliable:** Bots "hang," sessions appear empty, and timeout-related failures dominate desktop chat. The rapid fix cycle today suggests the team knows this.

**Positive Signals:**

- The maintainers' rapid response to Bot Mode issues (three merged PRs) and the acknowledgment of the Windows severity are signs of a responsive team.
- The bot-authored PRs from `hermes-seaeye[bot]` suggest healthy automated tooling.

## 8. Backlog Watch

- **[#39429 — preserve named custom provider request_overrides in gateway and /model switches](https://github.com/NousResearch/hermes-agent/pull/39429)** — **77 days open** (created June 5). This is a critical routing bug for custom providers and remains unmerged. High-comment-count PR with no activity for weeks. Needs a maintainer decision.

- **[#56633 — include aiohttp for API server runtime](https://github.com/NousResearch/hermes-agent/pull/56633)** — **50 days open** (created July 1). A deceptively simple dependency fix that only triggers when `API_SERVER_ENABLED=true`. Stale; needs a review or a close.

- **[#61441 — respect explicit Feishu enabled:false in config.yaml](https://github.com/NousResearch/hermes-agent/pull/61441)** — 42 days open. A straightforward fix for a platform-config edge case.

- **Long-running silent issues:** #63852 (July 13) and #66616 (July 18) are both P3, but #66616 (skills index degraded) is a CI-freshness probe that has been failing for a month. This is a sign of a sleeper infrastructure problem that should be addressed.

---

*Digest generated by an AI analyst for Hermes Agent community and maintainers. All links are to public GitHub issues/PRs.*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-20

## Today's Overview
PicoClaw remains in a **steady maintenance phase** with modest throughput: 1 issue closed and 5 PRs updated in the last 24 hours, of which 2 were merged/closed. There were **no new releases**, and no active open issues were touched — the issue tracker remains essentially dormant. Pull request activity is the primary signal of life, with 3 PRs still open, including two flagged as stale. The absence of new releases since the prior digest suggests the project is consolidating rather than shipping new functionality. Newer contributor-driven features (e.g., Telegram UX overhaul) and long-pending design decisions (fallback chain) are converging; maintainer attention seems focused on review and integration rather than triage.

## Latest Releases
None.

## Project Progress
Two PRs were merged/closed in the reporting window:

- **[#3341 — feat(telegram): add interactive command UX and formatted ephemeral fallback](https://github.com/sipeed/picoclaw/pull/3341)** (merged, by As-tsaqib): This is the most significant advance today. It overhauls the Telegram command experience by introducing an interactive, button-driven UX for `/memory`, reducing cognitive load by removing the need for CLI-style subcommand grammar. It also shortens the default `/help` output and adds a formatted ephemeral fallback when structured content is unavailable.
- **[#3200 — feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)** (closed as stale, by lc6464): This PR has been open since July 1. It adds a dedicated workflow on the models page to set a default model, define fallback models, reorder the chain, and persist it through the backend API. It was marked stale and closed — but given the utility of the feature, it may be reopened or resubmitted.

## Community Hot Topics
The **hottest discussion** in the last 24h is the long-running bug report **[#1305 — new banner print to STDOUT, break completion flow](https://github.com/sipeed/picoclaw/issues/1305)**, which was closed after 4 comments. The underlying need: shell completion scripts must be machine-parseable; any human-oriented banner printed to STDOUT breaks completions (e.g., `head -20 _picoclaw` shows UI text instead of valid completion code). The closure suggests a fix has landed, but this is a classic **output-hygiene** issue that has broader implications for any tool generating shell integration artifacts.

Among PRs, the most substantive discussion is around **[#3316 — routed-agent context management](https://github.com/sipeed/picoclaw/pull/3316)** (stale, 17 days old). It addresses a core user pain: when agents are routed to a specific Discord channel, they forget prior messages and never trigger auto-compaction. The PR is broad (history, summarization, compression, seahorse bootstrap), which may explain why it is still open — reviewers might be splitting scope.

## Bugs & Stability
One bug was actively addressed this period:

- **[#1305 — Banner printed to STDOUT breaks shell completion flow](https://github.com/sipeed/picoclaw/issues/1305)** — **Severity: Medium-High.** This is a regression introduced by a prior PR (referenced as #1008). It breaks `picoclaw completion zsh` output. The issue was closed, indicating a fix is in place, though the fix commit was not explicitly linked in the digest. **No new open bugs were reported.**

No crashes or memory-related issues surfaced in the last 24h. The stability bar remains good, but the low issue volume makes trend analysis unreliable.

## Feature Requests & Roadmap Signals
Two clear roadmap signals emerged from PRs:

- **Interactive Telegram commands** (from [#3341](https://github.com/sipeed/picoclaw/pull/3341)): merged. Expect a continuation in UX polish — the "formatted ephemeral fallback" hints at broader structured-output improvements for other channels.
- **Configurable model fallback chains** (from [#3200](https://github.com/sipeed/picoclaw/pull/3200)): likely to be re-proposed. The workflow (set default, add fallbacks, reorder, persist) is a coherent, well-scoped feature. Watch for a rebased resubmission.
- **Telegram topics support in private chats** (from [#3315](https://github.com/sipeed/picoclaw/pull/3315)): still open and stale, but the fix is small and clearly described — likely merged post-cleanup.

Prediction for next version: **Telegram interactive UX polish** and **Telegram topic support** are strong candidates. Fallback chain is plausible but blocked by stale-PR cleanup.

## User Feedback Summary
Pain points observed in this window:

- **Shell integration fragility**: Users rely on `picoclaw completion` output being piped; any UX banner pollutes it. This indicates PicoClaw is being used in automation pipelines, and maintainers should treat **STDOUT as a data channel** — human-facing messages belong to STDERR.
- **Context loss in routed agents**: Users actively set up multi-channel routing and expect coherent, long-term memory per channel. The [#3316](https://github.com/sipeed/picoclaw/pull/3316) issue is a direct, concrete UX complaint — this is the kind of bug that erodes trust in the "agent" promise.
- **Command complexity on Telegram**: The CLI-style subcommand grammar was perceived as heavy for chat interfaces. Users prefer guided, tap-based interaction — a signal that PicoClaw's UX bar is shifting toward conversational, in-chat affordances.

On the positive side, the merged Telegram UX PR (3341) directly addresses user feedback about cognitive load, suggesting the maintainers are responsive to chat-centric UX feedback.

## Backlog Watch
No new urgent items surfaced, but two PRs require maintainer attention to avoid rot:

- **[#3316 — routed-agent context management](https://github.com/sipeed/picoclaw/pull/3316)** — stale for 17 days. This is a high-value fix for a real user-reported bug. It should be reviewed, scoped, or split into smaller PRs. Risk: if it remains unactioned, related bugs will accumulate.
- **[#3315 — topics in private bot chats](https://github.com/sipeed/picoclaw/pull/3315)** — stale for 17 days. Small, isolated fix; likely safe to merge after basic review.

No long-unanswered issues with high engagement were detected in the last 24h. The open issue pool appears well-maintained and low in volume.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest
**2026-08-20**

---

## 1. Today's Overview

NanoClaw is in a period of significant active development with a notably high PR throughput (34 PRs updated in 24 hours, 25 merged/closed). Core-team members are driving a substantial push around Slack channel architecture (feature flagging, agent flows, approval workflows), while community contributors have been surfacing and reporting setup and runtime bugs on fresh macOS installs. The issue tracker shows zero closed issues today, indicating that reported bugs are still being processed — though several matching fix PRs are already in flight. The project appears healthy and responsive, with a clear focus on formalizing channel integrations and improving installation robustness across environments.

---

## 2. Releases

No new releases were published in the last 24 hours.

---

## 3. Project Progress

The majority of merged PRs today came from core-team members, signaling strong maintainer momentum:

- **Slack feature flagging & architecture** ([#3357](https://nanocoai/nanoclaw-PR-3357), [#3358](https://nanocoai/nanoclaw-PR-3358)): The setup tool now supports `--slack-agents` to install the full Slack agents feature (child bots, A2A rooms, canvases), while the default install provides only the base Slack experience. The payload was split across `/add-slack` and `/slack-agent-flow` skills accordingly.

- **Slack decline & approval improvements** ([#3342](https://nanocoai/nanoclaw-PR-3342), [#3340](https://nanocoai/nanoclaw-PR-3340)): Owner-absent Slack channel invites are now declined in place instead of surfacing as approval cards; `pending_approvals` gains an `instance` column for consistent bot identity across DM and OneCLI credential cards.

- **Provisioning metadata & credential binding** ([#3344](https://nanocoai/nanoclaw-PR-3344), [#3345](https://nanocoai/nanoclaw-PR-3345), [#3341](https://nanocoai/nanoclaw-PR-3341)): App creation now carries optional request-origin metadata (who asked, what created, which client); Slack auto-setup forwards client version metadata; the Slack service is now derived from the credential's issuer rather than independent configs.

- **Setup fail-closed behavior** ([#3339](https://nanocoai/nanoclaw-PR-3339)): A stored sign-in that cannot be verified now fails closed instead of being treated as valid — a security-hardening fix.

- **Telegram enhancements** ([#3351](https://nanocoai/nanoclaw-PR-3351), [#3352](https://nanocoai/nanoclaw-PR-3352)): A new `/connect_group` DM command uses Telegram's native group picker, wiring approvals through existing channels; documentation added for the flow.

- **Container output-token cap raised** ([#3025](https://nanocoai/nanoclaw-PR-3025)): The agent SDK's 32000 output-token cap was lifted to the model maximum in container setups.

---

## 4. Community Hot Topics

All three open issues were filed by the same community member (`glifocat`) and are recent, with no comments or reactions yet:

- [**#3359 — Node 26 incompatibility with better-sqlite3**](https://nanocoai/nanoclaw-Issue-3359): Fresh macOS arm64 install fails at bootstrap because `check_node` only validates a minimum version, allowing unsupported Node 26 to pass. A fix PR is already open (see Bugs & Stability).

- [**#3354 — Setup failure on non-login SSH sessions**](https://nanocoai/nanoclaw-Issue-3354): Two setup bugs — 0-byte channel files after failed `git show` copy, and OneCLI check running before PATH fix. Root cause: setup assumes interactive/login shell.

- [**#3353 — Dial SMS recorded as delivered despite carrier rejection**](https://nanocoai/nanoclaw-Issue-3353): The Dial adapter marks messages as delivered once accepted; carrier-side rejection is not revisited, and retry budgets are untouched.

**Analysis:** The community is actively testing fresh installs in headless and non-standard environments, exposing the gap between "supported on paper" and "works on a clean box." The underlying need is for robust, environment-agnostic installation.

---

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Summary | Fix PR? |
|----------|-------|---------|---------|
| **High** | [**#3359**](https://nanocoai/nanoclaw-Issue-3359) | Node 26 passes version check but better-sqlite3 can't compile — fresh installs fail at bootstrap on Homebrew Node | ✅ [**#3360**](https://nanocoai/nanoclaw-PR-3360) upgrades to better-sqlite3 13.0.3 and raises min Node to 22 |
| **Medium-High** | [**#3353**](https://nanocoai/nanoclaw-Issue-3353) | Dial SMS delivery status is not revisited after carrier rejection — false "delivered" records, retry budget untouched | ❌ No open PR yet |
| **Medium** | [**#3354**](https://nanocoai/nanoclaw-Issue-3354) | Setup leaves 0-byte channel files on failed `git show`; OneCLI check runs before PATH fix — non-login/headless installs | ❌ No open PR yet |

The Node runtime issue is actively being fixed by core team member `Koshkoshinsk` in PR #3360, which also aligns with the existing open PR #3249 by `glifocat` (handle existing Node outside supported range).

---

## 6. Feature Requests & Roadmap Signals

Several open PRs hint at upcoming features that are likely to land in the next release:

- **Cursor Agent SDK support** ([#3356](https://nanocoai/nanoclaw-PR-3356) + [#3355](https://nanocoai/nanoclaw-PR-3355)): A new provider payload and `/add-cursor` setup skill — alongside the existing container output-token cap fix, this suggests deeper Cursor/AI-agent tooling integration is on the roadmap.

- **Agent mailbox seam and registry** ([#3349](https://nanocoai/nanoclaw-PR-3349)): A new abstraction layer for agent mailbox implementations, with SQLite as the included default — signals architectural groundwork for scalable agent messaging.

- **Dial channel adapter** ([#3041](https://nanocoai/nanoclaw-PR-3041) + [#3050](https://nanocoai/nanoclaw-PR-3050)): SMS + AI voice calls via Dial, with a setup picker — long-running open PRs (since July 14) that may be nearing merge consideration.

- **Slack decline-notification overrides** ([#3361](https://nanocoai/nanoclaw-PR-3361) + [#3362](https://nanocoai/nanoclaw-PR-3362)): Optional `declineText`, `fyiText`, and `dedupeKey` overrides on the `declineAndNotify` seam, plus Slack agent-flow prerequisite validation — likely to be merged as a cohesive unit.

**Prediction:** The next release will likely include Node 22+ support, refined Slack agent flows, and possibly the Cursor provider, given the co-developed setup skill and payload PRs.

---

## 7. User Feedback Summary

The single community contributor (`glifocat`) providing feedback today has surfaced a consistent theme: **installation is fragile outside of idealized environments.**

- Fresh macOS arm64 machines with Homebrew Node fail at bootstrap — the version check is too loose.
- Headless SSH installs (no login shell, no `~/.local/bin` on PATH) break in two places.
- The setup regex assumes a specific command structure (`git show <ref>:<path> > <file>`) that silently produces corrupted output on failure.

**Satisfaction signal:** The reporter's issues are specific, reproducible, and reproducible across two distinct bug classes — an indication of active and thorough testing rather than casual annoyance. The speed with which core team addressed the Node version issue (PR #3360 within a day) is a positive signal of responsiveness.

**Dissatisfaction signal:** The issue is that version bounds are checked but not enforced — a false sense of compatibility.

---

## 8. Backlog Watch

The following items are open, untouched for over a month, and may require maintainer attention:

| Item | Age | Notes |
|------|-----|-------|
| [**#3050 — Add Dial to channel picker + wizard**](https://nanocoai/nanoclaw-PR-3050) | ~37 days | Open since July 14; companion PR #3041 also long-pending. Both authored by `OmriBenShoham`. No recent maintainer activity — likely awaiting review. |
| [**#3249 — Handle existing Node outside supported range**](https://nanocoai/nanoclaw-PR-3249) | ~6 days | Authored by `glifocat` (same as today's issue reporter); overlaps with #3360's approach. Should be reconciled against the new Node 22 minimum. |
| **Issue #3353 (Dial SMS delivery)** | 1 day | No follow-up PR; given the prior PRs' stagnation, this may need a maintainer to route to `OmriBenShoham` or pick up. |

**Note:** The Dial channel feature (PRs #3041/#3050) has now been open for over five weeks with two related issues filed by the community. If it is planned for the next release, a status update or review session would likely reduce contributor churn.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

Here is the NullClaw project digest for **2026-08-20**.

---

### 1. Today's Overview
NullClaw is in a **quiet maintenance phase** as of August 20, 2026. There were **zero issues** updated or created in the last 24 hours, and **no new releases** were published. The sole activity is a single **open Pull Request (#989)** aimed at fixing a visual regression on the README. While the lack of issue churn suggests stability, the dormant issue tracker and minimal PR volume indicate a low-velocity development cycle, with maintainers currently focused on minor quality-of-life fixes rather than feature expansion.

### 2. Releases
**None.** There were no new releases published in the last 24 hours, and no release history was provided in the data snapshot.

### 3. Project Progress
- **PR #989 (Open):** [fix: restore broken star history chart](https://github.com/nullclaw/nullclaw/pull/989)
  - **Status:** Open (created 2026-08-19).
  - **Details:** Submitted by **FaintFlower**, this PR addresses a broken README element. The star history chart currently fails due to GitHub's stargazer API access restrictions. The fix redirects the chart source to `star-history.dera.page`, a token-free alternative, restoring the visual integrity of the project documentation.

### 4. Community Hot Topics
There are **no actively discussed issues or PRs** drawing significant community engagement today. The only open PR (#989) has minimal interaction (0 comments, 0 reactions) and is a straightforward maintenance fix rather than a topic of debate.

**Underlying Need:** The near-complete lack of community discourse suggests users are either satisfied with the current state, or the project is in a low-traffic period where users are not reporting major blockers.

### 5. Bugs & Stability
**No new bugs or regressions were reported today.** The only stability-related item is the broken README chart addressed by PR #989. While this is a documentation issue rather than a runtime crash, it degrades the **project's public presentation** and discoverability for potential new users.

- **Severity Ranking:** Low (Visual/UI asset only).
- **Fix Status:** A fix exists in PR #989, awaiting review and merge.

### 6. Feature Requests & Roadmap Signals
**No new feature requests were submitted today.** Based on the current trajectory, the short-term roadmap appears focused on **infrastructure and presentation fixes** (referencing PR #989). There are no signals indicating imminent major feature development; the next version is likely to be a patch release bundling documentation fixes.

### 7. User Feedback Summary
There is **no direct new user feedback** (comments, reactions, or issue reports) in the last 24 hours. The only implied user pain point is the **lack of a reliable star history visualization**, which the community felt was important enough to warrant a fix. The absence of crash reports or feature complaints suggests a general **neutral-to-positive stability**, but the lack of data makes a definitive satisfaction assessment impossible.

### 8. Backlog Watch
**No critical backlog items are currently visible.** There are no long-standing open issues or PRs highlighted in the data that require urgent maintainer attention beyond the pending review of PR #989. It is recommended that maintainers prioritize merging this fix to clear the current backlog queue.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Based on the GitHub data for IronClaw, here is the project digest for 2026-08-20.

---

# IronClaw Project Digest — 2026-08-20

## 1. Today's Overview

IronClaw is in a highly active state with 53 issues and PRs updated in the last 24 hours, including the major milestone of promoting `v1.3.0` to stable. The project is executing on a large-scale refactoring of its core runtime and capability systems, with a focus on reducing redundant database reads and standardizing provider responses. A significant portion of activity involves stabilizing the CI pipeline, which has been plagued by unbounded operations. Progress is being made on major epics like persistent user sandboxes and the OOBE onboarding flow, while a bug-bash has surfaced several quality issues in the WebUI and extension management.

## 2. Releases

- **[ironclaw-v1.3.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.3.0) — 2026-08-19**
    - Promoted from `1.3.0-rc.2` after validation. This is a stable release that primarily includes **upgrade and container fixes**.
    - **Migration Notes:** The release notes specifically mention a fix for upgrades from `v1.2`, where the system previously crash-looping during startup. It now correctly accepts and preserves the released extension `activation_state` field. This is a critical fix for users upgrading from the previous major version.

## 3. Project Progress

The 18 merged/closed PRs show progress across the stack, with a focus on foundational work:

- **Runtime & Capabilities:** A major refactoring effort is underway. [PR #7686](https://github.com/nearai/ironclaw/pull/7686) centralizes capability outcome processing, and [PR #7752](https://github.com/nearai/ironclaw/pull/7752) introduces the `activate()` primitive and `ActivationProvenance` for subagents, laying groundwork for future autonomous features.
- **WebUI & UX:** The OOBE (out-of-box experience) onboarding prototype ([PR #6994](https://github.com/nearai/ironclaw/pull/6994)) has been closed, marking the completion of backend wiring ([Issue #6993](https://github.com/nearai/ironclaw/issues/6993)) and the epic for channel-first onboarding ([Issue #7044](https://github.com/nearai/ironclaw/issues/7044)). Also merged is the durable notification inbox backend ([PR #7697](https://github.com/nearai/ironclaw/pull/7697)), which establishes the contracts and storage for user notifications.
- **CI & Stability:** [PR #7756](https://github.com/nearai/ironclaw/pull/7756) addresses the critical CI instability by bounding every unbounded operation (apt hangs, uncapped jobs). This should unblock the merge queue.
- **Release:** The promotion of the `v1.3.0` release ([PR #7754](https://github.com/nearai/ironclaw/pull/7754)) was merged.

## 4. Community Hot Topics

- **[Issue #7732: Epic: Persistent per-user sandbox with iron-proxy](https://github.com/nearai/ironclaw/issues/7732)** — *7 comments*.
    - **Analysis:** This is the most active discussion, covering the shift from a container-per-command model to a persistent sandbox. The community/user concern is about the performance and statefulness of the current ephemeral approach. A step towards this is already in review with [PR #7751](https://github.com/nearai/ironclaw/pull/7751).
- **[Issue #5998: Reborn has no transport for a local (on-device) MCP server](https://github.com/nearai/ironclaw/issues/5998)** — *Long-standing, still relevant with a new PR*.
    - **Analysis:** This issue highlights a pain point for developers who want to connect to local MCP servers for development. The open [PR #7757](https://github.com/nearai/ironclaw/pull/7757) seeks to allow connections to literal loopback IPs, indicating active work to resolve this.

## 5. Bugs & Stability

- **[Issue #7748: IronClaw got confused and stopped working](https://github.com/nearai/ironclaw/issues/7748)** — *Severity: High.* A vague but critical user-facing report of a total failure with no diagnostic context. Requires immediate investigation to determine if this is a systemic issue or a one-off.
- **[Issue #7745: Copilot MCP extension install fails with auth_required, duplicate catalog entries](https://github.com/nearai/ironclaw/issues/7745)** — *Severity: P2.* A broken installation flow prevents users from using a key extension, with multiple contributing factors (duplicate entries, unclear token type).
- **[Issue #7744: Cron job UI missing edit and test buttons](https://github.com/nearai/ironclaw/issues/7744)** — *Severity: P3.* Missing UI functionality that forces users to use CLI/API for basic cron job management.

## 6. Feature Requests & Roadmap Signals

There are clear signals for the feature set in the upcoming `v1.4.0`:

- **Persistent User Sandboxes:** The active [Epic #7732](https://github.com/nearai/ironclaw/issues/7732) and its accompanying PR ([#7751](https://github.com/nearai/ironclaw/pull/7751)) will introduce a persistent per-user container for more efficient, stateful shell execution.
- **Channel-First Onboarding:** The closure of the OOBE epic ([#7044](https://github.com/nearai/ironclaw/issues/7044)) and its prototype PR ([#6994](https://github.com/nearai/ironclaw/pull/6994)) signals a push to make the first-run experience more prescriptive and channel-led.
- **Standardized Capabilities:** The merging of the behavior-preserving refactor ([#7686](https://github.com/nearai/ironclaw/pull/7686)) and the feature work on normalization ([#7692](https://github.com/nearai/ironclaw/pull/7692)) will soon change how models see failures and auth errors, making them "typed, bounded, and consistently visible."
- **Automation Preflight:** In-flight work like [PR #7743](https://github.com/nearai/ironclaw/pull/7743) will add a `ready`/`needs_setup`/`needs_input` protocol to automation creation, preventing the system from attempting "guessed" execution strategies.

## 7. User Feedback Summary

- **Frustration with Complexity:** The "IronClaw got confused" report suggests that when things go wrong, the system does not provide clear diagnostics, leaving users in the dark. There is a need for better logging and error tracing.
- **Blocked Workflows:** The inability to connect to local MCP servers and the UI limitations for cron jobs and extension installation (Copilot) block developer and power-user workflows.
- **Performance on the Menu:** The move to persistent sandboxes is directly addressing the performance cost of the current container-per-command model for `builtin.shell`.
- **Security/Privacy Concern:** The issue of Slack unlinked-user connect messages being public ([Issue #7681](https://github.com/nearai/ironclaw/issues/7681)) shows that users and the team are conscious of channel privacy and want to minimize noise for other channel members.

## 8. Backlog Watch

- **[Issue #5998: Reborn has no transport for a local MCP server](https://github.com/nearai/ironclaw/issues/5998)** — *Opened 2026-07-11.* This issue has been open for over a month. The new [PR #7757](https://github.com/nearai/ironclaw/pull/7757) is a promising sign, but maintainers should monitor it closely, as it might need feedback from security reviewers to land.
- **[Issue #7038: Epic: Storybook + an AI-first Design System](https://github.com/nearai/ironclaw/issues/7038)** — *Opened 2026-08-03.* While [PR #7750](https://github.com/nearai/ironclaw/pull/7750) (Phase 1) is open and awaiting review, coordinating the follow-up phases is key. This is a long-running epic related to WebUI governance.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-20

## 1. Today's Overview

The project shows steady maintenance activity with all 8 PRs from the past 24 hours closing (previously merged/closed), while 6 issues remain open and active with no new closures. Notably, all six open issues are marked `[stale]` and have remained unresolved for over four months since their creation on 2026-04-08, indicating a significant backlog of unresolved user-facing problems. PR activity demonstrates healthy collaboration, with contributions spanning installer fixes, IM channel features, SSE stream race-condition repairs, and UI enhancements. No new releases were published today. The overall pulse reflects sustained code maintenance but raises concern about the staleness of existing issues.

## 2. Releases

No new releases were published on 2026-08-20.

## 3. Project Progress

All 8 PRs were merged/closed, reflecting a strong day of contributor output:

- **[#2512 — fix(installer): hide banner for dictbind silent package](https://github.com/netease-youdao/LobsterAI/pull/2512)**: Hides plugin-owned silent Banner only for dictbind double-click-silent channel artifacts while preserving behavior for other silent install paths; updates installer design spec with contract coverage.
- **[#2511 — fix(installer): support silent upload-first web builds](https://github.com/netease-youdao/LobsterAI/pull/2511)**: Adds upload-first two-pass Windows web-installer flow for NOS-hosted payloads, rebuilding only the signed WebSetup stub while reusing uploaded packages; enforces SHA-256 invariant to prevent payload invalidation.
- **[#1570 — fix(scheduledTasks): editing a disabled task re-enables it](https://github.com/netease-youdao/LobsterAI/pull/1570)**: Fixes `TaskForm` where `enabled` was hardcoded to `true`; now preserves original enabled state on edit.
- **[#1573 — feat(im): IM channels now support slash commands](https://github.com/netease-youdao/LobsterAI/pull/1573)**: Adds `/help`, `/status`, `/new`, `/compact` commands for Telegram, 钉钉, 飞书, Discord, QQ, WeChat.
- **[#1576 — fix(api): SSE stream race condition with cleanupFunctions array](https://github.com/netease-youdao/LobsterAI/pull/1576)**: Fixes critical race where old request's abort callback clears new request's SSE listeners, causing silent stream data loss.
- **[#1578 — feat(permission-modal): Bash command syntax highlighting](https://github.com/netease-youdao/LobsterAI/pull/1578)**: Adds syntax highlighting to permission approval modal to help users spot dangerous flags like `rm -rf`, `--force`.
- **[#1580 — feat(prompt-input): thumbnail previews for image attachments](https://github.com/netease-youdao/LobsterAI/pull/1580)**: Replaces icon+filename pills with `64×64` thumbnails rendered from `dataUrl`.
- **[#1582 — fix(setup-python): overwrite stale pip files #475](https://github.com/netease-youdao/LobsterAI/pull/1582)**: Resolves pip-recursion error by ensuring `__main__.py` content is checked, not just existence.

## 4. Community Hot Topics

The most active discussion is **[#1569 — "提问后不运行，也不显示任何信息"](https://github.com/netease-youdao/LobsterAI/issues/1569?comments=5)** (5 comments): User reports silent failure—no execution, no output, no error message after asking a question. This is a high-impact usability issue with no response from maintainers in 4 months.

Other issues (2 comments each) include:

- **[#1561 — Model cannot access uploaded files](https://github.com/netease-youdao/LobsterAI/issues/1561)** — New-version regression; uploaded files no longer referenced in project directory.
- **[#1566 — Latest version always responds with identical output](https://github.com/netease-youdao/LobsterAI/issues/1566)** — Every input yields identical response; logs attached.
- **[#1567 — Request: quick-stop, context-compact UI buttons](https://github.com/netease-youdao/LobsterAI/issues/1567)** — User asks for recovery controls in the input area.

## 5. Bugs & Stability

Ranked severity:

| Severity | Issue | Description | Fix PR? |
|---|---|---|---|
| **Critical** | [#1566](https://github.com/netease-youdao/LobsterAI/issues/1566) | Identical output for any input in v2026.4.3 — likely core loop bug | None |
| **Critical** | [#1569](https://github.com/netease-youdao/LobsterAI/issues/1569) | Silent no-op after prompt — no run, no output | None |
| **High** | [#1561](https://github.com/netease-youdao/LobsterAI/issues/1561) | Uploaded files invisible to model — regression in new version | None |
| **Medium** | [#1551](https://github.com/netease-youdao/LobsterAI/issues/1551) | Gateway repeatedly restarts on network environment change | None |
| **Low** | [#1563](https://github.com/netease-youdao/LobsterAI/issues/1563) | Typo in data package service terms page | None |

The system-level bugs (#1566, #1569) are the most concerning, as both affect the core user loop and remain unanswered for 4+ months.

## 6. Feature Requests & Roadmap Signals

Clearly requested by users:

- **[#1567 — Quick-stop & context-compact buttons](https://github.com/netease-youdao/LobsterAI/issues/1567)**: Input-area controls to stop current topic, compress context, and a help command. Predict high likelihood for next version given recent UX PRs on prompt-input and permission modal.
- **[#1573 (already merged) — IM slash commands](https://github.com/netease-youdao/LobsterAI/pull/1573)**: Signals roadmap commitment to headless/IM-first interactions; watch for further IM channel polish in upcoming releases.

## 7. User Feedback Summary

Pain points expressed in the last 24h:

- **Silent failures (critical)**: Users report no error, no output, no indication of what went wrong (#1569). Strong dissatisfaction with opaqueness.
- **Blind attachment handling**: Users are dissatisfied that model cannot "see" uploaded files (#1561) — they expect file contents to be discoverable in project directory, as in prior versions.
- **Erratic behavior**: Repetitive identical responses (#1566) suggests modeling loop stability issue affecting trust.
- **Fragile networking**: Gateway restart on network changes (#1551) is disruptive for mobile/roaming use cases.
- **Technical documentation quality**: Even terms-of-service pages contain typos (#1563), hinting at QA gaps in user-facing copy.

Users clearly want: predictable behavior, quick recovery tools, and clear visibility of state and errors.

## 8. Backlog Watch

These issues/PRs require maintainer attention:

- **[#1569 — Silent no-op bug (5 comments, 4 months old)](https://github.com/netease-youdao/LobsterAI/issues/1569)**: Long-unanswered, high visibility, core usability failure.
- **[#1566 — Identical responses (2 comments, stale)](https://github.com/netease-youdao/LobsterAI/issues/1566)**: Core functional regression; needs investigation/triage.
- **[#1561 — Uploaded-files regression (2 comments, stale)](https://github.com/netease-youdao/LobsterAI/issues/1561)**: Documented regression from a prior behavior; likely needs version-specific investigation.

These issues, all dated 2026-04-08, have no maintainer responses. The 4-month silence on active bugs is a strong signal for the project maintainers to consider, as the community is actively sharing detailed reports and logs with intent to help improve the product.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-20

## 1. Today's Overview

Moltis shows strong, sustained development velocity with 9 PRs touched in the last 24 hours and a new release published on 2026-08-18. The project is actively addressing both security hardening and platform-specific bugs, with 4 PRs merged/closed today focusing on Apple Container sandbox fixes and OpenAI routing corrections. Three issues were closed, all bug reports from the past two weeks, indicating a healthy bug-fix cycle, though two of them lacked community comments. The open PR count (5) exceeds closed (4), suggesting a productive queue with fixes pending review, while a new release cadence indicates mature CI/CD practices.

## 2. Releases

**20260818.10** — Released 2026-08-18.

The release wave (20260818.x) is closing out with this patch version, accompanying a series of rapid-released fixes. Given the PRs merged in this window (Apple Container sandbox fixes, OpenAI routing, GPT-5.6 Luna support), this release likely carries substantial bug fixes for container resource management and model routing edge cases. No explicit breaking changes or migration notes were published with this release.

## 3. Project Progress

Four PRs were merged or closed today, covering critical bug fixes in two core areas:

- **[PR #1214](https://github.com/moltis-org/moltis/pull/1214) — Apple Container status parsing overhaul**: Replaced fragile JSON substring matching with a typed status decoder, handling both pre-1.x scalar status fields and newer 1.x nested `status.state` structures.
- **[PR #1215](https://github.com/moltis-org/moltis/pull/1215) — Apple Container resource limits**: Now passes memory, CPU, and pids limits correctly to the sandbox via `--memory`, `--cpus`, and `--ulimit nproc`, and explicitly rejects unsupported fractional CPU requests.
- **[PR #1212](https://github.com/moltis-org/moltis/pull/1212) — OpenAI routing preservation**: Fixed a regression where explicitly configuring the official OpenAI endpoint would disable Responses-based routing; the system now classifies by normalized URL rather than configuration flag.
- **[PR #1213](https://github.com/moltis-org/moltis/pull/1213) — GPT-5.6 Luna coverage**: Added routing tests for Sol/Terra/Luna variants plus a credentialed streaming regression test to lock in model health.

**Security-critical finding**: [PR #1216](https://github.com/moltis-org/moltis/pull/1216) is open for review and fixes CWE-306 (missing authentication), allowing any unauthenticated remote caller to brute-force vault unlock/recovery endpoints.

## 4. Community Hot Topics

The most active discussion today was **[Issue #1185](https://github.com/moltis-org/moltis/issues/1185) — Apple Container sandbox status detection bug** with 3 comments. The issue describes a scenario where the sandbox starts successfully but Moltis refuses to recognize it as running, directly impacting usability for Apple Container backend users. Both [PR #1214](https://github.com/moltis-org/moltis/pull/1214) and [PR #1215](https://github.com/moltis-org/moltis/pull/1215) trace back to this family of problems (#1185, #1188), showing maintainers treating community-reported Apple Container friction as a priority cluster. This indicates Apple Container is a maturing but still rough-edged backend receiving active investment.

## 5. Bugs & Stability

Only closed issues today, but the underlying severity is notable:

| Severity | Issue | Status | Fix |
|----------|-------|--------|-----|
| **High** | [Apple Container not recognized as running after start](https://github.com/moltis-org/moltis/issues/1185) | Closed | [PR #1214](https://github.com/moltis-org/moltis/pull/1214) — typed status decoder across versions |
| **Medium** | [Resource limits not applied for Apple Container backend](https://github.com/moltis-org/moltis/issues/1188) | Closed | [PR #1215](https://github.com/moltis-org/moltis/pull/1215) — limits map to native sandbox flags |
| **Low-Medium** | [Issue with GPT-5.6 Luna](https://github.com/moltis-org/moltis/issues/1181) | Closed | [PR #1213](https://github.com/moltis-org/moltis/pull/1213) — routing + regression coverage |

Additionally, [PR #1216](https://github.com/moltis-org/moltis/pull/1216) addresses a **security-critical** vulnerability (CWE-306) still open, where vault unlock/recovery endpoints lacked authentication.

## 6. Feature Requests & Roadmap Signals

No new user feature requests surfaced today, but the active PRs signal roadmap direction:

- **Configurable policy ceilings** ([PR #1219](https://github.com/moltis-org/moltis/pull/1219) — open): Making the untrusted-turn deny-all tool policy configurable beyond the fixed three public-audience tools, responding to usability concerns from sharable chat scenarios.
- **WhatsApp polish** ([PRs #1217](https://github.com/moltis-org/moltis/pull/1217), [#1218](https://github.com/moltis-org/moltis/pull/1218) — both open): Reply-as-mention handling and customizable bot push names in group chats indicate the WhatsApp integration is being treated as a first-class citizen.
- **Heartbeat semantics** ([PR #1208](https://github.com/moltis-org/moltis/pull/1208) — open): Fixing inactive `active_hours` in cron/heartbeat scheduling — the code exists but is never wired to the scheduler.

These small, user-visible improvements suggest the next minor release will emphasize WhatsApp UX and cron reliability.

## 7. User Feedback Summary

A small but telling sample from today's activity. Users of the Apple Container backend report a broken experience: containers running fine but Moltis claiming they are not (Issue #1185) and resource constraints silently ignored (Issue #1188). The existence of two separate-but-related reports within one week signals early-adopter pain in that feature area — yet maintainers closed both with fix PRs within the day, which should convert into strong satisfaction. The GPT-5.6 Luna issue demonstrates community members actively test tied to bleeding-edge model releases. A recurring pattern from the open PRs: users expect "mention me" and "reply to me" to be equivalent in group chats (WhatsApp), reflecting real-world messaging behavior expectations.

## 8. Backlog Watch

No issues currently appear abandoned or unanswered by maintainers, and all tracked issues from the past two weeks were acted upon within 24 hours of their last update. However, the open security fix [PR #1216](https://github.com/moltis-org/moltis/pull/1216) (vault auth bypass) — while recent — deserves priority merge as it sits on exposed unauthenticated network endpoints. Also note [PR #1208](https://github.com/moltis-org/moltis/pull/1208) remains unpushed-not-unmerged for 3 days; given a documented bug (heartbeat active hours never applied) is a small, well-scoped fix, it risks slipping over the weekend. Overall backlog health is good, with no signs of maintainer inattention.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-20

## 1. Today's Overview

CoPaw shows strong, sustained development velocity this week: 46 PRs were updated in the last 24 hours (30 open, 16 merged/closed) and 50 issues saw activity (46 closed, 4 open). The project is in an active stabilization and feature-expansion phase — the merge rate is healthy and several long-standing issue threads (some from March and April) were finally closed. Notably, the most significant infrastructure addition is **QwenPaw Hub**, a self-hosted multi-user control plane (PR #7112), signaling a pivot toward enterprise/deployment use cases. No new releases were published today. A substantial volume of closed issues (46) suggests maintainers are actively triaging backlog, though 30 open PRs indicates a large queue awaiting review.

## 2. Releases

No new releases were published in the last 24 hours. The latest known version remains **QwenPaw Desktop 2.1.0**, which was referenced in multiple recent issues (#7102, #7076), indicating it is the current stable build in circulation.

---

## 3. Project Progress

All 16 closed/merged PRs represent merged or closed work. Key highlights:

**Infrastructure & Deployment**
- **#7112** — *feat(hub)*: QwenPaw Hub, a self-hosted multi-user control plane with local and Docker runtimes (open, under review; significant feature)
- **#7152** — *test(integration)*: Fixes spawn recursion and port-race startup flakes; addresses hanging subagent tests
- **#7103** — *test(integration)*: Expands integration test coverage across routing, channels, tools, MCP, and coding projects

**Bug Fixes**
- **#6986** — *fix(sandbox)*: Antivirus software blocking issues (merged) — directly addresses a hot community topic (#6847, #2884)
- **#7135** — *fix(envs)*: Preserves corrupt files and writes envs atomically
- **#7137** — *fix(console)*: Polish model selector styles (merged)
- **#7151** — *feat(console)*: Folder creation in directory browser with improved naming and conflict handling
- **#7146** — *fix(view_image)*: Freezes remote images before persisting tool results, protecting against URL-breaking and SSRF risks
- **#7150** — *fix*: Detects and recovers from stalled LLM streams (addresses #7102, a 9-comment open bug)
- **#7147** — *fix(xiaoyi)*: Normalizes session IDs and reports proactive send failures for the XiaoYi channel

---

## 4. Community Hot Topics

The most active discussions reveal two distinct community segments: **Chinese-speaking desktop users** and **enterprise API/self-hosting integrators**.

**Most active issues (by comment count):**

- **#2884** (27 comments, open→closed) — User reports catastrophic data loss: "my personal directory was almost completely emptied" after an overnight CoPaw session on Ubuntu 22.04. Extreme severity perception among users; closed without visible maintainer response in thread.
- **#2301** (10 comments) — Feature bundle: one-click update, button-style approve/reject, automatic model switching with a "model ladder", self-evolution capability, cross-device session continuity, and broader provider support.
- **#2035** (10 comments) — Multi-agent + multi-bot binding and multi-agent collaboration; user wants each agent bound to a different bot per channel.
- **#7102** (9 comments, OPEN) — Freeze >10 minutes with GLM 5.3 on QwenPaw Desktop 2.1.0; now has a fix PR (#7150).
- **#2723** (9 comments) — Task disappearance when switching channels; task execution state lost.
- **#2377** (9 comments) — Auto-interruption on large batch jobs (1,500 files); agent stalls after a few files despite user configuring batching and checkpointing.

**Analysis:** The community skews heavily toward Chinese-speaking individual users running complex, long-running automation tasks — batch processing, file analysis, multi-agent orchestration — and they face reliability issues with long-running execution, state persistence, and hardware resource management. Enterprise users, in contrast, are asking for gateway support, self-hosting, and API-driven integration.

---

## 5. Bugs & Stability

**Critical (data loss / catastrophic):**
- **#2884** (CLOSED) — Full workspace deletion reported; user suspects CoPaw or external attack. No visible root cause or fix posted. Highest severity in the backlog.
- **#6847** (CLOSED) — Antivirus software forced termination of QwenPaw processes while WorkBuddy (competitor) was not affected. Fix merged in #6986.

**High (functional failure):**
- **#7102** (OPEN) — LLM stream freezes for >10 min with no token output. Fix PR #7150 adds a semantic stream watchdog.
- **#2377** (CLOSED) — Auto-interruption processing >10 files in a 1,500-file batch task; agent halts without recovery. No fix identified.
- **#2723** (CLOSED) — Task execution state permanently lost when switching channels mid-task.
- **#3005** (CLOSED) — Upgrade to latest version caused complete startup failure post-install (Windows).
- **#7034** (CLOSED) — TypeError in ReactAgent: coroutine passed where async generator expected. No fix PR identified.

**Medium (usability / config):**
- **#7076** (CLOSED) — 404 model config error in qwenpaw-creator with v2.1.0.
- **#2663** (CLOSED) — UI language and theme preference not persisted; reverts to English/light mode after restart.
- **#6624** (CLOSED) — Auto-compaction (Scroll) skips the memory summarization flow, while manual `/compact` works.

**Stability assessment:** The project has a solid fix pipeline — 16 PRs merged/closed today with targeted fixes for freeze detection, antivirus conflicts, env corruption and image handling. However, the **data-loss issue (#2884) remains the most concerning and is closed without an acknowledged fix**, which is a risk signal for user trust.

---

## 6. Feature Requests & Roadmap Signals

The most frequently requested capabilities cluster into thematic areas:

**Multi-agent orchestration (most consistent demand):**
- #2035: per-agent bot binding across channels, multi-agent collaboration
- #2385: CLI port management flaw blocking multi-agent collaboration
- #3260: support for DeerFlow's Harness agents / ACP integration
- #3074: deep research/execution capability (DeerFlow-like)

**Model flexibility & resilience:**
- #2301: automatic model switching with a model ladder fallback
- #2089: automatic fallback model when primary API is rate-limited
- #2598: support for Qwen3-235B non-thinking models
- #2296: support for company-private LLM gateways (non-OpenAI format)
- #2856: larger local model params (14B, 27B, 32B quantized)

**Cross-device & platform:**
- #2301: browser/phone continuity — continue tasks on mobile
- #2493: cloud + Windows client sync/gateway (openclaw-style)
- #2856: mobile browser UI fixes (input box invisible)

**Prediction:** The presence of PR #6515 (Volcengine/MiMo provider) and #7112 (Hub) indicates the maintainers are doubling down on **provider breadth** and **self-hosted multi-user deployment**. The most likely *next* features are: (1) larger local models and improved fallback mechanisms (respond to #2301/#2089 requests), (2) multi-agent collaboration improvements (per-agent bot binding), and (3) WebSocket/mobile UX improvements — but no mobile work is visible in current PRs, suggesting that demand may not be prioritized soon.

---

## 7. User Feedback Summary

**Pain points (expressed strongly):**

1. **Reliability of long-running tasks** — the #1 recurring theme. Multiple issues report agent stalls, task loss, and inability to process large batches without failure (#2377, #2723, #7102, #2663). Users configure workarounds (batching, checkpointing) that don't work, indicating deep-rooted execution-engine issues.

2. **Authorization/approval UX friction** — #2845 captures this well: when the agent requests approval, the action to be performed is buried in thinking blocks; users want explicit buttons and clear descriptions of what the agent will do.

3. **Antivirus incompatibility** — #6847 and #2884 indicate that CoPaw's sandbox behavior triggers security software, leading to process termination or worse. This is a trust and safety issue for less technical users.

4. **Android/phone UX** — #2856 notes the mobile web page renders poorly (even the input box is invisible). This, plus cross-device continuity requests, suggests a meaningful mobile usage segment.

5. **Browser automation weakness** — #3261: automation frequently triggers bot detection, can't reuse login states — affects a core use case.

**Satisfaction signals:**
- Positive feedback on local model quality ("very fluent token output") and on the model's multimodal claims being tested (#2776, #2856).
- Users are actively supporting the project with detailed feedback and feature proposals; the comment engagement indicates a passionate, technically sophisticated user base.

---

## 8. Backlog Watch

**Issues needing maintainer response (high impact, silent or stale):**

- **[#2884](https://github.com/agentscope-ai/QwenPaw/issues/2884)** — Data-loss report; CLOSED but no fix or acknowledgment posted. **Highest priority for user trust.**
- **[#2035](https://github.com/agentscope-ai/QwenPaw/issues/2035)** — Multi-agent + bot binding; 10 comments, CLOSED without visible resolution — core orchestration use case.
- **[#2301](https://github.com/agentscope-ai/QwenPaw/issues/2301)** — Broad feature bundle (updates, model switching, cross-device sync); CLOSED without visible roadmap commitment.
- **[#2590](https://github.com/agentscope-ai/QwenPaw/issues/2590)** — File operation rollback to recover accidentally deleted files; 7 comments; CLOSED with no implementation visible. Directly relevant to #2884.

**PRs in review limbo (long-open, high-value):**

- **[#5930](https://github.com/agentscope-ai/QwenPaw/pull/5930)** — Structured run outcome to SSE for API automation — open since July 10, critical for API-driven integrations.
- **[#6325](https://github.com/agentscope-ai/QwenPaw/pull/6325)** — Built-in tool docs in Console — open since July 22.
- **[#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — Reranker UI config — open since July 23.
- **[#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515)** — Volcengine Agent Plan & MiMo V2.5 providers — open since July 28, under review.

**Maintainer recommendation:** The cluster of open PRs from July (8+ weeks old) suggests a review bottleneck. Prioritizing the anti-data-loss workstream (#2590 rollback, #2884 root cause) would be the most meaningful step for retaining user trust, followed by clearing the aging PR queue.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-20

## 1. Today's Overview

ZeroClaw is in a period of intense architectural maturation. Activity remains very high, with 43 updated issues and 50 updated PRs in the last 24 hours, indicating a highly engaged contributor base. The project is currently navigating a significant architectural transition around runtime-owned sessions (#9487), with multiple high-risk RFCs (9 open at `risk:high`) awaiting maintainer decisions. The backlog shows a clear push to remediate security findings (credential logging #9976, WhatsApp group permissions #9397) and expand plugin/WASM capabilities (#10076). While no new releases shipped today, the sheer volume of open PRs (48) suggests a substantial merge wave is likely imminent.

## 2. Releases

No new releases were published in the last 24 hours. The most recent release remains v0.8.4, with follow-up work tracked in #9381.

---

## 3. Project Progress

Two PRs were merged/closed in the last 24 hours. Of note among the 50 updated PRs, several large, long-running efforts show continued review activity. Key areas of progress visible in the open PR queue:

- **WASM Plugin Deadline** (#9403): Adds a validated `call_timeout_ms` (30,000ms default) to bound all guest exports, significantly hardening the plugin sandbox.
- **Session Scoping** (#9746, #9745): Two large PRs add per-agent ownership scoping to session tools and the knowledge graph, addressing critical multi-tenant isolation gaps.
- **Gateway Auth** (#9744): Requires authenticated webhook ingress for WhatsApp Cloud, Linq, and Nextcloud Talk before agent dispatch — a security-hardening refactor.
- **Perf Improvement** (#10122): Replaces source compiles of `cross`/`tauri-cli` with pinned upstream binaries, targeting release pipeline speedups.
- **Rust Anti-Slop** (#10118): A new tracker to remediate 307 anti-pattern candidates (202 `panic!`s) across 1,078 Rust files, signaling a code-quality push.

---

## 4. Community Hot Topics

The most active discussions reveal deep architectural and operational concerns:

- **#9487 — RFC: Runtime-owned conversation sessions** (20 comments): The highest-traffic issue. Proposes migrating entry points to `InboundAction` and adding durable admission semantics. Closely tied to #9600, indicating this is a core architectural pivot with broad implications.

- **#7462 — 74 Windows test failures** (18 comments): A long-running S2 bug where Windows 11 (code page 936) fails 74 tests; CI only runs Linux, so for two months this has been a known blind spot.

- **#10118 — Rust anti-slop debt tracker** (16 comments): New tracker with 16 comments in 24 hours — the community is highly engaged in the code-quality remediation effort, with a specific focus on eliminating 202 production `panic!` calls.

- **#6165 — RFC: Lighter core via external integrations** (16 comments): A major vision discussion about which integrations belong in the core vs. externalized. This has been running since April and remains a key philosophical debate.

- **#9397 — WhatsApp empty `allowed_groups` = permit-none** (13 comments): Security RFC proposing fail-closed behavior; currently `in-progress` and `accepted` — a clear security fix in flight.

**Underlying need**: The community is pushing for a more secure, better-architected runtime (session ownership, fail-closed security) while simultaneously demanding better UX (sessions, Windows support, paste-in-chat).

---

## 5. Bugs & Stability

Reports ranked by severity:

- **S0 — Security: #9976** — Anthropic credential fragments logged at debug level (`credential_head`/`credential_tail`). **In-progress** — fix is underway.
- **S1 — Workflow blocked: #10066** — SOP engine promotes and runs later steps *before* recording an output-schema rejection; later steps actually execute. `P0` priority, `accepted` — active.
- **S1 — Workflow blocked: #9290** — Windows desktop installer (v0.8.3) fails at launch with missing `TaskDialogIndirect`. `P1`, open, needs a fix.
- **S2 — Degraded: #7462** — 74 test failures on Windows; CI blind spot. `P1`, `accepted`. A serious gap in cross-platform validation.
- **S2 — Degraded: #10045** — Persisted image markers retain temp source paths, causing repeated warnings.
- **S2 — Degraded: #10106** — Exact proxy selectors reject supported transcription services (recently filed).
- **S3 — Minor: #10103** — ZeroCode Health panel misaligns in French/Spanish (padded to 11 cells, labels are 13). Good first issue.

Several of these have associated PRs: #9447 (Anthropic response classification), #9938 (provider ref preservation), #10064 (Telegram approval cards).

---

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals point toward a "Session & Ownership" release:

- **#9487** (RFC: Runtime-owned sessions) and **#9702** (Goal mode v2 — durable continuation + Web controls) suggest the next release will deeply rework session persistence and continuation semantics.
- **#10076 — Comprehensive WASM plugin architecture**: Proposes hook/backend/capability layers for "everything is a plugin" — an ambitious extension of the existing WASM host. Likely a multi-release effort.
- **#10141 — "Please make sessions usable"**: User frustration with session management; may accelerate the sessions work already planned.
- **#10059 — Option-Backspace in ZeroCode**: Small macOS UX feature, `P3`, `accepted` — likely in a near-term release.
- **#10150 (PR)** — Accept paste during active turns: small UX fix, very likely to land soon.

Prediction: The next release (v0.9.0) will include the SOP permission contract (#9598), session-persistence ownership (#9600), and WhatsApp fail-closed behavior (#9397). The WASM plugin architecture (#10076) is likely v0.10+.

---

## 7. User Feedback Summary

- **Session frustration (high signal)**: "#10141" — "It's quite frustrating to get into previous session." Users want easier session copy, navigation, and management. This is now a tracked feature area.
- **Windows is a second-class citizen**: The 74-test failure (#7462) and desktop installer crash (#9290) both indicate Windows users are experiencing degraded or blocked workflows.
- **Config authoring gap**: #9828 (PR) notes that agents today reach for raw `echo > config.toml`; the project is building approved tooling to close this gap — a sign users are pushing agents to do more complex tasks.
- **Telegram UX**: PR #8955 (media group batching) and #10064 (self-destruct approval cards) address real-world Telegram interaction pain points.

Overall, community sentiment is engaged but impatient — there's a clear desire for more polished UX (sessions, input handling) and more robust cross-platform behavior.

---

## 8. Backlog Watch

Items needing maintainer attention:

- **#6165 — Lighter core RFC** (April): 16 comments, `needs-maintainer-review`. This architectural vision has been open for 4 months. Needs a decision on whether to drive this forward or defer.
- **#7462 — Windows test failures** (June): P1, `accepted`. The fix is straightforward (add Windows CI job), but has been open for 2 months. The longer this sits, the more regressions accumulate.
- **#9290 — Windows installer crash** (July): S1 bug, open. No linked fix PR. This blocks real users on Windows.
- **#10122 — Release tools perf PR** (new): `risk:high` CI change. Needs prompt review to unblock release pipeline improvements.
- **#9487 — Session RFC** (July): The most-commented issue. Needs a maintainer decision; it's the linchpin for a large number of dependent PRs.

**Health assessment**: ZeroClaw is architecturally ambitious, well-governed (RFC process, risk labels, trackers), and heavily contributed to by a core group of "distinguished contributors." The main risks are (a) an ever-growing queue of high-risk open PRs (at least 15 `risk:high`), (b) Windows parity debt, and (c) the need to convert strong RFC proposals into shipped code without stalling.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*