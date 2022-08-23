import Layout from "./components/Layout";
import Maze from "./features/maze/Maze";
import styles from "./App.module.css";
import Button from "./components/Button";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  moveCounterRestart,
  moveCountReport,
  selectMoveCountReportStatus,
  selectPlayerMoveCount,
  setPosition,
} from "./features/player/playerSlice";
import { selectMaze, selectMazeCompleted } from "./features/maze/mazeSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { getWayToEnd } from "./utils";
import { Coordinate } from "./types";

function App() {
  const dispatch = useAppDispatch();
  const [usedSolution, setUsedSolution] = useState(false);
  const [noSolution, setNoSolution] = useState(false);
  const intervalRef = useRef<any>();
  const { board, start, end } = useAppSelector(selectMaze);
  const moves = useAppSelector(selectPlayerMoveCount);
  const isMazeCompleted = useAppSelector(selectMazeCompleted);
  const moveCountReportStatus = useAppSelector(selectMoveCountReportStatus);

  useEffect(() => {
    if (isMazeCompleted && !usedSolution) {
      dispatch(moveCountReport(moves));
    }
  }, [dispatch, moves, isMazeCompleted, usedSolution]);

  const handleRestart = useCallback(() => {
    if (start) dispatch(setPosition(start));
    dispatch(moveCounterRestart());
    setUsedSolution(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [dispatch, start]);

  const handleSolution = useCallback(() => {
    if (board && start && end && !intervalRef.current && !noSolution) {
      const coordinatesToEnd = getWayToEnd(board, start, end);

      if (!coordinatesToEnd) {
        setNoSolution(true);
        return;
      }

      setUsedSolution(true);
      intervalRef.current = window.setInterval(() => {
        if (!coordinatesToEnd.length) {
          clearInterval(intervalRef.current);
          return;
        }
        dispatch(setPosition(coordinatesToEnd.shift() as Coordinate));
      }, 200);
    }
  }, [dispatch, board, start, end, noSolution]);

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.actions}>
          <Button onClick={handleRestart}>Restart</Button>
          <Button onClick={handleSolution}>Solution</Button>
        </div>
        <p
          className={`${styles.textCentered} ${
            (isMazeCompleted || usedSolution) && styles.hidden
          }`}
        >{`Movements: ${moves}`}</p>
        <Maze />
        {noSolution && <p>CAN'T SOLVE</p>}
        {isMazeCompleted &&
          (!usedSolution ? (
            <>
              <p>YOU WIN!</p>
              <p>You escaped in {moves} movements!</p>
              <p>{moveCountReportStatus}</p>
            </>
          ) : (
            <p>Restart and do it by yourself</p>
          ))}
      </div>
    </Layout>
  );
}

export default App;
