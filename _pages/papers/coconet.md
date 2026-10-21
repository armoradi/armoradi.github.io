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

<!--
Embed a demo here: a video ({% include video.liquid path="assets/video/demo.mp4" controls=true %}),
an animated GIF via figure.liquid, or an iframe to a hosted app (Hugging Face Space, Colab, etc.).
-->

_Demo coming soon._

## Citation

{% bibliography --query @*[key=moradi2026coconet] %}
