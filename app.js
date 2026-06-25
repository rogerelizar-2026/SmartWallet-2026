(function() {
    'use strict';

    console.log('🚀 Smart Wallet iniciando...');

    var financialQuotes = [
            { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
            { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
            { text: "O dinheiro não é bom nem mau; é como uma faca. Pode cortar o pão da família ou ferir alguém. Tudo depende da mão que o segura.", author: "Sabedoria Financeira" },
            { text: "Dinheiro é energia. Se você o retém com medo, ele estagna. Se o movimenta com propósito, ele se multiplica.", author: "Sabedoria Financeira" },
            { text: "Não pergunte quanto custa, pergunte quanto vale. Preço é o que você paga; valor é o que você recebe.", author: "Sabedoria Financeira" },
            { text: "O dinheiro deve trabalhar para você, não você para o dinheiro. Liberdade financeira é ter opções, não ostentação.", author: "Sabedoria Financeira" },
            { text: "Riqueza verdadeira não é ter muito, é depender de pouco. O dinheiro é ponte para seus valores, não o destino final.", author: "Sabedoria Financeira" },
            { text: "Riqueza é a capacidade de viver completamente a vida.", author: "Henry David Thoreau" },
            { text: "Um orçamento está dizendo a seu dinheiro para onde ir, em vez de se perguntar para onde ele foi.", author: "Dave Ramsey" },
            { text: "Amar dinheiro demais é a raiz de todos os problemas. Muita gente se afastou da fé por causa disso e se encheu de angústia.", author: "1 Timóteo 6:10 (Linguagem Atual)" },
            { text: "É melhor ter pouco e temer a Deus do que ter um tesouro enorme e viver preocupado.", author: "Provérbios 15:16 (Linguagem Atual)" },
            { text: "Quem deve fica escravo de quem empresta. O rico manda no pobre.", author: "Provérbios 22:7 (Linguagem Atual)" },
            { text: "O dinheiro não muda pessoas; apenas revela quem elas realmente são.", author: "Provérbio Financeiro Moderno" },
            { text: "Quando Deus abençoa com prosperidade, isso não vem junto com dor de cabeça.", author: "Provérbios 10:22 (Linguagem Atual)" },
            { text: "É melhor trabalhar com dedicação do que ser preguiçoso e só ficar sonhando.", author: "Provérbios 13:4 (Linguagem Atual)" },
            { text: "Não economize o que resta depois de gastar; gaste o que resta depois de poupar.", author: "Warren Buffett" },
            { text: "Se você não encontrar uma maneira de ganhar dinheiro enquanto dorme, você trabalhará até morrer.", author: "Warren Buffett" },
            { text: "O melhor investimento que você pode fazer é em si mesmo.", author: "Warren Buffett" },
            { text: "Dinheiro é um péssimo mestre, mas um excelente servo.", author: "P.T. Barnum" },
            { text: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", author: "Epicteto" },
            { text: "Cuidado com pequenos gastos; um pequeno vazamento afundará um grande navio.", author: "Benjamin Franklin" },
            { text: "Dê um décimo para que você se torne rico.", author: "Talmude - Deuteronômio 14:22" },
            { text: "O dinheiro não é sagrado, não é um objeto santo inatingível. É como roupa: uma ferramenta para viver.", author: "Talmude" },
            { text: "Uma pessoa deve sempre dividir seu dinheiro em três partes: um terço em terra, um terço em negócios e um terço em dinheiro vivo.", author: "Talmude - Diversificação de Investimentos" },
            { text: "Com dinheiro você não pode fazer tudo; sem dinheiro você não pode fazer nada!", author: "Provérbio Judaico" },
            { text: "Todos reclamam da falta de dinheiro, mas ninguém reclama da falta de inteligência.", author: "Provérbio Judaico" },
            { text: "Quem compra o que não precisa, rouba a si mesmo.", author: "Provérbio Popular" },
            { text: "A independência financeira não é sobre ficar rico, é sobre ter opções.", author: "Chris Reining" },
            { text: "Não é o quanto você ganha, é o quanto você faz o dinheiro trabalhar para você.", author: "Robert Kiyosaki" },
            { text: "Pague a si mesmo primeiro.", author: "George Samuel Clason" },
            { text: "Riqueza é como um cigarro: se você não fumar, ela dura mais.", author: "Provérbio Popular" },
            { text: "O mercado de ações é um mecanismo para transferir dinheiro do impaciente para o paciente.", author: "Warren Buffett" },
            { text: "A melhor hora para plantar uma árvore foi há 20 anos. A segunda melhor hora é agora.", author: "Provérbio Chinês" },
            { text: "Finanças não são sobre matemática, são sobre comportamento.", author: "Morgan Housel" },
            { text: "Pessoas ricas acreditam que ganham dinheiro com ideias. Pessoas pobres acreditam que ganham dinheiro com tempo.", author: "Robert Kiyosaki" },
            { text: "Gastar dinheiro para impressionar pessoas é a maneira mais rápida de ficar pobre.", author: "Morgan Housel" },
            { text: "A verdadeira medida da riqueza é quanto você valeria se perdesse todo o seu dinheiro.", author: "Provérbio" },
            { text: "Economizar é a melhor estratégia de investimento.", author: "Nathaniel Hale" },
            { text: "A diferença entre ricos e pobres é o que eles fazem com o tempo livre.", author: "Robert Kiyosaki" },
            { text: "Cada real que você economiza é um empregado que trabalha para você.", author: "T. Harv Eker" },
            { text: "A maior riqueza é a que menos se corrompe, a da consciência.", author: "Sêneca" },
            { text: "Se você vive para impressionar os outros, nunca será rico de verdade.", author: "Morgan Housel" },
            { text: "A liberdade financeira é mais sobre controle do que sobre dinheiro.", author: "Ramit Sethi" },
            { text: "Não coloque sua fé no dinheiro. Coloque seu dinheiro na sua fé.", author: "Provérbio" },
            { text: "O maior inimigo da riqueza é a expectativa de ficar rico rápido.", author: "Morgan Housel" },
            { text: "Planeje suas finanças como planeja suas férias: com destino, roteiro e orçamento.", author: "Anônimo" },
            { text: "Se você quer saber quanto vale uma pessoa, observe como ela trata quem não pode lhe dar nada em troca.", author: "Provérbio Judaico" },
            { text: "O rico não é quem tem mais, é quem precisa de menos.", author: "Provérbio Judaico" },
            { text: "Dinheiro emprestado sem confiança é como semente plantada em pedra: não nasce.", author: "Provérbio Judaico" },
            { text: "A pobreza não é falta de dinheiro, é falta de visão. Quem enxerga oportunidades, nunca fica sem recursos.", author: "Provérbio Judaico" },
            { text: "Ricos adquirem ativos. Pobres e classe média adquirem passivos que acham serem ativos.", author: "Robert Kiyosaki" },
            { text: "A paciência é a virtude dos investidores bem-sucedidos.", author: "Peter Lynch" },
            { text: "Saber gastar é tão importante quanto saber ganhar.", author: "Provérbio Popular" },
            { text: "Dinheiro é um ótimo servo, mas um péssimo mestre.", author: "Francis Bacon" },
            { text: "A prosperidade depende mais da sua mentalidade do que da sua conta bancária.", author: "T. Harv Eker" },
            { text: "Investir em conhecimento paga os melhores juros.", author: "Benjamin Franklin" },
            { text: "Não espere; o tempo nunca será 'o certo'. Comece de onde você está.", author: "Napoleon Hill" },
            { text: "A educação financeira é a base da liberdade financeira.", author: "Robert Kiyosaki" },
            { text: "O futuro pertence àqueles que se preparam hoje.", author: "Malcolm X" },
            { text: "Antes de gastar, aprenda a ganhar. Antes de ganhar, aprenda a poupar.", author: "Provérbio" }
        ];

    var PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'scheduled', name: 'Agendamento', icon: '📅' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

    var DEFAULT_CATEGORIES = [
        { id: 'moradia', name: 'Moradia', color: '#ffff00', type: 'expense' },
        { id: 'alimentacao', name: 'Alimentação', color: '#e37171', type: 'expense' },
        { id: 'transporte', name: 'Transporte', color: '#21fffb', type: 'expense' },
        { id: 'saude', name: 'Saúde', color: '#ff9c38', type: 'expense' },
        { id: 'educacao', name: 'Educação', color: '#0000ff', type: 'expense' },
        { id: 'lazer', name: 'Lazer', color: '#ff00ff', type: 'expense' },
        { id: 'servicos', name: 'Serviços', color: '#5117a3', type: 'expense' },
        { id: 'investimento', name: 'Investimento', color: '#e6dcb1', type: 'expense' },
        { id: 'salario', name: 'Salário', color: '#475569', type: 'income' },
        { id: 'freelancer', name: 'Freelancer', color: '#b3e6e0', type: 'income' }
    ];

    // ===== CONTEÚDO DO MANUAL =====
    var manualHTML = '<div class="manual-cover">' +
        '<h1>📘 Manual do Usuário</h1>' +
        '<h2>Smart Wallet Brasil</h2>' +
        '<p>Controle Financeiro Pessoal Inteligente</p>' +
        '<p class="version">Versão 2.0.2 - 2026</p>' +
        '<p class="author">Idealizado por RogerElizar™</p>' +
        '</div>' +
        '<div class="manual-quote">' +
        '<p>"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."</p>' +
        '<div class="quote-author">— Tiago 1:17</div>' +
        '</div>' +
        '<p>Agradeço a Deus por toda sabedoria, saúde e recursos que me permitiram desenvolver este projeto.</p>' +
        '<div class="dedication">' +
        '<h3>💝 Aos meus filhos</h3>' +
        '<div class="manual-quote">' +
        '<p>Dedico este trabalho a vocês, meus amados filhos. Que este seja um legado de ensino, organização e sabedoria financeira.</p>' +
        '<div class="quote-author">— Com todo amor: Rogério</div>' +
        '</div>' +
        '</div>' +
        '<h2>🎯 Bem-vindo ao Smart Wallet Brasil!</h2>' +
        '<p>Parabéns por dar o primeiro passo rumo à sua <strong>liberdade financeira</strong>! O Smart Wallet Brasil não é apenas mais um aplicativo de controle de gastos — é seu parceiro na jornada para transformar sua relação com o dinheiro.</p>' +
        '<div class="manual-tip">' +
        '<strong>💡 Você sabia?</strong> Estudos mostram que pessoas que acompanham suas finanças regularmente economizam em média <strong>20% a mais</strong> do que aquelas que não controlam seus gastos.' +
        '</div>' +
        '<h2>📱 Instalação como WebApp</h2>' +
        '<p>O Smart Wallet funciona como um aplicativo instalado no seu dispositivo, mesmo sendo uma aplicação web.</p>' +
        '<h3>💻 No Computador (Chrome, Edge, Brave)</h3>' +
        '<ol>' +
        '<li>Acesse o site pelo navegador</li>' +
        '<li>Procure o ícone de instalação na barra de endereços (monitor com seta para baixo)</li>' +
        '<li>Ou clique no menu do navegador (⋮) → "Instalar Smart Wallet..."</li>' +
        '<li>Confirme a instalação</li>' +
        '<li>Pronto! O app aparecerá na sua área de trabalho</li>' +
        '</ol>' +
        '<h3>📱 No Celular Android (Chrome)</h3>' +
        '<ol>' +
        '<li>Abra o site no Chrome</li>' +
        '<li>Toque nos três pontos (⋮) no canto superior direito</li>' +
        '<li>Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"</li>' +
        '<li>Confirme tocando em "Instalar"</li>' +
        '<li>O ícone aparecerá na sua tela inicial</li>' +
        '</ol>' +
        '<h3>🍎 No iPhone (Safari)</h3>' +
        '<ol>' +
        '<li>Abra o site no Safari</li>' +
        '<li>Toque no botão Compartilhar (quadrado com seta)</li>' +
        '<li>Role para baixo e toque em "Adicionar à Tela de Início"</li>' +
        '<li>Toque em "Adicionar"</li>' +
        '<li>O app aparecerá na sua tela inicial</li>' +
        '</ol>' +
        '<div class="manual-tip">' +
        '<strong>🔒 Privacidade Total:</strong> Após a instalação, o app funciona mesmo offline! Todos os dados ficam apenas no seu dispositivo.' +
        '</div>' +
        '<h2>💰 Funcionalidades Principais</h2>' +
        '<h3>📊 Dashboard Financeiro</h3>' +
        '<p>A tela inicial mostra um resumo completo da sua situação financeira:</p>' +
        '<ul>' +
        '<li><strong>Saldo do Mês:</strong> Quanto você ganhou menos quanto gastou</li>' +
        '<li><strong>Receitas:</strong> Total de entradas (salário, freelas, etc)</li>' +
        '<li><strong>Despesas:</strong> Total de saídas</li>' +
        '<li><strong>Meta de Reserva:</strong> Progresso em direção à sua meta</li>' +
        '</ul>' +
        '<div class="manual-success">' +
        '<strong>🎯 Dica de Coach:</strong> Uma boa regra é ter uma reserva de emergência equivalente a <strong>6 meses</strong> das suas despesas mensais. Isso te protege contra imprevistos sem precisar recorrer a empréstimos.' +
        '</div>' +
        '<h3>💳 Gestão de Cartões de Crédito</h3>' +
        '<p>Controle todos os seus cartões em um só lugar:</p>' +
        '<ul>' +
        '<li>Cadastre cartões com limite, dia de fechamento e vencimento</li>' +
        '<li>Acompanhe faturas e compras parceladas</li>' +
        '<li>Veja quanto do limite já foi utilizado</li>' +
        '<li>Exporte faturas em CSV ou PDF</li>' +
        '</ul>' +
        '<div class="manual-warning">' +
        '<strong>⚠️ Atenção:</strong> Cartões de crédito podem ser grandes vilões financeiros se mal utilizados. A regra de ouro: <strong>só compre no crédito se puder pagar a fatura integralmente</strong>. Parcelar a fatura gera juros que podem multiplicar sua dívida em até 15x!' +
        '</div>' +
        '<h3>🔔 Alertas de Contas</h3>' +
        '<p>Nunca mais esqueça uma conta! O sistema avisa automaticamente quando há contas vencendo nos próximos 3 dias.</p>' +
        '<h3>📈 Gráficos e Análises</h3>' +
        '<p>Visualize seus dados de forma clara:</p>' +
        '<ul>' +
        '<li><strong>Entradas e Saídas:</strong> Evolução mensal</li>' +
        '<li><strong>Despesas por Categoria:</strong> Onde seu dinheiro está indo</li>' +
        '<li><strong>Projeção:</strong> Estimativa para o próximo mês</li>' +
        '</ul>' +
        '<h2>🚀 Guia do Sucesso Financeiro</h2>' +
        '<h3>💡 A Mentalidade da Prosperidade</h3>' +
        '<p>Muitas pessoas acham que riqueza é apenas para "ricos". Mas a verdade é que <strong>prosperidade financeira</strong> é acessível a todos que seguem princípios básicos:</p>' +
        '<div class="manual-success">' +
        '<strong>Caso Real - João e Maria:</strong><br>' +
        'João e Maria ganhavam R$ 5.000/mês. Sem controle, viviam no limite. Começaram a usar o Smart Wallet e aplicaram a regra 50-30-20:<br><br>' +
        '• <strong>R$ 2.500</strong> (50%) - Necessidades (aluguel, comida, transporte)<br>' +
        '• <strong>R$ 1.500</strong> (30%) - Desejos (lazer, restaurantes)<br>' +
        '• <strong>R$ 1.000</strong> (20%) - Objetivos financeiros<br><br>' +
        'Em 3 anos, construíram uma reserva de R$ 36.000 e começaram a investir. Hoje, 5 anos depois, têm R$ 120.000 investidos e uma vida financeira tranquila. Não são milionários, mas são <strong>financeiramente livres</strong>.' +
        '</div>' +
        '<h3>🎯 A Regra 50-30-20</h3>' +
        '<p>Uma boa divisão do seu salário é:</p>' +
        '<ul>' +
        '<li><strong>50%</strong> para necessidades (aluguel, comida, transporte)</li>' +
        '<li><strong>30%</strong> para desejos (lazer, restaurantes, hobbies)</li>' +
        '<li><strong>20%</strong> para objetivos financeiros (reserva, investimentos, quitar dívidas)</li>' +
        '</ul>' +
        '<h3>💎 Poupar NÃO é Suficiente - Invista!</h3>' +
        '<p>Muitas pessoas cometem o erro de apenas guardar dinheiro na poupança. Mas com a inflação, seu dinheiro <strong>perde valor</strong> com o tempo!</p>' +
        '<div class="manual-warning">' +
        '<strong>Caso Real - Carlos:</strong><br>' +
        'Carlos guardava R$ 500/mês na poupança. Em 10 anos, tinha R$ 60.000. Mas com inflação média de 5% ao ano, esses R$ 60.000 compravam apenas o equivalente a R$ 37.000 de 10 anos atrás. Ele <strong>perdeu R$ 23.000 em poder de compra</strong>!' +
        '</div>' +
        '<div class="manual-success">' +
        '<strong>Caso Real - Ana:</strong><br>' +
        'Ana investia R$ 500/mês em um CDB que rendia 10% ao ano. Em 10 anos, tinha R$ 102.000. Mesmo com a mesma inflação, seu dinheiro <strong>rendeu acima da inflação</strong> e ela ganhou poder de compra real!' +
        '</div>' +
        '<h3>📊 Onde Investir (Básico)</h3>' +
        '<p>Para iniciantes, algumas opções seguras:</p>' +
        '<ul>' +
        '<li><strong>Tesouro Direto:</strong> Emprestar dinheiro para o governo (muito seguro)</li>' +
        '<li><strong>CDB:</strong> Emprestar dinheiro para bancos (rendimento melhor que poupança)</li>' +
        '<li><strong>LCI/LCA:</strong> Isentos de imposto de renda</li>' +
        '<li><strong>Fundos de Investimento:</strong> Pool de investimentos gerenciados por profissionais</li>' +
        '</ul>' +
        '<div class="manual-tip">' +
        '<strong>💡 Dica de Ouro:</strong> Antes de investir, quite todas as dívidas com juros altos (cartão de crédito, cheque especial). Os juros que você paga são quase sempre maiores que qualquer investimento!' +
        '</div>' +
        '<h3>⚠️ Os Riscos da Estagnação Financeira</h3>' +
        '<p>Não cuidar das finanças pode levar a situações graves:</p>' +
        '<div class="manual-warning">' +
        '<strong>Caso Hipotético - Pedro:</strong><br>' +
        'Pedro ganhava bem, mas não controlava gastos. Acumulou R$ 30.000 em dívidas no cartão. Os juros de 12% ao mês fizeram a dívida crescer para R$ 100.000 em 2 anos. Perdeu o emprego, não conseguiu pagar, teve o nome negativado e não conseguia mais nem alugar um apartamento. Levou 5 anos para se recuperar.<br><br>' +
        '<strong>Lição:</strong> Dívidas não resolvidas crescem exponencialmente e podem destruir sua vida financeira por anos.' +
        '</div>' +
        '<h3>🎓 Educação Financeira Contínua</h3>' +
        '<p>O mundo financeiro está sempre mudando. Mantenha-se informado:</p>' +
        '<ul>' +
        '<li>Leia livros sobre finanças (sugestões: "Pai Rico, Pai Pobre", "O Homem Mais Rico da Babilônia")</li>' +
        '<li>Acompanhe canais educativos no YouTube</li>' +
        '<li>Faça cursos gratuitos online</li>' +
        '<li>Converse com pessoas financeiramente organizadas</li>' +
        '</ul>' +
        '<h2>🎯 Seu Plano de Ação</h2>' +
        '<h3>Semana 1: Diagnóstico</h3>' +
        '<ol>' +
        '<li>Cadastre todas as suas fontes de renda</li>' +
        '<li>Registre todos os gastos do mês atual</li>' +
        '<li>Identifique onde seu dinheiro está indo</li>' +
        '</ol>' +
        '<h3>Semana 2: Organização</h3>' +
        '<ol>' +
        '<li>Crie categorias personalizadas para seus gastos</li>' +
        '<li>Defina sua meta de reserva de emergência</li>' +
        '<li>Configure alertas para contas importantes</li>' +
        '</ol>' +
        '<h3>Semana 3: Planejamento</h3>' +
        '<ol>' +
        '<li>Aplique a regra 50-30-20 ao seu orçamento</li>' +
        '<li>Identifique gastos que podem ser cortados</li>' +
        '<li>Defina metas financeiras de curto, médio e longo prazo</li>' +
        '</ol>' +
        '<h3>Semana 4: Execução</h3>' +
        '<ol>' +
        '<li>Comece a registrar TODOS os gastos diariamente</li>' +
        '<li>Revise seus gastos semanalmente</li>' +
        '<li>Ajuste seu orçamento conforme necessário</li>' +
        '</ol>' +
        '<div class="manual-success">' +
        '<strong>🌟 Lembre-se:</strong> A jornada de mil milhas começa com um único passo. Você já deu o primeiro passo ao baixar este aplicativo. Continue firme e consistente. Em 6 meses, você não vai se reconhecer!' +
        '</div>' +
        '<h2>🥷 Ajuda</h2>' +
        '<p>Se tiver dúvidas ou sugestões, entre em contato:</p>' +
        '<ul>' +
        '<li><strong>E-mail:</strong> rogerelizar@gmail.com</li>' +
        '<li><strong>Feedback:</strong> Use o botão "Apoie o Projeto" no menu</li>' +
        '</ul>' +
        '<div class="manual-blessing">' +
        '<h3>🙏 É Isso! 💰</h3>' +
        '<div class="manual-quote">' +
        '<p>Que Deus abençoe sua jornada financeira. Que você tenha sabedoria para administrar, generosidade para compartilhar e disciplina para perseverar. Que cada decisão financeira seja um passo em direção à prosperidade que Deus preparou para você.</p>' +
        '<div class="quote-author">Com amor e orações,<br>RogerElizar®</div>' +
        '</div>' +
        '</div>';

    function SmartWallet() {
        this.transactions = [];
        this.categories = [];
        this.accounts = [];
        this.cards = [];
        this.cardPurchases = [];
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

    SmartWallet.prototype.loadData = function() {
        try {
            var t = localStorage.getItem('smartwallet_transactions');
            if (t) this.transactions = JSON.parse(t);
            var c = localStorage.getItem('smartwallet_categories');
            if (c) this.categories = JSON.parse(c);
            else this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
            var a = localStorage.getItem('smartwallet_accounts');
            if (a) this.accounts = JSON.parse(a);
            var cd = localStorage.getItem('smartwallet_cards');
            if (cd) this.cards = JSON.parse(cd);
            var cp = localStorage.getItem('smartwallet_card_purchases');
            if (cp) this.cardPurchases = JSON.parse(cp);
            var inv = localStorage.getItem('smartwallet_investments');
            if (inv) this.investments = JSON.parse(inv);
            var dm = localStorage.getItem('smartwallet_dark');
            if (dm !== null) this.darkMode = dm === 'true';
            var pv = localStorage.getItem('smartwallet_privacy');
            if (pv !== null) this.privacyOn = pv === 'true';
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    };

    SmartWallet.prototype.saveTransactions = function() {
        try { localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions)); } catch (e) { console.error(e); }
    };
    SmartWallet.prototype.saveCategories = function() {
        try { localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories)); } catch (e) { console.error(e); }
    };
    SmartWallet.prototype.saveAccounts = function() {
        try { localStorage.setItem('smartwallet_accounts', JSON.stringify(this.accounts)); } catch (e) { console.error(e); }
    };
    SmartWallet.prototype.saveCards = function() {
        try { localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards)); } catch (e) { console.error(e); }
    };
    SmartWallet.prototype.saveCardPurchases = function() {
        try { localStorage.setItem('smartwallet_card_purchases', JSON.stringify(this.cardPurchases)); } catch (e) { console.error(e); }
    };
    SmartWallet.prototype.saveInvestments = function() {
        try { localStorage.setItem('smartwallet_investments', JSON.stringify(this.investments)); } catch (e) { console.error(e); }
    };

    SmartWallet.prototype.init = function() {
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
    };

    SmartWallet.prototype.setupEventListeners = function() {
        var self = this;
        var form = document.getElementById('transactionForm');
        if (form) {
            form.addEventListener('submit', function(e) { e.preventDefault(); self.addTransaction(); });
        }
        var editForm = document.getElementById('editForm');
        if (editForm) {
            editForm.addEventListener('submit', function(e) { e.preventDefault(); self.updateTransaction(); });
        }
        var search = document.getElementById('searchFilter');
        if (search) {
            search.addEventListener('input', function() {
                clearTimeout(self.searchTimeout);
                self.searchTimeout = setTimeout(function() { self.render(); }, 300);
            });
        }
        var typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', function() {
                self.filterCategoriesByType('categoryFilter', typeFilter.value);
                self.render();
            });
        }
        var catFilter = document.getElementById('categoryFilter');
        if (catFilter) catFilter.addEventListener('change', function() { self.render(); });
        var statusFilter = document.getElementById('statusFilter');
        if (statusFilter) statusFilter.addEventListener('change', function() { self.render(); });
        var accountFilter = document.getElementById('accountFilter');
        if (accountFilter) accountFilter.addEventListener('change', function() { self.render(); });
    };

    SmartWallet.prototype.setDefaultDate = function() {
        var el = document.getElementById('date');
        if (el) el.value = new Date().toISOString().split('T')[0];
    };

    SmartWallet.prototype.changeMonth = function(delta) {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
        this.updateMonthDisplay();
        this.render();
        this.updateCharts();
    };

    SmartWallet.prototype.updateMonthDisplay = function() {
        var months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        var el = document.getElementById('currentMonth');
        if (el) el.textContent = months[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
    };

    SmartWallet.prototype.formatMonthYear = function(date) {
        var m = String(date.getMonth() + 1).padStart(2, '0');
        return m + '-' + date.getFullYear();
    };

    SmartWallet.prototype.getMonthTransactions = function(date) {
        if (!date) date = this.currentMonth;
        var m = date.getMonth();
        var y = date.getFullYear();
        return this.transactions.filter(function(t) {
            var d = new Date(t.date + 'T00:00:00');
            return d.getMonth() === m && d.getFullYear() === y;
        });
    };

    SmartWallet.prototype.populateCategorySelects = function() {
        var self = this;
        var selects = [
            document.getElementById('category'),
            document.getElementById('editCategory'),
            document.getElementById('categoryFilter'),
            document.getElementById('purchaseCategory')
        ];
        selects.forEach(function(sel, i) {
            if (!sel) return;
            var val = sel.value;
            var isFilter = i === 2;
            sel.innerHTML = isFilter ? '<option value="">Todas as categorias</option>' : '<option value="">Selecione...</option>';
            self.categories.forEach(function(cat) {
                var opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = cat.name;
                opt.dataset.type = cat.type;
                sel.appendChild(opt);
            });
            sel.value = val;
        });
        this.filterCategoriesByType('category', this.currentTransactionType);
        var typeFilter = document.getElementById('typeFilter');
        if (typeFilter) this.filterCategoriesByType('categoryFilter', typeFilter.value);
    };

    SmartWallet.prototype.populatePaymentMethodSelects = function() {
        var self = this;
        var selects = [
            document.getElementById('paymentMethod'),
            document.getElementById('editPaymentMethod')
        ];
        selects.forEach(function(sel) {
            if (!sel) return;
            var currentVal = sel.value;
            sel.innerHTML = '<option value="">Selecione...</option>';
            PAYMENT_METHODS.forEach(function(pm) {
                var opt = document.createElement('option');
                opt.value = pm.id;
                opt.textContent = pm.icon + ' ' + pm.name;
                sel.appendChild(opt);
            });
            if (self.cards.length > 0) {
                var group = document.createElement('optgroup');
                group.label = '💳 Cartões de Crédito';
                self.cards.forEach(function(card) {
                    var opt = document.createElement('option');
                    opt.value = 'card:' + card.id;
                    opt.textContent = card.name + ' •••• ' + (card.last4 || '****');
                    group.appendChild(opt);
                });
                sel.appendChild(group);
            }
            sel.value = currentVal;
        });
    };

    SmartWallet.prototype.populateAccountSelects = function() {
        var self = this;
        var selects = [
            document.getElementById('transactionAccount'),
            document.getElementById('editTransactionAccount'),
            document.getElementById('accountFilter')
        ];
        selects.forEach(function(sel) {
            if (!sel) return;
            var val = sel.value;
            var isFilter = sel.id === 'accountFilter';
            sel.innerHTML = isFilter ? '<option value="">Todas as contas</option>' : '<option value="">Selecione a conta...</option>';
            self.accounts.forEach(function(acc) {
                var opt = document.createElement('option');
                opt.value = acc.id;
                opt.textContent = (acc.type === 'checking' ? '💳 ' : '📈 ') + acc.name;
                sel.appendChild(opt);
            });
            sel.value = val;
        });
    };

    SmartWallet.prototype.filterCategoriesByType = function(selectId, type) {
        var sel = document.getElementById(selectId);
        if (!sel) return;
        var options = sel.querySelectorAll('option');
        options.forEach(function(opt) {
            if (opt.value === '') opt.style.display = 'block';
            else opt.style.display = (!type || opt.dataset.type === type) ? 'block' : 'none';
        });
        var currentVal = sel.value;
        if (currentVal) {
            var currentOpt = sel.querySelector('option[value="' + currentVal + '"]');
            if (currentOpt && currentOpt.style.display === 'none') sel.value = '';
        }
    };

    SmartWallet.prototype.getCategoryById = function(id) {
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id === id) return this.categories[i];
        }
        return { name: 'Sem categoria', color: '#6b7280', type: 'expense' };
    };

    SmartWallet.prototype.findCategoryByName = function(name) {
        var lower = name.toLowerCase();
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name.toLowerCase() === lower) return this.categories[i];
        }
        return null;
    };

    SmartWallet.prototype.getCardById = function(id) {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id === id) return this.cards[i];
        }
        return null;
    };

    SmartWallet.prototype.getPaymentMethodName = function(method) {
        if (!method) return '-';
        if (method.indexOf('card:') === 0) {
            var cardId = method.replace('card:', '');
            var card = this.getCardById(cardId);
            return card ? '💳 ' + card.name : 'Cartão removido';
        }
        for (var i = 0; i < PAYMENT_METHODS.length; i++) {
            if (PAYMENT_METHODS[i].id === method) return PAYMENT_METHODS[i].icon + ' ' + PAYMENT_METHODS[i].name;
        }
        return method;
    };

    SmartWallet.prototype.addTransaction = function() {
        var date = document.getElementById('date').value;
        var amount = parseFloat(document.getElementById('amount').value);
        var category = document.getElementById('category').value;
        var description = document.getElementById('description').value;
        var statusOk = document.getElementById('statusOk').checked;
        var paymentMethod = document.getElementById('paymentMethod').value;
        var accountId = document.getElementById('transactionAccount').value;

        if (!category) { this.showToast('Selecione uma categoria'); return; }
        if (!paymentMethod) { this.showToast('Selecione a forma de pagamento'); return; }

        var transaction = {
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
    };

    SmartWallet.prototype.clearForm = function() {
        var form = document.getElementById('transactionForm');
        if (form) form.reset();
        this.setDefaultDate();
        this.currentTransactionType = 'expense';
        var btns = document.querySelectorAll('#transactionForm .type-btn');
        btns.forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-type') === 'expense');
        });
        this.filterCategoriesByType('category', 'expense');
    };

    SmartWallet.prototype.editTransaction = function(id) {
        var t = null;
        for (var i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id === id) { t = this.transactions[i]; break; }
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

        var btns = document.querySelectorAll('#editForm .type-btn');
        var self = this;
        btns.forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-type') === self.currentEditType);
        });

        this.filterCategoriesByType('editCategory', this.currentEditType);
        document.getElementById('editModal').classList.add('active');
    };

    SmartWallet.prototype.updateTransaction = function() {
        var id = parseInt(document.getElementById('editId').value);
        var idx = -1;
        for (var i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].id === id) { idx = i; break; }
        }
        if (idx === -1) return;

        this.transactions[idx] = {
            id: id,
            date: document.getElementById('editDate').value,
            amount: this.currentEditType === 'expense' ? -Math.abs(parseFloat(document.getElementById('editAmount').value)) : Math.abs(parseFloat(document.getElementById('editAmount').value)),
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
    };

    SmartWallet.prototype.deleteFromEdit = function() {
        if (!this.currentEditId) return;
        if (!confirm('Excluir esta transação?')) return;
        var self = this;
        this.transactions = this.transactions.filter(function(t) { return t.id !== self.currentEditId; });
        this.saveTransactions();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        closeEditModal();
        this.showToast('Excluída!');
    };

    SmartWallet.prototype.getFilteredTransactions = function() {
        var search = (document.getElementById('searchFilter').value || '').toLowerCase();
        var catFilter = document.getElementById('categoryFilter').value;
        var typeFilter = document.getElementById('typeFilter').value;
        var statusFilter = document.getElementById('statusFilter').value;
        var accountFilter = document.getElementById('accountFilter').value;
        var self = this;

        return this.getMonthTransactions().filter(function(t) {
            var cat = self.getCategoryById(t.category);
            var matchSearch = !search || (t.description || '').toLowerCase().indexOf(search) !== -1 || cat.name.toLowerCase().indexOf(search) !== -1;
            var matchCat = !catFilter || t.category === catFilter;
            var matchType = !typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0);
            var matchStatus = !statusFilter || (statusFilter === 'done' ? t.statusOk : !t.statusOk);
            var matchAccount = !accountFilter || t.accountId === accountFilter;
            return matchSearch && matchCat && matchType && matchStatus && matchAccount;
        });
    };

    SmartWallet.prototype.formatCurrency = function(v) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
    };

    SmartWallet.prototype.formatDate = function(d) {
        return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
    };

    SmartWallet.prototype.escapeHtml = function(t) {
        var div = document.createElement('div');
        div.textContent = t || '';
        return div.innerHTML;
    };

    SmartWallet.prototype.updateDashboard = function() {
        var mt = this.getMonthTransactions();
        var inc = 0, exp = 0;
        mt.forEach(function(t) {
            if (t.amount > 0) inc += t.amount;
            else exp += t.amount;
        });

        var unifiedBalance = 0;
        this.accounts.forEach(function(a) {
            if (a.type === 'checking') unifiedBalance += (parseFloat(a.balance) || 0);
        });

        var creditCardTotal = 0;
        var self = this;
        this.cards.forEach(function(card) {
            var period = self.getInvoicePeriod(card);
            var purchases = self.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
            creditCardTotal += self.calculateInvoiceTotal(card, purchases, period.startDate, period.closingDate);
        });

        var balEl = document.getElementById('totalBalance');
        if (balEl) {
            balEl.textContent = this.formatCurrency(unifiedBalance);
            balEl.className = 'card-value privacy-value ' + (unifiedBalance >= 0 ? 'positive' : 'negative');
        }
        var incEl = document.getElementById('totalIncome');
        if (incEl) incEl.textContent = this.formatCurrency(inc);
        var expEl = document.getElementById('totalExpenses');
        if (expEl) expEl.textContent = this.formatCurrency(Math.abs(exp));
        var goalEl = document.getElementById('goalProgress');
        if (goalEl) {
            goalEl.textContent = this.formatCurrency(creditCardTotal);
            goalEl.className = 'card-value privacy-value negative';
        }
    };

    SmartWallet.prototype.render = function() {
        this.updateDashboard();
        var tbody = document.getElementById('transactionsTable');
        var empty = document.getElementById('emptyState');
        if (!tbody) return;

        var filtered = this.getFilteredTransactions();
        if (!filtered.length) {
            tbody.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
        }
        if (empty) empty.style.display = 'none';

        var sorted = filtered.slice().sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
        var balMap = {};
        var run = 0;
        var reversed = sorted.slice().reverse();
        var self = this;
        reversed.forEach(function(t) {
            run += t.amount;
            balMap[t.id] = run;
        });

        var html = '';
        sorted.forEach(function(t) {
            var cat = self.getCategoryById(t.category);
            var acc = null;
            for (var i = 0; i < self.accounts.length; i++) {
                if (self.accounts[i].id === t.accountId) { acc = self.accounts[i]; break; }
            }
            var cls = t.amount >= 0 ? 'positive' : 'negative';
            var statusClass = t.statusOk ? 'status-done' : 'status-pending';
            var statusText = t.statusOk ? 'Concluído' : 'Pendente';
            var paymentName = self.getPaymentMethodName(t.paymentMethod);
            
            var recurrenceHtml = '';
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
    };

    SmartWallet.prototype.applyTheme = function() {
        document.body.classList.toggle('light', !this.darkMode);
        var btn = document.getElementById('themeBtn');
        if (btn) {
            btn.innerHTML = this.darkMode
                ? '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
                : '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        }
        if (Object.keys(this.charts).length > 0) {
            try { this.updateChartsTheme(); } catch (e) { console.warn('Erro tema:', e); }
        }
    };

    SmartWallet.prototype.applyPrivacy = function() {
        document.body.classList.toggle('privacy-on', this.privacyOn);
        var btn = document.getElementById('privacyBtn');
        if (btn) {
            btn.innerHTML = this.privacyOn
                ? '<svg class="icon" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
                : '<svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
            btn.classList.toggle('active', this.privacyOn);
        }
    };

    SmartWallet.prototype.showToast = function(msg) {
        var t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.classList.add('active');
        var self = this;
        clearTimeout(this.toastT);
        this.toastT = setTimeout(function() { t.classList.remove('active'); }, 3000);
    };

    SmartWallet.prototype.getChartColors = function() {
        var isLight = document.body.classList.contains('light');
        return {
            text: isLight ? '#1e293b' : '#e2e8f0',
            grid: isLight ? '#e5e7eb' : '#334155',
            textSecondary: isLight ? '#64748b' : '#94a3b8'
        };
    };

    SmartWallet.prototype.initCharts = function() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js não carregado!');
            return;
        }
        var colors = this.getChartColors();
        var lineOpts = {
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
                    barPercentage: 0.12,
                    categoryPercentage: 0.15
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
    };

    SmartWallet.prototype.updateChartsTheme = function() {
        var colors = this.getChartColors();
        var self = this;
        Object.keys(this.charts).forEach(function(key) {
            var chart = self.charts[key];
            if (!chart || !chart.options) return;
            try {
                if (chart.options.scales && chart.options.scales.y && chart.options.scales.y.ticks) chart.options.scales.y.ticks.color = colors.textSecondary;
                if (chart.options.scales && chart.options.scales.y && chart.options.scales.y.grid) chart.options.scales.y.grid.color = colors.grid;
                if (chart.options.scales && chart.options.scales.x && chart.options.scales.x.ticks) chart.options.scales.x.ticks.color = colors.textSecondary;
                if (chart.options.scales && chart.options.scales.x && chart.options.scales.x.grid) chart.options.scales.x.grid.color = colors.grid;
                if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) chart.options.plugins.legend.labels.color = colors.text;
                chart.update('none');
            } catch (e) { console.warn('Erro tema gráfico:', e); }
        });
    };

    SmartWallet.prototype.updateCharts = function() {
        var self = this;
        var lLabels = [], lInc = [], lExp = [];
        for (var i = -2; i <= 3; i++) {
            var d = new Date(this.currentMonth);
            d.setMonth(d.getMonth() + i);
            var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            lLabels.push(months[d.getMonth()] + '/' + d.getFullYear());
            var mt = this.getMonthTransactions(d);
            var inc = 0, exp = 0;
            mt.forEach(function(t) {
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

        var exps = {};
        this.getMonthTransactions().forEach(function(t) {
            if (t.amount < 0) {
                var c = self.getCategoryById(t.category);
                if (!exps[c.name]) exps[c.name] = { t: 0, color: c.color };
                exps[c.name].t += Math.abs(t.amount);
            }
        });
        if (this.charts.pie) {
            this.charts.pie.data.labels = Object.keys(exps);
            this.charts.pie.data.datasets[0].data = Object.keys(exps).map(function(k) { return exps[k].t; });
            this.charts.pie.data.datasets[0].backgroundColor = Object.keys(exps).map(function(k) { return exps[k].color; });
            this.charts.pie.update();
        }

        if (this.charts.cards) {
            var cardLabels = [];
            var cardDatasets = [];
            for (var i = -2; i <= 3; i++) {
                var d = new Date(this.currentMonth);
                d.setMonth(d.getMonth() + i);
                var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                cardLabels.push(months[d.getMonth()] + '/' + d.getFullYear());
            }
            this.cards.forEach(function(card) {
                var data = [];
                for (var i = -2; i <= 3; i++) {
                    var d = new Date(self.currentMonth);
                    d.setMonth(d.getMonth() + i);
                    var m = d.getMonth(), y = d.getFullYear();
                    var monthPurchases = self.cardPurchases.filter(function(p) {
                        if (p.cardId !== card.id) return false;
                        var pDate = new Date(p.date + 'T00:00:00');
                        return pDate.getMonth() === m && pDate.getFullYear() === y;
                    });
                    var total = 0;
                    monthPurchases.forEach(function(p) { total += p.amount; });
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
    };

    SmartWallet.prototype.updateAlertBadge = function() {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var in3Days = new Date(today);
        in3Days.setDate(in3Days.getDate() + 3);
        var self = this;
        var bills = this.transactions.filter(function(t) {
            if (t.statusOk || t.amount >= 0) return false;
            var tDate = new Date(t.date + 'T00:00:00');
            return tDate <= in3Days;
        });
        var badge = document.getElementById('alertBadge');
        var btn = document.getElementById('alertBtn');
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
    };

    SmartWallet.prototype.getInvoicePeriod = function(card) {
        var now = new Date();
        var closingDate = new Date(now.getFullYear(), now.getMonth(), card.closingDay);
        if (now.getDate() < card.closingDay) {
            closingDate = new Date(now.getFullYear(), now.getMonth() - 1, card.closingDay);
        }
        var startDate = new Date(closingDate);
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(startDate.getDate() + 1);
        var dueDate = new Date(closingDate);
        dueDate.setMonth(dueDate.getMonth() + 1);
        dueDate.setDate(card.dueDay);
        return { startDate: startDate, closingDate: closingDate, dueDate: dueDate };
    };

    SmartWallet.prototype.getCardPurchasesForInvoice = function(cardId, startDate, closingDate) {
        return this.cardPurchases.filter(function(p) {
            if (p.cardId !== cardId) return false;
            var pDate = new Date(p.date + 'T00:00:00');
            return pDate >= startDate && pDate <= closingDate;
        });
    };

    SmartWallet.prototype.calculateInvoiceTotal = function(card, purchases) {
        var total = 0;
        purchases.forEach(function(p) { total += p.amount; });
        return total;
    };

    SmartWallet.prototype.renderCreditCardsList = function() {
        var container = document.getElementById('creditCardsList');
        if (!container) return;
        if (!this.cards.length) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">💳</div><h3>Nenhum cartão cadastrado</h3><p>Clique em "Novo Cartão" para começar</p></div>';
            return;
        }
        var self = this;
        var html = '<div class="credit-cards-grid">';
        this.cards.forEach(function(card) {
            var period = self.getInvoicePeriod(card);
            var purchases = self.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
            var total = self.calculateInvoiceTotal(card, purchases);
            var available = card.limit - total;
            var usedPct = Math.min(100, (total / card.limit) * 100);
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
    };

    SmartWallet.prototype.adjustColor = function(color, amount) {
        var hex = color.replace('#', '');
        var r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        var g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        var b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
    };

    SmartWallet.prototype.saveCard = function() {
        var id = document.getElementById('cardEditId').value;
        var name = document.getElementById('cardName').value.trim();
        var brand = document.getElementById('cardBrand').value;
        var last4 = document.getElementById('cardLast4').value.trim();
        var closingDay = parseInt(document.getElementById('cardClosingDay').value);
        var dueDay = parseInt(document.getElementById('cardDueDay').value);
        var limit = parseFloat(document.getElementById('cardLimit').value);
        var color = document.getElementById('cardColor').value;

        if (!name) { this.showToast('Informe o nome'); return; }

        if (id) {
            for (var i = 0; i < this.cards.length; i++) {
                if (this.cards[i].id === id) {
                    this.cards[i] = { id: id, name: name, brand: brand, last4: last4, closingDay: closingDay, dueDay: dueDay, limit: limit, color: color };
                    break;
                }
            }
        } else {
            this.cards.push({ id: 'card_' + Date.now(), name: name, brand: brand, last4: last4, closingDay: closingDay, dueDay: dueDay, limit: limit, color: color });
        }

        this.saveCards();
        this.populatePaymentMethodSelects();
        this.renderCreditCardsList();
        closeNewCardModal();
        this.showToast(id ? 'Cartão atualizado!' : 'Cartão cadastrado!');
    };

    SmartWallet.prototype.deleteCard = function(id) {
        if (!confirm('Excluir este cartão?')) return;
        this.cardPurchases = this.cardPurchases.filter(function(p) { return p.cardId !== id; });
        this.cards = this.cards.filter(function(c) { return c.id !== id; });
        this.saveCards();
        this.saveCardPurchases();
        this.populatePaymentMethodSelects();
        this.renderCreditCardsList();
        this.showToast('Cartão removido!');
    };

    SmartWallet.prototype.editCard = function(id) {
        var card = this.getCardById(id);
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
    };

    SmartWallet.prototype.openInvoice = function(cardId) {
        var card = this.getCardById(cardId);
        if (!card) return;
        var period = this.getInvoicePeriod(card);
        var purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
        var total = this.calculateInvoiceTotal(card, purchases);
        var minimum = total * 0.15;
        var available = card.limit - total;
        var self = this;

        document.getElementById('invoiceTitle').textContent = 'Fatura - ' + card.name;
        var html = '<div style="display:flex; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">';
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
            html += '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma compra</p>';
        } else {
            purchases.sort(function(a,b) { return new Date(a.date) - new Date(b.date); }).forEach(function(p) {
                var cat = self.getCategoryById(p.category);
                html += '<div style="background:var(--input-bg); border-radius:12px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:12px;">';
                html += '<div style="flex:1;"><div style="font-weight:600;">' + self.escapeHtml(p.description) + '</div>';
                html += '<div style="font-size:0.8rem; color:var(--text-secondary); display:flex; gap:10px;"><span>' + self.formatDate(p.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeHtml(cat.name) + '</span></div></div>';
                html += '<div style="font-weight:700;">' + self.formatCurrency(p.amount) + '</div>';
                html += '<button class="btn btn-danger btn-small" onclick="smartwallet.deletePurchase(' + p.id + ', \'' + cardId + '\')">🗑️</button></div>';
            });
        }
        html += '</div>';
        html += '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">';
        html += '<button class="btn btn-primary" onclick="openNewPurchaseModal(\'' + cardId + '\')">➕ Nova Compra</button>';
        html += '<button class="btn btn-success" onclick="smartwallet.payInvoice(\'' + cardId + '\')">💰 Pagar Fatura</button>';
        html += '<button class="btn btn-secondary" onclick="closeInvoiceModal()">Fechar</button></div>';

        document.getElementById('invoiceContent').innerHTML = html;
        document.getElementById('invoiceModal').classList.add('active');
    };

    SmartWallet.prototype.savePurchase = function() {
        var cardId = document.getElementById('purchaseCardId').value;
        var date = document.getElementById('purchaseDate').value;
        var amount = parseFloat(document.getElementById('purchaseAmount').value);
        var description = document.getElementById('purchaseDescription').value.trim();
        var category = document.getElementById('purchaseCategory').value;
        var installments = parseInt(document.getElementById('purchaseInstallments').value);
        var status = document.getElementById('purchaseStatus').value;

        if (!cardId || !date || !amount || !description || !category) {
            this.showToast('Preencha todos os campos');
            return;
        }

        this.cardPurchases.push({
            id: Date.now(),
            cardId: cardId,
            date: date,
            amount: amount,
            description: description,
            category: category,
            installments: installments,
            status: status === 'done'
        });

        var card = this.getCardById(cardId);
        var installmentAmount = installments > 1 ? amount / installments : amount;
        this.transactions.push({
            id: Date.now() + 1,
            date: date,
            amount: -installmentAmount,
            category: category,
            description: description + (card ? ' (' + card.name + ')' : ''),
            statusOk: status === 'done',
            paymentMethod: 'card:' + cardId,
            accountId: ''
        });

        this.saveCardPurchases();
        this.saveTransactions();
        this.renderCreditCardsList();
        this.render();
        this.updateCharts();
        closeNewPurchaseModal();
        this.openInvoice(cardId);
        this.showToast('Compra registrada!');
    };

    SmartWallet.prototype.deletePurchase = function(id, cardId) {
        if (!confirm('Excluir esta compra?')) return;
        var purchase = null;
        for (var i = 0; i < this.cardPurchases.length; i++) {
            if (this.cardPurchases[i].id === id) { purchase = this.cardPurchases[i]; break; }
        }
        this.cardPurchases = this.cardPurchases.filter(function(p) { return p.id !== id; });
        if (purchase) {
            this.transactions = this.transactions.filter(function(t) {
                return !(t.description && t.description.indexOf(purchase.description) !== -1 && t.paymentMethod === 'card:' + cardId);
            });
            this.saveTransactions();
        }
        this.saveCardPurchases();
        this.render();
        this.updateCharts();
        this.openInvoice(cardId);
        this.showToast('Compra excluída!');
    };

    SmartWallet.prototype.payInvoice = function(cardId) {
        var card = this.getCardById(cardId);
        if (!card) return;
        var period = this.getInvoicePeriod(card);
        var purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
        var total = this.calculateInvoiceTotal(card, purchases);
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
    };

    SmartWallet.prototype.exportInvoiceCSV = function(cardId) {
        var card = this.getCardById(cardId);
        if (!card) return;
        var period = this.getInvoicePeriod(card);
        var purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
        var self = this;
        var csv = '\ufeffFATURA - ' + card.name + '\n';
        csv += 'Período:;' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' a ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '\n';
        csv += 'Vencimento:;' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '\n\n';
        csv += 'Data;Descrição;Categoria;Valor\n';
        purchases.forEach(function(p) {
            var cat = self.getCategoryById(p.category);
            csv += p.date + ';"' + (p.description || '').replace(/"/g,'""') + '";"' + cat.name + '";' + p.amount.toFixed(2) + '\n';
        });
        var total = this.calculateInvoiceTotal(card, purchases);
        csv += '\nTOTAL DA FATURA;;;' + this.formatCurrency(total) + '\n';
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'fatura_' + card.name.replace(/\s+/g,'_') + '_' + this.formatMonthYear(new Date()) + '.csv';
        a.click();
        this.showToast('Fatura exportada!');
    };

    SmartWallet.prototype.printInvoicePDF = function(cardId) {
        var card = this.getCardById(cardId);
        if (!card) return;
        var period = this.getInvoicePeriod(card);
        var purchases = this.getCardPurchasesForInvoice(card.id, period.startDate, period.closingDate);
        var total = this.calculateInvoiceTotal(card, purchases);
        var self = this;
        var printWindow = window.open('', '_blank');
        var rows = purchases.sort(function(a,b) { return new Date(a.date) - new Date(b.date); }).map(function(p) {
            var cat = self.getCategoryById(p.category);
            return '<tr><td>' + self.formatDate(p.date) + '</td><td>' + self.escapeHtml(p.description) + '</td><td>' + self.escapeHtml(cat.name) + '</td><td style="text-align:right;">' + self.formatCurrency(p.amount) + '</td></tr>';
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
        setTimeout(function() { printWindow.print(); }, 250);
    };

    SmartWallet.prototype.exportCSV = function() {
        var mt = this.getMonthTransactions();
        if (!mt.length) { this.showToast('Nenhuma transação'); return; }
        var self = this;
        var csv = '\ufeffData;Descrição;Categoria;Tipo;Pagamento;Status;Valor\n';
        mt.sort(function(a,b) { return new Date(a.date) - new Date(b.date); }).forEach(function(t) {
            var c = self.getCategoryById(t.category);
            var status = t.statusOk ? 'Concluído' : 'Pendente';
            var payment = self.getPaymentMethodName(t.paymentMethod);
            csv += t.date + ';"' + (t.description || '').replace(/"/g,'""') + '";"' + c.name + '";' + (t.amount > 0 ? 'Receita' : 'Despesa') + ';"' + payment + '";' + status + ';' + Math.abs(t.amount).toFixed(2) + '\n';
        });
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'extrato_' + this.formatMonthYear(this.currentMonth) + '.csv';
        a.click();
        this.showToast('CSV exportado!');
        closeExportModal();
    };

    SmartWallet.prototype.printPDF = function() {
        window.print();
    };

    SmartWallet.prototype.exportBackup = function() {
        try {
            var backup = {
                version: '2.0.2',
                exportDate: new Date().toISOString(),
                appName: 'Smart Wallet',
                transactions: this.transactions,
                categories: this.categories,
                accounts: this.accounts,
                cards: this.cards,
                cardPurchases: this.cardPurchases,
                investments: this.investments,
                darkMode: this.darkMode,
                privacyOn: this.privacyOn
            };
            var jsonString = JSON.stringify(backup, null, 2);
            var blob = new Blob(['\ufeff' + jsonString], { type: 'application/json;charset=utf-8' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            var dateStr = new Date().toISOString().split('T')[0];
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
    };

    SmartWallet.prototype.importBackup = function() {
        if (!this.pendingBackupData) { this.showToast('⚠️ Selecione um arquivo'); return; }
        try {
            var cleanData = this.pendingBackupData;
            if (cleanData.charCodeAt(0) === 0xFEFF) cleanData = cleanData.substring(1);
            cleanData = cleanData.trim();
            if (!cleanData) { this.showToast('❌ Arquivo vazio!'); return; }
            var data = JSON.parse(cleanData);
            if (!data || typeof data !== 'object') { this.showToast('❌ Estrutura inválida'); return; }

            var transactions = Array.isArray(data.transactions) ? data.transactions : [];
            var categories = Array.isArray(data.categories) ? data.categories : this.categories;
            var accounts = Array.isArray(data.accounts) ? data.accounts : [];
            var cards = Array.isArray(data.cards) ? data.cards : [];
            var cardPurchases = Array.isArray(data.cardPurchases) ? data.cardPurchases : [];
            var investments = Array.isArray(data.investments) ? data.investments : [];

            if (!confirm('⚠️ Substituir TODOS os dados?\n\n• ' + transactions.length + ' transações\n• ' + categories.length + ' categorias\n• ' + accounts.length + ' contas\n• ' + cards.length + ' cartões')) {
                return this.showToast('Cancelado');
            }

            this.transactions = transactions;
            this.categories = categories;
            this.accounts = accounts;
            this.cards = cards;
            this.cardPurchases = cardPurchases;
            this.investments = investments;

            if (typeof data.darkMode === 'boolean') this.darkMode = data.darkMode;
            if (typeof data.privacyOn === 'boolean') this.privacyOn = data.privacyOn;

            this.saveTransactions();
            this.saveCategories();
            this.saveAccounts();
            this.saveCards();
            this.saveCardPurchases();
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
            this.pendingBackupData = null;
        } catch (e) {
            this.showToast('❌ Erro: ' + e.message);
        }
    };

    SmartWallet.prototype.importCSV = function() {
        if (!this.pendingCsvData) { this.showToast('Selecione um arquivo CSV'); return; }
        var replace = document.getElementById('csvReplaceData').checked;
        var lines = this.pendingCsvData.split(/\r?\n/).filter(function(l) { return l.trim(); });
        if (lines.length < 2) { this.showToast('CSV vazio ou inválido'); return; }
        var header = lines[0].toLowerCase();
        if (header.indexOf('data') === -1 || header.indexOf('valor') === -1) { this.showToast('Formato CSV inválido'); return; }

        var self = this;
        var transactionsToAdd = [];
        var skipped = 0;
        for (var i = 1; i < lines.length; i++) {
            var cols = this.parseCSVLine(lines[i]);
            if (cols.length < 6) { skipped++; continue; }
            var date = cols[0], desc = cols[1], catName = cols[2], tipo = cols[3], payment = cols[4], status = cols[5], valor = cols[6];
            if (!date || !valor) { skipped++; continue; }
            var category = this.findCategoryByName(catName);
            var amount = parseFloat(valor.replace(',', '.'));
            if (isNaN(amount)) { skipped++; continue; }
            var signedAmount = tipo.toLowerCase().indexOf('despesa') !== -1 ? -Math.abs(amount) : Math.abs(amount);
            var paymentMethod = 'pix';
            var payLower = (payment || '').toLowerCase();
            if (payLower.indexOf('pix') !== -1) paymentMethod = 'pix';
            else if (payLower.indexOf('debit') !== -1 || payLower.indexOf('débito') !== -1) paymentMethod = 'debit';
            else if (payLower.indexOf('auto') !== -1) paymentMethod = 'auto';
            else if (payLower.indexOf('transf') !== -1) paymentMethod = 'transfer';

            transactionsToAdd.push({
                id: Date.now() + i + Math.random() * 1000,
                date: date,
                amount: signedAmount,
                category: category ? category.id : '',
                description: desc,
                statusOk: status.toLowerCase().indexOf('conclu') !== -1,
                paymentMethod: paymentMethod,
                accountId: ''
            });
        }

        if (replace) {
            var m = this.currentMonth.getMonth(), y = this.currentMonth.getFullYear();
            this.transactions = this.transactions.filter(function(t) {
                var d = new Date(t.date + 'T00:00:00');
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
        this.pendingCsvData = null;
    };

    SmartWallet.prototype.parseCSVLine = function(line) {
        var result = [];
        var current = '';
        var inQuotes = false;
        for (var i = 0; i < line.length; i++) {
            var c = line[i];
            if (c === '"') {
                if (inQuotes && line[i+1] === '"') { current += '"'; i++; }
                else inQuotes = !inQuotes;
            } else if (c === ';' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += c;
            }
        }
        result.push(current.trim());
        return result;
    };

    SmartWallet.prototype.clearAllData = function() {
        this.transactions = [];
        this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        this.accounts = [];
        this.cards = [];
        this.cardPurchases = [];
        this.investments = [];
        this.saveTransactions();
        this.saveCategories();
        this.saveAccounts();
        this.saveCards();
        this.saveCardPurchases();
        this.saveInvestments();
        this.populateCategorySelects();
        this.populatePaymentMethodSelects();
        this.populateAccountSelects();
        this.render();
        this.updateCharts();
        this.updateAlertBadge();
        closeClearDataModal();
        this.showToast('🗑️ Dados apagados!');
    };

    SmartWallet.prototype.addCategory = function() {
        var name = document.getElementById('newCategoryName').value.trim();
        var color = document.getElementById('newCategoryColor').value;
        if (!name) { this.showToast('Digite um nome'); return; }
        var exists = this.categories.some(function(c) { return c.name.toLowerCase() === name.toLowerCase() && c.type === this.newCategoryType; }.bind(this));
        if (exists) { this.showToast('Categoria já existe'); return; }
        this.categories.push({ id: name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now(), name: name, color: color, type: this.newCategoryType });
        this.saveCategories();
        this.populateCategorySelects();
        this.renderCategoryList();
        document.getElementById('newCategoryName').value = '';
        this.showToast('Categoria adicionada!');
    };

    SmartWallet.prototype.deleteCategory = function(id) {
        if (this.transactions.some(function(t) { return t.category === id; })) {
            if (!confirm('Categoria em uso. Remover mesmo assim?')) return;
            this.transactions.forEach(function(t) { if (t.category === id) t.category = ''; });
            this.saveTransactions();
        }
        this.categories = this.categories.filter(function(c) { return c.id !== id; });
        this.saveCategories();
        this.populateCategorySelects();
        this.renderCategoryList();
        this.render();
        this.showToast('Categoria removida!');
    };

    SmartWallet.prototype.renderCategoryList = function() {
        var c = document.getElementById('categoryList');
        if (!c) return;
        if (!this.categories.length) {
            c.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma categoria</p>';
            return;
        }
        var self = this;
        c.innerHTML = this.categories.map(function(cat) {
            return '<div style="display:flex; align-items:center; justify-content:space-between; padding:10px; background:var(--input-bg); border-radius:12px;">' +
                '<div style="display:flex; align-items:center; gap:10px;"><span style="width:20px; height:20px; border-radius:50%; background:' + cat.color + '; display:inline-block;"></span>' +
                '<div><div style="font-weight:500;">' + self.escapeHtml(cat.name) + '</div><div style="font-size:0.75rem; color:var(--text-secondary);">' + (cat.type === 'income' ? '💰 Receita' : '💸 Despesa') + '</div></div></div>' +
                '<button class="btn btn-danger btn-small" onclick="smartwallet.deleteCategory(\'' + cat.id + '\')">🗑️</button></div>';
        }).join('');
    };

    SmartWallet.prototype.saveAccount = function() {
        var id = document.getElementById('accountEditId').value;
        var name = document.getElementById('accountName').value.trim();
        var type = document.getElementById('accountType').value;
        var balance = parseFloat(document.getElementById('accountBalance').value) || 0;
        var color = document.getElementById('accountColor').value;

        if (!name) { this.showToast('Informe o nome'); return; }

        if (id) {
            for (var i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].id === id) {
                    this.accounts[i] = { id: id, name: name, type: type, balance: balance, color: color };
                    break;
                }
            }
        } else {
            this.accounts.push({ id: 'acc_' + Date.now(), name: name, type: type, balance: balance, color: color });
        }

        this.saveAccounts();
        this.populateAccountSelects();
        this.renderAccountsList();
        this.render();
        closeNewAccountModal();
        this.showToast(id ? 'Conta atualizada!' : 'Conta cadastrada!');
    };

    SmartWallet.prototype.deleteAccount = function(id) {
        if (!confirm('Excluir esta conta?')) return;
        this.accounts = this.accounts.filter(function(a) { return a.id !== id; });
        this.saveAccounts();
        this.populateAccountSelects();
        this.renderAccountsList();
        this.render();
        this.showToast('Conta removida!');
    };

    SmartWallet.prototype.editAccount = function(id) {
        var acc = null;
        for (var i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].id === id) { acc = this.accounts[i]; break; }
        }
        if (!acc) return;
        document.getElementById('accountEditId').value = acc.id;
        document.getElementById('accountName').value = acc.name;
        document.getElementById('accountType').value = acc.type;
        document.getElementById('accountBalance').value = acc.balance;
        document.getElementById('accountColor').value = acc.color;
        document.getElementById('newAccountTitle').textContent = 'Editar Conta';
        document.getElementById('newAccountModal').classList.add('active');
    };

    SmartWallet.prototype.renderAccountsList = function() {
        var container = document.getElementById('accountsList');
        if (!container) return;
        if (!this.accounts.length) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">🏦</div><h3>Nenhuma conta cadastrada</h3><p>Clique em "Nova Conta" para começar</p></div>';
            return;
        }
        var self = this;
        container.innerHTML = '<div class="accounts-grid">' + this.accounts.map(function(acc) {
            return '<div class="account-card" style="background:linear-gradient(135deg, ' + acc.color + ' 0%, ' + self.adjustColor(acc.color, -30) + ' 100%);">' +
                '<div class="account-card-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editAccount(\'' + acc.id + '\')">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteAccount(\'' + acc.id + '\')">🗑️</button></div>' +
                '<div class="account-card-header"><div class="account-card-type">' + (acc.type === 'checking' ? '💳 Conta Corrente' : '📈 Investimento') + '</div></div>' +
                '<div class="account-card-name">' + self.escapeHtml(acc.name) + '</div>' +
                '<div class="account-card-balance">' + self.formatCurrency(acc.balance) + '</div></div>';
        }).join('') + '</div>';
    };

    SmartWallet.prototype.renderBillsModal = function() {
        var container = document.getElementById('billsList');
        if (!container) return;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var in3Days = new Date(today);
        in3Days.setDate(in3Days.getDate() + 3);
        var self = this;
        var bills = this.transactions.filter(function(t) {
            if (t.statusOk || t.amount >= 0) return false;
            var tDate = new Date(t.date + 'T00:00:00');
            return tDate <= in3Days;
        }).sort(function(a, b) { return new Date(a.date) - new Date(b.date); });

        if (bills.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px;">✅</div><h3>Nenhuma conta pendente!</h3><p>Todas as contas estão em dia.</p></div>';
            return;
        }

        var total = 0;
        bills.forEach(function(b) { total += Math.abs(b.amount); });

        var html = '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">';
        html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total de contas</span><span style="font-weight:600;">' + bills.length + '</span></div>';
        html += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700; font-size:1.1rem;"><span>Total a pagar</span><span style="color:var(--danger-color);">' + self.formatCurrency(total) + '</span></div></div>';

        bills.forEach(function(bill) {
            var cat = self.getCategoryById(bill.category);
            var billDate = new Date(bill.date + 'T00:00:00');
            var diffDays = Math.round((billDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            var daysClass = 'warning', daysText = '', itemClass = '';
            if (diffDays < 0) { daysClass = 'overdue'; daysText = Math.abs(diffDays) + 'd atrasada'; itemClass = 'overdue'; }
            else if (diffDays === 0) { daysClass = 'urgent'; daysText = 'Vence hoje'; itemClass = 'urgent'; }
            else if (diffDays === 1) { daysClass = 'urgent'; daysText = 'Vence amanhã'; itemClass = 'urgent'; }
            else { daysText = 'Em ' + diffDays + ' dias'; }

            html += '<div class="bill-item ' + itemClass + '">';
            html += '<div class="bill-info"><div class="bill-desc">' + self.escapeHtml(bill.description) + '<span class="bill-days ' + daysClass + '">' + daysText + '</span></div>';
            html += '<div class="bill-meta"><span>📅 ' + self.formatDate(bill.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeHtml(cat.name) + '</span></div></div>';
            html += '<div class="bill-amount">' + self.formatCurrency(Math.abs(bill.amount)) + '</div>';
            html += '<div style="display:flex; gap:4px;">';
            html += '<button class="btn btn-success btn-small" onclick="smartwallet.markBillAsPaid(' + bill.id + ')">✓</button>';
            html += '<button class="btn btn-secondary btn-small" onclick="smartwallet.editTransaction(' + bill.id + '); closeBillsModal();">✏️</button></div></div>';
        });

        container.innerHTML = html;
    };

    SmartWallet.prototype.markBillAsPaid = function(id) {
        for (var i = 0; i < this.transactions.length; i++) {
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
    };

    SmartWallet.prototype.updateInvestmentChart = function() {
        var section = document.getElementById('investmentsChartSection');
        if (!section) return;
        if (!this.investments.length) {
            section.style.display = 'none';
            return;
        }
        section.style.display = 'block';

        var colors = this.getChartColors();
        var now = new Date();
        var months = 6;
        var monthlyData = {};

        for (var i = months - 1; i >= 0; i--) {
            var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
            monthlyData[key] = { invested: 0, current: 0 };
        }

        var self = this;
        this.investments.forEach(function(inv) {
            var invDate = new Date(inv.date + 'T00:00:00');
            var invKey = invDate.getFullYear() + '-' + String(invDate.getMonth() + 1).padStart(2, '0');
            Object.keys(monthlyData).forEach(function(key) {
                if (key >= invKey) monthlyData[key].invested += inv.initial;
            });
            var currentKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
            if (monthlyData[currentKey]) monthlyData[currentKey].current += inv.current;
        });

        var labels = [], investedData = [], currentData = [], profitPctData = [], projectionData = [];
        var keys = Object.keys(monthlyData);
        keys.forEach(function(key) {
            var d = new Date(key + '-01');
            var monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            labels.push(monthNames[d.getMonth()] + '/' + d.getFullYear());
            var invested = monthlyData[key].invested;
            var current = monthlyData[key].current || invested;
            investedData.push(invested);
            currentData.push(current);
            var profitPct = invested > 0 ? ((current - invested) / invested * 100) : 0;
            profitPctData.push(profitPct);
        });

        var lastInvested = investedData[investedData.length - 1] || 0;
        var lastCurrent = currentData[currentData.length - 1] || 0;
        var avgRate = 0;
        if (self.investments.length > 0) {
            var totalRate = 0;
            self.investments.forEach(function(inv) { totalRate += inv.rate || 0; });
            avgRate = totalRate / self.investments.length;
        }
        var monthlyRate = avgRate / 12 / 100;
        for (var i = 1; i <= 3; i++) {
            var projDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
            var monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            labels.push(monthNames[projDate.getMonth()] + '/' + projDate.getFullYear() + ' (proj)');
            investedData.push(lastInvested);
            currentData.push(null);
            profitPctData.push(null);
            var projected = lastCurrent * Math.pow(1 + monthlyRate, i);
            projectionData.push(projected);
        }
        while (projectionData.length < labels.length - 3) projectionData.unshift(null);

        if (!this.charts.invest) {
            var canvas = document.getElementById('investChart');
            if (!canvas) return;
            this.charts.invest = new Chart(canvas.getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels,
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
                            ticks: { color: colors.textSecondary, callback: function(value) { return 'R$ ' + value.toLocaleString('pt-BR'); } },
                            grid: { color: colors.grid }
                        },
                        y1: {
                            position: 'right',
                            ticks: { color: colors.textSecondary, callback: function(value) { return value + '%'; } },
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

        var summaryEl = document.getElementById('investSummary');
        if (summaryEl) {
            var totalInitial = 0, totalCurrent = 0;
            this.investments.forEach(function(inv) {
                totalInitial += inv.initial;
                totalCurrent += inv.current;
            });
            var totalProfit = totalCurrent - totalInitial;
            var totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0;
summaryEl.innerHTML = '<div class="investment-summary"><h3>📊 Resumo</h3><div class="investment-summary-grid">' +
    '<div class="investment-summary-item"><div class="investment-summary-label">Total Investido</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div>' +
    '<div class="investment-summary-item"><div class="investment-summary-label">Valor Atual</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div>' +
    '<div class="investment-summary-item"><div class="investment-summary-label">Rendimento</div><div class="investment-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div>' +
    '</div></div>';
        }
    };

    SmartWallet.prototype.saveInvestment = function() {
        var id = document.getElementById('investmentEditId').value;
        var name = document.getElementById('investmentName').value.trim();
        var type = document.getElementById('investmentType').value;
        var initial = parseFloat(document.getElementById('investmentInitial').value) || 0;
        var current = parseFloat(document.getElementById('investmentCurrent').value) || 0;
        var date = document.getElementById('investmentDate').value;
        var rate = parseFloat(document.getElementById('investmentRate').value) || 0;

        if (!name) { this.showToast('Informe o nome'); return; }

        if (id) {
            for (var i = 0; i < this.investments.length; i++) {
                if (this.investments[i].id === id) {
                    this.investments[i] = { id: id, name: name, type: type, initial: initial, current: current, date: date, rate: rate };
                    break;
                }
            }
        } else {
            this.investments.push({ id: 'inv_' + Date.now(), name: name, type: type, initial: initial, current: current, date: date, rate: rate });
        }

        this.saveInvestments();
        this.renderInvestmentsModal();
        this.updateInvestmentChart();
        closeNewInvestmentModal();
        this.showToast(id ? 'Aplicação atualizada!' : 'Aplicação cadastrada!');
    };

    SmartWallet.prototype.deleteInvestment = function(id) {
        if (!confirm('Excluir esta aplicação?')) return;
        this.investments = this.investments.filter(function(i) { return i.id !== id; });
        this.saveInvestments();
        this.renderInvestmentsModal();
        this.updateInvestmentChart();
        this.showToast('Aplicação excluída!');
    };

    SmartWallet.prototype.editInvestment = function(id) {
        var inv = null;
        for (var i = 0; i < this.investments.length; i++) {
            if (this.investments[i].id === id) { inv = this.investments[i]; break; }
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
    };

    SmartWallet.prototype.openUpdateInvestment = function(id) {
        var inv = null;
        for (var i = 0; i < this.investments.length; i++) {
            if (this.investments[i].id === id) { inv = this.investments[i]; break; }
        }
        if (!inv) return;
        document.getElementById('updateInvestmentId').value = inv.id;
        document.getElementById('updateInvestmentName').textContent = inv.name;
        document.getElementById('updateInvestmentValue').value = inv.current;
        document.getElementById('updateInvestmentDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('updateInvestmentModal').classList.add('active');
    };

    SmartWallet.prototype.updateInvestmentValue = function() {
        var id = document.getElementById('updateInvestmentId').value;
        var newValue = parseFloat(document.getElementById('updateInvestmentValue').value) || 0;
        var date = document.getElementById('updateInvestmentDate').value;

        for (var i = 0; i < this.investments.length; i++) {
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
    };

    SmartWallet.prototype.renderInvestmentsModal = function() {
        var container = document.getElementById('investmentsContent');
        if (!container) return;
        var self = this;
        var typeLabels = { cdb: 'CDB', tesouro: 'Tesouro Direto', lci: 'LCI/LCA', fundo: 'Fundo', acao: 'Ações', fiis: 'FIIs', poupanca: 'Poupança', outro: 'Outro' };

        if (!this.investments.length) {
            container.innerHTML = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">📈</div><h3>Nenhuma aplicação cadastrada</h3><p>Clique em "Nova Aplicação" para começar</p></div>';
            return;
        }

        var totalInitial = 0, totalCurrent = 0;
        var html = '<div>';
        this.investments.forEach(function(inv) {
            var profit = inv.current - inv.initial;
            var profitPct = inv.initial > 0 ? (profit / inv.initial * 100) : 0;
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
            html += '<div class="investment-value-item"><div class="investment-value-label">Valor Inicial</div><div class="investment-value-amount">' + self.formatCurrency(inv.initial) + '</div></div>';
            html += '<div class="investment-value-item"><div class="investment-value-label">Valor Atual</div><div class="investment-value-amount">' + self.formatCurrency(inv.current) + '</div></div>';
            html += '<div class="investment-value-item"><div class="investment-value-label">Rendimento</div><div class="investment-value-amount ' + (profit >= 0 ? 'positive' : 'negative') + '">' + profitPct.toFixed(2) + '% (' + self.formatCurrency(profit) + ')</div></div>';
            html += '</div>';
            if (inv.rate > 0) html += '<div style="font-size:0.85rem; color:var(--text-secondary);">Taxa: ' + inv.rate + '% ao ano</div>';
            html += '</div>';
        });
        html += '</div>';

        var totalProfit = totalCurrent - totalInitial;
        var totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0;

            html += '<div class="investment-summary">';
            html += '<h3>📊 Resumo Geral</h3>';
            html += '<div class="investment-summary-grid">';
            html += '<div class="investment-summary-item"><div class="investment-summary-label">Total Investido</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div>';
            html += '<div class="investment-summary-item"><div class="investment-summary-label">Valor Atual</div><div class="investment-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div>';
            html += '<div class="investment-summary-item"><div class="investment-summary-label">Rendimento Total</div><div class="investment-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div>';
            html += '</div></div>';

        container.innerHTML = html;
    };

    SmartWallet.prototype.printManual = function() {
        var printWindow = window.open('', '_blank');
        if (!printWindow) { alert('Permita popups para imprimir'); return; }
        printWindow.document.write('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Manual do Usuário - Smart Wallet</title><style>');
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
        printWindow.document.write('<h4>⚠️ Termos de Uso e Aviso Legal</h4>');
        printWindow.document.write('<p><strong>Sobre o Smart Wallet:</strong> Ferramenta de controle financeiro pessoal desenvolvida para ajudar você a organizar suas finanças.</p>');
        printWindow.document.write('<p><strong>Privacidade:</strong> 100% Offline. Dados armazenados localmente. Sem cadastro. Sem rastreamento.</p>');
        printWindow.document.write('<p><strong>Limitações:</strong> Não substitui consultoria financeira profissional. Decisões são de total responsabilidade do usuário. Faça backups regulares.</p>');
        printWindow.document.write('<p><strong>Isenção:</strong> O desenvolvedor não se responsabiliza por perdas financeiras decorrentes do uso do aplicativo.</p>');
        printWindow.document.write('<p><small>Ao utilizar o Smart Wallet, você declara que leu e concorda com estes termos.</small></p>');
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        setTimeout(function() { printWindow.print(); }, 500);
    };

    var smartwallet = new SmartWallet();
    window.smartwallet = smartwallet;

    window.selectTransactionType = function(t) {
        smartwallet.currentTransactionType = t;
        var btns = document.querySelectorAll('#transactionForm .type-btn');
        btns.forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-type') === t); });
        smartwallet.filterCategoriesByType('category', t);
    };

    window.selectEditType = function(t) {
        smartwallet.currentEditType = t;
        var btns = document.querySelectorAll('#editForm .type-btn');
        btns.forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-type') === t); });
        smartwallet.filterCategoriesByType('editCategory', t);
    };

    window.selectNewCategoryType = function(t) {
        smartwallet.newCategoryType = t;
        var btns = document.querySelectorAll('#categoryModal .type-btn');
        btns.forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-type') === t); });
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

    window.openCategoryManager = function() {
        smartwallet.renderCategoryList();
        document.getElementById('categoryModal').classList.add('active');
    };

    window.closeCategoryManager = function() {
        document.getElementById('categoryModal').classList.remove('active');
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

    window.openImportCsvModal = function() {
        smartwallet.pendingCsvData = null;
        document.getElementById('csvFileInput').value = '';
        document.getElementById('csvFileName').textContent = 'Clique para selecionar';
        document.getElementById('csvReplaceData').checked = false;
        document.getElementById('importCsvModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeImportCsvModal = function() {
        document.getElementById('importCsvModal').classList.remove('active');
    };

    window.handleCsvFileSelect = function(event) {
        var file = event.target.files[0];
        if (!file) return;
        if (file.name.toLowerCase().indexOf('.csv') === -1) {
            alert('⚠️ Selecione um arquivo .csv');
            event.target.value = '';
            return;
        }
        document.getElementById('csvFileName').textContent = '📄 ' + file.name + ' (' + (file.size/1024).toFixed(1) + ' KB)';
        var reader = new FileReader();
        reader.onload = function(e) { smartwallet.pendingCsvData = e.target.result; };
        reader.readAsText(file, 'UTF-8');
    };

    window.openImportBackupModal = function() {
        smartwallet.pendingBackupData = null;
        document.getElementById('backupFileInput').value = '';
        document.getElementById('backupFileName').textContent = 'Clique para selecionar';
        document.getElementById('importBackupModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeImportBackupModal = function() {
        document.getElementById('importBackupModal').classList.remove('active');
    };

    window.handleBackupFileSelect = function(event) {
        var file = event.target.files[0];
        if (!file) return;
        if (file.name.toLowerCase().indexOf('.json') === -1) {
            alert('⚠️ Selecione um arquivo .json');
            event.target.value = '';
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('⚠️ Arquivo muito grande (máx 10MB)');
            event.target.value = '';
            return;
        }
        document.getElementById('backupFileName').textContent = '💾 ' + file.name + ' (' + (file.size/1024).toFixed(1) + ' KB)';
        var reader = new FileReader();
        reader.onload = function(e) {
            try {
                var content = e.target.result;
                if (!content || !content.trim()) { alert('⚠️ Arquivo vazio!'); event.target.value = ''; return; }
                JSON.parse(content);
                smartwallet.pendingBackupData = content;
                smartwallet.showToast('✅ Arquivo carregado!');
            } catch (error) {
                alert('❌ JSON inválido: ' + error.message);
                event.target.value = '';
                smartwallet.pendingBackupData = null;
            }
        };
        reader.readAsText(file, 'UTF-8');
    };

    window.openClearDataModal = function() {
        document.getElementById('clearStep1').style.display = 'block';
        document.getElementById('clearStep2').style.display = 'none';
        document.getElementById('clearConfirmInput').value = '';
        document.getElementById('clearConfirmInput').classList.remove('match');
        var btn = document.getElementById('finalClearBtn');
        btn.disabled = true;
        btn.style.opacity = '0.5';
        document.getElementById('clearDataModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeClearDataModal = function() {
        document.getElementById('clearDataModal').classList.remove('active');
    };

    window.showClearStep2 = function() {
        document.getElementById('clearStep1').style.display = 'none';
        document.getElementById('clearStep2').style.display = 'block';
        setTimeout(function() { document.getElementById('clearConfirmInput').focus(); }, 100);
    };

    window.checkClearConfirm = function() {
        var input = document.getElementById('clearConfirmInput');
        var btn = document.getElementById('finalClearBtn');
        if (input.value.trim().toUpperCase() === 'LIMPAR') {
            input.classList.add('match');
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            input.classList.remove('match');
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    };

    window.openAccountsModal = function() {
        smartwallet.renderAccountsList();
        document.getElementById('accountsModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeAccountsModal = function() {
        document.getElementById('accountsModal').classList.remove('active');
    };

    window.openNewAccountModal = function() {
        document.getElementById('accountEditId').value = '';
        document.getElementById('accountForm').reset();
        document.getElementById('accountColor').value = '#6366f1';
        document.getElementById('newAccountTitle').textContent = 'Nova Conta';
        document.getElementById('newAccountModal').classList.add('active');
    };

    window.closeNewAccountModal = function() {
        document.getElementById('newAccountModal').classList.remove('active');
    };

    window.openCreditCardsModal = function() {
        smartwallet.renderCreditCardsList();
        document.getElementById('creditCardsModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeCreditCardsModal = function() {
        document.getElementById('creditCardsModal').classList.remove('active');
    };

    window.openNewCardModal = function() {
        document.getElementById('cardEditId').value = '';
        document.getElementById('cardForm').reset();
        document.getElementById('cardClosingDay').value = 20;
        document.getElementById('cardDueDay').value = 27;
        document.getElementById('cardColor').value = '#6366f1';
        document.getElementById('newCardTitle').textContent = 'Novo Cartão';
        document.getElementById('newCardModal').classList.add('active');
    };

    window.closeNewCardModal = function() {
        document.getElementById('newCardModal').classList.remove('active');
    };

    window.openInvoiceModal = function(cardId) {
        smartwallet.openInvoice(cardId);
    };

    window.closeInvoiceModal = function() {
        document.getElementById('invoiceModal').classList.remove('active');
    };

    window.openNewPurchaseModal = function(cardId) {
        document.getElementById('purchaseForm').reset();
        document.getElementById('purchaseCardId').value = cardId;
        document.getElementById('purchaseDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('purchaseInstallments').value = '1';
        document.getElementById('purchaseStatus').value = 'pending';
        smartwallet.populateCategorySelects();
        document.getElementById('newPurchaseModal').classList.add('active');
    };

    window.closeNewPurchaseModal = function() {
        document.getElementById('newPurchaseModal').classList.remove('active');
    };

    window.openBillsModal = function() {
        smartwallet.renderBillsModal();
        document.getElementById('billsModal').classList.add('active');
    };

    window.closeBillsModal = function() {
        document.getElementById('billsModal').classList.remove('active');
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

    window.closeUpdateInvestmentModal = function() {
        document.getElementById('updateInvestmentModal').classList.remove('active');
    };

    window.openManualModal = function() {
        document.getElementById('manualContent').innerHTML = manualHTML;
        document.getElementById('manualModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
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
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.openThanksModal = function() {
        document.getElementById('thanksModal').classList.add('active');
        document.getElementById('mainMenu').classList.remove('active');
    };

    window.closeThanksModal = function() {
        document.getElementById('thanksModal').classList.remove('active');
    };

    window.copyPixKey = function() {
        var key = document.getElementById('pixKey').textContent;
        navigator.clipboard.writeText(key).then(function() {
            smartwallet.showToast('✅ Chave PIX copiada!');
        }).catch(function() {
            smartwallet.showToast('❌ Copie manualmente: ' + key);
        });
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
        if (e) e.stopPropagation();
        document.getElementById('mainMenu').classList.toggle('active');
        document.getElementById('infoMenu').classList.remove('active');
    };

    window.toggleInfoMenu = function(e) {
        if (e) e.stopPropagation();
        document.getElementById('infoMenu').classList.toggle('active');
    };

    var disclaimerTimerInterval;

    function initDisclaimer() {
        var countdown = 12;
        var timerEl = document.getElementById('disclaimerTimer');
        var btnEl = document.getElementById('acceptDisclaimerBtn');
        if (!timerEl || !btnEl) return;

        btnEl.classList.remove('enabled');
        btnEl.disabled = true;
        timerEl.innerHTML = '⏱️ Aguarde <span id="countdown">' + countdown + '</span> segundos';

        clearInterval(disclaimerTimerInterval);
        disclaimerTimerInterval = setInterval(function() {
            countdown--;
            var span = document.getElementById('countdown');
            if (span) span.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(disclaimerTimerInterval);
                btnEl.classList.add('enabled');
                btnEl.disabled = false;
                timerEl.innerHTML = '✅ Pode aceitar os termos';
            }
        }, 1000);
    }

    window.acceptDisclaimer = function() {
        var btn = document.getElementById('acceptDisclaimerBtn');
        if (!btn || !btn.classList.contains('enabled')) return;
        localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
        var disclaimer = document.getElementById('disclaimerModal');
        if (disclaimer) {
            disclaimer.classList.add('disintegrating');
            setTimeout(function() {
                disclaimer.style.display = 'none';
                disclaimer.classList.remove('active', 'disintegrating');
                setTimeout(function() {
                    var splash = document.getElementById('splashScreen');
                    if (splash) {
                        splash.classList.add('fade-out');
                        setTimeout(function() {
                            splash.style.display = 'none';
                            var quote = document.getElementById('quoteModal');
                            if (quote) quote.classList.add('active');
                        }, 800);
                    }
                }, 3000);
            }, 600);
        }
    };

    function showQuoteModal() {
        var quote = financialQuotes[Math.floor(Math.random() * financialQuotes.length)];
        var quoteText = document.getElementById('quoteText');
        var quoteAuthor = document.getElementById('quoteAuthor');
        var quoteModal = document.getElementById('quoteModal');
        if (quoteText) quoteText.textContent = '"' + quote.text + '"';
        if (quoteAuthor) quoteAuthor.textContent = '— ' + quote.author;
        if (quoteModal) quoteModal.classList.add('active');
    }

    window.startApp = function() {
        var quote = document.getElementById('quoteModal');
        var main = document.getElementById('mainApp');
        var fab = document.getElementById('fabBtn');
        if (quote) quote.classList.remove('active');
        if (main) main.style.display = 'block';
        if (fab) fab.style.display = 'flex';
    };

    function updatePrintDate() {
        var dateEl = document.getElementById('printDate');
        if (dateEl) dateEl.textContent = 'Gerado em: ' + new Date().toLocaleString('pt-BR');
    }

    window.addEventListener('load', function() {
        updatePrintDate();
        var accepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
        var splash = document.getElementById('splashScreen');
        var disclaimer = document.getElementById('disclaimerModal');

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
                            showQuoteModal();
                        }, 800);
                    }
                }, 3000);
            }
        }, 3500);
    });

    document.addEventListener('click', function(e) {
        var menu = document.getElementById('mainMenu');
        var info = document.getElementById('infoMenu');
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
                .then(function(reg) { console.log('✅ SW registrado:', reg.scope); })
                .catch(function(err) { console.log('❌ SW falhou:', err); });
        });
    }

    console.log('🎉 Smart Wallet carregado com sucesso!');
})();
