import React from "react";
import { useCurrentFrame, useVideoConfig, Img } from "remotion";

export const CornerBranding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeSec = frame / fps;

  // Hide during intro video (79.5s to 93.34s)
  if (currentTimeSec >= 79.5 && currentTimeSec < 93.34) {
    return null;
  }

  // Pulsing glow animation for the green indicator
  const pulseOpacity = 0.6 + 0.4 * Math.sin(frame / 12);

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        right: 50,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "6px 14px",
        borderRadius: 16,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Live Online Pulse Dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#22c55e",
          boxShadow: `0 0 10px rgba(34, 197, 94, ${pulseOpacity})`,
          opacity: pulseOpacity,
        }}
      />

      {/* Mini QR Code Thumbnail */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src="kino:e895e6ff-ffb9-4517-b7f2-f557228f34de"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Channel Handle */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#f8fafc",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.5,
            lineHeight: 1.2,
          }}
        >
          @BUDDAH_AI
        </span>
        <span
          style={{
            color: "#94a3b8",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 1,
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
