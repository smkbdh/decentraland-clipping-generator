import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS_DATA, CaptionSegment } from "./captionsData";

export const DynamicCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find the active segment
  const activeSegment = CAPTIONS_DATA.find(
    (seg) => currentTime >= seg.start && currentTime <= seg.end + 0.3
  );

  if (!activeSegment) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(10, 15, 26, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 24,
          padding: "14px 32px",
          maxWidth: 1200,
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 12px",
        }}
      >
        {activeSegment.words && activeSegment.words.length > 0 ? (
          activeSegment.words.map((w, idx) => {
            const isSpoken = currentTime >= w.start && currentTime <= w.end;
            return (
              <span
                key={idx}
                style={{
                  fontSize: 34,
                  fontWeight: isSpoken ? 900 : 700,
                  color: isSpoken ? "#facc15" : "#f1f5f9",
                  transform: isSpoken ? "scale(1.08)" : "scale(1)",
                  textShadow: isSpoken ? "0 0 20px rgba(250, 204, 21, 0.6)" : "none",
                  transition: "all 0.1s ease",
                  display: "inline-block",
                }}
              >
                {w.word}
              </span>
            );
          })
        ) : (
          <span style={{ fontSize: 34, fontWeight: 800, color: "#ffffff" }}>
            {activeSegment.text}
          </span>
        )}
      </div>
    </div>
  );
};
