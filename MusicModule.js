// Member 4: MusicModule.js
import React from 'react';

const MusicModule = ({ mood }) => {
  // Mood-to-Genre Mapping Logic
  const moodMap = {
    Happy: 'energy', 
    Sad: 'mellow',
    Angry: 'rock',
    Surprised: 'upbeat',
    Neutral: 'ambient'
  };

  const playMoodPlaylist = () => {
    const genre = moodMap[mood] || 'pop';
    console.log(`Fetching Spotify recommendations for: ${genre}`);
    // Integrates Spotify API / Playback SDK here
    window.open(`https://open.spotify.com/search/${genre}/playlists`, '_blank');
  };

  return (
    <button 
      onClick={playMoodPlaylist}
      className="px-6 py-2 bg-green-600 rounded-full hover:bg-green-700 transition"
    >
      Play {mood} Music
    </button>
  );
};
