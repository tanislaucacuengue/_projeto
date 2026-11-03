# GameHub — Jogos educativos no navegador

## Finalidade

O **GameHub** reúne cinco jogos num único projecto web estático: Quiz, Cobra, Memória, Flappy e 2048. Foi desenvolvido com HTML5, CSS3 e JavaScript, sem servidor de aplicação ou conta de utilizador.

## Funcionalidades observadas no código

- **Quiz:** dois níveis com quatro perguntas cada, pontuação e resultado final.
- **Cobra:** movimento pelo teclado e por controlos móveis, pausa, velocidade ajustável e recorde local.
- **Memória:** 16 cartas (oito pares), contador de tentativas e feedback visual. **Não existe temporizador implementado.** As cartas são controláveis por teclado.
- **Flappy:** jogo em canvas, salto por clique/toque ou barra de espaço, pontuação e recorde local.
- **2048:** tabuleiro 4 × 4, movimentos pelas teclas de setas ou controlos móveis, pontuação, recorde local e botão «Novo Jogo».

A navegação entre jogos é feita na própria página. Os controlos móveis usam botões direccionais. Os recordes são guardados no `localStorage` do navegador; não são sincronizados entre dispositivos.

## Tecnologias e recursos externos

- HTML5, CSS3 e JavaScript sem framework.
- Canvas 2D nos jogos Cobra e Flappy.
- `localStorage` para os recordes.
- Font Awesome 6.5.1 e Google Fonts (Poppins), carregados por CDN. É necessária ligação à Internet para carregar estes recursos visuais; a aplicação não deve ser descrita como totalmente independente da rede.

## Estrutura

- `index.html` — páginas, navegação e controlos.
- `style.css` — apresentação e regras responsivas.
- `script.js` — lógica dos jogos.
- `README.md` e os documentos Markdown desta pasta — orientação e referência do projecto.

## Execução local

A partir desta pasta, pode servir os ficheiros com Python 3:

```bash
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. Também é possível abrir `index.html` directamente, embora um servidor local tenda a oferecer um contexto mais consistente para desenvolvimento.

## Limitações conhecidas

- O 2048 ainda não detecta automaticamente o fim de jogo nem apresenta uma mensagem de derrota quando já não há movimentos.
- A Memória não mede o tempo; o resultado é acompanhado pelo número de tentativas.
- Os recordes dependem do armazenamento local do navegador e podem ser apagados pelo utilizador.
- Não foi identificado manifesto de dependências, processo de build ou suite de testes nesta pasta.
- A compatibilidade em navegadores/dispositivos específicos e a publicação em produção não foram confirmadas nesta revisão.

## Autor e percurso de desenvolvimento

**Desenvolvedor:** Benjamim Tanislau José Cacuengue.

Este projecto faz parte do meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada trabalho representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e crescer como desenvolvedor.