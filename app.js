(function() {
    'use strict';

    // ===== CITAÇÕES FINANCEIRAS =====
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
        { text: "Finanças não são sobre matemática, são sobre comportamento.", author: "Morgan Housel" },
        { text: "Gastar dinheiro para impressionar pessoas é a maneira mais rápida de ficar pobre.", author: "Morgan Housel" },
        { text: "Cada real que você economiza é um empregado que trabalha para você.", author: "T. Harv Eker" },
        { text: "A liberdade financeira é mais sobre controle do que sobre dinheiro.", author: "Ramit Sethi" },
        { text: "O maior inimigo da riqueza é a expectativa de ficar rico rápido.", author: "Morgan Housel" },
        { text: "A paciência é a virtude dos investidores bem-sucedidos.", author: "Peter Lynch" },
        { text: "Investir em conhecimento paga os melhores juros.", author: "Benjamin Franklin" },
        { text: "A educação financeira é a base da liberdade financeira.", author: "Robert Kiyosaki" },
        { text: "O futuro pertence àqueles que se preparam hoje.", author: "Malcolm X" },
        { text: "Ricos adquirem ativos. Pobres adquirem passivos que acham serem ativos.", author: "Robert Kiyosaki" },
        { text: "A prosperidade depende mais da sua mentalidade do que da sua conta bancária.", author: "T. Harv Eker" }
    ];

    // ===== MÉTODOS DE PAGAMENTO =====
    const PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'scheduled', name: 'Agendamento', icon: '📅' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

    // ===== CATEGORIAS PADRÃO =====
    const DEFAULT_CATEGORIES = [
        { id: 'generosidade', name: 'Generosidade', color: '#007306', type: 'expense' },
        { id: 'despensa', name: 'Despensa', color: '#e37171', type: 'expense' },
        { id: 'transporte', name: 'Transporte', color: '#21fffb', type: 'expense' },
        { id: 'moradia', name: 'Moradia', color: '#ffff00', type: 'expense' },
        { id: 'saude', name: 'Saúde', color: '#ff9c38', type: 'expense' },
        { id: 'educacao', name: 'Educação', color: '#0000ff', type: 'expense' },
        { id: 'cuidados_pessoais', name: 'Cuidados Pessoais', color: '#701a1a', type: 'expense' },
        { id: 'docs_juridico', name: 'Docs&Juridico', color: '#404040', type: 'expense' },
        { id: 'inst_financeira', name: 'Inst. Financeira', color: '#574737', type: 'expense' },
        { id: 'lazer', name: 'Lazer', color: '#ff00ff', type: 'expense' },
        { id: 'servicos', name: 'Serviços', color: '#5117a3', type: 'expense' },
        { id: 'pets', name: 'Pets', color: '#1349a8', type: 'expense' },
        { id: 'reserva', name: 'Reserva Emergência', color: '#00ff00', type: 'expense' },
        { id: 'meta', name: 'Meta Econômica', color: '#ccff00', type: 'expense' },
        { id: 'investimento', name: 'Investimento', color: '#e6dcb1', type: 'expense' },
        { id: 'salario', name: 'Salário', color: '#475569', type: 'income' },
        { id: 'freelancer', name: 'Freelancer', color: '#b3e6e0', type: 'income' },
        { id: 'previdencia', name: 'Previdência', color: '#c861ff', type: 'income' },
        { id: 'restituicao', name: 'Restituição', color: '#ffdd00', type: 'income' },
        { id: 'beneficios', name: 'Benefícios', color: '#82cfff', type: 'income' }
    ];

    // ===== CONTEÚDO DO MANUAL =====
    const manualHTML = `
        <div style="text-align:center; padding:40px 20px; border:3px solid var(--primary-color); border-radius:16px; margin-bottom:30px; background:var(--gradient-card);">
            <h1 style="font-size:2rem; margin-bottom:12px; color:var(--primary-color);">📘 Manual do Usuário</h1>
            <h2 style="font-size:1.3rem; margin-bottom:20px; color:var(--accent-color);">Smart Wallet</h2>
            <p>Controle Financeiro Pessoal Inteligente</p>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:20px;">Versão 2.0 - 2026</p>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Idealizado por RogerElizar™</p>
        </div>
        <div class="manual-quote">
            <p>"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."</p>
            <div class="quote-author">— Tiago 1:17</div>
        </div>
        <p>Agradeço a Deus por toda sabedoria, saúde e recursos que me permitiram desenvolver este projeto.</p>
        <div style="margin-top:20px; padding-top:20px; border-top:2px solid var(--primary-color);">
            <h3 style="color:var(--accent-color); margin-bottom:12px;">💝 Aos meus filhos</h3>
            <div class="manual-quote">
                <p>Dedico este trabalho a vocês, meus amados filhos. Que este seja um legado de ensino, organização e sabedoria financeira.</p>
                <div class="quote-author">— Com todo amor, pai</div>
            </div>
        </div>
        <h2>🎯 Bem-vindo ao Smart Wallet!</h2>
        <p>O Smart Wallet é seu parceiro na jornada para transformar sua relação com o dinheiro.</p>
        <h2>📱 Instalação como WebApp</h2>
        <h3>💻 No Computador</h3>
        <ol><li>Acesse o site pelo navegador</li><li>Clique no menu (⋮) → "Instalar Smart Wallet..."</li><li>Confirme a instalação</li></ol>
        <h3>📱 No Celular Android</h3>
        <ol><li>Abra o site no Chrome</li><li>Toque nos três pontos (⋮) → "Instalar aplicativo"</li></ol>
        <h3>🍎 No iPhone</h3>
        <ol><li>Abra o site no Safari</li><li>Toque em Compartilhar → "Adicionar à Tela de Início"</li></ol>
        <h2>💰 Funcionalidades Principais</h2>
        <h3>🏦 Contas (Corrente e Investimentos)</h3>
        <p>Cadastre suas contas correntes e investimentos para ter uma visão unificada do seu patrimônio.</p>
        <h3>📊 Dashboard Financeiro</h3>
        <ul>
            <li><strong>Saldo Unificado:</strong> Soma de todas as contas correntes</li>
            <li><strong>Receitas e Despesas:</strong> Totais do mês atual</li>
            <li><strong>Acumulado C.Crédito:</strong> Total das faturas de cartões</li>
        </ul>
        <h3>💳 Cartões de Crédito</h3>
        <p>Controle completo dos seus cartões com cadastro, compras parceladas e faturas automáticas.</p>
        <div class="manual-warning"><strong>⚠️ Atenção:</strong> Só compre no crédito se puder pagar a fatura integralmente.</div>
        <h3>📈 Acompanhamento de Aplicações</h3>
        <p>Cadastre seus investimentos, acompanhe rendimentos em % e R$, e visualize projeções.</p>
        <h3>📈 Gráficos Inteligentes</h3>
        <ul>
            <li><strong>Entradas e Saídas:</strong> 2 meses anteriores, atual e 3 posteriores</li>
            <li><strong>Cartões de Crédito:</strong> Evolução de 6 meses</li>
            <li><strong>Despesas por Categoria:</strong> Barras horizontais</li>
        </ul>
        <h3>🔔 Alertas de Contas</h3>
        <p>O sistema avisa automaticamente quando há contas vencendo nos próximos 3 dias.</p>
        <h2>🚀 Guia do Sucesso Financeiro</h2>
        <h3>🎯 A Regra 50-30-20</h3>
        <ul><li><strong>50%</strong> para necessidades</li><li><strong>30%</strong> para desejos</li><li><strong>20%</strong> para objetivos financeiros</li></ul>
        <h3>💎 Poupar NÃO é Suficiente - Invista!</h3>
        <div class="manual-success"><strong>Caso Real - Ana:</strong> Ana investia R$ 500/mês em um CDB que rendia 10% ao ano. Em 10 anos, tinha R$ 102.000.</div>
        <h3>⚠️ Os Riscos da Estagnação</h3>
        <div class="manual-warning"><strong>Caso Hipotético - Pedro:</strong> Pedro acumulou R$ 30.000 em dívidas no cartão. Os juros de 12% ao mês fizeram a dívida crescer para R$ 100.000 em 2 anos.</div>
        <h2>🎯 Seu Plano de Ação</h2>
        <h3>Semana 1: Diagnóstico</h3><ol><li>Cadastre suas contas</li><li>Registre todas as fontes de renda</li><li>Registre todos os gastos do mês</li></ol>
        <h3>Semana 2: Organização</h3><ol><li>Crie categorias personalizadas</li><li>Cadastre seus cartões</li><li>Configure alertas</li></ol>
        <h3>Semana 3: Planejamento</h3><ol><li>Aplique a regra 50-30-20</li><li>Identifique gastos a cortar</li><li>Defina metas financeiras</li></ol>
        <h3>Semana 4: Execução</h3><ol><li>Registre TODOS os gastos diariamente</li><li>Revise semanalmente</li><li>Ajuste conforme necessário</li></ol>
        <div class="manual-success"><strong>🌟 Lembre-se:</strong> A jornada de mil milhas começa com um único passo. Continue firme e consistente!</div>
        <h2>📞 Suporte</h2>
        <ul><li><strong>E-mail:</strong> rogerelizar@gmail.com</li><li><strong>Feedback:</strong> Use o botão "Apoie o Projeto" no menu</li></ul>
        <div style="text-align:center; margin-top:30px; padding:20px; background:var(--gradient-card); border-radius:16px;">
            <h3 style="margin-bottom:12px;">🙏 Bênção Final</h3>
            <div class="manual-quote">
                <p>Que Deus abençoe sua jornada financeira. Que você tenha sabedoria para administrar, generosidade para compartilhar e disciplina para perseverar.</p>
                <div class="quote-author">— RogerElizar™</div>
            </div>
        </div>
    `;

    // ===== CLASSE PRINCIPAL =====
    class SmartWallet {
        constructor() {
            this.transactions = this.loadFromStorage('smartwallet_transactions', []);
            this.categories = this.loadFromStorage('smartwallet_categories', this.getDefaultCategories());
            this.cards = this.loadFromStorage('smartwallet_cards', []);
            this.cardPurchases = this.loadFromStorage('smartwallet_card_purchases', []);
            this.accounts = this.loadFromStorage('smartwallet_accounts', []);
            this.investments = this.loadFromStorage('smartwallet_investments', []);
            this.currentMonth = new Date();
            this.currentMonth.setDate(1);
            this.goal = this.loadFromStorage('smartwallet_goal', 0);
            this.monthlyContribution = this.loadFromStorage('smartwallet_monthly_contribution', 0);
            this.currentTransactionType = 'expense';
            this.currentEditType = 'expense';
            this.newCategoryType = 'expense';
            this.currentEditId = null;
            this.privacyOn = localStorage.getItem('smartwallet_privacy') === 'true';
            this.darkMode = localStorage.getItem('smartwallet_dark') !== 'false';
            this.charts = {};
            this.pendingCsvData = null;
            this.pendingBackupData = null;
            this.searchTimeout = null;
            this.pendingRecurrenceUpdate = null;
            this.init();
        }

        getDefaultCategories() {
            return JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        }

        init() {
            this.applyTheme();
            this.applyPrivacy();
            this.setupEventListeners();
            this.setDefaultDate();
            this.updateMonthDisplay();
            this.populateCategorySelects();
            this.populatePaymentMethodSelects();
            this.populateAccountSelects();
            this.setupGoalForm();
            this.render();
            this.initCharts();
            this.updateAlertBadge();
            this.updateInvestmentChart();
        }

        loadFromStorage(key, def) {
            try {
                const v = localStorage.getItem(key);
                if (!v) return def;
                const parsed = JSON.parse(v);
                if (Array.isArray(def) && !Array.isArray(parsed)) return def;
                if (typeof def === 'number' && typeof parsed !== 'number') return def;
                if (typeof def === 'boolean' && typeof parsed !== 'boolean') return def;
                return parsed;
            } catch (e) {
                return def;
            }
        }

        saveTransactions() {
            try { localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions)); }
            catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); }
        }
        saveCategories() {
            try { localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories)); }
            catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); }
        }
        saveCards() {
            try { localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards)); }
            catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); }
        }
        saveCardPurchases() {
            try { localStorage.setItem('smartwallet_card_purchases', JSON.stringify(this.cardPurchases)); }
            catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); }
        }
        saveAccounts() {
            try { localStorage.setItem('smartwallet_accounts', JSON.stringify(this.accounts)); }
            catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); }
        }
        saveInvestments() {
            try { localStorage.setItem('smartwallet_investments', JSON.stringify(this.investments)); }
            catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); }
        }

        setupEventListeners() {
            const safeAdd = (id, event, handler) => {
                const el = document.getElementById(id);
                if (el) el.addEventListener(event, handler);
            };

            safeAdd('transactionForm', 'submit', e => { e.preventDefault(); this.addTransaction(); });
            safeAdd('editForm', 'submit', e => { e.preventDefault(); this.updateTransaction(); });
            safeAdd('searchFilter', 'input', () => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => this.render(), 300);
            });
            safeAdd('typeFilter', 'change', () => {
                this.filterCategoriesByType('categoryFilter', document.getElementById('typeFilter').value);
                this.render();
            });
            safeAdd('categoryFilter', 'change', () => this.render());
            safeAdd('statusFilter', 'change', () => this.render());
            safeAdd('accountFilter', 'change', () => this.render());
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
            document.getElementById('currentMonth').textContent = `${months[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;
        }

        formatMonthYear(date) {
            const m = String(date.getMonth() + 1).padStart(2, '0');
            return `${m}-${date.getFullYear()}`;
        }

        getMonthTransactions(date = this.currentMonth) {
            const m = date.getMonth(), y = date.getFullYear();
            return this.transactions.filter(t => {
                const d = new Date(t.date + 'T00:00:00');
                return d.getMonth() === m && d.getFullYear() === y;
            });
        }

        populateCategorySelects() {
            const selects = [
                document.getElementById('category'),
                document.getElementById('editCategory'),
                document.getElementById('categoryFilter'),
                document.getElementById('purchaseCategory')
            ];
            selects.forEach((sel, i) => {
                if (!sel) return;
                const val = sel.value;
                const isFilter = i === 2;
                sel.innerHTML = isFilter ? '<option value="">Todas as categorias</option>' : '<option value="">Selecione...</option>';
                this.categories.forEach(cat => {
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
            const selects = [
                document.getElementById('paymentMethod'),
                document.getElementById('editPaymentMethod')
            ];
            selects.forEach(sel => {
                if (!sel) return;
                const currentVal = sel.value;
                sel.innerHTML = '<option value="">Selecione a forma de pagamento...</option>';
                const optgroupStandard = document.createElement('optgroup');
                optgroupStandard.label = '💰 Formas de Pagamento';
                PAYMENT_METHODS.forEach(pm => {
                    const opt = document.createElement('option');
                    opt.value = pm.id;
                    opt.textContent = `${pm.icon} ${pm.name}`;
                    optgroupStandard.appendChild(opt);
                });
                sel.appendChild(optgroupStandard);
                if (this.cards.length > 0) {
                    const optgroupCards = document.createElement('optgroup');
                    optgroupCards.label = '💳 Cartões de Crédito';
                    this.cards.forEach(card => {
                        const opt = document.createElement('option');
                        opt.value = `card:${card.id}`;
                        opt.textContent = `${card.name} •••• ${card.last4 || '****'}`;
                        optgroupCards.appendChild(opt);
                    });
                    sel.appendChild(optgroupCards);
                }
                sel.value = currentVal;
            });
        }

        populateAccountSelects() {
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
                this.accounts.forEach(acc => {
                    const opt = document.createElement('option');
                    opt.value = acc.id;
                    opt.textContent = `${acc.type === 'checking' ? '💳' : '📈'} ${acc.name}`;
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
                const currentOpt = sel.querySelector(`option[value="${currentVal}"]`);
                if (currentOpt && currentOpt.style.display === 'none') sel.value = '';
            }
        }

        getCategoryById(id) {
            return this.categories.find(c => c.id === id) || { name: 'Sem categoria', color: '#6b7280', type: 'expense' };
        }
        findCategoryByName(name) {
            return this.categories.find(c => c.name.toLowerCase() === name.toLowerCase());
        }
        getCardById(id) {
            return this.cards.find(c => c.id === id);
        }

        getPaymentMethodName(method) {
            if (!method) return '-';
            if (method.startsWith('card:')) {
                const cardId = method.replace('card:', '');
                const card = this.getCardById(cardId);
                return card ? `💳 ${card.name}` : 'Cartão removido';
            }
            const pm = PAYMENT_METHODS.find(p => p.id === method);
            return pm ? `${pm.icon} ${pm.name}` : method;
        }

        addTransaction() {
            const date = document.getElementById('date').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const type = this.currentTransactionType;
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const statusOk = document.getElementById('statusOk').checked;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const accountId = document.getElementById('transactionAccount').value;

            if (!category) return this.showToast('Selecione uma categoria');
            if (!paymentMethod) return this.showToast('Selecione a forma de pagamento');

            const base = {
                id: Date.now(),
                date,
                amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
                category,
                description,
                statusOk,
                paymentMethod,
                accountId
            };

            this.transactions.push(base);
            this.saveTransactions();
            this.render();
            this.updateCharts();
            this.updateAlertBadge();
            this.showToast('Transação adicionada!');
            closeNewTransactionModal();
            this.clearForm();
        }

        clearForm() {
            document.getElementById('transactionForm').reset();
            this.setDefaultDate();
            this.currentTransactionType = 'expense';
            document.querySelectorAll('#transactionForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === 'expense'));
            this.filterCategoriesByType('category', 'expense');
        }

        editTransaction(id) {
            const t = this.transactions.find(x => x.id === id);
            if (!t) return;
            this.currentEditId = t.id;
            this.currentEditType = t.amount > 0 ? 'income' : 'expense';
            document.getElementById('editId').value = t.id;
            document.getElementById('editDate').value = t.date;
            document.getElementById('editAmount').value = Math.abs(t.amount);
            document.getElementById('editCategory').value = t.category || '';
            document.getElementById('editPaymentMethod').value = t.paymentMethod || '';
            document.getElementById('editTransactionAccount').value = t.accountId || '';
            document.getElementById('editDescription').value = t.description;
            document.getElementById('editStatusOk').checked = !!t.statusOk;
            document.querySelectorAll('#editForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === this.currentEditType));
            this.filterCategoriesByType('editCategory', this.currentEditType);
            document.getElementById('editModal').classList.add('active');
        }

        updateTransaction() {
            const id = parseInt(document.getElementById('editId').value);
            const idx = this.transactions.findIndex(t => t.id === id);
            if (idx === -1) return;
            const type = this.currentEditType;

            this.transactions[idx] = {
                ...this.transactions[idx],
                date: document.getElementById('editDate').value,
                amount: type === 'expense' ? -Math.abs(parseFloat(document.getElementById('editAmount').value)) : Math.abs(parseFloat(document.getElementById('editAmount').value)),
                category: document.getElementById('editCategory').value,
                description: document.getElementById('editDescription').value,
                statusOk: document.getElementById('editStatusOk').checked,
                paymentMethod: document.getElementById('editPaymentMethod').value,
                accountId: document.getElementById('editTransactionAccount').value
            };

            this.saveTransactions();
            this.render();
            this.updateCharts();
            this.updateAlertBadge();
            closeEditModal();
            this.showToast('Atualizada!');
        }

        deleteFromEdit() {
            if (this.currentEditId && confirm('Excluir esta transação?')) {
                this.transactions = this.transactions.filter(t => t.id !== this.currentEditId);
                this.saveTransactions();
                this.render();
                this.updateCharts();
                this.updateAlertBadge();
                closeEditModal();
                this.showToast('Excluída!');
            }
        }

        getFilteredTransactions() {
            const search = document.getElementById('searchFilter').value.toLowerCase();
            const catFilter = document.getElementById('categoryFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;
            const accountFilter = document.getElementById('accountFilter').value;

            return this.getMonthTransactions().filter(t => {
                const cat = this.getCategoryById(t.category);
                const matchesStatus = !statusFilter || (statusFilter === 'done' ? t.statusOk : !t.statusOk);
                const matchesAccount = !accountFilter || t.accountId === accountFilter;
                return (!search || t.description.toLowerCase().includes(search) || cat.name.toLowerCase().includes(search)) &&
                    (!catFilter || t.category === catFilter) &&
                    (!typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0)) &&
                    matchesStatus &&
                    matchesAccount;
            });
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

        updateDashboard() {
            const mt = this.getMonthTransactions();
            const inc = mt.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
            const exp = mt.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);

            const unifiedBalance = this.accounts
                .filter(a => a.type === 'checking')
                .reduce((sum, a) => sum + (parseFloat(a.balance) || 0), 0);

            const creditCardTotal = this.cards.reduce((total, card) => {
                const period = this.getInvoicePeriod(card);
                const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
                return total + this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
            }, 0);

            const balEl = document.getElementById('totalBalance');
            balEl.textContent = this.formatCurrency(unifiedBalance);
            balEl.className = 'card-value privacy-value ' + (unifiedBalance >= 0 ? 'positive' : 'negative');
            document.getElementById('totalIncome').textContent = this.formatCurrency(inc);
            document.getElementById('totalExpenses').textContent = this.formatCurrency(Math.abs(exp));

            const goalEl = document.getElementById('goalProgress');
            goalEl.textContent = this.formatCurrency(creditCardTotal);
            goalEl.className = 'card-value privacy-value negative';
        }

        render() {
            this.updateDashboard();
            const tbody = document.getElementById('transactionsTable');
            const empty = document.getElementById('emptyState');
            const filtered = this.getFilteredTransactions();

            if (!filtered.length) {
                tbody.innerHTML = '';
                empty.style.display = 'block';
                return;
            }
            empty.style.display = 'none';

            const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
            const balMap = new Map();
            let run = 0;
            [...sorted].reverse().forEach(t => {
                run += t.amount;
                balMap.set(t.id, run);
            });

            tbody.innerHTML = sorted.map(t => {
                const c = this.getCategoryById(t.category);
                const acc = this.accounts.find(a => a.id === t.accountId);
                const cls = t.amount >= 0 ? 'positive' : 'negative';
                const statusClass = t.statusOk ? 'status-done' : 'status-pending';
                const statusText = t.statusOk ? 'Concluído' : 'Pendente';
                const paymentName = this.getPaymentMethodName(t.paymentMethod);

                return `<tr class="transaction-row" onclick="smartwallet.editTransaction(${t.id})">
                    <td data-label="Data">${this.formatDate(t.date)}</td>
                    <td data-label="Descrição">${this.escapeHtml(t.description) || '-'}</td>
                    <td data-label="Categoria"><span class="category-badge" style="background:${c.color}">${this.escapeHtml(c.name)}</span></td>
                    <td data-label="Conta">${acc ? `<span class="account-badge">${this.escapeHtml(acc.name)}</span>` : '-'}</td>
                    <td data-label="Pagamento"><span class="payment-badge">${paymentName}</span></td>
                    <td data-label="Status"><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td data-label="Valor" class="amount ${cls} privacy-value">${this.formatCurrency(t.amount)}</td>
                    <td data-label="Saldo" class="balance privacy-value">${this.formatCurrency(balMap.get(t.id))}</td>
                </tr>`;
            }).join('');
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
                responsive: true, maintainAspectRatio: false,
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
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                            y: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                        }
                    }
                });
            } catch (e) { console.error('Erro pie:', e); }

            try {
                this.charts.cards = new Chart(document.getElementById('cardsChart').getContext('2d'), {
                    type: 'line',
                    data: { labels: [], datasets: [] },
                    options: {
                        responsive: true, maintainAspectRatio: false,
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
            Object.values(this.charts).forEach(chart => {
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
            const lLabels = [], lInc = [], lExp = [];
            for (let i = -2; i <= 3; i++) {
                const d = new Date(this.currentMonth);
                d.setMonth(d.getMonth() + i);
                const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                lLabels.push(`${months[d.getMonth()]}/${d.getFullYear()}`);
                const mt = this.getMonthTransactions(d);
                lInc.push(mt.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0));
                lExp.push(Math.abs(mt.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0)));
            }
            if (this.charts.line) {
                this.charts.line.data.labels = lLabels;
                this.charts.line.data.datasets[0].data = lInc;
                this.charts.line.data.datasets[1].data = lExp;
                this.charts.line.update();
            }

            const exps = {};
            this.getMonthTransactions().filter(t => t.amount < 0).forEach(t => {
                const c = this.getCategoryById(t.category);
                if (!exps[c.name]) exps[c.name] = { t: 0, color: c.color };
                exps[c.name].t += Math.abs(t.amount);
            });
            if (this.charts.pie) {
                this.charts.pie.data.labels = Object.keys(exps);
                this.charts.pie.data.datasets[0].data = Object.values(exps).map(x => x.t);
                this.charts.pie.data.datasets[0].backgroundColor = Object.values(exps).map(x => x.color);
                this.charts.pie.update();
            }

            if (this.charts.cards) {
                const cardLabels = [];
                const cardDatasets = [];
                for (let i = -2; i <= 3; i++) {
                    const d = new Date(this.currentMonth);
                    d.setMonth(d.getMonth() + i);
                    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                    cardLabels.push(`${months[d.getMonth()]}/${d.getFullYear()}`);
                }
                this.cards.forEach(card => {
                    const data = [];
                    for (let i = -2; i <= 3; i++) {
                        const d = new Date(this.currentMonth);
                        d.setMonth(d.getMonth() + i);
                        const m = d.getMonth(), y = d.getFullYear();
                        const monthPurchases = this.cardPurchases.filter(p => {
                            if (p.cardId !== card.id) return false;
                            const pDate = new Date(p.date + 'T00:00:00');
                            return pDate.getMonth() === m && pDate.getFullYear() === y;
                        });
                        data.push(monthPurchases.reduce((sum, p) => sum + p.amount, 0));
                    }
                    cardDatasets.push({
                        label: card.name, data: data,
                        borderColor: card.color, backgroundColor: card.color + '20',
                        tension: 0.4, fill: false
                    });
                });
                this.charts.cards.data.labels = cardLabels;
                this.charts.cards.data.datasets = cardDatasets;
                this.charts.cards.update();
            }
        }

        updateAlertBadge() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const in3Days = new Date(today);
            in3Days.setDate(in3Days.getDate() + 3);
            const bills = this.transactions.filter(t => {
                if (t.statusOk || t.amount >= 0) return false;
                const tDate = new Date(t.date + 'T00:00:00');
                return tDate <= in3Days;
            });
            const badge = document.getElementById('alertBadge');
            const btn = document.getElementById('alertBtn');
            if (bills.length > 0) {
                badge.textContent = bills.length;
                badge.classList.add('visible');
                btn.classList.add('has-alerts');
            } else {
                badge.classList.remove('visible');
                btn.classList.remove('has-alerts');
            }
        }

        getInvoicePeriod(card) {
            const now = new Date();
            let closingDate = new Date(now.getFullYear(), now.getMonth(), card.closingDay);
            if (now.getDate() < card.closingDay) {
                closingDate = new Date(now.getFullYear(), now.getMonth() - 1, card.closingDay);
            }
            let startDate = new Date(closingDate);
            startDate.setMonth(startDate.getMonth() - 1);
            startDate.setDate(startDate.getDate() + 1);
            let dueDate = new Date(closingDate);
            dueDate.setMonth(dueDate.getMonth() + 1);
            dueDate.setDate(card.dueDay);
            return { startDate, closingDate, dueDate };
        }

        getCardPurchasesForInvoice(cardId, startDate, closingDate) {
            return this.cardPurchases.filter(p => {
                if (p.cardId !== cardId) return false;
                const pDate = new Date(p.date + 'T00:00:00');
                return pDate >= startDate && pDate <= closingDate;
            });
        }

        calculateInvoiceTotal(card, purchases, startDate, closingDate) {
            let total = 0;
            purchases.forEach(p => { total += p.amount; });
            return total;
        }

        // ===== INVESTIMENTOS =====
        saveInvestment() {
            const id = document.getElementById('investmentEditId').value;
            const name = document.getElementById('investmentName').value.trim();
            const type = document.getElementById('investmentType').value;
            const initial = parseFloat(document.getElementById('investmentInitial').value) || 0;
            const current = parseFloat(document.getElementById('investmentCurrent').value) || 0;
            const date = document.getElementById('investmentDate').value;
            const rate = parseFloat(document.getElementById('investmentRate').value) || 0;

            if (!name) return this.showToast('Informe o nome');

            const investment = { id: id || 'inv_' + Date.now(), name, type, initial, current, date, rate };

            if (id) {
                const idx = this.investments.findIndex(i => i.id === id);
                if (idx !== -1) this.investments[idx] = investment;
            } else {
                this.investments.push(investment);
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
            const inv = this.investments.find(i => i.id === id);
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

        renderInvestmentsModal() {
            const container = document.getElementById('investmentsContent');
            if (!this.investments.length) {
                container.innerHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">📈</div><h3>Nenhuma aplicação cadastrada</h3><p>Clique em "Nova Aplicação" para começar</p></div>`;
                return;
            }

            let totalInitial = 0, totalCurrent = 0;
            const typeLabels = { cdb: 'CDB', tesouro: 'Tesouro Direto', lci: 'LCI/LCA', fundo: 'Fundo', acao: 'Ações', fiis: 'FIIs', poupanca: 'Poupança', outro: 'Outro' };

            container.innerHTML = '<div style="margin-bottom:20px;">' + this.investments.map(inv => {
                const profit = inv.current - inv.initial;
                const profitPct = inv.initial > 0 ? (profit / inv.initial * 100) : 0;
                totalInitial += inv.initial;
                totalCurrent += inv.current;

                return `
                    <div class="investment-card">
                        <div class="investment-card-header">
                            <div>
                                <div class="investment-card-title">${this.escapeHtml(inv.name)}</div>
                                <div class="investment-card-type">${typeLabels[inv.type] || inv.type} • Aplicado em ${this.formatDate(inv.date)}</div>
                            </div>
                            <div class="investment-card-actions">
                                <button class="btn btn-secondary btn-small" onclick="smartwallet.editInvestment('${inv.id}')">✏️</button>
                                <button class="btn btn-danger btn-small" onclick="smartwallet.deleteInvestment('${inv.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="investment-card-values">
                            <div class="investment-value-item">
                                <div class="investment-value-label">Valor Inicial</div>
                                <div class="investment-value-amount">${this.formatCurrency(inv.initial)}</div>
                            </div>
                            <div class="investment-value-item">
                                <div class="investment-value-label">Valor Atual</div>
                                <div class="investment-value-amount">${this.formatCurrency(inv.current)}</div>
                            </div>
                            <div class="investment-value-item">
                                <div class="investment-value-label">Rendimento</div>
                                <div class="investment-value-amount ${profit >= 0 ? 'positive' : 'negative'}">${profitPct.toFixed(2)}% (${this.formatCurrency(profit)})</div>
                            </div>
                        </div>
                        ${inv.rate > 0 ? `<div style="font-size:0.85rem; color:var(--text-secondary);">Taxa: ${inv.rate}% ao ano</div>` : ''}
                    </div>
                `;
            }).join('') + '</div>';

            const totalProfit = totalCurrent - totalInitial;
            const totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0;

            container.innerHTML += `
                <div style="background:var(--input-bg); border-radius:16px; padding:20px; margin-top:20px;">
                    <h3 style="margin-bottom:16px;">📊 Resumo Geral</h3>
                    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px;">
                        <div style="text-align:center;">
                            <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:4px;">Total Investido</div>
                            <div style="font-size:1.3rem; font-weight:700;">${this.formatCurrency(totalInitial)}</div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:4px;">Valor Atual</div>
                            <div style="font-size:1.3rem; font-weight:700;">${this.formatCurrency(totalCurrent)}</div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:4px;">Rendimento Total</div>
                            <div style="font-size:1.3rem; font-weight:700; color:${totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)'};">${totalProfitPct.toFixed(2)}% (${this.formatCurrency(totalProfit)})</div>
                        </div>
                    </div>
                </div>
            `;
        }

        updateInvestmentChart() {
            const section = document.getElementById('investmentsChartSection');
            if (!section) return;

            if (!this.investments.length) {
                section.style.display = 'none';
                return;
            }
            section.style.display = 'block';

            if (!this.charts.invest) {
                const colors = this.getChartColors();
                const canvas = document.getElementById('investChart');
                if (!canvas) return;
                this.charts.invest = new Chart(canvas.getContext('2d'), {
                    type: 'bar',
                    data: { labels: [], datasets: [] },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { position: 'top', labels: { color: colors.text } } },
                        scales: {
                            y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } },
                            x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }
                        }
                    }
                });
            }

            const labels = this.investments.map(i => i.name);
            const initialData = this.investments.map(i => i.initial);
            const currentData = this.investments.map(i => i.current);
            const profitData = this.investments.map(i => i.current - i.initial);

            this.charts.invest.data.labels = labels;
            this.charts.invest.data.datasets = [
                { label: 'Valor Inicial (R$)', data: initialData, backgroundColor: 'rgba(148,163,184,0.5)', borderColor: '#94a3b8', borderWidth: 1 },
                { label: 'Valor Atual (R$)', data: currentData, backgroundColor: 'rgba(16,185,129,0.5)', borderColor: '#10b981', borderWidth: 1 },
                { label: 'Rendimento (R$)', data: profitData, backgroundColor: 'rgba(6,182,212,0.5)', borderColor: '#06b6d4', borderWidth: 1 }
            ];
            this.charts.invest.update();
        }

        // ===== CONTAS =====
        saveAccount() {
            const id = document.getElementById('accountEditId').value;
            const name = document.getElementById('accountName').value.trim();
            const type = document.getElementById('accountType').value;
            const balance = parseFloat(document.getElementById('accountBalance').value) || 0;
            const color = document.getElementById('accountColor').value;

            if (!name) return this.showToast('Informe o nome');

            if (id) {
                const idx = this.accounts.findIndex(a => a.id === id);
                if (idx !== -1) this.accounts[idx] = { ...this.accounts[idx], name, type, balance, color };
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
            const acc = this.accounts.find(a => a.id === id);
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
            if (!this.accounts.length) {
                container.innerHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">🏦</div><h3>Nenhuma conta cadastrada</h3><p>Clique em "Nova Conta" para começar</p></div>`;
                return;
            }
            container.innerHTML = '<div class="accounts-grid">' + this.accounts.map(acc => `
                <div class="account-card" style="background:linear-gradient(135deg, ${acc.color} 0%, ${this.adjustColor(acc.color, -30)} 100%);">
                    <div class="account-card-actions">
                        <button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editAccount('${acc.id}')" title="Editar">✏️</button>
                        <button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteAccount('${acc.id}')" title="Excluir">🗑️</button>
                    </div>
                    <div class="account-card-header">
                        <div class="account-card-type">${acc.type === 'checking' ? '💳 Conta Corrente' : '📈 Investimento'}</div>
                    </div>
                    <div class="account-card-name">${this.escapeHtml(acc.name)}</div>
                    <div class="account-card-balance">${this.formatCurrency(acc.balance)}</div>
                </div>
            `).join('') + '</div>';
        }

        adjustColor(color, amount) {
            const hex = color.replace('#', '');
            const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
            const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
            const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
            return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        }

        // ===== EXPORTAÇÃO / IMPRESSÃO =====
        printPDF() {
            const filtered = this.getFilteredTransactions();
            const printWindow = window.open('', '_blank');
            const monthLabel = document.getElementById('currentMonth').textContent;

            let rowsHtml = filtered.sort((a,b) => new Date(a.date) - new Date(b.date)).map(t => {
                const cat = this.getCategoryById(t.category);
                const acc = this.accounts.find(a => a.id === t.accountId);
                const payment = this.getPaymentMethodName(t.paymentMethod);
                return `<tr>
                    <td>${this.formatDate(t.date)}</td>
                    <td>${this.escapeHtml(t.description)}</td>
                    <td>${this.escapeHtml(cat.name)}</td>
                    <td>${acc ? this.escapeHtml(acc.name) : '-'}</td>
                    <td>${payment}</td>
                    <td>${t.statusOk ? 'Concluído' : 'Pendente'}</td>
                    <td style="text-align:right; color:${t.amount >= 0 ? '#10b981' : '#ef4444'}; font-weight:600;">${this.formatCurrency(t.amount)}</td>
                </tr>`;
            }).join('');

            const total = filtered.reduce((s, t) => s + t.amount, 0);

            printWindow.document.write(`<!DOCTYPE html><html><head><title>Extrato Smart Wallet</title><style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 900px; margin: 0 auto; }
                .header { border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { color: #6366f1; margin: 0 0 5px 0; }
                .header .subtitle { color: #64748b; font-size: 0.9rem; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; font-size: 0.9rem; }
                th { background: #f1f5f9; font-weight: 600; }
                .total-row { background: #f8fafc; font-weight: 700; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #6366f1; font-size: 0.85rem; color: #64748b; text-align: center; }
                @media print { body { padding: 20px; } }
            </style></head><body>
                <div class="header">
                    <h1>Smart Wallet - Extrato</h1>
                    <div class="subtitle">Período: ${monthLabel}</div>
                </div>
                <table>
                    <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Pagamento</th><th>Status</th><th>Valor</th></tr></thead>
                    <tbody>${rowsHtml}</tbody>
                    <tfoot>
                        <tr class="total-row">
                            <td colspan="6" style="text-align:right;">Total:</td>
                            <td style="text-align:right; font-size:1.1rem;">${this.formatCurrency(total)}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="footer">Smart Wallet • Gerado em ${new Date().toLocaleString('pt-BR')}<br>Idealizado por RogerElizar™</div>
            </body></html>`);
            printWindow.document.close();
            setTimeout(() => { printWindow.print(); }, 250);
        }

        printManual() {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`<!DOCTYPE html><html><head><title>Manual do Usuário - Smart Wallet</title><style>
                @page { size: A4; margin: 2cm; }
                body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; }
                .header { border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
                .header h1 { color: #6366f1; margin: 0 0 5px 0; }
                .header .subtitle { color: #64748b; font-size: 0.9rem; }
                h2 { color: #6366f1; margin-top: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
                h3 { color: #06b6d4; margin-top: 20px; }
                .manual-quote { margin: 24px 0; padding: 20px 30px; border-left: 4px solid #6366f1; background: #f8fafc; border-radius: 8px; font-style: italic; }
                .manual-quote .quote-author { font-size: 0.85rem; font-weight: 600; color: #6366f1; text-align: right; margin-top: 12px; font-style: normal; }
                .manual-tip, .manual-warning, .manual-success { padding: 16px; margin: 16px 0; border-radius: 8px; border-left: 4px solid; }
                .manual-tip { background: rgba(99,102,241,0.1); border-color: #6366f1; }
                .manual-warning { background: rgba(245,158,11,0.1); border-color: #f59e0b; }
                .manual-success { background: rgba(16,185,129,0.1); border-color: #10b981; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #6366f1; font-size: 0.85rem; color: #64748b; text-align: center; }
                @media print { body { padding: 20px; } }
            </style></head><body>
                <div class="header">
                    <h1>📘 Manual do Usuário</h1>
                    <div class="subtitle">Smart Wallet - Controle Financeiro Pessoal Inteligente</div>
                    <div class="subtitle">Versão 2.0 - 2026</div>
                </div>
                ${manualHTML}
                <div class="footer">Smart Wallet • Idealizado por RogerElizar™</div>
            </body></html>`);
            printWindow.document.close();
            setTimeout(() => { printWindow.print(); }, 250);
        }
    }

    // ===== INSTÂNCIA GLOBAL =====
    const smartwallet = new SmartWallet();
    window.smartwallet = smartwallet;

    // ===== FUNÇÕES GLOBAIS =====
    window.selectTransactionType = function(t) {
        smartwallet.currentTransactionType = t;
        document.querySelectorAll('#transactionForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === t));
        smartwallet.filterCategoriesByType('category', t);
    };

    window.selectEditType = function(t) {
        smartwallet.currentEditType = t;
        document.querySelectorAll('#editForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === t));
        smartwallet.filterCategoriesByType('editCategory', t);
    };

    window.selectNewCategoryType = function(t) {
        smartwallet.newCategoryType = t;
        document.querySelectorAll('#categoryModal .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === t));
    };

    window.openNewTransactionModal = function() {
        smartwallet.setDefaultDate();
        smartwallet.filterCategoriesByType('category', smartwallet.currentTransactionType);
        document.getElementById('newTransactionModal').classList.add('active');
    };
    window.closeNewTransactionModal = function() {
        document.getElementById('newTransactionModal').classList.remove('active');
        smartwallet.clearForm();
    };
    window.closeEditModal = function() {
        document.getElementById('editModal').classList.remove('active');
        smartwallet.currentEditId = null;
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
        document.getElementById('infoMenu').classList.remove('active');
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
        const pixKey = document.getElementById('pixKey').textContent;
        navigator.clipboard.writeText(pixKey).then(() => {
            smartwallet.showToast('✅ Chave PIX copiada!');
        }).catch(() => {
            smartwallet.showToast('❌ Copie manualmente: ' + pixKey);
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
        document.getElementById('investmentEditId').value = '';
        document.getElementById('investmentForm').reset();
        document.getElementById('investmentDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('newInvestmentTitle').textContent = 'Nova Aplicação';
        document.getElementById('newInvestmentModal').classList.add('active');
    };
    window.closeNewInvestmentModal = function() {
        document.getElementById('newInvestmentModal').classList.remove('active');
    };

    // ===== CONTROLE DA SEQUÊNCIA: SPLASH → DISCLAIMER → APP =====
    function initDisclaimer() {
        const timerDisplay = document.getElementById('disclaimerTimer');
        const btnEl = document.getElementById('acceptDisclaimerBtn');
        const disclaimerModal = document.getElementById('disclaimerModal');

        if (!timerDisplay || !btnEl || !disclaimerModal) return;

        let countdown = 12;
        btnEl.classList.remove('enabled');
        btnEl.disabled = true;

        timerDisplay.innerHTML = `⏱️ Aguarde <span id="countdown">${countdown}</span> segundos para continuar`;

        const interval = setInterval(() => {
            countdown--;
            const countdownSpan = document.getElementById('countdown');
            if (countdownSpan) countdownSpan.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(interval);
                btnEl.classList.add('enabled');
                btnEl.disabled = false;
                timerDisplay.innerHTML = '✅ Você já pode aceitar os termos';
            }
        }, 1000);
    }

    window.acceptDisclaimer = function() {
        const btnEl = document.getElementById('acceptDisclaimerBtn');
        const disclaimerModal = document.getElementById('disclaimerModal');

        if (!btnEl || !btnEl.classList.contains('enabled')) return;
        if (!disclaimerModal) return;

        localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
        disclaimerModal.classList.add('disintegrating');

        setTimeout(() => {
            disclaimerModal.classList.remove('active', 'disintegrating');
            disclaimerModal.style.display = 'none';
            setTimeout(() => { transitionToApp(); }, 3000);
        }, 600);
    };

    function transitionToApp() {
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.classList.add('fade-out');
            setTimeout(() => {
                splashScreen.style.display = 'none';
                showQuoteModal();
            }, 800);
        } else {
            showQuoteModal();
        }
    }

    function showQuoteModal() {
        const quote = financialQuotes[Math.floor(Math.random() * financialQuotes.length)];
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const quoteModal = document.getElementById('quoteModal');

        if (quoteText) quoteText.textContent = `"${quote.text}"`;
        if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
        if (quoteModal) quoteModal.classList.add('active');
    }

    window.startApp = function() {
        const quoteModal = document.getElementById('quoteModal');
        const mainApp = document.getElementById('mainApp');
        const fabBtn = document.getElementById('fabBtn');

        if (quoteModal) quoteModal.classList.remove('active');
        if (mainApp) mainApp.style.display = 'block';
        if (fabBtn) fabBtn.style.display = 'flex';
    };

    // ===== INICIALIZAÇÃO PRINCIPAL =====
    window.addEventListener('load', () => {
        const disclaimerAccepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
        const splashScreen = document.getElementById('splashScreen');
        const disclaimerModal = document.getElementById('disclaimerModal');

        if (splashScreen) {
            splashScreen.style.display = 'flex';
            splashScreen.classList.remove('fade-out');
        }

        setTimeout(() => {
            if (!disclaimerAccepted) {
                if (disclaimerModal) {
                    disclaimerModal.style.display = 'flex';
                    disclaimerModal.classList.add('active');
                    initDisclaimer();
                }
            } else {
                setTimeout(() => { transitionToApp(); }, 3000);
            }
        }, 3500);
    });

    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mainMenu');
        const infoMenu = document.getElementById('infoMenu');
        const menuBtn = e.target.closest('.menu-btn');
        const infoBtn = e.target.closest('.info-btn');
        if (!menuBtn && menu && menu.classList.contains('active')) menu.classList.remove('active');
        if (!infoBtn && infoMenu && infoMenu.classList.contains('active')) infoMenu.classList.remove('active');
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('✅ SW registrado:', reg.scope))
                .catch(err => console.log('❌ SW falhou:', err));
        });
    }
})();
