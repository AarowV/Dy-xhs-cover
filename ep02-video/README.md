# 高性价比人生 · 第2期

Remotion 竖屏短视频（1080×1920）：**不花一分钱，最能拉长健康寿命的 3 件事**

## 两个版本

| Composition | 做法 |
| --- | --- |
| `Ep02Vibe` | **Vibe coding 主推**：Fal 生成插画 + 中文旁白 + BGM，Remotion 拼装字幕/Ken Burns/结尾 CTA |
| `Ep02FreeLongevity` | 纯代码矢量信息图版（羊皮纸 UI、天平/曲线组件） |

## 本地预览

```bash
cd ep02-video
npm i
npm run dev
```

Studio 里选 `Ep02Vibe`。

## 渲染

```bash
npx remotion render Ep02Vibe out/ep02-vibe.mp4
```

## Vibe 资产

`public/vibe/`：`hook/sleep/exercise/protect/summary/choice.png` + `vo.mp3` + `bgm.mp3`  
时间轴与字幕：`src/vibe/timeline.json`

口播与要点来自《高性价比人生短视频_10集完整剧本库》EP02。
