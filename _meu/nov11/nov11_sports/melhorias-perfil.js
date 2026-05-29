// ========================================
// MELHORIAS DO PERFIL DO UTILIZADOR
// ========================================

/**
 * Renderizar perfil com novos botões de ação para bilhetes
 * Substitui a função original renderizarSeccaoPerfil
 */
const renderizarSeccaoPerfilOriginal = window.renderizarSeccaoPerfil;
window.renderizarSeccaoPerfil = function() {
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
                    ${totalComprados > 0 ? estadoApp.utilizadorAtual.bilhetes.map(bilhete => {
                        const dataCompra = new Date(bilhete.dataPDF || bilhete.dataCompra);
                        const agora = new Date();
                        const diasPassados = Math.floor((agora - dataCompra) / (1000 * 60 * 60 * 24));
                        const expirado = diasPassados > 7;
                        
                        return `
                            <div class="cartao-bilhete-completo">
                                <div class="info-bilhete-cabecalho">
                                    <div>
                                        <h5>${bilhete.tituloEvento}</h5>
                                        <p style="font-size: 0.85rem; color: #666; margin: 5px 0;">
                                            <i class="fas fa-calendar-alt"></i> ${bilhete.dataCompra || (bilhete.data ? formatarData(bilhete.data) : 'Data não disponível')}
                                        </p>
                                        <p style="font-size: 0.85rem; color: #666; margin: 5px 0;">
                                            <i class="fas fa-ticket-alt"></i> ID: ${bilhete.id}
                                        </p>
                                    </div>
                                    <span class="badge-status-bilhete ${expirado ? 'badge-expirado' : 'badge-ativo'}">
                                        ${expirado ? 'Expirado' : 'Ativo'}
                                    </span>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                    <span style="font-size: 1.1rem; font-weight: bold; color: var(--cor-vermelha);">
                                        ${(bilhete.preco || 0).toLocaleString()} Kz
                                    </span>
                                    <div class="botoes-acao-bilhete">
                                        <button class="botao-pdf" onclick="exportarBilhetePDF(${bilhete.id})" title="Descarregar PDF">
                                            <i class="fas fa-file-pdf"></i> PDF
                                        </button>
                                        <button class="botao-eliminar" onclick="eliminarBilhete(${bilhete.id})" title="Eliminar bilhete">
                                            <i class="fas fa-trash"></i> Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('') : '<p>Ainda não comprou nenhum bilhete.</p>'}
                </div>

                <h4 style="margin-top: 2.5rem;">Os Meus Agendamentos</h4>
                <div id="listaAgendamentosUtilizador" class="lista-agendamentos-perfil">
                    <p>A carregar agendamentos...</p>
                </div>

                <h4 style="margin-top: 2.5rem;">O Meu Suporte</h4>
                
                <!-- Novo formulário de mensagem no perfil -->
                <div class="formulario-suporte-perfil" style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #eee;">
                    <h5 style="margin-bottom: 15px; color: var(--cor-vermelha);">Enviar Nova Mensagem ao Administrador</h5>
                    <form onsubmit="enviarMensagemSuportePerfil(event)">
                        <textarea id="mensagemSuportePerfil" placeholder="Descreva a sua dúvida ou problema..." style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; min-height: 100px; font-family: inherit;" required></textarea>
                        <button type="submit" class="botao botao-primario" style="width: 100%;">Enviar Mensagem</button>
                    </form>
                </div>

                <div id="listaSuporteUtilizador" class="lista-suporte-utilizador">
                    <p>A carregar as suas mensagens...</p>
                </div>
            </div>
        </div>
    `;
    
    // Renderizar agendamentos e suporte
    setTimeout(() => {
        renderizarAgendamentosPerfilUtilizador();
        renderizarSuporteUtilizador();
    }, 50);
};

/**
 * Renderizar agendamentos do utilizador no perfil
 */
function renderizarAgendamentosPerfilUtilizador() {
    const container = document.getElementById('listaAgendamentosUtilizador');
    if (!container || !estadoApp.utilizadorAtual) return;

    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const meusAgendamentos = agendamentos.filter(a => a.utilizadorId === estadoApp.utilizadorAtual.id);

    if (meusAgendamentos.length === 0) {
        container.innerHTML = '<p>Você não tem pedidos de agendamento.</p>';
        return;
    }

    container.innerHTML = meusAgendamentos.map(agendamento => {
        const dataAgendamento = new Date(agendamento.dataPedido);
        const agora = new Date();
        const diasPassados = Math.floor((agora - dataAgendamento) / (1000 * 60 * 60 * 24));
        const expirado = diasPassados > 7;

        return `
            <div class="cartao-bilhete-completo">
                <div class="info-bilhete-cabecalho">
                    <div>
                        <h5>${agendamento.nomeEvento}</h5>
                        <p style="font-size: 0.85rem; color: #666; margin: 5px 0;">
                            <i class="fas fa-calendar-alt"></i> ${agendamento.dataAgendamento} às ${agendamento.horaAgendamento}
                        </p>
                        <p style="font-size: 0.85rem; color: #666; margin: 5px 0;">
                            <i class="fas fa-users"></i> ${agendamento.capacidadeEsperada} pessoas
                        </p>
                    </div>
                    <span class="badge-status-bilhete" style="background: ${agendamento.status === 'aprovado' ? '#4CAF50' : agendamento.status === 'recusado' ? '#f44336' : '#FFC107'}; color: white;">
                        ${agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                    </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <span style="font-size: 0.9rem; color: #666;">
                        Tipo: <strong>${agendamento.tipoEvento}</strong>
                    </span>
                    <div class="botoes-acao-bilhete">
                        <button class="botao-pdf" onclick="exportarAgendamentoPDF(${agendamento.id})" title="Descarregar PDF">
                            <i class="fas fa-file-pdf"></i> PDF
                        </button>
                        <button class="botao-eliminar" onclick="eliminarAgendamento(${agendamento.id})" title="Eliminar agendamento">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Melhorar a renderização do suporte do utilizador
 */
const renderizarSuporteUtilizadorOriginal = window.renderizarSuporteUtilizador;
window.renderizarSuporteUtilizador = function() {
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
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span class="badge-status ${msg.status === 'Pendente' ? 'status-pendente' : 'status-respondido'}">${msg.status}</span>
                    <span class="data-mensagem">${msg.data}</span>
                </div>
                <button class="botao-eliminar-msg" onclick="eliminarMensagemSuporte(${msg.id})" title="Eliminar mensagem" style="background: none; border: none; color: #f44336; cursor: pointer; font-size: 0.9rem;">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="corpo-mensagem">${msg.mensagem}</div>
            ${msg.resposta ? `
                <div class="resposta-admin">
                    <strong>Resposta do Administrador:</strong>
                    <p>${msg.resposta}</p>
                </div>
            ` : '<p style="color: #999; font-size: 0.9rem; margin-top: 10px;"><i class="fas fa-hourglass-half"></i> Aguardando resposta...</p>'}
        </div>
    `).join('');
};

// ========================================
// MELHORIAS DO ADMIN - TABELA DE EVENTOS COM STOCK
// ========================================

/**
 * Adicionar tabela de eventos na aba dashboard do admin
 */
function adicionarTabelaEventosAdmin() {
    const dashboardAdmin = document.querySelector('.dashboard-admin');
    if (!dashboardAdmin) return;

    // Verificar se a tabela já existe
    if (document.querySelector('#tabelaEventosAdmin')) return;

    const tabelaHTML = `
        <div class="tabela-vendas" style="margin-top: 3rem;">
            <h3>Eventos e Stock</h3>
            <div class="contentor-tabela">
                <table id="tabelaEventosAdmin">
                    <thead>
                        <tr>
                            <th>Evento</th>
                            <th>Capacidade Total</th>
                            <th>Stock Disponível</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Os eventos serão carregados aqui -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    dashboardAdmin.insertAdjacentHTML('beforeend', tabelaHTML);
}

// Adicionar a tabela quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(adicionarTabelaEventosAdmin, 500);
});

// ========================================
// MELHORIAS DO ADMIN - CONVERSAS DE CHAT
// ========================================

/**
 * Melhorar a renderização do suporte admin com layout de conversas
 */
const renderizarSuporteAdminOriginal = window.renderizarSuporteAdmin;
window.renderizarSuporteAdmin = function() {
    const container = document.getElementById('aba-suporte-admin');
    if (!container) return;

    // Limpar conteúdo anterior
    container.innerHTML = `
        <h3>Mensagens de Suporte</h3>
        <div class="layout-conversas-admin">
            <div id="listaConversasAdmin" class="lista-conversas-admin">
                <p style="text-align: center; color: #999;">A carregar conversas...</p>
            </div>
            <div id="historicoConversaAdmin" class="historico-conversa-admin">
                <p style="text-align: center; color: #999;">Selecione uma conversa para ver o histórico</p>
            </div>
        </div>
    `;

    // Renderizar conversas
    setTimeout(() => {
        renderizarConversasAdmin();
    }, 100);
};

/**
 * Enviar mensagem de suporte a partir do perfil
 */
window.enviarMensagemSuportePerfil = function(e) {
    e.preventDefault();
    const textarea = document.getElementById('mensagemSuportePerfil');
    const mensagem = textarea.value.trim();
    
    if (!mensagem) return;
    
    const novaMensagem = {
        id: Date.now(),
        idUtilizador: estadoApp.utilizadorAtual.id,
        nome: estadoApp.utilizadorAtual.nome,
        email: estadoApp.utilizadorAtual.email,
        mensagem: mensagem,
        data: new Date().toLocaleString('pt-PT'),
        status: 'Pendente',
        resposta: null
    };
    
    const mensagens = JSON.parse(localStorage.getItem('mensagensSuporte')) || [];
    mensagens.push(novaMensagem);
    localStorage.setItem('mensagensSuporte', JSON.stringify(mensagens));
    
    textarea.value = '';
    mostrarNotificacao('Mensagem enviada com sucesso!', 'success');
    renderizarSuporteUtilizador();
    if (typeof atualizarBadgesChat === 'function') atualizarBadgesChat();
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Atualizar renderização do perfil se necessário
    if (estadoApp.utilizadorAtual) {
        renderizarSeccaoPerfil();
    }
});
