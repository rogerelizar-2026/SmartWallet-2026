(function() {
    'use strict';

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
    ];       
        
// ===== NOVO: INVESTIMENTOS =====
this.investments = this.loadFromStorage('smartwallet_investments', []);

// No init(), adicione:
this.populateAccountSelects();

// Nova função:
populateAccountSelects() {
    const selects = [document.getElementById('transactionAccount'), document.getElementById('editTransactionAccount'), document.getElementById('accountFilter')];
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

// Modifique addTransaction para incluir account:
addTransaction() {
    // ... código existente até paymentMethod ...
    const accountId = document.getElementById('transactionAccount').value;
    
    // ... resto do código ...
    const base = { date, amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount), category, description, statusOk, paymentMethod, accountId };
    // ... resto ...
}

// Modifique editTransaction para carregar account:
editTransaction(id) {
    // ... código existente ...
    document.getElementById('editTransactionAccount').value = t.accountId || '';
    // ... resto ...
}

// Modifique updateTransaction para salvar account:
updateTransaction() {
    // ... código existente ...
    const updated = {
        ...this.transactions[idx],
        // ... outros campos ...
        accountId: document.getElementById('editTransactionAccount').value
    };
    // ... resto ...
}

// Modifique render para incluir coluna Conta:
render() {
    // ... código existente ...
    tbody.innerHTML = sorted.map(t => {
        const c = this.getCategoryById(t.category);
        const acc = this.accounts.find(a => a.id === t.accountId);
        // ... resto ...
        return `<tr class="transaction-row" onclick="smartwallet.editTransaction(${t.id})">
            <td data-label="Data">${this.formatDate(t.date)}</td>
            <td data-label="Descrição">${this.escapeHtml(t.description)||'-'}</td>
            <td data-label="Categoria"><span class="category-badge" style="background:${c.color}">${this.escapeHtml(c.name)}</span></td>
            <td data-label="Conta">${acc ? `<span class="account-badge">${this.escapeHtml(acc.name)}</span>` : '-'}</td>
            <td data-label="Pagamento"><span class="payment-badge">${paymentName}</span></td>
            <td data-label="Status"><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td data-label="Recorrência">${recurrenceHtml || '<span style="color:var(--text-secondary);">-</span>'}</td>
            <td data-label="Valor" class="amount ${cls} privacy-value">${this.formatCurrency(t.amount)}</td>
            <td data-label="Saldo" class="balance privacy-value">${this.formatCurrency(balMap.get(t.id))}</td>
        </tr>`;
    }).join('');
}

// Modifique getFilteredTransactions para incluir filtro de conta:
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

// Adicione listener para accountFilter:
safeAddListener('accountFilter', 'change', () => this.render());

// ===== FUNÇÕES DE INVESTIMENTOS =====
window.openInvestmentsModal = function() {
    smartwallet.renderInvestmentsModal();
    document.getElementById('investmentsModal').classList.add('active');
    document.getElementById('infoMenu').classList.remove('active');
};
window.closeInvestmentsModal = function() { document.getElementById('investmentsModal').classList.remove('active'); };

window.openNewInvestmentModal = function() {
    document.getElementById('investmentEditId').value = '';
    document.getElementById('investmentForm').reset();
    document.getElementById('investmentDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('newInvestmentTitle').textContent = 'Nova Aplicação';
    document.getElementById('newInvestmentModal').classList.add('active');
};
window.closeNewInvestmentModal = function() { document.getElementById('newInvestmentModal').classList.remove('active'); };

// Na classe SmartWallet, adicione:
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
    
    localStorage.setItem('smartwallet_investments', JSON.stringify(this.investments));
    this.renderInvestmentsModal();
    this.updateInvestmentChart();
    closeNewInvestmentModal();
    this.showToast(id ? 'Aplicação atualizada!' : 'Aplicação cadastrada!');
}

deleteInvestment(id) {
    if (!confirm('Excluir esta aplicação?')) return;
    this.investments = this.investments.filter(i => i.id !== id);
    localStorage.setItem('smartwallet_investments', JSON.stringify(this.investments));
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
    if (!this.investments.length) {
        document.getElementById('investmentsChartSection').style.display = 'none';
        return;
    }
    
    document.getElementById('investmentsChartSection').style.display = 'block';
    
    if (!this.charts.invest) {
        const colors = this.getChartColors();
        this.charts.invest = new Chart(document.getElementById('investChart').getContext('2d'), {
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
    }
    
    const labels = this.investments.map(i => i.name);
    const initialData = this.investments.map(i => i.initial);
    const currentData = this.investments.map(i => i.current);
    const profitPctData = this.investments.map(i => i.initial > 0 ? ((i.current - i.initial) / i.initial * 100) : 0);
    
    // Projeção para 12 meses
    const projectionData = this.investments.map(i => {
        if (i.rate <= 0) return i.current;
        const monthsSince = Math.max(0, (new Date() - new Date(i.date + 'T00:00:00')) / (1000 * 60 * 60 * 24 * 30));
        return i.current * Math.pow(1 + i.rate / 100, 12 / 12);
    });
    
    this.charts.invest.data.labels = labels;
    this.charts.invest.data.datasets = [
        { label: 'Valor Inicial (R$)', data: initialData, borderColor: '#94a3b8', backgroundColor: 'rgba(148,163,184,0.1)', tension: 0.4 },
        { label: 'Valor Atual (R$)', data: currentData, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4 },
        { label: 'Rendimento (%)', data: profitPctData, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', tension: 0.4, yAxisID: 'y1' },
        { label: 'Projeção 12 meses (R$)', data: projectionData, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.4, borderDash: [5, 5] }
    ];
    this.charts.invest.options.scales.y1 = { position: 'right', ticks: { color: this.getChartColors().textSecondary }, grid: { display: false } };
    this.charts.invest.update();
}

// No init(), adicione após this.updateAlertBadge():
this.updateInvestmentChart();

// No saveAccounts(), adicione no final:
this.populateAccountSelects();

// No deleteAccount(), adicione no final:
this.populateAccountSelects();
this.render();

// Modifique exportBackup para incluir investments:
exportBackup() {
    // ... código existente ...
    const backup = {
        // ... outros campos ...
        investments: this.investments || [],
        // ... resto ...
    };
    // ... resto ...
}

// Modifique importBackup para incluir investments:
importBackup() {
    // ... código existente ...
    const investments = (data.investments || []).filter(i => i && typeof i === 'object');
    // ... resto ...
    this.investments = investments;
    // ... resto ...
    this.updateInvestmentChart();
}

// Modifique clearAllData para incluir investments:
clearAllData() {
    // ... código existente ...
    this.investments = [];
    // ... resto ...
    localStorage.setItem('smartwallet_investments', '[]');
    // ... resto ...
}

// Modifique printPDF para respeitar filtros:
printPDF() {
    const filters = {
        search: document.getElementById('searchFilter').value,
        type: document.getElementById('typeFilter').value,
        category: document.getElementById('categoryFilter').value,
        status: document.getElementById('statusFilter').value,
        account: document.getElementById('accountFilter').value
    };
    
    const filtered = this.getFilteredTransactions();
    const printWindow = window.open('', '_blank');
    
    let filtersInfo = '';
    if (filters.search) filtersInfo += `<p><strong>Busca:</strong> ${this.escapeHtml(filters.search)}</p>`;
    if (filters.type) filtersInfo += `<p><strong>Tipo:</strong> ${filters.type === 'income' ? 'Receitas' : 'Despesas'}</p>`;
    if (filters.category) {
        const cat = this.getCategoryById(filters.category);
        filtersInfo += `<p><strong>Categoria:</strong> ${this.escapeHtml(cat.name)}</p>`;
    }
    if (filters.status) filtersInfo += `<p><strong>Status:</strong> ${filters.status === 'done' ? 'Concluído' : 'Pendente'}</p>`;
    if (filters.account) {
        const acc = this.accounts.find(a => a.id === filters.account);
        if (acc) filtersInfo += `<p><strong>Conta:</strong> ${this.escapeHtml(acc.name)}</p>`;
    }
    
    printWindow.document.write(`<!DOCTYPE html><html><head><title>Extrato Smart Wallet</title><style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 900px; margin: 0 auto; }
        .header { border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #6366f1; margin: 0 0 5px 0; }
        .header .subtitle { color: #64748b; font-size: 0.9rem; }
        .filters-info { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; font-size: 0.9rem; }
        th { background: #f1f5f9; font-weight: 600; }
        .total-row { background: #f8fafc; font-weight: 700; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #6366f1; font-size: 0.85rem; color: #64748b; text-align: center; }
        @media print { body { padding: 20px; } }
    </style></head><body>
        <div class="header">
            <h1>Smart Wallet - Extrato</h1>
            <div class="subtitle">Período: ${document.getElementById('currentMonth').textContent}</div>
        </div>
        ${filtersInfo ? `<div class="filters-info"><strong>Filtros aplicados:</strong>${filtersInfo}</div>` : ''}
        <table>
            <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Pagamento</th><th>Status</th><th>Valor</th></tr></thead>
            <tbody>
                ${filtered.sort((a,b) => new Date(a.date) - new Date(b.date)).map(t => {
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
                }).join('')}
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="6" style="text-align:right;">Total:</td>
                    <td style="text-align:right; font-size:1.1rem;">${this.formatCurrency(filtered.reduce((s, t) => s + t.amount, 0))}</td>
                </tr>
            </tfoot>
        </table>
        <div class="footer">Smart Wallet • Gerado em ${new Date().toLocaleString('pt-BR')}<br>Idealizado por RogerElizar™</div>
    </body></html>`);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 250);
}

// Modifique printManual para carregar apenas o manual:
window.printManual = function() {
    const manualContent = document.getElementById('manualContent').innerHTML;
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
        ${manualContent}
        <div class="footer">Smart Wallet • Idealizado por RogerElizar™</div>
    </body></html>`);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 250);
};
        { text: "A paciência é a virtude dos investidores bem-sucedidos.", author: "Peter Lynch" },
        { text: "Investir em conhecimento paga os melhores juros.", author: "Benjamin Franklin" },
        { text: "A educação financeira é a base da liberdade financeira.", author: "Robert Kiyosaki" },
        { text: "O futuro pertence àqueles que se preparam hoje.", author: "Malcolm X" },
        { text: "Ricos adquirem ativos. Pobres adquirem passivos que acham serem ativos.", author: "Robert Kiyosaki" },
        { text: "A prosperidade depende mais da sua mentalidade do que da sua conta bancária.", author: "T. Harv Eker" }
    ];

    const PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'scheduled', name: 'Agendamento', icon: '📅' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

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

    const manualHTML = `
        <div style="text-align:center; padding:60px 30px; border:3px solid var(--primary-color); border-radius:16px; margin-bottom:40px; background:var(--gradient-card);">
            <h1 style="font-size:2.5rem; margin-bottom:16px; color:var(--primary-color);">📘 Manual do Usuário</h1>
            <h2 style="font-size:1.5rem; margin-bottom:30px; color:var(--accent-color);">Smart Wallet</h2>
            <p style="font-size:1.1rem; margin-bottom:10px;">Controle Financeiro Pessoal Inteligente</p>
            <p style="font-size:0.95rem; color:var(--text-secondary); margin-top:40px;">Versão 2.0 - 2026</p>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:10px;">Idealizado por RogerElizar™</p>
        </div>

        <div class="manual-quote">
            <p>"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."</p>
            <div class="quote-author">— Tiago 1:17</div>
        </div>
        <p style="font-size:1rem; line-height:1.8; margin:20px 0;">Agradeço a Deus por toda sabedoria, saúde e recursos que me permitiram desenvolver este projeto.</p>
        <div style="margin-top:30px; padding-top:20px; border-top:2px solid var(--primary-color);">
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
        <h3>📈 Gráficos Inteligentes</h3>
        <ul>
            <li><strong>Entradas e Saídas:</strong> 2 meses anteriores, atual e 3 posteriores</li>
            <li><strong>Cartões de Crédito:</strong> Evolução de 6 meses</li>
            <li><strong>Despesas por Categoria:</strong> Barras horizontais</li>
            <li><strong>Reservas e Investimentos:</strong> Acompanhamento de crescimento</li>
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

        <div style="text-align:center; margin-top:40px; padding:30px; background:var(--gradient-card); border-radius:16px;">
            <h3 style="margin-bottom:16px;">🙏 Bênção Final</h3>
            <div class="manual-quote">
                <p>Que Deus abençoe sua jornada financeira. Que você tenha sabedoria para administrar, generosidade para compartilhar e disciplina para perseverar.</p>
                <div class="quote-author">— RogerElizar™</div>
            </div>
        </div>
    `;

    class SmartWallet {
        constructor() {
            this.transactions = this.loadFromStorage('smartwallet_transactions', []);
            this.categories = this.loadFromStorage('smartwallet_categories', this.getDefaultCategories());
            this.cards = this.loadFromStorage('smartwallet_cards', []);
            this.cardPurchases = this.loadFromStorage('smartwallet_card_purchases', []);
            this.accounts = this.loadFromStorage('smartwallet_accounts', []);
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

        getDefaultCategories() { return JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)); }

        init() {
            this.applyTheme();
            this.applyPrivacy();
            this.setupEventListeners();
            this.setDefaultDate();
            this.updateMonthDisplay();
            this.populateCategorySelects();
            this.populatePaymentMethodSelects();
            this.setupGoalForm();
            this.render();
            this.initCharts();
            this.updateAlertBadge();
            this.setupConnectionHandler();
            this.setupStorageSync();
            this.setupKeyboardShortcuts();
            this.setupGlobalErrorHandlers();
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
            } catch { return def; }
        }

        saveTransactions() { try { localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions)); } catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); } }
        saveCategories() { try { localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories)); } catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); } }
        saveCards() { try { localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards)); } catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); } }
        saveCardPurchases() { try { localStorage.setItem('smartwallet_card_purchases', JSON.stringify(this.cardPurchases)); } catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); } }
        saveAccounts() { try { localStorage.setItem('smartwallet_accounts', JSON.stringify(this.accounts)); } catch (e) { if (e.name === 'QuotaExceededError') this.showToast('⚠️ Armazenamento cheio!'); } }

        setupEventListeners() {
            const safeAddListener = (id, event, handler) => { const el = document.getElementById(id); if (el) el.addEventListener(event, handler); };
            safeAddListener('transactionForm', 'submit', e => { e.preventDefault(); this.addTransaction(); });
            safeAddListener('editForm', 'submit', e => { e.preventDefault(); this.updateTransaction(); });
            safeAddListener('recurring', 'change', e => { const opts = document.getElementById('recurringOptions'); if (opts) opts.style.display = e.target.checked ? 'block' : 'none'; });
            safeAddListener('editRecurring', 'change', e => { const opts = document.getElementById('editRecurringOptions'); if (opts) opts.style.display = e.target.checked ? 'block' : 'none'; });
            safeAddListener('searchFilter', 'input', () => { clearTimeout(this.searchTimeout); this.searchTimeout = setTimeout(() => this.render(), 300); });
            safeAddListener('typeFilter', 'change', () => { this.filterCategoriesByType('categoryFilter', document.getElementById('typeFilter').value); this.render(); });
            safeAddListener('categoryFilter', 'change', () => this.render());
            safeAddListener('statusFilter', 'change', () => this.render());

            ['newTransactionModal', 'editModal', 'categoryModal', 'exportModal', 'goalModal', 'importCsvModal', 'importBackupModal', 'clearDataModal', 'creditCardsModal', 'newCardModal', 'invoiceModal', 'newPurchaseModal', 'billsModal', 'manualModal', 'thanksModal', 'accountsModal', 'newAccountModal'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('click', e => { if (e.target.id === id) e.target.classList.remove('active'); });
            });
        }

        setDefaultDate() { document.getElementById('date').value = new Date().toISOString().split('T')[0]; }

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

        formatMonthYear(date) { const m = String(date.getMonth() + 1).padStart(2, '0'); return `${m}-${date.getFullYear()}`; }

        getMonthTransactions(date = this.currentMonth) {
            const m = date.getMonth(), y = date.getFullYear();
            return this.transactions.filter(t => { const d = new Date(t.date + 'T00:00:00'); return d.getMonth() === m && d.getFullYear() === y; });
        }

        populateCategorySelects() {
            const selects = [document.getElementById('category'), document.getElementById('editCategory'), document.getElementById('categoryFilter'), document.getElementById('purchaseCategory')];
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
            this.filterCategoriesByType('categoryFilter', document.getElementById('typeFilter').value);
        }

        populatePaymentMethodSelects() {
            const selects = [document.getElementById('paymentMethod'), document.getElementById('editPaymentMethod')];
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

        getCategoryById(id) { return this.categories.find(c => c.id === id) || { name: 'Sem categoria', color: '#6b7280', type: 'expense' }; }
        findCategoryByName(name) { return this.categories.find(c => c.name.toLowerCase() === name.toLowerCase()); }
        getCardById(id) { return this.cards.find(c => c.id === id); }

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

        addCategory() {
            const name = document.getElementById('newCategoryName').value.trim();
            const color = document.getElementById('newCategoryColor').value;
            if (!name) return this.showToast('Digite um nome');
            if (this.categories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.type === this.newCategoryType)) return this.showToast('Categoria já existe');
            this.categories.push({ id: name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now(), name, color, type: this.newCategoryType });
            this.saveCategories(); this.populateCategorySelects(); this.renderCategoryList();
            document.getElementById('newCategoryName').value = '';
            this.showToast('Categoria adicionada!');
        }

        deleteCategory(id) {
            if (this.transactions.some(t => t.category === id)) {
                if (!confirm('Categoria em uso. Remover mesmo assim?')) return;
                this.transactions.forEach(t => { if (t.category === id) t.category = ''; });
                this.saveTransactions();
            }
            this.categories = this.categories.filter(c => c.id !== id);
            this.saveCategories(); this.populateCategorySelects(); this.renderCategoryList(); this.render();
            this.showToast('Categoria removida!');
        }

        renderCategoryList() {
            const c = document.getElementById('categoryList');
            if (!this.categories.length) return c.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma categoria</p>';
            c.innerHTML = this.categories.map(cat => `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:var(--input-bg); border-radius:12px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="width:20px; height:20px; border-radius:50%; background:${cat.color}; display:inline-block;"></span>
                        <div>
                            <div style="font-weight:500;">${this.escapeHtml(cat.name)}</div>
                            <div style="font-size:0.75rem; color:var(--text-secondary);">${cat.type === 'income' ? '💰 Receita' : '💸 Despesa'}</div>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-small" onclick="smartwallet.deleteCategory('${cat.id}')">🗑️</button>
                </div>
            `).join('');
        }

        addTransaction() {
            const date = document.getElementById('date').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const type = this.currentTransactionType;
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const statusOk = document.getElementById('statusOk').checked;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const isRecurring = document.getElementById('recurring').checked;

            if (!category) return this.showToast('Selecione uma categoria');
            if (!paymentMethod) return this.showToast('Selecione a forma de pagamento');

            if (paymentMethod.startsWith('card:')) {
                const cardId = paymentMethod.replace('card:', '');
                this.openCardPurchaseFromTransaction({ date, amount: Math.abs(amount), type, category, description, statusOk, cardId, isRecurring });
                closeNewTransactionModal();
                return;
            }

            const base = { date, amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount), category, description, statusOk, paymentMethod };
            if (isRecurring) {
                const rType = document.getElementById('recurrenceType').value;
                const rCount = parseInt(document.getElementById('recurrenceCount').value);
                this.createRecurring(base, rType, rCount);
                this.showToast(`${rCount} transações criadas!`);
            } else {
                base.id = Date.now(); this.transactions.push(base);
                this.showToast('Transação adicionada!');
            }
            this.saveTransactions(); this.render(); this.updateCharts();
            this.updateAlertBadge();
            closeNewTransactionModal(); this.clearForm();
        }

        openCardPurchaseFromTransaction(data) {
            document.getElementById('purchaseCardId').value = data.cardId;
            document.getElementById('purchaseDate').value = data.date;
            document.getElementById('purchaseAmount').value = data.amount;
            document.getElementById('purchaseDescription').value = data.description;
            document.getElementById('purchaseCategory').value = data.category;
            document.getElementById('purchaseInstallments').value = '1';
            document.getElementById('purchaseStatus').value = data.statusOk ? 'done' : 'pending';
            document.getElementById('newPurchaseModal').classList.add('active');
        }

        createRecurring(base, type, count) {
            const start = new Date(base.date + 'T00:00:00');
            const recurrenceGroupId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            for (let i = 0; i < count; i++) {
                const t = { ...base, id: Date.now() + i, recurrenceGroupId };
                const d = new Date(start);
                if (type === 'yearly') d.setFullYear(start.getFullYear() + i);
                else d.setMonth(start.getMonth() + i);
                t.date = d.toISOString().split('T')[0];
                t.recurrence = { type: type };
                if (type === 'installment') {
                    t.recurrence.total = count;
                    t.recurrence.current = i + 1;
                    t.description = `${base.description || ''} ${i + 1}/${count}`.trim();
                }
                this.transactions.push(t);
            }
        }

        deleteTransaction(id) {
            if (confirm('Excluir esta transação?')) {
                this.transactions = this.transactions.filter(t => t.id !== id);
                this.saveTransactions(); this.render(); this.updateCharts();
                this.updateAlertBadge();
                this.showToast('Excluída!');
                closeEditModal();
            }
        }

        deleteFromEdit() { if (this.currentEditId) this.deleteTransaction(this.currentEditId); }

        editTransaction(id) {
            const t = this.transactions.find(x => x.id === id); if (!t) return;
            this.currentEditId = t.id;
            this.currentEditType = t.amount > 0 ? 'income' : 'expense';
            document.getElementById('editId').value = t.id;
            document.getElementById('editDate').value = t.date;
            document.getElementById('editAmount').value = Math.abs(t.amount);
            document.getElementById('editCategory').value = t.category || '';
            document.getElementById('editPaymentMethod').value = t.paymentMethod || '';
            document.getElementById('editDescription').value = t.description;
            document.getElementById('editStatusOk').checked = !!t.statusOk;

            const hasRecurrence = !!t.recurrence;
            document.getElementById('editRecurring').checked = hasRecurrence;
            document.getElementById('editRecurringOptions').style.display = hasRecurrence ? 'block' : 'none';
            if (hasRecurrence) {
                document.getElementById('editRecurrenceType').value = t.recurrence.type || 'monthly';
                document.getElementById('editRecurrenceCount').value = t.recurrence.total || 2;
            } else {
                document.getElementById('editRecurrenceType').value = 'monthly';
                document.getElementById('editRecurrenceCount').value = 2;
            }

            document.querySelectorAll('#editForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === this.currentEditType));
            this.filterCategoriesByType('editCategory', this.currentEditType);
            document.getElementById('editModal').classList.add('active');
        }

        updateTransaction() {
            const id = parseInt(document.getElementById('editId').value);
            const idx = this.transactions.findIndex(t => t.id === id); if (idx === -1) return;
            const type = this.currentEditType;
            const isRecurring = document.getElementById('editRecurring').checked;
            const paymentMethod = document.getElementById('editPaymentMethod').value;

            const updated = {
                ...this.transactions[idx],
                date: document.getElementById('editDate').value,
                amount: type === 'expense' ? -Math.abs(parseFloat(document.getElementById('editAmount').value)) : Math.abs(parseFloat(document.getElementById('editAmount').value)),
                category: document.getElementById('editCategory').value,
                description: document.getElementById('editDescription').value,
                statusOk: document.getElementById('editStatusOk').checked,
                paymentMethod: paymentMethod
            };

            if (isRecurring) {
                const rType = document.getElementById('editRecurrenceType').value;
                updated.recurrence = { type: rType };
                if (rType === 'installment') {
                    updated.recurrence.total = parseInt(document.getElementById('editRecurrenceCount').value);
                    if (this.transactions[idx].recurrence && this.transactions[idx].recurrence.current) {
                        updated.recurrence.current = this.transactions[idx].recurrence.current;
                    }
                }
            } else {
                delete updated.recurrence;
            }

            if (this.transactions[idx].recurrenceGroupId) {
                this.pendingRecurrenceUpdate = { transaction: updated, originalIndex: idx, recurrenceGroupId: this.transactions[idx].recurrenceGroupId };
                this.showRecurrenceConfirmModal();
            } else {
                this.transactions[idx] = updated;
                this.saveTransactions(); this.render(); this.updateCharts();
                this.updateAlertBadge();
                closeEditModal(); this.showToast('Atualizada!');
            }
        }

        showRecurrenceConfirmModal() {
            const pending = this.pendingRecurrenceUpdate;
            if (!pending) return;
            const transaction = pending.transaction;
            const category = this.getCategoryById(transaction.category);
            const recurrenceCount = this.transactions.filter(t => t.recurrenceGroupId === pending.recurrenceGroupId).length;
            document.getElementById('recurrenceInfo').innerHTML = `
                <div class="recurrence-info-item"><span class="recurrence-info-label">Descrição:</span><span class="recurrence-info-value">${this.escapeHtml(transaction.description)}</span></div>
                <div class="recurrence-info-item"><span class="recurrence-info-label">Categoria:</span><span class="recurrence-info-value">${this.escapeHtml(category.name)}</span></div>
                <div class="recurrence-info-item"><span class="recurrence-info-label">Valor:</span><span class="recurrence-info-value">${this.formatCurrency(Math.abs(transaction.amount))}</span></div>
                <div class="recurrence-info-item"><span class="recurrence-info-label">Ocorrências:</span><span class="recurrence-info-value">${recurrenceCount} transações</span></div>
            `;
            document.getElementById('recurrenceConfirmModal').classList.add('active');
        }

        applyRecurrenceUpdate(scope) {
            const pending = this.pendingRecurrenceUpdate;
            if (!pending) return;
            const { transaction, originalIndex, recurrenceGroupId } = pending;
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const relatedTransactions = this.transactions.filter(t => t.recurrenceGroupId === recurrenceGroupId);

            if (scope === 'current') {
                this.transactions[originalIndex] = transaction;
            } else if (scope === 'future') {
                relatedTransactions.forEach(t => {
                    const tDate = new Date(t.date + 'T00:00:00');
                    if (tDate >= today) {
                        const idx = this.transactions.findIndex(tr => tr.id === t.id);
                        if (idx !== -1) this.transactions[idx] = { ...t, ...transaction };
                    }
                });
            } else if (scope === 'all') {
                relatedTransactions.forEach(t => {
                    const idx = this.transactions.findIndex(tr => tr.id === t.id);
                    if (idx !== -1) this.transactions[idx] = { ...t, ...transaction };
                });
            }

            this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
            closeEditModal(); closeRecurrenceConfirmModal();
            const scopeText = scope === 'current' ? 'apenas esta transação' : scope === 'future' ? 'esta e as futuras ocorrências' : 'todas as ocorrências';
            this.showToast(`Atualizada! (${scopeText})`);
            this.pendingRecurrenceUpdate = null;
        }

        clearForm() {
            document.getElementById('transactionForm').reset(); this.setDefaultDate();
            document.getElementById('recurringOptions').style.display = 'none';
            this.currentTransactionType = 'expense';
            document.querySelectorAll('#transactionForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === 'expense'));
            this.filterCategoriesByType('category', 'expense');
        }

        setupGoalForm() {
            document.getElementById('goalForm').addEventListener('submit', e => {
                e.preventDefault();
                this.goal = parseFloat(document.getElementById('goalAmount').value);
                this.monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
                localStorage.setItem('smartwallet_goal', this.goal);
                localStorage.setItem('smartwallet_monthly_contribution', this.monthlyContribution);
                this.calculateGoalResult(); this.updateDashboard();
                this.showToast('Meta configurada!');
            });
            document.getElementById('goalAmount').value = this.goal || '';
            document.getElementById('monthlyContribution').value = this.monthlyContribution || '';
        }

        calculateGoalResult() {
            const el = document.getElementById('goalResult');
            const goal = this.goal, contrib = this.monthlyContribution;
            const totalBal = this.transactions.reduce((s, t) => s + t.amount, 0);
            const rem = Math.max(0, goal - totalBal);
            if (!goal || !contrib || contrib <= 0) { el.style.display = 'block'; el.innerHTML = '<p style="color:var(--danger-color); font-weight:500;">Preencha os campos corretamente.</p>'; return; }
            if (rem <= 0) { el.style.display = 'block'; el.innerHTML = '<p style="color:var(--success-color); font-weight:500;">🎉 Parabéns! Meta já atingida!</p>'; return; }
            const months = Math.ceil(rem / contrib);
            const years = Math.floor(months / 12);
            const remM = months % 12;
            let timeStr = years > 0 ? `${years} ano${years > 1 ? 's' : ''} ` : '';
            timeStr += remM > 0 ? `${remM} mês${remM > 1 ? 'es' : ''}` : '1 mês';
            el.style.display = 'block';
            el.innerHTML = `<div style="font-weight:500; margin-bottom:6px;">⏱️ Tempo estimado:</div><div style="font-size:1.2rem; font-weight:700; color:var(--primary-color);">${timeStr}</div><div style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">Faltam: ${this.formatCurrency(rem)} com aporte de ${this.formatCurrency(contrib)}/mês</div>`;
        }

        getFilteredTransactions() {
            const search = document.getElementById('searchFilter').value.toLowerCase();
            const catFilter = document.getElementById('categoryFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;
            return this.getMonthTransactions().filter(t => {
                const cat = this.getCategoryById(t.category);
                const matchesStatus = !statusFilter || (statusFilter === 'done' ? t.statusOk : !t.statusOk);
                return (!search || t.description.toLowerCase().includes(search) || cat.name.toLowerCase().includes(search)) &&
                    (!catFilter || t.category === catFilter) &&
                    (!typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0)) &&
                    matchesStatus;
            });
        }

        formatCurrency(v) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v); }
        formatDate(d) { return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR'); }
        escapeHtml(t) { const d = document.createElement('div'); d.textContent = t || ''; return d.innerHTML; }

        getRecurrenceDisplay(t) {
            if (!t.recurrence) return '';
            if (t.recurrence.type === 'installment') return `<span class="recurrence-badge">📅 ${t.recurrence.current}/${t.recurrence.total}</span>`;
            else if (t.recurrence.type === 'monthly') return '<span class="recurrence-badge">📅 Mensal</span>';
            else if (t.recurrence.type === 'yearly') return '<span class="recurrence-badge">📅 Anual</span>';
            return '';
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
            const bar = document.querySelector('.goal-bar');
            const fill = document.getElementById('goalBarFill');
            goalEl.textContent = this.formatCurrency(creditCardTotal);
            goalEl.className = 'card-value privacy-value negative';
            if (bar) bar.style.display = 'none';
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
            if (typeof Chart === 'undefined') { console.error('Chart.js não carregado!'); return; }
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

            try {
                this.charts.invest = new Chart(document.getElementById('investChart').getContext('2d'), {
                    type: 'line',
                    data: { labels: [], datasets: [
                        { label: 'Reservas', data: [], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4, fill: true },
                        { label: 'Investimentos', data: [], borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', tension: 0.4, fill: true }
                    ] },
                    options: lineOpts
                });
            } catch (e) { console.error('Erro invest:', e); }

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

            if (this.charts.invest) {
                const invLabels = [], resData = [], invData = [];
                for (let i = -2; i <= 3; i++) {
                    const d = new Date(this.currentMonth);
                    d.setMonth(d.getMonth() + i);
                    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                    invLabels.push(`${months[d.getMonth()]}/${d.getFullYear()}`);
                    const mt = this.getMonthTransactions(d);
                    const res = mt.filter(t => t.category === 'reserva').reduce((s, t) => s + Math.abs(t.amount), 0);
                    const inv = mt.filter(t => t.category === 'investimento').reduce((s, t) => s + Math.abs(t.amount), 0);
                    resData.push(res);
                    invData.push(inv);
                }
                this.charts.invest.data.labels = invLabels;
                this.charts.invest.data.datasets[0].data = resData;
                this.charts.invest.data.datasets[1].data = invData;
                this.charts.invest.update();
            }
        }

        exportCSV() {
            const mt = this.getMonthTransactions();
            if (!mt.length) return this.showToast('Nenhuma transação no mês.');
            let csv = '\ufeffData;Descrição;Categoria;Tipo;Pagamento;Status;Recorrência;Valor\n';
            mt.sort((a,b) => new Date(a.date)-new Date(b.date)).forEach(t => {
                const c = this.getCategoryById(t.category);
                const status = t.statusOk ? 'Concluído' : 'Pendente';
                const payment = this.getPaymentMethodName(t.paymentMethod).replace(/[💳⚡💰🔄️]/g, '').trim();
                let recurrence = '';
                if (t.recurrence) {
                    if (t.recurrence.type === 'installment') recurrence = `${t.recurrence.current}/${t.recurrence.total}`;
                    else if (t.recurrence.type === 'monthly') recurrence = 'Mensal';
                    else if (t.recurrence.type === 'yearly') recurrence = 'Anual';
                }
                csv += `${t.date};"${(t.description||'').replace(/"/g,'""')}";"${c.name}";${t.amount>0?'Receita':'Despesa'};"${payment}";${status};${recurrence};${Math.abs(t.amount).toFixed(2)}\n`;
            });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `extrato_${this.formatMonthYear(this.currentMonth)}.csv`;
            a.click();
            this.showToast('CSV exportado!'); closeExportModal();
        }

        importCSV() {
            if (!this.pendingCsvData) return this.showToast('Selecione um arquivo CSV primeiro');
            const replace = document.getElementById('csvReplaceData').checked;
            const lines = this.pendingCsvData.split(/\r?\n/).filter(l => l.trim());
            if (lines.length < 2) return this.showToast('CSV vazio ou inválido');
            let imported = 0, skipped = 0;
            const header = lines[0].toLowerCase();
            if (!header.includes('data') || !header.includes('valor')) return this.showToast('Formato CSV inválido.');
            const transactionsToAdd = [];
            for (let i = 1; i < lines.length; i++) {
                const cols = this.parseCSVLine(lines[i]);
                if (cols.length < 6) { skipped++; continue; }
                const [date, desc, catName, tipo, payment, status, valor] = cols;
                if (!date || !valor) { skipped++; continue; }
                const category = this.findCategoryByName(catName);
                const amount = parseFloat(valor.replace(',', '.'));
                if (isNaN(amount)) { skipped++; continue; }
                const signedAmount = tipo.toLowerCase().includes('despesa') ? -Math.abs(amount) : Math.abs(amount);
                let paymentMethod = 'pix';
                const payLower = (payment || '').toLowerCase();
                if (payLower.includes('pix')) paymentMethod = 'pix';
                else if (payLower.includes('débito') || payLower.includes('debit')) paymentMethod = 'debit';
                else if (payLower.includes('automático') || payLower.includes('automatic')) paymentMethod = 'auto';
                else if (payLower.includes('agend')) paymentMethod = 'scheduled';
                else if (payLower.includes('transf')) paymentMethod = 'transfer';
                transactionsToAdd.push({
                    id: Date.now() + i + Math.random() * 1000,
                    date: date, amount: signedAmount,
                    category: category ? category.id : '',
                    description: desc, statusOk: status.toLowerCase().includes('conclu'),
                    paymentMethod: paymentMethod
                });
                imported++;
            }
            if (replace) {
                const m = this.currentMonth.getMonth(), y = this.currentMonth.getFullYear();
                this.transactions = this.transactions.filter(t => {
                    const d = new Date(t.date + 'T00:00:00');
                    return !(d.getMonth() === m && d.getFullYear() === y);
                });
            }
            this.transactions.push(...transactionsToAdd);
            this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
            closeImportCsvModal();
            this.showToast(`${imported} transações importadas!${skipped > 0 ? ` (${skipped} ignoradas)` : ''}`);
            this.pendingCsvData = null;
        }

        parseCSVLine(line) {
            const result = []; let current = ''; let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const c = line[i];
                if (c === '"') { if (inQuotes && line[i+1] === '"') { current += '"'; i++; } else inQuotes = !inQuotes; }
                else if (c === ';' && !inQuotes) { result.push(current.trim()); current = ''; }
                else { current += c; }
            }
            result.push(current.trim());
            return result;
        }

        exportBackup() {
            try {
                const backup = {
                    version: '2.2', exportDate: new Date().toISOString(),
                    appName: 'Smart Wallet', appVersion: '2.0',
                    transactions: this.transactions || [],
                    categories: this.categories || this.getDefaultCategories(),
                    cards: this.cards || [],
                    cardPurchases: this.cardPurchases || [],
                    accounts: this.accounts || [],
                    goal: this.goal || 0,
                    monthlyContribution: this.monthlyContribution || 0,
                    privacyOn: this.privacyOn || false,
                    darkMode: this.darkMode !== false
                };
                const jsonString = JSON.stringify(backup, null, 2);
                const blob = new Blob(['\ufeff' + jsonString], { type: 'application/json;charset=utf-8' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                const dateStr = new Date().toISOString().split('T')[0];
                const timeStr = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
                a.download = `smart_wallet_backup_${dateStr}_${timeStr}.json`;
                document.body.appendChild(a); a.click(); document.body.removeChild(a);
                URL.revokeObjectURL(a.href);
                this.showToast('✅ Backup exportado!');
                document.getElementById('mainMenu').classList.remove('active');
            } catch (e) { this.showToast('❌ Erro: ' + e.message); }
        }

        importBackup() {
            if (!this.pendingBackupData) return this.showToast('⚠️ Selecione um arquivo');
            try {
                let cleanData = this.pendingBackupData;
                if (cleanData.charCodeAt(0) === 0xFEFF) cleanData = cleanData.substring(1);
                cleanData = cleanData.trim();
                if (!cleanData) return this.showToast('❌ Arquivo vazio!');
                let data;
                try { data = JSON.parse(cleanData); }
                catch (parseError) { return this.showToast('❌ JSON inválido.'); }
                if (!data || typeof data !== 'object') return this.showToast('❌ Estrutura inválida');

                const validTransactions = (data.transactions || []).filter(t => t && typeof t === 'object');
                const validCategories = (data.categories || []).filter(c => c && c.id && c.name);
                const cards = (data.cards || []).filter(c => c && typeof c === 'object');
                const cardPurchases = (data.cardPurchases || []).filter(p => p && typeof p === 'object');
                const accounts = (data.accounts || []).filter(a => a && typeof a === 'object');
                const goal = typeof data.goal === 'number' ? data.goal : 0;
                const monthlyContribution = typeof data.monthlyContribution === 'number' ? data.monthlyContribution : 0;
                const privacyOn = data.privacyOn === true;
                const darkMode = data.darkMode !== false;

                if (!confirm(`⚠️ Substituir TODOS os dados?\n\n• ${validTransactions.length} transações\n• ${validCategories.length} categorias\n• ${cards.length} cartões\n• ${accounts.length} contas`)) {
                    return this.showToast('Cancelado');
                }

                this.transactions = validTransactions;
                this.categories = validCategories.length > 0 ? validCategories : this.getDefaultCategories();
                this.cards = cards;
                this.cardPurchases = cardPurchases;
                this.accounts = accounts;
                this.goal = goal;
                this.monthlyContribution = monthlyContribution;
                this.privacyOn = privacyOn;
                this.darkMode = darkMode;

                this.saveTransactions(); this.saveCategories(); this.saveCards();
                this.saveCardPurchases(); this.saveAccounts();
                localStorage.setItem('smartwallet_goal', this.goal);
                localStorage.setItem('smartwallet_monthly_contribution', this.monthlyContribution);
                localStorage.setItem('smartwallet_privacy', this.privacyOn);
                localStorage.setItem('smartwallet_dark', this.darkMode);

                this.populateCategorySelects(); this.populatePaymentMethodSelects();
                this.applyTheme(); this.applyPrivacy();
                document.getElementById('goalAmount').value = this.goal || '';
                document.getElementById('monthlyContribution').value = this.monthlyContribution || '';
                this.render(); this.updateCharts(); this.updateAlertBadge();
                closeImportBackupModal();
                this.showToast('✅ Backup restaurado!');
                this.pendingBackupData = null;
            } catch (e) { this.showToast('❌ Erro: ' + e.message); }
        }

        clearAllData() {
            this.transactions = []; this.categories = this.getDefaultCategories();
            this.cards = []; this.cardPurchases = []; this.accounts = [];
            this.goal = 0; this.monthlyContribution = 0;
            this.saveTransactions(); this.saveCategories(); this.saveCards();
            this.saveCardPurchases(); this.saveAccounts();
            localStorage.setItem('smartwallet_goal', 0);
            localStorage.setItem('smartwallet_monthly_contribution', 0);
            this.populateCategorySelects(); this.populatePaymentMethodSelects();
            document.getElementById('goalAmount').value = '';
            document.getElementById('monthlyContribution').value = '';
            this.render(); this.updateCharts(); this.updateAlertBadge();
            closeClearDataModal();
            this.showToast('🗑️ Dados apagados!');
        }

        getUpcomingBills() {
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const in3Days = new Date(today); in3Days.setDate(in3Days.getDate() + 3);
            return this.transactions.filter(t => {
                if (t.statusOk || t.amount >= 0) return false;
                const tDate = new Date(t.date + 'T00:00:00');
                return tDate <= in3Days;
            }).sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        updateAlertBadge() {
            const bills = this.getUpcomingBills();
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

        renderBillsModal() {
            const bills = this.getUpcomingBills();
            const container = document.getElementById('billsList');
            if (bills.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px;">✅</div><h3>Nenhuma conta pendente!</h3><p>Todas as contas estão em dia.</p></div>`;
                return;
            }
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const total = bills.reduce((s, b) => s + Math.abs(b.amount), 0);
            container.innerHTML = `
                <div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">
                    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total de contas</span><span style="font-weight:600;">${bills.length}</span></div>
                    <div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700; font-size:1.1rem;"><span>Total a pagar</span><span style="color:var(--danger-color);">${this.formatCurrency(total)}</span></div>
                </div>
                ${bills.map(bill => {
                    const cat = this.getCategoryById(bill.category);
                    const billDate = new Date(bill.date + 'T00:00:00');
                    const diffDays = Math.round((billDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    let daysClass = 'warning', daysText = '', itemClass = '';
                    if (diffDays < 0) { daysClass = 'overdue'; daysText = `${Math.abs(diffDays)}d atrasada`; itemClass = 'overdue'; }
                    else if (diffDays === 0) { daysClass = 'urgent'; daysText = 'Vence hoje'; itemClass = 'urgent'; }
                    else if (diffDays === 1) { daysClass = 'urgent'; daysText = 'Vence amanhã'; itemClass = 'urgent'; }
                    else { daysText = `Em ${diffDays} dias`; }
                    return `<div class="bill-item ${itemClass}"><div class="bill-info"><div class="bill-desc">${this.escapeHtml(bill.description)}<span class="bill-days ${daysClass}">${daysText}</span></div><div class="bill-meta"><span>📅 ${this.formatDate(bill.date)}</span><span style="color:${cat.color};">● ${this.escapeHtml(cat.name)}</span></div></div><div class="bill-amount">${this.formatCurrency(Math.abs(bill.amount))}</div><div style="display:flex; gap:4px;"><button class="btn btn-success btn-small" onclick="smartwallet.markBillAsPaid(${bill.id})">✓</button><button class="btn btn-secondary btn-small" onclick="smartwallet.editTransaction(${bill.id}); closeBillsModal();">✏️</button></div></div>`;
                }).join('')}
            `;
        }

        markBillAsPaid(id) {
            const idx = this.transactions.findIndex(t => t.id === id);
            if (idx === -1) return;
            this.transactions[idx].statusOk = true;
            this.saveTransactions(); this.render(); this.updateAlertBadge(); this.renderBillsModal();
            this.showToast('✓ Conta paga!');
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
            if (!name) return this.showToast('Informe o nome');
            if (id) {
                const idx = this.cards.findIndex(c => c.id === id);
                if (idx !== -1) this.cards[idx] = { ...this.cards[idx], name, brand, last4, closingDay, dueDay, limit, color };
            } else {
                this.cards.push({ id: 'card_' + Date.now(), name, brand, last4, closingDay, dueDay, limit, color });
            }
            this.saveCards(); this.populatePaymentMethodSelects(); this.renderCreditCardsList();
            closeNewCardModal();
            this.showToast(id ? 'Cartão atualizado!' : 'Cartão cadastrado!');
        }

        deleteCard(id) {
            const purchases = this.cardPurchases.filter(p => p.cardId === id);
            if (purchases.length > 0) {
                if (!confirm(`Este cartão tem ${purchases.length} compra(s). Remover mesmo assim?`)) return;
                this.cardPurchases = this.cardPurchases.filter(p => p.cardId !== id);
                this.saveCardPurchases();
            }
            this.cards = this.cards.filter(c => c.id !== id);
            this.saveCards(); this.populatePaymentMethodSelects(); this.renderCreditCardsList();
            this.showToast('Cartão removido!');
        }

        editCard(id) {
            const card = this.getCardById(id); if (!card) return;
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

        getInvoicePeriod(card) {
            const now = new Date();
            let closingDate = new Date(now.getFullYear(), now.getMonth(), card.closingDay);
            if (now.getDate() < card.closingDay) closingDate = new Date(now.getFullYear(), now.getMonth() - 1, card.closingDay);
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

        getInstallmentAmount(purchase) {
            if (!purchase.installments || purchase.installments <= 1) return purchase.amount;
            return purchase.amount / purchase.installments;
        }

        calculateInvoiceTotal(card, purchases, startDate, closingDate) {
            let total = 0;
            purchases.forEach(p => {
                const pDate = new Date(p.date + 'T00:00:00');
                const installmentAmount = this.getInstallmentAmount(p);
                if (p.installments && p.installments > 1) {
                    for (let i = 0; i < p.installments; i++) {
                        const installmentDate = new Date(pDate);
                        installmentDate.setMonth(installmentDate.getMonth() + i);
                        if (installmentDate >= startDate && installmentDate <= closingDate) total += installmentAmount;
                    }
                } else {
                    total += p.amount;
                }
            });
            return total;
        }

        renderCreditCardsList() {
            const container = document.getElementById('creditCardsList');
            if (!this.cards.length) {
                container.innerHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">💳</div><h3>Nenhum cartão cadastrado</h3><p>Clique em "Novo Cartão" para começar</p></div>`;
                return;
            }
            container.innerHTML = '<div class="credit-cards-grid">' + this.cards.map(card => {
                const period = this.getInvoicePeriod(card);
                const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
                const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
                const available = card.limit - total;
                const usedPct = Math.min(100, (total / card.limit) * 100);
                return `<div class="credit-card-visual" style="background:linear-gradient(135deg, ${card.color} 0%, ${this.adjustColor(card.color, -30)} 100%);" onclick="openInvoiceModal('${card.id}')"><div class="cc-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editCard('${card.id}')" title="Editar">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteCard('${card.id}')" title="Excluir">🗑️</button></div><div class="cc-header"><div class="cc-brand">${this.escapeHtml(card.brand)}</div><div class="cc-chip"></div></div><div class="cc-name">${this.escapeHtml(card.name)}</div><div class="cc-number">•••• •••• •••• ${this.escapeHtml(card.last4 || '****')}</div><div class="cc-footer"><div><div class="cc-label">Fatura Atual</div><div class="cc-value">${this.formatCurrency(total)}</div></div><div style="text-align:right;"><div class="cc-label">Disponível</div><div class="cc-value">${this.formatCurrency(available)}</div></div></div><div style="position:absolute; bottom:0; left:0; right:0; height:4px; background:rgba(0,0,0,0.3);"><div style="height:100%; width:${usedPct}%; background:${usedPct > 80 ? '#ef4444' : usedPct > 50 ? '#f59e0b' : '#10b981'};"></div></div></div>`;
            }).join('') + '</div>';
        }

        adjustColor(color, amount) {
            const hex = color.replace('#', '');
            const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
            const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
            const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
            return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        }

        openInvoice(cardId) {
            const card = this.getCardById(cardId); if (!card) return;
            const period = this.getInvoicePeriod(card);
            const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
            const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
            const minimum = total * 0.15;
            const available = card.limit - total;

            document.getElementById('invoiceTitle').textContent = `Fatura - ${card.name}`;
            document.getElementById('invoiceContent').innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
                    <div><div style="font-size:0.85rem; color:var(--text-secondary);">Período</div><div style="font-weight:600;">${this.formatDate(period.startDate.toISOString().split('T')[0])} - ${this.formatDate(period.closingDate.toISOString().split('T')[0])}</div></div>
                    <div style="text-align:right;"><div style="font-size:0.85rem; color:var(--text-secondary);">Vencimento</div><div style="font-weight:600; color:var(--warning-color);">${this.formatDate(period.dueDate.toISOString().split('T')[0])}</div></div>
                </div>
                <div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">
                    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Limite Total</span><span style="font-weight:600;">${this.formatCurrency(card.limit)}</span></div>
                    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total da Fatura</span><span style="font-weight:600; color:var(--danger-color);">${this.formatCurrency(total)}</span></div>
                    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Mínimo (15%)</span><span style="font-weight:600;">${this.formatCurrency(minimum)}</span></div>
                    <div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700;"><span>Disponível</span><span style="color:var(--success-color);">${this.formatCurrency(available)}</span></div>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                    <h3 style="font-size:1.1rem;">Compras (${purchases.length})</h3>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-secondary btn-small" onclick="smartwallet.exportInvoiceCSV('${cardId}')">📥 CSV</button>
                        <button class="btn btn-secondary btn-small" onclick="smartwallet.printInvoicePDF('${cardId}')">🖨️ PDF</button>
                    </div>
                </div>
                <div>${purchases.length === 0 ? '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma compra</p>' :
                    purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).map(p => {
                        const cat = this.getCategoryById(p.category);
                        const installmentInfo = p.installments > 1 ? ` • ${p.installments}x de ${this.formatCurrency(this.getInstallmentAmount(p))}` : '';
                        return `<div style="background:var(--input-bg); border-radius:12px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:12px;"><div style="flex:1;"><div style="font-weight:600;">${this.escapeHtml(p.description)}</div><div style="font-size:0.8rem; color:var(--text-secondary); display:flex; gap:10px;"><span>${this.formatDate(p.date)}</span><span style="color:${cat.color};">● ${this.escapeHtml(cat.name)}</span>${installmentInfo}</div></div><div style="font-weight:700;">${this.formatCurrency(p.amount)}</div><button class="btn btn-danger btn-small" onclick="smartwallet.deletePurchase(${p.id}, '${cardId}')">🗑️</button></div>`;
                    }).join('')}
                </div>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">
                    <button class="btn btn-primary" onclick="openNewPurchaseModal('${cardId}')">➕ Nova Compra</button>
                    <button class="btn btn-success" onclick="smartwallet.payInvoice('${cardId}')">💰 Pagar Fatura</button>
                    <button class="btn btn-secondary" onclick="closeInvoiceModal()">Fechar</button>
                </div>
            `;
            document.getElementById('invoiceModal').classList.add('active');
        }

        savePurchase() {
            const cardId = document.getElementById('purchaseCardId').value;
            const date = document.getElementById('purchaseDate').value;
            const amount = parseFloat(document.getElementById('purchaseAmount').value);
            const description = document.getElementById('purchaseDescription').value.trim();
            const category = document.getElementById('purchaseCategory').value;
            const installments = parseInt(document.getElementById('purchaseInstallments').value);
            const status = document.getElementById('purchaseStatus').value;
            if (!cardId || !date || !amount || !description || !category) return this.showToast('Preencha todos os campos');

            this.cardPurchases.push({
                id: Date.now(), cardId, date, amount, description, category, installments,
                status: status === 'done'
            });

            const card = this.getCardById(cardId);
            const installmentAmount = installments > 1 ? amount / installments : amount;
            this.transactions.push({
                id: Date.now() + 1,
                date: date,
                amount: -installmentAmount,
                category: category,
                description: `${description} (${card ? card.name : 'Cartão'})${installments > 1 ? ' - Parcela 1/' + installments : ''}`,
                statusOk: status === 'done',
                paymentMethod: `card:${cardId}`,
                source: 'card_purchase'
            });

            this.saveCardPurchases();
            this.saveTransactions();
            this.renderCreditCardsList();
            this.render();
            this.updateCharts();
            closeNewPurchaseModal();
            this.openInvoice(cardId);
            this.showToast('Compra registrada!');
        }

        deletePurchase(id, cardId) {
            if (!confirm('Excluir esta compra?')) return;
            const purchase = this.cardPurchases.find(p => p.id === id);
            if (purchase) {
                this.transactions = this.transactions.filter(t => !(t.source === 'card_purchase' && t.description.includes(purchase.description)));
                this.saveTransactions();
            }
            this.cardPurchases = this.cardPurchases.filter(p => p.id !== id);
            this.saveCardPurchases();
            this.render();
            this.updateCharts();
            this.openInvoice(cardId);
            this.showToast('Compra excluída!');
        }

        payInvoice(cardId) {
            const card = this.getCardById(cardId); if (!card) return;
            const period = this.getInvoicePeriod(card);
            const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
            const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
            if (total <= 0) return this.showToast('Fatura sem valor');
            if (!confirm(`Pagar fatura de ${this.formatCurrency(total)}?`)) return;
            this.transactions.push({
                id: Date.now(), date: new Date().toISOString().split('T')[0],
                amount: -total, category: 'inst_financeira',
                description: `Pagamento Fatura ${card.name} - ${period.dueDate.toLocaleDateString('pt-BR')}`,
                statusOk: false, paymentMethod: 'pix'
            });
            this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
            this.showToast('Pagamento registrado!');
        }

        exportInvoiceCSV(cardId) {
            const card = this.getCardById(cardId); if (!card) return;
            const period = this.getInvoicePeriod(card);
            const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
            let csv = `\ufeffFATURA - ${card.name}\n`;
            csv += `Período:;${this.formatDate(period.startDate.toISOString().split('T')[0])} a ${this.formatDate(period.closingDate.toISOString().split('T')[0])}\n`;
            csv += `Vencimento:;${this.formatDate(period.dueDate.toISOString().split('T')[0])}\n\n`;
            csv += 'Data;Descrição;Categoria;Parcelas;Valor Total;Valor Parcela\n';
            purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(p => {
                const cat = this.getCategoryById(p.category);
                const installmentAmount = this.getInstallmentAmount(p);
                csv += `${p.date};"${(p.description||'').replace(/"/g,'""')}";"${cat.name}";${p.installments || 1}x;${p.amount.toFixed(2)};${installmentAmount.toFixed(2)}\n`;
            });
            const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
            csv += `\nTOTAL DA FATURA;;;${this.formatCurrency(total)}\n`;
            csv += `PAGAMENTO MÍNIMO;;;${this.formatCurrency(total * 0.15)}\n`;
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `fatura_${card.name.replace(/\s+/g,'_')}_${this.formatMonthYear(new Date())}.csv`;
            a.click();
            this.showToast('Fatura exportada!');
        }

        printInvoicePDF(cardId) {
            const card = this.getCardById(cardId); if (!card) return;
            const period = this.getInvoicePeriod(card);
            const purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
            const total = this.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`<!DOCTYPE html><html><head><title>Fatura ${card.name}</title><style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; }
                .header { border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { color: #6366f1; margin: 0 0 5px 0; }
                .header .subtitle { color: #64748b; font-size: 0.9rem; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; }
                .info-label { font-size: 0.85rem; color: #64748b; margin-bottom: 4px; }
                .info-value { font-weight: 600; font-size: 1.1rem; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
                th { background: #f1f5f9; font-size: 0.85rem; text-transform: uppercase; }
                .total-row { background: #f8fafc; font-weight: 700; font-size: 1.2rem; }
                .total-row td { padding: 15px; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #6366f1; font-size: 0.85rem; color: #64748b; text-align: center; }
                @media print { body { padding: 20px; } }
            </style></head><body>
                <div class="header"><h1>Fatura - ${this.escapeHtml(card.name)}</h1><div class="subtitle">${this.escapeHtml(card.brand)} •••• ${this.escapeHtml(card.last4 || '****')}</div></div>
                <div class="info-grid">
                    <div><div class="info-label">Período</div><div class="info-value">${this.formatDate(period.startDate.toISOString().split('T')[0])} a ${this.formatDate(period.closingDate.toISOString().split('T')[0])}</div></div>
                    <div><div class="info-label">Vencimento</div><div class="info-value" style="color:#f59e0b;">${this.formatDate(period.dueDate.toISOString().split('T')[0])}</div></div>
                    <div><div class="info-label">Limite Total</div><div class="info-value">${this.formatCurrency(card.limit)}</div></div>
                    <div><div class="info-label">Disponível</div><div class="info-value" style="color:#10b981;">${this.formatCurrency(card.limit - total)}</div></div>
                </div>
                <h2 style="color:#6366f1; margin-bottom:15px;">Compras do Período</h2>
                <table>
                    <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Parcelas</th><th style="text-align:right;">Valor</th></tr></thead>
                    <tbody>
                        ${purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).map(p => {
                            const cat = this.getCategoryById(p.category);
                            const installmentInfo = p.installments > 1 ? `${p.installments}x de ${this.formatCurrency(this.getInstallmentAmount(p))}` : 'À vista';
                            return `<tr><td>${this.formatDate(p.date)}</td><td>${this.escapeHtml(p.description)}</td><td>${this.escapeHtml(cat.name)}</td><td>${installmentInfo}</td><td style="text-align:right;">${this.formatCurrency(p.amount)}</td></tr>`;
                        }).join('')}
                        <tr class="total-row"><td colspan="4">TOTAL DA FATURA</td><td style="text-align:right;">${this.formatCurrency(total)}</td></tr>
                        <tr><td colspan="4" style="text-align:right; font-weight:600;">Pagamento Mínimo (15%)</td><td style="text-align:right;">${this.formatCurrency(total * 0.15)}</td></tr>
                    </tbody>
                </table>
                <div class="footer">Smart Wallet • Fatura gerada em ${new Date().toLocaleString('pt-BR')}<br>Idealizado por RogerElizar™</div>
            </body></html>`);
            printWindow.document.close();
            setTimeout(() => { printWindow.print(); }, 250);
        }

        printPDF() { window.print(); }

        render() {
            this.updateDashboard();
            const tbody = document.getElementById('transactionsTable');
            const empty = document.getElementById('emptyState');
            const filtered = this.getFilteredTransactions();
            if (!filtered.length) { tbody.innerHTML = ''; empty.style.display = 'block'; return; }
            empty.style.display = 'none';
            const sorted = [...filtered].sort((a,b) => new Date(b.date)-new Date(a.date));
            const balMap = new Map(); let run = 0;
            [...sorted].reverse().forEach(t => { run += t.amount; balMap.set(t.id, run); });
            tbody.innerHTML = sorted.map(t => {
                const c = this.getCategoryById(t.category);
                const cls = t.amount >= 0 ? 'positive' : 'negative';
                const statusClass = t.statusOk ? 'status-done' : 'status-pending';
                const statusText = t.statusOk ? 'Concluído' : 'Pendente';
                const recurrenceHtml = this.getRecurrenceDisplay(t);
                const paymentName = this.getPaymentMethodName(t.paymentMethod);
                return `<tr class="transaction-row" onclick="smartwallet.editTransaction(${t.id})">
                    <td data-label="Data">${this.formatDate(t.date)}</td>
                    <td data-label="Descrição">${this.escapeHtml(t.description)||'-'}</td>
                    <td data-label="Categoria"><span class="category-badge" style="background:${c.color}">${this.escapeHtml(c.name)}</span></td>
                    <td data-label="Pagamento"><span class="payment-badge">${paymentName}</span></td>
                    <td data-label="Status"><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td data-label="Recorrência">${recurrenceHtml || '<span style="color:var(--text-secondary);">-</span>'}</td>
                    <td data-label="Valor" class="amount ${cls} privacy-value">${this.formatCurrency(t.amount)}</td>
                    <td data-label="Saldo" class="balance privacy-value">${this.formatCurrency(balMap.get(t.id))}</td>
                </tr>`;
            }).join('');
        }

        applyTheme() {
            document.body.classList.toggle('light', !this.darkMode);
            const btn = document.getElementById('themeBtn');
            if (btn) {
                btn.innerHTML = this.darkMode ? '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' : '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
            }
            if (Object.keys(this.charts).length > 0) {
                try { this.updateChartsTheme(); } catch (e) { console.warn('Erro tema:', e); }
            }
        }

        applyPrivacy() {
            document.body.classList.toggle('privacy-on', this.privacyOn);
            const btn = document.getElementById('privacyBtn');
            if (btn) {
                btn.innerHTML = this.privacyOn ? '<svg class="icon" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>' : '<svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
                btn.classList.toggle('active', this.privacyOn);
            }
        }

        showToast(msg) {
            const t = document.getElementById('toast');
            t.textContent = msg; t.classList.add('active');
            clearTimeout(this.toastT);
            this.toastT = setTimeout(() => t.classList.remove('active'), 3000);
        }

        setupConnectionHandler() {
            const statusEl = document.getElementById('connectionStatus');
            if (!statusEl) return;
            const updateStatus = () => {
                if (navigator.onLine) statusEl.classList.remove('offline');
                else statusEl.classList.add('offline');
            };
            window.addEventListener('online', updateStatus);
            window.addEventListener('offline', updateStatus);
            if (!navigator.onLine) statusEl.classList.add('offline');
        }

        setupStorageSync() {
            window.addEventListener('storage', (e) => {
                if (e.key && e.key.startsWith('smartwallet_')) {
                    this.transactions = this.loadFromStorage('smartwallet_transactions', []);
                    this.categories = this.loadFromStorage('smartwallet_categories', this.getDefaultCategories());
                    this.cards = this.loadFromStorage('smartwallet_cards', []);
                    this.cardPurchases = this.loadFromStorage('smartwallet_card_purchases', []);
                    this.accounts = this.loadFromStorage('smartwallet_accounts', []);
                    this.render(); this.updateCharts(); this.updateAlertBadge();
                }
            });
        }

        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'n') { e.preventDefault(); openNewTransactionModal(); }
                if (e.key === 'Escape') document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
            });
        }

        setupGlobalErrorHandlers() {
            window.addEventListener('error', (e) => console.error('Erro:', e.error));
            window.addEventListener('unhandledrejection', (e) => console.error('Promise:', e.reason));
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
            this.renderAccountsList();
            this.render();
            closeNewAccountModal();
            this.showToast(id ? 'Conta atualizada!' : 'Conta cadastrada!');
        }

        deleteAccount(id) {
            if (!confirm('Excluir esta conta?')) return;
            this.accounts = this.accounts.filter(a => a.id !== id);
            this.saveAccounts();
            this.renderAccountsList();
            this.render();
            this.showToast('Conta removida!');
        }

        editAccount(id) {
            const acc = this.accounts.find(a => a.id === id); if (!acc) return;
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
    }

    const smartwallet = new SmartWallet();
    window.smartwallet = smartwallet;

    window.selectTransactionType = function(t) { smartwallet.currentTransactionType = t; document.querySelectorAll('#transactionForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === t)); smartwallet.filterCategoriesByType('category', t); };
    window.selectEditType = function(t) { smartwallet.currentEditType = t; document.querySelectorAll('#editForm .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === t)); smartwallet.filterCategoriesByType('editCategory', t); };
    window.selectNewCategoryType = function(t) { smartwallet.newCategoryType = t; document.querySelectorAll('#categoryModal .type-btn').forEach(b => b.classList.toggle('active', b.dataset.type === t)); };

    window.openNewTransactionModal = function() { smartwallet.setDefaultDate(); smartwallet.filterCategoriesByType('category', smartwallet.currentTransactionType); document.getElementById('newTransactionModal').classList.add('active'); };
    window.closeNewTransactionModal = function() { document.getElementById('newTransactionModal').classList.remove('active'); smartwallet.clearForm(); };
    window.closeEditModal = function() { document.getElementById('editModal').classList.remove('active'); smartwallet.currentEditId = null; };
    window.openCategoryManager = function() { smartwallet.renderCategoryList(); document.getElementById('categoryModal').classList.add('active'); };
    window.closeCategoryManager = function() { document.getElementById('categoryModal').classList.remove('active'); };
    window.openExportModal = function() { document.getElementById('exportModal').classList.add('active'); };
    window.closeExportModal = function() { document.getElementById('exportModal').classList.remove('active'); };
    window.openGoalModal = function() { smartwallet.calculateGoalResult(); document.getElementById('goalModal').classList.add('active'); };
    window.closeGoalModal = function() { document.getElementById('goalModal').classList.remove('active'); };

    window.openImportCsvModal = function() { smartwallet.pendingCsvData = null; document.getElementById('csvFileInput').value = ''; document.getElementById('csvFileName').textContent = 'Clique para selecionar'; document.getElementById('csvReplaceData').checked = false; document.getElementById('importCsvModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeImportCsvModal = function() { document.getElementById('importCsvModal').classList.remove('active'); };

    window.handleCsvFileSelect = function(event) {
        const file = event.target.files[0]; if (!file) return;
        if (!file.name.toLowerCase().endsWith('.csv')) { alert('⚠️ Selecione um arquivo .csv'); event.target.value = ''; return; }
        document.getElementById('csvFileName').textContent = `📄 ${file.name} (${(file.size/1024).toFixed(1)} KB)`;
        const reader = new FileReader();
        reader.onload = (e) => { smartwallet.pendingCsvData = e.target.result; };
        reader.readAsText(file, 'UTF-8');
    };

    window.openImportBackupModal = function() { smartwallet.pendingBackupData = null; document.getElementById('backupFileInput').value = ''; document.getElementById('backupFileName').textContent = 'Clique para selecionar'; document.getElementById('importBackupModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeImportBackupModal = function() { document.getElementById('importBackupModal').classList.remove('active'); };

    window.handleBackupFileSelect = function(event) {
        const file = event.target.files[0]; if (!file) return;
        if (!file.name.toLowerCase().endsWith('.json')) { alert('⚠️ Selecione um arquivo .json'); event.target.value = ''; return; }
        if (file.size > 10 * 1024 * 1024) { alert('⚠️ Arquivo muito grande (máx 10MB)'); event.target.value = ''; return; }
        document.getElementById('backupFileName').textContent = `💾 ${file.name} (${(file.size/1024).toFixed(1)} KB)`;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                if (!content || !content.trim()) { alert('⚠️ Arquivo vazio!'); event.target.value = ''; return; }
                JSON.parse(content);
                smartwallet.pendingBackupData = content;
                smartwallet.showToast('✅ Arquivo carregado!');
            } catch (error) { alert('❌ JSON inválido: ' + error.message); event.target.value = ''; smartwallet.pendingBackupData = null; }
        };
        reader.readAsText(file, 'UTF-8');
    };

    window.openClearDataModal = function() { document.getElementById('clearStep1').style.display = 'block'; document.getElementById('clearStep2').style.display = 'none'; document.getElementById('clearConfirmInput').value = ''; document.getElementById('clearConfirmInput').classList.remove('match'); const btn = document.getElementById('finalClearBtn'); btn.disabled = true; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed'; document.getElementById('clearDataModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeClearDataModal = function() { document.getElementById('clearDataModal').classList.remove('active'); };
    window.showClearStep2 = function() { document.getElementById('clearStep1').style.display = 'none'; document.getElementById('clearStep2').style.display = 'block'; setTimeout(() => document.getElementById('clearConfirmInput').focus(), 100); };
    window.checkClearConfirm = function() { const input = document.getElementById('clearConfirmInput'); const btn = document.getElementById('finalClearBtn'); if (input.value.trim().toUpperCase() === 'LIMPAR') { input.classList.add('match'); btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; } else { input.classList.remove('match'); btn.disabled = true; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed'; } };

    window.openCreditCardsModal = function() { smartwallet.renderCreditCardsList(); document.getElementById('creditCardsModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeCreditCardsModal = function() { document.getElementById('creditCardsModal').classList.remove('active'); };

    window.openNewCardModal = function() { document.getElementById('cardEditId').value = ''; document.getElementById('cardForm').reset(); document.getElementById('cardClosingDay').value = 20; document.getElementById('cardDueDay').value = 27; document.getElementById('cardColor').value = '#6366f1'; document.getElementById('newCardTitle').textContent = 'Novo Cartão'; document.getElementById('newCardModal').classList.add('active'); };
    window.closeNewCardModal = function() { document.getElementById('newCardModal').classList.remove('active'); };

    window.openInvoiceModal = function(cardId) { smartwallet.openInvoice(cardId); };
    window.closeInvoiceModal = function() { document.getElementById('invoiceModal').classList.remove('active'); };

    window.openNewPurchaseModal = function(cardId) { document.getElementById('purchaseForm').reset(); document.getElementById('purchaseCardId').value = cardId; document.getElementById('purchaseDate').value = new Date().toISOString().split('T')[0]; document.getElementById('purchaseInstallments').value = '1'; document.getElementById('purchaseStatus').value = 'pending'; smartwallet.populateCategorySelects(); document.getElementById('newPurchaseModal').classList.add('active'); };
    window.closeNewPurchaseModal = function() { document.getElementById('newPurchaseModal').classList.remove('active'); };

    window.openBillsModal = function() { smartwallet.renderBillsModal(); document.getElementById('billsModal').classList.add('active'); };
    window.closeBillsModal = function() { document.getElementById('billsModal').classList.remove('active'); };

    window.openManualModal = function() { document.getElementById('manualContent').innerHTML = manualHTML; document.getElementById('manualModal').classList.add('active'); document.getElementById('infoMenu').classList.remove('active'); };
    window.closeManualModal = function() { document.getElementById('manualModal').classList.remove('active'); };

    window.openTermsModal = function() { document.getElementById('disclaimerModal').classList.add('active'); initDisclaimer(); document.getElementById('infoMenu').classList.remove('active'); };

    window.openThanksModal = function() { document.getElementById('thanksModal').classList.add('active'); document.getElementById('infoMenu').classList.remove('active'); };
    window.closeThanksModal = function() { document.getElementById('thanksModal').classList.remove('active'); };

    window.copyPixKey = function() { const pixKey = document.getElementById('pixKey').textContent; navigator.clipboard.writeText(pixKey).then(() => smartwallet.showToast('✅ Chave PIX copiada!')).catch(() => smartwallet.showToast('❌ Copie manualmente: ' + pixKey)); };

    window.toggleInfoMenu = function(e) { e.stopPropagation(); document.getElementById('infoMenu').classList.toggle('active'); };
    window.toggleMenu = function(e) { e.stopPropagation(); document.getElementById('mainMenu').classList.toggle('active'); document.getElementById('infoMenu').classList.remove('active'); };
    window.togglePrivacy = function() { smartwallet.privacyOn = !smartwallet.privacyOn; localStorage.setItem('smartwallet_privacy', smartwallet.privacyOn); smartwallet.applyPrivacy(); };
    window.toggleTheme = function() { smartwallet.darkMode = !smartwallet.darkMode; localStorage.setItem('smartwallet_dark', smartwallet.darkMode); smartwallet.applyTheme(); };

    // ===== CONTROLE DA SEQUÊNCIA: SPLASH → DISCLAIMER → BOAS-VINDAS → APP =====
    let disclaimerTimerInterval;
    const DISCLAIMER_COUNTDOWN = 12;

    function initDisclaimer() {
        const timerDisplay = document.getElementById('disclaimerTimer');
        const btnEl = document.getElementById('acceptDisclaimerBtn');
        const disclaimerModal = document.getElementById('disclaimerModal');
        
        if (!timerDisplay || !btnEl || !disclaimerModal) return;
        
        disclaimerModal.classList.add('active');
        
        let countdown = DISCLAIMER_COUNTDOWN;
        btnEl.classList.remove('enabled');
        btnEl.disabled = true;
        
        timerDisplay.innerHTML = `⏱️ Aguarde <span id="countdown">${countdown}</span> segundos para continuar`;
        
        if (disclaimerTimerInterval) clearInterval(disclaimerTimerInterval);
        
        disclaimerTimerInterval = setInterval(() => {
            countdown--;
            const countdownSpan = document.getElementById('countdown');
            if (countdownSpan) countdownSpan.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(disclaimerTimerInterval);
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
    
    // Salva aceite
    localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
    
    // Animação de desintegração
    disclaimerModal.classList.add('disintegrating');
    
    // Remove após animação
    setTimeout(() => {
        disclaimerModal.classList.remove('active', 'disintegrating');
        disclaimerModal.style.display = 'none';
        
        // Splash fica visível por 3 segundos
        setTimeout(() => {
            transitionToApp();
        }, 3000);
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

    window.printManual = function() { window.print(); };

    function updatePrintDate() {
        const dateEl = document.getElementById('printDate');
        if (dateEl) dateEl.textContent = 'Gerado em: ' + new Date().toLocaleString('pt-BR');
    }

// ===== INICIALIZAÇÃO PRINCIPAL =====
window.addEventListener('load', () => {
    updatePrintDate();
    
    const disclaimerAccepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
    const splashScreen = document.getElementById('splashScreen');
    const disclaimerModal = document.getElementById('disclaimerModal');
    
    // Garante que splash está visível
    if (splashScreen) {
        splashScreen.style.display = 'flex';
        splashScreen.classList.remove('fade-out');
    }
    
    // Aguarda 3.5 segundos para a splash, depois avança
    setTimeout(() => {
        if (!disclaimerAccepted) {
            // Primeiro acesso: mostra disclaimer
            if (disclaimerModal) {
                disclaimerModal.style.display = 'flex';
                disclaimerModal.classList.add('active');
                initDisclaimer();
            }
        } else {
            // Já aceitou: splash fica mais 3s e vai pro app
            setTimeout(() => {
                transitionToApp();
            }, 3000);
        }
    }, 3500);
});

    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mainMenu');
        const infoMenu = document.getElementById('infoMenu');
        const menuBtn = e.target.closest('.menu-btn');
        const infoBtn = e.target.closest('.info-btn');
        if (!menuBtn && menu.classList.contains('active')) menu.classList.remove('active');
        if (!infoBtn && infoMenu.classList.contains('active')) infoMenu.classList.remove('active');
    });

    window.closeRecurrenceConfirmModal = function() { document.getElementById('recurrenceConfirmModal').classList.remove('active'); smartwallet.pendingRecurrenceUpdate = null; };
    window.applyRecurrenceUpdate = function(scope) { smartwallet.applyRecurrenceUpdate(scope); };

    window.openAccountsModal = function() { smartwallet.renderAccountsList(); document.getElementById('accountsModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeAccountsModal = function() { document.getElementById('accountsModal').classList.remove('active'); };
    window.openNewAccountModal = function() { document.getElementById('accountEditId').value = ''; document.getElementById('accountForm').reset(); document.getElementById('accountColor').value = '#6366f1'; document.getElementById('newAccountTitle').textContent = 'Nova Conta'; document.getElementById('newAccountModal').classList.add('active'); };
    window.closeNewAccountModal = function() { document.getElementById('newAccountModal').classList.remove('active'); };

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('✅ SW registrado:', reg.scope))
                .catch(err => console.log('❌ SW falhou:', err));
        });
    }
})();
