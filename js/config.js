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
  name: "Clínica Sorriso Aberto",
  shortName: "Sorriso Aberto",
  tagline: "Odontologia completa, com cuidado e atenção em cada etapa.",

  // ---------- Cores (aplicadas via CSS custom properties) ----------
  colors: {
    primary: "#0F5C4E",       // verde-petróleo — cor principal da marca
    primaryDark: "#0A3D33",   // usada em hovers/gradientes
    secondary: "#F5EFE6",     // creme — fundos alternados
    accent: "#C9A227",        // dourado suave — detalhes e destaques
    background: "#FBF9F5",    // fundo geral da página
    surface: "#FFFFFF",       // cartões e superfícies
    text: "#1B2521",          // texto principal
    textMuted: "#57665F",     // texto secundário
    whatsapp: "#25D366"       // verde oficial do WhatsApp (botão)
  },

  // ---------- WhatsApp ----------
  whatsapp: {
    // Somente dígitos, com DDI 55 + DDD + número (sem espaços, sem "+")
    number: "5586994364794",
    defaultMessage:
      "Olá! Vim pelo site da Clínica Sorriso Aberto e gostaria de agendar uma consulta."
  },

  // ---------- Responsável técnico (obrigatório no rodapé) ----------
  responsible: {
    name: "Dr. João Mendes",
    cro: "CRO-PI 12345"
  },

  // ---------- Endereço e mapa ----------
  address: {
    street: "Av. Frei Serafim, 2200",
    complement: "Sala 4",
    neighborhood: "Centro",
    city: "Teresina",
    state: "PI",
    zip: "64000-020",
    // Usado apenas para montar o link "Como chegar" e o embed do mapa
    mapsQuery: "Av. Frei Serafim, 2200, Centro, Teresina, PI"
  },

  // ---------- Funcionamento ----------
  // 0=domingo ... 6=sábado — dias em que a clínica atende
  workingDays: [1, 2, 3, 4, 5, 6],
  hoursList: [
    { days: "Segunda a sexta", time: "08:00 – 19:00" },
    { days: "Sábado", time: "08:00 – 13:00" },
    { days: "Domingo", time: "Fechado" }
  ],
  periods: {
    morning: { label: "Manhã", range: "08:00 – 12:00" },
    afternoon: { label: "Tarde", range: "13:00 – 19:00" }
  },

  // ---------- Imagens ----------
  // Todas via Unsplash (link direto). Troque a URL para usar outra foto —
  // mantenha o formato "?auto=format&fit=crop&w=...&q=80" para bom desempenho.
  images: {
    // Ambiente acolhedor, consulta em andamento — usada no hero
    hero: "https://images.unsplash.com/photo-1777331903190-341a3dd0441b?auto=format&fit=crop&w=1600&q=80",
    // Logo/ícone da marca — usado no favicon e ao lado do nome no cabeçalho e no rodapé
    logo: "assets/logo.png"
  },

  // ---------- Tratamentos (sem preço, sem promessa de resultado) ----------
  treatments: [
    {
      icon: "tooth",
      name: "Clínico Geral",
      description: "Avaliação, diagnóstico e cuidados odontológicos do dia a dia."
    },
    {
      icon: "shield",
      name: "Prevenção e Limpeza",
      description: "Profilaxia e orientação para manutenção da saúde bucal."
    },
    {
      icon: "braces",
      name: "Ortodontia",
      description: "Planejamento e acompanhamento do alinhamento dos dentes."
    },
    {
      icon: "sparkle",
      name: "Estética Dental",
      description: "Procedimentos estéticos avaliados caso a caso, com o cirurgião-dentista."
    },
    {
      icon: "implant",
      name: "Implantodontia",
      description: "Avaliação e planejamento de reabilitação com implantes."
    },
    {
      icon: "child",
      name: "Odontopediatria",
      description: "Atendimento odontológico voltado para crianças e adolescentes."
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
      description: "Conversamos sobre seu histórico e suas necessidades."
    },
    {
      title: "Avaliação clínica",
      description: "Exame clínico detalhado para entender sua situação atual."
    },
    {
      title: "Plano de cuidado",
      description: "Explicamos as opções de tratamento indicadas para o seu caso."
    }
  ],

  // ---------- Estrutura da clínica (galeria) ----------
  gallery: [
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1704455306251-b4634215d98f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1643916800611-1302e8d27c38?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1762625570087-6d98fca29531?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1752842936213-143c9456e6ea?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1643660527095-bfb19b49994a?auto=format&fit=crop&w=900&q=80"
  ],

  // ---------- Equipe ----------
  team: [
    {
      name: "Dr. João Mendes",
      role: "Cirurgião-Dentista Responsável",
      cro: "CRO-PI 12345",
      photo: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Dra. Camila Ribeiro",
      role: "Cirurgiã-Dentista",
      cro: "CRO-PI 54321",
      photo: "https://images.unsplash.com/photo-1678695972687-033fa0bdbac9?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Dra. Larissa Souza",
      role: "Cirurgiã-Dentista",
      cro: "CRO-PI 67890",
      photo: "https://images.unsplash.com/photo-1662837775286-7e6258c7c595?auto=format&fit=crop&w=500&q=80"
    }
  ],

  // ---------- Convênios aceitos ----------
  insurances: [
    "Bradesco Dental",
    "Amil Dental",
    "SulAmérica Odonto",
    "OdontoPrev",
    "MetLife Odonto",
    "Particular"
  ],

  // ---------- Dúvidas frequentes ----------
  faq: [
    {
      question: "Preciso levar exames para a primeira consulta?",
      answer: "Se você já tiver radiografias ou exames recentes, é bom trazê-los. Caso não tenha, não é impedimento para o atendimento."
    },
    {
      question: "A clínica atende convênios?",
      answer: "Atendemos alguns convênios odontológicos e também atendimento particular. Confirme seu plano pelo WhatsApp."
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
      question: "Atendem crianças?",
      answer: "Sim, temos atendimento de odontopediatria para crianças e adolescentes."
    },
    {
      question: "Onde a clínica fica localizada?",
      answer: "Estamos na Av. Frei Serafim, 2200, no Centro de Teresina/PI. Veja o mapa e o botão \"Como chegar\" na seção de localização."
    }
  ],

  // ---------- Redes sociais ----------
  social: {
    instagram: "https://instagram.com/sorrisoaberto"
  },

  // ---------- Aviso legal (rodapé) ----------
  legalNote:
    "Conteúdo meramente informativo e não substitui a avaliação presencial de um cirurgião-dentista."
};
