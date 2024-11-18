"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import va from "@vercel/analytics";
import { createTransactions } from "@/lib/actions";
import PaymentModal from "./payment-modal";

export default function Order({ product, siteId }: { product: any, siteId: string }) {
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    qty: 0,
    params: "",
    totalPrice: 0,
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const { id } = useParams() as { id?: string };

  const router = useRouter();

  return (
    <>
      {/* Header Section */}
      <div className="p-4 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <button
          className="flex items-center space-x-2 text-sm text-white bg-transparent border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => router.push("/")}
        >
          {/* Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Go to main page</span>
        </button>

        <div>
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Product Order
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please complete the form below to place your order.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <form
          action={async (formData: FormData) => {
            setModalOpen(true);
          }}
          className="w-full max-w-3xl rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-900 dark:border-gray-700 p-6"
        >
          {/* Product Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Product Name
              </label>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {product.productName}
              </h2>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {"$ " + product.price}
              </h2>
            </div>
          </div>

          {/* User Inputs */}
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={orderData.name}
                onChange={(e) =>
                  setOrderData({ ...orderData, name: e.target.value })
                }
                required
                placeholder="Enter your full name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            {/* Phone Input */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={orderData.phone}
                onChange={(e) =>
                  setOrderData({ ...orderData, phone: e.target.value })
                }
                required
                placeholder="e.g., 08123xxx"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Quantity and Parameters */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="amount"
                value={orderData.qty}
                onChange={(e) =>
                  setOrderData({
                    ...orderData,
                    qty: parseInt(e.target.value),
                    totalPrice: parseInt(e.target.value) * product.price,
                  })
                }
                required
                min={1}
                max={15000}
                placeholder="Enter amount (min: 1, max: 15000)"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Order Parameters
              </label>
              <textarea
                name="params"
                value={orderData.params}
                onChange={(e) =>
                  setOrderData({ ...orderData, params: e.target.value })
                }
                required
                placeholder="e.g., Your IG link if ordering followers"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Total Price */}
          <div className="mt-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Total Price
            </label>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              $ {orderData.totalPrice.toFixed(2)}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Submit Order
          </button>
        </form>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={async () => {
            // createTransactions(orderData, id, siteId).then(async (res: any) => {
            //   if (res.error) {
            //     toast.error(res.error);
            //   } else {
            //     va.track("Order Created", id ? { id } : {});
            //     router.push(`/order-detail/${res.id}`); // Redirect to transaction details
            //   }
            // });
            alert("confirm payment")
          }}
          orderDetails={{
            productName: product.productName,
            productParams: orderData.params,
            quantity: orderData.qty,
            totalSum: orderData.totalPrice,
          }}
        />
      </div>
    </>
  );
}
