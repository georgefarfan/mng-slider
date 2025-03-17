# 🚀 Project Setup

Welcome to the project! Follow the steps below to set up and run the application correctly.

## 📦 Prerequisites
Make sure you have the following installed:
- **Node.js** (v20 or higher recommended)
- **pnpm** (or **npm**) for dependency management

## 🛠️ Installation

1. Install dependencies for both the server and web app:

### 📂 Server (NestJS)
```bash
cd server
pnpm install
```

### 📂 Web App (Next.js)
```bash
cd web-app
pnpm install
```

---

## ▶️ Running the Application

To start the project, you must run both the **NestJS Server** and the **Next.js Web App**.

### 1️⃣ Start the NestJS Server
Navigate to the `server` folder and run:
```bash
npm run start:dev
```
> This command starts the server in **development mode** with hot-reload enabled.

### 2️⃣ Start the Next.js Web App
Navigate to the `web-app` folder and run:
```bash
npm run dev
```
> This command starts the web app in **development mode**.

### 🌐 Access the Application
- **API Server:** [http://localhost:3000](http://localhost:3000)
- **Web App:** [http://localhost:8080](http://localhost:8080) 
---

## 🧪 Running Tests
To run the test suite for both projects:

### 🔍 Web App Tests (Next.js)
```bash
cd web-app
npm run test
```

---

Happy coding! 🎯

