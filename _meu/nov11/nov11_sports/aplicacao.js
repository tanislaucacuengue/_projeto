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
    inicializarControloStock();
    configurarOuvintesEventos();
    carregarUtilizadorDoArmazenamento();
    renderizarEventos();
    renderizarGaleria();
    inicializarCarrossel();
});

// Carregar dados do ficheiro JSON com persistência de stock
async function carregarDados() {
    try {
        // Adicionar um timestamp para evitar cache do browser e garantir dados frescos
        const resposta = await fetch('dados.json?t=' + Date.now());
        
        if (!resposta.ok) {
            throw new Error('Não foi possível aceder ao ficheiro dados.json');
        }
        
        const dados = await resposta.json();
        
        // Validação básica para garantir que o JSON não está vazio
        if (dados && dados.eventos && dados.eventos.length > 0) {
            estadoApp.eventos = dados.eventos;
            estadoApp.galeria = dados.galeria || [];
            console.log('Sucesso: ' + estadoApp.eventos.length + ' eventos carregados do JSON.');
        } else {
            throw new Error('O ficheiro JSON está vazio ou mal estruturado');
        }
    } catch (erro) {
        console.warn('Aviso: A carregar dados fictícios por segurança. Motivo:', erro.message);
        console.info('Dica: Se estiver a abrir o ficheiro index.html diretamente (file://), o browser pode bloquear o carregamento do JSON por segurança. Use um servidor local ou carregue para um alojamento.');
        carregarDadosFicticios();
    }
}

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

function configurarOuvintesEventos() {
    const hamburguer = document.getElementById('botaoHamburguer');
    const menuNav = document.getElementById('menuNav');
    const overlayMenu = document.getElementById('overlayMenu');

    function toggleMenu(e) {
        if (e) e.stopPropagation();
        if (!menuNav) return;
        
        const estaAtivo = menuNav.classList.toggle('ativo');
        if (hamburguer) {
            hamburguer.classList.toggle('ativo');
            hamburguer.setAttribute('aria-expanded', String(estaAtivo));
            hamburguer.setAttribute('aria-label', estaAtivo ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
            // Animação do hambúrguer para X
            const spans = hamburguer.querySelectorAll('span');
            if (estaAtivo) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
        if (overlayMenu) overlayMenu.classList.toggle('ativo');
        
        // Bloquear scroll apenas se o menu estiver aberto
        document.body.style.overflow = estaAtivo ? 'hidden' : 'auto';
    }

    if (hamburguer) hamburguer.addEventListener('click', toggleMenu);
    if (overlayMenu) overlayMenu.addEventListener('click', toggleMenu);

    // Fechar menu automaticamente ao clicar em qualquer link (Início, Eventos, etc.)
    const linksMenu = document.querySelectorAll('.link-nav');
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            if (menuNav && menuNav.classList.contains('ativo')) {
                toggleMenu();
            }
        });
    });

    document.querySelectorAll('.link-nav').forEach(link => {
        link.addEventListener('click', (e) => {
            const seccao = link.dataset.seccao;
            if (seccao) {
                e.preventDefault();
                navegarPara(seccao);
            }
            if (window.innerWidth <= 768 && menuNav && menuNav.classList.contains('ativo')) {
                setTimeout(() => {
                    menuNav.classList.remove('ativo');
                    if (hamburguer) {
                        hamburguer.classList.remove('ativo');
                        hamburguer.setAttribute('aria-expanded', 'false');
                        hamburguer.setAttribute('aria-label', 'Abrir menu de navegação');
                    }
                    if (overlayMenu) overlayMenu.classList.remove('ativo');
                    document.body.style.overflow = 'auto';
                }, 100);
            }
        });
    });

    document.getElementById('botaoAutenticacaoNav').addEventListener('click', (e) => {
        e.preventDefault();
        if (estadoApp.utilizadorAtual) {
            navegarPara('perfil');
        } else {
            abrirModalAutenticacao();
        }
    });

    document.querySelectorAll('.fechar').forEach(botaoFechar => {
        botaoFechar.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('ativo');
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('ativo');
            }
        });
    });

    const focoAnteriorModal = new WeakMap();
    const observadorModais = new MutationObserver(alteracoes => {
        alteracoes.forEach(({ target: modal }) => {
            if (modal.classList.contains('ativo')) {
                focoAnteriorModal.set(modal, document.activeElement);
                modal.querySelector('.fechar')?.focus();
            } else {
                const elementoAnterior = focoAnteriorModal.get(modal);
                if (elementoAnterior && elementoAnterior !== document.body && elementoAnterior.isConnected) {
                    elementoAnterior.focus();
                }
                focoAnteriorModal.delete(modal);
            }
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        observadorModais.observe(modal, { attributes: true, attributeFilter: ['class'] });
    });

    document.addEventListener('keydown', (e) => {
        const modalAtivo = document.querySelector('.modal.ativo');
        if (modalAtivo) {
            if (e.key === 'Escape') {
                modalAtivo.classList.remove('ativo');
                return;
            }
            if (e.key === 'Tab') {
                const selectorFocaveis = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
                const focaveis = Array.from(modalAtivo.querySelectorAll(selectorFocaveis)).filter(elemento => elemento.getClientRects().length > 0);
                if (!focaveis.length) {
                    e.preventDefault();
                    modalAtivo.focus();
                    return;
                }
                const primeiro = focaveis[0];
                const ultimo = focaveis[focaveis.length - 1];
                if (e.shiftKey && (document.activeElement === primeiro || !modalAtivo.contains(document.activeElement))) {
                    e.preventDefault();
                    ultimo.focus();
                } else if (!e.shiftKey && (document.activeElement === ultimo || !modalAtivo.contains(document.activeElement))) {
                    e.preventDefault();
                    primeiro.focus();
                }
            }
        } else if (e.key === 'Escape' && menuNav && menuNav.classList.contains('ativo')) {
            toggleMenu();
        }
    });

    document.getElementById('entradaPesquisa').addEventListener('input', filtrarEventos);
    document.getElementById('filtroCategoria').addEventListener('change', filtrarEventos);
}

function navegarPara(seccao) {
    if (seccao === 'admin' && !verificarAdmin()) {
        mostrarNotificacao('Acesso restrito a administradores!', 'error');
        return;
    }

    document.querySelectorAll('.seccao').forEach(s => s.classList.remove('ativa'));
    const target = document.getElementById(seccao);
    if (target) target.classList.add('ativa');

    document.querySelectorAll('.link-nav').forEach(link => {
        link.classList.remove('ativo');
        if (link.dataset.seccao === seccao) {
            link.classList.add('ativo');
        }
    });

    estadoApp.seccaoAtual = seccao;
    if (seccao === 'admin') renderizarDashboardAdmin();
    if (seccao === 'perfil') renderizarSeccaoPerfil();
    window.scrollTo(0, 0);
}

function renderizarEventos() {
    const grelha = document.getElementById('grelhaEventos');
    if (!grelha) return;
    if (estadoApp.eventos.length === 0) {
        grelha.innerHTML = '<div class="estado-vazio"><div class="icone-estado-vazio"><i class="fas fa-inbox"></i></div><p>Nenhum evento disponível</p></div>';
        return;
    }

    let htmlEventos = estadoApp.eventos.map(evento => `
        <div class="cartao-evento" onclick="abrirDetalheEvento(${evento.id})">
            <img src="${evento.imagem}" alt="${evento.titulo}" class="imagem-evento">
            <div class="conteudo-evento">
                <span class="categoria-evento">${evento.categoria}</span>
                <h3>${evento.titulo}</h3>
                <p class="data-evento"><i class="fas fa-calendar-alt"></i> ${formatarData(evento.data)} às ${evento.hora}</p>
                <p class="localizacao-evento"><i class="fas fa-map-marker-alt"></i> ${evento.localizacao}</p>
                <p class="preco-evento">${evento.preco.toFixed(2)}Kz</p>
                <p class="disponibilidade-evento">${evento.disponivel} bilhetes disponíveis</p>
                <button class="botao botao-primario">Ver Detalhes</button>
            </div>
        </div>
    `).join('');

    // Adicionar CTA de Agendamento se o utilizador estiver logado
    if (estadoApp.utilizadorAtual) {
        htmlEventos += `
            <div class="cartao-cta-agendamento">
                <h3>Quer organizar o seu próprio evento?</h3>
                <p>Agende o nosso estádio para o seu jogo, concerto ou evento especial com toda a infraestrutura profissional do Nov11 Sports.</p>
                <button class="botao-cta" onclick="navegarPara('agendamento')">Agendar Estádio Agora</button>
            </div>
        `;
    }

    grelha.innerHTML = htmlEventos;
}

function renderizarGaleria() {
    const grelha = document.getElementById('grelhaGaleria');
    if (!grelha) return;
    grelha.innerHTML = estadoApp.galeria.map(item => `
        <div class="item-galeria">
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="sobreposicao-galeria">
                <h3>${item.titulo}</h3>
            </div>
        </div>
    `).join('');
}

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
    if (!grelha) return;
    if (filtrados.length === 0) {
        grelha.innerHTML = '<div class="estado-vazio"><div class="icone-estado-vazio"><i class="fas fa-search"></i></div><p>Nenhum evento encontrado</p></div>';
        return;
    }

    let htmlFiltrados = filtrados.map(evento => `
        <div class="cartao-evento" onclick="abrirDetalheEvento(${evento.id})">
            <img src="${evento.imagem}" alt="${evento.titulo}" class="imagem-evento">
            <div class="conteudo-evento">
                <span class="categoria-evento">${evento.categoria}</span>
                <h3>${evento.titulo}</h3>
                <p class="data-evento"><i class="fas fa-calendar-alt"></i> ${formatarData(evento.data)} às ${evento.hora}</p>
                <p class="localizacao-evento"><i class="fas fa-map-marker-alt"></i> ${evento.localizacao}</p>
                <p class="preco-evento">${evento.preco.toFixed(2)}Kz</p>
                <p class="disponibilidade-evento">${evento.disponivel} bilhetes disponíveis</p>
                <button class="botao botao-primario">Ver Detalhes</button>
            </div>
        </div>
    `).join('');

    // Adicionar CTA de Agendamento se o utilizador estiver logado (mesmo em filtros)
    if (estadoApp.utilizadorAtual) {
        htmlFiltrados += `
            <div class="cartao-cta-agendamento">
                <h3>Não encontrou o que procurava?</h3>
                <p>Organize o seu próprio evento! Agende o nosso estádio agora mesmo.</p>
                <button class="botao-cta" onclick="navegarPara('agendamento')">Agendar Estádio</button>
            </div>
        `;
    }

    grelha.innerHTML = htmlFiltrados;
}

function abrirModalAutenticacao() {
    const modal = document.getElementById('modalAutenticacao');
    if (modal) modal.classList.add('ativo');
}

// Funções globais para o HTML
window.alternarFormularioAutenticacao = function(e) {
    if (e) e.preventDefault();
    const formLogin = document.getElementById('formularioLogin');
    const formRegisto = document.getElementById('formularioRegisto');
    if (formLogin && formRegisto) {
        formLogin.classList.toggle('ativo');
        formRegisto.classList.toggle('ativo');
    }
};

window.processarLogin = function(e) {
    if (e) e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const senha = form.querySelector('input[type="password"]').value;

    if (email === 'admin@stadiopro.com' && senha === 'admin123') {
        const admin = { id: 'admin', nome: 'Administrador', email: email, isAdmin: true, bilhetes: [] };
        const users = JSON.parse(localStorage.getItem('utilizadores')) || [];
        const adminExistente = users.find(u => u.email === email);
        if (adminExistente) admin.bilhetes = adminExistente.bilhetes;
        else { users.push(admin); localStorage.setItem('utilizadores', JSON.stringify(users)); }
        
        estadoApp.utilizadorAtual = admin;
        sucessoLogin();
    } else {
        const utilizadores = JSON.parse(localStorage.getItem('utilizadores')) || [];
        const utilizador = utilizadores.find(u => u.email === email && u.senha === senha);
        if (utilizador) {
            estadoApp.utilizadorAtual = utilizador;
            sucessoLogin();
        } else {
            mostrarNotificacao('Credenciais inválidas!', 'error');
        }
    }
};

window.processarRegisto = function(e) {
    if (e) e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const nome = inputs[0].value;
    const email = inputs[1].value;
    const senha = inputs[2].value;
    const confirmarSenha = inputs[3].value;

    if (senha !== confirmarSenha) {
        mostrarNotificacao('As palavras-passe não coincidem!', 'error');
        return;
    }

    const utilizadores = JSON.parse(localStorage.getItem('utilizadores')) || [];
    if (utilizadores.find(u => u.email === email)) {
        mostrarNotificacao('Este email já está registado!', 'error');
        return;
    }

    const novoUtilizador = { id: Date.now(), nome, email, senha, bilhetes: [], isAdmin: false };
    utilizadores.push(novoUtilizador);
    localStorage.setItem('utilizadores', JSON.stringify(utilizadores));
    estadoApp.utilizadorAtual = novoUtilizador;
    sucessoLogin();
};

function sucessoLogin() {
    const modal = document.getElementById('modalAutenticacao');
    if (modal) modal.classList.remove('ativo');
    atualizarInterfaceAutenticacao();
    mostrarNotificacao(`Bem-vindo, ${estadoApp.utilizadorAtual.nome}!`);
    navegarPara('inicio');
}

window.terminarSessao = function() {
    estadoApp.utilizadorAtual = null;
    localStorage.removeItem('utilizadorAtual');
    atualizarInterfaceAutenticacao();
    mostrarNotificacao('Sessão terminada.');
    navegarPara('inicio');
};

function atualizarInterfaceAutenticacao() {
    const botaoAutenticacao = document.getElementById('botaoAutenticacaoNav');
    const itemNavSair = document.getElementById('itemNavSair');
    const itemNavAdmin = document.getElementById('itemNavAdmin');

    if (estadoApp.utilizadorAtual) {
        if (botaoAutenticacao) botaoAutenticacao.innerHTML = `<i class="fas fa-user"></i> ${estadoApp.utilizadorAtual.nome.split(' ')[0]}`;
        if (itemNavSair) itemNavSair.style.display = 'block';
        
        // O itemNavAgendamento foi removido do menu, por isso não precisamos de o gerir aqui
        
        verificarAdmin();
        renderizarSeccaoPerfil();
        renderizarAgendamentosUtilizador();
    } else {
        if (botaoAutenticacao) botaoAutenticacao.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        if (itemNavSair) itemNavSair.style.display = 'none';
        if (itemNavAdmin) itemNavAdmin.style.display = 'none';
        const seccaoPerfil = document.getElementById('seccaoConteudoPerfil');
        if (seccaoPerfil) seccaoPerfil.innerHTML = '<p>Inicie sessão para ver o seu perfil.</p>';
    }
    
    // Atualizar a grelha de eventos para mostrar/esconder o CTA de agendamento
    renderizarEventos();
    
    guardarUtilizadorNoArmazenamento();
}

function renderizarSeccaoPerfil() {
    const conteudo = document.getElementById('seccaoConteudoPerfil');
    if (!conteudo || !estadoApp.utilizadorAtual) return;

    const totalComprados = estadoApp.utilizadorAtual.bilhetes.length;
    const totalGasto = estadoApp.utilizadorAtual.bilhetes.reduce((acc, b) => acc + (b.preco || 0), 0);

    conteudo.innerHTML = `
        <div class="layout-perfil-seccao">
            <div class="perfil-lateral">
                <div class="avatar-perfil-grande">
                    ${estadoApp.utilizadorAtual.nome.charAt(0).toUpperCase()}
                </div>
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
                    ${totalComprados > 0 ? estadoApp.utilizadorAtual.bilhetes.map(bilhete => `
                        <div class="cartao-bilhete">
                            <div class="info-bilhete-texto">
                                <h5>${bilhete.tituloEvento}</h5>
                                <p><i class="fas fa-calendar-alt"></i> ${bilhete.dataCompra || (bilhete.data ? formatarData(bilhete.data) : 'Data não disponível')}</p>
                                <p><i class="fas fa-ticket-alt"></i> ID: ${bilhete.id}</p>
                            </div>
                            <div class="info-bilhete-preco">
                                <span>${(bilhete.preco || 0).toLocaleString()} Kz</span>
                            </div>
                        </div>
                    `).join('') : '<p>Ainda não comprou nenhum bilhete.</p>'}
                </div>

                <h4 style="margin-top: 2.5rem;">O Meu Suporte</h4>
                <div id="listaSuporteUtilizador" class="lista-suporte-utilizador">
                    <p>A carregar as suas mensagens...</p>
                </div>
            </div>
        </div>
    `;
    
    // Disparar a renderização do suporte imediatamente após montar o HTML do perfil
    setTimeout(renderizarSuporteUtilizador, 50);
}

function abrirDetalheEvento(id) {
    const evento = estadoApp.eventos.find(e => e.id === id);
    if (!evento) return;

    const modal = document.getElementById('modalDetalheEvento');
    const conteudo = document.getElementById('conteudoDetalheEvento');

    if (conteudo) {
        conteudo.innerHTML = `
            <div class="detalhe-evento">
                <div class="imagem-detalhe-evento">
                    <img src="${evento.imagem}" alt="${evento.titulo}">
                </div>
                <div class="conteudo-detalhe-evento">
                    <h2>${evento.titulo}</h2>
                    <div class="info-detalhe-evento">
                        <p><strong><i class="fas fa-calendar-alt"></i> Data:</strong> ${formatarData(evento.data)}</p>
                        <p><strong><i class="fas fa-clock"></i> Horário:</strong> ${evento.hora}</p>
                        <p><strong><i class="fas fa-map-marker-alt"></i> Local:</strong> ${evento.localizacao}</p>
                        <p><strong><i class="fas fa-stadium"></i> Capacidade:</strong> ${evento.capacidade.toLocaleString()} pessoas</p>
                        <p><strong><i class="fas fa-ticket-alt"></i> Disponíveis:</strong> ${evento.disponivel} bilhetes</p>
                    </div>
                    <div class="descricao-detalhe-evento">
                        <p>${evento.descricao}</p>
                    </div>
                    <div class="preco-detalhe-evento">${evento.preco.toFixed(2)}Kz</div>
                    <button class="botao botao-primario" onclick="comprarBilhete(${evento.id})">Comprar Bilhete</button>
                </div>
            </div>
        `;
    }
    if (modal) modal.classList.add('ativo');
}

window.comprarBilhete = function(idEvento) {
    if (!estadoApp.utilizadorAtual) {
        mostrarNotificacao('Inicie sessão para comprar bilhetes.', 'warning');
        abrirModalAutenticacao();
        return;
    }

    const evento = estadoApp.eventos.find(e => e.id === idEvento);
    if (!evento || evento.disponivel <= 0) {
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
    
    // Atualizar a persistência de stock global
    localStorage.setItem('eventos_persistentes', JSON.stringify(estadoApp.eventos));

    const utilizadoresRegistados = JSON.parse(localStorage.getItem('utilizadores')) || [];
    const index = utilizadoresRegistados.findIndex(u => u.email === estadoApp.utilizadorAtual.email);
    
    if (index !== -1) {
        utilizadoresRegistados[index].bilhetes = estadoApp.utilizadorAtual.bilhetes;
    } else {
        utilizadoresRegistados.push(estadoApp.utilizadorAtual);
    }
    
    localStorage.setItem('utilizadores', JSON.stringify(utilizadoresRegistados));
    registarVendaGlobal(bilhete, estadoApp.utilizadorAtual.nome);
    guardarUtilizadorNoArmazenamento();
    
    const modal = document.getElementById('modalDetalheEvento');
    if (modal) modal.classList.remove('ativo');
    mostrarNotificacao(`Bilhete comprado com sucesso! ID: #${bilhete.id}`);
    
    setTimeout(() => {
        location.reload();
    }, 1500);
};

function guardarUtilizadorNoArmazenamento() {
    if (estadoApp.utilizadorAtual) {
        localStorage.setItem('utilizadorAtual', JSON.stringify(estadoApp.utilizadorAtual));
    }
}

function carregarUtilizadorDoArmazenamento() {
    const utilizador = localStorage.getItem('utilizadorAtual');
    if (utilizador) {
        estadoApp.utilizadorAtual = JSON.parse(utilizador);
        atualizarInterfaceAutenticacao();
    }
}

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

function obterVendasGlobais() {
    const vendas = localStorage.getItem('vendasGlobais');
    return vendas ? JSON.parse(vendas) : [];
}

function registarVendaGlobal(bilhete, utilizadorNome) {
    const vendas = obterVendasGlobais();
    vendas.push({ ...bilhete, utilizador: utilizadorNome });
    localStorage.setItem('vendasGlobais', JSON.stringify(vendas));
}

function verificarAdmin() {
    if (estadoApp.utilizadorAtual && (estadoApp.utilizadorAtual.email === 'admin@stadiopro.com' || estadoApp.utilizadorAtual.isAdmin)) {
        const item = document.getElementById('itemNavAdmin');
        if (item) item.style.display = 'block';
        return true;
    }
    const item = document.getElementById('itemNavAdmin');
    if (item) item.style.display = 'none';
    return false;
}

function renderizarDashboardAdmin() {
    const vendas = obterVendasGlobais();
    const totalVendidos = vendas.length;
    const receita = vendas.reduce((acc, v) => acc + v.preco, 0);
    const totalUsers = (JSON.parse(localStorage.getItem('utilizadores')) || []).length;

    const elTotal = document.getElementById('totalBilhetesVendidos');
    const elReceita = document.getElementById('receitaTotal');
    const elUsers = document.getElementById('totalUtilizadores');

    if (elTotal) elTotal.textContent = totalVendidos;
    if (elReceita) elReceita.textContent = receita.toFixed(2) + 'Kz';
    if (elUsers) elUsers.textContent = totalUsers;

    const corpoTabela = document.querySelector('#tabelaVendasAdmin tbody');
    if (!corpoTabela) return;
    if (vendas.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhuma venda registada.</td></tr>';
    } else {
        corpoTabela.innerHTML = vendas.slice().reverse().map(venda => `
            <tr>
                <td data-label="ID Bilhete">#${venda.id}</td>
                <td data-label="Evento">${venda.tituloEvento}</td>
                <td data-label="Utilizador">${venda.utilizador}</td>
                <td data-label="Data">${venda.dataCompra}</td>
                <td data-label="Preço">${venda.preco.toFixed(2)}Kz</td>
            </tr>
        `).join('');
    }
}


// ========================================
// FUNCIONALIDADES DE AGENDAMENTO
// ========================================

function inicializarAgendamento() {
    const formulario = document.getElementById('formularioAgendamento');
    if (formulario) {
        formulario.addEventListener('submit', processarAgendamento);
    }
    renderizarAgendamentosUtilizador();
}

function processarAgendamento(evento) {
    evento.preventDefault();

    if (!estadoApp.utilizadorAtual) {
        mostrarNotificacao('Por favor, faça login para agendar o estádio', 'erro');
        abrirModalAutenticacao();
        return;
    }

    const dados = {
        id: Date.now(),
        dataAgendamento: document.getElementById('dataAgendamento').value,
        horaAgendamento: document.getElementById('horaAgendamento').value,
        tipoEvento: document.getElementById('tipoEvento').value,
        nomeEvento: document.getElementById('nomeEvento').value,
        descricaoEvento: document.getElementById('descricaoEvento').value,
        capacidadeEsperada: document.getElementById('capacidadeEsperada').value,
        nomeOrganizador: document.getElementById('nomeOrganizador').value,
        emailOrganizador: document.getElementById('emailOrganizador').value,
        telefonePedido: document.getElementById('telefonePedido').value,
        utilizadorId: estadoApp.utilizadorAtual.id,
        status: 'pendente',
        dataPedido: new Date().toISOString()
    };

    const agendamentos = obterAgendamentos();
    agendamentos.push(dados);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    registarAtividadeLog('Novo pedido de agendamento criado', dados.nomeEvento);
    mostrarNotificacao('Pedido de agendamento enviado com sucesso!', 'sucesso');
    evento.target.reset();
    renderizarAgendamentosUtilizador();
}

function obterAgendamentos() {
    const agendamentos = localStorage.getItem('agendamentos');
    return agendamentos ? JSON.parse(agendamentos) : [];
}

function renderizarAgendamentosUtilizador() {
    const container = document.getElementById('listaAgendamentos');
    if (!container) return;

    if (!estadoApp.utilizadorAtual) {
        container.innerHTML = '<p>Faça login para ver seus pedidos de agendamento</p>';
        return;
    }

    const agendamentos = obterAgendamentos();
    const meuAgendamentos = agendamentos.filter(a => a.utilizadorId === estadoApp.utilizadorAtual.id);

    if (meuAgendamentos.length === 0) {
        container.innerHTML = '<p>Você não tem pedidos de agendamento.</p>';
        return;
    }

    container.innerHTML = meuAgendamentos.map(agendamento => `
        <div class="cartao-agendamento" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px;">
            <h4>${agendamento.nomeEvento}</h4>
            <p><strong>Tipo:</strong> ${agendamento.tipoEvento}</p>
            <p><strong>Data:</strong> ${agendamento.dataAgendamento} às ${agendamento.horaAgendamento}</p>
            <p><strong>Capacidade Esperada:</strong> ${agendamento.capacidadeEsperada} pessoas</p>
            <p><strong>Status:</strong> <span style="padding: 5px 10px; border-radius: 5px; background: ${agendamento.status === 'aprovado' ? '#4CAF50' : agendamento.status === 'recusado' ? '#f44336' : '#FFC107'}; color: white;">${agendamento.status}</span></p>
        </div>
    `).join('');
}

// ========================================
// FUNCIONALIDADES DE ADMIN - CRIAR EVENTO
// ========================================

function inicializarCriarEvento() {
    const formulario = document.getElementById('formularioCriarEvento');
    if (formulario) {
        formulario.addEventListener('submit', processarCriarEvento);
    }
}

function processarCriarEvento(evento) {
    evento.preventDefault();

    const novoEvento = {
        id: estadoApp.eventos.length + 1,
        titulo: document.getElementById('tituloEvento').value,
        data: document.getElementById('dataEvento').value,
        hora: document.getElementById('horaEvento').value,
        localizacao: document.getElementById('localizacaoEvento').value,
        categoria: document.getElementById('categoriaEvento').value,
        descricao: document.getElementById('descricaoEventoAdmin').value,
        capacidade: parseInt(document.getElementById('capacidadeEvento').value),
        disponivel: parseInt(document.getElementById('capacidadeEvento').value),
        preco: parseFloat(document.getElementById('precoEvento').value),
        imagem: document.getElementById('imagemEvento').value
    };

    estadoApp.eventos.push(novoEvento);
    localStorage.setItem('eventos', JSON.stringify(estadoApp.eventos));

    registarAtividadeLog('Novo evento criado', novoEvento.titulo);
    mostrarNotificacao('Evento criado com sucesso!', 'sucesso');
    evento.target.reset();
    renderizarEventos();
}

// ========================================
// FUNCIONALIDADES DE ADMIN - GERIR PEDIDOS
// ========================================

function renderizarPedidosAgendamento() {
    const tabela = document.querySelector('#tabelaPedidosAgendamento tbody');
    if (!tabela) return;

    const agendamentos = obterAgendamentos();

    if (agendamentos.length === 0) {
        tabela.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum pedido de agendamento.</td></tr>';
        return;
    }

    tabela.innerHTML = agendamentos.map(agendamento => `
        <tr>
            <td data-label="ID">#${agendamento.id}</td>
            <td data-label="Organizador">${agendamento.nomeOrganizador}</td>
            <td data-label="Tipo de Evento">${agendamento.tipoEvento}</td>
            <td data-label="Data">${agendamento.dataAgendamento}</td>
            <td data-label="Status"><span style="padding: 5px 10px; border-radius: 5px; background: ${agendamento.status === 'aprovado' ? '#4CAF50' : agendamento.status === 'recusado' ? '#f44336' : '#FFC107'}; color: white;">${agendamento.status}</span></td>
            <td data-label="Ações">
                ${agendamento.status === 'pendente' ? `
                    <button class="botao botao-pequeno" onclick="aceitarPedido(${agendamento.id})">Aceitar</button>
                    <button class="botao botao-pequeno" style="background: #f44336;" onclick="recusarPedido(${agendamento.id})" >Recusar</button>
                ` : `<span style="color: #999;">-</span>`}
            </td>
        </tr>
    `).join('');
}

function aceitarPedido(id) {
    const agendamentos = obterAgendamentos();
    const agendamento = agendamentos.find(a => a.id === id);
    
    if (agendamento) {
        agendamento.status = 'aprovado';
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        registarAtividadeLog('Pedido de agendamento aprovado', agendamento.nomeEvento);
        mostrarNotificacao('Pedido aprovado com sucesso!', 'sucesso');
        renderizarPedidosAgendamento();
        renderizarAgendamentosUtilizador();
    }
}

function recusarPedido(id) {
    const agendamentos = obterAgendamentos();
    const agendamento = agendamentos.find(a => a.id === id);
    
    if (agendamento) {
        agendamento.status = 'recusado';
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        registarAtividadeLog('Pedido de agendamento recusado', agendamento.nomeEvento);
        mostrarNotificacao('Pedido recusado!', 'sucesso');
        renderizarPedidosAgendamento();
        renderizarAgendamentosUtilizador();
    }
}

// ========================================
// FUNCIONALIDADES DE ADMIN - RELATÓRIOS
// ========================================

function gerarRelatorioMensal() {
    const mesInput = document.getElementById('mesRelatorio').value;
    
    if (!mesInput) {
        mostrarNotificacao('Por favor, selecione um mês', 'erro');
        return;
    }

    const [ano, mes] = mesInput.split('-');
    const conteudoRelatorio = document.getElementById('conteudoRelatorio');
    
    const vendas = obterVendasGlobais().filter(v => {
        const dataVenda = new Date(v.dataCompra);
        return dataVenda.getFullYear() === parseInt(ano) && 
               (dataVenda.getMonth() + 1) === parseInt(mes);
    });

    const agendamentos = obterAgendamentos().filter(a => {
        const dataPedido = new Date(a.dataPedido);
        return dataPedido.getFullYear() === parseInt(ano) && 
               (dataPedido.getMonth() + 1) === parseInt(mes);
    });

    const atividades = obterRegistosAtividades().filter(a => {
        const dataAtividade = new Date(a.data);
        return dataAtividade.getFullYear() === parseInt(ano) && 
               (dataAtividade.getMonth() + 1) === parseInt(mes);
    });

    const totalVendas = vendas.length;
    const receitaTotal = vendas.reduce((acc, v) => acc + v.preco, 0);
    const agendamentosAprovados = agendamentos.filter(a => a.status === 'aprovado').length;
    const agendamentosPendentes = agendamentos.filter(a => a.status === 'pendente').length;

    const html = `
        <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <h3>Relatório Mensal - ${mes}/${ano}</h3>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #2196F3;">
                    <h4>Bilhetes Vendidos</h4>
                    <p style="font-size: 24px; font-weight: bold; color: #2196F3;">${totalVendas}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #4CAF50;">
                    <h4>Receita Total</h4>
                    <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${receitaTotal.toFixed(2)} Kz</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #FF9800;">
                    <h4>Agendamentos Aprovados</h4>
                    <p style="font-size: 24px; font-weight: bold; color: #FF9800;">${agendamentosAprovados}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #FFC107;">
                    <h4>Agendamentos Pendentes</h4>
                    <p style="font-size: 24px; font-weight: bold; color: #FFC107;">${agendamentosPendentes}</p>
                </div>
            </div>

            <h4>Atividades Registadas (${atividades.length})</h4>
            <div style="background: white; padding: 15px; border-radius: 8px; max-height: 300px; overflow-y: auto;">
                ${atividades.length > 0 ? atividades.map(a => `
                    <p style="margin: 5px 0; padding: 5px; border-bottom: 1px solid #eee;">
                        <strong>${a.acao}</strong> - ${a.detalhes} <br>
                        <small style="color: #999;">${new Date(a.data).toLocaleString('pt-PT')}</small>
                    </p>
                `).join('') : '<p>Nenhuma atividade registada neste mês.</p>'}
            </div>
        </div>
    `;

    conteudoRelatorio.innerHTML = html;
    conteudoRelatorio.style.display = 'block';
}

function descarregarRelatorioMensal() {
    const mesInput = document.getElementById('mesRelatorio').value;
    
    if (!mesInput) {
        mostrarNotificacao('Por favor, selecione um mês', 'erro');
        return;
    }

    const [ano, mes] = mesInput.split('-');
    const conteudo = document.getElementById('conteudoRelatorio').innerText;

    if (!conteudo || conteudo.trim() === '') {
        mostrarNotificacao('Por favor, gere o relatório primeiro', 'erro');
        return;
    }

    const elemento = document.createElement('a');
    elemento.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(conteudo);
    elemento.download = `Relatorio_${mes}_${ano}.txt`;
    elemento.click();
}

// ========================================
// FUNCIONALIDADES DE LOG DE ATIVIDADES
// ========================================

function registarAtividadeLog(acao, detalhes) {
    const atividades = obterRegistosAtividades();
    atividades.push({
        id: Date.now(),
        acao: acao,
        detalhes: detalhes,
        data: new Date().toISOString(),
        utilizador: estadoApp.utilizadorAtual ? estadoApp.utilizadorAtual.nome : 'Sistema'
    });
    localStorage.setItem('registosAtividades', JSON.stringify(atividades));
}

function obterRegistosAtividades() {
    const registos = localStorage.getItem('registosAtividades');
    return registos ? JSON.parse(registos) : [];
}

// ========================================
// INICIALIZAÇÃO DE ABAS DO ADMIN
// ========================================

function inicializarAbasAdmin() {
    const botoesAbas = document.querySelectorAll('.aba-botao');
    
    botoesAbas.forEach(botao => {
        botao.addEventListener('click', () => {
            const abaAlvo = botao.dataset.aba;
            
            botoesAbas.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');
            
            document.querySelectorAll('.conteudo-aba').forEach(aba => {
                aba.style.display = 'none';
            });
            const dashboardAdmin = document.querySelector('.dashboard-admin');
            if (dashboardAdmin) dashboardAdmin.style.display = 'none';
            
            if (abaAlvo === 'dashboard') {
                if (dashboardAdmin) {
                    dashboardAdmin.style.display = 'block';
                    renderizarDashboardAdmin();
                }
                return;
            }

            const abaElemento = document.getElementById(`aba-${abaAlvo}`) || document.getElementById(abaAlvo);
            if (abaElemento) {
                abaElemento.style.display = 'block';
                
                if (abaAlvo === 'pedidos-agendamento' || abaAlvo === 'pedidos') {
                    renderizarPedidosAgendamento();
                } else if (abaAlvo === 'relatorios') {
                    renderizarRelatorios();
                } else if (abaAlvo === 'suporte-admin' || abaAlvo === 'suporte') {
                    renderizarSuporteAdmin();
                } else if (abaAlvo === 'manutencao') {
                    renderizarManutencao();
                }
            }
        });
    });
}

// Lógica de Manutenção
function renderizarManutencao() {
    const tabela = document.querySelector('#tabelaManutencao tbody');
    if (!tabela) return;

    const registos = JSON.parse(localStorage.getItem('registosManutencao')) || [];
    
    if (registos.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhum registo de manutenção.</td></tr>';
        return;
    }

    tabela.innerHTML = registos.slice().reverse().map(r => `
        <tr>
            <td>${r.data}</td>
            <td style="text-transform: capitalize;">${r.tipo}</td>
            <td>${r.descricao}</td>
            <td>${r.responsavel}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const formManutencao = document.getElementById('formularioManutencao');
    if (formManutencao) {
        formManutencao.addEventListener('submit', (e) => {
            e.preventDefault();
            const tipo = document.getElementById('tipoManutencao').value;
            const descricao = document.getElementById('descricaoManutencao').value;
            const data = document.getElementById('dataManutencao').value;
            const responsavel = estadoApp.utilizadorAtual ? estadoApp.utilizadorAtual.nome : 'Administrador';

            const novoRegisto = { id: Date.now(), tipo, descricao, data, responsavel };
            const registos = JSON.parse(localStorage.getItem('registosManutencao')) || [];
            registos.push(novoRegisto);
            localStorage.setItem('registosManutencao', JSON.stringify(registos));

            mostrarNotificacao('Manutenção registada com sucesso!', 'sucesso');
            formManutencao.reset();
            renderizarManutencao();
            registarAtividadeLog('Registo de Manutenção', `${tipo}: ${descricao}`);
        });
    }
});

// ========================================
// INICIALIZAÇÃO GERAL
// ========================================

// Adicionar inicialização das novas funcionalidades
const inicializacaoOriginal = document.addEventListener;
document.addEventListener('DOMContentLoaded', () => {
    inicializarAgendamento();
    inicializarAbasAdmin();
    inicializarCriarEvento();
});

// ========================================
// LÓGICA DO SISTEMA DE SUPORTE E MENSAGENS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const formContacto = document.getElementById('formularioContactoFooter');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('emailContactoFooter').value;
            const mensagem = document.getElementById('mensagemContactoFooter').value;
            const nome = estadoApp.utilizadorAtual ? estadoApp.utilizadorAtual.nome : 'Visitante';
            const idUtilizador = estadoApp.utilizadorAtual ? estadoApp.utilizadorAtual.id : null;
            
            const novaMensagem = {
                id: Date.now(),
                idUtilizador: idUtilizador,
                nome: nome,
                email: email,
                mensagem: mensagem,
                data: new Date().toLocaleString('pt-PT'),
                status: 'Pendente',
                resposta: ''
            };
            
            // Guardar no localStorage
            const mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
            mensagens.push(novaMensagem);
            localStorage.setItem('mensagensSuporte', JSON.stringify(mensagens));
            
            mostrarNotificacao('Mensagem enviada com sucesso! O administrador responderá em breve.', 'sucesso');
            formContacto.reset();
            
            // Atualizar interfaces se necessário
            if (estadoApp.utilizadorAtual) renderizarSuporteUtilizador();
        });
    }
});

function renderizarSuporteAdmin() {
    const lista = document.getElementById('listaMensagensSuporteAdmin');
    if (!lista) return;
    
    const mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
    
    if (mensagens.length === 0) {
        lista.innerHTML = '<p>Nenhuma mensagem de suporte recebida.</p>';
        return;
    }
    
    lista.innerHTML = mensagens.slice().reverse().map(msg => `
        <div class="cartao-mensagem">
            <div class="cabecalho-mensagem">
                <div class="info-remetente">
                    <strong>${msg.nome}</strong> (${msg.email})
                    <span class="badge-status ${msg.status === 'Pendente' ? 'status-pendente' : 'status-respondido'}">${msg.status}</span>
                </div>
                <span class="data-mensagem">${msg.data}</span>
            </div>
            <div class="corpo-mensagem">${msg.mensagem}</div>
            ${msg.resposta ? `
                <div class="resposta-admin">
                    <strong>Resposta do Administrador:</strong>
                    <p>${msg.resposta}</p>
                </div>
            ` : `
                <div class="formulario-resposta">
                    <textarea id="resposta-${msg.id}" placeholder="Escreva a sua resposta aqui..."></textarea>
                    <button class="botao botao-primario" onclick="responderMensagem(${msg.id})">Enviar Resposta</button>
                </div>
            `}
        </div>
    `).join('');
}

window.responderMensagem = function(id) {
    const textoResposta = document.getElementById(`resposta-${id}`).value;
    if (!textoResposta.trim()) {
        mostrarNotificacao('Por favor, escreva uma resposta.', 'warning');
        return;
    }
    
    const mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
    const index = mensagens.findIndex(m => m.id === id);
    
    if (index !== -1) {
        mensagens[index].resposta = textoResposta;
        mensagens[index].status = 'Respondido';
        localStorage.setItem('mensagensSuporte', JSON.stringify(mensagens));
        mostrarNotificacao('Resposta enviada com sucesso!', 'sucesso');
        renderizarSuporteAdmin();
    }
};

function renderizarSuporteUtilizador() {
    const lista = document.getElementById('listaSuporteUtilizador');
    if (!lista || !estadoApp.utilizadorAtual) return;
    
    const mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
    const minhasMensagens = mensagens.filter(m => m.idUtilizador === estadoApp.utilizadorAtual.id || m.email === estadoApp.utilizadorAtual.email);
    
    if (minhasMensagens.length === 0) {
        lista.innerHTML = '<p>Ainda não enviou nenhuma mensagem de suporte.</p>';
        return;
    }
    
    lista.innerHTML = minhasMensagens.slice().reverse().map(msg => `
        <div class="cartao-mensagem">
            <div class="cabecalho-mensagem">
                <span class="badge-status ${msg.status === 'Pendente' ? 'status-pendente' : 'status-respondido'}">${msg.status}</span>
                <span class="data-mensagem">${msg.data}</span>
            </div>
            <div class="corpo-mensagem">${msg.mensagem}</div>
            ${msg.resposta ? `
                <div class="resposta-admin">
                    <strong>Resposta do Administrador:</strong>
                    <p>${msg.resposta}</p>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// ========================================
// LÓGICA DO BOTÃO VOLTAR AO TOPO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const botaoTopo = document.getElementById('botaoVoltarTopo');
    
    if (botaoTopo) {
        // Mostrar/Ocultar botão baseado no scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                botaoTopo.classList.add('visivel');
            } else {
                botaoTopo.classList.remove('visivel');
            }
        });
        
        // Ação de clique para subir suavemente
        botaoTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
