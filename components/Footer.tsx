"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0B0B] border-t border-white/[0.06] overflow-hidden">
      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(80px, 16vw, 200px)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.018)",
          }}
        >
          CHILE 20
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Logo */}
          <div className="flex flex-col leading-none">
            <span
              className="font-black text-white tracking-[0.25em] uppercase"
              style={{ fontSize: "22px" }}
            >
              CHILE
            </span>
            <span
              className="font-black tracking-[0.5em]"
              style={{ fontSize: "11px", color: "#FF0033" }}
            >
              20
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {["COLLECTION", "LOOKBOOK", "STORY", "STOCKISTS", "CAREERS", "PRESS"].map((link) => (
              <button
                key={link}
                className="font-mono text-white/30 hover:text-white/70 transition-colors"
                style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Social icons as text */}
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
          <p
            className="font-mono text-white/20"
            style={{ fontSize: "9px", letterSpacing: "0.25em" }}
          >
            © 2026 CHILE 20. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {["PRIVACY POLICY", "TERMS OF SERVICE", "COOKIE SETTINGS"].map((link) => (
              <button
                key={link}
                className="font-mono text-white/20 hover:text-white/40 transition-colors"
                style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                {link}
              </button>
            ))}
          </div>
          <div
            className="font-mono text-white/10"
            style={{ fontSize: "8px", letterSpacing: "0.2em" }}
          >
            SS2026 · CINEMATIC SERIES
          </div>
        </div>
      </div>
    </footer>
  );
}
