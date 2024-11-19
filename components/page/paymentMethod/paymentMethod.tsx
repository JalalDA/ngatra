"use client";
import { useState } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import va from "@vercel/analytics";

export default function PaymentMethod({
  sitePaymentMethod,
  paymentMethod,
  handleSubmit,
}: {
  sitePaymentMethod: any;
  paymentMethod: any;
  handleSubmit: any;
}) {
  const [data, setData] = useState<{ sitePaymentMethod: any[] }>({
    sitePaymentMethod,
  });
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleChange = (itemId: string, checked: boolean) => {
    const updatedPaymentMethods = checked
      ? [...data.sitePaymentMethod, itemId]
      : data.sitePaymentMethod.filter((id) => id !== itemId);

    setData({ sitePaymentMethod: updatedPaymentMethods });

    // Trigger auto-save
    setSaving(true);
    handleSubmit({ sitePaymentMethod: updatedPaymentMethods }, id)
      .then((res: any) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          va.track("Auto-Save Payment Method", id ? { id } : {});
          router.refresh();
          toast.success("Changes saved successfully!");
        }
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-md">
      <div className="p-6 space-y-6">
        {paymentMethod.length > 0 ? (
          <>
            {paymentMethod.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-200">{item.name}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="paymentMethod"
                    name="paymentMethod[]"
                    checked={data.sitePaymentMethod.indexOf(item.id) !== -1}
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
            No Payment Methods available at this time.
          </p>
        )}
      </div>
      {saving && (
        <div className="text-sm text-gray-400 p-4">Saving changes...</div>
      )}
    </div>
  );
}
