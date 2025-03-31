# Easy Chrome Extension

A simple Chrome extension that provides quick access to common browser actions.

## Features

### Tab Management
- **Refresh Tab** (↺): Reload the current tab
- **Hard Refresh** (⚙️): Clear cache and reload the current tab
- **Clear Cache** (🗑️): Clear browser cache and storage
- **Duplicate Tab** (⧉): Create a copy of the current tab
- **Group Tabs** (🗂️): Automatically group all tabs in the current window
- **Lock Tab** (🔒): Password protect sensitive tabs
- **Memory Saver** (⏰): Automatically make inactive tabs inactive to save memory

### Media Controls
- **Mute/Unmute** (🔊/🔇): Toggle audio for the current tab
- **Picture-in-Picture** (🎬): 
  - Pop out videos into a floating window
  - Supports YouTube Shorts navigation (Up/Down arrows)
  - Supports Instagram Reels

### Utility Features
- **Screenshot** (📸): Capture full-page screenshots
- **URL Shortener** (🔗): Create shortened URLs using TinyURL
- **Quick Note** (📝): Take notes that persist across all tabs

### UI Features
- Draggable buttons for custom ordering
- Persistent button positions
- Modern glassmorphism design
- Smooth animations and transitions
- Responsive layout

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

### Tab Management
- Click the refresh button (↺) to reload the current tab
- Use hard refresh (⚙️) to clear cache and reload
- Click the trash icon (🗑️) to clear browser cache
- Use the duplicate button (⧉) to create a copy of the current tab
- Click the folder icon (🗂️) to group all tabs
- Use the lock icon (🔒) to password protect tabs
- Set up memory saver (⏰) to automatically make inactive tabs inactive

### Media Controls
- Click the speaker icon (🔊/🔇) to toggle audio
- Use the video icon (🎬) to pop out videos
- Navigate YouTube Shorts with Up/Down arrows
- Works with Instagram Reels

### Utility Features
- Click the camera icon (📸) to take screenshots
- Use the link icon (🔗) to shorten URLs
- Click the note icon (📝) to take quick notes

### Customization
- Drag and drop buttons to reorder them
- Button positions are saved automatically
- Settings persist across browser sessions

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
│   │   │   ├── lockTab.js
│   │   │   ├── pip.js
│   │   │   ├── urlShortener.js
│   │   │   ├── quickNote.js
│   │   │   ├── groupTabs.js
│   │   │   └── autoInactive.js
│   │   ├── background/
│   │   │   └── screenshot.js
│   │   ├── content/
│   │   │   └── hideContent.js
│   │   └── utils/
│   │       └── notifications.js
│   └── manifest.json
└── public/
    └── icons/
        └── icon.svg
```

### Key Files
- `manifest.json`: Extension configuration
- `popup.html`: Main UI structure
- `popup.css`: Styling and animations
- `popup.js`: Core functionality and button handlers
- `notifications.js`: Shared notification system

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please open an issue in the GitHub repository or contact [contact information].

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
