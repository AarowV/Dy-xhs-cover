import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const Stamp: React.FC<{
  readonly text: string;
  readonly appearAt?: number;
  readonly color?: string;
  readonly size?: number;
}> = ({
  text,
  appearAt = 0,
  color = COLORS.burgundy,
  size = 56,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [appearAt, appearAt + 10], [1.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });
  const opacity = interpolate(frame, [appearAt, appearAt + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        scale,
        rotate: "-8deg",
        border: `5px solid ${color}`,
        color,
        borderRadius: 12,
        padding: "14px 22px",
        fontFamily: serifFamily,
        fontSize: size,
        fontWeight: 700,
        letterSpacing: 4,
        background: "rgba(255,255,255,0.08)",
        boxShadow: `inset 0 0 0 3px ${color}55`,
      }}
    >
      {text}
    </div>
  );
};
