import React from "react";
import {AbsoluteFill} from "remotion";
import {COLORS} from "../theme";

export const Background: React.FC<{readonly tone?: "day" | "night" | "deep"}> = ({
  tone = "day",
}) => {
  const bg =
    tone === "night"
      ? `radial-gradient(ellipse at 50% 18%, ${COLORS.nightSoft} 0%, ${COLORS.night} 72%)`
      : tone === "deep"
        ? `radial-gradient(ellipse at 40% 0%, #5C1A24 0%, ${COLORS.burgundy} 48%, #2A0C12 100%)`
        : `radial-gradient(ellipse at 50% 0%, ${COLORS.snow} 0%, ${COLORS.parchment} 48%, ${COLORS.parchmentDeep} 100%)`;
  return (
    <AbsoluteFill style={{background: bg}}>
      <AbsoluteFill
        style={{
          opacity: tone === "day" ? 0.32 : 0.16,
          backgroundImage: "radial-gradient(rgba(28,23,18,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "18px 18px",
        }}
      />
    </AbsoluteFill>
  );
};
