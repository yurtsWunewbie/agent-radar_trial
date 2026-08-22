# Hugging Face 热门模型日报 2026-08-22

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-22 01:09 UTC

---

# 🤖 Hugging Face 热门模型日报（2026-08-22）

## 📰 今日速览

今日 Hugging Face 趋势榜被 **Qwen 家族全面霸榜**——Qwen3.8-27B 以近 1.2 万周点赞登顶，其衍生微调与量化版本合计占据榜单 12 席以上，成为绝对焦点。多模态赛道由 **MiniMaxAI** 与 **Lightricks** 领衔，MiniMax-H3（视频生成）与 LTX-2.5 表现抢眼。**DeepSeek-V4** 系列两款模型齐上榜，V4-Pro 与 V4-Flash 展现出强大的开源竞争力。**Kimi-K3** 以 1.09 万点赞紧随 Qwen 之后，登顶多模态理解赛道。社区侧，"uncensored/abliterated" 微调生态异常活跃，围绕 Qwen3.8-27B 已形成完整的去审查衍生模型矩阵。

---

## 🔥 热门模型分类

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 👍 点赞 | 📥 下载 | 一句话说明 |
|------|------|---------|---------|-----------|
| [**Qwen/Qwen3.8-27B**](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,964 | 1,726,651 | 今日霸主：Qwen 最新一代多模态对话模型，兼具视觉理解与文本生成能力 |
| [**moonshotai/Kimi-K3**](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,913 | 2,448,810 | Kimi 第三代旗舰模型，主打特征提取与压缩张量技术，多模态理解能力出众 |
| [**deepseek-ai/DeepSeek-V4-Pro-0813**](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 709 | 49,601 | DeepSeek V4 Pro 正式版，对标闭源旗舰的开放权重模型 |
| [**deepseek-ai/DeepSeek-V4-Flash-0731**](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,612 | 2,833,064 | V4 系列轻量高效版，推理速度优先，下载量惊人 |
| [**Qwen/Qwen3.8-2.4T-A95B**](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,139 | 15,702 | 2.4T 参数 MoE 巨兽，仅激活 95B，顶级文本生成能力 |
| [**ornith-ai/Ornith-1.5-35B-A3B**](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 289 | 9,165 | 35B MoE 文本模型（激活 3B），MIT 许可，支持多模态输入 |
| [**superwhisper/s1-mini**](https://huggingface.co/superwhisper/s1-mini) | superwhisper | 191 | 1,136 | 迷你语音识别与文本生成两用模型，基于 Qwen3 架构 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 👍 点赞 | 📥 下载 | 一句话说明 |
|------|------|---------|---------|-----------|
| [**MiniMaxAI/MiniMax-H3**](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,294 | 3,614,443 | MiniMax 第三代视频生成模型，支持文/图生视频，下载量突破 360 万 |
| [**Lightricks/LTX-2.5**](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,493 | 654,175 | 全能视频生成模型，支持文/图/视频到视频，单文件扩散架构 |
| [**MiniMaxAI/MiniMax-Music3**](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,163 | 15,678 | 第三代音乐生成模型，文本直接生成完整乐曲 |
| [**meta-models/Muse-Glimmer-30B**](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,738 | 505,113 | Meta 系 30B 多模态对话模型，视觉与文本融合能力突出 |
| [**TenStrip/10Eros-Max**](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 311 | 0 | MiniMax-H3 的社区微调版本，专攻特定风格视频生成 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

*本榜单暂无独立专用模型上榜，但值得关注的是 [**superwhisper/s1-mini**](https://huggingface.co/superwhisper/s1-mini) 兼具 ASR 功能，以及 [**moonshotai/Kimi-K3**](https://huggingface.co/moonshotai/Kimi-K3) 标注了 feature-extraction 特性，可归入嵌入/特征提取类别。*

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 👍 点赞 | 📥 下载 | 一句话说明 |
|------|------|---------|---------|-----------|
| [**unsloth/Qwen3.8-27B-GGUF**](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,509 | 5,804,917 | 官方量化版 GGUF，下载量超 580 万，本地部署首选 |
| [**orcarouter/Qwen3.8-27B-Uncensored-FP8**](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 821 | 107,520 | FP8 精度去审查版，兼顾性能与自由度 |
| [**orcarouter/Qwen3.8-27B-Uncensored-MLX**](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 820 | 18,193 | Apple 芯片专用 MLX 格式去审查版 |
| [**JonathanColetti/Qwen3.8-27B-Uncensored-GGUF**](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 569 | 1,126,222 | 支持 MTP 的 GGUF 去审查版，下载量破百万 |
| [**OBLITERATUS/Qwen3.8-27B-OBLITERATED**](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 441 | 123,956 | 多格式（MLX/GGUF）去审查版，主打"彻底移除对齐" |
| [**HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF**](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 422 | 357,225 | 激进风格去审查 GGUF，支持多模态与 MTP |
| [**froggeric/Qwen-Fixed-Chat-Templates**](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,370 | 0 | 修复 Qwen 对话模板的 Jinja 补丁包，解决兼容性问题 |
| [**empero-ai/Qwen3.8-27B-Ridge-GGUF**](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 237 | 74,038 | llama.cpp 量化版 Qwen3.8，注重推理效率 |
| [**orcarouter/Qwen3.8-27B-Uncensored-GGUF**](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 295 | 68,275 | 同作者 GGUF 去审查版，纯文本优化 |
| [**huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF**](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 231 | 338,221 | 知名"去审查"社区 huihui 出品的 GGUF 版 |
| [**huihui-ai/Huihui-Qwen3.8-27B-abliterated**](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated) | huihui-ai | 229 | 17,521 | 同一作者的原始 safetensors 去审查版 |
| [**unsloth/Qwen3.8-27B-NVFP4**](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 328 | 1,013,917 | NVIDIA 新一代 FP4 量化格式，下载破百万 |
| [**0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF**](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 212 | 421,918 | "异端"级去审查 GGUF，社区热度极高 |
| [**Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF**](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 201 | 197,667 | 精简去审查 GGUF 版，专注 27B 纯文本 |
| [**ornith-ai/Ornith-1.5-35B-A3B-GGUF**](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B-GGUF) | ornith-ai | 207 | 123,237 | Ornith MoE 模型的 GGUF 量化版，MIT 许可 |
| [**z-lab/Qwen3.8-27B-DFlash2**](https://huggingface.co/z-lab/Qwen3.8-27B-DFlash2) | z-lab | 175 | 21,092 | 引入投机解码（speculative decoding）加速的 Qwen3.8 |
| [**DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF**](https://huggingface.co/DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 170 | 155,208 | 集成 GAIN 训练与 Cold-Fusion 技术的极限优化 GGUF |

---

## 📊 生态信号

**Qwen 家族一骑绝尘**：Qwen3.8-27B 及其衍生版本占据榜单约四成席位，从官方原版到社区量化（GGUF/FP8/MLX/NVFP4）再到"去审查"微调，已形成完整的金字塔生态。这种"旗舰模型 + 丰富衍生"的模式正在成为开源模型发布的标配。

**MiniMax 与 DeepSeek 构成第二梯队**：MiniMax-H3 视频模型下载量超 360 万，DeepSeek-V4 双版本齐发（Pro 与 Flash 定位互补），显示中国 AI 公司在开源社区的投入持续加码。Kimi-K3 的强势上榜（1.09 万赞）进一步印证多模态竞争的白热化。

**"去审查"（abliterated/uncensored）微调成为社区显学**：榜单上至少 10 个此类模型，占据微调类目的绝大多数。这反映了部分用户对模型安全对齐的不满，以及社区在"自由度"与"安全性"之间的持续拉锯。开源权重模式让这种二次创作成为可能，闭源模型则完全不存在此类生态。

**量化技术百花齐放**：GGUF 仍是绝对主流，但 FP8、NVFP4（NVIDIA 新格式）和 MLX（Apple 生态）等新格式正快速崛起，显示本地部署正在扩展至更多硬件平台。

---

## 🔬 值得探索

1. **[Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)** — 2.4T 总参数、95B 激活的 MoE 巨型模型，代表了当前开源模型的规模天花板。研究其稀疏激活的效率和能力表现，对理解下一代 MoE 架构极具价值。

2. **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — 采用压缩张量技术（compressed-tensors）的旗舰多模态模型，这可能是继量化之后另一条提升推理效率的技术路线，值得深入评测其特色压缩机制的实际效果。

3. **[z-lab/Qwen3.8-27B-DFlash2](https://huggingface.co/z-lab/Qwen3.8-27B-DFlash2)** — 将投机解码技术应用于 Qwen3.8-27B 的社区尝试。这类推理加速方案对实际部署的吞吐量提升可能比简单量化更显著，是工程优化方向的有趣案例。

---

> 📌 **数据说明**：以上数据基于 2026-08-22 Hugging Face Hub 热门模型榜单（按周点赞数排序），点赞与下载数均为实时快照。

---
*本日报由 [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial) 自动生成。*