import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const TopChapterBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const currentTimeSec = frame / fps;

  // Chapter boundaries:
  // 0 - 100.8s: Act 1 (Bots vs Clients)
  // 100.8s - 184.5s: Act 2 (145M Sessions Research)
  // 184.5s - 304.5s: Act 3 (SEO vs GEO Architecture)
  // 304.5s - 425.0s: Act 4 (Case 1: BenPhuketCarRent)
  // 425.0s - 516.5s: Act 5 (Case 2 & 3: PhuketStayPro Dario lead & Chatterbox)
  // 516.5s - 630.0s: Act 6 (4 Actionable Rules for Business)
  // 630.0s - 651.68s: Outro (Summary & Real Deals)

  let chapterNum = "01";
  let chapterTitle = "БОТЫ ИЛИ КЛИЕНТЫ? ХАЙП И РЕАЛЬНОСТЬ GEO";
  let chapterColor = "#38bdf8";

  if (currentTimeSec >= 100.8 && currentTimeSec < 184.5) {
    chapterNum = "02";
    chapterTitle = "ИССЛЕДОВАНИЕ: 145 МЛН СЕССИЙ И КОНВЕРСИИ";
    chapterColor = "#f59e0b";
  } else if (currentTimeSec >= 184.5 && currentTimeSec < 304.5) {
    chapterNum = "03";
    chapterTitle = "АРХИТЕКТУРА GEO: RAG, ВЕКТОРЫ И QUERY FAN-OUT";
    chapterColor = "#8b5cf6";
  } else if (currentTimeSec >= 304.5 && currentTimeSec < 425.0) {
    chapterNum = "04";
    chapterTitle = "КЕЙС 1: BENPHUKETCARRENT · ЛИДЫ И БРОНИ ИЗ CHATGPT";
    chapterColor = "#10b981";
  } else if (currentTimeSec >= 425.0 && currentTimeSec < 516.5) {
    chapterNum = "05";
    chapterTitle = "КЕЙС 2 И 3: PHUKETSTAYPRO (ЛИД НА 4 МЛН БАТ) И CHATTERBOX";
    chapterColor = "#ec4899";
  } else if (currentTimeSec >= 516.5 && currentTimeSec < 630.0) {
    chapterNum = "06";
    chapterTitle = "ИНЖЕНЕРНЫЙ ЧЕКЛИСТ: 4 ПРАВИЛА ДЛЯ БИЗНЕСА";
    chapterColor = "#06b6d4";
  } else if (currentTimeSec >= 630.0) {
    chapterNum = "07";
    chapterTitle = "ИТОГ: СЧИТАЙТЕ СДЕЛКИ, А НЕ ОХВАТЫ";
    chapterColor = "#a3e635";
  }

  // Shimmer Windows: active when a chapter completes and switches
  const SHIMMER_WINDOWS = [
    { start: 99.0, end: 102.5 },
    { start: 183.0, end: 186.5 },
    { start: 303.0, end: 306.5 },
    { start: 423.5, end: 427.0 },
    { start: 515.0, end: 518.5 },
    { start: 628.5, end: 632.0 },
  ];

  let shimmerActive = false;
  let shimmerPercent = -120;

  for (const win of SHIMMER_WINDOWS) {
    if (currentTimeSec >= win.start && currentTimeSec <= win.end) {
      shimmerActive = true;
      shimmerPercent = interpolate(
        currentTimeSec,
        [win.start, win.end],
        [-100, 220],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      break;
    }
  }

  const progressPercent = Math.min(100, (frame / durationInFrames) * 100);

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 50,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {/* Chapter Indicator Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "6px 18px",
          borderRadius: 20,
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${chapterColor}44`,
          boxShadow: `0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px ${chapterColor}22`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer Light Wave on Chapter Switch */}
        {shimmerActive && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "45%",
              left: `${shimmerPercent}%`,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%)",
              transform: "skewX(-25deg)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: `${chapterColor}22`,
            border: `1.5px solid ${chapterColor}`,
            fontSize: 11,
            fontWeight: 900,
            color: chapterColor,
          }}
        >
          {chapterNum}
        </div>

        <span
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: "#f8fafc",
            fontFamily: "Bahnschrift, Segoe UI, sans-serif",
          }}
        >
          {chapterTitle}
        </span>
      </div>

      {/* Progress mini-bar */}
      <div
        style={{
          width: 320,
          height: 3,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: chapterColor,
            boxShadow: `0 0 8px ${chapterColor}`,
            transition: "width 0.1s linear, background-color 0.4s ease",
          }}
        />
        {shimmerActive && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "35%",
              left: `${shimmerPercent}%`,
              background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
};
