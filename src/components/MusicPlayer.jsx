import React, { useRef, useEffect } from "react";
import { FaRegPlayCircle, FaPauseCircle } from "react-icons/fa";

const MusicPlayer = ({ song, isPlaying, onPlayPause }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, song]);

  return (
    <div className="music-player">
      <img src={song.cover} alt={song.title} className="player-cover" />
      <div className="player-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
      <audio ref={audioRef} src={song.url} />
      <button className="play-pause-btn" onClick={onPlayPause}>
        {isPlaying ? <FaPauseCircle size={40} /> : <FaRegPlayCircle size={40} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
