document.addEventListener('DOMContentLoaded', () => {
  const refreshButton = document.getElementById('refreshBtn');
  
  refreshButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.reload(tab.id);
  });
}); 