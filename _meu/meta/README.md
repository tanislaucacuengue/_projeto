# Gestão de Estádio

> **Pasta:** `_meu/meta`

> **Categoria:** Aplicação web estática de gestão de estádio, jogos, equipas e jogadores

## Finalidade

A página apresenta formulários e tabelas para estádio, jogo, equipa e jogador. O JavaScript acrescenta linhas locais às tabelas de estádio e jogo; para equipas, tenta enviar um POST para `/api/times` e acrescenta uma linha após resposta JSON. Existe formulário de jogador, mas não há manipulador de submissão no JavaScript examinado. Não se infere persistência além do que o código mostra.

## Tecnologias observadas

- HTML
- CSS
- JavaScript sem framework (DOM e Fetch API)
- Sem dependências ou processo de compilação declarados nos ficheiros do projecto examinados

## Ficheiros de entrada

- [`index.html`](index.html)
- [`script.js`](script.js)
- [`style.css`](style.css)

## Execução e testes

Não foi encontrado nesta pasta um comando de arranque, compilação ou testes declarado. Consultar os ficheiros de entrada acima; não foi inferido um processo de instalação ou build.

## Notas de funcionamento

Parte dos formulários actualiza tabelas apenas no navegador; o registo de equipas depende de um endpoint externo não verificado e o formulário de jogador não demonstrou processamento.

## Publicação

A publicação desta pasta não foi confirmada. A ausência de configuração Vercel versionada não permite concluir se existe ou não um deploy externo; verificar o projecto e o directório-base na plataforma antes de alterar qualquer configuração.

A revisão que originou este README foi estática: não foram executados código, testes, builds, instalação de dependências ou deploy.

## Autor e percurso de desenvolvimento

**Desenvolvedor:** Benjamim Tanislau José Cacuengue.

Este trabalho faz parte do meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada projecto representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e crescer como desenvolvedor.

Nos projectos colaborativos, esta identificação não substitui os créditos e as responsabilidades dos demais membros da equipa indicados neste README.
