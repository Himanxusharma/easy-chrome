import { showNotification } from '../utils/notifications.js';

// Function to generate group name with date format
function generateGroupName() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
}

// Function to group all tabs
async function groupAllTabs() {
  try {
    // Get all tabs in the current window
    const tabs = await chrome.tabs.query({ currentWindow: true });
    
    if (tabs.length === 0) {
      throw new Error('No tabs found');
    }

    // Get today's group name
    const groupName = generateGroupName();

    // Check if a group with today's date already exists
    const existingGroups = await chrome.tabGroups.query({});
    const todayGroup = existingGroups.find(group => group.title === groupName);

    if (todayGroup) {
      // If group exists, add all ungrouped tabs to it
      const ungroupedTabs = tabs.filter(tab => tab.groupId === chrome.tabs.TAB_ID_NONE);
      if (ungroupedTabs.length > 0) {
        await chrome.tabs.group({
          groupId: todayGroup.id,
          tabIds: ungroupedTabs.map(tab => tab.id)
        });
        showNotification('Tabs added to today\'s group!');
      } else {
        showNotification('All tabs are already in today\'s group!', 'info');
      }
      return;
    }

    // Create a new group for today
    const groupId = await chrome.tabs.group({
      tabIds: tabs.map(tab => tab.id),
      createProperties: {
        windowId: tabs[0].windowId
      }
    });

    // Update the group's properties
    await chrome.tabGroups.update(groupId, {
      title: groupName,
      color: 'blue'
    });

    showNotification('Today\'s group created successfully!');

  } catch (error) {
    console.error('Error grouping tabs:', error);
    showNotification('Failed to create group', 'error');
  }
}

// Export the function
export { groupAllTabs }; 