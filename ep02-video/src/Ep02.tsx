import React from "react";
import {AbsoluteFill, Sequence, useVideoConfig} from "remotion";
import {Sfx} from "./components/Sfx";
import {ExerciseScene} from "./scenes/ExerciseScene";
import {HookScene} from "./scenes/HookScene";
import {ProtectScene} from "./scenes/ProtectScene";
import {SleepScene} from "./scenes/SleepScene";
import {SummaryScene} from "./scenes/SummaryScene";
import {TitleScene} from "./scenes/TitleScene";

export const Ep02: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: "#F3E6CF"}}>
      <Sequence durationInFrames={14 * fps} premountFor={fps}>
        <HookScene />
      </Sequence>
      <Sequence from={14 * fps} durationInFrames={6 * fps} premountFor={fps}>
        <TitleScene />
      </Sequence>
      <Sequence from={20 * fps} durationInFrames={20 * fps} premountFor={fps}>
        <SleepScene />
      </Sequence>
      <Sequence from={40 * fps} durationInFrames={20 * fps} premountFor={fps}>
        <ExerciseScene />
      </Sequence>
      <Sequence from={60 * fps} durationInFrames={20 * fps} premountFor={fps}>
        <ProtectScene />
      </Sequence>
      <Sequence from={80 * fps} durationInFrames={20 * fps} premountFor={fps}>
        <SummaryScene />
      </Sequence>

      {/* SFX from wyzowl/sfx-kit + Kenney interface sounds */}
      <Sfx name="whoosh" at={0.2} volume={0.45} />
      <Sfx name="thud" at={1.1} volume={0.5} />
      <Sfx name="coin" at={1.5} volume={0.45} />
      <Sfx name="marker" at={1.9} volume={0.55} />
      <Sfx name="whoosh-hard" at={14} volume={0.5} />
      <Sfx name="slam" at={14.2} volume={0.35} />
      <Sfx name="riser" at={14.05} volume={0.35} />
      <Sfx name="shimmer" at={15.2} volume={0.4} />
      <Sfx name="whoosh" at={20} volume={0.45} />
      <Sfx name="pop" at={20.9} volume={0.55} />
      <Sfx name="pop" at={21.5} volume={0.5} />
      <Sfx name="ding" at={26.2} volume={0.45} />
      <Sfx name="whoosh" at={40} volume={0.45} />
      <Sfx name="whoosh-hard" at={41.2} volume={0.35} />
      <Sfx name="tick" at={43} volume={0.5} />
      <Sfx name="tick" at={43.35} volume={0.45} />
      <Sfx name="tick" at={43.7} volume={0.45} />
      <Sfx name="switch" at={43.9} volume={0.4} />
      <Sfx name="whoosh" at={60} volume={0.45} />
      <Sfx name="step" at={62.5} volume={0.4} />
      <Sfx name="check" at={64} volume={0.5} />
      <Sfx name="click" at={64.2} volume={0.4} />
      <Sfx name="click" at={64.45} volume={0.35} />
      <Sfx name="click" at={64.7} volume={0.35} />
      <Sfx name="whoosh-hard" at={80} volume={0.5} />
      <Sfx name="marker" at={80.5} volume={0.5} />
      <Sfx name="ui-tick" at={81.3} volume={0.55} />
      <Sfx name="ui-tick" at={82.2} volume={0.55} />
      <Sfx name="ui-tick" at={83.1} volume={0.55} />
      <Sfx name="success" at={84} volume={0.45} />
      <Sfx name="pop-small" at={91} volume={0.55} />
      <Sfx name="click" at={91.7} volume={0.5} />
      <Sfx name="ding" at={92.5} volume={0.5} />
    </AbsoluteFill>
  );
};
