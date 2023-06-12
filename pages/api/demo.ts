import { consoleSchedule } from "@/utils/Tasks";
import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
import { WebClient } from "@slack/web-api";
// import { sendSlackMessage } from "./slack/_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const web = new WebClient(process.env.SLACK_BOT_TOKEN);

    await web.chat.postMessage({
      channel: "C05BC103SM6",
      text: "test msg",
    });
    res.status(200).send("data sent to slack");
    console.log("Data sent to Slack");
  } catch (error) {
    console.error("Error sending data to Slack:", error);
  }
}
