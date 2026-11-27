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
  BpScene,
  ChoiceScene,
  EbikeScene,
  HelmetScene,
  HookScene,
  MethodScene,
  SeatbeltScene,
  SmokeScene,
  TitleScene,
} from "./scenes/Scenes";
import { FPS, HEIGHT, WIDTH } from "./theme";

const TRANSITION_FRAMES = 14;
const TAIL_PADDING_FRAMES = 12;

export type Episode01Props = {
  sceneDurations: number[];
};

const renderScene = (scene: SceneData) => {
  switch (scene.kind) {
    case "hook":
      return <HookScene data={scene} />;
    case "title":
      return <TitleScene data={scene} />;
    case "method":
      return <MethodScene data={scene} />;
    case "seatbelt":
      return <SeatbeltScene data={scene} />;
    case "helmet":
      return <HelmetScene data={scene} />;
    case "smoke":
      return <SmokeScene data={scene} />;
    case "ebike":
      return <EbikeScene data={scene} />;
    case "bp":
      return <BpScene data={scene} />;
    case "choice":
      return <ChoiceScene data={scene} />;
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

  return {
    durationInFrames:
      sceneDurations.reduce((sum, n) => sum + n, 0) - transitionOverlap,
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
          key={`t-${scene.id}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />,
      );
    }

    const durationInFrames = sceneDurations[index] ?? Math.round(5 * fps);

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
          volume={0.18}
        />
        {scene.stamp ? (
          <Audio
            src="https://remotion.media/ding.wav"
            premountFor={fps}
            volume={0.28}
            playbackRate={0.9}
          />
        ) : null}
        {scene.kind === "choice" ? (
          <Audio
            src="https://remotion.media/mouse-click.wav"
            premountFor={fps}
            volume={0.35}
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
