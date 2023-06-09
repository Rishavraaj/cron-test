import { render, screen } from "@testing-library/react";
import Async from "@/components/Async";

describe("Async Component", () => {
  it("should render the loading text", () => {
    render(<Async isLoading={true} onSuccess={<div>success</div>} />);
    expect(screen.getByText("loading please wait...")).toBeInTheDocument();
  });

  it("should render error text", () => {
    render(<Async isError={true} onSuccess={<div>success</div>} />);
    expect(
      screen.getByText("something went wrong please refresh the page")
    ).toBeInTheDocument();
  });

  it("should render the ReactNode on success", () => {
    render(<Async onSuccess={<div>success</div>} />);
    expect(screen.getByText("success")).toBeInTheDocument();
  });
});
