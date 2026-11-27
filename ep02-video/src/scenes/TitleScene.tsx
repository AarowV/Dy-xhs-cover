import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const y = interpolate(frame, [0, 16], [36, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill>
      <Background tone="deep" />
      <AbsoluteFill style={{justifyContent: "center", alignItems: "center", opacity, translate: `0 ${y}px`, padding: "0 80px"}}>
        <div style={{fontFamily: sansFamily, fontSize: 34, letterSpacing: 8, color: COLORS.gold, marginBottom: 26}}>高性价比人生 · 第2期</div>
        <div style={{fontFamily: serifFamily, fontSize: 76, fontWeight: 700, color: COLORS.snow, textAlign: "center", lineHeight: 1.3, textShadow: "0 8px 30px rgba(0,0,0,0.35)"}}>
          不花一分钱
          <br />最能拉长健康寿命
          <br />的 3 件事
        </div>
        <div style={{marginTop: 44, fontFamily: sansFamily, fontSize: 32, color: "rgba(248,241,228,0.78)"}}>医学界公认 · A 级证据</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
