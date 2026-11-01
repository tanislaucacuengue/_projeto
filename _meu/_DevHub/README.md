# DevHub

> **Pasta:** `_meu/_DevHub`

> **Categoria:** Aplicação web estática — conjunto de ferramentas para desenvolvimento

## Finalidade

O HTML e a documentação descrevem um hub de ferramentas no navegador com calculadora, gerador RGB, gerador visual de border-radius e controlos CSS de filtros de imagem. O JavaScript implementa navegação por secções, actualização de pré-visualizações, cópia para a área de transferência e atalhos de teclado da calculadora. Evidência consultada no branch padrão `principal`; esta auditoria não valida comportamento em execução.

## Tecnologias observadas

- HTML5
- CSS3
- JavaScript vanilla (sem framework declarado)
- Font Awesome 6.5.1 via stylesheet CDN externo
- API do navegador Clipboard (`navigator.clipboard`)
- Imagem local background001.jpg para a ferramenta de filtros

## Ficheiros de entrada

- [`index.html`](index.html)
- [`script.js`](script.js)
- [`style.css`](style.css)
- [`background001.jpg`](background001.jpg)

## Execução e testes

Os comandos/instruções seguintes foram encontrados na documentação ou no manifesto do projecto; **não foram executados nem validados** nesta revisão:

- Abrir index.html num navegador (opção documentada, não é comando de terminal)
- python3 -m http.server 8000
- npx http-server
- php -S localhost:8000

## Notas de funcionamento

A cópia para a área de transferência pode depender das permissões e do contexto seguro do navegador. Algumas referências documentais não coincidem com os nomes de ficheiro observados; consultar os ficheiros efectivamente existentes.

## Publicação

A publicação desta pasta não foi confirmada. A ausência de configuração Vercel versionada não permite concluir se existe ou não um deploy externo; verificar o projecto e o directório-base na plataforma antes de alterar qualquer configuração.

A revisão que originou este README foi estática: não foram executados código, testes, builds, instalação de dependências ou deploy.

## Documentação existente

- [`DevHub - Ferramentas para Desenvolvedores.md`](DevHub%20-%20Ferramentas%20para%20Desenvolvedores.md)
- [`SUMMARY.md`](SUMMARY.md)

## Autor e percurso de desenvolvimento

**Desenvolvedor:** Benjamim Tanislau José Cacuengue.

Este trabalho faz parte do meu percurso contínuo de aprendizagem e desenvolvimento de competências. Cada projecto representa uma oportunidade prática de consolidar conhecimentos, experimentar soluções e crescer como desenvolvedor.

Nos projectos colaborativos, esta identificação não substitui os créditos e as responsabilidades dos demais membros da equipa indicados neste README.
