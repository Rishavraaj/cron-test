import { render, screen, waitFor, within } from "@testing-library/react";
import AllTasks from "@/components/AllTasks";
import userEvent from "@testing-library/user-event";
import { ProjectTasks } from "@/models/Company.interface";
import * as api from "@/api/api";

import { Details } from "@/models/Company.interface";
import { act } from "react-dom/test-utils";
import { CustomField } from "@/models/Company.interface";

jest.mock("@/api/api");

const mockTaskData = [
  {
    gid: "1",
    name: "Task 1",
    resource_type: "type",
    resource_subtype: "subtype",
    custom_fields: [],
  },
  {
    gid: "2",
    name: "Task 2",
    resource_type: "type",
    resource_subtype: "subtype",
    custom_fields: [],
  },
] satisfies ProjectTasks[];

const mockUserData = [
  {
    gid: "12",
    name: "user",
    resource_type: "user type",
  },
  {
    gid: "34",
    name: "user 1",
    resource_type: "user type 1",
  },
  {
    gid: "56",
    name: "user 2",
    resource_type: "user type 2",
  },
] satisfies Details[];

const mockCustomFieldData = [
  {
    gid: "1",
    display_value: "In Progress",
    enabled: true,
  },
] satisfies CustomField[];

describe("AllTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should renders no tasks available message when taskData is empty", async () => {
    const mockFetchFilteredTasks = jest.spyOn(api, "fetchFilteredTasks");
    mockFetchFilteredTasks.mockResolvedValue({ data: [] } as Details);

    await act(async () => {
      render(<AllTasks />);
    });

    const noTasksMessage = await screen.findByText("No tasks available");
    expect(noTasksMessage).toBeInTheDocument();

    expect(mockFetchFilteredTasks).toHaveBeenCalledWith("tasks/search", {
      opt_fields: "name,resource_subtype,custom_fields",
      resource_subtype: "default_task",
      sort_ascending: "false",
    });
  });

  it("should render task items when taskData is not empty", async () => {
    const mockFetchFilteredTasks = jest.spyOn(api, "fetchFilteredTasks");
    mockFetchFilteredTasks.mockResolvedValue({
      data: mockTaskData,
    } as ProjectTasks);

    await act(async () => {
      render(<AllTasks />);
    });

    const taskItems = await screen.findAllByRole("listitem");
    expect(taskItems).toHaveLength(mockTaskData.length * 4);

    expect(mockFetchFilteredTasks).toHaveBeenCalledWith("tasks/search", {
      opt_fields: "name,resource_subtype,custom_fields",
      resource_subtype: "default_task",
      sort_ascending: "false",
    });
  });

  it("should render the user", async () => {
    const mockFetchUsers = jest.spyOn(api, "fetchUsers");
    mockFetchUsers.mockResolvedValue({ data: mockUserData } as Details);

    await act(async () => {
      render(<AllTasks />);
    });

    expect(await screen.findByText("user")).toBeInTheDocument();
    expect(await screen.findByText("user 1")).toBeInTheDocument();
    expect(await screen.findByText("user 1")).toBeInTheDocument();
  });

  it("should render more than one user", async () => {
    const mockFetchUsers = jest.spyOn(api, "fetchUsers");
    mockFetchUsers.mockResolvedValue({ data: mockUserData } as Details);
    await act(async () => {
      render(<AllTasks />);
    });

    const filterSelect = await screen.findByTestId("select-option");

    const options = within(filterSelect).getAllByRole("option");

    expect(options).toHaveLength(4);
  });

  it("should correctly set default filter option", () => {
    act(() => {
      render(<AllTasks />);
    });
    const option = screen.getByRole("option", {
      name: "Filter",
    }) as HTMLOptionElement;
    expect(option.selected).toBe(true);
    expect(option.value).toBe("filter");
  });

  it("should correctly set default sort by option ", () => {
    act(() => {
      render(<AllTasks />);
    });
    const option = screen.getByRole("option", {
      name: "sort by",
    }) as HTMLOptionElement;
    expect(option.selected).toBe(true);
    expect(option.value).toBe("sort");
  });

  it("should call fetchFilteredTasks with the selected user's gid when a different user is selected", async () => {
    const mockFetchFilteredTasks = jest.spyOn(api, "fetchFilteredTasks");
    mockFetchFilteredTasks.mockResolvedValue({ data: [] } as ProjectTasks);

    await act(async () => {
      render(<AllTasks />);
    });

    const userSelect = await screen.findByTestId("select-option");

    await act(async () => {
      await userEvent.selectOptions(userSelect, "34");
    });

    await waitFor(() => {
      expect(mockFetchFilteredTasks).toHaveBeenCalledWith("tasks/search", {
        resource_subtype: "default_task",
        "assignee.any": "34",
        sort_ascending: "false",
        opt_fields: "name,resource_subtype,custom_fields",
      });
    });
  });

  it("should call fetchFilteredTasks with the selected sort option", async () => {
    const mockFetchFilteredTasks = jest.spyOn(api, "fetchFilteredTasks");
    mockFetchFilteredTasks.mockResolvedValue({ data: [] } as ProjectTasks);

    await act(async () => {
      render(<AllTasks />);
    });

    const sortBySelect = await screen.findByTestId("sort-by-option");

    await act(async () => {
      await userEvent.selectOptions(sortBySelect, "modified_at");
    });

    await waitFor(() => {
      expect(mockFetchFilteredTasks).toHaveBeenCalledWith("tasks/search", {
        resource_subtype: "default_task",
        sort_by: "modified_at",
        sort_ascending: "false",
        opt_fields: "name,resource_subtype,custom_fields",
      });
    });
  });

  it("should return data from the fetchCustomField", async () => {
    const mockFetchCustomField = jest.spyOn(api, "fetchCustomField");
    mockFetchCustomField.mockResolvedValueOnce({
      data: mockCustomFieldData,
    } as CustomField);

    const result = await api.fetchCustomField();
    expect(result).toEqual(result);
  });

  it("should correctly set default all option", () => {
    act(() => {
      render(<AllTasks />);
    });
    const option = screen.getByRole("option", {
      name: "All",
    }) as HTMLOptionElement;
    expect(option.selected).toBe(true);
    expect(option.value).toBe("all");
  });

  it("should render 5 option", () => {
    render(<AllTasks />);
    const selectElement = screen.getByTestId("sort-by-option");
    const options = selectElement.getElementsByTagName("option");
    expect(options.length).toBe(5);
  });
});
