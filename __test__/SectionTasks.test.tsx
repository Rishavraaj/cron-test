import { render, screen } from "@testing-library/react";
import SectionTasks from "@/components/SectionTasks";
import { fetchSectionTasks } from "@/api/api";
import { SectionTaskDetails } from "@/models/Company.interface";

jest.mock("@/api/api", () => ({
  fetchSectionTasks: jest.fn(),
}));

const IncompletemockData = [
  {
    gid: "123",
    name: "mock",
    resource_type: "mock test",
    resource_subtype: "mock test subtype",
    due_on: new Date(),
    completed: false,
    custom_fields: [],
  },
] satisfies SectionTaskDetails[];

const CompletemockData = [
  {
    gid: "123",
    name: "mock",
    resource_type: "mock test",
    resource_subtype: "mock test subtype",
    due_on: new Date(),
    completed: true,
    custom_fields: [],
  },
] satisfies SectionTaskDetails[];

describe("Section Tasks", () => {
  it('should render heading "Incompleted Tasks beyond due date" when data is avliable', async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: IncompletemockData,
    });

    render(<SectionTasks />);

    expect(
      await screen.findByText("Incompleted Tasks beyond due date")
    ).toBeInTheDocument();
  });

  it('should render heading "No incomplete tasks beyond the due date in section" when data is empty', async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: CompletemockData,
    });

    render(<SectionTasks sectionName="demo test" />);

    expect(
      await screen.findByText(
        `No incomplete tasks beyond the due date in section demo test`
      )
    ).toBeInTheDocument();
  });

  it("should render Projects button", async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: IncompletemockData,
    });

    render(<SectionTasks />);

    expect(await screen.findByText("Projects")).toBeInTheDocument();
  });

  it("should render 3 li tags", async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: IncompletemockData,
    });

    render(<SectionTasks />);

    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  });

  it("should render data from the fetchSectionTasks api when we have Incomplete Task", async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: IncompletemockData,
    });
    const result = await fetchSectionTasks({
      limit: "50",
      section: IncompletemockData[0].gid,
      opt_fields: "completed,due_on,name,resource_subtype",
    });

    expect(result?.data).toEqual(IncompletemockData);
  });

  it("should not render data from the fetchSectionTasks api when we have Completed Task", async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: CompletemockData,
    });

    const result = await fetchSectionTasks({
      limit: "50",
      section: CompletemockData[0].gid,
      opt_fields: "completed,due_on,name,resource_subtype",
    });

    expect(result).toEqual(result);
  });

  it("should correctly render data in the document", async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: IncompletemockData,
    });
    render(<SectionTasks />);
    expect(
      await screen.findByText(IncompletemockData[0].gid)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(IncompletemockData[0].name)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(IncompletemockData[0].resource_subtype)
    ).toBeInTheDocument();
  });
});
