import { QueryClient, QueryFunction } from "@tanstack/react-query";

function getApiBase() {
  const raw = import.meta.env.VITE_API_URL || "";
  return raw.replace(/\/$/, ""); // trim trailing slash
}

const API_BASE = getApiBase();

function joinUrl(base: string, path: string) {
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}


function toAbsoluteUrl(url: string) {
  if (!url) return url;

  
  if (/^https?:\/\//i.test(url)) return url;

  
  if (!API_BASE) {
    console.warn(
      "VITE_API_URL is not set. Add it to client/.env.production (or client/.env).",
    );
   
    return url.startsWith("/") ? url : `/${url}`;
  }

  return joinUrl(API_BASE, url);
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
): Promise<Response> {
  const absUrl = toAbsoluteUrl(url);

  const res = await fetch(absUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    
    const raw = queryKey.join("/") as string;
    const url = toAbsoluteUrl(raw);

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
