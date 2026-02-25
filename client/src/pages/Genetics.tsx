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
import { useTranslation } from "react-i18next";

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

type StrawStep = Step & {
  iconKey: "what" | "label" | "types" | "storage" | "thawing";
};

type Faq = {
  q: string;
  a: string;
};

type TabKey = "standards" | "semen" | "breeding";

export default function Genetics() {
  // ✅ IMPORTANT: make sure this page reads from common.json
  const { t } = useTranslation("common");

  const [tab, setTab] = useState<TabKey>("standards");

  // ✅ Brand keys (now translatable as you asked)
  const BRAND = {
    verdant: t("brand.verdant"),
    verdantFeed: t("brand.verdantFeed"),
    verdantImpact: t("brand.verdantImpact"),
    verdantNotes: t("brand.verdantNotes"),
  } as const;

  const indiaStandards: Metric[] = [
    {
      label: t(
        "genetics.metrics.standards.initialMotility.label",
        "Initial progressive motility"
      ),
      value: t("genetics.metrics.standards.initialMotility.value", "≥ 70%"),
      hint: t(
        "genetics.metrics.standards.initialMotility.hint",
        "Minimum benchmark for semen selection for processing (India MSP)."
      ),
    },
    {
      label: t(
        "genetics.metrics.standards.postThawMotility.label",
        "Post-thaw progressive motility"
      ),
      value: t("genetics.metrics.standards.postThawMotility.value", "≥ 50%"),
      hint: t(
        "genetics.metrics.standards.postThawMotility.hint",
        "Minimum post-thaw benchmark for dose acceptance (India MSP)."
      ),
    },
    {
      label: t(
        "genetics.metrics.standards.doseConcentration.label",
        "Dose concentration"
      ),
      value: t(
        "genetics.metrics.standards.doseConcentration.value",
        "≥ 20 million"
      ),
      hint: t(
        "genetics.metrics.standards.doseConcentration.hint",
        "Minimum sperm count per frozen semen dose referenced in MSP."
      ),
    },
    {
      label: t("genetics.metrics.standards.sexSorted.label", "Sex-sorted semen"),
      value: t("genetics.metrics.standards.sexSorted.value", "≈ 90% accuracy"),
      hint: t(
        "genetics.metrics.standards.sexSorted.hint",
        "Operational guidelines specify ~90% sex accuracy target."
      ),
    },
  ];

  const semenBasics: Metric[] = [
    {
      label: t("genetics.metrics.semen.motility.label", "Motility"),
      value: t("genetics.metrics.semen.motility.value", "Movement"),
      hint: t(
        "genetics.metrics.semen.motility.hint",
        "Forward progressive movement matters most."
      ),
    },
    {
      label: t("genetics.metrics.semen.morphology.label", "Morphology"),
      value: t("genetics.metrics.semen.morphology.value", "Structure"),
      hint: t(
        "genetics.metrics.semen.morphology.hint",
        "Normal forms vs abnormalities."
      ),
    },
    {
      label: t("genetics.metrics.semen.viability.label", "Viability"),
      value: t("genetics.metrics.semen.viability.value", "Live %"),
      hint: t(
        "genetics.metrics.semen.viability.hint",
        "Live/dead ratio is handling-sensitive."
      ),
    },
    {
      label: t("genetics.metrics.semen.hygiene.label", "Hygiene"),
      value: t("genetics.metrics.semen.hygiene.value", "Critical"),
      hint: t(
        "genetics.metrics.semen.hygiene.hint",
        "Contamination reduces field success."
      ),
    },
  ];

  const breedingBasics: Metric[] = [
    {
      label: t("genetics.metrics.breeding.heat.label", "Heat detection"),
      value: t("genetics.metrics.breeding.heat.value", "Top factor"),
      hint: t(
        "genetics.metrics.breeding.heat.hint",
        "Wrong timing is a major failure reason."
      ),
    },
    {
      label: t("genetics.metrics.breeding.thawing.label", "Thawing discipline"),
      value: t("genetics.metrics.breeding.thawing.value", "Must follow"),
      hint: t(
        "genetics.metrics.breeding.thawing.hint",
        "Avoid temperature shock."
      ),
    },
    {
      label: t("genetics.metrics.breeding.bcs.label", "Cow condition"),
      value: t("genetics.metrics.breeding.bcs.value", "BCS matters"),
      hint: t(
        "genetics.metrics.breeding.bcs.hint",
        "Nutrition strongly affects fertility."
      ),
    },
    {
      label: t("genetics.metrics.breeding.records.label", "Records"),
      value: t("genetics.metrics.breeding.records.value", "Essential"),
      hint: t(
        "genetics.metrics.breeding.records.hint",
        "Track AI date, bull code, outcome."
      ),
    },
  ];

  const valueProps: ValueProp[] = [
    {
      icon: FlaskConical,
      title: t("genetics.valueProps.qa.title", "Semen Quality Assurance"),
      description: t(
        "genetics.valueProps.qa.desc",
        "Benchmarks define what “acceptable” looks like — motility checks, post-thaw testing, hygiene and batch rejection rules."
      ),
    },
    {
      icon: Thermometer,
      title: t("genetics.valueProps.cryo.title", "Cryo Chain Discipline"),
      description: t(
        "genetics.valueProps.cryo.desc",
        "Frozen semen is sensitive to temperature shock. Correct thawing and warm, dry equipment protect viability."
      ),
    },
    {
      icon: ShieldCheck,
      title: t(
        "genetics.valueProps.planning.title",
        "Genetic Improvement (Planned)"
      ),
      description: t(
        "genetics.valueProps.planning.desc",
        "Breeding works when you define a goal → select strategy → match cows → keep records → refine season by season."
      ),
    },
  ];

  const qualityWorkflow: Step[] = [
    {
      title: t("genetics.workflow.1.title", "1) Selection for Processing"),
      points: [
        t(
          "genetics.workflow.1.p1",
          "Semen chosen should meet minimum initial progressive motility benchmark."
        ),
        t(
          "genetics.workflow.1.p2",
          "Controlled handling from collection to lab reduces damage and contamination."
        ),
      ],
    },
    {
      title: t("genetics.workflow.2.title", "2) Sterile Filling & Sealing"),
      points: [
        t(
          "genetics.workflow.2.p1",
          "Filling/sealing under Laminar Air Flow; sterile straws and disposables."
        ),
        t("genetics.workflow.2.p2", "Strict cleaning protocols reduce microbial risk."),
      ],
    },
    {
      title: t("genetics.workflow.3.title", "3) Freezing & Post-Thaw Checks"),
      points: [
        t(
          "genetics.workflow.3.p1",
          "Post-thaw progressive motility checked; low-quality batches discarded."
        ),
        t(
          "genetics.workflow.3.p2",
          "Batch sampling helps detect process issues early."
        ),
      ],
    },
    {
      title: t("genetics.workflow.4.title", "4) Microbial Control"),
      points: [
        t(
          "genetics.workflow.4.p1",
          "Random batch sampling for microbial quality; discards if limits exceeded."
        ),
        t(
          "genetics.workflow.4.p2",
          "Hygiene failures can reduce fertility and field success."
        ),
      ],
    },
    {
      title: t("genetics.workflow.5.title", "5) On-Farm Success Layer"),
      points: [
        t("genetics.workflow.5.p1", "Heat detection + correct timing drives results."),
        t("genetics.workflow.5.p2", "Thawing mistakes can destroy good semen."),
      ],
    },
  ];

  // IMPORTANT FIX:
  // Do NOT choose icons by searching translated titles (that breaks in Hindi).
  // Use explicit iconKey.
  const strawExplained: StrawStep[] = [
    {
      iconKey: "what",
      title: t("genetics.straw.what.title", "What is a semen sample (straw)?"),
      points: [
        t(
          "genetics.straw.what.p1",
          "A straw is a sealed dose of semen prepared for AI (artificial insemination)."
        ),
        t(
          "genetics.straw.what.p2",
          "It is processed, diluted/extended, frozen and stored in liquid nitrogen for long-term use."
        ),
        t(
          "genetics.straw.what.p3",
          "It is identified by a label code for traceability and records."
        ),
      ],
    },
    {
      iconKey: "label",
      title: t(
        "genetics.straw.label.title",
        "What’s usually on the label (traceability)"
      ),
      points: [
        t(
          "genetics.straw.label.p1",
          "Bull/Sire ID or Code, breed, semen station or lab code"
        ),
        t("genetics.straw.label.p2", "Batch/collection date, straw/dose number"),
        t(
          "genetics.straw.label.p3",
          "Sometimes: quality info or certification references"
        ),
      ],
    },
    {
      iconKey: "types",
      title: t("genetics.straw.types.title", "Types you’ll hear in India"),
      points: [
        t("genetics.straw.types.p1", "Conventional frozen semen (general use)"),
        t(
          "genetics.straw.types.p2",
          "Sex-sorted frozen semen (higher probability of female calf births; accuracy targets apply)"
        ),
        t(
          "genetics.straw.types.p3",
          "Breed improvement vs field/balanced use based on program goals"
        ),
      ],
    },
    {
      iconKey: "storage",
      title: t("genetics.straw.storage.title", "Storage & transport basics"),
      points: [
        t(
          "genetics.straw.storage.p1",
          "Stored in LN2 containers; keep canister time outside minimal"
        ),
        t("genetics.straw.storage.p2", "Avoid repeated warming/cooling cycles"),
        t(
          "genetics.straw.storage.p3",
          "Maintain inventory: bull code → cow ID → AI date → outcome"
        ),
      ],
    },
    {
      iconKey: "thawing",
      title: t(
        "genetics.straw.thawing.title",
        "Thawing & handling (farmer checklist)"
      ),
      points: [
        t(
          "genetics.straw.thawing.p1",
          "Follow the exact thawing method recommended by your provider/technician"
        ),
        t(
          "genetics.straw.thawing.p2",
          "Keep gun + sheath dry; avoid cold metal contact"
        ),
        t(
          "genetics.straw.thawing.p3",
          "Load quickly and inseminate at the correct time window"
        ),
      ],
    },
  ];

  const geneticsPillars: ValueProp[] = [
    {
      icon: Dna,
      title: t("genetics.pillars.goal.title", "Goal-based Selection"),
      description: t(
        "genetics.pillars.goal.desc",
        "Choose genetics for your goal: milk yield, fat/SNF, fertility, calving ease, disease resistance, growth — not random."
      ),
    },
    {
      icon: Sparkles,
      title: t("genetics.pillars.cross.title", "Balanced Crossbreeding"),
      description: t(
        "genetics.pillars.cross.desc",
        "Crossbreeding can improve performance via hybrid vigor, but needs a plan to avoid losing important traits."
      ),
    },
    {
      icon: Scan,
      title: t("genetics.pillars.records.title", "Records & Evaluation"),
      description: t(
        "genetics.pillars.records.desc",
        "Without records (AI date, bull code, calving data), you cannot measure genetic progress or fix problems."
      ),
    },
  ];

  const faq: Faq[] = [
    {
      q: t("genetics.faq.q1.q", "Is this page selling semen?"),
      a: t(
        "genetics.faq.q1.a",
        "No. This page is educational. It explains semen samples (straw doses), quality parameters, storage, and genetics planning."
      ),
    },
    {
      q: t("genetics.faq.q2.q", "What does post-thaw motility mean?"),
      a: t(
        "genetics.faq.q2.a",
        "It refers to sperm movement after the straw is thawed. It helps indicate whether freezing/storage/handling preserved quality."
      ),
    },
    {
      q: t("genetics.faq.q3.q", "What does sex-sorted semen accuracy mean?"),
      a: t(
        "genetics.faq.q3.a",
        "It indicates the expected probability that the calf will be female. Guidelines define target accuracy, but outcomes still depend on cow fertility and handling."
      ),
    },
    {
      q: t(
        "genetics.faq.q4.q",
        "Why do farmers get poor conception even with good semen?"
      ),
      a: t(
        "genetics.faq.q4.a",
        "Most common reasons are wrong timing (heat detection), poor thawing/handling, nutrition/BCS issues, and infections or uterine health problems."
      ),
    },
  ];

  const activeMetrics = useMemo(() => {
    if (tab === "standards") return indiaStandards;
    if (tab === "semen") return semenBasics;
    return breedingBasics;
  }, [tab, indiaStandards, semenBasics, breedingBasics]);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const BulletItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed min-h-[48px] sm:min-h-[52px] font-sans">
      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-[2px]" />
      <span className="flex-1">{text}</span>
    </li>
  );

  const tabLabel = (key: TabKey) => {
    if (key === "standards") return t("genetics.tabs.standards", "Standards");
    if (key === "semen") return t("genetics.tabs.semen", "Semen");
    return t("genetics.tabs.breeding", "Breeding");
  };

  const StrawIcon = ({ k }: { k: StrawStep["iconKey"] }) => {
    if (k === "label") return <Tags className="h-5 w-5" />;
    if (k === "storage") return <Snowflake className="h-5 w-5" />;
    if (k === "types") return <TestTubeDiagonal className="h-5 w-5" />;
    if (k === "thawing") return <Thermometer className="h-5 w-5" />;
    return <Beaker className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Hero */}
      <section className="relative min-h-[520px] md:min-h-[600px] h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/gene1.jpeg"
            alt={t("genetics.hero.imageAlt", "Genetics & AI")}
            className="w-full h-full object-cover"
            loading="eager"
          />
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
              <span>
                {t("genetics.hero.kicker", "Genetics • Semen Samples • AI • Quality")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-semibold leading-tight tracking-tight">
              <span className="text-white/80">
                {t("genetics.hero.title1", "Genetics & Semen")}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-200">
                {t("genetics.hero.title2", "Explained Simply")}
              </span>
            </h1>

            {/* ✅ Brand now translates (no notranslate) */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl font-sans">
              {BRAND.verdantImpact}{" "}
              {t(
                "genetics.hero.subtitleRest",
                "’s premium guide to semen samples (straws), quality testing, cryo handling, and genetics planning — built for real farm outcomes."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none rounded-xl h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-sans"
                onClick={() => scrollTo("numbers")}
              >
                {t("genetics.hero.cta1", "Know the Numbers")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-sm rounded-xl h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-sans"
                onClick={() => scrollTo("straw")}
              >
                {t("genetics.hero.cta2", "Semen Sample (Straw) Guide")}
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
                  {t("genetics.why.title", "Why Quality + Planning Matters")}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg font-sans">
                  {t(
                    "genetics.why.desc",
                    "AI works when semen meets minimum quality, cold-chain is respected, and breeding is goal-based. This page helps farmers understand what to look for and how to handle it correctly."
                  )}
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
                  src="/img/gene3.jpeg"
                  alt={t("genetics.why.imageAlt", "Modern livestock")}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden lg:block max-w-xs">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <Microscope className="h-7 w-7" />
                  <span className="font-serif font-semibold tracking-tight text-lg">
                    {t("genetics.why.cardTitle", "Field Reality")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic font-sans">
                  {t(
                    "genetics.why.quote",
                    "“Good semen + wrong timing = poor results. Heat detection and handling matter.”"
                  )}
                </p>

                {/* ✅ This is the exact text you showed in screenshot: now it translates */}
                <p className="text-xs font-bold mt-2 font-sans">— {BRAND.verdantNotes}</p>
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
                {t("genetics.numbers.badge", "Know the Numbers")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
                {t("genetics.numbers.title", "Standards • Semen • Breeding")}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg font-sans">
                {t(
                  "genetics.numbers.subtitle",
                  "A premium snapshot of key concepts. Use the tabs to switch the focus."
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {(["standards", "semen", "breeding"] as const).map((k) => (
                <Button
                  key={k}
                  variant="outline"
                  onClick={() => setTab(k)}
                  className={[
                    "rounded-xl border-slate-200 bg-white w-full sm:w-auto font-sans",
                    tab === k ? "border-primary text-primary" : "",
                  ].join(" ")}
                >
                  {tabLabel(k)}
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
                    {tab === "standards"
                      ? t("genetics.numbers.cardTitle.standards", "Quality Benchmarks Snapshot")
                      : tab === "semen"
                      ? t("genetics.numbers.cardTitle.semen", "Semen Quality Basics")
                      : t("genetics.numbers.cardTitle.breeding", "Breeding Success Basics")}
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
                      <p className="text-xl font-bold text-foreground mt-1 font-sans">
                        {m.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 font-sans">
                        {m.hint}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-emerald-700 mt-0.5" />
                    <p className="text-sm text-emerald-800 leading-relaxed font-sans">
                      {t(
                        "genetics.numbers.note",
                        "Benchmarks help ensure minimum quality. Final results still depend on timing, handling, cow health, and nutrition."
                      )}
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
                    {BRAND.verdant} {t("genetics.checklist.titleRest", "Field Checklist")}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {[
                    t("genetics.checklist.i1", "Confirm heat signs and do AI at the right time window."),
                    t("genetics.checklist.i2", "Thaw properly as per technician/provider instructions."),
                    t("genetics.checklist.i3", "Keep tools warm, dry and clean."),
                    t("genetics.checklist.i4", "Record cow ID, AI time, semen code, outcome."),
                    t("genetics.checklist.i5", "Review outcomes and improve next cycle."),
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
                    {t("genetics.checklist.cta", "See the Quality Workflow")}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Straw */}
      <section id="straw" className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
              {t("genetics.straw.badge", "Semen Sample Guide")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              {t("genetics.straw.title", "Semen Sample (Straw)")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              {t(
                "genetics.straw.subtitle",
                "What a “semen dose” is, what the label means, and how handling affects results."
              )}
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
                    <StrawIcon k={step.iconKey} />
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
                  {t(
                    "genetics.straw.noteTitle",
                    "Quick note: “Semen sample” ≠ “guaranteed pregnancy”"
                  )}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-sans">
                  {t(
                    "genetics.straw.noteDesc",
                    "Even high-quality frozen semen can fail if heat detection is wrong, thawing is incorrect, or cow health/nutrition is poor. Always follow technician guidance and record outcomes."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
              {t("genetics.pillars.badge", "Genetics")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              {t("genetics.pillars.title", "Genetics That Fits Your Goal")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              {t(
                "genetics.pillars.subtitle",
                "Pick the goal first, then select genetics that supports it. Random selection is slow and expensive."
              )}
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
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                      {p.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl mb-10 md:mb-12">
            <Badge className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] font-sans">
              {t("genetics.workflow.badge", "Quality Assurance")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              {t("genetics.workflow.title", "From Collection to Conception")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              {t(
                "genetics.workflow.subtitle",
                "A practical chain of steps — hygiene, processing discipline, post-thaw checks, and on-farm handling."
              )}
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
                src="/img/gene2.jpeg"
                className="w-full h-full object-cover"
                alt={t("genetics.cta.imageAlt", "Breeding support")}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/85 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-900/40 to-transparent" />
            </div>

            <div className="relative z-10 px-5 sm:px-8 py-12 sm:py-16 md:p-24 text-white">
              <div className="max-w-3xl space-y-5 sm:space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-widest font-sans">
                  {BRAND.verdant} {t("genetics.cta.badgeRest", "Learning")}
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold tracking-tight italic leading-tight">
                  {t("genetics.cta.title", "Make Quality Visible")}
                </h3>

                <p className="text-base sm:text-lg md:text-xl text-white/85 font-sans leading-relaxed">
                  {t(
                    "genetics.cta.subtitle",
                    "Use the straw guide + standards snapshot + field checklist to reduce common mistakes and improve AI outcomes."
                  )}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base sm:text-lg font-sans"
                    onClick={() => scrollTo("straw")}
                  >
                    {t("genetics.cta.btn1", "Read Straw Guide")}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base sm:text-lg font-sans"
                    onClick={() => scrollTo("faq")}
                  >
                    {t("genetics.cta.btn2", "Read FAQ")}
                  </Button>

                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-2xl bg-white text-primary hover:bg-emerald-50 border-none font-bold text-base sm:text-lg shadow-xl font-sans"
                    >
                      {t("genetics.cta.btn3", "Contact")}
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
              {t("genetics.faq.badge", "FAQ")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
              {t("genetics.faq.title", "Genetics & Semen — Common Questions")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-sans">
              {t("genetics.faq.subtitle", "Straight answers, farmer-friendly.")}
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
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                    {item.a}
                  </p>
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
              {t("genetics.faq.back", "Back to Know the Numbers")}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}