import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MusicPlayer from "./components/MusicPlayer";
import MusicLibrary from "./components/MusicLibrary";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: "all", name: "All Songs" });
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch songs whenever category or search changes
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:5000/api/songs", {
          params: { category: currentCategory.id, search: searchQuery },
        });

        setSongs(res.data);
      } catch (err) {
        setError("Failed to fetch songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [currentCategory, searchQuery]);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  return (
    <div className="app">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="main-content">
        <Sidebar
          currentCategory={currentCategory.id}
          onCategoryChange={handleCategoryChange}
        />

        <div className="content-area">
          <MusicLibrary
            songs={songs}
            loading={loading}
            error={error}
            onSongSelect={handleSongSelect}
          />
        </div>
      </div>

      {currentSong && (
        <MusicPlayer
          song={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}
    </div>
  );
}

export default App;
