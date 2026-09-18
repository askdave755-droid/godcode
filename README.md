# GODCODE™ — MVP

Next.js + TypeScript. Reflection-based biblical number themes. Built-in guardrails.

## Run
    npx create-next-app@latest godcode --typescript --tailwind --app
    # then copy this repo's app/ and lib/ into it
    npm i
    npm run dev

## Deploy (Vercel)
    vercel --prod

## Files
- lib/data.ts               — NUMBER_THEMES 1-9, MONTH_THEMES 1-12, disclosures
- lib/godcode.ts            — calculateGodCode, buildReport, relationshipCode
- lib/guardrails.ts         — BANNED_PHRASES validator, prayer builder, name notes,
                              TikTok reply generator (Friday-night engine)
- app/page.tsx              — report UI (Identity Report structure)
- app/api/godcode/route.ts  — POST {name, dob, seasonWord, partnerDob?}
- app/reply                 — TikTok Reply Helper (paste comment -> copy reply)

## Guardrails (enforced in code)
G1 reflection-not-revelation · G2 no predictions (BANNED_PHRASES scan) ·
G3 identity verse paired with every code · G4 anti-occult disclosure footer ·
G5 questions-not-diagnoses · G6 heavy comments -> care reply, never a number.

## Not in MVP (next iterations)
DreamCode module · PDF export · AI name etymology (NAME_MAP is a stub — extend it) ·
email delivery · shareable link reports · LLM-written symbolism (keep templates
until the guardrail suite is battle-tested)
