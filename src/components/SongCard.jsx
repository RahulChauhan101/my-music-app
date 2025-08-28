import React from 'react'
import './SongCard.css'

const SongCard = ({ song, onSelect }) => {
  const handleClick = () => {
    onSelect(song)
  }

  const handleImageError = (e) => {
    // Fallback to a default image if the main image fails
    e.target.src = 'https://picsum.photos/300/300?random=999'
  }

  return (
    <div className="song-card" onClick={handleClick}>
      <div className="song-image-container">
        <img 
          src={song.image || 'https://picsum.photos/300/300?random=999'} 
          alt={song.title}
          className="song-image"
          onError={handleImageError}
        />
        <div className="play-overlay">
          <span className="play-icon">▶️</span>
        </div>
      </div>
      
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.singer}</p>
        
        {song.movie && (
          <p className="song-movie">🎬 {song.movie}</p>
        )}
        
        {song.actor && (
          <p className="song-actor">🎭 {song.actor}</p>
        )}
        
        {song.actress && (
          <p className="song-actress">🎬 {song.actress}</p>
        )}
        
        {song.album && (
          <p className="song-album">💿 {song.album}</p>
        )}
        
        {song.genre && (
          <p className="song-genre">🎼 {song.genre}</p>
        )}
        
        <p className="song-duration">{song.duration}</p>
      </div>
    </div>
  )
}

export default SongCard 