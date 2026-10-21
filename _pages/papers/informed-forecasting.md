---
layout: page
permalink: /papers/informed-forecasting/
title: "Informed forecasting with LLMs"
description: "Informed Forecasting: Leveraging Auxiliary Knowledge to Boost LLM Performance on Time Series Forecasting"
nav: false
---

Mohammadmahdi Ghasemloo, **Alireza Moradi**

<em>PLOS ONE</em>, 2026

<a href="https://doi.org/10.1371/journal.pone.0358970" class="btn btn-sm z-depth-0" role="button">DOI</a> <a href="https://arxiv.org/abs/2505.10213" class="btn btn-sm z-depth-0" role="button">arXiv</a>

## Abstract

With the widespread adoption of Large Language Models (LLMs), there is a growing need to establish best practices for leveraging their capabilities beyond traditional natural language tasks. In this paper, a novel cross-domain knowledge transfer framework is proposed to enhance the performance of LLMs in time series forecasting -- a task of increasing relevance in fields such as energy systems, finance, and healthcare. The approach systematically infuses LLMs with structured temporal information to improve their forecasting accuracy. This study evaluates the proposed method on a real-world time series dataset and compares it to a naive baseline where the LLM receives no auxiliary information. Results show that knowledge-informed forecasting significantly outperforms the uninformed baseline in terms of predictive accuracy and generalization. These findings highlight the potential of knowledge transfer strategies to bridge the gap between LLMs and domain-specific forecasting tasks.

## Figures

<!--
Put image files in assets/img/papers/informed-forecasting/ and add one line per figure, e.g.:
{% include figure.liquid path="assets/img/papers/informed-forecasting/figure1.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Caption text." %}
-->

_Figures coming soon._

## Demo

<!--
Embed a demo here: a video ({% include video.liquid path="assets/video/demo.mp4" controls=true %}),
an animated GIF via figure.liquid, or an iframe to a hosted app (Hugging Face Space, Colab, etc.).
-->

_Demo coming soon._

## Citation

{% bibliography --query @*[key=ghasemloo2026informed] %}
