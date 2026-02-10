/* 
   GameHub - JavaScript Principal
   Contém a lógica de navegação e todos os jogos
    */

// 
// NAVEGAÇÃO ENTRE PÁGINAS
// 

function navigateTo(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    window.scrollTo(0, 0);

    // Inicializar jogos quando necessário
    if (pageId === 'quiz') {
        initQuiz();
    } else if (pageId === 'mario') {
        initMario();
    } else if (pageId === 'cobra') {
        initCobra();
    } else if (pageId === 'memoria') {
        initMemory();
    }
}

// 
// QUIZ GAME
// 

const quizData = {
    nivel1: [
        {
            pergunta: "Qual é o maior animal do mundo?",
            answers: [
                { text: "Tubarão", correct: false },
                { text: "Baleia Azul", correct: true },
                { text: "Elefante", correct: false },
                { text: "Girafa", correct: false },
            ]
        },
        {
            pergunta: "Qual é o maior deserto do mundo?",
            answers: [
                { text: "Kalahari", correct: false },
                { text: "Gobi", correct: false },
                { text: "Saara", correct: true },
                { text: "Antártida", correct: false },
            ]
        },
        {
            pergunta: "Qual é o menor continente do mundo?",
            answers: [
                { text: "Ásia", correct: false },
                { text: "Austrália", correct: true },
                { text: "Ártico", correct: false },
                { text: "Europa", correct: false },
            ]
        },
        {
            pergunta: "Qual é o menor país do mundo?",
            answers: [
                { text: "Vaticano", correct: true },
                { text: "Butão", correct: false },
                { text: "Nepal", correct: false },
                { text: "Sri Lanka", correct: false },
            ]
        }
    ],
    nivel2: [
        {
            pergunta: "Qual é o planeta mais próximo do Sol?",
            answers: [
                { text: "Vénus", correct: false },
                { text: "Mercúrio", correct: true },
                { text: "Terra", correct: false },
                { text: "Marte", correct: false },
            ]
        },
        {
            pergunta: "Quem pintou a Mona Lisa?",
            answers: [
                { text: "Leonardo da Vinci", correct: true },
                { text: "Michelangelo", correct: false },
                { text: "Rafael", correct: false },
                { text: "Donatello", correct: false },
            ]
        },
        {
            pergunta: "Qual é o país com mais habitantes no mundo?",
            answers: [
                { text: "Índia", correct: true },
                { text: "China", correct: false },
                { text: "EUA", correct: false },
                { text: "Brasil", correct: false },
            ]
        },
        {
            pergunta: "Qual é a capital do Japão?",
            answers: [
                { text: "Pequim", correct: false },
                { text: "Seul", correct: false },
                { text: "Tóquio", correct: true },
                { text: "Osaka", correct: false },
            ]
        }
    ]
};

let quizState = {
    currentLevel: 1,
    currentQuestion: 0,
    score: 0,
    questions: [],
    answered: false
};

function initQuiz() {
    quizState = {
        currentLevel: 1,
        currentQuestion: 0,
        score: 0,
        questions: quizData.nivel1,
        answered: false
    };
    showQuizQuestion();
}

function showQuizQuestion() {
    const question = quizState.questions[quizState.currentQuestion];
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answer-buttons');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');

    questionElement.innerHTML = `Nível ${quizState.currentLevel} - ${quizState.currentQuestion + 1}/${quizState.questions.length}: ${question.pergunta}`;
    
    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = answer.text;
        button.onclick = () => selectQuizAnswer(answer.correct, button);
        answersContainer.appendChild(button);
    });

    nextBtn.style.display = 'none';
    
    const progress = ((quizState.currentQuestion + 1) / quizState.questions.length) * 100;
    progressBar.style.width = progress + '%';

    quizState.answered = false;
}

function selectQuizAnswer(correct, button) {
    if (quizState.answered) return;
    
    quizState.answered = true;
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === button.textContent) {
            if (correct) {
                btn.classList.add('correcto');
                quizState.score++;
            } else {
                btn.classList.add('incorrecto');
            }
        }
    });

    document.getElementById('next-btn').style.display = 'block';
}

document.getElementById('next-btn')?.addEventListener('click', () => {
    quizState.currentQuestion++;
    
    if (quizState.currentQuestion < quizState.questions.length) {
        showQuizQuestion();
    } else {
        showQuizResults();
    }
});

function showQuizResults() {
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answer-buttons');
    const nextBtn = document.getElementById('next-btn');

    answersContainer.innerHTML = '';
    
    if (quizState.currentLevel === 1) {
        questionElement.innerHTML = `Parabéns! Você completou o nível 1 com <strong>${quizState.score}</strong> de <strong>${quizState.questions.length}</strong> acertos!<br><br>Clique em "Próximo nível" para continuar.`;
        nextBtn.textContent = 'Próximo Nível';
        nextBtn.style.display = 'block';
        
        nextBtn.onclick = () => {
            quizState.currentLevel = 2;
            quizState.currentQuestion = 0;
            quizState.questions = quizData.nivel2;
            quizState.score = 0;
            nextBtn.textContent = 'Próximo';
            nextBtn.onclick = null;
            showQuizQuestion();
        };
    } else {
        questionElement.innerHTML = `🎉 Parabéns! Você terminou todos os níveis!<br><br>Score total: <strong>${quizState.score}</strong> de <strong>${quizState.questions.length}</strong> acertos no nível 2.`;
        nextBtn.textContent = 'Jogar Novamente';
        nextBtn.style.display = 'block';
        
        nextBtn.onclick = () => {
            nextBtn.onclick = null;
            initQuiz();
        };
    }
}

// 
// MARIO GAME
// 

let marioState = {
    marioTop: 0,
    marioLeft: 50,
    tuboLeft: 500,
    gameRunning: true,
    score: 0,
    gameSpeed: 10
};

function initMario() {
    marioState = {
        marioTop: 0,
        marioLeft: 50,
        tuboLeft: 500,
        gameRunning: true,
        score: 0,
        gameSpeed: 10
    };
    
    document.getElementById('mario-score').textContent = '0';
    
    const mario = document.querySelector('.mario');
    const tubo = document.querySelector('.tubo');
    
    if (mario) mario.style.bottom = '0px';
    if (tubo) tubo.style.right = '0px';
    
    startMarioGame();
}

function startMarioGame() {
    const mario = document.querySelector('.mario');
    const tubo = document.querySelector('.tubo');
    const gameBoard = document.querySelector('.game-board');
    
    if (!mario || !tubo || !gameBoard) return;

    let isJumping = false;
    let jumpHeight = 0;
    const jumpPower = 15;
    const gravity = 0.6;

    function jump() {
        if (!isJumping && marioState.gameRunning) {
            isJumping = true;
            jumpHeight = jumpPower;
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            jump();
        }
    });

    gameBoard.addEventListener('click', jump);

    setInterval(() => {
        if (!marioState.gameRunning) return;

        // Pulo
        if (isJumping) {
            jumpHeight -= gravity;
            marioState.marioTop = Math.max(0, jumpHeight);
            mario.style.bottom = marioState.marioTop + 'px';

            if (marioState.marioTop <= 0) {
                isJumping = false;
                marioState.marioTop = 0;
                mario.style.bottom = '0px';
            }
        }

        // Movimento do tubo
        marioState.tuboLeft -= marioState.gameSpeed;
        tubo.style.right = marioState.tuboLeft + 'px';

        // Reiniciar tubo
        if (marioState.tuboLeft < -60) {
            marioState.tuboLeft = 500;
            marioState.score += 10;
            marioState.gameSpeed += 0.5;
            document.getElementById('mario-score').textContent = marioState.score;
        }

        // Detecção de colisão
        if (
            marioState.marioTop < 100 &&
            marioState.tuboLeft < 100 &&
            marioState.tuboLeft > -60
        ) {
            marioState.gameRunning = false;
            alert(`Game Over! Score: ${marioState.score}`);
            initMario();
        }
    }, 30);
}

// 
// COBRA GAME
// 

let cobraState = {
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    highScore: localStorage.getItem('cobraHighScore') || 0,
    gameRunning: true,
    gameSpeed: 100
};

function initCobra() {
    cobraState = {
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        direction: { x: 1, y: 0 },
        nextDirection: { x: 1, y: 0 },
        score: 0,
        highScore: localStorage.getItem('cobraHighScore') || 0,
        gameRunning: true,
        gameSpeed: 100
    };

    document.getElementById('cobra-score').textContent = '0';
    document.getElementById('cobra-highscore').textContent = cobraState.highScore;
    
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');
    
    if (speedRange) {
        speedRange.addEventListener('change', (e) => {
            cobraState.gameSpeed = 350 - parseInt(e.target.value);
            speedValue.textContent = e.target.value;
        });
    }

    startCobraGame();
}

function startCobraGame() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    function generateFood() {
        cobraState.food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && cobraState.direction.y === 0) {
            cobraState.nextDirection = { x: 0, y: -1 };
        } else if (e.key === 'ArrowDown' && cobraState.direction.y === 0) {
            cobraState.nextDirection = { x: 0, y: 1 };
        } else if (e.key === 'ArrowLeft' && cobraState.direction.x === 0) {
            cobraState.nextDirection = { x: -1, y: 0 };
        } else if (e.key === 'ArrowRight' && cobraState.direction.x === 0) {
            cobraState.nextDirection = { x: 1, y: 0 };
        }
    });

    function update() {
        if (!cobraState.gameRunning) return;

        cobraState.direction = cobraState.nextDirection;
        const head = cobraState.snake[0];
        const newHead = {
            x: (head.x + cobraState.direction.x + tileCount) % tileCount,
            y: (head.y + cobraState.direction.y + tileCount) % tileCount
        };

        // Verificar colisão com corpo
        for (let segment of cobraState.snake) {
            if (newHead.x === segment.x && newHead.y === segment.y) {
                cobraState.gameRunning = false;
                if (cobraState.score > cobraState.highScore) {
                    cobraState.highScore = cobraState.score;
                    localStorage.setItem('cobraHighScore', cobraState.highScore);
                    document.getElementById('cobra-highscore').textContent = cobraState.highScore;
                }
                alert(`Game Over! Score: ${cobraState.score}\nRecorde: ${cobraState.highScore}`);
                initCobra();
                return;
            }
        }

        cobraState.snake.unshift(newHead);

        // Verificar colisão com comida
        if (newHead.x === cobraState.food.x && newHead.y === cobraState.food.y) {
            cobraState.score += 10;
            document.getElementById('cobra-score').textContent = cobraState.score;
            generateFood();
        } else {
            cobraState.snake.pop();
        }
    }

    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenhar cobra
        ctx.fillStyle = '#10B981';
        for (let segment of cobraState.snake) {
            ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
        }

        // Desenhar comida
        ctx.fillStyle = '#F97316';
        ctx.fillRect(cobraState.food.x * gridSize + 1, cobraState.food.y * gridSize + 1, gridSize - 2, gridSize - 2);
    }

    const gameLoop = setInterval(() => {
        update();
        draw();
    }, cobraState.gameSpeed);
}

// 
// MEMÓRIA GAME
// 

const memoryEmojis = ['🎮', '🎮', '🎲', '🎲', '🎯', '🎯', '🎪', '🎪', '🎨', '🎨', '🎭', '🎭', '🎬', '🎬', '🎸', '🎸'];

let memoryState = {
    cards: [],
    flipped: [],
    matched: 0,
    moves: 0,
    gameRunning: true,
    startTime: 0,
    timerInterval: null
};

function initMemory() {
    memoryState = {
        cards: [...memoryEmojis].sort(() => Math.random() - 0.5),
        flipped: [],
        matched: 0,
        moves: 0,
        gameRunning: true,
        startTime: Date.now(),
        timerInterval: null
    };

    document.getElementById('memoria-moves').textContent = '0';
    document.getElementById('memoria-timer').textContent = '0';

    const gameContainer = document.getElementById('memory-game');
    gameContainer.innerHTML = '';

    memoryState.cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = '?';
        card.addEventListener('click', () => flipMemoryCard(index, card));
        gameContainer.appendChild(card);
    });

    startMemoryTimer();
}

function flipMemoryCard(index, cardElement) {
    if (!memoryState.gameRunning) return;
    if (memoryState.flipped.includes(index)) return;
    if (cardElement.classList.contains('matched')) return;

    memoryState.flipped.push(index);
    cardElement.classList.add('flipped');
    cardElement.textContent = memoryState.cards[index];

    if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        document.getElementById('memoria-moves').textContent = memoryState.moves;

        const [index1, index2] = memoryState.flipped;
        const match = memoryState.cards[index1] === memoryState.cards[index2];

        setTimeout(() => {
            const card1 = document.querySelector(`[data-index="${index1}"]`);
            const card2 = document.querySelector(`[data-index="${index2}"]`);

            if (match) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                memoryState.matched += 2;

                if (memoryState.matched === memoryState.cards.length) {
                    memoryState.gameRunning = false;
                    const elapsed = Math.floor((Date.now() - memoryState.startTime) / 1000);
                    alert(`🎉 Parabéns! Você venceu!\nTentativas: ${memoryState.moves}\nTempo: ${elapsed}s`);
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
            }

            memoryState.flipped = [];
        }, 500);
    }
}

function startMemoryTimer() {
    memoryState.timerInterval = setInterval(() => {
        if (memoryState.gameRunning) {
            const elapsed = Math.floor((Date.now() - memoryState.startTime) / 1000);
            document.getElementById('memoria-timer').textContent = elapsed;
        }
    }, 1000);
}

document.getElementById('restart-memory')?.addEventListener('click', initMemory);

// 
// INICIALIZAÇÃO
// 

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
    
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'home';
        navigateTo(hash);
    });
});

console.log('GameHub - Plataforma de Jogos carregada com sucesso! 🎮');
