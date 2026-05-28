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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div
          style={{
            fontSize: "clamp(120px, 22vw, 300px)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.025)",
            lineHeight: 0.85,
            textAlign: "center",
            userSelect: "none",
          }}
        >
          MAKE IT<br />YOURS
        </div>
      </div>

      {/* Subtle red glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,51,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-6"
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div style={{ width: "48px", height: "1px", background: "#FF0033", boxShadow: "0 0 6px rgba(255,0,51,0.6)" }} />
          <span className="text-[#FF0033] font-mono text-[10px] tracking-[0.5em] uppercase">
            03 / CUSTOMIZER
          </span>
          <div style={{ width: "48px", height: "1px", background: "#FF0033", boxShadow: "0 0 6px rgba(255,0,51,0.6)" }} />
        </div>

        {/* Main heading */}
        <h2
          className="text-center font-black uppercase leading-none mb-4"
          style={{
            fontSize: "clamp(42px, 7vw, 90px)",
            letterSpacing: "-0.02em",
            color: "#fff",
          }}
        >
          Design Your
          <br />
          <span style={{ color: "#FF0033", textShadow: "0 0 40px rgba(255,0,51,0.5)" }}>
            Chile 20
          </span>
        </h2>
        <p className="text-white/40 text-sm tracking-[0.2em] uppercase font-mono mb-16 text-center">
          Stamp your identity on the limited collection
        </p>

        {/* Customizer canvas */}
        <div className="flex flex-col lg:flex-row gap-10 w-full items-center justify-center">

          {/* Jacket preview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative flex-shrink-0"
            style={{ width: "300px", height: "380px" }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                inset: "-30px",
                background: "radial-gradient(ellipse at center, rgba(255,0,51,0.2) 0%, transparent 65%)",
                borderRadius: "50%",
              }}
            />

            {/* Jacket */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(145deg, #1a0000 0%, #2d0000 35%, #200000 65%, #0d0000 100%)",
                clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 100%, 75% 100%, 75% 82%, 25% 82%, 25% 100%, 0% 100%, 0% 10%)",
                border: "1px solid rgba(255,0,51,0.3)",
                boxShadow: "0 0 60px rgba(255,0,51,0.35), inset 0 0 80px rgba(255,0,51,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,0,51,0.05) 20px, rgba(255,0,51,0.05) 22px)",
                }}
              />

              {/* Center zip */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  background: "linear-gradient(180deg, rgba(255,0,51,0.9) 0%, rgba(255,0,51,0.2) 100%)",
                  transform: "translateX(-50%)",
                }}
              />

              {/* Three-stripe shoulders */}
              {[0, 1].map((side) => (
                <div
                  key={side}
                  style={{
                    position: "absolute",
                    top: "14px",
                    ...(side === 0 ? { left: "14px" } : { right: "14px" }),
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {[34, 26, 18].map((w, j) => (
                    <div
                      key={j}
                      style={{
                        width: `${w}px`,
                        height: "2.5px",
                        background: `rgba(255,0,51,${0.8 - j * 0.15})`,
                      }}
                    />
                  ))}
                </div>
              ))}

              {/* Custom name display area */}
              <div
                onClick={() => {
                  setIsEditing(true);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                className="absolute flex flex-col items-center justify-center cursor-text"
                style={{
                  top: "28%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  textAlign: "center",
                }}
              >
                {/* Dashed edit border */}
                <motion.div
                  animate={{
                    borderColor: isEditing
                      ? ["rgba(255,0,51,0.8)", "rgba(255,0,51,0.4)", "rgba(255,0,51,0.8)"]
                      : "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 1.2, repeat: isEditing ? Infinity : 0 }}
                  className="w-full py-2 px-3"
                  style={{ border: "1px dashed rgba(255,255,255,0.15)" }}
                >
                  {isEditing ? (
                    <input
                      ref={inputRef}
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value.toUpperCase().slice(0, 14))}
                      onBlur={() => setIsEditing(false)}
                      onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                      maxLength={14}
                      placeholder="TYPE YOUR NAME"
                      className="name-input font-black tracking-widest uppercase"
                      style={{
                        fontSize: customName.length > 8 ? "16px" : "20px",
                        letterSpacing: "0.2em",
                        color: "#FF0033",
                        textShadow: "0 0 12px rgba(255,0,51,0.7)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: displayName.length > 8 ? "16px" : "20px",
                        fontWeight: 900,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: customName ? "#FF0033" : "rgba(255,255,255,0.25)",
                        textShadow: customName ? "0 0 12px rgba(255,0,51,0.7)" : "none",
                        textAlign: "center",
                      }}
                    >
                      {displayName}
                    </div>
                  )}
                </motion.div>
                {!isEditing && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <Edit3 size={9} style={{ color: "rgba(255,255,255,0.25)" }} />
                    <span
                      className="font-mono tracking-widest"
                      style={{ fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em" }}
                    >
                      CLICK TO EDIT
                    </span>
                  </div>
                )}
              </div>

              {/* Chile 20 sub-label */}
              <div
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.4em",
                  color: "rgba(255,0,51,0.5)",
                  textTransform: "uppercase",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                CHILE 20 · SS2026
              </div>

              {/* Pockets */}
              {[0, 1].map((side) => (
                <div
                  key={side}
                  style={{
                    position: "absolute",
                    bottom: "90px",
                    ...(side === 0 ? { left: "18px" } : { right: "18px" }),
                    width: "56px",
                    height: "38px",
                    border: "1px solid rgba(255,0,51,0.25)",
                  }}
                />
              ))}

              {/* Corner code */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  fontSize: "8px",
                  fontFamily: "monospace",
                  letterSpacing: "0.25em",
                  color: "rgba(255,0,51,0.4)",
                }}
              >
                CL20-RED
              </div>
            </div>
          </motion.div>

          {/* Right panel: controls */}
          <div className="flex flex-col gap-6 max-w-sm w-full">
            {/* Name hint */}
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="text-white/40 font-mono text-[9px] tracking-[0.4em] uppercase mb-2">
                PERSONALIZATION
              </div>
              <div className="text-white text-sm tracking-widest font-bold uppercase">
                {customName || "—"}
              </div>
              <div className="text-white/20 font-mono text-[9px] mt-1">
                {customName.length}/14 characters used
              </div>
              <div
                className="mt-3"
                style={{
                  height: "2px",
                  background: `linear-gradient(90deg, #FF0033 ${(customName.length / 14) * 100}%, rgba(255,255,255,0.1) ${(customName.length / 14) * 100}%)`,
                }}
              />
            </div>

            {/* Product details */}
            <div className="flex flex-col gap-3">
              {[
                ["Edition", "CRIMSON DROP"],
                ["Code", "CL20-RED-SS26"],
                ["Material", "Heat-reactive shell"],
                ["Availability", "2,000 units worldwide"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">{label}</span>
                  <span className="text-white text-[11px] font-bold tracking-wider">{value}</span>
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
              <span className="text-white/30 font-mono text-xs tracking-widest">USD · INCL. TAX</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,0,51,0.6)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4 font-black text-sm tracking-[0.25em] uppercase transition-all"
                style={{
                  background: added ? "#00cc44" : "#FF0033",
                  boxShadow: added ? "0 0 30px rgba(0,204,68,0.5)" : "0 0 24px rgba(255,0,51,0.4)",
                  transition: "background 0.35s, box-shadow 0.35s",
                }}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    ADDED TO CART
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    ADD TO CART
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4 font-bold text-sm tracking-[0.25em] uppercase text-white/70 hover:text-white transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Share2 size={14} />
                SHARE YOUR DESIGN
              </motion.button>
            </div>

            {/* Fine print */}
            <p className="text-white/20 font-mono text-[9px] tracking-widest leading-relaxed">
              Free shipping on orders over $200. Personalization takes 3–5 business days.
              Limited to one personalized unit per customer.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
