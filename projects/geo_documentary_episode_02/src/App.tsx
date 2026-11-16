import React from "react";
import { Sequence, useVideoConfig, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { HookScene } from "./components/HookScene";
import { ResearchScene } from "./components/ResearchScene";
import { ArchitectureScene } from "./components/ArchitectureScene";
import { BenCarRentScene } from "./components/BenCarRentScene";
import { PhuketStayProScene } from "./components/PhuketStayProScene";
import { BusinessChecklistScene } from "./components/BusinessChecklistScene";
import { OutroScene } from "./components/OutroScene";
import { TopChapterBar } from "./components/TopChapterBar";
import { ChapterMicroTeaser } from "./components/ChapterMicroTeaser";
import { CornerBranding } from "./components/CornerBranding";

export default function App() {
  const { fps } = useVideoConfig();

  // Timing markers in seconds (aligned with speech delivery)
  const tHookEnd = 100.8;
  const tResearchEnd = 184.5;
  const tArchEnd = 304.5;
  const tBenEnd = 425.0;
  const tPhuketEnd = 516.5;
  const tRulesEnd = 630.0;
  const tTotal = 651.68;

  // Frame counts
  const fHook = Math.round(tHookEnd * fps);
  const fResearch = Math.round((tResearchEnd - tHookEnd) * fps);
  const fArch = Math.round((tArchEnd - tResearchEnd) * fps);
  const fBen = Math.round((tBenEnd - tArchEnd) * fps);
  const fPhuket = Math.round((tPhuketEnd - tBenEnd) * fps);
  const fRules = Math.round((tRulesEnd - tPhuketEnd) * fps);
  const fOutro = Math.round((tTotal - tRulesEnd) * fps);
  const fTotal = Math.round(tTotal * fps);

  // Scene start frames
  const sHook = 0;
  const sResearch = fHook;
  const sArch = sResearch + fResearch;
  const sBen = sArch + fArch;
  const sPhuket = sBen + fBen;
  const sRules = sPhuket + fPhuket;
  const sOutro = sRules + fRules;

  // Chapter impact timestamps (for subtle sub-bass SFX)
  const chapterImpacts = [100.8, 184.5, 304.5, 425.0, 516.5, 630.0];

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
      {/* 1. GLOBAL BRANDING & NAVIGATION OVERLAYS */}
      <TopChapterBar />
      <ChapterMicroTeaser />
      <CornerBranding />

      {/* === SCENE SEQUENCES === */}

      {/* 01. Hook: Bots vs Clients (0 - 100.8s) */}
      <Sequence name="01. Hook: Bots vs Clients" from={sHook} durationInFrames={fHook} layout="none">
        <HookScene />
      </Sequence>

      {/* 02. Research: 145M Sessions & Conversion (100.8s - 184.5s) */}
      <Sequence name="02. Research: 145M Sessions" from={sResearch} durationInFrames={fResearch} layout="none">
        <ResearchScene />
      </Sequence>

      {/* 03. Architecture: SEO vs GEO & RAG (184.5s - 304.5s) */}
      <Sequence name="03. Architecture: SEO vs GEO" from={sArch} durationInFrames={fArch} layout="none">
        <ArchitectureScene />
      </Sequence>

      {/* 04. Case 1: BenPhuketCarRent 38 WhatsApp (304.5s - 425.0s) */}
      <Sequence name="04. Case 1: BenPhuketCarRent" from={sBen} durationInFrames={fBen} layout="none">
        <BenCarRentScene />
      </Sequence>

      {/* 05. Case 2 & 3: PhuketStayPro Dario Lead & Chatterbox (425.0s - 516.5s) */}
      <Sequence name="05. Case 2 & 3: PhuketStayPro" from={sPhuket} durationInFrames={fPhuket} layout="none">
        <PhuketStayProScene />
      </Sequence>

      {/* 06. 4 Rules for Business (516.5s - 630.0s) */}
      <Sequence name="06. 4 Rules for Business" from={sRules} durationInFrames={fRules} layout="none">
        <BusinessChecklistScene />
      </Sequence>

      {/* 07. Outro & Real Deals (630.0s - 651.68s) */}
      <Sequence name="07. Outro & Real Deals" from={sOutro} durationInFrames={fOutro} layout="none">
        <OutroScene />
      </Sequence>

      {/* === SFX CHAPTER IMPACTS === */}
      {chapterImpacts.map((sec, idx) => (
        <Sequence key={`chapter_impact_${idx}`} from={Math.round(sec * fps)} durationInFrames={30} layout="none">
          <Audio src={staticFile("impact.wav")} volume={0.14} />
        </Sequence>
      ))}

      {/* === BACKGROUND MUSIC BED (FROM EPISODE 1) === */}
      <Sequence name="Music Bed: Neon Dreams" from={0} durationInFrames={fTotal} layout="none">
        <Audio src={staticFile("neon_dreams.mp3")} volume={0.11} loop />
      </Sequence>

      {/* === MASTER VOICEOVER AUDIO TRACK (Native Kino Asset) === */}
      <Sequence name="Master Voiceover" from={0} durationInFrames={fTotal} layout="none">
        <Audio src={staticFile("voiceover.mp3")} volume={1.0} />
      </Sequence>
    </div>
  );
}
