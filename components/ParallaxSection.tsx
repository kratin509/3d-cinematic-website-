"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const copyLines = [
  {
    text: "Lightweight\nTricot Fabric.",
    sub: "Breathable woven performance shell with a premium wet-look finish",
  },
  {
    text: "Applied\n3-Stripes.",
    sub: "Iconic Adidas heritage detailing applied to both sleeves",
  },
  {
    text: "Secure Zipper\nPockets.",
    sub: "Two side-entry zip pockets with metal pullers and inner mesh lining",
  },
  {
    text: "Chile 20\nForever.",
    sub: "Adidas Originals × Foot Locker · SS2026 · Final Chapter",
  },
];

function CopyPanel({
  line,
  index,
  progress,
}: {
  line: (typeof copyLines)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * 0.22;
  const peak = start + 0.1;
  const end = start + 0.26;
  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(progress, [start, end], ["40px", "-40px"]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center pointer-events-none px-8 md:px-20"
    >
      <div className="flex flex-col gap-3 max-w-lg">
        <div className="flex items-center gap-4">
          <div
            style={{
              width: "32px",
              height: "2px",
              background: "#FF0033",
              boxShadow: "0 0 8px rgba(255,0,51,0.8)",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#FF0033",
            }}
          >
            DETAIL {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h2
          className="font-black uppercase leading-none text-white"
          style={{
            fontSize: "clamp(40px, 7vw, 80px)",
            textShadow: "0 0 40px rgba(255,0,51,0.18)",
            whiteSpace: "pre-line",
          }}
        >
          {line.text}
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            lineHeight: 1.6,
          }}
        >
          {line.sub}
        </p>
      </div>
    </motion.div>
  );
}

function ProductVisual({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [0.95, 1.28]);
  const opacity = useTransform(progress, [0, 0.04, 0.94, 1], [0, 1, 1, 0]);
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.25, 0.55, 0.7]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <div className="relative flex items-center justify-center">

        {/* Back glow */}
        <motion.div
          style={{ opacity: glowOpacity, position: "absolute" }}
        >
          <div
            style={{
              width: "820px",
              height: "900px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(255,0,51,0.42) 0%, rgba(255,0,51,0.12) 45%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* Real jacket image — red variant */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/jacket-red.png"
          alt="adidas Chile 20 Red Jacket"
          style={{
            width: "min(700px, 46vw)",
            height: "auto",
            objectFit: "contain",
            filter:
              "drop-shadow(0 0 60px rgba(255,0,51,0.75)) drop-shadow(0 0 120px rgba(255,0,51,0.3))",
            position: "relative",
            zIndex: 2,
          }}
          draggable={false}
        />

        {/* Floor glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "420px",
            height: "70px",
            background:
              "radial-gradient(ellipse at center, rgba(255,0,51,0.65) 0%, transparent 70%)",
            filter: "blur(20px)",
            zIndex: 1,
          }}
        />

        {/* Orbit dots */}
        {[0, 120, 240].map((deg, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [deg, deg + 360] }}
            transition={{ duration: 22 + i * 5, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "560px",
              height: "560px",
              transformOrigin: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#FF0033",
                opacity: 0.45,
                boxShadow: "0 0 10px #FF0033",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const dotTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="absolute right-6 top-1/2 -translate-y-1/2 z-30"
      style={{ height: "200px", width: "1px", background: "rgba(255,255,255,0.1)" }}
    >
      <motion.div
        style={{ scaleY, transformOrigin: "top", height: "100%", width: "1px" }}
        className="absolute inset-0"
      >
        <div
          style={{
            width: "1px",
            height: "100%",
            background: "#FF0033",
            boxShadow: "0 0 6px #FF0033",
          }}
        />
      </motion.div>
      <motion.div style={{ top: dotTop, position: "absolute", left: "-3px" }}>
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#FF0033",
            boxShadow: "0 0 10px #FF0033",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const bgX1 = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const bgX2 = useTransform(progress, [0, 1], ["-5%", "12%"]);
  const bgScale = useTransform(progress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0B0B0B]">

        {/* ── BG LAYER: kinetic Adidas typography ── */}
        <motion.div
          style={{ opacity: bgOpacity, scale: bgScale }}
          className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden pointer-events-none select-none"
        >
          <motion.div style={{ x: bgX1 }} className="flex whitespace-nowrap">
            {Array(5).fill("ADIDAS ORIGINALS · CHILE 20 · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(80px, 12vw, 160px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.032)",
                  paddingRight: "2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
          <motion.div style={{ x: bgX2 }} className="flex whitespace-nowrap mt-1">
            {Array(5).fill("3-STRIPES · TRICOT · FOOT LOCKER · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(50px, 7vw, 90px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.02)",
                  paddingRight: "2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
          <motion.div style={{ x: bgX1 }} className="flex whitespace-nowrap mt-1">
            {Array(5).fill("BORN FROM THE STREETS · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(60px, 9vw, 120px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,0,51,0.024)",
                  paddingRight: "2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── MID LAYER: real product image ── */}
        <ProductVisual progress={progress} />

        {/* ── FOREGROUND LAYER: copy panels ── */}
        <div className="absolute inset-0 z-20">
          {copyLines.map((line, i) => (
            <CopyPanel key={i} line={line} index={i} progress={progress} />
          ))}
        </div>

        {/* Left measurement ticks */}
        <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-between py-16 z-30 pointer-events-none">
          {Array(9).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                style={{
                  width: i % 4 === 0 ? "16px" : "8px",
                  height: "1px",
                  background: i % 4 === 0 ? "rgba(255,0,51,0.5)" : "rgba(255,255,255,0.12)",
                }}
              />
              {i % 4 === 0 && (
                <span style={{ fontSize: "8px", fontFamily: "monospace", color: "rgba(255,255,255,0.2)" }}>
                  {String(i * 12).padStart(2, "0")}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Right progress bar */}
        <ProgressBar progress={progress} />

        {/* Bottom label */}
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 z-20 pointer-events-none">
          <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
            ADIDAS ORIGINALS · FOOT LOCKER · SS2026
          </span>
          <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
