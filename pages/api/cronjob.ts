import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Cron Job is Running");
  res.status(200).json({ message: "Cron Job Running" });
}
