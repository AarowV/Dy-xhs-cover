import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { HouseFire, IconBox, MoonClock, Phone, PillBottle, CreamJar } from "../components/Icons";
import { SceneShell } from "../components/SceneShell";
import { fontFamily } from "../fonts";
import { COLORS } from "../theme";

export const Scene2Sleep: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const useNod = frame > 16 * fps;
  const flame = interpolate(Math.sin(frame / 5), [-1, 1], [0.4, 1]);

  const leftX = interpolate(frame, [0.3 * fps, 0.9 * fps], [-48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rightX = interpolate(frame, [0.8 * fps, 1.4 * fps], [48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const crossOpacity = interpolate(frame, [1.6 * fps, 2.1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const checkOpacity = interpolate(frame, [2.4 * fps, 2.9 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const metaphorOpacity = interpolate(frame, [6 * fps, 6.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const punchOpacity = interpolate(frame, [12 * fps, 12.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell pose={useNod ? "nod" : "pointUp"} voiceover="scene2-sleep">
      <Headline>第一件：规律睡眠 7–8 小时</Headline>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 28 }}>
        <CompareCard
          title="熬夜 + 补剂 + 眼霜"
          tone="bad"
          translateX={leftX}
          badge="✕"
          badgeOpacity={crossOpacity}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <IconBox tone="bad">
              <Phone />
            </IconBox>
            <IconBox tone="bad">
              <PillBottle />
            </IconBox>
            <IconBox tone="bad">
              <CreamJar />
            </IconBox>
          </div>
        </CompareCard>
        <CompareCard
          title="规律 7–8 小时"
          tone="good"
          translateX={rightX}
          badge="✓"
          badgeOpacity={checkOpacity}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MoonClock />
          </div>
        </CompareCard>
      </div>

      <div
        style={{
          marginTop: 28,
          opacity: metaphorOpacity,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: COLORS.card,
          border: `4px solid ${COLORS.red}`,
          borderRadius: 24,
          padding: "8px 20px 8px 8px",
        }}
      >
        <HouseFire flame={flame} />
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 36,
            lineHeight: 1.35,
            color: COLORS.ink,
          }}
        >
          房子着火了，
          <br />
          还在花钱买香薰
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          opacity: punchOpacity,
          fontFamily,
          fontSize: 44,
          fontWeight: 900,
          textAlign: "center",
          color: COLORS.ink,
          background: COLORS.card,
          border: `4px solid ${COLORS.green}`,
          borderRadius: 20,
          padding: "20px 16px",
        }}
      >
        规律 7–8 小时 <span style={{ color: COLORS.green }}>＞</span> 周末补觉
      </div>
    </SceneShell>
  );
};

const Headline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily,
      fontWeight: 900,
      fontSize: 68,
      lineHeight: 1.2,
      color: COLORS.ink,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

const CompareCard: React.FC<{
  title: string;
  tone: "bad" | "good";
  children: React.ReactNode;
  translateX: number;
  badgeOpacity: number;
  badge: string;
}> = ({ title, tone, children, translateX, badgeOpacity, badge }) => {
  const accent = tone === "bad" ? COLORS.red : COLORS.green;
  const soft = tone === "bad" ? COLORS.redSoft : COLORS.greenSoft;
  return (
    <div
      style={{
        flex: 1,
        background: COLORS.card,
        border: `4px solid ${COLORS.stroke}`,
        borderRadius: 28,
        padding: "28px 16px 22px",
        translate: `${translateX}px 0px`,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -22,
          right: -8,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: soft,
          border: `4px solid ${accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 34,
          fontWeight: 900,
          color: accent,
          opacity: badgeOpacity,
          fontFamily,
        }}
      >
        {badge}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 32,
          color: accent,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
};
