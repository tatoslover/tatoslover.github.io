// Service Worker for Portfolio Site
// Provides caching and offline functionality for better performance

const CACHE_NAME = 'samuel-love-portfolio-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';

// Resources to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/animations.css',
    '/css/mobile.css',
    '/css/critical.css',
    '/scripts/animations.js',
    '/scripts/script.js',
    '/scripts/css-loader.js',
    '/extras/pp.png',
    '/extras/Samuel_Love_CV.pdf',
    // Add manifest if it exists
    '/manifest.json'
];

// External resources to cache dynamically
const EXTERNAL_RESOURCES = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// Resources that should always be fetched fresh
const NETWORK_FIRST = [
    '/api/',
    '/admin/',
    '.json'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('SW: Install event');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('SW: Caching static assets');
                return cache.addAll(STATIC_ASSETS.map(url => {
                    // Handle relative URLs
                    return new Request(url, { cache: 'reload' });
                }));
            })
            .then(() => {
                console.log('SW: Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('SW: Failed to cache static assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('SW: Activate event');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            // Delete old cache versions
                            return cacheName !== STATIC_CACHE &&
                                   cacheName !== DYNAMIC_CACHE &&
                                   cacheName.startsWith('samuel-love-portfolio-');
                        })
                        .map(cacheName => {
                            console.log('SW: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('SW: Cache cleanup complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Determine caching strategy based on request
    if (isStaticAsset(request)) {
        // Cache first strategy for static assets
        event.respondWith(cacheFirst(request));
    } else if (isNetworkFirst(request)) {
        // Network first for dynamic content
        event.respondWith(networkFirst(request));
    } else if (isExternalResource(request)) {
        // Stale while revalidate for external resources
        event.respondWith(staleWhileRevalidate(request));
    } else {
        // Default: Cache first with network fallback
        event.respondWith(cacheFirst(request));
    }
});

// Cache first strategy - good for static assets
function cacheFirst(request) {
    return caches.match(request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request)
                .then(response => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(STATIC_CACHE)
                        .then(cache => {
                            cache.put(request, responseToCache);
                        });

                    return response;
                })
                .catch(() => {
                    // Return offline fallback if available
                    if (request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
        });
}

// Network first strategy - good for dynamic content
function networkFirst(request) {
    return fetch(request)
        .then(response => {
            // Cache successful responses
            if (response.status === 200) {
                const responseToCache = response.clone();
                caches.open(DYNAMIC_CACHE)
                    .then(cache => {
                        cache.put(request, responseToCache);
                    });
            }
            return response;
        })
        .catch(() => {
            // Fallback to cache
            return caches.match(request);
        });
}

// Stale while revalidate - good for external resources
function staleWhileRevalidate(request) {
    return caches.match(request)
        .then(cachedResponse => {
            const fetchPromise = fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });
                    }
                    return response;
                });

            return cachedResponse || fetchPromise;
        });
}

// Helper functions to determine caching strategy
function isStaticAsset(request) {
    const url = new URL(request.url);
    return STATIC_ASSETS.some(asset => url.pathname.endsWith(asset)) ||
           url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/);
}

function isNetworkFirst(request) {
    const url = new URL(request.url);
    return NETWORK_FIRST.some(pattern => url.pathname.includes(pattern));
}

function isExternalResource(request) {
    const url = new URL(request.url);
    return url.origin !== self.location.origin ||
           EXTERNAL_RESOURCES.some(resource => request.url.includes(resource));
}

// Handle background sync for offline actions
self.addEventListener('sync', event => {
    console.log('SW: Background sync event:', event.tag);

    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle any offline actions that need to be synced
            handleBackgroundSync()
        );
    }
});

// Background sync handler
function handleBackgroundSync() {
    return new Promise((resolve) => {
        console.log('SW: Performing background sync');
        // Add any offline action handling here
        resolve();
    });
}

// Handle push notifications (if needed in future)
self.addEventListener('push', event => {
    console.log('SW: Push event received');

    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/extras/pp.png',
        badge: '/extras/pp.png',
        tag: 'portfolio-update',
        actions: [
            {
                action: 'view',
                title: 'View Portfolio'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Portfolio Update', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    console.log('SW: Notification click event');

    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Performance monitoring
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_CACHE_INFO') {
        caches.keys().then(cacheNames => {
            event.ports[0].postMessage({
                caches: cacheNames,
                version: CACHE_NAME
            });
        });
    }
});

console.log('SW: Service Worker loaded successfully');
