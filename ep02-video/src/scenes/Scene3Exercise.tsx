import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { fontFamily } from "../fonts";
import { COLORS } from "../theme";

export const Scene3Exercise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0.5 * fps, 3.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const zoneOpacity = interpolate(frame, [2.4 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strikeOpacity = interpolate(frame, [6 * fps, 6.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const noteOpacity = interpolate(frame, [10 * fps, 10.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const path = buildCurvePath(progress);

  return (
    <SceneShell pose="magnifier" voiceover="scene3-exercise">
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 64,
          color: COLORS.ink,
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        第二件：每周 150 分钟
        <br />
        <span style={{ color: COLORS.greenDark }}>微喘运动 + 2 次力量</span>
      </div>

      <div
        style={{
          marginTop: 28,
          background: COLORS.card,
          border: `4px solid ${COLORS.stroke}`,
          borderRadius: 28,
          padding: "20px 16px 12px",
        }}
      >
        <svg width="100%" height="460" viewBox="0 0 880 460">
          <line x1="80" y1="36" x2="80" y2="360" stroke={COLORS.stroke} strokeWidth="5" />
          <line x1="80" y1="360" x2="840" y2="360" stroke={COLORS.stroke} strokeWidth="5" />
          <text x="24" y="32" fontFamily={fontFamily} fontSize="28" fontWeight="700" fill={COLORS.inkMuted}>
            收益
          </text>
          <text x="760" y="400" fontFamily={fontFamily} fontSize="28" fontWeight="700" fill={COLORS.inkMuted}>
            运动量
          </text>
          <rect x="80" y="48" width="390" height="312" fill={COLORS.greenSoft} opacity={zoneOpacity * 0.95} />
          <line
            x1="470"
            y1="48"
            x2="470"
            y2="360"
            stroke={COLORS.green}
            strokeWidth="4"
            strokeDasharray="8 8"
            opacity={zoneOpacity}
          />
          <text
            x="250"
            y="430"
            textAnchor="middle"
            fontFamily={fontFamily}
            fontSize="28"
            fontWeight="900"
            fill={COLORS.greenDark}
            opacity={zoneOpacity}
          >
            0 → 150 分钟
          </text>
          <path d={path} fill="none" stroke={COLORS.green} strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>

      <div
        style={{
          marginTop: 22,
          display: "flex",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flex: 1.4,
            opacity: zoneOpacity,
            background: COLORS.greenSoft,
            border: `4px solid ${COLORS.green}`,
            borderRadius: 20,
            padding: "16px 20px",
            fontFamily,
            fontWeight: 900,
            fontSize: 32,
            lineHeight: 1.35,
            color: COLORS.ink,
          }}
        >
          收益最高甜点区
          <br />
          每周 150 分钟快走 + 2 次练肌肉
        </div>
        <div
          style={{
            flex: 0.8,
            opacity: strikeOpacity,
            background: COLORS.redSoft,
            border: `4px solid ${COLORS.stroke}`,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            fontFamily,
            fontWeight: 900,
            fontSize: 32,
            color: COLORS.red,
            textAlign: "center",
            padding: 12,
          }}
        >
          ¥3000
          <br />
          健身卡
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0 }}
          >
            <line x1="12" y1="18" x2="88" y2="82" stroke={COLORS.red} strokeWidth="4" />
            <line x1="12" y1="82" x2="88" y2="18" stroke={COLORS.red} strokeWidth="4" />
          </svg>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          opacity: noteOpacity,
          textAlign: "center",
          fontFamily,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.ink,
        }}
      >
        每天快走 25 分钟，在家练两次就够
      </div>
    </SceneShell>
  );
};

function buildCurvePath(progress: number) {
  const points: Array<[number, number]> = [];
  const steps = 48;
  const drawn = Math.max(1, Math.floor(steps * progress));
  for (let i = 0; i <= drawn; i++) {
    const t = i / steps;
    const x = 80 + t * 720;
    const rise = Math.pow(t / 0.55, 0.55) * 0.9;
    const yNorm = t < 0.55 ? rise : 0.9 + (t - 0.55) * 0.12;
    const y = 360 - yNorm * 280;
    points.push([x, y]);
  }
  return points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}
