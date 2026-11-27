# 高性价比人生指南 · Remotion 视频

全程用代码制作竖屏短视频与音效动画。

## 第一集：不要早死

- Composition：`Episode01-DontDieEarly`
- 尺寸：1080×1920（抖音竖屏）
- 旁白：`public/voiceover/ep01/*.mp3`（edge-tts 生成）
- 音效：Remotion 公共库 `whoosh` / `ding`
- 剧本：`SCRIPT_EP01.md`
- 署名：`ATTRIBUTION.md`

```bash
npm install
npm run voiceover:ep01
npm run dev
npm run render:ep01
```

Studio 打开后访问：

http://localhost:3000/Episode01-DontDieEarly
