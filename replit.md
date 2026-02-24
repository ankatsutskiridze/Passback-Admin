# Passback Admin Dashboard

## Overview
Admin dashboard for managing advertising campaigns, client accounts, creative assets, and billing/finance operations. Full-stack application with React frontend and Express/PostgreSQL backend.

## Recent Changes
- 2026-02-24: Set up PostgreSQL database with Drizzle ORM (5 tables: clients, campaigns, creatives, payments, notifications)
- 2026-02-24: Implemented storage layer (server/storage.ts) with DatabaseStorage class
- 2026-02-24: Created REST API routes with validation and error handling
- 2026-02-24: Seeded database with realistic mock data (4 clients, 12 campaigns, 8 creatives, 8 payments, 7 notifications)
- 2026-02-24: Wired frontend pages (accounts, client-profile, view-creative) to fetch from API

## Project Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui, wouter routing, @tanstack/react-query
- **Backend**: Express.js, Drizzle ORM, PostgreSQL (Neon)
- **Shared**: schema.ts with Drizzle table definitions and Zod insert schemas

### Key Routes
- `/` - Dashboard
- `/accounts` - Accounts management (lists clients from DB)
- `/client/:id` - Client profile with 5 tabs (Summary, Updates, Campaigns, Creatives, Payments & Credits)
- `/client/:id/creative/:creativeId` - View creative detail
- `/campaigns` - Campaigns management
- `/creatives` - Creatives management
- `/billing` - Billing & Finance

### API Endpoints
- `GET /api/clients` - List all clients
- `GET /api/clients/:id` - Get single client
- `PATCH /api/clients/:id` - Update client
- `GET /api/clients/:clientId/campaigns` - Client campaigns
- `GET /api/clients/:clientId/creatives` - Client creatives
- `GET /api/clients/:clientId/payments` - Client payments
- `GET /api/clients/:clientId/notifications` - Client notifications
- `GET /api/creatives/:id` - Single creative detail
- `PATCH /api/creatives/:id` - Update creative status
- `PATCH /api/campaigns/:id` - Update campaign
- `PATCH /api/notifications/:id/read` - Mark notification read

## User Preferences
- Design system: Orange (#F97316) primary accent, slate grays for text, white cards with soft shadows, rounded-xl corners
- Keep existing UI styling exactly as designed - only add logic, no redesign
- Status colors: Active/Approved = green, Pending = orange, Rejected/Paused = red, Draft = gray, Ended = blue
