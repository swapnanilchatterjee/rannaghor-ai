import json
import os
import re
from typing import List, Dict, Any, Optional

# LangChain & AI imports with graceful fallbacks
try:
    from langchain_groq import ChatGroq
    LANGCHAIN_GROQ_AVAILABLE = True
except ImportError:
    LANGCHAIN_GROQ_AVAILABLE = False

try:
    from langchain.docstore.document import Document
    from langchain_community.vectorstores import Chroma
    from langchain_community.embeddings import HuggingFaceEmbeddings
    VECTOR_DB_AVAILABLE = True
except Exception as e:
    VECTOR_DB_AVAILABLE = False

class RecipeRAGEngine:
    def __init__(self, data_path: str = None):
        if data_path is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            data_path = os.path.join(base_dir, "data", "bengali_recipes.json")
        
        self.data_path = data_path
        self.recipes: List[Dict[str, Any]] = []
        self.vector_store = None
        self.load_recipes()
        self.init_vector_store()

    def load_recipes(self):
        """Loads authentic Bengali recipe dataset."""
        if os.path.exists(self.data_path):
            try:
                with open(self.data_path, "r", encoding="utf-8") as f:
                    self.recipes = json.load(f)
                print(f"[RAG Engine] Successfully loaded {len(self.recipes)} Bengali recipes.")
            except Exception as e:
                print(f"[RAG Engine] Error reading recipe database: {e}")
                self.recipes = []
        else:
            print(f"[RAG Engine] Recipe data file not found at {self.data_path}")

    def init_vector_store(self):
        """Initializes ChromaDB vector embeddings for Retrieval Augmented Generation."""
        if not self.recipes:
            return

        try:
            print("[RAG Engine] Building Vector Store embeddings...")
            documents = []
            for recipe in self.recipes:
                content = (
                    f"Recipe Name: {recipe['name_en']} ({recipe['name_bn']})\n"
                    f"Diet: {recipe['diet']} | Style: {recipe['style']}\n"
                    f"Ingredients: {', '.join(recipe['ingredients'])}\n"
                    f"Description: {recipe['description_en']} {recipe['description_bn']}\n"
                    f"Chef Tip: {recipe['chef_tip_en']} {recipe['chef_tip_bn']}\n"
                )
                doc = Document(
                    page_content=content,
                    metadata={
                        "id": recipe["id"],
                        "diet": recipe["diet"],
                        "name_en": recipe["name_en"],
                        "name_bn": recipe["name_bn"]
                    }
                )
                documents.append(doc)

            if VECTOR_DB_AVAILABLE:
                embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
                self.vector_store = Chroma.from_documents(
                    documents=documents,
                    embedding=embeddings
                )
                print("[RAG Engine] ChromaDB Vector Store successfully initialized with embeddings!")
            else:
                print("[RAG Engine] Vector DB modules unavailable. Falling back to keyword RAG retrieval.")
        except Exception as e:
            print(f"[RAG Engine] Vector store initialization warning: {e}. Using fallback memory search.")

    def retrieve_context(self, user_ingredients: List[str], diet_pref: str = "any", top_k: int = 3) -> List[Dict[str, Any]]:
        """Retrieves top matching recipes from Vector Store or rule retriever."""
        if not self.recipes:
            return []

        matched = []
        user_ing_lower = [i.lower() for i in user_ingredients]

        # 1. Vector Search if Chroma is active
        if self.vector_store:
            query = f"Bengali recipe with {', '.join(user_ingredients)} {diet_pref}"
            results = self.vector_store.similarity_search(query, k=top_k * 2)
            retrieved_ids = {doc.metadata["id"] for doc in results}
            for recipe in self.recipes:
                if recipe["id"] in retrieved_ids:
                    if diet_pref == "veg" and recipe["diet"] != "veg":
                        continue
                    matched.append(recipe)
        
        # 2. Fallback rule-based matching
        if len(matched) < top_k:
            for recipe in self.recipes:
                if recipe in matched:
                    continue
                if diet_pref == "veg" and recipe["diet"] != "veg":
                    continue
                
                # Check matching ingredients
                recipe_ings = [ing.lower() for ing in recipe["ingredients"]]
                overlap = sum(1 for ui in user_ing_lower if any(ui in ri for ri in recipe_ings))
                
                if overlap > 0 or diet_pref == "any" or not user_ingredients:
                    matched.append(recipe)

        return matched[:top_k]

    def generate_recipes(self, payload: Dict[str, Any], api_key: Optional[str] = None) -> List[Dict[str, Any]]:
        """Generates recipes using RAG context + Groq Llama 3 LLM (or fallback RAG format)."""
        proteins = payload.get("proteins", [])
        vegetables = payload.get("vegetables", [])
        spices = payload.get("spices", [])
        preferences = payload.get("preferences", {})

        diet = preferences.get("diet", "any")
        spice_level = preferences.get("spiceLevel", "medium")
        meal_type = preferences.get("mealType", "lunch")
        dish_style = preferences.get("foodStyle", "any")
        max_time = preferences.get("maxTime", "45m")

        all_ingredients = proteins + vegetables + spices
        
        # 1. RAG Context Retrieval Step
        rag_context_recipes = self.retrieve_context(all_ingredients, diet_pref=diet, top_k=3)
        context_str = json.dumps(rag_context_recipes, indent=2, ensure_ascii=False)

        # 2. If API Key is available, use Groq Llama 3 via LangChain/REST with RAG Context
        effective_api_key = api_key or os.environ.get("GROQ_API_KEY", "")

        if effective_api_key:
            try:
                import requests
                prompt_system = f"""You are Chef Rannaghor, an expert Bengali Culinary Master.
You MUST suggest 2 authentic Bengali recipes based on the available kitchen ingredients:
Proteins: {', '.join(proteins) if proteins else 'None'}
Vegetables: {', '.join(vegetables) if vegetables else 'None'}
Spices/Condiments: {', '.join(spices) if spices else 'Basic spices'}

User Preferences:
- Diet: {diet}
- Spice Level: {spice_level}
- Meal Type: {meal_type}
- Dish Style: {dish_style}
- Max Time: {max_time}

RAG Knowledge Context (Retrieved Authentic Recipes):
{context_str}

Respond ONLY with a JSON object in this exact schema:
{{
  "recipes": [
    {{
      "id": "recipe_id_string",
      "style": "{dish_style if dish_style != 'any' else 'simple'}",
      "diet": "{diet if diet != 'any' else 'veg'}",
      "calories": "300 kcal",
      "protein": "15g",
      "name_en": "English Recipe Name",
      "name_bn": "বাংলা রেসিপির নাম",
      "description_en": "Short description in English",
      "description_bn": "বাংলায় বিবরণ",
      "prep_time": "15 mins",
      "cook_time": "20 mins",
      "difficulty": "Easy",
      "serving_size": "2-3 servings",
      "ingredients_used": [
        {{"name_en": "Ingredient Name", "name_bn": "উপাদানের নাম", "amount": "quantity"}}
      ],
      "ingredients_missing": [
        {{"name_en": "Missing item", "name_bn": "অনুপস্থিত উপাদান", "amount": "quantity"}}
      ],
      "instructions_en": ["Step 1...", "Step 2..."],
      "instructions_bn": ["ধাপ ১...", "ধাপ ২..."],
      "chef_tip_en": "Pro chef tip in English",
      "chef_tip_bn": "শেফের সেরা বাংলা টিপস"
    }}
  ]
}}"""

                headers = {
                    "Authorization": f"Bearer {effective_api_key}",
                    "Content-Type": "application/json"
                }
                body = {
                    "model": "llama-3.3-70b-versatile",
                    "messages": [
                        {"role": "system", "content": prompt_system},
                        {"role": "user", "content": "Suggest recipes matching my pantry items based on your RAG knowledge base."}
                    ],
                    "response_format": {"type": "json_object"},
                    "temperature": 0.7
                }
                resp = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body, timeout=15)
                if resp.ok:
                    data = resp.json()
                    content = data["choices"][0]["message"]["content"]
                    parsed = json.loads(content)
                    if "recipes" in parsed and isinstance(parsed["recipes"], list):
                        return parsed["recipes"]
            except Exception as err:
                print(f"[RAG Engine] LLM generation warning: {err}. Returning retrieved RAG recipes.")

        # 3. Fallback to format RAG Context directly into UI structure
        formatted = []
        for r in rag_context_recipes:
            used = [{"name_en": ing, "name_bn": ing, "amount": "As needed"} for ing in r["ingredients"] if any(i.lower() in ing.lower() for i in all_ingredients)]
            missing = [{"name_en": ing, "name_bn": ing, "amount": "As per recipe"} for ing in r["ingredients"] if not any(i.lower() in ing.lower() for i in all_ingredients)]
            
            formatted.append({
                "id": r["id"],
                "style": r["style"],
                "diet": r["diet"],
                "calories": r.get("calories", "300 kcal"),
                "protein": r.get("protein", "12g"),
                "name_en": r["name_en"],
                "name_bn": r["name_bn"],
                "description_en": r["description_en"],
                "description_bn": r["description_bn"],
                "prep_time": r["prep_time"],
                "cook_time": r["cook_time"],
                "difficulty": r["difficulty"],
                "serving_size": r["serving_size"],
                "ingredients_used": used if used else [{"name_en": r["ingredients"][0], "name_bn": r["ingredients"][0], "amount": "1 portion"}],
                "ingredients_missing": missing[:3],
                "instructions_en": r["instructions_en"],
                "instructions_bn": r["instructions_bn"],
                "chef_tip_en": r["chef_tip_en"],
                "chef_tip_bn": r["chef_tip_bn"]
            })

        return formatted

    def chat_response(self, messages: List[Dict[str, str]], api_key: Optional[str] = None) -> str:
        """Answers culinary questions using RAG contextual knowledge."""
        effective_api_key = api_key or os.environ.get("GROQ_API_KEY", "")
        last_query = messages[-1]["content"] if messages else "How do I cook Bengali food?"

        # Retrieve RAG context
        docs = self.retrieve_context([last_query], top_k=2)
        context_text = "\n".join([f"- {d['name_en']} ({d['name_bn']}): {d['description_en']}" for d in docs])

        if effective_api_key:
            try:
                import requests
                system_prompt = f"""You are Chef Rannaghor, a friendly master Bengali home cook.
Answer culinary questions warmly and concisely in Bengali or English based on the user's input language.
Use this Bengali culinary knowledge when relevant:
{context_text}"""

                full_messages = [{"role": "system", "content": system_prompt}] + messages
                headers = {
                    "Authorization": f"Bearer {effective_api_key}",
                    "Content-Type": "application/json"
                }
                body = {
                    "model": "llama-3.3-70b-versatile",
                    "messages": full_messages,
                    "temperature": 0.7
                }
                resp = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body, timeout=12)
                if resp.ok:
                    data = resp.json()
                    return data["choices"][0]["message"]["content"]
            except Exception as err:
                print(f"[RAG Engine] Chat LLM error: {err}")

        # Fallback RAG response
        if docs:
            return f"নমস্কার! (Chef Rannaghor): For cooking tips on '{last_query}', consider authentic recipes like {docs[0]['name_bn']} ({docs[0]['name_en']}). {docs[0]['chef_tip_bn']}"
        return "নমস্কার! (Chef Rannaghor): To make your Bengali dishes delicious, always roast your spices (কষানো) on slow heat with mustard oil!"
