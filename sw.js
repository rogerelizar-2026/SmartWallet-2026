// Service Worker do Smart Wallet
// Versão: 2.0.1

const CACHE_NAME = 'smart-wallet-v2.0.1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './favicon.svg'
];

// Instalação
self.addEventListener('install', function(event) {
    console.log('📦 SW v2.0.1 instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('✅ Cache aberto');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(function() {
                console.log('✅ Assets cacheados');
                return self.skipWaiting();
            })
            .catch(function(err) {
                console.warn('⚠️ Erro ao cachear:', err);
            })
    );
});

// Ativação
self.addEventListener('activate', function(event) {
    console.log('🔄 SW v2.0.1 ativando...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName) {
                    console.log('🗑️ Removendo cache antigo:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(function() {
            console.log('✅ Cache limpo');
            return self.clients.claim();
        })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', function(event) {
    // Ignora requisições de extensões
    if (event.request.url.indexOf('chrome-extension') !== -1) return;
    
    event.respondWith(
        caches.match(event.request)
            .then(function(cached) {
                if (cached) {
                    return cached;
                }
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
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});

// Mensagens do cliente
self.addEventListener('message', function(event) {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});

console.log('✅ Service Worker v2.0.1 carregado');
