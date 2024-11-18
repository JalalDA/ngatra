"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [error]);

  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: "/" });
      }}
      className={`${loading
          ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
          : "bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-900 dark:active:bg-gray-800"
        } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-gray-300 transition-colors duration-75 focus:outline-none dark:border-gray-600`}
    >
      {loading ? (
        <LoadingDots color="#A8A29E" />
      ) : (
        <>
          <FontAwesomeIcon icon={faGoogle} size="lg" />
          <p className="text-sm font-medium">Login with Google</p>
        </>
      )}
    </button>
  );
}
