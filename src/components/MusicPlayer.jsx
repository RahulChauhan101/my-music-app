import React, { useState, useEffect, useRef } from 'react'
import './MusicPlayer.css'

const MusicPlayer = ({ song, isPlaying, onPlayPause }) => {
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  // Update audio source when song changes
  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.audioSrc
      audioRef.current.load()
      setCurrentTime(0)
      
      // Get duration when metadata is loaded
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration)
      })
    }
  }, [song])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Update current time
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setCurrentTime(0)
      onPlayPause() // Stop playing
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [onPlayPause])

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!song) return null

  return (
    <div className="music-player">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onError={(e) => console.log('Audio error:', e)}
      />
      
      <div className="player-content">
        <div className="song-info">
          <img 
            src={song.image || 'https://picsum.photos/300/300?random=999'} 
            alt={song.title}
            className="player-song-image"
            onError={(e) => {
              e.target.src = 'https://picsum.photos/300/300?random=999'
            }}
          />
          <div className="song-details">
            <h3 className="player-song-title">{song.title}</h3>
            <p className="player-song-artist">{song.singer}</p>
            {song.movie && <p className="player-song-movie">🎬 {song.movie}</p>}
          </div>
        </div>

        <div className="player-controls">
          <button className="control-btn" title="Previous">⏮️</button>
          <button className="play-pause-btn" onClick={onPlayPause} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="control-btn" title="Next">⏭️</button>
        </div>

        <div className="player-progress">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleProgressChange}
            className="progress-bar"
            title="Seek"
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="player-options">
          <button className="option-btn" title="Like">❤️</button>
          <button className="option-btn" title="Add to Playlist">📝</button>
          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              title="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer 