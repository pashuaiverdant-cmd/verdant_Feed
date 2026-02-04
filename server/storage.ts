import {
  products,
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
  type InsertOrder
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;

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
  async getProducts() {
    return db.select().from(products);
  }

  async getProduct(id: number) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createOrder(insertOrder: InsertOrder) {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrderById(id: number) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrders() {
    return db.select().from(orders).orderBy(desc(orders.id));
  }

  async getPosts() {
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(id: number) {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createDietLog(insertLog: InsertDietLog) {
    const [log] = await db.insert(dietLogs).values(insertLog).returning();
    return log;
  }

  async getDietLogs() {
    return db.select().from(dietLogs).orderBy(desc(dietLogs.id));
  }

  async createProduct(insertProduct: InsertProduct) {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async createPost(insertPost: InsertPost) {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }
}

export const storage = new DatabaseStorage();
