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
