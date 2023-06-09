import { formatData } from "@/utils/TaskNotificationFormatter";
import { formatedData } from "@/models/Company.interface";

const emptyMockData = [] satisfies formatedData[];

const singleProjectMockData = [
  {
    project: {
      name: "Project A",
      gid: "123",
      resource_type: "project A",
    },
    sectionTasks: [
      {
        name: "Section 1",
        tasks: [
          { name: "Task 1", dueDate: "2023-06-10", completed: false },
          { name: "Task 2", dueDate: "2023-06-12", completed: false },
        ],
      },
      {
        name: "Section 2",
        tasks: [{ name: "Task 3", dueDate: "2023-06-15", completed: false }],
      },
    ],
  },
] satisfies formatedData[];

const multiProjectMockData = [
  {
    project: {
      name: "Project A",
      gid: "123",
      resource_type: "project",
    },
    sectionTasks: [
      {
        name: "Section 1",
        tasks: [
          { name: "Task 1", dueDate: "2023-06-10", completed: false },
          { name: "Task 2", dueDate: "2023-06-12", completed: false },
        ],
      },
      {
        name: "Section 2",
        tasks: [{ name: "Task 3", dueDate: "2023-06-15", completed: false }],
      },
    ],
  },
  {
    project: {
      name: "Project B",
      gid: "456",
      resource_type: "project",
    },
    sectionTasks: [
      {
        name: "Section 1",
        tasks: [{ name: "Task 1", dueDate: "2023-06-10", completed: false }],
      },
    ],
  },
] satisfies formatedData[];

describe("Task Notification Formattor", () => {
  it("should return an empty string for empty input data", () => {
    const expectedData = "";
    const result = formatData(emptyMockData);
    expect(result).toEqual(expectedData);
  });

  it("should format data for a single project with multiple sections and tasks", () => {
    const expectedResult = `Project - Project A
_________________________________________
Section - Section 1
Incomplete tasks beyond due date - 2
Section - Section 2
Incomplete tasks beyond due date - 1
_________________________________________

`;
    const result = formatData(singleProjectMockData);
    expect(result).toEqual(expectedResult);
  });

  it("should format data for multiple projects with sections and tasks", () => {
    const expectedResult = `Project - Project A
_________________________________________
Section - Section 1
Incomplete tasks beyond due date - 2
Section - Section 2
Incomplete tasks beyond due date - 1
_________________________________________

Project - Project B
_________________________________________
Section - Section 1
Incomplete tasks beyond due date - 1
_________________________________________

`;
    const result = formatData(multiProjectMockData);
    expect(result).toEqual(expectedResult);
  });
});
