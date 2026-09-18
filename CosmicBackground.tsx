"use client";
// CosmicBackground — animated sacred-geometry starfield for GODCODE™
// Canvas-based: no image assets, no dependencies, ~2KB gzipped.
// Renders a slowly-rotating Metatron-style lattice + twinkling stars
// in gold/cyan on deep indigo. Sits FIXED behind all content.
import { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // starfield
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.3,
      p: Math.random() * Math.PI * 2,
      s: 0.4 + Math.random() * 1.2,
    }));

    const hex = (i: number) => (i * Math.PI) / 3;

    const draw = (tms: number) => {
      const t = tms / 1000;
      // deep space base
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0a0d1f");
      g.addColorStop(0.55, "#0d1117");
      g.addColorStop(1, "#120a24");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // stars
      for (const st of stars) {
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * st.s + st.p));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#cfe4ff";
        ctx.beginPath();
        ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // sacred geometry — Metatron-style lattice, slow rotation
      const cx = w / 2, cy = h * 0.42;
      const R = Math.min(w, h) * 0.16;
      const rot = reduced ? 0 : t * 0.05;

      const pts: { x: number; y: number }[] = [{ x: cx, y: cy }];
      for (let ring = 1; ring <= 2; ring++) {
        for (let i = 0; i < 6; i++) {
          const a = hex(i) + rot + (ring === 2 ? Math.PI / 6 : 0);
          pts.push({ x: cx + Math.cos(a) * R * ring, y: cy + Math.sin(a) * R * ring });
        }
      }

      ctx.lineWidth = 1;
      // connect all 13 centers (subtle web)
      ctx.strokeStyle = "rgba(212,175,55,0.10)";
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
        }
      ctx.stroke();

      // circles with glow
      for (let i = 0; i < pts.length; i++) {
        const r = i === 0 ? R : R;
        ctx.save();
        ctx.shadowColor = i % 3 === 0 ? "rgba(64,200,255,0.6)" : "rgba(255,200,80,0.55)";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = i === 0
          ? "rgba(255,215,120,0.35)"
          : i % 3 === 0
            ? "rgba(80,205,255,0.28)"
            : "rgba(255,200,90,0.28)";
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // hexagram (two triangles) — the classic sacred signature
      ctx.save();
      ctx.shadowColor = "rgba(255,200,90,0.5)";
      ctx.shadowBlur = 8;
      ctx.strokeStyle = "rgba(255,210,120,0.30)";
      for (const flip of [0, Math.PI]) {
        ctx.beginPath();
        for (let i = 0; i <= 6; i++) {
          const a = hex(i) + rot + flip;
          const x = cx + Math.cos(a) * R * 2;
          const y = cy + Math.sin(a) * R * 2;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.4);
      glow.addColorStop(0, "rgba(120,160,255,0.10)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - R * 3, cy - R * 3, R * 6, R * 6);

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-10" />;
}
