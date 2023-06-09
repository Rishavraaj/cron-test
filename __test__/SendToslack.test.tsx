import sendToSlack from "@/utils/sendToslack";

jest.mock("@/api/api", () => ({
  fetchAllProjects: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          gid: "123",
        },
        {
          gid: "456",
        },
      ],
    })
  ),
  fetchProjectSection: jest.fn((projectId) => {
    if (projectId === "123") {
      return Promise.resolve({
        data: [
          {
            gid: "112233",
            name: "Section 1",
          },
        ],
      });
    } else if (projectId === "456") {
      return Promise.resolve({
        data: [
          {
            gid: "445566",
            name: "Section 2",
          },
        ],
      });
    }
  }),
  fetchSectionTasks: jest.fn((params) => {
    if (params.section === "112233") {
      return Promise.resolve({
        data: [
          {
            name: "Task 1",
            completed: false,
            due_on: "2023-06-08",
            resource_subtype: "default",
          },
          {
            name: "Task 3",
            completed: false,
            due_on: "2023-06-09",
            resource_subtype: "default",
          },
        ],
      });
    } else if (params.section === "445566") {
      return Promise.resolve({
        data: [
          {
            name: "Task 4",
            completed: false,
            due_on: "2023-06-10",
            resource_subtype: "default",
          },
        ],
      });
    }
  }),
}));

describe("sendToSlack", () => {
  it("should return an array of combined project and section tasks data", async () => {
    const result = await sendToSlack();
    expect(result).toEqual([
      {
        project: { gid: "123" },
        sectionTasks: [
          {
            name: "Section 1",
            tasks: [
              {
                name: "Task 1",
                completed: false,
                due_on: "2023-06-08",
                resource_subtype: "default",
              },
              {
                name: "Task 3",
                completed: false,
                due_on: "2023-06-09",
                resource_subtype: "default",
              },
            ],
          },
        ],
      },
      {
        project: { gid: "456" },
        sectionTasks: [
          {
            name: "Section 2",
            tasks: [
              {
                name: "Task 4",
                completed: false,
                due_on: "2023-06-10",
                resource_subtype: "default",
              },
            ],
          },
        ],
      },
    ]);
  });
});
