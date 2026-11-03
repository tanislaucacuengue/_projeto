# Glossário técnico — GameHub

Este documento descreve identificadores e funções encontrados em `index.html` e `script.js`. Não inclui funções planeadas ou não implementadas.

## Estado da aplicação

- `estadoAplicacao.paginaAtual` — página/jogo actualmente seleccionado.
- `estadoAplicacao.jogoEmExecucao` — indica o estado usado pelo ciclo da Cobra.
- `estadoAplicacao.pausado` — propriedade declarada no estado global; a pausa efectiva é controlada também por cada jogo.

## Jogos e dados

### Quiz

- `perguntasQuiz.nivel1`, `perguntasQuiz.nivel2` — quatro perguntas por nível.
- `estadoQuiz.nivelAtual`, `perguntaAtual`, `pontuacao`, `respostasCorretas`, `respondido` — progresso e resultado da sessão.
- Funções: `inicializarQuiz`, `mostrarPerguntaQuiz`, `selecionarRespostaQuiz`, `proximaPerguntaQuiz`, `mostrarResultadoQuiz`.

### Cobra

- `estadoCobra.cobra`, `comida`, `direcao`, `proximaDirecao`, `pontuacao`, `recorde`, `velocidade`, `pausado`, `idLoop` — estado do jogo e do ciclo de desenho.
- Funções: `inicializarCobra`, `gerarComidaCobra`, `desenharCobra`, `moverCobra`, `tratarTeclaCobra`, `alternarPausaCobra`, `pausarCobra`, `alterarVelocidadeCobra`, `iniciarLoopCobra`, `finalizarCobra`, `reiniciarCobra`.

### Memória

- `estadoMemoria.cartas`, `cartasViradas`, `paresEncontrados`, `tentativas`, `bloqueado`, `icones` — cartas e progresso. Os símbolos são classes de ícones Font Awesome, não emojis.
- Funções: `inicializarMemoria`, `desenharTabuleiroMemoria`, `clicarCartaMemoria`, `verificarPareMemoria`, `reiniciarMemoria`.
- Não há estado nem função de temporizador implementados.

### Flappy

- `estadoFlappy.tela`, `contexto`, `passaro`, `canos`, `pontuacao`, `recorde`, `gravidade`, `velocidadePulo`, `velocidadeCano`, `distanciaCanos`, `idLoop`, `emJogo`, `pausado`.
- Funções: `inicializarFlappy`, `atualizarFlappy`, `desenharFlappy`, `finalizarFlappy`, `reiniciarFlappy`.

### 2048

- `estado2048.tabuleiro`, `pontuacao`, `recorde`, `tamanho`.
- Funções: `inicializar2048`, `adicionarBloco2048`, `desenharTabuleiro2048`, `obterCor2048`, `tratarTecla2048`, `mover2048`, `reiniciar2048`.
- Não existe `verificarGameOver2048`; a detecção automática de fim de jogo ainda não está implementada.

## Navegação e identificadores HTML

- Páginas: `inicio`, `quiz`, `cobra`, `memoria`, `flappybird`, `jogo2048`.
- Navegação: `menu-navegacao`, `botao-hamburger`; os links usam `data-pagina`.
- Quiz: `pergunta-quiz`, `botoes-resposta`, `botao-proximo`, `preenchimento-progresso`, `texto-progresso`.
- Cobra: `tela-cobra`, `pontuacao-cobra`, `recorde-cobra`, `velocidade-cobra`, `botao-pausa-cobra`, `menu-game-over-cobra`.
- Memória: `tabuleiro-memoria`, `tentativas-memoria`, `pares-memoria`.
- Flappy: `tela-flappy`, `pontuacao-flappy`, `recorde-flappy`, `botao-pausa-flappy`, `menu-game-over-flappy`.
- 2048: `tabuleiro-2048`, `pontuacao-2048`, `recorde-2048` e os quatro botões `btn-2048-*`.

## Persistência local

As três melhores pontuações são guardadas no armazenamento local do navegador através das chaves `recordeCobra`, `recordeFlappy` e `recorde2048`. Não existe sincronização remota demonstrada.

## Dependências externas

Font Awesome 6.5.1 fornece os ícones e Google Fonts fornece a fonte Poppins através de CDN. O código dos jogos é JavaScript sem framework.