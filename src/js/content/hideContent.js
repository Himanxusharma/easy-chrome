// Create overlay to hide content
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'tab-lock-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1a1a1a;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: Arial, sans-serif;
  `;

  const lockIcon = document.createElement('div');
  lockIcon.style.cssText = `
    font-size: 48px;
    margin-bottom: 20px;
  `;
  lockIcon.textContent = '🔒';

  const message = document.createElement('div');
  message.style.cssText = `
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  `;
  message.textContent = 'This tab is locked';

  const subMessage = document.createElement('div');
  subMessage.style.cssText = `
    font-size: 16px;
    color: #888;
    text-align: center;
  `;
  subMessage.textContent = 'Use the extension to unlock';

  overlay.appendChild(lockIcon);
  overlay.appendChild(message);
  overlay.appendChild(subMessage);
  return overlay;
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'lock') {
    const overlay = createOverlay();
    document.body.appendChild(overlay);
  } else if (message.action === 'unlock') {
    const overlay = document.getElementById('tab-lock-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
}); 