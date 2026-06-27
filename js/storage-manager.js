// js/storage-manager.js
// Gerenciador de storage com versionamento e persistência

console.log('[StorageManager] Inicializando...');

const STORAGE_KEYS = {
    TRANSACTIONS: 'sw_transactions',
    CATEGORIES: 'sw_categories',
    ACCOUNTS: 'sw_accounts',
    CARDS: 'sw_cards',
    INVESTMENTS: 'sw_investments',
    PREFERENCES: 'sw_preferences',
    FILTERS: 'sw_filters',
    DISCLAIMER: 'sw_disclaimer_accepted',
    BACKUP_VERSION: 3
};

export const storageManager = {
    // ===== LEITURA =====
    get(key, defaultValue = null) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return defaultValue;
            return JSON.parse(raw);
        } catch (err) {
            console.error(`[Storage] Erro ao ler ${key}:`, err);
            return defaultValue;
        }
    },

    // ===== ESCRITA =====
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (err) {
            if (err.name === 'QuotaExceededError') {
                console.error('[Storage] Quota excedida!');
                window.dispatchEvent(new CustomEvent('storage:full', { detail: { key } }));
            }
            return false;
        }
    },

    // ===== REMOÇÃO =====
    remove(key) {
        localStorage.removeItem(key);
    },

    // ===== PREFERÊNCIAS =====
    getPreferences() {
        return this.get(STORAGE_KEYS.PREFERENCES, {
            darkMode: true,
            privacyMode: false,
            monthOffset: 0
        });
    },

    setPreferences(prefs) {
        const current = this.getPreferences();
        return this.set(STORAGE_KEYS.PREFERENCES, { ...current, ...prefs });
    },

    // ===== FILTROS =====
    getFilters() {
        return this.get(STORAGE_KEYS.FILTERS, {
            search: '',
            type: '',
            category: '',
            status: '',
            account: ''
        });
    },

    setFilters(filters) {
        const current = this.getFilters();
        return this.set(STORAGE_KEYS.FILTERS, { ...current, ...filters });
    },

    // ===== UTILS =====
    getUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return {
            bytes: total,
            kb: (total / 1024).toFixed(2),
            mb: (total / 1024 / 1024).toFixed(2)
        };
    },

    clear() {
        Object.values(STORAGE_KEYS).forEach(key => {
            if (typeof key === 'string') localStorage.removeItem(key);
        });
    },

    KEYS: STORAGE_KEYS
};
