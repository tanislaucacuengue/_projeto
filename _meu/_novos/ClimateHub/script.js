/* 
   ClimateHub - JavaScript Principal
   Contém a lógica de navegação e app do clima
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

    // Inicializar app do clima quando necessário
    if (pageId === 'weather') {
        initWeatherApp();
    }
}

// 
// WEATHER APP - API OPENWEATHERMAP
// 

// Inicializar a app do clima
function initWeatherApp() {
    const form = document.querySelector('#pesquisa');
    if (form && !form.dataset.initialized) {
        form.addEventListener('submit', handleWeatherSearch);
        form.dataset.initialized = 'true';
    }
}

// Lidar com busca de clima
async function handleWeatherSearch(event) {
    event.preventDefault();

    const cityNome = document.querySelector('#city_nome').value;

    if (!cityNome) {
        document.querySelector('#clima').classList.remove('show');
        showAlert('Você precisa digitar o nome de uma cidade...');
        return;
    }

    try {
        // Chamar API do clima com o nome de uma cidade
        const chaveapi = 'af2e03141a2bbb2479f844146cea13ef';
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityNome)}&appid=${chaveapi}&units=metric&lang=pt_br`;
        const resultado = await fetch(apiurl);
        const json = await resultado.json();

        if (json.cod === 200) {
            showinfo({
                cidade: json.name,
                pais: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                descricao: json.weather[0].description,
                tempIcone: json.weather[0].icon,
                vento: json.wind.speed,
                umidade: json.main.humidity,
            });

            // Chamar API de qualidade do ar com lat/lon
            const lat = json.coord.lat;
            const lon = json.coord.lon;
            const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${chaveapi}`;

            const arResultado = await fetch(airQualityUrl);
            const arJson = await arResultado.json();

            if (arJson.list && arJson.list.length > 0) {
                const aqi = arJson.list[0].main.aqi;
                const descricaoAQI = getDescricaoAQI(aqi);
                mostrarQualidadeAr(aqi, descricaoAQI);

                // Exibir dados sobre poluentes
                mostrarPoluicao(arJson.list[0].components);
            } else {
                esconderQualidadeAr();
                esconderPoluicao();
            }
        } else {
            document.querySelector('#clima').classList.remove('show');
            showAlert(`
                Não foi possível localizar a cidade...
                <br><br>Verifique o nome e tente novamente.
            `);
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
        showAlert('Erro ao buscar dados do clima. Tente novamente mais tarde.');
    }
}

// Mostrar qualidade do ar
function mostrarQualidadeAr(aqi, descricao) {
    const divAr = document.querySelector('#qualidade_ar_info');
    divAr.style.display = 'flex';
    document.querySelector('#qualidade_ar').innerText = aqi;
    document.querySelector('#qualidade_ar_descricao').innerText = descricao;
}

// Esconder qualidade do ar
function esconderQualidadeAr() {
    document.querySelector('#qualidade_ar_info').style.display = 'none';
}

// Obter descrição do AQI (Air Quality Index)
function getDescricaoAQI(aqi) {
    switch (aqi) {
        case 1: return 'Boa';
        case 2: return 'Moderada';
        case 3: return 'Má';
        case 4: return 'Muito Má';
        case 5: return 'Péssima';
        default: return 'Desconhecida';
    }
}

// Mostrar poluição do ar
function mostrarPoluicao(components) {
    const divPoluicao = document.querySelector('#poluicao_info');
    divPoluicao.style.display = 'flex';

    const pm25 = components.pm2_5 ? components.pm2_5 : 0;
    const pm10 = components.pm10 ? components.pm10 : 0;
    const no2 = components.no2 ? components.no2 : 0;
    const o3 = components.o3 ? components.o3 : 0;

    // Calculando o índice de poluição geral (simples média)
    const poluicaoIndex = (pm25 + pm10 + no2 + o3) / 4;
    const poluicaoPercent = poluicaoIndex.toFixed(2);

    // Exibindo os dados
    document.querySelector('#poluicao_percent').innerText = `${poluicaoPercent}%`;
}

// Esconder poluição do ar
function esconderPoluicao() {
    document.querySelector('#poluicao_info').style.display = 'none';
}

// Mostrar informações do clima
function showinfo(json) {
    document.querySelector('#clima').classList.add('show');
    document.querySelector('#titulo').innerHTML = `${json.cidade}, ${json.pais}`;
    document.querySelector('#temp_valor').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#temp_descricao').innerHTML = `${json.descricao}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcone}.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#umid').innerHTML = `${json.umidade}%`;
    document.querySelector('#vento').innerHTML = `${json.vento.toFixed(1)} km/h`;
}

// Mostrar alerta
function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

// 
// INICIALIZAÇÃO
// 

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navigateTo(pageId);
        });
    });

    // Navegação por hash
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'home';
        navigateTo(hash);
    });

    // Inicializar com página home
    navigateTo('home');
});

console.log('ClimateHub - Plataforma Educativa sobre Alterações Climáticas carregada com sucesso! 🌍');
