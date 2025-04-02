'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
}

export default function VerificationBanner() {
  const [user, setUser] = useState<User | null>(null)
  const [isClosed, setIsClosed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleResendVerification = async () => {
    if (!user) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email')
      }

      toast.success('Verification email has been sent to your email address')
      
      // In development mode, log the token for testing
      if (data.token) {
        console.log('Verification token (for development):', data.token)
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend verification email')
    } finally {
      setIsLoading(false)
    }
  }

  // Don't show banner if no user, user has verified email, or banner is closed
  if (!user || user.emailVerified || isClosed) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span 
              className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-indigo-900"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              ⚠️
            </motion.span>
            <p className="text-sm text-white">
              Please verify your email address to access all features.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex space-x-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={handleResendVerification}
              disabled={isLoading}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <motion.span 
                    className="inline-block h-3 w-3 rounded-full border-2 border-white border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Sending...
                </span>
              ) : (
                'Resend verification email'
              )}
            </motion.button>
            
            <motion.button
              onClick={() => setIsClosed(true)}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Dismiss
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 