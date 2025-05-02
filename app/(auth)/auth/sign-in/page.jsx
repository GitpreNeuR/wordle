'use client'
import * as React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema } from '@/lib/validation'
import { createClient } from '@/lib/supabase/client'
import { useRouter,useSearchParams } from 'next/navigation'

export default function SigninPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = React.useState(false)
  
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })
  
  async function onSubmit(data) {
    setIsLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      
      if (error) {
        toast.error(error.message);
        return
      }
      
      toast.success('LOGGED IN SUCCESSFULLY')
      
      router.push('/main')
      router.refresh()
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Sign in to your account</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative text-xs uppercase">
          <span className="bg-black px-2 text-gray-400">OR</span>
        </div>
      </div>

      <p className="text-sm text-gray-400">Enter your credentials to access your account</p>

      <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label  htmlFor="email">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            {...register('email')}
            placeholder="name@example.com"
            className="py-5 text-sm md:text-base"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label  htmlFor="password">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Password"
            className="py-5 text-sm md:text-base"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/forgot-password" className="text-primary">
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-foreground/50 py-5 text-foreground text-sm md:text-base hover:bg-foreground/40"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}