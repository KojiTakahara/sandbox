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

    // ゲーム終了判定と勝者決定ロジックを共通化
    const evaluateGameEnd = (currentBoard: OthelloBoardType) => {
      if (checkGameOver(currentBoard)) {
        setGameOver(true);
        const score = getScore(currentBoard);
        if (score.black > score.white) {
          setWinner('black');
        } else if (score.white > score.black) {
          setWinner('white');
        } else {
          setWinner(null); // Tie
        }
      }
    };

    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';
    const nextPlayerValidMoves = getValidMoves(newBoard, nextPlayer);

    if (nextPlayerValidMoves.length === 0) {
      const otherPlayer = nextPlayer === 'black' ? 'white' : 'black';
      const otherPlayerValidMoves = getValidMoves(newBoard, otherPlayer);
      if (otherPlayerValidMoves.length === 0) {
        // 両プレイヤーとも手がない場合、ゲームオーバー
        evaluateGameEnd(newBoard);
      } else {
        // 現在のプレイヤーは手がないが、相手プレイヤーには手がある場合、相手プレイヤーが再度プレイ
        setCurrentPlayer(otherPlayer);
      }
    } else {
      setCurrentPlayer(nextPlayer);
    }

    // ターン終了後にゲーム終了を評価
    evaluateGameEnd(newBoard);
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
