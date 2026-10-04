// Kit IoT ESP32-C3 Mini — laboratório virtual 3D / WebXR (Babylon.js)
// Modelo procedural em milímetros (raiz "kit" com escala 0.001 → metros).
// Eixos: X = comprimento (120), Y = altura (40), Z = largura (95). Frente (LCD) em -Z.

// ---------------------------------------------------------------- ícones (SVG 24×24, traço)
const ICONS = {
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  gyro: '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="3.6" ry="9"/>',
  lcd: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><rect x="5.5" y="8" width="13" height="8" rx="1"/><path d="M8 11h4M8 13.5h7"/>',
  sonar: '<circle cx="7.5" cy="14" r="3.5"/><circle cx="16.5" cy="14" r="3.5"/><path d="M4 7.5a11 11 0 0 1 16 0M7 10a6.5 6.5 0 0 1 10 0"/>',
  knob: '<circle cx="12" cy="13" r="7"/><path d="M12 13V8.5M5.5 5A10 10 0 0 1 18.5 5"/><path d="M18.5 2.5V5H16"/>',
  servo: '<rect x="3" y="10" width="18" height="10" rx="2"/><circle cx="8" cy="10" r="3"/><path d="M8 10l9-5"/><circle cx="17.5" cy="4.8" r="1.2"/>',
  toggle: '<rect x="2.5" y="7" width="19" height="10" rx="5"/><circle cx="16.5" cy="12" r="3"/>',
  pcb: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h4v4M17 7v6h-4M7 17h3M14 17h3"/><circle cx="7" cy="7" r="1"/><circle cx="13" cy="13" r="1"/>',
  box: '<path d="M12 2.8l8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z"/><path d="M3.5 7.4L12 12l8.5-4.6M12 12v9.2"/>',
  reset: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4v4.5H8"/><circle cx="12" cy="12" r="2"/>',
  lid: '<path d="M4.5 20h15v-8h-15z"/><path d="M3 8.5l17-4"/><path d="M10.5 6.7l-.4-1.9 3.9-.9.4 1.9"/>',
  explode: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
  gpio: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7.5h.01M8 12h.01M8 16.5h.01M11.5 7.5h4.5M11.5 12h4.5M11.5 16.5h4.5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.5M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
  warn: '<path d="M12 3.5l9 16H3z"/><path d="M12 10v4.5M12 17.2h.01"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9.5"/>',
  vr: '<path d="M3 9a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 9v5.5a2.5 2.5 0 0 1-2.5 2.5H15l-2-2.5h-2L9 17H5.5A2.5 2.5 0 0 1 3 14.5z"/><circle cx="8" cy="11.8" r="1.5"/><circle cx="16" cy="11.8" r="1.5"/>',
  ar: '<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><path d="M12 7l4.5 2.5v5L12 17l-4.5-2.5v-5z"/><path d="M7.5 9.5L12 12l4.5-2.5M12 12v5"/>',
  left: '<path d="M15 18l-6-6 6-6"/>',
  right: '<path d="M9 18l6-6-6-6"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
  rotate: '<path d="M20 12a8 8 0 1 1-2.6-5.9L20 8.5"/><path d="M20 3.5v5h-5"/>',
  pinch: '<path d="M9 4H4v5M4 4l6 6M15 20h5v-5M20 20l-6-6"/>',
  move: '<path d="M12 3v18M3 12h18M12 3l-2.5 2.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5M3 12l2.5-2.5M3 12l2.5 2.5M21 12l-2.5-2.5M21 12l-2.5 2.5"/>',
  tap: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5" opacity=".45"/>',
  exit: '<path d="M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15M10 16l-4-4 4-4M6 12h10"/>',
};
function icon(name) {
  return `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}
document.querySelectorAll("[data-icon]").forEach((el) => el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon)));

// ---------------------------------------------------------------- avisos (toast)
let toastT;
function toast(msg, kind = "info", ms = 4500) {
  const t = document.getElementById("toast");
  t.innerHTML = icon(kind === "info" ? "info" : "warn") + "<span></span><button aria-label=\"Fechar aviso\">" + icon("x") + "</button>";
  t.querySelector("span").textContent = msg;
  t.querySelector("button").onclick = () => (t.className = "");
  t.className = "show " + kind;
  clearTimeout(toastT);
  if (ms) toastT = setTimeout(() => (t.className = ""), ms);
}
window.addEventListener("error", (e) => toast("Erro: " + e.message, "err", 0));
window.addEventListener("unhandledrejection", (e) => console.error("[promise]", e.reason));

(async () => {
 try {
  if (!window.BABYLON) throw new Error("não foi possível carregar o Babylon.js (verifique a conexão)");
  const canvas = document.getElementById("c");
  const isCoarse = matchMedia("(pointer: coarse)").matches;
  const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false }, true);
  // limita a densidade de pixels (celulares com DPR 3 ficam pesados demais)
  engine.setHardwareScalingLevel(1 / Math.min(window.devicePixelRatio || 1, 2));
  const scene = new BABYLON.Scene(engine);
  const BG = new BABYLON.Color4(0.07, 0.08, 0.1, 1);
  scene.clearColor = BG.clone();

  const V3 = BABYLON.Vector3;
  const MM = 0.001;
  const HOME = { alpha: -Math.PI / 2 - 0.55, beta: 0.95, radius: 0.27, target: new V3(0, 0.018, 0) };

  // ---------------------------------------------------------------- câmera e luzes
  const camera = new BABYLON.ArcRotateCamera("cam", HOME.alpha, HOME.beta, HOME.radius, HOME.target.clone(), scene);
  camera.attachControl(canvas, true);
  camera.minZ = 0.004;
  camera.maxZ = 60;
  camera.lowerRadiusLimit = 0.03;
  camera.upperRadiusLimit = 1.2;
  camera.upperBetaLimit = Math.PI / 2 + 0.25;
  camera.wheelDeltaPercentage = 0.015;
  camera.pinchDeltaPercentage = 0.004;
  camera.inertia = 0.85;
  camera.panningInertia = 0.85;
  camera.panningDistanceLimit = 0.22;       // não deixa o modelo "sumir" ao mover a vista
  camera.inputs.attached.pointers.useNaturalPinchZoom = true;
  if (isCoarse) camera.angularSensibilityX = camera.angularSensibilityY = 520;

  const hemi = new BABYLON.HemisphericLight("hemi", new V3(0.2, 1, -0.3), scene);
  hemi.intensity = 0.72;
  hemi.groundColor = new BABYLON.Color3(0.25, 0.22, 0.24);
  const sun = new BABYLON.DirectionalLight("sun", new V3(-0.45, -1, 0.55), scene);
  sun.position = new V3(0.3, 0.6, -0.3);
  sun.intensity = 0.75;

  const shadows = new BABYLON.ShadowGenerator(isCoarse ? 1024 : 2048, sun);
  shadows.usePercentageCloserFiltering = true;
  shadows.bias = 0.004;
  shadows.normalBias = 0.01;

  const ground = BABYLON.MeshBuilder.CreateDisc("ground", { radius: 3, tessellation: 64 }, scene);
  ground.rotation.x = Math.PI / 2;
  const gMat = new BABYLON.StandardMaterial("gMat", scene);
  gMat.diffuseColor = new BABYLON.Color3(0.16, 0.18, 0.22);
  gMat.specularColor = BABYLON.Color3.Black();
  ground.material = gMat;
  ground.receiveShadows = true;
  ground.isPickable = false;

  // Pedestal (só em VR, para o kit "flutuar" sobre uma mesa)
  const pedestal = new BABYLON.TransformNode("pedestal", scene);
  {
    const top = BABYLON.MeshBuilder.CreateCylinder("pTop", { diameter: 0.7, height: 0.03, tessellation: 48 }, scene);
    const col = BABYLON.MeshBuilder.CreateCylinder("pCol", { diameter: 0.12, height: 1, tessellation: 24 }, scene);
    const m = new BABYLON.StandardMaterial("pMat", scene);
    m.diffuseColor = new BABYLON.Color3(0.24, 0.26, 0.3);
    m.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    top.material = col.material = m;
    top.parent = col.parent = pedestal;
    top.position.y = -0.015;
    col.position.y = -0.53;
    top.receiveShadows = true;
    top.isPickable = col.isPickable = false;
    pedestal.setEnabled(false);
  }

  engine.runRenderLoop(() => scene.render());
  new ResizeObserver(() => engine.resize()).observe(canvas);

  // ---------------------------------------------------------------- materiais
  const mats = {};
  function mat(name, hex, o = {}) {
    const m = new BABYLON.StandardMaterial(name, scene);
    m.diffuseColor = BABYLON.Color3.FromHexString(hex);
    m.specularColor = new BABYLON.Color3(o.spec ?? 0.12, o.spec ?? 0.12, o.spec ?? 0.12);
    m.specularPower = o.power ?? 32;
    if (o.emissive) m.emissiveColor = BABYLON.Color3.FromHexString(o.emissive);
    if (o.alpha !== undefined) m.alpha = o.alpha;
    mats[name] = m;
    return m;
  }
  const M = {
    pla: mat("pla", "#c8102e", { spec: 0.18, power: 24 }),
    plaDark: mat("plaDark", "#8f0b21", { spec: 0.05 }),
    brass: mat("brass", "#c9a24a", { spec: 0.9, power: 64 }),
    dark: mat("dark", "#0d0d0f", { spec: 0.05 }),
    blackPl: mat("blackPl", "#18181b", { spec: 0.25, power: 48 }),
    chip: mat("chip", "#111114", { spec: 0.45, power: 80 }),
    metal: mat("metal", "#c9ccd2", { spec: 0.9, power: 96 }),
    metalDk: mat("metalDk", "#7b8089", { spec: 0.7, power: 64 }),
    gold: mat("gold", "#d6b04c", { spec: 0.9, power: 80 }),
    white: mat("white", "#f1f1ee", { spec: 0.15 }),
    pcbBrown: mat("pcbBrown", "#8a5a26", { spec: 0.25 }),
    pcbGreen: mat("pcbGreen", "#1d7a3c", { spec: 0.3, power: 48 }),
    pcbBlue: mat("pcbBlue", "#1e4fb5", { spec: 0.3, power: 48 }),
    pcbBlack: mat("pcbBlack", "#1a1b1e", { spec: 0.3, power: 48 }),
    tant: mat("tant", "#d8a23a", { spec: 0.3 }),
    redSmd: mat("redSmd", "#d32f2f", { spec: 0.3 }),
    servo: mat("servo", "#2236c9", { spec: 0.5, power: 64, alpha: 0.9 }),
    blueSw: mat("blueSw", "#2f7fd6", { spec: 0.3 }),
    trim: mat("trim", "#2563eb", { spec: 0.3 }),
    mesh: mat("mesh", "#2a2b2e", { spec: 0.05 }),
    acrylic: mat("acrylic", "#dff2ff", { spec: 1, power: 160, alpha: 0.16 }),
    wBrown: mat("wBrown", "#6b3f1d"), wRed: mat("wRed", "#d62828"), wOrange: mat("wOrange", "#f08a24"),
    wBlue: mat("wBlue", "#2667d8"), wBlack: mat("wBlack", "#1b1b1b"), wWhite: mat("wWhite", "#e9e9e9"),
    wYellow: mat("wYellow", "#e7c21f"), cable: mat("cable", "#141414", { spec: 0.3 }),
  };
  M.acrylic.backFaceCulling = false;

  // ---------------------------------------------------------------- helpers de geometria
  function B(p, name, w, h, d, x, y, z, m) {
    const b = BABYLON.MeshBuilder.CreateBox(name, { width: w, height: h, depth: d }, scene);
    b.parent = p; b.position.set(x, y, z); b.material = m;
    return b;
  }
  function C(p, name, dia, h, x, y, z, m, axis = "y", o = {}) {
    const c = BABYLON.MeshBuilder.CreateCylinder(name, {
      diameter: dia, height: h, tessellation: o.tess || 28,
      diameterTop: o.top, diameterBottom: o.bottom,
    }, scene);
    c.parent = p; c.position.set(x, y, z); c.material = m;
    if (axis === "x") c.rotation.z = Math.PI / 2;
    if (axis === "z") c.rotation.x = Math.PI / 2;
    return c;
  }
  function node(name, parent, x = 0, y = 0, z = 0) {
    const n = new BABYLON.TransformNode(name, scene);
    n.parent = parent; n.position.set(x, y, z);
    return n;
  }
  function textPlane(parent, name, w, h, texW, texH, draw, o = {}) {
    const tex = new BABYLON.DynamicTexture(name + "Tex", { width: texW, height: texH }, scene, true);
    tex.hasAlpha = true;
    const ctx = tex.getContext();
    ctx.clearRect(0, 0, texW, texH);
    draw(ctx, texW, texH);
    tex.update();
    const m = new BABYLON.StandardMaterial(name + "Mat", scene);
    m.diffuseTexture = tex;
    m.useAlphaFromDiffuseTexture = true;
    m.specularColor = BABYLON.Color3.Black();
    if (o.emissive) m.emissiveColor = BABYLON.Color3.FromHexString(o.emissive);
    m.disableLighting = !!o.unlit;
    const pl = BABYLON.MeshBuilder.CreatePlane(name, { width: w, height: h }, scene);
    pl.parent = parent; pl.material = m; pl.isPickable = false;
    return { mesh: pl, tex, ctx };
  }
  // Texto em baixo-relevo: realce claro deslocado + sombra escura. lines = [[texto, px, estilo]]
  function engraved(ctx, lines, W, H, family, lh) {
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const y0 = H / 2 - ((lines.length - 1) * lh) / 2;
    lines.forEach(([t, px, style = "900"], i) => {
      ctx.font = `${style} ${px}px ${family}`;
      const w = ctx.measureText(t).width;
      if (w > W * 0.94) ctx.font = `${style} ${Math.floor((px * W * 0.94) / w)}px ${family}`;
      const y = y0 + i * lh;
      ctx.fillStyle = "rgba(255,150,160,0.35)"; ctx.fillText(t, W / 2 + 3, y + 3);
      ctx.fillStyle = "rgba(70,0,10,0.75)"; ctx.fillText(t, W / 2, y);
    });
  }
  function pinRow(p, n, x0, y, z0, dx, dz, m, h = 1.6, dia = 0.9) {
    for (let i = 0; i < n; i++) C(p, "pin", dia, h, x0 + dx * i, y, z0 + dz * i, m, "y", { tess: 8 });
  }
  function jst(p, x, y, z, rotY = 0, n = 4) {
    const j = node("jst", p, x, y, z);
    j.rotation.y = rotY;
    const w = 2.5 * (n - 1) + 4.9;
    B(j, "jstBody", w, 7, 5.8, 0, 3.5, 0, M.white);
    B(j, "jstSlot", w - 1.6, 0.4, 3.2, 0, 7.05, 0.4, M.dark);
    return j;
  }
  function wire(points, colors, r = 0.45, spread = 1.0, parent) {
    const pts = BABYLON.Curve3.CreateCatmullRomSpline(points.map((p) => new V3(...p)), 12, false).getPoints();
    const out = [];
    colors.forEach((m, i) => {
      const off = (i - (colors.length - 1) / 2) * spread;
      const path = pts.map((p, k) => {
        const a = pts[Math.max(0, k - 1)], b = pts[Math.min(pts.length - 1, k + 1)];
        const dir = b.subtract(a).normalize();
        let side = V3.Cross(dir, V3.Up());
        if (side.lengthSquared() < 1e-4) side = new V3(1, 0, 0);
        side.normalize();
        return p.add(side.scale(off));
      });
      const t = BABYLON.MeshBuilder.CreateTube("wire", { path, radius: r, tessellation: 8, cap: BABYLON.Mesh.CAP_ALL }, scene);
      t.material = m; t.parent = parent; t.isPickable = false;
      out.push(t);
    });
    return out;
  }

  // ---------------------------------------------------------------- raiz do kit
  const kit = new BABYLON.TransformNode("kit", scene);
  kit.scaling.setAll(MM);
  const comps = {};
  function comp(id, x, y, z) {
    const n = node(id, kit, x, y, z);
    comps[id] = { id, node: n, data: COMPONENTS[id] };
    return n;
  }

  // ================================================================ GABINETE
  const lidY = 40;
  {
    const g = comp("gabinete", 0, 0, 0);
    const T = 2.5;
    B(g, "floor", 120, 2, 95, 0, 1, 0, M.pla);
    B(g, "wallFront", 120, 40, T, 0, 20, -47.5 + T / 2, M.pla);
    B(g, "wallLeft", T, 40, 95 - 2 * T, -60 + T / 2, 20, 0, M.pla);
    B(g, "wallRight", T, 40, 95 - 2 * T, 60 - T / 2, 20, 0, M.pla);
    // parede traseira com recorte para o USB-C (x de -32 a -17, até y=22)
    const zb = 47.5 - T / 2;
    B(g, "wallBackL", 28, 40, T, -46, 20, zb, M.pla);
    B(g, "wallBackR", 77, 40, T, 21.5, 20, zb, M.pla);
    B(g, "wallBackN", 15, 22, T, -24.5, 11, zb, M.pla);
    // frisos da base
    B(g, "lip", 120.4, 0.5, 95.4, 0, 3.2, 0, M.plaDark);
    // pilares de canto com insertos de latão
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      B(g, "pillar", 7, 38, 7, sx * 54, 21, sz * 41.5, M.pla);
      C(g, "insert", 4.6, 0.6, sx * 54, 39.75, sz * 41.5, M.brass);
      C(g, "insHole", 2.6, 0.62, sx * 54, 39.8, sz * 41.5, M.dark);
    }
    // anéis escuros simulando os furos da lateral direita
    for (const z of [12.7 - 13, 12.7 + 13]) {
      const r = BABYLON.MeshBuilder.CreateTorus("hole", { diameter: 17, thickness: 1, tessellation: 40 }, scene);
      r.parent = g; r.position.set(60.05, 19, z); r.rotation.z = Math.PI / 2; r.material = M.dark;
    }
    // gravações nas paredes
    const front = textPlane(g, "txtFront", 104, 26, 1024, 256, (c, W, H) =>
      engraved(c, [["SÃO CARLOS", 100], ["KIT IoT ESP32 C3 MINI", 74]], W, H, "Arial", 112));
    front.mesh.position.set(0, 21, -47.56);
    const left = textPlane(g, "txtLeft", 86, 22, 1024, 262, (c, W, H) =>
      engraved(c, [["SENAI", 230, "italic 900"]], W, H, "'Arial Black', Arial", 0));
    left.mesh.position.set(-60.06, 20, 0);
    left.mesh.rotation.y = Math.PI / 2;
    const back = textPlane(g, "txtBack", 26, 30, 256, 296, (c, W, H) => {
      c.textAlign = "center"; c.textBaseline = "middle"; c.font = "900 54px Arial";
      for (const [t, y] of [["RUN", 50], ["PROG", 246]]) {
        c.fillStyle = "rgba(255,150,160,0.35)"; c.fillText(t, W / 2 + 2, y + 2);
        c.fillStyle = "rgba(70,0,10,0.75)"; c.fillText(t, W / 2, y);
      }
    });
    back.mesh.position.set(8, 20, 47.56);
    back.mesh.rotation.y = Math.PI;
  }

  // ================================================================ TAMPA (acrílico)
  const lid = node("lid", kit, 0, lidY, 0);
  let lidTextMat;
  {
    const a = B(lid, "acrylic", 120, 3, 95, 0, 1.5, 0, M.acrylic);
    a.isPickable = false;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const s = C(lid, "screw", 6, 1.6, sx * 54, 3.8, sz * 41.5, M.brass);
      const k1 = B(lid, "slot", 4.4, 0.4, 0.8, sx * 54, 4.5, sz * 41.5, M.metalDk);
      const k2 = B(lid, "slot", 0.8, 0.4, 4.4, sx * 54, 4.5, sz * 41.5, M.metalDk);
      s.isPickable = k1.isPickable = k2.isPickable = false;
    }
    // texto exatamente como gravado na tampa
    const lines = ["GPIO0-SCL (I2C)", "GPIO1-SDA (I2C)", "GPIO2-Não Usar", "GPIO3-Trigger(HC-SR04)",
      "GPIO4-Echo(HC-SR04)", "GPIO5-CLK (KY-040)", "GPIO6-DT (KY-040)", "GPIO7-Botão (KY-040)",
      "GPIO8-Não Usar", "GPIO9-Não Usar", "GPIO10-PWM (SG90)"];
    const t = textPlane(lid, "txtLid", 62, 46, 1024, 760, (c, W, H) => {
      c.textAlign = "left"; c.textBaseline = "middle"; c.font = "bold 66px 'Courier New', monospace";
      lines.forEach((l, i) => {
        const y = 40 + i * 68;
        c.fillStyle = "rgba(0,0,0,0.25)"; c.fillText(l, 6, y + 3);
        c.fillStyle = "rgba(255,255,255,0.93)"; c.fillText(l, 4, y);
      });
    }, { emissive: "#9a9a9a" });
    t.mesh.rotation.x = Math.PI / 2;
    t.mesh.position.set(21, 3.06, 16);
    lidTextMat = t.mesh.material;
  }

  // ================================================================ PLACA BASE
  const jstPos = {};
  {
    const p = comp("pcb", -23, 18, 20);
    const dt = new BABYLON.DynamicTexture("pcbTex", { width: 256, height: 256 }, scene, true);
    const c = dt.getContext();
    c.fillStyle = "#8a5a26"; c.fillRect(0, 0, 256, 256);
    c.strokeStyle = "#c8873a"; c.lineWidth = 5;
    for (let i = 0; i < 9; i++) { c.beginPath(); c.moveTo(20, 30 + i * 24); c.lineTo(236, 30 + i * 24 + (i % 3) * 6); c.stroke(); }
    c.fillStyle = "#e0a95a";
    for (let i = 0; i < 14; i++) for (let j = 0; j < 14; j++) { c.beginPath(); c.arc(12 + i * 18, 12 + j * 18, 3, 0, 7); c.fill(); }
    dt.update();
    const pm = new BABYLON.StandardMaterial("pcbMat", scene);
    pm.diffuseTexture = dt; pm.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    B(p, "pcbBoard", 40, 1.6, 40, 0, 0, 0, pm);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) C(p, "standoff", 5, 15.2, sx * 16.5, -8.4, sz * 16.5, M.pla);
    const js = { j1: [-15, 0.8, 13, Math.PI / 2], j2: [-15, 0.8, -12, Math.PI / 2], j3: [13, 0.8, 15, 0], j4: [15, 0.8, 0, Math.PI / 2] };
    for (const [k, [x, y, z, r]] of Object.entries(js)) {
      jst(p, x, y, z, r);
      jstPos[k] = [-23 + x, 18 + y + 7, 20 + z];
    }
    // jumper de fio rígido (como na foto)
    C(p, "jumper", 0.6, 22, 16.5, 1.4, -8, M.metal, "z");
  }

  // ================================================================ ESP32-C3 SUPER MINI
  {
    const e = comp("esp32", -24, 21.8, 28.6);
    B(e, "espBoard", 18, 1, 22.5, 0, 0, 0, M.pcbBlack);
    for (const sx of [-1, 1]) {
      B(e, "hdr", 2.5, 2.5, 20.4, sx * 7.6, -1.75, 0, M.blackPl);
      pinRow(e, 8, sx * 7.6, 0.9, -8.89, 0, 2.54, M.gold, 1.2, 0.9);
    }
    B(e, "usbc", 9, 3.2, 7.4, 0, 2.1, 8.6, M.metal);
    B(e, "usbcIn", 7, 1.2, 0.3, 0, 2.1, 12.35, M.dark);
    B(e, "c3", 5, 0.9, 5, 0, 0.95, -1, M.chip);
    B(e, "xtal", 3.2, 0.8, 2.5, -3.5, 0.9, -5, M.metal);
    for (const sx of [-1, 1]) {
      B(e, "btn", 3.6, 1.2, 2.6, sx * 3.8, 1.1, 4.4, M.metal);
      B(e, "btnCap", 1.6, 0.6, 1.2, sx * 3.8, 1.9, 4.4, M.blackPl);
    }
    B(e, "lbl", 3.2, 0.2, 1.6, 2.5, 0.6, -9.6, M.redSmd);
    B(e, "led", 1, 0.5, 0.6, 5.5, 0.75, 1.5, mat("ledBlue", "#3b82f6", { emissive: "#1d4ed8" }));
    B(e, "ant", 6, 0.8, 1.8, -2.5, 0.9, -9.2, M.tant);
  }

  // ================================================================ MPU-6050 (GY-521)
  let mpuAxes;
  {
    const m = comp("mpu", -23.6, 21.1, 5.6);
    B(m, "mpuBoard", 21, 1.6, 16, 0, 0, 0, M.pcbBlue);
    B(m, "mpuChip", 4, 0.9, 4, 0, 1.25, 0, M.chip);
    B(m, "reg", 3, 1.2, 1.6, -6.5, 1.4, 3, M.blackPl);
    B(m, "cap", 2, 1, 1.2, -6.5, 1.3, -1.5, M.tant);
    B(m, "cap2", 1.6, 0.8, 0.8, 5, 1.2, 3.5, M.tant);
    B(m, "led", 1.2, 0.6, 0.7, 6, 1.1, -3, M.redSmd);
    B(m, "hdr", 20.3, 2.5, 2.5, 0, -2.05, 6.6, M.blackPl);
    pinRow(m, 8, -8.89, 1.3, 6.6, 2.54, 0, M.gold, 1.2, 0.9);
    for (const sx of [-1, 1]) C(m, "hole", 3.2, 1.7, sx * 8.3, 0, -5.2, M.gold);
    // eixos X/Y/Z (mostrados quando selecionado)
    mpuAxes = node("mpuAxes", m, 0, 2, 0);
    const ax = [[new V3(14, 0, 0), "#ef4444"], [new V3(0, 0, 14), "#22c55e"], [new V3(0, 14, 0), "#3b82f6"]];
    for (const [v, col] of ax) {
      const t = BABYLON.MeshBuilder.CreateTube("axis", { path: [V3.Zero(), v], radius: 0.5 }, scene);
      const tip = BABYLON.MeshBuilder.CreateCylinder("tip", { diameterTop: 0, diameterBottom: 2.2, height: 3.5 }, scene);
      tip.position = v.clone();
      if (v.x) tip.rotation.z = -Math.PI / 2;
      if (v.z) tip.rotation.x = Math.PI / 2;
      const am = mat("ax" + col, col, { emissive: col });
      t.material = tip.material = am;
      t.parent = tip.parent = mpuAxes;
      t.isPickable = tip.isPickable = false;
    }
    mpuAxes.setEnabled(false);
  }

  // ================================================================ LCD 16x2 + módulo I²C
  let lcdTex, lcdCtx;
  {
    const l = comp("lcd", -15, 29, -22);
    B(l, "lcdPcb", 80, 1.6, 36, 0, 0, 0, M.pcbGreen);
    B(l, "bezel", 71.2, 7, 24.2, 0, 4.3, -1.5, M.blackPl);
    B(l, "bezelIn", 66, 0.4, 17, 0, 7.85, -1.5, M.dark);
    pinRow(l, 16, -33, 0.9, 15.5, 2.54, 0, M.gold, 1.8, 1.4);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      C(l, "lcdScrew", 4.6, 1.4, sx * 37.5, 1.5, sz * 15.5, M.metal);
      C(l, "lcdPost", 5.5, 26.2, sx * 37.5, -13.9, sz * 15.5, M.pla);
    }
    // módulo I²C (PCF8574) soldado atrás
    B(l, "i2cBoard", 42, 1.6, 19, 6, -4, 2, M.pcbBlack);
    B(l, "pcf", 10, 1.4, 7.5, 2, -5.4, 2, M.chip);
    B(l, "trim", 6.5, 4, 6.5, 20, -6.8, 4, M.trim);
    // tela com texto (DynamicTexture)
    lcdTex = new BABYLON.DynamicTexture("lcdTex", { width: 1024, height: 232 }, scene, true);
    lcdCtx = lcdTex.getContext();
    const sm = new BABYLON.StandardMaterial("lcdScreen", scene);
    sm.diffuseTexture = lcdTex;
    sm.emissiveTexture = lcdTex;
    sm.emissiveColor = new BABYLON.Color3(0.55, 0.55, 0.55);
    sm.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    const scr = BABYLON.MeshBuilder.CreatePlane("screen", { width: 64.5, height: 14.6 }, scene);
    scr.parent = l; scr.material = sm;
    scr.rotation.x = Math.PI / 2;
    scr.position.set(0, 8.08, -1.5);
  }
  let lcdLast = "";
  function drawLCD(l1, l2) {
    const key = l1 + "|" + l2;
    if (key === lcdLast) return;
    lcdLast = key;
    const c = lcdCtx, W = 1024, H = 232;
    c.fillStyle = "#9cc63a"; c.fillRect(0, 0, W, H);
    const cw = W / 16, ch = H / 2;
    c.fillStyle = "rgba(60,90,10,0.13)";
    for (let r = 0; r < 2; r++) for (let i = 0; i < 16; i++) c.fillRect(i * cw + 4, r * ch + 10, cw - 8, ch - 20);
    c.fillStyle = "#14240a"; c.font = "bold 88px 'Courier New', monospace"; c.textBaseline = "middle"; c.textAlign = "center";
    [l1, l2].forEach((t, r) => {
      const s = (t || "").padEnd(16).slice(0, 16);
      for (let i = 0; i < 16; i++) c.fillText(s[i], i * cw + cw / 2, r * ch + ch / 2 + 4);
    });
    lcdTex.update();
  }
  drawLCD("KIT IoT ESP32-C3", "Clique um sensor");

  // ================================================================ HC-SR04
  const usRings = [];
  {
    const h = comp("hcsr04", 45.5, 19, 12.7);
    B(h, "hcBoard", 1.6, 20, 45, 0, 0, 0, M.pcbBlue);
    for (const z of [-13, 13]) {
      C(h, "trans", 16, 14, 7.8, 0, z, M.metal, "x", { tess: 40 });
      C(h, "transFace", 13.4, 0.3, 14.85, 0, z, M.mesh, "x", { tess: 40 });
      const ring = BABYLON.MeshBuilder.CreateTorus("trRing", { diameter: 15, thickness: 1.1, tessellation: 40 }, scene);
      ring.parent = h; ring.position.set(14.8, 0, z); ring.rotation.z = Math.PI / 2; ring.material = M.metal;
    }
    B(h, "xtal", 3, 4, 10, 2.3, 4.5, 0, M.metal);
    for (const z of [-14, 0, 14]) B(h, "ic", 1.4, 5, 6, -1.5, 2, z, M.chip);
    B(h, "hdr", 2.5, 2.5, 10.2, -2.05, -8, 0, M.blackPl);
    for (let i = 0; i < 4; i++) C(h, "pin", 0.9, 6, -5.5, -8, -3.81 + i * 2.54, M.gold, "x", { tess: 8 });
    // anéis de "ultrassom" (animação)
    const rm = [];
    for (let i = 0; i < 8; i++) {
      const r = BABYLON.MeshBuilder.CreateTorus("us", { diameter: 14, thickness: 0.8, tessellation: 40 }, scene);
      const m = new BABYLON.StandardMaterial("usMat" + i, scene);
      m.emissiveColor = new BABYLON.Color3(0.13, 0.83, 0.93);
      m.disableLighting = true;
      r.material = m; r.parent = h; r.rotation.z = Math.PI / 2; r.isPickable = false; r.setEnabled(false);
      usRings.push({ mesh: r, mat: m, t: 0, z: i % 2 ? 13 : -13, live: false });
    }
  }

  // ================================================================ KY-040
  let encShaft;
  {
    const k = comp("ky040", 44, 19, -30);
    B(k, "kyBoard", 1.6, 26, 18.5, 0, 0, 0, M.pcbBlack);
    B(k, "encBody", 6.5, 12, 12, 4.05, -3, 0, M.metal);
    B(k, "encBase", 1.5, 12.6, 12.6, 1.55, -3, 0, M.blackPl);
    C(k, "bushing", 7, 9.7, 12.15, -3, 0, M.metalDk, "x");
    C(k, "nut", 10, 2, 17.3, -3, 0, M.metal, "x", { tess: 6 });
    encShaft = node("shaft", k, 0, -3, 0);
    C(encShaft, "shaftC", 6, 15, 24.5, 0, 0, M.metal, "x");
    B(encShaft, "shaftSlot", 0.3, 1, 6.1, 32.05, 0, 0, M.dark);
    B(encShaft, "shaftFlat", 9, 1, 6.1, 27, 2.6, 0, M.metalDk);
    B(k, "hdr", 2.5, 2.5, 12.7, -2.05, 11.5, 0, M.blackPl);
    for (let i = 0; i < 5; i++) C(k, "pin", 0.9, 6, -2.05, 15.5, -5.08 + i * 2.54, M.gold, "y", { tess: 8 });
    for (const z of [-5, 5]) B(k, "res", 1.2, 1, 3, -1.3, 7, z, M.chip);
  }

  // ================================================================ SERVO SG90
  let servoHorn;
  {
    const s = comp("sg90", 21, 2, 5);
    B(s, "body", 22.8, 22.7, 12.2, 0, 11.35, 0, M.servo);
    B(s, "tabs", 32.5, 2.5, 12.2, 0, 17.1, 0, M.servo);
    for (const sx of [-1, 1]) C(s, "tabHole", 2.2, 2.6, sx * 14, 17.1, 0, M.dark);
    C(s, "gearTop", 11.8, 4, -5.4, 24.7, 0, M.servo);
    C(s, "gearTop2", 6, 4, 0.8, 24.7, 0, M.servo);
    C(s, "spline", 4.6, 3, -5.4, 28.2, 0, M.white);
    servoHorn = node("horn", s, -5.4, 30.4, 0);
    C(servoHorn, "hornHub", 7, 2.2, 0, 0, 0, M.white);
    B(servoHorn, "hornArm", 15, 1.4, 4, 7, 0.4, 0, M.white);
    C(servoHorn, "hornTip", 4, 1.4, 14.5, 0.4, 0, M.white);
    for (const x of [6, 9.5, 13]) C(servoHorn, "hornHole", 1, 1.5, x, 0.45, 0, M.dark, "y", { tess: 8 });
    C(servoHorn, "hornScrew", 2.4, 0.5, 0, 1.2, 0, M.metal);
    B(s, "label", 0.2, 10, 9, 11.45, 9, 0, M.white);
  }

  // ================================================================ CHAVE RUN/PROG
  let lever, leverRun = true;
  {
    const t = comp("chave", 8, 20, 45);
    B(t, "swBody", 13, 10, 12, 0, 0, -6.5, M.blueSw);
    B(t, "swFrame", 13.6, 10.6, 1, 0, 0, -0.5, M.metal);
    for (const x of [-4, 0, 4]) for (const y of [-2.5, 2.5]) B(t, "lug", 1.6, 0.4, 5, x, y, -14.8, M.metal);
    C(t, "bush", 6, 6, 0, 0, 5.5, M.metal, "z");
    C(t, "nutSw", 11, 2, 0, 0, 3.6, M.metal, "z", { tess: 6 });
    lever = node("lever", t, 0, 0, 8.4);
    C(lever, "leverC", 3.2, 11, 0, 0, 5.5, M.metal, "z", { top: 2.4, bottom: 3.2 });
    const tip = BABYLON.MeshBuilder.CreateSphere("leverTip", { diameter: 2.7, segments: 12 }, scene);
    tip.parent = lever; tip.position.z = 11; tip.material = M.metal;
    lever.rotation.x = -0.42;
  }

  // ================================================================ fios
  const wires = node("wires", kit);
  const [j1, j2, j3, j4] = ["j1", "j2", "j3", "j4"].map((k) => jstPos[k]);
  wire([j3, [j3[0] + 4, 31, 38], [2, 30, 36], [6, 24, 33], [8, 20, 31]], [M.wBlack, M.wBlack], 0.5, 1.2, wires);
  wire([j4, [j4[0] + 4, 30, 20], [4, 27, 13], [14, 14, 10], [26, 7, 9], [32.5, 6, 5]], [M.wBrown, M.wRed, M.wOrange], 0.45, 1.0, wires);
  wire([j1, [j1[0] + 2, 31, 38], [-20, 34, 43], [10, 34, 43], [32, 28, 38], [38, 14, 22], [39, 11, 13]],
    [M.wBlack, M.wBlue, M.wOrange, M.wRed], 0.45, 1.0, wires);
  wire([j2, [j2[0] - 4, 30, 6], [-48, 26, -2], [-40, 25, -6], [-30, 25, -10]], [M.wBrown, M.wWhite, M.wOrange, M.wBlue], 0.45, 1.0, wires);
  wire([[42, 36, -30], [34, 38, -18], [16, 33, -2], [-4, 28, 10], [-12, 25, 18], [-18, 24.5, 22]], [M.cable], 1.6, 0, wires);

  // metadados de picking + sombras
  for (const c of Object.values(comps)) {
    c.base = c.node.position.clone();
    c.meshes = c.node.getChildMeshes(false).filter((m) => m.isPickable !== false && m.getTotalVertices() > 0);
    for (const m of c.node.getChildMeshes(false)) {
      m.metadata = { comp: c.id };
      shadows.addShadowCaster(m, false);
    }
  }
  comps.gabinete.node.getChildMeshes().forEach((m) => { if (m.name === "floor") m.receiveShadows = true; });


  // ---------------------------------------------------------------- tweens
  const tweens = new Map();
  let tid = 0;
  function tween(key, dur, update, onEnd) {
    tweens.set(key || "t" + tid++, { t: 0, dur, update, onEnd });
  }
  const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const lerp = (a, b, k) => a + (b - a) * k;
  const clampR = (r) => Math.min(camera.upperRadiusLimit, Math.max(camera.lowerRadiusLimit, r));

  // ---------------------------------------------------------------- câmera: voar até
  function flyTo(target, alpha, beta, radius, dur = 1.1) {
    tweens.delete("zoom");
    const a0 = camera.alpha, b0 = camera.beta, r0 = camera.radius, t0 = camera.target.clone();
    let a1 = alpha;
    while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
    while (a1 - a0 < -Math.PI) a1 += 2 * Math.PI;
    tween("cam", dur, (k) => {
      const e = ease(k);
      camera.alpha = lerp(a0, a1, e);
      camera.beta = lerp(b0, beta, e);
      camera.radius = lerp(r0, radius, e);
      camera.target.copyFrom(V3.Lerp(t0, target, e));
    });
  }
  const stopCam = () => { tweens.delete("cam"); tweens.delete("zoom"); };
  canvas.addEventListener("pointerdown", stopCam);
  canvas.addEventListener("wheel", stopCam, { passive: true });

  function compCenter(c) {
    const { min, max } = c.node.getHierarchyBoundingVectors(true, (m) => m.isEnabled() && m.isPickable);
    return { center: min.add(max).scale(0.5), size: max.subtract(min).length() };
  }

  // ---------------------------------------------------------------- seleção / destaque
  // destaque: overlay colorido sobre as malhas do componente (funciona mesmo atrás da tampa/paredes)
  const hl = { meshes: [], alpha: 0.35 }, hover = { meshes: [], alpha: 0.18 };
  const CYAN = new BABYLON.Color3(0.13, 0.85, 0.95);
  const WHITE = new BABYLON.Color3(1, 1, 1);

  let selected = null, hovered = null;
  let xr = null, inXR = false, xrMode = null, xrBusy = false, domOverlayOn = false;
  let xrPanel, xrPanelUI, xrBar, xrBtns = {};
  function setHL(layer, id, color) {
    for (const m of layer.meshes) m.renderOverlay = false;
    layer.meshes = [];
    if (!id || id === "gabinete") return;
    for (const m of comps[id].meshes) {
      m.renderOverlay = true; m.overlayColor = color; m.overlayAlpha = layer.alpha;
      layer.meshes.push(m);
    }
  }

  const $ = (id) => document.getElementById(id);
  const stage = $("stage"), sheet = $("sheet"), info = $("info"), overview = $("overview");
  const detailEl = $("detail"), mods = $("mods");

  // ---------------------------------------------------------------- layout: painel inferior (mobile) ou lateral (telas largas)
  const sideMQ = matchMedia("(min-width: 900px), (orientation: landscape) and (max-height: 560px)");
  const isSide = () => sideMQ.matches;
  let sheetState = "peek", sheetTargetH = 0, peekPx = 0;

  function sheetHeights() {
    const sr = stage.getBoundingClientRect(), vh = window.innerHeight;
    peekPx = Math.max(0, vh - sr.bottom);
    const full = Math.round(vh - sr.top - 8);
    return { peek: peekPx, half: Math.min(full, Math.round(Math.max(peekPx + 220, vh * 0.5))), full };
  }
  function setSheet(state, { animate = true, refit = true } = {}) {
    sheetState = state;
    if (isSide()) { sheet.style.height = ""; sheetTargetH = 0; return; }
    sheetTargetH = sheetHeights()[state];
    sheet.classList.toggle("dragging", !animate);
    sheet.style.height = sheetTargetH + "px";
    sheet.dataset.state = state;
    $("handle").setAttribute("aria-expanded", String(state !== "peek"));
    if (refit) adjustZoom();
  }

  // Enquadramento: área visível do canvas (descontando o painel que cobre a parte de baixo)
  function viewMetrics() {
    const W = canvas.clientWidth || 1, H = canvas.clientHeight || 1;
    const covered = isSide() ? 0 : Math.max(0, sheetTargetH - peekPx);
    const tanV = Math.tan(camera.fov / 2);
    const visH = Math.max(H * 0.3, H - covered);
    const t = Math.min((tanV * visH) / H, (tanV * W) / H);
    return { scale: tanV / t };
  }
  let lastScale = 1;
  function adjustZoom() {
    if (inXR) return;
    const s = viewMetrics().scale;
    if (Math.abs(s - lastScale) < 0.01) return;
    const r0 = camera.radius, r1 = clampR((r0 * s) / lastScale);
    lastScale = s;
    tween("zoom", 0.35, (k) => (camera.radius = lerp(r0, r1, ease(k))));
  }
  function homeView() {
    return exploded
      ? { target: new V3(0, 0.04, 0), alpha: HOME.alpha, beta: 0.9, radius: 0.42 }
      : { target: HOME.target.clone(), alpha: HOME.alpha, beta: HOME.beta, radius: HOME.radius };
  }
  function compView(id) {
    const c = comps[id];
    const { center, size } = compCenter(c);
    const v = c.data.view || { alpha: HOME.alpha, beta: 0.8, radius: size * 2.5 };
    return { target: center, alpha: v.alpha, beta: v.beta, radius: v.radius };
  }
  function focusCam(dur = 1.1) {
    if (inXR) return;
    const isHome = !selected || selected === "gabinete";
    const v = isHome ? homeView() : compView(selected);
    lastScale = viewMetrics().scale;
    // em tela estreita (retrato) o kit inteiro cabe com folga: aproxima um pouco a vista geral
    const k = isHome && lastScale > 1.2 ? 0.86 : 1;
    flyTo(v.target, v.alpha, v.beta, clampR(v.radius * lastScale * k), dur);
  }

  // arrastar a alça do painel (mobile): peek ↔ half ↔ full
  {
    const grab = $("handle");
    let y0 = null, h0 = 0, t0 = 0, moved = false;
    grab.addEventListener("pointerdown", (e) => {
      if (isSide()) return;
      y0 = e.clientY; h0 = sheet.getBoundingClientRect().height; t0 = performance.now(); moved = false;
      grab.setPointerCapture(e.pointerId);
      sheet.classList.add("dragging");
    });
    grab.addEventListener("pointermove", (e) => {
      if (y0 === null) return;
      const dy = y0 - e.clientY;
      if (Math.abs(dy) > 5) moved = true;
      const hs = sheetHeights();
      sheet.style.height = Math.min(hs.full, Math.max(hs.peek, h0 + dy)) + "px";
    });
    const end = (e) => {
      if (y0 === null) return;
      const dy = y0 - e.clientY, v = dy / Math.max(1, performance.now() - t0);
      y0 = null;
      sheet.classList.remove("dragging");
      if (!moved) { setSheet(sheetState === "peek" ? "half" : "peek"); return; }
      const hs = sheetHeights(), cur = sheet.getBoundingClientRect().height;
      let target;
      if (Math.abs(v) > 0.45) target = v > 0 ? (cur < hs.half ? "half" : "full") : (cur > hs.half ? "half" : "peek");
      else target = ["peek", "half", "full"].reduce((a, b) => (Math.abs(hs[b] - cur) < Math.abs(hs[a] - cur) ? b : a));
      setSheet(target);
    };
    grab.addEventListener("pointerup", end);
    grab.addEventListener("pointercancel", end);
  }

  // ---------------------------------------------------------------- lista de módulos e ficha técnica
  const pinsOf = (id) => GPIO_MAP.filter((g) => g.comp === id || g.shared?.includes(id)).map((g) => g.gpio);
  for (const id of COMP_ORDER) {
    const b = document.createElement("button");
    b.className = "mod";
    b.dataset.id = id;
    b.title = COMPONENTS[id].nome;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", "false");
    b.innerHTML = icon(COMP_UI[id].icon) + '<span class="n"></span><span class="g"></span>';
    const pins = pinsOf(id);
    b.querySelector(".n").textContent = COMP_UI[id].curto;
    b.querySelector(".g").textContent = pins.length && id !== "esp32" ? "GPIO " + pins.join(",") : COMP_UI[id].tag;
    b.onclick = () => select(id);
    mods.append(b);
  }

  function gpioChips(el, d) {
    el.innerHTML = "";
    for (const [p, f] of d.gpios) {
      const s = document.createElement("span"), b = document.createElement("b");
      b.textContent = p;
      s.append(b, " · " + f);
      el.append(s);
    }
  }
  function fillInfo(id) {
    const d = COMPONENTS[id];
    $("iIco").innerHTML = icon(COMP_UI[id].icon);
    $("iTipo").textContent = d.tipo;
    $("iNome").textContent = d.nome;
    gpioChips($("iGpio"), d);
    const tb = $("iSpecs");
    tb.innerHTML = "";
    for (const [k, v] of d.specs) {
      const tr = tb.insertRow();
      tr.insertCell().textContent = k;
      tr.insertCell().textContent = v;
    }
    $("iDesc").textContent = d.desc;
    $("iDica").textContent = d.dica;
    $("iCodeWrap").hidden = !d.codigo;
    $("iCodeWrap").open = false;
    $("iCode").textContent = d.codigo || "";
    detailEl.scrollTop = 0;
  }

  function select(id, fromUser = true) {
    const c = comps[id];
    if (!c) return;
    if (fromUser && id === "chave" && selected === "chave") toggleLever();
    selected = id;
    setHL(hl, id, CYAN);
    setHL(hover, null);
    hovered = null;
    for (const b of mods.children) b.setAttribute("aria-selected", String(b.dataset.id === id));
    if (!isSide()) mods.querySelector(`[data-id="${id}"]`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    fillInfo(id);
    overview.hidden = true;
    info.hidden = false;
    mpuAxes.setEnabled(id === "mpu");
    try { history.replaceState(null, "", "#" + id); } catch (e) { /* file:// */ }
    if (inXR) { xrFocus(id); return; }
    if (!isSide() && sheetState === "peek") setSheet("half", { refit: false });
    focusCam();
  }
  function deselect() {
    selected = null;
    setHL(hl, null);
    mpuAxes.setEnabled(false);
    info.hidden = true;
    overview.hidden = false;
    for (const b of mods.children) b.setAttribute("aria-selected", "false");
    drawLCD("KIT IoT ESP32-C3", "Clique um sensor");
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* file:// */ }
    if (inXR) { xrFocus(null); return; }
    if (!isSide()) setSheet("peek", { refit: false });
  }
  function goHome() {
    deselect();
    focusCam();
  }
  function step(dir) {
    const i = COMP_ORDER.indexOf(selected);
    select(COMP_ORDER[(i + dir + COMP_ORDER.length) % COMP_ORDER.length], false);
  }
  function toggleLever() {
    leverRun = !leverRun;
    const r0 = lever.rotation.x, r1 = leverRun ? -0.42 : 0.42;
    tween("lever", 0.18, (k) => (lever.rotation.x = lerp(r0, r1, k)));
  }
  function compFromMesh(m) {
    while (m) { if (m.metadata?.comp) return m.metadata.comp; m = m.parent; }
    return null;
  }

  // ---------------------------------------------------------------- tampa / explodir
  let lidState = 0; // 0 fechada, 1 aberta, 2 removida
  let exploded = false;
  const lidNames = ["fechada", "aberta", "removida"];
  function lidTargetY() { return lidY + (lidState === 1 ? 45 : 0) + (exploded ? 75 : 0); }
  function setLid(state) {
    lidState = state;
    $("lidLbl").textContent = "Tampa " + lidNames[state];
    $("bLid").title = "Tampa: " + lidNames[state] + " (toque para alternar)";
    $("bLid").setAttribute("aria-pressed", String(state !== 0));
    lid.setEnabled(state !== 2);
    const y0 = lid.position.y, y1 = lidTargetY();
    tween("lid", 0.6, (k) => (lid.position.y = lerp(y0, y1, ease(k))));
    xrSyncButtons();
  }
  function setExplode(on) {
    exploded = on;
    $("expLbl").textContent = on ? "Montar" : "Explodir";
    $("bExp").title = on ? "Montar o kit" : "Vista explodida";
    $("bExp").setAttribute("aria-pressed", String(on));
    wires.setEnabled(!on);
    for (const c of Object.values(comps)) {
      const p0 = c.node.position.clone();
      const p1 = c.base.add(on ? new V3(...c.data.explode) : V3.Zero());
      tween("exp" + c.id, 0.9, (k) => c.node.position.copyFrom(V3.Lerp(p0, p1, ease(k))));
    }
    const y0 = lid.position.y, y1 = lidTargetY();
    tween("lid", 0.9, (k) => (lid.position.y = lerp(y0, y1, ease(k))));
    xrSyncButtons();
    if (!inXR) {
      if (selected && selected !== "gabinete") setTimeout(() => focusCam(0.6), 950);
      else focusCam(1.0);
    }
  }

  // ---------------------------------------------------------------- controles HTML
  $("bHome").onclick = () => goHome();
  $("bLid").onclick = () => setLid((lidState + 1) % 3);
  $("bExp").onclick = () => setExplode(!exploded);
  $("iClose").onclick = () => goHome();
  $("iPrev").onclick = () => step(-1);
  $("iNext").onclick = () => step(1);
  $("iCopy").onclick = async () => {
    try {
      await navigator.clipboard.writeText(COMPONENTS[selected]?.codigo || "");
      toast("Código copiado para a área de transferência.", "info", 2000);
    } catch (e) {
      toast("Não foi possível copiar automaticamente. Selecione o código e copie manualmente.", "warn");
    }
  };

  const openModal = (id) => { const m = $(id); m.classList.add("open"); m.querySelector("[data-close]")?.focus(); };
  const closeModals = () => document.querySelectorAll(".modal.open").forEach((m) => m.classList.remove("open"));
  document.querySelectorAll(".modal").forEach((m) =>
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) m.classList.remove("open"); }));
  $("bGpio").onclick = () => openModal("mGpio");
  $("bHelp").onclick = () => openModal("mHelp");
  {
    const tb = $("gpioTable");
    for (const g of GPIO_MAP) {
      const tr = tb.insertRow();
      tr.insertCell().textContent = "GPIO" + g.gpio;
      tr.insertCell().textContent = g.func;
      tr.insertCell().textContent = g.func === "Não Usar" ? "" : COMP_UI[g.comp].curto;
      if (g.func === "Não Usar") tr.className = "na";
      else {
        tr.className = "lk";
        tr.tabIndex = 0;
        const go = () => { closeModals(); select(g.comp); };
        tr.onclick = go;
        tr.onkeydown = (e) => { if (e.key === "Enter") go(); };
      }
    }
  }
  {
    const g = $("gest");
    const items = isCoarse
      ? [["rotate", "1 dedo: girar"], ["pinch", "Pinça: zoom"], ["move", "2 dedos: mover"], ["tap", "Toque duplo: reenquadrar"]]
      : [["rotate", "Arrastar: girar"], ["pinch", "Roda: zoom"], ["move", "Botão direito: mover"], ["tap", "Duplo clique: reenquadrar"]];
    for (const [ic, txt] of items) {
      const d = document.createElement("div");
      d.innerHTML = icon(ic) + "<span></span>";
      d.querySelector("span").textContent = txt;
      g.append(d);
    }
  }
  window.addEventListener("keydown", (e) => {
    if (e.target.closest?.("input, textarea")) return;
    if (e.key === "Escape") {
      if (document.querySelector(".modal.open")) closeModals();
      else if (selected) goHome();
    } else if (!document.querySelector(".modal.open") && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      step(e.key === "ArrowRight" ? 1 : -1);
    }
  });

  // ---------------------------------------------------------------- picking, hover e toque duplo
  const tip = $("tip");
  const canHover = matchMedia("(hover: hover)").matches;
  scene.onPointerObservable.add((pi) => {
    const T = BABYLON.PointerEventTypes;
    if (pi.type === T.POINTERMOVE && !inXR && canHover && pi.event.pointerType === "mouse") {
      const pick = scene.pick(scene.pointerX, scene.pointerY, (m) => m.isPickable && m.isEnabled());
      const id = pick?.hit ? compFromMesh(pick.pickedMesh) : null;
      const showId = id && id !== "gabinete" ? id : null;
      canvas.style.cursor = id ? "pointer" : "";
      if (showId !== hovered) {
        hovered = showId;
        setHL(hover, showId && showId !== selected ? showId : null, WHITE);
      }
      if (id) {
        tip.style.display = "block";
        tip.textContent = COMPONENTS[id].nome;
        tip.style.left = Math.min(pi.event.clientX + 14, window.innerWidth - tip.offsetWidth - 8) + "px";
        tip.style.top = pi.event.clientY + 16 + "px";
      } else tip.style.display = "none";
    }
    const hitId = pi.pickInfo?.hit ? compFromMesh(pi.pickInfo.pickedMesh) : null;
    const isClick = (!inXR && pi.type === T.POINTERTAP) || (inXR && pi.type === T.POINTERDOWN);
    if (isClick && hitId) select(hitId);
    if (!inXR && pi.type === T.POINTERDOUBLETAP && !hitId) focusCam(0.7);
  });
  canvas.addEventListener("pointerleave", () => { tip.style.display = "none"; setHL(hover, null); hovered = null; });

  // ---------------------------------------------------------------- redimensionamento / orientação
  function onLayoutChange() {
    if (isSide()) { sheet.style.height = ""; sheet.classList.remove("dragging"); sheetTargetH = 0; }
    else setSheet(sheetState, { animate: false, refit: false });
    engine.resize();
    focusCam(0.6);
  }
  sideMQ.addEventListener("change", onLayoutChange);
  matchMedia("(orientation: portrait)").addEventListener("change", () => setTimeout(onLayoutChange, 250));
  let rzT;
  window.addEventListener("resize", () => {
    clearTimeout(rzT);
    rzT = setTimeout(() => {
      if (!isSide()) setSheet(sheetState, { animate: false, refit: false });
      adjustZoom();
    }, 150);
  });

  // ---------------------------------------------------------------- animações contínuas
  let time = 0, usTimer = 0, usNext = 0, lcdTimer = 0, encCount = 0, lidFade = 1;
  scene.onBeforeRenderObservable.add(() => {
    const dt = Math.min(engine.getDeltaTime() / 1000, 0.1);
    time += dt;
    for (const [k, tw] of tweens) {
      tw.t += dt;
      const p = Math.min(1, tw.t / tw.dur);
      tw.update(p);
      if (p >= 1) { tweens.delete(k); tw.onEnd && tw.onEnd(); }
    }

    if (!inXR) {
      // o painel inferior (mobile) cobre parte do canvas: sobe o centro da vista na mesma proporção
      const H = canvas.clientHeight || 1, tanV = Math.tan(camera.fov / 2);
      const covered = isSide() ? 0 : Math.max(0, sheet.getBoundingClientRect().height - peekPx);
      camera.targetScreenOffset.set(0, (covered / H) * camera.radius * tanV);
      // arrastar com 2 dedos / botão direito move o modelo na mesma velocidade do dedo
      camera.panningSensibility = H / (2 * camera.radius * tanV * (1 - camera.panningInertia));
    }
    // tampa quase transparente enquanto um componente interno está em foco
    const lidGoal = selected && selected !== "gabinete" && selected !== "hcsr04" && selected !== "ky040" && selected !== "chave" ? 0.12 : 1;
    lidFade += (lidGoal - lidFade) * Math.min(1, dt * 5);
    M.acrylic.alpha = 0.16 * lidFade;
    lidTextMat.alpha = lidFade;
    // pulso do destaque
    const pulse = 0.22 + 0.16 * (0.5 + 0.5 * Math.sin(time * 4));
    for (const m of hl.meshes) m.overlayAlpha = pulse;
    // servo varre quando selecionado
    let servoAng = 90;
    if (selected === "sg90") {
      servoAng = 90 + Math.sin(time * 1.6) * 85;
      servoHorn.rotation.y = ((servoAng - 90) * Math.PI) / 180;
    }
    // encoder gira quando selecionado
    if (selected === "ky040") {
      encShaft.rotation.x -= dt * 1.4;
      encCount = Math.floor(-encShaft.rotation.x / ((2 * Math.PI) / 20));
    }
    // MPU: leve oscilação dos eixos
    if (selected === "mpu") {
      mpuAxes.rotation.z = Math.sin(time * 1.3) * 0.15;
      mpuAxes.rotation.x = Math.cos(time * 1.1) * 0.12;
    }
    // ultrassom
    if (selected === "hcsr04") {
      usTimer += dt;
      if (usTimer > usNext) {
        usTimer = 0; usNext = 0.32;
        const r = usRings.find((r) => !r.live);
        if (r) { r.live = true; r.t = 0; r.mesh.setEnabled(true); }
      }
    }
    for (const r of usRings) {
      if (!r.live) continue;
      r.t += dt;
      const k = r.t / 1.3;
      if (k >= 1 || selected !== "hcsr04") { r.live = false; r.mesh.setEnabled(false); r.mesh.position.set(0, 0, r.z); r.mesh.scaling.setAll(1); continue; }
      r.mesh.position.set(16 + k * 70, 0, r.z);
      r.mesh.scaling.setAll(1 + k * 2.2);
      r.mat.alpha = 1 - k;
    }
    // LCD "firmware" simulado
    lcdTimer += dt;
    if (lcdTimer > 0.25 && selected) {
      lcdTimer = 0;
      const d = COMPONENTS[selected];
      let l2 = d.lcd[1];
      if (selected === "hcsr04") l2 = "Dist: " + (23 + 9 * Math.sin(time * 0.8) + Math.random() * 0.4).toFixed(1) + " cm";
      if (selected === "sg90") l2 = "Angulo: " + String(Math.round(servoAng)).padStart(3, "0");
      if (selected === "ky040") l2 = "Contagem: " + encCount;
      if (selected === "mpu") l2 = "Ax" + (Math.sin(time * 1.3) * 0.15).toFixed(2) + " Az" + (0.98 + Math.random() * 0.03).toFixed(2);
      if (selected === "chave") l2 = "Modo: " + (leverRun ? "RUN" : "PROG");
      drawLCD(d.lcd[0], l2);
    }
  });

  // ---------------------------------------------------------------- vista inicial
  setSheet("peek", { animate: false, refit: false });
  engine.resize();
  camera.alpha = HOME.alpha - 0.9;
  camera.radius = clampR(0.5 * viewMetrics().scale);
  focusCam(1.6);
  $("loader").classList.add("done");
  // link direto para um componente: index.html#hcsr04
  const fromHash = () => { const id = location.hash.slice(1); if (comps[id] && id !== selected) select(id, false); };
  window.addEventListener("hashchange", fromHash);
  if (location.hash) fromHash();

  // ================================================================ WebXR
  const XR_SCALE = MM * 2.5;     // kit 2,5× maior em XR (30 cm de comprimento)
  const XR_ZOOM = MM * 5;        // escala ao focar um componente
  const xrBase = { pos: new V3(), rotY: 0, fwd: new V3(0, 0, 1), head: new V3(0, 1.6, 0) };

  // Classificação do dispositivo. Celulares Android costumam responder "true" para
  // isSessionSupported("immersive-vr") e depois falham no requestSession com
  // "The specified session configuration is not supported" — por isso VR fica restrito
  // a headsets/desktop, e o celular usa AR.
  const ua = navigator.userAgent;
  const isHeadset = /OculusBrowser|Quest|Pico|Wolvic/i.test(ua);
  const isPhone = !isHeadset && (/Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)));
  const MSG = {
    https: "VR/AR exige conexão segura. Abra o laboratório pelo endereço https://.",
    noapi: isPhone && /iPhone|iPad|iPod|Macintosh/.test(ua)
      ? "O Safari do iPhone/iPad ainda não oferece WebXR. Use um Android com Chrome (AR) ou um Meta Quest (VR)."
      : "Este navegador não oferece WebXR. Use o Chrome no Android (AR) ou o navegador do Meta Quest (VR).",
    iframe: "VR/AR bloqueado: a página está incorporada sem permissão de XR. Abra o link direto do laboratório.",
    vrPhone: "VR imersivo não está disponível no navegador do celular. Use o botão AR ou abra o laboratório em um Meta Quest.",
    vrNo: "Este dispositivo não oferece VR imersivo. Use um headset compatível, como o Meta Quest.",
    arNo: "Este dispositivo não oferece AR no navegador. É preciso Chrome no Android com o Google Play Services para AR (ARCore), ou um Meta Quest 3/3S.",
    init: "Não foi possível preparar o modo VR/AR neste navegador. A visualização 3D continua funcionando.",
  };
  const xrState = { vr: { ok: false, why: "Verificando suporte a VR…" }, ar: { ok: false, why: "Verificando suporte a AR…" } };

  function renderXR() {
    for (const k of ["vr", "ar"]) {
      const btn = $(k === "vr" ? "bVR" : "bAR"), s = xrState[k];
      btn.classList.toggle("off", !s.ok);
      btn.setAttribute("aria-disabled", String(!s.ok));
      btn.title = s.ok ? (k === "vr" ? "Entrar em realidade virtual" : "Ver em realidade aumentada") : s.why;
    }
    const box = $("xrStatus");
    box.innerHTML = "";
    for (const [k, label] of [["ar", "AR"], ["vr", "VR"]]) {
      const s = xrState[k], d = document.createElement("div");
      d.className = s.ok ? "ok" : "no";
      d.innerHTML = icon(s.ok ? "check" : "warn") + "<span><b></b> </span>";
      d.querySelector("b").textContent = label + (s.ok ? ": disponível" : ": indisponível");
      d.querySelector("span").append(s.ok
        ? (k === "vr" ? "toque no botão VR para entrar." : "toque no botão AR e aponte a câmera para o ambiente.")
        : s.why);
      box.append(d);
    }
  }
  renderXR();

  function setBoth(why) { xrState.vr = { ok: false, why }; xrState.ar = { ok: false, why }; }
  async function detectXR() {
    if (!window.isSecureContext) return setBoth(MSG.https);
    if (!navigator.xr) return setBoth(MSG.noapi);
    const check = async (mode) => {
      try { return await navigator.xr.isSessionSupported(mode); }
      catch (e) { if (e && e.name === "SecurityError") throw e; return false; }
    };
    let vr = false, ar = false;
    try { [vr, ar] = await Promise.all([check("immersive-vr"), check("immersive-ar")]); }
    catch (e) { return setBoth(MSG.iframe); }
    xrState.ar = ar ? { ok: true } : { ok: false, why: MSG.arNo };
    xrState.vr = vr && !isPhone ? { ok: true } : { ok: false, why: isPhone ? MSG.vrPhone : MSG.vrNo };
  }

  function buildXRGui() {
    // painel de descrição (VR / AR sem DOM Overlay)
    xrPanel = BABYLON.MeshBuilder.CreatePlane("xrPanel", { width: 0.46, height: 0.36 }, scene);
    xrPanel.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    const adt = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(xrPanel, 1024, 800);
    const bg = new BABYLON.GUI.Rectangle();
    bg.background = "rgba(17,22,30,0.95)"; bg.cornerRadius = 28; bg.thickness = 3; bg.color = "#22d3ee";
    adt.addControl(bg);
    const sp = new BABYLON.GUI.StackPanel();
    sp.paddingLeft = sp.paddingRight = "40px"; sp.paddingTop = "30px";
    sp.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    bg.addControl(sp);
    const mk = (size, color, h, bold) => {
      const t = new BABYLON.GUI.TextBlock();
      t.fontSize = size; t.color = color; t.height = h; t.textWrapping = true;
      t.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      t.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      if (bold) t.fontWeight = "bold";
      sp.addControl(t);
      return t;
    };
    xrPanelUI = {
      tipo: mk(30, "#22d3ee", "44px"),
      nome: mk(58, "#ffffff", "76px", true),
      gpio: mk(32, "#a5f3fc", "56px"),
      specs: mk(29, "#d3d9e3", "400px"),
      dica: mk(27, "#fcd9a0", "110px"),
    };
    const close = BABYLON.GUI.Button.CreateSimpleButton("xrClose", "✕  Fechar");
    close.width = "220px"; close.height = "64px"; close.color = "white"; close.background = "#334155";
    close.cornerRadius = 14; close.fontSize = 30;
    close.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    close.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    close.left = "-30px"; close.top = "-24px";
    close.onPointerUpObservable.add(() => deselect());
    bg.addControl(close);
    xrPanel.setEnabled(false);

    // barra de ferramentas 3D
    xrBar = BABYLON.MeshBuilder.CreatePlane("xrBar", { width: 0.5, height: 0.07 }, scene);
    xrBar.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    const bdt = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(xrBar, 1400, 196);
    const row = new BABYLON.GUI.StackPanel();
    row.isVertical = false;
    bdt.addControl(row);
    const defs = [
      ["center", "Recentrar", () => placeKit()],
      ["lid", "Tampa", () => setLid((lidState + 1) % 3)],
      ["exp", "Explodir", () => setExplode(!exploded)],
      ["exit", "Sair", () => xr.baseExperience.exitXRAsync()],
    ];
    for (const [k, label, fn] of defs) {
      const b = BABYLON.GUI.Button.CreateSimpleButton("xb" + k, label);
      b.width = "320px"; b.height = "150px"; b.paddingLeft = b.paddingRight = "14px";
      b.color = "white"; b.background = k === "exit" ? "#7f1d1d" : "#1e293b"; b.cornerRadius = 24; b.fontSize = 46;
      b.thickness = 2;
      b.onPointerUpObservable.add(fn);
      row.addControl(b);
      xrBtns[k] = b;
    }
    xrBar.setEnabled(false);

    // controles HTML do AR (DOM Overlay): toques nos botões não devem selecionar peças atrás deles
    for (const el of [$("xTop"), $("xCard")]) el.addEventListener("beforexrselect", (e) => e.preventDefault());
    $("xExit").onclick = () => xr.baseExperience.exitXRAsync();
    $("xCenter").onclick = () => placeKit();
    $("xLid").onclick = () => setLid((lidState + 1) % 3);
    $("xExp").onclick = () => setExplode(!exploded);
    $("xClose").onclick = () => deselect();
  }
  function xrSyncButtons() {
    $("xLid").lastChild.textContent = "Tampa " + lidNames[lidState];
    $("xExp").lastChild.textContent = exploded ? "Montar" : "Explodir";
    if (!xrBtns.lid) return;
    xrBtns.lid.textBlock.text = "Tampa " + lidNames[lidState];
    xrBtns.exp.textBlock.text = exploded ? "Montar" : "Explodir";
  }

  function placeKit() {
    const cam = xr.baseExperience.camera;
    const fwd = cam.getDirection(BABYLON.Axis.Z);
    fwd.y = 0;
    if (fwd.lengthSquared() < 1e-4) fwd.set(0, 0, 1);
    fwd.normalize();
    const ar = xrMode === "immersive-ar";
    const head = cam.position.clone();
    const pos = head.add(fwd.scale(ar ? 0.5 : 0.55));
    pos.y = ar ? head.y - 0.22 : Math.max(0.6, head.y - 0.45);
    xrBase.pos.copyFrom(pos);
    xrBase.rotY = Math.atan2(fwd.x, fwd.z);
    xrBase.fwd.copyFrom(fwd);
    xrBase.head.copyFrom(head);
    tweens.delete("xrKit");
    kit.position.copyFrom(pos);
    kit.rotation.y = xrBase.rotY;
    kit.scaling.setAll(XR_SCALE);
    pedestal.position.copyFrom(pos);
    pedestal.rotation.y = xrBase.rotY;
    pedestal.getChildMeshes().forEach((m) => {
      if (m.name === "pCol") { m.scaling.y = Math.max(0.05, pos.y - 0.03); m.position.y = -0.03 - (pos.y - 0.03) / 2; }
    });
    pedestal.setEnabled(!ar);
    xrBar.position.copyFrom(pos.add(fwd.scale(0.25)).add(new V3(0, 0.32, 0)));
    xrBar.setEnabled(!domOverlayOn);
    if (selected) xrFocus(selected);
  }

  function xrFocus(id) {
    const fwd = xrBase.fwd, right = new V3(fwd.z, 0, -fwd.x);
    const p0 = kit.position.clone(), s0 = kit.scaling.x, r0 = kit.rotation.y;
    const shortest = (a, b) => { while (b - a > Math.PI) b -= 2 * Math.PI; while (b - a < -Math.PI) b += 2 * Math.PI; return b; };
    if (!id || id === "gabinete") {
      const r1 = shortest(r0, xrBase.rotY);
      tween("xrKit", 0.8, (k) => {
        const e = ease(k);
        kit.position.copyFrom(V3.Lerp(p0, xrBase.pos, e));
        kit.scaling.setAll(lerp(s0, XR_SCALE, e));
        kit.rotation.y = lerp(r0, r1, e);
      });
      if (id === "gabinete") showXRPanel(id, xrBase.pos.add(right.scale(0.32)).add(new V3(0, 0.25, 0)));
      else hideXRPanel();
      return;
    }
    // centro do componente em coordenadas locais do kit
    const { center } = compCenter(comps[id]);
    const inv = kit.getWorldMatrix().clone().invert();
    const local = V3.TransformCoordinates(center, inv);
    const target = xrBase.head.add(fwd.scale(0.36));
    target.y = xrBase.head.y - 0.22;
    // gira o kit para que o lado de observação do componente (alpha da vista desktop) fique voltado ao usuário
    const v = comps[id].data.view;
    const aView = v ? Math.atan2(Math.cos(v.alpha), Math.sin(v.alpha)) : Math.PI;
    const r1 = shortest(r0, xrBase.rotY + Math.PI - aView);
    const p1 = target.subtract(V3.TransformCoordinates(local.scale(XR_ZOOM), BABYLON.Matrix.RotationY(r1)));
    tween("xrKit", 0.9, (k) => {
      const e = ease(k);
      kit.position.copyFrom(V3.Lerp(p0, p1, e));
      kit.scaling.setAll(lerp(s0, XR_ZOOM, e));
      kit.rotation.y = lerp(r0, r1, e);
    });
    showXRPanel(id, target.add(right.scale(0.3)).add(new V3(0, 0.26, 0)));
  }

  function showXRPanel(id, pos) {
    const d = COMPONENTS[id];
    if (domOverlayOn) {
      $("xIco").innerHTML = icon(COMP_UI[id].icon);
      $("xTipo").textContent = d.tipo;
      $("xNome").textContent = d.nome;
      gpioChips($("xGpio"), d);
      $("xDesc").textContent = d.desc;
      $("xCard").hidden = false;
      $("xHint").hidden = true;
      return;
    }
    xrPanelUI.tipo.text = d.tipo.toUpperCase();
    xrPanelUI.nome.text = d.nome;
    xrPanelUI.gpio.text = d.gpios.map(([p, f]) => p + " · " + f).join("   ");
    xrPanelUI.specs.text = d.specs.slice(0, 6).map(([k, v]) => "• " + k + ": " + v).join("\n");
    xrPanelUI.dica.text = "💡 " + d.dica;
    xrPanel.position.copyFrom(pos);
    xrPanel.setEnabled(true);
  }
  function hideXRPanel() {
    xrPanel.setEnabled(false);
    $("xCard").hidden = true;
    $("xHint").hidden = !domOverlayOn;
  }

  function xrErrorMessage(kind, e) {
    const name = (e && e.name) || "", label = kind === "vr" ? "VR" : "AR";
    if (name === "NotSupportedError") {
      const why = isHeadset
        ? `O headset recusou a sessão ${label}. Atualize o navegador do Quest e verifique se ${kind === "ar" ? "o passthrough" : "o modo imersivo"} está liberado nas configurações.`
        : kind === "vr" ? (isPhone ? MSG.vrPhone : MSG.vrNo) : MSG.arNo;
      xrState[kind] = { ok: false, why };   // não oferece de novo algo que o dispositivo recusou
      renderXR();
      return why;
    }
    if (name === "NotAllowedError" || name === "SecurityError")
      return `O ${label} não foi autorizado. Permita o acesso à câmera e aos sensores de movimento para este site e toque em ${label} novamente.`;
    if (name === "InvalidStateError") return `Já existe uma sessão ${label} aberta. Feche-a e tente de novo.`;
    return `Não foi possível iniciar o ${label} neste dispositivo. A visualização 3D continua disponível.`;
  }

  async function enterXR(kind) {
    const s = xrState[kind];
    if (!s.ok) { toast(s.why, "warn", 7000); return; }
    if (xrBusy || inXR) return;
    xrBusy = true;
    const btn = $(kind === "vr" ? "bVR" : "bAR");
    btn.classList.add("wait");
    const mode = kind === "vr" ? "immersive-vr" : "immersive-ar";
    xrMode = mode;
    // DOM Overlay só no AR (UI HTML sobre a câmera do celular); fica de fora da sessão VR
    const fm = xr.baseExperience.featuresManager, DOM = BABYLON.WebXRFeatureName.DOM_OVERLAY;
    try {
      if (mode === "immersive-ar" && !fm.getEnabledFeature(DOM)) fm.enableFeature(DOM, "latest", { element: "#xrOverlay" }, true, false);
      if (mode === "immersive-vr" && fm.getEnabledFeature(DOM)) fm.disableFeature(DOM);
    } catch (e) { console.warn("[WebXR] DOM Overlay indisponível", e); }
    try {
      // "local" é garantido em qualquer sessão imersiva; "local-floor" (VR) dá a altura do piso no Quest.
      // Somente recursos opcionais são pedidos, então a sessão não é recusada por falta de recurso.
      await xr.baseExperience.enterXRAsync(mode, mode === "immersive-ar" ? "local" : "local-floor");
    } catch (e) {
      console.warn("[WebXR] falha ao iniciar", mode, e);
      toast(xrErrorMessage(kind, e), "warn", 9000);
    } finally {
      xrBusy = false;
      btn.classList.remove("wait");
    }
  }
  $("bVR").onclick = () => enterXR("vr");
  $("bAR").onclick = () => enterXR("ar");

  try {
    await detectXR();
    if (xrState.vr.ok || xrState.ar.ok) {
      xr = await scene.createDefaultXRExperienceAsync({
        disableDefaultUI: true,
        disableTeleportation: true,
        disableNearInteraction: true,
        floorMeshes: [ground],
      });
      if (!xr || !xr.baseExperience) throw new Error("XR experience not created");
      buildXRGui();

      xr.baseExperience.onStateChangedObservable.add((state) => {
        if (state === BABYLON.WebXRState.IN_XR) {
          inXR = true;
          const session = xr.baseExperience.sessionManager.session;
          domOverlayOn = xrMode === "immersive-ar" && !!(session && session.domOverlayState);
          $("xrOverlay").hidden = !domOverlayOn;
          $("xCard").hidden = true;
          $("xHint").hidden = !domOverlayOn;
          tip.style.display = "none";
          setHL(hover, null);
          camera.targetScreenOffset.set(0, 0);
          if (xrMode === "immersive-ar") {
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
            ground.setEnabled(false);
          }
          setTimeout(placeKit, 350);
        } else if (state === BABYLON.WebXRState.NOT_IN_XR) {
          const wasIn = inXR;
          inXR = false;
          domOverlayOn = false;
          $("xrOverlay").hidden = true;
          tweens.delete("xrKit");
          scene.clearColor = BG.clone();
          ground.setEnabled(true);
          pedestal.setEnabled(false);
          xrPanel.setEnabled(false);
          xrBar.setEnabled(false);
          kit.position.setAll(0);
          kit.rotation.y = 0;
          kit.scaling.setAll(MM);
          if (wasIn) {
            engine.resize();
            if (selected) select(selected, false); else focusCam();
          }
        }
      });
    }
  } catch (xrErr) {
    console.warn("[WebXR] inicialização", xrErr);
    setBoth(MSG.init);
  }
  renderXR();
 } catch (err) {
  console.error(err);
  document.getElementById("loader")?.classList.add("done");
  toast("Erro ao carregar o laboratório: " + (err.message || err), "err", 0);
 }
})();
