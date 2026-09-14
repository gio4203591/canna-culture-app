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
});