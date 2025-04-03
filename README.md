# Easy Chrome Extension

A powerful Chrome extension that enhances your browsing experience with a variety of useful features.

## Features

### Tab Management
- **Hard Refresh**: Clear cache and cookies while refreshing the page (↺)
- **Duplicate Tab**: Create a copy of the current tab (⧉)
- **Group Tabs**: Organize tabs into groups and make them inactive (🗂️)
- **Lock Tab**: Password-protect important tabs (🔒)
- **Auto Inactive**: Automatically make inactive tabs inactive after a set time (⏰)

### Media Controls
- **Toggle Mute**: Quickly mute/unmute tabs (🔊)
- **Picture-in-Picture**: Pop out videos into a floating window (🎬)
  - Supports YouTube Shorts and Instagram Reels
  - Keyboard navigation for Shorts/Reels

### Utility Features
- **Screenshot**: Capture full-page screenshots (📸)
- **URL Shortener**: Create shortened URLs using TinyURL (🔗)
- **Quick Note**: Take notes directly from the extension (📝)

### UI Features
- Draggable buttons for customization
- Persistent button positions
- Modern design with Bootstrap
- Smooth animations
- Toast notifications
- Modal dialogs for settings

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

### Tab Management
- Click the refresh button (↺) to hard refresh the current tab (clears cache and cookies)
- Use the duplicate button (⧉) to create a copy of the current tab
- Click the group button (🗂️) to organize tabs into groups
- Use the lock button (🔒) to password-protect important tabs
- Configure auto-inactive settings (⏰) to automatically manage inactive tabs

### Media Controls
- Click the speaker icon (🔊) to mute/unmute the current tab
- Use the PiP button (🎬) to pop out videos into a floating window
  - Navigate YouTube Shorts/Instagram Reels with arrow keys

### Utility Features
- Click the camera icon (📸) to take a full-page screenshot
- Use the link icon (🔗) to create shortened URLs
- Click the note icon (📝) to take quick notes

### Customization
- Drag and drop buttons to reorder them
- Button positions are saved automatically
- All settings persist across browser sessions

## Development

### Project Structure
```
src/
├── html/
│   └── popup.html
├── css/
│   └── popup.css
├── js/
│   ├── popup/
│   │   ├── popup.js
│   │   ├── screenshot.js
│   │   ├── lockTab.js
│   │   ├── pip.js
│   │   ├── urlShortener.js
│   │   ├── quickNote.js
│   │   └── autoInactive.js
│   └── utils/
│       └── notifications.js
└── public/
    └── icons/
```

### Key Files
- `manifest.json`: Extension configuration
- `popup.html`: Main UI
- `popup.css`: Styling
- `popup.js`: Core functionality
- Feature-specific JS files in `popup/` directory

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
├── src/                 # Source code
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
