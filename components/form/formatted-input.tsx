// import { forwardRef } from 'react'

// import { Input, type InputProps } from '@/components/ui/input'
// import { formatDashes } from '@/lib/utils/formatting'

// const FormattedInput = forwardRef<
//   HTMLInputElement,
//   InputProps & { regex: RegExp }
// >(({ regex, value, onChange, ...props }, ref) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value
//     const formatted = formatDashes(inputValue, regex)

//     if (onChange)
//       onChange({
//         ...e,
//         target: { ...e.target, value: formatted },
//       } as React.ChangeEvent<HTMLInputElement>)
//   }

//   const formattedValue = formatDashes((value as string) ?? '', regex)

//   return (
//     <Input
//       ref={ref}
//       value={formattedValue}
//       onChange={handleChange}
//       maxLength={15}
//       {...props}
//     />
//   )
// })

// FormattedInput.displayName = 'FormattedInput'

// export { FormattedInput }
