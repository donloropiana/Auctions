import { ChevronLeftIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export const SidebarToggle = ({
  expanded,
  setExpanded,
  className,
}: {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        size="icon"
        variant="ghost"
        className={cn('rounded-full', className)}
        onClick={() => {
          setExpanded(!expanded)
          document.cookie = `sidebar_expanded=${!expanded}`
        }}
      >
        <ChevronLeftIcon
          className={cn('size-3.5 transition-transform', {
            'rotate-180': !expanded,
          })}
        />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="ml-3.5" side="right">
      {expanded ? 'Collapse' : 'Expand'} sidebar
    </TooltipContent>
  </Tooltip>
)
