const express = require('express');
const { bd, gerarUuid } = require('../baseDados');
const { verificarToken, verificarAdmin } = require('../middleware/autenticacao');

const roteadorCursos = express.Router();

// GET /api/cursos — listar todos os cursos
roteadorCursos.get('/', (req, res) => {
  try {
    const cursos = bd.prepare(`
      SELECT c.*,
        (SELECT COUNT(*) FROM modulos m WHERE m.id_curso = c.id_curso) as total_modulos,
        (SELECT COUNT(*) FROM aulas a WHERE a.id_curso = c.id_curso) as total_aulas,
        (SELECT COUNT(*) FROM inscricoes i WHERE i.id_curso = c.id_curso) as total_inscritos
      FROM cursos c
      WHERE c.publicado = 1
      ORDER BY c.data_criacao ASC
    `).all();
    res.json({ cursos });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar cursos.' });
  }
});

// GET /api/cursos/:idCurso — detalhes de um curso
roteadorCursos.get('/:idCurso', (req, res) => {
  try {
    const { idCurso } = req.params;
    const curso = bd.prepare('SELECT * FROM cursos WHERE id_curso = ?').get(idCurso);
    if (!curso) return res.status(404).json({ erro: 'Curso não encontrado.' });

    const modulos = bd.prepare('SELECT * FROM modulos WHERE id_curso = ? ORDER BY ordem').all(idCurso);
    for (const modulo of modulos) {
      modulo.aulas = bd.prepare('SELECT * FROM aulas WHERE id_modulo = ? ORDER BY ordem').all(modulo.id_modulo);
    }

    res.json({ curso, modulos });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar curso.' });
  }
});

// POST /api/cursos/:idCurso/inscrever
roteadorCursos.post('/:idCurso/inscrever', verificarToken, (req, res) => {
  try {
    const { idCurso } = req.params;
    const idAluno = req.utilizador.id_aluno;

    const curso = bd.prepare('SELECT id_curso FROM cursos WHERE id_curso = ?').get(idCurso);
    if (!curso) return res.status(404).json({ erro: 'Curso não encontrado.' });

    const inscricaoExistente = bd.prepare('SELECT id_inscricao FROM inscricoes WHERE id_aluno = ? AND id_curso = ?').get(idAluno, idCurso);
    if (inscricaoExistente) {
      return res.status(409).json({ erro: 'Já estás inscrito neste curso.' });
    }

    bd.prepare('INSERT INTO inscricoes (id_inscricao, id_aluno, id_curso) VALUES (?, ?, ?)').run(gerarUuid(), idAluno, idCurso);
    res.status(201).json({ mensagem: 'Inscrição realizada com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao realizar inscrição.' });
  }
});

// GET /api/cursos/:idCurso/progresso
roteadorCursos.get('/:idCurso/progresso', verificarToken, (req, res) => {
  try {
    const { idCurso } = req.params;
    const idAluno = req.utilizador.id_aluno;

    const totalAulas = bd.prepare('SELECT COUNT(*) as total FROM aulas WHERE id_curso = ?').get(idCurso);
    const aulasConcluidas = bd.prepare(`
      SELECT COUNT(*) as total FROM progresso
      WHERE id_aluno = ? AND id_curso = ? AND concluido = 1
    `).get(idAluno, idCurso);

    const percentagem = totalAulas.total > 0
      ? Math.round((aulasConcluidas.total / totalAulas.total) * 100)
      : 0;

    const aulasProgresso = bd.prepare(`
      SELECT a.id_aula, a.titulo, COALESCE(p.concluido, 0) as concluido
      FROM aulas a
      LEFT JOIN progresso p ON p.id_aula = a.id_aula AND p.id_aluno = ?
      WHERE a.id_curso = ?
      ORDER BY a.ordem
    `).all(idAluno, idCurso);

    res.json({
      percentagem,
      total_aulas: totalAulas.total,
      aulas_concluidas: aulasConcluidas.total,
      aulas: aulasProgresso
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar progresso.' });
  }
});

// POST /api/cursos/aulas/:idAula/concluir
roteadorCursos.post('/aulas/:idAula/concluir', verificarToken, (req, res) => {
  try {
    const { idAula } = req.params;
    const idAluno = req.utilizador.id_aluno;

    const aula = bd.prepare('SELECT * FROM aulas WHERE id_aula = ?').get(idAula);
    if (!aula) return res.status(404).json({ erro: 'Aula não encontrada.' });

    const progressoExistente = bd.prepare('SELECT id_progresso FROM progresso WHERE id_aluno = ? AND id_aula = ?').get(idAluno, idAula);

    if (progressoExistente) {
      bd.prepare('UPDATE progresso SET concluido = 1, data_conclusao = datetime("now") WHERE id_aluno = ? AND id_aula = ?').run(idAluno, idAula);
    } else {
      bd.prepare('INSERT INTO progresso (id_progresso, id_aluno, id_aula, id_curso, concluido, data_conclusao) VALUES (?, ?, ?, ?, 1, datetime("now"))').run(gerarUuid(), idAluno, idAula, aula.id_curso);
    }

    // Verificar se o curso foi concluído
    const totalAulas = bd.prepare('SELECT COUNT(*) as total FROM aulas WHERE id_curso = ?').get(aula.id_curso);
    const aulasConcluidas = bd.prepare('SELECT COUNT(*) as total FROM progresso WHERE id_aluno = ? AND id_curso = ? AND concluido = 1').get(idAluno, aula.id_curso);

    let certificadoGerado = false;
    if (totalAulas.total > 0 && aulasConcluidas.total >= totalAulas.total) {
      bd.prepare('UPDATE inscricoes SET concluido = 1, data_conclusao = datetime("now") WHERE id_aluno = ? AND id_curso = ?').run(idAluno, aula.id_curso);

      const certExistente = bd.prepare('SELECT id_certificado FROM certificados WHERE id_aluno = ? AND id_curso = ?').get(idAluno, aula.id_curso);
      if (!certExistente) {
        const codigoVerificacao = 'RT-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        bd.prepare('INSERT INTO certificados (id_certificado, id_aluno, id_curso, codigo_verificacao) VALUES (?, ?, ?, ?)').run(gerarUuid(), idAluno, aula.id_curso, codigoVerificacao);
        certificadoGerado = true;
      }
    }

    res.json({ mensagem: 'Aula marcada como concluída!', certificadoGerado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao marcar aula como concluída.' });
  }
});

// GET /api/cursos/aulas/:idAula/quiz
roteadorCursos.get('/aulas/:idAula/quiz', verificarToken, (req, res) => {
  try {
    const { idAula } = req.params;
    const perguntas = bd.prepare('SELECT id_quiz, pergunta, opcao_a, opcao_b, opcao_c, opcao_d FROM quizzes WHERE id_aula = ?').all(idAula);
    res.json({ perguntas });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar quiz.' });
  }
});

// POST /api/cursos/aulas/:idAula/quiz/responder
roteadorCursos.post('/aulas/:idAula/quiz/responder', verificarToken, (req, res) => {
  try {
    const { idAula } = req.params;
    const { respostas } = req.body;
    const idAluno = req.utilizador.id_aluno;

    const perguntas = bd.prepare('SELECT * FROM quizzes WHERE id_aula = ?').all(idAula);
    let corretas = 0;

    for (const pergunta of perguntas) {
      const respostaDada = respostas[pergunta.id_quiz];
      const correto = respostaDada === pergunta.resposta_correta ? 1 : 0;
      if (correto) corretas++;

      bd.prepare('INSERT OR REPLACE INTO respostas_quiz (id_resposta, id_aluno, id_quiz, resposta_dada, correto) VALUES (?, ?, ?, ?, ?)').run(gerarUuid(), idAluno, pergunta.id_quiz, respostaDada || '', correto);
    }

    const pontuacao = perguntas.length > 0 ? Math.round((corretas / perguntas.length) * 100) : 0;
    res.json({ pontuacao, corretas, total: perguntas.length, aprovado: pontuacao >= 70 });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao processar respostas do quiz.' });
  }
});

// GET /api/cursos/certificados/meus
roteadorCursos.get('/certificados/meus', verificarToken, (req, res) => {
  try {
    const idAluno = req.utilizador.id_aluno;
    const certificados = bd.prepare(`
      SELECT cert.*, c.titulo as titulo_curso, a.nome as nome_aluno
      FROM certificados cert
      JOIN cursos c ON c.id_curso = cert.id_curso
      JOIN alunos a ON a.id_aluno = cert.id_aluno
      WHERE cert.id_aluno = ?
      ORDER BY cert.data_emissao DESC
    `).all(idAluno);
    res.json({ certificados });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar certificados.' });
  }
});

// GET /api/cursos/certificados/verificar/:codigo
roteadorCursos.get('/certificados/verificar/:codigo', (req, res) => {
  try {
    const { codigo } = req.params;
    const certificado = bd.prepare(`
      SELECT cert.*, c.titulo as titulo_curso, a.nome as nome_aluno
      FROM certificados cert
      JOIN cursos c ON c.id_curso = cert.id_curso
      JOIN alunos a ON a.id_aluno = cert.id_aluno
      WHERE cert.codigo_verificacao = ?
    `).get(codigo);

    if (!certificado) return res.status(404).json({ erro: 'Certificado não encontrado.' });
    res.json({ certificado, valido: true });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao verificar certificado.' });
  }
});

module.exports = roteadorCursos;
