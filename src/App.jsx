import React, { useState } from 'react';
import { GameProvider } from './GameContext';
import Game from './components/Game';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [difficulty, setDifficulty] = useState('easy');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'game':
        return <Game difficulty={difficulty} />;
      case 'rules':
        return (
          <div className="rule">
            <h1>How to Play Minesweeper</h1>
            <h2>Here are the basic rules to get you started:</h2>
            <div className='content'>
              <p>Left click to reveal a cell.</p>
              <p>Right click to place/remove a flag.</p>
              <p>Numbers show how many mines are adjacent to that cell.</p>
              <p>Avoid clicking on mines.</p>
              <p>Find all safe cells to win.</p>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <GameProvider>
      <div className="app-container">
        <Navbar setPage={setCurrentPage} setDifficulty={setDifficulty} />
        {renderPage()}
      </div>
    </GameProvider>
  );
}

export default App;