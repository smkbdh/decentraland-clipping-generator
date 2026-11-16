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
            gap: 40,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid rgba(163, 230, 53, 0.6)",
            borderRadius: 24,
            padding: "36px 48px",
            maxWidth: 1150,
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(163, 230, 53, 0.25)",
          }}
        >
          {/* Native Kino Telegram QR Code from Episode 1 */}
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 18,
              overflow: "hidden",
              border: "2.5px solid #a3e635",
              backgroundColor: "#ffffff",
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile("qr_buddah.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#f8fafc" }}>
              Напишите в комментариях:
            </div>
            <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.45 }}>
              Какой у вас сайт и что вы считаете заявкой? Разберём вашу нишу в следующем выпуске.
            </div>
            <div style={{ fontSize: 20, color: "#a3e635", fontWeight: 800, marginTop: 4 }}>
              Разборы и кейсы в Telegram: @BUDDAH_AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
