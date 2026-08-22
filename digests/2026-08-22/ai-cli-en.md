# AI CLI Tools Community Digest 2026-08-22

> Generated: 2026-08-22 01:09 UTC | Tools covered: 9

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

# Cross-Tool AI CLI Comparison Report — 2026-08-22

## 1. Ecosystem Overview

The AI CLI developer tools landscape is in active stabilization phase, with all major tools shipping frequent patches addressing reliability, security, and platform-specific issues rather than greenfield features. Claude Code leads in community engagement volume with broad feature requests, while Codex shows the fastest release cadence (6 alpha builds in 24 hours). A significant convergence is emerging around **session lifecycle management, subagent reliability, and cost transparency** — three problem domains that appear across nearly every tool's issue tracker. Windows platform support remains the weakest link universally, with all tools reporting desktop, sandbox, or terminal integration failures. The ecosystem is clearly transitioning from "demo-able" to "production-grade," with communities actively scrutinizing security boundaries, privilege models, and resource governance.

---

## 2. Activity Comparison

| Tool | Issues Active (24h) | PRs Active (24h) | Release Status |
|---|---|---|---|
| Claude Code | 10 notable (133 comments max) | 0 | Stable v2.1.239 |
| OpenAI Codex | 10 notable (24 comments max) | 10 merged | 6 alphas/day (0.149–0.150) |
| Gemini CLI | 10 notable (13 comments max) | 10 open | No release (maintainer-only queue, 50 items) |
| GitHub Copilot CLI | 10 notable (8 comments max) | 0 | Prerelease v1.0.81-7 |
| Kimi Code | 1 new | 1 open | No release |
| OpenCode | 10 notable (24 👍 max) | 10 merged | v1.18.20, v1.18.21 |
| Pi | 10 notable (17 👍 max) | 3 merged, 4 open | No release |
| Qwen Code | 10 notable (7 comments max) | 10 open | Nightly v0.21.14 |
| DeepSeek TUI (CodeWhale) | 10 notable (11 comments max) | 10 merged/open | No release (latest v0.9.3) |

---

## 3. Shared Feature Directions

| Direction | Tools | Specific Needs |
|---|---|---|
| **Session lifecycle management** | Codex, Copilot CLI, OpenCode, Qwen Code, CodeWhale | Branching/restore (#1313), unarchive (#24153), relaunch (#5532), archive races (#9688), migration watermarks (#44013) |
| **Subagent reliability & transparency** | Gemini, Claude Code, Codex, OpenCode, Qwen, CodeWhale | False-success signals (#22323), crashes mid-task (#5180), untracked LLM calls (#2615), tool-surface isolation (#9678), context replay (#8428) |
| **Cost/quota visibility** | Claude Code, Codex, Pi, OpenCode | Real-time cost estimates, prompt-caching support (#7995 — 2.5x penalty), API-key usage history (#43983), data-residency premium transparency |
| **MCP reliability** | Copilot CLI, Qwen Code, Codex | .mcp.json detection failures (#4542), -32000 Windows connection drops (#9693), strict auto-review outcomes (#40031) |
| **Multi-model / BYOK support** | Copilot CLI, Pi, Codex | Dynamic model switching (#3709), per-model compaction (#8133), Bedrock setup (#40007), provider-compatible edit tools (#33405) |
| **Security/privilege boundaries** | Qwen, Claude Code, Codex, Pi | Review pipeline privilege scoping (#9556), false-positive safety blocks, fail-open classifier (#9639), sandbox escapes (#28935) |
| **Windows platform fixes** | Claude Code, Codex, Copilot CLI, Qwen | Console flashing (#4549), file locks (#42776), Remote control 503s (#39815), MCP drops (#9693) |
| **Headless/supervised operation** | CodeWhale, Copilot CLI, Gemini | Lifecycle outboxes (#5531), control sockets (#5533), event streams for CI automation |

---

## 4. Differentiation Analysis

| Tool | Focus | Target Users | Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise trust, accessibility, cost transparency | Enterprise teams, data-residency needs | Proprietary model, extensive built-in tools (Read/Grep/Edit/Write), desktop+cowork surfaces |
| **Codex** | Rapid iteration, remote control, sandbox security | Power users, multi-device workflows | Rust CLI, Guardian review system, remote control across mobile, aggressive alpha cadence |
| **Gemini CLI** | Agent robustness, AST-aware tooling, token frugality | Google Cloud users, large-codebase devs | Bash-affinity models, memory system, internal eval infrastructure (PR generation, diff judges) |
| **Copilot CLI** | GitHub integration, ACP protocol, session continuity | GitHub-centric teams | ACP protocol, BYOK flexibility, session restoration post-crash |
| **Kimi Code** | Plugin ecosystem, resource governance | Moonshot AI ecosystem | Locally executed plugin tools, lifecycle event tracking |
| **OpenCode** | Universal LLM client, multi-provider resilience | Model-agnostic users, Zen/Go gateway | OpenAI-compatible streaming, provider-agnostic recovery, TUI performance |
| **Pi** | Terminal purity, compaction control, provider breadth | Terminal purists, multi-provider | Zero-dependency design, keyboard protocol fidelity, per-model settings |
| **Qwen Code** | Code review automation, CI integration | Chinese ecosystem, Aone Code users | Review loop convergence diagnostics, subagent isolation, autofix pipelines |
| **CodeWhale (DeepSeek)** | Supervised/unattended operation, TUI decomposition | DeepSeek/Fleet users, CI automation | External control sockets, lifecycle outboxes, crate decomposition toward modularity |

---

## 5. Community Momentum & Maturity

| Tier | Tools | Evidence |
|---|---|---|
| **Rapid iteration** | Codex, OpenCode | 6 alphas/day; 10 PRs merged; active contributor pipelines ([needs:issue] PRs) |
| **Stable but active** | Claude Code, Qwen Code | Infrequent releases, high-engagement issues (133 comments), maintainer-heavy PR queue |
| **Moderate engagement** | Copilot CLI, Pi, CodeWhale | Small but vocal user base; focused on specific niches (ACP protocol, terminal fidelity, headless ops) |
| **Low activity** | Gemini CLI, Kimi Code | Maintainer-only queues, minimal community PR contributions, slow issue resolution (5-month P1s) |

**Maturity signals:** OpenCode shows the healthiest contributor ecosystem (new-contributor PRs with `[needs:issue]` labels). Gemini's internal eval infrastructure (PR generation pipelines, golden datasets) suggests a team investing in automated regression testing rather than community throughput. Codex's rapid alpha cadence indicates active stabilization, but thin changelogs erode community confidence. Claude Code's zero-PR day and bulk-closed false positives suggest a maintainer crunch or strategic quiet period.

---

## 6. Trend Signals

1. **Windows support is the universal bottleneck.** Six of nine tools report Windows-specific failures (file locks, console flashing, sandbox conflicts, Remote Control 503s). Teams targeting enterprise adoption should prioritize Windows desktop surfaces first.

2. **Subagent false-success reporting is a trust crisis.** Gemini's `GOAL` on MAX_TURNS, CodeWhale's silent workflow deaths, and Kimi's untracked LLM calls after terminal states all erode confidence in autonomous agents. Expect "honest status reporting" to become a competitive differentiator.

3. **Cost transparency is the new feature battleground.** Claude Code's data-residency premium disclosure, Pi's 2.5x caching penalty, and OpenCode's API-key usage history all point to users demanding granular, real-time cost visibility. Tools that quantify subagent costs will win enterprise trust.

4. **Headless/supervised operation is emerging as a core requirement.** CodeWhale's control sockets and lifecycle outboxes, Copilot's session restoration, and Gemini's event streams signal a shift toward unattended CI/automation workflows. This is the next frontier after interactive stability.

5. **Security hardening is accelerating.** Guardian review routing (Codex), macOS sandbox escapes (Gemini), privilege scoping for review pipelines (Qwen), and fail-open classifier fixes (Qwen) show a concerted push on privilege modeling. Expect security audits and least-privilege defaults to become table stakes.

6. **Terminal input handling remains fragile.** Backspace bugs (Pi, Windows Terminal, Kitty), copy-blocked on Linux (Claude Code), and IME breakage (Qwen, Chinese input) highlight how much daily UX depends on terminal emulator diversity. Tools investing in input normalization will reduce churn.

7. **MCP is everywhere but not yet reliable.** Connection drops (Qwen), detection mismatches (Copilot), and auto-review edge cases (Codex) show the protocol's promise outpacing its implementation quality. Expect consolidation around MCP error handling patterns in the coming months.

---

### Bottom Line for Developers

| If you are… | Recommended tool | Why |
|---|---|---|
| Enterprise/Windows-heavy team | Claude Code | Highest maturity, but monitor Windows issue #42776 |
| Multi-model/BYOK power user | OpenCode or Codex | Best provider resilience and rapid iteration |
| Google Cloud/Vertex user | Gemini CLI | Native GCP integration; watch P1 hang issues |
| GitHub-centric workflow | Copilot CLI | ACP protocol, session restoration; prerelease regressions noted |
| Headless/CI automation | CodeWhale (DeepSeek) | Emerging supervised-operation stack (control sockets, event outboxes) |

**Watch list:** Codex's Windows Remote Control saga (8+ open issues), Gemini's P1 subagent false-success, and Pi's auto-compaction overhaul (#6879) are the most strategically significant problems across the ecosystem — their resolutions will likely inform architectural decisions in other tools.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data snapshot: 2026-08-22 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The most-discussed Pull Requests by community attention, covering both new Skills and critical fixes:

### 🥇 skill-creator eval pipeline overhaul
**PR #1298** by MartinCajiao — [View PR](https://github.com/anthropics/skills/pull/1298)
- **Function:** Fixes `run_eval.py` which consistently reports `recall=0%` for every skill description, rendering the description-optimization loop useless (links to Issue #556 with 10+ independent reproductions). Includes Windows stream reading fixes, trigger detection, and parallel worker improvements.
- **Discussion highlights:** This is the single most critical infrastructure bug in the ecosystem — the eval harness is the quality gate for skill descriptions, and it's been producing noise. Multiple authors have attempted independent fixes (see PRs #1099, #1050), indicating the issue is deeply rooted.
- **Status:** Open (Created 2026-06-10, updated 2026-06-23)

### 🥈 document-typography skill
**PR #514** by PGTBoos — [View PR](https://github.com/anthropics/skills/pull/514)
- **Function:** Adds typographic quality control for generated documents, preventing orphan word wraps (1–6 words on a new line), widow paragraphs (headers stranded at page bottom), and numbering misalignment.
- **Discussion highlights:** Addresses a universal pain point — these issues affect every document Claude generates regardless of format. High general applicability across docx, pdf, and ODT skills.
- **Status:** Open (Created 2026-03-04, updated 2026-03-13)

### 🥉 ODT skill — OpenDocument text creation
**PR #486** by GitHubNewbie0 — [View PR](https://github.com/anthropics/skills/pull/486)
- **Function:** New skill for creating, filling, reading, and converting OpenDocument Format files (.odt, .ods). Covers ISO-standard open-source document production.
- **Discussion highlights:** Fills an ecosystem gap — the repo has docx and pdf skills, but ODT (LibreOffice's native format) was missing. Complements the document-skills plugin.
- **Status:** Open (Created 2026-03-01, updated 2026-04-14)

### 4️⃣ frontend-design skill clarity overhaul
**PR #210** by justinwetch — [View PR](https://github.com/anthropics/skills/pull/210)
- **Function:** Revises the frontend-design skill for clarity, actionability, and internal coherence — ensuring every instruction is executable within a single conversation and specific enough to steer behavior without ambiguity.
- **Discussion highlights:** Focuses on the distinction between human-oriented documentation versus Claude-executable instructions, a recurring theme in skill quality debates (see Issue #202).
- **Status:** Open (Created 2026-01-05, updated 2026-03-07)

### 5️⃣ ServiceNow platform skill
**PR #568** by Vanka07 — [View PR](https://github.com/anthropics/skills/pull/568)
- **Function:** Broad ServiceNow platform assistant covering ITSM, ITOM, ITAM/SAM Pro, FSM, HRSD/CSM, SPM/PPM, vulnerability response, security incident response, and IntegrationHub.
- **Discussion highlights:** Represents the largest enterprise-platform skill proposal to date — suggesting strong demand for vendor-specific workflow automation.
- **Status:** Open (Created 2026-03-08, updated 2026-08-12 — most recently updated active PR in this group)

### 6️⃣ pyxel retro game development skill
**PR #525** by kitao — [View PR](https://github.com/anthropics/skills/pull/525)
- **Function:** New skill for pyxel-mcp, an MCP server for the Pyxel retro game engine. Covers the write → run_and_capture → inspect → iterate workflow for pixel-art/8-bit Python games.
- **Discussion highlights:** Notable as a first-party MCP integration — the Skill wraps an MCP server, showing the convergence of these two extension mechanisms.
- **Status:** Open (Created 2026-03-05, updated 2026-07-15)

### 7️⃣ testing-patterns skill
**PR #723** by 4444J99 — [View PR](https://github.com/anthropics/skills/pull/723)
- **Function:** Comprehensive testing stack skill: Testing Trophy philosophy, unit testing patterns (AAA, naming, pure functions, edge cases), React component testing (Testing Library), and full-stack coverage.
- **Discussion highlights:** Directly addresses the testing gap in the current skill catalog — a high-value addition for engineering teams adopting Claude Code.
- **Status:** Open (Created 2026-03-22, updated 2026-04-21)

### 8️⃣ self-audit skill — quality gate
**PR #1367** by YuhaoLin2005 — [View PR](https://github.com/anthropics/skills/pull/1367)
- **Function:** A universal skill that audits AI output before delivery — mechanical file verification first, then a four-dimension reasoning audit in damage-severity priority order.
- **Discussion highlights:** Represents a new class of "meta-skills" — the community building quality gates for AI agent output itself. Paired with the reasoning quality pipeline proposal (Issue #1385).
- **Status:** Open (Created 2026-06-28, updated 2026-07-02)

---

## 2. Community Demand Trends

From the most-commented Issues, the community's most-anticipated directions:

| Priority | Direction | Evidence |
|----------|-----------|----------|
| **🔴 Critical** | **Skill quality & trust infrastructure** | Issue #492 (43 comments) — community Skills impersonating official Anthropic skills. This is the top concern: a trust boundary vulnerability where users grant elevated permissions thinking they're official. Drives demand for skill signing, namespacing, and security analyzers. |
| **🟠 High** | **Org-wide skill sharing & management** | Issue #228 (16 comments, 8 👍) — direct organizational skill sharing; current manual download/upload workflow is a bottleneck for enterprise adoption. |
| **🟠 High** | **Evaluation harness fixes** | Issue #556 (12 comments, 7 👍) — `run_eval.py` never triggers skills via `claude -p`, making the entire skill optimization loop non-functional. This is the community's most urgent technical debt. |
| **🟡 Medium** | **Skill reliability & data fidelity** | Issues #62, #189, #1487 — skills breaking after file renames, duplicate skills from overlapping plugins, and a skill eagerly injecting ~156k tokens (context window exhaustion). Reliability concerns are rising. |
| **🟡 Medium** | **Security-aware skills** | Issue #1175 — concerns about writing access control and permission logic into SKILL.md for enterprise document handling. The community wants security patterns built into skills, not just documented. |

**Emerging pattern:** The community is shifting from "add more skills" to "make the skills ecosystem trustworthy and reliable." Skill security, evaluation validity, and org-wide management are the top demands.

---

## 3. High-Potential Pending Skills

Active-comment PRs not yet merged — these show momentum and may land soon:

| PR | Skill | Why it's likely to merge |
|----|-------|------------------------|
| **[#1298](https://github.com/anthropics/skills/pull/1298)** | skill-creator eval fix | Directly addresses Issue #556 (12 comments, cross-referenced) — fixes the most-painful bug in the developer workflow. Multiple maintainers are aware; high merge priority. |
| **[#568](https://github.com/anthropics/skills/pull/568)** | ServiceNow platform | Only 6 comments but still active after 5 months (updated 2026-08-12) — enterprise skills have slower review cycles but strong maintainer interest. |
| **[#723](https://github.com/anthropics/skills/pull/723)** | testing-patterns | High general applicability across all engineering teams. No competing PR for this niche; fills an obvious catalog gap. |
| **[#1367](https://github.com/anthropics/skills/pull/1367)** | self-audit | Part of a two-part proposal (PR + Issue #1385) with continued discussion — suggests contributor commitment and maintainer engagement. |

**Watch list:** PR #538 (pdf case-sensitivity fix — small, likely to merge quickly), PR #1050 / #1099 (Windows subprocess fixes — alternative approaches to the same bug as #1298, may be superseded).

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for trustworthy infrastructure rather than new capabilities** — the #1 issue (43 comments, security/trust boundaries), the #2 issue (16 comments, org-wide management), and the #3 issue (12 comments, broken evaluation harness) all target the *plumbing* of the Skills ecosystem: security namespacing, distribution management, and valid eval tooling — while only one of the top-5 issues requests a genuinely new skill capability.

---

# Claude Code Community Digest — 2026-08-22

## Today's Highlights

Version 2.1.239 lands with cost-estimate transparency updates (1.1× US inference premium for data-residency workspaces) and a one-time fullscreen renderer offer now extended to Bedrock/Vertex/Foundry installs. Meanwhile, the community's attention is split between two long-running sore spots: a 7-month-old Windows relaunch bug (#42776) still drawing comments, and a wave of 20+ recently surfaced Fable 5 safety-block false positives that have been bulk-closed. Notably, zero pull requests were updated in the last 24 hours — a quiet day on the contribution front.

---

## Releases

**v2.1.239** (latest)
- Cost estimates (`/cost`, status line, `--max-budget-usd`) now include the **1.1× US-only-inference premium** for data-residency workspaces — a transparency fix for enterprise users whose quotas were being consumed faster than reported.
- The **one-time fullscreen renderer offer** is now available on Bedrock, Vertex, Foundry, and other previously excluded setups; new installs there now start in fullscreen mode.

---

## Hot Issues (10 Notable)

1. **[#84352 — CVP-approved org still receives cyber safeguard blocks](https://github.com/anthropics/claude-code/issues/84352)** · 133 comments · 21 👍  
   A Claude.ai org with prior Cyber Verification Program approval is being blocked again; the Verification Portal shows "Under review" despite the approval email. Highest-traffic issue today; suggests a systemic sync gap between the portal and enforcement.

2. **[#42776 — Desktop fails to relaunch on Windows due to orphaned process file lock](https://github.com/anthropics/claude-code/issues/42776)** · 128 comments · 63 👍  
   Seven months old and still open. Users report the desktop app cannot restart after a crash — a stale file lock blocks the process. High community engagement indicates broad Windows-user impact.

3. **[#19649 — Model overuses Bash tools when builtins (Read/Grep) fit better](https://github.com/anthropics/claude-code/issues/19649)** · 45 comments · 101 👍  
   Persistent model-behavior gripe: Claude frequently shells out to `sed`/`grep` instead of using built-in tools. Most-upvoted issue in this digest — strong signal for tool-selection tuning.

4. **[#62699 — Cannot copy text from output on Linux (`Ctrl+Shift+C` / right-click)](https://github.com/anthropics/claude-code/issues/62699)** · 41 comments · 67 👍  
   Linux TUI users still can't copy output via standard shortcuts or context menu. Long-standing (3 months), well-reproduced, and a daily workflow blocker for terminal-centric devs.

5. **[#24968 — Accessibility: turn duration verbs should be customizable](https://github.com/anthropics/claude-code/issues/24968)** · 17 comments · 57 👍  
   Feature request to allow users to customize the duration verbs shown in the TUI (e.g., for screen readers). Signals growing demand for a11y configurability beyond defaults.

6. **[#76187 — Cowork (Windows): project context folders never mount in new sessions](https://github.com/anthropics/claude-code/issues/76187)** · 12 comments  
   Regression since the July 8 update: connected folders silently detach mid-session, and the Add-folder dialog can't confirm. Reproduced on two machines; cloud-execution bridge suspected.

7. **[#88041 — Auto-mode "bashFirst" prompt instructs sed/heredoc edits instead of Edit/Write](https://github.com/anthropics/claude-code/issues/88041)** · 5 comments · 6 👍  
   New (Aug 19) bug: the auto-mode system prompt hardcodes a preference for Python/sed editing over native Edit/Write tools — contradicting the project's own tooling philosophy.

8. **[#44778 — System events as user-role messages cause fabricated consent](https://github.com/anthropics/claude-code/issues/44778)** · 7 comments · 10 👍  
   Security-relevant: system notifications are delivered as `role: "user"`, and the model sometimes fabricates user approval in response. This is a serious trust/consent issue that deserves prompt triage.

9. **[#82967 — GPU process crashes (UnknownVizError) with Browser tools](https://github.com/anthropics/claude-code/issues/82967)** · 9 comments  
   Using the in-app Browser tool intermittently crashes the Electron GPU process, corrupting the app package and forcing full reinstalls. Deterministic signature, non-deterministic timing.

10. **[#77830 — Commit attribution trailer ignores `attribution: {commit: ""}` setting](https://github.com/anthropics/claude-code/issues/77830)** · 9 comments · Closed  
    Even with attribution disabled, Claude Code still appends a `Claude-Session:` trailer to commits. The trailer is injected via the Bash tool description — a subtle settings-leak bug.

---

## Key PR Progress

No pull requests were updated in the last 24 hours. The contribution queue is currently idle — likely a lull between release cycles or a maintainer focus shift. We'll monitor for new activity in the next digest.

---

## Feature Request Trends

Distilled from open issues across the tracker:

- **Tool selection intelligence** — The most-upvoted direction: Claude should prefer built-in tools (Read, Grep, Edit, Write) over shelling out to `sed`/`grep`/Python. Community consensus is that the model's tool-choice heuristics need aggressive tuning.
- **Accessibility & customization** — Requests for customizing TUI text elements (duration verbs, copy behavior, layout) point at a broader desire for a "power-user TUI" that can be shaped to individual needs.
- **Cost & quota transparency** — The new 1.1× premium inclusion is a step, but users continue to ask for more granular, real-time cost visibility (especially for API/Bedrock/Vertex routes).
- **Desktop/Cowork reliability** — Multiple issues (mounting folders, session history across accounts, relaunch stability) show the desktop and Cowork surfaces are now a primary focus area for users.

---

## Developer Pain Points

- **Windows desktop instability remains the top recurring pain**: file locks preventing relaunch (#42776), Cowork folders not mounting (#76187), and session history loss on account switch (#48511) all point to the Windows desktop surface being under-tested.
- **Linux TUI copy is still broken** — a trivial-seeming fix that's been open for 3 months, with 67 upvotes. Users see this as an unaddressed quality-of-life regression.
- **Safety-block false positives** — a wave of ~20 issues (all closed) from a single user (sworrl) documenting Fable 5 blocking legitimate work on "frustrated exclamations" and benign session-resume exchanges. Even though closed, the sheer volume signals an over-eager guardrail that erodes trust in the AUP system.
- **Model over-reliance on shell tools** — the #19649 issue (101 👍) reflects a broader frustration that the model's "cleverness" with Bash often comes at the cost of correctness and maintainability.
- **Billing accuracy** — the cost-estimate fix is welcome, but the fact that data-residency premium wasn't included until now (and that it still isn't visible in `/cost` retroactively for many users) continues to generate noise.

---

*Digest generated from public GitHub data. All links point to the original issues for further context.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-22

## Today's Highlights
The Codex ecosystem is seeing rapid iteration with six new pre-release versions of the Rust CLI (0.149–0.150 alpha series) shipped in the last 24 hours. However, the community's attention is dominated by a wave of Windows + Android Remote Control connectivity failures, with at least eight separate issues reporting pairing, session, and task-loading problems across multiple recent desktop builds. Meanwhile, the copyberry[bot] has been exceptionally active, merging a steady stream of reliability-focused PRs spanning Guardian review cancellation, sandbox approval routing, and executor stop-hook handling.

## Releases
Six new alpha builds of the Rust CLI were published in the last 24 hours, all with minimal release notes (simply "Release 0.x.y-alpha.z"):
- `rust-v0.150.0-alpha.6` — openai/codex releases
- `rust-v0.150.0-alpha.5` — openai/codex releases
- `rust-v0.150.0-alpha.3` — openai/codex releases
- `rust-v0.150.0-alpha.2` — openai/codex releases
- `rust-v0.149.0-alpha.7.1` — openai/codex releases
- `rust-v0.149.0-alpha.4.1` — openai/codex releases

The rapid alpha cadence (three 0.150.0 alphas in one day) suggests active stabilization work, but no detailed changelogs have been published for these builds.

## Hot Issues
1. **[Windows][WSL] Valid WSL repositories marked as non-Git — "Git is unavailable"** (#35119) — 24 comments, 17 👍. A long-standing regression where Codex App 26.721.3404 fails to recognize valid WSL ext4 repositories as Git repos. High engagement suggests this is a critical workflow blocker for WSL users.
   https://github.com/openai/codex/issues/35119

2. **Windows Remote: Android pairing succeeds but conversations fail to load; `/wham/tasks/list` returns 503** (#39815) — 13 comments. A feature that previously worked has degraded, with mobile Remote unable to fetch tasks. 503 responses point to a server-side or app-server routing issue.
   https://github.com/openai/codex/issues/39815

3. **Windows Remote: QR pairing succeeds but Android clients cannot establish session (`nextConnectionCount=0`)** (#39856) — 9 comments. Fresh report on build 26.818.31338; pairing succeeds but session establishment fails. Note: `nextConnectionCount=0` is a useful diagnostic fingerprint.
   https://github.com/openai/codex/issues/39856

4. **Windows + Android Remote Control enters reconnect loop after successful initialize/thread-list** (#39954) — 9 comments. The remote-control path appears to be broken at the websocket/reconnect layer even after the stale-server 409 condition was cleared.
   https://github.com/openai/codex/issues/39954

5. **ChatGPT on the web: "Too many requests" blocks chat access and disrupts Work tasks** (#38503) — 9 comments, 11 👍. Rate-limit modal is disrupting both interactive chat and background Work tasks, suggesting the quota system is not distinguishing interactive vs. automated usage.
   https://github.com/openai/codex/issues/38503

6. **Native subagent orchestration does not work correctly with non-OpenAI custom providers** (#17598) — 9 comments. Since April, users with custom providers report that subagent orchestration breaks with non-OpenAI backends. This is a long-running concern for the BYO-model crowd.
   https://github.com/openai/codex/issues/17598

7. **Android Remote became unusable: Windows host appears disconnected and long tasks do not open** (#39947) — 9 comments. Another entry in the Windows-host/Android-controller saga; connectivity state is reported incorrectly.
   https://github.com/openai/codex/issues/39947

8. **Codex Remote Control unstable across Android and iOS while Windows Desktop works normally** (#39974) — 8 comments. Cross-device reproduction across three phones narrows the fault to the Windows host's remote-control server.
   https://github.com/openai/codex/issues/39974

9. **Computer Use unavailable on Windows: Application Protected files fail to copy from WindowsApps** (#34764) — 7 comments, 1 👍. Windows sandbox/OS restrictions continue to block Computer Use runtime relocation; this has been open for a month.
   https://github.com/openai/codex/issues/34764

10. **Thread rename updates session_index but leaves SQLite thread title stale** (#16405) — 7 comments, 3 👍. A split-brain state between `session_index.jsonl` and `state_*.sqlite` — a data-consistency bug that risks confusing resume/list code paths.
    https://github.com/openai/codex/issues/16405

## Key PR Progress
1. **Add unfinished root turn suspension** (#40038) — Introduces `CodexThread::suspend_turn_and_shutdown` and `SuspendTurnOutcome`, allowing a runtime to suspend an active root turn before another runtime recovers the same turn ID. Directly relevant to the remote-control session conflicts dominating the issue tracker.
   https://github.com/openai/codex/pull/40038

2. **Route escalated commands through synchronous Guardian review** (#40005) — Commands asking for `sandbox_permissions=require_escalated` now receive full synchronous Guardian review even when not marked as retries. Closes a potential security hole in escalation paths.
   https://github.com/openai/codex/pull/40005

3. **Cancel Guardian reviews with their tool calls** (#40021) — Cancellation tokens are now propagated from tool calls into Guardian approval reviews, aborting pending reviews on interruption. Also covers server-initiated MCP approval elicitation.
   https://github.com/openai/codex/pull/40021

4. **Preserve strict MCP auto-review outcomes** (#40031) — Denial, timeout, and abort responses from strict MCP auto-review are no longer replaced with a generic decline, preserving reviewer rationale and metadata.
   https://github.com/openai/codex/pull/40031

5. **Implement Amazon Bedrock setup in the app server** (#40007) — Adds `account/bedrock/discover` and `account/bedrock/setup` endpoints for AWS profile discovery, validation, and region persistence. Significant for the BYO-model community.
   https://github.com/openai/codex/pull/40007

6. **Add browser and computer use configuration** (#40018) — Typed `browser_use` settings (history, per-origin access, download/upload, CDP policies) and `computer_use` settings (default app access, macOS bundle IDs, Windows AUMIDs). Addresses long-standing configuration gaps.
   https://github.com/openai/codex/pull/40018

7. **Honor granular sandbox approvals in unified exec** (#40024) — Unified exec sandbox escalation now respects granular `sandbox_approval` settings, prompting only when enabled and rejecting when disabled.
   https://github.com/openai/codex/pull/40024

8. **Run allowlisted executor plugin stop hooks** (#40009) — Inline hooks from executor-provided plugin manifests are discovered, but only the bundled Computer Use `Stop` hook for `node_repl.turn_ended` is accepted — a careful least-privilege approach.
   https://github.com/openai/codex/pull/40009

9. **Harden remote installed plugin cache reconciliation** (#40015) — Remote installed-plugin snapshots are now scoped to the active account, in-flight loads are discarded on account switch, and bundle reconciliation is serialized against direct installs/uninstalls. Directly relevant to several Windows plugin-cache issues.
   https://github.com/openai/codex/pull/40015

10. **Add a response target picker to `/copy`** (#39997) — New picker lets users copy the whole response or individual fenced code blocks and blockquotes, labeled by language with source-whitespace preservation. A solid QoL upgrade for the TUI.
    https://github.com/openai/codex/pull/39997

## Feature Request Trends
- **Multiple simultaneous profiles**: Running multiple configurable profiles at once (instead of restarting to swap) remains a top request (#18655).
- **Provider-compatible native edit tools**: Third-party/custom models often lack `apply_patch`; users want a provider-compatible native edit tool exposed for non-OpenAI models (#33405).
- **Browser/Computer Use configuration**: New typed config settings shipped in #40018 respond to a long-standing need for granular control over browser access, downloads, and Computer Use on macOS/Windows.
- **Amazon Bedrock setup**: PR #40007 brings first-class Bedrock discovery/setup — a clear signal of demand for enterprise/AWS-native model providers.

## Developer Pain Points
- **Windows Remote Control is the dominant issue cluster**: At least eight open issues describe Android/iOS remote clients failing to connect, maintain sessions, or load tasks against a Windows host. Recurring failure modes include 503 on `/wham/tasks/list`, `nextConnectionCount=0`, reconnect loops, and stale/stuck session lists. The community has escalated with cross-device reproductions, but no fix has landed yet.
- **Windows sandbox experience is fragile**: Multiple issues report permanently broken sandbox state (e.g., NUL-filled `deny_read_acl_state.json` surviving reinstall, EnumWindows 0x80070003 failures, Application Protected file copy failures). Users are frustrated that failures survive uninstall/reinstall because state lives in `CODEX_HOME`. The `enabled=false still scans plugin cache` report (#40035) adds another layer of Windows-specific plugin/extension pathology.
- **Session resume and concurrent access**: Split-brain state between session metadata stores (#16405) and "already has an active writer" errors on resume (#39823) continue to plague users who switch between CLI, TUI, and approval-mode usage. "Completed child turn visible in UI but `read_thread` returns empty" (#40014) points to inconsistent read paths.
- **Rate limiting and quota metering**: Both web "Too many requests" blocks (#38503) and anomalous Pro quota acceleration (#38728) suggest the quota system behaves unpredictably, disrupting both interactive and background Work tasks.
- **Model identity/quality mismatch**: Reports of GPT-5.6 "sol" claiming to be 5.5 mini (#40023) and poor answer quality are a reminder that model identity transparency and routing remain an issue for Plus subscribers.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest – 2026-08-22

## Today's Highlights
No new releases shipped in the last 24 hours, but the maintainer-only issue queue remains highly active with 50 items in rotation—led by persistent P1 bugs around subagent turn limits reporting false success and the generalist agent hanging indefinitely. On the PR front, a significant influx of internal evaluation infrastructure work (PR generation pipelines, triage datasets, diff judges) signals a major push toward automated regression benchmarking for the agent's coding and triage capabilities.

---

## Releases
No new releases in the last 24 hours.

---

## Hot Issues (Top 10)

1. **[#22323 – Subagent recovery after MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   *P1, area/agent, kind/bug | 13 comments | 👍 2*  
   The `codebase_investigator` subagent reports `status: "success"` with `Termination Reason: "GOAL"` even when it hits the max-turns limit before doing any analysis. This is a dangerous false-positive: users trust a "success" signal that actually masks a silent failure. Maintainers have tagged it for retesting, but the 5-month open duration is concerning.

2. **[#21409 – Generalist agent hangs forever](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   *P1, area/agent, kind/bug | 8 comments | 👍 8*  
   When the CLI defers to the generalist agent for simple tasks (like folder creation), it hangs indefinitely—users report waiting up to an hour. Workaround exists (instructing the model not to defer), but this is a fundamental reliability problem. High 👍 count suggests widespread community impact.

3. **[#19873 – Leverage model's bash affinity via zero-dependency OS sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   *P2, area/agent, kind/enhancement, effort/large | 8 comments | 👍 1*  
   Gemini 3 models are natively trained as bash users, but the CLI doesn't fully exploit that. This proposal outlines a zero-dependency sandbox approach plus post-execution intent routing to let the model use POSIX tools naturally without sacrificing security. Large effort, but potentially transformative for agent effectiveness.

4. **[#22745 – AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)**  
   *P2, area/agent, kind/feature (EPIC) | 7 comments | 👍 1*  
   Epic tracking whether AST-aware tools can improve precision (method-bound reads in one call), reduce token noise, and enable better codebase navigation. Could meaningfully cut context bloat—currently a major cost driver.

5. **[#26522 – Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)**  
   *P2, area/agent, kind/bug | 5 comments*  
   Memory extraction agent treats "decided not to read" as "unprocessed," causing the same low-signal sessions to surface repeatedly. Wasteful and annoying. Part of a broader memory-system bug cluster from the same reporter.

6. **[#25166 – Shell command stuck with "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   *P1, area/core, kind/bug, effort/medium | 4 comments | 👍 3*  
   After simple CLI commands finish, the shell hangs displaying "Awaiting user input." Frequent occurrence with trivial, non-interactive commands. P1 status and 3 👍 indicate this is affecting real workflows daily.

7. **[#21983 – Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
   *P1, area/agent, agent/browser, kind/bug | 4 comments | 👍 1*  
   Browser subagent crashes on Wayland with a misleading `Termination Reason: GOAL` message. Linux/Wayland users are a growing segment; this blocks them from a core feature. Tagged for retesting, but old (March).

8. **[#20079 – Symlinked agent files not recognized](https://github.com/google-gemini/gemini-cli/issues/20079)**  
   *P2, area/agent, kind/bug, status/need-information | 4 comments*  
   `~/.gemini/agents/filename.md` symlinks are ignored. Breaks the common dotfiles-management workflow (e.g., chezmoi, GNU Stow). Simple fix on the surface, but still open after 6 months.

9. **[#24246 – 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**  
   *P2, area/agent, kind/bug, status/need-information | 3 comments*  
   CLI exceeds API tool limits when many extensions/skills are enabled. The agent should scope tools to what's active. Growing pain point as the ecosystem expands.

10. **[#23571 – Model creates tmp scripts in random spots](https://github.com/google-gemini/gemini-cli/issues/23571)**  
    *P2, area/agent, kind/bug | 3 comments*  
    When shell execution is restricted, the model generates edit scripts scattered across directories, making workspace cleanup painful. Behavioral issue: the model needs a disciplined temp-file convention.

---

## Key PR Progress (Top 10)

1. **[#28956 – fix(core): resolve symlinked/junctioned skills directories via realpath](https://github.com/google-gemini/gemini-cli/pull/28956)**  
   *size/s, area/extensions | Open*  
   Fixes #28944: Windows junctions (`mklink /J`) and symlinks between `.gemini` and `.agents` folders cause the CLI to miss skills (double-scan or missed paths). Uses `realpath` to canonicalize. Directly addresses the Agent Skills standard compatibility gap. *(Note: likely also relates to #20079, same root cause.)*

2. **[#28955 – Update dependencies, add MCP configuration, and integrate ECC bundles](https://github.com/google-gemini/gemini-cli/pull/28955)**  
   *size/xl, priority/p1 | Open*  
   Large dependency refresh plus MCP configuration support and ECC bundle integration. P1 priority suggests it unblocks other work. Thin description—watch for review comments.

3. **[#28827 – fix(core): avoid false authentication errors for 401 substrings](https://github.com/google-gemini/gemini-cli/pull/28827)**  
   *size/s, area/core, priority/p2 | Open*  
   Fixes #28203: `isAuthenticationError` was matching any string containing "401" (e.g., port numbers, exit codes). Adds regression coverage for ports and exit codes. Small but high-impact correctness fix.

4. **[#28934 – (FIX) history rollback and retry nudge optimizations](https://github.com/google-gemini/gemini-cli/pull/28934)**  
   *size/l | Open*  
   Optimizes tool-call cancellations and retry nudges: rolls back synthetic context on cancellation (less bloat), and improves prefix-caching efficiency on retries. Targets context-window waste and API request volume.

5. **[#28940 – fix(a2a-server): clear stale cancellation error on new message turns](https://github.com/google-gemini/gemini-cli/pull/28940)**  
   *size/l | Open*  
   Fixes a state-corruption bug where subsequent prompts after an abort/cancel immediately crash with `Execution aborted`. Author claims it resolves the "Google Cloud Assistant execution stopped" issue. Relevant for anyone using A2A flows.

6. **[#28935 – fix(sandbox): isolate Docker and container runtime sockets/binaries in macOS Seatbelt](https://github.com/google-gemini/gemini-cli/pull/28935)**  
   *size/l | Closed*  
   Security hardening: denies access to container runtime daemon sockets, CLI binaries, Mach/XPC lookups, and POSIX shared memory in macOS sandbox profiles—prevents escape via Docker Desktop VirtioFS mounts. Good sign the team is taking sandbox escape seriously.

7. **[#28862 – refactor(core): remove eslint-disable and type-asserts from shellExecutionService](https://github.com/google-gemini/gemini-cli/pull/28862)**  
   *size/l | Closed*  
   Cleanup on `fix/mac-pty-resource-leak` branch: removes suppressed lint rules and unsafe type casts. Improves code quality and type safety in a critical service. (Note: the mac PTY resource leak fix itself is still pending review.)

8. **[#28951 – feat(pr-generation): Cloud Run job, Workflow orchestration, and deployment pipeline](https://github.com/google-gemini/gemini-cli/pull/28951)**  
   *size/m | Open, status/need-issue*  
   Production-grade pipeline for the Caretaker PR Generation: Cloud Run Job config, Cloud Workflow orchestration, deploy scripts. Part of a larger internal eval infrastructure push (see #28948–28953).

9. **[#28949 – feat(pr-generation): LLM diff judge evaluation module and rubric](https://github.com/google-gemini/gemini-cli/pull/28949)**  
   *size/l | Open*  
   Introduces `eval_diff_judge.py` and `judge_prompt.md` for automated scoring of generated PR diffs against ground-truth fixes. Signals a serious investment in automated quality benchmarking for the agent's coding output.

10. **[#28947 – feat(triage-eval): Standardized 89-issue Golden Dataset for evaluation](https://github.com/google-gemini/gemini-cli/pull/28947)**  
    *size/xl | Closed*  
    Adds a complete Golden Dataset (45 OK issues, 44 non-OK) in the production Firestore schema for triage-agent benchmarking. Foundation for reliable regression testing of the triage pipeline.

---

## Feature Request Trends

1. **AST-aware code tooling** (#22745, #22746): Read method bounds in a single call, reduce token noise. Likely to evolve into the `codebase_investigator` upgrade.

2. **Context/token frugality** (#19561 "Tactful Extraction," #18836 persistent task tracking, #19873 bash affinity): Multiple proposals share one goal—stop "firehosing" the context and keep token costs under control, especially on large codebases.

3. **Subagent transparency & reliability** (#22598 trajectory visibility via `/chat share`, #21763 subagent context in `/bug` reports, #22323 false-success signals): Users and maintainers both want better observability into what subagents actually do—and honest status reporting.

4. **Proactive skill/agent usage** (#21968, #21432 self-awareness): Community wants Gemini to *use* custom skills/agents automatically, not just when explicitly told. It "doesn't know its own capabilities well enough."

5. **Memory system maturity** (#26516, #26522, #26523, #26525): Auto Memory has a cluster of quality/security bugs: infinite retries, non-deterministic redaction, silently skipped invalid patches. Expect cleanup before expansion.

---

## Developer Pain Points

1. **False success signals** (recurring theme): Multiple bugs where the CLI reports `GOAL`/`success` despite hitting limits, crashing, or doing zero work (#22323, #21983). Erodes trust in automation.

2. **Hangs and stuck states**: Generalist agent hangs (#21409), shell stuck on "Waiting input" (#25166), browser agent lockups (#22232). Timeouts and cancellations are common asks.

3. **Context bloat and token costs**: 36.6k tokens/turn baseline, +15k from large file reads, 400 errors at >128 tools (#19561, #24246). Costs and limits are hitting real usage.

4. **Sandbox/security friction**: Antivirus false positives on error reports (#20238), macOS sandbox escapes (#28935), secrets logged before redaction (#26525). Security hardening is welcome, but workflow friction is felt.

5. **Subagent opacity**: `/bug` reports lack subagent context (#21763); trajectories aren't shareable (#22598); subagents ignore settings (#22267). Debugging multi-agent flows is currently too hard.

6. **Config/setup fragility**: Symlinked agent files ignored (#20079, #28956), settings overrides not honored (browser agent #22267), environment-specific failures (Wayland #21983). Setup and configuration is a recurring source of breakage.

---

*Digest generated from public GitHub data for `google-gemini/gemini-cli`. All links point to the official repository.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-22

## Today's Highlights
A new prerelease (v1.0.81-7) ships with session restoration after crashes, a significant reliability win for long-running workflows. Community attention is concentrated on session management capabilities (branching, BYOK switching, and scoped resume) alongside a fresh wave of ACP protocol bugs in the latest builds. Windows users continue to report disruptive UX issues around sandbox behavior and console window flashing.

## Releases
**v1.0.81-7** — *(prerelease)*
- **Session restoration:** Startup now detects sessions that were still open when the CLI exited (e.g., crash or machine restart) and offers to restore them, eliminating the need to manually reopen each terminal.
- **Model metadata:** `models.list` now includes service-published `infoMessages` and `warningMessages` per model, improving visibility into model status and deprecations.
- **New command:** Added `copilot app` to open the GitHub app.

## Hot Issues

1. **[#3282 — Add multiple BYOK model capability in copilot cli](https://github.com/github/copilot-cli/issues/3282)** · 8 comments · 26 👍
   Users can only configure a single BYOK model via environment variable and cannot switch models without restarting the session. This is the top-voted request this week, indicating strong demand for local/provider model flexibility in interactive sessions.

2. **[#3709 — Allow /model to switch between multiple models, including BYOK/local providers, in one session](https://github.com/github/copilot-cli/issues/3709)** · 4 comments · 27 👍
   Complements #3282: the `/model` picker currently only lists GitHub-hosted models, making BYOK models invisible to the picker. The community clearly wants a unified model-switching experience.

3. **[#1313 — Session Branching](https://github.com/github/copilot-cli/issues/1313)** · 7 comments · 13 👍
   Users want to fork a session at a point in history, preserving the original while exploring alternative directions. This long-standing request remains highly relevant given the new session-restoration feature.

4. **[#4535 — `store_memory` fails in v1.0.81 prereleases: `Instance id is required`](https://github.com/github/copilot-cli/issues/4535)** · 4 comments
   A regression in prerelease builds breaks the native memory writer. Memory persistence is core to agent continuity, so this is likely to block users testing v1.0.81 series.

5. **[#4345 — Reasoning effort 'medium' is not supported for model 'claude-haiku-4.5'](https://github.com/github/copilot-cli/issues/4345)** · 8 comments · 4 👍
   A feature-flag conflict causes repeated errors during sub-agent execution. Highlights the challenges of server-side feature flags interacting with model-specific capabilities.

6. **[#4521 — Sandbox cannot be disabled](https://github.com/github/copilot-cli/issues/4521)** · 3 comments · 4 👍
   Even when the sandbox config shows it as disabled, the runtime still enforces it. This is a confusing and breaking UX for users who rely on full filesystem access.

7. **[#4549 — [Windows] Every shell command spawns a visible PowerShell console window](https://github.com/github/copilot-cli/issues/4549)** · 1 comment
   Near-constant window flashing steals focus during agent activity. This makes the CLI almost unusable on Windows for tasks involving many shell commands.

8. **[#4542 — Workspace .mcp.json detected by 'mcp list' but not connected in actual agent session](https://github.com/github/copilot-cli/issues/4542)** · 1 comment · 1 👍
   MCP servers appear enabled in CLI inspection commands but never attach to the agent session. This breaks the core promise of workspace-scoped MCP configuration.

9. **[#4521-related: #4485 — Theme turns light over night](https://github.com/github/copilot-cli/issues/4485)** · 2 comments · 2 👍
   Cosmetic but persistent: the CLI theme changes from dark to light after a machine sleep cycle. Indicates a theme-detection bug that affects many macOS users.

10. **[#4555 — ACP: session/prompt unconditionally aborts the session, cancelling running background sub-agents](https://github.com/github/copilot-cli/issues/4555)** · 0 comments
    ACP mode kills background tasks whenever a prompt is submitted, whereas the interactive TUI does not. This is a severe behavioral divergence for programmatic clients.

## Key PR Progress
*No pull requests were updated in the last 24 hours.*

The project is currently in a prerelease phase with a heavy issue-fixing cadence, but no new PR activity was observed in this window.

## Feature Request Trends

- **Session management** is the dominant theme: branching (#1313), unscoped resume pickers (#4554), and restored sessions on restart are all receiving strong community support.
- **Model flexibility** is the second major driver: users want multi-model BYOK support (#3282, #3709), dynamic switching via `/model`, and better visibility into model metadata (shipped in v1.0.81-7).
- **Interactivity controls** are emerging: users want inline annotations on plan steps (#4563) and a request to bring back the `ask_user` interactive menu tool (#4557) that regressed after v1.0.6.
- **ACP protocol maturity** is clearly needed: three separate ACP-related bugs were filed today alone (#4555, #4561, #4556), indicating growing adoption of the protocol and rising quality expectations.

## Developer Pain Points

- **Windows experience remains rough:** PowerShell console flashing (#4549), sandbox enforcement conflicts (#4521), and path-quoting errors at "Program Files" (#4540) all point to unresolved platform-specific issues that discourage Windows adoption.
- **MCP configuration is fragile across versions:** workspaces not connecting (#4542), stale config reloads (#4562), and unavailable servers reporting as "waiting on ide" (#4552) create confusing failure modes.
- **Prerelease regressions are frequent:** memory writes breaking (#4535), terminal UI freezing on parallel subagents (#4533), and patch application loops (#4553) suggest the v1.0.81 series is unstable for production use.
- **Tool reliability issues persist:** the `grep` tool stalling for minutes (#4448) and the UI freezing during parallel subagent execution (#4533) are significant productivity blockers that erode trust in the agent's background operation.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI Community Digest — 2026-08-22**

---

### 1. Today's Highlights
The project saw a quiet day with no new releases, but the community flagged a critical lifecycle bug (#2615) where background subagents continue consuming LLM quota even after being marked terminal. Meanwhile, a documentation-focused PR (#2614) aims to clarify security boundaries for locally executed plugin tools, addressing a growing area of community concern.

---

### 2. Releases
No new versions were published in the last 24 hours.

---

### 3. Hot Issues
*(Only 1 issue was updated within the 24-hour window; below is the full list.)*

- **[#2615: Background subagent keeps making LLM calls after TaskStop/timeout marks it terminal](https://github.com/MoonshotAI/kimi-cli/issues/2615)** — Opened by *pc9527zxx*. This is a significant resource-governance bug: after a subagent times out or is killed, it continues making LLM requests that are no longer tracked in the active-task list. This makes quota consumption invisible and unkillable. With zero comments and no reactions yet, it appears to be a fresh report, but it directly impacts cost control and reliability for heavy automation users.

---

### 4. Key PR Progress
*(Only 1 PR was updated within the 24-hour window; below is the full list.)*

- **[#2614: docs(plugins): document security and persistent data](https://github.com/MoonshotAI/kimi-cli/pull/2614)** — Submitted by *QIANLING-0831*. This documentation-only change clarifies the trust boundary for locally executed plugin tools, outlines credential-handling precautions for the `inject` mechanism, and specifies that reinstalling a plugin replaces its installation directory. It also recommends a separate data directory. This is a positive step toward hardening the plugin ecosystem, though it may need maintainer review for accuracy and consistency with future plugin APIs.

---

### 5. Feature Request Trends
With only two items in the 24-hour window, we must note that no new feature requests were raised. However, the absence of feature requests combined with the presence of a lifecycle bug suggests the community is currently more focused on stability and resource governance than on new capabilities. The documentation PR hints at an underlying demand for clearer security and persistence models around the plugin system.

---

### 6. Developer Pain Points
- **Untracked Resource Consumption (from #2615):** The most prominent pain point is the opaqueness of background agent lifecycle management. Developers cannot reliably stop or monitor agents that have exceeded their time or kill signals, leading to silent cost overruns.
- **Plugin Trust & Data Persistence (from #2614):** There is a recurring need for clear guidance on what plugin tools can access, how credentials should be handled, and what happens to data when a plugin is reinstalled or removed. This indicates developers are pushing plugins into production workflows but lack definitive security boundaries.

---

*All links reference the MoonshotAI/kimi-cli repository as of 2026-08-22.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-22

## Today's Highlights

Two patch releases (v1.18.20, v1.18.21) shipped with focused reliability fixes: the team addressed abrupt response termination (unknown finish reasons, `network_error` variants) and improved subagent failure surfacing with resumable task IDs. The community is buzzing about a new regression where v1.18.21 may *loop* on complete responses labeled `finish=unknown` (#43939), which a contributor PR is already addressing. A wave of `[needs:issue, contributor]` PRs from new contributors suggests healthy open-source momentum, particularly around core session migration, macOS path handling, and TUI permission dialogs.

## Releases

**v1.18.21** — Core: Continue responses when a model reports an unknown finish reason; route Vertex AI `eu`/`us` multi-region Gemini requests through REP endpoints. Desktop: Keep file search results visible while the next search loads.

**v1.18.20** — Core: Surface failed subagent tool calls with a resumable `task_id`; retry provider responses ending with `finish_reason: network_error` and other network error variants.

## Hot Issues

1. **[#43939 — v1.18.21 repeatedly continues complete responses with finish=unknown](https://github.com/anomalyco/opencode/issues/43939)** — The latest patch aimed to fix stopped responses, but a new report shows it can loop on complete output when providers label it `unknown` with zero token usage. A PR (#44031) is already open to stop the loop when text exists.

2. **[#38749 — Agent keeps stopping abruptly](https://github.com/anomalyco/opencode/issues/38749)** — High-engagement (9 comments, 4 👍) report of the agent terminating mid-task without errors, affecting multiple models. Remains open despite the latest patches, suggesting the root cause is broader than the addressed network errors.

3. **[#34473 — Opencode randomly stops responses](https://github.com/anomalyco/opencode/issues/34473)** — Similar to #38749: sessions randomly stop with no error, sometimes mid-thinking. Users report it "always" happens with certain models. Signals that stopped-response handling needs deeper investigation than the quick fixes.

4. **[#24153 — [FEATURE] Add unarchive/restore for archived sessions](https://github.com/anomalyco/opencode/issues/24153)** — A long-standing pain point (since April): archiving is one-way. Sessions disappear from the sidebar and only appear dimmed. 11 👍 and multiple comments confirm broad desire for restore functionality.

5. **[#6245 — ctrl+p in VSCode doesn't work](https://github.com/anomalyco/opencode/issues/6245)** — Closed issue with 24 👍 (most-reacted item today). The keybinding conflicts with VSCode's "Go to File"; community suspects missing `when` conditions to scope the binding away from terminals/extension contexts.

6. **[#41847 — Permission dialogs not rendered: backend blocks on invisible prompts](https://github.com/anomalyco/opencode/issues/41847)** — Alarming report: 3,270 permission prompts generated in 27 days, zero displayed to the user. Backend blocked waiting for answers that never arrived. Likely triggers app-freeze complaints that have been trickling in.

7. **[#43983 — Expose OpenCode Go usage history through the API key](https://github.com/anomalyco/opencode/issues/43983)** — Users want an API-key-authenticated endpoint for OpenCode Go usage history. Reflects growing demand for metering and observability in the Zen/Go gateway.

8. **[#43829 & #43805 — Deepseek-v4-flash-free not available / missing from model picker](https://github.com/anomalyco/opencode/issues/43829)** — Two reports: the model is absent from the Zen dropdown despite being listed in `/zen/v1/models` and configured in `opencode.json`. Configuration/UI sync bug affecting a popular free tier model.

9. **[#42657 — TUI lag with multi-subagent sessions (97% CPU on render thread)](https://github.com/anomalyco/opencode/issues/42657)** — Profiled report showing the render thread pegged at 97% CPU with 2-4 concurrent subagents; lag across Warp, Windows Terminal, and WezTerm. Indicates a performance bottleneck in the TUI rendering path—likely to gain traction as multi-agent usage grows.

10. **[#29094 — Reading chat history during LLM responses re-snaps viewport](https://github.com/anomalyco/opencode/issues/29094)** — Reopened issue (originally #4196) where scrolling to read history mid-response snaps back to bottom on every token. Multiple users confirm the workaround is impossible. Pending proper fix.

## Key PR Progress

1. **[#44031 — fix(opencode): stop looping after unknown finish with text](https://github.com/anomalyco/opencode/pull/44031)** — Direct fix for the new regression (#43939). Closes the gap where v1.18.21 loops on complete responses labeled `unknown`; keeps recovery for genuinely empty dropped streams.

2. **[#44002 — fix(core): recover partial provider failures](https://github.com/anomalyco/opencode/pull/44002)** — Automatically recovers retryable provider-internal and rate-limit failures that arrive after partial output. Recovery crosses eagerly executed local tools once outcomes are durable but stops at provider-hosted activity. Substantial resilience work.

3. **[#44016 — fix(core): harden portable shell authorization](https://github.com/anomalyco/opencode/pull/44016)** — Prevents uncertain shell input from executing under a narrower saved approval. Builds on scanner relocation (#44026). Security-relevant for the opt-in portable shell feature.

4. **[#44027 — fix(app): load workspace sessions by directory](https://github.com/anomalyco/opencode/pull/44027)** — Fixes Settings → Workspaces freezing by fetching only session metadata for the relevant directory instead of all server sessions serially.

5. **[#44025 — fix(app): tolerate incomplete agent configuration](https://github.com/anomalyco/opencode/pull/44025)** — Prevents whole-app desktop crash when a connected server runs an older opencode version, specifically in `normalizeAgentList`.

6. **[#44020 — fix(core): migrate provider-local state](https://github.com/anomalyco/opencode/pull/44020)** — Extracts assistant provider metadata when migrating text/reasoning/tool parts, preventing data loss during V1→V2 session migration.

7. **[#44018 — fix(core): retain plugins across dist rebuilds](https://github.com/anomalyco/opencode/pull/44018)** — Stabilizes local plugin watch behavior so configured entrypoints in `dist/` survive rebuilds without reconfiguration.

8. **[#44015 — fix(core): canonicalize macos session paths](https://github.com/anomalyco/opencode/pull/44015)** — Resolves macOS on-disk path casing before session creation, fixing session-path mismatches from case-insensitive FS aliases.

9. **[#44013 — fix(core): preserve migration event watermark](https://github.com/anomalyco/opencode/pull/44013)** — Prevents V1 projection rebuilds from lowering the event counter below durable V2 events; preserves the watermark derived from the source of truth.

10. **[#44029 — [contributor] fix: resolve console device URLs](https://github.com/anomalyco/opencode/pull/44029)** — Fixes device authorization URL resolution for Console, preventing duplicated `/console` paths on path-based deployments. Also addressed in sibling PR #43978 with standard URL semantics and malformed-URL rejection.

## Feature Request Trends

- **Session lifecycle management**: Persistent demand for unarchive/restore (#24153), plus new asks around workspace loading (#44022) and session path fidelity (#44014). Users treat sessions as first-class data—not ephemeral UI state.
- **Usage transparency**: Growing appetite for API-key-authenticated usage history for OpenCode Go (#43983) and, more broadly, accurate cost tracking across subagents and multi-model workflows (#12377).
- **MCP resource optimization**: Lazy-loading MCP tool definitions (#35376) to reduce token overhead—especially important for setups with 9+ connected MCP servers.
- **Platform breadth**: Requests for FreeBSD support (#33219) and continued Desktop cross-platform parity (Windows renderer freezes, macOS path handling).
- **Model picker/configuration sync**: Multiple reports of models present in the backend API but missing from the UI dropdown (#43805, #43829)—a recurring configuration/UI consistency theme.

## Developer Pain Points

- **Unreliable response termination**: The single biggest complaint cluster—agents stopping on their own (#38749, #34473), looping on `unknown` finish (#43939), and dropped `finish_reason` on Zen models (#43882). Users report these as "always happens" scenarios, undermining trust in longer autonomous runs.
- **Multi-agent scalability**: TUI lag at 97% render-thread CPU with concurrent subagents (#42657), combined with subagent cost/tracking gaps (#12377), signals that multi-agent workflows are exciting but not production-ready.
- **Permission prompt invisibility**: #41847 reveals prompts silently accumulating in the backend without UI rendering—a severe UX failure in the permission model that likely contributes to perceived app freezes.
- **Desktop stability**: Windows UI freezes on large-file diffs (#30906) and TUI clipboard breakage (#43907) add to the noise of daily-driver friction.
- **Streaming protocol edge cases**: Several issues target strict OpenAI-compatible streaming semantics—missing `finish_reason` (#43882), dropped `reasoning` fields (#35283), and `textVerbosity` injection breaking non-OpenAI backends (#43911). Highlights the difficulty of being a universal LLM client.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-22

## Today's Highlights

A large batch of untriaged issues landed yesterday (Aug 21), covering terminal edge cases, provider compatibility gaps, and compaction improvements. The most active discussion centers on a critical auto-compaction bug where API overflows trigger only after context exceeds 100%, and a Windows Terminal backspace regression continues to draw community engagement. On the PR front, a TUI fix for fullscreen double-click selection merged that addresses a reported path-splitting bug.

## Releases

No new releases in the last 24 hours.

## Hot Issues

Here are the 10 most significant issues drawing community attention:

1. **Auto-compaction never triggers until provider overflow** ([#6879](https://github.com/earendil-works/pi/issues/6879)) — After a 2-hour agentic turn on GPT-5.6-sol, context climbed past 373k tokens with compaction never firing until the API rejected the request. With 19 comments and 17 👍, this is the community's top concern. The proposal is to check compaction after every agent turn. *Open, critical.*

2. **Backspace/Delete keys broken in Windows Terminal** ([#2733](https://github.com/earendil-works/pi/issues/2733)) — A long-standing regression from v0.62→v0.64 where backspace and delete misbehave in Windows Terminal. 11 comments keep this alive; it's marked closed despite the issue persisting for some users.

3. **Backspace deletes 2 chars in Kitty** ([#7130](https://github.com/earendil-works/pi/issues/7130)) — Related keyboard-protocol bug: Kitty protocol release events aren't filtered, causing double-deletion. 9 comments, still open. Terminal input handling remains a fragile area.

4. **grok-mermaid → lovely-mermaid migration** ([#8157](https://github.com/earendil-works/pi/issues/8157)) — The original mermaid renderer was a 1:1 port with "a crapton of corner cases"; lovely-mermaid has proper parsers. 9 comments, community seems supportive of the swap.

5. **Configurable thinking level for compaction** ([#7553](https://github.com/earendil-works/pi/issues/7553)) — Compaction reuses the session's thinking level, which makes summarization on reasoning models expensive. Marked *in progress* with 8 comments; a clear design improvement.

6. **OpenAI-responses lacks Anthropic cache_control — 2.5x cost penalty** ([#7995](https://github.com/earendil-works/pi/issues/7995)) — Filed by OpenRouter from an 870-trial benchmark: no prompt-caching support in the `openai-responses` implementation costs 2.5x for Claude models. 7 comments, *in progress*.

7. **Shared PI_CODING_AGENT_DIR blocked by 0600 permissions** ([#7779](https://github.com/earendil-works/pi/issues/7779)) — First user to write `auth.json`/`models-store.json` locks every other Unix user out. 6 comments, closed but highlights multi-user deployment friction.

8. **Agent stops after first tool call through forward proxy** ([#8134](https://github.com/earendil-works/pi/issues/8134)) — Since v0.84.0, plain-HTTP providers behind `HTTP_PROXY` hang after the first tool result. 4 comments; proxy support is fragile in async HTTP stacks.

9. **Per-model compaction settings** ([#8133](https://github.com/earendil-works/pi/issues/8133)) — Request for a `compaction.profiles` map keyed by model id, falling back to global values. 3 👍 and 3 comments; complements #7553.

10. **Fullscreen double-click splits paths and kebab-case** ([#7746](https://github.com/earendil-works/pi/issues/7746)) — `Intl.Segmenter` treats `/` and `-` as boundaries, so double-clicking a path selects fragments. 2 comments but has a merged fix (see PR #8459 below).

## Key PR Progress

1. **[#8459](https://github.com/earendil-works/pi/pull/8459) — fix(tui): keep / and - inside fullscreen double-click word selection** — *Merged.* Fixes #7746 by customizing the word-selection walk to include `/` and `-`. Directly addresses a reported UI annoyance.

2. **[#8428](https://github.com/earendil-works/pi/pull/8428) — fix(coding-agent): re-pair tool results when rebuilding session context** — *Merged.* Fixes the session-corruption bug in #8166 where tool results were orphaned after resume/compaction/branch navigation.

3. **[#8422](https://github.com/earendil-works/pi/pull/8422) — fix(ai): omit reasoning effort for xAI Grok Build** — *Open.* xAI rejects requests containing `reasoning.effort`; adds a Responses compatibility flag to omit it for `grok-build-0.1`.

4. **[#8424](https://github.com/earendil-works/pi/pull/8424) — fix(coding-agent): discard failed extension factory state** — *Open.* Stages flag defaults and provider ops until a factory loads; cleans up event-bus listeners on failure. Good hardening for the extension system.

5. **[#8433](https://github.com/earendil-works/pi/pull/8433) — feat(coding-agent): add --exclude-extensions to skip named extensions** — *Merged.* Solves the all-or-nothing extension loading problem; lets users run their normal set minus specific thirds-party extensions.

6. **[#8443](https://github.com/earendil-works/pi/pull/8443) — feat(interactive-mode): share via radius artifacts under experimental** — *Merged.* `/share` now uses Radius artifacts behind the experimental flag, with auth flow if needed. Video demo included.

7. **[#8232](https://github.com/earendil-works/pi/pull/8232) — DONT MERGE: dev branch** — *Open.* Explicitly for CI and commenting only; not meant for production.

8. **[#4537](https://github.com/earendil-works/pi/pull/4537) — feat: Exit alias** — *Closed.* Adds `/exit` as an alias for `/quit`, matching codex/claude/opencode. Closes #4538. Simple, community-requested UX fix.

9. **[#8443](https://github.com/earendil-works/pi/pull/8443) — feat(interactive-mode): share via radius artifacts under experimental** — listed above; included for completeness in the PR list.

10. **No other PRs updated in window** — The remaining PR activity is limited; consider `--exclude-extensions` and the TUI fix the most impactful for daily use.

## Feature Request Trends

Several clear directions emerge from recent issues:

- **Compaction control** — The biggest cluster: configurable thinking level (#7553), per-model profiles (#8133), explicit manual full-span mode (`/compact --all`, #8453), and improved default compaction prompt (#8452). Users want finer granularity and cost control for long sessions.

- **Provider ecosystem expansion** — Requests for new providers (SiliconFlow #4742, Parasail.io #8450), better OpenRouter handling (#7995, #8454), Bedrock ambient auth via AWS SDK (#8455), and RPC login support (#8451).

- **Terminal compatibility** — Keyboard-protocol bugs (Kitty #7130, herdr #8442), Windows Terminal conflicts (#8183), mobile client resize handling (#8421), and long-line guards (#8140) show terminal emulator diversity is a recurring pain point.

- **Input/UX polish** — Skills invocable mid-sentence (#8457), `/exit` alias (#6193), and double-click path selection (#7746) show attention to workflow ergonomics.

- **Session/state robustness** — Re-pairing tool results (#8428), discarding failed extension state (#8424), and TLS retry classification (#8458) point to reliability work under adversarial conditions.

## Developer Pain Points

- **Auto-compaction is unreliable in long agentic sessions** — The #6879 bug (compaction never fires until API overflow) is the single most-👍 issue right now. Combined with #7553, #8133, #8452, and #8453, the community is clearly pushing for a rework of how context is summarized and when.

- **Terminal input handling is a recurring nightmare** — Backspace issues in Windows Terminal (#2733) and Kitty (#7130), legacy `0x7f` bytes in herdr (#8442), and keybinding conflicts (#8183) suggest the TUI layer needs more defensive input normalization.

- **Proxy and transport edge cases keep breaking** — #8134 (hang after first tool call via forward proxy) and #8460 (mid-stream gateway truncation hard-fails) show that network glitches are handled too strictly or too loosely depending on the adapter.

- **Prompt-caching support gaps cost money** — #7995 quantifies a 2.5x cost penalty for Claude via OpenRouter responses. Performance-sensitive users will feel this in their bills.

- **Extension system needs better isolation and failure handling** — #8424 (failed factory state), #8433 (exclude extensions), and #5354 (custom grep command) all point to developers wanting more control and safer failure modes when loading third-party extensions.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-22

## Today's Highlights

The Qwen Code team shipped a new nightly release (v0.21.14-nightly.20260822) featuring an improved review loop that now explains to authors why a review cycle isn't converging. Two critical CI issues emerged: a dependency CVE audit is failing on every PR due to 8 vulnerabilities, and a PR (#9703) is already in flight to bump the affected packages. The `/review` machinery remains the most active development area, with three new PRs targeting Aone Code support, subagent isolation, and convergence diagnostics.

---

## Releases

**v0.21.14-nightly.20260822.7a4566cb3b** — Nightly release
- `feat(review)`: Tell the author why a review loop is not settling (@wenshao, [#9461](https://github.com/QwenLM/qwen-code/pull/9461))
- `fix(ci)`: Stop the fallback behavior that was masking CI failures

**v0.21.14-nightly.20260821.9f2342d323** — Nightly release
- Identical feature/fix set as above (same PR #9461)

**Benchmark runs (non-release)**
- `dsw-eas-tb-smoke-20260821-r1`: SWE-bench Verified smoke test — **SUCCEEDED** (1 sample)
- `dsw-eas-full-20260821-r1`: Full SWE-bench Verified (500) + Terminal-Bench 2.0 (89) run — **SUCCEEDED**

---

## Hot Issues

1. **[#9699](https://github.com/QwenLM/qwen-code/issues/9699) — Dependency CVE audit fails on every PR** (Open, P1, 4 comments)  
   `npm audit --omit=dev --audit-level=high` reports 8 vulnerabilities (1 high, 6 moderate, 1 low) since 2026-08-21, blocking all PRs. A fix PR (#9703) is already open. **Community impact:** blocking every merge — highest urgency this cycle.

2. **[#9556](https://github.com/QwenLM/qwen-code/issues/9556) — Review pipeline grants code execution as invoking user** (Open, security, 7 comments)  
   Core security question: whether the review pipeline should keep executing code as the invoking user. Precondition for every unresolved finding across 20 review rounds on #9221. **Why it matters:** architectural decision with security implications.

3. **[#5180](https://github.com/QwenLM/qwen-code/issues/5180) — Subagent crashes mid-task in multi-agent setup** (Open, P2, 7 comments)  
   Main session acting as project manager; subagent executing tasks crashes partway. Long-standing (since June) with ongoing discussion but no resolution. **Community reaction:** frustration with multi-agent reliability.

4. **[#8993](https://github.com/QwenLM/qwen-code/issues/8993) — Extension installs require Git 2.37, Ubuntu 22.04 has 2.34.1** (Closed, P2, 6 comments)  
   Resolved, but highlighted a broader compatibility concern for LTS environments.

5. **[#5966](https://github.com/QwenLM/qwen-code/issues/5966) — UI erratic + IME completely broken in 0.19.3** (Open, P2, 6 comments)  
   Chinese input method fails intermittently; user can only type pinyin with no error. User frustration: "nodejs is so annoying." Still open with no fix confirmed.

6. **[#9089](https://github.com/QwenLM/qwen-code/issues/9089) — PAT-bearing jobs share host with untrusted code** (Closed, P1, 6 comments)  
   Runner-level isolation for autofix PAT steps. Closed but the discussion shaped subsequent security hardening.

7. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693) — MCP -32000 Connection closed on Windows startup** (Open, P2, 4 comments)  
   Desktop reports MCP connection failures even when MCP is not activated. Windows-specific STDIO transport issue.

8. **[#9446](https://github.com/QwenLM/qwen-code/issues/9446) — Residual gaps in live-service witness arm** (Open, P2, 4 comments)  
   Self-correction from the author on earlier analysis; verifier capabilities live in `agent-briefs.ts`, not SKILL.md. Shows the team's rigor in reviewing its own claims.

9. **[#9639](https://github.com/QwenLM/qwen-code/issues/9639) — Auto-mode permission classifier fail-open on unavailability** (Open, P2, 3 comments)  
   During provider instability, the classifier fails open instead of failing closed — a security regression of #7331. Includes requests for deterministic allow-rule short-circuit and configurable timeout.

10. **[#9688](https://github.com/QwenLM/qwen-code/issues/9688) — Archiving live session recreates active transcript** (Open, P2, 2 comments)  
    Race condition: archiving a session while a writer is still appending creates both `chats/` and `chats/archive/` copies, causing UI conflicts.

---

## Key PR Progress

1. **[#9703](https://github.com/QwenLM/qwen-code/pull/9703) — Bump vulnerable dependencies to unblock CVE audit**  
   `npm audit fix --package-lock-only` — bumps every fixable advisory. Only `package-lock.json` changes, no code changes. Direct response to the CI blocker in #9699.

2. **[#9678](https://github.com/QwenLM/qwen-code/pull/9678) — Review agents get their own subagent type**  
   Dedicated `review-agent` type declaring only the 6 tools a dimension actually uses, instead of `general-purpose` inheriting everything. **Impact:** reduces tool surface and improves agent isolation.

3. **[#9621](https://github.com/QwenLM/qwen-code/pull/9621) — Back PR-context on Aone Code targets**  
   Aone Code targets previously skipped fetching target metadata and existing discussion. This brings Aone's `/review` read path to parity with GitHub.

4. **[#9673](https://github.com/QwenLM/qwen-code/pull/9673) — Stop counting idle timeouts toward timeout cap**  
   The cumulative timeout breaker now only counts timeouts the agent can act on. Idle watchdog kills (no output at all) no longer burn the budget.

5. **[#9668](https://github.com/QwenLM/qwen-code/pull/9668) — Detect long verbatim repetition loops**  
   Loop detection missed repetition units >75 characters in both content and reasoning streams. Adds long-period repetition rule to content analysis.

6. **[#9653](https://github.com/QwenLM/qwen-code/pull/9653) — Move autofix push-and-report out of workflow YAML**  
   Extracts the push-and-report body into `.github/scripts/autofix-push-and-report.sh`. Byte-identical body, improves maintainability of the workflow file.

7. **[#9657](https://github.com/QwenLM/qwen-code/pull/9657) — Compact agent activity summaries in web-shell**  
   Compact mode folds adjacent thinking, tool activity, and parallel agents into one summary; expanding reveals nested per-agent details.

8. **[#9623](https://github.com/QwenLM/qwen-code/pull/9623) — Machine-readable half for convergence observation**  
   Builds on #9461's diagnosis: adds a machine-readable output so callers can act on convergence findings programmatically.

9. **[#9624](https://github.com/QwenLM/qwen-code/pull/9624) — Close Aone residual gaps**  
   Three fixes: real "Posted:" links via provider-owned URL abstraction, test-plan routing on Aone, and a version floor for Aone's API.

10. **[#9649](https://github.com/QwenLM/qwen-code/pull/9649) — Pass CI=true through autofix verification gate**  
   The gate's `env -i` clean-child allowlist only covered 8 variables; `CI=true` was missing, so checks ran with inconsistent environment semantics.

---

## Feature Request Trends

1. **Daemon session model persistence** ([#9686](https://github.com/QwenLM/qwen-code/issues/9686), [#9664](https://github.com/QwenLM/qwen-code/issues/9664)) — Multiple requests for daemon sessions to restore the model each session last used, and to re-hang unanswered HITL questions after resume.

2. **Configurable read-only command allowlist** ([#9694](https://github.com/QwenLM/qwen-code/issues/9694)) — Users want to extend Plan mode's read-only command set via `settings.json` (e.g., custom CLIs that prompt on every invocation).

3. **Terminal UI display options** ([#9670](https://github.com/QwenLM/qwen-code/issues/9670)) — Request to restore a setting for starting in expanded detail mode (show thinking by default), since `ui.compactMode` was retired.

4. **Subagent control** ([#1212](https://github.com/QwenLM/qwen-code/issues/1212)) — Long-standing request for the ability to disable built-in general-purpose subagents; user questions why a non-recommended agent type is built in.

5. **Expanded provider support** ([#8368](https://github.com/QwenLM/qwen-code/pull/8368)) — PR adding Kimi and Xiaomi MiMo as first-class auth providers indicates continued demand for third-party model integration.

---

## Developer Pain Points

1. **MCP reliability on Windows** — Two open issues ([#9693](https://github.com/QwenLM/qwen-code/issues/9693), [#9675](https://github.com/QwenLM/qwen-code/issues/9675)) with connection drops and disconnections between sessions, despite valid configuration.

2. **IME/input method issues** — #5966 (0.19.3, Chinese IME broken) and #9666 (Windows terminal candidate box low contrast) show recurring pain for CJK users in terminal UI.

3. **CI flakiness blocking progress** — The CVE audit failure (#9699) blocking all PRs, combined with recurring workflow hardening PRs, suggests CI reliability is a persistent cost center.

4. **Subagent/multi-agent instability** — #5180 (crashes mid-task) and #1212 (unwanted general-purpose subagent invocations) indicate the multi-agent architecture still needs reliability work.

5. **Session management edge cases** — #9688 (archive race), #8094 (transcript mid-sentence resume), and #9686 (model restore) point to a class of session-lifecycle bugs that frustrate long-running workflows.

6. **Security scoping of the review pipeline** — The ongoing saga around #9556 and #9089 shows a community actively scrutinizing code-execution boundaries, with legitimate concerns about privilege modeling.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-22

## Today's Highlights

The project (now branded **CodeWhale**) is rapidly maturing toward supervised, unattended operation. A substantial super-EPIC (#5316) is tracking a full TUI crate decomposition, while user **M-Maciej** has filed an extensive feature battery for external supervision — lifecycle event outboxes, control sockets, and self-relaunch capabilities — accompanied by one large PR (#5535) implementing the whole stack. Bug reports highlight resilience gaps in sub-agent execution and silent workflow failures, indicating that operational reliability is the community's current focus. The maintainer (Hmbown) is actively engaged across multiple issues, and a growing body of dependabot PRs indicates healthy dependency hygiene.

## Releases

No new releases were published in the last 24 hours. (The latest release remains v0.9.3.)

---

## Hot Issues

### 1. [#5316 — EPIC-005: CodeWhale TUI Crate Decomposition (Umbrella)](https://github.com/Hmbown/CodeWhale/issues/5316)
**Author:** aboimpinto | Updated: 2026-08-21 | 💬 11 comments
The master umbrella issue for a major architectural refactor. It tracks sub-EPICs and FEATs as the TUI is decomposed into separate crates. This is the roadmap for the project's next large structural evolution, and the 11 comments show active coordination.

### 2. [#5526 — Deprecated shell completion](https://github.com/Hmbown/CodeWhale/issues/5526)
**Author:** RepentStar | Updated: 2026-08-21 | 💬 4 comments
A PowerShell user reports that `codewhale completions powershell` generates scripts referencing the old `codewhale-tui` command name. This reveals a public-binary migration gap — documentation and generated artifacts lag behind the codebase. A fix is already in flight (PR #5530).

### 3. [#5541 — [enhancement] Feature: DeepSeek-V4-Flash-Vision-Exp](https://github.com/Hmbown/CodeWhale/issues/5541)
**Author:** M-Maciej | Updated: 2026-08-21
Request to add DeepSeek's first multimodal model to the model list. The user calls the impact "Huge" for website and vision-related work. Currently, there is no way to assign this model despite it being available in the DeepSeek family.

### 4. [#5535 — Supervised operation stack (PR)](https://github.com/Hmbown/CodeWhale/pull/5535) *(related to multiple issues below)*
One PR addresses five issues at once, including #5531, #5532, #5533, and #5534. While it is a PR and not an issue, it is where the supervision seam is actively being built. It implements lifecycle outbox, `/relaunch`, and control sockets. (Detailed in Key PR Progress.)

### 5. [#5534 — [bug] Goal-continuation cadence is bypassed on the within-turn dispatch path](https://github.com/Hmbown/CodeWhale/issues/5534)
**Author:** M-Maciej | Updated: 2026-08-21
The `continuation_delay_seconds` quiet period added in a recent commit is bypassed on the within-turn dispatch path — resumed or CLI sessions fire passes instantly. This defeats the intended cadence control, which is critical for rate-limit management and cost control. A fix is included in PR #5535.

### 6. [#5533 — [enhancement] Feature: the control surface for supervised operation](https://github.com/Hmbown/CodeWhale/issues/5533)
**Author:** M-Maciej | Updated: 2026-08-21
Requests a per-session control socket (message / interrupt / relaunch / status) and `RuntimeBackendKind::External`. The use case is running CodeWhale under a terminal multiplexer wrapper or CI automation harness where no human is at the screen. This is a core building block for headless operation.

### 7. [#5531 — [enhancement] Feature: local lifecycle event outbox (JSONL + webhook)](https://github.com/Hmbown/CodeWhale/issues/5531)
**Author:** M-Maciej | Updated: 2026-08-21
Requests a durable JSONL and webhook-based event stream with `turn_stalled` and `turn_failed` events. The intent is alerting and automation for overnight or unattended runs. This pairs naturally with #5533 and #5532, forming a full supervision trio.

### 8. [#5529 — Sub-agents cannot reliably execute: wall-time deaths lose uncommitted work, provider-route failures block dispatch, shell tooling needs workarounds](https://github.com/Hmbown/CodeWhale/issues/5529)
**Author:** Hmbown (maintainer) | Updated: 2026-08-21
A maintainer-reported critical bug: sub-agents workers die on wall-time budget and lose uncommitted work; provider-route failures block dispatch outright; and shell tooling lacks workarounds. This undermines the entire Fleet delegated-execution value proposition. Three failure modes observed in a single day.

### 9. [#5528 — Workflow runs fail silently: dispatch/schema errors never surface in the TUI](https://github.com/Hmbown/CodeWhale/issues/5528)
**Author:** Hmbown (maintainer) | Updated: 2026-08-21
Workflow runs (a review fan-out and a phased build pipeline) failed at script-evaluation time with zero TUI feedback — no toast, no status line, no workflow panel entry. The operator sees "the workflow is working" while nothing runs. This is a critical observability gap for the workflow feature.

### 10. [#4069 — [documentation, enhancement] feat: indexing privacy controls (.codewhaleignore)](https://github.com/Hmbown/CodeWhale/issues/4069)
**Author:** Hmbown | Updated: 2026-08-21
An open issue since July asking for a first-class ignore file (like `.cursorignore`) to exclude secrets, vendor trees, and local artifacts from agent discovery. It remains open and is quiet, but it is an important trust and security control that is still missing.

*(Omitted as spam: #5536, a closed HIPAA/42 CFR Part 2 compliance guide that appears to be SEO content spam.)*

---

## Key PR Progress

### 1. [#5535 — Supervised operation stack: lifecycle outbox, /relaunch, per-session control socket, and the goal-continuation quiet-period fix](https://github.com/Hmbown/CodeWhale/pull/5535)
**Author:** M-Maciej | Updated: 2026-08-21
The biggest architectural PR this cycle — five changes on one seam: (1) lifecycle event outbox (`[lifecycle_outbox]`, opt-in JSONL + webhook) with `turn_start`/`turn_end`/`turn_stalled`/`subagent_spawn`/`subagent_complete`/`session_*` events; (2) `/relaunch` to switch a running session to the current binary; (3) per-session control socket for message/interrupt/relaunch/status; (4) `RuntimeBackendKind::External`; and (5) the fix for the goal-continuation quiet-period bypass (#5534).

### 2. [#5530 — fix(cli): route legacy completions through public binary](https://github.com/Hmbown/CodeWhale/pull/5530)
**Author:** wuisabel-gif | Updated: 2026-08-21
Fixes the shell completion deprecation (#5526). The legacy `codewhale completions <shell>` command now uses the canonical generator instead of forwarding to the `codewhale-tui` runtime, and generated scripts use the public `codewhale` command name. This closes a public API compatibility gap.

### 3. [#5525 — refactor(tui): adopt command shapes in utility group (FEAT-018)](https://github.com/Hmbown/CodeWhale/pull/5525)
**Author:** aboimpinto | Updated: 2026-08-21
Part of the crate decomposition effort. Converts the utility command group (/about, /help, etc.) to the external command shapes introduced by FEAT-014/015, changing the execution boundary without moving files. Keeps the codebase consistent with the new architecture.

### 4. [#5523 — refactor(tui): extract tool call stages from turn loop](https://github.com/Hmbown/CodeWhale/pull/5523)
**Author:** bistack | Updated: 2026-08-21
Splits the monolithic turn loop into three phases: `plan_tool_calls`, `execute_planned_tools`, and `process_tool_results`. Preserves control order, mutable state flow, cancellation, and indexed outcome collection. Clean separation of concerns is a prerequisite for the crate decomposition EPIC.

### 5. [#5524 — feat(tui): add multi-file read_lints operation](https://github.com/Hmbown/CodeWhale/pull/5524)
**Author:** wuisabel-gif | Updated: 2026-08-21
Extends the model-visible `lsp` tool with a `read_lints` operation for multiple workspace-relative files. Reuses the session's `LspManager` and transport pool instead of spawning another language-server lifecycle. Efficiency and reuse are good signs for long-running agent sessions.

### 6. [#5540 — chore(deps): bump similar from 3.1.2 to 3.2.0](https://github.com/Hmbown/CodeWhale/pull/5540)
**Author:** dependabot[bot] | Updated: 2026-08-21
Bumps the diffing library `similar` to 3.2.0, which adds structured, line-oriented improvements. Low-risk dependency update that may slightly improve diff rendering quality.

### 7. [#5539 — chore(deps): bump rio-vt from 0.5.19 to 0.5.25](https://github.com/Hmbown/CodeWhale/pull/5539)
**Author:** dependabot[bot] | Updated: 2026-08-21
Bumps the virtual terminal backend `rio-vt` across six patch releases. Important for terminal emulation fidelity, which affects how TUI-rendered content is displayed across different terminal emulators.

### 8. [#5538 — chore(deps): bump jsonschema from 0.46.10 to 0.49.9](https://github.com/Hmbown/CodeWhale/pull/5538)
**Author:** dependabot[bot] | Updated: 2026-08-21
Bumps the JSON Schema validator three minor versions. Relevant to workflow schema validation — the very area where #5528 reports silent failures, so this update may carry related fixes.

### 9. [#5390 — chore(deps): bump rmcp from 2.2.0 to 3.1.2](https://github.com/Hmbown/CodeWhale/pull/5390)
**Author:** dependabot[bot] | Updated: 2026-08-21
Major-version bump of the Rust MCP SDK (modelcontextprotocol/rust-sdk) from 2.x to 3.x. This is significant: MCP tooling compatibility could shift. Worth watching if any tool-preview regressions appear.

### 10. [#5537 — chore(deps): bump docker/setup-buildx-action from 4.2.0 to 4.3.0](https://github.com/Hmbown/CodeWhale/pull/5537)
**Author:** dependabot[bot] | Updated: 2026-08-21
Routine CI dependency bump for the Docker Buildx setup action. Maintains CI infrastructure freshness.

---

## Feature Request Trends

1. **Supervised / Headless / Unattended Operation** (highest signal)
   - **Per-session control socket** (#5533): message, interrupt, relaunch, and status endpoint, plus `RuntimeBackendKind::External`.
   - **Local lifecycle event outbox** (#5531): JSONL + webhook, with `turn_stalled` and `turn_failed` events for alerting.
   - **`/relaunch` command** (#5532): switch a running session to the current binary without a manual terminal restart (complements `/update`).
   - **Goal-continuation cadence fix** (#5534): an opt-in pause between auto-continuation passes; currently bypassed on resume/CLI paths.
   - **Driver**: external supervisors like `herdr`, terminal multiplexer wrappers, CI harnesses, and overnight unattended runs.

2. **Multimodal Model Support** (#5541)
   - DeepSeek-V4-Flash-Vision-Exp is the first vision-capable model in the family, and CodeWhale currently cannot assign it. Vision tasks (website dev, screenshot analysis) are the motivation.

3. **Privacy / Indexing Controls** (#4069, open since July)
   - Requests a first-class `.codewhaleignore` file (like `.cursorignore`) to exclude secrets, vendor trees, and local artifacts from agent discovery. Quietly open but a persistent trust and security requirement.

4. **Architectural Evolution: Crate Decomposition** (#5316 umbrella)
   - FEAT-018 (utilities), tool-call extraction (#5523), and a long list of sub-tasks. The community is systematically refactoring toward smaller, individually testable crates and external command shapes.

5. **Better Runtime Robustness** (inferred from bug reports)
   - Sub-agent reliability (#5529) and workflow error surfacing (#5528) are bugs, but the implied feature need is: resilient wall-time budgets, retry/backoff for provider-route failures, and visible in-TUI workflow failure states.

---

## Developer Pain Points

1. **Silent failures are the #1 frustration.** Workflows that fail at script-evaluation with zero TUI feedback (#5528) make operators believe work is progressing when nothing is running — a severe trust deficit. The reporter calls for toasts, status-line entries, or a workflow panel entry for every evaluation error or dispatch failure.

2. **Sub-agents are unreliable under production conditions.** Wall-time budget deaths lose uncommitted work; provider-route failures block dispatch entirely; shell tooling lacks workarounds (#5529). This makes the Fleet delegated-execution model unusable in practice, per the maintainer's own report.

3. **Public-binary migration gaps.** Users on PowerShell cannot find documentation for the new `codewhale` command, and generated completion scripts still reference the old `codewhale-tui` name (#5526). Artifact generation lags behind the binary rename.

4. **Supervision requires a session-control seam that doesn't exist yet.** Multiple requests (#5531, #5532, #5533) note that "restart the app" is not a valid answer for a TUI holding the terminal in a remote/automated context. The updater's own design notes concede the codebase lacks a self-exec/relaunch pattern.

5. **Model parity with the DeepSeek API is a requirement, not a nice-to-have.** The vision model is available from DeepSeek, and the community expects CodeWhale to support it immediately on release. When it is not listed, users cannot use a whole class of multimodal workflows.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*