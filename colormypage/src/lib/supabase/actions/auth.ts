'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface AuthValues {
  emailAddress: string
  password: string
}

interface UpdatePasswordValues {
  newPassword: string
}

// interface ResetPasswordValues {
//   emailAddress: string
// }

export async function login(values: AuthValues): Promise<{ success: boolean }> {
  const supabase = await createClient()

  const data = {
    email: values.emailAddress,
    password: values.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { success: false }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signup(values: AuthValues): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const data = {
    email: values.emailAddress,
    password: values.password,
  }

  const { error } = await supabase.auth.signUp(data)
  
  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}



export async function logout(): Promise<void> {
  const supabase = await createClient()

  await supabase.auth.signOut()
  revalidatePath('/')
  redirect('/')
}

// export async function resetPassword(values: ResetPasswordValues): Promise<void> {
//   const supabase = await createClient()
//   const { error } = await supabase.auth.resetPasswordForEmail(values.emailAddress, {
//     redirectTo: "http://localhost:3000/update-password",
//   })
// }

export async function updatePassword(values: UpdatePasswordValues): Promise<void> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.updateUser({ password: values.newPassword })

  console.log('resetpass', data)
  console.log('resetpass', error)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/')
  redirect('/')
}

