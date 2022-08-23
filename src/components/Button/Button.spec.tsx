import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("should render", () => {
    render(<Button onClick={() => {}}>button</Button>);
    const button = screen.getByText("button");
    expect(button).toBeInTheDocument();
  });

  it("should call only one time", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>button</Button>);
    fireEvent.click(screen.getByText("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
