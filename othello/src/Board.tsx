import React, { useState } from 'react';
import './Board.css';
import Stone from './Stone';
import { initializeBoard, placeStoneAndFlip, isValidMove, getValidMoves, checkGameOver, getScore, type CellState, type Board as OthelloBoardType } from './othelloGame';

const Board: React.FC = () => {
  const [board, setBoard] = useState<OthelloBoardType>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<CellState>('black');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<CellState | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || board[row][col] !== 'empty' || !isValidMove(board, row, col, currentPlayer)) {
      return;
    }

    const newBoard = placeStoneAndFlip(board, row, col, currentPlayer);
    setBoard(newBoard);

    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';
    const nextPlayerValidMoves = getValidMoves(newBoard, nextPlayer);

    if (nextPlayerValidMoves.length === 0) {
      // Current player has no moves, check if other player has moves
      const otherPlayer = nextPlayer === 'black' ? 'white' : 'black';
      const otherPlayerValidMoves = getValidMoves(newBoard, otherPlayer);
      if (otherPlayerValidMoves.length === 0) {
        // Both players have no moves, game over
        setGameOver(true);
        const score = getScore(newBoard);
        if (score.black > score.white) {
          setWinner('black');
        } else if (score.white > score.black) {
          setWinner('white');
        } else {
          setWinner(null); // Tie
        }
      } else {
        // Current player has no moves, but other player does, so other player plays again
        setCurrentPlayer(otherPlayer);
      }
    } else {
      setCurrentPlayer(nextPlayer);
    }

    if (checkGameOver(newBoard)) {
      setGameOver(true);
      const score = getScore(newBoard);
      if (score.black > score.white) {
        setWinner('black');
      } else if (score.white > score.black) {
        setWinner('white');
      } else {
        setWinner(null); // Tie
      }
    }
  };

  const renderCells = () => {
    const cells = [];
    const validMoves = getValidMoves(board, currentPlayer);
    const validMovePositions = new Set(validMoves.map(([r, c]) => `${r}-${c}`));

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const isPossibleMove = validMovePositions.has(`${i}-${j}`);
        cells.push(
          <div
            key={`${i}-${j}`}
            className={`board-cell ${isPossibleMove ? 'possible-move' : ''}`}
            onClick={() => handleCellClick(i, j)}
          >
            <Stone color={board[i][j]} />
            {isPossibleMove && <div className="possible-move-indicator"></div>}
          </div>
        );
      }
    }
    return cells;
  };

  const score = getScore(board);

  return (
    <div className="othello-board-container">
      <h1>Othello Game</h1>
      <div className="game-info">
        <p>Current Player: <span className={`player-indicator ${currentPlayer}`}></span> {currentPlayer.toUpperCase()}</p>
        <p>Black: {score.black} | White: {score.white}</p>
        {gameOver && (
          <div className="game-over-message">
            Game Over! {winner ? `${winner.toUpperCase()} wins!` : 'It\'s a tie!'}
          </div>
        )}
      </div>
      <div className="othello-board">
        {renderCells()}
      </div>
    </div>
  );
};

export default Board;
