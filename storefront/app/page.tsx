'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Star, Zap, Shield, RotateCcw, Truck, ChevronDown, Check, Play } from 'lucide-react'
import { trackMetaEvent } from '@/lib/meta-pixel'

const PRODUCT_IMG = 'https://fdkykcojwvimoabfaqjc.storage.supabase.co/storage/v1/object/public/product-user-files/default%2FChatGPT%20Image%202.%20Apr.%202026%2C%2015_03_43-01KP9CX43PED9N60SABWFR0364.webp'
const PRODUCT_HANDLE = 'glow-lift-pro-microcurrent-facial-device'

const reviews = [
  {
    name: 'Sophia M.',
    location: 'New York, USA',
    rating: 5,
    text: 'I was skeptical at first, but after 4 weeks my jawline is visibly more defined. My friends thought I had botox!',
    age: '42',
  },
  {
    name: 'Clara B.',
    location: 'London, UK',
    rating: 5,
    text: 'The lifting effect is absolutely real. I use it every morning and my skin feels so much firmer and lifted.',
    age: '38',
  },
  {
    name: 'Mia R.',
    location: 'Berlin, Germany',
    rating: 5,
    text: 'Best beauty investment I\'ve ever made. The V-shaped lifting mode is incredible — you feel it working immediately.',
    age: '49',
  },
]

const features = [
  {
    icon: Zap,
    title: 'Microcurrent + EMS',
    desc: 'Dual-technology sends gentle electrical pulses to re-educate and lift facial muscles at the cellular level.',
  },
  {
    icon: Shield,
    title: 'Clinically Tested',
    desc: 'Dermatologist-approved and clinically proven. 94% of users reported visible lifting results within 28 days.',
  },
  {
    icon: Star,
    title: 'V-Shape Sculpting',
    desc: 'Targeted jawline and cheek modes sculpt a naturally contoured V-shape for a younger-looking profile.',
  },
  {
    icon: RotateCcw,
    title: '5 Intensity Levels',
    desc: 'Customize your treatment from gentle daily maintenance to a deep muscle-stimulating lifting session.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Cleanse & Apply Gel',
    desc: 'Start with clean skin and apply a generous layer of conductive gel or your favourite serum.',
  },
  {
    number: '02',
    title: 'Power On & Select Mode',
    desc: 'Choose your mode on the OLED display — V-Shape, Lifting, or EMS — and set your intensity level.',
  },
  {
    number: '03',
    title: 'Glide & Lift',
    desc: 'Glide the dual spheres upward along your jawline, cheeks, and forehead for 5–10 minutes.',
  },
  {
    number: '04',
    title: 'See Results',
    desc: 'With consistent daily use, visible lifting and toning results appear within 28 days.',
  },
]

const beforeAfterStats = [
  { stat: '94%', label: 'reported visible lifting' },
  { stat: '28', label: 'days to see results' },
  { stat: '5min', label: 'daily treatment time' },
  { stat: '50K+', label: 'happy customers' },
]

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSent, setNewsletterSent] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterSent(true)
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf7f5 0%, #faf0f3 50%, #f5ecf4 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #f0c0cc 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #c9a87c 0%, transparent 70%)' }} />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">
            {/* Copy */}
            <div className="space-y-7 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.12em] uppercase" style={{ background: 'var(--brand-rose-light)', color: 'var(--brand-rose)' }}>
                <Zap className="h-3 w-3" />
                #1 At-Home Facial Device 2025
              </div>

              <h1 className="font-heading font-semibold leading-[1.08] text-balance" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', color: 'var(--brand-deep)' }}>
                Lift. Tone. Sculpt.<br />
                <span style={{ color: 'var(--brand-rose)' }}>Look 10 Years Younger.</span>
              </h1>

              <p className="text-base lg:text-lg leading-relaxed max-w-md" style={{ color: '#7a5a65' }}>
                The Glow Lift Pro uses clinically-tested microcurrent + EMS technology to re-train facial muscles, visibly lifting and toning your skin — <strong>in just 5 minutes a day.</strong>
              </p>

              {/* Social proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['F1', 'F2', 'F3', 'F4'].map((id) => (
                    <div key={id} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white" style={{ background: 'linear-gradient(135deg, var(--brand-rose), var(--brand-gold))' }}>
                      {id[1]}
                    </div>
                  ))}
                </div>
                <div>
                  <StarRating />
                  <p className="text-xs mt-0.5" style={{ color: '#9a7a85' }}>
                    <span className="font-semibold text-foreground">4.9/5</span> from 2,847 reviews
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-1">
                <Link
                  href={`/products/${PRODUCT_HANDLE}`}
                  className="inline-flex items-center gap-2.5 px-8 py-4 text-white text-sm font-semibold tracking-[0.1em] uppercase rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-100"
                  style={{ background: 'linear-gradient(135deg, var(--brand-deep) 0%, #3d1f2e 100%)' }}
                  prefetch={true}
                  onClick={() => trackMetaEvent('InitiateCheckout', {})}
                >
                  Shop Now — $129
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold tracking-wide rounded-full border transition-all hover:bg-white/50"
                  style={{ borderColor: 'var(--brand-rose)', color: 'var(--brand-rose)' }}
                >
                  <Play className="h-3.5 w-3.5" />
                  See How It Works
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3 pt-1">
                {['Free Express Shipping', '60-Day Money Back', 'Dermatologist Tested'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#9a7a85' }}>
                    <Check className="h-3 w-3" style={{ color: 'var(--brand-rose)' }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Image */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Glow ring */}
              <div className="absolute w-[420px] h-[420px] rounded-full opacity-40 animate-glow-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, var(--brand-rose-light) 0%, transparent 70%)' }} />

              <div className="relative z-10 w-[340px] h-[400px] lg:w-[420px] lg:h-[500px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(160deg, #fff7f9 0%, #f8eef5 100%)' }}>
                  <Image
                    src={PRODUCT_IMG}
                    alt="Glow Lift Pro Microcurrent Facial Device"
                    fill
                    sizes="(max-width: 1024px) 360px, 440px"
                    className="object-contain p-10"
                    priority
                  />
                </div>

                {/* Floating badge — results */}
                <div className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl px-4 py-3 min-w-[130px] animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--brand-rose)' }}>Results in</p>
                  <p className="font-heading text-2xl font-bold" style={{ color: 'var(--brand-deep)' }}>28 Days</p>
                </div>

                {/* Floating badge — EMS */}
                <div className="absolute -right-6 bottom-24 bg-white rounded-2xl shadow-xl px-4 py-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-rose-light)' }}>
                      <Zap className="h-4 w-4" style={{ color: 'var(--brand-rose)' }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--brand-deep)' }}>Microcurrent</p>
                      <p className="text-[10px]" style={{ color: '#9a7a85' }}>+ EMS Technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center pb-8">
          <a href="#stats" aria-label="Scroll down">
            <ChevronDown className="h-5 w-5 animate-bounce" style={{ color: 'var(--brand-rose)' }} />
          </a>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────────── */}
      <section id="stats" className="border-y" style={{ background: 'var(--brand-deep)' }}>
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {beforeAfterStats.map(({ stat, label }) => {
              const num = parseInt(stat.replace(/\D/g, ''))
              const suffix = stat.replace(/[0-9]/g, '')
              return (
                <div key={label} className="space-y-1">
                  <p className="font-heading font-semibold text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                    {!isNaN(num) ? <CountUp target={num} suffix={suffix} /> : stat}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-white/50">{label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#fdf9f7' }}>
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="glp-section-label mb-3">Why Glow Lift Pro</p>
            <h2 className="font-heading font-semibold text-h2" style={{ color: 'var(--brand-deep)' }}>
              Science Meets Luxury Beauty
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Engineered with the same microcurrent technology used in professional clinics, now in your hands.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative bg-white rounded-2xl p-7 border border-rose-100/60 hover:border-rose-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: 'var(--brand-rose-light)' }}>
                  <Icon className="h-5 w-5" style={{ color: 'var(--brand-rose)' }} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--brand-deep)' }}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SPOTLIGHT ───────────────────────────────── */}
      <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a1520 0%, #3d1f2e 100%)' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl opacity-20" style={{ background: 'radial-gradient(circle at center, var(--brand-rose) 0%, transparent 70%)' }} />
              <div className="relative w-72 h-80 lg:w-96 lg:h-[440px]">
                <Image
                  src={PRODUCT_IMG}
                  alt="Glow Lift Pro Device"
                  fill
                  sizes="(max-width: 1024px) 300px, 400px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Copy */}
            <div className="text-white space-y-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--brand-rose)' }}>The Device</p>
                <h2 className="font-heading font-semibold leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                  Everything You Need for a Lifted, Sculpted Face
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  ['Dual Stainless Steel Spheres', 'Deliver microcurrent precisely to facial muscles for maximum effectiveness.'],
                  ['OLED Smart Display', 'Real-time mode, intensity & battery status at a glance.'],
                  ['3 Targeted Modes', 'V-Shape Lifting · Full Facial Toning · EMS Deep Muscle Stimulation'],
                  ['USB-C Rechargeable', '30-day battery life. One charge, a month of treatments.'],
                  ['Skin-Safe Materials', 'Medical-grade stainless steel. Hypoallergenic. Dermatologist approved.'],
                ].map(([title, desc]) => (
                  <div key={title as string} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'var(--brand-rose)' }}>
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/90">{title as string}</p>
                      <p className="text-sm text-white/50 mt-0.5">{desc as string}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={`/products/${PRODUCT_HANDLE}`}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-[0.1em] uppercase rounded-full text-white transition-all hover:opacity-90"
                  style={{ background: 'var(--brand-rose)' }}
                >
                  Get Yours — $129
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="flex items-center gap-2 text-sm text-white/40">
                  <Shield className="h-4 w-4" />
                  60-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────── */}
      <section id="how-it-works" className="py-24" style={{ background: '#fdf9f7' }}>
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="glp-section-label mb-3">Simple Routine</p>
            <h2 className="font-heading font-semibold text-h2" style={{ color: 'var(--brand-deep)' }}>
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground">Four easy steps to your daily lifting ritual.</p>
          </div>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative bg-white rounded-2xl p-7 border cursor-pointer transition-all duration-300 ${activeStep === index ? 'border-rose-300 shadow-lg shadow-rose-100/50' : 'border-rose-100/60 hover:border-rose-200'}`}
                onClick={() => setActiveStep(index)}
              >
                <span className="font-heading text-5xl font-semibold opacity-10 block mb-4" style={{ color: 'var(--brand-rose)' }}>{step.number}</span>
                <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--brand-deep)' }}>{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER RESULTS ──────────────────────────── */}
      <section id="results" className="py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff7f9 0%, #fdf3f6 100%)' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7">
              <div>
                <p className="glp-section-label mb-3">Real Results</p>
                <h2 className="font-heading font-semibold text-h2" style={{ color: 'var(--brand-deep)' }}>
                  See the Glow Lift Pro Difference
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our customers see measurable improvements in just 4 weeks. Firmer skin, a more sculpted jawline, and reduced appearance of fine lines and wrinkles — without injections or invasive procedures.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  ['Jawline Definition', '87% saw improvement'],
                  ['Skin Firmness', '91% reported firmer skin'],
                  ['Fine Lines', '83% noticed reduction'],
                  ['Skin Radiance', '96% saw a visible glow'],
                ].map(([label, stat]) => (
                  <div key={label as string} className="bg-white rounded-2xl p-5 border border-rose-100/60">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--brand-deep)' }}>{label as string}</p>
                    <p className="text-xs text-muted-foreground">{stat as string}</p>
                    <div className="mt-3 h-1.5 rounded-full bg-rose-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: (stat as string).match(/\d+/)?.[0] + '%', background: 'var(--brand-rose)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/products/${PRODUCT_HANDLE}`}
                className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-semibold tracking-[0.1em] uppercase rounded-full transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: 'var(--brand-rose)' }}
              >
                Start Your Transformation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Product visual */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, var(--brand-rose-light) 0%, transparent 70%)' }} />
              <div className="relative w-72 h-80 lg:w-[380px] lg:h-[440px] rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(160deg, #fff7f9 0%, #f8eef5 100%)' }}>
                <Image
                  src={PRODUCT_IMG}
                  alt="Glow Lift Pro Results"
                  fill
                  sizes="400px"
                  className="object-contain p-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--brand-cream)' }}>
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="glp-section-label mb-3">Customer Love</p>
            <h2 className="font-heading font-semibold text-h2" style={{ color: 'var(--brand-deep)' }}>
              Women Are Obsessed
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <StarRating />
              <span className="text-sm font-semibold text-foreground">4.9/5</span>
              <span className="text-sm text-muted-foreground">· 2,847 verified reviews</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-7 border border-rose-100/60 hover:shadow-lg transition-shadow">
                <StarRating count={review.rating} />
                <p className="mt-4 text-sm leading-relaxed text-foreground/80 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-5 pt-5 border-t border-rose-100/60 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--brand-deep)' }}>{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                  <span className="glp-rose-badge">Age {review.age}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href={`/products/${PRODUCT_HANDLE}`}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] link-underline pb-0.5"
              style={{ color: 'var(--brand-rose)' }}
            >
              Join 50,000+ Happy Customers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ───────────────────────────────────────── */}
      <section className="border-y py-10" style={{ background: 'white' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-rose-100">
            {[
              { icon: Truck, title: 'Free Express Shipping', sub: 'On all orders over $80' },
              { icon: RotateCcw, title: '60-Day Money Back', sub: 'No questions asked returns' },
              { icon: Shield, title: 'Clinically Proven', sub: 'Dermatologist tested & approved' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-5 justify-center py-2 sm:px-8 first:sm:pl-0 last:sm:pr-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--brand-rose-light)' }}>
                  <Icon className="h-5 w-5" style={{ color: 'var(--brand-rose)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--brand-deep)' }}>{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA / NEWSLETTER ──────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--brand-deep) 0%, #3d1f2e 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, var(--brand-rose) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, var(--brand-gold) 0%, transparent 70%)' }} />
        </div>
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--brand-rose)' }}>Exclusive Offer</p>
          <h2 className="font-heading font-semibold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Get 10% Off Your First Order
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Join 50,000+ women who have transformed their skincare routine. Subscribe and unlock your welcome discount.
          </p>

          {newsletterSent ? (
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 text-white">
              <Check className="h-5 w-5 text-green-400" />
              <span className="text-sm font-semibold">You&apos;re in! Check your email for your 10% discount.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-7 py-4 rounded-full text-sm font-semibold tracking-[0.08em] uppercase text-white transition-all hover:opacity-90 hover:scale-105 whitespace-nowrap"
                style={{ background: 'var(--brand-rose)' }}
              >
                Claim 10% Off
              </button>
            </form>
          )}

          <p className="mt-5 text-xs text-white/30">No spam, ever. Unsubscribe anytime.</p>

          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href={`/products/${PRODUCT_HANDLE}`}
              className="inline-flex items-center gap-3 px-10 py-5 text-white text-sm font-semibold tracking-[0.12em] uppercase rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-rose-500/20"
              style={{ background: 'linear-gradient(135deg, var(--brand-rose) 0%, #d4849a 100%)' }}
            >
              Shop Glow Lift Pro — $129
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-white/30 mt-3">Free shipping · 60-day guarantee · Ships in 1–2 days</p>
          </div>
        </div>
      </section>
    </>
  )
}
