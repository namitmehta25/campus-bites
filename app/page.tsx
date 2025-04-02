'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ClockIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline'
import ThreeJSScene from '@/components/ThreeJSScene'

// Sample data - would come from an API in a real app
const featuredCanteens = [
  {
    id: 1,
    name: 'The Bytes Café',
    cuisineType: 'International',
    priceRange: '$$',
    prepTime: '10-15 mins',
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    name: 'Algo Kitchen',
    cuisineType: 'Asian Fusion',
    priceRange: '$',
    prepTime: '5-10 mins',
    rating: 4.5,
    featured: false,
  },
  {
    id: 3,
    name: 'Campus Grill',
    cuisineType: 'American',
    priceRange: '$$',
    prepTime: '15-20 mins',
    rating: 4.7,
    featured: true,
  },
]

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    } 
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
      {/* Hero Section with Three.js animation */}
      <section className="relative min-h-screen">
        <ThreeJSScene />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-12 space-y-6"
          >
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              <span className="block text-white">Skip the Wait.</span>
              <span className="block text-orange-500">Savor the Taste.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-blue-100 sm:text-2xl">
              {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="z-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/canteens"
              className="group relative overflow-hidden rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Order Now
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            
            <Link
              href="/about"
              className="group rounded-full border-2 border-white/50 bg-transparent px-8 py-4 text-lg font-semibold text-white shadow-md transition-all hover:border-white hover:bg-white/10"
            >
              Learn More
            </Link>
          </motion.div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <motion.div 
              initial={{ y: 0 }} 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            >
              <ArrowRightIcon className="h-8 w-8 rotate-90 text-white" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.h2 
              variants={fadeUp}
              className="mb-4 inline-block text-4xl font-bold text-blue-950"
            >
              Why Students Love Us
            </motion.h2>
            <motion.p 
              variants={fadeUp} 
              className="mx-auto max-w-2xl text-lg text-gray-600"
            >
              Our platform offers the fastest and most convenient way to get food on campus
            </motion.p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <ClockIcon className="h-10 w-10 text-orange-500" />,
                title: "Save Valuable Time",
                description: "Skip the long lines and have your food ready when you arrive.",
              },
              {
                icon: <FireIcon className="h-10 w-10 text-orange-500" />,
                title: "Hot & Fresh Food",
                description: "Your order is prepared just in time for your arrival.",
              },
              {
                icon: <SparklesIcon className="h-10 w-10 text-orange-500" />,
                title: "Exclusive Rewards",
                description: "Earn loyalty points with every order and get special student deals.",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={scaleIn}
                className="rounded-xl bg-white p-6 shadow-xl border border-blue-100"
              >
                <div className="mb-4 rounded-lg bg-blue-50 p-3 inline-block">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-blue-950">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Canteens Section */}
      <section className="bg-blue-950 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.h2 
              variants={fadeUp}
              className="mb-4 inline-block text-4xl font-bold text-white"
            >
              Featured Canteens
            </motion.h2>
            <motion.p 
              variants={fadeUp} 
              className="mx-auto max-w-2xl text-lg text-blue-200"
            >
              Check out these popular campus dining options with special offers
            </motion.p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCanteens.map((canteen, i) => (
              <motion.div
                key={canteen.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-100" />
                  {canteen.featured && (
                    <div className="absolute left-0 top-0 z-10 bg-indigo-600 px-3 py-1 text-sm font-semibold text-white">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{canteen.name}</h3>
                    <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-600">
                      ★ {canteen.rating}
                    </span>
                  </div>
                  <p className="mb-4 text-gray-600">
                    {canteen.cuisineType} • {canteen.priceRange} • {canteen.prepTime}
                  </p>
                  <Link
                    href={`/canteens/${canteen.id}`}
                    className="inline-flex items-center gap-1 font-medium text-indigo-600 transition-colors hover:text-indigo-800"
                  >
                    View Menu 
                    <motion.span 
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 text-center"
          >
            <Link
              href="/canteens"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-indigo-700"
            >
              View All Canteens
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-indigo-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2 
              variants={fadeUp}
              className="mb-6 text-4xl font-bold"
            >
              Ready to transform your campus dining experience?
            </motion.h2>
            <motion.p 
              variants={fadeUp} 
              className="mb-10 text-xl text-indigo-200"
            >
              Join thousands of students who save time and enjoy better meals every day with {process.env.NEXT_PUBLIC_APP_NAME}.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/register"
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-indigo-800 transition-colors hover:bg-indigo-100"
              >
                Create Your Account
              </Link>
              <Link
                href="/canteens"
                className="rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Food Options
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
