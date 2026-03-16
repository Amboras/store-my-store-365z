## Overview

Implement the ecommerce store based on approved PLAN.md.

## Prerequisites

- PLAN.md exists and is approved
- PostgreSQL and Redis running
- Services can be started with `make dev`

## Implementation Flow

### 1. Read and Validate PLAN.md

Verify plan contains all required sections.

### 2. Spawn Agents in Parallel

Run simultaneously (they work on different files):

**medusa-configurator:**
- Infrastructure setup script
- Product initialization script
- Environment variables

**storefront-generator:**
- Customize storefront/ in place
- Create all 17 mandatory pages
- Configure Medusa client

**theme-customizer:**
- Apply color palette
- Configure typography
- Update spacing and borders

Wait for all agents to complete.

### 3. Type Check (MANDATORY)

```bash
make type-check
```

**If fails:** STOP. Fix TypeScript errors. Re-run. Do not proceed until passing.

### 4. Verify Services Running

Services should already be running via `make dev` with hot reload.

Just verify:
```bash
curl -s http://localhost:9000/health
curl -s http://localhost:3000 > /dev/null
```

If not running: `make dev` and wait.

### 5. Run Comprehensive Validation (CRITICAL)

**Spawn store-validator agent** to run all 39 tests:

- Infrastructure (3)
- Products API (3) - CRITICAL: check `calculated_price` not null
- Cart Workflow (5)
- Regions (2)
- Storefront (3)
- E2E Journey (1)
- Page Availability (17) - All pages exist, no 404s
- Navigation Links (5) - No broken links

**If ALL 39 tests pass:** Proceed to completion report.

**If ANY test fails:** STOP. Fix issue. Re-run validation. Iterate until 39/39 pass.

### 6. Report Completion (Only After 39/39 Pass)

```markdown
## Store Implementation Complete! ✅

**Validation: 39/39 PASS**

**Services:**
- Backend: http://localhost:9000
- Admin: http://localhost:9000/app
- Storefront: http://localhost:3000

**What Works:**
✅ Products have prices
✅ Cart operations (create/add/update/remove)
✅ All 17 pages exist (no 404s)
✅ No broken navigation links
✅ Complete E2E customer journey

**Next Steps:**
1. Add more products in admin dashboard
2. Customize further with /edit-store
3. Deploy with /deploy-store when ready

**Documentation:**
- Architecture: .claude/knowledge/medusa-v2-architecture.md
- Patterns: .claude/knowledge/medusa-patterns.md
- Guide: CLAUDE.md
```

## Error Handling

**Common failures:**

| Error | Fix |
|-------|-----|
| Type errors | Fix in code, re-run type-check |
| `calculated_price: null` | Check remoteLink pattern in init script |
| Products not found | Run initialization script |
| Page 404 | Create missing page |
| Broken link | Create page or remove link |

**Reference:** `.claude/knowledge/medusa-patterns.md#common-failures`

## Important Notes

1. **Don't Skip Steps:** Follow sequence for reliable results
2. **Type Check Before Validation:** Saves time
3. **Validation Must Pass:** 39/39 required before completion
4. **Keep User Informed:** Report progress throughout

## Next Commands

- `/edit-store` - Make iterative changes
- `/deploy-store` - Deploy to production
