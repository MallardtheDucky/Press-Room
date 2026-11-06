
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var PW = 1100;
  var STORE = "pressroom.v2";
  var HEADMAX = 70;
  var LIMIT = { lead: 700, col: 320, row: 170, box: 260 };
  var IMGSIZE = { lead: [1200, 600], col: [560, 380], row: [420, 290] };

  var LAYOUTS = {
    chronicle: {
      name: "Chronicle",
      rows: [[["left", 230], ["lead"], ["right", 230]], [["bottom"]]],
      zones: { left: { label: "Left column", kind: "col", cap: 2 }, lead: { label: "Lead story", kind: "lead", cap: 1 }, right: { label: "Right column", kind: "col", cap: 2 }, bottom: { label: "Bottom row", kind: "row", cap: 3 } },
      order: ["lead", "left", "right", "left", "right", "bottom", "bottom", "bottom"], leadCols: 1,
      thumb: [[0, 0, 14, 28], [17, 0, 26, 28], [46, 0, 14, 28], [0, 32, 60, 11]]
    },
    banner: {
      name: "Banner lead",
      rows: [[["lead"]], [["left"], ["mid"], ["right"]]],
      zones: { lead: { label: "Lead story (full width)", kind: "lead", cap: 1 }, left: { label: "Left column", kind: "col", cap: 2 }, mid: { label: "Middle column", kind: "col", cap: 2 }, right: { label: "Right column", kind: "col", cap: 2 } },
      order: ["lead", "left", "mid", "right", "left", "mid", "right"], leadCols: 3,
      thumb: [[0, 0, 60, 14], [0, 18, 18, 25], [21, 18, 18, 25], [42, 18, 18, 25]]
    },
    twocol: {
      name: "Two column",
      rows: [[["lead"], ["right", 290]], [["bottom"]]],
      zones: { lead: { label: "Lead story", kind: "lead", cap: 1 }, right: { label: "Side column", kind: "col", cap: 3 }, bottom: { label: "Bottom row", kind: "row", cap: 2 } },
      order: ["lead", "right", "right", "right", "bottom", "bottom"], leadCols: 2,
      thumb: [[0, 0, 39, 28], [42, 0, 18, 28], [0, 32, 60, 11]]
    },
    bulletin: {
      name: "Single column",
      maxw: 700,
      rows: [[["lead"]], [["left"]]],
      zones: { lead: { label: "Lead story", kind: "lead", cap: 1 }, left: { label: "Column", kind: "col", cap: 4 } },
      order: ["lead", "left", "left", "left", "left"], leadCols: 1,
      thumb: [[12, 0, 36, 14], [12, 17, 36, 7], [12, 27, 36, 7], [12, 37, 36, 6]]
    },
    broadsheet: {
      name: "Broadsheet",
      leadH: 44,
      rows: [[["lead", "2fr"], ["mid"], ["right"]], [["c1"], ["c2"], ["c3"], ["c4"]]],
      zones: { lead: { label: "Lead story (two columns)", kind: "lead", cap: 1 }, mid: { label: "Column 3", kind: "col", cap: 2 }, right: { label: "Column 4", kind: "col", cap: 2 },
        c1: { label: "Lower column 1", kind: "col", cap: 1 }, c2: { label: "Lower column 2", kind: "col", cap: 1 }, c3: { label: "Lower column 3", kind: "col", cap: 1 }, c4: { label: "Lower column 4", kind: "col", cap: 1 } },
      order: ["lead", "mid", "right", "c1", "c2", "c3", "c4", "mid", "right"], leadCols: 2,
      thumb: [[0, 0, 28.5, 20], [31.5, 0, 12.75, 20], [47.25, 0, 12.75, 20], [0, 24, 12.75, 19], [15.75, 24, 12.75, 19], [31.5, 24, 12.75, 19], [47.25, 24, 12.75, 19]]
    },
    sidebar: {
      name: "Left sidebar",
      rows: [[["left", 250], ["lead"]], [["bottom"]]],
      zones: { left: { label: "Sidebar", kind: "col", cap: 3 }, lead: { label: "Lead story", kind: "lead", cap: 1 }, bottom: { label: "Bottom row", kind: "row", cap: 3 } },
      order: ["lead", "left", "left", "left", "bottom", "bottom", "bottom"], leadCols: 2,
      thumb: [[0, 0, 16, 28], [19, 0, 41, 28], [0, 32, 60, 11]]
    },
    magazine: {
      name: "Magazine",
      rows: [[["lead", "3fr"], ["side", "2fr"]], [["bottom"]]],
      zones: { lead: { label: "Feature story", kind: "lead", cap: 1 }, side: { label: "Side stack", kind: "col", cap: 3 }, bottom: { label: "Bottom row", kind: "row", cap: 4 } },
      order: ["lead", "side", "side", "side", "bottom", "bottom", "bottom", "bottom"], leadCols: 2,
      thumb: [[0, 0, 35, 28], [38, 0, 22, 28], [0, 32, 60, 11]]
    },
    twin: {
      name: "Twin leads",
      leadH: 34,
      rows: [[["lead"], ["lead2"]], [["left"], ["mid"], ["right"]]],
      zones: { lead: { label: "Left lead", kind: "lead", cap: 1 }, lead2: { label: "Right lead", kind: "lead", cap: 1 },
        left: { label: "Left column", kind: "col", cap: 2 }, mid: { label: "Middle column", kind: "col", cap: 2 }, right: { label: "Right column", kind: "col", cap: 2 } },
      order: ["lead", "lead2", "left", "mid", "right", "left", "mid", "right"], leadCols: 1,
      thumb: [[0, 0, 28.5, 15], [31.5, 0, 28.5, 15], [0, 19, 18, 24], [21, 19, 18, 24], [42, 19, 18, 24]]
    },
    bands: {
      name: "Stacked bands",
      rows: [[["lead"]], [["strip"]], [["bottom"]]],
      zones: { lead: { label: "Lead story (full width)", kind: "lead", cap: 1 }, strip: { label: "Middle strip", kind: "row", cap: 3 }, bottom: { label: "Bottom strip", kind: "row", cap: 2 } },
      order: ["lead", "strip", "strip", "strip", "bottom", "bottom"], leadCols: 3,
      thumb: [[0, 0, 60, 12], [0, 15, 18, 13], [21, 15, 18, 13], [42, 15, 18, 13], [0, 31, 28.5, 12], [31.5, 31, 28.5, 12]]
    },
    triptych: {
      name: "Three columns",
      rows: [[["a"], ["b"], ["c"]]],
      zones: { a: { label: "Column 1", kind: "col", cap: 3 }, b: { label: "Column 2", kind: "col", cap: 3 }, c: { label: "Column 3", kind: "col", cap: 3 } },
      order: ["a", "b", "c", "a", "b", "c", "a", "b", "c"], leadCols: 1,
      thumb: [[0, 0, 18, 43], [21, 0, 18, 43], [42, 0, 18, 43]]
    }
  };

  var SPACE = { tight: { gap: 8, cpad: 11, rgap: 11 }, normal: { gap: 13, cpad: 15, rgap: 16 }, roomy: { gap: 20, cpad: 22, rgap: 24 } };
  var FSIZE = { small: 12, normal: 13, large: 14 };

  var uid = 0;
  function nid() { uid += 1; return "s" + Date.now().toString(36) + uid; }
  function story(o) { return Object.assign({ id: nid(), type: "story", zone: null, head: "", body: "", deck: "", dateline: "", caption: "", label: "", foot: "", frame: "double", img: null, imgId: "" }, o); }

  function defaults() {
    return {
      m: {
        title: "The Evening Meridian", tag: "And Gazette of the Harbour Company", date: "Harbourton, Tuesday, March 14, 1871", vol: "Volume XXV", motto: "The Voice of the Coast and Beyond",
        style: "chron", side: "ears", crest: null, crestId: "",
        eL: { l: "Weather", b: "Fair & Cool", s: "Haze lifting over the hills. Glass 30.12." },
        eR: { l: "Published daily", b: "Five Cents", s: "By licence of the Charter." }
      },
      layout: "chronicle", paper: "aged", look: "pencil", dropcap: true,
      space: "normal", fsize: "normal", rules: "line", pframe: "double", flip: false, sideW: 100,
      min: 5, maxFiller: 4, useFiller: true, builtin: true, custom: "", seed: 7,
      stories: [
        story({ head: "Parliament Calls the Charter to Council", deck: "Emergency powers to stand until the Crown is heard", dateline: "Harbourton, Mar. 14.", body: "By proclamation published last evening, the Governor has summoned the Assembly and the delegates of the great houses to meet on the first of April and consider the Charter, its sufficiency and its defects.\nThe state of emergency will remain in force until the Convocation has risen. An embassy will sail for the capital to ask the Crown for silver, rail iron and grain." }),
        story({ head: "Rails Reopen Through the Pass", dateline: "Stonebridge, Mar. 12.", body: "Amid cheers and the playing of the town band, the first train since the haze drew out of the station yesterday, carrying mail, grain and passengers for the interior." }),
        story({ head: "Telegraph Reaches the Hills", body: "Wires now connect the mining villages to the capital. Merchants expect orders to arrive in hours, not days." }),
        story({ type: "box", zone: "left", label: "The famous", head: "Dr. Penrose's Bitters", body: "Restorer of the liver, the nerves and the spirits.\nSold at all Company stores.", foot: "One Dollar the Bottle", frame: "double" }),
        story({ type: "box", zone: "right", label: "Harbourton, Monday", head: "The Exchange", body: "Wheat, per cental | $1.85\nFlour, per barrel | $6.40\nCrude oil, per barrel | $1.10\nCoal, per ton | $13.50\nOranges, per box | $2.25", frame: "solid" }),
        story({ head: "Wheat Up Two Shillings", body: "Poor harvests abroad push the price of grain higher at the Exchange." })
      ]
    };
  }

  var S = defaults();
  try {
    var raw = localStorage.getItem(STORE);
    if (raw) {
      var p = JSON.parse(raw), d = defaults();
      if (p && p.m && p.stories) S = Object.assign(d, p, { m: Object.assign(d.m, p.m, { eL: Object.assign(d.m.eL, p.m.eL), eR: Object.assign(d.m.eR, p.m.eR) }) });
    }
  } catch (e) {  }

  if (S.look === "engrave") S.look = "pencil";

  var opened = {}; if (S.stories[0]) opened[S.stories[0].id] = true;

  var saveT;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(function () {
      try { localStorage.setItem(STORE, JSON.stringify(S)); }
      catch (e) {
        try {
          var lite = JSON.parse(JSON.stringify(S)); lite.m.crest = null; lite.stories.forEach(function (s) { s.img = null; });
          localStorage.setItem(STORE, JSON.stringify(lite));
        } catch (e2) {  }
      }
    }, 400);
  }

  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function trunc(t, n) { t = String(t || "").trim(); if (t.length <= n) return t; return t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…"; }
  function rng(seed) { var a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function byId(id) { for (var i = 0; i < S.stories.length; i++) if (S.stories[i].id === id) return S.stories[i]; return null; }
  function isReal(s) { return s.type === "box" ? !!(s.head.trim() || s.body.trim()) : !!(s.head.trim() || s.body.trim() || s.img); }
  function L() { return LAYOUTS[S.layout] || LAYOUTS.chronicle; }

  function bank() {
    var out = [];
    if (S.builtin && window.FILLER) out = out.concat(window.FILLER.map(function (f) { return { h: f.h, b: f.b }; }));
    String(S.custom || "").split("\n").forEach(function (line) {
      var i = line.indexOf("|"); if (i < 0) return;
      var h = line.slice(0, i).trim(), b = line.slice(i + 1).trim();
      if (h) out.push({ h: h, b: b });
    });
    return out;
  }

  function plan() {
    var lay = L(), zones = Object.keys(lay.zones), items = {}, rem = {}, where = {};
    zones.forEach(function (z) { items[z] = []; rem[z] = lay.zones[z].cap; });
    var real = S.stories.filter(isReal), auto = [], held = [];
    real.forEach(function (s) {
      if (s.zone && lay.zones[s.zone]) { items[s.zone].push({ s: s }); rem[s.zone] -= 1; where[s.id] = s.zone; } else auto.push(s);
    });
    auto.forEach(function (s) {
      for (var i = 0; i < lay.order.length; i++) { var z = lay.order[i]; if (rem[z] > 0) { items[z].push({ s: s }); rem[z] -= 1; where[s.id] = z; return; } }
      held.push(s);
    });
    var realCount = real.length - held.length, fillerCount = 0;
    if (S.useFiller) {
      var r = rng(S.seed), pool = bank(), i;
      for (i = pool.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp; }
      var n = Math.min(S.maxFiller, pool.length);
      for (i = 0; i < lay.order.length && n > 0; i++) {
        var zz = lay.order[i];
        if (rem[zz] > 0) { var f = pool.pop(); items[zz].push({ s: story({ id: "f" + fillerCount, head: f.h, body: f.b }), filler: true }); rem[zz] -= 1; fillerCount += 1; n -= 1; }
      }
    }
    var total = realCount + fillerCount;
    return { items: items, held: held, where: where, real: realCount, filler: fillerCount, total: total, publish: total >= S.min };
  }

  function loadImg(src) { return new Promise(function (res, rej) { var i = new Image(); i.onload = function () { res(i); }; i.onerror = rej; i.src = src; }); }

  function blur(src, W, H, r) {
    var t = new Float32Array(src.length), o = new Float32Array(src.length), d = 2 * r + 1, x, y, sum, row;
    for (y = 0; y < H; y++) {
      row = y * W; sum = 0;
      for (x = -r; x <= r; x++) sum += src[row + Math.min(W - 1, Math.max(0, x))];
      for (x = 0; x < W; x++) { t[row + x] = sum / d; sum += src[row + Math.min(W - 1, x + r + 1)] - src[row + Math.max(0, x - r)]; }
    }
    for (x = 0; x < W; x++) {
      sum = 0;
      for (y = -r; y <= r; y++) sum += t[Math.min(H - 1, Math.max(0, y)) * W + x];
      for (y = 0; y < H; y++) { o[y * W + x] = sum / d; sum += t[Math.min(H - 1, y + r + 1) * W + x] - t[Math.max(0, y - r) * W + x]; }
    }
    return o;
  }

  function stylise(src, look, W, H) {
    return loadImg(src).then(function (img) {
      var c = document.createElement("canvas"); c.width = W; c.height = H;
      var x = c.getContext("2d", { willReadFrequently: true });
      var sc = Math.max(W / img.width, H / img.height), dw = img.width * sc, dh = img.height * sc;
      x.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      if (look === "original") return c.toDataURL("image/jpeg", 0.9);
      var d = x.getImageData(0, 0, W, H), px = d.data, n = W * H, g = new Float32Array(n), i, k, v, r = rng(W * 31 + H);
      for (i = 0; i < n; i++) g[i] = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2];

      if (look === "pencil") {
        var inv = new Float32Array(n);
        for (i = 0; i < n; i++) inv[i] = 255 - g[i];
        var rad = Math.max(2, Math.round(Math.max(W, H) / 75));
        var b = blur(blur(inv, W, H, rad), W, H, rad);
        for (i = 0; i < n; i++) {
          var dodge = Math.min(255, g[i] * 255 / (255 - b[i] + 1)) / 255;
          var dark = (1 - Math.pow(dodge, 1.5)) * 1.5 + 0.16 * (1 - g[i] / 255);
          dark = Math.max(0, Math.min(1, dark)) * (0.78 + 0.22 * r());
          px[i * 4] = 52; px[i * 4 + 1] = 46; px[i * 4 + 2] = 42; px[i * 4 + 3] = Math.round(dark * 245);
        }
      } else if (look === "photo") {
        var gb = blur(g, W, H, Math.max(1, Math.round(W / 600))), cx = W / 2, cy = H / 2, maxd = Math.sqrt(cx * cx + cy * cy), yy2, xx2;
        for (yy2 = 0; yy2 < H; yy2++) for (xx2 = 0; xx2 < W; xx2++) {
          i = yy2 * W + xx2;
          v = gb[i] / 255; v = Math.pow(v, 0.92); v = 0.1 + 0.8 * v;
          v += (r() - 0.5) * 0.09;
          var dx = xx2 - cx, dy = yy2 - cy, vg = Math.pow(Math.sqrt(dx * dx + dy * dy) / maxd, 2.2);
          v *= 1 - 0.6 * vg; v = Math.max(0, Math.min(1, v));
          px[i * 4] = 38 + (226 - 38) * v; px[i * 4 + 1] = 26 + (208 - 26) * v; px[i * 4 + 2] = 16 + (166 - 16) * v; px[i * 4 + 3] = 255;
        }
      }
      x.putImageData(d, 0, 0);
      if (look === "photo") {
        for (k = 0; k < 4; k++) { x.strokeStyle = "rgba(235,225,195," + (0.12 + r() * 0.15).toFixed(2) + ")"; x.lineWidth = 1; var sx = r() * W; x.beginPath(); x.moveTo(sx, 0); x.lineTo(sx + (r() - 0.5) * 6, H); x.stroke(); }
        for (k = 0; k < 50; k++) { x.fillStyle = "rgba(30,20,10," + (0.15 + r() * 0.3).toFixed(2) + ")"; x.beginPath(); x.arc(r() * W, r() * H, 0.6 + r() * 1.6, 0, 7); x.fill(); }
      }
      return c.toDataURL("image/png");
    });
  }

  function shrink(file) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onerror = rej;
      fr.onload = function () {
        loadImg(fr.result).then(function (img) {
          var m = Math.min(1, 1500 / Math.max(img.width, img.height));
          var c = document.createElement("canvas"); c.width = Math.round(img.width * m); c.height = Math.round(img.height * m);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          res(c.toDataURL("image/jpeg", 0.85));
        }, rej);
      };
      fr.readAsDataURL(file);
    });
  }

  var cache = {}, pending = {};
  function styled(src, id, look, size) {
    if (!src) return null;
    var key = id + "|" + look + "|" + size[0];
    if (cache[key]) return cache[key];
    if (!pending[key]) {
      pending[key] = true;
      stylise(src, look, size[0], size[1]).then(function (u) { cache[key] = u; delete pending[key]; render(); }, function () { delete pending[key]; });
    }
    return null;
  }

  (function noise() {
    var c = document.createElement("canvas"); c.width = c.height = 240;
    var x = c.getContext("2d"), d = x.createImageData(240, 240), i, a;
    for (i = 0; i < d.data.length; i += 4) { a = Math.random(); d.data[i] = 90; d.data[i + 1] = 62; d.data[i + 2] = 30; d.data[i + 3] = a < 0.5 ? 0 : Math.round(a * 46); }
    x.putImageData(d, 0, 0);
    document.documentElement.style.setProperty("--noise", "url(" + c.toDataURL("image/png") + ")");
  })();

  var paperEl = $("#paper"), holder = $("#holder");
  var arranging = false, drag = null, renderLater = false;

  function splitCols(paras, n) {
    var total = paras.join(" ").length, target = total / n, cols = [[]], count = 0;
    paras.forEach(function (p) {
      var words = p.split(/\s+/), cur = [], first = true;
      words.forEach(function (w) {
        cur.push(w); count += w.length + 1;
        if (cols.length < n && count >= target * cols.length) { cols[cols.length - 1].push({ t: cur.join(" "), cont: !first }); first = false; cur = []; cols.push([]); }
      });
      if (cur.length) cols[cols.length - 1].push({ t: cur.join(" "), cont: !first });
    });
    return cols.filter(function (c) { return c.length; });
  }

  function textHTML(s, kind, cols) {
    var body = trunc(s.body, LIMIT[kind]);
    var paras = body.split(/\n+/).map(function (p) { return p.trim(); }).filter(Boolean);
    var dl = (s.dateline || "").trim();
    if (!paras.length && !dl) return "";
    if (!paras.length) paras = [""];
    var prefix = "";
    var capOn = S.dropcap && kind !== "row" && (body.length > 110 || dl);
    if (dl) {
      prefix = (capOn ? '<span class="cap">' + esc(dl.charAt(0)) + "</span>" : "") + '<span class="dl">' + esc(capOn ? dl.slice(1) : dl) + "</span>— ";
    } else if (capOn && paras[0]) {
      prefix = '<span class="cap">' + esc(paras[0].charAt(0)) + "</span>"; paras[0] = paras[0].slice(1);
    }
    var first = true;
    function pHTML(c) {
      var h = '<p' + (c.cont ? ' class="cont"' : "") + ">" + (first ? prefix : "") + esc(c.t) + "</p>"; first = false; return h;
    }
    if (cols > 1 && body.length > 200) {
      var cc = splitCols(paras, cols);
      return '<div class="txt tcols">' + cc.map(function (col) { return "<div>" + col.map(pHTML).join("") + "</div>"; }).join("") + "</div>";
    }
    return '<div class="txt">' + paras.map(function (p) { return pHTML({ t: p, cont: false }); }).join("") + "</div>";
  }

  function blockHTML(slot, kind, leadCols) {
    var s = slot.s, cls = "blk" + (slot.filler ? " filler" : ""), idAttr = slot.filler ? "" : ' data-id="' + s.id + '"';
    if (s.type === "box") {
      var lines = String(s.body || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
        var i = l.indexOf("|");
        return i > 0 ? '<div class="trow"><span>' + esc(l.slice(0, i).trim()) + "</span><i></i><b>" + esc(l.slice(i + 1).trim()) + "</b></div>" : "<p>" + esc(l) + "</p>";
      }).join("");
      return '<aside class="' + cls + " box f-" + esc(s.frame) + '"' + idAttr + ">" + (s.label ? '<div class="b-label">' + esc(s.label) + "</div>" : "") +
        (s.head ? '<div class="b-title">' + esc(trunc(s.head, 40)) + "</div>" : "") + '<div class="b-body">' + lines + "</div>" + (s.foot ? '<div class="b-foot">' + esc(s.foot) + "</div>" : "") + "</aside>";
    }
    var img = styled(s.img, s.imgId, S.look, IMGSIZE[kind]);
    var fig = img ? '<figure><div class="fr"><img src="' + img + '" alt=""></div>' + (s.caption ? "<figcaption>" + esc(trunc(s.caption, 110)) + "</figcaption>" : "") + "</figure>" : "";
    var below = s.imgPos === "below", hs = s.hs === "s" || s.hs === "l" ? " hs-" + s.hs : "";
    return '<article class="' + cls + " k-" + kind + hs + '"' + idAttr + ">" + (below ? "" : fig) + (s.head ? "<h3>" + esc(trunc(s.head, HEADMAX)) + "</h3>" : "") +
      (s.deck ? '<div class="deck">' + esc(trunc(s.deck, 90)) + "</div>" : "") + textHTML(s, kind, kind === "lead" ? leadCols : 1) + (below ? fig : "") + "</article>";
  }

  function zoneHTML(z, res, lay) {
    var def = lay.zones[z], its = res.items[z];
    var style = def.kind === "row" ? ' style="grid-template-columns:repeat(' + Math.max(1, Math.min(4, its.length)) + ',minmax(0,1fr))"' : "";
    var inner = its.map(function (it) { return blockHTML(it, def.kind, lay.leadCols); }).join("");
    if (!its.length && arranging) inner = '<div class="ph">Drop a story here</div>';
    return '<div class="zone k-' + def.kind + '" data-zone="' + z + '" data-label="' + esc(def.label) + '"' + style + ">" + inner + "</div>";
  }

  function rowsHTML(res, lay) {
    var out = "";
    lay.rows.forEach(function (row) {
      var ordered = S.flip ? row.slice().reverse() : row;
      var present = ordered.filter(function (zr) { return arranging || res.items[zr[0]].length; });
      if (!present.length) return;
      var anyFlex = present.some(function (zr) { return typeof zr[1] !== "number"; });
      var tpl = present.map(function (zr) {
        var w = zr[1];
        if (typeof w === "number") return anyFlex && present.length > 1 ? Math.round(w * (S.sideW || 100) / 100) + "px" : "minmax(0,1fr)";
        if (typeof w === "string") return "minmax(0," + w + ")";
        return "minmax(0,1fr)";
      }).join(" ");
      out += '<div class="rowgrid" style="grid-template-columns:' + tpl + '">' + present.map(function (zr) { return zoneHTML(zr[0], res, lay); }).join("") + "</div>";
    });
    var sp = SPACE[S.space] || SPACE.normal, fs = FSIZE[S.fsize] || 13;
    var st = "--gap:" + sp.gap + "px;--cpad:" + sp.cpad + "px;--rgap:" + sp.rgap + "px;--fs:" + fs + "px;--leadh:" + (lay.leadH || 46) + "px;" + (lay.maxw ? "max-width:" + lay.maxw + "px;" : "");
    return '<div class="rows rl-' + esc(S.rules || "line") + " pf-" + esc(S.pframe || "double") + '" style="' + st + '">' + out + "</div>";
  }

  function earHTML(e) {
    return '<div class="ear">' + (e.l ? '<div class="l">' + esc(e.l) + "</div>" : "") + (e.b ? '<div class="b">' + esc(e.b) + "</div>" : "") + (e.s ? '<div class="s">' + esc(e.s) + "</div>" : "") + "</div>";
  }

  function ribbonSVG(side, pp, ink) {
    var bx = 110, tail = "0,30 " + bx + ",30 " + bx + ",166 0,166 28,98", fold = bx + ",136 " + bx + ",166 140,136";
    var g = '<polygon points="' + tail + '" fill="' + pp + '"/>' +
      '<polygon points="' + tail + '" fill="rgba(60,40,15,.24)" stroke="' + ink + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<polygon points="' + fold + '" fill="' + ink + '" fill-opacity=".78" stroke="' + ink + '" stroke-width="3" stroke-linejoin="round"/>';
    if (side === "r") g = '<g transform="translate(140 0) scale(-1 1)">' + g + "</g>";
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 166" width="280" height="332">' + g + "</svg>";
    return '<img class="rb-tail rb-' + side + '" alt="" src="data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) + '">';
  }
  function titleHTML(m) {
    var t = m.title || "Untitled Gazette";
    if (m.style === "banner") {
      var cs = getComputedStyle(paperEl), pp = cs.getPropertyValue("--pp").trim() || "#dccaa0", ink = cs.getPropertyValue("--ink2").trim() || "#2b2217";
      return ribbonSVG("l", pp, ink) + ribbonSVG("r", pp, ink) + '<span class="rb-mid">' + esc(t) + "</span>";
    }
    if (m.style !== "chron") return esc(t);
    var words = t.trim().split(/\s+/), out = "", i = 0;
    if (words.length > 1 && /^the$/i.test(words[0])) { out += '<span class="the">' + esc(words[0]) + "</span>"; i = 1; }
    for (; i < words.length; i++) {
      var w = words[i];
      out += '<span class="big">' + esc(w.charAt(0)) + "</span>" + esc(w.slice(1)) + (i < words.length - 1 ? " " : "");
    }
    return out;
  }

  function render() {
    if (drag && drag.on) { renderLater = true; return; }
    var res = plan(), lay = L();
    updateStatus(res); updateMeter(res); updateCounts(res);
    var skipped = $("#skipped");
    if (!res.publish) {
      holder.hidden = true; skipped.hidden = false;
      skipped.innerHTML = "<h2>Not enough stories yet</h2><p>" + res.total + " " + (res.total === 1 ? "story is" : "stories are") + " ready and the minimum is " + S.min +
        ". Add stories, allow more filler, or lower the minimum.</p><button type=\"button\" class=\"btn\" id=\"goRules\">Open sample settings</button>";
      var gr = $("#goRules"); if (gr) gr.onclick = function () { showTab("rules"); };
      return;
    }
    holder.hidden = false; skipped.hidden = true;
    paperEl.setAttribute("data-paper", S.paper);
    var m = S.m, side = m.side;
    var crest = m.crest ? styled(m.crest, m.crestId, S.look, [360, 360]) : null;
    var crestHTML = '<div class="crest">' + (crest ? '<img src="' + crest + '" alt="">' : "") + "</div>";
    var left = side === "ears" ? earHTML(m.eL) : side === "crest" ? crestHTML : "";
    var right = side === "ears" ? earHTML(m.eR) : side === "crest" ? crestHTML : "";
    var head = '<div class="mast' + (side === "none" ? " no-side" : "") + '">' + left +
      '<div class="title-wrap"><h1 class="title t-' + esc(m.style) + '">' + titleHTML(m) + "</h1>" + (m.tag ? '<p class="sub">' + esc(m.tag) + "</p>" : "") + "</div>" + right + "</div>" +
      '<div class="bar"><span>' + esc(m.vol) + "</span><i>" + esc(m.motto) + "</i><span>" + esc(m.date) + "</span></div>";
    paperEl.setAttribute("data-paper", S.paper);
    paperEl.innerHTML = '<div class="paper-in">' + head + rowsHTML(res, lay) + '</div><div class="grain"></div>';
    fitTitle(); fitScale();
  }

  var START = { chron: 64, banner: 46, gothic: 78, classic: 52 };
  function fitTitle() {
    var h = paperEl.querySelector(".title"); if (!h) return;
    var wrap = h.parentElement, sz = START[S.m.style] || 56, ban = S.m.style === "banner";
    h.style.fontSize = sz + "px";
    var avail = wrap.clientWidth;
    while (h.offsetWidth + (ban ? sz * 2.3 : 0) > avail && sz > 16) { sz -= 2; h.style.fontSize = sz + "px"; }
  }

  var zoomed = false;
  function fitScale() {
    var ps = $("#paperScale");
    var w = holder.clientWidth || PW, s = zoomed ? Math.min(1, Math.max(0.75, w / PW)) : Math.min(1, w / PW);
    ps.style.transform = "scale(" + s + ")";
    holder.style.height = Math.ceil(paperEl.offsetHeight * s) + "px";
  }
  window.addEventListener("resize", fitScale);
  if (window.ResizeObserver) new ResizeObserver(fitScale).observe(holder);

  function updateStatus(r) {
    var el = $("#status");
    if (r.publish) { el.className = "chip"; el.textContent = "Ready · " + r.real + (r.real === 1 ? " story" : " stories") + " of yours" + (r.filler ? ", " + r.filler + " sample" : ""); }
    else { el.className = "chip skip"; el.textContent = "Needs more stories · " + r.total + " of " + S.min; }
  }
  function updateMeter(r) {
    var lay = L(), html = Object.keys(lay.zones).map(function (z) {
      var n = r.items[z].length, cap = lay.zones[z].cap;
      return '<span class="slot-chip' + (n >= cap ? " full" : "") + '">' + esc(lay.zones[z].label) + " " + n + "/" + cap + "</span>";
    }).join("");
    if (r.held.length) html += '<span class="slot-chip over">' + r.held.length + " held back, no room</span>";
    $("#meter").innerHTML = html;
  }
  function updateCounts(r) {
    var lay = L();
    document.querySelectorAll("#storyList .card").forEach(function (card) {
      var s = byId(card.getAttribute("data-id")), c = card.querySelector("[data-count]"); if (!s || !c) return;
      var z = r.where[s.id], kind = s.type === "box" ? "box" : z ? lay.zones[z].kind : "col", lim = LIMIT[kind];
      c.textContent = s.body.length + " / " + lim + (s.type === "box" ? "" : " fit here");
      c.classList.toggle("hot", s.body.length > lim);
    });
  }

  var tabs = ["masthead", "stories", "layout", "rules"];
  function showTab(name) {
    tabs.forEach(function (t) {
      var on = t === name;
      $("#t-" + t).setAttribute("aria-selected", on ? "true" : "false");
      $("#tab-" + t).hidden = !on;
    });
  }
  tabs.forEach(function (t) { $("#t-" + t).addEventListener("click", function () { showTab(t); }); });

  function bindText(id, get, set) {
    var el = $(id); el.value = get();
    el.addEventListener("input", function () { set(el.value); save(); render(); });
  }
  bindText("#mTitle", function () { return S.m.title; }, function (v) { S.m.title = v; });
  bindText("#mTag", function () { return S.m.tag; }, function (v) { S.m.tag = v; });
  bindText("#mDate", function () { return S.m.date; }, function (v) { S.m.date = v; });
  bindText("#mVol", function () { return S.m.vol; }, function (v) { S.m.vol = v; });
  bindText("#mMotto", function () { return S.m.motto; }, function (v) { S.m.motto = v; });
  [["#eLl", "eL", "l"], ["#eLb", "eL", "b"], ["#eLs", "eL", "s"], ["#eRl", "eR", "l"], ["#eRb", "eR", "b"], ["#eRs", "eR", "s"]].forEach(function (a) {
    bindText(a[0], function () { return S.m[a[1]][a[2]]; }, function (v) { S.m[a[1]][a[2]] = v; });
  });
  bindText("#customFiller", function () { return S.custom; }, function (v) { S.custom = v; });

  function bindSel(id, key) { var el = $(id); el.value = S[key]; el.addEventListener("change", function () { S[key] = el.value; save(); render(); }); }
  bindSel("#paperSel", "paper"); bindSel("#imgStyle", "look");
  function bindNum(id, key, lo, hi) {
    var el = $(id); el.value = S[key];
    el.addEventListener("input", function () { var v = parseInt(el.value, 10); if (isNaN(v)) return; S[key] = Math.max(lo, Math.min(hi, v)); save(); render(); });
    el.addEventListener("blur", function () { el.value = S[key]; });
  }
  bindNum("#minStories", "min", 1, 12); bindNum("#maxFiller", "maxFiller", 0, 11);
  function bindChk(id, key) { var el = $(id); el.checked = !!S[key]; el.addEventListener("change", function () { S[key] = el.checked; save(); render(); }); }
  bindChk("#useFiller", "useFiller"); bindChk("#useBuiltin", "builtin"); bindChk("#dropcap", "dropcap");
  bindSel("#spaceSel", "space"); bindSel("#fsizeSel", "fsize"); bindSel("#rulesSel", "rules"); bindSel("#pframeSel", "pframe"); bindChk("#flip", "flip");
  (function () {
    var sw = $("#sideW"), val = $("#sideWVal");
    sw.value = S.sideW; val.textContent = S.sideW + "%";
    sw.addEventListener("input", function () { S.sideW = parseInt(sw.value, 10) || 100; val.textContent = S.sideW + "%"; save(); render(); });
  })();
  $("#builtinCount").textContent = "(" + (window.FILLER ? window.FILLER.length : 0) + " stories)";

  function syncStyleButtons() {
    document.querySelectorAll("#styleGrid .sty").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-style") === S.m.style ? "true" : "false"); });
  }
  $("#styleGrid").addEventListener("click", function (e) {
    var b = e.target.closest(".sty"); if (!b) return;
    S.m.style = b.getAttribute("data-style"); syncStyleButtons(); save(); render();
  });
  syncStyleButtons();

  function syncSide() {
    $("#earBox").hidden = S.m.side !== "ears"; $("#crestBox").hidden = S.m.side !== "crest";
    var t = $("#crestThumb"), rm = $("#crestRm");
    if (S.m.crest) { t.src = S.m.crest; t.hidden = false; rm.hidden = false; } else { t.hidden = true; rm.hidden = true; }
  }
  var sideSel = $("#mSide"); sideSel.value = S.m.side;
  sideSel.addEventListener("change", function () { S.m.side = sideSel.value; syncSide(); save(); render(); });
  $("#crestFile").addEventListener("change", function (e) {
    var f = e.target.files[0]; if (!f) return;
    shrink(f).then(function (u) { S.m.crest = u; S.m.crestId = nid(); syncSide(); save(); render(); });
    e.target.value = "";
  });
  $("#crestRm").addEventListener("click", function () { S.m.crest = null; syncSide(); save(); render(); });
  syncSide();

  function drawLayouts() {
    $("#layGrid").innerHTML = Object.keys(LAYOUTS).map(function (k) {
      var l = LAYOUTS[k], rects = l.thumb.map(function (r) { return '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" rx="1.5" fill="currentColor" opacity=".55"/>'; }).join("");
      return '<button type="button" role="radio" class="lay" data-lay="' + k + '" aria-checked="' + (S.layout === k) + '"><svg viewBox="0 0 60 44" aria-hidden="true">' + rects + "</svg><span>" + esc(l.name) + "</span></button>";
    }).join("");
  }
  $("#layGrid").addEventListener("click", function (e) {
    var b = e.target.closest(".lay"); if (!b) return;
    S.layout = b.getAttribute("data-lay"); drawLayouts(); drawList(); save(); render();
  });
  drawLayouts();

  function placeOptions(s) {
    var lay = L();
    return '<option value="">Auto</option>' + Object.keys(lay.zones).map(function (z) { return '<option value="' + z + '"' + (s.zone === z ? " selected" : "") + ">" + esc(lay.zones[z].label) + "</option>"; }).join("");
  }
  function moreFields(s) {
    if (s.type === "box") {
      return '<label class="field">Small label above <span class="opt">optional</span><input data-f="label" maxlength="30" value="' + esc(s.label) + '" autocomplete="off"></label>' +
        '<label class="field">Line below <span class="opt">optional</span><input data-f="foot" maxlength="40" value="' + esc(s.foot) + '" autocomplete="off"></label>' +
        '<label class="field">Frame<select data-f="frame"><option value="double"' + (s.frame === "double" ? " selected" : "") + '>Double line</option><option value="solid"' + (s.frame === "solid" ? " selected" : "") + '>Single line</option><option value="dotted"' + (s.frame === "dotted" ? " selected" : "") + ">Dotted</option></select></label>";
    }
    return '<label class="field">Dateline <span class="opt">optional, for example Harbourton, Mar. 14.</span><input data-f="dateline" maxlength="40" value="' + esc(s.dateline) + '" autocomplete="off"></label>' +
      '<label class="field">Sub-headline <span class="opt">optional</span><input data-f="deck" maxlength="90" value="' + esc(s.deck) + '" autocomplete="off"></label>' +
      '<label class="field">Picture caption <span class="opt">optional</span><input data-f="caption" maxlength="110" value="' + esc(s.caption) + '" autocomplete="off"></label>' +
      '<div class="row2"><label class="field">Headline size<select data-f="hs"><option value=""' + (!s.hs ? " selected" : "") + '>Normal</option><option value="s"' + (s.hs === "s" ? " selected" : "") + '>Smaller</option><option value="l"' + (s.hs === "l" ? " selected" : "") + '>Larger</option></select></label>' +
      '<label class="field">Picture position<select data-f="imgPos"><option value="top"' + (s.imgPos !== "below" ? " selected" : "") + '>Above text</option><option value="below"' + (s.imgPos === "below" ? " selected" : "") + ">Below text</option></select></label></div>";
  }
  function cardHTML(s, i, n) {
    var box = s.type === "box";
    return '<div class="card' + (opened[s.id] ? "" : " closed") + '" data-id="' + s.id + '">' +
      '<div class="card-top"><button type="button" class="card-title" data-act="toggle" aria-expanded="' + !!opened[s.id] + '"><span class="kind-badge">' + (box ? "Box" : "Story") + '</span><b>' + esc(s.head || "Untitled") + '</b><span class="chev" aria-hidden="true"></span></button><div class="tools">' +
      '<button type="button" class="mini" data-act="up" aria-label="Move up"' + (i === 0 ? " disabled" : "") + '>↑</button>' +
      '<button type="button" class="mini" data-act="down" aria-label="Move down"' + (i === n - 1 ? " disabled" : "") + '>↓</button>' +
      '<button type="button" class="del" data-act="del">Remove</button></div></div>' +
      '<label class="place">Place in <select data-f="zone">' + placeOptions(s) + "</select></label>" +
      '<label class="field">' + (box ? "Title" : "Headline") + '<input data-f="head" maxlength="' + HEADMAX + '" value="' + esc(s.head) + '" autocomplete="off"></label>' +
      '<label class="field">' + (box ? "Text" : "Story") + '<textarea data-f="body" rows="3" maxlength="' + LIMIT.lead + '">' + esc(s.body) + '</textarea><span class="count" data-count></span></label>' +
      (box ? "" : '<div class="imgrow"><label class="btn">' + (s.img ? "Change image" : "Add image") + '<input type="file" accept="image/*" data-act="file" class="sr"></label>' +
        (s.img ? '<img class="thumb" alt="" src="' + s.img + '"><button type="button" class="link" data-act="rmimg">Remove</button>' : "") + "</div>") +
      "<details><summary>More options</summary>" + moreFields(s) + "</details></div>";
  }
  function drawList() {
    var n = S.stories.length;
    var open = {}; document.querySelectorAll("#storyList details[open]").forEach(function (d) { open[d.closest(".card").getAttribute("data-id")] = true; });
    $("#storyList").innerHTML = n ? S.stories.map(function (s, i) { return cardHTML(s, i, n); }).join("") : '<p class="hint empty">No stories yet. Press "Add a story" to begin.</p>';
    document.querySelectorAll("#storyList .card").forEach(function (c) { if (open[c.getAttribute("data-id")]) c.querySelector("details").open = true; });
    $("#addStory").disabled = $("#addBox").disabled = n >= 24;
    render();
  }

  var list = $("#storyList");
  function onField(e) {
    var card = e.target.closest(".card"); if (!card) return;
    var s = byId(card.getAttribute("data-id")), f = e.target.getAttribute("data-f"); if (!s || !f) return;
    if (f === "head") { var ct = card.querySelector(".card-title b"); if (ct) ct.textContent = e.target.value || "Untitled"; }
    s[f] = f === "zone" ? (e.target.value || null) : e.target.value;
    save(); render();
  }
  list.addEventListener("input", onField);
  list.addEventListener("change", function (e) {
    if (e.target.getAttribute("data-act") === "file") {
      var card = e.target.closest(".card"), s = byId(card.getAttribute("data-id")), f = e.target.files[0];
      if (!s || !f) return;
      shrink(f).then(function (u) { s.img = u; s.imgId = nid(); save(); drawList(); });
      return;
    }
    if (e.target.tagName === "SELECT") onField(e);
  });
  list.addEventListener("click", function (e) {
    var card = e.target.closest(".card"); if (!card) return;
    var s = byId(card.getAttribute("data-id")), el = e.target.closest("[data-act]"), act = el ? el.getAttribute("data-act") : (e.target.closest(".card-top") ? "toggle" : null); if (!s || !act) return;
    var i = S.stories.indexOf(s);
    if (act === "toggle") { opened[s.id] = !opened[s.id]; drawList(); return; }
    if (act === "del") { S.stories.splice(i, 1); toast("Story removed.", function () { S.stories.splice(i, 0, s); save(); drawList(); }); }
    else if (act === "rmimg") s.img = null;
    else if (act === "up" && i > 0) { S.stories.splice(i, 1); S.stories.splice(i - 1, 0, s); }
    else if (act === "down" && i < S.stories.length - 1) { S.stories.splice(i, 1); S.stories.splice(i + 1, 0, s); }
    else return;
    save(); drawList();
  });
  function addItem(type) {
    var ns = story(type === "box" ? { type: "box", body: "" } : {}); opened[ns.id] = true; S.stories.push(ns);
    save(); drawList();
    var cards = list.querySelectorAll(".card"), last = cards[cards.length - 1];
    if (last) { var inp = last.querySelector("input[data-f=head]"); if (inp) { last.scrollIntoView({ block: "nearest" }); inp.focus(); } }
  }
  $("#addStory").addEventListener("click", function () { addItem("story"); });
  $("#addBox").addEventListener("click", function () { addItem("box"); });

  function focusCard(id) {
    showTab("stories"); if (!opened[id]) { opened[id] = true; drawList(); }
    var card = list.querySelector('.card[data-id="' + id + '"]'); if (!card) return;
    card.scrollIntoView({ block: "center", behavior: "smooth" }); card.classList.add("flash");
    setTimeout(function () { card.classList.remove("flash"); }, 1200);
    var inp = card.querySelector("input[data-f=head]"); if (inp) inp.focus({ preventScroll: true });
  }
  paperEl.addEventListener("click", function (e) {
    if (arranging) return;
    var b = e.target.closest(".blk[data-id]"); if (b) focusCard(b.getAttribute("data-id"));
  });

  var arrBtn = $("#btnArrange");
  arrBtn.addEventListener("click", function () {
    arranging = !arranging;
    holder.classList.toggle("arrange", arranging); arrBtn.setAttribute("aria-pressed", String(arranging)); $("#arrangeNote").hidden = !arranging;
    render();
  });

  var ghost = $("#ghost");
  function clearMarks() {
    paperEl.querySelectorAll(".drop-ok,.drop-before,.drop-end").forEach(function (n) { n.classList.remove("drop-ok", "drop-before", "drop-end"); });
  }
  function target(e) {
    var els = document.elementsFromPoint(e.clientX, e.clientY), zone = null, i;
    for (i = 0; i < els.length; i++) if (els[i].classList && els[i].classList.contains("zone") && paperEl.contains(els[i])) { zone = els[i]; break; }
    if (!zone) return null;
    var horiz = zone.classList.contains("k-row"), blocks = Array.prototype.filter.call(zone.children, function (c) { return c.classList.contains("blk") && c !== drag.el; }), before = null;
    for (i = 0; i < blocks.length; i++) {
      var r = blocks[i].getBoundingClientRect(), mid = horiz ? r.left + r.width / 2 : r.top + r.height / 2;
      if ((horiz ? e.clientX : e.clientY) < mid) { before = blocks[i]; break; }
    }
    return { zone: zone, before: before };
  }
  paperEl.addEventListener("pointerdown", function (e) {
    if (!arranging || e.button > 0) return;
    var b = e.target.closest(".blk[data-id]"); if (!b) return;
    drag = { id: b.getAttribute("data-id"), x: e.clientX, y: e.clientY, on: false, el: b };
    e.preventDefault();
  });
  window.addEventListener("pointermove", function (e) {
    if (!drag) return;
    if (!drag.on) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
      drag.on = true; drag.el.classList.add("is-drag");
      var s = byId(drag.id); ghost.textContent = (s && (s.head || "Untitled")) || "Story"; ghost.hidden = false;
    }
    ghost.style.left = e.clientX + "px"; ghost.style.top = e.clientY + "px";
    clearMarks();
    var t = target(e); if (!t) return;
    t.zone.classList.add("drop-ok");
    if (t.before) t.before.classList.add("drop-before"); else t.zone.classList.add("drop-end");
  });
  function endDrag(e, cancel) {
    if (!drag) return;
    var was = drag.on, t = was && !cancel ? target(e) : null, id = drag.id;
    ghost.hidden = true; clearMarks();
    if (drag.el) drag.el.classList.remove("is-drag");
    drag = null;
    if (t) {
      var s = byId(id);
      if (s) {
        s.zone = t.zone.getAttribute("data-zone");
        S.stories.splice(S.stories.indexOf(s), 1);
        var bid = t.before && t.before.getAttribute("data-id"), bs = bid && byId(bid);
        if (bs) S.stories.splice(S.stories.indexOf(bs), 0, s); else S.stories.push(s);
        save(); drawList(); return;
      }
    }
    if (renderLater) { renderLater = false; render(); }
  }
  window.addEventListener("pointerup", function (e) { endDrag(e, false); });
  window.addEventListener("pointercancel", function (e) { endDrag(e, true); });

  $("#btnCycle").addEventListener("click", function () { S.seed = (S.seed * 1103515245 + 12345) % 2147483647; save(); render(); });

  var dlg = $("#dlg");
  function closeDlg() { dlg.hidden = true; }
  $("#dlgClose").addEventListener("click", closeDlg);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDlg(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !dlg.hidden) closeDlg(); });

  $("#btnExport").addEventListener("click", function () {
    var btn = $("#btnExport");
    if (!plan().publish) { showTab("rules"); return; }
    if (typeof html2canvas !== "function") { $("#status").textContent = "Export library did not load."; return; }
    btn.disabled = true; btn.textContent = "Preparing…";
    html2canvas(paperEl, {
      scale: 2, backgroundColor: null, useCORS: true, logging: false, windowWidth: 1500,
      onclone: function (doc) {
        var ps = doc.getElementById("paperScale"); if (ps) ps.style.transform = "none";
        var h = doc.getElementById("holder"); if (h) { h.style.height = "auto"; h.style.overflow = "visible"; h.classList.remove("arrange"); }
        doc.querySelectorAll(".ph").forEach(function (n) { n.remove(); });
      }
    }).then(function (canvas) {
      var url = canvas.toDataURL("image/png");
      $("#dlgImg").src = url; $("#dlgDl").href = url; lastPng = url;
      $("#dlgDl").setAttribute("download", (S.m.title || "newspaper").replace(/[^\w]+/g, "-").toLowerCase() + ".png");
      dlg.hidden = false;
    }).catch(function () { $("#status").textContent = "Export failed. Try again."; })
      .then(function () { btn.disabled = false; btn.textContent = "Download image"; });
  });

  var toastT;
  function toast(msg, undo) {
    var t = $("#toast"); t.innerHTML = esc(msg) + (undo ? ' <button type="button" class="link" id="toastUndo">Undo</button>' : ""); t.hidden = false;
    if (undo) $("#toastUndo").onclick = function () { undo(); t.hidden = true; };
    clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 7000);
  }
  $("#clearAll").onclick = function () { var old = S.stories; S.stories = []; opened = {}; save(); drawList(); toast("All stories cleared.", function () { S.stories = old; save(); drawList(); }); };
  $("#resetSample").onclick = function () { var old = S.stories; S.stories = defaults().stories; opened = {}; opened[S.stories[0].id] = true; save(); drawList(); toast("Example stories loaded.", function () { S.stories = old; save(); drawList(); }); };
  var PRESETS = { victorian: { s: "chron", l: "chronicle", p: "aged", i: "pencil" }, modern: { s: "classic", l: "banner", p: "clean", i: "original" }, dark: { s: "gothic", l: "broadsheet", p: "dark", i: "photo" }, tabloid: { s: "banner", l: "magazine", p: "news", i: "photo" } };
  $("#presets").addEventListener("click", function (e) {
    var b = e.target.closest("[data-p]"), p = b && PRESETS[b.getAttribute("data-p")]; if (!p) return;
    S.m.style = p.s; S.layout = p.l; S.paper = p.p; S.look = p.i; $("#paperSel").value = p.p; $("#imgStyle").value = p.i;
    syncStyleButtons(); drawLayouts(); save(); drawList();
  });
  $("#tips").hidden = !!S.tipsOff;
  $("#tipsClose").onclick = function () { S.tipsOff = true; $("#tips").hidden = true; save(); };

  var lastPng = "";
  function slug() { return (S.m.title || "newspaper").replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "newspaper"; }
  function saveFile(name, blob) {
    function plain() {
      var a = document.createElement("a"), u = URL.createObjectURL(blob);
      a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(u); }, 4000); toast("Saved " + name + ".");
    }
    if (window.claude && window.claude.use) {
      window.claude.use("downloads").then(function (d) {
        if (!d) return plain();
        return d.save({ filename: name, data: blob }).then(function () { toast("Saved " + name + "."); }, function (err) { if (!err || err.code !== "declined") toast("Could not save the file."); });
      }, plain);
    } else plain();
  }
  function dataBlob(u) {
    var p = u.split(","), bin = atob(p[1]), n = bin.length, a = new Uint8Array(n);
    while (n--) a[n] = bin.charCodeAt(n);
    return new Blob([a], { type: "image/png" });
  }
  $("#dlgDl").addEventListener("click", function (e) { e.preventDefault(); if (lastPng) saveFile(slug() + ".png", dataBlob(lastPng)); });
  $("#btnSave").addEventListener("click", function () {
    saveFile(slug() + ".json", new Blob([JSON.stringify({ app: "pressroom", version: 2, data: S })], { type: "application/json" }));
  });
  function syncAll() {
    var m = S.m, v = { "#mTitle": m.title, "#mTag": m.tag, "#mDate": m.date, "#mVol": m.vol, "#mMotto": m.motto, "#eLl": m.eL.l, "#eLb": m.eL.b, "#eLs": m.eL.s, "#eRl": m.eR.l, "#eRb": m.eR.b, "#eRs": m.eR.s,
      "#customFiller": S.custom, "#paperSel": S.paper, "#imgStyle": S.look, "#spaceSel": S.space, "#fsizeSel": S.fsize, "#rulesSel": S.rules, "#pframeSel": S.pframe, "#mSide": m.side, "#minStories": S.min, "#maxFiller": S.maxFiller, "#sideW": S.sideW };
    Object.keys(v).forEach(function (k) { $(k).value = v[k]; });
    $("#sideWVal").textContent = S.sideW + "%";
    [["#useFiller", "useFiller"], ["#useBuiltin", "builtin"], ["#dropcap", "dropcap"], ["#flip", "flip"]].forEach(function (c) { $(c[0]).checked = !!S[c[1]]; });
    syncStyleButtons(); syncSide(); drawLayouts(); opened = {}; if (S.stories[0]) opened[S.stories[0].id] = true; drawList();
  }
  $("#projFile").addEventListener("change", function (e) {
    var f = e.target.files[0]; e.target.value = ""; if (!f) return;
    var fr = new FileReader();
    fr.onerror = function () { toast("Could not read that file."); };
    fr.onload = function () {
      try {
        var p = JSON.parse(fr.result); p = p && p.app === "pressroom" ? p.data : p;
        if (!p || !p.m || !Array.isArray(p.stories)) throw new Error("bad");
        var old = S, d = defaults();
        S = Object.assign(d, p, { m: Object.assign(d.m, p.m, { eL: Object.assign(d.m.eL, p.m.eL), eR: Object.assign(d.m.eR, p.m.eR) }) });
        S.stories = S.stories.map(function (s) { return Object.assign(story({}), s); });
        if (S.look === "engrave") S.look = "pencil";
        syncAll(); save(); toast("Project opened.", function () { S = old; syncAll(); save(); });
      } catch (err) { toast("That file is not a Press Room project."); }
    };
    fr.readAsText(f);
  });

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function roman(n) {
    var r = "";
    [[50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].forEach(function (x) { while (n >= x[0]) { r += x[1]; n -= x[0]; } });
    return r;
  }
  function randomPaper() {
    var old = S, town = pick(["Harbourton", "Stonebridge", "Millfield", "Ashford", "Brackenridge", "Westmere", "Larkhaven"]);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var mo = Math.floor(Math.random() * 12), dd = 1 + Math.floor(Math.random() * 28), yr = 1860 + Math.floor(Math.random() * 40);
    var m = Object.assign({}, old.m, {
      title: "The " + pick(["Evening", "Morning", "Daily", "Weekly", "Harbour", "Valley", "Northern", "Royal", "Borough", "County", "Coastal", "Midland"]) + " " + pick(["Meridian", "Gazette", "Herald", "Courier", "Chronicle", "Sentinel", "Telegraph", "Bugle", "Standard", "Dispatch", "Observer", "Beacon"]),
      tag: pick(["And Gazette of the Harbour Company", "The Paper of Record for the Valley", "Independent in All Things", "A Journal of News, Trade and Letters", "Devoted to Commerce, Letters and the Public Good"]),
      date: town + ", " + pick(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]) + ", " + months[mo] + " " + dd + ", " + yr,
      vol: "Volume " + roman(3 + Math.floor(Math.random() * 57)),
      motto: pick(["The Voice of the Coast and Beyond", "Truth, Trade and Good Order", "First with the News of the Day", "For the People of the Valley", "Light in Every Household"]),
      style: pick(["chron", "banner", "gothic", "classic"]), side: pick(["ears", "ears", "ears", "none"]),
      eL: { l: "Weather", b: pick(["Fair & Cool", "Clear & Warm", "Rain Likely", "Fog at Dawn", "Brisk Winds"]), s: pick(["Glass steady at 30.10.", "Haze lifting over the hills.", "Clouds clearing by noon.", "Sea mist along the quay."]) },
      eR: { l: pick(["Published daily", "Published weekly", "Printed every evening"]), b: pick(["One Penny", "Two Cents", "Three Cents", "Five Cents"]), s: pick(["By licence of the Charter.", "Subscriptions taken at the office.", "Sold by all newsagents."]) }
    });
    var next = Object.assign({}, old, { m: m, layout: pick(Object.keys(LAYOUTS)), paper: pick(["aged", "clean", "news", "dark"]), look: pick(["pencil", "photo"]),
      space: pick(["tight", "normal", "normal", "roomy"]), rules: pick(["line", "line", "double", "none"]), pframe: pick(["double", "single"]), flip: Math.random() < 0.25,
      fsize: "normal", sideW: 100, dropcap: Math.random() < 0.7, seed: 1 + Math.floor(Math.random() * 1000000) });
    var lay = LAYOUTS[next.layout], cap = Object.keys(lay.zones).reduce(function (t, z) { return t + lay.zones[z].cap; }, 0);
    var total = Math.max(4, cap - Math.floor(Math.random() * 3)), nBox = total >= 6 ? 2 : 1, list = [], i;
    var pool = (window.FILLER || []).slice().sort(function () { return Math.random() - 0.5; });
    for (i = 0; i < total - nBox && pool.length; i++) {
      var f = pool.pop();
      list.push(story({ head: f.h, body: i === 0 && pool.length > 2 ? [f.b, pool.pop().b, pool.pop().b].join("\n") : f.b, deck: i === 0 ? pick(["Emergency powers to stand until the Crown is heard", "Merchants and farmers await the result", "The council will sit again on Monday"]) : "", dateline: i % 2 === 0 ? town + ", " + months[mo].slice(0, 3) + ". " + dd + "." : "" }));
    }
    var boxes = [
      story({ type: "box", label: "The famous", head: "Dr. Penrose's Bitters", body: "Restorer of the liver, the nerves and the spirits.\nSold at all stores.", foot: "One Dollar the Bottle", frame: "double" }),
      story({ type: "box", label: town + ", Monday", head: "The Exchange", body: ["Wheat, per cental", "Flour, per barrel", "Coal, per ton", "Oranges, per box"].map(function (n) { return n + " | $" + (1 + Math.random() * 12).toFixed(2); }).join("\n"), frame: "solid" }),
      story({ type: "box", label: "Notice", head: "Lost: One Umbrella", body: "Left at the tram stop on Monday. Please return to the office of this paper.", frame: "dotted" })
    ].sort(function () { return Math.random() - 0.5; }).slice(0, nBox);
    boxes.forEach(function (b, k) { list.splice(Math.min(list.length, 2 + 2 * k), 0, b); });
    next.stories = list;
    S = next; syncAll(); save();
    toast("Made a new paper. Press again for another.", function () { S = old; syncAll(); save(); });
  }
  $("#btnRandom").addEventListener("click", randomPaper);
  $("#btnZoom").addEventListener("click", function () {
    zoomed = !zoomed; holder.classList.toggle("zoomed", zoomed);
    this.textContent = zoomed ? "Fit to screen" : "Zoom preview"; this.setAttribute("aria-pressed", zoomed); fitScale();
  });

  drawList();
  if (document.fonts && document.fonts.load) {
    Promise.all(['64px "Abril Fatface"', '46px "Rye"', '78px "UnifrakturCook"', '700 52px "Old Standard TT"', '400 13px "Old Standard TT"', 'italic 13px "IM Fell English"', '12px "IM Fell English SC"', '700 10px "Cinzel"', '900 18px "Playfair Display"'].map(function (f) { return document.fonts.load(f); }))
      .then(function () { return document.fonts.ready; }).then(render, render);
  }
  window.__pressroom = { plan: plan, state: function () { return S; } };
})();
