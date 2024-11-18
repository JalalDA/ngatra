"use client";
import { useState } from "react";

export default function PaymentModal({
  isOpen,
  onClose,
  onConfirm,
  orderDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderDetails: {
    productName: string;
    productParams: string;
    quantity: number;
    totalSum: number;
  };
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-lg rounded-lg bg-[#15202b] p-6 text-white shadow-lg ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold text-center mb-4">Select Payment Method</h2>

        {/* Order Details */}
        <div className="mb-6 rounded-lg bg-[#1e2a35] p-4 text-sm">
          <p className="flex justify-between">
            <span className="font-medium">Product:</span>
            <span>{orderDetails.productName}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Link:</span>
            <a
              href={orderDetails.productParams}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {orderDetails.productParams}
            </a>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Quantity:</span>
            <span>{orderDetails.quantity}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Total Sum:</span>
            <span>${orderDetails.totalSum.toFixed(2)}</span>
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <button
            onClick={onConfirm}
            className="flex w-full items-center justify-between rounded-md bg-[#1d9bf0] px-4 py-3 text-white hover:bg-blue-600"
          >
            <span className="font-medium">Bank Transfer</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button
            onClick={onConfirm}
            className="flex w-full items-center justify-between rounded-md bg-[#1e2a35] border border-gray-600 px-4 py-3 text-white hover:bg-gray-700"
          >
            <span className="font-medium">Other Payment</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Info Section */}
        <p className="mt-6 text-center text-sm text-green-400">
          After payment, you will be taken to an account to track your order.
        </p>
      </div>
    </div>
  );
}
