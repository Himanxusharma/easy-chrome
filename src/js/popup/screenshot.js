import { showNotification } from '../utils/notifications.js';

// Function to capture screenshot
async function captureFullPageScreenshot() {
  try {
    const response = await chrome.runtime.sendMessage({ action: 'captureScreenshot' });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to capture screenshot');
    }

    // Download screenshot
    const link = document.createElement('a');
    link.download = `screenshot-${new Date().toISOString().slice(0,10)}.png`;
    link.href = response.dataUrl;
    link.click();

    showNotification('Screenshot saved!');

  } catch (error) {
    showNotification('Screenshot failed', 'error');
  }
}

export { captureFullPageScreenshot }; 