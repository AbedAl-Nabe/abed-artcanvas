"use client"

import * as React from "react"

type Language = "en" | "ar"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    gallery: "Gallery",
    commission: "Commission",

    // Hero Section
    trustedBy: "Trusted by 500+ Art Collectors",
    heroTitle: "Transform Memories Into",
    heroSubtitle: "Golden Masterpieces",
    heroDescription:
      "Experience the elegance of professional hand-painted artwork created from your most cherished photographs. Our master artists bring your memories to life with exquisite detail and timeless beauty.",
    commissionYourArt: "Commission Your Art",
    exploreGallery: "Explore Gallery",

    // Features
    artOfPerfection: "The Art of Perfection",
    featuresDescription:
      "Our meticulous process ensures every brushstroke captures the essence of your precious moments",
    uploadPreview: "Upload & Preview",
    uploadDescription:
      "Share your favorite photograph and instantly preview how it will translate into a stunning black & white composition",
    artisanCraftsmanship: "Artisan Craftsmanship",
    artisanDescription:
      "Choose your preferred canvas size and border color, then let our master artists create your bespoke painting",
    whatsappContact: "WhatsApp Contact",
    whatsappDescription:
      "Submit your commission and we'll contact you via WhatsApp to confirm details and provide updates",

    // Pricing
    simplePricing: "Simple, Transparent Pricing",
    pricingDescription: "Premium quality artwork with elegant borders included",
    a4Premium: "A4 Premium",
    a3Deluxe: "A3 Deluxe",
    borderIncluded: "Includes elegant border",

    // Social Media
    followJourney: "Follow Our Artistic Journey",
    stayConnected: "Stay connected and see our latest masterpieces",

    // CTA
    readyToCreate: "Ready to Create Your Legacy?",
    ctaDescription:
      "Transform your most precious memories into timeless masterpieces that will be treasured for generations",
    beginCommission: "Begin Your Commission",

    // Footer
    brandTagline: "Premium Art Studio",
    footerDescription: "Transforming precious moments into timeless masterpieces since 2020",

    // Gallery Page
    masterpieceCollection: "Masterpiece Collection",
    galleryDescription:
      "Discover the extraordinary artistry and craftsmanship that transforms ordinary photographs into extraordinary paintings. Each piece tells a unique story, painted with passion and precision.",
    backToHome: "Back to Home",
    inspiredByWhat: "Inspired by What You See?",
    inspiredDescription:
      "Let us create a personalized masterpiece that captures your most treasured memories with the same artistic excellence and attention to detail.",
    commissionMasterpiece: "Commission Your Masterpiece",

    // Order Page
    commissionYourMasterpiece: "Commission Your Masterpiece",
    orderDescription:
      "Begin your artistic journey by sharing your vision with us. Our master artists will transform your cherished photograph into a timeless work of art.",
    commissionDetails: "Commission Details",
    formDescription: "Provide your information and preferences. We'll contact you via WhatsApp after submission.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    optional: "(Optional)",
    mobilePhone: "Mobile Phone",
    location: "Location",
    canvasSize: "Canvas Size",
    borderColor: "Border Color",
    chooseBorderColor: "Choose border color",
    classicBlack: "Classic Black",
    pureWhite: "Pure White",
    elegantGold: "Elegant Gold",
    silver: "Silver",
    richBrown: "Rich Brown",
    submitCommission: "Submit Commission",
    submittingCommission: "Submitting Commission...",
    yourPhotograph: "Your Photograph",
    uploadDescription2: "Upload your image to see how it will translate into a beautiful painting.",
    uploadYourImage: "Upload Your Image",
    uploadPrompt: "Share your favorite photograph and see an instant artistic preview",
    chooseYourPhoto: "Choose Your Photo",
    supportsFiles: "Supports JPEG and PNG files up to 10MB",
    artisticPreview: "Artistic Preview",
    remove: "Remove",
    aboutPreview: "About Your Preview",
    previewDescription:
      "This black & white preview shows how our artists will interpret the composition, lighting, and details. Your final painting will be created in full, vibrant color with your chosen border.",
    successMessage: "Commission submitted successfully! We'll contact you on WhatsApp within 24 hours.",
    errorMessage: "Failed to submit commission. Please try again.",

    // Form placeholders
    enterFullName: "Enter your full name",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "+1 (555) 123-4567",
    locationPlaceholder: "City, State/Province, Country",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    gallery: "المعرض",
    commission: "الطلب",

    // Hero Section
    trustedBy: "موثوق من قبل أكثر من 500 جامع فني",
    heroTitle: "حول الذكريات إلى",
    heroSubtitle: "تحف ذهبية",
    heroDescription:
      "اختبر أناقة الأعمال الفنية المرسومة يدوياً والمصنوعة من صورك الأكثر عزة. فنانونا المحترفون يحيون ذكرياتك بتفاصيل رائعة وجمال خالد.",
    commissionYourArt: "اطلب عملك الفني",
    exploreGallery: "استكشف المعرض",

    // Features
    artOfPerfection: "فن الكمال",
    featuresDescription: "عمليتنا الدقيقة تضمن أن كل ضربة فرشاة تلتقط جوهر لحظاتك الثمينة",
    uploadPreview: "رفع ومعاينة",
    uploadDescription: "شارك صورتك المفضلة واحصل على معاينة فورية لكيفية تحويلها إلى تركيبة أبيض وأسود مذهلة",
    artisanCraftsmanship: "حرفية فنية",
    artisanDescription: "اختر حجم اللوحة المفضل ولون الإطار، ثم دع فنانينا المحترفين ينشئون لوحتك المخصصة",
    whatsappContact: "التواصل عبر واتساب",
    whatsappDescription: "أرسل طلبك وسنتواصل معك عبر واتساب لتأكيد التفاصيل وتقديم التحديثات",

    // Pricing
    simplePricing: "أسعار بسيطة وشفافة",
    pricingDescription: "أعمال فنية عالية الجودة مع إطارات أنيقة مشمولة",
    a4Premium: "A4 مميز",
    a3Deluxe: "A3 فاخر",
    borderIncluded: "يشمل إطار أنيق",

    // Social Media
    followJourney: "تابع رحلتنا الفنية",
    stayConnected: "ابق متصلاً وشاهد أحدث تحفنا الفنية",

    // CTA
    readyToCreate: "مستعد لإنشاء إرثك؟",
    ctaDescription: "حول ذكرياتك الأكثر ثمناً إلى تحف خالدة ستُعتز بها للأجيال القادمة",
    beginCommission: "ابدأ طلبك",

    // Footer
    brandTagline: "استوديو فني مميز",
    footerDescription: "نحول اللحظات الثمينة إلى تحف خالدة منذ 2020",

    // Gallery Page
    masterpieceCollection: "مجموعة التحف الفنية",
    galleryDescription:
      "اكتشف الفن الاستثنائي والحرفية التي تحول الصور العادية إلى لوحات استثنائية. كل قطعة تحكي قصة فريدة، مرسومة بشغف ودقة.",
    backToHome: "العودة للرئيسية",
    inspiredByWhat: "مُلهم بما تراه؟",
    inspiredDescription: "دعنا ننشئ تحفة شخصية تلتقط ذكرياتك الأكثر عزة بنفس التميز الفني والاهتمام بالتفاصيل.",
    commissionMasterpiece: "اطلب تحفتك الفنية",

    // Order Page
    commissionYourMasterpiece: "اطلب تحفتك الفنية",
    orderDescription: "ابدأ رحلتك الفنية بمشاركة رؤيتك معنا. فنانونا المحترفون سيحولون صورتك العزيزة إلى عمل فني خالد.",
    commissionDetails: "تفاصيل الطلب",
    formDescription: "قدم معلوماتك وتفضيلاتك. سنتواصل معك عبر واتساب بعد الإرسال.",
    fullName: "الاسم الكامل",
    emailAddress: "عنوان البريد الإلكتروني",
    optional: "(اختياري)",
    mobilePhone: "رقم الهاتف المحمول",
    location: "الموقع",
    canvasSize: "حجم اللوحة",
    borderColor: "لون الإطار",
    chooseBorderColor: "اختر لون الإطار",
    classicBlack: "أسود كلاسيكي",
    pureWhite: "أبيض نقي",
    elegantGold: "ذهبي أنيق",
    silver: "فضي",
    richBrown: "بني غني",
    submitCommission: "إرسال الطلب",
    submittingCommission: "جاري إرسال الطلب...",
    yourPhotograph: "صورتك الفوتوغرافية",
    uploadDescription2: "ارفع صورتك لترى كيف ستتحول إلى لوحة جميلة.",
    uploadYourImage: "ارفع صورتك",
    uploadPrompt: "شارك صورتك المفضلة واحصل على معاينة فنية فورية",
    chooseYourPhoto: "اختر صورتك",
    supportsFiles: "يدعم ملفات JPEG و PNG حتى 10 ميجابايت",
    artisticPreview: "معاينة فنية",
    remove: "إزالة",
    aboutPreview: "حول معاينتك",
    previewDescription:
      "هذه المعاينة بالأبيض والأسود تُظهر كيف سيفسر فنانونا التركيب والإضاءة والتفاصيل. لوحتك النهائية ستُنشأ بألوان كاملة وزاهية مع الإطار المختار.",
    successMessage: "تم إرسال الطلب بنجاح! سنتواصل معك عبر واتساب خلال 24 ساعة.",
    errorMessage: "فشل في إرسال الطلب. يرجى المحاولة مرة أخرى.",

    // Form placeholders
    enterFullName: "أدخل اسمك الكامل",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "+966 50 123 4567",
    locationPlaceholder: "المدينة، المنطقة، البلد",
  },
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: () => "",
}

const LanguageProviderContext = React.createContext<LanguageProviderState>(initialState)

export function LanguageProvider({ children, defaultLanguage = "en", ...props }: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage)

  const t = React.useCallback(
    (key: string) => {
      return translations[language][key as keyof (typeof translations)[typeof language]] || key
    },
    [language],
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("ltr", "rtl")
    root.classList.add(language === "ar" ? "rtl" : "ltr")
    root.setAttribute("dir", language === "ar" ? "rtl" : "ltr")
    root.setAttribute("lang", language)
  }, [language])

  const value = {
    language,
    setLanguage,
    t,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = React.useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
