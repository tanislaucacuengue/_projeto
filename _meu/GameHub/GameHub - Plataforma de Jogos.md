# GameHub - Plataforma de Jogos

Uma plataforma web moderna e intuitiva que integra múltiplos jogos educacionais e de entretenimento, tudo num único hub centralizado.

## 🎮 Jogos Inclusos

### 1. **Quiz** - Teste seus Conhecimentos
- **Objetivo**: Responder corretamente às perguntas de conhecimento geral
- **Níveis**: 2 níveis de dificuldade progressiva
- **Pontuação**: Sistema de score com feedback visual
- **Dicas**:
  - Leia cuidadosamente cada pergunta
  - Pense antes de responder
  - Seu score é mostrado ao final de cada nível
  - Existem 8 perguntas no total (4 por nível)

### 2. **Mario** - Pule e Sobreviva
- **Objetivo**: Pular sobre os tubos para evitar cair
- **Controles**: Pressione ESPAÇO ou clique para pular
- **Dificuldade**: Aumenta com o tempo
- **Dicas**:
  - Evite os tubos vermelhos
  - Quanto mais tempo sobreviver, melhor!
  - A velocidade aumenta progressivamente
  - Seu score aumenta cada vez que você evita um tubo

### 3. **Cobra** - Coma e Cresça
- **Objetivo**: Comer a comida sem bater nas paredes ou em si mesma
- **Controles**: Use as setas do teclado para controlar
- **Velocidade**: Ajustável com slider
- **Dicas**:
  - Cada comida aumenta seu score
  - Evite colidir com o corpo da cobra
  - Seu recorde é salvo automaticamente
  - Ajuste a velocidade para seu nível de habilidade

### 4. **Memória** - Encontre os Pares
- **Objetivo**: Encontrar todos os pares de cartas iguais
- **Controles**: Clique nas cartas para virá-las
- **Desafio**: Memorize a posição das cartas
- **Dicas**:
  - Quanto menos tentativas, melhor!
  - O tempo é registrado para comparação
  - Existem 16 cartas (8 pares)
  - Concentre-se e memorize os padrões

## 🎨 Design e Cores

A plataforma utiliza um esquema de cores vibrante e moderno:

| Elemento | Cor | Código |
|----------|-----|--------|
| Primária | Roxo | #7C3AED |
| Primária Escura | Roxo Escuro | #5B21B6 |
| Secundária | Laranja | #F97316 |
| Terciária | Azul | #0EA5E9 |
| Acento | Verde | #10B981 |
| Fundo | Cinzento Escuro | #0F172A |
| Texto | Branco | #FFFFFF |

## 📁 Estrutura de Ficheiros

```
game-hub/
├── index.html           # Página principal (242 linhas)
├── styles.css           # Estilos CSS (922 linhas)
├── script.js            # Lógica JavaScript (575 linhas)
├── PLANNING.md          # Planeamento do projeto
└── README.md            # Este ficheiro
```

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Abra o ficheiro `index.html` num navegador web
2. A aplicação carregará imediatamente

### Opção 2: Usar um Servidor Local
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Depois aceda a `http://localhost:8000`

## 💻 Compatibilidade

✓ Chrome/Edge (versão 90+)  
✓ Firefox (versão 88+)  
✓ Safari (versão 14+)  
✓ Navegadores baseados em Chromium  
✓ Dispositivos móveis (iOS e Android)

## ✨ Características Principais

✅ **Navegação Intuitiva** - Menu fixo no topo com acesso rápido  
✅ **Página Inicial Informativa** - Dicas e instruções para cada jogo  
✅ **4 Jogos Completos** - Quiz, Mario, Cobra e Memória  
✅ **Animações Suaves** - Transições elegantes entre páginas  
✅ **Responsivo** - Funciona perfeitamente em todos os dispositivos  
✅ **Sem Dependências** - Apenas HTML, CSS e JavaScript puro  
✅ **Armazenamento Local** - Recordes salvos automaticamente  
✅ **Performance** - Carregamento rápido e otimizado

## 🎯 Melhorias Implementadas

### Quiz
- ✅ Sistema de pontuação visual com barra de progresso
- ✅ Feedback claro de respostas corretas/incorretas
- ✅ Múltiplos níveis com progressão
- ✅ Contador de acertos ao final

### Mario
- ✅ Detecção de colisão melhorada
- ✅ Sistema de pontuação
- ✅ Dificuldade progressiva
- ✅ Controles por teclado e mouse

### Cobra
- ✅ Controles suaves com setas do teclado
- ✅ Ajuste de velocidade com slider
- ✅ Sistema de recorde com armazenamento local
- ✅ Visual melhorado com cores vibrantes

### Memória
- ✅ Interface limpa e intuitiva
- ✅ Sistema de contagem de tentativas
- ✅ Timer para medir performance
- ✅ Feedback visual de pares encontrados

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| Linhas de HTML | 242 |
| Linhas de CSS | 922 |
| Linhas de JavaScript | 575 |
| Total de Linhas | 1,739 |
| Tamanho HTML | 12 KB |
| Tamanho CSS | 19 KB |
| Tamanho JavaScript | 18 KB |
| Tamanho Total | ~49 KB |

## 🎓 Exemplos de Jogo

### Quiz
1. Responda às 4 perguntas do nível 1
2. Veja seu score
3. Passe para o nível 2
4. Responda às 4 perguntas do nível 2
5. Veja seu score final

### Mario
1. Clique para começar
2. Pressione ESPAÇO ou clique para pular
3. Evite os tubos
4. Seu score aumenta cada tubo evitado
5. Game Over ao colidir

### Cobra
1. Use as setas para controlar
2. Coma a comida laranja
3. Evite as paredes e seu corpo
4. Seu score aumenta com cada comida
5. Game Over ao colidir

### Memória
1. Clique nas cartas para virá-las
2. Encontre os pares iguais
3. Memorize as posições
4. Quanto menos tentativas, melhor!
5. Vença ao encontrar todos os pares

## 🎮 Controles

### Quiz
- Clique nas respostas
- Clique "Próximo" para continuar

### Mario
- **ESPAÇO** ou **Clique** para pular

### Cobra
- **Setas do Teclado** para controlar
- **Slider** para ajustar velocidade

### Memória
- **Clique** nas cartas para virá-las
- **Botão Reiniciar** para recomeçar

## 💾 Armazenamento Local

A plataforma utiliza `localStorage` para guardar:
- Recorde do jogo da Cobra
- Preferências de velocidade

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos, animações e layout responsivo
- **JavaScript Vanilla**: Lógica dos jogos e interatividade

## 📱 Responsividade

A plataforma é totalmente responsiva:
- **Desktop** (1920px+): Layout completo com todas as funcionalidades
- **Tablet** (768px - 1024px): Layout adaptado com espaçamento reduzido
- **Mobile** (até 480px): Layout single column otimizado para toque

## 🐛 Resolução de Problemas

### Os jogos não funcionam
- Verifique se o JavaScript está ativado no navegador
- Limpe o cache (Ctrl+Shift+Delete)
- Tente outro navegador

### Os estilos não aparecem
- Certifique-se de que `styles.css` está no mesmo diretório
- Limpe o cache do navegador
- Recarregue a página (Ctrl+F5)

### Recorde não é salvo
- Verifique se o localStorage está ativado
- Tente usar modo normal (não modo privado/incógnito)

## 📝 Notas de Desenvolvimento

- Código bem comentado e fácil de manter
- Segue boas práticas de desenvolvimento web
- Sem dependências externas
- Código modular e reutilizável
- Otimizado para performance

## 🎉 Conclusão

GameHub é uma plataforma completa e profissional de jogos, oferecendo múltiplos jogos educacionais e de entretenimento numa interface moderna e intuitiva.

Desenvolvido com ❤️ para jogadores de todas as idades.

---

**Versão**: 1.0.0  
**Data**: Janeiro 2026  
**Última Atualização**: 29 de Janeiro de 2026
