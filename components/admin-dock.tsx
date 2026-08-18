'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, ArrowLeft } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { isAdmin } from '@/lib/admin'

export function AdminDock() {
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const show = isAdmin(user?.email)
  const onAdminRoute = pathname?.startsWith('/admin')

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
        >
          <Link
            href={onAdminRoute ? '/' : '/admin'}
            className="flex items-center gap-2 bg-foreground text-background rounded-full px-4 py-2.5 text-sm font-medium shadow-lg shadow-black/20 hover:opacity-90 transition-opacity"
          >
            {onAdminRoute ? <ArrowLeft className="size-4" /> : <LayoutDashboard className="size-4" />}
            {onAdminRoute ? 'Grįžti į svetainę' : 'Admin skydelis'}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
