import React from "react";
import { useRoute, Redirect, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function BlogPost() {
  const { t } = useTranslation();

  const [, params] = useRoute("/blog/:id");
  const postId = params?.id;

  const slugMap: Record<string, string> = {
    "cattle-nutrition": "/blog/cattle-nutrition",
    "livestock-diseases": "/blog/livestock-diseases",
    "sustainable-feeding": "/blog/sustainable-feeding",
  };

  if (postId && slugMap[String(postId)]) {
    return <Redirect to={slugMap[String(postId)]} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 font-sans">
      <div className="text-center max-w-lg">
        <p className="text-xl font-serif font-semibold mb-2 text-primary">
          {t("blogPost.notFound.title", "Article not found")}
        </p>

        <p className="text-muted-foreground mb-6">
          {t(
            "blogPost.notFound.subtitle",
            "This page is reserved for dynamic posts. Please visit the Blog page."
          )}
        </p>

        <Link href="/blog">
          <Button className="rounded-2xl">
            {t("blogPost.notFound.cta", "Back to Blog")}
          </Button>
        </Link>
      </div>
    </div>
  );
}