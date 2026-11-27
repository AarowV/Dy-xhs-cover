export type SceneKind =
  | "hook"
  | "title"
  | "method"
  | "seatbelt"
  | "helmet"
  | "smoke"
  | "ebike"
  | "bp"
  | "choice";

export type SceneData = {
  id: string;
  kind: SceneKind;
  audio: string;
  subtitle: string;
  /** Red-highlighted keywords inside subtitle */
  highlights?: string[];
  citation?: string;
  badge?: string;
  counterLabel?: string;
  counterFrom?: number;
  counterTo?: number;
  counterSuffix?: string;
  stamp?: string;
  scrollLines?: string[];
  choiceLeft?: { title: string; sub: string };
  choiceRight?: { title: string; sub: string };
};

/**
 * Episode 01 rewritten in the Bai Qi documentary style:
 * narrative voice + data visualization + source citations.
 * Content adapted from eternity4719/HowToLiveBetter ch.1 (CC BY 4.0).
 */
export const EP01_SCENES: SceneData[] = [
  {
    id: "01-hook",
    kind: "hook",
    audio: "voiceover/ep01/01-hook.mp3",
    subtitle: "几乎不花钱。多花几秒钟。就能把早死的概率，明显压下去。",
    highlights: ["不花钱", "几秒钟", "早死"],
    citation:
      "改编自 eternity4719/HowToLiveBetter · 第 1 节「不要早死」 · CC BY 4.0",
    badge: "EP.01",
  },
  {
    id: "02-title",
    kind: "title",
    audio: "voiceover/ep01/02-title.mp3",
    subtitle: "高性价比人生指南 · 第一集：不要早死",
    scrollLines: ["高性价比", "人生指南", "不要早死"],
    citation: "用最少的钱、时间和精力，换回最多的寿命、金钱和人身自由",
  },
  {
    id: "03-method",
    kind: "method",
    audio: "voiceover/ep01/03-method.mp3",
    subtitle: "每一条只回答两个问题：花掉什么，换回什么。这是备选单，不是任务清单。",
    highlights: ["花掉什么", "换回什么", "备选单"],
    citation: "作者说明：挑走一两条就算数，作者自己也没做到其中大部分",
    badge: "用法",
  },
  {
    id: "04-seatbelt",
    kind: "seatbelt",
    audio: "voiceover/ep01/04-seatbelt.mp3",
    subtitle: "系安全带，前排后排都系。不花钱，多花两秒。轿车前排致命伤风险约降四成五。",
    highlights: ["安全带", "四成五"],
    citation:
      "NHTSA (2024) Occupant Protection 2022：轿车前排致命伤风险约 ↓45%；WHO：最多约 ↓50%",
    badge: "路上 · 01",
    counterLabel: "致命伤风险",
    counterFrom: 0,
    counterTo: 45,
    counterSuffix: "%",
    stamp: "证据 A",
  },
  {
    id: "05-helmet",
    kind: "helmet",
    audio: "voiceover/ep01/05-helmet.mp3",
    subtitle: "骑摩托、电动车：戴头盔并扣好。死亡风险约低四成，头部受伤约低七成。",
    highlights: ["头盔", "扣好", "七成"],
    citation:
      "Liu BC 等 (2008) Cochrane：摩托车戴头盔，死亡 OR 0.58；头部损伤 OR 0.31",
    badge: "路上 · 02",
    counterLabel: "死亡风险约降",
    counterFrom: 0,
    counterTo: 42,
    counterSuffix: "%",
    stamp: "证据 A",
  },
  {
    id: "06-smoke",
    kind: "smoke",
    audio: "voiceover/ep01/06-smoke.mp3",
    subtitle: "装烟雾报警器。三十到一百元。住宅火灾死亡风险，大约降六成。",
    highlights: ["烟雾报警器", "六成"],
    citation:
      "Marshall SW 等 (1998) JAMA：能正常工作的烟雾报警器，死亡 OR 0.39",
    badge: "家里 · 03",
    counterLabel: "火灾死亡风险约降",
    counterFrom: 0,
    counterTo: 60,
    counterSuffix: "%",
    stamp: "证据 B",
  },
  {
    id: "07-ebike",
    kind: "ebike",
    audio: "voiceover/ep01/07-ebike.mp3",
    subtitle: "电动车不推进楼道、不进电梯、不在家里充电。烧的，就是逃生通道。",
    highlights: ["楼道", "逃生通道"],
    citation:
      "应急管理部令第 5 号：禁止在高层公共门厅、疏散走道、楼梯间、安全出口停放或充电",
    badge: "家里 · 04",
    stamp: "禁入楼道",
  },
  {
    id: "08-bp",
    kind: "bp",
    audio: "voiceover/ep01/08-bp.mp3",
    subtitle: "量血压，高了就降到达标。高压每降十，死亡风险大约降一成三。",
    highlights: ["血压", "一成三"],
    citation:
      "Ettehad D 等 (2016) Lancet：收缩压每降 10 mmHg，总死亡率 RR 0.87（约 ↓13%）",
    badge: "筛查 · 05",
    counterLabel: "死亡风险约降",
    counterFrom: 0,
    counterTo: 13,
    counterSuffix: "%",
    stamp: "证据 A",
  },
  {
    id: "09-choice",
    kind: "choice",
    audio: "voiceover/ep01/09-choice.mp3",
    subtitle: "这些动作，才几秒钟。换你——做，还是再等等？",
    highlights: ["几秒钟", "换你"],
    citation: "下集预告：不要慢慢死 · 烟酒、运动、睡眠与饮食",
    choiceLeft: { title: "做", sub: "先挑一两条" },
    choiceRight: { title: "再等等", sub: "继续赌概率" },
  },
];
