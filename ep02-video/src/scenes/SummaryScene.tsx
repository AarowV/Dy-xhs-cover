import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Stamp} from "../components/Stamp";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

const ITEMS = [
  "规律睡够 7–8 小时",
  "每周 150 分钟快走 + 2 次练肌肉",
  "硬防晒 + 控烟酒盐",
];

export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const showChoice = frame > 360;

  return (
    <AbsoluteFill>
      <Background tone={showChoice ? "deep" : "day"} />
      {!showChoice ? <Checklist /> : <Choice />}
    </AbsoluteFill>
  );
};

const Checklist: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: "center", paddingTop: 140}}>
      <div
        style={{
          fontFamily: serifFamily,
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.ink,
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        0 元顶级健康 3 件套
      </div>
      <Stamp text="建议截图保存" appearAt={10} size={40} color={COLORS.teal} />

      <div
        style={{
          marginTop: 48,
          width: 860,
          background: COLORS.snow,
          borderRadius: 24,
          border: `2px solid ${COLORS.ink}18`,
          padding: "28px 32px",
          boxShadow: "0 18px 40px rgba(28,23,18,0.1)",
        }}
      >
        {ITEMS.map((item, i) => {
          const appear = 40 + i * 28;
          const opacity = interpolate(frame, [appear, appear + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [appear, appear + 12], [24, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={item}
              style={{
                opacity,
                translate: `${x}px 0`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "22px 8px",
                borderBottom:
                  i === ITEMS.length - 1 ? "none" : `1px solid ${COLORS.ink}14`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: COLORS.teal,
                  color: COLORS.snow,
                  fontFamily: serifFamily,
                  fontSize: 30,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: sansFamily,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.ink,
                  lineHeight: 1.35,
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 40,
          fontFamily: sansFamily,
          fontSize: 36,
          color: COLORS.inkSoft,
          textAlign: "center",
          opacity: interpolate(frame, [140, 160], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        这三件事，你目前做到了几件？
      </div>
    </AbsoluteFill>
  );
};

const Choice: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [360, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        padding: "0 70px",
      }}
    >
      <div
        style={{
          fontFamily: sansFamily,
          fontSize: 34,
          letterSpacing: 6,
          color: COLORS.gold,
          marginBottom: 24,
        }}
      >
        换你做选择
      </div>
      <div
        style={{
          fontFamily: serifFamily,
          fontSize: 54,
          fontWeight: 700,
          color: COLORS.snow,
          textAlign: "center",
          lineHeight: 1.4,
          marginBottom: 56,
        }}
      >
        下一笔健康预算
        <br />
        你押哪边？
      </div>

      <div style={{display: "flex", flexDirection: "column", gap: 24, width: "100%"}}>
        <ChoiceButton
          label="继续买抗衰补剂"
          sub="证据弱 · 花大钱"
          tone="warn"
          appear={380}
        />
        <ChoiceButton
          label="先把 0 元三件事做满"
          sub="A 级证据 · 成本趋零"
          tone="good"
          appear={400}
        />
      </div>

      <div
        style={{
          marginTop: 56,
          fontFamily: sansFamily,
          fontSize: 30,
          color: "rgba(248,241,228,0.75)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        评论区打个数字：你做到了几件？
        <br />
        下期：体检别再被套餐割韭菜
      </div>
    </AbsoluteFill>
  );
};

const ChoiceButton: React.FC<{
  readonly label: string;
  readonly sub: string;
  readonly tone: "warn" | "good";
  readonly appear: number;
}> = ({label, sub, tone, appear}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appear, appear + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [appear, appear + 12], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const color = tone === "good" ? COLORS.tealSoft : COLORS.warn;

  return (
    <div
      style={{
        opacity,
        translate: `0 ${y}px`,
        background: "rgba(255,255,255,0.08)",
        border: `3px solid ${color}`,
        borderRadius: 20,
        padding: "26px 28px",
      }}
    >
      <div
        style={{
          fontFamily: sansFamily,
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.snow,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: sansFamily,
          fontSize: 28,
          color,
        }}
      >
        {sub}
      </div>
    </div>
  );
};
