# OpenClaw 生态日报 2026-08-20

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-20 01:09 UTC

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

# OpenClaw 项目动态日报 — 2026-08-20

## 1. 今日速览

OpenClaw 项目今日呈现极高活跃度，24 小时内 Issues 和 PR 更新均达到 500 条的上限，表明项目正处于密集的开发与迭代周期。Issue 关闭率仅 6.8%（34/500），PR 合并/关闭率 15.6%（78/500），积压压力持续上升。值得关注的是，P0 级数据丢失类问题（#119270、#117742、#123327）仍然悬而未决，且多个"钻石龙虾"级高影响问题长期滞留，项目健康度存在隐忧。此外，`clawsweeper` 自动化机器人（ClawSweeper）已深度介入 Issue 分类与 PR 生成（如 #120143、#119367），显示项目正在探索 AI 辅助维护工作流。


## 2. 版本发布

过去 24 小时内无新版本发布。当前最新版本为 `v2026.8.1-beta.2`，其发布验证正在进行中（见 Issue #125626，13 条评论，由 maintainer Patrick-Erichsen 跟踪）。此外，有多个 Bug 报告指向 `v2026.8.1-beta.2` 引入了新的回归问题（#124284 与 #125679），建议用户在正式版发布前谨慎升级。


## 3. 项目进展

今日合并/关闭的 PR 中，以下 3 项值得关注：

- **[](https://github.com/openclaw/openclaw/pull/116489) feat(security): require acknowledgement for install policy warnings**（合并，size: XL，`security-boundary` 标签）— 这是一项重要的安全功能：外部 `security.installPolicy` 命令现在可返回 `warn` 状态，操作员可在安装可疑插件/技能前审阅警告并决定是否继续。配合 [](https://github.com/openclaw/openclaw/pull/120900) 的 Control UI 审阅界面，安装策略警告的确认流程已贯通 CLI 与 Web UI 双入口。这是继 8 月上旬安全加固系列（#115630 等）之后的又一关键里程碑，显著强化了供应链攻击防线。

- **[](https://github.com/openclaw/openclaw/pull/126250) fix(discord): route polls through canonical delivery**（合并，size: L，`message-delivery` 标签）— 修复 Discord 投票消息绕过标准投递管线的问题。此前轮询消息会丢失继承的线程路由、静默通知标志、平台回执等关键信息，现已统一走标准投递通道。同日合并的 [](https://github.com/openclaw/openclaw/pull/126421) 也将 compaction 默认推理级别降至 `low`，避免高推理模式拖慢维护摘要生成。

- **[](https://github.com/openclaw/openclaw/pull/126145) fix(cron): persist outbound route only after successful delivery**（待合并，P1）— 修复 cron 任务投递失败后仍将无效 `open_id` 写入 `sessions.json`，导致后续所有发送持续失败的问题（关联 #112710）。类似的 cron 修复还有 [](https://github.com/openclaw/openclaw/pull/120056)，将 `NO_REPLY` 视为"未回复"以正确触发失败重试机制。

就整体进展而言，今日合并的 PR 数量为 78，主要聚焦于安全加固、消息投递可靠性和 UI 改进，核心代理运行时层面未见大幅功能更新，项目或在为下一正式版本做稳定性收尾。


## 4. 社区热点

| Issue/PR | 标题 | 评论数 | 👍 | 分析 |
|----------|------|--------|---|------|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost — no retry, no notification, no auto-restart on timeout | 26 | 2 | **5 个月前报告的 P1 问题仍在活跃讨论中**，且标记为 `no-new-fix-pr`。用户对子代理超时后静默丢失结果非常不满——无重试、无通知、无自动重启。这是社区对**代理可靠性**的核心诉求 |
| [#77598](https://github.com/openclaw/openclaw/issues/77598) | Track live dev agent behavior and trajectory | 22 | 1 | Maintainer pashpashpash 持续 24 小时观察自己的开发代理行为。这条 issue 作为"running notes"，社区高度关注 AI 辅助编码的真实轨迹 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | "Cannot convert undefined or null to object" with google-vertex/gemini-3.1-pro-preview | 14 | 3 | 3 月报告的回归问题，至今未修复（`needs-live-repro`），用户呼声很高（👍 3 为最高之一）。反映模型兼容性问题的修复周期过长 |
| [#108435](https://github.com/openclaw/openclaw/issues/108435) | Gateway fails to start w/ error (P0, crash-loop) | 14 | 3 | 7 月 15 日报告的 P0 级网关启动崩溃，至今仍开放，已影响 2026.7.1 用户超过一个月 |
| [#125679](https://github.com/openclaw/openclaw/issues/125679) | Matrix channel infinite restart loop (bisected to #125302) | 9 | 0 | **已关闭**。新引入的回归被迅速定位并关闭，说明该问题可能已在 master 上修复或有了明确处理方案 |

**社区诉求分析**：累计评论数排名前列的问题集中于**子代理可靠性**（#44925 26 条）、**开发者代理行为追踪**（#77598 22 条）、以及**模型兼容性和启动崩溃**等 P0/P1 级阻断问题（#38327、#108435）。值得注意的是，用户对**状态丢失和数据损坏**类问题（#119270、#117742、#123327）虽评论数不高，但均为 P0 且标记 `diamond lobster`，预计后续将引发更激烈的社区反馈。


## 5. Bug 与稳定性

### 🔴 P0 级 — 数据丢失/损坏（暂无 fix PR 或修复中）

| Issue | 标题 | 状态 | 标签 |
|-------|------|------|------|
| [#123327](https://github.com/openclaw/openclaw/issues/123327) | WAL checkpoint copies index pages over SQLite page 1 (local ext4) | OPEN | `data-loss`, `P0` |
| [#119270](https://github.com/openclaw/openclaw/issues/119270) | File tools strip leading @ from destination paths — 写入并删除错误文件 | OPEN | `data-loss`, `P0`, `bulk-filed` |
| [#117742](https://github.com/openclaw/openclaw/issues/117742) | Failed multi-file apply_patch leaves earlier deletions committed | OPEN | `data-loss`, `P0`, `bulk-filed` |
| [#94939](https://github.com/openclaw/openclaw/issues/94939) | 6.x state migration leaves channel conversation-store SQLite empty (0 bytes) | OPEN | `data-loss`, `message-loss` |

### 🟠 P1 级 — 核心功能回归/崩溃

| Issue | 标题 | 状态 | 是否有 fix PR |
|-------|------|------|--------------|
| [#108435](https://github.com/openclaw/openclaw/issues/108435) | Gateway fails to start (P0, crash-loop) | OPEN, 14 评论 | ⚠️ 未标记 |
| [#124284](https://github.com/openclaw/openclaw/issues/124284) | Subagent spawn fails with vLLM + thinking (regression in beta.2) | OPEN | ⚠️ 未标记 |
| [#125679](https://github.com/openclaw/openclaw/issues/125679) | Matrix channel infinite restart loop (bisected) | **CLOSED** | ✅ 已解决/已定位 |
| [#119796](https://github.com/openclaw/openclaw/issues/119796) | Windows vitest teardown EBUSY on agent state DB | OPEN | ✅ 已有关联 PR |

### 🟡 P2/P3 级 — 消息丢失/会话异常

| Issue | 标题 | 状态 |
|-------|------|------|
| [#88657](https://github.com/openclaw/openclaw/issues/88657) | DeepSeek V4 Flash incomplete turn (payloads=0) | OPEN |
| [#120735](https://github.com/openclaw/openclaw/issues/120735) | Telegram stickers arrive as raw refs, not staged to disk | OPEN, `linked-pr-open` |
| [#123273](https://github.com/openclaw/openclaw/issues/123273) | Image attachments fail for named (non-default) agents | OPEN |
| [#114211](https://github.com/openclaw/openclaw/issues/114211) | Matrix room agents loop on no-reply output & stale replay | OPEN |

**稳定性评估**：P0 级数据损坏类问题集中在 SQLite 状态库和文件工具上，且 `#123327` 的 WAL checkpoint 覆盖数据库头页问题在 Raspberry Pi 上出现两次，提示可能存在底层存储引擎缺陷。`#119270` 与 `#117742` 均由同一用户（yetval）批量提交（`bulk-filed`），且均已有关联 PR，修复概率较高。整体来看，**修复速度跟不上报告速度**，P0/P1 问题的中位存续时间可能超过 2 个月。


## 6. 功能请求与路线图信号

### 高潜力候选（已有 PR 关联或讨论热度高）

| Issue | 标题 | 评论 | 标签 | 分析 |
|-------|------|------|------|------|
| [#60572](https://github.com/openclaw/openclaw/issues/60572) | Multi-Slot Memory Architecture | 6 | 👍 3 | 社区对 `plugins.slots.memory` 单一槽位限制不满，请求支持多个内存 provider 同时工作。已有 `linked-pr-open` |
| [#63930](https://github.com/openclaw/openclaw/issues/63930) | Support Anthropic advisor tool (beta server-side tool) | 6 | — | 允许 Claude 在推理中调用独立模型实例。涉及 server-side tool 的通用处理，可能被纳入 SDK 层支持 |
| [#9016](https://github.com/openclaw/openclaw/issues/9016) | Expose OpenRouter usage cost to agent runtime | 7 | — | 用户希望获得每消息成本数据以做预算控制，属于运营/可观测性需求，`needs-product-decision` |
| [#42276](https://github.com/openclaw/openclaw/issues/42276) | Reasoning stream (overwrite lines like OpenAI/Grok) | 6 | — | 用户希望 TUI 中呈现"思考过程"流式输出，与 `reason` 命令的覆盖行体验有关 |
| [#116470](https://github.com/openclaw/openclaw/issues/116470) | Runtime agent registry from config file + debug command | 5 | — | 多代理运维需求，希望从 CLI 查看每个 agent 的 handle、capability、role、heartbeat 等字段 |

### 路线图研判

- **MCP 工具捆绑**（#114154）需求强烈：工具通过策略检查但 agent 从不调用，这是 MCP 集成中"信号与噪声"问题的典型体现，需要更智能的工具发现机制。
- **成本可观测性**（#9016、#56781）是高频诉求：用户不仅需要消息级成本追踪，还希望 compaction/LCM 具备模型 fallback 链，避免因主模型不可用导致会话状态无限膨胀。
- **记忆系统**（#60572、#114612、#114913）是当前最大演进方向：从多槽位架构、SQLite 无限增长到 embedding 超时 fallback，多个 issue 指向记忆子系统是下一阶段的重点优化对象。
- **安装策略安全警告**的两个大型 PR（#116489、#120900）已合并，标志着 OpenClaw 正在向**企业级安全合规**方向迈进，预计将成为 v2026.8.1 正式版的核心亮点之一。


## 7. 用户反馈摘要

### 满意点
- **Security 改进获认可**：安装策略警告确认流程在 CLI 与 Web UI 双端落地，社区反馈积极（PR #116489 与 #120900 均标记 `ready for maintainer look`），用户对透明化安装流程表示认可。
- **Discord 投递修复迅速**：PR #126250 在[](https://github.com/openclaw/openclaw/pull/126250)报告后 1 天内即被合并，社区对修复响应速度表示肯定。
- **vLLM 兼容性修复获好评**：[](https://github.com/openclaw/openclaw/pull/126424) fix(gateway) 为跨通道会话保持提供了更可靠的实现，多代理运维场景用户反馈积极。

### 不满意点
- **P0 问题修复周期过长**：`#108435`（网关启动崩溃）与 `#38327`（Gemini 3.1 兼容性）等 P0/P1 问题存续超过一个月，用户多次在评论区催促。一位用户在 #108435 中表示："This is blocking our entire team, we cannot use any OpenAI-compatible endpoint until this is fixed."
- **子代理结果静默丢失**（#44925）的 26 条评论中，多位用户反馈"花了几个小时跑的子代理任务，结果什么都没剩下"，这是影响**用户信任感**的最严重问题。
- **文件工具路径转义 Bug**（#119270）被用户描述为"silent data corruption"，一位用户在评论区写道："It literally deleted the wrong file without any error. This should never happen in a tool that claims to be safe."
- **记忆系统长期未改进**：#16670（onboarding 缺少记忆配置）自 2 月开放至今 6 个月，社区认为记忆是 OpenClaw "最令人兴奋但其实最脆弱"的部分。

### 典型使用场景
- **Telegram/Matrix 群聊中的多代理编排**是主力场景（#44925、#114211、#114154）
- **本地小模型（Ollama）+ 私密数据**是显著细分场景（#120563、#43374、#120449）
- **Docker/容器化部署**中的 PID 复用导致锁不可释放（#114234）、重启循环（#86612）等基础设施问题值得关注


## 8. 待处理积压

### 长时间未解决的高严重度 Issue（按存续时间排序）

| Issue | 标题 | 创建时间 | 存续 | 严重度 | 备注 |
|-------|------|---------|------|--------|------|
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | Persistent provider cooldown blocks users for hours after billing recovery | 2026-04-24 | **118 天** | P0, `ux-release-blocker` | 用户充值后仍被 `disabledUntil` 文件锁定时长不定；`stale` 标记已打 |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | Write tool lacks append mode — cron sessions destroy shared files | 2026-03-08 | **165 天** | P1, `diamond lobster` | 数据丢失；`needs-product-decision` 已挂 5 个月 |
| [#16670](https://github.com/openclaw/openclaw/issues/16670) | Onboarding Wizard should include Memory/Embedding setup | 2026-02-15 | **187 天** | P2 | 新用户首次体验的关键缺口 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost | 2026-03-13 | **160 天** | P1, `diamond lobster` | 今日评论数最高（26），社区持续施压 |
| [#56217](https://github.com/openclaw/openclaw/issues/56217) | Secret provider crash-loop exhausts 1Password rate limits | 2026-03-28 | **145 天** | P1 | 基础设施可靠性 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | Gemini 3.1 "Cannot convert undefined or null to object" | 2026-03-06 | **167 天** | P1 | 👍 3，社区关注度高 |

### 长期未合并的 PR

- [](https://github.com/openclaw/openclaw/pull/97135) **fix(auto-reply): hide recovered failed tool progress** — 创建于 2026-06-27，已存续 **54 天**，`needs proof` 状态。
- [](https://github.com/openclaw/openclaw/pull/117528) **fix(cli): honor inherited tasks options** — 创建于 2026-08-01，已 19 天，`waiting on author`。

### 维护建议

1. **P0 数据损坏类问题**（#123327、#119270、#117742、#94939）应作为最高优先级处理。此类问题每多存续一天，就可能造成更多用户数据丢失，且会侵蚀社区对项目的信任。
2. **`needs-product-decision` 的 Issue 积压严重**：列表中出现 8 次该标签。建议 maintainer 每周固定时间批量审阅。
3. **ClawSweeper 自动生成的 PR**（#120143、#119367 等）已开始批量出现，需关注其质量与人工 review 的负载均衡。
4. **`#70903` 已打 `stale` 标记但仍是 P0**，建议明确告知用户处理计划或关闭原因，避免长期悬置。

---

*本报告由 AI 生成，数据截至 2026-08-20。*

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告

**报告日期**: 2026-08-20 | **数据窗口**: 2026-08-19 ~ 2026-08-20


## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**密集的功能拓展与稳定性加固并行期**。头部项目（OpenClaw）24小时 Issue/PR 更新双双触顶 500 条，社区规模与维护压力同步攀升；腰部项目（NanoBot、Hermes Agent、IronClaw）则通过高频修复快速迭代，将稳定性作为首要目标。共同趋势是从"功能可用"向"企业级可靠"过渡——安全加固（安装策略警告、OAuth 凭据持久化、未认证访问漏洞修复）与数据完整性（会话持久化、记忆游标、WAL 损坏）成为多项目同步攻坚的核心战场。与此同时，以 OpenClaw 的 ClawSweeper 和 ZeroClaw 的 QPQAT 为代表的 AI 辅助维护机制开始深度介入项目治理，标志着生态正探索"AI 维护 AI"的新范式。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 | 阶段判断 |
|------|-----------|--------|-----------|---------|----------|---------|
| **OpenClaw** | 500（触顶） | 500（触顶） | 78 | 无（beta.2 验证中） | ⚠️ 活跃但积压严重，P0 数据丢失悬而未决 | 密集迭代/稳定收尾 |
| **NanoBot** | 4 新开 | 23 更新 | 8 | 无 | 🟢 健康，响应快（OAuth 当日双 PR） | 活跃迭代 |
| **Hermes Agent** | 41 活跃 | 45 待合并 | 5 | 无 | ⚠️ 高频修复，但更新机制破坏安装引信任危机 | 紧急修复期 |
| **PicoClaw** | 1 | 5 | 2 | 无 | 🟢 稳定，但 PR 审阅积压（2 条 stale） | 稳步推进 |
| **NanoClaw** | 3 新开 | 34 更新 | 25 | 无 | 🟢 快速迭代，功能扩展活跃 | 功能拓展期 |
| **NullClaw** | 0 | 1 | 0 | 无 | 🟢 平稳，低活跃 | 维护期 |
| **IronClaw** | 15 | 38 | 18 | ✅ v1.3.0 | 🟢 健康，v1.4.0 两大 Epic 推进中 | 功能扩展期 |
| **LobsterAI** | 0 新开（6 遗留 stale） | 8 | 8 | 无（4个月未发版） | 🔴 低活跃，4 月 Bug 未修复 | 维护整理期 |
| **TinyClaw** | — | — | — | — | ⚪ 无活动 | 休眠 |
| **Moltis** | 3（全关闭） | 9 | 4 | ✅ 20260818.10 | 🟢 健康，闭环速度优秀 | 快速修复期 |
| **CoPaw** | 50（46 关闭） | 46 | 16 | 无 | 🟢 活跃，批量清理历史债务 | 清理+迭代期 |
| **ZeptoClaw** | — | — | — | — | ⚪ 无活动 | 休眠 |
| **ZeroClaw** | 43 | 50 | 2 | 无 | 🟢 高活跃，但合并率低（4%），审阅或成瓶颈 | 架构演进期 |


## 3. OpenClaw 在生态中的定位

**社区规模维度**：OpenClaw 以单日 500 条 Issue + 500 条 PR 更新的量级，领先 NanoBot（27）约 37 倍，领先 IronClaw（53）约 19 倍。其 Issue 关闭率（6.8%）与 PR 合并率（15.6%）偏低，反映的是大规模项目常见的治理挑战而非项目停滞。

**技术路线特征**：
- **多模态渠道中枢**：Telegram/Discord/Matrix/Slack 全覆盖，且在多渠道投递一致性（Discord 轮询修复 #126250）与跨通道会话保持上持续投入；
- **企业级安全合规**：安装策略警告确认流程贯通 CLI+Web UI（#116489/#120900），供应链攻击防线已属生态最前沿；
- **AI 辅助治理**：ClawSweeper 自动化机器人已深度介入 Issue 分类与 PR 生成，是生态中唯一大规模实践 AI 维护工作流的项目。

**相对短板**：P0 数据丢失问题（#123327 WAL 覆盖、#119270 文件路径转义）长期悬而未决，在 NanoBot 和 IronClaw 均无同级别数据完整性事故的对比下，OpenClaw 在底层存储引擎可靠性维度受到了更多质疑。但其"规模最大、迭代最快、生态最完整"的定位短期内难以被撼动。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **记忆/会话系统可靠性** | OpenClaw（WAL 损坏、子代理静默丢失）、NanoBot（Dream 游标卡死 #5441、会话覆盖 #5271）、PicoClaw（routed-agent 上下文丢失 #3316）、ZeroClaw（Runtime 会话所有权 RFC #9487） | 从单一 SQLite 走向多槽位/持久化/恢复机制；游标推进与错误处理需保证幂等 |
| **上下文压缩与成本控制** | OpenClaw（compaction 推理级别调整 #126421）、NanoBot（token 统计触发合并且 #5403）、CoPaw（自动压缩不触发 #6624） | 压缩触发需基于 API 实际 token 用量而非估算；需模型 fallback 链避免主模型失效时会话膨胀 |
| **安装/更新机制安全性** | Hermes Agent（`hermes update` 破坏安装 #83529/#83846/#90159）、NanoClaw（Node 26 兼容 #3359）、Moltis（OAuth 容器权限 #5444） | 更新需保证幂等、回滚能力和依赖锁定；安装脚本需支持 headless/容器环境；Node 等运行时需上限检查 |
| **安全加固** | OpenClaw（安装策略警告）、Moltis（未认证 vault 接口 #1216）、NanoClaw（凭据 fail-closed #3339）、ZeroClaw（凭据日志泄露 #9976） | 供应链攻击防御、凭据保护、权限边界收紧是跨项目共同优先级 |
| **代理可靠性增强** | OpenClaw（子代理超时静默丢失 #44925）、Hermes Agent（路由参数降级 #74295）、ZeroClaw（SOP 引擎时序错误 #10066） | 子代理失败需重试/通知/自动恢复；输出截断需用户可见；状态转换需严格时序保证 |
| **本地模型/多 Provider 支持** | OpenClaw（vLLM 兼容修复）、CoPaw（本地显存讨论 #2776）、NanoClaw（Node 版本适配）、IronClaw（本地 MCP 传输通道 #5998） | 本地小模型（Ollama/vLLM）与专有 API 的兼容性适配；OpenAI 兼容端点是生态融合的关键路径 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构差异 |
|------|---------|---------|------------|
| **OpenClaw** | 全渠道消息中台 + 代理可靠性 + 企业安全合规 | 重度用户、团队协作、企业部署 | 插件化技能体系 + ClawSweeper AI 治理 + 多通道统一投递管线 |
| **NanoBot** | 对话式 AI + WebUI 优先 | 个人开发者、Docker 自部署者 | WebUI 交互体验（对话轮次可观测性）+ TUI 可用性打磨 |
| **Hermes Agent** | 桌面端 + 群聊 Bot Mode + 网关路由 | 桌面优先的个人用户、远程开发 | Electron 桌面端 + headless 网关 + Copilot 路由深度集成 |
| **PicoClaw** | 轻量级 CLI + Telegram | 命令行重度用户、轻量自部署 | 极简部署、Shell 补全优先、Telegram 体验迭代 |
| **NanoClaw** | 多渠道（Slack/Telegram）+ 安装体验 | 中小团队、快速上手用户 | `bash nanoclaw.sh` 一键安装 + Slack agents 功能拆分 |
| **IronClaw** | 云 IDE 形态 + 多租户沙箱 + 自动化评估 | 团队协作、平台型部署 | Docker Exec 持久化沙箱（40ms 容器复用）+ 证据驱动式自动化评估 |
| **Moltis** | 多后端（Apple Container/OpenAI 兼容）| macOS 用户、跨平台部署 | Apple Container 原生集成 + 路由策略精细控制 |
| **CoPaw** | 本地模型 + 多智能体协作 | 本地模型爱好者、自动化场景 | Qwen 系列本地模型绑定 + AgentScope 框架集成 + QPQAT 自动化 QA agent |
| **ZeroClaw** | 架构探索 + WASM 插件 + Rust 重写 | 技术尝鲜者、架构关注者 | WASM 插件系统 + Rust anti-slop 治理 + RFC 驱动演进 |

**核心差异维度**：部署形态（云端服务 vs 本地 CLI vs 桌面应用）、渠道覆盖（全渠道 vs 单渠道深耕）、多代理能力（编排 vs 单代理）、底层语言（Rust/Go/TS/Python）以及 AI 治理深度。


## 6. 社区热度与成熟度

**第一梯队——快速迭代期（Issue/PR 日更新 > 40）**：
- **OpenClaw**：生态绝对核心，规模最大、迭代最快，但 P0 积压与数据丢失风险并存
- **ZeroClaw**：架构演进活跃，但合并率仅 4%，审阅瓶颈可能成为发展阻力
- **CoPaw**：批量清理历史债务（46 个 Issue 关闭），正处于"还账+拓展"并行阶段
- **Hermes Agent**：高频修复但更新机制破坏安装的信任危机需优先解决

**第二梯队——质量巩固期（日更新 15-40）**：
- **NanoBot**：响应迅速（OAuth 当日双 PR），社区参与度高，记忆/会话子系统是当前主战场
- **IronClaw**：v1.3.0 稳定版发布，v1.4.0 两大 Epic 清晰推进，治理规范
- **NanoClaw**：快速功能拓展（Slack 解耦、Telegram 群连接），安装体验短板需补强
- **Moltis**：修复闭环效率高，Apple Container 生态定价明确

**第三梯队——维护/休眠期（日更新 < 10）**：
- **PicoClaw**：稳步但偏慢，PR 审阅积压是主要风险
- **LobsterAI**：4 个月无发版、6 个遗留 Bug 被标记 stale，有沉寂倾向
- **NullClaw**：低活跃，仅提交 1 条 README 修复 PR
- **TinyClaw / ZeptoClaw**：24 小时内零活动，进入休眠


## 7. 值得关注的趋势信号

**信号一：更新机制正在成为信任杀手**。Hermes Agent 的 `hermes update` 三次独立报告破坏安装（#83529、#83846、#90159），且依赖锁定被覆写（mcp 2.0.0）。对 AI 助手类工具而言，更新安全和升级路径平滑已成为用户留存的生命线，建议所有项目将更新机制纳入最高优先级回归测试。

**信号二：AI 辅助维护（AI-for-AI）从概念走向实践**。OpenClaw 的 ClawSweeper 已批量生成 PR（#120143、#119367），CoPaw 引入 QPQAT 自动化 QA agent 提交修复（#6938、#6936），ZeroClaw 用 Rust anti-slop 治理标记 307 个代码候选点。这标志着开源维护模式正在发生结构性变化——AI 不只是被构建的对象，也在成为构建者。

**信号三：文件操作安全护栏成为硬需求**。OpenClaw 的 #119270（写入并删除错误文件）、CoPaw 的 #2884（用户个人文件被清空，27 评论）共同指向同一个核心诉求：AI 的文件工具必须有回滚、确认和权限边界。建议构建者将所有文件工具默认置于"dry-run + 显式确认"模式。

**信号四：成本可观测性从可选变为刚需**。OpenClaw（#9016）、NanoBot（#5420）、CoPaw（#2301）的用户均提出消息级成本追踪、provider 用量汇总乃至 fallback 链的需求。在多模型并存成为常态的当下，可观测性与成本控制正从运营需求升格为产品核心体验。

**信号五：Telegram/WhatsApp 等 IM 的交互体验升级是共性优先级**。PicoClaw（交互式命令 UX #3341）、NanoClaw（群组连接选择器 #3351）、Moltis（回复视为提及 #1217、推送名称可配置 #1218）均在打磨 IM 端的"对话感"——从功能可用向体验原生演进。

**对开发者的参考价值**：选择技术栈时，优先关注具备以下特征的项目：(1) 有数据完整性保障机制（WAL 修复、幂等游标）；(2) 更新/安装流程有回滚保护；(3) 已内置成本可观测性与模型 fallback；(4) 文件工具具备安全护栏。生态正处于从"功能竞赛"到"可靠性竞赛"的转折点，稳定性将是下一阶段的核心竞争力。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-20

> 项目健康度评级：🟢 活跃（PR 合并率高，关注点集中于稳定性与基础设施优化）


## 1. 今日速览

NanoBot 在过去 24 小时内保持高度活跃，共产生 **4 条新 Issue** 与 **23 条 PR 更新**（其中有 8 条已合并/关闭）。当前最新版本 Release 数与昨日持平（无新发布），但值得关注的是：**PR 队列中积累了一批高优先级（p0/p1）的稳定性修复**，集中在会话持久化、内存 token 统计与工具错误恢复等领域。与此同时，Docker 环境下 OAuth 登录失败、遗留 `socks://` 代理协议支持等问题被社区频繁提及，维护者已通过 PR #5445/#5446/#5439 快速响应。总体而言，项目处于**密集的缺陷修复与基础设施加固阶段**，社区参与度较高。


## 2. 版本发布

过去 24 小时内无新版本发布。


## 3. 项目进展

今日合并/关闭了 **8 条 PR**，按重要程度梳理如下：

| PR | 标题 | 类型 | 说明 |
|----|------|------|------|
| [#5443](https://github.com/HKUDS/nanobot/pull/5443) | `fix(tui): expose /exit in command menu` | 可用性修复 | 将 TUI 既有的 `/exit` 命令暴露到斜杠菜单中，改善 CLI 用户体验 |
| [#5440](https://github.com/HKUDS/nanobot/pull/5440) | `perf(memory): reuse conversation prefix for local compaction` | 性能优化 | 本地上下文压缩（compaction）复用模型常规前缀，避免重复构造 system/history 数据，降低 token 开销 |
| [#5438](https://github.com/HKUDS/nanobot/pull/5438) | `fix(webui): return promptly after Ctrl-C` | 退出流程修复 | 解决 WebUI 前台退出时客户端租约未及时释放、导致进程挂起的问题 |
| [#5341](https://github.com/HKUDS/nanobot/pull/5341) | `fix(skills): make weather workflow Windows-safe` | 跨平台修复 | 消除 bare `curl` 在 PowerShell 中被错误解析为 `Invoke-WebRequest` 别名的问题 |
| [#4527](https://github.com/HKUDS/nanobot/pull/4527) | `feat: add ask_clarification tool` | 新功能（长期 PR 关闭） | 新增内建 `ask_clarification` 工具，支持 Agent 在不确定时主动向用户提问，并保留澄清上下文 |
| [#4282](https://github.com/HKUDS/nanobot/pull/4282) | `feat: add file management features to settings view` | 新功能（长期 PR 关闭） | WebUI 设置页增加文件浏览/管理能力，解决 Agent 生成文件需手动 SSH 到宿主机操作的痛点 |

**合并速度评估**：较重要的 `ask_clarification` 和文件管理功能 PR 均为数周甚至数月前开启的 PR，今日集中关闭；这表明维护者正在**清理长期积压的能力型 PR**。

**项目整体推进**：WebUI 退出流程、TUI 命令可见性、Windows 兼容性等细节问题得到及时修正，同时为后续 OAuth 持久化、`nano_timer` 工具、follow-up 建议等更大功能的合入铺平了道路。


## 4. 社区热点

**热点 #1：OAuth 在 Docker 中的登录故障（Issue #5444 + PR #5445/#5446）**

- [Issue #5444](https://github.com/HKUDS/nanobot/issues/5444)：用户在 Docker 容器中执行 `nanobot provider login openai`，授权码交换后因 OAuth 客户端数据写入 `platformdirs` 默认路径失败（`PermissionError`），导致整个登录流程崩溃。
- 社区迅速响应：两条修复 PR 同日提交——[PR #5445](https://github.com/HKUDS/nanobot/pull/5445) 将 XDG 应用数据重定向至 Nanobot 实例目录（容器环境）；[PR #5446](https://github.com/HKUDS/nanobot/pull/5446) 将 OpenAI Codex OAuth token 存储路由到 nanobot 受管数据目录。

**分析**：核心痛点是容器化部署下权限模型与 OAuth CLI 工具默认行为的冲突。社区诉求不仅是修复登录，更希望 OAuth 凭据能够在容器重建后持久保留。维护者通过双重 PR（Docker 层 + CLI 层）并行修复，响应速度快且方案互相补充。

**热点 #2：遗留 `socks://` 代理协议（Issue #5425 + PR #5439）**

- [Issue #5425](https://github.com/HKUDS/nanobot/issues/5425)：自定义 OpenAI 兼容 provider 配置了 `socks://` 代理，请求在到达 provider 前即失败。
- [PR #5439](https://github.com/HKUDS/nanobot/pull/5439) 选择只支持 HTTPX 认可的标准 `socks5://` 协议，明确不支持 `socks://` 别名。

**分析**：这是一个**兼容性取舍**的典型案例——维护者拒绝了非标准别名，转而推动用户迁移到标准协议。短期内可能引发部分用户不满，但长期有利于降低维护成本。


## 5. Bug 与稳定性

按严重程度排列今日报告的 Bug：

| 严重级别 | Issue / PR | 问题描述 | 修复状态 |
|----------|------------|----------|----------|
| **高** | [#5441](https://github.com/HKUDS/nanobot/issues/5441) | Dream 运行中工具错误被恢复后，仍被判定为“未完成”，`memory/.dream_cursor` 不推进，导致同一批历史被后续每次 Dream 运行重复处理（重复编辑） | ✅ 已有对应修复 PR：[#5442](https://github.com/HKUDS/nanobot/pull/5442) |
| **中** | [#5444](https://github.com/HKUDS/nanobot/issues/5444) | Docker 中 OAuth 登录失败：授权码交换后 token 写入无权限目录（`PermissionError`） | ✅ 已有修复 PR：[#5445](https://github.com/HKUDS/nanobot/pull/5445)、[#5446](https://github.com/HKUDS/nanobot/pull/5446) |
| **中** | [#5425](https://github.com/HKUDS/nanobot/issues/5425) | 自定义 provider 配置 `socks://` 代理时请求在到达 provider 前即失败 | ✅ 已有修复 PR：[#5439](https://github.com/HKUDS/nanobot/pull/5439)（仅支持标准 `socks5://`） |
| **低** | （PR 待合并）[#5271](https://github.com/HKUDS/nanobot/pull/5271) | 后台任务保存可能覆盖 `/new` 或生命周期替换后的会话数据（p0） | ⚠️ PR 已提交 14 天，尚未合并 |

**特别关注**：[#5441](https://github.com/HKUDS/nanobot/issues/5441) 描述的问题对记忆子系统的完整性影响较大——即使工具错误已被模型纠正，只要运行期间出现过任何工具报错，整个运行就会被判失败，且不会推进游标，导致后续所有 Dream 运行重复处理同一批历史数据，产生**重复编辑**。建议维护者优先合入 [#5442](https://github.com/HKUDS/nanobot/pull/5442) 的修复。


## 6. 功能请求与路线图信号

| 功能请求 | 来源 | 分析 |
|----------|------|------|
| **付费 MCP 安全扫描集成**（ScanPay x402，按次付费） | [Issue #5447](https://github.com/HKUDS/nanobot/issues/5447) | 提出者运营 Solana 上的 x402 微支付安全扫描服务，希望将 NanoBot 与其集成。属于商业化外部服务接入，**纳入路线图的可能性较低**，但展示了社区对 Agent 变现模式的探索 |
| **手动触发技能**（`disable-model-invocation: true`） | [PR #5405](https://github.com/HKUDS/nanobot/pull/5405) | 允许技能仅由用户手动触发、不被模型自动调用，适用于部署/发布等副作用敏感场景。该 PR 状态为 `conflict`，需解决冲突后合入。**纳入下一版本概率较高** |
| **WebUI 对话轮次可观测性** | [PR #5420](https://github.com/HKUDS/nanobot/pull/5420) | 将每次用户交互整合为一个应答面，保留推理、工具调用、文件编辑等中间活动记录，并汇总 provider 用量。该 PR 已活跃 2 天，评论数较多，**值得关注** |
| **WebUI 后续追问建议** | [PR #5408](https://github.com/HKUDS/nanobot/pull/5408) | 采用 DeerFlow 交互模式，在成功回合后生成临时的对话范围后续建议。已开启 3 天，处于讨论阶段 |

**路线图信号判断**：当前 PR 队列中以 **bug fix（约 60%）** 为主，功能性 PR 集中在 WebUI 体验改进（可观测性 + follow-up 建议）与技能/工具扩展（手动触发、`nano_timer`）。结合合并速度，预计下一版本将包含 **nano_timer 核心工具** 与 **手动技能调用模式**。


## 7. 用户反馈摘要

从今日 Issues 与 PR 评论中提炼的关键用户声音：

- **Docker 部署权限困扰**（Issue #5444）："`PermissionError: [Errno 13] Permission denied: '/home/...'`"——容器内非 root 用户无权写入 OAuth 默认数据目录。这并非个例，两条紧急修复 PR 同日提交，说明 **容器化部署是 NanoBot 的主流使用方式之一**，权限模型的健壮性需要进一步加强。
- **代理配置兼容性**（Issue #5425）：用户习惯使用 `socks://` 别名（广泛存在于各种文档与工具中），HTTPX 不识别该协议导致请求失败。用户希望"配置了就能用"，而不是查阅协议规范。
- **Dream 记忆游标卡死**（Issue #5441）："The same history batch is then reprocessed by every subsequent Dream run... duplicating edits"——记忆系统重复处理同一批数据可能会导致对话历史中出现重复内容，**影响模型对上下文的判断**。
- **OAuth 持久化需求**（PR #5445 评论）：社区不仅要求修复权限问题，还希望"container-created OAuth credentials persist across replacement"——容器重建后无需重新登录。这反映了**生产环境中容器频繁重建的现实**。


## 8. 待处理积压

下列 PR 长期未合并或存在冲突，建议维护者优先关注：

| PR | 标题 | 优先级 | 已开启时长 | 状态 |
|----|------|--------|------------|------|
| [#5271](https://github.com/HKUDS/nanobot/pull/5271) | `fix(session): prevent stale background task saves from overwriting session data` | **P0** | 14 天 | `conflict`，需解决冲突后合入。该问题直接影响 `/new` 后的会话数据完整性 |
| [#4853](https://github.com/HKUDS/nanobot/pull/4853) | `feat(tools): add nano_timer core tool` | P1 | **43 天** | `conflict`。功能简单无依赖，可快速解决冲突 |
| [#5403](https://github.com/HKUDS/nanobot/pull/5403) | `fix(memory): use API-reported prompt tokens to trigger consolidation` | P1 | 4 天 | `conflict`，修复 #5402 token 估算不准导致内存合并不触发的问题，建议优先处理 |
| [#5379](https://github.com/HKUDS/nanobot/pull/5379) | `fix(memory): preserve full consolidation input` | P2 | 7 天 | `conflict` |

**特别提示**：[#5271](https://github.com/HKUDS/nanobot/pull/5271) 标记为 **P0** 且涉及会话数据一致性，开启 14 天仍未合入。考虑到今日社区对记忆/会话相关问题的关注度（#5441/#5442），建议维护者**本周内优先解决该 PR 的冲突**。另外两条内存相关 PR（#5403/#5379）与 #5441 的问题存在关联，合并后可显著改善记忆子系统的可靠性。

---

> **一句话总结**：NanoBot 处于活跃迭代期，社区高度参与、维护者响应迅速（Docker OAuth 问题当日即收到双 PR 修复）；主要风险集中在会话与记忆子系统的稳定性上，建议优先清理由 #5271 与 #5441 构成的**记忆/会话可靠性问题组合**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

好的，作为一名 AI 智能体与个人 AI 助手领域开源项目分析师，以下是基于 Hermes Agent 仓库 2026-08-20 数据生成的项目动态日报。

---

# Hermes Agent 项目动态日报 — 2026-08-20

## 1. 今日速览

Hermes Agent 项目在过去 24 小时内保持极高的社区活跃度。Issue 与 PR 的更新量均达到 50 条，其中新建/活跃 Issue 41 条，待合并 PR 45 条，显示出项目正处于密集的开发与迭代周期。**核心焦点集中在稳定性与可靠性上**：Windows 平台的严重 Bug（蓝屏、安装器缺陷）与更新机制问题（`hermes update` 破坏安装）成为最突出的风险点，同时社区对 Bot Mode（群聊）功能的桌面端体验修复提交了多个 PR，也提出了将其扩展到 Web 端的架构性需求。整体来看，项目处于快速修复、功能增强的活跃期，但亟待解决高频的回归问题以巩固用户信任。

## 2. 版本发布

今日无新版本发布。项目处于 v0.20.0 (2026.8.3) 之后的高频修复阶段，多个 P1/P2 级别的 Bug 均有对应的修复 PR 提交，预计近期将有一个补丁版本释出。

## 3. 项目进展

今日合并/关闭了 5 个 PR，主要集中在修复桌面端 Bot Chat 的交互稳定性问题，并结束了两个相关 Bug 的追踪:

- **[Desktop] 修复 Bot Chat 唤醒与工作区问题**：合并了 `#90405`、`#90203`、`#89638`、`#89832` 四个紧密相关的 PR，协同解决了从 Roster 打开 Bot 聊天可能导致的三种不同故障：挂起（hang）、界面空白（stranding）以及 Sessions 列表被清空的问题。这标志着桌面端核心功能的稳定性得到显著补强。
- **[Bug 关闭] 路由 `reasoning_effort` 参数问题**：`#74295` 与 `#70058` 被关闭，前者修复了 Copilot 路由对 `ultra` 级别的错误降级，后者修复了 GLM API 拒绝 `ultra` 参数导致的静默降级问题。这两个问题说明模型能力选择与提供商 API 的兼容性层正在不断完善。

**关键进展**：今日最显著的项目推进在于 **4 个不同贡献者针对同一功能（Bot Chat）的独立修复被合并**，这体现了项目对复杂交互问题的高度关注，但也侧面暴露了该功能在架构上存在一定的脆弱性。

## 4. 社区热点

今日讨论热度最高的 Issue 具有明显的「元问题」与「自动化」特征:

- **[#66616] Skills index is stale or degraded** (评论: 60, 更新: 2026-08-20)
  🔗 [NousResearch/hermes-agent Issue #66616](https://github.com/NousResearch/hermes-agent/issues/66616)
  这是一个由机器人（`nousbot-eng`）自动报告的运维问题，指出了 Skills 索引构建延迟 (29.8h > 26h limit) 导致的降级。虽然评论量高，但多由自动化探针触发。这反映出项目的基础设施（文档、索引）正在经受规模化的考验，且社区在持续关注索引新鲜度对技能发现的影响。

- **[#84834] Webhook Feature Package — graph-gated repair (meta-issue)** (评论: 19, 更新: 2026-08-19)
  🔗 [NousResearch/hermes-agent Issue #84834](https://github.com/NousResearch/hermes-agent/issues/84834)
  由 `andrexibiza` 发起的功能包追踪器，计划对整个 Webhook 面（入口、执行、投递、配置、UI）进行系统性的修复与增强。这并非单个 Bug 报告，而是**对系统功能的全面规划与重构**，结合另一条高热度 Meta-issue `#79564`（Discord 功能对齐），可以看出社区中的关键贡献者正在推动项目向更结构化、契约化的方向演进。

**背后诉求**：社区热点从单点故障转移到大型功能面的结构性优化，既反映了项目功能面广泛（Webhook, Discord, Skills），也暗示用户对系统整体一致性和可靠性的要求正在提高。

## 5. Bug 与稳定性

今日报告了多个严重的稳定性问题，按严重程度排列如下:

### 🔴 严重 (P1)
- **[#89614] Hermes kills `svchost.exe` via stale-PID `taskkill` → repeated 0xEF blue screens** (Windows)
  🔗 [NousResearch/hermes-agent Issue #89614](https://github.com/NousResearch/hermes-agent/issues/89614)
  通过过期 PID 强制杀掉系统关键进程，导致 Windows 蓝屏重启。这是严重的系统级稳定性问题，影响极大。**当前无直接关联的公开修复 PR**。
- **[#83846] ZIP fallback deletes the built desktop app and never rebuilds it** (Windows)
  🔗 [NousResearch/hermes-agent Issue #83846](https://github.com/NousResearch/hermes-agent/issues/83846)
  更新机制（ZIP 回退）会静默删除桌面应用且不重建，导致应用“消失”。 **当前无直接关联的公开修复 PR**。
- **[#83529] `hermes update` - destroys hermes** (Debian)
  🔗 [NousResearch/hermes-agent Issue #83529](https://github.com/NousResearch/hermes-agent/issues/83529)
  更新命令会灾难性地破坏安装，导致无法使用。 **当前无直接关联的公开修复 PR**。

### 🟠 重要 (P2)
- **[#90159] `hermes update` installs `mcp` 2.0.0 over the declared pin, silently disabling every HTTP/SSE MCP server**
  🔗 [NousResearch/hermes-agent Issue #90159](https://github.com/NousResearch/hermes-agent/issues/90159)
  更新机制覆写了依赖锁定（`mcp==1.28.1`），导致 MCP 功能全面失效，且状态接口仍报告健康，具有隐蔽性。
- **[#90299] False-positive "TERMINAL_CWD found in .env" deprecation warning on every startup**
  🔗 [NousResearch/hermes-agent Issue #90299](https://github.com/NousResearch/hermes-agent/issues/90299)
  CLI 每次启动都会误报废弃配置警告，造成用户困扰。
- **[#84064] `hermes config set/unset` breaks on provider keys containing a literal dot**
  🔗 [NousResearch/hermes-agent Issue #84064](https://github.com/NousResearch/hermes-agent/issues/84064)
  配置管理命令无法处理含点号的 Provider 名称（例如版本号），会损坏配置文件。
- **[#85605] Desktop Electron fails to connect to `hermes serve` headless backend — 404 on session token handshake**
  🔗 [NousResearch/hermes-agent Issue #85605](https://github.com/NousResearch/hermes-agent/issues/85605)
  桌面端与 Headless 后端的握手协议不兼容，导致远程连接失败。

### 🟡 一般 (P3) 与待复现
- 多个桌面端 UI 卡死或渲染异常问题: `#90229` (侧栏文件树卡在骨架状态), `#90365` (模型配置确认按钮缺失)。
- 大量 P2 问题标注 `needs-repro`，如 `#89497` (Bot 群聊报错且错误信息不准确), `#90134` (Windows 构建失败)。

**稳定性观察**：大量的 P1/P2 Bug 集中在 `hermes update` 机制与 Windows 平台路径上，这是目前最影响用户体验的隐患，需要维护者优先处理。

## 6. 功能请求与路线图信号

- **Bot Mode 群聊管理**：`#89995` 请求在 Web 仪表盘和网关中暴露 Bot Mode 群聊房间，改变其仅限桌面的现状。结合今日合并的多个桌面 Bot 修复 PR，该功能正在从「能用」走向「好用」，跨端支持是明确的下一步方向。
- **资源感知的执行配置**：`#90007` 提出了为低内存 Windows 用户增加资源感知型执行配置文件，自动协调上下文大小与本地/云端 Provider。
- **架构原则讨论**：`#90144` 提出了「证明范围必须等于变更范围 (Proof scope must equal mutation scope)」的架构原则，涉及多个缺陷类型的根因，获得 `needs-decision` 标签，可能影响未来的会话状态管理和上下文处理逻辑。

## 7. 用户反馈摘要

- **关于更新机制的挫折感**：从 `#83529` ("destroys hermes") 和 `#83846` (应用被删除) 等标题及描述中，可以明显感受到用户在更新后遭遇破坏性故障的强烈挫败感。用户对更新过程的安全性有很高期望，此类问题对信任损害极大。
- **对桌面端细微交互不满**：`#90365` 描述了确认对话框没有确认按钮，用户被卡死在流程中；`#90229` 描述了界面无限加载且刷新按钮不可用。这些反馈表明用户对桌面客户端的 UI/UX 细节质量要求很高，任何卡顿或误导性交互都会被迅速报告。
- **技术澄清需求**：`#90316` 用户指出，即使配置了远程为主，桌面端仍会启动本地回环 Agent，表述为无效（invalid）行为。这反映了用户对「远程模式」的纯净化期待。

## 8. 待处理积压

以下为长期未解决或处于停滞状态的高价值 Issue/PR，建议维护者关注:

- **[#79539] Windows: missing base interpreter routes recovery to `hermes-setup --update`, which cannot succeed — a new unrecoverable loop** (自 2026-08-05)
  🔗 [NousResearch/hermes-agent Issue #79539](https://github.com/NousResearch/hermes-agent/issues/79539)
  作为 `#58749` 的后续问题，旧的恢复路径被堵死后新的路径仍走不通，用户陷入无法恢复的循环。作为 P2 且距今已两周，需要重新评估恢复策略。
- **[#61441] fix(gateway): respect explicit Feishu enabled:false in config.yaml** (自 2026-07-09)
  🔗 [NousResearch/hermes-agent PR #61441](https://github.com/NousResearch/hermes-agent/pull/61441)
  一个待合并超过一个月的配置修复，解决环境变量覆盖用户显式配置的 Bug。评论为 undefined，似乎缺乏维护者关注。
- **[#39429] fix: preserve named custom provider request_overrides in gateway and /model switches** (自 2026-06-05)
  🔗 [NousResearch/hermes-agent PR #39429](https://github.com/NousResearch/hermes-agent/pull/39429)
  一个搁置两月有余的 PR，旨在修复自定义 Provider 配置（`extra_body`）在网关路由中丢失的问题。长时间未合并可能意味着设计决策未定或维护者忽略，建议跟进。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期：2026-08-20** | **数据窗口：2026-08-19 ~ 2026-08-20**


## 1. 今日速览

PicoClaw 项目过去24小时整体活动水平**中等**。Issue 侧仅有 1 条更新（关闭 1 条，无新开/活跃），核心关注点是 banner 输出破坏 shell 补全流程的回归问题（#1305），该问题今日正式关闭。PR 侧更新 5 条，其中 3 条待合并、2 条已合并/关闭，值得注意的是一个是 Telegram 交互体验增强（#3341）和模型默认回退链配置（#3200）被合并/关闭，同时有两条自 8 月初积压的 PR 被标记为 stale 仍在等待维护者响应。整体来看，**项目处于稳步推进状态，bug 修复闭环节奏良好，但 PR 审阅积压值得关注**。


## 2. 版本发布

过去 24 小时无新版本发布。上次 Release 信息暂无可用数据。


## 3. 项目进展

今日合并/关闭的 PR 中有两个值得关注：

- **[#3341 - feat(telegram): add interactive command UX and formatted ephemeral fallback](https://github.com/sipeed/picoclaw/pull/3341)（已关闭）**：这是一个功能型 PR，目标是将 Telegram 端 `/memory` 等命令的交互从 CLI 风格子命令语法改为更自然的交互式引导，并优化 `/help` 输出避免过度冗长。同时为结构化内容提供了格式化的临时消息回退机制。该 PR 从创建到关闭仅用 1 天，推进速度很快，说明 Telegram 命令交互体验将有明显改善。

- **[#3200 - feat(models): add configurable default fallback chain](https://github.com/sipeed/picoclaw/pull/3200)（已关闭，标记 stale）**：为 Web UI 引入可配置的模型默认回退链，用户可设置默认模型、添加回退模型、调整顺序并持久化到后端。该 PR 自 7 月 1 日创建，历时近 7 周后关闭。由于被标记为 stale，关闭原因可能是合并或超时关闭，具体需关注仓库记录。

- **待合并 PR 3 条**：#3329（webhook_host / webhook_port 无效配置警告）、#3316（routed-agent 上下文管理修复）、#3315（Telegram 私聊 topics 支持），均处于待审阅状态。


## 4. 社区热点

今日最受关注的当属 **[Issue #1305 - [BUG] new banner print to STDOUT, break completion flow](https://github.com/sipeed/picoclaw/issues/1305)**，产生 4 条评论，今日正式关闭。

该 issue 反映的是 `picoclaw completion zsh` 生成的补全脚本被新增加的 banner 输出污染了 STDOUT，导致补全脚本头部混入非 shell 语法内容，直接破坏用户的 shell 补全体验。该问题源自 PR #1008 引入的 banner 打印逻辑，属于典型的回归 bug。

值得关注的是，该 issue 从 2026 年 3 月 10 日创建到 8 月 19 日关闭，**生命周期超过 5 个月**，可能涉及较复杂的定位或协调过程。其关闭是否意味着 fix 已落地（而非仅关闭 issue 未修代码），值得进一步确认。


## 5. Bug 与稳定性

| 严重程度 | 问题 | 状态 | 修复 PR |
|---------|------|------|---------|
| 中 | **[#1305](https://github.com/sipeed/picoclaw/issues/1305) banner 输出污染 STDOUT，破坏补全脚本生成** | ✅ 已关闭 | 由 PR #1008 引入，修复情况待确认 |
| 待评估 | **[#3329](https://github.com/sipeed/picoclaw/pull/3329) line.webhook_host / webhook_port 配置无效但被静默接受** | 🔧 修复 PR 待合并 | PR #3329 本身 |
| 待评估 | **[#3316](https://github.com/sipeed/picoclaw/pull/3316) routed-agent 不遵守历史、摘要、压缩和 seahorse bootstrap 上下文管理** | 🔧 修复 PR 标记 stale | PR #3316 本身 |

**主要关注点**：#3316 描述的问题影响面较大——routed-agent 在特定 channel 中完全无法记忆上下文、自动压缩永远不触发，属于核心会话功能缺陷。该 PR 自 8 月 3 日创建后已被标记 stale 且超过 2 周未获响应，建议维护者优先处理。


## 6. 功能请求与路线图信号

- **Telegram 交互体验优化**（[#3341](https://github.com/sipeed/picoclaw/pull/3341)）：从 CLI 风格命令转向交互式 UX，代表着项目在 Telegram 端从"功能可用"向"体验打磨"阶段的转变，可能成为后续 Telegram 端迭代的方向。
- **模型默认回退链配置**（[#3200](https://github.com/sipeed/picoclaw/pull/3200)）：通过 Web UI 配置默认模型+回退链并持久化，是多模型策略的重要补充，符合当前 LLM 应用高可用性的普遍诉求。
- **Telegram 私聊 topics 支持**（[#3315](https://github.com/sipeed/picoclaw/pull/3315)）：解锁 Telegram 私聊场景下 forum mode 的完整体验，属于平台能力补齐型需求。

结合上述 PR，下一版本可能重点覆盖 **Telegram 体验升级 + 模型回退链管理** 两个方向。


## 7. 用户反馈摘要

基于 Issue #1305 的讨论（4 条评论，虽已关闭但可作为样本）：

- **用户场景**：开发者使用 `picoclaw completion zsh > _picoclaw` 生成补全脚本后，发现脚本被 banner 污染，标准 shell 工作流被破坏。
- **核心痛点**：CLI 工具输出必须严格遵守 stdout/stderr 约定，任何非结构化输出进入 stdout 都会直接破坏管道和脚本化使用方式——这是 CLI 工具用户的底线期待。
- **隐含反馈**：该问题从 3 月持续到 8 月才关闭，用户在等待周期上可能承受了较长的不便。建议维护团队在引入面向用户的输出变更时，加强 stdout/stderr 输出纪律的审查。

其余 4 个 PR 的评论区暂无公开反馈可提炼。


## 8. 待处理积压

以下条目停留时间较长或状态异常，建议维护者关注：

- **[PR #3316](https://github.com/sipeed/picoclaw/pull/3316)（stale，8/3 创建）routed-agent 上下文管理修复**：修复核心会话记忆缺陷，涉及功能面广，已 stale 但仍待合并，建议尽快审阅并明确处理计划。
- **[PR #3315](https://github.com/sipeed/picoclaw/pull/3315)（stale，8/3 创建）Telegram 私聊 topics 支持**：平台能力补强需求，已 stale，建议确认是否会在近期合入。
- **[Issue #1305](https://github.com/sipeed/picoclaw/issues/1305)（已关闭）**：建议在关闭时同步确认 fix 已发布或标注了预期修复版本，避免用户困惑于"关闭≠已修复"的状态模糊。

---

> **分析师注**：项目整体表现稳健，功能迭代与 bug 修复的节奏均衡；最大风险点是 PR 审阅响应时间（尤其 stale 标记的两条长周期 PR）。建议维护者针对 stale 条目逐一给出明确结论（合并/关闭/延后），降低社区贡献者的不确定性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报

**日期：2026-08-20** | **数据来源：github.com/qwibitai/nanoclaw**


## 1. 今日速览

过去 24 小时 NanoClaw 保持较高活跃度：共 3 条新 Issue 和 34 条 PR 更新，其中 25 条 PR 已合并或关闭，9 条待审。当日无新版本发布。核心团队（core-team）主导的 10+ 条 PR 密集合入，覆盖 Slack agents 功能拆分、Telegram 群组连接、provisioning 元数据等方向。值得关注的是，@glifocat 连续提交了 3 条与安装引导（setup）相关的 Issue，指向**非交互式安装场景下的稳定性短板**，而对应的修复 PR（#3360、#3249）已在同一天提交，响应非常及时。整体来看，项目处于**快速迭代、功能扩展活跃**的健康状态，但安装体验问题值得警惕。


## 2. 版本发布

**无新版本发布。**


## 3. 项目进展

今日合入/关闭的 25 条 PR 集中在以下几个方向：

### 3.1 Slack 频道体验重构（核心事件）

| PR | 标题 | 状态 |
|---|---|---|
| [#3357](https://github.com/nanocoai/nanoclaw/pull/3357) | `setup: --slack-agents 安装完整 Slack agents 功能` | 已合并 |
| [#3358](https://github.com/nanocoai/nanoclaw/pull/3358) | `slack: 拆分 payload — 基础适配器在 /add-slack，agents 功能在 /slack-agent-flow` | 已合并 |
| [#3342](https://github.com/nanocoai/nanoclaw/pull/3342) | `feat(slack): 拒绝 owner 不在场的频道邀请，而非升级为卡片` | 已合并 |
| [#3362](https://github.com/nanocoai/nanoclaw/pull/3362) | `fix: 校验 Slack agent flow 前置条件` | 待合并 |
| [#3361](https://github.com/nanocoai/nanoclaw/pull/3361) | `fix: 暴露 decline 通知覆写` | 待合并 |

这是今日最重大的架构调整：`bash nanoclaw.sh` 现在默认安装**基础 Slack 体验**（单 bot + DM/频道聊天），而 `bash nanoclaw.sh --slack-agents` 才安装完整 agents 功能（子 bot、a2a 房间、画布等）。同时修复了 Slack 频道邀请的权限边界——owner 不在场时直接拒绝而非升级为审批卡片。

### 3.2 安装与运行时兼容性

| PR | 标题 | 状态 |
|---|---|---|
| [#3360](https://github.com/nanocoai/nanoclaw/pull/3360) | `fix: 支持当前 Node 运行时`（better-sqlite3 11→13，最低 Node 20→22） | **待合并** |
| [#3249](https://github.com/nanocoai/nanoclaw/pull/3249) | `fix(setup): 处理超出支持范围的已装 Node` | 待合并 |
| [#3339](https://github.com/nanocoai/nanoclaw/pull/3339) | `fix(setup): 存储的登录凭据无法验证时 fail closed` | 已合并 |

### 3.3 新功能合入

| PR | 标题 | 状态 |
|---|---|---|
| [#3351](https://github.com/nanocoai/nanoclaw/pull/3351) | `feat(telegram): 添加已批准群组连接选择器`（`/connect_group` DM 命令） | 已合并 |
| [#3352](https://github.com/nanocoai/nanoclaw/pull/3352) | `docs(telegram): 文档化已批准群组连接流程` | 已合并 |
| [#3340](https://github.com/nanocoai/nanoclaw/pull/3340) | `fix(approvals): 在 pending_approvals 上记录投递实例` | 已合并 |
| [#3341](https://github.com/nanocoai/nanoclaw/pull/3341) | `fix(provisioning): 从凭据的 issuer 推导 Slack 服务` | 已合并 |
| [#3344](https://github.com/nanocoai/nanoclaw/pull/3344) | `feat(provisioning): app 创建时可选请求来源元数据` | 已合并 |
| [#3345](https://github.com/nanocoai/nanoclaw/pull/3345) | `feat(setup): Slack 服务请求转发可选客户端元数据` | 已合并 |

**整体评估**：Slack 基础体验与 agents 功能的解耦是今日最大架构进展，为后续独立演进奠定了基础。Telegram 群组连接功能的落地补齐了频道管理矩阵。安装可靠性方面有 3 条 PR 合入 + 2 条待合入，但仍有遗留问题（见 Bug 部分）。


## 4. 社区热点

今日无高评论量 Issue/PR（评论数普遍在 0-5 区间），但以下条目值得关注：

- **[PR #3025](https://github.com/nanocoai/nanoclaw/pull/3025)（已关闭）**：将 agent SDK 的 32000 output-token 上限提升到更高值。该 PR 自 7 月 12 日创建，历时一个多月后于今日关闭，涉及模型输出能力扩展，属长周期讨论。
- **[PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050)（待合并）**：将 Dial 加入频道选择器 + 向导。自 7 月 14 日创建至今仍待合并，已 37 天，与 Dial 适配器 PR #3041 形成功能对。
- **[PR #3041](https://github.com/nanocoai/nanoclaw/pull/3041)（待合并）**：Dial 频道适配器（SMS + AI 语音通话）。与 #3050 配套。

**诉求分析**：Dial 是新的短信/语音频道集成，持续待合并超过一个月，但配套 Issue #3353（见下）已暴露 Dial 适配器存在短信送达状态误报的问题——功能尚未合入、问题已浮现，可能指向适配器设计层面的系统性缺陷。


## 5. Bug 与稳定性

按严重程度排列：

### 高：Node 26 兼容性破坏

- **[Issue #3359](https://github.com/nanocoai/nanoclaw/issues/3359)**（OPEN）：macOS arm64 + Homebrew Node 26.7.0 下 `better-sqlite3 11.10.0` 编译失败，`bash nanoclaw.sh` 在 bootstrap 阶段中止。`check_node` 只有下限检查（>=20），无上限拦截。
- **对应修复**：[PR #3360](https://github.com/nanocoai/nanoclaw/pull/3360) 已提交（待合并），升级 better-sqlite3 至 13.0.3，同时将 Node 最低要求提升至 22。⚠️ **注意：该 PR 含破坏性变更**（Node 20/21 用户需先升级 Node）。

### 中：安装过程在非交互式 shell 下存在缺陷

- **[Issue #3354](https://github.com/nanocoai/nanoclaw/issues/3354)**（OPEN）：两个 setup 阶段的 bug 在非登录 ssh 会话安装时暴露：
  1. `git show <ref>:<path> > <file>` 失败时留下 0 字节频道文件；
  2. `onecli` 检查在其自身 PATH 修复之前运行（`~/.local/bin` 尚未加入 PATH）。
  
  根因：setup 假设交互式/登录 shell。
- **对应修复**：暂无明确对应 PR（#3249 部分相关，但主要处理已装 Node 版本问题）。

### 中：Dial 短信送达状态误报

- **[Issue #3353](https://github.com/nanocoai/nanoclaw/issues/3353)**（OPEN）：Dial 适配器将 SMS 记录为 "delivered" 仅基于 Dial 接受发送，若运营商之后拒绝，状态不再被修订。`delivered` 行的 `status` 停留为 `'delivered'`，重试预算不被消耗，agent 与 owner 均不感知。
- **对应修复**：暂无。相关 PR（#3041、#3050）仍在待合并状态。

### 低：登录凭据验证可被绕过（已修复）

- **[PR #3339](https://github.com/nanocoai/nanoclaw/pull/3339)**（已合并）：`setup/registry-login.ts` 中不可达的凭据探测被当作"通过"。现改为 fail-closed。✅

### 低：审批卡片投递实例缺失（已修复）

- **[PR #3340](https://github.com/nanocoai/nanoclaw/pull/3340)**（已合并）：`pending_approvals` 增加 `instance` 列，确保 OneCLI 凭据卡片由同一 bot 身份发布。✅


## 6. 功能请求与路线图信号

### 明确功能请求

| Issue/PR | 请求内容 | 状态 |
|---|---|---|
| [PR #3356](https://github.com/nanocoai/nanoclaw/pull/3356) / [PR #3355](https://github.com/nanocoai/nanoclaw/pull/3355) | **Cursor Agent SDK** 支持（provider payload + `/add-cursor` 安装技能） | 待合并 |
| [PR #3349](https://github.com/nanocoai/nanoclaw/pull/3349) | **Agent mailbox 接缝与注册表**（SQLite 保持内置默认实现） | 待合并 |
| [PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050) / [#3041](https://github.com/nanocoai/nanoclaw/pull/3041) | **Dial 频道**接入安装向导 + 适配器 | 待合并（37 天） |

### 路线图判断

- **Agent provider 扩展是明确方向**：Cursor Agent SDK（#3356）+ agent mailbox（#3349）+ 已有的 Claude 支持，表明项目正从单一模型走向多 provider 生态。
- **Node 版本下限提升**（20→22）已通过 PR #3360 预演，合入后属于破坏性变更，用户需注意。
- **Dial 相关 PR 已挂起超一个月**，且伴随 Bug #3353 尚未解决，建议维护者评估是否继续推进或暂时搁置。


## 7. 用户反馈摘要

> 以下反馈全部来自 @glifocat 的 Issue（该用户为今日最活跃 Issue 提交者）。

- **"On a fresh macOS arm64 machine with Homebrew's current Node（26.7.0）, bash nanoclaw.sh passes the Node check and then aborts at bootstrap."**（[#3359](https://github.com/nanocoai/nanoclaw/issues/3359)）
  - **痛点**：版本检查过于宽松（只有下限），上游 Node 更新后立即破坏安装。属于**前向兼容性**问题。

- **"Both were hit on a clean box. They are unrelated in mechanism but share a cause: setup assumes an interactive/login shell."**（[#3354](https://github.com/nanocoai/nanoclaw/issues/3354)）
  - **使用场景**：非交互式 ssh 会话执行安装（CI/CD、云主机初始化、Docker 构建）。
  - **痛点**：安装脚本无法在 headless 环境正常工作，0 字节文件会污染后续流程。

- **"The Dial adapter records an SMS as delivered when Dial accepted it for sending. If the carrier rejects it afterwards, nothing revisits that decision."**（[#3353](https://github.com/nanocoai/nanoclaw/issues/3353)）
  - **痛点**：送达状态是单次决策、不可撤销，对依赖送达回执的业务场景（如验证码、通知）会产生误导。
  - **期望**：需要异步确认机制或状态修正路径。

**总体评价**：用户反馈集中在安装体验（Node 版本误判 + headless 不支持）和渠道状态准确性（Dial 送达状态）。无功能满意度相关正面反馈记录。


## 8. 待处理积压

### 长时间未合入的 PR（>30 天）

| PR | 标题 | 创建时间 | 等待天数 | 风险提示 |
|---|---|---|---|---|
| [#3041](https://github.com/nanocoai/nanoclaw/pull/3041) | Dial 频道适配器（SMS + AI 语音） | 2026-07-14 | 37 天 | 关联 Bug #3353 未解决 |
| [#3050](https://github.com/nanocoai/nanoclaw/pull/3050) | Dial 加入频道选择器 + 向导 | 2026-07-14 | 37 天 | 依赖 #3041 |

### 重要提醒

- **Dial 功能对**（#3041 + #3050）已挂起超一个月，同时出现 #3353 问题，建议维护者尽快评估是修复后合入还是暂时搁置，避免死循环。
- **PR #3025**（agent SDK token 上限提升）虽有 `follows-guidelines` 标签但长期未合并，今日关闭。如果该项目仍被需要，建议重新开启并明确阻塞原因。
- **Node 版本适配问题**（#3359）对应的修复 PR #3360 虽已提交，但如果合并，将引入 Node 20/21 的破坏性变更，需要在发布说明中显著标注。

---

*本日报基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-08-20

## 1. 今日速览

NullClaw 项目今日整体活跃度处于**较低水平**，24 小时内无新 Issue、无版本发布，仅产生 1 条新 PR。该 PR 针对 README 中 star 历史图表无法正常渲染的问题提供了修复方案，目前仍处于待合并状态。尽管活动量不大，但修复的是对外展示层的实际问题，不涉及核心代码变更，项目整体状态稳定，无紧急事件或回归报告。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

**新提交 PR（待合并，尚未合并/关闭）：**

- **#989 `fix: restore broken star history chart`** — 作者: [FaintFlower](https://github.com/nullclaw/nullclaw)，创建于 2026-08-19，[查看 PR](https://github.com/nullclaw/nullclaw/pull/989)

  **摘要**：README 上的 star 历史图表因依赖 GitHub stargazer API 而无法正常显示（该 API 存在访问限制）。此 PR 将图表数据源切换至 star-history.dera.page（一个免 token 的可靠替代服务），使图表恢复渲染。作者已对新的图表 URL 进行了验证。

  **影响评估**：尽管今日无 PR 被合并/关闭，但该 PR 针对的是项目 README 的展示层修复，不涉及核心功能变更，不构成破坏性影响。根据该 PR 的状态，项目整体在此动态周期内未向前推进新功能，修复工作仍处于等待审查阶段。

## 4. 社区热点

今日无大量讨论或评论集中的 Issue/PR。唯一活跃的条目为 PR #989，目前无评论和点赞，尚未引发明显讨论。

其背后诉求源于 GitHub 官方 stargazer API 的访问限制，属于外部依赖变更导致的展示问题，社区贡献者主动提出替换方案，属于**低成本、高可见度**的修复类贡献。

## 5. Bug 与稳定性

**今日无新报告的 Bug、崩溃或回归问题。**

但在 PR #989 中隐含了一个已存在的问题：README 的 star history 图表因依赖 GitHub stargazer API 受访问限制而无法正常渲染（展示层问题）。该问题已有对应的 fix PR（#989）待合并，严重程度为**低**，不影响项目代码运行。

## 6. 功能请求与路线图信号

今日无新增功能请求 Issue。修复类 PR #989 不涉及新功能，保持项目 README 正常展示更接近基础设施维护。鉴于项目当前活跃度较低，暂无信号表明下一版本的明确方向。

## 7. 用户反馈摘要

今日无 Issue 评论可供提炼用户反馈。

## 8. 待处理积压

当前唯一待处理项为 PR #989（待合并），无长期未响应的 Issue。该 PR 自 2026-08-19 创建以来，等待审查时间不足 24 小时，尚属正常队列周期。建议维护者尽快安排 review，以保持外部贡献者的积极性。

---

**项目健康度评估**：整体处于**平稳运行**状态。提交量低但无积压和紧急事项，社区贡献通道畅通（有外部开发者提交修复）。建议关注 PR #989 的合并进度，并留意后续是否有因 GitHub API 策略变化引发的其他展示层连锁问题。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-20

## 1. 今日速览

IronClaw 在 24 小时内保持高度活跃：15 条 Issue 更新（9 条活跃/新开，6 条已关闭）、38 条 PR 更新（20 条待合并，18 条已合并/关闭），并正式发布了 v1.3.0 稳定版。**v1.3.0 已稳定推广**，包含 RC1/RC2 的全部升级和容器修复。项目正围绕 v1.4.0 的两大 Epic—持久化沙箱（#7732）和 channel-first 引导（#7044）—持续推进，前者已合并 Step 1 PR（#7751），后者后端集成已关闭（#6993），前端原型也已合并（#6994）。除此之外，一个值得关注的信号是：流程中出现了 1 次来自新贡献者（jpdevries，#7757）的**社区补丁**尝试修复 #5998 本地 MCP 传输问题，说明项目的外部影响力开始外溢。整体项目健康度良好，但 CI 超时问题（#7756 已修复）和社区报告的 QA bug（#7745、#7744）需要持续关注。

---

## 2. 版本发布

### ironclaw-v1.3.0（2026-08-19）
**发布链接：** [nearai/ironclaw Releases](https://github.com/nearai/ironclaw/releases)

**发布说明摘要：**
- 将 `1.3.0-rc.2` 稳定推广至 1.3.0，包含 RC2 中已验证的升级与容器修复。
- **RC2 修复：** 从 1.2 升级时，现在能正确接受并保留已发布的扩展 `activation_state` 字段，不再在启动阶段 crash-loop。

**破坏性变更：** 无。发布 PR #7754 明确标注为 "no production behavior"，仅涉及版本号提升。

**迁移注意事项：** 1.2 → 1.3 的升级路径已在 RC2 中修复，建议 1.2 用户尽快升级。

---

## 3. 项目进展

今日合并或关闭的 PR 覆盖几个关键领域，反映了 v1.4.0 方向的实质进展：

### 核心：持久化沙箱（#7732 Epic，Step 1 已合并）
PR #7751 已合并：用 **Docker Exec** 替代原来的 per-command 建/删容器模式，改为 `(tenant, user)` 粒度的**持久化容器复用**（~40ms 延迟），`/workspace` 保持 per-user 持久化。这是 v1.4.0 Epic `Persistent per-user sandbox` 的第一步，也是最具成本效益的架构变更之一。

### 核心：通知中心与收件箱（后端已合并，前端待合并）
- PR #7697（已合并）：新增类型化通知 Inbox 合约、持久化存储、分页、未读计数和 read/archive 生命周期 API，将 Inbox 所有权归入 `ironclaw_notifications` 领域。
- PR #7698（待合并）：前端通知中心泛化，替换仅限自动化的通知模型，渲染多种类型通知（审批、认证、阻塞、失败、完成、投递失败等）。
- Issue #7688（已关闭）：前述后端集成的对应 Issue 已关闭。

### 核心：自动化运行时评估（已合并）
PR #7491（omp core-tool 契约，slices 1-4）和 PR #7650（从运行时证据推导运行结果）均已合并。模型获取统一编码工具表面（`read`、`write`、`edit`、`glob`、`grep`、`bash`），自动化评估从语义判断转向证据驱动。

### 发布：v1.3.0 稳定推广
PR #7754 已合并：将 freeze 的候选版本 `1.3.0-rc.2` 提升为稳定版。

### 基础设施：CI 超时修复
PR #7756 已合并：为所有无界 CI 操作添加上限（`apt-get` 挂起、无上限 jobs、外部下载），解决 merge queue 反复超时退出的根因。

---

## 4. 社区热点

### 🔥 Issue #7732 — Persistent per-user sandbox with iron-proxy（7 条评论，48h 内持续活跃）
[GitHub Issue #7732](https://github.com/nearai/ironclaw/issues/7732)

这是当前最受关注的 Epic。核心诉求：当前每个 shell 命令都会创建/销毁容器，效率低下；需要的是 `(tenant, user)` 持久化容器。Step 1 PR #7751 已合并，该项目正以多步方式推进，预计还需多个 PR。

### 🔥 PR #7698 — 通知中心泛化（XL 规模，跨 3 个 scope）
[GitHub PR #7698](https://github.com/nearai/ironclaw/pull/7698)

该 PR 引发讨论的原因是它涉及 UI 层泛化，与 #7697 的后端集成形成完整闭环。

### 🔥 PR #7752 — subagent 激活溯源与 autonomous-wake 能力（已合并）
[GitHub PR #7752](https://github.com/nearai/ironclaw/pull/7752)

该 PR 为后台 subagent 提供基础能力，引入了 `ActivationProvenance`（`Human` / `ParentAgent` / `System`）和 `activate()` 原语。虽然当前无生产行为变更，但它设定了 subagent 激活的能力边界，是安全地放开 autonomous-wake 的第一步。

---

## 5. Bug 与稳定性

按严重程度排序：

### P2 | Copilot MCP 扩展安装失败（#7745）
[GitHub Issue #7745](https://github.com/nearai/ironclaw/issues/7745)

**严重程度：P2（QA bug_bash）**

问题集中在扩展目录存在重复条目（`mcp-gh-copilot-mcp` vs 另一个不完整条目）、认证要求不明确、token 类型不清晰。**暂无 fix PR。**

### P3 | Cron Job UI 缺少编辑和测试按钮（#7744）
[GitHub Issue #7744](https://github.com/nearai/ironclaw/issues/7744)

**严重程度：P3（QA bug_bash）**

用户只能查看 cron job 和状态（paused/active），无法编辑或手动触发。**暂无 fix PR。**

### 严重度待评估 | IronClaw 混淆并停止工作（#7748）
[GitHub Issue #7748](https://github.com/nearai/ironclaw/issues/7748)

用户通过 Slack 反馈，无详细复现步骤。**暂无 fix PR。**

### CI 基础设施（已修复）| merge queue 反复超时（#7756）
PR #7756 已合并，根因是 `apt-get` 无界挂起。所有 CI 操作现在都有边界。

---

## 6. 功能请求与路线图信号

### 可能进入 v1.4.0 的功能（已有 PR 在推进）：

| 功能 | 关联 Issue | 当前状态 |
|------|-----------|---------|
| 持久化 per-user 沙箱（Docker Exec 容器复用） | #7732 | ✅ Step 1 已合并 |
| channel-first 引导（OOBE） | #7044（已关闭） | ✅ 后端 + 前端已合并 |
| 通知中心 + 持久化 Inbox | #7688（已关闭） | ✅ 后端已合并，前端待合并 |
| 自动化创建前置预检 | #7742 | PR #7743 待合并 |
| 本地 MCP 服务器（loopback）支持 | #5998 | PR #7757（新贡献者）待合并 |
| 设计系统 + Storybook 集成 | #7038 | PR #7750 待合并 |
| IronHub agent link 操作界面 | — | PR #7516 待合并 |

### 值得注意的路线图信号：
- **#7732 Epic 的后续步骤**：Step 1（容器复用）已落地，下一步需关注 iron-proxy 集成与 loop executors 的 defer。
- **#7742 的 "bound creation preflight"**：作为 #6879 的一部分，正在为自动化领域建立 authoring 与 execution 之间的诚实契约。

---

## 7. 用户反馈摘要

### 语义不清的困惑反馈（#7748）
[GitHub Issue #7748](https://github.com/nearai/ironclaw/issues/7748)

> "Feedback on IronClaw. It just got confused and stopped working" — via Slack #x-ai-product-feedback（bianca.guimaraes-chadwick 2026-08-19）

**分析：** 该反馈缺少技术细节，无法判断具体场景。此类模糊反馈值得跟进，因为如果是普遍性问题（如上下文混淆、循环死锁），影响面会很大。

### 生态互操作请求（#5998）
[GitHub Issue #5998](https://github.com/nearai/ironclaw/issues/5998)

> "Reborn currently has no way to reach an MCP server running on the same machine. `stdio` is rejected outright, and the hosted-HTTP lane is `https`-only with private/loopback IPs denied — so `http://127.0.0.1:PORT/mcp` is refused as well."

**分析：** 这是一个合理且必要的开发者体验问题。当前的传输策略过于严格，完全切断了本地 MCP 的工具接入。新贡献者 jpdevries 已经提交补丁（#7757），预计很快会有进展。

### 崩溃报告（#7748）与 QA bug（#7745/#7744）
这些反馈暴露了当前版本在 UI 完整性和边界场景处理上的不足，但均不阻塞核心功能。

---

## 8. 待处理积压

### 长期未响应的重要 PR

| PR | 创建时间 | 持续天数 | 摘要 | 风险 |
|----|---------|---------|------|------|
| [PR #7456](https://github.com/nearai/ironclaw/pull/7456) | 08-10 | 10 天 | 使持久化存储 profile-agnostic（沙箱安全边界） | medium |
| [PR #7516](https://github.com/nearai/ironclaw/pull/7516) | 08-12 | 8 天 | IronHub agent link 操作界面 | low |
| [PR #7255](https://github.com/nearai/ironclaw/pull/7255) | 08-05 | 15 天 | APDD 治理框架评估与集成建议 | low |

### 长期未关闭的 Issue

| Issue | 创建时间 | 持续天数 | 摘要 |
|-------|---------|---------|------|
| [#5998](https://github.com/nearai/ironclaw/issues/5998) | 07-11 | 40 天 | 本地 MCP 服务器无传输通道（已有修复 PR #7757 待合并） |

### 维护者建议

1. **优先审查 PR #7757**（本地 MCP 支持）：Issue 已开放 40 天，已有新贡献者提交补丁，应尽快审核以免使外部贡献者流失。
2. **关注 #7752 的依赖链**：Issue #7755 指明依赖 #7752 合并后才能进行词汇表去重改动，需确保 merge queue 不阻塞该链。
3. **跟进 #7748 的模糊反馈**：建议联系反馈者获取复现步骤，避免潜在盲区。
4. **CI 稳定性复查**：虽然 #7756 已修复 apt-get 挂起问题，但 merge queue 仍可能因其他原因（如资源受限）超时，建议设置监控告警。

---

*本日报由 AI 分析师根据 GitHub 公开数据自动生成，数据截至 2026-08-20。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-20

> 数据区间：2026-08-19 至 2026-08-20 | 数据来源：GitHub Issues / PRs / Releases


## 1. 今日速览

项目今日活跃度**中等偏低**。过去24小时合并/关闭了 8 个 PR，但其中 6 个为 4 月积压的旧 PR 被批量关闭或合并，仅 2 个（#2511、#2512）为当日新建并关闭的新 PR。Issues 侧同样呈现"新开 0、仅旧 Issue 被批量标记 stale 并更新"的格局，说明近期社区侧新增反馈有限，维护者可能在集中处理历史债务或进行版本收敛。核心仓库仍有 6 个 **4 月遗留的未解决 Issue（全部被标记为 stale）** 等待关注，其中包含 AI 回复异常、文件上传失效等直接影响用户体验的高优先级问题。整体判断：**项目处于维护整理期，而非功能密集开发期。** 另外值得注意的是，今日合并的 PR #1576 修复了一个可能导致 SSE 流式响应静默丢失的竞态条件，属于高价值稳定性修复。

- 活跃度评级：⭐⭐（2/5）—— 技术活跃度较低，维护动作以清理历史 PR 和标记 stale Issue 为主。
- 健康度提示：6 个 4 月遗留 Issue 今日全部被标记为 `[stale]` 并更新，若无维护者介入，存在被自动关闭的风险。


## 2. 版本发布

本次日报周期内**无新版本发布**（Releases 为空）。最近一次版本信息需回溯至 2026.4.3（2026 年 4 月 3 日发布，来自 Issue #1566 中的用户描述），距今已超过 4 个月。对于 AI 助手类应用，超过 4 个月无版本更新且遗留多个功能性 Bug（见第 5 节），发布节奏值得关注。


## 3. 项目进展

今日合并/关闭 8 个 PR，其中 2 个为当日新建（Windows 安装器相关），6 个为 4 月积压的 **stale** PR 在今日统一处理。合并内容覆盖以下维度：

### 🖥️ Windows 安装器专项（当日新增，今日合并）
- **[#2512]** fix(installer): hide banner for dictbind silent package — 针对 dictbind 静默通道隐藏插件自有 Banner，保留其他静默安装路径的 Banner 行为，UAC 与 RequestExecutionLevel 逻辑不变，同时更新安装器设计规范文档。链接：[PR #2512](https://github.com/netease-youdao/LobsterAI/pull/2512)
- **[#2511]** fix(installer): support silent upload-first web builds — 新增支持 "先上传后安装" 的两阶段 Windows Web 安装器流程（NOS 托管），仅重建已签名的 WebSetup 存根，同时复用已上传的包和块映射，并通过 SHA-256 前后校验确保存根重建不会使已上传负载失效。链接：[PR #2511](https://github.com/netease-youdao/LobsterAI/pull/2511)

> 说明：两笔安装器 PR 均与"静默安装"场景相关，且提到 preserve / keep unchanged / enforce invariant 等约束措辞，推测为**企业分发通道**的合规与稳定化需求，非面向普通消费者。

### 🧹 积压 PR 合并（4 月提交，今日批量处理）
- **[#1570] fix(scheduledTasks)** — 修复编辑已禁用定时任务后保存时被强制重新启用的 bug。根因是 `handleSubmit` 中 `enabled` 字段被硬编码为 `true`，修复后编辑模式改为读取任务原始状态。链接：[PR #1570](https://github.com/netease-youdao/LobsterAI/pull/1570)
- **[#1573] feat(im)** — 为 IM 渠道新增斜杠命令：`/help`、`/status`、`/new`、`/compact` 等，覆盖 Telegram/钉钉/飞书/Discord/QQ/微信。使用户无需打开桌面端即可查看状态、重开会话。链接：[PR #1573](https://github.com/netease-youdao/LobsterAI/pull/1573)
- **[#1576] fix(api)** — 修复 SSE 流监听器被旧请求的异步 abort 回调错误清理的竞态条件。场景：用户快速点击停止后立即发送新消息，旧请求的 abort 回调可能在新请求注册监听器后触发，错误移除新请求的监听器，导致流式数据静默丢失。链接：[PR #1576](https://github.com/netease-youdao/LobsterAI/pull/1576)
- **[#1578] feat(permission-modal)** — 权限审批弹窗增加 Bash 命令语法高亮（关键字、参数、管道符等），帮助用户快速识别 `rm -rf`、`--force` 等危险操作。链接：[PR #1578](https://github.com/netease-youdao/LobsterAI/pull/1578)
- **[#1580] feat(prompt-input)** — 输入框图片附件由图标 + 文件名改为 64×64 缩略图卡片预览，删除按钮 hover 显示，提升附件内容确认效率。链接：[PR #1580](https://github.com/netease-youdao/LobsterAI/pull/1580)
- **[#1582] fix(setup-python)** — 修复 Windows 上 pip 无法使用问题：检测并覆盖旧版本残留的 `__main__.py`，健康检查从"仅检查文件存在"升级为"校验内容是否匹配期望版本"。链接：[PR #1582](https://github.com/netease-youdao/LobsterAI/pull/1582)

**项目进度总结**：核心改进集中在三个方面——(1) SSE 流式稳定性修复（#1576）;(2) 用户体验增强（IM 斜杠命令、缩略图预览、Bash 高亮）;(3) 安装器与 Python 环境的工程化修复。其中 #1576 的竞态条件修复属于高价值稳定性改进，直接影响 AI 流式输出的可靠性，建议维护者在下一版本发布说明中重点提及。


## 4. 社区热点

今日无高热度讨论。所有 6 个 Issue 评论数均在 1-5 条之间，且全部为 4 月创建、今日被 stale-bot 批量标记更新。最活跃的两个 Issue：

- **[#1569] 提问后不运行，也不显示任何信息**（评论 5 条，创建于 4 月 8 日）— 用户反映提问后无任何响应且无日志输出。链接：[Issue #1569](https://github.com/netease-youdao/LobsterAI/issues/1569)
- **[#1561] 模型无法获取上传的文件**（评论 2 条，创建于 4 月 8 日）— 用户反馈新版本回归：拖入文件后模型不知道有文件存在，旧版本会自动放入 project 目录供搜索。链接：[Issue #1561](https://github.com/netease-youdao/LobsterAI/issues/1561)

**诉求分析**：这两个 Issue 的共性在于用户遇到问题无法自行排查——要么没有任何反馈输出（#1569），要么需要依赖旧行为才能完成操作（#1561）。由于 4 个月未获响应且已被标记 stale，用户侧的不满情绪有可能在升级（如桌面端提示更新）后被再次点燃。


## 5. Bug 与稳定性

今日活跃的 6 个 Issue 全部为 **4 月遗留 Bug**，无新增 Bug 报告。按严重程度排序：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#1566](https://github.com/netease-youdao/LobsterAI/issues/1566) | 2026.4.3 版本无论输入什么，AI 均回复相同内容（疑似上下文/状态异常），已附日志 | 4 月遗留，stale |
| 🔴 高 | [#1569](https://github.com/netease-youdao/LobsterAI/issues/1569) | 提问后不运行、无任何输出信息（已附截图） | 4 月遗留，stale |
| 🟠 中 | [#1561](https://github.com/netease-youdao/LobsterAI/issues/1561) | 新版本回归：模型无法获取拖入聊天框的文件（旧版本会自动放置到 project 目录） | 4 月遗留，stale |
| 🟠 中 | [#1551](https://github.com/netease-youdao/LobsterAI/issues/1551) | 网络环境变化（如切换 Wi-Fi）会导致网关反复重启，恢复原网络后正常 | 4 月遗留，stale |
| 🟡 低 | [#1563](https://github.com/netease-youdao/LobsterAI/issues/1563) | 流量包服务条款页面存在明显文字错误 | 4 月遗留，stale |

**与 Fix PR 的对应关系**：
- #1566（回复相同内容）与 #1569（无输出）— 与今日合并的 [#1576](https://github.com/netease-youdao/LobsterAI/pull/1576)（SSE 竞态条件）在现象上有相关性，但 **#1576 是 4 月创建的 PR，Issue 同样创建于 4 月，二者时间线吻合**。若 #1576 的修复确为该问题的根因，则 #1566 / #1569 可能在下一版本中解决，但目前没有维护者在 Issue 中标注关联。
- #1561（文件上传）— 今日无相关修复 PR。
- #1551（网关重启）— 今日无相关修复 PR。


## 6. 功能请求与路线图信号

今日活跃的 6 个 Issue 中，仅 1 个属于功能/改进类请求：

- **[#1567] 输入框添加快捷操作按钮** — 用户建议在输入框提供"停止当前话题""压缩上下文"等快捷按钮，或至少提供 `/help` 操作指令，以便在上下文过长或后端异常时快速恢复。链接：[Issue #1567](https://github.com/netease-youdao/LobsterAI/issues/1567)

**对应 PR 信号**：今日合并的 [#1573](https://github.com/netease-youdao/LobsterAI/pull/1573)（IM 斜杠命令）与本请求高度相关——`/new`（强制新会话）、`/compact`（压缩上下文）、`/status` 等命令已覆盖用户诉求。**结论：该功能请求大概率已通过 #1573 在 IM 渠道落地，桌面端输入框是否跟进尚未有明确 PR。** 若 #1576 修复验证有效，下个版本可同时关闭 #1566、#1569、#1567 三个 Issue（#1567 的部分诉求已被 #1573 满足）。


## 7. 用户反馈摘要

- **"新版本才有 bug，旧版本好好的"** — #1561 用户明确指出文件上传是"新版本才有的回归"，旧版本行为正常。此类反馈对信任度伤害较大，建议维护者确认 #1576 修复是否覆盖该场景，或明确排查方向。
- **"提问后不运行，也不显示任何信息，不知道出什么问题了"** — #1569 用户的核心痛点是**无反馈**。即使报错，也比静默失败更有利于用户自助排查或向社区求助。
- **"需要有快速恢复手段"** — #1567 用户表达了在异常发生后缺乏自救手段的挫败感。这与 #1566（回复重复内容）有逻辑递进关系：一旦遇到异常，用户希望有"急停 + 复位"的操作入口。
- **"流式输出静默丢失"**（来自 #1576 PR 描述）— 用户快速停止后再次发送消息，新请求的流式数据无提示地丢失。该问题对 AI 对话类产品的信任度影响较大，所幸已有修复。


## 8. 待处理积压

### 高优先级（4 月遗留，已被标记 stale，存在自动关闭风险）

| Issue | 创建时间 | 最后更新 | 影响 | 建议 |
|-------|---------|---------|------|------|
| [#1566](https://github.com/netease-youdao/LobsterAI/issues/1566) 输入任意内容回复相同 | 2026-04-08 | 2026-08-19 | AI 核心功能不可用 | 验证是否已被 #1576 修复，若是则关联关闭 |
| [#1569](https://github.com/netease-youdao/LobsterAI/issues/1569) 提问后无响应 | 2026-04-08 | 2026-08-19 | AI 核心功能不可用 | 同上 |
| [#1561](https://github.com/netease-youdao/LobsterAI/issues/1561) 文件上传失效 | 2026-04-08 | 2026-08-19 | 文件对话场景不可用 | 需确认是否为回归，安排专项排查 |
| [#1551](https://github.com/netease-youdao/LobsterAI/issues/1551) 网络变化导致网关反复重启 | 2026-04-08 | 2026-08-19 | 网络切换场景下服务中断 | 需网络层排查 |

### 低优先级（仍有待办价值）

- [#1563](https://github.com/netease-youdao/LobsterAI/issues/1563) 服务条款文字错误 — 易修复，适合随下个版本一并处理。
- [#1567](https://github.com/netease-youdao/LobsterAI/issues/1567) 输入框快捷操作按钮 — 已在 IM 渠道通过 #1573 落地（/help、/new、/compact），桌面端是否跟进待产品决策。

### 提醒

上述 6 个 Issue 均创建于 2026-04-08，距今已超 4 个月，且今日全部被 stale-bot 标记。**若 30 天内（即 9 月中旬前）无维护者响应，将按 GitHub 规则被自动锁定或关闭。** 建议维护者至少对 #1566、#1569、#1561 三个高优 Bug 明确表态——是已修复待发布，还是仍在排查中——以避免"用户报障 4 个月无响应"的负面印象。


> 本报告由 AI 自动生成，数据来源于 GitHub 公开 API。所有链接均指向官方仓库，可点击验证。报告中的推测性结论标注了分析依据，仅供参考，请以维护者官方回复为准。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 — 2026-08-20

## 1. 今日速览

Moltis 过去24小时保持中高活跃度：共处理3个Issue（全部关闭）、9个PR（5个待合并，4个已合并/关闭），并发布了1个增量版本（20260818.10）。核心维护者 penso 与社区贡献者 vikng-dev 在修复链路上表现亮眼——值得关注的是，今日合并的4个PR中有3个聚焦 **Apple Container 沙箱后端**的稳定性和资源限制问题，标志着对 macOS 容器兼容性的系统化加固；同时，**3个新提交的PR** 围绕 WhatsApp 集成体验和 HTTP 服务安全展开，其中 #1216 修复了一个高危未认证访问漏洞（CWE-306），建议优先评审。项目整体处于"功能迭代+缺陷修复"并行的健康节奏。


## 2. 版本发布

**20260818.10** (2026-08-18) — 增量补丁版本

该版本为常规增量发布，包含此前合并的若干缺陷修复。无破坏性变更，无迁移注意事项。从 PR 合并节奏看，该版本应已包含 Apple Container 状态解析与资源限制相关修复（#1214、#1215），建议沙箱用户尽快升级。


## 3. 项目进展

**核心进展：Apple Container 后端稳定性修复成效显著**

今日合并/关闭的4个PR中，3个直接针对 Apple Container 沙箱的缺陷修复，为该后端的生产可用性扫清了关键障碍：

- **#1214 — 修复 Apple Container 状态解析跨版本兼容**（已合并）：废弃脆弱的 JSON 子串匹配，引入类型化状态解码器，同时兼容 1.x 版本的嵌套 `status.state` 结构与旧版标量 `status` 值。该修复直接解决了 #1185 中"沙箱已启动但 Moltis 误判为未运行"的问题，并将解码器统一应用于就绪检查、生命周期检查与容器列表等场景。

- **#1215 — 修复 Apple Container 沙箱资源限制**（已合并）：将配置的内存和 CPU 限制通过 `--memory` 和 `--cpus` 正确传递给 Apple Container；使用原生 `--ulimit nproc=<limit>` 语法应用 `pids_max`；对小数 CPU 配额显式拒绝而非静默降级。该 PR 解决了 #1188 中资源限制未生效的问题。

- **#1213 — 增加 GPT-5.6 Luna 路由覆盖**（已合并）：在确定性推理+工具调用路由测试中新增 GPT-5.6 Sol/Terra/Luna 覆盖，并将 Luna 纳入模型健康检查的必需可用列表，同步更新了实时 OpenAI 模型清单。

- **#1212 — 保留显式 OpenAI 端点的 Responses 路由**（已合并）：修复了自定义配置 OpenAI 官方 URL 时路由策略被错误降级的问题，确保使用 `OPENAI_BASE_URL` 指向官方端点时仍能正确启用 Responses API 的推理+工具调用能力。

**项目整体向前推进的度量**：Apple Container 相关的历史遗留 Bug（#1185、#1188）在新版本发布后 24 小时内即被修复关闭，Issue → PR → 合并的闭环周期短、质量高，项目维护响应速度值得肯定。


## 4. 社区热点

**最受关注：Issue #1185 — Apple Container 1.x 沙箱启动但被误判为未运行**（3条评论，已关闭）

该 Issue 获得今日最多的互动（3条评论），反映了 macOS 用户对 Apple Container 后端的实际使用痛点。核心诉求是 Moltis 对沙箱状态检测不准确，导致用户无法判断容器是否真实可用。该问题已在 PR #1214 中通过类型化状态解码器得到修复。

分析：该 Issue 热度与 #1214 和 #1215 的修复形成了完整的"用户报告 → 根因分析 → 彻底修复"闭环，体现了项目对真实用户反馈的重视。

其他活跃 PR（如 #1219、#1218、#1217）均为新提交且暂无明显讨论，等待维护者评审。


## 5. Bug 与稳定性

今日共关闭3个Bug类Issue，全部为存量问题，无新增Bug报告。

| 严重程度 | Issue | 问题描述 | 状态 | 修复 PR |
|---------|-------|---------|------|---------|
| **高** | [#1185](https://github.com/moltis-org/moltis/issues/1185) | Apple Container 1.x 沙箱已启动但 Moltis 误判为未运行，影响服务可用性判断 | 已关闭 | ✅ #1214 |
| **中** | [#1188](https://github.com/moltis-org/moltis/issues/1188) | Apple Container 后端资源限制（内存/CPU/pids）未生效，可能导致沙箱资源失控 | 已关闭 | ✅ #1215 |
| **低** | [#1181](https://github.com/moltis-org/moltis/issues/1181) | GPT-5.6 Luna 模型路由/调用异常 | 已关闭 | ✅ #1213 |

**安全更新提示**：虽然今日未发现新的安全Bug报告，但**待合并的PR #1216** 修复了 `POST /api/auth/vault/unlock` 和 `POST /api/auth/vault/recovery` 接口可被未认证访问的高危漏洞（CWE-306），攻击者可远程暴力破解保管库密码。该漏洞当前处于暴露状态，强烈建议维护者优先评审并合并此PR。


## 6. 功能请求与路线图信号

今日无新功能请求。但来自待合并PR的功能改进信号值得关注：

- **#1219 — 使不受信任回合的工具上限可配置**：修复合入分享对话中工具策略层不可达的问题，将硬编码的拒绝策略改为可配置。该PR回应了社区对对话分享场景下工具权限控制灵活性的需求。

- **#1218 — WhatsApp 推送名称不再硬编码为 "Moltis"**：修复机器人名称在群聊中显示错误的问题，是提升多品牌/多实例部署体验的细节改进。

- **#1217 — 将回复机器人消息视为提及**：在 WhatsApp 群组中，回复机器人的消息应等同于@提及，符合用户操作直觉。该功能对提升群聊交互体验有直接帮助。

上述功能改进属于"体验优化"类别，预计将随下一批PR合并进入后续版本。


## 7. 用户反馈摘要

- **Apple Container 用户痛点（来自 #1185/#1188）**：macOS 沙箱用户遇到的 "无法确认容器是否运行" 与 "资源限制不生效" 问题得到了彻底修复。从反馈看，用户对 Moltis 在 Apple 平台的支持抱有较高期待，这类细节问题的快速修复有助于增强信任。

- **GPT-5.6 Luna 模型使用问题（#1181）**：用户使用最新 GPT-5.6 Luna 模型时遇到路由异常，Moltis 通过新增测试覆盖和模型健康检查确认了兼容性，保证了新模型的可及性。


## 8. 待处理积压

**高危安全修复待合并**：
- [#1216](https://github.com/moltis-org/moltis/pull/1216) **[OPEN]** — 修复保管库解锁/恢复接口未认证访问漏洞（CWE-306），任意远程调用者可暴力破解密码。⚠️ 安全敏感，建议24小时内完成评审合并。

**已提交1-2天、等待评审的功能/修复PR**：
- [#1219](https://github.com/moltis-org/moltis/pull/1219) **[OPEN]** — 不受信任回合工具上限可配置
- [#1218](https://github.com/moltis-org/moltis/pull/1218) **[OPEN]** — WhatsApp 推送名称可配置
- [#1217](https://github.com/moltis-org/moltis/pull/1217) **[OPEN]** — WhatsApp 回复消息视为提及

**长期待处理项**：
- [#1208](https://github.com/moltis-org/moltis/pull/1208) **[OPEN，已3天]** — 心跳活跃时间段（`heartbeat.active_hours`）配置从未生效，PR 提供完整修复方案。该问题影响定时任务调度准确性，建议维护者安排评审。

---

*本日报由 AI 分析师自动生成，数据截至 2026-08-20 00:00 UTC。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-20

## 今日速览

今日 CoPaw 项目活跃度较高，共处理 50 条 Issue（其中 46 条关闭，4 条保持开放）和 46 条 PR（30 条待合并，16 条已合并/关闭），无新版本发布。值得关注的是，今日关闭的 Issue 中有大量早期（3-4月）积压问题，说明维护团队正在进行系统性清理。在待合并的 PR 中，包含多项针对稳定性（LLM 流卡死、沙箱杀软冲突）和功能增强（自托管 Hub、多项目目录）的重要变更，预示着下一版本可能有较大更新。

---

## 项目进展

今日有 16 条 PR 被合并/关闭，以下为关键变更：

### 合并的 PR

| PR | 内容 | 影响 |
|---|---|---|
| [#7137](https://github.com/agentscope-ai/CoPaw/pull/7137) | 模型选择器样式优化 | 前端体验改进 |
| [#7151](https://github.com/agentscope-ai/CoPaw/pull/7151) | 文件浏览器支持创建文件夹 | 新增文件管理功能 |
| [#6986](https://github.com/agentscope-ai/CoPaw/pull/6986) | **沙箱杀软冲突修复** | 解决用户痛点问题 |
| [#7103](https://github.com/agentscope-ai/CoPaw/pull/7103) | 集成测试覆盖扩展（路由、渠道、工具、MCP） | 提升项目质量保障 |
| [#6800](https://github.com/agentscope-ai/CoPaw/pull/6800) | 智能邮件管理助手（首次贡献者） | 新功能，扩展应用场景 |

### 值得关注的待合并 PR

以下 PR 虽未合并，但已完成开发并进入审核阶段，预计近期合并：

- **[#7150](https://github.com/agentscope-ai/CoPaw/pull/7150)**: LLM 流停滞检测与恢复（修复 #7102，见 Bug 部分）
- **[#6938](https://github.com/agentscope-ai/CoPaw/pull/6938)** 和 **[#6936](https://github.com/agentscope-ai/CoPaw/pull/6936)**：均为 QPQAT 自动化质量保障 agent 提交的修复 PR，值得关注项目正在引入自动化 QA 流程

**今日修复的核心问题包括**：LLM 流卡死、杀软拦截、远程图片导致的会话中断、文件浏览器操作，以及大量集成测试稳定性的改进。

---

## 社区热点

### 最受关注 Issue: #2884 — 用户个人文件被清空

- **链接**: [Issue #2884](https://github.com/agentscope-ai/CoPaw/issues/2884)
- **状态**: 已关闭 | 评论数: **27** | 创建时间: 2026-04-03
- **内容**: 用户反馈安装 CoPaw 后，个人目录内容几乎被清空，软件也被删除
- **分析**: 这是今日评论最多的 Issue，虽然已经关闭，但暴露出用户对于 CoPaw 文件操作安全性的深层担忧。该 Issue 与 [#2590](https://github.com/agentscope-ai/CoPaw/issues/2590)（文件操作回滚功能）和 [#2201](https://github.com/agentscope-ai/CoPaw/issues/2201)（工具擅自执行问题）共同构建了"**AI 文件操作需要安全护栏**"的社区诉求。虽然此 Issue 在 4 月创建，今日才被关闭，但这种长时间的未响应会让用户感到不安，建议维护团队对相关文件操作安全机制进行公开说明。

### 探讨本地模型显存 — #2776

- **链接**: [Issue #2776](https://github.com/agentscope-ai/CoPaw/issues/2776)
- **状态**: 已关闭 | 评论数: 8
- **内容**: 用户分享 RTX 3080 10G + qwenpaw-flash-4b-q4_k_m 的显存占用，并咨询 16GB 以上显卡的表现
- **分析**: 这反映了本地模型运行的硬件门槛是社区关注的重点。当前 CoPaw Local 只提供 9B 参数模型（见 [#2856](https://github.com/agentscope-ai/CoPaw/issues/2856)），用户对更大参数模型的需求明显。此热点表明社区存在一批使用本地模型的用户，需要更多轻量化模型方案和硬件适配指南。

### 多智能体与 Bot 绑定 — #2035

- **链接**: [Issue #2035](https://github.com/agentscope-ai/CoPaw/issues/2035)
- **状态**: 已关闭 | 评论数: 10
- **内容**: 用户询问如何为每个智能体绑定不同 Bot，以及多智能体协作的可行性
- **分析**: 多智能体协作是 CoPaw 的核心差异化功能之一，用户对更灵活的多智能体-多渠道绑定机制有明确需求。该功能若实现，将显著增强 CoPaw 在复杂自动化场景中的竞争力。

---

## Bug 与稳定性

### 严重级别：高

| Bug | 状态 | 修复 PR |
|---|---|---|
| **[#7102](https://github.com/agentscope-ai/CoPaw/issues/7102)**: QwenPaw Desktop 2.1.0 在调用 GLM 5.3 时冻结超 10 分钟，无任何 token 输出 | 开放 | **[#7150](https://github.com/agentscope-ai/CoPaw/pull/7150)** 已添加语义流看门狗，检测停滞流并自动恢复 |
| **[#6847](https://github.com/agentscope-ai/CoPaw/issues/6847)**: QwenPaw 执行任务时频繁被杀软拦截甚至强制关停 | 已关闭 | **[#6986](https://github.com/agentscope-ai/CoPaw/pull/6986)** 已合并沙箱修复 |

### 严重级别：中

| Bug | 状态 | 说明 |
|---|---|---|
| [#2723](https://github.com/agentscope-ai/CoPaw/issues/2723): 切换频道后原任务消失（含描述和智能体执行状态） | 已关闭 | 4 月报告，今日才关闭，需确认是否真正修复 |
| [#2663](https://github.com/agentscope-ai/CoPaw/issues/2663): 任务卡住无法暂停 + 中文/深色模式重启后恢复英文/浅色 | 已关闭 | 两个独立问题的组合反馈 |
| [#2377](https://github.com/agentscope-ai/CoPaw/issues/2377): 批量处理文件时自动中断，仅处理几个文件后罢工 | 已关闭 | 涉及 token 管理和断点续传机制 |
| [#3005](https://github.com/agentscope-ai/CoPaw/issues/3005): 升级安装后应用无法启动 | 已关闭 | Windows 安装脚本问题 |
| [#7076](https://github.com/agentscope-ai/CoPaw/issues/7076): qwenpaw-creator LLM 配置 404 错误（2.1.0 版本） | 已关闭 | 8/17 创建，2 天内关闭 |
| [#7034](https://github.com/agentscope-ai/CoPaw/issues/7034): ReactAgent 并发执行工具调用时 `async for` TypeError | 已关闭 | AgentScope 框架兼容性问题 |
| [#6624](https://github.com/agentscope-ai/CoPaw/issues/6624): 2.0 自动压缩不触发记忆流程，手动 `/compact` 可触发 | 已关闭 | 用户建议维护者判断是否为设计缺陷 |

### 严重级别：低

| Bug | 状态 | 说明 |
|---|---|---|
| [#7135](https://github.com/agentscope-ai/CoPaw/pull/7135): 环境变量写入的非原子操作 | 待合并 PR | 修复 corrupt 文件保护问题 |
| [#7152](https://github.com/agentscope-ai/CoPaw/pull/7152): 集成测试 spawn 递归和端口竞争问题 | 待合并 PR | 测试稳定性修复 |
| [#7146](https://github.com/agentscope-ai/CoPaw/pull/7146): 远程图片在 `view_image` 后导致会话中断 | 待合并 PR | 增加了 SSRF 保护和持久化 |

---

## 功能请求与路线图信号

### 用户新需求（来自今日更新的 Issues）

| 需求 | 来源 | 关联 PR/已有工作 | 纳入可能性 |
|---|---|---|---|
| **一键更新** + `/approve` 按钮化 + **自动切换模型**（含天梯排行）+ **内置自我反思/进化** + **跨端同步**（网页/QQ/微信）+ 支持智谱/美团等更多供应商 | [#2301](https://github.com/agentscope-ai/CoPaw/issues/2301) | 模型切换已有部分实现；备用模型 fallback 见 [#2089](https://github.com/agentscope-ai/CoPaw/issues/2089) | 部分功能已在路线图中 |
| **文件操作回滚**（恢复误删文件） | [#2590](https://github.com/agentscope-ai/CoPaw/issues/2590) | 已有讨论和实现计划 | 审核中 |
| **多智能体与 Bot 绑定** + 多智能体协作对话 | [#2035](https://github.com/agentscope-ai/CoPaw/issues/2035) | 多智能体核心已支持，但渠道绑定单一 | 可能进入 Q4 规划 |
| **支持 DeerFlow Harness 编排** + ACP（OpenCode/Codex） + 多 AI Provider 独立配置 | [#3260](https://github.com/agentscope-ai/CoPaw/issues/3260) | 需评估

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，作为您的 AI 智能体与个人 AI 助手领域开源项目分析师，这是根据 ZeroClaw 项目 2026-08-19 至 2026-08-20 的 GitHub 数据生成的动态日报。

---

# ZeroClaw 项目动态日报
**报告周期**: 2026-08-19 至 2026-08-20
**数据来源**: github.com/zeroclaw-labs/zeroclaw

### 1. 今日速览

ZeroClaw 项目在报告期内保持 **高水平活跃度**。虽然无新版本发布，但社区提交了 43 条 Issue 更新和 50 条 PR 更新，绝大多数（42条 Issue, 48条 PR）处于活跃状态，显示出强劲的开发迭代势头。项目核心聚焦于 **架构演进（RFC）** 与 **安全/稳定性修复**，尤其是围绕会话管理、插件系统（WASM）、权限控制和多代理数据隔离展开了密集讨论。值得注意的是，大量待合并 PR 处于 `needs-author-action` 或 `needs-maintainer-review` 状态，维护者审阅可能成为当前瓶颈。

### 2. 版本发布

- **无新版本发布。**

### 3. 项目进展

本期合并/关闭的 PR 数量较少（2条），但活跃 PR 池巨大。主要进展体现在关键修复的推进上：

- **Bug 修复（已关闭）**: Issue #10067 关于 "tool-result truncation" 的问题被标记为已关闭。该问题曾错误报告为 1MB 结果导致对话不可恢复，后经重新界定范围，确认是固定50,000字符截断且对操作者不可见的问题。关闭表明该问题已得到解决或已明确处理方案。（[Issue #10067](https://github.com/zeroclaw-labs/zeroclaw/issues/10067)）
- **核心 PR 活跃推进**：众多高优先级（`risk:high`）、大体积（`size:XL`）的 PR 正在积极更新中，预示着项目在架构层面有重大变革。值得关注的是：
    - **安全与隔离**：PR #9745 为知识图谱添加了 Per-Agent 归属和范围界定，PR #9746 为会话工具添加了 Per-Agent 所有权，这两项工作对多租户场景下的数据安全至关重要。
    - **性能与超时**：PR #9403 为 WASM 插件引入了墙钟截止时间，PR #9320 为 Cron 任务添加了执行超时，这些都将提升系统的鲁棒性。
    - **兼容性与体验**：PR #8486 旨在添加 OpenAI 兼容的 Chat Completions 端点，将显著提升生态兼容性。

### 4. 社区热点

今日讨论焦点集中在架构和技术债清理，反映了社区在快速迭代期对项目长期健康度的关注：

- **#9487 [RFC] Runtime-owned conversation sessions** (20 评论)：这是目前最热门的讨论。该 RFC 提出了由 Runtime 拥有对话会话，并引入传输表面适配器的重大架构调整。评论数高表明社区对会话所有权边界、迁移策略和持久化契约等核心问题存在广泛关注和深入讨论。（[Issue #9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）
- **#7462 [Bug] Windows 上 74 个测试失败** (18 评论)：这是一个长期存在的兼容性问题，其高评论量反映了 Windows 开发者社区的痛点。修复依赖 CI 环境的扩展，目前状态为 `status:accepted`，但可能因优先级和资源问题而进展缓慢。（[Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）
- **#10118 [Tracker] Rust anti-slop policy debt remediation** (16 评论)：一个新的技术债清理追踪器，发现了 307 个不符合代码规范的候选点。这显示了项目在追求新功能的同时，也在积极关注代码质量和长期可维护性。（[Issue #10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118)）

### 5. Bug 与稳定性

本期报告的 Bug 涉及多个方面，按严重程度排列如下：

- **严重 (S0/S1)**:
    - **#10066 [Bug] SOP 引擎输出模式拒绝时序错误** (S1)：SOP 引擎在记录步骤输出 schema 校验失败前，就推进了后续步骤的执行，可能导致工作流状态错误。已有相关讨论。（[Issue #10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)）
    - **#9976 [Bug] Anthropic 凭据片段被记录到日志** (S0)：在 Debug 级别日志中会记录凭据的头尾字符，存在严重的安全风险。已标记为 `status:in-progress`，有对应的修复 PR 在审阅中。（[Issue #9976](https://github.com/zeroclaw-labs/zeroclaw/issues/9976)）
    - **#9290 [Bug] Windows 桌面版安装后无法启动** (S1)：由于缺少 `TaskDialogIndirect` API 导致应用启动失败，影响了 Windows 用户体验。（[Issue #9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)）
- **中等 (S2)**:
    - **#10045 [Bug] 持久化图片标记可能保留临时源路径** (S2)：可能导致重复警告，影响体验。（[Issue #10045](https://github.com/zeroclaw-labs/zeroclaw/issues/10045)）
    - **#10106 [Bug] 精确代理选择器拒绝支持的转录服务** (S2)：配置/引导问题，导致部分服务无法使用代理。（[Issue #10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106)）
- **轻微 (S3)**:
    - **#10103 [Bug] ZeroCode 健康状态值在法语和西语下错位** (S3)：一个 UI 本地化的小问题。（[Issue #10103](https://github.com/zeroclaw-labs/zeroclaw/issues/10103)）

### 6. 功能请求与路线图信号

用户和贡献者提出了多项新功能需求，结合现有 PR 分析，以下方向可能被纳入后续版本：

- **架构现代化与可扩展性**: 这是当前最强烈的信号。
    - **WASM 插件架构 (#10076)**：用户明确提出了"一切皆插件"的综合 WASM 插件架构，与目前 #9403 等 PR 的 WASM 能力增强方向一致，未来潜力巨大。
    - **OpenAI 兼容端点 (#8486)**：该 PR 的活跃推进表明项目正积极融入更广泛的 LLM 生态，可能成为 v0.9.0 的重要特性。
    - **AI 辅助 PR 审阅 (#9330)**：这是一个呼声较高的开发体验改进，有利于加速 PR 审阅瓶颈。
- **会话与可用性增强**：
    - **Goal Mode v2 (#9702)**：为"目标模式"增加持久化续跑和 Web 控制界面，旨在提升该功能的实用性。
    - **会话管理 (#10141)**：用户直接抱怨会话管理困难，虽然只是 [#10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141) 一个低评论数 Issue，但代表了真实用户痛点。与之相关的多会话 PR #9739 已在开发中。
- **开发体验细节优化**:
    - **ZeroCode 输入增强**：包括支持 `Option-Backspace` (#10059)、日志可选可复制 (#10086) 等功能请求，虽然优先级不高，但体现了对终端用户体验的打磨。

### 7. 用户反馈摘要

- **痛点直击**：用户 klonuo 在 Issue #10141 中直言 "It's quite frustrating to get into previous session"，表达了对当前会话管理功能的不满（复制困难、切换不便），这表明基础的会话管理对 AI 助手类应用至关重要，是用户体验的核心环节。（[Issue #10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141)）
- **生态兼容需求**：开发者社区对 OpenAI 兼容协议的呼声很高。PR #8486 的长期存在和活跃更新表明，放弃原生 SDK 的用户和依赖标准协议的本地工具（如 IDE 插件）对这类功能有刚性需求。
- **平台体验焦虑**：Windows 平台上长期存在的测试失败问题（#7462）和桌面版启动失败问题（#9290）持续引发讨论，这反映出用户对非 Linux 平台体验的稳定性比较敏感。

### 8. 待处理积压

以下为需要维护者重点关注或推进的长期未决事项：

- **高热度 RFC 和 Tracker**：
    - **[#8692] Maintainer decision queue** (创建于 7月4日，13 评论)：这是一个维护者决策队列的 Tracker，但其本身列出的 13 个评论表示有很多待决事项，自身也需要维护者去"清空"。（[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）
    - **[#6165] RFC: Prefer a lighter ZeroClaw core** (创建于 4月27日，16 评论)：关于核心轻量化的 RFC 已讨论近 4 个月，决策周期较长，需尽快明确方向。（[Issue #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)）
- **关键基础设施/兼容性 PR**：
    - **[#7462] Windows 测试修复**：虽然`status:accepted`，但该 74 个测试失败的 Bug 已存在超 2 个月，修复难度高，需要维护者优先排期，否则将持续影响 Windows 用户和贡献者。（[Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）
    - **大型 PR 卡在 `needs-author-action`**：包括 #8955, #9723, #9828, #9447, #9320 等。这些 PR 功能重要（如批量媒体处理、DSML 解析、Agent 配置授权），但停滞等待作者响应，需要维护者与作者沟通推进。（如 PR #8955: https://github.com/zeroclaw-labs/zeroclaw/pull/8955）
- **安全与合规风险**：
    - **[#10074] SECURITY.md 文档与 CI 实际不符**：文档引用的 CI 流程已失效，虽然风险等级为 medium，但作为安全文档，应尽快更新，避免误导。（[Issue #10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074)）

</details>

---
*本日报由 [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial) 自动生成。*