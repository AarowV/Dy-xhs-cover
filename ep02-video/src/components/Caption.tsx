import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {sansFamily} from "../fonts";
import {COLORS} from "../theme";

export const Caption: React.FC<{readonly lines: string[]; readonly appearAt?: number}> = ({
  lines,
  appearAt = 0,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appearAt, appearAt + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [appearAt, appearAt + 10], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 150,
        paddingLeft: 70,
        paddingRight: 70,
        opacity,
        translate: `0 ${y}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(243,230,207,0.94)",
          border: `2px solid ${COLORS.ink}22`,
          borderRadius: 18,
          padding: "26px 30px",
          fontFamily: sansFamily,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.ink,
          textAlign: "center",
          lineHeight: 1.42,
          boxShadow: "0 16px 36px rgba(0,0,0,0.14)",
        }}
      >
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
