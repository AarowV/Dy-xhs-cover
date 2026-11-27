import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { bodyFont, displayFont } from "../fonts";
import { theme } from "../theme";
import { Background } from "./Background";

export const SceneChrome: React.FC<{
  children: React.ReactNode;
  accentShift?: number;
  showBrand?: boolean;
}> = ({ children, accentShift = 0, showBrand = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, 0.45 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ fontFamily: bodyFont, color: theme.ink }}>
      <Background accentShift={accentShift} />
      {showBrand ? (
        <div
          style={{
            position: "absolute",
            top: 88,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: enter,
            translate: `0px ${interpolate(enter, [0, 1], [16, 0])}px`,
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 34,
              letterSpacing: "0.08em",
              color: theme.accent,
            }}
          >
            高性价比人生指南
          </div>
          <div
            style={{
              fontSize: 26,
              color: theme.muted,
              letterSpacing: "0.14em",
            }}
          >
            EP.01
          </div>
        </div>
      ) : null}
      <AbsoluteFill
        style={{
          opacity: enter,
          translate: `0px ${interpolate(enter, [0, 1], [28, 0])}px`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
