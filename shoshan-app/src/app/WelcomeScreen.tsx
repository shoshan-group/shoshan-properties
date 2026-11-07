"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Building2, MapPin } from "lucide-react";

export default function WelcomeScreen({
  children,
}: {
  children: ReactNode;
}) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const visited = localStorage.getItem("shoshan-welcome-visited");
      setShowWelcome(!visited);
    } catch (error) {
      console.error("Welcome storage error:", error);
      setShowWelcome(true);
    } finally {
      setChecking(false);
    }
  }, []);

  const enterPlatform = () => {
    localStorage.setItem("shoshan-welcome-visited", "true");
    setShowWelcome(false);
  };

  if (checking) {
    return <div className="min-h-screen bg-[#062442]" />;
  }

  if (!showWelcome) {
    return <>{children}</>;
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#062442] px-5 py-10"
    >
      <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#08BBD0]/10 blur-[100px]" />

      <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1250px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0A2D4D] shadow-2xl lg:grid lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center sm:px-12 lg:py-16">
          <img
            src="/shoshan-logo.png"
            alt="SHOSHAN PROPERTIES"
            className="mb-9 w-full max-w-[340px] object-contain"
          />

          <div className="mb-5 flex items-center gap-2 rounded-full border border-[#10BFD0]/30 bg-[#10BFD0]/10 px-4 py-2 text-xs font-semibold text-[#43D5E0]">
            <Building2 size={15} />
            بوابتك إلى عالم العقارات
          </div>

          <h1 className="text-3xl font-extrabold leading-relaxed text-white sm:text-4xl">
            اكتشف فرصتك العقارية
            <span className="block text-[#16C3D2]">
              بثقة ووضوح
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-8 text-slate-300 sm:text-base">
            مرحبًا بك في شوشان العقارية، منصتك المتكاملة لاكتشاف العقارات السكنية
            والتجارية والسياحية والاستثمارية، واستكشاف فرص التملك والاستثمار.
          </p>

          <button
            onClick={enterPlatform}
            className="mt-9 flex min-h-[58px] w-full max-w-[320px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#0789D8] to-[#13C4D2] px-7 text-base font-extrabold text-white shadow-[0_12px_35px_rgba(8,170,210,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            اكتشف العقارات
            <ArrowLeft size={20} />
          </button>

          <p className="mt-6 text-xs text-slate-500">
            SHOSHAN PROPERTIES © 2026
          </p>
        </div>

        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[400px] lg:min-h-[650px]">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600"
            alt="عقار مميز"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#062442]/90 via-[#062442]/15 to-transparent" />

          <div className="absolute bottom-8 right-7 left-7 text-white sm:bottom-12 sm:right-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#42D4E0]">
              <MapPin size={17} />
              اكتشف عالمًا من الفرص
            </div>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              وجهتك العقارية تبدأ من هنا
            </h2>

            <p className="mt-2 text-sm text-white/80">
              سكن · استثمار · مشروعات · إعادة بيع
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}