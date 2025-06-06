import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import logo from "@/assets/logo.png";

export const metadata = {
  title: "Reset Password",
  description:
    "Join ColorMyPage to access thousands of free coloring pages, save your favorites, and share your creations with our community.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen">
        <div className="flex flex-col items-center justify-center w-full p-6">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link href="/" className="inline-block mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <h1 className="text-3xl font-bold">
                    <span className="text-[#9d84ff]">Color</span>
                    <span className="text-gray-800">My</span>
                    <span className="text-gray-800">Page</span>
                  </h1>
                </div>
              </Link>
              <h2 className="text-2xl font-bold">Reset Your Password</h2>
              <p className="mt-2 text-gray-600">
                Enter your email address below to receive a link to reset your
                password.
              </p>
            </div>

            {/* Form Container with Tabs */}
            <div className="rounded-xl shadow-md border border-gray-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="px-6 py-8">
                <ForgotPasswordForm />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 blur-3xl opacity-20 bg-[#9d84ff] w-40 h-40 rounded-full top-20 -right-10"></div>
            <div className="absolute -z-10 blur-3xl opacity-20 bg-[#5bbce4] w-40 h-40 rounded-full bottom-20 -left-10"></div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
