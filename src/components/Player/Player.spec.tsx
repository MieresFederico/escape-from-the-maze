import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Player from "./Player";

describe("Player", () => {
  it("should render", () => {
    render(<Player />);
    const player = screen.getByTestId("player");
    expect(player).toBeInTheDocument();
  });
});
