import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {Background} from "../components/Background";
import {Caption} from "../components/Caption";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";

export const ProtectScene: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [80, 160], [0.18, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <Background tone="day" />
      <AbsoluteFill style={{alignItems: "center", paddingTop: 110}}>
        <div style={{display: "flex", alignItems: "center", gap: 16}}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: COLORS.ochre,
              color: COLORS.ink,
              fontFamily: serifFamily,
              fontSize: 30,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            03
          </div>
          <div
            style={{
              fontFamily: sansFamily,
              fontSize: 34,
              color: COLORS.burgundy,
              letterSpacing: 4,
            }}
          >
            第三件
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            fontFamily: serifFamily,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.ink,
            textAlign: "center",
            lineHeight: 1.35,
            padding: "0 70px",
          }}
        >
          硬核防晒
          <br />
          + 管住烟酒重盐
        </div>

        <div
          style={{
            marginTop: 48,
            width: 860,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <CompareRow
            left="¥2000 抗衰精华"
            right="黑胶伞 + 帽子"
            leftValue={0.22}
            rightValue={bar}
            note="皮肤老化 80% 来自紫外线"
          />
          <BanRow appear={120} />
        </div>
      </AbsoluteFill>

      <Caption
        appearAt={60}
        lines={
          frame < 360
            ? ["老化不是缺胶原蛋白", "而是紫外线照出来的", "几十块伞，吊打两千块精华"]
            : ["戒烟、少酒、少两勺盐", "成本是负数——还省钱", "高血压/中风/癌症底牌"]
        }
      />
    </AbsoluteFill>
  );
};

const CompareRow: React.FC<{
  readonly left: string;
  readonly right: string;
  readonly leftValue: number;
  readonly rightValue: number;
  readonly note: string;
}> = ({left, right, leftValue, rightValue, note}) => (
  <div
    style={{
      background: COLORS.snow,
      borderRadius: 20,
      border: `2px solid ${COLORS.ink}18`,
      padding: "24px 28px",
    }}
  >
    <div
      style={{
        fontFamily: sansFamily,
        fontSize: 26,
        color: COLORS.mute,
        marginBottom: 16,
      }}
    >
      {note}
    </div>
    <Bar label={left} value={leftValue} color={COLORS.warn} />
    <div style={{height: 14}} />
    <Bar label={right} value={rightValue} color={COLORS.teal} />
  </div>
);

const Bar: React.FC<{
  readonly label: string;
  readonly value: number;
  readonly color: string;
}> = ({label, value, color}) => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: sansFamily,
        fontSize: 30,
        fontWeight: 700,
        color: COLORS.ink,
        marginBottom: 8,
      }}
    >
      <span>{label}</span>
      <span style={{color}}>{Math.round(value * 100)}%</span>
    </div>
    <div
      style={{
        height: 18,
        borderRadius: 999,
        background: `${COLORS.ink}12`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value * 100}%`,
          height: "100%",
          background: color,
          borderRadius: 999,
        }}
      />
    </div>
  </div>
);

const BanRow: React.FC<{readonly appear: number}> = ({appear}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appear, appear + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const items = ["烟", "酒", "重盐"];
  return (
    <div
      style={{
        opacity,
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      {items.map((item) => (
        <div
          key={item}
          style={{
            flex: 1,
            background: `${COLORS.warn}12`,
            border: `2px solid ${COLORS.warn}66`,
            borderRadius: 16,
            padding: "22px 10px",
            textAlign: "center",
            fontFamily: serifFamily,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.warn,
          }}
        >
          禁止 {item}
        </div>
      ))}
    </div>
  );
};
