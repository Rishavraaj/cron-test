import { formatedData, customSectionTask } from "@/models/Company.interface";

export const formatData = (data: formatedData[]) => {
  let formattedMessage = "";

  data.forEach((item: formatedData) => {
    const { project, sectionTasks } = item;

    formattedMessage += `Project - ${project.name}\n`;
    formattedMessage += "_________________________________________\n";

    sectionTasks.forEach((section: customSectionTask) => {
      const { name, tasks } = section;
      const incompleteTasksCount = tasks.length;

      formattedMessage += `Section - ${name}\n`;
      formattedMessage += `Incomplete tasks beyond due date - ${incompleteTasksCount}\n`;
    });

    formattedMessage += "_________________________________________\n";
    formattedMessage += "\n";
  });

  return formattedMessage;
};
