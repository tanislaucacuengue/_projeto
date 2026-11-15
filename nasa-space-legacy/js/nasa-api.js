// Cliente simples e defensivo para a NASA Image and Video Library.
const NASA_SEARCH_URL = "https://images-api.nasa.gov/search";
const NASA_ASSET_URL = "https://images-api.nasa.gov/asset";

function textoSeguro(valor, limite = 800) {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, limite);
}

function urlImagemValida(valor) {
  if (typeof valor !== "string") return false;
  try {
    const url = new URL(valor);
    return (url.protocol === "https:" || url.protocol === "http:") && /\.(?:jpe?g|png|gif|webp)(?:$|\?)/i.test(url.href);
  } catch {
    return false;
  }
}

// Pesquisa imagens e devolve apenas entradas que têm um identificador e um preview seguro.
export async function searchNASAImages(query) {
  const pesquisa = textoSeguro(query, 100);
  if (!pesquisa) return [];

  const url = new URL(NASA_SEARCH_URL);
  url.searchParams.set("q", pesquisa);
  url.searchParams.set("media_type", "image");
  url.searchParams.set("page_size", "12");

  const resposta = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000)
  });

  if (!resposta.ok) {
    throw new Error(`NASA API request failed (${resposta.status}).`);
  }

  const corpo = await resposta.json();
  const resultados = corpo?.collection?.items;
  if (!Array.isArray(resultados)) return [];

  return resultados.map((item) => {
    const metadados = Array.isArray(item?.data) ? item.data.find(Boolean) : null;
    const ligacoes = Array.isArray(item?.links) ? item.links : [];
    const preview = ligacoes.find((ligacao) => ligacao?.rel === "preview" && urlImagemValida(ligacao?.href))?.href;
    const nasaId = textoSeguro(metadados?.nasa_id, 100);
    if (!nasaId || !preview) return null;

    return {
      nasa_id: nasaId,
      title: textoSeguro(metadados?.title, 240) || "Untitled NASA image",
      description: textoSeguro(metadados?.description, 900),
      date_created: textoSeguro(metadados?.date_created, 40),
      preview_image_url: preview,
      record_url: `https://images.nasa.gov/details/${encodeURIComponent(nasaId)}`
    };
  }).filter(Boolean);
}

// Consulta a lista de ficheiros de um registo, caso seja necessária uma versão diferente do preview.
export async function getNASAImageDetails(nasaId) {
  const identificador = textoSeguro(nasaId, 100);
  if (!identificador) throw new Error("A NASA record ID is required.");

  const url = `${NASA_ASSET_URL}/${encodeURIComponent(identificador)}`;
  const resposta = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000)
  });
  if (!resposta.ok) throw new Error(`NASA asset lookup failed (${resposta.status}).`);

  const corpo = await resposta.json();
  const ficheiros = corpo?.collection?.items;
  if (!Array.isArray(ficheiros)) return [];
  return ficheiros.filter((ficheiro) => urlImagemValida(ficheiro));
}
