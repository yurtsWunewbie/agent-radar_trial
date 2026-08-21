# AI CLI Tools Community Digest 2026-08-21

> Generated: 2026-08-21 01:13 UTC | Tools covered: 9

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

# Cross-Tool AI CLI Comparison Report — 2026-08-21

---

## 1. Ecosystem Overview

The AI CLI tool ecosystem is experiencing rapid convergence around a common core of functionality—session persistence, MCP integration, subagent orchestration, and cross-session messaging—while each tool differentiates through provider-specific strengths and architectural choices. Community attention is heavily concentrated on **model quality regressions** (particularly around "rhetorical tics" and instruction negotiation), **Windows reliability gaps**, and **context-window management**. A notable pattern is the emergence of cross-tool complaints: users migrating between Claude Code, Codex, Gemini CLI, and others bring consistent expectations (keybindings, multi-line input, SHIFT+ENTER conventions) that challenge each tool's established UX. Security hardening is accelerating across the board—from sandbox escapes in Gemini CLI to OAuth bridging failures in Copilot CLI to provider credential handling in all tools. The ecosystem is simultaneously maturing (stable releases, enterprise features) and fragmenting (model-specific quirks, provider gateways requiring per-tool compatibility layers).

---

## 2. Activity Comparison

| Tool | Issues (Top-Tracked) | PRs (Active/Merged in 24h) | Release Status |
|------|----------------------|---------------------------|----------------|
| **Claude Code** | 10 tracked; top issue 316 👍, 50 comments | 0 PRs updated in 24h | v2.1.238 shipped (keybinding flavor, plugin headers) |
| **OpenAI Codex** | 10 tracked; top issue 21 👍, 28 comments | 10 PRs active; high velocity | rust-v0.149.0 stable + 0.150.0-alpha.1; multiple alphas |
| **Gemini CLI** | 10 tracked; top issue 41 👍, 11 comments | 10 PRs (2 merged, 8 open); high velocity | v0.56.0-nightly.20260821; v0.57.0-preview.0 in progress |
| **Copilot CLI** | 10 tracked; top issue 17 👍, 28 comments | 1 PR open | v1.0.81-6 prerelease |
| **Kimi Code CLI** | 1 active issue (new proposal) | 1 docs PR open | No releases in 24h |
| **OpenCode** | 10 tracked; top issue 24 👍, 47 comments | 10 PRs (3+ merged); high velocity | v1.18.19 stable; 2.0 branch active |
| **Pi** | 10 tracked; top issue 36 comments, 17 👍 | 10 PRs (4 merged); moderate-high velocity | No releases in 24h |
| **Qwen Code** | 10 tracked; top issue 8 comments | 10 PRs tracked; steady | v0.21.15 stable + nightly |
| **DeepSeek TUI (CodeWhale)** | 10 tracked; top issues closed | 8 PRs (5 closed, 3 open) | v0.9.10 (Codewhale) shipped, 76 commits |

**Notable velocity outliers:** Codex, Gemini CLI, and OpenCode show the highest PR velocity, each with 10+ actionable PRs in a single day. Claude Code shows **zero PR activity**, concentrating community energy on issues and model-quality complaints.

---

## 3. Shared Feature Directions

| Requirement | Tools | Specific Needs |
|---|---|---|
| **Model availability lag** | Gemini CLI (41 👍), Qwen, Pi, DeepSeek | Users consistently demand newest models immediately; provider-specific support (Kimi, GLM, DeepSeek, Gemini Flash 3.7) trails announcements |
| **Cross-session messaging** | Claude Code (#86012), Qwen (#8724), Codex | Sessions discovering/messaging each other with auth and gating; Claude Code shipped with regressions |
| **Session persistence & continuity** | Copilot CLI (#4530/4538/4539), Kimi (#2613), Qwen (#2128/#9573) | State preservation across restarts, long-lived context, per-model compaction profiles |
| **Headless/remote agent mode** | Codex (#23200, 49 👍), Gemini CLI, Copilot CLI | Always-on Linux servers, mobile remote control, daemon/background mode without desktop |
| **Subagent observability & transparency** | Gemini CLI (#22323/#22598), Claude Code, OpenCode | Trajectory visibility, truthfully report interruptions, inherited-session debugging |
| **MCP reliability** | Copilot CLI (5+ issues), Pi, OpenCode, Qwen | OAuth bridging, process leaks, policy false-positives, detection-vs-connection gaps |
| **Multi-line input & keyboard conventions** | DeepSeek TUI (#5345), Copilot CLI (#1481), Pi | Enter inserts newline; SHIFT+ENTER/Ctrl+ENTER for send |
| **Workspace-scoped memory** | Kimi CLI (#2613), Qwen, Gemini CLI | Persistent project context, auto-memory retries, per-workspace conventions |
| **Windows/terminal portability** | Claude Code (#42776), Codex (#39189), Pi (#7547), DeepSeek (#6300) | Launch reliability, IME input, escape-sequence leaks, redraw-on-keystroke |
| **Per-model configuration** | Pi (#8133), DeepSeek (#5516), Copilot CLI | Compaction thresholds, token limits, model-specific settings persistence |
| **Proactive tool/skill usage** | Gemini CLI (#21968), all tools | Agents should leverage custom skills/subagents without explicit instructions |

---

## 4. Differentiation Analysis

| Tool | Target User | Distinctive Feature | Technical Approach | Weakness |
|------|-------------|---------------------|--------------------|----------|
| **Claude Code** | Power developers, enterprises | Plugin marketplace custom headers; keybinding flavor settings | Provider-agnostic but Anthropic-optimized; server-side experiments | Model quality regressions dominate; Windows/MSIX reliability; server-side silent changes erode trust |
| **OpenAI Codex** | ChatGPT subscribers, agent-heavy workflows | Desktop app + remote control; ACP protocol; cross-platform | Rust-native, sandboxing with Bedrock/multi-agent support; host-accepted WebSockets | Auth regressions (sign-outs on thread open); Windows archive failures; compaction loops |
| **Gemini CLI** | Google ecosystem, open-source-first | OS-level sandboxing; A2A server; preview-model substitution warnings | TypeScript, Nightly release train; zero-dependency sandbox direction (Docker/Seatbelt) | Subagent hang/false-success issues; shell "Waiting input" deadlock |
| **Copilot CLI** | Enterprise, GitHub-centric | Org model governance; managed-settings compliance; documented policy enforcement | Node-based; ACP client visibility; token-based login stdin | MCP brittleness (policy false-positives, OAuth bridges); WSL fragmentation |
| **Kimi Code CLI** | MoonshotAI users, lightweight | Long-term memory plugin proposal (still early) | Plugin subprocess execution, docs-driven security clarification | Sparse community; no releases; single-issue tracker day |
| **OpenCode** | Performance-focused power users | Cloudflare AI Gateway passthrough; 2.0 contributions from community; provider breadth | Bun-based; TUI + desktop; strong contributor flow | CPU/memory leaks; TUI lag with concurrent subagents; 2.0 stability gaps |
| **Pi** | Hobbyists, cross-provider maximizers | Per-model compaction profiles; kimi-coding base64url fix; large-diff crash prevention | Dynamic server, TUI-first design, bunt to detect provider strictness friction | Windows fragility; provider-agnostic strictness (null-content, thought_signature) |
| **Qwen Code** | SWE-bench focused research/dev | /review pipeline with convergence advisory; Aone Code integration; cross-session messaging | VSCode-based with Web Shell, sandbox bootstrap, immutable cache manifests | Session/memory bloat; review-loop instability; Web Shell focus stealing |
| **DeepSeek TUI (CodeWhale)** | DeepSeek power users, CJK users | Multi-file read_lints; IME-aware input; progressive first-run UX | Rust-based, crate decomposition (EPIC-005); command-shape migration | max_tokens auto-detection fragility; Windows Terminal polish; i18n (zh) docs gap |

---

## 5. Community Momentum & Maturity

- **Rapidly iterating (alpha/nightly + high PR velocity):** Gemini CLI (nightly releases, 10 PRs/day), OpenCode (v1.18.19 + busy 2.0 branch), Codex (0.149/0.150 line, active PRs), Qwen Code (nightly + smoke benchmarks).
- **Stable with release trains:** Claude Code (v2.1.238) and Copilot CLI (v1.0.81-6 prerelease) ship steadily but community feedback suggests quality regressions. Claude Code's **zero PR activity** is a warning sign: issues accumulate, fixes stall, and model quality is the top complaint.
- **Emerging/highly focused:** Kimi Code CLI has minimal community activity this cycle (mostly proposal-driven). Pi and DeepSeek TUI are building core platform stability (DeepSeek just shipped a 76-commit release under a new name). Pi is maturing with security/compatibility fixes integrated.
- **Community attention sparks:** Codex's "headless remote Linux" (49 👍) and Gemini's "model availability" (41 👍) top the wishlist—clear product-direction signals for mobile/agentic workflows. Claude Code's #77136 (model quality, 316 👍) is the highest-signal single complaint across all tools.

---

## 6. Trend Signals

1. **Model behavior is the #1 complaint.** Cross-tool, the most consistent pain is LLM behavior: Claude 4.x "negotiates" instructions, Opus 5 injects self-referential content, Gemini reports false success, and models degrade prose quality under pressure. Tool developers relying on model-behavior cannot ignore this; it's the differentiating factor users notice first.

2. **Auth and session integrity regressions are systemic.** Codex's macOS/Windows auth invalidation, Claude Code's cross-session message hangs, Qwen's "missing tool result," and Copilot's OAuth bridging failures all point to a shared weakness: session/auth handling is fragile across platforms and persists across releases. These bugs degrade trust more than missing features.

3. **MCP remains the most brittle integration point.** Copilot CLI has 5+ MCP-specific issues, Pi fixes provider strictness incompatibilities, Gemini CLI adds MCP env consent, OpenCode adds per-server fingerprint pinning. MCP is universally adopted but poorly standardized in practice—especially around auth, discovery, and lifecycle/resource cleanup.

4. **Windows and terminal hygiene are a persistent tail risk.** Every single tool has Windows-specific complaints (launch failures, IME, escape sequences, path handling), and cross-platform terminals (WezTerm, Warp, Windows Terminal, cmd.exe) add their own quirks. Users are statically on tier-1 OSes but treat CLI tools as terminal-agnostic—this mismatch creates ongoing friction.

5. **Headless/remote agent mode is the next frontier.** Codex's #23200 (49 👍), Claude Code's daemon/background requests, and Copilot's remote WSL anchoring all point to "always-on agent servers" as the future of AI CLI usage. Tool developers who prioritize headless/remote control now will win the "agent-as-service" segment.

6. **Security hardening is accelerating, and users care.** Gemini CLI's sandbox escape fixes, OpenCode's credential refactor, Qwen's installscript hardening, Copilot's policy compliance checks, and PI's provider-key handling all show security is no longer optional—users demand sandboxing, least-privilege, and transparency in auth.

7. **Local-model support is a growing niche.** Pi (OpenAI-compatible gateways), Qwen (private sandbox), and OpenCode (local context limits) all address self-hosted/local-model users; this is an underserved segment with clear demand for context-window configuration.

8. **Tool-specific win conditions:** Gemini CLI's model availability gap (and its fast fix via merged PR #28910) shows responsiveness is a competitive edge. Claude Code's concentration on model quality and **absence of PR velocity** may signal a need to refocus on basics: session integrity, Windows reliability, and truthful model behavior.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Data as of 2026-08-21 | Source: github.com/anthropics/skills**

---

## 1. Top Skills Ranking

The most-discussed Skills in the community, ranked by attention and impact:

### #1 — skill-creator fixes (PR #1298, #1099, #1050, #539)
**Status:** Open | **Author:** MartinCajiao, joshuawowk, gstreet-ops, Lubrsy706

These four PRs form the single largest cluster of community attention. They address a **critical bug** in the `skill-creator` evaluation pipeline: `run_eval.py` reports `recall=0%` for every skill description due to Windows subprocess failures, broken stream reading, and incorrect trigger detection. The description-optimization loop is currently "optimizing against noise," making it impossible to iteratively improve skill descriptions.

- [#1298](https://github.com/anthropics/skills/pull/1298) — Comprehensive fix: install eval artifact as real skill, Windows stream handling, parallel workers
- [#1099](https://github.com/anthropics/skills/pull/1099) — Fixes `WinError 10038` flood and "not triggered" false negatives
- [#1050](https://github.com/anthropics/skills/pull/1050) — Fixes `claude.cmd` not found on Windows (PATHEXT issue)
- [#539](https://github.com/anthropics/skills/pull/539) — Pre-parse YAML validation to catch unquoted descriptions with special characters

**Discussion highlights:** 12+ independent reproductions of the bug (Issue #556); community members identified Windows-specific root causes that maintainers missed. This cluster represents the community's most urgent infrastructure need.

---

### #2 — document-typography (PR #514)
**Status:** Open | **Author:** PGTBoos

Typographic quality control for AI-generated documents. Prevents orphan word wrap (1–6 words spilling onto next line), widow paragraphs (section headers stranded at page bottom), and numbering misalignment — issues that affect every document Claude generates.

**Discussion highlights:** Addresses a pervasive, low-visibility quality problem. Users rarely request good typography explicitly, making this a valuable "silent improvement" skill.

[View PR #514](https://github.com/anthropics/skills/pull/514)

---

### #3 — ODT skill (PR #486)
**Status:** Open | **Author:** GitHubNewbie0

OpenDocument Text creation, template filling, and ODT-to-HTML parsing. Triggers on any mention of ODT, ODS, ODF, OpenDocument, or LibreOffice document requests. Fills a gap for users on open-source or ISO-standard document workflows.

**Discussion highlights:** Complements the existing DOCX/PDF skills, addressing demand for LibreOffice-compatible workflows.

[View PR #486](https://github.com/anthropics/skills/pull/486)

---

### #4 — frontend-design clarity overhaul (PR #210)
**Status:** Open | **Author:** justinwetch

Revises the frontend-design skill to be more actionable and internally coherent. Goal: ensure every instruction is executable within a single conversation and specific enough to steer behavior without ambiguity.

**Discussion highlights:** Community feedback suggested the original skill was too abstract; this revision focuses on practical, actionable guidance.

[View PR #210](https://github.com/anthropics/skills/pull/210)

---

### #5 — skill-quality-analyzer + skill-security-analyzer (PR #83)
**Status:** Open | **Author:** eovidiu

Two meta-skills for the example-skills collection:
- **skill-quality-analyzer**: Evaluates skills across 5 dimensions (Structure & Documentation 20%, examples, resources, etc.)
- **skill-security-analyzer**: Security auditing for skills

**Discussion highlights:** Directly addresses community concerns about skill quality and security (see Issue #492 on trust boundary abuse).

[View PR #83](https://github.com/anthropics/skills/pull/83)

---

### #6 — testing-patterns (PR #723)
**Status:** Open | **Author:** 4444J99

Comprehensive testing skill covering the full testing stack: Testing Trophy model, AAA pattern, React component testing with Testing Library, and guidance on what to test vs. what NOT to test.

**Discussion highlights:** Represents community demand for consolidated testing best practices within the Skills framework.

[View PR #723](https://github.com/anthropics/skills/pull/723)

---

### #7 — self-audit (PR #1367)
**Status:** Open | **Author:** YuhaoLin2005

A four-dimension reasoning quality gate with mechanical file verification as Step 0. Universal — works with any project, tech stack, or model. Audits AI output before delivery, prioritizing damage severity.

**Discussion highlights:** Addresses the "trust but verify" gap — ensuring Claude's claimed outputs actually exist and reasoning quality meets standards.

[View PR #1367](https://github.com/anthropics/skills/pull/1367)

---

## 2. Community Demand Trends

### Trend 1: Skills infrastructure reliability
The #1 demand is fixing the skill-creator pipeline itself (Issue #556: 12 comments, 7 upvotes). Users cannot iteratively improve skill descriptions when evaluation reports false negatives. **Meta-demand: reliable tooling for building skills.**

### Trend 2: Trust and security boundaries
Issue #492 (43 comments) — community skills distributed under `anthropic/` namespace create trust boundary vulnerabilities. Users demand:
- Clearer provenance for community skills
- Security analysis tooling
- Namespace distinction between official and community content

### Trend 3: Enterprise and organizational sharing
Issue #228 (16 comments, 8 upvotes) — org-wide skill sharing in Claude.ai. Users want a shared skill library or direct sharing links rather than manual .skill file transfer via Slack/Teams.

### Trend 4: Document fidelity and format coverage
Beyond the DOCX/PDF skills, community wants:
- ODT/ODS support (PR #486)
- Typographic quality control (PR #514)
- Whitespace preservation (Issue #12)
- SharePoint/SPO document handling (Issue #1175)

### Trend 5: Quality gates and self-verification
Multiple proposals for audit/verification skills (PR #1367, Issue #1385). Community wants Claude to verify its own output before delivery — mechanical file checks plus reasoning quality assessment.

---

## 3. High-Potential Pending Skills

These active PRs show strong community engagement and may land soon:

| Skill | PR | Key Value | Engagement |
|-------|-----|-----------|------------|
| **skill-creator bug fixes** (4 PRs) | [#1298](https://github.com/anthropics/skills/pull/1298) | Fixes critical eval pipeline failure | 10+ independent reproductions |
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | Universal document quality control | Directly addresses common AI output flaw |
| **ODT skill** | [#486](https://github.com/anthropics/skills/pull/486) | Open-source document format coverage | Complements existing DOCX/PDF skills |
| **self-audit** | [#1367](https://github.com/anthropics/skills/pull/1367) | Output verification + reasoning quality | Distinct, additive value; actively maintained |
| **testing-patterns** | [#723](https://github.com/anthropics/skills/pull/723) | Consolidated testing best practices | Broad applicability across projects |
| **ServiceNow platform** | [#568](https://github.com/anthropics/skills/pull/568) | Enterprise platform coverage | Updated as recently as 2026-08-12 |
| **frontend-design clarity** | [#210](https://github.com/anthropics/skills/pull/210) | Makes existing skill more actionable | Ongoing engagement since January |

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for tooling that validates and secures the skill-building process itself** — fixing the skill-creator evaluation pipeline, adding quality/security analyzers, and establishing trust boundaries — before expanding coverage to new domains.

---

**Claude Code Community Digest — 2026-08-21**

---

## 1. Today's Highlights

Release v2.1.238 introduces a `keybindingFlavor` setting (readline-style Ctrl+W) and plugin marketplace header customization—nod to power users and enterprise plugin registries. The community's attention remains split among long-standing grievances (model output quality, Windows/MSIX reliability) and a wave of new regressions from recent releases, particularly around MCP widgets, session persistence, and the new cross-session messaging features.

---

## 2. Releases

**v2.1.238** — Changelog highlights:
- **New `keybindingFlavor` setting**: set to `"readline"` for Bash-like Ctrl+W (delete to previous whitespace); default `"classic"` unchanged.
- **Plugin marketplaces**: `headersHelper` on URL marketplaces or catalog entries now runs a command, enabling authenticated/private registries.

[View release →](https://github.com/anthropics/claude-code/releases)

---

## 3. Hot Issues (Top 10)

**1. [Claude 4.7/4.8/5.0/Fable: Repetitive rhetorical tics & poor prose](https://github.com/anthropics/claude-code/issues/77136)**  
*#77136 · 50 comments · 👍316*  
Sustained community frustration: newer models "default to repetitive rhetorical tics" and struggle with coherent prose despite explicit style instructions. One of the highest-signal model-quality complaints, trending up.

**2. [Cross-session messages leave queries unresponsive until idle-timeout](https://github.com/anthropics/claude-code/issues/86012)**  
*#86012 · 31 comments · 👍6*  
Regression across Windows/macOS/desktop/agent-view: recipient sessions hang (`hadFirstResponse=false`) for 15–20 min. Reproducer included; impacts the new cross-session messaging rollout.

**3. [Multi-account switching in Claude Mobile](https://github.com/anthropics/claude-code/issues/36151)**  
*#36151 · 161 comments · 👍621*  
Older request, still dominant by engagement. Users want account switching without shared email—high demand, broad user base.

**4. [Claude Code Desktop fails to relaunch on Windows (orphaned process lock)](https://github.com/anthropics/claude-code/issues/42776)**  
*#42776 · 125 comments · 👍62*  
Persistent Windows launch failure due to orphaned file locks. One of the longest-running Windows bugs; likely related to recent MSIX container issues (#87879).

**5. [MCP tool calls in CCR Routines fail with "requires approval" — no UI shown](https://github.com/anthropics/claude-code/issues/61044)**  
*#61044 · 18 comments · 👍6*  
Blocked approval flow for MCP tools in routines. No UI, reconnect doesn't fix. Impacts automation workflows.

**6. [Server-side experiment silently removed Opus 4.8 thinking summaries + CLI self-updated despite autoUpdates:false](https://github.com/anthropics/claude-code/issues/75607)**  
*#75607 · 8 comments · 👍11*  
Trust/transparency issue: server-side flag (`x-cc-atis`) removed features silently, and CLI ignored user config. Settings overridden without notice.

**7. [MCP Apps widgets stopped rendering after version-negotiation rollout (2.1.234)](https://github.com/anthropics/claude-code/issues/88370)**  
*#88370 · 5 comments*  
Staged server-side rollout of `server/discover` broke UI widgets (`_meta.ui.resourceUri`)—no client change needed. Points to server/client contract instability.

**8. [Opus 5: treats direct instructions as negotiations; injects self-referential/interpersonal content](https://github.com/anthropics/claude-code/issues/87491)**  
*#87491 · 4 comments · 👍1*  
Model behavior regression: Opus 5 "negotiates" instructions and injects unwanted interpersonal framing. Reinforces concerns in #77136.

**9. [2.1.238 regression: interactive CLI sessions persist thinking as signature-only husks](https://github.com/anthropics/claude-code/issues/88383)**  
*#88383 · 2 comments*  
New regression in latest release: thinking blocks saved as empty husks (`thinking: ""`) in session JSONL for `cli` entrypoint. Debugging/logging impact.

**10. [Desktop app CCD UserDialogBroker cancels every unknown dialog kind → AskUserQuestion aborts 100%](https://github.com/anthropics/claude-code/issues/88087)**  
*#88087 · 1 comment*  
Deterministic failure of `AskUserQuestion` in desktop sessions—root cause identified, fix proposed in the issue. Critical for agentic workflows.

---

## 4. Key PR Progress

*No pull requests were updated in the last 24 hours (0 items).*

---

## 5. Feature Request Trends

- **Account & session portability**: Multi-account switching (#36151), cross-platform session messaging parity (#87870), and daemon/background mode with persistence (#88197) signal demand for "always-on, multi-device" workflows.
- **Model behavior control**: Users want stricter adherence to instructions (fewer rhetorical tics, no negotiation) and transparency around server-side experiments (#75607, #87491, #77136).
- **Policy customization & observability**: Requests for granular permissions, better debugging of approvals (#61044), and session transparency (#88383) are common across recent items.
- **Windows & MSIX reliability**: Multiple issues on launch failures, container silos, and cross-session messaging gaps—Windows support remains a top recurring request thread.

---

## 6. Developer Pain Points

- **Silent behavior changes**: Server-side experiments, forced auto-updates, and hidden settings overrides erode trust (#75607, #88370).
- **Model quality regressions**: Repetitive phrasing, "negotiating" instructions, and poor prose coherence are top-of-mind (#77136, #87491).
- **Windows-specific instability**: Orphaned locks, MSIX container leaks, launch failures—recurring themes across the last months (#42776, #87879, #87607).
- **Data loss & session-state bugs**: Dropped transcript blocks (#88274), lost early conversation segments (#88410), and empty thinking husks (#88383) block reliable debugging and auditing.
- **MCP tooling friction**: Unreliable approval flows (#61044), parameter stringification (#86459), and widget breakage (#88370) complicate MCP adoption.
- **Documentation/implementations mismatch**: Symlinks in `.claude/rules/` not resolved (#88405), hookify prefix bugs (#79143)—docs promise features that silently don't work.
- **Persistent auth pain**: Daily `/login` re-prompts with Max subscriptions (#78037) remain unresolved for some users.

---

*Digest generated from GitHub data for `anthropics/claude-code` — 2026-08-21.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-21

## Today's Highlights

The Codex team shipped **rust-v0.149.0** with a new interactive `codex agents` dashboard and TUI working-directory commands, alongside several alpha releases in the 0.150.0 line. However, a wave of **Windows archive/auth regressions** dominate the issue tracker this week, with multiple reports of conversations failing to archive and accounts being signed out when opening existing threads (#39162, #39150, #39189). On the PR front, the team is making steady progress on sandbox hardening, Bedrock multi-agent support, and TUI quality-of-life improvements.

## Releases

| Version | Type | Highlights |
|---------|------|------------|
| **rust-v0.149.0** | Stable | New interactive `codex agents` dashboard — search, start, open, rename, stop tasks with configurable shortcuts (#39094, #39112, #39114, #39142). Added `/cd`, `/pwd`, `/cwd` commands for TUI working-directory management (#38894). |
| **rust-v0.150.0-alpha.1** | Alpha | Continued 0.150 development line. |
| **rust-v0.149.0-alpha.7/4/3** | Alpha | Prerelease iterations leading to v0.149.0. |

## Hot Issues (Top 10)

1. **[#39162 — macOS auth invalidated on opening existing conversation](https://github.com/openai/codex/issues/39162)** — 28 comments, 21 👍. Opening an existing conversation triggers a sign-in redirect and invalidates ChatGPT auth after a recent update. This is a **critical blocker** with broad community impact; the regression appeared between builds 26.810.52044 and 26.814.41407.

2. **[#28276 — Failed to archive conversation + ghost threads](https://github.com/openai/codex/issues/28276)** — 23 comments, 5 👍. Long-running issue (since June) where archiving fails with a generic error and orphaned threads appear without context. Still unresolved after two months — a known pain point.

3. **[#23200 — Headless remote Linux hosts for Codex mobile](https://github.com/openai/codex/issues/23200)** — 20 comments, **49 👍**. The most-upvoted open issue. Users want mobile remote control to target always-on Linux servers directly, without requiring a personal desktop to stay online. Clear signal for a **headless agent/server mode**.

4. **[#33493 — Local compaction v2 retains unbounded image payloads](https://github.com/openai/codex/issues/33493)** — 19 comments, 4 👍. Image-heavy threads enter a repeated auto-compaction loop because input_image payloads aren't cleaned up. Causes severe performance degradation in long-running desktop sessions. Pending fix in PR #39825's area (compaction rework).

5. **[#39189 — Windows: opening thread signs out Pro account](https://github.com/openai/codex/issues/39189)** — 16 comments, 3 👍. Mirrors the macOS auth regression (#39162) on Windows; workspace-only settings 401 invalidates personal Pro auth. Suggests a systemic auth-handling bug in the 26.814 line.

6. **[#35746 — Paginated history drops rollout records and reuses ordinals](https://github.com/openai/codex/issues/35746)** — 16 comments. Pagination in CLI history loses valid `RolloutLine` records and reuses ordinal numbers, corrupting session history rendering. Affects the Rust CLI's reliability for long sessions.

7. **[#39150 — Windows: cannot archive conversations with \\?\ path prefix](https://github.com/openai/codex/issues/39150)** — 12 comments, 2 👍. Extended-length Windows paths (`\\?\`) break archiving entirely. Regression specific to the 26.814 Windows build — pairs with the broader archive failures in #39627 and #39705.

8. **[#39161 — "Could not archive conversation" on Windows MSIX](https://github.com/openai/codex/issues/39161)** — 9 comments, **14 👍**. High community resonance for a Windows-only archive failure. Reporter notes a "stronger variant" of the bug, suggesting multiple archive code paths are broken.

9. **[#38939 — macOS: runaway computer-use threads cause fatal V8 OOM](https://github.com/openai/codex/issues/38939)** — 5 comments. **Critical / app-unusable** label. Computer-use spawns unbounded threads until dispatch-thread exhaustion crashes the app. High severity despite lower comment count.

10. **[#38503 — Web: "Too many requests" blocks chat and Work tasks](https://github.com/openai/codex/issues/38503)** — 5 comments, **10 👍**. Rate-limit modal on chat.openai.com blocks access and disrupts Work tasks. Community impact is high given how widely this affects daily usage.

## Key PR Progress (Top 10)

1. **[#39827 — History and notes tools for token-budget sessions](https://github.com/openai/codex/pull/39827)** — Direct-model `history` tools for listing/reading windows/items and preserving working state across context-window transitions. Addresses the compaction pain point surfaced in #33493.

2. **[#39825 — Responses compaction for Amazon Bedrock](https://github.com/openai/codex/pull/39825)** — Switches Bedrock remote compaction to `/v1/responses` `compaction_trigger` items, removing the legacy dedicated compaction protocol. Standardizes compaction across providers.

3. **[#39822 — Preserve uncapped Guardian classifier instructions](https://github.com/openai/codex/pull/39822)** — Fixes an implicit token limit in Guardian v2 that truncated classifier policy when no limit was configured.

4. **[#39813 — Defer legacy filesystem policy projection](https://github.com/openai/codex/pull/39813)** — Performance optimization: only computes legacy filesystem policy when a cwd change actually triggers policy rebinding.

5. **[#39812 — Avoid materializing writable-root carveouts](https://github.com/openai/codex/pull/39812)** — New `has_writable_roots_with_cwd` helper avoids constructing read-only carveouts for presence checks, improving permission-profile classification.

6. **[#39811 — Restrict macOS preference reads to full-disk policies](https://github.com/openai/codex/pull/39811)** — **Security fix**: macOS preferences service could expose data outside sandbox read roots; now gated behind full-disk access policies.

7. **[#39804 — Multi-agent V1 for Amazon Bedrock models](https://github.com/openai/codex/pull/39804)** — Normalizes Bedrock catalogs to `MultiAgentVersion::V1` since the provider doesn't support V2 response items.

8. **[#39809 — Preserve WINDIR in core Windows shell environments](https://github.com/openai/codex/pull/39809)** — Adds `WINDIR` to the Windows environment allowlist; test verifies case-variant `WinDir` is retained.

9. **[#39802 — Optimize case-insensitive thread history matching](https://github.com/openai/codex/pull/39802)** — Monotonic span cursors map lowercase match offsets back to original text, avoiding rescanning all spans per occurrence.

10. **[#39786 — Host-accepted exec-server WebSockets](https://github.com/openai/codex/pull/39786)** — New `EnvironmentManager::from_accepted_websocket` lets embedding hosts construct remote environments from already-authenticated WebSockets.

## Feature Request Trends

1. **Headless/remote Linux support** (#23200, 49 👍) — The strongest community demand. Users want to run Codex agents on always-on Linux servers without a desktop host; mobile remote control should target these directly.

2. **Remote Control for host General Chats** (#22947, 7 👍) — Extend remote control beyond Projects to include projectless/general chats on the host.

3. **Token/usage efficiency for subagents** (#39808) — Multi-agent fan-out incurs fixed per-agent context overhead; users want usage-aware scheduling or shared context.

4. **TUI/CLI ergonomics** — The new `/cd`, `/pwd`, `/cwd` commands and hostname status-line item show the team is actively investing here; community requests (e.g., optional markdown in VS Code input, #37972) continue.

5. **Configurable plugin behavior** (#39682) — Users want `remote_plugin=false` to actually disable remote plugin downloads; configuration transparency is increasingly important.

## Developer Pain Points

1. **Conversation archive failures on Windows** — A cluster of related bugs (#39150, #39161, #39627, #39705, #39226) with path-prefix and SQLite path-alias causes. This is the **most-recurring theme** in the last 24h and affects a large Windows user base. Multiple code paths appear broken simultaneously.

2. **Auth invalidation regressions on both macOS and Windows** (#39162, #39189) — Opening existing threads can sign users out entirely. The dual-platform incidence suggests a shared auth-layer regression, not platform-specific drift.

3. **Compaction and context-window management** (#33493, #35746) — Unbounded image payloads, dropped rollout records, and ordinal reuse make long-running sessions unreliable. Token-budget handling is a systemic concern.

4. **Windows Remote Control instability** (#31973, #35499, #39817) — Remote connections getting stuck in "Reconnecting…" or silently breaking after updates is a recurring, hard-to-recover failure mode.

5. **Sandbox edge cases** (#23661: worktree `index.lock` read-only; #38425: AppX apply_patch targeting; #31434: writes outside writable roots without approval). Sandbox correctness is improving (see PRs #39811–39813) but several long-lived issues remain open.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-08-21

## Today's Highlights

Two nightly releases shipped this week with fixes for shell execution resource leaks and symlink handling in ignore paths. The community is most vocal about model availability (Flash 3.5/3.6/3.7 support — 41 👍) and subagent reliability issues, particularly false "GOAL" success reports after MAX_TURNS interruptions. Notably, a PR adding support for Gemini 3.7/3.6 Flash and 3.5 Flash-Lite was merged, which directly addresses the top-voted feature request.

---

## Releases

**v0.56.0-nightly.20260821.g30573d2e4** (2026-08-21)
- fix(core): consistent symlink evaluation in ignore path handling ([#28915](https://github.com/google-gemini/gemini-cli/pull/28915))
- refactor(core): remove eslint-disable and type-asserts from shellExecutionService

**v0.56.0-nightly.20260820.ge90c63fa1** (2026-08-20)
- fix(core): preserve empty text turns with tools or media ([#28892](https://github.com/google-gemini/gemini-cli/pull/28892))
- Changelog for v0.57.0-preview.0 ([#28918](https://github.com/google-gemini/gemini-cli/pull/28918))

---

## Hot Issues (Top 10)

1. **[#28802 — Latest Gemini models fully available (Flash 3.5/3.6/3.7)](https://github.com/google-gemini/gemini-cli/issues/28802)** — *41 👍, 11 comments*  
   The most-voted issue this week, repeatedly requesting full Flash 3.5/3.6/3.7 support. This was satisfied by merged PR #28910, though the issue remains open pending release.

2. **[#22323 — Subagent recovery after MAX_TURNS falsely reports GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — *12 comments, 2 👍*  
   P1 bug: `codebase_investigator` subagent reports `status: "success"` even when it hit MAX_TURNS before doing any analysis, hiding the interruption from users. Long-running (since March) with retest pending.

3. **[#21409 — Generalist agent hangs indefinitely](https://github.com/google-gemini/gemini-cli/issues/21409)** — *8 comments, 8 👍*  
   P1: CLI hangs forever when deferring to the generalist agent — even for simple folder creation. Workaround: instructing the model not to use subagents. Still under need-retesting.

4. **[#25166 — Shell command stuck with "Waiting input" after completion](https://github.com/google-gemini/gemini-cli/issues/25166)** — *4 comments, 3 👍*  
   P1: After simple CLI commands that don't await input, the shell hangs and shows "Awaiting user input". Recurring issue significantly impacting UX.

5. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** — *4 comments, 1 👍*  
   P1: Browser subagent crashes with `Termination Reason: GOAL` on Wayland sessions. Environment-specific but blocking for affected users.

6. **[#19873 — Zero-dependency OS sandboxing & post-execution intent routing](https://github.com/google-gemini/gemini-cli/issues/19873)** — *8 comments, 1 👍*  
   Enhancement proposal: leverage Gemini 3's native bash affinity via OS-level sandboxing with post-execution intent routing to balance power and safety.

7. **[#21968 — Gemini doesn't use custom skills and sub-agents proactively](https://github.com/google-gemini/gemini-cli/issues/21968)** — *6 comments*  
   Anecdotal but widely-hypothesized: CLI ignores custom skills/sub-agents unless explicitly instructed, even for highly related work (e.g., gradle/git skills).

8. **[#26522 — Auto Memory retries low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)** — *5 comments*  
   P2: Sessions deemed low-signal by the extraction agent remain unprocessed forever and get resurfaced repeatedly, wasting tokens.

9. **[#22672 — Agent should stop/discourage destructive behavior](https://github.com/google-gemini/gemini-cli/issues/22672)** — *3 comments, 1 👍*  
   Model occasionally uses `git reset`/`--force` or destructive DB operations when safer alternatives exist. Safety-critical improvement for production workflows.

10. **[#22745 — AST-aware file reads, search, and codebase mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** — *7 comments, 1 👍*  
    Epic evaluating AST-aware tools for precise method-bound reads, navigation, and reduced token noise — aligned with "Tactful Extraction" goals.

---

## Key PR Progress (Top 10)

1. **[#28910 — Add Gemini 3.7 Flash and 3.6 Flash model configurations](https://github.com/google-gemini/gemini-cli/pull/28910)** — *MERGED, size/xl*  
   Full support for Gemini 3.7 Flash, 3.6 Flash, and 3.5 Flash-Lite across core and CLI. Directly resolves the top community request.

2. **[#28863 — Consent prompt for env changes; sanitize runtime-altering variables](https://github.com/google-gemini/gemini-cli/pull/28863)** — *Open, size/m*  
   Extensions could bypass user consent and inject unauthorized environment variables into MCP server processes. Adds consent strings + sanitization.

3. **[#28938 — Keep GIT_CONFIG_* environment triplets consistent](https://github.com/google-gemini/gemini-cli/pull/28938)** — *Open, P1, size/l*  
   `sanitizeEnvironment()` can emit malformed `GIT_CONFIG_*` directives that cause **every** git invocation to fail. Critical fix for environment-sanitized workflows.

4. **[#28939 — Avoid persisting interrupted response placeholder](https://github.com/google-gemini/gemini-cli/pull/28939)** — *Open, size/l*  
   Fixes #28927: Synthetic text `[The previous response was interrupted before it completed.]` is persisted into model-authored history, polluting future context.

5. **[#28934 — History rollback and retry nudge optimizations](https://github.com/google-gemini/gemini-cli/pull/28934)** — *Open, size/l*  
   Reduces context bloat and API request volume on retry nudges via rollback on tool cancellation and prefix-cache optimization.

6. **[#28935 — Isolate Docker/container sockets in macOS Seatbelt](https://github.com/google-gemini/gemini-cli/pull/28935)** — *Open, size/l*  
   Prevents sandbox escape via Docker Desktop VirtioFS, container runtime daemon sockets, and XPC lookups. Security-critical for macOS sandboxing.

7. **[#28940 — A2A server: clear stale cancellation error on new turns](https://github.com/google-gemini/gemini-cli/pull/28940)** — *Open, size/l*  
   Fixes state corruption after aborted/cancelled requests where subsequent prompts crash with `Execution aborted`.

8. **[#28828 — Warn when preview model is silently substituted](https://github.com/google-gemini/gemini-cli/pull/28828)** — *Open, P1, size/m*  
   Fixes #28825: Cli silently rewrites `gemini-3.1-pro-preview` to `auto-gemini-2.5` when no entitlement exists — zero user feedback. Adds warning.

9. **[#28915 — Consistent symlink evaluation in ignore path handling](https://github.com/google-gemini/gemini-cli/pull/28915)** — *MERGED*  
   Fixes `~/.gemini/agents/` symlink recognition (issue #20079) and `.geminiignore`/`.gitignore` consistency across literal and canonical paths.

10. **[#28930 — Drop unsafe `diff.external` override](https://github.com/google-gemini/gemini-cli/pull/28930)** — *Open, P1, size/m*  
    Fixes #28928: PR #28792 added `['diff.external', '']` which git rejects — breaking **all** git invocations in the sandbox.

---

## Feature Request Trends

1. **Model availability (🔥 highest demand)** — Community strongly wants immediate support for the newest Gemini models (Flash 3.5/3.6/3.7). Partially resolved with merged PR #28910.

2. **Subagent observability & transparency** — Requests for subagent trajectories in `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), bug reports including subagent context ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), and better `bugreport` output.

3. **Proactive skill/subagent usage** — Users expect the CLI to leverage custom skills and subagents autonomously ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)) rather than only on explicit instruction.

4. **AST-aware tooling** — Growing interest in AST-aware file reads, search, mapping, and CLI tools to reduce token waste and improve navigation precision ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)).

5. **Self-awareness of CLI capabilities** — Agent should know its own flags, hotkeys, and mechanics to act as its own expert guide ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).

---

## Developer Pain Points

- **False success reporting on subagent termination:** Subagents report success after MAX_TURNS or failures ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) — erodes trust in agent outcomes.
- **Hangs and stuck states:** Generalist agent hangs indefinitely ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell "Waiting input" stuck state ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and hanging on interactive prompts like Vite ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) remain significant blockers.
- **Context bloat and token waste:** Large file reads, retry nudges, and repeated low-signal sessions ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)) inflate context usage; Tactful Extraction ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) is the proposed fix.
- **CLI model-availability gap:** Users feel the CLI lags behind the model horizon, repeatedly requesting latest model support.
- **Sandbox/security issues:** Destructive commands (git reset, --force) not discouraged by default ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)), and Docker/container sandbox escapes under macOS ([#28935](https://github.com/google-gemini/gemini-cli/pull/28935)) reveal security gaps.
- **Config overrides ignored:** Browser agent ignores `settings.json` overrides like `maxTurns` ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) — a subset of a broader configuration reliability problem.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-21

## Today's Highlights

Version 1.0.81-6 shipped with two meaningful quality-of-life improvements: configurable startup mode and permission behavior for interactive sessions, plus token-based authentication via stdin for scripting. Meanwhile, the issue tracker shows a heavy concentration of MCP integration problems—policy false-negatives, OAuth bridging failures, and connection leaks—suggesting MCP remains the most brittle corner of the CLI. A new batch of triage-stage issues around WSL session anchoring, sandbox limitations, and `store_memory` failures in the 1.0.81 prerelease line signal ongoing friction in the latest release candidate.

## Releases

**v1.0.81-6** (prerelease)

- **Added**: `defaultMode` and `defaultPermissionMode` settings to control startup mode and approval behavior for new interactive sessions
- **Added**: `--with-token` flag for `copilot login` to read an auth token from stdin
- **Improved**: ACP clients now receive subagent IDs, raw event subscriptions, and live title/mod updates

## Hot Issues

1. **[#1481 — SHIFT+ENTER executes prompt instead of inserting line break](https://github.com/github/copilot-cli/issues/1481)** (28 comments, 17 👍)
   The CLI uses CTRL+ENTER for line breaks, conflicting with the universal SHIFT+ENTER convention. Closed after substantial community discussion—a UX consistency issue that generated significant engagement.

2. **[#4390 — Enabled org models missing from catalogue (Claude Sonnet 5/Opus 5, Kimi K3)](https://github.com/github/copilot-cli/issues/4390)** (15 comments, 7 👍)
   Models explicitly enabled in Copilot Business org settings are absent from the CLI's catalogue, with Anthropic models reporting "disabled by your organization." Closed, but reflects ongoing enterprise model-provisioning pain.

3. **[#3162 — MCP servers falsely reported as blocked by policy](https://github.com/github/copilot-cli/issues/3162)** (7 comments, 1 👍)
   Version 1.0.42 mislabels registry-listed custom MCP servers as blocked. A false-negative in registry validation that erodes trust in policy enforcement.

4. **[#4096 — OAuth token never bridged from app to CLI sessions (Atlassian MCP)](https://github.com/github/copilot-cli/issues/4096)** (6 comments, 2 👍)
   Third-party MCP server shows "Connected" in the GitHub Copilot app UI, but tools are unavailable in CLI sessions because the OAuth token is never passed through. A visible gap between app and CLI integration.

5. **[#4503 — SDK server reports ready without auth; Slack session creation fails](https://github.com/github/copilot-cli/issues/4503)** (5 comments)
   The SDK server reports itself ready despite a missing `COPILOT_SDK_AUTH_TOKEN`, leading to generic session-creation failures. A startup-validation gap that produces misleading errors.

6. **[#4439 — GitLab MCP OAuth rejected due to RFC 8414 issuer mismatch](https://github.com/github/copilot-cli/issues/4439)** (5 comments, 3 👍)
   CLI 1.0.79 fails OAuth against GitLab Self-Managed MCP servers—strict issuer validation breaks legitimate self-hosted setups.

7. **[#4422 — All Claude models disabled under CLI model selection](https://github.com/github/copilot-cli/issues/4422)** (4 comments, 3 👍)
   Works yesterday, broken today: personal Enterprise account loses all Claude models despite settings showing enabled. Rollback doesn't help.

8. **[#4535 — `store_memory` fails in 1.0.81 prereleases: "Instance id is required"](https://github.com/github/copilot-cli/issues/4535)** (Open, 3 comments)
   Native memory writer invoked without required instance ID in 1.0.81 prereleases. A regression in the latest release candidate that breaks memory persistence.

9. **[#3698 — MCP server connect leak: unbounded child process accumulation](https://github.com/github/copilot-cli/issues/3698)** (1 comment, 3 👍)
   Slow stdio MCP servers spawn child processes that are never reaped; they accumulate on every reconnect, pinning CPU. Long-standing (filed June) resource-management bug.

10. **[#4542 — Workspace .mcp.json detected but not connected in agent sessions](https://github.com/github/copilot-cli/issues/4542)** (Open, 1 👍)
    `mcp list` and `mcp get` show workspace servers as enabled, but they're never actually connected in interactive, `-i`, or `-p` sessions. A detection-vs-connection disconnect that undermines the MCP configuration model.

## Key PR Progress

1. **[#4510 — Remove GitHub Copilot CLI documentation from README](https://github.com/github/copilot-cli/pull/4510)** (Open)
   The only PR in the last 24 hours. Removes installation instructions and usage guidelines from the README. Slim pickings this cycle, but worth watching—likely tied to a docs relocation effort.

## Feature Request Trends

- **Session persistence and continuity**: Multiple requests for preserving state across restarts—reasoning effort persistence ([#4530](https://github.com/github/copilot-cli/issues/4530)), multi-turn `/ask` conversations ([#4538](https://github.com/github/copilot-cli/issues/4538)), and recent-session recovery after Ctrl+Z ([#4539](https://github.com/github/copilot-cli/issues/4539)).
- **Editor experience**: Community wants paste-image support in freeform question inputs ([#4544](https://github.com/github/copilot-cli/issues/4544)) and a queue editor with Add action and pause-on-open semantics ([#4541](https://github.com/github/copilot-cli/issues/4541)).
- **Configuration defaults**: Users increasingly want persisted defaults (mode, permissions, reasoning effort) rather than session-scoped settings, as reflected in release 1.0.81-6's new `defaultMode`/`defaultPermissionMode` settings.

## Developer Pain Points

- **MCP is the top friction source**: Policy false-positives ([#3162](https://github.com/github/copilot-cli/issues/3162)), OAuth bridging failures ([#4096](https://github.com/github/copilot-cli/issues/4096)), issuer validation rejects ([#4439](https://github.com/github/copilot-cli/issues/4439)), process leaks ([#3698](https://github.com/github/copilot-cli/issues/3698)), and detection-vs-connection gaps ([#4542](https://github.com/github/copilot-cli/issues/4542)) span the entire MCP lifecycle.
- **WSL support is fragmented**: Sessions anchor to Windows host instead of WSL ([#4543](https://github.com/github/copilot-cli/issues/4543)), sandboxes can't run VS Code remote ([#4546](https://github.com/github/copilot-cli/issues/4546)), and session state is split across two store files.
- **Enterprise policy handling is inconsistent**: Non-interactive `--yolo` bypasses `disableBypassPermissionsMode` ([#4528](https://github.com/github/copilot-cli/issues/4528)), and valid enum values in managed settings can fail closed and block all local MCP servers ([#4349](https://github.com/github/copilot-cli/issues/4349)).
- **The 1.0.81 prerelease line has regressions**: `store_memory` failures ([#4535](https://github.com/github/copilot-cli/issues/4535)) and pending-line rendering duplication ([#4532](https://github.com/github/copilot-cli/issues/4532)) suggest instabilities that should be watched before cutting stable.
- **Windows-specific quirks persist**: WebView2 renderer self-aborts ([#4492](https://github.com/github/copilot-cli/issues/4492)), `wta.exe` path-quoting bugs ([#4540](https://github.com/github/copilot-cli/issues/4540)), and empty `GIT_CONFIG_VALUE` entries breaking Git discovery in VS Code launches ([#4531](https://github.com/github/copilot-cli/issues/4531)).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-08-21

## Today's Highlights

Community activity this week is centered on a single, substantial proposal to extend Kimi Code CLI with workspace-scoped long-term memory (issue [#2613](https://github.com/MoonshotAI/kimi-cli/issues/2613)), accompanied by a companion documentation PR ([#2614](https://github.com/MoonshotAI/kimi-cli/pull/2614)) that clarifies plugin security boundaries and credential handling. No new releases or patches were published in the last 24 hours. The lack of release activity contrasts with the growing demand for persistent context and safer third-party plugin execution.

## Releases

No new releases were published in the last 24 hours.

## Hot Issues

1. **[#2613 — Proposal: Kimi Memory Plus — workspace-scoped long-term memory plugin](https://github.com/MoonshotAI/kimi-cli/issues/2613)** (by QIANLING-0831)  
   A detailed proposal to extend the CLI with explicit-memory tools exposed as an stdio MCP server. The author notes a compatibility gap: the current CLI registers such tools but does not recognize the experimental `kimi-memory` repository, creating friction for early adopters. No comments yet, but this directly addresses a top community pain point around persistent context.

2. *(No other issues were updated in the last 24h. Due to a limited dataset, this section lists only the single active item above. Historical trends are reflected in the sections below.)*

## Key PR Progress

1. **[#2614 — docs(plugins): document security and persistent data](https://github.com/MoonshotAI/kimi-cli/pull/2614)** (by QIANLING-0831)  
   Clarifies plugin execution context (local subprocess with the current user's file/network access), advises against logging injected secrets, documents reinstall semantics, and recommends a dedicated directory to host persistent plugin data. This is a much-needed contribution given the community's repeated confusion around plugin permissions and secret leakage.

## Feature Request Trends

- **Workspace-scoped persistent memory** — The single most prominent request. Developers want the CLI to remember project-specific conventions, past decisions, and user preferences across sessions, ideally without relying on external `.md` files.
- **MCP integration for memory tools** — The proposal specifically routes through the existing stdio MCP registration path, signaling a broader trend toward composable tooling rather than a monolithic CLI with hardcoded features.
- **Documentation of plugin security boundaries** — Though expressed via PR rather than an issue, the companion PR points to a clear need: developers are unsure what plugin subprocesses can touch and how to handle injected credentials safely.

## Developer Pain Points

- **Context loss across sessions** — Users frequently restart Kimi Code CLI sessions and lose all conversational context, forcing them to re-explain project state. The memory plugin proposal directly targets this.
- **Plugin security ambiguity** — The PR's focus on subprocess permissions and credential hygiene suggests developers are either misusing injected secrets or are uncertain whether plugins run in a sandbox. The fact that the fix is documentation, not sandboxing, implies a gap between user expectations and the current implementation (plugins run with full user access).
- **Integration friction with experimental repos** — The issue explicitly calls out that Kimi Code CLI does not recognize the official memory repository's experimental tooling, indicating that even first-party extensions face onboarding friction.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-21

## Today's Highlights

OpenCode shipped **v1.18.19** with native Cloudflare AI Gateway passthroughs and tighter Codex rate-limit alignment. Performance remains the dominant community concern, with multiple open threads on CPU spikes, TUI lag under concurrent subagents, and memory growth — though promising fixes are landing, including a PR that eliminates costly deep-cloning of session parts (fixes #35107). The 2.0 branch is also showing active community contributions, with several crash reports and a critical subagent sessionID blocker already logged.

---

## Releases

**v1.18.19** — Core improvements:
- Added native OpenAI and Anthropic passthroughs for Cloudflare AI Gateway models
- Matched Codex rate limits more closely to ChatGPT subscription limits (@GameOn223)
- Bugfixes: removed built-in Qwen sampling defaults that could send unsupported settings; plus additional fixes (truncated in source data)

---

## Hot Issues

1. **[#30086 — High CPU usage in newer versions](https://github.com/anomalyco/opencode/issues/30086)** — 47 comments, 24 👍. User reports severe CPU spike since ~7 days ago; 10 concurrent sessions now impossible, 3 causes laggy mouse. Top community concern currently; attention is on release-window regression.

2. **[#4754 — Copy & paste behavior under Linux](https://github.com/anomalyco/opencode/issues/4754)** — 17 comments, 18 👍. Long-standing issue detailing dual-buffer conflict. Closed, but still heavily upvoted — a signal that Linux UX polish is a strong community priority.

3. **[#30158 — Terminal button in web UI disappears](https://github.com/anomalyco/opencode/issues/30158)** — 12 comments, 14 👍. Regression since v1.15.12; downgrading to v1.15.11 restores icons. Several UI elements affected, not just terminal.

4. **[#27474 — TypeError: Failed to fetch](https://github.com/anomalyco/opencode/issues/27474)** — 10 comments. Reproducible error when clicking "Explore" or agent tiles without navigating into a child agent. UI-state bug affecting navigation flow.

5. **[#7675 — Install script ignores OPENCODE_INSTALL_DIR](https://github.com/anomalyco/opencode/issues/7675)** — 10 comments, 9 👍. Installer hardcodes `$HOME/.opencode/bin`; expected priority order for env vars is documented but not implemented. Closed, but a frequent onboarding annoyance.

6. **[#27875 — Stuck at permission granting; Enter key not working](https://github.com/anomalyco/opencode/issues/27875)** — 9 comments. Sub-agent permission cycle deadlock where Enter doesn't confirm; Ctrl+Enter inserts newline only. Blocks unattended/agent-heavy workflows.

7. **[#43619 — [2.0] subagent: required sessionID prevents spawning first child session](https://github.com/anomalyco/opencode/issues/43619)** — 9 comments. In 2.0, the `subagent` tool schema requires `sessionID` even though docs say to omit it for a new session. Blocks all coding-delegation workflows; high priority for V2 adopters.

8. **[#20458 — Mouse escape sequences garbled after TUI exit](https://github.com/anomalyco/opencode/issues/20458)** — 8 comments, 5 👍. After quitting TUI, terminal shows raw escape codes (e.g., `35;89;19M`). Terminal-hygiene bug, separate from in-session garbling (#3199).

9. **[#35107 — Memory keeps growing until bun process is killed](https://github.com/anomalyco/opencode/issues/35107)** — 4 comments. `updatePart` calls `structuredClone` on every part update; text parts up to 488 KB; ~93K events over 200 sessions creates massive heap pressure. Root cause identified; fix PR now open (#43733).

10. **[#42657 — TUI lag with multi-subagent sessions (97% CPU)](https://github.com/anomalyco/opencode/issues/42657)** — 3 comments. 1–3 second typing delay with 2–4 concurrent subagents; reproduced across Warp, Windows Terminal, WezTerm. Render-thread bottleneck.

---

## Key PR Progress

1. **[#43738 — fix(app): speed up cold home navigation](https://github.com/anomalyco/opencode/pull/43738)** — Desktop Home navigation was bimodal: warm at ~86 ms, cold at 495–639 ms (618 ms median). Fix targets Home query cache. Merged.

2. **[#42980 — fix(core): reduce Windows server CPU under parallel sessions](https://github.com/anomalyco/opencode/pull/42980)** — +88.2% Live Event throughput (77,537 → 145,942 Events/s) with 48.4% less CPU work. Profile showed most active samples in process spawn and executable resolution. Merged.

3. **[#43733 — fix(core): avoid deep cloning session parts](https://github.com/anomalyco/opencode/pull/43733)** — Fixes #35107. Eliminates `structuredClone` on every part update; removes major heap-pressure source. Directly addresses the runaway memory issue.

4. **[#43675 — [contributor] fix(opencode): answer subagent permissions in run](https://github.com/anomalyco/opencode/pull/43675)** — Tracks child/nested sessions for non-interactive runs; auto-approves/rejects permissions only for that run tree. Adds subprocess coverage. Closed.

5. **[#43677 — [contributor] fix(core): send console anthropic api key header](https://github.com/anomalyco/opencode/pull/43677)** — Translates Console Bearer credentials to `x-api-key` for Anthropic Messages requests; scoped to OpenCode provider + Anthropic protocol, with regression test.

6. **[#43735 — [contributor] fix(client): authenticate PTY websocket connections](https://github.com/anomalyco/opencode/pull/43735)** — Adds single-use ticket minting before PTY WebSocket open; routes desktop terminal through authenticated path, removing raw-fetch fallback.

7. **[#43734 — [contributor] fix(tui): scope prompt history by session](https://github.com/anomalyco/opencode/pull/43734)** — Persists originating session ID per prompt; independent history cursors per session/tab; migrates legacy entries. Open.

8. **[#43715 — fix(opencode): preserve Cerebras completion limit](https://github.com/anomalyco/opencode/pull/43715)** — Cerebras rejects requests with both `max_tokens` and `max_completion_tokens`. Suppresses synthesized `max_tokens` when native option present. Two related PRs (#43736 duplicated by bot).

9. **[#43650 — fix(core): prevent shell eviction loop](https://github.com/anomalyco/opencode/pull/43650)** — Removes stale shell IDs from exit-order queue even after session entry is gone; prevents retention eviction spinning forever. Closed.

10. **[#43681 — fix(core): resolve Bedrock AWS profile credentials for V2](https://github.com/anomalyco/opencode/pull/43681)** — Community patch from Amazon One Medical (used locally 1.5 weeks). Resolves #40663; Bedrock + V2 currently broken. Open.

---

## Feature Request Trends

- **UI persistence & configuration** — Repeated asks for persistent `ui.sidebar.enabled` config (#40086), option to hide diffs in TUI output (#43739), and store OpenCode root files in a user-selected directory (#43700). Pattern: users want more control over TUI/desktop layout and file organization.
- **Provider credential lifecycle** — Support refreshing provider credentials without restarting CLI (#43281), with configurable token refresh command/interval for custom providers. Suggests production use with short-lived credentials.
- **Per-MCP-server trust configuration** — PR #40125 (open) adds fingerprint pinning per MCP server for self-signed certs, avoiding global `insecure: true`. Driven by enterprise/private CA environments.
- **Context window limits for local models** — Cannot set context window for local OpenAI-compatible providers (LM Studio/Ollama/Jan); defaults to 0 (#31433). Growing local-model user base.

---

## Developer Pain Points

- **Performance regressions and CPU/memory leaks dominate** — #30086 (CPU spike), #35107 (memory growth), #42657 (TUI lag), #34574 (AI SDK EventTarget leak, 8G RSS in 20 min). Performance is the #1 recurring topic; the Windows CPU fix (#42980) and deep-clone removal (#43733) are direct responses.
- **Concurrent subagent sessions degrade UX** — TUI lag, permission deadlocks (#27875), and high CPU when running 2–4 subagents. Affects power users running parallel coding workflows.
- **2.0 stability gaps** — Crashes (segfault on Windows PowerShell, "remove expects a renderable child object" in TUI), subagent sessionID blocker (#43619), and Bedrock credential issues (#43681). Early adopters are hitting rough edges but actively contributing patches.
- **Terminal handling bugs are recurring** — Garbled escape sequences after TUI exit (#20458), backspace unresponsive in herdr/ConPTY (#34878). Terminal emulator compatibility remains a persistent annoyance.
- **File/data integrity concerns** — Race condition in `filesystem_move_file` causing silent data loss with `source == destination` (#43726); session rehydration after reconnect (#37983). Reliability issues erode trust in tool operations.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-21

## Today's Highlights

No new releases shipped in the last 24 hours, but the community remains highly active—the most significant ongoing thread is a 36-comment issue rallying the Windows experience, while an 18-comment bug report on auto-compaction failures has gained 17 👍. The day's merged work focuses on TUI polish (clipboard soft-wrap handling, table link colors) and a provider fix for kimi-coding thinking signatures, with two new untriaged bugs reported overnight.

## Releases

None in the last 24 hours.

## Hot Issues

1. **[Windows support strategy](https://earendil-works/pi Issue #7547)** — Still the most commented thread (36 comments) in the tracker. The ask is to consolidate the fragmented ways Pi runs on Windows so the team can focus bug-fixing and docs where it matters most. Community response is largely anecdotal reports of what works and what breaks, but this is clearly a high-priority UX gap.

2. **[Auto-compaction waits for provider overflow](https://earendil-works/pi Issue #6879)** — An 18-comment, 17👍 bug: on gpt-5.6-sol, a 2-hour agentic turn pushed context past the compaction threshold; compaction never fired until the API rejected the request at 373k tokens. Users want compaction checked after every agentic step, not just on provider errors.

3. **[Terminal scrolls to beginning randomly](https://earendil-works/pi Issue #5023)** — Closed, but with 17 comments; the issue describes the TUI suddenly jumping to the start of a session then scrolling to the end, while the model is mid-work. Root cause is likely tied to recent TUI refactors.

4. **[WebSocket transport for openai-responses](https://earendil-works/pi Issue #3442)** — The `openai-responses` provider only honors HTTP/SSE and ignores `transport: "websocket"` / `'auto'`. Latency-sensitive users (Realtime-style interactions) want parity with the spec.

5. **[Windows input redraw on every keystroke](https://earendil-works/pi Issue #6300)** — Distinct from #7547 but related: each keystroke causes the input line to be redrawn on a new line in cmd.exe and Windows Terminal. Focused bug report from a Windows 10 user.

6. **[grok-mermaid → lovely-mermaid migration](https://earendil-works/pi Issue #8157)** — A proposal to swap the 1:1 grok-mermaid port (which inherited corner cases) for the more actively maintained lovely-mermaid renderer with better parsers.

7. **[Scoped Anthropic keys rejected](https://earendil-works/pi Issue #6093)** — Closed. Claude Code scoped keys (`sk-ant-api03-..`) don't carry the expected prefix and are misclassified; necessary request params are then omitted. Ecosystem friction with Anthropic's newer key types.

8. **[Gemini 3.x tool-use failure: missing thought_signature](https://earendil-works/pi Issue #6996)** — Gemini 3.x models fail when a tool result is submitted back because `thought_signature` is missing from the history. Blocks anyone using Gemini 3.x with tools.

9. **[Per-model compaction settings](https://earendil-works/pi Issue #8133)** — Users want a `compaction.profiles` map keyed by model so reservation and thresholds adapt per provider instead of one global config.

10. **[Ctrl+D leaks escape sequence over SSH](https://earendil-works/pi Issue #8419)** — New untriaged bug: quitting with Ctrl+D over SSH occasionally leaves `00;1:3u` in the shell after exit. Rare, but jarring when it happens (looks similar to a prior issue).

## Key PR Progress

1. **[fix: hold triggerTurn-false custom messages until tool batch ends](https://earendil-works/pi PR #8416)** — Closes a race where `sendCustomMessage({ triggerTurn: false })` landed between an assistant `toolCall` and its `toolResult`, causing strict providers to reject the next turn. Merged.

2. **[feat(ai): add requiresNonNullAssistantContent compat flag](https://earendil-works/pi PR #8118)** — Open. Some OpenAI-compatible gateways reject null-content (tool-call-only) assistant messages; this flag forces `""` without the side-effects of the existing `requiresAssistantAfterToolResult`.

3. **[Normalize kimi-coding thinking signatures to base64url](https://earendil-works/pi PR #8405)** — Merged. Fixes 400 errors on the second+ turn of reasoning-enabled kimi-coding conversations ("malformed encrypted reasoning content: invalid base64url encoding").

4. **[fix(tui): preserve logical lines when copying soft-wrapped text](https://earendil-works/pi PR #8407)** — Merged. In fullscreen mode, mouse selections joined visual rows with `\n`, breaking URLs and list items; now preserves logical line boundaries.

5. **[fix(tui): prevent wrapped table link color leaks](https://earendil-works/pi PR #8363)** — Merged. Resets link colors before table padding/borders so wrapped table rows don't bleed styles (fixes #8335).

6. **[fix(tui): render hardware cursor by default so prompt cursor hollows on blur](https://earendil-works/pi PR #5268)** — Merged after a long review; fixes #3896 so unfocused windows don't still look active.

7. **[feat(ai): amazon bedrock mantle](https://earendil-works/pi PR #8302)** — Open WIP. Adds support for Amazon's Mantle API surface for GPT-5.x models, which currently fail via Converse (`Validation error: Th…`).

8. **[feat(settings-selector): show & make default searchable for model and thinking](https://earendil-works/pi PR #8399)** — Merged. Adds a "default" label in `/model` and `/thinking` pickers (since Ctrl+S now persists these) and makes "default" searchable.

9. **[feat: add color values and theme styling](https://earendil-works/pi PR #8398)** — Open. A significant TUI/theme refactor from mitsuhiko exposing colors directly; keeps the old API for backwards compat and paves the way for non-terminal UIs.

10. **[fix(coding-agent): prevent TUI crash on large diffs](https://earendil-works/pi PR #8395)** — Merged. Replaces `lines.push(...contentLines)` with a loop to avoid V8's max-call-stack crash when rendering ~14.5MB diffs (fixes #8036).

## Feature Request Trends

- **Command aliases**: `/exit` and `/bye` are the single most repeated request across issues (#5340, #4538, #5161, #5863, #6193) and PRs (#4537, #5160), despite being closed as "refactor" or "weekend" several times. Users coming from Claude Code/Codex/opencode expect them.
- **Session/cache efficiency**: Forked sessions lose prompt caching (#8348), and per-model compaction profiles (#8133) are both about making long sessions cheaper and more predictable.
- **TUI ergonomics**: Independent expand/collapse of tool output blocks (#8344), configurable scroll rate (#8370), and per-model default labels in pickers (#8399) show a maturing ask for fine-grained UI control.
- **Provider breadth**: Requests to add Umans AI (#8404), Amazon Mantle (#8302), and Daybreak aliases (#8126) — the community keeps pushing for wider model coverage and gateway compatibility.

## Developer Pain Points

- **Windows remains a fragile citizen**: Redraw-on-keystroke (#6300), the 36-comment strategy thread (#7547), and bash tool `Took`/`Elapsed` inflation from NTP sync (#8418) all point to the same root: Pi's TUI and tooling are optimized for Unix-like terminals.
- **Provider strictness is a recurring friction point**: null-content assistant messages (#8118), scoped API keys (#6093), missing `thought_signature` (#6996), malformed base64 thinking signatures (#8405), and transport negotiation (#3442) all show the cost of integrating with heterogeneous gateways.
- **Compaction is not aggressive enough**: The 37k-token overflow (#6879) and the related ask for per-model profiles (#8133) indicate users want proactive context management, not reactive failure handling.
- **Background operations leak into the TUI**: The SSH passphrase prompt from git package checks (#8417) and the Ctrl+D escape sequence leak over SSH (#8419) are two separate manifestations of the same pattern — background tasks don't respect the TUI's ownership of the terminal.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-21

## Today's Highlights
Web Shell users get a significant UX boost with file attachments via composer/@ selection, immediate sidebar sync, and improved streaming performance. The `/review` pipeline continues to mature with convergence advisory (#9278) and Aone Code integration work spanning six new issues (#9613–#9619), while critical bug fixes land for provider-aware reasoning controls and thinking-block handling.

## Releases
**v0.21.15** — Latest stable release. Includes Web Shell improvements: file attachment insertion via composer or @ selection, faster streaming, and immediate sidebar synchronization ([#9405](https://github.com/QwenLM/qwen-code/pull/9405), [#9477](https://github.com/QwenLM/qwen-code/pull/9477)).

**v0.21.11-nightly.20260820** — Nightly with Web Shell approval/ask-user dialogs as in-flow sheets and a fix for background-agent false failures ([ytahdn](https://github.com/QwenLM/qwen-code/pull/)).

**Smoke benchmarks (r1–r3)** — All SWE-bench Verified + Terminal-Bench 2.0 regression runs succeeded against v0.21.14 after sandbox bootstrap, Harbor cache-gate, and immutable cache manifest repairs.

## Hot Issues
1. [**#9278**](https://github.com/QwenLM/qwen-code/issues/9278) — `/review` publish-time convergence advisory design. The "失控回路" (runaway loop): push → review → fix → bigger diff → more findings. Community tracking multi-round cleanup; 8 comments.
2. [**#8382**](https://github.com/QwenLM/qwen-code/issues/8382) — Duplicate provider tool call ID errors break sessions. Persistent failure mode; 7 comments, still open.
3. [**#2128**](https://github.com/QwenLM/qwen-code/issues/2128) — **P1**: UI History array grows unboundedly in long sessions, causing memory bloat. Root cause identified; open since March.
4. [**#9573**](https://github.com/QwenLM/qwen-code/issues/9573) — **P1**: Resumed sessions show "Tool result missing" for tool calls that completed normally. Recent regression.
5. [**#9485**](https://github.com/QwenLM/qwen-code/issues/9485) — Web Shell copy buttons fail over HTTP from non-localhost ("Clipboard API is not available"). Closed.
6. [**#9465**](https://github.com/QwenLM/qwen-code/issues/9465) — Web Shell pin/unpin sessions is slow; pinned section ordering unstable.
7. [**#9571**](https://github.com/QwenLM/qwen-code/issues/9571) — Confirmation boxes steal focus while typing in WebUI tasks. Fixed for tool-approval in #9609; sibling AskUserQuestion issue #9611 remains.
8. [**#9597**](https://github.com/QwenLM/qwen-code/issues/9597) — Hierarchical memory loads same `QWEN.md` twice via symlink alias.
9. [**#9586**](https://github.com/QwenLM/qwen-code/issues/9586) — ACP daemon: duplicate tool-call breaker leaves persisted call without terminal result. Closed.
10. [**#9620**](https://github.com/QwenLM/qwen-code/issues/9620) — Aone Code branch-based MRs break write path (`sourceBranch` assumed to be SHA). New, active.

## Key PR Progress
1. [**#9609**](https://github.com/QwenLM/qwen-code/pull/9609) — Web Shell approval dialog no longer steals focus while typing. Reuses editable-target detection.
2. [**#9607**](https://github.com/QwenLM/qwen-code/pull/9607) — Demotes balanced inline thinking blocks instead of failing turns on OpenAI-compatible endpoints.
3. [**#9590**](https://github.com/QwenLM/qwen-code/pull/9590) — Provider-aware reasoning controls for DeepSeek V4, GLM 5.2, Kimi; matches documented effort tiers.
4. [**#9526**](https://github.com/QwenLM/qwen-code/pull/9526) — Persistently-critical convergence advisory for stuck review loops (land-with-residual-risk).
5. [**#9604**](https://github.com/QwenLM/qwen-code/pull/9604) — Clears deferred Round-5 findings from Aone write path; ~29 suggestions addressed.
6. [**#9576**](https://github.com/QwenLM/qwen-code/pull/9576) — Cross-session messaging via UNIX domain sockets with fail-closed inbound gate.
7. [**#9527**](https://github.com/QwenLM/qwen-code/pull/9527) — Binds sandbox image to pulled digest; salvaged from frozen #9214 with criticals fixed.
8. [**#9577**](https://github.com/QwenLM/qwen-code/pull/9577) — Disables install scripts in release CI; explicit postinstall; avoids persisting write-capable PAT.
9. [**#9262**](https://github.com/QwenLM/qwen-code/pull/9262) — Growth-budget breaches now trigger audit instead of stopping automation cold.
10. [**#9466**](https://github.com/QwenLM/qwen-code/pull/9466) — Anchors rewind mapping to stable prompt identity across persistence, ACP rewind, and fork history.

## Feature Request Trends
- **Aone Code integration** (6 new issues): branch-based MRs, comment dedup, self-PR detection, incremental cache, inline anchoring for removed lines, AI-comment gate ([#9613–#9619](https://github.com/QwenLM/qwen-code/issues/9613))
- **Cross-session messaging** — Sessions discovering and messaging each other with explicit gating ([#8724](https://github.com/QwenLM/qwen-code/issues/8724), [#9576](https://github.com/QwenLM/qwen-code/pull/9576))
- **Provider breadth** — First-class Kimi and Xiaomi MiMo presets ([#8368](https://github.com/QwenLM/qwen-code/pull/8368))
- **Review pipeline automation** — Convergence advisory, capture-TUI for pixel evidence ([#9273](https://github.com/QwenLM/qwen-code/pull/9273))
- **Session lifetime controls** — `sessionRotation` bounding maxTurns/maxAge per route ([#8927](https://github.com/QwenLM/qwen-code/pull/8927))

## Developer Pain Points
- **Session/memory management** — Unbounded history growth (#2128), resumed sessions losing tool results (#9573), duplicate tool-call IDs (#8382). These are recurring P1/P2 bugs — the most painful area.
- **Web Shell focus stealing** — Confirmation dialogs grabbing focus while typing (#9571, #9611). Now fixed in #9609 but AskUserQuestion sibling remains.
- **Review loop instability** — Runaway find-repair-find cycles (#9278), verification probes mutating shared worktree (#9207), git identity pinning gaps (#9557).
- **Clipboard/platform limitations** — HTTP non-localhost clipboard failures (#9485), though closed.
- **Aone compatibility friction** — AGit-Flow assumptions break normal branch-based MRs (#9620); comment dedup needed to avoid spam (#9613).

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI Community Digest — 2026-08-21

## Today's Highlights
Codewhale v0.9.10 shipped with retention, identity, and durable-approval improvements. The community is actively converging on crate decomposition (EPIC-005), with utility command groups migrating to the new shapes. A notable cluster of long-running-token and configuration-related bugs surfaced. Chinese-language users are pushing for documentation localization and IME-related TUI fixes.

## Releases
**[v0.9.10 — Codewhale](https://github.com/Hmbown/CodeWhale/releases/tag/v0.9.10)** — Release train focusing on retention, identity, first-run UX, and release hardening. **Important migration note:** the legacy `deepseek-tui` npm package is deprecated and will stop receiving releases; users must migrate to the `codewhale` command / package. 76 commits included in [PR #5513](https://github.com/Hmbown/CodeWhale/pull/5513).

## Hot Issues

1. **[#5518 — Early emergency compaction at ~85K–105K tokens despite 327K context](https://github.com/Hmbown/CodeWhale/issues/5518)** — [CLOSED] A user with a vLLM-hosted DeepSeek-V4-Flash route sees forced compaction far below the configured 327,680-token window. The report implicates output-headroom budgeting and "handoff state contamination" as root causes. Critical for long-running session reliability.

2. **[#5516 — HTTP 400 max_tokens exceeds model limit after v0.9.9 upgrade](https://github.com/Hmbown/CodeWhale/issues/5516)** — [CLOSED] Breaking regression: after upgrading from v0.9.8→v0.9.9, every request fails with `max_tokens=384000 exceeds max_model_len=262144` even without manual config. Likely broken auto-detection fallback. Workaround: override max output tokens manually.

3. **[#5522 — First run should be progressive, not front-loaded configuration](https://github.com/Hmbown/CodeWhale/issues/5522)** — [OPEN] Direct user feedback that first launch has too much "psychological cost": English-only telemetry disclosure, then a wall of settings, key hints, and choices before any useful work. Release acceptance criteria proposed. Community strongly supportive.

4. **[#5512 — Header status indicator never renders since v0.9.7](https://github.com/Hmbown/CodeWhale/issues/5512)** — [CLOSED] Status indicator (`cw/whale/dots/off`) next to the effort chip never renders on Windows Terminal/PowerShell. Worked in the 0.8.x era. UX regression affecting observability.

5. **[#5023 — IME candidate window jumps/unstable position during input](https://github.com/Hmbown/CodeWhale/issues/5023)** — [CLOSED] IME 候选窗口 in the text input jumps around on Windows 11 Pro. High-impact for CJK users; reproducible. Remains a core UX friction point for Chinese-speaking users.

6. **[#5526 — Deprecated shell completion](https://github.com/Hmbown/CodeWhale/issues/5526)** — [OPEN] `codew completions` (pwsh) still generates scripts with stale `codewhale-tui` trigger commands. Unclear where to fix; docs gap. Small but annoying discoverability issue.

7. **[#5316 — EPIC-005: TUI Crate Decomposition Umbrella](https://github.com/Hmbown/CodeWhale/issues/5316)** — [OPEN] Tracking issue for the full crate-decomposition effort. Every sub-EPIC and FEAT reports to it. The architectural direction for the next several releases; active contributor focus.

8. **[#5482 — Docs localization to Chinese (EPIC)](https://github.com/Hmbown/CodeWhale/issues/5482)** — [OPEN] Growing Chinese user base faces a barrier: many `docs/` entries are English-only, and some are stale. Proposal: partial restructure + full zh localization (zh held to key and message parity). High community interest, given the number of zh-language issues filed.

9. **[#5345 — Multi-line input mode / custom send shortcut](https://github.com/Hmbown/CodeWhale/issues/5345)** — [CLOSED] FR from a user comparing Grok Build and Codex: needs `Enter` to insert newlines in input, with `Shift+Enter`/`Ctrl+Enter` as send alternatives. Common for structured markdown prompts; still a gap in the TUI if closed without follow-up.

10. **[#5345 / #5337 / #1854 — Windows launch via Windows Terminal (.bat) and i18n parity work](https://github.com/Hmbown/CodeWhale/issues/1854)** — A cluster of Windows UX + i18n parity issues closed in the last 24h. [#1854](https://github.com/Hmbown/CodeWhale/issues/1854) wants the default launch to use Windows Terminal instead of a raw `cmd.exe` window for the `.exe` artifact. i18n work: the Web part moving off `isZh` branches entirely is tracked via [#5337](https://github.com/Hmbown/CodeWhale/issues/5337). This kind of polish is important for adoption among Windows-heavy, non-English users.

## Key PR Progress

1. **[#5524 — Multi-file `read_lints` operation](https://github.com/Hmbown/CodeWhale/pull/5524)** — [OPEN] Implement the approved scope of #4070, letting the model read LSP/type diagnostics for files it has *not* just edited. Reuses the existing `LspManager` transport pool instead of spawning a new language server. Directly improves autonomous debugging loops.

2. **[#5525 — Utility group adoption of command shapes (FEAT-018)](https://github.com/Hmbown/CodeWhale/pull/5525)** — [OPEN] Converts all seven utility commands to the new external command shapes from FEAT-014/015, registering them under `/a…` (and probably compact aliases). Maintains the same execution boundary without moving files physically. Part of EPIC-005 decomposition.

3. **[#5523 — Extract tool-call stages from the turn loop](https://github.com/Hmbown/CodeWhale/pull/5523)** — [OPEN] Refactoring that extracts planning, approval/execution, and result projection into separate functions. Preserves control order, cancellation behavior, and indexed outcome collection. Reduces the turn loop’s complexity and sets up further decomposition.

4. **[#5520 — Move docs/sandbox and docs/web onto the dictionary spine (#5337)](https://github.com/Hmbown/CodeWhale/pull/5520)** — [CLOSED] Reduce i18n branch noise: replaces 14+15 `isZh` branches in docs pages with structured dictionaries. Holds zh to key and message parity via `check-locales.mjs`. Good progress on the i18n cleanup path.

5. **[#5521 — Drop single-argument `concat!`](https://github.com/Hmbown/CodeWhale/pull/5521)** — [CLOSED] Simple lint fix that unblocks `main` on `clippy::useless-concat`. One-line change; keeps CI green.

6. **[#5515 — Forward MCP image results as typed content](https://github.com/Hmbown/CodeWhale/pull/5515)** — [CLOSED] Converts standard MCP `image` content into CodeWhale’s platform-neutral rich tool-result block, preserving text, `structuredContent`, and `isError` semantics; enforces the 5 MiB / one-image limit. Good interop improvement.

7. **[#5513 — Release: v0.9.10](https://github.com/Hmbown/CodeWhale/pull/5513)** — [CLOSED] The 76-commit release lane for retention, identity, first-run, and release hardening, rebased over public `main` and community changes. Also updates the README for the deprecation of the legacy `deepseek-tui` package.

8. **[#5509 — Restore `/title` as an independent terminal window title](https://github.com/Hmbown/CodeWhale/pull/5509)** — [CLOSED] Reverts the merge of `/title` and `/rename` from `24c7dee46`, restoring `/title` as a separate command that only changes the terminal window title, while `/rename` stays bound to the session name. UX regression fixed after community feedback.

## Feature Request Trends

- **Smart configuration defaults** — Strong demand for first-run and default config to follow best practice for output tokens / `max_tokens` and to be *progressive*. Users repeatedly hit “fresh install then break” bugs; the mitigation isn’t just bug fixes but better defaults.
- **Multi-line input & custom shortcuts** — Users comparing with Grok Build / Codex want `Enter` to insert newlines and configurable send keybindings (`Shift+Enter`, `Ctrl+Enter`, etc.). High-impact for structured prompts.
- **Docs localization (zh)** — With a visible Chinese-speaking user base, documentation in Chinese is a recurring request. Tracking EPIC #5482. Improving onboarding and UX for non-English users is a major theme.
- **Crate/tool decomposition and modular commands** — The EPIC-005 decomposition umbrella is the most active architectural thread, with FEAT-018 and the `read_lints` PR as concrete examples. Users benefit indirectly through stable behavior while the maintainers restructure.

## Developer Pain Points

- **`max_tokens`/context-window misconfiguration regressions** — Repeated “unexpected HTTP 400 / early compaction” reports with conflicting limits (e.g., #5516, #5518) after upgrades or when self-hosting with vLLM. Root cause: auto-detection and output-headroom budgeting are fragile.
- **Windows / IME input reliability** — High-frequency, reproducible issues with IME candidate windows jumping and missing placeholder rendering on Windows Terminal. CJK users face the brunt; underlying TUI portability issue remains.
- **Configuration and release drift** — Users hitting upgrade-time breakage (“carried no manual config, still broken”) plus the ``deepseek-tui` → `codewhale` rename deprecation. Migration is manageable but still surprising to users arriving on the old package.
- **Discoverability of advanced features / commands and deprecation messages** — “[CLOSED]” issues about the palette root hiding commands (#5442) and shell completion being stale (#5526) both point to overlooked UX surface area around command discovery and tooling integration.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*