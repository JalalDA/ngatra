import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import TransactionCardRow from "./transaction-card-row";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Transactions({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const transactions = await db.query.transaction.findMany({
    orderBy: (transaction, { asc }) => asc(transaction.timestamp),
    ...(limit ? { limit } : {}),
  });

  return transactions.length > 0 ? (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCardRow key={transaction.id} data={transaction} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl text-white">No Transactions Yet</h1>
      <Image
        alt="No Transactions"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-gray-400">
        There are no active transactions at this time.
      </p>
    </div>
  );
}
