import React, { useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Leaf, Wheat, Pill, CircleDot, ArrowLeft, Languages } from "lucide-react";
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

type DietFormData = {
  lang: "hi" | "en";
  name: string;
  contact: string;
  cattleType: "Cow" | "Buffalo" | "Goat";
  breed: string;
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

/**
 * PDF-based thumb-rule idea:
 * - Maintenance ration concept (straw + concentrate) + extra allowance in pregnancy/milk production
 *   (Feeding of Cattle & Buffalo PDF).
 * - Goat DM%BW guidance (dry vs late gestation vs lactation) used as adjustment idea for Pregnant.
 */
function baseCattle(green: number, dry: number, conc: number, minerals: number, salt: number, water: number): DietChart {
  return {
    greenFodderKgPerDay: green,
    dryFodderKgPerDay: dry,
    concentrateKgPerDay: conc,
    mineralMixGPerDay: minerals,
    saltGPerDay: salt,
    waterLPerDay: water,
    feedingSchedule: [
      { time: "Morning (6–8 AM)", items: ["Green fodder (50%)", "Concentrate (50%)", "Fresh water"] },
      { time: "Afternoon (12–2 PM)", items: ["Dry fodder (50%)", "Fresh water"] },
      { time: "Evening (6–8 PM)", items: ["Green fodder (50%)", "Concentrate (50%)", "Mineral mix + salt", "Fresh water"] },
    ],
    notes: [],
  };
}

function baseGoat(green: number, dry: number, conc: number, minerals: number, salt: number, water: number): DietChart {
  return {
    greenFodderKgPerDay: green,
    dryFodderKgPerDay: dry,
    concentrateKgPerDay: conc,
    mineralMixGPerDay: minerals,
    saltGPerDay: salt,
    waterLPerDay: water,
    feedingSchedule: [
      { time: "Morning (7–9 AM)", items: ["Green fodder", "Concentrate", "Fresh water"] },
      { time: "Evening (5–7 PM)", items: ["Dry fodder", "Mineral mix + salt", "Fresh water"] },
    ],
    notes: [],
  };
}

function getBreedPreset(data: DietFormData): BreedPreset {
  const { cattleType, breed } = data;

  // rough estimates (for “precision fields”)
  const cattleDM = { green: 0.2, dry: 0.9, conc: 0.9 };
  const goatDM = { green: 0.22, dry: 0.9, conc: 0.9 };

  // crude protein (g/kg as-fed rough guidance)
  const cattleCP = { green: 35, dry: 55, conc: 180 };
  const dairyCattleCP = { green: 40, dry: 60, conc: 200 };
  const goatCP = { green: 45, dry: 60, conc: 170 };

  // ✅ broader presets (more breeds) + region hint
  const cow: Record<string, BreedPreset> = {
    Gir: { profile: "dairy", base: baseCattle(26, 6.5, 6.0, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP, regionHint: "Gujarat" },
    Sahiwal: { profile: "high_dairy", base: baseCattle(25, 6.0, 6.3, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP, regionHint: "Punjab/Haryana" },
    Tharparkar: { profile: "dual", base: baseCattle(26, 7.0, 5.6, 65, 30, 100), dm: cattleDM, cp: cattleCP, regionHint: "Rajasthan" },
    "Red Sindhi": { profile: "dairy", base: baseCattle(25, 6.0, 6.0, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP, regionHint: "North/West India" },
    Rathi: { profile: "dairy", base: baseCattle(24, 6.0, 5.8, 65, 30, 100), dm: cattleDM, cp: dairyCattleCP, regionHint: "Rajasthan" },
    Hariana: { profile: "dual", base: baseCattle(24, 7.0, 5.2, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Haryana" },
    Kankrej: { profile: "dual", base: baseCattle(25, 7.0, 5.4, 65, 30, 100), dm: cattleDM, cp: cattleCP, regionHint: "Gujarat/Rajasthan" },
    Ongole: { profile: "dual", base: baseCattle(25, 7.0, 5.2, 65, 30, 100), dm: cattleDM, cp: cattleCP, regionHint: "Andhra Pradesh" },
    Deoni: { profile: "dual", base: baseCattle(24, 6.5, 5.3, 65, 30, 98), dm: cattleDM, cp: cattleCP, regionHint: "MH/KA" },
    Kangayam: { profile: "dual", base: baseCattle(24, 7.0, 5.1, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Tamil Nadu" },
    Hallikar: { profile: "dual", base: baseCattle(24, 7.0, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Karnataka" },
    Gaolao: { profile: "dual", base: baseCattle(24, 6.8, 5.1, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "MP/MH" },
    Khillari: { profile: "dual", base: baseCattle(24, 7.0, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "MH/KA" },
    Vechur: { profile: "dairy", base: baseCattle(18, 4.5, 3.5, 50, 25, 70), dm: cattleDM, cp: dairyCattleCP, regionHint: "Kerala" },
    Punganur: { profile: "dairy", base: baseCattle(16, 4.0, 3.2, 45, 25, 65), dm: cattleDM, cp: dairyCattleCP, regionHint: "Andhra Pradesh" },
    Dangi: { profile: "dual", base: baseCattle(23, 6.8, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Maharashtra" },
    Nagori: { profile: "dual", base: baseCattle(23, 7.0, 5.0, 60, 30, 95), dm: cattleDM, cp: cattleCP, regionHint: "Rajasthan" },
    Other: { profile: "dual", base: baseCattle(24, 6.5, 5.4, 65, 30, 100), dm: cattleDM, cp: cattleCP },
  };

  const buffalo: Record<string, BreedPreset> = {
    Murrah: { profile: "high_dairy", base: baseCattle(30, 8.0, 7.2, 75, 30, 125), dm: cattleDM, cp: dairyCattleCP, regionHint: "Haryana/Punjab" },
    Mehsana: { profile: "dairy", base: baseCattle(29, 7.5, 6.8, 75, 30, 120), dm: cattleDM, cp: dairyCattleCP, regionHint: "Gujarat" },
    Jaffarabadi: { profile: "dual", base: baseCattle(31, 8.5, 6.6, 75, 30, 125), dm: cattleDM, cp: cattleCP, regionHint: "Gujarat" },
    Surti: { profile: "dairy", base: baseCattle(28, 7.0, 6.4, 70, 30, 115), dm: cattleDM, cp: dairyCattleCP, regionHint: "Gujarat" },
    Bhadawari: { profile: "dairy", base: baseCattle(28, 7.5, 6.6, 70, 30, 120), dm: cattleDM, cp: dairyCattleCP, regionHint: "UP/MP" },
    Nagpuri: { profile: "dual", base: baseCattle(28, 7.5, 6.0, 70, 30, 115), dm: cattleDM, cp: cattleCP, regionHint: "Maharashtra" },
    "Nili Ravi": { profile: "high_dairy", base: baseCattle(30, 8.0, 7.0, 75, 30, 125), dm: cattleDM, cp: dairyCattleCP, regionHint: "Punjab" },
    Pandharpuri: { profile: "dual", base: baseCattle(29, 8.0, 6.2, 70, 30, 120), dm: cattleDM, cp: cattleCP, regionHint: "Maharashtra" },
    Toda: { profile: "dual", base: baseCattle(26, 7.0, 5.6, 65, 30, 110), dm: cattleDM, cp: cattleCP, regionHint: "Tamil Nadu" },
    Chilika: { profile: "dual", base: baseCattle(27, 7.2, 5.8, 65, 30, 112), dm: cattleDM, cp: cattleCP, regionHint: "Odisha" },
    Other: { profile: "dual", base: baseCattle(28, 7.5, 6.4, 70, 30, 120), dm: cattleDM, cp: cattleCP },
  };

  const goat: Record<string, BreedPreset> = {
    Jamunapari: { profile: "high_dairy", base: baseGoat(3.2, 1.2, 0.95, 35, 10, 12), dm: goatDM, cp: goatCP, regionHint: "Uttar Pradesh" },
    Beetal: { profile: "dual", base: baseGoat(3.0, 1.1, 0.9, 35, 10, 12), dm: goatDM, cp: goatCP, regionHint: "Punjab" },
    Barbari: { profile: "dairy", base: baseGoat(2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Uttar Pradesh" },
    Sirohi: { profile: "dual", base: baseGoat(3.0, 1.1, 0.88, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Rajasthan" },
    "Black Bengal": { profile: "meat", base: baseGoat(2.6, 1.0, 0.78, 28, 10, 11), dm: goatDM, cp: goatCP, regionHint: "West Bengal" },
    Osmanabadi: { profile: "meat", base: baseGoat(2.8, 1.0, 0.82, 28, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Maharashtra" },
    Malabari: { profile: "dual", base: baseGoat(2.9, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Kerala" },
    Jakhrana: { profile: "dairy", base: baseGoat(3.1, 1.1, 0.92, 35, 10, 12), dm: goatDM, cp: goatCP, regionHint: "Rajasthan" },
    Gaddi: { profile: "dual", base: baseGoat(2.9, 1.0, 0.86, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Himachal" },
    Marwari: { profile: "meat", base: baseGoat(2.8, 1.0, 0.84, 28, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Rajasthan" },
    Zalawadi: { profile: "dual", base: baseGoat(2.9, 1.0, 0.86, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Gujarat" },
    Sangamneri: { profile: "dual", base: baseGoat(2.9, 1.0, 0.86, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Maharashtra" },
    Surti: { profile: "dual", base: baseGoat(2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Gujarat" },
    Changthangi: { profile: "meat", base: baseGoat(2.7, 1.0, 0.82, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Ladakh" },
    Chegu: { profile: "meat", base: baseGoat(2.8, 1.0, 0.83, 30, 10, 11), dm: goatDM, cp: goatCP, regionHint: "Himachal/J&K" },
    Other: { profile: "dual", base: baseGoat(2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP },
  };

  if (cattleType === "Cow") return cow[breed] ?? cow.Other;
  if (cattleType === "Buffalo") return buffalo[breed] ?? buffalo.Other;
  return goat[breed] ?? goat.Other;
}

function applyAdjustments(base: DietChart, data: DietFormData, preset: BreedPreset): DietChart {
  const chart = deepClone(base);
  const { cattleType, weightCategory, healthStatus } = data;

  // weight adjustment (simple)
  if (cattleType !== "Goat") {
    if (weightCategory === "0-300kg") chart.concentrateKgPerDay += 0.5;
    if (weightCategory === "400-500kg") chart.concentrateKgPerDay += 1.0;
  } else {
    if (weightCategory === "20-50kg") chart.concentrateKgPerDay += 0.1;
    if (weightCategory === "80-120kg") chart.concentrateKgPerDay += 0.2;
  }

  // breed profile adjustment
  if (preset.profile === "high_dairy") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 1.1);
    chart.mineralMixGPerDay += cattleType === "Goat" ? 5 : 10;
    chart.notes.push("High dairy: higher concentrate + minerals.");
  } else if (preset.profile === "dairy") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 1.05);
    chart.notes.push("Dairy: slightly higher concentrate.");
  } else if (preset.profile === "meat") {
    chart.notes.push("Meat type: balanced energy with moderate roughage.");
  } else {
    chart.notes.push("Dual purpose: balanced roughage + concentrate.");
  }

  // health adjustments
  if (healthStatus === "Sick") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 0.9);
    chart.notes.push("Sick: soft green fodder, avoid sudden feed changes. Vet advice recommended.");
  }

  // Pregnant:
  // - cattle/buffalo: increase concentrate + mineral
  // - goat: use idea of higher intake in late gestation (4–4.5% BW guideline from PDF),
  //   so we push concentrate & roughage slightly.
  if (healthStatus === "Pregnant") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * (cattleType === "Goat" ? 1.12 : 1.1));
    chart.mineralMixGPerDay += cattleType === "Goat" ? 10 : 15;
    chart.greenFodderKgPerDay = round(chart.greenFodderKgPerDay * (cattleType === "Goat" ? 1.05 : 1.03));
    chart.notes.push("Pregnant: higher energy/protein + minerals (consult vet for trimester-specific plan).");
  }

  // precision metrics (approx)
  const dmKg =
    chart.greenFodderKgPerDay * preset.dm.green +
    chart.dryFodderKgPerDay * preset.dm.dry +
    chart.concentrateKgPerDay * preset.dm.conc;

  const cpG =
    chart.greenFodderKgPerDay * preset.cp.green +
    chart.dryFodderKgPerDay * preset.cp.dry +
    chart.concentrateKgPerDay * preset.cp.conc;

  const energyMJ = chart.greenFodderKgPerDay * 2 + chart.dryFodderKgPerDay * 6 + chart.concentrateKgPerDay * 12;

  chart.targetDMKg = round(dmKg);
  chart.crudeProteinG = Math.round(cpG);
  chart.energyMJ = round(energyMJ);

  // round display
  chart.greenFodderKgPerDay = round(chart.greenFodderKgPerDay);
  chart.dryFodderKgPerDay = round(chart.dryFodderKgPerDay);
  chart.concentrateKgPerDay = round(chart.concentrateKgPerDay);

  return chart;
}

const MotionWrap = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay }}
  >
    {children}
  </motion.div>
);

function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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

const TEXT = {
  hi: {
    pageTitle: "डाइट चार्ट",
    back: "वापस",
    lang: "English",
    badges: {
      tagged: "टैग्ड",
      notTagged: "टैग नहीं",
    },
    owner: "मालिक",
    contact: "संपर्क",
    age: "उम्र",
    years: "वर्ष",
    region: "क्षेत्र",
    precision: "प्रिसीजन",
    dm: "DM",
    cp: "CP",
    energy: "ऊर्जा",
    dailyReq: "दैनिक आवश्यकता",
    perDay: "प्रतिदिन (अनुमानित)",
    schedule: "खुराक समय-सारिणी",
    scheduleDesc: "बेहतर पाचन के लिए सुझाया गया समय",
    notes: "नोट्स",
    notesDesc: "बीमारी/गर्भावस्था में पशु चिकित्सक से सलाह लें।",
    labels: {
      green: "हरा चारा",
      dry: "सूखा चारा",
      conc: "कंसन्ट्रेट/दाना",
      mineral: "मिनरल मिक्स",
      salt: "नमक",
      water: "पानी",
    },
    charts: {
      barTitle: "फीड ब्रेकडाउन",
      barDesc: "बार चार्ट (kg/day)",
      pieTitle: "अनुपात",
      pieDesc: "पाई चार्ट",
      roughage: "रफेज = हरा + सूखा",
    },
    errors: {
      noDataTitle: "डेटा नहीं मिला",
      noDataDesc: "कृपया पहले Diet Planner से डाइट चार्ट जनरेट करें।",
      goPlanner: "Diet Planner पर जाएँ",
    },
  },
  en: {
    pageTitle: "Diet Chart",
    back: "Back",
    lang: "हिन्दी",
    badges: {
      tagged: "Tagged",
      notTagged: "Not Tagged",
    },
    owner: "Owner",
    contact: "Contact",
    age: "Age",
    years: "yrs",
    region: "Region",
    precision: "Precision",
    dm: "DM",
    cp: "CP",
    energy: "Energy",
    dailyReq: "Daily Requirements",
    perDay: "Per day (approx.)",
    schedule: "Feeding Schedule",
    scheduleDesc: "Suggested timing for better digestion",
    notes: "Notes",
    notesDesc: "For illness/pregnancy, consult a vet.",
    labels: {
      green: "Green fodder",
      dry: "Dry fodder",
      conc: "Concentrate / grains",
      mineral: "Mineral mixture",
      salt: "Salt",
      water: "Water",
    },
    charts: {
      barTitle: "Feed Breakdown",
      barDesc: "Bar chart (kg/day)",
      pieTitle: "Ratio",
      pieDesc: "Pie chart",
      roughage: "Roughage = Green + Dry",
    },
    errors: {
      noDataTitle: "No data found",
      noDataDesc: "Please generate a diet chart from the Diet Planner page.",
      goPlanner: "Go to Diet Planner",
    },
  },
};

export default function DietChartPage() {
  const [, setLocation] = useLocation();

  const params = new URLSearchParams(window.location.search);
  const langParam = (params.get("lang") || "hi") as "hi" | "en";
  const t = TEXT[langParam] ?? TEXT.hi;

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

  const ok = formData.cattleType && formData.breed && formData.weightCategory && formData.healthStatus;

  const preset = useMemo(() => getBreedPreset(formData), [formData.cattleType, formData.breed]);
  const chart = useMemo(() => applyAdjustments(preset.base, formData, preset), [preset, formData]);

  if (!ok) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container-custom">
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle>{t.errors.noDataTitle}</CardTitle>
              <CardDescription>{t.errors.noDataDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setLocation("/diet-planner")}>{t.errors.goPlanner}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ✅ graph data (charts render only with fixed height container!)
  const barData = [
    { name: t.labels.green, kg: chart.greenFodderKgPerDay },
    { name: t.labels.dry, kg: chart.dryFodderKgPerDay },
    { name: t.labels.conc, kg: chart.concentrateKgPerDay },
  ];

  const pieData = [
    { name: t.labels.green, value: chart.greenFodderKgPerDay },
    { name: t.labels.dry, value: chart.dryFodderKgPerDay },
    { name: t.labels.conc, value: chart.concentrateKgPerDay },
  ];

  const toggleLang = () => {
    params.set("lang", formData.lang === "hi" ? "en" : "hi");
    setLocation(`/diet-chart?${params.toString()}`);
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary">{formData.cattleType}</Badge>
              <Badge variant="outline">{formData.breed}</Badge>
              {!!formData.breedRegion && <Badge variant="outline">{t.region}: {formData.breedRegion}</Badge>}
              <Badge variant="outline">{formData.weightCategory}</Badge>
              <Badge variant="outline">{formData.healthStatus}</Badge>
              {formData.tagged === "Yes" ? (
                <Badge>{t.badges.tagged}</Badge>
              ) : (
                <Badge variant="secondary">{t.badges.notTagged}</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary">{t.pageTitle}</h1>

            <p className="text-muted-foreground mt-2">
              {t.owner}: {formData.name} • {t.contact}: {formData.contact} • {t.age}: {formData.age} {t.years}
            </p>

            <p className="text-muted-foreground text-sm mt-1">
              {t.precision}: {t.dm} {chart.targetDMKg} kg/day • {t.cp} {chart.crudeProteinG} g/day • {t.energy} {chart.energyMJ} MJ/day
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button variant="outline" onClick={toggleLang}>
              <Languages className="h-4 w-4 mr-2" />
              {t.lang}
            </Button>

            <Button variant="outline" onClick={() => setLocation("/diet-planner")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back}
            </Button>
          </div>
        </div>

        {/* Cards + Graphs */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <MotionWrap delay={0.0}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>{t.dailyReq}</CardTitle>
                <CardDescription>{t.perDay}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <StatRow icon={<Leaf className="h-4 w-4" />} label={t.labels.green} value={`${chart.greenFodderKgPerDay} kg/day`} />
                <StatRow icon={<Wheat className="h-4 w-4" />} label={t.labels.dry} value={`${chart.dryFodderKgPerDay} kg/day`} />
                <StatRow icon={<Wheat className="h-4 w-4" />} label={t.labels.conc} value={`${chart.concentrateKgPerDay} kg/day`} />
                <StatRow icon={<Pill className="h-4 w-4" />} label={t.labels.mineral} value={`${chart.mineralMixGPerDay} g/day`} />
                <StatRow icon={<CircleDot className="h-4 w-4" />} label={t.labels.salt} value={`${chart.saltGPerDay} g/day`} />
                <StatRow icon={<Droplets className="h-4 w-4" />} label={t.labels.water} value={`${chart.waterLPerDay} L/day`} />
              </CardContent>
            </Card>
          </MotionWrap>

          <MotionWrap delay={0.08}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>{t.charts.barTitle}</CardTitle>
                <CardDescription>{t.charts.barDesc}</CardDescription>
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
                <CardTitle>{t.charts.pieTitle}</CardTitle>
                <CardDescription>{t.charts.pieDesc}</CardDescription>
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
                <p className="text-xs text-muted-foreground mt-2">{t.charts.roughage}</p>
              </CardContent>
            </Card>
          </MotionWrap>
        </div>

        <MotionWrap delay={0.22}>
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>{t.schedule}</CardTitle>
              <CardDescription>{t.scheduleDesc}</CardDescription>
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
                <CardTitle>{t.notes}</CardTitle>
                <CardDescription>{t.notesDesc}</CardDescription>
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
