import { NextApiRequest, NextApiResponse } from "next";
import { appRunner } from "./_app";
import { sendSlackMessage } from "./_app";
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
    await appRunner.handleEvents(req, res);
    await sendSlackMessage();
    res.status(200);
  } catch (error) {
    console.error("Error sending data to Slack:", error);
    res.status(500);
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     await sendSlackMessage();
//     res.status(200);
//   } catch (error) {
//     console.error("Error sending data to Slack:", error);
//     res.status(500);
//   }
// }
