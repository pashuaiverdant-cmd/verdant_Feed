"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "buyFeed", href: "/products" },
    { key: "dietPlanner", href: "/diet-planner" },
    { key: "blog", href: "/blog" },
    { key: "about", href: "/about" },
  ] as const;

  const legalLinks = [
    { key: "privacyPolicy", href: "/privacy-policy" },
    { key: "terms", href: "/terms" },
  ] as const;

  return (
    <footer className="bg-primary text-primary-foreground font-sans">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container-custom pt-14 pb-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10 backdrop-blur">
                <img
                  src="/img/logo1.jpeg"
                  alt={t("footer.logoAlt", "Verdant Feed")}
                  className="h-10 w-auto"
                  loading="lazy"
                />
              </div>

              <div className="leading-tight">
                {/* Brand must stay English only */}
                <div
                  data-verdant-brand
                  className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-white notranslate"
                  translate="no"
                >
                  Verdant Feed
                </div>

                <div className="text-primary-foreground/70 text-sm">
                  {t("footer.tagline", "Premium nutrition • Better yield • Healthier livestock")}
                </div>
              </div>
            </div>

            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              {t(
                "footer.about",
                "Providing premium nutrition for healthy livestock. We care about your cattle as much as you do — with quality feed, trusted guidance, and better outcomes."
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              {(["qualityAssured", "farmerTrusted", "nutritionBacked"] as const).map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 ring-1 ring-white/10"
                >
                  {t(`footer.chips.${k}`, k)}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-lg font-semibold tracking-tight text-white mb-4">
              {t("footer.explore", "Explore")}
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="text-primary-foreground/80 hover:text-white transition-colors cursor-pointer">
                      {t(`footer.quickLinks.${l.key}`, l.key)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
              {t("footer.contact", "Contact")}
            </h3>

            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="mt-0.5 rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
                  <MapPin className="h-5 w-5" />
                </span>

                {/* Address should fully translate */}
                <p className="text-primary-foreground/80 leading-relaxed">
                  {t(
                    "footer.address",
                    "Verdant Food Park, Rajawas, Jaipur–Sikar Highway, Jaipur"
                  )}
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-0.5 rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
                  <Phone className="h-5 w-5" />
                </span>
                <p className="text-primary-foreground/80 notranslate" translate="no">
                  +91 789 10 11 401
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-0.5 rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
                  <Mail className="h-5 w-5" />
                </span>
                <p className="text-primary-foreground/80 notranslate" translate="no">
                  info@verdantfeed.com
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/10 ring-1 ring-white/10 p-4">
              <p className="text-white font-semibold">
                {t("footer.newsletterTitle", "Get feed tips & offers")}
              </p>
              <p className="text-primary-foreground/70 text-sm mt-1">
                {t("footer.newsletterDesc", "Monthly insights to improve yield and livestock health.")}
              </p>

              <form
                className="mt-3 flex flex-col sm:flex-row gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder={t("footer.emailPlaceholder", "Enter your email")}
                  className="h-11 w-full rounded-xl bg-white/10 px-3 text-white placeholder:text-white/50 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-white/30 font-sans"
                />
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-white text-primary px-4 font-semibold hover:bg-white/90 transition font-sans"
                >
                  {t("footer.subscribe", "Subscribe")}
                </button>
              </form>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/verdant.impact/"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/10 hover:bg-white/20 transition"
                aria-label={t("footer.social.facebook", "Facebook")}
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/verdantimpact/?originalSubdomain=in"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/10 hover:bg-white/20 transition"
                aria-label={t("footer.social.linkedin", "LinkedIn")}
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/verdant.impact?igsh=MWZwb3kwbmI3d2lrMA=="
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/10 hover:bg-white/20 transition"
                aria-label={t("footer.social.instagram", "Instagram")}
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Keep company legal name English only */}
          <p className="text-primary-foreground/60 text-sm">
            © {year}{" "}
            <span className="notranslate" translate="no">
              Verdant Impact Private Limited
            </span>
            . {t("footer.rights", "All rights reserved.")}
          </p>

          <div className="flex items-center gap-4 text-sm">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                <span className="text-primary-foreground/70 hover:text-white transition-colors cursor-pointer">
                  {t(`footer.${l.key}`, l.key)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}