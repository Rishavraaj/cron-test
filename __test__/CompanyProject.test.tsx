import { fetchAsanaApi } from "@/api/api";
import { Details } from "@/models/Company.interface";
import ComapnyProjects from "@/components/ComapnyProjects";
import { render, screen } from "@testing-library/react";
import CompanyCard from "@/components/CompanyCard";
import { act } from "react-dom/test-utils";

jest.mock("@/api/api", () => ({
  fetchAsanaApi: jest.fn(),
}));

const mockResponse = [
  {
    gid: "123",
    name: "Mock Company",
    resource_type: "This is a mock company",
  },
  {
    gid: "456",
    name: "Mock Company 1",
    resource_type: "This is a mock company 1",
  },
  {
    gid: "789",
    name: "Mock Company 2",
    resource_type: "This is a mock company 2",
  },
] satisfies Details[];

describe("Fetching asana API", () => {
  it("should fetch data from Asana API and return it", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    const result = await fetchAsanaApi("workspaces/1187384491238753/projects");
    expect(result?.data).toEqual(mockResponse);
  });

  it("should render mutiple data from the project api", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    const result = await fetchAsanaApi("workspaces/1187384491238753/projects");
    expect(result?.data).toHaveLength(3);
  });
});

describe("Company Project Component", () => {
  it("should render project heading", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    render(<ComapnyProjects />);
    expect(await screen.findByText("our Projects")).toBeInTheDocument();
  });

  it("should render home button", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    render(<ComapnyProjects />);
    expect(await screen.findByText("Home")).toBeInTheDocument();
  });

  it("should render company cards when data is fetched successfully", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    act(() => {
      render(<CompanyCard />);
    });
    expect(await screen.findAllByTestId("company-card")).toHaveLength(1);
    expect(fetchAsanaApi).toHaveBeenCalledTimes(4);
    expect(fetchAsanaApi).toHaveBeenCalledWith(
      "workspaces/1187384491238753/projects"
    );
  });

  it("should render the company details received from the API", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    act(() => {
      render(<CompanyCard items={mockResponse[0]} />);
    });
    const companyDetails = await screen.findByTestId("company-card");

    expect(companyDetails).toBeInTheDocument();
    expect(companyDetails).toHaveTextContent("123");
    expect(companyDetails).toHaveTextContent("Mock Company");
    expect(companyDetails).toHaveTextContent("This is a mock company");
  });

  it("should render company projects when data is fetched successfully", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    render(<ComapnyProjects />);
    await screen.findAllByTestId("company-card");
    expect(screen.getAllByTestId("company-card")).toHaveLength(3);
  });

  it("should render the project details received from the API", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    render(<ComapnyProjects />);
    await screen.findAllByTestId("company-card");
    const companyCards = screen.getAllByTestId("company-card");

    expect(companyCards).toHaveLength(3);
    expect(companyCards[0]).toHaveTextContent("123");
    expect(companyCards[0]).toHaveTextContent("Mock Company");
    expect(companyCards[0]).toHaveTextContent("This is a mock company");
  });
});
