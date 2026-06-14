const classesUsoDoSolo = {
  3: { cor: "#1F8D49", rotulo: "Formação Florestal", area2012: 112.46, area2022: 60.94 },
  4: { cor: "#7DC975", rotulo: "Formação Savânica", area2012: 1.37, area2022: 0.32 },
  6: { cor: "#026975", rotulo: "Floresta Alagável", area2012: 149.16, area2022: 77.33 },
  11: { cor: "#519799", rotulo: "Campo Alagado e Área Pantanosa", area2012: 239.37, area2022: 257.08 },
  12: { cor: "#D6BC74", rotulo: "Formação Campestre", area2012: 8.54, area2022: 2.78 },
  15: { cor: "#EDDE8E", rotulo: "Pastagem", area2012: 84.63, area2022: 150.40 },
  24: { cor: "#D4271E", rotulo: "Área Urbanizada", area2012: 0.86, area2022: 0.98 },
  25: { cor: "#DB4D4F", rotulo: "Outras Áreas não Vegetadas", area2012: 0.04, area2022: 0.68 },
  33: { cor: "#2532E4", rotulo: "Rio, Lago e Oceano", area2012: 67.47, area2022: 113.46 },
  41: { cor: "#F54CA9", rotulo: "Outras Lavouras Temporárias", area2012: 0.41, area2022: 0.34 }
};

const estado = {
  modulo: "populacao",
  ano: "2022",
  opacidade: 0.82,
  dados: {},
  selecionada: null,
  filtros: new Set(Object.keys(classesUsoDoSolo).map(Number)),
  zoom: 1,
  deslocamentoX: 0,
  deslocamentoY: 0,
  arrastando: false,
  ajustandoDivisor: false,
  comparando: false,
  comparacaoAnimando: false,
  animacaoComparacaoId: null,
  tempoComparacaoInicio: 0,
  direcaoComparacao: 1,
  divisor: 0.5,
  movimento: false,
  origemX: 0,
  origemY: 0,
  desenhoPendente: false,
  populacao: null,
  setorSelecionado: null,
  setorHoverId: null,
  faixaPopulacaoAtiva: null,
  relevo: null,
  faixaRelevoAtiva: null,
  extremoRelevoFocado: null,
  ultimaAltitudeCursor: null,
  ultimoTempoAltitude: 0,
  classeUsoSoloAtiva: null,
  classeUsoSoloSelecionada: null,
  classeUsoSoloHover: null,
  hidrografia: null,
  camadaHidrografiaAtiva: null,
  feicaoHidrografiaHover: null,
  feicaoHidrografiaSelecionada: null,
  rasterHidrografiaAtivo: null,
  fluxoHidrografiaSelecionado: null,
  localidades: null,
  localidadeHover: null,
  localidadeSelecionada: null,
  basemapAtivo: true,
  basemapAssinatura: ""
};

const faixasPopulacao = [
  { min: 7, max: 101, cor: "#F7FCF5", rotulo: "7 - 101 habitantes" },
  { min: 101, max: 185, cor: "#E2F4DD", rotulo: "101 - 185 habitantes" },
  { min: 185, max: 268, cor: "#BFE6B9", rotulo: "185 - 268 habitantes" },
  { min: 268, max: 401, cor: "#94D390", rotulo: "268 - 401 habitantes" },
  { min: 401, max: 498, cor: "#60BA6C", rotulo: "401 - 498 habitantes" },
  { min: 498, max: 692, cor: "#329B51", rotulo: "498 - 692 habitantes" },
  { min: 692, max: 920, cor: "#0D7835", rotulo: "692 - 920 habitantes" },
  { min: 920, max: 1150, cor: "#00441B", rotulo: "920 - 1.150 habitantes" }
];

const faixasRelevo = [
  { min: 1, max: 5, cor: "#A6DDEB", rotulo: "0 - 5 m" },
  { min: 5, max: 10, cor: "#D9F0A3", rotulo: "5 - 10 m" },
  { min: 10, max: 20, cor: "#B0D87F", rotulo: "10 - 20 m" },
  { min: 20, max: 30, cor: "#FED38B", rotulo: "20 - 30 m" },
  { min: 30, max: 40, cor: "#FDA461", rotulo: "30 - 40 m" },
  { min: 40, max: 47, cor: "#C97A2B", rotulo: "40 - 47 m" }
];

const camadasHidrografia = [
  { id: "corpos", nome: "Corpos d'água", arquivo: "hidrografia/corpos_dagua.geojson", tipo: "poligono", cor: "#9FD9E6", contorno: "#347D91" },
  { id: "lagos", nome: "Lagos", arquivo: "hidrografia/Lagos.geojson", tipo: "poligono", cor: "#7ECADF", contorno: "#226F88" },
  { id: "igarapes", nome: "Igarapés", arquivo: "hidrografia/Igarapes.geojson", tipo: "linha", cor: "#31A7BA", largura: 1.45 },
  { id: "rio-maracu", nome: "Rio Maracu", arquivo: "hidrografia/Rio_Maracu.geojson", tipo: "linha", cor: "#0E6FA4", largura: 2.35 },
  { id: "rio-pindare", nome: "Rio Pindaré", arquivo: "hidrografia/Rio_Pindare.geojson", tipo: "linha", cor: "#075F96", largura: 2.6 }
];

const rastersHidrografia = [
  { id: "alagamento", nome: "Alagamento 5 m", arquivo: "hidrografia/Alagamento_5m.tif", tipo: "alagamento", cor: "#4FB8C6" },
  { id: "frequencia", nome: "Frequência de água", arquivo: "hidrografia/frequencia.tif", tipo: "frequencia", cor: "#1C7ED6" }
];

const modulosGeoportal = {
  "uso-solo": {
    titulo: "Uso e cobertura do solo",
    texto: "Compare os anos de 2012 e 2022, filtre classes, consulte áreas e visualize mudanças no território.",
    dica: "Clique em uma feição para ver detalhes",
    pronto: true
  },
  populacao: {
    titulo: "População e setores censitários",
    texto: "Explore a distribuição dos habitantes por setor censitário, consulte domicílios e compare os distritos de Cajari.",
    dica: "Clique em um setor censitário para consultar os dados",
    pronto: true
  },
  relevo: {
    titulo: "Relevo e hipsometria",
    texto: "Explore as variações de altitude do município, identifique áreas mais baixas e mais elevadas e consulte pontos no mapa.",
    dica: "Clique no relevo para consultar a altitude",
    pronto: true
  },
  hidrografia: {
    titulo: "Hidrografia e áreas úmidas",
    texto: "Consulte rios, igarapés, lagos e corpos d'água mapeados no território de Cajari.",
    dica: "Aponte para uma feição hídrica para ver detalhes",
    pronto: true
  },
  localidades: {
    titulo: "Localidades e acessos",
    texto: "Visualize povoados, estradas recortadas, rios de referência e a localização das comunidades no município.",
    dica: "Aponte para um povoado para consultar o nome",
    pronto: true
  }
};

const ordemCarrossel = ["uso-solo", "populacao", "relevo", "hidrografia", "localidades"];
let slideAtual = 0;
let apresentacaoInicioId = null;
let apresentacaoInicioToken = 0;

const canvas = document.getElementById("canvasMapa");
const contexto = canvas.getContext("2d", { alpha: true });
const basemap = document.getElementById("basemap");
const numero = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function rotuloMetrica(texto) {
  const atalhos = {
    "Campo Alagado e Área Pantanosa": "Campo alagado",
    "Outras Áreas não Vegetadas": "Áreas não vegetadas",
    "Outras Lavouras Temporárias": "Lavouras temporárias",
    "Rio, Lago e Oceano": "Água"
  };
  return atalhos[texto] || texto;
}

function chaveArea(ano) {
  return "area" + ano;
}

function areaDaClasse(dn, ano) {
  return classesUsoDoSolo[dn][chaveArea(ano)];
}

function diferenca(dn) {
  return classesUsoDoSolo[dn].area2022 - classesUsoDoSolo[dn].area2012;
}

function formatarArea(valor) {
  return numero.format(valor) + " km²";
}

function formatarMudanca(valor) {
  return (valor >= 0 ? "+" : "") + numero.format(valor) + " km²";
}

function rgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
}

function forEachRing(geometry, callback) {
  if (!geometry || !geometry.coordinates) return;
  if (geometry.type === "Polygon") geometry.coordinates.forEach(callback);
  if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach(function (polygon) { polygon.forEach(callback); });
  }
}

function calcularBoundsGeojson(geojson) {
  const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  function visitarCoordenadas(coordenadas) {
    if (!Array.isArray(coordenadas)) return;
    if (typeof coordenadas[0] === "number" && typeof coordenadas[1] === "number") {
      bounds.minX = Math.min(bounds.minX, coordenadas[0]);
      bounds.maxX = Math.max(bounds.maxX, coordenadas[0]);
      bounds.minY = Math.min(bounds.minY, coordenadas[1]);
      bounds.maxY = Math.max(bounds.maxY, coordenadas[1]);
      return;
    }
    coordenadas.forEach(visitarCoordenadas);
  }
  geojson.features.forEach(function (feature) {
    if (feature.geometry) visitarCoordenadas(feature.geometry.coordinates);
  });
  return bounds;
}

function faixaDaPopulacao(valor) {
  return faixasPopulacao.find(function (faixa, indice) {
    return valor >= faixa.min && (indice === faixasPopulacao.length - 1 ? valor <= faixa.max : valor < faixa.max);
  }) || faixasPopulacao[0];
}

function indiceFaixaDaPopulacao(valor) {
  return faixasPopulacao.findIndex(function (faixa, indice) {
    return valor >= faixa.min && (indice === faixasPopulacao.length - 1 ? valor <= faixa.max : valor < faixa.max);
  });
}

async function carregarPopulacao() {
  if (estado.populacao) return estado.populacao;
  async function carregarLimite() {
    if (window.location.protocol === "file:") return null;
    const resposta = await fetch("Popula%C3%A7%C3%A3o/Cajari.geojson");
    return resposta.ok ? resposta.json() : null;
  }
  if (window.POPULACAO_SETORES) {
    estado.populacao = {
      geojson: window.POPULACAO_SETORES,
      limite: await carregarLimite(),
      bounds: calcularBoundsGeojson(window.POPULACAO_SETORES)
    };
    return estado.populacao;
  }
  if (window.location.protocol === "file:") throw new Error("PROTOCOLO_ARQUIVO");
  const resposta = await fetch("Popula%C3%A7%C3%A3o/Populacao_setores_cesintarios.geojson");
  if (!resposta.ok) throw new Error("Falha ao carregar setores censitários.");
  const geojson = await resposta.json();
  estado.populacao = { geojson: geojson, limite: await carregarLimite(), bounds: calcularBoundsGeojson(geojson) };
  return estado.populacao;
}

async function carregarGeojson(caminho, descricao) {
  if (window.location.protocol === "file:") throw new Error("PROTOCOLO_ARQUIVO");
  const resposta = await fetch(caminho);
  if (!resposta.ok) throw new Error("Falha ao carregar " + descricao + ".");
  return resposta.json();
}

function somarAreaHidrografia(geojson) {
  return geojson.features.reduce(function (soma, feature) {
    const p = feature.properties || {};
    const valor = Number(p.nuareakm2 || p.area_km2 || p.AREA_KM2 || 0);
    return soma + (Number.isFinite(valor) ? valor : 0);
  }, 0);
}

async function carregarHidrografia() {
  if (estado.hidrografia) return estado.hidrografia;
  const limite = await carregarGeojson("hidrografia/Cajari.geojson", "limite municipal");
  const respostas = await Promise.all(camadasHidrografia.map(function (camada) {
    return carregarGeojson(camada.arquivo, camada.nome);
  }));
  const camadas = {};
  camadasHidrografia.forEach(function (camada, indice) {
    camadas[camada.id] = {
      info: camada,
      geojson: respostas[indice],
      area: camada.tipo === "poligono" ? somarAreaHidrografia(respostas[indice]) : 0
    };
  });
  const rasters = {};
  rastersHidrografia.forEach(function (info) {
    rasters[info.id] = { info: info, carregando: false, visivel: false };
  });
  estado.hidrografia = {
    limite: limite,
    camadas: camadas,
    rasters: rasters,
    bounds: calcularBoundsGeojson(limite)
  };
  carregarRastersHidrografiaEmSegundoPlano();
  return estado.hidrografia;
}

function carregarRastersHidrografiaEmSegundoPlano() {
  if (!estado.hidrografia || estado.hidrografia.rastersCarregando) return;
  estado.hidrografia.rastersCarregando = true;
  rastersHidrografia.forEach(function (info) {
    carregarTiff(info.arquivo, info.nome).then(function (raster) {
      raster.info = info;
      raster.visivel = false;
      estado.hidrografia.rasters[info.id] = raster;
      return atualizarImagemRasterHidrografia(info.id);
    }).then(function () {
      agendarDesenho();
    }).catch(function (erro) {
      estado.hidrografia.rasters[info.id] = { info: info, erro: true };
      console.error(erro);
    });
  });
}

async function carregarLocalidades() {
  if (estado.localidades) return estado.localidades;
  const limite = await carregarGeojson("Cajari.geojson", "limite municipal");
  const [povoados, estradas, rios] = await Promise.all([
    carregarGeojson("LOCALIZACAO_POVOADOS/Povoados.geojson", "povoados"),
    carregarGeojson("LOCALIZACAO_POVOADOS/Estradas_recortado.geojson?v=20260612-estradas", "estradas recortadas"),
    carregarGeojson("LOCALIZACAO_POVOADOS/Rios.geojson", "rios")
  ]);
  estado.localidades = {
    limite: limite,
    povoados: povoados,
    estradas: estradas,
    rios: rios,
    mde: null,
    mdeVisivel: true,
    mdeCarregando: true,
    bounds: calcularBoundsGeojson(limite)
  };
  carregarMdeLocalidadesEmSegundoPlano();
  return estado.localidades;
}

function carregarMdeLocalidadesEmSegundoPlano() {
  if (!estado.localidades || estado.localidades.mdeSolicitado) return;
  estado.localidades.mdeSolicitado = true;
  carregarTiff("LOCALIZACAO_POVOADOS/Cajari_DEM_recortado.tif", "MDE de localidades").then(function (mde) {
    estado.localidades.mde = mde;
    estado.localidades.mdeCarregando = false;
    return atualizarImagemMdeLocalidades();
  }).then(function () {
    if (estado.modulo === "localidades") {
      renderizarPainelLocalidades();
      agendarDesenho();
    }
  }).catch(function (erro) {
    estado.localidades.mdeCarregando = false;
    console.error(erro);
  });
}

async function carregarTiff(caminho, descricao) {
  if (window.location.protocol === "file:") {
    throw new Error("PROTOCOLO_ARQUIVO");
  }
  const resposta = await fetch(caminho);
  if (!resposta.ok) throw new Error("Falha ao carregar " + descricao + ".");
  const buffer = await resposta.arrayBuffer();
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const littleEndian = String.fromCharCode(bytes[0], bytes[1]) === "II";
  const uint16 = function (posicao) { return view.getUint16(posicao, littleEndian); };
  const uint32 = function (posicao) { return view.getUint32(posicao, littleEndian); };
  const float32 = function (posicao) { return view.getFloat32(posicao, littleEndian); };
  const float64 = function (posicao) { return view.getFloat64(posicao, littleEndian); };
  const ifd = uint32(4);
  const quantidadeTags = uint16(ifd);
  const tags = {};

  for (let i = 0; i < quantidadeTags; i += 1) {
    const posicao = ifd + 2 + i * 12;
    const codigo = uint16(posicao);
    tags[codigo] = {
      tipo: uint16(posicao + 2),
      quantidade: uint32(posicao + 4),
      posicaoValor: posicao + 8,
      ponteiro: uint32(posicao + 8)
    };
  }

  function valoresTag(codigo) {
    const tag = tags[codigo];
    if (!tag) return [];
    const tamanho = tag.tipo === 3 ? 2 : (tag.tipo === 11 ? 4 : (tag.tipo === 12 ? 8 : 4));
    const inicio = tag.quantidade * tamanho <= 4 ? tag.posicaoValor : tag.ponteiro;
    const valores = [];
    for (let i = 0; i < tag.quantidade; i += 1) {
      if (tag.tipo === 3) valores.push(uint16(inicio + i * tamanho));
      else if (tag.tipo === 11) valores.push(float32(inicio + i * tamanho));
      else if (tag.tipo === 12) valores.push(float64(inicio + i * tamanho));
      else valores.push(uint32(inicio + i * tamanho));
    }
    return valores;
  }

  const largura = valoresTag(256)[0];
  const altura = valoresTag(257)[0];
  const bits = valoresTag(258)[0] || 8;
  const formato = valoresTag(339)[0] || 1;
  const offsets = valoresTag(273);
  const tamanhos = valoresTag(279);
  const pixels = bits === 32 && formato === 3 ? new Float32Array(largura * altura) : new Uint8Array(largura * altura);
  let destino = 0;
  offsets.forEach(function (offset, indice) {
    if (bits === 32 && formato === 3) {
      const quantidade = tamanhos[indice] / 4;
      for (let i = 0; i < quantidade; i += 1) {
        pixels[destino + i] = float32(offset + i * 4);
      }
      destino += quantidade;
    } else {
      const trecho = bytes.subarray(offset, offset + tamanhos[indice]);
      pixels.set(trecho, destino);
      destino += trecho.length;
    }
  });

  return { largura: largura, altura: altura, pixels: pixels, imagem: null, bits: bits, formato: formato };
}

async function carregarRasterTiff(ano) {
  return carregarTiff("Cajari_" + ano + ".tif", "o raster de " + ano);
}

function atualizarImagemRaster(ano) {
  const raster = estado.dados[ano];
  if (!raster) return Promise.resolve();
  if (!raster.imagem) {
    raster.imagem = document.createElement("canvas");
    raster.imagem.width = raster.largura;
    raster.imagem.height = raster.altura;
  }
  const ctx = raster.imagem.getContext("2d");
  const imagem = ctx.createImageData(raster.largura, raster.altura);
  const alpha = Math.round(estado.opacidade * 255);
  raster.imagensDestaque = {};
  let i = 0;
  return new Promise(function (resolve) {
    function processarLote() {
      const limite = Math.min(i + 140000, raster.pixels.length);
      for (; i < limite; i += 1) {
        const dn = raster.pixels[i];
        const classe = classesUsoDoSolo[dn];
        if (!classe || !estado.filtros.has(dn)) continue;
        const cor = rgb(classe.cor);
        const indice = i * 4;
        imagem.data[indice] = cor[0];
        imagem.data[indice + 1] = cor[1];
        imagem.data[indice + 2] = cor[2];
        imagem.data[indice + 3] = alpha;
      }
      if (i < raster.pixels.length) {
        window.setTimeout(processarLote, 0);
      } else {
        ctx.putImageData(imagem, 0, 0);
        resolve();
      }
    }
    processarLote();
  });
}

function criarImagemDestaqueRaster(ano, dn) {
  const raster = estado.dados[ano];
  if (!raster || !raster.imagem) return Promise.resolve();
  raster.imagensDestaque = raster.imagensDestaque || {};
  if (raster.imagensDestaque[dn]) return Promise.resolve();
  const imagemClasse = document.createElement("canvas");
  imagemClasse.width = raster.largura;
  imagemClasse.height = raster.altura;
  const ctx = imagemClasse.getContext("2d");
  const imagem = ctx.createImageData(raster.largura, raster.altura);
  const classe = classesUsoDoSolo[dn];
  if (!classe) return Promise.resolve();
  const cor = rgb(classe.cor);
  const alpha = Math.round(estado.opacidade * 255);
  let i = 0;
  return new Promise(function (resolve) {
    function processarLote() {
      const limite = Math.min(i + 180000, raster.pixels.length);
      for (; i < limite; i += 1) {
        if (raster.pixels[i] !== dn) continue;
        const indice = i * 4;
        imagem.data[indice] = cor[0];
        imagem.data[indice + 1] = cor[1];
        imagem.data[indice + 2] = cor[2];
        imagem.data[indice + 3] = alpha;
      }
      if (i < raster.pixels.length) {
        window.setTimeout(processarLote, 0);
      } else {
        ctx.putImageData(imagem, 0, 0);
        raster.imagensDestaque[dn] = imagemClasse;
        resolve();
      }
    }
    processarLote();
  });
}

function corRelevo(valor) {
  return corQgisComOpacidade((faixaDoRelevo(valor) || faixasRelevo[0]).cor, 0.856);
}

function corQgisComOpacidade(hex, opacidade) {
  const cor = rgb(hex);
  return cor.map(function (canal) {
    return Math.round(canal * opacidade + 255 * (1 - opacidade));
  });
}

function corHidrografiaRaster(info, valor) {
  if (info.tipo === "alagamento") return rgb("#59BECB");
  if (info.tipo === "frequencia") {
    const intensidade = Math.max(0.2, Math.min(1, valor));
    return [
      Math.round(184 * (1 - intensidade) + 24 * intensidade),
      Math.round(230 * (1 - intensidade) + 112 * intensidade),
      Math.round(238 * (1 - intensidade) + 180 * intensidade)
    ];
  }
  return rgb("#B9D48A");
}

function valorValidoRasterHidrografia(valor, info) {
  if (!Number.isFinite(valor) || valor <= -1e20) return false;
  if (info.tipo === "mde") return valor > 0;
  return valor > 0;
}

function atualizarImagemRasterHidrografia(id) {
  const raster = estado.hidrografia && estado.hidrografia.rasters[id];
  if (!raster) return Promise.resolve();
  const info = raster.info;
  if (!raster.imagem) {
    raster.imagem = document.createElement("canvas");
    raster.imagem.width = raster.largura;
    raster.imagem.height = raster.altura;
  }
  const ctx = raster.imagem.getContext("2d");
  const imagem = ctx.createImageData(raster.largura, raster.altura);
  let i = 0;
  return new Promise(function (resolve) {
    function processarLote() {
      const limite = Math.min(i + 170000, raster.pixels.length);
      for (; i < limite; i += 1) {
        const valor = raster.pixels[i];
        if (!valorValidoRasterHidrografia(valor, info)) continue;
        const cor = corHidrografiaRaster(info, valor);
        const alphaBase = info.tipo === "mde" ? 42 : (info.tipo === "frequencia" ? Math.round(55 + Math.min(1, valor) * 88) : 112);
        const indice = i * 4;
        imagem.data[indice] = cor[0];
        imagem.data[indice + 1] = cor[1];
        imagem.data[indice + 2] = cor[2];
        imagem.data[indice + 3] = alphaBase;
      }
      if (i < raster.pixels.length) {
        window.setTimeout(processarLote, 0);
      } else {
        ctx.putImageData(imagem, 0, 0);
        resolve();
      }
    }
    processarLote();
  });
}

function criarContornoRaster(raster) {
  const canvasContorno = document.createElement("canvas");
  canvasContorno.width = raster.largura;
  canvasContorno.height = raster.altura;
  const ctx = canvasContorno.getContext("2d");
  const imagem = ctx.createImageData(raster.largura, raster.altura);
  function marcarPixel(indice, vermelho, verde, azul, alpha) {
    if (indice < 0 || indice >= raster.pixels.length) return;
    const p = indice * 4;
    if (imagem.data[p + 3] > alpha) return;
    imagem.data[p] = vermelho;
    imagem.data[p + 1] = verde;
    imagem.data[p + 2] = azul;
    imagem.data[p + 3] = alpha;
  }
  for (let y = 0; y < raster.altura; y += 1) {
    for (let x = 0; x < raster.largura; x += 1) {
      const i = y * raster.largura + x;
      if (!Number.isFinite(raster.pixels[i]) || raster.pixels[i] <= 0) continue;
      const borda = x === 0 || y === 0 || x === raster.largura - 1 || y === raster.altura - 1 ||
        raster.pixels[i - 1] <= 0 || raster.pixels[i + 1] <= 0 ||
        raster.pixels[i - raster.largura] <= 0 || raster.pixels[i + raster.largura] <= 0;
      if (!borda) continue;
      marcarPixel(i - raster.largura, 255, 255, 255, 180);
      marcarPixel(i - 1, 255, 255, 255, 180);
      marcarPixel(i + 1, 255, 255, 255, 180);
      marcarPixel(i + raster.largura, 255, 255, 255, 180);
      marcarPixel(i, 8, 60, 52, 225);
    }
  }
  ctx.putImageData(imagem, 0, 0);
  raster.contorno = canvasContorno;
}

function faixaDoRelevo(valor) {
  return faixasRelevo.find(function (faixa, indice) {
    return valor >= faixa.min && (indice === faixasRelevo.length - 1 ? valor <= faixa.max : valor < faixa.max);
  }) || faixasRelevo[0];
}

function indiceFaixaDoRelevo(valor) {
  return faixasRelevo.findIndex(function (faixa, indice) {
    return valor >= faixa.min && (indice === faixasRelevo.length - 1 ? valor <= faixa.max : valor < faixa.max);
  });
}

function atualizarImagemRelevo() {
  const raster = estado.relevo;
  if (!raster) return Promise.resolve();
  if (!raster.imagem) {
    raster.imagem = document.createElement("canvas");
    raster.imagem.width = raster.largura;
    raster.imagem.height = raster.altura;
  }
  const ctx = raster.imagem.getContext("2d");
  const imagem = ctx.createImageData(raster.largura, raster.altura);
  let minimo = Infinity;
  let maximo = -Infinity;
  let pixelMinimo = null;
  let pixelMaximo = null;
  let i = 0;
  return new Promise(function (resolve) {
    function processarLote() {
      const limite = Math.min(i + 160000, raster.pixels.length);
      for (; i < limite; i += 1) {
        const valor = raster.pixels[i];
        if (!Number.isFinite(valor) || valor <= 0) continue;
        if (valor < minimo) {
          minimo = valor;
          pixelMinimo = { coluna: i % raster.largura, linha: Math.floor(i / raster.largura), valor: valor };
        }
        if (valor > maximo) {
          maximo = valor;
          pixelMaximo = { coluna: i % raster.largura, linha: Math.floor(i / raster.largura), valor: valor };
        }
        const cor = corRelevo(valor);
        const faixa = indiceFaixaDoRelevo(valor);
        const destacada = estado.faixaRelevoAtiva === null || estado.faixaRelevoAtiva === faixa;
        const indice = i * 4;
        imagem.data[indice] = cor[0];
        imagem.data[indice + 1] = cor[1];
        imagem.data[indice + 2] = cor[2];
        imagem.data[indice + 3] = destacada ? 255 : 0;
      }
      if (i < raster.pixels.length) {
        window.setTimeout(processarLote, 0);
      } else {
        ctx.putImageData(imagem, 0, 0);
        raster.minimo = minimo;
        raster.maximo = maximo;
        raster.pixelMinimo = pixelMinimo;
        raster.pixelMaximo = pixelMaximo;
        resolve();
      }
    }
    processarLote();
  });
}

function atualizarImagemMdeLocalidades() {
  const raster = estado.localidades && estado.localidades.mde;
  if (!raster) return Promise.resolve();
  if (!raster.imagem) {
    raster.imagem = document.createElement("canvas");
    raster.imagem.width = raster.largura;
    raster.imagem.height = raster.altura;
  }
  const ctx = raster.imagem.getContext("2d");
  const imagem = ctx.createImageData(raster.largura, raster.altura);
  let minimo = Infinity;
  let maximo = -Infinity;
  let i = 0;
  return new Promise(function (resolve) {
    function processarLote() {
      const limite = Math.min(i + 170000, raster.pixels.length);
      for (; i < limite; i += 1) {
        const valor = raster.pixels[i];
        if (!Number.isFinite(valor) || valor <= 0 || valor <= -1e20) continue;
        minimo = Math.min(minimo, valor);
        maximo = Math.max(maximo, valor);
        const cor = corRelevo(valor);
        const indice = i * 4;
        imagem.data[indice] = cor[0];
        imagem.data[indice + 1] = cor[1];
        imagem.data[indice + 2] = cor[2];
        imagem.data[indice + 3] = 178;
      }
      if (i < raster.pixels.length) {
        window.setTimeout(processarLote, 0);
      } else {
        ctx.putImageData(imagem, 0, 0);
        raster.minimo = minimo;
        raster.maximo = maximo;
        resolve();
      }
    }
    processarLote();
  });
}

async function carregarRelevo() {
  if (estado.relevo) return estado.relevo;
  const raster = await carregarTiff("Frequencia_de_agua/mde_cajari_recorte.tif", "o mapa de relevo");
  estado.relevo = raster;
  criarContornoRaster(raster);
  await atualizarImagemRelevo();
  return raster;
}

function redimensionarCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  contexto.setTransform(dpr, 0, 0, dpr, 0, 0);
  agendarDesenho();
}

function caixaRaster() {
  const raster = estado.dados[estado.ano] || estado.dados["2022"] || estado.dados["2012"];
  return caixaParaRaster(raster);
}

function caixaParaRaster(raster) {
  if (!raster) return null;
  const margem = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.08;
  const escala = Math.min(
    (canvas.clientWidth - margem * 2) / raster.largura,
    (canvas.clientHeight - margem * 2) / raster.altura
  ) * estado.zoom;
  const largura = raster.largura * escala;
  const altura = raster.altura * escala;
  return {
    x: (canvas.clientWidth - largura) / 2 + estado.deslocamentoX,
    y: (canvas.clientHeight - altura) / 2 + estado.deslocamentoY,
    largura: largura,
    altura: altura
  };
}

function boundsDoMapaAtual() {
  const moduloVisual = estado.modulo === "inicio" ? ordemCarrossel[slideAtual] : estado.modulo;
  if (moduloVisual === "hidrografia" && estado.hidrografia) return estado.hidrografia.bounds;
  if (moduloVisual === "localidades" && estado.localidades) return estado.localidades.bounds;
  if (moduloVisual === "populacao" && estado.populacao) return estado.populacao.bounds;
  if (estado.populacao) return estado.populacao.bounds;
  if (estado.hidrografia) return estado.hidrografia.bounds;
  if (estado.localidades) return estado.localidades.bounds;
  return null;
}

function projetarPopulacao(point) {
  const bounds = boundsDoMapaAtual();
  if (!bounds) return [0, 0];
  const margem = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.08;
  const escala = Math.min(
    (canvas.clientWidth - margem * 2) / (bounds.maxX - bounds.minX),
    (canvas.clientHeight - margem * 2) / (bounds.maxY - bounds.minY)
  ) * estado.zoom;
  return [
    canvas.clientWidth / 2 + (point[0] - (bounds.minX + bounds.maxX) / 2) * escala + estado.deslocamentoX,
    canvas.clientHeight / 2 - (point[1] - (bounds.minY + bounds.maxY) / 2) * escala + estado.deslocamentoY
  ];
}

function desprojetarPopulacao(point) {
  const bounds = boundsDoMapaAtual();
  if (!bounds) return [0, 0];
  const margem = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.08;
  const escala = Math.min(
    (canvas.clientWidth - margem * 2) / (bounds.maxX - bounds.minX),
    (canvas.clientHeight - margem * 2) / (bounds.maxY - bounds.minY)
  ) * estado.zoom;
  return [
    (point[0] - canvas.clientWidth / 2 - estado.deslocamentoX) / escala + (bounds.minX + bounds.maxX) / 2,
    -(point[1] - canvas.clientHeight / 2 - estado.deslocamentoY) / escala + (bounds.minY + bounds.maxY) / 2
  ];
}

function longitudeParaTileX(longitude, zoom) {
  return (longitude + 180) / 360 * Math.pow(2, zoom);
}

function latitudeParaTileY(latitude, zoom) {
  const radianos = latitude * Math.PI / 180;
  return (1 - Math.asinh(Math.tan(radianos)) / Math.PI) / 2 * Math.pow(2, zoom);
}

function tileXParaLongitude(x, zoom) {
  return x / Math.pow(2, zoom) * 360 - 180;
}

function tileYParaLatitude(y, zoom) {
  return Math.atan(Math.sinh(Math.PI * (1 - 2 * y / Math.pow(2, zoom)))) * 180 / Math.PI;
}

function atualizarBasemap() {
  if (!estado.basemapAtivo || !boundsDoMapaAtual()) {
    basemap.classList.toggle("hidden", !estado.basemapAtivo);
    return;
  }
  basemap.classList.remove("hidden");
  const superiorEsquerdoVisivel = desprojetarPopulacao([0, 0]);
  const inferiorDireitoVisivel = desprojetarPopulacao([canvas.clientWidth, canvas.clientHeight]);
  const zoomTiles = Math.max(10, Math.min(15, Math.round(12 + Math.log2(estado.zoom))));
  const assinatura = [
    zoomTiles, canvas.clientWidth, canvas.clientHeight,
    estado.deslocamentoX.toFixed(1), estado.deslocamentoY.toFixed(1),
    estado.zoom.toFixed(3)
  ].join("|");
  if (assinatura === estado.basemapAssinatura) return;
  estado.basemapAssinatura = assinatura;
  basemap.innerHTML = "";
  const xMin = Math.floor(longitudeParaTileX(superiorEsquerdoVisivel[0], zoomTiles)) - 1;
  const xMax = Math.floor(longitudeParaTileX(inferiorDireitoVisivel[0], zoomTiles)) + 1;
  const yMin = Math.floor(latitudeParaTileY(superiorEsquerdoVisivel[1], zoomTiles)) - 1;
  const yMax = Math.floor(latitudeParaTileY(inferiorDireitoVisivel[1], zoomTiles)) + 1;

  for (let x = xMin; x <= xMax; x += 1) {
    for (let y = yMin; y <= yMax; y += 1) {
      const superiorEsquerdo = projetarPopulacao([tileXParaLongitude(x, zoomTiles), tileYParaLatitude(y, zoomTiles)]);
      const inferiorDireito = projetarPopulacao([tileXParaLongitude(x + 1, zoomTiles), tileYParaLatitude(y + 1, zoomTiles)]);
      const imagem = document.createElement("img");
      imagem.alt = "";
      imagem.decoding = "async";
      imagem.loading = "lazy";
      imagem.src = "https://tile.openstreetmap.org/" + zoomTiles + "/" + x + "/" + y + ".png";
      imagem.style.left = superiorEsquerdo[0] + "px";
      imagem.style.top = superiorEsquerdo[1] + "px";
      imagem.style.width = (inferiorDireito[0] - superiorEsquerdo[0]) + "px";
      imagem.style.height = (inferiorDireito[1] - superiorEsquerdo[1]) + "px";
      basemap.appendChild(imagem);
    }
  }
  const creditos = document.createElement("div");
  creditos.className = "basemap-attribution";
  creditos.innerHTML = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
  basemap.appendChild(creditos);
}

function tracarGeometry(ctx, geometry) {
  ctx.beginPath();
  forEachRing(geometry, function (ring) {
    if (!ring.length) return;
    const inicio = projetarPopulacao(ring[0]);
    ctx.moveTo(inicio[0], inicio[1]);
    for (let i = 1; i < ring.length; i += 1) {
      const ponto = projetarPopulacao(ring[i]);
      ctx.lineTo(ponto[0], ponto[1]);
    }
    ctx.closePath();
  });
}

function forEachLine(geometry, callback) {
  if (!geometry || !geometry.coordinates) return;
  if (geometry.type === "LineString") geometry.coordinates.forEach(callback);
  if (geometry.type === "MultiLineString") {
    geometry.coordinates.forEach(function (line) { line.forEach(callback); });
  }
}

function tracarLinhas(ctx, geometry) {
  ctx.beginPath();
  if (!geometry || !geometry.coordinates) return;
  const linhas = geometry.type === "LineString" ? [geometry.coordinates] :
    (geometry.type === "MultiLineString" ? geometry.coordinates : []);
  linhas.forEach(function (line) {
    if (!line.length) return;
    if (Math.abs(line[0][0]) > 180 || Math.abs(line[0][1]) > 90) return;
    const inicio = projetarPopulacao(line[0]);
    ctx.moveTo(inicio[0], inicio[1]);
    for (let i = 1; i < line.length; i += 1) {
      if (Math.abs(line[i][0]) > 180 || Math.abs(line[i][1]) > 90) continue;
      const ponto = projetarPopulacao(line[i]);
      ctx.lineTo(ponto[0], ponto[1]);
    }
  });
}

function nomeFeicaoHidrografia(feature, camada) {
  const p = feature.properties || {};
  return p.nome || p.NOME || p.name || p.nmoriginal || p.nmgenerico || p.nmespecifi ||
    formatarNomeCamadaHidrografia(p.layer) || camada.nome;
}

function formatarNomeCamadaHidrografia(valor) {
  if (!valor) return "";
  return String(valor)
    .replace(/^Iagarape/i, "Igarape")
    .replace(/_/g, " ")
    .replace(/\bIgarape\b/i, "Igarap\u00e9")
    .replace(/\b\w/g, function (letra) { return letra.toUpperCase(); });
}

function distanciaKmEntreCoordenadas(a, b) {
  const rad = Math.PI / 180;
  const lat1 = a[1] * rad;
  const lat2 = b[1] * rad;
  const dLat = (b[1] - a[1]) * rad;
  const dLon = (b[0] - a[0]) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function extensaoCursoAgua(feature) {
  const p = feature.properties || {};
  const declarada = Number(p.NUCOMPCDA || p.nucompcda || p.nucompgeom || p.NUCOMPGEO || p.extensao_km || 0);
  if (Number.isFinite(declarada) && declarada > 0) return declarada > 1000 ? declarada / 1000 : declarada;
  let total = 0;
  const linhas = feature.geometry.type === "LineString" ? [feature.geometry.coordinates] :
    (feature.geometry.type === "MultiLineString" ? feature.geometry.coordinates : []);
  linhas.forEach(function (line) {
    for (let i = 1; i < line.length; i += 1) {
      if (Math.abs(line[i][0]) > 180 || Math.abs(line[i][1]) > 90) continue;
      total += distanciaKmEntreCoordenadas(line[i - 1], line[i]);
    }
  });
  return total;
}

function desenharFeatureHidrografia(feature, camada, destaque) {
  const info = camada.info;
  const apagada = estado.camadaHidrografiaAtiva && estado.camadaHidrografiaAtiva !== info.id && !destaque;
  const rioPrincipal = info.id === "rio-maracu" || info.id === "rio-pindare";
  contexto.save();
  if (info.tipo === "poligono") {
    const contornoAgua = info.id === "lagos" ? "rgba(35, 139, 161, 0.38)" : "rgba(69, 157, 174, 0.34)";
    tracarGeometry(contexto, feature.geometry);
    contexto.globalAlpha = apagada ? 0.1 : (destaque ? 0.82 : Math.max(0.42, estado.opacidade * 0.58));
    contexto.fillStyle = info.cor;
    contexto.fill("evenodd");
    contexto.globalAlpha = 1;
    contexto.lineJoin = "round";
    contexto.strokeStyle = apagada ? "rgba(52, 125, 145, 0.1)" : (destaque ? "rgba(15, 104, 130, 0.64)" : contornoAgua);
    contexto.lineWidth = destaque ? 1.1 : 0.42;
    contexto.stroke();
  } else {
    tracarLinhas(contexto, feature.geometry);
    contexto.globalAlpha = apagada ? 0.18 : 1;
    contexto.strokeStyle = rioPrincipal ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.88)";
    contexto.lineWidth = (info.largura || 1.5) + (destaque ? 3.8 : (rioPrincipal ? 2.7 : 3.1));
    contexto.lineCap = "round";
    contexto.lineJoin = "round";
    contexto.stroke();
    tracarLinhas(contexto, feature.geometry);
    contexto.strokeStyle = info.cor;
    contexto.globalAlpha = apagada ? 0.18 : 1;
    contexto.setLineDash([]);
    contexto.lineWidth = (info.largura || 1.5) + (destaque ? 1.5 : (rioPrincipal ? 0.35 : 0.45));
    contexto.stroke();
  }
  contexto.restore();
}

function desenharFluxoHidrografia(feature, camada, tempo) {
  const info = camada.info;
  if (info.tipo !== "linha") return;
  const apagada = estado.camadaHidrografiaAtiva && estado.camadaHidrografiaAtiva !== info.id;
  if (apagada) return;
  const rioPrincipal = info.id === "rio-maracu" || info.id === "rio-pindare";
  const fase = -((tempo / (rioPrincipal ? 28 : 38)) % 34);
  contexto.save();
  tracarLinhas(contexto, feature.geometry);
  contexto.lineCap = "round";
  contexto.lineJoin = "round";
  contexto.setLineDash(rioPrincipal ? [12, 24] : [8, 24]);
  contexto.lineDashOffset = fase;
  contexto.strokeStyle = rioPrincipal ? "rgba(255, 255, 255, 0.76)" : "rgba(255, 255, 255, 0.48)";
  contexto.lineWidth = (info.largura || 1.5) + (rioPrincipal ? 1.25 : 0.85);
  contexto.stroke();
  tracarLinhas(contexto, feature.geometry);
  contexto.setLineDash(rioPrincipal ? [10, 26] : [6, 26]);
  contexto.lineDashOffset = fase - 4;
  contexto.strokeStyle = rioPrincipal ? "rgba(109, 224, 242, 0.72)" : "rgba(134, 229, 238, 0.44)";
  contexto.lineWidth = Math.max(1, (info.largura || 1.5) - 0.15);
  contexto.stroke();
  contexto.setLineDash([]);
  contexto.restore();
}

function desenharLimiteMunicipal(features, opcoes) {
  const cfg = Object.assign({
    halo: "rgba(255, 255, 255, 0.86)",
    linha: "rgba(3, 50, 42, 0.78)",
    larguraHalo: 2.4,
    larguraLinha: 1.05,
    tracejado: []
  }, opcoes || {});
  contexto.save();
  features.forEach(function (feature) {
    tracarGeometry(contexto, feature.geometry);
    contexto.strokeStyle = cfg.halo;
    contexto.lineWidth = cfg.larguraHalo;
    contexto.setLineDash([]);
    contexto.stroke();
    tracarGeometry(contexto, feature.geometry);
    contexto.strokeStyle = cfg.linha;
    contexto.lineWidth = cfg.larguraLinha;
    contexto.setLineDash(cfg.tracejado || []);
    contexto.stroke();
  });
  contexto.restore();
}

function desenharHidrografia() {
  if (!estado.hidrografia) return;
  rastersHidrografia.forEach(function (info) {
    const raster = estado.hidrografia.rasters && estado.hidrografia.rasters[info.id];
    if (!raster || !raster.imagem) return;
    if (!raster.visivel && estado.rasterHidrografiaAtivo !== info.id) return;
    const caixa = caixaParaRaster(raster);
    if (!caixa) return;
    contexto.save();
    contexto.imageSmoothingEnabled = false;
    contexto.globalAlpha = estado.rasterHidrografiaAtivo === info.id ? 1 : 0.74;
    contexto.drawImage(raster.imagem, caixa.x, caixa.y, caixa.largura, caixa.altura);
    contexto.restore();
  });
  camadasHidrografia.forEach(function (info) {
    const camada = estado.hidrografia.camadas[info.id];
    if (!camada || info.tipo !== "poligono") return;
    camada.geojson.features.forEach(function (feature) {
      const destaque = estado.feicaoHidrografiaHover === feature || estado.feicaoHidrografiaSelecionada === feature;
      desenharFeatureHidrografia(feature, camada, destaque);
    });
  });
  desenharLimiteMunicipal(estado.hidrografia.limite.features, {
    halo: "rgba(255, 255, 255, 0.84)",
    linha: "rgba(2, 44, 37, 0.76)",
    larguraHalo: 2.35,
    larguraLinha: 1.05,
    tracejado: []
  });
  camadasHidrografia.forEach(function (info) {
    const camada = estado.hidrografia.camadas[info.id];
    if (!camada || info.tipo !== "linha") return;
    camada.geojson.features.forEach(function (feature) {
      const destaque = estado.feicaoHidrografiaHover === feature || estado.feicaoHidrografiaSelecionada === feature;
      desenharFeatureHidrografia(feature, camada, destaque);
    });
  });
  if (estado.fluxoHidrografiaSelecionado) {
    const tempo = performance.now();
    camadasHidrografia.forEach(function (info) {
      const camada = estado.hidrografia.camadas[info.id];
      if (!camada || info.tipo !== "linha") return;
      camada.geojson.features.forEach(function (feature) {
        if (feature === estado.fluxoHidrografiaSelecionado) {
          desenharFluxoHidrografia(feature, camada, tempo);
        }
      });
    });
  }
}

function desenharPontoLocalidade(feature, destaque) {
  const ponto = feature.geometry && feature.geometry.coordinates;
  if (!ponto || feature.geometry.type !== "Point") return;
  const p = projetarPopulacao(ponto);
  contexto.save();
  contexto.translate(p[0], p[1]);
  contexto.shadowColor = destaque ? "rgba(5, 64, 51, 0.28)" : "rgba(5, 64, 51, 0.16)";
  contexto.shadowBlur = destaque ? 11 : 4;
  contexto.fillStyle = destaque ? "#0A6C50" : "#ffffff";
  contexto.strokeStyle = destaque ? "#ffffff" : "#0A6C50";
  contexto.lineWidth = destaque ? 2.4 : 1.6;
  contexto.beginPath();
  contexto.arc(0, 0, destaque ? 6.6 : 4.2, 0, Math.PI * 2);
  contexto.fill();
  contexto.stroke();
  contexto.shadowBlur = 0;
  contexto.fillStyle = destaque ? "#ffffff" : "#0A6C50";
  contexto.beginPath();
  contexto.arc(0, 0, destaque ? 2.2 : 1.55, 0, Math.PI * 2);
  contexto.fill();
  contexto.restore();
}

function nomeLocalidade(feature) {
  const p = feature.properties || {};
  return p.name || p.nome || p.NOME || "Localidade";
}

function desenharRotuloLocalidade(feature, destaque, ocupados) {
  const ponto = feature.geometry && feature.geometry.coordinates;
  if (!ponto || feature.geometry.type !== "Point") return;
  const nome = nomeLocalidade(feature);
  if (!nome) return;
  const p = projetarPopulacao(ponto);
  const tipo = (feature.properties && feature.properties.place) || "";
  const principal = tipo === "town" || nome.toLowerCase() === "cajari";
  const tamanho = principal ? 13 : 10.5;
  const peso = principal ? 800 : 720;
  const deslocamentos = principal ?
    [[12, -12], [12, 18], [-12, -12], [-12, 18]] :
    [[9, -9], [9, 15], [-9, -9], [-9, 15], [0, -17], [0, 22]];

  contexto.save();
  contexto.font = peso + " " + tamanho + "px Segoe UI, Arial, sans-serif";
  contexto.textBaseline = "middle";
  contexto.lineJoin = "round";
  const largura = contexto.measureText(nome).width;
  let escolhido = null;
  for (let i = 0; i < deslocamentos.length && !escolhido; i += 1) {
    const dx = deslocamentos[i][0];
    const dy = deslocamentos[i][1];
    const align = dx < 0 ? "right" : (dx === 0 ? "center" : "left");
    const x = p[0] + dx;
    const y = p[1] + dy;
    const x0 = align === "right" ? x - largura : (align === "center" ? x - largura / 2 : x);
    const caixa = { x: x0 - 4, y: y - tamanho / 2 - 4, w: largura + 8, h: tamanho + 8 };
    const sobrepoe = ocupados.some(function (item) {
      return caixa.x < item.x + item.w && caixa.x + caixa.w > item.x &&
        caixa.y < item.y + item.h && caixa.y + caixa.h > item.y;
    });
    if (!sobrepoe || principal || destaque) escolhido = { x: x, y: y, align: align, caixa: caixa };
  }
  if (!escolhido) {
    contexto.restore();
    return;
  }
  ocupados.push(escolhido.caixa);
  contexto.textAlign = escolhido.align;
  contexto.strokeStyle = destaque ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.9)";
  contexto.lineWidth = principal ? 5 : 4;
  contexto.strokeText(nome, escolhido.x, escolhido.y);
  contexto.fillStyle = destaque ? "#063f35" : (principal ? "#063f35" : "rgba(5, 54, 45, 0.86)");
  contexto.fillText(nome, escolhido.x, escolhido.y);
  contexto.restore();
}

function desenharCaixaArredondada(ctx, x, y, largura, altura, raio) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, largura, altura, raio);
    return;
  }
  ctx.moveTo(x + raio, y);
  ctx.lineTo(x + largura - raio, y);
  ctx.quadraticCurveTo(x + largura, y, x + largura, y + raio);
  ctx.lineTo(x + largura, y + altura - raio);
  ctx.quadraticCurveTo(x + largura, y + altura, x + largura - raio, y + altura);
  ctx.lineTo(x + raio, y + altura);
  ctx.quadraticCurveTo(x, y + altura, x, y + altura - raio);
  ctx.lineTo(x, y + raio);
  ctx.quadraticCurveTo(x, y, x + raio, y);
}

function desenharLocalidades() {
  if (!estado.localidades) return;
  contexto.save();
  if (estado.localidades.mdeVisivel && estado.localidades.mde && estado.localidades.mde.imagem) {
    const caixa = caixaParaRaster(estado.localidades.mde);
    if (caixa) {
      contexto.save();
      contexto.imageSmoothingEnabled = false;
      contexto.globalAlpha = estado.basemapAtivo ? 0.68 : 0.92;
      contexto.drawImage(estado.localidades.mde.imagem, caixa.x, caixa.y, caixa.largura, caixa.altura);
      contexto.restore();
    }
  }
  desenharLimiteMunicipal(estado.localidades.limite.features, {
    halo: "rgba(255, 255, 255, 0.84)",
    linha: "rgba(4, 57, 45, 0.74)",
    larguraHalo: 2.35,
    larguraLinha: 1.02,
    tracejado: []
  });
  estado.localidades.estradas.features.forEach(function (feature) {
    tracarLinhas(contexto, feature.geometry);
    contexto.strokeStyle = "rgba(255, 255, 255, 0.88)";
    contexto.lineWidth = 4.2;
    contexto.lineCap = "round";
    contexto.lineJoin = "round";
    contexto.stroke();
    tracarLinhas(contexto, feature.geometry);
    contexto.strokeStyle = "rgba(179, 111, 38, 0.82)";
    contexto.lineWidth = 2.1;
    contexto.stroke();
  });
  estado.localidades.rios.features.forEach(function (feature) {
    tracarLinhas(contexto, feature.geometry);
    contexto.strokeStyle = "rgba(255, 255, 255, 0.78)";
    contexto.lineWidth = 3.6;
    contexto.lineCap = "round";
    contexto.lineJoin = "round";
    contexto.stroke();
    tracarLinhas(contexto, feature.geometry);
    contexto.strokeStyle = "rgba(20, 111, 164, 0.84)";
    contexto.lineWidth = 1.7;
    contexto.stroke();
  });
  estado.localidades.povoados.features.forEach(function (feature) {
    const destaque = estado.localidadeHover === feature || estado.localidadeSelecionada === feature;
    desenharPontoLocalidade(feature, destaque);
  });
  const rotuloAtivo = estado.localidadeHover || estado.localidadeSelecionada;
  if (rotuloAtivo) desenharRotuloLocalidade(rotuloAtivo, true, []);
  contexto.restore();
}

function desenharPopulacao() {
  if (!estado.populacao) return;
  estado.populacao.geojson.features.forEach(function (feature) {
    const habitantes = Number(feature.properties.v0001) || 0;
    const faixa = faixaDaPopulacao(habitantes);
    const indiceFaixa = indiceFaixaDaPopulacao(habitantes);
    const destacada = estado.faixaPopulacaoAtiva === null || estado.faixaPopulacaoAtiva === indiceFaixa;
    tracarGeometry(contexto, feature.geometry);
    contexto.fillStyle = faixa.cor;
    contexto.globalAlpha = destacada ? estado.opacidade : 0.13;
    contexto.fill("evenodd");
    contexto.globalAlpha = 1;
    contexto.strokeStyle = destacada ? "rgba(8, 60, 52, 0.46)" : "rgba(15, 60, 50, 0.12)";
    contexto.lineWidth = estado.faixaPopulacaoAtiva === indiceFaixa ? 1.15 : 0.55;
    contexto.stroke();
  });
  if (estado.setorSelecionado) {
    contexto.save();
    tracarGeometry(contexto, estado.setorSelecionado.geometry);
    contexto.shadowColor = "rgba(8, 46, 37, 0.22)";
    contexto.shadowBlur = 10;
    contexto.strokeStyle = "rgba(255, 255, 255, 0.95)";
    contexto.lineWidth = 4.5;
    contexto.stroke();
    tracarGeometry(contexto, estado.setorSelecionado.geometry);
    contexto.shadowBlur = 0;
    contexto.strokeStyle = "rgba(5, 64, 51, 0.96)";
    contexto.lineWidth = 2.2;
    contexto.stroke();
    contexto.restore();
  }
  if (estado.populacao.limite) {
    contexto.save();
    estado.populacao.limite.features.forEach(function (feature) {
      tracarGeometry(contexto, feature.geometry);
      contexto.strokeStyle = "rgba(255, 255, 255, 0.92)";
      contexto.lineWidth = 2.6;
      contexto.stroke();
      tracarGeometry(contexto, feature.geometry);
      contexto.strokeStyle = "rgba(4, 57, 45, 0.78)";
      contexto.lineWidth = 1.05;
      contexto.stroke();
    });
    contexto.restore();
  }
}

function desenharGrade() {
  if (estado.basemapAtivo && boundsDoMapaAtual()) return;
  contexto.save();
  const escuro = document.body.classList.contains("dark-mode");
  const gradiente = contexto.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
  if (escuro) {
    gradiente.addColorStop(0, "#12231f");
    gradiente.addColorStop(0.6, "#172b25");
    gradiente.addColorStop(1, "#0f1c19");
  } else {
    gradiente.addColorStop(0, "#f7f4ec");
    gradiente.addColorStop(0.48, "#edf2e9");
    gradiente.addColorStop(1, "#dfece3");
  }
  contexto.fillStyle = gradiente;
  contexto.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  const luz = contexto.createRadialGradient(
    canvas.clientWidth * 0.48, canvas.clientHeight * 0.34, 0,
    canvas.clientWidth * 0.48, canvas.clientHeight * 0.34, canvas.clientWidth * 0.54
  );
  luz.addColorStop(0, escuro ? "rgba(79, 127, 101, 0.18)" : "rgba(255, 255, 255, 0.72)");
  luz.addColorStop(1, "rgba(255, 255, 255, 0)");
  contexto.fillStyle = luz;
  contexto.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  contexto.globalAlpha = escuro ? 0.22 : 0.32;
  contexto.strokeStyle = escuro ? "rgba(185, 211, 194, 0.18)" : "rgba(86, 128, 105, 0.18)";
  contexto.lineWidth = 1.2;
  for (let i = -1; i < 7; i += 1) {
    const y = canvas.clientHeight * (0.18 + i * 0.14);
    contexto.beginPath();
    contexto.moveTo(-80, y);
    contexto.bezierCurveTo(
      canvas.clientWidth * 0.22, y - 42,
      canvas.clientWidth * 0.48, y + 44,
      canvas.clientWidth + 90, y - 12
    );
    contexto.stroke();
  }
  contexto.globalAlpha = 1;
  contexto.restore();
}

function desenharRaster(ano, caixa, inicioX) {
  const raster = estado.dados[ano];
  if (!raster || !raster.imagem) return;
  const classeEmDestaque = classeUsoSoloEmDestaque();
  contexto.save();
  if (typeof inicioX === "number") {
    contexto.beginPath();
    contexto.rect(inicioX, 0, canvas.clientWidth - inicioX, canvas.clientHeight);
    contexto.clip();
  }
  contexto.imageSmoothingEnabled = false;
  if (classeEmDestaque !== null) contexto.globalAlpha = 0;
  contexto.drawImage(raster.imagem, caixa.x, caixa.y, caixa.largura, caixa.altura);
  contexto.globalAlpha = 1;
  const destaque = raster.imagensDestaque && raster.imagensDestaque[classeEmDestaque];
  if (destaque) contexto.drawImage(destaque, caixa.x, caixa.y, caixa.largura, caixa.altura);
  if (classeEmDestaque !== null && raster.contorno) {
    contexto.drawImage(raster.contorno, caixa.x, caixa.y, caixa.largura, caixa.altura);
  }
  contexto.restore();
}

function desenharRelevo() {
  const raster = estado.relevo;
  if (!raster || !raster.imagem) return;
  const caixa = caixaParaRaster(raster);
  if (!caixa) return;
  contexto.save();
  contexto.imageSmoothingEnabled = false;
  contexto.drawImage(raster.imagem, caixa.x, caixa.y, caixa.largura, caixa.altura);
  if (raster.contorno) contexto.drawImage(raster.contorno, caixa.x, caixa.y, caixa.largura, caixa.altura);
  if (estado.extremoRelevoFocado) {
    const x = caixa.x + (estado.extremoRelevoFocado.coluna + 0.5) / raster.largura * caixa.largura;
    const y = caixa.y + (estado.extremoRelevoFocado.linha + 0.5) / raster.altura * caixa.altura;
    const tipo = estado.extremoRelevoFocado.tipo === "max" ? "MAX" : "MIN";
    const cor = estado.extremoRelevoFocado.tipo === "max" ? "#b85f19" : "#087f8f";

    contexto.save();
    contexto.translate(x, y);
    contexto.shadowColor = "rgba(8, 46, 37, 0.22)";
    contexto.shadowBlur = 14;
    contexto.fillStyle = "rgba(255, 255, 255, 0.96)";
    contexto.strokeStyle = cor;
    contexto.lineWidth = 2.4;
    contexto.beginPath();
    contexto.arc(0, 0, 10, 0, Math.PI * 2);
    contexto.fill();
    contexto.stroke();
    contexto.shadowBlur = 0;
    contexto.strokeStyle = "#123d35";
    contexto.lineWidth = 1.2;
    contexto.beginPath();
    contexto.moveTo(-17, 0);
    contexto.lineTo(-11, 0);
    contexto.moveTo(11, 0);
    contexto.lineTo(17, 0);
    contexto.moveTo(0, -17);
    contexto.lineTo(0, -11);
    contexto.moveTo(0, 11);
    contexto.lineTo(0, 17);
    contexto.stroke();
    contexto.fillStyle = cor;
    contexto.beginPath();
    contexto.arc(0, 0, 3.5, 0, Math.PI * 2);
    contexto.fill();
    contexto.font = "700 9px Segoe UI, Arial, sans-serif";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = cor;
    contexto.strokeStyle = "rgba(255, 255, 255, 0.96)";
    contexto.lineWidth = 4;
    contexto.strokeText(tipo, 0, -28);
    contexto.fillText(tipo, 0, -28);
    contexto.restore();
  }
  contexto.restore();
}

function desenharDivisor() {
  const x = canvas.clientWidth * estado.divisor;
  const y = canvas.clientHeight / 2;
  contexto.save();
  contexto.strokeStyle = "#ffffff";
  contexto.lineWidth = 3;
  contexto.shadowColor = "rgba(8,46,37,.45)";
  contexto.shadowBlur = 9;
  contexto.beginPath();
  contexto.moveTo(x, 0);
  contexto.lineTo(x, canvas.clientHeight);
  contexto.stroke();
  contexto.fillStyle = "#ffffff";
  contexto.beginPath();
  contexto.arc(x, y, 22, 0, Math.PI * 2);
  contexto.fill();
  contexto.shadowBlur = 0;
  contexto.strokeStyle = "#0b5e45";
  contexto.lineWidth = 2;
  contexto.beginPath();
  contexto.moveTo(x - 8, y - 6);
  contexto.lineTo(x - 13, y);
  contexto.lineTo(x - 8, y + 6);
  contexto.moveTo(x + 8, y - 6);
  contexto.lineTo(x + 13, y);
  contexto.lineTo(x + 8, y + 6);
  contexto.stroke();
  contexto.restore();
}

function desenharMapa() {
  estado.desenhoPendente = false;
  atualizarBasemap();
  contexto.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  desenharGrade();
  if (estado.modulo === "inicio") {
    desenharMapaApresentacao();
    return;
  }
  if (estado.modulo === "populacao") {
    desenharPopulacao();
    return;
  }
  if (estado.modulo === "relevo") {
    desenharRelevo();
    return;
  }
  if (estado.modulo === "hidrografia") {
    desenharHidrografia();
    if (estado.fluxoHidrografiaSelecionado) window.requestAnimationFrame(agendarDesenho);
    return;
  }
  if (estado.modulo === "localidades") {
    desenharLocalidades();
    return;
  }
  const caixa = caixaRaster();
  if (!caixa) return;
  if (estado.comparando && estado.dados["2012"] && estado.dados["2022"]) {
    desenharRaster("2012", caixa);
    desenharRaster("2022", caixa, canvas.clientWidth * estado.divisor);
    desenharDivisor();
  } else {
    desenharRaster(estado.ano, caixa);
  }
}

function agendarDesenho() {
  if (estado.desenhoPendente) return;
  estado.desenhoPendente = true;
  window.requestAnimationFrame(desenharMapa);
}

function classeNoPonto(evento) {
  const caixa = caixaRaster();
  if (!caixa) return null;
  const rect = canvas.getBoundingClientRect();
  const x = evento.clientX - rect.left;
  const y = evento.clientY - rect.top;
  if (x < caixa.x || x > caixa.x + caixa.largura || y < caixa.y || y > caixa.y + caixa.altura) return null;
  const ano = estado.comparando && x < canvas.clientWidth * estado.divisor ? "2012" :
    (estado.comparando ? "2022" : estado.ano);
  const raster = estado.dados[ano];
  const coluna = Math.min(raster.largura - 1, Math.floor((x - caixa.x) / caixa.largura * raster.largura));
  const linha = Math.min(raster.altura - 1, Math.floor((y - caixa.y) / caixa.altura * raster.altura));
  const dn = raster.pixels[linha * raster.largura + coluna];
  return estado.filtros.has(dn) && classesUsoDoSolo[dn] ? dn : null;
}

function valorRelevoNoPonto(evento) {
  const raster = estado.relevo;
  const caixa = caixaParaRaster(raster);
  if (!raster || !caixa) return null;
  const rect = canvas.getBoundingClientRect();
  const x = evento.clientX - rect.left;
  const y = evento.clientY - rect.top;
  if (x < caixa.x || x > caixa.x + caixa.largura || y < caixa.y || y > caixa.y + caixa.altura) return null;
  const coluna = Math.min(raster.largura - 1, Math.floor((x - caixa.x) / caixa.largura * raster.largura));
  const linha = Math.min(raster.altura - 1, Math.floor((y - caixa.y) / caixa.altura * raster.altura));
  const valor = raster.pixels[linha * raster.largura + coluna];
  return Number.isFinite(valor) && valor > 0 ? valor : null;
}

function pontoDentroDoAnel(point, ring) {
  let dentro = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = projetarPopulacao(ring[i]);
    const b = projetarPopulacao(ring[j]);
    if (((a[1] > point[1]) !== (b[1] > point[1])) &&
      (point[0] < (b[0] - a[0]) * (point[1] - a[1]) / (b[1] - a[1]) + a[0])) {
      dentro = !dentro;
    }
  }
  return dentro;
}

function setorNoPonto(evento) {
  if (!estado.populacao) return null;
  const rect = canvas.getBoundingClientRect();
  const point = [evento.clientX - rect.left, evento.clientY - rect.top];
  return estado.populacao.geojson.features.find(function (feature) {
    let encontrado = false;
    forEachRing(feature.geometry, function (ring) {
      if (!encontrado && pontoDentroDoAnel(point, ring)) encontrado = true;
    });
    return encontrado;
  }) || null;
}

function distanciaSegmento(point, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(point[0] - a[0], point[1] - a[1]);
  const t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(point[0] - (a[0] + t * dx), point[1] - (a[1] + t * dy));
}

function linhaPertoDoPonto(point, geometry, tolerancia) {
  let perto = false;
  const linhas = geometry.type === "LineString" ? [geometry.coordinates] :
    (geometry.type === "MultiLineString" ? geometry.coordinates : []);
  linhas.forEach(function (line) {
    for (let i = 1; i < line.length && !perto; i += 1) {
      if (distanciaSegmento(point, projetarPopulacao(line[i - 1]), projetarPopulacao(line[i])) <= tolerancia) perto = true;
    }
  });
  return perto;
}

function feicaoHidrografiaNoPonto(evento) {
  if (!estado.hidrografia) return null;
  const rect = canvas.getBoundingClientRect();
  const point = [evento.clientX - rect.left, evento.clientY - rect.top];
  for (let i = camadasHidrografia.length - 1; i >= 0; i -= 1) {
    const info = camadasHidrografia[i];
    const camada = estado.hidrografia.camadas[info.id];
    if (!camada) continue;
    const features = camada.geojson.features;
    for (let j = features.length - 1; j >= 0; j -= 1) {
      const feature = features[j];
      if (info.tipo === "linha" && linhaPertoDoPonto(point, feature.geometry, 7)) {
        return { feature: feature, camada: camada };
      }
      if (info.tipo === "poligono") {
        let encontrado = false;
        forEachRing(feature.geometry, function (ring) {
          if (!encontrado && pontoDentroDoAnel(point, ring)) encontrado = true;
        });
        if (encontrado) return { feature: feature, camada: camada };
      }
    }
  }
  return null;
}

function localidadeNoPonto(evento) {
  if (!estado.localidades) return null;
  const rect = canvas.getBoundingClientRect();
  const point = [evento.clientX - rect.left, evento.clientY - rect.top];
  let melhor = null;
  let menorDistancia = Infinity;
  estado.localidades.povoados.features.forEach(function (feature) {
    if (!feature.geometry || feature.geometry.type !== "Point") return;
    const p = projetarPopulacao(feature.geometry.coordinates);
    const distancia = Math.hypot(point[0] - p[0], point[1] - p[1]);
    if (distancia < menorDistancia && distancia <= 10) {
      menorDistancia = distancia;
      melhor = feature;
    }
  });
  return melhor;
}

function atualizarDetalheLocalidade(feature) {
  if (!feature) {
    estado.localidadeHover = null;
    restaurarDetalheInicial("localidades");
    agendarDesenho();
    return;
  }
  estado.localidadeHover = feature;
  const p = feature.properties || {};
  const nome = nomeLocalidade(feature);
  const populacao = Number(p.population || 0);
  const tipo = p.place || "localidade";
  document.getElementById("detailCard").innerHTML =
    "<p class='eyebrow'>Localidade selecionada</p>" +
    "<h2>" + nome + "</h2>" +
    "<p class='detail-help'>Categoria: " + tipo + "</p>" +
    (populacao > 0 ? "<div class='detail-stats'><div><small>População informada</small><strong>" +
      populacao.toLocaleString("pt-BR") + "</strong></div></div>" : "");
  agendarDesenho();
}

function apontarLocalidade(feature) {
  if (feature === estado.localidadeHover) return;
  atualizarDetalheLocalidade(feature);
}

function limparSelecaoLocalidade() {
  estado.localidadeHover = null;
  estado.localidadeSelecionada = null;
  atualizarDetalheLocalidade(null);
}

function atualizarDetalheHidrografia(item) {
  if (!item) {
    estado.feicaoHidrografiaHover = null;
    restaurarDetalheInicial("hidrografia");
    agendarDesenho();
    return;
  }
  estado.feicaoHidrografiaHover = item.feature;
  const p = item.feature.properties || {};
  const area = Number(p.nuareakm2 || p.area_km2 || p.AREA_KM2 || 0);
  const extensao = item.camada.info.tipo === "linha" ? extensaoCursoAgua(item.feature) : 0;
  const detalheArea = area > 0 ? "<div><small>Área estimada</small><strong>" + formatarArea(area) + "</strong></div>" : "";
  const detalheExtensao = extensao > 0 ? "<div><small>Extensão</small><strong>" + numero.format(extensao) + " km</strong></div>" : "";
  document.getElementById("detailCard").innerHTML =
    "<p class='eyebrow'>Feição hídrica</p>" +
    "<h2>" + nomeFeicaoHidrografia(item.feature, item.camada.info) + "</h2>" +
    "<p class='detail-help'>Camada: " + item.camada.info.nome + ".</p>" +
    (detalheArea || detalheExtensao ? "<div class='detail-stats'>" + detalheExtensao + detalheArea + "</div>" : "");
  agendarDesenho();
}

function apontarHidrografia(item) {
  const feature = item ? item.feature : null;
  if (feature === estado.feicaoHidrografiaHover) return;
  atualizarDetalheHidrografia(item);
}

function limparSelecaoHidrografia() {
  estado.feicaoHidrografiaHover = null;
  estado.feicaoHidrografiaSelecionada = null;
  estado.fluxoHidrografiaSelecionado = null;
  atualizarDetalheHidrografia(null);
}

function atualizarDetalhePopulacao(feature) {
  estado.setorSelecionado = feature;
  const p = feature.properties;
  const densidade = Number(p.v0001) / Number(p.AREA_KM2);
  document.getElementById("detailCard").innerHTML =
    "<p class='eyebrow'>Setor censitário selecionado</p>" +
    "<h2>" + p.NM_DIST + "</h2>" +
    "<p class='detail-help'>Código do setor: " + p.CD_SETOR + "</p>" +
    "<div class='detail-stats'>" +
    "<div><small>Habitantes</small><strong>" + Number(p.v0001).toLocaleString("pt-BR") + "</strong></div>" +
    "<div><small>Domicílios</small><strong>" + Number(p.v0007).toLocaleString("pt-BR") + "</strong></div>" +
    "<div><small>Área do setor</small><strong>" + formatarArea(Number(p.AREA_KM2)) + "</strong></div>" +
    "<div><small>Densidade</small><strong>" + numero.format(densidade) + " hab/km²</strong></div>" +
    "</div>";
  agendarDesenho();
}

function atualizarDetalhe(dn) {
  estado.selecionada = dn;
  const classe = classesUsoDoSolo[dn];
  const delta = diferenca(dn);
  const resumoAreas = estado.comparando ?
    "<div><small>Área em 2012</small><strong>" + formatarArea(classe.area2012) + "</strong></div>" +
    "<div><small>Área em 2022</small><strong>" + formatarArea(classe.area2022) + "</strong></div>" :
    "<div><small>Área em " + estado.ano + "</small><strong>" + formatarArea(areaDaClasse(dn, estado.ano)) + "</strong></div>" +
    "<div><small>Mudança 2012-2022</small><strong class='" + (delta >= 0 ? "positive" : "negative") + "'>" +
    formatarMudanca(delta) + "</strong></div>";
  document.getElementById("detailCard").innerHTML =
    "<p class='eyebrow'>Classe selecionada</p>" +
    "<div class='selected-class'><span class='color-box' style='background:" + classe.cor + "'></span>" +
    classe.rotulo + "</div><div class='detail-stats'>" + resumoAreas + "</div>" +
    (estado.comparando ? "<p class='detail-help'>Mudança total: <strong class='" +
      (delta >= 0 ? "positive" : "negative") + "'>" + formatarMudanca(delta) + "</strong></p>" : "");
}

function atualizarDetalheRelevo(valor) {
  const faixa = faixaDoRelevo(valor);
  document.getElementById("detailCard").innerHTML =
    "<p class='eyebrow'>Ponto do relevo</p>" +
    "<h2>" + numero.format(valor) + " m</h2>" +
    "<p class='detail-help'>Altitude aproximada obtida a partir do Modelo Digital de Elevação.</p>" +
    "<div class='detail-stats'>" +
    "<div><small>Faixa hipsométrica</small><strong>" + faixa.rotulo + "</strong></div>" +
    "<div><small>Classe visual</small><strong><span class='color-box' style='background:" + faixa.cor + "'></span> Altitude</strong></div>" +
    "</div>";
}

function restaurarDetalheInicial(modulo) {
  const detalhe = document.getElementById("detailCard");
  if (!detalhe) return;
  if (modulo === "uso-solo") {
    detalhe.innerHTML =
      "<p class='eyebrow'>Selecione uma classe no mapa</p>" +
      "<h2>Uso do solo em <span id='anoDetalhe'>" + estado.ano + "</span></h2>" +
      "<p class='detail-help'>Aponte ou clique em uma \u00e1rea colorida para consultar a classe e sua evolu\u00e7\u00e3o.</p>";
  } else if (modulo === "populacao") {
    detalhe.innerHTML =
      "<p class='eyebrow'>Popula\u00e7\u00e3o por setor censit\u00e1rio</p>" +
      "<h2>Distribui\u00e7\u00e3o dos habitantes</h2>" +
      "<p class='detail-help'>Clique em um setor no mapa para consultar habitantes, domic\u00edlios, \u00e1rea e densidade demogr\u00e1fica.</p>";
  } else if (modulo === "relevo") {
    detalhe.innerHTML =
      "<p class='eyebrow'>Relevo e hipsometria</p><h2>Altitude do terreno</h2>" +
      "<p class='detail-help'>Aponte para consultar a altitude aproximada e a faixa hipsom\u00e9trica.</p>";
  } else if (modulo === "hidrografia") {
    detalhe.innerHTML =
      "<p class='eyebrow'>Hidrografia</p><h2>Rede h\u00eddrica de Cajari</h2>" +
      "<p class='detail-help'>Aponte para rios, igarap\u00e9s, lagos ou corpos d'\u00e1gua para consultar a camada mapeada.</p>";
  } else if (modulo === "localidades") {
    detalhe.innerHTML =
      "<p class='eyebrow'>Localidades</p><h2>Povoados e acessos</h2>" +
      "<p class='detail-help'>Aponte para um povoado para consultar nome, categoria e popula\u00e7\u00e3o quando dispon\u00edvel.</p>";
  }
}

function classeUsoSoloEmDestaque() {
  return estado.classeUsoSoloAtiva !== null ? estado.classeUsoSoloAtiva : estado.classeUsoSoloSelecionada;
}

function limparMetricasInterativas() {
  document.querySelectorAll(".metric").forEach(function (metric) {
    metric.classList.remove("metric-action");
    metric.removeAttribute("tabindex");
    metric.removeAttribute("role");
    metric.removeAttribute("aria-label");
    metric.removeAttribute("title");
    metric.onclick = null;
    metric.onkeydown = null;
  });
}

function limparSelecaoPopulacao() {
  if (!estado.setorSelecionado && estado.setorHoverId === null) return;
  estado.setorSelecionado = null;
  estado.setorHoverId = null;
  restaurarDetalheInicial("populacao");
  agendarDesenho();
}

function limparFocoUsoSolo() {
  if (estado.classeUsoSoloAtiva === null && estado.classeUsoSoloSelecionada === null && estado.classeUsoSoloHover === null) return;
  estado.classeUsoSoloAtiva = null;
  estado.classeUsoSoloSelecionada = null;
  estado.classeUsoSoloHover = null;
  document.querySelectorAll(".soil-range.active").forEach(function (item) {
    item.classList.remove("active");
  });
  restaurarDetalheInicial("uso-solo");
  agendarDesenho();
}

function selecionarClasseUsoSolo(dn) {
  if (!estado.filtros.has(dn)) return;
  estado.classeUsoSoloSelecionada = dn;
  estado.classeUsoSoloAtiva = null;
  estado.classeUsoSoloHover = null;
  atualizarDetalhe(dn);
  Promise.all(Object.keys(estado.dados).map(function (ano) {
    return criarImagemDestaqueRaster(ano, dn);
  })).then(function () {
    if (estado.classeUsoSoloSelecionada === dn) agendarDesenho();
  });
  agendarDesenho();
}

function apontarClasseUsoSolo(dn) {
  if (dn === estado.classeUsoSoloHover) return;
  estado.classeUsoSoloHover = dn;
  if (dn === null) {
    if (estado.classeUsoSoloSelecionada !== null) atualizarDetalhe(estado.classeUsoSoloSelecionada);
    else restaurarDetalheInicial("uso-solo");
    return;
  }
  atualizarDetalhe(dn);
}

function apontarSetorPopulacao(feature) {
  const id = feature ? feature.properties.CD_SETOR : null;
  if (id === estado.setorHoverId) return;
  estado.setorHoverId = id;
  if (feature) {
    atualizarDetalhePopulacao(feature);
  } else {
    limparSelecaoPopulacao();
  }
}

function limparFocoRelevo() {
  if (!estado.extremoRelevoFocado) {
    restaurarDetalheInicial("relevo");
    return;
  }
  estado.extremoRelevoFocado = null;
  restaurarDetalheInicial("relevo");
  agendarDesenho();
}

function configurarMetricasRelevo() {
  const metricas = document.querySelectorAll(".metric");
  const raster = estado.relevo;
  [
    { elemento: metricas[0], pixel: raster.pixelMinimo, tipo: "min", texto: "Ir para a menor altitude no mapa" },
    { elemento: metricas[1], pixel: raster.pixelMaximo, tipo: "max", texto: "Ir para a maior altitude no mapa" }
  ].forEach(function (item) {
    if (!item.elemento || !item.pixel) return;
    const pixel = Object.assign({ tipo: item.tipo }, item.pixel);
    item.elemento.classList.add("metric-action");
    item.elemento.setAttribute("tabindex", "0");
    item.elemento.setAttribute("role", "button");
    item.elemento.setAttribute("aria-label", item.texto);
    item.elemento.setAttribute("title", item.texto);
    item.elemento.onclick = function () { centralizarPontoRelevo(pixel); };
    item.elemento.onkeydown = function (evento) {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        centralizarPontoRelevo(pixel);
      }
    };
  });
}

async function carregarAno(ano) {
  estado.ano = ano;
  mostrarCarregamento(true, "Carregando mapa de " + ano + "...");
  document.querySelectorAll(".year-option").forEach(function (botao) {
    botao.classList.toggle("active", botao.dataset.year === ano);
  });
  document.getElementById("downloadGeojson").href = "Cajari_" + ano + ".geojson";
  document.getElementById("downloadGeojson").textContent = "Baixar dados " + ano;
  try {
    if (!estado.dados[ano]) estado.dados[ano] = await carregarRasterTiff(ano);
    if (!estado.dados[ano].contorno) criarContornoRaster(estado.dados[ano]);
    await atualizarImagemRaster(ano);
    renderizarInterface();
    agendarDesenho();
    if (estado.selecionada) atualizarDetalhe(estado.selecionada);
    else document.getElementById("anoDetalhe").textContent = ano;
  } catch (erro) {
    mostrarFalhaDeCarregamento(erro);
    console.error(erro);
  } finally {
    mostrarCarregamento(false);
  }
}

function mostrarFalhaDeCarregamento(erro) {
  const abertoComoArquivo = erro && erro.message === "PROTOCOLO_ARQUIVO";
  const titulo = abertoComoArquivo ? "Abra pelo atalho do geoportal" : "Não foi possível abrir o mapa";
  const texto = abertoComoArquivo ?
    "O navegador bloqueia os rasters quando o index.html é aberto diretamente. Use o arquivo abrir_geoportal.bat, ou acesse http://localhost:8080/ depois que o servidor estiver ativo." :
    "Confira se o servidor local está ligado e se os arquivos Cajari_2012.tif e Cajari_2022.tif estão na pasta do projeto.";
  document.getElementById("detailCard").innerHTML =
    "<p class='eyebrow'>Mapa não carregado</p><h2>" + titulo + "</h2>" +
    "<p class='detail-help'>" + texto + "</p>";
  document.getElementById("mapHint").textContent = abertoComoArquivo ?
    "Use abrir_geoportal.bat para carregar o mapa" :
    "Verifique o servidor local";
}

function renderizarPainelPopulacao() {
  limparMetricasInterativas();
  const features = estado.populacao.geojson.features;
  const total = features.reduce(function (soma, feature) { return soma + Number(feature.properties.v0001 || 0); }, 0);
  const domicilios = features.reduce(function (soma, feature) { return soma + Number(feature.properties.v0007 || 0); }, 0);
  document.getElementById("metricaPrimariaTitulo").textContent = "População total";
  document.getElementById("metricaSecundariaTitulo").textContent = "Domicílios";
  document.getElementById("areaVisivel").textContent = total.toLocaleString("pt-BR");
  document.getElementById("quantidadeClasses").textContent = features.length + " setores censitários";
  document.getElementById("classePrincipal").textContent = domicilios.toLocaleString("pt-BR");
  document.getElementById("areaPrincipal").textContent = "domicílios contabilizados";
  document.getElementById("fonteModulo").innerHTML =
    "Fonte: Censo Demográfico IBGE 2022, setores censitários.<br>Indicadores calculados por setor.";
  document.getElementById("indicadoresEyebrow").textContent = "Legenda";
  document.getElementById("indicadoresTitulo").textContent = "Habitantes por setor";
  document.getElementById("indicadoresMudanca").className = "change-list population-legend";
  document.getElementById("indicadoresMudanca").innerHTML = faixasPopulacao.map(function (faixa, indice) {
    return "<div class='change-row population-range' data-faixa='" + indice + "'><span class='legend-swatch' style='background:" + faixa.cor +
      "'></span><span>" + faixa.rotulo + "</span></div>";
  }).join("") + "<p class='population-summary'>Total municipal: <strong>" +
    total.toLocaleString("pt-BR") + " habitantes</strong>.</p>";
  document.querySelectorAll(".population-range").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      estado.faixaPopulacaoAtiva = Number(this.dataset.faixa);
      this.classList.add("active");
      agendarDesenho();
    });
    item.addEventListener("mouseleave", function () {
      estado.faixaPopulacaoAtiva = null;
      this.classList.remove("active");
      agendarDesenho();
    });
  });
}

function renderizarPainelRelevo() {
  const raster = estado.relevo;
  limparMetricasInterativas();
  document.getElementById("metricaPrimariaTitulo").textContent = "Menor altitude";
  document.getElementById("metricaSecundariaTitulo").textContent = "Maior altitude";
  document.getElementById("areaVisivel").textContent = numero.format(raster.minimo) + " m";
  document.getElementById("quantidadeClasses").textContent = "MDE recortado para Cajari";
  document.getElementById("classePrincipal").textContent = numero.format(raster.maximo) + " m";
  document.getElementById("areaPrincipal").textContent = "altitude aproximada";
  document.getElementById("fonteModulo").innerHTML =
    "Fonte: Modelo Digital de Elevação recortado para Cajari.<br>Altitudes aproximadas em metros.";
  document.getElementById("indicadoresEyebrow").textContent = "Legenda";
  document.getElementById("indicadoresTitulo").textContent = "Faixas de altitude";
  document.getElementById("indicadoresMudanca").className = "change-list population-legend relief-legend";
  document.getElementById("indicadoresMudanca").innerHTML = faixasRelevo.map(function (faixa, indice) {
    return "<div class='change-row relief-range' data-faixa='" + indice + "'><span class='legend-swatch' style='background:" + faixa.cor +
      "'></span><span>" + faixa.rotulo + "</span></div>";
  }).join("") + "<p class='population-summary'>Altitude estimada entre <strong>" +
    numero.format(raster.minimo) + " m</strong> e <strong>" + numero.format(raster.maximo) + " m</strong>.</p>";
  document.querySelectorAll(".relief-range").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      estado.faixaRelevoAtiva = Number(this.dataset.faixa);
      this.classList.add("active");
      atualizarImagemRelevo().then(agendarDesenho);
    });
    item.addEventListener("mouseleave", function () {
      estado.faixaRelevoAtiva = null;
      this.classList.remove("active");
      atualizarImagemRelevo().then(agendarDesenho);
    });
  });
  configurarMetricasRelevo();
}

function renderizarPainelUsoSolo() {
  limparMetricasInterativas();
  document.getElementById("metricaPrimariaTitulo").textContent = "Área exibida";
  document.getElementById("metricaSecundariaTitulo").textContent = "Maior classe";
  document.getElementById("fonteModulo").innerHTML =
    "Fonte: classificação de uso e cobertura do solo fornecida no projeto.<br>Áreas calculadas em km².";
  document.getElementById("indicadoresEyebrow").textContent = "Comparativo";
  document.getElementById("indicadoresTitulo").textContent = "Mudança 2012-2022";
  document.getElementById("indicadoresMudanca").className = "change-list";
  renderizarInterface();
}

function renderizarPainelHidrografia() {
  limparMetricasInterativas();
  const totalTrechos = camadasHidrografia.filter(function (camada) {
    return camada.tipo === "linha";
  }).reduce(function (soma, camada) {
    return soma + estado.hidrografia.camadas[camada.id].geojson.features.length;
  }, 0);
  const totalAreas = camadasHidrografia.filter(function (camada) {
    return camada.tipo === "poligono";
  }).reduce(function (soma, camada) {
    return soma + estado.hidrografia.camadas[camada.id].geojson.features.length;
  }, 0);
  const areaAgua = camadasHidrografia.filter(function (camada) {
    return camada.tipo === "poligono";
  }).reduce(function (soma, camada) {
    return soma + estado.hidrografia.camadas[camada.id].area;
  }, 0);
  const totalCamadas = camadasHidrografia.length + rastersHidrografia.length;
  document.getElementById("metricaPrimariaTitulo").textContent = "Camadas QGIS";
  document.getElementById("metricaSecundariaTitulo").textContent = "Áreas d'água";
  document.getElementById("areaVisivel").textContent = totalCamadas.toLocaleString("pt-BR");
  document.getElementById("quantidadeClasses").textContent = totalTrechos.toLocaleString("pt-BR") + " trechos lineares";
  document.getElementById("classePrincipal").textContent = areaAgua > 0 ? numero.format(areaAgua) + " km²" : totalAreas.toLocaleString("pt-BR");
  document.getElementById("areaPrincipal").textContent = areaAgua > 0 ? totalAreas + " feições mapeadas" : "feições mapeadas";
  document.getElementById("fonteModulo").innerHTML =
    "Fonte: projeto QGIS de hidrografia fornecido.<br>Camadas vetoriais e rasters referenciados no arquivo Hidrografia.qgz.";
  document.getElementById("indicadoresEyebrow").textContent = "Legenda";
  document.getElementById("indicadoresTitulo").textContent = "Camadas do projeto QGIS";
  document.getElementById("indicadoresMudanca").className = "change-list population-legend hydro-legend";
  const legendaRasters = rastersHidrografia.map(function (raster) {
    return "<div class='change-row hydro-raster-range' data-raster='" + raster.id + "'><span class='legend-swatch raster-swatch' style='background:" +
      raster.cor + "'></span><span>" + raster.nome + "</span><strong>raster</strong></div>";
  }).join("");
  const legendaVetores = camadasHidrografia.map(function (camada) {
    const total = estado.hidrografia.camadas[camada.id].geojson.features.length;
    return "<div class='change-row hydro-range' data-camada='" + camada.id + "'><span class='legend-swatch' style='background:" +
      camada.cor + ";border-color:" + (camada.contorno || camada.cor) + "'></span><span>" + camada.nome +
      "</span><strong>" + total.toLocaleString("pt-BR") + "</strong></div>";
  }).join("");
  document.getElementById("indicadoresMudanca").innerHTML = legendaRasters + legendaVetores +
    "<p class='population-summary'>Frequência e alagamento ficam desligados por padrão. Clique na legenda para exibir. O MDE foi mantido apenas no módulo Relevo.</p>";
  document.querySelectorAll(".hydro-range").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      estado.camadaHidrografiaAtiva = this.dataset.camada;
      this.classList.add("active");
      agendarDesenho();
    });
    item.addEventListener("mouseleave", function () {
      estado.camadaHidrografiaAtiva = null;
      this.classList.remove("active");
      agendarDesenho();
    });
  });
  document.querySelectorAll(".hydro-raster-range").forEach(function (item) {
    const raster = estado.hidrografia.rasters[item.dataset.raster];
    item.classList.toggle("active", Boolean(raster && raster.visivel));
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.addEventListener("mouseenter", function () {
      estado.rasterHidrografiaAtivo = this.dataset.raster;
      agendarDesenho();
    });
    item.addEventListener("mouseleave", function () {
      estado.rasterHidrografiaAtivo = null;
      agendarDesenho();
    });
    item.addEventListener("click", function () {
      const selecionado = estado.hidrografia.rasters[this.dataset.raster];
      if (!selecionado) return;
      selecionado.visivel = !selecionado.visivel;
      this.classList.toggle("active", selecionado.visivel);
      agendarDesenho();
    });
    item.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        this.click();
      }
    });
  });
}

function renderizarPainelLocalidades() {
  limparMetricasInterativas();
  const totalPovoados = estado.localidades.povoados.features.length;
  const totalEstradas = estado.localidades.estradas.features.length;
  const totalRios = estado.localidades.rios.features.length;
  const mde = estado.localidades.mde;
  document.getElementById("metricaPrimariaTitulo").textContent = "Localidades";
  document.getElementById("metricaSecundariaTitulo").textContent = "Hipsometria";
  document.getElementById("areaVisivel").textContent = totalPovoados.toLocaleString("pt-BR");
  document.getElementById("quantidadeClasses").textContent = "pontos mapeados";
  document.getElementById("classePrincipal").textContent = mde && Number.isFinite(mde.maximo) ? numero.format(mde.maximo) + " m" : totalEstradas.toLocaleString("pt-BR");
  document.getElementById("areaPrincipal").textContent = mde && Number.isFinite(mde.minimo) ? "mín. " + numero.format(mde.minimo) + " m" :
    (estado.localidades.mdeCarregando ? "MDE carregando..." : "trechos de estrada");
  document.getElementById("fonteModulo").innerHTML =
    "Fonte: projeto QGIS de localização dos povoados.<br>Camadas de povoados, estradas recortadas, rios, limite municipal e MDE hipsométrico.";
  document.getElementById("indicadoresEyebrow").textContent = "Legenda";
  document.getElementById("indicadoresTitulo").textContent = "Localização dos povoados";
  document.getElementById("indicadoresMudanca").className = "change-list population-legend hydro-legend";
  document.getElementById("indicadoresMudanca").innerHTML =
    "<div class='change-row locality-mde-range active' role='button' tabindex='0'><span class='legend-swatch raster-swatch' style='background:#B0D87F'></span><span>MDE hipsométrico</span><strong>" +
    (estado.localidades.mdeCarregando ? "carregando" : "raster") + "</strong></div>" +
    "<div class='change-row'><span class='legend-swatch' style='background:#0A6C50'></span><span>Povoados</span><strong>" + totalPovoados.toLocaleString("pt-BR") + "</strong></div>" +
    "<div class='change-row'><span class='legend-swatch' style='background:#B36F26'></span><span>Estradas recortadas</span><strong>" + totalEstradas.toLocaleString("pt-BR") + "</strong></div>" +
    "<div class='change-row'><span class='legend-swatch' style='background:#146FA4'></span><span>Rios</span><strong>" + totalRios.toLocaleString("pt-BR") + "</strong></div>" +
    "<p class='population-summary'>Camadas lidas do projeto <strong>Localizacao.qgz</strong>. A estrada recortada do GPKG foi convertida para GeoJSON para uso no navegador.</p>";
  document.querySelectorAll(".locality-mde-range").forEach(function (item) {
    item.classList.toggle("active", estado.localidades.mdeVisivel);
    item.addEventListener("click", function () {
      estado.localidades.mdeVisivel = !estado.localidades.mdeVisivel;
      this.classList.toggle("active", estado.localidades.mdeVisivel);
      agendarDesenho();
    });
    item.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        this.click();
      }
    });
  });
}

function atualizarCarrossel() {
  const track = document.getElementById("homeCarouselTrack");
  const dots = document.getElementById("carouselDots");
  if (!track || !dots) return;
  slideAtual = (slideAtual + ordemCarrossel.length) % ordemCarrossel.length;
  track.style.transform = "translateX(-" + (slideAtual * 100) + "%)";
  track.querySelectorAll(".carousel-slide").forEach(function (slide, indice) {
    slide.classList.toggle("active", indice === slideAtual);
  });
  dots.querySelectorAll(".carousel-dot").forEach(function (dot, indice) {
    dot.classList.toggle("active", indice === slideAtual);
  });
}

function atualizarApresentacaoInicio() {
  atualizarCarrossel();
  if (estado.modulo !== "inicio") return;
  const id = ordemCarrossel[slideAtual];
  const info = modulosGeoportal[id];
  const detalhe = document.getElementById("detailCard");
  if (!info || !detalhe) return;
  detalhe.classList.add("home-showcase");
  detalhe.innerHTML =
    "<p class='eyebrow'>Mapa em destaque</p>" +
    "<h2>" + info.titulo + "</h2>" +
    "<p class='detail-help'>" + info.texto + "</p>" +
    "<button class='showcase-open' type='button' data-module='" + id + "'>Abrir este mapa</button>" +
    "<div class='showcase-progress' aria-hidden='true'><span></span></div>";
  document.getElementById("mapHint").textContent =
    "Apresentacao automatica: " + info.titulo;
  carregarMapaApresentacao(id);
  agendarDesenho();
}

async function carregarMapaApresentacao(id) {
  const token = ++apresentacaoInicioToken;
  try {
    if (id === "uso-solo") {
      estado.ano = estado.ano || "2022";
      if (!estado.dados[estado.ano]) estado.dados[estado.ano] = await carregarRasterTiff(estado.ano);
      if (!estado.dados[estado.ano].contorno) criarContornoRaster(estado.dados[estado.ano]);
      if (!estado.dados[estado.ano].imagem) await atualizarImagemRaster(estado.ano);
    } else if (id === "populacao") {
      await carregarPopulacao();
    } else if (id === "relevo") {
      await carregarRelevo();
    } else if (id === "hidrografia") {
      await carregarHidrografia();
    } else if (id === "localidades") {
      await carregarLocalidades();
    }
    if (token === apresentacaoInicioToken && estado.modulo === "inicio") agendarDesenho();
  } catch (erro) {
    console.error(erro);
  }
}

function desenharMapaApresentacao() {
  const id = ordemCarrossel[slideAtual];
  if (id === "uso-solo") {
    const caixa = caixaRaster();
    if (caixa) desenharRaster(estado.ano || "2022", caixa);
    return;
  }
  if (id === "populacao") {
    desenharPopulacao();
    return;
  }
  if (id === "relevo") {
    desenharRelevo();
    return;
  }
  if (id === "hidrografia") {
    desenharHidrografia();
    return;
  }
  if (id === "localidades") {
    desenharLocalidades();
  }
}

function pararApresentacaoInicio() {
  if (apresentacaoInicioId) {
    window.clearInterval(apresentacaoInicioId);
    apresentacaoInicioId = null;
  }
}

function iniciarApresentacaoInicio() {
  pararApresentacaoInicio();
  apresentacaoInicioId = window.setInterval(function () {
    if (estado.modulo !== "inicio") {
      pararApresentacaoInicio();
      return;
    }
    slideAtual += 1;
    atualizarApresentacaoInicio();
  }, 5200);
}

function renderizarCarrosselInicial() {
  const track = document.getElementById("homeCarouselTrack");
  const dots = document.getElementById("carouselDots");
  if (!track || !dots) return;
  if (!track.children.length) {
    track.innerHTML = ordemCarrossel.map(function (id, indice) {
      const info = modulosGeoportal[id];
      return "<article class='carousel-slide' data-slide='" + id + "'>" +
        "<p class='eyebrow'>Mapa " + (indice + 1) + " de " + ordemCarrossel.length + "</p>" +
        "<h3>" + info.titulo + "</h3>" +
        "<p>" + info.texto + "</p>" +
        "<button class='carousel-open' type='button' data-module='" + id + "'>Abrir mapa</button>" +
        "</article>";
    }).join("");
  }
  dots.innerHTML = ordemCarrossel.map(function (_, indice) {
    return "<span class='carousel-dot" + (indice === slideAtual ? " active" : "") + "'></span>";
  }).join("");
  atualizarCarrossel();
}

function renderizarInicio() {
  estado.modulo = "inicio";
  document.querySelector(".map-stage").classList.add("home-mode");
  document.querySelectorAll(".module-card").forEach(function (botao) {
    botao.classList.remove("active");
    botao.removeAttribute("aria-current");
  });
  document.querySelectorAll(".soil-only").forEach(function (elemento) {
    elemento.classList.add("hidden");
  });
  document.getElementById("downloadGeojson").href = "Cajari.geojson";
  document.getElementById("downloadGeojson").textContent = "Baixar limite";
  document.getElementById("moduleInfo").classList.remove("pending");
  document.getElementById("moduleInfo").innerHTML =
    "<div class='section-heading'><div><p class='eyebrow'>Visão geral</p><h3>Escolha um mapa para começar</h3></div></div>" +
    "<p>Use o carrossel ou os cards de temas para abrir uso do solo, população, relevo, hidrografia ou localidades.</p>";
  document.getElementById("metricaPrimariaTitulo").textContent = "Mapas";
  document.getElementById("metricaSecundariaTitulo").textContent = "Município";
  document.getElementById("areaVisivel").textContent = ordemCarrossel.length.toLocaleString("pt-BR");
  document.getElementById("quantidadeClasses").textContent = "temas disponíveis";
  document.getElementById("classePrincipal").textContent = "Cajari";
  document.getElementById("areaPrincipal").textContent = "Maranhão";
  document.getElementById("indicadoresEyebrow").textContent = "Como usar";
  document.getElementById("indicadoresTitulo").textContent = "Navegação";
  document.getElementById("indicadoresMudanca").className = "change-list population-legend";
  document.getElementById("indicadoresMudanca").innerHTML =
    "<div class='change-row'><span class='legend-swatch' style='background:#0A6C50'></span><span>Escolha um mapa no carrossel</span></div>" +
    "<div class='change-row'><span class='legend-swatch' style='background:#B36F26'></span><span>Use zoom e enquadrar no mapa</span></div>" +
    "<div class='change-row'><span class='legend-swatch' style='background:#146FA4'></span><span>Aponte ou clique para consultar dados</span></div>";
  document.getElementById("fonteModulo").innerHTML =
    "Geoportal municipal de Cajari. Selecione um tema para carregar as camadas.";
  atualizarApresentacaoInicio();
  iniciarApresentacaoInicio();
  agendarDesenho();
}

async function selecionarModulo(modulo) {
  const info = modulosGeoportal[modulo];
  if (!info) return;
  pararApresentacaoInicio();
  document.querySelector(".map-stage").classList.remove("home-mode");
  document.getElementById("detailCard").classList.remove("home-showcase");
  if (modulo !== "uso-solo") await alternarComparacao(false);
  if (modulo !== "uso-solo") estado.classeUsoSoloAtiva = null;
  if (modulo !== "uso-solo") estado.classeUsoSoloSelecionada = null;
  if (modulo !== "uso-solo") estado.classeUsoSoloHover = null;
  if (modulo !== "populacao") estado.setorSelecionado = null;
  if (modulo !== "populacao") estado.setorHoverId = null;
  if (modulo !== "relevo") estado.extremoRelevoFocado = null;
  if (modulo !== "hidrografia") {
    estado.camadaHidrografiaAtiva = null;
    estado.rasterHidrografiaAtivo = null;
    estado.feicaoHidrografiaHover = null;
    estado.feicaoHidrografiaSelecionada = null;
    estado.fluxoHidrografiaSelecionado = null;
  }
  if (modulo !== "localidades") {
    estado.localidadeHover = null;
    estado.localidadeSelecionada = null;
  }
  estado.modulo = modulo;
  document.querySelectorAll(".module-card").forEach(function (botao) {
    botao.classList.toggle("active", botao.dataset.module === modulo);
    if (botao.dataset.module === modulo) {
      botao.setAttribute("aria-current", "true");
    } else {
      botao.removeAttribute("aria-current");
    }
  });
  const bloco = document.getElementById("moduleInfo");
  bloco.classList.toggle("pending", !info.pronto);
  bloco.innerHTML =
    "<div class='section-heading'><div><p class='eyebrow'>" +
    (info.pronto ? "Módulo ativo" : "Próximo módulo") +
    "</p><h3>" + info.titulo + "</h3></div></div><p>" + info.texto + "</p>";
  document.getElementById("mapHint").textContent = info.dica;
  document.querySelectorAll(".soil-only").forEach(function (elemento) {
    elemento.classList.toggle("hidden", modulo !== "uso-solo");
  });

  if (modulo === "uso-solo") {
    document.getElementById("downloadGeojson").href = "Cajari_" + estado.ano + ".geojson";
    document.getElementById("downloadGeojson").textContent = "Baixar dados " + estado.ano;
    renderizarPainelUsoSolo();
    estado.selecionada = null;
    restaurarDetalheInicial("uso-solo");
    agendarDesenho();
    if (!estado.dados[estado.ano]) carregarAno(estado.ano);
  } else if (modulo === "populacao") {
    document.getElementById("downloadGeojson").href = "Popula%C3%A7%C3%A3o/Populacao_setores_cesintarios.geojson";
    document.getElementById("downloadGeojson").textContent = "Baixar setores";
    mostrarCarregamento(true, "Carregando setores censitários...");
    try {
      await carregarPopulacao();
      renderizarPainelPopulacao();
      restaurarDetalheInicial("populacao");
      enquadrarMunicipio();
      agendarDesenho();
    } catch (erro) {
      mostrarFalhaDeCarregamento(erro);
      console.error(erro);
    } finally {
      mostrarCarregamento(false);
    }
  } else if (modulo === "relevo") {
    document.getElementById("downloadGeojson").href = "Frequencia_de_agua/mde_cajari_recorte.tif";
    document.getElementById("downloadGeojson").textContent = "Baixar MDE";
    estado.ultimaAltitudeCursor = null;
    estado.ultimoTempoAltitude = 0;
    mostrarCarregamento(true, "Carregando relevo...");
    try {
      await carregarRelevo();
      renderizarPainelRelevo();
      restaurarDetalheInicial("relevo");
      enquadrarMunicipio();
      agendarDesenho();
    } catch (erro) {
      mostrarFalhaDeCarregamento(erro);
      console.error(erro);
    } finally {
      mostrarCarregamento(false);
    }
  } else if (modulo === "hidrografia") {
    document.getElementById("downloadGeojson").href = "hidrografia/Hidrografia.qgz";
    document.getElementById("downloadGeojson").textContent = "Baixar hidrografia";
    mostrarCarregamento(true, "Carregando hidrografia...");
    try {
      await carregarHidrografia();
      renderizarPainelHidrografia();
      atualizarDetalheHidrografia(null);
      enquadrarMunicipio();
      agendarDesenho();
    } catch (erro) {
      mostrarFalhaDeCarregamento(erro);
      console.error(erro);
    } finally {
      mostrarCarregamento(false);
    }
  } else if (modulo === "localidades") {
    document.getElementById("downloadGeojson").href = "LOCALIZACAO_POVOADOS/Povoados.geojson";
    document.getElementById("downloadGeojson").textContent = "Baixar povoados";
    mostrarCarregamento(true, "Carregando localidades...");
    try {
      await carregarLocalidades();
      renderizarPainelLocalidades();
      atualizarDetalheLocalidade(null);
      enquadrarMunicipio();
      agendarDesenho();
    } catch (erro) {
      mostrarFalhaDeCarregamento(erro);
      console.error(erro);
    } finally {
      mostrarCarregamento(false);
    }
  } else {
    document.getElementById("detailCard").innerHTML =
      "<p class='eyebrow'>Camada futura</p><h2>" + info.titulo + "</h2>" +
      "<p class='detail-help'>Este tema já está reservado no geoportal. Quando os dados forem adicionados, ele ganhará camadas, legenda, indicadores e consulta no mapa.</p>";
  }
}

async function alternarComparacao(ativar) {
  const botao = document.getElementById("btnComparar");
  const palco = document.querySelector(".map-stage");
  if (!ativar) {
    pararAnimacaoComparacao();
    estado.comparando = false;
    botao.classList.remove("active");
    botao.setAttribute("aria-pressed", "false");
    botao.innerHTML = "<span class='compare-icon' aria-hidden='true'></span>Comparar 2012 / 2022 no mapa";
    palco.classList.remove("comparing");
    document.getElementById("mapHint").textContent = "Clique em uma feição para ver detalhes";
    if (estado.selecionada) atualizarDetalhe(estado.selecionada);
    agendarDesenho();
    return;
  }
  mostrarCarregamento(true, "Preparando comparação 2012 / 2022...");
  try {
    for (const ano of ["2012", "2022"]) {
      if (!estado.dados[ano]) estado.dados[ano] = await carregarRasterTiff(ano);
      if (!estado.dados[ano].contorno) criarContornoRaster(estado.dados[ano]);
      await atualizarImagemRaster(ano);
    }
    estado.comparando = true;
    estado.divisor = 0.04;
    botao.classList.add("active");
    botao.setAttribute("aria-pressed", "true");
    botao.innerHTML = "<span class='compare-icon' aria-hidden='true'></span>Parar transição";
    palco.classList.add("comparing");
    document.getElementById("mapHint").textContent = "Transição automática entre 2012 e 2022";
    if (estado.selecionada) atualizarDetalhe(estado.selecionada);
    iniciarAnimacaoComparacao();
    agendarDesenho();
  } catch (erro) {
    console.error(erro);
  } finally {
    mostrarCarregamento(false);
  }
}

function enquadrarMunicipio() {
  estado.zoom = 1;
  estado.deslocamentoX = 0;
  estado.deslocamentoY = 0;
  agendarDesenho();
}

function alterarZoom(fator) {
  estado.zoom = Math.max(0.8, Math.min(8, estado.zoom * fator));
  agendarDesenho();
}

function pararAnimacaoComparacao() {
  if (estado.animacaoComparacaoId) {
    window.cancelAnimationFrame(estado.animacaoComparacaoId);
    estado.animacaoComparacaoId = null;
  }
  estado.comparacaoAnimando = false;
}

function iniciarAnimacaoComparacao() {
  pararAnimacaoComparacao();
  estado.comparacaoAnimando = true;
  estado.tempoComparacaoInicio = 0;
  estado.direcaoComparacao = 1;
  estado.divisor = 0.04;

  function animarComparacao(tempo) {
    if (!estado.comparando || !estado.comparacaoAnimando) return;
    if (!estado.tempoComparacaoInicio) estado.tempoComparacaoInicio = tempo;
    const duracao = 4600;
    const progresso = Math.max(0, Math.min(1, (tempo - estado.tempoComparacaoInicio) / duracao));
    const suavizado = progresso < 0.5 ?
      4 * progresso * progresso * progresso :
      1 - Math.pow(-2 * progresso + 2, 3) / 2;
    estado.divisor = estado.direcaoComparacao === 1 ?
      0.04 + suavizado * 0.92 :
      0.96 - suavizado * 0.92;
    agendarDesenho();
    if (progresso >= 1) {
      estado.direcaoComparacao *= -1;
      estado.tempoComparacaoInicio = tempo + 700;
    }
    estado.animacaoComparacaoId = window.requestAnimationFrame(animarComparacao);
  }

  estado.animacaoComparacaoId = window.requestAnimationFrame(animarComparacao);
}

function centralizarPontoRelevo(pixel) {
  const raster = estado.relevo;
  if (!raster || !pixel) return;
  estado.zoom = Math.max(estado.zoom, 2.15);
  const margem = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.08;
  const escala = Math.min(
    (canvas.clientWidth - margem * 2) / raster.largura,
    (canvas.clientHeight - margem * 2) / raster.altura
  ) * estado.zoom;
  const largura = raster.largura * escala;
  const altura = raster.altura * escala;
  const xBase = canvas.clientWidth / 2 - largura / 2;
  const yBase = canvas.clientHeight / 2 - altura / 2;
  estado.deslocamentoX = canvas.clientWidth / 2 - (xBase + (pixel.coluna + 0.5) * escala);
  estado.deslocamentoY = canvas.clientHeight / 2 - (yBase + (pixel.linha + 0.5) * escala);
  estado.extremoRelevoFocado = pixel;
  atualizarDetalheRelevo(pixel.valor);
  agendarDesenho();
}

function atualizarMetricas() {
  const ativas = Object.keys(classesUsoDoSolo).map(Number).filter(function (dn) {
    return estado.filtros.has(dn);
  });
  const total = ativas.reduce(function (soma, dn) { return soma + areaDaClasse(dn, estado.ano); }, 0);
  const principal = ativas.sort(function (a, b) {
    return areaDaClasse(b, estado.ano) - areaDaClasse(a, estado.ano);
  })[0];
  document.getElementById("areaVisivel").textContent = formatarArea(total);
  document.getElementById("quantidadeClasses").textContent =
    ativas.length + (ativas.length === 1 ? " classe ativa" : " classes ativas");
  document.getElementById("classePrincipal").textContent = principal ? rotuloMetrica(classesUsoDoSolo[principal].rotulo) : "Nenhuma";
  document.getElementById("areaPrincipal").textContent = principal ? formatarArea(areaDaClasse(principal, estado.ano)) : "-";
}

function criarIndicadores() {
  const destaques = Object.keys(classesUsoDoSolo).map(Number).sort(function (a, b) {
    return Math.abs(diferenca(b)) - Math.abs(diferenca(a));
  }).slice(0, 4);
  document.getElementById("indicadoresMudanca").innerHTML = destaques.map(function (dn) {
    const classe = classesUsoDoSolo[dn];
    const delta = diferenca(dn);
    return "<div class='change-row'><span class='change-dot' style='background:" + classe.cor + "'></span>" +
      "<span>" + classe.rotulo + "</span><strong class='change-value " +
      (delta >= 0 ? "positive" : "negative") + "'>" + formatarMudanca(delta) + "</strong></div>";
  }).join("");
}

function criarFiltros() {
  const dns = Object.keys(classesUsoDoSolo).map(Number).sort(function (a, b) {
    return areaDaClasse(b, estado.ano) - areaDaClasse(a, estado.ano);
  });
  document.getElementById("listaFiltros").innerHTML = dns.map(function (dn) {
    const classe = classesUsoDoSolo[dn];
    return "<div class='filter-item soil-range' data-dn='" + dn + "'><input id='filtro-" + dn + "' type='checkbox' data-dn='" + dn + "' " +
      (estado.filtros.has(dn) ? "checked" : "") + "><label for='filtro-" + dn + "'>" +
      "<span class='color-box' style='background:" + classe.cor + "'></span>" +
      "<span class='filter-nome'>" + classe.rotulo + "</span>" +
      "<span class='filter-area'>" + numero.format(areaDaClasse(dn, estado.ano)) + "</span></label></div>";
  }).join("");
  document.querySelectorAll("#listaFiltros input").forEach(function (input) {
    input.addEventListener("change", function () {
      const dn = Number(this.dataset.dn);
      if (this.checked) estado.filtros.add(dn);
      else estado.filtros.delete(dn);
      aplicarFiltros();
    });
  });
  document.querySelectorAll(".soil-range").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      const dn = Number(this.dataset.dn);
      if (!estado.filtros.has(dn)) return;
      estado.classeUsoSoloAtiva = dn;
      this.classList.add("active");
      agendarDesenho();
      Promise.all(Object.keys(estado.dados).map(function (ano) {
        return criarImagemDestaqueRaster(ano, dn);
      })).then(function () {
        if (classeUsoSoloEmDestaque() === dn) agendarDesenho();
      });
    });
    item.addEventListener("mouseleave", function () {
      estado.classeUsoSoloAtiva = null;
      this.classList.remove("active");
      agendarDesenho();
    });
  });
}

function desenharGrafico() {
  const ativos = Object.keys(classesUsoDoSolo).map(Number).filter(function (dn) {
    return estado.filtros.has(dn);
  }).sort(function (a, b) {
    return areaDaClasse(b, estado.ano) - areaDaClasse(a, estado.ano);
  }).slice(0, 6);
  const maior = ativos.length ? areaDaClasse(ativos[0], estado.ano) : 1;
  document.getElementById("graficoArea").innerHTML = ativos.length ? ativos.map(function (dn) {
    const classe = classesUsoDoSolo[dn];
    const porcentagem = areaDaClasse(dn, estado.ano) / maior * 100;
    return "<div class='bar-row'><div class='bar-label'><span>" + classe.rotulo +
      "</span><strong>" + numero.format(areaDaClasse(dn, estado.ano)) + "</strong></div>" +
      "<div class='bar-track'><span class='bar-fill' style='width:" + porcentagem +
      "%;background:" + classe.cor + "'></span></div></div>";
  }).join("") : "<p class='detail-help'>Selecione classes para comparar.</p>";
}

function renderizarInterface() {
  atualizarMetricas();
  criarIndicadores();
  criarFiltros();
  desenharGrafico();
}

async function aplicarFiltros() {
  if (!estado.filtros.has(estado.classeUsoSoloAtiva)) estado.classeUsoSoloAtiva = null;
  if (!estado.filtros.has(estado.classeUsoSoloSelecionada)) estado.classeUsoSoloSelecionada = null;
  await Promise.all(Object.keys(estado.dados).map(atualizarImagemRaster));
  atualizarMetricas();
  desenharGrafico();
  agendarDesenho();
}

function mostrarCarregamento(ativo, mensagem) {
  const elemento = document.getElementById("indicadorCarga");
  elemento.style.display = ativo ? "flex" : "none";
  if (mensagem) elemento.querySelector("span").textContent = mensagem;
}

canvas.addEventListener("click", function (evento) {
  if (estado.movimento) return;
  if (estado.modulo === "populacao") {
    const setor = setorNoPonto(evento);
    if (setor) atualizarDetalhePopulacao(setor);
    else limparSelecaoPopulacao();
    return;
  }
  if (estado.modulo === "relevo") {
    const valor = valorRelevoNoPonto(evento);
    limparFocoRelevo();
    if (valor !== null) atualizarDetalheRelevo(valor);
    return;
  }
  if (estado.modulo === "hidrografia") {
    const item = feicaoHidrografiaNoPonto(evento);
    estado.feicaoHidrografiaSelecionada = item ? item.feature : null;
    estado.fluxoHidrografiaSelecionado = null;
    atualizarDetalheHidrografia(item);
    return;
  }
  if (estado.modulo === "localidades") {
    const localidade = localidadeNoPonto(evento);
    estado.localidadeSelecionada = localidade;
    atualizarDetalheLocalidade(localidade);
    return;
  }
  const dn = classeNoPonto(evento);
  if (dn) selecionarClasseUsoSolo(dn);
  else {
    estado.classeUsoSoloHover = null;
    limparFocoUsoSolo();
  }
});

canvas.addEventListener("pointerdown", function (evento) {
  estado.arrastando = true;
  estado.movimento = false;
  if (estado.comparando) {
    pararAnimacaoComparacao();
    document.getElementById("btnComparar").innerHTML = "<span class='compare-icon' aria-hidden='true'></span>Sair da comparação";
    document.getElementById("mapHint").textContent = "Controle manual: arraste a linha para comparar";
    estado.ajustandoDivisor = true;
    const rect = canvas.getBoundingClientRect();
    estado.divisor = Math.max(0.04, Math.min(0.96, (evento.clientX - rect.left) / rect.width));
    agendarDesenho();
  }
  estado.origemX = evento.clientX;
  estado.origemY = evento.clientY;
  canvas.classList.add("dragging");
  canvas.setPointerCapture(evento.pointerId);
});

canvas.addEventListener("pointermove", function (evento) {
  if (!estado.arrastando && estado.modulo === "populacao") {
    apontarSetorPopulacao(setorNoPonto(evento));
    return;
  }
  if (!estado.arrastando && estado.modulo === "uso-solo") {
    apontarClasseUsoSolo(classeNoPonto(evento));
    return;
  }
  if (!estado.arrastando && estado.modulo === "relevo") {
    const agora = performance.now();
    if (agora - estado.ultimoTempoAltitude > 90) {
      estado.ultimoTempoAltitude = agora;
      const valor = valorRelevoNoPonto(evento);
      if (valor !== null && (estado.ultimaAltitudeCursor === null || Math.abs(valor - estado.ultimaAltitudeCursor) >= 0.05)) {
        estado.ultimaAltitudeCursor = valor;
        atualizarDetalheRelevo(valor);
      }
    }
    return;
  }
  if (!estado.arrastando && estado.modulo === "hidrografia") {
    apontarHidrografia(feicaoHidrografiaNoPonto(evento));
    return;
  }
  if (!estado.arrastando && estado.modulo === "localidades") {
    apontarLocalidade(localidadeNoPonto(evento));
    return;
  }
  if (!estado.arrastando) return;
  const dx = evento.clientX - estado.origemX;
  const dy = evento.clientY - estado.origemY;
  if (Math.abs(dx) + Math.abs(dy) > 2) estado.movimento = true;
  if (estado.ajustandoDivisor) {
    const rect = canvas.getBoundingClientRect();
    estado.divisor = Math.max(0.04, Math.min(0.96, (evento.clientX - rect.left) / rect.width));
  } else {
    estado.deslocamentoX += dx;
    estado.deslocamentoY += dy;
  }
  estado.origemX = evento.clientX;
  estado.origemY = evento.clientY;
  agendarDesenho();
});

canvas.addEventListener("pointerup", function () {
  estado.arrastando = false;
  estado.ajustandoDivisor = false;
  canvas.classList.remove("dragging");
});

canvas.addEventListener("pointerleave", function () {
  if (estado.modulo === "populacao") limparSelecaoPopulacao();
  if (estado.modulo === "uso-solo") apontarClasseUsoSolo(null);
  if (estado.modulo === "relevo") {
    estado.ultimaAltitudeCursor = null;
    restaurarDetalheInicial("relevo");
  }
  if (estado.modulo === "hidrografia") limparSelecaoHidrografia();
  if (estado.modulo === "localidades") limparSelecaoLocalidade();
});

canvas.addEventListener("wheel", function (evento) {
  evento.preventDefault();
  alterarZoom(evento.deltaY < 0 ? 1.13 : 0.88);
}, { passive: false });

document.addEventListener("click", function (evento) {
  if (evento.target === canvas) return;
  if (evento.target.closest && evento.target.closest(".metric-action")) return;
  if (estado.modulo === "relevo") limparFocoRelevo();
  if (estado.modulo === "populacao") limparSelecaoPopulacao();
  if (estado.modulo === "uso-solo") limparFocoUsoSolo();
  if (estado.modulo === "hidrografia") limparSelecaoHidrografia();
  if (estado.modulo === "localidades") limparSelecaoLocalidade();
});

document.querySelectorAll(".year-option").forEach(function (botao) {
  botao.addEventListener("click", function () {
    alternarComparacao(false);
    carregarAno(this.dataset.year);
  });
});

document.getElementById("btnComparar").addEventListener("click", function () {
  selecionarModulo("uso-solo");
  alternarComparacao(!estado.comparando);
});

document.querySelectorAll(".module-card").forEach(function (botao) {
  botao.addEventListener("click", function () {
    selecionarModulo(this.dataset.module);
  });
});

document.getElementById("homeCarouselTrack").addEventListener("click", function (evento) {
  const botao = evento.target.closest(".carousel-open");
  if (!botao) return;
  selecionarModulo(botao.dataset.module);
});

document.getElementById("detailCard").addEventListener("click", function (evento) {
  const botao = evento.target.closest(".showcase-open");
  if (!botao) return;
  evento.stopPropagation();
  selecionarModulo(botao.dataset.module);
});

document.getElementById("carouselPrev").addEventListener("click", function () {
  slideAtual -= 1;
  if (estado.modulo === "inicio") {
    atualizarApresentacaoInicio();
    iniciarApresentacaoInicio();
  } else {
    atualizarCarrossel();
  }
});

document.getElementById("carouselNext").addEventListener("click", function () {
  slideAtual += 1;
  if (estado.modulo === "inicio") {
    atualizarApresentacaoInicio();
    iniciarApresentacaoInicio();
  } else {
    atualizarCarrossel();
  }
});

document.getElementById("selecionarTodas").addEventListener("click", function () {
  Object.keys(classesUsoDoSolo).forEach(function (dn) { estado.filtros.add(Number(dn)); });
  criarFiltros();
  aplicarFiltros();
});

document.getElementById("limparSelecao").addEventListener("click", function () {
  estado.filtros.clear();
  criarFiltros();
  aplicarFiltros();
});

document.getElementById("opacidade").addEventListener("input", function () {
  estado.opacidade = Number(this.value) / 100;
  Promise.all(Object.keys(estado.dados).map(atualizarImagemRaster)).then(agendarDesenho);
});

document.getElementById("btnEnquadrar").addEventListener("click", enquadrarMunicipio);
document.getElementById("zoomMais").addEventListener("click", function () { alterarZoom(1.2); });
document.getElementById("zoomMenos").addEventListener("click", function () { alterarZoom(0.84); });
document.getElementById("btnBasemap").addEventListener("click", function () {
  estado.basemapAtivo = !estado.basemapAtivo;
  estado.basemapAssinatura = "";
  this.classList.toggle("active", estado.basemapAtivo);
  this.setAttribute("aria-pressed", String(estado.basemapAtivo));
  agendarDesenho();
});

document.getElementById("btnTema").addEventListener("click", function () {
  const escuro = document.body.classList.toggle("dark-mode");
  this.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
  agendarDesenho();
});

document.getElementById("btnPainel").addEventListener("click", function () {
  const aberto = document.getElementById("sidebar").classList.toggle("open");
  this.textContent = aberto ? "Fechar" : "Painel";
});

new ResizeObserver(redimensionarCanvas).observe(document.getElementById("mapa"));
renderizarCarrosselInicial();
renderizarInicio();
window.setTimeout(function () { mostrarCarregamento(false); }, 2500);
