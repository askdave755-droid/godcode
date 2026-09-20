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

  /* ---- LANDING VIEW: hero card with the input front and center ---- */
  if (!report) {
    return (
      <main className="min-h-screen flex items-center justify-center p-5">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-yellow-400 to-cyan-300 bg-clip-text text-transparent">GODCODE</h1>
            <p className="mt-2 text-gray-300 text-sm leading-relaxed">
              Your birthday is a set of numbers God assigned <em>you</em>.<br />
              Find out what they mean — in about 60 seconds.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 shadow-2xl shadow-indigo-950/60">
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Your name</label>
            <input className="w-full mb-4 p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/60 outline-none text-lg"
              placeholder="First name is fine" value={name} onChange={(e) => setName(e.target.value)} />

            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Birthday</label>
            <input className="w-full mb-4 p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/60 outline-none text-lg"
              placeholder="MM/DD/YYYY" value={dob} onChange={(e) => setDob(e.target.value)} />

            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">This season, in one word <span className="normal-case text-gray-500">(optional)</span></label>
            <input className="w-full mb-5 p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/60 outline-none text-lg"
              placeholder="tired, rebuilding, hopeful…" value={season} onChange={(e) => setSeason(e.target.value)} />

            <button onClick={go} disabled={busy}
              className="w-full p-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-lg disabled:opacity-50 active:scale-[0.98] transition">
              {busy ? "Reading the numbers…" : "Reveal my Godcode →"}
            </button>
            {err && <p className="text-red-400 text-sm mt-3 text-center">{err}</p>}
            <p className="text-[11px] text-gray-500 mt-4 text-center leading-relaxed">
              A symbolic theme for reflection — not numerology, not fortune-telling, not a prediction.
            </p>
          </div>

          <a href="/reply" className="block text-center text-cyan-300/80 text-xs underline mt-5">
            Creator? Open the Reply Helper →
          </a>
        </div>
      </main>
    );
  }

  /* ---- REPORT VIEW ---- */
  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="bg-black/50 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 text-center">
          <p className="text-xs text-gray-400 tracking-widest">GODCODE IDENTITY REPORT</p>
          <h2 className="text-2xl font-bold mt-1">{report.name}</h2>
          <p className="text-gray-400 text-sm">{report.dob}</p>
          <div className="mt-4">
            <div className="text-7xl font-extrabold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">{report.godCode}</div>
            <div className="text-lg mt-1">{report.numberTheme.themes.join(" • ")}</div>
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

        <div className="bg-black/50 backdrop-blur-md border border-amber-500/20 rounded-2xl p-5">
          <p className="font-semibold mb-1">Biblical identity</p>
          <p className="text-sm">{report.biblicalIdentity.verse}</p>
          <p className="text-sm italic mt-1">{report.biblicalIdentity.statement}</p>
        </div>

        <Section title="Prayer" body={report.prayer} />
        <Section title="Your action step" body={report.actionStep} />

        <div className="bg-black/40 border border-yellow-900/50 rounded-xl p-4">
          <p className="text-xs text-gray-300">{report.antiOccultNote}</p>
          <p className="text-xs text-gray-300 mt-1">{report.disclosure}</p>
        </div>

        <button onClick={() => setReport(null)}
          className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/15">← New Godcode</button>
      </div>
    </main>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm text-gray-300">{body}</p>
    </div>
  );
}

