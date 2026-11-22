import React from 'react';
import {AbsoluteFill, Audio, Composition, Img, Sequence, registerRoot, staticFile, useCurrentFrame} from 'remotion';

type HostProps = {
  voice: string;
  frameCount: number;
  fps: number;
  width: number;
  height: number;
  background: string;
};

const Host: React.FC<HostProps> = ({frameCount, background, voice}) => {
  const image = String(useCurrentFrame() + 1).padStart(4, '0');
  return <AbsoluteFill style={{backgroundColor: background}}>
    <Sequence durationInFrames={frameCount} layout="none">
      <Img src={staticFile(`frames/frame_${image}.png`)} style={{width: '100%', height: '100%'}} />
      <Audio src={staticFile(voice)} />
    </Sequence>
  </AbsoluteFill>;
};

const Root = () => <Composition id="BuddahHost" component={Host}
  width={1080} height={1920} fps={30} durationInFrames={1}
  defaultProps={{voice: 'voice.wav', frameCount: 1, fps: 30, width: 1080, height: 1920, background: '#202229'}}
  calculateMetadata={({props}) => ({durationInFrames: props.frameCount, fps: props.fps, width: props.width, height: props.height})}
/>;
registerRoot(Root);
