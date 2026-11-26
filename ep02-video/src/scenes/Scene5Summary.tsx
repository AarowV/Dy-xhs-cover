import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { Stamp } from "../components/Stamp";
import { fontFamily } from "../fonts";
import { COLORS } from "../theme";

const ITEMS = [
  "规律睡够 7–8 小时",
  "每周 150 分钟快走 + 2 次抗阻",
  "硬防晒 + 控烟酒盐",
];

export const Scene5Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell pose="nod" voiceover="scene5-summary">
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 72,
          color: COLORS.ink,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        0 元顶级健康 3 件套
      </div>

      <div
        style={{
          marginTop: 36,
          background: COLORS.card,
          border: `6px solid ${COLORS.green}`,
          borderRadius: 32,
          padding: "48px 36px 28px",
          position: "relative",
          boxShadow: `0 0 0 12px ${COLORS.greenSoft}`,
          scale: interpolate(frame, [0, 0.45 * fps], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <div style={{ position: "absolute", top: -26, right: 28 }}>
          <Stamp label="建议截图" color={COLORS.green} from={6} />
        </div>

        {ITEMS.map((item, i) => {
          const start = (0.7 + i * 1.1) * fps;
          const opacity = interpolate(frame, [start, start + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [start, start + 12], [28, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 26,
                opacity,
                translate: `${x}px 0px`,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: COLORS.green,
                  color: "#fff",
                  fontFamily,
                  fontWeight: 900,
                  fontSize: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `3px solid ${COLORS.stroke}`,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily,
                  fontWeight: 900,
                  fontSize: 42,
                  color: COLORS.ink,
                  lineHeight: 1.3,
                }}
              >
                {item}
              </div>
            </div>
          );
        })}

        <div
          style={{
            marginTop: 8,
            paddingTop: 16,
            borderTop: `2px dashed ${COLORS.dot}`,
            fontFamily,
            fontSize: 22,
            lineHeight: 1.45,
            color: COLORS.inkMuted,
            textAlign: "center",
          }}
        >
          循证科普，不构成个人医疗建议
          <br />
          框架参考 HowToLiveBetter（CC-BY-4.0，已独立改编）
        </div>
      </div>

      <div
        style={{
          marginTop: 36,
          opacity: interpolate(frame, [8 * fps, 8.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontFamily,
          fontSize: 36,
          fontWeight: 900,
          textAlign: "center",
          color: COLORS.ink,
          lineHeight: 1.4,
          paddingRight: 220,
        }}
      >
        这 3 件事，你做到了几件？
        <br />
        <span style={{ color: COLORS.inkMuted, fontWeight: 700, fontSize: 30 }}>
          下期：25 / 35 / 45 岁体检清单
        </span>
      </div>
    </SceneShell>
  );
};
