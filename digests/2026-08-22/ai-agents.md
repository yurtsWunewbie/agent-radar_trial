# OpenClaw 生态日报 2026-08-22

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-22 01:09 UTC

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

## OpenClaw 项目深度报告

好的，作为您的AI智能体与个人AI助手领域开源项目分析师，根据OpenClaw项目在2026年8月22日的GitHub数据，我为您生成了以下项目动态日报。

---

# OpenClaw 项目动态日报 — 2026年8月22日

## 1. 今日速览

OpenClaw 项目今日活动量极高，核心仓库在过去24小时内产生了 1000+ 条 Issues 和 PR 更新，显示出非常活跃的社区与开发态势。但数据同时揭示项目正处于一个**高压力、高风险的维护阶段**：大量 P0/P1 级稳定性问题（内存泄漏、数据库损坏、会话卡死）持续积压，且多数关键 Bug 仍处于“待维护者审查”状态。虽然今日有 124 个 PR 被合并/关闭，但其中多为修复性提交，**没有新版本发布**，项目健康度整体评为 **关注**。社区讨论焦点集中在由 `Codex` 集成引发的可靠性问题、数据持久化（SQLite）损坏、以及核心网关的内存管理上。

## 2. 版本发布

- **无**。过去24小时内没有新的 Release 版本发布。目前项目最新版本停留在 `v2026.8.1-beta.2`，该版本的验证工作正在进行中（见 Issue #125626）。

## 3. 项目进展

尽管没有新版本发布，今日仍有 124 个 PR 被合并或关闭，主要集中在修复已知问题和优化现有功能。以下为今日合并/关闭的的关键 PR：

- **修复即时通讯渠道的可靠性与安全边界**：PR #126424 `fix(gateway): keep conversation delivery within agent bindings` 已关闭（合并）。该 PR 修复了多智能体操作者在使用会话工具时，消息可能被发送到错误代理绑定的问题，涉及 Discord、Telegram、Slack 等多个渠道，这是一个重要的边界修复。
- **聚焦 Web UI 体验优化**：PR #127646 `fix: settle terminal transcript projections` 已关闭（合并）。该 PR 修复了终端转录投影的若干问题，提升了 Codex 终端会话的 UI 一致性和准确性。
- **收紧安全策略与认证**：PR #116489 `feat(security): require acknowledgement for install policy warnings` 已关闭（合并）。该 PR 为插件/技能安装引入了新的安全策略警告确认机制，要求操作者明确确认潜在风险，安全边界更加清晰。
- **修复 Claude CLI OAuth 集成**：PR #125471 `fix(models): keep Claude CLI OAuth available in Control UI` 已关闭（合并）。该 PR 修复了 Gateway 重启后 Claude CLI OAuth 刷新所有权丢失的问题，确保了认证的持久性。但社区反馈表明，该问题在 `2026.5.12` 版本上可能仍存在，需要持续关注。

**推进情况**：项目今日的进展集中在**修修补补**，即修复已发现的具体缺陷，但在新功能开发或架构改进上未见重大突破。合并的 PR 多带有 `compatibility` 或 `security-boundary` 的合并风险标签，说明维护者正在谨慎地平衡新改动与系统稳定性。

## 4. 社区热点

今日讨论度最高的议题并非新功能，而是对**项目核心稳定性的严重担忧**，以及围绕 `Codex` 集成的系列问题：

1.  **Issue #91588 `[P0] Critical: Gateway Memory Leak`**（评论：23，👍：1）
    - **链接**: [Issue #91588](https://github.com/openclaw/openclaw/issues/91588)
    - **核心诉求**：Gateway 进程内存泄漏问题极其严重，RSS 从启动的 350MB 在数天内飙升至 15.5GB，导致进程被系统 OOM Killer 杀死并不断重启。这直接导致服务不可用，是当前社区声量最大的痛点之一。

2.  **Issue #91009 `[P1] Codex PreToolUse native hook relay spawns CPU-bound processes`**（评论：22，👍：2）
    - **链接**: [Issue #91009](https://github.com/openclaw/openclaw/issues/91009)
    - **核心诉求**：`@openclaw/codex` 集成在调用工具时会衍生出多个消耗 100% CPU 的 `openclaw-hooks` 进程，并阻塞 Gateway RPC 调用。这是一个性能杀手，直接导致智能体响应缓慢或完全停滞。

3.  **Issue #87744 `[P1] Codex-backed Telegram turns repeatedly time out`**（评论：18，👍：4）
    - **链接**: [Issue #87744](https://github.com/openclaw/openclaw/issues/87744)
    - **核心诉求**：在 `2026.5.27` 版本上，由 Codex 支持的会话轮次反复超时，导致 Telegram 机器人无法交付最终回复。该问题影响了大量用户，且长期未得到解决，体现了社区对 `Codex` 集成稳定性的普遍不满。

**分析**：社区热点清晰地表明，用户正在为 `Codex` 集成的“成长之痛”买单。这些并非个例，而是系统性缺陷，严重影响了用户体验和对项目的信任度。

## 5. Bug 与稳定性

今日报告的 Bug 数量多且严重程度高，多个 P0/P1 级别问题涉及数据丢失和核心功能不可用。按严重程度排列如下：

- **🔴 P0 严重**：
    - **Issue #91588**：Gateway 内存泄漏致 OOM 崩溃（详见社区热点）。
    - **Issue #126821** `[Bug]: SQLite corruption recurs on pristine rebuilt DBs`（评论：6）
        - **链接**: [Issue #126821](https://github.com/openclaw/openclaw/issues/126821)
        - **描述**：在 `2026.8.1-beta.2` 版本上，SQLite 数据库在重建后 15-24 小时内再次损坏，导致“瘫痪的网关”模式，拒绝所有服务但进程不退出。**这是一个标记为 `regression` 的高危数据损坏问题，需要立即处理。**

- **🟠 P1 高**：
    - **Issue #123799** `Need safe upgrade/backport guidance for production affected by Codex compact 404`（评论：8）
        - **链接**: [Issue #123799](https://github.com/openclaw/openclaw/issues/123799)
        - **描述**：生产环境用户需要针对 `Codex compact 404` 问题的安全升级/回退指南，但相关 issue (#123706) 已关闭，缺乏操作指引。**沟通断层问题凸显。**
    - **Issue #97616** `[Bug]: OpenClaw leaks unreaped hook/tool child processes`（评论：8）
        - **链接**: [Issue #97616](https://github.com/openclaw/openclaw/issues/97616)
        - **描述**：僵尸进程积累导致运行时性能下降。
    - **Issue #83598** `anthropic:claude-cli OAuth refresh still dead-ends main lane`（评论：6）
        - **链接**: [Issue #83598](https://github.com/openclaw/openclaw/issues/83598)
        - **描述**：即使有修复 PR，`anthropic:claude-cli` 的 OAuth 刷新问题在 `2026.5.12` 版本上依然存在，导致所有代理流量卡死。

- **🟡 P2 中**（部分列举）：
    - **Issue #120735** `Telegram inbound stickers arrive as raw file refs`（评论：7）
    - **Issue #126246** `Telegram durable outbound deliveries remain stuck in send_attempt_started`（评论：6）
    - **Issue #108215** `Context usage drops from 57% to 13% without compaction`（评论：6）

**总体来看，项目正面临严重的稳定性危机，尤其是内存与数据持久化层面，且修复进度无法跟上问题产生速度。**

## 6. 功能请求与路线图信号

尽管稳定性是当前主旋律，社区对新功能的探索依然活跃：

- **技能与命令的可用性扩展**：
    - PR #122425 `fix: allow slash skills inside normal messages`（状态：⏳ waiting on author）尝试允许用户在普通消息中使用斜杠命令，而不仅仅是在输入框开头，这将极大提升 Control UI 的易用性。
    - Issue #50199 `Feature Request: Add Skill Priority Configuration`（评论：9）要求为重叠技能增加优先级配置，这是多技能管理的重要需求。

- **UI/UX 深度优化**：
    - PR #123356 `improve(control-ui): stage slash command arguments in the composer`（状态：⏳ waiting on author）希望将斜杠命令的参数解析和暂存到输入框，提供更流畅的命令输入体验。
    - Issue #51028 `Sessions panel: sort by last meaningful activity` 和 Issue #55249 `Session labels for easier identification` 则反映了用户在会话管理上的更高要求。

- **底层架构与集成**：
    - PR #127724 `feat(codex): upgrade to 0.149 and harden the complete app-server integration`（状态：⏳ waiting on author）是一个重量级 PR，旨在通过升级 Codex 并加固集成，从根上解决当前众多稳定性问题。**这可能是下一版本最重要的改动，也是社区的希望所在。**

**路线图信号**：维护者（`maintainer` 标签）在这些 PR 中参与度很高，说明 UI/UX 和 Codex 集成是官方认可的两个重点改进方向。

## 7. 用户反馈摘要

从今日的 Issues 和评论中可以提炼出以下用户反馈：

- **对 Codex 集成的强烈不满**：大量用户报告因 Codex 集成导致超时、CPU 占用过高和消息丢失，认为该功能“尚未达到生产可用标准”。用户 `adamamzalag` 在 #87744 中的反馈极具代表性。
- **对数据安全的焦虑**：SQLite 数据库损坏问题 (#126821) 和 Telegram 消息丢失问题 (#126246) 显示了用户对数据持久性的极度担忧。用户 `liemnhoang` 细致地描述了他如何通过 `VACUUM INTO` 重建数据库后依然遇到损坏，这表明问题非常深层次。
- **对发布质量的质疑**：`wangtao` 工作路径被硬编码进代码并发布（Issue #51429）的乌龙事件仍然在社区中被讨论，该 issue 在近5个月后依然活跃，并在今日有新的评论，表明用户对这个低级错误的惊讶，以及对项目质量控制流程的质疑。
- **生产环境运维的困难**：用户 `FlaviaDyckerhoff` 在 #123799 中明确表示需要官方为 `Codex compact 404` 问题提供“安全升级/回退指南”，而不仅仅是技术修复方案，这反映了大型生产用户对于可操作性和风险控制的强烈需求。

## 8. 待处理积压

以下为长期未解决或近期可能被忽视的重要 Issue，建议维护者优先关注：

- **Issue #51429 `[Bug]: 工作路径被硬编码进代码`**（创建于 3月21日，更新于 8月22日）
    - **链接**: [Issue #51429](https://github.com/openclaw/openclaw/issues/51429)
    - **积压时长**：**5个月，且今日仍有新评论**。
    - **信号**：尽管这是一个已经被发现的低级错误，但至今仍未关闭。它是社区对项目质量信任度的一个长期“标点符号”，建议尽快给出官方回应，哪怕是说明修复计划或是有意为之的配置。

- **Issue #44502 `[Bug]: Discord routing / mention-gating issue`**（创建于 3月13日，更新于 8月21日）
    - **链接**: [Issue #44502](https://github.com/openclaw/openclaw/issues/44502)
    - **积压时长**：**5个月**。
    - **信号**：这是一个被标记为 `platinum hermit` 的 Discord 路由回归问题，直接影响群聊场景下的交互策略，但长期没有新的修复 PR，维护者可能已经遗忘。

- **Issue #87744 `[P1] Codex-backed Telegram turns repeatedly time out`**（创建于 5月28日，更新于 8月21日）
    - **链接**: [Issue #87744](https://github.com/openclaw/openclaw/issues/87744)
    - **积压时长**：**近3个月，且是社区热议焦点**。
    - **信号**：该问题获得了 18 条评论和 4 个👍，但没有从维护者侧看到实质性的进展回复或修复 PR，是当前社区不满情绪的最大源头。

---
**数据来源**：GitHub (openclaw/openclaw)
**报告日期**：2026年8月22日

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026年8月22日**
**分析范围：OpenClaw、NanoBot、Hermes Agent、PicoClaw、NanoClaw、NullClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw、ZeroClaw**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**高度活跃但集体承压**的阶段。基础设施类项目（OpenClaw、Hermes、ZeroClaw）普遍面临核心稳定性（内存泄漏、数据持久化、跨平台更新）的严峻挑战，小步快跑的迭代模式与用户对“生产可用”的期待之间存在明显张力。与此同时，生态正沿三个方向加速分化：**一是渠道/平台集成广度竞赛**（Discord/WhatsApp/Telegram/Mattermost/Slack 多通道对齐成为标配）；**二是从“聊天的 Agent”向“干活的 Agent”演进**（工具调用、定时任务、SOP 引擎、MCP 生态深化）；**三是安全与可观测性从“可选项”变成了“硬需求”**（安全策略传递、用量计费、截断可见性、数据不丢失被反复提及）。模型层竞争趋缓后，智能体框架层的“稳定性、安全性与工程化”将是下一轮淘汰赛的核心赛点。


## 2. 各项目活跃度对比

| 项目 | 新开/活跃 Issue | PR 动态 | Release | 核心主题 | 健康度 |
|------|----------------|---------|---------|----------|--------|
| **OpenClaw** | 1000+ 更新 | 124 合并/关闭 | 无 | 稳定性危机（内存泄漏、SQLite 损坏、Codex 集成问题） | ⚠️ 关注 |
| **Hermes Agent** | 47 活跃 / 3 关闭 | 50 条更新（0 合并） | v0.20.5 | 大规模审查期、Windows 更新可靠性、架构重构论证 | 🟡 中 |
| **ZeroClaw** | 49 新开/活跃 | 48 待合并（2 条已关闭/合并） | 无 | 安全策略绕过、运行时可观测性、SOP 引擎执行顺序 | 🟡 中 |
| **IronClaw** | 约 15 条关键更新 | 约 15 合并/关闭 | 无 | CI 基础设施优化、通知系统/收件箱、sandbox 凭据中介 | 🟢 较健康 |
| **CoPaw** | 30+ 更新 | 15 关闭（多为测试/文档），无核心合并 | 无 | MCP 连接稳定性、回归 Bug、UI 定制化诉求 | 🟡 中 |
| **NanoBot** | 5 条更新 | 37 条处理（23 合并/关闭） | 无 | Provider 用量契约重构、Dream 游标修复、新模型接入 | 🟢 较健康 |
| **LobsterAI** | 2 关闭 | 12 合并（含大量数月的“陈年 PR”） | 无（发布分支已合入） | DSH 运行时升级、Library 体验优化、历史 PR 批量清理 | 🟢 较健康 |
| **NanoClaw** | 1 新开 | 24 更新（11 合并/关闭） | 无 | Telegram 多实例、Mattermost 集成、CI 稳定性修复 | 🟢 较健康 |
| **Moltis** | 2 新开 | 8 条更新（1 合并 | 无 | WhatsApp 集成、Cron 定时任务修复、active_hours 失效 | 🟢 较健康 |
| **PicoClaw** | 1 新开 | 4 合并/关闭 | 无 | WebFetchTool 增强、Anthropic 原生 API 支持 | 🟢 较健康 |
| **NullClaw** | 0 新开 | 1 待合并 | 无 | Eden AI 网关接入 | 🟢 稳定维护期 |
| **TinyClaw** | — | — | — | — | ⚪ 无活动 |
| **ZeptoClaw** | — | — | — | — | ⚪ 无活动 |


## 3. OpenClaw 在生态中的定位

OpenClaw 在本生态中扮演**事实上的“基础设施层”与参照基准**。其在消息渠道（Discord/Telegram/Slack 等）的覆盖广度和稳定性一度是该品类的标杆，长期作为行业风向标存在。

- **优势**：社区规模最大（单日 1000+ 条 Issue/PR 更新量即验证）、集成渠道广度在同类中领先、历史积累深厚。
- **技术与路线差异**：与 Hermes Agent 的“证明即事实”（proof-carrying state）架构追求相比，OpenClaw 更偏向**激进集成的产品化路线**，优先保证功能覆盖率与用户触达，稳定性在前置，但目前正承受较大的维护代价。
- **与同类项目对比**：
  - vs **Hermes Agent**：Hermes 更强调底层架构严谨性（大规模审查周期、DB 完整性校验），OpenClaw 的社区量级和集成生态不可同日而语，但架构债更重。
  - vs **IronClaw/ZeroClaw**：IronClaw 在 CI 工程化与内部质量纪律上领先，ZeroClaw 在运行时安全策略上的深度（delegate 拓扑安全传递）较为突出，而 OpenClaw 在“渠道编排 + 多智能体绑定”的场景覆盖上更广。
- **生态角色**：OpenClaw 是“最接近主流用户需求但当前稳定性受到质疑”的选项；其未来 1-2 个版本的稳定性修复将直接影响该赛道外部用户对智能体框架的信任度。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|----------|---------|
| **渠道集成广度与深度对齐** | Hermes（Discord/Slack/WhatsApp 对齐战役）、NanoClaw（Mattermost 新通道）、Moltis（WhatsApp 修复）、OpenClaw（多渠道投递修复） | 多平台消息机器人的开箱即用体验是刚需；平台 API 版本升级导致频繁回归是共性痛点 |
| **数据持久化与不丢失** | OpenClaw（SQLite 损坏）、Hermes（压缩 watermark）、ZeroClaw（中断数据丢失）、NanoBot（Dream 重复处理） | 运行时数据可靠性是核心焦虑，“数据不丢失”反复被列为最高优先级 |
| **定时任务/Cron 的可靠性** | Moltis（active_hours 失效、投递到发起会话）、LobsterAI（投递模式修复）、NanoBot（禁用后仍触发 cron） | 从“对话”走向“自动化操作”的必经之路，属于高频刚需 |
| **安全策略的传递与一致性** | ZeroClaw（delegate 绕过安全策略）、OpenClaw（安全边界 PR 收紧）、NanoClaw（技能注册审批）、LobsterAI（凭证保护） | 多层 agent 拓扑下（multi-agent/delegate）的策略一致继承是实现“可信任自动化”的前置条件 |
| **用量/成本可观测性** | NanoBot（turn 级用量契约）、IronClaw（run gate/outcome 通知）、OpenClaw（token 消耗担忧）、CoPaw（按 Agent 归因 token） | 基于 LLM 的智能体从“玩具”走向“生产工具”需要计量和成本可视化 |
| **工具结果截断与可见性** | ZeroClaw（max_tool_result_chars 硬编码）、对比 OpenClaw/Hermes 同类工具链 | 调试和排查需要知道工具调用到底发生了什么，而不是被静默截断 |
| **MCP 生态集成稳定性** | CoPaw（重连失败）、NanoClaw（MCP 多实例）、IronClaw（第三方 MCP，OAuth 2.1）、NullClaw（OpenAI 兼容网关） | MCP 正成为工具互操作性的准标准，但生命周期管理（重连、认证）仍是短板 |
| **多用户/多实例/多租户模式** | NanoClaw（Telegram 多实例）、IronClaw（多 profile）、CoPaw（Hub 自托管）、OpenClaw（多 operator 绑定） | 从单用户单实例向团队/多租户演进是显著方向 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 核心架构特征 |
|------|---------|----------|------------|
| **OpenClaw** | 全渠道消息机器人 + 多智能体编排 + Codex 集成 | 追求“一站式”的个人/中小团队重度用户 | Node.js 网关 + 插件化技能 + 多语言绑定的高度模块化 |
| **Hermes Agent** | 桌面端 + 企业级部署、Fleet 管理、跨平台一致性 | 企业用户、重视架构严谨性与长期可维护性 | 强调“证明即事实”的可审计架构、分段发布（v0.20.5 打包 323 PR）、Rust 核心 |
| **ZeroClaw** | ACP 协议 + SOP 引擎 + 运行时安全策略 + 浏览器/桌面代理 | 开发者、需要精细安全策略的自动化场景 | Rust 实现、代理拓扑（delegate/independent）、高安全策略颗粒度 |
| **IronClaw** | 云原生网关（NEAR 系）、sandbox 凭据中介、CI 工程化 | 需要多云/云原生部署的中大型团队 | Rust 实现、XL 级功能 PR、强调 CI 纪律以防回归 |
| **NanoBot** | 极简部署 + 多模型 Provider 兼容（含 DeepSeek 等） | 快速上手的中小型团队/个人开发者 | 轻量级、cron 持久化、强调低成本与易用性 |
| **NanoClaw** | 安装向导体验 + 大量即时通信渠道（含 Mattermost、Dial） | 需要安装引导明确、渠道广的用户/小团队 | 从 OpenClaw 衍生出的独立分支，Node.js + registry-backed 技能 |
| **LobsterAI** | 桌面客户端 + 资料库管理 + 协同（CoWork）/ DSH | 网易旗下产品的既有用户、桌面端深度使用者 | Electron 桌面端 + DeepSeek Harness 集成，偏向 product 落地 |
| **Moltis** | 浏览器自动化 + 隐私（Obscura 隐身）+ WhatsApp 集成 | 需要浏览器自动化与隐私保护的个人用户 | 轻量级、隐私/反检测导向、Cron 与 active_hours 精确控制 |
| **CoPaw** | 桌面 + 移动端 + 企业级 Hub 多用户 + 与 QwenPaw 生态集成 | 需要团队协作与多端覆盖的企业用户 | 功能密集、DingTalk 共享上下文、token 归因、多项目目录 |
| **PicoClaw** | 极简 Agent 框架（Go 实现）+ GitHub 安装 + skills 命令 | 熟悉 GitHub CLI/Go 的开发者 | Go 实现、以 CLI 为核心、稳定周期长 |
| **NullClaw** | OpenAI 兼容网关聚合（多中转对接） | 寻求最大化模型兼容性的开发者 | 无新增底层实现，复用 `OpenAiCompatibleProvider` 标准路径，轻量且扩展成本低 |


## 6. 社区热度与成熟度

**第一梯队（极高活跃度，日更 50+ 条）**：OpenClaw（1000+）、Hermes Agent（100）、ZeroClaw（近 100）

- 这三个项目均处于大规模迭代与“质量巩固”并行期：OpenClaw 承压最重，维护者被高频 Bug 牵制；Hermes 处于架构论证和审查瓶颈期；ZeroClaw 的安全策略深度引发社区关注但 PR 实际落地率偏低。

**第二梯队（活跃度中高，日更 10-50 条）**：IronClaw、CoPaw、NanoClaw、NanoBot、LobsterAI

- 处于**快速迭代阶段**：IronClaw 在 CI 与通知系统上推进稳健；NanoBot 在底层用量契约重构上踏实落地；LobsterAI 在清理历史技术债（批量合并多月前的 PR）；NanoClaw 在渠道扩展和安装体验上稳步推进。此梯队的共同特征是合并率高、维护者投入大、PR 从创建到合入的平均周期较短。

**第三梯队（中等活跃，日更 1-10 条）**：Moltis、PicoClaw、NullClaw

- **质量巩固/稳定维护期**：无重大架构变动，以渠道适配和工具链增强为主，Moltis 的 Cron 相关修复值得跟进。

**第四梯队（无活跃）**：TinyClaw、ZeptoClaw

- 过去 24 小时无任何 GitHub 动态，处于“静默”状态。


## 7. 值得关注的趋势信号

**信号 1：自适应安全策略将成为智能体框架的核心基础设施。**
ZeroClaw 的 delegate 绕过安全策略（#10165）与 OpenClaw 在安全边界上的收紧（PR #116489），共同指向一个核心命题：“当 Agent 可以委派任务给子 Agent 时，安全策略如何在 agent 拓扑中正确传递？” 安全策略不再是静态的规则配置，而需要**级联、可验证、可审计的运行时基础设施**。对开发者而言，深刻理解模型代理（delegation）带来的职权分裂风险，比堆砌更多安全规则更关键。

**信号 2：上下文工程——截断策略将成为可观测性的核心战场。**
ZeroClaw 三条 Issue（#10114/#10115/#10116 截断不可见、中部截断破坏语义）与 OpenClaw 的上下文用量下降预警（#108215）一起，标定了智能体框架下一个核心 UX/可观测性课题。当模型上下文窗口达到 128k-1M token 时，“哪些内容被截断、以什么方式截断、用户能否感知”将显著影响调试效率与任务成功率。截断不应是静默行为，而应作为一等可观测事件纳入 tracing 管线。

**信号 3：从“单 Agent 对话”走向“多角色自动化工作流”。**
Moltis 的 Cron + active_hours 精确调度、LobsterAI 的定时任务投递语义修复、IronClaw 的 run gates 通知、ZeroClaw 的 SOP 引擎——四个方向交叉验证了同一个趋势：用户不再满足于“有个 Agent 能聊天”，而是需要**“Agent 按计划自动执行任务、结果可靠触发后续动作、且所有执行痕迹可审计”**。这个自动化闭环的可靠程度（含 timeout、重试、幂等、投递语义），是决定这类产品能否进入生产环境的关键。

**信号 4：Windows 与桌面端“二等公民”现象——跨平台体验正在成为竞争分水岭。**
Hermes 的“更新后冷启动失败”（#91675）与 CoPaw 的“WebView2 渲染进程崩溃”（#6427）并非孤立事件。当 Linux/macOS 上的智能体框架趋于稳定时，**Windows 部署的可靠性、桌面端的后台常驻、macOS 睡眠唤醒后的恢复**这些“低级但高频”的问题，正在消耗大量维护资源。对智能体框架而言，跨平台稳定性的“最后一公里”将决定其能否覆盖占开发者总量约 40% 的 Windows 用户群体。

**信号 5：LLM 用量计量成为“生产化”前提。**
NanoBot 的类型化用量契约（#5478）、IronClaw 的 run gates（#7699）、CoPaw 的按 Agent 归因 token（#7207）——不约而同地在构建“基于 LLM 的智能体”的计量层。**成本的透明归因**（每个 Agent、每个会话、每次工具调用花多少钱）是团队从“试用”到“规模部署”的核心决策依据。这一层基础设施的完善程度，将直接影响企业端对智能体框架的信心与预算分配。


**总结**：2026 年 8 月的个人 AI 助手/自主智能体开源生态，可以用一句话概括——**从“能做什么”到“能否稳定、安全、可审计地做”**。看似平淡的稳定性修复（内存泄漏、数据库损坏、Cron 投递、安全策略传递）恰恰是这个赛道走向“生产可用”必须补上的功课。生态内尚未出现绝对主导者，OpenClaw 的扩展策略与 Hermes 的架构严谨性之间的路线竞争，以及 ZeroClaw/IronClaw 在安全与工程化维度上的差异化突围，将共同定义未来 6-12 个月该赛道的基本走向。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-22

## 今日速览

今日 NanoBot 项目活跃度较高，PR 处理量达 37 条（其中 23 条已合并/关闭），但 Issues 侧活跃不足，仅为 5 条更新。值得关注的是，今日无新版本发布，但存在一批集中于 provider 使用量契约重构（#5478/#5480）、trajectory 统一使用量后端（#5479/#5481）和 Dream 循环游标修复（#5442/#5441）的小型 PR 栈，显示维护者正在系统性地重构底层遥测与 LLM 用量记录架构。社区侧热度一般，无高讨论量 Issue，但两条已关闭的长期遗留 Issue（#5198 模型切换、#1168 多平台 MCP 连接问题）值得留意，建议后续跟进其关闭原因。


## 项目进展

今日合并/关闭的 PR 共 23 条，其中较重要者如下：

- **fix(cron): 禁用后仍触发心跳/梦想任务的回归修复（#5407）** — 修复了 `gateway.heartbeat.enabled=false` 或 `agents.defaults.dream.enabled=false` 后，持久化系统任务仍在 cron 中触发导致 token 消耗的问题。对资源消耗与成本控制有实际价值。
- **fix(dream): 游标推进与未完成原因上报（#5442）** — 关闭 Issue #5441。修复 Dream 运行在工具错误已被模型纠正后仍被标记为"未完成"、导致历史批次被重复处理并产生重复编辑的回归。
- **refactor(providers): 定义类型化 LLM 使用量契约（#5478）** — 将 provider 动态字典替换为不可变类型化契约，并在 OpenAI Chat、Responses、Anthropic 和 Bedrock 边界规范化 token 与缓存语义。属底层架构加固。
- **feat(providers): 支持 DeepSeek V4 Flash Vision（#5474）** — 注册 `deepseek-v4-flash-vision-exp`，保留结构化多模态内容，并覆盖 Responses 图像转换与 Chat Completions 内容块。
- **feat(tui): LaTeX 以 Unicode 渲染（#5476）** — TUI 中常见 LaTeX 数学公式改以 Unicode/纯文本渲染，改善终端阅读体验。
- **fix(slack): 重定向链文件下载校验（#5414）** — 对 Slack 私有下载 URL 跨重定向链施加共享 URL 守卫，修复潜在安全风险。
- **fix(webui): iOS PWA 控件安全区适配（#5477）** — 恢复 `viewport-fit=auto`，确保安装后的 PWA 控件不被刘海屏遮挡，并同步 light/dark 主题与 `theme-color`。

综合来看，今日项目重心在 **修复 cron 与 Dream 相关的持久化任务回归**、**统一 provider 用量记录数据结构** 以及 **新模型（DeepSeek V4 Flash Vision）接入** 三方面，整体属于增量迭代与底层加固阶段。


## 社区热点

今日最活跃讨论集中在 **Issue #5198（模型切换问题）** — 该 Issue 有 4 条评论，用户抱怨模型作为"唯一首选"且 `/model` 命令无法切换，形成需求闭环。而 **PR #5442**（Dream 游标修复）作为直接修复 PR 解决了 #5441 提出的问题，值得关注。

社区对 **模型切换自由度** 的诉求较为强烈，其核心是用户希望保留每个会话独立切换模型的能力。目前 `/model` 命令可用但 UI 无切换入口，若 #5198 关闭后仍未提供 UI 级支持，后续存在重新开启或产生新 Issue 的可能。


## Bug 与稳定性

**严重度：高（潜在数据损坏）**

- **#5441（已关闭）**：Dream 运行在工具错误已恢复后仍被判定"未完成"，导致历史批次被反复处理并产生重复编辑，`memory/.dream_cursor` 不推进。→ 已有修复 PR #5442

**严重度：中（功能异常/回归）**

- **#5454（已关闭）**：流式 provider 在已输出部分内容后遇到中间 `server_error` 不触发重试（仅失败发生在首个 delta 之前才重试）。→ 暂无独立修复 PR，需关注后续
- **#5463（开放中）**：DingTalk 通道入站后台任务生命周期无终止观察者，`_background_tasks` 集合可能无限增长。→ 暂无修复 PR

**严重度：中（资源/成本）**

- **#5407（已修复）**：禁用 heartbeat/dream 后持久化系统 cron 任务仍在运行，持续消耗 token。→ 已合并修复

**严重度：低（功能缺失）**

- **#5198（已关闭）**：会话内无法切换模型，需重新配置整个实例。→ 关闭原因待查
- **#1168（已关闭）**：Nanobot 连接 Notion MCP 失败，用户核查 API 无果且 Claude 可正常登录。→ 关闭原因待查

整体稳定性信号偏正：今日 4/5 的 Issue 已关闭，且 2 个关键回归（#5441、#5407）均有对应修复 PR 合入。


## 功能请求与路线图信号

- **手动触发型技能（PR #5405，开放）**：支持 `disable-model-invocation: true`，使部署/发布等有副作用的技能仅限用户手动调用，不影响模型自动调用。该 PR 已开放近一周，若被合入将提升技能安全控制能力。
- **turn 级可观测性与安全恢复（PR #5420，开放）**：将用户回合映射到单一答案表面，区分估算/实际使用量与累计上下文，支持中断恢复。需解决冲突后方可合入。
- **mst-python 元搜索 provider（PR #5234，开放）**：集成多引擎检索结果并用 RRF 融合，聚合 DuckDuckGo、Google、Brave、Bing 等。若合入将拓展 NanoBot 的搜索能力覆盖面。
- **PromptGuard 提示注入检测（PR #1149，已关闭）**：新增 `nanobot.safety` 模块检测系统提示词覆盖、角色混淆、工具调用 JSON 注入等攻击向量。已关闭但值得关注其安全价值与后续计划。

综合来看，路线图信号指向 **安全控制（手动技能调用、提示注入防护）**、**可观测性（turn 级用量与恢复）** 与 **搜索能力扩展** 三个方向。


## 用户反馈摘要

- **模型切换不自由（#5198）**：用户对 UI 无法切换模型、`/model` 命令无效感到困扰，对比 Cloud SaaS AI 产品后认为 NanoBot 缺失必要功能。该 Issue 已关闭，但未提供明确的替代方案说明。
- **MCP 连接信任问题（#1168）**：用户反馈 Notion MCP 连接失败，自查 API 无果且 Claude 可成功登录，暗示可能存在 NanoBot 侧配置或兼容性问题。该 Issue 已关闭，但值得关注关闭原因。
- **重复编辑与 token 浪费（#5441）**：用户发现错误恢复后仍被拒绝并重复处理同一历史批次，导致重复编辑和 token 消耗，对 Dream 机制的"完成判定"逻辑不满。
- **流式中断恢复缺失（#5454）**：用户报告流式响应中途 `server_error` 不重试，打破了"自动恢复"预期，影响长文本生成体验。

总体来看，用户反馈集中在 **交互自由度**（模型切换）、**恢复机制可靠性**（Dream 重试、流式中断）与 **外部集成兼容性**（MCP）三方面。


## 待处理积压

**PR 积压（超 3 天未合并，仍开放）**

- **#5420（8月18日创建，标记 conflict）**：turn 可观测性与安全恢复，需解决冲突
- **#5405（8月16日创建）**：技能手动调用支持
- **#5379（8月13日创建）**：memory 完整合并输入保留，防止截断
- **#5234（8月3日创建）**：mst-python 元搜索 provider，已开放近三周

**Issue 积压**

- **#5463（8月21日创建）**：DingTalk 后台任务无生命周期观察，疑似存在任务泄漏，需尽快确认
- **#5454（8月20日创建）**：流式中断不重试问题，当前无修复 PR，建议补上

**长期遗留（超一个月）**

- **#1168（2月创建，昨日关闭）**：Notion MCP 连接失败。已关闭但复盘价值高
- **#5198（7月创建，昨日关闭）**：模型切换无法使用。已关闭但未说明解决路径

建议维护者优先关注 **#5463**（潜在泄漏）与 **#5234**（长期搁置的功能 PR），并在关闭 #5198、#1168 时附上补充说明，避免用户困惑。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

好的，以下是 2026 年 8 月 22 日的 Hermes Agent 项目动态日报。

---

### Hermes Agent 项目动态日报 — 2026-08-22

**数据快照** (截至 2026-08-22)
- **Issues:** 24h 内 50 条更新 (新开/活跃 47，关闭 3)
- **PR:** 24h 内 50 条更新 (均为待合并状态)
- **Releases:** 1 个新版本 (v0.20.5)
- **总积压:** 长期未关闭 Issue 与 PR 数量庞大，需关注下文分析。

---

### 1. 今日速览

项目今日活跃度极高，Issues 与 PR 更新量均达到单日 50 条的上限，显示出强劲的社区参与度和开发迭代速度。本周发布的 v0.20.5 (v2026.8.19) 新版本聚合了约 323 个 PR，为项目提供了一个稳定的基线。当前社区讨论焦点集中在**跨平台更新可靠性**（特别是 Windows）、**架构级可靠性重构**（如“证明即事实”理念）、以及多个**平台功能对齐运动**（Discord、WhatsApp、Slack）。值得注意的是，大量高价值 PR 处于 `needs-decision` 或标注为“请勿合并”的状态，暗示核心维护团队在架构审查上存在瓶颈，导致部分功能推进受阻。

---

### 2. 版本发布

**Hermes Agent v0.20.5 (v2026.8.19) 已于 8 月 19 日发布。**
- **版本定位:** Patch 版本，将 v0.20.4 以来合并的 ~323 个 PR 滚动打包为一个稳定标签，供下游（Docker 镜像、托管部署、全新安装）使用。
- **更新内容:** 主要包含自上次发布以来的 300+ 项修复、功能和改进，具体细节需查阅完整的 Release Notes。
- **破坏性变更:**
    - **暂无明确破坏性变更报告。** 但本次发布聚合了大量重构（如 God-file sharding）和架构调整，升级前建议留意相关 Issue (如 [#78647](https://github.com/NousResearch/hermes-agent/issues/78647)) 中提到的模块拆分是否影响自定义扩展。
- **迁移注意事项:**
    - **Windows 用户:** 请特别关注本次日报中关于 Windows Gateway 启动和更新的已知问题（见下文 Bug 列表），强烈建议升级前先查看相关已知 Issue ([#91675](https://github.com/NousResearch/hermes-agent/issues/91675)) 并规划升级时间窗口，因为更新流程本身目前存在可靠性问题。
    - **平台适配:** 目前有大量针对 Discord、WhatsApp、Slack 的功能对齐工作在进行中，升级后这些平台的特定行为可能发生变化。

---

### 3. 项目进展（核心 PR/Issue 推进）

**注意：** 今日没有 PR 被标记为“已合并”，所有 50 个 PR 仍处于开放状态。这表明当前**处于一个大规模审查和契约讨论期**，而非功能落地期。尽管如此，仍有几个关键 PR 取得了实质性进展或成为当前讨论的焦点，它们是项目向前迈进的关键路径：

- **Windows 更新可靠性修复链条:**
    - **PR [#84409](https://github.com/NousResearch/hermes-agent/pull/84409)**: `fix(update): escape parent job via schtasks` — 这是对 Issue [#91675](https://github.com/NousResearch/hermes-agent/issues/91675) 的直接回应，旨在修复 Windows 网关更新后冷启动失败的问题。
    - **PR [#91956](https://github.com/NousResearch/hermes-agent/pull/91956)**: `fix(update): refresh the gateway launcher for every profile, not just one` — 修复了更新过程中只刷新一个 profile 启动器的问题。这两个 PR 直接针对当前最严重的稳定性问题，是推进重点。
- **会话系统重构与 FTS 完整性:**
    - **PR [#91961](https://github.com/NousResearch/hermes-agent/pull/91961)**: `fix(desktop): full state.db integrity probe in update preflight` — 该 PR 改进了更新前的数据库完整性检查，从仅检查 SQLite 头扩展为完整的 B-tree/FTS 页检查，防止更新在损坏的数据库上继续执行。这是对数据安全的重要补强。
- **代理路由架构讨论:**
    - **Issue [#90866](https://github.com/NousResearch/hermes-agent/issues/90866)**: `Make observable state proof-carrying` — 该架构讨论已衍生出多个具体的实现提案（如 #90144, #90049, #91911），且许多高优 PR 都与其理念相关。这表明项目正在进行深层的数据一致性和可靠性设计。

---

### 4. 社区热点（高讨论度 Issue/PR）

以下 Issue 获得了最高关注度（按评论数排序），反映了社区的核心关切和技术方向：

1.  **重构史诗：God-file 分片**
    - **链接:** [#78647 [CLOSED]](https://github.com/NousResearch/hermes-agent/issues/78647)
    - **情况:** 该项目历史上最大的重构史诗之一（78 条评论），已于今日关闭（20/20 完成）。这标志着一项大型技术债清理工作的完结。
    - **分析:** 尽管已关闭，但它代表了项目在**代码结构化、可维护性**上的重要投入。这可能会在未来的版本中导致部分内部 API 变化，值得追踪。

2.  **自动化监控警报：Skills Index 失效**
    - **链接:** [#66616](https://github.com/NousResearch/hermes-agent/issues/66616)
    - **情况:** 由机器人 `nousbot-eng` 自动报障，持续 35 天未解决（72 条评论），状态为 `degraded`。核心问题是自动生成的 `skills-index.json` 过期，导致文档站点的技能中心内容不完整。
    - **分析:** 这类由机器人报告的工具链运维问题通常优先级不高，但如果长期不修复，会直接影响新用户的文档体验和技能发现能力，属于典型的“慢性病”。

3.  **平台对齐战役：Discord**
    - **链接:** [#79564](https://github.com/NousResearch/hermes-agent/issues/79564)
    - **情况:** 一个大型 meta-issue（9 条评论），旨在将 Hermes 的 Discord 机器人功能与官方 API v10 完全对齐。
    - **分析:** 这反映出社区对**成熟、稳定的消息平台集成**有强烈需求，尤其是企业用户和社区运营者。Discord、WhatsApp、Slack 三个平台同时发起了对齐战役，表明用户对多平台支撑的期望值很高。

4.  **高优先级跟踪：Fleet 更新可靠性**
    - **链接:** [#91277](https://github.com/NousResearch/hermes-agent/issues/91277)
    - **情况:** 由核心成员 `teknium1` 发起，P1 优先级，标记为“更新可靠性定位为最不可靠的能力”，并指出了约 30 个相关 open Issue 和 15 个 PR 的碎片化问题。
    - **分析:** 这是一个非常关键的信号，表明项目方已经意识到**安装/更新流程是当前最大的用户痛点**，并正在推动一个统一解决方案，而不是继续打补丁。

---

### 5. Bug 与稳定性（按严重程度排序）

**高危（P1/P2，有/需紧急关注）：**

- **Windows 兼容性持续困扰:**
    - **Issue [#91675](https://github.com/NousResearch/hermes-agent/issues/91675)**: `Windows: gateway start still prints ✓ then dies` — 这是更新后冷启动的严重回归问题。**已有相应 PR** [#84409](https://github.com/NousResearch/hermes-agent/pull/84409) 正在修复中。
    - **Issue [#91942](https://github.com/NousResearch/hermes-agent/issues/91942)**: **已由 PR [#91960](https://github.com/NousResearch/hermes-agent/pull/91960) 关闭**，该 PR 增加了 Windows 环境的 `doctor` 预检功能。

- **桌面端稳定性:**
    - **Issue [#89083](https://github.com/NousResearch/hermes-agent/issues/89083)**: `Desktop: chat window permanently unresponsive after macOS sleep/wake` — 严重功能缺陷，特别是对 Mac 用户。目前**尚无明确的 fix PR**，风险等级较高，核心是 WebSocket 半开连接检测问题。
    - **Issue [#91684](https://github.com/NousResearch/hermes-agent/issues/91684)**: `Desktop approval responds 4001 "session not found" when routed to a non-owning local gateway` — 多 profile 场景下的授权流程错误，容易造成用户操作无反馈。**尚无明确的 fix PR**。

- **核心数据一致性:**
    - **Issue [#88758](https://github.com/NousResearch/hermes-agent/issues/88758)**: `compression: preserve the raw durable watermark` — 会话压缩可能导致数据丢失的隐患（数据水位线问题），这是数据一致性的基础问题，需要重点关注。**已有相关 PR** [#88247](https://github.com/NousResearch/hermes-agent/pull/88247) 在尝试解决一部分（压缩回退逻辑）。

**中危（P3）：**

- **Issue [#77065](https://github.com/NousResearch/hermes-agent/issues/77065)** (示例): 需关注所有标记为 `P2` 的 Bug，例如 [#91927](https://github.com/NousResearch/hermes-agent/issues/91927) (Gemini session title mangled) 等。

**已解决：**

- **Issue [#88534](https://github.com/NousResearch/hermes-agent/issues/88534)**: `Desktop: top session tab bar disappears` — **已关闭**。
- **Issue [#91916](https://github.com/NousResearch/hermes-agent/issues/91916)**: `DaemonThreadPoolExecutor crashes on Python 3.14+` — **已关闭**。
- **Issue [#78647](https://github.com/NousResearch/hermes-agent/issues/78647)**: God-file 重构 — **已关闭**。

---

### 6. 功能请求与路线图信号

明显的基础设施/架构方向（核心维护者主导）：

- **“证明即事实”的架构重构：** 多个高优 Issue 阐述了这一理念，即“观察到的状态必须携带可验证的证据”，如 [#90866](https://github.com/NousResearch/hermes-agent/issues/90866)、[#90049](https://github.com/NousResearch/hermes-agent/issues/90049)、[#91911](https://github.com/NousResearch/hermes-agent/issues/91911)。这将在未来的版本中带来更严格的数据完整性和可审计性，但可能导致现有集成方式出现破坏性变更。
- **统一的部署与更新流：** 与“Fleet 更新可靠性”跟踪 Issue ([#91277](https://github.com/NousResearch/hermes-agent/issues/91277)) 和 [#88683](https://github.com/NousResearch/hermes-agent/issues/88683) 一致，项目将推动**一个**事务性的部署计划，替代当前的平台特定脚本。
- **跨平台功能对齐（Discord/Slack/WhatsApp）：** 社区驱动的方向，但获得了维护者的认可（标记为 `needs-decision`）。这些 meta-issue 会不断产生新的功能请求 PR。

**用户/社区功能请求：**

- **PR [#91950](https://github.com/NousResearch/hermes-agent/pull/91950)**: `feat(sessions): filter list by start date` — 一个用户的直接需求，很可能被快速合并。
- **Issue [#91942](https://github.com/NousResearch/hermes-agent/issues/91942)** (被 PR #91960 关闭): `feat(doctor): add Windows environment preflight checks` — 针对 Windows 用户的实际痛点，对应 `hermes doctor` 命令的增强。

**下一版本展望 (v0.20.6 或更高):**
1.  Windows 更新与启动修复的收尾。
2.  会话压缩机制的优化（避免数据丢失）。
3.  Webhook 安全性和功能的完善（PR [#85644](https://github.com/NousResearch/hermes-agent/pull/85644)）。
4.  更多“证明即事实”理念的落地。

---

### 7. 用户反馈摘要

- **“Windows 平台像二等公民” (求稳定):** 多个 Windows 相关的 issue 和 PR 的出现，尤其是更新后无法启动的问题（[#91675](https://github.com/NousResearch/hermes-agent/issues/91675)），表明 Windows 用户对当前安装/更新体验非常不满。PR [#91960](https://github.com/NousResearch/hermes-agent/pull/91960) 中提到的“Symlink privilege”和“console-less gateway dies”等细节，都指向了那些日常使用中的具体摩擦点。
- **“消息平台功能不完整” (求兼容):** 发起 Discord、Slack 和 WhatsApp 对齐战役的用户（如 `andrexibiza`）是重度用户，他们的需求非常具体。例如，[#78647](https://github.com/NousResearch/hermes-agent/issues/78647) 之外的 Issue 指出 `gmail get` 无法处理嵌套邮件，或者像 [#87041](https://github.com/NousResearch/hermes-agent/issues/87041) 指出 WhatsApp 文档中的连接指南链接指向了错误的开源库（指向 whatsmeow 但实际用的是 Baileys），这些细节问题反映了用户对“开箱即用”体验的期望。
- **“可用性细节” (求精细):** 像 [#82851](https://github.com/NousResearch/hermes-agent/issues/82851) “HUD 在 Wayland 下拖不动”和 [#91242](https://github.com/NousResearch/hermes-agent/pull/91242) “技能中心浏览器默认折叠”这类问题，说明用户不仅在关注核心功能，也在关注在特定 Linux 环境下的桌面体验和 UI 细节。

---

### 8. 待处理积压（需维护者重点关注）

以下是长期未解决或处于停滞状态的关键 Issue/PR，建议维护团队投入精力处理或明确给出决策：

**阻塞性 PR（等待审查/决策）：**

- **PR [#50164](https://github.com/NousResearch/hermes-agent/pull/50164)**: `test: add memory context validation reports` — 已打开 2 个月，依然无人评议。这为测试提供了重要的验证报告，长期搁置不利于测试体系建设。
- **PR [#85644](https://github.com/NousResearch/hermes-agent/pull/85644)**: `feat(webhook): add multi-target delivery fan-out` — 作者自评“mixed-result contract is unsafe”，但长时间未获得维护者的架构建议或反馈。
- **PR [#88256](https://github.com/NousResearch/hermes-agent/pull/88256)**: `feat(state): auto-close stale OPEN sessions` — 一个很有意思的维护功能，用于自动清理，但同样似乎未被充分评估。

**高优 Bug（等待修复):**

- **Issue [#89083](https://github.com/NousResearch/hermes-agent/issues/89083)**: macOS 睡眠唤醒后桌面端永久无响应。这是影响核心体验的严重问题，但目前**没有修复 PR**关联。建议优先响应。

**自动化报警（等待响应):**

- **Issue [#66616](https://github.com/NousResearch/hermes-agent/issues/66616)**: Skills index 过期问题，已存在月余。虽然只是文档索引问题，不致命，但它是项目“健康度”的门面，建议尽快修复。

**编译错误（等待处理):**

- **Issue [#91916](https://github.com/NousResearch/hermes-agent/issues/91916)**: 虽然该 Issue 已关闭（标记为重复），但其底层问题——对 Python 3.14+ 的兼容——可能需要在一个统一的 PR 中修复。请确保 `DaemonThreadPoolExecutor` 的修复方案在主干推进，而不仅仅是关闭 Issue 了事。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-22

## 今日速览

PicoClaw 今日整体活跃度**中等偏低**——过去24小时仅有1条新 Issue 产生，无新版本发布。但从 PR 流水线来看，项目保持着稳定的推进节奏：今日有4个 PR 完成合并/关闭流程，涵盖 WebFetchTool 增强、AGENTS.md 文档优化、Anthropic 原生 Messages API 协议支持、以及 skills 命令重构，均为此前数月开发成果的收尾合并。社区侧最值得关注的是一个「排队消息而非打断当前回合」的 steering 模式功能请求（#3342），指向了真实的多任务并发使用场景中面向交互体验的优化需求。

## 版本发布

无新版本发布。

## 项目进展

今日共4个 PR 完成合并/关闭，项目在工具能力、协议兼容性、CLI 体验和开发者文档四个方向均有推进：

| PR | 类型 | 关键动作 | 影响 |
|---|---|---|---|
| [#647](https://github.com/sipeed/picoclaw/pull/647) — WebFetchTool 文本提取增强 | `enhancement` / `tool` | 增加 HTML 实体解码（`&amp;` 等）以及块级元素换行保留 | 网页抓取内容可读性和信息完整性显著提升 |
| [#1182](https://github.com/sipeed/picoclaw/pull/1182) — AGENTS.md 重构 | `documentation` | 改为原则优先（principle-first）的轻量指南，以 `go.mod` 作为 Go 版本唯一凭证 | 降低 AI 代理与贡献者的理解成本 |
| [#1158](https://github.com/sipeed/picoclaw/pull/1158) — 新增 `anthropic-messages` 协议前缀 | `feature`（修复 [#269](https://github.com/sipeed/picoclaw/issues/269)） | 支持 Anthropic 原生 Messages API（`/v1/messages` 端点） | 解锁仅支持 Anthropic 原生格式的代理服务，扩大生态兼容面 |
| [#714](https://github.com/sipeed/picoclaw/pull/714) — skills 安装/reinstall 重构 | `enhancement` / `skill` | 新增 `ParseInstallSpec`、`InstallFromGitHubEx`、支持 `repo@branch` 与子路径，新增 `reinstall` 子命令 | CLI 安装体验完善，生产环境安装改用 GitHub Trees API 获取完整目录 |

整体来看，这4个 PR 均非「今日新写的代码」，而是从 2026-02 至 2026-03 创建、历经数月打磨后于今日集中合并——项目的 PR review 节奏为**深度审查、长周期打磨**。就单日而言，无全新功能上线，但工具与协议层面完成了实质性的能力扩围。

## 社区热点

今日社区讨论量很少，唯一新增 Issue 即最值得关注的信号：

- [**Issue #3342**](https://github.com/sipeed/picoclaw/issues/3342)（新开，0 评论）：提出一种可选的 opt-in「turn 结束后转向」模式——当 AI 正在处理任务A的第1条消息时，用户发送第2条消息，现有行为会将其视为 mid-task 方向修正（跳过任务A剩余工具调用并注入消息2），而请求建议改为 **将消息2排队，待任务A全部完成后自动执行**。核心分歧在于：当前设计在快节奏交互下高效，但切断了长任务的连续执行；请求的模式则面向「用户希望 AI 先彻底完成当前事，再处理新指令」的深度任务场景。0 评论表明该需求尚处早期讨论阶段，但其指向的交互模型差异值得设计层关注。

## Bug 与稳定性

今日无新 Bug、崩溃或回归问题报告。

## 功能请求与路线图信号

1. [**Opt-in "after-turn" steering 模式**](https://github.com/sipeed/picoclaw/issues/3342)（新开，当前热度最高）：建议将 busy 期间的用户消息排队而非打断当前回合，定位为可选项以不破坏既有交互习惯。考虑到该诉求直接关系到 agent 在「长任务 vs 快速响应」上的产品取舍，且当前实现以「立即注入」为先，若采纳将引入消息队列状态机，预计需要新增内部状态管理——属于需要产品决策的功能请求，处于需求收集阶段，迅速进入开发的可能性较低。

2. **Anthropic 原生 API 支持**（[PR #1158](https://github.com/sipeed/picoclaw/pull/1158)，已合并）：修复 #269，此前仅支持 Anthropic 兼容格式的服务（如各类代理）现可通过 `anthropic-messages` 前缀直接对接 `/v1/messages` 端点。这一合并实质性地拓宽了 LLM 服务接入面，对「只认原生协议」的代理类服务尤为关键——其已纳入 8-21 日合并集，预计随下一版本发布。

## 用户反馈摘要

今日无新用户评论可供提取（唯一新 Issue #3342 暂无评论区讨论），无有效用户反馈样本。上一轮合并的 PR #1158 修复的 #269 问题侧面反映了社区对于**扩大 LLM 服务端兼容面**的持续需求，这仍是 Agent 工具类项目用户的高频痛点。

## 待处理积压

今日无新增长期未响应事项。现有 #3342 处于开放待讨论状态，建议在 1-2 周内评估是否纳入 roadmap 讨论，避免冷却。暂无维护者长时间未回应的紧急问题。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-22

## 今日速览

NanoClaw 项目今日活跃度较高，共收到 1 条新 Issue、24 条 PR 更新。核心团队（core-team）多位成员（amit-shafnir、zvi-fried、glifocat、gavrielc）密集提交与合并 PR，主要集中在 **Telegram 多实例支持与安装向导增强**、**Dial 频道后续修复**、**容器依赖升级**，以及一系列 **CI/registry 稳定性修复**。值得关注的是，合并/关闭的 11 条 PR 中，9 条属于修复类，表明项目当前处于"功能扩张后的稳定性巩固"阶段。社区侧出现一个关于 `send_card` 弃用按钮行为的 bug 报告，直指 agent 与 bridge 之间的契约断裂问题，虽讨论热度尚低但语义重要。

---

## 版本发布

**无新版本发布。**

---

## 项目进展

今日合并/关闭的 11 条 PR 涵盖多个方向，项目整体在**通道集成稳定性、安装体验、依赖版本**三个维度同时向前推进：

### 通道集成扩展与修复
- **[#3202] [CLOSED] Add Mattermost channel integration** — 正式合入 Mattermost 通道，遵循与 Slack 相同的注册模式，通过 `chat-adapter-mattermost` 社区包适配。这是对 #1379 的关闭，标志着 Mattermost 作为官方支持的 Chat SDK 通道落地，进一步扩大了平台覆盖范围。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3202))
- **[#3403] [CLOSED] fix(matrix): use a refresh-safe ESM patch** — Matrix 适配器在 Node 22 下因 extensionless ESM imports 而失败；该 PR 改为在安装前注册一个提交的 pnpm patch，使 pnpm 在每次安装时自动应用补丁。这将消除 Matrix 通道在升级容器/Node 版本后的重复故障。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3403))
- **[#3401] [CLOSED] fix(whatsapp-cloud): keep skill payload compatible with main** — 修复 WhatsApp Cloud 技能在 main 分支上组合运行时因依赖 channels 才有的 registry helper 而失败的问题。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3401))
- **[#3402] [CLOSED] fix(providers): accept provider file events** — 为 branch-backed providers 接受文件事件，支持文件变更驱动的技能执行流。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3402))

### Dial 频道相关
- **[#3050] [CLOSED] feat(setup): add Dial to the channel picker + wizard/skills** — 7 月中旬开启的 Dial 频道功能正式合并，为后续修复铺平了道路。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3050))
- **[#3433] [CLOSED] fix(add-dial-number): use nc directives** — 修复 `/add-dial-number` 技能的唯一遗留问题：改用 nc directives 而非原始 shell 块，使 registry 能正确识别其为 registry-backed 技能。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3433))

### CI 与工程质量
- **[#3424] [CLOSED] ci: test registry-backed skills** — 引入自动化测试：对每个从 channels/providers 拉取的 add-* 技能，在固定 registry 快照下执行完整的构建与测试流程。这将显著压低"技能在某分支上可用、合入 main 后损坏"的回归概率。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3424))
- **[#3430] [CLOSED] fix: restore stable CI required check** — 修复 Node 22/24 矩阵导致 CI check 名称变为 `ci (22)`、`ci (24)` 后 main 分支一直缺失所需 `ci` check 的问题。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3430))

### 依赖升级
- **[#3439] [CLOSED] chore(container): bump claude-code to 2.1.238 and agent SDK to 0.3.238** — 容器内 Claude Code CLI 从 2.1.197 升至 2.1.238，agent SDK 同步升至 0.3.238，包含上游 bug 修复与安全更新。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3439))

### 核心架构演进
- **[#3429] [CLOSED] feat(drivers): ratify the attach surface — a driver describes its exec argv** — 定义 `SessionExecSpec { bin, argsTty, argsPlain }` 契约，让 driver 以描述性方式声明如何启动 exec（区分 TTY 与 plain 模式），为交互式终端附着功能奠定接口基础。 ([链接](https://github.com/nanocoai/nanoclaw/pull/3429))

**另外值得注意的是**，#3397（Slack 创建流程携带 template ref）此前被错误地提前合并，随后在其分支上回滚（ffd9d9b1），核心团队已用 [#3428](https://github.com/nanocoai/nanoclaw/pull/3428) 超重做该功能，目前待合并中。

---

## 社区热点

今日讨论热度整体偏低，多数 PR 为 core-team 内部驱动、评论数为 0。相对受关注的是：

- **[#3426] [OPEN] `send_card` docs promise callback buttons that the bridge drops since #2265** — 由 glifocat 提交，描述了一个 agent 与 bridge 之间的契约断裂问题：`send_card` 向 agent 承诺支持"actions（按钮）"但 bridge 丢弃所有无 `url` 的 action，agent 只能通过 `fallbackText` 猜测平台不支持按钮。虽然评论数为 0，但这并非普通 bug——它涉及 **API 契约设计与错误信息可诊断性**，对依赖卡片交互的开发者影响显著。 ([链接](https://github.com/nanocoai/nanoclaw/issues/3426))

---

## Bug 与稳定性

| 严重程度 | 标题 | 状态 | 关联修复 | 说明 |
|---------|------|------|---------|------|
| 🔴 高 | [#3426] `send_card` 文档承诺的按钮被 bridge 丢弃（#2265 回归） | OPEN | 暂无 | 行为回归导致 agent 误导用户，契约断裂 |
| 🟡 中 | [#3434] polling adapters 未打开 webhook server | OPEN（待合并） | 同 PR | 轮询型适配器启动路径存在服务端口未监听问题 |
| 🟢 低 | [#3431] Telegram 安装向导配对卡片显示"6 位数字" | OPEN（待合并） | 同 PR | 文案与实现不一致的 UI 问题 |

**说明**：Bug 主要集中在 Telegram 设置流程（#3431、#3434）和卡片桥接契约（#3426）两个区域。前两个已有 PR 覆盖；#3426 目前尚无修复 PR，且该问题与 #2265 的改动历史存在回归关系，建议尽快调查。

---

## 功能请求与路线图信号

- **Telegram 多机器人实例支持** — 由 amit-shafnir 的系列 PR 推动：`TELEGRAM_INSTANCES` 环境变量 + 实例绑定配对（[#3436](https://github.com/nanocoai/nanoclaw/pull/3436)），安装向导支持"添加另一个 Telegram bot"（[#3438](https://github.com/nanocoai/nanoclaw/pull/3438)），实例信息贯穿配对、首个 agent 初始化与 CLI 欢迎页（[#3435](https://github.com/nanocoai/nanoclaw/pull/3435)）。三合一构成"多实例生命周期管理"的完整闭环，指向**运维多租户部署**的用户需求。
- **聊天内创建 agent（模板化）** — [#3396](https://github.com/nanocoai/nanoclaw/pull/3396) 为 `create_agent` 工具增加可选 `template` 引用，并新增只读 `ncl templates list` 命令浏览本地 `templates/` 目录或远程 registry。该 PR 已在核心团队范围内充分讨论，落地概率较高。
- **Mattermost 通道** — 伴随 #3202 的合入，Mattermost 正式成为支持通道，推测后续会有配套文档与向导更新。
- **驱动层 exec 描述接口**（#3429）— 作为基础设施，虽不直接暴露给最终用户，但为后续"从 CLI 附着到 live session"的交互能力铺路，可视为 vNext 交互体验的前置工作。

---

## 用户反馈摘要

- **Agent 误导用户（#3426）**：当 `send_card` 的按钮被 bridge 静默丢弃时，agent 只能从 `fallbackText` 获取线索，而该文本的解释是"给不支持卡片的平台用的"，导致 agent 将问题错误归因于平台。这反映出**错误上报的可诊断性有待改进**——功能失败时应提供明确的结构化错误信号，而非让模型从自然语言暗示中推断。 ([链接](https://github.com/nanocoai/nanoclaw/issues/3426))

---

## 待处理积压

- **[#3287] [OPEN] Fix: strip agent-group suffix from inbound platform message id** — 8 月 17 日由 wakqasahmed 提交（修复 #3153），自 8 月 21 日起未有新的活动或审核。它解决 `messages_in.id` 混入 agent-group 后缀导致的 ID 不匹配问题，涉及时序相关 bug。**该 PR 已处于 5 天无进展状态，建议维护者安排 review。** ([链接](https://github.com/nanocoai/nanoclaw/pull/3287))
- **[#3426] [OPEN] `send_card` 按钮契约回归** — 虽然是新 Issue，但涉及 #2265 引入的行为回归，建议尽快确认影响范围并排期修复。 ([链接](https://github.com/nanocoai/nanoclaw/issues/3426))

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-22

## 1. 今日速览

项目今日整体活跃度较低，24小时内无新 Issue、无版本发布，仅有一条新增PR进入待合并队列。虽然表面数据平静，但该PR（#990）延续了近期“云网关服务商接入”的推进节奏，表明项目在扩大第三方云端模型兼容生态方面仍在稳步前进。长期来看，持续新增OpenAI兼容网关实现已成为项目近阶段的稳定主线。建议重点关注该PR的评审与合入进展，以及后续是否有配套文档更新。

**活跃度评估：低**

- Issues：0 新开 / 0 关闭
- PR：1 新增（待合并）/ 0 合并
- Releases：0


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日无PR被合并或关闭，项目核心代码库未发生变化。

值得关注的新增PR：

- **PR #990** — `feat(providers): add Eden AI as an OpenAI-compatible gateway`
  - 作者：MVS-source
  - 状态：待合并
  - 链接：https://github.com/nullclaw/nullclaw/pull/990
  - 摘要：新增 Eden AI 作为 OpenAI 兼容网关提供商，实现方式与 #922（NEAR AI Cloud 与 Atlas Cloud）保持一致，复用现有的 `OpenAiCompatibleProvider` 路径，无新增底层实现。Eden AI 通过单一 API Key 路由至多家上游模型供应商，服务商位于欧盟。

**解读：** 这是项目近段“网关聚合”扩展路线的又一落子。若合并，将轻度扩充实测兼容的云端中转服务清单，进一步强化 “一套客户端对接多家云端网关” 的产品定位。


## 4. 社区热点

今日社区讨论整体低迷，无高热度讨论主题。唯一新增PR（#990）目前尚无评论与点赞，作者提交描述简洁明确，未引发争议或额外讨论。

客观来看，低互动量本身不反映负面信号，更可能是项目当前处于稳定维护期，贡献者与维护者节奏平缓。


## 5. Bug 与稳定性

今日未报告任何 Bug、崩溃或回归问题。仓库 Issue 追踪器状态下暂无已知严重异常。项目整体运行状态健康。


## 6. 功能请求与路线图信号

今日无新的功能请求 Issue 开设。

**路线图信号分析：** 结合 #990 与历史 PR #922 的延续性，可明显看出项目当前路线图上“OpenAI 兼容网关接入”是优先级最高的功能方向之一。该系列PR均采用“零新实现、复用标准 Provider”的策略，工程成本低、收益明确，预计后续仍会持续出现同类提交。建议维护者考虑为该系列PR建立标准化的接入文档模板，降低外部贡献者的提交门槛。下一个候选网关服务商大概率会是另一家支持 OpenAI 协议的中转平台。


## 7. 用户反馈摘要

今日无新评论，无新增用户反馈可提炼。项目社区整体保持安静，暂无痛点或满意度的实时反馈。


## 8. 待处理积压

今日没有新增的长期未响应 Issue 或 PR。

建议关注：**PR #990**（https://github.com/nullclaw/nullclaw/pull/990）已进入待合并队列，且无 review 反馈记录，提醒维护者安排在合适时间进行评审，避免堆积。


## 附：项目健康度总评

| 维度 | 状态 | 说明 |
|------|------|------|
| 活跃度 | 低 | 24h内仅1条PR，无Issue、无Release |
| 维护响应 | 正常 | 无明显沟通延迟迹象（活跃样本极少） |
| 代码稳定性 | 稳定 | 无 Bug 报告、无回归 |
| 生态扩展 | 稳步推进 | 网关服务商接入方向持续有贡献者跟进 |
| 社区参与感 | 偏冷 | 无讨论热度，无外部评论互动 |

**整体评价：** 项目处于典型的“稳定维护 + 低波动”周期。虽无大版本里程碑推进，但连续的网关接入PR显示方向清晰。对于依赖多云网关聚合场景的用户，未来一段时间内兼容列表值得持续观察。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-22

*数据窗口：2026-08-21 ~ 2026-08-22 | 来源：nearai/ironclaw GitHub 仓库*


## 1. 今日速览

过去24小时项目活跃度**偏高**，核心维护团队（henrypark133、serrrfirat、italic-jinxin）密集推进两大主线：**CI 基础设施优化**（T1-T4 四项并行任务，#7798-#7801）和**通知系统/用户收件箱泛化**（#7687 史诗推进，PR #7699/#7700 已关闭）。值得注意的信号：3 条 XL 级 sandbox GitHub CLI 凭据中介 PR（#7806/#7807 关闭、#7810 新开）在同一天内先后合并与重开，说明该功能仍在迭代中；一条新 PR（#7811）引入 Xquik 托管 MCP，显示第三方集成生态正在扩张。今日**无新版本发布**，CI 纪律收紧（clippy 全特性 lint 修复 #7805）显示维护者对主干分支健康度的控制力在增强。


## 2. 版本发布

今日无新版本发布。关注 `release/2026-08-17` 分支的维护动态——该分支曾因 clippy 1.98 lint 问题导致所有 PR 失败（见 #7805），现已修复。


## 3. 项目进展

今日关闭/合并的 PR 主要集中在四个方向，按项目推进意义排序：

| 方向 | PR | 说明 |
|------|-----|------|
| **CI 维护修复** | [#7805 fix(ci): forward-port the clippy 1.98 lint fixes to 1.3](https://github.com/nearai/ironclaw/pull/7805) | 修复 release/2026-08-17 分支上所有 PR 必挂的 clippy 全特性编译错误（`chunks_exact` 常量块大小 lint），解除该分支的 CI 阻塞 |
| | [#7804 fix(workspace): honor IRONCLAW_REBORN_WORKSPACE_ROOT on 1.3](https://github.com/nearai/ironclaw/pull/7804) | 将 durable workspace-root 覆盖配置前向移植到 1.3 分支，补齐版本间功能漂移 |
| **Sandbox 凭据中介** | [#7806/#7807 feat(sandbox): mediate GitHub CLI credentials](https://github.com/nearai/ironclaw/pull/7806) | 为 `gh` 命令引入基于授权/审批的一次性凭据放置机制，替换 sandbox 中的明文占位符，新增取消支持与扩展声明凭据解析。两条 PR 同日合并后重开为 #7810（XL 级），说明原始方案可能需要进一步引入 `builtin.shell` 授权流改造 |
| **Telegram 通道修复** | [#7803 fix(telegram): keep paired channels ready and collapse reply drafts](https://github.com/nearai/ironclaw/pull/7803) | 修复个人设备凭据缺失时配对机器人停用的问题，并纠正 workspace-bot 配对在 UI 上的误导性呈现（不再显示为已连接的个人 Telegram 账户） |
| **通知系统落地** | [#7699 feat(notifications): publish actionable run gates](https://github.com/nearai/ironclaw/pull/7699) | 将批准、认证、阻塞三类运行门控事件发布至持久化用户收件箱，使用稳定的 run/gate 派生 ID 保证重试收敛，并在运行恢复或终止时解析先前门控通知 |
| | [#7690 议题关闭](https://github.com/nearai/ironclaw/issues/7690) | 用户收件箱通知发布（批准、认证、阻塞）全部子任务完成 |

**整体结论**：CI 稳定性和通知系统两大基础设施方向均有关键进展，Telegram 通道体验问题得到修复。约 15 条 PR 关闭/合并中约 8 条属于维护性修复（lint、前向移植、失败保留），**功能性推进集中在通知与 sandbox 两个方向**。今日另有 5 条新开 PR 待审（见下表），整体项目处于快速迭代期。


### 当前待合并 PR（节选）

| PR | 规模 | 状态 | 说明 |
|----|------|------|------|
| [#7810 feat(sandbox): mediate GitHub CLI credentials (重开)](https://github.com/nearai/ironclaw/pull/7810) | XL | OPEN | 在 #7806/#7807 基础上补充 per-user 托管 egress、`builtin.shell` 授权流与一次性凭据义务流 |
| [#7811 feat(extensions): bundle Xquik hosted MCP](https://github.com/nearai/ironclaw/pull/7811) | M | OPEN | 第三方 MCP：Xquik（Twitter/X 数据与账号任务），改用 OAuth 2.1 + S256 PKCE 替代浏览器 Cookie 方案 |
| [#7809 ci: canonical preflight — one gate list, worktree-safe hooks](https://github.com/nearai/ironclaw/pull/7809) | XL | OPEN | 落实 T4（T1-T5 任务）：单一 preflight 门禁脚本、worktree-safe hooks、REPRO 自打印 |
| [#7802 fix(webui): make OOBE suggestions always on](https://github.com/nearai/ironclaw/pull/7802) | M | OPEN | 移除环境变量与 session 功能开关，默认启用新人引导建议 |
| [#7794 refactor(webui): shared page shell and loading primitives](https://github.com/nearai/ironclaw/pull/7794) | L | OPEN | 抽取 `PageScroll`/`PageStack`/`Skeleton` 共享组件，迁移 Automations、Extensions 等五个页面 |
| [#7700 feat(notifications): publish authoritative run outcomes](https://github.com/nearai/ironclaw/pull/7700) | XL | OPEN | 基于 Process Journal 持久化运行结论（非监听器），仅在最终回复落盘后才发布完成通知 |
| [#7491 feat(coding): omp core-tool contract + engines + benchmark arm](https://github.com/nearai/ironclaw/pull/7491) | XL | OPEN | 6 个精确工具名（`read/write/edit/glob/grep/bash`），移除旧工具表面，新增基准测试 |

*另有 #7516（IronHub agent link 操作员界面）、#7257/#7750（设计系统 Storybook）、#7456（持久化存储 profile 无关化）、#7650（自动运行结果证据化）等多条 XL 级 PR 待审。*


## 4. 社区热点

今日最受关注的是 **CI expedite 系列**（T1-T4），由 henrypark133 集中提交，每个 Issue 均带 2-3 条评论。该系列针对一个已知痛点：**PR 绿灯但 merge queue 红灯**（#7800 明言 "closes the measured green-PR/red-queue divergence"）。四个任务形成完整链条：

| Issue | 内容 | 状态 |
|-------|------|------|
| [#7798 CI expedite T1: setup-rust composite](https://github.com/nearai/ironclaw/issues/7798) | 43 处 `dtolnay/rust-toolchain` 收敛为一个 composite action，导出 `RUSTUP_TOOLCHAIN` 防文件与输入漂移 | OPEN |
| [#7799 CI expedite T2: nextest pipeline](https://github.com/nearai/ironclaw/issues/7799) | cargo-nextest 替代逐二进制串行测试，JUnit 失败汇总、PR 反节流、网络守卫负对照 | OPEN |
| [#7800 CI expedite T3: PR/queue convergence](https://github.com/nearai/ironclaw/issues/7800) | 磁盘读取测试的 class-level drift guard（已证实两个 planner 欠选根因）、生产 PR 必跑 architecture-tests、queue 补 default-features clippy | OPEN |
| [#7801 CI expedite T4: canonical preflight](https://github.com/nearai/ironclaw/issues/7801) | `preflight-gates.sh` 为唯一门禁清单，`--ci` 免编译层、`--queue-shape` 跑 PR CI 跳过的检查、worktree-safe `core.hooksPath` | OPEN |

对应 PR [#7809](https://github.com/nearai/ironclaw/pull/7809) 已提交（T4 任务 1-5），但 T1-T3 尚无对应 PR。注意：**该系列 issue 与 #7798 #7799 #7800 均在同日创建且相互引用**，评论者（推测为维护者内部）正在讨论执行顺序。

**第二个热点**是 [#7811 Xquik MCP 集成 PR](https://github.com/nearai/ironclaw/pull/7811)，作为 "contributor: new" 标记的第三方贡献，采用 OAuth 2.1 动态注册 + S256 PKCE 替代浏览器 Cookie 采集，技术上比现有方案更先进，或将成为扩展生态的参考实现。


## 5. Bug 与稳定性

按影响范围与严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| **高** | [#7783 LLM timeout policy: finalization can't measure TTFT, and the retry budget can't fit the deadline](https://github.com/nearai/ironclaw/issues/7783) | 结构化输出最终化走非流式客户端，provider 停滞在 60s 总墙钟上限前不可见；75s 最终化截止时间会在重试完成前终止运行——单次传输停滞即导致整个会话失败 | **今日已关闭**（风险等级 medium，scope: llm） |
| 中 | [#7808 Memory write path: redaction + taint metadata required before any external provider binds](https://github.com/nearai/ironclaw/issues/7808) | 外部记忆 provider 绑定前置条件：当前写入路径原样输出对话内容，且只有宿主侧能在写入时修复——需要脱敏与污点元数据 | OPEN（阻塞 #7664） |
| 低 | [#7813 UI: heading gets cropped when suggestions panel appears](https://github.com/nearai/ironclaw/issues/7813) | 聊天首页 "What do you need help with?" 标题在建议面板渲染时被顶部裁切，布局未重排 | OPEN（无 fix PR） |

**回归防护**：CI 方向新增失败保留机制——[#7796 fix(sandbox): preserve failed Railway audit appends](https://github.com/nearai/ironclaw/pull/7796)（已合并），Railway proxy 审计记录追加失败时 fail-closed 并保留暂存数据以便重试，防止审计丢失。

**已修复**（版本前向移植方向）：clippy 1.98 lint 破坏 CI（#7805）、workspace root 配置缺失（#7804）、Telegram 配对误导（#7803）。


## 6. 功能请求与路线图信号

| 信号强度 | 需求 | 证据 |
|----------|------|------|
| **强（已有 PR）** | **可插拔记忆系统** — [#7664 Pluggable memory over MCP](https://github.com/nearai/ironclaw/issues/7664) 持续活跃，今日新增 #7808 作为其前置条件（脱敏 + taint 元数据）；提供者 crate `ironclaw_memory_mcp` 草案 #7661 已存在。**判断：可能进入 2026-Q4 路线图，但受制于安全前置条件** |
| **强（已有 PR）** | **通知中心 → 用户收件箱** — #7687 epic 持续推进：#7699 已合并，#7700 待审（基于 Process Journal 的权威运行结果通知）。**判断：预计 1-2 周内完成** |
| 中（Issue 无 PR） | **引导建议接入用户真实数据** — [#7812 Onboarding suggestions: respect user-level tool permissions](https://github.com/nearai/ironclaw/issues/7812)：建议生成应接入用户已连接工具（记忆、扩展、工具），遵守用户级权限，以只读方式生成建议。与 #7802（OOBE suggestions always on）配合，**可能进入下一迭代** |
| 中（PR 已开） | **Xquik（Twitter/X）托管 MCP** — #7811，OAuth 2.1 + PKCE 方案。**判断：合并概率高，可能带动更多第三方 MCP 接入** |
| 中（PR 已开） | **设计系统 + Storybook** — #7257（提案）+ #7750（Phase 1 集成）双 PR 待审，设计系统 epic #7038 持续推进 |


## 7. 用户反馈摘要

- **CI 体验痛点**（来自 #7798-#7801 评论）：讨论揭示了当前 12 个 workflow 文件、43 处分散的 rust-toolchain 调用导致工具链版本漂移难以追踪；PR 绿灯与 merge queue 红灯的偏差源于特定测试类在两种环境下的行为不一致。维护者正在系统性解决，但具体用户评论细节有限。
- **记忆外置的安全顾虑**（#7664 评论）：策略决定（2026-08-21 记录）将检索外置给记忆提供商，但写入路径直接 egress 对话原文——用户（或维护者代表 serrrfirat）明确指出需要**宿主在写入时**做脱敏与污点标记，否则任何外部 provider 绑定都存在数据泄露风险。这是安全与功能迭代的典型张力。
- **Telegram 连接流程困惑**（#7715 已关闭）：用户反映新 Telegram 连接流程无法区分机器人模式与个人账户模式，连接时无明确提示。修复 PR #7803 已合入，但 QA 验证结果待观察。


## 8. 待处理积压

以下为长期未响应或可能被忽视的重要事项（按优先级排列）：

| 优先级 | 事项 | 等待时间 | 说明 |
|--------|------|----------|------|
| **高** | [#7456 feat(reborn): make durable storage profile-agnostic](https://github.com/nearai/ironclaw/pull/7456) | 12 天 | XL 级结构重构（profile 根目录移至 `IRONCLAW_REBORN_HOME`、类型化安全信封），8/10 创建至今未合并，也无明确阻塞原因。持续拖延将加大与其他 XL 级 PR 的冲突面 |
| 中 | [#7516 feat(webui): operator surface for the IronHub agent link](https://github.com/nearai/ironclaw/pull/7516) | 10 天 | 第三方贡献（new contributor），为 Extensions 页面添加 IronHub 注册 URL 面板。无维护者评论记录，存在被忽略风险 |
| 中 | [#7491 feat(coding): omp core-tool contract + engines + benchmark arm](https://github.com/nearai/ironclaw/pull/7491) | 11 天 | 编码工具核心契约 + 引擎 + 基准测试，XL 级。无进度更新，可能需确认是否被 CI 系列工作阻塞 |
| 低 | [#7257 docs(design-system): proposal for WebUI design system](https://github.com/nearai/ironclaw/pull/7257) | 17 天 | 文档型 PR，被 #7750 部分超车（#7750 自我标注为 "supersedes #7039"），需确认与 #7750 的关系是否已理清 |
| 追踪 | [#7687 epic: durable user inbox](https://github.com/nearai/ironclaw/issues/7687) | 5 天 | 子任务 #7699 已合并、#7690 已关闭，但 #7700 仍在再审。Epic 级追踪需保持活跃 |

---

*注：数据基于 2026-08-22 抓取的 GitHub API 快照生成；"无评论" 指 PR 描述中未提供评论数而非确认零评论。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-22

*数据来源：github.com/netease-youdao/LobsterAI | 统计窗口：2026-08-21 ~ 2026-08-22*


## 1. 今日速览

项目今日以高强度的收尾合并为主，24小时内合入 12 个 PR，集中在 **DSH 运行时升级与埋点架构调整**、**资料库（Library）交互体验优化** 以及 **CoWork 大量历史性能修复合并** 三大方向。值得关注的是，今日合入的 PR 中有相当一部分是数月前提交的“陈年PR”被集中清理合并，反映维护者正在系统性地消化历史积压。此外，2 个历史 Issue 今日被自动标记为 stale 关闭，属于常规生命周期管理，无新增 bug 报告。整体项目处于高活跃度状态，但今日合并的多个 perf 与 fix PR 实际上从 4 月初就已存在，说明版本发布节奏正在加速追赶。

**活跃度评级：★★★★☆（高）**


## 3. 项目进展

今日合入 12 个 PR，涵盖运行组件升级、架构重构与体验优化，整体完成度较高。

### 🚀 核心运行时升级
- **[#2519] Release: 2026.8.21** — 发布分支合并，正式将 DeepSeek Harness (DSH) 运行时升级至 `0.1.1-rc.1`，并改善 Windows 集成可靠性。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/2519)
- **[#2516] feat: update dsh to 0.1.1-rc.1** — DSH 运行时版本升级，属于发布的主线支撑。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/2516)
- **[#2515] feat(dsh): add usage analytics for enable toggle and workbench open** — 为 DSH 启用开关与工作台打开尝试增加使用埋点（fire-and-forget，不阻塞 IPC 调用）。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/2515)
- **[#2518] refactor(dsh): move usage analytics reporting from main to renderer** — 将 DSH 埋点上报从主进程迁移至渲染进程，架构更合理，并避免日志中的冗余信标请求。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/2518)

### 📚 资料库（Library）交互升级
- **[#2514] feat(library): 优化本地产物预览与操作体验** — 包含预览弹窗尺寸调整、移除删除入口、区分空态与无结果态、搜索框一键清空、修复发布额度弹窗占位符替换 bug，并同步更新 IPC、类型、双语文案与设计文档。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/2514)
- **[#2517] fix(library): 完善文件分享与收藏交互** — 分享打包时保留 Unicode 文件名（仅替换不安全字符）、兼容历史文件名展示原始标题、收藏状态即时更新与失败回滚、避免收藏事件触发重复列表刷新、统一订阅/发布额度弹窗样式与关闭行为。附带自动化测试补充。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/2517)
- **[#2513] Feat/2026.8.17 library** — 资料库功能合并分支（版本分支合并）。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/2513)

### ⚡ 历史 PR 集中合入（CoWork 性能与修复）
以下 PR 均为 4 月初提交，今日集中合并：

- **[#1215] fix(im)** — 修复平台凭证保存（如钉钉/Telegram）时`setConfig`未触发 chatHandler 重建导致 systemPrompt 等变更不生效的问题。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/1215)
- **[#1218] fix(定时任务)** — 重构任务列表排序规则，解决新建任务随机出现在列表中间、启停混排无法快速区分的问题。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/1218)
- **[#1219] perf(cowork)** — 消除会话列表/详情页无效重渲染，为 `CoworkSessionItem` 补 `React.memo`，合并 4 个独立 `useSelector`。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/1219)
- **[#1220] perf(cowork)** — 消除 `recentChats()`/`conversationSearch()` 的 N+1 查询问题（每个 session 执行两次独立查询），大幅降低会话列表加载延迟。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/1220)
- **[#1224] fix(agent)** — 修复 CoworkPromptInput i18n 硬编码、Agent 弹窗 Escape 键关闭支持及删除防重复点击保护。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/1224)


## 4. 社区热点

今日无高讨论度的新 Issue 或 PR。综合各项数据，近期实际讨论热度最高的是 **#1223**（今日关闭的 i18n/UX 问题）。

- **[#1223] [Bug] CoworkPromptInput 硬编码中文标签导致英文用户提示词混入中文；Agent 弹窗缺少 Escape 键关闭及删除防重复点击保护** — 获 2 条评论，用户一次性发现 3 个互相关联的 UX/i18n 问题，且均已给出完整的定位与修复建议。值得注意的是，该 PR (#1224) 已随今日批量合并被合入主分支。[查看 Issue](https://github.com/netease-youdao/LobsterAI/issues/1223) | [查看修复 PR](https://github.com/netease-youdao/LobsterAI/pull/1224)

**解读：** 这类“一次报 3 个问题、自带修复方案”的高质量 issue 是项目良性社区生态的典型信号。合入即关闭，处理链路完整高效。


## 5. Bug 与稳定性

今日无新增 Bug。关闭 2 个 stale 历史 Issue（均无近期活跃讨论）：

| 严重程度 | 编号 | 标题 | 状态 | 说明 |
|---|---|---|---|---|
| 🟡 中 | [#1217](https://github.com/netease-youdao/LobsterAI/issues/1217) | 运行过程中偶发启动网关 | 已关闭（stale） | 偶现（1天3-5次），Win10 / 2026.3.26，附日志 | 
| 🟢 低 | [#1223](https://github.com/netease-youdao/LobsterAI/issues/1223) | CoworkPromptInput 硬编码中文标签等 3 个 i18n/UX 问题 | 已关闭（已修复） | 修复 PR > #1224 已合并 |

两个 Issue 关闭原因不同：**#1217** 因长时间无活跃讨论被自动标记 stale 关闭，**#1223** 则是因为修复代码合入后正常关闭（合理关闭）。若 #1217 所述偶发网关重启仍可复现，建议用户重新开 Issue 并附带最新版本信息与日志。


## 6. 功能请求与路线图信号

今日有 1 个明确信号值得关注：

- **DSH 使用分析埋点**（[#2515](https://github.com/netease-youdao/LobsterAI/pull/2515) + [#2518](https://github.com/netease-youdao/LobsterAI/pull/2518)）— 对 DSH 启用开关与工作台打开行为进行匿名化埋点，同时在埋点设计中兼顾隐私考量。这暗示**DSH（DeepSeek Harness）正在向正式功能演进**，后续版本可能围绕 DSH 增加更多基于使用数据的迭代优化，但目前在用户侧还未暴露为明确功能需求。

此外，今日合入的 **资料库从“删除文件”到“收藏/分享”的交互重心转移**（[#2514](https://github.com/netease-youdao/LobsterAI/pull/2514)），表明产品正在从“本地文件管理”工具向“协作分享”方向演进，后续可能加大社交化能力投入。


## 7. 用户反馈摘要

今日活跃反馈较少，主要来自 #1223 的高质量用户报告：

- **i18n 痛点（已修复）** ：`CoworkPromptInput.tsx` 中将 `'输入文件'` 拼接进发送给 AI 的提示词，非中文用户消息中混入中文，影响 AI 理解与用户体验。修复方式为通过 `i18nService.t()` 正确加载翻译。[查看 Issue](https://github.com/netease-youdao/LobsterAI/issues/1223)
- **键盘操作完整性（已修复）** ：Agent 弹窗不支持 Escape 关闭，用户需依赖鼠标点击，键盘流操作受阻。修复已随之合入。[查看修复 PR](https://github.com/netease-youdao/LobsterAI/pull/1224)


## 8. 待处理积压

目前积压 1 个 PR：

- **[#1550] [OPEN] fix(scheduledTask): 投递模式为“不通知”时，去除发送给网关的 channel/to 字段** — 作者 gongzhi-netease，自 2026-04-07 提交至今已 **4 个半月** 未合并。该 PR 修复的是会话创建的定时任务在投递模式选择“不通知”后，触发运行时网关报错的问题，修复思路为对齐手动创建路径的 delivery 对象构建逻辑。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/1550)

**建议维护者关注：** 该 PR 涉及定时任务与网关交互的稳定性问题，作者定位清晰、根因分析完整，建议尽快安排 review 与合并。考虑到近期批次处理了相近区域的历史 PR，该 PR 值得纳入下一个合并批次。


<aside>
💡 **健康度总结**：今日项目健康度良好 — 无新引入 bug、无遗留 Blocking 级 Issue、PR 合并效率高（92% 当日合并/关闭率）。唯一隐患是积压 PR #1550 搁置时间较长，但鉴于今日维护者表现出较强的清理意愿，预计短期内会有处理动作。
</aside>

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-22

## 今日速览

Moltis 在 8 月 21 日的开发活动处于**中高水平**，主要集中在 Bug 修复和功能完善上。过去 24 小时有 2 个新 Issue 提交、8 条 PR 动态（其中 7 条待合并，1 条已合并关闭）。社区活跃度主要集中在 **WhatsApp 集成改进、Cron 定时任务修复、以及活跃时段（active_hours）配置失效**三个方向。值得注意的是，今日有一个核心功能 Bug（`heartbeat.active_hours` 完全不生效）获得了对应修复 PR（#1208），说明项目对社区反馈的响应较为及时。PR #468 已经停滞 5 个月，值得维护团队关注。项目整体健康度良好，无版本发布，无明显重大回归。

## 版本发布

今日无新版本发布。最新版本信息请参考项目 Releases 页面。

## 项目进展

**今日合并的 PR（1 条）：**

| PR | 标题 | 说明 |
|----|------|------|
| [#1220](https://github.com/moltis-org/moltis/pull/1220) | `fix(whatsapp): render Markdown in outbound messages` | 将模型生成的 Markdown 转换为 WhatsApp 原生格式后投递，同时保留会话历史与 Web UI 中的原始 Markdown。该修复仅对文本消息和媒体标题生效，并要求完整的消息头/分隔符结构。 |

**总结**：该 PR 的合入提升了 WhatsApp 渠道的可用性，修复了模型输出 Markdown 语法在 WhatsApp 端显示异常的问题，是渠道集成层面的稳定化改进。

**待合并的 PR（7 条）中较重要的包括：**

- [#1208](https://github.com/moltis-org/moltis/pull/1208) — `fix(cron): honor heartbeat active hours when the scheduler fires`：修复 `heartbeat.active_hours` 完全不生效的核心功能 Bug。该 PR 对应 Issue #1205，是今日 #1223 同系列问题的修复方案。如果合入，将解决用户配置 `active_hours` 无法控制定时任务执行时段的问题。
- [#1226](https://github.com/moltis-org/moltis/pull/1226) — `fix(cron): deliver scheduled output to the originating chat`：让定时任务的输出能准确投递到发起聊天的对话中。
- [#1228](https://github.com/moltis-org/moltis/pull/1228) — `fix(whatsapp): persist inbound files for local tools`：将 WhatsApp 入站文件持久化，让本地工具获得稳定的 `local_path`。

## 社区热点

今日最受关注的议题集中在两个方向上：

1. **`active_hours` 配置不生效（Issue #1223 与 PR #1208）**
   - [Issue #1223《heartbeat active_hours has no effect on a default config》](https://github.com/moltis-org/moltis/issues/1223)：用户详细分析了 `is_within_active_hours` 函数的实现缺陷——当 `end: "24:00"` 时，该函数在任何时刻都不会抑制任务执行。
   - [PR #1208](https://github.com/moltis-org/moltis/pull/1208) 于 8 月 17 日创建，覆盖此问题，但至今尚未合入。
   - **诉求分析**：用户希望 `active_hours` 真正控制定时任务的执行时段，尤其是希望"非活跃时段完全静默"——这是一个合理的运维场景需求，但实现上似乎存在逻辑死角。

2. **WhatsApp 渠道集成完善（PR #1228、#1220）**
   - 从 PR 提交密度看（同一作者 rubenssoto 连续提交了 3 条 WhatsApp 相关 PR），说明 **WhatsApp 作为 Moltis 的投递渠道需要完善的地方还不少**，尤其是文件传输和消息格式两个方面。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| 高 | [#1223](https://github.com/moltis-org/moltis/issues/1223) | `heartbeat.active_hours` 配置对默认配置完全无效，用户设置 `start: "08:00"`、`end: "24:00"` 后任何时段任务都会执行 | 🔧 已有修复 PR #1208 待合并 |
| 中 | [#1224](https://github.com/moltis-org/moltis/issues/1224) | [Bug]: Tools stop working in shared Slack channels | 🆕 新报告，无修复 PR，待复现调查 |
| 低 | [#1222](https://github.com/moltis-org/moltis/pull/1222) | Web 端沙箱镜像请求未做完整校验，可能被滥用 | ✅ 已有修复 PR（增强校验 + 权限限制） |

**观察**：#1223 与 #1208 是同一问题的修复链路，该 Bug 已在社区被两个不同用户独立报告（#1205 和 #1223），说明该问题对 Cron 功能用户的影响面较广。建议维护团队优先合入 PR #1208。

## 功能请求与路线图信号

今日无明确的新功能请求 Issue。但从 PR 中可捕捉到以下路线图信号：

- **WhatsApp 渠道增强**（#1228、#1220）— 入站文件持久化 + 出站 Markdown 渲染，说明项目正在逐步打磨消息渠道的生产级能力。
- **Obscura 隐身模式**（[#1227](https://github.com/moltis-org/moltis/pull/1227)）— 为浏览器工具默认启用 stealth 模式，这表明项目在**增强隐私与反检测能力**，对爬虫/自动化场景是明确的功能加分项。
- **Cron 投递语义改进**（#1226）— 定时任务输出投递到"发起聊天"，明确为"对话即任务入口"的场景补上闭环。

## 用户反馈摘要

- 用户 `Lstarsky0` 在 [#1223](https://github.com/moltis-org/moltis/issues/1223) 中提供了**详细的代码级分析**，指出 `is_within_active_hours` 解析 `end` 参数的逻辑顺序问题，并准确描述了函数行为与文档描述的偏差。这是高质量 Bug 报告的典型——直接定位到具体函数和解析逻辑，能显著降低维护者的排查成本。
- 用户 `affanshahid` 在 [#1224](https://github.com/moltis-org/moltis/issues/1224) 中报告了 Slack 共享频道中工具失效的问题，但信息尚不完整（缺少完整会话上下文），仍处于待复现阶段。

## 待处理积压

| 类别 | 编号 | 描述 | 待处理时间 |
|------|------|------|-----------|
| 长期未合入的 PR | [#468](https://github.com/moltis-org/moltis/pull/468) | Windows 平台 shell hooks 使用 `cmd.exe /C` 替代 `sh -c`。作者已在 Windows 10 上完成测试，CI 也已通过，但 **5 个月未合入**。作为跨平台兼容性修复，优先级可能不高，但长时间搁置会影响 Windows 用户的插件体验。 | 5 个月 |
| 已有修复 PR 但未合入 | [#1208](https://github.com/moltis-org/moltis/pull/1208) | 修复 `heartbeat.active_hours` 不生效的问题，已完成测试，关闭 #1205，但等待合入。 | 4 天 |
| 待确认的新 Bug | [#1224](https://github.com/moltis-org/moltis/issues/1224) | Slack 共享频道工具失效，等待维护者复现和进一步信息。 | 1 天 |

---

> ⚠️ **维护者行动项建议**：1）优先合入 PR #1208 并关闭 Issue #1223；2）对 PR #468 给出明确合入或关闭的决定，避免长期积压。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

好的，我是您的 AI 智能体与个人 AI 助手领域开源项目分析师。根据 CoPaw (github.com/agentscope-ai/CoPaw) 的 GitHub 数据，我为您生成了 2026-08-22 的项目动态日报。

---

### CoPaw 项目动态日报 - 2026-08-22

#### 1. 今日速览

CoPaw 项目今日社区活跃度极高，Issue 和 PR 更新量均维持在 30+ 的高位水平，处于密集迭代和用户反馈爆发期。当前最高优先级的 Bug 集中在 **MCP 连接稳定性** (#6524) 与 **v2.1.1-beta.1 的回归问题** (#7206)，严重阻碍了部分用户的正常使用。同时，社区对 **UI/UX 定制化**（如隐藏工具调用信息）和 **文件/媒体处理策略** 的诉求非常强烈，但相关功能 PR 大多仍处于待合并状态，项目维护者合并 PR 的速度需要关注。

#### 2. 版本发布

今日无新版本发布。

#### 3. 项目进展

今日无 PR 被合并（数据集中无 `[MERGED]` 状态）。已关闭的 15 个 PR 多为测试、文档或版本号更新，如 `test(coverage)` (#7205) 和 `chore: bump the version to v2.1.1b2` (#7200)。**核心功能进展主要来自待合并的 PR 池**，值得关注的有：

- **基础设施与应用**：`feat(qwenpaw-data)` (#7190) 旨在让数据应用可独立运行，并补充了 GAAP 演示环境，有助于降低上手门槛。`feat(hub)` (#7112) 引入自托管多用户 Hub，是向企业级应用迈进的重要一步。
- **核心功能增强**：
    - **DingTalk 群聊共享上下文**：`feat(dingtalk)` (#7208) 允许群聊共享 Session 上下文，解决了多成员协作时上下文割裂的核心痛点。
    - **按 Agent 归因 Token 用量**：`feat(token-usage)` (#7207) 对于需要精细化管理成本的团队非常实用。
    - **工具层强化**：`feat(tools)` (#7113) 引入了 `apply_patch` 事务、PTY 会话管理等能力，将显著增强 Agent 在复杂任务中的工具执行可靠性。
    - **多项目目录支持**：`feat: session-scoped multi project directories` (#6976) 允许一个会话绑定多个项目目录，更贴近真实开发场景。
- **体验优化**：`fix(chat)` (#7187) 和 `perf(console)` (#7176) 从细节上改善用户体验（标题生成与长会话流畅度）。

这些待合并的 PR 展示了项目在 Agent 工具链、上下文管理和多用户协作方面的技术野心，若顺利合入，将是一次大的版本能力跃升。

#### 4. 社区热点

- **#6524 [Bug] MCP 后端重启后客户端无法自动恢复** (评论: 6) - [链接](agentscope-ai/QwenPaw Issue #6524)
    - **诉求分析**：这是今日讨论度最高的问题。用户依赖 MCP 生态，但服务端重启是常见运维操作。连接无法自动恢复，迫使用户必须重启客户端，严重影响了开发流程。这反映出社区对 MCP Server 生命周期管理和连接健壮性的高要求。

- **#6780 [Question] 2.0.1版，不使用时几十分钟后自己回卡死** (评论: 4) - [链接](agentscope-ai/QwenPaw Issue #6780)
    - **诉求分析**：这是一个典型的长时运行稳定性问题。用户期望一个常驻后台的 AI 助手应该做到“随时待命”，而程序在空闲后卡死违背了这一基本期望，对用户体验伤害极大。

- **#7206 [Bug] v2.1.1-beta.1: manual /compact always fails with pydantic ValidationError** (评论: 2) - [链接](agentscope-ai/QwenPaw Issue #7206)
    - **诉求分析**：这是新版本引入的回归 Bug，直接导致核心功能 `/compact` 不可用。用户对 beta 版本的稳定性抱有期望，此类回归会动摇用户对新版本的信心。

#### 5. Bug 与稳定性

按严重程度排序：

- **高**:
    - **MCP 连接无法自动恢复** (#6524)：影响依赖 MCP 工具的全部用户，是生产环境的阻断性问题。**尚无对应 fix PR**，但已有一段时间，需官方尽快介入。
    - **v2.1.1-beta.1 `/compact` 功能回归** (#7206)：明确的版本回归，用户已定位到 `compact_threshold_ratio == 0.9` 的触发条件。**尚无对应 fix PR**。
    - **会话记忆串线** (#7193)：Agent 在特定操作后，会搜索到同一 Agent 其他会话的内容，导致行为错乱。这是涉及用户数据与隐私的严重逻辑错误，**尚无对应 fix PR**。

- **中**:
    - **嵌入(embedding)健康检查超时** (#7156)：导致向量召回功能降级，影响 RAG 效果，且 `timeout` 硬编码缺乏配置灵活性。**尚无对应 fix PR**。
    - **`ToolResultCapMiddleware` 导致 history.db 膨胀至 7.6G** (#7168)：长期运行的 Agent 数据库文件异常膨胀，虽已关闭，但根因与解决方案值得持续关注。
    - **工具调用 404** (#7016)：在流式会话中出现 `Tool call not found` 错误，可能导致工具执行失败。

- **低**:
    - **WebView2 渲染进程启动崩溃** (#6427)：影响 v2.0.0+post.4 版本的桌面客户端，Windows 用户受影响。

#### 6. 功能请求与路线图信号

今日用户提出的功能请求非常聚焦于 **“界面定制化”**与 **“细粒度控制”**：

- **UI 定制化需求集中爆发**：多条 Issue 表达了希望 **“隐藏/折叠工具调用和推理过程”** (#7203, #7196) 的诉求，这说明当前 AI 审阅/处理文档的场景日益增多，用户希望有一个更干净的界面。此外，**全屏模式遮挡问题** (#7195) 和 **审批模式策略优化** (#7198) 也是高频反馈点。这些信号表明项目需要在“专业/极简模式”或更灵活的 UI 配置上下工夫。
- **多媒体/文件处理策略**：`Separate per-provider max_image_bytes / ...` (#7201) 请求拆分不同媒体类型的上传限制，这背后是用户在处理大型视频/PDF 等文件时遇到的现实问题。
- **可纳入路线图的信号**：
    - **`feat(console): show custom profile markdown files`** (#6808)：解决“自定义频道/Profile 选不到”的问题，与 #7197 反馈一致，是提升自定义能力的关键，建议优先合并。
    - **`feat(desktop): add global-hotkey floating quick-input window`** (#6607)：这是对交互模式的重大优化，类似于 Spotlight 的快速唤起，可能成为桌面端的高频亮点功能。

#### 7. 用户反馈摘要

- **满意之处**：
    - **基本功能可用**：内置工具、自定义频道等基础功能在 v2.1.0 上运行正常（如 #7197 中提到“功能都正常了”）。
- **主要痛点**：
    - **稳定性问题**：空闲后卡死 (#6780)、WebView2 崩溃 (#6427)、启动挂起 (#6430) 等，说明应用在长时间运行和不同环境下的稳定性仍需打磨。
    - **协作模式缺陷**：DingTalk 群聊上下文无法共享，极大限制了团队协作场景 (#7208)。
    - **视觉干扰严重**：大量用户（在同一会话中提到）对“始终展示推理过程”和“工具调用信息”感到困扰，这成为了影响沉浸式工作的主要障碍。
    - **操作习惯不符**：用户 #4816 强烈抨击会话排序方式“反人类”，期望按最近对话时间排序，这属于基础用户体验的严重失真。

#### 8. 待处理积压

以下 Issue 或 PR 长时间未获响应或仍在处理中，建议维护者重点关注：

- **[Bug] #6427 WebView2 渲染进程崩溃** (7月24日创建)：严重影响 Windows 用户，需紧急处理。
- **[Bug] #6430 startup hang** (7月24日创建)：应用启动时长时间挂起，影响所有用户。
- **[PR] #5992 Add per-session model overrides** (7月12日创建)：功能已被社区多次请求，但长期处于 Under Review 状态。
- **[Bug] #6524 MCP 后端重启后客户端无法自动恢复** (7月28日创建)：当前社区热点，生态集成稳定性问题。
- **[PR] #6607 feat(desktop): global-hotkey floating quick-input window** (7月31日创建)：高质量交互增强，长期未合并。
- **[PR] #6399 feat: add reranker UI config panel** (7月23日创建)：内存检索相关 UI 配置，久未推进。

---
**总结**：CoPav 项目当前功能迭代速度较快，但依赖的 PR 合并效率不高，导致用户反馈的 Bug（尤其是回归问题）和功能请求（如 UI 定制）无法及时解决。项目健康度**中等偏上**，但近期需要维护者投入更多精力在 Bug 修复和 PR 合并上，以维持社区满意度。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-22

> 项目地址：[github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

ZeroClaw 过去 24 小时保持了极高的社区活跃度：**49 条新开/活跃 Issue** 与 **48 条待合并 PR** 同时在线，讨论焦点集中在 **安全策略绕过**（#10165/#10164 系列）、**运行时可观测性缺口**（#10115/#10114 截断不可见问题）以及 **ZeroCode TUI 交互缺陷**。两个安全相关的 P0/P1 级 Bug 贯穿了从沙箱到插件系统的多个层次，且均处于 accepted 状态并有针对性 PR 跟进。整体来看，项目处于**高强度迭代期**，安全加固与运行时可靠性是当前主线，但大量 `needs-author-action` 标记的 PR 表明协作效率存在一定的瓶颈。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

过去 24 小时内**合并/关闭的 PR 共 2 条**，数量较少：

| PR | 简介 | 状态 |
|---|---|---|
| [zeroclaw-labs/zeroclaw PR #10226](https://github.com/zeroclaw-labs/zeroclaw) | *(未在前 30 条中展示，按数据标注为已合并)* | 已合并 |
| 其余 | — | 已关闭/合并且未在展示列表中 |

> **注**：首页展示的 50 条 PR 更新中，仅 2 条为已合并/关闭。当前 48 条未合并 PR 中有多条带有 `needs-author-action`（如 #9637、#9645、#10142、#10146、#10192、#10201、#10203），说明**上游协作的瓶颈在于等待作者回复而非代码审查**。

**正在推进的关键 PR 亮点：**

- **[#10197 fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)** — 直接修复 #10121 报告的 S0 数据丢失问题，确保流式输出在进程退出后不丢失
- **[#10093 fix(hardware): isolate manifest-installed plugin subprocesses](https://github.com/zeroclaw-labs/zeroclaw/pull/10093)** — 安全加固，清理插件子进程的宿主环境继承
- **[#10203 fix(log): bridge log-facade records into the tracing pipeline](https://github.com/zeroclaw-labs/zeroclaw/pull/10203)** — 修复依赖日志丢失问题
- **[#10176 ci(docker): enforce Alpine non-root image metadata](https://github.com/zeroclaw-labs/zeroclaw/pull/10176)** — 将 CI 安全校验扩展到 Alpine 镜像

**其他值得关注的 PR：**

- **[#9638 feat(acp): select standalone default agent](https://github.com/zeroclaw-labs/zeroclaw/pull/9638)** — 增强 ACP 启动器灵活性，已提交 21 天仍在等待合并
- **[#10208 fix(tests): fix Windows platform test failures](https://github.com/zeroclaw-labs/zeroclaw/pull/10208)** — 修复 Windows 平台上 bash 路径转义与容器发布测试问题，提升跨平台可靠性
- **[#10210 fix(tools): bound agent-browser subprocess waits with a deadline and kill_on_drop](https://github.com/zeroclaw-labs/zeroclaw/pull/10210)** — 为 agent-browser 子进程添加超时限制与 kill_on_drop，防止进程悬挂

---

## 4. 社区热点

**讨论最活跃的 Issue 集中在安全策略与运行时割裂问题**：

| Issue | 评论数 | 热度原因 |
|---|---|---|
| [#10165 independent delegate bypasses `block_high_risk_commands`](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) | 3 | 安全沙箱 S0 绕过的严重性极高，且与 #10164 构成互补关系 |
| [#10074 SECURITY.md documents removed CI job](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) | 3 | **已关闭**，文档与实际 CI 脱节的问题已解决 |
| [#10068 Interactive agent session caps context at 32,000 tokens](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | 3 | 直接影响高级用户的长上下文使用场景 |
| [#10066 SOP engine promotes before recording output-schema rejection](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | 3 | SOP 引擎执行顺序错误导致后续步骤在无意义的情况下执行 |
| [#10059 Option-Backspace word deletion in ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/10059) | 3 | macOS 用户高频输入场景的体验诉求 |

**关键洞察**：`#10165`（delegate 绕过安全策略）与 `#10164`（allowlist 被忽略）构成一对镜像问题——安全策略在 delegate 和父节点两个路径上出现相反的行为偏差。这反映出**安全策略在多层执行路径上的传递性仍是核心痛点**，社区关注度高。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 S0 — 数据丢失 / 安全风险

| Issue | 问题描述 | Fix PR 状态 |
|---|---|---|
| [#10165 Delegate 绕过高危命令封锁](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) | Independent delegate 在自身 risk_profile 标记 `block_high_risk_commands = true` 时，仍能执行 `rm` 等高危命令 | ⏳ 无直接 PR，需安全团队介入 |
| [#10121 部分 Code/ACP turns 在进程退出时消失](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) | 流式输出、工具调用和结果在终端更新前丢失 | ✅ [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) 已在讨论中 |

### 🟠 S1 — 工作流阻塞

| Issue | 问题描述 | Fix PR 状态 |
|---|---|---|
| [#10066 SOP 引擎在验证失败后仍提前执行后续步骤](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | 输出 schema 拒绝被记录在提升之后，后序步骤在无效状态下执行 | ⏳ 暂无 |
| [#10061 Provider-rejected image 持续污染会话](https://github.com/zeroclaw-labs/zeroclaw/issues/10061) | 被拒图片残留在历史记录中，后续文本对话反复重放 | ⏳ 暂无 |
| [#10230 Daemon 启动/重载时栈溢出](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Quickstart 配置导致 Tokio worker 栈溢出崩溃 | ⏳ 需复现 |

### 🟡 S2 — 行为退化

| Issue | 问题描述 | Fix PR 状态 |
|---|---|---|
| [#10114 `max_tool_result_chars` 固定 50k 与模型上下文无关](https://github.com/zeroclaw-labs/zeroclaw/issues/10114) | 工具结果截断阈值与模型上下文窗口不匹配 | ⏳ 暂无 |
| [#10115 工具结果截断对用户不可见](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) | 仅在模型上下文中插入标记，外部无法感知截断 | ⏳ 暂无 |
| [#10116 超长工具结果从中部字节级截断](https://github.com/zeroclaw-labs/zeroclaw/issues/10116) | head 2/3 + tail 1/3 的截断方式破坏语义完整性 | ⏳ 暂无 |
| [#10068 交互会话上下文上限被硬编码为 32k](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | 忽略配置的 131072 max_context_tokens | ⏳ 暂无 |
| [#10058 ZeroCode 文件搜索忽略键盘导航](https://github.com/zeroclaw-labs/zeroclaw/issues/10058) | `/` 过滤后 Up/Down 无法移动选择 | ⏳ 暂无 |
| [#10238 ZeroCode 显示过期的 Connected 状态](https://github.com/zeroclaw-labs/zeroclaw/issues/10238) | daemon 退出后绿色状态未更新 | ⏳ 暂无 |
| [#10175 Google TTS API key header 未标记为敏感](https://github.com/zeroclaw-labs/zeroclaw/issues/10175) | 日志或格式化输出可能泄露 API key | ⏳ 暂无 |

---

## 6. 功能请求与路线图信号

### 高确定性纳入（已有实现 PR 或 accepted）

| 功能 | Issue / PR | 理由 |
|---|---|---|
| **WhatsApp 机器人显示名称可配置** | [#10200](https://github.com/zeroclaw-labs/zeroclaw/issues/10200) / [#10201](https://github.com/zeroclaw-labs/zeroclaw/pull/10201) | 填补产品体验空白，PR 已就绪 |
| **默认开启流式响应** | [#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166) | `stream_mode` 默认值从 `off` 改为 `partial`，已被 accepted |
| **默认启用 stall watchdog** | [#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168) | 默认超时机制防止挂起，已被 accepted |
| **log 桥接修复** | [#10202](https://github.com/zeroclaw-labs/zeroclaw/issues/10202) / [#10203](https://github.com/zeroclaw-labs/zeroclaw/pull/10203) | 修复依赖日志丢失问题，PR 待作者回复 |

### 中确定性（accepted/in-progress 但实现未完全落地）

| 功能 | Issue | 当前状态 |
|---|---|---|
| **Provider 调用计费生命周期补全** | [#10143](https://github.com/zeroclaw-labs/zeroclaw/issues/10143) | 需要 PR #10003 之后的收尾工作，涉及计费准确性 |
| **插件安装与配置种子绑定为原子操作** | [#10162](https://github.com/zeroclaw-labs/zeroclaw/issues/10162) | 保证失败后可重试 |
| **Rolling 日志策略退役** | [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) | 性能回归修复 + `/api/logs` 跨段查询 |

### 低确定性（增强/待确认）

| 功能 | Issue | 理由 |
|---|---|---|
| **Option-Backspace 词删除** | [#10059](https://github.com/zeroclaw-labs/zeroclaw/issues/10059) | Good first issue，低风险 UX 改进 |
| **iMessage 语音转文字** | [#10140](https://github.com/zeroclaw-labs/zeroclaw/issues/10140) | 对齐 Telegram/Slack/Discord 行为，但 iMessage 渠道优先级可能不高 |
| **ZeroCode 日志可选中复制** | [#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086) | 属于交互体验优化的长尾需求 |

---

## 7. 用户反馈摘要

### 安全策略的两面性矛盾 🔥
> 用户在 [\#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164) 和 [\#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) 中报告了一个令人困惑的双重标准：**delegate 可以绕过封锁，而父节点上明确放行的命令反而被硬拦截**。用户预期 `block_high_risk_commands` 与 `allowed_commands` 在所有执行路径上行为一致，但实际出现了方向完全相反的偏差。这暴露了安全策略在多层 agent 拓扑中缺乏统一的传递与合并机制。

### 长上下文用户的实际硬伤 📏
> icemann521 在 [\#10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) 中报告：即使配置了 131072 token 的上下文窗口，会话仍被强制压在 32k。用户明确指出 `zeroclaw agent --agent <name>` 的场景下上下文被硬顶，**配置与运行时行为不一致**，此类问题直接影响高级用户对大上下文模型的使用体验。

### 工具可见性的专业诉求 🔍
> JordanTheJet 连续提交多条 issue（[#10114](https://github.com/zeroclaw-labs/zeroclaw/issues/10114)、[#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)、[#10116](https://github.com/zeroclaw-labs/zeroclaw/issues/10116)）指出工具结果截断的痛点：**截断在中部进行破坏了语义结构，且截断本身对外部不可见**。这是一个专业开发者从调试与可观测性视角提出的高价值反馈。

---

## 8. 待处理积压

### ⚠️ 急需关注的长期待合并 PR

| PR | 备注 | 等待时长 |
|---|---|---|
| [PR #9638 feat(acp): select standalone default agent](https://github.com/zeroclaw-labs/zeroclaw/pull/9638) | 已提交 **21 天**，基础功能增强，评论数为 0 | 21 天 |
| [PR #9637 fix(ci): guard temporary React Router RSC exception](https://github.com/zeroclaw-labs/zeroclaw/pull/9637) | 标记 `needs-author-action` + `do-not-merge`，依赖审查阻塞 | 21 天 |
| [PR #9645 feat(providers): ZeroRouter preset and device-flow login](https://github.com/zeroclaw-labs/zeroclaw/pull/9645) | 大型功能 PR（size:XL），已 21 天未获推进 | 21 天 |

### ⚠️ 关键 Issue 积压

| Issue | 严重程度 | 备注 |
|---|---|---|
| [#10165 Delegate 绕过安全策略](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) | S0 | 高危安全漏洞，无 PR 跟进 |
| [#10066 SOP 引擎执行顺序错误](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | S1 | 工作流阻塞，无 PR |
| [#10061 图片污染会话](https://github.com/zeroclaw-labs/zeroclaw/issues/10061) | S1 | 工作流阻塞，无 PR |
| [#10199 plugin egress 无法取消阻塞 DNS](https://github.com/zeroclaw-labs/zeroclaw/issues/10199) | risk:high | Follow-up，需要运行时层面的修复方案 |

### 💡 维护者建议

1. **优先级排序**：集中资源先解决 #10165（S0 安全）和 #10164（安全策略矛盾），两者是同一安全策略基础设施的两面
2. **清理 PR 积压**：标记 `needs-author-action` 的 PR（#9637/#9645/#10142/#10146 等）连续多日无动静，建议设置明确的时间窗口并考虑直接联系作者
3. **关注运行时配置一致性**：#10068/#10114/#10116 三个 Issue 的共性问题是运行时行为与配置声明不对齐，建议从配置校验层统一治理
4. **文档同步**：#10074（已关闭）暴露出文档滞后的问题，SOP 引擎 #10066 的执行语义变化应尽快同步到规范文档

---

*本日报由 AI 分析师自动生成，数据来源为 ZeroClaw GitHub 仓库 2026-08-22 状态快照。*

</details>

---
*本日报由 [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial) 自动生成。*