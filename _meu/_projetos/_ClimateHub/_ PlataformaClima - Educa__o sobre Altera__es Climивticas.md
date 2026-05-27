# 🌍 ClimaHub - Educação sobre Alterações Climáticas

## Descrição

**ClimaHub** é uma aplicação web educativa e interativa que integra informações detalhadas sobre alterações climáticas com uma aplicação de previsão do tempo em tempo real. A plataforma foi desenvolvida em **HTML5**, **CSS3** e **JavaScript vanilla**, sem dependências externas.

Toda a documentação, variáveis, identificadores, classes, IDs e funções estão em **português** com comentários específicos em cada seção do código.

## 🎯 Objetivos

- **Educar** sobre as alterações climáticas e seus impactos globais
- **Informar** sobre soluções práticas e ações para combater o aquecimento global
- **Monitorar** condições climáticas em tempo real
- **Conscientizar** sobre a importância do monitoramento climático
- **Inspirar** ação individual e coletiva

## 📋 Estrutura da Aplicação

### Página Inicial (Início)

A página inicial contém 6 seções educativas principais:

#### 1. **Seção Herói**
- Introdução impactante sobre alterações climáticas
- Animação de fundo dinâmica
- Botão de ação para aceder à app do clima

#### 2. **O que são Alterações Climáticas?**
- Definição clara e concisa
- Causas principais (gases de efeito estufa, desflorestação, combustíveis fósseis)
- Evidências científicas (aumento de 1.1°C desde 1850)
- Diferença entre clima e tempo

#### 3. **Impactos Globais**
- 6 impactos principais:
  1. Aumento da temperatura
  2. Eventos climáticos extremos
  3. Impacto na biodiversidade
  4. Saúde humana
  5. Impacto económico
  6. Desigualdades sociais

#### 4. **Como Combater**
- 6 soluções práticas:
  1. Energias renováveis
  2. Eficiência energética
  3. Transportes sustentáveis
  4. Reflorestação
  5. Economia circular
  6. Políticas públicas

#### 5. **Por que Monitorar o Clima?**
- 6 razões importantes:
  1. Previsão de eventos extremos
  2. Planeamento urbano
  3. Saúde pública
  4. Agricultura e alimentação
  5. Decisões empresariais
  6. Ação global coordenada

#### 6. **Locais de Uso da Plataforma**
- 8 aplicações:
  1. Cidades e zonas urbanas
  2. Regiões agrícolas
  3. Zonas costeiras
  4. Áreas de conservação
  5. Escolas e universidades
  6. Empresas e indústrias
  7. Governos e administrações
  8. Setor de saúde

### App do Clima

Integração completa da aplicação de previsão do tempo com:
- Busca de cidades em tempo real
- Temperatura atual, máxima e mínima
- Umidade e velocidade do vento
- Qualidade do ar (AQI - Air Quality Index)
- Poluição do ar
- Ícones e descrições climáticas dinâmicas

##  Design e Cores

### Paleta de Cores

 Elemento         Cor            Código Hexadecimal 

 Azul Profundo    Primária        #1E40AF 
 Azul Claro       Primária Clara  #3B82F6 
 Verde            Secundária      #10B981 
 Laranja          Terciária       #F97316 
 Branco           Fundo           #FFFFFF 
 Cinzento Escuro  Texto           #1F2937 
 Vermelho         Acento          #EF4444 

### Tipografia

- **Família**: Poppins (Google Fonts)
- **Tamanhos**: 0.875rem a 2.5rem
- **Pesos**: 300, 400, 500, 600, 700

### Características de Design

 **Animações Suaves** - Transições elegantes entre páginas  
 **Hero Section Dinâmica** - Padrão animado de fundo  
 **Cards Interativos** - Efeitos hover com transformações  
 **Layout Responsivo** - Funciona em todos os dispositivos  
 **Acessibilidade** - Contraste adequado e navegação clara

##  Estrutura de Ficheiros

```
climaHub/
   index.html           # Página principal (HTML5)
   style.css            # Estilos e design (CSS3)
   script.js            # Lógica e interatividade (JavaScript)
   LEIA-ME.md           # Este ficheiro
   DOCUMENTACAO.md      # Documentação técnica detalhada
   GLOSSARIO.md         # Glossário de termos e variáveis
```

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

##  Compatibilidade

   Navegador           Versão    Status                      

   Chrome/Edge         90+       Totalmente compatível   
   Firefox             88+       Totalmente compatível   
   Safari              14+       Totalmente compatível   
   Mobile (iOS)        14+       Totalmente compatível   
   Mobile (Android)    5+        Totalmente compatível   

##  Funcionalidades

### Navegação
-  Menu fixo no topo
-  Links para Início e App do Clima
-  Navegação suave entre páginas
-  Indicador de página ativa

### Página Inicial
-  Hero section com animações
-  6 seções educativas principais
-  Cards informativos com hover effects
-  Grids responsivos
-  Call-to-action buttons

### App do Clima
-  Busca de cidades em tempo real
-  Integração com API OpenWeatherMap
-  Exibição de dados climáticos
-  Qualidade do ar (AQI)
-  Poluição do ar
-  Ícones climáticos dinâmicos

### Responsividade
-  Desktop (1400px+)
-  Tablet (768px - 1399px)
-  Mobile (< 768px)
-  Pequenos ecrãs (< 480px)

##  Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos, animações e grid layout
- **JavaScript Vanilla** - Sem frameworks ou bibliotecas
- **Font Awesome 7.0.1** - Ícones
- **Google Fonts** - Tipografia Poppins
- **OpenWeatherMap API** - Dados climáticos

## 📈 Estatísticas

 Métrica               Valor 
---------             -------
 Linhas de HTML        340 
 Linhas de CSS         931 
 Linhas de JavaScript  625 
 Total de Linhas       1,896 
 Tamanho do HTML       ~25 KB
 Tamanho do CSS        ~24 KB
 Tamanho do JS         ~17 KB
 Tamanho Total         ~66 KB 

##  API Utilizada

### OpenWeatherMap

- **Endpoint de Clima**: https://api.openweathermap.org/data/2.5/weather
- **Endpoint de Qualidade do Ar**: https://api.openweathermap.org/data/2.5/air_pollution
- **Chave da API**: af2e03141a2bbb2479f844146cea13ef

**Funcionalidades:**
- Previsão do tempo atual
- Temperatura máxima e mínima
- Umidade
- Velocidade do vento
- Qualidade do ar (AQI 1-5)
- Poluição do ar (PM2.5, PM10, NO2, O3)

##  Documentação do Código

### Variáveis Globais

```javascript
// Chave da API OpenWeatherMap
const chaveApiClima = 'af2e03141a2bbb2479f844146cea13ef';

// URL base da API de previsão do tempo
const urlBaseApiClima = 'https://api.openweathermap.org/data/2.5/weather';

// URL base da API de qualidade do ar
const urlBaseApiQualidadeAr = 'https://api.openweathermap.org/data/2.5/air_pollution';
```

### Funções Principais

#### `navegarPara(idPagina)`
Gerencia a navegação entre as diferentes seções da aplicação.

**Parâmetros:**
- `idPagina` (string): ID da página para a qual navegar

**Comportamento:**
1. Esconde todas as páginas
2. Mostra a página selecionada
3. Atualiza os indicadores de navegação
4. Rola a página para o topo
5. Inicializa a app do clima se necessário

#### `manipularPesquisaClima(evento)`
Manipula a pesquisa de clima quando o utilizador submete o formulário.

**Parâmetros:**
- `evento` (Event): Evento do formulário

**Comportamento:**
1. Previne o comportamento padrão do formulário
2. Obtém o nome da cidade digitado
3. Valida a entrada
4. Faz requisições às APIs do clima e qualidade do ar
5. Atualiza a interface com as informações

#### `exibirInformacoesClima(dadosClima)`
Atualiza todos os elementos da interface com as informações do clima.

**Parâmetros:**
- `dadosClima` (object): Objeto com os dados do clima

**Propriedades do objeto:**
- `cidade`: Nome da cidade
- `pais`: Código do país
- `temperatura`: Temperatura atual
- `temperaturaMaxima`: Temperatura máxima
- `temperaturaMinima`: Temperatura mínima
- `descricao`: Descrição do clima
- `iconeClima`: Código do ícone climático
- `velocidadeVento`: Velocidade do vento
- `umidade`: Percentagem de umidade

#### `obterDescricaoQualidadeAr(indiceQualidadeAr)`
Converte o índice numérico de qualidade do ar em descrição textual.

**Parâmetros:**
- `indiceQualidadeAr` (number): Índice de qualidade do ar (1-5)

**Retorna:**
- (string): Descrição textual do índice

**Escala:**
- 1 = Boa
- 2 = Moderada
- 3 = Má
- 4 = Muito Má
- 5 = Péssima

#### `exibirPoluicaoAr(componentesPoluentes)`
Calcula e exibe o índice de poluição do ar.

**Parâmetros:**
- `componentesPoluentes` (object): Objeto com os componentes poluentes

**Componentes considerados:**
- PM2.5: Partículas finas
- PM10: Partículas grosseiras
- NO2: Dióxido de nitrogénio
- O3: Ozono

##  Conteúdo Educativo

### Alterações Climáticas

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

##  Ações Individuais

Cada pessoa pode contribuir para combater as alterações climáticas:

- 🚴 Usar transportes sustentáveis
- 💡 Reduzir consumo de energia
- ♻️ Reciclar e reutilizar
- 🌳 Plantar árvores
- 🍽️ Reduzir consumo de carne
- 🛍️ Comprar produtos sustentáveis
- 📢 Sensibilizar outros
- 🗳️ Apoiar políticas ambientais

##  Suporte

Para questões técnicas ou sugestões:
1. Verifique se o navegador é compatível
2. Limpe a cache do navegador
3. Verifique a conexão à internet (necessária para a app do clima)
4. Tente num navegador diferente

##  Agradecimentos

- OpenWeatherMap pela API de dados climáticos
- Font Awesome pelos ícones
- Google Fonts pela tipografia
- Comunidade científica pelos dados sobre alterações climáticas

##  Licença

Esta plataforma foi desenvolvida para fins educacionais e de conscientização ambiental.

---

**Desenvolvido com 🌍 para um futuro sustentável**

*Última atualização: Fevereiro 2026*
*Versão: 1.0*
