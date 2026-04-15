import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Shield, Star, Heart } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Glow Lift Pro — the science-backed microcurrent brand helping women lift, tone and sculpt at home.',
}

const PRODUCT_IMG = 'https://fdkykcojwvimoabfaqjc.storage.supabase.co/storage/v1/object/public/product-user-files/default%2FChatGPT%20Image%202.%20Apr.%202026%2C%2015_03_43-01KP9CX43PED9N60SABWFR0364.webp'

const values = [
  {
    icon: Zap,
    title: 'Science First',
    desc: 'Every feature of the Glow Lift Pro is grounded in peer-reviewed research on microcurrent and EMS technology.',
  },
  {
    icon: Heart,
    title: 'Made for Women',
    desc: 'Designed by women, for women. We understand your skin, your goals, and your busy schedule.',
  },
  {
    icon: Shield,
    title: 'Safety Above All',
    desc: 'Dermatologist tested and clinically approved. Skin-safe materials. Zero compromises on your wellbeing.',
  },
  {
    icon: Star,
    title: 'Results You Can See',
    desc: '94% of our customers report visible lifting and toning results within 28 days of consistent use.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf7f5 0%, #faf0f3 50%, #f5ecf4 100%)' }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #f0c0cc 0%, transparent 70%)' }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <p className="glp-section-label mb-4">Our Story</p>
          <h1 className="font-heading font-semibold text-balance mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--brand-deep)' }}>
            We Believe Every Woman Deserves a Glow
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Glow Lift Pro was born from a simple belief: professional-grade facial lifting shouldn&apos;t require a clinic visit. We set out to create a device that&apos;s powerful enough to be clinically effective, yet simple enough for a 5-minute morning routine.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24" style={{ background: 'white' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 rounded-3xl opacity-30" style={{ background: 'radial-gradient(circle, var(--brand-rose-light) 0%, transparent 70%)' }} />
              <div className="relative w-72 h-80 lg:w-[380px] lg:h-[440px] rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(160deg, #fff7f9 0%, #f8eef5 100%)' }}>
                <Image
                  src={PRODUCT_IMG}
                  alt="Glow Lift Pro Device"
                  fill
                  sizes="(max-width: 1024px) 300px, 400px"
                  className="object-contain p-10"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="glp-section-label">Our Mission</p>
              <h2 className="font-heading font-semibold text-h2" style={{ color: 'var(--brand-deep)' }}>
                Bring the Clinic Home
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Microcurrent facial treatments at a dermatologist&apos;s office can cost $200–$400 per session. We knew there had to be a better way. After years of R&D with leading skin scientists and biomedical engineers, we created a device that delivers the same clinical-grade results — for a one-time investment of $129.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, over 50,000 women across the world use Glow Lift Pro as part of their daily skincare ritual. Their results speak for themselves.
              </p>
              <Link
                href="/products/glow-lift-pro-microcurrent-facial-device"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-semibold tracking-[0.08em] uppercase rounded-full transition-all hover:opacity-90"
                style={{ background: 'var(--brand-rose)' }}
              >
                Shop the Device
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: '#fdf9f7' }}>
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="glp-section-label mb-3">What We Stand For</p>
            <h2 className="font-heading font-semibold text-h2" style={{ color: 'var(--brand-deep)' }}>Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-rose-100/60 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--brand-rose-light)' }}>
                  <Icon className="h-5 w-5" style={{ color: 'var(--brand-rose)' }} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--brand-deep)' }}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, var(--brand-deep) 0%, #3d1f2e 100%)' }}>
        <div className="container-custom max-w-xl">
          <h2 className="font-heading font-semibold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
            Ready to Glow?
          </h2>
          <p className="text-white/60 mb-8">Join 50,000+ women who trust Glow Lift Pro for their daily lifting routine.</p>
          <Link
            href="/products/glow-lift-pro-microcurrent-facial-device"
            className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-semibold tracking-[0.1em] uppercase rounded-full transition-all hover:opacity-90 hover:scale-105"
            style={{ background: 'var(--brand-rose)' }}
          >
            Shop Glow Lift Pro — $129
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
