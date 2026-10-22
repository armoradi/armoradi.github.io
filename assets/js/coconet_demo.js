// Interactive CoCoNet demo: choose a synthetic geometry and a method, replay its training (the 3-D view can be rotated
// at any time), then move alpha and watch the split-conformal threshold and the prediction region change.
// Data: assets/json/coconet_demo/<shape>.json (precomputed from the paper's runs).
(function () {
  const root = document.getElementById("cc-demo");
  if (!root) return;
  const base = root.dataset.base;
  const SHAPES = [["ellipse", "Ellipse"], ["rectangle", "Rectangle"], ["triangle", "Triangle"], ["trapezoid", "Trapezoid"]];
  const METHODS = [
    ["ICNN", "CoCoNet<sub>ICNN</sub>"],
    ["SplineL1", "CoCoNet<sub>Spline-ℓ₁</sub>"],
    ["Spline", "CoCoNet<sub>Spline-ℓ∞</sub>"],
    ["MVCS", "MVCS"],
    ["GlobEll", "G-Ellip."],
  ];
  const PLAIN = { ICNN: "CoCoNet ICNN", SplineL1: "CoCoNet Spline-ℓ₁", Spline: "CoCoNet Spline-ℓ∞", MVCS: "MVCS", GlobEll: "G-Ellip." };
  const C_IN = "#3b6fd4", C_OUT = "#d1495b", C_PT = "#9aa3ad", C_TRUE = "#b8860b";
  const PLAY_MS = 4500;                       // a training replay lasts about this long, whatever its frame count
  const cache = {};
  const state = { shape: "triangle", method: "ICNN", alpha: 0.1, phase: "idle", frame: 0, all: false };
  let timer = null;

  const $ = (id) => root.querySelector("#" + id);
  const fmt = (v, d = 3) => Number(v).toFixed(d);

  // ---------------------------------------------------------------- data
  function decode(g, n) {                     // uint16 over the grid's own range [0, g.max]: the full, uncapped score
    const bin = atob(g.z), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    const dv = new DataView(u.buffer), out = [];
    for (let r = 0; r < n; r++) {
      const row = new Array(n);
      for (let c = 0; c < n; c++) row[c] = (dv.getUint16(2 * (r * n + c), true) / 65535) * g.max;
      out.push(row);
    }
    return out;
  }

  async function load(shape) {
    if (!cache[shape]) {
      cache[shape] = fetch(base + shape + ".json").then((r) => r.json()).then((d) => {
        const n = d.x.length, nt = d.xt.length;
        for (const m of Object.values(d.methods)) {
          m.grid = decode(m.Z, n);
          if (m.train) m.train.grids = m.train.Z.map((z) => decode(z, nt));
          m.zmax = Math.max(m.Z.max, ...(m.train ? m.train.Z.map((z) => z.max) : []));   // one z-range per method
        }
        return d;
      });
    }
    return cache[shape];
  }

  // ---------------------------------------------------------------- controls
  function segmented(id, items, key) {
    const box = $(id);
    box.innerHTML = "";
    items.forEach(([k, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cc-seg" + (state[key] === k ? " on" : "");
      b.innerHTML = label;
      b.onclick = () => { if (state[key] !== k) { state[key] = k; segmented(id, items, key); reset(); } };
      box.appendChild(b);
    });
  }

  async function setPhase(p) {
    state.phase = p;
    const d = await load(state.shape), trained = !!d.methods[state.method].train;
    root.querySelectorAll(".cc-step").forEach((s, i) => {
      s.classList.toggle("on", p === "done" ? i >= 1 : i === 0);
      s.classList.toggle("past", p === "done" && i === 0);
    });
    $("cc-alpha").disabled = p !== "done";
    $("cc-calib").classList.toggle("off", p !== "done");
    $("cc-train").textContent = p === "train" ? "Training…" : "▶ Train";
    $("cc-train").disabled = p === "train";
    $("cc-reset").disabled = p === "idle";
  }

  function reset() {
    clearInterval(timer);
    state.frame = 0;
    setPhase("idle").then(draw);
  }

  async function train() {
    const d = await load(state.shape), tr = d.methods[state.method].train;
    clearInterval(timer);
    state.frame = 0;
    if (!tr) { await setPhase("done"); draw(); return; }          // G-Ellip.: closed form, no epochs to replay
    await setPhase("train");
    draw();
    timer = setInterval(async () => {
      if (state.frame >= tr.grids.length - 1) { clearInterval(timer); await setPhase("done"); draw(); return; }
      state.frame += 1;
      draw();
    }, Math.min(400, Math.max(70, PLAY_MS / tr.grids.length)));
  }

  // ---------------------------------------------------------------- drawing
  function colors() {
    const cs = getComputedStyle(document.body);
    return { text: cs.color || "#333", line: "rgba(128,128,128,0.35)" };
  }

  function polyArea(p) {
    let a = 0;
    for (let i = 0; i < p.length; i++) { const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length]; a += x1 * y2 - x2 * y1; }
    return Math.abs(a) / 2;
  }

  function tint(hex, w) {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return `rgb(${c.map((v) => Math.round(255 - w * (255 - v))).join(",")})`;
  }

  const level = (x, Z, tau, color, width, dash, name, legend) => ({
    type: "contour", x, y: x, z: Z, showscale: false, hoverinfo: "skip", name, showlegend: legend,
    contours: { coloring: "none", start: tau, end: tau + 1e-4, size: 1e-3 }, line: { color, width, dash },
  });

  async function draw() {
    const d = await load(state.shape), m = d.methods[state.method], t = colors();
    const tr = m.train, training = state.phase !== "done";
    const k = tr ? Math.min(state.frame, tr.grids.length - 1) : 0;
    const useTrain = training && tr;
    const x = useTrain ? d.xt : d.x, Z = useTrain ? tr.grids[k] : m.grid;
    const ia = d.alphas.findIndex((a) => Math.abs(a - state.alpha) < 1e-9);
    const tau = training ? 1 : m.tau[ia];
    const truth = d.oracle[(training ? 0.1 : state.alpha).toFixed(2)];

    $("cc-alpha-val").textContent = fmt(state.alpha, 2);
    $("cc-target").textContent = Math.round(100 * (1 - state.alpha)) + "%";
    const trueA = fmt(polyArea(truth), 2);
    if (state.phase === "idle") {
      $("cc-status").innerHTML = `Press <b>▶ Train</b> to train ${PLAIN[state.method]}` +
        (tr ? " and watch its score being learned (shown at the 90% level)." : " (its ellipsoid is fitted in one step).");
    } else if (state.phase === "train") {
      $("cc-status").innerHTML = `epoch <b>${tr.epochs[k]}</b> / ${tr.epochs[tr.epochs.length - 1]} &nbsp;·&nbsp; ` +
        `90% region area <b>${fmt(tr.area[k], 2)}</b> &nbsp;(true ${trueA})`;
    } else {
      $("cc-status").innerHTML = `τ̂<sub>α</sub> = <b>${fmt(tau)}</b> &nbsp;·&nbsp; coverage <b>${fmt(100 * m.cov[ia], 1)}%</b>` +
        ` &nbsp;·&nbsp; area <b>${fmt(m.area[ia], 2)}</b> &nbsp;(true ${trueA})`;
    }

    // calibration residuals: grey until calibrated, then split by the region
    const pin = { x: [], y: [] }, pout = { x: [], y: [] };
    d.pts.forEach(([a, b], i) => { const g = training || m.h[i] <= tau ? pin : pout; g.x.push(a); g.y.push(b); });
    const cIn = training ? C_PT : C_IN;

    // 3-D: the full score surface (no cap), its level set projected on the floor, the threshold plane once calibrated
    const zmax = m.zmax;
    const s3 = [
      { type: "surface", x, y: x, z: Z, cmin: 0, cmax: zmax, showscale: false, opacity: 0.95, hoverinfo: "skip",
        colorscale: [[0, "#ffffff"], [0.5, tint(m.color, 0.25)], [1, tint(m.color, 0.55)]],
        lighting: { ambient: 0.75, diffuse: 0.5, specular: 0.05 },
        contours: { z: { show: true, start: tau, end: tau + 1e-4, size: 1e-3, color: m.color, width: 5, project: { z: true } },
                    x: { highlight: false }, y: { highlight: false } } },
      { type: "scatter3d", mode: "markers", x: pin.x, y: pin.y, z: pin.x.map(() => 0), hoverinfo: "skip",
        marker: { size: 1.6, color: cIn, opacity: 0.8 } },
      { type: "scatter3d", mode: "markers", x: pout.x, y: pout.y, z: pout.x.map(() => 0), hoverinfo: "skip",
        marker: { size: 1.6, color: C_OUT, opacity: 0.8 } },
    ];
    if (!training) {
      s3.push({ type: "surface", x, y: x, z: x.map(() => x.map(() => tau)), showscale: false, opacity: 0.22, hoverinfo: "skip",
                colorscale: [[0, "#e0a526"], [1, "#e0a526"]] });
    }
    const ax = (title) => ({ title: { text: title, font: { size: 13, color: t.text } }, showgrid: false, zeroline: false,
                             showticklabels: false, showbackground: false, showspikes: false, linecolor: t.line, showline: true });
    Plotly.react($("cc-3d"), s3, {
      uirevision: state.shape,                   // keep the user's rotation across frames, methods and alpha
      margin: { l: 0, r: 0, t: 0, b: 0 }, paper_bgcolor: "rgba(0,0,0,0)", showlegend: false,
      scene: { uirevision: state.shape, xaxis: ax("r₁"), yaxis: ax("r₂"), zaxis: Object.assign(ax("score"), { range: [0, zmax] }),
               camera: { eye: { x: 1.45, y: -1.45, z: 0.85 } }, aspectmode: "manual", aspectratio: { x: 1, y: 1, z: 0.65 },
               dragmode: "turntable" },
    }, { displayModeBar: false, responsive: true, scrollZoom: false });

    // 2-D: the prediction region, the true region and, optionally, every other method at the same alpha
    const inSet = Z.map((r) => r.map((v) => (v <= tau ? 1 : null)));
    const s2 = [
      { type: "heatmap", x, y: x, z: inSet, showscale: false, hoverinfo: "skip", opacity: 0.16, colorscale: [[0, m.color], [1, m.color]] },
      { type: "scatter", mode: "markers", x: pin.x, y: pin.y, hoverinfo: "skip", showlegend: !training, name: "covered",
        marker: { size: 3.5, color: cIn, opacity: training ? 0.5 : 0.65 } },
      { type: "scatter", mode: "markers", x: pout.x, y: pout.y, hoverinfo: "skip", showlegend: !training, name: "not covered",
        marker: { size: 3.5, color: C_OUT, opacity: 0.75 } },
      level(x, Z, tau, m.color, 3, "solid", PLAIN[state.method], true),
    ];
    if (!training && state.all) {
      METHODS.forEach(([key]) => {
        const b = d.methods[key];
        if (!b || key === state.method) return;
        s2.push(level(d.x, b.grid, b.tau[ia], b.color, 1.6, "dot", PLAIN[key], true));
      });
    }
    const tx = truth.map((p) => p[0]).concat([truth[0][0]]), ty = truth.map((p) => p[1]).concat([truth[0][1]]);
    s2.push({ type: "scatter", mode: "lines", x: tx, y: ty, name: "true region", hoverinfo: "skip",
              line: { color: C_TRUE, width: 2, dash: "dash" } });
    const ax2 = { showgrid: false, zeroline: true, zerolinecolor: t.line, showticklabels: false, ticks: "",
                  range: [d.x[0], d.x[d.x.length - 1]], showline: false, constrain: "domain", fixedrange: true };
    Plotly.react($("cc-set"), s2, {
      margin: { l: 10, r: 10, t: 10, b: 10 }, paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
      xaxis: Object.assign({}, ax2), yaxis: Object.assign({}, ax2, { scaleanchor: "x", scaleratio: 1 }),
      legend: { orientation: "h", x: 0.5, xanchor: "center", y: -0.02, yanchor: "top", font: { size: 11, color: t.text } },
    }, { displayModeBar: false, responsive: true });
  }

  // ---------------------------------------------------------------- wiring
  segmented("cc-shapes", SHAPES, "shape");
  segmented("cc-methods", METHODS, "method");
  $("cc-train").onclick = train;
  $("cc-reset").onclick = () => {
    state.alpha = 0.1; $("cc-alpha").value = "0.10";
    state.all = false; $("cc-all").checked = false;
    reset();
  };
  $("cc-alpha").oninput = (e) => { state.alpha = Math.round(parseFloat(e.target.value) * 100) / 100; draw(); };
  $("cc-all").onchange = (e) => { state.all = e.target.checked; draw(); };
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  reset();
})();
