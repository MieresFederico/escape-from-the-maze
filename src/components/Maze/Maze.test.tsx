import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { getWayToEnd, parseMaze } from "../../utils";
import Maze from "./Maze";

const MAZE = `
XXXX
XSEX
XXXX
`;

describe("Maze", () => {
  it("should render", () => {
    const { board, start } = parseMaze(MAZE);

    render(
      <Provider store={store}>
        <Maze board={board} playerPosition={start} />
      </Provider>
    );

    const maze = screen.getAllByTestId("cell");

    expect(maze).toHaveLength(board.length * board[0].length);
  });

  it("should resolve the maze", () => {
    const { board, start, end } = parseMaze(MAZE);
    const reachEnd = getWayToEnd(board, start, end);

    const expected = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];

    expect(reachEnd).toMatchObject(expected);
  });
});
