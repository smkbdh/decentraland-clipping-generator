import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SHORTS_CAPTIONS, ShortCaptionSegment } from "./shortsCaptionsData";

interface ShortCaptionsProps {
  shortKey: string;
}

export const ShortCaptions: React.FC<ShortCaptionsProps> = ({ shortKey }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const segments = SHORTS_CAPTIONS[shortKey] || [];
  const activeSegment = segments.find(
    (seg) => currentTime >= seg.start && currentTime <= seg.end + 0.25
  );

  if (!activeSegment) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 50,
        right: 50,
        bottom: 395,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(10, 15, 26, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1.5px solid rgba(255, 255, 255, 0.16)",
          borderRadius: 22,
          padding: "12px 28px",
          maxWidth: 900,
          textAlign: "center",
          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.75)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
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
                  lineHeight: "44px",
                  fontWeight: isSpoken ? 900 : 700,
                  color: isSpoken ? "#facc15" : "#f8fafc",
                  transform: isSpoken ? "scale(1.06)" : "scale(1)",
                  textShadow: isSpoken
                    ? "0 0 16px rgba(250, 204, 21, 0.7)"
                    : "0 2px 8px rgba(0,0,0,0.8)",
                  transition: "transform 0.08s ease, color 0.08s ease",
                  display: "inline-block",
                  letterSpacing: "-0.01em",
                }}
              >
                {w.word}
              </span>
            );
          })
        ) : (
          <span
            style={{
              fontSize: 32,
              lineHeight: "42px",
              fontWeight: 800,
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {activeSegment.text}
          </span>
        )}
      </div>
    </div>
  );
};
