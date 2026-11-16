import React from "react";
import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

export const CornerBranding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulsing glow animation for the lime accent
  const pulseOpacity = 0.6 + 0.4 * Math.sin(frame / 12);

  return (<div
      style={{
        position: "absolute",
        top: 24,
        right: 50,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "6px 16px 6px 10px",
        borderRadius: 20,
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(163, 230, 53, 0.35)",
        boxShadow: `0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(163, 230, 53, ${0.15 * pulseOpacity})`,
      }}
    >
      {/* Brand Neon Logo - native Kino asset from Episode 1 */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          overflow: "hidden",
          border: "1.5px solid #a3e635",
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 12px rgba(163, 230, 53, ${0.4 * pulseOpacity})`,
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
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.5,
            lineHeight: 1.2,
          }}
        >
          @BUDDAH_AI
        </span>
        <span
          style={{
            color: "#a3e635",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}
        >
          TELEGRAM КАНАЛ
        </span>
      </div>
    </div>);
};
