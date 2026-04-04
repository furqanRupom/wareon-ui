# Wareon - Frontend

A modern e-commerce frontend built with Next.js and shadcn/ui for product and order management.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **State Management:** React Hooks + LocalStorage
- **HTTP Client:** Server Actions + Fetch API
- **Icons:** Lucide React

## Features

### For Users
- Browse products
- Add products to cart
- Create orders
- View order history
- Cancel pending orders
- Update order quantities

### For Managers
- Product management (CRUD)
- Category management (CRUD)
- Order management
- Update order status
- View all customer orders

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard
│   ├── shop/              # Shop pages
│   ├── cart/              # Shopping cart
├── components/            # React components
│   ├── modules/          # Feature modules
│   │   ├── product/
│   │   ├── category/
│   │   └── order/
│   └── shared/           # Reusable components
├── services/             # API services
├── types/                # TypeScript interfaces
└── lib/                  # Utilities
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd wareon-frontend

# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Key Features

### Authentication
- JWT-based authentication
- Role-based access (User/Manager)

### Shopping Cart
- Persistent cart storage (LocalStorage)
- Real-time cart updates
- Stock validation

### Order Management
- Create orders with cart items
- Track order status (pending → confirmed → shipped → delivered)
- Cancel orders (pending/confirmed only)
- Update order quantities



## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm run lint` | Run ESLint |

## Screenshots

[Add your screenshots here]

## License

MIT