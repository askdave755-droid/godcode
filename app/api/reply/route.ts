import { NextRequest, NextResponse } from "next/server";
import { buildTikTokReplyFull, validateText } from "@/lib/guardrails";

const HEAVY_WORDS = ["suicidal", "kill myself", "self harm", "abuse", "grieving", "funeral", "diagnosed", "divorce", "homeless", "addict"];

export async function POST(req: NextRequest) {
  const { comment } = await req.json() ?? {};
  if (!comment) return NextResponse.json({ error: "comment required" }, { status: 400 });

  // GUARDRAIL G6: heavy comment -> care first, numbers second.
  const low = String(comment).toLowerCase();
  if (HEAVY_WORDS.some((w) => low.includes(w))) {
    return NextResponse.json({
      reply:
        "I'm really glad you shared that — and I'm not going to answer it with a number. " +
        "You matter more than any Godcode. Please DM me, let's talk. And if things feel heavy right now, " +
        "you can call or text 988 anytime — someone is always there. 🙏 You're not alone.",
    });
  }

  const reply = buildTikTokReplyFull(String(comment));
  const v = validateText(reply);
  if (!v.ok) return NextResponse.json({ error: "guardrail", hits: v.hits }, { status: 500 });
  return NextResponse.json({ reply });
}
