import type { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { AnimatedDiv } from '@/components/design-system/animated-div'
import { REDIRECT_TO } from '@/lib/constants'
import { createClient } from '@/lib/supabase/server'

import { LoginContainer } from './container'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Login to your Twilight account',
}

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) redirect(REDIRECT_TO)

  return (
    <AnimatedDiv
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.2 },
      }}
      className="flex h-svh w-full"
    >
      <div className="size-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex h-full items-center justify-center px-6 py-8">
          <LoginContainer />
        </div>
        <div className="hidden lg:block">
          <Image
            priority
            alt="Login hero"
            src="/img/boilermaker.jpg"
            className="size-full object-cover dark:brightness-[0.8]"
            width={900}
            height={1080}
          />
        </div>
      </div>
    </AnimatedDiv>
  )
}
