import React from "react";
import { Composition } from "remotion";
import App from "./App";
import { CardStyleComparison } from "./components/CardStyleComparison";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={App}
        durationInFrames={20415}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CardStyleComparison"
        component={CardStyleComparison}
        durationInFrames={30}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
