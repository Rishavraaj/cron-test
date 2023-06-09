import { CustomField, Enum, SectionTaskDetails, SectionTaskParam } from './../models/Company.interface';
import axios, { AxiosResponse, AxiosInstance } from "axios";
import { Details, ProjectData, ProjectTasks, TaskLifeCycle } from "@/models/Company.interface";

const BASE_URL = "https://app.asana.com/api/1.0/";

const ASANA_TOKEN = process.env.NEXT_PUBLIC_ASANA_AUTH_TOKEN;
const WORKSPACE_GID = process.env.NEXT_PUBLIC_ASANA_WORKSPACE_GID

const CUSTOM_FIELDS_GID = "1202381165863396"


const headers: { [key: string]: string } = {
  accept: "application/json",
  authorization: `Bearer ${ASANA_TOKEN}`,
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers,
});

export const fetchAsanaApi = async (url: string): Promise<Details | null> => {
  try {
    const { data }: AxiosResponse<Details> = await axiosInstance.get(url);
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchProjectSection = async (
  id: string
): Promise<Details | null> => {
  try {
    const { data }: AxiosResponse<Details> = await axiosInstance.get(
      `projects/${id}/sections`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchProjectData = async (
  id: string
): Promise<ProjectData | null> => {
  try {
    const { data }: AxiosResponse<ProjectData> = await axiosInstance.get(
      `projects/${id}`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchProjectTasks = async (
  id: string
): Promise<ProjectTasks | null> => {
  try {
    const { data }: AxiosResponse<ProjectTasks> = await axiosInstance.get(
      `projects/${id}/tasks`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchUsers = async (url: string): Promise<Details | null> => {
  try {
    const { data }: AxiosResponse<Details> = await axiosInstance.get(
      `workspaces/${WORKSPACE_GID}/${url}`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchFilteredTasks = async (
  url: string,
  params?: any
): Promise<Details | null> => {
  try {
    const { data }: AxiosResponse<Details> = await axiosInstance.get(
      `workspaces/${WORKSPACE_GID}/${url}`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchTaskLifecycle = async (
  id: string
): Promise<TaskLifeCycle | null> => {
  try {
    const { data }: AxiosResponse<TaskLifeCycle> = await axiosInstance.get(
      `tasks/${id}/stories`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchSectionTasks = async (
  params?: SectionTaskParam
): Promise<SectionTaskDetails | null> => {
  try {
    const { data }: AxiosResponse<SectionTaskDetails> = await axiosInstance.get(
      "tasks",{
        params
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchCustomField = async (
): Promise<CustomField | null> => {
  try {
    const { data }: AxiosResponse<CustomField> = await axiosInstance.get(
      `custom_fields/${CUSTOM_FIELDS_GID}`
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchAllProjects = async (url: string): Promise<Details | null> => {
  try {
    const { data }: AxiosResponse<Details> = await axiosInstance.get(`workspaces/${WORKSPACE_GID}${url}`);
    return data;
  } catch (error) {
    return null;
  }
};

