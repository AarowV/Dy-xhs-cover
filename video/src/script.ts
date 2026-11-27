export type TipSceneData = {
  id: string;
  kind: "tip";
  audio: string;
  number: string;
  title: string;
  cost: string;
  plain: string;
  stat: string;
  statLabel: string;
  evidence: "A" | "B" | "C";
  icon: "seatbelt" | "helmet" | "smoke" | "ebike" | "bp";
};

export type TextSceneData = {
  id: string;
  kind: "hook" | "title" | "framework" | "outro";
  audio: string;
  eyebrow?: string;
  title: string;
  lines: string[];
};

export type SceneData = TipSceneData | TextSceneData;

/**
 * Episode 01 script adapted from eternity4719/HowToLiveBetter
 * chapter「1. 不要早死」(CC BY 4.0). Numbers follow the book's
 * plain-language summaries; see ATTRIBUTION.md for source links.
 */
export const EP01_SCENES: SceneData[] = [
  {
    id: "01-hook",
    kind: "hook",
    audio: "voiceover/ep01/01-hook.mp3",
    eyebrow: "EP 01",
    title: "几乎不花钱",
    lines: ["就能明显降低早死的概率", "这些动作，才几秒钟"],
  },
  {
    id: "02-title",
    kind: "title",
    audio: "voiceover/ep01/02-title.mp3",
    eyebrow: "开源循证生活指南",
    title: "高性价比人生指南",
    lines: ["第一集 · 不要早死", "用最少的钱、时间和精力", "换回最多的寿命"],
  },
  {
    id: "03-framework",
    kind: "framework",
    audio: "voiceover/ep01/03-framework.mp3",
    eyebrow: "怎么用这本书",
    title: "备选单，不是任务清单",
    lines: [
      "每一条只回答两件事",
      "花掉什么 · 换回什么",
      "先挑路上和家里最划算的几条",
    ],
  },
  {
    id: "04-seatbelt",
    kind: "tip",
    audio: "voiceover/ep01/04-seatbelt.mp3",
    number: "01",
    title: "系安全带，前排后排都系",
    cost: "不花钱 · 多花 2 秒",
    plain: "轿车前排系上，致命伤风险大约降四成五。后排也要系。",
    stat: "↓45%",
    statLabel: "轿车前排致命伤风险",
    evidence: "A",
    icon: "seatbelt",
  },
  {
    id: "05-helmet",
    kind: "tip",
    audio: "voiceover/ep01/05-helmet.mp3",
    number: "02",
    title: "骑摩托、电动车戴头盔并扣好",
    cost: "100–300 元 · 每次 5 秒",
    plain: "扣带系紧才算戴。死亡风险大约低四成，头部受伤低约七成。",
    stat: "↓42%",
    statLabel: "摩托车骑手死亡风险",
    evidence: "A",
    icon: "helmet",
  },
  {
    id: "06-smoke",
    kind: "tip",
    audio: "voiceover/ep01/06-smoke.mp3",
    number: "03",
    title: "装烟雾报警器",
    cost: "30–100 元 · 每年换电池",
    plain: "能正常工作的报警器，住宅火灾死亡风险大约降六成。冬天烧煤或燃气取暖，再加一氧化碳报警器。",
    stat: "↓60%",
    statLabel: "住宅火灾死亡风险",
    evidence: "B",
    icon: "smoke",
  },
  {
    id: "07-ebike",
    kind: "tip",
    audio: "voiceover/ep01/07-ebike.mp3",
    number: "04",
    title: "电动车别推进楼道充电",
    cost: "不花钱 · 多走几十米",
    plain: "门厅、走道、楼梯间不能停也不能充。烧的就是逃生通道。",
    stat: "禁停",
    statLabel: "楼道 / 电梯 / 家里充电",
    evidence: "A",
    icon: "ebike",
  },
  {
    id: "08-bp",
    kind: "tip",
    audio: "voiceover/ep01/08-bp.mp3",
    number: "05",
    title: "量血压，高了就降到达标",
    cost: "血压计 100–200 元",
    plain: "高压每降 10，死亡风险大约降 13%。十个高血压，不到一个真正控制住。",
    stat: "↓13%",
    statLabel: "收缩压每降 10 mmHg",
    evidence: "A",
    icon: "bp",
  },
  {
    id: "09-outro",
    kind: "outro",
    audio: "voiceover/ep01/09-outro.mp3",
    eyebrow: "下集预告",
    title: "挑走一两条就算数",
    lines: [
      "改编自《高性价比人生指南》",
      "CC BY 4.0 · eternity4719/HowToLiveBetter",
      "下集：不要慢慢死",
    ],
  },
];
