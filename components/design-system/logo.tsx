import Image from 'next/image'
import Link, { type LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

interface LogoProps extends Omit<LinkProps, 'href'> {
  className?: string
  logoClassName?: string
  hasWordmark?: boolean
  href?: string
}

export function Logo({
  className,
  logoClassName,
  hasWordmark = false,
  href = '/',
  ...props
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 text-xl font-medium text-secondary-foreground hover:text-secondary-foreground/90 sm:text-2xl',
        className
      )}
      {...props}
    >
      <Image
        src="/cocktail-glass.png"
        alt="Logo"
        width={256}
        height={256}
        className={cn('size-9 min-w-9', logoClassName)}
        priority
      />
      {hasWordmark && <Wordmark />}
    </Link>
  )
}

export function Wordmark() {
  return (
    <Image
      className="hidden h-auto w-56 sm:inline"
      src="/logo-wordmark.png"
      alt="logo"
      width={256}
      height={42}
    />
  )
}
