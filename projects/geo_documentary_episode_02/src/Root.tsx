import React from "react";
import { Composition } from "remotion";
import App from "./App";

export const Root: React.FC = () => {
  return (
    <Composition
      id="MainVideo"
      component={App}
      durationInFrames={19550}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
