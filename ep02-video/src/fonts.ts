import {loadFont as loadSans} from "@remotion/google-fonts/NotoSansSC";
import {loadFont as loadSerif} from "@remotion/google-fonts/NotoSerifSC";

export const {fontFamily: sansFamily} = loadSans("normal", {
  weights: ["500", "700"],
  subsets: ["latin", "chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});

export const {fontFamily: serifFamily} = loadSerif("normal", {
  weights: ["700"],
  subsets: ["latin", "chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});
