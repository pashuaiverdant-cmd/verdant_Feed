"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function setGoogleLanguage(lang: "en" | "hi") {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!combo) return;

  combo.value = lang;
  combo.dispatchEvent(new Event("change"));
}

export function GoogleTranslate() {
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  useEffect(() => {
    // ✅ Remove Google top bar + reset layout (runs repeatedly because Google reinjects)
    const cleanup = () => {
      const bannerFrame = document.querySelector(
        "iframe.goog-te-banner-frame"
      ) as HTMLIFrameElement | null;

      if (bannerFrame) bannerFrame.remove();

      const tt = document.getElementById("goog-gt-tt");
      if (tt) tt.remove();

      document.body.style.setProperty("top", "0px", "important");
      document.documentElement.style.setProperty("margin-top", "0px", "important");
      document.documentElement.style.setProperty("top", "0px", "important");
    };

    cleanup();

    const observer = new MutationObserver(() => cleanup());
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const interval = window.setInterval(cleanup, 500);

    // ✅ Load script once
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (!window.google?.translate) return;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // wait for Google to inject select
        setTimeout(() => {
          setReady(true);
          cleanup();
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
        cleanup();
      }, 800);
    }

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  const onSwitch = (next: "en" | "hi") => {
    setLang(next);
    setGoogleLanguage(next);
  };

  return (
    <div className="flex items-center">
      {/* Hidden google widget mount */}
      <div id="google_translate_element" className="hidden" />

      {/* Premium Verdant toggle */}
      <div className="lang-toggle">
        <button
          type="button"
          onClick={() => onSwitch("en")}
          className={cn("lang-btn", lang === "en" && "is-active")}
          aria-pressed={lang === "en"}
          disabled={!ready}
          title={!ready ? "Loading languages..." : "English"}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => onSwitch("hi")}
          className={cn("lang-btn", lang === "hi" && "is-active")}
          aria-pressed={lang === "hi"}
          disabled={!ready}
          title={!ready ? "Loading languages..." : "हिंदी"}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
}
