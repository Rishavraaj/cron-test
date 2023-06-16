import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiResponse, NextApiRequest } from "next";

export async function handler(res: NextApiResponse, req: NextApiRequest) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "Unathorized" });
    return;
  }
  console.log(session.user);
}
