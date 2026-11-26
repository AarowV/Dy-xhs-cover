import { loadFont as loadNotoSansSC } from "@remotion/google-fonts/NotoSansSC";

export const { fontFamily } = loadNotoSansSC("normal", {
  weights: ["700", "900"],
  subsets: ["chinese-simplified"],
  ignoreTooManyRequestsWarning: true,
});
