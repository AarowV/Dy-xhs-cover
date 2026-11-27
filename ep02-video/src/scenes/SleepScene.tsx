import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Caption} from "../components/Caption";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const SleepScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background tone="night" />
      <AbsoluteFill style={{alignItems: "center", paddingTop: 110}}>
        <Badge n="01" label="第一件" />
        <div style={{marginTop: 34, fontFamily: serifFamily, fontSize: 56, fontWeight: 700, color: COLORS.snow, textAlign: "center", lineHeight: 1.35}}>
          守住每天
          <br />7–8 小时规律睡眠
        </div>
        <div style={{marginTop: 50, display: "flex", gap: 24}}>
          <Card bad title="熬夜 + 补剂" lines={["护肝片", "贵妇眼霜", "周末补觉"]} appear={24} />
          <Card title="规律作息" lines={["固定入睡", "睡够 7 小时", "大脑清垃圾"]} appear={42} />
        </div>
        <div style={{marginTop: 36, opacity: interpolate(frame, [180, 205], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), fontFamily: sansFamily, fontSize: 34, color: COLORS.gold, background: "rgba(255,255,255,0.08)", padding: "16px 24px", borderRadius: 14, border: `1px solid ${COLORS.gold}55`}}>
          规律 7–8 小时 ＞ 周末补觉
        </div>
      </AbsoluteFill>
      <Caption appearAt={60} lines={frame < 280 ? ["关键词不是“周末补觉”", "而是“规律”"] : ["房子着火了却买香薰", "睡够 7 小时，比任何补剂都高"]} />
    </AbsoluteFill>
  );
};

const Badge: React.FC<{n: string; label: string}> = ({n, label}) => (
  <div style={{display: "flex", alignItems: "center", gap: 16}}>
    <div style={{width: 72, height: 72, borderRadius: "50%", background: COLORS.ochre, color: COLORS.ink, fontFamily: serifFamily, fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"}}>{n}</div>
    <div style={{fontFamily: sansFamily, fontSize: 34, color: COLORS.gold, letterSpacing: 4}}>{label}</div>
  </div>
);

const Card: React.FC<{title: string; lines: string[]; bad?: boolean; appear: number}> = ({title, lines, bad, appear}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appear, appear + 12], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const y = interpolate(frame, [appear, appear + 12], [24, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)});
  return (
    <div style={{width: 360, opacity, translate: `0 ${y}px`, background: bad ? "rgba(214,69,69,0.14)" : "rgba(47,154,122,0.16)", border: `2px solid ${bad ? COLORS.warn : COLORS.tealSoft}`, borderRadius: 20, padding: "26px 22px"}}>
      <div style={{fontFamily: serifFamily, fontSize: 38, fontWeight: 700, color: bad ? COLORS.warn : COLORS.tealSoft, marginBottom: 16, textAlign: "center"}}>{bad ? "✕ " : "✓ "}{title}</div>
      {lines.map((line) => (
        <div key={line} style={{fontFamily: sansFamily, fontSize: 32, color: COLORS.snow, textAlign: "center", lineHeight: 1.55}}>{line}</div>
      ))}
    </div>
  );
};
