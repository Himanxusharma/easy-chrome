import { showNotification } from '../utils/notifications.js';

// Function to create and show the note modal
export async function showQuickNote() {
  // Create modal HTML
  const modalHTML = `
    <div class="note-modal" id="noteModal">
      <div class="note-content">
        <div class="note-header">
          <h5>Quick Note</h5>
          <button class="close-btn" id="closeNoteBtn">×</button>
        </div>
        <div class="note-body">
          <textarea id="noteText" placeholder="Write your note here..."></textarea>
          <div class="note-actions">
            <button class="clear-btn" id="clearNoteBtn">Clear All Notes</button>
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
  const modal = document.getElementById('noteModal');
  const closeBtn = document.getElementById('closeNoteBtn');
  const clearBtn = document.getElementById('clearNoteBtn');
  const noteText = document.getElementById('noteText');

  // Load existing note
  const result = await chrome.storage.local.get(['globalNote']);
  if (result.globalNote) {
    noteText.value = result.globalNote;
  }

  // Save immediately on keyup without notification
  noteText.addEventListener('keyup', async () => {
    const text = noteText.value.trim();
    await chrome.storage.local.set({ globalNote: text });
  });

  // Event listeners
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });

  clearBtn.addEventListener('click', async () => {
    noteText.value = '';
    await chrome.storage.local.set({ globalNote: '' });
    showNotification('All notes cleared!', 'success');
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
} 