# ArXiv AI Research Digest 2026-08-21

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-21 01:13 UTC

---

# ArXiv AI Research Digest — 2026-08-21

## Today's Highlights

Today's submissions reveal a strong focus on **test-time compute allocation and adaptive reasoning**, with several papers exploring how models can learn to allocate reasoning effort dynamically based on problem difficulty. **Agentic AI continues to dominate**, with new frameworks for skill selection, environment generation, and harness optimization pushing the boundaries of LLM agent capabilities. In **security**, novel work on extracting hidden chain-of-thought from proprietary reasoning models and detecting malicious agent skills highlights growing concerns around model asset protection. The **efficiency frontier** is advancing through compute-efficient hyperparameter transfer for MoE architectures, CPU-first small language model design, and scalable self-supervised audio learning. Domain applications are expanding significantly in legal AI, financial compliance, and scientific research platforms.

---

## Key Papers

### 🧠 Large Language Models

**Learning When to Think: Adaptive Reasoning for Test-Time Compute Allocation**
[arXiv:2608.20256](http://arxiv.org/abs/2608.20256v1)
G. Kassenaar, Z. Yang, V. François-Lavet
Addresses the fixed token budget problem in RL-trained reasoning models by learning adaptive compute allocation, potentially improving efficiency on easy problems and accuracy on hard ones.

**Daedalus-150M: A Convolution-Attention Hybrid Designed for CPU Inference**
[arXiv:2608.20210](http://arxiv.org/abs/2608.20210v1)
C. Koutsiaris
A CPU-first small language model with full attention in only 6 of 18 blocks, demonstrating that architecture should follow deployment constraints rather than being squeezed post-hoc.

**Let's Scale Step by Step: Compute-Efficient Hyperparameter Transfer for Large-Scale Mixture-of-Experts**
[arXiv:2608.20061](http://arxiv.org/abs/2608.20061v1)
N. Kim, H. Lee, Y. Bak et al.
Proposes a stepwise hyperparameter transfer method for MoE architectures that reduces the computational cost of learning rate sweeps at extreme model scales.

**EchoCoT: Extracting Hidden Chain-of-Thought from Large Reasoning Models**
[arXiv:2608.20055](http://arxiv.org/abs/2608.20055v1)
Y. Qu, Z. Yang, C. Cui et al.
Investigates whether hidden CoT traces can be extracted from black-box proprietary reasoning models, raising significant IP and security concerns for frontier model providers.

**Interrupting the Loop: Periodic Subject Changes Raise Judged Surprise and Connection in Base Language Models**
[arXiv:2608.19893](http://arxiv.org/abs/2608.19893v1)
R. Ono Filho
Dismantles a cognitively inspired generation loop across 24 conditions on three base models, finding that periodic subject injection drives novelty—relevant for understanding emergent LLM behavior.

---

### 🤖 Agents & Reasoning

**Optimal Skill Selection for LLM Agents with Provable Bicriteria Guarantees**
[arXiv:2608.19993](http://arxiv.org/abs/2608.19993v1)
Y. Chen, R. Chen, X. Wang et al.
Formalizes skill selection for bounded context windows as a bicriteria optimization problem with guarantees, addressing a first-order determinant of agent task performance and token cost.

**EnvHarness: Awakening Static Worlds for Agent Learning**
[arXiv:2608.19880](http://arxiv.org/abs/2608.19880v1)
C. Huang, Z. Wang, R. Han et al.
Addresses the limitation of static hand-built environments by dynamically generating environments responsive to agent weaknesses—no domain-specific pipelines required.

**Task-CoEvolve: Efficient Harness Optimization via Adaptive Validation Task Selection**
[arXiv:2608.20169](http://arxiv.org/abs/2608.20169v1)
A. Miyai, K. Aizawa, T. Yamasaki
Improves LLM agent harness optimization through adaptive validation task selection, reducing compute while improving performance gains from iterative harness rewriting.

**Evidence Before Expansion: Reuse, Spawn, or Defer in Lifelong Expert Pools**
[arXiv:2608.19888](http://arxiv.org/abs/2608.19888v1)
K. Oda
Presents a statistically principled decision layer for expert model pools that distinguishes reuse, spawn, and defer outcomes using sequential hypothesis testing.

**What You Can't See Is What You Learn: Restricted Evidence Visibility Favors Compositional Generalization in Shared-Genome Language-Model Societies**
[arXiv:2608.20054](http://arxiv.org/abs/2608.20054v1)
N. Marincat
Shows that restricting module evidence visibility changes which solutions gradient-based training discovers, improving compositional generalization in shared-genome LM societies.

---

### 🔧 Methods & Frameworks

**Manifold Drift in Flow Preference Optimization: A Root Cause of Reward Hacking**
[arXiv:2608.20011](http://arxiv.org/abs/2608.20011v1)
Y. Han, S. Liao, Y. Zhang et al.
Identifies manifold drift in flow matching preference optimization as a root cause of reward hacking, proposing a mechanism to constrain transport trajectories to pretrained data manifolds.

**Multi-Method Causal Evidence Synthesis: Ranking Candidate Drivers by Convergent Cross-Method Evidence**
[arXiv:2608.20187](http://arxiv.org/abs/2608.20187v1)
M. Gupta, D. De
Pools evidence across multiple causal discovery methods instead of relying on single-method outputs, producing confidence-ranked candidate drivers from observational data.

**TESTNAV: Pareto-Guided Search for Compositional Robustness Testing**
[arXiv:2608.19882](http://arxiv.org/abs/2608.19882v1)
A. Arif, T. Hartung, E. Botoeva et al.
Tackles combinatorial growth in compositional robustness testing with Pareto-guided search, revealing interaction effects from co-occurring input corruptions.

**Write Once, Run Everywhere: The Axon DSL for Shape-Safe and Framework-Agnostic LLM Architectures**
[arXiv:2608.19889](http://arxiv.org/abs/2608.19889v1)
J. Nielsen, D. Namazifard, L. Galke Poech et al.
A domain-specific language decoupling LLM architecture definitions from any specific training/inference framework, addressing platform dependency risk in the open-source ecosystem.

**A Strong Linear Baseline for Whole-Heart Cardiac Shape Completion on CT, with an Open Eleven-Structure Statistical Shape Model**
[arXiv:2608.19932](http://arxiv.org/abs/2608.19932v1)
M. Gazda, J. Gazda, J. Gazda et al.
Releases an eleven-structure cardiac statistical shape model with a strong linear baseline, enabling pooling of shape data across public cohorts with different annotation subsets.

---

### 📊 Applications

**InsufficiencyBench: Evaluating LLM Legal Advice on Underspecified User Queries**
[arXiv:2608.20220](http://arxiv.org/abs/2608.20220v1)
S. Vincent, D. Calloway, F. Yu et al.
First legal benchmark targeting query-side insufficiency—evaluating whether LLMs recognize when they lack materially determinative facts instead of giving confident answers.

**ReguSim: Evaluating LLM Agent Rule Grounding in Financial Compliance**
[arXiv:2608.19974](http://arxiv.org/abs/2608.19974v1)
Y. Luo, Y. Jiang, Q. Xie et al.
A controlled financial-compliance environment separating stated rules, executable constraints, and surveillance evidence to evaluate whether LLM agents truly ground their behavior in regulatory requirements.

**Bringing Analytic Rigor to Agentic AI for Science: The Brain Researcher Platform for Neuroimaging Data Analysis**
[arXiv:2608.19902](http://arxiv.org/abs/2608.19902v1)
Z. Chen, N. Lu, X. Li et al.
A scientific agent platform enforcing alternative weighing and evidence-limited claims, addressing problematic patterns like selective analysis and premature success declarations.

**Towards Professional Tennis Styles for Humanoid Robots with Adaptive Motion Planning and Tracking**
[arXiv:2608.20087](http://arxiv.org/abs/2608.20087v1)
T. Huang, R. Liu, X. Tang et al.
An adaptive motion planning framework enabling humanoid robots to achieve professional tennis motion styles while maintaining strong task performance.

**A knowledge-guided agentic framework for mitigating patient-context ambiguity in health queries**
[arXiv:2608.19875](http://arxiv.org/abs/2608.19875v1)
M. Abbasian, S. Farahani, A. Ilaty et al.
Agentic framework using medical knowledge to detect and resolve patient-context ambiguity in short, underspecified health chatbot queries.

---

## Research Trend Signal

Several emerging directions are visible from today's submissions. **Adaptive test-time computation** is becoming a major theme, moving beyond fixed token budgets toward problem-dependent reasoning allocation. **Agent skill security** has emerged as a critical subfield—with benchmarks for malicious skill detection alongside studies on extracting proprietary chain-of-thoughts, suggesting a new arms race in model asset protection. **Statistical rigor** is increasing in agent design: provable guarantees for skill selection, sequential hypothesis testing for expert pool decisions, and principled causal evidence synthesis all point to greater formalization of agentic systems. **Environment generation** for agent training is shifting from static hand-built worlds toward dynamic, weakness-aware generation without domain-specific engineering. Finally, the **legal AI** domain is maturing from simplistic QA benchmarks toward nuanced evaluations of insufficiency recognition and contract review—indicating a broader recognition that real-world applications require handling underspecification, not just well-formed queries.

---

## Worth Deep Reading

**EchoCoT: Extracting Hidden Chain-of-Thought from Large Reasoning Models** ([arXiv:2608.20055](http://arxiv.org/abs/2608.20055v1)) — Potentially a watershed paper for the industry. If hidden CoT extraction from black-box proprietary models is systematically feasible, this fundamentally challenges the protectability of reasoning traces and could reshape competitive dynamics among frontier AI labs.

**Learning When to Think: Adaptive Reasoning for Test-Time Compute Allocation** ([arXiv:2608.20256](http://arxiv.org/abs/2608.20256v1)) — Directly addresses the well-known over-thinking/under-thinking failure mode in RL-trained reasoning models. A practical solution here would deliver immediate inference cost savings across the field while improving accuracy on hard problems.

**Manifold Drift in Flow Preference Optimization: A Root Cause of Reward Hacking** ([arXiv:2608.20011](http://arxiv.org/abs/2608.20011v1)) — Reward hacking remains one of the most important unsolved problems in generative model alignment. Establishing manifold drift as a root cause and proposing mechanisms to constrain it offers a path toward more reliable preference optimization for continuous-time generative models.

---
*This digest is auto-generated by [agents-radar](https://github.com/yurtsWunewbie/agent-radar_trial).*