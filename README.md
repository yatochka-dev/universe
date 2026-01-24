# UniVerse (Technical Overview)

UniVerse is a website built for a student-led community focused on sharing college admissions resources and helping members support each other.
It was developed for a Discord server of nearly 2,000 students aiming for top universities.

The project is a single **Next.js + Payload CMS** application that combines a public site with a full admin content system.

---

## Architecture

* **One Next.js App Router codebase**

  * Public site routes live under `src/app/(app)`
  * CMS admin UI and API routes live under `src/app/(payload)` using `@payloadcms/next`

* **Payload CMS backend**

  * Collections and globals define all site content and power both the admin panel and API
  * Uses PostgreSQL for persistence
  * Media uploads stored in S3-compatible object storage (Cloudflare R2)
  * Sharp enabled for image processing

---

## Main Modules

### CMS Schema (`src/collections`, `src/globals`)

Defines the content model for:

* users and contacts
* shared resources
* landing page sections and site settings

These schemas drive the admin dashboard and REST/GraphQL API.

---

### Data Access Layer (`src/data-access`)

Server-side helpers that initialize a Payload client and fetch CMS data for React Server Components.

Used for rendering globals like the hero section and site settings.

---

### Server Actions (`src/actions`)

Mutations built with `next-safe-action` + Zod validation.

Example: contact form submissions are validated and written into Payload collections.

---

### UI Components (`src/components`)

Reusable React components for landing page sections, driven by CMS content.

---

## Data Flow

1. Public pages render through server components and query Payload using shared data-access helpers
2. Forms submit through validated server actions and create entries in the CMS database
3. Admin users manage resources and site content through Payload’s built-in dashboard
4. All content is persisted in Postgres, with media stored in Cloudflare R2

---

## Key Technologies

* Next.js App Router + React Server Components
* Payload CMS (Admin UI, REST API, content modeling)
* PostgreSQL (primary database)
* Cloudflare R2 (media storage, S3-compatible)
* Zod + next-safe-action (validated server mutations)
* Sharp (image processing)
