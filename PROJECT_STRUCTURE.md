# GC 2026 Project Structure

## 📁 Frontend Structure

### `/src`
Main source code directory for the React application.

#### `/src/components`
Reusable React components:
- **Navbar.jsx** - Navigation bar with glassmorphism effect

#### `/src/pages`
Page components for routing:
- **Home.jsx** - Landing page with hero section, character display, and fire effects
- **Schedule.jsx** - Event schedule display
- **Leaderboard.jsx** - Leaderboard rankings
- **contact.jsx** - Contact form and information

#### `/src/styles`
CSS stylesheets:
- **home.css** - Main stylesheet (navbar, hero, animations, contact, responsive styles)
- **Schedule.css** - Schedule page specific styles
- **Leaderboard.css** - Leaderboard page specific styles

#### Root Files
- **App.jsx** - Main app component with routing
- **main.jsx** - Entry point
- **index.css** - Global base styles and Tailwind imports

---

## 📁 Backend Structure

### `/Backend`
Server-side code and data management.

#### `/api`
API endpoints:
- **index.js** - Main API routes

#### `/data`
Data storage directory for Excel files and datasets

#### `/parsers`
Data parsing utilities:
- **athleticsParser.js** - Parse athletics data

#### `/routes`
API route handlers:
- **athletics.js** - Athletics routes
- **sports.js** - Sports routes

#### `/utils`
Utility functions:
- **excelReader.js** - Excel file reading utility
- **helpers.js** - Helper functions

#### Root Files
- **server.js** - Express server setup
- **vercel.json** - Vercel deployment configuration

---

## 🎨 Design System

### Colors
- Background: `#0a0e13` (Dark)
- Primary Accent: `rgba(200, 60, 80, *)` (Red/Pink)
- Text: White with various opacities

### Typography
- Display Font: **Bebas Neue** (Headers, titles)
- Body Font: **Rajdhani** (Body text, UI elements)
- Accent Font: **Teko** (Ticker text)

### Key Features
- **Glassmorphism**: Navbar with blur effect and transparency
- **Fire Effects**: Animated flames, smoke, and embers
- **Ticker Animations**: Scrolling text at top and bottom
- **Responsive Design**: Mobile-first approach

---

## 🚀 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📦 Key Dependencies

### Frontend
- React 18.2.0
- React Router DOM 6.26.0
- Framer Motion 12.23.26
- Lucide React (Icons)
- TailwindCSS 3.4.1

### Backend
- Express 5.2.1
- CORS 2.8.5
- XLSX 0.18.5 (Excel file handling)

---

## 🎯 Project Goals

This is a sports event website for "GC 2026" (Gaming Championship Season 3) featuring:
- Hero landing page with character showcase
- Event scheduling system
- Live leaderboards
- Contact information
- Mobile-responsive design with glassmorphic UI elements
