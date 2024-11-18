import { getTransactionFromDB } from "@/lib/actions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Fetch transaction details from your database or API
  const transaction = await getTransactionFromDB(id as string);

  if (!transaction) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  res.status(200).json(transaction);
}
