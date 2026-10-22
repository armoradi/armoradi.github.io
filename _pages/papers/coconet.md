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

Train a CoCoNet score on a synthetic geometry, then calibrate it: the threshold τ<sub>α</sub> is the split-conformal quantile of the calibration scores, and the prediction region is {r : S(x, r) ≤ τ<sub>α</sub>}. The dashed line is the true (smallest) region at the same coverage.

<style>
  #cc-demo { border: 1px solid var(--global-divider-color); border-radius: 10px; padding: 16px 18px 8px; margin: 8px 0 6px; }
  #cc-demo .cc-top { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center; justify-content: space-between; }
  #cc-demo .cc-group { display: inline-flex; border: 1px solid var(--global-divider-color); border-radius: 999px; overflow: hidden; }
  #cc-demo .cc-seg { border: 0; background: transparent; color: var(--global-text-color); padding: 4px 13px; font-size: 0.86rem; cursor: pointer; }
  #cc-demo .cc-seg + .cc-seg { border-left: 1px solid var(--global-divider-color); }
  #cc-demo .cc-seg.on { background: var(--global-theme-color); color: #fff; }
  #cc-demo .cc-steps { display: flex; align-items: center; gap: 10px; margin: 14px 0 4px; font-size: 0.85rem; flex-wrap: wrap; }
  #cc-demo .cc-step { opacity: 0.4; letter-spacing: 0.02em; }
  #cc-demo .cc-step.on { opacity: 1; font-weight: 600; }
  #cc-demo .cc-step.past { opacity: 0.7; }
  #cc-demo .cc-arrow { opacity: 0.35; }
  #cc-demo #cc-train { border: 1px solid var(--global-theme-color); color: var(--global-theme-color); background: transparent;
    border-radius: 999px; padding: 3px 14px; font-size: 0.85rem; cursor: pointer; margin-left: auto; }
  #cc-demo #cc-train:disabled { opacity: 0.5; cursor: default; }
  #cc-demo #cc-calib { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; font-size: 0.85rem; transition: opacity 0.3s; }
  #cc-demo #cc-calib.off { opacity: 0.35; pointer-events: none; }
  #cc-demo input[type="range"] { flex: 1; min-width: 140px; max-width: 320px; accent-color: var(--global-theme-color); }
  #cc-demo #cc-status { font-size: 0.82rem; opacity: 0.8; min-height: 1.4em; margin: 6px 0 0; }
  #cc-demo .cc-plots { display: grid; grid-template-columns: 1.1fr 1fr; gap: 4px; }
  #cc-demo .cc-plot { height: 380px; min-width: 0; }
  @media (max-width: 768px) { #cc-demo .cc-plots { grid-template-columns: 1fr; } #cc-demo .cc-plot { height: 320px; } }
</style>

<div id="cc-demo" data-base="{{ '/assets/json/coconet_demo/' | relative_url }}">
  <div class="cc-top"><div id="cc-shapes" class="cc-group"></div><div id="cc-methods" class="cc-group"></div></div>
  <div class="cc-steps">
    <span class="cc-step">1&nbsp; Train</span><span class="cc-arrow">→</span>
    <span class="cc-step">2&nbsp; Calibrate</span><span class="cc-arrow">→</span>
    <span class="cc-step">3&nbsp; Predict</span>
    <button id="cc-train" type="button">▶ Train</button>
  </div>
  <div id="cc-calib">
    <span>α = <b id="cc-alpha-val">0.10</b></span>
    <input id="cc-alpha" type="range" min="0.02" max="0.40" step="0.01" value="0.10" disabled>
    <span>coverage target <b id="cc-target">90%</b></span>
    <label style="margin:0 0 0 auto; cursor:pointer"><input id="cc-base" type="checkbox"> compare baselines</label>
  </div>
  <div id="cc-status"></div>
  <div class="cc-plots"><div id="cc-3d" class="cc-plot"></div><div id="cc-set" class="cc-plot"></div></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/plotly.js@3.0.1/dist/plotly.min.js" integrity="sha256-oy6Be7Eh6eiQFs5M7oXuPxxm9qbJXEtTpfSI93dW16Q=" crossorigin="anonymous"></script>
<script src="{{ '/assets/js/coconet_demo.js' | relative_url }}"></script>

<small>The paper's synthetic runs, one seed per geometry. Training replays saved per-epoch weights, and each epoch is shown at its own 90% threshold. Scores are drawn at a fixed input x and scaled so that τ<sub>α</sub> = 1 at α = 0.1.</small>

## Citation

{% bibliography --query @*[key=moradi2026coconet] %}
