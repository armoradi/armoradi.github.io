---
layout: page
permalink: /papers/cacp/
title: "CACP"
description: "Enhanced Renewable Energy Forecasting using Context-Aware Conformal Prediction"
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
    <a href="{{ '/' | relative_url }}"><b>Alireza Moradi</b></a><sup>1,2</sup> &nbsp;·&nbsp;
    Mathieu Tanneau<sup>1,2</sup> &nbsp;·&nbsp;
    <a href="https://www.isye.gatech.edu/users/reza-zandehshahvar">Reza Zandehshahvar</a><sup>1,2</sup> &nbsp;·&nbsp;
    <a href="https://www.isye.gatech.edu/users/pascal-van-hentenryck">Pascal Van Hentenryck</a><sup>1,2</sup>
  </div>
  <div class="cc-affil">
    <sup>1</sup>H. Milton Stewart School of Industrial and Systems Engineering, Georgia Tech &nbsp;
    <sup>2</sup>NSF AI Institute for Advances in Optimization (AI4OPT)
  </div>
  <div class="cc-venue">Preprint · under review · 2025</div>
  <div class="cc-links">
    <a href="https://arxiv.org/abs/2510.15780"><i class="ai ai-arxiv"></i> arXiv</a>
    <a href="https://arxiv.org/pdf/2510.15780"><i class="fa-solid fa-file-pdf"></i> PDF</a>
    <a href="#demo"><i class="fa-solid fa-play"></i> Demo</a>
    <a href="#citation"><i class="fa-solid fa-quote-right"></i> BibTeX</a>
  </div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cacp/figure1.png' | relative_url }}" alt="Overview of CACP" loading="lazy">
  <div class="cc-caption"><b>Overview.</b> Conformity scores from past hours are weighted by their similarity to the hour being forecast (purple: early morning, orange: evening). CQR weights every past hour equally; CACP emphasizes the similar ones, giving tighter and better-adapted prediction intervals.</div>
</div>

<div class="cc-tldr"><b>TL;DR.</b> Renewable forecasts often come from a vendor as a black box, so they cannot be retrained, and they are miscalibrated in ways that change with the hour, the season and the weather. CACP fixes them after the fact: it calibrates each interval with the past forecast errors made under similar conditions, giving reliable coverage with sharper intervals than standard conformal prediction.</div>

<h2>Abstract</h2>

<p>Artificial intelligence (AI) is increasingly used to support renewable energy forecasting and grid operations. As renewable penetration grows, reliable probabilistic forecasting is becoming essential for managing uncertainty and supporting risk-aware operational decision-making. However, these forecasts often suffer from miscalibration due to temporal variability, changing weather conditions, and heterogeneous operating regimes. In many real-world settings, renewable energy forecasts are provided by external sources, vendors, or independently trained systems, making retraining infeasible because of limited model access or computational constraints. This creates a need for efficient and model-agnostic methods that can improve forecast reliability after they are produced. This paper presents Context-Aware Conformal Prediction (CACP), a framework for calibrating renewable energy forecasts. The proposed method relies on a weighting mechanism during the calibration procedure which assigns higher weights to historical observations that are more similar to the target forecasting condition. This enables adaptive prediction intervals that reflect local uncertainty regimes without requiring access to, or retraining of, the underlying forecasting model. Experiments are performed on a large-scale dataset from National Renewable Energy Laboratory (NREL) day-ahead solar forecasting, covering multiple systems including MISO, ERCOT, and SPP. The results show that CACP improves the reliability-efficiency tradeoff at both site and system levels compared to NREL's base forecasting model and the other conformal prediction baselines.</p>

<h2>How it works</h2>

<div class="cc-steps3">
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">1</b>Score past errors</div>For every past hour, measure how far the actual generation fell outside the forecast's quantile interval (the CQR conformity score). The forecasting model itself is never touched.</div>
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">2</b>Weight by context</div>Describe each hour by physically meaningful covariates (sun position, time of day and year, previous-day generation and, where available, weather) and give past hours with similar context more weight, using K-means clusters, nearest neighbours (KNN) or a kernel.</div>
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">3</b>Calibrate</div>Widen or narrow the forecast interval by the weighted quantile of the past scores. Covariate groups and hyperparameters are re-selected as the calibration window rolls forward.</div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cacp/delta-by-hour.png' | relative_url }}" alt="Interval-width adjustment by hour" loading="lazy">
  <div class="cc-caption"><b>Context-aware adjustment</b> (SPP system). Change in interval width relative to NREL, by hour of day. CQR adds a nearly constant margin at every hour; CACP widens the intervals in the uncertain morning and evening hours and tightens them around the midday peak.</div>
</div>

<h2 id="demo">Interactive demo</h2>

<p>Pick a system operator, a target coverage and a day of the test period, then calibrate NREL's day-ahead forecast one step at a time, or press <b>Walk through</b>. The dashed lines show the previous step, red points are hours the interval misses, and the numbers below summarize the whole test period.</p>

<div id="ca-demo" data-base="{{ '/assets/json/cacp_demo/' | relative_url }}">
  <div class="ca-row">
    <div id="ca-isos" class="ca-group"></div>
    <span class="ca-lab">target coverage</span><div id="ca-levels" class="ca-group"></div>
  </div>
  <div class="ca-row"><div id="ca-steps" class="ca-group"></div><button id="ca-play" type="button" class="ca-btn">▶ Walk through</button></div>
  <div class="ca-row" id="ca-variant-row"><span class="ca-lab ca-lab-left">CACP weighting</span><div id="ca-variants" class="ca-group"></div></div>
  <div id="ca-text"></div>
  <div class="ca-row ca-dayrow">
    <button id="ca-prev" type="button" class="ca-btn ca-small">‹</button>
    <input id="ca-day" type="range" min="0" max="305" step="1" value="0" aria-label="day">
    <button id="ca-next" type="button" class="ca-btn ca-small">›</button>
    <b id="ca-date"></b>
    <label class="ca-toggle"><input id="ca-hop" type="checkbox"> show HopCPT</label>
  </div>
  <div id="ca-plot"></div>
  <div id="ca-day-stats"></div>
  <div id="ca-stats-title"></div>
  <div id="ca-stats" class="ca-stats"></div>
  <div class="ca-note">Computed from the system-level predictions behind the paper's figures, pooled over all daylight hours. The paper's tables average daily windows, so their values differ slightly.</div>
</div>

<style>
  #ca-demo { border: 1px solid var(--global-divider-color); border-radius: 10px; padding: 16px 18px 12px; margin: 1rem 0 0.4rem; }
  #ca-demo .ca-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; margin-bottom: 10px; }
  #ca-demo #ca-variant-row { transition: opacity 0.2s; }
  #ca-demo .ca-group { display: inline-flex; flex-wrap: wrap; border: 1px solid var(--global-divider-color); border-radius: 999px; overflow: hidden; }
  #ca-demo .ca-seg { border: 0; background: transparent; color: var(--global-text-color); padding: 4px 13px; font-size: 0.85rem; cursor: pointer; }
  #ca-demo .ca-seg + .ca-seg { border-left: 1px solid var(--global-divider-color); }
  #ca-demo .ca-seg.on { background: var(--global-theme-color); color: #fff; }
  #ca-demo .ca-lab { font-size: 0.82rem; opacity: 0.75; margin-left: auto; }
  #ca-demo .ca-lab-left { margin-left: 0; }
  #ca-demo .ca-btn { border: 1px solid var(--global-theme-color); color: var(--global-theme-color); background: transparent;
    border-radius: 999px; padding: 3px 14px; font-size: 0.85rem; cursor: pointer; }
  #ca-demo .ca-small { padding: 0 10px; font-size: 1rem; line-height: 1.5; border-color: var(--global-divider-color); color: var(--global-text-color); }
  #ca-demo #ca-text { font-size: 0.9rem; line-height: 1.55; min-height: 3.2em; margin: 2px 0 10px; padding: 0.5rem 0.8rem;
    border-left: 3px solid var(--global-theme-color); background: rgba(127, 127, 127, 0.06); border-radius: 0 6px 6px 0; }
  #ca-demo .ca-dayrow { font-size: 0.85rem; }
  #ca-demo input[type="range"] { flex: 1; min-width: 140px; accent-color: var(--global-theme-color); }
  #ca-demo .ca-toggle { margin: 0 0 0 auto; cursor: pointer; }
  #ca-demo #ca-plot { height: 380px; }
  #ca-demo #ca-day-stats { font-size: 0.85rem; opacity: 0.85; margin: 4px 0 10px; }
  #ca-demo #ca-stats-title { font-size: 0.82rem; opacity: 0.75; margin-bottom: 6px; }
  #ca-demo .ca-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; }
  #ca-demo .ca-stat { border: 1px solid var(--global-divider-color); border-radius: 8px; padding: 0.6rem 0.4rem; }
  #ca-demo .ca-stat .v { font-size: 1.4rem; font-weight: 600; color: var(--global-theme-color); line-height: 1.2; }
  #ca-demo .ca-stat .l { font-size: 0.76rem; opacity: 0.75; }
  #ca-demo .ca-note { font-size: 0.75rem; opacity: 0.6; margin-top: 8px; }
  @media (max-width: 640px) { #ca-demo .ca-lab, #ca-demo .ca-toggle { margin-left: 0; } #ca-demo #ca-plot { height: 320px; } }
</style>

<script src="https://cdn.jsdelivr.net/npm/plotly.js@3.0.1/dist/plotly.min.js" integrity="sha256-oy6Be7Eh6eiQFs5M7oXuPxxm9qbJXEtTpfSI93dW16Q=" crossorigin="anonymous"></script>
<script src="{{ '/assets/js/cacp_demo.js' | relative_url }}"></script>

<h2>Results</h2>

<div class="cc-stats">
  <div class="cc-stat"><div class="v">1,149</div><div class="l">solar sites and 3 systems<br>MISO · ERCOT · SPP</div></div>
  <div class="cc-stat"><div class="v">24 / 24</div><div class="l">site and system settings where<br>CACP has the lowest Winkler score</div></div>
  <div class="cc-stat"><div class="v">up to 18%</div><div class="l">lower Winkler score than<br>the best baseline</div></div>
  <div class="cc-stat"><div class="v">0</div><div class="l">retraining of the<br>forecasting model</div></div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cacp/row-picp-aiw.png' | relative_url }}" alt="Coverage versus interval width" loading="lazy">
  <div class="cc-caption"><b>Coverage–sharpness trade-off.</b> Empirical coverage against average interval width for the system-level forecasts. At a given coverage, the CACP variants have narrower intervals than NREL and the conformal baselines (CQR, AdaptiveCP, NexCP, HopCPT).</div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cacp/row-hourly.png' | relative_url }}" alt="Hourly coverage" loading="lazy">
  <div class="cc-caption"><b>Hourly coverage at the 80% target.</b> The baselines under-cover in the early morning and evening and over-cover around midday. CACP stays close to the target across the day.</div>
</div>

<h2 id="citation">Citation</h2>

<div class="cc-bib">
<button type="button" onclick="navigator.clipboard.writeText(this.nextElementSibling.innerText); this.textContent='Copied';">Copy</button>
<pre>@article{moradi2025cacp,
  title   = {Enhanced Renewable Energy Forecasting using Context-Aware Conformal Prediction},
  author  = {Moradi, Alireza and Tanneau, Mathieu and Zandehshahvar, Reza and Van Hentenryck, Pascal},
  journal = {arXiv preprint arXiv:2510.15780},
  year    = {2025}
}</pre>
</div>

</div>
