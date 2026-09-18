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
