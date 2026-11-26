import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BanMark, Cap, Cigarette, CreamJar, Glass, SaltShaker, Umbrella } from "../components/Icons";
import { SceneShell } from "../components/SceneShell";
import { fontFamily } from "../fonts";
import { COLORS } from "../theme";

export const Scene4Sun: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const useNod = frame > 14 * fps;
  const leftBar = interpolate(frame, [1 * fps, 2 * fps], [0.08, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightBar = interpolate(frame, [2.2 * fps, 3.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const banOpacity = interpolate(frame, [6 * fps, 6.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const factOpacity = interpolate(frame, [10 * fps, 10.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell pose={useNod ? "nod" : "shrug"} voiceover="scene4-sun">
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 64,
          color: COLORS.ink,
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        第三件：硬核防晒
        <br />
        再管住烟、酒、盐
      </div>

      <div style={{ display: "flex", gap: 22, marginTop: 32 }}>
        <Column
          title="¥2000 抗衰精华"
          tone="bad"
          bar={leftBar}
          opacity={interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          caption="花大钱 · 证据弱"
        >
          <CreamJar />
        </Column>
        <Column
          title="伞 + 帽子 + 控烟酒盐"
          tone="good"
          bar={rightBar}
          opacity={interpolate(frame, [0.8 * fps, 1.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          caption="成本是负数，还省钱"
        >
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <Umbrella />
            <Cap />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 16,
              opacity: banOpacity,
            }}
          >
            <BanMark>
              <Cigarette />
            </BanMark>
            <BanMark>
              <Glass />
            </BanMark>
            <BanMark>
              <SaltShaker />
            </BanMark>
          </div>
        </Column>
      </div>

      <div
        style={{
          marginTop: 28,
          opacity: factOpacity,
          fontFamily,
          fontSize: 40,
          fontWeight: 900,
          textAlign: "center",
          color: COLORS.ink,
          background: COLORS.greenSoft,
          border: `4px solid ${COLORS.green}`,
          borderRadius: 20,
          padding: "20px 18px",
          lineHeight: 1.35,
        }}
      >
        皮肤老化 80% 来自紫外线
      </div>
    </SceneShell>
  );
};

const Column: React.FC<{
  title: string;
  tone: "bad" | "good";
  bar: number;
  opacity: number;
  caption: string;
  children: React.ReactNode;
}> = ({ title, tone, bar, opacity, caption, children }) => {
  const accent = tone === "bad" ? COLORS.red : COLORS.green;
  return (
    <div
      style={{
        flex: 1,
        background: COLORS.card,
        border: `4px solid ${COLORS.stroke}`,
        borderRadius: 28,
        padding: "24px 18px 20px",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 32,
          color: accent,
          textAlign: "center",
          marginBottom: 16,
          lineHeight: 1.3,
          minHeight: 84,
        }}
      >
        {title}
      </div>
      <div style={{ minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {children}
      </div>
      <div
        style={{
          marginTop: 18,
          width: "100%",
          height: 28,
          borderRadius: 999,
          background: "#E5E7EB",
          overflow: "hidden",
          border: `3px solid ${COLORS.stroke}`,
        }}
      >
        <div style={{ width: `${Math.max(bar * 100, 4)}%`, height: "100%", background: accent }} />
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily,
          fontWeight: 700,
          fontSize: 26,
          color: tone === "good" ? COLORS.greenDark : COLORS.inkMuted,
          textAlign: "center",
        }}
      >
        {caption}
      </div>
    </div>
  );
};
