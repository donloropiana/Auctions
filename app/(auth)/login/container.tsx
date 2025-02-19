'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { LoginForm } from '../../../components/login/login-form'
import { PasswordResetForm } from './password-reset-form'

type FormScreen = 'login' | 'forgot-password'

const screenText = {
  login: {
    title: 'Welcome',
    description: '',
    buttonText: 'Forgot your password?',
  },
  'forgot-password': {
    title: 'Forgot your password?',
    description: 'Enter your email below to receive a password reset link',
    buttonText: 'Back to login',
  },
}

const formComponents: Record<FormScreen, React.ReactNode> = {
  login: <LoginForm />,
  'forgot-password': <PasswordResetForm />,
}

export function LoginContainer() {
  const [formScreen, setFormScreen] = useState<FormScreen>('login')

  return (
    <div className="mx-auto flex h-[520px] w-[500px] flex-col gap-6">
      <div className="grid gap-2">
        <h1 className="tracking-tight">{screenText[formScreen].title}</h1>
        <p className="text-balance text-muted-foreground">{screenText[formScreen].description}</p>
      </div>
      <div className="flex-1">{formComponents[formScreen]}</div>
      <div className="mt-4 flex w-full items-center justify-end">
        <Button
          className="px-0.5 text-sm underline"
          onClick={() => {
            setFormScreen(formScreen === 'login' ? 'forgot-password' : 'login')
          }}
          variant="link"
        >
          {screenText[formScreen].buttonText}
        </Button>
      </div>
    </div>
  )
}
