import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  avatar_url : z.string().optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Za-z0-9]/, { message: 'Password must contain letters or numbers' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, or underscores' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, "Password is required"),
})