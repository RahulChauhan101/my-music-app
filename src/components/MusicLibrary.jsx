import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SongCard from './SongCard'
import './MusicLibrary.css'

const MusicLibrary = ({ currentCategory, searchQuery, onSongSelect }) => {
  const [allSongs, setAllSongs] = useState([])
  const [filteredSongs, setFilteredSongs] = useState([])

  // ✅ Fetch songs from backend API using axios
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/music")
        setAllSongs(res.data)
      } catch (err) {
        console.error("Error fetching songs:", err)
      }
    }
    fetchSongs()
  }, [])

  // ✅ Filtering (category + search)
  useEffect(() => {
    let songs = [...allSongs]

    if (currentCategory !== 'all') {
      if (currentCategory === 'singer') {
        songs = songs.filter(song => song.singer)
      } else if (currentCategory === 'actor') {
        songs = songs.filter(song => song.actor)
      } else if (currentCategory === 'actress') {
        songs = songs.filter(song => song.actress)
      } else if (currentCategory === 'movie') {
        songs = songs.filter(song => song.movie)
      } else if (currentCategory === 'album') {
        songs = songs.filter(song => song.album)
      } else if (currentCategory === 'genre') {
        songs = songs.filter(song => song.genre)
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      songs = songs.filter(song =>
        song.title?.toLowerCase().includes(query) ||
        song.singer?.toLowerCase().includes(query) ||
        song.actor?.toLowerCase().includes(query) ||
        song.actress?.toLowerCase().includes(query) ||
        song.movie?.toLowerCase().includes(query) ||
        song.album?.toLowerCase().includes(query) ||
        song.genre?.toLowerCase().includes(query)
      )
    }

    setFilteredSongs(songs)
  }, [allSongs, currentCategory, searchQuery])

  const getCategoryTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`
    
    const categoryNames = {
      all: 'All Songs',
      singer: 'Singer Songs',
      actor: 'Actor Songs',
      actress: 'Actress Songs',
      movie: 'Movie Songs',
      album: 'Album Songs',
      genre: 'Genre Songs'
    }
    return categoryNames[currentCategory] || 'All Songs'
  }

  return (
    <main className="music-library">
      <div className="library-header">
        <h2 className="library-title">{getCategoryTitle()}</h2>
        <span className="song-count">{filteredSongs.length} songs</span>
      </div>

      {filteredSongs.length === 0 ? (
        <div className="no-results">
          <p>No songs found. Try adjusting your search or category.</p>
        </div>
      ) : (
        <div className="songs-grid">
          {filteredSongs.map((song) => (
            <SongCard 
              key={song._id}   // ✅ MongoDB _id
              song={song} 
              onSelect={onSongSelect}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default MusicLibrary
