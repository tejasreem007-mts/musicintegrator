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
    // Spotify configuration constants
const SPOTIFY_API_URL = "https://open.spotify.com/search/$0";
const SEARCH_URL = "https://open.spotify.com/search/$1";

/**
 * Fetches mood-specific tracks from Spotify
 * @param {string} mood - The emotion detected (e.g., 'happy', 'sad')
 * @param {string} token - The Spotify Access Token
 */
async function fetchSpotifyTracks(mood, token) {
    if (!token) return console.error("Access Token Required");

    // Mapping moods to specific search keywords
    const searchTerms = {
        happy: "upbeat feel good pop",
        angry: "heavy rock rage",
        sad: "sad acoustic mellow",
        relaxed: "chill lofi study",
        neutral: "ambient focus"
    };

    const query = searchTerms[mood] || mood;

    try {
        // API CALL 1: Search for a playlist matching the mood
        const searchRes = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(query)}&type=playlist&limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const searchData = await searchRes.json();
        const playlistId = searchData.playlists.items[0].id;

        // API CALL 2: Get the tracks inside that playlist
        const tracksRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const tracksData = await tracksRes.json();

        // Map the results into a clean array of song objects
        return tracksData.items.map(item => ({
            title: item.track.name,
            artist: item.track.artists[0].name,
            preview: item.track.preview_url, // URL for the 30-second audio clip
            id: item.track.id
        }));

    } catch (error) {
        console.error("Spotify API Request Failed:", error);
    }
}
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
