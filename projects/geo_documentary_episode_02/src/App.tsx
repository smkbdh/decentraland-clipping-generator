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

  // Scene start frames
  const sHook = 0;
  const sIntro = fHook;
  const sResearch = sIntro + fIntro;
  const sArch = sResearch + fResearch;
  const sBen = sArch + fArch;
  const sPhuket = sBen + fBen;
  const sRules = sPhuket + fPhuket;
  const sOutro = sRules + fRules;

  // Total speech duration after intro
  const postIntroAudioDuration = fTotalSpeech - fHook;

  // Chapter impact timestamps (for subtle sub-bass SFX, shifted by intro duration after hook)
  const chapterImpacts = [
    tHookEnd + tIntroDuration,
    tResearchEnd + tIntroDuration,
    tArchEnd + tIntroDuration,
    tBenEnd + tIntroDuration,
    tPhuketEnd + tIntroDuration,
    tRulesEnd + tIntroDuration,
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

      {/* === SFX CHAPTER IMPACTS === */}
      {chapterImpacts.map((sec, idx) => (
        <Sequence key={`chapter_impact_${idx}`} from={Math.round(sec * fps)} durationInFrames={30} layout="none">
          <Audio src={staticFile("impact.wav")} volume={0.14} />
        </Sequence>
      ))}

      {/* === BACKGROUND MUSIC BED (Neon Dreams) === */}
      {/* Music Part 1 (under Hook) */}
      <Sequence name="Music Bed: Hook" from={0} durationInFrames={fHook} layout="none">
        <Audio src={staticFile("neon_dreams.mp3")} volume={0.07} loop />
      </Sequence>

      {/* Music Part 2 (under Acts, muted during Intro) */}
      <Sequence name="Music Bed: Main" from={sResearch} durationInFrames={postIntroAudioDuration} layout="none">
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
