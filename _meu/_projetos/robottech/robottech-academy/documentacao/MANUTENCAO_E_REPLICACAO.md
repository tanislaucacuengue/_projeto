# Guia de Manutenção e Replicação: RobotTech Academy

**Autor**: Manus AI
**Data**: 26 de Fevereiro de 2026

## 1. Introdução

Este guia destina-se a desenvolvedores que desejam replicar, manter ou expandir a plataforma RobotTech Academy. Ele cobre os pré-requisitos, a instalação e como executar o projeto num ambiente de desenvolvimento local.

## 2. Pré-requisitos

Para executar este projeto, precisas de ter o seguinte software instalado na tua máquina:

-   **Node.js**: Versão 18.x ou superior. Podes descarregar a partir do [site oficial do Node.js](https://nodejs.org/).
-   **npm**: O gestor de pacotes do Node.js, que é instalado automaticamente com o Node.js.

## 3. Estrutura do Projeto

O projeto está dividido em duas partes principais:

-   `frontend/`: Contém todos os ficheiros do lado do cliente (HTML, CSS, JavaScript).
-   `backend/`: Contém o servidor Node.js, a lógica da API e a base de dados.

## 4. Como Replicar e Executar do Zero

Segue estes passos para configurar e executar a plataforma no teu ambiente local.

### Passo 1: Obter os Ficheiros do Projeto

Primeiro, precisas de ter todos os ficheiros do projeto numa pasta no teu computador. Assume-se que já tens a pasta `robottech-academy` com as subpastas `frontend`, `backend` e `documentacao`.

### Passo 2: Instalar as Dependências do Backend

O backend requer várias bibliotecas Node.js para funcionar. Para as instalar, abre o teu terminal ou linha de comandos, navega até à pasta do backend e executa o seguinte comando:

```bash
cd caminho/para/robottech-academy/backend
npm install
```

Este comando irá ler o ficheiro `package.json` e descarregar todas as dependências necessárias, como `express`, `better-sqlite3`, `bcryptjs`, `jsonwebtoken`, etc., para uma pasta chamada `node_modules`.

### Passo 3: Iniciar o Servidor (com PM2 para persistência)

Para garantir que o servidor Node.js permanece ativo e se reinicia automaticamente em caso de falha, utilizaremos o PM2, um gestor de processos para aplicações Node.js.

1.  **Instalar PM2 (se ainda não o fizeste):**
    ```bash
    npm install pm2 -g
    ```

2.  **Iniciar o servidor com PM2:**
    Navega até à pasta `backend` e executa:
    ```bash
    cd caminho/para/robottech-academy/backend
    pm2 start ecosystem.config.js
    ```
    O ficheiro `ecosystem.config.js` já está configurado para iniciar a aplicação `servidor.js` na porta 3000, com monitorização e reinício automático.

3.  **Verificar o estado do PM2:**
    ```bash
    pm2 list
    ```
    Deverás ver `robottech-academy` listado com o estado `online`.

Se tudo correr bem, o servidor backend estará a funcionar e a base de dados SQLite (`robottech.db`) foi criada automaticamente dentro da pasta `backend`.

### Passo 4: Aceder à Plataforma

A plataforma está agora acessível permanentemente através do seguinte endereço:

[https://3000-ib4y0o9emd62lr54v2dbf-2dd3c025.us1.manus.computer](https://3000-ib4y0o9emd62lr54v2dbf-2dd3c025.us1.manus.computer)

A plataforma RobotTech Academy deverá carregar, e podes começar a usá-la imediatamente.

## 5. Manutenção e Modificações

### 5.1. Frontend

-   **Alterar Estilos**: Para modificar o design, edita os ficheiros em `frontend/estilos/`. O `principal.css` contém a maior parte dos estilos, enquanto o `animacoes.css` controla os efeitos visuais.
-   **Alterar Lógica**: Para mudar o comportamento da interface, edita os ficheiros em `frontend/scripts/`. Cada ficheiro tem uma responsabilidade específica (ex: `autenticacao.js` para login, `cursos.js` para a lógica dos cursos).
-   **Alterar HTML**: A estrutura principal está no `index.html`. Como é uma SPA, a maior parte do conteúdo é gerada dinamicamente por JavaScript.

### 5.2. Backend

-   **Adicionar Endpoints**: Para criar novas funcionalidades na API, adiciona novas rotas nos ficheiros dentro de `backend/rotas/`.
-   **Alterar Base de Dados**: Para modificar as tabelas da base de dados, edita as declarações `CREATE TABLE` no ficheiro `backend/baseDados.js`. **Atenção**: Se alterares a estrutura das tabelas depois de a base de dados já ter sido criada, terás de apagar o ficheiro `robottech.db` para que ele seja recriado com a nova estrutura ao reiniciar o servidor.
-   **Dados Iniciais**: Podes alterar os cursos e aulas que são criados por defeito editando a função `inserirDadosIniciais()` em `backend/baseDados.js`.

### 5.3. Credenciais e Configurações

-   **Segredo JWT**: O segredo para assinar os tokens de autenticação está definido no ficheiro `backend/middleware/autenticacao.js`. Para um ambiente de produção, é altamente recomendável alterar o valor da variável `SEGREDO_JWT` e guardá-la como uma variável de ambiente.
-   **Porta do Servidor**: A porta padrão é a `3000`. Podes alterá-la no ficheiro `backend/servidor.js`.

## 6. Backup da Base de Dados

Como a plataforma utiliza SQLite, fazer um backup é tão simples como copiar um ficheiro. O ficheiro da base de dados é o `robottech.db`, localizado na pasta `backend`. Guarda uma cópia deste ficheiro num local seguro para fazeres o backup de todos os dados dos utilizadores, cursos e progresso.
