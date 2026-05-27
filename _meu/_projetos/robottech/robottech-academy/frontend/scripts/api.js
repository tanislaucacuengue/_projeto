// ===== MÓDULO DE API =====
// Comunicação com o backend Node.js

const URL_BASE_API = '/api';

// Obter token de autenticação
function obterToken() {
  return localStorage.getItem('robottech_token');
}

// Cabeçalhos padrão para requisições autenticadas
function obterCabecalhos(autenticado = false) {
  const cabecalhos = { 'Content-Type': 'application/json' };
  if (autenticado) {
    const token = obterToken();
    if (token) cabecalhos['Authorization'] = `Bearer ${token}`;
  }
  return cabecalhos;
}

// Função genérica de requisição HTTP
async function fazerRequisicao(endpoint, opcoes = {}) {
  try {
    const resposta = await fetch(`${URL_BASE_API}${endpoint}`, opcoes);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || `Erro ${resposta.status}`);
    }

    return dados;
  } catch (erro) {
    if (erro.name === 'TypeError') {
      throw new Error('Erro de conexão com o servidor.');
    }
    throw erro;
  }
}

// ===== AUTENTICAÇÃO =====
const apiAutenticacao = {
  async registar(nome, email, senha) {
    return fazerRequisicao('/auth/registar', {
      method: 'POST',
      headers: obterCabecalhos(),
      body: JSON.stringify({ nome, email, senha })
    });
  },

  async entrar(email, senha) {
    return fazerRequisicao('/auth/entrar', {
      method: 'POST',
      headers: obterCabecalhos(),
      body: JSON.stringify({ email, senha })
    });
  },

  async obterPerfil() {
    return fazerRequisicao('/auth/perfil', {
      headers: obterCabecalhos(true)
    });
  },

  async atualizarPerfil(dados) {
    return fazerRequisicao('/auth/perfil', {
      method: 'PUT',
      headers: obterCabecalhos(true),
      body: JSON.stringify(dados)
    });
  }
};

// ===== CURSOS =====
const apiCursos = {
  async listarTodos() {
    return fazerRequisicao('/cursos');
  },

  async obterDetalhe(idCurso) {
    return fazerRequisicao(`/cursos/${idCurso}`);
  },

  async inscrever(idCurso) {
    return fazerRequisicao(`/cursos/${idCurso}/inscrever`, {
      method: 'POST',
      headers: obterCabecalhos(true)
    });
  },

  async obterProgresso(idCurso) {
    return fazerRequisicao(`/cursos/${idCurso}/progresso`, {
      headers: obterCabecalhos(true)
    });
  },

  async concluirAula(idAula) {
    return fazerRequisicao(`/cursos/aulas/${idAula}/concluir`, {
      method: 'POST',
      headers: obterCabecalhos(true)
    });
  },

  async obterQuiz(idAula) {
    return fazerRequisicao(`/cursos/aulas/${idAula}/quiz`, {
      headers: obterCabecalhos(true)
    });
  },

  async responderQuiz(idAula, respostas) {
    return fazerRequisicao(`/cursos/aulas/${idAula}/quiz/responder`, {
      method: 'POST',
      headers: obterCabecalhos(true),
      body: JSON.stringify({ respostas })
    });
  },

  async listarCertificados() {
    return fazerRequisicao('/cursos/certificados/meus', {
      headers: obterCabecalhos(true)
    });
  },

  async verificarCertificado(codigo) {
    return fazerRequisicao(`/cursos/certificados/verificar/${codigo}`);
  }
};

// ===== ADMIN =====
const apiAdmin = {
  async obterEstatisticas() {
    return fazerRequisicao('/admin/estatisticas', {
      headers: obterCabecalhos(true)
    });
  },

  async listarAlunos() {
    return fazerRequisicao('/admin/alunos', {
      headers: obterCabecalhos(true)
    });
  },

  async listarCursos() {
    return fazerRequisicao('/admin/cursos', {
      headers: obterCabecalhos(true)
    });
  },

  async criarCurso(dados) {
    return fazerRequisicao('/admin/cursos', {
      method: 'POST',
      headers: obterCabecalhos(true),
      body: JSON.stringify(dados)
    });
  },

  async atualizarCurso(idCurso, dados) {
    return fazerRequisicao(`/admin/cursos/${idCurso}`, {
      method: 'PUT',
      headers: obterCabecalhos(true),
      body: JSON.stringify(dados)
    });
  },

  async eliminarCurso(idCurso) {
    return fazerRequisicao(`/admin/cursos/${idCurso}`, {
      method: 'DELETE',
      headers: obterCabecalhos(true)
    });
  },

  async criarModulo(idCurso, dados) {
    return fazerRequisicao(`/admin/cursos/${idCurso}/modulos`, {
      method: 'POST',
      headers: obterCabecalhos(true),
      body: JSON.stringify(dados)
    });
  },

  async criarAula(idModulo, dados) {
    return fazerRequisicao(`/admin/modulos/${idModulo}/aulas`, {
      method: 'POST',
      headers: obterCabecalhos(true),
      body: JSON.stringify(dados)
    });
  },

  async atualizarAula(idAula, dados) {
    return fazerRequisicao(`/admin/aulas/${idAula}`, {
      method: 'PUT',
      headers: obterCabecalhos(true),
      body: JSON.stringify(dados)
    });
  },

  async eliminarAula(idAula) {
    return fazerRequisicao(`/admin/aulas/${idAula}`, {
      method: 'DELETE',
      headers: obterCabecalhos(true)
    });
  },

  async criarQuiz(dados) {
    return fazerRequisicao('/admin/quizzes', {
      method: 'POST',
      headers: obterCabecalhos(true),
      body: JSON.stringify(dados)
    });
  },

  async fazerUpload(ficheiro) {
    const formulario = new FormData();
    formulario.append('ficheiro', ficheiro);
    const token = obterToken();
    const resposta = await fetch(`${URL_BASE_API}/admin/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formulario
    });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || 'Erro no upload');
    return dados;
  }
};
