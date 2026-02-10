import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Leaf,
  Droplets,
  ClipboardCheck,
  ShieldCheck,
  Recycle,
} from "lucide-react";

const updatedAt = "February 10, 2026";

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

export default function BlogSustainableFeeding() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container-custom max-w-5xl space-y-10">
        <div className="flex items-center justify-between gap-3">
          <Link href="/blog">
            <Button variant="outline" className="rounded-2xl">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Button>
          </Link>
          <Badge className="rounded-full">Practices • Indian dairy</Badge>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border/60 bg-white p-6 md:p-10 shadow-sm"
        >
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Sustainable Feeding Practices for Modern Indian Dairy Farms
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Sustainability is not “expensive tech.” It is mostly: better fodder planning,
              lower wastage, improved rumen efficiency, cleaner water, and consistent SOPs.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                Updated {updatedAt}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Cost cutting
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Better milk solids
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Lower disease risk
              </Badge>
            </div>
          </div>
        </motion.div>

        <Card title="Core idea: make each kg of feed convert into milk (not waste)">
          <BulletList
            items={[
              "Plan fodder supply across seasons (mix of legume + non-legume).",
              "Reduce mould, dust, and spoilage—these reduce intake and raise disease risk.",
              "Balance roughage:concentrate to protect rumen and maintain milk fat.",
              "Keep water clean and always available.",
            ]}
          />
        </Card>

        <Card title="Fodder planning (Indian context)">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Leaf className="h-4 w-4" /> Year-round strategy
              </h4>
              <BulletList
                items={[
                  "Use a cropping calendar to ensure green fodder availability.",
                  "Keep dry fodder reserve for lean months.",
                  "Store fodder off the ground; protect from moisture.",
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Recycle className="h-4 w-4" /> Silage basics (high impact)
              </h4>
              <BulletList
                items={[
                  "Silage helps stabilize fodder availability and reduces spoilage losses.",
                  "Proper compaction and sealing is critical (air causes mould).",
                  "Introduce gradually; monitor intake and dung consistency.",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title="Precision feeding (without machines)">
          <BulletList
            items={[
              "Measure concentrates with a fixed mug/can (standardize per animal).",
              "Adjust based on yield and body condition score (thin/ideal/fat).",
              "Split concentrate into multiple feedings (3–4 parts/day) for high producers.",
              "Avoid sudden changes; adapt over 7–10 days when possible.",
            ]}
          />
        </Card>

        <Card title="Wastage control checklist (biggest hidden money leak)">
          <Table
            headers={["Where waste happens", "What it looks like", "Fix (simple)"]}
            rows={[
              [
                "Feed trough",
                "Spilled feed, trampled fodder",
                "Use raised trough, correct height, smaller frequent servings",
              ],
              [
                "Storage",
                "Mouldy smell, clumps, insects",
                "Keep dry, ventilated, away from moisture; FIFO rotation",
              ],
              [
                "Chaffing",
                "Too long/too fine",
                "Uniform chop size; avoid dustiness; wet lightly if needed",
              ],
              [
                "Water",
                "Dirty trough reduces drinking",
                "Daily cleaning; ensure continuous supply",
              ],
            ]}
          />
        </Card>

        <Card title="Rumen-friendly sustainability (more milk solids, less problems)">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> What to protect
              </h4>
              <BulletList
                items={[
                  "Adequate fibre for cud chewing and saliva buffering.",
                  "Stable feeding times (rumen microbes like routine).",
                  "Avoid over-grain feeding that can cause acidosis and low milk fat.",
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Droplets className="h-4 w-4" /> Water is part of feeding
              </h4>
              <BulletList
                items={[
                  "Low water intake reduces dry matter intake → lower milk.",
                  "Keep water points close to resting area and feeding area.",
                  "Heat stress months: water access becomes even more critical.",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title="What to do today / this week / this month">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" /> Today
              </h4>
              <BulletList
                items={[
                  "Clean water troughs.",
                  "Remove spoiled fodder.",
                  "Check leftover feed amount (adjust serving).",
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">This week</h4>
              <BulletList
                items={[
                  "Plan fodder requirement for next 2 weeks.",
                  "Check concentrate measurement consistency.",
                  "Inspect storage for moisture and insects.",
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">This month</h4>
              <BulletList
                items={[
                  "Review milk yield trends and feed cost per litre.",
                  "Work with vet/extension to adjust minerals and ration balance.",
                  "Create a seasonal fodder plan (summer/monsoon/winter).",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title="Verdant note">
          <p className="text-muted-foreground leading-relaxed">
            Sustainability is a system: fodder planning + storage + routine + rumen
            health + water + minerals. Small improvements compound into big profit.
          </p>
        </Card>
      </div>
    </div>
  );
}
