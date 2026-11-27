import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Caption} from "../components/Caption";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const ExerciseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [30, 150], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill>
      <Background tone="day" />
      <AbsoluteFill style={{alignItems: "center", paddingTop: 110}}>
        <Header n="02" label="第二件" />
        <div style={{marginTop: 30, fontFamily: serifFamily, fontSize: 50, fontWeight: 700, color: COLORS.ink, textAlign: "center", lineHeight: 1.35, padding: "0 70px"}}>
          每周 150 分钟微喘运动
          <br />+ 两次力量训练
        </div>
        <CurveChart progress={progress} />
        <div style={{marginTop: 24, display: "flex", gap: 16}}>
          <Pill text="每天快走 ≈ 25 分钟" appear={90} />
          <Pill text="划掉 ¥3000 健身卡" appear={110} bad />
        </div>
      </AbsoluteFill>
      <Caption appearAt={55} lines={frame < 300 ? ["不用办几千块健身卡", "走到微微出汗", "能说话，但唱不了歌"] : ["从完全不动 → 到这个门槛", "收益曲线直接拉爆"]} />
    </AbsoluteFill>
  );
};

const Header: React.FC<{n: string; label: string}> = ({n, label}) => (
  <div style={{display: "flex", alignItems: "center", gap: 16}}>
    <div style={{width: 72, height: 72, borderRadius: "50%", background: COLORS.ochre, color: COLORS.ink, fontFamily: serifFamily, fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"}}>{n}</div>
    <div style={{fontFamily: sansFamily, fontSize: 34, color: COLORS.burgundy, letterSpacing: 4}}>{label}</div>
  </div>
);

const CurveChart: React.FC<{progress: number}> = ({progress}) => {
  const w = 780, h = 340;
  const points = Array.from({length: 28}, (_, i) => {
    const t = i / 27;
    const x = 60 + t * (w - 100);
    const y = 36 + (1 - Math.pow(t, 0.45)) * (h - 90);
    return `${x},${y}`;
  });
  const visible = Math.max(2, Math.floor(points.length * progress));
  return (
    <div style={{marginTop: 36, position: "relative"}}>
      <svg width={w} height={h}>
        <rect x={0} y={0} width={w} height={h} rx={24} fill={COLORS.snow} stroke={`${COLORS.ink}22`} strokeWidth={2} />
        <line x1={60} y1={h - 46} x2={w - 40} y2={h - 46} stroke={`${COLORS.ink}44`} strokeWidth={2} />
        <line x1={60} y1={36} x2={60} y2={h - 46} stroke={`${COLORS.ink}44`} strokeWidth={2} />
        <polyline fill="none" stroke={COLORS.teal} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" points={points.slice(0, visible).join(" ")} />
        {progress > 0.55 ? <rect x={60} y={36} width={210} height={h - 82} fill={`${COLORS.teal}22`} rx={12} /> : null}
      </svg>
      <div style={{position: "absolute", left: 88, top: 52, fontFamily: sansFamily, fontSize: 28, color: COLORS.teal, fontWeight: 700, opacity: progress > 0.55 ? 1 : 0}}>甜点区<br />0→150 分钟</div>
    </div>
  );
};

const Pill: React.FC<{text: string; appear: number; bad?: boolean}> = ({text, appear, bad}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appear, appear + 12], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <div style={{opacity, fontFamily: sansFamily, fontSize: 30, fontWeight: 700, color: bad ? COLORS.warn : COLORS.teal, background: bad ? `${COLORS.warn}14` : `${COLORS.teal}14`, border: `2px solid ${bad ? COLORS.warn : COLORS.teal}55`, padding: "12px 20px", borderRadius: 999, textDecoration: bad ? "line-through" : "none"}}>{text}</div>
  );
};
