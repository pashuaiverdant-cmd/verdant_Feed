import { z } from 'zod';
import { insertProductSchema, insertPostSchema, insertDietLogSchema, insertOrderSchema, products, posts, dietLogs, orders } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: { method: 'GET' as const, path: '/api/products', responses: { 200: z.array(z.custom<typeof products.$inferSelect>()) } },
    get: { method: 'GET' as const, path: '/api/products/:id', responses: { 200: z.custom<typeof products.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  posts: {
    list: { method: 'GET' as const, path: '/api/posts', responses: { 200: z.array(z.custom<typeof posts.$inferSelect>()) } },
    get: { method: 'GET' as const, path: '/api/posts/:id', responses: { 200: z.custom<typeof posts.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  dietLogs: {
    create: { method: 'POST' as const, path: '/api/diet-logs', input: insertDietLogSchema, responses: { 201: z.custom<typeof dietLogs.$inferSelect>(), 400: errorSchemas.validation } },
    list: { method: 'GET' as const, path: '/api/diet-logs', responses: { 200: z.array(z.custom<typeof dietLogs.$inferSelect>()) } },
  },
  orders: {
    list: { method: 'GET' as const, path: '/api/orders', responses: { 200: z.array(z.custom<typeof orders.$inferSelect>()) } },
    get: { method: 'GET' as const, path: '/api/orders/:id', responses: { 200: z.custom<typeof orders.$inferSelect>(), 404: errorSchemas.notFound } },
    create: { method: 'POST' as const, path: '/api/orders', input: insertOrderSchema, responses: { 201: z.custom<typeof orders.$inferSelect>(), 400: errorSchemas.validation } },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) Object.entries(params).forEach(([key, value]) => { if (url.includes(`:${key}`)) url = url.replace(`:${key}`, String(value)); });
  return url;
}
