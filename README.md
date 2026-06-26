# 📘 Smart Wallet - Inventário Completo v2.0.3

> **Controle Financeiro Pessoal Inteligente**  
> Idealizado por RogerElizar™  
> Versão: 2.0.3 | Data: Junho/2026  
> E-mail: rogerelizar@gmail.com

---

## 🎯 Visão Geral

Smart Wallet é uma aplicação web progressiva (PWA) de controle financeiro pessoal, 100% offline, com dados armazenados localmente no navegador. Desenvolvida para auxiliar na organização financeira com foco em privacidade, simplicidade e educação financeira.

### ✨ Destaques
- 📱 **PWA Instalável** - Funciona como app nativo
- 🔒 **100% Offline** - Dados apenas no dispositivo
- 🎨 **Design Moderno** - Glass morphism + gradientes
- 📊 **Gráficos Inteligentes** - Chart.js com 4 visualizações
- 💳 **Gestão de Cartões** - Faturas automáticas
- 📈 **Investimentos** - Acompanhamento com projeção
- 🔄 **Recorrência** - Parcelas e transações recorrentes
- 🖨️ **Impressão** - Manual e extratos em PDF
-  **Tema Claro/Escuro** - Alternância suave
- 👁️ **Modo Privacidade** - Blur em valores sensíveis

---

## 📁 Estrutura de Arquivos
SmartWallet/
├── index.html # Estrutura HTML completa (~600 linhas)
├── styles.css # Estilos e animações (~2000 linhas)
├── app.js # Lógica JavaScript (~2500 linhas)
── manifest.json # Configuração PWA
├── sw.js # Service Worker
├── favicon.svg # Ícone do app
├── test-data.json # Dados de teste
└── README.md # Documentação


**Total: ~5.100 linhas de código**

---

##  ARQUIVO 1: `index.html`

### 🔧 Estrutura Base
- `<!DOCTYPE html>` com lang="pt-BR"
- Meta tags (charset, viewport, theme-color, description)
- CSP (Content Security Policy)
- PWA manifest
- Chart.js v4.4.0 via CDN
- Google Fonts (Inter)
- Links para `styles.css` e `app.js`

### 🎨 Timbre de Impressão
- `.print-header` - Cabeçalho com título e data
- `.print-footer` - Rodapé com créditos

### 🌟 Splash Screen (`#splashScreen`)
| Elemento | Descrição |
|----------|-----------|
| Título | "Smart Wallet" com gradiente animado |
| Subtítulo | "Idealizado por RogerElizar™" |
| Email | rogerelizar@gmail.com |
| Ícones | 5 SVGs animados (financeiros) |
| Loader | Barra de progresso 3.5s |

### ⚠️ Disclaimer Modal (`#disclaimerModal`)
- Título e aviso legal
- Seções: Sobre, Privacidade, Limitações, Compromisso
- Timer de 12 segundos
- Botão "Li e Concordo" (desabilitado até timer acabar)
- Animação de desintegração ao aceitar

### 💬 Quote Modal (`#quoteModal`)
- Ícone de lâmpada
- Texto da citação financeira (35 opções)
- Autor da citação
- Botão "Gerenciar Minhas Finanças"

###  App Principal (`#mainApp`)

#### Header
- Título "Smart Wallet"
- Subtítulo
- Botão info (i) com dropdown:
  - 📈 Acompanhamento de Aplicações
  - 📜 Termos de Uso
  - ☕ Apoie o Projeto

#### Toolbar
- Seletor de mês (anterior/próximo)
- Botão privacidade (👁️)
- Botão tema (️/🌙)
- Botão meta de reserva ($)
- Botão alertas () com badge
- Menu hamburger (☰) com dropdown completo

#### Dashboard (4 cards)
1. Saldo Unificado
2. Receitas
3. Despesas
4. Acumulado C.Crédito

#### Gráficos (3)
- 📈 Entradas e Saídas por Mês (line)
- 💳 Cartões de Crédito 6 meses (line)
-  Despesas por Categoria (bar horizontal)

#### Histórico do Mês
- 5 filtros: busca, tipo, categoria, status, conta
- Tabela com 9 colunas
- Estado vazio quando sem transações

#### Gráfico de Investimentos
-  Acompanhamento de Aplicações
- Canvas para gráfico
- Resumo abaixo do gráfico

### 🔘 FAB (Floating Action Button)
- Botão "+" para nova transação

### 📝 Modais (22 total)

| # | Modal | ID | Funcionalidade |
|---|-------|-----|----------------|
| 1 | Nova Transação | `#newTransactionModal` | Lançamento com recorrência |
| 2 | Editar Transação | `#editModal` | Edição e exclusão |
| 3 | Gerenciar Categorias | `#categoryModal` | CRUD de categorias |
| 4 | Exportar Extrato | `#exportModal` | CSV e PDF |
| 5 | Meta de Reserva | `#goalModal` | Planejamento |
| 6 | Importar CSV | `#importCsvModal` | Importação em massa |
| 7 | Restaurar Backup | `#importBackupModal` | Restore JSON |
| 8 | Limpar Dados | `#clearDataModal` | Reset em 2 etapas |
| 9 | Minhas Contas | `#accountsModal` | Grid de contas |
| 10 | Nova Conta | `#newAccountModal` | Cadastro de conta |
| 11 | Meus Cartões | `#creditCardsModal` | Grid visual |
| 12 | Novo Cartão | `#newCardModal` | Cadastro de cartão |
| 13 | Fatura | `#invoiceModal` | Detalhes da fatura |
| 14 | Contas a Vencer | `#billsModal` | Alertas 3 dias |
| 15 | Aplicações | `#investmentsModal` | Lista de investimentos |
| 16 | Nova Aplicação | `#newInvestmentModal` | Cadastro investimento |
| 17 | Atualizar Valor | `#updateInvestmentModal` | Atualização de valor |
| 18 | Manual do Usuário | `#manualModal` | Documentação |
| 19 | Apoie o Projeto | `#thanksModal` | PIX e feedback |

---

## 🎨 ARQUIVO 2: `styles.css`

###  Variáveis CSS (:root)
| Categoria | Variáveis |
|-----------|-----------|
| Cores | `--primary-color`, `--accent-color`, `--success-color`, `--danger-color`, `--warning-color` |
| Backgrounds | `--bg-color`, `--bg-secondary`, `--card-bg`, `--glass-bg`, `--input-bg` |
| Textos | `--text-primary`, `--text-secondary` |
| Efeitos | `--shadow`, `--shadow-lg`, `--glass-border`, `--border-color` |
| Gradients | `--gradient-primary`, `--gradient-card`, `--gradient-danger` |
| Tamanhos | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl` |
| Transições | `--transition-fast`, `--transition-normal`, `--transition-slow` |

### 🎬 Animações (20+)
- `splashGlow` - brilho da splash
- `splashFadeIn` - entrada da splash
- `titleShine` - brilho do título
- `subtitleFade` - fade dos subtítulos
- `iconAppear` - aparecimento dos ícones
- `iconPulse` - pulsação dos ícones
- `loaderFade` - fade do loader
- `splashLoad` - carregamento da barra
- `disclaimerFadeIn` - entrada do disclaimer
- `disclaimerDisintegrate` - desintegração
- `disclaimerContentSlide` - slide do conteúdo
- `slideDown` - dropdowns
- `bell-ring` - alerta de contas
- `fadeIn` - modais
- `slideIn` - toast

### 📱 Seções Principais
1. **Reset & Base** - Normalização e variáveis
2. **Splash Screen** - Tela de abertura animada
3. **Disclaimer Modal** - Termos de uso
4. **Quote Modal** - Citação financeira
5. **Header** - Cabeçalho com info menu
6. **Toolbar** - Navegação e ações
7. **Dashboard** - Cards de resumo
8. **Charts** - Gráficos Chart.js
9. **Transactions** - Tabela e filtros
10. **Privacy Mode** - Blur em valores
11. **FAB** - Botão flutuante
12. **Modals** - Todos os modais
13. **Forms** - Formulários e botões
14. **Credit Cards** - Visual de cartões
15. **Bills** - Contas a vencer
16. **Investments** - Aplicações
17. **Manual Modal** - Documentação
18. **Thanks** - Apoie o projeto
19. **Accounts** - Contas
20. **Utilities** - Classes utilitárias
21. **Print** - Estilos de impressão
22. **Responsive** - Mobile (640px) e tablet (1024px)

---

##  ARQUIVO 3: `app.js`

### 📚 Dados Estáticos
| Variável             | Conteúdo                                          |
|----------------------|---------------------------------------------------|
| `financialQuotes`    | 35 citações (7 grupos de 5)                       |
| `PAYMENT_METHODS`    | 5 métodos (pix, debit, auto, scheduled, transfer) |
| `DEFAULT_CATEGORIES` | 10 categorias padrão                              |
| `manualHTML`         | Conteúdo HTML do manual                           |

### 🏗️ Classe SmartWallet

#### Constructor
- Inicializa arrays: `transactions`, `categories`, `accounts`, `cards`, `investments`
- Configurações: `currentMonth`, `currentTransactionType`, `darkMode`, `privacyOn`
- Chama `loadData()` e `init()`

#### Data Management (6 métodos)
- `loadData()` - Carrega do localStorage
- `saveTransactions()` - Salva transações
- `saveCategories()` - Salva categorias
- `saveAccounts()` - Salva contas
- `saveCards()` - Salva cartões
- `saveInvestments()` - Salva investimentos

#### Initialization (7 métodos)
- `init()` - Inicialização completa
- `setupEventListeners()` - Listeners de eventos
- `setDefaultDate()` - Data atual
- `changeMonth(delta)` - Navegação mensal
- `updateMonthDisplay()` - Atualiza header

#### Transaction Queries (4 métodos)
- `formatMonthYear(date)` - Formata MM-YYYY
- `getMonthTransactions(date)` - Filtra por mês
- `getCardTransactions(cardId, date)` - Filtra cartão por mês
- `getCardTransactionsForPeriod(cardId, start, end)` - Filtra por período

#### Select Population (4 métodos)
- `populateCategorySelects()` - Popula selects de categoria
- `populatePaymentMethodSelects()` - Popula com métodos + cartões
- `populateAccountSelects()` - Popula contas
- `filterCategoriesByType(selectId, type)` - Filtra por tipo

#### Helpers (6 métodos)
- `getCategoryById(id)` - Busca categoria
- `findCategoryByName(name)` - Busca por nome
- `getCardById(id)` - Busca cartão
- `getPaymentMethodName(method)` - Formata nome
- `formatCurrency(v)` - Formata R$
- `formatDate(d)` - Formata data
- `escapeHtml(t)` - Previne XSS

#### Core Functions (8 métodos)
- `addTransaction()` - **Com lógica de recorrência**
- `clearForm()` - Limpa formulário
- `editTransaction(id)` - Carrega dados
- `updateTransaction()` - Atualiza
- `deleteFromEdit()` - Exclui do modal
- `deleteTransaction(id)` - Exclui transação
- `getFilteredTransactions()` - Aplica filtros

#### Dashboard & Render (2 métodos)
- `updateDashboard()` - Calcula saldos
- `render()` - Renderiza tabela

#### Theme & Privacy (3 métodos)
- `applyTheme()` - Toggle dark/light
- `applyPrivacy()` - Toggle blur
- `showToast(msg)` - Notificações

#### Charts (5 métodos)
- `getChartColors()` - Cores do tema
- `initCharts()` - Inicializa 3 gráficos
- `updateChartsTheme()` - Atualiza cores
- `updateCharts()` - Atualiza dados
- `updateInvestmentChart()` - Gráfico de investimentos

#### Credit Cards (10 métodos)
- `getInvoicePeriod(card)` - Calcula período
- `calculateInvoiceTotal(purchases)` - Soma fatura
- `renderCreditCardsList()` - Renderiza grid
- `adjustColor(color, amount)` - Ajusta cor
- `saveCard()` - Salva cartão
- `deleteCard(id)` - Exclui cartão
- `editCard(id)` - Edita cartão
- `openInvoice(cardId)` - Abre fatura
- `payInvoice(cardId)` - Registra pagamento
- `exportInvoiceCSV(cardId)` - Exporta CSV
- `printInvoicePDF(cardId)` - Imprime PDF

#### Accounts (4 métodos)
- `saveAccount()`, `deleteAccount(id)`, `editAccount(id)`, `renderAccountsList()`

#### Categories (3 métodos)
- `addCategory()`, `deleteCategory(id)`, `renderCategoryList()`

#### Bills (2 métodos)
- `renderBillsModal()`, `markBillAsPaid(id)`

#### Investments (6 métodos)
- `saveInvestment()`, `deleteInvestment(id)`, `editInvestment(id)`
- `openUpdateInvestment(id)`, `updateInvestmentValue()`, `renderInvestmentsModal()`

#### Export/Import (7 métodos)
- `exportCSV()`, `printPDF()`, `exportBackup()`, `importBackup()`
- `importCSV()`, `parseCSVLine(line)`, `clearAllData()`

#### Manual (1 método)
- `printManual()` - Imprime manual com disclaimer

### 🌐 Funções Globais (window.*)

#### Type Selectors (3)
- `selectTransactionType(t)`
- `selectEditType(t)`
- `selectNewCategoryType(t)`

#### Modal Openers (40+)
- Todas as funções `open*Modal()` e `close*Modal()`

#### File Handlers (2)
- `handleCsvFileSelect(event)`
- `handleBackupFileSelect(event)`

#### Clear Data (2)
- `showClearStep2()`
- `checkClearConfirm()`

#### Actions (8)
- `printManual()`, `copyPixKey()`, `togglePrivacy()`, `toggleTheme()`
- `toggleMenu(e)`, `toggleInfoMenu(e)`

#### Disclaimer Flow (4)
- `initDisclaimer()`, `acceptDisclaimer()`
- `showQuoteModal()`, `startApp()`

---

##  Funcionalidades Principais

### 💰 Transações
- ✅ Lançamento de receitas e despesas
- ✅ Categorização colorida
- ✅ Formas de pagamento variadas
- ✅ Contas vinculadas
- ✅ Status (Concluído/Pendente)
- ✅ **Recorrência** (Mensal/Anual/Parcelado)
- ✅ Edição e exclusão
- ✅ Filtros avançados (5 critérios)
- ✅ Busca textual
- ✅ Saldo acumulado

### 💳 Cartões de Crédito
- ✅ Cadastro completo (bandeira, limite, fechamento, vencimento)
- ✅ Visual de cartão com gradiente
- ✅ Faturas automáticas por período
- ✅ Cálculo de disponível
- ✅ Barra de uso do limite
- ✅ Exportação CSV e PDF
- ✅ Pagamento de fatura
- ✅ **Sistema unificado** (busca direto de transações)

### 🏦 Contas
- ✅ Conta Corrente e Investimento
- ✅ Saldo inicial
- ✅ Personalização de cor
- ✅ Grid visual

###  Investimentos
- ✅ 8 tipos (CDB, Tesouro, LCI, Fundo, Ações, FIIs, Poupança, Outro)
- ✅ Valor inicial e atual
- ✅ Taxa de rendimento
- ✅ Gráfico com projeção 3 meses
- ✅ Resumo geral
- ✅ **Privacidade** (blur nos valores)

### 📊 Gráficos
-  Entradas e Saídas (6 meses)
- 💳 Cartões de Crédito (6 meses)
- 🥧 Despesas por Categoria (barras estreitas)
- 📊 Investimentos (4 datasets + projeção)

### 🔔 Alertas
- ✅ Contas vencendo em 3 dias
- ✅ Badge animado no sino
- ✅ Modal de contas a vencer
- ✅ Marcar como paga

### 🔄 Recorrência
- ✅ **Mensal** - Repete todo mês
- ✅ **Anual** - Repete todo ano
- ✅ **Parcelado** - Numera automaticamente (1/6, 2/6...)
- ✅ Criação em lote
- ✅ Badge visual na tabela

###  Temas
- ✅ Modo escuro (padrão)
- ✅ Modo claro
- ✅ Transição suave
- ✅ Persistência no localStorage

### ️ Privacidade
- ✅ Blur em valores sensíveis
- ✅ Aplica em dashboard, tabela e investimentos
- ✅ Labels permanecem visíveis
- ✅ Toggle rápido

### 🖨️ Impressão
- ✅ Manual completo (A4)
- ✅ Extrato do mês
- ✅ Fatura do cartão
- ✅ Disclaimer em fonte menor

### 💾 Backup
- ✅ Exportação JSON completa
- ✅ Importação com validação
- ✅ Importação CSV
- ✅ Limpeza total (2 etapas)

---

##  Fluxos de Usuário

### Fluxo 1: Primeira Utilização
Splash (3.5s) → Disclaimer (12s) → Quote → App

### Fluxo 2: Nova Transação
FAB (+) → Modal → Preencher → [Recorrente?] → Adicionar → Dashboard atualizado

### Fluxo 3: Compra no Cartão
Nova Transação → Selecionar cartão → Adicionar
→ Aparece em: Histórico + Card C.Crédito + Gráfico + Fatura

### Fluxo 4: Recorrência
Nova Transação → Marcar "Recorrente" → Tipo + Parcelas
→ Sistema cria N transações automaticamente

### Fluxo 5: Fatura do Cartão
Meus Cartões → Clicar no cartão → Ver fatura
→ Pagar / Exportar CSV / Imprimir PDF

### Fluxo 6: Investimentos
Menu (i) → Acompanhamento → Nova Aplicação
→ Gráfico atualiza com projeção

---

## 📦 Dependências

| Dependência | Versão | Uso |
|-------------|--------|-----|
| Chart.js | 4.4.0 | Gráficos |
| Google Fonts (Inter) | Latest | Tipografia |
| Service Worker | Nativo | PWA offline |
| localStorage | Nativo | Persistência |

**Zero dependências de backend!** 🎉

---

## 🚀 Deploy

### Via GitHub Pages
1. Criar repositório `SmartWallet`
2. Upload dos arquivos
3. Settings → Pages → Branch: main
4. URL: `https://usuario.github.io/SmartWallet/`

### Atualização
```bash
git add .
git commit -m "feat: v2.0.3 - Versão completa"
git push origin main

Cache
Ctrl + Shift + Delete → Limpar cache
Ctrl + F5 → Recarregar

🧪 Testes
Checklist de Validação
Splash aparece por 3.5s
Disclaimer com timer 12s
Quote modal aleatório
Dashboard com valores
Nova transação funcional
Recorrência cria múltiplas
Cartão atualiza fatura
Gráficos renderizam
Filtros funcionam
Privacidade aplica blur
Tema alterna
Backup exporta/importa
Manual imprime
Mobile responsivo
PWA instalável

📊 Estatísticas
Métrica               |            Valor
----------------------------------------
Linhas de código      |           ~5.100
Modais                |               22
Citações              |               35
Categorias padrão     |               10
Métodos de pagamento  |      5 + cartões
Tipos de investimento |                8
Animações CSS         |              20+
Funções JavaScript    |              80+
Seções CSS            |              50+
________________________________________

📞 Suporte
E-mail: rogerelizar@gmail.com
Feedback: Menu → ☕ Apoie o Projeto
Manual: Menu → 📘 Manual do Usuário

📜 Licença
© 2026 RogerElizar® - Todos os direitos reservados.
"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."
— Tiago 1:17
Smart Wallet v2.0.3 - Controle Financeiro Pessoal Inteligente 🚀
