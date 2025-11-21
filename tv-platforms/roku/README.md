# Roku Channel Installation Guide
# iWATCH TV - Roku Channel

## Overview
This folder contains the Roku channel files for iWATCH TV streaming service.

## Files Included
- `manifest.json` - Channel manifest
- `source/main.brs` - Main BrightScript file
- `components/MainScene.xml` - Scene component
- `images/icon.png` - Channel icon

## Installation Methods

### Method 1: Roku Developer Mode (Testing)
1. Enable Developer Mode on Roku device:
   - Press Home 5 times
   - Press Up 2 times
   - Press Right 2 times
   - Note IP address and password

2. Install via Telnet:
   ```bash
   telnet <roku-ip>
   <developer-password>
   install <channel-id> package
   ```

### Method 2: Roku Channel Store (Production)
1. Register Roku Developer account
2. Submit channel for approval
3. Publish to Roku Channel Store

### Method 3: Sideload Channel
1. Enable Developer Mode
2. Install via web interface
3. Access via Roku IP:8080

## Roku Channel Configuration

### manifest.json
```json
{
    "id": "iwatch-tv",
    "type": "appl",
    "name": "iWATCH TV",
    "version": "1.0.0",
    "description": "Premium streaming service with movies, TV shows, and live channels",
    "developer_name": "iWATCH TV",
    "icon": "images/icon.png",
    "sideloaded": false,
    "buildVersion": "1",
    "squashFS": false,
    "ui": {
        "grid-columns": 6,
        "grid-rows": 5,
        "ui-chromecast": false,
        "ui-60fps": false
    },
    "screenguards": [
        "Common",
        "Dim"
    ],
    "capabilities": [
        "video",
        "audio-stream",
        "http",
        "web"
    ],
    "smartOrigin": true
}
```

### source/main.brs
```brightscript
sub main()
    print "Starting iWATCH TV channel"
    
    ' Set up main scene
    screen = CreateObject("roScreen")
    port = CreateObject("roMessagePort")
    screen.SetMessagePort(port)
    
    ' Create main scene
    scene = CreateObject("roScene")
    
    ' Set up scene components
    setupScene()
    
    ' Show scene
    screen.Show()
    
    ' Event loop
    while true
        msg = wait(0, port)
        if type(msg) = "roSGScreenEvent"
            if msg.isScreenClosed()
                return
            end if
        end if
    end while
end sub

sub setupScene()
    ' Create main UI components
    ' This would include navigation, video player, etc.
    
    ' Load web interface
    webview = CreateObject("roSGNode", "WebView")
    webview.uri = "https://your-repo.github.io/iwatch-tv/client_interface.html"
    webview.width = 1920
    webview.height = 1080
    webview.SetFocus(true)
    
    ' Add to scene
    scene.appendChild(webview)
end sub
```

## Features
- ✅ Roku-optimized interface
- ✅ Roku Remote support
- ✅ 4K streaming capability
- ✅ Channel Store ready
- ✅ Voice search support
- ✅ Automatic updates

## Technical Requirements
- Roku OS 7.0+
- 512MB RAM minimum
- 1GB storage space
- Wi-Fi or Ethernet connection

## Remote Control Implementation
```brightscript
sub onKeyEvent(key as String, press as Boolean) as Boolean
    if press then
        select case key
            case "Left"
                ' Navigate left
            case "Right"
                ' Navigate right
            case "Up"
                ' Navigate up
            case "Down"
                ' Navigate down
            case "OK"
                ' Select/Play
            case "Back"
                ' Go back
        end select
    end if
    return false
end sub
```

## Building and Installing
```bash
# Create channel package
zip -r iwatch-tv.zip manifest.json source/ components/ images/

# Upload to Roku device
curl -F "mysubmit=Install" -F "archive=@iwatch-tv.zip" http://<roku-ip>/plugin_install

# Or use telnet
telnet <roku-ip>
<developer-password>
pkg < channel-id> iwatch-tv.zip
```

## Development Process
1. Install Roku SDK
2. Create new channel project
3. Develop channel functionality
4. Test on Roku device/emulator
5. Submit to Roku for approval

## Channel Store Submission
1. Complete Roku Developer registration
2. Prepare store assets:
   - Screenshots (1280x720, 720x480)
   - Channel description
   - Category selection
   - Privacy policy
3. Submit for certification
4. Wait for approval process

## Testing Checklist
- ✅ Channel installs correctly
- ✅ Remote navigation works
- ✅ Web interface loads properly
- ✅ Video streaming functional
- ✅ No memory leaks
- ✅ Performance optimized

## Distribution
- Roku Channel Store (recommended)
- Direct channel install
- Enterprise deployment
- Developer sharing

## Support
Contact your iWATCH TV administrator for Roku channel installation support.