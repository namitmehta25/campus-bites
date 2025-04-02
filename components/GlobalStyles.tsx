'use client'

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      header {
        background: transparent !important;
        background-color: transparent !important;
      }
      body, html {
        background-color: transparent;
      }
      ::selection {
        background: #FF6B00;
        color: white;
      }
    `}</style>
  )
} 