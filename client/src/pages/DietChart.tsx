import React, { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Leaf,
  Wheat,
  Pill,
  CircleDot,
  ArrowLeft,
  Languages,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import { useTranslation } from "react-i18next";

type DietFormData = {
  lang: "hi" | "en";
  name: string;
  contact: string;
  cattleType: "Cow" | "Buffalo" | "Goat";
  breed: string; // can be key (gir) OR label (Gir — Gujarat) OR legacy (Gir)
  breedRegion?: string;
  weightCategory: string;
  age: number;
  healthStatus: "Healthy" | "Sick" | "Pregnant";
  tagged: "Yes" | "No";
};

type DietChart = {
  greenFodderKgPerDay: number;
  dryFodderKgPerDay: number;
  concentrateKgPerDay: number;
  mineralMixGPerDay: number;
  saltGPerDay: number;
  waterLPerDay: number;
  feedingSchedule: { time: string; items: string[] }[];
  notes: string[];
  targetDMKg?: number;
  crudeProteinG?: number;
  energyMJ?: number;
};

type BreedPreset = {
  profile: "high_dairy" | "dairy" | "dual" | "meat";
  base: DietChart;
  dm: { green: number; dry: number; conc: number };
  cp: { green: number; dry: number; conc: number };
  regionHint?: string;
};

function round(n: number) {
  return Math.round(n * 100) / 100;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

type TFn = (key: string, fallback: string, options?: any) => string;

function baseCattle(
  tt: TFn,
  green: number,
  dry: number,
  conc: number,
  minerals: number,
  salt: number,
  water: number
): DietChart {
  return {
    greenFodderKgPerDay: green,
    dryFodderKgPerDay: dry,
    concentrateKgPerDay: conc,
    mineralMixGPerDay: minerals,
    saltGPerDay: salt,
    waterLPerDay: water,
    feedingSchedule: [
      {
        time: tt("dietChart.schedule.time.morning", "Morning (6–8 AM)"),
        items: [
          tt("dietChart.schedule.item.green50", "Green fodder (50%)"),
          tt("dietChart.schedule.item.conc50", "Concentrate (50%)"),
          tt("dietChart.schedule.item.water", "Fresh water"),
        ],
      },
      {
        time: tt("dietChart.schedule.time.afternoon", "Afternoon (12–2 PM)"),
        items: [
          tt("dietChart.schedule.item.dry50", "Dry fodder (50%)"),
          tt("dietChart.schedule.item.water", "Fresh water"),
        ],
      },
      {
        time: tt("dietChart.schedule.time.evening", "Evening (4–6 PM)"),
        items: [
          tt("dietChart.schedule.item.green50", "Green fodder (50%)"),
          tt("dietChart.schedule.item.conc50", "Concentrate (50%)"),
          tt("dietChart.schedule.item.mineralSalt", "Mineral mixture + salt"),
          tt("dietChart.schedule.item.water", "Fresh water"),
        ],
      },
    ],
    notes: [],
  };
}

function baseGoat(
  tt: TFn,
  green: number,
  dry: number,
  conc: number,
  minerals: number,
  salt: number,
  water: number
): DietChart {
  return {
    greenFodderKgPerDay: green,
    dryFodderKgPerDay: dry,
    concentrateKgPerDay: conc,
    mineralMixGPerDay: minerals,
    saltGPerDay: salt,
    waterLPerDay: water,
    feedingSchedule: [
      {
        time: tt("dietChart.schedule.time.goatMorning", "Morning (7–9 AM)"),
        items: [
          tt("dietChart.schedule.item.green", "Green fodder"),
          tt("dietChart.schedule.item.conc", "Concentrate"),
          tt("dietChart.schedule.item.water", "Fresh water"),
        ],
      },
      {
        time: tt("dietChart.schedule.time.goatEvening", "Evening (5–7 PM)"),
        items: [
          tt("dietChart.schedule.item.dry", "Dry fodder"),
          tt("dietChart.schedule.item.mineralSalt", "Mineral mixture + salt"),
          tt("dietChart.schedule.item.water", "Fresh water"),
        ],
      },
    ],
    notes: [],
  };
}

/**
 * ✅ i18n breed helpers
 * - supports URL having: key (gir) OR legacy label (Gir) OR full label (Gir — Gujarat)
 * - display always uses t("dietPlanner.form.breeds...") with fallback
 */
function breedKeyForType(cattleType: DietFormData["cattleType"]) {
  if (cattleType === "Cow") return "cow";
  if (cattleType === "Buffalo") return "buffalo";
  return "goat";
}

function normalizeStr(s: string) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[_\s-]+/g, "");
}

function buildBreedReverseIndex(tt: TFn) {
  // Keys must match your i18n JSON keys exactly
  const cowKeys = [
    "gir",
    "sahiwal",
    "tharparkar",
    "redSindhi",
    "rathi",
    "hariana",
    "kankrej",
    "ongole",
    "deoni",
    "kangayam",
    "hallikar",
    "gaolao",
    "khillari",
    "vechur",
    "punganur",
    "dangi",
    "nagori",
    "other",
  ] as const;

  const buffaloKeys = [
    "murrah",
    "mehsana",
    "jaffarabadi",
    "surti",
    "bhadawari",
    "nagpuri",
    "niliRavi",
    "pandharpuri",
    "toda",
    "chilika",
    "other",
  ] as const;

  const goatKeys = [
    "jamunapari",
    "beetal",
    "barbari",
    "sirohi",
    "blackBengal",
    "osmanabadi",
    "malabari",
    "jakhrana",
    "gaddi",
    "marwari",
    "zalawadi",
    "sangamneri",
    "surti",
    "changthangi",
    "chegu",
    "other",
  ] as const;

  const index: Record<"cow" | "buffalo" | "goat", Record<string, string>> = {
    cow: {},
    buffalo: {},
    goat: {},
  };

  const add = (type: "cow" | "buffalo" | "goat", key: string, labelFallback: string) => {
    // match by key itself
    index[type][normalizeStr(key)] = key;

    // match by localized label
    const label = tt(`dietPlanner.form.breeds.${type}.${key}`, labelFallback);
    index[type][normalizeStr(label)] = key;

    // match by legacy english-ish title if present in params (e.g., "Gir", "Red Sindhi")
    // (basic: use fallback before dash, if any)
    const legacy = labelFallback.split("—")[0].trim();
    if (legacy) index[type][normalizeStr(legacy)] = key;

    // also map common spacing variants
    index[type][normalizeStr(labelFallback)] = key;
  };

  // Cow
  add("cow", "gir", "Gir — Gujarat");
  add("cow", "sahiwal", "Sahiwal — Punjab/Haryana");
  add("cow", "tharparkar", "Tharparkar — Rajasthan");
  add("cow", "redSindhi", "Red Sindhi — North/West India");
  add("cow", "rathi", "Rathi — Rajasthan");
  add("cow", "hariana", "Hariana — Haryana");
  add("cow", "kankrej", "Kankrej — Gujarat/Rajasthan");
  add("cow", "ongole", "Ongole — Andhra Pradesh");
  add("cow", "deoni", "Deoni — MH/KA");
  add("cow", "kangayam", "Kangayam — Tamil Nadu");
  add("cow", "hallikar", "Hallikar — Karnataka");
  add("cow", "gaolao", "Gaolao — MP/MH");
  add("cow", "khillari", "Khillari — MH/KA");
  add("cow", "vechur", "Vechur — Kerala");
  add("cow", "punganur", "Punganur — Andhra Pradesh");
  add("cow", "dangi", "Dangi — Maharashtra");
  add("cow", "nagori", "Nagori — Rajasthan");
  add("cow", "other", "Other — (any region)");

  // Buffalo
  add("buffalo", "murrah", "Murrah — Haryana/Punjab");
  add("buffalo", "mehsana", "Mehsana — Gujarat");
  add("buffalo", "jaffarabadi", "Jaffarabadi — Gujarat");
  add("buffalo", "surti", "Surti — Gujarat");
  add("buffalo", "bhadawari", "Bhadawari — UP/MP");
  add("buffalo", "nagpuri", "Nagpuri — Maharashtra");
  add("buffalo", "niliRavi", "Nili Ravi — Punjab");
  add("buffalo", "pandharpuri", "Pandharpuri — Maharashtra");
  add("buffalo", "toda", "Toda — Tamil Nadu (Nilgiri)");
  add("buffalo", "chilika", "Chilika — Odisha");
  add("buffalo", "other", "Other — (any region)");

  // Goat
  add("goat", "jamunapari", "Jamunapari — Uttar Pradesh");
  add("goat", "beetal", "Beetal — Punjab");
  add("goat", "barbari", "Barbari — Uttar Pradesh");
  add("goat", "sirohi", "Sirohi — Rajasthan");
  add("goat", "blackBengal", "Black Bengal — West Bengal");
  add("goat", "osmanabadi", "Osmanabadi — Maharashtra");
  add("goat", "malabari", "Malabari (Kannur) — Kerala");
  add("goat", "jakhrana", "Jakhrana — Rajasthan");
  add("goat", "gaddi", "Gaddi — Himachal Pradesh");
  add("goat", "marwari", "Marwari — Rajasthan");
  add("goat", "zalawadi", "Zalawadi — Gujarat");
  add("goat", "sangamneri", "Sangamneri — Maharashtra");
  add("goat", "surti", "Surti — Gujarat");
  add("goat", "changthangi", "Changthangi — Ladakh");
  add("goat", "chegu", "Chegu — Himachal/J&K");
  add("goat", "other", "Other — (any region)");

  return index;
}

function resolveBreedKey(
  cattleType: DietFormData["cattleType"],
  breedRaw: string,
  tt: TFn
) {
  const type = breedKeyForType(cattleType);
  const idx = buildBreedReverseIndex(tt);
  const norm = normalizeStr(breedRaw);
  return idx[type][norm] || "other";
}

function breedLabel(
  cattleType: DietFormData["cattleType"],
  breedRaw: string,
  tt: TFn
) {
  const type = breedKeyForType(cattleType);
  const key = resolveBreedKey(cattleType, breedRaw, tt);

  const fallback =
    type === "cow"
      ? ({
          gir: "Gir — Gujarat",
          sahiwal: "Sahiwal — Punjab/Haryana",
          tharparkar: "Tharparkar — Rajasthan",
          redSindhi: "Red Sindhi — North/West India",
          rathi: "Rathi — Rajasthan",
          hariana: "Hariana — Haryana",
          kankrej: "Kankrej — Gujarat/Rajasthan",
          ongole: "Ongole — Andhra Pradesh",
          deoni: "Deoni — MH/KA",
          kangayam: "Kangayam — Tamil Nadu",
          hallikar: "Hallikar — Karnataka",
          gaolao: "Gaolao — MP/MH",
          khillari: "Khillari — MH/KA",
          vechur: "Vechur — Kerala",
          punganur: "Punganur — Andhra Pradesh",
          dangi: "Dangi — Maharashtra",
          nagori: "Nagori — Rajasthan",
          other: "Other — (any region)",
        } as Record<string, string>)[key]
      : type === "buffalo"
      ? ({
          murrah: "Murrah — Haryana/Punjab",
          mehsana: "Mehsana — Gujarat",
          jaffarabadi: "Jaffarabadi — Gujarat",
          surti: "Surti — Gujarat",
          bhadawari: "Bhadawari — UP/MP",
          nagpuri: "Nagpuri — Maharashtra",
          niliRavi: "Nili Ravi — Punjab",
          pandharpuri: "Pandharpuri — Maharashtra",
          toda: "Toda — Tamil Nadu (Nilgiri)",
          chilika: "Chilika — Odisha",
          other: "Other — (any region)",
        } as Record<string, string>)[key]
      : ({
          jamunapari: "Jamunapari — Uttar Pradesh",
          beetal: "Beetal — Punjab",
          barbari: "Barbari — Uttar Pradesh",
          sirohi: "Sirohi — Rajasthan",
          blackBengal: "Black Bengal — West Bengal",
          osmanabadi: "Osmanabadi — Maharashtra",
          malabari: "Malabari (Kannur) — Kerala",
          jakhrana: "Jakhrana — Rajasthan",
          gaddi: "Gaddi — Himachal Pradesh",
          marwari: "Marwari — Rajasthan",
          zalawadi: "Zalawadi — Gujarat",
          sangamneri: "Sangamneri — Maharashtra",
          surti: "Surti — Gujarat",
          changthangi: "Changthangi — Ladakh",
          chegu: "Chegu — Himachal/J&K",
          other: "Other — (any region)",
        } as Record<string, string>)[key];

  return tt(`dietPlanner.form.breeds.${type}.${key}`, fallback || breedRaw || "Other");
}

function getBreedPreset(data: DietFormData, tt: TFn): BreedPreset {
  const { cattleType } = data;
  const breedKey = resolveBreedKey(cattleType, data.breed, tt);

  const cattleDM = { green: 0.2, dry: 0.9, conc: 0.9 };
  const goatDM = { green: 0.22, dry: 0.9, conc: 0.9 };

  const cattleCP = { green: 35, dry: 55, conc: 180 };
  const dairyCattleCP = { green: 40, dry: 60, conc: 200 };
  const goatCP = { green: 45, dry: 60, conc: 170 };

  // ✅ Use i18n keys (matches your JSON)
  const cow: Record<string, BreedPreset> = {
    gir: { profile: "dairy", base: baseCattle(tt, 26, 6.5, 6.0, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP, regionHint: "Gujarat" },
    sahiwal: { profile: "high_dairy", base: baseCattle(tt, 25, 6.0, 6.3, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP, regionHint: "Punjab/Haryana" },
    tharparkar: { profile: "dual", base: baseCattle(tt, 26, 7.0, 5.6, 65, 30, 100), dm: cattleDM, cp: cattleCP, regionHint: "Rajasthan" },
    redSindhi: { profile: "dairy", base: baseCattle(tt, 25, 6.0, 6.0, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP, regionHint: "North/West India" },
    rathi: { profile: "dairy", base: baseCattle(tt, 24, 6.0, 5.8, 65, 30, 100), dm: cattleDM, cp: dairyCattleCP, regionHint: "Rajasthan" },
    hariana: { profile: "dual", base: baseCattle(tt, 24, 7.0, 5.2, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Haryana" },
    kankrej: { profile: "dual", base: baseCattle(tt, 25, 7.0, 5.4, 65, 30, 100), dm: cattleDM, cp: cattleCP, regionHint: "Gujarat/Rajasthan" },
    ongole: { profile: "dual", base: baseCattle(tt, 25, 7.0, 5.2, 65, 30, 100), dm: cattleDM, cp: cattleCP, regionHint: "Andhra Pradesh" },
    deoni: { profile: "dual", base: baseCattle(tt, 24, 6.5, 5.3, 65, 30, 98), dm: cattleDM, cp: cattleCP, regionHint: "MH/KA" },
    kangayam: { profile: "dual", base: baseCattle(tt, 24, 7.0, 5.1, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Tamil Nadu" },
    hallikar: { profile: "dual", base: baseCattle(tt, 24, 7.0, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Karnataka" },
    gaolao: { profile: "dual", base: baseCattle(tt, 24, 6.8, 5.1, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "MP/MH" },
    khillari: { profile: "dual", base: baseCattle(tt, 24, 7.0, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "MH/KA" },
    vechur: { profile: "dairy", base: baseCattle(tt, 18, 4.5, 3.5, 50, 25, 70), dm: cattleDM, cp: dairyCattleCP, regionHint: "Kerala" },
    punganur: { profile: "dairy", base: baseCattle(tt, 16, 4.0, 3.2, 45, 25, 65), dm: cattleDM, cp: dairyCattleCP, regionHint: "Andhra Pradesh" },
    dangi: { profile: "dual", base: baseCattle(tt, 23, 6.8, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Maharashtra" },
    nagori: { profile: "dual", base: baseCattle(tt, 23, 7.0, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Rajasthan" },
    other: { profile: "dual", base: baseCattle(tt, 24, 6.5, 5.4, 65, 30, 100), dm: cattleDM, cp: cattleCP },
  };

  const buffalo: Record<string, BreedPreset> = {
    murrah: { profile: "high_dairy", base: baseCattle(tt, 30, 8.0, 7.2, 75, 30, 125), dm: cattleDM, cp: dairyCattleCP, regionHint: "Haryana/Punjab" },
    mehsana: { profile: "dairy", base: baseCattle(tt, 29, 7.5, 6.8, 75, 30, 120), dm: cattleDM, cp: dairyCattleCP, regionHint: "Gujarat" },
    jaffarabadi: { profile: "dual", base: baseCattle(tt, 31, 8.5, 6.6, 75, 30, 125), dm: cattleDM, cp: cattleCP, regionHint: "Gujarat" },
    surti: { profile: "dairy", base: baseCattle(tt, 28, 7.0, 6.4, 70, 30, 115), dm: cattleDM, cp: dairyCattleCP, regionHint: "Gujarat" },
    bhadawari: { profile: "dairy", base: baseCattle(tt, 28, 7.5, 6.6, 70, 30, 120), dm: cattleDM, cp: dairyCattleCP, regionHint: "UP/MP" },
    nagpuri: { profile: "dual", base: baseCattle(tt, 28, 7.5, 6.0, 70, 30, 115), dm: cattleDM, cp: cattleCP, regionHint: "Maharashtra" },
    niliRavi: { profile: "high_dairy", base: baseCattle(tt, 30, 8.0, 7.0, 75, 30, 125), dm: cattleDM, cp: dairyCattleCP, regionHint: "Punjab" },
    pandharpuri: { profile: "dual", base: baseCattle(tt, 29, 8.0, 6.2, 70, 30, 120), dm: cattleDM, cp: cattleCP, regionHint: "Maharashtra" },
    toda: { profile: "dual", base: baseCattle(tt, 26, 7.0, 5.6, 65, 30, 110), dm: cattleDM, cp: cattleCP, regionHint: "Tamil Nadu" },
    chilika: { profile: "dual", base: baseCattle(tt, 27, 7.2, 5.8, 65, 30, 112), dm: cattleDM, cp: cattleCP, regionHint: "Odisha" },
    other: { profile: "dual", base: baseCattle(tt, 28, 7.5, 6.4, 70, 30, 120), dm: cattleDM, cp: cattleCP },
  };

  const goat: Record<string, BreedPreset> = {
    jamunapari: { profile: "high_dairy", base: baseGoat(tt, 3.2, 1.2, 0.95, 35, 10, 12), dm: goatDM, cp: goatCP, regionHint: "Uttar Pradesh" },
    beetal: { profile: "dual", base: baseGoat(tt, 3.0, 1.1, 0.9, 35, 10, 12), dm: goatDM, cp: goatCP, regionHint: "Punjab" },
    barbari: { profile: "dairy", base: baseGoat(tt, 2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Uttar Pradesh" },
    sirohi: { profile: "dual", base: baseGoat(tt, 3.0, 1.1, 0.88, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Rajasthan" },
    blackBengal: { profile: "meat", base: baseGoat(tt, 2.6, 1.0, 0.78, 28, 10, 11), dm: goatDM, cp: goatCP, regionHint: "West Bengal" },
    osmanabadi: { profile: "meat", base: baseGoat(tt, 2.8, 1.0, 0.82, 28, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Maharashtra" },
    malabari: { profile: "dual", base: baseGoat(tt, 2.9, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Kerala" },
    jakhrana: { profile: "dairy", base: baseGoat(tt, 3.1, 1.1, 0.92, 35, 10, 12), dm: goatDM, cp: goatCP, regionHint: "Rajasthan" },
    gaddi: { profile: "dual", base: baseGoat(tt, 2.9, 1.0, 0.86, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Himachal" },
    marwari: { profile: "meat", base: baseGoat(tt, 2.8, 1.0, 0.84, 28, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Rajasthan" },
    zalawadi: { profile: "dual", base: baseGoat(tt, 2.9, 1.0, 0.86, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Gujarat" },
    sangamneri: { profile: "dual", base: baseGoat(tt, 2.9, 1.0, 0.86, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Maharashtra" },
    surti: { profile: "dual", base: baseGoat(tt, 2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Gujarat" },
    changthangi: { profile: "meat", base: baseGoat(tt, 2.7, 1.0, 0.82, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Ladakh" },
    chegu: { profile: "meat", base: baseGoat(tt, 2.8, 1.0, 0.83, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Himachal/J&K" },
    other: { profile: "dual", base: baseGoat(tt, 2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP },
  };

  if (cattleType === "Cow") return cow[breedKey] ?? cow.other;
  if (cattleType === "Buffalo") return buffalo[breedKey] ?? buffalo.other;
  return goat[breedKey] ?? goat.other;
}

function applyAdjustments(
  base: DietChart,
  data: DietFormData,
  preset: BreedPreset,
  tt: TFn
): DietChart {
  const chart = deepClone(base);
  const { cattleType, weightCategory, healthStatus } = data;

  if (cattleType !== "Goat") {
    if (weightCategory === "0-300kg") chart.concentrateKgPerDay += 0.5;
    if (weightCategory === "400-500kg") chart.concentrateKgPerDay += 1.0;
  } else {
    if (weightCategory === "20-50kg") chart.concentrateKgPerDay += 0.1;
    if (weightCategory === "80-120kg") chart.concentrateKgPerDay += 0.2;
  }

  if (preset.profile === "high_dairy") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 1.1);
    chart.mineralMixGPerDay += cattleType === "Goat" ? 5 : 10;
    chart.notes.push(tt("dietChart.notes.highDairy", "High dairy: higher concentrate + minerals."));
  } else if (preset.profile === "dairy") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 1.05);
    chart.notes.push(tt("dietChart.notes.dairy", "Dairy: slightly higher concentrate."));
  } else if (preset.profile === "meat") {
    chart.notes.push(tt("dietChart.notes.meat", "Meat type: balanced energy with moderate roughage."));
  } else {
    chart.notes.push(tt("dietChart.notes.dual", "Dual purpose: balanced roughage + concentrate."));
  }

  if (healthStatus === "Sick") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 0.9);
    chart.notes.push(
      tt(
        "dietChart.notes.sick",
        "Sick: soft green fodder, avoid sudden feed changes. Vet advice recommended."
      )
    );
  }

  if (healthStatus === "Pregnant") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * (cattleType === "Goat" ? 1.12 : 1.1));
    chart.mineralMixGPerDay += cattleType === "Goat" ? 10 : 15;
    chart.greenFodderKgPerDay = round(chart.greenFodderKgPerDay * (cattleType === "Goat" ? 1.05 : 1.03));
    chart.notes.push(
      tt(
        "dietChart.notes.pregnant",
        "Pregnant: higher energy/protein + minerals (consult vet for trimester-specific plan)."
      )
    );
  }

  const dmKg =
    chart.greenFodderKgPerDay * preset.dm.green +
    chart.dryFodderKgPerDay * preset.dm.dry +
    chart.concentrateKgPerDay * preset.dm.conc;

  const cpG =
    chart.greenFodderKgPerDay * preset.cp.green +
    chart.dryFodderKgPerDay * preset.cp.dry +
    chart.concentrateKgPerDay * preset.cp.conc;

  const energyMJ =
    chart.greenFodderKgPerDay * 2 +
    chart.dryFodderKgPerDay * 6 +
    chart.concentrateKgPerDay * 12;

  chart.targetDMKg = round(dmKg);
  chart.crudeProteinG = Math.round(cpG);
  chart.energyMJ = round(energyMJ);

  chart.greenFodderKgPerDay = round(chart.greenFodderKgPerDay);
  chart.dryFodderKgPerDay = round(chart.dryFodderKgPerDay);
  chart.concentrateKgPerDay = round(chart.concentrateKgPerDay);

  return chart;
}

const MotionWrap = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay }}
  >
    {children}
  </motion.div>
);

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-border p-2 bg-background">{icon}</div>
        <span className="text-muted-foreground">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default function DietChartPage() {
  const { t: i18t, i18n } = useTranslation();
  const [, setLocation] = useLocation();

  const params = new URLSearchParams(window.location.search);
  const langParam = (params.get("lang") || "hi") as "hi" | "en";

  // helper: always provide fallback
  const tt: TFn = (key, fallback, options) => i18t(key, fallback, options);

  useEffect(() => {
    if (langParam === "hi" || langParam === "en") {
      i18n.changeLanguage(langParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langParam]);

  const formData: DietFormData = {
    lang: langParam,
    name: params.get("name") || "",
    contact: params.get("contact") || "",
    cattleType: (params.get("cattleType") || "") as DietFormData["cattleType"],
    breed: params.get("breed") || "",
    breedRegion: params.get("breedRegion") || "",
    weightCategory: params.get("weightCategory") || "",
    age: Number(params.get("age") || 0),
    healthStatus: (params.get("healthStatus") || "") as DietFormData["healthStatus"],
    tagged: (params.get("tagged") || "No") as DietFormData["tagged"],
  };

  const ok =
    formData.cattleType &&
    formData.breed &&
    formData.weightCategory &&
    formData.healthStatus;

  const preset = useMemo(
    () => getBreedPreset(formData, tt),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData.cattleType, formData.breed, langParam]
  );

  const chart = useMemo(
    () => applyAdjustments(preset.base, formData, preset, tt),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preset, formData.weightCategory, formData.healthStatus, formData.cattleType, langParam]
  );

  if (!ok) {
    return (
      <div className="min-h-screen py-16 bg-background font-sans">
        <div className="container-custom">
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle>{tt("dietChart.errors.noDataTitle", "No data found")}</CardTitle>
              <CardDescription>
                {tt("dietChart.errors.noDataDesc", "Please generate a diet chart from the Diet Planner page.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setLocation("/diet-planner")}>
                {tt("dietChart.errors.goPlanner", "Go to Diet Planner")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const labels = {
    green: tt("dietChart.labels.green", "Green fodder"),
    dry: tt("dietChart.labels.dry", "Dry fodder"),
    conc: tt("dietChart.labels.conc", "Concentrate / grains"),
    mineral: tt("dietChart.labels.mineral", "Mineral mixture"),
    salt: tt("dietChart.labels.salt", "Salt"),
    water: tt("dietChart.labels.water", "Water"),
  };

  const unitKgPerDay = (v: number) => tt("dietChart.units.kgPerDay", "{{v}} kg/day", { v });
  const unitGPerDay = (v: number) => tt("dietChart.units.gPerDay", "{{v}} g/day", { v });
  const unitLPerDay = (v: number) => tt("dietChart.units.lPerDay", "{{v}} L/day", { v });

  const barData = [
    { name: labels.green, kg: chart.greenFodderKgPerDay },
    { name: labels.dry, kg: chart.dryFodderKgPerDay },
    { name: labels.conc, kg: chart.concentrateKgPerDay },
  ];

  const pieData = [
    { name: labels.green, value: chart.greenFodderKgPerDay },
    { name: labels.dry, value: chart.dryFodderKgPerDay },
    { name: labels.conc, value: chart.concentrateKgPerDay },
  ];

  const toggleLang = () => {
    const next = formData.lang === "hi" ? "en" : "hi";
    params.set("lang", next);
    localStorage.setItem("verdant_lang", next);
    i18n.changeLanguage(next);
    setLocation(`/diet-chart?${params.toString()}`);
  };

  // ✅ translated breed label (t-tagged)
  const breedText = breedLabel(formData.cattleType, formData.breed, tt);

  return (
    <div className="min-h-screen py-16 bg-background font-sans">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary">{formData.cattleType}</Badge>

              {/* ✅ Breed now uses t(...) */}
              <Badge variant="outline">{breedText}</Badge>

              {!!formData.breedRegion && (
                <Badge variant="outline">
                  {tt("dietChart.meta.region", "Region")}: {formData.breedRegion}
                </Badge>
              )}

              <Badge variant="outline">{formData.weightCategory}</Badge>
              <Badge variant="outline">{formData.healthStatus}</Badge>

              {formData.tagged === "Yes" ? (
                <Badge>{tt("dietChart.badges.tagged", "Tagged")}</Badge>
              ) : (
                <Badge variant="secondary">{tt("dietChart.badges.notTagged", "Not Tagged")}</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {tt("dietChart.pageTitle", "Diet Chart")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {tt("dietChart.meta.owner", "Owner")}: {formData.name} •{" "}
              {tt("dietChart.meta.contact", "Contact")}: {formData.contact} •{" "}
              {tt("dietChart.meta.age", "Age")}: {formData.age}{" "}
              {tt("dietChart.meta.years", "yrs")}
            </p>

            <p className="text-muted-foreground text-sm mt-1">
              {tt("dietChart.meta.precision", "Precision")}:{" "}
              {tt("dietChart.meta.dm", "DM")} {chart.targetDMKg} kg/day •{" "}
              {tt("dietChart.meta.cp", "CP")} {chart.crudeProteinG} g/day •{" "}
              {tt("dietChart.meta.energy", "Energy")} {chart.energyMJ} MJ/day
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button variant="outline" onClick={toggleLang}>
              <Languages className="h-4 w-4 mr-2" />
              {formData.lang === "hi"
                ? tt("dietChart.langSwitch.en", "English")
                : tt("dietChart.langSwitch.hi", "हिन्दी")}
            </Button>

            <Button variant="outline" onClick={() => setLocation("/diet-planner")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tt("dietChart.back", "Back")}
            </Button>
          </div>
        </div>

        {/* Cards + Graphs */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <MotionWrap delay={0.0}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>{tt("dietChart.sections.dailyReq", "Daily Requirements")}</CardTitle>
                <CardDescription>{tt("dietChart.sections.perDay", "Per day (approx.)")}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <StatRow icon={<Leaf className="h-4 w-4" />} label={labels.green} value={unitKgPerDay(chart.greenFodderKgPerDay)} />
                <StatRow icon={<Wheat className="h-4 w-4" />} label={labels.dry} value={unitKgPerDay(chart.dryFodderKgPerDay)} />
                <StatRow icon={<Wheat className="h-4 w-4" />} label={labels.conc} value={unitKgPerDay(chart.concentrateKgPerDay)} />
                <StatRow icon={<Pill className="h-4 w-4" />} label={labels.mineral} value={unitGPerDay(chart.mineralMixGPerDay)} />
                <StatRow icon={<CircleDot className="h-4 w-4" />} label={labels.salt} value={unitGPerDay(chart.saltGPerDay)} />
                <StatRow icon={<Droplets className="h-4 w-4" />} label={labels.water} value={unitLPerDay(chart.waterLPerDay)} />
              </CardContent>
            </Card>
          </MotionWrap>

          <MotionWrap delay={0.08}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>{tt("dietChart.charts.barTitle", "Feed Breakdown")}</CardTitle>
                <CardDescription>{tt("dietChart.charts.barDesc", "Bar chart (kg/day)")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="kg" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </MotionWrap>

          <MotionWrap delay={0.16}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>{tt("dietChart.charts.pieTitle", "Ratio")}</CardTitle>
                <CardDescription>{tt("dietChart.charts.pieDesc", "Pie chart")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={105} label />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  {tt("dietChart.charts.roughage", "Roughage = Green + Dry")}
                </p>
              </CardContent>
            </Card>
          </MotionWrap>
        </div>

        <MotionWrap delay={0.22}>
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>{tt("dietChart.sections.schedule", "Feeding Schedule")}</CardTitle>
              <CardDescription>
                {tt("dietChart.sections.scheduleDesc", "Suggested timing for better digestion")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {chart.feedingSchedule.map((slot) => (
                <div key={slot.time} className="rounded-xl border border-border bg-card p-4">
                  <div className="font-semibold text-primary">{slot.time}</div>
                  <ul className="list-disc pl-6 mt-2 text-muted-foreground">
                    {slot.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </MotionWrap>

        {chart.notes.length > 0 && (
          <MotionWrap delay={0.28}>
            <Card className="border-border shadow-lg mt-6">
              <CardHeader>
                <CardTitle>{tt("dietChart.sections.notes", "Notes")}</CardTitle>
                <CardDescription>
                  {tt("dietChart.sections.notesDesc", "For illness/pregnancy, consult a vet.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 text-muted-foreground">
                  {chart.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </MotionWrap>
        )}
      </div>
    </div>
  );
}