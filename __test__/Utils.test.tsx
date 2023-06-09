const { getAssignee } = require("@/utils/Tasks");
const { filterTaskStories } = require("@/utils/Tasks");
const { sortByStatus } = require("@/utils/Tasks");

const data = [
  { resource_subtype: "assigned" },
  { resource_subtype: "unassigned" },
  { resource_subtype: "completed" },
  { resource_subtype: "due_date" },
  { resource_subtype: "modified" },
  { resource_subtype: "comment_added" },
  { resource_subtype: "section_changed" },
  { resource_subtype: "enum_custom_field_changed" },
];

describe("getAssignee", () => {
  it('should returns assignedToText when resource_subtype is "assigned"', () => {
    const item = {
      resource_subtype: "assigned",
      text: "Task assigned to someone",
    };
    expect(getAssignee(item)).toBe("someone");
  });

  it('should returns "None" when resource_subtype is "unassigned"', () => {
    const item = {
      resource_subtype: "unassigned",
      text: "Task",
    };
    expect(getAssignee(item)).toBe("None");
  });

  it('should returns item.previousAssignee when resource_subtype is neither "assigned" nor "unassigned"', () => {
    const item = {
      resource_subtype: "some_other_subtype",
      previousAssignee: "someone",
    };
    expect(getAssignee(item)).toBe("someone");
  });

  it('should returns "None" when assignedToText is undefined', () => {
    const item = {
      resource_subtype: "assigned",
      text: "Task",
    };
    expect(getAssignee(item)).toBe("None");
  });

  it("should returns item.previousAssignee when resource_subtype is unknown", () => {
    const item = {
      resource_subtype: "unknown_subtype",
      previousAssignee: "someone",
    };
    expect(getAssignee(item)).toBe("someone");
  });
});

describe("filterTaskStories", () => {
  it("should return all data when subtypeFilter is Empty String", () => {
    const subtypeFilter = "";
    expect(filterTaskStories(data, subtypeFilter)).toEqual(data);
  });

  it("should return all data when subtypeFilter is All", () => {
    const subtypeFilter = "All";
    expect(filterTaskStories(data, subtypeFilter)).toEqual(data);
  });

  it("should return assigned and unassigned data when subtypeFilter is Assigned/Unassigned", () => {
    const subtypeFilter = "Assigned/Unassigned";
    const expectedData = [
      { resource_subtype: "assigned" },
      { resource_subtype: "unassigned" },
    ];
    expect(filterTaskStories(data, subtypeFilter)).toEqual(expectedData);
  });

  it("should return enum_custom_field_changed data when subtypeFilter is enum_custom_field_changed", () => {
    const subtypeFilter = "enum_custom_field_changed";
    const enumData = [{ resource_subtype: "enum_custom_field_changed" }];
    expect(filterTaskStories(data, subtypeFilter)).toEqual(enumData);
  });
});

const Mockdata = [
  {
    custom_fields: [{ display_value: "Planned " }],
    name: "Task 1",
    gid: "1",
  },
  {
    custom_fields: [{ display_value: "Not Started" }],
    name: "Task 2",
    gid: "2",
  },
  {
    custom_fields: [{ display_value: "Done" }],
    name: "Task 3",
    gid: "3",
  },
  {
    custom_fields: [{ display_value: "Pr review" }],
    name: "Task 4",
    gid: "4",
  },
  {
    custom_fields: [{ display_value: "In Progress" }],
    name: "Task 5",
    gid: "5",
  },
];

const MockdataWithNull = [
  {
    custom_fields: [{ display_value: null }],
    name: "Task 1",
    gid: "1",
  },
  {
    custom_fields: [{ display_value: "Done" }],
    name: "Task 2",
    gid: "2",
  },
  {
    custom_fields: [{ display_value: null }],
    name: "Task 3",
    gid: "3",
  },
];

const mockStatusSequence = [
  "Not Started",
  "Planned ",
  "In Progress",
  "Pr review",
  "Done",
];

describe("sortByStatus", () => {
  it("should sort the data by status in the given order", () => {
    const sortedData = sortByStatus(Mockdata, mockStatusSequence);

    expect(sortedData).toEqual([
      {
        custom_fields: [{ display_value: "Not Started" }],
        name: "Task 2",
        gid: "2",
      },
      {
        custom_fields: [{ display_value: "Planned " }],
        name: "Task 1",
        gid: "1",
      },
      {
        custom_fields: [{ display_value: "In Progress" }],
        name: "Task 5",
        gid: "5",
      },
      {
        custom_fields: [{ display_value: "Pr review" }],
        name: "Task 4",
        gid: "4",
      },
      {
        custom_fields: [{ display_value: "Done" }],
        name: "Task 3",
        gid: "3",
      },
    ]);
  });

  it("should handle null values in custom_fields", () => {
    const sortedData = sortByStatus(MockdataWithNull, mockStatusSequence);

    expect(sortedData).toEqual([
      {
        custom_fields: [{ display_value: null }],
        name: "Task 1",
        gid: "1",
      },
      {
        custom_fields: [{ display_value: null }],
        name: "Task 3",
        gid: "3",
      },
      {
        custom_fields: [{ display_value: "Done" }],
        name: "Task 2",
        gid: "2",
      },
    ]);
  });
});
