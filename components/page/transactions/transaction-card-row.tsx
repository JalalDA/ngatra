"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { updateTransactionStatus } from "@/lib/actions";
import { ETransactionStatus, TTransaction } from "@/lib/schema";

export default function TransactionCardRow({ data }: { data: TTransaction }) {
  const [status, setStatus] = useState(data.status);

  const handleStatusChange = async (newStatus: ETransactionStatus) => {
    setStatus(newStatus);
    const res = await updateTransactionStatus(data.id, newStatus);
    if (res.error) {
      toast.error("Failed to update status.");
    } else {
      toast.success("Status updated successfully.");
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md hover:shadow-lg">
      {/* Transaction Details */}
      <div className="flex items-center space-x-4">
        <Image
          src="/transaction-placeholder.png"
          alt={data.name ?? ""}
          width={50}
          height={50}
          className="rounded"
        />
        <div>
          <h3 className="text-lg font-medium text-white">{data.name}</h3>
          <p className="text-sm text-gray-400">{data.phone}</p>
        </div>
      </div>

      {/* Transaction Status */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-semibold text-gray-400">Status:</span>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as ETransactionStatus)}
          className="rounded bg-gray-700 px-2 py-1 text-white focus:outline-none"
        >
          <option value="waiting_payment">Waiting Payment</option>
          <option value="processed">Processed</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Total Amount */}
      <span className="text-lg font-semibold text-white">
        Rp {data.totalAmount?.toLocaleString("id-ID")}
      </span>
    </div>
  );
}
