"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useHomeSearch } from "../hooks/useHomeSearch";
import {
  Search,
  MapPinned,
  SlidersHorizontal,
  PlusCircle,
    X,
  ChevronDown,
  MapPin,
  BedDouble,
  Bath,
  Wallet,
  Ruler,
  Check,
} from "lucide-react";

type MarketOption = {
  value: string;
  label: string;
};

type Props = {
  selectedMarket: string;
  marketOptions: Record<string, MarketOption[]>;
};

export default function HomeSearch({
  selectedMarket,
  marketOptions,
}: Props) {
  const [mounted, setMounted] = useState(false);
  console.log("HOME SEARCH LOADED");

useEffect(() => {
    setMounted(true);
}, []);

  const {
  activePanel,
  setActivePanel,
  openPanel,
  closePanel,
  isOpen,

  operation,
  setOperation,
  propertyType,
  setPropertyType,
  location,
  setLocation,

  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,

  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,

  paymentMethod,
  setPaymentMethod,
  downPayment,
  setDownPayment,
  monthlyPayment,
  setMonthlyPayment,
  installmentYears,
  setInstallmentYears,

  finishing,
  setFinishing,
  delivery,
  setDelivery,
  amenities,
  toggleAmenity,

  currentTypes,
  marketValue,
  installmentEnabled,
  resetFilters,
} = useHomeSearch({ selectedMarket, marketOptions });

  const panelButton =
  "group flex min-h-[34px] min-w-0 items-center justify-between gap-2 rounded-2xl border border-[#DCEBF7] bg-gradient-to-br from-white via-[#F8FBFF] to-[#EFF7FD] px-3 py-0.5 text-right shadow-[0_3px_10px_rgba(37,142,232,0.045),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A9D8F5] hover:shadow-[0_7px_18px_rgba(37,142,232,0.11)] active:translate-y-0";
  const choiceButton = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-sm font-bold transition ${
      active
        ? "border-[#258EE8] bg-sky-50 text-[#0878D9]"
        : "border-sky-100 bg-white text-slate-500 hover:border-sky-300"
    }`;

  const inputStyle =
  "w-full min-w-0 rounded-lg border border-sky-100 bg-[#F6FAFE] px-3 py-2 text-sm text-[#142B49] outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

  const panelTitle =
  "mb-2 text-sm font-extrabold text-[#142B49]";

  
  return (
    <section className="relative z-20 mx-auto -mt-8 max-w-[1500px] px-3 pb-3 pt-1 sm:-mt-12 sm:px-8 sm:pb-12 sm:pt-2 lg:px-12">
      <form
        action="/properties"
        method="get"
        className="relative rounded-2xl border border-sky-100/90 bg-white p-2 shadow-[0_8px_24px_rgba(31,104,160,0.06)] sm:rounded-2xl sm:p-5 lg:p-7"
      >
        <input type="hidden" name="market" value={marketValue} />
        <input type="hidden" name="operation" value={operation} />
        <input type="hidden" name="type" value={propertyType} />
        <input type="hidden" name="location" value={location} />

        <input type="hidden" name="minPrice" value={minPrice} />
        <input type="hidden" name="maxPrice" value={maxPrice} />
        <input type="hidden" name="minArea" value={minArea} />
        <input type="hidden" name="maxArea" value={maxArea} />

        <input type="hidden" name="bedrooms" value={bedrooms} />
        <input type="hidden" name="bathrooms" value={bathrooms} />

        <input type="hidden" name="paymentMethod" value={paymentMethod} />
        <input type="hidden" name="downPayment" value={downPayment} />
        <input type="hidden" name="monthlyPayment" value={monthlyPayment} />
        <input
          type="hidden"
          name="installmentYears"
          value={installmentYears}
        />

        <input type="hidden" name="finishing" value={finishing} />
        <input type="hidden" name="delivery" value={delivery} />

        {amenities.map((item) => (
          <input key={item} type="hidden" name="amenities" value={item} />
        ))}
{/* HEADER */}
<div className="mb-3 flex items-center justify-between gap-3 sm:mb-5">

  <div className="flex items-center gap-2.5">
    <span className="h-7 w-1 rounded-full bg-gradient-to-b from-[#0878D9] to-[#48B8F5]" />

    <h2 className="text-[13px] font-extrabold tracking-tight text-[#142B49] sm:text-[17px]">
      ابحث عن عقارك
    </h2>
  </div>

  <button
  type="button"
  onPointerDown={(event) => {
  console.log("POINTER DOWN:", event.pointerType);
}}
onPointerUp={(event) => {
  console.log("POINTER UP:", event.pointerType);
  openPanel("all");
}}
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel("all");
    }
  }}
  aria-label="فتح الفلاتر"
  title="جميع الفلاتر"
  className="relative z-50 touch-manipulation flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[#DCECF8] bg-gradient-to-br from-white to-[#F0F8FF] text-[#258EE8] shadow-[0_3px_10px_rgba(37,142,232,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#A9D8F5] hover:shadow-[0_6px_15px_rgba(37,142,232,0.14)] sm:h-11 sm:w-11"
>
  <SlidersHorizontal size={20} strokeWidth={1.9} />
</button>

</div>

        {/* MAIN FILTER BAR */}
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2 lg:grid-cols-4">
          <button
  type="button"
  onClick={() => setActivePanel("all")}
  className={`${panelButton} group`}
>
  <span className="flex min-w-0 flex-col gap-1">
    <span className="text-[11px] font-medium text-[#91A1B3]">
      نوع العملية
    </span>

    <span className="truncate text-[15px] font-extrabold text-[#142B49]">
      {operation === "rent"
        ? "إيجار"
        : operation === "resale"
          ? "إعادة بيع / تنازل"
          : "شراء"}
    </span>
  </span>

  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF5FD] text-[#258EE8] transition-all duration-300 group-hover:bg-[#DCEFFF]">
    <ChevronDown size={17} strokeWidth={2.2} />
  </span>
</button>

          <button
            type="button"
            onClick={() => setActivePanel("type")}
            className={panelButton}
          >
            <span>
              <span className="block text-[10px] text-slate-400">
                نوع العقار
              </span>
              <span className="mt-1 block text-sm font-extrabold text-[#142B49]">
                {currentTypes.find((item) => item.value === propertyType)
                  ?.label || "كل العقارات"}
              </span>
            </span>
            <ChevronDown size={17} className="shrink-0 text-[#258EE8]" />
          </button>

          <button
            type="button"
            onClick={() => setActivePanel("location")}
            className={panelButton}
          >
            <span>
              <span className="block text-[10px] text-slate-400">
                الموقع
              </span>
              <span className="mt-1 block truncate text-sm font-extrabold text-[#142B49]">
                {location || "كل المناطق"}
              </span>
            </span>
            <MapPin size={17} className="shrink-0 text-[#258EE8]" />
          </button>

          <button
            type="button"
            onClick={() => setActivePanel("price")}
            className={panelButton}
          >
            <span>
              <span className="block text-[10px] text-slate-400">
                نطاق السعر
              </span>
              <span className="mt-1 block text-sm font-extrabold text-[#142B49]">
                {minPrice || maxPrice
                  ? "تم تحديد السعر"
                  : "كل الأسعار"}
              </span>
            </span>
            <Wallet size={17} className="shrink-0 text-[#258EE8]" />
          </button>

          
        </div>

        {/* SEARCH BUTTON */}
<div className="mt-3 flex flex-col gap-3 border-t border-sky-50 pt-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5">
  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-xs font-bold text-[#52677E]">
    <a
      href="/map"
      className="flex items-center gap-2 transition hover:text-[#258EE8]"
    >
      <MapPinned size={17} strokeWidth={1.8} className="text-[#258EE8]" />
      البحث بالخريطة
    </a>

   

    <a
      href="/property-request"
      className="flex items-center gap-2 transition hover:text-[#258EE8]"
    >
      <PlusCircle size={17} strokeWidth={1.8} className="text-[#258EE8]" />
      اطلب عقارك
    </a>
  </div>

  <button
    type="submit"
    className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#0878D9] to-[#48B8F5] px-6 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(37,142,232,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,142,232,0.30)] sm:w-auto sm:rounded-2xl sm:px-8 sm:py-4"
  >
    <Search size={19} />
    بحث عن عقار
  </button>
</div>

          
      </form>

      {/* FILTER OVERLAY */}
{mounted && activePanel !== "" && createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0B1E3B]/45 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={() => setActivePanel("")}
    >
      <div
        dir="rtl"
        className="max-h-[88vh] w-full max-w-xl overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
            {/* PANEL HEADER */}
            <div className="flex items-center justify-between border-b border-sky-50 px-5 py-4">
              <h3 className="text-lg font-extrabold text-[#142B49]">
                {activePanel === "operation"
                  ? "نوع العملية"
                  : activePanel === "type"
                    ? "نوع العقار"
                    : activePanel === "location"
                      ? "حدد الموقع"
                      : activePanel === "price"
                        ? "نطاق السعر"
                        : "جميع الفلاتر"}
              </h3>

              <button
                type="button"
                onClick={() => setActivePanel("")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-sky-50 hover:text-[#258EE8]"
                aria-label="إغلاق"
              >
                <X size={19} />
              </button>
            </div>

            {/* PANEL CONTENT */}
            <div className="max-h-[65vh] space-y-6 overflow-y-auto p-5">
              {(isOpen("operation") || isOpen("all")) && (
                <div>
                  <h4 className={panelTitle}>نوع العملية</h4>
                  <div className="flex flex-wrap gap-2">
                    {(
                      selectedMarket === "إعادة البيع"
                        ? [{ value: "resale", label: "إعادة بيع / تنازل" }]
                        : [
                            { value: "sale", label: "شراء" },
                            { value: "rent", label: "إيجار" },
                          ]
                    ).map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setOperation(item.value)}
                        className={choiceButton(operation === item.value)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(isOpen("type") || isOpen("all")) && (
                <div>
                  <h4 className={panelTitle}>نوع العقار</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setPropertyType("")}
                      className={choiceButton(propertyType === "")}
                    >
                      كل الأنواع
                    </button>

                    {currentTypes.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setPropertyType(item.value)}
                        className={choiceButton(
                          propertyType === item.value
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(isOpen("location") || isOpen("all")) && (
                <div>
                  <h4 className={panelTitle}>الموقع</h4>
                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="اكتب المدينة أو المنطقة"
                    className={inputStyle}
                  />
                </div>
              )}

              {(isOpen("price") || isOpen("all")) && (
                <div>
                  <h4 className={panelTitle}>نطاق السعر</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min="0"
                      value={minPrice}
                      onChange={(event) => setMinPrice(event.target.value)}
                      placeholder="أقل سعر"
                      className={inputStyle}
                    />
                    <input
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(event.target.value)}
                      placeholder="أعلى سعر"
                      className={inputStyle}
                    />
                  </div>
                </div>
              )}

              {isOpen("all") && (
                <>
                  <div>
                    <h4 className={panelTitle}>عدد الغرف</h4>
                    <div className="flex flex-wrap gap-2">
                      {["الكل", "1", "2", "3", "4", "5+"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setBedrooms(item)}
                          className={choiceButton(bedrooms === item)}
                        >
                          {item === "الكل" ? item : `${item} غرف`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={panelTitle}>عدد الحمامات</h4>
                    <div className="flex flex-wrap gap-2">
                      {["الكل", "1", "2", "3", "4+"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setBathrooms(item)}
                          className={choiceButton(bathrooms === item)}
                        >
                          {item === "الكل" ? item : `${item} حمام`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={panelTitle}>المساحة بالمتر المربع</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        min="0"
                        value={minArea}
                        onChange={(event) => setMinArea(event.target.value)}
                        placeholder="أقل مساحة"
                        className={inputStyle}
                      />
                      <input
                        type="number"
                        min="0"
                        value={maxArea}
                        onChange={(event) => setMaxArea(event.target.value)}
                        placeholder="أعلى مساحة"
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className={panelTitle}>طريقة الدفع</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "الكل",
                        "نقدي فقط",
                        "تقسيط فقط",
                        "نقدي أو تقسيط",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setPaymentMethod(item)}
                          className={choiceButton(paymentMethod === item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {installmentEnabled && (
                    <div className="space-y-4 rounded-2xl border border-sky-100 bg-[#F8FCFF] p-4">
                      <h4 className={panelTitle}>تفاصيل التقسيط</h4>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-500">
                          مقدم الدفع
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={downPayment}
                          onChange={(event) =>
                            setDownPayment(event.target.value)
                          }
                          placeholder="المقدم بالجنيه"
                          className={inputStyle}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-500">
                          القسط الشهري
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={monthlyPayment}
                          onChange={(event) =>
                            setMonthlyPayment(event.target.value)
                          }
                          placeholder="القسط الشهري بالجنيه"
                          className={inputStyle}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-500">
                          مدة التقسيط
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["الكل", "1", "2", "3", "4", "5", "6", "7", "8", "10"].map(
                            (item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => setInstallmentYears(item)}
                                className={choiceButton(
                                  installmentYears === item
                                )}
                              >
                                {item === "الكل" ? item : `${item} سنوات`}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className={panelTitle}>التشطيب</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "الكل",
                        "بدون تشطيب",
                        "نصف تشطيب",
                        "تشطيب كامل",
                        "سوبر لوكس",
                        "فاخر",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setFinishing(item)}
                          className={choiceButton(finishing === item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={panelTitle}>موعد الاستلام</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "الكل",
                        "استلام فوري",
                        "خلال 3 أشهر",
                        "خلال 6 أشهر",
                        "خلال سنة",
                        "على المحارة",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setDelivery(item)}
                          className={choiceButton(delivery === item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={panelTitle}>مميزات العقار</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "مصعد",
                        "جراج",
                        "حديقة",
                        "حمام سباحة",
                        "أمن وحراسة",
                        "تكييف مركزي",
                        "إطلالة مميزة",
                        "قريب من الخدمات",
                      ].map((item) => {
                        const active = amenities.includes(item);

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleAmenity(item)}
                            className={choiceButton(active)}
                          >
                            {active && (
                              <Check size={14} className="ml-1 inline" />
                            )}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* PANEL FOOTER */}
            <div className="flex items-center justify-between gap-3 border-t border-sky-50 bg-white p-4">
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-3 text-xs font-bold text-slate-400 transition hover:text-red-500"
              >
                مسح الاختيارات
              </button>

              <button
                type="button"
                onClick={() => setActivePanel("")}
                className="flex-1 rounded-xl bg-gradient-to-l from-[#0878D9] to-[#48B8F5] px-5 py-3 text-sm font-extrabold text-white"
              >
                تطبيق الاختيارات
              </button>
            </div>
                   </div>
        </div>,
        document.body
      )}
    </section>
  );
}