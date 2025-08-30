import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Songs', icon: '🎵' },
    { id: 'singer', name: 'Singers', icon: '🎤' },
    { id: 'actor', name: 'Actors', icon: '🎭' },
    { id: 'actress', name: 'Actresses', icon: '🎬' },
    { id: 'movie', name: 'Movies', icon: '🎬' },
    { id: 'album', name: 'Albums', icon: '💿' },
    { id: 'genre', name: 'Genres', icon: '🎼' },
    { id: 'playlist', name: 'Playlists', icon: '📝' },
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    { id: 'recent', name: 'Recently Played', icon: '⏰' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`category-button ${currentCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange({ id: category.id, name: category.name })}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
