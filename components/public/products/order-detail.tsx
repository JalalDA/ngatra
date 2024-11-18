"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetail({ transaction }: { transaction: any }) {

    if (!transaction)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-500 dark:text-gray-300">Loading...</div>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-lg bg-[#1e293b] p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Transaction Details</h1>

                <div className="space-y-4">
                    {/* Transaction Status */}
                    <div className="flex justify-between items-center bg-[#334155] p-4 rounded-lg">
                        <span className="font-medium">Status</span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${transaction.status === "Completed"
                                ? "bg-green-500 text-white"
                                : transaction.status === "Pending"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-red-500 text-white"
                                }`}
                        >
                            {transaction.status}
                        </span>
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-between items-center bg-[#334155] p-4 rounded-lg">
                        <span className="font-medium">Total Amount</span>
                        <span className="font-semibold">${transaction.totalAmount?.toFixed(2)}</span>
                    </div>

                    {/* Payment Method */}
                    <div className="flex justify-between items-center bg-[#334155] p-4 rounded-lg">
                        <span className="font-medium">Payment Method</span>
                        <span className="font-semibold">{transaction.paymentMethod}</span>
                    </div>

                    {/* Transaction ID */}
                    <div className="flex justify-between items-center bg-[#334155] p-4 rounded-lg">
                        <span className="font-medium">Transaction ID</span>
                        <span className="font-mono text-sm">{transaction.id}</span>
                    </div>

                    {/* Timestamp */}
                    <div className="flex justify-between items-center bg-[#334155] p-4 rounded-lg">
                        <span className="font-medium">Timestamp</span>
                        <span className="text-sm">
                            {new Date(transaction.timestamp).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>
                        If you have any issues, please{" "}
                        <a
                            href="https://wa.me/6281266235940"
                            className="text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            contact support
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
