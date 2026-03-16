# Medusa v2 Architecture - Critical Concepts

## Overview

Medusa v2 introduced a **modular architecture** where Product, Pricing, Inventory, and other domains are **separate modules** that must be explicitly linked.

## Critical Concept: Modules are Independent

```
❌ Medusa v1 (OLD):
Product → Variant → prices: [{ amount, currency }]  // Inline

✅ Medusa v2 (NEW):
Product Module          Pricing Module
  Product                 PriceSet
    Variant ←─ LINK ─→     Price
```

**Key Point:** Variants and Prices live in separate modules. You MUST create a link using `remoteLink.create()`.

**For implementation patterns, see:** `.claude/knowledge/medusa-patterns.md`

---

## Why This Architecture?

**Benefits:**
- Pricing can be complex (tiers, promotions, regional)
- Product data stays clean
- Prices can be calculated dynamically
- Each module can scale independently

**Trade-off:**
- More setup required
- Must understand linking

---

## Module Resolution

```typescript
// CORRECT:
import { Modules } from "@medusajs/framework/utils"
const productService = container.resolve(Modules.PRODUCT)

// WRONG:
const productService = container.resolve("productModuleService") // ❌
```

---

## Storefront API - Price Calculation

Prices are calculated dynamically based on context.

### Without Region Context (won't work):
```typescript
const { products } = await medusaClient.store.product.list()
// products[0].variants[0].calculated_price = null ❌
```

### With Region Context (correct):
```typescript
const { products } = await medusaClient.store.product.list({
  region_id: "reg_123",
  fields: "+variants.*,+variants.calculated_price",
})
// products[0].variants[0].calculated_price = { calculated_amount: 16999900 } ✅
```

**Always include:**
- `region_id` parameter
- `fields` parameter for nested data

**Reference:** `.claude/knowledge/medusa-patterns.md#api-query-patterns`

---

## Cart Operations - Required Setup

For cart operations to work:

1. ✅ Region created
2. ✅ Sales channel created
3. ✅ Publishable API key created and linked to sales channel
4. ✅ Products associated with sales channel
5. ✅ Variants linked to price sets

**Reference:** `.claude/knowledge/medusa-patterns.md#infrastructure-setup-pattern`

---

## Common Mistakes

### ❌ Mistake 1: Creating products with inline prices (v1 style)
Won't work in v2. Use separate price sets.

### ❌ Mistake 2: Not linking variants to price sets
Creating both but forgetting the link → `calculated_price` will be null.

### ❌ Mistake 3: Wrong module resolution
Use `Modules.PRODUCT` not string names.

### ❌ Mistake 4: Not creating region first
No currency context → prices won't work.

---

## Validation Checklist

After setup, verify these API calls work:

### 1. Products API (with prices)
```bash
curl "http://localhost:9000/store/products?region_id=reg_123" \
  -H "x-publishable-api-key: pk_..."
```

Expected: `calculated_price` object with `calculated_amount`.

### 2. Cart Creation
```bash
curl -X POST "http://localhost:9000/store/cart" \
  -H "x-publishable-api-key: pk_..." \
  -d '{"region_id":"reg_123"}'
```

Expected: `201 Created` with cart object.

### 3. Add to Cart
```bash
curl -X POST "http://localhost:9000/store/cart/{cart_id}/line-items" \
  -H "x-publishable-api-key: pk_..." \
  -d '{"variant_id":"variant_123","quantity":1}'
```

Expected: `200 OK` with cart containing item.

---

## Success Criteria

A properly configured Medusa v2 store MUST have:

1. ✅ Region created with currency
2. ✅ Sales channel created
3. ✅ Publishable API key created and linked
4. ✅ Products created with variants
5. ✅ Price sets created for each variant
6. ✅ **Links created** between variants and price sets
7. ✅ **Links created** between products and sales channel
8. ✅ All API endpoints return correct data

**If ANY is missing, the store will not work.**

---

## Reference Documentation

- [Medusa v2 Modules](https://docs.medusajs.com/resources/commerce-modules)
- [Product Module](https://docs.medusajs.com/resources/commerce-modules/product)
- [Pricing Module](https://docs.medusajs.com/resources/commerce-modules/pricing)
- [Remote Link](https://docs.medusajs.com/learn/fundamentals/modules/links)

---

**For implementation patterns and code examples:**
→ See `.claude/knowledge/medusa-patterns.md`

**Last Updated:** 2026-03-16
**Medusa Version:** v2.13.4+
