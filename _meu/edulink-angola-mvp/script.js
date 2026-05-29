/**
 * EduLink Angola - Script Principal
 * Lógica completa da aplicação com suporte a autenticação, painéis e persistência
 */

// ============================================================================
// GERENCIAMENTO DE VISTAS
// ============================================================================

class GerenciadorVistas {
    constructor() {
        this.vistaAtual = null;
    }

    /**
     * Muda para uma vista específica
     */
    mudarPara(nomevista) {
        // Oculta todas as vistas
        document.querySelectorAll('.vista').forEach(vista => {
            vista.style.display = 'none';
        });

        // Mostra a vista desejada
        const vista = document.getElementById(`vista-${nomevista}`);
        if (vista) {
            vista.style.display = 'block';
            this.vistaAtual = nomevista;
            window.scrollTo(0, 0);
        }
    }

    /**
     * Atualiza a interface baseado no estado de autenticação
     */
    atualizarInterfaceAutenticacao() {
        const acoesCabecalho = document.getElementById('acoes-cabecalho');
        const acoesAutenticadas = document.getElementById('acoes-autenticadas');
        const nomeCabecalho = document.getElementById('nome-usuario-cabecalho');

        if (gestorAutenticacao.estaAutenticado()) {
            acoesCabecalho.style.display = 'none';
            acoesAutenticadas.style.display = 'flex';
            const usuario = gestorAutenticacao.obterDadosUsuarioAtual();
            nomeCabecalho.textContent = usuario.nome;
        } else {
            acoesCabecalho.style.display = 'flex';
            acoesAutenticadas.style.display = 'none';
            this.mudarPara('publica');
        }
    }

    /**
     * Mostra a vista apropriada baseado no tipo de usuário
     */
    mostrarVistaUsuario() {
        const tipoUsuario = gestorAutenticacao.obterTipoUsuario();

        switch (tipoUsuario) {
            case 'aluno':
                this.mudarPara('aluno');
                break;
            case 'professor':
                this.mudarPara('professor');
                break;
            case 'admin':
                this.mudarPara('admin');
                break;
            default:
                this.mudarPara('publica');
        }
    }
}

const gerenciadorVistas = new GerenciadorVistas();

// ============================================================================
// AUTENTICAÇÃO
// ============================================================================

/**
 * Troca entre abas de login/registo
 */
function trocarAba(nomeAba) {
    document.querySelectorAll('.aba-btn').forEach(btn => btn.classList.remove('aba-ativa'));
    document.querySelectorAll('.conteudo-aba').forEach(aba => aba.classList.remove('ativo'));

    document.querySelector(`[data-aba="${nomeAba}"]`).classList.add('aba-ativa');
    document.getElementById(`aba-${nomeAba}`).classList.add('ativo');
}

/**
 * Abre a vista de autenticação
 */
function abrirAutenticacao() {
    gerenciadorVistas.mudarPara('autenticacao');
    trocarAba('login');
}

/**
 * Realiza o login
 */
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            try {
                gestorAutenticacao.fazerLogin(email, senha);
                mostrarMensagem('Login realizado com sucesso!', 'sucesso');
                gerenciadorVistas.atualizarInterfaceAutenticacao();
                gerenciadorVistas.mostrarVistaUsuario();
                formLogin.reset();
            } catch (erro) {
                mostrarMensagem(erro.message, 'erro');
            }
        });
    }
});

/**
 * Realiza o registo
 */
document.addEventListener('DOMContentLoaded', () => {
    const formRegisto = document.getElementById('form-registo');
    if (formRegisto) {
        formRegisto.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('registo-nome').value;
            const email = document.getElementById('registo-email').value;
            const senha = document.getElementById('registo-senha').value;
            const contacto = document.getElementById('registo-contacto').value;
            const tipo = document.getElementById('registo-tipo').value;
            const disciplina = document.getElementById('registo-disciplina').value;
            const preco = parseInt(document.getElementById('registo-preco').value) || 0;

            try {
                const dados = { nome, email, senha, contacto, tipo };
                if (tipo === 'professor') {
                    dados.disciplina = disciplina;
                    dados.preco = preco;
                    dados.provincia = 'Luanda';
                    dados.avaliacao = 5.0;
                }
                gestorAutenticacao.fazerRegisto(dados);
                mostrarMensagem('Conta criada com sucesso!', 'sucesso');
                gerenciadorVistas.atualizarInterfaceAutenticacao();
                gerenciadorVistas.mostrarVistaUsuario();
                formRegisto.reset();
            } catch (erro) {
                mostrarMensagem(erro.message, 'erro');
            }
        });
    }
});

/**
 * Faz logout
 */
function fazerLogout() {
    gestorAutenticacao.fazerLogout();
    gerenciadorVistas.atualizarInterfaceAutenticacao();
    mostrarMensagem('Logout realizado com sucesso!', 'sucesso');
}

// ============================================================================
// BOTÕES DE AUTENTICAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-entrar').addEventListener('click', abrirAutenticacao);
    document.getElementById('btn-registar').addEventListener('click', () => {
        abrirAutenticacao();
        trocarAba('registo');
    });
    document.getElementById('btn-sair').addEventListener('click', fazerLogout);
});

// ============================================================================
// RENDERIZAÇÃO DE PROFESSORES
// ============================================================================

/**
 * Renderiza os cards dos professores
 */
function renderizarProfessores(dados, elementoId = 'grade-professores') {
    const elemento = document.getElementById(elementoId);
    if (!elemento) return;

    elemento.innerHTML = '';

    if (dados.length === 0) {
        elemento.innerHTML = '<p class="sem-resultados">Nenhum professor encontrado para esta pesquisa.</p>';
        return;
    }

    dados.forEach(professor => {
        const primeiraLetra = professor.nome.charAt(0).toUpperCase();
        const cor = gerarCorPorId(professor.id);
        
        const card = document.createElement('div');
        card.className = 'card-professor';
        card.innerHTML = `
            <div class="card-foto" style="background-color: ${cor}">${primeiraLetra}</div>
            <div class="card-info">
                <span class="card-tag">${professor.disciplina}</span>
                <h3 class="card-nome">${professor.nome}</h3>
                <div class="card-localizacao">📍 ${professor.provincia}</div>
                <div class="card-avaliacao">⭐ ${professor.avaliacao}</div>
                <div class="card-preco">${professor.preco} Kz/h</div>
                <button class="botao-primario largura-total" style="margin-top: 15px;" onclick="abrirAgendamento('${professor.id}')">Agendar Aula</button>
            </div>
        `;
        elemento.appendChild(card);
    });
}

/**
 * Gera uma cor consistente para cada professor
 */
function gerarCorPorId(id) {
    const cores = ['#003366', '#00AEEF', '#007BFF', '#6C757D', '#17A2B8', '#20c997'];
    const indice = id.charCodeAt(id.length - 1) % cores.length;
    return cores[indice];
}

/**
 * Filtra professores
 */
function filtrarProfessores(elementoId = 'grade-professores') {
    const disciplinaBusca = document.getElementById('busca-disciplina').value.toLowerCase();
    const provinciaBusca = document.getElementById('busca-provincia').value;
    const categoriaAtiva = document.querySelector('.filtro-item.ativo')?.dataset.categoria || 'todos';

    const professores = gestorDados.obterUsuariosPorTipo('professor');
    
    const resultados = professores.filter(professor => {
        const coincideDisciplina = professor.disciplina.toLowerCase().includes(disciplinaBusca) || 
                                    professor.nome.toLowerCase().includes(disciplinaBusca);
        const coincideProvincia = provinciaBusca === '' || professor.provincia === provinciaBusca;
        const coincideCategoria = categoriaAtiva === 'todos' || professor.disciplina === categoriaAtiva;

        return coincideDisciplina && coincideProvincia && coincideCategoria;
    });

    renderizarProfessores(resultados, elementoId);
}

// ============================================================================
// AGENDAMENTO
// ============================================================================

let professorSelecionadoId = null;

/**
 * Abre o modal de agendamento
 */
function abrirAgendamento(idProfessor) {
    if (!gestorAutenticacao.estaAutenticado()) {
        mostrarMensagem('Deve fazer login para agendar uma aula.', 'erro');
        abrirAutenticacao();
        return;
    }

    const professor = gestorDados.obterUsuarioPorId(idProfessor);
    if (!professor) return;

    professorSelecionadoId = idProfessor;
    
    const detalhesProfessorModal = document.getElementById('detalhes-professor-modal');
    detalhesProfessorModal.innerHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
            <strong>Professor:</strong> ${professor.nome}<br>
            <strong>Disciplina:</strong> ${professor.disciplina}<br>
            <strong>Preço:</strong> ${professor.preco} Kz/h<br>
            <strong>Contacto:</strong> ${professor.contacto}
        </div>
    `;

    document.getElementById('modal-agendamento').style.display = 'block';
}

/**
 * Fecha o modal de agendamento
 */
document.addEventListener('DOMContentLoaded', () => {
    const fecharModal = document.querySelector('.fechar-modal');
    if (fecharModal) {
        fecharModal.onclick = () => {
            document.getElementById('modal-agendamento').style.display = 'none';
        };
    }

    window.onclick = (event) => {
        const modal = document.getElementById('modal-agendamento');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});

/**
 * Submete o formulário de agendamento
 */
document.addEventListener('DOMContentLoaded', () => {
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', (e) => {
            e.preventDefault();

            const nomeAluno = document.getElementById('nome-aluno').value;
            const dataAula = document.getElementById('data-aula').value;
            const moradaAula = document.getElementById('morada-aula').value;
            const mensagem = document.getElementById('mensagem').value;

            const professor = gestorDados.obterUsuarioPorId(professorSelecionadoId);
            const usuarioAtual = gestorAutenticacao.obterDadosUsuarioAtual();

            const agendamento = gestorDados.criarAgendamento({
                idAluno: usuarioAtual.id,
                nomeAluno: nomeAluno,
                idProfessor: professorSelecionadoId,
                nomeProfessor: professor.nome,
                disciplina: professor.disciplina,
                dataAula: dataAula,
                moradaAula: moradaAula,
                mensagem: mensagem,
                valor: professor.preco,
                contactoAluno: usuarioAtual.contacto,
                moradaAluno: usuarioAtual.morada || 'Não informada'
            });

            mostrarMensagem(`Agendamento realizado com sucesso! O professor ${professor.nome} receberá o seu pedido.`, 'sucesso');
            document.getElementById('modal-agendamento').style.display = 'none';
            formAgendamento.reset();

            // Atualiza as listas se o utilizador estiver num painel
            if (gestorAutenticacao.obterTipoUsuario() === 'aluno') {
                atualizarAgendamentosAluno();
            }
        });
    }
});

// ============================================================================
// PAINEL DO ALUNO
// ============================================================================

/**
 * Atualiza o perfil do aluno
 */
document.addEventListener('DOMContentLoaded', () => {
    const formPerfilAluno = document.getElementById('form-perfil-aluno');
    if (formPerfilAluno) {
        formPerfilAluno.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('perfil-nome-aluno').value;
            const contacto = document.getElementById('perfil-contacto-aluno').value;
            const morada = document.getElementById('perfil-morada-aluno').value;

            try {
                const idUsuario = gestorAutenticacao.obterIdUsuarioAtual();
                gestorDados.atualizarUsuario(idUsuario, { nome, contacto, morada });
                gestorAutenticacao.usuarioAtual.nome = nome;
                document.getElementById('nome-usuario-cabecalho').textContent = nome;
                mostrarMensagem('Perfil atualizado com sucesso!', 'sucesso');
            } catch (erro) {
                mostrarMensagem(erro.message, 'erro');
            }
        });
    }
});

/**
 * Carrega os dados do perfil do aluno
 */
function carregarPerfilAluno() {
    const usuario = gestorAutenticacao.obterDadosUsuarioAtual();
    if (!usuario) return;

    document.getElementById('perfil-nome-aluno').value = usuario.nome;
    document.getElementById('perfil-email-aluno').value = usuario.email;
    document.getElementById('perfil-contacto-aluno').value = usuario.contacto;
    document.getElementById('perfil-morada-aluno').value = usuario.morada || '';
    document.getElementById('avatar-aluno').textContent = usuario.nome.charAt(0).toUpperCase();
}

/**
 * Atualiza a lista de agendamentos do aluno
 */
function atualizarAgendamentosAluno() {
    const idUsuario = gestorAutenticacao.obterIdUsuarioAtual();
    const agendamentos = gestorDados.obterAgendamentosUsuario(idUsuario)
        .filter(a => a.idAluno === idUsuario);

    const listaAgendamentos = document.getElementById('lista-agendamentos-aluno');
    if (!listaAgendamentos) return;

    listaAgendamentos.innerHTML = '';

    if (agendamentos.length === 0) {
        listaAgendamentos.innerHTML = '<p>Nenhum agendamento realizado ainda.</p>';
        return;
    }

    agendamentos.forEach(agendamento => {
        const item = document.createElement('div');
        item.className = 'item-agendamento';
        item.innerHTML = `
            <div class="info-agendamento">
                <h4>${agendamento.nomeProfessor}</h4>
                <p><strong>Disciplina:</strong> ${agendamento.disciplina}</p>
                <p><strong>Data:</strong> ${new Date(agendamento.dataAula).toLocaleDateString('pt-PT')}</p>
                <p><strong>Local:</strong> ${agendamento.moradaAula}</p>
                <p><strong>Status:</strong> <span style="color: ${agendamento.status === 'pendente' ? '#ff9800' : '#f44336'}">${agendamento.status}</span></p>
            </div>
            <button class="botao-cancelar" onclick="cancelarAgendamento('${agendamento.id}')">✕ Cancelar</button>
        `;
        listaAgendamentos.appendChild(item);
    });
}

/**
 * Cancela um agendamento
 */
function cancelarAgendamento(idAgendamento) {
    if (confirm('Tem a certeza que deseja cancelar este agendamento?')) {
        gestorDados.cancelarAgendamento(idAgendamento);
        mostrarMensagem('Agendamento cancelado com sucesso!', 'sucesso');
        atualizarAgendamentosAluno();
    }
}

// ============================================================================
// PAINEL DO PROFESSOR
// ============================================================================

/**
 * Carrega os dados do perfil do professor
 */
function carregarPerfilProfessor() {
    const usuario = gestorAutenticacao.obterDadosUsuarioAtual();
    if (!usuario) return;

    document.getElementById('perfil-nome-professor').value = usuario.nome;
    document.getElementById('perfil-email-professor').value = usuario.email;
    document.getElementById('perfil-contacto-professor').value = usuario.contacto;
    document.getElementById('perfil-disciplina-professor').value = usuario.disciplina;
    document.getElementById('perfil-preco-professor').value = usuario.preco;
    document.getElementById('avatar-professor').textContent = usuario.nome.charAt(0).toUpperCase();
}

/**
 * Atualiza o perfil do professor
 */
document.addEventListener('DOMContentLoaded', () => {
    const formPerfilProfessor = document.getElementById('form-perfil-professor');
    if (formPerfilProfessor) {
        formPerfilProfessor.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('perfil-nome-professor').value;
            const contacto = document.getElementById('perfil-contacto-professor').value;
            const disciplina = document.getElementById('perfil-disciplina-professor').value;
            const preco = parseInt(document.getElementById('perfil-preco-professor').value);

            try {
                const idUsuario = gestorAutenticacao.obterIdUsuarioAtual();
                gestorDados.atualizarUsuario(idUsuario, { nome, contacto, disciplina, preco });
                gestorAutenticacao.usuarioAtual.nome = nome;
                document.getElementById('nome-usuario-cabecalho').textContent = nome;
                mostrarMensagem('Perfil atualizado com sucesso!', 'sucesso');
            } catch (erro) {
                mostrarMensagem(erro.message, 'erro');
            }
        });
    }
});

/**
 * Atualiza a lista de pedidos de aula
 */
function atualizarPedidosAula() {
    const idProfessor = gestorAutenticacao.obterIdUsuarioAtual();
    const agendamentos = gestorDados.obterAgendamentosUsuario(idProfessor)
        .filter(a => a.idProfessor === idProfessor);

    const listaPedidos = document.getElementById('lista-pedidos-aula');
    if (!listaPedidos) return;

    listaPedidos.innerHTML = '';

    if (agendamentos.length === 0) {
        listaPedidos.innerHTML = '<p>Nenhum pedido de aula recebido ainda.</p>';
        return;
    }

    agendamentos.forEach(agendamento => {
        const item = document.createElement('div');
        item.className = 'item-pedido';
        item.innerHTML = `
            <div class="info-pedido">
                <h4>${agendamento.nomeAluno}</h4>
                <p><strong>Disciplina:</strong> ${agendamento.disciplina}</p>
                <p><strong>Data Solicitada:</strong> ${new Date(agendamento.dataAula).toLocaleDateString('pt-PT')}</p>
                <p><strong>Local de Encontro:</strong> ${agendamento.moradaAula}</p>
                <p><strong>Contacto do Aluno:</strong> ${agendamento.contactoAluno}</p>
                <p><strong>Morada do Aluno:</strong> ${agendamento.moradaAluno}</p>
                <p><strong>Mensagem:</strong> ${agendamento.mensagem || 'Sem mensagem'}</p>
                <p><strong>Status:</strong> <span style="color: ${agendamento.status === 'pendente' ? '#ff9800' : '#f44336'}">${agendamento.status}</span></p>
            </div>
        `;
        listaPedidos.appendChild(item);
    });
}

// ============================================================================
// PAINEL ADMINISTRATIVO
// ============================================================================

/**
 * Atualiza o dashboard administrativo
 */
function atualizarDashboardAdmin() {
    const stats = gestorDados.obterEstatisticas();

    document.getElementById('total-professores').textContent = stats.totalProfessores;
    document.getElementById('total-alunos').textContent = stats.totalAlunos;
    document.getElementById('total-agendamentos').textContent = stats.totalAgendamentos;
    document.getElementById('valor-total').textContent = `${stats.valorTotal.toLocaleString('pt-PT')} Kz`;

    renderizarGraficoMensal(stats.valorMensal);
}

/**
 * Renderiza o gráfico de valores mensais
 */
function renderizarGraficoMensal(valorMensal) {
    const graficoContainer = document.getElementById('grafico-mensal');
    if (!graficoContainer) return;

    graficoContainer.innerHTML = '';

    if (Object.keys(valorMensal).length === 0) {
        graficoContainer.innerHTML = '<p>Nenhum dado disponível.</p>';
        return;
    }

    const meses = Object.keys(valorMensal).sort();
    const maxValor = Math.max(...Object.values(valorMensal));

    meses.forEach(mes => {
        const valor = valorMensal[mes];
        const altura = (valor / maxValor) * 200;

        const barra = document.createElement('div');
        barra.className = 'barra-grafico';
        barra.style.height = `${altura}px`;
        barra.title = `${mes}: ${valor.toLocaleString('pt-PT')} Kz`;
        barra.innerHTML = `<div class="label-barra">${mes}</div>`;

        graficoContainer.appendChild(barra);
    });
}

/**
 * Atualiza a lista de usuários no admin
 */
function atualizarListaUsuariosAdmin(tipo = 'professores') {
    const tipoUsuario = tipo === 'professores' ? 'professor' : 'aluno';
    const usuarios = gestorDados.obterUsuariosPorTipo(tipoUsuario);

    const listaUsuarios = document.getElementById('lista-usuarios-admin');
    if (!listaUsuarios) return;

    listaUsuarios.innerHTML = '';

    if (usuarios.length === 0) {
        listaUsuarios.innerHTML = `<p>Nenhum ${tipo} registado.</p>`;
        return;
    }

    usuarios.forEach(usuario => {
        const item = document.createElement('div');
        item.className = 'usuario-item';
        item.innerHTML = `
            <div class="usuario-info">
                <h4>${usuario.nome}</h4>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Contacto:</strong> ${usuario.contacto}</p>
                ${usuario.disciplina ? `<p><strong>Disciplina:</strong> ${usuario.disciplina}</p>` : ''}
                <p><strong>Status:</strong> ${usuario.ativo ? '✓ Ativo' : '✗ Bloqueado'}</p>
            </div>
            <div class="acoes-usuario">
                <button class="botao-remover" onclick="removerUsuario('${usuario.id}')">Remover</button>
            </div>
        `;
        listaUsuarios.appendChild(item);
    });
}

/**
 * Remove um usuário
 */
function removerUsuario(idUsuario) {
    if (confirm('Tem a certeza que deseja remover este usuário?')) {
        gestorDados.removerUsuario(idUsuario);
        mostrarMensagem('Usuário removido com sucesso!', 'sucesso');
        const tipoAtivo = document.querySelector('.aba-usuarios.aba-ativa')?.dataset.tipo || 'professores';
        atualizarListaUsuariosAdmin(tipoAtivo);
    }
}

/**
 * Cria um novo usuário (Admin)
 */
document.addEventListener('DOMContentLoaded', () => {
    const formCriarUsuarioAdmin = document.getElementById('form-criar-usuario-admin');
    if (formCriarUsuarioAdmin) {
        formCriarUsuarioAdmin.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('admin-novo-nome').value;
            const email = document.getElementById('admin-novo-email').value;
            const senha = document.getElementById('admin-novo-senha').value;
            const contacto = document.getElementById('admin-novo-contacto').value;
            const tipo = document.getElementById('admin-novo-tipo').value;
            const disciplina = document.getElementById('admin-novo-disciplina').value;
            const preco = parseInt(document.getElementById('admin-novo-preco').value) || 0;

            try {
                const dados = { nome, email, senha, contacto, tipo };
                if (tipo === 'professor') {
                    dados.disciplina = disciplina;
                    dados.preco = preco;
                    dados.provincia = 'Luanda';
                    dados.avaliacao = 5.0;
                }
                gestorDados.criarUsuario(dados);
                mostrarMensagem('Usuário criado com sucesso!', 'sucesso');
                formCriarUsuarioAdmin.reset();
                atualizarListaUsuariosAdmin('professores');
            } catch (erro) {
                mostrarMensagem(erro.message, 'erro');
            }
        });
    }
});

// ============================================================================
// MENU LATERAL E ABAS
// ============================================================================

/**
 * Gerencia o menu lateral e as secções
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.item-menu').forEach(item => {
        item.addEventListener('click', (e) => {
            const secao = e.target.dataset.secao;
            
            document.querySelectorAll('.item-menu').forEach(i => i.classList.remove('ativo'));
            document.querySelectorAll('.secao-painel').forEach(s => s.classList.remove('ativa'));

            e.target.classList.add('ativo');
            const secaoElement = document.getElementById(`secao-${secao}`);
            if (secaoElement) {
                secaoElement.classList.add('ativa');

                // Carrega dados específicos
                if (secao === 'perfil-aluno') {
                    carregarPerfilAluno();
                } else if (secao === 'agendamentos-aluno') {
                    atualizarAgendamentosAluno();
                } else if (secao === 'encontrar-professores') {
                    renderizarProfessores(gestorDados.obterUsuariosPorTipo('professor'), 'grade-professores-aluno');
                } else if (secao === 'perfil-professor') {
                    carregarPerfilProfessor();
                } else if (secao === 'pedidos-aula') {
                    atualizarPedidosAula();
                } else if (secao === 'dashboard-admin') {
                    atualizarDashboardAdmin();
                } else if (secao === 'usuarios-admin') {
                    atualizarListaUsuariosAdmin('professores');
                }
            }
        });
    });
});

/**
 * Gerencia as abas de usuários no admin
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.aba-usuarios').forEach(aba => {
        aba.addEventListener('click', (e) => {
            document.querySelectorAll('.aba-usuarios').forEach(a => a.classList.remove('aba-ativa'));
            e.target.classList.add('aba-ativa');
            atualizarListaUsuariosAdmin(e.target.dataset.tipo);
        });
    });
});

// ============================================================================
// FILTROS E BUSCA
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Filtros na vista pública
    document.querySelectorAll('.filtro-item').forEach(filtro => {
        filtro.addEventListener('click', (e) => {
            document.querySelectorAll('.filtro-item').forEach(f => f.classList.remove('ativo'));
            e.target.classList.add('ativo');
            filtrarProfessores();
        });
    });

    // Botão de busca
    document.getElementById('btn-buscar').addEventListener('click', filtrarProfessores);
    document.getElementById('busca-disciplina').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filtrarProfessores();
    });
});

// ============================================================================
// CAMPOS CONDICIONAIS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar/ocultar disciplina e preço no registo
    const registoTipo = document.getElementById('registo-tipo');
    if (registoTipo) {
        registoTipo.addEventListener('change', (e) => {
            const grupoDisc = document.getElementById('grupo-disciplina');
            const grupoPreco = document.getElementById('grupo-preco');
            if (e.target.value === 'professor') {
                grupoDisc.style.display = 'block';
                grupoPreco.style.display = 'block';
            } else {
                grupoDisc.style.display = 'none';
                grupoPreco.style.display = 'none';
            }
        });
    }

    // Admin: Mostrar/ocultar disciplina e preço
    const adminTipo = document.getElementById('admin-novo-tipo');
    if (adminTipo) {
        adminTipo.addEventListener('change', (e) => {
            const grupoDisc = document.getElementById('grupo-admin-disciplina');
            const grupoPreco = document.getElementById('grupo-admin-preco');
            if (e.target.value === 'professor') {
                grupoDisc.style.display = 'block';
                grupoPreco.style.display = 'block';
            } else {
                grupoDisc.style.display = 'none';
                grupoPreco.style.display = 'none';
            }
        });
    }
});

// ============================================================================
// MENSAGENS DE FEEDBACK
// ============================================================================

/**
 * Mostra uma mensagem de feedback ao utilizador
 */
function mostrarMensagem(texto, tipo = 'sucesso') {
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem ${tipo}`;
    mensagem.textContent = texto;

    const conteudoPrincipal = document.getElementById('conteudo-principal');
    conteudoPrincipal.insertBefore(mensagem, conteudoPrincipal.firstChild);

    setTimeout(() => {
        mensagem.remove();
    }, 4000);
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a interface
    gerenciadorVistas.atualizarInterfaceAutenticacao();

    // Se o utilizador está autenticado, mostra a vista apropriada
    if (gestorAutenticacao.estaAutenticado()) {
        gerenciadorVistas.mostrarVistaUsuario();
    } else {
        gerenciadorVistas.mudarPara('publica');
        renderizarProfessores(gestorDados.obterUsuariosPorTipo('professor'));
    }
});
