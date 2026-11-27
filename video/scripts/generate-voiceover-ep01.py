#!/usr/bin/env python3
"""Generate Chinese TTS voiceover clips for Episode 01 via edge-tts."""

from __future__ import annotations

import asyncio
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "voiceover" / "ep01"
VOICE = "zh-CN-YunyangNeural"

SCENES = {
    "01-hook": "几乎不花钱，就能明显降低早死的概率。这些动作，才几秒钟。",
    "02-title": "高性价比人生指南，第一集：不要早死。用最少的钱、时间和精力，换回最多的寿命。",
    "03-framework": "这是一份备选单，不是任务清单。每一条都回答两个问题：花掉什么，换回什么。先挑路上和家里最划算的几条。",
    "04-seatbelt": "第一条：系安全带，前排后排都系。不花钱，多花两秒。轿车前排，致命伤风险大约降四成五。证据等级：A。",
    "05-helmet": "第二条：骑摩托、电动车，戴头盔并且扣好。一百到三百元，五秒。死亡风险大约低四成，头部受伤低约七成。证据等级：A。",
    "06-smoke": "第三条：装烟雾报警器。三十到一百元。能正常工作的报警器，住宅火灾死亡风险大约降六成。冬天烧煤或燃气取暖的，再加一氧化碳报警器。",
    "07-ebike": "第四条：电动车不推进楼道、不进电梯、不在家里充电。烧的就是逃生通道。罚款事小，要命事大。",
    "08-bp": "第五条：量血压，高了就吃药降到达标。高压每降十，死亡风险大约降一成三。中国十个高血压，不到一个真正控制住。",
    "09-outro": "挑走一两条就算数。内容改编自开源项目《高性价比人生指南》，CC BY 4.0。下集：不要慢慢死。",
}


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in SCENES.items():
        path = OUT / f"{name}.mp3"
        communicate = edge_tts.Communicate(text, VOICE, rate="+5%")
        await communicate.save(str(path))
        print(f"saved {path.name}")


if __name__ == "__main__":
    asyncio.run(main())
