import {
  generateNextMoves,
  newGame,
  registerMove,
  showGameState,
} from "./GameState";

let gameState = newGame();
showGameState(gameState);
gameState = registerMove(gameState, [1, 1], "O");
generateNextMoves(gameState).forEach((s) => showGameState(s));
// showGameState(gameState);
