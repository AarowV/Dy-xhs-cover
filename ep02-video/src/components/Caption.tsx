import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {sansFamily} from "../fonts";
import {COLORS} from "../theme";

export const Caption: React.FC<{
  readonly lines: string[];
  readonly appearAt?: number;
  readonly color?: string;
  readonly size?: number;
}> = ({
  lines,
  appearAt = 0,
  color = COLORS.ink,
  size = 46,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appearAt, appearAt + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [appearAt, appearAt + 12], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 160,
        paddingLeft: 72,
        paddingRight: 72,
        opacity,
        translate: `0 ${y}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(243,230,207,0.92)",
          border: `2px solid ${COLORS.ink}22`,
          borderRadius: 18,
          padding: "28px 32px",
          boxShadow: "0 18px 40px rgba(28,23,18,0.12)",
          fontFamily: sansFamily,
          color,
          fontSize: size,
          lineHeight: 1.45,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
