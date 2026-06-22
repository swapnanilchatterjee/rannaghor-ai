export const getMockRecipes = (proteins, veggies, spices, preferences) => {
  const isBilingual = true;
  const lang = preferences.lang || 'en';

  const recipes = [];

  // Helper check
  const hasVeg = (id) => veggies.some(v => v.id === id);
  const hasProt = (id) => proteins.some(p => p.id === id);
  const hasSpice = (id) => spices.some(s => s.id === id && s.active);

  // Recipe 1: Alu Posto (If potato and posto are selected, or default veg)
  if ((hasVeg('potato') && hasProt('posto')) || (preferences.diet === 'veg' && hasVeg('potato'))) {
    recipes.push({
      name_en: "Classic Bengali Alu Posto",
      name_bn: "ঐতিহ্যবাহী আলু পোস্ত",
      description_en: "A comforting and iconic Bengali dish made of potatoes cooked in a rich, nutty poppy seed paste.",
      description_bn: "পোস্ত বাটার ঘন গ্রেভিতে রান্না করা আলুর একটি অত্যন্ত জনপ্রিয় বাঙ্গালী তরকারি।",
      prep_time: "15 mins",
      cook_time: "20 mins",
      difficulty: "Easy",
      serving_size: "3 servings",
      ingredients_used: [
        { name_en: "Potatoes", name_bn: "আলু", amount: "4 large, diced into cubes" },
        { name_en: "Poppy Seeds (Posto)", name_bn: "পোস্ত দানা", amount: "4 tbsp, ground to paste" },
        { name_en: "Mustard Oil", name_bn: "সর্ষের তেল", amount: "3 tbsp" },
        { name_en: "Green Chillies", name_bn: "কাঁচা লঙ্কা", amount: "4, slit" },
        { name_en: "Salt", name_bn: "লবণ", amount: "1 tsp" }
      ],
      ingredients_missing: [
        { name_en: "Kalojire (Nigella seeds)", name_bn: "কালোজিরে", amount: "1/2 tsp for tempering" }
      ],
      instructions_en: [
        "Soak poppy seeds in warm water for 2 hours, then grind to a smooth paste with 1 green chilli and a splash of water.",
        "Heat mustard oil in a pan until it smokes, then add nigella seeds if available and slit green chillies.",
        "Add cubed potatoes and fry on medium heat for 5 minutes until lightly golden.",
        "Add salt, turmeric powder (optional), and 1 cup of water. Cover and cook until potatoes are tender.",
        "Stir in the poppy seed paste and cook on low heat for another 3-4 minutes until the water evaporates and forms a coating on the potatoes.",
        "Drizzle a teaspoon of raw mustard oil on top, cover, and let it rest for 2 minutes before serving."
      ],
      instructions_bn: [
        "পোস্ত দানা গরম জলে ২ ঘণ্টা ভিজিয়ে রাখুন, তারপর ১টি কাঁচা লঙ্কা ও সামান্য জল দিয়ে মসৃণ পেস্ট তৈরি করুন।",
        "কড়াইতে সর্ষের তেল ধোঁয়া ওঠা পর্যন্ত গরম করুন, তারপর কালোজিরে ও চেরা কাঁচা লঙ্কা ফোড়ন দিন।",
        "আলুর টুকরো যোগ করে মাঝারি আঁচে ৫ মিনিট হালকা সোনালী করে ভাজুন।",
        "লবণ, সামান্য হলুদ (ইচ্ছানুযায়ী) এবং ১ কাপ জল দিন। ঢাকা দিয়ে রান্না করুন যতক্ষণ না আলু নরম হচ্ছে।",
        "আলু সেদ্ধ হলে পোস্ত বাটা দিয়ে কম আঁচে ৩-৪ মিনিট রান্না করুন যতক্ষণ না জল শুকিয়ে পোস্ত আলুর সাথে লেগে যাচ্ছে।",
        "ওপর থেকে এক চা চামচ কাঁচা সর্ষের তেল ছড়িয়ে দিন, ঢাকা দিয়ে ২ মিনিট রেখে নামিয়ে নিন।"
      ],
      chef_tip_en: "Best paired with hot steamed rice and Biulir Dal (urad dal).",
      chef_tip_bn: "গরম গরম ভাত এবং বিউলির ডালের সাথে পরিবেশন করুন।"
    });
  }

  // Recipe 2: Bengali Fish Curry (Machher Jhol)
  if (hasProt('fish') && preferences.diet === 'non-veg') {
    recipes.push({
      name_en: "Shorshe Maach (Mustard Fish Curry)",
      name_bn: "সর্ষে ইলিশ / সর্ষে পোনা",
      description_en: "Rich and pungent mustard-based fish curry that is a cornerstone of Bengali cuisine.",
      description_bn: "সর্ষে বাটা ও কাঁচা লঙ্কার ঝাঁঝালো স্বাদের ঐতিহ্যবাহী বাঙ্গালী মাছের ঝোল।",
      prep_time: "10 mins",
      cook_time: "15 mins",
      difficulty: "Medium",
      serving_size: "2 servings",
      ingredients_used: [
        { name_en: "Fish steaks", name_bn: "মাছ (রুই/ইলিশ/কাতলা)", amount: "4 pieces" },
        { name_en: "Mustard paste", name_bn: "সর্ষে বাটা", amount: "3 tbsp" },
        { name_en: "Mustard oil", name_bn: "সর্ষের তেল", amount: "4 tbsp" },
        { name_en: "Turmeric powder", name_bn: "হলুদ গুঁড়ো", amount: "1.5 tsp" },
        { name_en: "Green chillies", name_bn: "কাঁচা লঙ্কা", amount: "5, slit" },
        { name_en: "Salt", name_bn: "লবণ", amount: "1 tsp" }
      ],
      ingredients_missing: [],
      instructions_en: [
        "Marinate the fish steaks with 1 tsp turmeric powder and 1 tsp salt for 10 minutes.",
        "Mix the mustard paste with a pinch of salt, turmeric, and 4 tbsp of water to prevent bitterness.",
        "Heat 3 tbsp mustard oil in a pan. If using Rui/Katla, fry the fish lightly on both sides and keep aside. If using Hilsa (Ilish), it can be cooked raw directly in the gravy.",
        "In the remaining oil, add nigella seeds (if available) and 2 slit green chillies.",
        "Pour in the mustard mixture, add salt, and bring to a gentle boil.",
        "Add the fish pieces and remaining green chillies. Cover and simmer on low heat for 8-10 minutes.",
        "Finish with a drizzle of raw mustard oil for that authentic pungent flavor."
      ],
      instructions_bn: [
        "মাছের টুকরোগুলো ১ চামচ হলুদ ও ১ চামচ লবণ দিয়ে মাখিয়ে ১০ মিনিট রাখুন।",
        "সর্ষে বাটার সাথে এক চিমটি লবণ, হলুদ ও ৪ চামচ জল মিশিয়ে রাখুন (এতে সর্ষে তেতো হবে না)।",
        "কড়াইতে ৩ চামচ সর্ষের তেল গরম করুন। রুই/কাতলা হলে মাছ হালকা ভেজে তুলে রাখুন। ইলিশ হলে সরাসরি ঝোলে রান্না করা যায়।",
        "বাকি তেলে কালোজিরে এবং ২টি চেরা কাঁচা লঙ্কা ফোড়ন দিন।",
        "মিশিয়ে রাখা সর্ষের জল কড়াইতে দিন এবং ফুটিয়ে নিন।",
        "মাছের টুকরো ও বাকি চেরা কাঁচা লঙ্কা দিন। ঢাকা দিয়ে কম আঁচে ৮-১০ মিনিট রান্না হতে দিন।",
        "নামানোর আগে ওপর থেকে ১ চামচ কাঁচা সর্ষের তেল ছড়িয়ে দিন আসল ঝাঁঝের জন্য।"
      ],
      chef_tip_en: "Frying Hilsa fish ruins its soft texture; cook Hilsa directly in the mustard gravy for the best flavor.",
      chef_tip_bn: "ইলিশ মাছ কড়া করে ভাজলে তার স্বাদ কমে যায়; সর্ষের ঝোলে সরাসরি কাঁচা ইলিশ রান্না করলে সবচেয়ে ভালো স্বাদ পাওয়া যায়।"
    });
  }

  // Recipe 3: Dim Kosha (Egg Curry)
  if (hasProt('egg') && recipes.length < 3) {
    recipes.push({
      name_en: "Spicy Bengali Dim Kosha",
      name_bn: "ডিম কষা",
      description_en: "Boiled eggs coated in a rich, spicy, and caramelised onion-tomato masala sauce.",
      description_bn: "পেঁয়াজ, রসুন ও টমেটোর মশলাদার গ্রেভিতে মাখামাখি সেদ্ধ ডিমের কষা তরকারি।",
      prep_time: "10 mins",
      cook_time: "20 mins",
      difficulty: "Easy",
      serving_size: "2 servings",
      ingredients_used: [
        { name_en: "Eggs", name_bn: "ডিম", amount: "4, boiled and peeled" },
        { name_en: "Onion", name_bn: "পেঁয়াজ", amount: "2 large, finely chopped" },
        { name_en: "Potato", name_bn: "আলু", amount: "1, cut in half" },
        { name_en: "Ginger-Garlic paste", name_bn: "আদা-রসুন বাটা", amount: "1 tbsp" },
        { name_en: "Tomato", name_bn: "টমেটো", amount: "1 medium, chopped" },
        { name_en: "Turmeric, Chilli & Cumin powder", name_bn: "হলুদ, লঙ্কা ও জিরে গুঁড়ো", amount: "1 tsp each" },
        { name_en: "Mustard oil", name_bn: "সর্ষের তেল", amount: "3 tbsp" }
      ],
      ingredients_missing: [],
      instructions_en: [
        "Make light slits on the boiled eggs. Rub them with a pinch of turmeric and salt.",
        "Heat mustard oil in a pan, fry the eggs and potatoes until golden brown, and remove.",
        "In the same oil, add sugar (helps caramelization) and chopped onions. Fry until deep golden brown.",
        "Add ginger-garlic paste and chopped tomato. Sauté until the tomato turns mushy.",
        "Add turmeric, red chilli powder, cumin powder, and salt. Fry (koshano) on medium heat, sprinkling water if spices stick, until oil separates.",
        "Add the fried potatoes and 1 cup of warm water. Simmer covered until potatoes are fully cooked.",
        "Add the eggs and cook until the gravy thickens. Sprinkle garam masala on top."
      ],
      instructions_bn: [
        "সেদ্ধ ডিমের গায়ে হালকা করে চিড় কেটে নিন। ডিম ও আলুর গায়ে সামান্য হলুদ ও লবণ মাখিয়ে রাখুন।",
        "কড়াইতে সর্ষের তেল গরম করে ডিম ও আলু সোনালী করে ভেজে তুলে নিন।",
        "একই তেলে সামান্য চিনি (রঙের জন্য) ও কুচানো পেঁয়াজ দিয়ে লালচে করে ভাজুন।",
        "আদা-রসুন বাটা ও কুচানো টমেটো দিন। টমেটো নরম হওয়া পর্যন্ত কষান।",
        "হলুদ, লঙ্কা ও জিরে গুঁড়ো ও লবণ দিন। সামান্য জলের ছিটে দিয়ে মশলা ভালো করে কষান (তেল ছাড়া পর্যন্ত)।",
        "ভাজা আলু ও ১ কাপ গরম জল দিন। ঢাকা দিয়ে আলু সেদ্ধ হওয়া পর্যন্ত ফোটান।",
        "সেদ্ধ আলু হয়ে এলে ভাজা ডিম দিন এবং ঝোল মাখামাখি হওয়া পর্যন্ত রান্না করুন। ওপর থেকে গরম মশলা ছড়িয়ে নামান।"
      ],
      chef_tip_en: "A pinch of sugar added to the hot oil caramelizes and gives the Dim Kosha its beautiful red color.",
      chef_tip_bn: "গরম তেলে এক চিমটি চিনি দিলে ডিম কষার রঙ খুব সুন্দর লালচে হয়।"
    });
  }

  // Recipe 4: Begun Bhaja (If eggplant is selected)
  if (hasVeg('begun') && recipes.length < 3) {
    recipes.push({
      name_en: "Bengali Begun Bhaja (Fried Eggplant)",
      name_bn: "বেগুন ভাজা",
      description_en: "Thick round slices of eggplant marinated in salt and turmeric, fried to crispy golden perfection.",
      description_bn: "হলুদ ও লবণ মেখে সর্ষের তেলে ভাজা বেগুন, যা ডাল-ভাতের সাথে অতুলনীয় স্বাদ দেয়।",
      prep_time: "5 mins",
      cook_time: "10 mins",
      difficulty: "Easy",
      serving_size: "2 servings",
      ingredients_used: [
        { name_en: "Eggplant (Begun)", name_bn: "বেগুন", amount: "1 large, sliced into rounds" },
        { name_en: "Turmeric powder", name_bn: "হলুদ গুঁড়ো", amount: "1 tsp" },
        { name_en: "Chilli powder", name_bn: "লঙ্কা গুঁড়ো", amount: "1/2 tsp" },
        { name_en: "Salt", name_bn: "লবণ", amount: "1.5 tsp" },
        { name_en: "Mustard oil", name_bn: "সর্ষের তেল", amount: "3 tbsp for shallow frying" }
      ],
      ingredients_missing: [],
      instructions_en: [
        "Cut the eggplant into 1-inch thick circular discs.",
        "In a bowl, mix turmeric powder, chilli powder, salt, and a pinch of sugar. Rub this mixture evenly on both sides of the eggplant slices.",
        "Let the eggplant marinate for 10 minutes. The salt will release moisture.",
        "Heat mustard oil in a flat skillet. Slide the marinated eggplant slices in.",
        "Fry on medium-low heat for 4-5 minutes on one side until soft and caramelized brown.",
        "Flip and fry the other side. Serve hot."
      ],
      instructions_bn: [
        "বেগুন ১ ইঞ্চি পুরু গোল গোল চাকা করে কেটে নিন।",
        "একটি পাত্রে হলুদ গুঁড়ো, লঙ্কা গুঁড়ো, লবণ ও সামান্য চিনি মিশিয়ে বেগুন চাকার গায়ে ভালো করে মাখিয়ে নিন।",
        "মাখানো বেগুন ১০ মিনিট রেখে দিন যাতে মশলা ভালোভাবে ঢোকে।",
        "চাটু বা ফ্রাইপ্যানে সর্ষের তেল গরম করে বেগুনের টুকরোগুলো ছাড়ুন।",
        "মাঝারি-কম আঁচে এক পিঠ ৪-৫ মিনিট লালচে ও নরম হওয়া পর্যন্ত ভাজুন।",
        "উল্টে দিয়ে অন্য পিঠ একইভাবে ভাজুন। গরম গরম পরিবেশন করুন।"
      ],
      chef_tip_en: "Dusting a tiny bit of wheat flour (atta/maida) or rice flour on the eggplant slices before frying makes them extra crispy and absorb less oil.",
      chef_tip_bn: "ভাজার ঠিক আগে বেগুন চাকার ওপরে সামান্য ময়দা বা চালের গুঁড়ো ছড়িয়ে দিলে বেগুন কম তেল টানে এবং মুচমুচে হয়।"
    });
  }

  // Recipe 5: Generic Pataler Dalna (Pointed Gourd curry) or Alur Dom
  if (recipes.length === 0) {
    recipes.push({
      name_en: "Niramish Alur Dom (Bengali Potato Curry)",
      name_bn: "নিরামিষ আলুর দম",
      description_en: "A delicious no-onion, no-garlic potato curry simmered in a spiced tomato and ginger gravy.",
      description_bn: "পেঁয়াজ-রসুন ছাড়া টমেটো, আদা এবং গরম মশলার সুস্বাদু নিরামিষ আলুর দম যা লুচি বা পরোটার সাথে দারুণ জমে।",
      prep_time: "10 mins",
      cook_time: "20 mins",
      difficulty: "Easy",
      serving_size: "3 servings",
      ingredients_used: [
        { name_en: "Potatoes", name_bn: "আলু", amount: "500g, boiled and peeled" },
        { name_en: "Tomato", name_bn: "টমেটো", amount: "1 large, pureed" },
        { name_en: "Ginger paste", name_bn: "আদা বাটা", amount: "1 tsp" },
        { name_en: "Cumin & Coriander powder", name_bn: "জিরে ও ধনে গুঁড়ো", amount: "1 tsp each" },
        { name_en: "Mustard oil & Ghee", name_bn: "সর্ষের তেল ও ঘি", amount: "2 tbsp oil, 1 tsp ghee" }
      ],
      ingredients_missing: [
        { name_en: "Garam Masala", name_bn: "গরম মশলা গুঁড়ো", amount: "1/2 tsp" }
      ],
      instructions_en: [
        "Poke the boiled potatoes with a fork and fry them lightly in mustard oil with a pinch of turmeric and salt. Keep aside.",
        "In the same oil, add cumin seeds and bay leaf for tempering.",
        "Add ginger paste and sauté for 1 minute. Add tomato puree and cook until oil separates.",
        "Mix cumin powder, coriander powder, turmeric powder, and chilli powder with a little water and add to the pan. Sauté the spices (koshano) well.",
        "Add the potatoes and toss them in the spices. Pour 1.5 cups of warm water.",
        "Simmer covered for 8-10 minutes until the gravy thickens.",
        "Stir in ghee and garam masala. Serve hot."
      ],
      instructions_bn: [
        "সেদ্ধ আলুর গায়ে কাঁটাচামচ দিয়ে ছিদ্র করে নিন। তেল সামান্য হলুদ-লবণ দিয়ে হালকা ভেজে তুলে রাখুন।",
        "ওই তেলেই গোটা জিরে ও তেজপাতা ফোড়ন দিন।",
        "আদা বাটা দিয়ে ১ মিনিট নেড়ে টমেটো পিউরি দিন। তেল আলাদা হওয়া পর্যন্ত কষান।",
        "জিরে গুঁড়ো, ধনে গুঁড়ো, হলুদ গুঁড়ো ও লঙ্কা গুঁড়ো সামান্য জলে গুলে কড়াইতে ঢেলে দিন ও কষান।",
        "ভাজা আলু মশলায় দিয়ে ভালো করে মিশিয়ে নিন। দেড় কাপ গরম জল দিন।",
        "ঢাকা দিয়ে ৮-১০ মিনিট কম আঁচে ফোটান যতক্ষণ না ঝোল মাখোমাখো হচ্ছে।",
        "নামানোর আগে ঘি ও গরম মশলা ছড়িয়ে দিন। গরম গরম পরিবেশন করুন।"
      ],
      chef_tip_en: "Poking the potatoes allows the flavors and spices to sink right to the core of the potatoes.",
      chef_tip_bn: "আলুর গায়ে কাঁটাচামচ দিয়ে ছিদ্র করে দিলে আলুর একদম ভেতরে নুন-মশলা ঢুকতে পারে।"
    });
  }

  return { recipes };
};
