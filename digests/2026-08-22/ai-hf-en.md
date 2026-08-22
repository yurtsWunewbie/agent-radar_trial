# Hugging Face Trending Models Digest 2026-08-22

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-22 01:09 UTC

---

# 🤖 Hugging Face Trending Models Digest — 2026-08-22

---

## 1. Today's Highlights

The Hugging Face ecosystem is dominated this week by **Qwen3.8-27B**, a new multimodal flagship from Qwen that has captured massive community attention with **11,964 likes and 1.7M+ downloads**, spawning an extensive ecosystem of uncensored/abliterated variants, GGUF quantizations, and specialized fine-tunes. **MiniMax-H3** continues its strong momentum as a leading video generation model with **4,294 likes and 3.6M downloads**, while **Kimi-K3** from Moonshot AI emerges as a major new contender with **10,913 likes** in the multimodal space. DeepSeek's V4 family shows robust adoption, particularly the Flash variant (**3,612 likes, 2.8M downloads**), signaling a competitive landscape for open-weight intelligence. Notably, the "uncensored/abliterated" fine-tune category has exploded around Qwen3.8, with at least 10 variants appearing in the top 30 — indicating strong community demand for less-restricted model use.

---

## 2. Trending Models by Category

### 🧠 Language Models

| Model | Author | Likes | Downloads |
|-------|--------|-------|-----------|
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,964 | 1,726,651 |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,139 | 15,702 |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 709 | 49,601 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,612 | 2,833,064 |
| [ornith-ai/Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 289 | 9,165 |
| [superwhisper/s1-mini](https://huggingface.co/superwhisper/s1-mini) | superwhisper | 191 | 1,136 |

**Qwen3.8-27B** is the week's undisputed flagship — a new multimodal reasoning model combining text and vision capabilities. **Qwen3.8-2.4T-A95B** represents the MoE variant (2.4T total params, 95B active) for those needing scaled-up reasoning. **DeepSeek-V4-Pro-0813** and **DeepSeek-V4-Flash-0731** show the Chinese lab's strategy of pairing a powerful Pro model with a fast, widely-adopted Flash version. **Ornith-1.5-35B-A3B** is a newer MoE model built on the qwen3_5_moe architecture. **s1-mini** is an intriguing ASR-capable text generation model with minimal footprint.

---

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads |
|-------|--------|-------|-----------|
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,294 | 3,614,443 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,163 | 15,678 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,493 | 654,175 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,913 | 2,448,810 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,738 | 505,113 |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 311 | 0 |

**MiniMax-H3** leads video generation with text-to-video and image-to-video, while **MiniMax-Music3** expands the family into music generation (text-to-audio). **LTX-2.5** is Lightricks' versatile video model supporting multiple video-related pipelines. **Kimi-K3** is Moonshot's multimodal powerhouse with compressed-tensors for efficiency — a serious challenger to Qwen. **Muse-Glimmer-30B** is a newer multimodal conversational model from meta-models. **10Eros-Max** is a fine-tune of MiniMax-H3 with adult content focus (0 downloads, likely NSFW).

---

### 🔧 Specialized Models

| Model | Author | Likes | Downloads |
|-------|--------|-------|-----------|
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,370 | 0 |
| [z-lab/Qwen3.8-27B-DFlash2](https://huggingface.co/z-lab/Qwen3.8-27B-DFlash2) | z-lab | 175 | 21,092 |

**Qwen-Fixed-Chat-Templates** provides corrected jinja chat templates for Qwen models in MLX format — a critical developer tool. **DFlash2** adds speculative decoding improvements to Qwen3.8-27B, speeding inference without quality loss.

---

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads |
|-------|--------|-------|-----------|
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,509 | 5,804,917 |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 821 | 107,520 |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 820 | 18,193 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 569 | 1,126,222 |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 441 | 123,956 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 422 | 357,225 |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 660 | 1,939,895 |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 237 | 74,038 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 295 | 68,275 |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 231 | 338,221 |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated) | huihui-ai | 229 | 17,521 |
| [0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 212 | 421,918 |
| [Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 201 | 197,667 |
| [DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-Cold-Fusion-GAIN-V1.1-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 170 | 155,208 |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 328 | 1,013,917 |
| [ornith-ai/Ornith-1.5-35B-A3B-GGUF](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B-GGUF) | ornith-ai | 207 | 123,237 |

The quantization and fine-tune ecosystem around Qwen3.8-27B is *enormous*. **unsloth** is leading quantized distribution with 5.8M+ GGUF downloads. The "**uncensored/abliterated**" category is a major trend — at least 10 variants with combined 2.5M+ downloads. **FP8** and **NVFP4** formats from official Qwen and unsloth show the push toward efficient serving. **MTP** (multi-token prediction) and aggressive variants demonstrate community experimentation with inference optimization techniques.

---

## 3. Ecosystem Signal

**Qwen3.8-27B is the clear ecosystem center of gravity this week**, with 17+ derivatives appearing in the top 30. The model family spans dense (27B), MoE (2.4T-A95B), and multiple quantization formats (GGUF, FP8, NVFP4, MLX), covering virtually every deployment scenario from local edge (GGUF) to production serving (FP8).

**The "abliteration/uncensored" phenomenon is a powerful signal** — the community is actively demanding models with fewer safety restrictions, and there's a robust supply chain of providers (orcarouter, huihui-ai, OBLITERATUS, JonathanColetti, HauhauCS) racing to fill this niche. This suggests a maturation of the local inference ecosystem where users control their own deployment.

**Competition spans multiple Chinese labs**: Qwen, DeepSeek, MiniMax, and Moonshot AI are all releasing frontier models within weeks of each other. Kimi-K3's strong showing (10,913 likes) suggests it's a serious contender for multimodal leadership. **Video and music generation** are growing rapidly with MiniMax and Lightricks pushing boundaries.

**Efficiency is the watchword** — MoE architectures (Qwen3.8-2.4T-A95B, Ornith-1.5-35B-A3B), speculative decoding (DFlash2), compressed tensors (Kimi-K3), and aggressive quantization (NVFP4) all signal a shift from "bigger is better" to "smarter deployment."

---

## 4. Worth Exploring

1. **[Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)** — This router-MoE model with 95B active parameters represents the frontier of efficiency-scaling. For researchers and engineers studying how to achieve frontier performance with dramatically reduced compute, this is the reference architecture. It's also relatively under-explored (1,139 likes) compared to its dense sibling, suggesting early-adopter opportunity.

2. **[moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** — With 10,913 likes, this is the week's biggest "dark horse." Its compressed-tensors approach is novel, and its multimodal capabilities position it as a potential Qwen-killer. Any analyst tracking the Chinese AI lab landscape should study this model deeply — it may signal Moonshot's strategy to leapfrog competitors on efficiency.

3. **[unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — With **5.8 million downloads**, this is the most-deployed model on the list. Understanding why unsloth's quantization workflow has become the community standard — and how GGUF distributions drive ecosystem adoption — is essential for anyone building or contributing to the AI deployment stack. It's also the clearest example of how a third-party toolkit (unsloth) becomes infrastructure for an entire model ecosystem.

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*