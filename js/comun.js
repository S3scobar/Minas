/**
 * ============================================================================
 * PLATAFORMA DIGITAL OFICIAL · INGENIERÍA DE MINAS Y METALURGIA
 * UNIVERSIDAD NACIONAL DE COLOMBIA · FACULTAD DE MINAS (SEDE MEDELLÍN)
 * ============================================================================
 *
 * Arquitectura, diseño de interfaz y desarrollo de software realizado por:
 * SANTIAGO ESCOBAR ARIAS
 * Representante Estudiantil de Ingeniería de Sistemas
 * Contacto institucional: saescobara@unal.edu.co
 * Perfil oficial: https://www.instagram.com/s_escobar__/
 *
 * © 2026 Santiago Escobar Arias. Todos los derechos reservados.
 *
 * Protección Legal:
 * Obra protegida por la Ley 23 de 1982 de la República de Colombia, la Decisión
 * 351 de la Comisión del Acuerdo de Cartagena y el Convenio de Berna. Queda
 * prohibida la reproducción no autorizada, clonación, plagio o remoción de
 * firmas digitales, marcas de autoría y componentes técnicos sin autorización.
 * ============================================================================
 */

/* ---------- Firma Digital de Autoría en Consola (DevTools) ---------- */
function imprimirFirmaDigital() {
  if (window.__FIRMA_DIGITAL_IMPRESA__) return;
  window.__FIRMA_DIGITAL_IMPRESA__ = true;

  const estiloTitulo = [
    'background: #000000',
    'color: #FFC107',
    'font-family: monospace',
    'font-size: 13px',
    'font-weight: bold',
    'padding: 10px 16px',
    'border: 2px solid #FFC107',
    'border-radius: 8px',
    'text-shadow: 0 0 10px rgba(255, 193, 7, 0.4)'
  ].join(';');

  const estiloAutor = [
    'background: #161616',
    'color: #ffffff',
    'font-family: sans-serif',
    'font-size: 12px',
    'padding: 8px 14px',
    'border-left: 4px solid #FFC107',
    'margin-top: 4px'
  ].join(';');

  const estiloLegal = [
    'color: #718096',
    'font-family: sans-serif',
    'font-size: 11px',
    'font-style: italic',
    'padding: 4px 14px'
  ].join(';');

  const estiloBadge = [
    'background: #006633',
    'color: #ffffff',
    'font-family: monospace',
    'font-size: 11px',
    'font-weight: bold',
    'padding: 3px 8px',
    'border-radius: 4px'
  ].join(';');

  const ascii = `
  ███████╗ █████╗ ███╗   ██╗████████╗██╗ █████╗  ██████╗  ██████╗ 
  ██╔════╝██╔══██╗████╗  ██║╚══██╔══╝██║██╔══██╗██╔════╝ ██╔═══██╗
  ███████╗███████║██╔██╗ ██║   ██║   ██║███████║██║  ███╗██║   ██║
  ╚════██║██╔══██║██║╚██╗██║   ██║   ██║██╔══██║██║   ██║██║   ██║
  ███████║██║  ██║██║ ╚████║   ██║   ██║██║  ██║╚██████╔╝╚██████╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ `;

  console.log(`%c${ascii}\n  ARQUITECTURA & DESARROLLO DE SOFTWARE · SANTIAGO ESCOBAR ARIAS`, estiloTitulo);

  console.log(
    `%cFIRMA DIGITAL DE AUTORÍA Y PROPIEDAD INTELECTUAL\n` +
    `------------------------------------------------------------------\n` +
    `Creador & Arquitecto de Software: Santiago Escobar Arias\n` +
    `Cargo: Representante Estudiantil de Ingeniería de Sistemas\n` +
    `Institución: Facultad de Minas · Universidad Nacional de Colombia (Sede Medellín)\n` +
    `Correo Oficial: saescobara@unal.edu.co\n` +
    `Instagram: @s_escobar__ (https://www.instagram.com/s_escobar__/)\n` +
    `Año de Registro: 2026 · Versión: 2.0 Oficial\n` +
    `Hash de Verificación: e8b94f6c91a72d3e05bc418a994ef08d31a57e937d2f4ca87b649512c019d08e\n` +
    `------------------------------------------------------------------`,
    estiloAutor
  );

  console.log(
    `%cAVISO LEGAL: Esta obra, su interfaz visual, simuladores dinámicos del subsuelo, gemelo digital y algoritmos interactivos están protegidos por la Ley 23 de 1982 sobre Derechos de Autor (Colombia) y la Decisión 351 de la Comunidad Andina. Queda prohibida la reproducción, plagio o remoción de créditos de autoría sin consentimiento expreso por escrito de Santiago Escobar Arias.`,
    estiloLegal
  );

  console.log(`%c[AUTENTICACIÓN VERIFICADA: OBRA ORIGINAL REGISTRADA]`, estiloBadge);

  try {
    Object.defineProperty(window, '__AUTOR_PLATAFORMA__', {
      value: Object.freeze({
        autor: 'Santiago Escobar Arias',
        rol: 'Representante Estudiantil de Ingeniería de Sistemas',
        institucion: 'Universidad Nacional de Colombia · Facultad de Minas (Sede Medellín)',
        contacto: 'saescobara@unal.edu.co',
        instagram: 'https://www.instagram.com/s_escobar__/',
        licencia: 'Propiedad Intelectual Protegida · Ley 23 de 1982 · Todos los derechos reservados',
        anio: 2026,
        verificado: true
      }),
      writable: false,
      configurable: false
    });
  } catch (_) {}
}

imprimirFirmaDigital();

/* =============================================
   FUNCIONES COMUNES A TODOS LOS MÓDULOS
   - Carga de datos (cada módulo pide solo los JSON que necesita)
   - Barra superior y pie, iguales en todas las páginas
   ============================================= */

const $ = (selector, raiz = document) => raiz.querySelector(selector);
const $$ = (selector, raiz = document) => [...raiz.querySelectorAll(selector)];

// Escapa texto antes de meterlo en HTML
const esc = (texto) => String(texto ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);


/* ---------- Carga de datos ---------- */

const memoriaDatos = new Map();

function cargarDatos(ruta) {
  if (!memoriaDatos.has(ruta)) {
    const peticion = fetch(`data/${ruta}.json`).then((respuesta) => {
      if (!respuesta.ok) throw new Error(`No se pudo cargar data/${ruta}.json (${respuesta.status})`);
      return respuesta.json();
    });
    memoriaDatos.set(ruta, peticion);
  }
  return memoriaDatos.get(ruta);
}

function mostrarErrorDeCarga(contenedor, error) {
  console.error(error);
  contenedor.innerHTML = `
    <div class="aviso">
      <p><strong>No se pudo cargar la información.</strong></p>
      <p>Si abriste el archivo con doble clic, sírvelo con un servidor local:
        <code>python -m http.server</code> y entra a <code>http://localhost:8000</code>.</p>
    </div>`;
}


/* ---------- Escudo oficial / Logo genérico ---------- */

function dibujarEscudo() {
  return `<img src="img/logo-minas.png" alt="Logo de Ingeniería de Minas y Metalurgia · Facultad de Minas" class="barra__escudo-img">`;
}


/* ---------- Barra superior y pie ---------- */

const PAGINAS = [
  { id: 'inicio', texto: 'Inicio', tag: 'MN-01', url: 'index.html' },
  { id: 'malla', texto: 'Malla', tag: 'MN-02', url: 'malla.html' },
  { id: 'intercampus', texto: 'Intercampus', tag: 'MN-03', url: 'intercampus.html' },
  { id: 'convenios', texto: 'Convenios', tag: 'MN-04', url: 'convenios.html' },
  { id: 'info', texto: 'Info General', tag: 'MN-05', url: 'info.html' },
];

function pintarBarra() {
  const actual = document.body.dataset.pagina;
  $('#barra').outerHTML = `
    <header class="barra barra--minera" id="encabezado-barra">
      <div class="contenedor barra__contenido">
        <!-- MARCA OFICIAL: EMBLEMA MINERO-METALÚRGICO CON HALO DORADO -->
        <a class="barra__marca" href="index.html" aria-label="Ingeniería de Minas y Metalurgia, inicio">
          <div class="barra__escudo">
            <img src="img/logo-minas.png" alt="Escudo oficial de Ingeniería de Minas y Metalurgia" class="barra__escudo-img">
            <span class="barra__escudo-halo" aria-hidden="true"></span>
          </div>
          <div class="barra__texto">
            <span class="barra__carrera-nombre">Ingeniería de Minas y Metalurgia</span>
            <span class="barra__carrera-facultad">UNAL · Facultad de Minas · Sede Medellín · Desde 1887</span>
          </div>
        </a>

        <!-- BOTÓN MENÚ MÓVIL INDUSTRIAL -->
        <button class="barra__boton-menu" id="btn-menu" type="button" aria-expanded="false" aria-controls="menu-navegacion" aria-label="Abrir menú de navegación">
          <span class="barra__icono barra__icono--abrir" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </span>
          <span class="barra__icono barra__icono--cerrar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
          <span class="barra__boton-texto">Menú</span>
        </button>

        <!-- MENÚ DE NAVEGACIÓN: RIEL MINERO Y CRISOL DE METAL FUNDIDO -->
        <nav class="nav-minero" id="menu-navegacion" aria-label="Módulos del portal">
          <!-- Riel de vagoneta y guía de colada continua -->
          <div class="nav-minero__riel" id="nav-riel" aria-hidden="true">
            <span class="nav-minero__linea-riel linea--sup"></span>
            <span class="nav-minero__linea-riel linea--inf"></span>
            <div class="nav-minero__crisol-slider" id="nav-crisol-slider">
              <span class="crisol-slider__metal-fundido"></span>
              <span class="crisol-slider__gota"></span>
              <span class="crisol-slider__fogonazo"></span>
            </div>
          </div>

          <!-- Estaciones de navegación minero-metalúrgicas -->
          <div class="nav-minero__estaciones" id="nav-estaciones">
            ${PAGINAS.map((p, idx) => {
              const esActiva = p.id === actual;
              return `
                <a href="${p.url}" 
                   class="nav-estacion ${esActiva ? 'is-activa' : ''}" 
                   data-pagina-id="${p.id}"
                   data-indice="${idx}"
                   ${esActiva ? 'aria-current="page"' : ''}>
                  <span class="nav-estacion__cod">${p.tag}</span>
                  <span class="nav-estacion__nombre">${p.texto}</span>
                  <span class="nav-estacion__chispa" aria-hidden="true"></span>
                </a>
              `;
            }).join('')}
          </div>
        </nav>
      </div>
    </header>`;

  configurarMenuMovil();
  iniciarRielMineroNav();
}

function iniciarRielMineroNav() {
  const navBox = $('.nav-minero');
  const slider = $('#nav-crisol-slider');
  const estaciones = $$('.nav-estacion', navBox);
  if (!navBox || !slider || !estaciones.length) return;

  const actualTab = $('.nav-estacion.is-activa', navBox);
  if (!actualTab) return;

  function posicionarCrisol(el, animado = true) {
    if (!el || window.innerWidth <= 980) return;
    const ancho = el.offsetWidth;
    const izquierda = el.offsetLeft;

    if (!animado) {
      slider.style.transition = 'none';
    } else {
      slider.style.transition = 'left 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2), width 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2), transform 0.35s ease';
    }

    slider.style.left = `${izquierda}px`;
    slider.style.width = `${ancho}px`;

    if (!animado) {
      slider.offsetHeight; // Reflujo
      slider.style.transition = '';
    }
  }

  // Generador de chispas de forja sobre el botón pulsado
  function soltarChispas(elemento) {
    const rect = elemento.getBoundingClientRect();
    const chispasWrap = document.createElement('div');
    chispasWrap.className = 'chispas-forja-wrap';
    chispasWrap.style.left = `${rect.left + rect.width / 2}px`;
    chispasWrap.style.top = `${rect.top + rect.height / 2}px`;

    for (let i = 0; i < 9; i++) {
      const chispa = document.createElement('span');
      chispa.className = 'chispa-metal';
      const angulo = (Math.PI * 2 * i) / 9 + (Math.random() - 0.5) * 0.4;
      const dist = 18 + Math.random() * 26;
      chispa.style.setProperty('--tx', `${Math.cos(angulo) * dist}px`);
      chispa.style.setProperty('--ty', `${Math.sin(angulo) * dist}px`);
      chispa.style.setProperty('--dur', `${0.35 + Math.random() * 0.2}s`);
      chispasWrap.appendChild(chispa);
    }

    document.body.appendChild(chispasWrap);
    setTimeout(() => chispasWrap.remove(), 600);
  }

  // Verificar si venimos de otra pestaña para animar el crisol de oro navegando desde ella
  const origenIdx = sessionStorage.getItem('minas_nav_origen_idx');
  sessionStorage.removeItem('minas_nav_origen_idx');

  if (window.innerWidth > 980 && origenIdx !== null && estaciones[origenIdx] && estaciones[origenIdx] !== actualTab) {
    const tabOrigen = estaciones[origenIdx];
    posicionarCrisol(tabOrigen, false);
    slider.classList.add('is-fundiendo');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        posicionarCrisol(actualTab, true);
        soltarChispas(actualTab);
        setTimeout(() => {
          slider.classList.remove('is-fundiendo');
        }, 450);
      });
    });
  } else {
    posicionarCrisol(actualTab, false);
  }

  // Manejador de clics con animación de colada de metal caliente
  estaciones.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        // En pantallas móviles/táctiles navegación directa inmediata
        return;
      }
      if (tab === actualTab) return;

      const urlDestino = tab.getAttribute('href');
      if (!urlDestino || urlDestino.startsWith('#') || urlDestino.startsWith('http')) return;

      e.preventDefault();

      const idxActual = actualTab.dataset.indice || '0';
      sessionStorage.setItem('minas_nav_origen_idx', idxActual);

      // Desplazamiento ardiente y chispas
      slider.classList.add('is-fundiendo');
      posicionarCrisol(tab, true);
      soltarChispas(tab);

      setTimeout(() => {
        window.location.href = urlDestino;
      }, 230);
    });

    // Hover interactivo en escritorio
    tab.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 980) return;
      posicionarCrisol(tab, true);
    });
  });

  navBox.addEventListener('mouseleave', () => {
    if (window.innerWidth <= 980) return;
    posicionarCrisol(actualTab, true);
  });

  window.addEventListener('resize', () => {
    posicionarCrisol(actualTab, false);
  });
}

function configurarMenuMovil() {
  const barra = $('#encabezado-barra');
  const btn = $('#btn-menu');
  const nav = $('#menu-navegacion');
  if (!barra || !btn || !nav) return;

  function toggleMenu(abrir) {
    const estaAbierto = abrir !== undefined ? abrir : !barra.classList.contains('is-menu-abierto');
    barra.classList.toggle('is-menu-abierto', estaAbierto);
    btn.setAttribute('aria-expanded', String(estaAbierto));
    btn.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (barra.classList.contains('is-menu-abierto') && !barra.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && barra.classList.contains('is-menu-abierto')) {
      toggleMenu(false);
      btn.focus();
    }
  });
}

function pintarPie() {
  $('#pie').outerHTML = `
    <footer class="pie">
      <div class="pie__marca-central">
        <div class="pie__escudo">
          <img src="img/logo-minas.png" alt="Logo de Ingeniería de Minas y Metalurgia" class="pie__escudo-img">
        </div>

        <div class="pie__pildoras-carrera">
          <a class="pie__pildora pie__pildora--ig" href="https://www.instagram.com/repreminasymetalurgiaun?rpxt=ZTNsOGxqbDQ5Y3Jv" target="_blank" rel="noopener noreferrer" title="Instagram oficial de la representación estudiantil">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span>@repreminasymetalurgiaun</span>
          </a>
          <a class="pie__pildora pie__pildora--wpp" href="https://chat.whatsapp.com/BpKyya2ef7P2tDTpXu6Ywd?s=sw&p=i&mlu=4&ilr=4&iam=2" target="_blank" rel="noopener noreferrer" title="Grupo oficial de WhatsApp de la carrera">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
            <span>Grupo WhatsApp</span>
          </a>
          <a class="pie__pildora pie__pildora--wpp" href="https://whatsapp.com/channel/0029VbAmtMII7BeInge1o61H" target="_blank" rel="noopener noreferrer" title="Canal oficial de WhatsApp de la carrera">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
            <span>Canal WhatsApp</span>
          </a>
        </div>

        <p class="pie__titulo-carrera"><strong>Ingeniería de Minas y Metalurgia</strong> · Facultad de Minas · Universidad Nacional de Colombia, Sede Medellín</p>
      </div>

      <!-- DOS TARJETAS OFICIALES (REPRESENTACIÓN Y DESARROLLO) -->
      <div class="pie__tarjetas-grid">
        <!-- TARJETA 1: REPRESENTACIÓN ESTUDIANTIL -->
        <div class="pie__tarjeta pie__tarjeta--representacion">
          <span class="pie__tarjeta-sub">REPRESENTACIÓN ESTUDIANTIL · ING. DE MINAS Y METALURGIA</span>
          <p class="pie__tarjeta-nombre"><strong>José Avelino Pérez Romero</strong> · Representante Estudiantil</p>
          <div class="pie__tarjeta-enlaces">
            <a class="pie__enlace-contacto pie__enlace-contacto--wpp" href="https://wa.me/573219818486" target="_blank" rel="noopener noreferrer" title="Contactar por WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>321 981 8486</span>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--correo" href="mailto:josperez@unal.edu.co" title="Enviar correo institucional">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>josperez@unal.edu.co</span>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--ig" href="https://www.instagram.com/jperomero?xtok=MWFoM3Y3bDU0a3JsdQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" title="Instagram de José Avelino Pérez">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@jperomero</span>
            </a>
          </div>
        </div>

        <!-- TARJETA 2: CREACIÓN Y DESARROLLO WEB (AUTORÍA SANTIAGO ESCOBAR) -->
        <div class="pie__tarjeta pie__tarjeta--desarrollo">
          <span class="pie__tarjeta-sub">CREACIÓN Y DESARROLLO WEB</span>
          <p class="pie__tarjeta-nombre">Iniciativa y arquitectura digital por <strong>Santiago Escobar Arias</strong> · Representante de Sistemas</p>
          <div class="pie__tarjeta-enlaces pie__tarjeta-enlaces--iconos">
            <a class="pie__enlace-contacto pie__enlace-contacto--icono pie__enlace-contacto--ig" href="https://www.instagram.com/s_escobar__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Santiago Escobar (@s_escobar__)" title="Instagram (@s_escobar__)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--icono pie__enlace-contacto--correo" href="mailto:saescobara@unal.edu.co" aria-label="Correo de Santiago Escobar (saescobara@unal.edu.co)" title="Correo (saescobara@unal.edu.co)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>`;
}


/* ---------- Mensaje de bienvenida / Creador de la Web ---------- */

function mostrarMensajeAutor() {
  if (sessionStorage.getItem('mensaje_autor_cerrado') === '1') return;

  const toast = document.createElement('aside');
  toast.className = 'toast-autor';
  toast.id = 'toast-autor';
  toast.setAttribute('aria-label', 'Mensaje del creador del portal');
  toast.innerHTML = `
    <div class="toast-autor__tarjeta">
      <button class="toast-autor__cerrar" id="toast-autor-cerrar" type="button" aria-label="Cerrar mensaje">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="toast-autor__cabecera">
        <div class="toast-autor__avatar" aria-hidden="true">
          <img src="img/logo-minas.png" alt="Logo de Ingeniería de Minas y Metalurgia" class="toast-autor__avatar-img">
        </div>
        <div class="toast-autor__titulos">
          <span class="toast-autor__nombre">Santiago Escobar Arias</span>
          <span class="toast-autor__cargo">REPRESENTANTE DE SISTEMAS · CREADOR DE LA WEB</span>
        </div>
      </div>

      <p class="toast-autor__mensaje">
        ¡Hola! Desarrollé este portal con el propósito de apoyar, guiar y facilitar la vida universitaria de todos los estudiantes de <strong>Ingeniería de Minas y Metalurgia</strong>. Cuentan con mi total respaldo desde la representación estudiantil de Sistemas para seguir construyendo herramientas digitales de vanguardia que fortalezcan nuestra vida académica en la histórica Facultad de Minas.
      </p>

      <div class="toast-autor__acciones">
        <div class="toast-autor__iconos" aria-label="Contacto del desarrollador">
          <a class="toast-autor__icono toast-autor__icono--ig" href="https://www.instagram.com/s_escobar__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Santiago Escobar (@s_escobar__)" title="Instagram (@s_escobar__)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a class="toast-autor__icono toast-autor__icono--correo" href="mailto:saescobara@unal.edu.co" aria-label="Correo de Santiago Escobar (saescobara@unal.edu.co)" title="Correo (saescobara@unal.edu.co)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
        <button class="toast-autor__btn-ok" id="toast-autor-ok" type="button">¡ENTENDIDO!</button>
      </div>
    </div>`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('is-visible');
  }, 800);

  function cerrarToast() {
    toast.classList.remove('is-visible');
    toast.classList.add('is-hiding');
    sessionStorage.setItem('mensaje_autor_cerrado', '1');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  $('#toast-autor-cerrar')?.addEventListener('click', cerrarToast);
  $('#toast-autor-ok')?.addEventListener('click', cerrarToast);
}

pintarBarra();
pintarPie();
mostrarMensajeAutor();
