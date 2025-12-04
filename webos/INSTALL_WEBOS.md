# How to Install iWatch TV on LG webOS TV

## Method 1: Developer Mode (Recommended for Personal Use)

### Step 1: Enable Developer Mode on your LG TV

1. Go to **LG Content Store** on your TV
2. Search for **"Developer Mode"** app
3. Install and open it
4. Sign in with your **LG Developer account**
   - Create one at: https://webostv.developer.lge.com/
5. Turn **Developer Mode: ON**
6. Turn **Key Server: ON**
7. Note down the **IP address** shown on screen
8. **Restart your TV**

### Step 2: Install webOS SDK on your Computer

**Windows/Mac/Linux:**

1. Download webOS TV SDK from: https://webostv.developer.lge.com/sdk/installation/
2. Install the CLI tools (ares-cli)
3. Open terminal/command prompt

### Step 3: Setup Device Connection

```bash
# Add your TV as a device
ares-setup-device

# Choose: add
# Device Name: lgwebos
# IP Address: [Your TV IP from Step 1]
# Port: 9922
# SSH User: prisoner
```

### Step 4: Generate SSH Key

```bash
# Get the passphrase from Developer Mode app on TV
ares-novacom --device lgwebos --getkey
```

### Step 5: Package the App

```bash
# Navigate to the webos folder
cd webos

# Package the app into an IPK file
ares-package .

# This creates: com.iwatchtv.app_1.0.0_all.ipk
```

### Step 6: Install on TV

```bash
# Install the IPK to your TV
ares-install --device lgwebos com.iwatchtv.app_1.0.0_all.ipk
```

### Step 7: Launch the App

The iWatch TV app will now appear on your LG TV home screen!
You can also launch it via command:

```bash
ares-launch --device lgwebos com.iwatchtv.app
```

---

## Method 2: Using GitHub Pages (Hosted App)

### Step 1: Update the URL in index.html

Edit `webos/index.html` and change line 80:

```javascript
var appUrl = 'https://YOUR_USERNAME.github.io/YOUR_REPO/client.html';
```

Replace with your actual GitHub Pages URL.

### Step 2: Follow Steps 1-6 from Method 1

---

## Troubleshooting

### "Developer Mode session expired"
- Developer mode expires every 50 hours
- Re-open Developer Mode app and re-enable

### "Connection refused"
- Make sure TV and computer are on same network
- Check if Key Server is ON in Developer Mode app
- Restart TV

### "App crashes on launch"
- Check if GitHub Pages URL is correct
- Make sure client.html is accessible

---

## Important Notes

- **Developer Mode expires every 50 hours** - you need to re-enable it
- The app will remain installed even if Developer Mode expires
- For permanent installation, you need to publish to LG Content Store

## Quick Reference Commands

```bash
# List installed apps
ares-install --device lgwebos --list

# Uninstall app
ares-install --device lgwebos --remove com.iwatchtv.app

# View app logs
ares-inspect --device lgwebos --app com.iwatchtv.app

# Check device connection
ares-device-info --device lgwebos
```
