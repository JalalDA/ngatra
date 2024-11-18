"use client";
import { useEffect, useState } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import va from "@vercel/analytics";
import { useFormStatus } from "react-dom";

export default function EditProduct({
  initialData,
  category,
  handleSubmit,
}: {
  initialData: any;
  category: any;
  handleSubmit: any;
}) {
  const [data, setData] = useState({
    productName: "",
    price: 0,
    vendor: "",
    status: false,
    categoryId: "",
  });

  const { id } = useParams() as { id?: string };
  const router = useRouter();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <form
      action={async (formData: FormData) => {
        handleSubmit(formData, id).then(async (res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Updated Product", id ? { id } : {});
            router.refresh();
            toast.success(`Successfully updated product with id ${id}!`);
          }
        });
      }}
      className="rounded-lg border border-gray-700 bg-gray-800 shadow-md"
    >
      <div className="p-6 space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-400"
          >
            Product Name
          </label>
          <input
            id="productName"
            name="productName"
            value={data.productName}
            onChange={(e) => setData({ ...data, productName: e.target.value })}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-400"
          >
            Category
          </label>
          <select
            id="category"
            name="categoryId"
            value={data.categoryId}
            onChange={(e) => setData({ ...data, categoryId: e.target.value })}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {category.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-400"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={data.price}
            onChange={(e) => setData({ ...data, price: parseFloat(e.target.value) })}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Vendor */}
        <div>
          <label
            htmlFor="vendor"
            className="block text-sm font-medium text-gray-400"
          >
            Vendor
          </label>
          <input
            id="vendor"
            name="vendor"
            value={data.vendor}
            onChange={(e) => setData({ ...data, vendor: e.target.value })}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-400"
          >
            Status
          </label>
          <div className="flex items-center space-x-3">
            <input
              id="status"
              name="status"
              type="checkbox"
              checked={data.status}
              onChange={(e) => setData({ ...data, status: e.target.checked })}
              className="h-5 w-5 rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-200">Enabled</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end border-t border-gray-700 bg-gray-900 p-4">
        <FormButton />
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none",
        pending
          ? "cursor-not-allowed bg-gray-600 text-gray-400"
          : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#ffffff" /> : "Save Changes"}
    </button>
  );
}
