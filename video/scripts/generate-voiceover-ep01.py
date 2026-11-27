#!/usr/bin/env python3
"""Generate Chinese TTS narration for Episode 01 (Bai Qi documentary style)."""

from __future__ import annotations

import asyncio
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "voiceover" / "ep01"
# Calm authoritative male storyteller voice
VOICE = "zh-CN-YunyangNeural"

SCENES = {
    "01-hook": "几乎不花钱。多花几秒钟。就能把早死的概率，明显压下去。",
    "02-title": "高性价比人生指南。第一集：不要早死。",
    "03-method": "每一条建议，只回答两个问题。花掉什么。换回什么。这是备选单，不是任务清单。",
    "04-seatbelt": "先说路上。系安全带，前排后排都系。不花钱，多花两秒。轿车前排，致命伤风险大约降四成五。证据等级：甲。",
    "05-helmet": "骑摩托、电动车。戴头盔，并且把扣带扣好。一百到三百元。死亡风险大约低四成。头部受伤，低约七成。",
    "06-smoke": "家里。装一个能正常工作的烟雾报警器。三十到一百元。住宅火灾死亡风险，大约降六成。冬天烧煤、用燃气取暖的，再加一氧化碳报警器。",
    "07-ebike": "电动车，不推进楼道，不进电梯，不在家里充电。烧的，就是逃生通道。",
    "08-bp": "再量一次血压。高压每降十，死亡风险大约降一成三。中国十个高血压，不到一个真正控制住。",
    "09-choice": "这些动作，才几秒钟。换你——做，还是再等等？",
}


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in SCENES.items():
        path = OUT / f"{name}.mp3"
        communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
        await communicate.save(str(path))
        print(f"saved {path.name}")


if __name__ == "__main__":
    asyncio.run(main())
