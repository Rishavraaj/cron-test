import { render, screen } from "@testing-library/react";
import { fetchProjectTasks } from "@/api/api";
import ProjectTask from "@/components/ProjectTask";
import { ProjectTasks } from "@/models/Company.interface";

jest.mock("@/api/api", () => ({
  fetchProjectTasks: jest.fn(),
}));

const mockResponse = [
  {
    gid: "123",
    name: "task",
    resource_type: "This is task",
    resource_subtype: "subtype",
  },
  {
    gid: "456",
    name: "task 1",
    resource_type: "This is task 1",
    resource_subtype: "subtype 1",
  },
  {
    gid: "789",
    name: "task 2",
    resource_type: "This is task 2",
    resource_subtype: "subtype 2",
  },
] satisfies ProjectTasks[];

describe("Project Task Component", () => {
  it("should render all task heading", async () => {
    (fetchProjectTasks as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    render(<ProjectTask />);
    expect(await screen.findByText("All Tasks")).toBeInTheDocument();
  });

  it("should render data in the document", async () => {
    (fetchProjectTasks as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    render(<ProjectTask />);
    expect(await screen.findByText("123")).toBeInTheDocument();
    expect(await screen.findByText("task")).toBeInTheDocument();
    expect(await screen.findByText("This is task")).toBeInTheDocument();
    expect(await screen.findByText("subtype")).toBeInTheDocument();
  });

  it("should render mutiple data from the project tasks api", async () => {
    (fetchProjectTasks as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });
    const result = await fetchProjectTasks(`${mockResponse[0].gid}`);
    expect(result?.data).toHaveLength(3);
  });
});
