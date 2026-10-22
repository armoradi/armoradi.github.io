---
layout: page
permalink: /papers/coconet/
title: "CoCoNet"
description: "Convex Conformal Network for Multi-dimensional Uncertainty Regions"
nav: false
---

<style>
  .cc-page { --cc-accent: var(--global-theme-color); --cc-line: var(--global-divider-color); }
  .cc-page h2 { font-size: 1.35rem; font-weight: 600; margin: 2.6rem 0 0.9rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--cc-line); }
  .cc-page p { line-height: 1.65; }
  .cc-hero { text-align: center; margin: 0.4rem 0 1.6rem; }
  .cc-authors { font-size: 1.05rem; margin-bottom: 0.3rem; }
  .cc-authors a { color: inherit; }
  .cc-authors sup, .cc-affil sup { font-size: 0.7em; margin-left: 1px; }
  .cc-affil { font-size: 0.86rem; opacity: 0.75; line-height: 1.5; }
  .cc-venue { display: inline-block; margin: 0.8rem 0 0.2rem; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }
  .cc-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-top: 0.8rem; }
  .cc-links a { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 999px; font-size: 0.9rem;
    border: 1px solid var(--cc-line); color: var(--global-text-color); text-decoration: none; transition: all 0.15s; }
  .cc-links a:hover { border-color: var(--cc-accent); color: var(--cc-accent); }
  .cc-figure { margin: 1.2rem 0 0.4rem; }
  .cc-figure img { width: 100%; height: auto; border-radius: 6px; }
  .cc-caption { font-size: 0.85rem; opacity: 0.8; margin-top: 0.5rem; line-height: 1.5; }
  .cc-tldr { border-left: 3px solid var(--cc-accent); padding: 0.6rem 1rem; margin: 1.4rem 0; font-size: 1rem;
    background: rgba(127, 127, 127, 0.06); border-radius: 0 6px 6px 0; }
  .cc-steps3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 1rem 0 0.6rem; }
  .cc-card { border: 1px solid var(--cc-line); border-radius: 8px; padding: 0.8rem 0.95rem; font-size: 0.9rem; line-height: 1.5; }
  .cc-card b.cc-num { display: inline-block; width: 1.6rem; height: 1.6rem; line-height: 1.6rem; text-align: center; border-radius: 50%;
    background: var(--cc-accent); color: #fff; font-size: 0.85rem; margin-right: 6px; }
  .cc-card .cc-card-title { font-weight: 600; margin-bottom: 0.3rem; }
  .cc-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 1rem 0 0.4rem; text-align: center; }
  .cc-stat { border: 1px solid var(--cc-line); border-radius: 8px; padding: 0.7rem 0.4rem; }
  .cc-stat .v { font-size: 1.6rem; font-weight: 600; color: var(--cc-accent); line-height: 1.2; }
  .cc-stat .l { font-size: 0.78rem; opacity: 0.75; }
  .cc-bib { position: relative; }
  .cc-bib pre { font-size: 0.78rem; padding: 0.9rem 1rem; border-radius: 8px; border: 1px solid var(--cc-line); white-space: pre-wrap; }
  .cc-bib button { position: absolute; top: 8px; right: 8px; border: 1px solid var(--cc-line); background: var(--global-bg-color);
    color: var(--global-text-color); border-radius: 6px; font-size: 0.75rem; padding: 2px 10px; cursor: pointer; }
  @media (max-width: 640px) { .cc-steps3, .cc-stats { grid-template-columns: 1fr 1fr; } }
</style>

<div class="cc-page">

<div class="cc-hero">
  <div class="cc-authors">
    <a href="{{ '/' | relative_url }}"><b>Alireza Moradi</b></a><sup>1,3</sup> &nbsp;·&nbsp;
    Thomas Bruys<sup>2,3</sup> &nbsp;·&nbsp;
    <a href="https://www.isye.gatech.edu/users/pascal-van-hentenryck">Pascal Van Hentenryck</a><sup>1,3</sup> &nbsp;·&nbsp;
    Reza Zandehshahvar<sup>1,3</sup>
  </div>
  <div class="cc-affil">
    <sup>1</sup>H. Milton Stewart School of Industrial and Systems Engineering, Georgia Tech &nbsp;
    <sup>2</sup>School of Electrical and Computer Engineering, Georgia Tech<br>
    <sup>3</sup>NSF AI Institute for Advances in Optimization (AI4OPT)
  </div>
  <div class="cc-venue">Preprint · under review · 2026</div>
  <div class="cc-links">
    <a href="https://arxiv.org/abs/2610.24246"><i class="ai ai-arxiv"></i> arXiv</a>
    <a href="https://arxiv.org/pdf/2610.24246"><i class="fa-solid fa-file-pdf"></i> PDF</a>
    <a href="https://github.com/AI4OPT/CoCoNet"><i class="fa-brands fa-github"></i> Code</a>
    <a href="#demo"><i class="fa-solid fa-play"></i> Demo</a>
    <a href="#citation"><i class="fa-solid fa-quote-right"></i> BibTeX</a>
  </div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/coconet/figure1.png' | relative_url }}" alt="Overview of CoCoNet" loading="lazy">
  <div class="cc-caption"><b>Overview.</b> CoCoNet learns a conformity score that is convex in the residual r = y − ŷ from held-out data, calibrates its threshold τ̂<sub>α</sub> with split conformal prediction, and predicts the convex region {r : S<sub>θ</sub>(x, r) ≤ τ̂<sub>α</sub>} around the forecast.</div>
</div>

<div class="cc-tldr"><b>TL;DR.</b> Instead of fixing the shape of a multivariate conformal region (a box, a ball, an ellipsoid), CoCoNet <i>learns</i> it: a convex score trained to make regions small, followed by split-conformal calibration so that coverage is guaranteed in finite samples.</div>

## Abstract

Conformal prediction (CP) provides distribution-free coverage guarantees under exchangeability, but the efficiency of its prediction regions depends critically on the choice of the conformity score. This is particularly important in multivariate regression, where dependencies across output dimensions induce complex joint uncertainty structures. This paper introduces CoCoNet (Convex Conformal Network) for learning convex conformity scores that induce flexible, data-adaptive prediction regions. CoCoNet learns the score from held-out data by optimizing prediction-region efficiency while enforcing convexity with respect to the residual. CoCoNet then applies split-conformal calibration to retain finite-sample coverage guarantees. The paper presents two variants of the method: CoCoNet<sub>Spline</sub>, based on piecewise-linear scores, and CoCoNet<sub>ICNN</sub>, based on Input Convex Neural Networks. Experiments compare CoCoNet with other CP baselines over synthetic and real-world datasets with output dimensions ranging from 2 to 16. Across 8 models and 30 multi-dimensional regression tasks, CoCoNet<sub>ICNN</sub> and CoCoNet<sub>Spline-ℓ₁</sub> achieve the best efficiencies with average ranks of 1.45 and 2.75, respectively. In particular, CoCoNet<sub>ICNN</sub> ranks first on 22 tasks out of 30 in terms of efficiency.

## How it works

<div class="cc-steps3">
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">1</b>Learn</div>Train a score S<sub>θ</sub>(x, r), convex in the residual r, to make the prediction region as small as possible at the target coverage.</div>
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">2</b>Calibrate</div>On a separate calibration set, take the conformal quantile τ̂<sub>α</sub> of the scores. This gives coverage ≥ 1 − α with no distributional assumptions.</div>
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">3</b>Predict</div>The region {r : S<sub>θ</sub>(x, r) ≤ τ̂<sub>α</sub>} is a convex sublevel set, so membership and volume are easy to compute and use downstream.</div>
</div>

Two score families are studied. **CoCoNet<sub>ICNN</sub>** uses an input-convex neural network, which can represent smooth convex geometries of any shape. **CoCoNet<sub>Spline</sub>** rotates the residual, applies a convex piecewise-linear score to each coordinate and aggregates them with an ℓ₁ or ℓ∞ norm, giving polygonal regions.

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/coconet/spline.png' | relative_url }}" alt="CoCoNet Spline" loading="lazy">
  <div class="cc-caption"><b>CoCoNet<sub>Spline</sub>.</b> A learned rotation z = Qᵀr, convex piecewise-linear scores G<sub>1</sub>, G<sub>2</sub> per coordinate, and an ℓ₁ or ℓ∞ aggregation, which induce polygonal prediction regions.</div>
</div>

<h2 id="demo">Interactive demo</h2>

Pick a synthetic geometry and a method, press <b>Train</b> to replay how its score is learned (drag the 3-D plot to rotate it at any time), then move α to calibrate. The dashed line is the true smallest region at the same coverage.

<div id="cc-demo" data-base="{{ '/assets/json/coconet_demo/' | relative_url }}">
  <div class="cc-top"><div id="cc-shapes" class="cc-group"></div></div>
  <div class="cc-top" style="margin-top:8px"><div id="cc-methods" class="cc-group"></div></div>
  <div class="cc-bar">
    <span class="cc-step">1&nbsp; Train</span><span class="cc-arrow">→</span>
    <span class="cc-step">2&nbsp; Calibrate</span><span class="cc-arrow">→</span>
    <span class="cc-step">3&nbsp; Predict</span>
    <button id="cc-train" type="button">▶ Train</button>
  </div>
  <div id="cc-calib">
    <span>α = <b id="cc-alpha-val">0.10</b></span>
    <input id="cc-alpha" type="range" min="0.02" max="0.40" step="0.01" value="0.10" disabled aria-label="alpha">
    <span>target coverage <b id="cc-target">90%</b></span>
    <label class="cc-toggle"><input id="cc-all" type="checkbox"> all methods</label>
  </div>
  <div id="cc-status"></div>
  <div class="cc-plots"><div id="cc-3d" class="cc-plot"></div><div id="cc-set" class="cc-plot"></div></div>
</div>

<style>
  #cc-demo { border: 1px solid var(--global-divider-color); border-radius: 10px; padding: 16px 18px 6px; margin: 1rem 0 0.4rem; }
  #cc-demo .cc-top { display: flex; justify-content: center; }
  #cc-demo .cc-group { display: inline-flex; flex-wrap: wrap; border: 1px solid var(--global-divider-color); border-radius: 999px; overflow: hidden; }
  #cc-demo .cc-seg { border: 0; background: transparent; color: var(--global-text-color); padding: 4px 13px; font-size: 0.85rem; cursor: pointer; }
  #cc-demo .cc-seg + .cc-seg { border-left: 1px solid var(--global-divider-color); }
  #cc-demo .cc-seg.on { background: var(--global-theme-color); color: #fff; }
  #cc-demo .cc-bar { display: flex; align-items: center; gap: 10px; margin: 14px 0 6px; font-size: 0.85rem; flex-wrap: wrap; }
  #cc-demo .cc-step { opacity: 0.4; }
  #cc-demo .cc-step.on { opacity: 1; font-weight: 600; }
  #cc-demo .cc-step.past { opacity: 0.7; }
  #cc-demo .cc-arrow { opacity: 0.35; }
  #cc-demo #cc-train { border: 1px solid var(--global-theme-color); color: var(--global-theme-color); background: transparent;
    border-radius: 999px; padding: 3px 14px; font-size: 0.85rem; cursor: pointer; margin-left: auto; }
  #cc-demo #cc-train:disabled { opacity: 0.5; cursor: default; }
  #cc-demo #cc-calib { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; font-size: 0.85rem; transition: opacity 0.3s; }
  #cc-demo #cc-calib.off { opacity: 0.35; pointer-events: none; }
  #cc-demo input[type="range"] { flex: 1; min-width: 140px; max-width: 320px; accent-color: var(--global-theme-color); }
  #cc-demo .cc-toggle { margin: 0 0 0 auto; cursor: pointer; }
  #cc-demo #cc-status { font-size: 0.82rem; opacity: 0.8; min-height: 1.4em; margin: 6px 0 0; }
  #cc-demo .cc-plots { display: grid; grid-template-columns: 1.1fr 1fr; gap: 4px; }
  #cc-demo .cc-plot { height: 380px; min-width: 0; }
  @media (max-width: 768px) { #cc-demo .cc-plots { grid-template-columns: 1fr; } #cc-demo .cc-plot { height: 320px; } }
</style>

<script src="https://cdn.jsdelivr.net/npm/plotly.js@3.0.1/dist/plotly.min.js" integrity="sha256-oy6Be7Eh6eiQFs5M7oXuPxxm9qbJXEtTpfSI93dW16Q=" crossorigin="anonymous"></script>
<script src="{{ '/assets/js/coconet_demo.js' | relative_url }}"></script>

## Results

<div class="cc-stats">
  <div class="cc-stat"><div class="v">30</div><div class="l">regression tasks<br>output dim. 2–16</div></div>
  <div class="cc-stat"><div class="v">8</div><div class="l">conformal methods<br>compared</div></div>
  <div class="cc-stat"><div class="v">1.45</div><div class="l">mean efficiency rank<br>CoCoNet<sub>ICNN</sub></div></div>
  <div class="cc-stat"><div class="v">22 / 30</div><div class="l">tasks where<br>CoCoNet<sub>ICNN</sub> ranks first</div></div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/coconet/geo-sets.png' | relative_url }}" alt="Synthetic geometries" loading="lazy" style="max-width: 640px; display: block; margin: 0 auto;">
  <div class="cc-caption"><b>Synthetic geometries with known optimal regions.</b> Calibrated 90% regions for four residual distributions. CoCoNet<sub>ICNN</sub> follows the minimum set closely, including the asymmetric triangle and trapezoid, where symmetric baselines must cover empty space.</div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/coconet/casp-sets.png' | relative_url }}" alt="Regions on CASP" loading="lazy" style="max-width: 640px; display: block; margin: 0 auto;">
  <div class="cc-caption"><b>Input-adaptive regions on CASP.</b> Four test inputs with the same point predictor: the learned regions change shape and orientation with x.</div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/coconet/methods-rank-box.png' | relative_url }}" alt="Efficiency ranks" loading="lazy">
  <div class="cc-caption"><b>Efficiency ranks across 30 tasks</b> (lower is better), with the number of tasks on which each method is the most efficient.</div>
</div>

<h2 id="citation">Citation</h2>

<div class="cc-bib">
<button type="button" onclick="navigator.clipboard.writeText(this.nextElementSibling.innerText); this.textContent='Copied';">Copy</button>
<pre>@article{moradi2026coconet,
  title   = {CoCoNet: Convex Conformal Network for Multi-Dimensional Uncertainty Regions},
  author  = {Moradi, Alireza and Bruys, Thomas and Van Hentenryck, Pascal and Zandehshahvar, Reza},
  journal = {arXiv preprint arXiv:2610.24246},
  year    = {2026}
}</pre>
</div>

</div>
