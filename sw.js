// sw.js
// Smart Wallet Service Worker - Fase 4 (Otimizado)

const CACHE_NAME = 'smart-wallet-v4.0.0';
const SHELL_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './js/app.js',
    './js/handlers.js',
    './js/delegation.js',
    './js/lazy-loader.js',
    './js/validators.js',
    './js/storage-manager.js',
    './js/a11y.js',
    './js/workers/parser-worker.js',
    './manifest.json',
    './favicon.svg'
];

// ===== INSTALAÇÃO =====
self.addEventListener('install', function(event) {
    console.log('[SW] Instalando v4.0.0...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('[SW] Cacheando shell do app');
                return cache.addAll(SHELL_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// ===== ATIVAÇÃO =====
self.addEventListener('activate', function(event) {
    console.log('[SW] Ativando...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(name) { return name !== CACHE_NAME; })
                    .map(function(name) { 
                        console.log('[SW] Removendo cache antigo:', name);
                        return caches.delete(name); 
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// ===== INTERCEPTAÇÃO DE REQUISIÇÕES =====
self.addEventListener('fetch', function(event) {
    const url = new URL(event.request.url);

    // Ignora extensões e requisições externas não essenciais
    if (url.origin !== location.origin && !url.hostname.includes('cdn.jsdelivr.net') && !url.hostname.includes('fonts.googleapis.com')) {
        return;
    }

    // Estratégia: Cache-First para assets estáticos e CDN
    if (event.request.destination === 'style' || 
        event.request.destination === 'script' || 
        event.request.destination === 'font' ||
        event.request.destination === 'image' ||
        url.hostname.includes('cdn.jsdelivr.net') ||
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com')) {
        
        event.respondWith(
            caches.match(event.request).then(function(cachedResponse) {
                if (cachedResponse) return cachedResponse;
                
                return fetch(event.request).then(function(response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                }).catch(function() {
                    // Fallback para offline
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                });
            })
        );
        return;
    }

    // Estratégia: Network-First para HTML principal (sempre tenta rede primeiro)
    if (event.request.destination === 'document') {
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                })
                .catch(function() {
                    return caches.match('./index.html');
                })
        );
        return;
    }
});

// ===== MENSAGENS DO CLIENTE =====
self.addEventListener('message', function(event) {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
    if (event.data === 'clearCache') {
        caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))));
    }
});

console.log('[SW] Smart Wallet Service Worker v4.0.0 carregado');
