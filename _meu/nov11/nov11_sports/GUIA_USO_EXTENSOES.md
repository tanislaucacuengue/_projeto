# Nov11 Sports - Guia de Uso das Extensões

## Índice
1. [Controlo de Stock](#1-controlo-de-stock)
2. [Sistema de Chat](#2-sistema-de-chat)
3. [Gestão de Registos e PDF](#3-gestão-de-registos-e-pdf)
4. [FAQ](#4-faq)

---

## 1. Controlo de Stock

### O que é?
Sistema automático que controla quantos bilhetes estão disponíveis para cada evento. Quando os bilhetes se esgotam, o botão de compra fica desativado.

### Como Funciona para Utilizadores?

#### Visualizar Stock
1. Abra a página "Eventos"
2. Em cada cartão de evento, verá:
   - **"X bilhetes disponíveis"** - se ainda há bilhetes
   - **"Esgotado"** em vermelho - se não há bilhetes

#### Comprar Bilhete
1. Clique em "Ver Detalhes" no evento desejado
2. Na janela de detalhes, verá:
   - Número de bilhetes disponíveis
   - Botão "Comprar Bilhete" (ativo se há stock)
3. Se o evento estiver esgotado:
   - Verá "Esgotado" em vermelho
   - Botão estará desativado (cinzento)
4. Clique "Comprar Bilhete" para completar a compra

#### Verificar Stock Atual
- O stock atualiza automaticamente após cada compra
- Recarregue a página para ver a versão mais recente

### Como Funciona para Administradores?

#### Ver Stock em Tempo Real
1. Faça login com conta admin
2. Vá para "Admin" → "Dashboard"
3. Role para baixo até "Eventos e Stock"
4. Veja tabela com:
   - Nome do evento
   - Capacidade total
   - **Stock disponível (atualizado em tempo real)**
   - Preço do bilhete

#### Monitorizar Vendas
1. Na mesma tabela, veja quantos bilhetes foram vendidos
2. Stock = Capacidade - Bilhetes Vendidos
3. Quando Stock = 0, evento fica "Esgotado"

#### Criar Evento com Stock
1. Vá para "Admin" → "Criar Evento"
2. Preencha o campo "Capacidade"
3. Este será o stock inicial
4. Após criar, o evento aparece na tabela de stock

---

## 2. Sistema de Chat

### O que é?
Sistema de conversas entre utilizadores e administradores. As mensagens são agrupadas por utilizador e há notificações visuais para mensagens pendentes.

### Como Funciona para Utilizadores?

#### Enviar Mensagem de Suporte
1. Role até ao rodapé da página
2. Na secção "Contactos", preencha:
   - **Email:** seu email
   - **Mensagem:** sua dúvida/problema
3. Clique "Enviar Mensagem"
4. Receberá confirmação: "Mensagem enviada com sucesso!"

#### Ver Respostas
1. Faça login na sua conta
2. Vá para "O Meu Perfil"
3. Role até "O Meu Suporte"
4. Verá todas as suas mensagens com status:
   - **Amarelo "Pendente"** - aguardando resposta
   - **Verde "Respondido"** - tem resposta

#### Acompanhar Conversa
- Cada mensagem mostra:
  - Data e hora do envio
  - Seu texto
  - Resposta do admin (se houver)

### Como Funciona para Administradores?

#### Ver Mensagens Pendentes
1. Faça login com conta admin
2. No menu, verá badge vermelho com número de mensagens pendentes
3. Vá para "Admin" → "Suporte"

#### Interface de Conversas
A página está dividida em duas partes:

**Esquerda - Lista de Conversas:**
- Cada utilizador tem uma conversa
- Número vermelho = mensagens não lidas
- Clique para abrir conversa

**Direita - Histórico:**
- Todas as mensagens da conversa
- Respostas anteriores (se houver)
- Campo para escrever resposta

#### Responder a Mensagem
1. Clique em conversa na lista esquerda
2. No histórico, veja todas as mensagens
3. Se não houver resposta:
   - Verá campo de texto vazio
   - Escreva sua resposta
   - Clique "Enviar"
4. Se já houver resposta:
   - Verá a resposta anterior
   - Não pode editar

#### Marcar como Respondido
- Ao enviar resposta, status muda automaticamente
- Badge atualiza (diminui número)
- Utilizador vê resposta no seu perfil

---

## 3. Gestão de Registos e PDF

### O que é?
Sistema para descarregar bilhetes e agendamentos em PDF e eliminar registos antigos automaticamente.

### Exportar Bilhete para PDF

#### Passo a Passo
1. Faça login
2. Vá para "O Meu Perfil"
3. Na secção "Os Meus Bilhetes", verá seus bilhetes
4. Cada bilhete mostra:
   - Nome do evento
   - Data de compra
   - ID do bilhete
   - Preço
5. Clique botão **"PDF"** (azul)
6. Ficheiro descarrega automaticamente

#### Conteúdo do PDF
O PDF contém:
- Logo Nov11 Sports
- Título "Bilhete de Evento"
- Informações completas:
  - Nome do evento
  - ID do bilhete
  - Data e hora do evento
  - Local
  - Preço pago
  - Data de compra
  - Seu nome
- Aviso de validade

#### Usar o PDF
- Imprima e leve ao evento
- Guarde como comprovante
- Válido apenas para o evento especificado

### Exportar Agendamento para PDF

#### Passo a Passo
1. Faça login
2. Vá para "O Meu Perfil"
3. Na secção "Os Meus Agendamentos", verá seus agendamentos
4. Cada agendamento mostra:
   - Nome do evento
   - Tipo (futebol, música, etc.)
   - Data e hora
   - Capacidade esperada
   - Status (Pendente/Aprovado/Recusado)
5. Clique botão **"PDF"** (azul)
6. Ficheiro descarrega automaticamente

#### Conteúdo do PDF
O PDF contém:
- Logo Nov11 Sports
- Título "Pedido de Agendamento"
- Informações do pedido:
  - Nome do evento
  - Tipo de evento
  - Data e hora
  - Capacidade esperada
  - Status atual
  - Dados do organizador
  - Email e telefone
  - Descrição do evento
- Aviso de validade

### Eliminar Registos Manualmente

#### Eliminar Bilhete
1. Vá para "O Meu Perfil"
2. Na secção "Os Meus Bilhetes"
3. Clique botão **"Eliminar"** (vermelho)
4. Confirme: "Tem a certeza que deseja eliminar este bilhete?"
5. Bilhete é removido imediatamente

#### Eliminar Agendamento
1. Vá para "O Meu Perfil"
2. Na secção "Os Meus Agendamentos"
3. Clique botão **"Eliminar"** (vermelho)
4. Confirme a eliminação
5. Agendamento é removido imediatamente

### Limpeza Automática

#### Como Funciona?
- Sistema elimina automaticamente registos com **mais de 7 dias**
- Executa ao carregar a página
- Repete a cada 24 horas
- **Sem ação do utilizador necessária**

#### Registos Afetados
- Bilhetes com mais de 7 dias
- Agendamentos com mais de 7 dias
- Atividades com mais de 7 dias

#### Indicador de Expiração
- Bilhetes mostram badge:
  - **"Ativo"** (verde) - menos de 7 dias
  - **"Expirado"** (vermelho) - mais de 7 dias

---

## 4. FAQ

### Controlo de Stock

**P: Por que o botão de compra está desativado?**
R: O evento está esgotado (stock = 0). Não há mais bilhetes disponíveis.

**P: O stock atualiza em tempo real?**
R: Sim, mas pode precisar recarregar a página para ver a versão mais recente.

**P: Posso ver o stock de eventos antigos?**
R: Sim, na tabela admin de "Eventos e Stock" estão todos os eventos.

**P: O que acontece se dois utilizadores compram ao mesmo tempo?**
R: O sistema processa sequencialmente. Se o stock acabar, o segundo recebe erro.

### Sistema de Chat

**P: Quanto tempo leva para receber resposta?**
R: Depende do admin. Pode levar horas ou dias.

**P: Posso editar minha mensagem?**
R: Não, mas pode enviar uma nova mensagem.

**P: Quantas mensagens posso enviar?**
R: Sem limite, mas tente ser conciso.

**P: Como sei que recebi resposta?**
R: Status muda de "Pendente" para "Respondido" no seu perfil.

**P: O admin pode ver meu email?**
R: Sim, você fornece ao enviar a mensagem.

### Gestão de Registos

**P: Quanto tempo leva para descarregar o PDF?**
R: Instantaneamente (menos de 1 segundo).

**P: Posso descarregar o PDF várias vezes?**
R: Sim, quantas vezes quiser.

**P: O PDF é válido como comprovante?**
R: Sim, contém todas as informações do bilhete.

**P: Quando é que os registos são eliminados?**
R: Automaticamente após 7 dias. Pode também eliminar manualmente.

**P: Posso recuperar um registo eliminado?**
R: Não, a eliminação é permanente. Tenha cuidado!

**P: O que acontece se não descarregar o PDF antes de 7 dias?**
R: O bilhete é eliminado do perfil, mas pode pedir ao admin uma cópia.

---

## 5. Dicas e Truques

### Para Utilizadores
- ✅ Descarregue o PDF do bilhete logo após comprar
- ✅ Guarde o PDF em local seguro
- ✅ Imprima o PDF antes de ir ao evento
- ✅ Se perder o bilhete, contacte suporte
- ✅ Verifique regularmente respostas do admin

### Para Administradores
- ✅ Responda a mensagens de suporte rapidamente
- ✅ Verifique tabela de stock regularmente
- ✅ Crie eventos com capacidade realista
- ✅ Monitore eventos próximos de esgotar
- ✅ Mantenha conversas organizadas

---

## 6. Contacto

Para dúvidas ou problemas:
1. Envie mensagem via formulário de contacto
2. Vá para "Admin" → "Suporte" (se admin)
3. Contacte suporte técnico do Nov11 Sports

---

**Última atualização:** Abril de 2026  
**Versão:** 1.0
