import { showNotification } from '../utils/notifications.js';

// Function to create and show the auto-inactive modal
export async function showAutoInactiveModal() {
  // Create modal HTML
  const modalHTML = `
    <div class="note-modal" id="autoInactiveModal">
      <div class="note-content">
        <div class="note-header">
          <div class="d-flex align-items-center">
            <span class="btn-icon me-2">⏰</span>
            <h5 class="mb-0">Memory Saver</h5>
          </div>
          <button class="close-btn" id="closeAutoInactiveBtn">×</button>
        </div>
        <div class="note-body">
          <div class="setting-section mb-4">
            <div class="setting-header mb-2">
              <h6 class="mb-0">Inactive Time</h6>
              <small class="text-muted">Set how long before tabs become inactive</small>
            </div>
            <div class="time-input-group">
              <input type="number" class="form-control" id="inactiveTime" min="1" max="1440" placeholder="Enter minutes (1-1440)">
              <span class="input-group-text">minutes</span>
            </div>
            <div class="time-presets mt-2">
              <button class="preset-btn" data-time="5">5m</button>
              <button class="preset-btn" data-time="15">15m</button>
              <button class="preset-btn" data-time="30">30m</button>
              <button class="preset-btn" data-time="60">1h</button>
            </div>
          </div>

          <div class="setting-section mb-4">
            <div class="setting-header mb-2">
              <h6 class="mb-0">Active Tab</h6>
              <small class="text-muted">Choose whether to keep the active tab always active</small>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="excludeActiveTab">
              <label class="form-check-label" for="excludeActiveTab">
                Keep active tab always active
              </label>
            </div>
          </div>

          <div class="note-actions">
            <button class="btn btn-secondary me-2" id="cancelAutoInactiveBtn">Cancel</button>
            <button class="btn btn-primary" id="saveAutoInactiveBtn">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add modal to popup
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  // Get modal elements
  const modal = document.getElementById('autoInactiveModal');
  const closeBtn = document.getElementById('closeAutoInactiveBtn');
  const cancelBtn = document.getElementById('cancelAutoInactiveBtn');
  const saveBtn = document.getElementById('saveAutoInactiveBtn');
  const timeInput = document.getElementById('inactiveTime');
  const excludeActiveCheckbox = document.getElementById('excludeActiveTab');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Load existing settings
  const result = await chrome.storage.local.get(['autoInactiveSettings']);
  if (result.autoInactiveSettings) {
    timeInput.value = result.autoInactiveSettings.time || '';
    excludeActiveCheckbox.checked = result.autoInactiveSettings.excludeActive || false;
  }

  // Event listeners
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });

  cancelBtn.addEventListener('click', () => {
    modal.remove();
  });

  // Preset buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const time = parseInt(btn.dataset.time);
      timeInput.value = time;
      timeInput.focus();
    });
  });

  saveBtn.addEventListener('click', async () => {
    const time = parseInt(timeInput.value);
    if (time && time > 0) {
      const settings = {
        time: time,
        excludeActive: excludeActiveCheckbox.checked,
        enabled: true
      };
      await chrome.storage.local.set({ autoInactiveSettings: settings });
      showNotification('Memory saver settings saved!', 'success');
      modal.remove();
    } else {
      showNotification('Please enter a valid time between 1 and 1440 minutes', 'error');
    }
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
} 