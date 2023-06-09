import { SectionTaskDetails, Details } from "../models/Company.interface";
import {
  fetchAllProjects,
  fetchSectionTasks,
  fetchProjectSection,
} from "@/api/api";

const sendToSlack = async () => {
  try {
    const projects = await fetchAllProjects("/projects");

    const sectionTasksPromises = projects?.data?.map(
      async (project: Details) => {
        const sections = await fetchProjectSection(project.gid);
        const sectionTasks = [];

        for (const section of sections?.data) {
          const tasksParams = {
            limit: "50",
            section: section.gid,
            opt_fields: "completed,due_on,name,resource_subtype",
          };
          const tasks = await fetchSectionTasks(tasksParams);
          const incompleteTasks = countIncompleteTasks(tasks?.data);
          sectionTasks.push({
            name: section.name,
            tasks: incompleteTasks,
          });
        }

        return {
          project,
          sectionTasks: sectionTasks.filter(
            (section) => section.tasks.length > 0
          ),
        };
      }
    );

    const sectionTaskData = await Promise.all(sectionTasksPromises);

    const combinedData = sectionTaskData.filter(
      (item) => item.sectionTasks.length > 0
    );

    return combinedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const countIncompleteTasks = (tasks: SectionTaskDetails[]) => {
  return tasks.filter(
    (task) => task.due_on !== null && task.completed === false
  );
};
export default sendToSlack;
