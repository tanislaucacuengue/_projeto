# 🌍 ClimateHub - Plataforma Educativa sobre Alterações Climáticas

## Descrição

**ClimateHub** é uma plataforma web educativa e interativa que integra informações detalhadas sobre alterações climáticas com uma aplicação de previsão do tempo em tempo real. A plataforma foi desenvolvida em HTML5, CSS3 e JavaScript vanilla, sem dependências externas.

## 🎯 Objetivos

- **Educar** sobre as alterações climáticas e seus impactos globais
- **Informar** sobre soluções práticas e ações para combater o aquecimento global
- **Monitorar** condições climáticas em tempo real
- **Conscientizar** sobre a importância do monitoramento climático
- **Inspirar** ação individual e coletiva

## 📋 Conteúdo Educativo

### Página Inicial (Home)

1. **Hero Section** - Introdução impactante sobre alterações climáticas
2. **O que são Alterações Climáticas?** - Definição, causas e evidências científicas
3. **Impactos Globais** - 6 áreas principais de impacto:
   - Aumento da temperatura
   - Eventos climáticos extremos
   - Impacto na biodiversidade
   - Saúde humana
   - Impacto económico
   - Desigualdades sociais

4. **Como Combater as Alterações Climáticas** - 6 soluções práticas:
   - Energias renováveis
   - Eficiência energética
   - Transportes sustentáveis
   - Reflorestação
   - Economia circular
   - Políticas públicas

5. **Por que Monitorar o Clima?** - 6 razões importantes:
   - Previsão de eventos extremos
   - Planeamento urbano
   - Saúde pública
   - Agricultura e alimentação
   - Decisões empresariais
   - Ação global coordenada

6. **Onde a ClimateHub Pode Ser Utilizada** - 8 locais de aplicação:
   - Cidades e zonas urbanas
   - Regiões agrícolas
   - Zonas costeiras
   - Áreas de conservação
   - Escolas e universidades
   - Empresas e indústrias
   - Governos e administrações
   - Setor de saúde

### App do Clima

Integração completa da aplicação de previsão do tempo com:
- Busca de cidades em tempo real
- Temperatura atual, máxima e mínima
- Umidade e velocidade do vento
- Qualidade do ar (AQI)
- Poluição do ar
- Ícones e descrições climáticas

## 🎨 Design

### Esquema de Cores

| Elemento | Cor | Código |
|----------|-----|--------|
| Primária | Azul Profundo | #1E40AF |
| Primária Clara | Azul Claro | #3B82F6 |
| Secundária | Verde | #10B981 |
| Terciária | Laranja | #F97316 |
| Fundo | Branco | #FFFFFF |
| Texto | Cinzento Escuro | #1F2937 |
| Acento | Vermelho | #EF4444 |

### Tipografia

- **Família**: Poppins (Google Fonts)
- **Títulos**: Font-weight 700
- **Subtítulos**: Font-weight 600
- **Corpo**: Font-weight 400

### Características de Design

✨ **Animações Suaves** - Transições elegantes entre páginas
✨ **Hero Section Dinâmica** - Padrão animado de fundo
✨ **Cards Interativos** - Efeitos hover com transformações
✨ **Layout Responsivo** - Funciona em todos os dispositivos
✨ **Acessibilidade** - Contraste adequado e navegação clara

## 🚀 Como Usar

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
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

## 📁 Estrutura de Ficheiros

```
climate_app_project/
├── index.html          # Página principal
├── styles.css          # Estilos e design
├── script.js           # Lógica e interatividade
├── README.md           # Este ficheiro
├── PLANNING.md         # Planeamento do projeto
└── SUMMARY.txt         # Sumário técnico
```

## 💻 Compatibilidade

| Navegador | Versão | Status |
|-----------|--------|--------|
| Chrome/Edge | 90+ | ✅ Totalmente compatível |
| Firefox | 88+ | ✅ Totalmente compatível |
| Safari | 14+ | ✅ Totalmente compatível |
| Mobile (iOS) | 14+ | ✅ Totalmente compatível |
| Mobile (Android) | 5+ | ✅ Totalmente compatível |

## 📊 Funcionalidades

### Navegação
- ✅ Menu fixo no topo
- ✅ Links para Início e App do Clima
- ✅ Navegação suave entre páginas
- ✅ Indicador de página ativa

### Página Inicial
- ✅ Hero section com animações
- ✅ 6 seções educativas principais
- ✅ Cards informativos com hover effects
- ✅ Grids responsivos
- ✅ Call-to-action buttons

### App do Clima
- ✅ Busca de cidades em tempo real
- ✅ Integração com API OpenWeatherMap
- ✅ Exibição de dados climáticos
- ✅ Qualidade do ar (AQI)
- ✅ Poluição do ar
- ✅ Ícones climáticos dinâmicos

### Responsividade
- ✅ Desktop (1400px+)
- ✅ Tablet (768px - 1399px)
- ✅ Mobile (< 768px)
- ✅ Pequenos ecrãs (< 480px)

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos, animações e grid layout
- **JavaScript Vanilla** - Sem frameworks ou bibliotecas
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia
- **OpenWeatherMap API** - Dados climáticos

## 📈 Estatísticas

| Métrica | Valor |
|---------|-------|
| Linhas de HTML | 340 |
| Linhas de CSS | 931 |
| Linhas de JavaScript | 202 |
| Total de Linhas | 1,473 |
| Tamanho do HTML | ~12 KB |
| Tamanho do CSS | ~19 KB |
| Tamanho do JS | ~7 KB |
| Tamanho Total | ~38 KB |

## 🌐 API Utilizada

### OpenWeatherMap
- **Endpoint**: https://api.openweathermap.org/data/2.5/weather
- **Funcionalidades**:
  - Previsão do tempo atual
  - Temperatura máxima e mínima
  - Umidade
  - Velocidade do vento
  - Qualidade do ar (AQI)
  - Poluição do ar

## 🎓 Conteúdo Educativo Detalhado

### O que são Alterações Climáticas?

As alterações climáticas referem-se a mudanças de longo prazo nas temperaturas e padrões climáticos globais. Estas mudanças são principalmente causadas pela atividade humana, especialmente pela emissão de gases de efeito estufa.

**Causas Principais:**
- Gases de Efeito Estufa (CO2, metano, óxido nitroso)
- Desflorestação
- Combustíveis Fósseis (carvão, petróleo, gás natural)

**Evidências Científicas:**
- Aumento de 1.1°C na temperatura global desde 1850
- Aceleração do derretimento do gelo nos polos
- Aumento do nível do mar
- Eventos climáticos extremos mais frequentes

### Impactos Globais

1. **Aumento da Temperatura** - Ondas de calor intensas afetam saúde e agricultura
2. **Eventos Climáticos Extremos** - Furacões, inundações e secas mais frequentes
3. **Impacto na Biodiversidade** - Extinção de espécies e degradação de habitats
4. **Saúde Humana** - Doenças respiratórias, alergias e desnutrição
5. **Impacto Económico** - Perdas em agricultura, turismo e infraestrutura
6. **Desigualdades Sociais** - Países em desenvolvimento sofrem mais

### Soluções Práticas

1. **Energias Renováveis** - Solar, eólica, hidrelétrica, geotérmica
2. **Eficiência Energética** - Edifícios inteligentes, isolamento, LED
3. **Transportes Sustentáveis** - Veículos elétricos, transportes públicos
4. **Reflorestação** - Plantação de árvores absorve CO2
5. **Economia Circular** - Reduzir, reutilizar, reciclar
6. **Políticas Públicas** - Regulações ambientais e incentivos verdes

## 🌱 Ações Individuais

Cada pessoa pode contribuir para combater as alterações climáticas:

- 🚴 Usar transportes sustentáveis
- 💡 Reduzir consumo de energia
- ♻️ Reciclar e reutilizar
- 🌳 Plantar árvores
- 🍽️ Reduzir consumo de carne
- 🛍️ Comprar produtos sustentáveis
- 📢 Sensibilizar outros
- 🗳️ Apoiar políticas ambientais

## 📞 Suporte

Para questões técnicas ou sugestões:
1. Verifique se o navegador é compatível
2. Limpe a cache do navegador
3. Verifique a conexão à internet (necessária para a app do clima)
4. Tente num navegador diferente

## 📄 Licença

Esta plataforma foi desenvolvida para fins educacionais e de conscientização ambiental.

## 🙏 Agradecimentos

- OpenWeatherMap pela API de dados climáticos
- Font Awesome pelos ícones
- Google Fonts pela tipografia
- Comunidade científica pelos dados sobre alterações climáticas

---

**Desenvolvido com 🌍 para um futuro sustentável**

*Última atualização: Janeiro 2026*
