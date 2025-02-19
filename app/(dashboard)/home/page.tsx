import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Body, Header } from '@/components/ui/container'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Home',
}

export default async function Home() {
  const supabase = await createClient()
  const { data: auth, error } = await supabase.auth.getUser()
  if (!auth.user || error) redirect('/login')

  const { data: user } = await supabase
    .from('profiles')
    .select('id, first_name, last_name')
    .eq('id', auth.user.id)
    .single()
  if (!user) redirect('/onboarding')

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
      <Header className="md:border-b-0" title={`${greeting}, ${user.first_name}`} />
      <Body className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="text-4xl font-bold text-center">
          Welcome to the Home Page
        </div>
      </Body>
    </div>
  )
}
