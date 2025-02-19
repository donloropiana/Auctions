'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/components/providers/supabase-provider'
import { Body, Header } from '@/components/ui/container'

export default function Home() {
  const router = useRouter()
  const { user, profile } = useSupabase()
  
  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user, router])


  const now = new Date()
  const hour = now.getHours()
  let greeting = ''
  if (hour >= 21 || hour < 5) {
    greeting = 'Good evening'
  } else if (hour < 12) {
    greeting = 'Good morning'
  } else if (hour < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }

  return (
    <div className="flex h-full flex-col">
      <Header className="md:border-b-0" title={`${greeting}, ${profile?.first_name}`} />
      <Body className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="text-4xl font-bold text-center">
          Welcome to the Home Page
        </div>
      </Body>
    </div>
  )
}
