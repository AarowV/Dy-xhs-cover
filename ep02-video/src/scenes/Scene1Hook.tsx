import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { Stamp } from "../components/Stamp";
import { TitleBlock } from "../components/TitleBlock";
import { fontFamily } from "../fonts";
import { COLORS } from "../theme";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tilt = interpolate(frame, [0.6 * fps, 1.5 * fps], [-14, 22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const lineOpacity = interpolate(frame, [2.2 * fps, 2.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell pose="pushGlasses" voiceover="scene1-hook">
      <TitleBlock
        title={"花 0 块钱\n拉长健康寿命的 3 件事"}
        subtitle="千元抗衰丸，比不过免费的 A 级证据"
      />
      <div
        style={{
          marginTop: 36,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", width: 860, height: 430 }}>
          <svg width="860" height="340" viewBox="0 0 860 340">
            <line x1="430" y1="24" x2="430" y2="130" stroke={COLORS.stroke} strokeWidth="10" />
            <circle cx="430" cy="22" r="16" fill={COLORS.stroke} />
            <g style={{ transformOrigin: "430px 140px", rotate: `${tilt}deg` }}>
              <rect x="90" y="128" width="680" height="22" rx="11" fill={COLORS.stroke} />
              <path
                d="M130 150 H310 L340 290 H100 Z"
                fill={COLORS.redSoft}
                stroke={COLORS.stroke}
                strokeWidth="6"
              />
              <rect x="168" y="188" width="42" height="58" rx="8" fill="#F59E0B" stroke={COLORS.stroke} strokeWidth="4" />
              <rect x="222" y="176" width="42" height="70" rx="8" fill="#EF4444" stroke={COLORS.stroke} strokeWidth="4" />
              <path
                d="M520 150 H700 L730 290 H490 Z"
                fill={COLORS.greenSoft}
                stroke={COLORS.stroke}
                strokeWidth="6"
              />
              <circle cx="610" cy="214" r="46" fill={COLORS.green} stroke={COLORS.stroke} strokeWidth="5" />
              <text
                x="610"
                y="230"
                textAnchor="middle"
                fontFamily={fontFamily}
                fontSize="44"
                fontWeight="900"
                fill="#fff"
              >
                ¥0
              </text>
            </g>
          </svg>
          <div
            style={{
              position: "absolute",
              left: 70,
              right: 70,
              bottom: 8,
              display: "flex",
              justifyContent: "space-between",
              fontFamily,
              fontWeight: 900,
              fontSize: 40,
            }}
          >
            <span style={{ color: COLORS.red, width: 280, textAlign: "center" }}>千元抗衰</span>
            <span style={{ color: COLORS.greenDark, width: 280, textAlign: "center" }}>免费方案</span>
          </div>
          <div style={{ position: "absolute", right: 8, top: 0 }}>
            <Stamp label="A级证据" from={Math.round(1.3 * fps)} />
          </div>
        </div>
        <div
          style={{
            opacity: lineOpacity,
            fontFamily,
            fontSize: 44,
            fontWeight: 900,
            color: COLORS.ink,
            background: COLORS.card,
            border: `4px solid ${COLORS.stroke}`,
            borderRadius: 20,
            padding: "18px 32px",
            marginTop: -8,
          }}
        >
          真正能打的，往往一分钱不用花
        </div>
      </div>
    </SceneShell>
  );
};
