"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function setGoogleLanguage(lang: string) {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!combo) return;
  combo.value = lang;
  combo.dispatchEvent(new Event("change"));
}

function normalizeTranslateLayout() {
  // Stop layout push
  document.body.style.setProperty("top", "0px", "important");
  document.documentElement.style.setProperty("margin-top", "0px", "important");
  document.documentElement.style.setProperty("top", "0px", "important");
}

/**
 * ✅ Hard-force Google banner into a small Verdant box (inline styles win)
 */
function forceBannerIntoBox() {
  const iframe = document.querySelector("iframe.goog-te-banner-frame") as HTMLIFrameElement | null;
  if (!iframe) return;

  // Make it a compact floating widget
  iframe.style.setProperty("position", "fixed", "important");
  iframe.style.setProperty("top", "72px", "important");      // adjust if navbar height differs
  iframe.style.setProperty("right", "14px", "important");
  iframe.style.setProperty("left", "auto", "important");

  iframe.style.setProperty("width", "360px", "important");
  iframe.style.setProperty("height", "56px", "important");

  iframe.style.setProperty("z-index", "999999", "important");
  iframe.style.setProperty("border-radius", "14px", "important");
  iframe.style.setProperty("overflow", "hidden", "important");
  iframe.style.setProperty("box-shadow", "0 16px 44px rgba(0,0,0,0.18)", "important");
  iframe.style.setProperty("border", "1px solid rgba(0,0,0,0.08)", "important");
  iframe.style.setProperty("transform", "scale(0.96)", "important");
  iframe.style.setProperty("transform-origin", "top right", "important");

  // Mobile behavior (bottom sheet style)
  if (window.matchMedia("(max-width: 640px)").matches) {
    iframe.style.setProperty("top", "auto", "important");
    iframe.style.setProperty("bottom", "12px", "important");
    iframe.style.setProperty("left", "12px", "important");
    iframe.style.setProperty("right", "12px", "important");
    iframe.style.setProperty("width", "auto", "important");
    iframe.style.setProperty("transform", "none", "important");
    iframe.style.setProperty("border-radius", "16px", "important");
  }
}

export function GoogleTranslate() {
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState("en");

  const languages = useMemo(
    () => [
      { code: "en", label: "English" },
      { code: "hi", label: "हिन्दी (Hindi)" },
      { code: "bn", label: "বাংলা (Bengali)" },
      { code: "te", label: "తెలుగు (Telugu)" },
      { code: "mr", label: "मराठी (Marathi)" },
      { code: "ta", label: "தமிழ் (Tamil)" },
      { code: "gu", label: "ગુજરાતી (Gujarati)" },
      { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
      { code: "ml", label: "മലയാളം (Malayalam)" },
      { code: "or", label: "ଓଡ଼ିଆ (Odia)" },
      { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
      { code: "ur", label: "اردو (Urdu)" },
      { code: "as", label: "অসমীয়া (Assamese)" },
      { code: "ne", label: "नेपाली (Nepali)" },
      { code: "sa", label: "संस्कृतम् (Sanskrit)" },
      { code: "sd", label: "سنڌي (Sindhi)" },
      { code: "gom", label: "कोंकणी (Konkani)" },
      { code: "doi", label: "डोगरी (Dogri)" },
      { code: "mai", label: "मैथिली (Maithili)" },
      { code: "bho", label: "भोजपुरी (Bhojpuri)" },
      { code: "mni-Mtei", label: "ꯃꯤꯇꯩꯂꯣꯟ (Manipuri)" },
    ],
    []
  );

  const includedLanguages = useMemo(
    () => Array.from(new Set(languages.map((l) => l.code))).join(","),
    [languages]
  );

  useEffect(() => {
    normalizeTranslateLayout();
    forceBannerIntoBox();

    // Keep fixing layout + banner box (Google keeps re-applying styles)
    const interval = window.setInterval(() => {
      normalizeTranslateLayout();
      forceBannerIntoBox();
    }, 250);

    const observer = new MutationObserver(() => {
      normalizeTranslateLayout();
      forceBannerIntoBox();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Load script once
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (!window.google?.translate) return;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        setTimeout(() => {
          setReady(true);
          normalizeTranslateLayout();
          forceBannerIntoBox();
        }, 800);
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      setTimeout(() => {
        setReady(true);
        normalizeTranslateLayout();
        forceBannerIntoBox();
      }, 500);
    }

    // Also re-apply box style on resize
    const onResize = () => forceBannerIntoBox();
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.removeEventListener("resize", onResize);
    };
  }, [includedLanguages]);

  const onSwitch = (next: string) => {
    setLang(next);

    // cookie fallback
    document.cookie = `googtrans=/en/${next}; path=/`;
    document.cookie = `googtrans=/en/${next}; path=/; domain=${window.location.hostname}`;

    setGoogleLanguage(next);
    setTimeout(() => setGoogleLanguage(next), 600);

    setTimeout(() => {
      normalizeTranslateLayout();
      forceBannerIntoBox();
    }, 50);
  };

  return (
    <div className="flex items-center">
      {/* keep mount alive (your CSS keeps it offscreen) */}
      <div id="google_translate_element" />

      {/* Verdant dropdown */}
      <div className="lang-toggle">
        <select
          className={cn("lang-select")}
          value={lang}
          onChange={(e) => onSwitch(e.target.value)}
          disabled={!ready}
          aria-label="Select language"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
