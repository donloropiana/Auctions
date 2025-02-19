import { z } from 'zod'

const nameSchema = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters.' })
  .max(64, { message: 'Name must be at most 64 characters.' })


export const onboardingFormSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(32, { message: 'Username must be at most 32 characters.' })
    .optional(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Please enter a valid date of birth.' }).optional()
})

export const profileSchema = z.object({
  first_name: nameSchema.optional(),
  last_name: nameSchema.optional(),
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(32, { message: 'Username must be at most 32 characters.' })
    .optional(),
  avatar_filename: z.string().url().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }).optional(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Please enter a valid date of birth.' }).optional()
})
