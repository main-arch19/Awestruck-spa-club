# Awestruck Spa Club — Brand Guide

> **FOR CLAUDE CODE**: Read this file FIRST before building any pages. Load `brand-tokens.json` for all color, font, spacing, and component values. Place the logo file (`logo.png`) in `/public/images/`. Follow every rule below.

---

## Brand Overview

**Awestruck Spa Club** is a premium spa and beauty brand. The visual identity is **dark, moody, and luxurious** — think high-end fashion editorial applied to wellness. The default theme is **dark mode**. The primary accent is **crimson red (#C41E3A)** against blacks, greys, and whites, with metallic silver as a secondary tone.

---

## Logo Rules

### Structure
The logo has two parts:
1. **"AWESTRUCK"** — "AWE" in metallic silver (#8A8A8A), "STRUCK" in crimson red (#C41E3A), with a ® symbol
2. **"SPA CLUB"** — White uppercase text with a spa/massage bed icon between "SPA" and "CLUB"

### Usage Rules
- **Always place on dark backgrounds** (#0A0A0A or #1A1A1A preferred)
- When placing on the primary red background, render the entire logo in white
- Maintain clear space equal to the height of the letter "A" on all sides
- Minimum display width: 120px
- Logo file is at `/public/images/logo.png`

### Logo Don'ts
- NEVER stretch, squish, or distort proportions
- NEVER rotate the logo
- NEVER change the silver/red color split
- NEVER place on busy photography without a dark overlay (min 50% opacity)
- NEVER add drop shadows, outlines, or effects
- NEVER display smaller than 120px wide

---

## Color Usage

### Hierarchy
- **Red (#C41E3A)** = CTAs, highlights, active states, accent elements. Use sparingly for maximum impact
- **Silver (#8A8A8A)** = Logo "AWE" treatment, subtle accents, secondary decorative elements
- **Black (#0A0A0A)** = Primary backgrounds
- **Charcoal (#1A1A1A)** = Secondary backgrounds, section alternation
- **Dark Grey (#2D2D2D)** = Cards, elevated surfaces, input backgrounds, borders
- **Medium Grey (#6B6B6B)** = Secondary text, placeholders, disabled states
- **Light Grey (#E8E8E8)** = Borders on light mode, subtle dividers
- **Off White (#F5F5F5)** = Light mode backgrounds
- **White (#FFFFFF)** = Primary text on dark, light mode cards

### Rules
- Red is ONLY for interactive elements (buttons, links, hover states) and brand accents. Never use red for large background areas except intentional hero/CTA banners
- Body text is always white (#FFFFFF) on dark or black (#0A0A0A) on light — never grey for primary content
- Secondary text uses medium grey (#6B6B6B) in both themes
- The accent color (red) stays THE SAME in both dark and light mode
- All text/background pairings must meet WCAG AA (4.5:1 contrast ratio minimum)

### Accessible Pairings (pre-approved)
- White text on Black ✓ (21:1)
- White text on Charcoal ✓ (15.4:1)
- White text on Red ✓ (5.9:1)
- Black text on White ✓ (21:1)
- Black text on Off White ✓ (19.3:1)
- Red text on Black ✓ (4.6:1) — use cautiously at large sizes only
- Red text on White ✓ (5.9:1)

---

## Typography

### Font Loading
Include this Google Fonts import in the root layout:
```
Playfair Display: 400, 600, 700, 800, 900, 400i, 700i
DM Sans: 300, 400, 500, 600, 700, 400i
Cormorant Garamond: 300, 400, 600, 300i, 400i, 600i
```

### Usage Rules
- **Playfair Display** = ALL headings (h1–h4), display text, hero text, section titles
- **DM Sans** = Body text, buttons, labels, nav links, form inputs, UI text, h5–h6
- **Cormorant Garamond** = Testimonial quotes, taglines, decorative section intros — ALWAYS in italic
- Never mix brand fonts with other fonts
- Minimum body font size: 16px (prevents iOS zoom on inputs)
- Headings use tight line-height (1.0–1.2), body uses relaxed (1.5–1.7)

### Responsive Scale
All headings must scale between mobile and desktop breakpoints:
- Display: 2.5rem (mobile) → 4.5rem (desktop)
- H1: 2rem → 3rem
- H2: 1.75rem → 2.25rem
- H3: 1.375rem → 1.75rem
- Body: 1rem (stays consistent)

Use CSS clamp() or Tailwind responsive prefixes.

---

## Spacing

- Base unit: 4px
- Use multiples of 4 for ALL spacing: 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128
- Section vertical padding: 64px (mobile) → 96px (tablet) → 128px (desktop)
- Content horizontal padding: 20px (mobile) → 32px (tablet) → 64px (desktop)
- Max content width: 1200px, centered
- Cards use 16px–32px internal padding
- Between-section gap: always at least 64px vertical

---

## Components

### Buttons
- **Primary**: Red background (#C41E3A), white text, rounded (10px). Hover → darker red (#9B1B30). Min height 44px
- **Secondary/Ghost**: Transparent background, white text, grey border. Hover → subtle white fill (10% opacity)
- **Danger**: Red outline or background for destructive actions
- **Disabled**: Grey background, grey text, cursor: not-allowed, 50% opacity
- All buttons: font-family DM Sans, font-weight 600, min touch target 44px × 44px
- Large CTAs ("Book Now"): 48px–56px height, full-width on mobile

### Form Inputs
- Background: Dark Grey (#2D2D2D)
- Border: Dark Grey (#2D2D2D), focus → Red (#C41E3A) with 1px ring
- Text: White, 16px font size (required to prevent iOS zoom)
- Height: 48px minimum
- Border radius: 10px
- Error state: Red border, red error message below
- Use `inputmode` attributes: tel, email, numeric where appropriate
- Labels above inputs (not floating), in medium grey, 12px uppercase

### Cards
- Background: Dark Grey (#2D2D2D) or Charcoal (#1A1A1A)
- Border: 1px solid Dark Grey (#2D2D2D)
- Border radius: 16px
- Hover: translateY(-4px) + deeper shadow
- Transition: 300ms ease
- Internal padding: 24px–32px

### Badges / Tags
- Pill-shaped (border-radius: 9999px)
- Use translucent brand colors: rgba(196,30,58,0.15) for red, rgba(34,197,94,0.15) for success, etc.
- Text matches the color, 12px, font-weight 600

---

## Animation Rules

### Entrances
- Use "fade up" as the default scroll animation: opacity 0→1, translateY(40px→0)
- Duration: 500ms with ease-out easing
- Stagger child elements with 100ms delays
- Trigger at 10% visibility via Intersection Observer

### Hover Interactions
- Buttons: background color shift, 150ms
- Cards: translateY(-4px) + shadow elevation, 300ms
- Links: underline animation left→right, 200ms
- Images: slight scale(1.03) + dark overlay, 300ms

### Mobile Rules
- DISABLE parallax on mobile/touch devices
- REDUCE animation duration to 300ms (from 500ms)
- DISABLE custom cursor on touch devices
- DISABLE floating particles/decorative animations on mobile
- RESPECT `prefers-reduced-motion`: disable all non-essential animations
- No background videos on mobile — use static images

### Page Transitions
- Use Framer Motion AnimatePresence
- Default: fade + slight slide (opacity + translateY)
- Duration: 400ms

---

## Voice & Tone

### Personality
Luxurious, Bold, Refined, Transformative, Welcoming

### Writing Style
- Confident but not arrogant
- Warm but not casual
- Aspirational — make the reader feel they deserve this
- Use "your" and "you" — speak directly to the client
- Sentence case for headings, Title Case for buttons

### CTA Language
- Primary: "Book Now", "Reserve Your Spot", "Book Your Experience"
- Secondary: "Learn More", "Explore Services", "Discover More"
- NEVER: "Click Here", "Submit", "Go", "Enter"

### Headlines Should
- Be evocative, not generic: ✓ "Your transformation starts here" ✗ "Welcome to our website"
- Promise a feeling or result: ✓ "Leave feeling renewed" ✗ "Our services"
- Use the accent font (Cormorant Garamond italic) for decorative section intros

---

## Dark / Light Mode

### Default = Dark Mode
- Dark mode is the brand's primary experience
- Light mode is provided as an alternative
- The red accent (#C41E3A) remains IDENTICAL in both modes
- Toggle persists in React state (no localStorage in Claude artifacts)

### Token Mapping
| Token           | Dark Mode | Light Mode |
|-----------------|-----------|------------|
| bg-primary      | #0A0A0A   | #FFFFFF    |
| bg-secondary    | #1A1A1A   | #F5F5F5    |
| bg-card         | #2D2D2D   | #FFFFFF    |
| text-primary    | #FFFFFF   | #0A0A0A    |
| text-secondary  | #6B6B6B   | #6B6B6B    |
| border          | #2D2D2D   | #E8E8E8    |
| accent          | #C41E3A   | #C41E3A    |
| accent-hover    | #9B1B30   | #9B1B30    |

---

## Mobile-First Rules

- Build every component at 375px FIRST, then enhance with md: and lg: prefixes
- All tappable elements: minimum 44px × 44px
- Form inputs: 48px height, 16px font size
- Use 100dvh instead of 100vh for mobile viewport
- Respect env(safe-area-inset-bottom) on fixed bottom elements
- No horizontal overflow on body — ever
- Thumb-zone: place primary CTAs in bottom half of screen on mobile
- Content never touches screen edges — minimum 20px side padding

---

## File Placement

When building the website, place files as follows:
```
/public/images/logo.png          ← The Awestruck logo
/src/lib/brand-tokens.json       ← Import this for all values
/src/lib/brand.ts                ← TypeScript export wrapping the JSON
/src/app/globals.css              ← CSS variables from the tokens
/tailwind.config.ts              ← Theme extended with brand tokens
```

### Import Pattern
```typescript
// src/lib/brand.ts
import tokens from './brand-tokens.json';
export const brand = tokens;
export const colors = tokens.colors;
export const fonts = tokens.typography.fonts;
```

### CSS Variables
Generate all CSS variables from `brand-tokens.json → cssVariables` object into globals.css:
```css
:root {
  --color-primary: #C41E3A;
  --color-primary-dark: #9B1B30;
  /* ... all other tokens ... */
}
```

### Tailwind Config
Use `brand-tokens.json → tailwindConfig` to extend the Tailwind theme directly.

---

## Checklist Before Shipping

- [ ] Logo renders correctly on all backgrounds
- [ ] All colors match the token values exactly
- [ ] Fonts load from Google Fonts (Playfair Display, DM Sans, Cormorant Garamond)
- [ ] Type scale is responsive (mobile → desktop)
- [ ] All buttons meet 44px minimum touch target
- [ ] Form inputs are 48px height, 16px font (no iOS zoom)
- [ ] Dark/light mode toggle works with correct token mapping
- [ ] Red accent is consistent across both themes
- [ ] No horizontal scroll at any viewport width
- [ ] Scroll animations fade in on viewport entry
- [ ] Parallax disabled on mobile
- [ ] prefers-reduced-motion respected
- [ ] WCAG AA contrast met on all text/background pairings
- [ ] "Book Now" CTA is always visible (nav, floating mobile bar, hero, CTA sections)
