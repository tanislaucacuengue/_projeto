document.querySelector('#pesquisa').addEventListener('submit', async (event) => {
    event.preventDefault();

        const cityNome = document.querySelector('#city_nome').value.trim();
    const descricaoDiv = document.querySelector('#descricao');
    const climaDiv = document.querySelector('#clima');
    const alertDiv = document.querySelector('#alert');

     // Esconde a descrição ao pesquisar
    document.querySelector('#descricao').style.display = 'none';

     // Limpa alertas anteriores
    alertDiv.innerHTML = '';

    if (!cityNome) {
        climaDiv.classList.remove('show');
        showAlert('Você precisa digitar o nome de uma cidade...');
        return;
    }

    

     // Chamar API do clima com o nome de uma cidade
    const chaveapi = `af2e03141a2bbb2479f844146cea13ef`;
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityNome)}&appid=${chaveapi}&units=metric&lang=pt_br`;
    const resultado = await fetch(apiurl);
    const json = await resultado.json();


    try {
        const resultado = await fetch(apiurl);
        const json = await resultado.json();


    if (json.cod === 200) {
         // Remove mensagem de erro (caso exista)
            alertDiv.innerHTML = '';
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
            const aqi = arJson.list[0].main.aqi; // índice de qualidade do ar (1 a 5)
            const descricaoAQI = getDescricaoAQI(aqi);
            mostrarQualidadeAr(aqi, descricaoAQI);

            // Exibir dados sobre poluentes
            mostrarPoluicao(arJson.list[0].components);
        } 

        
        else {
            esconderQualidadeAr();
            esconderPoluicao();
        } 

        // Lógica para exibir a descrição novamente após algum tempo, se necessário
         setTimeout(() => {
            document.querySelector('#descricao').style.display = 'block';
        }, 360000); // Exemplo: exibe após 3 segundos
    } 
    
    else {
            climaDiv.classList.remove('show');
            showAlert(`
                Não foi possível localizar...
                <img src="src/image/2.svg" alt="Imagem resultado não encontrado"/>
            `);
        }
    } catch (erro) {
        showAlert('Ocorreu um erro ao buscar os dados. Tenta novamente.');
    }
});

function mostrarQualidadeAr(aqi, descricao) {
    const divAr = document.querySelector('#qualidade_ar_info');
    divAr.style.display = 'flex';
    document.querySelector('#qualidade_ar').innerText = aqi;
    document.querySelector('#qualidade_ar_descricao').innerText = descricao;
}

function esconderQualidadeAr() {
    document.querySelector('#qualidade_ar_info').style.display = 'none';
}

// Função para retornar descrição textual da qualidade do ar  baseado no valor (1-5)
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

// Função para exibir dados sobre poluição
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

// Função para esconder os dados de poluição quando não disponível
function esconderPoluicao() {
    document.querySelector('#poluicao_info').style.display = 'none';
}

function showinfo(json) {
    document.querySelector('#clima').classList.add('show');
    document.querySelector('#titulo').innerHTML = `${json.cidade}, ${json.pais}`;
    document.querySelector('#temp_valor').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#temp_descricao').innerHTML = `${json.descricao}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcone}.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#umid').innerHTML = `${json.umidade}%`;
    document.querySelector('#vento').innerHTML = `${json.vento.toFixed(1)}km/h`;
}

function showAlert(msg) {
    const alertDiv = document.querySelector('#alert');
    alertDiv.innerHTML = msg;
}
