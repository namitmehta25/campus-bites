'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

// Logo SVG component
const CampusBitesLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-transform duration-300 group-hover:scale-110">
      <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" fill="#1E293B" stroke="#10B981" strokeWidth="2"/>
      <path d="M10 11C10 9.34315 11.3432 8 13 8H19C20.6569 8 22 9.34315 22 11V13C22 14.6569 20.6569 16 19 16H13C11.3432 16 10 14.6569 10 13V11Z" fill="#10B981"/>
      <path d="M22 21C22 22.6569 20.6569 24 19 24H13C11.3432 24 10 22.6569 10 21V19C10 17.3431 11.3432 16 13 16H19C20.6569 16 22 17.3431 22 19V21Z" fill="#059669"/>
      <circle cx="16" cy="16" r="2" fill="#1E293B"/>
    </svg>
  );
};

interface User {
  name: string
  email: string
  role: 'user' | 'admin'
}

interface NavbarProps {
  bgColor?: string
  textColor?: string
  hoverColor?: string
  shadowColor?: string
  useDarkMode?: boolean
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Canteens', href: '/canteens' },
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
]

export default function Navbar({
  bgColor = 'bg-black',
  textColor = 'text-slate-200',
  hoverColor = 'text-emerald-400',
  shadowColor = 'shadow-orange-900',
  useDarkMode = true
}: NavbarProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [currentBgColor, setCurrentBgColor] = useState(bgColor)

  useEffect(() => {
    // Update color if prop changes
    setCurrentBgColor(bgColor)
  }, [bgColor])

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Handle scroll events for navbar appearance
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Logged out successfully')
    router.push('/')
  }

  // Function to change navbar color dynamically if needed
  const changeNavbarColor = (color: string) => {
    setCurrentBgColor(color)
  }

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 20 
      } 
    },
  }

  const listItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
      }
    }),
    hover: { 
      scale: 1.05, 
      color: '#10b981', // emerald-500
      transition: { 
        type: 'spring', 
        stiffness: 300 
      } 
    }
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 250 
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { 
        duration: 0.3, 
        ease: 'easeInOut' 
      }
    }
  }

  // Extract base color name for using in opacity classes
  const baseColorClass = currentBgColor.split('-')[0] + '-' + currentBgColor.split('-')[1]

  return (
    <motion.header 
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? `${currentBgColor}/80 backdrop-blur-md shadow-lg ${shadowColor}/10 mt-2 mx-4 rounded-xl`
          : `${currentBgColor}/90 backdrop-blur-sm`
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <nav 
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" 
        aria-label="Global"
      >
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/" className="group flex items-center gap-2 transition-all duration-300">
            <CampusBitesLogo />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white leading-tight tracking-wide">{process.env.NEXT_PUBLIC_APP_NAME}</span>
              <span className="text-xs text-emerald-400 font-medium leading-tight">Delicious. Fast. Campus.</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop navigation - centered */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-8">
          {navigation.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Link
                href={item.href}
                className={`group relative text-base font-semibold ${textColor} transition-colors hover:${hoverColor} px-4`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Cart icon on the right */}
        <div className="flex items-center gap-3">
          <Link href="/cart" aria-label="Cart" className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 shadow-md hover:bg-emerald-500 transition-colors">
              <ShoppingCartIcon className="h-4 w-4 text-white" />
            </div>
            {cartItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartItems}
              </span>
            )}
          </Link>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 ${textColor} hover:bg-slate-800 transition-colors`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-900/98 backdrop-blur-md px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CampusBitesLogo />
                  <span className="text-lg font-bold text-white">{process.env.NEXT_PUBLIC_APP_NAME}</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-full p-2.5 text-slate-200 hover:bg-slate-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-slate-700">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${textColor} hover:bg-slate-800 hover:${hoverColor} transition-colors`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}