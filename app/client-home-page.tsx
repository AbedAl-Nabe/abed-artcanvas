"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import {
  Palette,
  ImageIcon,
  MessageCircle,
  Sparkles,
  Star,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react"

export function ClientHomePage() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black light:from-gray-50 light:via-amber-50 light:to-gray-100">
      {/* Navigation */}
      <nav className="bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-md shadow-2xl border-b border-amber-500/20 dark:border-amber-500/20 light:border-amber-600/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
              <div className="relative">
                <Palette className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500" />
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  ArtCanvas
                </span>
                <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 font-medium hidden sm:block">
                  {t("brandTagline")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
              <div className="hidden sm:flex space-x-6 rtl:space-x-reverse">
                <Link
                  href="/"
                  className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 px-2"
                >
                  {t("home")}
                </Link>
                <Link
                  href="/gallery"
                  className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 px-2"
                >
                  {t("gallery")}
                </Link>
                <Link
                  href="/order"
                  className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 px-2"
                >
                  {t("commission")}
                </Link>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden pb-4">
            <div className="flex justify-center space-x-6 rtl:space-x-reverse">
              <Link
                href="/"
                className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 text-sm px-2"
              >
                {t("home")}
              </Link>
              <Link
                href="/gallery"
                className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 text-sm px-2"
              >
                {t("gallery")}
              </Link>
              <Link
                href="/order"
                className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 text-sm px-2"
              >
                {t("commission")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-amber-400/5 dark:from-amber-600/10 dark:to-amber-400/5 light:from-amber-600/20 light:to-amber-400/10"></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-amber-500/10 dark:bg-amber-500/10 light:bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 mb-6 sm:mb-8">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 mr-2 rtl:mr-0 rtl:ml-2" />
            <span className="text-xs sm:text-sm font-medium text-amber-200 dark:text-amber-200 light:text-amber-700">
              {t("trustedBy")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white dark:text-white light:text-gray-900 mb-6 sm:mb-8 leading-tight">
            {t("heroTitle")}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent block mt-2">
              {t("heroSubtitle")}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            {t("heroDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Link href="/order">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {t("commissionYourArt")}
                <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-amber-500 text-amber-400 dark:text-amber-400 light:text-amber-600 hover:bg-amber-500/10 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-transparent backdrop-blur-sm transition-all duration-300 hover:border-amber-400"
              >
                {t("exploreGallery")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/5 dark:bg-white/5 light:bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
              {t("artOfPerfection")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-2xl mx-auto px-4">
              {t("featuresDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Link href="/order" className="block">
              <Card className="text-center border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 shadow-2xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 light:from-white light:to-amber-50 hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white dark:text-white light:text-gray-900">
                    {t("uploadPreview")}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t("uploadDescription")}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/gallery" className="block">
              <Card className="text-center border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 shadow-2xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 light:from-white light:to-amber-50 hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white dark:text-white light:text-gray-900">
                    {t("artisanCraftsmanship")}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t("artisanDescription")}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/order" className="block">
              <Card className="text-center border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 shadow-2xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 light:from-white light:to-amber-50 hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white dark:text-white light:text-gray-900">
                    {t("whatsappContact")}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t("whatsappDescription")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-4 sm:mb-6">
            {t("simplePricing")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 sm:mb-12 px-4">
            {t("pricingDescription")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Link href="/order" className="block">
              <Card className="border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 shadow-2xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 light:from-white light:to-amber-50 hover:shadow-amber-500/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                    {t("a4Premium")}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">21 × 29.7 cm</p>
                  <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-4">$25</div>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm">{t("borderIncluded")}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/order" className="block">
              <Card className="border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 shadow-2xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 light:from-white light:to-amber-50 hover:shadow-amber-500/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                    {t("a3Deluxe")}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">29.7 × 42 cm</p>
                  <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-4">$50</div>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm">{t("borderIncluded")}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600/10 to-amber-500/5 dark:from-amber-600/10 dark:to-amber-500/5 light:from-amber-600/20 light:to-amber-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-4 sm:mb-6">
            {t("followJourney")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-6 sm:mb-8 px-4">
            {t("stayConnected")}
          </p>

          <div className="flex justify-center space-x-4 sm:space-x-6 rtl:space-x-reverse">
            <a
              href="#"
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-amber-500/25"
            >
              <Instagram className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
            </a>
            <a
              href="#"
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-amber-500/25"
            >
              <Facebook className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
            </a>
            <a
              href="#"
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-amber-500/25"
            >
              <Twitter className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black light:from-gray-100 light:to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-4 sm:mb-6">
            {t("readyToCreate")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 sm:mb-10 leading-relaxed px-4">
            {t("ctaDescription")}
          </p>
          <Link href="/order">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
            >
              {t("beginCommission")}
              <Sparkles className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
              <div className="relative">
                <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
                <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-amber-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  ArtCanvas
                </span>
                <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">{t("brandTagline")}</p>
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-center text-sm sm:text-base">
              {t("footerDescription")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
