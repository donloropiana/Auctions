'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface InputFieldProps<TFieldValues extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label?: string
  className?: string
  inputClassName?: string
  orientation?: 'horizontal' | 'vertical'
}

export function InputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className,
  inputClassName,
  orientation = 'vertical',
  ...props
}: InputFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'space-y-0',
            {
              'grid grid-cols-4 items-center gap-4':
                orientation === 'horizontal',
              'flex flex-col gap-2': orientation === 'vertical',
            },
            className
          )}
        >
          {label && (
            <FormLabel
              className={cn({
                'text-right': orientation === 'horizontal',
              })}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              className={cn(
                { 'col-span-3': orientation === 'horizontal' },
                inputClassName
              )}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
