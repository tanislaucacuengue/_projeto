const express = require('express');
const cors = require('cors');
const path = require('path');

// Inicializar base de dados
require('./baseDados');

const roteadorAutenticacao = require('./rotas/autenticacao');
const roteadorCursos = require('./rotas/cursos');
const roteadorAdmin = require('./rotas/admin');

const aplicacao = express();
const PORTA = process.env.PORTA || 3000;

// Middleware
aplicacao.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
aplicacao.use(express.json({ limit: '50mb' }));
aplicacao.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir ficheiros estáticos do frontend
aplicacao.use(express.static(path.join(__dirname, '../frontend')));

// Servir uploads
aplicacao.use('/uploads', express.static(path.join(__dirname, 'publico/uploads')));

// Rotas da API
aplicacao.use('/api/auth', roteadorAutenticacao);
aplicacao.use('/api/cursos', roteadorCursos);
aplicacao.use('/api/admin', roteadorAdmin);

// Rota de verificação do servidor
aplicacao.get('/api/estado', (req, res) => {
  res.json({
    estado: 'online',
    plataforma: 'RobotTech Academy',
    versao: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Servir o frontend para todas as outras rotas (SPA)
aplicacao.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Tratamento de erros global
aplicacao.use((erro, req, res, next) => {
  console.error('Erro:', erro.message);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

aplicacao.listen(PORTA, '0.0.0.0', () => {
  console.log(`\n🚀 RobotTech Academy iniciada!`);
  console.log(`📡 Servidor a correr na porta ${PORTA}`);
  console.log(`🌐 Acede em: http://localhost:${PORTA}`);
  console.log(`👨‍💼 Admin: admin@robottech.ao / admin123\n`);
});

module.exports = aplicacao;
