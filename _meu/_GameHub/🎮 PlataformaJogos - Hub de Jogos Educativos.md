# 🎮 GameHub - Hub de Jogos Educativos

## Descrição

**GameHub** é uma plataforma web completa que integra vários jogos educativos e divertidos em uma única aplicação. Desenvolvida em **HTML5**, **CSS3** e **JavaScript vanilla**, sem dependências externas.



##  Objetivos

- **Educar** através de jogos interativos
- **Entreter** com desafios divertidos
- **Melhorar** reflexos, memória e concentração
- **Integrar** múltiplos jogos numa plataforma única
- **Facilitar** a navegação e experiência do utilizador

##  Jogos Inclusos

### 1. **Quiz - Teste seus Conhecimentos** 
- 2 níveis de dificuldade progressiva
- 4 perguntas por nível
- Perguntas sobre geografia, história e curiosidades
- Sistema de pontuação
- Feedback imediato

**Como Jogar:**
1. Clique em "Quiz" no menu
2. Leia a pergunta e escolha uma resposta
3. Clique em "Próximo" para a próxima pergunta
4. Ao final, veja sua pontuação total

### 2. **Cobra - Coma e Cresça** 
- Controles com setas do teclado
- **Botão de Pausa** com funcionalidades avançadas
- Começa em pausa (pressione uma seta para começar)
- Game Over ao bater nas paredes ou em si mesma
- Ajuste de velocidade com slider
- Sistema de recorde salvo localmente

**Como Jogar:**
1. Clique em "Cobra" no menu
2. Pressione uma seta do teclado para começar
3. Use as setas para mover a cobra
4. Coma a comida vermelha para crescer
5. Evite bater nas paredes e em si mesma
6. Use o botão de pausa para pausar/retomar
7. Ao sair da página, a cobra volta a pausar

**Funcionalidades do Botão de Pausa:**
-  Começa em pausa
-  Botão para pausar/retomar
-  Ao sair da página, volta a pausar automaticamente
-  Não interfere com o funcionamento da app

### 3. **Memória - Encontre os Pares** 
- 16 cartas (8 pares)
- Emojis como símbolos
- Contador de tentativas
- Timer automático
- Feedback visual de pares encontrados

**Como Jogar:**
1. Clique em "Memória" no menu
2. Clique em duas cartas para virar
3. Se forem iguais, ficam viradas
4. Se forem diferentes, viram de volta
5. Encontre todos os 8 pares
6. Veja quantas tentativas usou

### 4. **Flappy Bird - Voe Alto** 
- Controles simples (clique ou espaço)
- Canos com diferentes alturas
- Dificuldade progressiva
- Sistema de pontuação
- Recorde salvo localmente

**Como Jogar:**
1. Clique em "Flappy" no menu
2. Clique ou pressione espaço para fazer o pássaro pular
3. Evite os canos
4. Ganhe pontos ao passar pelos canos
5. Tente bater seu recorde

### 5. **2048 - Combine Números** 
- Tabuleiro 4x4
- Combine blocos com o mesmo número
- Objetivo: Alcançar 2048
- Cores diferentes para cada número
- Sistema de pontuação

**Como Jogar:**
1. Clique em "2048" no menu
2. Use as setas do teclado para mover os blocos
3. Blocos com o mesmo número se combinam
4. Tente alcançar o número 2048
5. Continue jogando além de 2048 se conseguir

##  Design e Cores

### Paleta de Cores

  Elemento          Cor              Código Hexadecimal 
 
  Azul Profundo     Primária         #1E40AF  
  Azul Claro        Primária Clara   #3B82F6  
  Verde             Secundária       #10B981  
  Laranja           Terciária        #F97316  
  Roxo              Acento           #8B5CF6  
  Branco            Fundo            #FFFFFF  
  Cinzento Escuro   Texto            #1F2937  

### Características de Design

 **Animações Suaves** - Transições elegantes entre páginas  
 **Hero Section Dinâmica** - Padrão animado de fundo  
 **Cards Interativos** - Efeitos hover com transformações  
 **Layout Responsivo** - Funciona em todos os dispositivos  
 **Acessibilidade** - Contraste adequado e navegação clara

##  Estrutura de Ficheiros

```
gameHub/
   index.html           # Página principal (HTML5)
   style.css            # Estilos e design (CSS3)
   script.js            # Lógica de todos os jogos (JavaScript)
   LEIA-ME.md           # Este ficheiro
   DOCUMENTACAO.md      # Documentação técnica detalhada
   GLOSSARIO.md         # Glossário de termos e variáveis
```

##  Como Usar

### Opção 1: Abrir Localmente

Basta abrir o ficheiro `index.html` num navegador web:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Opção 2: Usar um Servidor Local

#### Python 3
```bash
python3 -m http.server 8000
# Aceda a http://localhost:8000
```

#### Node.js
```bash
npx http-server
# Aceda a http://localhost:8080
```

#### PHP
```bash
php -S localhost:8000
# Aceda a http://localhost:8000
```

#### Live Server (VS Code)
- Instale a extensão "Live Server"
- Clique com botão direito em `indice.html`
- Selecione "Open with Live Server"

##  Compatibilidade

  Navegador          Versão   Status 
 
  Chrome/Edge        90+       Totalmente compatível 
  Firefox            88+       Totalmente compatível 
  Safari             14+       Totalmente compatível 
  Mobile (iOS)       14+       Totalmente compatível 
  Mobile (Android)   5+        Totalmente compatível 

##  Responsividade

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Layout adaptado com espaçamento otimizado
- **Mobile**: Layout single column com navegação clara
- **Pequenos ecrãs**: Otimizado para smartwatches

##  Conteúdo Técnico

### Variáveis em Português

Todas as variáveis estão em português:
```javascript
let estadoAplicacao = { ... }
let estadoQuiz = { ... }
let estadoCobra = { ... }
let estadoMemoria = { ... }
let estadoFlappy = { ... }
let estado2048 = { ... }
```

### Identificadores (IDs) em Português

```html
<section id="inicio">
<section id="quiz">
<section id="cobra">
<section id="memoria">
<section id="flappybird">
<section id="jogo2048">
```

### Classes CSS em Português

```css
.cabecalho { ... }
.ligacao-navegacao { ... }
.secao-heroi { ... }
.cartao-dica { ... }
.aplicacao-quiz { ... }
.aplicacao-cobra { ... }
.aplicacao-memoria { ... }
.aplicacao-flappy { ... }
.aplicacao-2048 { ... }
```

### Funções em Português

```javascript
function navegarPara(idPagina) { ... }
function inicializarQuiz() { ... }
function inicializarCobra() { ... }
function inicializarMemoria() { ... }
function inicializarFlappy() { ... }
function inicializar2048() { ... }
function alternarPausaCobra() { ... }
function pausarCobra() { ... }
```

## 🎓 Funcionalidades Principais

### Navegação
-  Menu fixo no topo
-  Links para todos os jogos
-  Navegação suave entre páginas
-  Indicador de página ativa

### Página Inicial
-  Hero section com animações
-  Seção de dicas e como jogar
-  Seção de benefícios
-  Call-to-action buttons

### Jogos
-  Quiz com 2 níveis
-  Cobra com pausa avançada
-  Memória com contador
-  Flappy Bird com canos
-  2048 com cores dinâmicas

### Armazenamento Local
-  Recordes salvos automaticamente
-  Sem necessidade de servidor
-  Dados persistem entre sessões

##  Melhorias Implementadas

-  Botão de pausa no jogo da cobra
-  Cobra começa em pausa
-  Game Over ao bater nas paredes
-  Game Over ao bater em si mesma
-  Cobra volta a pausar ao sair da página
-  Novo jogo: Flappy Bird
-  Novo jogo: 2048
-  Sistema de recordes
-  Toda a documentação em português
-  Comentários específicos no código

##  Estatísticas

 Métrica               Valor 

 Linhas de HTML        340 
 Linhas de CSS         1,016 
 Linhas de JavaScript  1,362 
 Total de Linhas       2,718 
 Tamanho do HTML       ~20 KB 
 Tamanho do CSS        ~24 KB 
 Tamanho do JS         ~40 KB 
 Tamanho Total         ~84 KB 

##  Ações Recomendadas

-  Teste todos os jogos
-  Teste em diferentes dispositivos
-  Verifique se os recordes são salvos
-  Aprecie o design responsivo
-  Leia os comentários no código

##  Suporte

Para questões técnicas ou sugestões:
1. Verifique se o navegador é compatível
2. Limpe a cache do navegador
3. Tente num navegador diferente
4. Verifique a consola (F12) para erros

##  Agradecimentos

- Font Awesome pelos ícones
- Google Fonts pela tipografia
- Comunidade de desenvolvimento web

##  Licença

Esta plataforma foi desenvolvida 🎮 para fins educacionais e de entretenimento.

---

**Desenvolvido com  para diversão e educação**

*Última atualização: Fevereiro 2026*
*Versão: 1.0*
