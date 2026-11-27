import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TipIcon } from "../components/Icons";
import { SceneChrome } from "../components/SceneChrome";
import { bodyFont, displayFont } from "../fonts";
import type { TipSceneData } from "../script";
import { theme } from "../theme";

export const TipScene: React.FC<{ data: TipSceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const statIn = spring({
    frame: frame - Math.round(0.35 * fps),
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const bar = interpolate(frame, [0.2 * fps, 1.1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SceneChrome accentShift={data.number === "03" ? 16 : 4}>
      <AbsoluteFill style={{ padding: "220px 80px 120px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 168,
              height: 168,
              borderRadius: 36,
              background: theme.accentSoft,
              border: `1px solid ${theme.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: interpolate(iconIn, [0, 1], [0.7, 1], {
                output: "perceptual-scale",
              }),
              rotate: `${interpolate(iconIn, [0, 1], [-8, 0])}deg`,
            }}
          >
            <TipIcon icon={data.icon} size={108} />
          </div>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontFamily: displayFont,
                fontSize: 72,
                color: theme.accent,
                lineHeight: 1,
              }}
            >
              {data.number}
            </div>
            <div
              style={{
                marginTop: 16,
                display: "inline-flex",
                padding: "10px 18px",
                borderRadius: 999,
                background:
                  data.evidence === "A"
                    ? "rgba(61,187,138,0.18)"
                    : theme.accentSoft,
                color:
                  data.evidence === "A" ? theme.success : theme.accent,
                fontSize: 28,
                letterSpacing: "0.08em",
              }}
            >
              证据 {data.evidence}
            </div>
          </div>
        </div>

        <div
          style={{
            fontFamily: displayFont,
            fontSize: 72,
            lineHeight: 1.15,
            maxWidth: 920,
            marginBottom: 28,
          }}
        >
          {data.title}
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 34,
            color: theme.accent,
            marginBottom: 28,
          }}
        >
          {data.cost}
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 40,
            lineHeight: 1.45,
            color: theme.muted,
            maxWidth: 900,
            marginBottom: 56,
          }}
        >
          {data.plain}
        </div>

        <div
          style={{
            marginTop: "auto",
            padding: "36px 34px",
            borderRadius: 28,
            background: theme.card,
            border: `1px solid ${theme.line}`,
            opacity: statIn,
            translate: `0px ${interpolate(statIn, [0, 1], [30, 0])}px`,
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 96,
              color: theme.accent,
              lineHeight: 1,
            }}
          >
            {data.stat}
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 32,
              color: theme.muted,
            }}
          >
            {data.statLabel}
          </div>
          <div
            style={{
              marginTop: 28,
              height: 10,
              borderRadius: 999,
              background: "rgba(243,238,227,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${bar * 100}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${theme.accent}, ${theme.danger})`,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </SceneChrome>
  );
};
