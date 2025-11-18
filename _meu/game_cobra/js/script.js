const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const contagem = document.querySelector('.contagem--valor');
const finalContagem = document.querySelector('.final-contagem > span');
const highContagemText = document.querySelector('.high-contagem--valor');
const menu = document.querySelector('.menu-screen');
const buttonPlay = document.querySelector('.btn-play');
const velocidadeRange = document.querySelector('#velocidadeRange');
const velocidadeValue = document.querySelector('#velocidadeValue');


const audio = new Audio('../assets/audio.mp3');
const size = 30;

const posicaoInicial = {x:270, y:240} 
let cobra = [posicaoInicial];
let pausa = false;
let gameVelocidade = 170;
let highContagem = localStorage.getItem('highContagem') || 0;

highContagemText.innerText = highContagem.toString().padStart(2, '0');


/* Funções utilitárias */
const incrementContagem =  () =>{
    contagem.innerText = +contagem.innerText + 10
}

const numeroAleatorio =  (min, max) =>{
    return Math.round(Math.random() *(max - min)+min)
}

const posicaoAleatoria =  () =>{
    const number = numeroAleatorio(0, canvas.width - size)
    return Math.round(number / 30) *30
}

const corAleatoria =  () =>{
    const red = numeroAleatorio(0, 255)
    const green = numeroAleatorio(0, 255)
    const blue = numeroAleatorio(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const comida = {
    x: posicaoAleatoria(),
    y: posicaoAleatoria(),
    color: corAleatoria()
}

let direction, loopId

/* Desenhar comida */
const desenharComida = () =>{
    const {x, y, color} = comida

    ctx.shadowColor = color
    ctx.shadowBlur = 60
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

/* Desenhar cobra */
const desenharCobra = () =>{
    ctx.fillStyle = "#0ff"
    
    cobra.forEach((position, index) =>{

        if (index == cobra.length -1){
            ctx.fillStyle = "rgba(199, 255, 255, 1)"
        }
        ctx.fillRect(position.x, position.y, size, size);
    });
}

/* Movimento da cobra */
const moveCobra =() =>{

    if(!direction || pausa) return

    const head = cobra[cobra.length -1]

    if (direction == "right") {
        cobra.push({x: head.x + size, y: head.y})
    }

    if (direction == "left") {
        cobra.push({x: head.x - size, y: head.y})
    }

    if (direction == "down") {
        cobra.push({x: head.x, y: head.y + size})
    }

    if (direction == "up") {
        cobra.push({x: head.x, y: head.y - size})
    }

     cobra.shift()
}

/* Desenhar grade */
const desenharGrade =() =>{
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

/* Comer comida */
const cobraComeu = () =>{
    const head = cobra[cobra.length -1]

    if (head.x == comida.x && head.y == comida.y) {
        cobra.push(head)
        audio.play()
        incrementContagem()
        let x = posicaoAleatoria()
        let y = posicaoAleatoria()

        while(cobra.find((position) => position.x == x && position.y == y)){
            x = posicaoAleatoria()
            y = posicaoAleatoria()
        }

        comida.x = x
        comida.y = y
        comida.color = corAleatoria()
    }
}

/* Colisões */
const cobraColidio = () =>{
     const head = cobra[cobra.length -1]
     const canvasLimit = canvas.width - size
     const nackIndex = cobra.length -2
     
     const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

     const selfCollision = cobra.find((position, index) =>{
        return  index < nackIndex && position.x == head.x && position.y == head.y
     })

     if(wallCollision || selfCollision){
        gemeOver()
     }
}

/* Fim de jogo */
const gemeOver = () =>{
    direction = undefined
    menu.style.display = "flex"
    finalContagem.innerText = contagem.innerText
    canvas.style.filter = "blur(2px)"

    // Atualiza recorde
    const current = parseInt(contagem.innerText);
    if (current > highContagem) {
    highContagem = current;
    localStorage.setItem('highContagem', highContagem);
    highContagemText.innerText = highContagem.toString().padStart(2, '0');
  }
}

/* Loop principal */
const gameLoop = () =>{
    clearInterval(loopId)
    if (pausa) return
    ctx.clearRect(0, 0, 600, 600)
    desenharComida()
    desenharGrade()
    cobraComeu()
    desenharCobra()
    moveCobra()
    cobraColidio()

    loopId = setTimeout(() =>{
        gameLoop()
}, gameVelocidade)
}

gameLoop()

/*  Eventos  */

// Direções
document.addEventListener("keydown", ({key}) =>{
   if (key == "ArrowRight" && direction != "left"){
        direction = "right"
   }

   if (key == "ArrowLeft" && direction != "right"){
        direction = "left"
   }

   if (key == "ArrowUp" && direction != "down"){
        direction = "up"
   }

   if (key == "ArrowDown" && direction != "up"){
        direction = "down"
   }

   if (key == "Enter") {
    pausa = !pausa;
    canvas.style.filter = pausa ? "blur(3px)" : "none";
    if (!pausa) gameLoop();
  }

})

// Jogar novamente
buttonPlay.addEventListener("click", () =>{
    contagem.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter ="none"
    direction = undefined;
    pausa = false;
    gameLoop();
    cobra = [posicaoInicial]
})

// Controlar velocidade com o range
velocidadeRange.addEventListener("input", (e) => {
  gameVelocidade = parseInt(e.target.value);
  velocidadeValue.innerText = gameVelocidade;
})
