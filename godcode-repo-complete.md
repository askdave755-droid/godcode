# GODCODE — COMPLETE REPO CONTENTS
Recreate the repo with EXACTLY this structure. Replace everything.


## FILE: package.json

```json
{
  "name": "godcode",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```


## FILE: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```


## FILE: next.config.ts

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
```


## FILE: postcss.config.mjs

```mjs
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
```


## FILE: .gitignore

```gitignore
node_modules
.next
.vercel
*.tsbuildinfo
next-env.d.ts
.env*
```


## FILE: app/globals.css

```css
@import "tailwindcss";

body { background: #0d1117; }
```


## FILE: app/layout.tsx

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```


## FILE: app/page.tsx

```tsx
"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [season, setSeason] = useState("");
  const [report, setReport] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function go() {
    setBusy(true); setErr(""); setReport(null);
    try {
      const r = await fetch("/api/godcode", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob, seasonWord: season }),
      });
      const d = await r.json();
      if (d.error) setErr(d.error); else setReport(d.report);
    } catch { setErr("Network error"); }
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#e6edf3] p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-1">GODCODE™</h1>
      <p className="text-sm text-gray-400 mb-6">
        Your birthday as a theme for reflection — not numerology, not a prediction.
      </p>

      {!report && (
        <div className="space-y-3">
          <input className="w-full p-3 rounded bg-[#161b22] border border-gray-700"
            placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full p-3 rounded bg-[#161b22] border border-gray-700"
            placeholder="Birthday MM/DD/YYYY" value={dob} onChange={(e) => setDob(e.target.value)} />
          <input className="w-full p-3 rounded bg-[#161b22] border border-gray-700"
            placeholder="One word for this season (optional)" value={season}
            onChange={(e) => setSeason(e.target.value)} />
          <button onClick={go} disabled={busy}
            className="w-full p-3 rounded bg-blue-600 font-semibold disabled:opacity-50">
            {busy ? "Generating…" : "Get my Godcode"}
          </button>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <a href="/reply" className="block text-center text-blue-400 text-sm underline">
            Creator? Open the TikTok Reply Helper →
          </a>
        </div>
      )}

      {report && (
        <div className="space-y-6">
          <div className="bg-[#161b22] border border-gray-700 rounded p-5">
            <p className="text-xs text-gray-400">GODCODE IDENTITY REPORT</p>
            <h2 className="text-2xl font-bold">{report.name}</h2>
            <p className="text-gray-400 text-sm">{report.dob}</p>
            <div className="mt-3 text-center">
              <div className="text-6xl font-extrabold text-yellow-400">{report.godCode}</div>
              <div className="text-lg">{report.numberTheme.themes.join(" • ")}</div>
              <p className="text-xs text-gray-500 mt-1">{report.numberTheme.keyVerse}</p>
            </div>
          </div>

          <Section title="Biblical symbolism" body={report.numberTheme.symbolism} />
          <Section title="Your birth month" body={`${report.monthTheme.name}: the theme of ${report.monthTheme.theme} (${report.monthTheme.scripture}).`} />
          <Section title="Name reflection" body={report.nameReflection} />
          {report.seasonWord && (
            <Section title={`Your word: "${report.seasonWord}"`}
              body={`${report.seasonWord} + ${report.numberTheme.themes[0]} — the word describes the season; the theme describes the tool you're carrying through it.`} />
          )}
          <Section title="Strength to develop" body={report.personality.strength} />
          <Section title="Growth question" body={report.personality.growth} />
          <Section title="Relationship reflection" body={report.personality.relationship} />

          <div className="bg-[#161b22] border border-gray-700 rounded p-5">
            <p className="font-semibold mb-1">Biblical identity</p>
            <p className="text-sm">{report.biblicalIdentity.verse}</p>
            <p className="text-sm italic mt-1">{report.biblicalIdentity.statement}</p>
          </div>

          <Section title="Prayer" body={report.prayer} />
          <Section title="Your action step" body={report.actionStep} />

          <div className="bg-[#161b22] border border-yellow-900 rounded p-4">
            <p className="text-xs text-gray-400 mb-1">IMPORTANT</p>
            <p className="text-xs text-gray-300">{report.antiOccultNote}</p>
            <p className="text-xs text-gray-300 mt-1">{report.disclosure}</p>
          </div>

          <button onClick={() => setReport(null)}
            className="w-full p-3 rounded bg-gray-700">Start over</button>
        </div>
      )}
    </main>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-[#161b22] border border-gray-700 rounded p-5">
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm text-gray-300">{body}</p>
    </div>
  );
}
```


## FILE: app/reply/page.tsx

```tsx
"use client";
import { useState } from "react";

export default function ReplyHelper() {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");

  async function gen() {
    const r = await fetch("/api/reply", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });
    const d = await r.json();
    setReply(d.reply ?? d.error ?? "error");
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#e6edf3] p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Godcode Reply Helper</h1>
      <p className="text-sm text-gray-400 mb-4">
        Paste a TikTok comment — get the personalized reply. Heavy words
        (grief, crisis) get care, not a number.
      </p>
      <textarea className="w-full p-3 rounded bg-[#161b22] border border-gray-700"
        rows={2} placeholder='e.g. "12/4 tired"' value={comment}
        onChange={(e) => setComment(e.target.value)} />
      <button onClick={gen} className="w-full mt-2 p-3 rounded bg-blue-600 font-semibold">
        Generate reply
      </button>
      {reply && (
        <>
          <pre className="mt-4 p-4 bg-[#161b22] border border-gray-700 rounded whitespace-pre-wrap text-sm">{reply}</pre>
          <button onClick={() => navigator.clipboard.writeText(reply)}
            className="w-full mt-2 p-2 rounded bg-gray-700 text-sm">Copy</button>
        </>
      )}
      <a href="/" className="block text-center text-blue-400 text-sm underline mt-4">← Full report</a>
    </main>
  );
}
```


## FILE: app/api/godcode/route.ts

```ts
import { NextRequest, NextResponse } from "next/server";
import { buildReport, relationshipCode } from "@/lib/godcode";
import { validateText, DISCLOSURE, ANTI_OCCULT_NOTE } from "@/lib/guardrails";
import { DISCLOSURE as D2, ANTI_OCCULT_NOTE as A2 } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, dob, seasonWord, partnerDob } = body ?? {};

    if (!name || !dob) {
      return NextResponse.json({ error: "name and dob (MM/DD/YYYY) are required" }, { status: 400 });
    }

    const report = buildReport({ name, dob, seasonWord });
    if ("error" in report) {
      return NextResponse.json({ error: report.error }, { status: 400 });
    }

    // GUARDRAIL: scan every generated text field before serving.
    const texts = [report.prayer, report.nameReflection, ...Object.values(report.personality)];
    for (const t of texts) {
      const v = validateText(t);
      if (!v.ok) {
        return NextResponse.json(
          { error: "Guardrail violation in generated text", hits: v.hits },
          { status: 500 }
        );
      }
    }

    report.disclosure = D2;
    report.antiOccultNote = A2;

    const payload: any = { report };
    if (partnerDob) payload.relationship = relationshipCode(dob, partnerDob);
    return NextResponse.json(payload);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "server error" }, { status: 500 });
  }
}
```


## FILE: app/api/reply/route.ts

```ts
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
```


## FILE: lib/data.ts

```ts
// GodCode data layer — themes from Scripture, framed for reflection.
export interface NumberTheme {
  n: number;
  themes: string[];
  scriptures: string[];
  keyVerse: string;
  symbolism: string;        // short paragraph for reports
  replyLine: string;        // one-liner for TikTok replies
  actionStep: string;
}

export const NUMBER_THEMES: Record<number, NumberTheme> = {
  1: { n: 1, themes: ["beginning", "unity", "leadership"],
    scriptures: ["Genesis 1:1", "Ephesians 4:4-6"],
    keyVerse: "In the beginning, God created… — Genesis 1:1",
    symbolism: "One marks the beginning and the unity of God Himself. In Scripture it appears where God starts something and where He calls a person to stand first — not because they are the loudest, but because they are willing to begin.",
    replyLine: "You're built to begin — God calls you first not because you're the loudest, but because you're willing to start.",
    actionStep: "Name one thing you've been waiting to start. Take the first small step on it today." },
  2: { n: 2, themes: ["witness", "agreement", "partnership"],
    scriptures: ["Deuteronomy 19:15", "Ecclesiastes 4:9-10"],
    keyVerse: "Two are better than one… — Ecclesiastes 4:9",
    symbolism: "Two appears where truth is confirmed by witness and where strength comes from agreement. Scripture presents partnership as a multiplier — two carrying the load, two in prayer, two sharpening one another.",
    replyLine: "You're not built to do this alone — loyalty is your strength; God pairs you.",
    actionStep: "Reach out to one person you trust this week — ask them to pray with you about your season." },
  3: { n: 3, themes: ["resurrection", "divine emphasis", "completeness"],
    scriptures: ["1 Corinthians 15:4", "Matthew 28:19"],
    keyVerse: "…and that he was raised on the third day… — 1 Corinthians 15:4",
    symbolism: "Three is resurrection morning — the pattern of death that does not stay dead. Where it appears in Scripture, something buried is being raised on purpose.",
    replyLine: "You're a third-day person — what dies around you doesn't stay dead.",
    actionStep: "Write down one thing you thought was over. Pray over it as if God is still writing the ending." },
  4: { n: 4, themes: ["order", "foundation", "creation"],
    scriptures: ["Revelation 7:1", "1 Corinthians 14:40"],
    keyVerse: "Let all things be done decently and in order. — 1 Corinthians 14:40",
    symbolism: "Four carries the theme of the created world in order — the four corners, the four winds, the four seasons. It points to structure that holds when everything else shakes.",
    replyLine: "You bring order to chaos — build slow, build solid, it holds.",
    actionStep: "Pick one area of your life that feels scattered. Give it one small system this week." },
  5: { n: 5, themes: ["grace", "provision", "God's goodness"],
    scriptures: ["John 5:2-9", "Ephesians 2:8"],
    keyVerse: "By grace you have been saved through faith… — Ephesians 2:8",
    symbolism: "Five keeps showing up where grace meets human need — five loaves feeding thousands, grace upon grace. It is the number of provision that arrives before the work is finished.",
    replyLine: "Grace keeps finding you — you're marked by provision, not struggle.",
    actionStep: "Write down three ways you've been provided for this year that you didn't earn. Say thank you out loud." },
  6: { n: 6, themes: ["work", "stewardship", "humanity"],
    scriptures: ["Genesis 1:26-31", "Galatians 6:9"],
    keyVerse: "Let us make mankind in our image… — Genesis 1:26",
    symbolism: "Six is the day humanity was made and given work that matters. It points to stewardship — doing the work in front of you as an act of worship, not survival.",
    replyLine: "Your work matters — you're called to steward, not just survive.",
    actionStep: "Choose one task you do regularly and do it this week as if God were your only audience." },
  7: { n: 7, themes: ["completion", "rest", "spiritual fullness"],
    scriptures: ["Genesis 2:2-3", "Matthew 11:28"],
    keyVerse: "…and he rested on the seventh day. — Genesis 2:2",
    symbolism: "Seven is God's finished work and His invitation to rest in it. Where seven appears, something is complete — and the command is to stop striving and receive.",
    replyLine: "You're called to finish things AND rest — both are holy on you.",
    actionStep: "Schedule one real block of rest this week — not scrolling, actual rest. Guard it." },
  8: { n: 8, themes: ["new beginning", "renewal", "resurrection life"],
    scriptures: ["Romans 6:4", "Lamentations 3:22-23"],
    keyVerse: "…just as Christ was raised from the dead… we too may live a new life. — Romans 6:4",
    symbolism: "Eight follows the seven of completion — it is the first day of the new week. Circumcision on the eighth day, the new covenant. Eight says: the old count is over.",
    replyLine: "You're a new-creation person — your story resets. Stop dragging the old you forward.",
    actionStep: "Write one sentence of forgiveness toward your past self. Read it every morning this week." },
  9: { n: 9, themes: ["fruitfulness", "harvest", "completion"],
    scriptures: ["Galatians 5:22-23", "John 15:5"],
    keyVerse: "…the fruit of the Spirit is love, joy, peace… — Galatians 5:22",
    symbolism: "Nine is fruit — the produce of a life connected to the Vine. It appears where God is showing what grows when a person stays planted instead of striving.",
    replyLine: "You're built to produce — stay connected to the Vine and the fruit comes.",
    actionStep: "Ask one trusted person: what fruit do you see in my life? Listen without arguing." },
};

export const MONTH_THEMES: Record<number, { name: string; theme: string; scripture: string }> = {
  1:  { name: "January",   theme: "new beginnings",          scripture: "Isaiah 43:19" },
  2:  { name: "February",  theme: "love and agreement",      scripture: "1 Corinthians 13" },
  3:  { name: "March",     theme: "resurrection life",       scripture: "John 11:25" },
  4:  { name: "April",     theme: "foundations",             scripture: "Psalm 127:1" },
  5:  { name: "May",       theme: "grace and favor",         scripture: "John 1:16" },
  6:  { name: "June",      theme: "harvest and perseverance",scripture: "Galatians 6:9" },
  7:  { name: "July",      theme: "rest and trust",          scripture: "Matthew 11:28" },
  8:  { name: "August",    theme: "renewal — mercies new every morning", scripture: "Lamentations 3:22-23" },
  9:  { name: "September", theme: "fruitfulness",            scripture: "John 15:5" },
  10: { name: "October",   theme: "testimony",               scripture: "Revelation 12:11" },
  11: { name: "November",  theme: "the eleventh hour — grace at the last minute", scripture: "Matthew 20:6" },
  12: { name: "December",  theme: "divine alignment",        scripture: "Luke 22:30" },
};

export const IDENTITY_VERSE = "I am fearfully and wonderfully made. — Psalm 139:14";
export const IDENTITY_STATEMENT =
  "I am created by God, valuable in His sight, and called to grow in wisdom, love, and faithfulness.";

export const DISCLOSURE =
  "A GodCode is a symbolic theme for reflection — not a supernatural identity, not numerology, " +
  "not fortune-telling, and not a prediction. Scripture is the authority; your identity rests in Christ, " +
  "not in a number. Reflection prompts, not conclusions.";

export const ANTI_OCCULT_NOTE =
  "This is not numerology or divination. It uses numbers the way Scripture does: as symbolic " +
  "markers for meditation and self-reflection.";
```


## FILE: lib/godcode.ts

```ts
import { NUMBER_THEMES, MONTH_THEMES, IDENTITY_VERSE, IDENTITY_STATEMENT, NumberTheme } from "./data";
import { buildPrayer, nameNote } from "./guardrails";

export interface GodcodeReport {
  name: string;
  dob: string;                 // MM/DD/YYYY as entered
  godCode: number;             // digit-sum of full birthday
  dayDigit: number;            // digit-sum of day-of-month
  month: number;
  numberTheme: NumberTheme;
  monthTheme: { name: string; theme: string; scripture: string };
  seasonWord?: string;
  nameReflection: string;
  personality: { strength: string; growth: string; relationship: string };
  biblicalIdentity: { verse: string; statement: string };
  prayer: string;
  actionStep: string;
  disclosure: string;
  antiOccultNote: string;
}

export function digitSum(n: number | string): number {
  let t = String(n).replace(/\D/g, "").split("").reduce((s, d) => s + Number(d), 0);
  while (t > 9) t = String(t).split("").reduce((s, d) => s + Number(d), 0);
  return t || 1;
}

export function calculateGodCode(dob: string): number {
  return digitSum(dob.replace(/\D/g, ""));
}

export function parseDob(dob: string): { month: number; day: number } | null {
  const m = dob.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const month = Number(m[1]), day = Number(m[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { month, day };
}

export function buildReport(input: {
  name: string; dob: string; seasonWord?: string;
}): GodcodeReport | { error: string } {
  const parsed = parseDob(input.dob);
  if (!parsed) return { error: "Birthday must be MM/DD/YYYY" };
  const code = calculateGodCode(input.dob);
  const dayDigit = digitSum(parsed.day);
  const theme = NUMBER_THEMES[code];
  const mTheme = MONTH_THEMES[parsed.month];
  const firstName = input.name.trim().split(/\s+/)[0] || "Friend";
  const t = theme.themes[0];

  return {
    name: input.name.trim(),
    dob: input.dob,
    godCode: code,
    dayDigit,
    month: parsed.month,
    numberTheme: theme,
    monthTheme: mTheme,
    seasonWord: input.seasonWord?.trim() || undefined,
    nameReflection: nameNote(input.name.trim()),
    personality: {
      strength: `Building trust through consistency — living out the theme of ${t} in small daily ways.`,
      growth: `Where might flexibility, patience, or openness help you grow while you reflect on ${t}?`,
      relationship: `How can you communicate clearly and build relationships rooted in trust, carrying the theme of ${theme.themes[1] || t}?`,
    },
    biblicalIdentity: { verse: IDENTITY_VERSE, statement: IDENTITY_STATEMENT },
    prayer: buildPrayer(input.name.trim(), theme),
    actionStep: theme.actionStep,
    disclosure: "",      // filled by route from data.ts to keep single source
    antiOccultNote: "",
  };
}

// Relationship Code (API-level, v1): two birthdays -> complementary themes.
export function relationshipCode(dobA: string, dobB: string) {
  const a = NUMBER_THEMES[calculateGodCode(dobA)];
  const b = NUMBER_THEMES[calculateGodCode(dobB)];
  return {
    a: { code: a.n, themes: a.themes },
    b: { code: b.n, themes: b.themes },
    reflection:
      `Two codes don't determine a relationship — they suggest complementary themes to discuss. ` +
      `Where ${a.themes[0]} meets ${b.themes[0]}, the growth question is: how do your strengths ` +
      `serve each other rather than compete? Talk about it; don't score it.`,
  };
}
```


## FILE: lib/guardrails.ts

```ts
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
```
