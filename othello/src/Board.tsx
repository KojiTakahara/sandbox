import React from 'react';
import './Board.css';
import Stone from './Stone'; // Import the Stone component

const Board: React.FC = () => {
  // For now, a simple 8x8 grid
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        cells.push(
          <div key={`${i}-${j}`} className="board-cell">
            <Stone color="empty" /> {/* Render an empty stone for now */}
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
