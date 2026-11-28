export type SceneKind =
  | "choice"
  | "hook"
  | "list"
  | "method"
  | "section"
  | "tip"
  | "title";

export type SceneData = {
  id: string;
  kind: SceneKind;
  visual: string;
  audio: string;
  subtitle: string;
  highlights?: string[];
  citation?: string;
  badge?: string;
  counterLabel?: string;
  counterFrom?: number;
  counterTo?: number;
  counterSuffix?: string;
  stamp?: string;
  scrollLines?: string[];
  listItems?: { n: number; title: string }[];
  choiceLeft?: { title: string; sub: string };
  choiceRight?: { title: string; sub: string };
};

/** Episode 01 full chapter in Bai Qi style. CC BY 4.0 HowToLiveBetter. */
export const EP01_SCENES: SceneData[] = [
  {"id": "01-hook", "kind": "hook", "visual": "hook", "audio": "voiceover/ep01/01-hook.mp3", "subtitle": "几乎不花钱。多花几秒钟。就能把早死的概率，明显压下去。", "highlights": ["不花钱", "几秒钟", "早死"], "citation": "改编自 eternity4719/HowToLiveBetter · 第 1 节「不要早死」 · CC BY 4.0", "badge": "EP.01"},
  {"id": "02-title", "kind": "title", "visual": "title", "audio": "voiceover/ep01/02-title.mp3", "subtitle": "高性价比人生指南 · 第一集：不要早死", "citation": "用最少的钱、时间和精力，换回最多的寿命、金钱和人身自由", "scrollLines": ["高性价比", "人生指南", "不要早死"]},
  {"id": "03-method", "kind": "method", "visual": "method", "audio": "voiceover/ep01/03-method.mp3", "subtitle": "五十条备选。花掉什么，换回什么。不是任务清单。", "highlights": ["五十条", "花掉什么", "换回什么"], "citation": "挑走一两条就算数；作者自己也没做到其中大部分", "badge": "用法"},
  {"id": "04-sec-road", "kind": "section", "visual": "section", "audio": "voiceover/ep01/04-sec-road.mp3", "subtitle": "先说路上。安全带、头盔、速度和儿童座椅。", "highlights": ["路上"], "citation": "第 1 节 · 路上", "badge": "路上", "scrollLines": ["路上"]},
  {"id": "05-tip-01", "kind": "tip", "visual": "seatbelt", "audio": "voiceover/ep01/05-tip-01.mp3", "subtitle": "坐轿车前排系上安全带，出车祸时被撞死的概率降四成多。坐轻型卡车前排的降六成。", "highlights": ["安全带", "四成"], "citation": "NHTSA：轿车前排致命伤风险约 ↓45%", "badge": "路上 · 01", "stamp": "证据 A", "counterLabel": "致命伤风险约降", "counterFrom": 0, "counterTo": 45, "counterSuffix": "%"},
  {"id": "06-tip-02", "kind": "tip", "visual": "helmet", "audio": "voiceover/ep01/06-tip-02.mp3", "subtitle": "摩托车骑手出事时，戴头盔并且把扣带扣好的，死亡和头部受伤都明显更少。扣带要系紧，松松垮垮挂在头上不算戴。", "highlights": ["头盔", "扣好"], "citation": "Cochrane：死亡 OR 0.58；头部损伤 OR 0.31", "badge": "路上 · 02", "stamp": "证据 A", "counterLabel": "死亡风险约降", "counterFrom": 0, "counterTo": 42, "counterSuffix": "%"},
  {"id": "07-list-road", "kind": "list", "visual": "list", "audio": "voiceover/ep01/07-list-road.mp3", "subtitle": "开车不超速、不酒驾；坐车时给 4 岁以下儿童用安全座椅", "highlights": [], "citation": "完整条目见原书第 1 节 · 路上", "badge": "路上 · 其余", "listItems": [{"n": 9, "title": "开车不超速、不酒驾"}, {"n": 10, "title": "坐车时给 4 岁以下儿童用安全座椅"}]},
  {"id": "08-sec-home", "kind": "section", "visual": "section", "audio": "voiceover/ep01/08-sec-home.mp3", "subtitle": "家里。火、气、电。", "highlights": ["家里"], "citation": "第 1 节 · 家里", "badge": "家里", "scrollLines": ["家里"]},
  {"id": "09-tip-03", "kind": "tip", "visual": "smoke", "audio": "voiceover/ep01/09-tip-03.mp3", "subtitle": "家里有一个能正常工作的烟雾报警器，住宅火灾里死的人明显更少。美国死了人的住宅火灾，四成起火时人在睡觉。", "highlights": ["烟雾报警器", "六成"], "citation": "JAMA：能正常工作的烟雾报警器，死亡 OR 0.39", "badge": "家里 · 03", "stamp": "证据 B", "counterLabel": "火灾死亡风险约降", "counterFrom": 0, "counterTo": 60, "counterSuffix": "%"},
  {"id": "10-tip-06", "kind": "tip", "visual": "ebike", "audio": "voiceover/ep01/10-tip-06.mp3", "subtitle": "在高层住宅的门厅、走道、楼梯间停电动车或者充电，是应急管理部的规章明令禁止的。", "highlights": ["楼道", "逃生通道"], "citation": "应急管理部令第 5 号：禁停放/充电于疏散通道", "badge": "家里 · 06", "stamp": "禁入楼道"},
  {"id": "11-list-home", "kind": "list", "visual": "list", "audio": "voiceover/ep01/11-list-home.mp3", "subtitle": "燃气软管和灶具到期就换、备齐灭火器、灭火毯、逃生呼吸面罩和急救包、装好护罩、戴上护目镜加面屏再用角磨机、下化粪池、窨井、污水池、菜窖地窖、发酵罐等有限空间前…", "highlights": [], "citation": "完整条目见原书第 1 节 · 家里", "badge": "家里 · 其余", "listItems": [{"n": 4, "title": "燃气软管和灶具到期就换"}, {"n": 26, "title": "备齐灭火器、灭火毯、逃生呼吸面罩和急救包"}, {"n": 42, "title": "装好护罩、戴上护目镜加面屏再用角磨机"}, {"n": 46, "title": "下化粪池、窨井、污水池、菜窖地窖、发酵罐等有限空间前"}]},
  {"id": "12-sec-accident", "kind": "section", "visual": "section", "audio": "voiceover/ep01/12-sec-accident.mp3", "subtitle": "孩子、老人和野外。", "highlights": ["意外"], "citation": "第 1 节 · 意外", "badge": "意外", "scrollLines": ["意外"]},
  {"id": "13-tip-05", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/13-tip-05.mp3", "subtitle": "光 2025 年一年，中国疾控中心就调查了 828 起蘑菇中毒，2165 人中招，13 人死。那一年还新。", "highlights": ["野生蘑菇", "不成立"], "citation": "中国疾控：2025 年蘑菇中毒 828 起，死 13 人", "badge": "意外 · 05", "stamp": "证据 A"},
  {"id": "14-tip-13", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/14-tip-13.mp3", "subtitle": "每周练两三次平衡，比如太极，老人跌倒的次数降约两成三，摔过的人数降 15%。请人上门评估、改造家里，跌倒。", "highlights": ["平衡", "60 岁"], "citation": "条目 13 · 证据 A", "badge": "意外 · 13", "stamp": "证据 A"},
  {"id": "15-list-accident", "kind": "list", "visual": "list", "audio": "voiceover/ep01/15-list-accident.mp3", "subtitle": "家里有小孩就给窗户和阳台装限位器或护栏、儿童近水不离视线、不捡、不拆、不卖来路不明的金属件、上野外冰面前先打孔量厚度…", "highlights": [], "citation": "完整条目见原书第 1 节 · 意外", "badge": "意外 · 其余", "listItems": [{"n": 11, "title": "家里有小孩就给窗户和阳台装限位器或护栏"}, {"n": 12, "title": "儿童近水不离视线"}, {"n": 36, "title": "不捡、不拆、不卖来路不明的金属件"}, {"n": 41, "title": "上野外冰面前先打孔量厚度"}, {"n": 48, "title": "泡发的木耳、银耳当顿吃完别过夜"}, {"n": 50, "title": "在家把做好的饭菜两小时内放进冰箱、不用等放凉"}]},
  {"id": "16-sec-vaccine", "kind": "section", "visual": "section", "audio": "voiceover/ep01/16-sec-vaccine.mp3", "subtitle": "疫苗。几针，换少扛一辈子病。", "highlights": ["疫苗"], "citation": "第 1 节 · 疫苗", "badge": "疫苗", "scrollLines": ["疫苗"]},
  {"id": "17-tip-16", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/17-tip-16.mp3", "subtitle": "瑞典跟踪了 167 万女性。17 岁以前打过 HPV 疫苗的人，后来得浸润性宫颈癌的风险只有没打的约八分。", "highlights": ["HPV", "越早越好"], "citation": "条目 16 · 证据 A", "badge": "疫苗 · 16", "stamp": "证据 A"},
  {"id": "18-tip-15", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/18-tip-15.mp3", "subtitle": "在美国，破伤风一旦发病，大约每 10 个人里死 1 个。深的伤口、沾了泥土的伤口风险最高。", "highlights": ["破伤风", "当天"], "citation": "条目 15 · 证据 A", "badge": "疫苗 · 15", "stamp": "证据 A"},
  {"id": "19-list-vaccine", "kind": "list", "visual": "list", "audio": "voiceover/ep01/19-list-vaccine.mp3", "subtitle": "查乙肝两对半；有心血管病的人和老年人每年打流感疫苗；50 岁以后打带状疱疹疫苗；65 岁以上打肺炎球菌疫苗", "highlights": [], "citation": "完整条目见原书第 1 节 · 疫苗", "badge": "疫苗 · 其余", "listItems": [{"n": 14, "title": "查乙肝两对半"}, {"n": 20, "title": "有心血管病的人和老年人每年打流感疫苗"}, {"n": 21, "title": "50 岁以后打带状疱疹疫苗"}, {"n": 22, "title": "65 岁以上打肺炎球菌疫苗"}]},
  {"id": "20-sec-screen", "kind": "section", "visual": "section", "audio": "voiceover/ep01/20-sec-screen.mp3", "subtitle": "筛查和查病。没症状，不代表没事。", "highlights": ["筛查"], "citation": "第 1 节 · 筛查", "badge": "筛查", "scrollLines": ["筛查"]},
  {"id": "21-tip-07", "kind": "tip", "visual": "bp", "audio": "voiceover/ep01/21-tip-07.mp3", "subtitle": "高压每降 10 mmHg，出大的心血管毛病的概率降两成，中风降 27%。心衰降 28%，死亡概率降 13。", "highlights": ["血压", "一成三"], "citation": "Lancet：收缩压每降 10 mmHg，总死亡率约 ↓13%", "badge": "筛查 · 07", "stamp": "证据 A", "counterLabel": "死亡风险约降", "counterFrom": 0, "counterTo": 13, "counterSuffix": "%"},
  {"id": "22-tip-08", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/22-tip-08.mp3", "subtitle": "花几十块抽一管血，就能在一点症状都没有的时候查出糖尿病前期。美国官方的筛查建议是：35 到 70 岁、超。", "highlights": ["空腹血糖", "超重"], "citation": "条目 8 · 证据 A", "badge": "筛查 · 08", "stamp": "证据 A"},
  {"id": "23-tip-19", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/23-tip-19.mp3", "subtitle": "每一两年做一次几十块的粪便隐血检查，死于结直肠癌的概率低约 16%，至少查过一轮的人低 25%。", "highlights": ["结直肠", "肠镜"], "citation": "条目 19 · 证据 A", "badge": "筛查 · 19", "stamp": "证据 A"},
  {"id": "24-list-screen", "kind": "list", "visual": "list", "audio": "voiceover/ep01/24-list-screen.mp3", "subtitle": "女性 40 岁起做乳腺癌筛查、30 岁以上女性做宫颈癌筛查、查幽门螺杆菌、重度吸烟者每年做一次低剂量胸部 CT…", "highlights": [], "citation": "完整条目见原书第 1 节 · 筛查", "badge": "筛查 · 其余", "listItems": [{"n": 17, "title": "女性 40 岁起做乳腺癌筛查"}, {"n": 18, "title": "30 岁以上女性做宫颈癌筛查"}, {"n": 23, "title": "查幽门螺杆菌"}, {"n": 24, "title": "重度吸烟者每年做一次低剂量胸部 CT"}, {"n": 39, "title": "65 岁以上的女性去做一次双能 X 线骨密度检查"}, {"n": 40, "title": "查出骨质疏松"}, {"n": 44, "title": "心慌、心跳乱就去做心电图"}, {"n": 45, "title": "成年人查一次丙肝抗体"}, {"n": 47, "title": "45 岁以上"}]},
  {"id": "25-sec-signal", "kind": "section", "visual": "section", "audio": "voiceover/ep01/25-sec-signal.mp3", "subtitle": "身体信号。出现了，就别硬扛。", "highlights": ["信号"], "citation": "第 1 节 · 信号", "badge": "信号", "scrollLines": ["信号"]},
  {"id": "26-tip-27", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/26-tip-27.mp3", "subtitle": "英国的门诊病历里，60 岁以上的人出现肉眼看得见的血尿，最后查出膀胱癌的约 2.8%。40 到 59 岁。", "highlights": ["血", "去查"], "citation": "条目 27 · 肉眼血尿", "badge": "信号 · 27", "stamp": "证据 A"},
  {"id": "27-tip-31", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/27-tip-31.mp3", "subtitle": "去疾控查艾滋病不花钱。没有你本人同意，任何单位和个人都不得公开你的姓名、住址、工作单位和病史。", "highlights": ["艾滋病", "免费"], "citation": "条目 31 · 疾控中心免费检测", "badge": "信号 · 31", "stamp": "证据 A"},
  {"id": "28-list-signal", "kind": "list", "visual": "list", "audio": "voiceover/ep01/28-list-signal.mp3", "subtitle": "勃起功能出了问题；减重、戒烟、把血压血糖控住；性行为全程用安全套；有高危性行为的男男性行为者；咳嗽、咳痰两周以上或者痰里带血", "highlights": [], "citation": "完整条目见原书第 1 节 · 信号", "badge": "信号 · 其余", "listItems": [{"n": 28, "title": "勃起功能出了问题"}, {"n": 29, "title": "减重、戒烟、把血压血糖控住"}, {"n": 30, "title": "性行为全程用安全套"}, {"n": 38, "title": "有高危性行为的男男性行为者"}, {"n": 49, "title": "咳嗽、咳痰两周以上或者痰里带血"}]},
  {"id": "29-sec-mental", "kind": "section", "visual": "section", "audio": "voiceover/ep01/29-sec-mental.mp3", "subtitle": "心理危机。这一段，先把命留住。", "highlights": ["心理"], "citation": "第 1 节 · 心理", "badge": "心理", "scrollLines": ["心理"]},
  {"id": "30-tip-25", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/30-tip-25.mp3", "subtitle": "把能要命的东西从手边拿走，这类做法的证据一直在变强。管住镇痛药以后，相关自杀降 43%，常有人跳楼的地方。", "highlights": ["12356", "自杀"], "citation": "条目 25 · 心理援助热线 12356", "badge": "心理 · 25", "stamp": "等级 A"},
  {"id": "31-tip-32", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/31-tip-32.mp3", "subtitle": "一项访谈里，自杀未遂的人将近一半说，从念头冒出来到动手不超过 10 分钟。四分之三的人那段时间和身边人有。", "highlights": ["告诉", "一个人"], "citation": "条目 32 · 先把这几十分钟交出去", "badge": "心理 · 32", "stamp": "证据 A"},
  {"id": "32-tip-43", "kind": "tip", "visual": "tip", "audio": "voiceover/ep01/32-tip-43.mp3", "subtitle": "怕一提自杀就把念头勾出来，研究里没看到这回事。给中学生的问卷里加上自杀的问题，被问的人没有更难受，想自杀。", "highlights": ["直接问", "自杀"], "citation": "条目 43 · 问了不会让他更想", "badge": "心理 · 43", "stamp": "证据 A"},
  {"id": "33-list-mental", "kind": "list", "visual": "list", "audio": "voiceover/ep01/33-list-mental.mp3", "subtitle": "赌到借钱还赌、心情一直低落时；别把「救回来」当成兜底；别拿「躺几天就好」赌高处坠落；别拿「少一个肾没什么」换钱", "highlights": [], "citation": "完整条目见原书第 1 节 · 心理", "badge": "心理 · 其余", "listItems": [{"n": 37, "title": "赌到借钱还赌、心情一直低落时"}, {"n": 33, "title": "别把「救回来」当成兜底"}, {"n": 34, "title": "别拿「躺几天就好」赌高处坠落"}, {"n": 35, "title": "别拿「少一个肾没什么」换钱"}]},
  {"id": "34-choice", "kind": "choice", "visual": "choice", "audio": "voiceover/ep01/34-choice.mp3", "subtitle": "五十条都在这了。挑一两条就行。换你——做，还是再等等？", "highlights": ["五十条", "做"], "citation": "下集预告：不要慢慢死 · 烟酒、运动、睡眠与饮食", "choiceLeft": {"title": "做", "sub": "先挑一两条"}, "choiceRight": {"title": "再等等", "sub": "继续赌概率"}},
];
