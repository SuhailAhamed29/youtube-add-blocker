console.log("YouTube Ad Blocker: Script loaded");

// Function to remove ads on YouTube
const removeAds = () => {
  try {
    // Remove video ads
    const videoAds = document.querySelectorAll('.video-ads, .ytp-ad-module, .ytp-ad-overlay-container, .ytp-ad-player-overlay');
    videoAds.forEach((ad) => {
      console.log("Removing video ad:", ad);
      ad.remove();
    });

    // Hide promoted videos and banners
    const promotedContent = document.querySelectorAll('ytd-promoted-sparkles-web-renderer, ytd-display-ad-renderer');
    promotedContent.forEach((ad) => {
      console.log("Hiding promoted content:", ad);
      ad.style.display = "none";
    });

    // Remove ad-related iframes
    const adIframes = document.querySelectorAll('iframe');
    adIframes.forEach((iframe) => {
      if (iframe.src.includes('googleads') || iframe.src.includes('doubleclick.net')) {
        console.log("Removing ad iframe:", iframe);
        iframe.remove();
      }
    });
  } catch (error) {
    console.error("Error while removing ads:", error);
  }
};

// Observe changes in the DOM for dynamically loaded ads
const observer = new MutationObserver(() => {
  console.log("DOM mutation detected, checking for ads...");
  removeAds();
});

// Start observing changes on the page
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Periodic fallback for missed ads
setInterval(() => {
  console.log("Periodic ad check triggered...");
  removeAds();
}, 3000); // Every 3 seconds
