import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import Cell from './Cell';

function Board({ placeMines, handleCellClick }) {
  const { gameState } = useContext(GameContext);

  return (
    <div className="board">
      {gameState.board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              cell={cell}
              placeMines={placeMines}
              handleCellClick={handleCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;