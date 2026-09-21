/**
 * ============================================================
 *  DADOS DA CLÍNICA — ÚNICO ARQUIVO A EDITAR PARA TROCAR CLIENTE
 * ============================================================
 * Troque os valores abaixo para reaproveitar esta landing page
 * em outra clínica. Nada mais precisa ser alterado no HTML/CSS/JS.
 *
 * Lembretes da Resolução CFO 196/2019 ao editar os textos:
 * - Não incluir preços, parcelamento ou promoções.
 * - Não incluir fotos de "antes e depois".
 * - Não prometer resultado ("sem dor", "garantido", "o melhor").
 * - Não incluir depoimentos de pacientes.
 * - Manter nome e CRO do responsável técnico sempre visíveis.
 */
window.CLINIC = {
  // ---------- Identidade ----------
  name: "Clínica Odontológica Dr. Isaac Luís",
  shortName: "Dr. Isaac Luís",
  pageTitle:
    "Clínica Odontológica Dr. Isaac Luís | Implantes Dentários | Teresina - PI",
  tagline:
    "Implantes dentários e odontologia geral no Saci, em Teresina — com explicação clara em cada etapa.",

  // ---------- Cores (aplicadas via CSS custom properties) ----------
  colors: {
    primary: "#216EB4",       // azul do logo — cor principal da marca
    primaryDark: "#0F3A6B",   // azul profundo: gradientes, rodapé, hovers
    secondary: "#EAF1F5",     // azul-gelo — fundos alternados
    accent: "#5F7F0B",        // verde-limão escurecido (do logo) — números e detalhes sobre fundo claro
    accentBright: "#B6D32D",  // verde-limão do logo — detalhes sobre fundo escuro
    background: "#F7FAFB",    // fundo geral da página
    surface: "#FFFFFF",       // cartões e superfícies
    text: "#0F1E2E",          // texto principal
    textMuted: "#4B5D6E",     // texto secundário
    whatsapp: "#157F3D"       // verde do botão de WhatsApp (escurecido p/ contraste com texto branco)
  },

  // ---------- WhatsApp ----------
  whatsapp: {
    // Somente dígitos, com DDI 55 + DDD + número (sem espaços, sem "+")
    number: "5586998245845",
    defaultMessage:
      "Olá! Vim pelo site da Clínica Odontológica Dr. Isaac Luís e gostaria de agendar uma avaliação."
  },

  // ---------- Responsável técnico (obrigatório no rodapé) ----------
  responsible: {
    name: "Dr. Isaac Luís",
    cro: "CRO-PI 3170"
  },

  // ---------- Endereço e mapa ----------
  address: {
    street: "Rua 7, 60",
    complement: "",
    neighborhood: "Saci",
    city: "Teresina",
    state: "PI",
    zip: "64020-455",
    // Usado apenas para montar o link "Como chegar" e o embed do mapa
    mapsQuery:
      "Clínica Odontológica Dr. Isaac Luís, R. 7, 60 - Saci, Teresina - PI, 64020-455"
  },

  // ---------- Funcionamento ----------
  // 0=domingo ... 6=sábado — dias em que a clínica atende
  workingDays: [1, 2, 3, 4, 5, 6],
  hoursList: [
    { days: "Segunda a quinta", time: "08:00 – 18:40" },
    { days: "Sexta", time: "08:00 – 19:00" },
    { days: "Sábado", time: "08:00 – 11:40" },
    { days: "Domingo", time: "Fechado" }
  ],
  // "days" limita em quais dias da semana o período aparece no agendamento
  // (aos sábados só há atendimento pela manhã). "range" é opcional.
  periods: {
    morning: { label: "Manhã", days: [1, 2, 3, 4, 5, 6] },
    afternoon: { label: "Tarde", days: [1, 2, 3, 4, 5] }
  },

  // ---------- Imagens ----------
  // Todas via Unsplash (link direto). Troque a URL para usar outra foto —
  // mantenha o formato "?auto=format&fit=crop&w=...&q=80" para bom desempenho.
  // ATENÇÃO: a foto do hero ainda é de banco de imagens (Unsplash), não da
  // clínica real. O ideal é trocar por uma foto real, horizontal e em alta
  // resolução (mín. 1600 px de largura).
  images: {
    // Ambiente acolhedor, consulta em andamento — usada no hero
    hero: "https://images.unsplash.com/photo-1777331903190-341a3dd0441b?auto=format&fit=crop&w=1600&q=80",
    // Logo/ícone da marca — usado no favicon e ao lado do nome no cabeçalho e no rodapé
    // (PNG circular com transparência, gerado a partir de Logo_Issac2.jpg — o JPG
    // original tem o "xadrez de transparência" gravado nos pixels)
    logo: "assets/logo-isaac.png"
  },

  // ---------- Tratamentos (sem preço, sem promessa de resultado) ----------
  // "featured: true" destaca o card em largura total (use em apenas um).
  treatments: [
    {
      icon: "implant",
      name: "Implantes dentários",
      description:
        "Avaliação e planejamento da reposição de dentes ausentes com implantes, incluindo casos de reabilitação total (protocolo). O cirurgião-dentista explica cada etapa e as opções indicadas para o seu caso.",
      featured: true
    },
    {
      icon: "crown",
      name: "Prótese dentária",
      description: "Reabilitação de dentes ausentes ou comprometidos, definida após avaliação clínica."
    },
    {
      icon: "sparkle",
      name: "Estética dental",
      description: "Clareamento, facetas e outros procedimentos estéticos avaliados caso a caso."
    },
    {
      icon: "braces",
      name: "Ortodontia",
      description: "Planejamento e acompanhamento do alinhamento dos dentes e da mordida."
    },
    {
      icon: "tooth",
      name: "Tratamento de canal",
      description: "Avaliação e tratamento de dentes com comprometimento interno."
    },
    {
      icon: "gum",
      name: "Periodontia",
      description: "Cuidado com a saúde das gengivas e dos tecidos de sustentação dos dentes."
    },
    {
      icon: "shield",
      name: "Clínica geral e prevenção",
      description: "Consulta de avaliação, limpeza e orientação para manutenção da saúde bucal."
    }
  ],

  // ---------- Como é a primeira consulta ----------
  firstVisitSteps: [
    {
      title: "Agendamento",
      description: "Você escolhe o dia e o período pelo WhatsApp, sem burocracia."
    },
    {
      title: "Recepção e anamnese",
      description: "Conversamos sobre seu histórico de saúde e suas necessidades."
    },
    {
      title: "Avaliação clínica",
      description: "Exame clínico detalhado e, quando necessário, solicitação de exames de imagem."
    },
    {
      title: "Plano de cuidado",
      description: "Explicamos as opções de tratamento indicadas para o seu caso e as etapas envolvidas."
    }
  ],

  // ---------- Estrutura da clínica (galeria) ----------
  // Em telas estreitas, se o número de fotos for ímpar, a primeira ocupa a
  // largura toda para a grade fechar sem buracos.
  gallery: [
    "assets/Espaço_1.jpg",
    "assets/Espaço_2.jpg",
    "assets/Espaço_3.jpg"
  ],

  // ---------- Equipe ----------
  // Sem "photo", o cartão mostra as iniciais do nome.
  team: [
    {
      name: "Dr. Isaac Luís",
      role: "Cirurgião-Dentista Responsável",
      cro: "CRO-PI 3170",
      photo: "assets/Foto_doutor.jpg"
    }
  ],

  // ---------- Convênios aceitos ----------
  // Lista vazia = a seção e o link do menu ficam ocultos.
  insurances: [],

  // ---------- Dúvidas frequentes ----------
  faq: [
    {
      question: "Preciso levar exames para a primeira consulta?",
      answer: "Se você já tiver radiografias ou tomografias recentes, é bom trazê-las. Caso não tenha, o cirurgião-dentista avalia na consulta se serão necessários e orienta você."
    },
    {
      question: "Como é a avaliação para colocar implantes?",
      answer: "O cirurgião-dentista avalia sua saúde bucal e geral, solicita os exames necessários e explica se o implante é indicado no seu caso, quais são as etapas e o tempo envolvidos."
    },
    {
      question: "Como funciona o agendamento?",
      answer: "Você escolhe o dia, o período e o motivo da consulta aqui no site e enviamos tudo pronto para o nosso WhatsApp."
    },
    {
      question: "Posso remarcar minha consulta?",
      answer: "Sim, é só nos avisar pelo WhatsApp com antecedência para reorganizarmos o horário."
    },
    {
      question: "A clínica atende convênios?",
      answer: "Para saber sobre planos e formas de atendimento, fale diretamente com a nossa equipe pelo WhatsApp."
    },
    {
      question: "Onde a clínica fica localizada?",
      answer: "Estamos na Rua 7, 60, no bairro Saci, em Teresina/PI. Veja o mapa e o botão \"Como chegar\" na seção de localização."
    }
  ],

  // ---------- Redes sociais ----------
  social: {
    instagram: "https://www.instagram.com/odonto.isaacluis/"
  },

  // ---------- Aviso legal (rodapé) ----------
  legalNote:
    "Conteúdo meramente informativo e não substitui a avaliação presencial de um cirurgião-dentista."
};
