"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import i18n, { SUPPORTED_LANGS } from "@/lib/i18n";
import { Languages, X, Check } from "lucide-react";


const LANGS: { code: (typeof SUPPORTED_LANGS)[number]; label: string }[] = [

  { code: "hi", label: "हिन्दी" },
  { code: "en", label: "English" },
   { code: "bn", label: "বাংলা" },
  // { code: "te", label: "తెలుగు" },
  // { code: "mr", label: "मराठी" },
  // { code: "ta", label: "தமிழ்" },
  // { code: "ur", label: "اردو" },
  // { code: "gu", label: "ગુજરાતી" },
  // { code: "kn", label: "ಕನ್ನಡ" },
  // { code: "ml", label: "മലയാളം" },
  // { code: "or", label: "ଓଡ଼ିଆ" },
  // { code: "pa", label: "ਪੰਜਾਬੀ" },
  // { code: "as", label: "অসমীয়া" },
  // { code: "kok", label: "कोंकणी" },
  // { code: "doi", label: "डोगरी" },
  
];

const STORAGE_KEY = "verdant_lang";

/** Brand words never translate */
function enforceNoTranslateForBrand() {
  document.querySelectorAll<HTMLElement>("[data-verdant-brand]").forEach((el) => {
    el.classList.add("notranslate");
    el.setAttribute("translate", "no");
  });

  document.querySelectorAll<HTMLElement>(".notranslate").forEach((el) => {
    el.setAttribute("translate", "no");
  });
}

function isSupportedLang(x: string): x is (typeof SUPPORTED_LANGS)[number] {
  return (SUPPORTED_LANGS as readonly string[]).includes(x);
}

export default function FloatingLanguageButton() {
  const [open, setOpen] = useState(false);

  // ✅ default Hindi
  const [active, setActive] = useState<(typeof SUPPORTED_LANGS)[number]>(() => {
    const cur = i18n.language || "hi";
    return isSupportedLang(cur) ? cur : "hi";
  });

  const wrapRef = useRef<HTMLDivElement | null>(null);

  const current = useMemo(() => LANGS.find((l) => l.code === active) || LANGS[0], [active]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);


    if (saved && isSupportedLang(saved) && saved !== active) {
      setActive(saved);
      i18n.changeLanguage(saved).catch(() => {});
    } else if (!saved) {

      localStorage.setItem(STORAGE_KEY, "hi");
      if (active !== "hi") {
        setActive("hi");
        i18n.changeLanguage("hi").catch(() => {});
      }
    } else if (saved && !isSupportedLang(saved)) {
  
      localStorage.setItem(STORAGE_KEY, "hi");
      if (active !== "hi") {
        setActive("hi");
        i18n.changeLanguage("hi").catch(() => {});
      }
    }

    enforceNoTranslateForBrand();
   
  }, []);

  useEffect(() => {
    enforceNoTranslateForBrand();
  }, [active]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const changeLang = async (code: (typeof SUPPORTED_LANGS)[number]) => {
    setActive(code);
    localStorage.setItem(STORAGE_KEY, code);
    try {
      await i18n.changeLanguage(code);
    } catch {
      // ignore
    }
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="fixed bottom-5 right-5 z-[9999] select-none" data-no-translate="true">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-3 shadow-lg border border-black/10 hover:bg-white transition"
        aria-label="Change language"
      >
        <Languages className="h-5 w-5" />
        <span className="text-sm font-medium">{current.label}</span>
      </button>

      {open && (
        <div className="mt-3 w-64 overflow-hidden rounded-2xl bg-white shadow-xl border border-black/10">
          <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-black/5">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Language</span>
              <span className="text-xs text-black/60">
                Brand stays same:{" "}
                <span data-verdant-brand className="notranslate" translate="no">
                  Verdant Impact
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 hover:bg-black/5 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 overflow-auto">
            {LANGS.map((l) => {
              const isActiveLang = l.code === active;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => changeLang(l.code)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/5 transition text-left"
                >
                  <span className="text-sm font-medium">{l.label}</span>

                  {isActiveLang ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold">
                      <Check className="h-4 w-4" /> Active
                    </span>
                  ) : (
                    <span className="text-xs text-black/40">Select</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-black/5 text-[11px] text-black/60">
            Tip: wrap brand text with{" "}
            <code className="px-1 py-[2px] rounded bg-black/5">data-verdant-brand</code>
          </div>
        </div>
      )}
    </div>
  );
}