import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {sansFamily, serifFamily} from "../fonts";
import {COLORS} from "../theme";
import timeline from "./timeline.json";

const CAPTIONS = timeline.captions;
const SCENES = timeline.scenes;
const OVERLAYS = timeline.overlays;

export const Ep02Vibe: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.parchment}}>
      {SCENES.map((scene) => (
        <Sequence
          key={scene.id}
          from={Math.round(scene.start * fps)}
          durationInFrames={Math.max(
            1,
            Math.round((scene.end - scene.start) * fps),
          )}
          premountFor={fps}
        >
          <KenBurnsImage src={scene.src} />
        </Sequence>
      ))}

      <Sequence premountFor={fps}>
        <CaptionLayer />
      </Sequence>
      <Sequence premountFor={fps}>
        <OverlayLayer />
      </Sequence>

      <Audio src={staticFile("vibe/vo.mp3")} volume={1} />
      <Audio src={staticFile("vibe/bgm.mp3")} volume={0.12} />
    </AbsoluteFill>
  );
};

const KenBurnsImage: React.FC<{readonly src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.05, 1.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const y = interpolate(frame, [0, durationInFrames], [0, -28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );

  return (
    <AbsoluteFill style={{opacity}}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale,
          translate: `0 ${y}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(28,23,18,0.18) 0%, transparent 28%, rgba(28,23,18,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const CaptionLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  if (t >= 80.2) return null;
  const active = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!active) return null;

  const local = frame - Math.round(active.start * fps);
  const opacity = interpolate(local, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 8], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 220,
        paddingLeft: 64,
        paddingRight: 64,
        opacity,
        translate: `0 ${y}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(243,230,207,0.94)",
          border: `2px solid ${COLORS.ink}22`,
          borderRadius: 18,
          padding: "24px 28px",
          fontFamily: sansFamily,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.ink,
          textAlign: "center",
          lineHeight: 1.4,
          boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};

const OverlayLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill>
      {OVERLAYS.map((o, i) => {
        if (t < o.at || t >= o.until) return null;
        const local = frame - Math.round(o.at * fps);
        const opacity = interpolate(local, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        if (o.title) {
          return (
            <AbsoluteFill
              key={i}
              style={{
                opacity,
                alignItems: "center",
                paddingTop: 140,
              }}
            >
              <div
                style={{
                  fontFamily: serifFamily,
                  fontSize: 64,
                  fontWeight: 700,
                  color: COLORS.snow,
                  textAlign: "center",
                  textShadow: "0 6px 24px rgba(0,0,0,0.45)",
                  lineHeight: 1.3,
                }}
              >
                {o.title}
                <br />
                <span style={{fontSize: 42, color: COLORS.gold}}>{o.sub}</span>
              </div>
            </AbsoluteFill>
          );
        }

        if (o.stamp) {
          return (
            <AbsoluteFill
              key={i}
              style={{
                opacity,
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 420,
              }}
            >
              <div
                style={{
                  rotate: "-8deg",
                  border: `5px solid ${COLORS.burgundy}`,
                  color: COLORS.burgundy,
                  background: "rgba(248,241,228,0.9)",
                  borderRadius: 12,
                  padding: "16px 24px",
                  fontFamily: serifFamily,
                  fontSize: 48,
                  fontWeight: 700,
                }}
              >
                {o.stamp}
              </div>
            </AbsoluteFill>
          );
        }

        if (o.badge) {
          return (
            <AbsoluteFill
              key={i}
              style={{opacity, alignItems: "center", paddingTop: 120}}
            >
              <div
                style={{
                  fontFamily: sansFamily,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.ink,
                  background: COLORS.ochre,
                  padding: "14px 28px",
                  borderRadius: 999,
                }}
              >
                {o.badge}
              </div>
            </AbsoluteFill>
          );
        }

        if (o.choice) {
          return (
            <AbsoluteFill
              key={i}
              style={{
                opacity,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 260,
                paddingLeft: 70,
                paddingRight: 70,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <ChoiceRow
                  label="继续买抗衰补剂"
                  sub="证据弱 · 花大钱"
                  color={COLORS.warn}
                />
                <ChoiceRow
                  label="先把 0 元三件事做满"
                  sub="A 级证据 · 成本趋零"
                  color={COLORS.tealSoft}
                />
                <div
                  style={{
                    marginTop: 12,
                    textAlign: "center",
                    fontFamily: sansFamily,
                    fontSize: 30,
                    color: COLORS.snow,
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  评论区打个数字：你做到了几件？
                </div>
              </div>
            </AbsoluteFill>
          );
        }

        return null;
      })}
    </AbsoluteFill>
  );
};

const ChoiceRow: React.FC<{
  readonly label: string;
  readonly sub: string;
  readonly color: string;
}> = ({label, sub, color}) => (
  <div
    style={{
      background: "rgba(28,23,18,0.72)",
      border: `3px solid ${color}`,
      borderRadius: 18,
      padding: "22px 24px",
    }}
  >
    <div
      style={{
        fontFamily: sansFamily,
        fontSize: 38,
        fontWeight: 700,
        color: COLORS.snow,
      }}
    >
      {label}
    </div>
    <div
      style={{
        marginTop: 6,
        fontFamily: sansFamily,
        fontSize: 28,
        color,
      }}
    >
      {sub}
    </div>
  </div>
);
