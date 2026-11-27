import { loadFont as loadSong } from "@remotion/google-fonts/NotoSerifSC";
import { loadFont as loadKai } from "@remotion/google-fonts/MaShanZheng";

export const { fontFamily: songFont } = loadSong("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});

export const { fontFamily: kaiFont } = loadKai("normal", {
  weights: ["400"],
  subsets: ["chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});
