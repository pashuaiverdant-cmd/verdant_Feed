import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

/* =========================
   ✅ CORS CONFIGURATION
========================= */

// ✅ Add your production domains here
const PROD_ORIGINS = new Set([
  "https://verdantfeed.com",
  "https://www.verdantfeed.com",
  "https://verdant-feed-1.onrender.com",
]);

// ✅ Allow local dev origins for Vite / React dev server
const DEV_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

// ✅ allow any localhost:* in dev (covers 5174/5175 etc.)
function isLocalhost(origin: string) {
  try {
    const u = new URL(origin);
    return (
      (u.hostname === "localhost" || u.hostname === "127.0.0.1") &&
      !!u.port
    );
  } catch {
    return false;
  }
}

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // ✅ Allow server-to-server calls (curl, health checks)
    if (!origin) return callback(null, true);

    const isProd = process.env.NODE_ENV === "production";

    // ✅ production: only allow whitelisted domains
    if (isProd) {
      if (PROD_ORIGINS.has(origin)) return callback(null, true);
      return callback(null, false);
    }

    // ✅ dev: allow local + any localhost:* + (optional) prod domains
    if (DEV_ORIGINS.has(origin) || isLocalhost(origin) || PROD_ORIGINS.has(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // keep false unless you use cookies auth
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

/* =========================
   BODY PARSERS
========================= */

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

/* =========================
   REQUEST LOGGER
========================= */

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

/* =========================
   ROUTES + SERVER START
========================= */

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5004", 10);

  httpServer.listen(port, () => {
    log(`serving on http://localhost:${port}`);
  });
})();
