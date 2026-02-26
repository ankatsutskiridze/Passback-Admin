import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCampaignSchema, insertCreativeSchema } from "@shared/schema";

// ===== Local Admin Credentials =====
const ADMIN_EMAIL = "admin@passback.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_USER = {
  id: 1,
  email: ADMIN_EMAIL,
  username: ADMIN_EMAIL,
  name: "Admin",
  firstName: "Passback",
  lastName: "Admin",
  role: "admin",
};

// Simple in-memory session tracking
const activeSessions = new Set<string>();

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // ===== Local Auth routes =====
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = generateSessionToken();
      activeSessions.add(token);
      res.cookie("session_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "lax",
      });
      return res.json({ user: ADMIN_USER });
    }
    return res.status(401).json({ message: "Invalid email or password" });
  });

  app.get("/api/auth/verify", (req, res) => {
    const token = req.cookies?.session_token;
    if (token && activeSessions.has(token)) {
      return res.json({ user: ADMIN_USER });
    }
    return res.status(401).json({ message: "Not authenticated" });
  });

  app.post("/api/auth/logout", (req, res) => {
    const token = req.cookies?.session_token;
    if (token) activeSessions.delete(token);
    res.clearCookie("session_token");
    return res.json({ message: "Logged out" });
  });

  // ===== Dashboard stats =====
  app.get("/api/dashboard/stats", async (_req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

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
      return res.status(400).json({
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
