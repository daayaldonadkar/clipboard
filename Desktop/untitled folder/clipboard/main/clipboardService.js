const { clipboard } = require('electron');

const MAX_HISTORY = 30;
const POLL_INTERVAL_MS = 400;

let clipboardHistory = [];
let pollTimer = null;
let updateCallback = null;

function setUpdateCallback(cb) {
  updateCallback = cb;
}

function startListening() {
  if (pollTimer) return;

  pollTimer = setInterval(() => {
    const currentText = clipboard.readText().trim();
    if (!currentText) return;
    
    // Check if the text is already at the top of history
    if (clipboardHistory.length > 0 && clipboardHistory[0].text === currentText) return;

    // Remove existing entry with same text if it exists (for deduplication)
    const existingIndex = clipboardHistory.findIndex(item => item.text === currentText);
    let existingItem = null;
    if (existingIndex !== -1) {
      existingItem = clipboardHistory.splice(existingIndex, 1)[0];
    }

    // Create or update item
    const newItem = {
      text: currentText,
      usageCount: existingItem ? existingItem.usageCount : 0,
      isBookmarked: existingItem ? existingItem.isBookmarked : false,
      createdAt: Date.now()
    };

    // Add to top of history
    clipboardHistory.unshift(newItem);

    if (clipboardHistory.length > MAX_HISTORY) {
      clipboardHistory = clipboardHistory.slice(0, MAX_HISTORY);
    }

    if (updateCallback) {
      updateCallback([...clipboardHistory]);
    }
  }, POLL_INTERVAL_MS);
}

function getHistory() {
  return clipboardHistory;
}

module.exports = { startListening, getHistory, setUpdateCallback };
