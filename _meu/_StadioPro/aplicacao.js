// Estado Global da Aplicação
let estadoApp = {
    utilizadorAtual: null,
    eventos: [],
    galeria: [],
    bilhetesUtilizador: [],
    seccaoAtual: 'inicio'
};

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', async () => {
    await carregarDados();
    configurarOuvintesEventos();
    carregarUtilizadorDoArmazenamento();
    renderizarEventos();
    renderizarGaleria();
});

// Carregar dados do ficheiro JSON
async function carregarDados() {
    try {
        const resposta = await fetch('dados.json');
        if (!resposta.ok) {
            throw new Error('Erro ao carregar dados');
        }
        const dados = await resposta.json();
        estadoApp.eventos = dados.eventos || [];
        estadoApp.galeria = dados.galeria || [];
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        // Usar dados fictícios se a procura falhar
        carregarDadosFicticios();
    }
}

// Dados fictícios de reserva
function carregarDadosFicticios() {
    estadoApp.eventos = [
        {
            id: 1,
            titulo: "Clássico do Futebol",
            data: "2025-02-15",
            hora: "20:00",
            localizacao: "Estádio Principal",
            categoria: "futebol",
            imagem: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
            descricao: "Grande clássico entre as maiores equipas da região.",
            capacidade: 50000,
            disponivel: 12000,
            preco: 5000
        },
        {
            id: 2,
            titulo: "Espetáculo de Música ao Vivo",
            data: "2025-02-20",
            hora: "21:00",
            localizacao: "Arena de Eventos",
            categoria: "musica",
            imagem: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop",
            descricao: "Apresentação de artistas internacionais.",
            capacidade: 8000,
            disponivel: 2500,
            preco: 1200
        }
    ];

    estadoApp.galeria = [
        {
            id: 1,
            titulo: "Estádio Iluminado",
            imagem: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
            categoria: "estadio"
        },
        {
            id: 2,
            titulo: "Público Animado",
            imagem: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
            categoria: "publico"
        }
    ];
}

// Lógica do Carrossel
let slideAtual = 0;
let intervaloCarrossel;

function inicializarCarrossel() {
    const slideContainer = document.getElementById('slideContainer');
    if (!slideContainer) return;
    
    const totalSlides = slideContainer.children.length;
    
    window.mudarSlide = function(direcao) {
        slideAtual += direcao;
        
        if (slideAtual >= totalSlides) slideAtual = 0;
        if (slideAtual < 0) slideAtual = totalSlides - 1;
        
        atualizarVistaCarrossel();
        reiniciarIntervalo();
    };
    
    function atualizarVistaCarrossel() {
        slideContainer.style.transform = `translateX(-${slideAtual * 100}%)`;
    }
    
    function iniciarIntervalo() {
        intervaloCarrossel = setInterval(() => {
            mudarSlide(1);
        }, 5000);
    }
    
    function reiniciarIntervalo() {
        clearInterval(intervaloCarrossel);
        iniciarIntervalo();
    }
    
    iniciarIntervalo();
}

document.addEventListener('DOMContentLoaded', inicializarCarrossel);




// Configurar ouvintes de eventos (Event Listeners)
function configurarOuvintesEventos() {
    // Menu Hamburguer Lateral
    const hamburguer = document.getElementById('botaoHamburguer');
    const fecharMenu = document.getElementById('fecharMenu');
    const menuNav = document.getElementById('menuNav');
    const overlayMenu = document.getElementById('overlayMenu');

    function toggleMenu(e) {
        if (e) e.stopPropagation();
        if (!menuNav) return;
        menuNav.classList.toggle('ativo');
        if (overlayMenu) overlayMenu.classList.toggle('ativo');
        document.body.style.overflow = menuNav.classList.contains('ativo') ? 'hidden' : 'auto';
    }

    if (hamburguer) hamburguer.addEventListener('click', toggleMenu);
    if (fecharMenu) fecharMenu.addEventListener('click', toggleMenu);
    if (overlayMenu) overlayMenu.addEventListener('click', toggleMenu);

    // Navegação e Fecho do Menu
    document.querySelectorAll('.link-nav').forEach(link => {
        link.addEventListener('click', (e) => {
            const seccao = link.dataset.seccao;
            
            // Se tiver data-seccao, navegar internamente
            if (seccao) {
                e.preventDefault();
                navegarPara(seccao);
            }
            
            // Fechar o menu lateral se estiver aberto (em mobile)
            // Usamos um pequeno atraso para garantir que a navegação ocorra antes do fecho visual
            if (window.innerWidth <= 768 && menuNav && menuNav.classList.contains('ativo')) {
                setTimeout(() => {
                    menuNav.classList.remove('ativo');
                    if (overlayMenu) overlayMenu.classList.remove('ativo');
                    document.body.style.overflow = 'auto';
                }, 100);
            }
        });
    });

    // Botão de Autenticação
    document.getElementById('botaoAutenticacaoNav').addEventListener('click', (e) => {
        e.preventDefault();
        if (estadoApp.utilizadorAtual) {
            navegarPara('perfil');
        } else {
            abrirModalAutenticacao();
        }
    });

    // Botões de fechar modal
    document.querySelectorAll('.fechar').forEach(botaoFechar => {
        botaoFechar.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('ativo');
        });
    });

    // Fechar modal ao clicar fora dele
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('ativo');
            }
        });
    });

    // Filtros de eventos
    document.getElementById('entradaPesquisa').addEventListener('input', filtrarEventos);
    document.getElementById('filtroCategoria').addEventListener('change', filtrarEventos);
}

// Navegação entre secções
function navegarPara(seccao) {
    // Atualizar secção ativa
    document.querySelectorAll('.seccao').forEach(s => s.classList.remove('ativa'));
    document.getElementById(seccao).classList.add('ativa');

    // Atualizar link de navegação ativo
    document.querySelectorAll('.link-nav').forEach(link => {
        link.classList.remove('ativo');
        if (link.dataset.seccao === seccao) {
            link.classList.add('ativo');
        }
    });

    estadoApp.seccaoAtual = seccao;
    window.scrollTo(0, 0);
}

// Renderizar cartões de eventos
function renderizarEventos() {
    const grelha = document.getElementById('grelhaEventos');
    
    if (estadoApp.eventos.length === 0) {
        grelha.innerHTML = '<div class="estado-vazio"><div class="icone-estado-vazio">📭</div><p>Nenhum evento disponível</p></div>';
        return;
    }

    grelha.innerHTML = estadoApp.eventos.map(evento => `
        <div class="cartao-evento" onclick="abrirDetalheEvento(${evento.id})">
            <img src="${evento.imagem}" alt="${evento.titulo}" class="imagem-evento">
            <div class="conteudo-evento">
                <span class="categoria-evento">${evento.categoria}</span>
                <h3>${evento.titulo}</h3>
                <p class="data-evento">📅 ${formatarData(evento.data)} às ${evento.hora}</p>
                <p class="localizacao-evento">📍 ${evento.localizacao}</p>
                <p class="preco-evento">${evento.preco.toFixed(2)}Kz</p>
                <p class="disponibilidade-evento">${evento.disponivel} bilhetes disponíveis</p>
                <button class="botao botao-primario">Ver Detalhes</button>
            </div>
        </div>
    `).join('');
}

// Renderizar itens da galeria
function renderizarGaleria() {
    const grelha = document.getElementById('grelhaGaleria');
    
    grelha.innerHTML = estadoApp.galeria.map(item => `
        <div class="item-galeria">
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="sobreposicao-galeria">
                <h3>${item.titulo}</h3>
            </div>
        </div>
    `).join('');
}

// Filtrar eventos por pesquisa e categoria
function filtrarEventos() {
    const termoPesquisa = document.getElementById('entradaPesquisa').value.toLowerCase();
    const categoria = document.getElementById('filtroCategoria').value;

    const filtrados = estadoApp.eventos.filter(evento => {
        const correspondePesquisa = evento.titulo.toLowerCase().includes(termoPesquisa) ||
                          evento.localizacao.toLowerCase().includes(termoPesquisa) ||
                          evento.descricao.toLowerCase().includes(termoPesquisa);
        const correspondeCategoria = !categoria || evento.categoria === categoria;
        return correspondePesquisa && correspondeCategoria;
    });

    const grelha = document.getElementById('grelhaEventos');
    
    if (filtrados.length === 0) {
        grelha.innerHTML = '<div class="estado-vazio"><div class="icone-estado-vazio">🔍</div><p>Nenhum evento encontrado</p></div>';
        return;
    }

    grelha.innerHTML = filtrados.map(evento => `
        <div class="cartao-evento" onclick="abrirDetalheEvento(${evento.id})">
            <img src="${evento.imagem}" alt="${evento.titulo}" class="imagem-evento">
            <div class="conteudo-evento">
                <span class="categoria-evento">${evento.categoria}</span>
                <h3>${evento.titulo}</h3>
                <p class="data-evento">📅 ${formatarData(evento.data)} às ${evento.hora}</p>
                <p class="localizacao-evento">📍 ${evento.localizacao}</p>
                <p class="preco-evento">${evento.preco.toFixed(2)}Kz</p>
                <p class="disponibilidade-evento">${evento.disponivel} bilhetes disponíveis</p>
                <button class="botao botao-primario">Ver Detalhes</button>
            </div>
        </div>
    `).join('');
}

// Modal de Autenticação
function abrirModalAutenticacao() {
    document.getElementById('modalAutenticacao').classList.add('ativo');
}

function alternarFormularioAutenticacao(e) {
    e.preventDefault();
    document.getElementById('formularioLogin').classList.toggle('ativo');
    document.getElementById('formularioRegisto').classList.toggle('ativo');
}

function processarLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const palavraPasse = e.target.querySelector('input[type="password"]').value;

    // Exceção para Admin
    if (email === 'admin@stadiopro.com' && palavraPasse === 'admin123') {
        estadoApp.utilizadorAtual = {
            id: 'admin',
            email: email,
            nome: 'Administrador',
            bilhetes: [],
            isAdmin: true
        };
        guardarUtilizadorNoArmazenamento();
        atualizarInterfaceAutenticacao();
        document.getElementById('modalAutenticacao').classList.remove('ativo');
        e.target.reset();
        mostrarNotificacao('Bem-vindo, Administrador!');
        return;
    }

    // Validação com localStorage para utilizadores comuns
    const utilizadoresRegistados = JSON.parse(localStorage.getItem('utilizadores')) || [];
    const utilizadorEncontrado = utilizadoresRegistados.find(u => u.email === email && u.palavraPasse === palavraPasse);

    if (utilizadorEncontrado) {
        estadoApp.utilizadorAtual = {
            id: utilizadorEncontrado.id,
            email: utilizadorEncontrado.email,
            nome: utilizadorEncontrado.nome,
            bilhetes: utilizadorEncontrado.bilhetes || []
        };
        guardarUtilizadorNoArmazenamento();
        atualizarInterfaceAutenticacao();
        document.getElementById('modalAutenticacao').classList.remove('ativo');
        e.target.reset();
        mostrarNotificacao('Login realizado com sucesso!');
    } else {
        mostrarNotificacao('E-mail ou palavra-passe incorretos!', 'error');
    }
}

function processarRegisto(e) {
    e.preventDefault();
    const nome = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const palavraPasse = e.target.querySelectorAll('input[type="password"]')[0].value;
    const confirmarPalavraPasse = e.target.querySelectorAll('input[type="password"]')[1].value;

    if (palavraPasse !== confirmarPalavraPasse) {
        mostrarNotificacao('As palavras-passe não coincidem!', 'error');
        return;
    }

    if (nome && email && palavraPasse) {
        const utilizadoresRegistados = JSON.parse(localStorage.getItem('utilizadores')) || [];
        
        // Verificar se o e-mail já existe
        if (utilizadoresRegistados.some(u => u.email === email)) {
            mostrarNotificacao('Este e-mail já está registado!', 'error');
            return;
        }

        const novoUtilizador = {
            id: Date.now(),
            nome: nome,
            email: email,
            palavraPasse: palavraPasse,
            bilhetes: []
        };

        utilizadoresRegistados.push(novoUtilizador);
        localStorage.setItem('utilizadores', JSON.stringify(utilizadoresRegistados));

        estadoApp.utilizadorAtual = {
            id: novoUtilizador.id,
            email: novoUtilizador.email,
            nome: novoUtilizador.nome,
            bilhetes: []
        };
        
        guardarUtilizadorNoArmazenamento();
        atualizarInterfaceAutenticacao();
        document.getElementById('modalAutenticacao').classList.remove('ativo');
        e.target.reset();
        mostrarNotificacao('Registo realizado com sucesso!');
    }
}

function atualizarInterfaceAutenticacao() {
    const botaoAutenticacao = document.getElementById('botaoAutenticacaoNav');
    const itemNavPerfil = document.getElementById('itemNavPerfil');
    const itemNavSair = document.getElementById('itemNavSair');
    const itemNavAdmin = document.getElementById('itemNavAdmin');

    if (estadoApp.utilizadorAtual) {
        botaoAutenticacao.textContent = `👤 ${estadoApp.utilizadorAtual.nome}`;
        if (itemNavPerfil) itemNavPerfil.style.display = 'block';
        if (itemNavSair) itemNavSair.style.display = 'block';
        if (itemNavAdmin) itemNavAdmin.style.display = estadoApp.utilizadorAtual.isAdmin ? 'block' : 'none';
        renderizarSeccaoPerfil();
    } else {
        botaoAutenticacao.textContent = 'Login';
        if (itemNavPerfil) itemNavPerfil.style.display = 'none';
        if (itemNavSair) itemNavSair.style.display = 'none';
        if (itemNavAdmin) itemNavAdmin.style.display = 'none';
        
        const seccaoPerfil = document.getElementById('seccaoConteudoPerfil');
        if (seccaoPerfil) {
            seccaoPerfil.innerHTML = `
                <div class="estado-vazio">
                    <p>Por favor, faça login para ver o seu perfil.</p>
                    <button class="botao botao-primario" onclick="abrirModalAutenticacao()">Fazer Login</button>
                </div>
            `;
        }
    }
}

function renderizarSeccaoPerfil() {
    const contentor = document.getElementById('seccaoConteudoPerfil');
    if (!contentor || !estadoApp.utilizadorAtual) return;

    const iniciais = estadoApp.utilizadorAtual.nome.charAt(0).toUpperCase();
    const totalComprados = estadoApp.utilizadorAtual.bilhetes.length;
    const totalGasto = estadoApp.utilizadorAtual.bilhetes.reduce((acc, b) => acc + (b.preco || 0), 0);

    const bilhetesHTML = totalComprados > 0
        ? estadoApp.utilizadorAtual.bilhetes.map(bilhete => `
            <div class="cartao-bilhete">
                <div class="info-bilhete-texto">
                    <h5>${bilhete.tituloEvento}</h5>
                    <p>📅 ${bilhete.dataCompra || formatarData(bilhete.data)}</p>
                    <p>🎫 ID: ${bilhete.id}</p>
                </div>
                <div class="info-bilhete-preco">
                    <span>${(bilhete.preco || 0).toFixed(2)}Kz</span>
                </div>
            </div>
        `).join('')
        : '<div class="estado-vazio-perfil"><p>Ainda não possui bilhetes.</p></div>';

    contentor.innerHTML = `
        <div class="layout-perfil-seccao">
            <div class="perfil-lateral">
                <div class="avatar-perfil-grande">${iniciais}</div>
                <h3>${estadoApp.utilizadorAtual.nome}</h3>
                <p>${estadoApp.utilizadorAtual.email}</p>
                ${estadoApp.utilizadorAtual.isAdmin ? '<span class="badge-admin">Administrador</span>' : ''}
                
                <div class="estatisticas-perfil-v2">
                    <div class="estat-item">
                        <strong>${totalComprados}</strong>
                        <span>Bilhetes</span>
                    </div>
                    <div class="estat-item">
                        <strong>${totalGasto.toLocaleString()} Kz</strong>
                        <span>Total Gasto</span>
                    </div>
                </div>
            </div>
            <div class="perfil-principal">
                <h4>Os Meus Bilhetes</h4>
                <div class="lista-bilhetes-v2">
                    ${bilhetesHTML}
                </div>
            </div>
        </div>
    `;
}

// Função para abrir o perfil (agora navega para a secção)
function abrirModalPerfil() {
    navegarPara('perfil');
}

function terminarSessao() {
    estadoApp.utilizadorAtual = null;
    localStorage.removeItem('utilizadorAtual');
    atualizarInterfaceAutenticacao();
    const modalPerfil = document.getElementById('modalPerfil');
    if (modalPerfil) modalPerfil.classList.remove('ativo');
    navegarPara('inicio');
    mostrarNotificacao('Sessão terminada!');
}

// Modal de Detalhes do Evento
function abrirDetalheEvento(idEvento) {
    if (!estadoApp.utilizadorAtual) {
        mostrarNotificacao('Faça login para comprar bilhetes!', 'warning');
        abrirModalAutenticacao();
        return;
    }

    const evento = estadoApp.eventos.find(e => e.id === idEvento);
    if (!evento) return;

    const modal = document.getElementById('modalDetalheEvento');
    const conteudo = document.getElementById('conteudoDetalheEvento');

    conteudo.innerHTML = `
        <div class="detalhe-evento">
            <div class="imagem-detalhe-evento">
                <img src="${evento.imagem}" alt="${evento.titulo}">
            </div>
            <div class="conteudo-detalhe-evento">
                <h2>${evento.titulo}</h2>
                <div class="info-detalhe-evento">
                    <p><strong>📅 Data:</strong> ${formatarData(evento.data)}</p>
                    <p><strong>🕐 Horário:</strong> ${evento.hora}</p>
                    <p><strong>📍 Local:</strong> ${evento.localizacao}</p>
                    <p><strong>🏟️ Capacidade:</strong> ${evento.capacidade.toLocaleString()} pessoas</p>
                    <p><strong>🎫 Disponíveis:</strong> ${evento.disponivel} bilhetes</p>
                </div>
                <div class="descricao-detalhe-evento">
                    <p>${evento.descricao}</p>
                </div>
                <div class="preco-detalhe-evento">${evento.preco.toFixed(2)}Kz</div>
                <button class="botao botao-primario" onclick="comprarBilhete(${evento.id})">Comprar Bilhete</button>
            </div>
        </div>
    `;

    modal.classList.add('ativo');
}

function comprarBilhete(idEvento) {
    const evento = estadoApp.eventos.find(e => e.id === idEvento);
    if (!evento) return;

    if (evento.disponivel <= 0) {
        mostrarNotificacao('Bilhetes esgotados!', 'error');
        return;
    }

    const bilhete = {
        id: Date.now(),
        idEvento: evento.id,
        tituloEvento: evento.titulo,
        data: evento.data,
        hora: evento.hora,
        localizacao: evento.localizacao,
        preco: evento.preco,
        dataCompra: new Date().toLocaleDateString('pt-PT')
    };

    estadoApp.utilizadorAtual.bilhetes.push(bilhete);
    evento.disponivel--;

    // Persistir no localStorage global de utilizadores se não for admin
    if (!estadoApp.utilizadorAtual.isAdmin) {
        const utilizadoresRegistados = JSON.parse(localStorage.getItem('utilizadores')) || [];
        const index = utilizadoresRegistados.findIndex(u => u.id === estadoApp.utilizadorAtual.id);
        if (index !== -1) {
            utilizadoresRegistados[index].bilhetes = estadoApp.utilizadorAtual.bilhetes;
            localStorage.setItem('utilizadores', JSON.stringify(utilizadoresRegistados));
        }
    }

    guardarUtilizadorNoArmazenamento();
    document.getElementById('modalDetalheEvento').classList.remove('ativo');
    mostrarNotificacao(`Bilhete comprado com sucesso! O seu número de bilhete é #${bilhete.id}`);
}

// Funções de Armazenamento (Storage)
function guardarUtilizadorNoArmazenamento() {
    localStorage.setItem('utilizadorAtual', JSON.stringify(estadoApp.utilizadorAtual));
}

function carregarUtilizadorDoArmazenamento() {
    const utilizador = localStorage.getItem('utilizadorAtual');
    if (utilizador) {
        estadoApp.utilizadorAtual = JSON.parse(utilizador);
        atualizarInterfaceAutenticacao();
    }
}

// Funções Utilitárias
function formatarData(stringData) {
    const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(stringData).toLocaleDateString('pt-PT', opcoes);
}

function mostrarNotificacao(mensagem, tipo = 'success') {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${tipo === 'error' ? '#c70a06' : tipo === 'warning' ? '#fff06f' : '#4CAF50'};
        color: ${tipo === 'warning' ? '#000' : '#fff'};
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: deslizarDaDireita 0.3s ease;
    `;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.animation = 'deslizarParaDireita 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Adicionar estilos de animação
const estilo = document.createElement('style');
estilo.textContent = `
    @keyframes deslizarDaDireita {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes deslizarParaDireita {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(estilo);

// ============================================
// LÓGICA DE ADMINISTRAÇÃO E DASHBOARD
// ============================================

// Estender o estado global para incluir vendas globais (simuladas no localStorage)
function obterVendasGlobais() {
    const vendas = localStorage.getItem('vendasGlobais');
    return vendas ? JSON.parse(vendas) : [];
}

function registarVendaGlobal(bilhete, utilizadorNome) {
    const vendas = obterVendasGlobais();
    vendas.push({
        ...bilhete,
        utilizador: utilizadorNome
    });
    localStorage.setItem('vendasGlobais', JSON.stringify(vendas));
}

// Atualizar a função comprarBilhete original para registar vendas globais
const comprarBilheteOriginal = comprarBilhete;
comprarBilhete = function(idEvento) {
    const evento = estadoApp.eventos.find(e => e.id === idEvento);
    if (!evento || evento.disponivel <= 0) {
        comprarBilheteOriginal(idEvento);
        return;
    }

    // Capturar o estado antes da compra para saber se foi bem sucedida
    const totalBilhetesAntes = estadoApp.utilizadorAtual.bilhetes.length;
    
    comprarBilheteOriginal(idEvento);
    
    // Se o número de bilhetes aumentou, a compra foi bem sucedida
    if (estadoApp.utilizadorAtual.bilhetes.length > totalBilhetesAntes) {
        const novoBilhete = estadoApp.utilizadorAtual.bilhetes[estadoApp.utilizadorAtual.bilhetes.length - 1];
        registarVendaGlobal(novoBilhete, estadoApp.utilizadorAtual.nome);
        
        // Se estivermos na secção admin, atualizar o dashboard
        if (estadoApp.seccaoAtual === 'admin') {
            renderizarDashboardAdmin();
        }
    }
};

// Função para verificar se o utilizador é admin
function verificarAdmin() {
    if (estadoApp.utilizadorAtual && (estadoApp.utilizadorAtual.email === 'admin@stadiopro.com' || estadoApp.utilizadorAtual.isAdmin)) {
        document.getElementById('itemNavAdmin').style.display = 'block';
        return true;
    }
    document.getElementById('itemNavAdmin').style.display = 'none';
    return false;
}

// Atualizar interface de autenticação para incluir verificação de admin
const atualizarInterfaceAutenticacaoOriginal = atualizarInterfaceAutenticacao;
atualizarInterfaceAutenticacao = function() {
    atualizarInterfaceAutenticacaoOriginal();
    verificarAdmin();
};

// Lógica do Dashboard Admin
function renderizarDashboardAdmin() {
    const vendas = obterVendasGlobais();
    const totalVendidos = vendas.length;
    const receita = vendas.reduce((acc, v) => acc + v.preco, 0);
    
    // Simular total de utilizadores (baseado no localStorage ou fixo)
    const totalUsers = 124; // Valor simulado para o dashboard

    document.getElementById('totalBilhetesVendidos').textContent = totalVendidos;
    document.getElementById('receitaTotal').textContent = receita.toFixed(2) + 'Kz';
    document.getElementById('totalUtilizadores').textContent = totalUsers;

    const corpoTabela = document.querySelector('#tabelaVendasAdmin tbody');
    if (vendas.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhuma venda registada.</td></tr>';
    } else {
        corpoTabela.innerHTML = vendas.slice().reverse().map(venda => `
            <tr>
                <td>#${venda.id}</td>
                <td>${venda.tituloEvento}</td>
                <td>${venda.utilizador}</td>
                <td>${venda.dataCompra}</td>
                <td>${venda.preco.toFixed(2)}Kz</td>
            </tr>
        `).join('');
    }
}

// Modificar navegarPara para carregar dashboard se for admin
const navegarParaOriginal = navegarPara;
navegarPara = function(seccao) {
    if (seccao === 'admin' && !verificarAdmin()) {
        mostrarNotificacao('Acesso restrito a administradores!', 'error');
        navegarParaOriginal('inicio');
        return;
    }
    
    navegarParaOriginal(seccao);
    
    if (seccao === 'admin') {
        renderizarDashboardAdmin();
    }
};

// Função de perfil simplificada para navegação direta
abrirModalPerfil = function() {
    navegarPara('perfil');
};

// Adicionar credenciais de admin para teste fácil
console.log('Dica: Use admin@stadiopro.com para aceder ao painel de administração.');
