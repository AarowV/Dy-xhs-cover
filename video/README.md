# 高性价比人生指南 · Remotion（白起做法）

复刻抖音「白起」历史纪录片的制作方法：

- 横屏 16:9（1920×1080）
- 平面剪影 + 卷轴 / 朱印 / 计数器 / 文献脚注
- 宋体叙事字幕，关键词朱红
- 结尾 A/B 选择题
- 旁白 + whoosh/ding 音效全代码驱动

## 第一集：不要早死

```bash
npm install
npm run voiceover:ep01
npm run dev
# http://localhost:3000/Episode01-DontDieEarly
npm run render:ep01
```

剧本：`SCRIPT_EP01.md`  
署名：`ATTRIBUTION.md`
