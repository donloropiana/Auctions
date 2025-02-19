import { LoaderCircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Spinner({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <LoaderCircleIcon className={cn('size-3.5 animate-spin', className)} />
  );
}
