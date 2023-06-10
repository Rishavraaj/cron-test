import { ProjectTasks, TaskLifeCycle } from "@/models/Company.interface";

export const getAssignee = (item: TaskLifeCycle) => {
  if (item.resource_subtype === "assigned") {
    const assignedToText = item.text.split("assigned to")[1]?.trim();
    return assignedToText || "None";
  } else if (item.resource_subtype === "unassigned") {
    return "None";
  } else {
    return item.previousAssignee || "None";
  }
};

export const filterTaskStories = (
  data: TaskLifeCycle[],
  subtypeFilter: string
) => {
  return data.filter((item: TaskLifeCycle) => {
    if (subtypeFilter === "" || subtypeFilter === "All") {
      return true;
    } else if (subtypeFilter === "Assigned/Unassigned") {
      return (
        item.resource_subtype === "assigned" ||
        item.resource_subtype === "unassigned"
      );
    } else {
      return item.resource_subtype === subtypeFilter;
    }
  });
};

export const sortByStatus = (
  data: ProjectTasks[],
  status: string[]
): ProjectTasks[] => {
  return data.sort((a, b) => {
    const statusA = a.custom_fields[0]?.display_value || "";
    const statusB = b.custom_fields[0]?.display_value || "";

    const orderA = status.indexOf(statusA);
    const orderB = status.indexOf(statusB);

    return orderA - orderB;
  });
};

export const consoleSchedule = () => {
  console.log("running");
};
