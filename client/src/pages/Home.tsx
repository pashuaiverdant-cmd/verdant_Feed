import {
  ArrowRight,
  Star,
  TrendingUp,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Droplets,
  Leaf,
  ClipboardList,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

/* 🔁 HERO MOVING BANNER IMAGES */
const heroImages = ["/img/feed1.jpeg", "/img/feed4.jpeg", "/img/feed5.jpeg", "/img/feed6.jpeg"];

/* ✅ STATIC BEST PRACTICES (NO IMAGES) */
const bestPractices = [
  {
    id: "bp1",
    title: "Balanced Feeding Routine",
    summary:
      "Build a steady ration using dry fodder + green fodder + concentrate as per weight and milk yield. Avoid sudden changes.",
    tag: "Nutrition",
    icon: Leaf,
    points: ["Fixed feeding time daily", "Ration balance by yield", "Store feed dry & clean"],
  },
  {
    id: "bp2",
    title: "Clean Water Access (24/7)",
    summary:
      "Clean water supports digestion, immunity, and milk production. Dehydration quickly reduces intake and output.",
    tag: "Hydration",
    icon: Droplets,
    points: ["Wash trough daily", "Shade near water", "Check smell & dirt daily"],
  },
  {
    id: "bp3",
    title: "Vaccination + Deworming Plan",
    summary:
      "Prevention is cheaper than treatment. Follow a local vet calendar and keep a simple record for every animal.",
    tag: "Health",
    icon: ShieldCheck,
    points: ["Maintain records", "Seasonal deworming", "Vet-guided schedule"],
  },
  {
    id: "bp4",
    title: "Clean Shed & Hygiene",
    summary:
      "Dry bedding and ventilation reduce stress and infections. Comfort improves productivity and fertility.",
    tag: "Hygiene",
    icon: ClipboardList,
    points: ["Daily dung removal", "Dry bedding", "Airflow + sunlight"],
  },
];

const quickTips = [
  { title: "Mineral Mix", desc: "Daily mineral mix helps immunity and milk yield." },
  { title: "Salt Lick", desc: "Improves appetite and electrolyte balance." },
  { title: "Clean Milking", desc: "Wash udder & hands to reduce mastitis risk." },
  { title: "Heat Stress", desc: "Shade + ventilation keeps intake and production stable." },
  { title: "Early Signs", desc: "Low appetite + dullness = check temperature and vet." },
  { title: "Record Keeping", desc: "Track feed, milk, vaccine dates for smart decisions." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.08 * i },
  }),
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32">
        {/* Soft Verdant glow */}
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/15">
                <Star className="mr-1.5 h-4 w-4 fill-white/80 text-white/80" />
                Verdant-grade Nutrition
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                Nutrition That Grows Your Livestock
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-lg">
                Science-backed feeding practices to improve animal health, growth, and yield — consistently.
              </p>

              {/* ✅ Buttons back as before */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/diet-planner">
                  <Button size="lg" className="text-lg px-8 bg-accent text-primary font-bold">
                    Plan a Diet <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 border-white/30 text-white hover:bg-white/10"
                  >
                    Browse Feed
                  </Button>
                </Link>
              </div>

              {/* Minimal “premium” trust chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Field-tested", "Vet-friendly", "Simple routines", "Better yield"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 text-white/90 px-3 py-1 text-xs ring-1 ring-inset ring-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 🔁 MOVING IMAGE BANNER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="
    relative overflow-hidden rounded-2xl shadow-2xl border border-white/120
    h-[320px] sm:h-[360px] md:h-[520px]
    bg-black/15
  "
            >
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25 z-10" />

              {/* ✅ moving track */}
              <motion.div
                className="absolute inset-0 flex will-change-transform"
                // ✅ IMPORTANT: since we duplicate images, move only HALF the track for a perfect loop
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
              >
                {[...heroImages, ...heroImages].map((img, i) => (
                  <div key={i} className="h-full shrink-0 basis-full md:basis-1/2">
                    <img
                      src={img}
                      alt="Healthy livestock"
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Growth Card (responsive placement) */}
              <div
                className="
      absolute z-20 bg-white/95 backdrop-blur p-5 md:p-6 rounded-xl shadow-xl ring-1 ring-black/5
      left-4 bottom-4 md:-left-6 md:-bottom-6
    "
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Growth Rate</p>
                    <p className="text-xl font-bold">+25% Faster</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Farmer Stories */}
      <section className="py-24 bg-[#d9e0c8]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-primary mb-4">Hear from our Farmers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from farmers who improved animal health and profitability with better nutrition.
            </p>
          </div>

          <FarmerCarousel />
        </div>
      </section>

      {/* ✅ Farming Insights (Premium Verdant Style | NO IMAGES | NO BUTTONS) */}
      <section className="relative py-20 bg-primary/5 overflow-hidden">
        {/* subtle pattern + glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-primary text-sm font-semibold shadow-sm ring-1 ring-primary/10">
              <Sparkles className="h-4 w-4" />
              Verdant Farming Insights
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">
              Better routines. Healthier animals. Higher yield.
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
              High-impact livestock practices in a clean checklist format — easy to follow, easy to repeat.
            </p>
          </div>

          {/* Premium cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bestPractices.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  className="group rounded-3xl border border-primary/10 bg-white/70 backdrop-blur shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  {/* top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary/70 via-accent/60 to-primary/30" />

                  <div className="p-7">
                    {/* Tag */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold ring-1 ring-inset ring-primary/10">
                        {item.tag}
                      </span>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-primary/60" />
                        Daily Practice
                      </div>
                    </div>

                    {/* Title + Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-2xl bg-primary/10 ring-1 ring-inset ring-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-5 h-px w-full bg-primary/10" />

                    {/* Points */}
                    <ul className="space-y-2.5 text-sm text-muted-foreground">
                      {item.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}

            {/* Premium Summary Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={bestPractices.length}
              className="rounded-3xl border border-primary/10 bg-white/80 backdrop-blur shadow-sm overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-accent/70 via-primary/50 to-accent/30" />
              <div className="p-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-semibold ring-1 ring-inset ring-primary/10">
                  <Sparkles className="h-4 w-4" />
                  Verdant Note
                </div>

                <h3 className="text-xl font-bold text-primary mt-4">Consistency beats complexity.</h3>

                <p className="text-muted-foreground mt-2">
                  If you follow feeding timing, clean water, hygiene, and a basic health calendar consistently,
                  you’ll usually see better intake, better health, and more stable yield over time.
                </p>

                <div className="mt-6 rounded-2xl bg-primary/5 p-4 ring-1 ring-inset ring-primary/10">
                  <p className="text-sm text-muted-foreground">
                    Tip: Start with <span className="font-semibold text-primary">one habit</span> today,
                    then add the next habit next week.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Tips (Premium strip) */}
          <div className="mt-14">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <h3 className="text-2xl font-bold text-primary">Quick Tips</h3>
              <p className="text-sm text-muted-foreground">Fast wins you can apply immediately.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickTips.map((t, i) => (
                <motion.div
                  key={t.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  className="rounded-2xl bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition border border-primary/10"
                >
                  <h4 className="font-bold text-foreground mb-1">{t.title}</h4>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Farmer Carousel ---------------- */

const farmers = [
  {
    name: "ममता देवी",
    location: "",
    image: "/img/farmer1.jpeg",
    story:
      "वर्डेन्ट फीड ने न केवल मेरे पशुओं की सेहत सुधारी और दूध का उत्पादन बढ़ाया, बल्कि मेरी आर्थिक स्थिति को भी एक नई मजबूती दी है। आज मैं गर्व के साथ कह सकती हूँ कि मैं आत्मनिर्भर हूँ। अब मेरा लक्ष्य समाज की अन्य महिलाओं को भी जागरूक करना और उन्हें प्रगति की राह पर आगे बढ़ाना है।",
  },
  {
    name: "मदन लाल",
    location: "",
    image: "/img/farmer5.jpeg",
    story:
      "डेयरी के काम में बरसों की मेहनत के बाद भी मैं उस मुनाफे और सुकून की तलाश में था जो अब मिला है। वर्डेन्ट फीड ने मेरे पशुओं का स्वास्थ्य तो सुधारा ही, साथ ही दूध की बेहतरीन क्वालिटी ने बाज़ार में मेरा नाम और दाम दोनों बढ़ा दिए। आज मेरी आमदनी स्थिर है और मैं खुद को एक सफल उद्यमी के रूप में देखता हूँ। अब मेरा संकल्प है कि अपने अनुभव से हर उस किसान भाई की राह आसान करूँ जो सही पोषण की कमी के कारण पीछे रह गया है।",
  },
  {
    name: "जयपाल यादव",
    location: "",
    image: "/img/farmer2.jpeg",
    story:
      "मेहनत तो हम सब दिन-रात करते हैं, पर असली बरकत तब आती है जब पशुओं को वर्डेन्ट फीड जैसा शुद्ध और सही खान-paan मिले। आज मुझे अपने पशुओं की फिक्र करने की जरूरत नहीं पड़ती, उनकी सेहत की हर खबर अब मेरे पास रहती है। मैं तो आत्मनिर्भर बन गया और अपने गाँव की सूरत भी बदल रहा हूँ—अब समय है कि आप भी अपनी किस्मत खुद लिखें! — जयपाल यादव",
  },
];

function FarmerCarousel() {
  const [index, setIndex] = useState(0);
  const farmer = farmers[index];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col md:flex-row gap-10">
        <img
          src={farmer.image}
          alt={farmer.name}
          className="w-full md:w-1/3 h-[280px] rounded-2xl object-cover"
        />

        <div className="relative md:w-2/3">

          <p className="text-lg text-muted-foreground mb-6">{farmer.story}</p>

          <h4 className="text-xl font-bold text-primary">{farmer.name}</h4>
          <p className="text-sm text-muted-foreground">{farmer.location}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setIndex((index - 1 + farmers.length) % farmers.length)}
          className="p-2 rounded-full border"
        >
          <ChevronLeft />
        </button>

        <span className="text-sm">
          {index + 1} / {farmers.length}
        </span>

        <button
          onClick={() => setIndex((index + 1) % farmers.length)}
          className="p-2 rounded-full border"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}