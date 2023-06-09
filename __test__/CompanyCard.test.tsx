import { render, screen } from "@testing-library/react";
import CompanyCard from "../components/CompanyCard";

describe("CompanyCard", () => {
  test("should render the 3 listitem", () => {
    render(<CompanyCard />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
  it("should render the company card with data-testid='company-card'", () => {
    render(<CompanyCard />);
    const companyCard = screen.getByTestId("company-card");
    expect(companyCard).toBeInTheDocument();
  });
});
