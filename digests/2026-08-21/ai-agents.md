# OpenClaw 生态日报 2026-08-21

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-21 01:13 UTC

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

# OpenClaw 项目动态日报 — 2026-08-21

## 今日速览

OpenClaw 项目今日维持高活跃度，24小时内产生 500 条 Issue 更新与 500 条 PR 更新，新开/活跃 Issue 469 条，待合并 PR 359 条，社区反馈与开发节奏均处于旺盛状态。当前存在 1 个 P0 级崩溃回归（#108435）和多个 P1 级消息丢失/数据一致性问题，值得重点关注。稳定性治理（SQLite 快照一致性、消息投递可靠性、子进程泄漏）与控制面功能增强（成本预算、模型回退策略）是当前双主线。今日无新版本发布，但 `v2026.8.1-beta.2` 的发布验证正在进行中（#125626）。


## 版本发布

今日无新版本发布。最新版本仍为 `v2026.8.1-beta.2`，该版本正处于发布验证阶段（Issue #125626），验证完成后将进入稳定渠道。


## 项目进展

今日合并/关闭 PR 141 条，以下为主要进展：

**安全与策略**
- PR #116489（已合并，XL）：`security.installPolicy` 命令现可返回 `warn`，交互式 CLI 安装需操作者确认目标名称后方可继续 — 增强插件/技能安装的安全审查流 📦
- PR #120900（已关闭，XL）：配套 Control UI 安装策略警告审查界面，管理员可在 Web 界面查看警告并 `acknowledgeInstallPolicyWarning: true` 继续安装 — 安全审查全链路完成 📦
- PR #125471（已关闭，XL）：修复 Claude CLI OAuth 在 Gateway 重启后丢失刷新所有权的问题，并消除矛盾的 `anthropic: missing` 状态行 — 认证可靠性提升 🔐

**自动化修复（ClawSweeper）**
- PR #126180（待合并，M）：修复浏览器错过 settled run 事件导致 Control UI 排队 follow-up 卡死的问题 — 消息投递可靠性修复 📬
- PR #126891（待合并，S）：修复 Codex restricted-tool 路径下静默丢弃工作区 `AGENTS.md` 的问题，直接关闭 #125431 — 安全边界修复 🔒

**开发者体验**
- PR #123975（待合并，S）：`tsgo` 卡死时类型检查不再无限挂起，配备超时与进程树清理 — 解除 CI/本地阻塞 ⏱️
- PR #123535（待合并，M）：Control UI 合并并发 catalog 刷新，消除会话列表引导期刷新风暴 ⚡
- PR #119309（待合并，XS）：修改 `agent-core`/`llm-core`/`model-catalog-core` 源码时 dev runtime 自动重建 — 消除"改了没生效"困惑 🔧

**渠道适配与测试**
- PR #126911（待合并，S）：同步 googlechat/feishu 测试中的 close 断言，消除 CI flake 源 🧪
- PR #126922（待合并，M）：Discord/Slack/Mattermost 中预览清理失败不再误报投递失败 — 渠道层可靠性修复 📬


## 社区热点

**① 每代理成本预算（#42475，23 条评论）**
[Issue #42475](https://github.com/openclaw/openclaw/issues/42475) — 请求在 Gateway 层实现 per-agent 日/月成本上限，在调用模型前强制执行。评论聚焦于如何在不引入外部监控的前提下防止"失控消费"。该需求可能被纳入下一版本的路由/网关控制面模块。

**② 集中式文件名编码工具（#48788，20 条评论）**
[Issue #48788](https://github.com/openclaw/openclaw/issues/48788) — 要求建立集中式文件名编码处理工具，覆盖 Shift-JIS、EUC-KR、GB18030 等多编码场景，而非逐个渠道打补丁。评论区的诉求核心是"架构级方案而非局部修补"。

**③ Gateway 启动失败 — P0 回归（#108435，14 条评论，👍 3）**
[Issue #108435](https://github.com/openclaw/openclaw/issues/108435) — 升级至 2026.7.1 后 Gateway 无法启动（systemd/ollama/手动启动均失败）。🎯 该项目当前唯一 P0 问题，社区关注度最高，尚无可用的 fix PR。

**④ Google Vertex/Gemini 回归（#38327，14 条评论,👍 3）**
[Issue #38327](https://github.com/openclaw/openclaw/issues/38327) — 2026.3.2 后 google-vertex/gemini-3.1-pro-preview 报 "Cannot convert undefined or null to object"。归类为 P1，等待维护者 review。

**⑤ 内存管理混乱（#43747，11 条评论）**
[Issue #43747](https://github.com/openclaw/openclaw/issues/43747) — 同一团队 3 人使用 OpenClaw，各自的内存管理行为完全不同（分块/嵌入 vs 直接存储）。质疑实现一致性，等待产品决策。


## Bug 与稳定性

### P0

| Issue | 标题 | 状态 |
|-------|------|------|
| [#108435](https://github.com/openclaw/openclaw/issues/108435) | 升级 2026.7.1 后 Gateway 启动失败（systemd/ollama/manual 均失败） | 无 fix PR，回归，影响 UX 发布 |

### P1（按影响排序）

| Issue | 标题 | 影响 | Fix PR |
|-------|------|------|--------|
| [#125431](https://github.com/openclaw/openclaw/issues/125431) | Codex restricted 工具策略静默丢弃 workspace AGENTS.md | 会话状态/安全 | ✅ [#126891](https://github.com/openclaw/openclaw/pull/126891) |
| [#123273](https://github.com/openclaw/openclaw/issues/123273) | 命名 agent 图片附件失败（default agent 正常） | 消息丢失 | 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程泄漏，僵尸进程累积 | 崩溃循环/性能退化 | 无 |
| [#92241](https://github.com/openclaw/openclaw/issues/92241) | 更新/回滚后 Gateway 持有过期模块路径，入站消息静默丢弃 | 消息丢失 | 无 |
| [#119270](https://github.com/openclaw/openclaw/issues/119270) | 文件工具剥离目标路径前导 `@`，写入/删除错误文件 | 数据丢失 | 无 |
| [#124284](https://github.com/openclaw/openclaw/issues/124284) | vLLM + thinking 模型子 agent 生成格式错误的 XML 工具调用 | 其他 | 无 |

### P2 值得关注

| Issue | 标题 | Fix PR |
|-------|------|--------|
| [#113306](https://github.com/openclaw/openclaw/issues/113306) | SQLite 快照恢复缺少端到端崩溃与身份保证 | 无 |
| [#114234](https://github.com/openclaw/openclaw/issues/114234) | 容器内 usage-cost 刷新锁因 PID 重用永久冻结 | 无 |
| [#124393](https://github.com/openclaw/openclaw/issues/124393) | `replaceTranscriptEventsSync` 重写竞态删除已提交行 | 无 |
| [#123792](https://github.com/openclaw/openclaw/issues/123792) | CLI 后端下 assistant turns 渲染两次 | 无 |
| [#126246](https://github.com/openclaw/openclaw/issues/126246) | Telegram 投递卡在 `send_attempt_started` 且重启后丢失 | 无 |
| [#86612](https://github.com/openclaw/openclaw/issues/86612) | Windows 下 OPENCLAW_SANDBOX=1 时容器重启循环 | 无 |
| [#119796](https://github.com/openclaw/openclaw/issues/119796) | Windows vitest teardown EBUSY（agent state DB 句柄未释放） | 无 |


## 功能请求与路线图信号

**高潜力（已有 PR 或实现讨论）**

- **Per-agent 成本预算**（[#42475](https://github.com/openclaw/openclaw/issues/42475)，23 评论）— 网关级日/月花费上限，防止失控消费
- **Provider 按失败类别回退与隔离**（[#47910](https://github.com/openclaw/openclaw/issues/47910)）— 对认证失败的 provider 进行隔离而非盲目重试，减少延迟浪费
- **暴露解析后的真实后端模型**（[#51441](https://github.com/openclaw/openclaw/issues/51441)）— 让 agent 看到 LiteLLM 路由后的实际模型（如 `openai/gpt-5.4` 而非 `litellm/complex`），消除"盲区"
- **可配置上传大小限制**（[#71142](https://github.com/openclaw/openclaw/issues/71142)）— Control UI 当前硬编码 5MB，与媒体的理解能力不匹配
- **集中式多编码文件名处理**（[#48788](https://github.com/openclaw/openclaw/issues/48788)）— 架构级替代逐渠道修补方案
- **可配置 session 启动消息**（[#45501](https://github.com/openclaw/openclaw/issues/45501)）— 替代硬编码的 `/new` 提示文本

**低优先级（P3）**

- 可配置 lane wait 诊断阈值（[#14747](https://github.com/openclaw/openclaw/issues/14747)）— 硬编码 2 秒不适合 60-120 秒的合法 cron 任务
- `/new` 与 `/reset` 增加二次确认（[#45564](https://github.com/openclaw/openclaw/issues/45564)）— 防止误触丢失会话
- 推理过程流式显示（[#42276](https://github.com/openclaw/openclaw/issues/42276)）— 类似 OpenAI/Grok 的逐行覆盖式思考过程展示
- MEMORY.md 大小预警（[#45415](https://github.com/openclaw/openclaw/issues/45415)）— 20K 字符静默截断，用户无感知


## 用户反馈摘要

**价格与成本敏感**
- `#42475`：用户需要网关层面的成本上限，因外部监控方案不可持续
- `#68920`：HTTP `/v1/chat/completions` 接口 TTFB 10-15 秒，对实时语音场景不可用，用户请求 `lightContext/voice mode`

**升级/回滚创伤**
- `#92241`：从 2026.6.1 回滚至 2026.5.6 后 Gateway 进程持有旧模块路径，入站消息被静默丢弃 — "进程看似健康（systemd 报 active），实际已损坏"
- `#83598`：Claude CLI OAuth 刷新问题在 #73682 修复后仍存在 — 用户对修复覆盖范围存疑
- `#124284`：升级 beta.2 后 vLLM + thinking 模型子 agent 无法生成有效 XML 工具调用

**平台差异困扰（Windows）**
- `#119796`：Windows 下 vitest teardown 因 agent state DB 句柄未释放导致 EBUSY
- `#74378`：CLI 命令后 node.exe 进程驻留不退出
- `#86612`：Windows Docker 容器配置 OPENCLAW_SANDBOX=1 时重启循环

**中文用户反馈**
- `#50490`：飞书群聊中 `/activation mention` 模式切换无效，机器人仍响应所有消息 — 模式切换确认后未真正生效，已标注为回归（P2）


## 待处理积压

**长期未响应的 P0/P1 问题**

| Issue | 创建时间 | 标题 | 备注 |
|-------|----------|------|------|
| [#108435](https://github.com/openclaw/openclaw/issues/108435) | 2026-07-15 | Gateway 无法启动（P0） | 37 天未关闭，无 fix PR |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | 2026-03-17 | 在线文档超前于发布版本（P0） | 157 天未关闭，5 个月积压 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 2026-03-06 | Google Vertex/Gemini 回归 — "Cannot convert undefined or null to object" | 168 天未关闭 |
| [#53628](https://github.com/openclaw/openclaw/issues/53628) | 2026-03-24 | `${XDG_CONFIG_HOME}` 未展开（P3） | 150 天未关闭 |

**长期未合并的关键 PR**

| PR | 创建时间 | 标题 | 状态 |
|----|----------|------|------|
| [#89040](https://github.com/openclaw/openclaw/pull/89040) | 2026-06-01 | embedded bootstrap-context 事件循环加固与分阶段计时 | 81 天未合并，待维护者 review |
| [#109707](https://github.com/openclaw/openclaw/pull/109707) | 2026-07-17 | fd/ripgrep 搜索执行增加超时 | 35 天未合并，等待作者更新 |
| [#119273](https://github.com/openclaw/openclaw/pull/119273) | 2026-08-04 | bundle MCP 工具调用写入审计账本 | 17 天未合并，等待作者更新 |

**值得关注**
- `#118785`（QA 追踪，8/3）：23 个容器 + 31 个外部 SDK 的 QA 主证明仍在进行中，暂无更新 — 提醒相关维护者推进
- `#125626`（Release validation v2026.8.1-beta.2）：验证工作正在进行，每个测试者需通过 validation skill 添加一条 release-only 评论

---

*本日报由 AI 分析 GitHub 数据自动生成，数据截至 2026-08-21。*

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析报告

**报告日期：** 2026-08-21  
**覆盖项目：** OpenClaw、NanoBot、Hermes Agent、PicoClaw、NanoClaw、NullClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw、ZeroClaw

---

## 1. 生态全景

个人 AI 智能体开源生态正处于**从单点工具向平台化架构演进的关键转折期**。今日 13 个项目中 10 个保持活跃，核心主线清晰：**稳定性治理与安全加固取代了单纯的功能堆叠**，成为各项目的第一优先级——OpenClaw 面临 P0 回归、Hermes Agent 遭遇 Windows 更新链路系统性脆弱、Moltis 紧急修复 Vault 认证缺失漏洞，三者的共性表明"能跑起来"已不再是默认承诺。与此同时，**插件化/WASM 架构（ZeroClaw）、多 Agent 协作框架（PicoClaw）、持久化沙箱（IronClaw）**等架构级重构正在高活跃项目中稳步推进，而成本控制（OpenClaw #42475）、审批门禁（Hermes #91202）等面向生产落地的控制面需求也在密集涌现，标志生态正从开发者玩具向企业级工作负载过渡。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 新开/活跃 Issue | 待合并 PR | 合并/关闭 PR | Release | 健康度 |
|------|-----------|---------|----------------|----------|-------------|---------|--------|
| **OpenClaw** | 500 | 500 | 469 | 359 | 141 | 无（beta.2 验证中） | 高活跃，但 1 个 P0 回归 + 5 个 P1 未修复，**健康度中等** |
| **NanoBot** | 5 | 29 | 5 | 17 | 12 | 无 | **高**：响应迅速，Bug 当天即修复 |
| **Hermes Agent** | 50 | 50 | 44 | 48 | 2 | 无 | **中低**：合并带宽严重不足，关键 PR 全堵 |
| **PicoClaw** | 3 | 8 | 3 | 5 | 3（含 2 个大型合并） | 无 | **中**：重大 PR 落地，但新增问题响应慢 |
| **NanoClaw** | — | 50 | — | 35 | 15 | 无 | **中高**：core-team 密集攻坚，但 1 个 74 天阻断级 Bug 未修 |
| **NullClaw** | — | — | — | — | — | — | 无活动 |
| **IronClaw** | 21 | 33 | 17 | 19 | 14 | 无（v1.4.0 开发中） | **高**：结构清晰，修复与合并节奏健康 |
| **LobsterAI** | 2 | 7 | 2 | 1 | 6 | 无 | **中**：功能迭代活跃，但社区反馈偏少（stale 标记多） |
| **TinyClaw** | — | — | — | — | — | — | 无活动 |
| **Moltis** | 1 | 8 | 1 | 4 | 4 | **20260820.01** | **高**：安全响应及时，合并效率高 |
| **CoPaw** | 28 | 50 | — | — | 较多（含 #7119 等） | **v2.1.1-beta.1** | **高**：双轮驱动，社区与开发均活跃 |
| **ZeptoClaw** | — | — | — | — | — | — | 无活动 |
| **ZeroClaw** | 50 | 50 | 45 | 48 | 2（关闭） | 无 | **中高**：讨论质量高，但合并效率受限 |

> 注：各项目数据结构不同，部分字段不可比，已标注核心信号为主。

---

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态中**体量最大、活跃度最高的项目**，日更新 500 条 Issue + 500 条 PR 的数量级远超第二名（50 条级别）。

| 维度 | OpenClaw | Hermes Agent | NanoClaw | ZeroClaw |
|------|----------|--------------|----------|----------|
| **数据规模** | 500+500/日 | 50+50/日 | —+50/日 | 50+50/日 |
| **关键优势** | 渠道覆盖广（Discord/Slack/飞书/Telegram 等）、控制面功能完整（成本预算、回退策略）、插件生态 | Agent 自主性（delegation、Kanban、self-improvement）、桌面端完整链路 | Whisper 语音、WhatsApp 等渠道深入、一键 Slack agent | WASM 插件安全模型、正式 RFC 流程 |
| **技术路线** | 网关/路由为核心的控制面架构 | 以桌面端 + CLI 为入口、agent 自治为主 | 技能（add-*）驱动，安装即用 | **WASI 插件安全 + SSRF 深度加固** |
| **健康度信号** | 活跃度高但 P0 回归（#108435）37 天未修复，文档超前版本 157 天 | 合并带宽是瓶颈，关键修复全部积压 | 74 天阻断级 Bug 未修，但 core-team 正密集补救 | RFC 质量高，但合并速度与作者响应是短板 |

**核心判断：** OpenClaw 是生态的"基础设施层"——它定义了消息投递、网关路由、成本控制等通用能力，大量下游项目（NanoClaw、PicoClaw 等）以类似命名或架构为蓝本。但**高活跃度与高积压并存**（359 个 PR 待合并），是当前最大的生态风险。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|----------|----------|
| **窗口/上下文管理缺陷** | OpenClaw、ZeroClaw、NanoBot | OpenClaw 消息丢失（#92241、#126246）；ZeroClaw 上下文截断于 32K 无视 131K 配置（#10068）；NanoBot streaming 中途 server_error 不重试（#5454） |
| **持久化存储数据安全** | Hermes Agent、CoPaw、OpenClaw | Hermes state.db 8 天 3 次损坏（#89293）；CoPaw envs.json 静默覆写（#7118）+ history.db 膨胀至 7.6GB（#7168）；OpenClaw transctipt 竞态（#124393） |
| **成本与配额控制** | OpenClaw、Hermes Agent | OpenClaw per-agent 日/月成本上限（#42475）；Hermes Codex 周配额耗尽（PR #91122） |
| **模型 Provider 兼容性** | OpenClaw、NanoBot、ZeroClaw、CoPaw | OpenClaw Google Vertex/Gemini 回归 168 天未修复（#38327）；CoPaw GLM 5.3 冻结 10 分钟（#7102）；NanoBot 新增 Vertex（#5459）与 SenseNova（#5453）provider |
| **审批/安全门禁** | Hermes Agent、ZeroClaw、IronClaw | Hermes memory/skills 写操作审批流（#91202）；ZeroClaw 高风险命令 allow/ask/deny 三级策略（#7155）；IronClaw run gates（#7699） |
| **Windows 支持短板** | Hermes Agent、ZeroClaw、CoPaw、Moltis | Hermes 更新删除桌面应用（#83846）；ZeroClaw TaskDialogIndirect 缺失（#10111）；CoPaw 多 Issue 来自 Win11 用户；Moltis Windows shell hooks（PR #468）长达 5 个月未合并 |
| **可观测性/日志质量** | NanoBot、Hermes Agent、CoPaw | NanoBot 启动日志丢失（#5412）；Hermes 多进程日志轮转崩溃（#27649）；CoPaw 启动超时后"日志里什么都没有" |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键特征 |
|------|----------|----------|------------------|
| **OpenClaw** | 全渠道消息代理 + 网关控制面 | 中大型团队、开发者 | 网关/路由核心 + SQLite 持久化 + 多 Agent 路由；**控制面功能（成本、回退）最完善** |
| **NanoBot** | 极简安装、多 Provider 支持 | 个人开发者、快速部署场景 | **Python 生态**，轻量级，TUI 优先；社区贡献者覆盖面广、响应极快 |
| **Hermes Agent** | Agent 自主性（delegation、Kanban、self-improvement） | 高阶用户、无人值守工作流 | **桌面端（Electron）+ CLI** 双入口；内存编辑、工具调用深度集成；Rust + TS 混合栈 |
| **PicoClaw** | 多 Agent 协作、协议兼容 | 开发者、Agent 编排场景 | **Go 后端**；Blackboard 共享上下文、Agent handoff；原生支持 Anthropic Messages API |
| **NanoClaw** | 技能（skill）即插即用、语音/图像渠道 | 中轻度用户、快速体验 Agent | skill 化安装（add-*）；**渠道深度**（WhatsApp、Slack 一键部署）；Node/TS 栈 |
| **IronClaw** | 持久化沙箱、自动化、WebUI | 团队协作、自动化运维 | Rust 后端 + WebUI；**用户级沙箱 + 托管代理**；自动化的 run-now 与手动触发 |
| **LobsterAI** | 桌面客户端体验、文件预览 | 中文用户、桌面场景 | 网易有道团队；Electron 桌面端 + 设置中心 + 文件卡片/分屏预览 |
| **CoPaw** | 全功能 Agent + Hub 多用户 | 中文用户、团队部署 | Python；支持钉钉/QQ/飞书群聊；Sidecar 打包（qwenpawmail）；Hub 多用户 |
| **Moltis** | 极简、单二进制部署 | 轻量用户、私有化部署 | **Rust 单包** + WASM + 内存数据库（Vault）；有安全漏洞响应最佳实践 |
| **ZeroClaw** | WASM 插件安全模型 | 安全敏感企业、核心开发者 | **Rust + WASI 插件系统**；ADR 驱动架构决策；SSRF/NAT64/出口策略纵深防御 |

---

## 6. 社区热度与成熟度

### 第一梯队：快速迭代期（新功能密集 + 社区驱动强）
| 项目 | 特征 |
|------|------|
| **OpenClaw** | 日更新量第一，PR 合并 141 条/日；处于功能丰富与稳定性拉锯的关键阶段 |
| **NanoClaw** | core-team 密集修复 add-* 系列（一天 7 个修复 PR）；正在为下一版本做全面审计 |
| **CoPaw** | 社区"报修+修复"自循环（用户报告 Issue 隔天即出 PR）；连续发布 beta 版本 |

### 第二梯队：质量巩固期（架构推进 + 治理优先）
| 项目 | 特征 |
|------|------|
| **IronClaw** | Epic 分层清晰，修复与合并节奏健康（14 合并/33 更新）；CI 稳定性作为第一优先级 |
| **ZeroClaw** | RFC 流程成熟（Revision 1-3 驱动），架构决策文档化（ADR-014）；代码质量治理（anti-slop tracker）启动 |
| **NanoBot** | 社区贡献活跃，bug 当天修复率高（#5454→#5455）；Provider 多元化推进 |

### 第三梯队：维护模式/观察期
| 项目 | 特征 |
|------|------|
| **Hermes Agent** | 修复产出高但合并通道拥堵（48 PR 待合并），"产出-落地"脱节需引起关注 |
| **PicoClaw** | 重大合并（#1158、#423）达成但新增问题响应减慢（3 个 Issue 均 stale） |
| **LobsterAI** | 功能迭代持续但社区参与度低（多为 stale 条目批量更新） |
| **Moltis** | 小体量但安全和合并效率高，处于"小而稳"状态 |

### 无活动项目
NullClaw、TinyClaw、ZeptoClaw 过去 24 小时无任何 GitHub 活动，提示生态分层正在加剧。

---

## 7. 值得关注的趋势信号

### 趋势 1：Agent 自主性 vs 人工门禁的拉锯战
Hermes Agent（#91202 内存/技能审批流）、ZeroClaw（#7155 高风险命令三级策略）、IronClaw（run gates）三个项目同日在推进 Agent 行为受控化。**信号意义：** 生态正在从"无条件信任 Agent"转向"分级授权、关键操作需人工确认"的路线。对开发者而言，审批框架将是下一轮增长的标配能力。

### 趋势 2：成本可见性成为硬需求
OpenClaw（#42475 网关级成本上限）、Hermes（Codex 周配额耗尽）、IronClaw（#3270 token usage 显示）、ZeroClaw（#9713 token 会计暴露）——**成本不是"事后统计"，而是调用前强制执行的预算控制**。这标志着开源 Agent 从实验工具转向生产载荷的临界点已到。

### 趋势 3：Provider 兼容性成为生态护城河
NanoBot 新增 SenseNova（商汤）与 Vertex 支持、PicoClaw 合并 Anthropic 原生 API 协议、OpenClaw 修复 Vertex/Gemini 回归（已拖 168 天）——**谁能接入更多模型，谁就能在模型快速迭代期存活**。对开发者而言，项目对 Provider 兼容层的维护响应速度是选择依据。

### 趋势 4：持久化与状态管理是最大"隐形债务"
Hermes（state.db 8 天 3 次损坏）、CoPaw（envs.json 覆写 + history.db 至 7.6GB）、ZeroClaw（#10068 上下文被强制截断）、OpenClaw（SQLite 快照一致性与 transctipt 竞态）——**所有中大型项目都在同一天报告持久化相关事故**。这不是巧合，而是 Agent 长期无人值守运行场景下暴露的系统性缺陷。对开发者的启示：状态管理设计需在项目早期做容错演练。

### 趋势 5：Windows 仍是"二等公民"
Hermes（更新链路 7+ 个 Issue）、ZeroClaw（TaskDialogIndirect 缺失、#7910 测试覆盖待办）、CoPaw（大量 Windows 11 报告）、Moltis（PR #468 积压 5 个月）——**Windows 生态支持仍是全行业的共同短板**。桌面端用户基数不可忽视，这将是下一轮差异化竞争的机会窗口。

### 趋势 6：合并带宽是生态的整体瓶颈
OpenClaw 359 个 PR 待合并、Hermes 48 个、ZeroClaw 48 个、NanoClaw 35 个——**修复已产出但未进入主线**是当前生态最大的系统性风险。对维护者的建议：将 "merge time" 作为 KPI，而非仅关注 PR 提交量。

---

**免责声明：** 本报告基于 2026-08-21 当日 GitHub 数据快照生成，部分项目数据粒度不同，对比仅供参考。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-21

**项目健康度：高** — 24小时内PR活动频繁（29条），Bug修复与功能开发并进，社区参与度活跃。


## 1. 今日速览

过去24小时内，NanoBot 项目保持着高度活跃的社区参与度：涌现了 **29 条 PR**（12 条已合并/关闭，17 条待合并）和 **5 条 Issue 更新**。项目当前处于 **Bug 修复与防御性加固** 与 **新 Provider 集成** 双线并行推进阶段，社区贡献者覆盖面广，但尚无新版本发布。值得关注的是，streaming 重试逻辑相关 Bug（#5454）在一天内就获得了修复 PR（#5455），维护响应速度令人满意。


## 2. 版本发布

过去24小时无新版本发布。


## 3. 项目进展

今日合并/关闭了 12 条 PR，以下为代表性进展：

- **#5240 [已关闭] refactor(webui): unify floating controls** — 重构 WebUI 浮层控件，统一了命令菜单、富面板和搜索结果选择器的交互语义（Menu/Popover/Combobox）。技术债消减，为后续 UI 扩展铺平道路。 [链接](https://github.com/HKUDS/nanobot/pull/5240)
- **#5452 [已关闭] feat(tui): print resume command on exit** — TUI 退出时打印可一键复会的 `nanobot agent --session websocket:<id>` 命令，显著改善终端会话恢复效率。 [链接](https://github.com/HKUDS/nanobot/pull/5452)
- **#1203 [已关闭] fix(cli): workaround 'Event loop is closed' on linux (issue #550)** — 修复了 Linux/Python 3.11 下关闭时的 `RuntimeError`，虽是 2 月的 PR，但今日被关闭，说明可能被合并至主分支。针对长存 CLI Bug 的修复值得肯定。 [链接](https://github.com/HKUDS/nanobot/pull/1203)


## 4. 社区热点

今日热度最高的是围绕 **Provider 崩溃/异常处理边界** 的一系列修复，反映出社区对生产环境稳定性的高度关注：

- **#5455 [OPEN] fix(provider): retry Codex server_error**（关联 Issue #5454）— 针对 OpenAI Codex streaming 中途 `server_error` 不重试的问题提供了修复方案。**当天提 Bug 当天提修复**，展现社区极高的响应效率。用户 `akinolur` 同时承担了报告者与修复者双重角色，是其深度用户。 [链接](https://github.com/HKUDS/nanobot/pull/5455)

- **#5444 [OPEN] [bug] Failed to login OpenAI via OAuth in Docker** — Docker 环境下 OpenAI OAuth 登录失败，是典型的配置/环境问题，因涉及基础功能敏感度高。 [链接](https://github.com/HKUDS/nanobot/issues/5444)

- **#5457 [OPEN] fix(channels): scope dispatcher exception boundary to message processing** — 修复了 `ChannelManager._dispatch_outbound` 因单条消息异常而整个后台发送任务停止的根因问题。这是影响消息可达性的重要修复。 [链接](https://github.com/HKUDS/nanobot/pull/5457)


## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 状态 | 说明 |
|---|---|---|---|
| 高 | [#5454 Bug: streaming 中途 server_error 跳过重试](https://github.com/HKUDS/nanobot/issues/5454) | OPEN + [修复 PR #5455](https://github.com/HKUDS/nanobot/pull/5455) | 已流式输出部分内容后遇到 Codex `server_error` 事件不触发重试，直接影响长对话体验。修复 PR 当天即提交。 |
| 高 | [PR #5457 dispatcher 异常导致消息停发](https://github.com/HKUDS/nanobot/pull/5457) | OPEN | 单条出站消息处理异常即终止后台分发任务，此修复将异常边界限制在单条消息内。 |
| 中 | [#5444 Docker 下 OpenAI OAuth 登录失败](https://github.com/HKUDS/nanobot/issues/5444) | OPEN | 需等待更多上下文，可能与 Docker 网络/端口映射相关，暂无修复 PR。 |
| 中 | [#5425 socks:// 代理 URL 不支持](https://github.com/HKUDS/nanobot/issues/5425) | CLOSED | 已修复并关闭，兼容自定义 provider 的 `socks://` 代理别名。 |
| 低 | [PR #5458 Matrix 错误日志缺上下文](https://github.com/HKUDS/nanobot/pull/5458) | OPEN | Loguru printf-style `%s` 与 `{}` 混用导致诊断信息缺失，修复属维护性改进。 |


## 6. 功能请求与路线图信号

- **#5459 [OPEN] 请求原生 Google Vertex AI Provider（Claude 模型）** — 用户指出 Nanobot 已支持 Anthropic/OpenAI/Azure/Bedrock/Copilot 等，但缺少 Vertex AI 的原生支持。此需求若被认可，可能会作为 **“new-provider”** 类别被引入。 [链接](https://github.com/HKUDS/nanobot/issues/5459)

- **PR #5453 [OPEN] feat(providers): add SenseNova（商汤日日新）provider** — 社区已自主贡献 SenseNova 原生 Provider（OpenAI 兼容端点），支持 `sensenova-6.8-flash-lite`、`deepseek-v4-flash`、`glm-5.2` 三个模型。结合 #5459 的信号，NanoBot 正在向 **更多区域化/多元化 LLM 提供商** 拓展，这可能是下一版本的重点方向之一。 [链接](https://github.com/HKUDS/nanobot/pull/5453)

- **PR #5387 [OPEN] feat(telegram): support reusable sticker replies** — Telegram 渠道支持可复用 Sticker 回复，属于渠道体验增强类功能。 [链接](https://github.com/HKUDS/nanobot/pull/5387)


## 7. 用户反馈摘要

- **Streaming 容错需求强烈**：Issue #5454 及关联 PR #5455 表明用户在实际使用中重度依赖 streaming 输出，且对中途 `server_error` 导致的静默失败容忍度低。用户希望“已输出的内容可保留，未完成的部分可自动重试恢复”。
- **远程文件下载安全受关注**：PR #5414 对 Slack 文件下载的跨重定向安全校验进行加固，反映出用户对 **不可信远程输入（恶意 URL 重定向）** 的安全担忧。
- **进程内日志可观测性**：PR #5412（网关子进程日志刷盘）修复了“后台进程启动信息丢失”的问题，对应了用户排查启动故障时“日志里什么都没有”的真实困扰。
- 整体而言，社区反馈以 **专业性技术细节** 为主，体现出用户多为深度开发者，对 Provider 错误处理、SDK 迁移、OAuth 存储等底层机制的稳定性有明确期待。


## 8. 待处理积压

| 项目 | 类型 | 持续时长 | 备注 |
|---|---|---|---|
| [#5179 MCP SDK v2 迁移（含旧版兼容）](https://github.com/HKUDS/nanobot/pull/5179) | PR（P1，冲突） | 22 天 | 核心依赖升级，涉及面广，长期未合并。另有更保守的备选方案 #5180 仍在开放式评估中，建议维护者推进决策以求闭环。 |
| [#5420 feat(webui): 回合可观测性与安全恢复](https://github.com/HKUDS/nanobot/pull/5420) | PR | 3 天 | WebUI 交互逻辑大改，包含中间产物展示与恢复机制，需重点审查以确保不引入回归。 |
| [#5379 fix(memory): 保留完整合并输入](https://github.com/HKUDS/nanobot/pull/5379) | PR（冲突） | 8 天 | 涉及记忆合并流程数据完整性，已标记冲突，需 rebase 后方可合并。 |
| [#5338 fix(mcp): OAuth 存储读失败时保留凭据](https://github.com/HKUDS/nanobot/pull/5338) | PR（冲突） | 10 天 | 涉及凭据安全，若不修复可能导致多服务间凭据串写覆盖，建议尽快处理冲突并推进合并。 |
| [#5447 付费安全扫描 MCP 集成（ScanPay x402）](https://github.com/HKUDS/nanobot/issues/5447) | Issue | 2 天 | 商业化的 x402 微支付安全扫描服务集成提案，需维护者评估是否符合项目生态方向。 |

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-21

## 1. 今日速览

过去 24 小时项目保持高度活跃，共产生 50 条 Issue 更新和 50 条 PR 更新，其中新开/活跃 Issue 44 条、待合并 PR 48 条。值得关注的是，**Windows 桌面应用更新链路（`hermes update` / `hermes desktop`）已成为当前最突出的稳定性短板**，今日仅该主题相关 Issue 便达 6 条以上（#83846、#86443、#44225、#90829、#90134、#91021），且多为 P1/P2 级别的重复性报告，其中 #83846（ZIP 回退删除桌面应用）已积累 13 条评论，社区反馈热度持续走高。此外，`state.db` 会话持久化损坏问题也出现多起事件（#89293 在 8 天内发生 3 次损坏），构成另一条高危稳定性线索。版本层面，今日无新 Release 发布；PR 侧合并/关闭仅 2 条，大量 PR 仍在排队审查，合并带宽可能成为瓶颈。


## 3. 项目进展

> 注：今日无新版本发布，故省略"版本发布"章节。

今日 50 条 PR 中仅有 2 条被合并/关闭，且从数据中未提取到明确的合并记录。可以确认的是，所有标注为关键修复的 PR 均处于**待合并状态**，包括：

- **[PR #91122] fix(agent): cap runaway delegation and fail closed on Codex stop** — 修复 CLI review/delegation 无节制循环耗尽会话及 Codex 周配额的问题，使 `max_subagents` 从每轮重置改为受控上限，并在 stop/supersede 时 fail-closed。涉及会话状态、消息投递、兼容性、计费等多个风险域，是今日影响面最广的 PR。
- **[PR #91210] fix(logging): recover from POSIX rollover backup races** — 针对 #27649 遗留的 `RotatingFileHandler.doRollover()` 并发竞争问题，修复多进程下 `errors.log.1` 被移动后另一进程 `os.rename` 找不到源文件导致的崩溃。
- **[PR #91162] fix(kanban): defer manual reclaim until worker termination is proven** — 修复 Kanban 手动回收（reclaim）在 worker 及其子进程仍存活时释放任务 claim 的竞态，避免原 worker 在任务被回收后继续执行。
- **[PR #90883] security: restore session write and self-improvement enforcement** — 安全加固 PR，在 `main` 分支上恢复 Phase2 的会话写入和自改进/后台审查边界执行层。

此外，**[PR #91206]**（Kanban worker 在 provider 限流/超时/服务端错误时返回可重试退出码）、**[PR #91208]**（修复 `active_pr` 重生守卫吞掉 reviewer 反馈）、**[PR #91197]**（修复恢复会话时 cwd 优先级不一致）也均待合并。**项目整体修复产出量可观，但合并通道明显拥堵，大量关键修复未进入主干。**


## 4. 社区热点

### 4.1 最高讨论量：技能索引自动巡检告警（#66616，66 条评论）

- **链接：** [NousResearch/hermes-agent Issue #66616](https://github.com/NousResearch/hermes-agent/issues/66616)
- **状态：** OPEN | P3 | `skills-index-watchdog` | 更新于 2026-08-21
- **详情：** 自动化巡检发现 `/docs/api/skills-index.json` 统一索引已过期 29.8 小时（上限 26 小时），状态降级为 `degraded`。该文件由 `.github/workflows/skills-index.yml`（cron 6/18 UTC）重建，当前管道疑似阻塞。
- **用户诉求：** BOT 自动上报的管道健康问题，66 条评论说明该问题已多次出现，社区关注的是 CI/CD 管道为何未能准点完成任务，以及索引过期对依赖 Skills Hub 文档的开发者造成的实际影响。

### 4.2 Windows 桌面更新链路：多重 Bug 叠加，社区呼声最高

| Issue / PR | 标题 | 优先级 | 评论 | 链接 |
|---|---|---|---|---|
| #83846 | ZIP 回退删除构建好的桌面应用，后续更新报告 Already up to date | P1 | 13 | [链接](https://github.com/NousResearch/hermes-agent/issues/83846) |
| #86443 | hermes update 删除打包桌面应用，重建失败仍退出码 0 | P1 | 6 | [链接](https://github.com/NousResearch/hermes-agent/issues/86443) |
| #44225 | hermes update 在 Electron 重建失败时销毁 Hermes.exe，快捷方式成死链 | P2 | 5 | [链接](https://github.com/NousResearch/hermes-agent/issues/44225) |
| #90829 | 日常桌面更新失败 — fail-closed get-windows 门禁 + node_modules 损坏 | P2 | 3 | [链接](https://github.com/NousResearch/hermes-agent/issues/90829) |
| #90134 | hermes desktop 构建失败 blockmap.js | P2 | 3 | [链接](https://github.com/NousResearch/hermes-agent/issues/90134) |
| #91021 | 应用内更新后重连 WSL 后端失败 | P2 | 2 | [链接](https://github.com/NousResearch/hermes-agent/issues/91021) |

**核心诉求拆解：** 社区反馈高度集中在 "更新流程破坏了用户现有可用环境" 这一痛点——当桌面重建失败时，用户失去的不只是新版本，而是**整个 Hermes 桌面入口**。多个报告指出 `hermes update` 在退出码为 0 时实际并未成功，导致用户误以为更新成功、即使重试也因 "Already up to date" 而无法自愈。值得注意的是，此类问题在同一代码路径上已出现至少 4 个不同报告（#83846、#86443、#44225、#90829），且分别在不同日期创建，说明该问题具有较高的复现性，持续影响真实用户。相关修复 PR（#85997 门控 Node 版本）仍待合并。


## 5. Bug 与稳定性

### 5.1 P0 — 高危

- **[#90971] apply_anthropic_cache_control 不具备幂等性（后经调查结论相反）** — [链接](https://github.com/NousResearch/hermes-agent/issues/90971) — 该 issue 已更正：两个 overflow 场景经 @jackulau 与 @andrexibiza 独立验证后确认 **不可达**，`_apply_anthropic_cache_control` 当前实现不存在负切片风险。**结论：非 Bug。**

### 5.2 P1 — 高

- **[#83846] ZIP 回退删除构建好的桌面应用，且后续更新报告 Already up to date** — [链接](https://github.com/NousResearch/hermes-agent/issues/83846) — Windows 上更新流程的 ZIP 回退路径在桌面构建失败后删除了现有桌面应用，之后的更新因版本未变化而被跳过。**无 fix PR。**
- **[#86443] hermes update 删除桌面应用但退出码为 0** — [链接](https://github.com/NousResearch/hermes-agent/issues/86443) — 更新重建失败时未返回非零退出码，用户无法感知失败。**无 fix PR。**
- **[#85079] state.db 并发 WAL 追加竞争导致 NULL exception** — [链接](https://github.com/NousResearch/hermes-agent/issues/85079) — 子代理并发写入时，会话持久化间歇性失败，归类为 `unknown` 而非 `locked`/`disk`。**无 fix PR。**
- **[#89293] 8 天内 3 次 state.db 损坏（繁忙单主机部署）** — [链接](https://github.com/NousResearch/hermes-agent/issues/89293) — 生产环境在 2026-08-10/16/17 三次损坏，每次需离线 `.recover` 重建。报告完整记录了因果链，包括锁竞争 + 重启窗口 + 升级后 `journal_mode` 被静默改回 WAL。**无 fix PR。**
- **[#90477] 桌面 SSH 远程连接上切换 profile 竟拉起本地后端** — [链接](https://github.com/NousResearch/hermes-agent/issues/90477) — 通过 SSH 连接远程主机时切换 profile，实际在本地启动了新后端，断开原有 SSH 连接并重连到另一台主机。**无 fix PR。**

### 5.3 P2 — 中（Windows 桌面链路集中爆发）

- **[#90829]** 日常桌面更新失败（fail-closed get-windows 门禁 + node_modules 损坏）— [链接](https://github.com/NousResearch/hermes-agent/issues/90829) — 无 fix PR。
- **[#73379]** `hermes update` 永久孤儿化非 systemd 看护的 dashboard（tmux 循环被误杀）— [链接](https://github.com/NousResearch/hermes-agent/issues/73379) — 无 fix PR。
- **[#89857]** PowerShell Constrained Language Mode 下安装失败 — [链接](https://github.com/NousResearch/hermes-agent/issues/89857) — 已有 **[PR #90128](https://github.com/NousResearch/hermes-agent/pull/90128)**（仅使失败信息可读，不解决安装）与 **[PR #91196](https://github.com/NousResearch/hermes-agent/pull/91196)**（前置清晰报错，均 Ref #89857 而非 Fix）。
- **[#89807]** 新版 Windows 上 `schtasks` 拒绝 "/IT cannot be used with /NP" — [链接](https://github.com/NousResearch/hermes-agent/issues/89807) — 无 fix PR。
- **[#82309]** 系统 Node 先于托管 Node 时 ERR_REQUIRE_ESM — [链接](https://github.com/NousResearch/hermes-agent/issues/82309) — 无 fix PR。
- **[#90134]** `hermes desktop` 构建失败 blockmap.js — [链接](https://github.com/NousResearch/hermes-agent/issues/90134) — 无 fix PR。
- **[#91153]** 模型在全新工具结果上叙述过期列表项 — [链接](https://github.com/NousResearch/hermes-agent/issues/91153) — 上下文混合导致摘要失真。**无 fix PR。**
- **[#90493]** 会话持久化失败吞掉真实 SQLite 错误 — [链接](https://github.com/NousResearch/hermes-agent/issues/90493) — 粗粒度三值分类导致损坏被掩盖。**无 fix PR。**
- **[#90795]** @assistant-ui/tap 中 useSyncExternalStore 重入导致 Maximum update depth — [链接](https://github.com/NousResearch/hermes-agent/issues/90795) — 每次流式更新均触发。**无 fix PR。**

### 5.4 稳定性模式总结

今日 Bug 报告呈现两个高置信度模式：
1. **Windows 桌面更新链路系统性脆弱**：累计 7+ 个独立 Issue、多个 P1，根因集中在更新流程非事务性——先删后建，失败不回滚、不报错。已有 [PR #85997](https://github.com/NousResearch/hermes-agent/pull/85997)（门控 Node 版本）待合并，但均未触及根本的 "单一日志事务性部署计划" 架构（见 #88683）。
2. **state.db 会话持久化在并发场景下可靠性不足**：连续 3 个 Issue（#85079、#89293、#90493）指向同一子系统，涉及锁竞争、journal_mode 回退、错误吞没。用户群体需要手动重建数据库，数据丢失风险较高。


## 6. 功能请求与路线图信号

### 6.1 可能被纳入下一版本

- **[#91202] 内存/技能修改审批流** — [链接](https://github.com/NousResearch/hermes-agent/issues/91202) — 用户希望类似 `approvals.mode` 的机制覆盖 agent 对 memory 和 skills 的写操作。当前 agent 可自主写入 memory 并创建/修改技能，实现层面与现有审批框架天然兼容，且与 [PR #90883](https://github.com/NousResearch/hermes-agent/pull/90883)（恢复 session write 和 self-improvement 强制）的安全加固方向一致。

- **[#91204] 桌面端账户资源与网关指标控制面板（PR）** — [链接](https://github.com/NousResearch/hermes-agent/pull/91204) — 新增 `system.resources`（CPU/内存/磁盘/主机名）和 `account.usage`（脱敏的 provider 配额窗口与用量百分比）RPC。当前为 "Prototype"，但已具备完整实现，需要产品决策。

- **[#91149] 预览面板：远程/SSH 后端时路由 localhost 开发服务器** — [链接](https://github.com/NousResearch/hermes-agent/issues/91149) — 当桌面连接远程后端时，预览面板中的 `localhost` 应解析到 agent 后端而非用户本地。已被标记为 **duplicate**，说明已有类似提案或实现计划。

- **[#88683] 安装/更新/引导遵循单一事务性部署计划** — [链接](https://github.com/NousResearch/hermes-agent/issues/88683) — 用户提出需要 "single source of truth" 来消除部署漂移。这是对今日 Windows 更新问题群的架构级回应，影响面大但实施成本高。

### 6.2 趋势解读

今日功能请求中最值得关注的是 **"审批/门禁" 类需求**（#91202、[PR #90883](https://github.com/NousResearch/hermes-agent/pull/90883)、[PR #91211](https://github.com/NousResearch/hermes-agent/pull/91211) 保持 needs-input 人工门禁）。社区对 agent 自主行为边界的关注度正在上升，预计后续版本会增加更多面向人工监督的控制面。**值得注意的是，所有功能请求类 PR（#91204）与 Bug 修复类 PR 一样，今天均未进入合并通道。**


## 7. 用户反馈摘要

- **最严重的用户痛点集中在 Windows 桌面更新体验**。来自 #83846 的 @ArcGG33 报告："桌面应用静默消失。开始菜单和桌面快捷方式仍然存在，但指向一个已被删除的 Hermes.exe"。来自 #44225 的 @leakey0412 描述了同样问题。**用户的共同失望点在于 Hermes 在失败时仍报告成功（退出码 0），且未提供任何恢复路径**。来自 #86443 的 @ameniki 明确指出 "hermes update 可以修复此问题并确保 update 的退出码不撒谎是最重要的"。

- **state.db 的反复损坏导致用户经历长达数小时的手动恢复**。来自 #89293 的 @zhanglingfei112 详细记录了三起损坏事件的完整日志链路，并指出每次都需要离线 `.recover` 重建、丢失部分数据——这已对生产使用造成实质影响。

- **来自 #91153 的 @usefulish 对模型输出质量表达了失望**：模型在拿到全新工具结果后仍然混入旧上下文中的列表项进行叙述，"工具结果是正确的，但模型对它的描述是错误的"，说明会话上下文管理仍存在缺陷。

- **一项积极的反馈**：来自 #91160 的 PR（修复桌面列表设置中的逗号保存）由用户 @huklaa 直接提交并附带测试，说明社区已有部分用户开始主动贡献修复，项目存在向用户共建演进的积极信号（但该 PR 同样尚未合并）。


## 8. 待处理积压

| 编号 | 类型 | 标题 / 摘要 | 优先级 | 标签 | 持续时间 | 链接 |
|---|---|---|---|---|---|---|
| #32678 | Issue | GCP Vertex AI 通过 `gcp` / `rest` 驱动返回 404，curl 成功 | P2 | `area/config` | 自 2026-05-26 起 87 天 | [链接](https://github.com/NousResearch/hermes-agent/issues/32678) |
| #27649 | Issue | 多进程日志轮转后继续写入 agent.log.N 文件 | P2 | `sweeper:implemented-on-main` | 自 2026-05-17（已关闭，修复在 main 上但**修复 PR #91210 尚未合并**） | [链接](https://github.com/NousResearch/hermes-agent/issues/27649) |
| #44225 | Issue | `hermes update` 销毁 Electron 桌面应用（Windows） | P2 | Windows / install-update | 自 2026-06-11 起 71 天 | [链接](https://github.com/NousResearch/hermes-agent/issues/44225) |
| #66616 | Issue | Skills index 过期（机器人巡检） | P3 | `skills-index-watchdog` | 66 条评论，持续 1 个月以上 | [链接](https://github.com/NousResearch/hermes-agent/issues/66616) |
| #91175 | PR | fix(browser-use): 加固 CLI 3 单工具运行时 | P3 | `blocked` | 今日新开即被标记 blocked（可能与依赖阻塞有关） | [链接](https://github.com/NousResearch/hermes-agent/pull/91175) |


> ⚠️ 重点提醒：今日所有关键修复 PR（#91122、#91210、#91162、#91211、#90883、#91196、#91209 等）均处于待合并状态，48 条 PR 堆积可能导致修复延迟进入主线，加剧用户在 Windows 更新与 state.db 损坏等已存在问题上持续受损的风险。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

**日期**: 2026-08-21  
**数据来源**: github.com/sipeed/picoclaw  

---

## 1. 今日速览

项目在过去24小时内保持中等活跃度：共收到3条Issue更新和8条PR更新。值得关注的是，两个重大功能的PR——#1158（Anthropic原生API协议支持）和#423（多智能体协作框架）已关闭合并，标志着项目在API兼容性和Agent能力方面取得关键进展。当前有5个依赖更新PR待合并，均为go依赖的例行升级，无重大风险。值得注意的是，所有3条活跃Issue均已被标记为`stale`（48小时内无实质性进展），社区讨论热度有所下降，需关注维护响应时效。

---

## 3. 项目进展

### 🎉 合并的重要PR

**#1158 - feat: add anthropic-messages protocol for native Anthropic API format**  
- 已关闭/合并 | 作者: hyperwd | 创建于 2026-03-06  
- **解决的问题**: 长达近半年的PR终于落地，解决了Issue #269——部分Anthropic兼容代理服务仅支持原生Messages API格式（`/v1/messages`端点）的问题。  
- **影响**: 新增`anthropic-messages`协议前缀，可动态适配Anthropic原生API与OpenAI兼容格式，显著扩大了可接入的模型供应商范围。  
- 🔗 [PR #1158](https://github.com/sipeed/picoclaw/pull/1158)

**#423 - WIP: feat: base multi-agent collaboration framework & shared context**  
- 已关闭/合并 | 作者: Leeaandrob | 创建于 2026-02-18  
- **核心能力**: 构建多智能体协作基础框架，包含：
  - **Blackboard** — 线程安全共享上下文池
  - Agent handoff（智能体交接）机制
  - Discovery tools（智能体发现工具）
- **依赖基础**: 基于此前合并的 #213（provider协议重构）和 #131（模型fallback链+多智能体路由）  
- **影响**: 这是PicoClaw在Agent编排能力上的里程碑式PR，为后续构建复杂Agent协作工作流奠定了基础。  
- 🔗 [PR #423](https://github.com/sipeed/picoclaw/pull/423)

**#3318 - fix(web): repair unparseable pnpm-lock.yaml**  
- 已关闭/合并 | 作者: nuestraai | 创建于 2026-08-05  
- **修复**: Web前端`pnpm-lock.yaml`中`semver@7.8.5`重复映射键问题，该问题导致`ERR_PNPM_BROKEN_LOCKFILE`，使前端无法正常安装依赖。  
- 🔗 [PR #3318](https://github.com/sipeed/picoclaw/pull/3318)

---

## 4. 社区热点

### Issue #3281 - Web UI输入延迟（🔥 最热门讨论）

- **状态**: OPEN | 创建于 2026-07-21 | 评论数: 6 | 👍 1  
- **核心问题**: 在Web UI中，当会话历史稍长时，输入框出现明显卡顿。  
- **用户反馈**: 一位用户评论回复表示复现成功，确认不是网络延迟，而是纯前端渲染性能问题。  
- **当前分析**: 已持续一个月未解决，可能涉及DOM渲染性能优化或虚拟滚动实现，问题复杂度较高。  
- 🔗 [Issue #3281](https://github.com/sipeed/picoclaw/issues/3281)

### 依赖更新PR群（5个待合并）

dependabot在8月13日批量提交了5个Go依赖升级PR，涉及：
- `aws-sdk-go-v2` (+1.43.4) 及子模块 `config`、`bedrockruntime`
- `anthropic-sdk-go` (1.55.1 → 1.62.0)
- `mautrix` (0.27.0 → 0.29.0)

虽然均已标记`stale`，但依赖更新是保持项目安全性的重要操作，建议维护者尽快处理。  
🔗 [PR #3332](https://github.com/sipeed/picoclaw/pull/3332) | [#3333](https://github.com/sipeed/picoclaw/pull/3333) | [#3334](https://github.com/sipeed/picoclaw/pull/3334) | [#3335](https://github.com/sipeed/picoclaw/pull/3335) | [#3336](https://github.com/sipeed/picoclaw/pull/3336)

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🟡 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI输入延迟，会话历史较长时（约20+条消息）出现明显卡顿 | 无fix PR，已开一个月 |
| 🟢 低 | [#3318](https://github.com/sipeed/picoclaw/pull/3318) | pnpm-lock.yaml重复映射键导致前端无法安装依赖 | ✅ 已修复并合并 |

未有崩溃级（🔴）或严重安全漏洞报告，整体稳定性较好。

---

## 6. 功能请求与路线图信号

| Issue/PR | 功能请求 | 分析 |
|----------|---------|------|
| [#3331](https://github.com/sipeed/picoclaw/issues/3331) | 支持任意`/audio/transcriptions`端点的ASR模型，不仅限于`*-whisper-*` | 🎯 高可行。作者建议添加`whisper-transcription`标志在model/voice配置中强制选择Whisper路径。当前Whisper模型可能是旧版且速度较慢，扩展支持可提升语音功能体验。下一版本纳入可能性较高。 |
| [#3330](https://github.com/sipeed/picoclaw/issues/3330) | `delegate`、`spawn`和`subagent`工具支持动态指定模型 | 🎯 高价值。当前模型静态绑定于`config.json`或主Agent的`defaultModel`，限制了灵活性和场景适配。结合刚合并的#423多Agent框架，这一需求可能成为下一阶段重点方向。 |

---

## 7. 用户反馈摘要

**来自 Issue #3281 讨论区（6条评论）**：  
- 用户确认该问题在PicoClaw 0.3.1版本上真实存在，并提供了详细的复现步骤
- 有开发者指出问题可能出在历史消息的DOM重渲染机制上，建议引入虚拟列表或增量渲染策略
- 与后端性能无关，纯前端渲染瓶颈（用户已排除网络延迟因素）

**用户痛点模式识别**：  
- Web UI历史会话的渲染效率是一个基础体验问题
- 多智能体功能虽然刚合并框架，但具体使用场景仍缺乏文档和配置示例

---

## 8. 待处理积压

| 项目 | 类型 | 年龄 | 备注 |
|------|------|------|------|
| [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Bug Issue | **31天** | Web UI输入滞后问题，已有用户确认+方案讨论，但无PR跟进 |
| [#423](https://github.com/sipeed/picoclaw/pull/423) | PR WIP | **184天** | 多Agent框架PR已合并，但标记为WIP状态，后续完善工作尚未开展 |
| [#1158](https://github.com/sipeed/picoclaw/pull/1158) | 旧PR | **168天** | 已合并的协议适配PR，建议维护者跟进确认无回归风险 |
| 5个依赖PR | 依赖升级 | **8天** | `stale`标记已出现，需维护者手动推进合并或关闭 |

> ⚠️ **特别提醒**: 所有3个活跃Issue（#3281、#3330、#3331）和5个PR（#3332-3336）均已被标记为`stale`，说明项目维护响应可能有所拖延。建议项目Owner关注此信号，避免社区贡献热情因响应过慢而流失。

---

*报告生成时间: 2026-08-21 | 数据窗口: 24h (2026-08-20 ~ 2026-08-21)*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报

**日期**: 2026-08-21  
**数据周期**: 2026-08-20 ~ 2026-08-21  
**数据来源**: github.com/qwibitai/nanoclaw

---

## 1. 今日速览

NanoClaw 今日活跃度**极高**。过去 24 小时内产生 50 条 PR 更新（待合并 35 条），其中约 20 条为今日新开，且绝大多数带有 `core-team` 标签，显示核心团队正在集中攻坚。值得关注的是，`gavrielc` 与 `zvi-fried` 两位维护者密集提交了一批针对 **add-* 系列安装技能（skill）的系统性修复与审计**（#3414-#3422），围绕安装作用域隔离、配置热加载、依赖兼容性展开。与此同时，Issue 侧报告了 1 个**高危 Bug**（#2715：WhatsApp 媒体文件无法被 agent 访问）和 2 个行为逻辑 Bug（#3369、#2606）。无新版本发布，项目正处于**大版本迭代前夜的密集修复期**。

---

## 2. 版本发布

过去 24 小时无新版本发布。但大量的 `core-team` 修复 PR（见下文）正在为下一版做准备，建议关注未来 1-2 周内的版本节奏。

---

## 3. 项目进展

今日合并/关闭了 15 个 PR，以下为关键项：

| PR | 标题 | 状态 | 类型 | 说明 |
|----|------|------|------|------|
| [#3421](https://github.com/qibitai/nanoclaw/pull/3421) | docs+setup: announce one-click Slack agents | ✅ 已关闭 | 文档/Setup | 推进**一键部署 Slack agent**的文档与公告层，为即将合并的 #3404 铺路 |
| [#1311](https://github.com/qibitai/nanoclaw/pull/1311) | Feature: create new session | ✅ 已关闭 | 功能 | 历经 5 个月终于合并，补上会话创建的核心功能 |

**24 小时内新开的 PR 中，最值得关注的一波集群**（均由 `gavrielc` 提出，部分入队等待审查）：

| PR | 标题 | 核心修复 |
|----|------|---------|
| [#3414](https://github.com/qibitai/nanoclaw/pull/3414) | fix(add-clidash) | 修复刷新扇出轰炸：2 vCPU 主机上 27/29 个并发进程超时 |
| [#3415](https://github.com/qibitai/nanoclaw/pull/3415) | fix(add-atomic-chat-tool) | 配置面失效：环境变量从不从 `.env` 注入 |
| [#3416](https://github.com/qibitai/nanoclaw/pull/3416) | fix(add-ollama-tool) | 同类配置死区问题，改用每组 `container_configs` MCP seam |
| [#3417](https://github.com/qibitai/nanoclaw/pull/3417) | fix(add-dashboard) | 补充 REMOVE.md、便携 SQL、关闭布线 |
| [#3418](https://github.com/qibitai/nanoclaw/pull/3418) | fix(add-tavily-tool) | 烟雾测试静默失败 + 幂等移除 + 缺少防护 |
| [#3419](https://github.com/qibitai/nanoclaw/pull/3419) | fix(add-anydoc) | 多实例主机上 `ncl` 解析错乱导致误重启 |
| [#3420](https://github.com/qibitai/nanoclaw/pull/3420) | fix(add-macos-statusbar) | Swift 硬编码标签与新的 install-slug 方案冲突 |

**同时**，`zvi-fried` 也提交了 4 个关键 PR：

| PR | 标题 | 修复说明 |
|----|------|---------|
| [#3401](https://github.com/qibitai/nanoclaw/pull/3401) | fix(whatsapp-cloud) | 技能合成 main 时依赖不兼容 |
| [#3402](https://github.com/qibitai/nanoclaw/pull/3402) | fix(codex) | 修复 provider 生成文件的投递 |
| [#3403](https://github.com/qibitai/nanoclaw/pull/3403) | fix(matrix) | Node 22 下 ESM 无扩展名导入失败，改用 pnpm patch |
| [#3423](https://github.com/qibitai/nanoclaw/pull/3423) | fix(add-slack) | 缺少 `app_mentions:read` bot scope，导致事件无法订阅 |

**小结**: 这一大批 PR 表明项目正在进行 **add-* 技能的全面审计和修复**，预计合并后整体技能安装的健壮性将显著提升。

---

## 4. 社区热点

今日讨论最活跃的 Issue/PR：

- **[#2715: Inbound WhatsApp media unreachable by the agent](https://github.com/qibitai/nanoclaw/issues/2715)** — 7月19日创建，今日被重新激活并评论。这是一个**阻断级问题**：用户上传的图片/文档/音频保存到了未挂载到 agent 容器的主机目录，导致 agent 拿到不存在的 `/workspace/attachments/...` 路径。评论数 1（为今日更新）。
  - 背后的诉求：WhatsApp 渠道作为 NanoClaw 的主要渠道之一，**媒体上下文**是对话型 agent 的基本能力。该问题已开放两个多月仍未修复，社区耐心是有限的。

- **[#3369: mention-sticky engages without a mention](https://github.com/qibitai/nanoclaw/issues/3369)** — 今日新开，0 评论，但**引发了一个直接的修复 PR**
  - 描述：Slack 平台上配置 `mention-sticky` + `accumulate` 后，agent 会在从未被 @ 的线程内开始回复。`accumulate` 文档中承诺“静默存储非参与消息为上下文”，但实际触发了订阅，造成意外回复。
  - 引出的 fix PR: [#3422](https://github.com/qibitai/nanoclaw/pull/3422) —— *mention-sticky subscribes on a mention, not on a session*，由核心团队成员 `teran13` 于同一天提交，响应速度极快。

- **PR #3414 (add-clidash 刷新扇出)** 也值得关注：审计发现刷新时 fan-out 29 个并发 `bin/ncl` 进程，在 2 vCPU 主机上 27 个超时。这虽不是用户直接提出的 Issue，但暴露了技能默认配置对资源受限环境的伤害。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 标题 | 状态 | Fix PR |
|--------|-------|------|------|--------|
| 🔴 严重 | [#2715](https://github.com/qibitai/nanoclaw/issues/2715) | WhatsApp 媒体文件对 agent 不可达（未挂载目录） | 开放 2 个月+ | ❌ 无 |
| 🟠 重要 | [#3369](https://github.com/qibitai/nanoclaw/issues/3369) | mention-sticky 在未提及的情况下触发回复（Slack） | 今日新开 | ✅ [#3422](https://github.com/qibitai/nanoclaw/pull/3422) |
| 🟡 一般 | [#2606](https://github.com/qibitai/nanoclaw/issues/2606) | `engage_mode: 'always'` 静默丢弃所有消息 | 今日关闭 | 已修复 |

- **#2606 今日关闭**说明该问题已在上游修复（可在新版本中验证）。
- 一批 add-* 技能相关的 Bug 虽然没有独立 Issue，但相关修复 PR（#3414-#3420）覆盖了配置不可达、作用域错乱、进程泄漏、标签命名冲突等类别，属于**稳定性提升的关键轮次**。

---

## 6. 功能请求与路线图信号

| 来源 | 信号 | 可能纳入下一版本？ |
|------|------|-------------------|
| [#3355](https://github.com/qibitai/nanoclaw/pull/3355) + [#3356](https://github.com/qibitai/nanoclaw/pull/3356) | **新增 Cursor Agent SDK 支持**（provider + setup skill） | ✅ 大概率，`core-team` 直接提交且 `Feature` 标记 |
| [#3270](https://github.com/qibitai/nanoclaw/pull/3270) | **ncl token usage 显示** — 技能或 CLI 中展示 token 消耗 | ✅ 可能，已在 PR 形态 |
| [#3189](https://github.com/qibitai/nanoclaw/pull/3189) | **add-why** — 新增技能：向用户解释某条消息为何被处理（或忽略） | 🟡 待定，已开 16 天 |
| [#3423](https://github.com/qibitai/nanoclaw/pull/3423) | **Slack 一键创建 agent 的 scope 修复** — 意味着 Slack 集成正式化 | ✅ 结合 #3421 看，Slack 是近期重点 |
| [#1311](https://github.com/qibitai/nanoclaw/pull/1311) | **手动创建新会话的功能** | ✅ 已合并（今日关闭） |

**路线图判断**：当前迭代重点 = Slack 集成 + 新增 provider（Cursor）+ 全量 add-* 技能修补。上个月开放的 Cursor 相关 PR 仍在深入，预计在未来 1-2 周内会有版本发布。

---

## 7. 用户反馈摘要

来自 Issue 评论的公开反馈（今日活跃）：

1. **#2715 的评论者（WhatsApp 媒体问题）**：指出该问题的同时，**明确补丁预期**——期望附件目录必须挂载进 agent 容器，或至少在 session inbox 中可见。这是“身份验证之外的渠道基础设施”缺陷，直接影响生产可用性。
2. **#3369 的举报者（mention-sticky 误触）**：来自 `nilsborg`，一个“反直觉行为”报告，补充说明了 `accumulate` 与 `mention-sticky` 组合的语义冲突，语气中性但清晰地表达了“文档承诺未兑现”的不满。
3. **#2606 的举报者（engage_mode 丢弃）**：该 Issue 已关闭但体现了用户对**配置项隐含陷阱**的通用担忧——模式名与文档描述不符，造成消息静默丢失。

用户的普遍痛点集中在：**配置默认值与安装脚本的可预测性** —— 多个 add-* 技能要么配置不生效，要么默认资源消耗过高，要么安装后无法卸载，这些都是“安装体验”层面的问题，社区用户对核心维护者正在系统性修复这一点保持谨慎乐观。

---

## 8. 待处理积压

| 类型 | 编号/链接 | 问题 | 等待时间 | 备注 |
|------|-----------|------|----------|------|
| Issue | [#2715](https://github.com/qibitai/nanoclaw/issues/2715) | WhatsApp 媒体不可达 | **74 天** | 阻断级 Bug，无 PR，需立即关注 |
| PR | [#3189](https://github.com/qibitai/nanoclaw/pull/3189) | add-why 技能 | 16 天 | 功能完整，但未收到 core-team 反馈 |
| PR | [#3196](https://github.com/qibitai/nanoclaw/pull/3196) | add mount readonly 修复 | 14 天 | 已获得 `follows-guidelines` 标记，但未合并 |
| PR | [#3247](https://github.com/qibitai/nanoclaw/pull/3247) | 畸形 cron 字符串处理 | 7 天 | 明确的修复方向，待 review |
| PR | [#3270](https://github.com/qibitai/nanoclaw/pull/3270) | ncl token usage | 5 天 | 与 #3189 同一作者，同批提交，可考虑批量 review |

**维护者提示**：`#2715` 是当前最长的关键积压，直接挡住 WhatsApp 渠道的生产可用性。此外，`teran13` 提交的若干 PR（#3189、#3270、#3196）已等待 5-16 天未获 core-team 回应，建议优先安排 review。

---

*本日报由 AI 自动生成，数据依据 GitHub API 实时拉取。如需解读历史趋势，请参考过往日报。*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-21

## 今日速览

IronClaw 项目今日整体处于**高活跃度**状态，过去 24 小时内有 21 条 Issue 更新（17 条新增/活跃、4 条关闭）和 33 条 PR 更新（19 条待合并、14 条已合并/关闭）。v1.4.0 开发周期已全面铺开，两条核心 Epic（用户持久化沙箱 #7732 和 Agent 生命周期钩子 #7770）均在其推进路线上迎来关键 PR（#7779、#7765），同时 WebUI Design System 经历了大规模 Epic 重组（#7038/#7781/#7782 取代 #7733），反映出产品层正在系统性推进 UI 治理。值得注意的是，今日连续报告了 3 个由 Rust 1.98 和 OpenAI 结构化输出引发的 CI/生成器问题，引起维护团队迅速响应——其中一个 sev 级 bug（#7786）已附带可独立 cherry-pick 的修复。基础设施层面，Rust 1.98 向上兼容工作被优先处理（#7777/#7778），说明维护者将 CI 稳定性视为当前第一优先级。

---

## 版本发布

无新版本发布。当前开发聚焦 v1.4.0 目标，重点覆盖持久化用户沙箱（#7732）、Agent 生命周期钩子（#7770）及 WebUI Design System（v1.4.0 标记于 #7781）。

---

## 项目进展

**已合并/关闭的重要 PR（14 条）**：

- **#7729** `feat(automations): add run-now (manual fire)` — 该 PR 解决了长期需求（Issue #7193 今日随之关闭），为自动化系统增添了手动触发能力，覆盖模型能力、产品服务层、认证 WebUI API 及本地化 UI，且保持调度计划不变、创建独立领域区分的触发身份与审计溯源。这是自动化领域功能完备性的重要里程碑。
- **#7763** `docs(subagent): consolidate seven design docs into one canonical README` — 将七份相互矛盾、7,000+ 行的子 Agent 设计文档合并为一份规范 README，净删 9,713 行。**这一删减本身信号重大**：表明 Agent 架构（阻挡模式 + spawn-mode）已经稳定，不再有多代设计文档共存的需求，深度清理了文档负债。
- **#7738** `feat(slack): per-field help text` — 为 Slack 部署配置卡片各字段增加描述性帮助文本，复用 Telegram 已建立的 seam（#7550），属于低风险体验优化。
- **#7777 / #7778** — 两项 Rust 1.98 clippy 迁移修复，分别解除 merge queue 阻塞和恢复全分支 CI 通绿。一个不稳定的编译器版本即可冻结团队协作效率的例证。
- **#7786（已关闭）** `fix(assistant): unbreak suggestion generation on OpenAI models` — 修复 `uniqueItems: true` 约束破坏了所有 OpenAI 支撑的生成；已按 sev 提交（`16f7237d9`）支持独立 cherry-pick。
- **#7304** `refactor(webui): OAuth sign-in above gateway token form` — 将 OAuth 按钮提升至登录卡片顶部，优化登录路径体验。

**待合并的关键 PR（19 条）**：

- **#7779** `feat(sandbox): route user-sandbox egress through a managed per-user proxy` — Epic #7732 的 Step 2：为每个 (tenant, user) 启动独立 `ironsh/iron-proxy` sidecar，替代 `--network none` + host broker 模式。这是持久化沙箱路线的关键技术落地。
- **#7765** `feat(hooks): AfterTurn lifecycle point + memory curation` — Epic #7770 的 Phase 1，引入了首个可执行动作的钩子点，并且让 memory 自动整理成为其首个消费者。
- **#7749** — 用于触发 benchmark qa-automation-preview 的占位 PR（非产品变更）。

**已发布的项目结构性调整**：WebUI Design System 从单一 Epic #7038（Phase 1）扩展为三线并行的 Epic 体系 —— #7038（Phase 1: Storybook + 目录）、#7781（Phases 2–3: DESIGN.md 治理 + 主题换肤，取代已关闭的 #7733）、#7782（Phases 4–5: Agent 交互、组件与 IA）。老 Epic #7733 关闭为被取代。

---

## 社区热点

**#7732** — [Epic: Persistent per-user sandbox with iron-proxy; defer loop executors](https://github.com/nearai/ironclaw/issues/7732)（8 条评论）
该 Epic 为 v1.4.0 的核心方向，今日迎来关键 PR #7779。此前每次 shell 命令都创建并销毁容器，工作区虽按 (tenant, user) 持久化但缺乏真正持久化计算环境，用户实质上未曾获得「稳定的个人计算机」。社区对持久化沙箱的呼声通过本 Epic 集中表达。

**#7770** — [Epic: hook the agent lifecycle](https://github.com/nearai/ironclaw/issues/7770)（3 条评论）
Agent 生命周期钩子 Epic 定义了 after-turn、before-turn、compaction、tool-result seams 等阶段，目标是让「当 X 发生时执行 Y」通过钩子注册而非引擎内编辑实现。其 Phase 1 的 PR #7765 在评审中已发现 3+ 个后续问题（#7780、#7775、#7776），表明该设计的系统级影响正在被充分审视。

**#7038 / #7781 / #7782** — WebUI Design System 系列
Epic 体系重组附有明确的重定向说明，体现了社区对 Design System 治理的高度关注——特别是如何在不推倒重来的前提下，通过 DESIGN.md 治理文档推动 UI 一致性。

相对而言，今日 Issue/PR 的评论与反应数量整体偏低（多数为 0–2 条），说明讨论更多发生在跨 Issue 的关联引用中，而非单条 Issue 内部深潜。更值得关注的是**新增的 bug 报告往往直接附带修复 PR**（#7778→#7777、#7786），间接说明维护者在主动扫描并预备修复路径。

---

## Bug 与稳定性

按严重程度排列：

- **[SEV] OpenAI 结构化输出生成全面失效** — Issue #7786: `schemas/suggestions.output.json` 中 `sources` 字段声明了 `"uniqueItems": true`，而 OpenAI 严格结构化输出校验不支持该约束，导致所有由 OpenAI 驱动的 suggestion 生成失败。**已有修复 PR #7786**（commit `16f7237d9` 可独立 cherry-pick）。同时在 Issues 中以 #7786 的形式记录在案。

- **[高] LLM 超时策略失效** — Issue #7783（risk: medium, scope: llm，评论 1 条）：结构化输出 finalization 运行在非流式 HTTP 客户端上，provider 卡死时唯有一分钟后 60s 总墙钟超时才能察觉，而外层 75s finalization 截止时间在重试完成前就杀死了运行。单一传输卡死即毁掉整个 run。**尚无修复 PR**，需要重设计超时/重试预算的分配模型。

- **[中] CI 全链路红** — 由 Rust 1.98 发布导致 `-D warnings` 在 clippy 步骤全 branch 失效（4 个新 lint 同时武装）。**修复已合入**：#7777（解除 merge queue 阻塞）+ #7778（全 workspace 通过 1.98 clippy 零错误）。

- **[中] 并发写入静默覆盖** — Issue #7776（review 中发现，risk: High）：`ironclaw.memory.write` 在 `append: false` 下是 read-modify-write，CAS 只能防撕裂写但重试可能覆盖并发写入的整个文档。需要一个 expected-version 模式。**无 PR**。

- **[低] 调度器侧失败终结绕过 AfterTurn 钩子** — Issue #7780：AfterTurn 只在 executor 成功 APPLIED Exit 时触发，调度器失败终结（driver failure / exit-application failure）走完全独立的路径，绕过了钩子点。**无 PR**。

- **[低] 时间敏感测试在 Asia/Shanghai 时区失败** — Issue #7767 + PR #7774（修复已提交，待合并）。

---

## 功能请求与路线图信号

**可能进入 v1.4.0 的功能**：

- **run-now（自动化手动触发）** — 已由 #7193 提出，PR #7729 已合并关闭，标志该功能正式进入主干。
- **持久化用户沙箱 + 托管 per-user 代理**（#7732）— Step 2 PR #7779 待合并。当前处于中间状态，仍有明确未决问题（defer loop executors）。
- **AfterTurn 钩子与 memory 自动整理**（#7770）— Phase 1 PR #7765 待合并，但已发现 3 个阻塞性问题需要后续 Phase 处理。
- **WebUI 通知中心泛化** — PR #7698 与 #7699 仍在排队（两者均为 XL 级、risk: medium），分别将通知中心替换为 server-backed Inbox 并发布可操作的 run gates（审批、认证、阻塞）。两者相互依赖且体量大。
- **WebUI Design System 三线 Epic**（#7038/#7781/#7782）— PR #7750（Phase 1 的 Storybook 集成）以及重制的 #7257 文档提案包仍在进行中。

**尚在需求调研期**：

- **memory.write 的 expected-version 模式**（#7776）— 因并发写入问题而提出。
- **无界运行的门控能力跳过而非中止**（#7775）— 因为无对话界面，gate 时中止运行过于激进，建议跳过该能力继续执行后续任务。
- **扩展设置阶段的阻塞因素在 Configure 界面的呈现**（#7769）。

---

## 用户反馈摘要

从今日 Issues/PR 评论中提炼：

**正面反馈**：
- **自动化 run-now 落地获得认可**：Issue #7193（现已关闭）用户长时间无法按需触发自动化，合并 PR #7729 解决了一个明确存在的「必须等调度才能触发」的体验缺口。
- **文档整理获积极反响**：PR #7763 删除 9,713 行陈旧文档，被描述为「seven mutually contradictory documents → one canonical README」。说明此前文档对用户/贡献者的认知成本极高——整合本身即是深度体验改善。
- **Slack 配置字段帮助文本（#7738）**：直接回应了管理员配置 Slack 集成时「不知道每个字段填什么」的痛点。

**负面反馈与痛点**：
- **OpenAI 模型 suggestion 全面失效（#7786）**：严重程度最高。影响所有使用 OpenAI 模型的用户，且根因是 schema 中一个看似无害的 `uniqueItems: true`——这暴露了 schema 校验在跨 provider 场景下的脆弱性。
- **LLM 超时完全不可控（#7783）**：用户面对 provider 在传输层卡死时完全没有响应手段，60s/75s 双超时窗口设计下重试无法执行。反馈点出「单一传输 stall 摧毁整个运行」的严重性。
- **自动化的多 trigger 域 run-now 缺失**：直到 #7729 合入前，用户没有任何方式从模型、WebUI 或产品表面手动触发自动化。
- **时间相关测试在特定时区失败**（#7767）：测试环境中国时区（Asia/Shanghai）的用户体验到由 UTC 假设导致的失败，令本地跑测试的开发受阻。

---

## 待处理积压

**重点提醒（按优先级排序）**：

- **#7783** — [LLM 超时策略缺陷](https://github.com/nearai/ironclaw/issues/7783)：高影响 bug 且无修复 PR。影响所有 LLM 驱动的生成场景，建议尽快安排修复。
- **#7776** — [memory.write 并发覆盖风险](https://github.com/nearai/ironclaw/issues/7776)：review 中发现的 High 风险问题，需预期版本号机制。
- **#7780** — [AfterTurn 钩子绕过调度器失败终结路径](https://github.com/nearai/ironclaw/issues/7780)：如不修复，钩子系统存在语义不完整性；建议在 #7765 合并前规划修复。
- **#7698 / #7699** — [通知中心泛化 + 可操作 run gates](https://github.com/nearai/ironclaw/pull/7698)：两个 XL 级 PR 已排队四天，相互依赖，且涉及 WebUI 与 notification 领域两个模块。建议维护者评估是否将其视为 v1.4.0 阻断项。

**历史积压**：
- **#7308**（8 月 6 日创建）：Attio 托管 MCP OAuth 注册失败，因 scope 无效无法纠正 —— 今日已关闭，但未在摘要中看到明确的修复方案或替代方案说明，建议确认关闭原因是否为「不再复现」或「工作绕过完成」。

**需关注的长期未合并 PR**：
- **#7491** — omp core-tool contract（11 日创建，已 9 天）+ 规模为 XL、risk medium，涉及大量 API 变动（移除旧 file tools），建议对时间表和合并顺序有明确规划。
- **#7257** — Design System 文档提案（8 月 5 日创建，已 16 天），属于文档先行型 PR，等待 Epic 结构调整后的最终整合。

---

_数据来源：[IronClaw GitHub 仓库](https://github.com/nearai/ironclaw)｜报告周期：2026-08-20 ~ 2026-08-21_

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报

**日期：2026-08-21**  
**数据来源：** [github.com/netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 今日速览

过去 24 小时 LobsterAI 活跃度处于 **中等偏上** 水平，主要由一批停滞（stale）Issue/PR 的批量更新驱动。

- **PR 合并/关闭 6 条**，是本日最主要的动态来源，涵盖了任务调度表单 Bug 修复（#1547 未合并）、Agent 技能徽章同步修复（#1545）、引擎启动超时交互优化（#1546）、Write 工具文件卡片功能（#1553）、macOS 打包修复（#1555）、设置面板搜索（#1557）以及 Agent 切换异常修复（#1560）等多项改进。
- **新开 Issue 仅 2 条（其中 1 条为文档 404 报错）**，社区新讨论热度偏低。
- 值得留意的是，**今日活跃的 Issue 和 PR 均带有 `stale` 标记**，说明这些条目已长期未更新，维护者可能在集中清理历史积压，而非处理新增问题。这既体现了维护者的清理意愿，也暗示项目近期更新频率尚未恢复正常节奏。
- 新版本发布数为 **0**。

整体来看，项目处于 **功能迭代活跃、社区反馈偏少** 的阶段，建议持续关注 stale 条目的处理进度。

---

## 版本发布

今天没有新版本发布。

---

## 项目进展

今日 7 条 PR 中 6 条已合并/关闭，主要进展如下：

### 已合并/关闭（功能推进）

| PR | 类型 | 内容 |
|---|---|---|
| [#1545](https://github.com/netease-youdao/LobsterAI/pull/1545) | fix | 修复 Agent 技能修改后徽章不同步的问题，更新 `activeSkillIds`，修复 #1502 |
| [#1546](https://github.com/netease-youdao/LobsterAI/pull/1546) | feat | 引擎启动超时 30 秒后显示“取消启动”和“查看日志”按钮，为用户提供逃逸出口 |
| [#1553](https://github.com/netease-youdao/LobsterAI/pull/1553) | feat | 为 Write 工具调用添加文件卡片和分屏预览面板，支持 Markdown、HTML、SVG 渲染 |
| [#1555](https://github.com/netease-youdao/LobsterAI/pull/1555) | fix | 修复 macOS 下 `npm run dist:mac:x64` 打包失败（`sha256sum` 兼容） |
| [#1557](https://github.com/netease-youdao/LobsterAI/pull/1557) | feat | 设置面板侧栏新增搜索筛选，支持中英文关键词匹配与自动切换 Tab |
| [#1560](https://github.com/netease-youdao/LobsterAI/pull/1560) | fix | 修复编辑 Agent 后点击原 Agent 无法切换回聊天界面的问题 |

### 待合并（1 条）

| PR | 类型 | 内容 |
|---|---|---|
| [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547) | fix | 修复定时任务通知渠道选择后无法改回“不通知”的问题，改动仅 2 行 |


## 社区热点

今日讨论热度最高的条目均带有 `stale` 标记，属于历史积压。

- [Issue #1552](https://github.com/netease-youdao/LobsterAI/issues/1552)：**AI 产物 Markdown 预览及文件卡片支持**（1 条评论）。该 Issue 由 PR #1553 回复关闭。诉求核心在于 Write 工具输出文件后无法在应用内预览，需手动切换文件管理器，影响写作与文档生成场景。
- [Issue #1556](https://github.com/netease-youdao/LobsterAI/issues/1556)：**IM 机器人配置指南 404**（2 条评论）。文档链接失效，用户无法访问配置文档，属于文档维护盲区。

> **分析**：Issue #1552 与 PR #1553 的联动表明开发团队重视用户提效场景，该功能已完成实现，可以视为对社区反馈的积极回应。

---

## Bug 与稳定性

今日无新增严重性高的崩溃/回归类 Bug 报告。两条相关修复均为交互细节 bug：

| 严重度 | 问题 | 状态 | 对应 PR |
|---|---|---|---|
| 中 | 定时任务通知渠道保存后回退为原 IM 渠道，无法置为“不通知” | 待合并 | [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547) |
| 低 | macOS 打包失败（`sha256sum` 不支持） | 已合并 | [#1555](https://github.com/netease-youdao/LobsterAI/pull/1555) |

另外两条已合并的修复（#1545、#1560）分别解决了 Agent 技能徽章不刷新与编辑后无法切换回聊天界面的问题，属于可见性高、影响用户操作流畅度的修复，已合入主线。

---

## 功能请求与路线图信号

- **Write 工具文件卡片 + 分屏预览**（[#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) / [#1553](https://github.com/netease-youdao/LobsterAI/pull/1553)）：该功能已实现并合入，预计将在下一版本中面向用户交付。
- **引擎启动超时交互优化**（[#1546](https://github.com/netease-youdao/LobsterAI/pull/1546)）：为网络不佳或编译缓存失效场景提供“取消”与“看日志”的逃生通道，提升用户体验。
- **设置面板分类搜索**（[#1557](https://github.com/netease-youdao/LobsterAI/pull/1557)）：Tab 增多后引入搜索过滤，属于设置界面交互优化，同样是面向大规模用户的使用体验改进。

上述功能均已在 PR 中合入或接近合入，建议在下一版本发布时集中验收。

---

## 用户反馈摘要

从现有 Issue 评论中提炼的用户痛点：

- **文档可访问性**：IM 机器人配置指南 404（[#1556](https://github.com/netease-youdao/LobsterAI/issues/1556)），用户无法完成配置，文档的长期维护需要建立更有效的检查机制。
- **文件预览体验**：Write 工具生成的 Markdown/HTML 文件无法在应用内直接预览，需依赖外部文件管理器或让 Agent 反复 Read 全文（[#1552](https://github.com/netease-youdao/LobsterAI/issues/1552)），该问题已通过 PR #1553 修复。
- **Agent 切换体验**：编辑 Agent 后点击原 Agent 无法回到聊天界面（[#1560](https://github.com/netease-youdao/LobsterAI/pull/1560)），属于交互细节问题，已修复。

整体反馈以“细节交互优化”为主，未出现严重功能缺失或性能类投诉。

---

## 待处理积压

以下条目长期未获得响应或未合入，建议维护者关注：

| 条目 | 类型 | 创建时间 | 最后更新 | 备注 |
|---|---|---|---|---|
| [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547) | PR（待合并） | 2026-04-07 | 2026-08-20 | 修复定时任务“不通知”无法保存，改动极小（2 行），建议尽快 review |
| [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556) | Issue | 2026-04-08 | 2026-08-20 | 文档 404，建议维护文档链接并排查其他文档可用性 |
| [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) | Issue（功能） | 2026-04-08 | 2026-08-20 | 已被 PR #1553 关闭，建议在发布说明中向用户同步该能力 |

> 说明：今日活跃的 Issue/PR 均带有 `stale` 标记，可能存在自动过期机制。建议维护者对这类条目做人工复核，区分“已解决需关闭”与“仍应保留”两类，避免误关有效反馈。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-21

## 今日速览

Moltis 项目在过去 24 小时内保持了较高的开发活跃度：共产生 8 条 PR 更新和 1 条 Issue 更新，并有 1 个新版本发布（20260820.01）。安全修复是今日主线——针对 Vault 解锁/恢复端点缺失认证（CWE-306）的严重漏洞，修复 PR #1216 已合并关闭，对应 Issue #1177 同步关闭。此外，WhatsApp 通道的 3 个体验修复（Markdown 渲染、push name 硬编码、回复提及识别）及渠道工具策略的可配置化也已全部合并。目前仍有 4 个 PR 处于待合并状态，其中 2 个为最新提交的安全加固（镜像请求校验、Snyk Agent 版本固定），项目整体健康度良好，安全响应及时。

---

## 版本发布

**发布版本：20260820.01**

今日发布了新版本 20260820.01。仓库未附带独立的变更日志文件，从今日合并的 PR 推断，该版本应包含以下内容：

- 修复 WhatsApp 通道的 push name 硬编码问题（PR #1218）
- 新增 untrusted-turn 工具上限配置（PR #1219）
- 修复 WhatsApp 群组中回复机器人消息未被识别为提及的问题（PR #1217）
- 修复 HTTP 服务中 Vault 解锁/恢复端点缺失认证的严重安全漏洞（PR #1216）

**破坏性变更与迁移注意**：
- PR #1219 引入了新的配置项以替代原先硬编码的 deny-all 工具策略。若部署环境依赖旧行为，需在升级后检查渠道配置，确认是否需要对 untrusted-turn 工具上限进行显式设置。
- PR #1216 修复了安全漏洞，但属于行为变更：`POST /api/auth/vault/unlock` 和 `POST /api/auth/vault/recovery` 端点现在要求认证。依赖无认证调用这些端点的内部工具或脚本需要相应更新。

---

## 项目进展

今日共 4 个 PR 被合并/关闭，均为修复类变更，覆盖安全、通道体验、策略配置三个方面：

**安全修复（重要）**
- **PR #1216**（[链接](https://github.com/moltis-org/moltis/pull/1216)）— 修复 Vault 解锁和恢复端点缺失认证的问题（CWE-306）。此前 `/api/auth/` 前缀被整体加入 `is_public_path()` 白名单，导致这两个端点完全暴露，任何远程未认证调用者都可以暴力破解 Vault。该 PR 为这两个端点添加了 `AuthSession` 提取器，堵住了严重的安全漏洞。对应 Issue #1177 已关闭。

**WhatsApp 通道体验（3 项）**
- **PR #1218**（[链接](https://github.com/moltis-org/moltis/pull/1218)）— 停止将 WhatsApp push name 硬编码为 "Moltis"。此前配置为 "Ada" 的机器人在群聊中会显示为 "Moltis"，严重影响品牌一致性。该 PR 移除了不合适的 builder hook 使用。
- **PR #1219**（[链接](https://github.com/moltis-org/moltis/pull/1219)）— 将 untrusted-turn 工具上限改为可配置。此前 #1170 的修复对非 operator 的每次对话都应用硬编码的 deny-all 工具策略，这虽然适合 `/sh` 命令场景，但也误伤了为 public audience 注册的 3 个工具，并使第 4、5 层工具策略在任何共享渠道中不可达。该 PR 将其改为可配置项。
- **PR #1217**（[链接](https://github.com/moltis-org/moltis/pull/1217)）— 在 `mention_mode = "mention"` 的群组中，用户回复机器人消息时会被丢弃（判定为"未提及"）。该 PR 将"回复机器人消息"也视为一种提及方式，与用户直觉保持一致。

---

## 社区热点

今日活跃讨论集中在安全相关的 PR 上，但整体评论量较少。

- **PR #1222**（[链接](https://github.com/moltis-org/moltis/pull/1222)，作者：tsauvajon）— 校验沙箱镜像请求。该 PR 在容器或 Dockerfile 使用前校验镜像引用和包名，并将包检查和镜像构建限制为 operator 管理员。属于安全加固，当前为待合并状态。
- **PR #1221**（[链接](https://github.com/moltis-org/moltis/pull/1221)，作者：tsauvajon）— 将 Snyk Agent Scan 固定到 0.5.17 版本，防止供应链攻击，同时移除独立的 mcp-scan 回退方案并要求 uv。当前为待合并状态，验证尚未全部完成。

两个 PR 均反映了项目对供应链安全和输入校验的持续关注，属于防御性加固方向。

---

## Bug 与稳定性

今日有 1 条 Issue 被关闭，无新增活跃 Bug 报告。

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| **高** | [#1177](https://github.com/moltis-org/moltis/issues/1177)（[CWE-306](https://cwe.mitre.org/data/definitions/306.html)） | `POST /api/auth/vault/unlock` 和 `POST /api/auth/vault/recovery` 端点完全缺少认证。`is_public_path()` 将整个 `/api/auth/` 前缀加入白名单，导致 `auth_gate` 从未对这两个路由执行，任何未认证的远程调用者都可以暴力破解 Vault。 | **已关闭** — 修复 PR #1216 已合并 |

该漏洞属于认证缺失（CWE-306）类别，修复方式为添加 `AuthSession` 提取器。考虑到 Vault 涉及密钥/凭据存储，此漏洞风险等级较高，但已在短时间内完成修复并关闭。

---

## 功能请求与路线图信号

今日无新功能请求类 Issue。但从 PR 中可以观察到一个清晰的信号：

- **PR #1219** 将 untrusted-turn 工具上限从硬编码改为可配置，表明项目正在将工具策略的粒度细化，允许不同渠道/场景配置不同的权限策略，而不再是一刀切的 deny-all。这是权限模型走向更灵活、更精细化的方向，未来版本可能会围绕该配置项提供更丰富的策略选项。

---

## 用户反馈摘要

今日无新的用户评论。

值得注意的是，Issue #1177 的提交者（Practice100101）在 preflight checklist 中勾选了"已搜索现有 issue"和"使用最新版本"，表明该用户是活跃的、关注安全的项目使用者。该 Issue 在报告后约 3 周被修复（7 月 30 日报告，8 月 20 日修复），响应周期合理。

---

## 待处理积压

以下为长期未响应的重要项目，值得维护者关注：

- **PR #468**（[链接](https://github.com/moltis-org/moltis/pull/468)，作者：jmikedupont2，创建于 2026-03-23）— 在 Windows 上使用 `cmd.exe` 执行 shell hooks。此 PR 自 3 月提交以来已近 5 个月，今日有更新（可能是 rebase 或新推送），但仍处于待合并状态。Windows 用户执行 shell hooks 失败的问题持续存在，建议维护者评估并推进此 PR。

---

*数据来源：[Moltis GitHub 仓库](https://github.com/moltis-org/moltis) | 日报生成时间：2026-08-21*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-21

## 1. 今日速览

CoPaw（QwenPaw）项目今日活跃度处于**高位**：过去 24 小时内产生 28 条 Issue 动态和 50 条 PR 动态，并发布 v2.1.1-beta.1 版本。社区讨论焦点集中在**任务自动中断、网络恢复重连失败、长会话性能**等稳定性问题上，同时涌现出多项功能请求（Hub 多用户部署、OAuth 文档、跨会话记忆开关等）。值得关注的是，多个社区贡献者提交了首份 PR（first-time-contributor），且已有 PR 针对昨日报告的 `envs.json` 损坏覆写、流式输出 `httpx.ReadError` 等严重问题提出修复方案，项目整体处于积极迭代与社区反馈双轮驱动的健康状态。

## 2. 版本发布

**v2.1.1-beta.1**（2026-08-20 发布）— [Release 页面](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.1-beta.1)

**主要更新：**
- **feat(console)：** 改进编辑器标签页溢出导航（PR #6983）
- **fix(providers)：** 降低速率限制器初始化日志级别，减少不必要的日志噪声（PR #6988）
- **chore：** 更新发布说明

**破坏性变更：** 无。作为 Beta 版本，建议用户关注控制台标签导航体验变化及日志输出精简带来的影响（如依赖日志排查问题的用户需注意日志级别调整）。

## 3. 项目进展

今日合并/关闭的关键 PR 显示项目在**稳定性修复、性能优化、安全加固**三条线上均取得实质进展：

- **安全加固：持有密钥文件权限修复** — PR [#7119](https://github.com/agentscope-ai/QwenPaw/pull/7119) 修复 `secret_store` 创建 Fernet 主密钥文件时未按文档约定设置 `0o600` 权限的问题，此前默认权限可能导致密钥文件被其他用户读取，属于敏感安全问题。
- **envs.json 损坏保护** — PR [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) 对应 Issue #7118（损坏的 `envs.json` 被静默吞掉并被覆写，存量的所有环境变量丢失）。修复方案：保留损坏文件 + 原子写入，避免数据静默丢失。
- **下载器超时回退链修复** — PR [#6371](https://github.com/agentscope-ai/QwenPaw/pull/6371) 修复 `_download_remote_to_path()` 中 `subprocess.TimeoutExpired` 未被捕获的问题，使 `wget` → `curl` → `urllib` 回退链在超时场景下也能正确推进（对应 Issue #6370）。
- **并发驱动初始化** — PR [#7174](https://github.com/agentscope-ai/QwenPaw/pull/7174) 将工作区启动时持久化 Driver 的初始化改为并发执行，显著缩短冷启动时间。
- **长会话性能优化** — PR [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) 针对流式输出中对最新 Markdown 的同步重复解析、已完成历史的非必要重渲染等问题进行优化，提升长对话场景下 Console 的响应流畅度。
- **发布打包修复** — PR [#7166](https://github.com/agentscope-ai/QwenPaw/pull/7166) 将 qwenpawmail MCP 以独立 sidecar 形式打包，解决冻结构建中的依赖问题。
- **技能加载去重** — PR [#7073](https://github.com/agentscope-ai/QwenPaw/pull/7073) 修复用户工作区自定义技能与内置技能同名时重复加载的问题。
- **其他**：PR [#7161](https://github.com/agentscope-ai/QwenPaw/pull/7161)（控制台助手回复卡片增加 artifacts 展示，已合并）、PR [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880)（统一应用/插件/技能市场页面，已合并）。

## 4. 社区热点

| 议题 | 类型 | 评论数 | 状态 | 链接 |
|------|------|--------|------|------|
| #6921 多步任务时常在规划输出后无提示停止，需用户说“继续”才恢复 | Bug | 10 | OPEN | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6921) |
| #7102 使用 GLM 5.3 时冻结超过 10 分钟无响应 | Bug | 9 | CLOSED | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7102) |
| #6643 任务产出物建议按任务建目录存放而非堆积在 media | Feature | 6 | CLOSED | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6643) |
| #6436 自动模型路由：为每条消息智能选择最佳模型 | Feature | 4 | OPEN | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/6436) |

**热点诉求分析：**

- **任务执行中断问题是当前用户最强烈的痛点**（#6921，10 条评论）。大量用户报告 Agent 在执行多步任务时输出"规划下一步"后即停止，必须用户介入输入"继续"才恢复。从 Issue 描述看，触发模式高度一致——均发生在模型输出计划性文本后。该问题直接降低任务自动化效率，建议维护团队优先定位模型输出解析与工具调度的衔接逻辑。
- **大模型提供商兼容性**（#7102，9 条评论）——使用 GLM 5.3 模型时出现长时间无 token 输出的冻结问题，用户推测为提供商兼容性问题，帖子已关闭，但用户基数的扩大意味着第三方模型兼容性测试的覆盖面需同步提升。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 问题描述 | 状态 | Fix PR |
|--------|-------|----------|------|--------|
| 🔴 高 | [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) | 对话上下文中存在无法下载的图片链接时，整个会话不可用，仅 `/clear` 可恢复 | CLOSED | 已解决（关注处理方式） |
| 🔴 高 | [#7162](https://github.com/agentscope-ai/QwenPaw/issues/7162) | 流式输出中途 `httpx.ReadError` 导致偶发 `UNKNOWN_AGENT_ERROR`，`_get_httpx_retryable()` 未包含 ReadError 故不自动重试 | CLOSED | 需确认是否已有对应修复 |
| 🟠 中 | [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) | Embedding health check 在后端已 warm 时仍超时（>5s），timeout 硬编码无配置项 | OPEN | — |
| 🟠 中 | [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) | `history.db` 被 `recall_history` 的 expand 整段落库撑爆至 7.6GB，且同一区间被重复落库 | OPEN | — |
| 🟠 中 | [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118) | 损坏的 `envs.json` 被静默覆写，所有环境变量丢失 | CLOSED | [PR #7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) |
| 🟡 低 | [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 助手消息结束时间显示异常（实际耗时与显示差异大） | CLOSED | — |

**重点关注：** Issue #7168（7.6GB 的 history.db 膨胀）和 #7156（embedding health check 超时硬编码）目前仍处于 OPEN 状态，且 #7168 描述的问题直接关联长期运行的 Agent 任务——数据库体积膨胀可能导致读写性能显著下降，建议维护团队尽快评估修复优先级。

## 6. 功能请求与路线图信号

今日新提出的功能需求主要包括：

| 功能 | Issue/PR | 状态 | 是否可能纳入下一版本 |
|------|----------|------|---------------------|
| Agent 级别跨会话召回开关（Scroll 策略） | [Issue #7184](https://github.com/agentscope-ai/QwenPaw/issues/7184) | OPEN | 中 — 与现有记忆架构直接相关 |
| 工作区级 always-on 技能（常驻系统提示） | [Issue #7182](https://github.com/agentscope-ai/QwenPaw/issues/7182) + [PR #7183](https://github.com/agentscope-ai/QwenPaw/pull/7183) | OPEN | **高** — 已有对应 PR 提交 |
| 支持 Qwen_Code 作为第三方 Agent 框架 | [Issue #7181](https://github.com/agentscope-ai/QwenPaw/issues/7181) | OPEN | 需评估 |
| 远程 MCP 服务器的 OAuth 配置文档 | [Issue #7185](https://github.com/agentscope-ai/QwenPaw/issues/7185) | OPEN | 高 — 文档补充成本低 |
| 自建多用户 Hub（本地/Docker 运行时） | [PR #7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) | OPEN | **高** — 已有功能完善的 PR |
| 钉钉群聊上下文模式（隔离/共享可配置） | [Issue #7158](https://github.com/agentscope-ai/QwenPaw/issues/7158) | OPEN | 中 |
| QQ 群主动发消息支持定时任务 | [Issue #7159](https://github.com/agentscope-ai/QwenPaw/issues/7159) | OPEN | 中 |

**值得注意的信号：** 社区用户 **wuyak** 在同一天内连续提交了跨会话召回开关（#7184）、工作区级 always-on 技能（#7182 + PR #7183）两个功能请求且均附带实施方案，说明该用户对 Agent 多会话协同和专业化 Agent 构造有深入需求，也可能是典型的高级用户画像。

## 7. 用户反馈摘要

- **任务中断挫败感强（#6921）：** 用户 rerbin 详细描述了模型输出"规划性文本"后停止的具体模式——"消息的特征都是规划好下一步就停止了，没实际开始干也无任何视觉可见的提示"。这表明问题不仅在于执行中断，还在于**缺少可见的进度反馈**，用户无法区分"正在思考"与"已经卡死"。该用户同日提交了多个其他 Issue，属于积极反馈的高频用户。
- **Windows 桌面端体验问题是高频场景：** 多个 Issue（#6921、#6974、#6826、#6453）均来自 Windows 11 桌面客户端用户，涵盖 VPN 使用、中文文件名处理、时间显示等多个维度。桌面客户端在 Windows 生态下的兼容性和体验优化应作为重点方向。
- **网络瞬态恢复需求明确（#6932）：** 用户报告网络短暂中断后无法自动恢复，LLM 请求持续超时需手动重启。自动重连能力被用户视为"期望行为"而非增强功能，体现了对 Agent 无人值守稳定性的核心期待。
- **社区协作积极：#7118 的 Issue 由用户 Yigtwxx 提交后，隔天即有 PR #7135 跟进修复；#7060（视频内联上限硬编码）也由报告者 xiaoka76 亲自提交 PR #7061，体现了社区"报修+修复"的良性参与模式。

## 8. 待处理积压

以下为长期未获响应/未关闭的重要议题，建议维护团队关注：

| 项目 | 创建时间 | 最后更新 | 状态 | 说明 |
|------|----------|----------|------|------|
| [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) 自动模型路由 | 2026-07-24 | 2026-08-20 | OPEN | 提出近一个月，仅 4 条评论。该功能需求方向与 Agent 智能调度高度相关，建议评估是否纳入路线图讨论 |
| [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) Reranker UI 配置面板 PR | 2026-07-23 | 2026-08-21 | OPEN | 提交近一个月仍处于 Under Review 状态，影响该功能的落地节奏 |
| [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) 网络恢复后无法自动重连 | 2026-08-12 | 2026-08-20 | OPEN | 用户描述详尽且可复现（同日复现两次），直接影响生产环境可用性，建议提高优先级 |

---

*数据来源：[github.com/agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) | 数据统计窗口：2026-08-20 ~ 2026-08-21*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报

**日期：** 2026-08-21  
**数据窗口：** 过去 24 小时（截至 2026-08-21）

---

## 1. 今日速览

ZeroClaw 社区今日保持高活跃度，24 小时内产生 50 条 Issue 更新与 50 条 PR 更新，其中新开/活跃 Issue 45 条、待合并 PR 48 条。社区讨论集中于三大主线：**WASM 插件化架构的全面落地**（#8850、#10076、#8398），**高风险命令与沙箱策略的精细化治理**（#7155、#6996、PR #10072），以及**运行时会话与传输层的架构重构**（#9487、#6850）。值得关注的是，多条长期 RFC（#7155 已运作 79 天、#9487 已运作 24 天）正在密集修订与评审中，且全部标有 `risk:high` 标签，表明维护团队正集中推进核心架构决策。新版本方面今日无发布，项目整体处于**架构重构与安全加固的攻坚阶段**，健康度良好但需关注待合并 PR 积压（48 条）与高风控评审对齐问题。

---

## 3. 项目进展

今日无 PR 被合并或关闭（24 小时内合并/关闭仅 2 条，均为关闭），但以下 PR 处于活跃推进状态，标志着项目关键模块的实质进展：

| PR | 标题 | 状态 | 关键进展 |
|---|---|---|---|
| [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) | feat(cli): add the egress grant ceremony to plugin install and list | OPEN, `risk:high`, 依赖 #9582 | 插件出口策略第三阶段：授权仪式已提交，diff 为 13 文件 +1,702/−26 |
| [#9582](https://github.com/zeroclaw-labs/zeroclaw/pull/9582) | feat(plugins): enforce a host-owned egress policy on plugin wasi:http | OPEN, `risk:high`, size:XL | 插件出口策略第二阶段：每个 `wasi:http` 请求在连接建立前强制执行主机策略（ADR-014） |
| [#10033](https://github.com/zeroclaw-labs/zeroclaw/pull/10033) | fix(config): source channel Rust defaults from their serde defaults | OPEN, `priority:p1`, `do-not-merge` | 修复 Discord/Slack/Matrix 等渠道配置默认值与 serde 默认不一致问题 |
| [#10072](https://github.com/zeroclaw-labs/zeroclaw/pull/10072) | feat(tools): classify declared network-specific NAT64 prefixes at the SSRF gate | OPEN, `risk:high`, 依赖 #10070 | SSRF 加固第二层：RFC 6052 NAT64 前缀分类，源自 `security.nat64_prefixes` |

**核心判断：** 项目正沿着 ADR-014（插件出口策略）路线稳步推进，`#9582`→`#9584` 的依赖链清晰，说明设计—实现—仪式化落地三阶段有序执行。该系列 PR 合计新增约 3,000+ 行代码，属于**跨模块安全架构升级**，预计合并后将显著提升插件系统的安全基线。

---

## 4. 社区热点

| Issue/PR | 标题 | 评论数 | 热度分析 |
|---|---|---|---|
| [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) | RFC: Add a per-execution confirmation tier for high-risk shell commands + Claude Code-style command pattern policy | 23 | **持续 79 天的核心安全讨论**。已修订至 Revision 3，由维护者确认范围。社区核心诉求：为高风险 shell 命令建立 allow/ask/deny 三级策略，对齐 Claude Code 模式。 |
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 22 | **架构级 RFC**，修订至 Revision 2。核心诉求：将会话管理和传输适配器收归运行时，建立所有权边界。与 #9488/#9600 形成提案簇，暗示大规模重构方向。 |
| [#10118](https://github.com/zeroclaw-labs/zeroclaw/issues/10118) | [Tracker]: Rust anti-slop policy debt remediation | 16 | 新开 2 天即获 16 条评论。**代码质量治理**：1,078 个 Rust 文件中 307 个候选问题需整改，其中 202 个为生产 panic。社区对代码质量关注度极高。 |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | RFC: Decouple memory lifecycle policy from storage backends | 14 | **内存架构解耦**：Memory trait 不应同时拥有存储操作和生命周期策略。评论集中在边界划分方案上。 |
| [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | RFC: Realtime speech-to-speech channel for Gemini Live | 14 | v2 已重写为 broker 合同。**实时语音通道**需求强烈，与 Gemini Live 集成是明确的路线图信号。 |

**共性分析：** 当前热点全部指向 **安全治理**（#7155、#6996）与 **架构解耦**（#9487、#6850、#8780）两大主题。社区参与者多为资深贡献者（NiuBlibing、Audacity88、JordanTheJet），讨论质量高，倾向于通过正式 RFC 流程而非临时 issue 推动变革。

---

## 5. Bug 与稳定性

### S1 - 严重（工作流阻塞）

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#9016](https://github.com/zeroclaw-labs/zeroclaw/issues/9016) | [Bug]: OpenAI tool turns fail when Chat Completions rejects reasoning effort | **已关闭** | 关闭原因待确认，需验证修复是否已合入 |
| [#10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | [Bug]: Interactive agent session caps context at 32,000 tokens, ignoring max_context_tokens = 131072 | OPEN, `in-progress` | 无，已接受待修复 |

> ⚠️ **#10068 值得关注**：用户配置 `max_context_tokens = 131072` 但会话实际被截断在 32K，S2 级降级。该问题影响所有自定义上下文配置的用户，目前尚无对应 PR。

### S2 - 降级

| Issue | 标题 | 状态 | Fix PR |
|---|---|---|---|
| [#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) | [Bug]: Exact proxy selectors reject supported transcription services | OPEN, `in-progress` | 无 |
| [#10194](https://github.com/zeroclaw-labs/zeroclaw/issues/10194) | [Bug]: PR reviewer publishes in-flight results after the PR merges | 已关闭 | 已关闭（CI 工具问题） |
| [#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) | SECURITY.md documents a CI job that was removed in April | OPEN, `in-progress` | 无 |

### S3 - 轻微

| Issue | 标题 | 状态 |
|---|---|---|
| [#10103](https://github.com/zeroclaw-labs/zeroclaw/issues/10103) | ZeroCode Health status values misalign in French and Spanish | OPEN |

### 稳定性总结

- **回归风险**：PR #9637（CI React Router RSC 例外保护）与 PR #10198（shell 方言测试平台感知）分别从 CI 和测试层面提升稳定性
- **数据迁移**：PR #9715（JSONL 会话迁移重试安全）正处理历史数据迁移的事务原子性
- **增量正确性**：PR #9748（stale provider refreshes）通过代数计数器防止过期刷新覆盖新会话

---

## 6. 功能请求与路线图信号

| 功能请求 | 对应 PR/Issue | 路线图信号 |
|---|---|---|
| **WASM 插件全面化**：可选渠道/工具从编译时 feature 转为运行时插件 | [#8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) | 高确定性：PR #9582/#9584 正在实施，ADR-014 已就绪 |
| **多模型 per-provider**：一个 provider profile 承载多个模型 | [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) | 高确定性：已进入实现阶段，涉及 provider 配置模型重构 |
| **Hailo-Ollama 原生支持** | [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | 中等确定性：边缘硬件集成，等待 review |
| **Agent 可移植性**：跨部署导出/分享 agent | [#10069](https://github.com/zeroclaw-labs/zeroclaw/issues/10069) | 新提案（3 天），3 阶段设计，尚需维护者评审 |
| **实时语音通道（Gemini Live）** | [#8780](https://github.com/zeroclaw-labs/zeroclaw/issues/8780) | 方向明确（broker 合同已定），但尚未进入实现 |
| **临时 Agent Swarm（crush 风格 TUI）** | [#10025](https://github.com/zeroclaw-labs/zeroclaw/issues/10025) | 新提案（5 天），关注度中等 |
| **流式响应默认开启** | [#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166) | 已被 accepted，预计快速落地 |
| **Stall 看门狗默认开启** | [#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168) | 已被 accepted，安全性提升 |

**判断：** 下一版本的主要增量将集中在 **WASM 插件化落地**（3 个关联 PR 在飞）与 **provider 配置模型扩展**（PR #9809 + #9109）。这两个方向代表项目向"可插拔、多模型"架构演进的核心路径。

---

## 7. 用户反馈摘要

### 真实痛点

1. **配置复杂度过高**（#10033）：多个渠道的 `approval_timeout_secs` 默认值在 Rust 结构体与 serde 反序列化间不一致，"配置文件中不设置该字段时，实际生效值与文档不符"。贡献者 IftekharUddin 明确指出这是"配置系统的隐蔽陷阱"。

2. **上下文窗口受限与预期不符**（#10068）：用户 icemann521 反映配置 131,072 上下文但会话被限制在 32K。"这导致长对话在远未达到配置限制时就被压缩"。该问题已被标记为 `in-progress`，社区回复积极。

3. **Windows 支持仍是短板**（#10111）：桌面版在 Windows 上因 `TaskDialogIndirect` 缺失无法启动，用户反馈"安装后无法使用"。已标记为 duplicate（有已知修复路径）但也说明 Windows 平台测试覆盖不足（#7910 仍在待办）。

4. **AI 审查工具存在时序问题**（#10194）："PR reviewer 在 PR 合并后才发布评审结果"。虽然是 CI 工具问题，但反映了自动化流程的协调缺陷，影响开发效率。

### 使用场景亮点

- **插件/工具安全**：#7155 的讨论反映了用户在生产环境中对"安全执行不可信 shell 命令"的强烈需求，且社区认可 Claude Code 风格的模式（allow/ask/deny）
- **Telegram 群组协作**（#9772）：多用户在 Telegram 群组中协作时，当前 `Sender` 作用域限制导致"一人上传文件、另一人追问"无法衔接，说明团队使用场景真实存在
- **MariaDB 后端需求**（#4668）："自建基础设施标准化在 MariaDB 上的用户没有受支持的 memory 后端路径"——SQLite 不够生产用、PostgreSQL 不是所有组织的可行选项

### 不满意信号

- PR #10033 被标记为 `do-not-merge`，暗示评审者对当前实现方案仍有保留意见
- PR #9999（output-limited 响应分类）处于 `blocked` 状态并依赖 #9447，#9447 本身又标记为 `needs-author-action`，形成依赖链阻塞，社区期待这两个 PR 尽快推进

---

## 8. 待处理积压

### 长期未响应 / 需维护者决策

| Issue/PR | 标题 | 等待时间 | 风险 | 建议动作 |
|---|---|---|---|---|
| [#4668](https://github.com/zeroclaw-labs/zeroclaw/issues/4668) | [Feature]: MariaDB memory support | 149 天 | `p2` | 已 accepted 但无实现 PR。社区有真实需求，建议评估工作量或寻求外部贡献 |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | RFC: Decouple memory lifecycle policy from storage backends | 91 天 | `risk:high` | 14 条评论，已 `no-stale`，等待维护者给出架构决策 |
| [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910) | Add Windows runtime test coverage for self-update paths | 64 天 | `p3` | 自 #7853 后的 follow-up 从未启动。Windows 用户连续报告问题（见 #10111），建议优先处理 |
| [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | feat(providers): add native Hailo-Ollama support | 35 天 | `risk:medium` | 无 review 活动，可能处于维护者 backburner。建议明确状态 |
| [PR #9637](https://github.com/zeroclaw-labs/zeroclaw/pull/9637) | fix(ci): guard temporary React Router RSC exception | 20 天 | `priority:p1` | 标有 `needs-author-action`，`do-not-merge`。高优先级但阻塞在作者响应 |

### 关键依赖链阻塞

```
#9999 (blocked) ← 依赖 ← #9447 (needs-author-action) ← 依赖 ← #9447 作者响应
```

**建议：** 维护者应在 48 小时内对 #9447 的作者通道进行 ping，否则 #9999 会继续阻塞，影响 OpenAI-compatible 终端的输出限制正确性。

### 作者需响应（needs-author-action）

以下 PR 均等待作者响应，若持续无回复建议维护者接手或关闭：

- [#10072](https://github.com/zeroclaw-labs/zeroclaw/pull/10072)（NAT64 SSRF 加固）
- [#9678](https://github.com/zeroclaw-labs/zeroclaw/pull/9678)（Git shell 策略加固）
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)（token 会计暴露）
- [#9707](https://github.com/zeroclaw-labs/zeroclaw/pull/9707)（vision_model_provider 迁移）
- [#9748](https://github.com/zeroclaw-labs/zeroclaw/pull/9748)（stale provider refresh 修复）

---

## 项目健康度总评

| 维度 | 评分 | 说明 |
|---|---|---|
| **社区活跃度** | ★★★★★ | 50+50 更新/日，高质量 RFC 讨论持续 |
| **架构推进** | ★★★★☆ | WASM 插件化三阶段推进，ADR-014 落地中；PR #9809 多模型支持进入实现 |
| **安全性** | ★★★★☆ | 多条 `risk:high` 安全 PR 在飞（SSRF、出口策略、shell 加固），但合并速度偏慢 |
| **稳定性** | ★★★☆☆ | 上下文截断 bug（#10068）无 PR，Windows 问题反复出现 |
| **维护效率** | ★★★☆☆ | 48 条 PR 待合并，多条 `needs-author-action` 积压；RFC #7155 已 79 天 |

**风险提示：** 大量 `risk:high` PR 集中在插件/安全领域且互相依赖（#9582→#9584→#10072），评审带宽可能成为瓶颈。建议明确高优安全 PR 的评审负责人与时间表，避免安全关键路径长期暴露在未合并状态。

</details>

---
*本日报由 [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial) 自动生成。*