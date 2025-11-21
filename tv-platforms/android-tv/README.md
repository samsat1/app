# Android TV Installation Guide
# iWATCH TV - Android TV App

## Overview
This folder contains the Android TV application files for iWATCH TV streaming service.

## Files Included
- `AndroidManifest.xml` - Android TV app configuration
- `build.gradle` - Gradle build configuration
- `MainActivity.java` - Main application activity
- `strings.xml` - App resources and strings

## Installation Methods

### Method 1: Developer Mode (Recommended for Testing)
1. Enable Developer Options on Android TV:
   - Go to Settings → About
   - Tap "Build" 7 times to enable Developer Mode
   - Enable "USB Debugging" in Developer Options

2. Install APK:
   - Download iWATCH TV APK
   - Enable "Install from Unknown Sources" in Security settings
   - Install via USB or direct download

### Method 2: Google Play Store (Production)
1. Create Google Play Console account
2. Upload signed APK
3. Submit for review
4. Publish to Play Store

### Method 3: Sideload APK
1. Download APK file to USB drive
2. Connect USB to Android TV
3. Use file manager to locate APK
4. Install application

## Features
- ✅ TV-optimized interface
- ✅ Remote control navigation
- ✅ Voice search support
- ✅ Chromecast integration
- ✅ Offline viewing capabilities
- ✅ Multiple user profiles

## Technical Requirements
- Android TV OS 5.0+
- 2GB RAM minimum
- 4GB storage space
- Wi-Fi or Ethernet connection

## App Configuration

### MainActivity.java
```java
package com.iwatch.tv;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        webView = findViewById(R.id.webview);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("https://your-repo.github.io/iwatch-tv/client_interface.html");
    }
}
```

### AndroidManifest.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.iwatch.tv"
    android:versionCode="1"
    android:versionName="1.0">
    
    <uses-sdk
        android:minSdkVersion="21"
        android:targetSdkVersion="33" />
    
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@android:style/Theme.NoTitleBar">
        
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:screenOrientation="landscape">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

## Distribution
- Upload APK to GitHub Releases
- Provide direct download links
- Include installation instructions
- Offer multiple distribution methods

## Support
For Android TV installation support, contact your iWATCH TV administrator.