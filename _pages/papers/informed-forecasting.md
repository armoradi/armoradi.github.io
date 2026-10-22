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

The rapid adoption of large language models (LLMs) has sparked growing interest in extending their capabilities beyond traditional natural language tasks, including applications in time series forecasting. This work explores the enhancement of time series forecasting with LLMs by incorporating time-dependent covariates. We propose a set of representative prompting strategies that span a wide range of formats while incorporating covariates, and then implement the proposed framework to evaluate performance across three real-world time series datasets in healthcare, service operations, and transportation. In our experiments, we use GPT-4o-mini and show that incorporating relevant covariate information through an appropriate prompt design can substantially improve forecasting accuracy, reducing prediction errors by up to 70% compared with the no-covariate baseline. Furthermore, the analysis reveals that both the choice of covariate and the prompt structure are critical, as poorly aligned configurations may degrade performance. Finally, we conduct sensitivity analyses to assess the effect of covariate integration in censored settings and quantify uncertainty, confirming that our method achieves statistically significant improvements over existing approaches. These findings underscore the potential of covariate integration in prompt design to bridge the gap between general-purpose LLMs and forecasting tasks.

## Citation

{% bibliography --query @*[key=ghasemloo2026informed] %}
