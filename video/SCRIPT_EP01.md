# 第一集剧本 · 不要早死

竖屏短视频（1080×1920），旁白由代码生成（edge-tts），画面与音效全部由 Remotion 代码驱动。

素材来源：[eternity4719/HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) 第 1 节「不要早死」，许可 CC BY 4.0。

## 分镜

| # | 场景 | 旁白要点 | 音效 |
| --- | --- | --- | --- |
| 01 | Hook | 几乎不花钱，就能明显降低早死概率 | whoosh |
| 02 | 片头 | 高性价比人生指南 · 第一集 | whoosh |
| 03 | 用法 | 备选单不是任务清单；四种资源 | whoosh |
| 04 | 条目 1 | 系安全带 · ↓45% · 证据 A | whoosh + ding |
| 05 | 条目 2 | 戴头盔并扣好 · ↓42% · 证据 A | whoosh + ding |
| 06 | 条目 3 | 烟雾报警器 · ↓60% · 证据 B | whoosh + ding |
| 07 | 条目 4 | 电动车别进楼道充电 | whoosh + ding |
| 08 | 条目 5 | 量血压并达标 · ↓13% · 证据 A | whoosh + ding |
| 09 | 片尾 | 署名 + 下集「不要慢慢死」 | whoosh |

## 本地预览 / 导出

```bash
cd video
npm run dev
# Studio: http://localhost:3000/Episode01-DontDieEarly

npx remotion render Episode01-DontDieEarly out/ep01.mp4
```

重新生成旁白：

```bash
python3 scripts/generate-voiceover-ep01.py
```
