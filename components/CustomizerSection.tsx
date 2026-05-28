"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShoppingBag, Share2, Edit3, Check } from "lucide-react";

export default function CustomizerSection() {
  const [customName, setCustomName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [added, setAdded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const sectionOpacity = useTransform(progress, [0, 0.5], [0, 1]);
  const sectionY = useTransform(progress, [0, 0.6], ["60px", "0px"]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  const displayName = customName || "YOUR NAME";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0B] py-24"
    >
      {/* Giant BG text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <div
          style={{
            fontSize: "clamp(100px, 20vw, 280px)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.022)",
            lineHeight: 0.85,
            textAlign: "center",
            userSelect: "none",
          }}
        >
          MAKE IT<br />YOURS
        </div>
      </div>

      {/* Red ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,51,0.055) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-6"
      >
        {/* Section marker */}
        <div className="flex items-center gap-4 mb-10">
          <div style={{ width: "48px", height: "1px", background: "#FF0033", boxShadow: "0 0 6px rgba(255,0,51,0.6)" }} />
          <span style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.5em", textTransform: "uppercase", color: "#FF0033" }}>
            03 / CUSTOMIZER
          </span>
          <div style={{ width: "48px", height: "1px", background: "#FF0033", boxShadow: "0 0 6px rgba(255,0,51,0.6)" }} />
        </div>

        {/* Heading */}
        <h2
          className="text-center font-black uppercase leading-none mb-3"
          style={{ fontSize: "clamp(40px, 6.5vw, 84px)", letterSpacing: "-0.02em" }}
        >
          Design Your
          <br />
          <span style={{ color: "#FF0033", textShadow: "0 0 40px rgba(255,0,51,0.5)" }}>
            adidas Chile 20
          </span>
        </h2>

        {/* Co-brand subtitle */}
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontStyle: "italic", fontWeight: 900, fontSize: "14px", color: "rgba(255,255,255,0.7)", letterSpacing: "-0.01em" }}>adidas originals</span>
          <span style={{ color: "#FF0033", fontWeight: 900 }}>×</span>
          <span style={{ fontWeight: 900, fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Foot Locker</span>
        </div>

        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "48px", textAlign: "center" }}>
          Stamp your identity on the limited collection
        </p>

        {/* Canvas row */}
        <div className="flex flex-col lg:flex-row gap-10 w-full items-center justify-center">

          {/* ── Jacket preview with name overlay ── */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative flex-shrink-0"
            style={{ width: "420px", height: "520px" }}
          >
            {/* Ambient back-glow */}
            <div
              style={{
                position: "absolute",
                inset: "-40px",
                background: "radial-gradient(ellipse at center, rgba(255,0,51,0.2) 0%, transparent 65%)",
                borderRadius: "50%",
                filter: "blur(16px)",
              }}
            />

            {/* Real jacket image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/jacket-black.png"
              alt="adidas Chile 20 Black Jacket"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 30px rgba(255,0,51,0.5)) drop-shadow(0 0 70px rgba(255,0,51,0.2))",
                display: "block",
                position: "relative",
                zIndex: 2,
              }}
              draggable={false}
            />

            {/* Name stamp overlay — positioned at chest / mid-torso area */}
            <div
              onClick={() => {
                setIsEditing(true);
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
              style={{
                position: "absolute",
                /* chest zone: roughly 36–52% from top, centered */
                top: "38%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "76%",
                zIndex: 10,
                cursor: "text",
                textAlign: "center",
              }}
            >
              {/* Pulsing dashed border */}
              <motion.div
                animate={{
                  borderColor: isEditing
                    ? ["rgba(255,0,51,0.9)", "rgba(255,0,51,0.3)", "rgba(255,0,51,0.9)"]
                    : ["rgba(255,255,255,0.18)", "rgba(255,255,255,0.18)"],
                }}
                transition={{ duration: 1.1, repeat: isEditing ? Infinity : 0 }}
                style={{
                  border: "1px dashed rgba(255,255,255,0.18)",
                  padding: "6px 10px",
                  backdropFilter: "blur(2px)",
                  background: isEditing ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.2)",
                }}
              >
                {isEditing ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={customName}
                    onChange={(e) =>
                      setCustomName(e.target.value.toUpperCase().slice(0, 14))
                    }
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                    maxLength={14}
                    placeholder="TYPE YOUR NAME"
                    className="name-input font-black tracking-widest uppercase"
                    style={{
                      fontSize: customName.length > 8 ? "15px" : "19px",
                      letterSpacing: "0.22em",
                      color: "#FF0033",
                      textShadow: "0 0 14px rgba(255,0,51,0.8)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: displayName.length > 8 ? "15px" : "19px",
                      fontWeight: 900,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: customName ? "#FF0033" : "rgba(255,255,255,0.28)",
                      textShadow: customName
                        ? "0 0 14px rgba(255,0,51,0.8)"
                        : "none",
                      textAlign: "center",
                    }}
                  >
                    {displayName}
                  </div>
                )}
              </motion.div>

              {/* Click hint */}
              {!isEditing && (
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Edit3 size={9} style={{ color: "rgba(255,255,255,0.22)" }} />
                  <span
                    style={{
                      fontSize: "8px",
                      fontFamily: "monospace",
                      letterSpacing: "0.3em",
                      color: "rgba(255,255,255,0.22)",
                    }}
                  >
                    CLICK THE TEXT AND TYPE YOUR NAME
                  </span>
                </div>
              )}
            </div>

            {/* adidas Originals stamp — lower chest */}
            <div
              style={{
                position: "absolute",
                top: "54%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "7px",
                fontWeight: 700,
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
                textAlign: "center",
                whiteSpace: "nowrap",
                zIndex: 10,
                fontFamily: "monospace",
              }}
            >
              ADIDAS ORIGINALS · CHILE 20 · SS2026
            </div>
          </motion.div>

          {/* ── Right panel: controls ── */}
          <div className="flex flex-col gap-6 max-w-sm w-full">

            {/* Personalization tracker */}
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>
                PERSONALIZATION
              </div>
              <div className="text-white font-bold tracking-widest uppercase" style={{ fontSize: "14px" }}>
                {customName || "—"}
              </div>
              <div style={{ fontSize: "9px", fontFamily: "monospace", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>
                {customName.length}/14 characters used
              </div>
              <div
                style={{
                  height: "2px",
                  marginTop: "12px",
                  background: `linear-gradient(90deg, #FF0033 ${(customName.length / 14) * 100}%, rgba(255,255,255,0.1) ${(customName.length / 14) * 100}%)`,
                }}
              />
            </div>

            {/* Product spec table */}
            <div className="flex flex-col gap-3">
              {[
                ["Brand", "adidas Originals"],
                ["Edition", "Chile 20 × Foot Locker"],
                ["Material", "Lightweight Tricot Fabric"],
                ["Detail", "Applied 3-Stripes"],
                ["Availability", "2,000 units worldwide"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#fff" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                style={{
                  fontSize: "clamp(36px, 5vw, 52px)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                }}
              >
                $340
              </span>
              <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
                USD · INCL. TAX
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4 font-black tracking-[0.25em] uppercase"
                style={{
                  fontSize: "13px",
                  background: added ? "#00cc44" : "#FF0033",
                  boxShadow: added
                    ? "0 0 28px rgba(0,204,68,0.5)"
                    : "0 0 24px rgba(255,0,51,0.4)",
                  transition: "background 0.35s, box-shadow 0.35s",
                  color: "#fff",
                }}
              >
                {added ? (
                  <><Check size={16} /> ADDED TO CART</>
                ) : (
                  <><ShoppingBag size={16} /> ADD TO CART</>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4 font-bold tracking-[0.25em] uppercase text-white/70 hover:text-white transition-all"
                style={{
                  fontSize: "13px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Share2 size={14} />
                SHARE YOUR DESIGN
              </motion.button>
            </div>

            {/* Fine print */}
            <p style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.2em", lineHeight: 1.7, color: "rgba(255,255,255,0.18)" }}>
              Free shipping on orders over $200. Personalization takes 3–5 business days.
              Limited to one personalized unit per customer.
              adidas Originals × Foot Locker exclusive.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
