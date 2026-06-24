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
  Info,
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight
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
    demoActive: "Demo Mode Active",
    foodStyle: "Dish Style",
    foodStyleAny: "Any Style",
    foodStyleSimple: "Simple & Healthy",
    foodStyleRich: "Rich & Oily",
    foodStyleJunk: "Junk / Fast Food",
    calories: "Calories",
    protein: "Protein",
    addCustomItem: "Add custom item"
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
    audioRead: "রেসিпи শুনুন (অডিও)",
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
    demoActive: "ডেমো মোড সক্রিয়",
    foodStyle: "খাবারের ধরন",
    foodStyleAny: "যেকোনো",
    foodStyleSimple: "হালকা ও সাধারণ",
    foodStyleRich: "রিচ ও তৈলাক্ত",
    foodStyleJunk: "ফাস্ট ফুড / চটপটা",
    calories: "ক্যালোরি",
    protein: "প্রোটিন",
    addCustomItem: "নতুন উপাদান যোগ করুন"
  }
};

function App() {
  // Config state
  const [lang, setLang] = useState(() => localStorage.getItem('rannaghor_lang') || 'bn');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('rannaghor_api_key') || '');
  const [model, setModel] = useState(() => {
    const stored = localStorage.getItem('rannaghor_model');
    return (!stored || stored === 'llama-3.3-70b-specdec') ? 'llama-3.3-70b-versatile' : stored;
  });
  const [useMockMode, setUseMockMode] = useState(() => {
    const stored = localStorage.getItem('rannaghor_use_mock');
    return stored === null ? false : stored === 'true';
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Pantry & Ingredients state
  const [selectedProteins, setSelectedProteins] = useState(() => {
    const saved = localStorage.getItem('rannaghor_selected_proteins');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedVegetables, setSelectedVegetables] = useState(() => {
    const saved = localStorage.getItem('rannaghor_selected_vegetables');
    return saved ? JSON.parse(saved) : [];
  });
  const [spiceCabinet, setSpiceCabinet] = useState(() => {
    const saved = localStorage.getItem('rannaghor_spice_cabinet');
    if (saved) return JSON.parse(saved);
    const cabinet = {};
    SPICES.forEach(s => {
      cabinet[s.id] = { active: false, level: 'medium' };
    });
    return cabinet;
  });
  
  const [customIngredients, setCustomIngredients] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [veggieQuery, setVeggieQuery] = useState('');

  // Category specific added custom lists
  const [addedProteins, setAddedProteins] = useState(() => {
    const saved = localStorage.getItem('rannaghor_added_proteins');
    return saved ? JSON.parse(saved) : [];
  });
  const [addedVegetables, setAddedVegetables] = useState(() => {
    const saved = localStorage.getItem('rannaghor_added_vegetables');
    return saved ? JSON.parse(saved) : [];
  });
  const [addedSpices, setAddedSpices] = useState(() => {
    const saved = localStorage.getItem('rannaghor_added_spices');
    return saved ? JSON.parse(saved) : [];
  });

  // Category specific input states
  const [customInputs, setCustomInputs] = useState({ protein: '', vegetable: '', spice: '' });

  // Ingredient quantities & units: maps ingredientId -> { qty: number, unit: string }
  const [ingredientQuantities, setIngredientQuantities] = useState(() => {
    const saved = localStorage.getItem('rannaghor_ingredient_quantities');
    return saved ? JSON.parse(saved) : {};
  });

  // Preference state
  const [diet, setDiet] = useState(() => localStorage.getItem('rannaghor_diet') || 'any');
  const [spiceLevel, setSpiceLevel] = useState(() => localStorage.getItem('rannaghor_spice_level') || 'medium');
  const [mealType, setMealType] = useState(() => localStorage.getItem('rannaghor_meal_type') || 'lunchDinner');
  const [timeLimit, setTimeLimit] = useState(() => localStorage.getItem('rannaghor_time_limit') || 'average');
  const [foodStyle, setFoodStyle] = useState(() => localStorage.getItem('rannaghor_food_style') || 'any');

  // New advanced features states
  const [servingsScale, setServingsScale] = useState(1);
  const [focusMode, setFocusMode] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [voiceCommandsActive, setVoiceCommandsActive] = useState(false);
  const [checkedMissingIngredients, setCheckedMissingIngredients] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // App running states
  const [loading, setLoading] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState({ en: '', bn: '' });
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);

  // Audio / TTS state
  const [speaking, setSpeaking] = useState(false);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('rannaghor_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('rannaghor_selected_proteins', JSON.stringify(selectedProteins));
  }, [selectedProteins]);

  useEffect(() => {
    localStorage.setItem('rannaghor_selected_vegetables', JSON.stringify(selectedVegetables));
  }, [selectedVegetables]);

  useEffect(() => {
    localStorage.setItem('rannaghor_spice_cabinet', JSON.stringify(spiceCabinet));
  }, [spiceCabinet]);

  useEffect(() => {
    localStorage.setItem('rannaghor_added_proteins', JSON.stringify(addedProteins));
  }, [addedProteins]);

  useEffect(() => {
    localStorage.setItem('rannaghor_added_vegetables', JSON.stringify(addedVegetables));
  }, [addedVegetables]);

  useEffect(() => {
    localStorage.setItem('rannaghor_added_spices', JSON.stringify(addedSpices));
  }, [addedSpices]);

  useEffect(() => {
    localStorage.setItem('rannaghor_ingredient_quantities', JSON.stringify(ingredientQuantities));
  }, [ingredientQuantities]);

  useEffect(() => {
    localStorage.setItem('rannaghor_diet', diet);
  }, [diet]);

  useEffect(() => {
    localStorage.setItem('rannaghor_spice_level', spiceLevel);
  }, [spiceLevel]);

  useEffect(() => {
    localStorage.setItem('rannaghor_meal_type', mealType);
  }, [mealType]);

  useEffect(() => {
    localStorage.setItem('rannaghor_time_limit', timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    localStorage.setItem('rannaghor_food_style', foodStyle);
  }, [foodStyle]);

  // Toast message timeout helper
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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

  const handleProteinToggle = (id) => {
    setSelectedProteins(prev => {
      const isSelected = prev.includes(id);
      if (!isSelected && !ingredientQuantities[id]) {
        setIngredientQuantities(q => ({ ...q, [id]: { qty: 500, unit: 'g' } }));
      }
      return isSelected ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  const handleVegetableToggle = (id) => {
    setSelectedVegetables(prev => {
      const isSelected = prev.includes(id);
      if (!isSelected && !ingredientQuantities[id]) {
        setIngredientQuantities(q => ({ ...q, [id]: { qty: 500, unit: 'g' } }));
      }
      return isSelected ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  const handleSpiceToggle = (id) => {
    setSpiceCabinet(prev => {
      const isActive = !prev[id]?.active;
      if (isActive && !ingredientQuantities[id]) {
        setIngredientQuantities(q => ({ ...q, [id]: { qty: 2, unit: 'tbsp' } }));
      }
      return {
        ...prev,
        [id]: { ...prev[id], active: isActive }
      };
    });
  };

  const handleSpiceLevelChange = (id, level) => {
    setSpiceCabinet(prev => ({
      ...prev,
      [id]: { ...prev[id], level }
    }));
  };

  const handleQuantityChange = (id, val) => {
    setIngredientQuantities(prev => ({
      ...prev,
      [id]: { ...prev[id], qty: val }
    }));
  };

  const handleUnitChange = (id, unitVal) => {
    setIngredientQuantities(prev => ({
      ...prev,
      [id]: { ...prev[id], unit: unitVal }
    }));
  };

  const handleAddCustomItem = (category) => {
    const inputVal = customInputs[category]?.trim();
    if (!inputVal) return;

    const id = `custom_${category}_${Date.now()}`;
    const newItem = {
      id,
      name: inputVal,
      bn: inputVal,
      icon: category === 'protein' ? '🍖' : category === 'vegetable' ? '🥦' : '🧂',
      category: category
    };

    if (category === 'protein') {
      setAddedProteins(prev => [...prev, newItem]);
      setSelectedProteins(prev => [...prev, id]);
      if (!ingredientQuantities[id]) {
        setIngredientQuantities(q => ({ ...q, [id]: { qty: 500, unit: 'g' } }));
      }
    } else if (category === 'vegetable') {
      setAddedVegetables(prev => [...prev, newItem]);
      setSelectedVegetables(prev => [...prev, id]);
      if (!ingredientQuantities[id]) {
        setIngredientQuantities(q => ({ ...q, [id]: { qty: 500, unit: 'g' } }));
      }
    } else if (category === 'spice') {
      setAddedSpices(prev => [...prev, newItem]);
      setSpiceCabinet(prev => ({
        ...prev,
        [id]: { active: true, level: 'medium' }
      }));
      if (!ingredientQuantities[id]) {
        setIngredientQuantities(q => ({ ...q, [id]: { qty: 2, unit: 'tbsp' } }));
      }
    }

    setCustomInputs(prev => ({ ...prev, [category]: '' }));
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
    localStorage.setItem('rannaghor_use_mock', mockMode ? 'true' : 'false');
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

    const allProteins = [...PROTEINS, ...addedProteins];
    const allVegetables = [...VEGETABLES, ...addedVegetables];
    const allSpices = [...SPICES, ...addedSpices];

    const proteinDetails = allProteins
      .filter(p => selectedProteins.includes(p.id))
      .map(p => {
        const qty = ingredientQuantities[p.id];
        const qtyStr = qty ? ` (${qty.qty} ${qty.unit})` : '';
        return `${p.name} (${p.bn})${qtyStr}`;
      });

    const vegDetails = allVegetables
      .filter(v => selectedVegetables.includes(v.id))
      .map(v => {
        const qty = ingredientQuantities[v.id];
        const qtyStr = qty ? ` (${qty.qty} ${qty.unit})` : '';
        return `${v.name} (${v.bn})${qtyStr}`;
      });

    const activeSpices = allSpices
      .filter(s => spiceCabinet[s.id]?.active)
      .map(s => {
        const qty = ingredientQuantities[s.id];
        const qtyStr = qty ? ` (${qty.qty} ${qty.unit})` : '';
        const levelStr = s.hasSlider ? ` - Level: ${spiceCabinet[s.id].level}` : '';
        return `${s.name} (${s.bn})${qtyStr}${levelStr}`;
      });

    const runMockRecipes = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResult = getMockRecipes(
        allProteins.filter(p => selectedProteins.includes(p.id)),
        allVegetables.filter(v => selectedVegetables.includes(v.id)),
        allSpices.map(s => ({ 
          ...s, 
          active: !!spiceCabinet[s.id]?.active, 
          level: spiceCabinet[s.id]?.level || 'medium' 
        })),
        { diet, spiceLevel, mealType, timeLimit, lang, foodStyle }
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
    const systemPrompt = `You are "Chef Rannaghor", a legendary bilingual Bengali chef. Your goal is to suggest 2-3 delicious, authentic Bengali recipes based on the ingredients and preferences provided.
You must respond ONLY with a JSON object in this format. Do not write any markdown headers, tags, or extra chat. Use this JSON format:
{
  "recipes": [
    {
      "name_en": "Recipe name in English",
      "name_bn": "রেসিপির নাম বাংলায়",
      "description_en": "Appetizing description in English focusing on why it fits the ingredients and style.",
      "description_bn": "উপাদানের সমন্বয়ে এই পদটি কেন তৈরি করা হলো তার বর্ণনা বাংলায়।",
      "prep_time": "15 mins",
      "cook_time": "30 mins",
      "difficulty": "Easy/Medium/Hard",
      "serving_size": "2-3 servings",
      "calories": "e.g. 350 kcal",
      "protein": "e.g. 15g",
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
- Main Proteins: ${proteinDetails.join(', ') || 'None selected'}
- Vegetables (with quantities): ${vegDetails.join(', ') || 'None selected'}
- Spices & Pantry (with quantities): ${activeSpices.join(', ') || 'Only water/oil'}
- Extra custom items: ${customIngredients.join(', ') || 'None'}

Preferences:
- Diet Style: ${diet}
- Spice Level: ${spiceLevel}
- Meal Type: ${mealType}
- Maximum Cooking Time: ${timeLimit}
- Dish Style/Preference: ${foodStyle} (e.g. Simple, Rich, Junk/Street Food)

Suggest 2 to 3 Bengali recipes that match these. Optimize to use as many of my ingredients as possible, adhering closely to the quantities provided and the requested Dish Style. If some ingredients are missing but highly common or can be bought, list them in "ingredients_missing". Make sure the instructions are extremely easy to follow step-by-step and have authentic Bengali flavors. Return the calories and protein content for each recipe in the requested format.`;

    try {
      const headers = {
        "Content-Type": "application/json"
      };
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }

      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: headers,
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

    try {
      const headers = {
        "Content-Type": "application/json"
      };
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: headers,
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
    } finally {
      setChatLoading(false);
    }
  };

  // Helper to scale numeric values in ingredient amount strings
  const scaleAmount = (amountStr, scale) => {
    if (scale === 1 || !amountStr) return amountStr;

    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let workStr = amountStr.toString();
    for (let i = 0; i < 10; i++) {
      workStr = workStr.replaceAll(bnDigits[i], enDigits[i]);
    }

    const numRegex = /\d+(\.\d+)?/g;
    let resultStr = workStr.replace(numRegex, (match) => {
      const val = parseFloat(match);
      if (isNaN(val)) return match;
      const scaledVal = parseFloat((val * scale).toFixed(2));
      return scaledVal.toString();
    });

    if (lang === 'bn') {
      let bnStr = resultStr;
      for (let i = 0; i < 10; i++) {
        bnStr = bnStr.replaceAll(enDigits[i], bnDigits[i]);
      }
      return bnStr;
    }

    return resultStr;
  };

  // Helper to parse minutes/hours from instructions text to seconds
  const parseTimeLimit = (text) => {
    if (!text) return null;
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let cleanText = text.toString();
    for (let i = 0; i < 10; i++) {
      cleanText = cleanText.replaceAll(bnDigits[i], enDigits[i]);
    }

    const minMatch = cleanText.match(/(\d+)(?:\s*-\s*(\d+))?\s*(?:minutes|minute|mins|min|মিনিট)/i);
    if (minMatch) {
      const minutes = minMatch[2] ? parseInt(minMatch[2]) : parseInt(minMatch[1]);
      return minutes * 60;
    }

    const hourMatch = cleanText.match(/(\d+)(?:\s*-\s*(\d+))?\s*(?:hours|hour|ঘণ্টা|ঘণ্টা)/i);
    if (hourMatch) {
      const hours = hourMatch[2] ? parseInt(hourMatch[2]) : parseInt(hourMatch[1]);
      return hours * 3600;
    }

    return null;
  };

  // Synthesize sound notifications using Web Audio API
  const playNotificationSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn("AudioContext playback blocked or failed:", e);
    }
  };

  // Timer loop effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerActive && timerSeconds === 0) {
      setTimeout(() => {
        setTimerActive(false);
        setTimerSeconds(null);
        setToastMessage(lang === 'bn' ? "⏰ সময় শেষ! রান্না সম্পন্ন হয়েছে!" : "⏰ Timer complete! Cooking step done!");
      }, 0);
      
      playNotificationSound();
      
      if (window.speechSynthesis) {
        const ttsText = lang === 'bn' 
          ? "ধাপ সম্পন্ন হয়েছে! পরের ধাপে যান।" 
          : "Step complete! Move to next step.";
        const utterance = new SpeechSynthesisUtterance(ttsText);
        utterance.lang = lang === 'bn' ? 'bn-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds, lang]);

  const currentRecipeSteps = recipes && recipes[activeRecipeIndex] 
    ? (lang === 'bn' ? recipes[activeRecipeIndex].instructions_bn : recipes[activeRecipeIndex].instructions_en) 
    : [];

  const speakStep = (idx) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const stepText = currentRecipeSteps[idx];
    if (!stepText) return;
    
    const title = lang === 'bn' ? `ধাপ ${idx + 1}: ${stepText}` : `Step ${idx + 1}: ${stepText}`;
    const utterance = new SpeechSynthesisUtterance(title);
    utterance.lang = lang === 'bn' ? 'bn-IN' : 'en-US';
    
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.toLowerCase().includes(lang === 'bn' ? 'bn' : 'en'));
    if (targetVoice) utterance.voice = targetVoice;
    
    window.speechSynthesis.speak(utterance);
  };

  const initializeTimerForStep = (idx) => {
    const stepText = currentRecipeSteps[idx];
    const seconds = parseTimeLimit(stepText);
    setTimerActive(false);
    if (seconds) {
      setTimerSeconds(seconds);
    } else {
      setTimerSeconds(null);
    }
  };

  const handleFocusNext = () => {
    if (currentStepIndex < currentRecipeSteps.length - 1) {
      setCurrentStepIndex(prev => {
        const nextIdx = prev + 1;
        speakStep(nextIdx);
        initializeTimerForStep(nextIdx);
        return nextIdx;
      });
    }
  };

  const handleFocusPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => {
        const prevIdx = prev - 1;
        speakStep(prevIdx);
        initializeTimerForStep(prevIdx);
        return prevIdx;
      });
    }
  };

  const handleSpeakCurrentStep = () => {
    speakStep(currentStepIndex);
  };

  // Create refs for callback stability to avoid effect re-triggers and satisfy eslint rules
  const handleFocusNextRef = useRef(handleFocusNext);
  const handleFocusPrevRef = useRef(handleFocusPrev);
  const handleSpeakCurrentStepRef = useRef(handleSpeakCurrentStep);

  useEffect(() => {
    handleFocusNextRef.current = handleFocusNext;
    handleFocusPrevRef.current = handleFocusPrev;
    handleSpeakCurrentStepRef.current = handleSpeakCurrentStep;
  });

  // Speech Recognition Voice Assistant setup
  useEffect(() => {
    let recognition = null;
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (voiceCommandsActive && SpeechRecognitionClass && focusMode) {
      try {
        recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = lang === 'bn' ? 'bn-IN' : 'en-US';

        recognition.onresult = (event) => {
          const result = event.results[event.results.length - 1][0].transcript.toLowerCase();
          console.log("Voice Command Recognized:", result);

          if (result.includes('next') || result.includes('পরের') || result.includes('এগিয়ে')) {
            handleFocusNextRef.current();
          } else if (result.includes('back') || result.includes('prev') || result.includes('আগের') || result.includes('পেছনে')) {
             handleFocusPrevRef.current();
          } else if (result.includes('repeat') || result.includes('again') || result.includes('আবার') || result.includes('পুনরায়')) {
            handleSpeakCurrentStepRef.current();
          }
        };

        recognition.onerror = (e) => {
          console.error("Speech Recognition Error:", e);
          if (e.error === 'no-speech' || e.error === 'network') {
            try {
              recognition.stop();
            } catch (err) {
              console.warn("Recognition stop failed:", err);
            }
          }
        };

        recognition.onend = () => {
          if (voiceCommandsActive && focusMode) {
            try {
              recognition.start();
            } catch (err) {
              console.warn("Recognition restart failed:", err);
            }
          }
        };

        recognition.start();
      } catch (err) {
        console.error("Failed to start Speech Recognition:", err);
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          console.warn("Cleanup recognition stop failed:", e);
        }
      }
    };
  }, [voiceCommandsActive, focusMode, lang]);

  // Start Focus Mode
  const handleStartCooking = () => {
    if (currentRecipeSteps.length > 0) {
      setCurrentStepIndex(0);
      setFocusMode(true);
      initializeTimerForStep(0);
      speakStep(0);
    }
  };

  const handleExitFocusMode = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
    setTimerActive(false);
    setFocusMode(false);
  };

  // Smart Shopping List Handlers
  const handleToggleShoppingItem = (itemText) => {
    setCheckedMissingIngredients(prev => 
      prev.includes(itemText) ? prev.filter(x => x !== itemText) : [...prev, itemText]
    );
  };

  const getShoppingListText = () => {
    const currentRecipe = recipes[activeRecipeIndex];
    const missing = currentRecipe.ingredients_missing || [];
    
    const header = lang === 'bn'
      ? `🛒 *রান্নাঘর AI - বাজার করার তালিকা (${currentRecipe.name_bn}):*\n`
      : `🛒 *Rannaghor AI - Shopping List for ${currentRecipe.name_en}:*\n`;
      
    const listLines = missing.map(ing => {
      const isChecked = checkedMissingIngredients.includes(ing.name_en);
      const checkMark = isChecked ? ' [x] ' : ' [ ] ';
      const nameStr = lang === 'bn' ? ing.name_bn : ing.name_en;
      const amtScaled = scaleAmount(ing.amount, servingsScale);
      return `${checkMark}${nameStr}: ${amtScaled}`;
    }).join('\n');
    
    return `${header}${listLines}\n\n_তৈরি করেছেন রান্নাঘর AI সহকারী_`;
  };

  const handleCopyShoppingList = () => {
    const text = getShoppingListText();
    navigator.clipboard.writeText(text)
      .then(() => {
        setToastMessage(lang === 'bn' ? "📋 তালিকা ক্লিপবোর্ডে কপি করা হয়েছে!" : "📋 Shopping list copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy:", err);
      });
  };

  const handleShareWhatsApp = () => {
    const text = getShoppingListText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const filteredVegetables = [...VEGETABLES, ...addedVegetables].filter(v => 
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
              {[...PROTEINS, ...addedProteins].map(p => {
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

                    {isSelected && (
                      <div className="quantity-select-inline" onClick={e => e.stopPropagation()}>
                        <input 
                          type="number" 
                          min="0.1" 
                          step="any"
                          className="quantity-val-input" 
                          value={ingredientQuantities[p.id]?.qty || 500} 
                          onChange={e => handleQuantityChange(p.id, parseFloat(e.target.value) || 0)} 
                        />
                        <select 
                          className="quantity-unit-select"
                          value={ingredientQuantities[p.id]?.unit || 'g'}
                          onChange={e => handleUnitChange(p.id, e.target.value)}
                        >
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="pcs">pcs</option>
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Custom Protein addition */}
            <div className="category-custom-add" onClick={e => e.stopPropagation()}>
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  handleAddCustomItem('protein');
                }} 
                className="custom-add-row"
              >
                <input 
                  type="text" 
                  className="custom-add-input"
                  placeholder={lang === 'bn' ? "নতুন প্রোটিন যোগ করুন..." : "Add custom protein..."}
                  value={customInputs.protein || ''}
                  onChange={e => setCustomInputs(prev => ({ ...prev, protein: e.target.value }))}
                />
                <button type="submit" className="btn btn-primary custom-add-btn">
                  <Plus size={14} />
                </button>
              </form>
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

                    {isSelected && (
                      <div className="quantity-select-inline" onClick={e => e.stopPropagation()}>
                        <input 
                          type="number" 
                          min="0.1" 
                          step="any"
                          className="quantity-val-input" 
                          value={ingredientQuantities[v.id]?.qty || 500} 
                          onChange={e => handleQuantityChange(v.id, parseFloat(e.target.value) || 0)} 
                        />
                        <select 
                          className="quantity-unit-select"
                          value={ingredientQuantities[v.id]?.unit || 'g'}
                          onChange={e => handleUnitChange(v.id, e.target.value)}
                        >
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="pcs">pcs</option>
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom Vegetable addition */}
            <div className="category-custom-add" onClick={e => e.stopPropagation()}>
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  handleAddCustomItem('vegetable');
                }} 
                className="custom-add-row"
              >
                <input 
                  type="text" 
                  className="custom-add-input"
                  placeholder={lang === 'bn' ? "নতুন সবজি যোগ করুন..." : "Add custom vegetable..."}
                  value={customInputs.vegetable || ''}
                  onChange={e => setCustomInputs(prev => ({ ...prev, vegetable: e.target.value }))}
                />
                <button type="submit" className="btn btn-primary custom-add-btn">
                  <Plus size={14} />
                </button>
              </form>
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
              {[...SPICES, ...addedSpices].map(s => {
                const state = spiceCabinet[s.id] || { active: false, level: 'medium' };
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
                      {state.active && (
                        <div className="spice-qty-wrapper" onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                          <input 
                            type="number" 
                            min="0.1" 
                            step="any"
                            className="spice-qty-input" 
                            value={ingredientQuantities[s.id]?.qty || 2} 
                            onChange={e => handleQuantityChange(s.id, parseFloat(e.target.value) || 0)} 
                          />
                          <select 
                            className="spice-unit-select"
                            value={ingredientQuantities[s.id]?.unit || 'tbsp'}
                            onChange={e => handleUnitChange(s.id, e.target.value)}
                          >
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="tsp">tsp</option>
                            <option value="tbsp">tbsp</option>
                            <option value="cup">cup</option>
                            <option value="pcs">pcs</option>
                          </select>
                        </div>
                      )}

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

            {/* Custom Spice addition */}
            <div className="category-custom-add" onClick={e => e.stopPropagation()} style={{ marginTop: '1.25rem' }}>
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  handleAddCustomItem('spice');
                }} 
                className="custom-add-row"
              >
                <input 
                  type="text" 
                  className="custom-add-input"
                  placeholder={lang === 'bn' ? "নতুন মশলা/উপাদান..." : "Add custom pantry..."}
                  value={customInputs.spice || ''}
                  onChange={e => setCustomInputs(prev => ({ ...prev, spice: e.target.value }))}
                />
                <button type="submit" className="btn btn-primary custom-add-btn">
                  <Plus size={14} />
                </button>
              </form>
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

              {/* Dish Style / Food Style */}
              <div>
                <div className="pref-group-title">{t.foodStyle}</div>
                <div className="pref-options" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <button 
                    className={`pref-btn ${foodStyle === 'any' ? 'active' : ''}`}
                    onClick={() => setFoodStyle('any')}
                  >
                    {t.foodStyleAny}
                  </button>
                  <button 
                    className={`pref-btn ${foodStyle === 'simple' ? 'active' : ''}`}
                    onClick={() => setFoodStyle('simple')}
                  >
                    {t.foodStyleSimple}
                  </button>
                  <button 
                    className={`pref-btn ${foodStyle === 'rich' ? 'active' : ''}`}
                    onClick={() => setFoodStyle('rich')}
                  >
                    {t.foodStyleRich}
                  </button>
                  <button 
                    className={`pref-btn ${foodStyle === 'junk' ? 'active' : ''}`}
                    onClick={() => setFoodStyle('junk')}
                  >
                    {t.foodStyleJunk}
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
                  <span className="stat-badge servings-badge">
                    <Utensils size={14} />
                    {t.servings}: {scaleAmount(recipes[activeRecipeIndex].serving_size, servingsScale)}
                    <span className="servings-multiplier-controls" style={{ marginLeft: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                      <button 
                        className="servings-scale-btn" 
                        onClick={() => setServingsScale(s => Math.max(0.5, s - 0.5))}
                        style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', width: '20px', height: '20px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 'bold', fontSize: '0.8rem', padding: '0 2px' }}>{servingsScale}x</span>
                      <button 
                        className="servings-scale-btn" 
                        onClick={() => setServingsScale(s => Math.min(4, s + 0.5))}
                        style={{ border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', width: '20px', height: '20px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                      >
                        +
                      </button>
                    </span>
                  </span>
                  {recipes[activeRecipeIndex].calories && (
                    <span className="stat-badge calories-badge" style={{ backgroundColor: 'rgba(240, 147, 43, 0.1)', color: '#d35400', borderColor: 'rgba(240, 147, 43, 0.2)' }}>
                      <Flame size={14} />
                      {t.calories}: {recipes[activeRecipeIndex].calories}
                    </span>
                  )}
                  {recipes[activeRecipeIndex].protein && (
                    <span className="stat-badge protein-badge" style={{ backgroundColor: 'rgba(52, 152, 219, 0.1)', color: '#2980b9', borderColor: 'rgba(52, 152, 219, 0.2)' }}>
                      <Sparkles size={14} />
                      {t.protein}: {recipes[activeRecipeIndex].protein}
                    </span>
                  )}
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
                        <strong>{lang === 'bn' ? ing.name_bn : ing.name_en}</strong>: {scaleAmount(ing.amount, servingsScale)}
                      </span>
                    </li>
                  ))}
                </ul>

                {recipes[activeRecipeIndex].ingredients_missing && recipes[activeRecipeIndex].ingredients_missing.length > 0 && (
                  <>
                    <div className="pref-group-title" style={{ color: 'var(--primary)', marginTop: '1rem' }}>
                      {t.missingLabel}
                    </div>
                    <ul className="ingredients-checklist missing-checklist">
                      {recipes[activeRecipeIndex].ingredients_missing.map((ing, idx) => {
                        const isChecked = checkedMissingIngredients.includes(ing.name_en);
                        return (
                          <li 
                            key={idx} 
                            className={`checklist-item missing-item ${isChecked ? 'checked' : ''}`}
                            onClick={() => handleToggleShoppingItem(ing.name_en)}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isChecked ? 0.5 : 1 }}
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              readOnly
                              style={{ cursor: 'pointer' }}
                            />
                            <span>
                              <strong>{lang === 'bn' ? ing.name_bn : ing.name_en}</strong>: {scaleAmount(ing.amount, servingsScale)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    {/* Shopping List Actions */}
                    <div className="shopping-list-actions" style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary btn-sm" onClick={handleCopyShoppingList}>
                        {lang === 'bn' ? '📋 তালিকা কপি করুন' : '📋 Copy Shopping List'}
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={handleShareWhatsApp} style={{ backgroundColor: '#25D366', color: 'white', borderColor: '#25D366' }}>
                        {lang === 'bn' ? '💬 ওয়াটসঅ্যাপে পাঠান' : '💬 Share on WhatsApp'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Cooking Instructions Steps */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <h3 className={`recipe-section-title ${lang === 'bn' ? 'bengali-text' : ''}`} style={{ margin: 0, border: 'none', padding: 0 }}>
                  <Utensils size={16} />
                  {t.steps}
                </h3>
                <button 
                  className="btn btn-primary pulse-button" 
                  onClick={handleStartCooking}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Sparkles size={14} />
                  {lang === 'bn' ? 'রান্না শুরু করুন (গাইড)' : 'Start Cooking (Guide)'}
                </button>
              </div>
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

      {/* Step-by-step Focus Mode Modal */}
      {focusMode && currentRecipeSteps.length > 0 && (
        <div className="focus-mode-overlay">
          <div className="focus-container animate-fade">
            {/* Progress indicator */}
            <div className="focus-progress-wrapper">
              <div className="focus-progress-text">
                {lang === 'bn' 
                  ? `ধাপ ${currentStepIndex + 1} / ${currentRecipeSteps.length}` 
                  : `Step ${currentStepIndex + 1} of ${currentRecipeSteps.length}`}
              </div>
              <div className="focus-progress-bar">
                <div 
                  className="focus-progress-fill" 
                  style={{ width: `${((currentStepIndex + 1) / currentRecipeSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="focus-card">
              {/* Header inside Card */}
              <div className="focus-card-header">
                <div className="focus-recipe-name">
                  {lang === 'bn' ? recipes[activeRecipeIndex].name_bn : recipes[activeRecipeIndex].name_en}
                </div>
                <button className="focus-close-btn" onClick={handleExitFocusMode} title={lang === 'bn' ? 'বন্ধ করুন' : 'Exit Focus Mode'}>
                  <X size={24} />
                </button>
              </div>

              {/* Large Step Instruction */}
              <div className="focus-step-body">
                <div className="focus-step-number">{currentStepIndex + 1}</div>
                <p className="focus-step-text">
                  {currentRecipeSteps[currentStepIndex]}
                </p>
              </div>

              {/* Active Timer Section */}
              {timerSeconds !== null && (
                <div className="focus-timer-section">
                  <div className="focus-timer-display">
                    <Clock size={20} className="timer-clock-icon" />
                    <span>
                      {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="focus-timer-controls">
                    <button 
                      className={`btn btn-sm ${timerActive ? 'btn-secondary' : 'btn-primary'}`} 
                      onClick={() => setTimerActive(!timerActive)}
                    >
                      {timerActive ? <Pause size={14} /> : <Play size={14} />}
                      {timerActive ? (lang === 'bn' ? 'থামান' : 'Pause') : (lang === 'bn' ? 'চালু' : 'Start')}
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => {
                        const originalSecs = parseTimeLimit(currentRecipeSteps[currentStepIndex]);
                        setTimerSeconds(originalSecs);
                        setTimerActive(false);
                      }}
                    >
                      <RotateCcw size={14} />
                      {lang === 'bn' ? 'রিসেট' : 'Reset'}
                    </button>
                  </div>
                </div>
              )}

              {/* Voice and TTS control bar */}
              <div className="focus-assistant-bar">
                <button 
                  className={`btn btn-sm voice-toggle-btn ${voiceCommandsActive ? 'listening' : ''}`}
                  onClick={() => setVoiceCommandsActive(!voiceCommandsActive)}
                >
                  {voiceCommandsActive ? (
                    <>
                      <Mic size={16} className="mic-pulsing" />
                      <span>{lang === 'bn' ? "ভয়েস কমান্ড সক্রিয়" : "Voice Commands: ON"}</span>
                    </>
                  ) : (
                    <>
                      <MicOff size={16} />
                      <span>{lang === 'bn' ? "ভয়েস কমান্ড বন্ধ" : "Voice Commands: OFF"}</span>
                    </>
                  )}
                </button>

                {voiceCommandsActive && (
                  <span className="voice-guide-hint">
                    {lang === 'bn' ? "বলুন: 'পরের', 'আগের' বা 'আবার'" : "Speak: 'Next', 'Back', or 'Repeat'"}
                  </span>
                )}
              </div>

              {/* Bottom Nav Controls */}
              <div className="focus-navigation-controls">
                <button 
                  className="btn btn-secondary focus-nav-btn" 
                  onClick={handleFocusPrev}
                  disabled={currentStepIndex === 0}
                >
                  <ChevronLeft size={20} />
                  <span>{lang === 'bn' ? 'আগের' : 'Back'}</span>
                </button>

                <button 
                  className="btn btn-secondary focus-nav-btn" 
                  onClick={handleSpeakCurrentStep}
                  title={lang === 'bn' ? 'ধাপটি শুনুন' : 'Speak current step'}
                >
                  <Volume2 size={20} />
                  <span>{lang === 'bn' ? 'শুনুন' : 'Speak'}</span>
                </button>

                {currentStepIndex === currentRecipeSteps.length - 1 ? (
                  <button 
                    className="btn btn-primary focus-nav-btn finish-btn" 
                    onClick={handleExitFocusMode}
                  >
                    <Check size={20} />
                    <span>{lang === 'bn' ? 'সমাপ্ত' : 'Finish'}</span>
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary focus-nav-btn" 
                    onClick={handleFocusNext}
                  >
                    <span>{lang === 'bn' ? 'পরের' : 'Next'}</span>
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="global-toast-notification animate-slide-up">
          <div className="toast-content">
            <Check size={18} className="toast-icon" />
            <span className="toast-text">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '3rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-light)' }}>
        <p className="bengali-text"> রান্নাঘর সহায়িকা ২০২৬</p>
        <p style={{ marginTop: '0.25rem' }}>Powered by Groq</p>
      </footer>
    </div>
  );
}

export default App;
