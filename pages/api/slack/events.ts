import { NextApiRequest, NextApiResponse } from "next";
import { appRunner } from "./_app";
// import { sendSlackMessage } from "./_app";
import sendToSlack from "@/utils/sendToslack";
import { WebClient } from "@slack/web-api";
import { formatData } from "@/utils/TaskNotificationFormatter";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    console.log("running");
    const data = await sendToSlack(); // Fetch the data
    console.log("fetching data");
    const web = new WebClient(process.env.SLACK_BOT_TOKEN);
    const formattedMessage = formatData(data);
    console.log("data fetched");
    await web.chat.postMessage({
      channel: "C05BC103SM60",
      text: formattedMessage,
    });

    console.log("Data sent to Slack");
    res.status(200).json({ message: "Data sent to Slack" });
  } catch (error) {
    console.error("Error sending data to Slack:", error);
    res.status(500).json({ error: "Error sending data to Slack" });
  }

  await appRunner.handleEvents(req, res);
}
