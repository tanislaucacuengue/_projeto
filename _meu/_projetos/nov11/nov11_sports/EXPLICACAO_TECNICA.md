# Guia de Explicação Técnica - Nov11 Sports

Este documento serve como base para a explicação do projeto ao professor, detalhando a estrutura, a lógica e as soluções aplicadas.

## 1. Estrutura do Projeto (HTML)
O projeto está organizado numa estrutura de **Página Única (Single Page Application - SPA)** simplificada:
- **`index.html`**: Contém todas as secções do site (`#inicio`, `#eventos`, `#admin`, etc.).
- **Navegação Dinâmica**: As secções são alternadas através da classe `.ativa`, controlada pelo JavaScript, evitando o carregamento de múltiplas páginas.
- **Componentes**: Uso de Modais para autenticação e detalhes de eventos, e Abas para o painel administrativo.

## 2. Estilização e Design (CSS)
O design utiliza **CSS Moderno** com variáveis (`:root`) para facilitar a manutenção de cores e temas.
- **Responsividade**: Uso intensivo de **Flexbox** e **CSS Grid**.
- **Media Queries**: Ajustes específicos para dispositivos móveis (`@media (max-width: 768px)`), garantindo que formulários e botões se adaptem ao ecrã.
- **Correções Aplicadas**: 
    - Centralização de badges de notificação usando `display: flex; align-items: center; justify-content: center;`.
    - Ajuste de `z-index` e posicionamento fixo para o botão "Voltar ao Topo" não interferir com a UI.

## 3. Lógica e Funcionalidade (JavaScript)
O "cérebro" do sistema está no `aplicacao.js`:
- **Estado Global (`estadoApp`)**: Um objeto que centraliza todos os dados (utilizador logado, eventos carregados, bilhetes).
- **Persistência de Dados (`localStorage`)**: 
    - Os dados são guardados no navegador do utilizador.
    - **Solução para Novos PCs**: Implementámos uma lógica que verifica se existem dados no `localStorage`. Se estiver vazio (como num PC novo), o sistema carrega os dados iniciais do `dados.json` e guarda-os, garantindo que o stock nunca apareça como esgotado indevidamente.
- **Módulo de Manutenção**: Criado para permitir ao administrador registar atividades físicas no estádio, guardando o tipo, descrição e data.

## 4. Como Explicar as Correções de Erros
Se o professor perguntar sobre os erros de interface:
- **Erro do Chat**: "O problema era o `flex-direction` que estava a forçar os elementos verticalmente no mobile. Corrigi para `row` e dei `flex: 1` ao campo de texto."
- **Erro das Notificações**: "Os números estavam desalinhados porque o `line-height` e o `padding` não eram suficientes. Usei `flexbox` para forçar a centralização absoluta."
- **Erro do Stock**: "Como o `localStorage` é local por navegador, os dados não passavam de um PC para outro. Adicionei uma função de inicialização que deteta o primeiro acesso e carrega o stock padrão."

---
*Este projeto demonstra competências em desenvolvimento Front-end, manipulação de DOM, gestão de estado e design responsivo.*
