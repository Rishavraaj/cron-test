import { NextApiRequest, NextApiResponse } from "next";
import { appRunner } from "./_app";
import { sendSlackMessage } from "./_app";

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
    await sendSlackMessage();
    await appRunner.handleEvents(req, res);
  } catch (error) {
    console.error("Error handling events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
