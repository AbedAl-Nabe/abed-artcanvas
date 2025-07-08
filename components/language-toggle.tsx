"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="border-amber-500/30 hover:bg-amber-500/10 bg-transparent min-w-[60px]"
    >
      <Languages className="h-4 w-4 mr-1" />
      <span className="text-xs font-medium">{language === "en" ? "عربي" : "EN"}</span>
    </Button>
  )
}
