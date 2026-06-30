# 💰 MyWallet - Controle Financeiro Pessoal Inteligente

> **Controle Financeiro Pessoal Inteligente**  
> 100% offline · Privacidade total · PWA instalável

[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-brightgreen)](https://github.com/rogerelizar-2026/SmartWallet/actions)
[![Versão](https://img.shields.io/badge/versão-4.0.3-blue)](https://github.com/rogerelizar-2026/SmartWallet/releases)
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
- ✅ Backup e restore via JSON

### 🎨 Experiência
- ✅ Tema claro/escuro
- ✅ Acessibilidade (teclado, leitores de tela)
- ✅ Responsivo (mobile, tablet, desktop)
- ✅ PWA instalável

---

## 🚀 Instalação

### Como WebApp (Recomendado)

1. Acesse: **https://rogerelizar-2026.github.io/SmartWallet/**
2. **No computador**: Menu do navegador → "Instalar MyWallet"
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
# Abra a pasta no VS Code e use a extensão Live Server
```

---

## 📁 Estrutura do Projeto

```
MyWallet/
├── index.html              # Interface principal
├── styles.css              # Estilos (glass morphism)
├── manifest.json           # Configuração PWA
├── sw.js                   # Service Worker
├── favicon.svg             # Ícone do app
├── README.md               # Esta documentação
├── CHANGELOG.md            # Histórico de versões
└── js/
    ├── app.js              # Aplicação principal
    ├── backup-fix.js       # Correções de backup
    └── (outros módulos)
```

---

## 🛠️ Tecnologias

- **HTML5 + CSS3** (Glass Morphism, Grid, Flexbox)
- **JavaScript ES6+** (Modules, Classes, Async/Await)
- **Chart.js 4.4.0** (Gráficos)
- **Service Workers** (Offline-first)
- **LocalStorage** (Persistência)
- **Zero dependências de backend** - Tudo roda no navegador

---

## 📖 Como Usar

### 1. Adicionar Transação
- Clique no botão **+ Adicionar**
- Escolha: Receita ou Despesa
- Selecione categoria, valor, data
- Opção de recorrência (mensal/anual/parcelado)

### 2. Gerenciar Cartões de Crédito
- Menu → **💳 Meus Cartões**
- Cadastre seus cartões
- Acompanhe faturas
- Exporte em CSV ou PDF

### 3. Fazer Backup
- Menu → **💾 Backup (JSON)**
- Clique para exportar
- Arquivo será baixado

### 4. Restaurar Dados
- Menu → **Restaurar Backup**
- Selecione o arquivo .json
- Clique **Restaurar** ✅

### 5. Análises
- Veja gráficos automáticos
- Entradas vs Saídas por mês
- Despesas por categoria
- Projeção do próximo mês

---

## 🎨 Recursos Adicionais

### 🌙 Tema Escuro/Claro
Alterne temas com um clique

### 🔒 Modo Privacidade
Oculta valores sensíveis

### 📥 Importar CSV
Importe transações de outros apps

### 🖨️ Imprimir/PDF
Exporte relatórios em PDF

### 🎯 Metas Financeiras
Acompanhe suas metas

---

## 💡 Dicas Importantes

### Regra 50-30-20
- **50%** Necessidades (aluguel, comida, transporte)
- **30%** Desejos (lazer, restaurantes)
- **20%** Objetivos (reserva, investimentos)

### Reserva de Emergência
Mantenha **6 meses** de despesas

### Revisão Regular
Acompanhe suas finanças **semanalmente**

### Backup Regular
Exporte backup **mensalmente**

---

## 📊 Roadmap

### ✅ Concluído
- v1.0.0 - Funcionalidades básicas
- v2.0.0 - UI/UX moderna + gráficos
- v3.0.0 - Arquitetura modular
- v4.0.0 - Acessibilidade + Performance + PWA
- v4.0.3 - Correção de backup ✨

### 🎯 Próximas versões
- v5.0.0 - Sincronização opcional (E2E encrypted)
- v5.1.0 - Metas financeiras
- v5.2.0 - Relatórios personalizados
- v6.0.0 - Migração para TypeScript

---

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas!

- 🐛 Abra uma [Issue](https://github.com/rogerelizar-2026/SmartWallet/issues) descrevendo o bug/sugestão
- 📧 Envie feedback: rogerelizar@gmail.com
- 💝 Apoie via PIX (chave no app)

---

## 📜 Licença

MIT License - Copyright (c) 2026 RogerElizar™

---

## 🙏 Agradecimentos

> "Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."
> — Tiago 1:17

**Dedicado aos meus filhos, com amor.** 💝

---

## 📞 Suporte

- 📧 **Email:** rogerelizar@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/rogerelizar-2026/SmartWallet/issues)
- 📘 **Manual:** Menu → 📖 Manual do Usuário

---

**MyWallet v4.0.3** - Idealizado por RogerElizar™ · 2026

Desenvolvido com ❤️ e muita ☕
