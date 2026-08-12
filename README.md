# 🍲 Rannaghor AI — রান্নাঘর AI

**Rannaghor AI** (রান্নাঘর AI) is an intelligent, AI-powered Bengali culinary companion built with **Python, FastAPI, LangChain, ChromaDB RAG (Retrieval-Augmented Generation), and React**. Tell it what's in your kitchen — proteins, vegetables, spices — and it instantly retrieves authentic Bengali dish knowledge and recommends tailored recipes using Groq's Llama 3.

Built as a bilingual (Bengali + English) Progressive Web App with a Python AI backend microservice, it works offline, speaks recipes aloud, supports hands-free voice navigation, and can be installed as a native app on any device.

---

## ✨ Features

### 🧠 Python RAG & Vector Knowledge Engine (FastAPI + LangChain + ChromaDB)
Powered by a high-performance Python FastAPI backend microservice. Integrates a **LangChain Retrieval-Augmented Generation (RAG)** pipeline using **ChromaDB** vector store to index authentic Bengali recipes (*Shorshe Ilish, Alu Posto, Dim Kosha, Chingri Malai Curry, Kosha Mangsho, Chholar Dal, Sukto*), performing semantic vector retrieval before calling Groq's Llama 3 (`llama-3.3-70b-versatile`).

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

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- **Python 3.10+**
- A free [Groq API Key](https://console.groq.com) *(optional — app includes a RAG fallback knowledge engine without one)*

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/tapan2004/rannaghor-ai.git
cd rannaghor-ai

# 2. Install Node.js frontend dependencies
npm install

# 3. Install Python backend dependencies
pip install -r backend/requirements.txt

# 4. Start the Python FastAPI backend server (http://127.0.0.1:8000)
npm run backend
# OR: python backend/main.py

# 5. In a new terminal, start the React frontend dev server (http://localhost:5173)
npm run dev
```

---

## 🔑 Environment Variables (.env)

Create a `.env` or `backend/.env` file with your Groq API Key:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
PORT=8000
HOST=127.0.0.1
```

---

## 📂 Project Structure

```
rannaghor-ai/
├── backend/                  # Python FastAPI + LangChain + RAG Engine
│   ├── data/
│   │   └── bengali_recipes.json # Authentic recipe dataset for RAG vector indexing
│   ├── main.py              # FastAPI server entry point (CORS, REST endpoints)
│   ├── rag_engine.py        # LangChain & ChromaDB vector search + LLM pipeline
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment template
├── api/                      # Serverless proxy endpoints (suggest.js, chat.js)
├── public/                   # PWA manifest & service worker (sw.js)
└── src/
    ├── data/
    │   └── ingredients.js    # Ingredient database with Bengali translations
    ├── utils/
    │   └── recipeMock.js     # Offline mock recipes & scoring logic
    ├── App.jsx               # Main React app — all state, logic, and views
    ├── App.css               # Full stylesheet — grid, dark mode, animations
    ├── index.css             # Design tokens, typography, global resets
    └── main.jsx              # React root + Service Worker registration
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | Python 3.12 + FastAPI + Uvicorn |
| **AI & RAG Engine** | LangChain, ChromaDB Vector Store, Groq (Llama 3.3 70B) |
| **Frontend** | React 19 + Vite |
| **Styling** | Vanilla CSS with CSS custom properties |
| **Icons** | Lucide React |
| **Fonts** | Outfit, Noto Serif Bengali (Google Fonts) |
| **PWA** | Service Worker + Web App Manifest |
