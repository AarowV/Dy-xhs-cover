import {Composition} from "remotion";
import {Ep02} from "./Ep02";
import {DURATION_SEC, FPS, HEIGHT, WIDTH} from "./theme";

export const MyComposition = () => {
  return (
    <Composition
      id="Ep02"
      component={Ep02}
      durationInFrames={DURATION_SEC * FPS}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
