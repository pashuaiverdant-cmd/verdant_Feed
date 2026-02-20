import { useEffect, useMemo, useState } from "react";
import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LangItem = { code: string; label: string };

export function LanguageSwitcher() {
  const languages = useMemo<LangItem[]>(
    () => [
      { code: "en", label: "English" },
      { code: "hi", label: "हिन्दी" },
      { code: "bn", label: "বাংলা" },
      { code: "te", label: "తెలుగు" },
      { code: "mr", label: "मराठी" },
      { code: "ta", label: "தமிழ்" },
      { code: "ur", label: "اردو" },
      { code: "gu", label: "ગુજરાતી" },
      { code: "kn", label: "ಕನ್ನಡ" },
      { code: "ml", label: "മലയാളം" },
      { code: "or", label: "ଓଡ଼ିଆ" },
      { code: "pa", label: "ਪੰਜਾਬੀ" },
      { code: "as", label: "অসমীয়া" },
      { code: "kok", label: "कोंकणी" },
      { code: "doi", label: "डोगरी" },
      { code: "brx", label: "बड़ो" },
      { code: "mni", label: "ꯃꯤꯇꯩꯂꯣꯟ" },
      { code: "ne", label: "नेपाली" },
      { code: "ks", label: "کٲشُر" },
      { code: "mai", label: "मैथिली" },
      { code: "sa", label: "संस्कृतम्" },
      { code: "sat", label: "ᱥᱟᱱᱛᱟᱲᱤ" },
      { code: "sd", label: "سنڌي" }
    ],
    []
  );

  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<string>(i18n.language || "en");

  useEffect(() => {
    setReady(true);
    const onChange = (l: string) => setLang(l || "en");
    i18n.on("languageChanged", onChange);
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, []);

  const onSwitch = async (next: string) => {
    // store user preference
    localStorage.setItem("verdant_lang", next);

    // change language
    await i18n.changeLanguage(next);

    // sync local UI state immediately
    setLang(next);
  };

  return (
    <div className="lang-toggle">
      <select
        className={cn("lang-select")}
        value={lang}
        onChange={(e) => onSwitch(e.target.value)}
        disabled={!ready}
        aria-label="Select language"
        title={!ready ? "Loading..." : "Select language"}
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
