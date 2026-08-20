# Hugging Face Trending Models Digest 2026-08-20

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-20 01:09 UTC

---

# 🤗 Hugging Face Trending Models Digest — 2026-08-20

---

## 1. Today's Highlights

This week's Hugging Face landscape is dominated by the **Qwen3.8-27B** ecosystem, with the base model amassing over 11,000 likes and spawning a massive wave of quantized, uncensored, and abliterated derivatives across GGUF, MLX, FP8, and NVFP4 formats. **MiniMax** continues its aggressive push into generative media with **MiniMax-H3** (video) and **MiniMax-Music3** (music), both backed by Comfy-Org integration for single-file diffusion workflows. **moonshotai/Kimi-K3** is the surprise breakout, reaching 10,800+ likes with a "compressed-tensors" tag that signals an efficiency-first architecture. DeepSeek's V4 line (Pro and Flash variants) maintains steady momentum, while the sheer volume of Qwen3.8-27B fine-tunes suggests the community has broadly adopted this as the new default base model for experimentation.

---

## 2. Trending Models

### 🧠 Language Models (LLMs, Chat Models)

| Model | Author | ❤️ | ⬇️ |
|---|---|---|---|
| [DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 633 | 37.5K |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,548 | 2.33M |
| [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,100 | 12.7K |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,853 | 2.29M |

- **DeepSeek-V4-Flash-0731** is the high-volume DeepSeek variant, blending strong reasoning with massive community adoption as a fast daily driver.
- **Qwen3.8-2.4T-A95B** is Qwen's MoE flagship — a 2.4T-total-parameter model with 95B active — trending as the "biggest bang per compute" open-weight option.
- **Kimi-K3** is a compact, feature-extraction-tuned model with compressed-tensor support, trending for its efficiency focus — a possible sign of the "small but mighty" shift.

### 🎨 Multimodal & Generation

| Model | Author | ❤️ | ⬇️ |
|---|---|---|---|
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,484 | 1.0M |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,182 | 3.05M |
| [MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,037 | 13.1K |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,323 | 556K |
| [Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,702 | 430K |
| [Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 625 | 341K |
| [Anima-2.9B](https://huggingface.co/Gazingstars123/Anima-2.9B) | Gazingstars123 | 270 | 26.6K |

- **Qwen3.8-27B** is the week's crown jewel — a dense multimodal (image+text) model with native qwen3_5 architecture, driving the entire ecosystem this week.
- **MiniMax-H3** leads the video generation race, with 3M+ downloads and a full single-file diffusion release on Comfy-Org.
- **MiniMax-Music3** is the new text-to-music entry, signaling that *audio* is the next frontier after video.
- **LTX-2.5** is Lightricks' next-gen image-to-video model, supporting text→video, image→video, and video→video in a single diffusion file.
- **Muse-Glimmer-30B** (meta-models) is being watched closely as a possibly Meta-affiliated multimodal release — the largest Meta-branded open model this cycle.
- **Minimax-h3-Turbo** brings speed to H3 video with t2v/i2v/r2v variants.
- **Anima-2.9B** is a lightweight ComfyUI-ready text-to-image model getting early traction for its efficient single-file design.

### 🔧 Specialized Models

- **None** this week — no pure-play code/math/medical/embedding models were in the top 30. The ecosystem is currently dominated by *generalist* models and *generation* tools. Kimi-K3 (feature extraction) and Qwen3.8-2.4T-A95B (MoE) are the closest to "specialized" — but they're better classified as general-purpose LLMs with special efficiency tricks.

### 📦 Fine-tunes & Quantizations

| Model | Author | ❤️ | ⬇️ |
|---|---|---|---|
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,082 | 4.32M |
| [Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 600 | 1.06M |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 467 | 767K |
| [Qwen3.6-27B-Fable-Fusion-711...GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,165 | 3.03M |
| [Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 614 | 60K |
| [Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 286 | 653K |
| [MiniMax-H3 (Comfy-Org)](https://huggingface.co/Comfy-Org/MiniMax-H3) | Comfy-Org | 1,443 | 15.21M |
| [MiniMax-Music-3 (Comfy-Org)](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 193 | 325K |
| [10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 283 | 0 |
| [Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 597 | 27 |
| Additional Qwen3.8-27B uncensored/abliterated GGUF variants | huihui-ai, Blackfrost-AI, HauhauCS, 0bserverx, empero-ai, orcarouter | 150–290 | 26K–245K each |

- **unsloth's GGUF** is the de facto standard for Qwen3.8-27B quantization — 4.3M downloads, making it the most-downloaded single quant this week.
- **DavidAU's Fable-Fusion** mega-merge trends as the community's favorite "uncensored roleplay" merge, at 3M downloads.
- **Comfy-Org's MiniMax-H3** single-file release is the top download overall (15.2M) proving that "one file to run everything" remains the killer format.
- The **orcarouter/huihui-ai/Blackfrost-AI** cluster shows heavy community competition to produce the "best" abliterated Qwen3.8 — 7 different uncensored variants in the top 30.

---

## 3. Ecosystem Signal

**Qwen3.8-27B is the undisputed center of gravity this week.** It accounts for roughly 60% of the trending list across base, quantized, fine-tuned, and uncensored variants. The fact that the FP8 (1M downloads) and NVFP4 (653K downloads) versions are already pulling huge numbers suggests **hardware-aware quantization (FP4/NVFP4) is becoming mainstream** — the community is optimizing for *consumer GPU memory* rather than just CPU inference.

**MiniMax is the strongest challenger.** With H3 (video) + Music3 (audio) + Comfy-Org's 15M-download single-file pipeline, MiniMax is winning the generation race by removing friction — no PyTorch knowledge required, just drag-and-drop into ComfyUI.

**Kimi-K3's 10.8K likes on a 2.9B-class model is the most interesting signal.** It indicates that the market is rewarding *efficiency* and *compression* over raw scale. The "compressed-tensors" tag plus feature-extraction focus may point to a new wave of on-device, latency-sensitive AI.

**Open-weight remains dominant** — every entry in the top 30 is open-weight, and the only "proprietary" presence is DeepSeek's V4 line, which is still downloadable. The abliterated/uncensored sub-ecosystem is thriving, suggesting that legal/alignment boundaries are being actively pushed by the community.

---

## 4. Worth Exploring

1. **[MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3)** (MiniMaxAI) — 1,037 likes, 13K downloads. Audio generation is the next big frontier after text and video, and this is the strongest text-to-music model of the week. Paired with the [Comfy-Org conversion](https://huggingface.co/Comfy-Org/MiniMax-Music-3), this is a must-try for any generative-AI studio.

2. **[Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)** (Qwen) — 1,100 likes. This is the MoE giant that matters. With 95B active parameters out of 2.4T total, it's the strongest open-weight reasoning model available this week. Studying its architecture (via the safetensors structure) is an education in modern sparse-MoE design.

3. **[Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)** (moonshotai) — 10,853 likes, 2.29M downloads. The compressed-tensors, feature-extraction angle sets it apart. Whether this is moonshot-ai's "small model strategy" taking off or just a buzzword hit, it's worth *measuring* — run it on-device, check inference latency, evaluate compression quality. If it delivers on the efficiency promise, it could redefine what a "small model" can do.

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*