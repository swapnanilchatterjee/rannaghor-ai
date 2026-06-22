# Rannaghor AI - Bengali Cooking Suggestor (রান্নাঘর AI)

Rannaghor AI is a premium, mobile-friendly, bilingual web application that acts as an intelligent assistant for authentic Bengali cooking. Simply check off the ingredients you have in your kitchen (proteins, vegetables, spices, oil, etc.), specify your cooking preferences, and receive mouth-watering recipe suggestions instantly.

### 🌐 Live Web App
👉 **[https://rannaghor-ai.vercel.app](https://rannaghor-ai.vercel.app)**

---

## 🌟 Key Features

1. **Bilingual Layout (English / বাংলা):** Toggle the entire application language instantly, including ingredient checklists, measurements, cooking steps, and tips.
2. **Dynamic Ingredient Selector:**
   * **Proteins:** Fish (মাছ), Eggs (ডিম), Chicken (মুরগি), Chingri (চিংড়ি), Paneer (পনির), Posto (পোস্ত), and Mutton (খাসির মাংস).
   * **Vegetables Grid:** Grid selection with built-in search filters and custom text tagging.
   * **Spices Drawer:** Activate individual spices (Salt, Turmeric, Cumin, Mustard paste, Panch Phoron, etc.) and configure specific volume levels (*A Little*, *Medium*, *Plenty*).
3. **Secure Serverless AI (Vercel Proxy):**
   * Uses Groq Free API behind a secure Node.js serverless backend.
   * **Key Security:** Your Groq API key is kept completely secure in your Vercel cloud environment (`GROQ_API_KEY`) and is never sent to the browser.
   * **Bypass Option:** Connects to client-side localStorage overrides if you prefer or when serverless functions are unavailable (e.g., when hosted statically on GitHub Pages).
4. **Text-To-Speech (TTS) Voice Guide:**
   * Hear instructions spoken out loud dynamically. Automatically selects native English or Bengali voices depending on the active language.
5. **Interactive Recipe Adjustment Chat:**
   * Speak with **Chef Rannaghor** directly inside the recipe card to ask questions about ingredient substitutions, onion-garlic free tweaks, microwave adjustments, etc.
6. **Smart Offline fallback:**
   * Automatically uses dynamic mock recipes (Alu Posto, Shorshe Maach, Dim Kosha, Begun Bhaja, Alur Dom) if no API key is configured.

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

* `/api` - Secure Serverless functions (`suggest.js`, `chat.js`).
* `/src/data/ingredients.js` - Data files for proteins, vegetables, and quotes.
* `/src/utils/recipeMock.js` - Fallback mock recipe generator.
* `/src/App.jsx` - Main React application logic.
* `/src/App.css` - Component-specific styling.
* `/src/index.css` - Main design tokens and animations.
