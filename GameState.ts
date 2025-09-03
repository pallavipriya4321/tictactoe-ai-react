type GameCell = "O" | "X" | null;
type GameRow = [GameCell, GameCell, GameCell];
export type GameState = { state: [GameRow, GameRow, GameRow]; turn: "X" | "O" };
export const newGame: () => GameState = () => {
  return {
    state: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    turn: "O",
  };
};

export const showGameState = (gameState: GameState) => {
  const state = gameState.state;
  const replaceNull = (cell: GameCell) => {
    return cell === null ? " " : cell;
  };
  console.log("-----------");

  console.log(
    ` ${replaceNull(state[0][0])} | ${replaceNull(state[0][1])} | ${replaceNull(
      state[0][2]
    )} `
  );
  console.log("-----------");
  console.log(
    ` ${replaceNull(state[1][0])} | ${replaceNull(state[1][1])} | ${replaceNull(
      state[1][2]
    )} `
  );
  console.log("-----------");
  console.log(
    ` ${replaceNull(state[2][0])} | ${replaceNull(state[2][1])} | ${replaceNull(
      state[2][2]
    )} `
  );
  console.log("-----------");
};

export const registerMove = (
  currState: GameState,
  position: [1 | 2 | 3, 1 | 2 | 3],
  move: "X" | "O"
) => {
  const [row, col] = [position[0] - 1, position[1] - 1];
  if (currState.state[row][col] !== null) {
    throw new Error("Invalid Move");
  }

  if (currState.turn !== move) {
    throw new Error("Invalid Move");
  }

  currState.state[row][col] = move;
  return {
    state: [
      [currState.state[0][0], currState.state[0][1], currState.state[0][2]],
      [currState.state[1][0], currState.state[1][1], currState.state[1][2]],
      [currState.state[2][0], currState.state[2][1], currState.state[2][2]],
    ] as [GameRow, GameRow, GameRow],
    turn: (currState.turn === "X" ? "O" : "X") as "X" | "O",
  };
};

export const getGameStatus: (gameState: GameState) =>
  | {
      winner: "X" | "O";
    }
  | { status: "ONGOING" | "DRAW" } = (gameState: GameState) => {
  const state = gameState.state;

  const checkRow = (row: 0 | 1 | 2) => {
    if (
      state[row][0] === state[row][1] &&
      state[row][1] === state[row][2] &&
      state[row][0] !== null
    ) {
      return state[row][0] as "X" | "O";
    }
    return null;
  };
  const checkCol = (col: 0 | 1 | 2) => {
    if (
      state[0][col] === state[1][col] &&
      state[1][col] === state[2][col] &&
      state[0][col] !== null
    ) {
      return state[0][col] as "X" | "O";
    }
  };
  const checkDiag = () => {
    if (
      state[0][0] === state[1][1] &&
      state[1][1] === state[2][2] &&
      state[0][0] !== null
    ) {
      return state[0][0] as "X" | "O";
    }
    if (
      state[0][2] === state[1][1] &&
      state[1][1] === state[2][0] &&
      state[0][2] !== null
    ) {
      return state[0][2] as "X" | "O";
    }
    return null;
  };

  if (checkRow(0) !== null) return { winner: checkRow(0) };
  if (checkRow(1) !== null) return { winner: checkRow(1) };
  if (checkRow(2) !== null) return { winner: checkRow(2) };
  if (checkCol(0) !== null) return { winner: checkCol(0) };
  if (checkCol(1) !== null) return { winner: checkCol(1) };
  if (checkCol(2) !== null) return { winner: checkCol(2) };
  if (checkDiag() !== null) return { winner: checkDiag() };

  if (
    state[0].includes(null) ||
    state[1].includes(null) ||
    state[2].includes(null)
  ) {
    return { status: "ONGOING" };
  }

  return { status: "DRAW" };
};
