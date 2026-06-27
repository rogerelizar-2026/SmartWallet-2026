// js/app.js
// Smart Wallet v3.0.0 - Entry Point
// Versão modular com handlers centralizados

import { APP_CONFIG, PAYMENT_METHODS, DEFAULT_CATEGORIES, FINANCIAL_QUOTES, manualHTML } from './config.js';
import { storage } from './core/storage.js';
import { events } from './core/events.js';
import { utils } from './core/utils.js';
import './handlers.js';  // ← Importa handlers globais

console.log(`🚀 Smart Wallet v${APP_CONFIG.VERSION} iniciando...`);

// ===== CLASSE PRINCIPAL =====
class SmartWallet {
    constructor() {
        this.transactions = [];
        this.categories = [];
        this.accounts = [];
        this.cards = [];
        this.investments = [];
        this.currentMonth = new Date();
        this.currentMonth.setDate(1);
        this.currentTransactionType = 'expense';
        this.currentEditType = 'expense';
        this.currentEditId = null;
        this.darkMode = true;
        this.privacyOn = false;
        this.charts = {};
        this.searchTimeout = null;

        this.loadData();
        this.init();
    }

    loadData() {
        try {
            const t = localStorage.getItem('smartwallet_transactions');
            if (t) this.transactions = JSON.parse(t);
            
            const c = localStorage.getItem('smartwallet_categories');
            if (c) this.categories = JSON.parse(c);
            else this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
            
            const a = localStorage.getItem('smartwallet_accounts');
            if (a) this.accounts = JSON.parse(a);
            
            const cd = localStorage.getItem('smartwallet_cards');
            if (cd) this.cards = JSON.parse(cd);
            
            const inv = localStorage.getItem('smartwallet_investments');
            if (inv) this.investments = JSON.parse(inv);
            
            const dm = localStorage.getItem('smartwallet_dark');
            if (dm !== null) this.darkMode = dm === 'true';
            
            const pv = localStorage.getItem('smartwallet_privacy');
            if (pv !== null) this.privacyOn = pv === 'true';
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    }

    saveTransactions() {
        try { 
            localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions)); 
        } catch (e) { 
            console.error(e); 
        }
    }

    saveCategories() {
        try { 
            localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories)); 
        } catch (e) { 
            console.error(e); 
        }
    }

    saveAccounts() {
        try { 
            localStorage.setItem('smartwallet_accounts', JSON.stringify(this.accounts)); 
        } catch (e) { 
            console.error(e); 
        }
    }

    saveCards() {
        try { 
            localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards)); 
        } catch (e) { 
            console.error(e); 
        }
    }

    saveInvestments() {
        try { 
            localStorage.setItem('smartwallet_investments', JSON.stringify(this.investments)); 
        } catch (e) { 
            console.error(e); 
        }
    }

    init() {
        console.log('✅ Smart Wallet inicializado');
        this.applyTheme();
        this.applyPrivacy();
        this.setupEventListeners();
        this.setDefaultDate();
        this.updateMonthDisplay();
        this.populateCategorySelects();
        this.populatePaymentMethodSelects();
        this.populateAccountSelects();
        this.render();
        this.initCharts();
        this.updateAlertBadge();
    }

    setupEventListeners() {
        const self = this;
        
        const form = document.getElementById('transactionForm');
        if (form) {
            form.addEventListener('submit', (e) => { 
                e.preventDefault(); 
                self.addTransaction(); 
            });
        }
        
        const editForm = document.getElementById('editForm');
        if (editForm) {
            editForm.addEventListener('submit', (e) => { 
                e.preventDefault(); 
                self.updateTransaction(); 
            });
        }
        
        const search = document.getElementById('searchFilter');
        if (search) {
            search.addEventListener('input', () => {
                clearTimeout(self.searchTimeout);
                self.searchTimeout = setTimeout(() => self.render(), 300);
            });
        }
        
        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', () => {
                self.filterCategoriesByType('categoryFilter', typeFilter.value);
                self.render();
            });
        }
        
        const catFilter = document.getElementById('categoryFilter');
        if (catFilter) catFilter.addEventListener('change', () => self.render());
        
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) statusFilter.addEventListener('change', () => self.render());
        
        const accountFilter = document.getElementById('accountFilter');
        if (accountFilter) accountFilter.addEventListener('change', () => self.render());

        // Toggle recorrência
        const recurringCheckbox = document.getElementById('recurring');
        if (recurringCheckbox) {
            recurringCheckbox.addEventListener('change', function() {
                const options = document.getElementById('recurringOptions');
                if (options) options.style.display = this.checked ? 'block' : 'none';
            });
        }
        
        const editRecurringCheckbox = document.getElementById('editRecurring');
        if (editRecurringCheckbox) {
            editRecurringCheckbox.addEventListener('change', function() {
                const options = document.getElementById('editRecurringOptions');
                if (options) options.style.display = this.checked ? 'block' : 'none';
            });
        }
    }

    setDefaultDate() {
        const el = document.getElementById('date');
        if (el) el.value = new Date().toISOString().split('T')[0];
    }

    changeMonth(delta) {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
        this.updateMonthDisplay();
        this.render();
        this.updateCharts();
    }

    updateMonthDisplay() {
        const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        const el = document.getElementById('currentMonth');
        if (el) el.textContent = months[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
    }

    formatMonthYear(date) {
        const m = String(date.getMonth() + 1).padStart(2, '0');
        return m + '-' + date.getFullYear();
    }

    getMonthTransactions(date) {
        if (!date) date = this.currentMonth;
        const m = date.getMonth();
        const y = date.getFullYear();
        return this.transactions.filter(t => {
            const d = new Date(t.date + 'T00:00:00');
            return d.getMonth() === m && d.getFullYear() === y;
        });
    }

    getCardTransactions(cardId, date) {
        if (!date) date = this.currentMonth;
        const m = date.getMonth();
        const y = date.getFullYear();
        return this.transactions.filter(t => {
            if (t.paymentMethod !== 'card:' + cardId) return false;
            if (t.amount >= 0) return false;
            const d = new Date(t.date + 'T00:00:00');
            return d.getMonth() === m && d.getFullYear() === y;
        });
    }

    getCardTransactionsForPeriod(cardId, startDate, closingDate) {
        return this.transactions.filter(t => {
            if (t.paymentMethod !== 'card:' + cardId) return false;
            if (t.amount >= 0) return false;
            const tDate = new Date(t.date + 'T00:00:00');
            return tDate >= startDate && tDate <= closingDate;
        });
    }

    populateCategorySelects() {
        const self = this;
        const selects = [
            document.getElementById('category'),
            document.getElementById('editCategory'),
            document.getElementById('categoryFilter')
        ];
        
        selects.forEach((sel, i) => {
            if (!sel) return;
            const val = sel.value;
            const isFilter = i === 2;
            sel.innerHTML = isFilter ? '<option value="">Todas as categorias</option>' : '<option value="">Selecione...</option>';
            
            self.categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = cat.name;
                opt.dataset.type = cat.type;
                sel.appendChild(opt);
            });
            
            sel.value = val;
        });
        
        this.filterCategoriesByType('category', this.currentTransactionType);
        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) this.filterCategoriesByType('categoryFilter', typeFilter.value);
    }

    populatePaymentMethodSelects() {
        const self = this;
        const selects = [
            document.getElementById('paymentMethod'),
            document.getElementById('editPaymentMethod')
        ];
        
        selects.forEach(sel => {
            if (!sel) return;
            const currentVal = sel.value;
            sel.innerHTML = '<option value="">Selecione...</option>';
            
            const group = document.createElement('optgroup');
            group.label = '💰 Formas de Pagamento';
            PAYMENT_METHODS.forEach(pm => {
                const opt = document.createElement('option');
                opt.value = pm.id;
                opt.textContent = pm.icon + ' ' + pm.name;
                group.appendChild(opt);
            });
            sel.appendChild(group);
            
            if (self.cards.length > 0) {
                const cardGroup = document.createElement('optgroup');
                cardGroup.label = '💳 Cartões de Crédito';
                self.cards.forEach(card => {
                    const opt = document.createElement('option');
                    opt.value = 'card:' + card.id;
                    opt.textContent = ' ' + card.name + ' •••• ' + (card.last4 || '****');
                    cardGroup.appendChild(opt);
                });
                sel.appendChild(cardGroup);
            }
            
            sel.value = currentVal;
        });
    }

    populateAccountSelects() {
        const self = this;
        const selects = [
            document.getElementById('transactionAccount'),
            document.getElementById('editTransactionAccount'),
            document.getElementById('accountFilter')
        ];
        
        selects.forEach(sel => {
            if (!sel) return;
            const val = sel.value;
            const isFilter = sel.id === 'accountFilter';
            sel.innerHTML = isFilter ? '<option value="">Todas as contas</option>' : '<option value="">Selecione a conta...</option>';
            
            self.accounts.forEach(acc => {
                const opt = document.createElement('option');
                opt.value = acc.id;
                opt.textContent = (acc.type === 'checking' ? '💳 ' : ' ') + acc.name;
                sel.appendChild(opt);
            });
            
            sel.value = val;
        });
    }

    filterCategoriesByType(selectId, type) {
        const sel = document.getElementById(selectId);
        if (!sel) return;
        
        const options = sel.querySelectorAll('option');
        options.forEach(opt => {
            if (opt.value === '') opt.style.display = 'block';
            else opt.style.display = (!type || opt.dataset.type === type) ? 'block' : 'none';
        });
        
        const currentVal = sel.value;
        if (currentVal) {
            const currentOpt = sel.querySelector('option[value="' + currentVal + '"]');
            if (currentOpt && currentOpt.style.display === 'none') sel.value = '';
        }
    }

    getCategoryById(id) {
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id === id) return this.categories[i];
        }
        return { name: 'Sem categoria', color: '#6b7280', type: 'expense' };
    }

    findCategoryByName(name) {
        const lower = name.toLowerCase();
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name.toLowerCase() === lower) return this.categories[i];
        }
        return null;
    }

    getCardById(id) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id === id) return this.cards[i];
        }
        return null;
    }

    getPaymentMethodName(method) {
        if (!method) return '-';
        if (method.indexOf('card:') === 0) {
            const cardId = method.replace('card:', '');
            const card = this.getCardById(cardId);
            return card ? ' ' + card.name : 'Cartão removido';
        }
        for (let i = 0; i < PAYMENT_METHODS.length; i++) {
            if (PAYMENT_METHODS[i].id === method) return PAYMENT_METHODS[i].icon + ' ' + PAYMENT_METHODS[i].name;
        }
        return method;
    }

    addTransaction() {
        const date = document.getElementById('date').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const statusOk = document.getElementById('statusOk').checked;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const accountId = document.getElementById('transactionAccount').value;
        const isRecurring = document.getElementById('recurring').checked;

        if (!category) { this.showToast('Selecione uma categoria'); return; }
        if (!paymentMethod) { this.showToast('Selecione a forma de pagamento'); return; }

        if (isRecurring) {
            const recurrenceType = document.getElementById('recurrenceType').value;
            const recurrenceCount = parseInt(document.getElementById('recurrenceCount').value);
            
            if (recurrenceCount < 2) { this.showToast('Mínimo de 2 parcelas'); return; }
            
            const startDate = new Date(date + 'T12:00:00');
            const baseAmount = this.currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount);
            const recurrenceGroupId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            let createdCount = 0;
            
            console.log('🔄 Criando recorrência:', {
                type: recurrenceType,
                count: recurrenceCount,
                startDate: startDate.toISOString(),
                amount: baseAmount
            });
            
            for (let i = 0; i < recurrenceCount; i++) {
                const transDate = new Date(startDate);
                
                if (recurrenceType === 'monthly' || recurrenceType === 'installment') {
                    transDate.setMonth(startDate.getMonth() + i);
                    const lastDay = new Date(transDate.getFullYear(), transDate.getMonth() + 1, 0).getDate();
                    if (startDate.getDate() > lastDay) {
                        transDate.setDate(lastDay);
                    } else {
                        transDate.setDate(startDate.getDate());
                    }
                } else if (recurrenceType === 'yearly') {
                    transDate.setFullYear(startDate.getFullYear() + i);
                    const lastDay = new Date(transDate.getFullYear(), transDate.getMonth() + 1, 0).getDate();
                    if (startDate.getDate() > lastDay) {
                        transDate.setDate(lastDay);
                    } else {
                        transDate.setDate(startDate.getDate());
                    }
                }
                
                let transDescription = description;
                if (recurrenceType === 'installment') {
                    transDescription = description + ' - Parcela ' + (i + 1) + '/' + recurrenceCount;
                }
                
                const uniqueId = Date.now() + (i * 1000) + Math.floor(Math.random() * 999);
                
                const transaction = {
                    id: uniqueId,
                    date: transDate.toISOString().split('T')[0],
                    amount: baseAmount,
                    category: category,
                    description: transDescription,
                    statusOk: statusOk,
                    paymentMethod: paymentMethod,
                    accountId: accountId,
                    recurrence: {
                        groupId: recurrenceGroupId,
                        type: recurrenceType,
                        total: recurrenceCount,
                        current: i + 1
                    }
                };
                
                this.transactions.push(transaction);
                createdCount++;
                
                console.log('✅ Transação criada:', {
                    id: uniqueId,
                    date: transaction.date,
                    description: transDescription
                });
            }
            
            this.saveTransactions();
            console.log('💾 Transações salvas. Total:', this.transactions.length);
            
            this.render();
            this.updateCharts();
            this.updateAlertBadge();
            
            this.showToast('✅ ' + createdCount + ' transações recorrentes criadas!');
            closeNewTransactionModal();
            this.clearForm();
            return;
        }

        const transaction = {
            id: Date.now(),
            date: date,
            amount: this.currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount),
            category: category,
            description: description,
            statusOk: statusOk,
            paymentMethod: paymentMethod,
            accountId: accountId
        };

        this.transactions.push(transaction);
        this.saveTransactions();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        this.showToast('Transação adicionada!');
        closeNewTransactionModal();
        this.clearForm();
    }

    clearForm() {
        const form = document.getElementById('transactionForm');
        if (form) form.reset();
        this.setDefaultDate();
        this.currentTransactionType = 'expense';
        
        const btns = document.querySelectorAll('#transactionForm .type-btn');
        btns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-type') === 'expense');
        });
        
        this.filterCategoriesByType('category', 'expense');
        
        const recurringOptions = document.getElementById('recurringOptions');
        if (recurringOptions) recurringOptions.style.display = 'none';
    }

    editTransaction(id) {
        let t = null;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id === id) { 
                t = this.transactions[i]; 
                break; 
            }
        }
        if (!t) return;

        this.currentEditId = id;
        this.currentEditType = t.amount > 0 ? 'income' : 'expense';

        document.getElementById('editId').value = t.id;
        document.getElementById('editDate').value = t.date;
        document.getElementById('editAmount').value = Math.abs(t.amount);
        document.getElementById('editCategory').value = t.category || '';
        document.getElementById('editPaymentMethod').value = t.paymentMethod || '';
        document.getElementById('editTransactionAccount').value = t.accountId || '';
        document.getElementById('editDescription').value = t.description || '';
        document.getElementById('editStatusOk').checked = !!t.statusOk;

        if (t.recurrence) {
            document.getElementById('editRecurring').checked = true;
            document.getElementById('editRecurringOptions').style.display = 'block';
            document.getElementById('editRecurrenceType').value = t.recurrence.type;
            document.getElementById('editRecurrenceCount').value = t.recurrence.total;
        } else {
            document.getElementById('editRecurring').checked = false;
            document.getElementById('editRecurringOptions').style.display = 'none';
        }

        const btns = document.querySelectorAll('#editForm .type-btn');
        const self = this;
        btns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-type') === self.currentEditType);
        });

        this.filterCategoriesByType('editCategory', this.currentEditType);
        document.getElementById('editModal').classList.add('active');
    }

    updateTransaction() {
        const id = parseInt(document.getElementById('editId').value);
        let idx = -1;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id === id) { 
                idx = i; 
                break; 
            }
        }
        if (idx === -1) return;

        const isRecurring = document.getElementById('editRecurring').checked;
        let recurrenceData = null;
        
        if (isRecurring) {
            const recurrenceType = document.getElementById('editRecurrenceType').value;
            const recurrenceCount = parseInt(document.getElementById('editRecurrenceCount').value);
            recurrenceData = {
                type: recurrenceType,
                total: recurrenceCount,
                current: this.transactions[idx].recurrence ? this.transactions[idx].recurrence.current : 1
            };
        }

        this.transactions[idx] = {
            id: id,
            date: document.getElementById('editDate').value,
            amount: this.currentEditType === 'expense' 
                ? -Math.abs(parseFloat(document.getElementById('editAmount').value)) 
                : Math.abs(parseFloat(document.getElementById('editAmount').value)),
            category: document.getElementById('editCategory').value,
            description: document.getElementById('editDescription').value,
            statusOk: document.getElementById('editStatusOk').checked,
            paymentMethod: document.getElementById('editPaymentMethod').value,
            accountId: document.getElementById('editTransactionAccount').value,
            recurrence: recurrenceData
        };

        this.saveTransactions();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        closeEditModal();
        this.showToast('Atualizada!');
    }

    deleteFromEdit() {
        if (!this.currentEditId) return;
        if (!confirm('Excluir esta transação?')) return;
        
        const self = this;
        this.transactions = this.transactions.filter(t => t.id !== self.currentEditId);
        this.saveTransactions();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        closeEditModal();
        this.showToast('Excluída!');
    }

    deleteTransaction(id) {
        if (!confirm('Excluir esta transação?')) return;
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveTransactions();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        this.showToast('Transação excluída!');
    }

    getFilteredTransactions() {
        const search = (document.getElementById('searchFilter').value || '').toLowerCase();
        const catFilter = document.getElementById('categoryFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const accountFilter = document.getElementById('accountFilter').value;
        const self = this;

        return this.getMonthTransactions().filter(t => {
            const cat = self.getCategoryById(t.category);
            const matchSearch = !search || 
                (t.description || '').toLowerCase().indexOf(search) !== -1 || 
                cat.name.toLowerCase().indexOf(search) !== -1;
            const matchCat = !catFilter || t.category === catFilter;
            const matchType = !typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0);
            const matchStatus = !statusFilter || (statusFilter === 'done' ? t.statusOk : !t.statusOk);
            const matchAccount = !accountFilter || t.accountId === accountFilter;
            return matchSearch && matchCat && matchType && matchStatus && matchAccount;
        });
    }

    formatCurrency(v) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
    }

    formatDate(d) {
        return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
    }

    escapeHtml(t) {
        const div = document.createElement('div');
        div.textContent = t || '';
        return div.innerHTML;
    }

    updateDashboard() {
        const mt = this.getMonthTransactions();
        let inc = 0, exp = 0;
        mt.forEach(t => {
            if (t.amount > 0) inc += t.amount;
            else exp += t.amount;
        });

        let unifiedBalance = 0;
        this.accounts.forEach(a => {
            if (a.type === 'checking') unifiedBalance += (parseFloat(a.balance) || 0);
        });

        let creditCardTotal = 0;
        const self = this;
        this.cards.forEach(card => {
            const cardTrans = self.getCardTransactions(card.id);
            cardTrans.forEach(t => {
                creditCardTotal += Math.abs(t.amount);
            });
        });

        const balEl = document.getElementById('totalBalance');
        if (balEl) {
            balEl.textContent = this.formatCurrency(unifiedBalance);
            balEl.className = 'card-value privacy-value ' + (unifiedBalance >= 0 ? 'positive' : 'negative');
        }
        
        const incEl = document.getElementById('totalIncome');
        if (incEl) incEl.textContent = this.formatCurrency(inc);
        
        const expEl = document.getElementById('totalExpenses');
        if (expEl) expEl.textContent = this.formatCurrency(Math.abs(exp));
        
        const goalEl = document.getElementById('goalProgress');
        if (goalEl) {
            goalEl.textContent = this.formatCurrency(creditCardTotal);
            goalEl.className = 'card-value privacy-value negative';
        }
    }

    render() {
        this.updateDashboard();
        const tbody = document.getElementById('transactionsTable');
        const empty = document.getElementById('emptyState');
        if (!tbody) return;

        const filtered = this.getFilteredTransactions();
        if (!filtered.length) {
            tbody.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
        }
        if (empty) empty.style.display = 'none';

        const sorted = filtered.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        const balMap = {};
        let run = 0;
        const reversed = sorted.slice().reverse();
        const self = this;
        
        reversed.forEach(t => {
            run += t.amount;
            balMap[t.id] = run;
        });

        let html = '';
        sorted.forEach(t => {
            const cat = self.getCategoryById(t.category);
            let acc = null;
            for (let i = 0; i < self.accounts.length; i++) {
                if (self.accounts[i].id === t.accountId) { 
                    acc = self.accounts[i]; 
                    break; 
                }
            }
            const cls = t.amount >= 0 ? 'positive' : 'negative';
            const statusClass = t.statusOk ? 'status-done' : 'status-pending';
            const statusText = t.statusOk ? 'Concluído' : 'Pendente';
            const paymentName = self.getPaymentMethodName(t.paymentMethod);
            
            let recurrenceHtml = '';
            if (t.recurrence) {
                if (t.recurrence.type === 'installment') {
                    recurrenceHtml = '<span class="recurrence-badge">📅 ' + (t.recurrence.current || 1) + '/' + (t.recurrence.total || 1) + '</span>';
                } else if (t.recurrence.type === 'monthly') {
                    recurrenceHtml = '<span class="recurrence-badge">📅 Mensal</span>';
                } else if (t.recurrence.type === 'yearly') {
                    recurrenceHtml = '<span class="recurrence-badge">📅 Anual</span>';
                }
            }

            html += '<tr class="transaction-row" onclick="smartwallet.editTransaction(' + t.id + ')">';
            html += '<td data-label="Data">' + self.formatDate(t.date) + '</td>';
            html += '<td data-label="Descrição">' + self.escapeHtml(t.description || '-') + '</td>';
            html += '<td data-label="Categoria"><span class="category-badge" style="background:' + cat.color + '">' + self.escapeHtml(cat.name) + '</span></td>';
            html += '<td data-label="Conta">' + (acc ? '<span class="account-badge">' + self.escapeHtml(acc.name) + '</span>' : '-') + '</td>';
            html += '<td data-label="Pagamento"><span class="payment-badge">' + paymentName + '</span></td>';
            html += '<td data-label="Status"><span class="status-badge ' + statusClass + '">' + statusText + '</span></td>';
            html += '<td data-label="Recorrência">' + (recurrenceHtml || '-') + '</td>';
            html += '<td data-label="Valor" class="amount ' + cls + ' privacy-value">' + self.formatCurrency(t.amount) + '</td>';
            html += '<td data-label="Saldo" class="balance privacy-value">' + self.formatCurrency(balMap[t.id]) + '</td>';
            html += '</tr>';
        });

        tbody.innerHTML = html;
    }

    applyTheme() {
        document.body.classList.toggle('light', !this.darkMode);
        const btn = document.getElementById('themeBtn');
        if (btn) {
            btn.innerHTML = this.darkMode
                ? '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
                : '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        }
        if (Object.keys(this.charts).length > 0) {
            try { this.updateChartsTheme(); } catch (e) { console.warn('Erro tema:', e); }
        }
    }

    applyPrivacy() {
        document.body.classList.toggle('privacy-on', this.privacyOn);
        const btn = document.getElementById('privacyBtn');
        if (btn) {
            btn.innerHTML = this.privacyOn
                ? '<svg class="icon" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
                : '<svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
            btn.classList.toggle('active', this.privacyOn);
        }
    }

    showToast(msg) {
        const t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.classList.add('active');
        clearTimeout(this.toastT);
        this.toastT = setTimeout(() => t.classList.remove('active'), 3000);
    }

    getChartColors() {
        const isLight = document.body.classList.contains('light');
        return {
            text: isLight ? '#1e293b' : '#e2e8f0',
            grid: isLight ? '#e5e7eb' : '#334155',
            textSecondary: isLight ? '#64748b' : '#94a3b8'
        };
    }

    initCharts() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js não carregado!');
            return;
        }
        const colors = this.getChartColors();
        const lineOpts = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { color: colors.text } } },
            scales: {
                y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
            }
        };
        
        try {
            this.charts.line = new Chart(document.getElementById('lineChart').getContext('2d'), {
                type: 'line',
                data: { labels: [], datasets: [
                    { label: 'Receitas', data: [], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4 },
                    { label: 'Despesas', data: [], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', tension: 0.4 }
                ] },
                options: lineOpts
            });
        } catch (e) { console.error('Erro line:', e); }

        try {
            this.charts.pie = new Chart(document.getElementById('pieChart').getContext('2d'), {
                type: 'bar',
                data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                        y: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                    },
                    barPercentage: 0.3,
                    categoryPercentage: 0.5
                }
            });
        } catch (e) { console.error('Erro pie:', e); }

        try {
            this.charts.cards = new Chart(document.getElementById('cardsChart').getContext('2d'), {
                type: 'line',
                data: { labels: [], datasets: [] },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top', labels: { color: colors.text } } },
                    scales: {
                        y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                        x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                    }
                }
            });
        } catch (e) { console.error('Erro cards:', e); }

        this.updateCharts();
    }

    updateChartsTheme() {
        const colors = this.getChartColors();
        const self = this;
        Object.keys(this.charts).forEach(key => {
            const chart = self.charts[key];
            if (!chart || !chart.options) return;
            try {
                if (chart.options.scales?.y?.ticks) chart.options.scales.y.ticks.color = colors.textSecondary;
                if (chart.options.scales?.y?.grid) chart.options.scales.y.grid.color = colors.grid;
                if (chart.options.scales?.x?.ticks) chart.options.scales.x.ticks.color = colors.textSecondary;
                if (chart.options.scales?.x?.grid) chart.options.scales.x.grid.color = colors.grid;
                if (chart.options.plugins?.legend?.labels) chart.options.plugins.legend.labels.color = colors.text;
                chart.update('none');
            } catch (e) { console.warn('Erro tema gráfico:', e); }
        });
    }

    updateCharts() {
        const self = this;
        const lLabels = [], lInc = [], lExp = [];
        
        for (let i = -2; i <= 3; i++) {
            const d = new Date(this.currentMonth);
            d.setMonth(d.getMonth() + i);
            const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            lLabels.push(months[d.getMonth()] + '/' + d.getFullYear());
            const mt = this.getMonthTransactions(d);
            let inc = 0, exp = 0;
            mt.forEach(t => {
                if (t.amount > 0) inc += t.amount;
                else exp += t.amount;
            });
            lInc.push(inc);
            lExp.push(Math.abs(exp));
        }
        
        if (this.charts.line) {
            this.charts.line.data.labels = lLabels;
            this.charts.line.data.datasets[0].data = lInc;
            this.charts.line.data.datasets[1].data = lExp;
            this.charts.line.update();
        }

        const exps = {};
        this.getMonthTransactions().forEach(t => {
            if (t.amount < 0) {
                const c = self.getCategoryById(t.category);
                if (!exps[c.name]) exps[c.name] = { t: 0, color: c.color };
                exps[c.name].t += Math.abs(t.amount);
            }
        });
        
        if (this.charts.pie) {
            this.charts.pie.data.labels = Object.keys(exps);
            this.charts.pie.data.datasets[0].data = Object.keys(exps).map(k => exps[k].t);
            this.charts.pie.data.datasets[0].backgroundColor = Object.keys(exps).map(k => exps[k].color);
            this.charts.pie.update();
        }

        if (this.charts.cards) {
            const cardLabels = [];
            const cardDatasets = [];
            
            for (let i = -2; i <= 3; i++) {
                const d = new Date(this.currentMonth);
                d.setMonth(d.getMonth() + i);
                const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                cardLabels.push(months[d.getMonth()] + '/' + d.getFullYear());
            }
            
            this.cards.forEach(card => {
                const data = [];
                for (let i = -2; i <= 3; i++) {
                    const d = new Date(self.currentMonth);
                    d.setMonth(d.getMonth() + i);
                    const cardTrans = self.getCardTransactions(card.id, d);
                    let total = 0;
                    cardTrans.forEach(t => total += Math.abs(t.amount));
                    data.push(total);
                }
                cardDatasets.push({
                    label: card.name,
                    data: data,
                    borderColor: card.color,
                    backgroundColor: card.color + '20',
                    tension: 0.4,
                    fill: false
                });
            });
            
            this.charts.cards.data.labels = cardLabels;
            this.charts.cards.data.datasets = cardDatasets;
            this.charts.cards.update();
        }

        this.updateInvestmentChart();
    }

    updateAlertBadge() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const in3Days = new Date(today);
        in3Days.setDate(in3Days.getDate() + 3);
        const self = this;
        
        const bills = this.transactions.filter(t => {
            if (t.statusOk || t.amount >= 0) return false;
            const tDate = new Date(t.date + 'T00:00:00');
            return tDate <= in3Days;
        });
        
        const badge = document.getElementById('alertBadge');
        const btn = document.getElementById('alertBtn');
        
        if (badge && btn) {
            if (bills.length > 0) {
                badge.textContent = bills.length;
                badge.classList.add('visible');
                btn.classList.add('has-alerts');
            } else {
                badge.classList.remove('visible');
                btn.classList.remove('has-alerts');
            }
        }
    }

    getInvoicePeriod(card) {
        const now = new Date();
        let closingDate = new Date(now.getFullYear(), now.getMonth(), card.closingDay);
        
        if (now.getDate() < card.closingDay) {
            closingDate = new Date(now.getFullYear(), now.getMonth() - 1, card.closingDay);
        }
        
        const startDate = new Date(closingDate);
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(startDate.getDate() + 1);
        
        const dueDate = new Date(closingDate);
        dueDate.setMonth(dueDate.getMonth() + 1);
        dueDate.setDate(card.dueDay);
        
        return { startDate, closingDate, dueDate };
    }

    calculateInvoiceTotal(purchases) {
        let total = 0;
        purchases.forEach(p => total += Math.abs(p.amount));
        return total;
    }

    renderCreditCardsList() {
        const container = document.getElementById('creditCardsList');
        if (!container) return;
        
        if (!this.cards.length) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">💳</div><h3>Nenhum cartão cadastrado</h3><p>Clique em "Novo Cartão" para começar</p></div>';
            return;
        }
        
        const self = this;
        let html = '<div class="credit-cards-grid">';
        
        this.cards.forEach(card => {
            const period = self.getInvoicePeriod(card);
            const purchases = self.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
            const total = self.calculateInvoiceTotal(purchases);
            const available = card.limit - total;
            const usedPct = Math.min(100, (total / card.limit) * 100);
            
            html += '<div class="credit-card-visual" style="background:linear-gradient(135deg, ' + card.color + ' 0%, ' + self.adjustColor(card.color, -30) + ' 100%);" onclick="openInvoiceModal(\'' + card.id + '\')">';
            html += '<div class="cc-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editCard(\'' + card.id + '\')">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteCard(\'' + card.id + '\')">🗑️</button></div>';
            html += '<div class="cc-header"><div class="cc-brand">' + self.escapeHtml(card.brand) + '</div><div class="cc-chip"></div></div>';
            html += '<div class="cc-name">' + self.escapeHtml(card.name) + '</div>';
            html += '<div class="cc-number">•••• •••• •••• ' + self.escapeHtml(card.last4 || '****') + '</div>';
            html += '<div class="cc-footer"><div><div class="cc-label">Fatura Atual</div><div class="cc-value">' + self.formatCurrency(total) + '</div></div><div style="text-align:right;"><div class="cc-label">Disponível</div><div class="cc-value">' + self.formatCurrency(available) + '</div></div></div>';
            html += '<div style="position:absolute; bottom:0; left:0; right:0; height:4px; background:rgba(0,0,0,0.3);"><div style="height:100%; width:' + usedPct + '%; background:' + (usedPct > 80 ? '#ef4444' : usedPct > 50 ? '#f59e0b' : '#10b981') + ';"></div></div>';
            html += '</div>';
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
    }

    saveCard() {
        const id = document.getElementById('cardEditId').value;
        const name = document.getElementById('cardName').value.trim();
        const brand = document.getElementById('cardBrand').value;
        const last4 = document.getElementById('cardLast4').value.trim();
        const closingDay = parseInt(document.getElementById('cardClosingDay').value);
        const dueDay = parseInt(document.getElementById('cardDueDay').value);
        const limit = parseFloat(document.getElementById('cardLimit').value);
        const color = document.getElementById('cardColor').value;

        if (!name) { this.showToast('Informe o nome'); return; }

        if (id) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].id === id) {
                    this.cards[i] = { id, name, brand, last4, closingDay, dueDay, limit, color };
                    break;
                }
            }
        } else {
            this.cards.push({ id: 'card_' + Date.now(), name, brand, last4, closingDay, dueDay, limit, color });
        }

        this.saveCards();
        this.populatePaymentMethodSelects();
        this.renderCreditCardsList();
        closeNewCardModal();
        this.showToast(id ? 'Cartão atualizado!' : 'Cartão cadastrado!');
    }

    deleteCard(id) {
        if (!confirm('Excluir este cartão? As transações associadas serão mantidas.')) return;
        this.cards = this.cards.filter(c => c.id !== id);
        this.saveCards();
        this.populatePaymentMethodSelects();
        this.renderCreditCardsList();
        this.showToast('Cartão removido!');
    }

    editCard(id) {
        const card = this.getCardById(id);
        if (!card) return;
        
        document.getElementById('cardEditId').value = card.id;
        document.getElementById('cardName').value = card.name;
        document.getElementById('cardBrand').value = card.brand;
        document.getElementById('cardLast4').value = card.last4 || '';
        document.getElementById('cardClosingDay').value = card.closingDay;
        document.getElementById('cardDueDay').value = card.dueDay;
        document.getElementById('cardLimit').value = card.limit;
        document.getElementById('cardColor').value = card.color;
        document.getElementById('newCardTitle').textContent = 'Editar Cartão';
        document.getElementById('newCardModal').classList.add('active');
    }

    openInvoice(cardId) {
        const card = this.getCardById(cardId);
        if (!card) return;
        
        const period = this.getInvoicePeriod(card);
        const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
        const total = this.calculateInvoiceTotal(purchases);
        const minimum = total * 0.15;
        const available = card.limit - total;
        const self = this;

        document.getElementById('invoiceTitle').textContent = 'Fatura - ' + card.name;
        
        let html = '<div style="display:flex; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">';
        html += '<div><div style="font-size:0.85rem; color:var(--text-secondary);">Período</div><div style="font-weight:600;">' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' - ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '</div></div>';
        html += '<div style="text-align:right;"><div style="font-size:0.85rem; color:var(--text-secondary);">Vencimento</div><div style="font-weight:600; color:var(--warning-color);">' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '</div></div></div>';
        html += '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">';
        html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Limite Total</span><span style="font-weight:600;">' + this.formatCurrency(card.limit) + '</span></div>';
        html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total da Fatura</span><span style="font-weight:600; color:var(--danger-color);">' + this.formatCurrency(total) + '</span></div>';
        html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Mínimo (15%)</span><span style="font-weight:600;">' + this.formatCurrency(minimum) + '</span></div>';
        html += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700;"><span>Disponível</span><span style="color:var(--success-color);">' + this.formatCurrency(available) + '</span></div></div>';
        html += '<div style="display:flex; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:10px;">';
        html += '<h3 style="font-size:1.1rem;">Compras (' + purchases.length + ')</h3>';
        html += '<div style="display:flex; gap:8px;">';
        html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.exportInvoiceCSV(\'' + cardId + '\')">📥 CSV</button>';
        html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.printInvoicePDF(\'' + cardId + '\')">🖨️ PDF</button></div></div>';
        html += '<div>';
        
        if (purchases.length === 0) {
            html += '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma compra neste período.</p>';
        } else {
            purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(p => {
                const cat = self.getCategoryById(p.category);
                html += '<div style="background:var(--input-bg); border-radius:12px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:12px;">';
                html += '<div style="flex:1;"><div style="font-weight:600;">' + self.escapeHtml(p.description) + '</div>';
                html += '<div style="font-size:0.8rem; color:var(--text-secondary); display:flex; gap:10px;"><span>' + self.formatDate(p.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeHtml(cat.name) + '</span></div></div>';
                html += '<div style="font-weight:700;">' + self.formatCurrency(Math.abs(p.amount)) + '</div>';
                html += '<button class="btn btn-danger btn-small" onclick="smartwallet.deleteTransaction(' + p.id + '); smartwallet.openInvoice(\'' + cardId + '\')">🗑️</button></div>';
            });
        }
        
        html += '</div>';
        html += '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">';
        html += '<button class="btn btn-success" onclick="smartwallet.payInvoice(\'' + cardId + '\')">💰 Pagar Fatura</button>';
        html += '<button class="btn btn-secondary" onclick="closeInvoiceModal()">Fechar</button></div>';

        document.getElementById('invoiceContent').innerHTML = html;
        document.getElementById('invoiceModal').classList.add('active');
    }

    payInvoice(cardId) {
        const card = this.getCardById(cardId);
        if (!card) return;
        
        const period = this.getInvoicePeriod(card);
        const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
        const total = this.calculateInvoiceTotal(purchases);
        
        if (total <= 0) { this.showToast('Fatura sem valor'); return; }
        if (!confirm('Pagar fatura de ' + this.formatCurrency(total) + '?')) return;

        this.transactions.push({
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            amount: -total,
            category: 'servicos',
            description: 'Pagamento Fatura ' + card.name,
            statusOk: false,
            paymentMethod: 'pix',
            accountId: ''
        });

        this.saveTransactions();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        this.showToast('Pagamento registrado!');
    }

    exportInvoiceCSV(cardId) {
        const card = this.getCardById(cardId);
        if (!card) return;
        
        const period = this.getInvoicePeriod(card);
        const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
        const self = this;
        
        let csv = '\ufeffFATURA - ' + card.name + '\n';
        csv += 'Período:;' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' a ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '\n';
        csv += 'Vencimento:;' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '\n\n';
        csv += 'Data;Descrição;Categoria;Valor\n';
        
        purchases.forEach(p => {
            const cat = self.getCategoryById(p.category);
            csv += p.date + ';"' + (p.description || '').replace(/"/g,'""') + '";"' + cat.name + '";' + Math.abs(p.amount).toFixed(2) + '\n';
        });
        
        const total = this.calculateInvoiceTotal(purchases);
        csv += '\nTOTAL DA FATURA;;;' + this.formatCurrency(total) + '\n';
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'fatura_' + card.name.replace(/\s+/g,'_') + '_' + this.formatMonthYear(new Date()) + '.csv';
        a.click();
        this.showToast('Fatura exportada!');
    }

    printInvoicePDF(cardId) {
        const card = this.getCardById(cardId);
        if (!card) return;
        
        const period = this.getInvoicePeriod(card);
        const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
        const total = this.calculateInvoiceTotal(purchases);
        const self = this;
        
        const printWindow = window.open('', '_blank');
        const rows = purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).map(p => {
            const cat = self.getCategoryById(p.category);
            return '<tr><td>' + self.formatDate(p.date) + '</td><td>' + self.escapeHtml(p.description) + '</td><td>' + self.escapeHtml(cat.name) + '</td><td style="text-align:right;">' + self.formatCurrency(Math.abs(p.amount)) + '</td></tr>';
        }).join('');
        
        printWindow.document.write('<!DOCTYPE html><html><head><title>Fatura ' + card.name + '</title><style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;}.header{border-bottom:3px solid #6366f1;padding-bottom:20px;margin-bottom:30px;}.header h1{color:#6366f1;margin:0 0 5px 0;}table{width:100%;border-collapse:collapse;}th,td{padding:10px;text-align:left;border-bottom:1px solid #e5e7eb;}th{background:#f1f5f9;}.total{font-weight:700;font-size:1.2rem;}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #6366f1;font-size:0.85rem;color:#64748b;text-align:center;}@media print{body{padding:20px;}}</style></head><body>');
        printWindow.document.write('<div class="header"><h1>Fatura - ' + this.escapeHtml(card.name) + '</h1><div style="color:#64748b;">' + this.escapeHtml(card.brand) + ' •••• ' + this.escapeHtml(card.last4 || '****') + '</div></div>');
        printWindow.document.write('<p><strong>Período:</strong> ' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' a ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '</p>');
        printWindow.document.write('<p><strong>Vencimento:</strong> ' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '</p>');
        printWindow.document.write('<table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th></tr></thead><tbody>' + rows + '</tbody>');
        printWindow.document.write('<tfoot><tr class="total"><td colspan="3" style="text-align:right;">TOTAL:</td><td>' + this.formatCurrency(total) + '</td></tr></tfoot></table>');
        printWindow.document.write('<div class="footer">Smart Wallet • Gerado em ' + new Date().toLocaleString('pt-BR') + '<br>Idealizado por RogerElizar™</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 250);
    }

    exportCSV() {
        const mt = this.getMonthTransactions();
        if (!mt.length) { this.showToast('Nenhuma transação'); return; }
        
        const self = this;
        let csv = '\ufeffData;Descrição;Categoria;Tipo;Pagamento;Status;Valor\n';
        
        mt.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(t => {
            const c = self.getCategoryById(t.category);
            const status = t.statusOk ? 'Concluído' : 'Pendente';
            const payment = self.getPaymentMethodName(t.paymentMethod);
            csv += t.date + ';"' + (t.description || '').replace(/"/g,'""') + '";"' + c.name + '";' + (t.amount > 0 ? 'Receita' : 'Despesa') + ';"' + payment + '";' + status + ';' + Math.abs(t.amount).toFixed(2) + '\n';
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'extrato_' + this.formatMonthYear(this.currentMonth) + '.csv';
        a.click();
        this.showToast('CSV exportado!');
        closeExportModal();
    }

    printPDF() {
        window.print();
    }

    exportBackup() {
        try {
            const backup = {
                version: '3.0.0',
                exportDate: new Date().toISOString(),
                appName: 'Smart Wallet',
                transactions: this.transactions,
                categories: this.categories,
                accounts: this.accounts,
                cards: this.cards,
                investments: this.investments,
                darkMode: this.darkMode,
                privacyOn: this.privacyOn
            };
            
            const jsonString = JSON.stringify(backup, null, 2);
            const blob = new Blob(['\ufeff' + jsonString], { type: 'application/json;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            const dateStr = new Date().toISOString().split('T')[0];
            a.download = 'smart_wallet_backup_' + dateStr + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
            
            this.showToast('✅ Backup exportado!');
            document.getElementById('mainMenu').classList.remove('active');
        } catch (e) {
            this.showToast('❌ Erro: ' + e.message);
        }
    }

    importBackup() {
        if (!window._pendingBackupData) { 
            this.showToast('⚠️ Selecione um arquivo'); 
            return; 
        }
        
        try {
            let cleanData = window._pendingBackupData;
            if (cleanData.charCodeAt(0) === 0xFEFF) cleanData = cleanData.substring(1);
            cleanData = cleanData.trim();
            
            if (!cleanData) { 
                this.showToast('❌ Arquivo vazio!'); 
                return; 
            }
            
            const data = JSON.parse(cleanData);
            if (!data || typeof data !== 'object') { 
                this.showToast('❌ Estrutura inválida'); 
                return; 
            }

            const transactions = Array.isArray(data.transactions) ? data.transactions : [];
            const categories = Array.isArray(data.categories) ? data.categories : this.categories;
            const accounts = Array.isArray(data.accounts) ? data.accounts : [];
            const cards = Array.isArray(data.cards) ? data.cards : [];
            const investments = Array.isArray(data.investments) ? data.investments : [];

            if (!confirm('⚠️ Substituir TODOS os dados?')) {
                return this.showToast('Cancelado');
            }

            this.transactions = transactions;
            this.categories = categories;
            this.accounts = accounts;
            this.cards = cards;
            this.investments = investments;

            if (typeof data.darkMode === 'boolean') this.darkMode = data.darkMode;
            if (typeof data.privacyOn === 'boolean') this.privacyOn = data.privacyOn;

            this.saveTransactions();
            this.saveCategories();
            this.saveAccounts();
            this.saveCards();
            this.saveInvestments();
            localStorage.setItem('smartwallet_dark', this.darkMode);
            localStorage.setItem('smartwallet_privacy', this.privacyOn);

            this.populateCategorySelects();
            this.populatePaymentMethodSelects();
            this.populateAccountSelects();
            this.applyTheme();
            this.applyPrivacy();
            this.render();
            this.updateCharts();
            this.updateAlertBadge();
            closeImportBackupModal();
            this.showToast('✅ Backup restaurado!');
            window._pendingBackupData = null;
        } catch (e) {
            this.showToast('❌ Erro: ' + e.message);
        }
    }

    importCSV() {
        if (!window._pendingCsvData) { 
            this.showToast('Selecione um arquivo CSV'); 
            return; 
        }
        
        const replace = document.getElementById('csvReplaceData').checked;
        const lines = window._pendingCsvData.split(/\r?\n/).filter(l => l.trim());
        
        if (lines.length < 2) { 
            this.showToast('CSV vazio ou inválido'); 
            return; 
        }
        
        const header = lines[0].toLowerCase();
        if (header.indexOf('data') === -1 || header.indexOf('valor') === -1) { 
            this.showToast('Formato CSV inválido'); 
            return; 
        }

        const self = this;
        const transactionsToAdd = [];
        let skipped = 0;
        
        for (let i = 1; i < lines.length; i++) {
            const cols = this.parseCSVLine(lines[i]);
            if (cols.length < 6) { skipped++; continue; }
            
            const [date, desc, catName, tipo, payment, status, valor] = cols;
            if (!date || !valor) { skipped++; continue; }
            
            const category = this.findCategoryByName(catName);
            const amount = parseFloat(valor.replace(',', '.'));
            if (isNaN(amount)) { skipped++; continue; }
            
            const signedAmount = tipo.toLowerCase().indexOf('despesa') !== -1 ? -Math.abs(amount) : Math.abs(amount);
            let paymentMethod = 'pix';
            const payLower = (payment || '').toLowerCase();
            
            if (payLower.indexOf('pix') !== -1) paymentMethod = 'pix';
            else if (payLower.indexOf('debit') !== -1 || payLower.indexOf('débito') !== -1) paymentMethod = 'debit';
            else if (payLower.indexOf('auto') !== -1) paymentMethod = 'auto';
            else if (payLower.indexOf('transf') !== -1) paymentMethod = 'transfer';

            transactionsToAdd.push({
                id: Date.now() + i + Math.random() * 1000,
                date,
                amount: signedAmount,
                category: category ? category.id : '',
                description: desc,
                statusOk: status.toLowerCase().indexOf('conclu') !== -1,
                paymentMethod,
                accountId: ''
            });
        }

        if (replace) {
            const m = this.currentMonth.getMonth();
            const y = this.currentMonth.getFullYear();
            this.transactions = this.transactions.filter(t => {
                const d = new Date(t.date + 'T00:00:00');
                return !(d.getMonth() === m && d.getFullYear() === y);
            });
        }

        this.transactions = this.transactions.concat(transactionsToAdd);
        this.saveTransactions();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        closeImportCsvModal();
        this.showToast(transactionsToAdd.length + ' transações importadas!' + (skipped > 0 ? ' (' + skipped + ' ignoradas)' : ''));
        window._pendingCsvData = null;
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') {
                if (inQuotes && line[i+1] === '"') { 
                    current += '"'; 
                    i++; 
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (c === ';' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += c;
            }
        }
        result.push(current.trim());
        return result;
    }

    clearAllData() {
        this.transactions = [];
        this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        this.accounts = [];
        this.cards = [];
        this.investments = [];
        
        this.saveTransactions();
        this.saveCategories();
        this.saveAccounts();
        this.saveCards();
        this.saveInvestments();
        
        this.populateCategorySelects();
        this.populatePaymentMethodSelects();
        this.populateAccountSelects();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        closeClearDataModal();
        this.showToast('🗑️ Dados apagados!');
    }

    addCategory() {
        const name = document.getElementById('newCategoryName').value.trim();
        const color = document.getElementById('newCategoryColor').value;
        
        if (!name) { this.showToast('Digite um nome'); return; }
        
        const exists = this.categories.some(c => 
            c.name.toLowerCase() === name.toLowerCase() && c.type === this.newCategoryType
        );
        if (exists) { this.showToast('Categoria já existe'); return; }
        
        this.categories.push({ 
            id: name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now(), 
            name, 
            color, 
            type: this.newCategoryType 
        });
        
        this.saveCategories();
        this.populateCategorySelects();
        this.renderCategoryList();
        document.getElementById('newCategoryName').value = '';
        this.showToast('Categoria adicionada!');
    }

    deleteCategory(id) {
        if (this.transactions.some(t => t.category === id)) {
            if (!confirm('Categoria em uso. Remover mesmo assim?')) return;
            this.transactions.forEach(t => { 
                if (t.category === id) t.category = ''; 
            });
            this.saveTransactions();
        }
        
        this.categories = this.categories.filter(c => c.id !== id);
        this.saveCategories();
        this.populateCategorySelects();
        this.renderCategoryList();
        this.render();
        this.showToast('Categoria removida!');
    }

    renderCategoryList() {
        const c = document.getElementById('categoryList');
        if (!c) return;
        
        if (!this.categories.length) {
            c.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma categoria</p>';
            return;
        }
        
        const self = this;
        c.innerHTML = this.categories.map(cat => {
            return '<div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:var(--input-bg); border-radius:12px;">' +
                '<div style="display:flex; align-items:center; gap:10px;"><span style="width:20px; height:20px; border-radius:50%; background:' + cat.color + '; display:inline-block;"></span>' +
                '<div><div style="font-weight:500;">' + self.escapeHtml(cat.name) + '</div><div style="font-size:0.75rem; color:var(--text-secondary);">' + (cat.type === 'income' ? '💰 Receita' : '💸 Despesa') + '</div></div></div>' +
                '<button class="btn btn-danger btn-small" onclick="smartwallet.deleteCategory(\'' + cat.id + '\')">🗑️</button></div>';
        }).join('');
    }

    saveAccount() {
        const id = document.getElementById('accountEditId').value;
        const name = document.getElementById('accountName').value.trim();
        const type = document.getElementById('accountType').value;
        const balance = parseFloat(document.getElementById('accountBalance').value) || 0;
        const color = document.getElementById('accountColor').value;

        if (!name) { this.showToast('Informe o nome'); return; }

        if (id) {
            for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].id === id) {
                    this.accounts[i] = { id, name, type, balance, color };
                    break;
                }
            }
        } else {
            this.accounts.push({ id: 'acc_' + Date.now(), name, type, balance, color });
        }

        this.saveAccounts();
        this.populateAccountSelects();
        this.renderAccountsList();
        this.render();
        closeNewAccountModal();
        this.showToast(id ? 'Conta atualizada!' : 'Conta cadastrada!');
    }

    deleteAccount(id) {
        if (!confirm('Excluir esta conta?')) return;
        this.accounts = this.accounts.filter(a => a.id !== id);
        this.saveAccounts();
        this.populateAccountSelects();
        this.renderAccountsList();
        this.render();
        this.showToast('Conta removida!');
    }

    editAccount(id) {
        let acc = null;
        for (let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].id === id) { 
                acc = this.accounts[i]; 
                break; 
            }
        }
        if (!acc) return;
        
        document.getElementById('accountEditId').value = acc.id;
        document.getElementById('accountName').value = acc.name;
        document.getElementById('accountType').value = acc.type;
        document.getElementById('accountBalance').value = acc.balance;
        document.getElementById('accountColor').value = acc.color;
        document.getElementById('newAccountTitle').textContent = 'Editar Conta';
        document.getElementById('newAccountModal').classList.add('active');
    }

    renderAccountsList() {
        const container = document.getElementById('accountsList');
        if (!container) return;
        
        if (!this.accounts.length) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">🏦</div><h3>Nenhuma conta cadastrada</h3><p>Clique em "Nova Conta" para começar</p></div>';
            return;
        }
        
        const self = this;
        container.innerHTML = '<div class="accounts-grid">' + this.accounts.map(acc => {
            return '<div class="account-card" style="background:linear-gradient(135deg, ' + acc.color + ' 0%, ' + self.adjustColor(acc.color, -30) + ' 100%);">' +
                '<div class="account-card-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editAccount(\'' + acc.id + '\')">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteAccount(\'' + acc.id + '\')">🗑️</button></div>' +
                '<div class="account-card-header"><div class="account-card-type">' + (acc.type === 'checking' ? '💳 Conta Corrente' : '📈 Investimento') + '</div></div>' +
                '<div class="account-card-name">' + self.escapeHtml(acc.name) + '</div>' +
                '<div class="account-card-balance">' + self.formatCurrency(acc.balance) + '</div></div>';
        }).join('') + '</div>';
    }

    renderBillsModal() {
        const container = document.getElementById('billsList');
        if (!container) return;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const in3Days = new Date(today);
        in3Days.setDate(in3Days.getDate() + 3);
        const self = this;
        
        const bills = this.transactions.filter(t => {
            if (t.statusOk || t.amount >= 0) return false;
            const tDate = new Date(t.date + 'T00:00:00');
            return tDate <= in3Days;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));

        if (bills.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px;">✅</div><h3>Nenhuma conta pendente!</h3><p>Todas as contas estão em dia.</p></div>';
            return;
        }

        let total = 0;
        bills.forEach(b => total += Math.abs(b.amount));

        let html = '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">';
        html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total de contas</span><span style="font-weight:600;">' + bills.length + '</span></div>';
        html += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700; font-size:1.1rem;"><span>Total a pagar</span><span style="color:var(--danger-color);">' + self.formatCurrency(total) + '</span></div></div>';

        bills.forEach(bill => {
            const cat = self.getCategoryById(bill.category);
            const billDate = new Date(bill.date + 'T00:00:00');
            const diffDays = Math.round((billDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            let daysClass = 'warning', daysText = '', itemClass = '';
            if (diffDays < 0) { 
                daysClass = 'overdue'; 
                daysText = Math.abs(diffDays) + 'd atrasada'; 
                itemClass = 'overdue'; 
            } else if (diffDays === 0) { 
                daysClass = 'urgent'; 
                daysText = 'Vence hoje'; 
                itemClass = 'urgent'; 
            } else if (diffDays === 1) { 
                daysClass = 'urgent'; 
                daysText = 'Vence amanhã'; 
                itemClass = 'urgent'; 
            } else { 
                daysText = 'Em ' + diffDays + ' dias'; 
            }

            html += '<div class="bill-item ' + itemClass + '">';
            html += '<div class="bill-info"><div class="bill-desc">' + self.escapeHtml(bill.description) + '<span class="bill-days ' + daysClass + '">' + daysText + '</span></div>';
            html += '<div class="bill-meta"><span>📅 ' + self.formatDate(bill.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeHtml(cat.name) + '</span></div></div>';
            html += '<div class="bill-amount">' + self.formatCurrency(Math.abs(bill.amount)) + '</div>';
            html += '<div style="display:flex; gap:4px;">';
            html += '<button class="btn btn-success btn-small" onclick="smartwallet.markBillAsPaid(' + bill.id + ')">✓</button>';
            html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.editTransaction(' + bill.id + '); closeBillsModal();">✏️</button></div></div>';
        });

        container.innerHTML = html;
    }

    markBillAsPaid(id) {
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id === id) {
                this.transactions[i].statusOk = true;
                break;
            }
        }
        this.saveTransactions();
        this.render();
        this.updateAlertBadge();
        this.renderBillsModal();
        this.showToast('✓ Conta paga!');
    }

    updateInvestmentChart() {
        const section = document.getElementById('investmentsChartSection');
        if (!section) return;
        
        if (!this.investments.length) {
            section.style.display = 'none';
            return;
        }
        section.style.display = 'block';

        const colors = this.getChartColors();
        const now = new Date();
        const months = 6;
        const monthlyData = {};

        for (let i = months - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
            monthlyData[key] = { invested: 0, current: 0 };
        }

        const self = this;
        this.investments.forEach(inv => {
            const invDate = new Date(inv.date + 'T00:00:00');
            const invKey = invDate.getFullYear() + '-' + String(invDate.getMonth() + 1).padStart(2, '0');
            Object.keys(monthlyData).forEach(key => {
                if (key >= invKey) monthlyData[key].invested += inv.initial;
            });
            const currentKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
            if (monthlyData[currentKey]) monthlyData[currentKey].current += inv.current;
        });

        const labels = [], investedData = [], currentData = [], profitPctData = [], projectionData = [];
        const keys = Object.keys(monthlyData);
        
        keys.forEach(key => {
            const d = new Date(key + '-01');
            const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            labels.push(monthNames[d.getMonth()] + '/' + d.getFullYear());
            const invested = monthlyData[key].invested;
            const current = monthlyData[key].current || invested;
            investedData.push(invested);
            currentData.push(current);
            const profitPct = invested > 0 ? ((current - invested) / invested * 100) : 0;
            profitPctData.push(profitPct);
        });

        const lastInvested = investedData[investedData.length - 1] || 0;
        const lastCurrent = currentData[currentData.length - 1] || 0;
        let avgRate = 0;
        
        if (self.investments.length > 0) {
            let totalRate = 0;
            self.investments.forEach(inv => totalRate += inv.rate || 0);
            avgRate = totalRate / self.investments.length;
        }
        
        const monthlyRate = avgRate / 12 / 100;
        
        for (let i = 1; i <= 3; i++) {
            const projDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
            const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            labels.push(monthNames[projDate.getMonth()] + '/' + projDate.getFullYear() + ' (proj)');
            investedData.push(lastInvested);
            currentData.push(null);
            profitPctData.push(null);
            const projected = lastCurrent * Math.pow(1 + monthlyRate, i);
            projectionData.push(projected);
        }
        
        while (projectionData.length < labels.length - 3) projectionData.unshift(null);

        if (!this.charts.invest) {
            const canvas = document.getElementById('investChart');
            if (!canvas) return;
            
            this.charts.invest = new Chart(canvas.getContext('2d'), {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        { label: 'Valor Investido (R$)', data: investedData, borderColor: '#94a3b8', backgroundColor: 'rgba(148,163,184,0.1)', tension: 0.4, fill: false, yAxisID: 'y' },
                        { label: 'Valor Atual (R$)', data: currentData, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4, fill: true, yAxisID: 'y' },
                        { label: 'Projeção (R$)', data: projectionData, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.4, borderDash: [5, 5], fill: false, yAxisID: 'y' },
                        { label: 'Rendimento (%)', data: profitPctData, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', tension: 0.4, fill: false, yAxisID: 'y1' }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top', labels: { color: colors.text } } },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: colors.textSecondary, callback: value => 'R$ ' + value.toLocaleString('pt-BR') },
                            grid: { color: colors.grid }
                        },
                        y1: {
                            position: 'right',
                            ticks: { color: colors.textSecondary, callback: value => value + '%' },
                            grid: { display: false }
                        },
                        x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                    }
                }
            });
        } else {
            this.charts.invest.data.labels = labels;
            this.charts.invest.data.datasets[0].data = investedData;
            this.charts.invest.data.datasets[1].data = currentData;
            this.charts.invest.data.datasets[2].data = projectionData;
            this.charts.invest.data.datasets[3].data = profitPctData;
            this.charts.invest.update();
        }

        const summaryEl = document.getElementById('investSummary');
        if (summaryEl) {
            let totalInitial = 0, totalCurrent = 0;
            this.investments.forEach(inv => {
                totalInitial += inv.initial;
                totalCurrent += inv.current;
            });
            const totalProfit = totalCurrent - totalInitial;
            const totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0;
            
            summaryEl.innerHTML = '<div class="investment-summary"><h3> Resumo</h3><div class="investment-summary-grid">' +
                '<div class="investment-summary-item"><div class="investment-summary-label">Total Investido</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div>' +
                '<div class="investment-summary-item"><div class="investment-summary-label">Valor Atual</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div>' +
                '<div class="investment-summary-item"><div class="investment-summary-label">Rendimento</div><div class="investment-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div>' +
                '</div></div>';
        }
    }

    saveInvestment() {
        const id = document.getElementById('investmentEditId').value;
        const name = document.getElementById('investmentName').value.trim();
        const type = document.getElementById('investmentType').value;
        const initial = parseFloat(document.getElementById('investmentInitial').value) || 0;
        const current = parseFloat(document.getElementById('investmentCurrent').value) || 0;
        const date = document.getElementById('investmentDate').value;
        const rate = parseFloat(document.getElementById('investmentRate').value) || 0;

        if (!name) { this.showToast('Informe o nome'); return; }

        if (id) {
            for (let i = 0; i < this.investments.length; i++) {
                if (this.investments[i].id === id) {
                    this.investments[i] = { id, name, type, initial, current, date, rate };
                    break;
                }
            }
        } else {
            this.investments.push({ id: 'inv_' + Date.now(), name, type, initial, current, date, rate });
        }

        this.saveInvestments();
        this.renderInvestmentsModal();
        this.updateInvestmentChart();
        closeNewInvestmentModal();
        this.showToast(id ? 'Aplicação atualizada!' : 'Aplicação cadastrada!');
    }

    deleteInvestment(id) {
        if (!confirm('Excluir esta aplicação?')) return;
        this.investments = this.investments.filter(i => i.id !== id);
        this.saveInvestments();
        this.renderInvestmentsModal();
        this.updateInvestmentChart();
        this.showToast('Aplicação excluída!');
    }

    editInvestment(id) {
        let inv = null;
        for (let i = 0; i < this.investments.length; i++) {
            if (this.investments[i].id === id) { 
                inv = this.investments[i]; 
                break; 
            }
        }
        if (!inv) return;
        
        document.getElementById('investmentEditId').value = inv.id;
        document.getElementById('investmentName').value = inv.name;
        document.getElementById('investmentType').value = inv.type;
        document.getElementById('investmentInitial').value = inv.initial;
        document.getElementById('investmentCurrent').value = inv.current;
        document.getElementById('investmentDate').value = inv.date;
        document.getElementById('investmentRate').value = inv.rate;
        document.getElementById('newInvestmentTitle').textContent = 'Editar Aplicação';
        document.getElementById('newInvestmentModal').classList.add('active');
    }

    openUpdateInvestment(id) {
        let inv = null;
        for (let i = 0; i < this.investments.length; i++) {
            if (this.investments[i].id === id) { 
                inv = this.investments[i]; 
                break; 
            }
        }
        if (!inv) return;
        
        document.getElementById('updateInvestmentId').value = inv.id;
        document.getElementById('updateInvestmentName').textContent = inv.name;
        document.getElementById('updateInvestmentValue').value = inv.current;
        document.getElementById('updateInvestmentDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('updateInvestmentModal').classList.add('active');
    }

    updateInvestmentValue() {
        const id = document.getElementById('updateInvestmentId').value;
        const newValue = parseFloat(document.getElementById('updateInvestmentValue').value) || 0;

        for (let i = 0; i < this.investments.length; i++) {
            if (this.investments[i].id === id) {
                this.investments[i].current = newValue;
                break;
            }
        }

        this.saveInvestments();
        this.renderInvestmentsModal();
        this.updateInvestmentChart();
        closeUpdateInvestmentModal();
        this.showToast('Valor atualizado!');
    }

    renderInvestmentsModal() {
        const container = document.getElementById('investmentsContent');
        if (!container) return;
        
        const self = this;
        const typeLabels = { 
            cdb: 'CDB', 
            tesouro: 'Tesouro Direto', 
            lci: 'LCI/LCA', 
            fundo: 'Fundo', 
            acao: 'Ações', 
            fiis: 'FIIs', 
            poupanca: 'Poupança', 
            outro: 'Outro' 
        };

        if (!this.investments.length) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">📈</div><h3>Nenhuma aplicação cadastrada</h3><p>Clique em "Nova Aplicação" para começar</p></div>';
            return;
        }

        let totalInitial = 0, totalCurrent = 0;
        let html = '<div>';
        
        this.investments.forEach(inv => {
            const profit = inv.current - inv.initial;
            const profitPct = inv.initial > 0 ? (profit / inv.initial * 100) : 0;
            totalInitial += inv.initial;
            totalCurrent += inv.current;

            html += '<div class="investment-card">';
            html += '<div class="investment-card-header">';
            html += '<div><div class="investment-card-title">' + self.escapeHtml(inv.name) + '</div>';
            html += '<div class="investment-card-type">' + (typeLabels[inv.type] || inv.type) + ' • Aplicado em ' + self.formatDate(inv.date) + '</div></div>';
            html += '<div class="investment-card-actions">';
            html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.openUpdateInvestment(\'' + inv.id + '\')">💰 Atualizar</button>';
            html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.editInvestment(\'' + inv.id + '\')">✏️</button>';
            html += '<button class="btn btn-danger btn-small" onclick="smartwallet.deleteInvestment(\'' + inv.id + '\')">🗑️</button>';
            html += '</div></div>';
            html += '<div class="investment-card-values">';
            html += '<div class="investment-value-item"><div class="investment-value-label">Valor Inicial</div><div class="investment-value-amount privacy-value">' + self.formatCurrency(inv.initial) + '</div></div>';
            html += '<div class="investment-value-item"><div class="investment-value-label">Valor Atual</div><div class="investment-value-amount privacy-value">' + self.formatCurrency(inv.current) + '</div></div>';
            html += '<div class="investment-value-item"><div class="investment-value-label">Rendimento</div><div class="investment-value-amount privacy-value ' + (profit >= 0 ? 'positive' : 'negative') + '">' + profitPct.toFixed(2) + '% (' + self.formatCurrency(profit) + ')</div></div>';
            html += '</div>';
            if (inv.rate > 0) html += '<div style="font-size:0.85rem; color:var(--text-secondary);" class="privacy-value">Taxa: ' + inv.rate + '% ao ano</div>';
            html += '</div>';
        });
        html += '</div>';

        const totalProfit = totalCurrent - totalInitial;
        const totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0;

        html += '<div class="investment-summary">';
        html += '<h3>📊 Resumo Geral</h3>';
        html += '<div class="investment-summary-grid">';
        html += '<div class="investment-summary-item"><div class="investment-summary-label">Total Investido</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div>';
        html += '<div class="investment-summary-item"><div class="investment-summary-label">Valor Atual</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div>';
        html += '<div class="investment-summary-item"><div class="investment-summary-label">Rendimento Total</div><div class="investment-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div>';
        html += '</div></div>';

        container.innerHTML = html;
    }

    printManual() {
        const printWindow = window.open('', '_blank');
        if (!printWindow) { 
            alert('Permita popups para imprimir'); 
            return; 
        }
        
        printWindow.document.write('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Manual - Smart Wallet</title><style>');
        printWindow.document.write('@page { size: A4; margin: 2cm; }');
        printWindow.document.write('body { font-family: Georgia, serif; color: #1e293b; line-height: 1.6; font-size: 11pt; padding: 20px; }');
        printWindow.document.write('.manual-cover { text-align: center; padding: 60px 30px; border: 3px solid #6366f1; border-radius: 16px; margin-bottom: 40px; page-break-after: always; }');
        printWindow.document.write('.manual-cover h1 { color: #6366f1; font-size: 32pt; margin-bottom: 16px; }');
        printWindow.document.write('.manual-cover h2 { color: #06b6d4; font-size: 20pt; margin-bottom: 20px; }');
        printWindow.document.write('h2 { color: #6366f1; font-size: 16pt; margin-top: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 8px; page-break-after: avoid; }');
        printWindow.document.write('h3 { color: #06b6d4; font-size: 13pt; margin-top: 20px; page-break-after: avoid; }');
        printWindow.document.write('p { margin-bottom: 12px; text-align: justify; }');
        printWindow.document.write('ul, ol { margin-left: 24px; margin-bottom: 16px; }');
        printWindow.document.write('li { margin-bottom: 8px; }');
        printWindow.document.write('.manual-quote { margin: 24px 0; padding: 20px 30px; border-left: 4px solid #6366f1; background: #f8fafc; border-radius: 8px; font-style: italic; page-break-inside: avoid; }');
        printWindow.document.write('.manual-quote .quote-author { font-size: 9pt; font-weight: 600; color: #6366f1; text-align: right; margin-top: 12px; font-style: normal; }');
        printWindow.document.write('.dedication { margin-top: 30px; padding-top: 20px; border-top: 2px solid #6366f1; page-break-inside: avoid; }');
        printWindow.document.write('.manual-tip { background: rgba(99,102,241,0.1); border-left: 4px solid #6366f1; padding: 16px; margin: 16px 0; border-radius: 8px; page-break-inside: avoid; }');
        printWindow.document.write('.manual-warning { background: rgba(245,158,11,0.1); border-left: 4px solid #f59e0b; padding: 16px; margin: 16px 0; border-radius: 8px; page-break-inside: avoid; }');
        printWindow.document.write('.manual-success { background: rgba(16,185,129,0.1); border-left: 4px solid #10b981; padding: 16px; margin: 16px 0; border-radius: 8px; page-break-inside: avoid; }');
        printWindow.document.write('.manual-blessing { text-align: center; margin-top: 40px; padding: 30px; background: #f8fafc; border-radius: 16px; page-break-inside: avoid; }');
        printWindow.document.write('.disclaimer-print { margin-top: 60px; padding-top: 30px; border-top: 2px solid #6366f1; page-break-inside: avoid; font-size: 9pt; color: #64748b; }');
        printWindow.document.write('.disclaimer-print h4 { color: #f59e0b; font-size: 11pt; margin-bottom: 12px; }');
        printWindow.document.write('.disclaimer-print p { margin-bottom: 8px; font-size: 9pt; }');
        printWindow.document.write('strong { color: #1e293b; }');
        printWindow.document.write('</style></head><body>');
        printWindow.document.write(manualHTML);
        printWindow.document.write('<div class="disclaimer-print">');
        printWindow.document.write('<h4>⚠️ Termos de Uso</h4>');
        printWindow.document.write('<p><strong>Sobre:</strong> Ferramenta de controle financeiro pessoal.</p>');
        printWindow.document.write('<p><strong>Privacidade:</strong> 100% Offline. Dados locais.</p>');
        printWindow.document.write('<p><strong>Limitações:</strong> Não substitui consultoria profissional.</p>');
        printWindow.document.write('<p><small>Ao utilizar, você concorda com estes termos.</small></p>');
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 500);
    }
}

// ===== INSTÂNCIA GLOBAL =====
const smartwallet = new SmartWallet();
window.smartwallet = smartwallet;

// ===== INICIALIZAÇÃO =====
function updatePrintDate() {
    const dateEl = document.getElementById('printDate');
    if (dateEl) dateEl.textContent = 'Gerado em: ' + new Date().toLocaleString('pt-BR');
}

window.addEventListener('load', () => {
    updatePrintDate();
    
    const accepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
    const splash = document.getElementById('splashScreen');
    const disclaimer = document.getElementById('disclaimerModal');

    if (splash) {
        splash.style.display = 'flex';
        splash.classList.remove('fade-out');
    }

    setTimeout(() => {
        if (!accepted && disclaimer) {
            disclaimer.style.display = 'flex';
            disclaimer.classList.add('active');
            initDisclaimer();
        } else {
            setTimeout(() => {
                if (splash) {
                    splash.classList.add('fade-out');
                    setTimeout(() => {
                        splash.style.display = 'none';
                        showQuoteModal();
                    }, 800);
                }
            }, 3000);
        }
    }, 3500);
});

function initDisclaimer() {
    let countdown = 12;
    const timerEl = document.getElementById('disclaimerTimer');
    const btnEl = document.getElementById('acceptDisclaimerBtn');
    
    if (!timerEl || !btnEl) return;

    btnEl.classList.remove('enabled');
    btnEl.disabled = true;
    timerEl.innerHTML = '⏱️ Aguarde <span id="countdown">' + countdown + '</span> segundos';

    const interval = setInterval(() => {
        countdown--;
        const span = document.getElementById('countdown');
        if (span) span.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(interval);
            btnEl.classList.add('enabled');
            btnEl.disabled = false;
            timerEl.innerHTML = '✅ Pode aceitar os termos';
        }
    }, 1000);
}

function showQuoteModal() {
    const quote = FINANCIAL_QUOTES[Math.floor(Math.random() * FINANCIAL_QUOTES.length)];
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteModal = document.getElementById('quoteModal');
    
    if (quoteText) quoteText.textContent = '"' + quote.text + '"';
    if (quoteAuthor) quoteAuthor.textContent = '— ' + quote.author;
    if (quoteModal) quoteModal.classList.add('active');
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('mainMenu');
    const info = document.getElementById('infoMenu');
    
    if (!e.target.closest('.menu-btn') && menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
    if (!e.target.closest('.info-btn') && info && info.classList.contains('active')) {
        info.classList.remove('active');
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('✅ SW registrado:', reg.scope))
            .catch(err => console.log('❌ SW falhou:', err));
    });
}

console.log('🎉 Smart Wallet v3.0.0 carregado com sucesso!');
