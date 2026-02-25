import express from "express";
import type { Request, Response } from "express";

const app = express();

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: false }));

// AdVision-UI backend URL
const ADVISION_API =
  process.env.ADVISION_API_URL || "https://ad-vision-ui.vercel.app";

// Proxy helper: forwards request to AdVision-UI and returns response
async function proxyToAdVision(
  req: Request,
  res: Response,
  path: string,
  method: string = "GET",
) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (req.headers.cookie) {
      headers["Cookie"] = req.headers.cookie;
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && method !== "HEAD" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const apiRes = await fetch(`${ADVISION_API}${path}`, fetchOptions);

    // Forward set-cookie headers
    const setCookie = apiRes.headers.getSetCookie?.() || [];
    setCookie.forEach((cookie: string) => {
      res.append("Set-Cookie", cookie);
    });

    const data = await apiRes.json().catch(() => ({}));
    res.status(apiRes.status).json(data);
  } catch (e: any) {
    console.error(`Proxy error for ${path}:`, e.message);
    res.status(502).json({ message: "Backend service unavailable" });
  }
}

// Auth proxy routes
app.post("/api/auth/login", (req, res) =>
  proxyToAdVision(req, res, "/api/auth/login", "POST"),
);
app.get("/api/auth/verify", (req, res) =>
  proxyToAdVision(req, res, "/api/auth/verify", "GET"),
);
app.post("/api/auth/logout", (req, res) =>
  proxyToAdVision(req, res, "/api/auth/logout", "POST"),
);

// Admin proxy routes
app.get("/api/admin/users", (req, res) =>
  proxyToAdVision(req, res, "/api/admin/users", "GET"),
);
app.get("/api/admin/users/:id", (req, res) =>
  proxyToAdVision(req, res, `/api/admin/users/${req.params.id}`, "GET"),
);
app.put("/api/admin/users/:id", (req, res) =>
  proxyToAdVision(req, res, `/api/admin/users/${req.params.id}`, "PUT"),
);
app.patch("/api/admin/users/:id/role", (req, res) =>
  proxyToAdVision(req, res, `/api/admin/users/${req.params.id}/role`, "PATCH"),
);
app.delete("/api/admin/users/:id", (req, res) =>
  proxyToAdVision(req, res, `/api/admin/users/${req.params.id}`, "DELETE"),
);
app.get("/api/admin/stats", (req, res) =>
  proxyToAdVision(req, res, "/api/admin/stats", "GET"),
);
app.get("/api/admin/campaigns", (req, res) =>
  proxyToAdVision(req, res, "/api/admin/campaigns", "GET"),
);

// Catch-all
app.all("/api/*", (_req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
