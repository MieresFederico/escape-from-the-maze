import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Coordinate } from "../../types";

export interface MazeState {
  board: string[][] | null;
  start: Coordinate | null;
  end: Coordinate | null;
}

const initialState: MazeState = {
  board: null,
  start: null,
  end: null,
};

export const mazeSlice = createSlice({
  name: "maze",
  initialState,
  reducers: {
    setMaze: (_, action: PayloadAction<MazeState>) => action.payload,
  },
});

export default mazeSlice.reducer;
export const { setMaze } = mazeSlice.actions;

export const selectMaze = (state: RootState) => state.maze;
export const selectBoard = (state: RootState) => state.maze.board;
export const selectStart = (state: RootState) => state.maze.start;
export const selectEnd = (state: RootState) => state.maze.end;
export const selectMazeCompleted = (state: RootState) =>
  state.player.position &&
  state.maze.end &&
  state.player.position?.x === state.maze.end?.x &&
  state.player.position?.y === state.maze.end?.y;
