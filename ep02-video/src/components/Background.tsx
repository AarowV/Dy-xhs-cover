import React from "react";
import {AbsoluteFill} from "remotion";
import {COLORS} from "../theme";

export const Background: React.FC<{
  readonly tone?: "day" | "night" | "deep";
}> = ({tone = "day"}) => {
  const bg =
    tone === "night"
      ? `radial-gradient(ellipse at 50% 20%, ${COLORS.nightSoft} 0%, ${COLORS.night} 70%)`
      : tone === "deep"
        ? `radial-gradient(ellipse at 40% 0%, #5C1A24 0%, ${COLORS.burgundy} 45%, #2A0C12 100%)`
        : `radial-gradient(ellipse at 50% 0%, ${COLORS.snow} 0%, ${COLORS.parchment} 45%, ${COLORS.parchmentDeep} 100%)`;

  return (
    <AbsoluteFill style={{background: bg}}>
      <AbsoluteFill
        style={{
          opacity: tone === "day" ? 0.35 : 0.18,
          backgroundImage:
            "radial-gradient(rgba(28,23,18,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "18px 18px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            tone === "day"
              ? "linear-gradient(180deg, rgba(255,255,255,0.18), transparent 28%, rgba(28,23,18,0.08) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.05), transparent 35%, rgba(0,0,0,0.28) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
