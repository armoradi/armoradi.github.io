// Interactive CoCopula demo: build a fleet-level solar forecast step by step (independent aggregation, copula
// aggregation, CQR calibration, CACP calibration = CoCopula) for any day of the test period in MISO, ERCOT or SPP.
// Data: assets/json/cocopula_demo/<iso>.json, exported from the paper's predictions (Table 1, Figures 3-6).
(function () {
  const root = document.getElementById("cp-demo");
  if (!root) return;
  const base = root.dataset.base;
  const ISOS = [["miso", "MISO"], ["ercot", "ERCOT"], ["spp", "SPP"]];
  const LEVELS = [["0.6", "60%"], ["0.7", "70%"], ["0.8", "80%"], ["0.9", "90%"]];
  const STEPS = [
    { m: "ind", name: "Ind", label: "1&nbsp; Independent",
      text: "<b>Aggregate under independence.</b> Summing the site forecasts as if their errors were independent lets the errors cancel out, so the fleet interval is far too narrow." },
    { m: "copula", name: "Copula", label: "2&nbsp; Copula",
      text: "<b>Learn the dependence.</b> A Gaussian copula captures how site errors move together. The interval widens and the forecast improves a lot, but it inherits the miscalibration of the site forecasts." },
    { m: "cqr", name: "Copula+CQR", label: "3&nbsp; + CQR",
      text: "<b>Calibrate with CQR.</b> One conformal correction computed from all past hours brings coverage close to the target, but it assumes past and future hours are exchangeable, which seasons and weather regimes break." },
    { m: "cocopula", name: "CoCopula", label: "4&nbsp; + CACP",
      text: "<b>Calibrate with CACP (CoCopula).</b> Past hours are weighted by how similar their context (sun position, time of day and year, previous-day generation) is to the hour being forecast, giving reliable coverage with sharp intervals." },
  ];
  const COLOR = { ind: "#7f7f7f", copula: "#ff7f0e", cqr: "#8c564b", cocopula: "#1f77b4", nrel: "#d62728" };
  const cache = {};
  const state = { iso: "spp", step: 3, level: "0.9", day: null, nrel: false };
  let timer = null;

  const $ = (id) => root.querySelector("#" + id);
  const pct = (v) => (100 * v).toFixed(1) + "%";

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
      b.className = "cp-seg" + (get() === k ? " on" : "");
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
    if (timer) { clearInterval(timer); timer = null; $("cp-play").textContent = "▶ Walk through"; }
  }

  function play() {
    if (timer) { stop(); return; }
    state.step = 0; render();
    $("cp-play").textContent = "■ Stop";
    timer = setInterval(() => {
      if (state.step >= STEPS.length - 1) { stop(); return; }
      state.step += 1; render();
    }, 2200);
  }

  async function render() {
    const d = await load(state.iso);
    const li = d.levels.map(String).indexOf(state.level);
    if (state.day === null || state.day >= d.days.length) {
      const pick = d.days.findIndex((x) => x.d.endsWith("-07-24"));
      state.day = pick >= 0 ? pick : 0;
    }
    segmented("cp-isos", ISOS, () => state.iso, (k) => { state.iso = k; });
    segmented("cp-levels", LEVELS, () => state.level, (k) => { state.level = k; });
    segmented("cp-steps", STEPS.map((s, i) => [String(i), s.label]), () => String(state.step), (k) => { state.step = +k; });
    const day = d.days[state.day], step = STEPS[state.step], prev = state.step > 0 ? STEPS[state.step - 1] : null;
    const slider = $("cp-day");
    slider.max = d.days.length - 1; slider.value = state.day;
    $("cp-date").textContent = new Date(day.d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    $("cp-text").innerHTML = step.text;

    const x = day.h, y = day.y.map((v) => v / 1000);
    const band = (m) => day.m[m][li].map((a) => a.map((v) => v / 1000));
    const [lo, hi] = band(step.m);
    const inside = y.map((v, i) => v >= lo[i] && v <= hi[i]);
    const nIn = inside.filter(Boolean).length;
    const width = lo.reduce((s, v, i) => s + hi[i] - v, 0) / lo.length;

    const t = colors(), c = COLOR[step.m], target = Math.round(100 * +state.level);
    const traces = [
      { x, y: hi, mode: "lines", line: { width: 0 }, hoverinfo: "skip", showlegend: false },
      { x, y: lo, mode: "lines", fill: "tonexty", fillcolor: tint(c, 0.28), line: { color: c, width: 1.2 },
        name: `${step.name} ${target}% interval`, hovertemplate: "%{x}:00  lower %{y:.3f}<extra></extra>" },
      { x, y: hi, mode: "lines", line: { color: c, width: 1.2 }, showlegend: false, hovertemplate: "%{x}:00  upper %{y:.3f}<extra></extra>" },
    ];
    if (prev) {
      const [plo, phi] = band(prev.m);
      traces.push({ x, y: plo, mode: "lines", line: { color: COLOR[prev.m], width: 1.3, dash: "dash" }, name: `${prev.name} (previous step)`, hoverinfo: "skip" });
      traces.push({ x, y: phi, mode: "lines", line: { color: COLOR[prev.m], width: 1.3, dash: "dash" }, showlegend: false, hoverinfo: "skip" });
    }
    if (state.nrel) {
      const [nlo, nhi] = band("nrel");
      traces.push({ x, y: nlo, mode: "lines", line: { color: COLOR.nrel, width: 1.3, dash: "dot" }, name: "NREL+CACP (reference)", hoverinfo: "skip" });
      traces.push({ x, y: nhi, mode: "lines", line: { color: COLOR.nrel, width: 1.3, dash: "dot" }, showlegend: false, hoverinfo: "skip" });
    }
    traces.push({ x, y, mode: "lines+markers", name: "Actual", line: { color: t.text, width: 1.2 },
      marker: { size: 7, color: inside.map((v) => (v ? t.text : "#d62728")), line: { width: 0 } },
      hovertemplate: "%{x}:00  actual %{y:.3f}<extra></extra>" });

    const ymax = Math.max(...hi, ...y, ...(state.nrel ? band("nrel")[1] : [])) * 1.08;
    Plotly.react($("cp-plot"), traces, {
      margin: { l: 56, r: 12, t: 8, b: 44 }, paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: t.text, size: 12 },
      xaxis: { title: { text: "Hour (CST)" }, tickvals: x, ticktext: x.map((h) => h + ":00"), tickangle: -45, gridcolor: t.grid, zeroline: false },
      yaxis: { title: { text: "Normalized generation" }, range: [0, Math.max(ymax, 0.05)], gridcolor: t.grid, zeroline: false },
      legend: { orientation: "h", x: 0, y: 1.0, yanchor: "bottom", font: { size: 11 } },
      transition: { duration: 350, easing: "cubic-in-out" },
    }, { displayModeBar: false, responsive: true });

    const [P, A, W] = d.metrics[step.m][state.level];
    $("cp-day-stats").innerHTML = `This day: <b>${nIn}/${x.length}</b> hours covered (red points are missed), mean width <b>${width.toFixed(3)}</b>.`;
    let cmp = "";
    if (prev) {
      const [, , pW] = d.metrics[prev.m][state.level];
      const ch = (W - pW) / pW;
      cmp = `<div class="l">${ch <= 0 ? "▼" : "▲"} ${Math.abs(100 * ch).toFixed(0)}% vs. ${prev.name}</div>`;
    }
    $("cp-stats").innerHTML = `
      <div class="cp-stat"><div class="v">${pct(P)}</div><div class="l">coverage (PICP)<br>target ${target}%</div></div>
      <div class="cp-stat"><div class="v">${A.toFixed(3)}</div><div class="l">average interval<br>width (AIW)</div></div>
      <div class="cp-stat"><div class="v">${W.toFixed(3)}</div><div class="l">Winkler score<br>(lower is better)</div>${cmp}</div>`;
    $("cp-stats-title").textContent = `${step.name} in ${d.iso}, whole test period (July–December), as in Table 1:`;
  }

  $("cp-day").oninput = (e) => { stop(); state.day = +e.target.value; render(); };
  $("cp-prev").onclick = () => { stop(); state.day = Math.max(0, state.day - 1); render(); };
  $("cp-next").onclick = () => { stop(); state.day = +$("cp-day").max > state.day ? state.day + 1 : state.day; render(); };
  $("cp-nrel").onchange = (e) => { state.nrel = e.target.checked; render(); };
  $("cp-play").onclick = play;
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  render();
})();
