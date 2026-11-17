import React from "react";
import { Composition } from "remotion";
import App from "./App";
import { CardStyleComparison } from "./components/CardStyleComparison";
import { Short01BotTraffic } from "./components/shorts/Short01BotTraffic";
import { Short02ConversionParadox } from "./components/shorts/Short02ConversionParadox";
import { Short03DeathOfLinks } from "./components/shorts/Short03DeathOfLinks";
import { Short04BenCarRent } from "./components/shorts/Short04BenCarRent";
import { Short05KamalaDeal } from "./components/shorts/Short05KamalaDeal";
import { Short06LlmsTxtMyth } from "./components/shorts/Short06LlmsTxtMyth";
import { Short07SpeedToLead } from "./components/shorts/Short07SpeedToLead";

export const Root: React.FC = () => {
  return (
    <>
      {/* 16:9 Main Master Video (Episode 02) */}
      <Composition
        id="MainVideo"
        component={App}
        durationInFrames={20415}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Style Comparison */}
      <Composition
        id="CardStyleComparison"
        component={CardStyleComparison}
        durationInFrames={30}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 9:16 Vertical Shorts / Reels (Rule 26) - Note: only letters, numbers, and hyphens allowed */}
      <Composition
        id="Short01-BotTraffic"
        component={Short01BotTraffic}
        durationInFrames={1503}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short02-ConversionParadox"
        component={Short02ConversionParadox}
        durationInFrames={1422}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short03-DeathOfLinks"
        component={Short03DeathOfLinks}
        durationInFrames={1620}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short04-BenCarRent"
        component={Short04BenCarRent}
        durationInFrames={1665}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short05-KamalaDeal"
        component={Short05KamalaDeal}
        durationInFrames={1476}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short06-LlmsTxtMyth"
        component={Short06LlmsTxtMyth}
        durationInFrames={1395}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Short07-SpeedToLead"
        component={Short07SpeedToLead}
        durationInFrames={1575}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
