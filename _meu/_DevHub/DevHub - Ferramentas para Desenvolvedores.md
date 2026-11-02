# DevHub — Ferramentas para Desenvolvedores

Aplicação web estática com ferramentas práticas para apoiar o desenvolvimento front-end. O projecto reúne uma calculadora, um gerador de cores RGB, um configurador visual de `border-radius` e um painel de filtros CSS para imagens.

## Objectivo

Reunir, numa única interface, pequenos utilitários que permitem experimentar valores, visualizar alterações e copiar declarações CSS sem instalar uma aplicação ou depender de um serviço de processamento remoto.

## Funcionalidades

### Calculadora

- Operações de adição, subtracção, multiplicação e divisão.
- Botões para limpar e apagar o último carácter.
- Atalhos de teclado para números, operadores, cálculo (`Enter` ou `=`), apagar (`Backspace`) e limpar (`Escape`).
- Avaliação aritmética restrita a números decimais e aos operadores suportados, sem executar código JavaScript arbitrário.

### Gerador de cores RGB

- Controlos deslizantes independentes para vermelho, verde e azul, entre 0 e 255.
- Pré-visualização da cor e saída em formato `rgb(r, g, b)`.

### Gerador de `border-radius`

- Ajuste independente dos quatro cantos.
- Pré-visualização e saída de uma declaração CSS.

### Filtros de imagem

- Controlos para escala de cinza, sépia, desfoque, inversão, opacidade, brilho, contraste e saturação.
- Pré-visualização aplicada à imagem local `background001.jpg` e saída CSS correspondente.

Os resultados podem ser copiados quando a API de área de transferência estiver disponível. Em contextos não seguros ou sem permissão, o resultado é seleccionado para cópia manual.

## Tecnologias e ficheiros

- `index.html` — estrutura e controlos da interface.
- `style.css` — apresentação, animações e regras responsivas.
- `script.js` — navegação, cálculo, pré-visualizações, atalhos e cópia.
- `background001.jpg` — imagem local usada no painel de filtros.
- `README.md`, `SUMMARY.md` e este documento — documentação do projecto.

A interface é construída com HTML, CSS e JavaScript vanilla. Os ícones usam Font Awesome 6.5.1 através de uma folha de estilos servida por CDN; por isso, os ícones podem não aparecer sem ligação à Internet. Não foi identificado um manifesto de dependências ou um processo de build nesta pasta.

## Navegação e acessibilidade

Os cartões da página inicial são ligações de navegação por teclado. Os controlos deslizantes têm rótulos associados, o menu mobile expõe o seu estado e pode ser fechado com `Escape`, e os elementos interactivos têm indicação de foco visível. Estas melhorias não equivalem a uma certificação de conformidade; a validação com leitores de ecrã e em diferentes navegadores continua por fazer.

## Como executar

A partir desta pasta, pode servir os ficheiros com Python 3:

```bash
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. A aplicação necessita de JavaScript activo. O contexto `localhost` também permite utilizar a API de área de transferência nos navegadores que a suportam.

## Limites conhecidos

- Não foi encontrada uma suite de testes automatizada nesta pasta.
- As regras CSS incluem pontos de adaptação para ecrãs menores, mas a apresentação não foi validada visualmente em vários dispositivos nesta revisão.
- Os ícones dependem do CDN indicado acima; as ferramentas principais são executadas localmente no navegador.
- Não foi identificado um ficheiro de licença. Consulte o autor antes de reutilizar ou redistribuir o projecto.

## Autor e percurso de desenvolvimento

**Desenvolvido por Benjamim Tanislau José Cacuengue.**

Este projecto integra o meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada exercício representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e evoluir como desenvolvedor.

**Última revisão documental:** 2 de Novembro de 2026.
