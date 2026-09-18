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
