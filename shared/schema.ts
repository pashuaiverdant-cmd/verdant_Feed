import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* ---------------- PRODUCTS ---------------- */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
});

/* ---------------- POSTS ---------------- */
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------------- DIET LOGS ---------------- */
export const dietLogs = pgTable("diet_logs", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  cattleType: text("cattle_type").notNull(),
  breed: text("breed").notNull(),
  weightCategory: text("weight_category").notNull(),
  age: integer("age").notNull(),
  healthStatus: text("health_status").notNull(),
  tagged: text("tagged").notNull(),
  dietPlanResult: text("diet_plan_result").notNull(),
});

/* ---------------- ORDERS ---------------- */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------------- SCHEMAS ---------------- */
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true });
export const insertDietLogSchema = createInsertSchema(dietLogs).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });

/* ---------------- TYPES ---------------- */
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type DietLog = typeof dietLogs.$inferSelect;
export type InsertDietLog = z.infer<typeof insertDietLogSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
