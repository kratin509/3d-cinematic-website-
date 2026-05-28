"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ShoppingBag } from "lucide-react";

export default function Header() {
  const [muted, setMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["COLLECTION", "LOOKBOOK", "STORY", "STOCKISTS"];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? "rgba(11,11,11,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s",
        }}
      >
        {/* Co-brand logo — adidas × Foot Locker */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* adidas wordmark */}
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontWeight: 900,
                fontSize: "17px",
                letterSpacing: "-0.01em",
                color: "#ffffff",
                textTransform: "lowercase",
                fontStyle: "italic",
              }}
            >
              adidas
            </span>
            <span
              style={{
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              originals
            </span>
          </div>

          {/* Divider + × symbol */}
          <div className="flex items-center gap-2">
            <div style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,0,51,0.8)", fontWeight: 900 }}>×</span>
            <div style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.15)" }} />
          </div>

          {/* Foot Locker wordmark */}
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              FOOT
            </span>
            <span
              style={{
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#FF0033",
              }}
            >
              LOCKER
            </span>
          </div>

          {/* Collection tag — desktop only */}
          <div className="hidden md:flex items-center gap-2 ml-3">
            <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)" }} />
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace",
                marginLeft: "8px",
              }}
            >
              Chile 20 · SS2026
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-8 mr-6">
            {navLinks.map((link) => (
              <button
                key={link}
                className="text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Sound toggle */}
          <button
            onClick={() => setMuted(!muted)}
            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label="Toggle sound"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Shop button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:flex items-center gap-2 bg-[#FF0033] text-white font-bold px-5 py-2.5"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(255,0,51,0.35)",
            }}
          >
            <ShoppingBag size={12} />
            SHOP THE COLLECTION
          </motion.button>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0B0B0B]/96 backdrop-blur-xl border-b border-white/10 flex flex-col px-8 py-6 gap-5 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="text-white/70 hover:text-white text-sm tracking-[0.3em] uppercase text-left font-bold"
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 bg-[#FF0033] text-white text-xs tracking-[0.2em] uppercase font-bold px-5 py-3 w-full justify-center mt-2"
              style={{ boxShadow: "0 0 20px rgba(255,0,51,0.4)" }}
            >
              <ShoppingBag size={14} />
              SHOP THE COLLECTION
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
