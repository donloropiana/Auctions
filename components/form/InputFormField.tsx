'use client'

import { InfoCircledIcon } from '@radix-ui/react-icons'
import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface InputFormFieldProps<TFieldValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label?: string
  description?: string
  tooltip?: string
  rootClassname?: string
}
export const InputFormField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  tooltip,
  rootClassname,
  type = 'text',
  ...props
}: InputFormFieldProps<TFieldValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={rootClassname}>
        {label && (
          <div className="flex items-center gap-2">
            {tooltip ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <FormLabel className="inline-flex items-center gap-1.5">
                    {label} <InfoCircledIcon className="size-3" />
                  </FormLabel>
                </TooltipTrigger>
                <TooltipContent className="w-64" align="start">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            ) : (
              <FormLabel>{label}</FormLabel>
            )}
          </div>
        )}
        <FormControl>
          <Input type={type} {...field} {...props} />
        </FormControl>
        {description && (
          <FormDescription className="text-xs">{description}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
)

export const InputFieldHorizontal = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  ...props
}: InputFormFieldProps<TFieldValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="grid w-full grid-cols-4 items-start gap-4 space-y-0">
        <FormLabel className="mt-0.5 text-right" htmlFor={name}>
          {label}
        </FormLabel>
        <FormControl>
          <div className="col-span-3 flex gap-1">
              <Input
                id={name}
                autoComplete="no"
                placeholder={placeholder}
                type={type}
                {...field}
                value={field.value ?? ''}
                {...props}
              />
            <FormMessage />
          </div>
        </FormControl>
        {description && (
          <FormDescription className="text-xs">{description}</FormDescription>
        )}
      </FormItem>
    )}
  />
)
