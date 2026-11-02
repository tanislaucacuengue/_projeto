# DevHub — Sumário do projecto

## Visão geral

O DevHub é uma aplicação web estática de ferramentas para desenvolvimento front-end. A interface inicial dá acesso a quatro utilitários: calculadora, gerador RGB, configurador de `border-radius` e filtros CSS para uma imagem de exemplo.

## Ficheiros principais

| Ficheiro | Responsabilidade |
|---|---|
| `index.html` | Estrutura das secções, navegação, controlos e saídas. |
| `style.css` | Estilos, estados interactivos, foco de teclado e adaptação a diferentes larguras de ecrã. |
| `script.js` | Navegação, cálculo aritmético, actualização das pré-visualizações, atalhos e cópia. |
| `background001.jpg` | Imagem local utilizada na ferramenta de filtros. |

A pasta também contém `README.md`, este sumário e `DevHub - Ferramentas para Desenvolvedores.md`. Os nomes acima correspondem aos ficheiros observados no projecto.

## Ferramentas

1. **Calculadora:** adição, subtracção, multiplicação e divisão, com decimais e suporte de teclado.
2. **Gerador RGB:** três controlos de 0 a 255, pré-visualização e saída CSS no formato RGB.
3. **Border-radius:** quatro valores independentes, pré-visualização e declaração CSS.
4. **Filtros de imagem:** escala de cinza, sépia, desfoque, inversão, opacidade, brilho, contraste e saturação.

A cópia automática depende da API de área de transferência do navegador e de um contexto seguro. Se não estiver disponível, o texto é seleccionado para cópia manual.

## Implementação e dependências

O projecto utiliza HTML, CSS e JavaScript vanilla, sem manifesto de pacotes ou etapa de compilação identificados nesta pasta. Font Awesome 6.5.1 é carregado através de um CDN externo, pelo que os ícones necessitam de acesso à Internet.

A aplicação tem regras CSS para ecrãs de diferentes larguras. A presença dessas regras não substitui testes visuais em dispositivos e navegadores reais.

## Acessibilidade e segurança

- Os controlos deslizantes têm rótulos associados e os cartões de ferramentas são ligações utilizáveis por teclado.
- O menu mobile comunica o estado aberto/fechado e responde à tecla `Escape`.
- A calculadora avalia apenas expressões aritméticas com os operadores disponibilizados; não utiliza execução de código JavaScript arbitrário.
- Os indicadores de foco são visíveis durante a navegação por teclado.

Estas medidas são melhorias implementadas, não uma certificação de acessibilidade. Não foi detectada uma suite de testes automatizada nesta pasta.

## Execução local

Na pasta `_meu/_DevHub`, execute:

```bash
python3 -m http.server 8000
```

Aceda a `http://localhost:8000`. O servidor serve os ficheiros estáticos e fornece um contexto local adequado à API de área de transferência nos navegadores compatíveis.

## Autoria

**Desenvolvido por Benjamim Tanislau José Cacuengue**, como parte do seu percurso de aprendizagem e desenvolvimento de competências.

**Revisão documental:** 2 de Novembro de 2026.
