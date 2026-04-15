'use client'

import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'
import Link from 'next/link'

const messages = [
  'Free Express Shipping on Orders Over $80 — Limited Time',
  'Clinically Tested Microcurrent Technology — See Results in 28 Days',
  'Buy 2 Devices, Save 20% — Shop the Bundle',
]

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: 'var(--brand-deep)' }}>
      <div className="flex items-center justify-center py-2.5 px-10">
        {/* Ticker */}
        <div className="overflow-hidden w-full flex items-center justify-center">
          <div className="animate-ticker flex items-center gap-16">
            {[...messages, ...messages].map((msg, i) => (
              <span key={i} className="flex items-center gap-2 text-white/90 text-[11px] tracking-[0.15em] uppercase font-medium whitespace-nowrap">
                <Sparkles className="h-3 w-3 text-amber-300 flex-shrink-0" />
                <Link href="/products" className="hover:text-white transition-colors">
                  {msg}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
