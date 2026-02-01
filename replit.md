# My V0 Project

## Overview
A Next.js 16 application with React 19, built using TypeScript and Tailwind CSS v4. Features a modern UI with Radix UI components and shadcn/ui styling.

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components (shadcn/ui based)
- `hooks/` - Custom React hooks
- `lib/` - Utility functions
- `public/` - Static assets
- `styles/` - Additional stylesheets

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Start Production**: `npm run start`
- **Lint**: `npm run lint`

## Tech Stack
- Next.js 16 with Turbopack
- React 19
- TypeScript 5
- Tailwind CSS 4
- Radix UI components
- shadcn/ui component library

## Configuration
- `next.config.mjs` - Next.js configuration with allowed dev origins for Replit proxy
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `components.json` - shadcn/ui component configuration

## Recent Changes
- February 1, 2026: Meshi branding overhaul
  - Added Meshi logo and favicon to public folder
  - Created MeshiSidebar component with navigation and mock logout
  - Updated globals.css with Meshi purple/magenta theme colors
  - Refactored page layout to use shadcn sidebar pattern
  - Updated metadata for Meshi branding
- February 1, 2026: Initial Replit setup
  - Configured Next.js to bind to 0.0.0.0:5000
  - Added allowedDevOrigins for Replit proxy support
  - Configured deployment settings
