/**
 * Gestor de Dados - EduLink Angola
 * Gerencia toda a persistência de dados via localStorage
 */

class GestorDados {
    constructor() {
        this.inicializarArmazenamento();
    }

    /**
     * Inicializa o localStorage com dados padrão se estiver vazio
     */
    inicializarArmazenamento() {
        if (!localStorage.getItem('edulink_usuarios')) {
            this.criarDadosPadrao();
        }
    }

    /**
     * Cria os dados padrão para a primeira utilização
     */
    criarDadosPadrao() {
        const dadosPadrao = {
            usuarios: [
                {
                    id: 'prof_001',
                    nome: 'Dr. António Manuel',
                    email: 'antonio@edulink.ao',
                    senha: 'senha123',
                    contacto: '+244912345678',
                    tipo: 'professor',
                    disciplina: 'Matemática',
                    preco: 5000,
                    provincia: 'Luanda',
                    avaliacao: 4.9,
                    ativo: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'prof_002',
                    nome: 'Prof.ª Maria Isabel',
                    email: 'maria@edulink.ao',
                    senha: 'senha123',
                    contacto: '+244912345679',
                    tipo: 'professor',
                    disciplina: 'Português',
                    preco: 4500,
                    provincia: 'Benguela',
                    avaliacao: 4.8,
                    ativo: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'prof_003',
                    nome: 'Eng.º Carlos José',
                    email: 'carlos@edulink.ao',
                    senha: 'senha123',
                    contacto: '+244912345680',
                    tipo: 'professor',
                    disciplina: 'Física',
                    preco: 6000,
                    provincia: 'Huambo',
                    avaliacao: 5.0,
                    ativo: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'prof_004',
                    nome: 'Dr.ª Sofia Lima',
                    email: 'sofia@edulink.ao',
                    senha: 'senha123',
                    contacto: '+244912345681',
                    tipo: 'professor',
                    disciplina: 'Inglês',
                    preco: 5500,
                    provincia: 'Luanda',
                    avaliacao: 4.7,
                    ativo: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'prof_005',
                    nome: 'Prof. Ricardo Santos',
                    email: 'ricardo@edulink.ao',
                    senha: 'senha123',
                    contacto: '+244912345682',
                    tipo: 'professor',
                    disciplina: 'Química',
                    preco: 4800,
                    provincia: 'Huíla',
                    avaliacao: 4.6,
                    ativo: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'aluno_001',
                    nome: 'João Silva',
                    email: 'joao@example.com',
                    senha: 'senha123',
                    contacto: '+244912345683',
                    tipo: 'aluno',
                    morada: 'Rua Principal, Luanda',
                    ativo: true,
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 'admin_001',
                    nome: 'Administrador',
                    email: 'admin@edulink.ao',
                    senha: 'admin123',
                    contacto: '+244912345684',
                    tipo: 'admin',
                    ativo: true,
                    dataCriacao: new Date().toISOString()
                }
            ],
            agendamentos: [],
            configuracoes: {
                taxaPlataforma: 0.1,
                moedaPadrao: 'Kz'
            }
        };

        localStorage.setItem('edulink_usuarios', JSON.stringify(dadosPadrao.usuarios));
        localStorage.setItem('edulink_agendamentos', JSON.stringify(dadosPadrao.agendamentos));
        localStorage.setItem('edulink_configuracoes', JSON.stringify(dadosPadrao.configuracoes));
    }

    /**
     * Obtém todos os usuários
     */
    obterTodosUsuarios() {
        const usuarios = localStorage.getItem('edulink_usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    /**
     * Obtém usuários por tipo
     */
    obterUsuariosPorTipo(tipo) {
        const usuarios = this.obterTodosUsuarios();
        return usuarios.filter(u => u.tipo === tipo && u.ativo);
    }

    /**
     * Obtém um usuário por ID
     */
    obterUsuarioPorId(id) {
        const usuarios = this.obterTodosUsuarios();
        return usuarios.find(u => u.id === id);
    }

    /**
     * Obtém um usuário por email
     */
    obterUsuarioPorEmail(email) {
        const usuarios = this.obterTodosUsuarios();
        return usuarios.find(u => u.email === email);
    }

    /**
     * Cria um novo usuário
     */
    criarUsuario(dados) {
        const usuarios = this.obterTodosUsuarios();
        
        // Verifica se o email já existe
        if (usuarios.some(u => u.email === dados.email)) {
            throw new Error('Email já registado na plataforma.');
        }

        const novoUsuario = {
            id: `${dados.tipo}_${Date.now()}`,
            ...dados,
            ativo: true,
            dataCriacao: new Date().toISOString()
        };

        usuarios.push(novoUsuario);
        localStorage.setItem('edulink_usuarios', JSON.stringify(usuarios));
        return novoUsuario;
    }

    /**
     * Atualiza um usuário
     */
    atualizarUsuario(id, dados) {
        const usuarios = this.obterTodosUsuarios();
        const indice = usuarios.findIndex(u => u.id === id);

        if (indice === -1) {
            throw new Error('Usuário não encontrado.');
        }

        usuarios[indice] = {
            ...usuarios[indice],
            ...dados,
            id: usuarios[indice].id,
            dataCriacao: usuarios[indice].dataCriacao
        };

        localStorage.setItem('edulink_usuarios', JSON.stringify(usuarios));
        return usuarios[indice];
    }

    /**
     * Remove ou bloqueia um usuário
     */
    removerUsuario(id) {
        const usuarios = this.obterTodosUsuarios();
        const indice = usuarios.findIndex(u => u.id === id);

        if (indice === -1) {
            throw new Error('Usuário não encontrado.');
        }

        usuarios[indice].ativo = false;
        localStorage.setItem('edulink_usuarios', JSON.stringify(usuarios));
    }

    /**
     * Obtém todos os agendamentos
     */
    obterTodosAgendamentos() {
        const agendamentos = localStorage.getItem('edulink_agendamentos');
        return agendamentos ? JSON.parse(agendamentos) : [];
    }

    /**
     * Obtém agendamentos de um usuário
     */
    obterAgendamentosUsuario(idUsuario) {
        const agendamentos = this.obterTodosAgendamentos();
        return agendamentos.filter(a => a.idAluno === idUsuario || a.idProfessor === idUsuario);
    }

    /**
     * Cria um novo agendamento
     */
    criarAgendamento(dados) {
        const agendamentos = this.obterTodosAgendamentos();
        
        const novoAgendamento = {
            id: `agend_${Date.now()}`,
            ...dados,
            status: 'pendente',
            dataCriacao: new Date().toISOString()
        };

        agendamentos.push(novoAgendamento);
        localStorage.setItem('edulink_agendamentos', JSON.stringify(agendamentos));
        return novoAgendamento;
    }

    /**
     * Atualiza um agendamento
     */
    atualizarAgendamento(id, dados) {
        const agendamentos = this.obterTodosAgendamentos();
        const indice = agendamentos.findIndex(a => a.id === id);

        if (indice === -1) {
            throw new Error('Agendamento não encontrado.');
        }

        agendamentos[indice] = {
            ...agendamentos[indice],
            ...dados
        };

        localStorage.setItem('edulink_agendamentos', JSON.stringify(agendamentos));
        return agendamentos[indice];
    }

    /**
     * Cancela um agendamento
     */
    cancelarAgendamento(id) {
        return this.atualizarAgendamento(id, { status: 'cancelado' });
    }

    /**
     * Calcula o valor total de agendamentos
     */
    calcularValorTotal() {
        const agendamentos = this.obterTodosAgendamentos();
        return agendamentos
            .filter(a => a.status !== 'cancelado')
            .reduce((total, a) => total + (a.valor || 0), 0);
    }

    /**
     * Calcula o valor mensal de agendamentos
     */
    calcularValorMensal() {
        const agendamentos = this.obterTodosAgendamentos();
        const meses = {};

        agendamentos
            .filter(a => a.status !== 'cancelado')
            .forEach(a => {
                const data = new Date(a.dataCriacao);
                const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
                meses[mes] = (meses[mes] || 0) + (a.valor || 0);
            });

        return meses;
    }

    /**
     * Obtém estatísticas gerais
     */
    obterEstatisticas() {
        const usuarios = this.obterTodosUsuarios();
        const agendamentos = this.obterTodosAgendamentos();

        return {
            totalProfessores: usuarios.filter(u => u.tipo === 'professor' && u.ativo).length,
            totalAlunos: usuarios.filter(u => u.tipo === 'aluno' && u.ativo).length,
            totalAgendamentos: agendamentos.filter(a => a.status !== 'cancelado').length,
            valorTotal: this.calcularValorTotal(),
            valorMensal: this.calcularValorMensal()
        };
    }
}

// Instância global do gestor de dados
const gestorDados = new GestorDados();
