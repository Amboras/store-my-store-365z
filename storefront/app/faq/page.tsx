'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'

const faqs = [
  {
    category: 'The Device',
    items: [
      {
        q: 'What is microcurrent technology?',
        a: 'Microcurrent is a low-level electrical current that mirrors the body\'s own bio-electrical field. When applied to facial muscles, it stimulates muscle fibres and promotes ATP (adenosine triphosphate) production — the energy source for cellular repair. The result is firmer, lifted, and more toned-looking skin over time.',
      },
      {
        q: 'How is Glow Lift Pro different from other devices?',
        a: 'Most at-home devices use only one technology. Glow Lift Pro combines Microcurrent + EMS (Electrical Muscle Stimulation) in a single device, giving you a comprehensive facial workout. Our dual stainless steel spheres ensure maximum skin contact and energy delivery, and the OLED display gives you precise control.',
      },
      {
        q: 'Is it safe for all skin types?',
        a: 'Yes. Glow Lift Pro is clinically tested and dermatologist approved for all skin types, including sensitive skin. It uses skin-safe, medical-grade stainless steel. However, it is not recommended for people with pacemakers, epilepsy, or active skin conditions. Please consult your doctor if you are pregnant or nursing.',
      },
      {
        q: 'What modes does the device have?',
        a: 'The device features three modes: (1) V-Shape Lifting — targeted jawline and cheek sculpting. (2) Full Facial Toning — whole-face microcurrent treatment. (3) EMS Deep Stimulation — intense muscle activation for deeper lifting. Each mode has 5 adjustable intensity levels.',
      },
    ],
  },
  {
    category: 'Results',
    items: [
      {
        q: 'When will I see results?',
        a: 'Many customers notice an immediate "lifted" glow after their very first session. With consistent daily use of 5–10 minutes, most customers report visible firming and lifting improvements within 28 days. Optimal results are typically seen after 8–12 weeks of regular use.',
      },
      {
        q: 'How often should I use it?',
        a: 'We recommend 5–10 minutes daily for the first 60 days (the "training phase"). After that, 2–3 times per week is sufficient to maintain your results. Consistency is key — just like any workout routine.',
      },
      {
        q: 'Do I need any additional products?',
        a: 'You will need a conductive gel or your favourite water-based serum to ensure optimal electrical conductivity. We recommend applying it generously before each treatment. Our device works beautifully with hyaluronic acid serums and any non-oil-based skincare products.',
      },
    ],
  },
  {
    category: 'Shipping & Returns',
    items: [
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free express shipping on all orders over $80. Orders under $80 ship for a flat rate of $5.99. All orders are processed within 1 business day and arrive within 2–5 business days.',
      },
      {
        q: 'What is your return policy?',
        a: 'We offer a 60-day no-questions-asked money-back guarantee. If for any reason you are not happy with your Glow Lift Pro device, simply contact our team within 60 days of delivery and we will arrange a full refund. No hassle, no stress.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to most countries worldwide. International orders typically arrive within 5–10 business days. Shipping costs and times vary by country and are calculated at checkout.',
      },
    ],
  },
  {
    category: 'Device Care',
    items: [
      {
        q: 'How do I clean the device?',
        a: 'After each use, wipe the stainless steel spheres and body of the device with a soft, damp cloth. Do not submerge the device in water. We recommend cleaning after every use to maintain hygiene and conductivity.',
      },
      {
        q: 'How long does the battery last?',
        a: 'The Glow Lift Pro has a built-in rechargeable battery that lasts approximately 30 days of daily use on a single charge. The OLED display shows real-time battery status. It charges via USB-C in approximately 2 hours.',
      },
      {
        q: 'Is there a warranty?',
        a: 'Yes — all Glow Lift Pro devices come with a 1-year manufacturer\'s warranty covering defects in materials and workmanship. Our customer support team is available 7 days a week to assist with any issues.',
      },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-rose-200 shadow-sm' : 'border-rose-100/60'}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-deep)' }}>{q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--brand-rose)' }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category)

  return (
    <>
      {/* Hero */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #fdf7f5 0%, #faf0f3 100%)' }}>
        <div className="container-custom max-w-2xl">
          <p className="glp-section-label mb-4">Help Center</p>
          <h1 className="font-heading font-semibold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--brand-deep)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">Everything you need to know about Glow Lift Pro. Can&apos;t find your answer? <Link href="/contact" className="underline" style={{ color: 'var(--brand-rose)' }}>Contact us</Link>.</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="container-custom max-w-4xl">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {faqs.map(({ category }) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all ${activeCategory === category ? 'text-white shadow-md' : 'text-muted-foreground bg-muted hover:bg-muted/80'}`}
                style={activeCategory === category ? { background: 'var(--brand-rose)' } : {}}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Items */}
          {faqs.filter(({ category }) => category === activeCategory).map(({ category, items }) => (
            <div key={category} className="space-y-3">
              {items.map((item) => (
                <FaqItem key={item.q} {...item} />
              ))}
            </div>
          ))}

          {/* CTA */}
          <div className="mt-16 text-center p-10 rounded-3xl" style={{ background: 'linear-gradient(135deg, #fdf7f5 0%, #f8eef5 100%)' }}>
            <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: 'var(--brand-deep)' }}>Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-6">Our team is available 7 days a week and typically responds within a few hours.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide rounded-full border transition-all hover:bg-white"
                style={{ borderColor: 'var(--brand-rose)', color: 'var(--brand-rose)' }}
              >
                Contact Support
              </Link>
              <Link
                href="/products/glow-lift-pro-microcurrent-facial-device"
                className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold tracking-wide rounded-full transition-all hover:opacity-90"
                style={{ background: 'var(--brand-rose)' }}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
