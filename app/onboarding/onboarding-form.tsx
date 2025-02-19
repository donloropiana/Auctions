'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { InputFormField } from '@/components/form/InputFormField'
import { useSupabase } from '@/components/providers/supabase-provider'
import { Button } from '@/components/ui/button'
import { Form as UIForm } from '@/components/ui/form'
import { insertProfile } from '@/lib/api/profiles'
import { onboardingFormSchema } from '@/lib/schemas/profile'
import { CalendarInput } from '@/components/ui/calendar-input'

export default function OnboardingForm() {
  const { user } = useSupabase()
  const router = useRouter()
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      username: '',
      dob: '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: insertProfile,
    onSuccess: () => {
      toast.success('Onboarding completed. Redirecting to your dashboard...')
      router.push('/licensing')
    },
    onError: () => {
      toast.error('Error creating profile. Please try again.')
    },
  })

  async function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
    if (!user) return
    mutate({
      id: user.id,
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username ?? '',
      dob: values.dob ?? '1970-01-01',
      email: user.email ?? '',
      avatar_filename: '',
    })
  }

  return (
    <UIForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-x-5 gap-y-2 md:grid-cols-2">
          <InputFormField
            control={form.control}
            name="first_name"
            label="First name"
            placeholder="Rick"
          />
          <InputFormField
            control={form.control}
            name="last_name"
            label="Last name"
            placeholder="Rubin"
          />
        </div>
        <div className="grid gap-x-5 gap-y-2 md:grid-cols-2">
          <InputFormField
            control={form.control}
            name="username"
            label="Username"
            placeholder="jerrysmith"
          />
          <CalendarInput control={form.control} name="dob" label="Date of birth" />
        </div>
        <Button type="submit" className="mt-2 w-1/2">
          Continue
        </Button>
      </form>
    </UIForm>
  )
}
