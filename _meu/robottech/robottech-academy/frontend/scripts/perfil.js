// ===== MÓDULO DE PERFIL =====

// Carregar página de perfil
async function carregarPerfil() {
  if (!exigirAutenticacao()) return;

  const container = document.getElementById('conteudo-perfil');
  container.innerHTML = '<div class="carregando"><div class="spinner"></div> A carregar perfil...</div>';

  try {
    const resultado = await apiAutenticacao.obterPerfil();
    const { utilizador } = resultado;

    const dataRegisto = new Date(utilizador.data_registo).toLocaleDateString('pt-PT', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    container.innerHTML = `
      <div class="perfil-container">
        <div class="perfil-cabecalho">
          <div class="avatar-grande">
            <svg viewBox="0 0 24 24" fill="white"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
          <div class="perfil-info">
            <h2>${utilizador.nome}</h2>
            <p>${utilizador.email}</p>
            <p class="data-registo">📅 Membro desde ${dataRegisto}</p>
            ${utilizador.papel === 'admin' ? '<span style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; color: #a78bfa; margin-top: 8px; display: inline-block;">👑 Administrador</span>' : ''}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- Editar Perfil -->
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(139,92,246,0.3); border-radius: 16px; padding: 28px; backdrop-filter: blur(16px);">
            <h3 style="font-family: 'Orbitron', monospace; font-size: 1.1rem; color: #a78bfa; margin-bottom: 20px;">✏️ Editar Perfil</h3>
            <form onsubmit="atualizarPerfil(event)">
              <div class="campo-formulario">
                <label>Nome Completo</label>
                <input type="text" id="perfil-nome" value="${utilizador.nome}" />
              </div>
              <div class="campo-formulario">
                <label>Email</label>
                <input type="email" value="${utilizador.email}" disabled style="opacity: 0.5;" />
              </div>
              <div id="mensagem-perfil" class="oculto"></div>
              <button type="submit" class="botao-primario">Guardar Alterações</button>
            </form>
          </div>

          <!-- Alterar Senha -->
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(139,92,246,0.3); border-radius: 16px; padding: 28px; backdrop-filter: blur(16px);">
            <h3 style="font-family: 'Orbitron', monospace; font-size: 1.1rem; color: #a78bfa; margin-bottom: 20px;">🔒 Alterar Senha</h3>
            <form onsubmit="alterarSenha(event)">
              <div class="campo-formulario">
                <label>Senha Atual</label>
                <div class="campo-senha">
                  <input type="password" id="senha-atual" placeholder="A tua senha atual" />
                  <button type="button" class="botao-ver-senha" onclick="alternarSenha('senha-atual')">👁</button>
                </div>
              </div>
              <div class="campo-formulario">
                <label>Nova Senha</label>
                <div class="campo-senha">
                  <input type="password" id="nova-senha" placeholder="Mínimo 6 caracteres" minlength="6" />
                  <button type="button" class="botao-ver-senha" onclick="alternarSenha('nova-senha')">👁</button>
                </div>
              </div>
              <div id="mensagem-senha" class="oculto"></div>
              <button type="submit" class="botao-secundario">Alterar Senha</button>
            </form>
          </div>
        </div>

        <div style="margin-top: 24px; background: rgba(255,255,255,0.04); border: 1px solid rgba(139,92,246,0.3); border-radius: 16px; padding: 28px; backdrop-filter: blur(16px);">
          <h3 style="font-family: 'Orbitron', monospace; font-size: 1.1rem; color: #a78bfa; margin-bottom: 20px;">⚡ Acções Rápidas</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="botao-secundario" onclick="navegarPara('meus-cursos')">📚 Ver Meus Cursos</button>
            <button class="botao-secundario" onclick="navegarPara('certificados')">🏆 Ver Certificados</button>
            ${utilizador.papel === 'admin' ? '<button class="botao-primario" onclick="navegarPara(\'admin\')">👨‍💼 Painel Admin</button>' : ''}
            <button class="botao-perigo" onclick="confirmarTerminarSessao()">🚪 Terminar Sessão</button>
          </div>
        </div>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = `<p style="color: #f87171; text-align: center; padding: 40px;">Erro ao carregar perfil: ${erro.message}</p>`;
  }
}

// Atualizar perfil
async function atualizarPerfil(evento) {
  evento.preventDefault();
  const nome = document.getElementById('perfil-nome').value;
  const mensagemDiv = document.getElementById('mensagem-perfil');

  try {
    await apiAutenticacao.atualizarPerfil({ nome });

    // Atualizar dados locais
    utilizadorAtual.nome = nome;
    localStorage.setItem('robottech_utilizador', JSON.stringify(utilizadorAtual));
    document.getElementById('nome-nav-utilizador').textContent = nome.split(' ')[0];

    mensagemDiv.className = 'mensagem-sucesso';
    mensagemDiv.textContent = '✅ Perfil atualizado com sucesso!';
    mensagemDiv.classList.remove('oculto');
    setTimeout(() => mensagemDiv.classList.add('oculto'), 3000);
  } catch (erro) {
    mensagemDiv.className = 'mensagem-erro';
    mensagemDiv.textContent = erro.message;
    mensagemDiv.classList.remove('oculto');
  }
}

// Alterar senha
async function alterarSenha(evento) {
  evento.preventDefault();
  const senhaAtual = document.getElementById('senha-atual').value;
  const novaSenha = document.getElementById('nova-senha').value;
  const mensagemDiv = document.getElementById('mensagem-senha');

  try {
    await apiAutenticacao.atualizarPerfil({ senhaAtual, novaSenha });
    mensagemDiv.className = 'mensagem-sucesso';
    mensagemDiv.textContent = '✅ Senha alterada com sucesso!';
    mensagemDiv.classList.remove('oculto');
    document.getElementById('senha-atual').value = '';
    document.getElementById('nova-senha').value = '';
    setTimeout(() => mensagemDiv.classList.add('oculto'), 3000);
  } catch (erro) {
    mensagemDiv.className = 'mensagem-erro';
    mensagemDiv.textContent = erro.message;
    mensagemDiv.classList.remove('oculto');
  }
}

// Confirmar terminar sessão
function confirmarTerminarSessao() {
  if (confirm('Tens a certeza que queres terminar a sessão?')) {
    terminarSessao();
  }
}

// ===== CERTIFICADOS =====

// Carregar página de certificados
async function carregarCertificados() {
  if (!exigirAutenticacao()) return;

  const container = document.getElementById('conteudo-certificados');
  container.innerHTML = `
    <div class="cabecalho-pagina">
      <h1 class="titulo-pagina">🏆 Os Meus Certificados</h1>
      <p class="subtitulo-pagina">Os teus certificados de conclusão de cursos</p>
    </div>
    <div style="max-width: 1000px; margin: 0 auto; padding: 0 24px 60px;">
      <div class="carregando"><div class="spinner"></div> A carregar certificados...</div>
    </div>
  `;

  try {
    const resultado = await apiCursos.listarCertificados();
    const { certificados } = resultado;

    const conteudoLista = container.querySelector('div:last-child');

    if (certificados.length === 0) {
      conteudoLista.innerHTML = `
        <div style="text-align: center; padding: 60px;">
          <div style="font-size: 4rem; margin-bottom: 16px;">🏆</div>
          <h3 style="margin-bottom: 12px;">Ainda não tens certificados</h3>
          <p style="color: rgba(255,255,255,0.5); margin-bottom: 24px;">Conclui um curso para receberes o teu primeiro certificado!</p>
          <button class="botao-primario" onclick="navegarPara('cursos')">Explorar Cursos</button>
        </div>
      `;
      return;
    }

    // Verificar certificado por código
    conteudoLista.innerHTML = `
      <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 20px; margin-bottom: 32px; backdrop-filter: blur(16px);">
        <h3 style="font-size: 0.95rem; color: #a78bfa; margin-bottom: 12px;">🔍 Verificar Certificado</h3>
        <div style="display: flex; gap: 12px;">
          <input type="text" id="codigo-verificacao" placeholder="Insere o código do certificado (ex: RT-ABC123-XYZ)" style="flex: 1; padding: 10px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(139,92,246,0.3); border-radius: 8px; color: white; font-size: 0.9rem;" />
          <button class="botao-primario" onclick="verificarCertificado()">Verificar</button>
        </div>
        <div id="resultado-verificacao" class="oculto" style="margin-top: 12px;"></div>
      </div>

      <div style="display: grid; gap: 20px;">
        ${certificados.map(cert => {
          const dataEmissao = new Date(cert.data_emissao).toLocaleDateString('pt-PT', {
            day: 'numeric', month: 'long', year: 'numeric'
          });
          return `
            <div class="certificado-visual" style="cursor: pointer;" onclick="mostrarCertificadoCompleto('${cert.id_certificado}')">
              <div style="font-size: 2.5rem; margin-bottom: 12px; position: relative; z-index: 1;">🏆</div>
              <div class="certificado-titulo">CERTIFICADO DE CONCLUSÃO</div>
              <div class="certificado-subtitulo">RobotTech Academy certifica que</div>
              <div class="certificado-nome">${cert.nome_aluno}</div>
              <div class="certificado-subtitulo">concluiu com sucesso o</div>
              <div class="certificado-curso">${cert.titulo_curso}</div>
              <div style="color: rgba(255,255,255,0.4); font-size: 0.85rem; margin-bottom: 16px; position: relative; z-index: 1;">
                Emitido em ${dataEmissao}
              </div>
              <div class="certificado-codigo">Código: ${cert.codigo_verificacao}</div>
              <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap;">
                <button class="botao-primario" onclick="event.stopPropagation(); imprimirCertificadoEspecifico('${cert.id_certificado}')">🖨️ Imprimir</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } catch (erro) {
    mostrarToast('Erro ao carregar certificados: ' + erro.message, 'erro');
  }
}

// Verificar certificado por código
async function verificarCertificado() {
  const codigo = document.getElementById('codigo-verificacao').value.trim();
  const resultadoDiv = document.getElementById('resultado-verificacao');

  if (!codigo) {
    mostrarToast('Insere um código de verificação.', 'info');
    return;
  }

  try {
    const resultado = await apiCursos.verificarCertificado(codigo);
    const { certificado } = resultado;
    const dataEmissao = new Date(certificado.data_emissao).toLocaleDateString('pt-PT', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    resultadoDiv.className = 'mensagem-sucesso';
    resultadoDiv.innerHTML = `✅ Certificado válido! <strong>${certificado.nome_aluno}</strong> concluiu o curso <strong>${certificado.titulo_curso}</strong> em ${dataEmissao}.`;
    resultadoDiv.classList.remove('oculto');
  } catch {
    resultadoDiv.className = 'mensagem-erro';
    resultadoDiv.textContent = '❌ Certificado não encontrado ou inválido.';
    resultadoDiv.classList.remove('oculto');
  }
}

// Imprimir certificado específico
function imprimirCertificadoEspecifico(idCertificado) {
  window.print();
}
