import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Caption} from "../components/Caption";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const ExerciseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [40, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <Background tone="day" />
      <AbsoluteFill style={{alignItems: "center", paddingTop: 110}}>
        <div style={{display: "flex", alignItems: "center", gap: 16}}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: COLORS.ochre,
              color: COLORS.ink,
              fontFamily: serifFamily,
              fontSize: 30,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            02
          </div>
          <div
            style={{
              fontFamily: sansFamily,
              fontSize: 34,
              color: COLORS.burgundy,
              letterSpacing: 4,
            }}
          >
            第二件
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            fontFamily: serifFamily,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.ink,
            textAlign: "center",
            lineHeight: 1.35,
            padding: "0 70px",
          }}
        >
          每周 150 分钟微喘运动
          <br />+ 两次力量训练
        </div>

        <CurveChart progress={progress} />

        <div
          style={{
            marginTop: 28,
            display: "flex",
            gap: 18,
          }}
        >
          <Pill text="每天快走 ≈ 25 分钟" appear={90} />
          <Pill text="划掉 ¥3000 健身卡" appear={110} bad />
        </div>
      </AbsoluteFill>

      <Caption
        appearAt={70}
        lines={
          frame < 340
            ? ["不用办几千块健身卡", "走到微微出汗", "能说话，但唱不了歌"]
            : ["从完全不动 → 到这个门槛", "全因死亡风险下降最猛", "收益曲线直接拉爆"]
        }
      />
    </AbsoluteFill>
  );
};

const CurveChart: React.FC<{readonly progress: number}> = ({progress}) => {
  const w = 780;
  const h = 360;
  const points = Array.from({length: 24}, (_, i) => {
    const t = i / 23;
    const x = 60 + t * (w - 100);
    // steep then flatten: marginal returns curve
    const yNorm = 1 - Math.pow(t, 0.45);
    const y = 40 + yNorm * (h - 100);
    return `${x},${y}`;
  });
  const visible = Math.max(2, Math.floor(points.length * progress));
  const path = points.slice(0, visible).join(" ");

  return (
    <div style={{marginTop: 40, position: "relative"}}>
      <svg width={w} height={h}>
        <rect
          x={0}
          y={0}
          width={w}
          height={h}
          rx={24}
          fill={COLORS.snow}
          stroke={`${COLORS.ink}22`}
          strokeWidth={2}
        />
        <line
          x1={60}
          y1={h - 50}
          x2={w - 40}
          y2={h - 50}
          stroke={`${COLORS.ink}44`}
          strokeWidth={2}
        />
        <line
          x1={60}
          y1={40}
          x2={60}
          y2={h - 50}
          stroke={`${COLORS.ink}44`}
          strokeWidth={2}
        />
        <polyline
          fill="none"
          stroke={COLORS.teal}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={path}
        />
        {progress > 0.55 ? (
          <rect
            x={60}
            y={40}
            width={220}
            height={h - 90}
            fill={`${COLORS.teal}22`}
            rx={12}
          />
        ) : null}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 58,
          fontFamily: sansFamily,
          fontSize: 28,
          color: COLORS.teal,
          fontWeight: 700,
          opacity: progress > 0.55 ? 1 : 0,
        }}
      >
        甜点区
        <br />
        0→150 分钟
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          bottom: 18,
          right: 40,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: sansFamily,
          fontSize: 24,
          color: COLORS.mute,
        }}
      >
        <span>运动量</span>
        <span>健康收益 ↑</span>
      </div>
    </div>
  );
};

const Pill: React.FC<{
  readonly text: string;
  readonly appear: number;
  readonly bad?: boolean;
}> = ({text, appear, bad}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appear, appear + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity,
        fontFamily: sansFamily,
        fontSize: 30,
        fontWeight: 700,
        color: bad ? COLORS.warn : COLORS.teal,
        background: bad ? `${COLORS.warn}14` : `${COLORS.teal}14`,
        border: `2px solid ${bad ? COLORS.warn : COLORS.teal}55`,
        padding: "14px 22px",
        borderRadius: 999,
        textDecoration: bad ? "line-through" : "none",
      }}
    >
      {text}
    </div>
  );
};
