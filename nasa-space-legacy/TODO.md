# Plano de entregáveis — NASA Space Legacy

## [x] 1. Identidade, página inicial e navegação responsiva — concluído
- Criar uma aplicação educativa chamada **NASA Space Legacy — The Forgotten Explorers**, um museu digital histórico e interativo sobre máquinas e equipamento científico enviados para explorar a Lua e Marte. Preservar a ideia central: “Even when a mission ends, its contribution to science should never be forgotten.”
- Criar a página inicial com barra de navegação, marca NASA Space Legacy, hero com imagem espacial, título exato **“THE FORGOTTEN EXPLORERS”**, subtítulo exato **“Discover the machines that explored beyond Earth.”**, botão **Explore Missions**, exploradores em destaque, explicação do propósito e rodapé com informação do projeto e fontes.
- O botão Explore Missions deve navegar para a secção de exploradores. A navegação entre as secções deve funcionar em dispositivos móveis.
- Toda a interface deve estar em inglês; comentários de código e documentação técnica em português.
- Aplicar uma identidade escura inspirada no espaço com fundo #101C32, fundo secundário #182C45, azul #8CCBFF, dourado #D8A75A, texto #F5F5F5 e texto secundário #AAB8CA; tipografia apelativa, imagens cinematográficas, cartões arredondados, navegação moderna, hierarquia clara, transições suaves e hover discreto. Manter responsividade mobile-first, evitar animações excessivas, gradientes excessivos e efeitos visuais desnecessários.

## [x] 2. Catálogo, pesquisa e filtros — concluído
- Apresentar inicialmente estes quatro exploradores: **Sojourner** — destino Mars, aterragem 1997, missão Mars Pathfinder; **Opportunity** — destino Mars, aterragem 2004, missão Mars Exploration Rover; **Lunar Roving Vehicle** — destino Moon, primeira utilização operacional 1971, missões Apollo 15, Apollo 16 e Apollo 17; **Viking 1 Lander** — destino Mars, aterragem 1976, missão Viking 1.
- Cada cartão deve apresentar nome do equipamento, imagem, destino, ano, descrição curta, botão **View Details** e botão **Favorite**.
- Implementar pesquisa de equipamento e filtros **All**, **Moon** e **Mars**. Pesquisa e filtros atualizam resultados sem atualizar a página.
- Implementar os comportamentos através das funções reutilizáveis `renderExplorers()`, `searchExplorers(query)` e `filterExplorers(destination)`. Apresentar estado vazio compreensível quando não houver correspondências.

## [x] 3. Detalhes históricos e científicos — concluído
- Abrir uma vista detalhada quando for selecionado **View Details**. Incluir imagem grande, nome do explorador, nome da missão, destino, data de lançamento quando disponível, data de aterragem quando aplicável, objetivos, contexto histórico, descobertas científicas, resultado da missão e ligações para fontes.
- Incluir o botão **Back to Explorers**.
- Não inventar informação histórica. Usar fontes NASA fiáveis; quando um dado não estiver disponível ou não tiver confirmação, identificá-lo como indisponível em vez de inferi-lo.
- Implementar `renderExplorerDetails(id)`.

## [x] 4. Galeria NASA Image and Video Library — concluído
- Integrar a biblioteca oficial NASA através do endpoint `https://images-api.nasa.gov/search`, usando `fetch()` e disponibilizando a função reutilizável `searchNASAImages(query)`. Não exigir conta nem chave API.
- Incluir campo de pesquisa, botão de pesquisa, indicador de carregamento, mensagem de erro, mensagem para resultados vazios, grelha responsiva, título da imagem, descrição e data se existirem, atribuição à NASA e ligação para o registo original.
- Extrair com segurança `nasa_id`, `title`, `description`, `date_created` e URL de preview apropriada. Usar a primeira ligação adequada de preview e nunca assumir que todos os resultados têm todos os campos.
- Permitir clicar numa imagem para abrir uma pré-visualização. Tratar resultados malformados, campos ausentes e falhas de rede; usar imagem local de fallback caso uma imagem não carregue. Aplicar carregamento lazy às imagens da galeria.
- A aplicação deve continuar funcional se a API estiver temporariamente indisponível. Não usar URLs aleatórias nem atribuir à NASA conteúdo de origem desconhecida. Criar módulo separado `js/nasa-api.js`; implementar `getNASAImageDetails(nasaId)` apenas se for suportado e útil.
- Implementar `renderGallery(images)`.

## [x] 5. Timeline de missões — concluído
- Criar uma timeline cronológica interativa com **1971 — Lunar Roving Vehicle**, **1976 — Viking 1**, **1997 — Sojourner** e **2004 — Opportunity**.
- Mostrar ano, nome da missão, destino e descrição histórica curta em cada item. Permitir selecionar um item para abrir os detalhes do explorador correspondente. Tornar a timeline atraente e responsiva.
- Implementar `renderTimeline()`.

## [x] 6. Favoritos persistentes — concluído
- Permitir adicionar exploradores aos favoritos, removê-los, consultar os favoritos guardados e preservar as escolhas após atualizar a página.
- Usar apenas `localStorage` do browser; não exigir registo ou conta.
- Implementar `addFavorite(id)`, `removeFavorite(id)`, `loadFavorites()` e `renderFavorites()`.

## [x] 7. Estrutura, tecnologias, desempenho e execução local — concluído
- Organizar o projeto com `index.html`, `css/styles.css`, `js/data.js`, `js/nasa-api.js`, `js/app.js`, `assets/images/`, `assets/icons/` e `README.md`. Explicar qualquer ficheiro adicional genuinamente necessário.
- Usar somente HTML5, CSS3, JavaScript vanilla ES6+, NASA Image and Video Library API e LocalStorage. Não usar React, Vue, Angular, Node.js, Express, PHP, MySQL, Bootstrap, Tailwind, ferramentas de build, gestores de pacotes ou dependências externas obrigatórias. Não criar backend nem exigir chave API.
- Usar módulos JavaScript legíveis, funções simples, arrays e objetos, event listeners adequados e poucos globais; comentários em português para as secções importantes. Usar dados dos exploradores locais e a API NASA para descoberta de imagens. Verificar que todos os caminhos locais funcionam.
- A aplicação deve funcionar por um servidor HTTP local simples, sem instalações. No README, incluir execução com `python -m http.server 5500` e acesso a `http://localhost:5500`, ou VS Code Live Server se já estiver disponível. Explicar que `fetch()` deve ser testado através de localhost, não de `file://`.
- Usar imagens locais relevantes e verificáveis ou SVGs próprios de fallback; evitar imagens quebradas. Aplicar `object-fit: cover` onde apropriado e lazy-loading na galeria.

## [x] 8. README, fontes, créditos e entrega — concluído
- Criar README.md completo em português com nome do projeto, descrição, problema, solução proposta, funcionalidades, tecnologias, origem da API, estrutura de ficheiros, instruções de execução local, instruções de teste, limitações conhecidas, créditos e referências.
- Incluir uma nota adequada de atribuição de media NASA e ligações aos registos/fontes oficiais utilizados. Explicar como carregar o projeto para GitHub e publicá-lo na Vercel.
- Entregar todos os ficheiros fonte completos e coerentes; não omitir HTML, CSS ou JavaScript, não entregar apenas mockup, não usar pseudocódigo e não deixar funcionalidades importantes como comentários TODO.
- Verificar a página inicial, navegação, cartões, pesquisa, filtros Moon/Mars, detalhes, pesquisa à API NASA, carregamento e fallback de imagens, tratamento de erro da API, favoritos em LocalStorage, navegação da timeline, layout mobile e erros graves de JavaScript. Afirmar apenas testes realmente executados e documentar limitações encontradas.