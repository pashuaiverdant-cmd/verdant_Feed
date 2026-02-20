import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useTranslation } from "react-i18next";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5004" : undefined);

if (!API_BASE) {
  throw new Error(
    "VITE_API_URL is missing in production build. Set it in .env.production and rebuild."
  );
}

export function useProducts() {
  const { i18n } = useTranslation();

  // ✅ normalize language codes: hi-IN -> hi, en-US -> en
  const lang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  return useQuery({
    // ✅ refetch when language changes
    queryKey: [api.products.list.path, lang],

    queryFn: async () => {
      const url = new URL(`${API_BASE}${api.products.list.path}`);
      url.searchParams.set("lang", lang);

      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch products");

      const json = await res.json();
      return api.products.list.responses[200].parse(json);
    },

    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
