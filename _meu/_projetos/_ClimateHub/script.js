/* ============================================
   PLATAFORMA CLIMA - LÓGICA JAVASCRIPT
   Navegação e Integração com API OpenWeatherMap
   ============================================ */

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

// Chave da API OpenWeatherMap para autenticação
const chaveApiClima = 'af2e03141a2bbb2479f844146cea13ef';

// URL base da API de previsão do tempo
const urlBaseApiClima = 'https://api.openweathermap.org/data/2.5/weather';

// URL base da API de qualidade do ar
const urlBaseApiQualidadeAr = 'https://api.openweathermap.org/data/2.5/air_pollution';

// ============================================
// FUNÇÕES DE NAVEGAÇÃO
// ============================================

/**
 * Função para navegar entre páginas
 * @param {string} idPagina - ID da página para a qual navegar
 * 
 * Descrição: Esta função gerencia a navegação entre as diferentes
 * seções da aplicação (Início e App do Clima). Ela:
 * 1. Esconde todas as páginas
 * 2. Mostra a página selecionada
 * 3. Atualiza os indicadores de navegação
 * 4. Rola a página para o topo
 * 5. Inicializa a app do clima se necessário
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
    const ligacaoAtiva = document.querySelector(`[dados-pagina="${idPagina}"]`);
    if (ligacaoAtiva) {
        ligacaoAtiva.classList.add('ativa');
    }

    // Rolar a página para o topo com comportamento suave
    window.scrollTo(0, 0);

    // Inicializar a app do clima quando necessário
    if (idPagina === 'aplicacao-clima') {
        inicializarAppClima();
    }
}

// ============================================
// FUNÇÕES DA APP DO CLIMA
// ============================================

/**
 * Função para inicializar a app do clima
 * 
 * Descrição: Esta função configura os eventos necessários
 * para que a app do clima funcione corretamente. Ela:
 * 1. Obtém o formulário de pesquisa
 * 2. Adiciona um listener para o evento de envio do formulário
 * 3. Marca a app como inicializada para evitar duplicação
 */
function inicializarAppClima() {
    // Obter o formulário de pesquisa
    const formularioPesquisa = document.querySelector('#formulario-pesquisa');
    
    // Verificar se a app já foi inicializada
    if (formularioPesquisa && !formularioPesquisa.dataset.inicializada) {
        // Adicionar listener para o evento de envio do formulário
        formularioPesquisa.addEventListener('submit', manipularPesquisaClima);
        
        // Marcar a app como inicializada
        formularioPesquisa.dataset.inicializada = 'verdadeiro';
    }
}

/**
 * Função para manipular a pesquisa de clima
 * @param {Event} evento - Evento do formulário
 * 
 * Descrição: Esta função é chamada quando o utilizador submete
 * o formulário de pesquisa. Ela:
 * 1. Previne o comportamento padrão do formulário
 * 2. Obtém o nome da cidade digitado
 * 3. Valida a entrada
 * 4. Faz uma requisição à API do clima
 * 5. Processa os dados recebidos
 * 6. Atualiza a interface com as informações
 */
async function manipularPesquisaClima(evento) {
    // Prevenir o comportamento padrão do formulário
    evento.preventDefault();

    // Obter o valor do campo de entrada de nome da cidade
    const nomeCidade = document.querySelector('#nome-cidade').value;

    // Esconder a descrição das funções ao pesquisar
    document.querySelector('#descricao-funcoes').style.display = 'none';

    // Validar se o campo de entrada não está vazio
    if (!nomeCidade) {
        // Remover a classe ativa da seção do clima
        document.querySelector('#secao-clima').classList.remove('ativa');
        
        // Mostrar mensagem de erro
        exibirAlerta('Você precisa digitar o nome de uma cidade...');
        return;
    }

    try {
        // Construir a URL da API com os parâmetros necessários
        const urlRequisicao = `${urlBaseApiClima}?q=${encodeURI(nomeCidade)}&appid=${chaveApiClima}&units=metric&lang=pt_br`;
        
        // Fazer a requisição à API do clima
        const respostaClima = await fetch(urlRequisicao);
        
        // Converter a resposta para JSON
        const dadosClima = await respostaClima.json();

        // Verificar se a requisição foi bem-sucedida (código 200)
        if (dadosClima.cod === 200) {
            // Limpar a área de alerta quando a pesquisa é bem-sucedida
            document.querySelector('#area-alerta').innerHTML = '';
            
            // Exibir as informações do clima
            exibirInformacoesClima({
                cidade: dadosClima.name,
                pais: dadosClima.sys.country,
                temperatura: dadosClima.main.temp,
                temperaturaMaxima: dadosClima.main.temp_max,
                temperaturaMinima: dadosClima.main.temp_min,
                descricao: dadosClima.weather[0].description,
                iconeClima: dadosClima.weather[0].icon,
                velocidadeVento: dadosClima.wind.speed,
                umidade: dadosClima.main.humidity,
            });

            // Obter as coordenadas geográficas para a API de qualidade do ar
            const latitude = dadosClima.coord.lat;
            const longitude = dadosClima.coord.lon;
            
            // Construir a URL da API de qualidade do ar
            const urlQualidadeAr = `${urlBaseApiQualidadeAr}?lat=${latitude}&lon=${longitude}&appid=${chaveApiClima}`;

            // Fazer a requisição à API de qualidade do ar
            const respostaQualidadeAr = await fetch(urlQualidadeAr);
            
            // Converter a resposta para JSON
            const dadosQualidadeAr = await respostaQualidadeAr.json();

            // Verificar se existem dados de qualidade do ar
            if (dadosQualidadeAr.list && dadosQualidadeAr.list.length > 0) {
                // Obter o índice de qualidade do ar (escala de 1 a 5)
                const indiceQualidadeAr = dadosQualidadeAr.list[0].main.aqi;
                
                // Obter a descrição textual do índice
                const descricaoQualidadeAr = obterDescricaoQualidadeAr(indiceQualidadeAr);
                
                // Exibir a qualidade do ar
                exibirQualidadeAr(indiceQualidadeAr, descricaoQualidadeAr);

                // Exibir dados sobre poluição do ar
                exibirPoluicaoAr(dadosQualidadeAr.list[0].components);
            } else {
                // Esconder a qualidade do ar se não disponível
                esconderQualidadeAr();
                
                // Esconder a poluição do ar se não disponível
                esconderPoluicaoAr();
            }
        } else {
            // Remover a classe ativa da seção do clima
            document.querySelector('#secao-clima').classList.remove('ativa');
            
            // Mostrar mensagem de erro
            exibirAlerta(`
                Não foi possível localizar a cidade...
                <br><br>Verifique o nome e tente novamente.
            `);
        }
    } catch (erro) {
        // Registrar o erro na consola
        console.error('Erro ao buscar dados do clima:', erro);
        
        // Mostrar mensagem de erro ao utilizador
        exibirAlerta('Erro ao buscar dados do clima. Tente novamente mais tarde.');
    }
}

// ============================================
// FUNÇÕES DE QUALIDADE DO AR
// ============================================

/**
 * Função para exibir a qualidade do ar
 * @param {number} indiceQualidadeAr - Índice de qualidade do ar (1-5)
 * @param {string} descricao - Descrição textual da qualidade
 * 
 * Descrição: Esta função mostra o cartão de qualidade do ar
 * e atualiza os valores com as informações recebidas
 */
function exibirQualidadeAr(indiceQualidadeAr, descricao) {
    // Obter o elemento do cartão de qualidade do ar
    const cartaoQualidadeAr = document.querySelector('#cartao-qualidade-ar');
    
    // Mostrar o cartão
    cartaoQualidadeAr.style.display = 'flex';
    
    // Atualizar o valor do índice
    document.querySelector('#valor-qualidade-ar').innerText = indiceQualidadeAr;
    
    // Atualizar a descrição
    document.querySelector('#descricao-qualidade-ar').innerText = descricao;
}

/**
 * Função para esconder a qualidade do ar
 * 
 * Descrição: Esta função esconde o cartão de qualidade do ar
 * quando os dados não estão disponíveis
 */
function esconderQualidadeAr() {
    // Obter o elemento do cartão de qualidade do ar
    const cartaoQualidadeAr = document.querySelector('#cartao-qualidade-ar');
    
    // Esconder o cartão
    cartaoQualidadeAr.style.display = 'none';
}

/**
 * Função para obter a descrição da qualidade do ar
 * @param {number} indiceQualidadeAr - Índice de qualidade do ar (1-5)
 * @returns {string} Descrição textual do índice
 * 
 * Descrição: Esta função converte o índice numérico de qualidade
 * do ar em uma descrição textual compreensível para o utilizador
 * 
 * Escala:
 * 1 = Boa
 * 2 = Moderada
 * 3 = Má
 * 4 = Muito Má
 * 5 = Péssima
 */
function obterDescricaoQualidadeAr(indiceQualidadeAr) {
    // Usar um switch para converter o índice em descrição
    switch (indiceQualidadeAr) {
        case 1:
            return 'Boa';
        case 2:
            return 'Moderada';
        case 3:
            return 'Má';
        case 4:
            return 'Muito Má';
        case 5:
            return 'Péssima';
        default:
            return 'Desconhecida';
    }
}

// ============================================
// FUNÇÕES DE POLUIÇÃO DO AR
// ============================================

/**
 * Função para exibir a poluição do ar
 * @param {object} componentesPoluentes - Objeto com os componentes poluentes
 * 
 * Descrição: Esta função calcula um índice de poluição geral
 * baseado em vários componentes (PM2.5, PM10, NO2, O3) e
 * exibe o resultado na interface
 * 
 * Componentes considerados:
 * - PM2.5: Partículas finas
 * - PM10: Partículas grosseiras
 * - NO2: Dióxido de nitrogénio
 * - O3: Ozono
 */
function exibirPoluicaoAr(componentesPoluentes) {
    // Obter o elemento do cartão de poluição
    const cartaoPoluicao = document.querySelector('#cartao-poluicao');
    
    // Mostrar o cartão
    cartaoPoluicao.style.display = 'flex';

    // Obter os valores dos componentes poluentes (ou 0 se não disponível)
    const pm25 = componentesPoluentes.pm2_5 ? componentesPoluentes.pm2_5 : 0;
    const pm10 = componentesPoluentes.pm10 ? componentesPoluentes.pm10 : 0;
    const no2 = componentesPoluentes.no2 ? componentesPoluentes.no2 : 0;
    const o3 = componentesPoluentes.o3 ? componentesPoluentes.o3 : 0;

    // Calcular o índice de poluição geral (média simples dos componentes)
    const indicePoluicao = (pm25 + pm10 + no2 + o3) / 4;
    
    // Arredondar para 2 casas decimais
    const percentualPoluicao = indicePoluicao.toFixed(2);

    // Atualizar o valor da poluição na interface
    document.querySelector('#valor-poluicao').innerText = `${percentualPoluicao}%`;
}

/**
 * Função para esconder a poluição do ar
 * 
 * Descrição: Esta função esconde o cartão de poluição do ar
 * quando os dados não estão disponíveis
 */
function esconderPoluicaoAr() {
    // Obter o elemento do cartão de poluição
    const cartaoPoluicao = document.querySelector('#cartao-poluicao');
    
    // Esconder o cartão
    cartaoPoluicao.style.display = 'none';
}

// ============================================
// FUNÇÕES DE EXIBIÇÃO DE INFORMAÇÕES
// ============================================

/**
 * Função para exibir as informações do clima
 * @param {object} dadosClima - Objeto com os dados do clima
 * 
 * Descrição: Esta função atualiza todos os elementos da interface
 * com as informações recebidas da API do clima. Ela:
 * 1. Mostra a seção do clima
 * 2. Atualiza o título com a cidade e país
 * 3. Atualiza a temperatura atual
 * 4. Atualiza a descrição do clima
 * 5. Atualiza o ícone do clima
 * 6. Atualiza as temperaturas máxima e mínima
 * 7. Atualiza a umidade
 * 8. Atualiza a velocidade do vento
 */
function exibirInformacoesClima(dadosClima) {
    // Mostrar a seção do clima
    document.querySelector('#secao-clima').classList.add('ativa');
    
    // Atualizar o título com a cidade e país
    document.querySelector('#titulo-localizacao').innerHTML = 
        `${dadosClima.cidade}, ${dadosClima.pais}`;
    
    // Atualizar a temperatura atual (com formatação de vírgula decimal)
    document.querySelector('#valor-temperatura').innerHTML = 
        `${dadosClima.temperatura.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    
    // Atualizar a descrição do clima
    document.querySelector('#descricao-temperatura').innerHTML = 
        `${dadosClima.descricao}`;
    
    // Atualizar o ícone do clima usando a URL da API
    document.querySelector('#imagem-temperatura').setAttribute('src', 
        `https://openweathermap.org/img/wn/${dadosClima.iconeClima}.png`);
    
    // Atualizar a temperatura máxima (com formatação de vírgula decimal)
    document.querySelector('#valor-temp-max').innerHTML = 
        `${dadosClima.temperaturaMaxima.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    
    // Atualizar a temperatura mínima (com formatação de vírgula decimal)
    document.querySelector('#valor-temp-min').innerHTML = 
        `${dadosClima.temperaturaMinima.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    
    // Atualizar a umidade
    document.querySelector('#valor-umidade').innerHTML = 
        `${dadosClima.umidade}%`;
    
    // Atualizar a velocidade do vento
    document.querySelector('#valor-vento').innerHTML = 
        `${dadosClima.velocidadeVento.toFixed(1)} km/h`;
}

/**
 * Função para exibir alertas e mensagens
 * @param {string} mensagem - Mensagem a exibir
 * 
 * Descrição: Esta função exibe mensagens de erro ou alerta
 * na área designada da interface
 */
function exibirAlerta(mensagem) {
    // Obter o elemento da área de alerta
    const areaAlerta = document.querySelector('#area-alerta');
    
    // Atualizar o conteúdo HTML com a mensagem
    areaAlerta.innerHTML = mensagem;
}

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Função para inicializar a aplicação quando o DOM está carregado
 * 
 * Descrição: Esta função é executada quando a página HTML
 * está completamente carregada. Ela:
 * 1. Configura os listeners para as ligações de navegação
 * 2. Configura o listener para mudanças de hash na URL
 * 3. Inicializa a aplicação com a página inicial
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obter todas as ligações de navegação
    const ligacoesNavegacao = document.querySelectorAll('.ligacao-navegacao');
    
    // Adicionar listener para cada ligação de navegação
    ligacoesNavegacao.forEach(ligacao => {
        ligacao.addEventListener('click', function(evento) {
            // Prevenir o comportamento padrão da ligação
            evento.preventDefault();
            
            // Obter o ID da página a navegar
            const idPagina = ligacao.getAttribute('dados-pagina');
            
            // Navegar para a página
            navegarPara(idPagina);
        });
    });

    // Configurar listener para mudanças de hash na URL
    window.addEventListener('hashchange', function() {
        // Obter o hash da URL (ou 'inicio' se vazio)
        const hash = window.location.hash.slice(1) || 'inicio';
        
        // Navegar para a página correspondente ao hash
        navegarPara(hash);
    });

    // Inicializar a aplicação com a página inicial
    navegarPara('inicio');
    
    // Registrar na consola que a aplicação foi carregada com sucesso
    console.log('PlataformaClima - Aplicação educativa sobre alterações climáticas carregada com sucesso! 🌍');
});

// ============================================
// FIM DO FICHEIRO JAVASCRIPT
// ============================================

// ============================================
// LÓGICA DO MENU HAMBURGER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const botaoHamburger = document.getElementById('botao-hamburger');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const ligacoesNavegacao = document.querySelectorAll('.ligacao-navegacao');

    // Função para alternar o menu
    const alternarMenu = () => {
        menuNavegacao.classList.toggle('aberto');
        botaoHamburger.classList.toggle('aberto');
    };

    // Evento de clique no botão hamburger
    botaoHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        alternarMenu();
    });

    // Fechar menu ao clicar num link
    ligacoesNavegacao.forEach(link => {
        link.addEventListener('click', () => {
            if (menuNavegacao.classList.contains('aberto')) {
                alternarMenu();
            }
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (menuNavegacao.classList.contains('aberto') && 
            !menuNavegacao.contains(e.target) && 
            !botaoHamburger.contains(e.target)) {
            alternarMenu();
        }
    });
});
