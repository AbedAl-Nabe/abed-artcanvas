import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic" })

export const metadata: Metadata = {
  title: "ArtCanvas - Premium Art Studio",
  description: "Transform your precious memories into timeless masterpieces",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansArabic.variable} font-sans`}>
        <ThemeProvider defaultTheme="light">
          <LanguageProvider defaultLanguage="en">{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
