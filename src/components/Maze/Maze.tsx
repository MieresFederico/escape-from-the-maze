import { Coordinate } from "../../types";
import { areEquals } from "../../utils";
import Cell from "../Cell";
import styles from "./Maze.module.css";

interface Props {
  board: string[][] | null;
  playerPosition: Coordinate | null;
}

const Maze = ({ board, playerPosition }: Props) => {
  return (
    <table className={styles.root}>
      <tbody>
        {board &&
          board.map((row, rowIndex) => (
            <tr key={`${row}-${rowIndex}`}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={`${row}-${rowIndex}-${cell}-${columnIndex}`}
                  cell={cell}
                  isPlayer={areEquals(playerPosition, {
                    x: columnIndex,
                    y: rowIndex,
                  })}
                />
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Maze;
