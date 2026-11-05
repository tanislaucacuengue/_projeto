// ========================================
// EXTENSÕES - CONTROLO DE STOCK, CHAT E REGISTOS
// ========================================

// ========================================
// 1. CONTROLO DE INVENTÁRIO DE BILHETES
// ========================================

/**
 * Inicializar o sistema de controlo de stock
 * Carrega o stock do localStorage ou cria um novo registo baseado em dados.json
 */
function inicializarControloStock() {
    const stockArmazenado = JSON.parse(localStorage.getItem('stockEventos')) || {};
    let houveAlteracao = false;
    
    // Sincronizar stock: Se o evento existe no JSON mas não no stock, adicionamos.
    // Se o evento no JSON tem um ID que já existe no stock, mantemos o stock atual (vendas feitas).
    estadoApp.eventos.forEach(evento => {
        if (stockArmazenado[evento.id] === undefined) {
            stockArmazenado[evento.id] = evento.disponivel;
            houveAlteracao = true;
        }
    });
    
    // Limpeza opcional: remover do stock IDs que já não existem no JSON (opcional, mantemos por segurança)
    
    if (houveAlteracao || !localStorage.getItem('stockEventos')) {
        localStorage.setItem('stockEventos', JSON.stringify(stockArmazenado));
    }
}

/**
 * Obter o stock atual de um evento
 */
function obterStockEvento(idEvento) {
    const stock = JSON.parse(localStorage.getItem('stockEventos')) || {};
    return stock[idEvento] !== undefined ? stock[idEvento] : 0;
}

/**
 * Atualizar o stock de um evento no localStorage
 */
function atualizarStockEvento(idEvento, novoStock) {
    const stock = JSON.parse(localStorage.getItem('stockEventos')) || {};
    stock[idEvento] = Math.max(0, novoStock);
    localStorage.setItem('stockEventos', JSON.stringify(stock));
}

/**
 * Decrementar o stock quando uma compra é realizada
 */
function decrementarStock(idEvento) {
    const stockAtual = obterStockEvento(idEvento);
    if (stockAtual > 0) {
        atualizarStockEvento(idEvento, stockAtual - 1);
        return true;
    }
    return false;
}

/**
 * Verificar se um evento tem stock disponível
 */
function temStockDisponivel(idEvento) {
    return obterStockEvento(idEvento) > 0;
}

/**
 * Renderizar eventos com informações de stock atualizado
 * Substitui a função original para incluir verificação de stock
 */
const renderizarEventosOriginal = renderizarEventos;
window.renderizarEventos = function() {
    const grelha = document.getElementById('grelhaEventos');
    if (!grelha) return;
    if (estadoApp.eventos.length === 0) {
        grelha.innerHTML = '<div class="estado-vazio"><div class="icone-estado-vazio"><i class="fas fa-inbox"></i></div><p>Nenhum evento disponível</p></div>';
        return;
    }

    let htmlEventos = estadoApp.eventos.map(evento => {
        const stockAtual = obterStockEvento(evento.id);
        const esgotado = stockAtual === 0;
        const statusClass = esgotado ? 'evento-esgotado' : '';
        
        return `
            <div class="cartao-evento ${statusClass}" onclick="abrirDetalheEvento(${evento.id})">
                <img src="${evento.imagem}" alt="${evento.titulo}" class="imagem-evento">
                <div class="conteudo-evento">
                    <span class="categoria-evento">${evento.categoria}</span>
                    <h3>${evento.titulo}</h3>
                    <p class="data-evento"><i class="fas fa-calendar-alt"></i> ${formatarData(evento.data)} às ${evento.hora}</p>
                    <p class="localizacao-evento"><i class="fas fa-map-marker-alt"></i> ${evento.localizacao}</p>
                    <p class="preco-evento">${evento.preco.toFixed(2)}Kz</p>
                    <p class="disponibilidade-evento">
                        ${esgotado ? '<span style="color: var(--cor-vermelha); font-weight: bold;">Esgotado</span>' : `${stockAtual} bilhetes disponíveis`}
                    </p>
                    <button class="botao botao-primario" ${esgotado ? 'disabled' : ''}>
                        ${esgotado ? 'Esgotado' : 'Ver Detalhes'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

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
};

/**
 * Atualizar a função de detalhe do evento para mostrar stock
 */
const abrirDetalheEventoOriginal = window.abrirDetalheEvento || abrirDetalheEvento;
window.abrirDetalheEvento = function(idEvento) {
    const evento = estadoApp.eventos.find(e => e.id === idEvento);
    if (!evento) return;

    const stockAtual = obterStockEvento(evento.id);
    const esgotado = stockAtual === 0;

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
                        <p><strong><i class="fas fa-ticket-alt"></i> Disponíveis:</strong> ${esgotado ? '<span style="color: var(--cor-vermelha); font-weight: bold;">Esgotado</span>' : stockAtual + ' bilhetes'}</p>
                    </div>
                    <div class="descricao-detalhe-evento">
                        <p>${evento.descricao}</p>
                    </div>
                    <div class="preco-detalhe-evento">${evento.preco.toFixed(2)}Kz</div>
                    <button class="botao botao-primario" onclick="comprarBilhete(${evento.id})" ${esgotado ? 'disabled' : ''}>
                        ${esgotado ? 'Bilhetes Esgotados' : 'Comprar Bilhete'}
                    </button>
                </div>
            </div>
        `;
    }
    if (modal) modal.classList.add('ativo');
};

/**
 * Atualizar a função de compra para usar o novo sistema de stock
 */
const comprarBilheteOriginal = window.comprarBilhete;
window.comprarBilhete = function(idEvento) {
    if (!estadoApp.utilizadorAtual) {
        mostrarNotificacao('Inicie sessão para comprar bilhetes.', 'warning');
        abrirModalAutenticacao();
        return;
    }

    const evento = estadoApp.eventos.find(e => e.id === idEvento);
    if (!evento || !temStockDisponivel(idEvento)) {
        mostrarNotificacao('Bilhetes esgotados!', 'error');
        return;
    }

    // Decrementar stock
    if (!decrementarStock(idEvento)) {
        mostrarNotificacao('Erro ao processar a compra. Tente novamente.', 'error');
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
        dataCompra: new Date().toLocaleDateString('pt-PT'),
        dataPDF: new Date().toISOString() // Para limpeza automática
    };

    estadoApp.utilizadorAtual.bilhetes.push(bilhete);
    evento.disponivel = Math.max(0, evento.disponivel - 1);

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

/**
 * Atualizar o dashboard admin para mostrar stock atualizado
 */
const renderizarDashboardAdminOriginal = window.renderizarDashboardAdmin;
window.renderizarDashboardAdmin = function() {
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

    // Adicionar tabela de eventos com stock
    const tabelaEventos = document.querySelector('#tabelaEventosAdmin');
    if (tabelaEventos) {
        const corpoEventos = tabelaEventos.querySelector('tbody');
        if (corpoEventos) {
            corpoEventos.innerHTML = estadoApp.eventos.map(evento => {
                const stockAtual = obterStockEvento(evento.id);
                return `
                    <tr>
                        <td data-label="Evento">${evento.titulo}</td>
                        <td data-label="Capacidade">${evento.capacidade}</td>
                        <td data-label="Stock Disponível" style="color: ${stockAtual === 0 ? 'var(--cor-vermelha)' : 'var(--cor-cinza)'}; font-weight: bold;">
                            ${stockAtual}
                        </td>
                        <td data-label="Preço">${evento.preco.toFixed(2)}Kz</td>
                    </tr>
                `;
            }).join('');
        }
    }
};

// ========================================
// 2. SISTEMA DE CHAT ORGANIZADO
// ========================================

/**
 * Inicializar o sistema de chat
 */
function inicializarChat() {
    atualizarBadgesChat();
}

/**
 * Obter conversas agrupadas por utilizador
 */
function obterConversasAgrupadas() {
    const mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
    const conversas = {};

    mensagens.forEach(msg => {
        const chave = msg.idUtilizador || msg.email;
        if (!conversas[chave]) {
            conversas[chave] = {
                idUtilizador: msg.idUtilizador,
                nome: msg.nome,
                email: msg.email,
                mensagens: [],
                naoLidas: 0
            };
        }
        conversas[chave].mensagens.push(msg);
        if (msg.status === 'Pendente') {
            conversas[chave].naoLidas++;
        }
    });

    return conversas;
}

/**
 * Atualizar badges de chat no menu
 */
function atualizarBadgesChat() {
    const conversas = obterConversasAgrupadas();
    let totalNaoLidas = 0;

    Object.values(conversas).forEach(conversa => {
        totalNaoLidas += conversa.naoLidas;
    });

    // Atualizar ícone de suporte no menu (efeito de brilho no ícone, sem bolinha)
    const linkSuporteMenu = document.querySelector('[data-seccao="suporte"]');
    if (linkSuporteMenu) {
        const icone = linkSuporteMenu.querySelector('i');
        if (icone) {
            if (totalNaoLidas > 0) {
                icone.classList.add('icone-notificacao-brilho');
            } else {
                icone.classList.remove('icone-notificacao-brilho');
            }
        }
        // Remover bolinha antiga se existir
        const badgeAntiga = linkSuporteMenu.querySelector('.badge-notificacao-chat');
        if (badgeAntiga) badgeAntiga.remove();
    }

    // Atualizar ícone de suporte no admin (efeito de brilho no ícone, sem bolinha)
    const linkAdminSuporte = document.querySelector('[data-aba="suporte-admin"]');
    if (linkAdminSuporte) {
        const icone = linkAdminSuporte.querySelector('i');
        if (icone) {
            if (totalNaoLidas > 0) {
                icone.classList.add('icone-notificacao-brilho');
            } else {
                icone.classList.remove('icone-notificacao-brilho');
            }
        }
        // Remover bolinha antiga se existir
        const badgeAntiga = linkAdminSuporte.querySelector('.badge-notificacao-chat');
        if (badgeAntiga) badgeAntiga.remove();
    }
}

/**
 * Eliminar uma mensagem de suporte
 */
window.eliminarMensagemSuporte = function(idMensagem) {
    if (confirm('Tem a certeza que deseja eliminar esta mensagem?')) {
        let mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
        mensagens = mensagens.filter(m => m.id !== idMensagem);
        localStorage.setItem('mensagensSuporte', JSON.stringify(mensagens));
        
        mostrarNotificacao('Mensagem eliminada com sucesso!', 'success');
        
        // Atualizar as vistas dependendo de onde estamos
        if (typeof renderizarSuporteUtilizador === 'function') renderizarSuporteUtilizador();
        if (typeof renderizarConversasAdmin === 'function') renderizarConversasAdmin();
        if (typeof atualizarBadgesChat === 'function') atualizarBadgesChat();
        
        // Se estivermos no admin e a conversa aberta for a da mensagem eliminada, limpamos o histórico
        const containerHistorico = document.getElementById('historicoConversaAdmin');
        if (containerHistorico) {
            containerHistorico.innerHTML = '<p style="text-align: center; color: #999;">Selecione uma conversa para ver o histórico</p>';
        }
    }
};

/**
 * Renderizar conversas agrupadas para o admin
 */
function renderizarConversasAdmin() {
    const container = document.getElementById('listaConversasAdmin');
    if (!container) return;

    const conversas = obterConversasAgrupadas();
    const conversasArray = Object.entries(conversas).sort((a, b) => {
        // Ordenar por mensagens não lidas primeiro
        if (b[1].naoLidas !== a[1].naoLidas) {
            return b[1].naoLidas - a[1].naoLidas;
        }
        // Depois por data da última mensagem
        const dataA = new Date(a[1].mensagens[a[1].mensagens.length - 1].data);
        const dataB = new Date(b[1].mensagens[b[1].mensagens.length - 1].data);
        return dataB - dataA;
    });

    if (conversasArray.length === 0) {
        container.innerHTML = '<p style="padding: 20px; text-align: center;">Nenhuma conversa iniciada.</p>';
        return;
    }

    container.innerHTML = conversasArray.map(([chave, conversa]) => `
        <div class="cartao-conversa-admin" onclick="abrirConversaAdmin('${chave}')" style="cursor: pointer; padding: 15px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 10px; background: ${conversa.naoLidas > 0 ? '#fff8f0' : '#fff'};">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${conversa.nome}</strong>
                    <p style="font-size: 0.85rem; color: #666; margin: 5px 0;">${conversa.email}</p>
                </div>
                ${conversa.naoLidas > 0 ? `<span class="badge-conversa-admin">${conversa.naoLidas}</span>` : ''}
            </div>
        </div>
    `).join('');
}

/**
 * Abrir conversa específica no admin
 */
window.abrirConversaAdmin = function(chave) {
    const conversas = obterConversasAgrupadas();
    const conversa = conversas[chave];
    
    if (!conversa) return;

    const container = document.getElementById('historicoConversaAdmin');
    if (!container) return;

    container.innerHTML = `
        <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #eee;">
                <h3 style="margin: 0; color: var(--cor-vermelha);">Conversa com ${conversa.nome}</h3>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 0.9rem;">${conversa.email}</p>
            </div>
            
            <div style="background: white; border-radius: 8px; padding: 15px; max-height: 400px; overflow-y: auto; margin-bottom: 20px; border: 1px solid #eee;">
                ${conversa.mensagens.map(msg => `
                    <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: var(--cor-vermelha);">${msg.nome}</strong>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 0.8rem; color: #999;">${msg.data}</span>
                                <button onclick="eliminarMensagemSuporte(${msg.id})" title="Eliminar mensagem" style="background: none; border: none; color: #f44336; cursor: pointer; font-size: 0.8rem;">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <p style="color: #444; margin: 8px 0;">${msg.mensagem}</p>
                        ${msg.resposta ? `
                            <div style="background: #f8f9fa; padding: 10px; border-left: 4px solid var(--cor-vermelha); border-radius: 4px; margin-top: 10px;">
                                <strong style="font-size: 0.85rem;">Resposta do Administrador:</strong>
                                <p style="margin-top: 5px; font-size: 0.9rem;">${msg.resposta}</p>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>

            ${!conversa.mensagens[conversa.mensagens.length - 1].resposta ? `
                <div class="formulario-suporte-perfil" style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
                    <h5 style="margin-bottom: 15px; color: var(--cor-vermelha);">Responder a ${conversa.nome}</h5>
                    <textarea id="respostaConversa" placeholder="Escreva a sua resposta..." style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; min-height: 100px; font-family: inherit;"></textarea>
                    <button class="botao botao-primario" onclick="enviarRespostaConversa('${chave}')" style="width: 100%;">Enviar Resposta</button>
                </div>
            ` : ''}
        </div>
    `;
};

/**
 * Enviar resposta para uma conversa
 */
window.enviarRespostaConversa = function(chave) {
    const textoResposta = document.getElementById('respostaConversa').value;
    if (!textoResposta.trim()) {
        mostrarNotificacao('Por favor, escreva uma resposta.', 'warning');
        return;
    }

    const mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
    const conversas = obterConversasAgrupadas();
    const conversa = conversas[chave];

    // Atualizar a última mensagem com a resposta
    const ultimaMensagem = conversa.mensagens[conversa.mensagens.length - 1];
    const index = mensagens.findIndex(m => m.id === ultimaMensagem.id);

    if (index !== -1) {
        mensagens[index].resposta = textoResposta;
        mensagens[index].status = 'Respondido';
        localStorage.setItem('mensagensSuporte', JSON.stringify(mensagens));
        mostrarNotificacao('Resposta enviada com sucesso!', 'success');
        atualizarBadgesChat();
        window.abrirConversaAdmin(chave);
        renderizarConversasAdmin();
    }
};

// ========================================
// 3. GESTÃO DE REGISTOS E EXPORTAÇÃO PDF
// ========================================

/**
 * Inicializar o sistema de gestão de registos
 */
function inicializarGestaoRegistos() {
    // Executar limpeza automática ao carregar
    limparRegistosAntigos();
    
    // Executar limpeza a cada 24 horas
    setInterval(limparRegistosAntigos, 24 * 60 * 60 * 1000);
}

/**
 * Limpar registos com mais de 7 dias
 */
function limparRegistosAntigos() {
    const agora = new Date();
    const setesDias = 7 * 24 * 60 * 60 * 1000;

    // Limpar bilhetes antigos
    const utilizadores = JSON.parse(localStorage.getItem('utilizadores')) || [];
    utilizadores.forEach(utilizador => {
        if (utilizador.bilhetes) {
            utilizador.bilhetes = utilizador.bilhetes.filter(bilhete => {
                const dataBilhete = new Date(bilhete.dataPDF || bilhete.dataCompra);
                return (agora - dataBilhete) < setesDias;
            });
        }
    });
    localStorage.setItem('utilizadores', JSON.stringify(utilizadores));

    // Limpar agendamentos antigos
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const agendamentosLimpos = agendamentos.filter(agendamento => {
        const dataAgendamento = new Date(agendamento.dataPedido);
        return (agora - dataAgendamento) < setesDias;
    });
    localStorage.setItem('agendamentos', JSON.stringify(agendamentosLimpos));

    // Limpar registos de atividades antigos
    const atividades = JSON.parse(localStorage.getItem('registosAtividades')) || [];
    const atividadesLimpas = atividades.filter(atividade => {
        const dataAtividade = new Date(atividade.data);
        return (agora - dataAtividade) < setesDias;
    });
    localStorage.setItem('registosAtividades', JSON.stringify(atividadesLimpas));
}

/**
 * Eliminar um bilhete manualmente
 */
window.eliminarBilhete = function(idBilhete) {
    if (!estadoApp.utilizadorAtual) return;

    if (confirm('Tem a certeza que deseja eliminar este bilhete?')) {
        estadoApp.utilizadorAtual.bilhetes = estadoApp.utilizadorAtual.bilhetes.filter(b => b.id !== idBilhete);
        
        const utilizadores = JSON.parse(localStorage.getItem('utilizadores')) || [];
        const index = utilizadores.findIndex(u => u.email === estadoApp.utilizadorAtual.email);
        if (index !== -1) {
            utilizadores[index].bilhetes = estadoApp.utilizadorAtual.bilhetes;
            localStorage.setItem('utilizadores', JSON.stringify(utilizadores));
        }

        guardarUtilizadorNoArmazenamento();
        mostrarNotificacao('Bilhete eliminado com sucesso!', 'success');
        renderizarSeccaoPerfil();
    }
};

/**
 * Eliminar um agendamento manualmente
 */
window.eliminarAgendamento = function(idAgendamento) {
    if (confirm('Tem a certeza que deseja eliminar este agendamento?')) {
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        const agendamentosAtualizados = agendamentos.filter(a => a.id !== idAgendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentosAtualizados));
        
        mostrarNotificacao('Agendamento eliminado com sucesso!', 'success');
        renderizarAgendamentosUtilizador();
    }
};

/**
 * Exportar bilhete para PDF usando jsPDF
 */
window.exportarBilhetePDF = function(idBilhete) {
    if (!estadoApp.utilizadorAtual) return;

    const bilhete = estadoApp.utilizadorAtual.bilhetes.find(b => b.id === idBilhete);
    if (!bilhete) return;

    // A distribuição UMD expõe a classe em window.jspdf.jsPDF.
    const JsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (typeof JsPDF !== 'function') {
        mostrarNotificacao('Biblioteca jsPDF não está carregada. Por favor, recarregue a página.', 'error');
        return;
    }

    const doc = new JsPDF();

    // Cores Nov11 Sports
    const corVermelha = [199, 10, 6];
    const corCinza = [154, 150, 141];

    // Cabeçalho
    doc.setFillColor(...corVermelha);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Nov11 Sports', 15, 25);

    // Título
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text('Bilhete de Evento', 15, 55);

    // Informações do bilhete
    doc.setFontSize(11);
    doc.setTextColor(...corCinza);
    
    const linhaInicial = 70;
    const espacoLinha = 8;
    let linhaAtual = linhaInicial;

    doc.text('Evento:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(bilhete.tituloEvento, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('ID do Bilhete:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text('#' + bilhete.id, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Data do Evento:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(formatarData(bilhete.data) + ' às ' + bilhete.hora, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Local:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(bilhete.localizacao, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Preço:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(bilhete.preco.toFixed(2) + ' Kz', 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Data de Compra:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(bilhete.dataCompra, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Titular:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(estadoApp.utilizadorAtual.nome, 50, linhaAtual);

    // Rodapé
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Este bilhete é válido apenas para o evento especificado. Guarde-o com cuidado.', 15, 270);
    doc.text('Nov11 Sports - Sistema de Gestão de Eventos', 15, 280);

    // Descarregar
    doc.save(`Bilhete_${bilhete.id}.pdf`);
    mostrarNotificacao('Bilhete descarregado com sucesso!', 'success');
};

/**
 * Exportar agendamento para PDF
 */
window.exportarAgendamentoPDF = function(idAgendamento) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const agendamento = agendamentos.find(a => a.id === idAgendamento);
    
    if (!agendamento) return;

    // A distribuição UMD expõe a classe em window.jspdf.jsPDF.
    const JsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (typeof JsPDF !== 'function') {
        mostrarNotificacao('Biblioteca jsPDF não está carregada. Por favor, recarregue a página.', 'error');
        return;
    }

    const doc = new JsPDF();

    const corVermelha = [199, 10, 6];
    const corCinza = [154, 150, 141];

    // Cabeçalho
    doc.setFillColor(...corVermelha);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Nov11 Sports', 15, 25);

    // Título
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text('Pedido de Agendamento', 15, 55);

    // Informações do agendamento
    doc.setFontSize(11);
    doc.setTextColor(...corCinza);
    
    const linhaInicial = 70;
    const espacoLinha = 8;
    let linhaAtual = linhaInicial;

    doc.text('Nome do Evento:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.nomeEvento, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Tipo:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.tipoEvento, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Data:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.dataAgendamento + ' às ' + agendamento.horaAgendamento, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Capacidade Esperada:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.capacidadeEsperada + ' pessoas', 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Status:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1), 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Organizador:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.nomeOrganizador, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Email:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.emailOrganizador, 50, linhaAtual);
    
    linhaAtual += espacoLinha;
    doc.setTextColor(...corCinza);
    doc.text('Telefone:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.text(agendamento.telefonePedido, 50, linhaAtual);

    // Descrição
    linhaAtual += espacoLinha + 5;
    doc.setTextColor(...corCinza);
    doc.text('Descrição:', 15, linhaAtual);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    const descricaoLinhas = doc.splitTextToSize(agendamento.descricaoEvento, 180);
    doc.text(descricaoLinhas, 15, linhaAtual + 5);

    // Rodapé
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Este documento é um comprovante do seu pedido de agendamento.', 15, 270);
    doc.text('Nov11 Sports - Sistema de Gestão de Eventos', 15, 280);

    doc.save(`Agendamento_${idAgendamento}.pdf`);
    mostrarNotificacao('Agendamento descarregado com sucesso!', 'success');
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarChat();
    inicializarGestaoRegistos();
});
