# Agent Instructions: Static Website Project

## 1. Project Overview
- **Project Name:** Genshin Cuisine
- **Category:** Fan-Made Recipe Book (non-commercial)
- **Description:** An interactive recipe book that turns the dishes of Teyvat into real meals you can cook at home. Each recipe adapts an in-game dish into a real-world version, translating fantasy ingredients into ingredients found in an ordinary kitchen or grocery store.
- **Primary Goal:** Let fans browse, search, and actually cook Genshin Impact dishes, with clear step-by-step recipes, an adjustable serving size, and a cooking flow that is easy to follow on a phone propped up in the kitchen.

## 2. How Fictional Dishes Become Real Recipes
Every recipe follows the same adaptation model, so a dish with fantasy ingredients still produces a recipe that can actually be cooked:

1. **Real-world inspiration:** Most Teyvat dishes are based on a real dish (for example, Tricolor Dango is based on Japanese hanami dango). Each recipe names the real dish it is built on.
2. **Ingredient translation:** Each recipe includes a "Teyvat → Kitchen" table that maps every in-game ingredient to a real substitute and explains why (for example, Sweet Flower → honey, because the in-game flower is used as a sweetener; Jueyun Chili → dried Sichuan chilies).
3. **Faithfulness label:** Each recipe carries one of three labels:
   - **Faithful:** the in-game dish closely matches a real dish.
   - **Adapted:** the in-game dish has a clear real base, but some ingredients or methods are substituted.
   - **Reimagined:** the in-game dish has no real counterpart (for example, dishes using Starshroom, Slime Condensate, or other purely fantasy ingredients), so the recipe is a creative interpretation that captures its look, color, and flavor described in-game.
4. **Accuracy rule:** In-game ingredient names and region assignments must come from the Genshin Impact Wiki (https://genshin-impact.fandom.com/wiki/Food/List and each dish's own page). Never invent in-game ingredients or lore. Real-world quantities, times, and temperatures must be realistic, food-safe, and tested-sounding, not guessed placeholders (for example, chicken must reach 74°C / 165°F internally).

## 3. Technical Stack & Constraints
- **Core Stack:** Plain HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Zero External Dependencies:** Do NOT use external build tools, package managers (npm/yarn), or third-party CSS/JS frameworks (no Tailwind CDN, Bootstrap, React, or jQuery).
- **Font & Icon Constraints:** Use the Google Font **Rubik** via a `<link>` tag. Use inline SVGs or local SVG files in `assets/svg/` for all UI icons. Dish images come from `assets/icons/`.
- **Paths:** All internal links, stylesheets, scripts, and asset references must use **relative paths** (e.g., `./assets/icons/sweet-madame.png`, `./style.css`, `./script.js`) to ensure compatibility with GitHub Pages subdirectory hosting.
- **Works without a server:** The site must work both on GitHub Pages and when `index.html` is opened directly from disk. Therefore, recipe data lives in `recipes.js` as a classic script (not a fetched JSON file and not an ES module, both of which are blocked on `file://`).
- **Routing:** Use hash-based routing (`#/`, `#/recipe/sweet-madame`) so recipe pages are shareable links and work on GitHub Pages without server configuration.

## 4. Directory Layout
```text
genshin-cuisine/
├── AGENTS.md
├── index.html
├── style.css
├── script.js
├── recipes.js
└── assets/
    ├── icons/          # dish icons, named <slug>.png (e.g. sweet-madame.png)
    │   ├── adeptus-temptation.png
    │   ├── fonta.png
    │   ├── sweet-madame.png
    │   ├── tandoori-roast-chicken.png
    │   ├── tatacos.png
    │   └── tricolor-dango.png
    └── svg/            # UI icons (search, heart, timer, print, menu, etc.)
```
- The `assets/icons/` folder may contain icons for every dish in the game. Only dishes that have an entry in `recipes.js` are shown; adding a recipe must never require editing HTML or JavaScript logic.
- Icon filenames follow the slug rule: lowercase, accents removed, quotes and apostrophes removed, every other non-alphanumeric run replaced with a single hyphen (`"Pile 'Em Up"` → `pile-em-up`). The recipe's `id` must equal its icon slug.

## 5. Recipe Data Schema (`recipes.js`)
`recipes.js` defines exactly one global, a frozen array named `GENSHIN_RECIPES`. Each entry uses this shape:

```js
{
  id: "sweet-madame",                       // must match the icon filename
  name: "Sweet Madame",
  region: "Mondstadt",                      // Mondstadt | Liyue | Inazuma | Sumeru | Fontaine | Natlan | Snezhnaya
  rarity: 2,                                // in-game star rating, 1–5
  gameCategory: "Recovery Dishes",          // in-game type, shown as a flavor tag
  faithfulness: "Adapted",                  // Faithful | Adapted | Reimagined
  inspiration: "Honey-roasted chicken",     // real-world dish it is based on
  description: "One or two sentences on what the dish is like.",
  difficulty: "Easy",                       // Easy | Medium | Hard (real cooking difficulty)
  prepMinutes: 15,
  cookMinutes: 60,
  servings: 4,                              // base servings; quantities below are for this amount
  dietary: ["gluten-free"],                 // e.g. vegetarian, vegan, gluten-free, dairy-free
  allergens: [],                            // e.g. shellfish, dairy, egg, soy, nuts, gluten
  ingredientSwaps: [
    { teyvat: "Fowl", kitchen: "Whole chicken", note: "The in-game poultry is a direct match." },
    { teyvat: "Sweet Flower", kitchen: "Honey", note: "Sweet Flower is Teyvat's sweetener." }
  ],
  ingredients: [
    { amount: 1.5, unit: "kg", item: "whole chicken" },
    { amount: 3, unit: "tbsp", item: "honey" }
  ],
  steps: [
    { text: "Full instruction for this step.", timerMinutes: 0 }   // timerMinutes > 0 shows a timer button
  ],
  tips: ["Optional serving or storage tips."]
}
```

## 6. UI/UX & Design Guidelines
- **Color Palette (Liyue Region Ambiance):**
  - **Primary:** `#5C1D17` (Deep Vermillion / Liyue Architecture Red)
  - **Accent / CTA:** `#D49B41` (Cor Lapis Gold / Geo Ambiance)
  - **Secondary Accent:** `#2E4A3F` (Jade Green / Wanmin Restaurant Accents)
  - **Background:** `#FAF6EE` (Silk Flower Off-white)
  - **Text:** `#2B251F` (High-contrast ink brown)
  - **Region tag colors:** define one muted color variable per region (e.g. `--region-mondstadt`, `--region-inazuma`) for small badges only; the Liyue palette stays the site's main identity. All tag text must meet WCAG AA contrast.
- **Typography:** **Rubik**, sans-serif. Recipe steps and ingredients use a comfortable reading size (at least 1.0625rem on mobile) with generous line height, since people read them while cooking.
- **Layout Approach:** Mobile-first design using CSS Flexbox and CSS Grid.
- **Responsiveness:** Fluid breakpoints (Mobile: < 640px, Tablet: 640px – 1024px, Desktop: > 1024px). On desktop, the recipe page shows ingredients in a sticky side column next to the steps.
- **Print:** Include a print stylesheet (`@media print`) that prints a single recipe cleanly: no navigation, no buttons, black text on white, ingredients and steps only.

## 7. Required Sections
- **Header / Navbar:** Brand logo ("Genshin Cuisine"), links to Home, All Recipes, Favorites, and About, a search field, and a functional mobile hamburger menu toggle.
- **Hero Section:** Headline "Cook the Flavors of Teyvat," a short summary explaining that these are real recipes adapted from in-game dishes, and a prominent "Browse Recipes" CTA button that scrolls to the recipe grid.
- **Recipe Browser (home view):**
  - A grid of recipe cards. Each card shows the dish icon, name, region badge, in-game star rarity, faithfulness label, real difficulty, and total time.
  - Starter recipes (one entry each in `recipes.js`, with full ingredients and steps):
    1. **Sweet Madame (Mondstadt):** honey-roasted chicken.
    2. **Adeptus' Temptation (Liyue):** a rich, slow-simmered seafood and meat soup in the style of Buddha Jumps Over the Wall.
    3. **Tricolor Dango (Inazuma):** three-color skewered rice dumplings based on hanami dango.
    4. **Matsutake Meat Rolls (Liyue):** mushrooms wrapped in thin slices of beef and seared.
    5. **Mint Jelly (Mondstadt):** a chilled mint dessert jelly with light citrus.
- **Recipe Detail View (`#/recipe/<id>`):** Large icon, name, region, rarity, faithfulness label with a one-line explanation, real-world inspiration, prep/cook time, difficulty, dietary and allergen tags, the "Teyvat → Kitchen" swap table, the ingredient list, numbered steps, and tips. Include a "Back to recipes" link.
- **Interactive Features:**
  - **Filters and search:** region filter toggle (All plus each region that has recipes), difficulty filter, dietary filter, and live text search across name, inspiration, and ingredients. Filters combine, and the result count updates live. Show a friendly empty state when nothing matches.
  - **Servings scaler:** on the recipe page, +/- controls rescale every ingredient quantity in real time, displaying sensible fractions (½, ⅓, ¼) for small amounts.
  - **Unit toggle:** switch between metric and US units.
  - **Ingredient checklist:** tap an ingredient to check it off while shopping or cooking.
  - **Cook Mode:** a focused, full-screen, one-step-at-a-time view with large text and Next/Previous buttons. Steps with `timerMinutes` show a start/pause countdown timer that alerts visually and with a short sound when done. Request the Screen Wake Lock API where supported so the screen stays on, and fail silently where it is not.
  - **Favorites:** a heart button on cards and recipe pages. Favorites persist in `localStorage` (wrapped in try/catch, with the site working normally if storage is unavailable) and appear in the Favorites view.
- **About / Fan Project Section:** Explains the adaptation model (Section 2) in plain language, including what Faithful, Adapted, and Reimagined mean.
- **Contact Section:** A form for recipe suggestions and feedback (name, email, dish name, message). There is no backend, so validate input on the client side and, on submit, open a pre-filled `mailto:` link.
- **Footer:** Quick navigation links, social channel links, and this disclaimer: "Genshin Cuisine is an unofficial, non-commercial fan project. Genshin Impact, its dish names, and its icons are property of HoYoverse. This site is not affiliated with or endorsed by HoYoverse."

## 8. Agent Rules of Engagement
- Always generate complete, functional code blocks. Avoid placeholders, ellipsis comments (`/* code continues here */`), and truncated snippets.
- Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). Recipe steps use `<ol>` and ingredients use `<ul>`.
- Accessibility: all icons have meaningful `alt` text (the dish name), all interactive controls are keyboard-operable with visible focus styles, filter buttons use `aria-pressed`, and timers announce completion through an `aria-live` region.
- Keep CSS organized with CSS custom properties (`:root`) for the palette and clean media queries.
- Keep JavaScript modular, event-driven, and cleanly scoped: wrap `script.js` in an IIFE, and do not create any globals other than `GENSHIN_RECIPES` from `recipes.js`.
- All recipe content lives in `recipes.js`. Rendering code must be fully data-driven, so new recipes can be added by appending an object to the array.
- If a dish's icon file is missing, show a neutral placeholder graphic instead of a broken image.