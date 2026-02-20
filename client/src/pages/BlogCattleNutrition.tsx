import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="rounded-full">
          {kicker || t("blogCattleNutrition.kickerDefault", "Verdant Knowledge")}
        </Badge>
        <span className="text-sm text-muted-foreground inline-flex items-center">
          <Calendar className="h-4 w-4 mr-1.5" />
          {t("blogCattleNutrition.updatedLabel", "Updated {{date}}", {
            // ✅ allow Hindi date translation while keeping your const
            date: t("blogCattleNutrition.updatedAt", updatedAt),
          })}
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
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container-custom max-w-5xl space-y-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/blog">
            <Button variant="outline" className="rounded-2xl">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t("blogCattleNutrition.backToBlog", "Back to Blog")}
            </Button>
          </Link>
          <Badge className="rounded-full">
            {t("blogCattleNutrition.badgeTop", "Nutrition • Indian dairy")}
          </Badge>
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
              {t(
                "blogCattleNutrition.heroTitle",
                "Feeding Strategies of Dairy Cattle in India for Good Health & Better Milk Yield"
              )}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t(
                "blogCattleNutrition.heroDesc",
                "Feeding is typically the biggest cost in dairying (often ~60–70% of milk production cost). The goal is simple: meet maintenance + milk production + pregnancy needs without upsetting the rumen."
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                {t("blogCattleNutrition.heroTag1", "Practical thumb-rules")}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogCattleNutrition.heroTag2", "Stage-wise feeding")}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogCattleNutrition.heroTag3", "Mineral & vitamin guidance")}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t(
                  "blogCattleNutrition.heroTag4",
                  "High-yielder strategy (energy/protein)"
                )}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {t(
                "blogCattleNutrition.heroNote",
                "Note: This page is structured in Verdant style using the data you pasted from Pashudhan Praharee’s “Feeding Strategies…” article (Technical Team, Livestock Institute of Training & Development / “दुग्धवाहिनी”)."
              )}
            </p>
          </div>
        </motion.div>

        {/* Why feeding matters */}
        <SectionTitle
          icon={Leaf}
          title={t(
            "blogCattleNutrition.whyTitle",
            "Why feeding management decides profit"
          )}
          desc={t(
            "blogCattleNutrition.whyDesc",
            "Milk yield, fat %, reproduction, and disease resistance are tightly linked to energy and protein balance—especially in early lactation and late pregnancy."
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title={t(
              "blogCattleNutrition.realitiesTitle",
              "Key realities on Indian farms"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.realities1",
                  "Feed is the largest recurring cost; wastage or imbalance quickly reduces profit."
                ),
                t(
                  "blogCattleNutrition.realities2",
                  "Roughage quality varies by season; plan fodder crops (legume + non-legume) for year-round supply."
                ),
                t(
                  "blogCattleNutrition.realities3",
                  "High-yielding cows often face negative energy balance in early lactation—risking metabolic problems and delayed heat."
                ),
                t(
                  "blogCattleNutrition.realities4",
                  "Rumen health is the ‘engine’: wrong concentrate/roughage balance can cause acidosis and low milk fat."
                ),
              ]}
            />
          </Card>
          <Card
            title={t(
              "blogCattleNutrition.nonNegotiablesTitle",
              "Daily “non-negotiables”"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.nonNeg1",
                  "Clean water 24×7 (water drives dry matter intake)."
                ),
                t(
                  "blogCattleNutrition.nonNeg2",
                  "Consistent feeding times; avoid sudden diet changes."
                ),
                t(
                  "blogCattleNutrition.nonNeg3",
                  "Adequate fibre (crude fibre often targeted at 20–25% for milch cows)."
                ),
                t(
                  "blogCattleNutrition.nonNeg4",
                  "Mineral mixture + common salt as per recommendation."
                ),
              ]}
            />
          </Card>
        </div>

        {/* Energy */}
        <SectionTitle
          icon={Thermometer}
          kicker={t("blogCattleNutrition.kickerHighYielder", "High yielder")}
          title={t(
            "blogCattleNutrition.energyTitle",
            "Energy: manage early-lactation negative energy balance"
          )}
          desc={t(
            "blogCattleNutrition.energyDesc",
            "Milk peaks at ~4–8 weeks after calving, while dry matter intake often lags until ~10–14 weeks—creating a gap. The cow mobilizes body reserves, increasing risk of metabolic disorders and infertility."
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title={t(
              "blogCattleNutrition.energyLowTitle",
              "What goes wrong when energy is low"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.energyLow1",
                  "Lower milk yield and poor persistence."
                ),
                t(
                  "blogCattleNutrition.energyLow2",
                  "Extended anovulation/postpartum anestrus (delayed cycling)."
                ),
                t(
                  "blogCattleNutrition.energyLow3",
                  "Body condition loss → higher disease susceptibility."
                ),
                t(
                  "blogCattleNutrition.energyLow4",
                  "Higher chance of metabolic disorders if diet is not adjusted."
                ),
              ]}
            />
          </Card>
          <Card
            title={t(
              "blogCattleNutrition.energyStrategyTitle",
              "Strategy: increase energy density safely"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.energyStrategy1",
                  "Early lactation: intake is limited → energy density must rise."
                ),
                t(
                  "blogCattleNutrition.energyStrategy2",
                  "Grain can help but high grain raises acidosis risk and can depress milk fat."
                ),
                t(
                  "blogCattleNutrition.energyStrategy3",
                  "Safer option: fat supplementation to raise energy density without excessive grain—prefer rumen-stable/bypass fats."
                ),
                t(
                  "blogCattleNutrition.energyStrategy4",
                  "Avoid feeding unsaturated vegetable oils directly in large amounts (can harm fibre-digesting rumen bacteria)."
                ),
              ]}
            />
          </Card>
        </div>

        <Card
          title={t(
            "blogCattleNutrition.fatSuppTitle",
            "Fat supplementation (bypass/rumen-stable fats) — practical notes"
          )}
        >
          <BulletList
            items={[
              t(
                "blogCattleNutrition.fatSupp1",
                "Bypass fats pass rumen with minimal disruption and get digested in lower GI tract."
              ),
              t(
                "blogCattleNutrition.fatSupp2",
                "Rumen-protected (e.g., calcium salts/soaps) can have palatability issues and may destabilize at low rumen pH."
              ),
              t(
                "blogCattleNutrition.fatSupp3",
                "Rumen-stable fats (fractionated triglycerides rich in saturated fatty acids like palmitic acid) are stable across rumen pH conditions and support energy supply."
              ),
              t(
                "blogCattleNutrition.fatSupp4",
                "General field practice: introduce fats gradually and monitor dung consistency, milk fat %, and appetite."
              ),
            ]}
          />
        </Card>

        {/* Protein */}
        <SectionTitle
          icon={ClipboardCheck}
          title={t(
            "blogCattleNutrition.proteinTitle",
            "Protein: rumen microbes + bypass protein"
          )}
          desc={t(
            "blogCattleNutrition.proteinDesc",
            "Ruminants get amino acids from microbial protein (made in rumen) + rumen undegraded protein (RUP/bypass) digested in intestine. High yielders often need more bypass protein."
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title={t(
              "blogCattleNutrition.microbialTitle",
              "Microbial protein basics"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.microbial1",
                  "Rumen microbes can convert non-protein nitrogen (urea/ammonia) into microbial protein—if fermentable energy is adequate."
                ),
                t(
                  "blogCattleNutrition.microbial2",
                  "If ammonia release exceeds uptake (too much RDP or too little energy), efficiency drops and microbial protein synthesis reduces."
                ),
                t(
                  "blogCattleNutrition.microbial3",
                  "Growing/finishing cattle can use NPN better than high-producing lactating cows."
                ),
              ]}
            />
          </Card>
          <Card
            title={t(
              "blogCattleNutrition.bypassTitle",
              "Bypass protein (RUP) for higher milk protein"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.bypass1",
                  "High-producing cows may not meet amino acid demand from microbes alone."
                ),
                t(
                  "blogCattleNutrition.bypass2",
                  "Add proteins with lower rumen degradability to reach intestine (RUP)."
                ),
                t(
                  "blogCattleNutrition.bypass3",
                  "A commonly cited target ratio: ~65:35 (RDP:RUP) for dairy diets in many feeding programs; adjust by forage quality and production level."
                ),
                t(
                  "blogCattleNutrition.bypass4",
                  "Avoid excess RDP when basal diet already has high RDP—focus on RUP to improve milk protein yield."
                ),
              ]}
            />
          </Card>
        </div>

        {/* Chromium */}
        <SectionTitle
          icon={ShieldCheck}
          kicker={t("blogCattleNutrition.kickerTransition", "Transition period")}
          title={t(
            "blogCattleNutrition.chromiumTitle",
            "Chromium: support energy utilization during transition"
          )}
          desc={t(
            "blogCattleNutrition.chromiumDesc",
            "Transition period (~21 days prepartum to ~21 days postpartum) is critical. Chromium is linked to insulin sensitivity and glucose utilization; organic forms are better absorbed than inorganic forms."
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title={t(
              "blogCattleNutrition.chromiumWhyTitle",
              "Why it is discussed in high-yielders"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.chromiumWhy1",
                  "Helps support glucose utilization via improved insulin sensitivity (glucose tolerance factor concept)."
                ),
                t(
                  "blogCattleNutrition.chromiumWhy2",
                  "Reported benefits in some feeding programs: improved feed intake in early lactation and better immune response."
                ),
                t(
                  "blogCattleNutrition.chromiumWhy3",
                  "Use only under guidance—focus first on balanced ration, minerals, and transition management."
                ),
              ]}
            />
          </Card>
          <Card
            title={t(
              "blogCattleNutrition.chromiumCautionTitle",
              "Practical caution"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.chromiumCaution1",
                  "Inorganic chromium is poorly absorbed; chelated/organic forms (e.g., nicotinate/picolinate) are considered more available."
                ),
                t(
                  "blogCattleNutrition.chromiumCaution2",
                  "Don’t treat it as a ‘magic powder’—negative energy balance is primarily solved by diet energy density + intake + comfort."
                ),
                t(
                  "blogCattleNutrition.chromiumCaution3",
                  "Always check label dose and consult a vet/nutritionist if using supplements."
                ),
              ]}
            />
          </Card>
        </div>

        {/* Thumb rules */}
        <SectionTitle
          icon={Leaf}
          title={t(
            "blogCattleNutrition.thumbRulesTitle",
            "Thumb rules farmers actually use (from your pasted source)"
          )}
          desc={t(
            "blogCattleNutrition.thumbRulesDesc",
            "These rules are popular because they are simple. Adapt based on breed, body weight, fodder quality, and milk fat %."
          )}
        />
        <Card
          title={t(
            "blogCattleNutrition.compoundFeedTitle",
            "Compound cattle feed thumb rule"
          )}
        >
          <BulletList
            items={[
              t(
                "blogCattleNutrition.compound1",
                "Growing animals: often fed ~1–2 kg compound cattle feed daily."
              ),
              t(
                "blogCattleNutrition.compound2",
                "Milking animals: ~2 kg for maintenance + additional feed per litre of milk (example thumb rule: ~400 g for cows and ~500 g for buffaloes per litre)."
              ),
              t(
                "blogCattleNutrition.compound3",
                "Pregnant animals: extra concentrate/oil cake often advised in last 2 months of pregnancy for foetal growth and good calving condition."
              ),
            ]}
          />
        </Card>

        <Card
          title={t(
            "blogCattleNutrition.stageWiseTitle",
            "Stage-wise feeding schedule (example table from pasted content)"
          )}
        >
          <Table
            headers={[
              t("blogCattleNutrition.stageHdr", "Stage"),
              t(
                "blogCattleNutrition.greenFodderHdr",
                "Green fodder (kg) for 250/300/350 kg animal"
              ),
              t(
                "blogCattleNutrition.concentrateHdr",
                "Concentrate guidance (thumb rule)"
              ),
            ]}
            rows={[
              [
                t("blogCattleNutrition.stageDryCow", "Dry cow"),
                t("blogCattleNutrition.stageDryCowGreen", "25 / 30 / 35"),
                <>
                  <div className="space-y-1">
                    <div>
                      {t(
                        "blogCattleNutrition.stageDryCowRule1",
                        "• Non-pregnant: often no concentrate needed"
                      )}
                    </div>
                    <div>
                      {t(
                        "blogCattleNutrition.stageDryCowRule2",
                        "• Pregnant: add ~1.5 kg concentrate from 7th month"
                      )}
                    </div>
                    <div>
                      {t(
                        "blogCattleNutrition.stageDryCowRule3",
                        "• If condition poor: up to ~1 kg concentrate may be used"
                      )}
                    </div>
                  </div>
                </>,
              ],
              [
                t("blogCattleNutrition.stageMilchCow", "Milch cow"),
                t("blogCattleNutrition.stageMilchCowGreen", "25 / 30 / 35"),
                <>
                  <div className="space-y-1">
                    <div>
                      {t(
                        "blogCattleNutrition.stageMilchCowRule1",
                        "• Cow: ~1 kg concentrate per ~2.5 kg milk (around 4% fat)"
                      )}
                    </div>
                    <div>
                      {t(
                        "blogCattleNutrition.stageMilchCowRule2",
                        "• Buffalo: ~1 kg concentrate per ~2.0 kg milk"
                      )}
                    </div>
                  </div>
                </>,
              ],
            ]}
          />
        </Card>

        <SectionTitle
          icon={ClipboardCheck}
          title={t(
            "blogCattleNutrition.challengeTitle",
            "Challenge feeding SOP (pre-calving to peak yield)"
          )}
          desc={t(
            "blogCattleNutrition.challengeDesc",
            "Goal: condition rumen and digestive system to handle higher concentrate, and push toward peak yield safely."
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title={t("blogCattleNutrition.sopTitle", "Step-by-step SOP")}>
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.sop1",
                  "Start ~2 weeks before expected calving date."
                ),
                t(
                  "blogCattleNutrition.sop2",
                  "Begin with ~500 g concentrate mixture."
                ),
                t(
                  "blogCattleNutrition.sop3",
                  "Increase daily by ~300–400 g until intake reaches ~500–1000 g per 100 kg body weight."
                ),
                t(
                  "blogCattleNutrition.sop4",
                  "After calving: increase concentrate by ~500 g/day in first 2 weeks to free-choice level, then adjust based on test-day milk yield."
                ),
              ]}
            />
          </Card>
          <Card
            title={t(
              "blogCattleNutrition.simpleScheduleTitle",
              "Simple schedule table"
            )}
          >
            <Table
              headers={[
                t("blogCattleNutrition.periodHdr", "Period"),
                t(
                  "blogCattleNutrition.concentrateAllowanceHdr",
                  "Concentrate allowance"
                ),
              ]}
              rows={[
                [
                  t(
                    "blogCattleNutrition.period1",
                    "Last 2 weeks before calving"
                  ),
                  t(
                    "blogCattleNutrition.allowance1",
                    "Start ~500 g; increase ~300–400 g/day until ~500–1000 g per 100 kg BW"
                  ),
                ],
                [
                  t("blogCattleNutrition.period2", "First 2 weeks of lactation"),
                  t(
                    "blogCattleNutrition.allowance2",
                    "Increase ~500 g/day to free-choice level"
                  ),
                ],
                [
                  t(
                    "blogCattleNutrition.period3",
                    "Second week to peak yield"
                  ),
                  t(
                    "blogCattleNutrition.allowance3",
                    "Free choice (monitor rumen health, dung, milk fat)"
                  ),
                ],
                [
                  t("blogCattleNutrition.period4", "From test-day onwards"),
                  t(
                    "blogCattleNutrition.allowance4",
                    "Fix as per production thumb rule (e.g., ~1 kg per 2.5 kg milk)"
                  ),
                ],
              ]}
            />
          </Card>
        </div>

        <SectionTitle
          icon={Leaf}
          title={t(
            "blogCattleNutrition.midLateTitle",
            "Mid & late lactation: stabilize, then rebuild condition"
          )}
          desc={t(
            "blogCattleNutrition.midLateDesc",
            "Mid lactation is more stable; late lactation is where intake can exceed needs and body reserves can be rebuilt while supporting foetus growth."
          )}
        />
        <Card>
          <BulletList
            items={[
              t(
                "blogCattleNutrition.midLate1",
                "Mid lactation: feed balanced ration; keep quality fodder and adjust concentrate to milk yield and fat%."
              ),
              t(
                "blogCattleNutrition.midLate2",
                "Late lactation: appetite often improves; allow body reserve recovery while meeting foetal needs."
              ),
              t(
                "blogCattleNutrition.midLate3",
                "From ~7.5 to 10 months of lactation, some systems add ~1–2 kg concentrate beyond maintenance + production to replenish body condition (adapt to your timeline and breed)."
              ),
            ]}
          />
        </Card>

        <SectionTitle
          icon={ShieldCheck}
          title={t(
            "blogCattleNutrition.highProdTitle",
            "High-producing cows: avoid rumen dysfunction"
          )}
          desc={t(
            "blogCattleNutrition.highProdDesc",
            "High producers cannot sustain production on bulky forage alone, but too much concentrate can cause acidosis and milk fat depression. Control fermentation using ration composition, ratios, quantity, frequency, and physical form."
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card title={t("blogCattleNutrition.controlsTitle", "Practical controls")}>
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.controls1",
                  "Use superior quality forage to reduce concentrate requirement."
                ),
                t(
                  "blogCattleNutrition.controls2",
                  "Minimum crude fibre often cited ~20–25% for milking cows (supports acetate production and milk fat)."
                ),
                t(
                  "blogCattleNutrition.controls3",
                  "Split feeding into 3–4 parts/day to avoid acid spikes and improve utilization."
                ),
                t(
                  "blogCattleNutrition.controls4",
                  "Watch for signs: loose dung, reduced cud chewing, sudden drop in milk fat → rebalance ration."
                ),
              ]}
            />
          </Card>
          <Card
            title={t(
              "blogCattleNutrition.tmrTitle",
              "Complete feed / TMR idea (complete diet)"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.tmr1",
                  "Complete diet mixes roughage + concentrate to prevent selective feeding."
                ),
                t(
                  "blogCattleNutrition.tmr2",
                  "Benefits: may improve intake, stabilize rumen, reduce labour, and reduce acidosis risk from concentrate overeating."
                ),
                t(
                  "blogCattleNutrition.tmr3",
                  "Group feeding is common; fewer frequent formula changes compared to individual feeding."
                ),
              ]}
            />
          </Card>
        </div>

        <SectionTitle
          icon={Droplets}
          title={t(
            "blogCattleNutrition.allowancesTitle",
            "Feeding allowances (quick reference table)"
          )}
          desc={t(
            "blogCattleNutrition.allowancesDesc",
            "Use as a starting point, then adjust by fodder quality, milk fat %, season, and body condition."
          )}
        />
        <Card>
          <Table
            headers={[
              t("blogCattleNutrition.allowHdrAnimal", "Animal"),
              t("blogCattleNutrition.allowHdrStage", "Stage"),
              t("blogCattleNutrition.allowHdrGreen", "Green fodder (kg/day)"),
              t("blogCattleNutrition.allowHdrDry", "Dry fodder (kg/day)"),
              t("blogCattleNutrition.allowHdrCon", "Concentrate (kg/day)"),
            ]}
            rows={[
              [
                t("blogCattleNutrition.allowRow1a", "Cow (~250 kg)"),
                t("blogCattleNutrition.allowRow1b", "Milk 5 L/day"),
                t("blogCattleNutrition.allowRow1c", "15"),
                t("blogCattleNutrition.allowRow1d", "5.0"),
                t("blogCattleNutrition.allowRow1e", "2.0"),
              ],
              [
                t("blogCattleNutrition.allowRow2a", "Cow (~250 kg)"),
                t("blogCattleNutrition.allowRow2b", "Milk 5–10 L/day"),
                t("blogCattleNutrition.allowRow2c", "17.5"),
                t("blogCattleNutrition.allowRow2d", "5.5"),
                t("blogCattleNutrition.allowRow2e", "3.0"),
              ],
              [
                t("blogCattleNutrition.allowRow3a", "Cow (~250 kg)"),
                t("blogCattleNutrition.allowRow3b", "Milk 10–15 L/day"),
                t("blogCattleNutrition.allowRow3c", "20.0"),
                t("blogCattleNutrition.allowRow3d", "6.0"),
                t("blogCattleNutrition.allowRow3e", "4.0"),
              ],
              [
                t("blogCattleNutrition.allowRow4a", "Cow (~250 kg)"),
                t("blogCattleNutrition.allowRow4b", "Gestation"),
                t("blogCattleNutrition.allowRow4c", "15.0"),
                t("blogCattleNutrition.allowRow4d", "5.0"),
                t("blogCattleNutrition.allowRow4e", "1.5"),
              ],
              [
                t("blogCattleNutrition.allowRow5a", "Buffalo (~400 kg)"),
                t("blogCattleNutrition.allowRow5b", "Milk 5 L/day"),
                t("blogCattleNutrition.allowRow5c", "15.0"),
                t("blogCattleNutrition.allowRow5d", "5.0"),
                t("blogCattleNutrition.allowRow5e", "2.5"),
              ],
              [
                t("blogCattleNutrition.allowRow6a", "Buffalo (~400 kg)"),
                t("blogCattleNutrition.allowRow6b", "Milk 5–10 L/day"),
                t("blogCattleNutrition.allowRow6c", "20.0"),
                t("blogCattleNutrition.allowRow6d", "6.0"),
                t("blogCattleNutrition.allowRow6e", "4.0"),
              ],
              [
                t("blogCattleNutrition.allowRow7a", "Buffalo (~400 kg)"),
                t("blogCattleNutrition.allowRow7b", "Milk >10 L/day"),
                t("blogCattleNutrition.allowRow7c", "25.0"),
                t("blogCattleNutrition.allowRow7d", "7.0"),
                t("blogCattleNutrition.allowRow7e", "5.0"),
              ],
              [
                t("blogCattleNutrition.allowRow8a", "Bull (~300 kg)"),
                t("blogCattleNutrition.allowRow8b", "Work days"),
                t("blogCattleNutrition.allowRow8c", "20.0"),
                t("blogCattleNutrition.allowRow8d", "7.0"),
                t("blogCattleNutrition.allowRow8e", "2.0"),
              ],
              [
                t("blogCattleNutrition.allowRow9a", "Bull (~300 kg)"),
                t("blogCattleNutrition.allowRow9b", "No work"),
                t("blogCattleNutrition.allowRow9c", "15.0"),
                t("blogCattleNutrition.allowRow9d", "5.5"),
                t("blogCattleNutrition.allowRow9e", "1.0"),
              ],
            ]}
          />
        </Card>

        {/* Minerals & vitamins */}
        <SectionTitle
          icon={ShieldCheck}
          title={t(
            "blogCattleNutrition.mineralsTitle",
            "Minerals & vitamins (what to include and why)"
          )}
          desc={t(
            "blogCattleNutrition.mineralsDesc",
            "Minerals and vitamins affect milk yield, fertility, immunity, and bone health. Many deficiencies show up as low production, weak bones, poor heat signs, or disease recurrence."
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title={t(
              "blogCattleNutrition.majorMineralsTitle",
              "Major minerals (examples from your pasted content)"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.majorMinerals1",
                  "Calcium: bone/teeth, nerve-muscle function, clotting. Deficiency: rickets (young), osteomalacia (adult), milk fever after calving."
                ),
                t(
                  "blogCattleNutrition.majorMinerals2",
                  "Phosphorus: energy metabolism (ATP), bones, fertility. Deficiency: pica, weak joints, poor fertility/estrus."
                ),
                t(
                  "blogCattleNutrition.majorMinerals3",
                  "Magnesium: enzyme activator; deficiency can cause grass tetany (tremors, staggering)."
                ),
                t(
                  "blogCattleNutrition.majorMinerals4",
                  "Sodium/Chloride/Potassium: fluid balance, nerve conduction; deficiency can reduce growth and cause weakness."
                ),
              ]}
            />
          </Card>
          <Card
            title={t(
              "blogCattleNutrition.microMineralsTitle",
              "Micro-minerals & vitamins (short practical list)"
            )}
          >
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.microMinerals1",
                  "Iron: deficiency more common in fast-growing young on milk-only diets."
                ),
                t(
                  "blogCattleNutrition.microMinerals2",
                  "Copper/Zinc/Manganese/Cobalt/Selenium/Iodine: linked to immunity, skin, fertility, growth, thyroid function."
                ),
                t(
                  "blogCattleNutrition.microMinerals3",
                  "Vitamin A: vision, epithelial integrity, fertility; deficiency can cause night blindness, infections, reproductive issues."
                ),
                t(
                  "blogCattleNutrition.microMinerals4",
                  "Vitamin D: calcium/phosphorus utilization; deficiency rickets/osteomalacia."
                ),
                t(
                  "blogCattleNutrition.microMinerals5",
                  "Vitamin E + Selenium: antioxidant; deficiency linked to white muscle disease-like signs."
                ),
              ]}
            />
          </Card>
        </div>

        {/* Today/Week/Month */}
        <SectionTitle
          icon={ClipboardCheck}
          title={t(
            "blogCattleNutrition.actionPlanTitle",
            "Action plan: what to do today / this week / this month"
          )}
          desc={t(
            "blogCattleNutrition.actionPlanDesc",
            "A simple routine makes the biggest difference. Use this as a farm checklist."
          )}
        />
        <div className="grid md:grid-cols-3 gap-6">
          <Card title={t("blogCattleNutrition.todayTitle", "Today")}>
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.today1",
                  "Ensure clean water & check troughs."
                ),
                t(
                  "blogCattleNutrition.today2",
                  "Check cud chewing + dung consistency."
                ),
                t(
                  "blogCattleNutrition.today3",
                  "Avoid sudden concentrate increase."
                ),
                t(
                  "blogCattleNutrition.today4",
                  "Offer mineral mixture + salt."
                ),
                t(
                  "blogCattleNutrition.today5",
                  "Record milk yield (morning/evening) and any appetite change."
                ),
              ]}
            />
          </Card>
          <Card title={t("blogCattleNutrition.thisWeekTitle", "This week")}>
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.week1",
                  "Review body condition score (thin/ideal/fat) for each milker."
                ),
                t(
                  "blogCattleNutrition.week2",
                  "Adjust concentrate to yield (thumb rule) and fat%."
                ),
                t(
                  "blogCattleNutrition.week3",
                  "Inspect fodder quality (mould, moisture, dust)."
                ),
                t(
                  "blogCattleNutrition.week4",
                  "Plan for green + dry fodder stock for next 7–14 days."
                ),
              ]}
            />
          </Card>
          <Card title={t("blogCattleNutrition.thisMonthTitle", "This month")}>
            <BulletList
              items={[
                t(
                  "blogCattleNutrition.month1",
                  "Do a ration check with local vet/extension worker if milk fat drops or fertility issues rise."
                ),
                t(
                  "blogCattleNutrition.month2",
                  "Review transition cow management (last 3 weeks pre/post calving)."
                ),
                t(
                  "blogCattleNutrition.month3",
                  "Check mineral/vitamin supply chain and avoid expired stock."
                ),
                t(
                  "blogCattleNutrition.month4",
                  "If using bypass fat/protein: review milk response + health indicators."
                ),
              ]}
            />
          </Card>
        </div>

        {/* Sources */}
        <Card title={t("blogCattleNutrition.sourceTitle", "Source & attribution")}>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "blogCattleNutrition.sourceText",
              "“Feeding Strategies of Dairy Cattle in India for Good Health & Better Milk Yield” Verdant-formatted educational guide and is not a substitute for veterinary advice."
            )}
          </p>
        </Card>
      </div>
    </div>
  );
}