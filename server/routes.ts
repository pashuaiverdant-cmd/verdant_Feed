import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes"; // ✅ changed from @shared/routes
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  /* ---------- PRODUCTS ---------- */
  app.get(api.products.list.path, async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  /* ---------- POSTS ---------- */
  app.get(api.posts.list.path, async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPost(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  /* ---------- DIET LOGS ---------- */
  app.post(api.dietLogs.create.path, async (req, res) => {
    try {
      const input = api.dietLogs.create.input.parse(req.body);
      const log = await storage.createDietLog(input);
      res.status(201).json(log);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.dietLogs.list.path, async (_req, res) => {
    const logs = await storage.getDietLogs();
    res.json(logs);
  });

  /* ---------- ORDERS ---------- */
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      return res.status(400).json({ message: (err as Error).message });
    }
  });

  /* ---------- SEED PRODUCTS (ONLY ONCE) ---------- */
  try {
    const existingProducts = await storage.getProducts();

    if (existingProducts.length < 6) {
      console.log("🌱 Seeding initial products...");

      await storage.createProduct({
        name: "Premium Cattle Feed Mix",
        description: "High-protein feed for dairy cattle",
        price: 2500,
        category: "Cattle",
        imageUrl: "/img/feed1.jpeg",
      });

      await storage.createProduct({
        name: "Goat Starter Pellet",
        description: "Balanced nutrition for growing goats",
        price: 1800,
        category: "Goat",
        imageUrl: "/img/feed2.jpeg",
      });

      await storage.createProduct({
        name: "Buffalo High Energy Feed",
        description: "Energy-dense feed for lactating buffaloes",
        price: 2800,
        category: "Buffalo",
        imageUrl: "/img/feed3.jpeg",
      });

      await storage.createProduct({
        name: "Cattle Growth Feed",
        description: "High protein feed for faster growth",
        price: 2200,
        category: "Cattle",
        imageUrl: "/img/feed4.jpeg",
      });

      await storage.createProduct({
        name: "Dairy Milk Booster",
        description: "Improves milk yield and quality",
        price: 2000,
        category: "Dairy",
        imageUrl: "/img/feed5.jpeg",
      });

      await storage.createProduct({
        name: "Poultry Starter Feed",
        description: "Nutrition for early-stage poultry",
        price: 1500,
        category: "Poultry",
        imageUrl: "/img/feed6.jpeg",
      });

      console.log("✅ Products seeded successfully");
    }
  } catch (err) {
    console.warn(
      "⚠️ Skipping DB seeding (DATABASE_URL missing or DB not reachable):",
      (err as Error)?.message ?? err
    );
  }

  return httpServer;
}