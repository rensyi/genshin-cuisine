/**
 * Genshin Cuisine - Interactive Platform Controller
 * Architecture: Clean, Modular ES6+ JavaScript (Zero External Dependencies)
 * 
 * Interactive Systems Implemented:
 * 1. Mobile Hamburger Menu (Full ARIA & Keyboard Accessibility)
 * 2. Region Filter Toggle (Dynamic Menu Card Filtering & State Sync)
 * 3. Mora Cart Calculator (Item Tracking, Quantity Updates & Real-Time PHP Subtotal)
 */

(() => {
  'use strict';

  // ==========================================================================
  // Helper: Currency Formatter (Philippine Peso ₱ PHP)
  // ==========================================================================
  const formatPHP = (amount) => {
    return Number(amount).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // ==========================================================================
  // System 1: Mobile Hamburger Menu Module
  // ==========================================================================
  const initMobileNavigation = () => {
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    const primaryNavMenu = document.getElementById('primary-nav-menu');

    if (!toggleButton || !primaryNavMenu) {
      return;
    }

    const setMenuState = (isOpen) => {
      toggleButton.setAttribute('aria-expanded', String(isOpen));
      primaryNavMenu.classList.toggle('open', isOpen);
    };

    // Toggle button click handler
    toggleButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isCurrentlyExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isCurrentlyExpanded);
    });

    // Close menu when navigation anchor links are activated
    const navigationAnchors = primaryNavMenu.querySelectorAll('a');
    navigationAnchors.forEach((anchor) => {
      anchor.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    // Close menu when clicking outside of the navbar
    document.addEventListener('click', (event) => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      if (isExpanded && !primaryNavMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        setMenuState(false);
      }
    });

    // Keyboard Accessibility: Close on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          setMenuState(false);
          toggleButton.focus();
        }
      }
    });

    // Reset mobile menu state on viewport resize past mobile breakpoint (1024px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        setMenuState(false);
      }
    });
  };

  // ==========================================================================
  // System 2: Region Filter Toggle Module
  // ==========================================================================
  const initRegionFilterToggle = () => {
    const filterTabs = document.querySelectorAll('.region-tab');
    const dishCards = document.querySelectorAll('.dish-card');
    const navRegionLinks = document.querySelectorAll('[data-nav-region]');

    if (!filterTabs.length || !dishCards.length) {
      return;
    }

    let activeRegion = 'all';

    const applyFilter = (targetRegion) => {
      activeRegion = targetRegion.toLowerCase();

      // 1. Update ARIA and CSS active states across filter tabs
      filterTabs.forEach((tab) => {
        const tabRegion = (tab.getAttribute('data-region') || '').toLowerCase();
        const isMatch = tabRegion === activeRegion;

        tab.classList.toggle('active', isMatch);
        tab.setAttribute('aria-selected', String(isMatch));
        tab.setAttribute('aria-pressed', String(isMatch));
      });

      // 2. Filter menu article cards based on data-region attribute
      let visibleCount = 0;
      dishCards.forEach((card) => {
        const cardRegion = (card.getAttribute('data-region') || '').toLowerCase();
        const shouldShow = activeRegion === 'all' || cardRegion === activeRegion;

        if (shouldShow) {
          card.style.display = '';
          card.removeAttribute('aria-hidden');
          visibleCount += 1;
        } else {
          card.style.display = 'none';
          card.setAttribute('aria-hidden', 'true');
        }
      });
    };

    // Attach click events on filter tab controls
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const selectedRegion = tab.getAttribute('data-region') || 'all';
        applyFilter(selectedRegion);
      });
    });

    // Synchronize direct region navigation links in header navbar
    navRegionLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetRegion = link.getAttribute('data-nav-region');
        if (targetRegion) {
          applyFilter(targetRegion);
        }
      });
    });
  };

  // ==========================================================================
  // System 3: Mora Cart Calculator Module (₱ PHP Real-Time Aggregator)
  // ==========================================================================
  const initMoraCartCalculator = () => {
    // In-memory cart state repository: key = dishId, value = item object
    const cartState = new Map();

    // DOM Elements
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartItemCountDisplay = document.getElementById('cart-item-count');
    const cartTotalPriceDisplay = document.getElementById('cart-total-price');
    const headerCartCountDisplay = document.getElementById('header-cart-count');
    const headerCartButton = document.getElementById('header-cart-button');
    const clearCartButton = document.querySelector('.btn-clear-cart');
    const checkoutButton = document.querySelector('.btn-checkout');

    // Aggregate subtotal and total item count
    const calculateTotals = () => {
      let totalCount = 0;
      let subtotal = 0.00;

      cartState.forEach((item) => {
        totalCount += item.quantity;
        subtotal += item.price * item.quantity;
      });

      return { totalCount, subtotal };
    };

    // Render the itemized list in the sticky order calculator widget
    const renderCartItems = () => {
      if (!cartItemsList) {
        return;
      }

      // Clear existing list elements
      cartItemsList.innerHTML = '';

      if (cartState.size === 0) {
        if (cartEmptyMessage) {
          cartEmptyMessage.style.display = 'block';
        }
        return;
      }

      if (cartEmptyMessage) {
        cartEmptyMessage.style.display = 'none';
      }

      // Populate itemized rows
      cartState.forEach((item) => {
        const lineTotal = item.price * item.quantity;

        const row = document.createElement('li');
        row.className = 'cart-item-row';
        row.setAttribute('data-cart-item-id', item.id);

        row.innerHTML = `
          <div class="cart-item-info">
            <span class="cart-item-title">${item.name}</span>
            <span class="cart-item-unit-price">₱${formatPHP(item.price)} each</span>
          </div>
          <div class="cart-item-controls">
            <button type="button" class="cart-qty-btn btn-qty-dec" aria-label="Decrease quantity of ${item.name}" data-action="decrement" data-id="${item.id}">−</button>
            <span class="cart-qty-val" aria-label="${item.quantity} portions">${item.quantity}</span>
            <button type="button" class="cart-qty-btn btn-qty-inc" aria-label="Increase quantity of ${item.name}" data-action="increment" data-id="${item.id}">+</button>
            <span class="cart-item-total">₱${formatPHP(lineTotal)}</span>
            <button type="button" class="cart-remove-btn" aria-label="Remove ${item.name} from order" data-action="remove" data-id="${item.id}">×</button>
          </div>
        `;

        cartItemsList.appendChild(row);
      });
    };

    // Update all live display widgets and accessibility labels
    const updateCalculatorDisplay = () => {
      const { totalCount, subtotal } = calculateTotals();
      const formattedTotal = formatPHP(subtotal);

      // Update sticky widget metrics
      if (cartItemCountDisplay) {
        cartItemCountDisplay.textContent = String(totalCount);
      }
      if (cartTotalPriceDisplay) {
        cartTotalPriceDisplay.textContent = formattedTotal;
      }

      // Update header cart badge and aria label
      if (headerCartCountDisplay) {
        headerCartCountDisplay.textContent = String(totalCount);
      }
      if (headerCartButton) {
        headerCartButton.setAttribute(
          'aria-label',
          `View shopping cart with ${totalCount} items totaling ₱${formattedTotal}`
        );
      }

      // Re-render itemized rows
      renderCartItems();
    };

    // ------------------------------------------------------------------------
    // Cart Actions: Add, Increment, Decrement, Remove, Clear
    // ------------------------------------------------------------------------
    const addItemToCart = (dishId, dishName, dishPrice, dishRegion) => {
      const numericPrice = parseFloat(dishPrice) || 0;

      if (cartState.has(dishId)) {
        const existingItem = cartState.get(dishId);
        existingItem.quantity += 1;
      } else {
        cartState.set(dishId, {
          id: dishId,
          name: dishName,
          price: numericPrice,
          region: dishRegion,
          quantity: 1
        });
      }

      updateCalculatorDisplay();
    };

    const incrementItem = (dishId) => {
      if (cartState.has(dishId)) {
        const item = cartState.get(dishId);
        item.quantity += 1;
        updateCalculatorDisplay();
      }
    };

    const decrementItem = (dishId) => {
      if (cartState.has(dishId)) {
        const item = cartState.get(dishId);
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cartState.delete(dishId);
        }
        updateCalculatorDisplay();
      }
    };

    const removeItem = (dishId) => {
      if (cartState.has(dishId)) {
        cartState.delete(dishId);
        updateCalculatorDisplay();
      }
    };

    const clearCart = () => {
      cartState.clear();
      updateCalculatorDisplay();
    };

    // ------------------------------------------------------------------------
    // Event Attachments
    // ------------------------------------------------------------------------

    // Listen to "Add to Cart" buttons on menu cards
    addToCartButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const dishId = btn.getAttribute('data-dish-id') || 'dish';
        const dishName = btn.getAttribute('data-dish-name') || 'Dish';
        const dishPrice = btn.getAttribute('data-dish-price') || '0';
        const dishRegion = btn.getAttribute('data-dish-region') || 'teyvat';

        addItemToCart(dishId, dishName, dishPrice, dishRegion);

        // Tactile button feedback
        const originalText = btn.textContent;
        const currentQty = cartState.get(dishId)?.quantity || 1;
        btn.textContent = `Added (×${currentQty}) ✓`;
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 750);
      });
    });

    // Delegate quantity controls inside the cart items list
    if (cartItemsList) {
      cartItemsList.addEventListener('click', (event) => {
        const targetBtn = event.target.closest('button[data-action]');
        if (!targetBtn) {
          return;
        }

        const action = targetBtn.getAttribute('data-action');
        const dishId = targetBtn.getAttribute('data-id');

        if (!dishId) {
          return;
        }

        if (action === 'increment') {
          incrementItem(dishId);
        } else if (action === 'decrement') {
          decrementItem(dishId);
        } else if (action === 'remove') {
          removeItem(dishId);
        }
      });
    }

    // Clear cart selection action
    if (clearCartButton) {
      clearCartButton.addEventListener('click', () => {
        clearCart();
      });
    }

    // Confirm delivery order action
    if (checkoutButton) {
      checkoutButton.addEventListener('click', () => {
        const { totalCount, subtotal } = calculateTotals();

        if (totalCount === 0) {
          checkoutButton.textContent = 'Cart is empty! Add dishes first';
          setTimeout(() => {
            checkoutButton.textContent = 'Confirm Delivery Order';
          }, 2000);
          return;
        }

        // Confirmation feedback
        const formattedTotal = formatPHP(subtotal);
        checkoutButton.textContent = `Order Dispatched! (₱${formattedTotal}) ✓`;
        checkoutButton.disabled = true;

        setTimeout(() => {
          clearCart();
          checkoutButton.textContent = 'Confirm Delivery Order';
          checkoutButton.disabled = false;
        }, 3200);
      });
    }

    // Scroll smoothly to order tracker when clicking header cart button
    if (headerCartButton) {
      headerCartButton.addEventListener('click', () => {
        const trackerSection = document.getElementById('order-tracker');
        if (trackerSection) {
          trackerSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Initial render
    updateCalculatorDisplay();
  };

  // ==========================================================================
  // System 4: Catering & Delivery Contact Form Submission Module
  // ==========================================================================
  const initContactForm = () => {
    const contactForm = document.querySelector('.catering-form-grid');
    if (!contactForm) {
      return;
    }

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit-inquiry');

      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Order Request Received! Ad Astra Abyssosque!';
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  };

  // ==========================================================================
  // Initialization Lifecycle
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initRegionFilterToggle();
    initMoraCartCalculator();
    initContactForm();
  });
})();
