import styles from "./Player.module.css";

interface Props {
  isWrongMove?: boolean;
}

const Player = ({ isWrongMove = false }: Props) => {
  return (
    <div
      data-testid="player"
      className={`${styles.root} ${isWrongMove && styles.shake}`}
    />
  );
};

export default Player;
