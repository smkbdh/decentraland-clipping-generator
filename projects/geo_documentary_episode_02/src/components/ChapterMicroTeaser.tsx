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
    startSec: 95.7,
    durationSec: 1.5,
    chapter: "ГЛАВА 2 • ИССЛЕДОВАНИЕ 145 МЛН СЕССИЙ",
    question: "Почему до 99% трафика из нейросетей в отчётах — это боты-парсильщики, а не покупатели?",
    color: "#f59e0b",
  },
  {
    startSec: 177.6,
    durationSec: 1.5,
    chapter: "ГЛАВА 3 • АРХИТЕКТУРА GEO",
    question: "Как устроен генеративный ответ: почему спам словом GEO проиграет точной структуре?",
    color: "#8b5cf6",
  },
  {
    startSec: 286.6,
    durationSec: 1.5,
    chapter: "ГЛАВА 4 • ПРАКТИЧЕСКИЙ КЕЙС · АВТО",
    question: "Как аренда авто на Пхукете получила заявки с меткой ChatGPT и забила весь автопарк?",
    color: "#10b981",
  },
  {
    startSec: 398.4,
    durationSec: 1.5,
    chapter: "ГЛАВА 5 • НЕДВИЖИМОСТЬ И ШКОЛА",
    question: "Лид из Сингапура на покупку за 4 млн бат: реальный след рекомендации ChatGPT",
    color: "#ec4899",
  },
  {
    startSec: 490.8,
    durationSec: 1.5,
    chapter: "ГЛАВА 6 • ИНЖЕНЕРНЫЙ ЧЕКЛИСТ",
    question: "Что делать бизнесу: покупать «секретный GEO-пакет» или строить системный RAG?",
    color: "#06b6d4",
  },
];

export const ChapterMicroTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

      const scale = spring({
        frame: localFrame,
        fps,
        config: { damping: 14, stiffness: 120, mass: 0.8 },
      });

      return (<div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(5, 7, 12, 0.75)",
            backdropFilter: "blur(20px)",
            opacity,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              maxWidth: 1100,
              padding: "40px 60px",
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              borderRadius: 28,
              border: `1.5px solid ${t.color}`,
              boxShadow: `0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px ${t.color}33`,
              transform: `scale(${interpolate(scale, [0, 1], [0.92, 1.0])})`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 20,
                backgroundColor: `${t.color}22`,
                border: `1px solid ${t.color}`,
                color: t.color,
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              <span style={{ fontSize: 16 }}>⚡</span> {t.chapter}
            </div>

            <h2
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#f8fafc",
                lineHeight: 1.25,
                margin: 0,
                letterSpacing: -0.5,
                textShadow: "0 4px 16px rgba(0,0,0,0.6)",
              }}
            >
              {t.question}
            </h2>
          </div>
        </div>);
    }
  }

  return null;
};
