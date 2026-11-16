import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const TopChapterBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const currentTimeSec = frame / fps;

  // Hide TopChapterBar completely during full-screen studio intro (95.47s to 109.31s)
  if (currentTimeSec >= 95.467 && currentTimeSec < 109.307) {
    return null;
  }

  // Chapter boundaries (shifted by +13.84s intro duration for chapters 2-7):
  // 0 - 95.47s: Act 1 (Bots vs Clients)
  // [95.47s - 109.31s]: Channel Intro Video
  // 109.31s - 191.44s: Act 2 (145M Sessions Research)
  // 191.44s - 300.44s: Act 3 (SEO vs GEO Architecture)
  // 300.44s - 412.24s: Act 4 (Case 1: BenPhuketCarRent)
  // 412.24s - 504.64s: Act 5 (Case 2 & 3: PhuketStayPro Dario lead & Chatterbox)
  // 504.64s - 644.54s: Act 6 (4 Actionable Rules for Business)
  // 644.54s+: Outro (Summary & Real Deals)

  let chapterNum = "01";
  let chapterTitle = "БОТЫ ИЛИ КЛИЕНТЫ? ХАЙП И РЕАЛЬНОСТЬ GEO";
  let chapterColor = "#38bdf8";

  if (currentTimeSec >= 109.307 && currentTimeSec < 191.44) {
    chapterNum = "02";
    chapterTitle = "ИССЛЕДОВАНИЕ: 145 МЛН СЕССИЙ И КОНВЕРСИИ";
    chapterColor = "#f59e0b";
  } else if (currentTimeSec >= 191.44 && currentTimeSec < 300.44) {
    chapterNum = "03";
    chapterTitle = "АРХИТЕКТУРА GEO: RAG, ВЕКТОРЫ И QUERY FAN-OUT";
    chapterColor = "#8b5cf6";
  } else if (currentTimeSec >= 300.44 && currentTimeSec < 412.24) {
    chapterNum = "04";
    chapterTitle = "КЕЙС 1: BENPHUKETCARRENT · ЛИДЫ И БРОНИ ИЗ CHATGPT";
    chapterColor = "#10b981";
  } else if (currentTimeSec >= 412.24 && currentTimeSec < 504.64) {
    chapterNum = "05";
    chapterTitle = "КЕЙС 2 И 3: PHUKETSTAYPRO (ЛИД НА 4 МЛН БАТ) И CHATTERBOX";
    chapterColor = "#ec4899";
  } else if (currentTimeSec >= 504.64 && currentTimeSec < 644.54) {
    chapterNum = "06";
    chapterTitle = "ИНЖЕНЕРНЫЙ ЧЕКЛИСТ: 4 ПРАВИЛА ДЛЯ БИЗНЕСА";
    chapterColor = "#06b6d4";
  } else if (currentTimeSec >= 644.54) {
    chapterNum = "07";
    chapterTitle = "ИТОГ: СЧИТАЙТЕ СДЕЛКИ, А НЕ ОХВАТЫ";
    chapterColor = "#a3e635";
  }

  // Shimmer Windows: active when a chapter completes and switches
  const SHIMMER_WINDOWS = [
    { start: 108.0, end: 111.5 },
    { start: 190.0, end: 193.5 },
    { start: 299.0, end: 302.5 },
    { start: 410.5, end: 414.0 },
    { start: 503.0, end: 506.5 },
    { start: 643.0, end: 646.5 },
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
        zIndex: 100,
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
          gap: 14,
          padding: "8px 22px",
          borderRadius: 24,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
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
            width: 26,
            height: 26,
            borderRadius: "50%",
            backgroundColor: `${chapterColor}22`,
            border: `1.5px solid ${chapterColor}`,
            fontSize: 13,
            fontWeight: 900,
            color: chapterColor,
          }}
        >
          {chapterNum}
        </div>

        <span
          style={{
            fontSize: 14,
            fontWeight: 900,
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
          width: 360,
          height: 4,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: chapterColor,
            boxShadow: `0 0 10px ${chapterColor}`,
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
