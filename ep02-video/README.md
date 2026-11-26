# EP02 · 不花一分钱，医学界公认最能拉长健康寿命的 3 件事

用 Remotion 实现的《高性价比人生》动画短视频第二集（9:16）。

## 预览

```bash
cd ep02-video
npm install
npm run dev
```

打开 Studio 后选择 composition `EP02`。

## 导出

```bash
npx remotion render EP02 out/ep02.mp4
```

## 结构

- `src/Ep02.tsx`：五镜串联主时间轴，时长按口播音频自动对齐
- `src/scenes/`：Hook / 睡眠 / 运动 / 防晒 / 总结
- `src/components/PaperCharacter.tsx`：绿卫衣眼镜纸片人（5 姿态）
- `public/voiceover/`：MiniMax 中文口播

视觉规格对齐剧本：浅白点阵底 `#F7F8FA`、红 `#E63946`、绿 `#10B981`、1080×1920。
