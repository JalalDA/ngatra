"use client";

import { useEffect, useState } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import va from "@vercel/analytics";
import { createSite } from "@/lib/actions";

export default function Onboarding() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    subdomain: "",
    whatsapp: "",
    currency: "IDR", // Default currency
    description: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
      <div className="w-full max-w-lg bg-[#0f172a] rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-center mb-2">
          Create a new store
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Input your store's essential information
        </p>

        {/* Logo Upload */}
        <div className="flex justify-center mb-6">
          <button className="rounded-full bg-gray-800 border border-gray-700 text-sm px-4 py-2 text-gray-300 hover:bg-gray-700">
            Choose store logo
          </button>
        </div>

        <form
          action={async (data: FormData) =>
            createSite(data).then((res: any) => {
              if (res.error) {
                toast.error(res.error);
              } else {
                va.track("Created Site");
                const { id } = res;
                router.refresh();
                router.push(`/site/${id}`);
                toast.success(`Successfully created site!`);
              }
            })
          }
          className="space-y-6"
        >
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Store Name"
              autoFocus
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* WhatsApp Input */}
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">
              WhatsApp number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-gray-600 bg-gray-800 text-sm text-gray-400">
                +62
              </span>
              <input
                id="whatsapp"
                name="whatsapp"
                type="text"
                placeholder="Phone number"
                value={data.whatsapp}
                onChange={(e) =>
                  setData({ ...data, whatsapp: e.target.value })
                }
                className="w-full rounded-r-lg border border-l-0 border-gray-600 bg-gray-800 px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Currency Dropdown */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium mb-1">
              Currency <span className="text-red-500">*</span>
            </label>
            <select
              id="currency"
              name="currency"
              value={data.currency}
              onChange={(e) =>
                setData({ ...data, currency: e.target.value })
              }
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="IDR">IDR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Store Link */}
          <div>
            <label
              htmlFor="subdomain"
              className="block text-sm font-medium mb-1"
            >
              Store link <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                id="subdomain"
                name="subdomain"
                type="text"
                placeholder="subdomain"
                value={data.subdomain}
                onChange={(e) =>
                  setData({ ...data, subdomain: e.target.value })
                }
                autoCapitalize="off"
                pattern="[a-zA-Z0-9\-]+"
                className="w-full rounded-l-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
              <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-600 bg-gray-800 text-sm text-gray-400">
                .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <FormButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function FormButton() {
  return (
    <button
      type="submit"
      className="w-full flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Create
    </button>
  );
}
