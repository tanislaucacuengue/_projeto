const jwt = require('jsonwebtoken');

const SEGREDO_JWT = process.env.SEGREDO_JWT || 'robottech_segredo_super_secreto_2024';

function verificarToken(req, res, next) {
  const cabecalhoAutorizacao = req.headers['authorization'];
  const token = cabecalhoAutorizacao && cabecalhoAutorizacao.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const dadosDecodificados = jwt.verify(token, SEGREDO_JWT);
    req.utilizador = dadosDecodificados;
    next();
  } catch (erro) {
    return res.status(403).json({ erro: 'Token inválido ou expirado.' });
  }
}

function verificarAdmin(req, res, next) {
  verificarToken(req, res, () => {
    if (req.utilizador.papel !== 'admin') {
      return res.status(403).json({ erro: 'Acesso restrito a administradores.' });
    }
    next();
  });
}

function gerarToken(dadosUtilizador) {
  return jwt.sign(dadosUtilizador, SEGREDO_JWT, { expiresIn: '7d' });
}

module.exports = { verificarToken, verificarAdmin, gerarToken };
