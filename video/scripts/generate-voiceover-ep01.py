#!/usr/bin/env python3
"""Generate Chinese TTS narration for Episode 01 (Bai Qi documentary style).

Production voiceover uses MiniMax Speech 2.8 HD via Fal
(`fal-ai/minimax/speech-2.8-hd`, voice `presenter_male`).
Script lines + pause tags live in `ep01-narration.json`.

This script is a free offline fallback (edge-tts) for local preview when
Fal/MiniMax is unavailable. Prefer regenerating via Fal for the final cut.
"""

from __future__ import annotations

import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "voiceover" / "ep01"
NARRATION = Path(__file__).with_name("ep01-narration.json")
# Calm authoritative male storyteller voice (fallback only)
VOICE = "zh-CN-YunyangNeural"


def load_scenes() -> dict[str, str]:
    data = json.loads(NARRATION.read_text(encoding="utf-8"))
    scenes: dict[str, str] = {}
    for scene in data["scenes"]:
        # Strip MiniMax pause tags for edge-tts fallback
        text = scene["text"]
        cleaned = []
        i = 0
        while i < len(text):
            if text.startswith("<#", i):
                end = text.find("#>", i)
                if end != -1:
                    cleaned.append("。")
                    i = end + 2
                    continue
            cleaned.append(text[i])
            i += 1
        scenes[scene["id"]] = "".join(cleaned).replace("。。", "。")
    return scenes


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in load_scenes().items():
        path = OUT / f"{name}.mp3"
        communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
        await communicate.save(str(path))
        print(f"saved {path.name} (edge-tts fallback)")


if __name__ == "__main__":
    asyncio.run(main())
