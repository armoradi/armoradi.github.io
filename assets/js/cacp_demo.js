// Interactive CACP demo: calibrate NREL's day-ahead system-level solar forecast step by step (NREL, CQR, CACP)
// for any day of the test period in MISO, ERCOT or SPP.
// Data: assets/json/cacp_demo/<iso>.json, exported from the predictions behind the paper's figures
// (cacp-ijds scripts/web_demo_export.py).
(function () {
  const root = document.getElementById("ca-demo");
  if (!root) return;
  const base = root.dataset.base;
  const ISOS = [["miso", "MISO"], ["ercot", "ERCOT"], ["spp", "SPP"]];
  const LEVELS = [["0.6", "60%"], ["0.7", "70%"], ["0.8", "80%"], ["0.9", "90%"]];
  const VARIANTS = [["knn", "KNN"], ["kernel", "Kernel"], ["kmeans", "K-means"]];
  const STEPS = [
    { m: "nrel", name: "NREL", label: "1&nbsp; NREL forecast",
      text: "<b>Start from the vendor forecast.</b> NREL's day-ahead quantiles give an interval for every hour, but they are miscalibrated: too narrow around sunrise and sunset, too wide at midday." },
    { m: "cqr", name: "CQR", label: "2&nbsp; + CQR",
      text: "<b>Calibrate with CQR.</b> Conformalized quantile regression shifts every interval by one quantile of past errors, with all past hours weighted equally. Coverage improves, but the correction is nearly the same at every hour of the day." },
    { m: "cacp", name: "CACP", label: "3&nbsp; + CACP",
      text: "<b>Calibrate with CACP.</b> Past hours are weighted by how similar their context (sun position, time of day and year, recent generation, weather) is to the hour being forecast. Intervals widen in uncertain morning and evening hours and tighten at midday." },
  ];
  const COLOR = { nrel: "#7f7f7f", cqr: "#0072b2", knn: "#e69f00", kernel: "#009e73", kmeans: "#56b4e9", hopcpt: "#8e44ad" };
  const cache = {};
  const state = { iso: "miso", step: 2, level: "0.9", variant: "knn", day: null, hop: false };
  let timer = null;

  const $ = (id) => root.querySelector("#" + id);
  const pct = (v) => (100 * v).toFixed(1) + "%";
  const key = (s) => (s.m === "cacp" ? state.variant : s.m);
  const vname = () => VARIANTS.find((v) => v[0] === state.variant)[1];
  const sname = (s) => (s.m === "cacp" ? "CACP-" + vname() : s.name);

  function load(iso) {
    if (!cache[iso]) cache[iso] = fetch(base + iso + ".json").then((r) => r.json());
    return cache[iso];
  }

  function segmented(id, items, get, set) {
    const box = $(id);
    box.innerHTML = "";
    items.forEach(([k, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ca-seg" + (get() === k ? " on" : "");
      b.innerHTML = label;
      b.onclick = () => { stop(); if (get() !== k) { set(k); render(); } };
      box.appendChild(b);
    });
  }

  function colors() {
    const cs = getComputedStyle(document.body);
    return { text: cs.color || "#333", grid: "rgba(128,128,128,0.18)" };
  }

  function tint(hex, a) {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; $("ca-play").textContent = "▶ Walk through"; }
  }

  function play() {
    if (timer) { stop(); return; }
    state.step = 0; render();
    $("ca-play").textContent = "■ Stop";
    timer = setInterval(() => {
      if (state.step >= STEPS.length - 1) { stop(); return; }
      state.step += 1; render();
    }, 2400);
  }

  async function render() {
    const d = await load(state.iso);
    const li = d.levels.map(String).indexOf(state.level);
    if (state.day === null || state.day >= d.days.length) {
      const pick = d.days.findIndex((x) => x.d === "2019-04-20");
      state.day = pick >= 0 ? pick : 0;
    }
    segmented("ca-isos", ISOS, () => state.iso, (k) => { state.iso = k; });
    segmented("ca-levels", LEVELS, () => state.level, (k) => { state.level = k; });
    segmented("ca-steps", STEPS.map((s, i) => [String(i), s.label]), () => String(state.step), (k) => { state.step = +k; });
    segmented("ca-variants", VARIANTS, () => state.variant, (k) => { state.variant = k; });
    $("ca-variant-row").style.opacity = state.step === 2 ? 1 : 0.45;

    const day = d.days[state.day], step = STEPS[state.step], prev = state.step > 0 ? STEPS[state.step - 1] : null;
    const slider = $("ca-day");
    slider.max = d.days.length - 1; slider.value = state.day;
    $("ca-date").textContent = new Date(day.d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    $("ca-text").innerHTML = step.text;

    const x = day.h, y = day.y, m = key(step);
    const band = (k) => day.m[k][li];
    const [lo, hi] = band(m);
    const inside = y.map((v, i) => v >= lo[i] && v <= hi[i]);
    const nIn = inside.filter(Boolean).length;
    const width = lo.reduce((s, v, i) => s + hi[i] - v, 0) / lo.length;

    const t = colors(), c = COLOR[m], target = Math.round(100 * +state.level);
    const traces = [
      { x, y: hi, mode: "lines", line: { width: 0 }, hoverinfo: "skip", showlegend: false },
      { x, y: lo, mode: "lines", fill: "tonexty", fillcolor: tint(c, 0.28), line: { color: c, width: 1.2 },
        name: `${sname(step)} ${target}% interval`, hovertemplate: "%{x}:00  lower %{y:.3f}<extra></extra>" },
      { x, y: hi, mode: "lines", line: { color: c, width: 1.2 }, showlegend: false, hovertemplate: "%{x}:00  upper %{y:.3f}<extra></extra>" },
    ];
    let extra = [];
    if (prev) {
      const pk = key(prev), [plo, phi] = band(pk);
      extra = extra.concat(phi);
      traces.push({ x, y: plo, mode: "lines", line: { color: COLOR[pk], width: 1.3, dash: "dash" }, name: `${sname(prev)} (previous step)`, hoverinfo: "skip" });
      traces.push({ x, y: phi, mode: "lines", line: { color: COLOR[pk], width: 1.3, dash: "dash" }, showlegend: false, hoverinfo: "skip" });
    }
    if (state.hop) {
      const [hlo, hhi] = band("hopcpt");
      extra = extra.concat(hhi);
      traces.push({ x, y: hlo, mode: "lines", line: { color: COLOR.hopcpt, width: 1.3, dash: "dot" }, name: "HopCPT (deep-learning baseline)", hoverinfo: "skip" });
      traces.push({ x, y: hhi, mode: "lines", line: { color: COLOR.hopcpt, width: 1.3, dash: "dot" }, showlegend: false, hoverinfo: "skip" });
    }
    traces.push({ x, y, mode: "lines+markers", name: "Actual", line: { color: t.text, width: 1.2 },
      marker: { size: 7, color: inside.map((v) => (v ? t.text : "#d62728")), line: { width: 0 } },
      hovertemplate: "%{x}:00  actual %{y:.3f}<extra></extra>" });

    const ymax = Math.max(...hi, ...y, ...extra) * 1.08;
    Plotly.react($("ca-plot"), traces, {
      margin: { l: 56, r: 12, t: 8, b: 64 }, paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: t.text, size: 12 },
      xaxis: { title: { text: "Hour (CST)", standoff: 14 }, tickvals: x, ticktext: x.map((h) => h + ":00"), tickangle: -45, gridcolor: t.grid, zeroline: false },
      yaxis: { title: { text: "Generation / capacity" }, range: [0, Math.min(1.05, Math.max(ymax, 0.05))], gridcolor: t.grid, zeroline: false },
      legend: { orientation: "h", x: 0, y: 1.0, yanchor: "bottom", font: { size: 11 } },
      transition: { duration: 350, easing: "cubic-in-out" },
    }, { displayModeBar: false, responsive: true });

    const [P, A, W] = d.metrics[m][state.level];
    $("ca-day-stats").innerHTML = `This day: <b>${nIn}/${x.length}</b> daylight hours covered (red points are missed), mean width <b>${width.toFixed(3)}</b>.`;
    let cmp = "";
    if (prev) {
      const [, , pW] = d.metrics[key(prev)][state.level];
      const ch = (W - pW) / pW;
      cmp = `<div class="l">${ch <= 0 ? "▼" : "▲"} ${Math.abs(100 * ch).toFixed(0)}% vs. ${sname(prev)}</div>`;
    }
    $("ca-stats").innerHTML = `
      <div class="ca-stat"><div class="v">${pct(P)}</div><div class="l">coverage (PICP)<br>target ${target}%</div></div>
      <div class="ca-stat"><div class="v">${A.toFixed(3)}</div><div class="l">average interval<br>width (AIW)</div></div>
      <div class="ca-stat"><div class="v">${W.toFixed(3)}</div><div class="l">Winkler score<br>(lower is better)</div>${cmp}</div>`;
    $("ca-stats-title").textContent = `${sname(step)} in ${d.iso}, all daylight hours of the test period (March–December 2019):`;
  }

  $("ca-day").oninput = (e) => { stop(); state.day = +e.target.value; render(); };
  $("ca-prev").onclick = () => { stop(); state.day = Math.max(0, state.day - 1); render(); };
  $("ca-next").onclick = () => { stop(); state.day = +$("ca-day").max > state.day ? state.day + 1 : state.day; render(); };
  $("ca-hop").onchange = (e) => { state.hop = e.target.checked; render(); };
  $("ca-play").onclick = play;
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  render();
})();
