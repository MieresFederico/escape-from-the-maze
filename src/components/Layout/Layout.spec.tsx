import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  it("should render", () => {
    render(<Layout>example</Layout>);
    const layout = screen.getByText("example");
    expect(layout).toBeInTheDocument();
  });
});
