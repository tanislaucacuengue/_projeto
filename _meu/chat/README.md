# Chat em Tempo Real

> **Pasta:** `_meu/chat`

> **Categoria:** Aplicação web de conversação em tempo real, cliente/servidor

## Finalidade

Aplicação web de chat em tempo real: a interface recolhe um nome, permite enviar mensagens e o código cliente comunica por WebSocket com um servidor que retransmite as mensagens aos clientes ligados. Esta finalidade decorre da interface HTML e do código cliente/servidor; não foi inferida apenas pelo nome do projecto.

## Tecnologias observadas

- HTML
- CSS
- JavaScript no navegador
- Node.js/CommonJS
- WebSocket via pacote ws
- dotenv
- Google Fonts e Material Symbols carregados externamente

## Ficheiros de entrada

- [`index.html`](index.html)
- [`js/script.js`](js/script.js)
- [`js/server.js`](js/server.js)
- [`package.json`](package.json)

## Execução e testes

Os comandos/instruções seguintes foram encontrados na documentação ou no manifesto do projecto; **não foram executados nem validados** nesta revisão:

- npm start — declara `node src/server.js`
- npm run dev — declara `node --watch src/server.js`
- Não há comando de teste declarado

## Notas de funcionamento

O projecto depende de um servidor Node.js e WebSocket. O manifesto contém comandos declarados cuja localização do servidor precisa de ser confirmada antes de os considerar operacionais; não usar mensagens reais ou sensíveis sem autenticação e protecção adequadas.

## Publicação

A publicação desta pasta não foi confirmada. A ausência de configuração Vercel versionada não permite concluir se existe ou não um deploy externo; verificar o projecto e o directório-base na plataforma antes de alterar qualquer configuração.

A revisão que originou este README foi estática: não foram executados código, testes, builds, instalação de dependências ou deploy.

## Autor e percurso de desenvolvimento

**Desenvolvedor:** Benjamim Tanislau José Cacuengue.

Este trabalho faz parte do meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada projecto representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e crescer como desenvolvedor.

Nos projectos colaborativos, esta identificação não substitui os créditos e as responsabilidades dos demais membros da equipa indicados neste README.
