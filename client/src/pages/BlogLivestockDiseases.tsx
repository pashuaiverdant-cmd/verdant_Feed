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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="container-custom max-w-5xl space-y-10">
        <div className="flex items-center justify-between gap-3">
          <Link href="/blog">
            <Button variant="outline" className="rounded-2xl">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t("blogLivestockDiseases.backToBlog")}
            </Button>
          </Link>
          <Badge className="rounded-full">
            {t("blogLivestockDiseases.badgeHealthIndianDairy")}
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
              {t("blogLivestockDiseases.title")}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("blogLivestockDiseases.subtitle")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                {t("blogLivestockDiseases.updatedLabel")}{" "}
                {t("blogLivestockDiseases.updatedAt", { defaultValue: updatedAt })}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogLivestockDiseases.tagPracticalSOPs")}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogLivestockDiseases.tagIsolationHygiene")}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                {t("blogLivestockDiseases.tagRecordkeeping")}
              </Badge>
            </div>
          </div>
        </motion.div>

        <Card title={t("blogLivestockDiseases.section60sCheckTitle")}>
          <BulletList
            items={[
              t("blogLivestockDiseases.section60sCheck.item1"),
              t("blogLivestockDiseases.section60sCheck.item2"),
              t("blogLivestockDiseases.section60sCheck.item3"),
              t("blogLivestockDiseases.section60sCheck.item4"),
              t("blogLivestockDiseases.section60sCheck.item5"),
              t("blogLivestockDiseases.section60sCheck.item6"),
              t("blogLivestockDiseases.section60sCheck.item7"),
            ]}
          />
        </Card>

        <Card title={t("blogLivestockDiseases.sectionEmergencyTitle")}>
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <BulletList
              items={[
                t("blogLivestockDiseases.sectionEmergency.item1"),
                t("blogLivestockDiseases.sectionEmergency.item2"),
                t("blogLivestockDiseases.sectionEmergency.item3"),
                t("blogLivestockDiseases.sectionEmergency.item4"),
                t("blogLivestockDiseases.sectionEmergency.item5"),
              ]}
            />
          </div>
        </Card>

        <Card title={t("blogLivestockDiseases.sectionCommonGroupsTitle")}>
          <Table
            headers={[
              t("blogLivestockDiseases.table.headers.group"),
              t("blogLivestockDiseases.table.headers.examples"),
              t("blogLivestockDiseases.table.headers.earlyClues"),
              t("blogLivestockDiseases.table.headers.firstActions"),
            ]}
            rows={[
              [
                t("blogLivestockDiseases.table.rows.udderMilk.group"),
                t("blogLivestockDiseases.table.rows.udderMilk.examples"),
                t("blogLivestockDiseases.table.rows.udderMilk.earlyClues"),
                t("blogLivestockDiseases.table.rows.udderMilk.firstActions"),
              ],
              [
                t("blogLivestockDiseases.table.rows.digestiveRumen.group"),
                t("blogLivestockDiseases.table.rows.digestiveRumen.examples"),
                t("blogLivestockDiseases.table.rows.digestiveRumen.earlyClues"),
                t("blogLivestockDiseases.table.rows.digestiveRumen.firstActions"),
              ],
              [
                t("blogLivestockDiseases.table.rows.feetLegs.group"),
                t("blogLivestockDiseases.table.rows.feetLegs.examples"),
                t("blogLivestockDiseases.table.rows.feetLegs.earlyClues"),
                t("blogLivestockDiseases.table.rows.feetLegs.firstActions"),
              ],
              [
                t("blogLivestockDiseases.table.rows.reproduction.group"),
                t("blogLivestockDiseases.table.rows.reproduction.examples"),
                t("blogLivestockDiseases.table.rows.reproduction.earlyClues"),
                t("blogLivestockDiseases.table.rows.reproduction.firstActions"),
              ],
              [
                t("blogLivestockDiseases.table.rows.skinVector.group"),
                t("blogLivestockDiseases.table.rows.skinVector.examples"),
                t("blogLivestockDiseases.table.rows.skinVector.earlyClues"),
                t("blogLivestockDiseases.table.rows.skinVector.firstActions"),
              ],
            ]}
          />
        </Card>

        <Card title={t("blogLivestockDiseases.sectionMastitisSOPTitle")}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />{" "}
                {t("blogLivestockDiseases.mastitis.preventionTitle")}
              </h4>
              <BulletList
                items={[
                  t("blogLivestockDiseases.mastitis.prevention.item1"),
                  t("blogLivestockDiseases.mastitis.prevention.item2"),
                  t("blogLivestockDiseases.mastitis.prevention.item3"),
                  t("blogLivestockDiseases.mastitis.prevention.item4"),
                  t("blogLivestockDiseases.mastitis.prevention.item5"),
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />{" "}
                {t("blogLivestockDiseases.mastitis.suspectedTitle")}
              </h4>
              <BulletList
                items={[
                  t("blogLivestockDiseases.mastitis.suspected.item1"),
                  t("blogLivestockDiseases.mastitis.suspected.item2"),
                  t("blogLivestockDiseases.mastitis.suspected.item3"),
                  t("blogLivestockDiseases.mastitis.suspected.item4"),
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title={t("blogLivestockDiseases.sectionBloatAcidosisTitle")}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Droplets className="h-4 w-4" />{" "}
                {t("blogLivestockDiseases.bloat.title")}
              </h4>
              <BulletList
                items={[
                  t("blogLivestockDiseases.bloat.item1"),
                  t("blogLivestockDiseases.bloat.item2"),
                  t("blogLivestockDiseases.bloat.item3"),
                  t("blogLivestockDiseases.bloat.item4"),
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Thermometer className="h-4 w-4" />{" "}
                {t("blogLivestockDiseases.acidosis.title")}
              </h4>
              <BulletList
                items={[
                  t("blogLivestockDiseases.acidosis.item1"),
                  t("blogLivestockDiseases.acidosis.item2"),
                  t("blogLivestockDiseases.acidosis.item3"),
                  t("blogLivestockDiseases.acidosis.item4"),
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title={t("blogLivestockDiseases.sectionBiosecurityTitle")}>
          <BulletList
            items={[
              t("blogLivestockDiseases.biosecurity.item1"),
              t("blogLivestockDiseases.biosecurity.item2"),
              t("blogLivestockDiseases.biosecurity.item3"),
              t("blogLivestockDiseases.biosecurity.item4"),
              t("blogLivestockDiseases.biosecurity.item5"),
            ]}
          />
        </Card>

        <Card title={t("blogLivestockDiseases.sectionTodayWeekMonthTitle")}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">
                {t("blogLivestockDiseases.plan.todayTitle")}
              </h4>
              <BulletList
                items={[
                  t("blogLivestockDiseases.plan.today.item1"),
                  t("blogLivestockDiseases.plan.today.item2"),
                  t("blogLivestockDiseases.plan.today.item3"),
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">
                {t("blogLivestockDiseases.plan.weekTitle")}
              </h4>
              <BulletList
                items={[
                  t("blogLivestockDiseases.plan.week.item1"),
                  t("blogLivestockDiseases.plan.week.item2"),
                  t("blogLivestockDiseases.plan.week.item3"),
                ]}
              />
            </div>
            <div className="rounded-2xl border border-border/60 p-4">
              <h4 className="font-semibold mb-2">
                {t("blogLivestockDiseases.plan.monthTitle")}
              </h4>
              <BulletList
                items={[
                  t("blogLivestockDiseases.plan.month.item1"),
                  t("blogLivestockDiseases.plan.month.item2"),
                  t("blogLivestockDiseases.plan.month.item3"),
                ]}
              />
            </div>
          </div>
        </Card>

        <Card title={t("blogLivestockDiseases.noteTitle")}>
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Stethoscope className="h-5 w-5" />
            </span>
            <p className="text-muted-foreground leading-relaxed">
              {t("blogLivestockDiseases.noteText")}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}