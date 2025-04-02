import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Connect to database
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex')
    const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    // Create new user with verification token
    const user = await User.create({
      name,
      email,
      password,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiry,
    })

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // In a real application, send an email with the verification link
    // For now, we'll just return the token in the response
    // This would be replaced with actual email sending logic

    // Return success response
    return NextResponse.json({
      message: 'User registered successfully. Please verify your email.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
      // Only including verificationToken for development purposes - remove in production
      verificationToken,
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
} 