"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { Palette, ArrowLeft, Sparkles, Star } from "lucide-react"

export default function GalleryPage() {
  const { t, language } = useLanguage()

  // Generate 13 portraits with images 1.jpg to 13.jpg
  const galleryImages = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    title: "Portrait",
    size: "A4",
    category: "Portrait",
    price: "$25",
    image: `/gallery/${i + 1}.jpg`,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-md shadow-2xl border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Palette className="h-8 w-8 text-amber-500" />
                <Sparkles className="h-4 w-4 text-amber-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  ArtCanvas
                </span>
                <p className="text-xs text-gray-400 hidden sm:block">{t("brandTagline")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-amber-400 transition">{t("home")}</Link>
              <Link href="/gallery" className="text-amber-400 font-medium">{t("gallery")}</Link>
              <Link href="/order" className="text-white hover:text-amber-400 transition">{t("commission")}</Link>
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600/10 to-amber-500/5">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">{t("backToHome")}</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {language === "en" ? "Our " : "مجموعة "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {t("masterpieceCollection")}
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">{t("galleryDescription")}</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl shadow-2xl bg-gradient-to-br from-black to-gray-900 border border-amber-500/20 overflow-hidden transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <span className="bg-amber-500/90 text-black text-sm px-3 py-1 rounded-full font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                    Size: {item.size}
                  </span>
                  <span className="text-amber-400 font-bold">{item.price}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">(4.9)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600/10 to-amber-500/5 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("inspiredByWhat")}</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">{t("inspiredDescription")}</p>
        <Link href="/order">
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:to-amber-700 text-black px-8 py-3 font-bold rounded-full shadow-xl hover:scale-105 transition-all duration-300">
            {t("commissionMasterpiece")}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3">
            <Palette className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              ArtCanvas
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">{t("footerDescription")}</p>
        </div>
      </footer>
    </div>
  )
}
