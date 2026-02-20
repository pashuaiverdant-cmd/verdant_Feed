import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePosts } from "@/hooks/use-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Search, Leaf } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";

type PostLike = {
  id: number | string;
  title: string;
  summary: string;
  imageUrl?: string;
  createdAt?: string | Date | null;
  category?: string;
  author?: string;
  slug: string;
};

function estimateReadTime(text: string, t: any) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(8, Math.round(words / 140));
  return t("common.minRead", "{{count}} min read", { count: minutes });
}

export default function Blog() {
  const { t } = useTranslation();
  const { data: apiPosts, isLoading } = usePosts();

  // ✅ Brand translations allowed on body pages
  const brandCore = t("brand.verdant", "Verdant");
  const brandFeed = t("brand.verdantFeed", "Verdant Feed");
  const brandTeam = t("brand.verdantFeedTeam", `${brandFeed} Team`);

  const brandVerdant = <span className="font-sans">{brandCore}</span>;
  const brandVerdantFeedTeam = <span className="font-sans">{brandTeam}</span>;

  const fallbackPosts: PostLike[] = [
    {
      id: 1,
      slug: "cattle-nutrition",
      title: t(
        "blog.fallback.0.title",
        "Modern Cattle Nutrition: Science Behind Better Milk Production"
      ),
      summary: t(
        "blog.fallback.0.summary",
        "Practical nutrition built on rumen stability: energy–protein balance, effective fiber, minerals, and water access."
      ),
      createdAt: new Date().toISOString(),
      category: t("blog.categories.nutrition", "Nutrition"),
      author: brandTeam,
    },
    {
      id: 2,
      slug: "livestock-diseases",
      title: t(
        "blog.fallback.1.title",
        "Common Livestock Diseases Every Farmer Should Know"
      ),
      summary: t(
        "blog.fallback.1.summary",
        "Field-ready health playbook covering mastitis basics, FMD awareness, parasites, hygiene routines and early detection."
      ),
      createdAt: new Date().toISOString(),
      category: t("blog.categories.health", "Health"),
      author: brandTeam,
    },
    {
      id: 3,
      slug: "sustainable-feeding",
      title: t(
        "blog.fallback.2.title",
        "Sustainable Feeding Practices for Modern Dairy Farms"
      ),
      summary: t(
        "blog.fallback.2.summary",
        "Reduce feed wastage, stabilize rumen health and improve productivity with modern feeding systems."
      ),
      createdAt: new Date().toISOString(),
      category: t("blog.categories.practices", "Practices"),
      author: brandTeam,
    },
  ];

  const posts: PostLike[] = (apiPosts?.length ? apiPosts : fallbackPosts) as any;

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen py-16 bg-background font-sans">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold text-primary"
          >
            {t("blog.title", "Farming Knowledge Hub")}
          </motion.h1>

          <p className="text-lg text-muted-foreground mt-4">
            <Trans
              i18nKey="blog.subtitle"
              components={{ brand: brandVerdant }}
              defaults="<brand />-style guides for livestock nutrition, disease prevention, and modern feeding systems."
            />
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("blog.search", "Search topics...")}
              className="pl-9 rounded-2xl"
            />
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              {t("blog.empty", "No articles found for your search.")}
            </p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Card className="mb-12 rounded-3xl border-border/60">
                <CardContent className="p-8 space-y-4">
                  <Badge className="rounded-full">
                    <Leaf className="mr-2 h-4 w-4" />
                    {t("blog.featured", "Featured")}
                  </Badge>

                  <h2 className="text-3xl font-serif font-semibold">
                    {featured.title}
                  </h2>

                  <p className="text-muted-foreground">{featured.summary}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {!!featured.author && (
                      <span>
                        <Trans
                          i18nKey="blog.byAuthor"
                          components={{ team: brandVerdantFeedTeam }}
                          defaults="By <team />"
                        />
                      </span>
                    )}

                    <span>{estimateReadTime(featured.summary, t)}</span>
                  </div>

                  <Link href={`/blog/${featured.slug}`}>
                    <Button className="rounded-2xl">
                      {t("blog.readFull", "Read Full Article")}
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Card
                  key={post.id}
                  className="rounded-3xl border-border/60 hover:shadow-lg transition"
                >
                  <CardContent className="p-6 space-y-3">
                    <Badge variant="secondary" className="rounded-full">
                      {post.category || t("blog.categories.general", "General")}
                    </Badge>

                    <h3 className="text-xl font-serif font-semibold">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">{post.summary}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {!!post.author && (
                        <span>
                          <Trans
                            i18nKey="blog.byAuthor"
                            components={{ team: brandVerdantFeedTeam }}
                            defaults="By <team />"
                          />
                        </span>
                      )}

                      <span>{estimateReadTime(post.summary, t)}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="rounded-2xl w-full">
                        {t("blog.readFull", "Read Full Article")}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}