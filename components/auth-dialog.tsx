'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2, XCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Mode = 'login' | 'register' | 'forgot'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  redirectTo?: string
}

export function AuthDialog({
  open,
  onOpenChange,
  redirectTo,
}: Props) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const router = useRouter()

  const reset = () => {
    setError(null)
    setSuccess(null)
    setLoading(false)
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    setPassword('')
    setConfirmPassword('')
    reset()
  }

  // Only show mismatch feedback once the user has typed something in confirm field
  const passwordsMatch = confirmPassword === '' || password === confirmPassword
  const confirmTouched = confirmPassword.length > 0
  const canRegister = password === confirmPassword && password.length >= 6

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(
        error.message === 'Invalid login credentials'
          ? 'Neteisingas el. paštas arba slaptažodis.'
          : error.message,
      )
    } else {
      onOpenChange(false)
      if (redirectTo) {
        router.push(redirectTo)
      }
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canRegister) {
      setError('Slaptažodžiai nesutampa.')
      return
    }
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: { full_name: name },
      },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Registracija sėkminga! Patikrinkite el. paštą patvirtinimo nuorodai.')
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
        `${window.location.origin}/auth/callback`,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Slaptažodžio atstatymo nuoroda išsiųsta į jūsų el. paštą.')
    }
  }

  const titles: Record<Mode, string> = {
    login: 'Prisijungti',
    register: 'Registruotis',
    forgot: 'Pamiršau slaptažodį',
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border p-0 overflow-hidden">
        <DialogTitle className="sr-only">{titles[mode]}</DialogTitle>

        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground">{titles[mode]}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {mode === 'login' && 'Sveiki sugrįžę!'}
              {mode === 'register' && 'Sukurkite paskyrą'}
              {mode === 'forgot' && 'Įveskite savo el. pašto adresą'}
            </p>
          </div>

          {/* Google button (login and register only) */}
          {mode !== 'forgot' && (
            <>
              <Button
                type="button"
                variant="outline"
                className="w-full border-border/60 text-foreground hover:bg-secondary gap-2 mb-4 py-6"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                )}
                Tęsti su Google
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <Separator className="flex-1 bg-border/50" />
                <span className="text-muted-foreground text-xs">arba</span>
                <Separator className="flex-1 bg-border/50" />
              </div>
            </>
          )}

          {/* Forms */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={
                mode === 'login'
                  ? handleLogin
                  : mode === 'register'
                    ? handleRegister
                    : handleForgot
              }
              className="flex flex-col gap-3"
            >
              {/* Name (register only) */}
              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Vardas ir pavardė"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-secondary border border-border/60 rounded-xl px-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="El. paštas"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-secondary border border-border/60 rounded-xl px-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Password */}
              {mode !== 'forgot' && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Slaptažodis"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-secondary border border-border/60 rounded-xl px-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Slėpti slaptažodį' : 'Rodyti slaptažodį'}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              )}

              {/* Confirm password (register only) */}
              {mode === 'register' && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Pakartokite slaptažodį"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className={`w-full bg-secondary border rounded-xl px-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all pr-10 ${confirmTouched && !passwordsMatch
                      ? 'border-destructive/60 focus:ring-destructive/40 focus:border-destructive/60'
                      : confirmTouched && passwordsMatch
                        ? 'border-primary/60 focus:ring-primary/50 focus:border-primary/50'
                        : 'border-border/60 focus:ring-primary/50 focus:border-primary/50'
                      }`}
                  />
                  {/* Show/hide toggle */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirmPassword ? 'Slėpti slaptažodį' : 'Rodyti slaptažodį'}
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                  {/* Match indicator icon */}
                  {confirmTouched && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      {passwordsMatch ? (
                        <CheckCircle2 className="size-4 text-primary" />
                      ) : (
                        <XCircle className="size-4 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Inline mismatch hint */}
              <AnimatePresence>
                {mode === 'register' && confirmTouched && !passwordsMatch && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-destructive text-xs -mt-1 pl-1"
                  >
                    Slaptažodžiai nesutampa
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Forgot password link */}
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-xs text-primary hover:text-primary/80 text-right transition-colors"
                >
                  Pamiršau slaptažodį
                </button>
              )}

              {/* Error / Success */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/10 border border-destructive/30 rounded-xl px-3 py-2.5 text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 border border-primary/30 rounded-xl px-3 py-2.5 text-primary text-sm"
                >
                  {success}
                </motion.div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || (mode === 'register' && !canRegister)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-semibold mt-1 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  titles[mode]
                )}
              </Button>
            </motion.form>
          </AnimatePresence>

          {/* Footer links */}
          <div className="mt-5 text-center text-sm">
            {mode === 'login' && (
              <p className="text-muted-foreground">
                Neturite paskyros?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className="text-primary hover:underline font-medium"
                >
                  Registruotis
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-muted-foreground">
                Jau turite paskyrą?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-primary hover:underline font-medium"
                >
                  Prisijungti
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <button
                onClick={() => switchMode('login')}
                className="text-primary hover:underline font-medium"
              >
                Grįžti į prisijungimą
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
