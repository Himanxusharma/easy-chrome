import { captureFullPageScreenshot } from './screenshot.js';
import { groupAllTabs } from './groupTabs.js';

document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('buttonContainer');
  const buttons = buttonContainer.querySelectorAll('.action-btn');
  let draggedButton = null;

  // Initialize drag and drop
  Array.from(buttons).forEach(button => {
    button.draggable = true;
    
    button.addEventListener('dragstart', (e) => {
      draggedButton = button;
      button.classList.add('dragging');
    });

    button.addEventListener('dragend', () => {
      button.classList.remove('dragging');
      Array.from(buttons).forEach(btn => btn.classList.remove('drag-over'));
    });

    button.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    button.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (button !== draggedButton) {
        button.classList.add('drag-over');
      }
    });

    button.addEventListener('dragleave', () => {
      button.classList.remove('drag-over');
    });

    button.addEventListener('drop', (e) => {
      e.preventDefault();
      button.classList.remove('drag-over');
      
      if (button !== draggedButton) {
        const allButtons = Array.from(buttons);
        const draggedIndex = allButtons.indexOf(draggedButton);
        const droppedIndex = allButtons.indexOf(button);

        if (draggedIndex !== -1 && droppedIndex !== -1) {
          // Swap positions in data attributes
          const draggedPos = draggedButton.dataset.position;
          draggedButton.dataset.position = button.dataset.position;
          button.dataset.position = draggedPos;

          // Save positions to storage
          const positions = {};
          allButtons.forEach(btn => {
            positions[btn.id] = parseInt(btn.dataset.position);
          });
          chrome.storage.sync.set({ buttonPositions: positions });

          // Reorder DOM elements
          const sortedButtons = allButtons.sort((a, b) => 
            parseInt(a.dataset.position) - parseInt(b.dataset.position)
          );
          sortedButtons.forEach(btn => buttonContainer.appendChild(btn));
        }
      }
    });
  });

  // Restore positions from storage
  chrome.storage.sync.get(['buttonPositions'], (result) => {
    if (result.buttonPositions) {
      const positions = result.buttonPositions;
      const buttonArray = Array.from(buttons);
      buttonArray.forEach(button => {
        if (positions[button.id] !== undefined) {
          button.dataset.position = positions[button.id];
        }
      });
      
      // Sort buttons based on restored positions
      buttonArray.sort((a, b) => parseInt(a.dataset.position) - parseInt(b.dataset.position));
      buttonArray.forEach(button => buttonContainer.appendChild(button));
    }
  });

  // Button functionality
  document.getElementById('refreshBtn').addEventListener('click', () => {
    chrome.tabs.reload();
  });

  document.getElementById('hardRefreshBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.browsingData.removeCache({
          "since": Date.now()
        }, () => {
          chrome.tabs.reload(tabs[0].id, { bypassCache: true });
        });
      }
    });
  });

  document.getElementById('clearCacheBtn').addEventListener('click', () => {
    chrome.browsingData.remove({
      "since": 0
    }, {
      "cache": true,
      "cacheStorage": true
    }, () => {
      alert('Browser cache has been cleared!');
    });
  });

  document.getElementById('duplicateTabBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.create({
          url: tabs[0].url,
          active: true,
          index: tabs[0].index + 1
        });
      }
    });
  });

  // Screenshot button functionality
  document.getElementById('screenshotBtn').addEventListener('click', async () => {
    try {
      await captureFullPageScreenshot();
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  });

  // Mute button functionality
  const muteBtn = document.getElementById('muteBtn');
  const muteBtnIcon = muteBtn.querySelector('.btn-icon');

  // Check initial mute state and update icon
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const isMuted = tabs[0].mutedInfo?.muted || false;
      muteBtnIcon.textContent = isMuted ? '🔇' : '🔊';
      muteBtn.title = isMuted ? 'Unmute Tab' : 'Mute Tab';
    }
  });

  muteBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const isMuted = tabs[0].mutedInfo?.muted || false;
        chrome.tabs.update(tabs[0].id, { muted: !isMuted }, (tab) => {
          // Update icon based on new state
          muteBtnIcon.textContent = tab.mutedInfo.muted ? '🔇' : '🔊';
          muteBtn.title = tab.mutedInfo.muted ? 'Unmute Tab' : 'Mute Tab';
        });
      }
    });
  });

  // Group tabs button functionality
  document.getElementById('groupTabsBtn').addEventListener('click', async () => {
    try {
      await groupAllTabs();
    } catch (error) {
      console.error('Error grouping tabs:', error);
    }
  });
}); 