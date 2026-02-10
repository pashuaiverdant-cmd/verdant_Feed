import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ClipboardCheck,
  ShieldCheck,
  Thermometer,
  Droplets,
  Stethoscope,
  AlertTriangle,
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

export default function BlogLivestockDiseases() {
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
          <Badge className="rounded-full">Health • Indian dairy</Badge>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border/60 bg-white p-6 md:p-10 shadow-sm"
        >
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Common Livestock Diseases Every Indian Dairy Farmer Should Track
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              This is a field-focused guide: what to watch, what to do first, what to
              record, and when to call the vet. Fast action saves milk, fertility, and lives.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                Updated {updatedAt}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Practical SOPs
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Isolation & hygiene
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Recordkeeping
              </Badge>
            </div>
          </div>
        </motion.div>

        <Card title="The 60-second health check (do this daily)">
          <BulletList
            items={[
              "Appetite + water intake: any sudden drop is a red flag.",
              "Dung: very watery / very dry / blood / foul smell → note immediately.",
              "Cud chewing: low rumination often means rumen trouble, pain, fever, or acidosis.",
              "Body temperature if animal looks dull (normal range varies; fever is a major sign).",
              "Milk: clots, watery milk, blood, bad smell → suspect mastitis.",
              "Feet/legs: limping, swelling, foul hoof smell → lameness/foot rot.",
              "Breathing: coughing, nasal discharge, laboured breathing → respiratory infection.",
            ]}
          />
        </Card>

        <Card title="Emergency signs — call a vet urgently">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <BulletList
              items={[
                "Animal down and unable to stand; severe weakness or tremors.",
                "Severe bloat (left side distended), breathing difficulty.",
                "High fever with mouth lesions / excessive salivation (suspect infectious disease).",
                "Blood in milk with udder swelling and pain.",
                "Sudden deaths or multiple animals sick at once.",
              ]}
            />
          </div>
        </Card>

        <Card title="Most common problem groups on Indian dairy farms">
          <Table
            headers={["Group", "Examples", "Early clues", "First actions (safe)"]}
            rows={[
              [
                "Udder / Milk",
                "Mastitis",
                "Clots, watery milk, hot painful udder",
                "Isolate milker; clean milking routine; strip test; call vet for treatment plan",
              ],
              [
                "Digestive / Rumen",
                "Bloat, acidosis, diarrhoea",
                "Off-feed, less cud chewing, loose dung, belly distension",
                "Stop sudden concentrate; offer roughage; check water; vet if bloat/fever",
              ],
              [
                "Feet / Legs",
                "Lameness, foot rot, injuries",
                "Limping, swelling, foul smell, reduced walking",
                "Clean & dry flooring; hoof hygiene; vet for trimming/antibiotics if needed",
              ],
              [
                "Reproduction",
                "Anestrus, repeat breeding, metritis",
                "No heat, discharge, low conception",
                "Nutrition + minerals; heat detection; vet exam; manage transition period",
              ],
              [
                "Skin / Vector",
                "Tick-borne illness, skin lesions",
                "Ticks, fever, anaemia signs",
                "Tick control; shed sanitation; vet for diagnosis",
              ],
            ]}
          />
        </Card>

        <Card title="Mastitis SOP (simple & effective)">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Prevention checklist
              </h4>
              <BulletList
                items={[
                  "Pre-dip (if used), clean and dry teats; always wipe with separate cloth/tissue per animal.",
                  "Full hand milking/ proper machine settings (if machine). Avoid teat injuries.",
                  "Post-milking teat dip (where possible).",
                  "Keep bedding dry and clean; remove dung frequently.",
                  "Identify chronic cases and milk them last.",
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" /> What to do if suspected
              </h4>
              <BulletList
                items={[
                  "Check milk for clots/wateriness; compare quarters.",
                  "Mark the animal; milk separately; don’t mix milk in bulk can.",
                  "Record: date, quarter affected, fever yes/no, milk change.",
                  "Call vet for correct therapy and withdrawal guidance.",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title="Bloat & acidosis prevention (feeding-linked diseases)">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Droplets className="h-4 w-4" /> Bloat risk reducers
              </h4>
              <BulletList
                items={[
                  "Avoid sudden lush legume-heavy grazing without adaptation.",
                  "Provide dry roughage before turning out to lush fodder.",
                  "Avoid abrupt concentrate jumps.",
                  "Observe animals after diet change; early bloat acts fast.",
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Thermometer className="h-4 w-4" /> Acidosis risk reducers
              </h4>
              <BulletList
                items={[
                  "Maintain adequate fibre (roughage) to support rumination and saliva buffering.",
                  "Split concentrates into multiple feedings rather than one heavy meal.",
                  "If milk fat suddenly drops + loose dung: suspect rumen imbalance.",
                  "Review ration with a nutritionist if high producers.",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title="Farm biosecurity basics (smallholder-friendly)">
          <BulletList
            items={[
              "Quarantine new animals (separate pen) before mixing with herd.",
              "Separate sick animals; dedicate bucket/rope for them.",
              "Footbath at entry (where possible) and regular shed disinfection.",
              "Control visitors, vehicles, and shared equipment between farms.",
              "Follow local vaccination schedule (ask your vet/department).",
            ]}
          />
        </Card>

        <Card title="What to do today / this week / this month">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">Today</h4>
              <BulletList
                items={[
                  "Observe appetite + cud chewing.",
                  "Check udder & milk during milking.",
                  "Identify limping animals early.",
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">This week</h4>
              <BulletList
                items={[
                  "Clean bedding + drainage; fix wet areas.",
                  "Tick control routine; check calves.",
                  "Review feed changes made recently.",
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">This month</h4>
              <BulletList
                items={[
                  "Record conception/heat issues and consult vet if repeats.",
                  "Review vaccination and deworming schedule.",
                  "Evaluate mastitis repeat cases and milking hygiene SOP.",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title="Note">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Stethoscope className="h-5 w-5" />
            </span>
            <p className="text-muted-foreground leading-relaxed">
              This guide is educational. Exact diagnosis and medicine must be decided
              with a veterinarian, especially for infectious diseases and milk withdrawal rules.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
