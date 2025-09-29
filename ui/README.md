# Altofy UI

This is the frontend for **Altofy**, built with [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18)
- npm (>= 9) or yarn / pnpm

### Installation
```bash
# install dependencies
npm install
```

### Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## 📂 Project Structure
```
ui/
 ├─ src/
 │   ├─ api/         # API client (GET, POST, PUT, DELETE)
 │   ├─ components/  # Shared React components (Navbar, Toast, etc.)
 │   ├─ hooks/       # Custom React hooks
 │   ├─ lib/         # Config, Logger, Settings, Validation
 │   ├─ pages/       # Application pages (LoginPage, etc.)
 │   ├─ styles/      # Tailwind / global styles
 │   └─ main.tsx     # Application entry
 ├─ public/          # Static assets (icons, images, etc.)
 ├─ index.html       # Root HTML
 ├─ package.json
 ├─ tsconfig.json
 └─ vite.config.ts
```

---

## 🌐 Environment Variables
Environment variables are defined in `.env` files:

- `.env` – default
- `.env.development` – for dev
- `.env.production` – for prod

Example (`.env.example`):
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## ⚡ Features
- 🔑 Authentication (login form with validation)
- 🌗 Theme switch (light/dark)
- 🔔 Global Toast notifications
- 📦 API client wrapper
- 🛠 Config & Logger utilities

---

## 📝 Notes
- All environment variables **must** be prefixed with `VITE_` to be accessible in the frontend.
- Keep UI code clean and modular.
- See `lib/` for utilities and shared classes.
