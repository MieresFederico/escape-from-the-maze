import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Cell from "./Cell";
import styles from "./Cell.module.css";

describe("Cell", () => {
  it("should render", () => {
    render(<Cell />);
    const cell = screen.getByTestId("cell");
    expect(cell).toBeInTheDocument();
  });

  it("should render the wall", () => {
    render(<Cell cell="X" />);
    const cell = screen.getByTestId("cell");
    expect(cell).toHaveClass(styles.wall);
  });

  it("should render the start", () => {
    render(<Cell cell="S" />);
    const cell = screen.getByTestId("cell");
    expect(cell).toHaveClass(styles.start);
  });

  it("should render the end", () => {
    render(<Cell cell="E" />);
    const cell = screen.getByTestId("cell");
    expect(cell).toHaveClass(styles.end);
  });

  it("should render the empty cell", () => {
    render(<Cell />);
    const cell = screen.getByTestId("cell");
    expect(cell).toHaveClass(styles.root);
  });
});
