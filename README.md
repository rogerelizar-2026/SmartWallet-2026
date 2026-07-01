# 💰 Smart Wallet Brasil

<div align="center">

![Version](https://img.shields.io/badge/version-4.1.0-6366f1?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-ready-10b981?style=for-the-badge)
![Offline](https://img.shields.io/badge/100%25-Offline-06b6d4?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-f59e0b?style=for-the-badge)

### Controle Financeiro Pessoal Inteligente

*Seu parceiro na jornada para a liberdade financeira*

[🚀 Recursos](#-recursos-principais) • [📦 Instalação](#-instalação) • [📖 Manual](#-manual-do-usuário) • [🆕 Novidades](#-changelog-v410)

</div>

---

## 🎯 Sobre o Projeto

**Smart Wallet Brasil** é um aplicativo web progressivo (PWA) de controle financeiro pessoal, desenvolvido para ser **simples, seguro e inteligente**. 

Diferente de apps tradicionais, o Smart Wallet:
- ✅ **Funciona 100% offline** após a instalação
- ✅ **Não requer cadastro** ou envio de dados para servidores
- ✅ **Armazena tudo localmente** no seu dispositivo
- ✅ **Não usa cookies** de rastreamento ou analytics
- ✅ **É gratuito** para uso pessoal

> *"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."* — Tiago 1:17

---

## ✨ Recursos Principais

### 📊 Dashboard Financeiro Inteligente
- Cards clicáveis para filtrar receitas, despesas e ver saldo unificado
- Navegação mensal com setas ← →
- Gráficos automáticos de evolução e categorias
- Modo privacidade para ocultar valores em público

### 💸 Transações & Recorrências
- Registro rápido de receitas e despesas
- Suporte a recorrências: **Mensal, Anual ou Parcelado**
- Filtros por categoria, conta, status ou período
- 🆕 **Gestos no celular**: deslize para marcar como pago ou excluir

### ⚡ Ações Rápidas (FAB Speed Dial)
- Botão "+" expansível com 3 opções:
  - 💸 Nova Despesa
  - 💰 Nova Receita
  - 🔄 Transferência entre contas

### 💳 Gestão de Cartões de Crédito
- Cadastro com limite, fechamento e vencimento
- 🆕 **Navegação entre faturas** com setas
- 🆕 **Período automático**: fechamento anterior → fechamento atual
- 🆕 **Vencimento inteligente**: só avança quando a fatura fecha
- Exportação em CSV ou PDF

### 📈 Acompanhamento de Aplicações
- CDBs, Tesouro Direto, LCI/LCA, FIIs, Ações e mais
- 🆕 **Vinculação automática** com contas de investimento
- Sincronização de saldo em tempo real
- Gráficos de evolução patrimonial

### 📊 Orçamento por Categoria
- 🆕 **Barras de progresso** comparando com média dos últimos 3 meses
- Cores indicativas: verde, amarelo e vermelho
- Indicadores ⬆️ ⬇️ de variação

### 🔔 Alertas Inteligentes
- Contas vencendo nos próximos 3 dias
- 🆕 **Fechamento de fatura** 1 dia antes

### 💾 Backup & Segurança
- Exportação JSON completa
- Importação de CSV e JSON
- Modo privacidade (oculta valores)

### 📖 Manual do Usuário Expandido
- Dicas exclusivas do **Coach SW**
- Casos reais de sucesso financeiro
- Regra 50-30-20 explicada
- Plano de ação de 4 semanas
- 🆕 **Lembrete de impressão** ao atualizar versão

---

## 🆕 Changelog v4.1.0

### ✨ Novidades
- 📱 **Gestos no Celular (Swipe)**: deslize para marcar como pago ou excluir
- ⚡ **Menu de Ações Rápidas (FAB)**: acesso direto a Despesa, Receita e Transferência
- 📊 **Orçamento por Categoria**: barras de progresso com média dos últimos 3 meses
- 🔄 **Transferência entre Contas**: mova saldo automaticamente
- 🔔 **Alerta de Fechamento**: aviso 1 dia antes do fechamento do cartão
- 🎉 **Sistema de Atualização**: modal "What's New" com novidades e lembrete do manual

### 🔧 Melhorias
- 🎨 **Visual Aprimorado**: modais com opacidade aumentada
- 💳 **Navegação de Faturas**: setas para consultar períodos anteriores
- 📈 **Investimentos Sincronizados**: vinculação automática com contas
- 🖨️ **Impressão Simplificada**: extrato sem ícones e cores

### 🐛 Correções
- Botão Salvar do modal de edição
- Timestamps nos arquivos exportados (`SmartWallet-AAAAMMDDHHMMSS`)
- Impressão do Manual do Usuário
- Período da fatura (fechamento anterior → fechamento atual)

---

## 📦 Instalação

### 💻 No Computador (Chrome, Edge, Brave)
1. Acesse o site pelo navegador
2. Procure o ícone de instalação na barra de endereços (monitor com seta para baixo)
3. Ou clique no menu do navegador (⋮) → "Instalar Smart Wallet..."
4. Confirme a instalação
5. Pronto! O app aparecerá na sua área de trabalho

### 📱 No Celular Android (Chrome)
1. Abra o site no Chrome
2. Toque nos três pontos (⋮) no canto superior direito
3. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"
4. Confirme tocando em "Instalar"
5. O ícone aparecerá na sua tela inicial

### 🍎 No iPhone (Safari)
1. Abra o site no Safari
2. Toque no botão Compartilhar (quadrado com seta)
3. Role para baixo e toque em "Adicionar à Tela de Início"
4. Toque em "Adicionar"
5. O app aparecerá na sua tela inicial

### 🔧 Desenvolvimento Local
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/smart-wallet.git

# Entre na pasta
cd smart-wallet

# Inicie um servidor local (escolha uma opção):

# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js
npx serve

# Opção 3: VS Code
# Instale a extensão "Live Server" e abra o index.html
```

Acesse em: `http://localhost:8000`

---

## 📁 Estrutura do Projeto

```
smart-wallet/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS (tema escuro/claro)
├── manifest.json       # Configuração PWA
├── sw.js               # Service Worker (cache offline)
├── favicon.svg         # Ícone do app
├── js/
│   └── app.js          # Lógica principal da aplicação
├── backup_teste_2025.json  # Dados de teste
└── README.md           # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Glassmorphism, responsividade, temas
- **JavaScript (ES6+)** - Lógica da aplicação
- **Chart.js** - Gráficos interativos
- **PWA** - Service Worker, manifest
- **LocalStorage** - Persistência de dados
- **IndexedDB** (futuro) - Para grandes volumes

---

## 📖 Manual do Usuário

O manual está integrado ao app! Acesse pelo botão **"i"** (informações) no cabeçalho.

### Conteúdo do Manual:
- 🎯 Bem-vindo e dicas iniciais
- 📱 Guia de instalação por plataforma
- 💰 Funcionalidades detalhadas
- 🚀 Guia do Sucesso Financeiro
- 🎯 Regra 50-30-20
- 💎 Investimentos para iniciantes
- 🎓 Educação financeira contínua
- 🎯 Plano de ação de 4 semanas
- 🎯 **Dicas exclusivas do Coach SW**

> 💡 **Dica**: Imprima o manual para consultar sempre que precisar!

---

## 🧪 Testando o App

### Importar Dados de Teste
1. Baixe o arquivo `backup_teste_2025.json`
2. No app, vá em **Menu → Restaurar Backup**
3. Selecione o arquivo
4. Confirme a substituição

O backup contém:
- 📅 13 meses de dados (Dez/2025 - Dez/2026)
- 💳 2 cartões de crédito
- 🏦 2 contas (corrente + investimento)
- 📈 3 aplicações vinculadas
- 🔄 Recorrências variadas (mensal, parcelado, anual)
- 💰 Todas as 21 categorias cobertas

---

## 🎨 Personalização

### Cores do Tema
Edite o arquivo `styles.css` na seção `:root`:

```css
:root {
    --primary-color: #6366f1;    /* Cor principal */
    --accent-color: #06b6d4;     /* Cor de destaque */
    --success-color: #10b981;    /* Verde */
    --danger-color: #ef4444;     /* Vermelho */
    --warning-color: #f59e0b;    /* Amarelo */
}
```

### Categorias Personalizadas
As categorias podem ser editadas diretamente no app ou via backup JSON.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/NovaFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/NovaFeature`)
5. Abra um **Pull Request**

### Padrões de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes

---

## 🗺️ Roadmap

### Próximas Versões
- [ ] Sincronização opcional com nuvem
- [ ] Exportação para Excel (.xlsx)
- [ ] Metas financeiras personalizadas
- [ ] Relatórios anuais em PDF
- [ ] Integração com Open Finance (futuro)
- [ ] Modo multi-usuário (família)
- [ ] App nativo (React Native)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

> O uso é **gratuito para fins pessoais**. Para uso comercial, entre em contato.

---

## 👨‍💻 Autor

<div align="center">

### **RogerElizar™**

*Desenvolvedor & Idealizador*

📧 rogerelizar@gmail.com

</div>

### 💝 Dedicação

> *"Dedico este trabalho aos meus amados filhos. Que este seja um legado de ensino, organização e sabedoria financeira."*

---

## 🙏 Agradecimentos

- A **Deus**, por toda sabedoria e saúde
- À minha **família**, pelo apoio incondicional
- A todos os **usuários** que confiam no Smart Wallet
- À comunidade **open source** pelas ferramentas incríveis

---

## ☕ Apoie o Projeto

Se o Smart Wallet tem sido útil para você, considere fazer uma doação via PIX:

<div align="center">

### 💚 Chave PIX: `rogerelizar@gmail.com`

*Qualquer valor é bem-vindo e ajuda a manter o projeto!*

</div>

---

## 📞 Contato & Suporte

- 📧 **E-mail**: rogerelizar@gmail.com
- 💬 **Feedback**: Use o botão "Apoie o Projeto" no app
- 🐛 **Bugs**: Abra uma issue no GitHub

---

## ⚠️ Aviso Legal

O Smart Wallet é uma **ferramenta de apoio** e não substitui consultoria financeira profissional. Todas as decisões financeiras são de inteira responsabilidade do usuário.

---

<div align="center">

### 🙏 É Isso! 💰

*Que Deus abençoe sua jornada financeira. Que você tenha sabedoria para administrar, generosidade para compartilhar e disciplina para perseverar.*

**Feito com ❤️ por RogerElizar®**

⭐ **Se gostou do projeto, deixe uma estrela no GitHub!** ⭐

</div>