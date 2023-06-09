import { act, render, screen } from "@testing-library/react";
import { fetchAsanaApi } from "@/api/api";
import CompanyDetails from "@/components/CompanyDetail";
import { Details } from "@/models/Company.interface";

jest.mock("@/api/api", () => ({
  fetchAsanaApi: jest.fn(),
}));
const mockData = [
  {
    gid: "1234",
    name: "company",
    resource_type: "demo source",
  },
] satisfies Details[];

describe("CompanyDetails Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state when data is being fetched", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce({ data: mockData });
    act(() => {
      render(<CompanyDetails />);
    });
    expect(screen.getByText("loading please wait...")).toBeInTheDocument();
    expect(fetchAsanaApi).toHaveBeenCalledTimes(1);
    expect(fetchAsanaApi).toHaveBeenCalledWith("workspaces");
  });

  it("should render error state when data fetching fails", async () => {
    (fetchAsanaApi as jest.Mock).mockResolvedValueOnce(null);
    act(() => {
      render(<CompanyDetails />);
    });
    expect(
      await screen.findByText("something went wrong please refresh the page")
    ).toBeInTheDocument();
    expect(fetchAsanaApi).toHaveBeenCalledTimes(1);
    expect(fetchAsanaApi).toHaveBeenCalledWith("workspaces");
  });
});
