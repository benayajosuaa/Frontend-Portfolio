"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Caveat, Cormorant_Garamond } from "next/font/google";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const handwritingFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
});

type DragMode = "wrapper" | "note" | null;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export default function DuduPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [wrapperProgress, setWrapperProgress] = useState(0);
  const [noteProgress, setNoteProgress] = useState(0);
  const [dragMode, setDragMode] = useState<DragMode>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [particleBurst, setParticleBurst] = useState(0);

  const gestureRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startProgress: 0,
  });
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasPlayedWrapperSound = useRef(false);
  const hasPlayedNoteSound = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wrapperOpened = wrapperProgress >= 0.999;
  const noteOpened = noteProgress >= 0.999;

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 16;
        const distance = 34 + (index % 5) * 14;
        return {
          id: index,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 12,
          delay: (index % 4) * 0.045,
          scale: 0.7 + (index % 3) * 0.22,
        };
      }),
    [],
  );

  const wrapperInstruction = wrapperOpened
    ? "Tarik sticky note perlahan ke atas atau ke kanan."
    : "Swipe garis putus-putus ke kanan atau ke atas untuk membuka bungkus.";

  useEffect(() => {
    if (dragMode === null) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== gestureRef.current.pointerId) {
        return;
      }

      const deltaX = event.clientX - gestureRef.current.startX;
      const deltaY = event.clientY - gestureRef.current.startY;
      const positiveX = Math.max(0, deltaX);
      const positiveUp = Math.max(0, -deltaY);
      const progressDelta = Math.max(positiveX / 200, positiveUp / 180);

      if (dragMode === "wrapper") {
        setWrapperProgress(clamp(gestureRef.current.startProgress + progressDelta));
      } else if (dragMode === "note") {
        setNoteProgress(clamp(gestureRef.current.startProgress + progressDelta));
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId !== gestureRef.current.pointerId) {
        return;
      }

      if (dragMode === "wrapper") {
        setWrapperProgress((current) => {
          const next = current > 0.4 ? 1 : 0;
          if (next === 1 && !hasPlayedWrapperSound.current) {
            hasPlayedWrapperSound.current = true;
            playSoftSound(audioContextRef, audioEnabled, "tear");
            vibrateDevice([16, 18, 20]);
          }
          return next;
        });
      }

      if (dragMode === "note") {
        setNoteProgress((current) => {
          const next = current > 0.48 ? 1 : 0;
          if (next === 1 && !hasPlayedNoteSound.current) {
            hasPlayedNoteSound.current = true;
            setParticleBurst((value) => value + 1);
            playSoftSound(audioContextRef, audioEnabled, "paper");
            vibrateDevice([12, 30, 12]);
          }
          return next;
        });
      }

      setDragMode(null);
      gestureRef.current.pointerId = -1;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [audioEnabled, dragMode]);

  const startWrapperDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (wrapperOpened) {
      return;
    }

    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startProgress: wrapperProgress,
    };
    setDragMode("wrapper");
  };

  const startNoteDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!wrapperOpened) {
      return;
    }

    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startProgress: noteProgress,
    };
    setDragMode("note");
  };

  const restartScene = () => {
    setWrapperProgress(0);
    setNoteProgress(0);
    setDragMode(null);
    setParticleBurst(0);
    hasPlayedWrapperSound.current = false;
    hasPlayedNoteSound.current = false;
  };

  const wrapperStretch = 1 + wrapperProgress * 0.045;
  const topLift = -16 - wrapperProgress * 118;
  const bottomDrop = 16 + wrapperProgress * 106;
  const contentLift = 34 - wrapperProgress * 34;
  const chocolateLift = 28 - wrapperProgress * 28;
  const noteLift = wrapperOpened
    ? 2 - noteProgress * 156
    : 72 - wrapperProgress * 18;
  const noteRotate = wrapperOpened
    ? -4 - noteProgress * 8
    : -8 + wrapperProgress * 4;
  const glowOpacity = clamp(noteProgress * 1.25 - 0.2);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4e7d7] text-[#4b2f23]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(180,124,72,0.18),_transparent_30%),linear-gradient(180deg,_#fbf4eb_0%,_#f2dfc8_52%,_#ecd4bc_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(120,84,52,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(120,84,52,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute right-3 top-3 h-24 w-24 rounded-full bg-white/30 blur-3xl sm:right-14 sm:top-10 sm:h-40 sm:w-40" />
        <div className="pointer-events-none absolute bottom-10 left-2 h-24 w-24 rounded-full bg-[#d8b18c]/35 blur-3xl sm:left-14 sm:bottom-16 sm:h-44 sm:w-44" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex w-full flex-col items-center"
        >
          <div className="mb-4 flex w-full max-w-4xl flex-col gap-4 px-1 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div className={`${displayFont.className} max-w-xl text-center sm:text-left`}>
              <p className="text-2xl uppercase tracking-[0.34em] text-[#86614b]/80 sm:text-xl sm:tracking-[0.42em]">
                dari kamar320.c0m
              </p>
              
            </div>

       
          </div>

          <div className="relative mt-4 flex w-full flex-col items-center justify-center sm:mt-10">
            <div className="relative w-full max-w-[20.5rem] sm:max-w-[31rem]">
              <motion.div
                animate={{
                  scaleX: wrapperStretch,
                  rotate: wrapperProgress * 0.8,
                  y: wrapperOpened ? -4 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: dragMode === "wrapper" ? 260 : 180,
                  damping: 24,
                }}
                className="relative aspect-[0.7] w-full sm:aspect-[0.76]"
              >
                <div className="absolute inset-[7%_6%_12%_6%] overflow-visible rounded-[1.9rem] bg-[linear-gradient(180deg,#b52045_0%,#971b42_26%,#6e173a_62%,#451025_100%)] shadow-[0_28px_54px_rgba(77,46,29,0.24)] sm:inset-[7%_8%_12%_8%] sm:rounded-[2.3rem] sm:shadow-[0_44px_85px_rgba(77,46,29,0.24)]">
                  <div className="absolute inset-0 rounded-[2.3rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,207,150,0.1),transparent_24%)]" />
                  <div className="absolute inset-x-[12%] top-[8%] h-[22%] rounded-full bg-white/8 blur-2xl" />
                  <div className="absolute inset-y-0 left-[16%] w-[9%] bg-white/8 blur-2xl" />
                  <div className="absolute inset-y-0 right-[14%] w-[11%] bg-black/18 blur-2xl" />
                  <div className="absolute inset-0 rounded-[2.3rem] ring-1 ring-white/10 ring-inset" />

                  <motion.div
                    animate={{
                      y: contentLift,
                      opacity: wrapperOpened
                        ? 1
                        : clamp(wrapperProgress * 1.7 - 0.6, 0, 1),
                      scale: 0.96 + wrapperProgress * 0.04,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    className="absolute inset-[15%_9%_16%_9%] flex flex-col items-center justify-end sm:inset-[15%_12%_16%_12%]"
                  >
                    <motion.div
                      animate={{
                        y: noteLift,
                        rotate: noteRotate,
                        scale: 0.92 + noteProgress * 0.08,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 190,
                        damping: 18,
                      }}
                      className="absolute left-1/2 top-0 z-20 w-[88%] max-w-[18.5rem] -translate-x-1/2 sm:w-[76%] sm:max-w-[21rem]"
                    >
                      <button
                        type="button"
                        onPointerDown={startNoteDrag}
                        disabled={!wrapperOpened}
                        className="group relative grid aspect-[0.72] w-full grid-rows-[auto_1fr] overflow-hidden touch-none rounded-[1.3rem] bg-[#f7de67] px-3 pb-3 pt-3 text-left shadow-[0_18px_30px_rgba(98,75,21,0.24)] outline-none ring-1 ring-[#c09d24]/16 sm:aspect-[0.7] sm:rounded-[1.5rem] sm:px-4 sm:pb-4 sm:pt-3.5 sm:shadow-[0_20px_34px_rgba(98,75,21,0.24)]"
                        aria-label="Tarik sticky note"
                      >
                        <div className="absolute inset-x-[18%] top-2 h-5 rounded-full bg-white/35 blur-xl" />
                        <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/30 blur-lg" />
                        {!noteOpened && noteProgress < 0.04 && (
                          <div className="mb-1 flex items-center justify-between text-[0.46rem] uppercase tracking-[0.18em] text-[#8c6d08]/65 sm:mb-1.5 sm:text-[0.56rem] sm:tracking-[0.24em]">
                            <span>Swipe ke atas </span>
                          </div>
                        )}
                        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                          <div className="max-w-full text-[0.62rem] leading-[1.28] text-[#815f08]/58 sm:text-[0.74rem] sm:leading-[1.36]">
                          </div>
                          <AnimatePresence>
                            {noteProgress > 0.04 && (
                              <motion.div
                                key="message"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.45 }}
                                className="relative min-h-0 flex-1 overflow-hidden"
                              >
                                <div
                                  className={`${handwritingFont.className} relative h-full max-w-full text-[clamp(0.82rem,1.9vw,1.06rem)] leading-[1.08] text-[#6f4d02] sm:leading-[1.1]`}
                                  style={{
                                    clipPath: `inset(0 ${100 - noteProgress * 100}% 0 0)`,
                                    textShadow: `0 0 20px rgba(255, 244, 184, ${glowOpacity * 0.34})`,
                                  }}
                                >
                                  Selamat Ulang Tahun kaks <br/>
                                  Estafin Meila K. Drajat
                                  <br />
                                  <br />
                                  ...
                                  <br />
                                  <br />
                                  "Bersukacitalah senantiasa. Tetaplah berdoa. Mengucap syukurlah dalam segala hal, 
                                  sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu."
                                  <br />
                                  -1 Tesalonika 5:16-18
                                  <br /><br />
                                  SEMANGATT 
                                  <br /><br />
                                  ben & kenny -kamar320.com
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>

                      <AnimatePresence>
                        {noteOpened && (
                          <motion.div
                            key={`particles-${particleBurst}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pointer-events-none absolute inset-0"
                          >
                            {particles.map((particle) => (
                              <span
                                key={`${particleBurst}-${particle.id}`}
                                className="particle"
                                style={
                                  {
                                    "--particle-x": `${particle.x}px`,
                                    "--particle-y": `${particle.y}px`,
                                    "--particle-delay": `${particle.delay}s`,
                                    "--particle-scale": particle.scale,
                                  } as React.CSSProperties
                                }
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      animate={{
                        y: chocolateLift,
                        opacity: 0.3 + wrapperProgress * 0.7,
                        scale: 0.9 + wrapperProgress * 0.1,
                      }}
                      transition={{ type: "spring", stiffness: 170, damping: 20 }}
                      className="relative mt-auto flex w-full items-end justify-center pb-[2%] sm:pb-[1%]"
                    >
                      <div className="relative h-[11.2rem] w-[94%] max-w-[16.2rem] rounded-[1.25rem] border border-[#4d2816]/30 bg-[linear-gradient(180deg,#8e5635_0%,#704124_46%,#432414_100%)] shadow-[0_22px_34px_rgba(45,22,12,0.35)] sm:h-[14.5rem] sm:max-w-[20.5rem] sm:rounded-[1.55rem] sm:shadow-[0_28px_44px_rgba(45,22,12,0.35)]">
                        <div className="absolute inset-[6.5%] grid grid-cols-3 gap-2 sm:gap-2.5">
                          {Array.from({ length: 12 }).map((_, index) => (
                            <div
                              key={index}
                              className="rounded-[0.72rem] border border-white/10 bg-[linear-gradient(180deg,rgba(162,108,76,0.4),rgba(74,42,24,0.12))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                            />
                          ))}
                        </div>
                        <div className="absolute inset-x-[12%] top-4 h-5 rounded-full bg-white/16 blur-xl" />
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: topLift,
                      rotateX: wrapperProgress * 18,
                      scaleX: 1 + wrapperProgress * 0.015,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: dragMode === "wrapper" ? 260 : 180,
                      damping: 24,
                    }}
                    className="absolute inset-x-0 top-0 h-[52%] origin-top"
                    style={{
                      clipPath:
                        "polygon(0 0,100% 0,100% 72%,82% 69%,68% 74%,54% 69%,40% 74%,24% 69%,10% 73%,0 69%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#d62b4e_0%,#b61f45_34%,#781838_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_34%),linear-gradient(90deg,transparent,rgba(255,239,221,0.12),transparent)]" />
                    <div className="absolute inset-x-[20%] bottom-3 h-2 rounded-full bg-white/22 blur-md" />
                    <div className="absolute inset-x-[14%] top-[17%] rounded-[1.25rem] border border-[#ffd7b0]/16 bg-[#f5d4ac]/10 px-3 py-4 text-center text-[#f7ead8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-[1.8rem] sm:px-5 sm:py-7">
                      <div className={`${displayFont.className} text-sm font-semibold tracking-[0.26em] text-[#ffe8c6] drop-shadow-[0_1px_10px_rgba(95,21,41,0.35)] sm:text-xl sm:tracking-[0.34em]`}>
                        CHOCOUP
                      </div>
                      <div className="mt-1 text-[0.42rem] uppercase tracking-[0.28em] text-[#ffd8bb] sm:mt-2 sm:text-[0.62rem] sm:tracking-[0.44em]">
                        milk chocolate
                      </div>
                    </div>
                    <div className="absolute left-[7%] top-[12%] rounded-full border border-[#ffd27d]/30 bg-[#f6c95e]/14 px-2 py-1 text-[0.42rem] font-semibold uppercase tracking-[0.18em] text-[#ffe7a7] shadow-[0_8px_14px_rgba(73,18,34,0.18)] sm:left-[8%] sm:top-[14%] sm:px-3 sm:text-[0.56rem] sm:tracking-[0.28em]">
                      #tetap_berarti
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: bottomDrop,
                      rotateX: -wrapperProgress * 12,
                      scaleX: 1 + wrapperProgress * 0.02,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: dragMode === "wrapper" ? 260 : 180,
                      damping: 24,
                    }}
                    className="absolute inset-x-0 bottom-0 h-[52%] origin-bottom"
                    style={{
                      clipPath:
                        "polygon(0 31%,12% 27%,28% 32%,44% 28%,58% 33%,74% 28%,88% 33%,100% 29%,100% 100%,0 100%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#af1f41_0%,#89183a_42%,#54132d_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_32%),linear-gradient(90deg,rgba(255,244,221,0.08),transparent_22%,transparent_78%,rgba(0,0,0,0.18))]" />
                    <div className="absolute inset-x-[13%] top-[22%] flex items-center justify-between text-[0.42rem] uppercase tracking-[0.18em] text-[#ffd7bb] sm:inset-x-[16%] sm:top-[24%] sm:text-[0.6rem] sm:tracking-[0.34em]">
                      <span>classic treat</span>
                      <span>special note</span>
                    </div>
                    <div className="absolute inset-x-[13%] bottom-[18%] h-[1px] bg-white/12" />
                  </motion.div>

                  {!wrapperOpened && (
                    <motion.button
                      type="button"
                      onPointerDown={startWrapperDrag}
                      aria-label="Swipe to tear wrapper"
                      animate={{
                        scaleX: 1 + wrapperProgress * 0.06,
                        opacity: 1 - wrapperProgress * 0.74,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      className="absolute inset-x-[8%] top-1/2 z-30 flex h-12 -translate-y-1/2 touch-none items-center justify-center rounded-full bg-transparent outline-none sm:inset-x-[10%]"
                    >
                      <div className="relative flex w-full items-center justify-center">
                        <div className="absolute inset-x-0 h-[2px] border-t-2 border-dashed border-[#e8cdb6]/95" />
                        <div className="absolute inset-x-[18%] h-4 rounded-full bg-white/14 blur-md" />
                        <div className="relative mt-7 rounded-full border border-white/20 bg-white/8 px-2.5 py-1 text-[0.46rem] uppercase tracking-[0.24em] text-[#f9e8da] shadow-[0_8px_16px_rgba(44,21,14,0.14)] sm:mt-10 sm:px-3 sm:text-[0.55rem] sm:tracking-[0.38em]">
                          swipe here
                        </div>
                      </div>
                    </motion.button>
                  )}

                  <motion.div
                    aria-hidden="true"
                    animate={{
                      opacity: wrapperProgress * 0.72,
                      scaleY: 0.8 + wrapperProgress * 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-x-[11%] top-1/2 z-20 h-7 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,248,224,0.82),rgba(255,255,255,0))] blur-md"
                  />
                </div>

                <div className="pointer-events-none absolute inset-x-[12%] bottom-[3.5%] h-10 rounded-full bg-[#72462d]/28 blur-2xl sm:inset-x-[14%] sm:h-12" />
              </motion.div>
            </div>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 max-w-[18rem] text-center text-xs leading-relaxed text-[#7a5640] sm:mt-8 sm:max-w-md sm:text-base"
            >
              {wrapperInstruction}
            </motion.p>

            <AnimatePresence>
              {noteOpened && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.45 }}
                  className={`${displayFont.className} mt-4 rounded-full border border-white/55 bg-white/60 px-4 py-2 text-[0.72rem] tracking-[0.12em] text-[#7b5842] shadow-[0_14px_30px_rgba(115,83,57,0.12)] backdrop-blur sm:mt-5 sm:px-5 sm:text-sm sm:tracking-[0.18em]`}
                >
                  Little boost unlocked.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {isMounted ? (
        <style jsx>{`
          .particle {
            position: absolute;
            left: calc(50% - 0.3rem);
            top: 48%;
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 999px;
            background:
              radial-gradient(circle, rgba(255, 252, 219, 1) 0%, rgba(255, 233, 154, 0.95) 45%, rgba(255, 211, 102, 0) 100%);
            box-shadow: 0 0 18px rgba(255, 229, 145, 0.5);
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(var(--particle-scale));
            animation: sparkle-burst 1.35s ease-out forwards;
            animation-delay: var(--particle-delay);
          }

          @keyframes sparkle-burst {
            0% {
              opacity: 0;
              transform: translate3d(0, 0, 0) scale(0.45);
            }

            18% {
              opacity: 1;
            }

            100% {
              opacity: 0;
              transform: translate3d(var(--particle-x), var(--particle-y), 0)
                scale(calc(var(--particle-scale) * 1.12));
            }
          }
        `}</style>
      ) : null}
    </main>
  );
}

function vibrateDevice(pattern: number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function playSoftSound(
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  enabled: boolean,
  type: "tear" | "paper",
) {
  if (!enabled || typeof window === "undefined") {
    return;
  }

  const AudioContextClass =
    window.AudioContext ||
    (
      window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }
    ).webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const context = audioContextRef.current ?? new AudioContextClass();
  audioContextRef.current = context;

  if (context.state === "suspended") {
    void context.resume();
  }

  const now = context.currentTime;
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  const oscillator = context.createOscillator();

  gain.connect(context.destination);
  filter.connect(gain);
  oscillator.connect(filter);

  if (type === "tear") {
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(420, now);
    oscillator.frequency.exponentialRampToValueAtTime(170, now + 0.18);
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(820, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.012, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    oscillator.start(now);
    oscillator.stop(now + 0.24);
    return;
  }

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(260, now);
  oscillator.frequency.exponentialRampToValueAtTime(520, now + 0.11);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(920, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  oscillator.start(now);
  oscillator.stop(now + 0.16);
}
