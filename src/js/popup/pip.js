import { showNotification } from '../utils/notifications.js';

// Function to check if the current page is Instagram Reels
async function isInstagramReels() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      return window.location.pathname.includes('/reels/') || 
             window.location.pathname.includes('/reel/');
    }
  });

  return result[0].result;
}

// Function to check if the current page is YouTube Shorts
async function isYouTubeShorts() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      return window.location.pathname === '/shorts' || 
             window.location.pathname.includes('/shorts/');
    }
  });

  return result[0].result;
}

// Function to find the largest video element on the page
async function findLargestVideo() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const videos = Array.from(document.getElementsByTagName('video'));
      if (videos.length === 0) return null;

      // Find the largest video by area
      const largestVideo = videos.reduce((largest, current) => {
        const largestArea = largest ? largest.videoWidth * largest.videoHeight : 0;
        const currentArea = current.videoWidth * current.videoHeight;
        return currentArea > largestArea ? current : largest;
      });

      return {
        src: largestVideo.src || largestVideo.currentSrc,
        width: largestVideo.videoWidth,
        height: largestVideo.videoHeight,
        playing: !largestVideo.paused,
        currentTime: largestVideo.currentTime,
        isYouTubeShorts: window.location.pathname === '/shorts' || 
                        window.location.pathname.includes('/shorts/'),
        isInstagramReels: window.location.pathname.includes('/reels/') || 
                         window.location.pathname.includes('/reel/')
      };
    }
  });

  return result[0].result;
}

// Function to handle Instagram Reels navigation
async function handleReelsNavigation(direction) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: (direction) => {
      if (direction === 'up') {
        // Find and click the "Next" button for Instagram Reels
        const nextButton = document.querySelector('button[aria-label="Next"]') || 
                          document.querySelector('button[aria-label="Next reel"]');
        if (nextButton) nextButton.click();
      } else if (direction === 'down') {
        // Find and click the "Previous" button for Instagram Reels
        const prevButton = document.querySelector('button[aria-label="Previous"]') || 
                          document.querySelector('button[aria-label="Previous reel"]');
        if (prevButton) prevButton.click();
      }
    },
    args: [direction]
  });
}

// Function to handle YouTube Shorts navigation
async function handleShortsNavigation(direction) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: (direction) => {
      if (direction === 'up') {
        // Find and click the "Next" button
        const nextButton = document.querySelector('button[aria-label="Next video"]');
        if (nextButton) nextButton.click();
      } else if (direction === 'down') {
        // Find and click the "Previous" button
        const prevButton = document.querySelector('button[aria-label="Previous video"]');
        if (prevButton) prevButton.click();
      }
    },
    args: [direction]
  });
}

// Function to toggle Picture-in-Picture
export async function togglePiP() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if PiP is already active
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        return document.pictureInPictureElement !== null;
      }
    });

    if (result[0].result) {
      // Exit PiP mode
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          }
        }
      });
      showNotification('Exited Picture-in-Picture mode', 'success');
      return;
    }

    // Find the largest video
    const videoInfo = await findLargestVideo();
    if (!videoInfo) {
      showNotification('No video found on this page', 'error');
      return;
    }

    // Enter PiP mode
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (videoInfo) => {
        const videos = document.getElementsByTagName('video');
        for (const video of videos) {
          if (video.src === videoInfo.src || video.currentSrc === videoInfo.src) {
            if (videoInfo.playing) {
              video.play();
            } else {
              video.pause();
            }
            video.currentTime = videoInfo.currentTime;
            
            // Add custom controls for YouTube Shorts and Instagram Reels
            if (videoInfo.isYouTubeShorts || videoInfo.isInstagramReels) {
              video.addEventListener('enterpictureinpicture', () => {
                // Add keyboard event listeners for navigation
                document.addEventListener('keydown', (e) => {
                  if (document.pictureInPictureElement === video) {
                    if (e.key === 'ArrowUp') {
                      // Handle up navigation
                      if (videoInfo.isYouTubeShorts) {
                        const nextButton = document.querySelector('button[aria-label="Next video"]');
                        if (nextButton) nextButton.click();
                      } else if (videoInfo.isInstagramReels) {
                        const nextButton = document.querySelector('button[aria-label="Next"]') || 
                                         document.querySelector('button[aria-label="Next reel"]');
                        if (nextButton) nextButton.click();
                      }
                    } else if (e.key === 'ArrowDown') {
                      // Handle down navigation
                      if (videoInfo.isYouTubeShorts) {
                        const prevButton = document.querySelector('button[aria-label="Previous video"]');
                        if (prevButton) prevButton.click();
                      } else if (videoInfo.isInstagramReels) {
                        const prevButton = document.querySelector('button[aria-label="Previous"]') || 
                                         document.querySelector('button[aria-label="Previous reel"]');
                        if (prevButton) prevButton.click();
                      }
                    }
                  }
                });
              });
            }
            
            video.requestPictureInPicture();
            break;
          }
        }
      },
      args: [videoInfo]
    });

    showNotification('Entered Picture-in-Picture mode', 'success');
  } catch (error) {
    showNotification('Failed to toggle Picture-in-Picture', 'error');
  }
}

// Function to handle keyboard navigation
export async function handleKeyboardNavigation(event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    const isShorts = await isYouTubeShorts();
    const isReels = await isInstagramReels();
    
    if (isShorts) {
      await handleShortsNavigation(event.key === 'ArrowUp' ? 'up' : 'down');
    } else if (isReels) {
      await handleReelsNavigation(event.key === 'ArrowUp' ? 'up' : 'down');
    }
  }
} 