import React from "react";
import { Composition, Folder } from "remotion";
import { Ep02, calculateEp02Metadata, type Ep02Props } from "./Ep02";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Sleep } from "./scenes/Scene2Sleep";
import { Scene3Exercise } from "./scenes/Scene3Exercise";
import { Scene4Sun } from "./scenes/Scene4Sun";
import { Scene5Summary } from "./scenes/Scene5Summary";
import { FALLBACK_SCENE_FRAMES, FPS, HEIGHT, WIDTH } from "./theme";
import "./fonts";

const defaultProps: Ep02Props = {
  sceneFrames: FALLBACK_SCENE_FRAMES,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EP02"
        component={Ep02}
        durationInFrames={Object.values(FALLBACK_SCENE_FRAMES).reduce(
          (a, b) => a + b,
          0,
        )}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={defaultProps}
        calculateMetadata={calculateEp02Metadata}
      />
      <Folder name="Scenes">
        <Composition
          id="Scene1Hook"
          component={Scene1Hook}
          durationInFrames={FALLBACK_SCENE_FRAMES["scene1-hook"]}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene2Sleep"
          component={Scene2Sleep}
          durationInFrames={FALLBACK_SCENE_FRAMES["scene2-sleep"]}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene3Exercise"
          component={Scene3Exercise}
          durationInFrames={FALLBACK_SCENE_FRAMES["scene3-exercise"]}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene4Sun"
          component={Scene4Sun}
          durationInFrames={FALLBACK_SCENE_FRAMES["scene4-sun"]}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene5Summary"
          component={Scene5Summary}
          durationInFrames={FALLBACK_SCENE_FRAMES["scene5-summary"]}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>
    </>
  );
};
