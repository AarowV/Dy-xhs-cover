import { loadFont as loadDisplay } from "@remotion/google-fonts/ZCOOLQingKeHuangYou";
import { loadFont as loadBody } from "@remotion/google-fonts/NotoSansSC";

export const { fontFamily: displayFont } = loadDisplay("normal", {
  weights: ["400"],
  subsets: ["chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});

export const { fontFamily: bodyFont } = loadBody("normal", {
  weights: ["400", "700"],
  subsets: ["chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});
