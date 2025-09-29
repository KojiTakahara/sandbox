import Board from './Board';
import './App.css'; // Keep App.css for general styling if needed, or remove if not used.
import './Board.css'; // Import Board.css for board specific styles

function App() {
  // 仮の初期ボード状態（全てempty）
  const initialBoardState: ('black' | 'white' | 'empty')[][] = Array(8).fill(null).map(() => Array(8).fill('empty'));

  return (
    <div className="App">
      <Board boardState={initialBoardState} />
    </div>
  );
}

export default App;
