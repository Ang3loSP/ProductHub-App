// PRODUCTHUB - COMPLETE JAVASCRIPT
// Preserves all original features: search, category filter, view toggle, wishlist (localStorage), theme, contact validation.
// Adds enhanced Register modal with smooth UX, hero section interactions, and toast notifications.

document.addEventListener('DOMContentLoaded', initApp);

// ---------- DATA ----------
const productsData = [
  { id: 1, name: "Wireless Headphones", price: 79.99, originalPrice: 129.99, category: "electronics", image: "assets/wireless-headphones.jpg", description: "Premium wireless headphones with noise cancellation", badge: "Sale" },
  { id: 2, name: "Smart Watch", price: 199.99, originalPrice: null, category: "electronics", image: "assets/smart-watch.jpg", description: "Fitness tracker and smart notifications", badge: "New" },
  { id: 3, name: "Laptop Backpack", price: 49.99, originalPrice: 79.99, category: "accessories", image: "assets/laptop-backpack.jpg", description: "Water-resistant laptop backpack with USB charging port", badge: "Sale" },
  { id: 4, name: "Coffee Maker", price: 89.99, originalPrice: null, category: "home", image: "assets/coffee-maker.jpg", description: "Programmable coffee maker with thermal carafe", badge: null },
  { id: 5, name: "Running Shoes", price: 129.99, originalPrice: 159.99, category: "clothing", image: "assets/running-shoes.jpg", description: "Lightweight running shoes with cushioning", badge: "Sale" },
  { id: 6, name: "Desk Lamp", price: 39.99, originalPrice: null, category: "home", image: "assets/desk-lamp.jpg", description: "LED desk lamp with adjustable brightness", badge: null },
  { id: 7, name: "Water Bottle", price: 24.99, originalPrice: null, category: "accessories", image: "assets/water-bottle.jpg", description: "Insulated stainless steel water bottle", badge: "Bestseller" },
  { id: 8, name: "Bluetooth Speaker", price: 59.99, originalPrice: 89.99, category: "electronics", image: "assets/bluetooth-speaker.jpg", description: "Portable Bluetooth speaker with 12-hour battery", badge: "Sale" }
];

// State variables (original)
let currentSearchTerm = '';
let currentCategory = 'all';

// ---------- INITIALIZATION ----------
function initApp() {
  displayProducts(productsData);
  initNavigation();
  initThemeToggle();
  initSearch();
  initCategoryFilter();
  initViewToggle();
  initContactForm();
  initRegisterModal();        // ENHANCED: register modal feature
  updateFavouritesDisplay();
}

// ---------- PRODUCT DISPLAY (original logic + enhanced card styling) ----------
function displayProducts(products) {
  const container = document.getElementById('productsContainer');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResultsMessage');
  
  if (!products || !products.length) {
    container.innerHTML = '';
    if (noResults) noResults.hidden = false;
    if (resultsCount) resultsCount.textContent = 'No products found';
    return;
  }
  
  if (noResults) noResults.hidden = true;
  if (resultsCount) resultsCount.textContent = `Showing ${products.length} product${products.length !== 1 ? 's' : ''}`;
  
  container.innerHTML = products.map(p => createProductCard(p)).join('');
  // Attach favourite event listeners to all favourite buttons
  document.querySelectorAll('.favourite-btn').forEach(btn => btn.addEventListener('click', handleFavouriteClick));
}

function createProductCard(p) {
  const favourites = getFavourites();
  const isFav = favourites.includes(p.id);
  const hasDiscount = p.originalPrice && p.originalPrice > p.price;
  const discountPercent = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
  
  return `
    <article class="product-card" data-product-id="${p.id}">
      <div class="product-image-wrapper">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        ${hasDiscount ? `<span class="product-badge" style="background:var(--gradient-accent); top:60px;">${discountPercent}% OFF</span>` : ''}
        <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy">
      </div>
      <div class="product-info">
        <div class="product-details">
          <h3 class="product-name">${escapeHtml(p.name)}</h3>
          <p class="product-category">${p.category}</p>
          <p class="product-price">R${p.price.toFixed(2)} ${p.originalPrice ? `<s>R${p.originalPrice.toFixed(2)}</s>` : ''}</p>
        </div>
        <button class="favourite-btn ${isFav ? 'favourited' : ''}" data-product-id="${p.id}" aria-label="${isFav ? 'Remove from wishlist' : 'Add to wishlist'}">${isFav ? '❤️' : '🤍'}</button>
      </div>
    </article>
  `;
}

// Simple escape to prevent XSS (best practice)
function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function filterProducts() {
  let filtered = [...productsData];
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (currentSearchTerm) {
    const term = currentSearchTerm.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
  }
  displayProducts(filtered);
}

// ---------- FAVOURITES / WISHLIST (original localStorage logic, fully preserved) ----------
function getFavourites() {
  try {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
  } catch {
    return [];
  }
}

function saveFavourites(favourites) {
  localStorage.setItem('favourites', JSON.stringify(favourites));
}

function handleFavouriteClick(e) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const id = parseInt(btn.dataset.productId);
  const favs = getFavourites();
  const idx = favs.indexOf(id);
  
  if (idx === -1) {
    favs.push(id);
    btn.classList.add('favourited');
    btn.innerHTML = '❤️';
    showToast('Added to wishlist! ❤️');
  } else {
    favs.splice(idx, 1);
    btn.classList.remove('favourited');
    btn.innerHTML = '🤍';
    showToast('Removed from wishlist 💔');
  }
  saveFavourites(favs);
  updateFavouritesDisplay();
}

function updateFavouritesDisplay() {
  const container = document.getElementById('favouritesContainer');
  const noFavs = document.getElementById('noFavouritesMessage');
  const favIds = getFavourites();
  
  if (!container) return;
  
  if (!favIds.length) {
    container.innerHTML = '';
    if (noFavs) noFavs.hidden = false;
    return;
  }
  
  if (noFavs) noFavs.hidden = true;
  
  const favouriteProducts = productsData.filter(p => favIds.includes(p.id));
  container.innerHTML = favouriteProducts.map(p => `
    <div class="favourite-item" data-product-id="${p.id}">
      <img src="${p.image}" alt="${p.name}" class="favourite-item-image">
      <div class="favourite-item-info">
        <p class="favourite-item-name">${escapeHtml(p.name)}</p>
        <p class="favourite-item-price">R${p.price.toFixed(2)}</p>
      </div>
      <button class="remove-favourite" data-product-id="${p.id}" aria-label="Remove">✕</button>
    </div>
  `).join('');
  
  container.querySelectorAll('.remove-favourite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.productId);
      const favs = getFavourites();
      saveFavourites(favs.filter(f => f !== id));
      updateFavouritesDisplay();
      // Update corresponding product card button if exists
      const cardBtn = document.querySelector(`.favourite-btn[data-product-id="${id}"]`);
      if (cardBtn) {
        cardBtn.classList.remove('favourited');
        cardBtn.innerHTML = '🤍';
      }
      showToast('Removed from wishlist 💔');
    });
  });
}

// ---------- TOAST NOTIFICATION (enhanced with smooth animations) ----------
function showToast(msg) {
  const existingToast = document.querySelector('.custom-toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'var(--gradient-primary)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '9999px',
    zIndex: '1000',
    animation: 'slideIn 0.3s ease',
    fontFamily: 'var(--font-body)',
    fontWeight: '500',
    boxShadow: 'var(--shadow-lg)'
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ---------- ENHANCED: REGISTER MODAL ----------
function initRegisterModal() {
  const registerLink = document.getElementById('registerNavLink');
  if (registerLink) {
    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      showRegisterModal();
    });
  }
}

function showRegisterModal() {
  // Remove any existing modal to avoid duplicates
  const existingModal = document.getElementById('registerModal');
  if (existingModal) existingModal.remove();
  
  const modal = document.createElement('div');
  modal.id = 'registerModal';
  modal.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; display:flex; align-items:center; justify-content:center;">
      <div style="background:var(--color-surface); border-radius:var(--radius-2xl); padding:2rem; max-width:400px; width:90%; animation:slideIn 0.3s ease; box-shadow:var(--shadow-xl); border:1px solid var(--color-border);">
        <h2 style="font-family:var(--font-heading); margin-bottom:1rem; color:var(--color-text);">Create Account</h2>
        <form id="registerForm">
          <div style="margin-bottom:1rem;">
            <input type="text" placeholder="Full Name" id="regName" style="width:100%; padding:12px; border-radius:var(--radius-lg); border:2px solid var(--color-border); background:var(--color-background); color:var(--color-text);">
          </div>
          <div style="margin-bottom:1rem;">
            <input type="email" placeholder="Email" id="regEmail" style="width:100%; padding:12px; border-radius:var(--radius-lg); border:2px solid var(--color-border); background:var(--color-background); color:var(--color-text);">
          </div>
          <div style="margin-bottom:1rem;">
            <input type="password" placeholder="Password" id="regPassword" style="width:100%; padding:12px; border-radius:var(--radius-lg); border:2px solid var(--color-border); background:var(--color-background); color:var(--color-text);">
          </div>
          <button type="submit" style="width:100%; padding:12px; background:var(--gradient-primary); color:white; border:none; border-radius:var(--radius-full); font-weight:600; cursor:pointer; transition:transform 0.2s;">Register</button>
        </form>
        <button id="closeModalBtn" style="margin-top:1rem; width:100%; padding:8px; background:transparent; border:1px solid var(--color-border); border-radius:var(--radius-full); cursor:pointer; color:var(--color-text);">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();
      const password = document.getElementById('regPassword')?.value;
      
      if (!name || !email || !password) {
        showToast('⚠️ Please fill in all fields');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('⚠️ Please enter a valid email address');
        return;
      }
      showToast(`🎉 Welcome ${name}! Registration successful.`);
      modal.remove();
    });
  }
  
  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.remove());
  }
  
  // Close modal when clicking outside the inner container
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// ---------- NAVIGATION (original + mobile menu enhancements) ----------
function initNavigation() {
  const toggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('primary-navigation');
  
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      if (navMenu) navMenu.setAttribute('data-visible', !expanded);
      document.body.style.overflow = !expanded ? 'hidden' : '';
    });
  }
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const target = link.getAttribute('href');
      // Handle smooth scroll only for anchor links that are not #register
      if (target && target.startsWith('#') && target !== '#register') {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Close mobile menu if open
      if (window.innerWidth <= 767 && toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        if (navMenu) navMenu.setAttribute('data-visible', 'false');
        document.body.style.overflow = '';
      }
    });
  });
}

// ---------- THEME TOGGLE (original with localStorage) ----------
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = btn?.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.textContent = '☀️';
  }
  
  btn?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    if (icon) icon.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}

// ---------- SEARCH & FILTERS (original) ----------
function initSearch() {
  const input = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resetBtn = document.getElementById('resetSearchBtn');
  
  const performSearch = () => {
    currentSearchTerm = input?.value.toLowerCase().trim() || '';
    filterProducts();
  };
  
  if (searchButton) searchButton.addEventListener('click', performSearch);
  if (input) input.addEventListener('keypress', e => e.key === 'Enter' && performSearch());
  
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (input) input.value = '';
      currentSearchTerm = '';
      const categorySelect = document.getElementById('categoryFilter');
      if (categorySelect) categorySelect.value = 'all';
      currentCategory = 'all';
      filterProducts();
      input?.focus();
    });
  }
}

function initCategoryFilter() {
  const filterSelect = document.getElementById('categoryFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', function() {
      currentCategory = this.value;
      filterProducts();
    });
  }
}

// ---------- VIEW TOGGLE (original grid/list with localStorage) ----------
function initViewToggle() {
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');
  const container = document.getElementById('productsContainer');
  
  if (!gridBtn || !listBtn || !container) return;
  
  const setView = (isGrid) => {
    container.classList.remove(isGrid ? 'list-view' : 'grid-view');
    container.classList.add(isGrid ? 'grid-view' : 'list-view');
    gridBtn.classList.toggle('active', isGrid);
    listBtn.classList.toggle('active', !isGrid);
    if (isGrid) {
      gridBtn.setAttribute('aria-pressed', 'true');
      listBtn.setAttribute('aria-pressed', 'false');
    } else {
      gridBtn.setAttribute('aria-pressed', 'false');
      listBtn.setAttribute('aria-pressed', 'true');
    }
    localStorage.setItem('viewPreference', isGrid ? 'grid' : 'list');
  };
  
  const savedView = localStorage.getItem('viewPreference');
  if (savedView === 'list') {
    setView(false);
  } else {
    setView(true);
  }
  
  gridBtn.onclick = () => setView(true);
  listBtn.onclick = () => setView(false);
}

// ---------- CONTACT FORM VALIDATION (original) ----------
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      
      if (!name || !email || !message) {
        alert('⚠️ Please fill in all required fields.');
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('⚠️ Please enter a valid email address.');
        return;
      }
      alert(`✅ Thank you, ${name}!\n\nWe've received your message and will respond to ${email} within 24 hours.`);
      form.reset();
    });
  }
}

// Add toast animation styles dynamically if not present
if (!document.querySelector('#toast-animation-styles')) {
  const style = document.createElement('style');
  style.id = 'toast-animation-styles';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}