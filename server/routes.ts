import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCampaignSchema, insertCreativeSchema } from "@shared/schema";

// AdVision-UI backend URL for auth/admin proxy
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
    // Forward cookies for session
    if (req.headers.cookie) {
      headers["Cookie"] = req.headers.cookie;
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials: "include" as RequestCredentials,
    };

    if (method !== "GET" && method !== "HEAD" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const apiRes = await fetch(`${ADVISION_API}${path}`, fetchOptions);

    // Forward set-cookie headers from AdVision-UI
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

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // ===== Auth proxy routes (forward to AdVision-UI) =====
  app.post("/api/auth/login", (req, res) =>
    proxyToAdVision(req, res, "/api/auth/login", "POST"),
  );
  app.get("/api/auth/verify", (req, res) =>
    proxyToAdVision(req, res, "/api/auth/verify", "GET"),
  );
  app.post("/api/auth/logout", (req, res) =>
    proxyToAdVision(req, res, "/api/auth/logout", "POST"),
  );

  // ===== Admin proxy routes (forward to AdVision-UI) =====
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
    proxyToAdVision(
      req,
      res,
      `/api/admin/users/${req.params.id}/role`,
      "PATCH",
    ),
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

  // ===== Local data routes =====
  app.get("/api/clients", async (_req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(Number(req.params.id));
      if (!client) return res.status(404).json({ message: "Client not found" });
      res.json(client);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  app.patch("/api/clients/:id", async (req, res) => {
    try {
      const updated = await storage.updateClient(
        Number(req.params.id),
        req.body,
      );
      if (!updated)
        return res.status(404).json({ message: "Client not found" });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Failed to update client" });
    }
  });

  app.get("/api/clients/:clientId/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaignsByClient(
        Number(req.params.clientId),
      );
      res.json(campaigns);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    const result = insertCampaignSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({
          message: "Invalid campaign data",
          errors: result.error.flatten(),
        });
    }
    try {
      const campaign = await storage.createCampaign(result.data);
      res.status(201).json(campaign);
    } catch (e) {
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const updated = await storage.updateCampaign(
        Number(req.params.id),
        req.body,
      );
      if (!updated)
        return res.status(404).json({ message: "Campaign not found" });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });

  app.get("/api/clients/:clientId/creatives", async (req, res) => {
    try {
      const creatives = await storage.getCreativesByClient(
        Number(req.params.clientId),
      );
      res.json(creatives);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch creatives" });
    }
  });

  app.get("/api/creatives/:id", async (req, res) => {
    try {
      const creative = await storage.getCreative(Number(req.params.id));
      if (!creative)
        return res.status(404).json({ message: "Creative not found" });
      res.json(creative);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch creative" });
    }
  });

  app.patch("/api/creatives/:id", async (req, res) => {
    try {
      const updated = await storage.updateCreative(
        Number(req.params.id),
        req.body,
      );
      if (!updated)
        return res.status(404).json({ message: "Creative not found" });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Failed to update creative" });
    }
  });

  app.get("/api/clients/:clientId/payments", async (req, res) => {
    try {
      const payments = await storage.getPaymentsByClient(
        Number(req.params.clientId),
      );
      res.json(payments);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  app.get("/api/clients/:clientId/notifications", async (req, res) => {
    try {
      const notifications = await storage.getNotificationsByClient(
        Number(req.params.clientId),
      );
      res.json(notifications);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      await storage.markNotificationRead(Number(req.params.id));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ message: "Failed to update notification" });
    }
  });

  return httpServer;
}
