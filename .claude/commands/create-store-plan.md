## Overview

Create a detailed ecommerce store plan in PLAN.md based on user's request.

## Success Criteria

- [ ] Store overview defined (name, industry, audience)
- [ ] Design direction specified (style, colors, fonts)
- [ ] Commerce features listed (regions, payments, features)
- [ ] Medusa configuration planned (regions, product types, categories)
- [ ] Storefront layout defined (template, pages, sections)
- [ ] Theme customization tokens specified (exact hex codes, font names)
- [ ] Implementation phases outlined

## Required Plan Sections

### 1. Store Overview
- Name, industry/niche, target audience
- Value proposition, business model (B2C/B2B/marketplace)

### 2. Design Direction
- Visual style (minimal/bold/luxury)
- Color palette (specific hex codes)
- Typography (exact font names)
- Layout preference, overall aesthetic

### 3. Commerce Features
Which features needed:
- Multi-region? (list regions/currencies)
- Promotions/discounts?
- B2B features?
- Reviews, wishlist, gift cards?
- Subscriptions, digital products?

### 4. Medusa Configuration

**Regions & Currencies:**
List all: US-USD, EU-EUR, etc.

**Payment Providers:**
Stripe (default), others if needed

**Product Types:**
Based on industry (clothing, electronics, etc.)

**Product Categories:**
Hierarchy structure

**Shipping Configuration:**
Zones, carriers, providers

### 5. Storefront Layout

**Template Selection:**
- minimal (clean, fast)
- bold (vibrant, modern) [planned]
- luxury (elegant, premium) [planned]

**Homepage Sections:**
Order of: Hero, Featured Products, Categories, etc.

**Page Layouts:**
Product page, collection page, cart/checkout styles

**Custom Pages:**
About, Contact, FAQ, Shipping, Privacy, Terms

### 6. Theme Customization

**Exact specifications:**

Colors:
```
Primary: #1a1a1a
Secondary: #e8d5b5
Accent: #c9a875
```

Typography:
```
Headings: "Playfair Display"
Body: "Inter"
Scale: 1.25
```

Spacing: compact/normal/spacious

Border Radius: sharp(0px)/subtle(4px)/rounded(8px)/pill(999px)

### 7. Implementation Phases

Break down:
1. Medusa backend configuration
2. Storefront generation
3. Theme customization
4. Component composition
5. Content & testing
6. Deployment

## Guidelines

1. **Be Specific:** Use exact hex codes, font names, specific regions
2. **Think User Journey:** Plan customer experience from landing to checkout
3. **Stay Realistic:** Use features Medusa v2 actually supports
4. **Ask Questions:** If request is vague, ask for clarification

## After Creating Plan

1. Save as `PLAN.md` in project root
2. Review with user for confirmation
3. Wait for approval before running `/implement-store`
4. Make adjustments if needed

## Next Command

After plan approved: `/implement-store`
