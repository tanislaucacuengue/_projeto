// ===== MÓDULO DE ADMINISTRADOR =====

let tabAdminAtiva = 'estatisticas';

// Carregar painel de administrador
async function carregarAdmin() {
  if (!estaAutenticado()) {
    navegarPara('inicio');
    abrirModal('modal-login');
    return;
  }

  if (!eAdmin()) {
    mostrarToast('Acesso restrito a administradores.', 'erro');
    navegarPara('inicio');
    return;
  }

  const container = document.getElementById('conteudo-admin');
  container.innerHTML = `
    <div class="admin-container">
      <div class="admin-cabecalho">
        <h1>👨‍💼 Painel de Administrador</h1>
        <p style="color: rgba(255,255,255,0.5); margin-top: 4px;">Gerir a plataforma RobotTech Academy</p>
      </div>

      <div class="tabs-admin">
        <button class="tab-btn ativo" onclick="mudarTabAdmin('estatisticas', this)">📊 Estatísticas</button>
        <button class="tab-btn" onclick="mudarTabAdmin('cursos', this)">📚 Cursos</button>
        <button class="tab-btn" onclick="mudarTabAdmin('alunos', this)">👥 Alunos</button>
        <button class="tab-btn" onclick="mudarTabAdmin('criar-curso', this)">➕ Criar Curso</button>
        <button class="tab-btn" onclick="mudarTabAdmin('adicionar-aula', this)">🎬 Adicionar Aula</button>
      </div>

      <div id="painel-estatisticas" class="painel-tab ativo">
        <div class="carregando"><div class="spinner"></div> A carregar estatísticas...</div>
      </div>

      <div id="painel-cursos" class="painel-tab">
        <div class="carregando"><div class="spinner"></div> A carregar cursos...</div>
      </div>

      <div id="painel-alunos" class="painel-tab">
        <div class="carregando"><div class="spinner"></div> A carregar alunos...</div>
      </div>

      <div id="painel-criar-curso" class="painel-tab">
        ${criarFormularioCurso()}
      </div>

      <div id="painel-adicionar-aula" class="painel-tab">
        ${criarFormularioAula()}
      </div>
    </div>
  `;

  await carregarEstatisticasAdmin();
}

// Mudar tab do admin
async function mudarTabAdmin(tab, botao) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('ativo'));
  document.querySelectorAll('.painel-tab').forEach(painel => painel.classList.remove('ativo'));

  botao.classList.add('ativo');
  const painel = document.getElementById(`painel-${tab}`);
  if (painel) painel.classList.add('ativo');

  tabAdminAtiva = tab;

  if (tab === 'estatisticas') await carregarEstatisticasAdmin();
  else if (tab === 'cursos') await carregarCursosAdmin();
  else if (tab === 'alunos') await carregarAlunosAdmin();
  else if (tab === 'adicionar-aula') await carregarSelectCursosAdmin();
}

// Carregar estatísticas
async function carregarEstatisticasAdmin() {
  const painel = document.getElementById('painel-estatisticas');

  try {
    const stats = await apiAdmin.obterEstatisticas();

    painel.innerHTML = `
      <div class="grelha-estatisticas">
        <div class="cartao-estatistica-admin">
          <div class="numero">${stats.total_alunos}</div>
          <div class="label">👥 Total de Alunos</div>
        </div>
        <div class="cartao-estatistica-admin">
          <div class="numero">${stats.total_cursos}</div>
          <div class="label">📚 Total de Cursos</div>
        </div>
        <div class="cartao-estatistica-admin">
          <div class="numero">${stats.total_inscricoes}</div>
          <div class="label">📝 Total de Inscrições</div>
        </div>
        <div class="cartao-estatistica-admin">
          <div class="numero">${stats.total_certificados}</div>
          <div class="label">🏆 Certificados Emitidos</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 8px;">
        <div class="tabela-container">
          <div style="padding: 16px 20px; border-bottom: 1px solid rgba(139,92,246,0.2);">
            <h3 style="font-size: 1rem; color: #a78bfa;">🏆 Cursos Mais Populares</h3>
          </div>
          <table class="tabela-admin">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Inscritos</th>
              </tr>
            </thead>
            <tbody>
              ${stats.cursos_populares.map(c => `
                <tr>
                  <td>${c.titulo}</td>
                  <td><strong style="color: #a78bfa;">${c.total_inscritos}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="tabela-container">
          <div style="padding: 16px 20px; border-bottom: 1px solid rgba(139,92,246,0.2);">
            <h3 style="font-size: 1rem; color: #a78bfa;">👥 Alunos Recentes</h3>
          </div>
          <table class="tabela-admin">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              ${stats.alunos_recentes.map(a => `
                <tr>
                  <td>${a.nome}</td>
                  <td style="font-size: 0.8rem; color: rgba(255,255,255,0.5);">${new Date(a.data_registo).toLocaleDateString('pt-PT')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (erro) {
    painel.innerHTML = `<p style="color: #f87171; padding: 20px;">Erro: ${erro.message}</p>`;
  }
}

// Carregar cursos no admin
async function carregarCursosAdmin() {
  const painel = document.getElementById('painel-cursos');

  try {
    const resultado = await apiAdmin.listarCursos();
    const { cursos } = resultado;

    painel.innerHTML = `
      <div class="tabela-container">
        <div style="padding: 16px 20px; border-bottom: 1px solid rgba(139,92,246,0.2); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 1rem; color: #a78bfa;">📚 Gestão de Cursos</h3>
          <button class="botao-primario" style="padding: 8px 16px; font-size: 0.85rem;" onclick="mudarTabAdmin('criar-curso', document.querySelector('.tab-btn:nth-child(4)'))">+ Novo Curso</button>
        </div>
        <table class="tabela-admin">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Nível</th>
              <th>Aulas</th>
              <th>Inscritos</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${cursos.map(curso => `
              <tr>
                <td><strong>${curso.titulo}</strong></td>
                <td style="font-size: 0.85rem;">${curso.categoria || '-'}</td>
                <td><span class="nivel-badge nivel-${curso.nivel}">${{ 'iniciante': 'Iniciante', 'intermedio': 'Intermédio', 'avancado': 'Avançado' }[curso.nivel] || curso.nivel}</span></td>
                <td>${curso.total_aulas}</td>
                <td>${curso.total_inscritos}</td>
                <td>
                  <span style="color: ${curso.publicado ? '#34d399' : '#f87171'}; font-size: 0.85rem;">
                    ${curso.publicado ? '✅ Publicado' : '⏸️ Oculto'}
                  </span>
                </td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="botao-secundario" style="padding: 6px 10px; font-size: 0.8rem;" onclick="editarCurso('${curso.id_curso}', '${encodeURIComponent(JSON.stringify(curso))}')">✏️</button>
                    <button class="botao-perigo" style="padding: 6px 10px; font-size: 0.8rem;" onclick="eliminarCurso('${curso.id_curso}', '${curso.titulo}')">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (erro) {
    painel.innerHTML = `<p style="color: #f87171; padding: 20px;">Erro: ${erro.message}</p>`;
  }
}

// Carregar alunos no admin
async function carregarAlunosAdmin() {
  const painel = document.getElementById('painel-alunos');

  try {
    const resultado = await apiAdmin.listarAlunos();
    const { alunos } = resultado;

    painel.innerHTML = `
      <div class="tabela-container">
        <div style="padding: 16px 20px; border-bottom: 1px solid rgba(139,92,246,0.2);">
          <h3 style="font-size: 1rem; color: #a78bfa;">👥 Gestão de Alunos (${alunos.length} total)</h3>
        </div>
        <table class="tabela-admin">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cursos</th>
              <th>Certificados</th>
              <th>Data de Registo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${alunos.map(aluno => `
              <tr>
                <td><strong>${aluno.nome}</strong></td>
                <td style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">${aluno.email}</td>
                <td><span style="color: #a78bfa; font-weight: 700;">${aluno.cursos_inscritos}</span></td>
                <td><span style="color: #fbbf24; font-weight: 700;">${aluno.certificados}</span></td>
                <td style="font-size: 0.8rem; color: rgba(255,255,255,0.5);">${new Date(aluno.data_registo).toLocaleDateString('pt-PT')}</td>
                <td><span style="color: ${aluno.ativo ? '#34d399' : '#f87171'}; font-size: 0.85rem;">${aluno.ativo ? '✅ Ativo' : '❌ Inativo'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (erro) {
    painel.innerHTML = `<p style="color: #f87171; padding: 20px;">Erro: ${erro.message}</p>`;
  }
}

// Criar formulário de novo curso
function criarFormularioCurso() {
  return `
    <div class="formulario-admin">
      <h3>➕ Criar Novo Curso</h3>
      <form onsubmit="submeterNovoCurso(event)">
        <div class="grelha-formulario">
          <div class="campo-formulario">
            <label>Título do Curso *</label>
            <input type="text" id="novo-curso-titulo" placeholder="Ex: Curso de Python Avançado" required />
          </div>
          <div class="campo-formulario">
            <label>Categoria</label>
            <select id="novo-curso-categoria">
              <option value="programacao">Programação</option>
              <option value="robotica">Robótica</option>
              <option value="cansats">Cansats</option>
              <option value="computacao-grafica">Computação Gráfica</option>
              <option value="eletronica">Eletrónica</option>
            </select>
          </div>
          <div class="campo-formulario">
            <label>Nível</label>
            <select id="novo-curso-nivel">
              <option value="iniciante">Iniciante</option>
              <option value="intermedio">Intermédio</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>
          <div class="campo-formulario">
            <label>Duração (horas)</label>
            <input type="number" id="novo-curso-duracao" placeholder="Ex: 20" min="1" />
          </div>
        </div>
        <div class="campo-formulario">
          <label>Descrição</label>
          <textarea id="novo-curso-descricao" rows="4" placeholder="Descreve o curso..."></textarea>
        </div>
        <div id="mensagem-novo-curso" class="oculto"></div>
        <button type="submit" class="botao-primario">Criar Curso</button>
      </form>
    </div>

    <div class="formulario-admin" style="margin-top: 24px;">
      <h3>📁 Adicionar Módulo a Curso Existente</h3>
      <form onsubmit="submeterNovoModulo(event)">
        <div class="grelha-formulario">
          <div class="campo-formulario">
            <label>Curso</label>
            <select id="modulo-id-curso">
              <option value="">A carregar cursos...</option>
            </select>
          </div>
          <div class="campo-formulario">
            <label>Título do Módulo *</label>
            <input type="text" id="novo-modulo-titulo" placeholder="Ex: Módulo 1 — Introdução" required />
          </div>
          <div class="campo-formulario">
            <label>Ordem</label>
            <input type="number" id="novo-modulo-ordem" placeholder="Ex: 1" min="1" />
          </div>
        </div>
        <div id="mensagem-novo-modulo" class="oculto"></div>
        <button type="submit" class="botao-secundario">Adicionar Módulo</button>
      </form>
    </div>
  `;
}

// Criar formulário de nova aula
function criarFormularioAula() {
  return `
    <div class="formulario-admin">
      <h3>🎬 Adicionar Nova Aula</h3>
      <form onsubmit="submeterNovaAula(event)">
        <div class="grelha-formulario">
          <div class="campo-formulario">
            <label>Curso</label>
            <select id="aula-id-curso" onchange="carregarModulosDoCurso(this.value)">
              <option value="">Seleciona um curso...</option>
            </select>
          </div>
          <div class="campo-formulario">
            <label>Módulo</label>
            <select id="aula-id-modulo">
              <option value="">Seleciona um módulo...</option>
            </select>
          </div>
        </div>
        <div class="grelha-formulario">
          <div class="campo-formulario">
            <label>Título da Aula *</label>
            <input type="text" id="nova-aula-titulo" placeholder="Ex: Introdução ao Python" required />
          </div>
          <div class="campo-formulario">
            <label>Duração (minutos)</label>
            <input type="number" id="nova-aula-duracao" placeholder="Ex: 30" min="1" />
          </div>
        </div>
        <div class="campo-formulario">
          <label>URL do Vídeo (YouTube ou direto)</label>
          <input type="url" id="nova-aula-video" placeholder="https://www.youtube.com/watch?v=..." />
        </div>
        <div class="campo-formulario">
          <label>Descrição da Aula</label>
          <textarea id="nova-aula-descricao" rows="3" placeholder="Descreve o conteúdo da aula..."></textarea>
        </div>
        <div id="mensagem-nova-aula" class="oculto"></div>
        <button type="submit" class="botao-primario">Adicionar Aula</button>
      </form>
    </div>
  `;
}

// Carregar selects de cursos para admin
async function carregarSelectCursosAdmin() {
  try {
    const resultado = await apiAdmin.listarCursos();
    const { cursos } = resultado;

    const selects = ['modulo-id-curso', 'aula-id-curso'];
    selects.forEach(idSelect => {
      const select = document.getElementById(idSelect);
      if (select) {
        select.innerHTML = '<option value="">Seleciona um curso...</option>' +
          cursos.map(c => `<option value="${c.id_curso}">${c.titulo}</option>`).join('');
      }
    });
  } catch {}
}

// Carregar módulos de um curso para o select
async function carregarModulosDoCurso(idCurso) {
  const selectModulo = document.getElementById('aula-id-modulo');
  if (!selectModulo || !idCurso) return;

  selectModulo.innerHTML = '<option value="">A carregar...</option>';

  try {
    const resultado = await apiCursos.obterDetalhe(idCurso);
    selectModulo.innerHTML = '<option value="">Seleciona um módulo...</option>' +
      resultado.modulos.map(m => `<option value="${m.id_modulo}">${m.titulo}</option>`).join('');
  } catch {
    selectModulo.innerHTML = '<option value="">Erro ao carregar módulos</option>';
  }
}

// Submeter novo curso
async function submeterNovoCurso(evento) {
  evento.preventDefault();
  const mensagemDiv = document.getElementById('mensagem-novo-curso');

  const dados = {
    titulo: document.getElementById('novo-curso-titulo').value,
    descricao: document.getElementById('novo-curso-descricao').value,
    categoria: document.getElementById('novo-curso-categoria').value,
    nivel: document.getElementById('novo-curso-nivel').value,
    duracao_horas: parseInt(document.getElementById('novo-curso-duracao').value) || 0
  };

  try {
    await apiAdmin.criarCurso(dados);
    mensagemDiv.className = 'mensagem-sucesso';
    mensagemDiv.textContent = '✅ Curso criado com sucesso!';
    mensagemDiv.classList.remove('oculto');
    evento.target.reset();
    setTimeout(() => mensagemDiv.classList.add('oculto'), 3000);
  } catch (erro) {
    mensagemDiv.className = 'mensagem-erro';
    mensagemDiv.textContent = erro.message;
    mensagemDiv.classList.remove('oculto');
  }
}

// Submeter novo módulo
async function submeterNovoModulo(evento) {
  evento.preventDefault();
  const mensagemDiv = document.getElementById('mensagem-novo-modulo');
  const idCurso = document.getElementById('modulo-id-curso').value;

  if (!idCurso) {
    mensagemDiv.className = 'mensagem-erro';
    mensagemDiv.textContent = 'Seleciona um curso.';
    mensagemDiv.classList.remove('oculto');
    return;
  }

  try {
    await apiAdmin.criarModulo(idCurso, {
      titulo: document.getElementById('novo-modulo-titulo').value,
      ordem: parseInt(document.getElementById('novo-modulo-ordem').value) || 1
    });
    mensagemDiv.className = 'mensagem-sucesso';
    mensagemDiv.textContent = '✅ Módulo criado com sucesso!';
    mensagemDiv.classList.remove('oculto');
    evento.target.reset();
  } catch (erro) {
    mensagemDiv.className = 'mensagem-erro';
    mensagemDiv.textContent = erro.message;
    mensagemDiv.classList.remove('oculto');
  }
}

// Submeter nova aula
async function submeterNovaAula(evento) {
  evento.preventDefault();
  const mensagemDiv = document.getElementById('mensagem-nova-aula');
  const idModulo = document.getElementById('aula-id-modulo').value;

  if (!idModulo) {
    mensagemDiv.className = 'mensagem-erro';
    mensagemDiv.textContent = 'Seleciona um módulo.';
    mensagemDiv.classList.remove('oculto');
    return;
  }

  try {
    await apiAdmin.criarAula(idModulo, {
      titulo: document.getElementById('nova-aula-titulo').value,
      descricao: document.getElementById('nova-aula-descricao').value,
      video_url: document.getElementById('nova-aula-video').value,
      duracao_minutos: parseInt(document.getElementById('nova-aula-duracao').value) || 0
    });
    mensagemDiv.className = 'mensagem-sucesso';
    mensagemDiv.textContent = '✅ Aula adicionada com sucesso!';
    mensagemDiv.classList.remove('oculto');
    evento.target.reset();
  } catch (erro) {
    mensagemDiv.className = 'mensagem-erro';
    mensagemDiv.textContent = erro.message;
    mensagemDiv.classList.remove('oculto');
  }
}

// Eliminar curso
async function eliminarCurso(idCurso, titulo) {
  if (!confirm(`Tens a certeza que queres eliminar o curso "${titulo}"? Esta ação é irreversível.`)) return;

  try {
    await apiAdmin.eliminarCurso(idCurso);
    mostrarToast('Curso eliminado com sucesso!', 'sucesso');
    await carregarCursosAdmin();
  } catch (erro) {
    mostrarToast('Erro ao eliminar: ' + erro.message, 'erro');
  }
}

// Editar curso (simplificado)
function editarCurso(idCurso, dadosCodificados) {
  try {
    const curso = JSON.parse(decodeURIComponent(dadosCodificados));
    const novoTitulo = prompt('Novo título do curso:', curso.titulo);
    if (!novoTitulo) return;

    apiAdmin.atualizarCurso(idCurso, { ...curso, titulo: novoTitulo }).then(() => {
      mostrarToast('Curso atualizado!', 'sucesso');
      carregarCursosAdmin();
    }).catch(erro => mostrarToast('Erro: ' + erro.message, 'erro'));
  } catch {}
}
