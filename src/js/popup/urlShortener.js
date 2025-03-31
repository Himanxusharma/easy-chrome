import { showNotification } from '../utils/notifications.js';

// Function to shorten URL using TinyURL API
export async function shortenURL() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    const longUrl = tab.url;
    
    // Create TinyURL
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    const shortUrl = await response.text();

    // Copy to clipboard
    await navigator.clipboard.writeText(shortUrl);
    
    showNotification('URL shortened and copied to clipboard!', 'success');
    
    // Show the shortened URL in a prompt
    prompt('Shortened URL (copied to clipboard):', shortUrl);
  } catch (error) {
    console.error('Error shortening URL:', error);
    showNotification('Failed to shorten URL', 'error');
  }
} 