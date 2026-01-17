import React from 'react';

const MusicModule = ({ mood }) => {
  // 1. Mood-to-Genre Mapping
  const moodMap = {
    Happy: "upbeat feel good pop",
    Sad: "sad acoustic mellow",
    Angry: "heavy rock rage",
    Relaxed: "chill lofi study",
    Neutral: "ambient focus"
  };

  // 2. Extracted API Logic (Now properly defined as a helper)
  const fetchSpotifyTracks = async (detectedMood) => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      alert("Please log in to Spotify first!");
      return;
    }

    const SEARCH_URL = "https://api.spotify.com/v1/search";
    const query = moodMap[detectedMood] || detectedMood;

    try {
      // API CALL 1: Search for a playlist matching the mood
      const searchRes = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(query)}&type=playlist&limit=1`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const searchData = await searchRes.json();
      
      if (!searchData.playlists.items.length) {
        console.error("No playlists found for this mood.");
        return;
      }

      const playlistId = searchData.playlists.items[0].id;

      // API CALL 2: Get tracks from that playlist
      const tracksRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const tracksData = await tracksRes.json();

      // Return cleaned song data
      return tracksData.items.map(item => ({
        title: item.track.name,
        artist: item.track.artists[0].name,
        preview: item.track.preview_url,
        id: item.track.id,
        externalUrl: item.track.external_urls.spotify
      }));

    } catch (error) {
      console.error("Spotify API Request Failed:", error);
    }
  };

  // 3. Event Handler
  const handleMusicClick = async () => {
    console.log(`Detecting music for mood: ${mood}`);
    
    const songs = await fetchSpotifyTracks(mood);
    
    if (songs && songs.length > 0) {
      // Option A: Open the first song found in a new tab
      window.open(songs[0].externalUrl, '_blank');
      
      // Option B: You could also trigger a state change here 
      // to display the list of 10 songs in your UI.
    }
  };

  return (
    <button 
      onClick={handleMusicClick}
      className="px-6 py-2 bg-green-600 rounded-full hover:bg-green-700 transition text-white font-bold"
    >
      Play {mood} Music
    </button>
  );
};

export default MusicModule;
