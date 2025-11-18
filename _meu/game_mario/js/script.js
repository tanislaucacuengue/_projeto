const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');

let emPausa = false; // controla se o jogo está pausado
let velocidade = 1.5; // velocidade inicial da animação do cano
let gameOver = false; // impede que o jogo continue após perder

// Função para o salto do Mario
const salto = () => {

     if (emPausa || gameOver) return; // não pula se o jogo estiver pausado ou acabado
    mario.classList.add('jump');

    setTimeout(() => {
    mario.classList.remove('jump');
}, 500);

}

// Função para aumentar gradualmente a velocidade a cada 50 segundos
setInterval(() => {
    if (!emPausa && !gameOver) {
        velocidade = Math.max(0.6, velocidade - 0.1); // quanto menor o valor, mais rápido o cano
        tubo.style.animation = `pipe-animation ${velocidade}s infinite linear`;
        console.log(`Velocidade aumentada: ${velocidade.toFixed(1)}s`);
    }
}, 50000); // 50 segundos


// Função principal de loop do jogo
const loop = setInterval(() =>{

    if (emPausa || gameOver) return; // pausa o loop

    console.log('loop')

     // Detecta colisão
    const posicaotubo = tubo.offsetLeft;
    const marioPosicao = +window.getComputedStyle(mario).bottom.replace('px','');

    if (posicaotubo <= 120 &&  posicaotubo > 0 && marioPosicao < 80) {
        
        tubo.style.animation = 'none';
        tubo.style.left = `${posicaotubo}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosicao}px`;

        mario.src = "img/game-over.png";
        mario.style.width = '80px';

        clearInterval(loop);

    }

}, 10);

// Pausar e retomar o jogo com a tecla ENTER
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        emPausa = !emPausa;

        if (emPausa) {
            tubo.style.animationPlayState = 'paused';
            mario.style.animationPlayState = 'paused';
            
        } else {
            tubo.style.animationPlayState = 'running';
            mario.style.animationPlayState = 'running';
            
        }
    }

    // Permite pular com qualquer tecla, exceto Enter
    if (event.key !== "Enter") {
        salto();
    }
});
