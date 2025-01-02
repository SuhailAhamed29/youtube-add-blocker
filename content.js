// Log when the content script is loaded
console.log("YouTube Ad Blocker: Content script loaded");

// Function to remove in-video ads
const removeAds = () => {
  const adContainers = document.querySelectorAll(
    '.video-ads, .ytp-ad-module, .ytp-ad-overlay-container'
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

// Function to observe changes in the page and apply ad-blocking
const observer = new MutationObserver(() => {
  console.log('Mutation detected, removing ads...');
  removeAds();
  hideAds();
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
