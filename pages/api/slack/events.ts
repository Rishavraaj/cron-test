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

let isDataSentToSlack = false;

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

    // Check if data has already been sent
    if (isDataSentToSlack) {
      console.log("Data already sent to Slack");
      res.status(200).json({ message: "Data already sent to Slack" });
      return;
    }

    const data = await sendToSlack(); // Fetch the data
    console.log("fetching data");

    const web = new WebClient(process.env.SLACK_BOT_TOKEN);
    const formattedMessage = formatData(data);
    console.log("data fetched");

    await web.chat.postMessage({
      channel: "C05BC103SM6l",
      text: formattedMessage,
    });

    console.log("Data sent to Slack");
    res.status(200).json({ message: "Data sent to Slack" });

    isDataSentToSlack = true; // Set the flag to indicate data has been sent
  } catch (error) {
    console.error("Error sending data to Slack:", error);
    res.status(500).json({ error: "Error sending data to Slack" });
  }

  await appRunner.handleEvents(req, res);
}
