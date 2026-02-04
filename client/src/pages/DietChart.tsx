import React, { useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Leaf, Wheat, Pill, CircleDot, ArrowLeft } from "lucide-react";
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
  name: string;
  contact: string;
  cattleType: "Cow" | "Buffalo" | "Goat";
  breed: string;
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
};

function round(n: number) {
  return Math.round(n * 100) / 100;
}

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

  const cattleDM = { green: 0.2, dry: 0.9, conc: 0.9 };
  const goatDM = { green: 0.22, dry: 0.9, conc: 0.9 };

  const cattleCP = { green: 35, dry: 55, conc: 180 };
  const dairyCattleCP = { green: 40, dry: 60, conc: 200 };
  const goatCP = { green: 45, dry: 60, conc: 170 };

  const cow: Record<string, BreedPreset> = {
    Gir: { profile: "dairy", base: baseCattle(26, 6.5, 6.0, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP },
    Sahiwal: { profile: "high_dairy", base: baseCattle(25, 6.0, 6.2, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP },
    Tharparkar: { profile: "dual", base: baseCattle(26, 7.0, 5.6, 65, 30, 100), dm: cattleDM, cp: cattleCP },
    "Red Sindhi": { profile: "dairy", base: baseCattle(25, 6.0, 6.0, 70, 30, 105), dm: cattleDM, cp: dairyCattleCP },
    Rathi: { profile: "dairy", base: baseCattle(24, 6.0, 5.8, 65, 30, 100), dm: cattleDM, cp: dairyCattleCP },
    Hariana: { profile: "dual", base: baseCattle(24, 7.0, 5.2, 60, 30, 95), dm: cattleDM, cp: cattleCP },
    Kankrej: { profile: "dual", base: baseCattle(25, 7.0, 5.4, 65, 30, 100), dm: cattleDM, cp: cattleCP },
    Other: { profile: "dual", base: baseCattle(24, 6.5, 5.4, 65, 30, 100), dm: cattleDM, cp: cattleCP },
  };

  const buffalo: Record<string, BreedPreset> = {
    Murrah: { profile: "high_dairy", base: baseCattle(30, 8.0, 7.2, 75, 30, 125), dm: cattleDM, cp: dairyCattleCP },
    Mehsana: { profile: "dairy", base: baseCattle(29, 7.5, 6.8, 75, 30, 120), dm: cattleDM, cp: dairyCattleCP },
    Jaffarabadi: { profile: "dual", base: baseCattle(31, 8.5, 6.6, 75, 30, 125), dm: cattleDM, cp: cattleCP },
    Surti: { profile: "dairy", base: baseCattle(28, 7.0, 6.4, 70, 30, 115), dm: cattleDM, cp: dairyCattleCP },
    Bhadawari: { profile: "dairy", base: baseCattle(28, 7.5, 6.6, 70, 30, 120), dm: cattleDM, cp: dairyCattleCP },
    Nagpuri: { profile: "dual", base: baseCattle(28, 7.5, 6.0, 70, 30, 115), dm: cattleDM, cp: cattleCP },
    "Nili Ravi": { profile: "high_dairy", base: baseCattle(30, 8.0, 7.0, 75, 30, 125), dm: cattleDM, cp: dairyCattleCP },
    Other: { profile: "dual", base: baseCattle(28, 7.5, 6.4, 70, 30, 120), dm: cattleDM, cp: cattleCP },
  };

  const goat: Record<string, BreedPreset> = {
    Jamunapari: { profile: "high_dairy", base: baseGoat(3.2, 1.2, 0.95, 35, 10, 12), dm: goatDM, cp: goatCP },
    Beetal: { profile: "dual", base: baseGoat(3.0, 1.1, 0.9, 35, 10, 12), dm: goatDM, cp: goatCP },
    Barbari: { profile: "dairy", base: baseGoat(2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP },
    Sirohi: { profile: "dual", base: baseGoat(3.0, 1.1, 0.88, 30, 10, 11), dm: goatDM, cp: goatCP },
    "Black Bengal": { profile: "meat", base: baseGoat(2.6, 1.0, 0.78, 28, 10, 11), dm: goatDM, cp: goatCP },
    Osmanabadi: { profile: "meat", base: baseGoat(2.8, 1.0, 0.82, 28, 10, 11), dm: goatDM, cp: goatCP },
    Malabari: { profile: "dual", base: baseGoat(2.9, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP },
    Other: { profile: "dual", base: baseGoat(2.8, 1.0, 0.85, 30, 10, 11), dm: goatDM, cp: goatCP },
  };

  if (cattleType === "Cow") return cow[breed] ?? cow.Other;
  if (cattleType === "Buffalo") return buffalo[breed] ?? buffalo.Other;
  return goat[breed] ?? goat.Other;
}

function applyAdjustments(base: DietChart, data: DietFormData, preset: BreedPreset): DietChart {
  const chart: DietChart = JSON.parse(JSON.stringify(base));
  const { cattleType, weightCategory, healthStatus } = data;

  // weight adjustment
  if (cattleType !== "Goat") {
    if (weightCategory === "0-300kg") chart.concentrateKgPerDay += 0.5;
    if (weightCategory === "400-500kg") chart.concentrateKgPerDay += 1.0;
  } else {
    if (weightCategory === "20-50kg") chart.concentrateKgPerDay += 0.1;
    if (weightCategory === "80-120kg") chart.concentrateKgPerDay += 0.2;
  }

  // profile adjustment
  if (preset.profile === "high_dairy") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 1.08);
    chart.mineralMixGPerDay += cattleType === "Goat" ? 5 : 10;
    chart.notes.push("High dairy: higher concentrate + minerals.");
  } else if (preset.profile === "dairy") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 1.05);
    chart.notes.push("Dairy: slightly higher concentrate.");
  } else if (preset.profile === "meat") {
    chart.notes.push("Meat: balanced energy with moderate roughage.");
  } else {
    chart.notes.push("Dual: balanced roughage + concentrate.");
  }

  if (healthStatus === "Sick") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 0.9);
    chart.notes.push("Sick: soft green fodder, avoid sudden feed changes. Vet advice recommended.");
  }

  if (healthStatus === "Pregnant") {
    chart.concentrateKgPerDay = round(chart.concentrateKgPerDay * 1.1);
    chart.mineralMixGPerDay += cattleType === "Goat" ? 10 : 15;
    chart.notes.push("Pregnant: higher energy/protein + minerals.");
  }

  // precision metrics
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

  chart.greenFodderKgPerDay = round(chart.greenFodderKgPerDay);
  chart.dryFodderKgPerDay = round(chart.dryFodderKgPerDay);
  chart.concentrateKgPerDay = round(chart.concentrateKgPerDay);

  return chart;
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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

const MotionWrap = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

export default function DietChartPage() {
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(window.location.search);

  const formData: DietFormData = {
    name: params.get("name") || "",
    contact: params.get("contact") || "",
    cattleType: (params.get("cattleType") || "") as DietFormData["cattleType"],
    breed: params.get("breed") || "",
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
              <CardTitle>No data found</CardTitle>
              <CardDescription>Please generate a diet chart from the Diet Planner page.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setLocation("/diet-planner")}>Go to Diet Planner</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const barData = [
    { name: "Green", kg: chart.greenFodderKgPerDay },
    { name: "Dry", kg: chart.dryFodderKgPerDay },
    { name: "Concentrate", kg: chart.concentrateKgPerDay },
  ];

  const pieData = [
    { name: "Green", value: chart.greenFodderKgPerDay },
    { name: "Dry", value: chart.dryFodderKgPerDay },
    { name: "Concentrate", value: chart.concentrateKgPerDay },
  ];

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary">{formData.cattleType}</Badge>
              <Badge variant="outline">{formData.breed}</Badge>
              <Badge variant="outline">{formData.weightCategory}</Badge>
              <Badge variant="outline">{formData.healthStatus}</Badge>
              {formData.tagged === "Yes" ? <Badge>Tagged</Badge> : <Badge variant="secondary">Not Tagged</Badge>}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary">Diet Chart</h1>
            <p className="text-muted-foreground mt-2">
              Owner: {formData.name} • Contact: {formData.contact} • Age: {formData.age} yrs
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Precision: DM {chart.targetDMKg} kg/day • CP {chart.crudeProteinG} g/day • Energy {chart.energyMJ} MJ/day
            </p>
          </div>

          <Button variant="outline" onClick={() => setLocation("/diet-planner")} className="shrink-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Cards + Graphs */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <MotionWrap delay={0.0}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>Daily Requirements</CardTitle>
                <CardDescription>Per day quantities (approx.)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Row icon={<Leaf className="h-4 w-4" />} label="Green fodder" value={`${chart.greenFodderKgPerDay} kg/day`} />
                <Row icon={<Wheat className="h-4 w-4" />} label="Dry fodder" value={`${chart.dryFodderKgPerDay} kg/day`} />
                <Row icon={<Wheat className="h-4 w-4" />} label="Concentrate" value={`${chart.concentrateKgPerDay} kg/day`} />
                <Row icon={<Pill className="h-4 w-4" />} label="Mineral mixture" value={`${chart.mineralMixGPerDay} g/day`} />
                <Row icon={<CircleDot className="h-4 w-4" />} label="Salt" value={`${chart.saltGPerDay} g/day`} />
                <Row icon={<Droplets className="h-4 w-4" />} label="Water" value={`${chart.waterLPerDay} L/day`} />
              </CardContent>
            </Card>
          </MotionWrap>

          <MotionWrap delay={0.08}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>Feed Breakdown</CardTitle>
                <CardDescription>Bar chart (kg/day)</CardDescription>
              </CardHeader>
              <CardContent>
                {/* ✅ fixed height so it renders */}
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="kg" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </MotionWrap>

          <MotionWrap delay={0.16}>
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>Ratio</CardTitle>
                <CardDescription>Pie chart</CardDescription>
              </CardHeader>
              <CardContent>
                {/* ✅ fixed height so it renders */}
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={105} label />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Roughage = Green + Dry</p>
              </CardContent>
            </Card>
          </MotionWrap>
        </div>

        <MotionWrap delay={0.22}>
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>Feeding Schedule</CardTitle>
              <CardDescription>Suggested timing for better digestion</CardDescription>
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
                <CardTitle>Notes</CardTitle>
                <CardDescription>For illness/pregnancy, consult a vet.</CardDescription>
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