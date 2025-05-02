'use client'
import * as React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signupSchema } from '@/lib/validation'
import {toast} from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {

  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })
  
  async function onSubmit(data) {
    setIsLoading(true)
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
        },
      })
      
      if (authError) {
        toast.error(authError.message) 

        return
      }
      
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            username: data.username,
            email: data.email,
          })
        
        if (profileError) {
         toast.error(profileError.message);
          return
        }
        
        toast.success(
         
         "You have successfully registered and logged in"
        )
        
        router.push('/main')
        router.refresh()
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Create your account</h1>
        <p className="text-sm text-foreground/50">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-foreground/50"></div>
        </div>
        <div className="relative text-xs uppercase">
          <span className="bg px-2 text-foreground bg-background">OR</span>
        </div>
      </div>

      <p className="text-sm text-foreground/50">Enter your email below to create your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            {...register('username')}
            placeholder="Spensor_123"
            className="py-5 text-sm md:text-base"
          />
          {errors.username && (
            <p className="mt-1 text-xs text-destructive">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
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
          <Label htmlFor="password">
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

        <Button
          type="submit"
          className="w-full bg-foreground/50 py-5 text-foreground hover:bg-foreground/40"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  )
}