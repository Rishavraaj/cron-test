import { screen, render, act } from "@testing-library/react";
import CompanyCard from "@/components/CompanyCard";
import ProjectSection from "@/components/ProjectSection";
import { fetchProjectSection } from "@/api/api";
import { Details } from "@/models/Company.interface";

jest.mock("@/api/api", () => ({
  fetchProjectSection: jest.fn(),
}));

const mockResponse = [
  {
    gid: "123",
    name: "all section",
    resource_type: "This is a mock section",
  },
  {
    gid: "456",
    name: "all section 1",
    resource_type: "This is a mock section 1",
  },
  {
    gid: "789",
    name: "all section 2",
    resource_type: "This is a mock section 2",
  },
] satisfies Details[];

describe("Project Section component", () => {
  it("should render section heading", async () => {
    (fetchProjectSection as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    render(<ProjectSection />);
    expect(await screen.findByText("All section")).toBeInTheDocument();
  });

  it("should render the project section details received from the API", async () => {
    (fetchProjectSection as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    act(() => {
      render(<CompanyCard items={mockResponse[0]} />);
    });
    const companyDetails = await screen.findByTestId("company-card");

    expect(companyDetails).toBeInTheDocument();
    expect(companyDetails).toHaveTextContent("123");
    expect(companyDetails).toHaveTextContent("all section");
    expect(companyDetails).toHaveTextContent("This is a mock section");
  });

  it("should render mutiple data from the project section api", async () => {
    (fetchProjectSection as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    const result = await fetchProjectSection(`${mockResponse[0].gid}`);
    expect(result?.data).toHaveLength(3);
  });
});
