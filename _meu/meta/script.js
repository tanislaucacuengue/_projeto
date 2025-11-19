
// Selecionar os elementos do formulário
const formEstadio = document.getElementById('form-estadio');
const formJogo = document.getElementById('form-jogo');
const formTime = document.getElementById('form-time');
const formJogador = document.getElementById('form-jogador');

// Selecionar as tabelas
const tabelaEstadio = document.getElementById('tabela-estadio');
const tabelaJogo = document.getElementById('tabela-jogo');
const tabelaTime = document.getElementById('tabela-time');
const tabelaJogador = document.getElementById('tabela-jogador');

// Função para cadastrar estádio
formEstadio.addEventListener('submit', (e) => {
    e.preventDefault();
    const nomeEstadio = document.getElementById('nome-estadio').value;
    const enderecoEstadio = document.getElementById('endereco-estadio').value;
    const estadio = { nome: nomeEstadio, endereco: enderecoEstadio };
    // Enviar o estádio para o servidor (API)
    // ...
    // Adicionar o estádio à tabela
    const row = tabelaEstadio.insertRow();
    row.innerHTML = `
        <td>${nomeEstadio}</td>
        <td>${enderecoEstadio}</td>
    `;
});

// Função para cadastrar jogo
formJogo.addEventListener('submit', (e) => {
    e.preventDefault();
    const nomeJogo = document.getElementById('nome-jogo').value;
    const dataJogo = document.getElementById('data-jogo').value;
    const horaJogo = document.getElementById('hora-jogo').value;
    const jogo = { nome: nomeJogo, data: dataJogo, hora: horaJogo };
    // Enviar o jogo para o servidor (API)
    // ...
    // Adicionar o jogo à tabela
    const row = tabelaJogo.insertRow();
    row.innerHTML = `
        <td>${nomeJogo}</td>
        <td>${dataJogo}</td>
        <td>${horaJogo}</td>
    `;
});

// Função para cadastrar time
formTime.addEventListener('submit', (e) => {
    e.preventDefault();
    const nomeTime = document.getElementById('nome-time').value;
    const corTime = document.getElementById('cor-time').value;

    // Validação de dados
    if (!nomeTime || !corTime) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const time = { nome: nomeTime, cor: corTime };

    // Enviar o time para o servidor (API)
    fetch('/api/times', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(time)
    })
    .then(response => response.json())
    .then(data => {
        // Adicionar o time à tabela
        const row = tabelaTime.insertRow();
        row.innerHTML = `
            <td>${nomeTime}</td>
            <td>${corTime}</td>
        `;
        // Limpar os campos do formulário
        document.getElementById('nome-time').value = '';
        document.getElementById('cor-time').value = '';
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao cadastrar time.');
    });
});
