import React from 'react';
import './Board.css';
import Stone from './Stone';

interface BoardProps {
  boardState: ('black' | 'white' | 'empty')[][];
}

const Board: React.FC<BoardProps> = ({ boardState }) => {
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[i].length; j++) {
        cells.push(
          <div key={`${i}-${j}`} className="board-cell">
            <Stone color={boardState[i][j]} />
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="othello-board-container">
      <div className="othello-board">
        {renderCells()}
      </div>
    </div>
  );
};

export default Board;
