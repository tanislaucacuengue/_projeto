 // Total segundos = 60 minutos

    let totalSeconds = 60 * 60; // 3600

    // Queremos uma decisão a cada 10 minutos = 600 segundos
    const intervalDecision = 10 * 60; // 600

    const timeEl = document.getElementById('tempo');
    const decisionEl = document.getElementById('decisao');
    const nextEl = document.getElementById('next');

    // Função para formatar mm:ss ou HH:MM se quiser
    function formatHMS(s){
      const m = Math.floor(s/60);
      const ss = s%60;
      return String(m).padStart(2,'0') + ':' + String(ss).padStart(2,'0');
    }

    // Decide SIM/NÃO. Aqui usamos um gerador simples aleatório para simular "probabilidade".
    function gerarDecisao(){

      // Exemplo: 45% de chance de "SIM" (só um exemplo). Ajuste como desejar.
      return Math.random() < 0.45 ? 'SIM' : 'NÃO';
    }

    // calcula segundos até próxima decisão (a cada múltiplo de intervalo_toma_Decisâo)

    function segundosAteProximaDecisao(remaining){
      const mod = remaining % intervalDecision;
      return mod === 0 ? 0 : mod;
    }

    // inicialização: mostramos uma decisão imediata (no começo do minuto 60:00)
    let currentDecision = gerarDecisao();
    function aplicarDecision(d){
      decisionEl.textContent = d;
      if(d==='SIM'){
        decisionEl.classList.remove('nao');
        decisionEl.classList.add('sim');
      } else {
        decisionEl.classList.remove('sim');
        decisionEl.classList.add('nao');
      }
    }

    aplicarDecision(currentDecision);

    function atualizarUI(){
      timeEl.textContent = formatHMS(totalSeconds);

      // Se chegou num múltiplo de intervalo_toma_Decisâo (incluindo início), atualizamos a decisão
      if(totalSeconds % intervalDecision === 0){

        // se for o momento exato da mudança, sorteamos uma nova decisão
        currentDecision = gerarDecisao();
        aplicarDecision(currentDecision);
      }

      // mostra tempo até a próxima decisão em mm:ss
      const secsUntil = totalSeconds % intervalDecision === 0 ? 0 : totalSeconds % intervalDecision;
      const minutes = Math.floor(secsUntil/60);
      const seconds = secsUntil % 60;

      // se secsUntil === 0, significa que a próxima decisão será tomada agora
      if(secsUntil === 0){
        nextEl.textContent = 'A próxima decisão será tomada em 00:00 (agora)';
      } else {
        nextEl.textContent = 'A próxima decisão será tomada em ' + String(minutes).padStart(2,'0') + ':' + String(seconds).padStart(2,'0');
      }
    }

    atualizarUI();

    // Contagem regressiva: decrementa a cada segundo
    const tick = setInterval(()=>{
      if(totalSeconds <= 0){
        clearInterval(tick);
        totalSeconds = 0;

        // última atualização
        atualizarUI();
        return;
      }

      totalSeconds -= 1;
      atualizarUI();
    }, 1000);

    // Para fins visuais: quando a decisão muda, usei um pequeno efeito 
    const obs = new MutationObserver((mut)=>{
      mut.forEach(m=>{
        if(m.type === 'childList'){
          decisionEl.animate([
            {transform: 'scale(0.85)', opacity:0.6},
            {transform: 'scale(1)', opacity:1}
          ], {duration:300, easing:'ease-out'});
        }
      });
    });
    obs.observe(decisionEl, {childList:true});
