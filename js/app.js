/*
  页面逻辑：读表单 → 画到画布 → 缩小预览 → 导出 PNG。
  模板的 HTML 在 js/templates.js，样子在 css/templates.css。
  这个文件一般不用改，除非你想加新的输入项（比如第二个角标）。
*/

const SIZES = {
  xhs: { w: 1080, h: 1440, name: "小红书", ratio: "3:4" },
  dy: { w: 1080, h: 1920, name: "抖音", ratio: "9:16" },
};

const $ = (id) => document.getElementById(id);

const artboard = $("artboard");
const scaler = $("scaler");
const stage = $("stage");

const els = {
  title: $("title"),
  keyword: $("keyword"),
  subtitle: $("subtitle"),
  tag: $("tag"),
  highlight: $("highlight"),
  bg: $("bg"),
  fg: $("fg"),
  accent: $("accent"),
  bgHex: $("bgHex"),
  fgHex: $("fgHex"),
  accentHex: $("accentHex"),
  file: $("file"),
  clearImg: $("clearImg"),
  thumb: $("thumb"),
  scrimWrap: $("scrimWrap"),
  scrim: $("scrim"),
  scrimText: $("scrimText"),
  presets: $("presets"),
  exportBtn: $("exportBtn"),
  exportMeta: $("exportMeta"),
  msg: $("msg"),
  caption: $("caption"),
  titleCount: $("titleCount"),
  kwHint: $("kwHint"),
  useSample: $("useSample"),
};

const first = TEMPLATES[0];
const params = new URLSearchParams(location.search);

const state = {
  templateId: TEMPLATES.some((t) => t.id === params.get("tpl")) ? params.get("tpl") : first.id,
  size: params.get("size") === "dy" ? "dy" : "xhs",
  title: "",
  keyword: "",
  subtitle: "",
  tag: "",
  highlight: true,
  bg: first.defaults.bg,
  fg: first.defaults.fg,
  accent: first.defaults.accent,
  image: "",
  scrim: 42,
};

if (params.get("view") === "board") document.body.classList.add("view-board");

let renderedKey = "";

function currentTemplate() {
  return TEMPLATES.find((t) => t.id === state.templateId) || TEMPLATES[0];
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

/* 把标题里的关键词包进 <span class="kw">。支持两种写法：
   1. 标题里用【】包住，例如：做出【爆款】封面
   2. 不写括号，用「高亮词」输入框里的词去标题里找
   【】优先。括号本身不会出现在封面上。 */
function buildTitleHtml(raw, keyword, enabled) {
  const keys = [];
  const re = /【([^】]+)】/g;
  let match;
  while ((match = re.exec(raw))) keys.push(match[1]);
  const text = raw.replace(/【([^】]*)】/g, "$1");
  const highlights = !enabled ? [] : keys.length ? keys : keyword ? [keyword] : [];
  if (!highlights.length) return escapeHtml(text).replace(/\n/g, "<br>");

  const ranges = [];
  highlights.forEach((k) => {
    if (!k) return;
    let from = 0;
    while (from <= text.length - k.length) {
      const at = text.indexOf(k, from);
      if (at < 0) break;
      ranges.push([at, at + k.length]);
      from = at + k.length;
    }
  });
  ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const merged = [];
  ranges.forEach((range) => {
    const last = merged[merged.length - 1];
    if (!last || range[0] > last[1]) merged.push(range.slice());
    else last[1] = Math.max(last[1], range[1]);
  });

  let html = "";
  let cursor = 0;
  merged.forEach(([a, b]) => {
    html += escapeHtml(text.slice(cursor, a)).replace(/\n/g, "<br>");
    html += `<span class="kw">${escapeHtml(text.slice(a, b)).replace(/\n/g, "<br>")}</span>`;
    cursor = b;
  });
  html += escapeHtml(text.slice(cursor)).replace(/\n/g, "<br>");
  return html;
}

function firstBracket(raw) {
  const match = String(raw).match(/【([^】]+)】/);
  return match ? match[1] : "";
}

function isLight(hex) {
  const h = String(hex || "").replace("#", "");
  if (h.length !== 6) return true;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function countChars(s) {
  return [...String(s).replace(/\n/g, "")].length;
}

function viewModel() {
  const titleHtml = buildTitleHtml(state.title, state.keyword.trim(), state.highlight);
  const plain = (state.keyword || state.title || "注").replace(/[【】\s]/g, "");
  return {
    titleHtml: titleHtml || `<span class="ghost">在这里写标题</span>`,
    subtitleHtml: escapeHtml(state.subtitle).replace(/\n/g, "<br>"),
    tagHtml: escapeHtml(state.tag.replace(/\s+/g, " ").trim()),
    markChar: escapeHtml([...plain][0] || "注"),
    photo: state.image ? `background-image:url('${state.image}')` : "",
    size: state.size,
  };
}

/* 只有这些会改变画布里的 HTML 结构。颜色和文案只改 CSS 变量或文字，避免背景图闪一下。 */
function structuralKey() {
  const img = state.image ? state.image.length + ":" + state.image.slice(-24) : "";
  return state.templateId + "\n" + state.size + "\n" + img;
}

function applyVars() {
  artboard.style.setProperty("--bg", state.bg);
  artboard.style.setProperty("--fg", state.fg);
  artboard.style.setProperty("--accent", state.accent);
  artboard.style.setProperty("--on-accent", isLight(state.accent) ? "#1a1a1a" : "#ffffff");
  artboard.style.setProperty("--photo-dim", state.image ? String(state.scrim / 100) : "0");
  artboard.style.setProperty("--line", isLight(state.bg) ? "rgba(70, 110, 150, 0.28)" : "rgba(255,255,255,0.14)");
}

function fullRender() {
  const tpl = currentTemplate();
  const d = viewModel();
  artboard.className = [
    "artboard",
    "tpl-" + tpl.id,
    "size-" + state.size,
    state.image ? "has-image" : "no-photo",
  ].join(" ");
  applyVars();
  artboard.innerHTML = tpl.render(d);
}

function updateBound() {
  const d = viewModel();
  const map = {
    title: d.titleHtml,
    subtitle: d.subtitleHtml,
    tag: d.tagHtml,
    mark: d.markChar,
  };
  artboard.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (map[key] == null) return;
    if (el.getAttribute("data-current") !== map[key]) {
      el.innerHTML = map[key];
      el.setAttribute("data-current", map[key]);
    }
  });
  artboard.classList.toggle("no-tag", !state.tag.trim());
  artboard.classList.toggle("has-tag", !!state.tag.trim());
}

/* 从 data-fit-max 开始往下减字号，直到文字落在 max-height 里面。 */
function fitText(root) {
  (root || artboard).querySelectorAll("[data-fit]").forEach((el) => {
    const max = Number(el.getAttribute("data-fit-max")) || 120;
    const min = Number(el.getAttribute("data-fit-min")) || 24;
    let size = max;
    el.style.fontSize = size + "px";
    let guard = 0;
    while (
      size > min &&
      guard < 80 &&
      (el.scrollHeight > el.clientHeight + 4 || el.scrollWidth > el.clientWidth + 4)
    ) {
      guard += 1;
      size -= 2;
      el.style.fontSize = size + "px";
    }
  });
}

function layoutPreview() {
  const boardMode = document.body.classList.contains("view-board");
  const w = artboard.offsetWidth;
  const h = artboard.offsetHeight;
  if (boardMode) {
    artboard.style.transform = "none";
    scaler.style.width = w + "px";
    scaler.style.height = h + "px";
    return;
  }
  const bounds = stage.getBoundingClientRect();
  const scale = Math.min((bounds.width - 28) / w, (bounds.height - 28) / h);
  const safe = Number.isFinite(scale) && scale > 0 ? scale : 0.3;
  artboard.style.transform = `scale(${safe})`;
  scaler.style.width = Math.round(w * safe) + "px";
  scaler.style.height = Math.round(h * safe) + "px";
}

function paint() {
  const key = structuralKey();
  if (key !== renderedKey) {
    fullRender();
    renderedKey = key;
  } else {
    applyVars();
  }
  updateBound();
  fitText();
  layoutPreview();
  const size = SIZES[state.size];
  const tpl = currentTemplate();
  els.caption.textContent = `预览已缩小 · 下载的 PNG 是 ${size.w} × ${size.h}（${tpl.name}）`;
  els.exportMeta.textContent = `${size.name} ${size.ratio} · ${size.w} × ${size.h} 像素`;
  document.title = `大字封面 · ${tpl.name}`;
  updateKwHint();
}

function updateKwHint() {
  const kw = state.keyword.trim();
  const stripped = state.title.replace(/【([^】]*)】/g, "$1");
  const n = countChars(state.title);
  els.titleCount.textContent = n > 22 ? `${n} 字，导出时会自动缩小` : `${n} 字`;
  els.titleCount.classList.toggle("warn", n > 22);
  if (!state.highlight || !kw) {
    els.kwHint.textContent = "用【】包住要高亮的字，或在这里填写。";
    els.kwHint.classList.remove("warn");
    return;
  }
  if (!stripped.includes(kw)) {
    els.kwHint.textContent = "标题里没有这个词，封面上不会出现高亮。";
    els.kwHint.classList.add("warn");
    return;
  }
  els.kwHint.textContent = firstBracket(state.title)
    ? "已按标题里的【】高亮。"
    : "会高亮标题中的这个词。";
  els.kwHint.classList.remove("warn");
}

function syncForm() {
  els.title.value = state.title;
  els.keyword.value = state.keyword;
  els.subtitle.value = state.subtitle;
  els.tag.value = state.tag;
  els.highlight.checked = state.highlight;
  els.bg.value = state.bg;
  els.fg.value = state.fg;
  els.accent.value = state.accent;
  els.scrim.value = String(state.scrim);
  els.bgHex.textContent = state.bg;
  els.fgHex.textContent = state.fg;
  els.accentHex.textContent = state.accent;
  els.scrimText.textContent = `图片变暗 ${state.scrim}%`;
  const hasImg = !!state.image;
  els.clearImg.hidden = !hasImg;
  els.thumb.hidden = !hasImg;
  els.scrimWrap.hidden = !hasImg;
  if (hasImg) els.thumb.style.backgroundImage = `url('${state.image}')`;
  updateSizeButtons();
  updateTemplateButtons();
  renderPresets();
}

function updateSizeButtons() {
  document.querySelectorAll(".size-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.size === state.size);
  });
}

function updateTemplateButtons() {
  document.querySelectorAll(".tpl-card").forEach((btn) => {
    const on = btn.dataset.id === state.templateId;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
}

function renderTemplateButtons() {
  const grid = $("tplGrid");
  grid.innerHTML = "";
  TEMPLATES.forEach((tpl) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tpl-card";
    btn.dataset.id = tpl.id;
    btn.setAttribute("role", "option");
    const mini = document.createElement("span");
    mini.className = "mini mini-" + tpl.id;
    mini.setAttribute("aria-hidden", "true");
    mini.style.setProperty("--bg", tpl.defaults.bg);
    mini.style.setProperty("--fg", tpl.defaults.fg);
    mini.style.setProperty("--accent", tpl.defaults.accent);
    const meta = document.createElement("span");
    meta.className = "tpl-meta";
    const name = document.createElement("strong");
    name.textContent = tpl.name;
    const desc = document.createElement("small");
    desc.textContent = tpl.desc;
    meta.append(name, desc);
    btn.append(mini, meta);
    btn.addEventListener("click", () => selectTemplate(tpl.id));
    grid.appendChild(btn);
  });
}

function renderPresets() {
  els.presets.innerHTML = "";
  currentTemplate().presets.forEach((preset) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "preset";
    ["bg", "fg", "accent"].forEach((key) => {
      const dot = document.createElement("i");
      dot.style.background = preset[key];
      btn.appendChild(dot);
    });
    const label = document.createElement("b");
    label.textContent = preset.name;
    btn.appendChild(label);
    btn.addEventListener("click", () => {
      state.bg = preset.bg;
      state.fg = preset.fg;
      state.accent = preset.accent;
      syncForm();
      paint();
    });
    els.presets.appendChild(btn);
  });
}

function textMatches(tpl) {
  const d = tpl.defaults;
  return state.title === d.title && state.keyword === d.keyword && state.subtitle === d.subtitle && state.tag === d.tag;
}

function applyText(tpl) {
  state.title = tpl.defaults.title;
  state.keyword = tpl.defaults.keyword;
  state.subtitle = tpl.defaults.subtitle;
  state.tag = tpl.defaults.tag;
}

function selectTemplate(id) {
  const prev = currentTemplate();
  const keepText = !textMatches(prev);
  state.templateId = id;
  const next = currentTemplate();
  if (!keepText) applyText(next);
  state.bg = next.defaults.bg;
  state.fg = next.defaults.fg;
  state.accent = next.defaults.accent;
  syncForm();
  paint();
}

function selectSize(size) {
  state.size = size === "dy" ? "dy" : "xhs";
  syncForm();
  paint();
}

function setMsg(text, kind) {
  els.msg.textContent = text || "";
  els.msg.className = "msg" + (kind ? " " + kind : "");
}

function fileName() {
  const size = SIZES[state.size];
  return `封面-${currentTemplate().name}-${size.w}x${size.h}.png`;
}

async function ensureFonts() {
  await document.fonts.ready;
  await Promise.all([
    document.fonts.load('120px "QingKe"'),
    document.fonts.load('80px "KuaiLe"'),
    document.fonts.load('120px "MaShan"'),
    document.fonts.load('120px "XiaoWei"'),
  ]);
}

/* 双击 index.html 时，浏览器不让脚本读取外部 CSS 文件。
   所以导出前把每个元素已经算好的样式写进标签，字体用 fonts.js 里的那一份。 */
function inlineComputed(source, clone, isRoot) {
  const computed = getComputedStyle(source);
  for (let i = 0; i < computed.length; i++) {
    const prop = computed.item(i);
    if (isRoot && prop === "transform") continue;
    clone.style.setProperty(prop, computed.getPropertyValue(prop), computed.getPropertyPriority(prop));
  }
  if (isRoot) {
    clone.style.setProperty("transform", "none");
    clone.style.setProperty("position", "relative");
    clone.style.setProperty("left", "0px");
    clone.style.setProperty("top", "0px");
    clone.style.setProperty("margin", "0px");
  }
  const srcKids = source.children;
  const cloneKids = clone.children;
  for (let i = 0; i < srcKids.length; i++) {
    if (cloneKids[i]) inlineComputed(srcKids[i], cloneKids[i], false);
  }
}

async function exportCanvas() {
  await ensureFonts();
  fitText();
  const size = SIZES[state.size];
  const node = artboard.cloneNode(true);
  node.removeAttribute("id");
  inlineComputed(artboard, node, true);
  node.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

  const css = (window.COVER_FONT_CSS || "").replace(/]]>/g, "]]]]><![CDATA[>");
  let markup = new XMLSerializer().serializeToString(node).replace(/<br>/g, "<br/>");
  const svg =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size.w}" height="${size.h}">` +
    `<foreignObject x="0" y="0" width="${size.w}" height="${size.h}">` +
    `<div xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;width:${size.w}px;height:${size.h}px;overflow:hidden">` +
    `<style><![CDATA[\n${css}\n]]></style>` +
    markup +
    `</div></foreignObject></svg>`;

  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("导出失败"));
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });

  const canvas = document.createElement("canvas");
  canvas.width = size.w;
  canvas.height = size.h;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = state.bg;
  ctx.fillRect(0, 0, size.w, size.h);
  ctx.drawImage(img, 0, 0, size.w, size.h);
  return canvas;
}

function downloadCanvas(canvas, name) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = name;
  link.click();
}

async function exportPng() {
  els.exportBtn.disabled = true;
  const old = els.exportBtn.textContent;
  els.exportBtn.textContent = "正在生成…";
  setMsg("正在按原尺寸绘制…");
  try {
    const canvas = await exportCanvas();
    const size = SIZES[state.size];
    if (canvas.width !== size.w || canvas.height !== size.h) {
      throw new Error(`尺寸不对：${canvas.width}×${canvas.height}`);
    }
    const name = fileName();
    downloadCanvas(canvas, name);
    setMsg(`已下载 ${name}`, "ok");
  } catch (err) {
    console.error(err);
    setMsg("导出失败了。请换一张图片，或用 Chrome / Edge 再试一次。", "err");
  } finally {
    els.exportBtn.disabled = false;
    els.exportBtn.textContent = old;
  }
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\/(png|jpeg|webp|gif)$/.test(file.type)) {
      reject(new Error("请换一张 JPG、PNG 或 WebP"));
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      reject(new Error("图片超过 12MB，请先压缩一下"));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const maxEdge = 1920;
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("这张图片读不了"));
    };
    img.src = url;
  });
}

async function useImageFile(file) {
  try {
    state.image = await readImage(file);
    syncForm();
    paint();
    setMsg("背景图只留在这台电脑上，不会上传。", "ok");
  } catch (err) {
    setMsg(err.message || "图片读取失败", "err");
  }
}

function bind() {
  els.title.addEventListener("input", () => {
    state.title = els.title.value;
    const wrapped = firstBracket(state.title);
    if (wrapped) {
      state.keyword = wrapped;
      els.keyword.value = wrapped;
    }
    paint();
  });
  els.keyword.addEventListener("input", () => {
    state.keyword = els.keyword.value;
    paint();
  });
  els.subtitle.addEventListener("input", () => {
    state.subtitle = els.subtitle.value;
    paint();
  });
  els.tag.addEventListener("input", () => {
    state.tag = els.tag.value;
    paint();
  });
  els.highlight.addEventListener("change", () => {
    state.highlight = els.highlight.checked;
    paint();
  });

  [["bg", "bg"], ["fg", "fg"], ["accent", "accent"]].forEach(([inputKey, stateKey]) => {
    els[inputKey].addEventListener("input", () => {
      state[stateKey] = els[inputKey].value;
      els[inputKey + "Hex"].textContent = state[stateKey];
      paint();
    });
  });

  els.scrim.addEventListener("input", () => {
    state.scrim = Number(els.scrim.value);
    els.scrimText.textContent = `图片变暗 ${state.scrim}%`;
    paint();
  });

  els.file.addEventListener("change", () => {
    const file = els.file.files && els.file.files[0];
    els.file.value = "";
    if (file) useImageFile(file);
  });
  els.clearImg.addEventListener("click", () => {
    state.image = "";
    syncForm();
    paint();
    setMsg("");
  });

  els.useSample.addEventListener("click", () => {
    applyText(currentTemplate());
    syncForm();
    paint();
  });

  document.querySelectorAll(".size-switch button").forEach((btn) => {
    btn.addEventListener("click", () => selectSize(btn.dataset.size));
  });

  els.exportBtn.addEventListener("click", exportPng);
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      exportPng();
    }
  });

  stage.addEventListener("dragover", (event) => {
    event.preventDefault();
    stage.classList.add("drag");
  });
  stage.addEventListener("dragleave", () => stage.classList.remove("drag"));
  stage.addEventListener("drop", (event) => {
    event.preventDefault();
    stage.classList.remove("drag");
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) useImageFile(file);
  });

  window.addEventListener("resize", layoutPreview);
}

function installFonts() {
  if (!window.COVER_FONT_CSS || document.getElementById("cover-fonts")) return;
  const style = document.createElement("style");
  style.id = "cover-fonts";
  style.textContent = window.COVER_FONT_CSS;
  document.head.appendChild(style);
}

function boot() {
  installFonts();
  applyText(currentTemplate());
  // 启动时用该模板自己的默认色，而不是清单里第一个模板的颜色。
  const tpl = currentTemplate();
  state.bg = tpl.defaults.bg;
  state.fg = tpl.defaults.fg;
  state.accent = tpl.defaults.accent;
  renderTemplateButtons();
  bind();
  syncForm();
  paint();
  ensureFonts().then(() => {
    fitText();
    layoutPreview();
  });
}

// 和「下载 PNG」同一条路，方便本地核对尺寸。页面按钮走 exportPng()。
window.__exportCover = async () => {
  const canvas = await exportCanvas();
  return {
    width: canvas.width,
    height: canvas.height,
    name: fileName(),
    dataUrl: canvas.toDataURL("image/png"),
  };
};

boot();
