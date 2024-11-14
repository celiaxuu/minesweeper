import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    difficulty: 'easy',
    board: [],
    gameOver: false,
    win: false,
    firstMove: true,  
    flagsCount: 0,    
    totalMines: 10
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
}