import React from "react";
import "./Header.css";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="app-header">
      <h1>My Music App</h1>
      <input
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </header>
  );
};

export default Header;
