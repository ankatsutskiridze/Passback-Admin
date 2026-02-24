import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCampaignSchema,
  insertCreativeSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

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
      const updated = await storage.updateClient(Number(req.params.id), req.body);
      if (!updated) return res.status(404).json({ message: "Client not found" });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Failed to update client" });
    }
  });

  app.get("/api/clients/:clientId/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaignsByClient(Number(req.params.clientId));
      res.json(campaigns);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    const result = insertCampaignSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid campaign data", errors: result.error.flatten() });
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
      const updated = await storage.updateCampaign(Number(req.params.id), req.body);
      if (!updated) return res.status(404).json({ message: "Campaign not found" });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });

  app.get("/api/clients/:clientId/creatives", async (req, res) => {
    try {
      const creatives = await storage.getCreativesByClient(Number(req.params.clientId));
      res.json(creatives);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch creatives" });
    }
  });

  app.get("/api/creatives/:id", async (req, res) => {
    try {
      const creative = await storage.getCreative(Number(req.params.id));
      if (!creative) return res.status(404).json({ message: "Creative not found" });
      res.json(creative);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch creative" });
    }
  });

  app.patch("/api/creatives/:id", async (req, res) => {
    try {
      const updated = await storage.updateCreative(Number(req.params.id), req.body);
      if (!updated) return res.status(404).json({ message: "Creative not found" });
      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Failed to update creative" });
    }
  });

  app.get("/api/clients/:clientId/payments", async (req, res) => {
    try {
      const payments = await storage.getPaymentsByClient(Number(req.params.clientId));
      res.json(payments);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  app.get("/api/clients/:clientId/notifications", async (req, res) => {
    try {
      const notifications = await storage.getNotificationsByClient(Number(req.params.clientId));
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
