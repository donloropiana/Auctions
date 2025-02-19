import Image from 'next/image'

import { useSupabase } from '@/components/providers/supabase-provider'
import { Button } from '@/components/ui/button'
import { getBaseUrl } from '@/lib/utils/url'

export function SignWithGoogleButton() {
  const { supabase } = useSupabase()

  async function onClick() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getBaseUrl()}auth/callback`,
      },
    })
  }

  return (
    <Button
      className="w-full"
      type="button"
      variant="outline"
      onClick={onClick}
    >
      <Image
        src="/google-logo.png"
        className="size-3.5"
        width={16}
        height={16}
        alt="Google Logo"
      />
      Continue with Google
    </Button>
  )
}
