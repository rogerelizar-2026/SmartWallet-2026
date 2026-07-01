# 📋 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [4.1.0] - 2026-07-02

### ✨ Adicionado

#### 📱 Gestos de Deslizar (Swipe) no Mobile
- Deslizar transações para a **direita** marca como "Concluída/Paga"
- Deslizar transações para a **esquerda** abre opção para "Excluir"
- Funciona apenas em telas ≤ 640px
- Feedback visual durante o swipe (animação de cor e deslocamento)
- Reduz drasticamente o número de cliques para ações rotineiras

#### ⚡ Menu de Ações Rápidas (FAB Speed Dial)
- Botão "+" flutuante agora é expansível com 3 opções:
  - 💸 **Nova Despesa** - Abre modal pré-configurado
  - 💰 **Nova Receita** - Abre modal pré-configurado
  - 🔄 **Transferência** - Move saldo entre contas
- Animação suave com delay escalonado nos botões
- Cores diferentes por tipo (azul, verde, vermelho)
- Fecha automaticamente ao clicar fora
- Ícone muda de "+" para "×" quando expandido

#### 🔄 Modal de Transferência entre Contas
- Novo modal dedicado para transferências
- Seleção de conta de origem e destino
- Validação de saldo insuficiente
- Cria automaticamente 2 transações (saída e entrada)
- Data e descrição personalizáveis

#### 📊 Orçamento por Categoria
- Novo menu acessível via Menu Principal → "Orçamento por Categoria"
- Barras de progresso comparando com a **média dos últimos 3 meses**
- Cores dinâmicas indicativas:
  - 🟢 Verde: dentro da média (até 80%)
  - 🟡 Amarelo: próximo do limite (80-100%)
  - 🔴 Vermelho: acima da média (>100%)
- Indicadores ⬆️ ⬇️ mostrando variação em reais
- Ordenação automática por maior gasto

#### 🎉 Sistema de Aviso de Atualização
- Modal "What's New" exibido automaticamente ao detectar nova versão
- Lista organizada de novidades com badges coloridos (NOVO/MELHORADO/CORRIGIDO)
- Lembrete para **imprimir o Manual do Usuário** com dicas do Coach SW
- Botões diretos para imprimir ou visualizar o manual
- Detecção automática via `localStorage` (versão anterior vs atual)

#### 🔔 Alerta de Fechamento de Fatura
- Novo alerta no sino 🔔: "O cartão {nome} fecha amanhã!"
- Disparado automaticamente 1 dia antes do fechamento
- Visual destacado com cor azul (accent-color)
- Botão "Ver Cartão" para acesso rápido à fatura

#### 📑 Navegação entre Faturas
- Setas ← → no modal de fatura para consultar períodos anteriores/posteriores
- Estado persistente durante a navegação (cardId + offset)
- Permite análise histórica de gastos por cartão

#### 💾 Backup de Teste Completo
- Arquivo `backup_teste_completo.json` com 13 meses de dados
- Cobre Dez/2025 a Dez/2026
- 2 contas, 2 cartões, 3 aplicações, 121 transações
- Testa todas as funcionalidades (recorrências, pagamentos, status, etc)

#### 📖 Manual Expandido
- Nova seção "Dicas do Coach SW" com 5 dicas práticas
- Tutorial de Swipe Gestures
- Tutorial do FAB Speed Dial
- Tutorial do Orçamento por Categoria
- Tutorial da Transferência entre Contas
- Seção dedicada a Backup & Segurança
- Lembrete de impressão integrado

### 🔧 Melhorado

#### 💳 Modal de Fatura
- **Período corrigido**: agora vai do fechamento da fatura anterior até o fechamento da atual
- **Vencimento inteligente**: só avança para o mês seguinte quando a fatura efetivamente fecha
- **Indicador visual** de status (Fechada ✓, Vencida, Vence hoje)
- **Cálculo de dias** até o vencimento com mensagens contextuais
- Header redesenhado com navegação integrada

#### 📈 Investimentos Vinculados
- **Sincronização automática** entre aplicações e contas de investimento
- Ao criar aplicação, pode criar conta investment automaticamente
- Ao atualizar valor da aplicação, o saldo da conta é atualizado
- Modal "Minhas Contas" mostra aplicações vinculadas em contas investment
- Modal de aplicações mostra conta vinculada (badge 🏦)
- **Evita dupla contagem** no Saldo Unificado

#### 🎨 Visual dos Modais
- **Menu Principal e Menu Info** com opacidade aumentada para **95%** (era 60%)
- Background semi-sólido melhora legibilidade do texto
- Mantém efeito de blur no fundo (glassmorphism)
- Suporte ao modo claro e escuro

#### ⚠️ Modal de Disclaimer
- **Header e Footer compactos** (redução de ~40% do espaço)
- **Corpo expandido** com scroll suave (`max-height: 92vh`)
- Barra de scroll estilizada com cor do tema
- `-webkit-overflow-scrolling: touch` para iOS
- Botão "Aceitar" com largura 100% (max 320px)
- Timer e botão fixos no rodapé (nunca saem da tela)

#### 🖨️ Impressão de Extrato
- **Coluna Pagamento**: ícones removidos (só texto)
- **Coluna Categoria**: contornos e cores removidos (texto simples)
- Economia de tinta e melhor legibilidade em papel
- Layout mais limpo e profissional

### 🐛 Corrigido

#### 🔧 Correções Técnicas
- **Botão Imprimir do Manual**: função `printManual()` adicionada como método da classe e exposta globalmente
- **Timestamps nos exports**: formato padronizado `SmartWallet-AAAAMMDDHHMMSS_nome.ext`
- **Erro de sintaxe** na concatenação do método `printExtratoPDF` (operador `+` faltante)
- **Estrutura do `manualHTML`**: uso de concatenação de strings para evitar erros
- **Modal de Disclaimer**: z-index correto (10001) sobrepondo splash screen
- **Caches antigos**: SW limpa automaticamente ao detectar nova versão

#### 📱 Correções Mobile
- **Swipe Gestures**: detecção aprimorada de direção (ignora scroll vertical)
- **FAB**: fecha ao clicar fora em qualquer área da tela
- **Disclaimer**: scroll funciona corretamente em iOS e Android

### 📝 Documentação
- **README.md** completo criado com todas as seções
- **CHANGELOG.md** adicionado (este arquivo)
- **Manual do Usuário** expandido com novas seções e dicas
- **Backup de teste** documentado

### 🔄 Atualizações Técnicas
- `manifest.json`: versão atualizada para `4.1.0`
- `sw.js`: `CACHE_NAME` atualizado para `smartwallet-v4.1.0`
- Constante `CURRENT_VERSION` adicionada ao `app.js`
- Objeto `WHATS_NEW_DATA` para gerenciar changelog in-app

---

## [4.0.1] - Versão Anterior

### Recursos Principais
- ✅ Dashboard com saldo unificado
- ✅ Gestão de transações (receitas e despesas)
- ✅ Cartões de crédito com faturas
- ✅ Contas correntes e de investimento
- ✅ Aplicações financeiras (CDB, Tesouro, FIIs)
- ✅ Recorrências (mensal, anual, parcelado)
- ✅ Gráficos interativos (Chart.js)
- ✅ Exportação CSV, PDF e JSON
- ✅ Importação CSV e Backup
- ✅ Modo escuro/claro
- ✅ Modo privacidade
- ✅ PWA instalável
- ✅ Funcionamento 100% offline

---

## 📊 Estatísticas da v4.1.0

| Métrica | v4.0.1 | v4.1.0 | Mudança |
|---------|--------|--------|---------|
| Funcionalidades | 15 | 22 | +7 |
| Modais | 14 | 16 | +2 |
| Linhas de código | ~2.500 | ~3.200 | +700 |
| Funcionalidades UX | 2 | 5 | +3 |
| Dicas do Coach | 0 | 5 | +5 |

---

## 🗺️ Roadmap

### Versões Futuras Planejadas

#### v4.2.0 (Planejado)
- [ ] Sincronização opcional com nuvem (Google Drive/Dropbox)
- [ ] Exportação para Excel (.xlsx)
- [ ] Metas financeiras personalizadas por categoria
- [ ] Relatórios anuais em PDF

#### v5.0.0 (Visão)
- [ ] Integração com Open Finance Brasil
- [ ] Modo multi-usuário (família)
- [ ] App nativo (React Native)
- [ ] IA para sugestões de economia

---

## 📌 Links

- **Repositório**: [GitHub](https://github.com/seu-usuario/smart-wallet)
- **Issues**: [Reportar Bug](https://github.com/seu-usuario/smart-wallet/issues)
- **Manual**: Disponível no app (botão ℹ️)
- **Contato**: rogerelizar@gmail.com

---

<div align="center">

**[⬆ Voltar ao topo](#-changelog)**

*Última atualização: 02/07/2026*

*Desenvolvido com ❤️ por RogerElizar™*

</div>