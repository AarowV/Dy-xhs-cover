import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";

export const DotBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        backgroundImage: `radial-gradient(${COLORS.dot} 2px, transparent 2px)`,
        backgroundSize: "28px 28px",
        backgroundPosition: "14px 14px",
      }}
    />
  );
};
