# PhishGuard Lite

A lightweight, beginner‑friendly **Phishing URL Detection** web application.

## 🎯 Project Goal
Demonstrate a simple cybersecurity tool that evaluates a URL using lightweight heuristics and returns an explainable risk score. Suitable for a master‑class project evaluation and a live demo.

## ✨ Features
- Clean UI built with **React** + **Vite**
- Backend **Express** API that validates and evaluates URLs
- Heuristic detection engine (IP hostnames, long URLs, sub‑domains, `@` usage, phishing keywords)
- Explainable risk score **0‑100** and category (**Low / Medium / High**)
- Results panel with detected indicators and security recommendations
- Input validation, loading states, error handling, responsive design

## 🛠️ Technology Stack
- **Frontend:** React 18, Vite 5, plain CSS (no Tailwind to keep it simple)
- **Backend:** Node.js 20, Express 4, CORS
- **Languages:** JavaScript only
- **No database** – all evaluation is in‑memory
- **No external APIs** – purely heuristic

## 📋 Prerequisites
- Windows 10/11
- **Node.js** (v20 or later) with **npm** (comes with Node)
- Git (optional, for version control)

## ⬇️ Installation
```powershell
# Clone the repo (or copy the `phishguard` folder if you already have it)
# git clone <repo‑url>
# cd phishguard

# Backend setup
cd backend
npm install

# Frontend setup (run in a new terminal)
cd ..\frontend
npm install
```

## ▶️ Running the Application
Open two PowerShell windows (or tabs):

**Backend**
```powershell
cd C:\Users\Hp\Desktop\phishguard\backend
npm start   # starts on http://localhost:5000
```

**Frontend**
```powershell
cd C:\Users\Hp\Desktop\phishguard\frontend
npm run dev # runs Vite dev server on http://localhost:3000
```
The frontend proxies `/api/*` calls to the backend automatically.

## 🧪 Testing the API
You can test the backend directly with `curl`:
```powershell
curl -X POST http://localhost:5000/api/evaluate -H "Content-Type: application/json" -d '{"url":"http://example.com/login"}'
```
You should receive a JSON payload with `score`, `category`, `indicators`, and `recommendations`.

## 📄 Documentation
- API: see **API_DOC.md**
- Project report: **PROJECT_REPORT.md**

## 🚧 Limitations
- Heuristics are simple and may produce false positives/negatives.
- No real‑time URL fetching – the engine never visits the supplied URL.
- No persistence – each request is evaluated independently.

## 📚 Further Reading
- OWASP Phishing Prevention Cheat Sheet
- URL parsing with the JavaScript `URL` API

---
*Happy hacking!*