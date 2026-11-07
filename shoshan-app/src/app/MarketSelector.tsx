"use client";

import { useState } from "react";
import {
  House,
  Building2,
  Palmtree,
  KeyRound,
  ChartNoAxesCombined,
} from "lucide-react";

const markets = [
  { name: "إعادة البيع", icon: KeyRound, color: "#C45D68" },
  { name: "تجاري", icon: Building2, color: "#258EE8" },
  { name: "سكني", icon: House, color: "#398565" },
  { name: "مصايف", icon: Palmtree, color: "#087F8C" },
  { name: "استثماري", icon: ChartNoAxesCombined, color: "#A77B32" },
] as const;

type MarketName = (typeof markets)[number]["name"];

const categories: Record<MarketName, string[]> = {
  "سكني": ["شقق", "فيلات", "عمارات", "كمبوندات"],
  "تجاري": ["محلات", "مكاتب", "عيادات", "مخازن", "مصانع", "أراضٍ تجارية"],
  "مصايف": ["منتجعات", "شاليهات", "فيلات سياحية", "شقق مفروشة"],
  "إعادة البيع": ["عقارات إعادة البيع", "تنازل عن تعاقد", "استلام فوري"],
  "استثماري": ["مبانٍ كاملة", "فرص تطوير", "أصول مدرة للدخل", "أراضٍ استثمارية"],
};

type Props = {
  onChange?: (selection: { market: MarketName; category: string } | null) => void;
};

export default function MarketSelector({ onChange }: Props) {
  const [activeMarket, setActiveMarket] = useState<MarketName | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const activeColor = markets.find((m) => m.name === activeMarket)?.color;
  const panelId = "market-categories-panel";

  return (
    <section dir="rtl" className="bg-white px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {markets.map((market) => {
            const Icon = market.icon;
            const active = activeMarket === market.name;

            return (
              <button
                key={market.name}
                type="button"
                onClick={() => {
                  setActiveMarket(active ? null : market.name);
                  setSelectedCategory("");
                  onChange?.(null);
                }}
                aria-expanded={active}
                aria-controls={panelId}
                className="flex min-h-28 flex-col items-center justify-center gap-2 overflow-visible rounded-2xl border p-2 pt-3 transition-all active:scale-95"
                style={{
                  borderColor: active ? market.color : "#E5EAF0",
                  backgroundColor: active ? `${market.color}12` : "white",
                  color: market.color,
                }}
              >
                <div
  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border box-border p-0"
  style={{
    color: market.color,
    backgroundColor: `${market.color}12`,
    borderColor: `${market.color}25`,
    boxShadow: active
      ? `0 4px 14px ${market.color}25`
      : "0 2px 8px rgba(15, 40, 70, 0.04)",
    transform: active ? "scale(1.08)" : "scale(1)",
  }}
>
  <Icon
  size={29}
  strokeWidth={2}
  className="block m-0"
/>
</div>
                <span className="text-center text-[11px] font-bold leading-tight sm:text-sm">
                  {market.name}
                </span>
              </button>
            );
          })}
        </div>

        {activeMarket && (
          <div
            id={panelId}
            role="group"
            aria-label={`تصنيفات ${activeMarket}`}
            className="mt-4 flex flex-wrap gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            {categories[activeMarket].map((category) => {
              const selected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedCategory(category);
                    onChange?.({ market: activeMarket, category });
                  }}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    selected ? "" : "border-slate-200 bg-white text-slate-600"
                  }`}
                  style={
                    selected && activeColor
                      ? {
                          borderColor: activeColor,
                          backgroundColor: `${activeColor}12`,
                          color: activeColor,
                        }
                      : undefined
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {selectedCategory && (
          <div
            className="mt-3 text-center text-sm font-bold text-slate-600"
            aria-live="polite"
          >
            التصنيف المختار: {selectedCategory}
          </div>
        )}
      </div>
    </section>
  );
}
