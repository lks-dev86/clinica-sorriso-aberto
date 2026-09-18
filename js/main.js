(function () {
  "use strict";

  var CLINIC = window.CLINIC;
  var prefersReducedMotion = false;
  var motionMedia = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;
  if (motionMedia) {
    prefersReducedMotion = motionMedia.matches;
    var onMotionChange = function (e) {
      prefersReducedMotion = e.matches;
    };
    if (motionMedia.addEventListener) motionMedia.addEventListener("change", onMotionChange);
    else if (motionMedia.addListener) motionMedia.addListener(onMotionChange);
  }

  var ICONS = {
    tooth:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c-2.4 0-3.6 1.4-4.8 1.4C5.8 4.4 4 5.8 4 8.6c0 2 .7 3 1.1 5 .4 2 .5 5 1.9 5 1.3 0 1.3-3.3 2.3-3.3s1 3.3 2.3 3.3c1.1 0 1.3-2.7 1.6-4.4.3 1.7.5 4.4 1.6 4.4 1.4 0 1.5-3 1.9-5 .4-2 1.1-3 1.1-5 0-2.8-1.8-4.2-3.2-4.2C15.6 4.4 14.4 3 12 3Z"/></svg>',
    shield:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6l-7-2.5Z"/><path d="M9 12.2l2 2 4-4.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    braces:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9c1.8 4 3 6 8 6s6.2-2 8-6" stroke-linecap="round"/><circle cx="6" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="10" cy="14" r="1.1" fill="currentColor" stroke="none"/><circle cx="14" cy="14" r="1.1" fill="currentColor" stroke="none"/><circle cx="18" cy="9" r="1.1" fill="currentColor" stroke="none"/></svg>',
    sparkle:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v4M12 17v4M4 12h4M16 12h4" stroke-linecap="round"/><path d="M12 8.5 13.6 10.4 12 12.3 10.4 10.4 12 8.5Z"/></svg>',
    implant:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 4h8l-1.4 5.6a2 2 0 0 1-1.94 1.5h-1.32a2 2 0 0 1-1.94-1.5L8 4Z"/><path d="M12 11.5V21" stroke-linecap="round"/><path d="M9 21h6" stroke-linecap="round"/></svg>',
    child:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="7" r="3"/><path d="M6 21c0-3.5 2.7-6 6-6s6 2.5 6 6" stroke-linecap="round"/></svg>'
  };

  var WEEKDAY_LABEL = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function whatsappUrl(message) {
    return (
      "https://wa.me/" +
      CLINIC.whatsapp.number +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  function openWhatsApp(message) {
    window.open(whatsappUrl(message), "_blank", "noopener");
  }

  // ---------- Mola (spring) ----------
  // Anima "value" até "to" como um oscilador amortecido. Sempre parte do
  // valor e da velocidade atuais (nunca reinicia do alvo), por isso pode ser
  // redirecionada a qualquer instante — via retarget() — sem saltos visuais.
  // damping 1 = sem quique (padrão); < 1 = quique, reservado para gestos
  // que já carregam momento (arrastar e soltar).
  function createSpring(opts) {
    var value = opts.from;
    var velocity = opts.velocity || 0;
    var to = opts.to;
    var damping = opts.damping != null ? opts.damping : 1;
    var response = opts.response || 0.35;
    var precision = opts.precision || 0.01;
    var onUpdate = opts.onUpdate;
    var onComplete = opts.onComplete;
    var omega = (2 * Math.PI) / response;
    var k = omega * omega;
    var c = 2 * damping * omega;
    var lastTime = null;
    var stopped = false;

    function frame(time) {
      if (stopped) return;
      if (lastTime === null) lastTime = time;
      var dt = Math.min((time - lastTime) / 1000, 1 / 30);
      lastTime = time;

      var accel = -k * (value - to) - c * velocity;
      velocity += accel * dt;
      value += velocity * dt;

      if (Math.abs(value - to) < precision && Math.abs(velocity) < precision) {
        value = to;
        velocity = 0;
        onUpdate(value, velocity);
        if (onComplete) onComplete();
        return;
      }
      onUpdate(value, velocity);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    return {
      retarget: function (newTo, newVelocity) {
        to = newTo;
        if (newVelocity !== undefined) velocity = newVelocity;
      },
      cancel: function () {
        stopped = true;
      }
    };
  }

  // ---------- Aplica marca (cores + textos simples) ----------
  function applyBrand() {
    document.title = CLINIC.name + " — Agende sua consulta";
    document.querySelectorAll("[data-brand-name]").forEach(function (node) {
      node.textContent = CLINIC.name;
    });
    document.querySelectorAll("[data-brand-short]").forEach(function (node) {
      node.textContent = CLINIC.shortName;
    });
    document.querySelectorAll("[data-brand-tagline]").forEach(function (node) {
      node.textContent = CLINIC.tagline;
    });

    var logo = CLINIC.images && CLINIC.images.logo;
    if (logo) {
      ["brandLogo", "footerBrandLogo"].forEach(function (id) {
        var img = document.getElementById(id);
        if (img) {
          img.src = logo;
          img.alt = CLINIC.shortName + " — ícone";
        }
      });
    }
  }

  // ---------- Hero ----------
  function renderHero() {
    var heroImg = document.getElementById("heroImage");
    if (!heroImg) return;
    heroImg.alt = "Ambiente da " + CLINIC.name;
    var reveal = function () {
      heroImg.classList.add("is-loaded");
    };
    if (heroImg.complete && heroImg.naturalWidth) {
      reveal();
    } else {
      heroImg.addEventListener("load", reveal, { once: true });
    }
    heroImg.src = CLINIC.images.hero;
  }

  // ---------- Tratamentos ----------
  function renderTreatments() {
    var grid = document.getElementById("treatmentsGrid");
    if (!grid) return;
    CLINIC.treatments.forEach(function (t, i) {
      var card = el(
        "article",
        "treatment-card reveal",
        '<div class="treatment-icon">' +
          (ICONS[t.icon] || ICONS.tooth) +
          "</div>" +
          "<h3>" +
          t.name +
          "</h3><p>" +
          t.description +
          "</p>"
      );
      card.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
      grid.appendChild(card);
    });
  }

  // ---------- Primeira consulta ----------
  function renderSteps() {
    var wrap = document.getElementById("stepsList");
    if (!wrap) return;
    CLINIC.firstVisitSteps.forEach(function (s, i) {
      var step = el(
        "div",
        "step reveal",
        '<div class="step-number">' +
          String(i + 1).padStart(2, "0") +
          "</div><h3>" +
          s.title +
          "</h3><p>" +
          s.description +
          "</p>"
      );
      step.style.transitionDelay = i * 80 + "ms";
      wrap.appendChild(step);
    });
  }

  // ---------- Galeria ----------
  function renderGallery() {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;
    CLINIC.gallery.forEach(function (src, i) {
      var item = el(
        "button",
        "gallery-item reveal",
        '<img src="' +
          src +
          '" alt="Ambiente da ' +
          CLINIC.name +
          '" loading="lazy">'
      );
      item.type = "button";
      item.style.transitionDelay = Math.min(i, 5) * 60 + "ms";
      item.addEventListener("click", function () {
        openLightbox(src, item);
      });
      grid.appendChild(item);
    });
  }

  function openLightbox(src, triggerEl) {
    // Captura a posição da miniatura antes de qualquer mudança de layout
    // (o overlay em position:fixed não afeta a grade, mas o scrollbar que
    // some ao travar o body pode) — a imagem precisa "nascer" exatamente daqui.
    var originRect = triggerEl ? triggerEl.getBoundingClientRect() : null;

    var box = el(
      "div",
      "lightbox",
      '<button class="lightbox-close" type="button" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button><img src="' +
        src +
        '" alt="Foto ampliada da ' +
        CLINIC.name +
        '">'
    );
    document.body.appendChild(box);
    document.body.style.overflow = "hidden";

    var img = box.querySelector("img");
    img.draggable = false;

    if (originRect) {
      var originX = originRect.left + originRect.width / 2;
      var originY = originRect.top + originRect.height / 2;
      img.style.transformOrigin =
        ((originX / window.innerWidth) * 100).toFixed(1) +
        "% " +
        ((originY / window.innerHeight) * 100).toFixed(1) +
        "%";
    }

    var closed = false;
    var dragY = 0;
    var openProgress = 0;
    var openSpring = null;
    var dragSpring = null;

    function render() {
      var scale = 0.3 + 0.7 * openProgress;
      var dragShrink = 1 - Math.min(Math.abs(dragY) / 900, 0.18);
      img.style.opacity = String(openProgress);
      img.style.transform =
        "translateY(" + dragY.toFixed(1) + "px) scale(" + (scale * dragShrink).toFixed(3) + ")";
      var dragFade = Math.min(Math.abs(dragY) / 500, 1);
      box.style.opacity = String(openProgress * (1 - dragFade));
    }

    function finishClose() {
      document.body.style.overflow = "";
      box.remove();
    }

    function setOpenProgress(target, velocity, onDone) {
      if (openSpring) openSpring.cancel();
      openSpring = createSpring({
        from: openProgress,
        to: target,
        velocity: velocity || 0,
        damping: 1,
        response: 0.4,
        onUpdate: function (v) {
          openProgress = v;
          render();
        },
        onComplete: onDone
      });
    }

    function close() {
      if (closed) return;
      closed = true;
      if (dragSpring) dragSpring.cancel();
      if (prefersReducedMotion) {
        openProgress = 0;
        render();
        setTimeout(finishClose, 160);
        return;
      }
      setOpenProgress(0, 0, finishClose);
    }

    // Arrastar solta a foto na direção e velocidade do gesto — quanto mais
    // rápido o "flick", mais longe ela projeta antes de sumir (item 6).
    function dismissByDrag(velocity) {
      closed = true;
      if (openSpring) openSpring.cancel();
      var target = (dragY >= 0 ? 1 : -1) * (window.innerHeight * 0.9 + 200);
      // Rede de segurança: a mola converge para o alvo de forma assintótica,
      // então não esperamos precisão de subpixel para remover o elemento —
      // do contrário a foto ficaria "presa" fora da tela por quase 1s extra.
      var safety = setTimeout(finishClose, 500);
      dragSpring = createSpring({
        from: dragY,
        to: target,
        velocity: velocity,
        damping: 1,
        response: 0.4,
        precision: 1,
        onUpdate: function (v) {
          dragY = v;
          render();
        },
        onComplete: function () {
          clearTimeout(safety);
          finishClose();
        }
      });
    }

    function springBack(velocity) {
      dragSpring = createSpring({
        from: dragY,
        to: 0,
        velocity: velocity,
        damping: 0.8,
        response: 0.3,
        precision: 0.5,
        onUpdate: function (v) {
          dragY = v;
          render();
        }
      });
    }

    if (!prefersReducedMotion) {
      var pointerId = null;
      var startY = 0;
      var startDragY = 0;
      var history = [];

      img.style.cursor = "grab";

      img.addEventListener("pointerdown", function (e) {
        if (closed) return;
        pointerId = e.pointerId;
        img.setPointerCapture(pointerId);
        if (dragSpring) dragSpring.cancel();
        startY = e.clientY;
        startDragY = dragY;
        history = [{ y: e.clientY, t: e.timeStamp }];
        img.style.cursor = "grabbing";
      });

      img.addEventListener("pointermove", function (e) {
        if (pointerId !== e.pointerId) return;
        dragY = startDragY + (e.clientY - startY);
        render();
        history.push({ y: e.clientY, t: e.timeStamp });
        if (history.length > 5) history.shift();
      });

      var endDrag = function (e) {
        if (pointerId !== e.pointerId || closed) return;
        pointerId = null;
        img.style.cursor = "grab";
        var velocity = 0;
        if (history.length >= 2) {
          var first = history[0];
          var last = history[history.length - 1];
          var dt = (last.t - first.t) / 1000;
          if (dt > 0) velocity = (last.y - first.y) / dt;
        }
        if (Math.abs(dragY) > 120 || Math.abs(velocity) > 600) {
          dismissByDrag(velocity);
        } else {
          springBack(velocity);
        }
      };
      img.addEventListener("pointerup", endDrag);
      img.addEventListener("pointercancel", endDrag);
    }

    render();
    requestAnimationFrame(function () {
      if (prefersReducedMotion) {
        openProgress = 1;
        render();
      } else {
        setOpenProgress(1, 0);
      }
    });

    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.closest(".lightbox-close")) close();
    });
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", onKey);
      }
    });
  }

  // ---------- Equipe ----------
  function renderTeam() {
    var grid = document.getElementById("teamGrid");
    if (!grid) return;
    CLINIC.team.forEach(function (member, i) {
      var card = el(
        "article",
        "team-card reveal",
        '<div class="team-photo"><img src="' +
          member.photo +
          '" alt="Foto de ' +
          member.name +
          '" loading="lazy"></div>' +
          '<div class="team-info"><h3>' +
          member.name +
          '</h3><p class="team-role">' +
          member.role +
          '</p><p class="team-cro">' +
          member.cro +
          "</p></div>"
      );
      card.style.transitionDelay = i * 90 + "ms";
      grid.appendChild(card);
    });
  }

  // ---------- Convênios ----------
  function renderInsurances() {
    var grid = document.getElementById("insurancesGrid");
    if (!grid) return;
    CLINIC.insurances.forEach(function (name) {
      grid.appendChild(el("span", "insurance-badge", name));
    });
  }

  // ---------- Localização ----------
  function renderLocation() {
    var addr = CLINIC.address;
    var addressLine = document.getElementById("addressLine");
    if (addressLine) {
      addressLine.innerHTML =
        addr.street +
        (addr.complement ? " — " + addr.complement : "") +
        "<br>" +
        addr.neighborhood +
        " · " +
        addr.city +
        "/" +
        addr.state +
        " · CEP " +
        addr.zip;
    }

    var hoursList = document.getElementById("hoursList");
    if (hoursList) {
      CLINIC.hoursList.forEach(function (h) {
        hoursList.appendChild(
          el("li", null, "<span>" + h.days + "</span><span>" + h.time + "</span>")
        );
      });
    }

    var mapFrame = document.getElementById("mapFrame");
    if (mapFrame) {
      mapFrame.src =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(addr.mapsQuery) +
        "&output=embed";
    }

    var directionsBtn = document.getElementById("directionsBtn");
    if (directionsBtn) {
      directionsBtn.href =
        "https://www.google.com/maps/dir/?api=1&destination=" +
        encodeURIComponent(addr.mapsQuery);
    }
  }

  // ---------- FAQ ----------
  function renderFaq() {
    var list = document.getElementById("faqList");
    if (!list) return;
    CLINIC.faq.forEach(function (item) {
      var wrap = el("div", "faq-item reveal");
      var btn = el(
        "button",
        "faq-question",
        "<span>" + item.question + '</span><span class="plus"></span>'
      );
      btn.type = "button";
      var answer = el(
        "div",
        "faq-answer",
        "<div><p>" + item.answer + "</p></div>"
      );
      wrap.appendChild(btn);
      wrap.appendChild(answer);
      btn.addEventListener("click", function () {
        var isOpen = wrap.classList.contains("is-open");
        list.querySelectorAll(".faq-item.is-open").forEach(function (open) {
          open.classList.remove("is-open");
        });
        if (!isOpen) wrap.classList.add("is-open");
      });
      list.appendChild(wrap);
    });
  }

  // ---------- Rodapé ----------
  function renderFooter() {
    var addr = CLINIC.address;
    var footerAddress = document.getElementById("footerAddress");
    if (footerAddress) {
      footerAddress.innerHTML =
        addr.street +
        (addr.complement ? " — " + addr.complement : "") +
        "<br>" +
        addr.neighborhood +
        ", " +
        addr.city +
        "/" +
        addr.state +
        "<br>CEP " +
        addr.zip;
    }

    var footerPhone = document.getElementById("footerPhone");
    if (footerPhone) {
      footerPhone.href = whatsappUrl(CLINIC.whatsapp.defaultMessage);
      footerPhone.textContent = formatPhone(CLINIC.whatsapp.number);
    }

    var footerResponsibleName = document.getElementById("footerResponsibleName");
    var footerResponsibleCro = document.getElementById("footerResponsibleCro");
    if (footerResponsibleName) footerResponsibleName.textContent = CLINIC.responsible.name;
    if (footerResponsibleCro) footerResponsibleCro.textContent = CLINIC.responsible.cro;

    var footerLegal = document.getElementById("footerLegal");
    if (footerLegal) footerLegal.textContent = CLINIC.legalNote;

    var footerYear = document.getElementById("footerYear");
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    var instaLink = document.getElementById("footerInstagram");
    if (instaLink) {
      if (CLINIC.social && CLINIC.social.instagram) {
        instaLink.href = CLINIC.social.instagram;
      } else {
        instaLink.hidden = true;
      }
    }
  }

  function formatPhone(digits) {
    // 55DDNNNNNNNNN -> (DD) NNNNN-NNNN
    var ddd = digits.slice(2, 4);
    var rest = digits.slice(4);
    if (rest.length === 9) {
      return "(" + ddd + ") " + rest.slice(0, 5) + "-" + rest.slice(5);
    }
    return "(" + ddd + ") " + rest;
  }

  // ---------- Widget de agendamento ----------
  function buildScheduleOptions() {
    var daySelect = document.getElementById("scheduleDay");
    var periodSelect = document.getElementById("schedulePeriod");
    var reasonSelect = document.getElementById("scheduleReason");
    if (!daySelect || !periodSelect || !reasonSelect) return;

    var days = [];
    var cursor = new Date();
    var guard = 0;
    while (days.length < 8 && guard < 60) {
      guard++;
      cursor.setDate(cursor.getDate() + (days.length === 0 && guard === 1 ? 1 : 1));
      if (CLINIC.workingDays.indexOf(cursor.getDay()) !== -1) {
        days.push(new Date(cursor));
      }
    }
    days.forEach(function (date) {
      var opt = document.createElement("option");
      opt.value = formatDateValue(date);
      opt.textContent =
        WEEKDAY_LABEL[date.getDay()] +
        ", " +
        String(date.getDate()).padStart(2, "0") +
        "/" +
        String(date.getMonth() + 1).padStart(2, "0");
      daySelect.appendChild(opt);
    });

    Object.keys(CLINIC.periods).forEach(function (key) {
      var p = CLINIC.periods[key];
      var opt = document.createElement("option");
      opt.value = p.label;
      opt.textContent = p.label + " (" + p.range + ")";
      periodSelect.appendChild(opt);
    });

    CLINIC.treatments.forEach(function (t) {
      var opt = document.createElement("option");
      opt.value = t.name;
      opt.textContent = t.name;
      reasonSelect.appendChild(opt);
    });
    var otherOpt = document.createElement("option");
    otherOpt.value = "Avaliação / outro motivo";
    otherOpt.textContent = "Avaliação / outro motivo";
    reasonSelect.appendChild(otherOpt);
  }

  function formatDateValue(date) {
    return (
      WEEKDAY_LABEL[date.getDay()] +
      " " +
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0")
    );
  }

  function setupScheduleForm() {
    var form = document.getElementById("scheduleForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var day = document.getElementById("scheduleDay").value;
      var period = document.getElementById("schedulePeriod").value;
      var reason = document.getElementById("scheduleReason").value;
      var message =
        "Olá! Gostaria de agendar uma consulta na " +
        CLINIC.name +
        ".\nDia: " +
        day +
        "\nPeríodo: " +
        period +
        "\nMotivo: " +
        reason;
      openWhatsApp(message);
    });
  }

  // ---------- Header / nav mobile ----------
  function setupHeader() {
    var header = document.getElementById("siteHeader");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var openBtn = document.getElementById("navToggle");
    var mobileNav = document.getElementById("mobileNav");
    var closeBtn = document.getElementById("mobileNavClose");
    if (openBtn && mobileNav) {
      openBtn.addEventListener("click", function () {
        mobileNav.classList.add("is-open");
      });
    }
    if (closeBtn && mobileNav) {
      closeBtn.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
      });
    }
    if (mobileNav) {
      mobileNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileNav.classList.remove("is-open");
        });
      });
    }
  }

  // ---------- Rolagem suave dos links do menu ----------
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function animatedScrollTo(targetY, duration) {
    var startY = window.pageYOffset;
    var distance = targetY - startY;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function setupSmoothNav() {
    var header = document.getElementById("siteHeader");
    var links = document.querySelectorAll(
      '.nav a[href^="#"], #mobileNav a[href^="#"]'
    );
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.getElementById(link.getAttribute("href").slice(1));
        if (!target) return;
        e.preventDefault();
        var headerH = header ? header.offsetHeight : 0;
        var targetY =
          target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
        animatedScrollTo(targetY, 900);
      });
    });
  }

  // ---------- Botão flutuante do WhatsApp ----------
  function setupFloatButton() {
    var btn = document.querySelector(".wpp-float");
    if (!btn) return;
    // Entrada única e discreta, depois que o resto da página já assentou —
    // nunca fica "pulsando", para manter o tom formal da clínica.
    window.setTimeout(
      function () {
        btn.classList.add("is-visible");
      },
      prefersReducedMotion ? 0 : 700
    );
  }

  // ---------- Botões de WhatsApp ----------
  function setupWhatsappButtons() {
    document.querySelectorAll("[data-wpp-default]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openWhatsApp(CLINIC.whatsapp.defaultMessage);
      });
    });
  }

  // ---------- Scroll reveal ----------
  function setupScrollReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (t) {
        t.classList.add("reveal-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach(function (t) {
      observer.observe(t);
    });
  }

  function init() {
    applyBrand();
    renderHero();
    renderTreatments();
    renderSteps();
    renderGallery();
    renderTeam();
    renderInsurances();
    renderLocation();
    renderFaq();
    renderFooter();
    buildScheduleOptions();
    setupScheduleForm();
    setupHeader();
    setupSmoothNav();
    setupWhatsappButtons();
    setupScrollReveal();
    setupFloatButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
