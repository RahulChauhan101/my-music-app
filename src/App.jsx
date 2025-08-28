import { useState, useEffect } from 'react'
import './App.css'
import MusicPlayer from './components/MusicPlayer'
import MusicLibrary from './components/MusicLibrary'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSongSelect = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
  }

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="main-content">
        <Sidebar 
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
        />
        <MusicLibrary 
          currentCategory={currentCategory}
          searchQuery={searchQuery}
          onSongSelect={handleSongSelect}
        />
      </div>
      {currentSong && (
        <MusicPlayer 
          song={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}
    </div>
  )
}

export default App
