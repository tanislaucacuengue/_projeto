const teclas = document.querySelectorAll('.tecla');
const verificarTecla = document.querySelector('.verificar__tecla');
const interruptor = document.querySelector('.interruptor');
const pianoTeclas = document.querySelector('.piano__teclas');

const playNotas = (nota) => {
    const audio = new Audio(`../notas/${nota}.wav`);
    audio.play();
}

const tocarMouseDown = (tecla) =>{

    playNotas(tecla.getAttribute('data-nota'));

    if (tecla.className.includes('black')){

        tecla.classList.add('black--precionada');
        return;
    }

    tecla.style.background = '#ddd';

    
}

const tocarMouseUp = (tecla) =>{

    if (tecla.className.includes('black')){
        tecla.classList.remove('black--precionada');
        return;
    }

    tecla.style.background = 'white';
}

teclas.forEach((tecla) => {

tecla.addEventListener('mousedown', () => tocarMouseDown(tecla))

tecla.addEventListener('mouseup', () => tocarMouseUp(tecla))

}); 

verificarTecla.addEventListener('change', ({target}) => {
    if(target.checked){
        interruptor.classList.add('interruptor--activo');
        pianoTeclas.classList.remove('teclas--desactivadas');
        return;
    }

    interruptor.classList.remove('interruptor--activo');
    pianoTeclas.classList.add('teclas--desactivadas');
})

const teclaDownMapper = {
    "tab": () => tocarMouseDown(teclas[0]),
    "1": () => tocarMouseDown(teclas[1]),
    "q": () => tocarMouseDown(teclas[2]),
    "2": () => tocarMouseDown(teclas[3]),
    "w": () => tocarMouseDown(teclas[4]),
    "e": () => tocarMouseDown(teclas[5]),
    "4": () => tocarMouseDown(teclas[6]),
    "r": () => tocarMouseDown(teclas[7]),
    "5": () => tocarMouseDown(teclas[8]),
    "t": () => tocarMouseDown(teclas[9]),
    "6": () => tocarMouseDown(teclas[10]),
    "y": () => tocarMouseDown(teclas[11]),
    "u": () => tocarMouseDown(teclas[12]),
    "8": () => tocarMouseDown(teclas[13]),
    "i": () => tocarMouseDown(teclas[14]),
    "9": () => tocarMouseDown(teclas[15]),
    "o": () => tocarMouseDown(teclas[16]),
    "p": () => tocarMouseDown(teclas[17]),
    "'": () => tocarMouseDown(teclas[18]),
    "+": () => tocarMouseDown(teclas[19]),
    "«": () => tocarMouseDown(teclas[20]),
    "´´": () => tocarMouseDown(teclas[21]),
    "Backspace": () => tocarMouseDown(teclas[22]),
    "Dead": () => tocarMouseDown(teclas[23]),
}

const teclaUpMapper = {
    "tab": () => tocarMouseDowtocarMouseUp(teclas[0]),
    "1": () => tocarMouseUp(teclas[1]),
    "q": () => tocarMouseUp(teclas[2]),
    "2": () => tocarMouseUp(teclas[3]),
    "w": () => tocarMouseUp(teclas[4]),
    "e": () => tocarMouseUp(teclas[5]),
    "4": () => tocarMouseUp(teclas[6]),
    "r": () => tocarMouseUp(teclas[7]),
    "5": () => tocarMouseUp(teclas[8]),
    "t": () => tocarMouseUp(teclas[9]),
    "6": () => tocarMouseUp(teclas[10]),
    "y": () => tocarMouseUp(teclas[11]),
    "u": () => tocarMouseUp(teclas[12]),
    "8": () => tocarMouseUp(teclas[13]),
    "i": () => tocarMouseUp(teclas[14]),
    "9": () => tocarMouseUp(teclas[15]),
    "o": () => tocarMouseUp(teclas[16]),
    "p": () => tocarMouseUp(teclas[17]),
    "'": () => tocarMouseUp(teclas[18]),
    "+": () => tocarMouseUp(teclas[19]),
    "«": () => tocarMouseUp(teclas[20]),
    "´´": () => tocarMouseUp(teclas[21]),
    "Backspace": () => tocarMouseUp(teclas[22]),
    "Dead": () => tocarMouseUp(teclas[23]),
}

document.addEventListener('keydown', (event) => {~
    event.preventDefault();
   teclaDownMapper[event.key]()
     //console.log(event.key)
});

document.addEventListener('keyup', (event) => {~
    event.preventDefault();
   teclaUpMapper[event.key]()
     //console.log(event.key)
});