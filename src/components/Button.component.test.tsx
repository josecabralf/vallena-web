import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button.component";

describe("Button component", () => {
  it("renders with the correct title", () => {
    render(<Button title="Click me" onClick={vi.fn()} />);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button title="Click me" onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(<Button title="Disabled" onClick={handleClick} disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows spinner when isLoading is true", () => {
    render(<Button title="Loading" onClick={vi.fn()} isLoading />);
    expect(screen.getByRole("button").querySelector(".ant-spin")).toBeInTheDocument();
  });
});
