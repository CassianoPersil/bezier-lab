'use client'

// =============================================================================
// LOGIN PAGE — Admin Hub
// =============================================================================

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LogoImagotipo, Button, Input } from '@bezier-lab/ui'
import { Mail, Lock, AlertCircle } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@bezierlab.com',
      password: '',
    },
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,240,255,0.06)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-96 bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.4)] to-transparent" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="bg-surface-1 border border-border rounded-2xl p-8 shadow-modal">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <LogoImagotipo height={36} />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-ink tracking-tight mb-1">Admin Hub</h1>
            <p className="text-sm text-ink-muted">Sign in to access the backoffice</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" id="admin-login-form">
            <Input
              id="email-input"
              label="Email"
              type="email"
              placeholder="admin@bezierlab.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={!!errors.email}
              errorMessage={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password-input"
              label="Password"
              type="password"
              placeholder="••••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              error={!!errors.password}
              errorMessage={errors.password?.message}
              {...register('password')}
            />

            {/* Error alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-danger/10 border border-danger/30 text-sm text-danger"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              id="login-submit-btn"
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Sign in
            </Button>
          </form>

          {/* Footer note */}
          <p className="text-xs text-ink-muted text-center mt-6">
            Protected backoffice — unauthorized access prohibited.
          </p>
        </div>

        {/* Glow border top */}
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.4)] to-transparent" />
      </motion.div>
    </div>
  )
}
