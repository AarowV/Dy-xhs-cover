import React from "react";
import { Audio } from "@remotion/media";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  staticFile,
  useVideoConfig,
} from "remotion";
import { EP01_SCENES, type SceneData } from "./script";
import {
  FrameworkScene,
  HookScene,
  OutroScene,
  TitleScene,
} from "./scenes/TextScenes";
import { TipScene } from "./scenes/TipScene";
import { FPS, HEIGHT, WIDTH } from "./theme";

const TRANSITION_FRAMES = 12;
const TAIL_PADDING_FRAMES = 10;

export type Episode01Props = {
  sceneDurations: number[];
};

const renderScene = (scene: SceneData) => {
  switch (scene.kind) {
    case "hook":
      return <HookScene data={scene} />;
    case "title":
      return <TitleScene data={scene} />;
    case "framework":
      return <FrameworkScene data={scene} />;
    case "outro":
      return <OutroScene data={scene} />;
    case "tip":
      return <TipScene data={scene} />;
    default:
      return null;
  }
};

export const calculateEpisode01Metadata: CalculateMetadataFunction<
  Episode01Props
> = async () => {
  const durationsSec = await Promise.all(
    EP01_SCENES.map((scene) =>
      getAudioDurationInSeconds(staticFile(scene.audio)),
    ),
  );

  const sceneDurations = durationsSec.map(
    (sec) => Math.ceil(sec * FPS) + TAIL_PADDING_FRAMES,
  );

  const transitionOverlap =
    Math.max(0, EP01_SCENES.length - 1) * TRANSITION_FRAMES;

  const durationInFrames =
    sceneDurations.reduce((sum, n) => sum + n, 0) - transitionOverlap;

  return {
    durationInFrames,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
    props: { sceneDurations },
  };
};

export const Episode01: React.FC<Episode01Props> = ({ sceneDurations }) => {
  const { fps } = useVideoConfig();

  const children: React.ReactNode[] = [];

  EP01_SCENES.forEach((scene, index) => {
    if (index > 0) {
      children.push(
        <TransitionSeries.Transition
          key={`transition-${scene.id}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />,
      );
    }

    const durationInFrames = sceneDurations[index] ?? Math.round(4 * fps);

    children.push(
      <TransitionSeries.Sequence
        key={scene.id}
        name={scene.id}
        durationInFrames={durationInFrames}
        premountFor={fps}
      >
        {renderScene(scene)}
        <Audio src={staticFile(scene.audio)} premountFor={fps} volume={1} />
        <Audio
          src="https://remotion.media/whoosh.wav"
          premountFor={fps}
          volume={0.2}
        />
        {scene.kind === "tip" ? (
          <Audio
            src="https://remotion.media/ding.wav"
            premountFor={fps}
            volume={0.32}
          />
        ) : null}
      </TransitionSeries.Sequence>,
    );
  });

  return (
    <AbsoluteFill>
      <TransitionSeries>{children}</TransitionSeries>
    </AbsoluteFill>
  );
};
