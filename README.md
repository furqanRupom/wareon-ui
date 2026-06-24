# Wareon - Frontend

A modern e-commerce frontend built with Next.js for seamless product browsing, cart management, and order processing with role-based dashboards.

---



## Overview

Wareon is a scalable e-commerce frontend application designed for both customers and managers.

It allows users to browse products, manage carts, and place orders, while managers can control products, categories, and orders through an admin dashboard.

---

## Tech Stack

* Framework: Next.js 15 (App Router)
* Language: TypeScript
* UI: shadcn/ui
* Styling: Tailwind CSS
* State Management: React Hooks + LocalStorage
* API Handling: Server Actions + Fetch API
* Icons: Lucide React
* Package Manager: pnpm

---

## Key Features

### User Features

* Browse products
* Add to cart
* Create and manage orders
* View order history
* Cancel pending orders
* Update order quantities

### Manager Features

* Product management (CRUD)
* Category management (CRUD)
* Order management
* Update order status
* View all customer orders

---



---

## Getting Started

### Prerequisites

* Node.js 18+
* pnpm

---

### Installation

```bash
git clone https://github.com/furqanRupom/wareon-ui.git
cd wareon-frontend
pnpm install
```

---

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

---

### Run Development Server

```bash
pnpm run dev
```

Application will run at:
http://localhost:3000

---

### Production Build

```bash
pnpm run build
pnpm start
```

---

## Project Structure

```
src/
├── app/
│   ├── admin/
│   ├── shop/
│   ├── cart/
├── components/
│   ├── modules/
│   │   ├── product/
│   │   ├── category/
│   │   └── order/
│   └── shared/
├── services/
├── types/
└── lib/
```

---

## Core Functionalities

### Authentication

* JWT-based authentication
* Role-based access (User and Manager)

### Shopping Cart

* Persistent cart using LocalStorage
* Real-time updates
* Stock validation

### Order Management

* Create orders from cart
* Track order lifecycle
* Cancel orders (restricted states)
* Update quantities dynamically

---

## Important Links

* Live App: https://wareon.vercel.app
* Backend API: https://wareon-api.vercel.app
* Backend Github Link: https://github.com/furqanRupom/wareon-api






