# DevHub - Ferramentas para Desenvolvedores

Uma aplicação web moderna e intuitiva que integra múltiplas ferramentas essenciais para desenvolvedores, tudo num único hub centralizado.

## 🎯 Características Principais

- **Calculadora Interativa**: Cálculos rápidos com interface intuitiva
- **Gerador de Cores RGB**: Crie cores personalizadas com controle total dos valores RGB
- **Gerador de Border-Radius**: Gere propriedades CSS de border-radius de forma visual
- **Gerador de Filtros de Imagens**: Aplique filtros CSS a imagens em tempo real

## 🎨 Design

A aplicação utiliza um esquema de cores profissional:
- **Azul Primário**: #0066CC
- **Azul Escuro**: #003366
- **Branco**: #FFFFFF
- **Cinzento Claro**: #F5F7FA

## 📁 Estrutura de Ficheiros

```
dev-hub-app/
├── index.html           # Página principal HTML
├── styles.css           # Estilos CSS (930 linhas)
├── script.js            # Lógica JavaScript (296 linhas)
├── background001.jpg    # Imagem para filtros
├── espaco.jpg           # Imagem adicional
├── PLANNING.md          # Documento de planeamento
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

# Node.js (com http-server)
npx http-server

# PHP
php -S localhost:8000
```

Depois aceda a `http://localhost:8000` no seu navegador.

## 📋 Funcionalidades Detalhadas

### 1. Calculadora
- Operações básicas: adição, subtração, multiplicação, divisão
- Suporte para teclado
- Botões de limpar e apagar
- Display claro e legível

**Atalhos de Teclado:**
- `0-9`: Números
- `+`, `-`, `*`, `/`: Operadores
- `Enter` ou `=`: Calcular resultado
- `Backspace`: Apagar último dígito
- `Escape`: Limpar tudo

### 2. Gerador de Cores RGB
- Sliders para controlar valores de Vermelho, Verde e Azul
- Pré-visualização em tempo real
- Saída em formato RGB
- Botão para copiar para clipboard

### 3. Gerador de Border-Radius
- Controle individual de cada canto
- Pré-visualização visual
- Saída em formato CSS
- Cópia rápida para clipboard

### 4. Gerador de Filtros de Imagens
- 8 filtros CSS diferentes:
  - Escala de Cinza
  - Sépia
  - Desfoque
  - Inverter cores
  - Opacidade
  - Brilho
  - Contraste
  - Saturação
- Pré-visualização em tempo real
- Saída em formato CSS

## 🎯 Benefícios para Desenvolvedores

✅ **Rápido e Eficiente** - Acesso instantâneo a todas as ferramentas
✅ **Interface Intuitiva** - Design limpo e focado
✅ **Produtividade** - Economize tempo com ferramentas otimizadas
✅ **Tudo em Um Lugar** - Não precisa de abrir múltiplas abas

## 💻 Compatibilidade

- ✅ Chrome/Edge (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Navegadores baseados em Chromium
- ✅ Responsivo em dispositivos móveis

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos e animações
- **JavaScript Vanilla**: Interatividade sem dependências

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (até 480px)

## ✨ Características Especiais

### Animações e Transições
- Transições suaves entre páginas
- Efeitos hover nos cards
- Animações de entrada
- Feedback visual nos botões

### Acessibilidade
- Navegação por teclado
- Contraste adequado
- Semântica HTML apropriada
- Labels descritivas

### Performance
- Sem dependências externas
- Carregamento rápido
- Otimizado para performance
- Ficheiros CSS e JS minificáveis

## 🎓 Exemplos de Uso

### Calculadora
```
5 + 3 = 8
10 * 2.5 = 25
100 / 4 = 25
```

### Cores RGB
```
Vermelho: 255, Verde: 0, Azul: 0 → rgb(255, 0, 0) [Vermelho puro]
Vermelho: 0, Verde: 255, Azul: 0 → rgb(0, 255, 0) [Verde puro]
```

### Border-Radius
```
TR: 50%, TL: 50%, BR: 50%, BL: 50% → border-radius: 50% 50% 50% 50%; [Círculo]
TR: 100%, TL: 0%, BR: 0%, BL: 0% → border-radius: 100% 0% 0% 0%; [Canto arredondado]
```

### Filtros
```
Grayscale: 100% → Imagem em preto e branco
Sepia: 100% → Efeito vintage
Blur: 10px → Imagem desfocada
```

## 📝 Notas de Desenvolvimento

- O código é bem comentado e fácil de manter
- Segue boas práticas de desenvolvimento web
- Sem dependências externas (vanilla JavaScript)
- Código modular e reutilizável

## 🐛 Resolução de Problemas

### A aplicação não carrega
- Verifique se o ficheiro `index.html` está no mesmo diretório que `styles.css` e `script.js`
- Certifique-se de que tem permissões de leitura nos ficheiros

### Os estilos não aparecem
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique se o ficheiro `styles.css` está acessível

### As imagens não aparecem
- Certifique-se de que `background001.jpg` está no mesmo diretório
- Verifique as permissões do ficheiro

## 📞 Suporte

Para questões ou sugestões, considere:
1. Verificar a consola do navegador (F12) para erros
2. Testar em outro navegador
3. Limpar o cache e recarregar

## 📄 Licença

Esta aplicação foi criada como ferramenta educacional para desenvolvedores.

## 🙏 Créditos

Desenvolvido com ❤️ para a comunidade de desenvolvedores.

---

**Versão**: 1.0.0  
**Data**: Janeiro 2026  
**Última Atualização**: 29 de Janeiro de 2026
