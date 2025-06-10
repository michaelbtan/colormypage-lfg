"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EyeIcon, EyeOffIcon, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePassword } from "@/lib/supabase/actions/auth";

const FormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  setIsLoading(true);
  try {
    const result = await updatePassword({ newPassword: data.password });

    if (result.success) {
      toast("Password updated successfully", {
        description: "Your password has been changed.",
        descriptionClassName: "!text-black font-medium",
      });
      redirect('/'); 
    } else {
      toast("Update failed", {
        description: result.error || "Unable to update password. Please try again.",
        descriptionClassName: "!text-black font-medium",
      });
    }
  } catch (error) {
    console.error("Password update error:", error);
    toast("Something went wrong", {
      description: "Unable to update password. Please try again.",
      descriptionClassName: "!text-black font-medium",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 py-6 border-gray-200"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* lock icon */}
                  <svg width="24" height="24" fill="none" stroke="currentColor">
                    <path d="M19 11H5V21H19V11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 9V8C17 5.24 14.76 3 12 3C9.24 3 7 5.24 7 8V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Confirm Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 py-6 border-gray-200"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* lock icon */}
                  <svg width="24" height="24" fill="none" stroke="currentColor">
                    <path d="M19 11H5V21H19V11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 9V8C17 5.24 14.76 3 12 3C9.24 3 7 5.24 7 8V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full rounded-full py-6 h-auto bg-[#9d84ff] hover:bg-[#8a6dff] text-white font-medium cursor-pointer transition-transform duration-300 hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating Password...
            </>
          ) : (
            <>
              Update Password <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
