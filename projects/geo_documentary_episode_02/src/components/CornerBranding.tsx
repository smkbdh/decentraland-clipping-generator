import React from "react";
import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

export const CornerBranding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeSec = frame / fps;

  // Hide branding during full-screen studio intro (95.7s to 109.54s)
  if (currentTimeSec >= 95.7 && currentTimeSec < 109.54) {
    return null;
  }

  // Pulsing glow animation for the lime accent
  const pulseOpacity = 0.6 + 0.4 * Math.sin(frame / 12);

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        right: 50,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "8px 20px 8px 12px",
        borderRadius: 24,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(163, 230, 53, 0.4)",
        boxShadow: `0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(163, 230, 53, ${0.15 * pulseOpacity})`,
      }}
    >
      {/* Brand Neon Logo - native Kino asset from Episode 1 */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #a3e635",
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 14px rgba(163, 230, 53, ${0.4 * pulseOpacity})`,
        }}
      >
        <Img
          src={staticFile("buddah_logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Channel Handle & Tag */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#f8fafc",
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: 0.8,
            lineHeight: 1.2,
          }}
        >
          @BUDDAH_AI
        </span>
        <span
          style={{
            color: "#a3e635",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}
        >
          TELEGRAM КАНАЛ
        </span>
      </div>
    </div>
  );
};
