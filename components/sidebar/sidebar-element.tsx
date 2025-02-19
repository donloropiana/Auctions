import Link from 'next/link'
import type { IconProps } from '@radix-ui/react-icons/dist/types'
import type { LucideIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// NOTE: refactor to use LinkButton
export function SidebarElement({
  current,
  expanded,
  href,
  title,
  Icon,
}: {
  current: string
  expanded: boolean
  href: string
  title: string
  Icon: LucideIcon | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
}) {
  const coreLink = (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          class: cn(
            'w-full justify-start gap-2.5 px-3.5 text-sm font-light text-muted-foreground',
            { 'bg-accent text-foreground': current === href.slice(1) },
          ),
        }),
      )}
    >
      <Icon className="size-4 min-w-4" />
      {expanded ? <span className="line-clamp-1">{title}</span> : null}
    </Link>
  )

  return expanded ? (
    coreLink
  ) : (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>{coreLink}</TooltipTrigger>
      <TooltipContent className="ml-2 text-xs" side="right">
        {title}
      </TooltipContent>
    </Tooltip>
  )
}
