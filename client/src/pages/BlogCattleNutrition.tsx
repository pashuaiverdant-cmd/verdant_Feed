import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  ClipboardCheck,
  Droplets,
  Leaf,
  ShieldCheck,
  Thermometer,
} from "lucide-react";

const updatedAt = "February 10, 2026";

function SectionTitle({
  icon: Icon,
  kicker,
  title,
  desc,
}: {
  icon: any;
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="rounded-full">
          {kicker || "Verdant Knowledge"}
        </Badge>
        <span className="text-sm text-muted-foreground inline-flex items-center">
          <Calendar className="h-4 w-4 mr-1.5" />
          Updated {updatedAt}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-bold flex items-start gap-3">
        <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <span>{title}</span>
      </h2>
      {desc ? (
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-white p-5 md:p-7 shadow-sm">
      {title ? (
        <h3 className="text-lg md:text-xl font-display font-bold mb-3">
          {title}
        </h3>
      ) : null}
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-disc pl-6 text-foreground/90">
      {items.map((x, i) => (
        <li key={i} className="leading-relaxed">
          {x}
        </li>
      ))}
    </ul>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-semibold px-4 py-3 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-border/60">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogCattleNutrition() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container-custom max-w-5xl space-y-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/blog">
            <Button variant="outline" className="rounded-2xl">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Button>
          </Link>
          <Badge className="rounded-full">Nutrition • Indian dairy</Badge>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border/60 bg-white p-6 md:p-10 shadow-sm"
        >
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Feeding Strategies of Dairy Cattle in India for Good Health & Better Milk Yield
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Feeding is typically the biggest cost in dairying (often ~60–70% of milk
              production cost). The goal is simple: meet maintenance + milk production
              + pregnancy needs without upsetting the rumen.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                Practical thumb-rules
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Stage-wise feeding
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Mineral & vitamin guidance
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                High-yielder strategy (energy/protein)
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: This page is structured in Verdant style using the data you pasted
              from Pashudhan Praharee’s “Feeding Strategies…” article (Technical Team,
              Livestock Institute of Training & Development / “दुग्धवाहिनी”).
            </p>
          </div>
        </motion.div>

        {/* Why feeding matters */}
        <SectionTitle
          icon={Leaf}
          title="Why feeding management decides profit"
          desc="Milk yield, fat %, reproduction, and disease resistance are tightly linked to energy and protein balance—especially in early lactation and late pregnancy."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Key realities on Indian farms">
            <BulletList
              items={[
                "Feed is the largest recurring cost; wastage or imbalance quickly reduces profit.",
                "Roughage quality varies by season; plan fodder crops (legume + non-legume) for year-round supply.",
                "High-yielding cows often face negative energy balance in early lactation—risking metabolic problems and delayed heat.",
                "Rumen health is the ‘engine’: wrong concentrate/roughage balance can cause acidosis and low milk fat.",
              ]}
            />
          </Card>
          <Card title="Daily “non-negotiables”">
            <BulletList
              items={[
                "Clean water 24×7 (water drives dry matter intake).",
                "Consistent feeding times; avoid sudden diet changes.",
                "Adequate fibre (crude fibre often targeted at 20–25% for milch cows).",
                "Mineral mixture + common salt as per recommendation.",
              ]}
            />
          </Card>
        </div>

        {/* Energy */}
        <SectionTitle
          icon={Thermometer}
          kicker="High yielder"
          title="Energy: manage early-lactation negative energy balance"
          desc="Milk peaks at ~4–8 weeks after calving, while dry matter intake often lags until ~10–14 weeks—creating a gap. The cow mobilizes body reserves, increasing risk of metabolic disorders and infertility."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="What goes wrong when energy is low">
            <BulletList
              items={[
                "Lower milk yield and poor persistence.",
                "Extended anovulation/postpartum anestrus (delayed cycling).",
                "Body condition loss → higher disease susceptibility.",
                "Higher chance of metabolic disorders if diet is not adjusted.",
              ]}
            />
          </Card>
          <Card title="Strategy: increase energy density safely">
            <BulletList
              items={[
                "Early lactation: intake is limited → energy density must rise.",
                "Grain can help but high grain raises acidosis risk and can depress milk fat.",
                "Safer option: fat supplementation to raise energy density without excessive grain—prefer rumen-stable/bypass fats.",
                "Avoid feeding unsaturated vegetable oils directly in large amounts (can harm fibre-digesting rumen bacteria).",
              ]}
            />
          </Card>
        </div>

        <Card title="Fat supplementation (bypass/rumen-stable fats) — practical notes">
          <BulletList
            items={[
              "Bypass fats pass rumen with minimal disruption and get digested in lower GI tract.",
              "Rumen-protected (e.g., calcium salts/soaps) can have palatability issues and may destabilize at low rumen pH.",
              "Rumen-stable fats (fractionated triglycerides rich in saturated fatty acids like palmitic acid) are stable across rumen pH conditions and support energy supply.",
              "General field practice: introduce fats gradually and monitor dung consistency, milk fat %, and appetite.",
            ]}
          />
        </Card>

        {/* Protein */}
        <SectionTitle
          icon={ClipboardCheck}
          title="Protein: rumen microbes + bypass protein"
          desc="Ruminants get amino acids from microbial protein (made in rumen) + rumen undegraded protein (RUP/bypass) digested in intestine. High yielders often need more bypass protein."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Microbial protein basics">
            <BulletList
              items={[
                "Rumen microbes can convert non-protein nitrogen (urea/ammonia) into microbial protein—if fermentable energy is adequate.",
                "If ammonia release exceeds uptake (too much RDP or too little energy), efficiency drops and microbial protein synthesis reduces.",
                "Growing/finishing cattle can use NPN better than high-producing lactating cows.",
              ]}
            />
          </Card>
          <Card title="Bypass protein (RUP) for higher milk protein">
            <BulletList
              items={[
                "High-producing cows may not meet amino acid demand from microbes alone.",
                "Add proteins with lower rumen degradability to reach intestine (RUP).",
                "A commonly cited target ratio: ~65:35 (RDP:RUP) for dairy diets in many feeding programs; adjust by forage quality and production level.",
                "Avoid excess RDP when basal diet already has high RDP—focus on RUP to improve milk protein yield.",
              ]}
            />
          </Card>
        </div>

        {/* Chromium */}
        <SectionTitle
          icon={ShieldCheck}
          kicker="Transition period"
          title="Chromium: support energy utilization during transition"
          desc="Transition period (~21 days prepartum to ~21 days postpartum) is critical. Chromium is linked to insulin sensitivity and glucose utilization; organic forms are better absorbed than inorganic forms."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Why it is discussed in high-yielders">
            <BulletList
              items={[
                "Helps support glucose utilization via improved insulin sensitivity (glucose tolerance factor concept).",
                "Reported benefits in some feeding programs: improved feed intake in early lactation and better immune response.",
                "Use only under guidance—focus first on balanced ration, minerals, and transition management.",
              ]}
            />
          </Card>
          <Card title="Practical caution">
            <BulletList
              items={[
                "Inorganic chromium is poorly absorbed; chelated/organic forms (e.g., nicotinate/picolinate) are considered more available.",
                "Don’t treat it as a ‘magic powder’—negative energy balance is primarily solved by diet energy density + intake + comfort.",
                "Always check label dose and consult a vet/nutritionist if using supplements.",
              ]}
            />
          </Card>
        </div>

        {/* Thumb rules */}
        <SectionTitle
          icon={Leaf}
          title="Thumb rules farmers actually use (from your pasted source)"
          desc="These rules are popular because they are simple. Adapt based on breed, body weight, fodder quality, and milk fat %."
        />
        <Card title="Compound cattle feed thumb rule">
          <BulletList
            items={[
              "Growing animals: often fed ~1–2 kg compound cattle feed daily.",
              "Milking animals: ~2 kg for maintenance + additional feed per litre of milk (example thumb rule: ~400 g for cows and ~500 g for buffaloes per litre).",
              "Pregnant animals: extra concentrate/oil cake often advised in last 2 months of pregnancy for foetal growth and good calving condition.",
            ]}
          />
        </Card>

        <Card title="Stage-wise feeding schedule (example table from pasted content)">
          <Table
            headers={[
              "Stage",
              "Green fodder (kg) for 250/300/350 kg animal",
              "Concentrate guidance (thumb rule)",
            ]}
            rows={[
              [
                "Dry cow",
                "25 / 30 / 35",
                <>
                  <div className="space-y-1">
                    <div>• Non-pregnant: often no concentrate needed</div>
                    <div>• Pregnant: add ~1.5 kg concentrate from 7th month</div>
                    <div>• If condition poor: up to ~1 kg concentrate may be used</div>
                  </div>
                </>,
              ],
              [
                "Milch cow",
                "25 / 30 / 35",
                <>
                  <div className="space-y-1">
                    <div>• Cow: ~1 kg concentrate per ~2.5 kg milk (around 4% fat)</div>
                    <div>• Buffalo: ~1 kg concentrate per ~2.0 kg milk</div>
                  </div>
                </>,
              ],
            ]}
          />
        </Card>

        
        <SectionTitle
          icon={ClipboardCheck}
          title="Challenge feeding SOP (pre-calving to peak yield)"
          desc="Goal: condition rumen and digestive system to handle higher concentrate, and push toward peak yield safely."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Step-by-step SOP">
            <BulletList
              items={[
                "Start ~2 weeks before expected calving date.",
                "Begin with ~500 g concentrate mixture.",
                "Increase daily by ~300–400 g until intake reaches ~500–1000 g per 100 kg body weight.",
                "After calving: increase concentrate by ~500 g/day in first 2 weeks to free-choice level, then adjust based on test-day milk yield.",
              ]}
            />
          </Card>
          <Card title="Simple schedule table">
            <Table
              headers={["Period", "Concentrate allowance"]}
              rows={[
                [
                  "Last 2 weeks before calving",
                  "Start ~500 g; increase ~300–400 g/day until ~500–1000 g per 100 kg BW",
                ],
                [
                  "First 2 weeks of lactation",
                  "Increase ~500 g/day to free-choice level",
                ],
                [
                  "Second week to peak yield",
                  "Free choice (monitor rumen health, dung, milk fat)",
                ],
                [
                  "From test-day onwards",
                  "Fix as per production thumb rule (e.g., ~1 kg per 2.5 kg milk)",
                ],
              ]}
            />
          </Card>
        </div>

        
        <SectionTitle
          icon={Leaf}
          title="Mid & late lactation: stabilize, then rebuild condition"
          desc="Mid lactation is more stable; late lactation is where intake can exceed needs and body reserves can be rebuilt while supporting foetus growth."
        />
        <Card>
          <BulletList
            items={[
              "Mid lactation: feed balanced ration; keep quality fodder and adjust concentrate to milk yield and fat%.",
              "Late lactation: appetite often improves; allow body reserve recovery while meeting foetal needs.",
              "From ~7.5 to 10 months of lactation, some systems add ~1–2 kg concentrate beyond maintenance + production to replenish body condition (adapt to your timeline and breed).",
            ]}
          />
        </Card>

        
        <SectionTitle
          icon={ShieldCheck}
          title="High-producing cows: avoid rumen dysfunction"
          desc="High producers cannot sustain production on bulky forage alone, but too much concentrate can cause acidosis and milk fat depression. Control fermentation using ration composition, ratios, quantity, frequency, and physical form."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Practical controls">
            <BulletList
              items={[
                "Use superior quality forage to reduce concentrate requirement.",
                "Minimum crude fibre often cited ~20–25% for milking cows (supports acetate production and milk fat).",
                "Split feeding into 3–4 parts/day to avoid acid spikes and improve utilization.",
                "Watch for signs: loose dung, reduced cud chewing, sudden drop in milk fat → rebalance ration.",
              ]}
            />
          </Card>
          <Card title="Complete feed / TMR idea (complete diet)">
            <BulletList
              items={[
                "Complete diet mixes roughage + concentrate to prevent selective feeding.",
                "Benefits: may improve intake, stabilize rumen, reduce labour, and reduce acidosis risk from concentrate overeating.",
                "Group feeding is common; fewer frequent formula changes compared to individual feeding.",
              ]}
            />
          </Card>
        </div>

        
        <SectionTitle
          icon={Droplets}
          title="Feeding allowances (quick reference table)"
          desc="Use as a starting point, then adjust by fodder quality, milk fat %, season, and body condition."
        />
        <Card>
          <Table
            headers={[
              "Animal",
              "Stage",
              "Green fodder (kg/day)",
              "Dry fodder (kg/day)",
              "Concentrate (kg/day)",
            ]}
            rows={[
              ["Cow (~250 kg)", "Milk 5 L/day", "15", "5.0", "2.0"],
              ["Cow (~250 kg)", "Milk 5–10 L/day", "17.5", "5.5", "3.0"],
              ["Cow (~250 kg)", "Milk 10–15 L/day", "20.0", "6.0", "4.0"],
              ["Cow (~250 kg)", "Gestation", "15.0", "5.0", "1.5"],
              ["Buffalo (~400 kg)", "Milk 5 L/day", "15.0", "5.0", "2.5"],
              ["Buffalo (~400 kg)", "Milk 5–10 L/day", "20.0", "6.0", "4.0"],
              ["Buffalo (~400 kg)", "Milk >10 L/day", "25.0", "7.0", "5.0"],
              ["Bull (~300 kg)", "Work days", "20.0", "7.0", "2.0"],
              ["Bull (~300 kg)", "No work", "15.0", "5.5", "1.0"],
            ]}
          />
        </Card>

        {/* Minerals & vitamins */}
        <SectionTitle
          icon={ShieldCheck}
          title="Minerals & vitamins (what to include and why)"
          desc="Minerals and vitamins affect milk yield, fertility, immunity, and bone health. Many deficiencies show up as low production, weak bones, poor heat signs, or disease recurrence."
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Major minerals (examples from your pasted content)">
            <BulletList
              items={[
                "Calcium: bone/teeth, nerve-muscle function, clotting. Deficiency: rickets (young), osteomalacia (adult), milk fever after calving.",
                "Phosphorus: energy metabolism (ATP), bones, fertility. Deficiency: pica, weak joints, poor fertility/estrus.",
                "Magnesium: enzyme activator; deficiency can cause grass tetany (tremors, staggering).",
                "Sodium/Chloride/Potassium: fluid balance, nerve conduction; deficiency can reduce growth and cause weakness.",
              ]}
            />
          </Card>
          <Card title="Micro-minerals & vitamins (short practical list)">
            <BulletList
              items={[
                "Iron: deficiency more common in fast-growing young on milk-only diets.",
                "Copper/Zinc/Manganese/Cobalt/Selenium/Iodine: linked to immunity, skin, fertility, growth, thyroid function.",
                "Vitamin A: vision, epithelial integrity, fertility; deficiency can cause night blindness, infections, reproductive issues.",
                "Vitamin D: calcium/phosphorus utilization; deficiency rickets/osteomalacia.",
                "Vitamin E + Selenium: antioxidant; deficiency linked to white muscle disease-like signs.",
              ]}
            />
          </Card>
        </div>

        {/* Today/Week/Month */}
        <SectionTitle
          icon={ClipboardCheck}
          title="Action plan: what to do today / this week / this month"
          desc="A simple routine makes the biggest difference. Use this as a farm checklist."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Today">
            <BulletList
              items={[
                "Ensure clean water & check troughs.",
                "Check cud chewing + dung consistency.",
                "Avoid sudden concentrate increase.",
                "Offer mineral mixture + salt.",
                "Record milk yield (morning/evening) and any appetite change.",
              ]}
            />
          </Card>
          <Card title="This week">
            <BulletList
              items={[
                "Review body condition score (thin/ideal/fat) for each milker.",
                "Adjust concentrate to yield (thumb rule) and fat%.",
                "Inspect fodder quality (mould, moisture, dust).",
                "Plan for green + dry fodder stock for next 7–14 days.",
              ]}
            />
          </Card>
          <Card title="This month">
            <BulletList
              items={[
                "Do a ration check with local vet/extension worker if milk fat drops or fertility issues rise.",
                "Review transition cow management (last 3 weeks pre/post calving).",
                "Check mineral/vitamin supply chain and avoid expired stock.",
                "If using bypass fat/protein: review milk response + health indicators.",
              ]}
            />
          </Card>
        </div>

        {/* Sources */}
        <Card title="Source & attribution">
          <p className="text-muted-foreground leading-relaxed">
            “Feeding Strategies of Dairy Cattle in India for Good Health & Better Milk Yield”
            Verdant-formatted educational guide and is not a substitute for veterinary advice.
          </p>
        </Card>
      </div>
    </div>
  );
}
