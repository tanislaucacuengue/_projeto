const Database = require('better-sqlite3');
const path = require('path');
const { v4: gerarUuid } = require('uuid');

const caminhoBaseDados = path.join(__dirname, 'robottech.db');
const bd = new Database(caminhoBaseDados);

// Activar chaves estrangeiras
bd.pragma('foreign_keys = ON');
bd.pragma('journal_mode = WAL');

function inicializarBaseDados() {
  // Tabela de Alunos
  bd.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
      id_aluno TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      foto_perfil TEXT DEFAULT NULL,
      papel TEXT DEFAULT 'aluno',
      data_registo TEXT DEFAULT (datetime('now')),
      ativo INTEGER DEFAULT 1
    )
  `);

  // Tabela de Cursos
  bd.exec(`
    CREATE TABLE IF NOT EXISTS cursos (
      id_curso TEXT PRIMARY KEY,
      titulo TEXT NOT NULL,
      descricao TEXT,
      capa TEXT DEFAULT NULL,
      categoria TEXT,
      nivel TEXT DEFAULT 'iniciante',
      duracao_horas INTEGER DEFAULT 0,
      preco REAL DEFAULT 0,
      publicado INTEGER DEFAULT 1,
      data_criacao TEXT DEFAULT (datetime('now'))
    )
  `);

  // Tabela de Módulos
  bd.exec(`
    CREATE TABLE IF NOT EXISTS modulos (
      id_modulo TEXT PRIMARY KEY,
      id_curso TEXT NOT NULL,
      titulo TEXT NOT NULL,
      ordem INTEGER DEFAULT 0,
      FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE
    )
  `);

  // Tabela de Aulas
  bd.exec(`
    CREATE TABLE IF NOT EXISTS aulas (
      id_aula TEXT PRIMARY KEY,
      id_modulo TEXT NOT NULL,
      id_curso TEXT NOT NULL,
      titulo TEXT NOT NULL,
      descricao TEXT,
      video_url TEXT,
      duracao_minutos INTEGER DEFAULT 0,
      ordem INTEGER DEFAULT 0,
      tipo TEXT DEFAULT 'video',
      FOREIGN KEY (id_modulo) REFERENCES modulos(id_modulo) ON DELETE CASCADE,
      FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE
    )
  `);

  // Tabela de Inscrições
  bd.exec(`
    CREATE TABLE IF NOT EXISTS inscricoes (
      id_inscricao TEXT PRIMARY KEY,
      id_aluno TEXT NOT NULL,
      id_curso TEXT NOT NULL,
      data_inscricao TEXT DEFAULT (datetime('now')),
      concluido INTEGER DEFAULT 0,
      data_conclusao TEXT DEFAULT NULL,
      FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno) ON DELETE CASCADE,
      FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE,
      UNIQUE(id_aluno, id_curso)
    )
  `);

  // Tabela de Progresso
  bd.exec(`
    CREATE TABLE IF NOT EXISTS progresso (
      id_progresso TEXT PRIMARY KEY,
      id_aluno TEXT NOT NULL,
      id_aula TEXT NOT NULL,
      id_curso TEXT NOT NULL,
      concluido INTEGER DEFAULT 0,
      data_conclusao TEXT DEFAULT NULL,
      FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno) ON DELETE CASCADE,
      FOREIGN KEY (id_aula) REFERENCES aulas(id_aula) ON DELETE CASCADE,
      UNIQUE(id_aluno, id_aula)
    )
  `);

  // Tabela de Certificados
  bd.exec(`
    CREATE TABLE IF NOT EXISTS certificados (
      id_certificado TEXT PRIMARY KEY,
      id_aluno TEXT NOT NULL,
      id_curso TEXT NOT NULL,
      data_emissao TEXT DEFAULT (datetime('now')),
      codigo_verificacao TEXT UNIQUE NOT NULL,
      FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno) ON DELETE CASCADE,
      FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE,
      UNIQUE(id_aluno, id_curso)
    )
  `);

  // Tabela de Quizzes
  bd.exec(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id_quiz TEXT PRIMARY KEY,
      id_aula TEXT NOT NULL,
      pergunta TEXT NOT NULL,
      opcao_a TEXT NOT NULL,
      opcao_b TEXT NOT NULL,
      opcao_c TEXT NOT NULL,
      opcao_d TEXT NOT NULL,
      resposta_correta TEXT NOT NULL,
      FOREIGN KEY (id_aula) REFERENCES aulas(id_aula) ON DELETE CASCADE
    )
  `);

  // Tabela de Respostas de Quiz
  bd.exec(`
    CREATE TABLE IF NOT EXISTS respostas_quiz (
      id_resposta TEXT PRIMARY KEY,
      id_aluno TEXT NOT NULL,
      id_quiz TEXT NOT NULL,
      resposta_dada TEXT NOT NULL,
      correto INTEGER DEFAULT 0,
      data_resposta TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno) ON DELETE CASCADE,
      FOREIGN KEY (id_quiz) REFERENCES quizzes(id_quiz) ON DELETE CASCADE
    )
  `);

  inserirDadosIniciais();
}

function inserirDadosIniciais() {
  const adminExiste = bd.prepare('SELECT id_aluno FROM alunos WHERE papel = ?').get('admin');
  if (!adminExiste) {
    const bcrypt = require('bcryptjs');
    const senhaHash = bcrypt.hashSync('admin123', 10);
    bd.prepare(`
      INSERT INTO alunos (id_aluno, nome, email, senha, papel)
      VALUES (?, ?, ?, ?, ?)
    `).run(gerarUuid(), 'Administrador', 'admin@robottech.ao', senhaHash, 'admin');
  }

  const cursosExistem = bd.prepare('SELECT COUNT(*) as total FROM cursos').get();
  if (cursosExistem.total === 0) {
    const cursos = [
      {
        id: gerarUuid(),
        titulo: 'Cursos de Programação',
        descricao: 'Aprende a programar do zero ao avançado. Abrange Python, JavaScript, C++ e muito mais. Desenvolve aplicações reais e projetos práticos que te preparam para o mercado de trabalho tecnológico.',
        categoria: 'programacao',
        nivel: 'iniciante',
        duracao: 40
      },
      {
        id: gerarUuid(),
        titulo: 'Curso de Robótica',
        descricao: 'Explora o fascinante mundo da robótica. Aprende a construir e programar robôs, desde os conceitos básicos de mecânica até à programação de sistemas autónomos com Arduino e Raspberry Pi.',
        categoria: 'robotica',
        nivel: 'intermedio',
        duracao: 35
      },
      {
        id: gerarUuid(),
        titulo: 'Curso de Projeção e Lançamento de Cansats',
        descricao: 'Mergulha no universo aeroespacial com este curso especializado em CanSats — pequenos satélites do tamanho de uma lata. Aprende a projetar, construir e lançar o teu próprio satélite.',
        categoria: 'cansats',
        nivel: 'avancado',
        duracao: 50
      },
      {
        id: gerarUuid(),
        titulo: 'Curso de Computação Gráfica',
        descricao: 'Domina as ferramentas e técnicas de computação gráfica. Desde modelação 3D, animação, renderização até ao design visual para jogos e aplicações multimédia profissionais.',
        categoria: 'computacao-grafica',
        nivel: 'intermedio',
        duracao: 45
      },
      {
        id: gerarUuid(),
        titulo: 'Curso de Eletrónica',
        descricao: 'Compreende os fundamentos da eletrónica analógica e digital. Aprende a criar circuitos, trabalhar com componentes eletrónicos e desenvolver projetos práticos de hardware.',
        categoria: 'eletronica',
        nivel: 'iniciante',
        duracao: 30
      }
    ];

    const inserirCurso = bd.prepare(`
      INSERT INTO cursos (id_curso, titulo, descricao, categoria, nivel, duracao_horas)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const inserirModulo = bd.prepare(`
      INSERT INTO modulos (id_modulo, id_curso, titulo, ordem)
      VALUES (?, ?, ?, ?)
    `);

    const inserirAula = bd.prepare(`
      INSERT INTO aulas (id_aula, id_modulo, id_curso, titulo, descricao, video_url, duracao_minutos, ordem)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const inserirQuiz = bd.prepare(`
      INSERT INTO quizzes (id_quiz, id_aula, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta_correta)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const curso of cursos) {
      inserirCurso.run(curso.id, curso.titulo, curso.descricao, curso.categoria, curso.nivel, curso.duracao);

      // Módulos e aulas por curso
      const modulosDoCurso = obterModulosPorCategoria(curso.categoria);
      modulosDoCurso.forEach((modulo, idxModulo) => {
        const idModulo = gerarUuid();
        inserirModulo.run(idModulo, curso.id, modulo.titulo, idxModulo + 1);

        modulo.aulas.forEach((aula, idxAula) => {
          const idAula = gerarUuid();
          inserirAula.run(
            idAula, idModulo, curso.id,
            aula.titulo, aula.descricao,
            'https://www.youtube.com/embed/dQw4w9WgXcQ',
            aula.duracao, idxAula + 1
          );

          // Quiz para cada aula
          inserirQuiz.run(
            gerarUuid(), idAula,
            aula.pergunta,
            aula.opcaoA, aula.opcaoB, aula.opcaoC, aula.opcaoD,
            aula.respostaCorreta
          );
        });
      });
    }
  }
}

function obterModulosPorCategoria(categoria) {
  const modulos = {
    'programacao': [
      {
        titulo: 'Módulo 1 — Fundamentos da Programação',
        aulas: [
          { titulo: 'Introdução à Programação', descricao: 'O que é programação e como funciona.', duracao: 15, pergunta: 'O que é um algoritmo?', opcaoA: 'Um tipo de computador', opcaoB: 'Uma sequência de instruções para resolver um problema', opcaoC: 'Uma linguagem de programação', opcaoD: 'Um sistema operativo', respostaCorreta: 'B' },
          { titulo: 'Variáveis e Tipos de Dados', descricao: 'Aprende sobre variáveis, inteiros, strings e booleanos.', duracao: 20, pergunta: 'Qual é o tipo de dado para texto?', opcaoA: 'Integer', opcaoB: 'Boolean', opcaoC: 'String', opcaoD: 'Float', respostaCorreta: 'C' },
          { titulo: 'Estruturas de Controlo', descricao: 'If, else, loops e condições.', duracao: 25, pergunta: 'O que faz um loop "for"?', opcaoA: 'Termina o programa', opcaoB: 'Repete um bloco de código', opcaoC: 'Declara uma variável', opcaoD: 'Importa uma biblioteca', respostaCorreta: 'B' }
        ]
      },
      {
        titulo: 'Módulo 2 — Python para Iniciantes',
        aulas: [
          { titulo: 'Instalação do Python', descricao: 'Como instalar e configurar o Python.', duracao: 10, pergunta: 'Qual comando imprime texto em Python?', opcaoA: 'echo()', opcaoB: 'console.log()', opcaoC: 'print()', opcaoD: 'write()', respostaCorreta: 'C' },
          { titulo: 'Funções em Python', descricao: 'Criar e usar funções em Python.', duracao: 30, pergunta: 'Como se define uma função em Python?', opcaoA: 'function nome():', opcaoB: 'def nome():', opcaoC: 'func nome():', opcaoD: 'void nome():', respostaCorreta: 'B' }
        ]
      }
    ],
    'robotica': [
      {
        titulo: 'Módulo 1 — Introdução à Robótica',
        aulas: [
          { titulo: 'O que é Robótica?', descricao: 'História e aplicações da robótica moderna.', duracao: 20, pergunta: 'O que é um actuador num robô?', opcaoA: 'Um sensor de temperatura', opcaoB: 'Um componente que produz movimento', opcaoC: 'Uma bateria', opcaoD: 'Um microprocessador', respostaCorreta: 'B' },
          { titulo: 'Componentes de um Robô', descricao: 'Sensores, actuadores e controladores.', duracao: 25, pergunta: 'Qual componente detecta o ambiente?', opcaoA: 'Motor', opcaoB: 'Bateria', opcaoC: 'Sensor', opcaoD: 'Estrutura', respostaCorreta: 'C' }
        ]
      },
      {
        titulo: 'Módulo 2 — Arduino e Programação',
        aulas: [
          { titulo: 'Introdução ao Arduino', descricao: 'Primeiros passos com Arduino.', duracao: 30, pergunta: 'O Arduino é baseado em qual microcontrolador?', opcaoA: 'Intel Core', opcaoB: 'ATmega', opcaoC: 'ARM Cortex', opcaoD: 'Raspberry Pi', respostaCorreta: 'B' },
          { titulo: 'Controlo de Motores', descricao: 'Como controlar motores DC e servo.', duracao: 35, pergunta: 'O que é PWM?', opcaoA: 'Potência de Watts Máxima', opcaoB: 'Modulação por Largura de Pulso', opcaoC: 'Protocolo de Rede Sem Fio', opcaoD: 'Processamento de Dados', respostaCorreta: 'B' }
        ]
      }
    ],
    'cansats': [
      {
        titulo: 'Módulo 1 — Fundamentos Aeroespaciais',
        aulas: [
          { titulo: 'O que é um CanSat?', descricao: 'Introdução aos pequenos satélites.', duracao: 20, pergunta: 'Qual é o tamanho típico de um CanSat?', opcaoA: 'Tamanho de um autocarro', opcaoB: 'Tamanho de uma lata de refrigerante', opcaoC: 'Tamanho de uma casa', opcaoD: 'Tamanho de um telemóvel', respostaCorreta: 'B' },
          { titulo: 'Sistemas de Telemetria', descricao: 'Como transmitir dados do satélite.', duracao: 30, pergunta: 'O que é telemetria?', opcaoA: 'Medição de temperatura', opcaoB: 'Transmissão de dados à distância', opcaoC: 'Tipo de propulsão', opcaoD: 'Sistema de navegação', respostaCorreta: 'B' }
        ]
      },
      {
        titulo: 'Módulo 2 — Construção e Lançamento',
        aulas: [
          { titulo: 'Estrutura Mecânica', descricao: 'Como construir a estrutura do CanSat.', duracao: 40, pergunta: 'Qual material é mais usado na estrutura de CanSats?', opcaoA: 'Ouro', opcaoB: 'Alumínio', opcaoC: 'Madeira', opcaoD: 'Vidro', respostaCorreta: 'B' },
          { titulo: 'Procedimentos de Lançamento', descricao: 'Segurança e procedimentos de lançamento.', duracao: 25, pergunta: 'O que é uma janela de lançamento?', opcaoA: 'Uma janela física no foguetão', opcaoB: 'O período de tempo ideal para lançar', opcaoC: 'Um tipo de sensor', opcaoD: 'Uma peça da estrutura', respostaCorreta: 'B' }
        ]
      }
    ],
    'computacao-grafica': [
      {
        titulo: 'Módulo 1 — Fundamentos Gráficos',
        aulas: [
          { titulo: 'Introdução à Computação Gráfica', descricao: 'Conceitos básicos de gráficos computacionais.', duracao: 20, pergunta: 'O que é um pixel?', opcaoA: 'Um tipo de processador', opcaoB: 'A menor unidade de uma imagem digital', opcaoC: 'Um formato de ficheiro', opcaoD: 'Uma cor específica', respostaCorreta: 'B' },
          { titulo: 'Modelação 3D Básica', descricao: 'Primeiros passos na modelação 3D.', duracao: 35, pergunta: 'O que é um polígono em 3D?', opcaoA: 'Uma cor', opcaoB: 'Uma forma geométrica plana que compõe modelos 3D', opcaoC: 'Um tipo de textura', opcaoD: 'Um efeito de luz', respostaCorreta: 'B' }
        ]
      },
      {
        titulo: 'Módulo 2 — Animação e Renderização',
        aulas: [
          { titulo: 'Princípios de Animação', descricao: 'Os 12 princípios da animação.', duracao: 30, pergunta: 'O que é "keyframe" na animação?', opcaoA: 'Um tipo de câmara', opcaoB: 'Um quadro-chave que define posições importantes', opcaoC: 'Um efeito sonoro', opcaoD: 'Um formato de exportação', respostaCorreta: 'B' },
          { titulo: 'Técnicas de Renderização', descricao: 'Ray tracing e rasterização.', duracao: 40, pergunta: 'O que é ray tracing?', opcaoA: 'Um tipo de animação', opcaoB: 'Técnica de renderização que simula o comportamento da luz', opcaoC: 'Um software de edição', opcaoD: 'Um formato de imagem', respostaCorreta: 'B' }
        ]
      }
    ],
    'eletronica': [
      {
        titulo: 'Módulo 1 — Fundamentos de Eletrónica',
        aulas: [
          { titulo: 'Conceitos Básicos de Eletricidade', descricao: 'Tensão, corrente e resistência.', duracao: 20, pergunta: 'Qual é a unidade de medida da resistência elétrica?', opcaoA: 'Volt', opcaoB: 'Ampere', opcaoC: 'Ohm', opcaoD: 'Watt', respostaCorreta: 'C' },
          { titulo: 'Componentes Eletrónicos', descricao: 'Resistores, condensadores e transístores.', duracao: 25, pergunta: 'Para que serve um condensador?', opcaoA: 'Amplificar sinais', opcaoB: 'Armazenar energia elétrica temporariamente', opcaoC: 'Converter AC em DC', opcaoD: 'Medir temperatura', respostaCorreta: 'B' }
        ]
      },
      {
        titulo: 'Módulo 2 — Circuitos Práticos',
        aulas: [
          { titulo: 'Leitura de Esquemas', descricao: 'Como ler e interpretar esquemas elétricos.', duracao: 30, pergunta: 'O que representa o símbolo de terra num circuito?', opcaoA: 'Fonte de energia', opcaoB: 'Ponto de referência de tensão zero', opcaoC: 'Interruptor', opcaoD: 'Motor', respostaCorreta: 'B' },
          { titulo: 'Projecto Final: LED Controller', descricao: 'Construir um controlador de LEDs.', duracao: 45, pergunta: 'Qual componente limita a corrente num LED?', opcaoA: 'Condensador', opcaoB: 'Indutor', opcaoC: 'Resistor', opcaoD: 'Transístor', respostaCorreta: 'C' }
        ]
      }
    ]
  };

  return modulos[categoria] || [];
}

inicializarBaseDados();

module.exports = { bd, gerarUuid };
