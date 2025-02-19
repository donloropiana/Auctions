'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'

import { Logo } from '@/components/design-system/logo'
import { useSupabase } from '@/components/providers/supabase-provider'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SiteHeader() {
  const { user } = useSupabase()

  return (
    <header
      // bg-[#000914]
      className="sticky top-0 z-10 w-full bg-transparent py-4 backdrop-blur-md sm:py-4"
      // style={{ '--tw-backdrop-blur': 'blur(10px)' }}
    >
      <nav className="flex w-full select-none items-center justify-between px-6 sm:px-10">
        <Logo logoClassName="size-10" className="invert" />
        {user ? (
          <Link
            href="/home"
            className={buttonVariants({
              class: 'bg-neutral-100 text-neutral-950 hover:bg-neutral-300',
            })}
          >
            <ArrowRightIcon className="size-3.5" />
            Enter
          </Link>
        ) : (
          <Link
            href="/login"
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'lg',
                class:
                  '!border-white bg-transparent text-white hover:bg-neutral-50 hover:text-neutral-950',
              })
            )}
          >
            Sign in
          </Link>
        )}
      </nav>
    </header>
  )
}
