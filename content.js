// Remove in-video ads
const removeAds = () => {
    const adContainers = document.querySelectorAll(
      '.video-ads, .ytp-ad-module, .ytp-ad-overlay-container'
    );
    adContainers.forEach((ad) => ad.remove());
  };

  
  // Observe the page for changes and apply ad-blocking
  const observer = new MutationObserver(() => {
    removeAds();
    hideAds();
  });
  
  // Start observing the YouTube DOM
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  