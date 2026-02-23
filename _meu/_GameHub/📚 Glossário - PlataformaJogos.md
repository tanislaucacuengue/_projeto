# 📚 Glossário - PlataformaJogos

## Variáveis Globais

### Estado da Aplicação

 Variável                          Tipo     Descrição 

 `estadoAplicacao`                 object   Estado geral da aplicação 
 `estadoAplicacao.paginaAtual`     string   ID da página atualmente visível 
 `estadoAplicacao.jogoEmExecucao`  boolean  Indica se um jogo está em execução 
 `estadoAplicacao.pausado`         boolean  Indica se o jogo está pausado 

### Estado do Quiz

  Variável                         Tipo     Descrição 
 
  `perguntasQuiz`                  object   Objeto contendo perguntas de todos os níveis 
  `perguntasQuiz.nivel1`           array    Array com 4 perguntas do nível 1 
  `perguntasQuiz.nivel2`           array    Array com 4 perguntas do nível 2 
  `estadoQuiz`                     object   Estado atual do jogo Quiz 
  `estadoQuiz.nivelAtual`          number   Nível atual (1 ou 2) 
  `estadoQuiz.perguntaAtual`       number   Índice da pergunta atual 
  `estadoQuiz.pontuacao`           number   Pontuação total acumulada 
  `estadoQuiz.respostasCorretas`   number   Número de respostas corretas 
  `estadoQuiz.respondido`          boolean  Indica se a pergunta foi respondida 

### Estado da Cobra

  Variável                       Tipo                       Descrição 
 
  `estadoCobra`                  object                     Estado do jogo Cobra 
  `estadoCobra.tela`             HTMLCanvasElement          Elemento canvas do jogo 
  `estadoCobra.contexto`         CanvasRenderingContext2D   Contexto 2D do canvas 
  `estadoCobra.cobra`            array                      Array com os segmentos da cobra 
  `estadoCobra.comida`           object                     Posição da comida {x, y} 
  `estadoCobra.direcao`          string                     Direção atual (ArrowUp, ArrowDown, etc.) 
  `estadoCobra.proximaDirecao`   string                     Próxima direção a executar 
  `estadoCobra.pontuacao`        number                     Pontuação atual 
  `estadoCobra.recorde`          number                     Recorde salvo localmente 
  `estadoCobra.velocidade`       number                     Velocidade do jogo em ms 
  `estadoCobra.pausado`          boolean                    Indica se o jogo está pausado 
  `estadoCobra.idLoop`           number                     ID do intervalo do loop 
  `estadoCobra.tamanhoBloco`     number                     Tamanho de cada bloco (30px) 
  `estadoCobra.larguraTela`      number                     Largura da tela (600px) 
  `estadoCobra.alturaTela`       number                     Altura da tela (600px) 

### Estado da Memória

  Variável                           Tipo     Descrição 
 
  `estadoMemoria`                    object   Estado do jogo Memória 
  `estadoMemoria.cartas`             array    Array com todos os objetos de carta 
  `estadoMemoria.cartasViradas`      array    Array com IDs das cartas viradas 
  `estadoMemoria.paresEncontrados`   number   Número de pares encontrados 
  `estadoMemoria.tentativas`         number   Número de tentativas realizadas 
  `estadoMemoria.bloqueado`          boolean  Indica se o jogo está bloqueado 
  `estadoMemoria.emojis`             array    Array com 8 emojis únicos 

### Estado do Flappy Bird

 Variável                       Tipo                 Descrição 

 `estadoFlappy`                 object               Estado do jogo Flappy Bird 
 `estadoFlappy.tela`            HTMLCanvasElemen     Elemento canvas do jogo 
 `estadoFlappy.contexto`        CanvasRenderingContet2D  Contexto 2D do canvas 
 `estadoFlappy.passaro`         object               Objeto do pássaro {x, y, largura, altura, velocidadeY} 
 `estadoFlappy.canos`           array                Array com os canos do jogo 
 `estadoFlappy.pontuacao`       number               Pontuação atual 
 `estadoFlappy.recorde`         number               Recorde salvo localmente 
 `estadoFlappy.gravidade`       number               Valor da gravidade (0.5) 
 `estadoFlappy.velocidadePulo`  number               Velocidade do pulo (12) 
 `estadoFlappy.velocidadeCano`  number               Velocidade dos canos (4) 
 `estadoFlappy.distanciaCanos`  number               Distância entre canos (150) 
 `estadoFlappy.idLoop`          number               ID do intervalo do loop 
 `estadoFlappy.emJogo`          boolean              Indica se o jogo está em execução 

### Estado do 2048

  Variável                 Tipo      Descrição 
 
  `estado2048`             object    Estado do jogo 2048 
  `estado2048.tabuleiro`   array     Matriz 4x4 com os números 
  `estado2048.pontuacao`   number    Pontuação atual 
  `estado2048.melhor`      number    Melhor pontuação salva 
  `estado2048.emJogo`      boolean   Indica se o jogo está em execução 

## IDs HTML (Identificadores)

### Navegação e Estrutura

  ID             Elemento   Descrição 
 
  `inicio`       section    Página inicial com conteúdo educativo 
  `quiz`         section    Página com o jogo Quiz 
  `cobra`        section    Página com o jogo Cobra 
  `memoria`      section    Página com o jogo Memória 
  `flappybird`   section    Página com o jogo Flappy Bird 
  `jogo2048`     section    Página com o jogo 2048 

### Quiz

  ID                          Elemento   Descrição 
 
  `pergunta-quiz`             h3         Elemento que exibe a pergunta 
  `botoes-resposta`           div        Contentor dos botões de resposta 
  `botao-proximo`             button     Botão para ir para a próxima pergunta 
  `preenchimento-progresso`   div        Barra de progresso 
  `texto-progresso`           p          Texto de progresso (ex: "Pergunta 1 de 4") 

### Cobra

  ID                        Elemento   Descrição 
 
  `tela-cobra`              canvas     Canvas do jogo Cobra 
  `pontuacao-cobra`         span       Exibição da pontuação atual 
  `recorde-cobra`           span       Exibição do recorde 
  `velocidade-cobra`        input      Slider de velocidade 
  `valor-velocidade`        span       Valor atual da velocidade 
  `botao-pausa-cobra`       button     Botão de pausa/retomar 
  `menu-game-over-cobra`    div        Menu que aparece ao game over 
  `pontuacao-final-cobra`   span       Pontuação final exibida no menu 

### Memória

  ID                     Elemento   Descrição 

  `tabuleiro-memoria`    div        Contentor do tabuleiro de cartas 
  `tentativas-memoria`   span       Exibição do número de tentativas 
  `pares-memoria`        span       Exibição de pares encontrados 

### Flappy Bird

  ID                         Elemento   Descrição 

  `tela-flappy`              canvas     Canvas do jogo Flappy Bird 
  `pontuacao-flappy`         span       Exibição da pontuação 
  `recorde-flappy`           span       Exibição do recorde 
  `menu-game-over-flappy`    div        Menu que aparece ao game over 
  `pontuacao-final-flappy`   span       Pontuação final exibida no menu 

### 2048

  ID                       Elemento   Descrição 
 
  `tabuleiro-2048`         div        Contentor do tabuleiro 
  `pontuacao-2048`         span       Exibição da pontuação 
  `melhor-2048`            span       Exibição da melhor pontuação 
  `menu-game-over-2048`    div        Menu que aparece ao game over 
  `pontuacao-final-2048`   span       Pontuação final exibida no menu 

## Classes CSS

### Estrutura Geral

  Classe                  Descrição 

  `cabecalho`             Estilo do cabeçalho principal 
  `contentor-cabecalho`   Contentor do cabeçalho 
  `logotipo`              Estilo do logotipo 
  `icone-logotipo`        Ícone do logotipo 
  `titulo-logotipo`       Título do logotipo 
  `menu-navegacao`        Menu de navegação 
  `ligacao-navegacao`     Ligação individual de navegação 
  `ativa`                 Classe para indicar página/ligação ativa 

### Conteúdo Principal

  Classe                 Descrição 
 
  `conteudo-principal`   Contentor do conteúdo principal 
  `pagina`               Classe para cada página 
  `ativa`                Indicador de página ativa 

### Seção Herói

 Classe             Descrição 

 `secao-heroi`      Estilo da seção herói 
 `conteudo-heroi`   Conteúdo da seção herói 
 `titulo-heroi`     Título da seção herói 
 `descricao-heroi`  Descrição da seção herói 
 `visual-heroi`     Área visual da seção herói 
 `forma-heroi`      Forma animada do herói 

### Seções Educativas

  Classe           Descrição 
 
  `secao-dicas`    Estilo da seção de dicas 
  `titulo-secao`   Título das seções 
  `grelha-dicas`   Grelha para cartões de dicas 
  `cartao-dica`    Cartão individual de dica 
  `icone-dica`     Ícone dentro do cartão 
  `titulo-dica`    Título do cartão 
  `texto-dica`     Texto do cartão 
  `lista-dica`     Lista de pontos dentro do cartão 

### Seção de Benefícios

  Classe                Descrição 
 
  `secao-beneficios`    Estilo da seção de benefícios 
  `grelha-beneficios`   Grelha para cartões de benefício 
  `cartao-beneficio`    Cartão de benefício 
  `numero-beneficio`    Número do benefício 

### Contentor de Jogos

  Classe             Descrição 
 
  `contentor-jogo`   Contentor do jogo 
  `cabecalho-jogo`   Cabeçalho do jogo 
  `titulo-jogo`      Título do jogo 
  `botao-voltar`     Botão para voltar à página inicial 

### Quiz

  Classe                      Descrição 
 
  `aplicacao-quiz`            Contentor da aplicação Quiz 
  `progresso-quiz`            Contentor do progresso 
  `barra-progresso`           Barra de progresso 
  `preenchimento-progresso`   Preenchimento da barra 
  `texto-progresso`           Texto do progresso 
  `pergunta-quiz`             Elemento da pergunta 
  `botoes-resposta`           Contentor dos botões 
  `botao-resposta`            Botão de resposta individual 
  `botao-resposta.correto`    Estilo para resposta correta 
  `botao-resposta.incorreto`  Estilo para resposta incorreta 
  `botao-proximo`             Botão próximo |

### Cobra

  Classe                   Descrição 
 
  `aplicacao-cobra`        Contentor da aplicação Cobra 
  `info-cobra`             Informações do jogo 
  `item-info`              Item de informação 
  `label-info`             Label da informação 
  `valor-info`             Valor da informação 
  `controles-cobra`        Controles do jogo 
  `botao-pausa`            Botão de pausa 
  `botao-pausa.em-pausa`   Estilo quando em pausa 
  `tela-cobra`             Canvas do jogo 
  `menu-game-over`         Menu de game over 
  `conteudo-game-over`     Conteúdo do menu 
  `botao-reiniciar`        Botão de reinício 

### Memória

  Classe                       Descrição 
 
  `aplicacao-memoria`          Contentor da aplicação Memória 
  `info-memoria`               Informações do jogo 
  `tabuleiro-memoria`          Tabuleiro de cartas 
  `carta-memoria`              Carta individual 
  `carta-memoria.virada`       Estilo quando virada 
  `carta-memoria.encontrada`   Estilo quando encontrada 

### Flappy Bird

  Classe               Descrição 

  `aplicacao-flappy`   Contentor da aplicação Flappy 
  `info-flappy`        Informações do jogo 
  `tela-flappy`        Canvas do jogo 

### 2048

  Classe             Descrição 
 
  `aplicacao-2048`   Contentor da aplicação 2048 
  `info-2048`        Informações do jogo 
  `tabuleiro-2048`   Tabuleiro do jogo 
  `bloco-2048`       Bloco individual 

### Rodapé

  Classe           Descrição 
 
  `rodape`         Estilo do rodapé 
  `texto-rodape`   Texto do rodapé 

## Funções JavaScript

### Navegação

#### `navegarPara(idPagina)`
Gerencia a navegação entre as diferentes seções da aplicação.

**Parâmetros:**
- `idPagina` (string): ID da página para a qual navegar

**Ações:**
1. Esconde todas as páginas
2. Mostra a página selecionada
3. Atualiza os indicadores de navegação
4. Rola a página para o topo
5. Inicializa o jogo correspondente
6. Pausa o jogo da cobra ao sair

### Quiz

#### `inicializarQuiz()`
Inicializa o jogo Quiz.

#### `mostrarPerguntaQuiz()`
Mostra a pergunta atual e seus botões de resposta.

#### `selecionarRespostaQuiz(botao, estaCorreto)`
Processa a seleção de uma resposta.

**Parâmetros:**
- `botao` (HTMLElement): Botão clicado
- `estaCorreto` (boolean): Se a resposta está correta

#### `proximaPerguntaQuiz()`
Avança para a próxima pergunta ou nível.

#### `mostrarResultadoQuiz()`
Exibe o resultado final do Quiz.

### Cobra

#### `inicializarCobra()`
Inicializa o jogo Cobra.

#### `gerarComidaCobra()`
Gera uma posição aleatória para a comida.

#### `desenharCobra()`
Desenha a cobra e a comida no canvas.

#### `moverCobra()`
Move a cobra na direção atual.

#### `tratarTeclaCobra(evento)`
Trata as teclas pressionadas para controlar a cobra.

**Parâmetros:**
- `evento` (KeyboardEvent): Evento de teclado

#### `alternarPausaCobra()`
Alterna entre pausa e retomar.

#### `pausarCobra()`
Pausa o jogo da cobra.

#### `atualizarBotaoPausaCobra()`
Atualiza o texto e estilo do botão de pausa.

#### `alterarVelocidadeCobra(evento)`
Altera a velocidade do jogo.

**Parâmetros:**
- `evento` (Event): Evento do slider

#### `iniciarLoopCobra()`
Inicia o loop do jogo.

#### `finalizarCobra()`
Finaliza o jogo da cobra (game over).

#### `reiniciarCobra()`
Reinicia o jogo da cobra.

### Memória

#### `inicializarMemoria()`
Inicializa o jogo Memória.

#### `desenharTabuleiroMemoria()`
Desenha o tabuleiro de cartas.

#### `clicarCartaMemoria(idCarta)`
Processa o clique numa carta.

**Parâmetros:**
- `idCarta` (number): ID da carta clicada

#### `verificarPareMemoria()`
Verifica se as duas cartas viradas formam um par.

#### `reiniciarMemoria()`
Reinicia o jogo Memória.

### Flappy Bird

#### `inicializarFlappy()`
Inicializa o jogo Flappy Bird.

#### `atualizarFlappy()`
Atualiza a posição do pássaro e canos.

#### `desenharFlappy()`
Desenha o pássaro e canos no canvas.

#### `finalizarFlappy()`
Finaliza o jogo Flappy Bird (game over).

#### `reiniciarFlappy()`
Reinicia o jogo Flappy Bird.

### 2048

#### `inicializar2048()`
Inicializa o jogo 2048.

#### `adicionarNumero2048()`
Adiciona um número aleatório ao tabuleiro.

#### `mover2048(direcao)`
Move os blocos na direção especificada.

**Parâmetros:**
- `direcao` (string): Direção do movimento (ArrowUp, ArrowDown, ArrowLeft, ArrowRight)

#### `desenharTabuleiro2048()`
Desenha o tabuleiro 2048.

#### `verificarGameOver2048()`
Verifica se o jogo terminou.

#### `reiniciar2048()`
Reinicia o jogo 2048.

## Atributos de Dados (data-*)

  Atributo         Elemento              Descrição 
 
  `dados-pagina`   a.ligacao-navegacao   ID da página para navegação 

## Constantes e Valores Fixos

### Cores

```css
--cor-azul-profundo: #1E40AF;
--cor-azul-claro: #3B82F6;
--cor-verde: #10B981;
--cor-laranja: #F97316;
--cor-roxo: #8B5CF6;
--cor-branca: #FFFFFF;
--cor-fundo-escuro: #0F172A;
--cor-cinzento-claro: #F3F4F6;
--cor-cinzento-medio: #D1D5DB;
--cor-cinzento-escuro: #4B5563;
--cor-texto-escuro: #1F2937;
--cor-texto-claro: #6B7280;
--cor-borda: #E5E7EB;
--cor-sucesso: #10B981;
--cor-erro: #EF4444;
--cor-aviso: #F59E0B;
--cor-informacao: #3B82F6;
```

### Espaçamento

```css
--espacamento-xs: 0.5rem;
--espacamento-sm: 1rem;
--espacamento-md: 1.5rem;
--espacamento-lg: 2rem;
--espacamento-xl: 3rem;
--espacamento-2xl: 4rem;
```

### Tipografia

```css
--familia-fonte: 'Poppins', sans-serif;
--tamanho-fonte-xs: 0.75rem;
--tamanho-fonte-sm: 0.875rem;
--tamanho-fonte-base: 1rem;
--tamanho-fonte-lg: 1.125rem;
--tamanho-fonte-xl: 1.5rem;
--tamanho-fonte-2xl: 2rem;
--tamanho-fonte-3xl: 2.5rem;
```

---

**Última atualização: Fevereiro 2026**
**Versão: 1.0**
