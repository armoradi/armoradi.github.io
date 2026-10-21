---
layout: page
permalink: /papers/coconet/
title: "CoCoNet"
description: "CoCoNet: Convex Conformal Network for Multi-Dimensional Uncertainty Regions"
nav: false
---

**Alireza Moradi**, Thomas Bruys, Pascal Van Hentenryck, Reza Zandehshahvar

Under review, 2026

<a href="https://arxiv.org/abs/2610.24246" class="btn btn-sm z-depth-0" role="button">arXiv</a>

## Abstract

Conformal prediction (CP) provides distribution-free coverage guarantees under exchangeability, but the efficiency of its prediction regions depends critically on the choice of the conformity score. This is particularly important in multivariate regression, where dependencies across output dimensions induce complex joint uncertainty structures. This paper introduces CoCoNet (Convex Conformal Network) for learning convex conformity scores that induce flexible, data-adaptive prediction regions. CoCoNet learns the score from held-out data by optimizing prediction-region efficiency while enforcing convexity with respect to the residual. CoCoNet then applies split-conformal calibration to retain finite-sample coverage guarantees. The paper presents two variants of the method: CoCoNet<sub>Spline</sub>, based on piecewise-linear scores, and CoCoNet<sub>ICNN</sub>, based on Input Convex Neural Networks. Experiments compare CoCoNet with other CP baselines over synthetic and real-world datasets with output dimensions ranging from 2 to 16. Across 8 models and 30 multi-dimensional regression tasks, CoCoNet<sub>ICNN</sub> and CoCoNet<sub>Spline-ℓ1</sub> achieve the best efficiencies with average ranks of 1.45 and 2.75, respectively. In particular, CoCoNet<sub>ICNN</sub> ranks first on 22 tasks out of 30 in terms of efficiency.

## Figures

<!--
Put image files in assets/img/papers/coconet/ and add one line per figure, e.g.:
{% include figure.liquid path="assets/img/papers/coconet/figure1.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Caption text." %}
-->

_Figures coming soon._

## Demo

Pick a synthetic geometry and a method, then move α. The threshold τ̂ is the split-conformal quantile of the calibration scores, so the prediction region {r : S(x, r) ≤ τ̂} grows or shrinks with the target coverage 1 − α. The dashed line is the true (smallest) region at the same coverage.

<style>
  #cc-demo .cc-row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-bottom: 8px; }
  #cc-demo .cc-label { min-width: 80px; font-weight: 600; }
  #cc-demo .cc-btn { border: 1px solid var(--global-divider-color); background: transparent; color: var(--global-text-color);
    border-radius: 4px; padding: 3px 10px; font-size: 0.9rem; cursor: pointer; }
  #cc-demo .cc-btn.active { background: var(--global-theme-color); border-color: var(--global-theme-color); color: #fff; }
  #cc-demo input[type="range"] { flex: 1; min-width: 160px; max-width: 360px; accent-color: var(--global-theme-color); }
  #cc-demo #cc-stats { font-size: 0.9rem; margin: 4px 0 6px; }
  #cc-demo .cc-plots { display: grid; grid-template-columns: 1.15fr 1fr; gap: 8px; }
  #cc-demo .cc-plot { height: 420px; min-width: 0; }
  @media (max-width: 768px) { #cc-demo .cc-plots { grid-template-columns: 1fr; } #cc-demo .cc-plot { height: 360px; } }
</style>

<div id="cc-demo" data-base="{{ '/assets/json/coconet_demo/' | relative_url }}">
  <div class="cc-row"><span class="cc-label">Geometry</span><span id="cc-shapes" class="cc-row" style="margin:0"></span></div>
  <div class="cc-row"><span class="cc-label">Method</span><span id="cc-methods" class="cc-row" style="margin:0"></span></div>
  <div class="cc-row"><span class="cc-label">α = <span id="cc-alpha-val">0.10</span></span>
    <input id="cc-alpha" type="range" min="0.02" max="0.40" step="0.01" value="0.10">
    <span>target coverage <b id="cc-target">90%</b></span></div>
  <div id="cc-stats"></div>
  <div class="cc-plots"><div id="cc-3d" class="cc-plot"></div><div id="cc-set" class="cc-plot"></div></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/plotly.js@3.0.1/dist/plotly.min.js" integrity="sha256-oy6Be7Eh6eiQFs5M7oXuPxxm9qbJXEtTpfSI93dW16Q=" crossorigin="anonymous"></script>
<script src="{{ '/assets/js/coconet_demo.js' | relative_url }}"></script>

<small>Models are the paper's synthetic runs (one seed per geometry); scores are shown at a fixed input x and scaled so that τ̂ = 1 at α = 0.1.</small>

## Citation

{% bibliography --query @*[key=moradi2026coconet] %}
