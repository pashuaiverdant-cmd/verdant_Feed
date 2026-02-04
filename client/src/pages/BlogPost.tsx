import React, { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { usePosts } from "@/hooks/use-posts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { format } from "date-fns";

type PostLike = {
  id: number | string;
  title: string;
  summary: string;
  imageUrl: string;
  createdAt?: string | Date | null;
  category?: string;
  author?: string;
  // If your backend later supports it, you can add `content?: string`
  content?: string;
};

const fallbackPosts: PostLike[] = [
  {
    id: 1,
    title: "Modern Cattle Nutrition: Science Behind Better Milk Production",
    summary:
      "Balanced protein, minerals, and feeding routines can boost milk yield and improve herd health.",
    imageUrl: "/images/blog-cattle-nutrition.jpg",
    createdAt: new Date().toISOString(),
    category: "Nutrition",
    author: "Verdant Feed Team",
    content:
      "Modern dairy farming depends heavily on scientific nutrition planning. Start by balancing protein, energy, and minerals. Ensure clean water 24/7, avoid sudden feed changes, and support rumen health using fiber-rich fodder. Consistent nutrition improves milk quality and reduces vet costs.",
  },
  {
    id: 2,
    title: "Common Livestock Diseases Every Farmer Should Know",
    summary:
      "Understand early signs of common cattle diseases and preventive practices.",
    imageUrl: "/images/blog-livestock-health.jpg",
    createdAt: new Date().toISOString(),
    category: "Health",
    author: "Verdant Feed Team",
    content:
      "Livestock diseases like FMD, mastitis and bloat can spread fast. Prevention includes vaccination, hygiene, clean bedding, balanced mineral intake, and early symptom monitoring. If appetite drops, fever rises, or milk changes, consult a vet quickly.",
  },
  {
    id: 3,
    title: "Sustainable Feeding Practices for Modern Dairy Farms",
    summary:
      "Reduce feed waste and improve digestion using silage and precision feeding.",
    imageUrl: "/images/blog-sustainable-feed.jpg",
    createdAt: new Date().toISOString(),
    category: "Practices",
    author: "Verdant Feed Team",
    content:
      "Sustainable livestock farming focuses on feed efficiency: store fodder properly, use silage, measure portions, reduce spillage, and keep water clean. These steps improve digestion and help reduce costs while supporting long-term farm productivity.",
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

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id;

  const { data: apiPosts, isLoading } = usePosts();
  const posts: PostLike[] = (apiPosts?.length ? apiPosts : fallbackPosts) as any;

  const post = useMemo(() => {
    return posts.find((p) => String(p.id) === String(postId));
  }, [posts, postId]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container-custom max-w-4xl">
          <Skeleton className="h-10 w-40 rounded-2xl mb-6" />
          <Skeleton className="h-12 w-3/4 rounded-2xl mb-4" />
          <Skeleton className="h-5 w-1/2 rounded-2xl mb-8" />
          <Skeleton className="h-72 w-full rounded-3xl mb-10" />
          <Skeleton className="h-6 w-full rounded-2xl mb-3" />
          <Skeleton className="h-6 w-full rounded-2xl mb-3" />
          <Skeleton className="h-6 w-2/3 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-xl text-muted-foreground mb-6">
            Blog post not found.
          </p>
          <Link href="/blog">
            <Button className="rounded-2xl">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container-custom max-w-4xl">
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="outline" className="rounded-2xl">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-5"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center">
              <Calendar className="mr-1.5 h-4 w-4" />
              {formatDateSafe(post.createdAt)}
            </span>
            <span className="inline-flex items-center">
              <User className="mr-1.5 h-4 w-4" />
              {post.author || "Verdant Feed Team"}
            </span>
            <Badge variant="secondary" className="rounded-full">
              {post.category || "General"}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {post.summary}
          </p>

          <div className="rounded-3xl overflow-hidden border border-border/60 bg-secondary">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-display">
            <p className="text-foreground leading-relaxed">
              {post.content ||
                "This article will be available soon. Add a `content` field in your backend to show full text here."}
            </p>

            <h3>Quick Takeaways</h3>
            <ul>
              <li>Use consistent feed routines and clean water daily.</li>
              <li>Mineral balance improves productivity and reduces disease risk.</li>
              <li>Track changes early (appetite, milk, temperature).</li>
            </ul>

            <h3>Want help?</h3>
            <p>
              If you want, I can also add an <strong>Admin “Add Blog”</strong>{" "}
              page so you can publish posts from your dashboard.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}