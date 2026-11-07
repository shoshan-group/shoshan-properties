"use client";

import { useState } from "react";
import HomeSearch from "./HomeSearch";
import MarketSelector from "./MarketSelector";
import {
  Bell,
  Building2,
  Building,
  BriefcaseBusiness,
  Heart,
  House,
  Hotel,
  LandPlot,
  MapPinned,
  Menu,
  Search,
  Store,
  Trees,
  Castle,
  Warehouse,
  Factory,
  Stethoscope,
  Sofa,
  BedDouble,
  Landmark,
  Wrench,
  Wallet,
  Compass,
  Home as HomeIcon,
  UserRound,
  Waves,
  Repeat2,
  Palmtree,
  KeyRound,
  ChartNoAxesCombined,
} from "lucide-react";


const properties = [
  {
    title: "فيلا فاخرة - القرنة",
    location: "الأقصر",
    price: "14,500,000",
    area: "420",
    bedrooms: "5",
    bathrooms: "4",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900",
    type: "سكني",
  },
  {
    title: "شقة فاخرة - شارع المدينة",
    location: "الأقصر",
    price: "6,800,000",
    area: "180",
    bedrooms: "3",
    bathrooms: "2",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
    type: "سكني",
  },
  {
    title: "محل تجاري - وسط المدينة",
    location: "الأقصر",
    price: "3,200,000",
    area: "120",
    bedrooms: "-",
    bathrooms: "-",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
    type: "تجاري",
  },
];

const propertyCategories = [
  { title: "شقق", market: "سكني", icon: Building2, href: "/properties?type=apartment" },
  { title: "فيلات", market: "سكني", icon: House, href: "/properties?type=villa" },
  { title: "قصور", market: "سكني", icon: Castle, href: "/properties?type=palace" },
  { title: "منازل", market: "سكني", icon: HomeIcon, href: "/properties?type=house" },
  { title: "دوبلكس", market: "سكني", icon: Building, href: "/properties?type=duplex" },
  { title: "استوديو", market: "سكني", icon: BedDouble, href: "/properties?type=studio" },
  { title: "أراضٍ سكنية", market: "سكني", icon: LandPlot, href: "/properties?type=residential-land" },

  { title: "محلات", market: "تجاري وإداري", icon: Store, href: "/properties?type=shop" },
  { title: "مكاتب", market: "تجاري وإداري", icon: BriefcaseBusiness, href: "/properties?type=office" },
  { title: "مقرات شركات", market: "تجاري وإداري", icon: Building2, href: "/properties?type=company-office" },
  { title: "عيادات", market: "تجاري وإداري", icon: Stethoscope, href: "/properties?type=clinic" },
  { title: "مولات", market: "تجاري وإداري", icon: Landmark, href: "/properties?type=mall" },
  { title: "مخازن", market: "تجاري وإداري", icon: Warehouse, href: "/properties?type=warehouse" },
  { title: "مصانع", market: "تجاري وإداري", icon: Factory, href: "/properties?type=factory" },
  { title: "ورش", market: "تجاري وإداري", icon: Wrench, href: "/properties?type=workshop" },
  { title: "أراضٍ تجارية", market: "تجاري وإداري", icon: LandPlot, href: "/properties?type=commercial-land" },

  { title: "فنادق", market: "سياحي وفندقي", icon: Hotel, href: "/properties?type=hotel" },
  { title: "منتجعات", market: "سياحي وفندقي", icon: Trees, href: "/properties?type=resort" },
  { title: "شقق فندقية", market: "سياحي وفندقي", icon: Building, href: "/properties?type=hotel-apartment" },
  { title: "شقق مفروشة", market: "سياحي وفندقي", icon: Sofa, href: "/properties?type=furnished-apartment" },
  { title: "شاليهات", market: "سياحي وفندقي", icon: Waves, href: "/properties?type=chalet" },
  { title: "فيلات سياحية", market: "سياحي وفندقي", icon: House, href: "/properties?type=tourist-villa" },
  { title: "غرف وأجنحة", market: "سياحي وفندقي", icon: BedDouble, href: "/properties?type=hotel-room" },

  { title: "مبانٍ كاملة", market: "استثماري", icon: Building, href: "/properties?type=whole-building" },
  { title: "مشروعات تحت الإنشاء", market: "استثماري", icon: Landmark, href: "/properties?type=under-construction" },
  { title: "فرص تطوير", market: "استثماري", icon: Compass, href: "/properties?type=development-opportunity" },
  { title: "عقارات مدرة للدخل", market: "استثماري", icon: Wallet, href: "/properties?type=income-property" },
];

const resaleProperties = [
  {
    title: "شقة في مشروع سكني",
    project: "مشروع سكني - الأقصر",
    paid: 450000,
    remaining: 850000,
    transfer: 500000,
    developerPrice: null as number | null,
    developerPriceUpdatedAt: null as string | null,
    developerPriceSource: null as string | null,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700",
    isDemo: true,
  },
  {
    title: "وحدة سكنية مميزة",
    project: "مشروع عمراني",
    paid: 700000,
    remaining: 1200000,
    transfer: 750000,
    developerPrice: null as number | null,
    developerPriceUpdatedAt: null as string | null,
    developerPriceSource: null as string | null,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700",
    isDemo: true,
  },
];

const formatEGP = (amount: number) =>
  `${new Intl.NumberFormat("ar-EG").format(amount)} ج.م`;

const getResaleTotal = (item: (typeof resaleProperties)[number]) =>
  item.transfer + item.remaining;

function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow?: string;
  title: string;
  link?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold tracking-wide text-[#258EE8]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-extrabold text-[#142B49] sm:text-2xl">
          {title}
        </h2>
      </div>

      {link && (
        <a
          href={link}
          className="shrink-0 text-xs font-bold text-[#258EE8] transition hover:text-[#258EE8]"
        >
          عرض الكل ←
        </a>
      )}
    </div>
  );
}

export default function Home() {
    const [activeMarket, setActiveMarket] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [selectedMarket, setSelectedMarket] = useState("سكني");
const marketOptions: Record<string, { value: string; label: string }[]> = {
  سكني: [
    { value: "apartment", label: "شقق" },
    { value: "villa", label: "فيلات" },
    { value: "whole-building", label: "عمارات" },
    { value: "compound", label: "كمبوندات" },
  ],
  تجاري: [
    { value: "shop", label: "محلات" },
    { value: "office", label: "مكاتب" },
    { value: "clinic", label: "عيادات" },
    { value: "warehouse", label: "مخازن" },
    { value: "factory", label: "مصانع" },
    { value: "commercial-land", label: "أراضٍ تجارية" },
  ],
   مصايف: [
    { value: "resort", label: "منتجعات" },
    { value: "chalet", label: "شاليهات" },
    { value: "tourist-villa", label: "فيلات سياحية" },
    { value: "furnished-apartment", label: "شقق مفروشة" },
  ],
  "إعادة البيع": [
    { value: "resale", label: "عقارات إعادة البيع" },
    { value: "contract-assignment", label: "تنازل عن تعاقد" },
    { value: "immediate-handover", label: "استلام فوري" },
  ],
  استثماري: [
    { value: "whole-building", label: "مبانٍ كاملة" },
    { value: "development-opportunity", label: "فرص تطوير" },
    { value: "income-property", label: "أصول مدرة للدخل" },
    { value: "investment-land", label: "أراضٍ استثمارية" },
  ],
};
const markets = [
  {
    name: "سكني",
    icon: House,
    items: [
      ["شقق", Building2, "/properties?type=apartment"],
      ["فيلات", House, "/properties?type=villa"],
      ["عمارات", Building, "/properties?type=whole-building"],
      ["كمبوندات", Trees, "/properties?type=compound"],
      ["مطورون", Landmark, "/developers"],
      ["شركات", BriefcaseBusiness, "/companies"],
    ],
  },
  {
    name: "تجاري",
    icon: Building2,
    items: [
      ["محلات", Store, "/properties?type=shop"],
      ["مكاتب", BriefcaseBusiness, "/properties?type=office"],
      ["عيادات", Stethoscope, "/properties?type=clinic"],
      ["مخازن", Warehouse, "/properties?type=warehouse"],
      ["مصانع", Factory, "/properties?type=factory"],
      ["أراضٍ تجارية", LandPlot, "/properties?type=commercial-land"],
    ],
  },
  {
    name: "مصايف",
    icon: Palmtree,
    items: [
      ["منتجعات", Trees, "/properties?type=resort"],
      ["شاليهات", Waves, "/properties?type=chalet"],
      ["فيلات سياحية", House, "/properties?type=tourist-villa"],
      ["شقق مفروشة", Sofa, "/properties?type=furnished-apartment"],
    ],
  },
  {
    name: "إعادة البيع",
    icon: KeyRound,
    items: [
      ["عقارات إعادة البيع", House, "/resale"],
      ["تنازل عن تعاقد", Repeat2, "/resale"],
      ["وحدات استلام فوري", Building2, "/resale"],
      ["فرص إعادة البيع", Wallet, "/resale"],
    ],
  },
  {
    name: "استثماري",
    icon: ChartNoAxesCombined,
    items: [
      ["مبانٍ كاملة", Building, "/properties?type=whole-building"],
      ["مشروعات", Landmark, "/projects"],
      ["فرص تطوير", Compass, "/properties?type=development-opportunity"],
      ["أصول مدرة للدخل", Wallet, "/properties?type=income-property"],
      ["أراضٍ", LandPlot, "/properties?type=investment-land"],
      ["مطورون", Building2, "/developers"],
    ],
  },
] as const;

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-clip bg-white pb-20 text-[#142B49] sm:pb-0"
    >
            {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/85 text-[#142B49] shadow-[0_4px_24px_rgba(31,104,160,0.06)] backdrop-blur-2xl">
        <div className="mx-auto flex h-[56px] max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
          <a href="/" className="flex shrink-0 items-center">
  <img
    src="/shoshan-logoes.png"
    alt="SHOSHAN PROPERTIES"
    className="h-12 w-auto max-w-[180px] object-contain"
  />
</a>
          <nav className="hidden items-center gap-5 xl:flex">
            {[
              ["الرئيسية", "/"],
              ["العقارات", "/properties"],
              ["المشروعات", "/projects"],
              ["إعادة البيع", "/resale"],
              ["الاستثمار", "/investment"],
              ["الخدمات", "/services"],
              ["عن شوشان", "/about"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="whitespace-nowrap text-xs font-semibold text-[#52677E] transition hover:text-[#258EE8]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href="/login" className="text-sm font-semibold hover:text-[#258EE8]">
              تسجيل الدخول
            </a>
            <a
              href="/favorites"
              aria-label="المفضلة"
              className="text-[#52677E] transition hover:text-[#258EE8]"
            >
              <Heart size={21} strokeWidth={1.8} />
            </a>
            <a
              href="/register"
              className="rounded-xl bg-gradient-to-l from-[#258EE8] to-[#48B8F5] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-100 transition hover:-translate-y-0.5"
            >
              <span className="inline-flex items-center gap-2">
                <House size={17} strokeWidth={2} />
                ضيف عقارك
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/notifications"
              aria-label="الإشعارات"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-white text-[#258EE8]"
            >
              <Bell size={19} />
            </a>
            <a
              href="/favorites"
              aria-label="المفضلة"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-white text-[#258EE8]"
            >
              <Heart size={19} />
            </a>
            <a
              href="/login"
              aria-label="حسابي"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-white text-[#258EE8]"
            >
              <UserRound size={19} />
            </a>
            <button
  type="button"
  aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
  aria-expanded={isMobileMenuOpen}
  onClick={() => setIsMobileMenuOpen((open) => !open)}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-white text-[#258EE8]"
>
  <Menu size={20} />
</button>
</div>

        <div className="hidden border-t border-sky-50 lg:block">
          <nav className="mx-auto flex max-w-[1500px] items-center justify-center gap-8 px-6 py-3 text-xs font-medium text-slate-500">
            <a href="/residential" className="hover:text-sky-500">سكني</a>
            <a href="/commercial" className="hover:text-sky-500">تجاري</a>
            <a href="/tourism" className="hover:text-sky-500">سياحي</a>
            <a href="/investment" className="hover:text-sky-500">استثماري</a>
            <a href="/resale" className="hover:text-sky-500">إعادة البيع</a>
            <a href="/developers" className="hover:text-sky-500">المطورون</a>
            <a href="/companies" className="hover:text-sky-500">الشركات والخدمات</a>
          </nav>
        </div>
        </div>
            </header>

      <div className="home-feature-frame">
                              {/* HERO */}
      {/* MOBILE & TABLET HERO — الحفاظ على التصميم الحالي */}

<div className="lg:hidden">
  <section className="relative z-30 isolate overflow-hidden bg-[#F4F1EA]">
    {/* Hero Background */}
    <div
      className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
      style={{
  backgroundImage: "url('/images/hero/main.jpg')",
}}
    />

    {/* Premium Gradient Overlay */}
<div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,31,53,0.16)_0%,rgba(16,31,53,0.06)_35%,rgba(244,241,234,0.82)_72%,rgba(244,241,234,0.97)_100%)]" />

    {/* Hero Content */}
<div className="relative mx-auto flex min-h-[150px] max-w-[1500px] items-center justify-end px-4 py-2 sm:min-h-[300px] sm:px-8 sm:py-7">
  <div
    dir="rtl"
    className="relative z-10 w-full max-w-[650px] text-right"
  >
    <h1 className="text-[25px] font-extrabold leading-[1.35] tracking-tight text-[#142B49] sm:text-5xl">
      اكتشف عالمًا
      <br />
      <span className="bg-gradient-to-l from-[#0878D9] to-[#35A9F4] bg-clip-text text-transparent">
        من الفرص العقارية
      </span>
    </h1>

    <p className="mt-1 max-w-[570px] text-[12px] font-medium leading-[1.7] text-[#34465B] sm:mt-4 sm:text-lg">
      استكشف سوقًا عقاريًا متكاملًا يجمع العقارات السكنية والتجارية
      والسياحية والاستثمارية، واكتشف فرصتك القادمة بثقة ووضوح.
    </p>

    {/* Hero Actions */}
    <div className="mt-3 flex flex-wrap items-center justify-start gap-2 sm:mt-7 sm:gap-3">
      <a
        href="/properties"
        className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-gradient-to-l from-[#006BCB] to-[#078CEB] px-4 text-xs font-extrabold text-white shadow-[0_8px_20px_rgba(0,116,210,0.22)] transition hover:-translate-y-1 sm:min-h-[58px] sm:px-8 sm:text-lg"
      >
        استكشف العقارات ←
      </a>

      <a
        href="/projects"
        className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-[#D4E2F0] bg-[#FFFDF9]/95 px-4 text-xs font-extrabold text-[#174B82] shadow-[0_5px_15px_rgba(31,104,160,0.10)] transition hover:-translate-y-1 hover:border-sky-300 sm:min-h-[58px] sm:px-8 sm:text-lg"
      >
        اكتشف المشروعات
      </a>
    </div>
  </div>
</div>
</section>
</div>

{/* DESKTOP HERO — SHOSHAN PREMIUM EXPERIENCE */}

<section className="relative hidden min-h-[510px] overflow-hidden bg-[#101F35] lg:block xl:min-h-[550px]">
  {/* Architectural background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(36,87,167,0.28),transparent_55%)]" />
    <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />
    <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full border border-[#B69A6A]/15" />
    <div className="absolute -left-20 -top-20 h-[360px] w-[360px] rounded-full border border-[#B69A6A]/10" />
  </div>

  <div className="relative mx-auto grid min-h-[510px] max-w-[1500px] grid-cols-2 items-center gap-10 px-12 py-12 xl:min-h-[550px] xl:gap-16 xl:px-16">
    {/* Villa image — right side */}
    <div className="relative h-[390px] overflow-hidden rounded-[34px] border border-[#B69A6A]/40 bg-[#1B304B] shadow-[0_30px_80px_rgba(0,0,0,0.38)] xl:h-[430px]">
      <img
        src="/images/hero/luxury-villa.jpg"
        alt="فيلا معمارية فاخرة بإطلالة على المسبح"
        className="h-full w-full object-cover object-center"
      />

  <div className="absolute inset-0 bg-gradient-to-t from-[#101F35]/55 via-transparent to-transparent" />

  <div className="absolute bottom-6 right-7 rounded-xl border border-white/20 bg-[#101F35]/65 px-5 py-3 text-right backdrop-blur-md">
    <span className="block text-xs font-medium text-[#D9C6A2]">
      SHOSHAN PROPERTIES
    </span>
    <span className="mt-1 block text-sm font-bold text-white">
      اكتشف قيمة المكان
    </span>
  </div>

  <div className="absolute right-0 top-10 h-20 w-1 bg-[#B69A6A]" />
</div>

{/* Text — left side */}
<div className="relative z-10 flex flex-col items-start text-right">
  <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#B69A6A]/35 bg-white/[0.04] px-5 py-2.5">
    <span className="h-2 w-2 rounded-full bg-[#B69A6A]" />
    <span className="text-sm font-semibold tracking-wide text-[#D9C6A2]">
      عالم متكامل من الفرص
    </span>
  </div>

  <h1 className="text-[52px] font-extrabold leading-[1.35] tracking-tight text-[#F5F0E7] xl:text-[62px]">
    اكتشف عالمًا
    <br />
    <span className="bg-gradient-to-l from-[#D9C6A2] via-[#F0D9A9] to-[#B69A6A] bg-clip-text text-transparent">
      من الفرص العقارية
    </span>
  </h1>

    <p className="mt-6 max-w-[570px] text-lg font-medium leading-[2] text-[#C5D0DF] xl:text-xl">
    وجهتك لاكتشاف العقارات والمشروعات والفرص الاستثمارية،
    في تجربة متكاملة تجمع الأسواق وتمنحك رؤية أوضح لاتخاذ قرارك.
  </p>

  <div className="mt-9 flex flex-wrap gap-4">
    <a
      href="/properties"
      className="inline-flex min-h-[58px] items-center justify-center rounded-2xl bg-gradient-to-l from-[#B69A6A] to-[#D7BD8D] px-8 text-base font-extrabold text-[#14243A] shadow-[0_12px_30px_rgba(182,154,106,0.2)] transition duration-300 hover:-translate-y-1"
    >
      استكشف العقارات
      <span className="mr-3 text-xl">←</span>
    </a>

    <a
      href="/projects"
      className="inline-flex min-h-[58px] items-center justify-center rounded-2xl border border-[#A9B8C8]/35 bg-white/[0.04] px-8 text-base font-bold text-[#F5F0E7] transition duration-300 hover:border-[#B69A6A] hover:bg-white/[0.08]"
    >
      اكتشف المشروعات
    </a>
  </div>

  <div className="mt-9 h-px w-24 bg-gradient-to-l from-[#B69A6A] to-transparent" />

  <p className="mt-4 text-xs font-medium tracking-[0.18em] text-[#A9B8C8]">
    PROPERTY · PROJECTS · INVESTMENT
  </p>
</div>
</div>
</section>

                        {/* ARCHITECTURAL MARKET & SEARCH PANEL */}
      <div className="relative z-20 -mt-12 overflow-visible sm:-mt-20">


        {/* SHARED FLOATING PANEL */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1500 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="panelShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feGaussianBlur stdDeviation="13" />
            </filter>
            <linearGradient id="panelSurface" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FDFEFF" />
            </linearGradient>
          </defs>

          <path
  d="M0 220 Q750 70 1500 220 L1400 300 L1400 900 L100 900 L100 300 Z"
  fill="#A9CBE8"
  opacity="0.16"
  filter="url(#panelShadow)"
/>

<path
  d="M0 220 Q750 70 1500 220 L1400 300 L1400 900 L100 900 L100 300 Z"
  fill="url(#panelSurface)"
/>

          
        </svg>

        {/* PROPERTY MARKET SELECTOR */}
<MarketSelector />

<HomeSearch
  selectedMarket={selectedMarket}
  marketOptions={marketOptions}
/>
      {/* FEATURED PROPERTIES */}
      <section className="bg-white py-5 sm:py-6">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
          <SectionHeading
            title="عقارات مختارة"
            link="/selected-properties"
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <article
                key={property.title}
                className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${property.image})` }}
                  />

                  <span className="absolute right-4 top-4 rounded-md bg-[#258EE8] px-3 py-2 text-xs font-bold text-[#142B49]">
                    عقار مختار
                  </span>

                  <button
                    type="button"
                    aria-label="إضافة للمفضلة"
                    className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#142B49] shadow-sm transition hover:text-[#258EE8]"
                  >
                    <Heart size={19} strokeWidth={1.8} />
                  </button>
                </div>

                <div className="p-5">
                  <p className="text-xs text-gray-400">
                    {property.location} · {property.type}
                  </p>

                  <h3 className="mt-2 text-lg font-extrabold">
                    {property.title}
                  </h3>

                  <div className="mt-4 flex justify-between text-xs text-gray-500">
                    <span>{property.area} م²</span>
                    <span>{property.bedrooms} غرف</span>
                    <span>{property.bathrooms} حمام</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-[10px] text-gray-400">السعر</p>
                      <p className="mt-1 text-lg font-extrabold text-[#258EE8]">
                        {property.price} ج.م
                      </p>
                    </div>

                    <a
                      href="/properties"
                      className="rounded-md bg-[#142B49] px-4 py-3 text-xs font-bold text-white"
                    >
                      التفاصيل
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESALE MARKET */}
      <section className="relative overflow-hidden bg-[#F4FAFF] py-5 sm:py-6">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="relative mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
          <SectionHeading
            title="سوق إعادة البيع والتنازل"
            link="/resale"
          />
          <p className="mb-4 max-w-3xl text-sm leading-8 text-slate-600">
            قارن بين مبلغ التنازل والمبالغ المتبقية للمطور، واعرف إجمالي ما سيدفعه المشتري.
            لا نعرض مقارنة مع سعر المطور أو نسبة توفير إلا بعد التحقق من السعر ومصدره وتاريخ تحديثه.
          </p>

          <div className="grid gap-4 lg:grid-cols-2">
            {resaleProperties.map((item) => {
              const totalCost = getResaleTotal(item);
              const hasVerifiedDeveloperPrice =
                typeof item.developerPrice === "number" && item.developerPrice > 0;
              const difference = hasVerifiedDeveloperPrice
                ? item.developerPrice! - totalCost
                : null;

              return (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-[26px] border border-sky-100 bg-white shadow-[0_12px_40px_rgba(31,104,160,0.08)]"
                >
                  <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                    <div
                      className="min-h-[230px] bg-cover bg-center sm:min-h-full"
                      style={{ backgroundImage: `url(${item.image})` }}
                      role="img"
                      aria-label={item.title}
                    />
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-[10px] font-bold text-[#258EE8]">
                          فرصة تنازل
                        </span>
                        {item.isDemo && (
                          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-700">
                            بيانات تجريبية
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-lg font-extrabold text-[#142B49]">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-500">{item.project}</p>

                      <div className="mt-5 space-y-3 text-xs">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">المبلغ المطلوب للتنازل</span>
                          <strong className="text-[#142B49]">{formatEGP(item.transfer)}</strong>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">المبلغ المسدد للمطور</span>
                          <strong className="text-[#142B49]">{formatEGP(item.paid)}</strong>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">المتبقي للمطور</span>
                          <strong className="text-[#142B49]">{formatEGP(item.remaining)}</strong>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-sky-100 bg-[#F4FAFF] p-4">
                        <p className="text-[11px] font-semibold text-slate-500">إجمالي تكلفة المشتري التقديرية</p>
                        <p className="mt-1 text-xl font-extrabold text-[#258EE8]">{formatEGP(totalCost)}</p>
                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          مبلغ التنازل + المتبقي للمطور، قبل أي رسوم أو مصروفات أخرى محتملة.
                        </p>
                      </div>

                      <div className="mt-4 rounded-xl border border-dashed border-sky-200 p-3 text-xs">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-slate-500">السعر الحالي لدى المطور</span>
                          <strong className="text-slate-700">
                            {hasVerifiedDeveloperPrice ? formatEGP(item.developerPrice!) : "غير متاح للتحقق"}
                          </strong>
                        </div>
                        {hasVerifiedDeveloperPrice ? (
                          <>
                            <p className={`mt-2 font-bold ${difference! >= 0 ? "text-[#258EE8]" : "text-[#54ADEF]"}`}>
                              {difference! >= 0 ? "أقل من سعر المطور بـ " : "أعلى من سعر المطور بـ "}
                              {formatEGP(Math.abs(difference!))}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-400">
                              المصدر: {item.developerPriceSource} · آخر تحديث: {item.developerPriceUpdatedAt}
                            </p>
                          </>
                        ) : (
                          <p className="mt-2 text-[10px] leading-5 text-slate-400">
                            لن يتم احتساب فرق أو نسبة توفير حتى يتوفر سعر موثق لوحدة مماثلة من المطور.
                          </p>
                        )}
                      </div>

                      <a
                        href="/resale"
                        className="mt-5 block rounded-xl bg-gradient-to-l from-[#258EE8] to-[#48B8F5] px-4 py-3 text-center text-xs font-bold text-white shadow-lg shadow-sky-100 transition hover:-translate-y-0.5"
                      >
                        تفاصيل فرصة التنازل
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-white py-5 sm:py-6">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
          <SectionHeading
            title="المشروعات العقارية"
            link="/projects"
          />

          <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-[#F4FAFF] to-[#EAF7FF] shadow-[0_18px_55px_rgba(31,104,160,0.10)]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-45"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400)",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-l from-[#0B1E3B] via-[#102A56]/75 to-transparent" />

            <div className="relative flex min-h-[230px] flex-col justify-center p-6 sm:min-h-[250px] sm:p-9">

              <h3 className="mt-2 max-w-xl text-2xl font-extrabold leading-relaxed text-[#142B49] sm:text-4xl">
                اكتشف المشروعات العقارية
                <br />
                وفرص التملك والاستثمار
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                استكشف المشروعات والمطورين والوحدات المتاحة ومراحل التنفيذ.
              </p>

              <a
                href="/projects"
                className="mt-4 w-fit rounded-xl bg-gradient-to-l from-[#258EE8] to-[#48B8F5] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-sky-100"
              >
                استكشف المشروعات ←
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MIDDLE COMMERCIAL ADVERTISEMENT + MORTGAGE FINANCE */}
      <section className="bg-white py-5 sm:py-7">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_290px]">
            <a
              href="/advertise"
              className="group relative block min-h-[190px] overflow-hidden rounded-2xl border border-sky-100 bg-[#EAF7FF] shadow-[0_10px_32px_rgba(31,104,160,0.10)] sm:min-h-[225px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#0B1E3B]/85 via-[#102A56]/45 to-transparent" />
              <div className="relative flex min-h-[190px] items-end p-6 sm:min-h-[225px] sm:p-9">
                <div className="text-white">
                  <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                    إعلانك يصل إلى الجمهور المناسب
                  </h2>
                  <p className="mt-2 text-xs text-white/85 sm:text-sm">
                    مساحات إعلانية لمختلف الأنشطة والمنتجات والخدمات
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/mortgage-finance"
              className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-[0_8px_28px_rgba(31,104,160,0.07)] transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg sm:min-h-[225px]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#258EE8]">
                <Landmark size={25} strokeWidth={1.7} />
              </span>
              <h3 className="mt-3 text-base font-extrabold text-[#142B49]">
                قدّم طلب تمويل
              </h3>
              <p className="mt-2 max-w-[210px] text-xs leading-6 text-slate-500">
                ابدأ طلبك وتعرّف على حلول التمويل العقاري المتاحة
              </p>
              <span className="mt-3 text-xs font-bold text-[#258EE8]">
                ابدأ الآن ←
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* STATIC COMMERCIAL ADVERTISEMENT */}
      <section className="bg-white py-2 sm:py-4">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
          <a
            href="/advertise"
            className="group relative block min-h-[92px] overflow-hidden rounded-2xl border border-sky-100 bg-[#F4FAFF] shadow-sm sm:min-h-[118px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(11,30,59,.82), rgba(11,30,59,.35)), url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600)",
              }}
            />
            <div className="relative flex min-h-[92px] items-center justify-center px-5 py-5 text-center sm:min-h-[118px]">
              <div className="text-white">
                <h2 className="mt-1 text-base font-extrabold sm:text-xl">
                  مساحتك الإعلانية على شوشان
                </h2>
              </div>
            </div>
          </a>
        </div>
      </section>

            </div>{/* FOOTER */}
      
      <footer className="bg-[#142B49] pb-8 pt-9 text-white">
        <div className="mx-auto grid max-w-[1500px] gap-7 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
          <div>
            <div className="text-2xl font-extrabold tracking-[3px]">
              SHOSHAN
            </div>

            <div className="mt-1 text-xs tracking-[5px] text-[#54ADEF]">
              PROPERTIES
            </div>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
              سوق عقاري متكامل يجمع الفرص السكنية والتجارية والسياحية
              والاستثمارية في تجربة رقمية واحدة.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold">السوق العقاري</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <a href="/residential">السوق السكني</a>
              <a href="/commercial">السوق التجاري</a>
              <a href="/tourism">السوق السياحي</a>
              <a href="/investment">السوق الاستثماري</a>
              <a href="/resale">إعادة البيع</a>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold">خدمات شوشان</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <a href="/projects">المشروعات العقارية</a>
              <a href="/developers">المطورون العقاريون</a>
              <a href="/companies">الشركات والخدمات</a>
              <a href="/advertise">الإعلانات التجارية</a>
              <a href="/smart-advisor">المستشار الذكي</a>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold">تواصل معنا</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <a href="/about">عن شوشان</a>
              <a href="/contact">اتصل بنا</a>
              <a href="/privacy">سياسة الخصوصية</a>
              <a href="/terms">الشروط والأحكام</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1500px] border-t border-white/10 px-5 pt-7 text-center text-xs text-slate-400 sm:px-8">
          © 2026 SHOSHAN PROPERTIES. جميع الحقوق محفوظة.
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 z-[100] grid h-[70px] w-full grid-cols-5 border-t border-white/10 bg-[#142B49] text-center text-[10px] text-white shadow-[0_-8px_24px_rgba(11,30,59,0.12)] sm:hidden">
        {[
          { icon: HomeIcon, label: "الرئيسية", href: "/" },
          { icon: Search, label: "البحث", href: "/properties" },
          { icon: MapPinned, label: "الخريطة", href: "/map" },
          { icon: Heart, label: "المفضلة", href: "/favorites" },
          { icon: UserRound, label: "حسابي", href: "/login" },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1.5 transition ${
                index === 0
                  ? "text-[#8BD3FF]"
                  : "text-slate-600 hover:text-[#8BD3FF]"
              }`}
            >
              <Icon size={21} strokeWidth={index === 0 ? 2.2 : 1.8} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* GLOBAL FLOATING SMART ADVISOR */}
      <a
        href="/smart-advisor"
        aria-label="افتح المستشار العقاري الذكي"
        title="المستشار العقاري الذكي"
        className="fixed bottom-6 left-6 z-[110] hidden h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#258EE8] to-[#48B8F5] text-white shadow-[0_10px_30px_rgba(37,142,232,0.35)] transition hover:-translate-y-1 hover:shadow-xl sm:flex"
      >
        <Compass size={25} strokeWidth={1.8} />
      </a>
      </div>
    </main>
  );
}