import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { songFont } from "../fonts";
import { subtitleShadow, theme } from "../theme";

export const PaperGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => (
  <AbsoluteFill
    style={{
      opacity,
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0 1px, transparent 1px),
        radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0 1px, transparent 1px)
      `,
      backgroundSize: "3px 3px, 4px 4px",
      mixBlendMode: "multiply",
      pointerEvents: "none",
    }}
  />
);

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
      pointerEvents: "none",
    }}
  />
);

export const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 36,
      bottom: 28,
      display: "flex",
      alignItems: "center",
      gap: 10,
      opacity: 0.55,
      fontFamily: songFont,
      color: theme.ink,
      fontSize: 22,
      letterSpacing: "0.08em",
    }}
  >
    <div
      style={{
        width: 22,
        height: 22,
        border: `1.5px solid ${theme.ink}`,
      }}
    />
    高性价比
  </div>
);

export const Citation: React.FC<{ text?: string }> = ({ text }) => {
  if (!text) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        bottom: 28,
        right: 220,
        fontFamily: songFont,
        fontSize: 18,
        lineHeight: 1.4,
        color: theme.inkDim,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </div>
  );
};

export const Badge: React.FC<{ text?: string }> = ({ text }) => {
  if (!text) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 48,
        padding: "8px 16px",
        border: `1px solid rgba(248,248,248,0.55)`,
        color: theme.ink,
        fontFamily: songFont,
        fontSize: 26,
        letterSpacing: "0.12em",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      {text}
    </div>
  );
};

export const HighlightSubtitle: React.FC<{
  text: string;
  highlights?: string[];
}> = ({ text, highlights = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0.15 * fps, 0.55 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    let earliest = -1;
    let hit = "";
    for (const h of highlights) {
      const idx = remaining.indexOf(h);
      if (idx >= 0 && (earliest < 0 || idx < earliest)) {
        earliest = idx;
        hit = h;
      }
    }
    if (earliest < 0) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (earliest > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, earliest)}</span>);
    }
    parts.push(
      <span key={key++} style={{ color: theme.crimson }}>
        {hit}
      </span>,
    );
    remaining = remaining.slice(earliest + hit.length);
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 96,
        textAlign: "center",
        fontFamily: songFont,
        fontSize: 48,
        lineHeight: 1.45,
        color: theme.ink,
        textShadow: subtitleShadow,
        opacity,
      }}
    >
      {parts}
    </div>
  );
};

export const TopCounter: React.FC<{
  label: string;
  value: number;
  suffix?: string;
}> = ({ label, value, suffix = "" }) => (
  <div
    style={{
      position: "absolute",
      top: 36,
      right: 48,
      textAlign: "right",
      fontFamily: songFont,
      color: theme.ink,
      textShadow: subtitleShadow,
    }}
  >
    <div style={{ fontSize: 24, color: theme.inkMuted, marginBottom: 6 }}>
      {label}
    </div>
    <div style={{ fontSize: 72, fontWeight: 700, color: theme.crimson }}>
      {Math.round(value)}
      <span style={{ fontSize: 36, marginLeft: 4 }}>{suffix}</span>
    </div>
  </div>
);
