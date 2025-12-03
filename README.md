Personal Portfolio

A modern, high-performance personal portfolio website built with Next.js 16, Drizzle ORM, Vercel Postgres, and Intlayer for internationalization.

🚀 Tech Stack

Framework: Next.js 16 (App Router)

Language: TypeScript

Styling: Tailwind CSS v4 & shadcn/ui

Database: Vercel Postgres (Neon)

ORM: Drizzle ORM

Authentication: Auth.js (NextAuth v5)

Internationalization: Intlayer (v7)

Logging: Winston

Deployment: Vercel

🛠️ Prerequisites

Node.js: v18.17 or higher

Package Manager: pnpm (npm install -g pnpm)

Vercel CLI: Optional, but recommended for local env management (npm i -g vercel)

⚙️ Environment Setup

Clone the repository:

git clone [https://github.com/yourusername/portfolio.git](https://github.com/yourusername/portfolio.git)
cd portfolio

Install dependencies:

pnpm install

Environment Variables:
Create a .env.local (or pull from Vercel) with the following keys:

# Database (Vercel Postgres/Neon)

POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NO_SSL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
POSTGRES_USER="default"
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="verceldb"

# Authentication (Auth.js)

AUTH_SECRET="your-generated-secret" # run `npx auth secret` to generate

# Logging

NODE_ENV="development" # or "production"

Tip: If linked to Vercel, run vercel env pull .env.development.local to auto-fill database credentials.

🗄️ Database Management

This project uses Drizzle ORM for schema management and migrations.

Push Schema to DB: (Syncs lib/schema.ts with Neon)

pnpm drizzle-kit push

Studio: (View and edit data visually)

pnpm drizzle-kit studio

Seed Admin User:
This portfolio uses a closed authentication system (Admin only). To create your initial account:

Open scripts/seed.ts and set your email/password.

Run the seed script:

npx tsx scripts/seed.ts

🌍 Internationalization (i18n)

Handled by Intlayer and Next-Intlayer.

Config: intlayer.config.ts

Structure:

Content pages live in app/[locale]/.

Middleware (proxy.ts) handles locale detection and redirects (e.g., / -> /en or /tr).

Components use LocalizedLink for navigation to ensure the locale persists.

🏃‍♂️ Running Locally

Start the development server:

pnpm dev

Open http://localhost:3000 with your browser.

📂 Project Structure

.
├── app/
│ ├── [locale]/ # Localized routes
│ │ ├── (public)/ # Public pages (Home, Projects)
│ │ └── (admin)/ # Protected admin dashboard (Future)
│ └── globals.css # Tailwind v4 Global Styles
├── components/
│ ├── layouts/ # Header, Footer, Providers
│ ├── ui/ # shadcn/ui primitives
│ ├── LocalizedLink.tsx # i18n Navigation Wrapper
│ └── ...
├── lib/
│ ├── auth.ts # Auth.js configuration
│ ├── db.ts # Drizzle DB instance (Global singleton)
│ ├── logger.ts # Winston logger setup
│ └── schema.ts # Database Schema
├── scripts/
│ └── seed.ts # Admin user seeder
├── drizzle.config.ts # Drizzle Kit config
├── intlayer.config.ts # i18n config
└── proxy.ts # Next.js Middleware (Network Boundary)

🚢 Deployment

Push your code to GitHub.

Import the project into Vercel.

Connect the Vercel Postgres storage integration in the dashboard.

Add the AUTH_SECRET to the Vercel Environment Variables.

Deploy!

📄 License

This project is open source and available under the MIT License.
