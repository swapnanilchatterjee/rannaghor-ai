import { useState, useEffect, useRef } from 'react';
import { 
  Utensils, 
  ChefHat, 
  Sliders, 
  Search, 
  Plus, 
  X, 
  Volume2, 
  VolumeX, 
  Send, 
  Settings, 
  Check, 
  AlertCircle, 
  Flame, 
  Clock, 
  Sparkles,
  Info
} from 'lucide-react';
import './App.css';
import { PROTEINS, VEGETABLES, SPICES, COOKING_QUOTES } from './data/ingredients';
import { getMockRecipes } from './utils/recipeMock';

const TRANSLATIONS = {
  en: {
    title: "Rannaghor AI",
    subtitle: "Bengali Spice & Recipe Suggestor",
    tagline: "Choose what's in your kitchen, and let AI suggest authentic Bengali recipes!",
    language: "Language",
    settings: "Settings",
    proteins: "Proteins & Starters",
    vegetables: "Vegetables",
    spices: "Pantry & Condiments",
    preferences: "Cooking Preferences",
    diet: "Diet Style",
    veg: "Vegetarian (নিরামিষ)",
    nonVeg: "Non-Vegetarian (আমিষ)",
    any: "Any Style",
    spiceLevel: "Spice Level",
    mild: "Mild (কম ঝাল)",
    medium: "Medium (মাঝারি)",
    spicy: "Fiery (বেশি ঝাল)",
    mealType: "Meal Type",
    breakfast: "Breakfast",
    lunchDinner: "Lunch / Dinner",
    snack: "Snack / Tea Time",
    cookTime: "Max Cooking Time",
    quick: "Quick (<20m)",
    average: "Medium (<45m)",
    elaborate: "Elaborate",
    suggestBtn: "Suggest Bengali Dishes",
    customPlaceholder: "Add other ingredients (e.g. coconut, yogurt)...",
    addBtn: "Add",
    searchPlaceholder: "Search vegetables...",
    keyConfig: "Groq API Settings",
    enterKey: "Enter Groq API Key",
    getKeyHelp: "Get a free API Key in 1 minute from console.groq.com",
    closeBtn: "Close",
    saveBtn: "Save Configuration",
    apiStatus: "API Status",
    missingKey: "Demo Mode (Using local mock recipes)",
    validKey: "AI Active (Using Groq API)",
    model: "Groq Model",
    loadingText: "Cooking up ideas...",
    noRecipes: "No recipes found. Select a few more ingredients!",
    missingLabel: "Missing ingredients you'll need:",
    usedLabel: "Available in your kitchen:",
    chefTips: "Chef's Pro-Tip",
    audioRead: "Listen to Steps",
    audioStop: "Mute Audio",
    chatTitle: "Ask Chef Rannaghor",
    chatPlaceholder: "Ask how to make it without onion, swap ingredients...",
    send: "Ask",
    steps: "Cooking Steps",
    ingredients: "Required Ingredients",
    difficulty: "Difficulty",
    prepTime: "Prep Time",
    cookTimeStat: "Cook Time",
    servings: "Servings",
    apiKeyRequired: "Note: Running in Demo Mode with pre-configured Bengali dishes. Enter a Groq API key in Settings to unlock real-time custom AI recipes!",
    demoActive: "Demo Mode Active"
  },
  bn: {
    title: "রান্নাঘর AI",
    subtitle: "বাঙ্গালী মশলা ও রেসিপি সহায়িকা",
    tagline: "আপনার রান্নাঘরে কী কী সবজি ও মশলা আছে তা বেছে নিন, আর পেয়ে যান চটজলদি বাঙ্গালী রেসিপি!",
    language: "ভাষা",
    settings: "সেটিংস",
    proteins: "আমিষ ও প্রোটিন উপাদান",
    vegetables: "সবজি সমূহ",
    spices: "রান্নাঘরের মশলা ও তেল",
    preferences: "রান্নার ধরন ও পছন্দ",
    diet: "খাবারের ধরন",
    veg: "নিরামিষ",
    nonVeg: "আমিষ",
    any: "সব ধরনের",
    spiceLevel: "ঝালের পরিমাণ",
    mild: "কম ঝাল",
    medium: "মাঝারি",
    spicy: "বেশি ঝাল",
    mealType: "খাবারের সময়",
    breakfast: "জলখাবার",
    lunchDinner: "দুপুর / রাতের খাবার",
    snack: "বিকেলের নাস্তা",
    cookTime: "রান্নার সর্বোচ্চ সময়",
    quick: "তাড়াতাড়ি (<২০ মিনিট)",
    average: "মাঝারি (<৪৫ মিনিট)",
    elaborate: "উৎসবের রান্না (ধীর আঁচে)",
    suggestBtn: "রান্না সাজেস্ট করো",
    customPlaceholder: "অন্য উপাদান লিখুন (যেমন নারকেল, টক দই)...",
    addBtn: "যোগ করুন",
    searchPlaceholder: "সবজি খুঁজুন...",
    keyConfig: "Groq API সেটিংস",
    enterKey: "Groq API কি (Key) প্রদান করুন",
    getKeyHelp: "console.groq.com থেকে সম্পূর্ণ বিনামূল্যে ১ মিনিটে API Key সংগ্রহ করুন",
    closeBtn: "বন্ধ করুন",
    saveBtn: "সংরক্ষণ করুন",
    apiStatus: "API সংযোগ",
    missingKey: "ডেমো মোড (মক রেসিপি লোড হবে)",
    validKey: "AI সক্রিয় (Groq API চালিত)",
    model: "Groq মডেল",
    loadingText: "হাঁড়িতে চামচ নাড়ানো হচ্ছে...",
    noRecipes: "কোনো রেসিপি পাওয়া যায়নি। আরো কিছু উপাদান নির্বাচন করুন!",
    missingLabel: "রান্নার জন্য বাজার থেকে লাগবে:",
    usedLabel: "আপনার রান্নাঘরে আছে:",
    chefTips: "শেফের বিশেষ পরামর্শ",
    audioRead: "রেসিপি শুনুন (অডিও)",
    audioStop: "অডিও বন্ধ করুন",
    chatTitle: "শেফ রান্নাঘর-কে জিজ্ঞেস করুন",
    chatPlaceholder: "পেঁয়াজ ছাড়া কীভাবে রাঁধবেন, বা উপকরণ বদল করার উপায়...",
    send: "পাঠান",
    steps: "রান্না করার প্রণালী",
    ingredients: "প্রয়োজনীয় উপাদানের তালিকা",
    difficulty: "কঠিনতা",
    prepTime: "প্রস্তুতির সময়",
    cookTimeStat: "রান্নার সময়",
    servings: "পরিবেশন",
    apiKeyRequired: "বিশেষ দ্রষ্টব্য: API Key দেওয়া নেই। সেটিংস-এ গিয়ে Groq API Key যুক্ত করলে সরাসরি কৃত্রিম বুদ্ধিমত্তার মাধ্যমে আপনার উপাদানের ওপর ভিত্তি করে রেসিপি জেনারেট হবে।",
    demoActive: "ডেমো মোড সক্রিয়"
  }
};

function App() {
  // Config state
  const [lang, setLang] = useState('bn'); // Defaulting to Bengali
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('rannaghor_api_key') || '');
  const [model, setModel] = useState(() => localStorage.getItem('rannaghor_model') || 'llama-3.3-70b-versatile');
  const [useMockMode, setUseMockMode] = useState(() => !localStorage.getItem('rannaghor_api_key'));
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Pantry & Ingredients state
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [spiceCabinet, setSpiceCabinet] = useState(() => {
    const cabinet = {};
    SPICES.forEach(s => {
      cabinet[s.id] = { active: false, level: 'medium' };
    });
    return cabinet;
  });
  
  const [customIngredients, setCustomIngredients] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [veggieQuery, setVeggieQuery] = useState('');

  // Preference state
  const [diet, setDiet] = useState('any');
  const [spiceLevel, setSpiceLevel] = useState('medium');
  const [mealType, setMealType] = useState('lunchDinner');
  const [timeLimit, setTimeLimit] = useState('average');

  // App running states
  const [loading, setLoading] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState({ en: '', bn: '' });
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);

  // Audio / TTS state
  const [speaking, setSpeaking] = useState(false);
  const speechRef = useRef(null);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const t = TRANSLATIONS[lang];

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle TTS setup
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'bn' : 'en');
  };

  const handleProteinToggle = (id) => {
    setSelectedProteins(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleVegetableToggle = (id) => {
    setSelectedVegetables(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSpiceToggle = (id) => {
    setSpiceCabinet(prev => ({
      ...prev,
      [id]: { ...prev[id], active: !prev[id].active }
    }));
  };

  const handleSpiceLevelChange = (id, level) => {
    setSpiceCabinet(prev => ({
      ...prev,
      [id]: { ...prev[id], level }
    }));
  };

  const handleAddCustomIngredient = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      setCustomIngredients(prev => [...prev, customInput.trim()]);
      setCustomInput('');
    }
  };

  const handleRemoveCustomIngredient = (index) => {
    setCustomIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const saveSettings = (key, selectedModel, mockMode) => {
    localStorage.setItem('rannaghor_api_key', key);
    localStorage.setItem('rannaghor_model', selectedModel);
    setApiKey(key);
    setModel(selectedModel);
    setUseMockMode(mockMode);
    setSettingsOpen(false);
  };

  // TTS Reader
  const handleSpeakRecipe = (recipe) => {
    if (!window.speechSynthesis) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const titleText = lang === 'bn' ? `আজকের রেসিপি ${recipe.name_bn}।` : `Today's recipe is ${recipe.name_en}.`;
    const stepIntro = lang === 'bn' ? `রান্না করার প্রণালী সমূহ নিম্নরূপ:` : `Here are the cooking instructions:`;
    
    const steps = lang === 'bn' ? recipe.instructions_bn : recipe.instructions_en;
    const fullText = `${titleText} ${stepIntro}. ` + steps.map((s, idx) => `${lang === 'bn' ? 'ধাপ' : 'Step'} ${idx + 1}: ${s}`).join('. ');

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = lang === 'bn' ? 'bn-IN' : 'en-US';
    
    // Find matching voice
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.toLowerCase().includes(lang === 'bn' ? 'bn' : 'en'));
    if (targetVoice) utterance.voice = targetVoice;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Recipe Generator Call
  const handleSuggestRecipes = async () => {
    setLoading(true);
    setError(null);
    setRecipes(null);
    setChatMessages([]);
    
    // Cancel speaking if active
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }

    // Set loading quotes
    const quote = COOKING_QUOTES[Math.floor(Math.random() * COOKING_QUOTES.length)];
    setLoadingQuote(quote);

    const proteinDetails = PROTEINS.filter(p => selectedProteins.includes(p.id));
    const vegDetails = VEGETABLES.filter(v => selectedVegetables.includes(v.id));
    const activeSpices = SPICES.filter(s => spiceCabinet[s.id].active).map(s => {
      return `${s.name} (${s.bn})${s.hasSlider ? ` - Level: ${spiceCabinet[s.id].level}` : ''}`;
    });

    const runMockRecipes = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResult = getMockRecipes(
        proteinDetails,
        vegDetails,
        SPICES.map(s => ({ ...s, active: spiceCabinet[s.id].active, level: spiceCabinet[s.id].level })),
        { diet, spiceLevel, mealType, timeLimit, lang }
      );
      setRecipes(mockResult.recipes);
      setActiveRecipeIndex(0);
      setLoading(false);
    };

    if (useMockMode) {
      await runMockRecipes();
      return;
    }

    // Call Groq API
    const systemPrompt = `You are "Chef Rannaghor", a legendary bilingual Bengali chef. Your goal is to suggest 2-3 delicious, authentic Bengali recipes based on the ingredients provided.
You must respond ONLY with a JSON object in this format. Do not write any markdown headers, tags, or extra chat. Use this JSON format:
{
  "recipes": [
    {
      "name_en": "Recipe name in English",
      "name_bn": "রেসিপির নাম বাংলায়",
      "description_en": "Appetizing description in English focusing on why it fits the ingredients.",
      "description_bn": "উপাদানের সমন্বয়ে এই পদটি কেন তৈরি করা হলো তার বর্ণনা বাংলায়।",
      "prep_time": "15 mins",
      "cook_time": "30 mins",
      "difficulty": "Easy/Medium/Hard",
      "serving_size": "2-3 servings",
      "ingredients_used": [
        { "name_en": "Ingredient Eng", "name_bn": "উপাদান বাংলা", "amount": "quantity details" }
      ],
      "ingredients_missing": [
        { "name_en": "Missing ingredient Eng", "name_bn": "অনুপস্থিত উপাদান বাংলা", "amount": "needed quantity" }
      ],
      "instructions_en": [
        "Step 1...",
        "Step 2..."
      ],
      "instructions_bn": [
        "ধাপ ১...",
        "ধাপ ২..."
      ],
      "chef_tip_en": "A secret tips for better taste in English.",
      "chef_tip_bn": "স্বাদ বাড়ানোর জন্য বিশেষ পরামর্শ বাংলায়।"
    }
  ]
}`;

    const userPrompt = `I have the following ingredients:
- Main Proteins: ${proteinDetails.map(p => `${p.name} (${p.bn})`).join(', ') || 'None selected'}
- Vegetables: ${vegDetails.map(v => `${v.name} (${v.bn})`).join(', ') || 'None selected'}
- Spices & Pantry: ${activeSpices.join(', ') || 'Only water/oil'}
- Extra custom items: ${customIngredients.join(', ') || 'None'}

Preferences:
- Diet Style: ${diet}
- Spice Level: ${spiceLevel}
- Meal Type: ${mealType}
- Maximum Cooking Time: ${timeLimit}

Suggest 2 to 3 Bengali recipes that match these. Optimize to use as many of my ingredients as possible. If some ingredients are missing but highly common or can be bought, list them in "ingredients_missing". Make sure the instructions are extremely easy to follow step-by-step and have authentic Bengali flavors.`;

    if (apiKey) {
      // Direct client-side fetch (with API key)
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
          })
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.choices[0].message.content);
        
        if (parsedData.recipes && parsedData.recipes.length > 0) {
          setRecipes(parsedData.recipes);
          setActiveRecipeIndex(0);
        } else {
          throw new Error("No recipes returned in the JSON response.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load recipes. Please verify your API key or connection.");
      } finally {
        setLoading(false);
      }
    } else {
      // Vercel Serverless Proxy fetch (without API key on client)
      try {
        const response = await fetch("/api/suggest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ]
          })
        });

        if (response.status === 404) {
          // If serverless is not hosted (like GitHub Pages or local preview without vercel dev)
          console.warn("Serverless API endpoints not found. Falling back to Demo Mode.");
          await runMockRecipes();
          return;
        }

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server Error: ${response.status}`);
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.choices[0].message.content);
        
        if (parsedData.recipes && parsedData.recipes.length > 0) {
          setRecipes(parsedData.recipes);
          setActiveRecipeIndex(0);
        } else {
          throw new Error("No recipes returned in the JSON response.");
        }
      } catch (err) {
        console.error("Vercel Serverless proxy error:", err);
        if (err.message.includes("not configured")) {
          setError(lang === 'bn' 
            ? "সার্ভারে Groq API Key সেট করা নেই। আপনার Vercel প্রজেক্ট সেটিংসে গিয়ে GROQ_API_KEY এনভায়রনমেন্ট ভেরিয়েবল যোগ করুন।" 
            : "Serverless Groq API Key not configured. Please add the GROQ_API_KEY environment variable in your Vercel Project settings.");
        } else {
          console.warn("Falling back to local mock recipes.");
          await runMockRecipes();
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Recipe Customization Chat Call
  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const currentRecipe = recipes[activeRecipeIndex];
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);

    const runMockChat = async () => {
      // Simulate Mock Chat Response
      await new Promise(resolve => setTimeout(resolve, 1000));
      let mockReply = '';
      const lowercaseMsg = userMsg.toLowerCase();
      
      if (lowercaseMsg.includes('onion') || lowercaseMsg.includes('পেঁয়াজ') || lowercaseMsg.includes('রসুন') || lowercaseMsg.includes('garlic')) {
        mockReply = lang === 'bn' 
          ? "হ্যাঁ, পেঁয়াজ-রসুন ছাড়া এটি করতে পারেন! গরম তেলের ফোড়নে জিরে ও তেজপাতা দিন এবং স্বাদ ঠিক রাখতে সামান্য আদা বাটা আর টমেটোর পরিমাণ বাড়িয়ে দিন।" 
          : "Yes, you can absolutely make this without onion and garlic! Just temper the hot oil with cumin seeds and bay leaf, and slightly increase the ginger paste and tomato puree to balance the gravy.";
      } else if (lowercaseMsg.includes('spic') || lowercaseMsg.includes('ঝাল') || lowercaseMsg.includes('লঙ্কা')) {
        mockReply = lang === 'bn'
          ? "ঝাল কমাতে লঙ্কার গুঁড়োর বদলে সামান্য চিনি বা নারকেলের দুধ দিতে পারেন। আর ঝাল বাড়াতে কষানোর সময় আরও ২-৩টি চেরা কাঁচা লঙ্কা দিন।"
          : "To reduce spice, skip chilli powder and add a splash of coconut milk or a pinch of sugar. To make it spicier, add 2-3 more slit green chillies during the sautéing stage.";
      } else {
        mockReply = lang === 'bn'
          ? `শেফ রান্নাঘর বলছেন: "${currentRecipe.name_bn}" তৈরির সময় আঁচে তাড়াহুড়ো করবেন না। ধীর আঁচে মশলা কষালে তরকারির আসল স্বাদ ফুটে উঠবে!`
          : `Chef Rannaghor says: Don't rush the flame for "${currentRecipe.name_en}". Slow-cooking (Koshano) the spices on medium-low heat is the secret to getting the authentic aroma!`;
      }

      setChatMessages(prev => [...prev, { sender: 'assistant', text: mockReply }]);
      setChatLoading(false);
    };

    if (useMockMode) {
      await runMockChat();
      return;
    }

    // Call Groq API for chat assistant
    const currentChatHistory = chatMessages.slice(-4).map(msg => {
      return `${msg.sender === 'user' ? 'User' : 'Chef'}: ${msg.text}`;
    }).join('\n');

    const chatPrompt = `You are Chef Rannaghor, answering a follow-up query about the recipe: "${currentRecipe.name_en}" (Bengali name: "${currentRecipe.name_bn}").
Here is the chat history:
${currentChatHistory}
User asks: "${userMsg}"

Provide a warm, expert cooking advice. Keep it short (2-3 sentences max). Answer in Bengali if they ask in Bengali, or English if they ask in English. Try to suggest simple replacements or tips.`;

    if (apiKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: "You are Chef Rannaghor. Speak directly, concisely, and warmly. No markdown metadata." },
              { role: "user", content: chatPrompt }
            ],
            temperature: 0.7,
          })
        });

        if (!response.ok) {
          throw new Error("Chat assistant error");
        }

        const data = await response.json();
        const chefReply = data.choices[0].message.content.trim();
        setChatMessages(prev => [...prev, { sender: 'assistant', text: chefReply }]);
      } catch (err) {
        console.error(err);
        setChatMessages(prev => [...prev, { sender: 'assistant', text: lang === 'bn' ? "দুঃখিত, সংযোগে সমস্যা হয়েছে।" : "Sorry, I had trouble processing that request." }]);
      } finally {
        setChatLoading(false);
      }
    } else {
      // Vercel Serverless proxy chat
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: "You are Chef Rannaghor. Speak directly, concisely, and warmly. No markdown metadata." },
              { role: "user", content: chatPrompt }
            ]
          })
        });

        if (response.status === 404) {
          console.warn("Serverless chat endpoint not found. Falling back to mock.");
          await runMockChat();
          return;
        }

        if (!response.ok) {
          throw new Error("Chat proxy error");
        }

        const data = await response.json();
        const chefReply = data.choices[0].message.content.trim();
        setChatMessages(prev => [...prev, { sender: 'assistant', text: chefReply }]);
      } catch (err) {
        console.error("Vercel proxy chat error:", err);
        await runMockChat();
      }
    }
  };

  const filteredVegetables = VEGETABLES.filter(v => 
    v.name.toLowerCase().includes(veggieQuery.toLowerCase()) || 
    v.bn.includes(veggieQuery)
  );

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo">
            <ChefHat size={32} />
          </div>
          <div className="brand-title">
            <span className={lang === 'bn' ? 'bengali-text' : ''}>{t.title}</span>
            <span className="brand-subtitle">{t.subtitle}</span>
          </div>
        </div>

        <div className="header-actions">
          {/* Language Selector */}
          <div className="lang-toggle">
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn bengali-text ${lang === 'bn' ? 'active' : ''}`}
              onClick={() => setLang('bn')}
            >
              বাং
            </button>
          </div>

          {/* Config Settings Trigger */}
          <button 
            className="btn-icon-only" 
            onClick={() => setSettingsOpen(true)}
            title={t.settings}
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Hero Banner */}
      <section className="hero-section animate-fade">
        <h1 className={lang === 'bn' ? 'bengali-text' : ''}>
          {lang === 'bn' ? "রান্নাঘর AI - আপনার হাতের মুঠোয়" : "Rannaghor AI Assistant"}
        </h1>
        <p className={lang === 'bn' ? 'bengali-text' : ''}>{t.tagline}</p>
        
        {useMockMode && (
          <div className="key-status-badge missing" style={{ marginTop: '1rem' }}>
            <Info size={14} />
            <span>{t.apiKeyRequired}</span>
          </div>
        )}
      </section>

      {/* Primary Dashboard */}
      <div className="pantry-grid-layout">
        {/* Left Hand Column: Ingredients Grid */}
        <div className="pantry-inputs">
          
          {/* Proteins Section */}
          <div className="pantry-card animate-fade" style={{ animationDelay: '0.1s' }}>
            <h2 className={`pantry-card-title proteins ${lang === 'bn' ? 'bengali-text' : ''}`}>
              <Utensils size={20} />
              {t.proteins}
            </h2>
            <div className="ingredients-flex-grid">
              {PROTEINS.map(p => {
                const isSelected = selectedProteins.includes(p.id);
                return (
                  <div 
                    key={p.id} 
                    className={`ingredient-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleProteinToggle(p.id)}
                  >
                    <div className="selected-checkbox">
                      {isSelected && <Check size={10} />}
                    </div>
                    <div className="ingredient-icon-wrapper">{p.icon}</div>
                    <div className="ingredient-name">{p.name}</div>
                    <div className="ingredient-bengali-name bengali-text">{p.bn}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vegetables Grid Section */}
          <div className="pantry-card animate-fade" style={{ animationDelay: '0.2s' }}>
            <h2 className={`pantry-card-title vegetables ${lang === 'bn' ? 'bengali-text' : ''}`}>
              <Utensils size={20} />
              {t.vegetables}
            </h2>
            
            {/* Search Box */}
            <div className="search-box-wrapper">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder={t.searchPlaceholder}
                value={veggieQuery}
                onChange={(e) => setVeggieQuery(e.target.value)}
              />
            </div>

            <div className="ingredients-flex-grid">
              {filteredVegetables.map(v => {
                const isSelected = selectedVegetables.includes(v.id);
                return (
                  <div 
                    key={v.id} 
                    className={`ingredient-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleVegetableToggle(v.id)}
                  >
                    <div className="selected-checkbox">
                      {isSelected && <Check size={10} />}
                    </div>
                    <div className="ingredient-icon-wrapper">{v.icon}</div>
                    <div className="ingredient-name">{v.name}</div>
                    <div className="ingredient-bengali-name bengali-text">{v.bn}</div>
                  </div>
                );
              })}
            </div>

            {/* Custom Input Tag Section */}
            <div className="custom-input-section">
              <label className="custom-input-label">{t.customPlaceholder}</label>
              <form onSubmit={handleAddCustomIngredient} className="custom-input-row">
                <input 
                  type="text" 
                  className="custom-input-field" 
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={lang === 'bn' ? "যেমনঃ পোস্ত, নারকেল কোড়া, টকদই..." : "e.g. poppy paste, grated coconut..."}
                />
                <button type="submit" className="btn btn-primary">{t.addBtn}</button>
              </form>
              <div className="custom-tags-container">
                {customIngredients.map((item, idx) => (
                  <span key={idx} className="custom-tag">
                    {item}
                    <X size={12} className="custom-tag-remove" onClick={() => handleRemoveCustomIngredient(idx)} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand Column: Spices Cabinet and Style Preferences */}
        <div className="pantry-sidebar">
          
          {/* Spices Drawer Shelf */}
          <div className="pantry-card animate-fade" style={{ animationDelay: '0.15s' }}>
            <h2 className={`pantry-card-title spices ${lang === 'bn' ? 'bengali-text' : ''}`}>
              <Sliders size={20} />
              {t.spices}
            </h2>
            <div className="spices-shelf">
              {SPICES.map(s => {
                const state = spiceCabinet[s.id];
                return (
                  <div key={s.id} className={`spice-row ${state.active ? 'has-spice' : ''}`}>
                    <div className="spice-info" onClick={() => handleSpiceToggle(s.id)} style={{ cursor: 'pointer' }}>
                      <span className="spice-icon">{s.icon}</span>
                      <div className="spice-names">
                        <span className="spice-name">{s.name}</span>
                        <span className="spice-bengali bengali-text">{s.bn}</span>
                      </div>
                    </div>
                    
                    <div className="spice-controls">
                      <button 
                        className={`spice-toggle-switch ${state.active ? 'active' : ''}`}
                        onClick={() => handleSpiceToggle(s.id)}
                      >
                        {state.active ? (lang === 'bn' ? 'আছে' : 'Have') : (lang === 'bn' ? 'নেই' : 'None')}
                      </button>
                      
                      {state.active && s.hasSlider && (
                        <select 
                          className="spice-level-select"
                          value={state.level}
                          onChange={(e) => handleSpiceLevelChange(s.id, e.target.value)}
                        >
                          <option value="low">{lang === 'bn' ? 'অল্প' : 'A Little'}</option>
                          <option value="medium">{lang === 'bn' ? 'মাঝারি' : 'Medium'}</option>
                          <option value="high">{lang === 'bn' ? 'বেশি' : 'Plenty'}</option>
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User preferences */}
          <div className="pantry-card animate-fade" style={{ animationDelay: '0.25s' }}>
            <h2 className={`pantry-card-title preferences ${lang === 'bn' ? 'bengali-text' : ''}`}>
              <Sliders size={20} />
              {t.preferences}
            </h2>
            
            <div className="pref-grid">
              {/* Diet */}
              <div>
                <div className="pref-group-title">{t.diet}</div>
                <div className="pref-options">
                  <button 
                    className={`pref-btn ${diet === 'any' ? 'active' : ''}`}
                    onClick={() => setDiet('any')}
                  >
                    {lang === 'bn' ? 'যেকোনো' : 'Any'}
                  </button>
                  <button 
                    className={`pref-btn ${diet === 'veg' ? 'active' : ''}`}
                    onClick={() => setDiet('veg')}
                  >
                    {lang === 'bn' ? 'নিরামিষ' : 'Veg'}
                  </button>
                  <button 
                    className={`pref-btn ${diet === 'non-veg' ? 'active' : ''}`}
                    onClick={() => setDiet('non-veg')}
                  >
                    {lang === 'bn' ? 'আমিষ' : 'Non-Veg'}
                  </button>
                </div>
              </div>

              {/* Spice level */}
              <div>
                <div className="pref-group-title">{t.spiceLevel}</div>
                <div className="pref-options">
                  <button 
                    className={`pref-btn ${spiceLevel === 'mild' ? 'active' : ''}`}
                    onClick={() => setSpiceLevel('mild')}
                  >
                    {lang === 'bn' ? 'কম' : 'Mild'}
                  </button>
                  <button 
                    className={`pref-btn ${spiceLevel === 'medium' ? 'active' : ''}`}
                    onClick={() => setSpiceLevel('medium')}
                  >
                    {lang === 'bn' ? 'মাঝারি' : 'Medium'}
                  </button>
                  <button 
                    className={`pref-btn ${spiceLevel === 'spicy' ? 'active' : ''}`}
                    onClick={() => setSpiceLevel('spicy')}
                  >
                    {lang === 'bn' ? 'বেশি' : 'Fiery'}
                  </button>
                </div>
              </div>

              {/* Meal Type */}
              <div>
                <div className="pref-group-title">{t.mealType}</div>
                <div className="pref-options">
                  <button 
                    className={`pref-btn ${mealType === 'breakfast' ? 'active' : ''}`}
                    onClick={() => setMealType('breakfast')}
                  >
                    {lang === 'bn' ? 'সকাল' : 'Breakfast'}
                  </button>
                  <button 
                    className={`pref-btn ${mealType === 'lunchDinner' ? 'active' : ''}`}
                    onClick={() => setMealType('lunchDinner')}
                  >
                    {lang === 'bn' ? 'দুপুর/রাত' : 'Lunch/Dinner'}
                  </button>
                  <button 
                    className={`pref-btn ${mealType === 'snack' ? 'active' : ''}`}
                    onClick={() => setMealType('snack')}
                  >
                    {lang === 'bn' ? 'নাস্তা' : 'Snack'}
                  </button>
                </div>
              </div>

              {/* Cooking time */}
              <div>
                <div className="pref-group-title">{t.cookTime}</div>
                <div className="pref-options">
                  <button 
                    className={`pref-btn ${timeLimit === 'quick' ? 'active' : ''}`}
                    onClick={() => setTimeLimit('quick')}
                  >
                    {lang === 'bn' ? 'তাড়াতাড়ি' : 'Quick'}
                  </button>
                  <button 
                    className={`pref-btn ${timeLimit === 'average' ? 'active' : ''}`}
                    onClick={() => setTimeLimit('average')}
                  >
                    {lang === 'bn' ? 'মাঝারি' : 'Medium'}
                  </button>
                  <button 
                    className={`pref-btn ${timeLimit === 'elaborate' ? 'active' : ''}`}
                    onClick={() => setTimeLimit('elaborate')}
                  >
                    {lang === 'bn' ? 'ধীর' : 'Elaborate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggest Recipes Call Button */}
      <div className="generate-action-wrapper">
        <button 
          className="btn btn-primary btn-generate pulse-button" 
          onClick={handleSuggestRecipes}
          disabled={loading}
        >
          <Sparkles size={22} />
          <span className={lang === 'bn' ? 'bengali-text' : ''}>{t.suggestBtn}</span>
        </button>
      </div>

      {/* Loading state screen */}
      {loading && (
        <div className="loading-recipes-overlay animate-fade">
          <div className="cooking-pot-animation">🍳</div>
          <h3 className={`loading-title ${lang === 'bn' ? 'bengali-text' : ''}`}>{t.loadingText}</h3>
          <p className="loading-quote bengali-text">
            {lang === 'bn' ? loadingQuote.bn : loadingQuote.en}
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="key-status-badge missing" style={{ marginTop: '2rem', padding: '1rem', width: '100%' }}>
          <AlertCircle size={20} />
          <div style={{ textAlign: 'left' }}>
            <strong>{lang === 'bn' ? 'ত্রুটি ঘটেছে' : 'An error occurred'}</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Results Display Grid */}
      {recipes && recipes.length > 0 && !loading && (
        <section className="results-section animate-fade">
          <div className="results-header-row">
            <h2 className={lang === 'bn' ? 'bengali-text' : ''}>
              {lang === 'bn' ? "শেফ রেসিপি সাজেশনস" : "Chef's Cooking Suggestions"}
            </h2>
            <span className="key-status-badge valid" style={{ margin: 0 }}>
              {useMockMode ? t.demoActive : 'AI Active'}
            </span>
          </div>

          <div className="results-layout">
            {/* Sidebar list of recipes */}
            <div className="recipes-sidebar">
              {recipes.map((recipe, index) => (
                <div 
                  key={index} 
                  className={`recipe-tab-card ${activeRecipeIndex === index ? 'active' : ''}`}
                  onClick={() => {
                    setActiveRecipeIndex(index);
                    setChatMessages([]);
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                    setSpeaking(false);
                  }}
                >
                  <div className="tab-card-title">
                    <span>{recipe.name_en}</span>
                    <span className="meta-badge">{recipe.difficulty}</span>
                  </div>
                  <div className="tab-card-bengali bengali-text">{recipe.name_bn}</div>
                  <p className="tab-card-desc">
                    {lang === 'bn' ? recipe.description_bn : recipe.description_en}
                  </p>
                  <div className="tab-card-meta">
                    <span className="meta-badge">{recipe.prep_time} prep</span>
                    <span className="meta-badge">{recipe.cook_time} cook</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active recipe full detail display */}
            <div className="active-recipe-view">
              <div className="recipe-title-wrapper">
                <h2 className="recipe-title-en">{recipes[activeRecipeIndex].name_en}</h2>
                <h3 className="recipe-title-bn bengali-text">{recipes[activeRecipeIndex].name_bn}</h3>
                
                {/* Stats */}
                <div className="recipe-quick-stats">
                  <span className="stat-badge">
                    <Flame size={14} color="var(--primary)" />
                    {t.difficulty}: {recipes[activeRecipeIndex].difficulty}
                  </span>
                  <span className="stat-badge">
                    <Clock size={14} />
                    {t.prepTime}: {recipes[activeRecipeIndex].prep_time}
                  </span>
                  <span className="stat-badge">
                    <Clock size={14} />
                    {t.cookTimeStat}: {recipes[activeRecipeIndex].cook_time}
                  </span>
                  <span className="stat-badge">
                    <Utensils size={14} />
                    {t.servings}: {recipes[activeRecipeIndex].serving_size}
                  </span>
                </div>

                {/* TTS Reader player */}
                <div className="speech-player-bar">
                  <span className="speech-player-label">
                    {speaking ? (lang === 'bn' ? "অডিও চলছে..." : "Playing recipe guide...") : (lang === 'bn' ? "রেসিপিটি অডিওতে শুনতে চান?" : "Want to hear the recipe steps?")}
                  </span>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleSpeakRecipe(recipes[activeRecipeIndex])}
                  >
                    {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    {speaking ? t.audioStop : t.audioRead}
                  </button>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                {lang === 'bn' ? recipes[activeRecipeIndex].description_bn : recipes[activeRecipeIndex].description_en}
              </p>

              {/* Ingredients Lists */}
              <h3 className={`recipe-section-title ${lang === 'bn' ? 'bengali-text' : ''}`}>
                <Utensils size={16} />
                {t.ingredients}
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="pref-group-title">{t.usedLabel}</div>
                <ul className="ingredients-checklist">
                  {recipes[activeRecipeIndex].ingredients_used.map((ing, idx) => (
                    <li key={idx} className="checklist-item">
                      <span style={{ color: 'var(--accent)' }}>✓</span>
                      <span>
                        <strong>{lang === 'bn' ? ing.name_bn : ing.name_en}</strong>: {ing.amount}
                      </span>
                    </li>
                  ))}
                </ul>

                {recipes[activeRecipeIndex].ingredients_missing && recipes[activeRecipeIndex].ingredients_missing.length > 0 && (
                  <>
                    <div className="pref-group-title" style={{ color: 'var(--primary)', marginTop: '1rem' }}>
                      {t.missingLabel}
                    </div>
                    <ul className="ingredients-checklist">
                      {recipes[activeRecipeIndex].ingredients_missing.map((ing, idx) => (
                        <li key={idx} className="checklist-item" style={{ opacity: 0.8 }}>
                          <span style={{ color: 'var(--primary)' }}>+</span>
                          <span>
                            <strong>{lang === 'bn' ? ing.name_bn : ing.name_en}</strong>: {ing.amount}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Cooking Instructions Steps */}
              <h3 className={`recipe-section-title ${lang === 'bn' ? 'bengali-text' : ''}`}>
                <Utensils size={16} />
                {t.steps}
              </h3>
              <div className="step-by-step">
                {(lang === 'bn' ? recipes[activeRecipeIndex].instructions_bn : recipes[activeRecipeIndex].instructions_en).map((step, idx) => (
                  <div key={idx} className="step-card">
                    <div className="step-number">{idx + 1}</div>
                    <div className="step-text">{step}</div>
                  </div>
                ))}
              </div>

              {/* Chef Tips */}
              <div className="recipe-tips">
                <div className={`recipe-tips-title ${lang === 'bn' ? 'bengali-text' : ''}`}>{t.chefTips}</div>
                <p className="recipe-tips-text">
                  {lang === 'bn' ? recipes[activeRecipeIndex].chef_tip_bn : recipes[activeRecipeIndex].chef_tip_en}
                </p>
              </div>

              {/* Interactive chat assistant for recipe adjustments */}
              <div className="recipe-assistant-box">
                <div className="assistant-header">
                  <span className={`assistant-title ${lang === 'bn' ? 'bengali-text' : ''}`}>
                    <ChefHat size={16} />
                    {t.chatTitle}
                  </span>
                  <span className="assistant-status">Active</span>
                </div>
                
                <div className="assistant-messages">
                  <div className="chat-bubble assistant">
                    {lang === 'bn' 
                      ? `প্রণাম! "${recipes[activeRecipeIndex].name_bn}" রেসিপিটি আপনার পছন্দ হয়েছে? কোনো উপাদান বদলাতে চাইলে বা আপনার নিজস্ব পছন্দ যোগ করতে চাইলে আমাকে জিজ্ঞেস করুন!`
                      : `Hello! How do you like "${recipes[activeRecipeIndex].name_en}"? Let me know if you want to swap any ingredients, make it milder, or adjust it for your taste!`}
                  </div>
                  
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg.sender}`}>
                      {msg.text}
                    </div>
                  ))}
                  
                  {chatLoading && (
                    <div className="chat-bubble assistant loading-shimmer" style={{ width: '40px', height: '28px' }}></div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendChatMessage} className="assistant-input-bar">
                  <input 
                    type="text" 
                    className="assistant-input"
                    placeholder={t.chatPlaceholder}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="assistant-send-btn">
                    <Send size={16} />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Settings Modal (API config) */}
      {settingsOpen && (
        <div className="modal-overlay" onClick={() => setSettingsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t.keyConfig}</h3>
              <button className="modal-close-btn" onClick={() => setSettingsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* API Status badge */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div className="form-label">{t.apiStatus}</div>
              <span className={`key-status-badge ${useMockMode ? 'missing' : 'valid'}`}>
                {useMockMode ? t.missingKey : t.validKey}
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">{t.enterKey}</label>
              <input 
                type="password" 
                className="form-input"
                placeholder="gsk_..."
                defaultValue={apiKey}
                id="api-key-input"
              />
              <p className="form-help-text">
                <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">
                  {t.getKeyHelp}
                </a>
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">{t.model}</label>
              <select className="form-input" id="model-select" defaultValue={model}>
                <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Recommended)</option>
                <option value="llama-3.3-70b-specdec">Llama 3.3 70B SpecDec (Fast)</option>
                <option value="gemma2-9b-it">Gemma 2 9B IT (Great Bengali capability)</option>
                <option value="llama-3.1-8b-instant">Llama 3.1 8B Instant (Super Fast)</option>
                <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="mock-mode-check" 
                defaultChecked={useMockMode} 
                style={{ width: '18px', height: '18px' }}
              />
              <label htmlFor="mock-mode-check" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
                Run in Demo Mode (Always use Mock recipes offline)
              </label>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => {
                const keyVal = document.getElementById('api-key-input').value.trim();
                const modelVal = document.getElementById('model-select').value;
                const isMockVal = document.getElementById('mock-mode-check').checked;
                saveSettings(keyVal, modelVal, isMockVal);
              }}
            >
              {t.saveBtn}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '3rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-light)' }}>
        <p className="bengali-text">তৈরি করেছেন Antigravity AI • রান্নাঘর সহায়িকা ২০২৬</p>
        <p style={{ marginTop: '0.25rem' }}>Powered by Groq Free API & React Vite</p>
      </footer>
    </div>
  );
}

export default App;
