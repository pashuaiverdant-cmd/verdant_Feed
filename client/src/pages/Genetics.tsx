"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Dna,
  FlaskConical,
  Microscope,
  ShieldCheck,
  Thermometer,
  Info,
  ClipboardList,
  Sparkles,
  Droplets,
  Tags,
  Snowflake,
  TestTubeDiagonal,
  Scan,
  Beaker,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ValueProp = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type Metric = {
  label: string;
  value: string;
  hint: string;
};

type Step = {
  title: string;
  points: string[];
};

type Faq = {
  q: string;
  a: string;
};

export default function Genetics() {
  const [tab, setTab] = useState<"Standards" | "Semen" | "Breeding">("Standards");

  const indiaStandards: Metric[] = [
    {
      label: "Initial progressive motility",
      value: "≥ 70%",
      hint: "Minimum benchmark for semen selection for processing (India MSP).",
    },
    {
      label: "Post-thaw progressive motility",
      value: "≥ 50%",
      hint: "Minimum post-thaw benchmark for dose acceptance (India MSP).",
    },
    {
      label: "Dose concentration",
      value: "≥ 20 million",
      hint: "Minimum sperm count per frozen semen dose referenced in MSP.",
    },
    {
      label: "Sex-sorted semen",
      value: "≈ 90% accuracy",
      hint: "Operational guidelines specify ~90% sex accuracy target.",
    },
  ];

  const semenBasics: Metric[] = [
    { label: "Motility", value: "Movement", hint: "Forward progressive movement matters most." },
    { label: "Morphology", value: "Structure", hint: "Normal forms vs abnormalities." },
    { label: "Viability", value: "Live %", hint: "Live/dead ratio is handling-sensitive." },
    { label: "Hygiene", value: "Critical", hint: "Contamination reduces field success." },
  ];

  const breedingBasics: Metric[] = [
    { label: "Heat detection", value: "Top factor", hint: "Wrong timing is a major failure reason." },
    { label: "Thawing discipline", value: "Must follow", hint: "Avoid temperature shock." },
    { label: "Cow condition", value: "BCS matters", hint: "Nutrition strongly affects fertility." },
    { label: "Records", value: "Essential", hint: "Track AI date, bull code, outcome." },
  ];

  const valueProps: ValueProp[] = [
    {
      icon: FlaskConical,
      title: "Semen Quality Assurance",
      description:
        "Benchmarks define what “acceptable” looks like — motility checks, post-thaw testing, hygiene and batch rejection rules.",
    },
    {
      icon: Thermometer,
      title: "Cryo Chain Discipline",
      description:
        "Frozen semen is sensitive to temperature shock. Correct thawing and warm, dry equipment protect viability.",
    },
    {
      icon: ShieldCheck,
      title: "Genetic Improvement (Planned)",
      description:
        "Breeding works when you define a goal → select strategy → match cows → keep records → refine season by season.",
    },
  ];

  const qualityWorkflow: Step[] = [
    {
      title: "1) Selection for Processing",
      points: [
        "Semen chosen should meet minimum initial progressive motility benchmark.",
        "Controlled handling from collection to lab reduces damage and contamination.",
      ],
    },
    {
      title: "2) Sterile Filling & Sealing",
      points: [
        "Filling/sealing under Laminar Air Flow; sterile straws and disposables.",
        "Strict cleaning protocols reduce microbial risk.",
      ],
    },
    {
      title: "3) Freezing & Post-Thaw Checks",
      points: [
        "Post-thaw progressive motility checked; low-quality batches discarded.",
        "Batch sampling helps detect process issues early.",
      ],
    },
    {
      title: "4) Microbial Control",
      points: [
        "Random batch sampling for microbial quality; discards if limits exceeded.",
        "Hygiene failures can reduce fertility and field success.",
      ],
    },
    {
      title: "5) On-Farm Success Layer",
      points: [
        "Heat detection + correct timing drives results.",
        "Thawing mistakes can destroy good semen.",
      ],
    },
  ];

  const strawExplained: Step[] = [
    {
      title: "What is a semen sample (straw)?",
      points: [
        "A straw is a sealed dose of semen prepared for AI (artificial insemination).",
        "It is processed, diluted/extended, frozen and stored in liquid nitrogen for long-term use.",
        "It is identified by a label code for traceability and records.",
      ],
    },
    {
      title: "What’s usually on the label (traceability)",
      points: [
        "Bull/Sire ID or Code, breed, semen station or lab code",
        "Batch/collection date, straw/dose number",
        "Sometimes: quality info or certification references",
      ],
    },
    {
      title: "Types you’ll hear in India",
      points: [
        "Conventional frozen semen (general use)",
        "Sex-sorted frozen semen (higher probability of female calf births; accuracy targets apply)",
        "Breed improvement vs field/balanced use based on program goals",
      ],
    },
    {
      title: "Storage & transport basics",
      points: [
        "Stored in LN2 containers; keep canister time outside minimal",
        "Avoid repeated warming/cooling cycles",
        "Maintain inventory: bull code → cow ID → AI date → outcome",
      ],
    },
    {
      title: "Thawing & handling (farmer checklist)",
      points: [
        "Follow the exact thawing method recommended by your provider/technician",
        "Keep gun + sheath dry; avoid cold metal contact",
        "Load quickly and inseminate at the correct time window",
      ],
    },
  ];

  const geneticsPillars: ValueProp[] = [
    {
      icon: Dna,
      title: "Goal-based Selection",
      description:
        "Choose genetics for your goal: milk yield, fat/SNF, fertility, calving ease, disease resistance, growth — not random.",
    },
    {
      icon: Sparkles,
      title: "Balanced Crossbreeding",
      description:
        "Crossbreeding can improve performance via hybrid vigor, but needs a plan to avoid losing important traits.",
    },
    {
      icon: Scan,
      title: "Records & Evaluation",
      description:
        "Without records (AI date, bull code, calving data), you cannot measure genetic progress or fix problems.",
    },
  ];

  const faq: Faq[] = [
    {
      q: "Is this page selling semen?",
      a: "No. This page is educational. It explains semen samples (straw doses), quality parameters, storage, and genetics planning.",
    },
    {
      q: "What does post-thaw motility mean?",
      a: "It refers to sperm movement after the straw is thawed. It helps indicate whether freezing/storage/handling preserved quality.",
    },
    {
      q: "What does sex-sorted semen accuracy mean?",
      a: "It indicates the expected probability that the calf will be female. Guidelines define target accuracy, but outcomes still depend on cow fertility and handling.",
    },
    {
      q: "Why do farmers get poor conception even with good semen?",
      a: "Most common reasons are wrong timing (heat detection), poor thawing/handling, nutrition/BCS issues, and infections or uterine health problems.",
    },
  ];

  const activeMetrics = useMemo(() => {
    if (tab === "Standards") return indiaStandards;
    if (tab === "Semen") return semenBasics;
    return breedingBasics;
  }, [tab, indiaStandards, semenBasics, breedingBasics]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const BulletItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed min-h-[48px] sm:min-h-[52px] font-sans">
      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-[2px]" />
      <span className="flex-1">{text}</span>
    </li>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Hero */}
      <section className="relative min-h-[520px] md:min-h-[600px] h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="./img/gene1.jpeg"
            alt="Genetics & AI"
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* ✅ FIX: overlay was too strong; lighten it so pastel greens pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-white space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-4 py-2 rounded-full text-emerald-300 font-semibold tracking-wide uppercase text-[10px] sm:text-xs font-sans">
              <Dna className="h-4 w-4" />
              <span>Genetics • Semen Samples • AI • Quality</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-semibold leading-tight tracking-tight">
              <span className="text-white/80">
                Genetics & Semen
              </span>
              <br />
              <span
                className="
      text-transparent bg-clip-text bg-gradient-to-r
      from-emerald-100 via-green-100 to-emerald-200
    "
              >
                Explained Simply
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl font-sans">
              Verdant Impact’s premium guide to semen samples (straws), quality testing, cryo handling,
              and genetics planning — built for real farm outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none rounded-xl h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-sans"
                onClick={() => scrollTo("numbers")}
              >
                Know the Numbers
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-sm rounded-xl h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-sans"
                onClick={() => scrollTo("straw")}
              >
                Semen Sample (Straw) Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-7 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground leading-tight">
                  Why Quality + Planning Matters
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg font-sans">
                  AI works when semen meets minimum quality, cold-chain is respected, and breeding is goal-based.
                  This page helps farmers understand what to look for and how to handle it correctly.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {valueProps.map((prop, i) => {
                  const Icon = prop.icon;
                  return (
                    <motion.div
                      key={prop.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif font-semibold tracking-tight text-base sm:text-lg text-foreground">
                          {prop.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                          {prop.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[4/3] sm:aspect-video lg:aspect-square">
                <img
                  src="./img/gene3.jpeg"
                  alt="Modern livestock"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden lg:block max-w-xs">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <Microscope className="h-7 w-7" />
                  <span className="font-serif font-semibold tracking-tight text-lg">Field Reality</span>
                </div>
                <p className="text-sm text-muted-foreground italic font-sans">
                  “Good semen + wrong timing = poor results. Heat detection and handling matter.”
                </p>
                <p className="text-xs font-bold mt-2 font-sans">— Verdant Notes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Know the Numbers */}
      <section id="numbers" className="py-16 sm:py-20 md:py-24 bg-slate-50">
        <div className="container-custom px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 md:mb-12 gap-5 md:gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
                Know the Numbers
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
                Standards • Semen • Breeding
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg font-sans">
                A premium snapshot of key concepts. Use the tabs to switch the focus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {(["Standards", "Semen", "Breeding"] as const).map((t) => (
                <Button
                  key={t}
                  variant="outline"
                  onClick={() => setTab(t)}
                  className={[
                    "rounded-xl border-slate-200 bg-white w-full sm:w-auto font-sans",
                    tab === t ? "border-primary text-primary" : "",
                  ].join(" ")}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <Card className="border-none rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Droplets className="h-6 w-6" />
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold tracking-tight">
                    {tab === "Standards"
                      ? "Quality Benchmarks Snapshot"
                      : tab === "Semen"
                        ? "Semen Quality Basics"
                        : "Breeding Success Basics"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl bg-slate-50 border border-slate-100 p-5"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground font-sans">
                        {m.label}
                      </p>
                      <p className="text-xl font-bold text-foreground mt-1 font-sans">{m.value}</p>
                      <p className="text-sm text-muted-foreground mt-1 font-sans">{m.hint}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-emerald-700 mt-0.5" />
                    <p className="text-sm text-emerald-800 leading-relaxed font-sans">
                      Benchmarks help ensure minimum quality. Final results still depend on timing, handling,
                      cow health, and nutrition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <ClipboardList className="h-6 w-6" />
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold tracking-tight">
                    Verdant Field Checklist
                  </h3>
                </div>

                <ul className="space-y-3">
                  {[
                    "Confirm heat signs and do AI at the right time window.",
                    "Thaw properly as per technician/provider instructions.",
                    "Keep tools warm, dry and clean.",
                    "Record cow ID, AI time, semen code, outcome.",
                    "Review outcomes and improve next cycle.",
                  ].map((item) => (
                    <BulletItem key={item} text={item} />
                  ))}
                </ul>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-slate-200 bg-white font-sans"
                    onClick={() => scrollTo("workflow")}
                  >
                    See the Quality Workflow <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Semen Sample (Straw) Section */}
      <section id="straw" className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
              Semen Sample Guide
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              Semen Sample (Straw)
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              What a “semen dose” is, what the label means, and how handling affects results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
            {strawExplained.map((step) => (
              <Card
                key={step.title}
                className="border-none rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-slate-50"
              >
                <CardContent className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    {step.title.includes("label") ? (
                      <Tags className="h-5 w-5" />
                    ) : step.title.includes("Storage") ? (
                      <Snowflake className="h-5 w-5" />
                    ) : step.title.includes("Types") ? (
                      <TestTubeDiagonal className="h-5 w-5" />
                    ) : (
                      <Beaker className="h-5 w-5" />
                    )}
                    <h3 className="font-serif font-semibold tracking-tight text-base sm:text-lg text-foreground">
                      {step.title}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {step.points.map((p) => (
                      <BulletItem key={p} text={p} />
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 md:mt-12 rounded-[28px] border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Info className="h-6 w-6 text-primary mt-0.5" />
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-serif font-semibold tracking-tight text-foreground">
                  Quick note: “Semen sample” ≠ “guaranteed pregnancy”
                </h3>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-sans">
                  Even high-quality frozen semen can fail if heat detection is wrong, thawing is incorrect,
                  or cow health/nutrition is poor. Always follow technician guidance and record outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genetics pillars */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
              Genetics
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              Genetics That Fits Your Goal
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              Pick the goal first, then select genetics that supports it. Random selection is slow and expensive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {geneticsPillars.map((p) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.title}
                  className="border-none rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white"
                >
                  <CardContent className="p-7 sm:p-8 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-semibold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{p.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality workflow */}
      <section id="workflow" className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
              Quality Assurance
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              From Collection to Conception
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              A practical chain of steps — hygiene, processing discipline, post-thaw checks, and on-farm handling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
            {qualityWorkflow.map((step) => (
              <Card
                key={step.title}
                className="border-none rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-slate-50"
              >
                <CardContent className="p-6 sm:p-7 space-y-4">
                  <h3 className="font-serif font-semibold tracking-tight text-base sm:text-lg text-foreground">
                    {step.title}
                  </h3>
                  <ul className="space-y-3">
                    {step.points.map((p) => (
                      <BulletItem key={p} text={p} />
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 md:mt-14 relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <img
                src="./img/gene2.jpeg"
                className="w-full h-full object-cover"
                alt="Breeding support"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/85 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-900/40 to-transparent" />
            </div>

            <div className="relative z-10 px-5 sm:px-8 py-12 sm:py-16 md:p-24 text-white">
              <div className="max-w-3xl space-y-5 sm:space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-widest font-sans">
                  Verdant Learning
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold tracking-tight italic leading-tight">
                  Make Quality Visible
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-white/85 font-sans leading-relaxed">
                  Use the straw guide + standards snapshot + field checklist to reduce common mistakes and
                  improve AI outcomes.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base sm:text-lg font-sans"
                    onClick={() => scrollTo("straw")}
                  >
                    Read Straw Guide
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base sm:text-lg font-sans"
                    onClick={() => scrollTo("faq")}
                  >
                    Read FAQ
                  </Button>

                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-2xl bg-white text-primary hover:bg-emerald-50 border-none font-bold text-base sm:text-lg shadow-xl font-sans"
                    >
                      Contact
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 md:py-24 bg-slate-50">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              Genetics & Semen — Common Questions
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              Straight answers, farmer-friendly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {faq.map((item) => (
              <Card
                key={item.q}
                className="border-none rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white"
              >
                <CardContent className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <h3 className="text-base sm:text-lg font-serif font-semibold tracking-tight text-foreground">
                      {item.q}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pt-8">
            <Button
              variant="outline"
              className="w-full rounded-xl border-slate-200 bg-white font-sans"
              onClick={() => scrollTo("numbers")}
            >
              Back to Know the Numbers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
