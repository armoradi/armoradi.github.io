---
layout: page
permalink: /papers/cacp/
title: "CACP"
description: "Enhanced Renewable Energy Forecasting using Context-Aware Conformal Prediction"
nav: false
---

**Alireza Moradi**, Mathieu Tanneau, Reza Zandehshahvar, Pascal Van Hentenryck

Under review, 2025

<a href="https://arxiv.org/abs/2510.15780" class="btn btn-sm z-depth-0" role="button">arXiv</a>

## Abstract

Artificial intelligence (AI) is increasingly used to support renewable energy forecasting and grid operations. As renewable penetration grows, reliable probabilistic forecasting is becoming essential for managing uncertainty and supporting risk-aware operational decision-making. However, these forecasts often suffer from miscalibration due to temporal variability, changing weather conditions, and heterogeneous operating regimes. In many real-world settings, renewable energy forecasts are provided by external sources, vendors, or independently trained systems, making retraining infeasible because of limited model access or computational constraints. This creates a need for efficient and model-agnostic methods that can improve forecast reliability after they are produced. This paper presents Context-Aware Conformal Prediction (CACP), a framework for calibrating renewable energy forecasts. The proposed method relies on a weighting mechanism during the calibration procedure which assigns higher weights to historical observations that are more similar to the target forecasting condition. This enables adaptive prediction intervals that reflect local uncertainty regimes without requiring access to, or retraining of, the underlying forecasting model. Experiments are performed on a large-scale dataset from National Renewable Energy Laboratory (NREL) day-ahead solar forecasting, covering multiple systems including MISO, ERCOT, and SPP. The results show that CACP improves the reliability-efficiency tradeoff at both site and system levels compared to NREL's base forecasting model and the other conformal prediction baselines.

## Figures

<!--
Put image files in assets/img/papers/cacp/ and add one line per figure, e.g.:
{% include figure.liquid path="assets/img/papers/cacp/figure1.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Caption text." %}
-->

_Figures coming soon._

## Demo

<!--
Embed a demo here: a video ({% include video.liquid path="assets/video/demo.mp4" controls=true %}),
an animated GIF via figure.liquid, or an iframe to a hosted app (Hugging Face Space, Colab, etc.).
-->

_Demo coming soon._

## Citation

{% bibliography --query @*[key=moradi2025cacp] %}
