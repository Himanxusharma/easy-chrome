import { showNotification } from '../utils/notifications.js';

// Store locked tabs information
let lockedTabs = new Map();

// Function to check if a tab is locked
export async function isTabLocked(tabId) {
  const result = await chrome.storage.local.get(['lockedTabs']);
  return result.lockedTabs?.[tabId] || false;
}

// Function to inject content script
async function injectContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['src/js/content/hideContent.js']
    });
  } catch (error) {
    console.error('Error injecting content script:', error);
  }
}

// Function to update tab title
async function updateTabTitle(tabId, isLocked) {
  try {
    const result = await chrome.storage.local.get(['lockedTabs']);
    const lockedTabs = result.lockedTabs || {};
    const tabInfo = lockedTabs[tabId];
    
    if (isLocked) {
      // Store original title and update to locked state
      if (tabInfo) {
        tabInfo.originalTitle = tabInfo.originalTitle || '🔒 Locked Tab';
        await chrome.tabs.update(tabId, { title: '🔒 Locked Tab' });
      }
    } else {
      // Restore original title
      if (tabInfo && tabInfo.originalTitle) {
        await chrome.tabs.update(tabId, { title: tabInfo.originalTitle });
      }
    }
  } catch (error) {
    console.error('Error updating tab title:', error);
  }
}

// Function to lock a tab
export async function lockTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    // Check if tab is already locked
    if (await isTabLocked(tab.id)) {
      showNotification('Tab is already locked', 'error');
      return;
    }

    // Create password prompt
    const password = prompt('Set a password to lock this tab:');
    if (!password) return;

    // Store locked tab information
    const result = await chrome.storage.local.get(['lockedTabs']);
    const lockedTabs = result.lockedTabs || {};
    lockedTabs[tab.id] = {
      password: password,
      url: tab.url,
      timestamp: Date.now(),
      originalTitle: tab.title // Store original title
    };
    await chrome.storage.local.set({ lockedTabs });

    // Update tab title and hide content
    await updateTabTitle(tab.id, true);
    await injectContentScript(tab.id);
    chrome.tabs.sendMessage(tab.id, { action: 'lock' });

    showNotification('Tab locked successfully', 'success');
  } catch (error) {
    console.error('Error locking tab:', error);
    showNotification('Failed to lock tab', 'error');
  }
}

// Function to unlock a tab
export async function unlockTab(tabId) {
  try {
    const result = await chrome.storage.local.get(['lockedTabs']);
    const lockedTabs = result.lockedTabs || {};
    
    if (!lockedTabs[tabId]) {
      showNotification('Tab is not locked', 'error');
      return;
    }

    const password = prompt('Enter password to unlock:');
    if (!password) return;

    if (password === lockedTabs[tabId].password) {
      // Restore original title before removing from storage
      await updateTabTitle(tabId, false);
      
      delete lockedTabs[tabId];
      await chrome.storage.local.set({ lockedTabs });
      
      // Show content again
      chrome.tabs.sendMessage(tabId, { action: 'unlock' });
      
      showNotification('Tab unlocked successfully', 'success');
    } else {
      showNotification('Incorrect password', 'error');
    }
  } catch (error) {
    console.error('Error unlocking tab:', error);
    showNotification('Failed to unlock tab', 'error');
  }
}

// Listen for tab updates to prevent navigation when locked
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && await isTabLocked(tabId)) {
    const result = await chrome.storage.local.get(['lockedTabs']);
    const lockedTabs = result.lockedTabs || {};
    const originalUrl = lockedTabs[tabId]?.url;
    
    if (originalUrl && tab.url !== originalUrl) {
      chrome.tabs.update(tabId, { url: originalUrl });
    }
  }
});

// Check and restore locked state when tab is loaded
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && await isTabLocked(tabId)) {
    await updateTabTitle(tabId, true);
    await injectContentScript(tabId);
    chrome.tabs.sendMessage(tabId, { action: 'lock' });
  }
}); 