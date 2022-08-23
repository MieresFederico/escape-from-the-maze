import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

const Button = ({ onClick, children }: Props) => {
  return (
    <button className={styles.root} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
