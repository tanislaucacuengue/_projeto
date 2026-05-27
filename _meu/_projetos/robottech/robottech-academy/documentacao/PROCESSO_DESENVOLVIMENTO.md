# Documentação: Processo de Desenvolvimento da RobotTech Academy

**Autor**: Manus AI
**Data**: 26 de Fevereiro de 2026

## 1. Introdução

Este documento detalha o processo de desenvolvimento da plataforma de cursos online **RobotTech Academy**. O objetivo foi criar uma aplicação web completa, funcional e visualmente apelativa, seguindo os requisitos especificados, que incluíam um design futurista com tema espacial, funcionalidades de e-learning e uma arquitetura baseada em JavaScript tanto no frontend como no backend.

## 2. Análise de Requisitos

A fase inicial consistiu na análise detalhada dos requisitos do utilizador:

- **Funcionalidades Principais**: Sistema de autenticação (registo/login), catálogo de cursos, página de aula com vídeo, sistema de progresso, quizzes, certificados e um painel de administrador.
- **Tecnologias**: O stack tecnológico foi definido como HTML, CSS e JavaScript para o frontend, e Node.js para o backend, com uma base de dados relacional (optou-se por SQLite pela sua simplicidade e portabilidade).
- **Design Visual**: O design foi baseado numa imagem de referência, que ditou uma paleta de cores escura (tons de roxo e azul), um fundo com estrelas e nebulosas, e cartões de curso com efeito de vidro transparente (glassmorphism).
- **Identificadores**: Todos os identificadores no código (variáveis, classes, funções) deveriam ser escritos em português para facilitar a manutenção e compreensão por parte de desenvolvedores lusófonos.

## 3. Arquitetura e Estrutura do Projeto

Com base nos requisitos, foi definida a seguinte estrutura de diretórios para organizar o projeto de forma lógica e escalável:

```
/robottech-academy
├── backend/                # Lógica do servidor (Node.js)
│   ├── rotas/              # Definição dos endpoints da API
│   ├── controladores/      # (Opcional, lógica movida para rotas para simplicidade)
│   ├── modelos/            # (Opcional, lógica da BD centralizada em baseDados.js)
│   ├── middleware/         # Funções de autenticação (JWT)
│   ├── publico/            # Ficheiros públicos (uploads)
│   ├── baseDados.js        # Configuração e inicialização da BD SQLite
│   ├── servidor.js         # Ficheiro principal do servidor Express
│   └── package.json        # Dependências do Node.js
├── frontend/               # Interface do utilizador (Cliente)
│   ├── paginas/            # (Estrutura monolítica no index.html para simplicidade)
│   ├── estilos/            # Ficheiros CSS
│   ├── scripts/            # Ficheiros JavaScript
│   ├── imagens/            # Imagens e ícones
│   └── index.html          # Ficheiro HTML principal (Single Page Application)
└── documentacao/           # Ficheiros Markdown com a documentação
```

## 4. Desenvolvimento do Backend

O backend foi construído com **Node.js** e o framework **Express.js**, seguindo uma arquitetura de API RESTful.

### 4.1. Base de Dados

- Foi utilizado o `better-sqlite3`, um driver rápido e síncrono para SQLite.
- O ficheiro `baseDados.js` centraliza toda a lógica de inicialização, criando as tabelas necessárias (alunos, cursos, aulas, progresso, etc.) e inserindo dados iniciais (cursos e um utilizador administrador).
- As tabelas foram desenhadas com nomes de colunas em português (`id_aluno`, `titulo`, `video_url`).

### 4.2. API RESTful

Foram criados três ficheiros de rotas principais:

- **`autenticacao.js`**: Endpoints para `/api/auth/registar`, `/api/auth/entrar` e gestão de perfil. Utiliza `bcryptjs` para hashing de senhas e `jsonwebtoken` para criar e verificar tokens de sessão.
- **`cursos.js`**: Endpoints públicos para listar e ver detalhes dos cursos, e endpoints protegidos para inscrição, progresso, quizzes e certificados.
- **`admin.js`**: Endpoints protegidos (acessíveis apenas por administradores) para gerir cursos, aulas, módulos, alunos e ver estatísticas da plataforma.

### 4.3. Middleware

- O ficheiro `middleware/autenticacao.js` exporta duas funções principais:
  - `verificarToken`: Verifica se um token JWT válido está presente no cabeçalho `Authorization`.
  - `verificarAdmin`: Garante que o utilizador autenticado tem o papel de `admin`.

## 5. Desenvolvimento do Frontend

O frontend foi desenvolvido como uma **Single Page Application (SPA)**, onde todo o conteúdo é carregado dinamicamente no `index.html`.

### 5.1. Estrutura e Estilo

- **HTML (`index.html`)**: Contém a estrutura base com a barra de navegação, o container principal e os modais. As diferentes "páginas" são secções `<section>` que são mostradas ou ocultadas via JavaScript.
- **CSS (`principal.css`, `animacoes.css`)**: O estilo foi a parte mais crucial para replicar o design. 
  - Foi utilizada uma abordagem com variáveis CSS (`:root`) para definir a paleta de cores, fontes e outras constantes de design.
  - O efeito de *glassmorphism* nos cartões foi alcançado com `background: rgba(...)`, `backdrop-filter: blur()` e bordas com gradiente.
  - O fundo espacial foi criado com uma combinação de gradientes CSS e estrelas geradas dinamicamente com JavaScript, adicionando um toque de paralaxe e animação.

### 5.2. Lógica e Interatividade (JavaScript)

O código JavaScript foi modularizado em vários ficheiros para melhor organização:

- **`api.js`**: Centraliza toda a comunicação com o backend, exportando funções assíncronas para cada endpoint da API.
- **`principal.js`**: Gere a navegação entre páginas (SPA), o estado dos modais, as notificações (toasts) e a inicialização geral da aplicação.
- **`autenticacao.js`**: Controla o estado de login do utilizador, os formulários de login/registo e a atualização da interface com base no estado de autenticação.
- **`cursos.js`**: Responsável por buscar e renderizar as listas de cursos e a página de detalhes de um curso.
- **`aula.js`**: Gere a página de visualização de uma aula, incluindo o player de vídeo, a lógica de conclusão de aula e a interação com os quizzes.
- **`perfil.js`**: Controla a página de perfil do utilizador e a listagem de certificados.
- **`admin.js`**: Gere toda a interatividade do painel de administrador, incluindo a visualização de estatísticas e a gestão de conteúdos.

## 6. Testes e Correções

Durante o desenvolvimento, foram realizados testes para garantir o funcionamento do servidor e da API. Um erro notável foi encontrado na rota *wildcard* do Express.js (`aplicacao.get('*', ...)`), que na versão mais recente do framework precisa de uma sintaxe diferente (`aplicacao.get('/{*splat}', ...)`). O erro foi diagnosticado através da análise dos logs do servidor e corrigido no ficheiro `servidor.js`.

## 7. Conclusão

O desenvolvimento da RobotTech Academy seguiu uma abordagem estruturada, desde a análise de requisitos até à implementação e testes. A combinação de um backend robusto com Node.js e um frontend dinâmico e visualmente rico permitiu criar uma plataforma completa e funcional que cumpre todos os requisitos solicitados.
