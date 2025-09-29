
export type CellState = 'empty' | 'black' | 'white';
export type Board = CellState[][];

export const initializeBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill('empty'));
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  return board;
};

export const getOpponent = (player: CellState): CellState => {
  if (player === 'black') return 'white';
  if (player === 'white') return 'black';
  // 発生しないはずのケースだが、念のためエラーをスローして早期発見を促す
  throw new Error(`Invalid player state: ${player}`); 
};

// Directions for checking flips
const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1], [1, 0], [1, 1],
];

export const isValidMove = (board: Board, row: number, col: number, player: CellState): boolean => {
  if (board[row][col] !== 'empty') return false;

  const opponent = getOpponent(player);

  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    let hasOpponentStone = false;

    while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opponent) {
      r += dr;
      c += dc;
      hasOpponentStone = true;
    }

    if (hasOpponentStone && r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === player) {
      return true;
    }
  }
  return false;
};

export const getFlippedStones = (board: Board, row: number, col: number, player: CellState): [number, number][] => {
  const flipped: [number, number][] = [];
  const opponent = getOpponent(player);

  for (const [dr, dc] of directions) {
    const stonesToFlipInDirection: [number, number][] = [];
    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opponent) {
      stonesToFlipInDirection.push([r, c]);
      r += dr;
      c += dc;
    }

    if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === player) {
      flipped.push(...stonesToFlipInDirection);
    }
  }
  return flipped;
};

export const placeStoneAndFlip = (board: Board, row: number, col: number, player: CellState): Board => {
  const newBoard = board.map(row => [...row]); // Deep copy
  newBoard[row][col] = player;

  const flippedStones = getFlippedStones(newBoard, row, col, player);
  for (const [r, c] of flippedStones) {
    newBoard[r][c] = player;
  }
  return newBoard;
};

export const getValidMoves = (board: Board, player: CellState): [number, number][] => {
  const validMoves: [number, number][] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (isValidMove(board, r, c, player)) {
        validMoves.push([r, c]);
      }
    }
  }
  return validMoves;
};

export const checkGameOver = (board: Board): boolean => {
  const blackMoves = getValidMoves(board, 'black');
  const whiteMoves = getValidMoves(board, 'white');

  return blackMoves.length === 0 && whiteMoves.length === 0;
};

export const getScore = (board: Board): { black: number; white: number } => {
  let black = 0;
  let white = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === 'black') {
        black++;
      } else if (board[r][c] === 'white') {
        white++;
      }
    }
  }
  return { black, white };
};
