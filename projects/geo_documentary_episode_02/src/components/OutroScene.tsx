import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* BACKGROUND FOOTAGE - Native Kino Tech Grid Video */}
      <Sequence from={0} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("17_outro_cyber_tech.mp4")}
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#a3e635" />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px 100px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 30,
            backgroundColor: "rgba(163, 230, 53, 0.2)",
            border: "1.5px solid rgba(163, 230, 53, 0.5)",
            color: "#a3e635",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 2,
            marginBottom: 20,
          }}
        >
          ГЛАВНЫЙ ВЫВОД ВЫПУСКА
        </div>

        <h2
          style={{
            fontSize: 66,
            fontWeight: 900,
            color: "#f8fafc",
            textAlign: "center",
            lineHeight: 1.1,
            margin: "0 0 35px",
          }}
        >
          СЧИТАЙТЕ СДЕЛКИ, А НЕ ОХВАТЫ
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
            backgroundColor: "rgba(248, 250, 252, 0.98)",
            border: "1px solid rgba(226, 232, 240, 0.9)",
            borderLeft: "6px solid #84cc16",
            borderRadius: 28,
            padding: "40px 54px",
            maxWidth: 1320,
            boxShadow: `0 25px 60px rgba(0,0,0,0.7), 0 0 ${25 + 15 * Math.sin(frame / 10)}px rgba(132, 204, 22, 0.35)`,
          }}
        >
          {/* Large High-Contrast Telegram QR Code with Glowing Pulse Ring */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 240,
                height: 240,
                borderRadius: 24,
                overflow: "hidden",
                border: "3.5px solid #84cc16",
                backgroundColor: "#ffffff",
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 ${20 + 10 * Math.sin(frame / 10)}px rgba(132, 204, 22, 0.4)`,
              }}
            >
              <Img
                src={staticFile("qr_buddah.png")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 14,
                backgroundColor: "#ecfdf5",
                border: "1px solid #bbf7d0",
                color: "#15803d",
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 0.8,
              }}
            >
              📲 НАВЕДИТЕ КАМЕРУ
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", lineHeight: 1.15 }}>
              Напишите в комментариях под видео:
            </div>
            <div style={{ fontSize: 24, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
              Какой у вас сайт и что вы считаете заявкой? Разберём вашу нишу и структуру в следующем выпуске.
            </div>
            <div
              style={{
                marginTop: 6,
                padding: "16px 22px",
                borderRadius: 16,
                backgroundColor: "#f0fdf4",
                border: "1.5px solid #bbf7d0",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ fontSize: 22, color: "#15803d", fontWeight: 900 }}>
                📌 Telegram-канал: @BUDDAH_AI
              </div>
              <div style={{ fontSize: 18, color: "#166534", fontWeight: 600 }}>
                Архитектура RAG-поиска, шаблоны промптов и чеклист внедрения GEO — в закрепе канала.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
