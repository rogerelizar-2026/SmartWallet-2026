// Smart Wallet v4.0.1
(function() {
    'use strict';
    
    console.log('🚀 Smart Wallet v4.0.1 iniciando...');
    
    // ===== CONSTANTES =====
    const PAYMENT_METHODS = [
        { id: 'pix', name: 'PIX', icon: '⚡' },
        { id: 'debit', name: 'Cart.Débito', icon: '💳' },
        { id: 'auto', name: 'Débito Automático', icon: '🔄' },
        { id: 'scheduled', name: 'Agendamento', icon: '' },
        { id: 'transfer', name: 'Transferência', icon: '↔️' }
    ];

    const DEFAULT_CATEGORIES = [
        { id: 'moradia', name: 'Moradia', color: '#f59e0b', type: 'expense' },
        { id: 'despensa', name: 'Despensa', color: '#10b981', type: 'expense' },
        { id: 'transporte', name: 'Transporte', color: '#f97316', type: 'expense' },
        { id: 'saude', name: 'Saúde', color: '#ef4444', type: 'expense' },
        { id: 'educacao', name: 'Educação', color: '#3b82f6', type: 'expense' },
        { id: 'cuidados_pessoais', name: 'Cuidados Pessoais', color: '#ec4899', type: 'expense' },
        { id: 'servicos', name: 'Serviços', color: '#8b5cf6', type: 'expense' },
        { id: 'lazer', name: 'Lazer', color: '#f43f5e', type: 'expense' },
        { id: 'pets', name: 'Pets', color: '#a855f7', type: 'expense' },
        { id: 'inst_financeira', name: 'Instituição Financeira', color: '#6366f1', type: 'expense' },
        { id: 'docs_juridico', name: 'Documento/Jurídico', color: '#64748b', type: 'expense' },
        { id: 'doacao_generosidade', name: 'Doação/Generosidade', color: '#84cc16', type: 'expense' },
        { id: 'reserva_aplicacao', name: 'Reserva/Aplicação', color: '#06b6d4', type: 'expense' },
        { id: 'salario', name: 'Salário', color: '#22c55e', type: 'income' },
        { id: 'vale_alimentacao', name: 'Vale Alimentação', color: '#eab308', type: 'income' },
        { id: 'auxilios', name: 'Auxílios', color: '#14b8a6', type: 'income' },
        { id: 'beneficios', name: 'Benefícios', color: '#0ea5e9', type: 'income' },
        { id: 'restituicao', name: 'Restituição', color: '#d946ef', type: 'income' },
        { id: 'freelance', name: 'Freelance', color: '#f59e0b', type: 'income' },
        { id: 'rendimentos', name: 'Rendimentos', color: '#8b5cf6', type: 'income' },
        { id: 'resgate', name: 'Resgate (invest/reserva)', color: '#6366f1', type: 'income' }
    ];

    const FINANCIAL_QUOTES = [
            { text: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você guarda.", author: "Robert Kiyosaki" },
            { text: "O hábito de poupar é em si mesmo uma educação.", author: "T.T. Munger" },
            { text: "O dinheiro não é bom nem mau; é como uma faca. Pode cortar o pão da família ou ferir alguém. Tudo depende da mão que o segura.", author: "Sabedoria Financeira" },
            { text: "Dinheiro é energia. Se você o retém com medo, ele estagna. Se o movimenta com propósito, ele se multiplica.", author: "Sabedoria Financeira" },
            { text: "Não pergunte quanto custa, pergunte quanto vale. Preço é o que você paga; valor é o que você recebe.", author: "Sabedoria Financeira" },
            { text: "O dinheiro deve trabalhar para você, não você para o dinheiro. Liberdade financeira é ter opções, não ostentação.", author: "Sabedoria Financeira" },
            { text: "Riqueza verdadeira não é ter muito, é depender de pouco. O dinheiro é ponte para seus valores, não o destino final.", author: "Sabedoria Financeira" },
            { text: "Riqueza é a capacidade de viver completamente a vida.", author: "Henry David Thoreau" },
            { text: "Um orçamento está dizendo a seu dinheiro para onde ir, em vez de se perguntar para onde ele foi.", author: "Dave Ramsey" },
            { text: "Amar dinheiro é a raiz de todos os problemas. Muita gente se afastou da fé por causa disso e se encheu de angústia.", author: "1 Timóteo 6:10 (Linguagem Atual)" },
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

    const manualH®L = '<div class="manual-cover"><h1>📘 Manual do Usuário</h1><h2>Smart Wallet</h2><p>Controle Financeiro Pessoal Inteligente</p><p class="version">Versão 4.0.1 - 2026</p><p class="author">Idealizado por RogerElizar®</p></div>' +
        '<div class="manual-quote"><p>"Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes."</p><div class="quote-author">— Tiago 1:17</div></div>' +
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
    // ===== CLASSE PRINCIPAL =====
    class SmartWallet {
        constructor() {
            this.transactions = [];
            this.categories = [];
            this.accounts = [];
            this.cards = [];
            this.inves®ents = [];
            this.curren®onth = new Date();
            this.curren®onth.setDate(1);
            this.cardModalMonth = new Date();
            this.cardModalMonth.setDate(1);
            this.currentTransactionType = 'expense';
            this.currentEditType = 'expense';
            this.currentEditId = null;
            this.newCategoryType = 'expense'; // ✅ CORREÇÃO: Inicializada
            this.darkMode = true;
            this.privacyOn = false;
            this.charts = {};
            this.searchTimeout = null;
            this.toastT = null;
            this._cache = {}; // ✅ CORREÇÃO: Cache para performance
            this.loadData();
            this.init();
        }

        loadData() {
            try {
                const t = localStorage.getItem('smartwallet_transactions');
                if (t) this.transactions = JSON.parse(t);
                const c = localStorage.getItem('smartwallet_categories');
                if (c) this.categories = JSON.parse(c);
                else this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
                const a = localStorage.getItem('smartwallet_accounts');
                if (a) this.accounts = JSON.parse(a);
                const cd = localStorage.getItem('smartwallet_cards');
                if (cd) this.cards = JSON.parse(cd);
                const inv = localStorage.getItem('smartwallet_inves®ents');
                if (inv) this.inves®ents = JSON.parse(inv);
                const dm = localStorage.getItem('smartwallet_dark');
                if (dm !== null) this.darkMode = dm === 'true';
                const pv = localStorage.getItem('smartwallet_privacy');
                if (pv !== null) this.privacyOn = pv === 'true';
            } catch (e) { 
                console.error('[SmartWallet] Erro ao carregar dados:', e); 
            }
        }

        saveTransactions() { 
            try { localStorage.setItem('smartwallet_transactions', JSON.stringify(this.transactions)); } 
            catch(e) { console.error('[SmartWallet] Erro ao salvar transações:', e); } 
        }
        saveCategories() { 
            try { localStorage.setItem('smartwallet_categories', JSON.stringify(this.categories)); } 
            catch(e) { console.error('[SmartWallet] Erro ao salvar categorias:', e); } 
        }
        saveAccounts() { 
            try { localStorage.setItem('smartwallet_accounts', JSON.stringify(this.accounts)); } 
            catch(e) { console.error('[SmartWallet] Erro ao salvar contas:', e); } 
        }
        saveCards() { 
            try { localStorage.setItem('smartwallet_cards', JSON.stringify(this.cards)); } 
            catch(e) { console.error('[SmartWallet] Erro ao salvar cartões:', e); } 
        }
        saveInves®ents() { 
            try { localStorage.setItem('smartwallet_inves®ents', JSON.stringify(this.inves®ents)); } 
            catch(e) { console.error('[SmartWallet] Erro ao salvar investimentos:', e); } 
        }

        // ✅ CORREÇÃO: Limpar cache quando dados mudam
        clearCache() {
            this._cache = {};
        }

        init() {
            console.log('✅ Smart Wallet inicializado');
            this.applyTheme();
            this.applyPrivacy();
            this.setupEventListeners();
            this.setDefaultDate();
            this.updateMonthDisplay();
            this.populateCategorySelects();
            this.populatePaymen®ethodSelects();
            this.populateAccountSelects();
            this.restoreFilters();
            this.render();
            this.initCharts();
            this.updateAlertBadge();
        }

        setupEventListeners() {
            const self = this;
            const search = document.getElementById('searchFilter');
            if (search) {
                search.addEventListener('input', () => {
                    clearTimeout(self.searchTimeout);
                    self.searchTimeout = setTimeout(() => { 
                        self.clearCache(); // ✅ CORREÇÃO: Limpar cache
                        self.render(); 
                        self.clearDashboardHighlight(); 
                    }, 300);
                });
            }
            ['typeFilter', 'categoryFilter', 'statusFilter', 'accountFilter'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('change', () => {
                    if (id === 'typeFilter') self.filterCategoriesByType('categoryFilter', el.value);
                    self.clearCache(); // ✅ CORREÇÃO: Limpar cache
                    self.render();
                    self.saveFilters();
                    self.clearDashboardHighlight();
                });
            });
            const recurringCheckbox = document.getElementById('recurring');
            if (recurringCheckbox) {
                recurringCheckbox.addEventListener('change', function() {
                    const options = document.getElementById('recurringOptions');
                    if (options) options.style.display = this.checked ? 'block' : 'none';
                });
            }
            const editRecurringCheckbox = document.getElementById('editRecurring');
            if (editRecurringCheckbox) {
                editRecurringCheckbox.addEventListener('change', function() {
                    const options = document.getElementById('editRecurringOptions');
                    if (options) options.style.display = this.checked ? 'block' : 'none';
                });
            }
        }

        saveFilters() {
            const filters = {
                type: document.getElementById('typeFilter')?.value || '',
                category: document.getElementById('categoryFilter')?.value || '',
                status: document.getElementById('statusFilter')?.value || '',
                account: document.getElementById('accountFilter')?.value || '',
                search: document.getElementById('searchFilter')?.value || ''
            };
            try { localStorage.setItem('smartwallet_filters', JSON.stringify(filters)); } catch(e){}
        }

        restoreFilters() {
            try {
                const filters = JSON.parse(localStorage.getItem('smartwallet_filters') || '{}');
                if (filters.type) document.getElementById('typeFilter').value = filters.type;
                if (filters.status) document.getElementById('statusFilter').value = filters.status;
                if (filters.account) document.getElementById('accountFilter').value = filters.account;
                if (filters.search) document.getElementById('searchFilter').value = filters.search;
                setTimeout(() => { if (filters.category) document.getElementById('categoryFilter').value = filters.category; }, 100);
            } catch(e){}
        }

        clearDashboardHighlight() {
            document.querySelectorAll('.card.clickable').forEach(c => c.classList.remove('active-filter'));
        }

        setDefaultDate() {
            const el = document.getElementById('date');
            if (el) el.value = new Date().toISOString().split('T')[0];
        }

        // ✅ CORREÇÃO: Limpar filtros ao mudar de mês
        changeMonth(delta) {
            this.curren®onth.se®onth(this.curren®onth.ge®onth() + delta);
            this.updateMonthDisplay();
            this.clearCache(); // ✅ CORREÇÃO: Limpar cache
            this.clearDashboardHighlight(); // ✅ CORREÇÃO: Limpar destaque
            this.render();
            this.updateCharts();
        }

        updateMonthDisplay() {
            const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            const el = document.getElementById('curren®onth');
            if (el) el.textContent = months[this.curren®onth.ge®onth()] + ' ' + this.curren®onth.getFullYear();
        }

        forma®onthYear(date) {
            return String(date.ge®onth() + 1).padStart(2, '0') + '-' + date.getFullYear();
        }
generateTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.ge®onth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.ge®inutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return 'SmartWallet-' + year + month + day + hours + minutes + seconds;
}
        // ✅ CORREÇÃO: Padronizado para T12:00:00 e com cache
        ge®onthTransactions(date) {
            if (!date) date = this.curren®onth;
            const key = date.getFullYear() + '-' + String(date.ge®onth() + 1).padStart(2, '0');
            
            if (!this._cache.monthTransactions) this._cache.monthTransactions = {};
            if (this._cache.monthTransactions[key]) return this._cache.monthTransactions[key];
            
            const m = date.ge®onth(), y = date.getFullYear();
            const result = this.transactions.filter(t => {
                const d = new Date(t.date + 'T12:00:00'); // ✅ CORREÇÃO: Padronizado
                return d.ge®onth() === m && d.getFullYear() === y;
            });
            
            this._cache.monthTransactions[key] = result;
            return result;
        }

        getCardTransactions(cardId, date) {
            if (!date) date = this.curren®onth;
            const m = date.ge®onth(), y = date.getFullYear();
            return this.transactions.filter(t => {
                if (t.paymen®ethod !== 'card:' + cardId || t.amount >= 0) return false;
                const d = new Date(t.date + 'T12:00:00'); // ✅ CORREÇÃO: Padronizado
                return d.ge®onth() === m && d.getFullYear() === y;
            });
        }

        getCardTransactionsForPeriod(cardId, startDate, closingDate) {
            const start = new Date(startDate); start.setHours(0, 0, 0, 0);
            const end = new Date(closingDate); end.setHours(23, 59, 59, 999);
            return this.transactions.filter(t => {
                if (t.paymen®ethod !== 'card:' + cardId) return false;
                if (t.amount >= 0) return false;
                const tDate = new Date(t.date + 'T12:00:00'); // ✅ CORREÇÃO: Padronizado
                return tDate >= start && tDate <= end;
            });
        }

        populateCategorySelects() {
            const self = this;
            ['category', 'editCategory', 'categoryFilter'].forEach((id, i) => {
                const sel = document.getElementById(id);
                if (!sel) return;
                const val = sel.value;
                sel.innerH®L = i === 2 ? '<option value="">Todas as categorias</option>' : '<option value="">Selecione uma categoria...</option>';
                self.categories.forEach(cat => {
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

        populatePaymen®ethodSelects() {
            const self = this;
            ['paymen®ethod', 'editPaymen®ethod'].forEach(id => {
                const sel = document.getElementById(id);
                if (!sel) return;
                const currentVal = sel.value;
                sel.innerH®L = '<option value="">Selecione...</option>';
                const group = document.createElement('optgroup');
                group.label = '💰 Formas de Pagamento';
                PAYMENT_METHODS.forEach(pm => {
                    const opt = document.createElement('option');
                    opt.value = pm.id;
                    opt.textContent = pm.icon + ' ' + pm.name;
                    group.appendChild(opt);
                });
                sel.appendChild(group);
                if (self.cards.length > 0) {
                    const cardGroup = document.createElement('optgroup');
                    cardGroup.label = '💳 Cartões de Crédito';
                    self.cards.forEach(card => {
                        const opt = document.createElement('option');
                        opt.value = 'card:' + card.id;
                        opt.textContent = '💳 ' + card.name + ' •••• ' + (card.last4 || '****');
                        cardGroup.appendChild(opt);
                    });
                    sel.appendChild(cardGroup);
                }
                sel.value = currentVal;
            });
        }

        populateAccountSelects() {
            const self = this;
            ['transactionAccount', 'editTransactionAccount', 'accountFilter'].forEach(id => {
                const sel = document.getElementById(id);
                if (!sel) return;
                const val = sel.value;
                const isFilter = id === 'accountFilter';
                sel.innerH®L = isFilter ? '<option value="">Todas as contas</option>' : '<option value="">Selecione a conta...</option>';
                self.accounts.forEach(acc => {
                    const opt = document.createElement('option');
                    opt.value = acc.id;
                    opt.textContent = (acc.type === 'checking' ? '💳 ' : '📈 ') + acc.name;
                    sel.appendChild(opt);
                });
                sel.value = val;
            });
        }

        filterCategoriesByType(selectId, type) {
            const sel = document.getElementById(selectId);
            if (!sel) return;
            sel.querySelectorAll('option').forEach(opt => {
                if (opt.value === '') opt.style.display = 'block';
                else opt.style.display = (!type || opt.dataset.type === type) ? 'block' : 'none';
            });
            const currentVal = sel.value;
            if (currentVal) {
                const currentOpt = sel.querySelector('option[value="' + currentVal + '"]');
                if (currentOpt && currentOpt.style.display === 'none') sel.value = '';
            }
        }

        getCategoryById(id) {
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].id === id) return this.categories[i];
            }
            return { name: 'Sem categoria', color: '#6b7280', type: 'expense' };
        }

        findCategoryByName(name) {
            const lower = name.toLowerCase();
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].name.toLowerCase() === lower) return this.categories[i];
            }
            return null;
        }

        getCardById(id) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].id === id) return this.cards[i];
            }
            return null;
        }

        getPaymen®ethodName(method) {
            if (!method) return '-';
            if (method.indexOf('card:') === 0) {
                const card = this.getCardById(method.replace('card:', ''));
                return card ? '💳 ' + card.name : 'Cartão removido';
            }
            for (let i = 0; i < PAYMENT_METHODS.length; i++) {
                if (PAYMENT_METHODS[i].id === method) return PAYMENT_METHODS[i].icon + ' ' + PAYMENT_METHODS[i].name;
            }
            return method;
        }

        formatCurrency(v) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
        }

        formatDate(d) {
            return new Date(d + 'T12:00:00').toLocaleDateString('pt-BR'); // ✅ CORREÇÃO: Padronizado
        }

        // ✅ CORREÇÃO: Sanitização básica contra XSS
        escapeH®l(t) {
            if (t === null || t === undefined) return '';
            const div = document.createElement('div');
            div.textContent = String(t);
            return div.innerH®L;
        }

        showToast(msg) {
            const t = document.getElementById('toast');
            if (!t) return;
            t.textContent = msg;
            t.classList.add('active');
            clearTimeout(this.toastT);
            this.toastT = setTimeout(() => t.classList.remove('active'), 3000);
        }

        updateDashboard() {
            const mt = this.ge®onthTransactions();
            let inc = 0, exp = 0;
            mt.forEach(t => { if (t.amount > 0) inc += t.amount; else exp += t.amount; });
            let unifiedBalance = 0;
            this.accounts.forEach(a => { if (a.type === 'checking') unifiedBalance += (parseFloat(a.balance) || 0); });
            let creditCardTotal = 0;
            const self = this;
            this.cards.forEach(card => {
                const cardTrans = self.getCardTransactions(card.id);
                cardTrans.forEach(t => { creditCardTotal += Math.abs(t.amount); });
            });
            const balEl = document.getElementById('totalBalance');
            if (balEl) { balEl.textContent = this.formatCurrency(unifiedBalance); balEl.className = 'card-value privacy-value ' + (unifiedBalance >= 0 ? 'positive' : 'negative'); }
            const incEl = document.getElementById('totalIncome');
            if (incEl) incEl.textContent = this.formatCurrency(inc);
            const expEl = document.getElementById('totalExpenses');
            if (expEl) expEl.textContent = this.formatCurrency(Math.abs(exp));
            const goalEl = document.getElementById('goalProgress');
            if (goalEl) { goalEl.textContent = this.formatCurrency(creditCardTotal); goalEl.className = 'card-value privacy-value negative'; }
        }

        // ✅ CORREÇÃO: Performance com DocumentFragment
        render() {
            this.updateDashboard();
            const tbody = document.getElementById('transactionsTable');
            const empty = document.getElementById('emptyState');
            if (!tbody) return;
            const filtered = this.getFilteredTransactions();
            if (!filtered.length) { tbody.innerH®L = ''; if (empty) empty.style.display = 'block'; return; }
            if (empty) empty.style.display = 'none';
            const sorted = filtered.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
            const balMap = {}; let run = 0;
            const reversed = sorted.slice().reverse();
            const self = this;
            reversed.forEach(t => { run += t.amount; balMap[t.id] = run; });
            
            // ✅ CORREÇÃO: Usar DocumentFragment para performance
            const fragment = document.createDocumentFragment();
            sorted.forEach(t => {
                const cat = self.getCategoryById(t.category);
                let acc = null;
                for (let i = 0; i < self.accounts.length; i++) { if (self.accounts[i].id === t.accountId) { acc = self.accounts[i]; break; } }
                const cls = t.amount >= 0 ? 'positive' : 'negative';
                const statusClass = t.statusOk ? 'status-done' : 'status-pending';
                const statusText = t.statusOk ? 'Concluído' : 'Pendente';
                const paymentName = self.getPaymen®ethodName(t.paymen®ethod);
                let recurrenceH®l = '';
                if (t.recurrence) {
                    if (t.recurrence.type === 'installment') recurrenceH®l = '<span class="recurrence-badge">📅 ' + (t.recurrence.current || 1) + '/' + (t.recurrence.total || 1) + '</span>';
                    else if (t.recurrence.type === 'monthly') recurrenceH®l = '<span class="recurrence-badge"> Mensal</span>';
                    else if (t.recurrence.type === 'yearly') recurrenceH®l = '<span class="recurrence-badge">📅 Anual</span>';
                }
                const tr = document.createElement('tr');
                tr.className = 'transaction-row';
                tr.onclick = function() { smartwallet.editTransaction(t.id); };
                tr.innerH®L = '<td data-label="Data">' + self.formatDate(t.date) + '</td>' +
                    '<td data-label="Descrição">' + self.escapeH®l(t.description || '-') + '</td>' +
                    '<td data-label="Categoria"><span class="category-badge" style="background:' + cat.color + '">' + self.escapeH®l(cat.name) + '</span></td>' +
                    '<td data-label="Conta">' + (acc ? '<span class="account-badge">' + self.escapeH®l(acc.name) + '</span>' : '-') + '</td>' +
                    '<td data-label="Pagamento"><span class="payment-badge">' + paymentName + '</span></td>' +
                    '<td data-label="Status"><span class="status-badge ' + statusClass + '">' + statusText + '</span></td>' +
                    '<td data-label="Recorrência">' + (recurrenceH®l || '-') + '</td>' +
                    '<td data-label="Valor" class="amount ' + cls + ' privacy-value">' + self.formatCurrency(t.amount) + '</td>' +
                    '<td data-label="Saldo" class="balance privacy-value">' + self.formatCurrency(balMap[t.id]) + '</td>';
                fragment.appendChild(tr);
            });
            tbody.innerH®L = '';
            tbody.appendChild(fragment);
        }

        getFilteredTransactions() {
            const search = (document.getElementById('searchFilter').value || '').toLowerCase();
            const catFilter = document.getElementById('categoryFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;
            const accountFilter = document.getElementById('accountFilter').value;
            const self = this;
            return this.ge®onthTransactions().filter(t => {
                const cat = self.getCategoryById(t.category);
                const matchSearch = !search || (t.description || '').toLowerCase().indexOf(search) !== -1 || cat.name.toLowerCase().indexOf(search) !== -1;
                const matchCat = !catFilter || t.category === catFilter;
                const matchType = !typeFilter || (typeFilter === 'income' ? t.amount > 0 : t.amount < 0);
                const matchStatus = !statusFilter || (statusFilter === 'done' ? t.statusOk : !t.statusOk);
                const matchAccount = !accountFilter || t.accountId === accountFilter;
                return matchSearch && matchCat && matchType && matchStatus && matchAccount;
            });
        }

        // ✅ CORREÇÃO: IDs únicos com crypto.randomUUID ou fallback
        generateUniqueId() {
            if (window.crypto && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
        }

        addTransaction() {
            const date = document.getElementById('date').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const statusOk = document.getElementById('statusOk').checked;
            const paymen®ethod = document.getElementById('paymen®ethod').value;
            const accountId = document.getElementById('transactionAccount').value;
            const isRecurring = document.getElementById('recurring').checked;
            
            // ✅ CORREÇÃO: Validação completa
            if (!category) { this.showToast('Selecione uma categoria'); return; }
            if (!paymen®ethod) { this.showToast('Selecione a forma de pagamento'); return; }
            if (!date) { this.showToast('Selecione uma data'); return; }
            if (isNaN(amount) || amount <= 0) { this.showToast('Valor inválido'); return; }
            
            if (isRecurring) {
                const recurrenceType = document.getElementById('recurrenceType').value;
                const recurrenceCount = parseInt(document.getElementById('recurrenceCount').value);
                if (recurrenceCount < 2) { this.showToast('Mínimo de 2 parcelas'); return; }
                const startDate = new Date(date + 'T12:00:00');
                const baseAmount = this.currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount);
                const recurrenceGroupId = this.generateUniqueId();
                let createdCount = 0;
                for (let i = 0; i < recurrenceCount; i++) {
                    const transDate = new Date(startDate);
                    if (recurrenceType === 'monthly' || recurrenceType === 'installment') {
                        transDate.se®onth(startDate.ge®onth() + i);
                        const lastDay = new Date(transDate.getFullYear(), transDate.ge®onth() + 1, 0).getDate();
                        transDate.setDate(startDate.getDate() > lastDay ? lastDay : startDate.getDate());
                    } else if (recurrenceType === 'yearly') {
                        transDate.setFullYear(startDate.getFullYear() + i);
                        const lastDay = new Date(transDate.getFullYear(), transDate.ge®onth() + 1, 0).getDate();
                        transDate.setDate(startDate.getDate() > lastDay ? lastDay : startDate.getDate());
                    }
                    let transDescription = description;
                    if (recurrenceType === 'installment') transDescription = description + ' - Parcela ' + (i + 1) + '/' + recurrenceCount;
                    const uniqueId = this.generateUniqueId() + '_' + i; // ✅ CORREÇÃO: ID único
                    this.transactions.push({ id: uniqueId, date: transDate.toISOString().split('T')[0], amount: baseAmount, category: category, description: transDescription, statusOk: statusOk, paymen®ethod: paymen®ethod, accountId: accountId, recurrence: { groupId: recurrenceGroupId, type: recurrenceType, total: recurrenceCount, current: i + 1 } });
                    createdCount++;
                }
                this.clearCache(); // ✅ CORREÇÃO: Limpar cache
                this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
                this.showToast('✅ ' + createdCount + ' transações recorrentes criadas!');
                closeNewTransactionModal(); this.clearForm(); return;
            }
            const transaction = { id: this.generateUniqueId(), date: date, amount: this.currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount), category: category, description: description, statusOk: statusOk, paymen®ethod: paymen®ethod, accountId: accountId };
            this.clearCache(); // ✅ CORREÇÃO: Limpar cache
            this.transactions.push(transaction); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge();
            this.showToast('Transação adicionada!'); closeNewTransactionModal(); this.clearForm();
        }

        clearForm() {
            const form = document.getElementById('transactionForm'); if (form) form.reset();
            this.setDefaultDate(); this.currentTransactionType = 'expense';
            document.querySelectorAll('#transactionForm .type-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === 'expense'));
            this.filterCategoriesByType('category', 'expense');
            const recurringOptions = document.getElementById('recurringOptions'); if (recurringOptions) recurringOptions.style.display = 'none';
        }

        editTransaction(id) {
            let t = null; for (let i = 0; i < this.transactions.length; i++) { if (this.transactions[i].id === id) { t = this.transactions[i]; break; } }
            if (!t) return;
            this.currentEditId = id; this.currentEditType = t.amount > 0 ? 'income' : 'expense';
            document.getElementById('editId').value = t.id; document.getElementById('editDate').value = t.date; document.getElementById('editAmount').value = Math.abs(t.amount);
            document.getElementById('editCategory').value = t.category || ''; document.getElementById('editPaymen®ethod').value = t.paymen®ethod || '';
            document.getElementById('editTransactionAccount').value = t.accountId || ''; document.getElementById('editDescription').value = t.description || '';
            document.getElementById('editStatusOk').checked = !!t.statusOk;
            if (t.recurrence) { document.getElementById('editRecurring').checked = true; document.getElementById('editRecurringOptions').style.display = 'block'; document.getElementById('editRecurrenceType').value = t.recurrence.type; document.getElementById('editRecurrenceCount').value = t.recurrence.total; }
            else { document.getElementById('editRecurring').checked = false; document.getElementById('editRecurringOptions').style.display = 'none'; }
            document.querySelectorAll('#editForm .type-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === this.currentEditType));
            this.filterCategoriesByType('editCategory', this.currentEditType);
            document.getElementById('edi®odal').classList.add('active');
        }

updateTransaction() {
    // ✅ CORREÇÃO: Validação completa dos campos
    const id = document.getElementById('editId').value;
    const date = document.getElementById('editDate').value;
    const amount = parseFloat(document.getElementById('editAmount').value);
    const category = document.getElementById('editCategory').value;
    const paymen®ethod = document.getElementById('editPaymen®ethod').value;
    
    if (!id) {
        this.showToast('❌ Erro: ID da transação não encontrado');
        return;
    }
    
    if (!date) {
        this.showToast('⚠️ Selecione uma data');
        return;
    }
    
    if (isNaN(amount) || amount <= 0) {
        this.showToast('⚠️ Valor inválido');
        return;
    }
    
    if (!category) {
        this.showToast('⚠️ Selecione uma categoria');
        return;
    }
    
    if (!paymen®ethod) {
        this.showToast('⚠️ Selecione a forma de pagamento');
        return;
    }
    
    // ✅ CORREÇÃO: Encontrar transação comparando como string
    let idx = -1;
    for (let i = 0; i < this.transactions.length; i++) {
        if (String(this.transactions[i].id) === String(id)) {
            idx = i;
            break;
        }
    }
    
    if (idx === -1) {
        this.showToast('❌ Transação não encontrada');
        return;
    }
    
    const isRecurring = document.getElementById('editRecurring').checked;
    let recurrenceData = null;
    if (isRecurring) {
        const recurrenceType = document.getElementById('editRecurrenceType').value;
        const recurrenceCount = parseInt(document.getElementById('editRecurrenceCount').value);
        recurrenceData = {
            type: recurrenceType,
            total: recurrenceCount,
            current: this.transactions[idx].recurrence ? this.transactions[idx].recurrence.current : 1
        };
    }
    
    // ✅ CORREÇÃO: Atualizar transação com todos os campos validados
    this.transactions[idx] = {
        id: this.transactions[idx].id, // Mantém o ID original
        date: date,
        amount: this.currentEditType === 'expense' ? -Math.abs(amount) : Math.abs(amount),
        category: category,
        description: document.getElementById('editDescription').value,
        statusOk: document.getElementById('editStatusOk').checked,
        paymen®ethod: paymen®ethod,
        accountId: document.getElementById('editTransactionAccount').value,
        recurrence: recurrenceData
    };
    
    this.clearCache();
    this.saveTransactions();
    this.render();
    this.updateCharts();
    this.updateAlertBadge();
    closeEdi®odal();
    this.showToast('✅ Transação atualizada!');
}
        deleteFromEdit() { if (!this.currentEditId) return; if (!confirm('Excluir esta transação?')) return; this.transactions = this.transactions.filter(t => t.id !== this.currentEditId); this.clearCache(); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge(); closeEdi®odal(); this.showToast('Excluída!'); }
        deleteTransaction(id) { if (!confirm('Excluir esta transação?')) return; this.transactions = this.transactions.filter(t => t.id !== id); this.clearCache(); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge(); this.showToast('Transação excluída!'); }

        applyTheme() {
            document.body.classList.toggle('light', !this.darkMode);
            const btn = document.getElementById('themeBtn');
            if (btn) { btn.innerH®L = this.darkMode ? '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' : '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'; }
            if (Object.keys(this.charts).length > 0) { try { this.updateChartsTheme(); } catch (e) { console.warn('[SmartWallet] Erro tema:', e); } }
        }

        applyPrivacy() {
            document.body.classList.toggle('privacy-on', this.privacyOn);
            const btn = document.getElementById('privacyBtn');
            if (btn) { btn.innerH®L = this.privacyOn ? '<svg class="icon" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>' : '<svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'; btn.classList.toggle('active', this.privacyOn); }
        }

        getChartColors() { const isLight = document.body.classList.contains('light'); return { text: isLight ? '#1e293b' : '#e2e8f0', grid: isLight ? '#e5e7eb' : '#334155', textSecondary: isLight ? '#64748b' : '#94a3b8' }; }

        initCharts() {
            if (typeof Chart === 'undefined') { console.error('[SmartWallet] Chart.js não carregado!'); return; }
            const colors = this.getChartColors();
            const lineOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { color: colors.text } } }, scales: { y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }, x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } } } };
            try { this.charts.line = new Chart(document.getElementById('lineChart').getContext('2d'), { type: 'line', data: { labels: [], datasets: [ { label: 'Receitas', data: [], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4 }, { label: 'Despesas', data: [], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', tension: 0.4 } ] }, options: lineOpts }); } catch (e) { console.error('[SmartWallet] Erro line:', e); }
            try { this.charts.pie = new Chart(document.getElementById('pieChart').getContext('2d'), { type: 'bar', data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }, y: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } } }, barPercentage: 0.3, categoryPercentage: 0.5 } }); } catch (e) { console.error('[SmartWallet] Erro pie:', e); }
            try { this.charts.cards = new Chart(document.getElementById('cardsChart').getContext('2d'), { type: 'line', data: { labels: [], datasets: [] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { color: colors.text } } }, scales: { y: { beginAtZero: true, ticks: { color: colors.textSecondary }, grid: { color: colors.grid } }, x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } } } } }); } catch (e) { console.error('[SmartWallet] Erro cards:', e); }
            this.updateCharts();
        }

        updateChartsTheme() {
            const colors = this.getChartColors(); const self = this;
            Object.keys(this.charts).forEach(key => { const chart = self.charts[key]; if (!chart || !chart.options) return; try { if (chart.options.scales?.y?.ticks) chart.options.scales.y.ticks.color = colors.textSecondary; if (chart.options.scales?.y?.grid) chart.options.scales.y.grid.color = colors.grid; if (chart.options.scales?.x?.ticks) chart.options.scales.x.ticks.color = colors.textSecondary; if (chart.options.scales?.x?.grid) chart.options.scales.x.grid.color = colors.grid; if (chart.options.plugins?.legend?.labels) chart.options.plugins.legend.labels.color = colors.text; chart.update('none'); } catch (e) { console.warn('[SmartWallet] Erro tema gráfico:', e); } });
        }

        updateCharts() {
            const self = this; const lLabels = [], lInc = [], lExp = [];
            for (let i = -2; i <= 3; i++) { const d = new Date(this.curren®onth); d.se®onth(d.ge®onth() + i); const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']; lLabels.push(months[d.ge®onth()] + '/' + d.getFullYear()); const mt = this.ge®onthTransactions(d); let inc = 0, exp = 0; mt.forEach(t => { if (t.amount > 0) inc += t.amount; else exp += t.amount; }); lInc.push(inc); lExp.push(Math.abs(exp)); }
            if (this.charts.line) { this.charts.line.data.labels = lLabels; this.charts.line.data.datasets[0].data = lInc; this.charts.line.data.datasets[1].data = lExp; this.charts.line.update(); }
            const exps = {}; this.ge®onthTransactions().forEach(t => { if (t.amount < 0) { const c = self.getCategoryById(t.category); if (!exps[c.name]) exps[c.name] = { t: 0, color: c.color }; exps[c.name].t += Math.abs(t.amount); } });
            if (this.charts.pie) { this.charts.pie.data.labels = Object.keys(exps); this.charts.pie.data.datasets[0].data = Object.keys(exps).map(k => exps[k].t); this.charts.pie.data.datasets[0].backgroundColor = Object.keys(exps).map(k => exps[k].color); this.charts.pie.update(); }
            if (this.charts.cards) { const cardLabels = []; const cardDatasets = []; for (let i = -2; i <= 3; i++) { const d = new Date(this.curren®onth); d.se®onth(d.ge®onth() + i); const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']; cardLabels.push(months[d.ge®onth()] + '/' + d.getFullYear()); } this.cards.forEach(card => { const data = []; for (let i = -2; i <= 3; i++) { const d = new Date(self.curren®onth); d.se®onth(d.ge®onth() + i); const cardTrans = self.getCardTransactions(card.id, d); let total = 0; cardTrans.forEach(t => total += Math.abs(t.amount)); data.push(total); } cardDatasets.push({ label: card.name, data: data, borderColor: card.color, backgroundColor: card.color + '20', tension: 0.4, fill: false }); }); this.charts.cards.data.labels = cardLabels; this.charts.cards.data.datasets = cardDatasets; this.charts.cards.update(); }
            this.updateInves®entChart();
        }

        updateAlertBadge() {
            const today = new Date(); today.setHours(0, 0, 0, 0); const in3Days = new Date(today); in3Days.setDate(in3Days.getDate() + 3); const self = this;
            const bills = this.transactions.filter(t => { if (t.statusOk || t.amount >= 0) return false; const tDate = new Date(t.date + 'T12:00:00'); return tDate <= in3Days; });
            const badge = document.getElementById('alertBadge'); const btn = document.getElementById('alertBtn');
            if (badge && btn) { if (bills.length > 0) { badge.textContent = bills.length; badge.classList.add('visible'); btn.classList.add('has-alerts'); } else { badge.classList.remove('visible'); btn.classList.remove('has-alerts'); } }
        }

        // ✅ CORREÇÃO: Edge case para meses com menos dias
        getInvoicePeriod(card, referenceDate) {
            const refDate = referenceDate || this.cardModalMonth || new Date();
            const year = refDate.getFullYear(); const month = refDate.ge®onth();
            
            // ✅ CORREÇÃO: Ajustar dia de fechamento se o mês não tiver tantos dias
            const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
            const closingDay = Math.min(card.closingDay, lastDayOfMonth);
            
            let closingDate = new Date(year, month, closingDay);
            const startDate = new Date(closingDate); startDate.se®onth(startDate.ge®onth() - 1); startDate.setDate(startDate.getDate() + 1);
            const dueDate = new Date(closingDate); dueDate.se®onth(dueDate.ge®onth() + 1); dueDate.setDate(card.dueDay);
            return { startDate, closingDate, dueDate };
        }

        calculateInvoiceTotal(purchases) { let total = 0; purchases.forEach(p => total += Math.abs(p.amount)); return total; }

        renderCreditCardsList() {
            const container = document.getElementById('creditCardsList'); if (!container) return;
            window.updateCardMonthLabel();
            if (!this.cards.length) { container.innerH®L = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">💳</div><h3>Nenhum cartão cadastrado</h3><p>Clique em "Novo Cartão" para começar</p></div>'; return; }
            const self = this; const refDate = this.cardModalMonth; let h®l = '<div class="credit-cards-grid">';
            this.cards.forEach(card => {
                const period = self.getInvoicePeriod(card, refDate);
                const purchases = self.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate);
                const total = self.calculateInvoiceTotal(purchases); const available = card.limit - total; const usedPct = Math.min(100, (total / card.limit) * 100);
                h®l += '<div class="credit-card-visual" style="background:linear-gradient(135deg, ' + card.color + ' 0%, ' + self.adjustColor(card.color, -30) + ' 100%);" onclick="openInvoiceModal(\'' + card.id + '\')">';
                h®l += '<div class="cc-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editCard(\'' + card.id + '\')">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteCard(\'' + card.id + '\')">🗑️</button></div>';
                h®l += '<div class="cc-header"><div class="cc-brand">' + self.escapeH®l(card.brand) + '</div><div class="cc-chip"></div></div>';
                h®l += '<div class="cc-name">' + self.escapeH®l(card.name) + '</div>';
                h®l += '<div class="cc-number">•••• •••• •••• ' + self.escapeH®l(card.last4 || '****') + '</div>';
                h®l += '<div class="cc-footer"><div><div class="cc-label">Fatura Atual</div><div class="cc-value">' + self.formatCurrency(total) + '</div></div><div style="text-align:right;"><div class="cc-label">Disponível</div><div class="cc-value">' + self.formatCurrency(available) + '</div></div></div>';
                h®l += '<div style="position:absolute; bottom:0; left:0; right:0; height:4px; background:rgba(0,0,0,0.3);"><div style="height:100%; width:' + usedPct + '%; background:' + (usedPct > 80 ? '#ef4444' : usedPct > 50 ? '#f59e0b' : '#10b981') + ';"></div></div>';
                h®l += '</div>';
            });
            h®l += '</div>'; container.innerH®L = h®l;
        }

        adjustColor(color, amount) { const hex = color.replace('#', ''); const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount)); const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount)); const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount)); return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0'); }
        
        saveCard() { const id = document.getElementById('cardEditId').value; const name = document.getElementById('cardName').value.trim(); const brand = document.getElementById('cardBrand').value; const last4 = document.getElementById('cardLast4').value.trim(); const closingDay = parseInt(document.getElementById('cardClosingDay').value); const dueDay = parseInt(document.getElementById('cardDueDay').value); const limit = parseFloat(document.getElementById('cardLimit').value); const color = document.getElementById('cardColor').value; if (!name) { this.showToast('Informe o nome'); return; } if (id) { for (let i = 0; i < this.cards.length; i++) { if (this.cards[i].id === id) { this.cards[i] = { id, name, brand, last4, closingDay, dueDay, limit, color }; break; } } } else { this.cards.push({ id: this.generateUniqueId(), name, brand, last4, closingDay, dueDay, limit, color }); } this.clearCache(); this.saveCards(); this.populatePaymen®ethodSelects(); this.renderCreditCardsList(); closeNewCardModal(); this.showToast(id ? 'Cartão atualizado!' : 'Cartão cadastrado!'); }
        deleteCard(id) { if (!confirm('Excluir este cartão? As transações associadas serão mantidas.')) return; this.cards = this.cards.filter(c => c.id !== id); this.clearCache(); this.saveCards(); this.populatePaymen®ethodSelects(); this.renderCreditCardsList(); this.showToast('Cartão removido!'); }
        editCard(id) { const card = this.getCardById(id); if (!card) return; document.getElementById('cardEditId').value = card.id; document.getElementById('cardName').value = card.name; document.getElementById('cardBrand').value = card.brand; document.getElementById('cardLast4').value = card.last4 || ''; document.getElementById('cardClosingDay').value = card.closingDay; document.getElementById('cardDueDay').value = card.dueDay; document.getElementById('cardLimit').value = card.limit; document.getElementById('cardColor').value = card.color; document.getElementById('newCardTitle').textContent = 'Editar Cartão'; document.getElementById('newCardModal').classList.add('active'); }
        
        openInvoice(cardId) { const card = this.getCardById(cardId); if (!card) return; const period = this.getInvoicePeriod(card); const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate); const total = this.calculateInvoiceTotal(purchases); const minimum = total * 0.15; const available = card.limit - total; const self = this; document.getElementById('invoiceTitle').textContent = 'Fatura - ' + card.name; let h®l = '<div style="display:flex; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">'; h®l += '<div><div style="font-size:0.85rem; color:var(--text-secondary);">Período</div><div style="font-weight:600;">' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' - ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '</div></div>'; h®l += '<div style="text-align:right;"><div style="font-size:0.85rem; color:var(--text-secondary);">Vencimento</div><div style="font-weight:600; color:var(--warning-color);">' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '</div></div></div>'; h®l += '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">'; h®l += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Limite Total</span><span style="font-weight:600;">' + this.formatCurrency(card.limit) + '</span></div>'; h®l += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total da Fatura</span><span style="font-weight:600; color:var(--danger-color);">' + this.formatCurrency(total) + '</span></div>'; h®l += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Mínimo (15%)</span><span style="font-weight:600;">' + this.formatCurrency(minimum) + '</span></div>'; h®l += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700;"><span>Disponível</span><span style="color:var(--success-color);">' + this.formatCurrency(available) + '</span></div></div>'; h®l += '<div style="display:flex; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:10px;">'; h®l += '<h3 style="font-size:1.1rem;">Compras (' + purchases.length + ')</h3>'; h®l += '<div style="display:flex; gap:8px;">'; h®l += '<button class="btn btn-secondary btn-small" onclick="smartwallet.exportInvoiceCSV(\'' + cardId + '\')">📥 CSV</button>'; h®l += '<button class="btn btn-secondary btn-small" onclick="smartwallet.printInvoicePDF(\'' + cardId + '\')">🖨️ PDF</button></div></div>'; h®l += '<div>'; if (purchases.length === 0) { h®l += '<p style="text-align:center; padding:20px; color:var(--text-secondary);">Nenhuma compra neste período.</p>'; } else { purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(p => { const cat = self.getCategoryById(p.category); h®l += '<div style="background:var(--input-bg); border-radius:12px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:12px;">'; h®l += '<div style="flex:1;"><div style="font-weight:600;">' + self.escapeH®l(p.description) + '</div>'; h®l += '<div style="font-size:0.8rem; color:var(--text-secondary); display:flex; gap:10px;"><span>' + self.formatDate(p.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeH®l(cat.name) + '</span></div></div>'; h®l += '<div style="font-weight:700;">' + self.formatCurrency(Math.abs(p.amount)) + '</div>'; h®l += '<button class="btn btn-danger btn-small" onclick="smartwallet.deleteTransaction(' + p.id + '); smartwallet.openInvoice(\'' + cardId + '\')">️</button></div>'; }); } h®l += '</div>'; h®l += '<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;">'; h®l += '<button class="btn btn-success" onclick="smartwallet.payInvoice(\'' + cardId + '\')">💰 Pagar Fatura</button>'; h®l += '<button class="btn btn-secondary" onclick="closeInvoiceModal()">Fechar</button></div>'; document.getElementById('invoiceContent').innerH®L = h®l; document.getElementById('invoiceModal').classList.add('active'); }
        
        payInvoice(cardId) { const card = this.getCardById(cardId); if (!card) return; const period = this.getInvoicePeriod(card); const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate); const total = this.calculateInvoiceTotal(purchases); if (total <= 0) { this.showToast('Fatura sem valor'); return; } if (!confirm('Pagar fatura de ' + this.formatCurrency(total) + '?')) return; this.transactions.push({ id: this.generateUniqueId(), date: new Date().toISOString().split('T')[0], amount: -total, category: 'servicos', description: 'Pagamento Fatura ' + card.name, statusOk: false, paymen®ethod: 'pix', accountId: '' }); this.clearCache(); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge(); this.showToast('Pagamento registrado!'); }
        exportInvoiceCSV(cardId) { 
            const card = this.getCardById(cardId); if (!card) return; 
            const period = this.getInvoicePeriod(card); 
            const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate); 
            const self = this; 
                let csv = '\ufeffFATURA - ' + card.name + '\n'; csv += 'Período:;' + 
                    this.formatDate(period.startDate.toISOString().split('T')[0]) + ' a ' + 
                    this.formatDate(period.closingDate.toISOString().split('T')[0]) + '\n'; csv += 'Vencimento:;' + 
                    this.formatDate(period.dueDate.toISOString().split('T')[0]) + '\n\n'; csv += 'Data;Descrição;Categoria;Valor\n'; purchases.forEach(p => { const cat = self.getCategoryById(p.category); csv += p.date + ';"' + (p.description || '').replace(/"/g,'""') + '";"' + cat.name + '";' + Math.abs(p.amount).toFixed(2) + '\n'; }); const total = this.calculateInvoiceTotal(purchases); csv += '\nTOTAL DA FATURA;;;' + this.formatCurrency(total) + '\n'; const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = this.generateTimestamp() + '_fatura_' + card.name.replace(/\s+/g,'_') + '.csv'; a.click(); this.showToast('Fatura exportada!'); }
        printInvoicePDF(cardId) { const card = this.getCardById(cardId); if (!card) return; const period = this.getInvoicePeriod(card); const purchases = this.getCardTransactionsForPeriod(card.id, period.startDate, period.closingDate); const total = this.calculateInvoiceTotal(purchases); const self = this; const printWindow = window.open('', '_blank'); const rows = purchases.sort((a,b) => new Date(a.date) - new Date(b.date)).map(p => { const cat = self.getCategoryById(p.category); return '<tr><td>' + self.formatDate(p.date) + '</td><td>' + self.escapeH®l(p.description) + '</td><td>' + self.escapeH®l(cat.name) + '</td><td style="text-align:right;">' + self.formatCurrency(Math.abs(p.amount)) + '</td></tr>'; }).join(''); printWindow.document.write('<!DOCTYPE h®l><h®l><head><title>' + this.generateTimestamp() + '_fatura_' + card.name + '</title><style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;}.header{border-bottom:3px solid #6366f1;padding-bottom:20px;margin-bottom:30px;}.header h1{color:#6366f1;margin:0 0 5px 0;}table{width:100%;border-collapse:collapse;}th,td{padding:10px;text-align:left;border-bottom:1px solid #e5e7eb;}th{background:#f1f5f9;}.total{font-weight:700;font-size:1.2rem;}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #6366f1;font-size:0.85rem;color:#64748b;text-align:center;}@media print{body{padding:20px;}}</style></head><body>'); printWindow.document.write('<div class="header"><h1>Fatura - ' + this.escapeH®l(card.name) + '</h1><div style="color:#64748b;">' + this.escapeH®l(card.brand) + ' •••• ' + this.escapeH®l(card.last4 || '****') + '</div></div>'); printWindow.document.write('<p><strong>Período:</strong> ' + this.formatDate(period.startDate.toISOString().split('T')[0]) + ' a ' + this.formatDate(period.closingDate.toISOString().split('T')[0]) + '</p>'); printWindow.document.write('<p><strong>Vencimento:</strong> ' + this.formatDate(period.dueDate.toISOString().split('T')[0]) + '</p>'); printWindow.document.write('<table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th></tr></thead><tbody>' + rows + '</tbody>'); printWindow.document.write('<tfoot><tr class="total"><td colspan="3" style="text-align:right;">TOTAL:</td><td>' + this.formatCurrency(total) + '</td></tr></tfoot></table>'); printWindow.document.write('<div class="footer">Smart Wallet • Gerado em ' + new Date().toLocaleString('pt-BR') + '<br>Idealizado por RogerElizar®</div>'); printWindow.document.write('</body></h®l>'); printWindow.document.close(); setTimeout(() => printWindow.print(), 250); }

        exportCSV() { const mt = this.ge®onthTransactions(); if (!mt.length) { this.showToast('Nenhuma transação'); return; } const self = this; let csv = '\ufeffData;Descrição;Categoria;Tipo;Pagamento;Status;Valor\n'; mt.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(t => { const c = self.getCategoryById(t.category); const status = t.statusOk ? 'Concluído' : 'Pendente'; const payment = self.getPaymen®ethodName(t.paymen®ethod); csv += t.date + ';"' + (t.description || '').replace(/"/g,'""') + '";"' + c.name + '";' + (t.amount > 0 ? 'Receita' : 'Despesa') + ';"' + payment + '";' + status + ';' + Math.abs(t.amount).toFixed(2) + '\n'; }); const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = this.generateTimestamp() + '_extrato_' + this.forma®onthYear(this.curren®onth) + '.csv';; a.click(); this.showToast('CSV exportado!'); closeExpor®odal(); }
        
        printExtratoPDF() { const filtered = this.getFilteredTransactions(); if (!filtered.length) { this.showToast('Nenhuma transação para imprimir'); return; } const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']; const period = months[this.curren®onth.ge®onth()] + ' de ' + this.curren®onth.getFullYear(); let totalReceitas = 0, totalDespesas = 0; const sorted = filtered.slice().sort((a, b) => new Date(a.date) - new Date(b.date)); sorted.forEach(t => { if (t.amount > 0) totalReceitas += t.amount; else totalDespesas += Math.abs(t.amount); }); const saldo = totalReceitas - totalDespesas; const rowsH®l = sorted.map(t => { const cat = this.getCategoryById(t.category); const acc = this.accounts.find(a => a.id === t.accountId); return '<tr><td>' + this.formatDate(t.date) + '</td><td>' + this.escapeH®l(t.description || '-') + '</td><td><span style="background:' + cat.color + ';color:white;padding:2px 6px;border-radius:8px;font-size:8pt;">' + this.escapeH®l(cat.name) + '</span></td><td>' + (acc ? this.escapeH®l(acc.name) : '-') + '</td><td>' + this.getPaymen®ethodName(t.paymen®ethod) + '</td><td style="color:' + (t.statusOk ? '#10b981' : '#f59e0b') + ';font-weight:600;">' + (t.statusOk ? 'Concluído' : 'Pendente') + '</td><td style="color:' + (t.amount >= 0 ? '#10b981' : '#ef4444') + ';font-weight:600;text-align:right;">' + this.formatCurrency(t.amount) + '</td></tr>'; }).join(''); Timestamp() + '_extrato_' + period.replace(/ de /g,'_').replace(' ','') + '</title><style>@page { size: A4; margin: 2cm; }body { font-family: Arial, sans-serif; color: #1e293b; padding: 20px; max-width: 900px; margin: 0 auto; }.header { text-align: center; border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }.header h1 { color: #6366f1; font-size: 28pt; margin: 0 0 8px 0; }table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 9pt; }th { background: #6366f1; color: white; padding: 10px 8px; text-align: left; font-weight: 600; }td { padding: 8px; border-bottom: 1px solid #e5e7eb; }tr:nth-child(even) { background: #f8fafc; }.summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }.summary-box { background: #f8fafc; border-radius: 8px; padding: 16px; text-align: center; border: 2px solid #e5e7eb; }.summary-box .label { font-size: 9pt; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }.summary-box .value { font-size: 16pt; font-weight: bold; }.summary-box.receitas .value { color: #10b981; }.summary-box.despesas .value { color: #ef4444; }.summary-box.saldo .value { color: #6366f1; }.footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #6366f1; text-align: center; font-size: 9pt; color: #64748b; }.no-print { text-align:center; margin-top:24px; }@media print { body { padding: 0; } .no-print { display: none; } }</style></head><body><div class="header"><h1>Smart Wallet</h1><p style="color:#64748b;">Controle Financeiro Pessoal Inteligente</p><p style="color:#6366f1;font-size:14pt;font-weight:bold;margin:12px 0 0 0;">Extrato do Mês: ' + period + '</p></div><table><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Pagamento</th><th>Status</th><th style="text-align:right;">Valor</th></tr></thead><tbody>' + rowsH®l + '</tbody></table><div class="summary"><div class="summary-box receitas"><div class="label">Total de Receitas</div><div class="value">' + this.formatCurrency(totalReceitas) + '</div></div><div class="summary-box despesas"><div class="label">Total de Despesas</div><div class="value">' + this.formatCurrency(totalDespesas) + '</div></div><div class="summary-box saldo"><div class="label">Saldo do Mês</div><div class="value">' + this.formatCurrency(saldo) + '</div></div></div><div class="footer"><p>Smart Wallet - Extrato gerado automaticamente</p><p style="font-weight:600;color:#6366f1;margin-top:6px;">Idealizado por RogerElizar® | rogerelizar@gmail.com</p></div><div class="no-print"><button onclick="window.print()" style="background:#6366f1;color:white;border:none;padding:12px 24px;border-radius:8px;font-size:11pt;cursor:pointer;">🖨️ Imprimir / Salvar PDF</button></div></body></h®l>'; const printWindow = window.open('', '_blank'); if (!printWindow) { alert('Por favor, permita popups para imprimir o extrato.'); return; } printWindow.document.write(h®l); printWindow.document.close(); setTimeout(() => { printWindow.focus(); printWindow.print(); }, 300); }

        exportBackup() { try { const backup = { version: '4.0.1', exportDate: new Date().toISOString(), appName: 'Smart Wallet', transactions: this.transactions, categories: this.categories, accounts: this.accounts, cards: this.cards, inves®ents: this.inves®ents, darkMode: this.darkMode, privacyOn: this.privacyOn }; const jsonString = JSON.stringify(backup, null, 2); const blob = new Blob(['\ufeff' + jsonString], { type: 'application/json;charset=utf-8' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = this.generateTimestamp() + '_backup.json'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href); this.showToast('✅ Backup exportado!'); document.getElementById('mainMenu').classList.remove('active'); } catch (e) { this.showToast('❌ Erro: ' + e.message); } }
        
        importBackup() { if (!window._pendingBackupData) { this.showToast('⚠️ Selecione um arquivo'); return; } try { let cleanData = window._pendingBackupData; if (cleanData.charCodeAt(0) === 0xFEFF) cleanData = cleanData.substring(1); cleanData = cleanData.trim(); if (!cleanData) { this.showToast('❌ Arquivo vazio!'); return; } const data = JSON.parse(cleanData); if (!data || typeof data !== 'object') { this.showToast('❌ Estrutura inválida'); return; } const transactions = Array.isArray(data.transactions) ? data.transactions : []; const categories = Array.isArray(data.categories) ? data.categories : this.categories; const accounts = Array.isArray(data.accounts) ? data.accounts : []; const cards = Array.isArray(data.cards) ? data.cards : []; const inves®ents = Array.isArray(data.inves®ents) ? data.inves®ents : []; if (!confirm('⚠️ Substituir TODOS os dados?')) return this.showToast('Cancelado'); this.transactions = transactions; this.categories = categories; this.accounts = accounts; this.cards = cards; this.inves®ents = inves®ents; if (typeof data.darkMode === 'boolean') this.darkMode = data.darkMode; if (typeof data.privacyOn === 'boolean') this.privacyOn = data.privacyOn; this.clearCache(); this.saveTransactions(); this.saveCategories(); this.saveAccounts(); this.saveCards(); this.saveInves®ents(); localStorage.setItem('smartwallet_dark', this.darkMode); localStorage.setItem('smartwallet_privacy', this.privacyOn); this.populateCategorySelects(); this.populatePaymen®ethodSelects(); this.populateAccountSelects(); this.applyTheme(); this.applyPrivacy(); this.render(); this.updateCharts(); this.updateAlertBadge(); closeImportBackupModal(); this.showToast('✅ Backup restaurado!'); window._pendingBackupData = null; } catch (e) { this.showToast('❌ Erro: ' + e.message); } }
        
        importCSV() { if (!window._pendingCsvData) { this.showToast('Selecione um arquivo CSV'); return; } const replace = document.getElementById('csvReplaceData').checked; const lines = window._pendingCsvData.split(/\r?\n/).filter(l => l.trim()); if (lines.length < 2) { this.showToast('CSV vazio ou inválido'); return; } const header = lines[0].toLowerCase(); if (header.indexOf('data') === -1 || header.indexOf('valor') === -1) { this.showToast('Formato CSV inválido'); return; } const self = this; const transactionsToAdd = []; let skipped = 0; for (let i = 1; i < lines.length; i++) { const cols = this.parseCSVLine(lines[i]); if (cols.length < 6) { skipped++; continue; } const [date, desc, catName, tipo, payment, status, valor] = cols; if (!date || !valor) { skipped++; continue; } const category = this.findCategoryByName(catName); const amount = parseFloat(valor.replace(',', '.')); if (isNaN(amount)) { skipped++; continue; } const signedAmount = tipo.toLowerCase().indexOf('despesa') !== -1 ? -Math.abs(amount) : Math.abs(amount); let paymen®ethod = 'pix'; const payLower = (payment || '').toLowerCase(); if (payLower.indexOf('pix') !== -1) paymen®ethod = 'pix'; else if (payLower.indexOf('debit') !== -1 || payLower.indexOf('débito') !== -1) paymen®ethod = 'debit'; else if (payLower.indexOf('auto') !== -1) paymen®ethod = 'auto'; else if (payLower.indexOf('transf') !== -1) paymen®ethod = 'transfer'; transactionsToAdd.push({ id: this.generateUniqueId(), date, amount: signedAmount, category: category ? category.id : '', description: desc, statusOk: status.toLowerCase().indexOf('conclu') !== -1, paymen®ethod, accountId: '' }); } if (replace) { const m = this.curren®onth.ge®onth(), y = this.curren®onth.getFullYear(); this.transactions = this.transactions.filter(t => { const d = new Date(t.date + 'T12:00:00'); return !(d.ge®onth() === m && d.getFullYear() === y); }); } this.transactions = this.transactions.concat(transactionsToAdd); this.clearCache(); this.saveTransactions(); this.render(); this.updateCharts(); this.updateAlertBadge(); closeImportCsvModal(); this.showToast(transactionsToAdd.length + ' transações importadas!' + (skipped > 0 ? ' (' + skipped + ' ignoradas)' : '')); window._pendingCsvData = null; }
        
        parseCSVLine(line) { const result = []; let current = ''; let inQuotes = false; for (let i = 0; i < line.length; i++) { const c = line[i]; if (c === '"') { if (inQuotes && line[i+1] === '"') { current += '"'; i++; } else { inQuotes = !inQuotes; } } else if (c === ';' && !inQuotes) { result.push(current.trim()); current = ''; } else { current += c; } } result.push(current.trim()); return result; }
        
        clearAllData() { this.transactions = []; this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)); this.accounts = []; this.cards = []; this.inves®ents = []; this.clearCache(); this.saveTransactions(); this.saveCategories(); this.saveAccounts(); this.saveCards(); this.saveInves®ents(); this.populateCategorySelects(); this.populatePaymen®ethodSelects(); this.populateAccountSelects(); this.render(); this.updateCharts(); this.updateAlertBadge(); closeClearDataModal(); this.showToast('🗑️ Dados apagados!'); }

        saveAccount() { const id = document.getElementById('accountEditId').value; const name = document.getElementById('accountName').value.trim(); const type = document.getElementById('accountType').value; const balance = parseFloat(document.getElementById('accountBalance').value) || 0; const color = document.getElementById('accountColor').value; if (!name) { this.showToast('Informe o nome'); return; } if (id) { for (let i = 0; i < this.accounts.length; i++) { if (this.accounts[i].id === id) { this.accounts[i] = { id, name, type, balance, color }; break; } } } else { this.accounts.push({ id: this.generateUniqueId(), name, type, balance, color }); } this.clearCache(); this.saveAccounts(); this.populateAccountSelects(); this.renderAccountsList(); this.render(); closeNewAccoun®odal(); this.showToast(id ? 'Conta atualizada!' : 'Conta cadastrada!'); }
        deleteAccount(id) { if (!confirm('Excluir esta conta?')) return; this.accounts = this.accounts.filter(a => a.id !== id); this.clearCache(); this.saveAccounts(); this.populateAccountSelects(); this.renderAccountsList(); this.render(); this.showToast('Conta removida!'); }
        editAccount(id) { let acc = null; for (let i = 0; i < this.accounts.length; i++) { if (this.accounts[i].id === id) { acc = this.accounts[i]; break; } } if (!acc) return; document.getElementById('accountEditId').value = acc.id; document.getElementById('accountName').value = acc.name; document.getElementById('accountType').value = acc.type; document.getElementById('accountBalance').value = acc.balance; document.getElementById('accountColor').value = acc.color; document.getElementById('newAccountTitle').textContent = 'Editar Conta'; document.getElementById('newAccoun®odal').classList.add('active'); }
        renderAccountsList() { const container = document.getElementById('accountsList'); if (!container) return; if (!this.accounts.length) { container.innerH®L = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">🏦</div><h3>Nenhuma conta cadastrada</h3></div>'; return; } const self = this; container.innerH®L = '<div class="accounts-grid">' + this.accounts.map(acc => { return '<div class="account-card" style="background:linear-gradient(135deg, ' + acc.color + ' 0%, ' + self.adjustColor(acc.color, -30) + ' 100%);"><div class="account-card-actions"><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.editAccount(\'' + acc.id + '\')">✏️</button><button class="cc-action-btn" onclick="event.stopPropagation(); smartwallet.deleteAccount(\'' + acc.id + '\')">🗑️</button></div><div class="account-card-header"><div class="account-card-type">' + (acc.type === 'checking' ? '💳 Conta Corrente' : '📈 Investimento') + '</div></div><div class="account-card-name">' + self.escapeH®l(acc.name) + '</div><div class="account-card-balance">' + self.formatCurrency(acc.balance) + '</div></div>'; }).join('') + '</div>'; }

        renderBillsModal() { const container = document.getElementById('billsList'); if (!container) return; const today = new Date(); today.setHours(0, 0, 0, 0); const in3Days = new Date(today); in3Days.setDate(in3Days.getDate() + 3); const self = this; const bills = this.transactions.filter(t => { if (t.statusOk || t.amount >= 0) return false; const tDate = new Date(t.date + 'T12:00:00'); return tDate <= in3Days; }).sort((a, b) => new Date(a.date) - new Date(b.date)); if (bills.length === 0) { container.innerH®L = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px;">✅</div><h3>Nenhuma conta pendente!</h3></div>'; return; } let total = 0; bills.forEach(b => total += Math.abs(b.amount)); let h®l = '<div style="background:var(--input-bg); border-radius:14px; padding:16px; margin-bottom:16px;">'; h®l += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);"><span style="color:var(--text-secondary);">Total de contas</span><span style="font-weight:600;">' + bills.length + '</span></div>'; h®l += '<div style="display:flex; justify-content:space-between; padding:12px 0 0 0; margin-top:4px; border-top:2px solid var(--border-color); font-weight:700; font-size:1.1rem;"><span>Total a pagar</span><span style="color:var(--danger-color);">' + self.formatCurrency(total) + '</span></div></div>'; bills.forEach(bill => { const cat = self.getCategoryById(bill.category); const billDate = new Date(bill.date + 'T12:00:00'); const diffDays = Math.round((billDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)); let daysClass = 'warning', daysText = '', itemClass = ''; if (diffDays < 0) { daysClass = 'overdue'; daysText = Math.abs(diffDays) + 'd atrasada'; itemClass = 'overdue'; } else if (diffDays === 0) { daysClass = 'urgent'; daysText = 'Vence hoje'; itemClass = 'urgent'; } else if (diffDays === 1) { daysClass = 'urgent'; daysText = 'Vence amanhã'; itemClass = 'urgent'; } else { daysText = 'Em ' + diffDays + ' dias'; } h®l += '<div class="bill-item ' + itemClass + '"><div class="bill-info"><div class="bill-desc">' + self.escapeH®l(bill.description) + '<span class="bill-days ' + daysClass + '">' + daysText + '</span></div><div class="bill-meta"><span>📅 ' + self.formatDate(bill.date) + '</span><span style="color:' + cat.color + ';">● ' + self.escapeH®l(cat.name) + '</span></div></div><div class="bill-amount">' + self.formatCurrency(Math.abs(bill.amount)) + '</div><div style="display:flex; gap:4px;"><button class="btn btn-success btn-small" onclick="smartwallet.markBillAsPaid(' + bill.id + ')">✓</button><button class="btn btn-secondary btn-small" onclick="smartwallet.editTransaction(' + bill.id + '); closeBillsModal();">✏️</button></div></div>'; }); container.innerH®L = h®l; }
        markBillAsPaid(id) { for (let i = 0; i < this.transactions.length; i++) { if (this.transactions[i].id === id) { this.transactions[i].statusOk = true; break; } } this.clearCache(); this.saveTransactions(); this.render(); this.updateAlertBadge(); this.renderBillsModal(); this.showToast('✓ Conta paga!'); }

        updateInves®entChart() { const section = document.getElementById('inves®entsChartSection'); if (!section) return; if (!this.inves®ents.length) { section.style.display = 'none'; return; } section.style.display = 'block'; const colors = this.getChartColors(); const now = new Date(); const monthlyData = {}; for (let i = 5; i >= 0; i--) { const d = new Date(now.getFullYear(), now.ge®onth() - i, 1); const key = d.getFullYear() + '-' + String(d.ge®onth() + 1).padStart(2, '0'); monthlyData[key] = { invested: 0, current: 0 }; } const self = this; this.inves®ents.forEach(inv => { const invDate = new Date(inv.date + 'T12:00:00'); const invKey = invDate.getFullYear() + '-' + String(invDate.ge®onth() + 1).padStart(2, '0'); Object.keys(monthlyData).forEach(key => { if (key >= invKey) monthlyData[key].invested += inv.initial; }); const currentKey = now.getFullYear() + '-' + String(now.ge®onth() + 1).padStart(2, '0'); if (monthlyData[currentKey]) monthlyData[currentKey].current += inv.current; }); const labels = [], investedData = [], currentData = [], profitPctData = []; Object.keys(monthlyData).forEach(key => { const d = new Date(key + '-01'); const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']; labels.push(monthNames[d.ge®onth()] + '/' + d.getFullYear()); const invested = monthlyData[key].invested; const current = monthlyData[key].current || invested; investedData.push(invested); currentData.push(current); profitPctData.push(invested > 0 ? ((current - invested) / invested * 100) : 0); }); if (!this.charts.invest) { const canvas = document.getElementById('investChart'); if (!canvas) return; this.charts.invest = new Chart(canvas.getContext('2d'), { type: 'line', data: { labels, datasets: [ { label: 'Valor Investido (R$)', data: investedData, borderColor: '#94a3b8', backgroundColor: 'rgba(148,163,184,0.1)', tension: 0.4, fill: false, yAxisID: 'y' }, { label: 'Valor Atual (R$)', data: currentData, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4, fill: true, yAxisID: 'y' }, { label: 'Rendimento (%)', data: profitPctData, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', tension: 0.4, fill: false, yAxisID: 'y1' } ]}, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { color: colors.text } } }, scales: { y: { beginAtZero: true, ticks: { color: colors.textSecondary, callback: v => 'R$ ' + v.toLocaleString('pt-BR') }, grid: { color: colors.grid } }, y1: { position: 'right', ticks: { color: colors.textSecondary, callback: v => v + '%' }, grid: { display: false } }, x: { ticks: { color: colors.textSecondary }, grid: { color: colors.grid } } } } }); } else { this.charts.invest.data.labels = labels; this.charts.invest.data.datasets[0].data = investedData; this.charts.invest.data.datasets[1].data = currentData; this.charts.invest.data.datasets[2].data = profitPctData; this.charts.invest.update(); } const summaryEl = document.getElementById('investSummary'); if (summaryEl) { let totalInitial = 0, totalCurrent = 0; this.inves®ents.forEach(inv => { totalInitial += inv.initial; totalCurrent += inv.current; }); const totalProfit = totalCurrent - totalInitial; const totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0; summaryEl.innerH®L = '<div class="inves®ent-summary"><h3> Resumo</h3><div class="inves®ent-summary-grid"><div class="inves®ent-summary-item"><div class="inves®ent-summary-label">Total Investido</div><div class="inves®ent-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div><div class="inves®ent-summary-item"><div class="inves®ent-summary-label">Valor Atual</div><div class="inves®ent-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div><div class="inves®ent-summary-item"><div class="inves®ent-summary-label">Rendimento</div><div class="inves®ent-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div></div></div>'; } }

        saveInves®ent() { const id = document.getElementById('inves®entEditId').value; const name = document.getElementById('inves®entName').value.trim(); const type = document.getElementById('inves®entType').value; const initial = parseFloat(document.getElementById('inves®entInitial').value) || 0; const current = parseFloat(document.getElementById('inves®entCurrent').value) || 0; const date = document.getElementById('inves®entDate').value; const rate = parseFloat(document.getElementById('inves®entRate').value) || 0; if (!name) { this.showToast('Informe o nome'); return; } if (id) { for (let i = 0; i < this.inves®ents.length; i++) { if (this.inves®ents[i].id === id) { this.inves®ents[i] = { id, name, type, initial, current, date, rate }; break; } } } else { this.inves®ents.push({ id: this.generateUniqueId(), name, type, initial, current, date, rate }); } this.clearCache(); this.saveInves®ents(); this.renderInves®entsModal(); this.updateInves®entChart(); closeNewInves®en®odal(); this.showToast(id ? 'Aplicação atualizada!' : 'Aplicação cadastrada!'); }
        deleteInves®ent(id) { if (!confirm('Excluir esta aplicação?')) return; this.inves®ents = this.inves®ents.filter(i => i.id !== id); this.clearCache(); this.saveInves®ents(); this.renderInves®entsModal(); this.updateInves®entChart(); this.showToast('Aplicação excluída!'); }
        editInves®ent(id) { let inv = null; for (let i = 0; i < this.inves®ents.length; i++) { if (this.inves®ents[i].id === id) { inv = this.inves®ents[i]; break; } } if (!inv) return; document.getElementById('inves®entEditId').value = inv.id; document.getElementById('inves®entName').value = inv.name; document.getElementById('inves®entType').value = inv.type; document.getElementById('inves®entInitial').value = inv.initial; document.getElementById('inves®entCurrent').value = inv.current; document.getElementById('inves®entDate').value = inv.date; document.getElementById('inves®entRate').value = inv.rate; document.getElementById('newInves®entTitle').textContent = 'Editar Aplicação'; document.getElementById('newInves®en®odal').classList.add('active'); }
        openUpdateInves®ent(id) { let inv = null; for (let i = 0; i < this.inves®ents.length; i++) { if (this.inves®ents[i].id === id) { inv = this.inves®ents[i]; break; } } if (!inv) return; document.getElementById('updateInves®entId').value = inv.id; document.getElementById('updateInves®entName').textContent = inv.name; document.getElementById('updateInves®entValue').value = inv.current; document.getElementById('updateInves®entDate').value = new Date().toISOString().split('T')[0]; document.getElementById('updateInves®en®odal').classList.add('active'); }
        updateInves®entValue() { const id = document.getElementById('updateInves®entId').value; const newValue = parseFloat(document.getElementById('updateInves®entValue').value) || 0; for (let i = 0; i < this.inves®ents.length; i++) { if (this.inves®ents[i].id === id) { this.inves®ents[i].current = newValue; break; } } this.clearCache(); this.saveInves®ents(); this.renderInves®entsModal(); this.updateInves®entChart(); closeUpdateInves®en®odal(); this.showToast('Valor atualizado!'); }
        renderInves®entsModal() { const container = document.getElementById('inves®entsContent'); if (!container) return; const self = this; const typeLabels = { cdb: 'CDB', tesouro: 'Tesouro Direto', lci: 'LCI/LCA', fundo: 'Fundo', acao: 'Ações', fiis: 'FIIs', poupanca: 'Poupança', outro: 'Outro' }; if (!this.inves®ents.length) { container.innerH®L = '<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:3rem; margin-bottom:12px; opacity:0.5;">📈</div><h3>Nenhuma aplicação cadastrada</h3></div>'; return; } let totalInitial = 0, totalCurrent = 0; let h®l = '<div>'; this.inves®ents.forEach(inv => { const profit = inv.current - inv.initial; const profitPct = inv.initial > 0 ? (profit / inv.initial * 100) : 0; totalInitial += inv.initial; totalCurrent += inv.current; h®l += '<div class="inves®ent-card"><div class="inves®ent-card-header"><div><div class="inves®ent-card-title">' + self.escapeH®l(inv.name) + '</div><div class="inves®ent-card-type">' + (typeLabels[inv.type] || inv.type) + ' • Aplicado em ' + self.formatDate(inv.date) + '</div></div><div class="inves®ent-card-actions"><button class="btn btn-secondary btn-small" onclick="smartwallet.openUpdateInves®ent(\'' + inv.id + '\')">💰 Atualizar</button><button class="btn btn-secondary btn-small" onclick="smartwallet.editInves®ent(\'' + inv.id + '\')">✏️</button><button class="btn btn-danger btn-small" onclick="smartwallet.deleteInves®ent(\'' + inv.id + '\')">🗑️</button></div></div><div class="inves®ent-card-values"><div class="inves®ent-value-item"><div class="inves®ent-value-label">Valor Inicial</div><div class="inves®ent-value-amount privacy-value">' + self.formatCurrency(inv.initial) + '</div></div><div class="inves®ent-value-item"><div class="inves®ent-value-label">Valor Atual</div><div class="inves®ent-value-amount privacy-value">' + self.formatCurrency(inv.current) + '</div></div><div class="inves®ent-value-item"><div class="inves®ent-value-label">Rendimento</div><div class="inves®ent-value-amount privacy-value ' + (profit >= 0 ? 'positive' : 'negative') + '">' + profitPct.toFixed(2) + '% (' + self.formatCurrency(profit) + ')</div></div></div>'; if (inv.rate > 0) h®l += '<div style="font-size:0.85rem; color:var(--text-secondary);" class="privacy-value">Taxa: ' + inv.rate + '% ao ano</div>'; h®l += '</div>'; }); h®l += '</div>'; const totalProfit = totalCurrent - totalInitial; const totalProfitPct = totalInitial > 0 ? (totalProfit / totalInitial * 100) : 0; h®l += '<div class="inves®ent-summary"><h3>📊 Resumo Geral</h3><div class="inves®ent-summary-grid"><div class="inves®ent-summary-item"><div class="inves®ent-summary-label">Total Investido</div><div class="inves®ent-summary-value privacy-value">' + this.formatCurrency(totalInitial) + '</div></div><div class="inves®ent-summary-item"><div class="inves®ent-summary-label">Valor Atual</div><div class="inves®ent-summary-value privacy-value">' + this.formatCurrency(totalCurrent) + '</div></div><div class="inves®ent-summary-item"><div class="inves®ent-summary-label">Rendimento Total</div><div class="inves®ent-summary-value privacy-value" style="color:' + (totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)') + ';">' + totalProfitPct.toFixed(2) + '% (' + this.formatCurrency(totalProfit) + ')</div></div></div></div>'; container.innerH®L = h®l; }
        prin®anual() { const printWindow = window.open('', '_blank'); if (!printWindow) { alert('Permita popups para imprimir'); return; } printWindow.document.write('<!DOCTYPE h®l><h®l lang="pt-BR"><head><meta charset="UTF-8"><title>Manual - Smart Wallet</title><style>@page { size: A4; margin: 2cm; }body { font-family: Georgia, serif; color: #1e293b; line-height: 1.6; font-size: 11pt; padding: 20px; }h2 { color: #6366f1; font-size: 16pt; margin-top: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 8px; }h3 { color: #06b6d4; font-size: 13pt; margin-top: 20px; }ul, ol { margin-left: 24px; margin-bottom: 16px; }li { margin-bottom: 8px; }.manual-cover { text-align: center; padding: 60px 30px; border: 3px solid #6366f1; border-radius: 16px; margin-bottom: 40px; }.manual-cover h1 { color: #6366f1; font-size: 32pt; margin-bottom: 16px; }.manual-quote { margin: 24px 0; padding: 20px 30px; border-left: 4px solid #6366f1; background: #f8fafc; border-radius: 8px; font-style: italic; }.manual-quote .quote-author { font-size: 9pt; font-weight: 600; color: #6366f1; text-align: right; margin-top: 12px; font-style: normal; }.manual-blessing { text-align: center; margin-top: 40px; padding: 30px; background: #f8fafc; border-radius: 16px; }@media print { body { padding: 0; } }</style></head><body>' + manualH®L + '</body></h®l>'); printWindow.document.close(); setTimeout(() => printWindow.print(), 500); }
    } // FIM DA CLASSE
    // ===== INSTANCIAÇÃO GLOBAL =====
    window.smartwallet = new SmartWallet();

    // ===== SELEÇÃO DE TIPO (DESPESA/RECEITA) =====
    window.selectTransactionType = function(t) {
        smartwallet.currentTransactionType = t;
        document.querySelectorAll('#transactionForm .type-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-type') === t;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', isActive);
        });
        smartwallet.filterCategoriesByType('category', t);
    };

    window.selectEditType = function(t) {
        smartwallet.currentEditType = t;
        document.querySelectorAll('#editForm .type-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-type') === t;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', isActive);
        });
        smartwallet.filterCategoriesByType('editCategory', t);
    };

    // ===== AÇÕES DO DASHBOARD =====
    window.dashboardAction = function(action) {
        const typeFilter = document.getElementById('typeFilter');
        const statusFilter = document.getElementById('statusFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const accountFilter = document.getElementById('accountFilter');
        const searchFilter = document.getElementById('searchFilter');
        
        document.querySelectorAll('.card.clickable').forEach(c => c.classList.remove('active-filter'));
        
        switch(action) {
            case 'accounts':
                openAccountsModal();
                break;
            case 'income':
                if (typeFilter) typeFilter.value = 'income';
                if (statusFilter) statusFilter.value = '';
                if (categoryFilter) categoryFilter.value = '';
                if (accountFilter) accountFilter.value = '';
                if (searchFilter) searchFilter.value = '';
                smartwallet.clearCache();
                smartwallet.render();
                smartwallet.saveFilters();
                document.querySelectorAll('.card.clickable')[1].classList.add('active-filter');
                scrollToTransactions();
                break;
            case 'expense':
                if (typeFilter) typeFilter.value = 'expense';
                if (statusFilter) statusFilter.value = '';
                if (categoryFilter) categoryFilter.value = '';
                if (accountFilter) accountFilter.value = '';
                if (searchFilter) searchFilter.value = '';
                smartwallet.clearCache();
                smartwallet.render();
                smartwallet.saveFilters();
                document.querySelectorAll('.card.clickable')[2].classList.add('active-filter');
                scrollToTransactions();
                break;
            case 'cards':
                openCreditCardsModal();
                break;
        }
    };

    function scrollToTransactions() {
        const section = document.querySelector('.transactions-section');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ===== NAVEGAÇÃO DE MÊS NO MODAL CARTÕES =====
    window.changeCardMonth = function(delta) {
        smartwallet.cardModalMonth.se®onth(smartwallet.cardModalMonth.ge®onth() + delta);
        smartwallet.renderCreditCardsList();
    };

    window.changeCardMonthToToday = function() {
        smartwallet.cardModalMonth = new Date();
        smartwallet.cardModalMonth.setDate(1);
        smartwallet.renderCreditCardsList();
    };

    window.updateCardMonthLabel = function() {
        const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        const label = document.getElementById('cardMonthLabel');
        if (label) label.textContent = months[smartwallet.cardModalMonth.ge®onth()] + ' ' + smartwallet.cardModalMonth.getFullYear();
    };

    // ===== MODAL OPENERS & CLOSERS =====
    window.openNewTransactionModal = function() {
        smartwallet.setDefaultDate();
        smartwallet.currentTransactionType = 'expense';
        document.querySelectorAll('#transactionForm .type-btn').forEach(btn => {
            const isExpense = btn.getAttribute('data-type') === 'expense';
            btn.classList.toggle('active', isExpense);
            btn.setAttribute('aria-checked', isExpense);
        });
        smartwallet.populateCategorySelects();
        smartwallet.populatePaymen®ethodSelects();
        smartwallet.populateAccountSelects();
        document.getElementById('newTransactionModal').classList.add('active');
    };
    window.closeNewTransactionModal = function() { document.getElementById('newTransactionModal').classList.remove('active'); smartwallet.clearForm(); };
    window.closeEdi®odal = function() { document.getElementById('edi®odal').classList.remove('active'); smartwallet.currentEditId = null; };
    window.openExpor®odal = function() { document.getElementById('expor®odal').classList.add('active'); };
    window.closeExpor®odal = function() { document.getElementById('expor®odal').classList.remove('active'); };
    window.openGoalModal = function() { document.getElementById('goalModal').classList.add('active'); };
    window.closeGoalModal = function() { document.getElementById('goalModal').classList.remove('active'); };
    
    window.openImportCsvModal = function() { 
        window._pendingCsvData = null; 
        document.getElementById('csvFileInput').value = ''; 
        document.getElementById('csvFileName').textContent = 'Clique para selecionar'; 
        document.getElementById('csvReplaceData').checked = false; 
        document.getElementById('importCsvModal').classList.add('active'); 
        document.getElementById('mainMenu').classList.remove('active'); 
    };
    window.closeImportCsvModal = function() { document.getElementById('importCsvModal').classList.remove('active'); };
    
    window.openImportBackupModal = function() { 
        window._pendingBackupData = null; 
        document.getElementById('backupFileInput').value = ''; 
        document.getElementById('backupFileName').textContent = 'Clique para selecionar'; 
        document.getElementById('importBackupModal').classList.add('active'); 
        document.getElementById('mainMenu').classList.remove('active'); 
    };
    window.closeImportBackupModal = function() { document.getElementById('importBackupModal').classList.remove('active'); };
    
    window.openClearDataModal = function() { 
        document.getElementById('clearStep1').style.display = 'block'; 
        document.getElementById('clearStep2').style.display = 'none'; 
        document.getElementById('clearConfirmInput').value = ''; 
        document.getElementById('clearConfirmInput').classList.remove('match'); 
        document.getElementById('finalClearBtn').disabled = true; 
        document.getElementById('finalClearBtn').style.opacity = '0.5'; 
        document.getElementById('clearDataModal').classList.add('active'); 
        document.getElementById('mainMenu').classList.remove('active'); 
    };
    window.closeClearDataModal = function() { document.getElementById('clearDataModal').classList.remove('active'); };
    
    window.openAccountsModal = function() { smartwallet.renderAccountsList(); document.getElementById('accountsModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeAccountsModal = function() { document.getElementById('accountsModal').classList.remove('active'); };
    window.openNewAccoun®odal = function() { document.getElementById('accountEditId').value = ''; document.getElementById('accountForm').reset(); document.getElementById('accountColor').value = '#6366f1'; document.getElementById('newAccountTitle').textContent = 'Nova Conta'; document.getElementById('newAccoun®odal').classList.add('active'); };
    window.closeNewAccoun®odal = function() { document.getElementById('newAccoun®odal').classList.remove('active'); };
    
    window.openCreditCardsModal = function() { 
        smartwallet.cardModalMonth = new Date(smartwallet.curren®onth); 
        smartwallet.renderCreditCardsList(); 
        document.getElementById('creditCardsModal').classList.add('active'); 
        document.getElementById('mainMenu').classList.remove('active'); 
    };
    window.closeCreditCardsModal = function() { document.getElementById('creditCardsModal').classList.remove('active'); };
    window.openNewCardModal = function() { document.getElementById('cardEditId').value = ''; document.getElementById('cardForm').reset(); document.getElementById('cardClosingDay').value = 20; document.getElementById('cardDueDay').value = 27; document.getElementById('cardColor').value = '#6366f1'; document.getElementById('newCardTitle').textContent = 'Novo Cartão'; document.getElementById('newCardModal').classList.add('active'); };
    window.closeNewCardModal = function() { document.getElementById('newCardModal').classList.remove('active'); };
    
    window.openInvoiceModal = function(cardId) { smartwallet.openInvoice(cardId); };
    window.closeInvoiceModal = function() { document.getElementById('invoiceModal').classList.remove('active'); };
    
    window.openBillsModal = function() { smartwallet.renderBillsModal(); document.getElementById('billsModal').classList.add('active'); };
    window.closeBillsModal = function() { document.getElementById('billsModal').classList.remove('active'); };
    
    window.openInves®entsModal = function() { smartwallet.renderInves®entsModal(); document.getElementById('inves®entsModal').classList.add('active'); document.getElementById('infoMenu').classList.remove('active'); };
    window.closeInves®entsModal = function() { document.getElementById('inves®entsModal').classList.remove('active'); };
    window.openNewInves®en®odal = function() { document.getElementById('inves®entEditId').value = ''; document.getElementById('inves®entForm').reset(); document.getElementById('inves®entDate').value = new Date().toISOString().split('T')[0]; document.getElementById('newInves®entTitle').textContent = 'Nova Aplicação'; document.getElementById('newInves®en®odal').classList.add('active'); };
    window.closeNewInves®en®odal = function() { document.getElementById('newInves®en®odal').classList.remove('active'); };
    window.closeUpdateInves®en®odal = function() { document.getElementById('updateInves®en®odal').classList.remove('active'); };
    
    window.openManualModal = function() { document.getElementById('manualContent').innerH®L = manualH®L; document.getElementById('manualModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeManualModal = function() { document.getElementById('manualModal').classList.remove('active'); };
    window.openTermsModal = function() { document.getElementById('disclaimerModal').classList.add('active'); initDisclaimer(); document.getElementById('mainMenu').classList.remove('active'); };
    window.openThanksModal = function() { document.getElementById('thanksModal').classList.add('active'); document.getElementById('mainMenu').classList.remove('active'); };
    window.closeThanksModal = function() { document.getElementById('thanksModal').classList.remove('active'); };

    // ===== TOGGLES =====
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

    // ===== FILE HANDLERS =====
    window.handleCsvFileSelect = function(event) {
        const file = event.target.files[0]; 
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.csv')) { 
            alert('⚠️ Selecione um arquivo .csv'); 
            event.target.value = ''; 
            return; 
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('⚠️ Arquivo muito grande (máx 10MB)');
            event.target.value = '';
            return;
        }
        document.getElementById('csvFileName').textContent = '📄 ' + file.name + ' (' + (file.size/1024).toFixed(1) + ' KB)';
        const reader = new FileReader();
        reader.onload = (e) => { window._pendingCsvData = e.target.result; };
        reader.onerror = () => { alert('❌ Erro ao ler arquivo'); event.target.value = ''; };
        reader.readAsText(file, 'UTF-8');
    };

    window.handleBackupFileSelect = function(event) {
        const file = event.target.files[0]; 
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.json')) { 
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
        const reader = new FileReader();
        reader.onload = (e) => {
            try { 
                JSON.parse(e.target.result); 
                window._pendingBackupData = e.target.result; 
                smartwallet.showToast('✅ Arquivo carregado!'); 
            }
            catch (error) { 
                alert('❌ JSON inválido: ' + error.message); 
                event.target.value = ''; 
                window._pendingBackupData = null; 
            }
        };
        reader.onerror = () => { alert('❌ Erro ao ler arquivo'); event.target.value = ''; };
        reader.readAsText(file, 'UTF-8');
    };

    // ===== CLEAR DATA HELPERS =====
    window.showClearStep2 = function() { 
        document.getElementById('clearStep1').style.display = 'none'; 
        document.getElementById('clearStep2').style.display = 'block'; 
        setTimeout(() => document.getElementById('clearConfirmInput').focus(), 100); 
    };
    window.checkClearConfirm = function() { 
        const input = document.getElementById('clearConfirmInput'); 
        const btn = document.getElementById('finalClearBtn'); 
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
    window.copyPixKey = function() { 
        const key = document.getElementById('pixKey').textContent; 
        navigator.clipboard.writeText(key)
            .then(() => smartwallet.showToast('✅ Chave PIX copiada!'))
            .catch(() => smartwallet.showToast('❌ Copie manualmente: ' + key)); 
    };

    // ===== FLUXO INICIAL (SPLASH -> DISCLAIMER -> QUOTE -> APP) =====
    function initDisclaimer() {
        let countdown = 12;
        const timerEl = document.getElementById('disclaimerTimer');
        const btnEl = document.getElementById('acceptDisclaimerBtn');
        if (!timerEl || !btnEl) return;
        btnEl.classList.remove('enabled'); 
        btnEl.disabled = true;
        timerEl.innerH®L = '⏱️ Aguarde <span id="countdown">' + countdown + '</span> segundos';
        const interval = setInterval(() => {
            countdown--;
            const span = document.getElementById('countdown');
            if (span) span.textContent = countdown;
            if (countdown <= 0) { 
                clearInterval(interval); 
                btnEl.classList.add('enabled'); 
                btnEl.disabled = false; 
                timerEl.innerH®L = '✅ Pode aceitar os termos'; 
            }
        }, 1000);
    }

    function showQuoteModal() {
        const quote = FINANCIAL_QUOTES[Math.floor(Math.random() * FINANCIAL_QUOTES.length)];
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const quoteModal = document.getElementById('quoteModal');
        if (quoteText) quoteText.textContent = '"' + quote.text + '"';
        if (quoteAuthor) quoteAuthor.textContent = '— ' + quote.author;
        if (quoteModal) {
            quoteModal.style.display = 'flex';
            quoteModal.classList.add('active');
        }
    }

    window.acceptDisclaimer = function() {
        const btn = document.getElementById('acceptDisclaimerBtn');
        if (!btn || !btn.classList.contains('enabled')) return;
        localStorage.setItem('smartwallet_disclaimer_accepted', 'true');
        const disclaimer = document.getElementById('disclaimerModal');
        const splash = document.getElementById('splashScreen');
        if (disclaimer) {
            disclaimer.classList.add('disintegrating');
            setTimeout(() => {
                disclaimer.classList.remove('active', 'disintegrating');
                disclaimer.style.display = 'none';
                if (splash) {
                    splash.classList.add('fade-out');
                    setTimeout(() => {
                        splash.style.display = 'none';
                        setTimeout(showQuoteModal, 300);
                    }, 800);
                } else { 
                    setTimeout(showQuoteModal, 300); 
                }
            }, 600);
        }
    };

    window.startApp = function() {
        const quote = document.getElementById('quoteModal');
        const main = document.getElementById('mainApp');
        const fab = document.getElementById('fabBtn');
        if (quote) { quote.classList.remove('active'); quote.style.display = 'none'; }
        if (main) main.style.display = 'block';
        if (fab) fab.style.display = 'flex';
    };

    function updatePrintDate() {
        const dateEl = document.getElementById('printDate');
        if (dateEl) dateEl.textContent = 'Gerado em: ' + new Date().toLocaleString('pt-BR');
    }

    window.addEventListener('load', () => {
        updatePrintDate();
        const accepted = localStorage.getItem('smartwallet_disclaimer_accepted') === 'true';
        const splash = document.getElementById('splashScreen');
        const disclaimer = document.getElementById('disclaimerModal');
        if (splash) { splash.style.display = 'flex'; splash.classList.remove('fade-out'); }
        setTimeout(() => {
            if (!accepted && disclaimer) {
                disclaimer.classList.add('active');
                disclaimer.style.display = 'flex';
                initDisclaimer();
            } else {
                setTimeout(() => {
                    if (splash) {
                        splash.classList.add('fade-out');
                        setTimeout(() => { splash.style.display = 'none'; showQuoteModal(); }, 800);
                    }
                }, 3000);
            }
        }, 3500);
    });

    // ===== FECHAMENTO DE MENUS AO CLICAR FORA =====
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mainMenu');
        const info = document.getElementById('infoMenu');
        if (!e.target.closest('.menu-btn') && menu && menu.classList.contains('active')) menu.classList.remove('active');
        if (!e.target.closest('.info-btn') && info && info.classList.contains('active')) info.classList.remove('active');
    });

    // ===== ACESSIBILIDADE: ENTER/ESPAÇO NOS CARDS DO DASHBOARD =====
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('clickable') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.target.click();
        }
    });

    // ===== SERVICE WORKER =====
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('[SmartWallet] SW registrado:', reg.scope))
                .catch(err => console.log('[SmartWallet] SW falhou:', err));
        });
    }

    console.log('🎉 Smart Wallet v4.0.1 carregado com sucesso!');
})();
