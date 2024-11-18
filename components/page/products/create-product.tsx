"use client";

import { toast } from "sonner";
import { createProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "../../modal/provider";
import va from "@vercel/analytics";
import { useState } from "react";

export default function CreateProductModal({ category }: { category: any[] }) {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState({
    product_name: "",
    price: 0,
    vendor: "",
    status: false,
    categoryId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.product_name || !data.price || !data.vendor || !data.categoryId) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("price", data.price.toString());
    formData.append("vendor", data.vendor);
    formData.append("status", data.status.toString());
    formData.append("categoryId", data.categoryId);

    createProduct(formData).then((res: any) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        va.track("Created Product");
        const { id } = res;
        router.refresh();
        router.push(`/product/${id}`);
        modal?.hide();
        toast.success("Product created successfully!");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 dark:md:border-gray-700"
    >
      <div className="flex flex-col space-y-4 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Create a New Product
        </h2>

        {category.length > 0 ? (
          <>
            {/* Product Name */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="product_name"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Product Name
              </label>
              <input
                id="product_name"
                name="product_name"
                type="text"
                placeholder="Product Name"
                value={data.product_name}
                onChange={(e) =>
                  setData({ ...data, product_name: e.target.value })
                }
                maxLength={32}
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="categoryId"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={data.categoryId}
                onChange={(e) =>
                  setData({ ...data, categoryId: e.target.value })
                }
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                value={data.price}
                onChange={(e) =>
                  setData({ ...data, price: parseFloat(e.target.value) || 0 })
                }
                min={0}
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
              />
            </div>

            {/* Vendor */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="vendor"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Vendor
              </label>
              <input
                id="vendor"
                name="vendor"
                type="text"
                placeholder="Vendor Name"
                value={data.vendor}
                onChange={(e) => setData({ ...data, vendor: e.target.value })}
                maxLength={32}
                required
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3">
              <input
                id="status"
                name="status"
                type="checkbox"
                checked={data.status}
                onChange={(e) =>
                  setData({ ...data, status: e.target.checked })
                }
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-500"
              />
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Enabled
              </label>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No categories available. Please add a category first.
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <button
          type="button"
          onClick={modal?.hide}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        {category.length > 0 && <CreateProductFormButton />}
      </div>
    </form>
  );
}

function CreateProductFormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={cn(
        "flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
        pending
          ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#ffffff" /> : "Create Product"}
    </button>
  );
}
