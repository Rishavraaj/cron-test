import { consoleSchedule } from "@/utils/Tasks";
import type { NextApiRequest, NextApiResponse } from "next";
import sendToSlack from "@/utils/sendToslack";
import { formatData } from "@/utils/TaskNotificationFormatter";
import { WebClient } from "@slack/web-api";
// import { sendSlackMessage } from "./slack/_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ error: "Sorry! This endpoint does not accept your requests." });
    return;
  }
  try {
    const data = await sendToSlack();
    const web = new WebClient(process.env.SLACK_BOT_TOKEN);
    const formattedMessage = formatData(data);
    console.log(formattedMessage);
    await web.chat.postMessage({
      channel: "C05BC103SM6",
      text: formattedMessage,
    });
    res.status(200).send("Data Sent to slack");
    console.log("Data sent to Slack");
  } catch (error) {
    console.error("Error sending data to Slack:", error);
  }
}
