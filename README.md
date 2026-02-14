# NLW Copa

<p align="center">
  <img src="https://img.shields.io/badge/Turborepo-2.4-blue" alt="Turborepo 2.4" />
  <img src="https://img.shields.io/badge/Node.js-24.x-green" alt="Node.js 24" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue" alt="TypeScript 5.9" />
</p>

## 📱 Project

Complete application for World Cup betting pools

## ✨ Technologies

### Apps

**Web (Next.js 15)**
- React 19
- TypeScript 5.9
- TailwindCSS 3
- Axios

**Mobile (Expo 52)**
- React Native 0.76
- React Navigation 7
- Native Base
- TypeScript 5.9

**Server (Fastify 4)**
- Prisma 5 + SQLite
- JWT + OAuth
- Zod validation
- TypeScript 5.9

### Packages

**@nlw-copa/shared**
- Shared TypeScript types
- Zod validations

**@nlw-copa/typescript-config**
- Base, Node.js, Next.js, React Native configs

**@nlw-copa/eslint-config**
- Shared rules for Node, React, React Native

## 🚀 Quick Start

### Option 1: With Docker 🐳 (Recommended)

You only need Docker installed!

```bash
# Clone the repository
git clone https://github.com/Luuan11/nlw-copa.git
cd nlw-copa

# Start everything with one command
docker-compose up

✅ **Access:**
- Web: http://localhost:3000
- API: http://localhost:3333
- Database: SQLite (apps/server/prisma/dev.db)

### Option 2: Local Development

**Prerequisites:**
- Node.js >= 20.19 (recommended: 24.x)
- npm >= 10.0

```bash
# Clone the repository
git clone https://github.com/Luuan11/nlw-copa.git
cd nlw-copa

# Install all dependencies (root + all apps/packages)
npm install

# Configure environment variables
cp apps/server/.env.example apps/server/.env

# Setup the database
cd apps/server
npm run db:migrate
cd ../..

# Run all projects in parallel
npm run dev
```

## 🛠️ Applied Improvements

✅ **DRY, YAGNI and Clean Code principles**  
✅ **Centralized schemas** (Zod)  
✅ **Reusable utilities**  
✅ **Semantic HTTP status** (404, 403, 409)  
✅ **Shared types** across projects  
✅ **ESLint configured**  
✅ **Turborepo cache** for fast builds  
✅ **Docker & Docker Compose** for isolated environments  
✅ **Health checks** and monitoring  

## 👨‍💻 Developed by

Made with 💜 by [Luan Fernando](https://www.linkedin.com/in/luan-fernando/)

---