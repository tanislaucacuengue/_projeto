
/* 1º Declaração do vetor onde estão armazenadas todas perguntas e respostas do Jogo*/
const questions = [
    
{
    
    question: "Qual é o maior animal do mundo?",/* Este é o objecto que contem texto que vai substituir o texto que está no h2*/
    answers: [
        {id: 1, text: "Tubarão", correct: false},/*Este é o objecto de vetor que contem o id: Identificador, text: Otexto que vai substituir o texto que está no button.btn, correct: A resposta certa*/
        {id: 2, text: "Baleia Azul", correct: true},
        {id: 3, text: "Elefante", correct: false},
        {id: 4, text: "Girafá", correct: false},
    ]
},

{

    question: "Qual é o maior Deserto do mundo?",
    answers: [
        {id: 1, text: "Kalahari", correct: false},
        {id: 2, text: "Gobi", correct: false},
        {id: 3, text: "Saara", correct: true},
        {id: 4, text: "Antartica", correct: false},
    ]
},

{

    question: "Qual é o menor continente do mundo?",
    answers: [
        {id: 1, text: "Asia", correct: false},
        {id: 2, text: "Australia", correct: true},
        {id: 3, text: "Artico", correct: false},
        {id: 4, text: "Europa", correct: false},
    ]
},

{

    question: "Qual é o menor país  do mundo?",
    answers: [
        {id: 1, text: "Vaticano", correct: true},
        {id: 2, text: "Butão", correct: false},
        {id: 3, text: "Nepal", correct: false},
        {id: 4, text: "Shri Lanka", correct: false},
    ]
},
]

/*Criamos espaços para selecionar e armazenar os valores vindos dos identificadores do HTML*/
const questionElement = window.document.getElementById("question"); 
const answerButtons = window.document.getElementById("answer-buttons");
const nextButton = window.document.getElementById("next-btn");

/*Criamos variaveis uma para ver a questão atual e outra para ver quantas questões foram acertadas (O valor 0 significa que vai começar do 1º ao ultimo)*/
var currentQuestionIndex = 0;
var score = 0;

/*Esta é a função que dá inicio ao jogo */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Proximo'/*Este texto vai substituir o valor que está no button#next-btn */
    showQuestion();
}

/*Está funcão usamos para remover os botões das perguntas depois de clicar em proximo e manter o botão de proximo escondido antes de se clicar em um resposta */
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

/*Esta é a função que vai mostrar a primeira questão na tela */
function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex +1; 
    questionElement.innerHTML= questionNo +"."+currentQuestion.question;/*Declaramos esta variavel para mudar o numero de identificação das questões */

    currentQuestion.answers.forEach((answer) =>{
        const button = window.document.createElement("button");/*Aqui criamos o botões das resposta de forma dinamica  usando o elemento HTML button para substituir os que foram removidos pela função resetstate() */
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;/*Usamos parametro dataset para dar idetificadores as questões no documento HTML */
        button.classList.add("btn");/*Como criamos buttons de forma dinamica o CSS desaparece para chamar ele devemo o código que está nesta linha */
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    })
}

/*Esta função ajuda identificar se clicamos na reposta certa ou não  */
function selectAnswer(e) {
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];/*Usamos para saber qual das respostas tem o valor true */

    const selectedBtn = e.target; /*Usamos para saber qual botão que foi digitado */
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id; /*Usamos para fazer igualdade entre eles */

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score ++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => { /*Usamos para desabilitar a outras respostas depois de clicar em um sendo ela verdadeira ou não */
        button.disabled = true;
    });

    nextButton.style.display = "block"; /*Por meio deste comando o botão vai aparecer apois clicar em uma das respostas sejam elas correta ou incorreta */
}

/*Usamos Para apresenta a quantidade de acertos e erros */
function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} !!`;
    nextButton.innerHTML = 'Jogar de novo';
    nextButton.style.display = "block";
}

/*Esta função serve para adicionar a proxima questão depois de clicar em proxima  */
function handleNextButton() {

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }

    else{
        showScore();
    }
}
/*Esta é a função que nos leva a proxima questão com um clique */
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }

    else{
        startQuiz();
    }
} );


startQuiz();

