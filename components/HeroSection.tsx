"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const garments = [
  {
    id: 0,
    name: "NOIR EDITION",
    code: "CL20-BLK",
    tag: "STEALTH",
    bg: "linear-gradient(135deg, #111111 0%, #1a1a1a 40%, #0d0d0d 100%)",
    accent: "#FFFFFF",
    glow: "rgba(255,255,255,0.12)",
    stripes: "rgba(255,255,255,0.08)",
    detail: "Matte obsidian shell / Triple-density foam",
    badge: "#222",
    badgeText: "#fff",
  },
  {
    id: 1,
    name: "CRIMSON DROP",
    code: "CL20-RED",
    tag: "HERO",
    bg: "linear-gradient(135deg, #1a0000 0%, #330000 40%, #1a0000 100%)",
    accent: "#FF0033",
    glow: "rgba(255,0,51,0.35)",
    stripes: "rgba(255,0,51,0.15)",
    detail: "Heat-reactive shell / Carbon fibre boning",
    badge: "#FF0033",
    badgeText: "#fff",
  },
  {
    id: 2,
    name: "BLANC LUXE",
    code: "CL20-WHT",
    tag: "PURE",
    bg: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 40%, #1a1a1a 100%)",
    accent: "#E8E8E8",
    glow: "rgba(232,232,232,0.15)",
    stripes: "rgba(255,255,255,0.1)",
    detail: "Pearl-woven exterior / Cloud insulation",
    badge: "#e8e8e8",
    badgeText: "#000",
  },
];

function GarmentCard({
  garment,
  isFocus,
  position,
  onClick,
}: {
  garment: (typeof garments)[0];
  isFocus: boolean;
  position: "left" | "center" | "right";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const scaleVal = isFocus ? 1 : 0.78;
  const opacityVal = isFocus ? 1 : 0.45;

  const xOffset =
    position === "left" ? "-30%" : position === "right" ? "30%" : "0%";

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        scale: scaleVal,
        opacity: opacityVal,
        x: xOffset,
        zIndex: isFocus ? 10 : 1,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute cursor-pointer select-none"
      style={{ width: "280px", transformOrigin: "center bottom" }}
    >
      {/* Card shell */}
      <motion.div
        animate={{
          boxShadow: isFocus
            ? `0 0 60px ${garment.glow}, 0 0 120px ${garment.glow.replace("0.35", "0.15")}`
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
        style={{
          background: garment.bg,
          aspectRatio: "3/4",
          border: isFocus
            ? `1px solid ${garment.accent}22`
            : "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Stripe accents */}
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 24px,
              ${garment.stripes} 24px,
              ${garment.stripes} 26px
            )`,
          }}
        />

        {/* Simulated jacket silhouette */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Hood area */}
          <div
            className="rounded-full mb-2"
            style={{
              width: "70px",
              height: "50px",
              background: `radial-gradient(ellipse at center, ${garment.accent}22 0%, transparent 70%)`,
              border: `1px solid ${garment.accent}30`,
            }}
          />
          {/* Body */}
          <div
            style={{
              width: "160px",
              height: "190px",
              background: `linear-gradient(180deg, ${garment.accent}18 0%, ${garment.accent}08 100%)`,
              border: `1px solid ${garment.accent}25`,
              position: "relative",
              clipPath: "polygon(12% 0%, 88% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)",
            }}
          >
            {/* Center zipper line */}
            <div
              className="absolute left-1/2 top-0 bottom-0"
              style={{
                width: "1px",
                background: `linear-gradient(180deg, ${garment.accent}60, transparent)`,
                transform: "translateX(-50%)",
              }}
            />
            {/* Chest stripe */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: "28%",
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${garment.accent}70, transparent)`,
              }}
            />
            {/* Three logo lines */}
            <div className="absolute right-4 top-6 flex flex-col gap-[3px]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: `${22 - i * 3}px`,
                    height: "1.5px",
                    background: garment.accent,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
            {/* Pocket lines */}
            <div
              className="absolute bottom-8 left-4"
              style={{
                width: "36px",
                height: "24px",
                border: `1px solid ${garment.accent}30`,
              }}
            />
            <div
              className="absolute bottom-8 right-4"
              style={{
                width: "36px",
                height: "24px",
                border: `1px solid ${garment.accent}30`,
              }}
            />
          </div>
        </div>

        {/* Tag badge */}
        <div
          className="absolute top-4 left-4 text-[9px] font-black tracking-[0.3em] px-2 py-1"
          style={{
            background: garment.badge,
            color: garment.badgeText,
          }}
        >
          {garment.tag}
        </div>

        {/* Code corner */}
        <div
          className="absolute bottom-4 right-4 font-mono text-[9px] tracking-widest"
          style={{ color: `${garment.accent}80` }}
        >
          {garment.code}
        </div>

        {/* Hover shine sweep */}
        <AnimatePresence>
          {(hovered || isFocus) && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%", opacity: 0.12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label under card */}
      <AnimatePresence>
        {isFocus && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-center"
          >
            <div
              className="text-xs font-black tracking-[0.35em] uppercase mb-1"
              style={{ color: garment.accent }}
            >
              {garment.name}
            </div>
            <div className="text-white/40 text-[10px] font-mono tracking-widest">
              {garment.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % garments.length);
    }, 4000);
    return () => clearTimeout(t);
  }, [activeIdx, autoplay]);

  const getPosition = (idx: number): "left" | "center" | "right" => {
    if (idx === activeIdx) return "center";
    const diff = (idx - activeIdx + garments.length) % garments.length;
    return diff === 1 ? "right" : "left";
  };

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    setAutoplay(false);
  };

  const active = garments[activeIdx];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0B]">
      {/* Background kinetic text — very faint */}
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none select-none">
        <div className="overflow-hidden">
          <div className="marquee-left flex whitespace-nowrap">
            {Array(4).fill("CHILE 20 · LIMITED EDITION · ").map((t, i) => (
              <span
                key={i}
                className="text-[120px] font-black tracking-tighter text-white/[0.025] uppercase pr-16"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden mt-4">
          <div className="marquee-right flex whitespace-nowrap">
            {Array(4).fill("· BORN FROM STREETS · BUILT FOR FUTURE · ").map((t, i) => (
              <span
                key={i}
                className="text-[80px] font-black tracking-tighter text-white/[0.02] uppercase pr-16"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-24 left-0 right-0 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] text-white/30 font-mono tracking-[0.5em] uppercase">
          SS2026 · COLLECTION
        </span>
        <span className="text-[11px] text-white/50 tracking-[0.4em] uppercase font-bold">
          Select a Garment to Design
        </span>
      </motion.div>

      {/* Accent glow orb behind center */}
      <motion.div
        animate={{
          background: `radial-gradient(ellipse 320px 400px at center, ${active.glow} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Cards wrapper */}
      <div className="relative flex items-center justify-center w-full" style={{ height: "520px" }}>
        {garments.map((g, idx) => (
          <GarmentCard
            key={g.id}
            garment={g}
            isFocus={idx === activeIdx}
            position={getPosition(idx)}
            onClick={() => handleSelect(idx)}
          />
        ))}
      </div>

      {/* Dots selector */}
      <div className="flex items-center gap-3 mt-6 z-10">
        {garments.map((g, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className="relative w-8 h-[2px] transition-all duration-300"
            style={{
              background:
                idx === activeIdx ? g.accent : "rgba(255,255,255,0.2)",
              boxShadow:
                idx === activeIdx
                  ? `0 0 8px ${g.accent}`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase font-mono">
          Scroll to Explore
        </span>
        <div className="float-up text-white/40">
          <ChevronDown size={16} />
        </div>
        <div
          className="pulse-line w-px bg-white/20"
          style={{ height: "32px" }}
        />
      </motion.div>

      {/* CHILE 20 big center title text */}
      <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-[11px] text-white/20 font-mono tracking-[0.8em] uppercase"
        >
          CHILE 20 / SELECT A GARMENT TO DESIGN
        </motion.div>
      </div>
    </section>
  );
}
