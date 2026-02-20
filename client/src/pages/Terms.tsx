"use client";

import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            {t("terms.hero.title", "Terms of Use")}
          </h1>
          <p className="text-white/80 mt-2">
            {t("terms.hero.subtitle", "Rules and guidelines for using Verdant Feed")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              key: "acceptance",
              title: t("terms.sections.acceptance.title", "Acceptance of Terms"),
              text: t(
                "terms.sections.acceptance.text",
                "By using this website, you agree to comply with these Terms and all applicable laws."
              ),
            },
            {
              key: "usage",
              title: t("terms.sections.usage.title", "Website Usage"),
              text: t(
                "terms.sections.usage.text",
                "You agree not to misuse the website, attempt unauthorized access, or disrupt services."
              ),
            },
            {
              key: "orders",
              title: t("terms.sections.orders.title", "Orders & Services"),
              text: t(
                "terms.sections.orders.text",
                "Submitting inquiries does not guarantee confirmation. Our team may contact you for details."
              ),
            },
            {
              key: "ip",
              title: t("terms.sections.ip.title", "Intellectual Property"),
              text: (
                <>
                  {t("terms.sections.ip.textPrefix", "All branding, content, and design elements belong to")}{" "}
                  <span className="notranslate" translate="no">
                    Verdant Feed Solutions
                  </span>
                  .
                </>
              ),
            },
            {
              key: "liability",
              title: t("terms.sections.liability.title", "Limitation of Liability"),
              text: t(
                "terms.sections.liability.text",
                "We are not liable for indirect damages resulting from use of this website."
              ),
            },
          ].map((item) => (
            <div key={item.key} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}