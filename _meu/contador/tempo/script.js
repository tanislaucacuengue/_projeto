let minutos = 60;
let segundos = 0;
let tempo = document.getElementById('tempo');
let chuva = document.getElementById('chuva');

// <>

function atualizarContagem() {
    if (minutos > 0 || segundos > 0) {
        if (segundos == 0) {
            minutos--;
            segundos = 59;
        }

        else{
            segundos--;
        }

        tempo.innerText = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        verificarChuva();

        setTimeout(atualizarContagem, 1000);
    }

    else{
        tempo.innerText = 'Tempo terminado';
    }
}

function verificarChuva() {
    if (segundos == 0 && minutos % 10 == 0) {
        let resposta = Math.random() < 0.5 ? 'SIM' : 'NÃO';
        
        chuva.innerText = `Chuva nos próximos 10 minutos: ${resposta}`;
    }
}

atualizarContagem();