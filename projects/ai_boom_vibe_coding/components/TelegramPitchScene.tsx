import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const TelegramPitchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle floating animation
  const floatY = Math.sin(frame / 20) * 6;
  const qrScale = spring({ frame, fps, config: { damping: 12, mass: 0.6, stiffness: 120 } });

  // Laser scanner effect line
  const laserY = (frame * 4) % 240;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* STOCK VIDEO: Futuristic digital technology interface */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Video
          src="kino:acd6a6ea-dbec-44d9-a5b1-f8e9c4a0b153"
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.88,
            transform: `scale(${interpolate(frame, [0, 980], [1.0, 1.07])})`,
          }}
        />
      </div>

      <BackgroundGrid accentColor="#22c55e" />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(frame, [0, 20, 950, 980], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 30,
            background: "rgba(34, 197, 94, 0.2)",
            border: "1.5px solid rgba(34, 197, 94, 0.6)",
            color: "#4ade80",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 32,
            boxShadow: "0 0 25px rgba(34, 197, 94, 0.3)",
          }}
        >
          ПОЛЕЗНЫЙ МАТЕРИАЛ В ЗАКРЕПЕ КАНАЛА
        </div>

        <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
          {/* Document Preview Card */}
          <div
            style={{
              width: 580,
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.92) 100%)",
              border: "2px solid rgba(56, 189, 248, 0.5)",
              borderRadius: 24,
              padding: 40,
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(20px)",
              transform: `translateY(${floatY}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 36 }}>📘</span>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff" }}>
                «Библия Вайбкодинга»
              </div>
            </div>
            <p style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.6 }}>
              Полный чек-лист архитектуры, серверной валидации и защиты API-ключей, чтобы не терять базы данных и деньги на токенах.
            </p>
            <div style={{ marginTop: 24, padding: "12px 20px", background: "rgba(56, 189, 248, 0.15)", borderRadius: 14, color: "#38bdf8", fontSize: 18, fontWeight: 700 }}>
              ✓ Бесплатно в закрепе Telegram-канала «AI Будда»
            </div>
          </div>

          {/* Real QR Card with Laser Scan Animation */}
          <div
            style={{
              width: 480,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${qrScale}) translateY(${-floatY}px)`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 260,
                height: 280,
                marginBottom: 24,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(34, 197, 94, 0.35), 0 0 0 3px rgba(34, 197, 94, 0.6)",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src="kino:e895e6ff-ffb9-4517-b7f2-f557228f34de"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />

              {/* Glowing Green Scanning Laser Beam */}
              <div
                style={{
                  position: "absolute",
                  top: laserY,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "linear-gradient(90deg, transparent 0%, #22c55e 50%, transparent 100%)",
                  boxShadow: "0 0 12px #22c55e",
                }}
              />
            </div>

            <div style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginBottom: 8 }}>
              Telegram-канал «AI Будда»
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#4ade80", marginBottom: 8, letterSpacing: 1 }}>
              @BUDDAH_AI
            </div>
            <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.5 }}>
              Наведите камеру смартфона или перейдите по ссылке в описании!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
