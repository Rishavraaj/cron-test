import { render, screen } from "@testing-library/react";
import ProjectDetails from "@/components/ProjectDetails";
import { fetchProjectData } from "@/api/api";
import { ProjectData } from "@/models/Company.interface";

jest.mock("@/api/api", () => ({
  fetchProjectData: jest.fn(),
}));

const mockResponse = {
  gid: "123",
  name: "Mock Company",
  resource_type: "This is a mock company",
  created_at: new Date(),
  modified_at: new Date(),
  notes: "training",
  default_view: "training view",
  completed: false,
  color: "light orange",
} satisfies ProjectData;

describe("Project Details", () => {
  it("should render project heading", async () => {
    (fetchProjectData as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    render(<ProjectDetails />);
    expect(
      await screen.findByText(`Project details of : ${mockResponse.name}`)
    ).toBeInTheDocument();
  });

  it("should render the projects button", async () => {
    (fetchProjectData as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    render(<ProjectDetails />);
    expect(await screen.findByText("Projects")).toBeInTheDocument();
  });

  it("should render home button", async () => {
    (fetchProjectData as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    render(<ProjectDetails />);
    expect(await screen.findByText("Home")).toBeInTheDocument();
  });

  it("should render 9 list items", async () => {
    (fetchProjectData as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    render(<ProjectDetails />);
    expect(await screen.findAllByRole("listitem")).toHaveLength(9);
  });

  it("should fetch data of project Details and return it", async () => {
    (fetchProjectData as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    const result = await fetchProjectData(`projects/${mockResponse.gid}`);
    expect(result?.data).toEqual(mockResponse);
  });
});
