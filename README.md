<div align="center">

<img src="public/logo-white.png" alt="ImpactQuest Logo" width="80" />

# ImpactQuest

### *Gamified Volunteer Coordination & Smart Resource Allocation Platform*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white&style=flat-square)](https://www.mongodb.com/)

*Built for the Google Hackathon — connecting NGOs and volunteers through gamification and intelligent skill-based matching.*

</div>

---

## ✨ Overview

**ImpactQuest** is a full-stack web application that bridges the gap between NGOs and volunteers. It introduces a gamified mission system where volunteers earn points, unlock badges, and level up as they contribute to real-world causes — while NGOs get smart, skill-matched help precisely when they need it.

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🎮 **Gamified Missions** | Volunteers complete tasks ("quests") and earn XP, badges, and level up through a multi-tier progression system |
| 🤝 **Smart Skill Matching** | Tasks are matched to volunteers based on skills, availability, and location (GeoJSON-powered) |
| 📊 **Impact Score Dashboard** | Real-time tracking of contributions, streaks, reliability scores, and overall impact |
| 🏆 **Achievements & Leaderboard** | Milestone-based badge system and competitive rankings to drive engagement |
| 👥 **Groups & Team Missions** | Collaborative group quests for large-scale NGO tasks requiring team coordination |
| 💬 **In-App Chat** | Built-in messaging for seamless communication between volunteers and NGOs |
| 🌗 **Theme System** | Full dark/light mode support with multiple theme variants (Standard, Mono, Graphite, Slate, Onyx) |
| 🔒 **JWT Authentication** | Secure, role-based access control for Volunteers and NGOs with refresh token rotation |
| 📱 **Responsive Design** | Mobile-first UI with an animated bottom navigation bar for smaller screens |
| 🌍 **Multi-language Support** | Built-in language context for internationalization readiness |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — component-based UI
- **TypeScript** — type-safe development
- **Vite** — lightning-fast build tooling
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — smooth page transitions and animations
- **React Router v7** — client-side routing
- **Radix UI** — accessible headless components
- **Lucide React / HugeIcons** — icon sets

### Backend
- **Node.js + Express 5** — REST API server
- **MongoDB + Mongoose** — document database with geospatial indexing
- **JSON Web Tokens (JWT)** — stateless authentication with refresh token support
- **bcryptjs** — secure password hashing
- **Helmet + express-rate-limit** — security hardening
- **Joi** — request validation
- **Morgan** — HTTP request logging

---

## 📦 Project Structure

```
Google-hackathon-files/
├── src/                        # Frontend source (React + TypeScript)
│   ├── components/             # Page and UI components
│   │   ├── Home.tsx            # Landing page
│   │   ├── DashboardPage.tsx   # Volunteer/NGO hub
│   │   ├── Marketplace.tsx     # Mission browser
│   │   ├── ProfilePage.tsx     # User profile & skill setup
│   │   ├── AchievementsPage.tsx
│   │   ├── ImpactScorePage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── GroupsPage.tsx
│   │   └── ui/                 # Reusable UI primitives
│   ├── contexts/               # React contexts (Theme, Language, Termination)
│   ├── data/                   # Static/mock data
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility helpers (cn, etc.)
│   ├── App.tsx                 # Root router and layout
│   └── main.tsx                # Entry point
│
├── backend/                    # Backend source (Node.js + Express)
│   ├── models/                 # Mongoose schemas (User, Task)
│   ├── controllers/            # Request handlers (auth, task, volunteer)
│   ├── routes/                 # Express route definitions
│   ├── middleware/             # Auth, error handling, rate limiting
│   ├── services/               # Business logic layer
│   ├── validators/             # Joi validation schemas
│   ├── utils/                  # Helper utilities
│   ├── config/                 # DB connection, environment config
│   ├── scripts/                # Database seeding scripts
│   ├── app.js                  # Express app setup
│   └── server.js               # HTTP server entry point
│
├── public/                     # Static assets (logos, images)
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- **MongoDB** (local instance or MongoDB Atlas URI)

---

### 1. Clone the Repository

```bash
git clone https://github.com/noobcoder1982/Google-hackathon-files.git
cd Google-hackathon-files
```

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/smart-resource-allocation
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_strong_refresh_secret
JWT_REFRESH_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
```

```bash
# (Optional) Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

The API will be available at `http://localhost:5000/api/v1`.

---

### 3. Frontend Setup

Open a new terminal in the project root:

```bash
# From the project root
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🖥️ Usage

### Available Frontend Routes

| Route | Description |
|---|---|
| `/` | Landing / Home page |
| `/signin` | Sign in or register as Volunteer or NGO |
| `/features` | Platform features overview |
| `/pricing` | Pricing tiers |
| `/resources` | Helpful resources |
| `/about` | About the platform |
| `/contact` | Contact page |
| `/dashboard` | Personal hub (auth required) |
| `/marketplace` | Browse & accept missions (auth required) |
| `/groups` | Group missions (auth required) |
| `/chat` | In-app messaging (auth required) |
| `/profile` | Profile and skill management (auth required) |
| `/achievements` | Badges and milestones (auth required) |
| `/impact-score` | Impact analytics (auth required) |
| `/contributions` | Contribution history (auth required) |
| `/settings` | Account settings (auth required) |

### Available Backend Scripts

```bash
npm run dev    # Start backend in watch mode (auto-restart on changes)
npm start      # Start backend in production mode
npm run seed   # Seed the database with sample NGO tasks and users
```

### Backend API Base URL

```
http://localhost:5000/api/v1
```

Health check endpoint:
```
GET http://localhost:5000/api/v1/health
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and ensure the project still builds:
   ```bash
   # Frontend
   npm run build
   npm run lint

   # Backend
   cd backend && npm start
   ```
4. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. **Push** to your fork and **open a Pull Request** against the `main` branch.

Please keep PRs focused — one feature or fix per PR.

---

## 📄 License

This project is licensed under the **ISC License** (as declared in `backend/package.json`). The frontend package is marked private with no explicit license file — treat all code as proprietary unless otherwise stated by the repository owner.

---

## 👤 Contact & Credits

**Repository Owner:** [@noobcoder1982](https://github.com/noobcoder1982)

Built with ❤️ for the **Google Hackathon** — empowering communities through technology.

---

<div align="center">
  <sub>ImpactQuest — Making every contribution count.</sub>
</div>
