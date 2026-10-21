// Interactive CoCoNet demo: pick a synthetic geometry and a method, move alpha, and watch the split-conformal
// threshold and the prediction region change. Data: assets/json/coconet_demo/<shape>.json (precomputed scores).
(function () {
  const root = document.getElementById("cc-demo");
  if (!root) return;
  const base = root.dataset.base;
  const SHAPES = [["ellipse", "Ellipsoid"], ["rectangle", "Rectangle"], ["triangle", "Triangle"], ["trapezoid", "Trapezoid"]];
  const METHODS = [
    ["ICNN", "CoCoNet<sub>ICNN</sub>"],
    ["SplineL1", "CoCoNet<sub>Spline-ℓ₁</sub>"],
    ["Spline", "CoCoNet<sub>Spline-ℓ∞</sub>"],
    ["MVCS", "MVCS"],
    ["LocEll", "L-Ellip."],
  ];
  const C_IN = "#2f6fdd", C_OUT = "#d1495b", C_TRUE = "#b8860b";
  const cache = {};
  const state = { shape: "triangle", method: "ICNN", alpha: 0.1 };

  const el = (id) => root.querySelector("#" + id);
  const fmt = (v, d = 3) => Number(v).toFixed(d);

  function buttons(id, items, key) {
    const box = el(id);
    box.innerHTML = "";
    items.forEach(([k, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cc-btn" + (state[key] === k ? " active" : "");
      b.innerHTML = label;
      b.onclick = () => { state[key] = k; buttons(id, items, key); draw(); };
      box.appendChild(b);
    });
  }

  async function load(shape) {
    if (!cache[shape]) cache[shape] = fetch(base + shape + ".json").then((r) => r.json());
    return cache[shape];
  }

  function polyArea(p) {
    let a = 0;
    for (let i = 0; i < p.length; i++) {
      const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length];
      a += x1 * y2 - x2 * y1;
    }
    return Math.abs(a) / 2;
  }

  function theme() {
    const cs = getComputedStyle(document.body);
    return { text: cs.color || "#333", grid: "rgba(128,128,128,0.25)" };
  }

  async function draw() {
    const d = await load(state.shape);
    const m = d.methods[state.method];
    if (!m) return;
    const i = d.alphas.findIndex((a) => Math.abs(a - state.alpha) < 1e-9);
    const tau = m.tau[i], cov = m.cov[i], area = m.area[i];
    const truth = d.oracle[state.alpha.toFixed(2)];
    const t = theme();

    el("cc-alpha-val").textContent = fmt(state.alpha, 2);
    el("cc-target").textContent = Math.round(100 * (1 - state.alpha)) + "%";
    el("cc-stats").innerHTML =
      `threshold τ<sub>α</sub> = <b>${fmt(tau)}</b> &nbsp;·&nbsp; calibration coverage <b>${fmt(100 * cov, 1)}%</b>` +
      ` &nbsp;·&nbsp; region area <b>${fmt(area, 2)}</b> &nbsp;(true region ${fmt(polyArea(truth), 2)})`;

    const inside = { x: [], y: [] }, outside = { x: [], y: [] };
    d.pts.forEach(([x, y], k) => { (m.h[k] <= tau ? inside : outside).x.push(x); (m.h[k] <= tau ? inside : outside).y.push(y); });
    const zmax = Math.max(2.5, 1.6 * tau);
    const Zs = m.Z.map((row) => row.map((v) => Math.min(v, zmax)));
    const inSet = m.Z.map((row) => row.map((v) => (v <= tau ? 1 : null)));

    // 3-D: the score surface, the threshold plane and the region on the floor
    const plane = d.y.map(() => d.x.map(() => tau));
    const surf = [
      { type: "surface", x: d.x, y: d.y, z: Zs, cmin: 0, cmax: zmax, showscale: false, opacity: 0.9,
        colorscale: [[0, "#fbfbfd"], [0.6, "#c9d9ea"], [1, "#7fa3c8"]],
        contours: { z: { show: true, start: tau, end: tau + 1e-4, size: 1e-3, color: m.color, width: 6, project: { z: true } } },
        hovertemplate: "r₁ %{x:.2f}<br>r₂ %{y:.2f}<br>score %{z:.2f}<extra></extra>" },
      { type: "surface", x: d.x, y: d.y, z: plane, showscale: false, opacity: 0.35, hoverinfo: "skip",
        colorscale: [[0, "#f2b134"], [1, "#f2b134"]] },
      { type: "scatter3d", mode: "markers", x: inside.x, y: inside.y, z: inside.x.map(() => 0), hoverinfo: "skip",
        marker: { size: 2.2, color: C_IN } },
      { type: "scatter3d", mode: "markers", x: outside.x, y: outside.y, z: outside.x.map(() => 0), hoverinfo: "skip",
        marker: { size: 2.2, color: C_OUT } },
    ];
    const ax3 = (title) => ({ title: { text: title }, color: t.text, gridcolor: t.grid, zerolinecolor: t.grid, backgroundcolor: "rgba(0,0,0,0)" });
    Plotly.react(el("cc-3d"), surf, {
      margin: { l: 0, r: 0, t: 30, b: 0 }, paper_bgcolor: "rgba(0,0,0,0)", showlegend: false,
      title: { text: "Score S(x, r) and threshold τ<sub>α</sub>", font: { size: 14, color: t.text } },
      scene: { xaxis: ax3("r₁"), yaxis: ax3("r₂"), zaxis: Object.assign(ax3("score"), { range: [0, zmax] }),
               camera: { eye: { x: 1.5, y: -1.5, z: 0.9 } }, aspectmode: "manual", aspectratio: { x: 1, y: 1, z: 0.7 } },
    }, { displayModeBar: false, responsive: true });

    // 2-D: the prediction region {r : S(x, r) <= tau}, the true region and the calibration residuals
    const tx = truth.map((p) => p[0]).concat([truth[0][0]]), ty = truth.map((p) => p[1]).concat([truth[0][1]]);
    const set = [
      { type: "heatmap", x: d.x, y: d.y, z: inSet, showscale: false, hoverinfo: "skip", opacity: 0.18,
        colorscale: [[0, m.color], [1, m.color]] },
      { type: "contour", x: d.x, y: d.y, z: m.Z, showscale: false, hoverinfo: "skip", name: "region", showlegend: true,
        contours: { coloring: "none", start: tau, end: tau + 1e-4, size: 1e-3 }, line: { color: m.color, width: 3 } },
      { type: "scatter", mode: "markers", x: inside.x, y: inside.y, name: "inside", hoverinfo: "skip",
        marker: { size: 4, color: C_IN, opacity: 0.7 } },
      { type: "scatter", mode: "markers", x: outside.x, y: outside.y, name: "outside", hoverinfo: "skip",
        marker: { size: 5, color: C_OUT, symbol: "x-thin", line: { width: 1.2, color: C_OUT } } },
      { type: "scatter", mode: "lines", x: tx, y: ty, name: "true region", hoverinfo: "skip",
        line: { color: C_TRUE, width: 2.5, dash: "dash" } },
    ];
    const ax2 = (title) => ({ title: { text: title }, color: t.text, gridcolor: t.grid, zerolinecolor: t.grid,
                              range: [d.x[0], d.x[d.x.length - 1]] });
    Plotly.react(el("cc-set"), set, {
      margin: { l: 45, r: 10, t: 30, b: 40 }, paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
      title: { text: "Prediction region at x", font: { size: 14, color: t.text } },
      xaxis: Object.assign(ax2("r₁"), { constrain: "domain" }), yaxis: Object.assign(ax2("r₂"), { scaleanchor: "x", scaleratio: 1, constrain: "domain" }),
      legend: { orientation: "h", y: -0.18, font: { color: t.text } },
    }, { displayModeBar: false, responsive: true });
  }

  buttons("cc-shapes", SHAPES, "shape");
  buttons("cc-methods", METHODS, "method");
  const slider = el("cc-alpha");
  slider.oninput = () => { state.alpha = Math.round(parseFloat(slider.value) * 100) / 100; draw(); };
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  draw();
})();
