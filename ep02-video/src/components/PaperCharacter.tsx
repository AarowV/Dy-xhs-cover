import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

export type CharacterPose =
  | "pushGlasses"
  | "shrug"
  | "pointUp"
  | "magnifier"
  | "nod";

type Props = {
  pose?: CharacterPose;
  size?: number;
  style?: React.CSSProperties;
};

export const PaperCharacter: React.FC<Props> = ({
  pose = "pushGlasses",
  size = 360,
  style,
}) => {
  const frame = useCurrentFrame();
  const bob = interpolate(Math.sin(frame / 14), [-1, 1], [-5, 5]);
  const blink =
    frame % 96 > 88
      ? interpolate(frame % 96, [88, 92, 96], [1, 0.12, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const nod =
    pose === "nod"
      ? interpolate(Math.sin(frame / 9), [-1, 1], [8, -6], {
          easing: Easing.inOut(Easing.sin),
        })
      : 0;

  const leftArm = armAngle(pose, "left", frame);
  const rightArm = armAngle(pose, "right", frame);
  const brow = pose === "pointUp" || pose === "shrug" ? -7 : pose === "nod" ? 2 : 0;
  const mouth =
    pose === "shrug"
      ? "M 76 122 Q 100 110 124 122"
      : pose === "nod"
        ? "M 76 116 Q 100 132 124 116"
        : "M 78 120 Q 100 128 122 120";

  const glassesPush =
    pose === "pushGlasses"
      ? interpolate(Math.sin(frame / 10), [-1, 1], [0, 5])
      : 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        translate: `0px ${bob}px`,
        ...style,
      }}
    >
      <svg viewBox="0 0 200 230" width="100%" height="100%">
        <ellipse cx="100" cy="216" rx="48" ry="8" fill="#00000016" />

        <rect x="76" y="168" width="16" height="32" rx="7" fill="#1F2937" stroke={COLORS.stroke} strokeWidth="3" />
        <rect x="108" y="168" width="16" height="32" rx="7" fill="#1F2937" stroke={COLORS.stroke} strokeWidth="3" />
        <ellipse cx="82" cy="202" rx="15" ry="7" fill="#111827" />
        <ellipse cx="118" cy="202" rx="15" ry="7" fill="#111827" />

        <path
          d="M58 100 C58 80 78 74 100 74 C122 74 142 80 142 100 L148 166 C148 178 52 178 52 166 Z"
          fill={COLORS.green}
          stroke={COLORS.stroke}
          strokeWidth="3.5"
        />
        <path
          d="M74 132 H126 V156 C126 164 74 164 74 156 Z"
          fill={COLORS.greenDark}
          stroke={COLORS.stroke}
          strokeWidth="3"
        />
        <line x1="92" y1="90" x2="88" y2="118" stroke="#ECFDF5" strokeWidth="3" strokeLinecap="round" />
        <line x1="108" y1="90" x2="112" y2="118" stroke="#ECFDF5" strokeWidth="3" strokeLinecap="round" />

        <g style={{ transformOrigin: "62px 112px", rotate: `${leftArm}deg` }}>
          <rect x="22" y="104" width="44" height="16" rx="8" fill={COLORS.green} stroke={COLORS.stroke} strokeWidth="3" />
          <circle cx="24" cy="112" r="11" fill="#F8D7B8" stroke={COLORS.stroke} strokeWidth="3" />
        </g>

        <g style={{ transformOrigin: "138px 112px", rotate: `${rightArm}deg` }}>
          <rect
            x="134"
            y="104"
            width={pose === "pointUp" ? 58 : 44}
            height="16"
            rx="8"
            fill={COLORS.green}
            stroke={COLORS.stroke}
            strokeWidth="3"
          />
          <circle
            cx={pose === "pointUp" ? 190 : 176}
            cy="112"
            r="11"
            fill="#F8D7B8"
            stroke={COLORS.stroke}
            strokeWidth="3"
          />
          {pose === "magnifier" ? (
            <g>
              <circle cx="196" cy="86" r="18" fill="#BFDBFE99" stroke={COLORS.stroke} strokeWidth="4" />
              <line x1="184" y1="98" x2="170" y2="112" stroke={COLORS.stroke} strokeWidth="5" strokeLinecap="round" />
            </g>
          ) : null}
        </g>

        <g style={{ transformOrigin: "100px 78px", rotate: `${nod}deg` }}>
          <circle cx="100" cy="66" r="40" fill="#F8D7B8" stroke={COLORS.stroke} strokeWidth="3.5" />
          <path
            d="M64 56 C70 26 130 26 136 56 C118 42 82 42 64 56 Z"
            fill="#1F2937"
            stroke={COLORS.stroke}
            strokeWidth="3"
          />
          <circle cx="62" cy="70" r="8" fill="#F8D7B8" stroke={COLORS.stroke} strokeWidth="3" />
          <circle cx="138" cy="70" r="8" fill="#F8D7B8" stroke={COLORS.stroke} strokeWidth="3" />

          <g style={{ transformOrigin: "118px 70px", translate: `${glassesPush}px 0px` }}>
            <circle cx="82" cy="70" r="13" fill="#FFFFFFAA" stroke={COLORS.stroke} strokeWidth="3.5" />
            <circle cx="118" cy="70" r="13" fill="#FFFFFFAA" stroke={COLORS.stroke} strokeWidth="3.5" />
            <line x1="95" y1="70" x2="105" y2="70" stroke={COLORS.stroke} strokeWidth="3.5" />
            <line x1="69" y1="70" x2="62" y2="66" stroke={COLORS.stroke} strokeWidth="3.5" />
            <line x1="131" y1="70" x2="138" y2="66" stroke={COLORS.stroke} strokeWidth="3.5" />
          </g>

          <ellipse cx="82" cy="70" rx="3.6" ry={3.6 * blink} fill={COLORS.stroke} />
          <ellipse cx="118" cy="70" rx="3.6" ry={3.6 * blink} fill={COLORS.stroke} />
          <path
            d={`M70 ${60 + brow} Q82 ${54 + brow} 94 ${60 + brow}`}
            fill="none"
            stroke={COLORS.stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={`M106 ${60 + brow} Q118 ${54 + brow} 130 ${60 + brow}`}
            fill="none"
            stroke={COLORS.stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d={mouth} fill="none" stroke={COLORS.stroke} strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

function armAngle(pose: CharacterPose, side: "left" | "right", frame: number) {
  const wiggle = Math.sin(frame / 11) * 3;
  // Left arm rests pointing left, so a positive angle lifts it.
  // Right arm rests pointing right, so a negative angle lifts it.
  if (pose === "shrug") {
    return side === "left" ? 54 + wiggle : -54 - wiggle;
  }
  if (pose === "pointUp") {
    return side === "left" ? 12 : -92;
  }
  if (pose === "magnifier") {
    return side === "left" ? 14 : -34;
  }
  if (pose === "pushGlasses") {
    return side === "left" ? 8 : -74;
  }
  return side === "left" ? 24 : -24;
}
