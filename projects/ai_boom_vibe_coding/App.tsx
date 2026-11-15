import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { Audio, Video } from "@remotion/media";
import { HookScene } from "./components/HookScene";
import { GoldRushScene } from "./components/GoldRushScene";
import { SecurityScene } from "./components/SecurityScene";
import { TelegramPitchScene } from "./components/TelegramPitchScene";
import { KlarnaCrmScene } from "./components/KlarnaCrmScene";
import { FiveRulesScene } from "./components/FiveRulesScene";
import { TopChapterBar } from "./components/TopChapterBar";
import { CornerBranding } from "./components/CornerBranding";

export default function App() {
  const { fps } = useVideoConfig();

  // Timing calculations (in frames)
  const hookDurationFrames = Math.round(79.5 * fps);
  const introDurationFrames = Math.round(13.84 * fps);
  
  const act1DurationFrames = Math.round(127.9 * fps);
  const act2DurationFrames = Math.round(115.8 * fps);
  const telegramDurationFrames = Math.round(32.9 * fps);
  const act3DurationFrames = Math.round(74.5 * fps);
  const act4DurationFrames = Math.round(91.46 * fps);

  // Scene start points
  const introStartFrame = hookDurationFrames;
  const act1StartFrame = introStartFrame + introDurationFrames;
  const act2StartFrame = act1StartFrame + act1DurationFrames;
  const telegramStartFrame = act2StartFrame + act2DurationFrames;
  const act3StartFrame = telegramStartFrame + telegramDurationFrames;
  const act4StartFrame = act3StartFrame + act3DurationFrames;

  // Total speech duration after intro
  const postIntroAudioDuration = Math.round((522.66 - 79.5) * fps);

  // Key SFX Timestamps (in seconds)
  const sfxWhooshes = [0.2, 25.0, 50.0, 93.5, 122.0, 148.0, 189.0, 221.5, 255.0, 279.0, 337.2, 370.0, 403.0, 426.0, 444.6, 500.0];
  const sfxImpacts = [0, 93.34, 221.24, 369.94, 444.44];
  const sfxCashes = [26.0, 123.0, 137.0];
  const sfxGlitches = [52.0, 281.0];

  return (
    <div style={{ flex: 1, backgroundColor: "#07090e", width: "100%", height: "100%", position: "relative" }}>
      {/* GLOBAL UI OVERLAYS */}
      <TopChapterBar />
      <CornerBranding />

      {/* 1. Hook Scene (0 - 79.5s) */}
      <Sequence name="01. Hook Scene" from={0} durationInFrames={hookDurationFrames} layout="none">
        <HookScene />
      </Sequence>

      {/* 2. Intro Video (79.5s - 93.34s) - FULL SCREEN 1920x1080 */}
      <Sequence name="02. Channel Intro Video" from={introStartFrame} durationInFrames={introDurationFrames} layout="none">
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#000000" }}>
          <Video
            src="kino:b36cc514-afe4-46c7-b268-9bbb9ba9a726"
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

      {/* 3. Act 1: Gold Rush & Token Trap */}
      <Sequence name="03. Act 1: Gold Rush" from={act1StartFrame} durationInFrames={act1DurationFrames} layout="none">
        <GoldRushScene />
      </Sequence>

      {/* 4. Act 2: Security & Rogue Agent */}
      <Sequence name="04. Act 2: Security Holes" from={act2StartFrame} durationInFrames={act2DurationFrames} layout="none">
        <SecurityScene />
      </Sequence>

      {/* 5. Telegram Pitch Scene */}
      <Sequence name="05. Telegram Pitch" from={telegramStartFrame} durationInFrames={telegramDurationFrames} layout="none">
        <TelegramPitchScene />
      </Sequence>

      {/* 6. Act 3: Klarna & Modern CRM */}
      <Sequence name="06. Act 3: Klarna & CRM" from={act3StartFrame} durationInFrames={act3DurationFrames} layout="none">
        <KlarnaCrmScene />
      </Sequence>

      {/* 7. Act 4: 5 Rules & GEO Teaser */}
      <Sequence name="07. Act 4: 5 Rules & GEO" from={act4StartFrame} durationInFrames={act4DurationFrames} layout="none">
        <FiveRulesScene />
      </Sequence>

      {/* === SFX TRACKS === */}
      {sfxWhooshes.map((sec, idx) => (
        <Sequence key={`whoosh_${idx}`} from={Math.round(sec * fps)} durationInFrames={15} layout="none">
          <Audio src="kino:8ec047a6-125f-473c-a12a-06dc83664cf4" volume={0.35} />
        </Sequence>
      ))}

      {sfxImpacts.map((sec, idx) => (
        <Sequence key={`impact_${idx}`} from={Math.round(sec * fps)} durationInFrames={30} layout="none">
          <Audio src="kino:294ff0ee-27bf-469c-9460-e595776efdb2" volume={0.4} />
        </Sequence>
      ))}

      {sfxCashes.map((sec, idx) => (
        <Sequence key={`cash_${idx}`} from={Math.round(sec * fps)} durationInFrames={20} layout="none">
          <Audio src="kino:cf9a317e-8931-4ff4-a97b-d1949ec3d373" volume={0.4} />
        </Sequence>
      ))}

      {sfxGlitches.map((sec, idx) => (
        <Sequence key={`glitch_${idx}`} from={Math.round(sec * fps)} durationInFrames={20} layout="none">
          <Audio src="kino:67127907-51bd-4969-9fc0-cf7553699024" volume={0.4} />
        </Sequence>
      ))}

      {/* === AUDIO TRACKS === */}

      {/* Voiceover Part 1 (Hook: 0 to 79.5s) */}
      <Sequence name="Voiceover: Part 1" from={0} durationInFrames={hookDurationFrames} layout="none">
        <Audio src="kino:52915479-2705-45de-97a2-ef78dacfbeb1" />
      </Sequence>

      {/* Voiceover Part 2 (Acts 1-4, starting after intro) */}
      <Sequence
        name="Voiceover: Part 2"
        from={act1StartFrame}
        trimBefore={hookDurationFrames}
        durationInFrames={postIntroAudioDuration}
        layout="none"
      >
        <Audio src="kino:52915479-2705-45de-97a2-ef78dacfbeb1" />
      </Sequence>

      {/* Background Music: Part 1 (under Hook) */}
      <Sequence name="Music Bed: Hook" from={0} durationInFrames={hookDurationFrames} layout="none">
        <Audio src="kino:8eeba53a-7331-4dfe-bef2-add4aa5b4558" volume={0.11} loop />
      </Sequence>

      {/* Background Music: Part 2 (under Acts 1-4, muted during Intro) */}
      <Sequence name="Music Bed: Main" from={act1StartFrame} layout="none">
        <Audio src="kino:8eeba53a-7331-4dfe-bef2-add4aa5b4558" volume={0.11} loop />
      </Sequence>
    </div>
  );
}
