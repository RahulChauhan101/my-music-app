import React from "react";
import "./MusicLibrary.css";

const MusicLibrary = ({ songs, loading, error, onSongSelect }) => {
  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>{error}</p>;
  if (!songs.length) return <p>No songs found</p>;

  return (
    <div className="music-library">
      {songs.map((song) => (
        <div key={song._id} className="song-item" onClick={() => onSongSelect(song)}>
          <img src={song.cover} alt={song.title} className="song-img" />
          <div className="song-info">
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicLibrary;
