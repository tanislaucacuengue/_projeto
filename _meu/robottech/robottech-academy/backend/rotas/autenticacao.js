const express = require('express');
const bcrypt = require('bcryptjs');
const { bd, gerarUuid } = require('../baseDados');
const { gerarToken } = require('../middleware/autenticacao');

const roteadorAutenticacao = express.Router();

// POST /api/auth/registar
roteadorAutenticacao.post('/registar', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    if (senha.length < 6) {
      return res.status(400).json({ erro: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: 'Email inválido.' });
    }

    const alunoExistente = bd.prepare('SELECT id_aluno FROM alunos WHERE email = ?').get(email.toLowerCase());
    if (alunoExistente) {
      return res.status(409).json({ erro: 'Este email já está registado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 12);
    const idAluno = gerarUuid();

    bd.prepare(`
      INSERT INTO alunos (id_aluno, nome, email, senha)
      VALUES (?, ?, ?, ?)
    `).run(idAluno, nome.trim(), email.toLowerCase().trim(), senhaHash);

    const token = gerarToken({ id_aluno: idAluno, nome: nome.trim(), email: email.toLowerCase(), papel: 'aluno' });

    res.status(201).json({
      mensagem: 'Conta criada com sucesso!',
      token,
      utilizador: { id_aluno: idAluno, nome: nome.trim(), email: email.toLowerCase(), papel: 'aluno' }
    });
  } catch (erro) {
    console.error('Erro no registo:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// POST /api/auth/entrar
roteadorAutenticacao.post('/entrar', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const aluno = bd.prepare('SELECT * FROM alunos WHERE email = ? AND ativo = 1').get(email.toLowerCase().trim());
    if (!aluno) {
      return res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }

    const token = gerarToken({
      id_aluno: aluno.id_aluno,
      nome: aluno.nome,
      email: aluno.email,
      papel: aluno.papel
    });

    res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      utilizador: {
        id_aluno: aluno.id_aluno,
        nome: aluno.nome,
        email: aluno.email,
        papel: aluno.papel,
        foto_perfil: aluno.foto_perfil
      }
    });
  } catch (erro) {
    console.error('Erro no login:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// GET /api/auth/perfil
const { verificarToken } = require('../middleware/autenticacao');
roteadorAutenticacao.get('/perfil', verificarToken, (req, res) => {
  try {
    const aluno = bd.prepare('SELECT id_aluno, nome, email, papel, foto_perfil, data_registo FROM alunos WHERE id_aluno = ?').get(req.utilizador.id_aluno);
    if (!aluno) {
      return res.status(404).json({ erro: 'Utilizador não encontrado.' });
    }
    res.json({ utilizador: aluno });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// PUT /api/auth/perfil
roteadorAutenticacao.put('/perfil', verificarToken, async (req, res) => {
  try {
    const { nome, senhaAtual, novaSenha } = req.body;
    const idAluno = req.utilizador.id_aluno;

    if (nome) {
      bd.prepare('UPDATE alunos SET nome = ? WHERE id_aluno = ?').run(nome.trim(), idAluno);
    }

    if (senhaAtual && novaSenha) {
      const aluno = bd.prepare('SELECT senha FROM alunos WHERE id_aluno = ?').get(idAluno);
      const senhaCorreta = await bcrypt.compare(senhaAtual, aluno.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ erro: 'Senha atual incorreta.' });
      }
      const novaSenhaHash = await bcrypt.hash(novaSenha, 12);
      bd.prepare('UPDATE alunos SET senha = ? WHERE id_aluno = ?').run(novaSenhaHash, idAluno);
    }

    res.json({ mensagem: 'Perfil atualizado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

module.exports = roteadorAutenticacao;
