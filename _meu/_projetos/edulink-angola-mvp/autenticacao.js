/**
 * Módulo de Autenticação - EduLink Angola
 * Gerencia login, logout e sessão do utilizador
 */

class GestorAutenticacao {
    constructor() {
        this.usuarioAtual = this.obterSessao();
    }

    /**
     * Realiza o login do usuário
     */
    fazerLogin(email, senha) {
        const usuario = gestorDados.obterUsuarioPorEmail(email);

        if (!usuario) {
            throw new Error('Email não encontrado.');
        }

        if (usuario.senha !== senha) {
            throw new Error('Senha incorreta.');
        }

        if (!usuario.ativo) {
            throw new Error('Conta bloqueada. Contacte o administrador.');
        }

        this.usuarioAtual = usuario;
        this.guardarSessao(usuario);
        return usuario;
    }

    /**
     * Realiza o registo de um novo usuário
     */
    fazerRegisto(dados) {
        if (!dados.nome || !dados.email || !dados.senha || !dados.contacto || !dados.tipo) {
            throw new Error('Preencha todos os campos obrigatórios.');
        }

        if (dados.tipo === 'professor' && (!dados.disciplina || !dados.preco)) {
            throw new Error('Professores devem indicar disciplina e preço.');
        }

        const novoUsuario = gestorDados.criarUsuario(dados);
        this.usuarioAtual = novoUsuario;
        this.guardarSessao(novoUsuario);
        return novoUsuario;
    }

    /**
     * Faz logout do usuário
     */
    fazerLogout() {
        this.usuarioAtual = null;
        localStorage.removeItem('edulink_sessao');
    }

    /**
     * Guarda a sessão do usuário no localStorage
     */
    guardarSessao(usuario) {
        localStorage.setItem('edulink_sessao', JSON.stringify({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            dataSessao: new Date().toISOString()
        }));
    }

    /**
     * Obtém a sessão do usuário do localStorage
     */
    obterSessao() {
        const sessao = localStorage.getItem('edulink_sessao');
        if (sessao) {
            try {
                return JSON.parse(sessao);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    /**
     * Verifica se o usuário está autenticado
     */
    estaAutenticado() {
        return this.usuarioAtual !== null;
    }

    /**
     * Obtém o tipo de usuário atual
     */
    obterTipoUsuario() {
        return this.usuarioAtual ? this.usuarioAtual.tipo : null;
    }

    /**
     * Obtém o ID do usuário atual
     */
    obterIdUsuarioAtual() {
        return this.usuarioAtual ? this.usuarioAtual.id : null;
    }

    /**
     * Obtém os dados completos do usuário atual
     */
    obterDadosUsuarioAtual() {
        if (!this.usuarioAtual) return null;
        return gestorDados.obterUsuarioPorId(this.usuarioAtual.id);
    }
}

// Instância global do gestor de autenticação
const gestorAutenticacao = new GestorAutenticacao();
