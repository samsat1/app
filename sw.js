<<<<<<< HEAD
// iWATCH TV Client PWA Service Worker
=======
// iW PWA Service Worker
>>>>>>> cd3343c57adb862feb7f322c1f45a9641ec82373
// Provides offline functionality and native app-like behavior for TV streaming

const CACHE_NAME = 'iwatch-tv-client-v1.0.0';
const urlsToCache = [
    './',
<<<<<<< HEAD
    './client-interface.html',
    './manifest.json',
    './tv_platform_icons/android_tv/android_tv_icon_512x512.png',
    './tv_platform_icons/lg_webos/lg_webos_icon_290x290.png',
    './tv_platform_icons/samsung_tizen/samsung_tizen_icon_216x216.png',
    './tv_platform_icons/amazon_fire/amazon_fire_icon_512x512.png',
    './tv_platform_icons/apple_tv/apple_tv_icon_1280x768.png',
    './tv_platform_icons/roku/roku_icon_216x216.png'
=======
    './index.html',
    './manifest.json',
    './tv_platform_icons/android_tv/android_tv_icon_192x192.png',
    './tv_platform_icons/android_tv/android_tv_icon_512x512.png',
    './tv_platform_icons/samsung_tizen/samsung_tizen_icon_216x216.png',
    './tv_platform_icons/lg_webos/lg_webos_icon_290x290.png',
    './tv_platform_icons/roku/roku_icon_216x216.png',
    './tv_platform_icons/apple_tv/apple_tv_icon_1280x768.png'
>>>>>>> cd3343c57adb862feb7f322c1f45a9641ec82373
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('📱 PWA Admin: Installing service worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📱 PWA Admin: Caching resources...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('📱 PWA Admin: Service worker installed successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('📱 PWA Admin: Service worker installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('📱 PWA Admin: Activating service worker...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('📱 PWA Admin: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('📱 PWA Admin: Service worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Handle navigation requests
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    // If network fails, serve index.html or offline page
                    return caches.match('./index.html') ||
                           caches.match('./offline.html');
                })
        );
        return;
    }
    
    // Handle other requests
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('📱 PWA Admin: Serving from cache:', event.request.url);
                    return response;
                }
                
                console.log('📱 PWA Admin: Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache the response for future use
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // If fetch fails and we have a cached version, use it
                        return caches.match(event.request);
                    });
            })
    );
});

// Background sync for credit transactions
self.addEventListener('sync', event => {
    if (event.tag === 'background-credit-sync') {
        console.log('📱 PWA Admin: Background sync for credit transactions');
        event.waitUntil(syncCreditTransactions());
    }
});

// Push notifications for important alerts
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New admin alert',
<<<<<<< HEAD
        icon: './icons/icon-192x192.png',
        badge: './icons/badge-72x72.png',
=======
        icon: './tv_platform_icons/android_tv/android_tv_icon_192x192.png',
        badge: './tv_platform_icons/android_tv/android_tv_icon_192x192.png',
>>>>>>> cd3343c57adb862feb7f322c1f45a9641ec82373
        tag: 'iwatch-admin-notification',
        actions: [
            {
                action: 'open',
                title: 'Open Admin Panel'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };
    
    event.waitUntil(
<<<<<<< HEAD
        self.registration.showNotification('iWATCH TV Admin', options)
=======
        self.registration.showNotification('iW Admin', options)
>>>>>>> cd3343c57adb862feb7f322c1f45a9641ec82373
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('./index.html')
        );
    }
});

// Helper function to sync credit transactions
function syncCreditTransactions() {
    // This would sync any pending transactions when online
    console.log('📱 PWA Admin: Syncing credit transactions...');
    return Promise.resolve();
}

// Handle PWA install prompt
self.addEventListener('beforeinstallprompt', event => {
    console.log('📱 PWA Admin: PWA install prompt triggered');
    event.preventDefault();
    
    // Store the event for later use
    self.registration.prompt = event;
});

// Handle PWA installed
self.addEventListener('appinstalled', event => {
    console.log('📱 PWA Admin: PWA was successfully installed');
    
    // Track installation event
    event.waitUntil(
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'PWA_INSTALLED',
<<<<<<< HEAD
                    appName: 'iWATCH TV Admin Panel'
=======
                    appName: 'iW Admin Panel'
>>>>>>> cd3343c57adb862feb7f322c1f45a9641ec82373
                });
            });
        })
    );
});

console.log('📱 PWA Admin: Service worker loaded successfully');