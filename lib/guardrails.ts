import { ANTI_OCCULT_NOTE, DISCLOSURE } from "./data";
export { ANTI_OCCULT_NOTE, DISCLOSURE };

// GUARDRAIL G1-G6 — enforced on ALL generated text before it renders.
export const GUARDRAILS = [
  "Reflection, not revelation: never claim the number IS a message from God.",
  "No predictions: no future timing, outcomes, jobs, health, money, or relationships.",
  "Identity anchored in Christ: pair every number with an identity verse.",
  "Explicit anti-occult distance: name the line, never drift toward numerology/divination.",
  "Questions, not diagnoses: 'you might consider', never 'you are'.",
  "Human-in-the-loop for heavy comments (grief, crisis): care first, numbers second.",
] as const;

export const BANNED_PHRASES = [
  "god says your number", "your destiny", "you will", "will happen",
  "you must", "your future holds", "fated", "prophecy", "predicts",
  "guarantees", "you are destined", "the universe",
];

export function validateText(text: string): { ok: boolean; hits: string[] } {
  const low = text.toLowerCase();
  const hits = BANNED_PHRASES.filter((p) => low.includes(p));
  return { ok: hits.length === 0, hits };
}

// Template-based prayer (no LLM needed; guardrail-safe by construction).
export function buildPrayer(name: string, theme: { themes: string[] }): string {
  const t = theme.themes[0];
  return (
    `Father, thank You for ${name}. Help them understand their value through Your Word. ` +
    `Give them wisdom to walk in the theme of ${t}, courage to grow, and grace to love well. ` +
    `Let their life reflect truth, kindness, and faithfulness. Remind them that their identity ` +
    `rests in You — not in a number, not in a prediction. In Jesus' name, Amen.`
  );
}

// Small name etymology map + honest fallback. Extend freely.
const NAME_MAP: Record<string, string> = {
  michael: "traditionally 'who is like God' — a question of devotion",
  david:   "beloved — the friend of God",
  mary:    "associated with bitterness turned to devotion",
  james:   "supplanter — one whose story is rewritten",
  john:    "God is gracious",
  sarah:   "princess — nobility through promise",
  daniel:  "God is my judge — integrity under pressure",
  rachel:  "ewe — gentle strength and fruitfulness",
  samuel:  "heard by God",
  hannah:  "grace — prayer that was answered",
};

export function nameNote(name: string): string {
  const first = name.trim().split(/\s+/)[0]?.toLowerCase();
  if (!first) return "Your name carries its own story — worth looking up and praying over.";
  const hit = NAME_MAP[first];
  return hit
    ? `"${first[0].toUpperCase() + first.slice(1)}" is ${hit}. A name theme is a reflection prompt, not a definition.`
    : `"${first[0].toUpperCase() + first.slice(1)}" — its origin story is worth researching and praying over. Names in Scripture marked calling; yours is no accident.`;
}

// TikTok reply generator — the Friday-night engine.
import { NUMBER_THEMES, MONTH_THEMES } from "./data";
function digitSumOf(s: string): number {
  let t = String(s).replace(/\D/g, "").split("").reduce((a, d) => a + Number(d), 0);
  while (t > 9) t = String(t).split("").reduce((a, d) => a + Number(d), 0);
  return t || 1;
}

export function buildTikTokReplyFull(comment: string): string {
  const dateMatch = comment.match(/(\d{1,2})\s*\/\s*(\d{1,2})/) ||
                    comment.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{1,2})/i);
  if (!dateMatch) return `Drop it as month/day + one word (like "12/4 tired") and I'll reply with your Godcode. 🙏`;
  let month: number, day: number;
  if (/\//.test(dateMatch[0])) { month = Number(dateMatch[1]); day = Number(dateMatch[2]); }
  else {
    const mons = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    month = mons.indexOf(dateMatch[1].slice(0,3).toLowerCase()) + 1; day = Number(dateMatch[2]);
  }
  const code = digitSumOf(`${month}${day}`);   // light code: month+day digit sum
  const theme = NUMBER_THEMES[code];
  const mTheme = MONTH_THEMES[month];
  const word = comment.replace(dateMatch[0], "").trim().split(/\s+/)[0];
  const wordLine = word ? `\n\nYour word "${word}" + ${theme.themes[0]}: ${word} isn't the end of the sentence — ${theme.themes[0]} is.` : "";
  return `Your Godcode is ${code} — ${theme.themes[0]}. Born in ${mTheme.name}: the theme of ${mTheme.theme} (${mTheme.scripture}).${wordLine}\n\n${theme.replyLine}\n\n(This is a reflection theme from Scripture, not a prediction — your identity is in Christ. 🙏)`;
}
