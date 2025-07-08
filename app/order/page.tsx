"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { Palette, ArrowLeft, Upload, X, Sparkles, MessageCircle, CheckCircle, AlertCircle } from "lucide-react"

export default function OrderPage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    size: "A4",
    borderColor: "",
  })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const borderColors = [
    { value: "black", label: t("classicBlack"), color: "#000000" },
    { value: "white", label: t("pureWhite"), color: "#FFFFFF" },
    { value: "gold", label: t("elegantGold"), color: "#D4AF37" },
    { value: "silver", label: t("silver"), color: "#C0C0C0" },
    { value: "brown", label: t("richBrown"), color: "#8B4513" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setUploadedImage(imageUrl)
        convertToGrayscale(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const convertToGrayscale = (imageUrl: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const maxSize = 500
      let { width, height } = img

      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
      }

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
        data[i] = gray
        data[i + 1] = gray
        data[i + 2] = gray
      }

      ctx.putImageData(imageData, 0, 0)
      const processedDataUrl = canvas.toDataURL("image/jpeg", 0.8)
      setProcessedImage(processedDataUrl)
    }
    img.src = imageUrl
  }

  const clearImage = () => {
    setUploadedImage(null)
    setProcessedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateForm = () => {
    const requiredFields = ["name", "phone", "location", "borderColor"]
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData].trim()) {
        return false
      }
    }
    if (!uploadedImage) {
      return false
    }
    return true
  }

  const submitOrder = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields, select a border color, and upload an image")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Send email via Netlify Function (works both locally and on Netlify)
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageData: processedImage, // Include the processed image
          submittedAt: new Date().toISOString(),
        }),
      })

      const result = await emailResponse.json()

      if (!emailResponse.ok || !result.success) {
        throw new Error(result.message || "Failed to send email")
      }

      setSubmitStatus("success")

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          size: "A4",
          borderColor: "",
        })
        clearImage()
        setSubmitStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Submission failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200"
                >
                  {t("home")}
                </Link>
                <Link
                  href="/gallery"
                  className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200"
                >
                  {t("gallery")}
                </Link>
                <Link href="/order" className="text-amber-400 font-medium">
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
                className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 text-sm"
              >
                {t("home")}
              </Link>
              <Link
                href="/gallery"
                className="text-white dark:text-white light:text-gray-800 hover:text-amber-400 font-medium transition-colors duration-200 text-sm"
              >
                {t("gallery")}
              </Link>
              <Link href="/order" className="text-amber-400 font-medium text-sm">
                {t("commission")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600/10 to-amber-500/5 dark:from-amber-600/10 dark:to-amber-500/5 light:from-amber-600/20 light:to-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6 sm:mb-8">
            <Link
              href="/"
              className="flex items-center text-amber-400 hover:text-amber-300 mr-6 rtl:mr-0 rtl:ml-6 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              <span className="font-medium text-sm sm:text-base">{t("backToHome")}</span>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-white dark:text-white light:text-gray-900 mb-4 sm:mb-6">
              {t("commissionYourMasterpiece")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              {t("orderDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Form */}
            <Card className="border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 shadow-2xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 light:from-white light:to-amber-50">
              <CardHeader className="pb-6 sm:pb-8">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-gray-900 flex items-center">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 mr-3 rtl:mr-0 rtl:ml-3" />
                  {t("commissionDetails")}
                </CardTitle>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm sm:text-base">
                  {t("formDescription")}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Name */}
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700"
                  >
                    {t("fullName")} *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("enterFullName")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-2 border-amber-500/30 focus:border-amber-500 focus:ring-amber-500 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 light:bg-white text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700"
                  >
                    {t("emailAddress")} <span className="text-gray-500">{t("optional")}</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2 border-amber-500/30 focus:border-amber-500 focus:ring-amber-500 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 light:bg-white text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700"
                  >
                    {t("mobilePhone")} *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-2 border-amber-500/30 focus:border-amber-500 focus:ring-amber-500 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 light:bg-white text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label
                    htmlFor="location"
                    className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700"
                  >
                    {t("location")} *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder={t("locationPlaceholder")}
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="mt-2 border-amber-500/30 focus:border-amber-500 focus:ring-amber-500 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 light:bg-white text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500"
                  />
                </div>

                {/* Size Selection */}
                <div>
                  <Label className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700 mb-3 block">
                    {t("canvasSize")} *
                  </Label>
                  <RadioGroup
                    value={formData.size}
                    onValueChange={(value) => handleInputChange("size", value)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse border border-amber-500/30 rounded-lg p-3 sm:p-4 hover:bg-amber-500/5 transition-colors">
                      <RadioGroupItem value="A4" id="a4" className="text-amber-500 border-amber-500" />
                      <Label htmlFor="a4" className="cursor-pointer text-white dark:text-white light:text-gray-900">
                        <div className="font-semibold text-sm sm:text-base">{t("a4Premium")}</div>
                        <div className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                          21 × 29.7 cm
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-amber-500">
                          $25 ({t("borderIncluded")})
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse border border-amber-500/30 rounded-lg p-3 sm:p-4 hover:bg-amber-500/5 transition-colors">
                      <RadioGroupItem value="A3" id="a3" className="text-amber-500 border-amber-500" />
                      <Label htmlFor="a3" className="cursor-pointer text-white dark:text-white light:text-gray-900">
                        <div className="font-semibold text-sm sm:text-base">{t("a3Deluxe")}</div>
                        <div className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                          29.7 × 42 cm
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-amber-500">
                          $50 ({t("borderIncluded")})
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Border Color */}
                <div>
                  <Label className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700 mb-3 block">
                    {t("borderColor")} *
                  </Label>
                  <Select
                    value={formData.borderColor}
                    onValueChange={(value) => handleInputChange("borderColor", value)}
                  >
                    <SelectTrigger className="border-amber-500/30 focus:border-amber-500 focus:ring-amber-500 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 light:bg-white text-white dark:text-white light:text-gray-900">
                      <SelectValue placeholder={t("chooseBorderColor")} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 dark:bg-gray-800 light:bg-white border-amber-500/30">
                      {borderColors.map((color) => (
                        <SelectItem
                          key={color.value}
                          value={color.value}
                          className="text-white dark:text-white light:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-100"
                        >
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-400"
                              style={{ backgroundColor: color.color }}
                            ></div>
                            <span>{color.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {submitStatus === "success" && (
                    <div className="mb-4 p-3 sm:p-4 bg-green-900/50 dark:bg-green-900/50 light:bg-green-50 border border-green-500/30 dark:border-green-500/30 light:border-green-200 rounded-lg flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 dark:text-green-400 light:text-green-600 mr-3 rtl:mr-0 rtl:ml-3" />
                      <span className="text-green-300 dark:text-green-300 light:text-green-800 font-medium text-sm sm:text-base">
                        Commission submitted successfully! We'll contact you on WhatsApp within 24 hours.
                      </span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mb-4 p-3 sm:p-4 bg-red-900/50 dark:bg-red-900/50 light:bg-red-50 border border-red-500/30 dark:border-red-500/30 light:border-red-200 rounded-lg flex items-center">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 dark:text-red-400 light:text-red-600 mr-3 rtl:mr-0 rtl:ml-3" />
                      <span className="text-red-300 dark:text-red-300 light:text-red-800 font-medium text-sm sm:text-base">
                        Failed to submit commission. Please try again.
                      </span>
                    </div>
                  )}

                  <Button
                    onClick={submitOrder}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black mr-3 rtl:mr-0 rtl:ml-3"></div>
                        Submitting Commission...
                      </>
                    ) : (
                      <>
                        Submit Commission
                        <MessageCircle className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 shadow-2xl bg-gradient-to-br from-black to-gray-900 dark:from-black dark:to-gray-900 light:from-white light:to-amber-50">
              <CardHeader className="pb-6 sm:pb-8">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-gray-900 flex items-center">
                  <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 mr-3 rtl:mr-0 rtl:ml-3" />
                  {t("yourPhotograph")}
                </CardTitle>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm sm:text-base">
                  {t("uploadDescription2")}
                </p>
              </CardHeader>
              <CardContent>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-amber-500/30 rounded-2xl p-8 sm:p-12 text-center bg-gradient-to-br from-amber-500/5 to-amber-600/5 dark:from-amber-500/5 dark:to-amber-600/5 light:from-amber-500/10 light:to-amber-600/10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                      {t("uploadYourImage")}
                    </h3>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      {t("uploadPrompt")}
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                    >
                      {t("chooseYourPhoto")}
                    </Button>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-500 mt-3 sm:mt-4">
                      {t("supportsFiles")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-white light:text-gray-900">
                        {t("artisticPreview")}
                      </h3>
                      <Button
                        onClick={clearImage}
                        variant="outline"
                        size="sm"
                        className="text-red-400 border-red-500/30 hover:bg-red-500/10 bg-transparent rounded-full text-xs sm:text-sm"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 rtl:mr-0 rtl:ml-1 sm:rtl:ml-2" />
                        {t("remove")}
                      </Button>
                    </div>

                    {processedImage && (
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src={processedImage || "/placeholder.svg"}
                          alt="Black and white artistic preview"
                          className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-amber-500/20">
                            <p className="text-xs sm:text-sm font-medium text-amber-400">{t("artisticPreview")}</p>
                            <p className="text-xs text-gray-300">
                              This shows the composition and contrast for your painting
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 dark:from-amber-500/10 dark:to-amber-600/5 light:from-amber-500/20 light:to-amber-600/10 border border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 rounded-xl p-3 sm:p-4">
                      <div className="flex items-start">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 mr-3 rtl:mr-0 rtl:ml-3 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-amber-400 mb-1">{t("aboutPreview")}</p>
                          <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-600">
                            {t("previewDescription")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hidden Canvas for Image Processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Footer */}
      <footer className="bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 dark:border-amber-500/20 light:border-amber-500/30 mt-12 sm:mt-20">
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
