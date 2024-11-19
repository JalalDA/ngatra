"use client";
import { useState } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import va from "@vercel/analytics";

export default function Vendor({
  siteVendor,
  vendor,
  handleSubmit,
}: {
  siteVendor: any;
  vendor: any;
  handleSubmit: any;
}) {
  const [data, setData] = useState<{ siteVendor: any[] }>({
    siteVendor,
  });
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleChange = (vendorId: string, checked: boolean) => {
    const updatedVendors = checked
      ? [...data.siteVendor, vendorId]
      : data.siteVendor.filter((id) => id !== vendorId);

    setData({ siteVendor: updatedVendors });

    // Trigger auto-save
    setSaving(true);
    handleSubmit({ siteVendor: updatedVendors }, id)
      .then((res: any) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          va.track("Auto-Save Vendor", id ? { id } : {});
          router.refresh();
          toast.success("Changes saved successfully!");
        }
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-md">
      <div className="p-6 space-y-6">
        {vendor.length > 0 ? (
          <>
            {vendor.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-200">{item.vendorName}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="vendor"
                    name="vendor[]"
                    checked={data.siteVendor.indexOf(item.id) !== -1}
                    onChange={(e) => handleChange(item.id, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>
            ))}
          </>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No Vendors available at this time.
          </p>
        )}
      </div>
      {saving && (
        <div className="text-sm text-gray-400 p-4">Saving changes...</div>
      )}
    </div>
  );
}
