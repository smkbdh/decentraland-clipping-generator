import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface TeaserDef {
  startSec: number;
  durationSec: number;
  chapter: string;
  question: string;
  color: string;
}

const TEASERS: TeaserDef[] = [
  {
    startSec: 93.34,
    durationSec: 1.5,
    chapter: "АКТ 1 • ЗОЛОТАЯ ЛИХОРАДКА",
    question: "Как 63% фаундеров без опыта в коде подняли $4.7 млрд — и сожгли миллионы на токенах?",
    color: "#38bdf8",
  },
  {
    startSec: 221.24,
    durationSec: 1.5,
    chapter: "АКТ 2 • ДЫРЫ В БЕЗОПАСНОСТИ",
    question: "Почему запрет словами в промпте не спас продакшн-базу данных на 1 200 директоров?",
    color: "#ef4444",
  },
  {
    startSec: 369.94,
    durationSec: 1.5,
    chapter: "АКТ 3 • ОТРЕЗВЛЕНИЕ БИЗНЕСА",
    question: "Кейс Klarna: заменил ли ИИ 700 операторов, или людей пришлось срочно возвращать?",
    color: "#06b6d4",
  },
  {
    startSec: 444.44,
    durationSec: 1.5,
    chapter: "АКТ 4 • ПРАВИЛА ВЫЖИВАНИЯ",
    question: "5 законов агентной инженерии: как строить AI-системы, которые не рухнут завтра?",
    color: "#a855f7",
  },
];

export const ChapterMicroTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find active teaser
  for (const t of TEASERS) {
    const startFrame = Math.round(t.startSec * fps);
    const durationFrames = Math.round(t.durationSec * fps);
    const endFrame = startFrame + durationFrames;

    if (frame >= startFrame && frame < endFrame) {
      const localFrame = frame - startFrame;
      const opacity = interpolate(
        localFrame,
        [0, 6, durationFrames - 10, durationFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      const scale = interpolate(
        localFrame,
        [0, 8, durationFrames],
        [0.92, 1, 1.02],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

      return (
        <div
          style={{
            position: "absolute",
            top: 130,
            left: "50%",
            transform: `translateX(-50%) scale(${scale})`,
            zIndex: 60,
            opacity,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              padding: "20px 48px",
              borderRadius: 24,
              backgroundColor: "rgba(10, 15, 26, 0.92)",
              backdropFilter: "blur(24px)",
              border: `1.5px solid ${t.color}`,
              boxShadow: `0 20px 60px rgba(0, 0, 0, 0.85), 0 0 35px ${t.color}40`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 1300,
            }}
          >
            {/* Top Chapter Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 20px",
                borderRadius: 20,
                backgroundColor: `${t.color}25`,
                border: `1px solid ${t.color}80`,
                color: t.color,
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: t.color,
                  boxShadow: `0 0 8px ${t.color}`,
                }}
              />
              {t.chapter}
            </div>

            {/* Provocative Question */}
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: 0.5,
                lineHeight: 1.25,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {t.question}
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
};
