# 💅 The Nail Artistry - E-commerce Frontend

<div align="center">

![The Nail Artistry](https://img.shields.io/badge/The%20Nail%20Artistry-E-commerce-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)

A beautiful, modern, and fully responsive e-commerce frontend application for **The Nail Artistry** - your premium destination for high-quality press-on nails. Built with cutting-edge web technologies and designed for exceptional user experience.

[Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Deployment](#-deployment)

</div>

---

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse beautiful nail art designs with detailed product pages
- **Shopping Cart** - Seamless cart management with drawer interface
- **Wishlist** - Save favorite products for later
- **Product Search** - Quick search with category filtering
- **Product Gallery** - Fullscreen image gallery with zoom capabilities

### 🎨 User Experience
- **Responsive Design** - Mobile-first approach, optimized for all devices
- **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- **Smooth Animations** - Enhanced interactions with custom animations
- **Loading States** - Skeleton loaders and spinners for better UX
- **Toast Notifications** - Real-time feedback for user actions
- **Theme System** - Multiple color themes (Berry Blush, Peachy Keen, Lavender Dreams, Mint Fresh)

### 👤 User Management
- **User Profile** - Complete account management system
- **Order History** - Track orders with status updates
- **Address Management** - Save and manage delivery addresses
- **Notifications** - Customizable notification preferences
- **Settings** - Password change and account settings

### 🚀 Performance & SEO
- **Fast Loading** - Optimized bundle size and code splitting
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Lazy Loading** - Efficient image and component loading
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support

---

## 🛠️ Tech Stack

### Core Technologies
- **[React 18.3.1](https://react.dev/)** - UI framework
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Type safety
- **[Vite 5.4.19](https://vitejs.dev/)** - Build tool and dev server
- **[React Router 6.30.1](https://reactrouter.com/)** - Client-side routing

### Styling & UI
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities

### State Management & Data Fetching
- **[React Context API](https://react.dev/reference/react/useContext)** - Global state management
- **[TanStack Query 5.83.0](https://tanstack.com/query)** - Data fetching and caching
- **[Axios 1.13.1](https://axios-http.com/)** - HTTP client

### Forms & Validation
- **[React Hook Form 7.61.1](https://react-hook-form.com/)** - Form state management
- **[Zod 3.25.76](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers

### Additional Libraries
- **[React Hot Toast 2.6.0](https://react-hot-toast.com/)** - Toast notifications
- **[date-fns 3.6.0](https://date-fns.org/)** - Date formatting utilities
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component

---

## 📁 Project Structure

```
thenailartistry-frontend/
├── public/                 # Static assets
│   ├── logo.png           # Website logo
│   ├── logo_cropped.png   # Cropped logo variant
│   └── favicon.ico        # Favicon
├── src/
│   ├── api/               # API client configuration
│   │   └── client.ts      # Axios instance with interceptors
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (shadcn)
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── cart/         # Cart components (CartDrawer, CartItem)
│   │   ├── product/      # Product components (ProductCard, ProductGallery)
│   │   ├── profile/      # Profile section components
│   │   └── common/       # Common components (Loader, Logo, Marquee)
│   ├── contexts/         # React contexts
│   │   ├── CartContext.tsx
│   │   ├── WishlistContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Wishlist.tsx
│   │   ├── Profile.tsx
│   │   └── Contact.tsx
│   ├── services/         # API service layer
│   │   ├── productService.ts
│   │   ├── authService.ts
│   │   ├── cartService.ts
│   │   └── userService.ts
│   ├── utils/            # Utility functions
│   │   └── formatCurrency.ts
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .gitignore            # Git ignore rules
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)

### Step 1: Clone the Repository

```bash
git clone <YOUR_GIT_REPOSITORY_URL>
cd thenailartistry-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

or

```bash
pnpm install
```

### Step 3: Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your environment variables:

```env
# API Configuration
VITE_API_URL=https://api.thenailartistry.store

# Optional: Other environment variables
# VITE_APP_NAME=The Nail Artistry
# VITE_APP_VERSION=1.0.0
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal).

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready bundle |
| `npm run build:dev` | Build for development environment |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🏗️ Build for Production

### Build Command

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Import repository in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `VITE_API_URL` with your API base URL

4. **Deploy!**
   - Vercel will automatically deploy on every push to your main branch

### Deploy to Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Environment variables**: Add `VITE_API_URL` in Netlify dashboard

### Deploy to Other Platforms

After building (`npm run build`), deploy the `dist/` folder to any static hosting service:

- **AWS S3 + CloudFront**
- **GitHub Pages**
- **Firebase Hosting**
- **Cloudflare Pages**
- **Any static hosting provider**

---

## 🎨 Theme System

The application includes 4 pre-configured color themes that users can switch between:

1. **Berry Blush** (default) - Vibrant pink/magenta (#DD2C6C)
2. **Peachy Keen** - Warm peach/coral tones
3. **Lavender Dreams** - Soft purple/lavender
4. **Mint Fresh** - Cool mint/teal

Themes are implemented using CSS variables in `src/index.css` and persist to localStorage.

---

## 🔌 API Integration

### API Client

All API calls go through the centralized client in `src/api/client.ts`:

```typescript
import apiClient from '@/api/client';

// Example: Fetch products
const response = await apiClient.get('/v1/products');
```

### Service Layer

API calls are organized in service files:

- `src/services/productService.ts` - Product operations
- `src/services/authService.ts` - Authentication operations
- `src/services/cartService.ts` - Cart operations
- `src/services/userService.ts` - User profile operations

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for API requests | `https://api.thenailartistry.store` |

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 Key Features Implementation

### Responsive Header
- Desktop navigation with multi-column dropdown menus
- Mobile sidebar with nested submenus
- Search functionality for desktop and mobile
- Cart drawer integration
- User profile dropdown

### Shopping Cart
- Side drawer cart interface
- Quantity management
- Product removal
- Subtotal calculation
- Checkout navigation

### Product Pages
- Image gallery with fullscreen view
- Variant selection
- Add to cart functionality
- Related products
- Product information tabs

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: `npm install` fails
- **Solution**: Clear npm cache and try again
  ```bash
  npm cache clean --force
  npm install
  ```

**Issue**: Port already in use
- **Solution**: Change the port in `vite.config.ts` or kill the process using the port

**Issue**: Environment variables not working
- **Solution**: Ensure variables are prefixed with `VITE_` and restart the dev server

---

## 📄 License

This project is proprietary and confidential. All rights reserved.

© 2024 The Nail Artistry. All Rights Reserved.

---

## 📞 Contact & Support

- **Website**: [The Nail Artistry](https://thenailartistry.store)
- **Email**: info@thenailartistry.com
- **Phone**: +91 7225955292

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**Made with ❤️ for The Nail Artistry**

⭐ Star this repo if you find it helpful!

</div>
