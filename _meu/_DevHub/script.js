/*
// ============================================
   DevHub - JavaScript Interativo
// ============================================   
*/

// ============================================
// Navegação entre Páginas
// ============================================

/** 
 * Navega para uma página específica através do seu ID
 * @param {string} idPagina - O ID da secção da página para mostrar
 */
function navegarPara(idPagina) {
    // Remover classe 'ativa' de todas as páginas
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(pagina => pagina.classList.remove('ativa'));

    // Adicionar classe 'ativa' à página selecionada
    const paginaSelecionada = document.getElementById(idPagina);
    if (paginaSelecionada) {
        paginaSelecionada.classList.add('ativa');
    }

    // Atualizar navegação no menu
    const linksNav = document.querySelectorAll('.link-navegacao');
    linksNav.forEach(link => link.classList.remove('ativa'));
    const linkAtivo = document.querySelector(`[data-pagina="${idPagina}"]`);
    if (linkAtivo) {
        linkAtivo.classList.add('ativa');
    }

    // Scroll para o topo
    window.scrollTo(0, 0);
}

// ============================================
// Gerador de Cores RGB
// ============================================

/**
 * Inicializa o gerador de cores RGB
 */
function inicializarGeradorRGB() {
    const deslizanteVermelho = document.getElementById('deslizanteVermelho');
    const deslizanteVerde = document.getElementById('deslizanteVerde');
    const deslizanteAzul = document.getElementById('deslizanteAzul');
    const preVisualizacaoCor = document.getElementById('preVisualizacaoCor');
    const saidaCor = document.getElementById('saidaCor');
    const valorVermelho = document.getElementById('valorVermelho');
    const valorVerde = document.getElementById('valorVerde');
    const valorAzul = document.getElementById('valorAzul');

    if (!deslizanteVermelho) return;

    function atualizarCor() {
        const r = deslizanteVermelho.value;
        const g = deslizanteVerde.value;
        const b = deslizanteAzul.value;

        const corRGB = `rgb(${r}, ${g}, ${b})`;
        preVisualizacaoCor.style.backgroundColor = corRGB;
        saidaCor.value = corRGB;

        valorVermelho.textContent = r;
        valorVerde.textContent = g;
        valorAzul.textContent = b;
    }

    deslizanteVermelho.addEventListener('input', atualizarCor);
    deslizanteVerde.addEventListener('input', atualizarCor);
    deslizanteAzul.addEventListener('input', atualizarCor);

    // Inicializar com valores padrão
    atualizarCor();
}

//
// Gerador de Border-Radius
//

/**
 * Inicializa o gerador de border-radius
 */
function inicializarGeradorBordas() {
    const bordaSD = document.getElementById('bordaSD');
    const bordaSE = document.getElementById('bordaSE');
    const bordaID = document.getElementById('bordaID');
    const bordaIE = document.getElementById('bordaIE');
    const preVisualizacaoBorda = document.getElementById('preVisualizacaoBorda');
    const saidaBorda = document.getElementById('saidaBorda');
    const valorBordaSD = document.getElementById('valorBordaSD');
    const valorBordaSE = document.getElementById('valorBordaSE');
    const valorBordaID = document.getElementById('valorBordaID');
    const valorBordaIE = document.getElementById('valorBordaIE');

    if (!bordaSD) return;

    function atualizarBordas() {
        const sd = bordaSD.value;
        const se = bordaSE.value;
        const id = bordaID.value;
        const ie = bordaIE.value;

        const valorBordas = `${se}% ${sd}% ${id}% ${ie}%`;
        preVisualizacaoBorda.style.borderRadius = valorBordas;
        saidaBorda.value = `border-radius: ${valorBordas};`;

        valorBordaSD.textContent = `${sd}%`;
        valorBordaSE.textContent = `${se}%`;
        valorBordaID.textContent = `${id}%`;
        valorBordaIE.textContent = `${ie}%`;
    }

    bordaSD.addEventListener('input', atualizarBordas);
    bordaSE.addEventListener('input', atualizarBordas);
    bordaID.addEventListener('input', atualizarBordas);
    bordaIE.addEventListener('input', atualizarBordas);

    // Inicializar
    atualizarBordas();
}

// ============================================
// Gerador de Filtros de Imagens
// ============================================

/**
 * Inicializa o gerador de filtros de imagens
 */
function inicializarGeradorFiltros() {
    const filtroCinza = document.getElementById('filtroCinza');
    const filtroSepia = document.getElementById('filtroSepia');
    const filtroDesfoque = document.getElementById('filtroDesfoque');
    const filtroInverter = document.getElementById('filtroInverter');
    const filtroOpacidade = document.getElementById('filtroOpacidade');
    const filtroBrilho = document.getElementById('filtroBrilho');
    const filtroContraste = document.getElementById('filtroContraste');
    const filtroSaturacao = document.getElementById('filtroSaturacao');

    const imagemFiltro = document.getElementById('imagemFiltro');
    const saidaFiltros = document.getElementById('saidaFiltros');

    const valorCinza = document.getElementById('valorCinza');
    const valorSepia = document.getElementById('valorSepia');
    const valorDesfoque = document.getElementById('valorDesfoque');
    const valorInverter = document.getElementById('valorInverter');
    const valorOpacidade = document.getElementById('valorOpacidade');
    const valorBrilho = document.getElementById('valorBrilho');
    const valorContraste = document.getElementById('valorContraste');
    const valorSaturacao = document.getElementById('valorSaturacao');

    if (!filtroCinza) return;

    function atualizarFiltros() {
        const cinza = filtroCinza.value;
        const sepia = filtroSepia.value;
        const desfoque = filtroDesfoque.value;
        const inverter = filtroInverter.value;
        const opacidade = filtroOpacidade.value;
        const brilho = filtroBrilho.value;
        const contraste = filtroContraste.value;
        const saturacao = filtroSaturacao.value;

        const stringFiltros = `grayscale(${cinza}%) sepia(${sepia}%) blur(${desfoque}px) invert(${inverter}%) opacity(${opacidade}%) brightness(${brilho}%) contrast(${contraste}%) saturate(${saturacao}%)`;

        imagemFiltro.style.filter = stringFiltros;
        saidaFiltros.value = `filter: ${stringFiltros};`;

        valorCinza.textContent = `${cinza}%`;
        valorSepia.textContent = `${sepia}%`;
        valorDesfoque.textContent = `${desfoque}px`;
        valorInverter.textContent = `${inverter}%`;
        valorOpacidade.textContent = `${opacidade}%`;
        valorBrilho.textContent = `${brilho}%`;
        valorContraste.textContent = `${contraste}%`;
        valorSaturacao.textContent = `${saturacao}%`;
    }

    filtroCinza.addEventListener('input', atualizarFiltros);
    filtroSepia.addEventListener('input', atualizarFiltros);
    filtroDesfoque.addEventListener('input', atualizarFiltros);
    filtroInverter.addEventListener('input', atualizarFiltros);
    filtroOpacidade.addEventListener('input', atualizarFiltros);
    filtroBrilho.addEventListener('input', atualizarFiltros);
    filtroContraste.addEventListener('input', atualizarFiltros);
    filtroSaturacao.addEventListener('input', atualizarFiltros);

    // Inicializar
    atualizarFiltros();
}

// ============================================
// Funções da Calculadora
// ============================================

/**
 * Calcula o resultado da expressão no visor da calculadora
 */
function avaliarExpressaoAritmetica(expressao) {
    const entrada = String(expressao).replace(/\s+/g, '');
    let posicao = 0;

    const lerNumero = () => {
        const inicio = posicao;
        let digitos = 0;

        while (/[0-9]/.test(entrada[posicao] || '')) {
            posicao++;
            digitos++;
        }

        if (entrada[posicao] === '.') {
            posicao++;
            while (/[0-9]/.test(entrada[posicao] || '')) {
                posicao++;
                digitos++;
            }
        }

        if (digitos === 0) throw new Error('Número inválido');
        const numero = Number(entrada.slice(inicio, posicao));
        if (!Number.isFinite(numero)) throw new Error('Número fora do intervalo');
        return numero;
    };

    const lerFator = () => {
        let sinal = 1;
        while (entrada[posicao] === '+' || entrada[posicao] === '-') {
            if (entrada[posicao] === '-') sinal *= -1;
            posicao++;
        }
        return sinal * lerNumero();
    };

    const lerTermo = () => {
        let resultado = lerFator();
        while (entrada[posicao] === '*' || entrada[posicao] === '/') {
            const operador = entrada[posicao++];
            const operando = lerFator();
            if (operador === '/' && operando === 0) throw new Error('Divisão por zero');
            resultado = operador === '*' ? resultado * operando : resultado / operando;
        }
        return resultado;
    };

    const lerExpressao = () => {
        let resultado = lerTermo();
        while (entrada[posicao] === '+' || entrada[posicao] === '-') {
            const operador = entrada[posicao++];
            const operando = lerTermo();
            resultado = operador === '+' ? resultado + operando : resultado - operando;
        }
        return resultado;
    };

    if (!entrada) throw new Error('Expressão vazia');
    const resultado = lerExpressao();
    if (posicao !== entrada.length || !Number.isFinite(resultado)) {
        throw new Error('Expressão inválida');
    }
    return resultado;
}

function calcularResultado() {
    const visor = document.querySelector('.visor-calculadora');
    if (!visor) return;

    try {
        visor.value = String(avaliarExpressaoAritmetica(visor.value));
    } catch {
        visor.value = 'Erro';
    }
}

// ============================================
// Função para Copiar para a Área de Transferência
// ============================================

/**
 * Copia o valor de um elemento para a área de transferência
 * @param {string} idElemento - O ID do elemento de entrada
 * @param {HTMLButtonElement} botao - O botão accionado para copiar
 */
function copiarParaAreaTransferencia(idElemento, botao) {
    const elemento = document.getElementById(idElemento);
    if (!elemento) return;
    const texto = elemento.value;
    const seleccionarParaCopiaManual = (mensagem) => {
        elemento.focus();
        elemento.select();
        mostrarNotificacao(mensagem, true);
    };

    if (!window.isSecureContext || !navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        seleccionarParaCopiaManual('A cópia automática requer HTTPS ou localhost; o texto foi seleccionado para cópia manual.');
        return;
    }

    let promessaCopia;
    try {
        promessaCopia = navigator.clipboard.writeText(texto);
    } catch {
        seleccionarParaCopiaManual('Não foi possível copiar automaticamente; o texto foi seleccionado para cópia manual.');
        return;
    }

    if (!promessaCopia || typeof promessaCopia.then !== 'function') {
        seleccionarParaCopiaManual('Não foi possível copiar automaticamente; o texto foi seleccionado para cópia manual.');
        return;
    }

    promessaCopia.then(() => {
        // Feedback visual no botão
        if (botao) {
            const textoOriginal = botao.textContent;
            botao.textContent = '✓ Copiado!';
            const corOriginal = botao.style.backgroundColor;
            botao.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                botao.textContent = textoOriginal;
                botao.style.backgroundColor = corOriginal;
            }, 2000);
        }
        
        // Mostrar notificação na plataforma (sucesso)
        mostrarNotificacao('Código copiado com sucesso!', false);

    }).catch(() => seleccionarParaCopiaManual('Não foi possível copiar automaticamente; o texto foi seleccionado para cópia manual.'));
}

function mostrarNotificacao(mensagem, erro = false) {
    // Remover notificação existente se houver
    const existente = document.querySelector('.notificacao-plataforma');
    if (existente) existente.remove();

    const notificacao = document.createElement('div');
    notificacao.className = `notificacao-plataforma ${erro ? 'erro' : ''}`;
    notificacao.textContent = mensagem;
    notificacao.setAttribute('role', erro ? 'alert' : 'status');
    notificacao.setAttribute('aria-live', erro ? 'assertive' : 'polite');
    
    document.body.appendChild(notificacao);
    
    // Animar entrada
    setTimeout(() => notificacao.classList.add('visivel'), 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.classList.remove('visivel');
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ============================================
// Inicialização Global
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar geradores
    inicializarGeradorRGB();
    inicializarGeradorBordas();
    inicializarGeradorFiltros();

    // Configurar links do menu para funcionarem corretamente
    const linksMenu = document.querySelectorAll('.link-navegacao');
    linksMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const idPagina = link.getAttribute('data-pagina');
            navegarPara(idPagina);
            // Atualizar hash na URL
            window.location.hash = idPagina;
        });
    });

    // Navegação por alteração de hash (URL)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'inicio';
        navegarPara(hash);
    });

    // Definir página inicial baseada no hash ou padrão
    const hashInicial = window.location.hash.slice(1) || 'inicio';
    navegarPara(hashInicial);
});

// Suporte para teclado na calculadora
document.addEventListener('keydown', (e) => {
    const visor = document.querySelector('.visor-calculadora');
    const calc = document.getElementById('calculadora');
    if (!visor || !calc || !calc.classList.contains('ativa')) return;

    if (e.key >= '0' && e.key <= '9') {
        visor.value += e.key;
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        visor.value += e.key;
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calcularResultado();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        visor.value = visor.value.slice(0, -1);
    } else if (e.key === 'Escape') {
        e.preventDefault();
        visor.value = '';
    } else if (e.key === '.') {
        visor.value += '.';
    }
});

console.log('DevHub - Aplicação carregada com sucesso! 🚀');

// ============================================
// LÓGICA DO MENU HAMBURGER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const botaoHamburger = document.getElementById('botao-hamburger');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const linksNavegacao = document.querySelectorAll('.link-navegacao');

    const alternarMenu = () => {
        if (!botaoHamburger || !menuNavegacao) return;
        botaoHamburger.classList.toggle('ativo');
        menuNavegacao.classList.toggle('aberto');
        const menuAberto = menuNavegacao.classList.contains('aberto');
        botaoHamburger.setAttribute('aria-expanded', String(menuAberto));
        botaoHamburger.setAttribute('aria-label', menuAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        document.body.style.overflow = menuAberto ? 'hidden' : 'auto';
    };

    if (botaoHamburger) {
        botaoHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            alternarMenu();
        });
    }

    linksNavegacao.forEach(link => {
        link.addEventListener('click', () => {
            if (menuNavegacao.classList.contains('aberto')) {
                alternarMenu();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && botaoHamburger && menuNavegacao && menuNavegacao.classList.contains('aberto')) {
            alternarMenu();
            botaoHamburger.focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (menuNavegacao && botaoHamburger && menuNavegacao.classList.contains('aberto') &&
            !menuNavegacao.contains(e.target) && 
            !botaoHamburger.contains(e.target)) {
            alternarMenu();
        }
    });
});
