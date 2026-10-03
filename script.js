/**
 * Genshin Cuisine - Recipe Book Controller
 * Vanilla ES6+, zero dependencies, no globals. Everything rendered here comes
 * from GENSHIN_RECIPES (recipes.js), so adding a recipe never touches this file.
 *
 * Systems:
 * 1. Quantity formatting (servings scaler, metric/US units, fractions)
 * 2. Favorites (localStorage)
 * 3. Recipe browser (filters, live search, cards)
 * 4. Recipe detail view
 * 5. Cook Mode (one step at a time, timer, wake lock)
 * 6. Hash router, delegated events, contact form
 */

(() => {
  'use strict';

  const recipes = typeof GENSHIN_RECIPES === 'undefined' ? [] : GENSHIN_RECIPES;
  const byId = new Map(recipes.map((r) => [r.id, r]));

  const $ = (selector) => document.querySelector(selector);
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

  const grid = $('#recipe-grid');
  const recipeView = $('#recipe-view');
  const searchInput = $('#search-input');
  const cookDialog = $('#cook-mode');
  const menuToggle = $('.mobile-nav-toggle');

  // ==========================================================================
  // System 1: Quantity Formatting
  // ==========================================================================
  const FRACTIONS = [[0, ''], [1 / 4, '¼'], [1 / 3, '⅓'], [1 / 2, '½'], [2 / 3, '⅔'], [3 / 4, '¾'], [1, '']];

  // Nearest kitchen-friendly fraction, e.g. 1.5 -> "1½". Never rounds down to nothing.
  const toFraction = (n) => {
    const whole = Math.floor(n);
    const rest = n - whole;
    const [value, glyph] = FRACTIONS.reduce((best, f) => (Math.abs(f[0] - rest) < Math.abs(best[0] - rest) ? f : best));
    const rounded = whole + (value === 1 ? 1 : 0);
    return rounded || glyph ? `${rounded || ''}${glyph}` : '⅛';
  };

  const roundMetric = (n) => {
    if (n >= 100) return Math.round(n / 5) * 5;
    return n >= 10 ? Math.round(n) : Math.round(n * 10) / 10;
  };

  // Recipes are authored in metric; weights and volumes convert to US, spoons and counts stay as they are.
  const formatQuantity = (amount, unit, us) => {
    if (unit === 'kg') return formatQuantity(amount * 1000, 'g', us);
    if (unit === 'l') return formatQuantity(amount * 1000, 'ml', us);
    if (unit === 'g') {
      if (!us) return amount >= 1000 ? `${+(amount / 1000).toFixed(2)} kg` : `${roundMetric(amount)} g`;
      const oz = amount / 28.35;
      return oz >= 16 ? `${toFraction(oz / 16)} lb` : `${toFraction(oz)} oz`;
    }
    if (unit === 'ml') {
      if (!us) return amount >= 1000 ? `${+(amount / 1000).toFixed(2)} l` : `${roundMetric(amount)} ml`;
      if (amount < 15) return `${toFraction(amount / 4.93)} tsp`;
      if (amount < 60) return `${toFraction(amount / 14.79)} tbsp`;
      const cups = amount / 236.6;
      return cups < 4 ? `${toFraction(cups)} cup${cups > 1.1 ? 's' : ''}` : `${toFraction(cups / 4)} qt`;
    }
    return `${toFraction(amount)} ${unit}`.trim();
  };

  const formatMinutes = (m) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} hr${m % 60 ? ` ${m % 60} min` : ''}`);

  console.assert(
    toFraction(1.5) === '1½' && toFraction(0.34) === '⅓' && toFraction(0.97) === '1' && toFraction(0.02) === '⅛'
      && formatQuantity(1.5, 'kg', false) === '1.5 kg' && formatQuantity(1.5, 'kg', true) === '3⅓ lb'
      && formatQuantity(160, 'ml', true) === '⅔ cup' && formatQuantity(3, 'l', true) === '3¼ qt'
      && formatQuantity(0.75, 'tsp', true) === '¾ tsp' && formatMinutes(100) === '1 hr 40 min',
    'Genshin Cuisine: quantity formatting self-check failed'
  );

  // ==========================================================================
  // System 2: Favorites (works normally if storage is unavailable)
  // ==========================================================================
  const FAVORITES_KEY = 'genshin-cuisine:favorites';

  const loadFavorites = () => {
    try {
      return new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []);
    } catch {
      return new Set();
    }
  };

  const favorites = loadFavorites();
  const heartSrc = (on) => `./assets/svg/${on ? 'heart-filled' : 'heart'}.svg`;

  const toggleFavorite = (id) => {
    const on = !favorites.has(id);
    if (on) favorites.add(id); else favorites.delete(id);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    } catch {
      // Storage unavailable: the favorite still applies for this visit.
    }
    document.querySelectorAll('[data-action="fav"]').forEach((button) => {
      if (button.dataset.id !== id) return;
      button.setAttribute('aria-pressed', String(on));
      button.querySelector('img').src = heartSrc(on);
    });
    if (state.favoritesOnly) renderGrid();
  };

  // ==========================================================================
  // Shared HTML Builders
  // ==========================================================================
  const dishIcon = (r, extraClass = '') => `<img class="dish-icon ${extraClass}" src="./assets/icons/${esc(r.id)}.png" alt="${esc(r.name)}" width="256" height="256">`;
  const stars = (r) => `<span class="stars" role="img" aria-label="In-game rarity: ${r.rarity} of 5 stars">${'★'.repeat(r.rarity)}</span>`;
  const regionBadge = (r) => `<span class="tag region-badge" data-region="${esc(r.region)}">${esc(r.region)}</span>`;
  const faithBadge = (r) => `<span class="tag faith-badge" data-faith="${esc(r.faithfulness)}">${esc(r.faithfulness)}</span>`;

  const favButton = (r) => {
    const on = favorites.has(r.id);
    return `<button type="button" class="fav-btn" data-action="fav" data-id="${esc(r.id)}" aria-pressed="${on}" aria-label="Favorite ${esc(r.name)}"><img src="${heartSrc(on)}" alt="" width="22" height="22"></button>`;
  };

  // ==========================================================================
  // System 3: Recipe Browser (filters, search, cards)
  // ==========================================================================
  const state = { region: 'All', difficulty: 'All', dietary: 'All', query: '', favoritesOnly: false };

  const searchText = new Map(recipes.map((r) => [
    r.id,
    [r.name, r.inspiration, ...r.ingredients.map((i) => i.item), ...r.ingredientSwaps.map((s) => s.teyvat)].join(' ').toLowerCase(),
  ]));

  const renderFilters = () => {
    const groups = {
      region: [...new Set(recipes.map((r) => r.region))],
      difficulty: ['Easy', 'Medium', 'Hard'].filter((d) => recipes.some((r) => r.difficulty === d)),
      dietary: [...new Set(recipes.flatMap((r) => r.dietary))].sort(),
    };
    $('#filters').innerHTML = Object.entries(groups).map(([key, values]) => `
      <div class="filter-group" role="group" aria-label="Filter by ${key}">
        <span class="filter-label">${key}</span>
        ${['All', ...values].map((v) => `<button type="button" class="filter-btn" data-action="filter" data-filter="${key}" data-value="${esc(v)}" aria-pressed="${state[key] === v}">${esc(v)}</button>`).join('')}
      </div>`).join('');
  };

  const syncFilters = () => {
    document.querySelectorAll('.filter-btn').forEach((button) => {
      button.setAttribute('aria-pressed', String(state[button.dataset.filter] === button.dataset.value));
    });
  };

  const card = (r) => `
    <article class="recipe-card">
      <a class="card-link" href="#/recipe/${esc(r.id)}">
        ${dishIcon(r)}
        <h3 class="card-title">${esc(r.name)}</h3>
      </a>
      ${favButton(r)}
      <p class="tag-row">${regionBadge(r)}${faithBadge(r)}</p>
      <p class="card-meta">${stars(r)}<span>${esc(r.difficulty)}</span><span>${formatMinutes(r.prepMinutes + r.cookMinutes)}</span></p>
    </article>`;

  const renderGrid = () => {
    const shown = recipes.filter((r) => (!state.favoritesOnly || favorites.has(r.id))
      && (state.region === 'All' || r.region === state.region)
      && (state.difficulty === 'All' || r.difficulty === state.difficulty)
      && (state.dietary === 'All' || r.dietary.includes(state.dietary))
      && searchText.get(r.id).includes(state.query));

    grid.innerHTML = shown.map(card).join('');
    $('#result-count').textContent = `${shown.length || 'No'} recipe${shown.length === 1 ? '' : 's'}`;
    $('#empty-state').hidden = shown.length > 0;
    $('#empty-text').textContent = state.favoritesOnly && !favorites.size
      ? 'No favorites yet. Tap the heart on any recipe to save it here.'
      : 'Nothing matches that. Try a different search, or clear a filter.';
  };

  // Hero: a backdrop built from the dish icons, plus one shortcut per region (shown with that region's first dish).
  const renderHero = () => {
    if (!recipes.length) return;
    // ponytail: 72 tiles covers screens up to roughly 2000px wide; raise the count if the backdrop shows gaps on larger ones.
    $('#hero-bg').innerHTML = Array.from({ length: 72 }, (_, i) => {
      const r = recipes[i % recipes.length];
      return `<img class="dish-icon" src="./assets/icons/${esc(r.id)}.png" alt="" width="256" height="256">`;
    }).join('');

    const firstOfRegion = new Map();
    recipes.forEach((r) => {
      if (!firstOfRegion.has(r.region)) firstOfRegion.set(r.region, r);
    });
    $('#hero-regions').innerHTML = [...firstOfRegion].map(([region, r]) => `
      <button type="button" class="hero-region" data-action="hero-region" data-value="${esc(region)}" aria-label="Browse ${esc(region)} recipes">
        ${dishIcon(r)}<span>${esc(region)}</span>
      </button>`).join('');
  };

  const clearFilters = () => {
    Object.assign(state, { region: 'All', difficulty: 'All', dietary: 'All', query: '' });
    searchInput.value = '';
    syncFilters();
    renderGrid();
  };

  // ==========================================================================
  // System 4: Recipe Detail View
  // ==========================================================================
  const FAITH_NOTES = {
    Faithful: 'The in-game dish closely matches a real dish.',
    Adapted: 'There is a clear real dish underneath, with some ingredients or methods substituted.',
    Reimagined: 'There is no real counterpart, so this is a creative take on how the dish looks and tastes in-game.',
  };

  let current = null;
  let servings = 1;
  let units = 'metric';

  // Updates amounts in place so checked-off ingredients stay checked.
  const updateAmounts = () => {
    const factor = servings / current.servings;
    recipeView.querySelectorAll('.ing-amount').forEach((el, i) => {
      const { amount, unit } = current.ingredients[i];
      el.textContent = amount ? formatQuantity(amount * factor, unit, units === 'us') : '';
    });
    $('#servings-count').textContent = `${servings} serving${servings === 1 ? '' : 's'}`;
    recipeView.querySelectorAll('[data-action="units"]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.units === units));
    });
  };

  const backLink = '<a class="back-link" href="#/recipes">&larr; Back to recipes</a>';

  const renderRecipe = (r) => {
    recipeView.innerHTML = `
      ${backLink}
      <header class="recipe-header">
        ${dishIcon(r, 'recipe-icon')}
        <div class="recipe-summary">
          <h1 id="recipe-title" class="recipe-title" tabindex="-1">${esc(r.name)}</h1>
          <div class="recipe-meta">
            <p class="tag-row">${regionBadge(r)}${stars(r)}<span class="tag">${esc(r.gameCategory)}</span></p>
            <p>${esc(r.description)}</p>
            <p>${faithBadge(r)} ${FAITH_NOTES[r.faithfulness] || ''}</p>
            <p><strong>Real-world inspiration:</strong> ${esc(r.inspiration)}</p>
            <dl class="recipe-facts">
              <div><dt>Prep</dt><dd>${formatMinutes(r.prepMinutes)}</dd></div>
              <div><dt>Cook</dt><dd>${formatMinutes(r.cookMinutes)}</dd></div>
              <div><dt>Total</dt><dd>${formatMinutes(r.prepMinutes + r.cookMinutes)}</dd></div>
              <div><dt>Difficulty</dt><dd>${esc(r.difficulty)}</dd></div>
            </dl>
            <p class="tag-row">
              ${r.dietary.map((d) => `<span class="tag tag-diet">${esc(d)}</span>`).join('')}
              ${r.allergens.map((a) => `<span class="tag tag-allergen">Contains ${esc(a)}</span>`).join('')}
            </p>
            <p class="recipe-actions">
              <button type="button" class="btn btn-primary" data-action="cook" data-step="0">Start Cook Mode</button>
              <button type="button" class="btn" data-action="print"><img src="./assets/svg/print.svg" alt="" width="18" height="18">Print</button>
              ${favButton(r)}
            </p>
          </div>
        </div>
      </header>

      <section class="swap-section" aria-labelledby="swap-title">
        <h2 id="swap-title">Teyvat &rarr; Kitchen</h2>
        ${r.ingredientSwaps.length ? `
        <table class="swap-table">
          <thead><tr><th scope="col">In Teyvat</th><th scope="col">In your kitchen</th><th scope="col">Why</th></tr></thead>
          <tbody>
            ${r.ingredientSwaps.map((s) => `<tr><th scope="row">${esc(s.teyvat)}</th><td>${esc(s.kitchen)}</td><td>${esc(s.note)}</td></tr>`).join('')}
          </tbody>
        </table>` : '<p>This dish has no in-game recipe, so there are no Teyvat ingredients to translate.</p>'}
      </section>

      <div class="recipe-body">
        <aside class="ingredients-panel" aria-labelledby="ingredients-title">
          <h2 id="ingredients-title">Ingredients</h2>
          <div class="scaler">
            <button type="button" class="btn btn-round" data-action="servings" data-delta="-1" aria-label="Fewer servings">&minus;</button>
            <output id="servings-count" class="servings-count" aria-live="polite"></output>
            <button type="button" class="btn btn-round" data-action="servings" data-delta="1" aria-label="More servings">+</button>
          </div>
          <div class="unit-toggle" role="group" aria-label="Measurement units">
            <button type="button" class="filter-btn" data-action="units" data-units="metric">Metric</button>
            <button type="button" class="filter-btn" data-action="units" data-units="us">US</button>
          </div>
          <ul class="ingredient-list">
            ${r.ingredients.map((ing) => `<li><label><input type="checkbox"><span><strong class="ing-amount"></strong> ${esc(ing.item)}</span></label></li>`).join('')}
          </ul>
        </aside>

        <div class="recipe-method">
          <section aria-labelledby="steps-title">
            <h2 id="steps-title">Steps</h2>
            <ol class="step-list">
              ${r.steps.map((s, i) => `<li>${esc(s.text)}${s.timerMinutes > 0 ? ` <button type="button" class="btn btn-timer" data-action="cook" data-step="${i}" aria-label="Open step ${i + 1} in Cook Mode with a ${formatMinutes(s.timerMinutes)} timer"><img src="./assets/svg/timer.svg" alt="" width="18" height="18">${formatMinutes(s.timerMinutes)} timer</button>` : ''}</li>`).join('')}
            </ol>
          </section>
          ${r.tips.length ? `
          <section class="tips-section" aria-labelledby="tips-title">
            <h2 id="tips-title">Tips</h2>
            <ul>${r.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </section>` : ''}
        </div>
      </div>`;
    updateAmounts();
  };

  // ==========================================================================
  // System 5: Cook Mode
  // ==========================================================================
  // ponytail: one timer, tied to the step on screen; changing step resets it.
  // Give each step its own timer state if people need several running at once.
  const timer = { remaining: 0, endAt: 0, id: 0 };
  let cookStep = 0;
  let wakeLock = null;

  const stopTimer = () => {
    clearInterval(timer.id);
    timer.id = 0;
  };

  const renderTimer = () => {
    const minutes = String(Math.floor(timer.remaining / 60)).padStart(2, '0');
    const seconds = String(timer.remaining % 60).padStart(2, '0');
    $('#timer-display').textContent = `${minutes}:${seconds}`;
    $('#timer-toggle').textContent = timer.id ? 'Pause' : 'Start';
  };

  const resetTimer = () => {
    stopTimer();
    timer.remaining = (current.steps[cookStep].timerMinutes || 0) * 60;
    $('#cook-timer').classList.remove('timer-done');
    $('#timer-status').textContent = '';
    renderTimer();
  };

  const beep = () => {
    try {
      const audio = new AudioContext();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.frequency.value = 880;
      gain.gain.value = 0.2;
      oscillator.connect(gain).connect(audio.destination);
      oscillator.onended = () => audio.close();
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.6);
    } catch {
      // No audio available: the visual alert and live region still fire.
    }
  };

  // Counts from a fixed end time, so a throttled background tab cannot make the timer drift.
  const tick = () => {
    timer.remaining = Math.max(0, Math.round((timer.endAt - Date.now()) / 1000));
    if (!timer.remaining) {
      stopTimer();
      $('#cook-timer').classList.add('timer-done');
      $('#timer-status').textContent = `Time is up for step ${cookStep + 1}!`;
      beep();
    }
    renderTimer();
  };

  const toggleTimer = () => {
    if (timer.id) {
      stopTimer();
    } else {
      if (!timer.remaining) resetTimer();
      timer.endAt = Date.now() + timer.remaining * 1000;
      timer.id = setInterval(tick, 250);
    }
    renderTimer();
  };

  const showCookStep = (index) => {
    cookStep = index;
    const step = current.steps[cookStep];
    $('#cook-progress').textContent = `Step ${cookStep + 1} of ${current.steps.length}`;
    $('#cook-step').textContent = step.text;
    $('#cook-timer').hidden = !(step.timerMinutes > 0);
    $('#cook-prev').disabled = cookStep === 0;
    $('#cook-next').disabled = cookStep === current.steps.length - 1;
    resetTimer();
  };

  const moveCookStep = (delta) => {
    const next = Math.min(Math.max(cookStep + delta, 0), current.steps.length - 1);
    if (next !== cookStep) showCookStep(next);
  };

  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch {
      // Wake Lock unsupported or refused: Cook Mode works without it.
    }
  };

  const openCookMode = (step) => {
    if (!current) return;
    $('#cook-title').textContent = current.name;
    cookDialog.showModal();
    showCookStep(step);
    requestWakeLock();
  };

  cookDialog.addEventListener('close', () => {
    stopTimer();
    if (wakeLock) wakeLock.release().catch(() => {});
    wakeLock = null;
  });

  cookDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') moveCookStep(1);
    if (event.key === 'ArrowLeft') moveCookStep(-1);
  });

  // The browser drops the wake lock whenever the tab is hidden; take it back on return.
  document.addEventListener('visibilitychange', () => {
    if (cookDialog.open && document.visibilityState === 'visible') requestWakeLock();
  });

  // ==========================================================================
  // System 6: Router, Navigation, and Delegated Events
  // ==========================================================================
  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    $('#primary-nav-menu').classList.toggle('open', open);
  };

  // Header state follows what is on screen, not the last link clicked: the highlighted nav link is the
  // home section currently in view, and the header is blurred glass only while it overlaps the hero.
  const HOME_SECTIONS = ['hero', 'recipes', 'about', 'contact'];

  const syncHeader = () => {
    const view = document.body.dataset.view;
    let currentHref = view === 'favorites' ? '#/favorites' : '';
    if (view === 'home') {
      // The current section is the last one whose top edge has passed the upper third of the screen.
      const line = window.innerHeight * 0.35;
      const id = HOME_SECTIONS.filter((s) => document.getElementById(s).getBoundingClientRect().top <= line).pop();
      currentHref = !id || id === 'hero' ? '#/' : `#/${id}`;
    }
    document.querySelectorAll('.nav-link').forEach((link) => {
      if (link.getAttribute('href') === currentHref) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const overHero = view === 'home' && $('#hero').getBoundingClientRect().bottom > $('.site-header').offsetHeight;
    document.body.classList.toggle('over-hero', overHero);
  };

  // Routes: #/ (home), #/recipes, #/about, #/contact (home sections), #/favorites, #/recipe/<id>
  const route = () => {
    const [view = '', id] = location.hash.replace(/^#\/?/, '').split('/');
    setMenu(false);
    if (cookDialog.open) cookDialog.close();

    if (view === 'recipe') {
      current = byId.get(id) || null;
      document.body.dataset.view = 'recipe';
      if (current) {
        servings = current.servings;
        renderRecipe(current);
      } else {
        recipeView.innerHTML = `${backLink}<h1 id="recipe-title" class="recipe-title" tabindex="-1">Recipe not found</h1><p>That dish is not in the recipe book yet.</p>`;
      }
      document.title = `${current ? current.name : 'Recipe not found'} | Genshin Cuisine`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      $('#recipe-title').focus({ preventScroll: true });
      syncHeader();
      return;
    }

    current = null;
    state.favoritesOnly = view === 'favorites';
    document.body.dataset.view = state.favoritesOnly ? 'favorites' : 'home';
    $('#browser-title').textContent = state.favoritesOnly ? 'Favorites' : 'All Recipes';
    document.title = `${state.favoritesOnly ? 'Favorites' : 'Cook the Flavors of Teyvat'} | Genshin Cuisine`;
    renderGrid();

    const section = state.favoritesOnly ? null : document.getElementById(view);
    if (section) section.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
    syncHeader();
  };

  const actions = {
    'menu-toggle': () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'),
    fav: (el) => toggleFavorite(el.dataset.id),
    filter: (el) => {
      state[el.dataset.filter] = el.dataset.value;
      syncFilters();
      renderGrid();
    },
    'clear-filters': clearFilters,
    'hero-region': (el) => {
      state.region = el.dataset.value;
      syncFilters();
      if (location.hash === '#/recipes') route();
      else location.hash = '#/recipes';
    },
    servings: (el) => {
      servings = Math.min(Math.max(servings + Number(el.dataset.delta), 1), 48);
      updateAmounts();
    },
    units: (el) => {
      units = el.dataset.units;
      updateAmounts();
    },
    print: () => window.print(),
    cook: (el) => openCookMode(Number(el.dataset.step)),
    'cook-close': () => cookDialog.close(),
    'cook-prev': () => moveCookStep(-1),
    'cook-next': () => moveCookStep(1),
    'timer-toggle': toggleTimer,
    'timer-reset': resetTimer,
  };

  document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-action]');
    if (control) {
      actions[control.dataset.action](control);
      return;
    }
    // Clicking a link to the route you are already on fires no hashchange, so re-run it (e.g. to scroll back to the grid).
    const link = event.target.closest('a[href^="#/"]');
    if (link && link.getAttribute('href') === location.hash) route();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  // Live search: the field sits beside the grid, so results update in place.
  searchInput.addEventListener('input', () => {
    state.query = searchInput.value.trim().toLowerCase();
    renderGrid();
  });
  $('#search-form').addEventListener('submit', (event) => event.preventDefault());

  window.addEventListener('scroll', syncHeader, { passive: true });
  window.addEventListener('resize', syncHeader);

  // The browser has already run the form's built-in validation by the time submit fires.
  $('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const field = (name) => form.elements[name].value.trim();
    const subject = `Recipe suggestion: ${field('dish')}`;
    const body = `${field('message')}\n\nFrom: ${field('name')} <${field('email')}>`;
    location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('#contact-status').textContent = 'Your email app should open with the message ready to send.';
  });

  // Missing dish icon: swap in the neutral placeholder (error events do not bubble, hence capture).
  document.addEventListener('error', (event) => {
    const img = event.target;
    if (img instanceof HTMLImageElement && img.classList.contains('dish-icon') && !img.dataset.fallback) {
      img.dataset.fallback = 'true';
      img.src = './assets/svg/placeholder.svg';
    }
  }, true);

  // ==========================================================================
  // Initialization
  // ==========================================================================
  renderHero();
  renderFilters();
  window.addEventListener('hashchange', route);
  route();
})();
