import React from "react";
import {Audio} from "@remotion/media";
import {Sequence, staticFile, useVideoConfig} from "remotion";

type SfxName =
  | "whoosh"
  | "whoosh-hard"
  | "pop"
  | "pop-small"
  | "tick"
  | "coin"
  | "success"
  | "marker"
  | "thud"
  | "hit"
  | "click"
  | "switch"
  | "ding"
  | "step"
  | "shimmer"
  | "riser"
  | "slam"
  | "check"
  | "ui-tick";

export const Sfx: React.FC<{
  readonly name: SfxName;
  readonly at: number;
  readonly volume?: number;
}> = ({name, at, volume = 0.55}) => {
  const {fps} = useVideoConfig();
  return (
    <Sequence from={Math.round(at * fps)} durationInFrames={Math.round(2.5 * fps)} premountFor={fps}>
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
    </Sequence>
  );
};
