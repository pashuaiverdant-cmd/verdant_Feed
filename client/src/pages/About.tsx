import {
  Award,
  Users,
  Leaf,
  ShieldCheck,
  Sparkles,
  Beaker,
  LineChart,
  Tractor,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Quality First",
      desc: "We never compromise on ingredients or formulation consistency — results should be predictable.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      desc: "We support eco-friendly practices that protect soil health and long-term farm productivity.",
    },
    {
      icon: Users,
      title: "Community",
      desc: "We grow with farmers — sharing knowledge, fair pricing, and practical feeding guidance.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      desc: "Transparent labeling, honest claims, and clear nutrition — no marketing tricks.",
    },
  ];

  const highlights = [
    {
      icon: Beaker,
      title: "Science-backed nutrition",
      desc: "Balanced energy, protein, minerals, and fiber — designed for digestion and immunity.",
    },
    {
      icon: LineChart,
      title: "Consistent performance",
      desc: "Ingredient checks and batch consistency so farmers get reliable outcomes every time.",
    },
    {
      icon: Tractor,
      title: "Farmer-first support",
      desc: "Feeding routines, seasonal tips, and diet planning help — beyond just selling bags.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "The beginning",
      desc: "We started by listening to farmers — focusing on real problems like low yield, weak immunity, and inconsistent growth.",
    },
    {
      year: "2021–2023",
      title: "Smarter formulas",
      desc: "We refined mixes for digestibility, mineral balance, and seasonal needs — improving consistency across batches.",
    },
    {
      year: "2024–Now",
      title: "Scaling farmer success",
      desc: "We expanded support with diet planning and practical guidance to help improve productivity with less waste.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Research & formulation",
      desc: "We design balanced nutrition with a focus on digestion, immunity, and productivity.",
    },
    {
      step: "02",
      title: "Ingredient quality",
      desc: "We prioritize clean, consistent inputs to reduce variability and keep results stable.",
    },
    {
      step: "03",
      title: "Farmer support",
      desc: "We help farmers choose the right feed and routine based on real livestock goals.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Hero */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container-custom relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              Premium livestock nutrition • Since 2020
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-display font-bold tracking-tight">
              About Verdant Feed
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-primary-foreground/90">
              We build feed that farmers can trust — scientifically formulated for stronger immunity,
              better digestion, and higher productivity.
            </p>

            {/* Trust bar */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-white/15 bg-white/10 p-6">
              {[
                { label: "Serving since", value: "2020" },
                { label: "Farmers supported", value: "1M+" },
                { label: "Livestock types", value: "3+" },
                { label: "Transparent labeling", value: "100%" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                  <div className="text-sm text-primary-foreground/80">{s.label}</div>
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
            alt="Farmer in field"
            className="rounded-2xl shadow-xl w-full"
          />

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">
              Better nutrition. Better livestock. Better farms.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              At Verdant Feed, we believe healthy livestock is the foundation of a thriving farm.
              Our mission is to provide scientifically formulated feed that supports growth,
              immunity, and productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom grid md:grid-cols-3 gap-8">
          {highlights.map((h, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-border">
              <h.icon className="h-7 w-7 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">{h.title}</h3>
              <p className="text-muted-foreground">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-custom grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-border text-center">
              <value.icon className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom space-y-10">
          {timeline.map((t, i) => (
            <div key={i}>
              <p className="text-primary font-semibold">{t.year}</p>
              <h3 className="text-xl font-bold">{t.title}</h3>
              <p className="text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-3 gap-8">
          {process.map((p, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold mb-3">
                Step {p.step} — {p.title}
              </h3>
              <p className="text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">
            Let’s build a healthier farm — together.
          </h2>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-white font-semibold"
            >
              Explore Products <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/diet-planner"
              className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 font-semibold"
            >
              Try Diet Planner
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}