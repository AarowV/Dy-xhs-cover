import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneChrome } from "../components/SceneChrome";
import { displayFont, bodyFont } from "../fonts";
import type { TextSceneData } from "../script";
import { theme } from "../theme";

const Line: React.FC<{ text: string; delay: number; size?: number }> = ({
  text,
  delay,
  size = 48,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        fontFamily: bodyFont,
        fontSize: size,
        lineHeight: 1.35,
        color: theme.muted,
        opacity: t,
        translate: `0px ${interpolate(t, [0, 1], [24, 0])}px`,
        marginTop: 18,
      }}
    >
      {text}
    </div>
  );
};

export const HookScene: React.FC<{ data: TextSceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });

  return (
    <SceneChrome showBrand={false} accentShift={8}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: "0 88px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.28em",
            color: theme.accent,
            marginBottom: 36,
            opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {data.eyebrow}
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 128,
            lineHeight: 1.05,
            scale: interpolate(punch, [0, 1], [0.86, 1], {
              output: "perceptual-scale",
            }),
            transformOrigin: "left center",
          }}
        >
          {data.title}
        </div>
        {data.lines.map((line, i) => (
          <Line key={line} text={line} delay={Math.round((0.35 + i * 0.25) * fps)} size={52} />
        ))}
      </AbsoluteFill>
    </SceneChrome>
  );
};

export const TitleScene: React.FC<{ data: TextSceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = interpolate(frame, [0, 0.7 * fps], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneChrome accentShift={-6}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: "0 88px",
          translate: `0px ${rise}px`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "12px 22px",
            border: `1px solid ${theme.line}`,
            borderRadius: 999,
            color: theme.accent,
            fontSize: 28,
            letterSpacing: "0.08em",
            marginBottom: 36,
            background: theme.accentSoft,
          }}
        >
          {data.eyebrow}
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 108,
            lineHeight: 1.08,
            maxWidth: 900,
          }}
        >
          {data.title}
        </div>
        {data.lines.map((line, i) => (
          <Line
            key={line}
            text={line}
            delay={Math.round((0.45 + i * 0.22) * fps)}
            size={i === 0 ? 56 : 44}
          />
        ))}
      </AbsoluteFill>
    </SceneChrome>
  );
};

export const FrameworkScene: React.FC<{ data: TextSceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const resources = ["寿命", "时间精力", "金钱", "人身自由"];

  return (
    <SceneChrome accentShift={12}>
      <AbsoluteFill style={{ padding: "220px 88px 120px" }}>
        <div
          style={{
            color: theme.accent,
            fontSize: 28,
            letterSpacing: "0.16em",
            marginBottom: 24,
          }}
        >
          {data.eyebrow}
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 88,
            lineHeight: 1.1,
            marginBottom: 40,
          }}
        >
          {data.title}
        </div>
        {data.lines.map((line, i) => (
          <Line key={line} text={line} delay={Math.round((0.2 + i * 0.18) * fps)} />
        ))}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 72,
          }}
        >
          {resources.map((label, i) => {
            const t = spring({
              frame: frame - Math.round((0.9 + i * 0.12) * fps),
              fps,
              config: { damping: 200 },
            });
            return (
              <div
                key={label}
                style={{
                  padding: "28px 26px",
                  borderRadius: 24,
                  background: theme.card,
                  border: `1px solid ${theme.line}`,
                  opacity: t,
                  scale: interpolate(t, [0, 1], [0.92, 1], {
                    output: "perceptual-scale",
                  }),
                  fontFamily: displayFont,
                  fontSize: 42,
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneChrome>
  );
};

export const OutroScene: React.FC<{ data: TextSceneData }> = ({ data }) => {
  const { fps } = useVideoConfig();

  return (
    <SceneChrome accentShift={-10}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: "0 88px",
        }}
      >
        <div
          style={{
            color: theme.accent,
            fontSize: 28,
            letterSpacing: "0.18em",
            marginBottom: 28,
          }}
        >
          {data.eyebrow}
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 96,
            lineHeight: 1.08,
            marginBottom: 28,
          }}
        >
          {data.title}
        </div>
        {data.lines.map((line, i) => (
          <Line
            key={line}
            text={line}
            delay={Math.round((0.35 + i * 0.22) * fps)}
            size={i === 1 ? 34 : 44}
          />
        ))}
      </AbsoluteFill>
    </SceneChrome>
  );
};
