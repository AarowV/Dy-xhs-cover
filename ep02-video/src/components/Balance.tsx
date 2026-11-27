import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const Balance: React.FC<{readonly tipAt?: number}> = ({tipAt = 20}) => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [tipAt, tipAt + 18], [0, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <div
      style={{
        width: 820,
        height: 520,
        position: "relative",
        marginTop: 80,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 40,
          width: 28,
          height: 280,
          background: COLORS.ink,
          translate: "-50% 0",
          borderRadius: 8,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 20,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: COLORS.ochre,
          border: `6px solid ${COLORS.ink}`,
          translate: "-50% 0",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 120,
          width: 640,
          height: 18,
          background: COLORS.ink,
          translate: "-50% 0",
          rotate: `${rotate}deg`,
          transformOrigin: "50% 50%",
          borderRadius: 10,
        }}
      >
        <Pan
          side="left"
          label={"千元抗衰丸"}
          sub={"证据弱"}
          color={COLORS.warn}
          delayed
        />
        <Pan
          side="right"
          label={"¥0 三件事"}
          sub={"A级证据"}
          color={COLORS.teal}
        />
      </div>
    </div>
  );
};

const Pan: React.FC<{
  readonly side: "left" | "right";
  readonly label: string;
  readonly sub: string;
  readonly color: string;
  readonly delayed?: boolean;
}> = ({side, label, sub, color, delayed}) => {
  const frame = useCurrentFrame();
  const drop = interpolate(
    frame,
    delayed ? [8, 22] : [0, 14],
    [-30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 18,
        left: side === "left" ? -40 : undefined,
        right: side === "right" ? -40 : undefined,
        width: 220,
        translate: `0 ${drop}px`,
      }}
    >
      <div
        style={{
          width: 4,
          height: 70,
          background: COLORS.ink,
          margin: "0 auto",
        }}
      />
      <div
        style={{
          background: COLORS.snow,
          border: `3px solid ${COLORS.ink}`,
          borderRadius: 16,
          padding: "22px 16px",
          textAlign: "center",
          boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.ink,
            marginBottom: 8,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: sansFamily,
            fontSize: 28,
            color,
            fontWeight: 700,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
};
