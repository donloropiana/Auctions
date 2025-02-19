import { cn } from '@/lib/utils'

const Container = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col p-4', className)} {...props} />
)

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
}

const Title = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <h1 className={cn('text-2xl font-light sm:text-5xl', className)} {...props} />
)

const Header = ({ title, subtitle, className, children, ...props }: HeaderProps) => (
  <div
    className={cn(
      'flex justify-between gap-2 px-4 pb-2 pt-4 sm:px-10 sm:py-8 md:border-b',
      className,
    )}
    {...props}
  >
    {Boolean(title) && <Title>{title}</Title>}
    {Boolean(subtitle) && <p className="mt-1 text-base text-muted-foreground">{subtitle}</p>}
    {children}
  </div>
)

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
  hasPadding?: boolean
}

const Body = ({ hasPadding = true, className, ...props }: BodyProps) => (
  <div
    className={cn('flex flex-1 flex-col grow gap-4', hasPadding && 'p-4 sm:px-10', className)}
    {...props}
  />
)

export { Container, Header, Body, Title }
