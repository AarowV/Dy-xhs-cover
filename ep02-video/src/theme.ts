export const COLORS = {
  bg: "#F7F8FA",
  dot: "#E5E7EB",
  ink: "#1F2937",
  inkMuted: "#6B7280",
  red: "#E63946",
  green: "#10B981",
  greenDark: "#059669",
  greenSoft: "#D1FAE5",
  redSoft: "#FEE2E2",
  card: "#FFFFFF",
  stroke: "#111827",
  gold: "#D97706",
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SCENE_IDS = [
  "scene1-hook",
  "scene2-sleep",
  "scene3-exercise",
  "scene4-sun",
  "scene5-summary",
] as const;

export type SceneId = (typeof SCENE_IDS)[number];

/** Fallback durations (frames) before voiceover metadata is measured. */
export const FALLBACK_SCENE_FRAMES: Record<SceneId, number> = {
  "scene1-hook": 22 * FPS,
  "scene2-sleep": 31 * FPS,
  "scene3-exercise": 30 * FPS,
  "scene4-sun": 28 * FPS,
  "scene5-summary": 26 * FPS,
};

export const VOICEOVER_FILES: Record<SceneId, string> = {
  "scene1-hook": "voiceover/scene1-hook.mp3",
  "scene2-sleep": "voiceover/scene2-sleep.mp3",
  "scene3-exercise": "voiceover/scene3-exercise.mp3",
  "scene4-sun": "voiceover/scene4-sun.mp3",
  "scene5-summary": "voiceover/scene5-summary.mp3",
};
