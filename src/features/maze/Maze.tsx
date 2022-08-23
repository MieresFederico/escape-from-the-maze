import { useEffect, useMemo } from "react";
import { default as MazeComponent } from "../../components/Maze";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MAZE, parseMaze } from "../../utils";
import { selectPlayerPosition, setPosition } from "../player/playerSlice";
import { selectBoard, setMaze } from "./mazeSlice";

const Maze = () => {
  const dispatch = useAppDispatch();
  const maze = useMemo(() => parseMaze(MAZE), []);
  const board = useAppSelector(selectBoard);
  const playerPosition = useAppSelector(selectPlayerPosition);

  useEffect(() => {
    dispatch(setMaze(maze));
    dispatch(setPosition(maze.start));
  }, [dispatch, maze]);

  return <MazeComponent board={board} playerPosition={playerPosition} />;
};

export default Maze;
