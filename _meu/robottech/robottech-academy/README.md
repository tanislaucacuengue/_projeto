# RobotTech Academy

> **Pasta:** `_meu/robottech/robottech-academy`

> **Categoria:** Plataforma web de aprendizagem tecnológica/e-learning (RobotTech Academy), conforme a interface e a documentação do projecto.

## Finalidade

A interface e a documentação descrevem uma plataforma de cursos tecnológicos com catálogo, aulas em vídeo, registo e autenticação, progresso, quizzes, certificados verificáveis e administração de cursos/alunos. O frontend é apresentado como SPA; o backend expõe API e serve os ficheiros do frontend. Finalidade inferida apenas do código e da documentação consultados.

## Tecnologias observadas

- HTML, CSS e JavaScript sem framework visível no frontend
- Node.js
- Express 5
- SQLite via better-sqlite3
- bcryptjs para hashing de palavras-passe
- jsonwebtoken/JWT
- npm

## Ficheiros de entrada

- [`frontend/index.html`](frontend/index.html)
- [`backend/servidor.js`](backend/servidor.js)
- [`backend/baseDados.js`](backend/baseDados.js)

## Execução e testes

Os comandos/instruções seguintes foram encontrados na documentação ou no manifesto do projecto; **não foram executados nem validados** nesta revisão:

- Documentação: `cd caminho/para/robottech-academy/backend` e `npm install` (declarado; não executado).
- Documentação: `node servidor.js` a partir da pasta backend (declarado; não executado).
- backend/package.json declara `npm test`, mas o script é apenas um placeholder que termina com erro indicando que não há testes especificados; não executado.

## Notas de funcionamento

O projecto inclui frontend e backend Node.js com SQLite. Antes de utilizar contas ou dados reais, rever autenticação, segredos, CORS e os ficheiros da base de dados. Não colocar credenciais neste README.

## Publicação

A publicação desta pasta não foi confirmada. A ausência de configuração Vercel versionada não permite concluir se existe ou não um deploy externo; verificar o projecto e o directório-base na plataforma antes de alterar qualquer configuração.

A revisão que originou este README foi estática: não foram executados código, testes, builds, instalação de dependências ou deploy.

## Documentação existente

- [`documentacao/COMO_USAR.md`](documentacao/COMO_USAR.md)
- [`documentacao/MANUTENCAO_E_REPLICACAO.md`](documentacao/MANUTENCAO_E_REPLICACAO.md)
- [`documentacao/PROCESSO_DESENVOLVIMENTO.md`](documentacao/PROCESSO_DESENVOLVIMENTO.md)
- [`documentacao/Documentação_ Processo de Desenvolvimento da RobotTech Academy.md`](documentacao/Documenta%C3%A7%C3%A3o_%20Processo%20de%20Desenvolvimento%20da%20RobotTech%20Academy.md)

## Autor e percurso de desenvolvimento

**Desenvolvedor:** Benjamim Tanislau José Cacuengue.

Este trabalho faz parte do meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada projecto representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e crescer como desenvolvedor.

Nos projectos colaborativos, esta identificação não substitui os créditos e as responsabilidades dos demais membros da equipa indicados neste README.
