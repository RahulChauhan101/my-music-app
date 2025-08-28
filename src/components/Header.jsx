import React from 'react'
import './Header.css'

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">🎵 My Music</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search songs, artists, movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
      </div>
    </header>
  )
}

export default Header 