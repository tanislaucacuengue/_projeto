// ===== MÓDULO DE AUTENTICAÇÃO =====

let utilizadorAtual = null;

// Inicializar estado de autenticação
function inicializarAutenticacao() {
  const token = localStorage.getItem('robottech_token');
  const dadosUtilizador = localStorage.getItem('robottech_utilizador');

  if (token && dadosUtilizador) {
    try {
      utilizadorAtual = JSON.parse(dadosUtilizador);
      atualizarInterfaceAutenticado();
    } catch (e) {
      terminarSessao();
    }
  }
}

// Atualizar interface quando autenticado
function atualizarInterfaceAutenticado() {
  const navNaoAutenticado = document.getElementById('nav-nao-autenticado');
  const navAutenticado = document.getElementById('nav-autenticado');
  const nomeNav = document.getElementById('nome-nav-utilizador');
  const linkAdmin = document.getElementById('link-admin-menu');

  if (utilizadorAtual) {
    navNaoAutenticado.classList.add('oculto');
    navAutenticado.classList.remove('oculto');
    nomeNav.textContent = utilizadorAtual.nome.split(' ')[0];

    if (utilizadorAtual.papel === 'admin') {
      linkAdmin.classList.remove('oculto');
    }
  } else {
    navNaoAutenticado.classList.remove('oculto');
    navAutenticado.classList.add('oculto');
    linkAdmin.classList.add('oculto');
  }
}

// Submeter formulário de login
async function submeterLogin(evento) {
  evento.preventDefault();

  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;
  const botao = document.getElementById('botao-login');
  const erroDiv = document.getElementById('erro-login');

  botao.disabled = true;
  botao.innerHTML = '<div class="spinner" style="width:20px;height:20px;margin:0"></div>';
  erroDiv.classList.add('oculto');

  try {
    const resultado = await apiAutenticacao.entrar(email, senha);

    localStorage.setItem('robottech_token', resultado.token);
    localStorage.setItem('robottech_utilizador', JSON.stringify(resultado.utilizador));
    utilizadorAtual = resultado.utilizador;

    atualizarInterfaceAutenticado();
    fecharModal('modal-login');
    mostrarToast('Bem-vindo de volta, ' + resultado.utilizador.nome.split(' ')[0] + '! 🚀', 'sucesso');

    if (resultado.utilizador.papel === 'admin') {
      setTimeout(() => navegarPara('admin'), 500);
    }
  } catch (erro) {
    erroDiv.textContent = erro.message;
    erroDiv.classList.remove('oculto');
  } finally {
    botao.disabled = false;
    botao.innerHTML = '<span>Entrar</span>';
  }
}

// Submeter formulário de registo
async function submeterRegisto(evento) {
  evento.preventDefault();

  const nome = document.getElementById('registo-nome').value;
  const email = document.getElementById('registo-email').value;
  const senha = document.getElementById('registo-senha').value;
  const botao = document.getElementById('botao-registo');
  const erroDiv = document.getElementById('erro-registo');

  botao.disabled = true;
  botao.innerHTML = '<div class="spinner" style="width:20px;height:20px;margin:0"></div>';
  erroDiv.classList.add('oculto');

  try {
    const resultado = await apiAutenticacao.registar(nome, email, senha);

    localStorage.setItem('robottech_token', resultado.token);
    localStorage.setItem('robottech_utilizador', JSON.stringify(resultado.utilizador));
    utilizadorAtual = resultado.utilizador;

    atualizarInterfaceAutenticado();
    fecharModal('modal-registo');
    mostrarToast('Conta criada com sucesso! Bem-vindo à RobotTech Academy! 🎉', 'sucesso');
  } catch (erro) {
    erroDiv.textContent = erro.message;
    erroDiv.classList.remove('oculto');
  } finally {
    botao.disabled = false;
    botao.innerHTML = '<span>Criar Conta</span>';
  }
}

// Terminar sessão
function terminarSessao() {
  localStorage.removeItem('robottech_token');
  localStorage.removeItem('robottech_utilizador');
  utilizadorAtual = null;
  atualizarInterfaceAutenticado();
  fecharMenuPerfil();
  navegarPara('inicio');
  mostrarToast('Sessão terminada com sucesso.', 'info');
}

// Verificar se está autenticado
function estaAutenticado() {
  return utilizadorAtual !== null && localStorage.getItem('robottech_token') !== null;
}

// Verificar se é admin
function eAdmin() {
  return utilizadorAtual && utilizadorAtual.papel === 'admin';
}

// Exigir autenticação
function exigirAutenticacao(acaoAposLogin = null) {
  if (!estaAutenticado()) {
    if (acaoAposLogin) {
      window._acaoAposLogin = acaoAposLogin;
    }
    abrirModal('modal-login');
    return false;
  }
  return true;
}

// Alternar visibilidade da senha
function alternarSenha(idCampo) {
  const campo = document.getElementById(idCampo);
  campo.type = campo.type === 'password' ? 'text' : 'password';
}

// Alternar menu de perfil
function alternarMenuPerfil() {
  const menu = document.getElementById('menu-perfil');
  const navPerfil = document.querySelector('.nav-perfil');
  menu.classList.toggle('oculto');
  navPerfil.classList.toggle('aberto');
}

// Fechar menu de perfil
function fecharMenuPerfil() {
  const menu = document.getElementById('menu-perfil');
  const navPerfil = document.querySelector('.nav-perfil');
  if (menu) menu.classList.add('oculto');
  if (navPerfil) navPerfil.classList.remove('aberto');
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(evento) {
  const navPerfil = document.querySelector('.nav-perfil');
  const menuPerfil = document.getElementById('menu-perfil');
  if (navPerfil && menuPerfil && !navPerfil.contains(evento.target)) {
    fecharMenuPerfil();
  }
});
