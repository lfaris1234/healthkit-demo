export type Macro = { label: string; value: string };
export type Recipe = {
  id: string;                 // slug
  title: string;
  minutes: string;
  hero: string;               // image url
  summary: string;            // short blurb for list
  macros: Macro[];
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
};

export const RECIPES: Recipe[] = [
  {
    id: "lentil-soup",
    title: "Lentil Soup",
    minutes: "45 min",
    hero: "/images/lentil-soup.jpg",
    summary:
      "Fiber-rich lentils make a hearty soup that supports gut health—no soaking required.",
    macros: [
      { label: "Fiber", value: "32g" },
      { label: "Protein", value: "32g" },
      { label: "Carbs", value: "10g" },
      { label: "Fat", value: "8g" },
    ],
    leftTitle: "Ingredients",
    leftItems: [
      "1 cup red lentils",
      "1 small onion, chopped (or 1 tsp onion powder)",
      "2 garlic cloves, minced (or ½ tsp garlic powder)",
      "1 tsp cumin (or curry powder)",
      "1 veg bouillon cube (or 2 cups broth)",
      "1 can (14 oz) diced tomatoes",
      "3 cups water",
      "Salt & pepper to taste",
      "Splash of lemon juice (optional)",
    ],
    rightTitle: "Preparation",
    rightItems: [
      "Set a medium pot over medium heat.",
      "Add lentils, onion, garlic, cumin, bouillon, tomatoes, water.",
      "Bring to a gentle boil; simmer 10–12 min until soft.",
      "Season to taste; finish with lemon juice.",
    ],
  },
  {
    id: "chia-seeds",
    title: "Chia Seeds",
    minutes: "5 min",
    hero: "/images/chia-pudding.jpg",
    summary:
      "Tiny seeds with big fiber—great in puddings, smoothies, or as an egg substitute.",
    macros: [
      { label: "Fiber", value: "24g" },
      { label: "Protein", value: "12g" },
      { label: "Carbs", value: "10g" },
      { label: "Fat", value: "0g" },
    ],
    leftTitle: "How to Add Them to Your Diet",
    leftItems: [
      "Mix into smoothies or yogurt",
      "Sprinkle over salads or oatmeal",
      "Make chia pudding with dairy or plant milk",
      "Use as an egg substitute in baking",
    ],
    rightTitle: "Why They Help",
    rightItems: [
      "Packed with fiber to support smoother digestion and less bloating.",
      "The gel helps satiety, stabilizes blood sugar, and supports regularity.",
    ],
  },
];

export const getRecipes = () => RECIPES;
export const getRecipe = (id: string) => RECIPES.find(r => r.id === id);
