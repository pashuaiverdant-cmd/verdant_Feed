import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertDietLog } from "@shared/routes";

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL is missing. Check client/.env.production and rebuild.");
}

export function useDietLogs() {
  return useQuery({
    queryKey: [api.dietLogs.list.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${api.dietLogs.list.path}`);
      if (!res.ok) throw new Error("Failed to fetch diet logs");
      return api.dietLogs.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateDietLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertDietLog) => {
      const validated = api.dietLogs.create.input.parse(data);

      const res = await fetch(`${API_BASE}${api.dietLogs.create.path}`, {
        method: api.dietLogs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.dietLogs.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create diet log");
      }

      return api.dietLogs.create.responses[201].parse(await res.json());
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dietLogs.list.path] });
    },
  });
}
