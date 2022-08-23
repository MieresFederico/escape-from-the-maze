import { useState, useEffect, useCallback } from "react";
import { default as PlayerComponent } from "../../components/Player";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getNextPosition, isArrowKey, isValidPosition } from "../../utils";
import { selectBoard, selectMazeCompleted } from "../maze/mazeSlice";
import {
  moveCounterIncrement,
  selectPlayerPosition,
  setPosition,
} from "./playerSlice";

const Player = () => {
  const dispatch = useAppDispatch();
  const [isWrongMove, setIsWrongMove] = useState(false);
  const playerPosition = useAppSelector(selectPlayerPosition);
  const board = useAppSelector(selectBoard);
  const isMazeCompleted = useAppSelector(selectMazeCompleted);

  const handleMove = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      let nextPosition;

      if (isArrowKey(key) && playerPosition && board) {
        nextPosition = getNextPosition(key, playerPosition);
        if (isValidPosition(board, nextPosition)) {
          dispatch(setPosition(nextPosition));
          dispatch(moveCounterIncrement());
        } else {
          setIsWrongMove(true);
          setTimeout(() => setIsWrongMove(false), 200);
        }
      }
    },
    [dispatch, playerPosition, board]
  );

  useEffect(() => {
    if (!isMazeCompleted) {
      document.addEventListener("keydown", handleMove);
      return () => {
        document.removeEventListener("keydown", handleMove);
      };
    }
  }, [handleMove, isMazeCompleted]);

  return <PlayerComponent isWrongMove={isWrongMove} />;
};

export default Player;
