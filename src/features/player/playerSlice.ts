import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Coordinate } from "../../types";
import { postMoveCount } from "./playerAPI";

export const moveCountReport = createAsyncThunk(
  "player/moveCountReport",
  async (amount: number) => {
    const response = await postMoveCount(amount);
    return response.data;
  }
);

export interface PlayerState {
  position: Coordinate | null;
  moveCounter: number;
  moveCountReportStatus: string | null;
}

const initialState: PlayerState = {
  position: null,
  moveCounter: 0,
  moveCountReportStatus: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<Coordinate>) => {
      state.position = action.payload;
    },
    moveCounterIncrement: (state) => {
      state.moveCounter += 1;
    },
    moveCounterRestart: (state) => {
      state.moveCounter = 0;
      state.moveCountReportStatus = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(moveCountReport.pending, (state) => {
        state.moveCountReportStatus = "We are sharing your moves..";
      })
      .addCase(moveCountReport.rejected, (state) => {
        state.moveCountReportStatus = "We had an error sharing your moves";
      })
      .addCase(moveCountReport.fulfilled, (state) => {
        state.moveCountReportStatus = "We shared your moves successfully";
      }),
});

export default playerSlice.reducer;

export const { setPosition, moveCounterIncrement, moveCounterRestart } =
  playerSlice.actions;

export const selectPlayerPosition = (state: RootState) => state.player.position;
export const selectPlayerMoveCount = (state: RootState) =>
  state.player.moveCounter;
export const selectMoveCountReportStatus = (state: RootState) =>
  state.player.moveCountReportStatus;
