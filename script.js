// Store Location Menu URLs
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
});