import "dotenv/config";
import { db } from "./db";
import {
  clients,
  campaigns,
  creatives,
  payments,
  notifications,
} from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(notifications);
  await db.delete(payments);
  await db.delete(creatives);
  await db.delete(campaigns);
  await db.delete(clients);

  // Seed clients
  const [client1] = await db
    .insert(clients)
    .values([
      {
        name: "Acme Corporation",
        email: "contact@acme.com",
        phone: "+1-555-0100",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&auto=format",
        status: "active",
        role: "agency",
        plan: "Enterprise Plan",
        tier: "Gold Agency",
        contactPerson: "John Smith",
        contactPhone: "+1-555-0101",
        registrationDate: "15/03/2024",
        campaignType: "national",
        bankTransfer: false,
      },
    ])
    .returning();

  const [client2] = await db
    .insert(clients)
    .values([
      {
        name: "BrightWave Media",
        email: "hello@brightwave.io",
        phone: "+1-555-0200",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&auto=format",
        status: "active",
        role: "agency",
        plan: "Pro Plan",
        tier: "Silver Agency",
        contactPerson: "Sarah Johnson",
        contactPhone: "+1-555-0201",
        registrationDate: "22/06/2024",
        campaignType: "local",
        bankTransfer: true,
      },
    ])
    .returning();

  const [client3] = await db
    .insert(clients)
    .values([
      {
        name: "Nova Digital",
        email: "info@novadigital.com",
        phone: "+1-555-0300",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&auto=format",
        status: "suspended",
        role: "advertiser",
        plan: "Starter Plan",
        tier: "Bronze Agency",
        contactPerson: "Mike Chen",
        contactPhone: "+1-555-0301",
        registrationDate: "10/01/2025",
        campaignType: "local",
        bankTransfer: false,
      },
    ])
    .returning();

  const [client4] = await db
    .insert(clients)
    .values([
      {
        name: "Pulse Marketing",
        email: "team@pulsemarketing.co",
        phone: "+1-555-0400",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&auto=format",
        status: "active",
        role: "agency",
        plan: "Enterprise Plan",
        tier: "Gold Agency",
        contactPerson: "Emily Davis",
        contactPhone: "+1-555-0401",
        registrationDate: "05/09/2024",
        campaignType: "national",
        bankTransfer: true,
      },
    ])
    .returning();

  // Seed campaigns for client1
  const campaignData = [
    {
      clientId: client1.id,
      name: "Summer Sale 2025",
      target: "National",
      status: "Paused",
      budget: "20K",
      startDate: "02.10.25",
      endDate: "10.10.25",
      creativeStatus: "Pending for approval",
    },
    {
      clientId: client1.id,
      name: "Brand Awareness Q4",
      target: "Local",
      status: "Active",
      budget: "15K",
      startDate: "15.10.25",
      endDate: "ongoing",
      creativeStatus: "Approved",
    },
    {
      clientId: client1.id,
      name: "Holiday Special",
      target: "Local",
      status: "Active",
      budget: "25K",
      startDate: "15.10.25",
      endDate: "ongoing",
      creativeStatus: "Pending for approval",
    },
    {
      clientId: client1.id,
      name: "Product Launch",
      target: "National",
      status: "Draft",
      budget: "30K",
      startDate: "",
      endDate: "",
      creativeStatus: "Pending for approval",
    },
    {
      clientId: client1.id,
      name: "Retargeting Wave",
      target: "National",
      status: "Ended",
      budget: "12K",
      startDate: "01.09.25",
      endDate: "25.09.25",
      creativeStatus: "Rejected",
    },
    {
      clientId: client1.id,
      name: "Flash Promo",
      target: "National",
      status: "Pending",
      budget: "8K",
      startDate: "22.10.25",
      endDate: "",
      creativeStatus: "Approved",
    },
    {
      clientId: client1.id,
      name: "Local Engagement",
      target: "Local",
      status: "Ended",
      budget: "10K",
      startDate: "01.09.25",
      endDate: "25.09.25",
      creativeStatus: "Approved",
    },
    {
      clientId: client1.id,
      name: "Winter Campaign",
      target: "Local",
      status: "Ended",
      budget: "18K",
      startDate: "01.09.25",
      endDate: "25.09.25",
      creativeStatus: "Approved",
    },
    {
      clientId: client2.id,
      name: "Social Blitz",
      target: "National",
      status: "Active",
      budget: "22K",
      startDate: "01.11.25",
      endDate: "ongoing",
      creativeStatus: "Approved",
    },
    {
      clientId: client2.id,
      name: "Email Nurture",
      target: "Local",
      status: "Active",
      budget: "5K",
      startDate: "10.10.25",
      endDate: "ongoing",
      creativeStatus: "Pending for approval",
    },
    {
      clientId: client4.id,
      name: "Grand Opening",
      target: "National",
      status: "Active",
      budget: "50K",
      startDate: "01.12.25",
      endDate: "ongoing",
      creativeStatus: "Approved",
    },
    {
      clientId: client4.id,
      name: "Loyalty Program",
      target: "Local",
      status: "Draft",
      budget: "7K",
      startDate: "",
      endDate: "",
      creativeStatus: "Pending for approval",
    },
  ];
  const insertedCampaigns = await db
    .insert(campaigns)
    .values(campaignData)
    .returning();

  // Seed creatives for client1
  const creativeData = [
    {
      clientId: client1.id,
      campaignId: insertedCampaigns[0].id,
      name: "Summer Banner 1080p",
      campaignName: "Summer Sale 2025",
      fileType: "File",
      status: "Active",
      fileSize: "230 Mb",
      preview:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      date: "15/10/2025",
    },
    {
      clientId: client1.id,
      campaignId: insertedCampaigns[0].id,
      name: "Promo Video 30s",
      campaignName: "Summer Sale 2025",
      fileType: "File",
      status: "Rejected",
      fileSize: "480 Mb",
      preview:
        "https://images.unsplash.com/photo-1618005192346-064f37a1c1f9?w=400&q=80",
      date: "12/10/2025",
    },
    {
      clientId: client1.id,
      campaignId: insertedCampaigns[1].id,
      name: "Social Post Design",
      campaignName: "Brand Awareness Q4",
      fileType: "File",
      status: "Active",
      fileSize: "120 Mb",
      preview:
        "https://images.unsplash.com/photo-1633284738054-67a22e79b532?w=400&q=80",
      date: "18/10/2025",
    },
    {
      clientId: client1.id,
      campaignId: insertedCampaigns[2].id,
      name: "Holiday Banner Set",
      campaignName: "Holiday Special",
      fileType: "File",
      status: "Active",
      fileSize: "350 Mb",
      preview:
        "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&q=80",
      date: "20/10/2025",
    },
    {
      clientId: client1.id,
      campaignId: insertedCampaigns[3].id,
      name: "Landing Page Mock",
      campaignName: "Product Launch",
      fileType: "Link",
      status: "Pending for Approval",
      fileSize: "-",
      preview:
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&q=80",
      date: "22/10/2025",
    },
    {
      clientId: client2.id,
      campaignId: insertedCampaigns[8].id,
      name: "Instagram Story",
      campaignName: "Social Blitz",
      fileType: "File",
      status: "Active",
      fileSize: "90 Mb",
      preview:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
      date: "05/11/2025",
    },
    {
      clientId: client2.id,
      campaignId: insertedCampaigns[9].id,
      name: "Email Template",
      campaignName: "Email Nurture",
      fileType: "Link",
      status: "Pending for Approval",
      fileSize: "-",
      preview:
        "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80",
      date: "12/10/2025",
    },
    {
      clientId: client4.id,
      campaignId: insertedCampaigns[10].id,
      name: "Grand Opening Video",
      campaignName: "Grand Opening",
      fileType: "File",
      status: "Active",
      fileSize: "720 Mb",
      preview:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
      date: "01/12/2025",
    },
  ];
  await db.insert(creatives).values(creativeData);

  // Seed payments
  const paymentData = [
    {
      clientId: client1.id,
      status: "Paid",
      date: "Nov 20, 2025",
      method: "XXXX - XX83",
      amount: "2,500$",
      campaignName: "Summer Sale 2025",
    },
    {
      clientId: client1.id,
      status: "Paid",
      date: "Nov 15, 2025",
      method: "XXXX - XX83",
      amount: "1,800$",
      campaignName: "Brand Awareness Q4",
    },
    {
      clientId: client1.id,
      status: "Paid",
      date: "Nov 10, 2025",
      method: "XXXX - XX83",
      amount: "3,200$",
      campaignName: "Holiday Special",
    },
    {
      clientId: client1.id,
      status: "Open",
      date: "Dec 01, 2025",
      method: "XXXX - XX83",
      amount: "4,000$",
      campaignName: "Product Launch",
    },
    {
      clientId: client1.id,
      status: "Delayed",
      date: "Oct 25, 2025",
      method: "XXXX - XX41",
      amount: "750$",
      campaignName: "Retargeting Wave",
    },
    {
      clientId: client2.id,
      status: "Paid",
      date: "Nov 18, 2025",
      method: "XXXX - XX92",
      amount: "5,500$",
      campaignName: "Social Blitz",
    },
    {
      clientId: client2.id,
      status: "Open",
      date: "Dec 05, 2025",
      method: "XXXX - XX92",
      amount: "1,200$",
      campaignName: "Email Nurture",
    },
    {
      clientId: client4.id,
      status: "Paid",
      date: "Dec 01, 2025",
      method: "XXXX - XX17",
      amount: "12,000$",
      campaignName: "Grand Opening",
    },
  ];
  await db.insert(payments).values(paymentData);

  // Seed notifications
  const now = new Date();
  const notificationData = [
    {
      clientId: client1.id,
      title: "Campaign Approved",
      body: "Your campaign 'Summer Sale 2025' has been reviewed and approved by the admin team.",
      read: false,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    },
    {
      clientId: client1.id,
      title: "Payment Received",
      body: "Payment of $2,500 for campaign 'Summer Sale 2025' has been successfully processed.",
      read: false,
      createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
    },
    {
      clientId: client1.id,
      title: "Creative Pending",
      body: "A new creative asset 'Landing Page Mock' is awaiting your approval for campaign 'Product Launch'.",
      read: false,
      createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000),
    },
    {
      clientId: client1.id,
      title: "Budget Alert",
      body: "Campaign 'Holiday Special' has reached 80% of its allocated budget. Please review and adjust if needed.",
      read: true,
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    },
    {
      clientId: client1.id,
      title: "Campaign Ended",
      body: "Campaign 'Retargeting Wave' has reached its end date and is now marked as completed.",
      read: true,
      createdAt: new Date(now.getTime() - 30 * 60 * 60 * 1000),
    },
    {
      clientId: client2.id,
      title: "New Campaign Created",
      body: "A new campaign 'Social Blitz' has been created and is pending review.",
      read: false,
      createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    },
    {
      clientId: client2.id,
      title: "Creative Rejected",
      body: "Creative asset 'Email Template' has been rejected. Please review the feedback and resubmit.",
      read: false,
      createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
    },
  ];
  await db.insert(notifications).values(notificationData);

  console.log("Seeding complete!");
  console.log(
    `Seeded: ${4} clients, ${campaignData.length} campaigns, ${creativeData.length} creatives, ${paymentData.length} payments, ${notificationData.length} notifications`,
  );
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
