import {
  generateNextMoves,
  newGame,
  registerMove,
  showGameState,
  findBestNextMove,
} from "./GameState";

let gameState = newGame();
showGameState(gameState);
gameState = registerMove(gameState, [1, 1], "O");
findBestNextMove(gameState);
showGameState(gameState);
