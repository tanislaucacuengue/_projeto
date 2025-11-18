/* NÍVEL 1 */
/* 1º Declaração do vetor onde estão armazenadas todas perguntas e respostas do Jogo*/
const nivel1 = [
    {
        /* Este é o objecto que contem texto que vai substituir o texto que está no h2*/
        pergunta: "Qual é o maior animal do mundo?",

        /*Este é o objecto de vetor que contem o id: Identificador, text: O texto que vai substituir o texto que está no button.btn, correct: A resposta certa*/
        answers: [
            { id: 1, text: "Tubarão", correct: false },
            { id: 2, text: "Baleia Azul", correct: true },
            { id: 3, text: "Elefante", correct: false },
            { id: 4, text: "Girafa", correct: false },
        ]
    },
    {
        pergunta: "Qual é o maior deserto do mundo?",
        answers: [
            { id: 1, text: "Kalahari", correct: false },
            { id: 2, text: "Gobi", correct: false },
            { id: 3, text: "Saara", correct: true },
            { id: 4, text: "Antártida", correct: false },
        ]
    },
    {
        pergunta: "Qual é o menor continente do mundo?",
        answers: [
            { id: 1, text: "Ásia", correct: false },
            { id: 2, text: "Austrália", correct: true },
            { id: 3, text: "Ártico", correct: false },
            { id: 4, text: "Europa", correct: false },
        ]
    },
    {
        pergunta: "Qual é o menor país do mundo?",
        answers: [
            { id: 1, text: "Vaticano", correct: true },
            { id: 2, text: "Butão", correct: false },
            { id: 3, text: "Nepal", correct: false },
            { id: 4, text: "Sri Lanka", correct: false },
        ]
    }
];

/*  NÍVEL 2  */
const nivel2 = [
    {
        pergunta: "Qual é o planeta mais próximo do Sol?",
        answers: [
            { id: 1, text: "Vénus", correct: false },
            { id: 2, text: "Mercúrio", correct: true },
            { id: 3, text: "Terra", correct: false },
            { id: 4, text: "Marte", correct: false },
        ]
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        answers: [
            { id: 1, text: "Leonardo da Vinci", correct: true },
            { id: 2, text: "Michelangelo", correct: false },
            { id: 3, text: "Rafael", correct: false },
            { id: 4, text: "Donatello", correct: false },
        ]
    },
    {
        pergunta: "Qual é o país com mais habitantes no mundo?",
        answers: [
            { id: 1, text: "Índia", correct: true },
            { id: 2, text: "China", correct: false },
            { id: 3, text: "EUA", correct: false },
            { id: 4, text: "Brasil", correct: false },
        ]
    },
    {
        pergunta: "Qual é a capital do Japão?",
        answers: [
            { id: 1, text: "Pequim", correct: false },
            { id: 2, text: "Seul", correct: false },
            { id: 3, text: "Tóquio", correct: true },
            { id: 4, text: "Osaka", correct: false },
        ]
    }
];

/*  VARIÁVEIS GERAIS  */
/*Criamos variaveis uma para ver a questão atual e outra para ver quantas questões foram acertadas (O valor 0 significa que vai começar do 1º ao ultimo)*/

let correnteNivel = 1;
let perguntas = nivel1;
let correntePerguntaIndex = 0;
let contagem = 0;

/*  SELETORES  */
/*Criamos espaços para selecionar e armazenar os valores vindos dos identificadores do HTML*/

const perguntaElement = document.getElementById("pergunta");
const botaoResposta = document.getElementById("answer-buttons");
const proximoBotao = document.getElementById("next-btn");

/*  FUNÇÕES  */
/*Esta é a função que dá inicio ao jogo */

function startQuiz() {
    correntePerguntaIndex = 0;
    contagem = 0;
    correnteNivel = 1;
    perguntas = nivel1;
    proximoBotao.innerHTML = "Próximo";
    mostrarPergunta();
}

/*Está funcão usamos para remover os botões das perguntas depois de clicar em proximo e manter o botão de proximo escondido antes de se clicar em um resposta */

function reporEstado() {
    proximoBotao.style.display = "none";
    while (botaoResposta.firstChild) {
        botaoResposta.removeChild(botaoResposta.firstChild);
    }
}

/*Esta é a função que vai mostrar a primeira questão na tela */

function mostrarPergunta() {
    reporEstado();
    let correntePergunta = perguntas[correntePerguntaIndex];
    let perguntaNo = correntePerguntaIndex + 1;
    perguntaElement.innerHTML = `Nível ${correnteNivel} - ${perguntaNo}. ${correntePergunta.pergunta}`;

    correntePergunta.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selecionarResposta);
        botaoResposta.appendChild(button);
    });
}

/*Esta função ajuda identificar se clicamos na reposta certa ou não  */

function selecionarResposta(e) {
    const selecionarBtn = e.target;
    const estaCorreto = selecionarBtn.dataset.correct === "true";

    if (estaCorreto) {
        selecionarBtn.classList.add("correcto");
        contagem++;
    } else {
        selecionarBtn.classList.add("incorrecto");
    }

    Array.from(botaoResposta.children).forEach(button => {
        button.disabled = true;
    });

    proximoBotao.style.display = "block";
}

/*Esta função ajuda identificar se clicamos na reposta certa ou não  */

function mostrarContagem() {
    reporEstado();
    if (correnteNivel === 1) {
        perguntaElement.innerHTML = ` Você completou o nível 1 com ${contagem} de ${perguntas.length} acertos!<br><br> Clique em "Próximo nível" para continuar.`;
        proximoBotao.innerHTML = "Próximo nível";
        proximoBotao.style.display = "block";
    } else {
        perguntaElement.innerHTML = ` Parabéns! Você terminou todos os níveis!<br><br>Acertou ${contagem} de ${perguntas.length} perguntas neste nível.`;
        proximoBotao.innerHTML = "Jogar novamente";
        proximoBotao.style.display = "block";
    }
}

/*Esta função serve para adicionar a proxima questão depois de clicar em proxima  */

function colocarProximoBotao() {
    correntePerguntaIndex++;
    if (correntePerguntaIndex < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarContagem();
    }
}

/*  BOTÃO "PRÓXIMO"  */
proximoBotao.addEventListener("click", () => {
    if (correntePerguntaIndex < perguntas.length) {
        colocarProximoBotao();
    } else {
        if (correnteNivel === 1) {
            // Passa para o nível 2
            correnteNivel = 2;
            perguntas = nivel2;
            correntePerguntaIndex = 0;
            contagem = 0;
            mostrarPergunta();
            proximoBotao.innerHTML = "Próximo";
        } else {
            // Reinicia o jogo
            startQuiz();
        }
    }
});

/*  INICIAR  */
startQuiz();
