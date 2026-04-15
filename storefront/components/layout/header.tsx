'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn, Zap } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'

const navLinks = [
  { label: 'The Device', href: '/products' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Results', href: '/#results' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) mobileMenuCloseRef.current?.focus()
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-rose-100/60 shadow-sm'
            : 'bg-white border-b border-rose-100/60'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-[68px] items-center justify-between gap-4">
            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: 'var(--brand-rose)' }}>
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-heading text-xl font-semibold tracking-tight" style={{ color: 'var(--brand-deep)' }}>
                Glow Lift Pro
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] tracking-[0.12em] uppercase font-medium text-foreground/75 hover:text-foreground transition-colors link-underline py-1"
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link href="/search" className="p-2.5 hover:opacity-70 transition-opacity" aria-label="Search">
                <Search className="h-[18px] w-[18px]" />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 hover:opacity-70 transition-opacity hidden sm:block"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn ? <User className="h-[18px] w-[18px]" /> : <LogIn className="h-[18px] w-[18px]" />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-70 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: 'var(--brand-rose)' }}>
                    {itemCount}
                  </span>
                )}
              </button>

              {/* CTA */}
              <Link
                href="/products"
                className="hidden lg:inline-flex items-center gap-2 ml-4 px-5 py-2.5 text-white text-[11px] font-semibold tracking-[0.1em] uppercase rounded-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--brand-rose)' }}
                prefetch={true}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)} />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-5 border-b border-rose-100">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--brand-rose)' }}>
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <span className="font-heading text-lg font-semibold" style={{ color: 'var(--brand-deep)' }}>Glow Lift Pro</span>
              </Link>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-70"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3.5 text-base tracking-wide border-b border-border/40 text-foreground/80 hover:text-foreground transition-colors"
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-5 space-y-1">
                <Link
                  href={isLoggedIn ? '/account' : '/auth/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-sm text-muted-foreground"
                >
                  {isLoggedIn ? 'Account' : 'Sign In'}
                </Link>
                <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-sm text-muted-foreground">
                  Search
                </Link>
              </div>
              <div className="pt-4">
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 text-white text-sm font-semibold tracking-widest uppercase rounded-full"
                  style={{ backgroundColor: 'var(--brand-rose)' }}
                >
                  Shop Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
