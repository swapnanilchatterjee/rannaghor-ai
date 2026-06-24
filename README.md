# Rannaghor AI - Bengali Cooking Suggestor (রান্নাঘর AI)

Rannaghor AI is a premium, responsive, bilingual Progressive Web Application (PWA) that acts as an intelligent voice-guided assistant for authentic Bengali cooking. Simply select the ingredients you have in your kitchen (proteins, vegetables, spices, oil, etc.), specify quantities and styles, and receive mouth-watering, personalized recipes instantly.

### 🌐 Live Web App
👉 **[https://rannaghor-ai.vercel.app](https://rannaghor-ai.vercel.app)**

---

## 🌟 Key Features

### 1. 🍳 Interactive Focus Mode & Smart Timers
* **Fullscreen Step Overlay:** A high-contrast, distraction-free cards overlay showing one instruction step at a time.
* **Auto-generated Timers:** An automated regex parser (`parseTimeLimit`) scans instructions for step durations (e.g., `"20 mins"`, `"৫ মিনিট"`) and creates countdown clock timers.
* **Programmatic Chime Buzzer:** Synthesizes notification alerts directly via browser-native `AudioContext` nodes, bypassing network assets.

### 2. 🎤 Hands-Free Voice Commands & TTS Reader
* **Voice-Activated Navigation:** Speaks instructions out loud using native browser text-to-speech (TTS) and listens for voice commands (`"next"` / `"পরের"`, `"back"` / `"আগের"`, `"repeat"` / `"আবার"`) via standard Web Speech API `SpeechRecognition`.
* *Enables full step-by-step navigation without touching the screen with messy kitchen hands.*

### 3. ❤️ Saved Favorites Vault
* Toggle a heart icon inside recipe cards to save favorite recipes directly.
* Features a sidebar panel sub-tab (**Suggested** and **Saved ❤️**) to organize suggestions and bookmarks.
* Persists bookmarks inside the client's `localStorage` (`rannaghor_favorites`).

### 4. ⚖️ Smart Servings Multiplier & Quantities
* **Bilingual Number Scaler:** Interactive `+`/`-` buttons in the recipe header dynamically scale ingredient portions, converting between English and Bengali numerals on-the-fly depending on the selected language toggle.
* **Main Ingredient Quantities:** Checkboxes feature inline quantity input numbers and unit dropdowns (`g`, `kg`, `pcs`, `tsp`, `tbsp`, `cup`) for precise kitchen planning.

### 5. 🛒 Smart Shopping List & Sharing
* Mark missing ingredients as collected via interactive checkboxes.
* Quick-action buttons format and copy the list to the clipboard or share it directly to WhatsApp API URLs.

### 6. 📱 Progressive Web App (PWA) Offline Support
* Registered Service Workers cache static app shell assets (HTML, CSS, JS, SVGs) for instant load times and offline accessibility.
* Fully installable as a native app on mobile or desktop viewports.

### 7. 🤖 Secure Serverless AI & Fallbacks
* Uses Groq Llama 3 models through a secure Node.js serverless proxy, enforcing structured JSON completion schemas.
* **Bypass Demo Mode:** Falls back to offline mock recipe databases (Shorshe Maach, Alu Posto, Dim Kosha, Musur Dal, Egg Roll, Alur Chop) if API keys are absent.

---

## 🔒 Vercel Setup (Secure Groq API key Integration)

To connect the live site to your Groq API key securely:

1. Open your project on Vercel: **[Rannaghor AI Settings](https://vercel.com/swapnanilchatterjees-projects/rannaghor-ai/settings/environment-variables)**.
2. Click **Add New Variable**.
3. Fill in:
   * **Name:** `GROQ_API_KEY`
   * **Value:** *Your Groq API key (starts with `gsk_`)*
   * **Environments:** Select `Production` and `Preview`.
4. Click **Save**.
5. Trigger a **Redeploy** on the Vercel dashboard to apply the changes.

---

## 🖥️ Local Installation

To run this project locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/swapnanilchatterjee/rannaghor-ai.git
   cd rannaghor-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build the static production bundle:
   ```bash
   npm run build
   ```
5. Deploy changes to GitHub Pages:
   ```bash
   npm run deploy
   ```

---

## 📂 Project Structure

* `/api` - Secure Serverless proxy endpoints (`suggest.js`, `chat.js`).
* `/public` - PWA assets including `manifest.json` and service worker `sw.js`.
* `/src/data/ingredients.js` - Database translations and default ingredients lists.
* `/src/utils/recipeMock.js` - Offline mock database and scoring utilities.
* `/src/main.jsx` - Root React bootloader and Service Worker registers.
* `/src/App.jsx` - Main app controller, helpers, hooks, and views.
* `/src/App.css` - Stylesheet for grids, dark modes, animations, and overlays.
