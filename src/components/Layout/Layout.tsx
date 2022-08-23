import { ReactNode } from "react";
import styles from "./Layout.module.css";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav>Escape from the maze</nav>
      </header>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>
        <div>
          Developed by Federico Mieres (
          <a
            href="mailto:mieresfederico92@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            mieresfederico92@gmail.com
          </a>
          )
        </div>
      </footer>
    </div>
  );
}

export default Layout;
