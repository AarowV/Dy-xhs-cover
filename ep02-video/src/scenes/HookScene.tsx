import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Caption} from "../components/Caption";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tip = interpolate(frame, [28, 48], [0, 16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const stamp = interpolate(frame, [55, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });

  return (
    <AbsoluteFill>
      <Background tone="day" />
      <AbsoluteFill style={{alignItems: "center", paddingTop: 120}}>
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 54,
            fontWeight: 700,
            color: COLORS.ink,
            textAlign: "center",
            lineHeight: 1.35,
            opacity: interpolate(frame, [0, 12], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
          }}
        >
          花大钱买抗衰丸
          <br />
          证据等级垫底
        </div>

        <div style={{marginTop: 70, width: 820, height: 460, position: "relative"}}>
          <div style={{position: "absolute", left: "50%", top: 30, width: 26, height: 250, background: COLORS.ink, translate: "-50% 0", borderRadius: 8}} />
          <div style={{position: "absolute", left: "50%", top: 10, width: 64, height: 64, borderRadius: "50%", background: COLORS.ochre, border: `6px solid ${COLORS.ink}`, translate: "-50% 0", zIndex: 2}} />
          <div style={{position: "absolute", left: "50%", top: 110, width: 620, height: 16, background: COLORS.ink, translate: "-50% 0", rotate: `${tip}deg`, borderRadius: 10}}>
            <Pan side="left" label="千元抗衰丸" sub="证据弱" color={COLORS.warn} />
            <Pan side="right" label="¥0 三件事" sub="A级证据" color={COLORS.teal} />
          </div>
        </div>

        <div style={{opacity: stamp, scale: interpolate(frame, [55, 68], [1.4, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), rotate: "-8deg", border: `5px solid ${COLORS.burgundy}`, color: COLORS.burgundy, borderRadius: 12, padding: "14px 22px", fontFamily: serifFamily, fontSize: 42, fontWeight: 700, background: "rgba(255,255,255,0.12)"}}>
          证据拉满 · 成本趋零
        </div>
      </AbsoluteFill>
      <Caption appearAt={70} lines={frame < 280 ? ["真正能拉长健康寿命的事", "往往一分钱不用花"] : ["换你——钱花在哪边？"]} />
    </AbsoluteFill>
  );
};

const Pan: React.FC<{side: "left" | "right"; label: string; sub: string; color: string}> = ({side, label, sub, color}) => (
  <div style={{position: "absolute", top: 16, left: side === "left" ? -30 : undefined, right: side === "right" ? -30 : undefined, width: 210}}>
    <div style={{width: 4, height: 64, background: COLORS.ink, margin: "0 auto"}} />
    <div style={{background: COLORS.snow, border: `3px solid ${COLORS.ink}`, borderRadius: 16, padding: "20px 14px", textAlign: "center"}}>
      <div style={{fontFamily: serifFamily, fontSize: 34, fontWeight: 700, color: COLORS.ink}}>{label}</div>
      <div style={{fontFamily: sansFamily, fontSize: 28, fontWeight: 700, color, marginTop: 6}}>{sub}</div>
    </div>
  </div>
);
