import {
  Award,
  Users,
  Leaf,
  ShieldCheck,
  Sparkles,
  Beaker,
  LineChart,
  Tractor,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const brandFeed = t("brand.verdantFeed", "Verdant Feed");

  const values = [
    {
      icon: Award,
      title: t("about.values.0.title", "Quality First"),
      desc: t(
        "about.values.0.desc",
        "We never compromise on ingredients or formulation consistency — results should be predictable."
      ),
    },
    {
      icon: Leaf,
      title: t("about.values.1.title", "Sustainability"),
      desc: t(
        "about.values.1.desc",
        "We support eco-friendly practices that protect soil health and long-term farm productivity."
      ),
    },
    {
      icon: Users,
      title: t("about.values.2.title", "Community"),
      desc: t(
        "about.values.2.desc",
        "We grow with farmers — sharing knowledge, fair pricing, and practical feeding guidance."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("about.values.3.title", "Integrity"),
      desc: t(
        "about.values.3.desc",
        "Transparent labeling, honest claims, and clear nutrition — no marketing tricks."
      ),
    },
  ];

  const highlights = [
    {
      icon: Beaker,
      title: t("about.highlights.0.title", "Science-backed nutrition"),
      desc: t(
        "about.highlights.0.desc",
        "Balanced energy, protein, minerals, and fiber — designed for digestion and immunity."
      ),
    },
    {
      icon: LineChart,
      title: t("about.highlights.1.title", "Consistent performance"),
      desc: t(
        "about.highlights.1.desc",
        "Ingredient checks and batch consistency so farmers get reliable outcomes every time."
      ),
    },
    {
      icon: Tractor,
      title: t("about.highlights.2.title", "Farmer-first support"),
      desc: t(
        "about.highlights.2.desc",
        "Feeding routines, seasonal tips, and diet planning help — beyond just selling bags."
      ),
    },
  ];

  const timeline = [
    {
      year: t("about.timeline.0.year", "2020"),
      title: t("about.timeline.0.title", "The beginning"),
      desc: t(
        "about.timeline.0.desc",
        "We started by listening to farmers — focusing on real problems like low yield, weak immunity, and inconsistent growth."
      ),
    },
    {
      year: t("about.timeline.1.year", "2021–2023"),
      title: t("about.timeline.1.title", "Smarter formulas"),
      desc: t(
        "about.timeline.1.desc",
        "We refined mixes for digestibility, mineral balance, and seasonal needs — improving consistency across batches."
      ),
    },
    {
      year: t("about.timeline.2.year", "2024–Now"),
      title: t("about.timeline.2.title", "Scaling farmer success"),
      desc: t(
        "about.timeline.2.desc",
        "We expanded support with diet planning and practical guidance to help improve productivity with less waste."
      ),
    },
  ];

  const process = [
    {
      step: "01",
      title: t("about.process.0.title", "Research & formulation"),
      desc: t(
        "about.process.0.desc",
        "We design balanced nutrition with a focus on digestion, immunity, and productivity."
      ),
    },
    {
      step: "02",
      title: t("about.process.1.title", "Ingredient quality"),
      desc: t(
        "about.process.1.desc",
        "We prioritize clean, consistent inputs to reduce variability and keep results stable."
      ),
    },
    {
      step: "03",
      title: t("about.process.2.title", "Farmer support"),
      desc: t(
        "about.process.2.desc",
        "We help farmers choose the right feed and routine based on real livestock goals."
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Premium Hero */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container-custom relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-sans">
              <Sparkles className="h-4 w-4" />
              {t("about.hero.badge", "Premium livestock nutrition • Since 2020")}
            </div>

            {/* ✅ About page: brand SHOULD translate */}
            <h1 className="mt-6 text-4xl md:text-6xl font-serif font-semibold tracking-tight">
              {t("about.hero.titlePrefix", "About")} {brandFeed}
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-primary-foreground/90 font-sans">
              {t(
                "about.hero.subtitle",
                "We build feed that farmers can trust — scientifically formulated for stronger immunity, better digestion, and higher productivity."
              )}
            </p>

            {/* Trust bar */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-white/15 bg-white/10 p-6">
              {[
                {
                  label: t("about.stats.0.label", "Serving since"),
                  value: t("about.stats.0.value", "2020"),
                },
                {
                  label: t("about.stats.1.label", "Farmers supported"),
                  value: t("about.stats.1.value", "1M+"),
                },
                {
                  label: t("about.stats.2.label", "Livestock types"),
                  value: t("about.stats.2.value", "3+"),
                },
                {
                  label: t("about.stats.3.label", "Transparent labeling"),
                  value: t("about.stats.3.value", "100%"),
                },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold font-sans">
                    {s.value}
                  </div>
                  <div className="text-sm text-primary-foreground/80 font-sans">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
          <img
            src="/img/img13.jpg"
            alt={t("about.mission.imageAlt", "Farmer in field")}
            className="rounded-2xl shadow-xl w-full"
          />

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-primary">
              {t(
                "about.mission.title",
                "Better nutrition. Better livestock. Better farms."
              )}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed font-sans">
              {t(
                "about.mission.body",
                `At ${brandFeed}, we believe healthy livestock is the foundation of a thriving farm. Our mission is to provide scientifically formulated feed that supports growth, immunity, and productivity.`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-primary text-center mb-10">
            {t("about.sections.highlights", "What makes us different")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-border"
              >
                <h.icon className="h-7 w-7 text-primary mb-4" />
                <h3 className="text-xl font-serif font-semibold tracking-tight mb-3">
                  {h.title}
                </h3>
                <p className="text-muted-foreground font-sans">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-primary text-center mb-10">
            {t("about.sections.values", "Our values")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-border text-center"
              >
                <value.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-serif font-semibold tracking-tight mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-sans">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-primary text-center mb-10">
            {t("about.sections.journey", "Our journey")}
          </h2>

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div key={i}>
                <p className="text-primary font-semibold font-sans">{item.year}</p>
                <h3 className="text-xl font-serif font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-primary text-center mb-10">
            {t("about.sections.process", "How we work")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((p, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-border"
              >
                <h3 className="text-xl font-serif font-semibold tracking-tight mb-3">
                  {t("about.process.stepPrefix", "Step")} {p.step} — {p.title}
                </h3>
                <p className="text-muted-foreground font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-primary">
            {t("about.cta.title", "Let’s build a healthier farm — together.")}
          </h2>

          <p className="mt-3 text-muted-foreground font-sans">
            {t(
              "about.cta.subtitle",
              "Explore products or generate a diet plan in minutes."
            )}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-white font-semibold font-sans"
            >
              {t("about.cta.primary", "Explore Products")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/diet-planner"
              className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 font-semibold font-sans"
            >
              {t("about.cta.secondary", "Try Diet Planner")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}