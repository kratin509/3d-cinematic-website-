"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const copyLines = [
  { text: "Born from\nthe Streets.", sub: "Street-tested architecture" },
  { text: "Engineered\nfor Motion.", sub: "Zero-gravity insulation system" },
  { text: "Worn by\nthe Bold.", sub: "Limited to 2,000 units worldwide" },
  { text: "Chile 20\nForever.", sub: "SS2026 · FINAL CHAPTER" },
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
          <span className="text-[#FF0033] text-[10px] font-mono tracking-[0.4em] uppercase">
            FEATURE {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h2
          className="text-5xl md:text-7xl font-black uppercase leading-none text-white"
          style={{
            textShadow: "0 0 40px rgba(255,0,51,0.2)",
            whiteSpace: "pre-line",
          }}
        >
          {line.text}
        </h2>
        <p className="text-white/40 text-sm tracking-[0.2em] uppercase font-mono">
          {line.sub}
        </p>
      </div>
    </motion.div>
  );
}

function ProductVisual({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [0.88, 1.3]);
  const opacity = useTransform(progress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "360px",
            height: "440px",
            background: "radial-gradient(ellipse at center, rgba(255,0,51,0.25) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Jacket body */}
        <div
          style={{
            width: "240px",
            height: "300px",
            background: "linear-gradient(145deg, #1a0000 0%, #330000 30%, #200000 60%, #0d0000 100%)",
            clipPath: "polygon(10% 0%, 90% 0%, 100% 12%, 100% 100%, 75% 100%, 75% 80%, 25% 80%, 25% 100%, 0% 100%, 0% 12%)",
            boxShadow: "0 0 50px rgba(255,0,51,0.4), inset 0 0 60px rgba(255,0,51,0.06)",
            border: "1px solid rgba(255,0,51,0.3)",
            position: "relative",
          }}
        >
          {/* Stripe texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(-50deg, transparent, transparent 18px, rgba(255,0,51,0.07) 18px, rgba(255,0,51,0.07) 20px)",
            }}
          />
          {/* Zip line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "linear-gradient(180deg, rgba(255,0,51,0.8), rgba(255,0,51,0.1))",
              transform: "translateX(-50%)",
            }}
          />
          {/* Chest logo text */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.4em",
              textAlign: "center",
              textTransform: "uppercase",
              color: "rgba(255,0,51,0.65)",
              lineHeight: 1.4,
              whiteSpace: "nowrap",
            }}
          >
            CHILE<br />20
          </div>
          {/* Three-stripe shoulders — both sides */}
          {[0, 1].map((side) => (
            <div
              key={side}
              style={{
                position: "absolute",
                top: "12px",
                ...(side === 0 ? { left: "12px" } : { right: "12px" }),
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {[28, 22, 16].map((w, j) => (
                <div
                  key={j}
                  style={{
                    width: `${w}px`,
                    height: "2px",
                    background: `rgba(255,0,51,${0.7 - j * 0.1})`,
                  }}
                />
              ))}
            </div>
          ))}
          {/* Pockets */}
          {[0, 1].map((side) => (
            <div
              key={side}
              style={{
                position: "absolute",
                bottom: "72px",
                ...(side === 0 ? { left: "16px" } : { right: "16px" }),
                width: "54px",
                height: "34px",
                border: "1px solid rgba(255,0,51,0.3)",
                background: "rgba(255,0,51,0.04)",
              }}
            />
          ))}
        </div>

        {/* Floor glow shadow */}
        <div
          style={{
            position: "absolute",
            bottom: "-24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "40px",
            background: "radial-gradient(ellipse at center, rgba(255,0,51,0.5) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        {/* Orbit dots */}
        {[0, 120, 240].map((deg, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [deg, deg + 360] }}
            transition={{ duration: 20 + i * 4, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
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
                opacity: 0.5,
                boxShadow: "0 0 8px #FF0033",
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
      <motion.div
        style={{ top: dotTop, position: "absolute", left: "-3px" }}
      >
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

        {/* ── BG LAYER: kinetic typography ── */}
        <motion.div
          style={{ opacity: bgOpacity, scale: bgScale }}
          className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden pointer-events-none select-none"
        >
          <motion.div style={{ x: bgX1 }} className="flex whitespace-nowrap">
            {Array(6).fill("CHILE 20 · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(80px, 12vw, 160px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.035)",
                  paddingRight: "2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
          <motion.div style={{ x: bgX2 }} className="flex whitespace-nowrap mt-1">
            {Array(6).fill("LIMITED EDITION · SS2026 · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(50px, 7vw, 90px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.022)",
                  paddingRight: "2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
          <motion.div style={{ x: bgX1 }} className="flex whitespace-nowrap mt-1">
            {Array(6).fill("BORN FROM THE STREETS · ").map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(60px, 9vw, 120px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "rgba(255,0,51,0.025)",
                  paddingRight: "2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── MID LAYER: product visual ── */}
        <ProductVisual progress={progress} />

        {/* ── FOREGROUND LAYER: copy panels ── */}
        <div className="absolute inset-0 z-20">
          {copyLines.map((line, i) => (
            <CopyPanel key={i} line={line} index={i} progress={progress} />
          ))}
        </div>

        {/* Left measurement ticks */}
        <div
          className="absolute left-6 top-0 bottom-0 flex flex-col justify-between py-16 z-30 pointer-events-none"
        >
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
                <span
                  className="font-mono"
                  style={{ fontSize: "8px", color: "rgba(255,255,255,0.2)" }}
                >
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
          <span
            className="font-mono tracking-[0.5em] uppercase"
            style={{ fontSize: "9px", color: "rgba(255,255,255,0.18)" }}
          >
            CHILE 20 · SS2026 · CINEMATIC SERIES
          </span>
          <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
