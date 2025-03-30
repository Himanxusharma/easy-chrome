// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureScreenshot') {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match the viewport
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Draw the visible viewport
      context.drawImage(document.documentElement, 0, 0, canvas.width, canvas.height);

      // Convert to data URL and send back
      sendResponse({ success: true, dataUrl: canvas.toDataURL('image/png') });
    } catch (error) {
      console.error('Screenshot error:', error);
      sendResponse({ success: false, error: error.message });
    }
    return true; // Will respond asynchronously
  }
}); 