'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { InputField } from '@/components/form/input-field'
import { useSupabase } from '@/components/providers/supabase-provider'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { OrSeparator } from '@/components/ui/or-separator'
import { REDIRECT_TO } from '@/lib/constants'

import { SignWithGoogleButton } from './sign-in-with-google-button'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().optional().nullable(),
})

export function LoginForm() {
  const router = useRouter()
  const { supabase } = useSupabase()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    if (values.password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
      if (data && !error) {
        router.push(REDIRECT_TO)
      } else {
        toast.error(
          'We could not sign you in with these credentials. Please try again.'
        )
      }
    } else {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: values.email,
      })
      if (data && !error) {
        toast.success('We sent you a code to your email.')
      } else {
        toast.error(
          'We could not sign you in with these credentials. Please try again.'
        )
      }
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3.5">
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            control={form.control}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            control={form.control}
          />
        </div>
        <div className="grid">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <OrSeparator className="sm:my-6" />
          <div className="flex flex-col gap-3">
            <Button className="w-full" type="button" variant="outline">
              Continue with Email
            </Button>
            <SignWithGoogleButton />
          </div>
        </div>
      </form>
    </Form>
  )
}
