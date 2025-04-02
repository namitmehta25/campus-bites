'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Store token and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      toast.success('Registration successful!')
      router.push('/profile')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const inputFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      value: formData.name,
      placeholder: 'Enter your full name',
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      value: formData.email,
      placeholder: 'Enter your email address',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      value: formData.password,
      placeholder: 'Create a secure password',
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      value: formData.confirmPassword,
      placeholder: 'Confirm your password',
    },
  ]

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 to-teal-50 opacity-80" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white/90 shadow-xl backdrop-blur-sm"
      >
        <div className="relative p-8">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 opacity-20" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 opacity-20" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="mb-8 text-center text-gray-600">Join {process.env.NEXT_PUBLIC_APP_NAME} today</p>
            </motion.div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {inputFields.map((field, index) => (
                <motion.div 
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <motion.div 
                    whileTap={{ scale: 0.99 }}
                    className="mt-1"
                  >
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={field.value}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                </motion.div>
              ))}
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className="relative mt-6 w-full overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 text-center font-medium text-white shadow-md transition-all hover:from-indigo-500 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span 
                      className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </motion.form>
            
            <motion.div
              className="mt-8 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login here
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 