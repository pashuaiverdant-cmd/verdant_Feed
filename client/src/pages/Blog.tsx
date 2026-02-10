import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePosts } from "@/hooks/use-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Calendar,
  Search,
  Tag,
  User,
  Sparkles,
  ShieldCheck,
  Leaf,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

type PostLike = {
  id: number | string;
  title: string;
  summary: string;
  imageUrl?: string; // 👈 optional now (you'll add local imgs)
  createdAt?: string | Date | null;
  category?: string;
  author?: string;
  slug: string;
};

const fallbackPosts: PostLike[] = [
  {
    id: 1,
    slug: "cattle-nutrition",
    title: "Modern Cattle Nutrition: Science Behind Better Milk Production",
    summary:
      "Practical nutrition built on rumen stability: energy–protein balance, effective fiber, minerals, and water access.",
    createdAt: new Date().toISOString(),
    category: "Nutrition",
    author: "Verdant Feed Team",
  },
  {
    id: 2,
    slug: "livestock-diseases",
    title: "Common Livestock Diseases Every Farmer Should Know",
    summary:
      "Field-ready health playbook covering mastitis basics, FMD awareness, parasites, hygiene routines and early detection.",
    createdAt: new Date().toISOString(),
    category: "Health",
    author: "Verdant Feed Team",
  },
  {
    id: 3,
    slug: "sustainable-feeding",
    title: "Sustainable Feeding Practices for Modern Dairy Farms",
    summary:
      "Reduce feed wastage, stabilize rumen health and improve productivity with modern feeding systems.",
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
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(8, Math.round(words / 140));
  return `${minutes} min read`;
}

export default function Blog() {
  const { data: apiPosts, isLoading } = usePosts();
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
    <div className="min-h-screen py-16 bg-background">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary"
          >
            Farming Knowledge Hub
          </motion.h1>
          <p className="text-lg text-muted-foreground mt-4">
            Verdant-style guides for livestock nutrition, disease prevention, and modern feeding systems.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics..."
              className="pl-9 rounded-2xl"
            />
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <>
            {/* FEATURED CARD (NO IMAGE — YOU WILL ADD LOCAL IMAGE LATER) */}
            {featured && (
              <Card className="mb-12 rounded-3xl border-border/60">
                <CardContent className="p-8 space-y-4">
                  <Badge className="rounded-full">
                    <Leaf className="mr-2 h-4 w-4" />
                    Featured
                  </Badge>

                  <h2 className="text-3xl font-display font-bold">
                    {featured.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {featured.summary}
                  </p>

                  <Link href={`/blog/${featured.slug}`}>
                    <Button className="rounded-2xl">
                      Read Full Article
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* GRID LIST */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Card
                  key={post.id}
                  className="rounded-3xl border-border/60 hover:shadow-lg transition"
                >
                  <CardContent className="p-6 space-y-3">
                    <Badge variant="secondary" className="rounded-full">
                      {post.category}
                    </Badge>

                    <h3 className="text-xl font-display font-bold">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {post.summary}
                    </p>

                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="rounded-2xl w-full">
                        Read Full Article
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
