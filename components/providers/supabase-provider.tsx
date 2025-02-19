'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Session, User } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

import { getProfile } from '@/lib/api/profiles'
import { PUBLIC_ROUTES } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/types/database'
import type { TypedSupabaseClient } from '@/lib/types/supabase'

type Context = {
  supabase: TypedSupabaseClient
  session: Session | null
  user: User | null
  profile: Tables<'profiles'> | undefined
} | undefined

const SupabaseContext = createContext<Context>(undefined)

type SupabaseProviderProps = {
  children: React.ReactNode
  initialSession?: Session | null
}

export default function SupabaseProvider({
  children,
  initialSession = null,
}: SupabaseProviderProps) {
  const router = useRouter()
  const supabase = createClient()
  const pathname = usePathname()

  // Pre-hydrate using the server-passed initialSession
  const [session, setSession] = useState<Session | null>(initialSession)
  const [user, setUser] = useState<User | null>(initialSession ? initialSession.user : null)

  const { data: profile, isPending: profilePending } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(supabase, { id: user?.id as string }),
    enabled: !!user?.id,
  })

  useEffect(() => {
    if (
      user &&
      !profilePending &&
      !profile &&
      ![...PUBLIC_ROUTES, '/onboarding'].includes(pathname)
    ) {
      router.replace('/onboarding')
    }
  }, [user, profile, profilePending, pathname, router])

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        router.replace('/')
      } else if (session) {
        setSession(session)
        setUser(session.user)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <SupabaseContext.Provider value={{ supabase, session, user, profile }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context
}
