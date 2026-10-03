/**
 * Genshin Cuisine - Recipe Data
 * Defines the site's only global. To add a recipe, append an object to this
 * array; `id` must equal the icon filename in ./assets/icons/ (without .png).
 *
 * In-game facts (region, rarity, gameCategory, ingredientSwaps[].teyvat) come
 * from each dish's page on the Genshin Impact Wiki.
 * Quantities are for the base `servings` and are authored in metric:
 * g, kg, ml, l, tsp, tbsp, or "" for counted items. The site scales and
 * converts them, so steps refer to ingredients by name, not by amount.
 */
const GENSHIN_RECIPES = Object.freeze([
  {
    id: "sweet-madame",
    name: "Sweet Madame",
    region: "Mondstadt",
    rarity: 2,
    gameCategory: "Recovery Dishes",
    faithfulness: "Adapted",
    inspiration: "Honey-roasted chicken",
    description: "A whole chicken roasted until the skin is crisp, then lacquered with a honey and lemon glaze. Sweet, savory, and very hard to get wrong.",
    difficulty: "Easy",
    prepMinutes: 15,
    cookMinutes: 85,
    servings: 4,
    dietary: ["gluten-free", "dairy-free"],
    allergens: [],
    ingredientSwaps: [
      { teyvat: "Fowl", kitchen: "Whole chicken", note: "Fowl is Teyvat's all-purpose poultry; a roasting chicken is the closest match." },
      { teyvat: "Sweet Flower", kitchen: "Honey", note: "The in-game description calls this honey-roasted fowl, so honey carries the Sweet Flower's sweetness." }
    ],
    ingredients: [
      { amount: 1.5, unit: "kg", item: "whole chicken" },
      { amount: 2, unit: "tbsp", item: "olive oil" },
      { amount: 1.5, unit: "tsp", item: "fine salt" },
      { amount: 0.5, unit: "tsp", item: "ground black pepper" },
      { amount: 1, unit: "tsp", item: "dried thyme" },
      { amount: 2, unit: "tsp", item: "finely chopped garlic" },
      { amount: 3, unit: "tbsp", item: "honey" },
      { amount: 1, unit: "tbsp", item: "lemon juice" }
    ],
    steps: [
      { text: "Heat the oven to 200°C (400°F). Pat the chicken completely dry with paper towels, inside and out; dry skin is what crisps.", timerMinutes: 0 },
      { text: "Mix the olive oil, salt, pepper, thyme, and garlic. Rub the mixture all over the chicken and under the breast skin, then set it breast-side up in a roasting pan and tie the legs together with kitchen string.", timerMinutes: 0 },
      { text: "Roast on the middle rack for 50 minutes.", timerMinutes: 50 },
      { text: "Stir the honey and lemon juice together. Brush half of the glaze over the chicken and roast for 10 minutes.", timerMinutes: 10 },
      { text: "Brush on the rest of the glaze and roast for a final 10 minutes, until the skin is deep golden and a thermometer in the thickest part of the thigh reads 74°C (165°F). If it is not there yet, keep roasting and check every 5 minutes; cover loosely with foil if the glaze darkens too fast.", timerMinutes: 10 },
      { text: "Rest the chicken, loosely covered with foil, for 15 minutes so the juices settle. Carve and spoon the pan juices over the top.", timerMinutes: 15 }
    ],
    tips: [
      "No thermometer? Pierce the thigh: the juices must run clear, with no pink.",
      "Scatter edible flowers over the platter for the full Sweet Flower look.",
      "Refrigerate leftovers within 2 hours and eat them within 3 days."
    ]
  },
  {
    id: "fishermans-toast",
    name: "Fisherman's Toast",
    region: "Mondstadt",
    rarity: 2,
    gameCategory: "DEF-Boosting Dishes",
    faithfulness: "Adapted",
    inspiration: "Pizza toast",
    description: "Thick toast spread with a quick garlicky tomato sauce, then baked under melted mozzarella and slivers of red onion. A ten-minute snack that travels well in a pocket by the river.",
    difficulty: "Easy",
    prepMinutes: 10,
    cookMinutes: 20,
    servings: 2,
    dietary: ["vegetarian"],
    allergens: ["gluten", "dairy"],
    ingredientSwaps: [
      { teyvat: "Flour", kitchen: "Thick-sliced white bread", note: "Flour stands for the toast itself; buy a good loaf rather than bake one." },
      { teyvat: "Tomato", kitchen: "Canned crushed tomatoes", note: "A direct match, cooked down into a spreadable sauce." },
      { teyvat: "Onion", kitchen: "Red onion", note: "A direct match; the in-game description calls this onion-covered toast." },
      { teyvat: "Milk", kitchen: "Mozzarella", note: "Milk is the only dairy in the in-game recipe; mozzarella turns it into the melted white topping seen in the icon." }
    ],
    ingredients: [
      { amount: 2, unit: "", item: "thick slices of white bread" },
      { amount: 1, unit: "tbsp", item: "olive oil" },
      { amount: 1, unit: "tsp", item: "finely chopped garlic" },
      { amount: 120, unit: "g", item: "canned crushed tomatoes" },
      { amount: 0.5, unit: "tsp", item: "dried oregano" },
      { amount: 0.25, unit: "tsp", item: "fine salt" },
      { amount: 80, unit: "g", item: "mozzarella, grated" },
      { amount: 50, unit: "g", item: "red onion, thinly sliced" }
    ],
    steps: [
      { text: "Heat the oven to 220°C (425°F). Warm the olive oil in a small pan over medium heat, cook the garlic for 30 seconds until fragrant, then add the tomatoes, oregano, and salt. Simmer for 5 minutes, until thick enough to spread.", timerMinutes: 5 },
      { text: "Put the bread on a baking sheet and toast it in the oven for 3 minutes, so the sauce will not make it soggy.", timerMinutes: 3 },
      { text: "Spread the sauce over the toast right to the edges, then scatter over the mozzarella and the red onion.", timerMinutes: 0 },
      { text: "Bake for 8 minutes, until the cheese is bubbling and the onion is lightly charred at the edges. Let it cool for a minute before eating; the sauce stays very hot.", timerMinutes: 8 }
    ],
    tips: [
      "Top with a few fresh basil leaves, as in the dish's icon.",
      "Day-old bread works best; it stays crisp under the sauce.",
      "A toaster oven or air fryer at the same temperature does the job for one or two slices."
    ]
  },
  {
    id: "mondstadt-hash-brown",
    name: "Mondstadt Hash Brown",
    region: "Mondstadt",
    rarity: 3,
    gameCategory: "Recovery Dishes",
    faithfulness: "Adapted",
    inspiration: "Fried mashed-potato cakes with jam",
    description: "Crisp-edged cakes of mashed potato studded with toasted pine nuts, fried until deep golden and served with a spoonful of berry jam. Sweet and salty, in the same spirit as potato pancakes with fruit sauce.",
    difficulty: "Easy",
    prepMinutes: 20,
    cookMinutes: 45,
    servings: 4,
    dietary: ["vegetarian"],
    allergens: ["gluten", "egg", "nuts"],
    ingredientSwaps: [
      { teyvat: "Potato", kitchen: "Floury potatoes", note: "A direct match; a floury variety such as russet mashes smoothly." },
      { teyvat: "Pinecone", kitchen: "Pine nuts", note: "The in-game Pinecone is filled with oil-rich seeds, and pine nuts are exactly that. They give the crunch the description mentions." },
      { teyvat: "Jam", kitchen: "Berry jam", note: "A direct match; in-game Jam is made from fruit, berries, and sugar." }
    ],
    ingredients: [
      { amount: 600, unit: "g", item: "floury potatoes, peeled and cut into chunks" },
      { amount: 40, unit: "g", item: "pine nuts" },
      { amount: 1, unit: "", item: "egg, beaten" },
      { amount: 4, unit: "tbsp", item: "all-purpose flour, plus extra for shaping" },
      { amount: 0.75, unit: "tsp", item: "fine salt" },
      { amount: 0.25, unit: "tsp", item: "ground black pepper" },
      { amount: 3, unit: "tbsp", item: "neutral cooking oil" },
      { amount: 4, unit: "tbsp", item: "berry jam, to serve" }
    ],
    steps: [
      { text: "Boil the potatoes in salted water for 15 minutes, until a knife slides in easily. Drain well and leave them to steam dry in the colander.", timerMinutes: 15 },
      { text: "Meanwhile, toast the pine nuts in a dry frying pan over medium heat for 2 to 3 minutes, shaking often, until golden. Tip them out and chop them roughly.", timerMinutes: 3 },
      { text: "Mash the potatoes until smooth and let them cool for 10 minutes, so the egg does not scramble. Stir in the egg, flour, salt, pepper, and pine nuts.", timerMinutes: 10 },
      { text: "With floured hands, shape the mixture into round cakes about 2 cm (¾ inch) thick.", timerMinutes: 0 },
      { text: "Heat the oil in a large frying pan over medium heat. Fry the cakes in batches for 4 minutes on the first side, until deep golden and crisp.", timerMinutes: 4 },
      { text: "Turn the cakes carefully and fry for 4 minutes on the second side. Drain on paper towels and serve hot with the jam.", timerMinutes: 4 }
    ],
    tips: [
      "Lingonberry or mixed-berry jam suits these best; anything tart works.",
      "Wet mash makes cakes that fall apart. Let the potatoes steam dry fully before mashing.",
      "Leftover mashed potatoes work well; skip the first step."
    ]
  },
  {
    id: "adeptus-temptation",
    name: "Adeptus' Temptation",
    region: "Liyue",
    rarity: 5,
    gameCategory: "ATK-Boosting Dishes",
    faithfulness: "Adapted",
    inspiration: "Buddha Jumps Over the Wall (fo tiao qiang)",
    description: "A festive soup of cured ham, chicken, shrimp, crab, and mushrooms, simmered slowly until the broth turns deep and golden. A home-kitchen take on Buddha Jumps Over the Wall.",
    difficulty: "Hard",
    prepMinutes: 40,
    cookMinutes: 110,
    servings: 6,
    dietary: ["dairy-free"],
    allergens: ["shellfish", "soy", "gluten"],
    ingredientSwaps: [
      { teyvat: "Ham", kitchen: "Dry-cured ham (Jinhua or prosciutto)", note: "Cured ham is the classic seasoning meat in this style of soup." },
      { teyvat: "Crab", kitchen: "Lump crab meat", note: "A direct match; ready-cooked crab meat saves picking shells." },
      { teyvat: "Shrimp Meat", kitchen: "Large raw shrimp", note: "A direct match." },
      { teyvat: "Matsutake", kitchen: "Matsutake or king oyster mushrooms", note: "Matsutake is a real mushroom, but it is seasonal and expensive; king oyster has a similar firm bite." }
    ],
    ingredients: [
      { amount: 6, unit: "", item: "dried shiitake mushrooms" },
      { amount: 250, unit: "ml", item: "hot water, for soaking" },
      { amount: 150, unit: "g", item: "dry-cured ham (Jinhua or prosciutto), thickly sliced" },
      { amount: 400, unit: "g", item: "bone-in chicken thighs, skin removed" },
      { amount: 1.5, unit: "l", item: "low-sodium chicken stock" },
      { amount: 20, unit: "g", item: "fresh ginger, sliced" },
      { amount: 3, unit: "", item: "scallions, white and green parts separated" },
      { amount: 60, unit: "ml", item: "Shaoxing rice wine" },
      { amount: 150, unit: "g", item: "matsutake or king oyster mushrooms, thickly sliced" },
      { amount: 300, unit: "g", item: "large raw shrimp, peeled and deveined" },
      { amount: 200, unit: "g", item: "cooked lump crab meat" },
      { amount: 1, unit: "tbsp", item: "light soy sauce" },
      { amount: 0.25, unit: "tsp", item: "ground white pepper" }
    ],
    steps: [
      { text: "Cover the dried shiitake with the hot water and soak for 30 minutes. Squeeze them out, slice them, and keep the soaking liquid, pouring it off carefully to leave any grit behind.", timerMinutes: 30 },
      { text: "Put the ham and chicken in a saucepan, cover with cold water, bring to a boil, and simmer for 3 minutes. Drain and rinse. This removes scum and excess salt so the finished broth stays clear.", timerMinutes: 3 },
      { text: "In a large heavy pot, combine the stock, mushroom soaking liquid, ham, chicken, shiitake, ginger, scallion whites, and Shaoxing wine. Bring to a boil, then lower the heat, cover, and simmer very gently for 90 minutes.", timerMinutes: 90 },
      { text: "Lift out the chicken, shred the meat, and return it to the pot. Discard the bones, ginger, and scallion whites.", timerMinutes: 0 },
      { text: "Add the matsutake and simmer for 10 minutes.", timerMinutes: 10 },
      { text: "Add the shrimp and crab meat. Simmer for 3 to 4 minutes, just until the shrimp are pink and opaque all the way through; any longer makes them rubbery.", timerMinutes: 4 },
      { text: "Season with the soy sauce and white pepper, then taste before adding any salt, because the ham is already salty. Ladle into small bowls and top with the sliced scallion greens.", timerMinutes: 0 }
    ],
    tips: [
      "The traditional dish also uses abalone, sea cucumber, and dried scallops. A few soaked dried scallops added with the stock give extra depth.",
      "To avoid wheat, use tamari instead of soy sauce and dry sherry instead of Shaoxing wine.",
      "Cool leftovers quickly, refrigerate for up to 2 days, and reheat until steaming hot."
    ]
  },
  {
    id: "jade-parcels",
    name: "Jade Parcels",
    region: "Liyue",
    rarity: 4,
    gameCategory: "ATK-Boosting Dishes",
    faithfulness: "Adapted",
    inspiration: "Steamed cabbage parcels (jade cabbage dumplings)",
    description: "Little pouches of napa cabbage tied around a ham, pork, and water chestnut filling, steamed until tender and served in a lightly thickened chili broth.",
    difficulty: "Medium",
    prepMinutes: 35,
    cookMinutes: 20,
    servings: 4,
    dietary: ["dairy-free"],
    allergens: ["soy", "gluten", "sesame"],
    ingredientSwaps: [
      { teyvat: "Cabbage", kitchen: "Napa cabbage leaves", note: "A direct match; napa leaves turn soft and foldable once blanched." },
      { teyvat: "Ham", kitchen: "Cooked ham, with ground pork to bind it", note: "A direct match; a little ground pork holds the diced ham together inside the parcel." },
      { teyvat: "Lotus Head", kitchen: "Canned water chestnuts", note: "Lotus Head is an aquatic plant native to Liyue; water chestnuts are an easy-to-find aquatic stand-in that adds crunch." },
      { teyvat: "Jueyun Chili", kitchen: "Dried Sichuan chilies", note: "Jueyun Chili is a spicy plant native to Liyue; dried Sichuan chilies bring the same heat to the broth." }
    ],
    ingredients: [
      { amount: 8, unit: "", item: "large napa cabbage leaves" },
      { amount: 8, unit: "", item: "long scallion greens, for tying" },
      { amount: 200, unit: "g", item: "cooked ham, finely diced" },
      { amount: 150, unit: "g", item: "ground pork" },
      { amount: 100, unit: "g", item: "canned water chestnuts, drained and finely diced" },
      { amount: 1, unit: "tbsp", item: "finely grated fresh ginger" },
      { amount: 1, unit: "tbsp", item: "light soy sauce" },
      { amount: 1, unit: "tsp", item: "toasted sesame oil" },
      { amount: 1, unit: "tsp", item: "cornstarch, for the filling" },
      { amount: 300, unit: "ml", item: "low-sodium chicken stock" },
      { amount: 4, unit: "", item: "dried Sichuan chilies" },
      { amount: 1, unit: "tsp", item: "cornstarch, for the broth" },
      { amount: 1, unit: "tsp", item: "chili oil" }
    ],
    steps: [
      { text: "Bring a large pot of water to a boil. Blanch the cabbage leaves for 2 minutes and the scallion greens for 20 seconds, until pliable, then cool them in cold water and pat dry. Shave down any thick ribs with a knife so the leaves fold without snapping.", timerMinutes: 2 },
      { text: "Mix the ham, pork, water chestnuts, ginger, soy sauce, sesame oil, and the filling cornstarch until the mixture turns sticky.", timerMinutes: 0 },
      { text: "Put a heaped tablespoon of filling in the middle of each leaf, gather the leaf up around it into a pouch, and tie it closed with a scallion green.", timerMinutes: 0 },
      { text: "Stand the parcels on a heatproof plate, set it in a steamer over boiling water, cover, and steam for 12 minutes, until the filling reaches 71°C (160°F).", timerMinutes: 12 },
      { text: "While the parcels steam, simmer the stock with the dried chilies for 5 minutes. Stir the broth cornstarch into a tablespoon of cold water, add it to the pan, and simmer for 1 more minute, until lightly thickened. Stir in the chili oil.", timerMinutes: 5 },
      { text: "Pour the broth around the parcels and serve at once.", timerMinutes: 0 }
    ],
    tips: [
      "No steamer? Set the plate on an upturned bowl in a wide, lidded pot with 3 cm (1 inch) of simmering water.",
      "The dried chilies flavor the broth; leave them whole and do not eat them unless you like serious heat.",
      "Use tamari instead of soy sauce to avoid wheat."
    ]
  },
  {
    id: "almond-tofu",
    name: "Almond Tofu",
    region: "Liyue",
    rarity: 2,
    gameCategory: "ATK-Boosting Dishes",
    faithfulness: "Faithful",
    inspiration: "Almond jelly (xingren doufu)",
    description: "A cool, milky jelly scented with almond, cut into cubes and served in a light syrup. There is no tofu in it; as the game says, it is only named for its shape.",
    difficulty: "Easy",
    prepMinutes: 10,
    cookMinutes: 85,
    servings: 4,
    dietary: ["vegetarian", "gluten-free"],
    allergens: ["dairy", "nuts"],
    ingredientSwaps: [
      { teyvat: "Milk", kitchen: "Whole milk", note: "A direct match." },
      { teyvat: "Sugar", kitchen: "White sugar", note: "A direct match." },
      { teyvat: "Almond", kitchen: "Almond extract", note: "The in-game Almond is a seed with a distinctive fragrance; almond extract delivers that aroma without grinding and straining nuts." }
    ],
    ingredients: [
      { amount: 200, unit: "ml", item: "water, for the jelly" },
      { amount: 2, unit: "tsp", item: "agar-agar powder" },
      { amount: 400, unit: "ml", item: "whole milk" },
      { amount: 50, unit: "g", item: "sugar, for the jelly" },
      { amount: 1, unit: "tsp", item: "almond extract" },
      { amount: 100, unit: "ml", item: "water, for the syrup" },
      { amount: 30, unit: "g", item: "sugar, for the syrup" }
    ],
    steps: [
      { text: "Pour the jelly water into a saucepan and whisk in the agar-agar. Bring to a boil while whisking, then boil gently for 2 minutes; agar only sets if it has fully boiled.", timerMinutes: 2 },
      { text: "Lower the heat and add the milk and the jelly sugar. Stir until the sugar dissolves and the mixture is steaming hot but not boiling. Take it off the heat and stir in the almond extract.", timerMinutes: 0 },
      { text: "Pour through a fine sieve into a small square dish. Let it cool at room temperature for 15 minutes.", timerMinutes: 15 },
      { text: "Chill for at least 1 hour, until firm. Meanwhile, simmer the syrup water and syrup sugar together for 2 minutes, then let the syrup cool.", timerMinutes: 60 },
      { text: "Cut the jelly into cubes, spoon them into bowls, and pour the cold syrup over the top.", timerMinutes: 0 }
    ],
    tips: [
      "A few dried osmanthus flowers or goji berries in the syrup match the golden flecks in the dish's icon.",
      "Almond extract varies in strength. Start with half, taste the warm mixture, and add the rest if you want more.",
      "Keeps covered in the fridge for up to 3 days."
    ]
  },
  {
    id: "tricolor-dango",
    name: "Tricolor Dango",
    region: "Inazuma",
    rarity: 3,
    gameCategory: "Recovery Dishes",
    faithfulness: "Faithful",
    inspiration: "Hanami dango",
    description: "Soft, chewy rice dumplings in pink, white, and green, threaded three to a skewer. The classic Japanese flower-viewing sweet: lightly sweet, with a gentle bounce.",
    difficulty: "Medium",
    prepMinutes: 30,
    cookMinutes: 15,
    servings: 4,
    dietary: ["vegetarian", "gluten-free"],
    allergens: ["dairy"],
    ingredientSwaps: [
      { teyvat: "Rice", kitchen: "Joshinko and shiratamako rice flours", note: "The in-game description says the rice is ground into powder, which is exactly what rice flour is." },
      { teyvat: "Milk", kitchen: "Whole milk", note: "A direct match; it replaces the usual water for a softer, creamier dango." },
      { teyvat: "Sakura Bloom", kitchen: "Freeze-dried strawberry powder", note: "Sakura Bloom colors the pink dango in-game; strawberry powder gives the same blush at home." },
      { teyvat: "Snapdragon", kitchen: "Matcha powder", note: "Snapdragon colors the green dango in-game; matcha is a common green for hanami dango." }
    ],
    ingredients: [
      { amount: 100, unit: "g", item: "joshinko (Japanese non-glutinous rice flour)" },
      { amount: 100, unit: "g", item: "shiratamako (glutinous rice flour)" },
      { amount: 75, unit: "g", item: "sugar" },
      { amount: 170, unit: "ml", item: "whole milk, hot but not boiling" },
      { amount: 1, unit: "tsp", item: "matcha powder" },
      { amount: 1, unit: "tsp", item: "freeze-dried strawberry powder (or a drop of red food coloring)" },
      { amount: 8, unit: "", item: "bamboo skewers" }
    ],
    steps: [
      { text: "Mix both rice flours and the sugar in a bowl. Add the hot milk a little at a time, stirring and then kneading, until the dough is smooth and as soft as an earlobe. You may not need all of the milk.", timerMinutes: 0 },
      { text: "Divide the dough into three equal pieces. Knead the matcha into one piece and the strawberry powder into another until evenly colored; leave the third plain. If a piece turns dry and cracks, wet your hands and knead again.", timerMinutes: 0 },
      { text: "Roll each piece into balls about 2.5 cm (1 inch) across, making the same number of each color.", timerMinutes: 0 },
      { text: "Bring a large pot of water to a boil. Cook the dango in batches, white first, then pink, then green, so the colors stay clean. Once they float, cook for 2 more minutes.", timerMinutes: 2 },
      { text: "Move the cooked dango into a bowl of iced water for 1 minute to firm up, then drain well.", timerMinutes: 1 },
      { text: "Thread onto wet bamboo skewers in this order: green first, then white, then pink on top. Serve the same day at room temperature.", timerMinutes: 0 }
    ],
    tips: [
      "Chewy dango are a choking hazard for small children and anyone who has trouble swallowing. Cut them into small pieces.",
      "Dango harden in the fridge. Keep them covered at room temperature and eat them within a day.",
      "If you cannot find joshinko and shiratamako, use all glutinous rice flour (mochiko); the dango will be softer and stickier."
    ]
  },
  {
    id: "tri-flavored-skewer",
    name: "Tri-Flavored Skewer",
    region: "Inazuma",
    rarity: 3,
    gameCategory: "ATK-Boosting Dishes",
    faithfulness: "Adapted",
    inspiration: "Kushiyaki and kushikatsu (Japanese grilled and fried skewers)",
    description: "Pork skewers cooked three ways, as the game describes: one breaded and fried, one broiled with spice, and one seared and glazed in sweet soy. Each diner gets one of each, with tonkatsu sauce for dipping.",
    difficulty: "Medium",
    prepMinutes: 35,
    cookMinutes: 25,
    servings: 4,
    dietary: ["dairy-free"],
    allergens: ["gluten", "egg", "soy", "sesame"],
    ingredientSwaps: [
      { teyvat: "Raw Meat", kitchen: "Pork shoulder", note: "Raw Meat is Teyvat's generic red meat; pork is a common choice for these skewers." },
      { teyvat: "Flour", kitchen: "All-purpose flour and panko breadcrumbs", note: "A direct match; flour is the first layer of the fried skewer's coating." },
      { teyvat: "Bird Egg", kitchen: "Egg", note: "A direct match; it glues the breadcrumbs to the pork." },
      { teyvat: "Snapdragon", kitchen: "Shichimi togarashi", note: "The in-game Snapdragon is used as a spice once cooked; this Japanese seven-spice blend takes that role." }
    ],
    ingredients: [
      { amount: 12, unit: "", item: "bamboo skewers" },
      { amount: 600, unit: "g", item: "boneless pork shoulder, cut into 2.5 cm (1 inch) cubes" },
      { amount: 0.75, unit: "tsp", item: "fine salt" },
      { amount: 2, unit: "tbsp", item: "soy sauce" },
      { amount: 2, unit: "tbsp", item: "mirin" },
      { amount: 1, unit: "tbsp", item: "sugar" },
      { amount: 40, unit: "g", item: "all-purpose flour" },
      { amount: 1, unit: "", item: "egg, beaten" },
      { amount: 60, unit: "g", item: "panko breadcrumbs" },
      { amount: 200, unit: "ml", item: "neutral cooking oil, for frying" },
      { amount: 1, unit: "tsp", item: "shichimi togarashi" },
      { amount: 3, unit: "tbsp", item: "tonkatsu sauce, for dipping" }
    ],
    steps: [
      { text: "Soak the skewers in water for 20 minutes so they do not scorch. Thread the pork onto them, three or four cubes each, season with the salt, and split the skewers into three equal groups. Stir the soy sauce, mirin, and sugar together for the glaze.", timerMinutes: 20 },
      { text: "Fried skewers: dust the first group in the flour, dip in the beaten egg, and coat in the panko. Heat the oil in a deep frying pan to 170°C (340°F); a breadcrumb dropped in should sizzle at once. Fry for 6 minutes, turning, until deep golden, then drain on a rack.", timerMinutes: 6 },
      { text: "Broiled skewers: heat the broiler to high. Lay the second group on a foil-lined tray and broil about 10 cm (4 inches) from the heat for 4 minutes per side, until browned at the edges. Sprinkle with the shichimi togarashi.", timerMinutes: 8 },
      { text: "Glazed skewers: heat a spoonful of the frying oil in a frying pan over medium-high heat. Brown the third group for 2 minutes per side, pour in the glaze, and cook for 2 more minutes, turning, until sticky.", timerMinutes: 6 },
      { text: "Check that the thickest piece of each kind has reached 63°C (145°F). Serve one of each skewer per person, with the tonkatsu sauce for dipping.", timerMinutes: 0 }
    ],
    tips: [
      "Never leave hot oil unattended, and let it cool completely before pouring it away.",
      "No tonkatsu sauce? Mix ketchup with a splash of Worcestershire sauce.",
      "Chicken thigh works in place of pork; cook it to 74°C (165°F)."
    ]
  },
  {
    id: "sashimi-platter",
    name: "Sashimi Platter",
    region: "Inazuma",
    rarity: 4,
    gameCategory: "ATK-Boosting Dishes",
    faithfulness: "Faithful",
    inspiration: "Sashimi moriawase (assorted sashimi)",
    description: "Slices of raw salmon and tuna with poached shrimp and crab, arranged over crisp shreds of daikon. There is almost no cooking; everything depends on very fresh fish and a sharp knife.",
    difficulty: "Medium",
    prepMinutes: 30,
    cookMinutes: 5,
    servings: 4,
    dietary: ["dairy-free"],
    allergens: ["fish", "shellfish", "soy", "gluten"],
    ingredientSwaps: [
      { teyvat: "Fish", kitchen: "Sashimi-grade salmon and tuna", note: "A direct match; these are the two fish easiest to buy in sashimi quality." },
      { teyvat: "Shrimp Meat", kitchen: "Large shrimp, briefly poached", note: "A direct match; poaching makes ordinary grocery-store shrimp safe to serve on the platter." },
      { teyvat: "Crab", kitchen: "Cooked crab leg meat", note: "A direct match." },
      { teyvat: "Radish", kitchen: "Daikon radish", note: "A direct match; finely shredded daikon is the traditional bed for sashimi." }
    ],
    ingredients: [
      { amount: 200, unit: "g", item: "daikon radish, peeled" },
      { amount: 8, unit: "", item: "large raw shrimp, peeled and deveined" },
      { amount: 200, unit: "g", item: "sashimi-grade salmon" },
      { amount: 200, unit: "g", item: "sashimi-grade tuna" },
      { amount: 150, unit: "g", item: "cooked crab leg meat" },
      { amount: 4, unit: "tbsp", item: "soy sauce, for dipping" },
      { amount: 2, unit: "tsp", item: "wasabi paste" }
    ],
    steps: [
      { text: "Cut the daikon into the finest shreds you can manage, or use a julienne peeler. Soak the shreds in iced water for 10 minutes to crisp them, then drain and pat dry.", timerMinutes: 10 },
      { text: "Bring a small pan of salted water to a boil. Cook the shrimp for 2 minutes, until pink and opaque all the way through, then cool them in iced water and pat dry.", timerMinutes: 2 },
      { text: "Keep the fish in the fridge until the moment you cut it. With a long, very sharp knife, slice the salmon and tuna across the grain into pieces about 1 cm (⅜ inch) thick, drawing the knife toward you in one stroke instead of sawing.", timerMinutes: 0 },
      { text: "Pile the daikon on a chilled plate and arrange the fish, shrimp, and crab around it. Serve immediately with the soy sauce and wasabi.", timerMinutes: 0 }
    ],
    tips: [
      "Only use fish sold as sashimi-grade, which has been frozen to kill parasites. Tell the fishmonger you plan to eat it raw, and eat it the day you buy it.",
      "Raw fish is not recommended for pregnant women, young children, older adults, or anyone with a weakened immune system.",
      "Do not keep leftovers, and never leave the platter at room temperature for more than an hour."
    ]
  },
  {
    id: "tandoori-roast-chicken",
    name: "Tandoori Roast Chicken",
    region: "Sumeru",
    rarity: 4,
    gameCategory: "ATK-Boosting Dishes",
    faithfulness: "Adapted",
    inspiration: "Tandoori chicken (tandoori murgh)",
    description: "A whole chicken slashed to the bone, marinated in spiced yogurt, and roasted hot until the red crust chars at the edges. Start early: the marinade needs at least 4 hours, and a home oven stands in for the tandoor.",
    difficulty: "Medium",
    prepMinutes: 265,
    cookMinutes: 80,
    servings: 4,
    dietary: ["gluten-free"],
    allergens: ["dairy"],
    ingredientSwaps: [
      { teyvat: "Fowl", kitchen: "Whole chicken", note: "Fowl is Teyvat's all-purpose poultry; a roasting chicken is the closest match." },
      { teyvat: "Spice", kitchen: "Kashmiri chili, garam masala, cumin, coriander, and turmeric", note: "The in-game description says the chicken is marinated with red spices; this is the classic tandoori blend." },
      { teyvat: "Padisarah", kitchen: "Saffron", note: "Padisarah buds are processed into a valuable spice in-game, which is what saffron is: a costly spice taken from a flower." },
      { teyvat: "Rukkhashava Mushrooms", kitchen: "Oyster mushrooms", note: "The in-game fungus grows in layers on trees, just as oyster mushrooms do." }
    ],
    ingredients: [
      { amount: 1.5, unit: "kg", item: "whole chicken" },
      { amount: 200, unit: "g", item: "plain full-fat yogurt, for the marinade" },
      { amount: 2, unit: "tbsp", item: "lemon juice" },
      { amount: 2, unit: "tbsp", item: "neutral cooking oil" },
      { amount: 1, unit: "tbsp", item: "finely grated fresh ginger" },
      { amount: 1, unit: "tbsp", item: "finely chopped garlic" },
      { amount: 1, unit: "tbsp", item: "Kashmiri chili powder (or sweet paprika with a pinch of cayenne)" },
      { amount: 2, unit: "tsp", item: "garam masala" },
      { amount: 1, unit: "tsp", item: "ground cumin" },
      { amount: 1, unit: "tsp", item: "ground coriander" },
      { amount: 0.5, unit: "tsp", item: "ground turmeric" },
      { amount: 1.5, unit: "tsp", item: "fine salt" },
      { amount: 250, unit: "g", item: "oyster mushrooms, torn into large pieces" },
      { amount: 150, unit: "g", item: "plain full-fat yogurt, for the dip" },
      { amount: 0.25, unit: "tsp", item: "saffron threads" }
    ],
    steps: [
      { text: "Whisk the marinade yogurt with the lemon juice, oil, ginger, garlic, chili powder, garam masala, cumin, coriander, turmeric, and salt. Before any of it touches raw chicken, spoon about a fifth into a separate bowl for the mushrooms, cover it, and refrigerate.", timerMinutes: 0 },
      { text: "Pat the chicken dry. Cut deep slashes down to the bone in the legs and thighs, and two or three in each breast. Rub the marinade all over, into the slashes and under the skin. Cover and refrigerate for at least 4 hours, or up to 24.", timerMinutes: 240 },
      { text: "Heat the oven to 220°C (425°F). Set the chicken breast-side up on a rack in a foil-lined roasting pan and roast for 20 minutes.", timerMinutes: 20 },
      { text: "Toss the mushrooms with the reserved marinade. Lower the oven to 190°C (375°F), scatter the mushrooms around the chicken, and roast for another 45 minutes, until a thermometer in the thickest part of the thigh reads 74°C (165°F). If it is not there yet, keep roasting and check every 5 minutes.", timerMinutes: 45 },
      { text: "Rest the chicken, loosely covered with foil, for 15 minutes. Meanwhile, crush the saffron into a tablespoon of hot water, let it steep for 5 minutes, then stir it into the dip yogurt with a pinch of salt.", timerMinutes: 15 },
      { text: "Carve the chicken and serve it with the roasted mushrooms, the saffron yogurt, and lemon wedges.", timerMinutes: 0 }
    ],
    tips: [
      "Throw away any marinade that has touched raw chicken. Never use it as a sauce.",
      "For more char, finish under a hot broiler for 2 to 3 minutes, watching closely.",
      "Bone-in thighs and drumsticks also work: roast them at 220°C (425°F) for 35 to 40 minutes, to the same 74°C (165°F)."
    ]
  },
  {
    id: "biryani",
    name: "Biryani",
    region: "Sumeru",
    rarity: 4,
    gameCategory: "DEF-Boosting Dishes",
    faithfulness: "Faithful",
    inspiration: "Lamb biryani",
    description: "Spiced lamb simmered until tender, then steamed under a layer of basmati rice with saffron and fried onions, all in one pot. Every grain soaks up the aroma of the meat, just as the game promises.",
    difficulty: "Hard",
    prepMinutes: 45,
    cookMinutes: 100,
    servings: 4,
    dietary: ["gluten-free"],
    allergens: ["dairy"],
    ingredientSwaps: [
      { teyvat: "Rice", kitchen: "Basmati rice", note: "The in-game description calls for long-grain rice; basmati is the classic choice." },
      { teyvat: "Raw Meat", kitchen: "Lamb shoulder", note: "Raw Meat is Teyvat's generic red meat; lamb is a traditional biryani meat." },
      { teyvat: "Spice", kitchen: "Garam masala, cumin, coriander, turmeric, and chili", note: "The in-game Spice is an all-purpose seasoning; this is a standard biryani blend." },
      { teyvat: "Padisarah", kitchen: "Saffron", note: "Padisarah buds are processed into a valuable spice in-game, which is what saffron is. The game sprinkles the petals on before serving, and the saffron goes on at the same point." }
    ],
    ingredients: [
      { amount: 300, unit: "g", item: "basmati rice" },
      { amount: 0.25, unit: "tsp", item: "saffron threads" },
      { amount: 3, unit: "tbsp", item: "warm milk" },
      { amount: 3, unit: "tbsp", item: "neutral cooking oil" },
      { amount: 250, unit: "g", item: "onions, thinly sliced" },
      { amount: 500, unit: "g", item: "boneless lamb shoulder, cut into 3 cm (1¼ inch) cubes" },
      { amount: 1, unit: "tbsp", item: "finely grated fresh ginger" },
      { amount: 1, unit: "tbsp", item: "finely chopped garlic" },
      { amount: 2, unit: "tsp", item: "garam masala" },
      { amount: 1, unit: "tsp", item: "ground cumin" },
      { amount: 1, unit: "tsp", item: "ground coriander" },
      { amount: 1, unit: "tsp", item: "Kashmiri chili powder (or sweet paprika)" },
      { amount: 0.5, unit: "tsp", item: "ground turmeric" },
      { amount: 2, unit: "tsp", item: "fine salt" },
      { amount: 150, unit: "g", item: "plain full-fat yogurt" },
      { amount: 200, unit: "ml", item: "water" }
    ],
    steps: [
      { text: "Rinse the rice until the water runs clear, then soak it in cold water for 30 minutes. Crush the saffron into the warm milk and set it aside to steep.", timerMinutes: 30 },
      { text: "Heat the oil in a heavy, lidded pot over medium-high heat. Fry the onions for about 15 minutes, stirring often, until deep golden brown. Lift out half of them and keep them for the topping.", timerMinutes: 15 },
      { text: "Add the lamb to the pot and brown it for 5 minutes. Stir in the ginger, garlic, all the ground spices, and half of the salt for 1 minute, then add the yogurt and water. Cover and simmer over low heat for 45 minutes, until the lamb is tender and the sauce is thick.", timerMinutes: 45 },
      { text: "While the lamb simmers, boil the drained rice with the rest of the salt in plenty of water for 5 minutes; the grains should still have a firm core. Drain well.", timerMinutes: 5 },
      { text: "Spread the rice over the lamb in an even layer. Drizzle the saffron milk over it and scatter on the reserved onions. Cover with foil and a tight lid, and cook over the lowest heat for 20 minutes.", timerMinutes: 20 },
      { text: "Take the pot off the heat and leave it covered for 10 minutes. Fluff gently from the bottom so the lamb mixes through the rice, and serve.", timerMinutes: 10 }
    ],
    tips: [
      "Do not skip the soak; it is what keeps the rice grains long and separate.",
      "Bone-in chicken thighs work in place of lamb: simmer for 25 minutes instead of 45.",
      "Cool leftovers within an hour and refrigerate; reheat rice until steaming hot, and only once."
    ]
  },
  {
    id: "samosa",
    name: "Samosa",
    region: "Sumeru",
    rarity: 2,
    gameCategory: "Recovery Dishes",
    faithfulness: "Faithful",
    inspiration: "Keema samosa",
    description: "Crisp fried pastry triangles filled with spiced ground meat and peas. The game notes that meat and vegetarian fillings both have loyal supporters; this is the meat side of the argument.",
    difficulty: "Medium",
    prepMinutes: 45,
    cookMinutes: 35,
    servings: 4,
    dietary: ["dairy-free"],
    allergens: ["gluten"],
    ingredientSwaps: [
      { teyvat: "Raw Meat", kitchen: "Ground lamb or beef", note: "Raw Meat is Teyvat's generic red meat; either makes a classic keema filling." },
      { teyvat: "Flour", kitchen: "All-purpose flour", note: "A direct match, for the thin crust." },
      { teyvat: "Spice", kitchen: "Garam masala, cumin, turmeric, and chili", note: "The in-game Spice is an all-purpose seasoning; these are the usual samosa spices." }
    ],
    ingredients: [
      { amount: 250, unit: "g", item: "all-purpose flour" },
      { amount: 0.5, unit: "tsp", item: "fine salt, for the dough" },
      { amount: 3, unit: "tbsp", item: "neutral cooking oil, for the dough" },
      { amount: 100, unit: "ml", item: "cold water" },
      { amount: 300, unit: "g", item: "ground lamb or beef" },
      { amount: 100, unit: "g", item: "onion, finely chopped" },
      { amount: 2, unit: "tsp", item: "finely chopped garlic" },
      { amount: 2, unit: "tsp", item: "finely grated fresh ginger" },
      { amount: 1.5, unit: "tsp", item: "garam masala" },
      { amount: 1, unit: "tsp", item: "ground cumin" },
      { amount: 0.5, unit: "tsp", item: "ground turmeric" },
      { amount: 0.5, unit: "tsp", item: "chili powder" },
      { amount: 0.75, unit: "tsp", item: "fine salt, for the filling" },
      { amount: 80, unit: "g", item: "frozen peas" },
      { amount: 750, unit: "ml", item: "neutral cooking oil, for deep-frying" }
    ],
    steps: [
      { text: "Rub the dough oil into the flour and dough salt until the mixture looks like breadcrumbs. Add the water a little at a time and knead for 5 minutes into a firm, smooth dough. Cover and rest for 30 minutes.", timerMinutes: 30 },
      { text: "Cook the ground meat in a dry frying pan over medium-high heat for 5 minutes, breaking it up, until no pink remains. Add the onion, garlic, and ginger and cook for 4 minutes. Stir in the spices, filling salt, and peas and cook for 3 more minutes, until the mixture is dry. Let it cool completely.", timerMinutes: 12 },
      { text: "Divide the dough into balls the size of a golf ball. Roll each into a thin oval about 18 cm (7 inches) long and cut it in half across the middle.", timerMinutes: 0 },
      { text: "Wet the straight edge of a half-oval, fold it into a cone, and press the seam shut. Fill with about two tablespoons of filling, wet the rim, and pinch it closed. Repeat with the rest.", timerMinutes: 0 },
      { text: "Heat the frying oil in a deep, heavy pot to 160°C (325°F), filling the pot no more than a third full. Fry the samosas in small batches for 8 to 10 minutes, turning now and then, until golden and crisp. Drain on paper towels.", timerMinutes: 10 }
    ],
    tips: [
      "Never leave hot oil unattended, and let it cool completely before pouring it away.",
      "Serve with mint chutney, as in the dish's icon: blend fresh mint, cilantro, green chili, lemon juice, and a pinch of salt.",
      "To bake instead, brush with oil and bake at 200°C (400°F) for 25 minutes, turning once."
    ]
  },
  {
    id: "fonta",
    name: "Fonta",
    region: "Fontaine",
    rarity: 2,
    gameCategory: "Other Dishes",
    faithfulness: "Reimagined",
    inspiration: "Homemade orange soda",
    description: "In-game, Fonta is a bottled specialty drink from the Fontaine Research Institute that is bought rather than cooked, and the game never says what goes into it. This version takes its cue from the amber bottle: a fresh orange syrup topped up with sparkling water.",
    difficulty: "Easy",
    prepMinutes: 10,
    cookMinutes: 45,
    servings: 4,
    dietary: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    allergens: [],
    ingredientSwaps: [],
    ingredients: [
      { amount: 100, unit: "g", item: "sugar" },
      { amount: 100, unit: "ml", item: "water" },
      { amount: 2, unit: "tsp", item: "finely grated orange zest" },
      { amount: 250, unit: "ml", item: "freshly squeezed orange juice" },
      { amount: 2, unit: "tbsp", item: "lemon juice" },
      { amount: 750, unit: "ml", item: "sparkling water, well chilled" }
    ],
    steps: [
      { text: "Put the sugar, water, and orange zest in a small saucepan. Bring to a simmer, stirring until the sugar dissolves, then simmer for 2 minutes.", timerMinutes: 2 },
      { text: "Take the pan off the heat and stir in the orange juice and lemon juice. Let the syrup cool for 10 minutes, then strain it through a fine sieve into a jar or bottle.", timerMinutes: 10 },
      { text: "Chill the syrup for at least 30 minutes. Cold syrup keeps the fizz; warm syrup knocks it flat.", timerMinutes: 30 },
      { text: "Fill glasses with ice. Pour in the syrup, top up with the sparkling water at roughly one part syrup to two parts water, and stir once, gently.", timerMinutes: 0 }
    ],
    tips: [
      "For the deeper amber of the in-game bottle, use blood oranges.",
      "Mix each glass just before serving; soda mixed ahead goes flat.",
      "The syrup keeps in a sealed bottle in the fridge for up to 5 days."
    ]
  },
  {
    id: "fontainian-onion-soup",
    name: "Fontainian Onion Soup",
    region: "Fontaine",
    rarity: 2,
    gameCategory: "DEF-Boosting Dishes",
    faithfulness: "Faithful",
    inspiration: "French onion soup",
    description: "Onions cooked slowly until dark and sweet, simmered in beef stock, then finished under the broiler with toasted bread and a bubbling cap of cheese. The method is exactly the one the game describes.",
    difficulty: "Easy",
    prepMinutes: 15,
    cookMinutes: 75,
    servings: 4,
    dietary: [],
    allergens: ["gluten", "dairy"],
    ingredientSwaps: [
      { teyvat: "Onion", kitchen: "Yellow onions", note: "A direct match; yellow onions turn the sweetest when browned." },
      { teyvat: "Flour", kitchen: "Baguette, plus a spoonful of flour", note: "Flour covers both the slice of bread on top and the spoonful that gives the soup body." },
      { teyvat: "Cheese", kitchen: "Gruyère", note: "A direct match; Gruyère is the classic melting cheese for this soup." }
    ],
    ingredients: [
      { amount: 40, unit: "g", item: "unsalted butter" },
      { amount: 1, unit: "tbsp", item: "olive oil" },
      { amount: 1, unit: "kg", item: "yellow onions, thinly sliced" },
      { amount: 1, unit: "tsp", item: "fine salt" },
      { amount: 1, unit: "tsp", item: "sugar" },
      { amount: 1, unit: "tbsp", item: "all-purpose flour" },
      { amount: 120, unit: "ml", item: "dry white wine" },
      { amount: 1.2, unit: "l", item: "low-sodium beef stock" },
      { amount: 0.5, unit: "tsp", item: "dried thyme" },
      { amount: 8, unit: "", item: "slices of baguette, about 2 cm (¾ inch) thick" },
      { amount: 150, unit: "g", item: "Gruyère cheese, grated" }
    ],
    steps: [
      { text: "Melt the butter with the oil in a large, heavy pot over medium heat. Add the onions, salt, and sugar and cook for 40 minutes, stirring every few minutes, until soft and deep golden brown. Lower the heat if they start to catch.", timerMinutes: 40 },
      { text: "Stir in the flour and cook for 1 minute. Pour in the wine, scrape up the browned bits from the bottom of the pot, and simmer for 2 minutes.", timerMinutes: 2 },
      { text: "Add the stock and thyme. Bring to a boil, then simmer, partly covered, for 20 minutes. Taste and add more salt if needed.", timerMinutes: 20 },
      { text: "Heat the broiler to high. Toast the baguette slices under it for about 1 minute per side, until dry and lightly golden.", timerMinutes: 0 },
      { text: "Ladle the soup into ovenproof bowls set on a baking sheet. Float two toasts on each, pile on the cheese, and broil for 3 to 4 minutes, until bubbling and browned. The bowls will be extremely hot.", timerMinutes: 4 }
    ],
    tips: [
      "The onions cannot be rushed; pale onions make a thin-tasting soup.",
      "To skip the wine, use the same amount of stock plus a teaspoon of wine vinegar.",
      "For a vegetarian version, use a dark vegetable or mushroom stock."
    ]
  },
  {
    id: "haggis",
    name: "Haggis",
    region: "Fontaine",
    rarity: 4,
    gameCategory: "DEF-Boosting Dishes",
    faithfulness: "Adapted",
    inspiration: "Haggis with neeps and tatties",
    description: "A skillet version of the peppery lamb-and-oat classic, made with ground lamb and a little liver, with no sheep stomach required. Served the traditional way, with buttery mashed potatoes and mashed rutabaga.",
    difficulty: "Medium",
    prepMinutes: 25,
    cookMinutes: 60,
    servings: 4,
    dietary: [],
    allergens: ["dairy", "gluten"],
    ingredientSwaps: [
      { teyvat: "Raw Meat", kitchen: "Ground lamb and chicken livers", note: "The in-game description uses sheep offal; ground lamb with a little liver gives the same deep flavor from an ordinary grocery store." },
      { teyvat: "Potato", kitchen: "Mashed potatoes", note: "A direct match; the game serves the dish with mashed potatoes." },
      { teyvat: "Radish", kitchen: "Rutabaga", note: "The game serves the dish with radish paste; mashed rutabaga is the root-vegetable mash served with real haggis." },
      { teyvat: "Marcotte", kitchen: "Nutmeg, allspice, coriander, and black pepper", note: "Marcotte is a richly scented flower with no kitchen equivalent; the warm, fragrant spices of real haggis take its place." }
    ],
    ingredients: [
      { amount: 100, unit: "g", item: "steel-cut oats" },
      { amount: 1, unit: "tbsp", item: "neutral cooking oil" },
      { amount: 150, unit: "g", item: "onion, finely chopped" },
      { amount: 400, unit: "g", item: "ground lamb" },
      { amount: 150, unit: "g", item: "chicken livers, trimmed and finely chopped" },
      { amount: 1, unit: "tsp", item: "ground black pepper" },
      { amount: 1, unit: "tsp", item: "ground coriander" },
      { amount: 0.5, unit: "tsp", item: "ground nutmeg" },
      { amount: 0.5, unit: "tsp", item: "ground allspice" },
      { amount: 1, unit: "tsp", item: "fine salt" },
      { amount: 400, unit: "ml", item: "beef stock" },
      { amount: 500, unit: "g", item: "rutabaga, peeled and cut into 2 cm (¾ inch) cubes" },
      { amount: 600, unit: "g", item: "floury potatoes, peeled and cut into chunks" },
      { amount: 50, unit: "g", item: "unsalted butter" },
      { amount: 60, unit: "ml", item: "whole milk, warmed" }
    ],
    steps: [
      { text: "Toast the oats in a large, deep, dry frying pan over medium heat for 4 minutes, stirring, until they smell nutty. Tip them out.", timerMinutes: 4 },
      { text: "Heat the oil in the same pan over medium heat and cook the onion for 5 minutes, until soft. Add the lamb and livers and cook for 8 minutes, breaking them up, until browned with no pink remaining.", timerMinutes: 8 },
      { text: "Stir in the oats, pepper, coriander, nutmeg, allspice, salt, and stock. Bring to a simmer, cover, and cook over low heat for 35 minutes, stirring now and then, until the oats are tender and the mixture is thick and moist. Add a splash of water if it sticks.", timerMinutes: 35 },
      { text: "While it simmers, boil the rutabaga in salted water for about 25 minutes, and the potatoes in a separate pan for the last 15 to 18 minutes, until both are completely tender.", timerMinutes: 25 },
      { text: "Drain both well. Mash the potatoes with two thirds of the butter and all of the milk. Mash the rutabaga with the rest of the butter and a pinch of pepper.", timerMinutes: 0 },
      { text: "Serve a mound of haggis with the mashed potatoes and mashed rutabaga alongside.", timerMinutes: 0 }
    ],
    tips: [
      "Not keen on liver? Leave it out and use that much more ground lamb; the result is milder but still good.",
      "Rolled oats work in place of steel-cut: reduce the simmer to 20 minutes.",
      "Oats are often processed alongside wheat. Buy certified gluten-free oats and stock if that matters to you."
    ]
  },
  {
    id: "tatacos",
    name: "Tatacos",
    region: "Natlan",
    rarity: 3,
    gameCategory: "Recovery Dishes",
    faithfulness: "Faithful",
    inspiration: "Grilled shrimp tacos",
    description: "Warm corn tortillas with a layer of melted cheese, filled with spiced grilled shrimp, crisp lettuce, and red onion, then finished with a lime sauce. Built the way the game describes: shells first, filling second, sauce on top.",
    difficulty: "Easy",
    prepMinutes: 20,
    cookMinutes: 10,
    servings: 4,
    dietary: [],
    allergens: ["shellfish", "dairy"],
    ingredientSwaps: [
      { teyvat: "Grainfruit", kitchen: "Corn tortillas", note: "Grainfruit is named for the giant grains along its cob, which makes it Teyvat's corn." },
      { teyvat: "Shrimp Meat", kitchen: "Large raw shrimp", note: "A direct match." },
      { teyvat: "Cheese", kitchen: "Monterey Jack or mild cheddar", note: "A direct match; pick a cheese that melts well." },
      { teyvat: "Onion", kitchen: "Red onion", note: "A direct match; red onion is the one in the dish's icon." }
    ],
    ingredients: [
      { amount: 400, unit: "g", item: "large raw shrimp, peeled and deveined" },
      { amount: 1, unit: "tbsp", item: "neutral cooking oil" },
      { amount: 1, unit: "tsp", item: "smoked paprika" },
      { amount: 0.5, unit: "tsp", item: "ground cumin" },
      { amount: 0.5, unit: "tsp", item: "garlic powder" },
      { amount: 0.5, unit: "tsp", item: "fine salt" },
      { amount: 100, unit: "g", item: "sour cream" },
      { amount: 2, unit: "tbsp", item: "lime juice" },
      { amount: 8, unit: "", item: "small corn tortillas" },
      { amount: 100, unit: "g", item: "grated Monterey Jack or mild cheddar" },
      { amount: 100, unit: "g", item: "lettuce, shredded" },
      { amount: 100, unit: "g", item: "red onion, thinly sliced" }
    ],
    steps: [
      { text: "Heat the oven to 200°C (400°F). Toss the shrimp with the oil, paprika, cumin, garlic powder, and salt. In a small bowl, stir the sour cream and lime juice together for the sauce.", timerMinutes: 0 },
      { text: "Lay the tortillas on baking sheets and sprinkle them with the cheese. Bake for 4 to 5 minutes, until the cheese has melted and the edges are just starting to crisp but the tortillas still fold.", timerMinutes: 5 },
      { text: "While the tortillas bake, heat a grill pan or heavy frying pan over high heat. Cook the shrimp for about 2 minutes per side, until lightly charred, pink, and opaque all the way through.", timerMinutes: 4 },
      { text: "Fill each tortilla with lettuce, shrimp, and red onion. Drizzle with the lime sauce and serve at once, with lime wedges for squeezing.", timerMinutes: 0 }
    ],
    tips: [
      "Soak the sliced onion in cold water for 10 minutes to take the sharp edge off.",
      "Avoiding gluten? Check that the tortillas are 100% corn; some brands add wheat.",
      "Shrimp cook fast. Pull them off the heat as soon as they curl into a loose C shape; a tight O means overcooked."
    ]
  },
  {
    id: "saurus-crackers",
    name: "Saurus Crackers",
    region: "Natlan",
    rarity: 3,
    gameCategory: "Recovery Dishes",
    faithfulness: "Adapted",
    inspiration: "Iced chocolate cut-out cookies",
    description: "Crisp, buttery cocoa cookies with a little cornmeal for crunch, cut into dinosaur shapes and decorated with colored icing. Light, sweet, and as fun to decorate as they are to eat.",
    difficulty: "Easy",
    prepMinutes: 30,
    cookMinutes: 105,
    servings: 8,
    dietary: ["vegetarian"],
    allergens: ["gluten", "dairy", "egg"],
    ingredientSwaps: [
      { teyvat: "Flour", kitchen: "All-purpose flour", note: "A direct match." },
      { teyvat: "Cacahuatl", kitchen: "Unsweetened cocoa powder", note: "Cacahuatl seeds are fermented and baked in-game, which is how cacao becomes cocoa." },
      { teyvat: "Grainfruit", kitchen: "Fine cornmeal", note: "Grainfruit is named for the giant grains along its cob, which makes it Teyvat's corn." },
      { teyvat: "Butter", kitchen: "Unsalted butter", note: "A direct match." }
    ],
    ingredients: [
      { amount: 220, unit: "g", item: "all-purpose flour" },
      { amount: 50, unit: "g", item: "fine cornmeal" },
      { amount: 30, unit: "g", item: "unsweetened cocoa powder" },
      { amount: 0.25, unit: "tsp", item: "fine salt" },
      { amount: 150, unit: "g", item: "unsalted butter, softened" },
      { amount: 120, unit: "g", item: "sugar" },
      { amount: 1, unit: "", item: "egg" },
      { amount: 1, unit: "tsp", item: "vanilla extract" },
      { amount: 150, unit: "g", item: "powdered sugar, for the icing" },
      { amount: 2, unit: "tbsp", item: "water, for the icing" }
    ],
    steps: [
      { text: "Whisk the flour, cornmeal, cocoa, and salt together. In another bowl, beat the butter and sugar for 2 to 3 minutes, until pale and fluffy, then beat in the egg and vanilla. Add the dry ingredients and mix just until a dough forms.", timerMinutes: 0 },
      { text: "Shape the dough into two flat discs, wrap them, and chill for 1 hour, until firm.", timerMinutes: 60 },
      { text: "Heat the oven to 175°C (350°F) and line two baking sheets with parchment. Roll the dough between two sheets of parchment to 5 mm (¼ inch) thick, cut out dinosaur shapes, and space them 2 cm apart on the sheets. Re-roll the scraps.", timerMinutes: 0 },
      { text: "Bake for 10 to 12 minutes, until the edges are firm and the surface looks dry. Cool on the sheet for 5 minutes, then move to a rack and cool completely.", timerMinutes: 12 },
      { text: "Stir the icing water into the powdered sugar a little at a time, until the icing is thick enough to pipe. Decorate the cookies and let the icing set for 30 minutes.", timerMinutes: 30 }
    ],
    tips: [
      "Divide the icing into small bowls and tint each with a drop of food coloring for the look of the in-game crackers.",
      "No dinosaur cutter? Cut a paper template and trace around it with a small knife.",
      "Do not taste the raw dough; it contains raw egg and uncooked flour. Baked cookies keep in an airtight tin for a week."
    ]
  },
  {
    id: "xocoatl",
    name: "Xocoatl",
    region: "Natlan",
    rarity: 3,
    gameCategory: "DEF-Boosting Dishes",
    faithfulness: "Faithful",
    inspiration: "Mexican-style spiced hot chocolate",
    description: "Dark hot chocolate steeped with cinnamon and fresh mint, sweetened just enough, and whisked until foamy. A little chili is optional, in keeping with the spices the game mentions.",
    difficulty: "Easy",
    prepMinutes: 5,
    cookMinutes: 20,
    servings: 4,
    dietary: ["vegetarian", "gluten-free"],
    allergens: ["dairy"],
    ingredientSwaps: [
      { teyvat: "Cacahuatl", kitchen: "Dark chocolate and cocoa powder", note: "Cacahuatl seeds are fermented and baked in-game, which is how cacao becomes chocolate." },
      { teyvat: "Mint", kitchen: "Fresh mint leaves", note: "A direct match." },
      { teyvat: "Milk", kitchen: "Whole milk", note: "A direct match." },
      { teyvat: "Sugar", kitchen: "White sugar", note: "A direct match; the game says added sugar is what made the bitter drink popular." }
    ],
    ingredients: [
      { amount: 800, unit: "ml", item: "whole milk" },
      { amount: 1, unit: "", item: "cinnamon stick" },
      { amount: 10, unit: "g", item: "fresh mint leaves" },
      { amount: 2, unit: "tbsp", item: "unsweetened cocoa powder" },
      { amount: 2, unit: "tbsp", item: "sugar" },
      { amount: 0.25, unit: "tsp", item: "mild chili powder (optional)" },
      { amount: 100, unit: "g", item: "dark chocolate (about 70% cocoa), chopped" },
      { amount: 0.5, unit: "tsp", item: "vanilla extract" }
    ],
    steps: [
      { text: "Put the milk, cinnamon stick, and mint leaves in a saucepan. Heat over medium heat until steaming, with small bubbles at the edge, but do not let it boil. Take it off the heat, cover, and steep for 10 minutes.", timerMinutes: 10 },
      { text: "Strain out the mint and cinnamon and return the milk to the pan.", timerMinutes: 0 },
      { text: "Whisk in the cocoa, sugar, chili powder, and a pinch of salt, then add the chocolate. Warm over low heat for 3 to 4 minutes, whisking constantly, until the chocolate has melted and the drink is smooth.", timerMinutes: 4 },
      { text: "Take the pan off the heat, add the vanilla, and whisk hard for 30 seconds, until foamy. Pour into mugs and top each with a mint leaf.", timerMinutes: 0 }
    ],
    tips: [
      "A milk frother or immersion blender makes a thicker foam than a whisk.",
      "For a dairy-free version, use oat milk and check that the chocolate contains no milk.",
      "Taste before serving; darker chocolate may want another spoonful of sugar."
    ]
  },
  {
    id: "medovik",
    name: "Medovik",
    region: "Snezhnaya",
    rarity: 3,
    gameCategory: "Recovery Dishes",
    faithfulness: "Faithful",
    inspiration: "Medovik (Russian honey cake)",
    description: "Eight thin honey-caramel layers stacked with tangy sour cream frosting and coated in crumbs. It needs a night in the fridge, during which the crisp layers soften into a tender cake.",
    difficulty: "Hard",
    prepMinutes: 60,
    cookMinutes: 530,
    servings: 10,
    dietary: ["vegetarian"],
    allergens: ["gluten", "dairy", "egg"],
    ingredientSwaps: [
      { teyvat: "Honey", kitchen: "Honey", note: "A direct match; it flavors the dough and gives the layers their color." },
      { teyvat: "Flour", kitchen: "All-purpose flour", note: "A direct match." },
      { teyvat: "Bird Egg", kitchen: "Eggs", note: "A direct match." },
      { teyvat: "Smetana", kitchen: "Full-fat sour cream", note: "Smetana is the real name for Eastern European sour cream; use the highest-fat sour cream you can find." }
    ],
    ingredients: [
      { amount: 100, unit: "g", item: "unsalted butter" },
      { amount: 100, unit: "g", item: "honey" },
      { amount: 150, unit: "g", item: "sugar" },
      { amount: 1, unit: "tsp", item: "baking soda" },
      { amount: 3, unit: "", item: "eggs, beaten" },
      { amount: 0.25, unit: "tsp", item: "fine salt" },
      { amount: 420, unit: "g", item: "all-purpose flour, plus extra for rolling" },
      { amount: 800, unit: "g", item: "full-fat sour cream" },
      { amount: 120, unit: "g", item: "powdered sugar" },
      { amount: 1, unit: "tsp", item: "vanilla extract" }
    ],
    steps: [
      { text: "Melt the butter, honey, and sugar in a large saucepan over medium-low heat, stirring, until the sugar dissolves and the mixture just starts to simmer. Take it off the heat and stir in the baking soda; it will foam up and turn golden. Let it cool for 5 minutes.", timerMinutes: 5 },
      { text: "Whisk in the beaten eggs a little at a time, whisking constantly so they do not scramble. Stir in the salt and flour to make a soft, slightly sticky dough. Divide it into 8 equal pieces and keep them covered; the dough is easiest to roll while still warm.", timerMinutes: 0 },
      { text: "Heat the oven to 180°C (350°F). On floured parchment, roll one piece of dough into a thin round a little larger than 20 cm (8 inches). Bake it on the parchment for 4 to 5 minutes, until deep golden. While it is still hot, trim it to a neat circle using a 20 cm plate as a guide. Repeat with every piece, keeping the trimmings.", timerMinutes: 5 },
      { text: "Bake the trimmings for 3 more minutes, until dry. Once cool, crush them into fine crumbs.", timerMinutes: 3 },
      { text: "Whisk the sour cream, powdered sugar, and vanilla together until smooth.", timerMinutes: 0 },
      { text: "Stack the layers on a plate, spreading a generous spoonful of frosting over each one. Cover the top and sides with the rest of the frosting and press the crumbs all over.", timerMinutes: 0 },
      { text: "Refrigerate for at least 8 hours, or overnight, so the layers soften into cake.", timerMinutes: 480 }
    ],
    tips: [
      "The game finishes the cake with a drizzle of honey syrup: warm a spoonful of honey with a splash of water and drizzle it over each slice.",
      "The layers bake very fast and burn easily. Watch the first one closely to learn your oven's timing.",
      "Keep the cake refrigerated and eat it within 4 days."
    ]
  },
  {
    id: "snezhnaya-shashliks",
    name: "Snezhnaya Shashliks",
    region: "Snezhnaya",
    rarity: 3,
    gameCategory: "Adventurer's Dishes",
    faithfulness: "Adapted",
    inspiration: "Shashlik (grilled marinated meat skewers)",
    description: "Big chunks of pork and chicken marinated with onion and tart pomegranate juice, then grilled on metal skewers until charred outside and juicy within. Quick-pickled beets on the side cut through the richness.",
    difficulty: "Medium",
    prepMinutes: 205,
    cookMinutes: 25,
    servings: 4,
    dietary: ["gluten-free", "dairy-free"],
    allergens: [],
    ingredientSwaps: [
      { teyvat: "Raw Meat", kitchen: "Pork shoulder", note: "Raw Meat is Teyvat's generic red meat; pork shoulder stays juicy over high heat." },
      { teyvat: "Fowl", kitchen: "Boneless chicken thighs", note: "Fowl is Teyvat's all-purpose poultry; thighs handle the grill better than breast." },
      { teyvat: "Rimecurrant", kitchen: "Pomegranate juice", note: "Rimecurrant is a richly flavored berry with no real-world twin; fruity, tart pomegranate juice is a traditional shashlik marinade." },
      { teyvat: "Red Beet", kitchen: "Cooked beets, quick-pickled", note: "A direct match, served on the side as in the dish's icon." }
    ],
    ingredients: [
      { amount: 500, unit: "g", item: "boneless pork shoulder, cut into 4 cm (1½ inch) chunks" },
      { amount: 500, unit: "g", item: "boneless, skinless chicken thighs, cut into 4 cm (1½ inch) chunks" },
      { amount: 300, unit: "g", item: "onions, sliced into rings" },
      { amount: 200, unit: "ml", item: "unsweetened pomegranate juice" },
      { amount: 2, unit: "tbsp", item: "neutral cooking oil" },
      { amount: 2, unit: "tsp", item: "fine salt" },
      { amount: 1, unit: "tsp", item: "ground black pepper" },
      { amount: 1, unit: "tsp", item: "ground coriander" },
      { amount: 250, unit: "g", item: "cooked beets, sliced" },
      { amount: 2, unit: "tbsp", item: "white wine vinegar" },
      { amount: 1, unit: "tsp", item: "sugar" },
      { amount: 8, unit: "", item: "metal skewers" }
    ],
    steps: [
      { text: "Put the pork and chicken in two separate bowls. Divide the onions, pomegranate juice, oil, salt, pepper, and coriander between them and mix well, squeezing the onions to release their juice. Cover and refrigerate for at least 3 hours, or up to 12.", timerMinutes: 180 },
      { text: "Toss the sliced beets with the vinegar, sugar, and a pinch of salt. Chill until serving.", timerMinutes: 0 },
      { text: "Thread the pork and the chicken onto separate skewers, because they cook at different speeds, leaving a small gap between pieces. Throw away the marinade and onions.", timerMinutes: 0 },
      { text: "Heat a grill to medium-high. Grill the skewers, turning every few minutes: about 15 minutes for the chicken, until it reaches 74°C (165°F), and about 18 minutes for the pork, until it reaches 63°C (145°F).", timerMinutes: 18 },
      { text: "Rest the skewers for 5 minutes, then serve with the pickled beets.", timerMinutes: 5 }
    ],
    tips: [
      "No grill? Use the broiler on high with the rack about 10 cm (4 inches) from the heat.",
      "Wash your hands, the bowls, and anything else that touched raw chicken before handling cooked food.",
      "Charcoal is traditional, and lettuce or flatbread on the side rounds out the plate."
    ]
  },
  {
    id: "zharkoye",
    name: "Zharkoye",
    region: "Snezhnaya",
    rarity: 3,
    gameCategory: "Recovery Dishes",
    faithfulness: "Faithful",
    inspiration: "Zharkoye (Russian beef and potato pot roast)",
    description: "Cubes of beef, potato, and carrot braised slowly in the oven until the beef falls apart, then finished with a spoonful of cold sour cream. Simple, and mostly hands-off.",
    difficulty: "Easy",
    prepMinutes: 20,
    cookMinutes: 125,
    servings: 4,
    dietary: [],
    allergens: ["dairy"],
    ingredientSwaps: [
      { teyvat: "Raw Meat", kitchen: "Beef chuck", note: "Raw Meat is Teyvat's generic red meat; chuck turns tender over a long braise." },
      { teyvat: "Potato", kitchen: "Waxy potatoes", note: "A direct match; waxy potatoes hold their shape in the pot." },
      { teyvat: "Carrot", kitchen: "Carrots", note: "A direct match." },
      { teyvat: "Smetana", kitchen: "Sour cream", note: "Smetana is the real name for Eastern European sour cream; the game adds it at the end, and so does this recipe." }
    ],
    ingredients: [
      { amount: 600, unit: "g", item: "beef chuck, cut into 3 cm (1¼ inch) cubes" },
      { amount: 1, unit: "tsp", item: "fine salt" },
      { amount: 0.5, unit: "tsp", item: "ground black pepper" },
      { amount: 2, unit: "tbsp", item: "neutral cooking oil" },
      { amount: 150, unit: "g", item: "onion, chopped" },
      { amount: 2, unit: "tsp", item: "finely chopped garlic" },
      { amount: 1, unit: "tbsp", item: "tomato paste" },
      { amount: 500, unit: "ml", item: "beef stock" },
      { amount: 2, unit: "", item: "bay leaves" },
      { amount: 600, unit: "g", item: "waxy potatoes, peeled and cut into 3 cm (1¼ inch) chunks" },
      { amount: 200, unit: "g", item: "carrots, thickly sliced" },
      { amount: 120, unit: "g", item: "sour cream, to serve" }
    ],
    steps: [
      { text: "Heat the oven to 170°C (340°F). Pat the beef dry and season it with the salt and pepper. Heat the oil in an ovenproof pot over medium-high heat and brown the beef in two batches, about 6 minutes per batch. Set it aside.", timerMinutes: 6 },
      { text: "Lower the heat to medium and cook the onion in the same pot for 5 minutes, until soft. Add the garlic and tomato paste and stir for 1 minute.", timerMinutes: 5 },
      { text: "Return the beef to the pot with the stock and bay leaves, scraping up the browned bits from the bottom. Bring to a simmer, cover, and bake for 1 hour.", timerMinutes: 60 },
      { text: "Stir in the potatoes and carrots, cover again, and bake for 45 minutes more, until the beef is fork-tender and the vegetables are cooked through.", timerMinutes: 45 },
      { text: "Take out the bay leaves and taste for salt. Serve in bowls, each topped with a spoonful of the sour cream.", timerMinutes: 0 }
    ],
    tips: [
      "In the game the pot is sealed with a dough lid that bakes into a bread cap. A tight lid does the same job; serve crusty bread alongside instead.",
      "Chopped fresh dill over the top is the classic finish.",
      "Tastes even better the next day. Refrigerate within 2 hours and reheat until steaming hot."
    ]
  }
]);
