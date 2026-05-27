# StadioPro - Novas Funcionalidades

## Sumário das Atualizações

Este documento descreve as novas funcionalidades adicionadas ao projeto **StadioPro**, incluindo agendamento de estádio para utilizadores normais, gestão de eventos e pedidos para administradores, e sistema de relatórios mensais.

---

## 1. Funcionalidade de Agendamento de Estádio (Utilizadores Normais)

### Descrição
Os utilizadores registados podem agora preencher um formulário para solicitar o agendamento do estádio para eventos específicos.

### Localização
- **Menu:** "Agendar Estádio" (visível apenas para utilizadores autenticados)
- **URL:** `#agendamento`

### Funcionalidades

#### 1.1 Formulário de Agendamento
O formulário contém os seguintes campos:
- **Data do Evento:** Campo de data (obrigatório)
- **Hora do Evento:** Campo de hora (obrigatório)
- **Tipo de Evento:** Dropdown com opções:
  - Futebol
  - Música
  - Desportos
  - Gastronomia
  - Conferência
  - Outro
- **Nome do Evento:** Campo de texto (obrigatório)
- **Descrição do Evento:** Área de texto (obrigatório)
- **Capacidade Esperada:** Campo numérico (obrigatório)
- **Seu Nome:** Campo de texto (obrigatório)
- **Seu Email:** Campo de email (obrigatório)
- **Seu Telefone:** Campo de telefone (obrigatório)

#### 1.2 Validação
- Todos os campos são obrigatórios
- O utilizador deve estar autenticado para enviar um pedido
- Se não estiver autenticado, será redirecionado para o modal de login

#### 1.3 Armazenamento
Os pedidos são armazenados em `localStorage` com a chave `agendamentos` e contêm:
```javascript
{
    id: timestamp,
    dataAgendamento: "2025-03-15",
    horaAgendamento: "19:00",
    tipoEvento: "futebol",
    nomeEvento: "Clássico Local",
    descricaoEvento: "Descrição do evento",
    capacidadeEsperada: 5000,
    nomeOrganizador: "Nome",
    emailOrganizador: "email@exemplo.com",
    telefonePedido: "244123456789",
    utilizadorId: "id_do_utilizador",
    status: "pendente", // ou "aprovado", "recusado"
    dataPedido: "ISO_DATE"
}
```

#### 1.4 Visualização de Pedidos
Os utilizadores podem ver os seus pedidos de agendamento com os seguintes status:
- **Pendente:** Aguardando aprovação do administrador
- **Aprovado:** Pedido foi aceite
- **Recusado:** Pedido foi rejeitado

---

## 2. Painel de Administração - Novas Abas

### Localização
- **Menu:** "Admin" (visível apenas para administradores)
- **URL:** `#admin`

### Estrutura de Abas
O painel agora possui 4 abas principais:

#### 2.1 Dashboard (Padrão)
Exibe estatísticas gerais:
- Total de bilhetes vendidos
- Receita total
- Total de utilizadores registados
- Tabela com vendas recentes

#### 2.2 Criar Evento
Permite aos administradores criar novos eventos diretamente na plataforma.

**Campos do Formulário:**
- **Título do Evento:** Campo de texto
- **Data:** Campo de data
- **Hora:** Campo de hora
- **Localização:** Campo de texto
- **Categoria:** Dropdown (Futebol, Música, Desportos, Gastronomia, Tecnologia)
- **Descrição:** Área de texto
- **Capacidade:** Campo numérico
- **Preço do Bilhete:** Campo numérico (em Kz)
- **URL da Imagem:** Campo de URL

**Funcionamento:**
1. O administrador preenche todos os campos
2. Clica em "Criar Evento"
3. O evento é adicionado ao array `estadoApp.eventos`
4. É registada uma atividade no log
5. A lista de eventos é atualizada automaticamente

#### 2.3 Pedidos de Agendamento
Exibe uma tabela com todos os pedidos de agendamento do estádio.

**Colunas da Tabela:**
- **ID:** Identificador único do pedido
- **Organizador:** Nome da pessoa que fez o pedido
- **Tipo de Evento:** Tipo de evento solicitado
- **Data:** Data do evento solicitado
- **Status:** Estado atual do pedido (Pendente, Aprovado, Recusado)
- **Ações:** Botões para Aceitar ou Recusar (apenas para pedidos pendentes)

**Funcionalidades:**
- **Aceitar Pedido:** Muda o status para "aprovado" e registra a atividade
- **Recusar Pedido:** Muda o status para "recusado" e registra a atividade

#### 2.4 Relatórios
Gera relatórios mensais automáticos com todas as atividades da plataforma.

**Funcionalidades:**
1. **Seleção de Mês:** Campo de entrada de mês/ano
2. **Gerar Relatório:** Botão que cria o relatório
3. **Descarregar PDF:** Botão para exportar o relatório

**Conteúdo do Relatório:**
- Total de bilhetes vendidos no mês
- Receita total em Kz
- Número de agendamentos aprovados
- Número de agendamentos pendentes
- Lista completa de atividades registadas

---

## 3. Sistema de Log de Atividades

### Descrição
Todas as ações importantes na plataforma são registadas automaticamente.

### Atividades Registadas
- Novo pedido de agendamento criado
- Pedido de agendamento aprovado
- Pedido de agendamento recusado
- Novo evento criado
- Compra de bilhete

### Armazenamento
Os registos são armazenados em `localStorage` com a chave `registosAtividades`:
```javascript
{
    id: timestamp,
    acao: "Descrição da ação",
    detalhes: "Detalhes específicos",
    data: "ISO_DATE",
    utilizador: "Nome do utilizador ou Sistema"
}
```

### Acesso
Os registos são acessíveis através da aba "Relatórios" do painel de administração.

---

## 4. Integração com Funcionalidades Existentes

### Autenticação
- Os utilizadores devem estar autenticados para agendar o estádio
- Apenas administradores podem acessar o painel de administração
- O link "Agendar Estádio" só aparece para utilizadores autenticados

### Dados Persistentes
- Todos os dados são armazenados em `localStorage`
- Os dados persistem mesmo após fechar o navegador
- Não requer backend ou servidor

### Notificações
- Mensagens de sucesso após ações bem-sucedidas
- Mensagens de erro se algo correr mal
- Notificações visuais com cores distintas

---

## 5. Funções JavaScript Principais

### Agendamento
```javascript
// Processar novo agendamento
processarAgendamento(evento)

// Obter lista de agendamentos
obterAgendamentos()

// Renderizar agendamentos do utilizador
renderizarAgendamentosUtilizador()
```

### Administração
```javascript
// Processar criação de evento
processarCriarEvento(evento)

// Renderizar pedidos de agendamento
renderizarPedidosAgendamento()

// Aceitar pedido
aceitarPedido(id)

// Recusar pedido
recusarPedido(id)

// Inicializar abas do admin
inicializarAbasAdmin()
```

### Relatórios
```javascript
// Gerar relatório mensal
gerarRelatorioMensal()

// Descarregar relatório
descarregarRelatorioMensal()

// Obter registos de atividades
obterRegistosAtividades()

// Registar atividade
registarAtividadeLog(acao, detalhes)
```

---

## 6. Estilos CSS Adicionados

### Classes Principais
- `.conteudo-agendamento` - Container do formulário de agendamento
- `.formulario-agendamento` - Estilos do formulário
- `.abas-admin` - Container das abas
- `.aba-botao` - Botões das abas
- `.conteudo-aba` - Conteúdo de cada aba
- `.contentor-tabela` - Estilos da tabela
- `.opcoes-relatorio` - Opções de relatório
- `.conteudo-relatorio` - Conteúdo do relatório

### Responsividade
Todos os novos elementos são totalmente responsivos e funcionam em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

---

## 7. Como Usar

### Para Utilizadores Normais

1. **Fazer Login:**
   - Clique em "Login" no menu
   - Insira email e palavra-passe
   - Ou crie uma nova conta

2. **Agendar Estádio:**
   - Clique em "Agendar Estádio" no menu (após login)
   - Preencha o formulário com os detalhes do evento
   - Clique em "Enviar Pedido de Agendamento"
   - Veja o status do seu pedido na seção "Meus Pedidos de Agendamento"

### Para Administradores

1. **Acessar Painel:**
   - Faça login com uma conta de administrador
   - Clique em "Admin" no menu

2. **Criar Evento:**
   - Clique na aba "Criar Evento"
   - Preencha todos os campos
   - Clique em "Criar Evento"

3. **Gerir Pedidos:**
   - Clique na aba "Pedidos de Agendamento"
   - Veja todos os pedidos pendentes
   - Clique em "Aceitar" ou "Recusar" para cada pedido

4. **Gerar Relatórios:**
   - Clique na aba "Relatórios"
   - Selecione o mês desejado
   - Clique em "Gerar Relatório"
   - Visualize ou descarregue o relatório

---

## 8. Dados de Teste

### Conta de Administrador
- **Email:** admin@stadiopro.com
- **Palavra-passe:** admin123

### Conta de Utilizador Teste
- **Email:** utilizador@teste.com
- **Palavra-passe:** teste123

---

## 9. Troubleshooting

### Problema: Agendamento não aparece
**Solução:** Certifique-se de que está autenticado e que o localStorage não está desativado.

### Problema: Abas do admin não funcionam
**Solução:** Verifique se é administrador. Apenas contas admin podem acessar o painel.

### Problema: Relatório não gera
**Solução:** Certifique-se de que selecionou um mês válido e que existem dados para esse período.

---

## 10. Melhorias Futuras

- Integração com backend para persistência de dados
- Sistema de notificações por email
- Exportação de relatórios em PDF
- Calendário visual para agendamentos
- Sistema de pagamento para agendamentos
- Aprovação automática baseada em regras

---

## 11. Contacto e Suporte

Para dúvidas ou problemas com as novas funcionalidades, contacte o suporte técnico do StadioPro.

---

**Versão:** 2.0  
**Data de Atualização:** Março de 2026  
**Autor:** Equipa de Desenvolvimento StadioPro
