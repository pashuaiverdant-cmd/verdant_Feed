import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

/* EN */
import enCommon from "@/locales/en/common.json";

/* INDIAN LANGS */
import hiCommon from "@/locales/hi/common.json";
import bnCommon from "@/locales/bn/common.json";
import teCommon from "@/locales/te/common.json";
import mrCommon from "@/locales/mr/common.json";
import taCommon from "@/locales/ta/common.json";
import urCommon from "@/locales/ur/common.json";
import guCommon from "@/locales/gu/common.json";
import knCommon from "@/locales/kn/common.json";
import mlCommon from "@/locales/ml/common.json";
import orCommon from "@/locales/or/common.json";
import paCommon from "@/locales/pa/common.json";
import asCommon from "@/locales/as/common.json";
import kokCommon from "@/locales/kok/common.json";
import doiCommon from "@/locales/doi/common.json";
import brxCommon from "@/locales/brx/common.json";
import mniCommon from "@/locales/mni/common.json";
import neCommon from "@/locales/ne/common.json";
import ksCommon from "@/locales/ks/common.json";
import maiCommon from "@/locales/mai/common.json";
import saCommon from "@/locales/sa/common.json";
import satCommon from "@/locales/sat/common.json";
import sdCommon from "@/locales/sd/common.json";

export const SUPPORTED_LANGS = [
  "en","hi","bn","te","mr","ta","ur","gu","kn","ml",
  "or","pa","as","kok","doi","brx","mni","ne","ks",
  "mai","sa","sat","sd"
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({

    // ✅ FORCE DEFAULT LANGUAGE = HINDI
    lng: "hi",

    resources: {

      en: { common: enCommon },

      hi: { common: hiCommon },
      bn: { common: bnCommon },
      te: { common: teCommon },
      mr: { common: mrCommon },
      ta: { common: taCommon },
      ur: { common: urCommon },
      gu: { common: guCommon },
      kn: { common: knCommon },
      ml: { common: mlCommon },
      or: { common: orCommon },
      pa: { common: paCommon },
      as: { common: asCommon },
      kok: { common: kokCommon },
      doi: { common: doiCommon },
      brx: { common: brxCommon },
      mni: { common: mniCommon },
      ne: { common: neCommon },
      ks: { common: ksCommon },
      mai: { common: maiCommon },
      sa: { common: saCommon },
      sat: { common: satCommon },
      sd: { common: sdCommon },

    },

    // ✅ fallback also Hindi
    fallbackLng: "hi",

    supportedLngs: [...SUPPORTED_LANGS],

    defaultNS: "common",

    interpolation: {
      escapeValue: false,
    },

    returnEmptyString: false,
    returnNull: false,

    saveMissing: false,

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "verdant_lang",
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;