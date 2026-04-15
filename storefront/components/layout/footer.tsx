'use client'

import Link from 'next/link'
import { Zap, Instagram, Facebook, Youtube, Mail } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const shopLinks = [
  { label: 'Microcurrent Device', href: '/products' },
  { label: 'Pro Bundle', href: '/products' },
  { label: 'All Products', href: '/products' },
  { label: 'Gift Sets', href: '/collections' },
]

const supportLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping & Returns', href: '/shipping' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Track Order', href: '/account/orders' },
]

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'Our Story', href: '/about' },
  ]
  if (policies?.privacy_policy) companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  if (policies?.terms_of_service) companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  if (policies?.refund_policy) companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  if (policies?.cookie_policy) companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })

  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--brand-deep)', color: 'white' }}>
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="container-custom py-14">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
                <div className="flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: 'var(--brand-rose)' }}>
                  <Zap className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-heading text-xl font-semibold text-white tracking-tight">Glow Lift Pro</span>
              </Link>
              <p className="text-sm text-white/55 leading-relaxed max-w-xs">
                Premium at-home microcurrent technology. Visible lifting, toning, and anti-aging results in minutes a day.
              </p>
              {/* Social */}
              <div className="flex items-center gap-3 mt-6">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Youtube, label: 'YouTube' },
                  { icon: Mail, label: 'Email' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/40">Shop</h3>
              <ul className="space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/40">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company + Newsletter */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5 text-white/40">Company</h3>
              <ul className="space-y-3 mb-8">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">Get 10% Off Your First Order</p>
                <div className="flex gap-0">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-white/8 border border-white/15 px-3 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-white/40 transition-colors rounded-l-sm"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                  <button
                    className="px-4 py-2.5 text-xs font-semibold tracking-widest uppercase text-white rounded-r-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--brand-rose)' }}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-white/35">
          &copy; {new Date().getFullYear()} Glow Lift Pro. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={() => { clearConsent(); window.dispatchEvent(new Event('manage-cookies')) }}
            className="text-[11px] text-white/35 hover:text-white/60 transition-colors"
          >
            Manage Cookies
          </button>
          <span className="text-[11px] text-white/25">Powered by Amboras</span>
        </div>
      </div>
    </footer>
  )
}
