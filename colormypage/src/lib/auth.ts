"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

// Create a server-side Supabase client
const getSupabaseServer = () => {
  const cookieStore = cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials are missing. Please check your environment variables.")
  }

  return createClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// Register schema
export const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>

// Login action
export async function login(formData: LoginFormValues) {
  try {
    const validatedFields = loginSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
        details: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email, password } = validatedFields.data

    const supabase = getSupabaseServer()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        error: error.message,
        status: "error",
      }
    }

    return {
      user: data.user,
      status: "success",
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "An unexpected error occurred",
      status: "error",
    }
  }
}

// Register action
export async function register(formData: RegisterFormValues) {
  try {
    const validatedFields = registerSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
        details: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email, password } = validatedFields.data

    const supabase = getSupabaseServer()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      return {
        error: error.message,
        status: "error",
      }
    }

    return {
      user: data.user,
      status: "success",
      message: "Please check your email to verify your account",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      error: "An unexpected error occurred",
      status: "error",
    }
  }
}

// Logout action
export async function logout() {
  const supabase = getSupabaseServer()
  await supabase.auth.signOut()
  redirect("/auth")
}

// Check session
export async function getSession() {
  try {
    const supabase = getSupabaseServer()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

