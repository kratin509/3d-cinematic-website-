"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const garments = [
  {
    id: 0,
    name: "NOIR EDITION",
    code: "CL20-BLK",
    tag: "HERO",
    src: "/jacket-black.png",
    accent: "#FFFFFF",
    glow: "rgba(255,0,51,0.30)",
    dropShadow: "drop-shadow(0 0 28px rgba(255,0,51,0.45)) drop-shadow(0 0 60px rgba(255,0,51,0.2))",
    detail: "Wet-look PU coating / Applied 3-Stripes",
    badge: "#FF0033",
    badgeText: "#fff",
  },
  {
    id: 1,
    name: "CRIMSON DROP",
    code: "CL20-RED",
    tag: "LIMITED",
    src: "/jacket-red.png",
    accent: "#FF0033",
    glow: "rgba(255,0,51,0.40)",
    dropShadow: "drop-shadow(0 0 32px rgba(255,0,51,0.6)) drop-shadow(0 0 70px rgba(255,0,51,0.25))",
    detail: "Heat-reactive shell / Carbon fibre boning",
    badge: "#111",
    badgeText: "#FF0033",
  },
  {
    id: 2,
    name: "BLANC LUXE",
    code: "CL20-WHT",
    tag: "PURE",
    src: "/jacket-white.png",
    accent: "#E8E8E8",
    glow: "rgba(232,232,232,0.18)",
    dropShadow: "drop-shadow(0 0 28px rgba(220,220,220,0.3)) drop-shadow(0 0 60px rgba(255,255,255,0.12))",
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

  const scaleVal = isFocus ? 1 : 0.74;
  const opacityVal = isFocus ? 1 : 0.42;
  const xOffset =
    position === "left" ? "-32%" : position === "right" ? "32%" : "0%";

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
      style={{ width: "290px" }}
    >
      {/* Image container — transparent background, glow via filter */}
      <div className="relative" style={{ width: "290px", height: "380px" }}>
        {/* Back-glow plane (behind image) */}
        <motion.div
          animate={{
            opacity: isFocus ? 1 : 0,
            scale: isFocus ? 1 : 0.8,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 80% at 50% 55%, ${garment.glow} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        {/* Real jacket image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={garment.src}
          alt={garment.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: isFocus ? garment.dropShadow : "none",
            transition: "filter 0.6s ease",
            position: "relative",
            zIndex: 2,
          }}
          draggable={false}
        />

        {/* Badge — top left */}
        <div
          className="absolute top-3 left-3 z-10 text-[9px] font-black tracking-[0.3em] px-2 py-1"
          style={{
            background: garment.badge,
            color: garment.badgeText,
          }}
        >
          {garment.tag}
        </div>

        {/* Code — bottom right */}
        <div
          className="absolute bottom-3 right-3 z-10 font-mono text-[9px] tracking-widest"
          style={{ color: `${garment.accent}99` }}
        >
          {garment.code}
        </div>

        {/* Hover shine sweep */}
        <AnimatePresence>
          {(hovered || isFocus) && (
            <motion.div
              initial={{ x: "-110%", opacity: 0 }}
              animate={{ x: "210%", opacity: 0.09 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute inset-y-0 w-1/3 pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Label under image */}
      <AnimatePresence>
        {isFocus && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-3 text-center"
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
  // Black jacket (id:0) is the hero — starts center
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % garments.length);
    }, 4500);
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

      {/* Kinetic BG text */}
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none select-none">
        <div className="overflow-hidden">
          <div className="marquee-left flex whitespace-nowrap">
            {Array(4).fill("ADIDAS ORIGINALS · CHILE 20 · FOOT LOCKER · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(72px, 10vw, 120px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.025)",
                  paddingRight: "3rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden mt-2">
          <div className="marquee-right flex whitespace-nowrap">
            {Array(4).fill("· BORN FROM THE STREETS · BUILT FOR THE FUTURE · SS2026 · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(44px, 6vw, 80px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,0,51,0.022)",
                  paddingRight: "3rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top label — main hero title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-24 left-0 right-0 flex flex-col items-center gap-2"
      >
        {/* Co-brand marker */}
        <div className="flex items-center gap-3">
          <div style={{ width: "32px", height: "1px", background: "#FF0033", boxShadow: "0 0 6px rgba(255,0,51,0.7)" }} />
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#FF0033",
              fontWeight: 700,
            }}
          >
            adidas originals × foot locker
          </span>
          <div style={{ width: "32px", height: "1px", background: "#FF0033", boxShadow: "0 0 6px rgba(255,0,51,0.7)" }} />
        </div>
        <h1
          style={{
            fontSize: "clamp(22px, 3.5vw, 36px)",
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          ADIDAS ORIGINALS — CHILE 20
        </h1>
        <p
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.12em",
            textAlign: "center",
            maxWidth: "420px",
            lineHeight: 1.7,
            fontFamily: "monospace",
          }}
        >
          Born from the streets. An updated take on a streetwear staple,
          <br className="hidden md:block" />
          combining wet-look coating with iconic heritage lines.
        </p>
      </motion.div>

      {/* Accent glow orb */}
      <motion.div
        animate={{
          background: `radial-gradient(ellipse 360px 440px at center, ${active.glow} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Cards wrapper */}
      <div
        className="relative flex items-center justify-center w-full"
        style={{ height: "520px", marginTop: "60px" }}
      >
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

      {/* Dot selector */}
      <div className="flex items-center gap-4 mt-8 z-10">
        {garments.map((g, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className="relative h-[2px] transition-all duration-300"
            style={{
              width: idx === activeIdx ? "36px" : "20px",
              background: idx === activeIdx ? g.accent : "rgba(255,255,255,0.2)",
              boxShadow: idx === activeIdx ? `0 0 8px ${g.accent}` : "none",
            }}
          />
        ))}
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.18)",
            fontFamily: "monospace",
            letterSpacing: "0.7em",
            textTransform: "uppercase",
          }}
        >
          CHILE 20 / SELECT A GARMENT TO DESIGN
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontSize: "8px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Scroll to Explore
        </span>
        <div className="float-up text-white/30">
          <ChevronDown size={14} />
        </div>
        <div className="pulse-line w-px bg-white/15" style={{ height: "28px" }} />
      </motion.div>
    </section>
  );
}
