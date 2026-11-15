import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

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
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
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
      </div>
    </div>
  );
};
