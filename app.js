(function() {
    'use strict';

    console.log('Smart Wallet iniciando...');

    const financialQuotes = [
        { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
        { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
        { text: "Um orçamento está dizendo a seu dinheiro para onde ir.", author: "Dave Ramsey" },
        { text: "Não economize o que resta depois de gastar; gaste o que resta depois de poupar.", author: "Warren Buffett" },
        { text: "O melhor investimento que você pode fazer é em si mesmo.", author: "Warren Buffett" },
        { text: "Dinheiro é um péssimo mestre, mas um excelente servo.", author: "P.T. Barnum" },
        { text: "Cuidado com pequenos gastos; um pequeno vazamento afundará um grande navio.", author: "Benjamin Franklin" },
        { text: "Pague a si mesmo primeiro.", author: "George Samuel Clason" },
        { text: "A melhor hora para plantar uma árvore foi há 20 anos. A segunda melhor hora é agora.", author: "Provérbio Chinês" },
        { text: "Finanças não são sobre matemática, são sobre comportamento.", author: "Morgan Housel" }
    ];

    const PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

    const DEFAULT_CATEGORIES = [
        { id: 'moradia', name: 'Moradia', color: '#ffff00', type: 'expense' },
        { id: 'alimentacao', name: 'Alimentação', color: '#e37171', type: 'expense' },
        { id: 'transporte', name: 'Transporte', color: '#21fffb', type: 'expense' },
        { id: 'saude', name: 'Saúde', color: '#ff9c38', type: 'expense' },
        { id: 'educacao', name: 'Educação', color: '#0000ff', type: 'expense' },
        { id: 'lazer', name: 'Lazer', color: '#ff00ff', type: 'expense' },
        { id: 'investimento', name: 'Investimento', color: '#e6dcb1', type: 'expense' },
        { id: 'salario', name: 'Salário', color: '#475569', type: 'income' },
        { id: 'freelancer', name: 'Freelancer', color: '#b3e6e0', type: 'income' }
    ];

    const manualHTML = '<div style="text-align:center;padding:40px 20px;border:3px solid #6366f1;border-radius:16px;margin-bottom:30px;"><h1 style="color:#6366f1;">Manual do Usuário</h1><h2>Smart Wallet</h2><p>Controle Financeiro Pessoal Inteligente</p><p>Versão 2.0 - 2026</p><p style="margin-top:20px;">Idealizado por RogerElizar™</p></div><h2>Bem-vindo!</h2><p>O Smart Wallet é seu parceiro na jornada para transformar sua relação com o dinheiro.</p><h2>Instalação como WebApp</h2><h3>No Computador</h3><ol><li>Acesse o site pelo navegador</li><li>Clique no menu (⋮) → "Instalar Smart Wallet..."</li><li>Confirme a instalação</li></ol><h3>No Celular Android</h3><ol><li>Abra o site no Chrome</li><li>Toque nos três pontos (⋮) → "Instalar aplicativo"</li></ol><h3>No iPhone</h3><ol><li>Abra o site no Safari</li><li>Toque em Compartilhar → "Adicionar à Tela de Início"</li></ol><h2>Funcionalidades</h2><ul><li>Contas Correntes e Investimentos</li><li>Cartões de Crédito com faturas</li><li>Acompanhamento de Aplicações</li><li>Alertas de Contas a Vencer</li><li>Gráficos e Relatórios</li><li>Backup e Restauração</li></ul><h2>Regra 50-30-20</h2><ul><li>50% para necessidades</li><li>30% para desejos</li><li>20% para objetivos financeiros</li></ul><div style="text-align:center;margin-top:30px;padding:20px;background:#f8fafc;border-radius:16px;"><h3>Bênção Final</h3><p style="font-style:italic;">Que Deus abençoe sua jornada financeira.</p><p>— RogerElizar™</p></div>';

    class SmartWallet {
        constructor() {
            this.transactions = this.load('smartwallet_transactions', []);
            this.categories = this.load('smartwallet_categories', DEFAULT_CATEGORIES);
            this.cards = this.load('smartwallet_cards', []);
            this.cardPurchases = this.load('smartwallet_card_purchases', []);
            this.accounts = this.load('smartwallet_accounts', []);
            this.investments = this.load('smartwallet_investments', []);
            this.currentMonth = new Date();
            this.currentMonth.setDate(1);
            this.currentTransactionType = 'expense';
            this.currentEditId = null;
            this.privacyOn = localStorage.getItem('smartwallet_privacy') === 'true';
            this.darkMode = localStorage.getItem('smartwallet_dark') !== 'false';
            this.charts = {};
            this.init();
        }

        load(key, def) {
            try {
                const v = localStorage.getItem(key);
                if (!v) return def;
                return JSON.parse(v);
            } catch (e) {
                return def;
            }
        }

        save(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (e) {
                if (e.name === 'QuotaExceededError') this.toast('⚠️ Armazenamento cheio!');
            }
        }

        init() {
            this.applyTheme();
            this.applyPrivacy();
            this.setupEvents();
            this.setDefaultDate();
            this.updateMonth();
            this.populateSelects();
            this.render();
            this.initCharts();
            this.updateAlertBadge();
        }

        setupEvents() {
            const form = document.getElementById('transactionForm');
            if (form) form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTransaction();
            });

            const editForm = document.getElementById('editForm');
            if (editForm) editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateTransaction();
            });

            const search = document.getElementById('searchFilter');
            if (search) search.addEventListener('input', () => this.render());

            ['typeFilter', 'categoryFilter', 'statusFilter', 'accountFilter'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('change', () => this.render());
            });
        }

        setDefaultDate() {
            const el = document.getElementById('date');
            if (el) el.value = new Date().toISOString().split('T')[0];
        }

        updateMonth() {
            const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            const el = document.getElementById('currentMonth');
            if (el) el.textContent = months[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
        }

        changeMonth(delta) {
            this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
            this.updateMonth();
            this.render();
            this.updateCharts();
        }

        getMonthTransactions() {
            const m = this.currentMonth.getMonth();
            const y = this.currentMonth.getFullYear();
            return this.transactions.filter(t => {
                const d = new Date(t.date + 'T00:00:00');
                return d.getMonth() === m && d.getFullYear() === y;
            });
        }

        populateSelects() {
            const catSel = document.getElementById('category');
            if (catSel) {
                catSel.innerHTML = '<option value="">Selecione...</option>';
                this.categories.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    opt.textContent = c.name;
                    catSel.appendChild(opt);
                });
            }

            const catFilter = document.getElementById('categoryFilter');
            if (catFilter) {
                catFilter.innerHTML = '<option value="">Todas as categorias</option>';
                this.categories.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    opt.textContent = c.name;
                    catFilter.appendChild(opt);
                });
            }

            const paySel = document.getElementById('paymentMethod');
            if (paySel) {
                paySel.innerHTML = '<option value="">Selecione...</option>';
                PAYMENT_METHODS.forEach(pm => {
                    const opt = document.createElement('option');
                    opt.value = pm.id;
                    opt.textContent = pm.icon + ' ' + pm.name;
                    paySel.appendChild(opt);
                });
            }

            const accSel = document.getElementById('transactionAccount');
            if (accSel) {
                accSel.innerHTML = '<option value="">Selecione a conta...</option>';
                this.accounts.forEach(a => {
                    const opt = document.createElement('option');
                    opt.value = a.id;
                    opt.textContent = (a.type === 'checking' ? '💳 ' : '📈 ') + a.name;
                    accSel.appendChild(opt);
                });
            }

            const accFilter = document.getElementById('accountFilter');
            if (accFilter) {
                accFilter.innerHTML = '<option value="">Todas as contas</option>';
                this.accounts.forEach(a => {
                    const opt = document.createElement('option');
                    opt.value = a.id;
                    opt.textContent = a.name;
                    accFilter.appendChild(opt);
                });
            }
        }

        addTransaction() {
            const date = document.getElementById('date').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const accountId = document.getElementById('transactionAccount').value;

            if (!category || !paymentMethod) {
                this.toast('Preencha todos os campos');
                return;
            }

            const t = {
                id: Date.now(),
                date: date,
                amount: this.currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount),
                category: category,
                description: description,
                paymentMethod: paymentMethod,
                accountId: accountId,
                statusOk: document.getElementById('statusOk').checked
            };

            this.transactions.push(t);
            this.save('smartwallet_transactions', this.transactions);
            this.render();
            this.toast('Transação adicionada!');
            document.getElementById('transactionForm').reset();
            this.setDefaultDate();
            document.getElementById('newTransactionModal').classList.remove('active');
        }

        editTransaction(id) {
            const t = this.transactions.find(x => x.id === id);
            if (!t) return;
            this.currentEditId = id;
            document.getElementById('editId').value = t.id;
            document.getElementById('editDate').value = t.date;
            document.getElementById('editAmount').value = Math.abs(t.amount);
            document.getElementById('editCategory').value = t.category || '';
            document.getElementById('editDescription').value = t.description || '';
            document.getElementById('editStatusOk').checked = !!t.statusOk;
            document.getElementById('editModal').classList.add('active');
        }

        updateTransaction() {
            const id = parseInt(document.getElementById('editId').value);
            const idx = this.transactions.findIndex(t => t.id === id);
            if (idx === -1) return;

            this.transactions[idx] = {
                ...this.transactions[idx],
                date: document.getElementById('editDate').value,
                amount: parseFloat(document.getElementById('editAmount').value),
                category: document.getElementById('editCategory').value,
                description: document.getElementById('editDescription').value,
                statusOk: document.getElementById('editStatusOk').checked
            };

            this.save('smartwallet_transactions', this.transactions);
            this.render();
            this.toast('Atualizada!');
            document.getElementById('editModal').classList.remove('active');
        }

        deleteTransaction() {
            if (!this.currentEditId) return;
            if (!confirm('Excluir esta transação?')) return;
            this.transactions = this.transactions.filter(t => t.id !== this.currentEditId);
            this.save('smartwallet_transactions', this.transactions);
            this.render();
            this.toast('Excluída!');
            document.getElementById('editModal').classList.remove('active');
        }

        getFiltered() {
            const search = (document.getElementById('searchFilter').value || '').toLowerCase();
            const catF = document.getElementById('categoryFilter').value;
            const accF = document.getElementById('accountFilter').value;

            return this.getMonthTransactions().filter(t => {
                const cat = this.getCategoryById(t.category);
                const ok1 = !search || (t.description || '').toLowerCase().includes(search) || cat.name.toLowerCase().includes(search);
                const ok2 = !catF || t.category === catF;
                const ok3 = !accF || t.accountId === accF;
                return ok1 && ok2 && ok3;
            });
        }

        getCategoryById(id) {
            return this.categories.find(c => c.id === id) || { name: 'Sem categoria', color: '#6b7280' };
        }

        formatCurrency(v) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
        }

        formatDate(d) {
            return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
        }

        escapeHtml(t) {
            const d = document.createElement('div');
            d.textContent = t || '';
            return d.innerHTML;
        }

        render() {
            this.updateDashboard();
            const tbody = document.getElementById('transactionsTable');
            const empty = document.getElementById('emptyState');
            if (!tbody) return;

            const filtered = this.getFiltered();
            if (!filtered.length) {
                tbody.innerHTML = '';
                if (empty) empty.style.display = 'block';
                return;
            }
            if (empty) empty.style.display = 'none';

            const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            tbody.innerHTML = sorted.map(t => {
                const c = this.getCategoryById(t.category);
                const acc = this.accounts.find(a => a.id === t.accountId);
                const cls = t.amount >= 0 ? 'positive' : 'negative';
                return '<tr class="transaction-row" onclick="smartwallet.editTransaction(' + t.id + ')">' +
                    '<td data-label="Data">' + this.formatDate(t.date) + '</td>' +
                    '<td data-label="Descrição">' + this.escapeHtml(t.description) + '</td>' +
                    '<td data-label="Categoria"><span class="category-badge" style="background:' + c.color + '">' + this.escapeHtml(c.name) + '</span></td>' +
                    '<td data-label="Conta">' + (acc ? '<span class="account-badge">' + this.escapeHtml(acc.name) + '</span>' : '-') + '</td>' +
                    '<td data-label="Pagamento">' + (t.paymentMethod || '-') + '</td>' +
                    '<td data-label="Status">' + (t.statusOk ? '✓ Concluído' : '⏳ Pendente') + '</td>' +
                    '<td data-label="Valor" class="amount ' + cls + ' privacy-value">' + this.formatCurrency(t.amount) + '</td>' +
                    '<td data-label="Saldo" class="balance privacy-value">-</td>' +
                    '</tr>';
            }).join('');
        }

        updateDashboard() {
            const mt = this.getMonthTransactions();
            const inc = mt.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
            const exp = mt.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);

            const unified = this.accounts.filter(a => a.type === 'checking').reduce((s, a) => s + (parseFloat(a.balance) || 0), 0);

            const balEl = document.getElementById('totalBalance');
            if (balEl) {
                balEl.textContent = this.formatCurrency(unified);
                balEl.className = 'card-value privacy-value ' + (unified >= 0 ? 'positive' : 'negative');
            }

            const incEl = document.getElementById('totalIncome');
            if (incEl) incEl.textContent = this.formatCurrency(inc);

            const expEl = document.getElementById('totalExpenses');
            if (expEl) expEl.textContent = this.formatCurrency(Math.abs(exp));
        }

        applyTheme() {
            document.body.classList.toggle('light', !this.darkMode);
            const btn = document.getElementById('themeBtn');
            if (btn) {
                btn.innerHTML = this.darkMode
                    ? '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg>'
                    : '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
            }
        }

        applyPrivacy() {
            document.body.classList.toggle('privacy-on', this.privacyOn);
        }

        toast(msg) {
            const t = document.getElementById('toast');
            if (!t) return;
            t.textContent = msg;
            t.classList.add('active');
            clearTimeout(this.toastT);
            this.toastT = setTimeout(() => t.classList.remove('active'), 3000);
        }

        initCharts() {
            if (typeof Chart === 'undefined') return;
            console.log('Charts inicializados');
        }

        updateCharts() {
            console.log('Charts atualizados');
        }

        updateAlertBadge() {
            const badge = document.getElementById('alertBadge');
            if (badge) badge.textContent = '0';
        }

        saveAccount() {
            const name = document.getElementById('accountName').value.trim();
            const type = document.getElementById('accountType').value;
            const balance = parseFloat(document.getElementById('accountBalance').value) || 0;
            const color = document.getElementById('accountColor').value;

            if (!name) return this.toast('Informe o nome');

            this.accounts.push({
                id: 'acc_' + Date.now(),
                name: name,
                type: type,
                balance: balance,
                color: color
            });

            this.save('smartwallet_accounts', this.accounts);
            this.populateSelects();
            this.render();
            this.toast('Conta cadastrada!');
            document.getElementById('newAccountModal').classList.remove('active');
        }

        saveInvestment() {
            const name = document.getElementById('investmentName').value.trim();
            const type = document.getElementById('investmentType').value;
            const initial = parseFloat(document.getElementById('investmentInitial').value) || 0;
            const current = parseFloat(document.getElementById('investmentCurrent').value) || 0;
            const date = document.getElementById('investmentDate').value;
            const rate = parseFloat(document.getElementById('investmentRate').value) || 0;

            if (!name) return this.toast('Informe o nome');

            this.investments.push({
                id: 'inv_' + Date.now(),
                name: name,
                type: type,
                initial: initial,
                current: current,
                date: date,
                rate: rate
            });

            this.save('smartwallet_investments', this.investments);
            this.toast('Aplicação cadastrada!');
            document.getElementById('newInvestmentModal').classList.remove('active');
            this.renderInvestmentsModal();
        }

        renderInvestmentsModal() {
            const container = document.getElementById('investmentsContent');
            if (!container) return;

            if (!this.investments.length) {
                container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-secondary);"><div style="font-size:3rem;margin-bottom:12px;">📈</div><h3>Nenhuma aplicação</h3><p>Clique em "Nova Aplicação"</p></div>';
                return;
            }

            let totalInit = 0, totalCurr = 0;
            container.innerHTML = this.investments.map(inv => {
                const profit = inv.current - inv.initial;
                const pct = inv.initial > 0 ? (profit / inv.initial * 100) : 0;
                totalInit += inv.initial;
                totalCurr += inv.current;
                return '<div class="investment-card">' +
                    '<div class="investment-card-header"><div><div class="investment-card-title">' + this.escapeHtml(inv.name) + '</div><div class="investment-card-type">' + inv.type + '</div></div></div>' +
                    '<div class="investment-card-values">' +
                    '<div><div class="investment-value-label">Inicial</div><div class="investment-value-amount">' + this.formatCurrency(inv.initial) + '</div></div>' +
                    '<div><div class="investment-value-label">Atual</div><div class="investment-value-amount">' + this.formatCurrency(inv.current) + '</div></div>' +
                    '<div><div class="investment-value-label">Rendimento</div><div class="investment-value-amount ' + (profit >= 0 ? 'positive' : 'negative') + '">' + pct.toFixed(2) + '%</div></div>' +
                    '</div></div>';
            }).join('');

            const totalProfit = totalCurr - totalInit;
            const totalPct = totalInit > 0 ? (totalProfit / totalInit * 100) : 0;
            container.innerHTML += '<div style="background:var(--input-bg);border-radius:16px;padding:20px;margin-top:20px;"><h3>Resumo Geral</h3><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px;">' +
                '<div style="text-align:center;"><div>Total Investido</div><div style="font-size:1.3rem;font-weight:700;">' + this.formatCurrency(totalInit) + '</div></div>' +
                '<div style="text-align:center;"><div>Valor Atual</div><div style="font-size:1.3rem;font-weight:700;">' + this.formatCurrency(totalCurr) + '</div></div>' +
                '<div style="text-align:center;"><div>Rendimento</div><div style="font-size:1.3rem;font-weight:700;color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalPct.toFixed(2) + '%</div></div>' +
                '</div></div>';
        }

        printManual() {
            const w = window.open('', '_blank');
            w.document.write('<!DOCTYPE html><html><head><title>Manual</title><style>@page{size:A4;margin:2cm;}body{font-family:Arial;padding:40px;color:#1e293b;max-width:800px;margin:0 auto;}.header{border-bottom:3px solid #6366f1;padding-bottom:20px;margin-bottom:30px;text-align:center;}.header h1{color:#6366f1;}h2{color:#6366f1;margin-top:30px;border-bottom:2px solid #6366f1;padding-bottom:10px;}h3{color:#06b6d4;margin-top:20px;}.manual-quote{margin:24px 0;padding:20px 30px;border-left:4px solid #6366f1;background:#f8fafc;border-radius:8px;font-style:italic;}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #6366f1;font-size:0.85rem;color:#64748b;text-align:center;}</style></head><body><div class="header"><h1>📘 Manual do Usuário</h1><div>Smart Wallet - Controle Financeiro Pessoal</div><div>Versão 2.0 - 2026</div></div>' + manualHTML + '<div class="footer">Smart Wallet • Idealizado por RogerElizar™</div></body></html>');
            w.document.close();
            setTimeout(() => w.print(), 500);
        }

        printPDF() {
            const filtered = this.getFiltered();
            const w = window.open('', '_blank');
            const month = document.getElementById('currentMonth').textContent;

            let rows = filtered.sort((a, b) => new Date(a.date) - new Date(b.date)).map(t => {
                const cat = this.getCategoryById(t.category);
                const acc = this.accounts.find(a => a.id === t.accountId);
                return '<tr><td>' + this.formatDate(t.date) + '</td><td>' + this.escapeHtml(t.description) + '</td><td>' + this.escapeHtml(cat.name) + '</td><td>' + (acc ? this.escapeHtml(acc.name) : '-') + '</td><td>' + (t.paymentMethod || '-') + '</td><td style="text-align:right;color:' + (t.amount >= 0 ? '#10b981' : '#ef4444') + ';font-weight:600;">' + this.formatCurrency(t.amount) + '</td></tr>';
            }).join('');

            const total = filtered.reduce((s, t) => s + t.amount, 0);

            w.document.write('<!DOCTYPE html><html><head><title>Extrato</title><style>body{font-family:Arial;padding:40px;color:#1e293b;max-width:900px;margin:0 auto;}.header{border-bottom:3px solid #6366f1;padding-bottom:20px;margin-bottom:30px;}.header h1{color:#6366f1;}table{width:100%;border-collapse:collapse;margin-bottom:30px;}th,td{padding:10px;text-align:left;border-bottom:1px solid #e5e7eb;font-size:0.9rem;}th{background:#f1f5f9;font-weight:600;}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #6366f1;font-size:0.85rem;color:#64748b;text-align:center;}</style></head><body><div class="header"><h1>Smart Wallet - Extrato</h1><div>Período: ' + month + '</div></div><table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Pagamento</th><th>Valor</th></tr></thead><tbody>' + rows + '</tbody></table><div style="text-align:right;font-size:1.2rem;font-weight:700;">Total: ' + this.formatCurrency(total) + '</div><div class="footer">Smart Wallet • Gerado em ' + new Date().toLocaleString('pt-BR') + '<br>Idealizado por RogerElizar™</div></body></html>');
            w.document.close();
            setTimeout(() => w.print(), 500);
        }
    }

    const smartwallet = new SmartWallet();
    window.smartwallet = smartwallet;

    window.selectTransactionType = function(t) {
        smartwallet.currentTransactionType = t;
    };

    window.openNewTransactionModal = function() {
        document.getElementById('newTransactionModal').classList.add('active');
    };

    window.closeNewTransactionModal = function() {
        document.getElementById('newTransactionModal').classList.remove('active');
    };

    window.closeEditModal = function() {
        document.getElementById('editModal').classList.remove('active');
    };

    window.togglePrivacy = function() {
        smartwallet.privacyOn = !smartwallet.privacyOn;
        localStorage.setItem('smartwallet_privacy', smartwallet.privacyOn);
        smartwallet.applyPrivacy();
    };

    window.toggleTheme = function() {
        smartwallet.darkMode = !smartwallet.darkMode;
        localStorage.setItem('smartwallet_dark', smartwallet.darkMode);
        smartwallet.applyTheme();
    };

    window.toggleMenu = function(e) {
        e.stopPropagation();
        document.getElementById('mainMenu').classList.toggle('active');
    };

    window.toggleInfoMenu = function(e) {
        e.stopPropagation();
        document.getElementById('infoMenu').classList.toggle('active');
    };

    window.openManualModal = function() {
        document.getElementById('manualContent').innerHTML = manualHTML;
        document.getElementById('manualModal').classList.add('active');
        document.getElementById('infoMenu').classList.remove('active');
    };

    window.closeManualModal = function() {
        document.getElementById('manualModal').classList.remove('active');
    };

    window.printManual = function() {
        smartwallet.printManual();
    };

    window.openTermsModal = function() {
        document.getElementById('disclaimerModal').style.display = 'flex';
        document.getElementById('disclaimerModal').classList.add('active');
        initDisclaimer();
        document.getElementById('infoMenu').classList.remove('active');
    };

    window.openThanksModal = function() {
        document.getElementById('thanksModal').classList.add('active');
        document.getElementById('infoMenu').classList.remove('active');
    };

    window.closeThanksModal = function() {
        document.getElementById('thanksModal').classList.remove('active');
    };

    window.copyPixKey = function() {
        const key = document.getElementById('pixKey').textContent;
        navigator.clipboard.writeText(key).then(() => {
            smartwallet.toast('✅ Chave PIX copiada!');
        });
    };

    window.openInvestmentsModal = function() {
        smartwallet.renderInvestmentsModal();
        document.getElementById('investmentsModal').classList.add('active');
        document.getElementById('infoMenu').classList.remove('active');
    };

    window.closeInvestmentsModal = function() {
        document.getElementById('investmentsModal').classList.remove('active');
    };

    window.openNewInvestmentModal = function() {
        document.getElementById('investmentForm').reset();
        document.getElementById('investmentDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('newInvestmentModal').classList.add('active');
    };

    window.closeNewInvestmentModal = function() {
        document.getElementById('newInvestmentModal').classList.remove('active');
    };

    window.openAccountsModal = function() {
        document.getElementById('accountsModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeAccountsModal = function() {
        document.getElementById('accountsModal').classList.remove('active');
    };

    window.openNewAccountModal = function() {
        document.getElementById('accountForm').reset();
        document.getElementById('newAccountModal').classList.add('active');
    };

    window.closeNewAccountModal = function() {
        document.getElementById('newAccountModal').classList.remove('active');
    };

    window.openExportModal = function() {
        document.getElementById('exportModal').classList.add('active');
    };

    window.closeExportModal = function() {
        document.getElementById('exportModal').classList.remove('active');
    };

    window.openGoalModal = function() {
        document.getElementById('goalModal').classList.add('active');
    };

    window.closeGoalModal = function() {
        document.getElementById('goalModal').classList.remove('active');
    };

    window.openCreditCardsModal = function() {
        document.getElementById('creditCardsModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeCreditCardsModal = function() {
        document.getElementById('creditCardsModal').classList.remove('active');
    };

    window.openNewCardModal = function() {
        document.getElementById('newCardModal').classList.add('active');
    };

    window.closeNewCardModal = function() {
        document.getElementById('newCardModal').classList.remove('active');
    };

    window.openBillsModal = function() {
        document.getElementById('billsModal').classList.add('active');
    };

    window.closeBillsModal = function() {
        document.getElementById('billsModal').classList.remove('active');
    };

    window.openImportCsvModal = function() {
        document.getElementById('importCsvModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeImportCsvModal = function() {
        document.getElementById('importCsvModal').classList.remove('active');
    };

    window.openImportBackupModal = function() {
        document.getElementById('importBackupModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeImportBackupModal = function() {
        document.getElementById('importBackupModal').classList.remove('active');
    };

    window.openClearDataModal = function() {
        document.getElementById('clearDataModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeClearDataModal = function() {
        document.getElementById('clearDataModal').classList.remove('active');
    };

    window.showClearStep2 = function() {
        document.getElementById('clearStep1').style.display = 'none';
        document.getElementById('clearStep2').style.display = 'block';
    };

    window.checkClearConfirm = function() {
        const input = document.getElementById('clearConfirmInput');
        const btn = document.getElementById('finalClearBtn');
        if (input.value.trim().toUpperCase() === 'LIMPAR') {
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    };

    function initDisclaimer() {
        let countdown = 12;
        const timerEl = document.getElementById('disclaimerTimer');
        const btnEl = document.getElementById('acceptDisclaimerBtn');
        if (!timerEl || !btnEl) return;

        btnEl.classList.remove('enabled');
        timerEl.innerHTML = '⏱️ Aguarde <span id="countdown">' + countdown + '</span> segundos';

        const interval = setInterval(function() {
            countdown--;
            const span = document.getElementById('countdown');
            if (span) span.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                btnEl.classList.add('enabled');
                timerEl.innerHTML = '✅ Você já pode aceitar os termos';
            }
        }, 1000);
    }

    window.acceptDisclaimer = function() {
        const btn = document.getElementById('acceptDisclaimerBtn');
        if (!btn || !btn.classList.contains('enabled')) return;

        localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
        const disclaimer = document.getElementById('disclaimerModal');
        disclaimer.classList.add('disintegrating');

        setTimeout(function() {
            disclaimer.style.display = 'none';
            disclaimer.classList.remove('active', 'disintegrating');

            setTimeout(function() {
                const splash = document.getElementById('splashScreen');
                if (splash) {
                    splash.classList.add('fade-out');
                    setTimeout(function() {
                        splash.style.display = 'none';
                        showQuote();
                    }, 800);
                }
            }, 3000);
        }, 600);
    };

    function showQuote() {
        const quote = financialQuotes[Math.floor(Math.random() * financialQuotes.length)];
        document.getElementById('quoteText').textContent = '"' + quote.text + '"';
        document.getElementById('quoteAuthor').textContent = '— ' + quote.author;
        document.getElementById('quoteModal').classList.add('active');
    }

    window.startApp = function() {
        document.getElementById('quoteModal').classList.remove('active');
        document.getElementById('mainApp').style.display = 'block';
        document.getElementById('fabBtn').style.display = 'flex';
    };

    window.addEventListener('load', function() {
        const accepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
        const splash = document.getElementById('splashScreen');
        const disclaimer = document.getElementById('disclaimerModal');

        if (splash) {
            splash.style.display = 'flex';
            splash.classList.remove('fade-out');
        }

        setTimeout(function() {
            if (!accepted && disclaimer) {
                disclaimer.style.display = 'flex';
                disclaimer.classList.add('active');
                initDisclaimer();
            } else {
                setTimeout(function() {
                    if (splash) {
                        splash.classList.add('fade-out');
                        setTimeout(function() {
                            splash.style.display = 'none';
                            showQuote();
                        }, 800);
                    }
                }, 3000);
            }
        }, 3500);
    });

    document.addEventListener('click', function(e) {
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
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('✅ SW:', reg.scope))
                .catch(err => console.log('❌ SW:', err));
        });
    }

    console.log('✅ Smart Wallet pronto!');
})();
