/* ============================================
   PLATAFORMA JOGOS - LÓGICA JAVASCRIPT
   ============================================ */

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

// Estado da aplicação
let estadoAplicacao = {
    paginaAtual: 'inicio',
    jogoEmExecucao: false,
    pausado: false
};

// ============================================
// FUNÇÕES DE NAVEGAÇÃO
// ============================================

/**
 * Função para navegar entre páginas
 * @param {string} idPagina - ID da página para a qual navegar
 * 
 * Descrição: Esta função gerencia a navegação entre as diferentes
 * seções da aplicação. Ela:
 * 1. Esconde todas as páginas
 * 2. Mostra a página selecionada
 * 3. Atualiza os indicadores de navegação
 * 4. Rola a página para o topo
 * 5. Inicializa o jogo se necessário
 */
function navegarPara(idPagina) {
    // Obter todas as páginas da aplicação
    const todasAsPaginas = document.querySelectorAll('.pagina');
    
    // Esconder todas as páginas
    todasAsPaginas.forEach(pagina => pagina.classList.remove('ativa'));

    // Obter a página selecionada
    const paginaSelecionada = document.getElementById(idPagina);
    
    // Mostrar a página selecionada
    if (paginaSelecionada) {
        paginaSelecionada.classList.add('ativa');
    }

    // Obter todas as ligações de navegação
    const ligacoesNavegacao = document.querySelectorAll('.ligacao-navegacao');
    
    // Remover classe ativa de todas as ligações
    ligacoesNavegacao.forEach(ligacao => ligacao.classList.remove('ativa'));
    
    // Adicionar classe ativa à ligação correspondente
    const ligacaoAtiva = document.querySelector(`[dados-pagina="${idPagina}"]`);
    if (ligacaoAtiva) {
        ligacaoAtiva.classList.add('ativa');
    }

    // Atualizar o estado da aplicação
    estadoAplicacao.paginaAtual = idPagina;

    // Rolar a página para o topo com comportamento suave
    window.scrollTo(0, 0);

    // Pausar o jogo da cobra ao sair da página
    if (idPagina !== 'cobra' && estadoAplicacao.jogoEmExecucao) {
        pausarCobra();
    }

    // Inicializar o jogo correspondente
    if (idPagina === 'quiz') {
        inicializarQuiz();
    } else if (idPagina === 'cobra') {
        inicializarCobra();
    } else if (idPagina === 'memoria') {
        inicializarMemoria();
    } else if (idPagina === 'flappybird') {
        inicializarFlappy();
    } else if (idPagina === 'jogo2048') {
        inicializar2048();
    }
}

// ============================================
// JOGO QUIZ
// ============================================

// Dados do Quiz
const perguntasQuiz = {
    nivel1: [
        {
            pergunta: "Qual é o maior animal do mundo?",
            respostas: [
                { texto: "Tubarão", correto: false },
                { texto: "Baleia Azul", correto: true },
                { texto: "Elefante", correto: false },
                { texto: "Girafa", correto: false }
            ]
        },
        {
            pergunta: "Qual é o maior deserto do mundo?",
            respostas: [
                { texto: "Kalahari", correto: false },
                { texto: "Gobi", correto: false },
                { texto: "Saara", correto: true },
                { texto: "Antártida", correto: false }
            ]
        },
        {
            pergunta: "Qual é o menor continente do mundo?",
            respostas: [
                { texto: "Ásia", correto: false },
                { texto: "Austrália", correto: true },
                { texto: "Ártico", correto: false },
                { texto: "Europa", correto: false }
            ]
        },
        {
            pergunta: "Qual é o menor país do mundo?",
            respostas: [
                { texto: "Vaticano", correto: true },
                { texto: "Butão", correto: false },
                { texto: "Nepal", correto: false },
                { texto: "Sri Lanka", correto: false }
            ]
        }
    ],
    nivel2: [
        {
            pergunta: "Qual é o planeta mais próximo do Sol?",
            respostas: [
                { texto: "Vénus", correto: false },
                { texto: "Mercúrio", correto: true },
                { texto: "Terra", correto: false },
                { texto: "Marte", correto: false }
            ]
        },
        {
            pergunta: "Quem pintou a Mona Lisa?",
            respostas: [
                { texto: "Leonardo da Vinci", correto: true },
                { texto: "Michelangelo", correto: false },
                { texto: "Rafael", correto: false },
                { texto: "Donatello", correto: false }
            ]
        },
        {
            pergunta: "Qual é o país com mais habitantes no mundo?",
            respostas: [
                { texto: "Índia", correto: true },
                { texto: "China", correto: false },
                { texto: "EUA", correto: false },
                { texto: "Brasil", correto: false }
            ]
        },
        {
            pergunta: "Qual é a capital do Japão?",
            respostas: [
                { texto: "Pequim", correto: false },
                { texto: "Seul", correto: false },
                { texto: "Tóquio", correto: true },
                { texto: "Osaka", correto: false }
            ]
        }
    ]
};

// Variáveis do Quiz
let estadoQuiz = {
    nivelAtual: 1,
    perguntaAtual: 0,
    pontuacao: 0,
    respostasCorretas: 0,
    respondido: false
};

/**
 * Função para inicializar o Quiz
 */
function inicializarQuiz() {
    // Resetar o estado do quiz
    estadoQuiz = {
        nivelAtual: 1,
        perguntaAtual: 0,
        pontuacao: 0,
        respostasCorretas: 0,
        respondido: false
    };
    
    // Mostrar a primeira pergunta
    mostrarPerguntaQuiz();
}

/**
 * Função para mostrar a pergunta do Quiz
 */
function mostrarPerguntaQuiz() {
    // Obter as perguntas do nível atual
    const perguntasNivel = estadoQuiz.nivelAtual === 1 ? 
        perguntasQuiz.nivel1 : perguntasQuiz.nivel2;
    
    // Obter a pergunta atual
    const perguntaAtual = perguntasNivel[estadoQuiz.perguntaAtual];
    
    // Atualizar o elemento de pergunta
    const elementoPergunta = document.getElementById('pergunta-quiz');
    elementoPergunta.textContent = perguntaAtual.pergunta;
    
    // Atualizar o progresso
    const totalPerguntas = perguntasNivel.length;
    const numeroPergunta = estadoQuiz.perguntaAtual + 1;
    document.getElementById('texto-progresso').textContent = 
        `Pergunta ${numeroPergunta} de ${totalPerguntas}`;
    
    // Atualizar a barra de progresso
    const percentual = (numeroPergunta / totalPerguntas) * 100;
    document.getElementById('preenchimento-progresso').style.width = percentual + '%';
    
    // Limpar os botões de resposta
    const containerBotoes = document.getElementById('botoes-resposta');
    containerBotoes.innerHTML = '';
    
    // Criar botões para cada resposta
    perguntaAtual.respostas.forEach((resposta, indice) => {
        const botao = document.createElement('button');
        botao.className = 'botao-resposta';
        botao.textContent = resposta.texto;
        botao.dataset.correto = resposta.correto;
        botao.onclick = () => selecionarRespostaQuiz(botao, resposta.correto);
        containerBotoes.appendChild(botao);
    });
    
    // Esconder o botão próximo
    document.getElementById('botao-proximo').style.display = 'none';
    
    // Resetar o estado de resposta
    estadoQuiz.respondido = false;
}

/**
 * Função para selecionar uma resposta no Quiz
 */
function selecionarRespostaQuiz(botao, estaCorreto) {
    // Verificar se já foi respondido
    if (estadoQuiz.respondido) return;
    
    // Marcar como respondido
    estadoQuiz.respondido = true;
    
    // Desabilitar todos os botões
    const botoes = document.querySelectorAll('.botao-resposta');
    botoes.forEach(b => b.disabled = true);
    
    // Aplicar classe de resposta
    if (estaCorreto) {
        botao.classList.add('correto');
        estadoQuiz.respostasCorretas++;
        estadoQuiz.pontuacao += 10;
    } else {
        botao.classList.add('incorreto');
        // Mostrar a resposta correta
        botoes.forEach(b => {
            if (b.dataset.correto === 'true') {
                b.classList.add('correto');
            }
        });
    }
    
    // Mostrar o botão próximo
    document.getElementById('botao-proximo').style.display = 'block';
}

/**
 * Função para ir para a próxima pergunta do Quiz
 */
function proximaPerguntaQuiz() {
    // Obter as perguntas do nível atual
    const perguntasNivel = estadoQuiz.nivelAtual === 1 ? 
        perguntasQuiz.nivel1 : perguntasQuiz.nivel2;
    
    // Verificar se há mais perguntas
    if (estadoQuiz.perguntaAtual < perguntasNivel.length - 1) {
        // Ir para a próxima pergunta
        estadoQuiz.perguntaAtual++;
        mostrarPerguntaQuiz();
    } else {
        // Verificar se há mais níveis
        if (estadoQuiz.nivelAtual < 2) {
            // Ir para o próximo nível
            estadoQuiz.nivelAtual++;
            estadoQuiz.perguntaAtual = 0;
            estadoQuiz.respostasCorretas = 0;
            mostrarPerguntaQuiz();
        } else {
            // Mostrar resultado final
            mostrarResultadoQuiz();
        }
    }
}

/**
 * Função para mostrar o resultado final do Quiz
 */
function mostrarResultadoQuiz() {
    // Atualizar o elemento de pergunta com o resultado
    const elementoPergunta = document.getElementById('pergunta-quiz');
    elementoPergunta.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Parabéns! Você terminou o Quiz!</h3>
            <p>Pontuação Total: <strong>${estadoQuiz.pontuacao}</strong></p>
            <p>Respostas Corretas: <strong>${estadoQuiz.respostasCorretas} de 8</strong></p>
        </div>
    `;
    
    // Limpar os botões de resposta
    document.getElementById('botoes-resposta').innerHTML = '';
    
    // Atualizar o botão próximo
    const botaoProximo = document.getElementById('botao-proximo');
    botaoProximo.textContent = 'Jogar Novamente';
    botaoProximo.style.display = 'block';
    botaoProximo.onclick = () => navegarPara('quiz');
}

// Adicionar listener ao botão próximo do Quiz
document.addEventListener('DOMContentLoaded', () => {
    const botaoProximo = document.getElementById('botao-proximo');
    if (botaoProximo) {
        botaoProximo.addEventListener('click', proximaPerguntaQuiz);
    }
});

// ============================================
// JOGO COBRA
// ============================================

// Variáveis do Jogo Cobra
let estadoCobra = {
    tela: null,
    contexto: null,
    cobra: [{x: 270, y: 240}],
    comida: {x: 300, y: 300},
    direcao: null,
    proximaDirecao: null,
    pontuacao: 0,
    recorde: localStorage.getItem('recordeCobra') || 0,
    velocidade: 100,
    pausado: true,
    idLoop: null,
    tamanhoBloco: 30,
    larguraTela: 600,
    alturaTela: 600
};

/**
 * Função para inicializar o Jogo Cobra
 */
function inicializarCobra() {
    // Obter o canvas
    estadoCobra.tela = document.getElementById('tela-cobra');
    estadoCobra.contexto = estadoCobra.tela.getContext('2d');
    
    // Resetar o estado
    estadoCobra.cobra = [{x: 270, y: 240}];
    estadoCobra.direcao = null;
    estadoCobra.proximaDirecao = null;
    estadoCobra.pontuacao = 0;
    estadoCobra.pausado = true;
    estadoAplicacao.jogoEmExecucao = true;
    
    // Atualizar a exibição do recorde
    document.getElementById('recorde-cobra').textContent = estadoCobra.recorde;
    document.getElementById('pontuacao-cobra').textContent = '0';
    
    // Gerar comida inicial
    gerarComidaCobra();
    
    // Desenhar o jogo inicial
    desenharCobra();
    
    // Configurar listeners
    document.addEventListener('keydown', tratarTeclaCobra);
    document.getElementById('botao-pausa-cobra').addEventListener('click', alternarPausaCobra);
    document.getElementById('velocidade-cobra').addEventListener('input', alterarVelocidadeCobra);
    
    // Iniciar o loop do jogo
    iniciarLoopCobra();
}

/**
 * Função para gerar comida aleatória
 */
function gerarComidaCobra() {
    const numeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const tamanho = estadoCobra.tamanhoBloco;
    
    estadoCobra.comida = {
        x: Math.round(numeroAleatorio(0, estadoCobra.larguraTela - tamanho) / tamanho) * tamanho,
        y: Math.round(numeroAleatorio(0, estadoCobra.alturaTela - tamanho) / tamanho) * tamanho
    };
}

/**
 * Função para desenhar a cobra
 */
function desenharCobra() {
    const ctx = estadoCobra.contexto;
    const tamanho = estadoCobra.tamanhoBloco;
    
    // Limpar a tela
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, estadoCobra.larguraTela, estadoCobra.alturaTela);
    
    // Desenhar a cobra
    estadoCobra.cobra.forEach((segmento, indice) => {
        if (indice === estadoCobra.cobra.length - 1) {
            // Cabeça da cobra (mais clara)
            ctx.fillStyle = '#00FF00';
        } else {
            // Corpo da cobra
            ctx.fillStyle = '#00CC00';
        }
        ctx.fillRect(segmento.x, segmento.y, tamanho, tamanho);
        ctx.strokeStyle = '#009900';
        ctx.lineWidth = 2;
        ctx.strokeRect(segmento.x, segmento.y, tamanho, tamanho);
    });
    
    // Desenhar a comida
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(
        estadoCobra.comida.x + tamanho / 2,
        estadoCobra.comida.y + tamanho / 2,
        tamanho / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

/**
 * Função para mover a cobra
 */
function moverCobra() {
    // Verificar se o jogo está pausado
    if (estadoCobra.pausado) return;
    
    // Usar a próxima direção se foi definida
    if (estadoCobra.proximaDirecao) {
        estadoCobra.direcao = estadoCobra.proximaDirecao;
        estadoCobra.proximaDirecao = null;
    }
    
    // Se não há direção, não mover
    if (!estadoCobra.direcao) return;
    
    // Obter a cabeça da cobra
    const cabeca = estadoCobra.cobra[estadoCobra.cobra.length - 1];
    const tamanho = estadoCobra.tamanhoBloco;
    let novaX = cabeca.x;
    let novaY = cabeca.y;
    
    // Calcular a nova posição
    switch (estadoCobra.direcao) {
        case 'ArrowUp':
            novaY -= tamanho;
            break;
        case 'ArrowDown':
            novaY += tamanho;
            break;
        case 'ArrowLeft':
            novaX -= tamanho;
            break;
        case 'ArrowRight':
            novaX += tamanho;
            break;
    }
    
    // Verificar colisão com as paredes
    if (novaX < 0 || novaX >= estadoCobra.larguraTela ||
        novaY < 0 || novaY >= estadoCobra.alturaTela) {
        finalizarCobra();
        return;
    }
    
    // Verificar colisão com o próprio corpo
    for (let segmento of estadoCobra.cobra) {
        if (segmento.x === novaX && segmento.y === novaY) {
            finalizarCobra();
            return;
        }
    }
    
    // Adicionar novo segmento
    estadoCobra.cobra.push({x: novaX, y: novaY});
    
    // Verificar se comeu a comida
    if (novaX === estadoCobra.comida.x && novaY === estadoCobra.comida.y) {
        estadoCobra.pontuacao += 10;
        document.getElementById('pontuacao-cobra').textContent = estadoCobra.pontuacao;
        gerarComidaCobra();
    } else {
        // Remover o último segmento se não comeu
        estadoCobra.cobra.shift();
    }
}

/**
 * Função para tratar as teclas pressionadas
 */
function tratarTeclaCobra(evento) {
    // Verificar se é uma tecla de seta
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(evento.key)) {
        evento.preventDefault();
        
        // Impedir movimento na direção oposta
        if (estadoCobra.direcao === 'ArrowUp' && evento.key === 'ArrowDown') return;
        if (estadoCobra.direcao === 'ArrowDown' && evento.key === 'ArrowUp') return;
        if (estadoCobra.direcao === 'ArrowLeft' && evento.key === 'ArrowRight') return;
        if (estadoCobra.direcao === 'ArrowRight' && evento.key === 'ArrowLeft') return;
        
        // Se o jogo está pausado, começar
        if (estadoCobra.pausado && !estadoCobra.direcao) {
            estadoCobra.pausado = false;
            atualizarBotaoPausaCobra();
        }
        
        // Definir a próxima direção
        estadoCobra.proximaDirecao = evento.key;
    }
}

/**
 * Função para alternar pausa
 */
function alternarPausaCobra() {
    // Se o jogo não começou, começar
    if (!estadoCobra.direcao) {
        estadoCobra.pausado = false;
    } else {
        // Alternar pausa
        estadoCobra.pausado = !estadoCobra.pausado;
    }
    
    // Atualizar o botão
    atualizarBotaoPausaCobra();
}

/**
 * Função para pausar a cobra
 */
function pausarCobra() {
    estadoCobra.pausado = true;
    atualizarBotaoPausaCobra();
}

/**
 * Função para atualizar o botão de pausa
 */
function atualizarBotaoPausaCobra() {
    const botao = document.getElementById('botao-pausa-cobra');
    if (estadoCobra.pausado) {
        botao.textContent = '▶ Retomar';
        botao.classList.add('em-pausa');
    } else {
        botao.textContent = '⏸ Pausar';
        botao.classList.remove('em-pausa');
    }
}

/**
 * Função para alterar a velocidade
 */
function alterarVelocidadeCobra(evento) {
    estadoCobra.velocidade = parseInt(evento.target.value);
    document.getElementById('valor-velocidade').textContent = estadoCobra.velocidade;
}

/**
 * Função para iniciar o loop do jogo
 */
function iniciarLoopCobra() {
    // Limpar o loop anterior se existir
    if (estadoCobra.idLoop) {
        clearInterval(estadoCobra.idLoop);
    }
    
    // Criar novo loop
    estadoCobra.idLoop = setInterval(() => {
        moverCobra();
        desenharCobra();
    }, estadoCobra.velocidade);
}

/**
 * Função para finalizar o jogo da cobra
 */
function finalizarCobra() {
    // Parar o loop
    clearInterval(estadoCobra.idLoop);
    
    // Atualizar o recorde se necessário
    if (estadoCobra.pontuacao > estadoCobra.recorde) {
        estadoCobra.recorde = estadoCobra.pontuacao;
        localStorage.setItem('recordeCobra', estadoCobra.recorde);
        document.getElementById('recorde-cobra').textContent = estadoCobra.recorde;
    }
    
    // Mostrar o menu de game over
    document.getElementById('pontuacao-final-cobra').textContent = estadoCobra.pontuacao;
    document.getElementById('menu-game-over-cobra').style.display = 'flex';
    
    // Marcar como não em execução
    estadoAplicacao.jogoEmExecucao = false;
}

/**
 * Função para reiniciar o jogo da cobra
 */
function reiniciarCobra() {
    // Esconder o menu de game over
    document.getElementById('menu-game-over-cobra').style.display = 'none';
    
    // Reinicializar o jogo
    inicializarCobra();
}

// ============================================
// JOGO MEMÓRIA
// ============================================

// Variáveis do Jogo Memória
let estadoMemoria = {
    cartas: [],
    cartasViradas: [],
    paresEncontrados: 0,
    tentativas: 0,
    bloqueado: false,
    emojis: ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇']
};

/**
 * Função para inicializar o Jogo Memória
 */
function inicializarMemoria() {
    // Resetar o estado
    estadoMemoria = {
        cartas: [],
        cartasViradas: [],
        paresEncontrados: 0,
        tentativas: 0,
        bloqueado: false,
        emojis: ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇']
    };
    
    // Criar as cartas (duplicar emojis)
    const cartasArray = [...estadoMemoria.emojis, ...estadoMemoria.emojis];
    
    // Embaralhar as cartas
    for (let i = cartasArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartasArray[i], cartasArray[j]] = [cartasArray[j], cartasArray[i]];
    }
    
    // Criar objetos de carta
    estadoMemoria.cartas = cartasArray.map((emoji, indice) => ({
        id: indice,
        emoji: emoji,
        virada: false,
        encontrada: false
    }));
    
    // Atualizar a interface
    document.getElementById('tentativas-memoria').textContent = '0';
    document.getElementById('pares-memoria').textContent = '0/8';
    
    // Desenhar o tabuleiro
    desenharTabuleiroMemoria();
}

/**
 * Função para desenhar o tabuleiro de memória
 */
function desenharTabuleiroMemoria() {
    const tabuleiro = document.getElementById('tabuleiro-memoria');
    tabuleiro.innerHTML = '';
    
    estadoMemoria.cartas.forEach(carta => {
        const elemento = document.createElement('div');
        elemento.className = 'carta-memoria';
        
        if (carta.encontrada) {
            elemento.classList.add('encontrada');
        } else if (carta.virada) {
            elemento.classList.add('virada');
        }
        
        elemento.textContent = carta.virada || carta.encontrada ? carta.emoji : '?';
        elemento.onclick = () => clicarCartaMemoria(carta.id);
        
        tabuleiro.appendChild(elemento);
    });
}

/**
 * Função para clicar numa carta
 */
function clicarCartaMemoria(idCarta) {
    // Verificar se o jogo está bloqueado ou se a carta já foi encontrada
    if (estadoMemoria.bloqueado || estadoMemoria.cartas[idCarta].encontrada) return;
    
    // Verificar se já há 2 cartas viradas
    if (estadoMemoria.cartasViradas.length >= 2) return;
    
    // Virar a carta
    estadoMemoria.cartas[idCarta].virada = true;
    estadoMemoria.cartasViradas.push(idCarta);
    
    // Desenhar o tabuleiro
    desenharTabuleiroMemoria();
    
    // Se há 2 cartas viradas, verificar se são iguais
    if (estadoMemoria.cartasViradas.length === 2) {
        estadoMemoria.bloqueado = true;
        estadoMemoria.tentativas++;
        document.getElementById('tentativas-memoria').textContent = estadoMemoria.tentativas;
        
        // Aguardar um pouco antes de verificar
        setTimeout(() => {
            verificarPareMemoria();
        }, 500);
    }
}

/**
 * Função para verificar se as cartas formam um par
 */
function verificarPareMemoria() {
    const [id1, id2] = estadoMemoria.cartasViradas;
    const carta1 = estadoMemoria.cartas[id1];
    const carta2 = estadoMemoria.cartas[id2];
    
    if (carta1.emoji === carta2.emoji) {
        // Encontrou um par
        carta1.encontrada = true;
        carta2.encontrada = true;
        estadoMemoria.paresEncontrados++;
        document.getElementById('pares-memoria').textContent = 
            `${estadoMemoria.paresEncontrados}/8`;
        
        // Verificar se ganhou
        if (estadoMemoria.paresEncontrados === 8) {
            setTimeout(() => {
                alert(`Parabéns! Você ganhou em ${estadoMemoria.tentativas} tentativas!`);
            }, 300);
        }
    } else {
        // Não encontrou um par, virar as cartas de volta
        carta1.virada = false;
        carta2.virada = false;
    }
    
    // Limpar as cartas viradas
    estadoMemoria.cartasViradas = [];
    estadoMemoria.bloqueado = false;
    
    // Desenhar o tabuleiro
    desenharTabuleiroMemoria();
}

/**
 * Função para reiniciar o jogo de memória
 */
function reiniciarMemoria() {
    inicializarMemoria();
}

// ============================================
// JOGO FLAPPY BIRD
// ============================================

// Variáveis do Jogo Flappy
let estadoFlappy = {
    tela: null,
    contexto: null,
    passaro: {x: 50, y: 150, largura: 30, altura: 30, velocidadeY: 0},
    canos: [],
    pontuacao: 0,
    recorde: localStorage.getItem('recordeFlappy') || 0,
    gravidade: 0.5,
    velocidadePulo: 12,
    velocidadeCano: 4,
    distanciaCanos: 150,
    idLoop: null,
    emJogo: false
};

/**
 * Função para inicializar o Flappy Bird
 */
function inicializarFlappy() {
    // Obter o canvas
    estadoFlappy.tela = document.getElementById('tela-flappy');
    estadoFlappy.contexto = estadoFlappy.tela.getContext('2d');
    
    // Resetar o estado
    estadoFlappy.passaro = {x: 50, y: 150, largura: 30, altura: 30, velocidadeY: 0};
    estadoFlappy.canos = [];
    estadoFlappy.pontuacao = 0;
    estadoFlappy.emJogo = true;
    
    // Atualizar a exibição
    document.getElementById('pontuacao-flappy').textContent = '0';
    document.getElementById('recorde-flappy').textContent = estadoFlappy.recorde;
    document.getElementById('menu-game-over-flappy').style.display = 'none';
    
    // Configurar listeners
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && estadoFlappy.emJogo) {
            e.preventDefault();
            estadoFlappy.passaro.velocidadeY = -estadoFlappy.velocidadePulo;
        }
    });
    
    document.addEventListener('click', () => {
        if (estadoFlappy.emJogo) {
            estadoFlappy.passaro.velocidadeY = -estadoFlappy.velocidadePulo;
        }
    });
    
    // Iniciar o loop
    if (estadoFlappy.idLoop) clearInterval(estadoFlappy.idLoop);
    estadoFlappy.idLoop = setInterval(() => {
        atualizarFlappy();
        desenharFlappy();
    }, 30);
}

/**
 * Função para atualizar o Flappy Bird
 */
function atualizarFlappy() {
    if (!estadoFlappy.emJogo) return;
    
    // Aplicar gravidade
    estadoFlappy.passaro.velocidadeY += estadoFlappy.gravidade;
    estadoFlappy.passaro.y += estadoFlappy.passaro.velocidadeY;
    
    // Verificar colisão com o topo e fundo
    if (estadoFlappy.passaro.y < 0 || 
        estadoFlappy.passaro.y + estadoFlappy.passaro.altura > estadoFlappy.tela.height) {
        finalizarFlappy();
        return;
    }
    
    // Gerar novos canos
    if (estadoFlappy.canos.length === 0 || 
        estadoFlappy.canos[estadoFlappy.canos.length - 1].x < 
        estadoFlappy.tela.width - estadoFlappy.distanciaCanos) {
        const abertura = 100;
        const alturaAleatoria = Math.random() * (estadoFlappy.tela.height - abertura - 100) + 50;
        
        estadoFlappy.canos.push({
            x: estadoFlappy.tela.width,
            alturaTop: alturaAleatoria,
            alturaBottom: estadoFlappy.tela.height - alturaAleatoria - abertura,
            largura: 60,
            passouPor: false
        });
    }
    
    // Atualizar canos
    estadoFlappy.canos.forEach((cano, indice) => {
        cano.x -= estadoFlappy.velocidadeCano;
        
        // Remover canos que saíram da tela
        if (cano.x + cano.largura < 0) {
            estadoFlappy.canos.splice(indice, 1);
        }
        
        // Verificar se passou pelo cano
        if (!cano.passouPor && cano.x + cano.largura < estadoFlappy.passaro.x) {
            cano.passouPor = true;
            estadoFlappy.pontuacao++;
            document.getElementById('pontuacao-flappy').textContent = estadoFlappy.pontuacao;
        }
        
        // Verificar colisão com o cano
        if (estadoFlappy.passaro.x < cano.x + cano.largura &&
            estadoFlappy.passaro.x + estadoFlappy.passaro.largura > cano.x) {
            if (estadoFlappy.passaro.y < cano.alturaTop ||
                estadoFlappy.passaro.y + estadoFlappy.passaro.altura > 
                estadoFlappy.tela.height - cano.alturaBottom) {
                finalizarFlappy();
                return;
            }
        }
    });
}

/**
 * Função para desenhar o Flappy Bird
 */
function desenharFlappy() {
    const ctx = estadoFlappy.contexto;
    
    // Limpar a tela
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, estadoFlappy.tela.width, estadoFlappy.tela.height);
    
    // Desenhar o pássaro
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(
        estadoFlappy.passaro.x + estadoFlappy.passaro.largura / 2,
        estadoFlappy.passaro.y + estadoFlappy.passaro.altura / 2,
        estadoFlappy.passaro.largura / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(
        estadoFlappy.passaro.x + estadoFlappy.passaro.largura / 2 + 5,
        estadoFlappy.passaro.y + estadoFlappy.passaro.altura / 2 - 5,
        3,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Desenhar os canos
    ctx.fillStyle = '#228B22';
    estadoFlappy.canos.forEach(cano => {
        ctx.fillRect(cano.x, 0, cano.largura, cano.alturaTop);
        ctx.fillRect(cano.x, estadoFlappy.tela.height - cano.alturaBottom, 
                     cano.largura, cano.alturaBottom);
    });
}

/**
 * Função para finalizar o Flappy Bird
 */
function finalizarFlappy() {
    estadoFlappy.emJogo = false;
    clearInterval(estadoFlappy.idLoop);
    
    // Atualizar recorde
    if (estadoFlappy.pontuacao > estadoFlappy.recorde) {
        estadoFlappy.recorde = estadoFlappy.pontuacao;
        localStorage.setItem('recordeFlappy', estadoFlappy.recorde);
        document.getElementById('recorde-flappy').textContent = estadoFlappy.recorde;
    }
    
    // Mostrar game over
    document.getElementById('pontuacao-final-flappy').textContent = estadoFlappy.pontuacao;
    document.getElementById('menu-game-over-flappy').style.display = 'flex';
}

/**
 * Função para reiniciar o Flappy Bird
 */
function reiniciarFlappy() {
    inicializarFlappy();
}

// ============================================
// JOGO 2048
// ============================================

// Variáveis do Jogo 2048
let estado2048 = {
    tabuleiro: [],
    pontuacao: 0,
    melhor: localStorage.getItem('melhor2048') || 0,
    emJogo: true
};

/**
 * Função para inicializar o 2048
 */
function inicializar2048() {
    // Resetar o estado
    estado2048 = {
        tabuleiro: [],
        pontuacao: 0,
        melhor: localStorage.getItem('melhor2048') || 0,
        emJogo: true
    };
    
    // Criar tabuleiro vazio
    for (let i = 0; i < 4; i++) {
        estado2048.tabuleiro[i] = [];
        for (let j = 0; j < 4; j++) {
            estado2048.tabuleiro[i][j] = 0;
        }
    }
    
    // Adicionar 2 números aleatórios
    adicionarNumero2048();
    adicionarNumero2048();
    
    // Atualizar a interface
    document.getElementById('pontuacao-2048').textContent = '0';
    document.getElementById('melhor-2048').textContent = estado2048.melhor;
    document.getElementById('menu-game-over-2048').style.display = 'none';
    
    // Configurar listeners
    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            mover2048(e.key);
        }
    });
    
    // Desenhar o tabuleiro
    desenharTabuleiro2048();
}

/**
 * Função para adicionar um número aleatório
 */
function adicionarNumero2048() {
    const posicoesBazias = [];
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (estado2048.tabuleiro[i][j] === 0) {
                posicoesBazias.push({i, j});
            }
        }
    }
    
    if (posicoesBazias.length > 0) {
        const posicao = posicoesBazias[Math.floor(Math.random() * posicoesBazias.length)];
        estado2048.tabuleiro[posicao.i][posicao.j] = Math.random() < 0.9 ? 2 : 4;
    }
}

/**
 * Função para mover no 2048
 */
function mover2048(direcao) {
    if (!estado2048.emJogo) return;
    
    let moveuAlgo = false;
    
    if (direcao === 'ArrowLeft') {
        for (let i = 0; i < 4; i++) {
            const linha = estado2048.tabuleiro[i].filter(val => val !== 0);
            for (let j = 0; j < linha.length - 1; j++) {
                if (linha[j] === linha[j + 1]) {
                    linha[j] *= 2;
                    estado2048.pontuacao += linha[j];
                    linha.splice(j + 1, 1);
                }
            }
            while (linha.length < 4) {
                linha.push(0);
            }
            if (JSON.stringify(estado2048.tabuleiro[i]) !== JSON.stringify(linha)) {
                moveuAlgo = true;
            }
            estado2048.tabuleiro[i] = linha;
        }
    } else if (direcao === 'ArrowRight') {
        for (let i = 0; i < 4; i++) {
            const linha = estado2048.tabuleiro[i].filter(val => val !== 0).reverse();
            for (let j = 0; j < linha.length - 1; j++) {
                if (linha[j] === linha[j + 1]) {
                    linha[j] *= 2;
                    estado2048.pontuacao += linha[j];
                    linha.splice(j + 1, 1);
                }
            }
            while (linha.length < 4) {
                linha.unshift(0);
            }
            linha.reverse();
            if (JSON.stringify(estado2048.tabuleiro[i]) !== JSON.stringify(linha)) {
                moveuAlgo = true;
            }
            estado2048.tabuleiro[i] = linha;
        }
    } else if (direcao === 'ArrowUp') {
        for (let j = 0; j < 4; j++) {
            const coluna = [];
            for (let i = 0; i < 4; i++) {
                if (estado2048.tabuleiro[i][j] !== 0) {
                    coluna.push(estado2048.tabuleiro[i][j]);
                }
            }
            for (let i = 0; i < coluna.length - 1; i++) {
                if (coluna[i] === coluna[i + 1]) {
                    coluna[i] *= 2;
                    estado2048.pontuacao += coluna[i];
                    coluna.splice(i + 1, 1);
                }
            }
            while (coluna.length < 4) {
                coluna.push(0);
            }
            for (let i = 0; i < 4; i++) {
                estado2048.tabuleiro[i][j] = coluna[i];
            }
            moveuAlgo = true;
        }
    } else if (direcao === 'ArrowDown') {
        for (let j = 0; j < 4; j++) {
            const coluna = [];
            for (let i = 3; i >= 0; i--) {
                if (estado2048.tabuleiro[i][j] !== 0) {
                    coluna.push(estado2048.tabuleiro[i][j]);
                }
            }
            for (let i = 0; i < coluna.length - 1; i++) {
                if (coluna[i] === coluna[i + 1]) {
                    coluna[i] *= 2;
                    estado2048.pontuacao += coluna[i];
                    coluna.splice(i + 1, 1);
                }
            }
            while (coluna.length < 4) {
                coluna.unshift(0);
            }
            coluna.reverse();
            for (let i = 0; i < 4; i++) {
                estado2048.tabuleiro[i][j] = coluna[i];
            }
            moveuAlgo = true;
        }
    }
    
    if (moveuAlgo) {
        adicionarNumero2048();
        document.getElementById('pontuacao-2048').textContent = estado2048.pontuacao;
        
        if (estado2048.pontuacao > estado2048.melhor) {
            estado2048.melhor = estado2048.pontuacao;
            localStorage.setItem('melhor2048', estado2048.melhor);
            document.getElementById('melhor-2048').textContent = estado2048.melhor;
        }
        
        desenharTabuleiro2048();
        verificarGameOver2048();
    }
}

/**
 * Função para desenhar o tabuleiro 2048
 */
function desenharTabuleiro2048() {
    const tabuleiro = document.getElementById('tabuleiro-2048');
    tabuleiro.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const bloco = document.createElement('div');
            bloco.className = 'bloco-2048';
            const valor = estado2048.tabuleiro[i][j];
            bloco.textContent = valor > 0 ? valor : '';
            
            // Aplicar cores baseadas no valor
            if (valor === 0) {
                bloco.style.backgroundColor = '#E5E5E5';
            } else if (valor === 2) {
                bloco.style.backgroundColor = '#EEE4DA';
                bloco.style.color = '#776E65';
            } else if (valor === 4) {
                bloco.style.backgroundColor = '#EDE0C8';
                bloco.style.color = '#776E65';
            } else if (valor === 8) {
                bloco.style.backgroundColor = '#F2B179';
                bloco.style.color = '#F9F6F2';
            } else if (valor === 16) {
                bloco.style.backgroundColor = '#F59563';
                bloco.style.color = '#F9F6F2';
            } else if (valor === 32) {
                bloco.style.backgroundColor = '#F67C5F';
                bloco.style.color = '#F9F6F2';
            } else if (valor === 64) {
                bloco.style.backgroundColor = '#F65E3B';
                bloco.style.color = '#F9F6F2';
            } else if (valor === 128) {
                bloco.style.backgroundColor = '#EDCF72';
                bloco.style.color = '#095F6B';
                bloco.style.fontSize = '1.2rem';
            } else if (valor === 256) {
                bloco.style.backgroundColor = '#EDCC61';
                bloco.style.color = '#095F6B';
                bloco.style.fontSize = '1.2rem';
            } else if (valor === 512) {
                bloco.style.backgroundColor = '#EDC850';
                bloco.style.color = '#095F6B';
                bloco.style.fontSize = '1.2rem';
            } else if (valor === 1024) {
                bloco.style.backgroundColor = '#EDC53F';
                bloco.style.color = '#095F6B';
                bloco.style.fontSize = '1rem';
            } else if (valor === 2048) {
                bloco.style.backgroundColor = '#EDC22E';
                bloco.style.color = '#095F6B';
                bloco.style.fontSize = '1rem';
            } else {
                bloco.style.backgroundColor = '#3C3C2F';
                bloco.style.color = '#F9F6F2';
                bloco.style.fontSize = '0.9rem';
            }
            
            tabuleiro.appendChild(bloco);
        }
    }
}

/**
 * Função para verificar game over no 2048
 */
function verificarGameOver2048() {
    let temMovimentos = false;
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (estado2048.tabuleiro[i][j] === 0) {
                temMovimentos = true;
                break;
            }
            if (j < 3 && estado2048.tabuleiro[i][j] === estado2048.tabuleiro[i][j + 1]) {
                temMovimentos = true;
                break;
            }
            if (i < 3 && estado2048.tabuleiro[i][j] === estado2048.tabuleiro[i + 1][j]) {
                temMovimentos = true;
                break;
            }
        }
        if (temMovimentos) break;
    }
    
    if (!temMovimentos) {
        estado2048.emJogo = false;
        document.getElementById('pontuacao-final-2048').textContent = estado2048.pontuacao;
        document.getElementById('menu-game-over-2048').style.display = 'flex';
    }
}

/**
 * Função para reiniciar o 2048
 */
function reiniciar2048() {
    inicializar2048();
}

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Função para inicializar a aplicação quando o DOM está carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obter todas as ligações de navegação
    const ligacoesNavegacao = document.querySelectorAll('.ligacao-navegacao');
    
    // Adicionar listener para cada ligação de navegação
    ligacoesNavegacao.forEach(ligacao => {
        ligacao.addEventListener('click', function(evento) {
            // Prevenir o comportamento padrão da ligação
            evento.preventDefault();
            
            // Obter o ID da página a navegar
            const idPagina = ligacao.getAttribute('dados-pagina');
            
            // Navegar para a página
            navegarPara(idPagina);
        });
    });

    // Inicializar a aplicação com a página inicial
    navegarPara('inicio');
    
    // Registrar na consola que a aplicação foi carregada com sucesso
    console.log('PlataformaJogos - Aplicação de jogos educativos carregada com sucesso! 🎮');
});

// ============================================
// FIM DO FICHEIRO JAVASCRIPT
// ============================================
