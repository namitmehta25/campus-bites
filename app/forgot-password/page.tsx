'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request')
      }

      setIsSubmitted(true)
      toast.success('Reset link sent to your email if account exists')
      
      // In development mode, log the token for testing
      if (data.token) {
        console.log('Reset token (for development):', data.token)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Reset Your Password
          </h1>
          
          {isSubmitted ? (
            <div className="text-center">
              <p className="mb-4 text-green-600">
                If an account exists with that email, we have sent password reset instructions.
              </p>
              <p className="mb-4 text-gray-600">
                Please check your email inbox. The link will expire in 1 hour.
              </p>
              <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Return to login
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-6 text-center text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Login here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 