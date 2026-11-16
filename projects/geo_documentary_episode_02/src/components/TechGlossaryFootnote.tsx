import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface TechGlossaryFootnoteProps {
  term: string;
  englishTitle: string;
  russianExplanation: string;
  accentColor?: string;
  appearFrame?: number;
}

export const TechGlossaryFootnote: React.FC<TechGlossaryFootnoteProps> = ({
  term,
  englishTitle,
  russianExplanation,
  accentColor = "#38bdf8",
  appearFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - appearFrame);

  const opacity = interpolate(relFrame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(relFrame, [0, 10], [20, 0], {
    extrapolateRight: "clamp",
  });
  const pulse = 0.7 + 0.3 * Math.sin(frame / 6);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px)`,
        width: "calc(100% - 140px)",
        maxWidth: 1320,
        opacity,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(10, 15, 29, 0.96)",
        backdropFilter: "blur(14px)",
        border: `1.5px solid ${accentColor}`,
        borderRadius: 20,
        padding: "16px 26px",
        boxShadow: `0 15px 35px rgba(0, 0, 0, 0.7), 0 0 30px ${accentColor}33`,
        boxSizing: "border-box",
      }}
    >
      {/* Indicator Pill & Term Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingRight: 22,
          borderRight: "1.5px solid rgba(255, 255, 255, 0.14)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
            opacity: pulse,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 1.5,
              color: accentColor,
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            СЛОВАРЬ ТЕХНОЛОГИЙ
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.2,
              marginTop: 2,
            }}
          >
            {term}{" "}
            <span style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
              ({englishTitle})
            </span>
          </span>
        </div>
      </div>

      {/* Russian Plain-Language Explanation */}
      <div
        style={{
          paddingLeft: 22,
          flex: 1,
          fontSize: 21,
          color: "#e2e8f0",
          lineHeight: 1.35,
          fontWeight: 600,
        }}
      >
        {russianExplanation}
      </div>
    </div>
  );
};
