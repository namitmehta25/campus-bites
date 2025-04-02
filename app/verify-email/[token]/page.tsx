'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const { token } = params
  
  const [isVerifying, setIsVerifying] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify email')
        }

        setIsVerified(true)
        toast.success('Email verified successfully')
        
        // Update user in localStorage if logged in
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const user = JSON.parse(storedUser)
          user.emailVerified = true
          localStorage.setItem('user', JSON.stringify(user))
        }
      } catch (error: any) {
        setError(error.message)
        toast.error(error.message)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Email Verification
          </h1>
          
          {isVerifying ? (
            <div className="text-center">
              <p className="text-gray-600">Verifying your email...</p>
              <div className="mt-4 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
              </div>
            </div>
          ) : isVerified ? (
            <div className="text-center">
              <p className="mb-4 text-green-600">
                Your email has been verified successfully!
              </p>
              <p className="mb-4 text-gray-600">
                You can now enjoy all features of Campus Bites.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/login" className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-500">
                  Login
                </Link>
                <Link href="/" className="rounded-md border border-purple-600 px-4 py-2 text-purple-600 hover:bg-purple-50">
                  Go to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-red-600">
                {error || 'Failed to verify your email.'}
              </p>
              <p className="mb-4 text-gray-600">
                The verification link may be invalid or expired.
              </p>
              <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Return to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 