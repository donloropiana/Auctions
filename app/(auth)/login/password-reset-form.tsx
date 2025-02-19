'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { InputField } from '@/components/form/input-field'
import { useSupabase } from '@/components/providers/supabase-provider'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { getBaseUrl } from '@/lib/utils/url'

const loginSchema = z.object({
  email: z.string().email(),
})

export function PasswordResetForm() {
  const { supabase } = useSupabase()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getBaseUrl()}settings`,
      })
      if (error) {
        throw new Error('Unable to reset account password')
      }
    },
    onSuccess: (_, email) => {
      toast.success(`We sent a link to reset your password at ${email}`, {
        position: 'top-right',
      })
    },
    onError: () => {
      toast.error('Unable to reset account password, please contact us', {
        position: 'top-right',
      })
    },
  })

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col gap-4"
        onSubmit={form.handleSubmit(({ email }) => mutate(email))}
      >
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          control={form.control}
        />
        <Button className="w-full" loading={isPending}>
          Reset password
        </Button>
      </form>
    </Form>
  )
}
