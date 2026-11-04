/*
  模板清单
  ----------------------------------------------------------------
  新增一个模板只要 4 步：

  1. 复制下面任意一个 { ... } 对象（逗号别漏）。
  2. 改 id（英文，不要空格）、name、desc、defaults。
  3. 在 render(d) 里写这个模板的 HTML。
  4. 打开 css/templates.css，加一段 .tpl-你的id { ... }。

  刷新浏览器即可。左侧列表会自动多出一张卡片。

  render(d) 里可以用这些字段，它们已经处理好了，可以直接拼进 HTML：

    d.titleHtml      主标题。关键词已被包进 <span class="kw">，空标题会是占位文字
    d.subtitleHtml   副标题（已转义）
    d.tagHtml        角标（已转义）
    d.markChar       用来做大水印的一个字（已转义）
    d.photo          有背景图时是 background-image:url('...')，没有就是空字符串
    d.size           "xhs" 或 "dy"
    d.ghost          标题为空时的灰色占位

  请给标题元素加上：
    data-bind="title"      输入时只更新这块，背景图不会闪
    data-fit data-fit-max="140" data-fit-min="56"
  副标题用 data-bind="subtitle"，角标用 data-bind="tag"。

  不要把用户原文直接拼进 HTML。始终用上面带 Html 的字段。

  字号不用手算死。data-fit 会在字装不下时自动缩小，
  但元素自己要有 max-height 和 overflow: hidden（写在 CSS 里）。
*/

const TEMPLATES = [
  {
    id: "marker",
    name: "荧光大字",
    desc: "大标题靠下，关键词铺一层荧光色",
    defaults: {
      title: "一个人也能\n做出爆款封面",
      keyword: "爆款",
      subtitle: "打开网页，改几个字，就能发出去",
      tag: "教程",
      bg: "#f4f1ea",
      fg: "#1a1a1a",
      accent: "#ffe14a",
    },
    presets: [
      { name: "暖白", bg: "#f4f1ea", fg: "#1a1a1a", accent: "#ffe14a" },
      { name: "雾粉", bg: "#fff1f4", fg: "#2a1a1e", accent: "#ff8fab" },
      { name: "墨绿", bg: "#14352e", fg: "#f4fff8", accent: "#d6ff4a" },
    ],
    render(d) {
      const max = d.size === "dy" ? 136 : 128;
      return `
        ${d.photo ? `<div class="photo" style="${d.photo}"></div><div class="dim"></div><div class="fade"></div>` : ""}
        <div class="tag" data-bind="tag">${d.tagHtml}</div>
        <div class="stack">
          <h1 class="title" data-bind="title" data-fit data-fit-max="${max}" data-fit-min="60">${d.titleHtml}</h1>
          <div class="bar"></div>
          <p class="sub" data-bind="subtitle" data-fit data-fit-max="36" data-fit-min="22">${d.subtitleHtml}</p>
        </div>
      `;
    },
  },

  {
    id: "note",
    name: "手账便签",
    desc: "横线纸、胶带，角落一张圆章",
    defaults: {
      title: "把今天写成\n一页手账",
      keyword: "手账",
      subtitle: "三件就够：吃了什么，看见什么，想记住什么",
      tag: "手账",
      bg: "#f6edd8",
      fg: "#2b241c",
      accent: "#ffe56a",
    },
    presets: [
      { name: "原色纸", bg: "#f6edd8", fg: "#2b241c", accent: "#ffe56a" },
      { name: "薄荷", bg: "#e5f3ea", fg: "#1c3b30", accent: "#ffd0dc" },
      { name: "夜读", bg: "#1e2836", fg: "#f6f0e4", accent: "#f0c14a" },
    ],
    render(d) {
      const max = d.size === "dy" ? 120 : 104;
      const photo = d.photo
        ? `<div class="polaroid"><div class="shot" style="${d.photo}"><div class="dim"></div></div></div>`
        : "";
      return `
        <div class="hole"></div>
        <div class="hole"></div>
        <div class="hole"></div>
        <div class="redline"></div>
        <div class="tape"></div>
        <div class="stamp" data-bind="tag" data-fit data-fit-max="36" data-fit-min="16">${d.tagHtml}</div>
        <h1 class="title" data-bind="title" data-fit data-fit-max="${max}" data-fit-min="52">${d.titleHtml}</h1>
        <div class="tail">
          <div class="sticky">
            <i class="fold"></i>
            <p class="sub" data-bind="subtitle" data-fit data-fit-max="40" data-fit-min="22">${d.subtitleHtml}</p>
          </div>
          ${photo}
        </div>
      `;
    },
  },

  {
    id: "impact",
    name: "黑黄冲击",
    desc: "黑底亮色粗框，适合强提醒",
    defaults: {
      title: "别划走\n这条真有用",
      keyword: "别划走",
      subtitle: "先收藏，用的时候翻得出来",
      tag: "必看",
      bg: "#111111",
      fg: "#ffe14a",
      accent: "#ffe14a",
    },
    presets: [
      { name: "黑黄", bg: "#111111", fg: "#ffe14a", accent: "#ffe14a" },
      { name: "红黑", bg: "#16080a", fg: "#fff5f5", accent: "#ff2a2a" },
      { name: "电光", bg: "#071018", fg: "#e8fbff", accent: "#3ee0ff" },
    ],
    render(d) {
      const max = d.size === "dy" ? 140 : 132;
      return `
        ${d.photo ? `<div class="photo" style="${d.photo}"></div><div class="dim"></div>` : ""}
        <div class="watermark" data-bind="mark">${d.markChar}</div>
        <div class="frame"></div>
        <div class="tag" data-bind="tag">${d.tagHtml}</div>
        <div class="inner">
          <h1 class="title" data-bind="title" data-fit data-fit-max="${max}" data-fit-min="64">${d.titleHtml}</h1>
          <div class="dock">
            <p class="sub" data-bind="subtitle" data-fit data-fit-max="38" data-fit-min="22">${d.subtitleHtml}</p>
          </div>
        </div>
      `;
    },
  },

  {
    id: "mag",
    name: "杂志色块",
    desc: "上半幅色块或图片，下半幅大标题",
    defaults: {
      title: "普通房间\n也能拍出封面",
      keyword: "封面",
      subtitle: "靠窗、留白、少摆两样东西",
      tag: "拍照",
      bg: "#f7f1ea",
      fg: "#1b1916",
      accent: "#e23b2f",
    },
    presets: [
      { name: "砖红", bg: "#f7f1ea", fg: "#1b1916", accent: "#e23b2f" },
      { name: "海蓝", bg: "#f3f6f8", fg: "#14202b", accent: "#1f6f8b" },
      { name: "葡萄", bg: "#f6f2f8", fg: "#241826", accent: "#7a3e9d" },
    ],
    render(d) {
      const max = d.size === "dy" ? 132 : 112;
      return `
        <div class="band">
          ${d.photo ? `<div class="photo" style="${d.photo}"></div><div class="dim"></div>` : ""}
          <div class="tag" data-bind="tag">${d.tagHtml}</div>
        </div>
        <div class="body">
          <p class="kicker">本期</p>
          <h1 class="title" data-bind="title" data-fit data-fit-max="${max}" data-fit-min="56">${d.titleHtml}</h1>
          <div class="rule"></div>
          <div class="tail">
            <p class="sub" data-bind="subtitle" data-fit data-fit-max="34" data-fit-min="20">${d.subtitleHtml}</p>
            <div class="no">01</div>
          </div>
        </div>
      `;
    },
  },

  /*
  {
    id: "plain",
    name: "纯色居中",
    desc: "只有一句大字，适合改着玩",
    defaults: {
      title: "在这里写标题",
      keyword: "标题",
      subtitle: "",
      tag: "",
      bg: "#ffffff",
      fg: "#111111",
      accent: "#ffe14a",
    },
    presets: [
      { name: "白底", bg: "#ffffff", fg: "#111111", accent: "#ffe14a" },
    ],
    render(d) {
      return `
        <h1 class="title" data-bind="title" data-fit data-fit-max="150" data-fit-min="60">${d.titleHtml}</h1>
      `;
    },
  },
  */
];
