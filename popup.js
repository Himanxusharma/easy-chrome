document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('buttonContainer');
  const buttons = buttonContainer.getElementsByClassName('action-btn');

  // Add drag and drop functionality
  Array.from(buttons).forEach(button => {
    button.addEventListener('dragstart', handleDragStart);
    button.addEventListener('dragend', handleDragEnd);
    button.addEventListener('dragover', handleDragOver);
    button.addEventListener('drop', handleDrop);
    button.addEventListener('dragenter', handleDragEnter);
    button.addEventListener('dragleave', handleDragLeave);
  });

  let draggedButton = null;

  function handleDragStart(e) {
    draggedButton = this;
    this.classList.add('dragging');
  }

  function handleDragEnd(e) {
    this.classList.remove('dragging');
    Array.from(buttons).forEach(button => {
      button.classList.remove('drag-over');
    });
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnter(e) {
    e.preventDefault();
    if (this !== draggedButton) {
      this.classList.add('drag-over');
    }
  }

  function handleDragLeave(e) {
    this.classList.remove('drag-over');
  }

  function handleDrop(e) {
    e.preventDefault();
    if (this !== draggedButton) {
      const allButtons = [...buttons];
      const draggedPos = draggedButton.dataset.position;
      const droppedPos = this.dataset.position;
      
      // Update positions
      draggedButton.dataset.position = droppedPos;
      this.dataset.position = draggedPos;

      // Reorder DOM elements
      const buttonArray = Array.from(buttons);
      buttonArray.sort((a, b) => a.dataset.position - b.dataset.position);
      buttonArray.forEach(button => buttonContainer.appendChild(button));
    }
    this.classList.remove('drag-over');
  }

  // Regular button functionality
  const refreshButton = document.getElementById('refreshBtn');
  
  refreshButton.addEventListener('click', () => {
    chrome.tabs.reload();
  });

  const hardRefreshButton = document.getElementById('hardRefreshBtn');
  
  hardRefreshButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Clear cache for the current tab's domain
        chrome.browsingData.removeCache({
          "since": Date.now()
        }, () => {
          // After clearing cache, reload the tab bypassing the cache
          chrome.tabs.reload(tabs[0].id, { bypassCache: true });
        });
      }
    });
  });

  const clearCacheButton = document.getElementById('clearCacheBtn');
  
  clearCacheButton.addEventListener('click', () => {
    // Clear all browser cache
    chrome.browsingData.remove({
      "since": 0
    }, {
      "cache": true,
      "cacheStorage": true
    }, () => {
      // Show confirmation alert
      alert('Browser cache has been cleared!');
    });
  });
}); 