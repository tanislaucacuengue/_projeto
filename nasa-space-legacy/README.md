# NASA Space Legacy — The Forgotten Explorers

**Um pequeno museu digital sobre as máquinas que exploraram a Lua e Marte.** Este protótipo educativo para o NASA Space Apps Challenge 2026 reúne histórias, fotografias e registos de quatro exploradores: Sojourner, Opportunity, Lunar Roving Vehicle e Viking 1 Lander.

## Problema e solução

As missões espaciais costumam ser lembradas pelo lançamento, pelo pouso ou pela primeira fotografia. As máquinas que atravessam esses momentos são menos conhecidas, apesar do trabalho científico que realizam. O NASA Space Legacy organiza uma coleção histórica pesquisável e acessível, com informação local sustentada por fontes NASA e uma galeria que pesquisa a biblioteca pública de imagens da agência.

A ideia central é: **“Even when a mission ends, its contribution to science should never be forgotten.”** O projeto é independente e não é afiliado nem endossado pela NASA.

## Funcionalidades

- Página inicial com o propósito do museu e acesso ao catálogo.
- Catálogo pesquisável e filtros instantâneos por Moon e Mars.
- Fichas detalhadas com objetivos, contexto, resultados, datas disponíveis e fontes oficiais.
- Timeline clicável de 1971 a 2004.
- Favoritos guardados no `localStorage` deste browser, sem conta.
- Pesquisa e pré-visualização de fotografias através da NASA Image and Video Library API.
- Fotografias NASA selecionadas guardadas localmente para as fichas iniciais, com SVGs locais de fallback.
- Layout responsivo, rótulos acessíveis e estados de carregamento, sucesso, erro e resultados vazios.

## Tecnologias

HTML5, CSS3, JavaScript ES Modules (ES6+), `fetch()`, `localStorage` e a NASA Image and Video Library API. Não é necessário instalar pacotes, usar Node.js, configurar uma chave API ou executar um servidor de aplicação. Não há backend nem base de dados.

## API e dados

A pesquisa da galeria usa o endpoint público `https://images-api.nasa.gov/search` com `media_type=image`. O módulo `js/nasa-api.js` valida respostas e metadados opcionais. A galeria precisa de acesso à Internet e depende da disponibilidade da API; o catálogo, as fichas, os favoritos existentes e as imagens locais continuam acessíveis sem uma resposta da API.

Os factos das missões estão no módulo local `js/data.js`; não são carregados da API de imagens. Cada fotografia de missão liga ao respetivo registo NASA, e cada resultado da galeria tem atribuição e ligação para o original.

## Estrutura do projeto

```text
nasa-space-legacy/
├── app.config.ts              # Logótipo de metadados do projeto Webdev, não carregado pelo site
├── index.html                 # Estrutura e conteúdo inicial da página única
├── manus-routes.json          # Declaração da rota principal para o Preview gerido
├── css/
│   └── styles.css             # Identidade visual, estados e regras responsivas
├── js/
│   ├── data.js                # Factos locais e referências às fontes
│   ├── nasa-api.js            # Pesquisa e leitura defensiva da API NASA
│   └── app.js                 # Renderização, navegação e interações
├── assets/
│   ├── images/                # Imagens NASA selecionadas e fallbacks SVG
│   └── icons/
│       └── mission-mark.svg   # Símbolo independente do projeto
├── README.md
└── TODO.md                    # Critérios e estado dos entregáveis
```

`app.config.ts` é apenas metadado de marca necessário ao projeto no ambiente Webdev; não faz parte do site estático e não é importado. `manus-routes.json` declara a rota para o Preview gerido; continua a ser uma página estática comum. `TODO.md` acompanha os critérios do protótipo.

## Executar localmente

É preciso servir os ficheiros por HTTP para que os módulos ES e `fetch()` funcionem corretamente. A partir da pasta do projeto, execute:

```bash
python -m http.server 5500
```

Depois, abra [http://localhost:5500](http://localhost:5500). Como alternativa, use a extensão VS Code Live Server se já estiver instalada. Abrir o `index.html` diretamente por `file://` não é suportado para testar módulos e chamadas à API.

## Testes e verificações executados

No Preview, confirmei que a página inicial carrega, apresenta quatro cartões e quatro itens na timeline, e que a chamada NASA `Mars rover` devolve 12 registos cujos 12 previews carregaram no browser de teste. A pesquisa por Opportunity devolveu um cartão; o filtro Moon mostrou apenas Lunar Roving Vehicle. Abri e fechei uma ficha a partir do catálogo e da timeline, abri o preview de uma imagem e confirmei que o botão Explore Missions navega para o catálogo.

Guardei um favorito, recarreguei a página e confirmei que permaneceu guardado; depois removi-o. Também simulei uma resposta API vazia e uma falha de rede e confirmei as mensagens correspondentes. O screenshot de validação mobile foi capturado em 390 × 844 px; a lógica do botão do menu foi exercitada no browser de teste. O HTML, os caminhos locais, o manifesto de rotas e a sintaxe dos módulos JS também foram verificados. Estas verificações foram feitas numa única sessão de browser, não constituem uma certificação em todos os browsers ou dispositivos físicos.

## Limitações conhecidas

- A galeria é a única secção que depende de rede; a API pode estar temporariamente indisponível, devolver poucos resultados ou omitir descrições e datas.
- Os favoritos são armazenados apenas neste browser e neste dispositivo; não são sincronizados entre dispositivos e podem ser removidos ao limpar os dados do site.
- A biblioteca de imagens não é um feed de telemetria nem uma fonte de dados atualizados sobre o estado das missões. A coleção de quatro fichas e a timeline são dados editoriais locais.
- A qualidade e o enquadramento das imagens arquivísticas variam entre os registos. As fichas apontam sempre para o registo NASA correspondente.
- A aplicação não pretende substituir as páginas técnicas e históricas oficiais citadas abaixo.

## Fontes e atribuição

Factos de missão:

- [NASA — Mars Pathfinder](https://science.nasa.gov/mission/mars-pathfinder/) — datas da missão, objetivos, Sojourner e resultados científicos.
- [NASA — Opportunity](https://science.nasa.gov/mission/mer-opportunity/) — lançamento, aterragem, objetivos, registo de resultados e conclusão da missão.
- [NASA — Viking 1](https://science.nasa.gov/mission/viking-1/) — cronologia, instrumentos, resultados e fim de operação.
- [NASA Goddard / NSSDCA — Lunar Roving Vehicle](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html) — utilização nos Apollo 15, 16 e 17 e dados do veículo.

Imagens locais incluídas:

- [PIA00621 — Color Mosaic of Rover & Terrain](https://images.nasa.gov/details/PIA00621), utilizado no hero.
- [PIA04318 — Sojourner Sits Near “Rock Garden”](https://images.nasa.gov/details/PIA04318), utilizado na ficha Sojourner.
- [PIA13803 — Opportunity is Still Smiling](https://images.nasa.gov/details/PIA13803), utilizado na ficha Opportunity.
- [AS15-88-11901 — Lunar Roving Vehicle photographed against lunar background](https://images.nasa.gov/details/as15-88-11901), utilizado na ficha Lunar Roving Vehicle.
- [PIA00382 — First Panoramic View From The Surface Of Mars](https://images.nasa.gov/details/PIA00382), utilizado na ficha Viking 1.

Os registos estão ligados à NASA Image and Video Library. Consultar a página individual de cada registo para obter o crédito, as notas de direitos de autor e quaisquer restrições aplicáveis ao material apresentado; algumas coleções podem conter contribuições de terceiros. A aplicação usa apenas o nome textual NASA como atribuição e não apresenta o logótipo institucional como marca do projeto.

## GitHub e Vercel

1. Crie um repositório vazio no GitHub e, na pasta do projeto, inicialize Git, adicione os ficheiros e faça o primeiro commit:

   ```bash
   git init
   git add .
   git commit -m "Create NASA Space Legacy museum"
   git branch -M main
   git remote add origin https://github.com/SEU-UTILIZADOR/nasa-space-legacy.git
   git push -u origin main
   ```

2. No Vercel, importe esse repositório GitHub. Selecione **Other** como framework preset e mantenha a raiz do projeto como Root Directory. Não configure Build Command nem dependências; publique os ficheiros estáticos diretamente. Depois de cada `git push` para a branch ligada, o Vercel pode criar um novo deployment.

As experiências locais não requerem GitHub ou Vercel: estas instruções são apenas para partilhar ou publicar o protótipo.
