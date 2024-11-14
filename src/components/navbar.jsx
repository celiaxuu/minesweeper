import React, { useState } from 'react';

function Navbar({ setPage, setDifficulty }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDifficultySelect = (diff) => {
    setDifficulty(diff);
    setPage('game');
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <button onClick={() => setPage('home')}>Home</button>
      <div className="dropdown-container">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="dropdown-toggle"
        >
          Play Game
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={() => handleDifficultySelect('easy')}>Easy</button>
            <button onClick={() => handleDifficultySelect('medium')}>Medium</button>
            <button onClick={() => handleDifficultySelect('hard')}>Hard</button>
          </div>
        )}
      </div>
      <button onClick={() => setPage('rules')}>Rules</button>
    </nav>
  );
}

export default Navbar;