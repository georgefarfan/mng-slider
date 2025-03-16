import { render, screen } from "@testing-library/react";
import Exercise2Page from "./page";

describe("Exercise2Page", () => {
  it("renders the heading correctly", () => {
    render(<Exercise2Page />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /Exercise 2/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
