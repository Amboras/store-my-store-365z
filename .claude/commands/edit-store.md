## Overview

Make iterative changes to existing generated store based on user feedback.

## Usage Examples

- "Make homepage hero taller"
- "Change primary color to navy blue"
- "Add testimonials section"
- "Switch product grid to 3 columns"
- "Make product images larger"

## Approach

### 1. Identify Store

- Default to `storefront/` (in-place customization)
- If multiple stores, ask which one

### 2. Understand Request

Parse to identify:
- What to change (component, style, layout, content)
- Where to change it (which files)
- How to change it (specific modifications)

### 3. Make Atomic Changes

**Principles:**
- Edit specific files, don't regenerate
- Make minimal, focused changes
- Preserve existing functionality
- Maintain code style

**Common edit patterns:**

**Colors:**
Edit `tailwind.config.ts` → colors section

**Layout:**
Edit component files → height, grid classes

**Typography:**
Edit `app/layout.tsx` or `tailwind.config.ts`

**Component Addition:**
Create in `components/`, import in page

**Grid Changes:**
Edit grid-cols values in components

### 4. Verify Changes

```bash
cd storefront
npm run type-check
```

Verify:
- No TypeScript errors
- No console errors
- Changes appear correctly
- Responsive design intact

### 5. Report Changes

```markdown
## Changes Applied ✅

**Store:** {store-id}

**Edited:**
- app/page.tsx - Made hero taller
- tailwind.config.ts - Changed primary color

**Preview:** http://localhost:3000

**Next Steps:**
- Review in browser
- Make more edits if needed
- Deploy when satisfied
```

## Common Edit Types

### Design/Styling
- Colors: Edit `tailwind.config.ts`
- Typography: Import fonts, update config
- Spacing: Adjust padding/margin classes
- Borders/Shadows: Update class values

### Layout
- Section heights: Edit height classes
- Grid columns: Change grid-cols
- Container widths: Update max-width
- Component order: Reorder in page files

### Components
- Add: Create file, import, use
- Remove: Delete import and JSX
- Modify: Edit props and logic

### Content
- Text: Edit in components
- Images: Replace URLs, alt text
- Buttons: Update labels

## Guidelines

**Do's:**
- Make small, incremental changes
- Use existing patterns
- Maintain TypeScript types
- Test immediately

**Don'ts:**
- Regenerate entire files
- Break existing functionality
- Ignore TypeScript errors
- Make too many changes at once

## Error Handling

**If edit fails:**
1. Read error message
2. Undo if needed: `git restore {file}`
3. Try alternative approach
4. Ask user for clarification if ambiguous

**Common issues:**
- TypeScript errors → Fix type mismatches
- Import errors → Verify file paths
- Style not applying → Check Tailwind config

## Multiple Edits

User can chain edits:
```
"Make hero taller" → applied
"Change color to blue" → applied
"Add testimonials" → applied
```

Each builds on previous state.

## Next Steps

After edit, user can:
- Make more edits
- Deploy: `/deploy-store`
- Edit files directly in IDE
