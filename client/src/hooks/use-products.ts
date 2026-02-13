import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const API_BASE = import.meta.env.VITE_API_URL;

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${api.products.list.path}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}
