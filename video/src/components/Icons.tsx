import React from "react";
import { theme } from "../theme";

const stroke = {
  fill: "none",
  stroke: theme.accent,
  strokeWidth: 8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const TipIcon: React.FC<{
  icon: "seatbelt" | "helmet" | "smoke" | "ebike" | "bp";
  size?: number;
}> = ({ icon, size = 120 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      {icon === "seatbelt" ? (
        <>
          <rect x="28" y="22" width="64" height="76" rx="14" {...stroke} />
          <path d="M40 46 H80" {...stroke} />
          <path d="M48 70 L72 46" {...stroke} />
          <circle cx="60" cy="70" r="8" fill={theme.accent} />
        </>
      ) : null}
      {icon === "helmet" ? (
        <>
          <path d="M20 72 C22 38 98 38 100 72" {...stroke} />
          <path d="M20 72 H100" {...stroke} />
          <path d="M36 72 V84 H84 V72" {...stroke} />
          <path d="M48 50 H72" {...stroke} />
        </>
      ) : null}
      {icon === "smoke" ? (
        <>
          <circle cx="60" cy="68" r="28" {...stroke} />
          <path d="M60 40 V28" {...stroke} />
          <path d="M48 24 C52 16 68 16 72 24" {...stroke} />
          <circle cx="60" cy="68" r="8" fill={theme.danger} />
        </>
      ) : null}
      {icon === "ebike" ? (
        <>
          <circle cx="34" cy="78" r="16" {...stroke} />
          <circle cx="90" cy="78" r="16" {...stroke} />
          <path d="M34 78 L52 46 H78 L90 78" {...stroke} />
          <path d="M52 46 L62 78" {...stroke} />
          <path d="M64 36 H84" {...stroke} />
        </>
      ) : null}
      {icon === "bp" ? (
        <>
          <rect x="34" y="28" width="52" height="64" rx="12" {...stroke} />
          <path d="M46 52 H74" {...stroke} />
          <path d="M46 68 H66" {...stroke} />
          <circle cx="74" cy="68" r="6" fill={theme.accent} />
        </>
      ) : null}
    </svg>
  );
};
