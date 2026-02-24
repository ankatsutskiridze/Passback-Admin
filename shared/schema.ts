import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clients = pgTable("clients", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  avatar: text("avatar"),
  status: text("status").notNull().default("active"),
  role: text("role").notNull().default("agency"),
  plan: text("plan").default("Plan Name"),
  tier: text("tier").default("Gold Agency"),
  contactPerson: text("contact_person"),
  contactPhone: text("contact_phone"),
  registrationDate: text("registration_date"),
  campaignType: text("campaign_type").default("local"),
  specialCost: text("special_cost"),
  bankTransfer: boolean("bank_transfer").default(false),
});

export const campaigns = pgTable("campaigns", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clientId: integer("client_id").notNull(),
  name: text("name").notNull(),
  target: text("target").notNull().default("National"),
  status: text("status").notNull().default("Draft"),
  budget: text("budget").default("20K"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  creativeStatus: text("creative_status").default("Pending for approval"),
});

export const creatives = pgTable("creatives", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clientId: integer("client_id").notNull(),
  campaignId: integer("campaign_id"),
  name: text("name").notNull(),
  campaignName: text("campaign_name"),
  fileType: text("file_type").notNull().default("File"),
  status: text("status").notNull().default("Pending for Approval"),
  fileSize: text("file_size").default("230 Mb"),
  preview: text("preview"),
  date: text("date"),
});

export const payments = pgTable("payments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clientId: integer("client_id").notNull(),
  status: text("status").notNull().default("Paid"),
  date: text("date").notNull(),
  method: text("method").default("XXXX - XX83"),
  amount: text("amount").notNull(),
  campaignName: text("campaign_name"),
});

export const notifications = pgTable("notifications", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clientId: integer("client_id").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients);
export const insertCampaignSchema = createInsertSchema(campaigns);
export const insertCreativeSchema = createInsertSchema(creatives);
export const insertPaymentSchema = createInsertSchema(payments);
export const insertNotificationSchema = createInsertSchema(notifications);

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCreative = z.infer<typeof insertCreativeSchema>;
export type Creative = typeof creatives.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
