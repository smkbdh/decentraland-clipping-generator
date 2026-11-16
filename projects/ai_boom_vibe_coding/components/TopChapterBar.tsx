import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const TopChapterBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const currentTimeSec = frame / fps;

  // Chapter boundaries in seconds:
  // 0 - 79.5: Introduction & Myth
  // 79.5 - 93.34: Intro Video (hidden)
  // 93.34 - 221.24: Part 1 (Gold Rush & Token Trap)
  // 221.24 - 337.04: Part 2 (Security & Rogue Agent)
  // 337.04 - 369.94: Free Material (Vibe Coding Bible)
  // 369.94 - 444.44: Part 3 (Klarna & Modern CRM)
  // 444.44 - 536.5: Part 4 (5 Rules & GEO)

  let chapterNum = "01";
  let chapterTitle = "МИФ: «ПРОГРАММИСТЫ БОЛЬШЕ НЕ НУЖНЫ»";
  let chapterColor = "#6366f1";

  if (currentTimeSec >= 79.5 && currentTimeSec < 93.34) {
    // Hidden during intro video
    return null;
  } else if (currentTimeSec >= 93.34 && currentTimeSec < 221.24) {
    chapterNum = "02";
    chapterTitle = "ЗОЛОТАЯ ЛИХОРАДКА И «ЛОВУШКА ТОКЕНОВ»";
    chapterColor = "#3b82f6";
  } else if (currentTimeSec >= 221.24 && currentTimeSec < 337.04) {
    chapterNum = "03";
    chapterTitle = "ДЫРЫ В ЗАЩИТЕ И БУНТ ИИ-АГЕНТА";
    chapterColor = "#ef4444";
  } else if (currentTimeSec >= 337.04 && currentTimeSec < 369.94) {
    chapterNum = "04";
    chapterTitle = "МАТЕРИАЛ // «БИБЛИЯ ВАЙБКОДИНГА»";
    chapterColor = "#22c55e";
  } else if (currentTimeSec >= 369.94 && currentTimeSec < 444.44) {
    chapterNum = "05";
    chapterTitle = "КЕЙС KLARNA И СОВРЕМЕННЫЙ CRM";
    chapterColor = "#06b6d4";
  } else if (currentTimeSec >= 444.44) {
    chapterNum = "06";
    chapterTitle = "5 ПРАВИЛ AGENTIC ENGINEERING & GEO";
    chapterColor = "#a855f7";
  }

  // Shimmer Windows: active when a chapter completes and switches
  const SHIMMER_WINDOWS = [
    { start: 77.8, end: 79.5 },    // Hook completing
    { start: 93.34, end: 95.0 },   // Act 1 starting
    { start: 219.74, end: 222.74 },// Act 1 completing & Act 2 transition
    { start: 335.54, end: 338.54 },// Act 2 completing & Bible pitch transition
    { start: 368.44, end: 371.44 },// Bible pitch completing & Act 3 transition
    { start: 442.94, end: 445.94 },// Act 3 completing & Act 4 transition
    { start: 534.5, end: 536.5 },  // Final completion
  ];

  let shimmerActive = false;
  let shimmerPercent = -120;
  let shimmerOpacity = 0;

  for (const win of SHIMMER_WINDOWS) {
    if (currentTimeSec >= win.start && currentTimeSec <= win.end) {
      shimmerActive = true;
      const progress = (currentTimeSec - win.start) / (win.end - win.start);
      shimmerPercent = interpolate(progress, [0, 1], [-120, 240]);
      shimmerOpacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
      break;
    }
  }

  const progressPercent = (frame / durationInFrames) * 100;

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 50,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "8px 20px",
        borderRadius: 16,
        backgroundColor: "rgba(15, 23, 42, 0.78)",
        backdropFilter: "blur(16px)",
        border: shimmerActive
          ? `1px solid rgba(255, 255, 255, 0.4)`
          : "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: shimmerActive
          ? `0 10px 25px rgba(0, 0, 0, 0.4), 0 0 25px ${chapterColor}60, inset 0 0 15px ${chapterColor}30`
          : "0 10px 25px rgba(0, 0, 0, 0.4)",
        overflow: "hidden",
        transition: "border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Chapter Number Badge */}
      <div
        style={{
          padding: "3px 10px",
          borderRadius: 8,
          backgroundColor: `${chapterColor}25`,
          border: `1px solid ${chapterColor}80`,
          color: chapterColor,
          fontFamily: "monospace",
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: 1,
          position: "relative",
          zIndex: 2,
        }}
      >
        {chapterNum}
      </div>

      {/* Chapter Title */}
      <span
        style={{
          color: "#f1f5f9",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          position: "relative",
          zIndex: 2,
        }}
      >
        {chapterTitle}
      </span>

      {/* Mini Progress Bar */}
      <div
        style={{
          width: 80,
          height: 4,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          marginLeft: 8,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            backgroundColor: chapterColor,
            boxShadow: `0 0 8px ${chapterColor}`,
          }}
        />
        {/* Shimmer on progress bar */}
        {shimmerActive && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
              transform: `translateX(${shimmerPercent}%)`,
              opacity: shimmerOpacity * 0.9,
            }}
          />
        )}
      </div>

      {/* Shimmer Light Sweep across the entire pill */}
      {shimmerActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "55%",
            height: "100%",
            background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 20%, ${chapterColor}bb 45%, #ffffff 50%, ${chapterColor}bb 55%, transparent 100%)`,
            transform: `translateX(${shimmerPercent}%) skewX(-20deg)`,
            opacity: shimmerOpacity,
            pointerEvents: "none",
            mixBlendMode: "screen",
            zIndex: 3,
          }}
        />
      )}
    </div>
  );
};
