import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage Component", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("renders the correct number of links", () => {
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  it("renders the correct link text and href", () => {
    const exercise1Link = screen.getByRole("link", { name: "Exercise 1" });
    const exercise2Link = screen.getByRole("link", { name: "Exercise 2" });

    expect(exercise1Link).toHaveAttribute("href", "/exercise1");
    expect(exercise2Link).toHaveAttribute("href", "/exercise2");
  });

  it("renders the list with the correct class", () => {
    const list = screen.getByRole("list");
    expect(list).toHaveClass("list");
  });
});
