import React from "react";
import { COLORS } from "../theme";

type BoxProps = {
  children: React.ReactNode;
  tone?: "bad" | "good" | "neutral";
  size?: number;
};

export const IconBox: React.FC<BoxProps> = ({
  children,
  tone = "neutral",
  size = 88,
}) => {
  const bg =
    tone === "bad" ? COLORS.redSoft : tone === "good" ? COLORS.greenSoft : "#fff";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 20,
        background: bg,
        border: `3px solid ${COLORS.stroke}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export const PillBottle: React.FC<{ color?: string }> = ({ color = "#F59E0B" }) => (
  <svg width="52" height="64" viewBox="0 0 52 64">
    <rect x="16" y="2" width="20" height="10" rx="3" fill="#fff" stroke={COLORS.stroke} strokeWidth="3" />
    <rect x="8" y="12" width="36" height="48" rx="8" fill={color} stroke={COLORS.stroke} strokeWidth="3" />
    <rect x="14" y="24" width="24" height="16" rx="3" fill="#fff" stroke={COLORS.stroke} strokeWidth="2.5" />
  </svg>
);

export const CreamJar: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56">
    <rect x="10" y="16" width="36" height="10" rx="4" fill="#FBCFE8" stroke={COLORS.stroke} strokeWidth="3" />
    <rect x="6" y="26" width="44" height="24" rx="8" fill="#F9A8D4" stroke={COLORS.stroke} strokeWidth="3" />
    <rect x="16" y="34" width="24" height="8" rx="2" fill="#fff" stroke={COLORS.stroke} strokeWidth="2" />
  </svg>
);

export const Phone: React.FC = () => (
  <svg width="40" height="64" viewBox="0 0 40 64">
    <rect x="3" y="2" width="34" height="60" rx="6" fill="#111827" stroke={COLORS.stroke} strokeWidth="3" />
    <rect x="7" y="8" width="26" height="42" rx="2" fill="#93C5FD" />
    <circle cx="20" cy="56" r="2.5" fill="#fff" />
  </svg>
);

export const MoonClock: React.FC = () => (
  <svg width="88" height="88" viewBox="0 0 88 88">
    <circle cx="44" cy="44" r="36" fill={COLORS.greenSoft} stroke={COLORS.green} strokeWidth="6" />
    <path d="M48 22 A22 22 0 1 0 66 48 A16 16 0 1 1 48 22 Z" fill="#FDE68A" stroke={COLORS.stroke} strokeWidth="3" />
    <line x1="44" y1="44" x2="44" y2="28" stroke={COLORS.stroke} strokeWidth="4" strokeLinecap="round" />
    <line x1="44" y1="44" x2="56" y2="50" stroke={COLORS.stroke} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const Umbrella: React.FC = () => (
  <svg width="72" height="64" viewBox="0 0 72 64">
    <path d="M8 30 Q36 4 64 30 Z" fill={COLORS.ink} stroke={COLORS.stroke} strokeWidth="3" />
    <line x1="36" y1="30" x2="36" y2="50" stroke={COLORS.stroke} strokeWidth="4" strokeLinecap="round" />
    <path d="M36 50 Q48 50 48 40" fill="none" stroke={COLORS.stroke} strokeWidth="4" strokeLinecap="round" />
    <line x1="22" y1="30" x2="22" y2="22" stroke="#fff" strokeWidth="2" />
    <line x1="36" y1="30" x2="36" y2="16" stroke="#fff" strokeWidth="2" />
    <line x1="50" y1="30" x2="50" y2="22" stroke="#fff" strokeWidth="2" />
  </svg>
);

export const Cap: React.FC = () => (
  <svg width="78" height="52" viewBox="0 0 78 52">
    <path d="M14 30 Q32 6 54 26 L50 32 Q32 16 16 32 Z" fill={COLORS.green} stroke={COLORS.stroke} strokeWidth="3" />
    <path d="M8 30 H58 Q74 30 74 36 Q48 44 8 36 Z" fill={COLORS.greenDark} stroke={COLORS.stroke} strokeWidth="3" />
  </svg>
);

export const Cigarette: React.FC = () => (
  <svg width="56" height="24" viewBox="0 0 56 24">
    <rect x="2" y="6" width="40" height="12" rx="2" fill="#fff" stroke={COLORS.stroke} strokeWidth="3" />
    <rect x="32" y="6" width="10" height="12" fill="#F59E0B" stroke={COLORS.stroke} strokeWidth="3" />
  </svg>
);

export const Glass: React.FC = () => (
  <svg width="36" height="52" viewBox="0 0 36 52">
    <path d="M6 4 H30 L24 28 Q18 36 18 36 Q12 36 12 28 Z" fill="#FECACA" stroke={COLORS.stroke} strokeWidth="3" />
    <line x1="18" y1="36" x2="18" y2="46" stroke={COLORS.stroke} strokeWidth="3" />
    <line x1="10" y1="48" x2="26" y2="48" stroke={COLORS.stroke} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const SaltShaker: React.FC = () => (
  <svg width="36" height="52" viewBox="0 0 36 52">
    <rect x="8" y="10" width="20" height="36" rx="6" fill="#fff" stroke={COLORS.stroke} strokeWidth="3" />
    <rect x="10" y="4" width="16" height="10" rx="3" fill="#E5E7EB" stroke={COLORS.stroke} strokeWidth="3" />
    <circle cx="14" cy="22" r="1.6" fill={COLORS.stroke} />
    <circle cx="20" cy="26" r="1.6" fill={COLORS.stroke} />
    <circle cx="16" cy="32" r="1.6" fill={COLORS.stroke} />
  </svg>
);

export const BanMark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "relative", width: 84, height: 84 }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 18,
        background: COLORS.redSoft,
        border: `3px solid ${COLORS.stroke}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      style={{ position: "absolute", inset: 0 }}
    >
      <circle cx="42" cy="42" r="28" fill="none" stroke={COLORS.red} strokeWidth="6" />
      <line x1="24" y1="60" x2="60" y2="24" stroke={COLORS.red} strokeWidth="6" strokeLinecap="round" />
    </svg>
  </div>
);

export const HouseFire: React.FC<{ flame?: number }> = ({ flame = 1 }) => (
  <svg width="220" height="150" viewBox="0 0 220 150">
    <path d="M40 70 L100 28 L160 70 V128 H40 Z" fill="#fff" stroke={COLORS.stroke} strokeWidth="4" />
    <rect x="86" y="88" width="28" height="40" fill={COLORS.redSoft} stroke={COLORS.stroke} strokeWidth="3" />
    <path
      d={`M70 ${48 - flame * 6} Q78 ${20 - flame * 10} 90 46 Q98 ${16 - flame * 8} 108 50 Q100 36 92 40 Q84 28 70 ${48 - flame * 6} Z`}
      fill="#F97316"
      stroke={COLORS.stroke}
      strokeWidth="3"
    />
    <path
      d={`M148 ${36 - flame * 4} Q156 ${12 - flame * 8} 168 38 Q160 24 152 30 Q146 18 148 ${36 - flame * 4} Z`}
      fill="#EF4444"
      stroke={COLORS.stroke}
      strokeWidth="3"
    />
    <g transform="translate(150,78)">
      <rect x="0" y="8" width="28" height="36" rx="6" fill="#C4B5FD" stroke={COLORS.stroke} strokeWidth="3" />
      <rect x="6" y="0" width="16" height="12" rx="3" fill="#DDD6FE" stroke={COLORS.stroke} strokeWidth="3" />
    </g>
  </svg>
);
