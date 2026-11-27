import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Caption} from "../components/Caption";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const ProtectScene: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [70, 150], [0.18, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill>
      <Background tone="day" />
      <AbsoluteFill style={{alignItems: "center", paddingTop: 110}}>
        <div style={{display: "flex", alignItems: "center", gap: 16}}>
          <div style={{width: 72, height: 72, borderRadius: "50%", background: COLORS.ochre, color: COLORS.ink, fontFamily: serifFamily, fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"}}>03</div>
          <div style={{fontFamily: sansFamily, fontSize: 34, color: COLORS.burgundy, letterSpacing: 4}}>第三件</div>
        </div>
        <div style={{marginTop: 30, fontFamily: serifFamily, fontSize: 50, fontWeight: 700, color: COLORS.ink, textAlign: "center", lineHeight: 1.35}}>
          硬核防晒
          <br />+ 管住烟酒重盐
        </div>
        <div style={{marginTop: 44, width: 860}}>
          <div style={{background: COLORS.snow, borderRadius: 20, border: `2px solid ${COLORS.ink}18`, padding: "22px 26px"}}>
            <div style={{fontFamily: sansFamily, fontSize: 26, color: COLORS.mute, marginBottom: 14}}>皮肤老化 80% 来自紫外线</div>
            <Bar label="¥2000 抗衰精华" value={0.22} color={COLORS.warn} />
            <div style={{height: 12}} />
            <Bar label="黑胶伞 + 帽子" value={bar} color={COLORS.teal} />
          </div>
          <div style={{marginTop: 18, display: "flex", gap: 14, opacity: interpolate(frame, [120, 140], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}}>
            {["烟", "酒", "重盐"].map((item) => (
              <div key={item} style={{flex: 1, background: `${COLORS.warn}12`, border: `2px solid ${COLORS.warn}66`, borderRadius: 16, padding: "20px 8px", textAlign: "center", fontFamily: serifFamily, fontSize: 38, fontWeight: 700, color: COLORS.warn}}>禁止 {item}</div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <Caption appearAt={50} lines={frame < 320 ? ["老化不是缺胶原蛋白", "而是紫外线照出来的"] : ["戒烟少酒少盐", "成本是负数——还省钱"]} />
    </AbsoluteFill>
  );
};

const Bar: React.FC<{label: string; value: number; color: string}> = ({label, value, color}) => (
  <div>
    <div style={{display: "flex", justifyContent: "space-between", fontFamily: sansFamily, fontSize: 30, fontWeight: 700, color: COLORS.ink, marginBottom: 8}}>
      <span>{label}</span>
      <span style={{color}}>{Math.round(value * 100)}%</span>
    </div>
    <div style={{height: 18, borderRadius: 999, background: `${COLORS.ink}12`, overflow: "hidden"}}>
      <div style={{width: `${value * 100}%`, height: "100%", background: color, borderRadius: 999}} />
    </div>
  </div>
);
