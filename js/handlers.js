// js/handlers.js
// Fase 2: Handlers via event delegation (substitui onclick inline)

import './delegation.js';

console.log('[Handlers] Registrando handlers de ação...');

// ===== TOGGLES =====
window.addEventListener('action:toggle-theme', () => {
    const isLight = document.body.classList.contains('light');
    document.body.classList.toggle('light', !isLight);
    localStorage.setItem('smartwallet_dark', isLight);
    if (window.smartwallet) window.smartwallet.applyTheme();
});

window.addEventListener('action:toggle-privacy', () => {
    const isPrivate = document.body.classList.toggle('privacy-on');
    localStorage.setItem('smartwallet_privacy', isPrivate);
    if (window.smartwallet) window.smartwallet.applyPrivacy();
});

window.addEventListener('action:toggle-menu', (e) => {
    const menuId = e.detail?.params?.menu || 'mainMenu';
    const menu = document.getElementById(menuId);
    const infoMenu = document.getElementById('infoMenu');
    
    if (menu) menu.classList.toggle('active');
    if (infoMenu) infoMenu.classList.remove('active');
});

window.addEventListener('action:toggle-info-menu', (e) => {
    e.detail?.originalEvent?.stopPropagation();
    const infoMenu = document.getElementById('infoMenu');
    const mainMenu = document.getElementById('mainMenu');
    
    if (infoMenu) infoMenu.classList.toggle('active');
    if (mainMenu) mainMenu.classList.remove('active');
});

// ===== MONTH NAVIGATION =====
window.addEventListener('action:change-month', (e) => {
    const delta = e.detail?.params?.delta || 0;
    if (window.smartwallet) window.smartwallet.changeMonth(delta);
});

// ===== TYPE SELECTORS =====
window.addEventListener('action:select-type', (e) => {
    const { target, type } = e.detail?.params || {};
    if (!target || !type) return;
    
    if (target === 'new') {
        window.smartwallet.currentTransactionType = type;
        document.querySelectorAll('#transactionForm .type-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.type === type);
        });
        if (window.smartwallet) window.smartwallet.filterCategoriesByType('category', type);
    } else if (target === 'edit') {
        window.smartwallet.currentEditType = type;
        document.querySelectorAll('#editForm .type-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.type === type);
        });
        if (window.smartwallet) window.smartwallet.filterCategoriesByType('editCategory', type);
    } else if (target === 'category') {
        window.smartwallet.newCategoryType = type;
        document.querySelectorAll('#categoryModal .type-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.type === type);
        });
    }
});

// ===== MODAL OPENERS/CLOSERS =====
const modalMap = {
    'new-transaction': 'newTransactionModal',
    'close-new-transaction': 'newTransactionModal',
    'edit-transaction': 'editModal',
    'close-edit': 'editModal',
    'category-manager': 'categoryModal',
    'close-category': 'categoryModal',
    'export': 'exportModal',
    'close-export': 'exportModal',
    'goal': 'goalModal',
    'close-goal': 'goalModal',
    'import-csv': 'importCsvModal',
    'close-import-csv': 'importCsvModal',
    'import-backup': 'importBackupModal',
    'close-import-backup': 'importBackupModal',
    'clear-data': 'clearDataModal',
    'close-clear-data': 'clearDataModal',
    'accounts': 'accountsModal',
    'close-accounts': 'accountsModal',
    'new-account': 'newAccountModal',
    'close-new-account': 'newAccountModal',
    'credit-cards': 'creditCardsModal',
    'close-credit-cards': 'creditCardsModal',
    'new-card': 'newCardModal',
    'close-new-card': 'newCardModal',
    'invoice': 'invoiceModal',
    'close-invoice': 'invoiceModal',
    'bills': 'billsModal',
    'close-bills': 'billsModal',
    'investments': 'investmentsModal',
    'close-investments': 'investmentsModal',
    'new-investment': 'newInvestmentModal',
    'close-new-investment': 'newInvestmentModal',
    'update-investment': 'updateInvestmentModal',
    'close-update-investment': 'updateInvestmentModal',
    'manual': 'manualModal',
    'close-manual': 'manualModal',
    'terms': 'disclaimerModal',
    'thanks': 'thanksModal',
    'close-thanks': 'thanksModal'
};

Object.entries(modalMap).forEach(([action, modalId]) => {
    window.addEventListener(`action:${action}`, () => {
        const modal = document.getElementById(modalId);
        if (modal) {
            if (action.startsWith('close-')) {
                modal.classList.remove('active');
            } else {
                modal.classList.add('active');
            }
        }
    });
});

// ===== FORM SUBMITS =====
window.addEventListener('form:new-transaction', () => {
    if (window.smartwallet) window.smartwallet.addTransaction();
});

window.addEventListener('form:edit-transaction', () => {
    if (window.smartwallet) window.smartwallet.updateTransaction();
});

window.addEventListener('form:account', () => {
    if (window.smartwallet) window.smartwallet.saveAccount();
});

window.addEventListener('form:card', () => {
    if (window.smartwallet) window.smartwallet.saveCard();
});

window.addEventListener('form:investment', () => {
    if (window.smartwallet) window.smartwallet.saveInvestment();
});

window.addEventListener('form:update-investment', () => {
    if (window.smartwallet) window.smartwallet.updateInvestmentValue();
});

// ===== FILE HANDLERS =====
window.addEventListener('action:select-csv-file', (e) => {
    const input = e.detail?.target;
    if (!input || !input.files[0]) return;
    
    const file = input.files[0];
    if (!file.name.toLowerCase().endsWith('.csv')) {
        alert('⚠️ Selecione um arquivo .csv');
        input.value = '';
        return;
    }
    
    document.getElementById('csvFileName').textContent = 
        `📄 ${file.name} (${(file.size/1024).toFixed(1)} KB)`;
    
    const reader = new FileReader();
    reader.onload = (ev) => { window._pendingCsvData = ev.target.result; };
    reader.readAsText(file, 'UTF-8');
});

window.addEventListener('action:select-backup-file', (e) => {
    const input = e.detail?.target;
    if (!input || !input.files[0]) return;
    
    const file = input.files[0];
    if (!file.name.toLowerCase().endsWith('.json')) {
        alert('⚠️ Selecione um arquivo .json');
        input.value = '';
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        alert('️ Arquivo muito grande (máx 10MB)');
        input.value = '';
        return;
    }
    
    document.getElementById('backupFileName').textContent = 
        `💾 ${file.name} (${(file.size/1024).toFixed(1)} KB)`;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            JSON.parse(ev.target.result);
            window._pendingBackupData = ev.target.result;
            if (window.smartwallet) window.smartwallet.showToast('✅ Arquivo carregado!');
        } catch (err) {
            alert('❌ JSON inválido: ' + err.message);
            input.value = '';
            window._pendingBackupData = null;
        }
    };
    reader.readAsText(file, 'UTF-8');
});

// ===== IMPORT/EXPORT ACTIONS =====
window.addEventListener('action:import-csv', () => {
    if (window.smartwallet) window.smartwallet.importCSV();
});

window.addEventListener('action:import-backup', () => {
    if (window.smartwallet) window.smartwallet.importBackup();
});

window.addEventListener('action:export-csv', () => {
    if (window.smartwallet) window.smartwallet.exportCSV();
});

window.addEventListener('action:export-backup', () => {
    if (window.smartwallet) window.smartwallet.exportBackup();
});

window.addEventListener('action:print-pdf', () => {
    if (window.smartwallet) window.smartwallet.printExtratoPDF();
});

// ===== CLEAR DATA =====
window.addEventListener('action:show-clear-step2', () => {
    document.getElementById('clearStep1').style.display = 'none';
    document.getElementById('clearStep2').style.display = 'block';
    setTimeout(() => document.getElementById('clearConfirmInput')?.focus(), 100);
});

window.addEventListener('action:check-clear-confirm', (e) => {
    const input = e.detail?.target;
    const btn = document.getElementById('finalClearBtn');
    
    if (input.value.trim().toUpperCase() === 'LIMPAR') {
        input.classList.add('match');
        btn.disabled = false;
        btn.style.opacity = '1';
    } else {
        input.classList.remove('match');
        btn.disabled = true;
        btn.style.opacity = '0.5';
    }
});

window.addEventListener('action:clear-all-data', () => {
    if (window.smartwallet) window.smartwallet.clearAllData();
});

// ===== CATEGORY MANAGEMENT =====
window.addEventListener('action:add-category', () => {
    if (window.smartwallet) window.smartwallet.addCategory();
});

window.addEventListener('action:delete-category', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.deleteCategory(id);
});

// ===== ACCOUNT MANAGEMENT =====
window.addEventListener('action:new-account', () => {
    document.getElementById('accountEditId').value = '';
    document.getElementById('accountForm').reset();
    document.getElementById('accountColor').value = '#6366f1';
    document.getElementById('newAccountTitle').textContent = 'Nova Conta';
    document.getElementById('newAccountModal').classList.add('active');
});

window.addEventListener('action:edit-account', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.editAccount(id);
});

window.addEventListener('action:delete-account', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.deleteAccount(id);
});

// ===== CARD MANAGEMENT =====
window.addEventListener('action:new-card', () => {
    document.getElementById('cardEditId').value = '';
    document.getElementById('cardForm').reset();
    document.getElementById('cardClosingDay').value = 20;
    document.getElementById('cardDueDay').value = 27;
    document.getElementById('cardColor').value = '#6366f1';
    document.getElementById('newCardTitle').textContent = 'Novo Cartão';
    document.getElementById('newCardModal').classList.add('active');
});

window.addEventListener('action:edit-card', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.editCard(id);
});

window.addEventListener('action:delete-card', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.deleteCard(id);
});

window.addEventListener('action:open-invoice', (e) => {
    const cardId = e.detail?.params?.cardId;
    if (cardId && window.smartwallet) window.smartwallet.openInvoice(cardId);
});

window.addEventListener('action:pay-invoice', (e) => {
    const cardId = e.detail?.params?.cardId;
    if (cardId && window.smartwallet) window.smartwallet.payInvoice(cardId);
});

window.addEventListener('action:export-invoice-csv', (e) => {
    const cardId = e.detail?.params?.cardId;
    if (cardId && window.smartwallet) window.smartwallet.exportInvoiceCSV(cardId);
});

window.addEventListener('action:print-invoice-pdf', (e) => {
    const cardId = e.detail?.params?.cardId;
    if (cardId && window.smartwallet) window.smartwallet.printInvoicePDF(cardId);
});

// ===== BILL MANAGEMENT =====
window.addEventListener('action:mark-bill-paid', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.markBillAsPaid(id);
});

// ===== INVESTMENT MANAGEMENT =====
window.addEventListener('action:new-investment', () => {
    document.getElementById('investmentEditId').value = '';
    document.getElementById('investmentForm').reset();
    document.getElementById('investmentDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('newInvestmentTitle').textContent = 'Nova Aplicação';
    document.getElementById('newInvestmentModal').classList.add('active');
});

window.addEventListener('action:edit-investment', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.editInvestment(id);
});

window.addEventListener('action:delete-investment', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.deleteInvestment(id);
});

window.addEventListener('action:open-update-investment', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.openUpdateInvestment(id);
});

// ===== TRANSACTION MANAGEMENT =====
window.addEventListener('action:edit-transaction', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.editTransaction(id);
});

window.addEventListener('action:delete-transaction', (e) => {
    const id = e.detail?.params?.id;
    if (id && window.smartwallet) window.smartwallet.deleteTransaction(id);
});

window.addEventListener('action:delete-from-edit', () => {
    if (window.smartwallet) window.smartwallet.deleteFromEdit();
});

// ===== MISC =====
window.addEventListener('action:copy-pix-key', () => {
    const key = document.getElementById('pixKey').textContent;
    navigator.clipboard.writeText(key)
        .then(() => {
            if (window.smartwallet) window.smartwallet.showToast('✅ Chave PIX copiada!');
        })
        .catch(() => {
            if (window.smartwallet) window.smartwallet.showToast('❌ Copie manualmente: ' + key);
        });
});

window.addEventListener('action:print-manual', () => {
    if (window.smartwallet) window.smartwallet.printManual();
});

window.addEventListener('action:accept-disclaimer', () => {
    const btn = document.getElementById('acceptDisclaimerBtn');
    if (!btn || !btn.classList.contains('enabled')) return;
    
    localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
    
    const disclaimer = document.getElementById('disclaimerModal');
    if (disclaimer) {
        disclaimer.classList.add('disintegrating');
        setTimeout(() => {
            disclaimer.style.display = 'none';
            disclaimer.classList.remove('active', 'disintegrating');
            setTimeout(() => {
                const splash = document.getElementById('splashScreen');
                if (splash) {
                    splash.classList.add('fade-out');
                    setTimeout(() => {
                        splash.style.display = 'none';
                        document.getElementById('quoteModal')?.classList.add('active');
                    }, 800);
                }
            }, 3000);
        }, 600);
    }
});

window.addEventListener('action:start-app', () => {
    document.getElementById('quoteModal')?.classList.remove('active');
    const main = document.getElementById('mainApp');
    const fab = document.getElementById('fabBtn');
    if (main) main.style.display = 'block';
    if (fab) fab.style.display = 'flex';
});

// ===== FECHA MODAIS AO CLICAR FORA =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

console.log('[Handlers] ✅ Todos os handlers de ação registrados');
