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
    const ligacaoAtiva = document.querySelector(`[data-pagina="${idPagina}"]`);
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

function inicializarQuiz() {
    estadoQuiz = {
        nivelAtual: 1,
        perguntaAtual: 0,
        pontuacao: 0,
        respostasCorretas: 0,
        respondido: false
    };
    mostrarPerguntaQuiz();
}

function mostrarPerguntaQuiz() {
    const perguntasNivel = estadoQuiz.nivelAtual === 1 ? perguntasQuiz.nivel1 : perguntasQuiz.nivel2;
    const perguntaAtual = perguntasNivel[estadoQuiz.perguntaAtual];
    const elementoPergunta = document.getElementById('pergunta-quiz');
    elementoPergunta.textContent = perguntaAtual.pergunta;
    
    const totalPerguntas = perguntasNivel.length;
    const numeroPergunta = estadoQuiz.perguntaAtual + 1;
    document.getElementById('texto-progresso').textContent = `Pergunta ${numeroPergunta} de ${totalPerguntas}`;
    
    const percentual = (numeroPergunta / totalPerguntas) * 100;
    document.getElementById('preenchimento-progresso').style.width = percentual + '%';
    
    const containerBotoes = document.getElementById('botoes-resposta');
    containerBotoes.innerHTML = '';
    
    perguntaAtual.respostas.forEach((resposta) => {
        const botao = document.createElement('button');
        botao.className = 'botao-resposta';
        botao.textContent = resposta.texto;
        botao.dataset.correto = resposta.correto;
        botao.onclick = () => selecionarRespostaQuiz(botao, resposta.correto);
        containerBotoes.appendChild(botao);
    });
    
    document.getElementById('botao-proximo').style.display = 'none';
    estadoQuiz.respondido = false;
}

function selecionarRespostaQuiz(botao, estaCorreto) {
    if (estadoQuiz.respondido) return;
    estadoQuiz.respondido = true;
    
    const botoes = document.querySelectorAll('.botao-resposta');
    botoes.forEach(b => b.disabled = true);
    
    if (estaCorreto) {
        botao.classList.add('correto');
        estadoQuiz.respostasCorretas++;
        estadoQuiz.pontuacao += 10;
    } else {
        botao.classList.add('incorreto');
        botoes.forEach(b => {
            if (b.dataset.correto === 'true') b.classList.add('correto');
        });
    }
    document.getElementById('botao-proximo').style.display = 'block';
}

function proximaPerguntaQuiz() {
    const perguntasNivel = estadoQuiz.nivelAtual === 1 ? perguntasQuiz.nivel1 : perguntasQuiz.nivel2;
    if (estadoQuiz.perguntaAtual < perguntasNivel.length - 1) {
        estadoQuiz.perguntaAtual++;
        mostrarPerguntaQuiz();
    } else {
        if (estadoQuiz.nivelAtual < 2) {
            estadoQuiz.nivelAtual++;
            estadoQuiz.perguntaAtual = 0;
            mostrarPerguntaQuiz();
        } else {
            mostrarResultadoQuiz();
        }
    }
}

function mostrarResultadoQuiz() {
    const elementoPergunta = document.getElementById('pergunta-quiz');
    elementoPergunta.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Parabéns! Você terminou o Quiz!</h3>
            <p>Pontuação Total: <strong>${estadoQuiz.pontuacao}</strong></p>
            <p>Respostas Corretas: <strong>${estadoQuiz.respostasCorretas} de 8</strong></p>
        </div>
    `;
    document.getElementById('botoes-resposta').innerHTML = '';
    const botaoProximo = document.getElementById('botao-proximo');
    botaoProximo.textContent = 'Jogar Novamente';
    botaoProximo.style.display = 'block';
    botaoProximo.onclick = () => navegarPara('quiz');
}

document.addEventListener('DOMContentLoaded', () => {
    const botaoProximo = document.getElementById('botao-proximo');
    if (botaoProximo) botaoProximo.addEventListener('click', proximaPerguntaQuiz);
});

// ============================================
// JOGO COBRA
// ============================================

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

function inicializarCobra() {
    estadoCobra.tela = document.getElementById('tela-cobra');
    estadoCobra.contexto = estadoCobra.tela.getContext('2d');
    estadoCobra.cobra = [{x: 270, y: 240}];
    estadoCobra.direcao = null;
    estadoCobra.proximaDirecao = null;
    estadoCobra.pontuacao = 0;
    estadoCobra.pausado = true;
    estadoAplicacao.jogoEmExecucao = true;
    
    document.getElementById('recorde-cobra').textContent = estadoCobra.recorde;
    document.getElementById('pontuacao-cobra').textContent = '0';
    gerarComidaCobra();
    desenharCobra();
    
    // Configurar controlos; os listeners globais são registados uma só vez.
    document.getElementById('botao-pausa-cobra').onclick = alternarPausaCobra;
    document.getElementById('velocidade-cobra').oninput = alterarVelocidadeCobra;

    // Controlos Mobile Cobra
    document.getElementById('btn-cobra-cima').onclick = () => { if(!estadoCobra.pausado) estadoCobra.proximaDirecao = 'ArrowUp'; };
    document.getElementById('btn-cobra-baixo').onclick = () => { if(!estadoCobra.pausado) estadoCobra.proximaDirecao = 'ArrowDown'; };
    document.getElementById('btn-cobra-esquerda').onclick = () => { if(!estadoCobra.pausado) estadoCobra.proximaDirecao = 'ArrowLeft'; };
    document.getElementById('btn-cobra-direita').onclick = () => { if(!estadoCobra.pausado) estadoCobra.proximaDirecao = 'ArrowRight'; };
    
    iniciarLoopCobra();
}

function gerarComidaCobra() {
    const numeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const tamanho = estadoCobra.tamanhoBloco;
    estadoCobra.comida = {
        x: Math.round(numeroAleatorio(0, estadoCobra.larguraTela - tamanho) / tamanho) * tamanho,
        y: Math.round(numeroAleatorio(0, estadoCobra.alturaTela - tamanho) / tamanho) * tamanho
    };
}

function desenharCobra() {
    const ctx = estadoCobra.contexto;
    const tamanho = estadoCobra.tamanhoBloco;
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, estadoCobra.larguraTela, estadoCobra.alturaTela);
    
    estadoCobra.cobra.forEach((segmento, indice) => {
        ctx.fillStyle = (indice === estadoCobra.cobra.length - 1) ? '#00FF00' : '#00CC00';
        ctx.fillRect(segmento.x, segmento.y, tamanho, tamanho);
        ctx.strokeStyle = '#009900';
        ctx.strokeRect(segmento.x, segmento.y, tamanho, tamanho);
    });
    
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(estadoCobra.comida.x + tamanho/2, estadoCobra.comida.y + tamanho/2, tamanho/2, 0, Math.PI*2);
    ctx.fill();
}

function moverCobra() {
    if (estadoCobra.pausado) return;
    if (estadoCobra.proximaDirecao) {
        estadoCobra.direcao = estadoCobra.proximaDirecao;
        estadoCobra.proximaDirecao = null;
    }
    if (!estadoCobra.direcao) return;
    
    const cabeca = estadoCobra.cobra[estadoCobra.cobra.length - 1];
    const tamanho = estadoCobra.tamanhoBloco;
    let novaX = cabeca.x;
    let novaY = cabeca.y;
    
    if (estadoCobra.direcao === 'ArrowUp') novaY -= tamanho;
    else if (estadoCobra.direcao === 'ArrowDown') novaY += tamanho;
    else if (estadoCobra.direcao === 'ArrowLeft') novaX -= tamanho;
    else if (estadoCobra.direcao === 'ArrowRight') novaX += tamanho;
    
    if (novaX < 0 || novaX >= estadoCobra.larguraTela || novaY < 0 || novaY >= estadoCobra.alturaTela) {
        finalizarCobra();
        return;
    }
    
    for (let segmento of estadoCobra.cobra) {
        if (segmento.x === novaX && segmento.y === novaY) {
            finalizarCobra();
            return;
        }
    }
    
    estadoCobra.cobra.push({x: novaX, y: novaY});
    if (novaX === estadoCobra.comida.x && novaY === estadoCobra.comida.y) {
        estadoCobra.pontuacao += 10;
        document.getElementById('pontuacao-cobra').textContent = estadoCobra.pontuacao;
        gerarComidaCobra();
    } else {
        estadoCobra.cobra.shift();
    }
}

function tratarTeclaCobra(evento) {
    if (estadoAplicacao.paginaAtual !== 'cobra') return;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(evento.key)) {
        evento.preventDefault();
        if (estadoCobra.direcao === 'ArrowUp' && evento.key === 'ArrowDown') return;
        if (estadoCobra.direcao === 'ArrowDown' && evento.key === 'ArrowUp') return;
        if (estadoCobra.direcao === 'ArrowLeft' && evento.key === 'ArrowRight') return;
        if (estadoCobra.direcao === 'ArrowRight' && evento.key === 'ArrowLeft') return;
        
        if (estadoCobra.pausado && !estadoCobra.direcao) {
            estadoCobra.pausado = false;
            atualizarBotaoPausaCobra();
        }
        estadoCobra.proximaDirecao = evento.key;
    }
}

function alternarPausaCobra() {
    estadoCobra.pausado = !estadoCobra.pausado;
    atualizarBotaoPausaCobra();
}

function pausarCobra() {
    estadoCobra.pausado = true;
    atualizarBotaoPausaCobra();
}

function atualizarBotaoPausaCobra() {
    const botao = document.getElementById('botao-pausa-cobra');
    botao.innerHTML = estadoCobra.pausado ? '<i class="fas fa-play"></i> Retomar' : '<i class="fas fa-pause"></i> Pausar';
}

function alterarVelocidadeCobra(evento) {
    estadoCobra.velocidade = 350 - parseInt(evento.target.value);
    document.getElementById('valor-velocidade').textContent = evento.target.value;
    iniciarLoopCobra();
}

function iniciarLoopCobra() {
    if (estadoCobra.idLoop) clearInterval(estadoCobra.idLoop);
    estadoCobra.idLoop = setInterval(() => {
        moverCobra();
        desenharCobra();
    }, estadoCobra.velocidade);
}

function finalizarCobra() {
    clearInterval(estadoCobra.idLoop);
    if (estadoCobra.pontuacao > estadoCobra.recorde) {
        estadoCobra.recorde = estadoCobra.pontuacao;
        localStorage.setItem('recordeCobra', estadoCobra.recorde);
        document.getElementById('recorde-cobra').textContent = estadoCobra.recorde;
    }
    document.getElementById('pontuacao-final-cobra').textContent = estadoCobra.pontuacao;
    document.getElementById('menu-game-over-cobra').style.display = 'flex';
    estadoAplicacao.jogoEmExecucao = false;
}

function reiniciarCobra() {
    document.getElementById('menu-game-over-cobra').style.display = 'none';
    inicializarCobra();
}

// ============================================
// JOGO MEMÓRIA
// ============================================

let estadoMemoria = {
    cartas: [],
    cartasViradas: [],
    paresEncontrados: 0,
    tentativas: 0,
    bloqueado: false,
    icones: ['fa-apple-whole', 'fa-carrot', 'fa-lemon', 'fa-ice-cream', 'fa-pizza-slice', 'fa-burger', 'fa-cookie', 'fa-hotdog']
};

function inicializarMemoria() {
    estadoMemoria.cartasViradas = [];
    estadoMemoria.paresEncontrados = 0;
    estadoMemoria.tentativas = 0;
    estadoMemoria.bloqueado = false;
    
    const iconesArray = [...estadoMemoria.icones, ...estadoMemoria.icones];
    for (let i = iconesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [iconesArray[i], iconesArray[j]] = [iconesArray[j], iconesArray[i]];
    }
    
    estadoMemoria.cartas = iconesArray.map((icone, indice) => ({
        id: indice,
        icone: icone,
        virada: false,
        encontrada: false
    }));
    
    document.getElementById('tentativas-memoria').textContent = '0';
    document.getElementById('pares-memoria').textContent = '0/8';
    desenharTabuleiroMemoria();
}

function desenharTabuleiroMemoria() {
    const tabuleiro = document.getElementById('tabuleiro-memoria');
    const nomesIcones = {
        'fa-apple-whole': 'maçã',
        'fa-carrot': 'cenoura',
        'fa-lemon': 'limão',
        'fa-ice-cream': 'gelado',
        'fa-pizza-slice': 'pizza',
        'fa-burger': 'hambúrguer',
        'fa-cookie': 'bolacha',
        'fa-hotdog': 'cachorro-quente'
    };
    tabuleiro.innerHTML = '';
    estadoMemoria.cartas.forEach(carta => {
        const elemento = document.createElement('button');
        const revelada = carta.virada || carta.encontrada;
        elemento.type = 'button';
        elemento.className = 'carta-memoria';
        elemento.setAttribute('aria-pressed', String(revelada));
        elemento.setAttribute('aria-label', revelada
            ? `Carta ${carta.id + 1}: ${nomesIcones[carta.icone]}${carta.encontrada ? ', par encontrado' : ''}`
            : `Carta ${carta.id + 1}, por revelar`);
        if (carta.encontrada) elemento.classList.add('encontrada');
        else if (carta.virada) elemento.classList.add('virada');

        const icone = document.createElement('i');
        icone.className = `fas ${revelada ? carta.icone : 'fa-question'}`;
        icone.setAttribute('aria-hidden', 'true');
        elemento.appendChild(icone);
        elemento.onclick = () => clicarCartaMemoria(carta.id);
        tabuleiro.appendChild(elemento);
    });
}

function clicarCartaMemoria(idCarta) {
    if (estadoMemoria.bloqueado || estadoMemoria.cartas[idCarta].encontrada || estadoMemoria.cartas[idCarta].virada) return;
    if (estadoMemoria.cartasViradas.length >= 2) return;
    
    estadoMemoria.cartas[idCarta].virada = true;
    estadoMemoria.cartasViradas.push(idCarta);
    desenharTabuleiroMemoria();
    
    if (estadoMemoria.cartasViradas.length === 2) {
        estadoMemoria.bloqueado = true;
        estadoMemoria.tentativas++;
        document.getElementById('tentativas-memoria').textContent = estadoMemoria.tentativas;
        setTimeout(verificarPareMemoria, 600);
    }
}

function verificarPareMemoria() {
    const [id1, id2] = estadoMemoria.cartasViradas;
    if (estadoMemoria.cartas[id1].icone === estadoMemoria.cartas[id2].icone) {
        estadoMemoria.cartas[id1].encontrada = true;
        estadoMemoria.cartas[id2].encontrada = true;
        estadoMemoria.paresEncontrados++;
        document.getElementById('pares-memoria').textContent = `${estadoMemoria.paresEncontrados}/8`;
        if (estadoMemoria.paresEncontrados === 8) alert(`Parabéns! Ganhou em ${estadoMemoria.tentativas} tentativas!`);
    } else {
        estadoMemoria.cartas[id1].virada = false;
        estadoMemoria.cartas[id2].virada = false;
    }
    estadoMemoria.cartasViradas = [];
    estadoMemoria.bloqueado = false;
    desenharTabuleiroMemoria();
}

function reiniciarMemoria() { inicializarMemoria(); }

// ============================================
// JOGO FLAPPY BIRD
// ============================================

let estadoFlappy = {
    tela: null,
    contexto: null,
    passaro: {x: 50, y: 150, largura: 30, altura: 30, velocidadeY: 0},
    canos: [],
    pontuacao: 0,
    recorde: localStorage.getItem('recordeFlappy') || 0,
    gravidade: 0.6,
    velocidadePulo: 10,
    velocidadeCano: 3,
    distanciaCanos: 180,
    idLoop: null,
    emJogo: false,
    pausado: true
};

function inicializarFlappy() {
    estadoFlappy.tela = document.getElementById('tela-flappy');
    estadoFlappy.contexto = estadoFlappy.tela.getContext('2d');
    estadoFlappy.passaro = {x: 50, y: 150, largura: 30, altura: 30, velocidadeY: 0};
    estadoFlappy.canos = [];
    estadoFlappy.pontuacao = 0;
    estadoFlappy.emJogo = true;
    estadoFlappy.pausado = true;
    
    document.getElementById('pontuacao-flappy').textContent = '0';
    document.getElementById('recorde-flappy').textContent = estadoFlappy.recorde;
    document.getElementById('menu-game-over-flappy').style.display = 'none';
    
    const btnPausa = document.getElementById('botao-pausa-flappy');
    btnPausa.innerHTML = '<i class="fas fa-play"></i> Iniciar';
    btnPausa.onclick = () => {
        estadoFlappy.pausado = !estadoFlappy.pausado;
        btnPausa.innerHTML = estadoFlappy.pausado ? '<i class="fas fa-play"></i> Retomar' : '<i class="fas fa-pause"></i> Pausar';
    };

    document.getElementById('velocidade-flappy').oninput = (e) => {
        estadoFlappy.velocidadeCano = parseInt(e.target.value);
        document.getElementById('valor-velocidade-flappy').textContent = e.target.value;
    };

    
    estadoFlappy.tela.onclick = () => {
        if (estadoFlappy.emJogo && !estadoFlappy.pausado) estadoFlappy.passaro.velocidadeY = -estadoFlappy.velocidadePulo;
    };
    
    if (estadoFlappy.idLoop) clearInterval(estadoFlappy.idLoop);
    estadoFlappy.idLoop = setInterval(() => {
        atualizarFlappy();
        desenharFlappy();
    }, 30);
}

function atualizarFlappy() {
    if (!estadoFlappy.emJogo || estadoFlappy.pausado) return;
    
    estadoFlappy.passaro.velocidadeY += estadoFlappy.gravidade;
    estadoFlappy.passaro.y += estadoFlappy.passaro.velocidadeY;
    
    if (estadoFlappy.canos.length === 0 || estadoFlappy.canos[estadoFlappy.canos.length - 1].x < estadoFlappy.tela.width - estadoFlappy.distanciaCanos) {
        const alturaBuraco = 150;
        const yCanoSuperior = Math.random() * (estadoFlappy.tela.height - alturaBuraco - 100) + 50;
        estadoFlappy.canos.push({x: estadoFlappy.tela.width, y: yCanoSuperior, buraco: alturaBuraco, passado: false});
    }
    
    estadoFlappy.canos.forEach((cano, indice) => {
        cano.x -= estadoFlappy.velocidadeCano;
        if (cano.x + 50 < 0) estadoFlappy.canos.splice(indice, 1);
        
        if (estadoFlappy.passaro.x + estadoFlappy.passaro.largura > cano.x && estadoFlappy.passaro.x < cano.x + 50) {
            if (estadoFlappy.passaro.y < cano.y || estadoFlappy.passaro.y + estadoFlappy.passaro.altura > cano.y + cano.buraco) finalizarFlappy();
        }
        
        if (!cano.passado && cano.x + 50 < estadoFlappy.passaro.x) {
            cano.passado = true;
            estadoFlappy.pontuacao++;
            document.getElementById('pontuacao-flappy').textContent = estadoFlappy.pontuacao;
        }
    });
    
    if (estadoFlappy.passaro.y < 0 || estadoFlappy.passaro.y + estadoFlappy.passaro.altura > estadoFlappy.tela.height) finalizarFlappy();
}

function desenharFlappy() {
    const ctx = estadoFlappy.contexto;
    
    // Fundo com gradiente
    const gradienteFundo = ctx.createLinearGradient(0, 0, 0, estadoFlappy.tela.height);
    gradienteFundo.addColorStop(0, '#4ec0ca');
    gradienteFundo.addColorStop(1, '#d2f4f7');
    ctx.fillStyle = gradienteFundo;
    ctx.fillRect(0, 0, estadoFlappy.tela.width, estadoFlappy.tela.height);
    
    // Desenhar Pássaro Customizado
    const p = estadoFlappy.passaro;
    ctx.save();
    ctx.translate(p.x + p.largura/2, p.y + p.altura/2);
    
    // Rotação baseada na velocidade vertical
    let angulo = Math.min(Math.PI/4, Math.max(-Math.PI/4, p.velocidadeY * 0.1));
    ctx.rotate(angulo);
    
    // Corpo do pássaro (Amarelo)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(0, 0, p.largura/2, p.altura/2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Asa (Branca)
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.ellipse(-5, 2, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Olho
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(8, -5, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(10, -5, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Bico (Laranja)
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(22, 5);
    ctx.lineTo(12, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
    
    // Canos com gradiente e borda
    estadoFlappy.canos.forEach(cano => {
        const gradienteCano = ctx.createLinearGradient(cano.x, 0, cano.x + 50, 0);
        gradienteCano.addColorStop(0, '#2e8b57');
        gradienteCano.addColorStop(0.5, '#3cb371');
        gradienteCano.addColorStop(1, '#2e8b57');
        ctx.fillStyle = gradienteCano;
        
        // Cano Superior
        ctx.fillRect(cano.x, 0, 50, cano.y);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(cano.x, 0, 50, cano.y);
        
        // Cano Inferior
        ctx.fillRect(cano.x, cano.y + cano.buraco, 50, estadoFlappy.tela.height - (cano.y + cano.buraco));
        ctx.strokeRect(cano.x, cano.y + cano.buraco, 50, estadoFlappy.tela.height - (cano.y + cano.buraco));
        
        // Cabeças dos canos
        ctx.fillRect(cano.x - 5, cano.y - 20, 60, 20);
        ctx.strokeRect(cano.x - 5, cano.y - 20, 60, 20);
        ctx.fillRect(cano.x - 5, cano.y + cano.buraco, 60, 20);
        ctx.strokeRect(cano.x - 5, cano.y + cano.buraco, 60, 20);
    });
}

function finalizarFlappy() {
    estadoFlappy.emJogo = false;
    clearInterval(estadoFlappy.idLoop);
    if (estadoFlappy.pontuacao > estadoFlappy.recorde) {
        estadoFlappy.recorde = estadoFlappy.pontuacao;
        localStorage.setItem('recordeFlappy', estadoFlappy.recorde);
    }
    document.getElementById('pontuacao-final-flappy').textContent = estadoFlappy.pontuacao;
    document.getElementById('menu-game-over-flappy').style.display = 'flex';
}

function reiniciarFlappy() { inicializarFlappy(); }

// ============================================
// JOGO 2048
// ============================================

let estado2048 = {
    tabuleiro: [],
    pontuacao: 0,
    recorde: localStorage.getItem('recorde2048') || 0,
    tamanho: 4
};

function inicializar2048() {
    estado2048.tabuleiro = Array(estado2048.tamanho).fill().map(() => Array(estado2048.tamanho).fill(0));
    estado2048.pontuacao = 0;
    document.getElementById('pontuacao-2048').textContent = '0';
    document.getElementById('recorde-2048').textContent = estado2048.recorde;
    adicionarBloco2048();
    adicionarBloco2048();
    desenharTabuleiro2048();
    
    document.getElementById('btn-2048-cima').onclick = () => mover2048('cima');
    document.getElementById('btn-2048-baixo').onclick = () => mover2048('baixo');
    document.getElementById('btn-2048-esquerda').onclick = () => mover2048('esquerda');
    document.getElementById('btn-2048-direita').onclick = () => mover2048('direita');
}

function adicionarBloco2048() {
    let vazios = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (estado2048.tabuleiro[r][c] === 0) vazios.push({r, c});
    if (vazios.length > 0) {
        let {r, c} = vazios[Math.floor(Math.random() * vazios.length)];
        estado2048.tabuleiro[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function desenharTabuleiro2048() {
    const tabuleiro = document.getElementById('tabuleiro-2048');
    tabuleiro.innerHTML = '';
    estado2048.tabuleiro.forEach(linha => {
        linha.forEach(valor => {
            const bloco = document.createElement('div');
            bloco.className = 'bloco-2048';
            if (valor > 0) {
                bloco.textContent = valor;
                bloco.dataset.valor = valor;
                bloco.style.backgroundColor = obterCor2048(valor);
                bloco.style.color = valor <= 4 ? '#776e65' : '#f9f6f2';
            }
            tabuleiro.appendChild(bloco);
        });
    });
}

function obterCor2048(valor) {
    const cores = {2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'};
    return cores[valor] || '#3c3a32';
}

function tratarTecla2048(e) {
    if (estadoAplicacao.paginaAtual !== 'jogo2048') return;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const direcoes = {ArrowUp: 'cima', ArrowDown: 'baixo', ArrowLeft: 'esquerda', ArrowRight: 'direita'};
        mover2048(direcoes[e.key]);
    }
}

function mover2048(direcao) {
    let mudou = false;
    const t = estado2048.tabuleiro;
    
    const deslizar = (linha) => {
        let novaLinha = linha.filter(v => v !== 0);
        for (let i = 0; i < novaLinha.length - 1; i++) {
            if (novaLinha[i] === novaLinha[i+1]) {
                novaLinha[i] *= 2;
                estado2048.pontuacao += novaLinha[i];
                novaLinha.splice(i+1, 1);
                mudou = true;
            }
        }
        while (novaLinha.length < 4) novaLinha.push(0);
        return novaLinha;
    };

    if (direcao === 'esquerda' || direcao === 'direita') {
        for (let r = 0; r < 4; r++) {
            let linha = t[r];
            if (direcao === 'direita') linha.reverse();
            let novaLinha = deslizar(linha);
            if (direcao === 'direita') novaLinha.reverse();
            if (JSON.stringify(t[r]) !== JSON.stringify(novaLinha)) mudou = true;
            t[r] = novaLinha;
        }
    } else {
        for (let c = 0; c < 4; c++) {
            let coluna = [t[0][c], t[1][c], t[2][c], t[3][c]];
            if (direcao === 'baixo') coluna.reverse();
            let novaColuna = deslizar(coluna);
            if (direcao === 'baixo') novaColuna.reverse();
            for (let r = 0; r < 4; r++) {
                if (t[r][c] !== novaColuna[r]) mudou = true;
                t[r][c] = novaColuna[r];
            }
        }
    }

    if (mudou) {
        adicionarBloco2048();
        desenharTabuleiro2048();
        document.getElementById('pontuacao-2048').textContent = estado2048.pontuacao;
        if (estado2048.pontuacao > estado2048.recorde) {
            estado2048.recorde = estado2048.pontuacao;
            localStorage.setItem('recorde2048', estado2048.recorde);
            document.getElementById('recorde-2048').textContent = estado2048.recorde;
        }
    }
}

function reiniciar2048() { inicializar2048(); }

// LÓGICA DE TECLADO E MENU HAMBURGER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const botaoProximo = document.getElementById('botao-proximo');
    if (botaoProximo) botaoProximo.addEventListener('click', proximaPerguntaQuiz);

    const botaoHamburger = document.getElementById('botao-hamburger');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const ligacoesNavegacao = document.querySelectorAll('.ligacao-navegacao');

    const alternarMenu = (abrir = !menuNavegacao.classList.contains('aberto')) => {
        if (!menuNavegacao || !botaoHamburger) return;
        menuNavegacao.classList.toggle('aberto', abrir);
        botaoHamburger.classList.toggle('aberto', abrir);
        botaoHamburger.setAttribute('aria-expanded', String(abrir));
        botaoHamburger.setAttribute('aria-label', abrir ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        document.body.style.overflow = abrir ? 'hidden' : 'auto';
    };

    if (botaoHamburger) {
        botaoHamburger.addEventListener('click', (evento) => {
            evento.stopPropagation();
            alternarMenu();
        });
    }

    ligacoesNavegacao.forEach(ligacao => {
        ligacao.addEventListener('click', (evento) => {
            evento.preventDefault();
            const idPagina = ligacao.dataset.pagina;
            if (idPagina) navegarPara(idPagina);
            if (menuNavegacao && menuNavegacao.classList.contains('aberto')) alternarMenu(false);
        });
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menuNavegacao && menuNavegacao.classList.contains('aberto')) {
            alternarMenu(false);
            botaoHamburger.focus();
        }

        if (estadoAplicacao.paginaAtual === 'cobra') {
            if (evento.code === 'Space') {
                evento.preventDefault();
                alternarPausaCobra();
            }
            tratarTeclaCobra(evento);
        } else if (estadoAplicacao.paginaAtual === 'flappybird' && evento.code === 'Space') {
            evento.preventDefault();
            const botaoPausaFlappy = document.getElementById('botao-pausa-flappy');
            if (estadoFlappy.pausado) botaoPausaFlappy.click();
            else if (estadoFlappy.emJogo) estadoFlappy.passaro.velocidadeY = -estadoFlappy.velocidadePulo;
        } else if (estadoAplicacao.paginaAtual === 'jogo2048') {
            tratarTecla2048(evento);
        }
    });

    document.addEventListener('click', (evento) => {
        if (menuNavegacao && menuNavegacao.classList.contains('aberto') &&
            !menuNavegacao.contains(evento.target) &&
            botaoHamburger && !botaoHamburger.contains(evento.target)) {
            alternarMenu(false);
        }
    });
});
