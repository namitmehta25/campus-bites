'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      {/* Background Circle */}
      <motion.circle
        cx="20"
        cy="20"
        r="18"
        fill="#7e22ce"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      
      {/* Utensil Handle */}
      <motion.path
        d="M20 8 L20 32"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      
      {/* Spoon Head */}
      <motion.path
        d="M12 8 C12 8, 20 4, 28 8 C28 8, 20 12, 12 8"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      
      {/* Fork Tines */}
      <motion.path
        d="M20 32 L16 36 M20 32 L24 36 M20 32 L20 36"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
      
      {/* Sparkle Animation */}
      <motion.path
        d="M30 10 L32 8 M32 10 L30 8"
        stroke="#ffffff"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />
    </motion.svg>
  )
} 