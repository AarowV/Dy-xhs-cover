import {Composition} from "remotion";
import {Ep02} from "./Ep02";
import {FPS, HEIGHT, WIDTH} from "./theme";

export const MyComposition = () => {
  return (
    <Composition
      id="Ep02FreeLongevity"
      component={Ep02}
      durationInFrames={115 * FPS}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
