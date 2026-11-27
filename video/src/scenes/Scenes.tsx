import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Badge,
  Citation,
  HighlightSubtitle,
  PaperGrain,
  TopCounter,
  Vignette,
  Watermark,
} from "../components/Chrome";
import {
  ChoiceButtons,
  PalaceBackdrop,
  RiskMeter,
  ScrollReveal,
  Silhouette,
  Stamp,
} from "../components/Props";
import { kaiFont, songFont } from "../fonts";
import type { SceneData } from "../script";
import { theme } from "../theme";

const Shell: React.FC<{
  data: SceneData;
  children: React.ReactNode;
  counterValue?: number;
}> = ({ data, children, counterValue }) => (
  <AbsoluteFill style={{ fontFamily: songFont, color: theme.ink }}>
    {children}
    <PaperGrain />
    <Vignette />
    <Badge text={data.badge} />
    {typeof counterValue === "number" && data.counterLabel ? (
      <TopCounter
        label={data.counterLabel}
        value={counterValue}
        suffix={data.counterSuffix}
      />
    ) : null}
    <HighlightSubtitle text={data.subtitle} highlights={data.highlights} />
    <Citation text={data.citation} />
    <Watermark />
  </AbsoluteFill>
);

export const HookScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 180], [0, -40]);

  return (
    <Shell data={data}>
      <PalaceBackdrop night />
      <AbsoluteFill style={{ translate: `${drift}px 0px` }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <Silhouette
            key={i}
            x={70 + (i % 8) * 78}
            y={480 + Math.floor(i / 8) * 88}
            scale={0.78}
            bow={22}
            robe={i % 2 === 0 ? "#5A4A42" : "#4A3C36"}
            hat={false}
          />
        ))}
        <Silhouette x={1360} y={400} scale={1.45} robe="#241E1B" hat />
        <div
          style={{
            position: "absolute",
            left: 1340,
            top: 520,
            width: 160,
            height: 70,
            background: "#3A2A22",
            boxShadow: "0 0 40px rgba(232,160,84,0.25)",
          }}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 160,
          fontFamily: songFont,
          fontSize: 72,
          lineHeight: 1.2,
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        几乎不花钱的动作——
        <div style={{ color: theme.crimson, marginTop: 12, fontSize: 56 }}>
          能明显降低早死概率。
        </div>
      </div>
    </Shell>
  );
};

export const TitleScene: React.FC<{ data: SceneData }> = ({ data }) => {
  return (
    <Shell data={data}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${theme.earth} 0%, #3E2C26 100%)`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScrollReveal lines={data.scrollLines ?? []} />
      </AbsoluteFill>
    </Shell>
  );
};

export const MethodScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cards = ["寿命", "时间精力", "金钱", "人身自由"];

  return (
    <Shell data={data}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 30% 30%, #4A3530, ${theme.night})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 180,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          width: 760,
        }}
      >
        {cards.map((label, i) => {
          const t = spring({
            frame: frame - Math.round((0.35 + i * 0.12) * fps),
            fps,
            config: { damping: 200 },
          });
          return (
            <div
              key={label}
              style={{
                height: 140,
                background: "rgba(228,220,203,0.08)",
                border: `1px solid rgba(248,248,248,0.18)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: kaiFont,
                fontSize: 48,
                opacity: t,
                scale: interpolate(t, [0, 1], [0.92, 1], {
                  output: "perceptual-scale",
                }),
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 220,
          width: 420,
          fontFamily: songFont,
          fontSize: 40,
          lineHeight: 1.55,
          color: theme.inkMuted,
        }}
      >
        花掉什么
        <br />
        <span style={{ color: theme.crimson }}>换回什么</span>
        <br />
        <br />
        挑走一两条就算数
      </div>
    </Shell>
  );
};

const useCountUp = (to: number, startAt = 0.4) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [startAt * fps, (startAt + 1.4) * fps], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
};

export const SeatbeltScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const value = useCountUp(data.counterTo ?? 45);
  const { fps } = useVideoConfig();

  return (
    <Shell data={data} counterValue={value}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #243040 0%, #1A222C 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 220,
          width: 720,
          height: 320,
          border: `2px solid rgba(248,248,248,0.2)`,
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 70,
            width: 220,
            height: 150,
            border: `3px solid ${theme.inkMuted}`,
            borderRadius: 18,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 130,
            width: 200,
            height: 10,
            background: theme.crimson,
            rotate: "28deg",
            transformOrigin: "left center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 280,
            top: 145,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: theme.glow,
          }}
        />
      </div>
      <div style={{ position: "absolute", left: 160, top: 580 }}>
        <RiskMeter value={value} label="轿车前排致命伤风险下降" />
      </div>
      <div style={{ position: "absolute", right: 180, top: 260 }}>
        <Stamp text={data.stamp ?? "证据 A"} delay={Math.round(1.2 * fps)} />
      </div>
    </Shell>
  );
};

export const HelmetScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const value = useCountUp(data.counterTo ?? 42);
  const { fps } = useVideoConfig();

  return (
    <Shell data={data} counterValue={value}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #2B3340, #171C24)`,
        }}
      />
      <svg
        width="420"
        height="320"
        viewBox="0 0 420 320"
        style={{ position: "absolute", left: 200, top: 220 }}
      >
        <path
          d="M60 210 C70 80 350 80 360 210"
          fill="none"
          stroke={theme.ink}
          strokeWidth="10"
        />
        <path
          d="M60 210 H360"
          stroke={theme.crimson}
          strokeWidth="10"
        />
        <path
          d="M120 210 V250 H300 V210"
          fill="none"
          stroke={theme.inkMuted}
          strokeWidth="8"
        />
      </svg>
      <div style={{ position: "absolute", left: 200, top: 580 }}>
        <RiskMeter value={value} label="摩托车骑手死亡风险下降" />
      </div>
      <div style={{ position: "absolute", right: 180, top: 260 }}>
        <Stamp text={data.stamp ?? "证据 A"} delay={Math.round(1.1 * fps)} />
      </div>
    </Shell>
  );
};

export const SmokeScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const value = useCountUp(data.counterTo ?? 60, 0.35);
  const { fps } = useVideoConfig();
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <Shell data={data} counterValue={value}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #3A2A28, #1B1414)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 210,
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: `8px solid ${theme.inkMuted}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${30 + pulse * 20}px rgba(183,39,34,${0.25 + pulse * 0.25})`,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: theme.crimson,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 460,
          top: 250,
          fontFamily: songFont,
          fontSize: 36,
          color: theme.inkMuted,
          lineHeight: 1.6,
        }}
      >
        起火时，四成人在睡觉
        <br />
        鼻子靠不住，报警器靠得住
      </div>
      <div style={{ position: "absolute", left: 220, top: 560 }}>
        <RiskMeter value={value} label="住宅火灾死亡风险下降" />
      </div>
      <div style={{ position: "absolute", right: 180, top: 260 }}>
        <Stamp text={data.stamp ?? "证据 B"} delay={Math.round(1.15 * fps)} />
      </div>
    </Shell>
  );
};

export const EbikeScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const { fps } = useVideoConfig();

  return (
    <Shell data={data}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #2A3038, #12161C)`,
        }}
      />
      {/* stairwell metaphor */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 180 + i * 90,
            top: 220 + i * 50,
            width: 420,
            height: 36,
            background: i === 1 ? theme.crimson : "rgba(248,248,248,0.12)",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 520,
          fontFamily: songFont,
          fontSize: 36,
          color: theme.inkMuted,
        }}
      >
        门厅 · 走道 · 楼梯间 · 安全出口
      </div>
      <div style={{ position: "absolute", right: 220, top: 280 }}>
        <Stamp text={data.stamp ?? "禁入楼道"} delay={Math.round(0.8 * fps)} />
      </div>
    </Shell>
  );
};

export const BpScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const value = useCountUp(data.counterTo ?? 13, 0.45);
  const { fps } = useVideoConfig();
  const tilt = interpolate(value, [0, 13], [0, -14], {
    extrapolateRight: "clamp",
  });

  return (
    <Shell data={data} counterValue={value}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 20%, #3A4555, ${theme.night})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 280,
          width: 520,
          height: 16,
          background: theme.inkMuted,
          rotate: `${tilt}deg`,
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: -70,
            fontFamily: songFont,
            fontSize: 28,
          }}
        >
          高压 −10
        </div>
        <div
          style={{
            position: "absolute",
            right: 40,
            top: -70,
            fontFamily: songFont,
            fontSize: 28,
            color: theme.crimson,
          }}
        >
          死亡 −13%
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 520,
          top: 360,
          width: 24,
          height: 120,
          background: theme.inkDim,
        }}
      />
      <div style={{ position: "absolute", right: 180, top: 240 }}>
        <Stamp text={data.stamp ?? "证据 A"} delay={Math.round(1.2 * fps)} />
      </div>
    </Shell>
  );
};

export const ChoiceScene: React.FC<{ data: SceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, 200], [0, -30]);

  return (
    <Shell data={data}>
      <PalaceBackdrop night />
      <AbsoluteFill style={{ translate: `${drift}px 0px` }}>
        <Silhouette x={1180} y={430} scale={1.4} robe="#3A322C" />
        <Silhouette x={1320} y={450} scale={1.15} robe="#5A4A42" bow={8} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 220,
        }}
      >
        <ChoiceButtons
          left={data.choiceLeft ?? { title: "做", sub: "先挑一两条" }}
          right={data.choiceRight ?? { title: "再等等", sub: "继续赌概率" }}
          delay={Math.round(0.8 * fps)}
        />
      </div>
    </Shell>
  );
};
