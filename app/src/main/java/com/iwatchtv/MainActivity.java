package com.iwatchtv;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Create WebView
        webView = new WebView(this);
        setContentView(webView);
        
        // Configure WebView settings
        WebSettings webSettings = webView.getSettings();
        
        // Enable JavaScript (REQUIRED for HLS.js and your app)
        webSettings.setJavaScriptEnabled(true);
        
        // Allow external scripts (HLS.js CDN)
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        
        // Enable DOM storage for app functionality
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        
        // Cache settings
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        
        // Allow mixed content (HTTP on local network)
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        
        // Media playback settings
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        
        // Zoom support
        webSettings.setBuiltInZoomControls(false);
        webSettings.setSupportZoom(false);
        
        // Disable zoom controls
        webSettings.setDisplayZoomControls(false);
        
        // Enable hardware acceleration for video
        webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);
        
        // Set WebChromeClient for console messages
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onConsoleMessage(String message, int lineNumber, String sourceId) {
                android.util.Log.d("iWATCH TV", message + " -- From line " + lineNumber + " of " + sourceId);
            }
        });
        
        // Set WebViewClient to keep navigation in WebView
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // Keep all URLs in WebView
                return false;
            }
        });
        
        // Load your app URL - CHANGE THIS TO YOUR SERVER IP
        String serverUrl = "http://192.168.1.100:8081";
        webView.loadUrl(serverUrl);
        
        // Enable back button navigation
        webView.canGoBack();
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
