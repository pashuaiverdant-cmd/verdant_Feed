import {
  products,
  productTranslations,
  posts,
  dietLogs,
  orders,
  type Product,
  type InsertProduct,
  type Post,
  type InsertPost,
  type DietLog,
  type InsertDietLog,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import { getDb } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  getProducts(lang?: string): Promise<Product[]>;
  getProduct(id: number, lang?: string): Promise<Product | undefined>;

  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrders(): Promise<Order[]>;

  getPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;

  createDietLog(log: InsertDietLog): Promise<DietLog>;
  getDietLogs(): Promise<DietLog[]>;

  createProduct(product: InsertProduct): Promise<Product>;
  createPost(post: InsertPost): Promise<Post>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(lang: string = "en") {
    const { db } = getDb();

    const rows = await db
      .select({
        id: products.id,
        name: sql<string>`COALESCE(${productTranslations.name}, ${products.name})`,
        description: sql<string>`COALESCE(${productTranslations.description}, ${products.description})`,
        price: products.price,
        category: products.category,
        imageUrl: products.imageUrl,
      })
      .from(products)
      .leftJoin(
        productTranslations,
        and(
          eq(productTranslations.productId, products.id),
          eq(productTranslations.lang, lang)
        )
      )
      .orderBy(desc(products.id));

    return rows as Product[];
  }

  async getProduct(id: number, lang: string = "en") {
    const { db } = getDb();

    const rows = await db
      .select({
        id: products.id,
        name: sql<string>`COALESCE(${productTranslations.name}, ${products.name})`,
        description: sql<string>`COALESCE(${productTranslations.description}, ${products.description})`,
        price: products.price,
        category: products.category,
        imageUrl: products.imageUrl,
      })
      .from(products)
      .leftJoin(
        productTranslations,
        and(
          eq(productTranslations.productId, products.id),
          eq(productTranslations.lang, lang)
        )
      )
      .where(eq(products.id, id));

    return (rows[0] as Product) || undefined;
  }

  async createOrder(insertOrder: InsertOrder) {
    const { db } = getDb();
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrderById(id: number) {
    const { db } = getDb();
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrders() {
    const { db } = getDb();
    return db.select().from(orders).orderBy(desc(orders.id));
  }

  async getPosts() {
    const { db } = getDb();
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(id: number) {
    const { db } = getDb();
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createDietLog(insertLog: InsertDietLog) {
    const { db } = getDb();
    const [log] = await db.insert(dietLogs).values(insertLog).returning();
    return log;
  }

  async getDietLogs() {
    const { db } = getDb();
    return db.select().from(dietLogs).orderBy(desc(dietLogs.id));
  }

  async createProduct(insertProduct: InsertProduct) {
    const { db } = getDb();
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async createPost(insertPost: InsertPost) {
    const { db } = getDb();
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }
}

export const storage = new DatabaseStorage();
