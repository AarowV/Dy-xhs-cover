import {Composition} from "remotion";
import {Ep02} from "./Ep02";
import {Ep02Vibe} from "./vibe/Ep02Vibe";
import timeline from "./vibe/timeline.json";
import {FPS, HEIGHT, WIDTH} from "./theme";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="Ep02FreeLongevity"
        component={Ep02}
        durationInFrames={115 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Ep02Vibe"
        component={Ep02Vibe}
        durationInFrames={Math.round(timeline.durationSeconds * FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
