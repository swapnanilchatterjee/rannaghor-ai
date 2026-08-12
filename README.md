# 🍲 Rannaghor AI — রান্নাঘর AI

**Rannaghor AI** (রান্নাঘর AI) is an AI-powered Bengali recipe suggester built for the home cook. Tell it what's in your kitchen — proteins, vegetables, spices — and it instantly recommends authentic Bengali dishes tailored to your taste, spice tolerance, and meal time.

Built as a bilingual (Bengali + English) Progressive Web App using React + Groq's Llama 3, it works offline, speaks recipes aloud, supports hands-free voice navigation, and can be installed as a native app on any device.

### 🌐 Live Demo
👉 **[https://rannaghor-ai.vercel.app](https://rannaghor-ai.vercel.app)**

---

## ✨ Features

### 🍳 Focus Mode with Smart Timers
Step-by-step fullscreen cooking overlay with one instruction at a time. An automatic parser detects time mentions in steps (e.g. `"20 mins"`, `"৫ মিনিট"`) and creates live countdown timers. A programmatic chime fires via the browser's native `AudioContext` when a timer ends — no network assets required.

### 🎤 Hands-Free Voice Navigation & TTS
Recipes are read aloud using the browser's built-in Text-to-Speech engine. Voice commands (`"next"` / `"পরের"`, `"back"` / `"আগের"`, `"repeat"` / `"আবার"`) let you navigate steps completely hands-free — perfect for when your hands are covered in dough.

### ❤️ Saved Favorites Vault
Bookmark any recipe with a single tap. Favorites are stored in `localStorage` and accessible from a dedicated sidebar tab — persisted across sessions, no account needed.

### ⚖️ Servings Multiplier & Ingredient Quantities
Scale recipes up or down with `+`/`-` buttons. Ingredient amounts update dynamically and display in the correct numeral system based on the active language (Bengali or English). Each ingredient also supports precise quantity + unit inputs (`g`, `kg`, `tsp`, `tbsp`, `cup`, `pcs`).

### 🛒 Shopping List & WhatsApp Sharing
Missing an ingredient? Mark it, then copy the full list to your clipboard or share it directly via WhatsApp with one tap.

### 📱 PWA — Works Offline & Installable
Service Workers cache the full app shell for instant loads and offline access. Installable as a standalone app on Android, iOS, and desktop.

### 🤖 AI-Powered via Groq Llama 3
Recipes are generated in real time through a secure serverless proxy using Groq's Llama 3 models with structured JSON output schemas. Falls back gracefully to a curated offline mock database (Shorshe Maach, Alu Posto, Dim Kosha, Musur Dal, Egg Roll, Alur Chop) when no API key is configured.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A free [Groq API Key](https://console.groq.com) *(optional — app works in demo mode without one)*

### Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/swapnanilchatterjee/rannaghor-ai.git
cd rannaghor-ai

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🔑 Connecting Your Groq API Key (Vercel)

1. Open your project on **[Vercel Settings → Environment Variables](https://vercel.com/swapnanilchatterjees-projects/rannaghor-ai/settings/environment-variables)**
2. Click **Add New Variable** and fill in:
   - **Name:** `GROQ_API_KEY`
   - **Value:** your key *(starts with `gsk_`)*
   - **Environments:** `Production` + `Preview`
3. Click **Save**, then trigger a **Redeploy**

---

## 📂 Project Structure

```
rannaghor-ai/
├── api/                    # Serverless proxy endpoints (suggest.js, chat.js)
├── public/                 # PWA manifest & service worker (sw.js)
└── src/
    ├── data/
    │   └── ingredients.js  # Ingredient database with Bengali translations
    ├── utils/
    │   └── recipeMock.js   # Offline mock recipes & scoring logic
    ├── App.jsx             # Main app — all state, logic, and views
    ├── App.css             # Full stylesheet — grid, dark mode, animations
    ├── index.css           # Design tokens, typography, global resets
    └── main.jsx            # React root + Service Worker registration
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS with CSS custom properties |
| AI | Groq API (Llama 3.3 70B) |
| Icons | Lucide React |
| Fonts | Outfit, Noto Serif Bengali (Google Fonts) |
| Hosting | Vercel (serverless functions + CDN) |
| PWA | Service Worker + Web App Manifest |
