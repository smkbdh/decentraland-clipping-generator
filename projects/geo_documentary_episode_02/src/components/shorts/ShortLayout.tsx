import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { ShortCaptions } from "./ShortCaptions";

interface ShortLayoutProps {
  shortKey: string;
  categoryTitle: string;
  shortNumber: string;
  bgVideoSrc: string;
  voiceoverStartSec: number;
  durationFrames: number;
  children: React.ReactNode;
}

export const ShortLayout: React.FC<ShortLayoutProps> = ({
  shortKey,
  categoryTitle,
  shortNumber,
  bgVideoSrc,
  voiceoverStartSec,
  durationFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle camera pan/zoom on background video
  const bgScale = interpolate(frame, [0, durationFrames], [1.12, 1.24], {
    extrapolateRight: "clamp",
  });

  // Audio start offset in frames
  const voStartFrame = Math.round(voiceoverStartSec * fps);

  // Smooth audio fade in and out for a clean cut
  const voVolume = interpolate(
    frame,
    [0, 15, durationFrames - 18, durationFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Ambient music volume
  const bgmVolume = interpolate(
    frame,
    [0, 20, durationFrames - 25, durationFrames],
    [0, 0.08, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Header entrance animation
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateRight: "clamp",
  });

  // Top progress bar
  const progressPercent = (frame / durationFrames) * 100;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060911",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Cinematic Background Video with 9:16 Cover Scale */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Video
          src={staticFile(bgVideoSrc)}
          style={{
            width: 1080,
            height: 1920,
            objectFit: "cover",
            transform: `scale(${bgScale})`,
            filter: "brightness(0.38) contrast(1.1) saturate(1.15) blur(1px)",
          }}
          startFrom={0}
          muted
          loop
        />
      </AbsoluteFill>

      {/* 2. Deep Gradient Vignette for Safe Zones & High Contrast */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(6, 10, 20, 0.55) 0%, rgba(3, 5, 12, 0.92) 85%, #020408 100%)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2, 4, 8, 0.88) 0%, rgba(2, 4, 8, 0.2) 20%, rgba(2, 4, 8, 0.2) 75%, rgba(2, 4, 8, 0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Audio Tracks: Voiceover + Subtle Ambient Music */}
      <Audio
        src={staticFile("voiceover.mp3")}
        startFrom={voStartFrame}
        volume={voVolume}
      />
      <Audio
        src={staticFile("neon_dreams.mp3")}
        volume={bgmVolume}
        loop
      />

      {/* 4. Top Safe-Zone Header (y: 290px - strictly below platform header) */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          zIndex: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: 999,
            padding: "8px 20px 8px 14px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 10px #22c55e",
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#f8fafc",
              textTransform: "uppercase",
            }}
          >
            {categoryTitle}
          </span>
        </div>

        <div
          style={{
            background: "rgba(30, 41, 59, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 999,
            padding: "8px 18px",
            fontSize: 17,
            fontWeight: 800,
            color: "#94a3b8",
            letterSpacing: "0.05em",
            backdropFilter: "blur(12px)",
          }}
        >
          {shortNumber} • @BUDDAH_AI
        </div>
      </div>

      {/* Thin Micro-Progress Line */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 60,
          right: 60,
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
          zIndex: 40,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #38bdf8 0%, #22c55e 100%)",
            borderRadius: 2,
            boxShadow: "0 0 8px rgba(56, 189, 248, 0.7)",
          }}
        />
      </div>

      {/* 5. Central Safe Content Working Area (x: 60-960px, y: 380-1420px) */}
      <div
        style={{
          position: "absolute",
          top: 380,
          bottom: 500, // Leaves room for clean spoken captions and safe zone
          left: 60,
          right: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        {children}
      </div>

      {/* 6. Spoken Dynamic Captions (bottom: 395px) */}
      <ShortCaptions shortKey={shortKey} />
    </AbsoluteFill>
  );
};
