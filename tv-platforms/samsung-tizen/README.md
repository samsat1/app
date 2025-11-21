# Samsung Tizen Installation Guide
# iWATCH TV - Samsung Smart TV App

## Overview
This folder contains the Samsung Tizen application files for iWATCH TV streaming service.

## Files Included
- `config.xml` - Tizen app configuration
- `index.html` - Main application file
- `icon.png` - App icon
- `widget.xml` - Widget configuration

## Installation Methods

### Method 1: Tizen Studio (Development)
1. Install Tizen Studio
2. Create new Tizen Web Project
3. Import app files
4. Build and install to TV

### Method 2: Samsung App Store (Production)
1. Register Samsung Developer account
2. Submit app for certification
3. Publish to Samsung TV App Store

### Method 3: Developer Mode (Testing)
1. Enable Developer Mode on Samsung TV:
   - Settings → Smart Hub → Developer Mode
   - Enable developer mode
   - Note IP address

2. Install via Tizen CLI:
   ```bash
   tizen install -n iwatch-tv -p tv
   ```

## Tizen App Configuration

### config.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<widget xmlns="http://www.w3.org/ns/widgets"
        xmlns:tizen="http://tizen.org/ns/widgets"
        id="http://iwatch.tv/iwatch-tv"
        version="1.0.0"
        viewmodes="fullscreen">
    
    <tizen:application id="iwatch.tv" 
                      package="iwatch.tv" 
                      required_version="3.0"/>
    
    <content src="index.html"/>
    
    <icon src="icon.png" type="image/png" width="96" height="96"/>
    
    <splash src="splash.png" type="image/png" width="1280" height="720"/>
    
    <tizen:category name="multimedia"/>
    <tizen:category name="entertainment"/>
    
    <tizen:privilege name="http://tizen.org/privilege/internet"/>
    <tizen:privilege name="http://tizen.org/privilege/network.get"/>
    
    <tizen:metadata key="http://samsung.com/tv/metadata/use-fullscreen" value="true"/>
    
    <access origin="*" subdomains="true"/>
</widget>
```

## Features
- ✅ Tizen-optimized interface
- ✅ Smart TV remote control
- ✅ Voice control support
- ✅ 4K/UHD streaming
- ✅ Samsung App Store ready
- ✅ Multi-language support

## Technical Requirements
- Samsung Tizen OS 3.0+
- 1GB RAM minimum
- 2GB storage space
- Internet connection

## Remote Control Implementation
```javascript
// Samsung Tizen Remote Control Support
var element = document.getElementById('app');

element.addEventListener('keydown', function(e) {
    var keyName = e.keyName;
    
    switch(keyName) {
        case 'Left':
        case 'ArrowLeft':
            // Navigate left
            break;
        case 'Right':
        case 'ArrowRight':
            // Navigate right
            break;
        case 'Up':
        case 'ArrowUp':
            // Navigate up
            break;
        case 'Down':
        case 'ArrowDown':
            // Navigate down
            break;
        case 'Enter':
        case 'Return':
            // Select/Play
            break;
        case 'Back':
        case 'Escape':
            // Go back
            break;
    }
});

if (window.tizen) {
    // Enable Tizen TV controls
    tizen.tvinputdata.registerKeyMapping('MediaPlay', 'Enter', 'function');
    tizen.tvinputdata.registerKeyMapping('MediaPause', 'Space', 'function');
}
```

## Building the App
```bash
# Build Tizen web app
tizen build-web iwatch-tv

# Package for distribution
tizen package -t wgt -s iwatch-tv

# Install to TV
tizen install -p tv -n iwatch-tv
```

## Testing on Emulator
1. Launch Tizen Studio
2. Create TV emulator
3. Install app to emulator
4. Test remote control navigation
5. Verify streaming functionality

## App Store Submission
1. Complete Samsung Developer registration
2. Prepare app store assets:
   - Screenshots (1280x720)
   - Description and keywords
   - Privacy policy
   - App icon (512x512)
3. Submit for certification
4. Wait for approval

## Distribution Options
- Samsung App Store (recommended)
- Direct APK download
- Sideload installation
- Enterprise deployment

## Support
Contact your iWATCH TV administrator for Samsung Tizen installation support.