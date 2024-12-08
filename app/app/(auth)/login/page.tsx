import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import LoginButtonGoogle from "./login-button-google";
import AuthPage from "./auth-page";

export default function LoginPage() {
  return (
    // <div className="mx-5 border border-gray-300 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
    //   {/* Logo */}
    //   <Image
    //     alt="PPOB Panel"
    //     width={100}
    //     height={100}
    //     className="relative mx-auto h-12 w-auto rounded-full border border-gray-200 dark:scale-110 dark:border-gray-700"
    //     src="/logo.png"
    //   />

    //   {/* Title */}
    //   <h1 className="mt-6 text-center font-cal text-3xl font-bold text-gray-900 dark:text-white">
    //     PPOB Panel
    //   </h1>

    //   {/* Description */}
    //   <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
    //     Manage payments and transactions effortlessly. <br />
    //     <a
    //       className="font-medium text-blue-600 hover:underline dark:text-blue-400"
    //       href="https://example.com/announcement"
    //       rel="noreferrer"
    //       target="_blank"
    //     >
    //       Learn more about PPOB Panel.
    //     </a>
    //   </p>

    //   {/* Login Button */}
    //   <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
    //     <Suspense
    //       fallback={
    //         <div className="my-2 h-10 w-full rounded-md border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800" />
    //       }
    //     >
    //       <LoginButtonGoogle />
    //     </Suspense>
    //   </div>
    // </div>
    <AuthPage/>
  );
}
