import {
  ArrowRight,
  Star,
  TrendingUp,
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
const heroImages = [
  "/img/feed1.jpeg",
  "/img/feed4.jpeg",
  "/img/feed5.jpeg",
  "/img/feed6.jpeg",
];

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
  { title: "Mineral Mixture", desc: "Daily mineral mix helps immunity and milk yield." },
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
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-12 sm:py-16 md:py-32">
        {/* Soft Verdant glow */}
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* ✅ MOBILE: image first | DESKTOP: text left, image right */}
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
            {/* ✅ MOVING IMAGE BANNER (TOP on mobile) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="
                relative overflow-hidden rounded-2xl shadow-2xl
                border border-white/20 bg-black/15
                order-1 md:order-2
                h-[260px] xs:h-[300px] sm:h-[360px] md:h-[520px]
              "
            >
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 z-10" />

              {/* ✅ moving track (FIXED BG + MULTI IMAGES ON MOBILE + NO GAPS) */}
              <motion.div
                className="absolute inset-0 flex will-change-transform"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
              >
                {[...heroImages, ...heroImages].map((img, i) => (
                  <div
                    key={i}
                    className="
                      relative h-full shrink-0 overflow-hidden
                      basis-1/2 sm:basis-1/3 md:basis-1/2
                    "
                  >
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

              {/* ✅ Growth Card (mobile-friendly) */}
              <div
                className="
                  absolute z-20 bg-white/95 backdrop-blur p-4 sm:p-5 md:p-6 rounded-xl shadow-xl ring-1 ring-black/5
                  left-3 bottom-3 sm:left-4 sm:bottom-4 md:-left-6 md:-bottom-6
                "
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-sans">Growth Rate</p>
                    <p className="text-lg sm:text-xl font-bold font-sans">+25% Faster</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ✅ LEFT CONTENT (below image on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5 sm:space-y-6 order-2 md:order-1"
            >
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/15 font-sans">
                <Star className="mr-1.5 h-4 w-4 fill-white/80 text-white/80" />
                Verdant-grade Nutrition
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold text-white leading-tight tracking-tight">
                Nutrition That Grows Your Livestock
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 max-w-lg font-sans">
                Science-backed feeding practices to improve animal health, growth, and yield — consistently.
              </p>

              {/* ✅ Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
                <Link href="/diet-planner">
                  <Button
                    size="lg"
                    className="text-base sm:text-lg px-6 sm:px-8 bg-accent text-primary font-bold w-full sm:w-auto font-sans"
                  >
                    Plan a Diet <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base sm:text-lg px-6 sm:px-8 border-white/30 text-white hover:bg-white/10 w-full sm:w-auto font-sans"
                  >
                    Browse Feed
                  </Button>
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2 pt-1 sm:pt-2 font-sans">
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
          </div>
        </div>
      </section>

      {/* Farmer Stories */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#d9e0c8]">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-12 md:mb-14 px-2">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-primary mb-3 sm:mb-4 tracking-tight">
              Hear from our Farmers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
              Real stories from farmers who improved animal health and profitability with better nutrition.
            </p>
          </div>

          <FarmerCarousel />
        </div>
      </section>

      {/* ✅ Farming Insights */}
      <section className="relative py-16 sm:py-20 bg-primary/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-10 sm:mb-12 px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-primary text-sm font-semibold shadow-sm ring-1 ring-primary/10 font-sans">
              <Sparkles className="h-4 w-4" />
              Verdant Farming Insights
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-primary mt-4 tracking-tight">
              Better routines. Healthier animals. Higher yield.
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mt-3 font-sans">
              High-impact livestock practices in a clean checklist format — easy to follow, easy to repeat.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="h-1 w-full bg-gradient-to-r from-primary/70 via-accent/60 to-primary/30" />

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold ring-1 ring-inset ring-primary/10 font-sans">
                        {item.tag}
                      </span>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                        <span className="h-2 w-2 rounded-full bg-primary/60" />
                        Daily Practice
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-2xl bg-primary/10 ring-1 ring-inset ring-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-foreground leading-snug tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 font-sans">{item.summary}</p>
                      </div>
                    </div>

                    <div className="my-5 h-px w-full bg-primary/10" />

                    <ul className="space-y-2.5 text-sm text-muted-foreground font-sans">
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

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={bestPractices.length}
              className="rounded-3xl border border-primary/10 bg-white/80 backdrop-blur shadow-sm overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-accent/70 via-primary/50 to-accent/30" />
              <div className="p-6 sm:p-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-semibold ring-1 ring-inset ring-primary/10 font-sans">
                  <Sparkles className="h-4 w-4" />
                  Verdant Note
                </div>

                <h3 className="text-xl font-serif font-semibold text-primary mt-4 tracking-tight">
                  Consistency beats complexity.
                </h3>

                <p className="text-muted-foreground mt-2 font-sans">
                  If you follow feeding timing, clean water, hygiene, and a basic health calendar consistently,
                  you’ll usually see better intake, better health, and more stable yield over time.
                </p>

                <div className="mt-6 rounded-2xl bg-primary/5 p-4 ring-1 ring-inset ring-primary/10">
                  <p className="text-sm text-muted-foreground font-sans">
                    Tip: Start with <span className="font-semibold text-primary">one habit</span> today, then add
                    the next habit next week.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 sm:mt-14">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5 px-1">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-primary tracking-tight">
                Quick Tips
              </h3>
              <p className="text-sm text-muted-foreground font-sans">Fast wins you can apply immediately.</p>
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
                  <h4 className="font-serif font-semibold text-foreground mb-1 tracking-tight">{t.title}</h4>
                  <p className="text-sm text-muted-foreground font-sans">{t.desc}</p>
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
    image: "/img/farmer002.jpeg",
    story:
      "वर्डेन्ट फीड ने न केवल मेरे पशुओं की सेहत सुधारी और दूध का उत्पादन बढ़ाया, बल्कि मेरी आर्थिक स्थिति को भी एक नई मजबूती दी है। आज मैं गर्व के साथ कह सकती हूँ कि मैं आत्मनिर्भर हूँ। अब मेरा लक्ष्य समाज की अन्य महिलाओं को भी जागरूक करना और उन्हें प्रगति की राह पर आगे बढ़ाना है।",
  },
  {
    name: "सतीश कुमार",
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
      "मेहनत तो हम सब दिन-रात करते हैं, पर असली बरकत तब आती है जब पशुओं को वर्डेन्ट फीड जैसा शुद्ध और सही खान-पान मिले। आज मुझे अपने पशुओं की फिक्र करने की जरूरत नहीं पड़ती, उनकी सेहत की हर खबर अब मेरे पास रहती है। मैं तो आत्मनिर्भर बन गया और अपने गाँव की सूरत भी बदल रहा हूँ—अब समय है कि आप भी अपनी किस्मत खुद लिखें! — जयपाल यादव",
  },
  {
    name: "शंभू",
    location: "",
    image: "/img/farmer003.jpeg",
    story:
      "बरसों तक मैंने डेयरी को सिर्फ किस्मत का खेल समझा, पर वर्डेन्ट फीड ने मेरी सोच और मेरे फार्म की सूरत, दोनों बदल दीं। आज न पशुओं की बीमारी का डर है, न दूध घटने की चिंता; क्योंकि मेरे पास उनकी सेहत का सटीक हिसाब और वर्डेन्ट फीड का बेजोड़ पोषण है। इस भरोसे ने मेरी जेब भी भरी और परिवार का भविष्य भी सुरक्षित कर दिया। आज मैं मजबूती में नहीं, बल्कि गर्व से डेयरी चलाता हूँ और चाहता हूँ कि गाँव का हर युवा इस आधुनिक बदलाव का हिस्सा बने।",
  },
];

function FarmerCarousel() {
  const [index, setIndex] = useState(0);
  const farmer = farmers[index];

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-0 font-sans">
      <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
        <img
          src={farmer.image}
          alt={farmer.name}
          className="w-full md:w-1/3 h-[220px] sm:h-[260px] md:h-[280px] rounded-2xl object-cover"
        />

        <div className="relative md:w-2/3">
          <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6 font-sans">
            {farmer.story}
          </p>
          <h4 className="text-lg sm:text-xl font-serif font-semibold text-primary tracking-tight">
            {farmer.name}
          </h4>
          <p className="text-sm text-muted-foreground font-sans">{farmer.location}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6 sm:mt-8">
        <button
          onClick={() => setIndex((index - 1 + farmers.length) % farmers.length)}
          className="p-2 rounded-full border font-sans"
          aria-label="Previous farmer"
        >
          <ChevronLeft />
        </button>

        <span className="text-sm font-sans">
          {index + 1} / {farmers.length}
        </span>

        <button
          onClick={() => setIndex((index + 1) % farmers.length)}
          className="p-2 rounded-full border font-sans"
          aria-label="Next farmer"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
