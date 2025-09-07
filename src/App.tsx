import "./App.css";
import Button from "./components/Button";
// import { GoO } from "react-icons/go";
import TicTacToeCell from "./components/TicTacToeCell";
import { useState } from "react";
import {
  findBestNextMove,
  type GameState,
  newGame,
  registerMove,
  getGameStatus,
} from "./lib/GameState";

export type UIGameStatus =
  | "NOT_STARTED"
  | "O_WON"
  | "X_WON"
  | "DRAW"
  | "ONGOING";

function App() {
  const [gameStatus, setGameStatus] = useState<UIGameStatus>("NOT_STARTED");
  const [currentGameState, setCurrentGameState] = useState<GameState | null>(
    null
  );
  const onCellClick = (xpos: 1 | 2 | 3, ypos: 1 | 2 | 3) => {
    if (gameStatus !== "ONGOING") return;
    if (currentGameState === null) {
      throw Error("Invalid Game State");
    }
    const newState = registerMove(currentGameState, [xpos, ypos], "X");
    setCurrentGameState(newState);
    const newGameStatus = getGameStatus(newState);
    if ("status" in newGameStatus) {
      setGameStatus(newGameStatus.status);
    } else {
      setGameStatus(newGameStatus.winner === "X" ? "X_WON" : "O_WON");
    }
    if ("status" in newGameStatus && newGameStatus.status === "ONGOING") {
      const afterAITurn = findBestNextMove(newState);
      const newGameStatus2 = getGameStatus(afterAITurn);
      if ("status" in newGameStatus2) {
        setGameStatus(newGameStatus2.status);
      } else {
        setGameStatus(newGameStatus2.winner === "X" ? "X_WON" : "O_WON");
      }
      setCurrentGameState(afterAITurn);
    }
  };
  const resetGame = () => {
    setGameStatus("NOT_STARTED");
    setCurrentGameState(null);
  };
  return (
    <div>
      <h1 className="text-3xl text-center p-2 mt-5 mb-20 font-semibold">
        Unbeatable Tic Tac Toe!
      </h1>
      <div>
        <p className="text-center text-2xl pb-5">
          {gameStatus === "NOT_STARTED" && (
            <>
              Would you like to go first?
              <Button
                text="Yes"
                onClick={() => {
                  setGameStatus("ONGOING");
                  const game = newGame();
                  game.turn = "X";
                  setCurrentGameState(game);
                }}
              />
              <Button
                text="No"
                onClick={() => {
                  setGameStatus("ONGOING");
                  const game = findBestNextMove(newGame());
                  setCurrentGameState(game);
                }}
              />
            </>
          )}
          {gameStatus === "DRAW" && (
            <>
              Game is Draw! <Button text="Try Again" onClick={resetGame} />{" "}
            </>
          )}
          {gameStatus === "O_WON" && (
            <>
              You Lost! 🥺 <Button text="Try Again" onClick={resetGame} />
            </>
          )}
          {gameStatus === "X_WON" && (
            <>
              You Won! 🎉
              <Button text="Try Again" onClick={resetGame} />
            </>
          )}
          {gameStatus === "ONGOING" && (
            <>{currentGameState?.turn === "O" ? "Thinking..." : "Your turn!"}</>
          )}
        </p>

        <table className="border-stone-950 border-2 border-collapse mx-auto">
          <tbody>
            <tr>
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[0][0]}
                onClick={() => onCellClick(1, 1)}
              />
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[0][1]}
                onClick={() => onCellClick(1, 2)}
              />
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[0][2]}
                onClick={() => onCellClick(1, 3)}
              />
            </tr>
            <tr>
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[1][0]}
                onClick={() => onCellClick(2, 1)}
              />
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[1][1]}
                onClick={() => onCellClick(2, 2)}
              />
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[1][2]}
                onClick={() => onCellClick(2, 3)}
              />
            </tr>
            <tr>
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[2][0]}
                onClick={() => onCellClick(3, 1)}
              />
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[2][1]}
                onClick={() => onCellClick(3, 2)}
              />
              <TicTacToeCell
                gameStatus={gameStatus}
                element={currentGameState?.state[2][2]}
                onClick={() => onCellClick(3, 3)}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
