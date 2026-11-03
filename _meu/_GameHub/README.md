# GameHub

> **Pasta:** `_meu/_GameHub`

> **Categoria:** Aplicação web estática de jogos educativos e entretenimento

## Finalidade

O código e a documentação descrevem um portal educativo com navegação entre páginas e cinco jogos no próprio navegador: quiz, cobra, memória, Flappy e 2048. Os recordes são mantidos no armazenamento local do navegador. Não há servidor de aplicação demonstrado nesta pasta.

## Tecnologias observadas

- HTML5
- CSS3
- JavaScript vanilla
- DOM do navegador
- Canvas 2D
- localStorage
- Font Awesome 6.5.1 via CDN (ícones)
- Google Fonts Poppins via CDN (tipografia)

## Ficheiros de entrada

- [`index.html`](index.html)
- [`script.js`](script.js)
- [`style.css`](style.css)

## Execução e testes

Os comandos/instruções seguintes foram encontrados na documentação ou no manifesto do projecto; **não foram executados nem validados** nesta revisão:

- start index.html (Windows; documentado, não testado)
- open index.html (macOS; documentado, não testado)
- xdg-open index.html (Linux; documentado, não testado)
- python3 -m http.server 8000 (documentado, não testado)
- npx http-server (documentado, não testado)
- php -S localhost:8000 (documentado, não testado)
- Extensão VS Code Live Server (instrução documentada, não testada)

## Notas de funcionamento

Os recordes são guardados no armazenamento local do navegador. O projecto não demonstra um servidor de aplicação nem sincronização entre dispositivos. A Memória acompanha as tentativas, mas não tem temporizador. O 2048 permite iniciar um novo jogo, porém ainda não detecta automaticamente o fim de jogo.

Os ícones Font Awesome e a fonte Poppins são carregados por CDN; é necessária ligação à Internet para obter esses recursos visuais. O menu de navegação e as cartas da Memória incluem controlos acessíveis por teclado.

## Publicação

A publicação desta pasta não foi confirmada. A ausência de configuração Vercel versionada não permite concluir se existe ou não um deploy externo; verificar o projecto e o directório-base na plataforma antes de alterar qualquer configuração.

A revisão incluiu verificações estáticas de sintaxe JavaScript, estrutura HTML e documentação, além de um smoke test local em Chromium. As chamadas de rede externas foram bloqueadas durante o teste; não foram instaladas dependências nem efectuados builds ou deploys.

## Documentação existente

- [`🎮 PlataformaJogos - Hub de Jogos Educativos.md`](%F0%9F%8E%AE%20PlataformaJogos%20-%20Hub%20de%20Jogos%20Educativos.md)
- [`📚 Glossário - PlataformaJogos.md`](%F0%9F%93%9A%20Gloss%C3%A1rio%20-%20PlataformaJogos.md)

## Autor e percurso de desenvolvimento

**Desenvolvedor:** Benjamim Tanislau José Cacuengue.

Este trabalho faz parte do meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada projecto representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e crescer como desenvolvedor.

Nos projectos colaborativos, esta identificação não substitui os créditos e as responsabilidades dos demais membros da equipa indicados neste README.
