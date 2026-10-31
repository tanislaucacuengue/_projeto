# _projeto

Colecção de aplicações, protótipos, jogos e ferramentas desenvolvidos em projectos independentes. Os ficheiros e comandos pertencem a cada pasta; não existe um processo único de instalação, compilação ou teste para todo o repositório.

> A descrição de cada projecto baseia-se numa revisão estática dos respectivos ficheiros. A presença de um protótipo neste repositório não significa que todas as funcionalidades estejam completas, testadas ou publicadas.

## Índice de projectos

| Projecto | Descrição resumida |
|---|---|
| [Lista de Tarefas](_meu/_aplica%C3%A7%C3%A3o_lista/README.md) | Lista de tarefas simples com operações para concluir e remover itens; persistência não observada. |
| [ClimateHub](_meu/_ClimateHub/README.md) | Plataforma educativa sobre alterações climáticas com consulta de meteorologia e qualidade do ar. |
| [ConectaTI](_meu/_conecta-ti/README.md) | Site educativo sobre informática e tecnologia, com páginas de demonstração para login e registo. |
| [DevHub](_meu/_DevHub/README.md) | Conjunto de ferramentas no navegador: calculadora, geradores de CSS e pré-visualização de filtros de imagem. |
| [GameHub](_meu/_GameHub/README.md) | Portal estático com cinco jogos educativos e de entretenimento executados no navegador. |
| [Gerador de Border Radius](_meu/_gerador_Border_Radius/README.md) | Ferramenta visual para pré-visualizar e gerar valores CSS de border-radius. |
| [Gerador de Cores RGB](_meu/_gerador_Cor_RGB/README.md) | Ferramenta interactiva para escolher e pré-visualizar cores RGB. |
| [Gerador de Filtros de Imagem](_meu/_gerador_Filtros_Imagens/README.md) | Ferramenta de pré-visualização de filtros CSS aplicados a uma imagem. |
| [Gerador de Senhas](_meu/_gerador_senhas/README.md) | Interface para configurar, gerar e copiar palavras-passe; a segurança criptográfica não foi validada. |
| [Quiz de Conhecimentos Gerais](_meu/_jogo/README.md) | Duas versões estáticas de um quiz de conhecimentos gerais. |
| [Quadro Kanban](_meu/app_lista/README.md) | Protótipo de quadro Kanban com cartões que podem ser movidos entre colunas; persistência não observada. |
| [Chat em Tempo Real](_meu/chat/README.md) | Aplicação de chat com interface de navegador e servidor Node.js/WebSocket. |
| [ArenaGest](_meu/chat_gpt/README.md) | Protótipo ArenaGest para registar e apresentar eventos, vendas e entradas no navegador. |
| [Clima 1](_meu/clima1/README.md) | Aplicação web para consultar condições meteorológicas actuais e qualidade do ar. |
| [Clima 2](_meu/clima2/README.md) | Protótipo meteorológico para pesquisar uma cidade e apresentar condições actuais e qualidade do ar. |
| [Contador e Simulação de Chuva](_meu/contador/README.md) | Contagens regressivas com uma resposta aleatória SIM/NÃO; não é uma previsão meteorológica real. |
| [EduLink Angola MVP](_meu/edulink-angola-mvp/README.md) | MVP de plataforma para aproximar alunos e professores particulares. |
| [Game Cobra](_meu/game_cobra/README.md) | Jogo Snake/Cobra em canvas, com pontuação guardada localmente no navegador. |
| [Game Mario](_meu/game_mario/README.md) | Jogo de obstáculos para navegador inspirado em Mario, controlado por teclado. |
| [Jogo da Memória](_meu/game_memoria/README.md) | Jogo da memória para navegador com grelha de cartas e registo local do nome do jogador. |
| [Game Invasão](_meu/game_nave/README.md) | Protótipo Game Invasão em canvas; a nave pode ser movimentada, mas outras mecânicas não foram confirmadas. |
| [Gestão de Estádio](_meu/meta/README.md) | Protótipo de formulários e tabelas para registos relacionados com estádio, jogos, equipas e jogadores. |
| [Nov11 Sports / StadiumPro](_meu/nov11/nov11_sports/README.md) | Aplicação identificada nos ficheiros como Nov11 Sports / StadiumPro, orientada à gestão de estádio e eventos desportivos. |
| [Piano Virtual](_meu/piano/README.md) | Piano virtual com teclas no ecrã e sons locais por nota. |
| [RobotTech Academy](_meu/robottech/robottech-academy/README.md) | Plataforma de aprendizagem tecnológica com frontend, API Node.js e base de dados SQLite. |
| [S.G.E](_meu/S.G.E/README.md) | Protótipo estático de apresentação para gestão de estádio; os fluxos de agendamento, autenticação e contacto não foram verificados. |
| [Fundo Solidário](_outros/_solidario/README.md) | Site informativo do Fundo Solidário, com páginas sobre doações, notícias e centros de acolhimento. |

## Organização

- `_meu/` — projectos pessoais, experiências, jogos, ferramentas e aplicações.
- `_outros/` — projectos adicionais.
- `_templates/` — modelos de sites e recursos reutilizáveis; são tratados como templates, não como aplicações independentes nesta documentação.

Os projectos abrangidos nesta fase têm um README próprio na respectiva pasta. Os cinco templates actualmente identificados são:

- `_templates/Company-1.0.0`
- `_templates/Flat-1.0.0`
- `_templates/Nova pasta`
- `_templates/Nova-Bootstrap5_beta1-1.0.0`
- `_templates/iPortfolio-1.0.0`

## Tecnologias e execução

A maioria das pastas contém páginas HTML, CSS e JavaScript independentes. Algumas incluem Node.js, APIs externas, WebSocket, armazenamento local do navegador ou SQLite. Consultar o README dentro de cada projecto antes de o executar; as instruções específicas foram preservadas e identificadas como não testadas quando aplicável.

Não instalar dependências a partir da raiz por rotina: os projectos não partilham necessariamente o mesmo ambiente. Não foram executados testes, builds, comandos de arranque ou aplicações durante esta revisão documental.

## Publicação

Os metadados do repositório incluem uma ligação associada a um domínio Vercel, mas não identificam quais pastas estão efectivamente publicadas. Não foi encontrada configuração Vercel versionada nos projectos analisados. O directório-base, comandos de build, variáveis de ambiente e estado dos deploys externos permanecem por confirmar; não alterar essas definições sem verificar a associação de cada aplicação.

## Segurança e dados

Este repositório é público. Não colocar chaves de API, tokens, palavras-passe, credenciais, dados pessoais ou informação financeira em HTML, CSS, JavaScript ou documentação. Qualquer segredo incluído em código executado no navegador deve ser tratado como público. A remoção de um valor dos ficheiros actuais não o apaga do histórico Git; a rotação/revogação junto do fornecedor é uma acção separada.

Algumas aplicações são protótipos com dados locais ou formulários sem backend verificado. Não utilizar dados reais de pessoas nem enviar credenciais, comprovativos ou informação financeira através dessas demonstrações até existir um fluxo seguro, confirmado e documentado.

A árvore actual também contém dependências vendorizadas em pastas `node_modules`. Não foram removidas nesta fase para evitar alterações que possam afectar caminhos, funcionamento ou publicação; a eventual limpeza deve ser analisada separadamente.

## Convenções desta documentação

- As funcionalidades são descritas como **observadas** no código ou na documentação existente; não representam testes de aceitação.
- Os comandos são identificados como documentados e não testados quando não foram executados.
- As funcionalidades demonstrativas, limitações e dependências externas são distinguidas de um serviço pronto para produção.
- Não foram copiadas para estes README chaves, palavras-passe, contactos ou dados pessoais encontrados durante a auditoria.

## Autor e percurso de desenvolvimento

**Desenvolvedor:** Benjamim Tanislau José Cacuengue.

Este trabalho faz parte do meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada projecto representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e crescer como desenvolvedor.

Nos projectos colaborativos, esta identificação não substitui os créditos e as responsabilidades dos demais membros da equipa indicados neste README.
