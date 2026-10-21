---
layout: page
permalink: /papers/cocopula/
title: "CoCopula"
description: "CoCopula: Conformal Calibration and Copula Aggregation for Reliable Renewable Energy Forecasting"
nav: false
---

**Alireza Moradi**, Mathieu Tanneau, Reza Zandehshahvar, Pascal Van Hentenryck

Under review, 2026

<a href="https://arxiv.org/abs/2602.02583" class="btn btn-sm z-depth-0" role="button">arXiv</a>

## Abstract

The rapid growth of renewable energy penetration has intensified the need for reliable probabilistic forecasts to support grid operations at aggregated (fleet or system) levels. In practice, however, system operators often lack access to fleet-level probabilistic models and instead rely on site-level forecasts produced by heterogeneous third-party providers. Constructing coherent and calibrated fleet-level probabilistic forecasts from such inputs remains challenging due to complex cross-site dependencies and aggregation-induced miscalibration. Motivated by a real-world operational challenge identified through collaboration with an industry partner, this paper presents a probabilistic aggregation and calibration framework that directly converts site-level probabilistic forecasts into reliable fleet-level forecasts. The paper introduces CoCopula (Conformal Calibration and Copula Aggregation), which integrates Copula-based dependence modeling to capture cross-site correlations followed by Context-Aware Conformal Prediction (CACP) to mitigate miscalibration at the aggregated level. This combination enables dependence-aware aggregation while improving empirical coverage and maintaining sharp prediction intervals. Experiments on large-scale solar generation datasets from three system operators in the United States including MISO, ERCOT, and SPP demonstrate that CoCopula achieves near-nominal empirical coverage and consistently lower Winkler scores than competing aggregation-based baselines across different target coverage levels. Importantly, CoCopula achieves performance comparable to directly calibrated system-level forecasts, demonstrating its practical value when dedicated fleet-level forecasting models are unavailable.

## Figures

<!--
Put image files in assets/img/papers/cocopula/ and add one line per figure, e.g.:
{% include figure.liquid path="assets/img/papers/cocopula/figure1.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Caption text." %}
-->

_Figures coming soon._

## Demo

<!--
Embed a demo here: a video ({% include video.liquid path="assets/video/demo.mp4" controls=true %}),
an animated GIF via figure.liquid, or an iframe to a hosted app (Hugging Face Space, Colab, etc.).
-->

_Demo coming soon._

## Citation

{% bibliography --query @*[key=moradi2026copula] %}
