# Font Testing Feature

## Overview
I've added a font testing button to the hero section of your main page that allows you to easily compare how three different fonts look on the title: **Poppins**, **Playfair Display**, and **Lora**.

## How to Use

### Desktop
- Look for the "Font: [Current Font]" button in the top-right corner of the hero section
- Click the button to open a dropdown menu
- Select any of the three fonts to see how it looks on the title
- The title will update immediately with the selected font

### Mobile
- The font testing button appears below the main action buttons
- Same functionality as desktop - click to open dropdown and select font

## Fonts Available

1. **Poppins** (`font-poppins`) - Modern, geometric sans-serif
2. **Playfair Display** (`font-playfair`) - Elegant serif with high contrast
3. **Lora** (`font-lora`) - Readable serif designed for body text

## Technical Details

- The font change is applied dynamically using React state
- The button shows the currently selected font name
- The selected font is applied to the main title: "Spanish Horizons Academy"
- The subtitle "K-5 Spanish Immersion" uses the same font
- Default font is Playfair Display (as it was originally)

## Files Modified

- `components/font-testing-button.tsx` - New component for font selection
- `components/hero-with-images.tsx` - Updated to include font testing functionality

## Testing the Fonts

1. Start your development server: `npm run dev`
2. Navigate to the homepage
3. Use the font testing button to cycle through the three fonts
4. Compare how each font looks with your title and overall design
5. Choose the one that best fits your brand aesthetic

The font testing is temporary and only affects the display - it doesn't permanently change your design until you decide which font you prefer and update the code accordingly.
