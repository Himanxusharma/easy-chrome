# Easy Chrome - Chrome Extension

A powerful Chrome extension that provides quick access to common browser actions with a modern, intuitive interface.

## Features

### 1. Tab Management
- **Refresh Tab** (↺)
  - Quick refresh of the current tab
  - Maintains current page state

- **Hard Refresh** (⚙️)
  - Clears cache and performs a hard refresh
  - Useful for loading fresh content

- **Duplicate Tab** (⧉)
  - Creates an exact copy of the current tab
  - Opens next to the original tab

- **Group Tabs** (🗂️)
  - Automatically groups all tabs in the current window
  - Creates a new group with a unique timestamp-based name
  - Maintains tab order and relationships

### 2. Cache Management
- **Clear Browser Cache** (🗑️)
  - Clears all browser cache and storage
  - Helps resolve loading issues
  - Improves browser performance

### 3. Audio Control
- **Mute/Unmute** (🔊/🔇)
  - Toggle audio for the current tab
  - Visual indicator shows current state
  - Persists across page refreshes

### 4. Screenshot Tool
- **Take Screenshot** (📸)
  - Captures full-page screenshots
  - Automatically downloads the image
  - High-quality output with proper scaling

### 5. Tab Security
- **Lock Tab** (🔒)
  - Password-protect sensitive tabs
  - Hides tab content with a secure overlay
  - Prevents navigation when locked
  - Modifies tab title to indicate locked state
  - Persists lock state across browser sessions
  - Features:
    - Custom password protection
    - Visual lock indicator
    - Content hiding
    - Navigation prevention
    - State persistence

### 6. UI Features
- **Modern Design**
  - Animated gradient background
  - Glassmorphism effects
  - Smooth transitions and animations
  - Custom tooltips
  - Responsive layout

- **Customization**
  - Draggable buttons for custom arrangement
  - Position persistence across sessions
  - Visual feedback on interactions
  - Notification system for user feedback

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/easy-chrome.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use any of the available buttons to perform actions
3. Drag buttons to rearrange them according to your preference
4. Hover over buttons to see tooltips with descriptions

## Security Features

- **Tab Lock**
  - Set custom passwords for sensitive tabs
  - Content is hidden with a secure overlay
  - Prevents accidental navigation
  - Visual indicators for locked state
  - Secure storage of lock states

## Permissions

The extension requires the following permissions:
- `tabs`: For tab manipulation and management
- `storage`: For saving user preferences and lock states
- `activeTab`: For accessing current tab information
- `tabGroups`: For tab grouping functionality
- `browsingData`: For cache clearing
- `tabCapture`: For screenshot functionality
- `scripting`: For content script injection

## Development

### Project Structure
```
easy-chrome/
├── src/
│   ├── html/
│   │   └── popup.html
│   ├── css/
│   │   └── popup.css
│   ├── js/
│   │   ├── popup/
│   │   │   ├── popup.js
│   │   │   ├── screenshot.js
│   │   │   ├── groupTabs.js
│   │   │   └── lockTab.js
│   │   ├── background/
│   │   │   └── screenshot.js
│   │   ├── content/
│   │   │   └── hideContent.js
│   │   └── utils/
│   │       └── notifications.js
│   └── icons/
│       └── icon.svg
└── manifest.json
```

### Building
No build process required. The extension can be loaded directly into Chrome.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chrome Extension APIs
- Bootstrap for UI components
- Modern CSS techniques for visual effects
