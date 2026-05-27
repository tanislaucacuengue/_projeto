// ===== SCRIPT PRINCIPAL =====
// Navegação, utilitários e inicialização

// ===== NAVEGAÇÃO =====

const mapeamentoPaginas = {
  'inicio': 'pagina-inicio',
  'cursos': 'pagina-cursos',
  'detalhe-curso': 'pagina-detalhe-curso',
  'aula': 'pagina-aula',
  'perfil': 'pagina-perfil',
  'meus-cursos': 'pagina-meus-cursos',
  'certificados': 'pagina-certificados',
  'admin': 'pagina-admin',
  'sobre': 'pagina-sobre'
};

let paginaAtual = 'inicio';

function navegarPara(pagina) {
  // Fechar menu de perfil
  fecharMenuPerfil();
  fecharMenuMobile();

  // Ocultar todas as páginas
  document.querySelectorAll('.pagina').forEach(p => {
    p.classList.remove('ativa');
    p.classList.add('oculto');
  });

  // Mostrar página destino
  const idPagina = mapeamentoPaginas[pagina];
  if (idPagina) {
    const elementoPagina = document.getElementById(idPagina);
    if (elementoPagina) {
      elementoPagina.classList.remove('oculto');
      elementoPagina.classList.add('ativa');
    }
  }

  paginaAtual = pagina;

  // Rolar para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Carregar conteúdo específico da página
  switch (pagina) {
    case 'inicio':
      carregarCursosInicio();
      break;
    case 'cursos':
      carregarTodosCursos();
      break;
    case 'perfil':
      carregarPerfil();
      break;
    case 'meus-cursos':
      carregarMeusCursos();
      break;
    case 'certificados':
      carregarCertificados();
      break;
    case 'admin':
      carregarAdmin();
      break;
  }

  // Atualizar URL sem recarregar
  history.pushState({ pagina }, '', `#${pagina}`);
}

// ===== MENU MOBILE =====

function alternarMenuMobile() {
  const botaoMenu = document.getElementById('botao-menu-mobile');
  const menuLateral = document.getElementById('menu-lateral');
  
  if (botaoMenu && menuLateral) {
    botaoMenu.classList.toggle('ativo');
    menuLateral.classList.toggle('ativo');
  }
}

function fecharMenuMobile() {
  const botaoMenu = document.getElementById('botao-menu-mobile');
  const menuLateral = document.getElementById('menu-lateral');
  
  if (botaoMenu && menuLateral) {
    botaoMenu.classList.remove('ativo');
    menuLateral.classList.remove('ativo');
  }
}

// Fechar menu mobile ao clicar fora
document.addEventListener('click', function(evento) {
  const botaoMenu = document.getElementById('botao-menu-mobile');
  const menuLateral = document.getElementById('menu-lateral');
  
  if (botaoMenu && menuLateral && botaoMenu.classList.contains('ativo')) {
    if (!botaoMenu.contains(evento.target) && !menuLateral.contains(evento.target)) {
      fecharMenuMobile();
    }
  }
});

// ===== MODAIS =====

function abrirModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.remove('oculto');
    document.body.style.overflow = 'hidden';
  }
}

function fecharModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.add('oculto');
    document.body.style.overflow = '';
  }
}

function fecharModalExterno(evento, idModal) {
  if (evento.target.id === idModal) {
    fecharModal(idModal);
  }
}

function trocarModal(idFechar, idAbrir) {
  fecharModal(idFechar);
  setTimeout(() => abrirModal(idAbrir), 150);
}

// Fechar modal com ESC
document.addEventListener('keydown', function(evento) {
  if (evento.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.oculto)').forEach(modal => {
      fecharModal(modal.id);
    });
  }
});

// ===== TOAST DE NOTIFICAÇÃO =====

let timeoutToast = null;

function mostrarToast(mensagem, tipo = 'info') {
  const toast = document.getElementById('notificacao-toast');
  const textoToast = document.getElementById('texto-toast');

  if (timeoutToast) clearTimeout(timeoutToast);

  textoToast.textContent = mensagem;
  toast.className = `notificacao-toast ${tipo}`;
  toast.classList.remove('oculto');

  timeoutToast = setTimeout(() => {
    toast.classList.add('oculto');
  }, 4000);
}

// ===== ESTRELAS ANIMADAS =====

function gerarEstrelas() {
  const camadas = [
    { id: 'camada-estrelas-1', quantidade: 150, tamanho: 'pequena', velocidade: 3 },
    { id: 'camada-estrelas-2', quantidade: 80, tamanho: 'media', velocidade: 5 },
    { id: 'camada-estrelas-3', quantidade: 30, tamanho: 'grande', velocidade: 7 }
  ];

  camadas.forEach(camada => {
    const elemento = document.getElementById(camada.id);
    if (!elemento) return;

    let html = '';
    for (let i = 0; i < camada.quantidade; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const atraso = Math.random() * 5;
      const duracao = 2 + Math.random() * camada.velocidade;

      html += `<div class="estrela estrela-${camada.tamanho}" style="
        left: ${x}%;
        top: ${y}%;
        --duracao: ${duracao}s;
        --atraso: ${atraso}s;
      "></div>`;
    }

    // Adicionar algumas estrelas coloridas (roxo/azul)
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const cor = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(0, 180, 255, 0.8)';
      html += `<div class="estrela estrela-media" style="
        left: ${x}%;
        top: ${y}%;
        background: ${cor};
        box-shadow: 0 0 4px ${cor};
        --duracao: ${3 + Math.random() * 4}s;
        --atraso: ${Math.random() * 5}s;
      "></div>`;
    }

    elemento.innerHTML = html;
  });
}

// ===== NAVEGAÇÃO POR URL HASH =====

function processarHash() {
  const hash = window.location.hash.slice(1);
  if (hash && mapeamentoPaginas[hash]) {
    navegarPara(hash);
  }
}

window.addEventListener('popstate', function(evento) {
  if (evento.state && evento.state.pagina) {
    navegarPara(evento.state.pagina);
  }
});

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', function() {
  // Gerar estrelas de fundo
  gerarEstrelas();

  // Inicializar autenticação
  inicializarAutenticacao();

  // Processar hash da URL
  processarHash();

  // Carregar cursos da página inicial
  if (paginaAtual === 'inicio') {
    carregarCursosInicio();
  }

  // Atualizar estatísticas da hero
  atualizarEstatisticasHero();

  console.log('🚀 RobotTech Academy iniciada com sucesso!');
});

// Atualizar estatísticas da hero
async function atualizarEstatisticasHero() {
  try {
    const resultado = await apiCursos.listarTodos();
    const totalAulas = resultado.cursos.reduce((acc, c) => acc + (c.total_aulas || 0), 0);
    const totalInscritos = resultado.cursos.reduce((acc, c) => acc + (c.total_inscritos || 0), 0);

    const statCursos = document.getElementById('stat-cursos');
    const statAulas = document.getElementById('stat-aulas');
    const statAlunos = document.getElementById('stat-alunos');

    if (statCursos) statCursos.textContent = resultado.cursos.length;
    if (statAulas) statAulas.textContent = totalAulas + '+';
    if (statAlunos) statAlunos.textContent = totalInscritos > 0 ? totalInscritos + '+' : '∞';
  } catch {}
}

// Efeito de ripple nos botões
document.addEventListener('click', function(evento) {
  const botao = evento.target.closest('.botao-primario, .botao-secundario');
  if (!botao) return;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';

  const rect = botao.getBoundingClientRect();
  const tamanho = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = tamanho + 'px';
  ripple.style.left = (evento.clientX - rect.left - tamanho / 2) + 'px';
  ripple.style.top = (evento.clientY - rect.top - tamanho / 2) + 'px';

  botao.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// Lazy loading das imagens
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    });
  });

  document.querySelectorAll('.cartao-curso, .cartao-passo, .cartao-estatistica').forEach(el => {
    observador.observe(el);
  });
}
