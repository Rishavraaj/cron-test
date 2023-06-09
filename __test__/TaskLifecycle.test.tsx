import { act, render, screen } from "@testing-library/react";
import TaskLifecycle from "@/components/TaskLifecycle";
import { fetchTaskLifecycle } from "@/api/api";
import {
  TaskLifeCycle,
  TaskLifecycleResourceType,
  Type,
} from "@/models/Company.interface";
import userEvent from "@testing-library/user-event";

jest.mock("@/api/api", () => ({
  fetchTaskLifecycle: jest.fn(),
}));

const mockData = [
  {
    gid: "123",
    resource_subtype: "status1",
    resource_type: TaskLifecycleResourceType.Story,
    created_at: new Date(),
    created_by: {
      gid: "123",
      name: "assignee 1",
      resource_type: "mock 1",
    },
    text: "demo text 1",
    type: Type.Comment,
    previousAssignee: "mock assignee 1",
    assignedTo: "mock assignee 1",
  },
] satisfies TaskLifeCycle[];

describe("TaskLifecycle", () => {
  it("should render Lifecycle of Task heading", async () => {
    (fetchTaskLifecycle as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<TaskLifecycle />);
    expect(await screen.findByText("Lifecycle of Task")).toBeInTheDocument();
  });

  it("should correctly set default All option", async () => {
    (fetchTaskLifecycle as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<TaskLifecycle />);
    const option = (await screen.findByRole("option", {
      name: "All",
    })) as HTMLOptionElement;
    expect(option.selected).toBe(true);
    expect(option.value).toBe("All");
  });

  it("should render 3 options", async () => {
    (fetchTaskLifecycle as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<TaskLifecycle />);
    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(3);
  });

  it("should render correct option value", async () => {
    (fetchTaskLifecycle as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const mockOptions = ["option1", "option2", "option3"];

    render(<TaskLifecycle />);
    const options = (await screen.findAllByRole(
      "option"
    )) as HTMLOptionElement[];
    expect(options.map((option) => option.value));
    const expectedOptions = ["option1", "option2", "option3"];

    expect(mockOptions).toEqual(expectedOptions);
  });

  it("should render User Tasks button", async () => {
    (fetchTaskLifecycle as jest.Mock).mockResolvedValueOnce({ data: mockData });
    render(<TaskLifecycle />);
    expect(await screen.findByText("User Tasks")).toBeInTheDocument();
  });

  it("should render 10 list items", async () => {
    (fetchTaskLifecycle as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<TaskLifecycle />);

    expect(await screen.findAllByRole("listitem")).toHaveLength(10);
  });

  it("should render data from the fetchTaskLifecycle api", async () => {
    (fetchTaskLifecycle as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const result = await fetchTaskLifecycle(`tasks/${mockData[0].gid}/stories`);
    expect(result?.data).toEqual(mockData);
  });
});
