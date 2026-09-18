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
