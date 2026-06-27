# 💰 Smart Wallet

> **Controle Financeiro Pessoal Inteligente**  
> 100% offline · Privacidade total · PWA instalável

[![CI/CD](https://github.com/rogerelizar-2026/SmartWallet/actions/workflows/ci.yml/badge.svg)](https://github.com/rogerelizar-2026/SmartWallet/actions)
[![Versão](https://img.shields.io/badge/versão-4.0.0-blue)](https://github.com/rogerelizar-2026/SmartWallet/releases)
[![Licença](https://img.shields.io/badge/licença-MIT-green)](LICENSE)
[![Lighthouse](https://img.shields.io/badge/lighthouse-95%2B-brightgreen)](https://pagespeed.web.dev/)

---

## ✨ Funcionalidades

### 💸 Controle Financeiro
- ✅ Receitas e despesas com categorização
- ✅ Saldo unificado entre contas
- ✅ Filtros avançados (tipo, categoria, status, conta, busca)
- ✅ Recorrência automática (mensal, anual, parcelado)
- ✅ Histórico com saldo acumulado

### 💳 Cartões de Crédito
- ✅ Múltiplos cartões com limite e vencimento
- ✅ Faturas automáticas por período
- ✅ Cálculo de disponível em tempo real
- ✅ Exportação de fatura (CSV/PDF)

### 📊 Visualizações
- ✅ Entradas e saídas (6 meses)
- ✅ Despesas por categoria
- ✅ Evolução de cartões
- ✅ Acompanhamento de investimentos com projeção

### 🔒 Privacidade & Segurança
- ✅ 100% offline (dados no seu dispositivo)
- ✅ Sem cadastro, sem rastreamento
- ✅ Modo privacidade (blur em valores)
- ✅ Backup criptografável via JSON

### 🎨 Experiência
- ✅ Tema claro/escuro
- ✅ Acessibilidade (teclado, leitores de tela)
- ✅ Responsivo (mobile, tablet, desktop)
- ✅ PWA instalável

---

## 🚀 Instalação

### Como WebApp (Recomendado)

1. Acesse: **https://rogerelizar-2026.github.io/SmartWallet/**
2. **No computador**: Menu do navegador → "Instalar Smart Wallet"
3. **No Android**: Chrome → ⋮ → "Instalar aplicativo"
4. **No iPhone**: Safari → Compartilhar → "Adicionar à Tela de Início"

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/rogerelizar-2026/SmartWallet.git
cd SmartWallet

# Sirva com qualquer servidor estático
# Opção 1: Python
python3 -m http.server 8000

# Opção 2: Node.js (http-server)
npx http-server -p 8000

# Opção 3: VS Code Live Server
Acesse http://localhost:8000

📁 Estrutura do Projeto
SmartWallet/
├── index.html              # Interface principal
├── styles.css              # Estilos (glass morphism)
├── manifest.json           # Configuração PWA
├── sw.js                   # Service Worker
├── favicon.svg             # Ícone do app
├── CHANGELOG.md            # Histórico de versões
├── README.md               # Esta documentação
└── js/
    ├── app.js              # Entry point + classe SmartWallet
    ├── handlers.js         # Handlers de eventos (Fase 2)
    ├── delegation.js       # Event delegation global
    ├── lazy-loader.js      # Carregamento sob demanda
    ├── validators.js       # Validação forte de dados
    ├── storage-manager.js  # Gerenciador de storage
    ├── a11y.js             # Acessibilidade (Fase 4)
    └── workers/
        └── parser-worker.js # Web Worker para CSV/JSON

🛠️ Tecnologias
HTML5 + CSS3 (Glass Morphism, Grid, Flexbox)
JavaScript ES6+ (Modules, Classes, Async/Await)
Chart.js 4.4.0 (Gráficos)
Service Workers (Offline-first)
Web Workers (Processamento paralelo)
LocalStorage (Persistência)
Zero dependências de backend. Tudo roda no navegador.

📊 Roadmap

✅ Concluído
v1.0.0 - Funcionalidades básicas
v2.0.0 - UI/UX moderna + gráficos
v3.0.0 - Arquitetura modular + validação
v4.0.0 - Acessibilidade + Performance + PWA
v4.1.0 - CI/CD + Documentação (esta versão)
🎯 Próximas versões
v5.0.0 - Sincronização opcional (E2E encrypted)
v5.1.0 - Metas financeiras com acompanhamento
v5.2.0 - Relatórios personalizados
v6.0.0 - Migração para TypeScript
🤝 Contribuindo
Este é um projeto pessoal, mas sugestões são bem-vindas!
Abra uma Issue descrevendo a sugestão/bug
Envie feedback por e-mail: rogerelizar@gmail.com
Apoie o projeto via PIX (chave no app)
📜 Licença
MIT License - Copyright (c) 2026 RogerElizar™
Agradecimentos
"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."
— Tiago 1:17
Dedicado aos meus filhos, com amor. 💝
Smart Wallet - Idealizado por RogerElizar™ · 2026


---

## 📄 ARQUIVO 4: `MIGRATION.md` (NOVO)

Guia para migrar dados entre versões do schema.

```markdown
# 🔄 Guia de Migração de Dados

Este documento descreve como migrar dados entre versões do Smart Wallet.

---

## 📌 Versões do Schema

| Versão | Período | Mudanças principais |
|--------|---------|---------------------|
| v1 | Jun/2026 | Schema inicial com `cardPurchases` separado |
| v2 | Jun/2026 | Unificação em `transactions`, remoção de `cardPurchases` |
| v3 | Jun/2026 | Categorias normalizadas (`despesa` → `expense`) |

---

## 🔄 Migrando de v1 para v2

### O que mudou
- Campo `cardPurchases` foi removido
- Compras de cartão agora ficam em `transactions` com `paymentMethod: "card:XXX"`

### Script de migração (Console do navegador)

```javascript
// Execute APENAS UMA VEZ no Console (F12)
(function migrateV1toV2() {
    const data = JSON.parse(localStorage.getItem('smartwallet_data'));
    if (!data) {
        console.log('Nenhum dado v1 encontrado');
        return;
    }

    const transactions = data.transactions || [];
    const cardPurchases = data.cardPurchases || [];

    // Converte cardPurchases em transactions
    cardPurchases.forEach(p => {
        transactions.push({
            id: Date.now() + Math.random(),
            date: p.date,
            amount: -Math.abs(p.amount),
            category: p.category,
            description: p.description,
            statusOk: p.status || false,
            paymentMethod: 'card:' + p.cardId,
            accountId: ''
        });
    });

    // Salva no novo formato
    localStorage.setItem('smartwallet_transactions', JSON.stringify(transactions));
    localStorage.removeItem('smartwallet_data');
    
    console.log(`✅ Migradas ${cardPurchases.length} compras de cartão`);
    location.reload();
})();

🔄 Migrando de v2 para v3
O que mudou
Categorias com type: "despesa" viram type: "expense"
Categorias com type: "receita" viram type: "income"
Script de migração

(function migrateV2toV3() {
    const categories = JSON.parse(localStorage.getItem('smartwallet_categories') || '[]');
    
    const migrated = categories.map(c => ({
        ...c,
        type: c.type === 'despesa' ? 'expense' : 
              c.type === 'receita' ? 'income' : c.type
    }));

    localStorage.setItem('smartwallet_categories', JSON.stringify(migrated));
    console.log(`✅ ${migrated.length} categorias migradas`);
    location.reload();
})();

🔍 Verificando a versão atual
// No Console (F12)
const backup = JSON.parse(localStorage.getItem('smartwallet_backup_version') || '1');
console.log('Versão do schema:', backup);

⚠️ Antes de migrar
Faça backup dos dados atuais (Menu → Backup JSON)
Teste em uma cópia primeiro
Verifique se todas as transações foram migradas
📞 Suporte
Em caso de problemas na migração:
E-mail: rogerelizar@gmail.com
Inclua o arquivo de backup na mensagem


---

## 📄 ARQUIVO 5: `js/version.js` (NOVO)

Centraliza o versionamento do app.

```javascript
// js/version.js
// Versionamento semântico do Smart Wallet

export const APP_VERSION = {
    major: 4,
    minor: 1,
    patch: 0,
    suffix: '',  // 'alpha', 'beta', 'rc', ou vazio
    codename: 'Enterprise',
    buildDate: '2026-06-28',
    
    toString() {
        let version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.suffix) version += `-${this.suffix}`;
        return version;
    },
    
    isStable() {
        return !this.suffix;
    },
    
    compareTo(other) {
        const a = [this.major, this.minor, this.patch];
        const b = [other.major, other.minor, other.patch];
        for (let i = 0; i < 3; i++) {
            if (a[i] > b[i]) return 1;
            if (a[i] < b[i]) return -1;
        }
        return 0;
    }
};

// Exibe no console ao carregar
console.log(`%c Smart Wallet v${APP_VERSION.toString()} "${APP_VERSION.codename}"`, 
    'color: #6366f1; font-weight: bold; font-size: 14px;');
console.log(`%c Build: ${APP_VERSION.buildDate}`, 'color: #94a3b8;');

📄 ARQUIVO 6: js/app.js (AJUSTE MÍNIMO)
Adicione no topo:
import './handlers.js';
import { storageManager } from './storage-manager.js';
import { lazyLoader } from './lazy-loader.js';
import { a11yManager } from './a11y.js';
import { APP_VERSION } from './version.js';  // ← NOVO

console.log(`🚀 Smart Wallet v${APP_VERSION.toString()} iniciando...`);

E no final do arquivo, substitua o console.log por:
console.log(`🎉 Smart Wallet v${APP_VERSION.toString()} "${APP_VERSION.codename}" carregado!`);
console.log(`📅 Build: ${APP_VERSION.buildDate}`);
console.log(`🔧 Storage: ${storageManager.getUsage().kb}KB usados`);

📋 Checklist Final da Fase 5
Arquivos a criar
.github/workflows/ci.yml
CHANGELOG.md
README.md
MIGRATION.md
js/version.js
Arquivos a modificar
js/app.js (adicionar import de version.js)
Validações
Push para main dispara CI no GitHub Actions
CI valida estrutura de arquivos
Deploy automático no GitHub Pages funciona
README renderiza corretamente no GitHub
CHANGELOG está legível

🚀 Deploy Final
# Adiciona todos os novos arquivos
git add .github/workflows/ci.yml CHANGELOG.md README.md MIGRATION.md js/version.js js/app.js

# Commit com mensagem descritiva
git commit -m "feat: Fase 5 - CI/CD, documentação e versionamento v4.1.0"

# Push (dispara CI/CD automaticamente)
git push origin main

✅ Resultado da Fase 5
Após o push, você verá no GitHub:
Aba "Actions": Pipeline rodando (verde = sucesso)
Aba "Pages": Deploy automático publicado
README: Renderizado na página inicial do repo
Badge de CI: Mostra status em tempo real
Changelog: Histórico completo de versões
Projeto Concluído!
O Smart Wallet v4.1.0 agora é um projeto com:
Pilar
Status
️ Arquitetura
Modular (ES6 Modules)
🎯 Eventos
Delegation (zero onclick)
⚡ Performance
Lazy loading + Web Workers
♿ Acessibilidade
WCAG 2.1 AA
Privacidade
100% offline
📱 PWA
Offline-first
🤖 CI/CD
GitHub Actions
📚 Documentação
README + CHANGELOG + MIGRATION
🏷️ Versionamento
Semântico (v4.1.0)
🎉 Próximos Passos Sugeridos
Criar Release no GitHub:
Vá em "Releases" → "Create new release"
Tag: v4.1.0
Cole o conteúdo do CHANGELOG
Publique
Divulgar:
Compartilhe o link do GitHub Pages
Poste em comunidades de finanças pessoais
Peça feedback de usuários reais
Monitorar:
Acompanhe Issues no GitHub
Colete sugestões de usuários
Planeje v5.0.0 com base no feedback
Parabéns pelo projeto completo! 🚀💰
