import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Slack from "@/components/Slack";
import {
  fetchAllProjects,
  fetchProjectSection,
  fetchSectionTasks,
} from "@/api/api";
import { Details, SectionTaskDetails } from "@/models/Company.interface";
import axios from "axios";
import sendSlackNotification from "@/api/slackapi";

jest.mock("@/api/api", () => ({
  fetchAllProjects: jest.fn(),
  fetchProjectSection: jest.fn(),
  fetchSectionTasks: jest.fn(),
}));

jest.mock("axios");

const slackChannelUrl =
  process.env.NEXT_PUBLIC_ASANA_TESTING_CHANNEL_WEBHOOK_URL || "";

const mockProjects = [
  {
    gid: "123",
    name: "mock project 1",
    resource_type: "mock1",
  },
  {
    gid: "456",
    name: "mock project 2",
    resource_type: "mock 2",
  },
] satisfies Details[];

const mockProjectSection = [
  {
    gid: "678",
    name: "section 1",
    resource_type: "section",
  },
] satisfies Details[];

const mockSectionTasks = [
  {
    gid: "123",
    name: "Task 1",
    due_on: new Date(),
    completed: false,
    resource_type: "mock 1",
    resource_subtype: "mocck 1",
    custom_fields: [],
  },
  {
    gid: "456",
    name: "Task 2",
    due_on: new Date(),
    completed: false,
    resource_type: "mock 2",
    resource_subtype: "mocck 2",
    custom_fields: [],
  },
] satisfies SectionTaskDetails[];

describe("Slack Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the send notification to slack button", () => {
    render(<Slack />);
    expect(screen.getByText("send notification to slack")).toBeInTheDocument();
  });

  it("should render the home button", () => {
    render(<Slack />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should receive data from the fetchAllProjectApi", async () => {
    (fetchAllProjects as jest.Mock).mockResolvedValueOnce({
      data: mockProjects,
    });
    const result = await fetchAllProjects("/projects");
    expect(result?.data).toEqual(mockProjects);
  });

  it("should successfully fetched project section", async () => {
    (fetchProjectSection as jest.Mock).mockResolvedValueOnce({
      data: mockProjectSection,
    });

    const result = await fetchProjectSection(mockProjects[0].gid);
    expect(result?.data).toEqual(mockProjectSection);
  });

  it("should fetch section tasks successfully", async () => {
    (fetchSectionTasks as jest.Mock).mockResolvedValueOnce({
      data: mockSectionTasks,
    });
    const params = {
      limit: "50",
      section: mockProjectSection[0].gid,
      opt_fields: "completed,due_on,name,resource_subtype",
    };
    const result = await fetchSectionTasks(params);
    expect(fetchSectionTasks).toHaveBeenCalledWith({
      limit: "50",
      section: mockProjectSection[0].gid,
      opt_fields: "completed,due_on,name,resource_subtype",
    });
    expect(result?.data).toEqual(mockSectionTasks);
  });

  it("should send a Slack notification", async () => {
    const message = "Test message";
    const axiosSpy = jest
      .spyOn(axios, "post")
      .mockResolvedValueOnce({ status: 200 });
    await sendSlackNotification(message);
    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith(
      slackChannelUrl,
      JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: message,
            },
          },
        ],
      }),
      {
        withCredentials: false,
        transformRequest: expect.any(Array),
      }
    );
  });

  it("should handle error when sending Slack notification", async () => {
    const message = "Test message";
    const axiosSpy = jest
      .spyOn(axios, "post")
      .mockRejectedValueOnce(
        new Error("Failed to send data to Slack channel.")
      );
    await sendSlackNotification(message);
    expect(axiosSpy).toHaveBeenCalledTimes(1);
  });
});
