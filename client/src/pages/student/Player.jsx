import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const Player = () => {
  const { courseId } = useParams();
  const [playerError, setPlayerError] = useState(false);

  // Map course IDs to YouTube video IDs
  const courseVideos = {
    'intro-to-js': 'PkZNo7MFNFg', // JavaScript tutorial
    'python-basics': 'rfscVS0vtbw', // Python tutorial
    'cybersecurity': 'z8CGkhD4VvQ', // Cybersecurity basics
    // Add more mappings as needed
  };

  // Fallback videos in case of errors
  const fallbackVideos = [
    'PkZNo7MFNFg', // JavaScript
    'rfscVS0vtbw', // Python
    'z8CGkhD4VvQ'  // Cybersecurity
  ];

  const [currentVideoId, setCurrentVideoId] = useState(
    courseVideos[courseId] || fallbackVideos[0]
  );

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1
    },
  };

  const onReady = (event) => {
    setPlayerError(false);
    // You can access the player instance here if needed
    // event.target.playVideo();
  };

  const onError = (error) => {
    console.error('YouTube Player Error:', error);
    setPlayerError(true);
    
    // Try the next fallback video
    const currentIndex = fallbackVideos.indexOf(currentVideoId);
    const nextIndex = (currentIndex + 1) % fallbackVideos.length;
    setCurrentVideoId(fallbackVideos[nextIndex]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Player: {courseId}</h1>
      <div className="bg-gray-100 rounded-lg p-4">
        {playerError ? (
          <div className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center text-white p-4">
            <p className="text-xl mb-4">The requested video is unavailable</p>
            <p>Trying another relevant video...</p>
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center">
            <YouTube
              videoId={currentVideoId}
              opts={opts}
              onReady={onReady}
              onError={onError}
              className="w-full max-w-4xl"
            />
          </div>
        )}
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              {playerError ? (
                <p className="text-red-500">We're having trouble loading the requested video. A similar video is playing instead.</p>
              ) : (
                <p>Now playing: {getVideoTitle(currentVideoId)}</p>
              )}
            </div>
            {/* Add more course content sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get video titles (you might want to expand this)
const getVideoTitle = (videoId) => {
  const titles = {
    'PkZNo7MFNFg': 'JavaScript Tutorial',
    'rfscVS0vtbw': 'Python Tutorial',
    'z8CGkhD4VvQ': 'Cybersecurity Basics'
  };
  return titles[videoId] || 'Course Video';
};

export default Player;