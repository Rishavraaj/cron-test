import { consoleSchedule } from "@/utils/Tasks";
import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
import { sendSlackMessage } from "./slack/_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await sendSlackMessage();
    res.status(200);
  } catch (error) {
    console.log(error);
  }
  // res.status(200).json({ message: "Server is healthy" });
}
