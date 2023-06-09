export interface Details {
  gid: string;
  name: string;
  resource_type: string;
  data?: any;
}

export interface ProjectData extends Details {
  created_at: Date;
  modified_at: Date;
  notes: string;
  default_view: string;
  completed: boolean;
  color: string;
}

export interface ProjectTasks extends Details {
  resource_subtype: string;
  custom_fields: CustomField[];
}

export interface CustomField {
  gid: string;
  enabled: boolean;
  enum_options?: Enum[];
  display_value: string | null;
  data?: any;
}

export interface Enum {
  gid: string;
  color: Color;
  enabled: boolean;
  name: string;
}

export enum Color {
  Blue = "blue",
  BlueGreen = "blue-green",
  CoolGray = "cool-gray",
  Green = "green",
  None = "none",
  Orange = "orange",
  Pink = "pink",
  Purple = "purple",
  Red = "red",
  Yellow = "yellow",
  YellowGreen = "yellow-green",
  YellowOrange = "yellow-orange",
}

export interface TaskLifeCycle {
  gid: string;
  created_at: Date;
  created_by: Details;
  resource_type: TaskLifecycleResourceType;
  text: string;
  type: Type;
  resource_subtype: string;
  assignedTo: string;
  previousAssignee: string | null;
  data?: any;
}

export enum CreatedByResourceType {
  User = "user",
}

export enum TaskLifecycleResourceType {
  Story = "story",
}

export enum Type {
  Comment = "comment",
  System = "system",
}

export interface SectionTaskDetails extends ProjectTasks {
  due_on: Date;
  completed: boolean;
  length?: number;
  sectionTasks?: SectionTasksDetails[];
}

export interface SectionTaskParam {
  limit: string;
  section: string;
  opt_fields: string;
}

export interface SectionTasksDetails {
  name: string;
  tasks: Tasks[];
}

export interface Tasks {
  length: number;
}

export interface formatedData {
  project: Details;
  sectionTasks: customSectionTask[];
}

export interface customSectionTask {
  name: string;
  tasks: Tasks;
}
