import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import useWindowListener from '../hooks/useWindowListener';

const PromoteCard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Disable right-click
  useWindowListener('contextmenu', (e: Event) => e.preventDefault());

    return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center max-w-md mx-auto">
        <VideoPlayer vdoSrc="/vdo/venue.mp4" isPlaying={isPlaying} />
        Book your venue today.
        <button
        className="mt-4 px-6 py-2 rounded-full bg-[#6d9468] text-white font-semibold hover:bg-[#5b7a5a] transition"
        onClick={() => setIsPlaying(!isPlaying)}
        >
            {isPlaying ? 'Pause' : 'Play'}
        </button>
    </div>
    );
};

export default PromoteCard;
