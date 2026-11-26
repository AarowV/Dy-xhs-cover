import React from "react";
import { AbsoluteFill } from "remotion";
import { Audio } from "@remotion/media";
import { staticFile, useVideoConfig } from "remotion";
import { DotBackground } from "./DotBackground";
import { PaperCharacter, type CharacterPose } from "./PaperCharacter";
import { fontFamily } from "../fonts";
import { COLORS, type SceneId, VOICEOVER_FILES } from "../theme";

type Props = {
  children: React.ReactNode;
  pose?: CharacterPose;
  voiceover?: SceneId | null;
  episodeTag?: string;
  hideCharacter?: boolean;
};

export const SceneShell: React.FC<Props> = ({
  children,
  pose = "pushGlasses",
  voiceover = null,
  episodeTag = "EP02 · 高性价比人生",
  hideCharacter = false,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <DotBackground />
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 48,
          fontFamily,
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.inkMuted,
          letterSpacing: 1,
        }}
      >
        {episodeTag}
      </div>
      <AbsoluteFill style={{ padding: "128px 80px 430px" }}>{children}</AbsoluteFill>
      {!hideCharacter ? (
        <div
          style={{
            position: "absolute",
            right: 24,
            bottom: 36,
            zIndex: 5,
          }}
        >
          <PaperCharacter pose={pose} size={340} />
        </div>
      ) : null}
      {voiceover ? (
        <Audio src={staticFile(VOICEOVER_FILES[voiceover])} premountFor={fps} />
      ) : null}
    </AbsoluteFill>
  );
};
