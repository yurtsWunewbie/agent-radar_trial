# Hugging Face Trending Models Digest 2026-08-21

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-21 01:13 UTC

---

# 🤗 Hugging Face Trending Models Digest — 2026-08-21

---

## 1. Today's Highlights

The Qwen3.8 ecosystem dominates the trending chart this cycle, with **Qwen/Qwen3.8-27B** leading at 11.7K likes and 1.37M downloads, spawning a massive wave of community quantizations (GGUF, FP8, NVFP4, MLX) and uncensored/abliterated variants. **Moonshot AI's Kimi-K3** emerges as a strong second contender with 10.9K likes, signaling intensifying competition in the open-weight LLM space. In multimodal generation, **MiniMaxAI/MiniMax-H3** (4.2K likes, 3.3M downloads) leads video generation, with community fine-tunes like *10Eros-Max* and *Minimax-h3-Turbo* riding its momentum. Notably, DeepSeek's V4 line (Pro & Flash variants) shows sustained traction. The abliterated/uncensored fine-tune trend is unusually strong this week, with at least **eight** such variants of Qwen3.8 appearing in the top 30.

---

## 2. Trending Models by Category

### 🧠 Language Models (LLMs, Chat, Instruction-Tuned)

| Model | Author | Likes | Downloads |
|---|---|---|---|
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,747 | 1,373,584 |
| [DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 680 | 43,287 |
| [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,121 | 14,592 |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,883 | 2,349,853 |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,576 | 2,547,549 |
| [Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 219 | 1,713 |

**Qwen3.8-27B** is the flagship multimodal LLM from Qwen, topping the charts as the week's most-liked model. **Kimi-K3** from Moonshot AI brings compressed-tensor innovation to feature extraction and conversation. **DeepSeek-V4-Flash-0731** offers a lighter, faster sibling to the V4 Pro, with impressive adoption at 2.5M downloads. **Qwen3.8-2.4T-A95B** is a massive sparse MoE (2.4T total / 95B active) pushing the frontier of efficient scale. **Ornith-1.5-35B-A3B** is a Qwen3.5-MoE based reasoning model with MIT licensing.

---

### 🎨 Multimodal & Generation (Image, Video, Audio, Text-to-X)

| Model | Author | Likes | Downloads |
|---|---|---|---|
| [MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,106 | 14,471 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,416 | 611,825 |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,240 | 3,308,673 |
| [Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,718 | 478,622 |
| [Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 652 | 380,072 |

**MiniMax-H3** is a state-of-the-art text/image-to-video generation model with massive community traction (3.3M downloads). **Lightricks LTX-2.5** supports the full spectrum of video tasks (text-to-video, image-to-video, video-to-video) at 611K downloads. **Meta's Muse-Glimmer-30B** is an image-text-to-text conversational model with strong adoption. **MiniMax-Music3** breaks ground in text-to-music generation using the diffusers pipeline. **Minimax-h3-Turbo** is a community-optimized faster variant of MiniMax-H3 for image-to-video.

---

### 🔧 Specialized Models (Code, Math, Medical, Embeddings, Domain-Specific)

| Model | Author | Likes | Downloads |
|---|---|---|---|
| [Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,338 | 0 |

**Qwen-Fixed-Chat-Templates** provides corrected Jinja chat templates for Qwen3.5 models (MLX format) — a practical developer utility with 1.3K likes despite zero downloads. It addresses a critical pain point for anyone integrating Qwen models into custom pipelines.

---

### 📦 Fine-tunes & Quantizations (Community Fine-tunes, GGUF, FP8, MLX, Abliterated)

| Model | Author | Likes | Downloads |
|---|---|---|---|
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,360 | 5,126,652 |
| [Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 633 | 1,517,643 |
| [Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 714 | 2,628 |
| [Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 676 | 76,109 |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 513 | 979,768 |
| [Qwen3.8-27B-Uncensored-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 367 | 268,258 |
| [Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 308 | 831,483 |
| [Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 270 | 4,415 |
| [Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 223 | 55,074 |
| [Ornith-1.5-35B-A3B-GGUF](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B-GGUF) | ornith-ai | 162 | 53,691 |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 239 | 52,382 |
| [10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 299 | 0 |
| [Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 201 | 187,008 |
| [Qwen3.8-27B-Heretic-Abliterated-GGUF](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 189 | 326,638 |
| [Qwen3.8-27B-ABLITERATED-GGUF](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 183 | 186,470 |
| [Huihui-Qwen3.8-27B-abliterated](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated) | huihui-ai | 201 | 10,540 |

**unsloth's Qwen3.8-27B-GGUF** is the most-downloaded quantization this week at 5.1M downloads, making Qwen3.8 accessible on consumer hardware. The **orcarouter** uncensored series (MLX and FP8) leads the abliterated wave, followed by variants from JonathanColetti, HauhauCS (with aggressive MTP), huihui-ai, and 0bserverx. **Qwen's official FP8** quantized release has 1.5M downloads. **10Eros-Max** is an uncensored/video-focused fine-tune of MiniMax-H3, while **Minimax-h3-Turbo** optimizes the base model for faster inference.

---

## 3. Ecosystem Signal

The Qwen3.8 ecosystem has achieved **critical mass**, becoming the dominant open-weight model family this week. The official release spawned an extraordinary community infrastructure: 10 of the top 30 models are Qwen3.8 variants spanning quantization formats (GGUF, FP8, NVFP4, MLX), uncensored adaptations (abliteration), and domain optimizations (MTP, Ridge, Heretic). Unsloth's quantization alone has been downloaded 5.1M times, underscoring massive demand for local deployment.

**MiniMax is emerging as the video-generation leader**, with MiniMax-H3 accumulating 3.3M downloads and spawning community fine-tunes, suggesting a healthy open-weights video ecosystem is forming. **DeepSeek V4** maintains momentum with both Pro and Flash variants, while **Kimi-K3** signals Moonshot AI's serious push into open-weight territory with compressed-tensor innovation.

The strong **abliteration/uncensored trend** (8+ variants in top 30) indicates a sustained community demand for "uncensored" models — a persistent pattern in the open-source AI ecosystem. **MoE architecture** is becoming standard for large-scale models (Qwen3.8-2.4T-A95B, Ornith-1.5-35B-A3B), suggesting compute-efficient scaling is now a primary design goal.

---

## 4. Worth Exploring

1. **[Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)** — This sparse MoE model (2.4T total parameters with only 95B active) represents the bleeding edge of efficient language model scaling. Worth studying for its architecture and the performance-per-parameter tradeoffs it achieves.

2. **[Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — As only the second model to break 10K likes this week, Kimi-K3's compressed-tensor approach to feature extraction is novel and may influence how future models handle representational efficiency. Strong candidate for the next big open-weight family.

3. **[Qwen3.8-27B-Uncensored-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)** — The "aggressive MTP" quantization technique is an interesting community innovation that combines multi-token prediction optimization with aggressive quantization for speed. Worth benchmarking for local deployment scenarios where both speed and capability matter.

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*