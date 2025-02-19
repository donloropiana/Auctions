import { cn } from '@/lib/utils'

interface OrSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OrSeparator({ className, ...props }: OrSeparatorProps) {
  return (
    <div className={cn('my-4 flex items-center', className)} {...props}>
      <hr className="h-px flex-1 bg-gray-300" />
      <p className="mx-4 text-sm text-gray-500">or</p>
      <hr className="h-px flex-1 bg-gray-300" />
    </div>
  )
}
