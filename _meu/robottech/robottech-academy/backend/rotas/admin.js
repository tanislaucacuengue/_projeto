const express = require('express');
const { bd, gerarUuid } = require('../baseDados');
const { verificarAdmin } = require('../middleware/autenticacao');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const roteadorAdmin = express.Router();

// Configuração do upload de ficheiros
const pastaUploads = path.join(__dirname, '../publico/uploads');
if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads, { recursive: true });
}

const configuracaoArmazenamento = multer.diskStorage({
  destination: (req, ficheiro, cb) => cb(null, pastaUploads),
  filename: (req, ficheiro, cb) => {
    const nomeUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, nomeUnico + path.extname(ficheiro.originalname));
  }
});

const upload = multer({
  storage: configuracaoArmazenamento,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, ficheiro, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|gif|mp4|webm|avi|mov/;
    const extname = tiposPermitidos.test(path.extname(ficheiro.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error('Tipo de ficheiro não suportado.'));
  }
});

// GET /api/admin/estatisticas
roteadorAdmin.get('/estatisticas', verificarAdmin, (req, res) => {
  try {
    const totalAlunos = bd.prepare("SELECT COUNT(*) as total FROM alunos WHERE papel = 'aluno'").get();
    const totalCursos = bd.prepare('SELECT COUNT(*) as total FROM cursos').get();
    const totalInscricoes = bd.prepare('SELECT COUNT(*) as total FROM inscricoes').get();
    const totalCertificados = bd.prepare('SELECT COUNT(*) as total FROM certificados').get();
    const cursosPopulares = bd.prepare(`
      SELECT c.titulo, COUNT(i.id_inscricao) as total_inscritos
      FROM cursos c
      LEFT JOIN inscricoes i ON i.id_curso = c.id_curso
      GROUP BY c.id_curso
      ORDER BY total_inscritos DESC
      LIMIT 5
    `).all();
    const alunosRecentes = bd.prepare("SELECT id_aluno, nome, email, data_registo FROM alunos WHERE papel = 'aluno' ORDER BY data_registo DESC LIMIT 10").all();

    res.json({
      total_alunos: totalAlunos.total,
      total_cursos: totalCursos.total,
      total_inscricoes: totalInscricoes.total,
      total_certificados: totalCertificados.total,
      cursos_populares: cursosPopulares,
      alunos_recentes: alunosRecentes
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar estatísticas.' });
  }
});

// GET /api/admin/alunos
roteadorAdmin.get('/alunos', verificarAdmin, (req, res) => {
  try {
    const alunos = bd.prepare("SELECT a.id_aluno, a.nome, a.email, a.data_registo, a.ativo, COUNT(DISTINCT i.id_curso) as cursos_inscritos, COUNT(DISTINCT cert.id_certificado) as certificados FROM alunos a LEFT JOIN inscricoes i ON i.id_aluno = a.id_aluno LEFT JOIN certificados cert ON cert.id_aluno = a.id_aluno WHERE a.papel = 'aluno' GROUP BY a.id_aluno ORDER BY a.data_registo DESC").all();
    res.json({ alunos });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar alunos.' });
  }
});

// POST /api/admin/cursos
roteadorAdmin.post('/cursos', verificarAdmin, (req, res) => {
  try {
    const { titulo, descricao, categoria, nivel, duracao_horas } = req.body;
    if (!titulo) return res.status(400).json({ erro: 'Título é obrigatório.' });

    const idCurso = gerarUuid();
    bd.prepare('INSERT INTO cursos (id_curso, titulo, descricao, categoria, nivel, duracao_horas) VALUES (?, ?, ?, ?, ?, ?)').run(idCurso, titulo, descricao || '', categoria || '', nivel || 'iniciante', duracao_horas || 0);
    res.status(201).json({ mensagem: 'Curso criado com sucesso!', id_curso: idCurso });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar curso.' });
  }
});

// PUT /api/admin/cursos/:idCurso
roteadorAdmin.put('/cursos/:idCurso', verificarAdmin, (req, res) => {
  try {
    const { idCurso } = req.params;
    const { titulo, descricao, categoria, nivel, duracao_horas, publicado } = req.body;
    bd.prepare('UPDATE cursos SET titulo = ?, descricao = ?, categoria = ?, nivel = ?, duracao_horas = ?, publicado = ? WHERE id_curso = ?').run(titulo, descricao, categoria, nivel, duracao_horas, publicado !== undefined ? publicado : 1, idCurso);
    res.json({ mensagem: 'Curso atualizado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar curso.' });
  }
});

// DELETE /api/admin/cursos/:idCurso
roteadorAdmin.delete('/cursos/:idCurso', verificarAdmin, (req, res) => {
  try {
    const { idCurso } = req.params;
    bd.prepare('DELETE FROM cursos WHERE id_curso = ?').run(idCurso);
    res.json({ mensagem: 'Curso eliminado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao eliminar curso.' });
  }
});

// POST /api/admin/cursos/:idCurso/modulos
roteadorAdmin.post('/cursos/:idCurso/modulos', verificarAdmin, (req, res) => {
  try {
    const { idCurso } = req.params;
    const { titulo, ordem } = req.body;
    if (!titulo) return res.status(400).json({ erro: 'Título é obrigatório.' });

    const idModulo = gerarUuid();
    bd.prepare('INSERT INTO modulos (id_modulo, id_curso, titulo, ordem) VALUES (?, ?, ?, ?)').run(idModulo, idCurso, titulo, ordem || 0);
    res.status(201).json({ mensagem: 'Módulo criado com sucesso!', id_modulo: idModulo });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar módulo.' });
  }
});

// POST /api/admin/modulos/:idModulo/aulas
roteadorAdmin.post('/modulos/:idModulo/aulas', verificarAdmin, (req, res) => {
  try {
    const { idModulo } = req.params;
    const { titulo, descricao, video_url, duracao_minutos, ordem } = req.body;
    if (!titulo) return res.status(400).json({ erro: 'Título é obrigatório.' });

    const modulo = bd.prepare('SELECT id_curso FROM modulos WHERE id_modulo = ?').get(idModulo);
    if (!modulo) return res.status(404).json({ erro: 'Módulo não encontrado.' });

    const idAula = gerarUuid();
    bd.prepare('INSERT INTO aulas (id_aula, id_modulo, id_curso, titulo, descricao, video_url, duracao_minutos, ordem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(idAula, idModulo, modulo.id_curso, titulo, descricao || '', video_url || '', duracao_minutos || 0, ordem || 0);
    res.status(201).json({ mensagem: 'Aula criada com sucesso!', id_aula: idAula });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar aula.' });
  }
});

// PUT /api/admin/aulas/:idAula
roteadorAdmin.put('/aulas/:idAula', verificarAdmin, (req, res) => {
  try {
    const { idAula } = req.params;
    const { titulo, descricao, video_url, duracao_minutos } = req.body;
    bd.prepare('UPDATE aulas SET titulo = ?, descricao = ?, video_url = ?, duracao_minutos = ? WHERE id_aula = ?').run(titulo, descricao, video_url, duracao_minutos, idAula);
    res.json({ mensagem: 'Aula atualizada com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar aula.' });
  }
});

// DELETE /api/admin/aulas/:idAula
roteadorAdmin.delete('/aulas/:idAula', verificarAdmin, (req, res) => {
  try {
    const { idAula } = req.params;
    bd.prepare('DELETE FROM aulas WHERE id_aula = ?').run(idAula);
    res.json({ mensagem: 'Aula eliminada com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao eliminar aula.' });
  }
});

// POST /api/admin/upload
roteadorAdmin.post('/upload', verificarAdmin, upload.single('ficheiro'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ erro: 'Nenhum ficheiro enviado.' });
    const urlFicheiro = `/uploads/${req.file.filename}`;
    res.json({ mensagem: 'Ficheiro enviado com sucesso!', url: urlFicheiro, nome: req.file.filename });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao fazer upload.' });
  }
});

// POST /api/admin/quizzes
roteadorAdmin.post('/quizzes', verificarAdmin, (req, res) => {
  try {
    const { id_aula, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta_correta } = req.body;
    if (!id_aula || !pergunta) return res.status(400).json({ erro: 'Aula e pergunta são obrigatórios.' });

    const idQuiz = gerarUuid();
    bd.prepare('INSERT INTO quizzes (id_quiz, id_aula, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta_correta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(idQuiz, id_aula, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta_correta);
    res.status(201).json({ mensagem: 'Quiz criado com sucesso!', id_quiz: idQuiz });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar quiz.' });
  }
});

// GET /api/admin/cursos — todos os cursos (incluindo não publicados)
roteadorAdmin.get('/cursos', verificarAdmin, (req, res) => {
  try {
    const cursos = bd.prepare(`
      SELECT c.*,
        (SELECT COUNT(*) FROM aulas a WHERE a.id_curso = c.id_curso) as total_aulas,
        (SELECT COUNT(*) FROM inscricoes i WHERE i.id_curso = c.id_curso) as total_inscritos
      FROM cursos c ORDER BY c.data_criacao DESC
    `).all();
    res.json({ cursos });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar cursos.' });
  }
});

module.exports = roteadorAdmin;
