import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { COLORS } from "../theme";

type Props = {
  label: string;
  color?: string;
  from?: number;
  style?: React.CSSProperties;
};

export const Stamp: React.FC<Props> = ({
  label,
  color = COLORS.green,
  from = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - from);
  const scale = interpolate(local, [0, 12], [1.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    output: "perceptual-scale",
  });
  const opacity = interpolate(local, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 22px",
        border: `4px solid ${color}`,
        borderRadius: 12,
        color,
        fontFamily,
        fontWeight: 900,
        fontSize: 36,
        letterSpacing: 2,
        rotate: "-8deg",
        scale,
        opacity,
        backgroundColor: "#ffffffcc",
        ...style,
      }}
    >
      {label}
    </div>
  );
};
