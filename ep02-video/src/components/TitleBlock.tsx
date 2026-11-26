import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { COLORS } from "../theme";

type Props = {
  title: string;
  subtitle?: string;
  from?: number;
};

export const TitleBlock: React.FC<Props> = ({ title, subtitle, from = 0 }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - from);
  const y = interpolate(local, [0, 16], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        translate: `0px ${y}px`,
        opacity,
        textAlign: "center",
        padding: "0 8px",
        whiteSpace: "pre-line",
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 80,
          lineHeight: 1.22,
          color: COLORS.ink,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 18,
            fontFamily,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.inkMuted,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
