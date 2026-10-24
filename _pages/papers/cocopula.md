---
layout: page
permalink: /papers/cocopula/
title: "CoCopula"
description: "CoCopula: Conformal Calibration and Copula Aggregation for Reliable Renewable Energy Forecasting"
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
  <div class="cc-venue">Preprint · under review · 2026</div>
  <div class="cc-links">
    <a href="https://arxiv.org/abs/2602.02583"><i class="ai ai-arxiv"></i> arXiv</a>
    <a href="https://arxiv.org/pdf/2602.02583"><i class="fa-solid fa-file-pdf"></i> PDF</a>
    <a href="https://github.com/AI4OPT/CoCopula"><i class="fa-brands fa-github"></i> Code</a>
    <a href="#demo"><i class="fa-solid fa-play"></i> Demo</a>
    <a href="#citation"><i class="fa-solid fa-quote-right"></i> BibTeX</a>
  </div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cocopula/figure1.png' | relative_url }}" alt="Overview of CoCopula" loading="lazy">
  <div class="cc-caption"><b>Overview.</b> Site-level probabilistic forecasts are combined with copula-based aggregation, which captures cross-site dependence and gives a fleet-level predictive distribution. Context-aware conformal prediction (CACP) then calibrates the aggregated intervals using past forecast errors and contextual similarity, without any dedicated fleet-level forecasting model.</div>
</div>

<div class="cc-tldr"><b>TL;DR.</b> System operators often have probabilistic forecasts for each solar or wind site but no forecast for the fleet as a whole. CoCopula builds one: a Gaussian copula aggregates the site forecasts while keeping their dependence, and context-aware conformal prediction calibrates the result, giving reliable and sharp fleet-level intervals.</div>

<h2>Abstract</h2>

<p>The rapid growth of renewable energy penetration has intensified the need for reliable probabilistic forecasts to support grid operations at aggregated (fleet or system) levels. In practice, however, system operators often lack access to fleet-level probabilistic models and instead rely on site-level forecasts produced by heterogeneous third-party providers. Constructing coherent and calibrated fleet-level probabilistic forecasts from such inputs remains challenging due to complex cross-site dependencies and aggregation-induced miscalibration. Motivated by a real-world operational challenge identified through collaboration with an industry partner, this paper presents a probabilistic aggregation and calibration framework that directly converts site-level probabilistic forecasts into reliable fleet-level forecasts. The paper introduces <i>CoCopula</i> (<b>Co</b>nformal Calibration and <b>Copula</b> Aggregation), which integrates Copula-based dependence modeling to capture cross-site correlations followed by Context-Aware Conformal Prediction (CACP) to mitigate miscalibration at the aggregated level. This combination enables dependence-aware aggregation while improving empirical coverage and maintaining sharp prediction intervals. Experiments on large-scale solar generation datasets from three system operators in the United States including MISO, ERCOT, and SPP demonstrate that the proposed <i>CoCopula</i> approach achieves near-nominal empirical coverage and consistently lower Winkler scores than competing aggregation-based baselines across different target coverage levels. Importantly, <i>CoCopula</i> achieves performance comparable to directly calibrated system-level forecasts, demonstrating its practical value when dedicated fleet-level forecasting models are unavailable.</p>

<h2>How it works</h2>

<div class="cc-steps3">
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">1</b>Learn the dependence</div>Map each site's past outcomes through its own forecast CDF and fit a Gaussian copula to these values. Its correlation matrix describes how the forecast errors of the sites move together.</div>
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">2</b>Aggregate</div>Sample correlated uniforms from the copula, map them through each site's predictive distribution and sum over the sites. The samples give a fleet-level predictive distribution and its intervals.</div>
  <div class="cc-card"><div class="cc-card-title"><b class="cc-num">3</b>Calibrate</div>CACP widens or narrows each interval by a weighted conformal quantile of past errors, giving more weight to past hours whose context (sun position, time of day and year, previous-day generation) resembles the hour being forecast.</div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cocopula/cocopula.gif' | relative_url }}" alt="CoCopula animation" loading="lazy">
  <div class="cc-caption"><b>CoCopula in motion</b> (SPP, 24 July 2019): site forecasts, their learned dependence, copula aggregation, CACP weighting of past hours, and the calibrated fleet-level interval.</div>
</div>

<h2 id="demo">Interactive demo</h2>

<p>Pick a system operator and a day of the test period, then build the fleet-level forecast one step at a time, or press <b>Walk through</b>. The dashed lines show the previous step, red points are hours the interval misses, and the numbers below summarize the whole test period exactly as in the paper.</p>

<div id="cp-demo" data-base="{{ '/assets/json/cocopula_demo/' | relative_url }}">
  <div class="cp-row">
    <div id="cp-isos" class="cp-group"></div>
    <span class="cp-lab">target coverage</span><div id="cp-levels" class="cp-group"></div>
  </div>
  <div class="cp-row"><div id="cp-steps" class="cp-group"></div><button id="cp-play" type="button" class="cp-btn">▶ Walk through</button></div>
  <div id="cp-text"></div>
  <div class="cp-row cp-dayrow">
    <button id="cp-prev" type="button" class="cp-btn cp-small">‹</button>
    <input id="cp-day" type="range" min="0" max="183" step="1" value="0" aria-label="day">
    <button id="cp-next" type="button" class="cp-btn cp-small">›</button>
    <b id="cp-date"></b>
    <label class="cp-toggle"><input id="cp-nrel" type="checkbox"> show NREL+CACP</label>
  </div>
  <div id="cp-plot"></div>
  <div id="cp-day-stats"></div>
  <div id="cp-stats-title"></div>
  <div id="cp-stats" class="cp-stats"></div>
</div>

<style>
  #cp-demo { border: 1px solid var(--global-divider-color); border-radius: 10px; padding: 16px 18px 12px; margin: 1rem 0 0.4rem; }
  #cp-demo .cp-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; margin-bottom: 10px; }
  #cp-demo .cp-group { display: inline-flex; flex-wrap: wrap; border: 1px solid var(--global-divider-color); border-radius: 999px; overflow: hidden; }
  #cp-demo .cp-seg { border: 0; background: transparent; color: var(--global-text-color); padding: 4px 13px; font-size: 0.85rem; cursor: pointer; }
  #cp-demo .cp-seg + .cp-seg { border-left: 1px solid var(--global-divider-color); }
  #cp-demo .cp-seg.on { background: var(--global-theme-color); color: #fff; }
  #cp-demo .cp-lab { font-size: 0.82rem; opacity: 0.75; margin-left: auto; }
  #cp-demo .cp-btn { border: 1px solid var(--global-theme-color); color: var(--global-theme-color); background: transparent;
    border-radius: 999px; padding: 3px 14px; font-size: 0.85rem; cursor: pointer; }
  #cp-demo .cp-small { padding: 0 10px; font-size: 1rem; line-height: 1.5; border-color: var(--global-divider-color); color: var(--global-text-color); }
  #cp-demo #cp-text { font-size: 0.9rem; line-height: 1.55; min-height: 3.2em; margin: 2px 0 10px; padding: 0.5rem 0.8rem;
    border-left: 3px solid var(--global-theme-color); background: rgba(127, 127, 127, 0.06); border-radius: 0 6px 6px 0; }
  #cp-demo .cp-dayrow { font-size: 0.85rem; }
  #cp-demo input[type="range"] { flex: 1; min-width: 140px; accent-color: var(--global-theme-color); }
  #cp-demo .cp-toggle { margin: 0 0 0 auto; cursor: pointer; }
  #cp-demo #cp-plot { height: 380px; }
  #cp-demo #cp-day-stats { font-size: 0.85rem; opacity: 0.85; margin: 4px 0 10px; }
  #cp-demo #cp-stats-title { font-size: 0.82rem; opacity: 0.75; margin-bottom: 6px; }
  #cp-demo .cp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; }
  #cp-demo .cp-stat { border: 1px solid var(--global-divider-color); border-radius: 8px; padding: 0.6rem 0.4rem; }
  #cp-demo .cp-stat .v { font-size: 1.4rem; font-weight: 600; color: var(--global-theme-color); line-height: 1.2; }
  #cp-demo .cp-stat .l { font-size: 0.76rem; opacity: 0.75; }
  @media (max-width: 640px) { #cp-demo .cp-lab, #cp-demo .cp-toggle { margin-left: 0; } #cp-demo #cp-plot { height: 320px; } }
</style>

<script src="https://cdn.jsdelivr.net/npm/plotly.js@3.0.1/dist/plotly.min.js" integrity="sha256-oy6Be7Eh6eiQFs5M7oXuPxxm9qbJXEtTpfSI93dW16Q=" crossorigin="anonymous"></script>
<script src="{{ '/assets/js/cocopula_demo.js' | relative_url }}"></script>

<h2>Results</h2>

<div class="cc-stats">
  <div class="cc-stat"><div class="v">3</div><div class="l">U.S. system operators<br>MISO · ERCOT · SPP</div></div>
  <div class="cc-stat"><div class="v">12 / 12</div><div class="l">settings with the lowest<br>Winkler score (aggregation-based)</div></div>
  <div class="cc-stat"><div class="v">12 / 12</div><div class="l">settings at or above<br>the target coverage</div></div>
  <div class="cc-stat"><div class="v">≤ 8%</div><div class="l">Winkler gap to calibrated<br>system-level forecasts</div></div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cocopula/row-picp-aiw.png' | relative_url }}" alt="Coverage versus interval width" loading="lazy">
  <div class="cc-caption"><b>Coverage–sharpness trade-off.</b> Empirical coverage against average interval width for target levels from 50% to 95%. CoCopula reaches a given coverage with narrower intervals than the other aggregation-based methods and closely tracks the directly calibrated NREL+CACP system-level forecast.</div>
</div>

<div class="cc-figure">
  <img src="{{ '/assets/img/papers/cocopula/row-hourly.png' | relative_url }}" alt="Hourly coverage" loading="lazy">
  <div class="cc-caption"><b>Hourly coverage at the 80% target.</b> The bars show the coverage of the site-level forecasts: their under-coverage around sunrise and sunset is inherited by the uncalibrated copula aggregation, while CoCopula stays at or above the target across most daylight hours.</div>
</div>

<h2 id="citation">Citation</h2>

<div class="cc-bib">
<button type="button" onclick="navigator.clipboard.writeText(this.nextElementSibling.innerText); this.textContent='Copied';">Copy</button>
<pre>@article{moradi2026cocopula,
  title   = {CoCopula: Conformal Calibration and Copula Aggregation for Reliable Renewable Energy Forecasting},
  author  = {Moradi, Alireza and Tanneau, Mathieu and Zandehshahvar, Reza and Van Hentenryck, Pascal},
  journal = {arXiv preprint arXiv:2602.02583},
  year    = {2026}
}</pre>
</div>

</div>
