# Medusa v2 Implementation Patterns

## Product + Price Linking Pattern

**Critical:** Variants and prices MUST be linked using remoteLink.

```typescript
import { Modules } from "@medusajs/framework/utils"

const productModuleService = container.resolve(Modules.PRODUCT)
const pricingModuleService = container.resolve(Modules.PRICING)
const remoteLink = container.resolve("remoteLink")

// 1. Create product with variants (NO prices!)
const product = await productModuleService.createProducts({
  title: "Product Name",
  handle: "product-handle",
  status: "published",
  variants: [
    { title: "Variant 1", sku: "SKU-1" },
    { title: "Variant 2", sku: "SKU-2" },
  ],
})

// 2. Create price sets and link to variants
const prices = [99900, 149900] // paise/cents

for (let i = 0; i < product.variants.length; i++) {
  const variant = product.variants[i]

  const priceSet = await pricingModuleService.createPriceSets({
    prices: [{ amount: prices[i], currency_code: "inr" }],
  })

  // CRITICAL: Link variant to price set
  await remoteLink.create({
    [Modules.PRODUCT]: { variant_id: variant.id },
    [Modules.PRICING]: { price_set_id: priceSet.id },
  })
}
```

**Reference:** `backend/scripts/setup-infrastructure.ts` lines 1-150

---

## Sales Channel Linking Pattern

**Required:** Products must be linked to sales channel to appear in storefront.

```typescript
await remoteLink.create({
  [Modules.PRODUCT]: { product_id: product.id },
  [Modules.SALES_CHANNEL]: { sales_channel_id: salesChannel.id },
})
```

---

## Collection Assignment Pattern

```typescript
// Create collection
const collection = await productModuleService.createProductCollections({
  title: "Collection Name",
  handle: "collection-handle",
  metadata: { description: "Description" },
})

// Assign products to collection
await productModuleService.updateProductCollections(collection.id, {
  product_ids: products.map(p => p.id),
})
```

**Common collections:**
- Featured products
- Best sellers
- Category-based (e.g., "RTX 4090 Laptops", "Budget Gaming")

---

## Category Hierarchy Pattern

```typescript
// Parent category
const parentCategory = await productModuleService.createProductCategories({
  name: "Parent Category",
  handle: "parent-category",
  is_active: true,
  metadata: { display_in_menu: true },
})

// Child categories
const subcategories = ["Sub 1", "Sub 2", "Sub 3"]

for (const name of subcategories) {
  await productModuleService.createProductCategories({
    name: name,
    handle: name.toLowerCase().replace(/\s+/g, "-"),
    parent_category_id: parentCategory.id,
    is_active: true,
  })
}

// Assign products to categories
await productModuleService.updateProducts(product.id, {
  category_ids: [category.id],
})
```

---

## Infrastructure Setup Pattern

**Run once before creating products:**

```typescript
import { Modules } from "@medusajs/framework/utils"

const regionModuleService = container.resolve(Modules.REGION)
const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION)

// 1. Create region
const region = await regionModuleService.createRegions({
  name: "India",
  currency_code: "inr",
  countries: ["in"],
})

// 2. Create sales channel
const salesChannel = await salesChannelModuleService.createSalesChannels({
  name: "Default Sales Channel",
  is_disabled: false,
})

// 3. Create stock location
const stockLocation = await stockLocationModuleService.createStockLocations({
  name: "Main Warehouse",
  address: { city: "City", country_code: "in" },
})
```

**Reference:** `backend/scripts/setup-infrastructure.ts`

---

## API Query Patterns

### Products with Prices (Storefront)

```typescript
// MUST include region_id for prices to populate
const { products } = await medusaClient.store.product.list({
  region_id: "reg_123",
  fields: "+variants.*,+variants.calculated_price",
})
```

### Collection with Products

```typescript
const { collection } = await medusaClient.store.collection.retrieve(handle, {
  fields: "+products.*,+products.variants.*,+products.variants.calculated_price",
})
```

### Cart Creation

```typescript
const { cart } = await medusaClient.store.cart.create({
  region_id: "reg_123",
})
```

---

## Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| `calculated_price: null` | Variant not linked to price set | Use remoteLink pattern above |
| Products don't appear | Not linked to sales channel | Use sales channel linking |
| Collections 404 | Collections not created | Create collections in init script |
| Cart fails | Region not configured | Run infrastructure setup first |

---

**Reference Files:**
- `backend/scripts/setup-infrastructure.ts`
- `.claude/knowledge/medusa-v2-architecture.md`
