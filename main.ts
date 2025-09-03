import { newGame, registerMove, showGameState } from "./GameState";

let gameState = newGame();
showGameState(gameState);
gameState = registerMove(gameState, [1, 1], "O");
gameState = registerMove(gameState, [1, 2], "X");
gameState = registerMove(gameState, [1, 3], "O");

showGameState(gameState);
