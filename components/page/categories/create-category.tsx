"use client";

import { toast } from "sonner";
import { createCategory } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "../../modal/provider";
import va from "@vercel/analytics";
import { useState } from "react";

export default function CreateCategoryModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState({
    category_name: "",
    iconUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("iconUrl", data.iconUrl);

    createCategory(formData).then((res: any) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        va.track("Created Category");
        const { id } = res;
        router.refresh();
        router.push(`/category/${id}`);
        modal?.hide();
        toast.success(`Successfully created category!`);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 dark:md:border-gray-700"
    >
      {/* Form Header */}
      <div className="flex flex-col space-y-4 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Create a New Category
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter details about your category to get started.
        </p>

        {/* Category Name */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="category_name"
            className="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Category Name
          </label>
          <input
            id="category_name"
            name="category_name"
            type="text"
            placeholder="Category Name"
            value={data.category_name}
            onChange={(e) =>
              setData({ ...data, category_name: e.target.value })
            }
            maxLength={32}
            required
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-500"
          />
        </div>

        {/* Icon URL */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="iconUrl"
            className="text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Icon URL
          </label>
          <input
            id="iconUrl"
            name="iconUrl"
            type="url"
            placeholder="https://example.com/icon.png"
            value={data.iconUrl}
            onChange={(e) => setData({ ...data, iconUrl: e.target.value })}
            required
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <button
          type="button"
          onClick={modal?.hide}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <CreateCategoryFormButton />
      </div>
    </form>
  );
}

function CreateCategoryFormButton() {
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
      {pending ? <LoadingDots color="#ffffff" /> : "Create Category"}
    </button>
  );
}
