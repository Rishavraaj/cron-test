import { consoleSchedule } from "@/utils/Tasks";
import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // cron.schedule("* * * * * *", consoleSchedule);
  console.log("running");
  res.status(200).json({ message: "Server is healthy" });
}
