// Aplicação cliente: conteúdo da missão é local; a API NASA serve apenas a galeria.
import { exploradores } from "./data.js";
import { searchNASAImages } from "./nasa-api.js";

const seletor = (id) => document.getElementById(id);
const listaExploradores = exploradores;
const armazenamentoFavoritos = "nasa-space-legacy-favorites";
const grelhaExploradores = seletor("cartoes-exploradores");
const grelhaDestaques = seletor("cartoes-destaques");
const grelhaFavoritos = seletor("cartoes-favoritos");
const caixaDetalhes = seletor("detalhes-explorador");
const conteudoDetalhe = seletor("conteudo-detalhe");
const caixaPrevia = seletor("previa-imagem");
const conteudoPrevia = seletor("conteudo-previa");
const grelhaGaleria = seletor("resultados-galeria");
const estadoGaleria = seletor("estado-galeria");
let destinoSelecionado = "all";
let pesquisaAtual = "";
let favoritos = new Set(loadFavorites());

function normalizarTexto(texto) {
  return String(texto ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function obterExplorador(id) {
  return listaExploradores.find((explorador) => explorador.id === id);
}

function obterFallbackNASA(imagem) {
  const contexto = normalizarTexto(`${imagem?.title ?? ""} ${imagem?.description ?? ""}`);
  return /\b(?:moon|lunar|apollo|luna)\b/.test(contexto)
    ? "assets/images/fallback-moon.svg"
    : "assets/images/fallback-mars.svg";
}

function atualizarContagemFavoritos() {
  seletor("contagem-favoritos").textContent = String(favoritos.size).padStart(2, "0");
}

function criarCartaoExplorador(explorador, compacto = false) {
  const cartao = criarElemento("article", compacto ? "cartao-explorador cartao-destaque" : "cartao-explorador");
  const media = criarElemento("div", "cartao-media");
  const imagem = document.createElement("img");
  imagem.src = explorador.imagem;
  imagem.alt = explorador.imagemAlt;
  imagem.loading = "lazy";
  imagem.decoding = "async";
  imagem.onerror = () => {
    imagem.onerror = null;
    imagem.src = explorador.destino === "moon" ? "assets/images/fallback-moon.svg" : "assets/images/fallback-mars.svg";
  };
  media.append(imagem);

  const numero = criarElemento("span", "numero-cartao", `FILE / ${String(explorador.ano).slice(-2)}`);
  media.append(numero);
  const fonteFoto = document.createElement("a");
  fonteFoto.className = "fonte-fotografia";
  fonteFoto.href = explorador.registoImagem;
  fonteFoto.target = "_blank";
  fonteFoto.rel = "noreferrer";
  fonteFoto.textContent = "NASA IMAGE ↗";
  fonteFoto.setAttribute("aria-label", `Open NASA image record ${explorador.imagemIdNASA}`);
  media.append(fonteFoto);
  if (!compacto) {
    const botaoFavorito = criarElemento("button", "botao-favorito");
    botaoFavorito.type = "button";
    botaoFavorito.dataset.acao = "favorito";
    botaoFavorito.dataset.id = explorador.id;
    const guardado = favoritos.has(explorador.id);
    botaoFavorito.setAttribute("aria-pressed", String(guardado));
    botaoFavorito.setAttribute("aria-label", guardado ? `Remove ${explorador.nome} from saved missions` : `Save ${explorador.nome} to favorites`);
    botaoFavorito.innerHTML = `<span aria-hidden="true">${guardado ? "♥" : "♡"}</span>`;
    media.append(botaoFavorito);
  }

  const corpo = criarElemento("div", "cartao-corpo");
  const linhaMeta = criarElemento("div", "cartao-meta");
  linhaMeta.append(criarElemento("span", "etiqueta-destino", explorador.rotuloDestino));
  linhaMeta.append(criarElemento("span", "ano-cartao", String(explorador.ano)));
  corpo.append(linhaMeta);
  corpo.append(criarElemento("p", "missao-cartao", explorador.missao));
  corpo.append(criarElemento("h3", "titulo-cartao", explorador.nome));
  corpo.append(criarElemento("p", "descricao-cartao", explorador.resumo));

  if (compacto) {
    const abrirDestaque = criarElemento("button", "ligacao-cartao", "View mission file →");
    abrirDestaque.type = "button";
    abrirDestaque.dataset.acao = "detalhes";
    abrirDestaque.dataset.id = explorador.id;
    corpo.append(abrirDestaque);
  } else {
    const rodape = criarElemento("div", "cartao-rodape");
    const abrirDetalhes = criarElemento("button", "botao-cartao", "View Details");
    abrirDetalhes.type = "button";
    abrirDetalhes.dataset.acao = "detalhes";
    abrirDetalhes.dataset.id = explorador.id;
    abrirDetalhes.append(criarElemento("span", "", "↗"));
    const missaoSelo = criarElemento("span", "cartao-selo", "MISSION FILE");
    rodape.append(abrirDetalhes, missaoSelo);
    corpo.append(rodape);
  }
  cartao.append(media, corpo);
  return cartao;
}

function renderFeaturedExplorers() {
  const destaques = ["sojourner", "lunar-roving-vehicle", "opportunity"]
    .map(obterExplorador)
    .filter(Boolean);
  grelhaDestaques.replaceChildren(...destaques.map((explorador) => criarCartaoExplorador(explorador, true)));
}

// Desenha os registos conforme o texto e o destino escolhidos.
export function renderExplorers() {
  const textoPesquisa = normalizarTexto(pesquisaAtual);
  const filtrados = listaExploradores.filter((explorador) => {
    const correspondeDestino = destinoSelecionado === "all" || explorador.destino === destinoSelecionado;
    const campos = [explorador.nome, explorador.missao, explorador.rotuloDestino, explorador.resumo].join(" ");
    return correspondeDestino && normalizarTexto(campos).includes(textoPesquisa);
  });

  if (!filtrados.length) {
    const vazio = criarElemento("div", "estado-vazio estado-arquivo");
    vazio.append(criarElemento("span", "estado-icone", "⌕"));
    vazio.append(criarElemento("h3", "", "No mission files found"));
    vazio.append(criarElemento("p", "", "Try another name or clear the destination filter."));
    grelhaExploradores.replaceChildren(vazio);
    return;
  }
  grelhaExploradores.replaceChildren(...filtrados.map((explorador) => criarCartaoExplorador(explorador)));
}

export function searchExplorers(query) {
  pesquisaAtual = String(query ?? "");
  renderExplorers();
}

export function filterExplorers(destination) {
  const opcoes = ["all", "moon", "mars"];
  destinoSelecionado = opcoes.includes(destination) ? destination : "all";
  document.querySelectorAll("[data-destino]").forEach((botao) => {
    const ativo = botao.dataset.destino === destinoSelecionado;
    botao.classList.toggle("filtro-ativo", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
  renderExplorers();
}

export function loadFavorites() {
  try {
    const guardados = JSON.parse(localStorage.getItem(armazenamentoFavoritos) || "[]");
    if (!Array.isArray(guardados)) return [];
    const idsValidos = new Set(listaExploradores.map((explorador) => explorador.id));
    return [...new Set(guardados.filter((id) => typeof id === "string" && idsValidos.has(id)))];
  } catch {
    return [];
  }
}

function guardarFavoritos() {
  try {
    localStorage.setItem(armazenamentoFavoritos, JSON.stringify([...favoritos]));
  } catch {
    // Se o browser bloquear o armazenamento, os favoritos mantêm-se disponíveis na sessão atual.
  }
}

export function addFavorite(id) {
  if (!obterExplorador(id)) return;
  favoritos.add(id);
  guardarFavoritos();
  renderExplorers();
  renderFavorites();
  renderFeaturedExplorers();
}

export function removeFavorite(id) {
  favoritos.delete(id);
  guardarFavoritos();
  renderExplorers();
  renderFavorites();
  renderFeaturedExplorers();
}

export function renderFavorites() {
  const guardados = listaExploradores.filter((explorador) => favoritos.has(explorador.id));
  atualizarContagemFavoritos();
  if (!guardados.length) {
    const vazio = criarElemento("div", "estado-vazio estado-favoritos");
    vazio.append(criarElemento("span", "estado-icone", "♡"));
    vazio.append(criarElemento("h3", "", "Your archive is waiting"));
    vazio.append(criarElemento("p", "", "Save a mission from the explorer archive and it will stay here on this device."));
    grelhaFavoritos.replaceChildren(vazio);
    return;
  }
  grelhaFavoritos.replaceChildren(...guardados.map((explorador) => criarCartaoExplorador(explorador)));
}

function adicionarCampoDetalhe(lista, rotulo, valor) {
  const item = criarElemento("div", "campo-detalhe");
  item.append(criarElemento("dt", "", rotulo), criarElemento("dd", "", valor || "Not available in this record."));
  lista.append(item);
}

function fecharDetalhes() {
  if (caixaDetalhes.open) caixaDetalhes.close();
  document.querySelector("#exploradores h2")?.focus({ preventScroll: true });
  document.getElementById("exploradores")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function renderExplorerDetails(id) {
  const explorador = obterExplorador(id);
  if (!explorador) return;
  conteudoDetalhe.replaceChildren();

  const topo = criarElemento("div", "detalhe-topo");
  const fecho = criarElemento("button", "fechar-dialogo fechar-detalhe");
  fecho.type = "button";
  fecho.dataset.fecharDetalhe = "true";
  fecho.setAttribute("aria-label", "Close mission details");
  fecho.textContent = "×";
  topo.append(fecho);
  const numero = criarElemento("p", "sobretitulo", `MISSION RECORD · ${String(explorador.ano)}`);
  topo.append(numero);

  const cabecalho = criarElemento("div", "detalhe-cabecalho");
  const imagem = document.createElement("img");
  imagem.src = explorador.imagem;
  imagem.alt = explorador.imagemAlt;
  imagem.onerror = () => {
    imagem.onerror = null;
    imagem.src = explorador.destino === "moon" ? "assets/images/fallback-moon.svg" : "assets/images/fallback-mars.svg";
  };
  const painel = criarElemento("div", "detalhe-titulo");
  painel.append(criarElemento("span", "etiqueta-destino", explorador.rotuloDestino));
  painel.append(criarElemento("h2", "", explorador.nome));
  painel.append(criarElemento("p", "detalhe-missao", explorador.missao));
  painel.append(criarElemento("p", "", explorador.resumo));
  cabecalho.append(imagem, painel);
  conteudoDetalhe.append(topo, cabecalho);

  const datas = document.createElement("dl");
  datas.className = "grelha-datas";
  adicionarCampoDetalhe(datas, "Launch", explorador.dataLancamento);
  adicionarCampoDetalhe(datas, "Landing / first use", explorador.dataPouso);
  adicionarCampoDetalhe(datas, "Destination", explorador.rotuloDestino);
  conteudoDetalhe.append(datas);

  const secoes = criarElemento("div", "detalhe-secoes");
  const capitulos = [
    ["Mission objectives", explorador.objetivo],
    ["Historical background", explorador.contexto],
    ["Scientific discoveries", explorador.descobertas],
    ["Mission outcome", explorador.resultado]
  ];
  capitulos.forEach(([titulo, texto], indice) => {
    const bloco = criarElemento("section", "capitulo-detalhe");
    bloco.append(criarElemento("span", "capitulo-numero", `0${indice + 1}`));
    const textoBloco = criarElemento("div", "");
    textoBloco.append(criarElemento("h3", "", titulo), criarElemento("p", "", texto));
    bloco.append(textoBloco);
    secoes.append(bloco);
  });
  conteudoDetalhe.append(secoes);

  const fontes = criarElemento("div", "detalhe-fontes");
  fontes.append(criarElemento("span", "selo-fonte", "VERIFIED SOURCE"));
  const ligacoes = criarElemento("div", "ligacoes-fontes");
  const fonteMissao = document.createElement("a");
  fonteMissao.href = explorador.fonteMissao;
  fonteMissao.target = "_blank";
  fonteMissao.rel = "noreferrer";
  fonteMissao.textContent = `${explorador.fonteLabel} ↗`;
  const fonteImagem = document.createElement("a");
  fonteImagem.href = explorador.registoImagem;
  fonteImagem.target = "_blank";
  fonteImagem.rel = "noreferrer";
  fonteImagem.textContent = `NASA image record · ${explorador.imagemIdNASA} ↗`;
  ligacoes.append(fonteMissao, fonteImagem);
  fontes.append(ligacoes);
  conteudoDetalhe.append(fontes);

  const rodape = criarElemento("div", "detalhe-rodape");
  const voltar = criarElemento("button", "botao botao-primario", "← Back to Explorers");
  voltar.type = "button";
  voltar.dataset.fecharDetalhe = "true";
  const botaoFavorito = criarElemento("button", "botao botao-contorno botao-guardar-detalhe", favoritos.has(id) ? "♥ Saved" : "♡ Save mission");
  botaoFavorito.type = "button";
  botaoFavorito.dataset.acao = "favorito";
  botaoFavorito.dataset.id = id;
  rodape.append(voltar, botaoFavorito);
  conteudoDetalhe.append(rodape);

  if (!caixaDetalhes.open) caixaDetalhes.showModal();
  voltar.focus({ preventScroll: true });
}

function renderTimeline() {
  const eventos = listaExploradores.slice().sort((a, b) => a.ano - b.ano);
  const lista = seletor("eventos-timeline");
  const fragmento = document.createDocumentFragment();
  eventos.forEach((explorador, indice) => {
    const evento = criarElemento("article", "evento-timeline");
    evento.append(criarElemento("span", "ponto-timeline", String(indice + 1).padStart(2, "0")));
    const ano = criarElemento("span", "ano-timeline", String(explorador.ano));
    const missao = criarElemento("h3", "", explorador.missao);
    const destino = criarElemento("span", "destino-timeline", explorador.rotuloDestino);
    const descricao = criarElemento("p", "", explorador.resumo);
    const abrir = criarElemento("button", "ligacao-timeline", "Open mission file →");
    abrir.type = "button";
    abrir.dataset.acao = "detalhes";
    abrir.dataset.id = explorador.id;
    const bloco = criarElemento("div", "evento-corpo");
    bloco.append(ano, missao, destino, descricao, abrir);
    evento.append(bloco);
    fragmento.append(evento);
  });
  lista.replaceChildren(fragmento);
}

function definirEstadoGaleria(tipo, mensagem) {
  estadoGaleria.className = `estado-galeria estado-${tipo}`;
  estadoGaleria.textContent = mensagem;
  estadoGaleria.hidden = tipo === "pronto";
}

let imagensNASAAtuais = [];

export function renderGallery(images) {
  imagensNASAAtuais = Array.isArray(images) ? images : [];
  grelhaGaleria.replaceChildren();
  if (!Array.isArray(images) || !images.length) {
    definirEstadoGaleria("vazio", "No NASA image records matched that search. Try another term.");
    return;
  }

  const fragmento = document.createDocumentFragment();
  images.forEach((imagemNASA) => {
    const cartao = criarElemento("article", "cartao-galeria");
    const media = criarElemento("div", "galeria-media");
    const imagem = document.createElement("img");
    imagem.src = imagemNASA.preview_image_url;
    imagem.alt = imagemNASA.title;
    imagem.loading = "lazy";
    imagem.decoding = "async";
    imagem.onerror = () => {
      imagem.onerror = null;
      imagem.alt = `Local placeholder illustration; NASA image unavailable: ${imagemNASA.title}`;
      imagem.src = obterFallbackNASA(imagemNASA);
    };
    media.append(imagem);

    const ampliar = criarElemento("button", "botao-ampliar", "View image");
    ampliar.type = "button";
    ampliar.dataset.acao = "previa";
    ampliar.dataset.id = imagemNASA.nasa_id;
    ampliar.setAttribute("aria-label", `Preview ${imagemNASA.title}`);
    media.append(ampliar);

    const corpo = criarElemento("div", "galeria-corpo");
    corpo.append(criarElemento("h3", "", imagemNASA.title));
    const descricao = imagemNASA.description || "No description supplied in the NASA record.";
    corpo.append(criarElemento("p", "", descricao.length > 170 ? `${descricao.slice(0, 167).trimEnd()}…` : descricao));
    const linha = criarElemento("div", "galeria-meta");
    const dataImagem = formatarData(imagemNASA.date_created);
    linha.append(criarElemento("span", "", dataImagem || "DATE NOT LISTED"));
    const origem = document.createElement("a");
    origem.href = imagemNASA.record_url;
    origem.target = "_blank";
    origem.rel = "noreferrer";
    origem.textContent = "NASA RECORD ↗";
    linha.append(origem);
    corpo.append(linha);
    cartao.append(media, corpo);
    fragmento.append(cartao);
  });
  grelhaGaleria.replaceChildren(fragmento);
  definirEstadoGaleria("sucesso", `${images.length} NASA image records found.`);
}

function formatarData(valor) {
  if (typeof valor !== "string" || !valor.trim()) return "";
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(data);
}

async function procurarGaleria(consulta) {
  const pesquisa = String(consulta ?? "").trim();
  if (!pesquisa) {
    grelhaGaleria.replaceChildren();
    definirEstadoGaleria("vazio", "Enter a search term to explore NASA image records.");
    return;
  }
  definirEstadoGaleria("carregamento", "Searching official NASA image records…");
  grelhaGaleria.replaceChildren();
  try {
    const imagens = await searchNASAImages(pesquisa);
    renderGallery(imagens);
  } catch (erro) {
    grelhaGaleria.replaceChildren();
    const motivo = erro instanceof Error && erro.name === "TimeoutError"
      ? "The NASA archive took too long to respond. Please try again."
      : "The NASA archive is temporarily unavailable. Mission records and saved favorites are still here.";
    definirEstadoGaleria("erro", motivo);
  }
}

function abrirPrevia(id) {
  const imagem = imagensNASAAtuais.find((item) => item.nasa_id === id);
  if (!imagem) return;
  const figura = document.createElement("figure");
  const visual = document.createElement("img");
  visual.src = imagem.preview_image_url;
  visual.alt = imagem.title;
  visual.onerror = () => {
    visual.onerror = null;
    visual.alt = `Local placeholder illustration; NASA image unavailable: ${imagem.title}`;
    visual.src = obterFallbackNASA(imagem);
  };
  const legenda = criarElemento("figcaption", "", imagem.title);
  const descricao = criarElemento("p", "", imagem.description || "No description supplied in the NASA record.");
  const ligacao = document.createElement("a");
  ligacao.href = imagem.record_url;
  ligacao.target = "_blank";
  ligacao.rel = "noreferrer";
  ligacao.textContent = `Open original NASA record · ${imagem.nasa_id} ↗`;
  figura.append(visual, legenda, descricao, ligacao);
  conteudoPrevia.replaceChildren(figura);
  caixaPrevia.showModal();
}

function tratarAcaoCartao(evento) {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;
  const { acao, id } = botao.dataset;
  if (acao === "detalhes") renderExplorerDetails(id);
  if (acao === "favorito") {
    if (favoritos.has(id)) removeFavorite(id);
    else addFavorite(id);
  }
  if (acao === "previa") abrirPrevia(id);
}

// A inicialização liga eventos e desenha o conteúdo local antes de pedir dados remotos.
renderFeaturedExplorers();
renderExplorers();
renderFavorites();
renderTimeline();

[grelhaExploradores, grelhaFavoritos, grelhaDestaques, seletor("eventos-timeline"), grelhaGaleria]
  .forEach((grelha) => grelha.addEventListener("click", tratarAcaoCartao));

document.querySelectorAll("[data-destino]").forEach((botao) => {
  botao.addEventListener("click", () => filterExplorers(botao.dataset.destino));
});

seletor("pesquisa-exploradores").addEventListener("input", (evento) => searchExplorers(evento.currentTarget.value));
seletor("formulario-galeria").addEventListener("submit", (evento) => {
  evento.preventDefault();
  procurarGaleria(seletor("pesquisa-galeria").value);
});

const botaoMenu = seletor("botao-menu");
const navegacao = seletor("navegacao-principal");
botaoMenu.addEventListener("click", () => {
  const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
  botaoMenu.setAttribute("aria-expanded", String(!aberto));
  navegacao.classList.toggle("navegacao-aberta", !aberto);
});
navegacao.addEventListener("click", (evento) => {
  if (evento.target.closest("a")) {
    botaoMenu.setAttribute("aria-expanded", "false");
    navegacao.classList.remove("navegacao-aberta");
  }
});

document.addEventListener("click", (evento) => {
  if (evento.target.closest("[data-fechar-detalhe]")) fecharDetalhes();
  if (evento.target.closest("[data-fechar-previa]")) caixaPrevia.close();
});

caixaDetalhes.addEventListener("click", (evento) => {
  if (evento.target === caixaDetalhes) fecharDetalhes();
});
caixaPrevia.addEventListener("click", (evento) => {
  if (evento.target === caixaPrevia) caixaPrevia.close();
});

const atalhoPesquisa = (evento) => {
  if (evento.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
    evento.preventDefault();
    seletor("pesquisa-exploradores").focus();
  }
};
document.addEventListener("keydown", atalhoPesquisa);

procurarGaleria(seletor("pesquisa-galeria").value);
