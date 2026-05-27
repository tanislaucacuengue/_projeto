# Nov11 Sports - Implementação de Extensões

## Sumário das Implementações

Este documento descreve as três funcionalidades principais adicionadas ao projeto **Nov11 Sports**, incluindo controlo de stock de bilhetes, sistema de chat organizado com badges, e gestão de registos com exportação PDF.

---

## 1. Controlo de Inventário de Bilhetes

### Descrição
Sistema completo de controlo de stock que persiste no localStorage, permitindo rastrear a disponibilidade de bilhetes em tempo real.

### Funcionalidades

#### 1.1 Persistência de Stock
- **Armazenamento:** `localStorage.stockEventos` (JSON)
- **Estrutura:** `{ idEvento: quantidadeDisponível, ... }`
- **Inicialização:** Automática ao carregar a página baseada em `dados.json`

#### 1.2 Validação de Disponibilidade
- Botão "Comprar Bilhete" desativado quando stock = 0
- Exibição de "Esgotado" em vermelho
- Cartão do evento com opacidade reduzida quando sem stock
- Atualização em tempo real após cada compra

#### 1.3 Interface de Utilizador
- Contador de bilhetes disponíveis em cada cartão de evento
- Indicador visual de estado (Ativo/Esgotado)
- Desativação de cliques em eventos sem stock

#### 1.4 Dashboard Admin
- Tabela adicional mostrando eventos com stock atualizado
- Colunas: Evento, Capacidade Total, Stock Disponível, Preço
- Atualização automática após cada compra

### Funções Principais

```javascript
inicializarControloStock()           // Carregar/criar registo inicial
obterStockEvento(idEvento)          // Obter stock atual
atualizarStockEvento(idEvento, novo) // Atualizar stock
decrementarStock(idEvento)          // Decrementar após compra
temStockDisponivel(idEvento)        // Verificar disponibilidade
```

### Fluxo de Compra
1. Utilizador clica em "Comprar Bilhete"
2. Sistema verifica stock com `temStockDisponivel()`
3. Se disponível, decrementa com `decrementarStock()`
4. Cria bilhete com timestamp para limpeza automática
5. Atualiza localStorage e recarrega interface

---

## 2. Sistema de Chat Organizado

### Descrição
Sistema de conversas agrupadas por utilizador com badges de notificação no menu e interface admin melhorada.

### Funcionalidades

#### 2.1 Agrupamento de Conversas
- Mensagens agrupadas por utilizador (idUtilizador ou email)
- Contagem de mensagens não lidas por conversa
- Ordenação por mensagens pendentes e data

#### 2.2 Badges de Notificação
- Badge vermelho no menu com número de mensagens pendentes
- Animação de pulso para chamar atenção
- Atualização automática após cada ação

#### 2.3 Interface Admin Melhorada
- Layout em duas colunas: conversas à esquerda, histórico à direita
- Lista de conversas com indicador visual de não lidas
- Histórico completo da conversa com respostas

#### 2.4 Responsividade
- Em tablets/mobile: layout em coluna única
- Conversas com scroll independente
- Botões de ação adaptados

### Funções Principais

```javascript
inicializarChat()                    // Inicializar sistema
obterConversasAgrupadas()           // Agrupar por utilizador
atualizarBadgesChat()               // Atualizar badges no menu
renderizarConversasAdmin()          // Renderizar lista de conversas
abrirConversaAdmin(chave)           // Abrir conversa específica
enviarRespostaConversa(chave)       // Enviar resposta
```

### Estrutura de Dados

```javascript
conversas = {
    "chave_utilizador": {
        idUtilizador: "id",
        nome: "Nome",
        email: "email@exemplo.com",
        mensagens: [...],
        naoLidas: 2
    }
}
```

### Fluxo de Utilização

**Para Utilizadores:**
1. Enviam mensagem via formulário de contacto
2. Mensagem armazenada com status "Pendente"
3. Badge aparece no menu admin

**Para Admin:**
1. Vê badge com número de mensagens pendentes
2. Clica em "Suporte" no admin
3. Visualiza lista de conversas
4. Clica em conversa para ver histórico
5. Responde e marca como "Respondido"
6. Badge atualiza automaticamente

---

## 3. Gestão de Registos e Exportação PDF

### Descrição
Sistema completo de gestão de registos com exportação para PDF e limpeza automática de dados antigos.

### Funcionalidades

#### 3.1 Exportação para PDF
- **Biblioteca:** jsPDF (CDN)
- **Formatos:** Bilhetes e Agendamentos
- **Conteúdo:** Informações completas formatadas
- **Design:** Identidade visual Nov11 Sports (cores, fontes)

#### 3.2 Bilhetes PDF
- Cabeçalho com logo Nov11 Sports
- Informações do evento (data, hora, local)
- ID do bilhete e titular
- Preço e data de compra
- Rodapé com aviso de validade

#### 3.3 Agendamentos PDF
- Dados completos do pedido
- Status atual
- Informações do organizador
- Descrição do evento
- Data de pedido

#### 3.4 Limpeza Automática
- Registos com +7 dias são eliminados
- Execução automática ao carregar página
- Repetição a cada 24 horas
- Aplica-se a: bilhetes, agendamentos, atividades

#### 3.5 Eliminação Manual
- Botão "Eliminar" em cada bilhete/agendamento
- Confirmação antes de eliminar
- Atualização imediata da interface

### Funções Principais

```javascript
inicializarGestaoRegistos()         // Inicializar sistema
limparRegistosAntigos()             // Limpeza automática
eliminarBilhete(idBilhete)         // Eliminar bilhete
eliminarAgendamento(idAgendamento) // Eliminar agendamento
exportarBilhetePDF(idBilhete)      // Exportar bilhete
exportarAgendamentoPDF(idAgendamento) // Exportar agendamento
```

### Fluxo de Exportação PDF

1. Utilizador clica botão "PDF"
2. Sistema obtém dados do bilhete/agendamento
3. Cria documento com jsPDF
4. Adiciona cabeçalho, conteúdo e rodapé
5. Aplica estilos Nov11 Sports
6. Descarrega ficheiro com nome único

### Estrutura de Timestamps

```javascript
bilhete = {
    id: Date.now(),
    ...
    dataCompra: "DD/MM/YYYY",
    dataPDF: "ISO_DATE"  // Para limpeza automática
}
```

---

## 4. Ficheiros Adicionados

### 4.1 extensoes.js
Ficheiro principal com todas as funcionalidades:
- Controlo de stock (linhas 1-150)
- Sistema de chat (linhas 160-290)
- Gestão de registos (linhas 300-450)
- Inicialização (linhas 460-470)

### 4.2 extensoes.css
Estilos para as novas funcionalidades:
- Estilos de stock (linhas 1-50)
- Estilos de chat (linhas 55-120)
- Estilos de registos (linhas 125-200)
- Responsividade (linhas 205-250)

### 4.3 melhorias-perfil.js
Melhorias na interface do utilizador:
- Renderização melhorada do perfil
- Botões de ação para bilhetes
- Agendamentos com ações
- Suporte melhorado

### 4.4 Modificações em index.html
- Referência a jsPDF (CDN)
- Importação de extensoes.css
- Importação de extensoes.js
- Importação de melhorias-perfil.js

---

## 5. Integração com Código Existente

### 5.1 Compatibilidade
- Todas as funções originais mantidas
- Novas funções adicionadas sem conflitos
- localStorage compartilhado para persistência

### 5.2 Hooks de Integração
- `comprarBilhete()`: Agora usa sistema de stock
- `renderizarEventos()`: Mostra status de stock
- `renderizarDashboardAdmin()`: Inclui tabela de eventos
- `renderizarSuporteAdmin()`: Layout melhorado com conversas
- `renderizarSeccaoPerfil()`: Botões de ação para bilhetes

### 5.3 localStorage Utilizado
```
stockEventos              // Stock de eventos
mensagensSuporte         // Mensagens (existente)
utilizadores             // Utilizadores (existente)
agendamentos             // Agendamentos (existente)
registosAtividades       // Atividades (existente)
```

---

## 6. Como Usar

### 6.1 Controlo de Stock

**Para Utilizadores:**
1. Navegar para "Eventos"
2. Ver contador de bilhetes disponíveis
3. Se "Esgotado", botão está desativado
4. Clicar "Ver Detalhes" para abrir modal
5. Botão "Comprar Bilhete" só ativo se stock > 0

**Para Admin:**
1. Ir para "Admin" → "Dashboard"
2. Rolar para baixo até "Eventos e Stock"
3. Ver tabela com stock atualizado em tempo real
4. Stock decresce automaticamente após cada compra

### 6.2 Sistema de Chat

**Para Utilizadores:**
1. Ir para rodapé
2. Preencher formulário de contacto
3. Mensagem enviada com status "Pendente"
4. Aguardar resposta do admin

**Para Admin:**
1. Ir para "Admin" → "Suporte"
2. Ver badge com número de mensagens pendentes
3. Clicar em conversa para ver histórico
4. Escrever resposta e enviar
5. Status muda para "Respondido"

### 6.3 Gestão de Registos

**Exportar PDF:**
1. Ir para "O Meu Perfil"
2. Na secção de bilhetes, clicar botão "PDF"
3. Ficheiro descarregado automaticamente
4. Mesmo para agendamentos

**Eliminar Manualmente:**
1. Ir para "O Meu Perfil"
2. Clicar botão "Eliminar" em bilhete/agendamento
3. Confirmar eliminação
4. Registo removido imediatamente

**Limpeza Automática:**
- Executada automaticamente ao carregar página
- Repete a cada 24 horas
- Sem ação do utilizador necessária

---

## 7. Dados de Teste

### 7.1 Conta Admin
- **Email:** admin@stadiopro.com
- **Palavra-passe:** admin123

### 7.2 Teste de Stock
1. Criar evento com capacidade pequena (ex: 5)
2. Comprar bilhetes até esgotar
3. Verificar que botão fica desativado
4. Verificar tabela admin mostra stock 0

### 7.3 Teste de Chat
1. Enviar mensagem de contacto
2. Verificar badge aparece no admin
3. Admin responde
4. Verificar status muda para "Respondido"

### 7.4 Teste de PDF
1. Comprar bilhete
2. Ir para perfil
3. Clicar "PDF"
4. Verificar ficheiro descarregado
5. Abrir PDF e verificar conteúdo

---

## 8. Troubleshooting

### Problema: Stock não atualiza
**Solução:** Verificar localStorage está ativado. Recarregar página.

### Problema: PDF não descarrega
**Solução:** Verificar se jsPDF está carregado (ver console). Atualizar página.

### Problema: Badges não aparecem
**Solução:** Verificar se há mensagens com status "Pendente". Atualizar página.

### Problema: Limpeza não funciona
**Solução:** Verificar se dataPDF está sendo guardada nos bilhetes.

---

## 9. Melhorias Futuras

- [ ] Integração com backend para sincronização de stock
- [ ] Notificações por email para respostas de suporte
- [ ] Exportação de relatórios em PDF
- [ ] Calendário visual para agendamentos
- [ ] Sistema de pagamento integrado
- [ ] Aprovação automática baseada em regras
- [ ] Histórico de alterações de stock
- [ ] Filtros avançados em conversas

---

## 10. Notas Técnicas

### 10.1 Performance
- localStorage limitado a ~5-10MB
- Limpeza automática evita crescimento excessivo
- Sem impacto significativo em performance

### 10.2 Segurança
- Dados armazenados localmente (sem servidor)
- Sem encriptação (considerar para dados sensíveis)
- Validação no frontend

### 10.3 Compatibilidade
- Funciona em todos os browsers modernos
- jsPDF suportado em Chrome, Firefox, Safari, Edge
- localStorage suportado em todos os browsers

---

## 11. Contacto e Suporte

Para dúvidas ou problemas com as extensões, contacte o suporte técnico do Nov11 Sports.

---

**Versão:** 1.0  
**Data de Implementação:** Abril de 2026  
**Autor:** Equipa de Desenvolvimento Nov11 Sports
