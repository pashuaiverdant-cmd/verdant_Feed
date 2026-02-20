import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div className="rounded-3xl border border-border/60 bg-white p-5 md:p-7 shadow-sm">
      {title ? (
        <h3 className="text-lg md:text-xl font-display font-bold mb-3">
          {t(title)}
        </h3>
      ) : null}
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  const { t } = useTranslation();
  return (
    <ul className="space-y-2 list-disc pl-6 text-foreground/90">
      {items.map((x, i) => (
        <li key={i} className="leading-relaxed">
          {t(x)}
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
  const { t } = useTranslation();
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
                {t(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-border/60">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {typeof c === "string" ? t(c) : c}
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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container-custom max-w-5xl space-y-10">
        <div className="flex items-center justify-between gap-3">
          <Link href="/blog">
            <Button variant="outline" className="rounded-2xl">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t("blogSustainableFeeding.backToBlog")}
            </Button>
          </Link>
          <Badge className="rounded-full">
            {t("blogSustainableFeeding.badgePracticesIndianDairy")}
          </Badge>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border/60 bg-white p-6 md:p-10 shadow-sm"
        >
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              {t("blogSustainableFeeding.title")}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("blogSustainableFeeding.subtitle")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                {t("blogSustainableFeeding.updatedLabel")} {updatedAt}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogSustainableFeeding.tagCostCutting")}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogSustainableFeeding.tagBetterMilkSolids")}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogSustainableFeeding.tagLowerDiseaseRisk")}
              </Badge>
            </div>
          </div>
        </motion.div>

        <Card title={"blogSustainableFeeding.sectionCoreIdeaTitle"}>
          <BulletList
            items={[
              "blogSustainableFeeding.coreIdea.b1",
              "blogSustainableFeeding.coreIdea.b2",
              "blogSustainableFeeding.coreIdea.b3",
              "blogSustainableFeeding.coreIdea.b4",
            ]}
          />
        </Card>

        <Card title={"blogSustainableFeeding.sectionFodderPlanningTitle"}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Leaf className="h-4 w-4" />{" "}
                {t("blogSustainableFeeding.fodder.yearRoundTitle")}
              </h4>
              <BulletList
                items={[
                  "blogSustainableFeeding.fodder.yearRound.b1",
                  "blogSustainableFeeding.fodder.yearRound.b2",
                  "blogSustainableFeeding.fodder.yearRound.b3",
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Recycle className="h-4 w-4" />{" "}
                {t("blogSustainableFeeding.fodder.silageTitle")}
              </h4>
              <BulletList
                items={[
                  "blogSustainableFeeding.fodder.silage.b1",
                  "blogSustainableFeeding.fodder.silage.b2",
                  "blogSustainableFeeding.fodder.silage.b3",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title={"blogSustainableFeeding.sectionPrecisionFeedingTitle"}>
          <BulletList
            items={[
              "blogSustainableFeeding.precision.b1",
              "blogSustainableFeeding.precision.b2",
              "blogSustainableFeeding.precision.b3",
              "blogSustainableFeeding.precision.b4",
            ]}
          />
        </Card>

        <Card title={"blogSustainableFeeding.sectionWastageChecklistTitle"}>
          <Table
            headers={[
              "blogSustainableFeeding.wasteTable.h1",
              "blogSustainableFeeding.wasteTable.h2",
              "blogSustainableFeeding.wasteTable.h3",
            ]}
            rows={[
              [
                "blogSustainableFeeding.wasteTable.r1.c1",
                "blogSustainableFeeding.wasteTable.r1.c2",
                "blogSustainableFeeding.wasteTable.r1.c3",
              ],
              [
                "blogSustainableFeeding.wasteTable.r2.c1",
                "blogSustainableFeeding.wasteTable.r2.c2",
                "blogSustainableFeeding.wasteTable.r2.c3",
              ],
              [
                "blogSustainableFeeding.wasteTable.r3.c1",
                "blogSustainableFeeding.wasteTable.r3.c2",
                "blogSustainableFeeding.wasteTable.r3.c3",
              ],
              [
                "blogSustainableFeeding.wasteTable.r4.c1",
                "blogSustainableFeeding.wasteTable.r4.c2",
                "blogSustainableFeeding.wasteTable.r4.c3",
              ],
            ]}
          />
        </Card>

        <Card title={"blogSustainableFeeding.sectionRumenFriendlyTitle"}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />{" "}
                {t("blogSustainableFeeding.rumen.protectTitle")}
              </h4>
              <BulletList
                items={[
                  "blogSustainableFeeding.rumen.protect.b1",
                  "blogSustainableFeeding.rumen.protect.b2",
                  "blogSustainableFeeding.rumen.protect.b3",
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Droplets className="h-4 w-4" />{" "}
                {t("blogSustainableFeeding.rumen.waterTitle")}
              </h4>
              <BulletList
                items={[
                  "blogSustainableFeeding.rumen.water.b1",
                  "blogSustainableFeeding.rumen.water.b2",
                  "blogSustainableFeeding.rumen.water.b3",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title={"blogSustainableFeeding.sectionWhatToDoTitle"}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />{" "}
                {t("blogSustainableFeeding.actions.todayTitle")}
              </h4>
              <BulletList
                items={[
                  "blogSustainableFeeding.actions.today.b1",
                  "blogSustainableFeeding.actions.today.b2",
                  "blogSustainableFeeding.actions.today.b3",
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">
                {t("blogSustainableFeeding.actions.weekTitle")}
              </h4>
              <BulletList
                items={[
                  "blogSustainableFeeding.actions.week.b1",
                  "blogSustainableFeeding.actions.week.b2",
                  "blogSustainableFeeding.actions.week.b3",
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">
                {t("blogSustainableFeeding.actions.monthTitle")}
              </h4>
              <BulletList
                items={[
                  "blogSustainableFeeding.actions.month.b1",
                  "blogSustainableFeeding.actions.month.b2",
                  "blogSustainableFeeding.actions.month.b3",
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title={"blogSustainableFeeding.sectionVerdantNoteTitle"}>
          <p className="text-muted-foreground leading-relaxed">
            {t("blogSustainableFeeding.verdantNote")}
          </p>
        </Card>
      </div>
    </div>
  );
}