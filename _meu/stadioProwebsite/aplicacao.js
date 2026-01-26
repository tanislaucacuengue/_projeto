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
            preco: 50
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
            preco: 120
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

// Configurar ouvintes de eventos (Event Listeners)
function configurarOuvintesEventos() {
    // Navegação
    document.querySelectorAll('.link-nav').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.seccao) {
                e.preventDefault();
                navegarPara(link.dataset.seccao);
            }
        });
    });

    // Menu Hamburguer
    const hamburguer = document.querySelector('.hamburguer');
    const menuNav = document.querySelector('.menu-nav');
    hamburguer.addEventListener('click', () => {
        menuNav.classList.toggle('ativo');
    });

    // Fechar menu ao clicar num link
    document.querySelectorAll('.link-nav').forEach(link => {
        link.addEventListener('click', () => {
            menuNav.classList.remove('ativo');
        });
    });

    // Botão de Autenticação
    document.getElementById('botaoAutenticacaoNav').addEventListener('click', (e) => {
        e.preventDefault();
        if (estadoApp.utilizadorAtual) {
            abrirModalPerfil();
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
                <p class="preco-evento">${evento.preco.toFixed(2)}€</p>
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
                <p class="preco-evento">${evento.preco.toFixed(2)}€</p>
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

    if (email && palavraPasse) {
        estadoApp.utilizadorAtual = {
            id: Date.now(),
            email: email,
            nome: email.split('@')[0],
            bilhetes: []
        };
        guardarUtilizadorNoArmazenamento();
        atualizarInterfaceAutenticacao();
        document.getElementById('modalAutenticacao').classList.remove('ativo');
        e.target.reset();
        mostrarNotificacao('Login realizado com sucesso!');
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
        estadoApp.utilizadorAtual = {
            id: Date.now(),
            nome: nome,
            email: email,
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
    if (estadoApp.utilizadorAtual) {
        botaoAutenticacao.textContent = `👤 ${estadoApp.utilizadorAtual.nome}`;
    } else {
        botaoAutenticacao.textContent = 'Login';
    }
}

// Modal de Perfil
function abrirModalPerfil() {
    const modal = document.getElementById('modalPerfil');
    const conteudo = document.getElementById('conteudoPerfil');

    if (!estadoApp.utilizadorAtual) {
        abrirModalAutenticacao();
        return;
    }

    const bilhetesHTML = estadoApp.utilizadorAtual.bilhetes.length > 0
        ? estadoApp.utilizadorAtual.bilhetes.map(bilhete => `
            <div class="cartao-bilhete">
                <h5>${bilhete.tituloEvento}</h5>
                <p>Data: ${formatarData(bilhete.data)} às ${bilhete.hora}</p>
                <p>Local: ${bilhete.localizacao}</p>
                <p>Bilhete #${bilhete.id}</p>
            </div>
        `).join('')
        : '<p style="color: var(--cor-cinza);">Ainda não possui bilhetes.</p>';

    conteudo.innerHTML = `
        <div class="cabecalho-perfil">
            <div class="avatar-perfil">${estadoApp.utilizadorAtual.nome.charAt(0).toUpperCase()}</div>
            <div class="info-perfil">
                <h3>${estadoApp.utilizadorAtual.nome}</h3>
                <p>${estadoApp.utilizadorAtual.email}</p>
            </div>
        </div>
        <div class="bilhetes-perfil">
            <h4>Os Meus Bilhetes</h4>
            ${bilhetesHTML}
        </div>
        <button class="botao botao-sair" onclick="terminarSessao()">Sair</button>
    `;

    modal.classList.add('ativo');
}

function terminarSessao() {
    estadoApp.utilizadorAtual = null;
    localStorage.removeItem('utilizadorAtual');
    atualizarInterfaceAutenticacao();
    document.getElementById('modalPerfil').classList.remove('ativo');
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
                <div class="preco-detalhe-evento">${evento.preco.toFixed(2)}€</div>
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
