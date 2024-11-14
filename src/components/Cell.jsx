import React, { useContext } from 'react';
import { GameContext } from '../GameContext';

function Cell({ row, col, cell, placeMines, handleCellClick }) {
  const { gameState, setGameState } = useContext(GameContext);

  const handleRightClick = (e) => {
    e.preventDefault(); 
    if (gameState.gameOver || cell.isRevealed) return;

    const newBoard = gameState.board.map(row => [...row]);
    const currentCell = newBoard[row][col];
    currentCell.isFlagged = !currentCell.isFlagged;
    
    const newFlagsCount = gameState.flagsCount + (currentCell.isFlagged ? 1 : -1);

    setGameState({
      ...gameState,
      board: newBoard,
      flagsCount: newFlagsCount
    });
  };

  const onClick = () => {
    if (gameState.gameOver || cell.isFlagged) return;
    handleCellClick(row, col);
  };

  const cellContent = () => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    return cell.neighborMines;
  };

  return (
    <div
      className={`cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isFlagged ? 'flagged' : ''}`}
      onClick={onClick}
      onContextMenu={handleRightClick}
    >
      {cellContent()}
    </div>
  );
}

export default Cell;