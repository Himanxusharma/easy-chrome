document.addEventListener('DOMContentLoaded', () => {
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
}); 