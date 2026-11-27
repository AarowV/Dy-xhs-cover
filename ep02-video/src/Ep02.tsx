import React from "react";
import {AbsoluteFill, Sequence, useVideoConfig} from "remotion";
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
      <Sequence durationInFrames={16 * fps} premountFor={fps}>
        <HookScene />
      </Sequence>
      <Sequence from={16 * fps} durationInFrames={7 * fps} premountFor={fps}>
        <TitleScene />
      </Sequence>
      <Sequence from={23 * fps} durationInFrames={22 * fps} premountFor={fps}>
        <SleepScene />
      </Sequence>
      <Sequence from={45 * fps} durationInFrames={22 * fps} premountFor={fps}>
        <ExerciseScene />
      </Sequence>
      <Sequence from={67 * fps} durationInFrames={23 * fps} premountFor={fps}>
        <ProtectScene />
      </Sequence>
      <Sequence from={90 * fps} durationInFrames={25 * fps} premountFor={fps}>
        <SummaryScene />
      </Sequence>
    </AbsoluteFill>
  );
};
