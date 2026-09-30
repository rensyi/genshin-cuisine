# Agent Instructions: Static Website Project

## 1. Project Overview
- **Project Name:** Genshin Cuisine
- **Category:** Local Business
- **Description:** A themed local culinary experience bringing the iconic dishes of Teyvat to life, serving realistic, freshly prepared versions of classic in-game meals crafted for local food enthusiasts and diners.
- **Primary Goal:** Drive customer inquiries, increase local food-delivery orders, and seamlessly showcase a highly interactive digital menu to convert fans and food lovers into active diners.

## 2. Technical Stack & Constraints
- **Core Stack:** Plain HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Zero External Dependencies:** Do NOT use external build tools, package managers (npm/yarn), or third-party CSS/JS frameworks (no Tailwind CDN, Bootstrap, React, or jQuery).
- **Font & Icon Constraints:** Use the Google Font **Rubik** via a `<link>` tag. Use inline SVGs or local SVG files in `assets/` for all icons.
- **Paths:** All internal links, stylesheets, scripts, and asset references must use **relative paths** (e.g., `./assets/logo.png`, `./style.css`, `./script.js`) to ensure compatibility with GitHub Pages subdirectory hosting.

## 3. Directory Layout
```text
genshin-cuisine/
├── AGENTS.md
├── index.html
├── style.css
├── script.js
└── assets/
    ├── adeptus-temptation.png
    ├── tricolor-dango.png
    ├── sweet-madame.png
    ├── matsutake-meat-rolls.png
    └── mint-jelly.png
```

## 4. UI/UX & Design Guidelines
- **Color Palette (Liyue Region Ambiance):**
  - **Primary:** `#5C1D17` (Deep Vermillion / Liyue Architecture Red)
  - **Accent / CTA:** `#D49B41` (Cor Lapis Gold / Geo Ambiance)
  - **Secondary Accent:** `#2E4A3F` (Jade Green / Wanmin Restaurant Accents)
  - **Background:** `#FAF6EE` (Silk Flower Off-white)
  - **Text:** `#2B251F` (High-contrast ink brown)
- **Typography:** **Rubik**, sans-serif (clean, modern, highly accessible structure with soft geometric angles).
- **Layout Approach:** Mobile-first design utilizing CSS Flexbox and CSS Grid layouts.
- **Responsiveness:** Fluid breakpoints (Mobile: < 640px, Tablet: 640px - 1024px, Desktop: > 1024px).

## 5. Required Sections
- **Header / Navbar:** Brand logo ("Genshin Cuisine"), region navigation links, and a functional mobile hamburger menu toggle.
- **Hero Section:** Captivating headline highlighting a "Taste of Teyvat Delivered," a short immersion summary, and a prominent "Order Now (Mora Marketplace)" CTA button.
- **Core Content Section:** 
  - **Products / Services Showcase:** A beautifully styled grid featuring five distinct dishes:
    1. **Sweet Madame (Mondstadt):** Honey-glazed roasted whole chicken with a sweet flower-infused reduction sauce. (₱380.00)
    2. **Adeptus' Temptation (Liyue):** Premium slow-simmered seafood and meat soup featuring tender shrimp, savory cured ham, and matsutake mushrooms. (₱650.00)
    3. **Tricolor Dango (Inazuma):** Chewy, sweet glutinous rice dumplings flavored with premium matcha, sweet milk, and a hint of sakura blossoms. (₱180.00)
    4. **Matsutake Meat Rolls (Liyue):** Sautéed wild mushrooms tightly wrapped in thinly sliced, perfectly seared premium beef strips. (₱320.00)
    5. **Mint Jelly (Mondstadt):** Refreshing, vibrant green dessert jelly infused with fresh garden mint and light citrus undertones. (₱120.00)
  - Each item card displays dynamic culinary star ratings (rarity), flavor notes (instead of game buffs), and real culinary ingredients.
- **Interactive Feature:** A dynamic **Region Filter Toggle** (allowing users to view all dishes or instantly sort by Mondstadt, Liyue, and Inazuma) alongside a live **Mora Cart Calculator** that adds up items using realistic local currency (₱ PHP) in real-time.
- **Contact / CTA Section:** A themed contact form for catering requests or direct delivery order inputs.
- **Footer:** Fictional copyright text, quick navigation links, and social channels mapping back to active local handles.

## 6. Agent Rules of Engagement
- Always generate complete, functional code blocks—avoid placeholders, ellipsis comments (`/* code continues here */`), or truncated snippets.
- Ensure semantic HTML tags are strictly prioritized (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Keep CSS deeply organized using CSS custom properties (`:root`) for the Liyue color palette and clean media queries.
- Keep JavaScript modular, completely event-driven, cleanly scoped, and free of global namespace pollution.
