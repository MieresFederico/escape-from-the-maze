import { parseMaze } from "../../utils";
import mazeReducer, { MazeState, setMaze } from "./mazeSlice";

describe("counter reducer", () => {
  const initialState: MazeState = {
    board: [["S"], ["E"]],
    start: null,
    end: null,
  };

  it("should handle initial state", () => {
    expect(mazeReducer(undefined, { type: "unknown" })).toEqual({
      board: null,
      start: null,
      end: null,
    });
  });

  it("should handle setMaze", () => {
    const actual = mazeReducer(
      initialState,
      setMaze(parseMaze("\nXXXX\nXSEX\nXXXX\n"))
    );
    expect(actual.board).toEqual([
      ["X", "X", "X", "X"],
      ["X", "S", "E", "X"],
      ["X", "X", "X", "X"],
    ]);
    expect(actual.start).toEqual({ x: 1, y: 1 });
    expect(actual.end).toEqual({ x: 2, y: 1 });
  });
});
