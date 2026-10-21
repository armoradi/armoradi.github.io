---
layout: page
permalink: /papers/forecast-aggregation/
title: "Probabilistic forecast aggregation"
description: "Enhanced Renewable Energy Forecasting and Operations through Probabilistic Forecast Aggregation"
nav: false
---

**Alireza Moradi**, Mathieu Tanneau, Reza Zandehshahvar, Pascal Van Hentenryck

<em>Proceedings of the IISE Annual Conference and Expo</em>, 2025

<a href="https://doi.org/10.21872/annual2025_9066" class="btn btn-sm z-depth-0" role="button">DOI</a> <a href="https://arxiv.org/abs/2502.07010" class="btn btn-sm z-depth-0" role="button">arXiv</a>

## Abstract

Accurate and reliable forecasting of renewable energy generation is crucial for the efficient integration of renewable sources into the power grid. In particular, probabilistic forecasts are becoming essential for managing the intrinsic variability and uncertainty of renewable energy production, especially wind and solar generation. This paper considers the setting where probabilistic forecasts are provided for individual renewable energy sites using, e.g., quantile regression models, but without any correlation information between sites. This setting is common if, e.g., such forecasts are provided by each individual site, or by multiple vendors. However, to effectively manage a fleet of renewable generators, it is necessary to aggregate these individual forecasts to the fleet level, while ensuring that the aggregated probabilistic forecast is statistically consistent and reliable. To address this challenge, this paper presents the integrated use of Copula and Monte-Carlo methods to aggregate individual probabilistic forecasts into a statistically calibrated, probabilistic forecast at the fleet level. The proposed framework is validated using synthetic data from several large-scale U.S. systems.

## Figures

<!--
Put image files in assets/img/papers/forecast-aggregation/ and add one line per figure, e.g.:
{% include figure.liquid path="assets/img/papers/forecast-aggregation/figure1.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Caption text." %}
-->

_Figures coming soon._

## Demo

<!--
Embed a demo here: a video ({% include video.liquid path="assets/video/demo.mp4" controls=true %}),
an animated GIF via figure.liquid, or an iframe to a hosted app (Hugging Face Space, Colab, etc.).
-->

_Demo coming soon._

## Citation

{% bibliography --query @*[key=moradi2025aggregation] %}
