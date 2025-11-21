# LG WebOS Installation Guide
# iWATCH TV - LG Smart TV App

## Overview
This folder contains the LG WebOS application files for iWATCH TV streaming service.

## Files Included
- `appinfo.json` - WebOS app configuration
- `index.html` - Main application file
- `icon.png` - App icon for LG store
- `manifest.json` - PWA manifest

## Installation Methods

### Method 1: Developer Mode (Testing)
1. Enable Developer Mode on LG TV:
   - Settings → General → About TV
   - Tap "Software Version" 5 times
   - Enable "Developer Mode"

2. Install via WebOS CLI:
   ```bash
   npm install -g @webosose/ares-cli
   ares install com.iwatch.tv_1.0.0_all.ipk
   ```

### Method 2: LG App Store (Production)
1. Register as LG Developer
2. Submit app for certification
3. Publish to LG Content Store

### Method 3: USB Installation
1. Package app as .ipk file
2. Copy to USB drive
3. Install via file manager

## WebOS App Configuration

### appinfo.json
```json
{
    "id": "com.iwatch.tv",
    "version": "1.0.0",
    "vendor": "iWATCH TV",
    "type": "web",
    "main": "index.html",
    "title": "iWATCH TV",
    "icon": "icon.png",
    "largeIcon": "icon.png",
    "displayName": "iWATCH TV",
    "description": "Premium streaming service with movies, TV shows, and live channels",
    "developer": {
        "name": "iWATCH TV",
        "email": "support@iwatch.tv"
    },
    "categories": ["multimedia", "entertainment"],
    "screenshots": [
        {
            "src": "screenshot1.png",
            "size": "1280x720",
            "caption": "Main interface"
        }
    ],
    "keywords": ["streaming", "tv", "movies", "entertainment"],
    "mediaIndex": {
        "streaming": true,
        "dvr": false,
        "broadcasting": false
    },
    "csp": [
        "connect-src *",
        "img-src * data: blob:",
        "media-src * blob:",
        "style-src * 'unsafe-inline'",
        "script-src * 'unsafe-inline' 'unsafe-eval'"
    ]
}
```

## Features
- ✅ WebOS-optimized interface
- ✅ Magic Remote support
- ✅ Voice control integration
- ✅ 4K streaming support
- ✅ LG Content Store ready
- ✅ Parental controls

## Technical Requirements
- LG WebOS 3.0+
- 1GB RAM minimum
- 2GB storage space
- Wi-Fi connection

## Remote Control Navigation
```javascript
// WebOS Remote Control Support
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            // Navigate left
            break;
        case 'ArrowRight':
            // Navigate right
            break;
        case 'ArrowUp':
            // Navigate up
            break;
        case 'ArrowDown':
            // Navigate down
            break;
        case 'Enter':
        case 'Space':
            // Select/Play
            break;
        case 'Backspace':
        case 'Escape':
            // Go back
            break;
    }
});
```

## Packaging for Distribution
```bash
# Create .ipk package
ares package com.iwatch.tv
```

## Testing
1. Install WebOS SDK
2. Use Emulator for testing
3. Test on actual LG TV
4. Verify remote control functionality

## Support
Contact your iWATCH TV administrator for LG WebOS installation support.