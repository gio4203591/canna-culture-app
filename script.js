// ==========================================
// CONFIGURATION (BOOKMARKED FOR IT)
// ==========================================
// TODO: Replace 'https://onfleet.com/t/demo' with your backend API endpoint or live tracking URL when IT arrives
const ONFLEET_BACKEND_URL = "https://onfleet.com/t/demo";

// Function to update the delivery frame
function updateDeliveryTrackingUrl(newUrl) {
  const iframe = document.getElementById('onfleet-tracking-iframe');
  if (iframe) {
    iframe.src = newUrl || ONFLEET_BACKEND_URL;
  }
}// Store Location Menu URLs
const STORE_URLS = {
  loc1: "https://cannaculturecollective.com/store-charter-park/",
  loc2: "https://cannaculturecollective.com/store-midtown/"
};

// Track current active store URL (defaults to Charter Park)
let currentStoreUrl = STORE_URLS.loc1;

// Handle Tab Switching
function switchTab(tabName) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));

  const targetScreen = document.getElementById(`screen-${tabName}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${tabName}'`)) {
      btn.classList.add('active');
    }
  });
}

// Dynamically Update Iframe URL with Category Filters
function filterByCategory(category) {
  const iframe = document.getElementById('menu-iframe');
  if (!iframe) return;

  let filteredUrl = currentStoreUrl;

  if (category && category !== 'all') {
    const separator = currentStoreUrl.includes('?') ? '&' : '?';
    filteredUrl = `${currentStoreUrl}${separator}category=${encodeURIComponent(category)}`;
  }

  iframe.src = filteredUrl;

  // Scroll down smoothly to show the menu iframe
  const iframeContainer = document.querySelector('.iframe-container');
  if (iframeContainer) {
    iframeContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

// Age Verification Modal
function verifyAge(isOver21) {
  const ageModal = document.getElementById('age-modal');
  if (isOver21) {
    if (ageModal) ageModal.style.display = 'none';
  } else {
    alert('You must be 21 or older to access this app.');
  }
}

// Location Modal Handlers
function openLocationModal() {
  const locModal = document.getElementById('location-modal');
  if (locModal) locModal.style.display = 'flex';
}

function setLocation(locId) {
  const locModal = document.getElementById('location-modal');
  const locNameSpan = document.getElementById('current-location-name');
  const iframe = document.getElementById('menu-iframe');
  
  if (locId === 'loc1') {
    if (locNameSpan) locNameSpan.textContent = 'Charter Park';
    currentStoreUrl = STORE_URLS.loc1;
  } else if (locId === 'loc2') {
    if (locNameSpan) locNameSpan.textContent = 'Midtown';
    currentStoreUrl = STORE_URLS.loc2;
  }
  
  // Reload the menu iframe with the new store location URL
  if (iframe) {
    iframe.src = currentStoreUrl;
  }

  if (locModal) locModal.style.display = 'none';
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Set initial iframe URL to Charter Park
  const iframe = document.getElementById('menu-iframe');
  if (iframe) {
    iframe.src = currentStoreUrl;
  }

  // Dynamic Search Filter for Category Rows
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const categoryRows = document.querySelectorAll('.category-row-light');

      categoryRows.forEach(row => {
        const categoryName = row.querySelector('.category-name').textContent.toLowerCase();
        const categorySubtext = row.querySelector('.category-subtext').textContent.toLowerCase();

        if (categoryName.includes(searchTerm) || categorySubtext.includes(searchTerm)) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
});// Open Order History Modal
function openAccountSection(section) {
  if (section === 'orders') {
    const ordersModal = document.getElementById('orders-modal');
    if (ordersModal) {
      ordersModal.style.display = 'flex';
    }
  }
}

// Close Order History Modal
function closeOrdersModal() {
  const ordersModal = document.getElementById('orders-modal');
  if (ordersModal) {
    ordersModal.style.display = 'none';
  }
}// Open Account Section Modals
function openAccountSection(section) {
  if (section === 'orders') {
    const ordersModal = document.getElementById('orders-modal');
    if (ordersModal) ordersModal.style.display = 'flex';
  } else if (section === 'favorites') {
    const favoritesModal = document.getElementById('favorites-modal');
    if (favoritesModal) favoritesModal.style.display = 'flex';
  }
}

// Close Favorites Modal
function closeFavoritesModal() {
  const favoritesModal = document.getElementById('favorites-modal');
  if (favoritesModal) favoritesModal.style.display = 'none';
}

// Remove Item from Favorites
function removeFavorite(buttonElement) {
  const card = buttonElement.closest('.favorite-item-card');
  if (card) {
    card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.remove();
      
      // Check if list is empty
      const container = document.getElementById('favorites-list-container');
      if (container && container.children.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#757575; padding:20px 0;">No saved favorites yet.</p>';
      }
    }, 200);
  }
}// Open Settings Modal inside openAccountSection router
function openAccountSection(section) {
  if (section === 'orders') {
    document.getElementById('orders-modal').style.display = 'flex';
  } else if (section === 'favorites') {
    document.getElementById('favorites-modal').style.display = 'flex';
  } else if (section === 'settings') {
    document.getElementById('settings-modal').style.display = 'flex';
  }
}

// Close Settings Modal
function closeSettingsModal() {
  document.getElementById('settings-modal').style.display = 'none';
}

// Save Notification Preferences to LocalStorage
function saveSettings() {
  const settings = {
    dealsNotify: document.getElementById('toggle-deals-notify').checked,
    ordersNotify: document.getElementById('toggle-orders-notify').checked,
  };
  localStorage.setItem('canna_app_settings', JSON.stringify(settings));
}

// Toggle Dark Mode
function toggleDarkMode(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
  localStorage.setItem('canna_dark_mode', isDark);
}

// Clear App Cache / Local Data
function clearAppData() {
  if (confirm("Are you sure you want to clear cached data? This will reset your favorites and settings.")) {
    localStorage.clear();
    alert("App data reset successfully.");
    location.reload();
  }
}// Load saved dark mode state on page load
document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('canna_dark_mode') === 'true';
  const darkModeToggle = document.getElementById('toggle-dark-mode');
  
  if (isDarkMode) {
    document.body.classList.add('dark-theme');
    if (darkModeToggle) darkModeToggle.checked = true;
  }
});

// Toggle Dark Mode Function
function toggleDarkMode(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
  localStorage.setItem('canna_dark_mode', isDark);
}// Fetch tracking details from your backend database
async function loadDeliveryTracking(orderId) {
  const response = await fetch(`/api/orders/${orderId}`);
  const orderData = await response.json();

  // If tracking URL exists, update the iframe source
  if (orderData.trackingURL) {
    const iframe = document.getElementById('onfleet-tracking-iframe');
    iframe.src = orderData.trackingURL;
  }
}function filterDeals(category, btnElement) {
  // Reset tab button styling
  const buttons = document.querySelectorAll('.deal-tab-btn');
  buttons.forEach(btn => {
    btn.style.background = '#f0f0f0';
    btn.style.color = '#333';
    btn.style.borderColor = '#ddd';
    btn.classList.remove('active');
  });

  // Highlight selected tab
  if (btnElement) {
    btnElement.style.background = '#2e7d32';
    btnElement.style.color = '#fff';
    btnElement.style.borderColor = '#2e7d32';
    btnElement.classList.add('active');
  }

  // Show/Hide deal cards
  const cards = document.querySelectorAll('.deal-card-item');
  cards.forEach(card => {
    if (category === 'all' || card.classList.contains(`deal-group-${category}`)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}