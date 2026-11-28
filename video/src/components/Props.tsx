import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { kaiFont, songFont } from "../fonts";
import { theme } from "../theme";

export const ScrollReveal: React.FC<{
  lines: string[];
  from?: number;
}> = ({ lines, from = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = interpolate(frame - from, [0, 0.9 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        width: 120 + lines.length * 96,
        height: 620 * open,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${theme.parchment}, ${theme.parchmentDeep})`,
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        borderLeft: `12px solid ${theme.crimson}`,
        borderRight: `12px solid ${theme.crimson}`,
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 36,
        padding: "56px 40px",
      }}
    >
      {lines.map((line, i) => {
        const t = spring({
          frame: frame - from - Math.round((0.35 + i * 0.18) * fps),
          fps,
          config: { damping: 200 },
        });
        return (
          <div
            key={line}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              fontFamily: kaiFont,
              fontSize: 68,
              color: "#2A221C",
              letterSpacing: "0.28em",
              opacity: t,
              height: 480,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const Stamp: React.FC<{
  text: string;
  delay?: number;
}> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hit = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  return (
    <div
      style={{
        width: 170,
        height: 170,
        border: `6px solid ${theme.crimson}`,
        color: theme.crimson,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: kaiFont,
        fontSize: text.length > 3 ? 42 : 56,
        letterSpacing: "0.08em",
        background: "rgba(228,220,203,0.08)",
        rotate: `${interpolate(hit, [0, 1], [-18, -8])}deg`,
        scale: interpolate(hit, [0, 1], [1.6, 1], {
          output: "perceptual-scale",
        }),
        opacity: hit,
        boxShadow: `0 0 0 3px rgba(183,39,34,0.25)`,
      }}
    >
      {text}
    </div>
  );
};

export const Silhouette: React.FC<{
  x: number;
  y: number;
  scale?: number;
  robe?: string;
  hat?: boolean;
  bow?: number;
}> = ({
  x,
  y,
  scale = 1,
  robe = "#6B5B4F",
  hat = true,
  bow = 0,
}) => (
  <svg
    width={70 * scale}
    height={140 * scale}
    viewBox="0 0 70 140"
    style={{
      position: "absolute",
      left: x,
      top: y,
      rotate: `${bow}deg`,
      transformOrigin: "center bottom",
    }}
  >
    {hat ? (
      <>
        <rect x="18" y="4" width="34" height="8" fill="#1A1614" />
        <rect x="8" y="8" width="12" height="5" fill="#1A1614" />
        <rect x="50" y="8" width="12" height="5" fill="#1A1614" />
      </>
    ) : (
      <ellipse cx="35" cy="10" rx="8" ry="6" fill="#1A1614" />
    )}
    <circle cx="35" cy="28" r="12" fill="#2E2622" />
    <path
      d="M18 42 C18 42 12 120 20 128 L50 128 C58 120 52 42 52 42 Z"
      fill={robe}
    />
    <path d="M22 70 L10 100" stroke={robe} strokeWidth="8" strokeLinecap="round" />
    <path d="M48 70 L60 100" stroke={robe} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export const PalaceBackdrop: React.FC<{ night?: boolean }> = ({
  night = true,
}) => (
  <AbsoluteFill
    style={{
      background: night
        ? `linear-gradient(180deg, ${theme.night} 0%, ${theme.duskTop} 48%, #5A322C 100%)`
        : `linear-gradient(180deg, #6E4E43 0%, ${theme.duskBottom} 100%)`,
    }}
  >
    {/* ground */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "28%",
        background: "linear-gradient(180deg, #3A2A26, #241816)",
      }}
    />
    {/* wall */}
    <div
      style={{
        position: "absolute",
        left: "6%",
        right: "6%",
        bottom: "26%",
        height: 260,
        background: "linear-gradient(180deg, #8B2E28, #6B1F1C)",
      }}
    />
    {/* roof */}
    <div
      style={{
        position: "absolute",
        left: "12%",
        right: "12%",
        bottom: "48%",
        height: 110,
        background: "#1A1412",
        clipPath: "polygon(0 100%, 5% 18%, 95% 18%, 100% 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: "20%",
        right: "20%",
        bottom: "56%",
        height: 70,
        background: "#12100F",
        clipPath: "polygon(0 100%, 8% 0, 92% 0, 100% 100%)",
      }}
    />
    {[18, 34, 50, 66, 82].map((left) => (
      <div
        key={left}
        style={{
          position: "absolute",
          left: `${left}%`,
          bottom: "49%",
          width: 16,
          height: 22,
          borderRadius: "40% 40% 20% 20%",
          background: theme.glow,
          boxShadow: `0 0 22px 7px rgba(232,160,84,0.4)`,
        }}
      />
    ))}
    {/* pillars */}
    {[16, 32, 68, 84].map((left) => (
      <div
        key={`p-${left}`}
        style={{
          position: "absolute",
          left: `${left}%`,
          bottom: "26%",
          width: 28,
          height: 240,
          background: "#4A1C18",
        }}
      />
    ))}
  </AbsoluteFill>
);

export const RiskMeter: React.FC<{
  value: number;
  label: string;
}> = ({ value, label }) => {
  const width = interpolate(value, [0, 100], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 560 }}>
      <div
        style={{
          fontFamily: songFont,
          fontSize: 28,
          color: theme.inkMuted,
          marginBottom: 14,
        }}
      >
        {label}
      </div>
      <div
        style={{
          height: 18,
          background: "rgba(248,248,248,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width,
            height: "100%",
            background: `linear-gradient(90deg, ${theme.glow}, ${theme.crimson})`,
          }}
        />
      </div>
    </div>
  );
};

export const ChoiceButtons: React.FC<{
  left: { title: string; sub: string };
  right: { title: string; sub: string };
  delay?: number;
}> = ({ left, right, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const Button = ({
    title,
    sub,
    bg,
  }: {
    title: string;
    sub: string;
    bg: string;
  }) => (
    <div
      style={{
        width: 280,
        height: 150,
        background: bg,
        border: "2px solid rgba(255,255,255,0.85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        opacity: t,
        translate: `0px ${interpolate(t, [0, 1], [28, 0])}px`,
      }}
    >
      <div
        style={{
          fontFamily: kaiFont,
          fontSize: 64,
          color: theme.ink,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: songFont,
          fontSize: 24,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        {sub}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 28 }}>
      <Button title={left.title} sub={left.sub} bg={theme.crimson} />
      <Button title={right.title} sub={right.sub} bg={theme.slate} />
    </div>
  );
};
