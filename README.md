# Easy Chrome - Chrome Extension

A powerful Chrome extension that enhances your browsing experience with essential features and a modern, intuitive interface.

## 🌟 Features

### Core Functions
- 🔄 **Refresh Tab**: Quick refresh with cache clearing
- 🔄 **Hard Refresh**: Complete page reload with cache clearing
- 📋 **Duplicate Tab**: Create a copy of the current tab
- 🔇 **Mute/Unmute**: Toggle tab audio with visual feedback
- 🎯 **Pin Tab**: Keep important tabs in your browser
- 🎨 **Customizable Interface**: Drag-and-drop button arrangement
- 📸 **Take Screenshot**: Capture a screenshot of the current tab
- 🗂️ **Group Tabs**: Organize tabs efficiently

### User Experience
- 🎨 **Modern Design**: Clean, intuitive interface
- 🎯 **Drag & Drop**: Customize button positions
- 💾 **Settings Persistence**: Saves your preferences
- 🔄 **Real-time Updates**: Instant visual feedback
- 🎨 **Responsive Design**: Works on all screen sizes

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/easy-chrome.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the extension directory

## 🛠️ Features in Detail

### Refresh Tab
- Quick refresh with cache clearing
- Maintains current page state
- Instant visual feedback
- Keyboard shortcut support

### Hard Refresh
- Complete page reload
- Clears all cached data
- Useful for development
- Resets page state

### Duplicate Tab
- Creates exact copy of current tab
- Preserves page state
- Maintains history
- Quick tab management

### Toggle Mute
- Dynamic icon updates (🔊/🔇)
- Real-time state changes
- Persists across refreshes
- Visual feedback

### Pin Tab
- Keeps tabs in browser
- Quick access to important pages
- Prevents accidental closing
- Browser restart preservation

### Take Screenshot
- Capture a screenshot of the current tab
- Save the screenshot to your device
- Quick and easy access to visual content

### Group Tabs
- Creates a new group for all tabs in the current window
- Groups are named with the current date (e.g., "31 Mar")
- One group per day for better organization
- Automatically adds new tabs to the existing group for the day
- Easy to identify and manage your daily browsing sessions

## 🔒 Permissions Used

The extension requires the following permissions to function properly:

### Tab Management
- `"tabs"`: Required to:
  - Access and manipulate the current tab
  - Get tab information for refresh operations
  - Check tab mute status
  - Create new tabs for the duplicate feature

### Data Management
- `"browsingData"`: Required to:
  - Clear browser cache
  - Perform hard refresh operations
  - Remove cached data for specific tabs
  - Improve browsing performance through cache management

### Storage & Sync
- `"storage"`: Required to:
  - Save user preferences
  - Store button arrangement positions
  - Sync settings across devices when signed into Chrome
  - Persist user customizations between browser sessions

### Audio Control
- `"tabCapture"`: Required to:
  - Control tab audio states
  - Toggle mute/unmute functionality
  - Access tab audio information
  - Update mute status indicators

### Additional Permissions
- `"activeTab"`: Required to:
  - Access the current tab
- `"downloads"`: Required to:
## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

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
