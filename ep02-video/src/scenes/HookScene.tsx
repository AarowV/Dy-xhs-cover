import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Balance} from "../components/Balance";
import {Caption} from "../components/Caption";
import {Stamp} from "../components/Stamp";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const askOpacity = interpolate(frame, [280, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background tone="day" />
      <AbsoluteFill
        style={{
          alignItems: "center",
          paddingTop: 120,
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.ink,
            textAlign: "center",
            lineHeight: 1.35,
            padding: "0 80px",
            opacity: interpolate(frame, [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          花大钱买抗衰丸
          <br />
          证据等级垫底
        </div>
        <Balance tipAt={36} />
        <div style={{marginTop: 40}}>
          <Stamp text="证据拉满 · 成本趋零" appearAt={54} size={42} />
        </div>
      </AbsoluteFill>

      {frame < 280 ? (
        <Caption
          appearAt={70}
          lines={["全球顶级医学指南翻底：", "真正能拉长健康寿命的事", "往往一分钱不用花"]}
        />
      ) : (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 180,
            opacity: askOpacity,
          }}
        >
          <div
            style={{
              fontFamily: sansFamily,
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.burgundy,
              background: COLORS.snow,
              padding: "28px 36px",
              borderRadius: 18,
              border: `2px solid ${COLORS.burgundy}33`,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            换你——钱花在哪边？
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
