# Easy Chrome

A lightweight Chrome extension that provides quick access to common browser actions through a clean, modern interface.

## Features

- **Quick Refresh** (↺): Standard page refresh
- **Hard Refresh** (⚙️): Clears cache for current tab and reloads
- **Clear Cache** (🗑️): Clears entire browser cache
- **Duplicate Tab** (⧉): Opens current page in a new tab
- **Customizable Layout**: Drag and drop buttons to rearrange them (arrangement persists across sessions)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/easy-chrome.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the `easy-chrome` directory

## Project Structure

```
easy-chrome/
├── src/                  # Source code
│   ├── js/              # JavaScript files
│   │   ├── background/  # Background scripts
│   │   └── popup/       # Popup related scripts
│   ├── css/             # Stylesheets
│   └── html/            # HTML files
├── public/              # Public assets
│   └── icons/           # Extension icons
└── manifest.json        # Extension manifest
```

## Technologies Used

- HTML5 Drag and Drop API
- Chrome Extension APIs
- Bootstrap 5.3.0
- Chrome Storage Sync API

## Features in Detail

### Quick Refresh
- Simple page refresh functionality
- Keyboard shortcut equivalent: F5

### Hard Refresh
- Clears cache for the current tab
- Reloads the page bypassing the cache
- Keyboard shortcut equivalent: Ctrl/Cmd + Shift + R

### Clear Cache
- Clears all browser cache
- Shows confirmation when complete
- Useful for development and troubleshooting

### Duplicate Tab
- Opens the current page in a new tab
- New tab opens immediately after the current tab
- Maintains all page state and history

### Customizable Layout
- Drag and drop interface
- Button positions are saved automatically
- Syncs across devices when signed into Chrome
- Smooth animations and visual feedback

## Development

### Prerequisites
- Google Chrome Browser
- Basic knowledge of Chrome Extension development

### Local Development
1. Make changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Click the refresh icon in the extension card

### Building for Production
1. Ensure all files are in their correct directories
2. Update version number in `manifest.json` if needed
3. ZIP the entire directory for distribution

## Permissions Used

- `"tabs"`: For tab manipulation and refresh operations
- `"browsingData"`: For cache clearing operations
- `"storage"`: For saving button arrangements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons and symbols from Unicode character set
- Inspired by common browser functionality needs
- Built with modern Chrome Extension best practices

# Chrome Extension: Floating Navbar for Browser Actions

## 🚀 Overview
This Chrome extension injects a **floating navbar** into all websites, providing quick access to essential browser functions such as:
- **Refresh Page**
- **Hard Refresh (Clear Cache & Reload)**
- **Validate HTML**
- **Clear Cache**
- **More Custom Actions**

The navbar is draggable, lightweight, and designed to stay out of the way while being easily accessible. Users can toggle its visibility through the extension popup.

---

## 🔧 Features
### ✅ Floating Navbar
- Injected into all websites using a **content script**.
- Positioned **at the top-right** of the page by default.
- **Fixed positioning** ensures visibility even when scrolling.
- **Customizable & draggable**.

### ✅ Essential Browser Actions
- **Refresh Button** → Reloads the current page.
- **Hard Refresh Button** → Clears the cache and reloads the page.
- **Validate HTML** → Opens the W3C Validator with the current page's URL.
- **Clear Cache** → Clears browsing cache for improved performance.

### ✅ User Experience
- **Minimalist UI** with a clean and modern design.
- **Draggable Navbar** for flexible placement.
- **Toggle Visibility** via the extension popup.

---

## 📂 Installation
### 🛠 Load Locally (For Development & Testing)
1. Clone this repository:
   ```bash
   git clone https://github.com/Himanxusharma/easy-chrome.git
