import { getAudioDurationInSeconds } from "@remotion/media-utils";

export const getAudioDuration = async (src: string) => {
  return getAudioDurationInSeconds(src);
};
