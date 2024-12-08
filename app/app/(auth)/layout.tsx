import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Platforms Starter Kit",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-green-300 to-blue-200">
      {children}
    </div>
  );
}
