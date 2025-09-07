import { expect, test } from "bun:test";
import { getGameStatus, type GameState } from "./GameState";

test("win column", () => {
  const gameState: GameState = {
    state: [
      ["O", "X", null],
      ["O", "X", null],
      ["O", "O", "X"],
    ],
    turn: "O",
  };
  const status = getGameStatus(gameState);
  expect("status" in status).toBeFalse();
  if ("winner" in status) {
    expect(status.winner).toBe("O");
  } else {
    throw Error("Fail");
  }
});

test("win row", () => {
  const gameState: GameState = {
    state: [
      ["O", "X", null],
      ["X", "X", null],
      ["O", "O", "O"],
    ],
    turn: "O",
  };
  const status = getGameStatus(gameState);

  expect("status" in status).toBeFalse();
  if ("winner" in status) {
    expect(status.winner).toBe("O");
  } else {
    throw Error("Fail");
  }
});

test("win diag", () => {
  const gameState: GameState = {
    state: [
      ["O", "X", null],
      ["O", "O", null],
      ["X", "X", "O"],
    ],
    turn: "X",
  };
  const status = getGameStatus(gameState);

  expect("status" in status).toBeFalse();
  if ("winner" in status) {
    expect(status.winner).toBe("O");
  } else {
    throw Error("Fail");
  }
});
