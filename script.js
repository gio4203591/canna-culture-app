/* ==========================================================================
   CANNA CULTURE DISPENSARY - APP JS LOGIC
   ========================================================================== */

// App State Management
const appState = {
  currentTab: 'home',
  location: 'Charter Park',
  userPoints: 420,
  cartCount: 0,
  isAgeVerified: false
};

// Sample featured products data matching mockup style
const featuredProducts = [
  { id: 'fp-1', name: 'Flower', image: 'flower.png' },
  { id: 'fp-2', name: 'Edibles', image: 'edibles.png' },
  { id: 'fp-3', name: 'Vape Cartridge', image: 'vapes.png' },
  { id: 'fp-4', name: 'Concentrate Jar', image: 'concentrates.png' }
];

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  renderFeaturedProducts();
});

function initApp() {
  // Check local storage for age verification state
  const ageVerified = localStorage.getItem('canna_age_verified');
  if (!ageVerified) {
    showAgeModal(true);
  } else {
    appState.isAgeVerified = true;
  }

  // Load saved store location if present
  const savedLocation = localStorage.getItem('canna_location');
  if (savedLocation) {
    appState.location = savedLocation;
    updateLocationUI(savedLocation);
  }

  // Default active screen set to 'home'
  switchTab('home');
}

/* ==========================================================================
   TAB SWITCHING LOGIC (BOTTOM NAV)
   ========================================================================== */
function switchTab(tabName) {
  appState.currentTab = tabName;

  // 1. Hide all screen containers
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  // 2. Activate target screen container
  const targetScreen = document.getElementById(`screen-${tabName}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // 3. Reset active state on bottom navigation buttons
  const navButtons = document.querySelectorAll('.bottom-nav .nav-btn');
  navButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  // 4. Highlight current button based on its onclick handler string
  const activeButton = Array.from(navButtons).find(btn => {
    const attr = btn.getAttribute('onclick');
    return attr && attr.includes(`'${tabName}'`);
  });

  if (activeButton) {
    activeButton.classList.add('active');
  }

  // 5. Reset scroll top on container switch
  const contentContainer = document.getElementById('app-content');
  if (contentContainer) {
    contentContainer.scrollTop = 0;
  }
}

/* ==========================================================================
   HOME SCREEN - FEATURED PRODUCTS CAROUSEL
   ========================================================================== */
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  container.innerHTML = featuredProducts.map(product => `
    <div class="product-thumb-card" onclick="switchTab('menu')">
      <img src="${product.image}" alt="${product.name}">
    </div>
  `).join('');
}

/* ==========================================================================
   AGE VERIFICATION & MODALS
   ========================================================================== */
function showAgeModal(show) {
  const modal = document.getElementById('age-modal');
  if (modal) {
    modal.style.display = show ? 'flex' : 'none';
  }
}

function verifyAge(isAdult) {
  if (isAdult) {
    localStorage.setItem('canna_age_verified', 'true');
    appState.isAgeVerified = true;
    showAgeModal(false);
  } else {
    alert('You must be 21 or older to enter this dispensary application.');
    window.location.href = 'https://www.google.com';
  }
}

/* ==========================================================================
   LOCATION SELECTION MODAL
   ========================================================================== */
function openLocationModal() {
  const modal = document.getElementById('location-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeLocationModal() {
  const modal = document.getElementById('location-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function setLocation(locName) {
  appState.location = locName;
  localStorage.setItem('canna_location', locName);
  updateLocationUI(locName);
  closeLocationModal();
}

function updateLocationUI(locName) {
  const topLocElem = document.getElementById('current-location-name');
  const accountLocElem = document.getElementById('account-current-location');
  
  if (topLocElem) topLocElem.textContent = locName;
  if (accountLocElem) accountLocElem.textContent = locName;
}

/* ==========================================================================
   DEALS FILTERING
   ========================================================================== */
function filterDeals(category, btnElement) {
  // Update button active state
  const buttons = document.querySelectorAll('.deal-tab-btn');
  buttons.forEach(btn => {
    btn.style.background = '#f0f0f0';
    btn.style.color = '#333';
    btn.style.border = '1px solid #ddd';
  });

  if (btnElement) {
    btnElement.style.background = '#2e7d32';
    btnElement.style.color = '#ffffff';
    btnElement.style.border = 'none';
  }

  // Filter deal cards
  const dealCards = document.querySelectorAll('.deal-card-item');
  dealCards.forEach(card => {
    if (category === 'all' || card.classList.contains(`deal-group-${category}`)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ==========================================================================
   CATEGORY & MENU ACTIONS
   ========================================================================== */
function filterByCategory(categoryName) {
  console.log(`Filtering menu category: ${categoryName}`);
}

function addToCart(productName) {
  appState.cartCount += 1;
  const cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.textContent = appState.cartCount;
  }
  alert(`Added "${productName}" to your bag!`);
}

/* ==========================================================================
   LOYALTY REWARDS REDEMPTION
   ========================================================================== */
function redeemReward(cost, rewardName) {
  if (appState.userPoints >= cost) {
    appState.userPoints -= cost;
    updatePointsUI();
    alert(`Successfully redeemed: ${rewardName}!`);
  } else {
    alert('You do not have enough points for this reward.');
  }
}

function updatePointsUI() {
  const userPtsElem = document.getElementById('user-points');
  const balancePtsElem = document.getElementById('balance-pts-tag');
  const accountPtsElem = document.getElementById('account-points');

  if (userPtsElem) userPtsElem.textContent = appState.userPoints;
  if (balancePtsElem) balancePtsElem.textContent = `${appState.userPoints} PTS`;
  if (accountPtsElem) accountPtsElem.textContent = appState.userPoints;
}

/* ==========================================================================
   ACCOUNT SECTION MODALS
   ========================================================================== */
function openAccountSection(section) {
  if (section === 'orders') {
    document.getElementById('orders-modal').style.display = 'flex';
  } else if (section === 'favorites') {
    document.getElementById('favorites-modal').style.display = 'flex';
  } else if (section === 'settings') {
    document.getElementById('settings-modal').style.display = 'flex';
  }
}

function closeOrdersModal() {
  document.getElementById('orders-modal').style.display = 'none';
}

function closeFavoritesModal() {
  document.getElementById('favorites-modal').style.display = 'none';
}

function closeSettingsModal() {
  document.getElementById('settings-modal').style.display = 'none';
}

function clearAppData() {
  if (confirm('Are you sure you want to reset app data and re-verify your age?')) {
    localStorage.clear();
    window.location.reload();
  }
}