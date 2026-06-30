# 📋 Changelog - Smart Wallet

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e seguimos [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [4.0.0] - 2026-06-28

### 🎉 Adicionado
- ♿ **Acessibilidade completa**: navegação por teclado, trap de foco em modais, anúncios ARIA para leitores de tela
- ⚡ **Web Workers**: processamento de CSV/JSON em thread separada (UI não trava)
- 📱 **Service Worker otimizado**: estratégia Cache-First para assets, Network-First para HTML
-  **Sistema de migração de dados**: preparado para evolução do schema

### 🔧 Melhorado
- Performance de importação de arquivos grandes (>10MB)
- Experiência offline-first
- Gerenciamento de foco em modais

---

## [3.0.0] - 2026-06-27

### 🎉 Adicionado
- ️ **Arquitetura modular** (ES6 Modules)
-  **Event Delegation** via `data-action` (zero `onclick` inline)
-  **Lazy Loading** de Chart.js e módulos pesados
- ✅ **Validação forte** de CSV/JSON com schema
- 💾 **Persistência** de preferências e filtros
- 🏷️ **Versionamento de backup** (v1 → v2 → v3)

### 🗑️ Removido
- Array `cardPurchases` separado (unificado em `transactions`)
- Modal "Nova Compra" (tudo via "Nova Transação")
- ~85 handlers `onclick` inline no HTML

### 🐛 Corrigido
- Lógica de recorrência (IDs únicos, cálculo correto de datas)
- Card "Acumulado C.Crédito" não atualizava
- Gráfico de cartões buscava de fonte errada
- Impressão de extrato mostrava tela em vez do relatório

---

## [2.0.5] - 2026-06-26

### 🎉 Adicionado
- 📊 23 categorias padrão (13 despesas, 8 receitas, 2 aportes)
- 🎨 Paleta de cores harmoniosa para categorias
-  Manual do usuário completo e imprimível
-  35 citações financeiras (bíblicas, talmúdicas, Cukierkorn)

### 🔧 Melhorado
- Sistema unificado de cartões de crédito
- Privacidade aplica blur em investimentos
- Barras do gráfico de categorias mais estreitas
- Info menu com z-index corrigido

---

## [2.0.0] - 2026-06-25

### 🎉 Adicionado
-  Splash screen animada
- ⚠️ Disclaimer com timer de 12 segundos
- 💭 Modal de citação financeira aleatória
-  Gráfico de investimentos com projeção
-  Sistema de alertas de contas a vencer
- ️ Impressão de extrato profissional

### 🔧 Melhorado
- Design glass morphism
- Responsividade mobile
- Tema claro/escuro
- Modo privacidade

---

## [1.0.0] - 2026-06-02

###  Lançamento inicial
- Controle de receitas e despesas
- Gestão de cartões de crédito
- Cadastro de contas e categorias
- Exportação CSV e backup JSON
- PWA instalável

---

## 📌 Legendas

- 🎉 **Adicionado**: novas funcionalidades
- 🔧 **Melhorado**: melhorias em funcionalidades existentes
-  **Corrigido**: correções de bugs
- 🗑️ **Removido**: funcionalidades removidas
- ⚠️ **Deprecated**: funcionalidades que serão removidas
-  **Segurança**: correções de segurança
