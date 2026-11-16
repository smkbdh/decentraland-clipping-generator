import React from "react";
import { Sequence, useVideoConfig, staticFile } from "remotion";
import { Audio, Video } from "@remotion/media";
import { HookScene } from "./components/HookScene";
import { ResearchScene } from "./components/ResearchScene";
import { ArchitectureScene } from "./components/ArchitectureScene";
import { BenCarRentScene } from "./components/BenCarRentScene";
import { PhuketStayProScene } from "./components/PhuketStayProScene";
import { BusinessChecklistScene } from "./components/BusinessChecklistScene";
import { OutroScene } from "./components/OutroScene";
import { TopChapterBar } from "./components/TopChapterBar";
import { CornerBranding } from "./components/CornerBranding";

export default function App() {
  const { fps } = useVideoConfig();

  // Timing markers in seconds (aligned with exact speech delivery in transcript.json)
  // Hook voiceover ends at 95.42s ("и статус сделки."), next sentence ("Марий Хейнс...") starts at 95.53s.
  // 95.467s (frame 2864) falls dead in the natural pause between sentences.
  const tHookEnd = 95.467;
  const tIntroDuration = 13.84;
  const tResearchEnd = 177.6;
  const tArchEnd = 286.6;
  const tBenEnd = 398.4;
  const tPhuketEnd = 490.8;
  const tRulesEnd = 630.7;
  const tTotal = 651.68;

  // Frame counts
  const fHook = Math.round(tHookEnd * fps);
  const fIntro = Math.round(tIntroDuration * fps);
  const fResearch = Math.round((tResearchEnd - tHookEnd) * fps);
  const fArch = Math.round((tArchEnd - tResearchEnd) * fps);
  const fBen = Math.round((tBenEnd - tArchEnd) * fps);
  const fPhuket = Math.round((tPhuketEnd - tBenEnd) * fps);
  const fRules = Math.round((tRulesEnd - tPhuketEnd) * fps);
  const fOutro = Math.round((tTotal - tRulesEnd) * fps);
  const fTotalSpeech = Math.round(tTotal * fps);
  const fTotalWithIntro = fTotalSpeech + fIntro;

  // 15-second YouTube End-Screen buffer (450 frames at 30 fps)
  const tBuffer15s = 15.0;
  const fBuffer15s = Math.round(tBuffer15s * fps);
  const sBuffer = fTotalWithIntro;

  // Scene start frames
  const sHook = 0;
  const sIntro = fHook;
  const sResearch = sIntro + fIntro;
  const sArch = sResearch + fResearch;
  const sBen = sArch + fArch;
  const sPhuket = sBen + fBen;
  const sRules = sPhuket + fPhuket;
  const sOutro = sRules + fRules;

  // Total audio duration covering all acts + YouTube end buffer
  const postIntroAudioDuration = fTotalSpeech - fHook;
  const postIntroMusicDuration = postIntroAudioDuration + fBuffer15s;

  // Chapter impact timestamps (for subtle sub-bass SFX, shifted by intro duration after hook)
  const chapterImpacts = [
    tHookEnd + tIntroDuration,
    tResearchEnd + tIntroDuration,
    tArchEnd + tIntroDuration,
    tBenEnd + tIntroDuration,
    tPhuketEnd + tIntroDuration,
    tRulesEnd + tIntroDuration,
  ];

  // Delicate Micro-SFX cues (whisper quiet: volume 0.04 - 0.05)
  // Perfectly aligned with key graphic pops and metric reveals
  const microClickFrames = [
    sHook + Math.round(7.2 * fps), // Hook 3 real cases appear
    sBen + Math.round(28.0 * fps), // Metrics 38 WhatsApp & 6 Bookings pop in
    sBen + Math.round(38.5 * fps), // Telegram bot screenshot spotlight zoom
    sPhuket + Math.round(58.3 * fps), // Chatterbox site mockup opens
    sPhuket + Math.round(64.5 * fps), // Aggregation diagram activates
    sPhuket + Math.round(73.0 * fps), // 2GIS reviews card pops in
  ];

  const microWhooshFrames = [
    sHook + Math.round(0.1 * fps), // Hook opening question
    sArch + Math.round(36.0 * fps), // Query fan-out branches animate
    sRules + Math.round(4.0 * fps), // Rule 1 appears
    sOutro + Math.round(0.5 * fps), // Outro conclusion & QR code
  ];

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#07090e",
        width: "100%",
        height: "100%",
        position: "relative",
        fontFamily: "Bahnschrift, Segoe UI, -apple-system, sans-serif",
      }}
    >
      {/* === SCENE SEQUENCES === */}

      {/* 01. Hook: Bots vs Clients (0 - 95.7s) */}
      <Sequence name="01. Hook: Bots vs Clients" from={sHook} durationInFrames={fHook} layout="none">
        <HookScene />
      </Sequence>

      {/* 02. Channel Intro: OM AI Digital Studio (95.7s - 109.54s) */}
      <Sequence name="02. Channel Intro Video" from={sIntro} durationInFrames={fIntro} layout="none">
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#000000", zIndex: 10 }}>
          <Video
            src={staticFile("intro_buddah.mp4")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Sequence>

      {/* 03. Research: 145M Sessions & Conversion */}
      <Sequence name="03. Research: 145M Sessions" from={sResearch} durationInFrames={fResearch} layout="none">
        <ResearchScene />
      </Sequence>

      {/* 04. Architecture: SEO vs GEO & RAG */}
      <Sequence name="04. Architecture: SEO vs GEO" from={sArch} durationInFrames={fArch} layout="none">
        <ArchitectureScene />
      </Sequence>

      {/* 05. Case 1: BenPhuketCarRent 38 WhatsApp */}
      <Sequence name="05. Case 1: BenPhuketCarRent" from={sBen} durationInFrames={fBen} layout="none">
        <BenCarRentScene />
      </Sequence>

      {/* 06. Case 2 & 3: PhuketStayPro Dario Lead & Chatterbox */}
      <Sequence name="06. Case 2 & 3: PhuketStayPro" from={sPhuket} durationInFrames={fPhuket} layout="none">
        <PhuketStayProScene />
      </Sequence>

      {/* 07. 4 Rules for Business */}
      <Sequence name="07. 4 Rules for Business" from={sRules} durationInFrames={fRules} layout="none">
        <BusinessChecklistScene />
      </Sequence>

      {/* 08. Outro & Real Deals */}
      <Sequence name="08. Outro & Real Deals" from={sOutro} durationInFrames={fOutro} layout="none">
        <OutroScene />
      </Sequence>

      {/* 09. YouTube End-Screen Safe Buffer (15 seconds clean ambient space for end cards) */}
      <Sequence name="09. YouTube End-Screen Buffer" from={sBuffer} durationInFrames={fBuffer15s} layout="none">
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
          <Video
            src={staticFile("intro_buddah.mp4")}
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(7, 9, 14, 0.45) 0%, rgba(7, 9, 14, 0.9) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                padding: "8px 24px",
                borderRadius: 30,
                backgroundColor: "rgba(163, 230, 53, 0.15)",
                border: "1.5px solid rgba(163, 230, 53, 0.4)",
                color: "#a3e635",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 2,
                marginBottom: 16,
              }}
            >
              AI БУДДА · DIGITAL STUDIO
            </div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#f8fafc", letterSpacing: -0.5 }}>
              СПАСИБО ЗА ПРОСМОТР
            </div>
            <div style={{ fontSize: 22, color: "#94a3b8", marginTop: 8 }}>
              Подписывайтесь на канал и переходите к следующим выпускам
            </div>
          </div>
        </div>
      </Sequence>

      {/* === SFX CHAPTER IMPACTS === */}
      {chapterImpacts.map((sec, idx) => (
        <Sequence key={`chapter_impact_${idx}`} from={Math.round(sec * fps)} durationInFrames={30} layout="none">
          <Audio src={staticFile("impact.wav")} volume={0.14} />
        </Sequence>
      ))}

      {/* === SUBTLE MICRO-SFX (Whisper volume 0.04 - 0.05 on key pops) === */}
      {microClickFrames.map((frameNum, idx) => (
        <Sequence key={`micro_click_${idx}`} from={frameNum} durationInFrames={10} layout="none">
          <Audio src={staticFile("micro_click.wav")} volume={0.045} />
        </Sequence>
      ))}

      {microWhooshFrames.map((frameNum, idx) => (
        <Sequence key={`micro_whoosh_${idx}`} from={frameNum} durationInFrames={15} layout="none">
          <Audio src={staticFile("whoosh_subtle.wav")} volume={0.035} />
        </Sequence>
      ))}

      {/* === BACKGROUND MUSIC BED (Neon Dreams) === */}
      {/* Music Part 1 (under Hook) */}
      <Sequence name="Music Bed: Hook" from={0} durationInFrames={fHook} layout="none">
        <Audio src={staticFile("neon_dreams.mp3")} volume={0.07} loop />
      </Sequence>

      {/* Music Part 2 (under Acts + YouTube buffer, muted during Intro) */}
      <Sequence name="Music Bed: Main" from={sResearch} durationInFrames={postIntroMusicDuration} layout="none">
        <Audio src={staticFile("neon_dreams.mp3")} volume={0.07} loop />
      </Sequence>

      {/* === MASTER VOICEOVER AUDIO TRACK (Native Kino Asset) === */}
      {/* Voiceover Part 1 (Hook: 0 to 95.7s) */}
      <Sequence name="Voiceover: Hook" from={0} durationInFrames={fHook} layout="none">
        <Audio src={staticFile("voiceover.mp3")} volume={1.0} />
      </Sequence>

      {/* Voiceover Part 2 (Acts 1-6, starting after Intro) */}
      <Sequence
        name="Voiceover: Main Acts"
        from={sResearch}
        trimBefore={fHook}
        durationInFrames={postIntroAudioDuration}
        layout="none"
      >
        <Audio src={staticFile("voiceover.mp3")} volume={1.0} />
      </Sequence>

      {/* === 09. GLOBAL BRANDING & NAVIGATION OVERLAYS (ALWAYS ON TOP) === */}
      <TopChapterBar />
      <CornerBranding />
    </div>
  );
}
