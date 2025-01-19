import Image from "next/image";
import LoginButtonGoogle from "./login-button-google";
import { AuthForm} from "@/components/form/auth-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-gray-300 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-12">
      {/* Logo */}
      <Image
        alt="Ngatra Panel"
        width={100}
        height={100}
        className="relative mx-auto h-20 w-auto borderdark:scale-110 dark:border-gray-700"
        src="/ngatra-logo.svg"
      />
      <LoginButtonGoogle />
      <AuthForm/>
    </div>
  );
}
