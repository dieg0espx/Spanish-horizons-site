"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Type } from "lucide-react"

interface FontTestingButtonProps {
  onFontChange: (font: string) => void
  currentFont: string
}

const fonts = [
  { name: "Poppins", class: "font-poppins" },
  { name: "Playfair Display", class: "font-playfair" },
  { name: "Lora", class: "font-lora" }
]

export default function FontTestingButton({ onFontChange, currentFont }: FontTestingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFontSelect = (font: { name: string; class: string }) => {
    onFontChange(font.class)
    setIsOpen(false)
  }

  const getCurrentFontName = () => {
    return fonts.find(font => font.class === currentFont)?.name || "Playfair Display"
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-200"
      >
        <Type className="h-4 w-4 mr-2" />
        Font: {getCurrentFontName()}
      </Button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
          {fonts.map((font) => (
            <button
              key={font.class}
              onClick={() => handleFontSelect(font)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 ${
                currentFont === font.class ? 'bg-amber/20 text-amber-800 font-semibold' : 'text-gray-700'
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
