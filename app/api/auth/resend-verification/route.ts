import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    await connectDB()
    
    // Find user by email
    const user = await User.findOne({ email })
    
    if (!user) {
      // For security reasons, still return success even if email doesn't exist
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a verification link' },
        { status: 200 }
      )
    }
    
    // If email is already verified, no need to resend
    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Your email is already verified' },
        { status: 200 }
      )
    }
    
    // Generate new verification token
    const verificationToken = crypto.randomBytes(20).toString('hex')
    
    // Set token expiration (24 hours)
    const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000
    
    // Save token to user
    user.verificationToken = verificationToken
    user.verificationTokenExpiry = verificationTokenExpiry
    await user.save()
    
    // In a real application, send an email with the verification link
    // For now, we'll just return the token in the response
    // This would be replaced with actual email sending logic
    
    return NextResponse.json(
      { 
        message: 'If your email is registered, you will receive a verification link',
        // Only including token for development purposes - remove in production
        token: verificationToken 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Resend verification email error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
} 