"use client";

import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const sections = [
    {
      key: "collect",
      titleKey: "privacy.sections.collect.title",
      titleFallback: "Information We Collect",
      textKey: "privacy.sections.collect.text",
      textFallback:
        "We may collect contact details like name, phone, email, and address when you submit forms or inquiries on our website.",
    },
    {
      key: "use",
      titleKey: "privacy.sections.use.title",
      titleFallback: "How We Use Information",
      textKey: "privacy.sections.use.text",
      textFallback:
        "We use your information to respond to inquiries, improve services, and provide updates related to your requests.",
    },
    {
      key: "protect",
      titleKey: "privacy.sections.protect.title",
      titleFallback: "Data Protection",
      textKey: "privacy.sections.protect.text",
      textFallback:
        "We implement reasonable security practices to protect your data, but no online transmission is 100% secure.",
    },
    {
      key: "cookies",
      titleKey: "privacy.sections.cookies.title",
      titleFallback: "Cookies",
      textKey: "privacy.sections.cookies.text",
      textFallback:
        "Our website may use cookies to improve user experience and understand website traffic.",
    },
    {
      key: "contact",
      titleKey: "privacy.sections.contact.title",
      titleFallback: "Contact",
      textKey: "privacy.sections.contact.text",
      textFallback: "For privacy concerns, email us at info@verdantimpact.com.",
    },
  ] as const;

  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            {t("privacy.hero.title", "Privacy Policy")}
          </h1>
          <p className="text-white/80 mt-2">
            {t(
              "privacy.hero.subtitle",
              "How Verdant Feed protects and uses your information"
            )}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <h2 className="font-display text-xl font-semibold mb-2">
                {t(item.titleKey, item.titleFallback)}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(item.textKey, item.textFallback)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}