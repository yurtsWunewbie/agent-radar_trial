# Hugging Face 热门模型日报 2026-08-20

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-20 01:09 UTC

---

# Hugging Face 热门模型日报（2026-08-20）

## 今日速览

本周 Hugging Face 趋势榜由 **Qwen3.8-27B** 系列强势主导——不仅原版模型以 11.4k 周点赞稳居榜首，围绕其衍生的量化、微调与“去审查”(abliterated) 版本也占据了榜单近三分之一席位。多模态视频生成赛道同样热闹，**MiniMax-H3** 在周点赞与下载量上双丰收（单周下载超 305 万），成为社区在视频合成方向的核心选择。DeepSeek-V4-Pro 与 Kimi-K3 的高位表现则印证了寡头级开源基座模型仍在持续迭代并获得冷启动热度。值得注意的还有：**Muse-Glimmer-30B** 作为 Meta 开源阵营的新面孔跻身前列，而社区对音乐生成（MiniMax-Music3）与图像生成（Anima）的关注也在升温。总体来看，基座与量化生态围绕少数头部模型高度聚集。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 说明 |
|---|---|---|---|---|
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,484 | 1,006,235 | Qwen 官方旗舰多模态模型，支持图像+文本输入，是本周热度最高的模型，驱动大量衍生生态。 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 633 | 37,583 | DeepSeek V4 系列 Pro 配置版本，能力完整，硬核推理社区关注度高。 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,548 | 2,330,940 | DeepSeek V4 轻量版，兼顾速度与能力，下载量已超 233 万，成为 V4 系列的事实主力部署版本。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,853 | 2,289,863 | 月之暗面推出的压缩大模型，支持图像文本理解与特征提取，掀起了大模型"压缩"趋势的新热点。 |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,100 | 12,699 | Qwen 超大规模 MoE 版本（总参数 2.4T，激活 95B），面向最强性能场景。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,702 | 430,313 | Meta 开源 30B 量级视觉-语言对话模型，作为新发布模型迅速上榜，引发广泛关注。 |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 232 | 1,239 | 以笔记/记录场景为定位的对话模型，结构上有一定实验性。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 说明 |
|---|---|---|---|---|
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,182 | 3,055,205 | MiniMax 新一代图像+文本到视频模型，单周下载突破 300 万，已经成为开源视频生成的实际标准之一。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,323 | 555,993 | 全能型图像到视频与文本到视频模型，支持多种输入形态，更新稳定、社区活跃。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,037 | 13,138 | 文本直接生成音乐的全新模型，代表了音频生成正成为下一片热土。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 625 | 340,984 | MiniMax-H3 的 Turbo 加速版，在保持效果的同时提升了生成效率，适合实时应用场景。 |
| [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 193 | 325,083 | Comfy-Org 为 MiniMax-Music3 提供的 ComfyUI 单文件版本，极大降低了用户部署门槛。 |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 283 | 0 | 基于 MiniMax-H3 的高强度风格化微调版本，展示了 H3 在特定风格生成方向的可塑空间。 |
| [Gazingstars123/Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 270 | 26,566 | 轻量文本到图像模型（2.9B），主打动漫风格生成，可直接在 ComfyUI 中使用。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 说明 |
|---|---|---|---|---|
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,082 | 4,318,134 | unsloth 出品的 GGUF 量化版本，下载量全榜第一（超过 431 万），是本地部署 Qwen3.8 的首选。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,165 | 3,033,363 | 社区"缝合怪"式 27B 微调 GGUF，融合多重风格与技巧，下载量高达 303 万，体现了社区对趣味微调版本的高度追捧。 |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 614 | 60,078 | 去审查版 FP8 量化，兼容多模态，提供安全限制更宽松的生成体验。 |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 597 | 27 | Apple Silicon 专用 MLX 格式去审查版，面向 Mac 用户的本地体验。 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 467 | 766,812 | 适用于 llama.cpp 的 GGUF 去审查版本，含 MTP（多 token 预测）支持，兼容性广。 |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 600 | 1,063,646 | 官方 FP8 量化版本，在不明显损失效果的前提下大幅降低显存需求。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 287 | 131,113 | 激进去审查+激进 MTP 配置的 GGUF 版本，面向极致性能用户。 |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,289 | 0 | 修复 Qwen 系列聊天模板的工具型模型（MLX/Jinja），虽是刚发布尚无明显下载，但直击痛点，潜在价值极大。 |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 197 | 32,454 | 社区自炼 GGUF 量化版本，主打更高压缩比或特殊格式支持。 |
| [Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 170 | 164,263 | 去审查 GGUF 版本之一，强调直接在 GGUF 层面实现模型行为重塑。 |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 171 | 94,234 | huihui-ai 出品的去审查 GGUF 版本，以其成熟的 abliteration 处理流程获得社区认可。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 187 | 26,472 | 去审查 GGUF 标准版，覆盖各种常见量化档位。 |
| [0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 160 | 245,266 | Heretic 系列风格的去审查 GGUF，下载量不错，在硬核社区较受欢迎。 |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated) | huihui-ai | 167 | 7,207 | 去审查基础版（safetensors），作为 GGUF 版的源头模型提供完整精度选择。 |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 286 | 653,042 | NVIDIA FP4 量化版本，专为 Hopper/Blackwell 架构优化，进一步降低推理成本。 |
| [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,443 | 15,213,225 | MiniMax-H3 的 ComfyUI 单文件版本，下载量全网第一（超过 1521 万），是视频生成工作流的事实入口。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

本周榜单中暂无明显的专用垂直领域模型进入前 30 名热点区间。DeepSeek-V4 系列虽在代码与推理上表现优异，但其官方定位仍为通用对话模型。后续可关注是否有专门的代码（CodeQwen、DeepSeek-Coder 后续）或数学模型从细分社区突围。

## 生态信号

**模型家族高度聚集**：Qwen3.8-27B 及其衍生模型占据榜单近 40%，形成"官方基座+多模态/量化/微调"三层完整生态。MiniMax-H3 作为视频生成引擎，同样形成官方+ComfyUI+Turbo 的生态布局。DeepSeek-V4 与 Kimi-K3 则呈现寡头持续迭代态势。

**"去审查"（abliterated）成为一股文化潮流**：榜单中至少 8 个模型与此相关，但这一标签背后主要是社区追求更少安全限制的生成自由，其商业与合规边界值得持续关注。

**开源权重全面开花**：本周所有上榜模型均具开源权重属性，闭源模型并未出现在热度榜上。开源生态在权重可用性、量化适配性、工具链整合（ComfyUI、llama.cpp、MLX）上拥有巨大的竞争壁垒。

**量化活动显著加速**：除经典的 GGUF 全档位覆盖外，FP8 与 NVFP4 等更先进的量化格式的流行度正在上升，反映出社区对推理成本的敏感度和基础设施的成熟度。

## 值得探索

1. **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)**：作为本周生态的绝对核心，无论是直接使用还是微调，都绕不开这个模型。其多模态能力与 Qwen3.8 系列后续发展，值得研究者深入了解。

2. **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)**：以“压缩”为核心卖点，Kimi-K3 打破了传统模型在质量与体积之间权衡的思路。如果“压缩大模型”成为下一阶段的关键词，Kimi-K3 就是最早值得研究的样本。

3. **[Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3)**：作为下载量最高的模型（超过 1521 万），它代表了视频生成在开源社区从“尝鲜”走向“生产可用”的阶段。无论做应用还是研究视频生成工作流，这都是一探究竟的绝佳入口。

---
*本日报由 [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial) 自动生成。*