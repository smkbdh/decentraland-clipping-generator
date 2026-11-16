import React from "react";
import { useCurrentFrame } from "remotion";

export const BackgroundGrid: React.FC<{ accentColor?: string; hasVideo?: boolean }> = ({
  accentColor = "#6366f1",
  hasVideo = true,
}) => {
  const frame = useCurrentFrame();
  const bgY = (frame * 0.5) % 40;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "transparent",
        overflow: "hidden",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      {/* Dynamic ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "25%",
          width: "50%",
          height: "55%",
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Subtle tech grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: `0px ${bgY}px`,
          opacity: 0.5,
        }}
      />

      {/* Subtle Vignette for contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(7, 9, 14, 0.2) 20%, rgba(7, 9, 14, 0.7) 100%)",
        }}
      />
    </div>
  );
};
