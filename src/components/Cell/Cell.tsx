import Player from "../../features/player/Player";
import styles from "./Cell.module.css";

interface Props {
  cell?: string;
  isPlayer?: boolean;
}

const Cell = ({ cell = "", isPlayer = false }: Props) => {
  const cellsTypes: Record<string, string> = {
    X: styles.wall,
    S: styles.start,
    E: styles.end,
  };

  return (
    <td data-testid="cell" className={`${styles.root} ${cellsTypes[cell]}`}>
      {isPlayer && <Player />}
    </td>
  );
};

export default Cell;
