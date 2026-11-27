import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const Background: React.FC<{ accentShift?: number }> = ({
  accentShift = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, 8 * fps], [0, 28], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: `
            radial-gradient(ellipse 70% 45% at ${28 + accentShift}% ${18 + drift * 0.1}%, rgba(232,165,75,0.22), transparent 60%),
            radial-gradient(ellipse 55% 40% at ${78 - accentShift}% ${72}% , rgba(61,187,138,0.12), transparent 55%),
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(18,32,56,0.9), transparent 70%)
          `,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage: `
            linear-gradient(${theme.line} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.line} 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          translate: `0px ${drift % 72}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, transparent 0%, rgba(8,17,31,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
