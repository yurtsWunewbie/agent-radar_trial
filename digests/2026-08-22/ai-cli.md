# AI CLI 工具社区动态日报 2026-08-22

> 生成时间: 2026-08-22 01:09 UTC | 覆盖工具: 9 个

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

## 横向对比

# AI CLI 工具横向对比分析报告

**日期：2026-08-22**

---

## 1. 生态全景

当前 AI CLI 工具已从"代码补全助手"演进为"可编程的 Agent 运行时"，但行业整体仍处于快速迭代的早期阶段。各工具的核心竞争已从模型能力转向工程化能力——代理稳定性、沙箱安全、工具调用效率、多端协同成为社区讨论的主战场。值得注意的是，**可靠性问题（挂起、误报成功、资源泄漏）正在取代功能缺失成为社区第一痛点**，而 MCP 协议已事实性成为跨工具扩展标准，但实现成熟度参差不齐。整体来看，头部工具（Claude Code、Codex、Gemini CLI）在快速铺量，而垂直工具（Kimi、DeepSeek TUI）在特定场景（成本敏感、无人值守）深耕差异化。


## 2. 各工具活跃度对比

| 工具 | 新/活跃 Issues | 新/活跃 PRs | 版本发布 | 迭代节奏 | 社区热度信号 |
|------|---------------|-------------|----------|----------|-------------|
| **Claude Code** | 10 个热点（133 评论最高） | 0 | v2.1.239 | 稳定节奏 | 高（133 评论/21👍 头部 issue） |
| **OpenAI Codex** | 10 个热点（24 评论最高） | 10+（集中 Guardian 安全） | 5 个 alpha 版本/日 | 极快（Rust 重写中） | 高（6 个 Remote 故障 issue 集中爆发） |
| **Gemini CLI** | 10 个热点（13 评论最高） | 10+（评估管线、安全修复） | 无 | 稳定迭代 | 中高（P1 bug 密集） |
| **Copilot CLI** | 10 个热点（27👍 最高） | 0 | v1.0.81-7（补丁） | 中速（预发布通道活跃） | 中（BYOK 多模型 27👍 高赞） |
| **Kimi Code** | 1 | 1 | 无 | 低（社区规模较小） | 低（0 评论） |
| **OpenCode** | 10 个热点 | 10+ | v1.18.20/v1.18.21 | 快（核心修复密集） | 中高（finish=unknown 回归引关注） |
| **Pi** | 10 个热点（19 评论/17👍） | 8+ | 无 | 中（小步快跑） | 中高（压缩机制缺陷获 17👍） |
| **Qwen Code** | 10 个热点 | 10+ | 2 nightly | 快（nightly 频繁） | 中（CVE 安全议题主导） |
| **DeepSeek TUI** | 11 个活跃（含 1 Epic） | 5+ | 无 | 中（架构重组期） | 低中（社区规模有限但方向明确） |

**关键观察**：Codex 发布频率最高（一日 5 版），但 Release Notes 信息缺失引起社区不满；Kimi 社区活跃度最低，但曝出的 Token 泄漏 bug 严重性极高。


## 3. 共同关注的功能方向

### 3.1 代理稳定性与可观测性（最高声量）
| 子问题 | 涉及工具 | 具体表现 |
|--------|---------|----------|
| 误报"成功/终止" | Gemini CLI（#22323 子代理 MAX_TURNS 误报 GOAL）、Kimi（#2615 终止后仍消耗 LLM 配额） | 失败被标记为成功，或在终态后继续消耗资源 |
| 挂起/无限循环 | Gemini CLI（#21409 通用代理挂起、#25166 Shell 等待输入）、Copilot CLI（#4533 并行子代理 UI 卡死）、OpenCode（#43939 finish=unknown 循环续写） | 多个工具在不同环节出现永久挂起 |
| 中断/恢复机制 | Copilot CLI（v1.0.81-7 崩溃恢复）、OpenCode（#44020 迁移恢复）、Pi（#8428 重建上下文工具结果配对） | 从崩溃/中断中恢复会话的能力是刚需 |
| 静默失败 | DeepSeek TUI（#5528 工作流错误无任何 UI 反馈） | 错误不可见，用户无法感知 |

### 3.2 模型工具调用策略优化
| 方向 | 涉及工具 | 具体诉求 |
|------|---------|----------|
| 优先内置工具而非 Bash | Claude Code（#19649 模型偏好 Bash）、Claude Code（#88041 auto-mode 硬编码 Bash 引导）、Gemini CLI（#19873 利用 bash 亲和力 + 沙箱） | 本文认为模型应更智能选工具，但方向分歧——Claude Code 社区认为 Bash 是负优化，Gemini 社区认为 Bash 可用但需沙箱保护 |
| AST 感知代码操作 | Gemini CLI（#22745 EPIC 评估 AST 感知读取） | 减少上下文噪音和 token 消耗 |
| 按需加载工具定义 | OpenCode（#35376 MCP 工具定义全量注入） | 9 个 MCP 服务器导致 token 开销巨大 |

### 3.3 Windows 平台体验（集中爆发）
- **Claude Code**：孤儿进程文件锁（#42776）、Cowork 目录挂载回归（#76187）
- **Codex**：WSL Git 误判（#35119）、Computer Use 底层调用失败（#34764/#37595）、沙箱配置损坏（#35718）
- **Copilot CLI**：路径含空格启动失败（#4540）、每条命令弹出 PowerShell 窗口（#4549）
- **Qwen Code**：MCP 启动断连（#9693）、中文输入法失效（#5966）
- **OpenCode**：ChatGPT Plus OAuth 登录失败（#43850）

### 3.4 安全与权限边界
- **安全审查机制**：Codex 大量 PR 集中于 Guardian 同步审查（#40005/#40013/#40021）、沙箱细粒度权限（#40004/#40024）
- **沙箱逃逸防护**：Gemini CLI macOS Seatbelt 加固（#28935）
- **敏感信息脱敏**：Gemini CLI Auto Memory 数据脱敏（#26525）
- **配置失效/不一致**：Copilot CLI 沙箱无法禁用（#4521）、Codex 插件 enabled=false 仍扫描（#40035）

### 3.5 会话生命周期与记忆管理
- **会话恢复**：Copilot CLI 新增崩溃恢复、Qwen Code 恢复模型记忆（#9686）、OpenCode 归档会话恢复（#24153, 11👍）
- **记忆系统**：Gemini CLI Auto Memory 低信号重试循环（#26522）
- **多账号切换**：Claude Code 桌面版切换账号丢失会话历史（#48511）
- **会话分支**：Copilot CLI（#1313, 13👍）

### 3.6 多模型/自定义 Provider 支持
- **Copilot CLI**：BYOK 多模型（#3282, 26👍）、/model 切换本地模型（#3709, 27👍）——呼声最高
- **Codex**：子代理编排在 Bedrock 上异常（#17598）、MCP CustomResult 解析失败（#29002）
- **Gemini CLI**：模型不主动使用自定义 Skills/Sub-agents（#21968）
- **Pi**：新增 SiliconFlow、Parasail.io 等 provider 请求（#4742/#8450）

### 3.7 跨平台/跨端协同
- **Codex Remote Control**：Windows + Android/iOS 远程控制 6 个 issue 集中爆发（#39815/#39856/#39954/#39947/#39974/#40008）—— 当前最大单点故障
- **DeepSeek TUI**：监督化运行（外部控制 Socket、生命周期事件 Outbox、/relaunch）——面向无人值守
- **Qwen Code**：跨会话消息（#9576 UNIX socket 通信）


## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线 | 差异化特征 |
|------|---------|---------|----------|-----------|
| **Claude Code** | 企业级全功能 AI 编程助手 | 企业开发团队、合规敏感用户 | Node.js + 全屏渲染器，支持 Bedrock/Vertex | 功能最全（Cowork 协作者、Auto-mode）、重视合规（CVP 获批流程）|
| **OpenAI Codex** | 多端协同 + 高迭代速度的 Agent 平台 | 跨设备开发者、追求最新模型能力的用户 | Rust 重写中，原 TypeScript；Guardian 安全审查层 | 迭代速度第一（日发 5+ alpha）、安全审查投入大 |
| **Gemini CLI** | 深度代码理解 + 评估驱动开发 | 重视代码质量评估的开发者 | TypeScript，评估管线投入大（LLM-as-Judge） | AST 感知探索、PR 生成评估体系、沙箱安全投入 |
| **Copilot CLI** | GitHub 生态无缝集成 | GitHub 重度用户、已有 Copilot 订阅 | 原生（Rust + Go），ACP 协议支持 | 与 GitHub 深度集成、ACP 标准化 |
| **Kimi Code** | 成本敏感的轻量 Agent | 个人开发者、API 配额敏感用户 | 未知（生态较早期） | 社区规模极小但曝出严重 Token 泄漏 bug |
| **OpenCode** | 灵活多模型接入的开放性 Agent | 需要多模型自由切换的开发者 | TypeScript，支持 Zen 免费层 | 多模型接入灵活、补丁迭代快但回归率高 |
| **Pi** | 终端体验至上的轻量 Agent | 终端重度用户、TUI 爱好者 | TypeScript，RPC 模式 | 终端体验细节打磨（双击选中、键盘协议兼容）|
| **Qwen Code** | 中文生态 + 阿里云集成 | 中文开发者、阿里云用户 | TypeScript，daemon 会话模型 | 中文输入法支持、Aone Code 集成、nightly 频繁 |
| **DeepSeek TUI** | 无人值守的监督化 Agent 运行时 | 自动化/CI 集成开发者 | Rust，架构重组中 | 监督化运行（Outbox/Socket/relaunch）是当前唯一 |

**总结**：
- **功能完整性**：Claude Code 领先，Codex 追赶最快（但稳定性受质疑）
- **安全深度**：Codex（Guardian）和 Gemini CLI（沙箱加固）投入最大
- **生态集成**：Copilot CLI 与 GitHub 绑定最深，Qwen Code 绑定阿里云
- **终端体验**：Pi 做的最细，DeepSeek TUI 架构最现代化但功能较少
- **多模型支持**：Copilot CLI 呼声最高，OpenCode 最灵活


## 5. 社区热度与成熟度

| 工具 | 社区规模（信号） | 活跃度趋势 | 成熟度评估 | 关键风险 |
|------|----------------|-----------|-----------|----------|
| **Claude Code** | 大（133 评论顶部 issue，多高赞 issue） | 稳定 | 成熟（v2.1.x，功能全面） | AUP 安全策略误报引发信任危机 |
| **OpenAI Codex** | 大（6 个 Remote 故障 issue 集中出现） | 极活跃（日发 5 版本） | 快速迭代但稳定性波动（Rust 重写期） | 版本过快导致 release notes 缺失、Remote 故障大面积影响使用 |
| **Gemini CLI** | 中大（P1 bug 密集但评论数相对少） | 活跃但评论深度高 | 中高（评估管线成熟） | 代理挂起/误报问题集中在核心路径 |
| **Copilot CLI** | 中（27👍 最高赞，但整体 issue 评论少） | 中速 | 中高（v1.0.81 补丁成熟） | 预发布版质量波动（多回归）、BYOK 需求长期未满足 |
| **Kimi Code** | 小（1 issue 0 评论） | 低 | 早期 | 社区反馈渠道不活跃，严重 bug 可能被忽视 |
| **OpenCode** | 中（多回归 issue 快速被响应） | 活跃（提交密集） | 中（v1.18.x 补丁频繁） | finish=unknown 回归表明核心路径测试不足 |
| **Pi** | 中（17👍 压缩 issue 有代表性） | 中 | 中高（0.84.x，issue 处理节奏快） | 代理与 HTTP 场景测试覆盖不足 |
| **Qwen Code** | 中（CVE 议题主导，但非核心功能） | 活跃（nightly 频繁） | 中高（0.21.x） | Windows 平台问题密集、安全债积累 |
| **DeepSeek TUI** | 小（11 个活跃 issue，评论少） | 低中（架构重组期） | 早期（crate 分解中） | 社区规模有限、核心功能（sub-agent）不可靠 |

**结论**：
- **最活跃**：Codex（发布强度）、Claude Code（社区讨论深度）
- **最成熟**：Claude Code（v2.1.x）、Copilot CLI（v1.0.x + GitHub 生态）
- **快速迭代中**：Codex（Rust 重写）、Qwen Code（nightly 节奏）、OpenCode（补丁密集）
- **社区偏小**：Kimi、DeepSeek TUI
- **稳定性风险**：Codex（Remote 故障）、OpenCode（回归频繁）、Gemini CLI（挂起 bug 在核心路径）


## 6. 值得关注的趋势信号

### 6.1 安全策略正从"粗粒度拦截"走向"场景化豁免"
Claude Code 的 AUP 误报问题（"沮丧感叹词"触发会话级拦截）暴露了**一刀切安全策略对合法开发工作的误伤**。而 Codex（Guardian 同步审查）、Gemini CLI（沙箱逃逸加固）在技术上走得更深。行业正在从"安全策略是否存在"转向"安全策略是否精准到场景"。

**参考价值**：安全机制设计需考虑开发者情绪化表达、防御性安全研究等合法场景，并提供清晰的申诉/豁免路径。

### 6.2 "假成功"报告正在侵蚀用户信任
Gemini CLI（子代理 MAX_TURNS 后误报成功）、Kimi（任务终止后仍消耗配额）、OpenCode（finish=unknown 循环续写）——三个工具在同一天出现类似问题。**代理的自我状态认知不可靠是最系统性的风险**。

**参考价值**：在 Agent 自动化流程中，用户需要在终态信号（成功/失败/超时）上有确定性保证，否则无法安全地构建无人值守流程。

### 6.3 Windows 从"二等公民"变为高频痛点
9 个工具中有 6 个在 Windows 平台出现明显问题（从 MCP 断连到路径空格）。这反映了**AI CLI 工具在 Unix 优先的开发范式下成长，但用户基数已扩大到 Windows 重度开发者**。

**参考价值**：Windows 平台（含 WSL）的兼容性治理是下一个竞争分水岭，早期建立 CI 矩阵覆盖 Windows 场景的工具将获得明显优势。

### 6.4 注意力正在从"模型能力"转向"Agent 工程"
社区的讨论重心已经从"哪个模型更强"转向"代理如何稳定地完成任务"——工具选择策略、上下文管理、会话恢复、故障隔离。各工具在 **Agent 工程深度**上的差异正在拉大。

**参考价值**：选择 AI CLI 工具时，除模型能力外，应重点评估代理稳定性、恢复机制、可观测性等工程指标。

### 6.5 MCP 生态已成事实标准，但稳定性参差不齐
各工具对 MCP 的支持持续加深，但实现质量问题（BigInt 序列化错误、检测与实际连接不一致、热重载失败）频发。MCP 协议本身在快速演进。

**参考价值**：依赖 MCP 扩展时，确认 CLI 对配置变更/连接失败有优雅的降级路径；优先选择对 MCP 有充分测试的工具。

### 6.6 "监督化运行"成为 Agent 运行时的下一形态
DeepSeek TUI 的 Outbox/Socket/relaunch 设计（#5535）虽然在早期阶段，但代表了一个方向：**Agent CLI 正在从"交互式工具"演化为"可被外部系统可靠管控的运行时"**。这与 Codex 的 ACP 标准化、Qwen Code 的跨会话消息遥相呼应。

**参考价值**：面向无人值守场景（CI、夜间任务、自动化测试框架）的开发者，应关注工具的监督接口（事件流、外部控制、自我重启）是否成熟。


**最终建议**：
- 需要稳定、全功能的企业开发 → **Claude Code**
- 追求最新模型能力和多端协同，能容忍迭代波动 → **OpenAI Codex**
- GitHub 生态重度用户，需求可靠基础体验 → **Copilot CLI**
- 终端体验至上，重视轻量高性能 → **Pi**
- 多模型自由切换 → **OpenCode**（功能灵活但需关注回归风险）
- 中文开发场景 → **Qwen Code**（但需注意 Windows 支持短板）

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，作为一名专注于 Claude Code 生态的技术分析师，以下是对 `anthropics/skills` 仓库数据（截至 2026-08-22）的社区热点分析报告。

---

### 1. 热门 Skills 排行 (Top PRs by Community Engagement)

以下是根据 PR 讨论热度（结合评论数、问题关联度及跨 PR 协同）筛选出的最受关注的 Skills 动态：

**1. skill-creator 优化与 Bug 修复（#1298, #1099, #1050）**
*   **功能**: `skill-creator` 是用于创建、评估和优化其他 Skills 的元技能。这些 PR 集中修复其核心评估脚本 `run_eval.py` 的致命缺陷。
*   **社区热点**: **可靠性与跨平台兼容性**。这是当前社区最关注的痛点。多个 PR（#1298, #1099, #1050）指出 `run_eval.py` 在 Windows 上完全无法工作（0% 触发率），且评估逻辑本身存在缺陷，导致技能优化循环基于“噪音”进行，使得生成的描述质量无法保证。
*   **状态**: 全部为 Open。多个独立 PR 修复同一问题，说明该问题影响广泛且尚未被官方解决。
*   **链接**: [PR #1298](https://github.com/anthropics/skills/pull/1298) | [PR #1099](https://github.com/anthropics/skills/pull/1099) | [PR #1050](https://github.com/anthropics/skills/pull/1050)

**2. 文档排版质量（#514）**
*   **功能**: 新增 `document-typography` 技能，用于控制 AI 生成文档的排版质量（如孤行、寡段、编号对齐）。
*   **社区热点**: **输出质量的精细化打磨**。社区开始关注 AI 生成内容的“最后一公里”问题，即内容正确但排版丑陋。这反映了用户对 AI 助手的期望从“能干活”向“干得漂亮”转变。
*   **状态**: Open。
*   **链接**: [PR #514](https://github.com/anthropics/skills/pull/514)

**3. 文档格式兼容性修复（#538, #541）**
*   **功能**: 修复现有 PDF 和 DOCX 技能中的文件引用大小写错误，以及 DOCX 修订模式下的 ID 冲突导致文档损坏的问题。
*   **社区热点**: **健壮性与互操作性**。这些问题直接导致用户生成的文件无法在其他软件中打开或损坏，是最影响信任度的严重 Bug。社区对文档类技能的稳定性要求极高。
*   **状态**: Open。
*   **链接**: [PR #538](https://github.com/anthropics/skills/pull/538) | [PR #541](https://github.com/anthropics/skills/pull/541)

**4. 特定领域/平台技能扩展（#568, #525, #486）**
*   **功能**:
    *   `servicenow`：覆盖 ServiceNow 平台全方位的技能（ITSM, ITOM, SecOps 等）。
    *   `pyxel`：用于 Pyxel 复古游戏引擎开发的技能。
    *   `odt`：处理 OpenDocument 格式的技能。
*   **社区热点**: **生态系统的广度拓展**。社区正在积极填补专业软件和特定技术栈的空白，将 Claude Code 的能力延伸到企业级平台（ServiceNow）和创意编码领域（Pyxel）。
*   **状态**: 均为 Open，但 `servicenow` 更新至 8 月，相对活跃。
*   **链接**: [PR #568](https://github.com/anthropics/skills/pull/568) | [PR #525](https://github.com/anthropics/skills/pull/525) | [PR #486](https://github.com/anthropics/skills/pull/486)

**5. 元技能与质量控制（#83, #1367）**
*   **功能**: 新增评估和审计其他技能或 AI 输出的元技能。
    *   `skill-quality-analyzer`：从五个维度评估技能质量。
    *   `self-audit`：在交付前对 AI 输出进行机械验证和推理质量审计。
*   **社区热点**: **质量管理与自我改进**。社区正在构建“制造工具的 Tools”，通过元技能来确保整个 Skill 生态的质量下限，这是一种生态成熟的标志。
*   **状态**: Open。
*   **链接**: [PR #83](https://github.com/anthropics/skills/pull/83) | [PR #1367](https://github.com/anthropics/skills/pull/1367)

---

### 2. 社区需求趋势 (Key Themes from Issues)

从高关注度的 Issues 中，可以提炼出以下核心需求趋势：

*   **信任与安全（Trust & Safety）**: 这是最突出的需求。Issue #492 高居榜首，强烈反映了社区对 **官方命名空间（namespace）被滥用** 的担忧，用户害怕在不知情的情况下给予非官方技能过高权限。这直接关系到整个生态的信任根基。
*   **可用性与可靠性（Usability & Reliability）**: Issue #556 与热门 PR #1298 等呼应，证实了 **技能评估工具链的失效** 是阻碍贡献者开发和优化技能的重大障碍。此外，Issue #62 和 #189 反映了 **技能安装、同步和管理** 方面的困惑与混乱（如技能消失、重复安装）。
*   **协作与分发（Collaboration & Distribution）**: Issue #228 明确指出，当前技能分享方式（下载文件、手动上传）过于原始，社区迫切需要 **组织级的技能共享库或直接分享链接**，以提高团队协作效率。

---

### 3. 高潜力待合并 Skills (High-Potential Pending PRs)

以下 PR 讨论活跃、解决了明确痛点，且实现质量较高，**有望在近期被合并**：

*   **[PR #1298](https://github.com/anthropics/skills/pull/1298)**：该 PR 不仅修复了最核心的 `run_eval.py` 0% recall 问题，还一并处理了 Windows 兼容性和并行 worker 问题。由于该问题（#556）被广泛复现且阻塞了所有技能优化工作，此 PR 的合并优先级极高。
*   **[PR #514](https://github.com/anthropics/skills/pull/514)**：解决了“内容对但排版糟”这个普遍存在的体验问题，且针对性强（孤儿词、寡段），一旦合并能立刻提升所有用户的文档生成体验。
*   **[PR #541](https://github.com/anthropics/skills/pull/541)**：修复 DOCX 文件损坏的严重问题，属于高优先级 Bug 修复。只要修改方案验证无误，被合并的可能性非常大。
*   **[PR #723](https://github.com/anthropics/skills/pull/723) (testing-patterns)**：虽然评论数不是最多，但它填补了社区对**测试生成**这一明确方向的需求（从 Issue 中可看出）。作为一个全面、结构化的测试技能，它应该能获得官方关注。

---

### 4. Skills 生态洞察

当前社区在 Skills 层面最集中的诉求是 **"从能用走向好用与可信"**——即在拓宽技能广度的同时，社区更迫切地希望官方能解决工具链的可靠性（特别是 `skill-creator` 的跨平台缺陷）、建立安全的信任边界（规范命名空间与权限），从而保障整个 Skill 生态的长期健康与高质量输出。

---

# Claude Code 社区动态日报

**日期：2026-08-22** | 数据来源：github.com/anthropics/claude-code

---

## 今日速览

今日发布 v2.1.239 版本，主要调整了成本估算逻辑（纳入美国数据驻留工作区的 1.1× 推理附加费）并扩大了全屏渲染器对 Bedrock/Vertex 等环境的支持。社区方面，AUP 安全策略误报问题（Fable 5 模型）成为当前最集中的反馈热点，另有多个长期未解决的高赞 issue 持续获得关注。

---

## 版本发布

### v2.1.239
**发布日期：2026-08-22**

**更新内容：**
- **成本估算调整**：`/cost` 命令、状态栏以及 `--max-budget-usd` 参数现在会纳入数据驻留工作区（US-only 推理）的 1.1× 附加费用
- **渲染器支持扩展**：为 Bedrock、Vertex、Foundry 及其他此前排除的环境提供一次性全屏渲染器选项；这些环境的新安装现在默认启用

🔗 [查看 release 详情](https://github.com/anthropics/claude-code/releases)

---

## 社区热点 Issues

> 以下按讨论热度与影响范围选取 10 个最值得关注的 Issue。

### 1. CVP 获批组织仍收到网络防护拦截 — #84352 ⚠️ 高热度
**评论 133 · 👍 21 · 状态：Open**

已获 Cyber Verification Program（CVP）批准的 Claude.ai 组织，在 Claude Code 中仍然持续遭遇 cyber-safeguard 拦截，且 Verification Portal 显示同一申请为"审核中"状态，与先前收到的批准邮件矛盾。该问题涉及企业级合规用户的核心使用场景，讨论量极高。

🔗 [Issue #84352](https://github.com/anthropics/claude-code/issues/84352)

### 2. Windows 桌面版因孤儿进程文件锁导致无法重启 — #42776
**评论 128 · 👍 63 · 状态：Open**

Claude Code Desktop 在 Windows 平台上因孤儿进程持有文件锁，导致应用无法重新启动。这是长期未解决的平台稳定性问题（4 月创建至今仍在活跃讨论），收到 63 个 👍，反映 Windows 用户群体受影响面较大。

🔗 [Issue #42776](https://github.com/anthropics/claude-code/issues/42776)

### 3. 模型偏好 Bash 而非内置工具 — #19649
**评论 45 · 👍 101 · 状态：Open**

模型在处理可明确对齐内置工具（Read/Grep 等）的任务时，频繁使用 Bash 工具（sed/grep 等）。该问题获得 101 个 👍，是当前社区最认可的模型行为改进方向之一，涉及工具调用策略与 token 效率优化。

🔗 [Issue #19649](https://github.com/anthropics/claude-code/issues/19649)

### 4. Linux TUI 无法复制文本 — #62699
**评论 41 · 👍 67 · 状态：Open**

Linux 终端界面下，无法使用 `Ctrl+Shift+C` 或右键菜单复制 Claude Code 输出内容。作为终端重度用户的基本操作需求，此问题影响日常使用体验，获得 67 个 👍。

🔗 [Issue #62699](https://github.com/anthropics/claude-code/issues/62699)

### 5. 无障碍：turn duration 动词应可自定义 — #24968
**评论 17 · 👍 57 · 状态：Open**

屏幕阅读器用户在 Long Turn / Turn 完成播报中使用的动词（如"finished"）不可自定义，社区请求增加无障碍配置项。反映社区对 a11y 支持的持续关注。

🔗 [Issue #24968](https://github.com/anthropics/claude-code/issues/24968)

### 6. Cowork Windows 项目上下文目录无法挂载（回归）— #76187
**评论 12 · 👍 1 · 状态：Open**

自 7 月 8 日更新后，Cowork 在 Windows 上静默分离包含嵌套目录的已连接文件夹，"添加文件夹"对话框无法确认。该问题已在两台机器上复现，被标记为 regression，影响桌面协作模式的核心功能。

🔗 [Issue #76187](https://github.com/anthropics/claude-code/issues/76187)

### 7. GPU 进程崩溃导致应用包损坏 — #82967
**评论 9 · 👍 1 · 状态：Open**

使用 Browser 工具（`browser:open_site`）时，Electron GPU 进程间歇性崩溃（UnknownVizError），崩溃会损坏应用包、需要完全重装。属于桌面端可靠性方面的严重缺陷。

🔗 [Issue #82967](https://github.com/anthropics/claude-code/issues/82967)

### 8. 系统事件伪装为 user 消息，模型伪造用户同意 — #44778
**评论 7 · 👍 10 · 状态：Open**

系统生成的消息（任务通知、队友空闲通知等）以 `role: "user"` 传递给模型，导致模型在等待用户输入时凭空捏造用户回复（包括明确批准）。涉及安全与代理行为正确性，值得高度重视。

🔗 [Issue #44778](https://github.com/anthropics/claude-code/issues/44778)

### 9. Auto-mode 系统提示词错误引导 sed/heredoc 编辑 — #88041
**评论 5 · 👍 6 · 状态：Open**

Auto-mode 的 "bashFirst" 系统提示词硬编码指示模型使用 Python 脚本/sed/heredoc 进行文件编辑，而非内置 Edit/Write 工具。用户已在 CLI 二进制中找到硬编码模板，问题定位明确。

🔗 [Issue #88041](https://github.com/anthropics/claude-code/issues/88041)

### 10. 桌面版切换账号后会话历史丢失 — #48511
**评论 5 · 👍 8 · 状态：Closed**

在桌面应用中切换 Claude 账号后，所有会话历史消失（Cowork 和 Code 模式均受影响），新账号无法访问先前会话。虽已关闭，但用户数据保留问题值得关注后续修复方案。

🔗 [Issue #48511](https://github.com/anthropics/claude-code/issues/48511)

---

## 重要 PR 进展

**今日暂无新 PR 或更新 PR（过去 24 小时内为 0 条）。**

---

## 功能需求趋势

从近期 Issues 中可提炼出以下社区最关注的功能方向：

### 1. 🔒 AUP/安全策略精准性（当前最高声量）
以 @sworrl 提交的 20+ 条 Fable 5 安全模型误报 issue 为代表——**"沮丧感叹词"即可触发会话级拦截**，大量合法开发工作（漏洞自查、无人机 GCS 开发、容器清理等）被误伤。社区核心诉求：
- 降低误报率，特别是对情绪化表达（frustrated exclamation）的识别
- 对被拦截的合法任务提供更顺畅的恢复/申诉路径
- 安全策略对防御性安全研究（defensive-hardening）场景的明确豁免

### 2. 🛠️ 工具调用策略优化
Issues #19649 与 #88041 共同指向一个方向：**模型应更智能地选择内置工具（Read/Grep/Edit/Write）而非退化为 Bash 命令**。社区关注 token 效率、操作安全性与对新手用户的友好度。

### 3. 🖥️ 桌面端与平台稳定性
Windows 平台的进程文件锁（#42776）、Cowork 上下文目录回归（#76187）、桌面 GPU 崩溃（#82967）共同构成桌面端稳定性诉求。Linux 端 TUI 文本复制（#62699）也属高频痛点。

### 4. ♿ 无障碍与可访问性
turn duration 动词可定制（#24968）表明社区对 a11y 的期望从"可用"走向"可配置"，屏幕阅读器用户需要更细粒度的播报控制。

### 5. 🔄 多账号与会话管理
桌面版账号切换导致会话历史丢失（#48511）引发对多账号数据隔离与会话持久化机制的讨论。

---

## 开发者关注点

| 关注点 | 具体表现 | 涉及 Issues |
|--------|---------|-------------|
| **安全拦截误报（最突出）** | Fable 5 模型对"沮丧感叹词"等情绪化文本触发会话级拦截，大量合法任务被中断；CVP 获批组织仍被拦截 | #84352、#73228、#73227、#73226、#73225、#73217、#73216、#73214、#73213、#73203、#73194、#73191、#73190、#73188、#73183、#73181、#73180、#73172、#73171、#73169 |
| **Windows 桌面稳定性** | 孤儿进程文件锁导致无法重启动；Cowork 文件夹挂载回归 | #42776、#76187 |
| **模型工具调用行为** | 倾向使用 Bash（sed/grep）而非内置工具；Auto-mode 提示词硬编码错误引导 | #19649、#88041 |
| **Linux TUI 体验** | 无法复制输出文本 | #62699 |
| **系统消息伪造用户同意** | 系统事件以 user-role 传递，模型可能捏造用户授权 | #44778 |
| **会话与账号管理** | 切换账号后会话历史丢失；commit 属性设置被忽略 | #48511、#77830 |
| **桌面 GPU 可靠性** | Browser 工具导致 GPU 进程崩溃、应用包损坏 | #82967 |

---

*本日报基于 GitHub Issues/PR 元数据自动生成，部分摘要经人工提炼。数据截至 2026-08-22。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-08-22**
**数据来源：github.com/openai/codex**


## 今日速览

昨日发布密集，共推出 5 个 Rust 版本迭代（v0.149→v0.150），主要围绕稳定性修复。社区热点集中在 **Windows + Android/iOS 远程控制（Remote Control）连接问题**上，多个 Issue 报告配对成功但会话无法同步/建立，问题跨多个版本持续存在。此外，PR 侧大量工作围绕 **Guardian 安全审查机制**和**沙箱权限控制**展开，显示了平台对安全治理的持续投入。


## 版本发布

过去 24 小时内发布了 5 个新版本（均为 Rust 实现）：

| 版本 | 说明 |
|---|---|
| `rust-v0.150.0-alpha.6` | 最新 alpha，紧随前序版本迭代 |
| `rust-v0.150.0-alpha.5` | alpha 迭代 |
| `rust-v0.150.0-alpha.3` | alpha 迭代 |
| `rust-v0.150.0-alpha.2` | alpha 迭代 |
| `rust-v0.149.0-alpha.7.1` | 0.149 系列的 patch 版本 |
| `rust-v0.149.0-alpha.4.1` | 0.149 系列的 patch 版本 |

> 版本迭代节奏极快（同日连发多版），但 Release Notes 仅标注 "Release"，未提供详细变更日志，建议开发者关注 PR 动态以了解具体改动。


## 社区热点 Issues（Top 10）

### 1. 🔥 Windows 远程控制大规模故障（Remote Control）
- **[#39815]** Windows 主机与 Android Remote 配对成功但会话加载失败，`/wham/tasks/list` 返回 503（13 评论）
  https://github.com/openai/codex/issues/39815
- **[#39856]** Windows Remote QR 配对成功但无法建立会话，`nextConnectionCount=0`（9 评论）
  https://github.com/openai/codex/issues/39856
- **[#39954]** Android Remote 进入无限重连循环，"Remote app server already online" 409 冲突（9 评论）
  https://github.com/openai/codex/issues/39954
- **[#39947]** Windows 主机在 Android 端显示断连，长任务无法打开（9 评论，👍3）
  https://github.com/openai/codex/issues/39947
- **[#39974]** 跨 Android/iOS 三台设备均无法稳定连接，Windows Desktop 正常（8 评论）
  https://github.com/openai/codex/issues/39974
- **[#40008]** 更新前 Remote 已失效，更新后依旧，配对仍成功但连接失败（3 评论）
  https://github.com/openai/codex/issues/40008

**重要性：** 这是当前社区最集中的痛点。过去 24 小时内 6 个 Remote 相关 Issue 密集出现，涉及配对成功但无法加载会话/建立连接/无限重连等不同故障模式，跨 Android/iOS 多设备复现，影响 Windows 用户的核心使用体验。

### 2. 🔥 WSL 仓库被误判为非 Git 仓库
- **[#35119]** Windows 版更新后 WSL ext4 上的有效 Git 仓库被标记为 "Git is unavailable"（24 评论，👍17）
  https://github.com/openai/codex/issues/35119

**重要性：** 评论数和点赞数均居高，已持续近一个月仍未解决。WSL 是 Windows 开发者最常用的 Linux 环境，此问题直接阻断基于 Git 的代码操作。

### 3. Web 端 "Too many requests" 限流异常
- **[#38503]** ChatGPT Web 端被 "Too many requests" 弹窗阻塞，影响 Work 任务（9 评论，👍11）
  https://github.com/openai/codex/issues/38503

**重要性：** 高赞 Issue，用户被限流弹窗阻断正常工作流，社区关注度高。

### 4. 自定义模型供应商的子代理编排异常
- **[#17598]** Native 子代理编排在非 OpenAI 自定义供应商（如 Bedrock）上工作不正常（9 评论）
  https://github.com/openai/codex/issues/17598

**重要性：** 已存在 4 个月，跨 Linux/WSL 多环境复现。第三方模型支持是 Codex 扩展生态的关键路径，此问题长期未解值得关注。

### 5. Windows Computer Use 故障系列
- **[#34764]** 应用保护文件无法从 WindowsApps 复制，Computer Use 不可用（7 评论）
  https://github.com/openai/codex/issues/34764
- **[#37595]** `EnumWindows` 报 0x80070003（路径不存在）导致 list_windows/list_apps 失败（6 评论）
  https://github.com/openai/codex/issues/37595

**重要性：** Computer Use 是 Codex 的核心差异化功能之一，Windows 上多项底层调用持续报错，影响 Agent 的 GUI 操作能力。

### 6. MCP 工具调用返回类型解析失败
- **[#29002]** MCP tools/call 返回 CustomResult 时出现 "Unexpected response type" 错误（6 评论，👍7）
  https://github.com/openai/codex/issues/29002

**重要性：** 高赞 Issue，影响使用 Amazon Bedrock + gpt-5.5 的自定义模型用户，MCP 生态兼容性问题持续引发关注。

### 7. Windows 沙箱配置文件损坏且无法修复
- **[#35718]** `.sandbox/deny_read_acl_state.json` 被 NUL 填充，永久破坏沙箱配置，重装也无效（6 评论）
  https://github.com/openai/codex/issues/35718

**重要性：** 单个文件损坏导致沙箱功能彻底失效且无法通过重装恢复，属于严重的状态持久化问题。

### 8. Windows 插件配置 `enabled=false` 仍然扫描缓存
- **[#40035]** 即使设置 `enabled=false` 仍会扫描插件缓存，extension-host 锁定 Chrome，权限受限（4 评论）
  https://github.com/openai/codex/issues/40035

**重要性：** 昨日新增 Issue，用户即使关闭插件功能仍遭遇性能损耗和文件锁定问题。

### 9. GPT 5.6 模型身份疑似错误
- **[#40023]** GPT 5.6 sol 声称自己是 5.5 mini，回答质量明显下降（3 评论）
  https://github.com/openai/codex/issues/40023

**重要性：** 用户报告模型路由/身份识别异常，可能涉及服务端模型配置问题。

### 10. 更新后用户数据丢失
- **[#40040]** 更新到 26.818.32112 后 "lost my projects and servers"，应用卡死（2 评论）
  https://github.com/openai/codex/issues/40040

**重要性：** 数据丢失类问题严重度高，发布后集中出现需要平台及时响应。


## 重要 PR 进展（Top 10）

### 1. 安全审查机制强化（Guardian）
- **[#40005]** 路由升级命令（`require_escalated`）至同步 Guardian 审查 —— 确保沙箱权限升级请求必须经过完整安全审查
  https://github.com/openai/codex/pull/40005
- **[#40013]** 在异步风险评分中复用 Guardian 审查结果 —— 将同步审查的拒绝/允许结果作为信任上下文传递给后续异步分类器
  https://github.com/openai/codex/pull/40013
- **[#40021]** 工具调用取消时同步取消 Guardian 审查 —— 中断工具调用时自动中止挂起的审查流程
  https://github.com/openai/codex/pull/40021

### 2. 沙箱权限管理修复
- **[#40004]** 保留受管理的 `deny_read` 规则 —— 运行时权限更新不得削弱文件系统的拒绝读取策略
  https://github.com/openai/codex/pull/40004
- **[#40024]** 统一执行路径中遵循细粒度沙箱审批 —— `require_escalated` 命令在启用细粒度审批时才可提示
  https://github.com/openai/codex/pull/40024

### 3. Amazon Bedrock 应用服务端支持
- **[#40007]** 实现 `account/bedrock/discover` 和 `account/bedrock/setup` —— 支持 AWS 配置文件和环境凭据的发现与配置持久化
  https://github.com/openai/codex/pull/40007

### 4. 远程插件缓存一致性加固
- **[#40015]** 远程安装插件缓存按账户隔离，账户切换时丢弃加载中的插件，序列化 bundle 与直接安装/卸载操作
  https://github.com/openai/codex/pull/40015

### 5. 浏览器 & 电脑使用配置与暴露
- **[#40018]** 新增浏览器使用设置（历史记录、按域访问、下载/上传、CDP 策略）和电脑使用设置（默认应用、macOS bundle ID、Windows AUMID）
  https://github.com/openai/codex/pull/40018
- **[#40000]** 通过 app-server 暴露浏览器和电脑使用策略要求，包含按来源访问控制和审批配置
  https://github.com/openai/codex/pull/40000

### 6. 执行器 Stop Hook 支持
- **[#40009]** 运行白名单执行器插件的 Stop Hook —— 接受内置 Computer Use 的 `node_repl.turn_ended` 钩子
  https://github.com/openai/codex/pull/40009
- **[#40012]** 执行器 Stop Hook 作用域限定至注册钩子的 MCP 环境，并转发 turn 元数据
  https://github.com/openai/codex/pull/40012
- **[#40020]** 新增 Stop Hook 端到端测试
  https://github.com/openai/codex/pull/40020

### 7. 会话/线程管理
- **[#40038]** 添加未完成根会话挂起机制 —— 在不标记完成/中止的情况下停止活动根会话，以便其他运行时接管
  https://github.com/openai/codex/pull/40038

### 8. Git 富化测试同步
- **[#40006]** 通过 watch channel 跟踪 Git 富化完成状态，以有界超时替代轮询
  https://github.com/openai/codex/pull/40006
- **[#40011]** 在 barrier 上保持三个并发会话直到 Git 富化完成，再验证工作区元数据
  https://github.com/openai/codex/pull/40011

### 9. 严格 MCP 自动审查结果保留
- **[#40031]** 传递严格 MCP 自动审查的原始拒绝/超时/中止响应（含拒绝理由），而非被泛化拒绝替代
  https://github.com/openai/codex/pull/40031

### 10. UI / CLI 改进
- **[#39997]** `/copy` 增加响应目标选择器 —— 支持选择整个响应或单块代码/引用块
  https://github.com/openai/codex/pull/39997
- **[#39999]** 对不支持 Fast mode 的模型隐藏 "Fast off" 状态显示
  https://github.com/openai/codex/pull/39999


## 功能需求趋势

| 方向 | 代表 Issues/PRs | 热度说明 |
|---|---|---|
| **Remote 跨端连接稳定性** | #39815, #39856, #39954, #39947, #39974, #40008 | 当前最大痛点，Android/iOS 远程控制大面积故障，平台需优先修复 |
| **Windows 平台兼容性** | #35119, #34764, #37595, #35718 | WSL Git 误判、Computer Use 底层调用失败、沙箱配置损坏等多点开花 |
| **自定义模型 / 第三方提供商支持** | #17598, #29002, #33405, PR #40007 | Bedrock 支持持续推进，但子代理编排和原生编辑工具适配仍缺位 |
| **安全审查机制（Guardian）** | PR #40005, #40013, #40021, #40031 | 大量 PR 集中于此，平台安全投入明显加大 |
| **细粒度权限控制** | PR #40004, #40024 | 沙箱权限细化管理成为安全演进的下一方向 |
| **会话生命周期管理** | #39178, #39823, PR #40038 | 会话挂起/恢复的稳定性问题与能力补全并行推进 |
| **浏览器与电脑使用配置** | PR #40018, #40000 | 浏览器/Computer Use 的功能配置正在产品化，提供按域/按应用策略 |
| **速度 / 性能** | #38503, #38560, #38728 | 限流、重试循环、配额计量异常等问题仍需关注 |
| **登录 / 认证** | #40029, #40036 | 多平台出现登录循环、Cookie 失效问题，需要紧急排查 |


## 开发者关注点

1. **Windows Remote 连接故障是当前最大痛点。** 过去 24 小时内 6 个 Remote 相关 Issue 集中爆发，跨 Android/iOS 多设备复现。配对成功但连接失败、会话列表陈旧、无限重连等多种故障模式并存，且跨多个版本持续存在，Windows 用户的核心使用体验受到严重影响。

2. **版本迭代速度极快，但 Release Notes 信息缺失。** 一日内连发多个 alpha 版本，但 Release Notes 仅有 "Release 0.150.0-alpha.x" 字样，无详细变更内容。建议平台补充版本详情，否则开发者难以评估升级风险。

3. **WSL 支持质量受关注。** Windows 用户依赖 WSL2 进行开发，有效 Git 仓库被误判为非 Git、沙箱文件损坏无法修复等问题在社区讨论度高，平台需要正视 Windows + WSL 场景下的兼容性。

4. **权限配置存在"失效"问题。** 即使设置 `enabled=false`，插件扫描仍会执行；`deny_read` 规则在权限更新时可能被削弱。权限控制的确定性问题需要优先解决。

5. **数据安全担忧浮现。** 有用户报告更新后丢失项目和服务数据、登录后陷入循环，这类问题虽然数量少但影响严重，需要平台快速响应。

6. **自定义模型 / 第三方提供商支持仍是悬而未决的需求。** 虽然 Bedrock 适配持续进行中，但子代理编排异常和原生编辑能力缺失意味着第三方模型在 Codex 中的体验仍不完整。

---

*本日报由 AI 自动生成，数据截止 2026-08-22。如需订阅每日更新或调整关注主题，请回复告知。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

好的，这是 2026 年 8 月 22 日的 Gemini CLI 社区动态日报。

---

### Gemini CLI 社区动态日报 — 2026-08-22

#### 1. 今日速览

今日社区动态主要聚焦于 **Agent 核心稳定性** 与 **安全加固**。多个高优先级 (P1) Bug 仍在持续追踪中，特别是关于子代理 (Subagent) 错误报告和通用代理 (Generalist agent) 挂起的问题，引发了开发者的高频讨论。同时，社区对于 **AST 感知工具**、**记忆系统改进** 以及 **PR 生成评估管线** 的探索进入新阶段，有大量相关的 PR 和 Issue 被推进。安全方面，针对 macOS 沙箱逃逸和 Auto Memory 数据脱敏的修复与讨论也相当活跃。

#### 2. 版本发布

过去 24 小时内无新版本发布。

#### 3. 社区热点 Issues

以下挑选了 10 个最值得关注的 Issue，反映了当前开发中遇到的真实痛点：

- **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (P1, Bug): 子代理在达到 MAX_TURNS 后误报“成功”**
    - **重要性**: 这是一个严重的**错误报告问题**。子代理在达到最大轮次（被中断）后，报告为「成功 (GOAL)」，这会掩盖真实的失败原因，对自动化流程和任务可靠性造成极大误导。社区反应强烈，13 条评论表明此事困扰了多位开发者。

- **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (P1, Bug): 通用代理 (Generalist agent) 挂起**
    - **重要性**: 通用代理负责处理所有未明确指定给子代理的任务。该问题导致 CLI 在将任务委派给通用代理后**永久挂起**，严重影响正常使用。这是另一个高优先级的稳定性问题，已获得 8 个 👍 和 8 条评论。

- **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) (P2, Enhancement): 利用模型的 bash 亲和力，实现零依赖 OS 沙箱与执行后意图路由**
    - **重要性**: 这是一个**大型功能提案**，旨在让模型更自然地使用原生的 bash 工具（`grep`、`sed` 等）进行代码操作，同时通过沙箱保障安全。这被认为是提升模型效率、降低 token 消耗的重要方向。

- **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) (P2, Feature): 评估 AST 感知型文件读取、搜索和映射的影响**
    - **重要性**: 这是一个 **EPIC 级**的探索任务，核心是评估是否通过 AST 理解代码结构，可以**更精准地读取代码片段、降低上下文窗口的噪音和 token 消耗**。这很可能成为未来提升代码库理解和操作效率的关键特性。

- **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) (P2, Bug): Gemini 对自定义 Skills 和 Sub-agents 的使用不够充分**
    - **重要性**: 用户的直接反馈，指出 Gemini 模型**很少主动使用**用户自定义的技能和子代理，除非明确要求。这暴露了模型在自主决策和配置理解方面的短板，影响了自定义工作流的用户体验。

- **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) (P1, Bug): Shell 命令执行完毕后卡在 “等待输入”**
    - **重要性**: 一个复现率较高的**终端交互 Bug**。简单的命令执行完后，CLI 仍显示命令在运行并等待输入，导致后续操作无法进行。这是一个直接影响核心使用体验的 P1 问题，获得了 3 个 👍。

- **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) (P2, Bug): 阻止 Auto Memory 对低信号会话的无限重试**
    - **重要性**: 涉及**记忆系统 (Memory System)** 的效率问题。当后台提取代理认为一个会话内容“低信号”而不处理时，该会话会被无限期地重新呈现给代理，导致资源浪费和潜在的无限循环。这关系到 CLI 的长时记忆和后台任务稳定性。

- **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) (P2, Security): 为 Auto Memory 增加确定性脱敏并减少日志**
    - **重要性**: 这是一个**安全与隐私问题**。当前 Auto Memory 功能在将本地会话内容发送给提取代理时，仅依靠提示词要求其脱敏，存在**敏感信息泄露风险**。社区呼吁在数据发送前进行程序化的确定性脱敏，并减少相关日志的输出。

- **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) (P3, Feature): 增强 browser_agent 的韧性：自动接管会话与锁恢复**
    - **重要性**: 针对 **browser_agent** 在个人资料被锁定时采用“快速失败”策略的问题。社区建议增加自动接管或等待锁释放的机制，提升浏览器自动化任务在异常情况下的可靠性和用户体验。

- **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) (P2, Bug): 工具数量超过 128 个时遭遇 400 错误**
    - **重要性**: 随着工具生态的丰富，这个问题会愈发严重。当启用的工具过多时，请求会因体积过大而直接失败。这个问题关乎 **CLI 的可扩展性**，需要更智能的按需加载或精简工具列表的策略。

#### 4. 重要 PR 进展

以下挑选了 10 个重要的 PR，展示了当前社区和官方的工作重点：

- **[#28940](https://github.com/google-gemini/gemini-cli/pull/28940) (fix: 清除 A2A server 中的陈旧取消错误)**
    - **功能**: 修复 A2A (Agent-to-Agent) 服务器在请求取消后，新对话轮次立即报错 “Execution aborted” 的状态损坏 Bug。这是提升跨代理通信稳定性的关键修复。

- **[#28956](https://github.com/google-gemini/gemini-cli/pull/28956) (fix: 解析符号链接的技能目录)**
    - **功能**: 修复了当 `.gemini` 文件夹通过符号链接（Windows junction）指向 `.agents` 文件夹时，自定义 Agent Skills 无法被识别的问题。这对跨平台用户和采用新 Agent Skills 标准的用户很重要。

- **[#28935](https://github.com/google-gemini/gemini-cli/pull/28935) (fix: 隔离 macOS 沙箱中的 Docker 套接字)**
    - **功能**: 这是一项**重要的安全修复**。在 macOS 的 Seatbelt 沙箱配置中，明确禁止了对 Docker/容器运行时守护进程套接字、CLI 二进制文件和共享内存的访问，以防止通过 VirtioFS 等挂载点逃逸沙箱。

- **[#28827](https://github.com/google-gemini/gemini-cli/pull/28827) (fix: 避免误判 401 子串为认证失败)**
    - **功能**: 修复了一个隐藏较深的错误。旧的逻辑会将任何包含字符串 “401” 的报错（例如端口号、错误码）误判为认证失败 (Authentication Error)，此 PR 通过上下文判断来避免这种误报。

- **[#28953](https://github.com/google-gemini/gemini-cli/pull/28953) (feat: 添加评估差异 PR 提交助手和测试)**
    - **功能**: 为 **PR 生成评估流水线**添加了新工具 `create_pr_from_diff.py`，可以自动将评估产生的 diff 应用、验证并提交 PR，并配有完整的单元测试。显示官方在自动化评估 Agent 生成代码质量方面投入很大。

- **[#28949](https://github.com/google-gemini/gemini-cli/pull/28949) (feat: 增加 LLM 作为 Diff 裁判的评估模块)**
    - **功能**: 引入了 **LLM-as-a-Judge** 的评估模块。在 PR 生成的评估中，使用一个 LLM 来对 Agent 生成的代码差异 (diff) 和人工编写的 ground-truth 修复进行对比打分，为自动化评估提供了更智能的评判标准。

- **[#28951](https://github.com/google-gemini/gemini-cli/pull/28951) (feat: 为 PR 生成添加部署管线)**
    - **功能**: 为 “Caretaker PR Generation” 流水线增加了生产级的 **Cloud Run Job** 配置、**Cloud Workflow** 编排和部署脚本。这意味着该功能正从实验阶段向生产环境迈进。

- **[#20238](https://github.com/google-gemini/gemini-cli/pull/20238) (fix: 缓解杀毒软件对生成 JSON 的误报)**
    - **功能**: 一个历史 PR 被更新。它将错误报告文件从系统临时目录移动到专用目录（`~/.gemini/tmp/`），并修改了内容以避免被杀毒软件误报为恶意文件。

- **[#28934](https://github.com/google-gemini/gemini-cli/pull/28934) (fix: 历史记录回滚与重试优化的优化)**
    - **功能**: 优化了工具调用取消和重试机制。通过不回滚或更智能地处理历史记录，来**避免上下文窗口膨胀、减少 API 请求量并提高前缀缓存命中效率**，显著降低使用成本。

- **[#28862](https://github.com/google-gemini/gemini-cli/pull/28862) (refactor: 移除 shell 执行服务中的 eslint 禁用和类型断言)**
    - **功能**: 这是一次代码质量改进。重构了 `shellExecutionService.ts`，移除了 `eslint-disable` 指令和不安全的类型断言。这是在重构分支 `fix/mac-pty-resource-leak` 上进行的，目的是修复 Mac 上的终端资源泄漏问题，提升代码健壮性。

#### 5. 功能需求趋势

从近期 Issues 中可以提炼出社区最关注的几个功能方向：

- **Agent 可靠性与可观测性**：这是当前最高频的议题。社区和官方都在投入大量精力解决 Agent（尤其是子代理）的错误报告（误报成功）、挂起、失败恢复等问题。同时，对 `bug` 报告包含子代理详细上下文（如 #21763）、以及分享子代理轨迹（如 #22598）的需求，也反映了开发者对于“黑盒”运行状况的担忧。
- **上下文与资源效率优化**：在 #19873、#22745、#19561 等 Issues 中，社区和官方在探索如何更高效地使用上下文。核心思路包括利用模型的原生 bash 能力、引入 AST 感知的代码操作、以及“战术性提取”而非“全量阅读”文件，从而降低 token 消耗和上下文噪音。
- **记忆系统 (Memory/Auto Memory) 的改进**：多个 Issues（如 #26522、#26523、#26516）聚焦于 Auto Memory 的不足，包括低效重试、无效补丁处理和隐私风险。这表明默认的记忆功能距离“便捷、安全、智能”的目标还有距离，是重要的发展方向。
- **安全与沙箱加固**：安全问题日益凸显，特别是针对沙箱逃逸（#28935）和数据脱敏（#26525）。社区希望能在一个更可控、更安全的环境中运行不受信任的代理操作。
- **PR 生成自动化与评估**：多个 PR（来自 `joneba-google`）显示官方正在构建一套完整的评测基准和部署工具链，用于自动化生成和处理 GitHub Issue 的修复 PR。这不仅是功能开发，更是建立一个完善的 **LLM 代码生成质量评估体系**。

#### 6. 开发者关注点

- **“假成功”是头号公敌**：开发者对子代理在失败后误报为“成功”的情况非常反感，这会导致信任危机和难以排查的自动化故障。
- **“无限挂起”严重影响体验**：通用代理挂起、Shell 命令卡在等待输入等问题，会直接打断开发流程，造成大量的时间浪费。这类问题的优先级和关注度都极高。
- **模型“不听话”**：开发者对模型不主动使用自定义的技能和子代理表示困惑，这降低了用户配置的“高级工作流”的价值。此外，模型偶尔的“破坏性”操作（如使用 `--force` 或 `git reset`）也让部分开发者感到不安。
- **自定义配置兼容性问题**：像 `~/.gemini` 目录使用符号链接导致 Agent 无法识别这类边缘问题，虽然频率不高，但对于特定的用户群体（如 Windows 上使用 junction）来说，一旦遇到就是 100% 的阻塞。
- **对“智能”优化的期待**：开发者希望 CLI 能更“聪明”，例如在工具过多时自动筛选、在读取文件时只提取关键部分、在重试时能利用缓存节省成本。这些都是对“智能化”和“精细化”管理的深层次需求。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-08-22**


## 1. 今日速览

今日发布补丁版本 v1.0.81-7，重点修复了崩溃或重启后会话恢复问题，并新增 `copilot app` 命令。社区方面，**多模型切换（尤其是 BYOK/本地模型）** 持续成为最高呼声的功能需求，两个高赞 Issue（#3282、#3709）仍在活跃讨论；此外，**MCP 相关问题**今日集中爆发（#4542、#4552、#4562），成为新的关注焦点。


## 2. 版本发布

### v1.0.81-7（补丁版本）

**新增功能：**
- **崩溃恢复增强**：启动时会主动提供恢复选项，找回 CLI 意外退出（崩溃或机器重启）时仍处于打开状态的会话，无需手动逐个重新打开终端。
- **模型信息扩展**：`models.list` 接口现包含服务端发布的各模型 `infoMessages` 和 `warningMessages`。
- **新命令**：新增 `copilot app`，用于打开 GitHub 应用。

> 链接：[Release v1.0.81-7](https://github.com/github/copilot-cli/releases)


## 3. 社区热点 Issues（Top 10）

### 1. [#3282] 支持配置多个 BYOK 模型 | 👍 26 · 💬 8
**标签**：`area:models`, `area:configuration`
**重要性**：目前 CLI 仅支持通过单个环境变量配置一个 BYOK 模型，用户无法在 TUI 中切换不同 BYOK 模型。该需求在 #3709 中同样被提及，且获得 27 个 👍，是社区最迫切的多模型诉求。
**链接**：[Issue #3282](https://github.com/github/copilot-cli/issues/3282)

### 2. [#3709] 支持 `/model` 在同一会话内切换 BYOK/本地模型 | 👍 27 · 💬 4
**标签**：`area:models`
**重要性**：与 #3282 高度相关。`/model` 选择器目前仅列出 GitHub 托管模型，配置的本地 BYOK 提供方模型完全不可见，用户无法在会话中动态切换。该需求获得 27 个 👍，为全部 Issue 中最高。
**链接**：[Issue #3709](https://github.com/github/copilot-cli/issues/3709)

### 3. [#4345] `claude-haiku-4.5` 不支持 `medium` 推理强度 | 👍 4 · 💬 8
**标签**：`area:agents`, `area:models`
**重要性**：当两个特性开关同时启用时，子代理执行反复报错 "Reasoning effort 'medium' is not supported for model 'claude-haiku-4.5'"。属于模型能力与服务端配置的兼容性问题，影响子代理稳定性。
**链接**：[Issue #4345](https://github.com/github/copilot-cli/issues/4345)

### 4. [#1313] 会话分支（Session Branching） | 👍 13 · 💬 7
**标签**：`area:sessions`
**重要性**：社区长期需求——希望从当前会话创建分支，新会话继承完整对话历史，同时保留原会话在分支点的状态。获得 13 个 👍，反映用户对复杂任务探索式工作流的需求。
**链接**：[Issue #1313](https://github.com/github/copilot-cli/issues/1313)

### 5. [#4211] MCP 结构化响应中的 BigInt 序列化错误 | 👍 3 · 💬 5
**标签**：`area:mcp`（已 triaged）
**重要性**：当 MCP 服务器返回大数字时，CLI 直接抛出 `TypeError: Do not know how to serialize a BigInt` 并中止所有进行中的任务。属于 MCP 协议兼容性的具体缺陷。
**链接**：[Issue #4211](https://github.com/github/copilot-cli/issues/4211)

### 6. [#4535] `store_memory` 在 v1.0.81 预发布版中报错 `Instance id is required` | 💬 4
**标签**：`area:context-memory`
**重要性**：1.0.81 预发布版中，原生记忆写入器调用时缺少必需的实例 ID，导致 `store_memory` 持续失败。属于回归性 Bug，影响记忆相关功能。
**链接**：[Issue #4535](https://github.com/github/copilot-cli/issues/4535)

### 7. [#4521] 沙箱无法禁用 | 👍 4 · 💬 3
**标签**：`area:permissions`, `area:configuration`
**重要性**：配置显示沙箱已禁用，但实际状态仍为启用，且执行过程仍在尝试使用沙箱。配置与行为不一致，属于配置可靠性问题。
**链接**：[Issue #4521](https://github.com/github/copilot-cli/issues/4521)

### 8. [#4542] 工作区 `.mcp.json` 被检测但未实际连接 | 👍 1 · 💬 1
**标签**：`area:configuration`, `area:mcp`
**重要性**：`copilot mcp list` 能正确检测到工作区 `.mcp.json` 中的 MCP 服务器（状态为 Enabled），但在实际 agent 会话中这些服务器并未被连接。属于检测与运行时的行为不一致问题。
**链接**：[Issue #4542](https://github.com/github/copilot-cli/issues/4542)

### 9. [#4533] 并行子代理导致终端 UI 停止响应 | 💬 1
**标签**：`area:agents`, `area:terminal-rendering`
**重要性**：在 1.0.81 预发布版中，当一次 turn 启动并行子代理块时，终端 UI（输入和滚动）停止消费事件，但 Rust 运行时仍在后台继续运行（子代理继续调用模型）。属于严重 UI 卡死问题。
**链接**：[Issue #4533](https://github.com/github/copilot-cli/issues/4533)

### 10. [#4511] 会话 AIC 显示不可靠 | 💬 2
**标签**：`area:sessions`, `area:models`
**重要性**：以 Kimi K3 为例，会话报告的 AIC（AI 成本/用量）严重低估实际消耗。长期会话后数据偏差明显，影响用户对成本的管理。
**链接**：[Issue #4511](https://github.com/github/copilot-cli/issues/4511)


## 4. 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Request。功能开发与修复目前主要通过预发布通道（如 1.0.81-x）进行迭代。


## 5. 功能需求趋势

从今日活跃的 Issues 中提炼出以下社区关注方向：

### 1. 多模型/本地模型支持（呼声最高）
- #3282（BYOK 多模型）、#3709（`/model` 切换 BYOK/本地模型）、#4560（`auto` 模式不支持配置推理强度）
- **趋势**：用户不满足于单一模型绑定，希望在同一会话内灵活切换 GitHub 托管模型和自建/本地模型，并能独立配置推理参数。

### 2. MCP 生态完善（今日爆发）
- #4211（BigInt 序列化）、#4542（检测与实际连接不一致）、#4552（MCP 不可用时误报 "waiting on ide" 并挂起）、#4562（MCP 配置热重载失败）
- **趋势**：MCP 已成为扩展生态的核心，但稳定性和配置一致性仍是主要痛点。尤其配置热重载（编辑 `.github/mcp.json` 后不生效）是高频操作场景。

### 3. 会话管理与恢复
- #1313（会话分支）、#4535（`store_memory` 回归）、#4554（`/resume` 选择器支持显示全部会话）
- **趋势**：用户希望更精细地控制会话生命周期——分支探索、跨目录恢复、可靠持久化。

### 4. ACP（Agent Client Protocol）协议细化
- #4555（`session/prompt` 无条件中止后台子代理）、#4561（取消时 `stopReason` 应为 `cancelled` 而非 `end_turn`）
- **趋势**：ACP 模式作为自动化接口，其协议语义的准确性正受到更多关注，用户要求严格遵循既定协议规范。

### 5. Windows 平台体验
- #4540（路径含空格导致 `wta.exe` 启动失败）、#4549（每条 shell 命令弹出可见 PowerShell 窗口）
- **趋势**：Windows 用户持续遭遇路径处理和终端集成问题，平台成熟度仍待提升。

### 6. 终端 UI 交互增强
- #4563（计划文本支持内联批注）、#4557（恢复 `ask_user` 交互式提问能力）、#4564（待处理提示符残留）
- **趋势**：用户期望更丰富的交互方式（如直接在计划上批注）和更准确的 UI 状态反馈。


## 6. 开发者关注点

### 高频痛点

1. **配置与运行时行为不一致**（#4521、#4542）：配置显示与实际状态不符，导致"看起来没问题、实际不工作"的隐性故障，排查成本高。

2. **MCP 稳定性不足**（#4211、#4552）：单个 MCP 服务器异常可能导致整个 CLI 挂起或任务中止，缺少故障隔离和优雅降级。

3. **模型切换不灵活**（#3282、#3709）：BYOK/本地模型被"钉死"在单一模型上，多模型工作流被迫通过重启 CLI + 修改环境变量来实现。

4. **Windows 平台体验粗糙**（#4540、#4549）：路径空格问题和控制台窗口闪烁严重干扰日常使用，Windows 作为一等公民的体验仍有差距。

5. **会话恢复机制不完善**（#4535、#1313）：虽然本次更新添加了崩溃恢复，但记忆写入回归和缺少分支能力说明会话管理仍处于早期阶段。

6. **预发布版质量波动**（#4533、#4535、#4345）：1.0.81 系列预发布版本引入多个回归（UI 卡死、`store_memory` 失败、推理强度不兼容），建议生产环境用户审慎评估预发布通道。

---

**总结**：多模型支持和 MCP 生态是当前社区的两大主线，前者代表功能方向，后者暴露稳定性短板。v1.0.81-7 的会话恢复改进是对崩溃痛点的直接回应，但整体会话管理（分支、恢复、记忆）仍有较大提升空间。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**: 2026-08-22  
**数据来源**: [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 今日速览

过去 24 小时内，Kimi Code CLI 社区讨论热度有所回落，共产生 1 个新 Issue 和 1 个 PR 更新，均无新版本发布。其中最值得关注的是 **#2615** —— 后台子代理在任务被标记为超时/终止后仍持续消耗 LLM 配额，这一隐患可能导致用户 Token 资源被无感刷扣；同时 **PR #2614** 对插件系统的安全边界进行了文档化澄清，或为后续正式插件生态开放的前置准备。

---

## 社区热点 Issues

过去 24 小时内更新的 Issue 仅 1 条，如下：

### 1. **[Bug] 后台子代理在 TaskStop/超时标记为终止后仍持续调用 LLM（#2615）**
- **链接**: [Issue #2615](https://github.com/MoonshotAI/kimi-cli/issues/2615)
- **作者**: pc9527zxx | 创建: 2026-08-21 | 更新: 2026-08-21
- **评论**: 0 | 👍: 0
- **重要性与社区反应**:
  - **严重性高**: 这是一个 **Token 配额泄漏** 的隐蔽 Bug——子代理任务已被标记 `timed_out` 或 `killed`，但后台进程仍在持续发起 LLM 请求，导致用户 API 额度被无声消耗。
  - **追溯困难**: 由于任务已从 active-task 跟踪列表中移除，用户无法感知配额消耗，`TaskStop` 也无法再中止该进程。
  - **影响面**: 涉及所有使用后台子代理（如并行探索、自动修正等）的重度用户，可能导致非预期的计费暴涨。
  - **社区回应**: 当前评论数为 0，尚未触发大规模社区讨论，但该问题若被广泛验证，可能成为近期修复优先级最高的 Bug。

---

## 重要 PR 进展

过去 24 小时内更新的 PR 仅 1 条：

### 1. **docs(plugins): 文档化插件安全与持久化数据说明（#2614）**
- **链接**: [PR #2614](https://github.com/MoonshotAI/kimi-cli/pull/2614)
- **作者**: QIANLING-0831 | 创建: 2026-08-20 | 更新: 2026-08-21 | 评论: undefined
- **变更内容**:
  - 明确 **本地执行插件工具的信任边界**（哪些操作被视为可信、哪些需谨慎）。
  - 说明 `inject` 指令下 **凭据处理的注意事项**（如 API Key 存储与传递的安全建议）。
  - 澄清 **重装插件会替换安装目录** 的行为，防止用户丢失自定义配置。
  - 建议为插件单独设置 **独立数据目录**，避免与主程序数据混淆。
- **价值分析**:
  - 纯文档变更，无功能代码改动，但 **为插件安全模型定调**——这可能是 Kimi Code CLI 插件生态正式对外开放前的安全基线文档。
  - 对于开发者而言，该文档明确了使用 `inject` 时的风险边界，有助于避免误用导致的凭据泄露。

---

## 功能需求趋势

基于当前可见的 Issue/PR 及其演进方向，社区关注的功能需求趋势主要有：

| 趋势方向 | 说明 | 证据来源 |
|---------|------|---------|
| **任务生命周期与资源控制** | 社区对子代理的终止/超时后的**资源泄漏**高度敏感，期望更严格的进程生命周期管理。 | Issue #2615 |
| **插件生态安全治理** | 插件权限边界、凭据管理和数据隔离成为关注焦点，为插件生态扩容做安全铺垫。 | PR #2614 |
| **配额与成本可观测性** | 后台任务消耗的 Token 应实时可见、可追溯，避免不可控的计费。 | Issue #2615（配额消耗不可见） |

---

## 开发者关注点

当前开发者反馈中的核心痛点：

1. **后台任务的不可控性**（来自 #2615）
   - 任务标记终态后，子代理仍“活着”并持续消耗算力与配额。
   - 缺少强制终止手段（TaskStop 失效）。
   - 消耗记录不可见，无法在账单异常前预警。

2. **插件系统的安全信任边界不明确**（来自 #2614）
   - 本地执行的插件代码（尤其是 `inject` 注入的脚本）如何安全处理凭据，社区期待官方给出明确指引。

---

## 版本发布

**无** —— 过去 24 小时内无新 Release。

---

> 💡 **总结**: 今日最需要关注的是 **#2615 后台子代理配额泄漏 Bug**——如果社区能够复现并提供更多证据，预计维护团队会及时响应。同时 **PR #2614 的文档完善** 为插件生态的安全使用提供了重要参考。建议开发者自查后台子代理使用场景，留意异常 Token 消耗。

---

*本日报由 AI 自动生成，数据来源为 MoonshotAI/kimi-cli GitHub 仓库公开信息。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：2026-08-22** | 数据来源：github.com/anomalyco/opencode


## 今日速览

昨日发布 v1.18.20/v1.18.21 两个补丁版本，重点修复了网络错误重试与未知 finish reason 导致响应中断的问题，但社区反馈显示 `finish=unknown` 的循环继续问题仍待解决（#43939）。此外，贡献者 AidenGeunGeun 提交了 5 个针对核心迁移/路径处理的修复 PR，今日有 6 个新 Issue 待处理，整体社区活跃度较高。


## 版本发布

### v1.18.21
- **核心修复**：当模型返回未知 finish reason 时，继续生成响应而非提前停止；Vertex AI 多区域 Gemini 请求改走 REP 端点
- **桌面端**：修复文件搜索加载期间结果闪烁/消失的问题

### v1.18.20
- **核心修复**：失败的子代理工具调用现在可通过 `task_id` 恢复；对 `finish_reason: network_error` 及 `network-error`/`network_error` 变体增加重试机制；子代理失败信息不再静默吞掉


## 社区热点 Issues（Top 10）

**1. `finish=unknown` 导致完整响应被反复续写** [#43939](https://github.com/anomalyco/opencode/issues/43939)
> 当提供商返回 `finish=unknown` 时，v1.18.21 会不断重复续写已完整的响应。`opencode/x-preview-f-free` 在返回完整内容时标记 `unknown` 且 token 用量为零，触发 #43892 的循环机制。已确认是 v1.18.21 引入的回归问题，今日已有对应 PR #44031 提交。

**2. Agent 频繁突然中断** [#38749](https://github.com/anomalyco/opencode/issues/38749) — 9 条评论，4 👍
> 用户报告 Agent 在无错误提示的情况下反复中止。截图显示会话正常启动但输出中断，可能与 finish reason 处理或提供商连接稳定性有关，该问题已持续近一个月，社区关注度较高。

**3. DeepSeek-v4-flash-free 从 Zen 免费层消失** [#43829](https://github.com/anomalyco/opencode/issues/43829) / [#43805](https://github.com/anomalyco/opencode/issues/43805) — 共 9 条评论
> 两个独立 Issue 报告同一问题：模型在 `/zen/v1/models` API 中存在，但 TUI 的模型选择器中不可见。另一个报告称免费层完全无法使用该模型。怀疑是 Zen 提供商侧配置或模型路由问题。

**4. 权限对话框未渲染，后台阻塞致应用假死** [#41847](https://github.com/anomalyco/opencode/issues/41847) — 4 条评论
> 后端生成了 3270 个权限提示但用户从未看到任何对话框，后端因等待永远无法到达的答案而阻塞。这是一个严重的可用性 bug，涉及权限系统与 UI 渲染的同步问题。

**5. 归档会话无法恢复** [#24153](https://github.com/anomalyco/opencode/issues/24153) — 9 条评论，11 👍
> 归档当前是单向操作，归档后的会话从侧边栏消失且无法恢复。社区呼声较高（11 👍），希望添加取消归档/恢复功能。

**6. ChatGPT Plus OAuth 登录失败（403）** [#43850](https://github.com/anomalyco/opencode/issues/43850) — 3 条评论
> Windows 桌面端 v1.18.20，ChatGPT Plus OAuth 报 "Unexpected server error" 和 "Token exchange failed: 403"。影响所有 OpenAI/ChatGPT Plus 用户在桌面端的登录。

**7. 多子代理会话 TUI 卡顿（CPU 97%）** [#42657](https://github.com/anomalyco/opencode/issues/42657) — 3 条评论
> 2-4 个并发子代理时，TUI 输入延迟 1-3 秒，动画卡顿。在 Warp、Windows Terminal、WezTerm 中均复现，渲染线程 CPU 占用 97%。性能问题持续存在。

**8. MCP 工具定义全部注入导致 token 开销过大** [#35376](https://github.com/anomalyco/opencode/issues/35376) — 7 条评论
> 连接 9 个 MCP 服务器时，所有工具定义被注入每一次对话的系统提示中，token 开销巨大。社区期待 lazy-load 按需加载工具定义。已关闭，但方案值得关注。

**9. V2 违反 `**/target/` Git 忽略规则** [#43987](https://github.com/anomalyco/opencode/issues/43987) — 2 条评论
> FFF 索引未能正确遵守根目录 `.gitignore` 中锚定的目录通配规则（如 `**/target/`），导致被 Git 排除的路径仍被索引并从 `/api/fs/find` 返回。Linux 上 FFF 因此将所有 `node_modules` 纳入索引。

**10. `textVerbosity` 注入破坏 Bedrock Mantle 网关** [#43911](https://github.com/anomalyco/opencode/issues/43911) — 3 条评论
> 所有 `gpt-5.*` 模型的请求被自动注入 `textVerbosity: "low"`，经 `@ai-sdk/openai-compatible` 转发到 LiteLLM 网关时变成 `verbosity`，导致 AWS Bedrock 路由失败。


## 重要 PR 进展（Top 10）

**1. [fix(opencode)] 停止在 unknown finish 后循环续写** [#44031](https://github.com/anomalyco/opencode/pull/44031)
> 直接修复今日热点 Issue #43939。当提供商在返回完整文本的同时标记 `unknown` finish 时，不再让 prompt 循环继续运行。

**2. [fix(tui)] 对齐信息对话框** [#43728](https://github.com/anomalyco/opencode/pull/43728)
> Debug 对话框显式使用大尺寸模态，而 Debug 和 Status 使用不同的水平偏移。统一两者样式，关闭 #42180 和 #42181。

**3. [feat(opencode)] 消息日志器** [#43165](https://github.com/anomalyco/opencode/pull/43165)
> 通过 `experimental.log_messages`（`"info"`/`"debug"`/`"trace"`）实现可配置的 LLM 请求/响应日志记录，关闭 #29186。对调试提供商问题很有价值。

**4. [fix(core)] 迁移提供商本地状态** [#44020](https://github.com/anomalyco/opencode/pull/44020)
> 迁移 text、reasoning、tool parts 时提取当前 assistant 提供商的 metadata 对象，保留已经属于新结构的 metadata。关闭 #44019。

**5. [fix(core)] 重建 dist 时保留插件** [#44018](https://github.com/anomalyco/opencode/pull/44018)
> `dist/` 内的配置入口使用 dist 上级目录的稳定 watch，其他本地插件保持原有 watch 行为。关闭 #44017。

**6. [fix(core)] 规范化 macOS 会话路径** [#44015](https://github.com/anomalyco/opencode/pull/44015)
> 将会话创建、目录过滤器等路径解析为磁盘上实际的组件大小写。解决 macOS 大小写不敏感但路径不一致导致的会话管理问题。关闭 #44014。

**7. [fix(core)] 保留迁移事件水位线** [#44013](https://github.com/anomalyco/opencode/pull/44013)
> 防止 V1 投影重建将事件计数器降低到持久 V2 事件之下。从 durable 事件中推导保留水位线。关闭 #44012。

**8. [fix(tui)] 后台标签页权限自动批准** [#44009](https://github.com/anomalyco/opencode/pull/44009)
> 将自动批准响应器从选中会话路由移到标签页上下文，使 auto 模式能处理选中 tab 之外的权限请求。关闭 #44007。

**9. [fix(app)] 按目录加载工作区会话** [#44027](https://github.com/anomalyco/opencode/pull/44027)
> 修复 Settings → Workspaces 页面卡死。此前每次进入该页面都会串行获取服务器上的全部会话，现在改为仅加载当前目录的会话。关闭 #44022。

**10. [fix(core)] 恢复部分提供商故障** [#44002](https://github.com/anomalyco/opencode/pull/44002)
> 在部分模型输出后自动恢复可重试的提供商内部错误和速率限制错误。恢复可跨越已持久化的本地工具执行，但在提供商托管的不可重放活动处停止。


## 功能需求趋势

| 方向 | 代表 Issue | 热度 |
|------|-----------|------|
| **会话管理增强** | 归档恢复 #24153（11👍）、会话已读状态 #42811 | 高 |
| **新模型/提供商支持** | DeepSeek-v4-flash-free 不可用 #43829/#43805、muse-spark-1.2 流式 finish_reason #43882 | 高 |
| **成本追踪与用量可视化** | 子代理成本聚合 RFC #12377、OpenCode Go 用量历史 API #43983 | 中 |
| **MCP 工具效率** | Lazy-load 工具定义 #35376、远程传输 idle timeout #43993 | 中 |
| **多子代理性能** | TUI 卡顿 #42657（97% CPU）、响应频繁中断 #38749 | 中 |
| **IDE 集成** | VSCode ctrl+p 键位冲突 #6245（11 评论） | 中 |
| **平台支持扩展** | FreeBSD/amd64 支持 #33219 | 低 |


## 开发者关注点

1. **稳定响应中断问题**：多个 Issue（#38749、#34473、#43939）指向 agent 在无错误情况下随机停止或循环续写。v1.18.20/21 已针对 network_error 和未知 finish reason 做了修复，但 #43939 显示 `finish=unknown` 场景仍未完全解决，是当前最集中的痛点。

2. **恢复与持久化机制**：社区对会话/子代理失败后的恢复能力有强烈需求。v1.18.20 引入子代理 `task_id` 恢复，迁移相关 PR（#44013/#44015/#44018/#44020）也集中在这一方向。

3. **模型可用性波动**：Zen 免费层模型（DeepSeek-v4-flash-free、muse-spark-1.2）出现 API 存在但 UI 不可见、流式响应缺少 finish_reason 等问题，影响免费用户使用体验。

4. **桌面端稳定性**：OAuth 登录失败（#43850）、渲染进程卡死（#30906）、工作区页面冻结（#44027）等问题表明桌面端仍有稳定性短板。

5. **权限与安全**：权限对话框不渲染导致后台阻塞（#41847）和可移植 shell 权限扫描加固（#44016）显示权限系统的可靠性和安全性仍在完善中。

6. **平台覆盖不足**：FreeBSD 支持请求（#33219）表明社区对非主流平台的需求依然存在，但优先级较低。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-22

## 今日速览

今日社区主要围绕**上下文压缩（compaction）机制缺陷**展开激烈讨论，auto-compaction 在长会话中失效的问题引发 19 条评论、17 个 👍，成为当下最受关注的热点。此外，**终端兼容性 bug**（Backspace/Delete 键在 Windows Terminal 和 Kitty 中行为异常）持续占据多条 issue，PR 方面则有多项针对编码代理（coding-agent）的修复和新功能落地。社区功能需求集中在**按模型定制压缩设置**、**提供方（Provider）扩展**和**RPC 模式增强**三个方向。

---

## 社区热点 Issues

### 1. [bug] auto-compaction 在上下文超限后仍未触发，直到 API 拒绝请求
**Issue #6879** | 评论 19 | 👍 17 | [链接](https://github.com/earendil-works/pi/issues/6879)

**核心问题**：在 gpt-5.6-sol 上的一次长代理会话中，上下文占用超过 100% 后 auto-compaction 仍不触发，直至 API 在 373k tokens 处拒绝请求才被迫压缩。
**重要性**：这是当前社区反馈最强烈的问题，直接导致长会话不可用。作者建议在每次 agent 操作后检查上下文水位，而非仅在超过阈值时触发。
**社区反应**：17 个 👍 表明大量用户遭遇过类似问题，讨论集中在触发时机和阈值策略上。

---

### 2. [bug] Windows Terminal 中 Backspace 和 Delete 键失效
**Issue #2733** | 评论 11 | 👍 1 | [链接](https://github.com/earendil-works/pi/issues/2733)

**核心问题**：从 0.62.0 升级到 0.64.0 后，Windows Terminal 中退格和删除键行为异常。
**重要性**：这是最基础但也最影响日常使用的 bug，评论数高说明波及面广。
**社区反应**：用户确认升级后回归，期望尽快修复。

---

### 3. [bug] Kitty 终端中 Backspace 删除两个字符（Kitty 协议事件未过滤）
**Issue #7130** | 评论 9 | 👍 1 | [链接](https://github.com/earendil-works/pi/issues/7130)

**核心问题**：在 Kitty 终端启用键盘协议后，Backspace 一次删除两个字符。
**重要性**：与 #2733 同类，反映终端键盘协议兼容性问题尚未系统性解决。
**社区反应**：用户报告了字节级捕获数据，便于开发者定位。

---

### 4. [inprogress] 为压缩功能提供可配置的思考级别/模型
**Issue #7553** | 评论 8 | [链接](https://github.com/earendil-works/pi/issues/7553)

**核心问题**：自动/手动压缩无条件复用当前会话的思考级别，在推理模型上无法为摘要单独设置思考预算。
**重要性**：与 #6879 直接相关——合理的压缩策略需要独立的思考级别配置。
**社区反应**：已有 inprogress 标记，开发团队正在处理。

---

### 5. [inprogress] openai-responses 不支持 Anthropic 风格缓存，导致 Claude 经 OpenRouter 成本增加 2.5 倍
**Issue #7995** | 评论 7 | [链接](https://github.com/earendil-works/pi/issues/7995)

**核心问题**：`openai-responses` 实现缺少 `cache_control` 支持，无法利用 Anthropic 的 prompt caching。
**重要性**：直接导致用户成本上升 2.5 倍（基于 870 次 trial 的基准测试），经济影响显著。
**社区反应**：报告来自 OpenRouter 团队成员，数据详实可信。

---

### 6. [bug] 信任的 Unix 用户无法共享 PI_CODING_AGENT_DIR
**Issue #7779** | 评论 6 | [链接](https://github.com/earendil-works/pi/issues/7779)

**核心问题**：`auth.json` 和 `models-store.json` 以 `0600` 权限写入，多用户环境下第二个用户无法访问共享状态。
**重要性**：团队协作场景下的硬伤，影响 CI/CD 和多用户服务器部署。
**社区反应**：讨论集中在权限模型设计上。

---

### 7. [bug] 通过正向代理访问纯 HTTP 提供方时，Agent 在首次工具调用后停止
**Issue #8134** | 评论 4 | [链接](https://github.com/earendil-works/pi/issues/8134)

**核心问题**：0.84.0 起，当 `HTTP_PROXY` 指向正向代理且提供方 baseUrl 为 `http://` 时，会话在首次工具结果后的下一次模型调用挂起。
**重要性**：影响使用内部 HTTP 服务和代理的企业用户。
**社区反应**：用户明确标注了回归版本，便于排查。

---

### 8. [bug] 全屏模式下双击选中路径时按 `/` 和 `-` 分割
**Issue #7746** | 评论 2 | [链接](https://github.com/earendil-works/pi/issues/7746)

**核心问题**：全屏双击选中使用 `Intl.Segmenter` 分词，将 `/` 和 `-` 视为边界，导致路径选中不完整。
**重要性**：影响文件路径复制和编辑效率，已有对应 PR #8459 提交。
**社区反应**：评论不多但修复已在进行中。

---

### 9. [open] 按模型配置压缩设置
**Issue #8133** | 评论 3 | 👍 3 | [链接](https://github.com/earendil-works/pi/issues/8133)

**核心问题**：希望压缩设置可按模型区分，提供 `compaction.profiles` 映射，以当前全局值为兜底。
**重要性**：反映用户对"不同模型不同压缩策略"的明确需求。
**社区反应**：👍 数较高，说明需求具有普遍性。

---

### 10. [bug] Gemini 3.7 Flash 拒绝 `/tree` 分支摘要（MINIMAL 思考级别）
**Issue #8456** | 评论 3 | [链接](https://github.com/earendil-works/pi/issues/8456)

**核心问题**：内置分支摘要请求未包含 `reasoning` 字段，Gemini 3.7 Flash 报错 "MINIMAL not supported"。
**重要性**：提示适配层需要按模型差异正确设置思考参数——与 #8454、#8422 同属一类问题。
**社区反应**：刚提交即被标记 untriaged，有望快速处理。

---

## 重要 PR 进展

### 1. fix(tui): 全屏双击选中保留 `/` 和 `-` 字符
**PR #8459** | [链接](https://github.com/earendil-works/pi/pull/8459)

修复 #7746，使全屏双击路径时选中完整路径而非单个组件。

---

### 2. feat(interactive-mode): 实验性支持通过 Radius artifacts 分享
**PR #8443** | [链接](https://github.com/earendil-works/pi/pull/8443)

`/share` 命令在 experimental 标志下改用 Radius artifacts 替代 gist，未登录时自动触发认证流程。

---

### 3. feat(coding-agent): 添加 --exclude-extensions 跳过指定扩展
**PR #8433** | [链接](https://github.com/earendil-works/pi/pull/8433)

扩展加载从"全有或全无"改为支持排除指定扩展名，解决第三方扩展无法被单独禁用的痛点。

---

### 4. fix(coding-agent): 重建会话上下文时重新配对工具结果
**PR #8428** | [链接](https://github.com/earendil-works/pi/pull/8428)

修复 #8166 的会话损坏 bug：从持久化会话树重建（恢复、压缩、分支导航）时，工具结果与发起调用的助手消息重新配对。

---

### 5. fix(coding-agent): 丢弃失败的扩展工厂状态
**PR #8424** | [链接](https://github.com/earendil-works/pi/pull/8424)

扩展工厂加载失败时丢弃暂存状态并移除事件总线监听器，后续通过失败工厂 API 对象的调用将被拒绝。

---

### 6. fix(ai): 对 xAI Grok Build 省略 reasoning effort 字段
**PR #8422** | [链接](https://github.com/earendil-works/pi/pull/8422)

xAI 拒绝包含 `reasoning.effort` 的请求，该 PR 为 Grok Build 添加兼容性标志，修复 HTTP 400 错误。

---

### 7. fix(tui): 保持 `/` 和 `-` 在全屏双击选中范围内
**PR #8459** | [链接](https://github.com/earendil-works/pi/pull/8459)

（同上，与 #7746 配套）

---

### 8. DONT MERGE: dev 分支
**PR #8232** | [链接](https://github.com/earendil-works/pi/pull/8232)

开发分支，供 CI 和评论使用。

---

## 功能需求趋势

### 1. 按模型/提供方定制行为
社区明确希望配置能**精细化到模型级别**（#8133 按模型压缩设置、#7553 压缩思考级别、#7995 按提供方缓存策略）。趋势是打破"全局统一配置"的粗粒度模式。

### 2. 压缩（Compaction）机制重构
#6879 和 #7553 共同指向一个核心诉求：**压缩不应是"最后手段"，而应是可预测、可配置、按需触发的主动机制**。特别是自动压缩的触发时机、思考预算、手动全量压缩模式（#8453）都被反复提及。

### 3. 新增 Provider 支持
SiliconFlow（#4742）、Parasail.io（#8450）、Amazon Bedrock AgentCore 凭证（#8455）等多个新 provider 请求在列，社区对**扩展模型接入面**的需求持续旺盛。

### 4. RPC 模式功能补齐
#8451 提出为 RPC 模式添加 provider 登录操作，使 RPC 客户端无需重启即可完成认证——反映 RPC 模式正在获得更多生产环境使用。

### 5. 终端键盘协议兼容性
Backspace 在 Windows Terminal、Kitty、herdr 三个环境中的异常（#2733、#7130、#8442）说明**终端键盘协议适配**仍是痛点。PR #8422（xAI reasoning effort）和 #8459（全屏选中）从侧面佐证了终端体验细节的重视度上升。

---

## 开发者关注点

### 高频痛点

1. **压缩机制不可靠**：#6879 的 19 条评论和 17 个 👍 是本周最强信号。开发者期待的是**主动、有预警、可配置**的压缩，而非到 API 拒绝才被动触发。

2. **终端键盘兼容性反复**：Backspace/Delete 键在多个终端下行为异常，且部分为回归（#2733 从 0.62 升到 0.64 后出现）。这提示**终端适配应有系统性回归测试**，而非逐案修复。

3. **代理与 HTTP 场景被忽视**：#8134 中 HTTP 提供方 + 正向代理的组合在 0.84.0 回归，说明 CI/内部服务场景测试覆盖不足。

4. **成本控制焦虑**：#7995 中 2.5 倍成本差距和 #8460 中流中断硬失败的案例，体现开发者对**大模型 API 成本和稳定性**的敏感度极高。

### 开发协作模式观察

- 大量 issue 被标记 `[untriaged]` 但迅速获得关闭，说明 **Pi 团队的 issue 处理节奏较快**，对于简单问题快速关闭、复杂问题明确标记状态（inprogress/open）。
- PR 普遍小而聚焦（单文件或少量文件变更），例如 #8422 仅添加兼容性标志、#8428 仅修复重建路径的配对逻辑——这种**小步快跑**的风格有助于降低合并风险。
- 社区提 PR 时均附有**可复现的最小示例**或详细环境信息，是值得保持的协作规范。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-22

## 今日速览

昨日夜间发布两个 nightly 版本，核心聚焦于 review 循环卡死原因透出和 CI 回退逻辑修复。安全相关议题持续高热：CI 依赖 CVE 审计全面失败（#9699）与 autofix PAT 作业的 runner 级隔离问题（#9089）是社区当前焦点。功能需求方面，会话恢复（模型记忆、未决 HITL）与 Plan 模式只读命令白名单成为新增热点。

---

## 版本发布

- **v0.21.14-nightly.20260822.7a4566cb3b** — 新增 `feat(review): tell the author why a review loop is not settling`，当 review 循环无法收敛时向作者说明原因；另修复 CI fallback 逻辑。PR: [#9461](https://github.com/QwenLM/qwen-code/pull/9461)
- **v0.21.14-nightly.20260821.9f2342d323** — 与上述同源（`#9461`），同为 review 收敛提示与 CI 修复。
- **dsw-eas-tb-smoke-20260821-r1** — 发布触发型端到端 smoke（1 SWE + 1 TB），SWE-bench Verified **SUCCEEDED**，验证 DSW Harbor 执行与 GitHub Release 回写链路。
- **dsw-eas-full-20260821-r1** — 全量基准：SWE-bench Verified 500 + Terminal-Bench 2.0 89 全部 **SUCCEEDED**，含 verifier 结果与轨迹回写。

---

## 社区热点 Issues（Top 10）

1. **[#9699] CI: Dependency CVE audit fails on every PR as of 2026-08-21** — 8 个漏洞（1 high / 6 moderate / 1 low）导致 `npm audit --audit-level=high` 在所有 PR 上失败，属 P1 安全阻断项。已有对应修复 PR（#9703）。[链接](https://github.com/QwenLM/qwen-code/issues/9699)
2. **[#9556] review: pipeline 是否继续以调用用户身份授予代码执行权限** — 安全范畴讨论，源自 #9221 的二十轮 review 均建立于"代码已以当前用户身份运行"的前提上，需要架构层决策。[链接](https://github.com/QwenLM/qwen-code/issues/9556)
3. **[#5180] 主会话派发任务致 subagent 中途崩溃（12h13m 会话）** — 长会话下 subagent 执行必然崩溃，涉及 token 管理、内存与多智能体稳定性，评论活跃。[链接](https://github.com/QwenLM/qwen-code/issues/5180)
4. **[#9089] autofix PAT 作业与不可信分支代码共享主机，需 runner 级隔离** — P1 安全问题，PR #8961 加固后仍存在无法在 Actions step 内闭合的残余风险。[链接](https://github.com/QwenLM/qwen-code/issues/9089)
5. **[#8993] 公共扩展安装需 Git 2.37，Ubuntu 22.04 仅提供 2.34.1** — LTS 发行版被版本门槛卡住，社区需求明确，欢迎 PR。[链接](https://github.com/QwenLM/qwen-code/issues/8993)
6. **[#5966] 0.19.3 UI 不定期异常，中文输入法完全失效** — Windows 中文用户高频痛点，长期 open 且等待用户补充信息。[链接](https://github.com/QwenLM/qwen-code/issues/5966)
7. **[#9693] Windows 下 MCP -32000 启动即断连（即使未启用 MCP）** — 新增 issue，Qwen Desktop 在 Windows 上 STDIO 传输层连接失败，影响面大。[链接](https://github.com/QwenLM/qwen-code/issues/9693)
8. **[#9639] 自动模式权限分类器不可用时 fail-open（#7331 回归）+ 确定性短路由** — 非默认 provider 不稳定时所有 bash 请求被放行，安全与可用性的权衡问题。[链接](https://github.com/QwenLM/qwen-code/issues/9639)
9. **[#9688] 归档活跃会话会重建当前转录，导致 active+archived 冲突** — daemon 会话管理并发写入的竞态问题，Web UI 行为不确定。[链接](https://github.com/QwenLM/qwen-code/issues/9688)
10. **[#9686] daemon 会话恢复应记住上次使用的模型** — 与 #9664（恢复未决 ask_user_question）同为会话恢复体验类需求，同作者连续提出，代表一类真实使用诉求。[链接](https://github.com/QwenLM/qwen-code/issues/9686)

---

## 重要 PR 进展（Top 10）

1. **[#9703] fix(ci): bump vulnerable dependencies to unblock CVE audit** — 直接针对 #9699：`npm audit fix --package-lock-only`，仅动 lockfile，零代码变更，是最快的 CVE 解除路径。[链接](https://github.com/QwenLM/qwen-code/pull/9703)
2. **[#9621] feat(review): back pr-context on Aone Code targets** — 补齐 Aone Code 的 `/review` 上下文获取（此前仅 GitHub 路径可用），修复跳过导致的级联空白。[链接](https://github.com/QwenLM/qwen-code/pull/9621)
3. **[#9678] perf(review): give review agents their own subagent type** — review 维度 agent 从 `general-purpose` 改为专用 `review-agent` 类型，只声明实际用到的 6 个工具，减少不必要的工具注入。性能优化向。[链接](https://github.com/QwenLM/qwen-code/pull/9678)
4. **[#9657] feat(web-shell): compact agent activity summaries** — 折叠模式的体验优化：相邻的思考、工具调用、并行 agent 合并为摘要，展开后保留嵌套明细。[链接](https://github.com/QwenLM/qwen-code/pull/9657)
5. **[#9668] fix(core): detect long verbatim repetition loops** — 修复重复单元 >75 字符时循环检测失效的问题，同时覆盖 content 与 reasoning 双通道。[链接](https://github.com/QwenLM/qwen-code/pull/9668)
6. **[#9653] refactor(autofix): move the push-and-report body out of the workflow file** — autofix 的 push 与报告逻辑从 YAML 抽取到独立脚本，代码字节级一致，纯可维护性改进。[链接](https://github.com/QwenLM/qwen-code/pull/9653)
7. **[#9673] fix(autofix): stop counting idle timeouts toward the timeout cap** — 累计超时熔断器不再计入空闲看门狗杀死的轮次，只统计真正由 agent 耗尽时间预算的情况，逻辑修正。[链接](https://github.com/QwenLM/qwen-code/pull/9673)
8. **[#9576] feat(core): accept cross-session messages behind an inbound gate** — 同一机器上的多个 Qwen Code 会话可通过 UNIX socket 互相通信，策略允许时按标记的非用户消息进入输入队列。跨会话协作基础设施。[链接](https://github.com/QwenLM/qwen-code/pull/9576)
9. **[#9623] feat(review): give the convergence observation a machine-readable half** — 在 #9461 的可用性诊断之上，为收敛观测增加机器可读输出，让调用方能编程处理。[链接](https://github.com/QwenLM/qwen-code/pull/9623)
10. **[#9624] feat(review): close Aone residual gaps** — 一块补齐 Aone Code 三项缺口：真实 PR/MR 链接、测试计划路由、Aone API 版本下限。[链接](https://github.com/QwenLM/qwen-code/pull/9624)

---

## 功能需求趋势

- **会话恢复与状态持久化（新热点）**：连续多条 issue 指向 daemon 会话恢复体验——恢复模型（#9686）、恢复未决 HITL（#9664）、归档与写作竞争（#9688）。用户对"切来切去丢上下文"的容忍度在降低。
- **Plan 模式可配置化**：#9694 要求扩展只读命令白名单，说明 Plan 模式在真实 CLI 工作流中频繁遇阻，自定义 CLI 每次都被拦截。
- **敏感操作的安全边界**：#9556（执行用户权限）、#9089（runner 隔离）、#9639（失败兜底策略）三条线都在追问：代码执行到哪一层、以谁的身份、失败时怎么办。
- **MCP 稳定性（持续高热）**：#9693（Windows 启动断连）、#9675（跨会话断开）、#379（参数序列化）三案并发——Windows 平台 + 跨会话场景是 MCP 当前的薄弱环节。
- **中文输入法体验**：#5966（完全失效）与 #9666（候选词低对比度）说明 Windows + IME 的 UI 问题仍未根治。

---

## 开发者关注点

- **CI 安全债**：CVE 审计全量失败（#9699）+ PAT 隔离悬而未决（#9089）+ review 权限问题讨论（#9556），CI/CD 管线的安全加固是当前最有存在感的工程主题，且多数由 `wenshao` 驱动。
- **Windows 平台体验集中爆雷**：MCP 断连（#9693）、候选词低对比（#9666）、输入法失效（#5966）同日活跃，Windows 用户的反馈密度明显高于其他平台。
- **subagent 稳定性与可控性**：#5180（中途崩溃）、#1212（无法禁用内置 subagent）两条老问题持续被评论，社区对 subagent 的诉求是"要么可靠，要么可关"。
- **review 工具链的自我进化**：#9461 让 review 循环可解释，#9623 让它可编程，#9678 优化它的性能——开发者在用 review 工具 review 自己的 review 工具，闭环已成。
- **autofix 的边界感知**：#9673（空闲超时不该计入熔断）、#9649（`CI=true` 需透传）表明 autofix 在真实复杂环境下持续打磨边界条件的判断。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报

**日期：2026-08-22** | **数据来源：** [Hmbown/CodeWhale](https://github.com/Hmbown/CodeWhale)（原 DeepSeek-TUI）

---

## 1. 今日速览

今日社区动态高度聚焦于 **“监督化运行” (Supervised Operation) 方向**：围绕长期无人值守会话，开发者 M-Maciej 集中提交了生命周期事件 Outbox、`/relaunch` 命令、每会话控制 Socket 和 Goal 延续节奏修复等一系列 Issues 和 PR，意图将 CodeWhale 打造为可被外部 Supervisor 可靠管控的 Agent 运行时。此外，**多模态模型支持**（DeepSeek-V4-Flash-Vision-Exp）和 **Sub-agent 执行可靠性**问题也受到重点关注。

---

## 2. 版本发布

过去 24 小时内无新 Release。

---

## 3. 社区热点 Issues

以下为 11 个活跃 Issues 中值得关注的 10 个：

### 高优先级缺陷（Bug）

- **[#5534] Goal 延续节奏在 Turn 内 dispatch 路径上被绕过** — 由 M-Maciej 报告。`continuation_delay_seconds` 静默期在 resum-ed/CLI 会话中被跳过，导致连续任务“瞬间”触发，可能引发意外的连续执行和 API 调用风暴。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5534)

- **[#5528] 工作流运行静默失败：dispatch/schema 错误在 TUI 中无任何反馈** — 由 Hmbown 自己报告。Review fan-out 和 phased build 两条工作流在脚本求值阶段失败，但 TUI 中没有任何 toast、状态行或面板条目提示，操作者无法感知已发生错误。这严重削弱了工作流功能的可用性。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5528)

- **[#5529] Sub-agent 无法可靠执行：墙钟超时丢失未提交工作、Provider 路由失败阻塞 dispatch、Shell 工具链需 Workaround** — 由 Hmbown 报告。今天遇到三种故障模式：① 两个 worker sub-agent 因 wall-time 预算耗尽而中断且未保存中间结果；② provider 路由失败直接阻塞 dispatch，无优雅降级；③ shell 工具使用困难。这是 Fleet 核心价值主张（委派执行）不可用的直接证据。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5529)

### 功能增强（Enhancement）

- **[#5541] 新增 DeepSeek-V4-Flash-Vision-Exp 多模态模型支持** — 由 M-Maciej 提出。这是 DeepSeek 家族首个多模态模型，已可在 API 中使用，但 CodeWhale 无法分配且“视觉”功能未生效。开发者认为影响巨大，尤其是网页开发类任务。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5541)

- **[#5533] 引入监督运行的控制面** — 由 M-Maciej 提出，建议增加每会话控制 Socket（message / interrupt / relaunch / status）及 `RuntimeBackendKind::External`，以支持终端复用器包装器、自动化测试框架和 CI 系统等外部监督场景。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5533)

- **[#5532] `/relaunch` 命令：将当前运行会话切换到新二进制** — 由 M-Maciej 提出。当前 `/update` 安装新二进制后要求用户手动重启。开发者在 TUI 持有终端的情况下实现自执行/重启并非易事，但仍认为值得解决。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5532)

- **[#5531] 本地生命周期事件 Outbox（JSONL + Webhook）** — 由 M-Maciej 提出。需要 `turn_stalled` / `turn_failed` 等事件，用于对外部 supervisor（如 herdr）暴露会话状态，支持无人值守夜间运行和告警设置。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5531)

### 其他

- **[#5526] 弃用的 Shell Completions** — 由 RepentStar 报告。PowerShell 用户发现 `codew completions powershell` 生成的补全脚本已过时，且触发命令仍为旧名称 `codewhale-tui`，文档中未找到相关说明。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5526)

- **[#5316] EPIC-005：CodeWhale TUI Crate 分解（Umbrella）** — 该项目级 Epic 追踪全部 CodeWhale TUI crate 分解工作。所有子 EPIC 和 FEAT 完成后都在此登记，目前已有 11 条评论。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/5316)

- **[#4069] 索引隐私控制（.codewhaleignore）** — 希望引入类似 `.cursorignore` 的忽略文件机制，让操作者可以排除 secrets、vendor 树和本地产物，避免被 agent 搜索和索引。更新至 8 月 21 日，仍处于开放状态。👉 [查看详情](https://github.com/Hmbown/CodeWhale/issues/4069)

---

## 4. 重要 PR 进展

### 重点关注 PR

- **[#5535] 监督运行栈：生命周期 Outbox、/relaunch、每会话控制 Socket 与 Goal 延续静默期修复** — 由 M-Maciej 提交，涵盖 5 个变更区域，全部围绕同一目标：机器可读的 CodeWhale 监督能力。完成 🚀 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5535)

- **[#5525] refactor(tui)：采用命令形态统一 Utility 命令组（FEAT-018）** — 由 aboimpinto 提交，将全部 7 个 TUI 工具命令文件迁移到 FEAT-014/015 引入的外部命令形态，注册 `/about`、`/config`、`/context` 等命令。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5525)

- **[#5524] 多文件 `read_lints` 操作** — 由 wuisabel-gif 提交，`lsp` 工具新增 `read_lints` 操作，支持一次读取多个工作区文件的 lint 结果，复用 LspManager 传输池。针对 #4070 范围。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5524)

- **[#5530] CLI 修复：将 Legacy Completions 路由到公开二进制** — 由 wuisabel-gif 提交，修复 #5526。legacy 命令 `codewhale completions <shell>` 改为调用与 `codewhale completion` 相同的生成逻辑，并使用公共命令名 `codewhale`。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5530)

- **[#5523] refactor(tui)：从 Turn 循环中提取工具调用阶段** — 由 bistack 提交，将工具调用规划、批准/执行、结果投影拆分为独立函数，保持原控制顺序及取消行为。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5523)

### 依赖更新

- **[[#5540]] 依赖 bump：similar 3.1.2 → 3.2.0** — 新增结构化行级 diff。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5540)
- **[[#5539]] 依赖 bump：rio-vt 0.5.19 → 0.5.25** — 终端模拟器库更新。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5539)
- **[[#5390]] 依赖 bump：rmcp 2.2.0 → 3.1.2** — MCP Rust SDK 跨版本升级（3.x 破坏性变更较多）。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5390)
- **[[#5538]] 依赖 bump：jsonschema 0.46.10 → 0.49.9** — Schema 校验库更新。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5538)
- **[[#5537]] 依赖 bump：docker/setup-buildx-action 4.2.0 → 4.3.0** — CI 依赖更新。👉 [查看详情](https://github.com/Hmbown/CodeWhale/pull/5537)

---

## 5. 功能需求趋势

从今日活跃的 Issues 中可以识别出以下社区最关注的功能方向：

1. **监督化运行（Supervised Operation）** ⭐ 最受瞩目
   - 生命周期 Outbox（JSONL + Webhook 事件流）
   - 外部控制 Socket（消息 / 中断 / 状态查询）
   - `/relaunch` 自我更新机制
   - 目标：让 CodeWhale 能在无人值守、CI、terminal multiplexer 环境下可靠运行。

2. **多模态模型支持**
   - 明确要求支持 DeepSeek-V4-Flash-Vision-Exp，并让 Vision 功能在 TUI 中实际可用。

3. **架构可维护性与代码重组**
   - TUI Crate 分解（EPIC-005）、命令形态统一（FEAT-018）、Turn 循环抽取——社区非常关注代码质量与可测试性。

4. **索引隐私控制**
   - .codewhaleignore 机制呼声已久（#4069），避免 agent 遍历敏感目录。

5. **可靠性工程**
   - 工作流错误状态可视化（toast/status 反馈）
   - Sub-agent 在墙钟超时下的事务性保证
   - Provider 路由失败的优雅降级

---

## 6. 开发者关注点

- **反馈缺失是最大的痛点**：工作流失败时用户一无所知（#5528），这种“静默失败”严重侵蚀信任度。
- **长时间运行下的稳定性**：Sub-agent 因 wall-time 预算死亡丢失未提交工作，#5529 直接指向一个核心矛盾——任务时间预估与实际执行时间不匹配，导致代理在关键时刻被杀死。
- **补全脚本维护滞后**：#5526 看似小问题，但触及了“文档与实际功能不一致”这个普遍痛点。
- **对“未来模型”的及时适配**：多模态模型已在 API 端可用，但客户端尚未适配（#5541），Community 希望新模型支持能与发布节奏同步。
- **外部系统接入的诉求增强**：多位用户（或同一用户多种场景）提到需要将 CodeWhale 嵌入到已有的自动化/监督体系中（#5531/#5533），说明 TUI 正在从一个“交互式小工具”演化为“Agent 运行时”，这一转变对接口设计提出了新要求。

---

**总结：** 今日社区的主旋律是**将 CodeWhale 从交互式 TUI 推进到可监督、可嵌入的 Agent 运行时**。如果你在构建依赖无人值守 Agent 的自动化系统，或希望提前接入多模态能力，建议重点跟进 [#5535](https://github.com/Hmbown/CodeWhale/pull/5535) 和 [#5541](https://github.com/Hmbown/CodeWhale/issues/5541)。

</details>

---
*本日报由 [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial) 自动生成。*