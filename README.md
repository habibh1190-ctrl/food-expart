# Food Expert – Modern Restaurant & Online Ordering Website

A high-performance, mobile-first restaurant website and administration portal for **Food Expert**, designed for zero-latency deployment on **Cloudflare Pages** and **Cloudflare Workers**.

---

## 🍗 Key Highlights

- **Brand:** Food Expert (*“Delicious Food. Better Moments.”*)
- **Featured Categories:**
  - **Bucket Offer** (crispy chicken buckets, combo deals, discounts & offer badges)
  - **Juice Items** (cold-pressed 100% natural juices & smoothies)
  - **Snacks Items** (loaded truffle fries, artisan chicken sliders, cheese sticks)
  - **Full Menu** (instant search, category tabs, availability filters, and price sorting)
- **Ordering System:**
  - Slide-out cart drawer with item quantity adjustments
  - Dining preference selector (Home Delivery, Takeaway, Dine-in)
  - Free delivery threshold calculator
  - **1-Click WhatsApp Ordering** with auto-formatted itemized order receipt
  - Direct Online Order submission
- **Admin Management Dashboard:**
  - Secure login with SHA-256 cryptographic password verification (initial demo password: `admin123`)
  - **Product Management:** Add, edit, duplicate, delete, pricing, discounts, availability toggles, image URLs
  - **Category Management:** Create new categories dynamically, edit slugs, reorder, toggle visibility
  - **Order Queue:** Real-time customer orders with kitchen status (`pending`, `confirmed`, `preparing`, `delivered`, `cancelled`) and 1-click WhatsApp customer chat
  - **Homepage Content:** Edit hero headlines, descriptions, CTAs, and promotional announcement banners
  - **Website Settings:** Configurable WhatsApp hotline, store address, opening hours, delivery fees, and admin password customization
  - **Reviews Management:** Manage testimonials and star ratings

---

## ⚡ Cloudflare Pages / Workers Deployment Guide

This project is built using standard Web APIs, static asset bundling, and Cloudflare Pages Functions architecture (`functions/api/[[route]].ts`). It contains **no filesystem dependencies** and **no traditional Node.js VPS requirements**.

### Option A: Cloudflare Dashboard (Fastest & Zero Setup)

1. Push this repository to **GitHub** or **GitLab**.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave default)
4. (Optional) Set environment variables under **Settings > Environment variables**:
   - `ENVIRONMENT`: `production`
5. Click **Save and Deploy**. Cloudflare Pages will build and deploy your application globally to its edge network in seconds.

---

### Option B: Deploy via Wrangler CLI

If deploying from your terminal using Cloudflare's Wrangler tool:

```bash
# 1. Install Wrangler globally or run via npx
npx wrangler pages deploy dist --project-name food-expert-restaurant
```

Before deploying, build the production bundle:
```bash
npm run build
npx wrangler pages deploy dist
```

---

### Cloudflare D1 Relational Database Migration (Optional)

The website utilizes a resilient storage engine (`src/services/dataService.ts`) with immediate reactive localStorage caching and cloud-sync capability. If you wish to connect Cloudflare D1 for team synchronization:

1. Create a D1 database:
   ```bash
   npx wrangler d1 create food_expert_db
   ```
2. Bind the database in `wrangler.jsonc`:
   ```json
   "d1_databases": [
     {
       "binding": "DB",
       "database_name": "food_expert_db",
       "database_id": "<YOUR_D1_DATABASE_ID>"
     }
   ]
   ```
3. Run the schema initialization:
   ```sql
   CREATE TABLE products (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     slug TEXT NOT NULL,
     description TEXT,
     category_id TEXT NOT NULL,
     image TEXT NOT NULL,
     price REAL NOT NULL,
     offer_price REAL,
     discount INTEGER,
     available INTEGER DEFAULT 1,
     featured INTEGER DEFAULT 0,
     display_order INTEGER DEFAULT 1,
     created_at TEXT,
     updated_at TEXT
   );

   CREATE TABLE categories (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     slug TEXT NOT NULL,
     image TEXT,
     description TEXT,
     active INTEGER DEFAULT 1,
     display_order INTEGER DEFAULT 1
   );

   CREATE TABLE orders (
     id TEXT PRIMARY KEY,
     order_number TEXT NOT NULL,
     items_json TEXT NOT NULL,
     subtotal REAL NOT NULL,
     delivery_fee REAL NOT NULL,
     total REAL NOT NULL,
     customer_name TEXT NOT NULL,
     customer_phone TEXT NOT NULL,
     delivery_address TEXT,
     delivery_type TEXT NOT NULL,
     notes TEXT,
     status TEXT NOT NULL,
     created_at TEXT NOT NULL
   );
   ```

---

## 🔐 Admin Access Credentials

- **Admin Portal Entry:** Click the shield/key icon in the top navigation bar or the "Admin Portal" link in the footer.
- **Initial Password:** `admin123`
- *Security notice:* Once logged in, navigate to **Website Settings** > **Admin Password & Security** to update your password.

---

## 🛠️ Local Development & Build

```bash
# Start development server
npm run dev

# Run production build
npm run build

# Preview build locally
npm run preview
```
