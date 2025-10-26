import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  vdoSrc: string;
  isPlaying: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ vdoSrc, isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <video ref={videoRef} src={vdoSrc} width="100%" muted loop controls />
  );
};

export default VideoPlayer;
