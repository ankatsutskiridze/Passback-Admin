import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  clients, campaigns, creatives, payments, notifications,
  type Client, type InsertClient,
  type Campaign, type InsertCampaign,
  type Creative, type InsertCreative,
  type Payment, type InsertPayment,
  type Notification, type InsertNotification,
} from "@shared/schema";

export interface IStorage {
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, data: Partial<InsertClient>): Promise<Client | undefined>;

  getCampaignsByClient(clientId: number): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign | undefined>;

  getCreativesByClient(clientId: number): Promise<Creative[]>;
  getCreative(id: number): Promise<Creative | undefined>;
  createCreative(creative: InsertCreative): Promise<Creative>;
  updateCreative(id: number, data: Partial<InsertCreative>): Promise<Creative | undefined>;

  getPaymentsByClient(clientId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;

  getNotificationsByClient(clientId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getClients(): Promise<Client[]> {
    return db.select().from(clients);
  }

  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [created] = await db.insert(clients).values(client).returning();
    return created;
  }

  async updateClient(id: number, data: Partial<InsertClient>): Promise<Client | undefined> {
    const [updated] = await db.update(clients).set(data).where(eq(clients.id, id)).returning();
    return updated;
  }

  async getCampaignsByClient(clientId: number): Promise<Campaign[]> {
    return db.select().from(campaigns).where(eq(campaigns.clientId, clientId));
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign;
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const [created] = await db.insert(campaigns).values(campaign).returning();
    return created;
  }

  async updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const [updated] = await db.update(campaigns).set(data).where(eq(campaigns.id, id)).returning();
    return updated;
  }

  async getCreativesByClient(clientId: number): Promise<Creative[]> {
    return db.select().from(creatives).where(eq(creatives.clientId, clientId));
  }

  async getCreative(id: number): Promise<Creative | undefined> {
    const [creative] = await db.select().from(creatives).where(eq(creatives.id, id));
    return creative;
  }

  async createCreative(creative: InsertCreative): Promise<Creative> {
    const [created] = await db.insert(creatives).values(creative).returning();
    return created;
  }

  async updateCreative(id: number, data: Partial<InsertCreative>): Promise<Creative | undefined> {
    const [updated] = await db.update(creatives).set(data).where(eq(creatives.id, id)).returning();
    return updated;
  }

  async getPaymentsByClient(clientId: number): Promise<Payment[]> {
    return db.select().from(payments).where(eq(payments.clientId, clientId));
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [created] = await db.insert(payments).values(payment).returning();
    return created;
  }

  async getNotificationsByClient(clientId: number): Promise<Notification[]> {
    return db.select().from(notifications).where(eq(notifications.clientId, clientId));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [created] = await db.insert(notifications).values(notification).returning();
    return created;
  }

  async markNotificationRead(id: number): Promise<void> {
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
  }
}

export const storage = new DatabaseStorage();
