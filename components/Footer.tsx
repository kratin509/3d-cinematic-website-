"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0B0B] overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* BG watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(60px, 14vw, 180px)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.016)",
            whiteSpace: "nowrap",
          }}
        >
          ADIDAS ORIGINALS
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-12">
        {/* Top row */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 pb-8"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Co-brand logo */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col leading-none">
              <span style={{ fontWeight: 900, fontSize: "18px", letterSpacing: "-0.01em", color: "#fff", fontStyle: "italic" }}>
                adidas
              </span>
              <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                originals
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,0,51,0.8)", fontWeight: 900, margin: "0 4px" }}>×</span>
            <div className="flex flex-col leading-none">
              <span style={{ fontWeight: 900, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
                FOOT
              </span>
              <span style={{ fontWeight: 900, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#FF0033" }}>
                LOCKER
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {["COLLECTION", "LOOKBOOK", "STORY", "STOCKISTS", "CAREERS", "PRESS"].map((link) => (
              <button
                key={link}
                className="text-white/30 hover:text-white/70 transition-colors"
                style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {["IG", "TW", "YT", "TK"].map((s) => (
              <motion.button
                key={s}
                whileHover={{ color: "#FF0033" }}
                className="font-black text-white/20 transition-colors"
                style={{ fontSize: "11px", letterSpacing: "0.2em" }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.25em", color: "rgba(255,255,255,0.18)" }}>
            © 2026 ADIDAS ORIGINALS × FOOT LOCKER. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {["PRIVACY POLICY", "TERMS OF SERVICE", "COOKIE SETTINGS"].map((link) => (
              <button
                key={link}
                className="text-white/18 hover:text-white/40 transition-colors"
                style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                {link}
              </button>
            ))}
          </div>
          <div style={{ fontSize: "8px", fontFamily: "monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.1)" }}>
            CHILE 20 · SS2026 · CINEMATIC SERIES
          </div>
        </div>
      </div>
    </footer>
  );
}
