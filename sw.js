// Smart Wallet Service Worker v4.0.1
const CACHE_NAME = 'smartwallet-v4.0.1';
const OFFLINE_URL = '/index.html';

const STATIC_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './js/app.js',
    './manifest.json',
    './favicon.svg'
];

const DYNAMIC_ASSETS = [
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'https://fonts.gstatic.com'
];

// Instalação: Cache dos recursos estáticos
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Smart Wallet v4.0.1...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.warn('[SW] Falha ao cachear estáticos:', err);
            });
        }).then(() => {
            return self.skipWaiting();
        })
    );
});

// Ativação: Limpar caches antigos
self.addEventListener('activate', (event) => {
    console.log('[SW] Ativando Smart Wallet v4.0.1...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch: Estratégia Cache First para estáticos, Network First para dinâmicos
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Ignorar requisições não-GET
    if (event.request.method !== 'GET') return;
    
    // Ignorar requisições externas não listadas
    const isExternal = !url.origin.includes(self.location.origin);
    
    if (isExternal) {
        // Recursos externos (CDN, fonts): Network First com fallback para cache
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response && response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
        return;
    }
    
    // Recursos locais: Cache First com fallback para network
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Atualiza cache em background (stale-while-revalidate)
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                }).catch(() => {});
                
                event.waitUntil(fetchPromise);
                return cachedResponse;
            }
            
            // Se não está em cache, busca da rede
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }).catch(() => {
            // Fallback para offline
            if (event.request.destination === 'document') {
                return caches.match(OFFLINE_URL);
            }
        })
    );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    if (event.data === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('[SW] Cache limpo com sucesso');
        });
    }
});