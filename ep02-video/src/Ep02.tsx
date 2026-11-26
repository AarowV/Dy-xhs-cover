import React from "react";
import { AbsoluteFill, Series, staticFile, useVideoConfig } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { getAudioDuration } from "./get-audio-duration";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Sleep } from "./scenes/Scene2Sleep";
import { Scene3Exercise } from "./scenes/Scene3Exercise";
import { Scene4Sun } from "./scenes/Scene4Sun";
import { Scene5Summary } from "./scenes/Scene5Summary";
import {
  FALLBACK_SCENE_FRAMES,
  FPS,
  SCENE_IDS,
  VOICEOVER_FILES,
  type SceneId,
} from "./theme";

export type Ep02Props = {
  sceneFrames: Record<SceneId, number>;
};

const TAIL_PADDING_FRAMES = Math.round(0.6 * FPS);

export const calculateEp02Metadata: CalculateMetadataFunction<Ep02Props> = async () => {
  const sceneFrames = { ...FALLBACK_SCENE_FRAMES };

  await Promise.all(
    SCENE_IDS.map(async (id) => {
      try {
        const seconds = await getAudioDuration(staticFile(VOICEOVER_FILES[id]));
        sceneFrames[id] = Math.max(
          FALLBACK_SCENE_FRAMES[id],
          Math.ceil(seconds * FPS) + TAIL_PADDING_FRAMES,
        );
      } catch {
        // Keep fallback timing until voiceover files are present.
      }
    }),
  );

  const durationInFrames = SCENE_IDS.reduce(
    (sum, id) => sum + sceneFrames[id],
    0,
  );

  return {
    durationInFrames,
    props: { sceneFrames },
  };
};

export const Ep02: React.FC<Ep02Props> = ({ sceneFrames }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F7F8FA" }}>
      <Series>
        <Series.Sequence
          name="Hook"
          durationInFrames={sceneFrames["scene1-hook"]}
          premountFor={fps}
        >
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence
          name="Sleep"
          durationInFrames={sceneFrames["scene2-sleep"]}
          premountFor={fps}
        >
          <Scene2Sleep />
        </Series.Sequence>
        <Series.Sequence
          name="Exercise"
          durationInFrames={sceneFrames["scene3-exercise"]}
          premountFor={fps}
        >
          <Scene3Exercise />
        </Series.Sequence>
        <Series.Sequence
          name="Sun"
          durationInFrames={sceneFrames["scene4-sun"]}
          premountFor={fps}
        >
          <Scene4Sun />
        </Series.Sequence>
        <Series.Sequence
          name="Summary"
          durationInFrames={sceneFrames["scene5-summary"]}
          premountFor={fps}
        >
          <Scene5Summary />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
