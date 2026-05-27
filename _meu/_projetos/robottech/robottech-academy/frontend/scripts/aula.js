// ===== MÓDULO DE AULA =====

let aulaAtual = null;
let idCursoAtual = null;
let modulosDosCursoAtual = [];

// Abrir página de aula
async function abrirAula(idAula, idCurso) {
  if (!exigirAutenticacao()) return;

  idCursoAtual = idCurso;
  navegarPara('aula');

  const container = document.getElementById('conteudo-aula');
  container.innerHTML = '<div class="carregando"><div class="spinner"></div> A carregar aula...</div>';

  try {
    // Buscar detalhes do curso para obter módulos e aulas
    const resultadoCurso = await apiCursos.obterDetalhe(idCurso);
    modulosDosCursoAtual = resultadoCurso.modulos;

    // Encontrar a aula atual
    let aulaEncontrada = null;
    for (const modulo of modulosDosCursoAtual) {
      for (const aula of modulo.aulas) {
        if (aula.id_aula === idAula) {
          aulaEncontrada = aula;
          break;
        }
      }
      if (aulaEncontrada) break;
    }

    if (!aulaEncontrada) {
      container.innerHTML = '<p style="color: #f87171; text-align: center; padding: 40px;">Aula não encontrada.</p>';
      return;
    }

    aulaAtual = aulaEncontrada;

    // Buscar progresso
    let progressoAulas = {};
    try {
      const progresso = await apiCursos.obterProgresso(idCurso);
      progresso.aulas.forEach(a => { progressoAulas[a.id_aula] = a.concluido; });
    } catch {}

    // Encontrar aulas anterior e próxima
    const todasAulas = modulosDosCursoAtual.flatMap(m => m.aulas);
    const indiceAtual = todasAulas.findIndex(a => a.id_aula === idAula);
    const aulaAnterior = indiceAtual > 0 ? todasAulas[indiceAtual - 1] : null;
    const proximaAula = indiceAtual < todasAulas.length - 1 ? todasAulas[indiceAtual + 1] : null;

    // Construir URL do vídeo (suporte a YouTube e URL direta)
    const urlVideo = aulaEncontrada.video_url || '';
    let htmlPlayer = '';

    if (urlVideo.includes('youtube.com') || urlVideo.includes('youtu.be')) {
      const idVideo = extrairIdYoutube(urlVideo);
      htmlPlayer = `<iframe src="https://www.youtube.com/embed/${idVideo}?rel=0&modestbranding=1" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    } else if (urlVideo) {
      htmlPlayer = `<video controls style="width:100%;height:100%;"><source src="${urlVideo}"><p style="color: rgba(255,255,255,0.5); text-align: center; padding: 40px;">Formato de vídeo não suportado.</p></video>`;
    } else {
      htmlPlayer = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:rgba(139,92,246,0.1);"><p style="color:rgba(255,255,255,0.5);">🎬 Vídeo em breve</p></div>`;
    }

    const aulaConcluida = progressoAulas[idAula] === 1;

    container.innerHTML = `
      <div class="aula-container">
        <div class="aula-principal">
          <div class="aula-breadcrumb">
            <a onclick="navegarPara('inicio')">Início</a>
            <span>›</span>
            <a onclick="abrirDetalhesCurso('${idCurso}')">${resultadoCurso.curso.titulo}</a>
            <span>›</span>
            <span>${aulaEncontrada.titulo}</span>
          </div>

          <div class="player-container">
            ${htmlPlayer}
          </div>

          <h1 class="aula-titulo">${aulaEncontrada.titulo}</h1>
          <p class="aula-descricao">${aulaEncontrada.descricao || 'Sem descrição disponível.'}</p>

          <div class="aula-acoes">
            ${aulaAnterior ? `<button class="botao-secundario" onclick="abrirAula('${aulaAnterior.id_aula}', '${idCurso}')">← Aula Anterior</button>` : ''}
            <button class="botao-primario" onclick="abrirQuiz('${idAula}')">
              📝 Fazer Quiz
            </button>
            ${aulaConcluida
              ? '<button class="botao-sucesso" disabled>✅ Aula Concluída</button>'
              : `<button class="botao-sucesso" id="botao-concluir" onclick="marcarAulaConcluida('${idAula}', '${idCurso}')">✅ Marcar como Concluída</button>`
            }
            ${proximaAula ? `<button class="botao-primario" onclick="abrirAula('${proximaAula.id_aula}', '${idCurso}')">Próxima Aula →</button>` : ''}
          </div>

          <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(139,92,246,0.2); border-radius: 10px;">
            <h3 style="font-size: 0.9rem; color: #a78bfa; margin-bottom: 8px;">ℹ️ Informações da Aula</h3>
            <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5);">⏱️ Duração: ${aulaEncontrada.duracao_minutos} minutos</p>
          </div>
        </div>

        <div class="sidebar-aula">
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(139,92,246,0.25); border-radius: 12px; overflow: hidden;">
            <div style="padding: 16px; background: rgba(139,92,246,0.1); border-bottom: 1px solid rgba(139,92,246,0.2);">
              <h3 style="font-size: 0.95rem; font-weight: 700; color: #a78bfa;">📋 Conteúdo do Curso</h3>
            </div>
            <div style="padding: 8px;">
              ${modulosDosCursoAtual.map((modulo, idx) => `
                <div style="margin-bottom: 8px;">
                  <div style="padding: 10px 12px; font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.5px;">
                    ${modulo.titulo}
                  </div>
                  ${modulo.aulas.map(aula => {
                    const eConcluida = progressoAulas[aula.id_aula] === 1;
                    const eAtual = aula.id_aula === idAula;
                    return `
                      <div class="item-aula ${eConcluida ? 'concluida' : ''}" 
                           style="${eAtual ? 'background: rgba(139,92,246,0.2); border-radius: 8px;' : ''}"
                           onclick="abrirAula('${aula.id_aula}', '${idCurso}')">
                        <div class="icone-aula" style="${eConcluida ? 'background: rgba(16,185,129,0.2); border-color: rgba(16,185,129,0.4);' : ''}">
                          ${eConcluida ? '✅' : (eAtual ? '▶' : '○')}
                        </div>
                        <div class="info-aula">
                          <div class="titulo-aula-item" style="font-size: 0.85rem; ${eAtual ? 'color: #a78bfa;' : ''}">${aula.titulo}</div>
                          <div class="duracao-aula">${aula.duracao_minutos} min</div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = `<p style="color: #f87171; text-align: center; padding: 40px;">Erro ao carregar aula: ${erro.message}</p>`;
  }
}

// Extrair ID do YouTube de uma URL
function extrairIdYoutube(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : url;
}

// Marcar aula como concluída
async function marcarAulaConcluida(idAula, idCurso) {
  const botao = document.getElementById('botao-concluir');
  if (botao) {
    botao.disabled = true;
    botao.textContent = 'A guardar...';
  }

  try {
    const resultado = await apiCursos.concluirAula(idAula);
    mostrarToast('Aula marcada como concluída! 🎉', 'sucesso');

    if (botao) {
      botao.className = 'botao-sucesso';
      botao.textContent = '✅ Aula Concluída';
      botao.disabled = true;
    }

    if (resultado.certificadoGerado) {
      setTimeout(() => {
        mostrarToast('🏆 Parabéns! Curso concluído! O teu certificado foi gerado!', 'sucesso');
        setTimeout(() => mostrarCertificadoModal(idCurso), 2000);
      }, 1000);
    }
  } catch (erro) {
    mostrarToast('Erro: ' + erro.message, 'erro');
    if (botao) {
      botao.disabled = false;
      botao.textContent = '✅ Marcar como Concluída';
    }
  }
}

// Abrir quiz da aula
async function abrirQuiz(idAula) {
  if (!exigirAutenticacao()) return;

  const container = document.getElementById('conteudo-quiz');
  container.innerHTML = '<div class="carregando"><div class="spinner"></div> A carregar quiz...</div>';
  abrirModal('modal-quiz');

  try {
    const resultado = await apiCursos.obterQuiz(idAula);
    const { perguntas } = resultado;

    if (perguntas.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); padding: 20px;">Sem quiz disponível para esta aula.</p>';
      return;
    }

    container.innerHTML = `
      <div class="quiz-container">
        <h2>📝 Quiz da Aula</h2>
        <p style="color: rgba(255,255,255,0.5); margin-bottom: 24px; font-size: 0.9rem;">${perguntas.length} pergunta(s) — Precisas de 70% para passar</p>
        <form id="formulario-quiz" onsubmit="submeterQuiz(event, '${idAula}')">
          ${perguntas.map((pergunta, idx) => `
            <div class="pergunta-quiz">
              <p>${idx + 1}. ${pergunta.pergunta}</p>
              <div class="opcoes-quiz">
                ${['A', 'B', 'C', 'D'].map(letra => `
                  <label class="opcao-quiz">
                    <input type="radio" name="quiz_${pergunta.id_quiz}" value="${letra}" required />
                    <span><strong>${letra})</strong> ${pergunta['opcao_' + letra.toLowerCase()]}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}
          <button type="submit" class="botao-primario botao-completo" style="margin-top: 16px;">
            Submeter Respostas
          </button>
        </form>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = `<p style="color: #f87171; text-align: center; padding: 20px;">Erro ao carregar quiz: ${erro.message}</p>`;
  }
}

// Submeter respostas do quiz
async function submeterQuiz(evento, idAula) {
  evento.preventDefault();

  const formulario = document.getElementById('formulario-quiz');
  const inputs = formulario.querySelectorAll('input[type="radio"]:checked');
  const respostas = {};

  inputs.forEach(input => {
    const idQuiz = input.name.replace('quiz_', '');
    respostas[idQuiz] = input.value;
  });

  try {
    const resultado = await apiCursos.responderQuiz(idAula, respostas);
    const container = document.getElementById('conteudo-quiz');

    const corPontuacao = resultado.pontuacao >= 70 ? '#34d399' : '#f87171';
    const mensagemResultado = resultado.aprovado
      ? '🎉 Parabéns! Passaste no quiz!'
      : '😔 Não passaste desta vez. Revê o conteúdo e tenta novamente.';

    container.innerHTML = `
      <div class="resultado-quiz">
        <div class="pontuacao" style="color: ${corPontuacao};">${resultado.pontuacao}%</div>
        <h3 style="margin-bottom: 12px;">${mensagemResultado}</h3>
        <p style="color: rgba(255,255,255,0.5); margin-bottom: 24px;">
          Acertaste ${resultado.corretas} de ${resultado.total} perguntas.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="botao-secundario" onclick="fecharModal('modal-quiz')">Fechar</button>
          ${resultado.aprovado
            ? `<button class="botao-sucesso" onclick="fecharModal('modal-quiz'); marcarAulaConcluida('${idAula}', '${idCursoAtual}')">✅ Marcar Aula como Concluída</button>`
            : `<button class="botao-primario" onclick="abrirQuiz('${idAula}')">🔄 Tentar Novamente</button>`
          }
        </div>
      </div>
    `;
  } catch (erro) {
    mostrarToast('Erro ao submeter quiz: ' + erro.message, 'erro');
  }
}

// Mostrar certificado em modal
async function mostrarCertificadoModal(idCurso) {
  try {
    const certificados = await apiCursos.listarCertificados();
    const certificado = certificados.certificados.find(c => c.id_curso === idCurso);

    if (!certificado) return;

    const container = document.getElementById('conteudo-modal-certificado');
    container.innerHTML = criarHtmlCertificado(certificado);
    abrirModal('modal-certificado');
  } catch {}
}

// Criar HTML do certificado
function criarHtmlCertificado(certificado) {
  const dataEmissao = new Date(certificado.data_emissao).toLocaleDateString('pt-PT', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return `
    <div class="certificado-visual">
      <div style="font-size: 3rem; margin-bottom: 12px; position: relative; z-index: 1;">🏆</div>
      <div class="certificado-titulo">CERTIFICADO DE CONCLUSÃO</div>
      <div class="certificado-subtitulo">RobotTech Academy certifica que</div>
      <div class="certificado-nome">${certificado.nome_aluno}</div>
      <div class="certificado-subtitulo">concluiu com sucesso o</div>
      <div class="certificado-curso">${certificado.titulo_curso}</div>
      <div style="color: rgba(255,255,255,0.4); font-size: 0.85rem; margin-bottom: 16px; position: relative; z-index: 1;">
        Emitido em ${dataEmissao}
      </div>
      <div class="certificado-codigo">Código: ${certificado.codigo_verificacao}</div>
      <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap;">
        <button class="botao-primario" onclick="imprimirCertificado()">🖨️ Imprimir</button>
        <button class="botao-secundario" onclick="fecharModal('modal-certificado')">Fechar</button>
      </div>
    </div>
  `;
}

// Imprimir certificado
function imprimirCertificado() {
  window.print();
}
