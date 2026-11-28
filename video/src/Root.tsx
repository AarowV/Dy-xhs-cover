import React from "react";
import { Composition, Folder } from "remotion";
import {
  Episode01,
  calculateEpisode01Metadata,
} from "./Episode01";
import { EP01_SCENES } from "./script";
import { FPS, HEIGHT, WIDTH } from "./theme";

const defaultSceneDurations = EP01_SCENES.map(() => 5 * FPS);

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="HowToLiveBetter">
      <Composition
        id="Episode01-DontDieEarly"
        component={Episode01}
        durationInFrames={defaultSceneDurations.reduce((a, b) => a + b, 0)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          sceneDurations: defaultSceneDurations,
        }}
        calculateMetadata={calculateEpisode01Metadata}
      />
    </Folder>
  );
};
