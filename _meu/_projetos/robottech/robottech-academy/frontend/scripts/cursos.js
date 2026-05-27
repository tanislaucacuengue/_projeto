// ===== MÓDULO DE CURSOS =====

let todosCursos = [];
let cursoAtual = null;

// Ícones por categoria
const iconesPorCategoria = {
  'programacao': '💻',
  'robotica': '🤖',
  'cansats': '🛰️',
  'computacao-grafica': '🎨',
  'eletronica': '⚡',
  'default': '📚'
};

// Cores de fundo por categoria
const coresPorCategoria = {
  'programacao': 'linear-gradient(135deg, #1a0a3d, #2d1b69, #3b1f8a)',
  'robotica': 'linear-gradient(135deg, #0a1628, #1e3a5f, #2d5a8e)',
  'cansats': 'linear-gradient(135deg, #0a1a1a, #0d3d3d, #0a5f5f)',
  'computacao-grafica': 'linear-gradient(135deg, #1a0a2d, #3d1a5f, #6b2fa0)',
  'eletronica': 'linear-gradient(135deg, #1a1a0a, #3d3d0a, #5f5f0a)',
  'default': 'linear-gradient(135deg, #1a0a3d, #2d1b69)'
};

// Carregar e renderizar cursos na página inicial
async function carregarCursosInicio() {
  const grelha = document.getElementById('grelha-cursos-inicio');
  if (!grelha) return;

  try {
    const resultado = await apiCursos.listarTodos();
    todosCursos = resultado.cursos;
    const cursosDestaque = todosCursos.slice(0, 4);
    grelha.innerHTML = cursosDestaque.map(curso => criarHtmlCartaoCurso(curso)).join('');
  } catch (erro) {
    grelha.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; grid-column: 1/-1;">Erro ao carregar cursos.</p>';
  }
}

// Carregar todos os cursos na página de catálogo
async function carregarTodosCursos() {
  const grelha = document.getElementById('grelha-todos-cursos');
  if (!grelha) return;

  grelha.innerHTML = '<div class="carregando"><div class="spinner"></div> A carregar cursos...</div>';

  try {
    if (todosCursos.length === 0) {
      const resultado = await apiCursos.listarTodos();
      todosCursos = resultado.cursos;
    }
    renderizarGrelha(todosCursos, grelha);
  } catch (erro) {
    grelha.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; grid-column: 1/-1;">Erro ao carregar cursos.</p>';
  }
}

// Renderizar grelha de cursos
function renderizarGrelha(cursos, grelha) {
  if (cursos.length === 0) {
    grelha.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; grid-column: 1/-1; padding: 40px;">Nenhum curso encontrado nesta categoria.</p>';
    return;
  }
  grelha.innerHTML = cursos.map(curso => criarHtmlCartaoCurso(curso)).join('');
}

// Criar HTML de um cartão de curso
function criarHtmlCartaoCurso(curso) {
  const icone = iconesPorCategoria[curso.categoria] || iconesPorCategoria['default'];
  const corFundo = coresPorCategoria[curso.categoria] || coresPorCategoria['default'];
  const nivelLabel = { 'iniciante': 'Iniciante', 'intermedio': 'Intermédio', 'avancado': 'Avançado' }[curso.nivel] || curso.nivel;
  const categoriaLabel = {
    'programacao': 'Programação',
    'robotica': 'Robótica',
    'cansats': 'Cansats',
    'computacao-grafica': 'Computação Gráfica',
    'eletronica': 'Eletrónica'
  }[curso.categoria] || curso.categoria;

  return `
    <div class="cartao-curso" onclick="abrirDetalhesCurso('${curso.id_curso}')">
      <div class="cartao-curso-capa" style="background: ${corFundo}">
        <span class="icone-curso">${icone}</span>
      </div>
      <div class="cartao-curso-corpo">
        <span class="cartao-curso-categoria">${categoriaLabel}</span>
        <h3 class="cartao-curso-titulo">${curso.titulo}</h3>
        <p class="cartao-curso-descricao">${curso.descricao || ''}</p>
        <div class="cartao-curso-info">
          <span class="info-item">📚 ${curso.total_aulas || 0} aulas</span>
          <span class="info-item">⏱️ ${curso.duracao_horas}h</span>
          <span class="info-item">👥 ${curso.total_inscritos || 0} alunos</span>
        </div>
        <div class="cartao-curso-rodape">
          <span class="nivel-badge nivel-${curso.nivel}">${nivelLabel}</span>
          <button class="botao-primario" style="padding: 8px 16px; font-size: 0.8rem;">Ver Curso →</button>
        </div>
      </div>
    </div>
  `;
}

// Filtrar cursos por categoria
function filtrarCursos(categoria, botao) {
  document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('ativo'));
  botao.classList.add('ativo');

  const grelha = document.getElementById('grelha-todos-cursos');
  const cursosFiltrados = categoria === 'todos'
    ? todosCursos
    : todosCursos.filter(c => c.categoria === categoria);

  renderizarGrelha(cursosFiltrados, grelha);
}

// Abrir detalhes de um curso
async function abrirDetalhesCurso(idCurso) {
  navegarPara('detalhe-curso');
  const container = document.getElementById('conteudo-detalhe-curso');
  container.innerHTML = '<div class="carregando"><div class="spinner"></div> A carregar...</div>';

  try {
    const resultado = await apiCursos.obterDetalhe(idCurso);
    cursoAtual = resultado.curso;
    const { curso, modulos } = resultado;

    let progressoHtml = '';
    let botaoInscricaoHtml = '';

    if (estaAutenticado()) {
      try {
        const progresso = await apiCursos.obterProgresso(idCurso);
        progressoHtml = `
          <div class="barra-progresso-container">
            <div class="barra-progresso-label">
              <span>Progresso</span>
              <span>${progresso.percentagem}%</span>
            </div>
            <div class="barra-progresso">
              <div class="barra-progresso-preenchimento" style="width: ${progresso.percentagem}%"></div>
            </div>
            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-top: 6px;">${progresso.aulas_concluidas} de ${progresso.total_aulas} aulas concluídas</p>
          </div>
        `;
        botaoInscricaoHtml = progresso.total_aulas > 0
          ? `<button class="botao-primario botao-completo" onclick="continuarCurso('${idCurso}', ${JSON.stringify(modulos).replace(/"/g, '&quot;')})">Continuar Curso →</button>`
          : `<button class="botao-primario botao-completo" onclick="inscreverNoCurso('${idCurso}')">Inscrever-me Agora</button>`;
      } catch {
        botaoInscricaoHtml = `<button class="botao-primario botao-completo" onclick="inscreverNoCurso('${idCurso}')">Inscrever-me Agora</button>`;
      }
    } else {
      botaoInscricaoHtml = `<button class="botao-primario botao-completo" onclick="abrirModal('modal-login')">Entrar para Inscrever</button>`;
    }

    const icone = iconesPorCategoria[curso.categoria] || '📚';
    const corFundo = coresPorCategoria[curso.categoria] || coresPorCategoria['default'];

    container.innerHTML = `
      <div class="detalhe-curso-container">
        <button class="botao-secundario" onclick="navegarPara('cursos')" style="margin-bottom: 24px;">← Voltar aos Cursos</button>
        <div class="detalhe-curso-cabecalho">
          <div class="detalhe-curso-info">
            <div style="font-size: 4rem; margin-bottom: 16px;">${icone}</div>
            <h1>${curso.titulo}</h1>
            <p>${curso.descricao || ''}</p>
            <div class="detalhe-curso-meta">
              <span class="meta-item">📚 ${curso.total_aulas || 0} aulas</span>
              <span class="meta-item">⏱️ ${curso.duracao_horas} horas</span>
              <span class="meta-item">👥 ${curso.total_inscritos || 0} inscritos</span>
              <span class="nivel-badge nivel-${curso.nivel}" style="margin: 0;">${{ 'iniciante': 'Iniciante', 'intermedio': 'Intermédio', 'avancado': 'Avançado' }[curso.nivel]}</span>
            </div>
          </div>
          <div class="cartao-inscricao">
            <h3>📋 Inscrição no Curso</h3>
            ${progressoHtml}
            ${botaoInscricaoHtml}
            <div style="margin-top: 16px; font-size: 0.85rem; color: rgba(255,255,255,0.5); text-align: center;">
              ✅ Acesso vitalício &nbsp;|&nbsp; 🏆 Certificado incluído
            </div>
          </div>
        </div>

        <h2 class="titulo-secao" style="text-align: left; font-size: 1.4rem; margin-bottom: 24px;">Conteúdo do Curso</h2>
        <div class="lista-modulos">
          ${modulos.map((modulo, idx) => `
            <div class="cartao-modulo">
              <div class="cabecalho-modulo" onclick="alternarModulo('modulo-${idx}')">
                <h3>📁 ${modulo.titulo}</h3>
                <span style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">${modulo.aulas.length} aulas ▾</span>
              </div>
              <div class="lista-aulas" id="modulo-${idx}">
                ${modulo.aulas.map((aula, idxAula) => `
                  <div class="item-aula" onclick="abrirAula('${aula.id_aula}', '${idCurso}')">
                    <div class="icone-aula">▶</div>
                    <div class="info-aula">
                      <div class="titulo-aula-item">${aula.titulo}</div>
                      <div class="duracao-aula">⏱️ ${aula.duracao_minutos} min</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = `<p style="color: #f87171; text-align: center; padding: 40px;">Erro ao carregar curso: ${erro.message}</p>`;
  }
}

// Inscrever no curso
async function inscreverNoCurso(idCurso) {
  if (!exigirAutenticacao()) return;

  try {
    await apiCursos.inscrever(idCurso);
    mostrarToast('Inscrição realizada com sucesso! 🎉', 'sucesso');
    abrirDetalhesCurso(idCurso);
  } catch (erro) {
    if (erro.message.includes('Já estás inscrito')) {
      mostrarToast('Já estás inscrito neste curso!', 'info');
      abrirDetalhesCurso(idCurso);
    } else {
      mostrarToast('Erro ao inscrever: ' + erro.message, 'erro');
    }
  }
}

// Continuar curso (abrir primeira aula não concluída)
async function continuarCurso(idCurso, modulos) {
  try {
    const progresso = await apiCursos.obterProgresso(idCurso);
    const aulasConcluidas = new Set(progresso.aulas.filter(a => a.concluido).map(a => a.id_aula));

    for (const modulo of modulos) {
      for (const aula of modulo.aulas) {
        if (!aulasConcluidas.has(aula.id_aula)) {
          abrirAula(aula.id_aula, idCurso);
          return;
        }
      }
    }
    // Se todas concluídas, abrir a primeira
    if (modulos.length > 0 && modulos[0].aulas.length > 0) {
      abrirAula(modulos[0].aulas[0].id_aula, idCurso);
    }
  } catch {
    mostrarToast('Erro ao continuar curso.', 'erro');
  }
}

// Alternar visibilidade de módulo
function alternarModulo(idModulo) {
  const modulo = document.getElementById(idModulo);
  if (modulo) {
    modulo.style.display = modulo.style.display === 'none' ? 'block' : 'none';
  }
}

// Carregar meus cursos
async function carregarMeusCursos() {
  if (!exigirAutenticacao()) return;

  const container = document.getElementById('conteudo-meus-cursos');
  container.innerHTML = `
    <div class="cabecalho-pagina">
      <h1 class="titulo-pagina">Meus Cursos</h1>
      <p class="subtitulo-pagina">Acompanha o teu progresso de aprendizagem</p>
    </div>
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px 40px;">
      <div class="carregando"><div class="spinner"></div> A carregar...</div>
    </div>
  `;

  try {
    const resultadoCursos = await apiCursos.listarTodos();
    const todosCursosLista = resultadoCursos.cursos;

    const progressosCursos = await Promise.all(
      todosCursosLista.map(async curso => {
        try {
          const prog = await apiCursos.obterProgresso(curso.id_curso);
          return { ...curso, progresso: prog };
        } catch {
          return null;
        }
      })
    );

    const meusCursos = progressosCursos.filter(c => c && c.progresso.total_aulas > 0);

    const conteudoLista = document.querySelector('#conteudo-meus-cursos > div:last-child');
    if (meusCursos.length === 0) {
      conteudoLista.innerHTML = `
        <div style="text-align: center; padding: 60px;">
          <div style="font-size: 4rem; margin-bottom: 16px;">📚</div>
          <h3 style="margin-bottom: 12px;">Ainda não estás inscrito em nenhum curso</h3>
          <p style="color: rgba(255,255,255,0.5); margin-bottom: 24px;">Explora o nosso catálogo e começa a aprender hoje!</p>
          <button class="botao-primario" onclick="navegarPara('cursos')">Explorar Cursos</button>
        </div>
      `;
      return;
    }

    conteudoLista.innerHTML = `
      <div class="grelha-cursos">
        ${meusCursos.map(curso => {
          const icone = iconesPorCategoria[curso.categoria] || '📚';
          const corFundo = coresPorCategoria[curso.categoria] || coresPorCategoria['default'];
          return `
            <div class="cartao-curso" onclick="abrirDetalhesCurso('${curso.id_curso}')">
              <div class="cartao-curso-capa" style="background: ${corFundo}">
                <span class="icone-curso">${icone}</span>
              </div>
              <div class="cartao-curso-corpo">
                <h3 class="cartao-curso-titulo">${curso.titulo}</h3>
                <div class="barra-progresso-container" style="margin-bottom: 12px;">
                  <div class="barra-progresso-label">
                    <span style="font-size: 0.8rem;">Progresso</span>
                    <span style="font-size: 0.8rem;">${curso.progresso.percentagem}%</span>
                  </div>
                  <div class="barra-progresso">
                    <div class="barra-progresso-preenchimento" style="width: ${curso.progresso.percentagem}%"></div>
                  </div>
                </div>
                <div class="cartao-curso-rodape">
                  <span style="font-size: 0.8rem; color: rgba(255,255,255,0.5);">${curso.progresso.aulas_concluidas}/${curso.progresso.total_aulas} aulas</span>
                  ${curso.progresso.percentagem === 100
                    ? '<span style="color: #34d399; font-size: 0.85rem; font-weight: 700;">✅ Concluído</span>'
                    : '<button class="botao-primario" style="padding: 6px 14px; font-size: 0.8rem;">Continuar →</button>'
                  }
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } catch (erro) {
    mostrarToast('Erro ao carregar cursos: ' + erro.message, 'erro');
  }
}
