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
        { message: 'If your email is registered, you will receive a password reset link' },
        { status: 200 }
      )
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex')
    
    // Set token expiration (1 hour)
    const resetTokenExpiry = Date.now() + 3600000
    
    // Save token to user
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiry = resetTokenExpiry
    await user.save()
    
    // In a real application, send an email with the reset link
    // For now, we'll just return the token in the response
    // This would be replaced with actual email sending logic
    
    return NextResponse.json(
      { 
        message: 'If your email is registered, you will receive a password reset link',
        // Only including token for development purposes - remove in production
        token: resetToken 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
} 