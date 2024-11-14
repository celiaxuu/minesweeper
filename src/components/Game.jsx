import React, { useEffect, useContext } from 'react';
import { GameContext } from '../GameContext';
import Board from './Board';

function Game({ difficulty }) {
  const { gameState, setGameState } = useContext(GameContext);

  const configs = {
    easy: { rows: 8, cols: 8, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 30, cols: 30, mines: 99 }
  };

  const createEmptyBoard = (rows, cols) => {
    return Array(rows).fill().map(() => 
      Array(cols).fill().map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false, 
        neighborMines: 0
      }))
    );
  };

  const calculateNeighborMines = (board, rows, cols) => {
    const newBoard = board.map(row => [...row]);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;
              if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                newBoard[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].neighborMines = count;
        }
      }
    }
    return newBoard;
  };

  const placeMines = (board, rows, cols, mines, firstRow, firstCol) => {
    const newBoard = board.map(row => row.map(cell => ({
      ...cell,
      isMine: false,
      neighborMines: 0
    })));
    
    let minesPlaced = 0;
    const safeZone = [];
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const safeRow = firstRow + i;
        const safeCol = firstCol + j;
        if (safeRow >= 0 && safeRow < rows && safeCol >= 0 && safeCol < cols) {
          safeZone.push(`${safeRow},${safeCol}`);
        }
      }
    }

    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      const pos = `${row},${col}`;

      if (!safeZone.includes(pos) && !newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    return calculateNeighborMines(newBoard, rows, cols);
  };

  const initializeBoard = () => {
    const config = configs[difficulty];
    return createEmptyBoard(config.rows, config.cols);
  };

  useEffect(() => {
    const config = configs[difficulty];
    const board = initializeBoard();
    setGameState({
      ...gameState,
      board: board,
      gameOver: false,
      win: false,
      firstMove: true,
      flagsCount: 0,
      totalMines: config.mines,
      difficulty: difficulty,
      rows: config.rows,
      cols: config.cols
    });
  }, [difficulty]);

  const resetGame = () => {
    const config = configs[difficulty];
    const board = initializeBoard();
    setGameState({
      ...gameState,
      board: board,
      gameOver: false,
      win: false,
      firstMove: true,
      flagsCount: 0,
      totalMines: config.mines
    });
  };

  const handleCellClick = (row, col) => {
    if (gameState.firstMove) {
      const config = configs[difficulty];
      const boardWithMines = placeMines(
        gameState.board,
        config.rows,
        config.cols,
        gameState.totalMines,
        row,
        col
      );

      boardWithMines[row][col].isRevealed = true;

      setGameState({
        ...gameState,
        board: boardWithMines,
        firstMove: false
      });
    } else {
      const newBoard = [...gameState.board.map(row => [...row])];
      const cell = newBoard[row][col];

      if (!cell.isRevealed && !cell.isFlagged) {
        cell.isRevealed = true;

        if (cell.isMine) {
          newBoard.forEach(row => row.forEach(cell => {
            if (cell.isMine) {
              cell.isRevealed = true;
            }
          }));

          setGameState({
            ...gameState,
            board: newBoard,
            gameOver: true,
            win: false
          });
        } else {
          const unrevealed = newBoard.flat().filter(
            cell => !cell.isRevealed && !cell.isMine
          ).length;

          setGameState({
            ...gameState,
            board: newBoard,
            gameOver: unrevealed === 0,
            win: unrevealed === 0
          });
        }
      }
    }
  };

  return (
    <div className="game">
      <div className="game-header">
        <h2>Minesweeper - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="game-info">
          <span>Flags placed: {gameState.flagsCount}</span>
          <span>Total mines: {gameState.totalMines}</span>
          <button onClick={resetGame}>Reset Game</button>
        </div>
        {gameState.gameOver && (
          <h3>{gameState.win ? "Game over! You Won!" : "Game over! You lost!"}</h3>
        )}
      </div>
      <div className='border-container'>
        <div className={`board ${difficulty}`}>
          <Board 
            placeMines={placeMines} 
            handleCellClick={handleCellClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;