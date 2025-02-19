import type { Metadata } from 'next' // maybe the error is the type being inside the {}
import Image from 'next/image'
import { redirect } from 'next/navigation'

import OnboardingForm from '@/app/onboarding/onboarding-form'
import { REDIRECT_TO } from '@/lib/constants'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Onboarding',
}

// Protected route - only authenticated users can access this page.
export default async function Registration() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id)
    .single()

  if (profile) redirect('/home')

  return (
    <div className="container flex flex-1 flex-col justify-center gap-8 px-6 py-8 xl:gap-14 xl:px-0">
      <h1 className="text-5xl font-thin tracking-tight px-6">Welcome to Auctions</h1>
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-12 px-6">
        <div className="w-full space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl/none font-medium">Registration form</h2>
            <p className="text-sm text-muted-foreground">
              Let's get you set up real quick.
            </p>
          </div>
          <OnboardingForm />
        </div>
        <div className="hidden lg:block lg:w-full">
          <Image
            priority
            width={700}
            height={700}
            alt="Speaker"
            src="/img/boilermaker.jpg"
            className="object-contain grayscale"
            style={{
              borderBottomLeftRadius: 100,
              borderTopRightRadius: 100,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}
