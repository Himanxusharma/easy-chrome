// Function to show notification
function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create and show notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove after animation completes
  setTimeout(() => notification.remove(), 1200);
}

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
    console.error('Error capturing screenshot:', error);
    showNotification('Screenshot failed', 'error');
  }
}

export { captureFullPageScreenshot }; 