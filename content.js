// Log when the content script is loaded
console.log("YouTube Ad Blocker: Content script loaded");

// Function to remove in-video ads
const removeAds = () => {
  const adContainers = document.querySelectorAll(
    '.video-ads, .ytp-ad-module, .ytp-ad-overlay-container, .ytp-ad-player-overlay'
  );
  console.log('Ad containers found:', adContainers); // Debugging
  adContainers.forEach((ad) => {
    ad.remove();
    console.log('Removed ad container:', ad); // Debugging
  });
};

// Function to hide sidebar and banner ads
const hideAds = () => {
  const adElements = document.querySelectorAll(
    'ytd-promoted-sparkles-web-renderer, ytd-display-ad-renderer, .ytd-player-legacy-desktop-watch-ads-renderer'
  );
  console.log('Sidebar/banner ads found:', adElements); // Debugging
  adElements.forEach((ad) => {
    ad.style.display = 'none';
    console.log('Hid ad element:', ad); // Debugging
  });
};

// Function to detect and block mid-roll ads by observing the ad's elements during playback
const observeForMidRollAds = () => {
  const adOverlay = document.querySelector('.ytp-ad-overlay-container');
  
  if (adOverlay) {
    console.log('Mid-roll ad detected');
    removeAds();
  }
};

// Function to observe changes in the page and apply ad-blocking
const observer = new MutationObserver(() => {
  console.log('Mutation detected, removing ads...');
  removeAds();
  hideAds();
  observeForMidRollAds(); // Check for mid-roll ads during page updates
});

// Start observing the YouTube DOM for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Additional fallback to remove ads after a short delay
setTimeout(() => {
  console.log("Fallback ad removal triggered...");
  removeAds();
  hideAds();
}, 3000); // Delay added to account for dynamic loading of content

// Periodically check for mid-roll ads
setInterval(() => {
  console.log('Periodic check for mid-roll ads...');
  observeForMidRollAds();
}, 1000); // Check every second for mid-roll ads
