// Location Menu Config - Canna Culture Dispensary Locations
const locationMenus = {
  loc1: {
    name: "Charter Park",
    url: "https://cannaculturecollective.com/store-charter-park/"
  },
  loc2: {
    name: "Midtown",
    url: "https://cannaculturecollective.com/store-midtown/"
  }
};

// Featured Sample Products for Home Tab
const sampleProducts = [
  { id: 1, name: "Gelato #33 (3.5g)", price: "$45.00", thc: "28% THC" },
  { id: 2, name: "Sour Diesel Cart", price: "$35.00", thc: "82% THC" },
  { id: 3, name: "Gummy Bears 100mg", price: "$20.00", thc: "100mg THC" },
  { id: 4, name: "Live Resin Shatter", price: "$50.00", thc: "75% THC" }
];

// Age Verification Function
function verifyAge(isAdult) {
  if (isAdult) {
    const ageModal = document.getElementById('age-modal');
    if (ageModal) ageModal.style.setProperty('display', 'none', 'important');
    localStorage.setItem('ageVerified', 'true');
  } else {
    alert('You must be 21 or older to access this app.');
    window.location.href = 'https://www.google.com';
  }
}

// Location Selector Functions
function setLocation(locKey) {
  const selected = locationMenus[locKey];
  if (!selected) return;

  localStorage.setItem('selectedLocation', locKey);
  
  const nameLabel = document.getElementById('current-location-name');
  if (nameLabel) nameLabel.innerText = selected.name;

  const iframe = document.getElementById('menu-iframe');
  if (iframe) iframe.src = selected.url;

  const locModal = document.getElementById('location-modal');
  if (locModal) locModal.style.setProperty('display', 'none', 'important');
}

function openLocationModal() {
  const locModal = document.getElementById('location-modal');
  if (locModal) locModal.style.setProperty('display', 'flex', 'important');
}

// Tab Switching Navigation
function switchTab(tabName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const selectedScreen = document.getElementById(`screen-${tabName}`);
  if (selectedScreen) selectedScreen.classList.add('active');

  const navButtons = document.querySelectorAll('.nav-btn');
  const indexMap = { home: 0, menu: 1, loyalty: 2, learn: 3, account: 4 };
  if (indexMap[tabName] !== undefined) {
    navButtons[indexMap[tabName]].classList.add('active');
  }
}

// Render Featured Home Products
function renderProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  container.innerHTML = sampleProducts.map(p => `
    <div class="product-card">
      <i class="fa-solid fa-cannabis" style="font-size: 2rem; color: #2e7d32; margin-bottom: 8px;"></i>
      <h4>${p.name}</h4>
      <p style="color:#2e7d32; font-size:0.8rem; margin: 4px 0;">${p.thc}</p>
      <p style="font-weight:bold;">${p.price}</p>
      <button class="btn-primary" style="width:100%; margin-top:8px;" onclick="addToCart()">Add to Order</button>
    </div>
  `).join('');
}

let cartCount = 0;
function addToCart() {
  cartCount++;
  const cartLabel = document.getElementById('cart-count');
  if (cartLabel) cartLabel.innerText = cartCount;
}

// Startup Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  // Check 21+ Age verification
  if (localStorage.getItem('ageVerified') === 'true') {
    const ageModal = document.getElementById('age-modal');
    if (ageModal) ageModal.style.setProperty('display', 'none', 'important');
  }

  // Check saved location
  const savedLoc = localStorage.getItem('selectedLocation') || 'loc1';
  setLocation(savedLoc);
});// Available Rewards Config
const availableRewards = [
  { id: 'r1', title: '$5 Off Storewide', cost: 100, code: 'SAVE5-CANNA' },
  { id: 'r2', title: 'Free Pre-Roll with Order', cost: 250, code: 'PREROLL-FREE' },
  { id: 'r3', title: '$20 Off Any Purchase', cost: 500, code: 'TAKE20-OFF' }
];

// Load points and claimed coupons from local storage
let userPoints = parseInt(localStorage.getItem('userPoints')) || 420;
let claimedCoupons = JSON.parse(localStorage.getItem('claimedCoupons')) || [];

function renderLoyaltyScreen() {
  // Update header points and progress bar
  const pointsElem = document.getElementById('user-points');
  if (pointsElem) pointsElem.innerText = userPoints;

  const maxTier = 500;
  const progressPercent = Math.min((userPoints / maxTier) * 100, 100);
  
  const fillElem = document.getElementById('loyalty-progress-fill');
  if (fillElem) fillElem.style.width = `${progressPercent}%`;

  const textElem = document.getElementById('loyalty-progress-text');
  if (textElem) {
    textElem.innerText = userPoints >= maxTier 
      ? "You've unlocked maximum tier status!" 
      : `${maxTier - userPoints} points until $20 reward!`;
  }

  // Render Available Rewards
  const rewardsContainer = document.getElementById('rewards-list');
  if (rewardsContainer) {
    rewardsContainer.innerHTML = availableRewards.map(reward => {
      const canAfford = userPoints >= reward.cost;
      return `
        <div class="reward-card">
          <div class="reward-info">
            <h4>${reward.title}</h4>
            <span class="reward-cost">${reward.cost} Points</span>
          </div>
          <button class="btn-claim" 
            ${canAfford ? '' : 'disabled'} 
            onclick="claimReward('${reward.id}')">
            ${canAfford ? 'Redeem' : 'Need More'}
          </button>
        </div>
      `;
    }).join('');
  }

  // Render Claimed Active Coupons
  const couponsContainer = document.getElementById('active-coupons-list');
  if (couponsContainer) {
    if (claimedCoupons.length === 0) {
      couponsContainer.innerHTML = `<p style="color: #666; font-size: 0.85rem;">No active coupons yet. Redeem points above!</p>`;
    } else {
      couponsContainer.innerHTML = claimedCoupons.map(coupon => `
        <div class="coupon-card">
          <div>
            <div style="font-size: 0.85rem; font-weight: bold;">${coupon.title}</div>
            <div class="coupon-code">${coupon.code}</div>
          </div>
          <span style="font-size: 0.75rem; color: #4caf50;">Ready to Use</span>
        </div>
      `).join('');
    }
  }
}

// Redeem Reward Function
function claimReward(rewardId) {
  const reward = availableRewards.find(r => r.id === rewardId);
  if (!reward || userPoints < reward.cost) return;

  // Deduct points and save code
  userPoints -= reward.cost;
  claimedCoupons.push({ title: reward.title, code: reward.code });

  // Save to LocalStorage
  localStorage.setItem('userPoints', userPoints);
  localStorage.setItem('claimedCoupons', JSON.stringify(claimedCoupons));

  // Re-render display
  renderLoyaltyScreen();
}

// Make sure renderLoyaltyScreen is called during tab switch or startup
document.addEventListener('DOMContentLoaded', () => {
  renderLoyaltyScreen();
});// Learn Data Configuration
const strainGuide = [
  { name: "Granddaddy Purple", type: "indica", thc: "23%", effect: "Relaxed, Sleepy, Euphoric", aroma: "Grape, Berry" },
  { name: "Sour Diesel", type: "sativa", thc: "26%", effect: "Energetic, Uplifted, Creative", aroma: "Pungent, Fuel, Citrus" },
  { name: "Blue Dream", type: "hybrid", thc: "21%", effect: "Balanced, Calm, Cerebral", aroma: "Sweet Berry, Herbal" },
  { name: "Gelato #33", type: "hybrid", thc: "28%", effect: "Heavy Body High, Euphoric", aroma: "Sweet, Citrus, Lavender" }
];

const terpeneGuide = [
  { name: "Myrcene", scent: "Earthy, Herbal", effect: "Sedative, Deep Muscle Relaxation", foundIn: "Granddaddy Purple, Mangoes" },
  { name: "Limonene", scent: "Citrus, Lemon", effect: "Mood Elevation, Stress Relief", foundIn: "Sour Diesel, Lemon Rinds" },
  { name: "Caryophyllene", scent: "Peppery, Woody", effect: "Anti-inflammatory, Anxiety Relief", foundIn: "GSC, Black Pepper" },
  { name: "Linalool", scent: "Floral, Lavender", effect: "Calming, Anxiety Reduction", foundIn: "Do-Si-Dos, Lavender" }
];

function renderLearnScreen(typeFilter = 'all') {
  // Render Strains
  const strainContainer = document.getElementById('strain-grid');
  if (strainContainer) {
    const filtered = typeFilter === 'all' 
      ? strainGuide 
      : strainGuide.filter(s => s.type === typeFilter);

    strainContainer.innerHTML = filtered.map(s => `
      <div class="strain-card">
        <div class="strain-header">
          <h4 style="color:#ffffff;">${s.name}</h4>
          <span class="strain-tag ${s.type}">${s.type} • ${s.thc}</span>
        </div>
        <p style="font-size:0.8rem; color:#a0a0a0; margin-top:4px;"><strong>Effects:</strong> ${s.effect}</p>
        <p style="font-size:0.8rem; color:#81c784; margin-top:2px;"><strong>Aroma:</strong> ${s.aroma}</p>
      </div>
    `).join('');
  }

  // Render Terpenes
  const terpeneContainer = document.getElementById('terpene-list');
  if (terpeneContainer && terpeneContainer.children.length === 0) {
    terpeneContainer.innerHTML = terpeneGuide.map(t => `
      <div class="terpene-card">
        <h4>${t.name}</h4>
        <p><strong>Aroma:</strong> ${t.scent}</p>
        <p style="margin-top:4px;"><strong>Effects:</strong> ${t.effect}</p>
      </div>
    `).join('');
  }
}

function filterStrains(type, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderLearnScreen(type);
}

// Hook into initial page load
document.addEventListener('DOMContentLoaded', () => {
  renderLearnScreen();
});// Store Data Config
const storeLocations = [
  {
    name: "Charter Park",
    address: "123 Charter Park Way",
    hours: "9:00 AM - 9:00 PM Daily",
    phone: "(555) 019-2831",
    key: "loc1"
  },
  {
    name: "Midtown",
    address: "456 Midtown Blvd",
    hours: "8:00 AM - 10:00 PM Daily",
    phone: "(555) 019-4820",
    key: "loc2"
  }
];

// Sample Order History
const orderHistoryData = [
  {
    id: "CC-9021",
    date: "Sep 12, 2026",
    location: "Charter Park",
    items: "Gelato #33 (3.5g), Sour Diesel Cart",
    total: "$80.00",
    status: "Completed"
  },
  {
    id: "CC-8410",
    date: "Aug 28, 2026",
    location: "Midtown",
    items: "Gummy Bears 100mg",
    total: "$20.00",
    status: "Completed"
  }
];

function renderAccountScreen() {
  // Render Locations
  const storeContainer = document.getElementById('account-store-list');
  if (storeContainer) {
    const currentLoc = localStorage.getItem('selectedLocation') || 'loc1';
    storeContainer.innerHTML = storeLocations.map(s => `
      <div class="store-info-card" style="${s.key === currentLoc ? 'border-color: #2e7d32;' : ''}">
        <div class="store-info-header">
          <h4>${s.name} ${s.key === currentLoc ? '<span style="font-size:0.7rem; color:#81c784;">(Selected)</span>' : ''}</h4>
          <button class="btn-outline" style="padding:4px 10px; font-size:0.75rem; margin-top:0;" onclick="setLocation('${s.key}')">
            ${s.key === currentLoc ? 'Active' : 'Select'}
          </button>
        </div>
        <p><i class="fa-solid fa-location-dot" style="color:#2e7d32;"></i> ${s.address}</p>
        <p><i class="fa-solid fa-clock" style="color:#2e7d32;"></i> ${s.hours}</p>
        <p><i class="fa-solid fa-phone" style="color:#2e7d32;"></i> ${s.phone}</p>
      </div>
    `).join('');
  }

  // Render Orders
  const orderContainer = document.getElementById('order-history-list');
  if (orderContainer) {
    orderContainer.innerHTML = orderHistoryData.map(o => `
      <div class="order-card">
        <div class="order-header">
          <span>Order ${o.id}</span>
          <span class="order-status">${o.status}</span>
        </div>
        <div style="font-size:0.75rem; color:#666;">${o.date} • ${o.location}</div>
        <div class="order-items">${o.items}</div>
        <div style="text-align:right; font-weight:bold; color:#81c784; font-size:0.85rem; margin-top:6px;">
          Total: ${o.total}
        </div>
      </div>
    `).join('');
  }
}

// Hook into load and tab switching
document.addEventListener('DOMContentLoaded', () => {
  renderAccountScreen();
});// PWA Installation Handler
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Check if the user has previously dismissed the banner
  if (!localStorage.getItem('pwaBannerDismissed')) {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.style.display = 'flex';
  }
});

function triggerPWAInstall() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'none';

  if (!deferredPrompt) return;

  // Show the native browser install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    }
    deferredPrompt = null;
  });
}

function dismissPWAInstall() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.style.display = 'none';
  // Remember user choice so banner doesn't keep appearing
  localStorage.setItem('pwaBannerDismissed', 'true');
}// Function to handle switching locations and updating Jane embed URL
function setLocation(locKey) {
  if (!locationMenus[locKey]) return;

  // Save selected location
  localStorage.setItem('selectedLocation', locKey);

  // Update Top Bar location text
  const locationLabel = document.getElementById('current-location-name');
  if (locationLabel) {
    locationLabel.innerText = locationMenus[locKey].name;
  }

  // Update Jane iFrame Source
  const iframe = document.getElementById('menu-iframe');
  if (iframe) {
    iframe.src = locationMenus[locKey].url;
  }

  // Close modal if open
  const modal = document.getElementById('location-modal');
  if (modal) {
    modal.style.display = 'none';
  }

  // Refresh Account screen active badge if loaded
  if (typeof renderAccountScreen === 'function') {
    renderAccountScreen();
  }
}// Tab Switching Handler
function switchTab(tabId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Remove active state from all bottom nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Activate selected screen
  const targetScreen = document.getElementById(`screen-${tabId}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Highlight active nav button
  const activeBtn = document.querySelector(`.nav-btn[onclick="switchTab('${tabId}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Trigger screen specific renders if applicable
  if (tabId === 'loyalty') renderLoyaltyScreen();
  if (tabId === 'learn') renderLearnScreen();
  if (tabId === 'account') renderAccountScreen();
}function filterByCategory(category) {
  console.log(`Filtering by category: ${category}`);
  // If using Jane iFrame integration:
  const iframe = document.getElementById('menu-iframe');
  if (iframe && iframe.src) {
    iframe.src = `${iframe.src.split('?')[0]}?category=${category}`;
  }
}