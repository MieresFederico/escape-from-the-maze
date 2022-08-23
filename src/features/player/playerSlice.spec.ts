import playerReducer, {
  PlayerState,
  setPosition,
  moveCounterIncrement,
  moveCounterRestart,
} from "./playerSlice";

describe("counter reducer", () => {
  const initialState: PlayerState = {
    position: { x: 0, y: 0 },
    moveCounter: 0,
    moveCountReportStatus: null,
  };
  it("should handle initial state", () => {
    expect(playerReducer(undefined, { type: "unknown" })).toEqual({
      position: null,
      moveCounter: 0,
      moveCountReportStatus: null,
    });
  });

  it("should handle setPosition", () => {
    const actual = playerReducer(initialState, setPosition({ x: 1, y: 1 }));
    expect(actual.position).toEqual({ x: 1, y: 1 });
  });

  it("should handle moveCounterIncrement", () => {
    const actual = playerReducer(initialState, moveCounterIncrement());
    expect(actual.moveCounter).toEqual(1);
  });

  it("should handle moveCounterRestart", () => {
    const actual = playerReducer(initialState, moveCounterRestart());
    expect(actual.moveCounter).toEqual(0);
  });
});
