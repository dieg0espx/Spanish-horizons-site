# Spanish Horizons Academy

A modern, beautiful website for Spanish Horizons Academy built with Next.js, TypeScript, and Tailwind CSS.

## Typography

This project uses carefully selected fonts that reflect the elegance and professionalism of Spanish education.

### Font Families

- **Questa Grande** - Primary sans-serif font for body text and general content
- **IvryOra Display** - Serif font for headings and display text

### Font Classes

```tsx
// Questa Grande (sans-serif)
<p className="font-questa">Questa Grande text</p>
<p className="font-sans">Default sans-serif (Questa Grande)</p>

// IvryOra Display (serif)
<h1 className="font-ivry">IvryOra Display heading</h1>
<h2 className="font-serif">Default serif (IvryOra Display)</h2>
```

## Custom Color Palette

This project uses a carefully selected color palette that reflects the warmth and professionalism of Spanish education. All colors are available as Tailwind CSS classes.

### Golden Colors
- **`golden`** - `#FFD700` - Main golden yellow (C: 0%, M: 26%, Y: 89%, K: 0%)
- **`golden-light`** - `#FFE44D` - Lighter golden variant
- **`golden-dark`** - `#FFB300` - Darker golden variant

### Amber Colors
- **`amber`** - `#FF8C00` - Deep orange (C: 0%, M: 45%, Y: 100%, K: 0%)
- **`amber-light`** - `#FFA726` - Lighter amber variant
- **`amber-dark`** - `#E65100` - Darker amber variant

### Slate Colors
- **`slate`** - `#2C4A5B` - Dark slate blue (C: 100%, M: 32%, Y: 20%, K: 58%)
- **`slate-medium`** - `#3A5A6B` - Medium slate blue (C: 100%, M: 32%, Y: 20%, K: 47%)
- **`slate-light`** - `#4A6A7B` - Light slate blue (C: 100%, M: 32%, Y: 20%, K: 37%)

## Usage Examples

### Background Colors
```tsx
<div className="bg-golden">Golden background</div>
<div className="bg-amber">Amber background</div>
<div className="bg-slate">Dark slate background</div>
<div className="bg-slate-medium">Medium slate background</div>
<div className="bg-slate-light">Light slate background</div>
```

### Text Colors
```tsx
<p className="text-golden">Golden text</p>
<p className="text-amber">Amber text</p>
<p className="text-slate">Slate text</p>
```

### Border Colors
```tsx
<div className="border border-golden">Golden border</div>
<div className="border-2 border-amber">Amber border</div>
<div className="border border-slate">Slate border</div>
```

### Hover States
```tsx
<button className="bg-golden hover:bg-golden-dark">
  Golden button
</button>
<button className="bg-amber hover:bg-amber-dark">
  Amber button
</button>
```

## Color Philosophy

- **Golden**: Represents warmth, energy, and the vibrant culture of Spanish-speaking countries
- **Amber**: Symbolizes passion, creativity, and the dynamic nature of language learning
- **Slate**: Provides professional depth and sophistication, balancing the warm tones

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Project Structure

```
spanish-horizons-academy/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── admissions/        # Admissions page
│   ├── calendar/          # Calendar page
│   ├── contact/           # Contact page
│   ├── faq/              # FAQ page
│   ├── programs/          # Programs page
│   └── tuition/           # Tuition page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── public/               # Static assets
│   ├── branding/         # Logo and branding
│   └── pictures/         # Image gallery
└── styles/               # Global styles
```

## Contributing

When adding new components or pages, please use the established color palette to maintain visual consistency across the website. 