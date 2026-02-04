import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePosts } from "@/hooks/use-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search, ArrowUpRight, User, Tag } from "lucide-react";
import { format } from "date-fns";

type PostLike = {
  id: number | string;
  title: string;
  summary: string;
  imageUrl: string;
  createdAt?: string | Date | null;
  category?: string;
  author?: string;
};

const fallbackPosts: PostLike[] = [
  {
    id: 1,
    title: "Modern Cattle Nutrition: Science Behind Better Milk Production",
    summary:
      "Balanced protein, minerals, and feeding routines can boost milk yield and improve herd health. Here’s a practical approach for farmers.",
    imageUrl: "/images/blog-cattle-nutrition.jpg",
    createdAt: new Date().toISOString(),
    category: "Nutrition",
    author: "Verdant Feed Team",
  },
  {
    id: 2,
    title: "Common Livestock Diseases Every Farmer Should Know",
    summary:
      "Understand early signs of FMD, mastitis, bloat and more. Prevention practices that reduce losses and improve farm stability.",
    imageUrl: "/images/blog-livestock-health.jpg",
    createdAt: new Date().toISOString(),
    category: "Health",
    author: "Verdant Feed Team",
  },
  {
    id: 3,
    title: "Sustainable Feeding Practices for Modern Dairy Farms",
    summary:
      "Reduce feed waste and improve digestion using silage, precision feeding, and water management. Simple changes, big impact.",
    imageUrl: "/images/blog-sustainable-feed.jpg",
    createdAt: new Date().toISOString(),
    category: "Practices",
    author: "Verdant Feed Team",
  },
];

function formatDateSafe(value?: string | Date | null) {
  try {
    if (!value) return "Recently";
    return format(new Date(value), "MMMM dd, yyyy");
  } catch {
    return "Recently";
  }
}

function estimateReadTime(text: string) {
  // ~200 wpm rough estimate
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export default function Blog() {
  const { data: apiPosts, isLoading } = usePosts();
  const posts: PostLike[] = (apiPosts?.length ? apiPosts : fallbackPosts) as any;

  const [query, setQuery] = useState("");
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [posts, query, activeCategory]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-4"
          >
            Farming Knowledge Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-lg text-muted-foreground"
          >
            Livestock management, cattle nutrition, and modern farm practices —
            written in simple, practical language.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs (nutrition, disease, feeding...)"
              className="pl-9 rounded-2xl"
            />
          </div>

          <div className="flex gap-2 flex-wrap md:justify-end">
            {categories.map((c) => (
              <Button
                key={c}
                variant={activeCategory === c ? "default" : "outline"}
                size="sm"
                className="rounded-2xl"
                onClick={() => setActiveCategory(c)}
              >
                <Tag className="mr-2 h-4 w-4" />
                {c}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8">
                <Skeleton className="w-full md:w-1/3 h-64 rounded-2xl" />
                <div className="w-full md:w-2/3 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-display font-bold">
                    Featured
                  </h2>
                  <Badge className="rounded-full">Top pick</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch bg-white border border-border/60 rounded-3xl overflow-hidden hover:shadow-xl transition-all">
                  <div className="aspect-[16/10] md:aspect-auto md:h-full bg-secondary overflow-hidden">
                    <img
                      src={featured.imageUrl}
                      alt={featured.title}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center">
                          <Calendar className="mr-1.5 h-4 w-4" />
                          {formatDateSafe(featured.createdAt)}
                        </span>
                        <span className="inline-flex items-center">
                          <User className="mr-1.5 h-4 w-4" />
                          {featured.author || "Verdant Feed Team"}
                        </span>
                        <Badge variant="secondary" className="rounded-full">
                          {featured.category || "General"}
                        </Badge>
                        <span className="text-xs">
                          {estimateReadTime(featured.summary)}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">
                        {featured.title}
                      </h3>

                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {featured.summary}
                      </p>
                    </div>

                    <div className="pt-6">
                      <Link href={`/blog/${featured.id}`}>
                        <Button className="rounded-2xl">
                          Read Full Article
                          <ArrowUpRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {/* List */}
            <div className="grid gap-8">
              {rest.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="group grid md:grid-cols-3 gap-8 items-start bg-white p-6 rounded-3xl border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className="md:col-span-1 aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="inline-flex items-center">
                        <Calendar className="mr-1.5 h-4 w-4" />
                        {formatDateSafe(post.createdAt)}
                      </div>
                      <div className="inline-flex items-center">
                        <User className="mr-1.5 h-4 w-4" />
                        {post.author || "Verdant Feed Team"}
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {post.category || "General"}
                      </Badge>
                      <span className="text-xs">
                        {estimateReadTime(post.summary)}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {post.summary}
                    </p>

                    <div className="pt-2">
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="outline" className="rounded-2xl">
                          Read Full Article
                          <ArrowUpRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">
                    No blog posts found. Try a different search or category.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}