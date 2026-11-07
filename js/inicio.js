/**
 * PLATAFORMA DIGITAL · INGENIERÍA DE MINAS Y METALURGIA (UNAL MEDELLÍN)
 * Desarrollado por: Santiago Escobar Arias · Representante de Sistemas
 * © 2026 Santiago Escobar Arias. Todos los derechos reservados.
 * Obra protegida por la Ley 23 de 1982 y Decisión 351 (CAN).
 */
/* =============================================
   MÓDULO INICIO · INGENIERÍA DE MINAS Y METALURGIA
   - Carga programa.json al inicio
   - Carga perfil.json y grupos.json por intersección
   - Gemelo Digital 4.0: Mina Subterránea & Crisol Metalúrgico 3D
   - Simulador interactivo del Ciclo Minero-Metalúrgico
   ============================================= */

const ICONOS_PERFIL = {
  perforacion: '<path d="m14 2-8 14h6l-2 6 10-12h-6l4-8z"/>',
  geologia: '<path d="M2 20h20"/><path d="m6 20 6-12 4 8 2-4 4 8"/>',
  yacimientos: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  gestion: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  ciencia: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/>',
};

const ICONOS_RUTAS = {
  perforacion: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  geologia: '<polygon points="6 2 18 2 22 8 12 22 2 8 6 2"/>',
  yacimientos: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/><line x1="12" y1="12" x2="12" y2="16"/>',
  produccion: '<path d="M3 13h18M5 13l2 7h10l2-7M7 13V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v7"/>',
  transicion: '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
};

const icono = (nombre) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS_PERFIL[nombre] || ICONOS_PERFIL.ciencia}</svg>`;
const iconoRuta = (nombre) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS_RUTAS[nombre] || ICONOS_RUTAS.geologia}</svg>`;

const ICONO_SELLO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/><path d="m9.5 9 1.8 1.8L15 7.2"/></svg>';


/* ---------- 1. Programa ---------- */

function pintarPrograma(p) {
  $('#portada-cifras').innerHTML = p.cifras
    .map((c) => `<li>${esc(c.valor)}<small>${esc(c.texto)}</small></li>`)
    .join('');

  const acreditacion = p.acreditacion;
  $('#programa-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">${esc(p.facultad)} · ${esc(p.sede)}</p>
      <h2 id="programa-titulo">Definición y Misión del Pregrado</h2>
      <p class="seccion-titulo__intro">Ingeniería de Minas y Metalurgia · Ciencia del subsuelo, rigor geomecánico y excelencia en transformación mineral</p>
    </div>

    <div class="programa__rejilla">
      <div class="programa__texto">
        <span class="programa__lema">Lema de la Facultad de Minas: «${esc(p.lema)}»</span>
        <div class="programa__parrafos">
          ${p.descripcion.map((parrafo) => `<p>${esc(parrafo)}</p>`).join('')}
        </div>
      </div>
      <ul class="ficha">
        ${p.ficha.map((f) => `
          <li><span class="ficha__etiqueta">${esc(f.etiqueta)}</span><span class="ficha__valor">${esc(f.valor)}</span></li>`).join('')}
      </ul>
    </div>

    <!-- EJES CURRICULARES ESTRATÉGICOS -->
    <div class="rutas-curriculares" id="rutas-curriculares">
      <div class="seccion-titulo seccion-titulo--rutas">
        <p class="seccion-titulo__antetitulo">Campos de profundización y aplicación</p>
        <h3 class="rutas__titulo">Ejes Curriculares Estratégicos</h3>
        <p class="seccion-titulo__intro">El plan de estudios articula cinco grandes pilares que preparan al ingeniero para liderar el sector extractivo moderno:</p>
      </div>

      <div class="rutas__grid">
        ${(p.rutas || []).map((ruta, idx) => `
          <article class="ruta-card" style="--color-ruta: ${ruta.color}">
            <div class="ruta-card__encabezado">
              <span class="ruta-card__numero">EJE 0${idx + 1}</span>
              <span class="ruta-card__icono">${iconoRuta(ruta.icono)}</span>
            </div>
            <h4 class="ruta-card__nombre">${esc(ruta.nombre)}</h4>
            <p class="ruta-card__descripcion">${esc(ruta.descripcion)}</p>
            <div class="ruta-card__pie">
              <a href="malla.html" class="ruta-card__enlace" title="Ver materias de ${esc(ruta.nombre)} en la malla">
                <span>Explorar en la malla</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </article>`).join('')}
      </div>
    </div>

    <!-- ACREDITACIÓN DE ALTA CALIDAD -->
    <div class="acreditacion">
      <div class="acreditacion__cabecera">
        <span class="acreditacion__sello-icono">${ICONO_SELLO}</span>
        <div>
          <span class="acreditacion__antetitulo">Calidad Académica Certificada</span>
          <h3 class="acreditacion__estado">${esc(acreditacion.estado)}</h3>
        </div>
      </div>
      <div class="acreditacion__rejilla">
        ${acreditacion.hitos.map((h, i) => `
          <div class="acreditacion__tarjeta ${i === 0 ? 'acreditacion__tarjeta--renovacion' : ''}">
            <div class="acreditacion__tarjeta-encabezado">
              <span class="acreditacion__anio-badge">${esc(h.anio)}</span>
              <span class="acreditacion__hito-tipo">${i === 0 ? 'Cuna de la Ingeniería Nacional' : 'Prestigio Internacional'}</span>
            </div>
            <p class="acreditacion__texto">${esc(h.texto)}</p>
          </div>`).join('')}
      </div>
      <div class="acreditacion__pie">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="acreditacion__info-icono" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <p class="acreditacion__nota">${esc(acreditacion.nota)}</p>
      </div>
    </div>

    <p class="fuentes">Fuentes oficiales:
      ${p.fuentes.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`).join(' · ')}
    </p>`;
}


/* ---------- 2. Perfil del egresado ---------- */

function pintarPerfil(perfil) {
  $('#perfil-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">Competencias y Proyección</p>
      <h2 id="perfil-titulo">${esc(perfil.titulo)}</h2>
      <p class="seccion-titulo__intro">${esc(perfil.intro)}</p>
    </div>
    <ul class="perfil__tarjetas">
      ${perfil.rasgos.map((r) => `
        <li class="rasgo">
          <span class="rasgo__icono">${icono(r.icono)}</span>
          <h3>${esc(r.titulo)}</h3>
          <p>${esc(r.texto)}</p>
        </li>`).join('')}
    </ul>
    <p class="perfil__fuente">${esc(perfil.fuente)}</p>`;
}


/* ---------- 3. Capítulos Estudiantiles (SME & ARMA) ---------- */

function pintarGrupos(grupos) {
  const nodos = grupos.map((grupo) => {
    const destino = grupo.enlace ? `href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer"` : '';
    
    return `
      <li class="grupo-nodo" style="--color-nodo: ${esc(grupo.color)}; --color-nodo-acento: ${esc(grupo.colorAcento || '#FFC107')};">
        <a class="grupo-nodo__enlace-ig" ${destino} aria-label="Unirse a ${esc(grupo.nombre)}" title="Clic para unirte al canal de ${esc(grupo.nombre)}">
          <div class="grupo-nodo__capsula">
            <div class="grupo-nodo__anillos">
              <span class="grupo-nodo__onda grupo-nodo__onda--1"></span>
              <span class="grupo-nodo__onda grupo-nodo__onda--2"></span>
            </div>
            
            <div class="grupo-nodo__emblema">
              <img src="${esc(grupo.logo)}" alt="Logo de ${esc(grupo.nombre)}" class="grupo-nodo__emblema-img" loading="lazy">
            </div>

            <div class="grupo-nodo__hover-pill">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>${esc(grupo.usuarioIg || 'Grupo de WhatsApp')} ↗</span>
            </div>
          </div>
        </a>

        <div class="grupo-nodo__contenido">
          <span class="grupo-nodo__tipo">${esc(grupo.tipo)}</span>
          <h3 class="grupo-nodo__nombre">${esc(grupo.nombre)}</h3>
          ${grupo.subtitulo ? `<p class="grupo-nodo__subtitulo">${esc(grupo.subtitulo)}</p>` : ''}
          <p class="grupo-nodo__desc">${esc(grupo.descripcion)}</p>

          <div class="grupo-nodo__pie">
            <a class="grupo-nodo__btn-accion" ${destino}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>Unirse al Grupo Oficial</span>
            </a>
          </div>
        </div>
      </li>`;
  }).join('');

  $('#grupos-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">Comunidad & Capítulos Oficiales</p>
      <h2 id="grupos-titulo">Capítulos Técnicos y Redes de Vanguardia</h2>
      <p class="seccion-titulo__intro">Nuestra carrera cuenta con los capítulos estudiantiles internacionales más prestigiosos del sector minero-metalúrgico y geomecánico. Conéctate con sus proyectos, cursos y eventos.</p>
    </div>
    <ul class="grupos__grid-nodos">${nodos}</ul>`;
}


/* ---------- 4. Simulador Interactivo del Ciclo Minero-Metalúrgico ---------- */

const DATOS_MODOS_SIMULADOR = {
  'exploracion': {
    badge: 'FASE 01 · PROSPECCIÓN, SONDAJES & MODELADO 3D',
    titulo: 'Exploración & Modelamiento Geoestadístico',
    desc: 'Identificación de anomalías geoquímicas y geofísicas, muestreo sistemático de testigos de perforación diamantina y estimación tridimensional de leyes y reservas minerales mediante algoritmos de geoestadística espacial (Kriging).',
    lbl1: 'Profundidad Sondaje',
    val1: '450 m',
    lbl2: 'Ley Promedio Au',
    val2: '7.2 g/t',
    lbl3: 'Recursos Estimados',
    val3: '4.2 Mt Mineral',
    lbl4: 'Método Estimación',
    val4: 'Kriging 3D',
    claseVisual: 'modo-exploracion',
    materias: [
      'Geología Física',
      'Mineralogía',
      'Yacimientos Minerales',
      'Geología de Minas'
    ]
  },
  'explotacion': {
    badge: 'FASE 02 · EXTRACCIÓN SUBTERRÁNEA & GEOMECÁNICA',
    titulo: 'Explotación Minera & Geomecánica del Macizo',
    desc: 'Diseño de galerías y tajos, perforación con jumbos, voladura controlada para fragmentación de roca, sostenimiento estructural con pernos Swellex y concreto lanzado (shotcrete), y acarreo automatizado.',
    lbl1: 'Galería Nivel',
    val1: '-350 m',
    lbl2: 'Calidad Macizo',
    val2: 'RMR 74 (Clase II)',
    lbl3: 'Avance Diario',
    val3: '4.8 m / frente',
    lbl4: 'Sostenimiento',
    val4: 'Shotcrete + Pernos',
    claseVisual: 'modo-explotacion',
    materias: [
      'Geomecánica',
      'Perforación y Fragmentación de Rocas',
      'Sostenimiento de Minas',
      'Minería Subterránea'
    ]
  },
  'mineralurgia': {
    badge: 'FASE 03 · CONMINUCIÓN & CONCENTRACIÓN DE MENAS',
    titulo: 'Beneficio de Minerales & Flotación de Espuma',
    desc: 'Reducción volumétrica de la roca mediante chancado y molienda hasta la liberación mineral (P80 = 75 µm). Concentración selectiva en celdas mecánicas de flotación mediante reactivos espumantes y colectores hidrofóbicos.',
    lbl1: 'Tamaño Liberación',
    val1: 'P80 = 75 µm',
    lbl2: 'Caudal de Pulpa',
    val2: '450 t/h',
    lbl3: 'Recuperación Au',
    val3: '94.8 %',
    lbl4: 'Ley Concentrado',
    val4: '78.2 % Au-Ag',
    claseVisual: 'modo-mineralurgia',
    materias: [
      'Mineralurgia',
      'Flotación de Minerales',
      'Mecánica de Fluidos',
      'Termodinámica General'
    ]
  },
  'metalurgia': {
    badge: 'FASE 04 · PIROMETALURGIA, FUNDICIÓN & CIERRE VERDE',
    titulo: 'Metalurgia Extractiva, Fundición & Cierre Responsable',
    desc: 'Lixiviación de metales, electroobtención y fundición a 1,140 °C en crisoles pirometalúrgicos para obtener lingotes de oro/plata de alta pureza (Bullion), con neutralización total de efluentes y planes de descarbonización.',
    lbl1: 'Temperatura Crisol',
    val1: '1,140 °C',
    lbl2: 'Pureza del Metal',
    val2: '99.9 % Bullion',
    lbl3: 'Balance Efluentes',
    val3: 'Circuito Cerrado',
    lbl4: 'Descarbonización',
    val4: 'Cero Mercurio',
    claseVisual: 'modo-metalurgia',
    materias: [
      'Metalurgia Extractiva',
      'Pirometalurgia',
      'Hidrometalurgia',
      'Desarrollo Sostenible y Minería'
    ]
  }
};

function configurarSimuladorCicloMinero() {
  const tabs = $$('.simulador-tab');
  const visualBox = $('#simulador-visual');
  if (!tabs.length || !visualBox) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const modo = tab.dataset.modo;
      if (!modo || !DATOS_MODOS_SIMULADOR[modo]) return;

      tabs.forEach((t) => {
        t.classList.remove('is-activa');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-activa');
      tab.setAttribute('aria-selected', 'true');

      actualizarSimulador(modo);
    });
  });
}

function actualizarSimulador(modo) {
  const datos = DATOS_MODOS_SIMULADOR[modo];
  if (!datos) return;

  const visualBox = $('#simulador-visual');
  if (visualBox) {
    visualBox.className = `simulador-visual ${datos.claseVisual}`;
  }

  const badge = $('#sim-badge');
  const titulo = $('#sim-titulo');
  const desc = $('#sim-desc');
  const l1 = $('#card-lbl-1');
  const v1 = $('#sim-prof');
  const l2 = $('#card-lbl-2');
  const v2 = $('#sim-presion');
  const l3 = $('#card-lbl-3');
  const v3 = $('#sim-caudal');
  const l4 = $('#card-lbl-4');
  const v4 = $('#sim-recobro');
  const materias = $('#sim-materias');

  if (badge) badge.textContent = datos.badge;
  if (titulo) titulo.textContent = datos.titulo;
  if (desc) desc.textContent = datos.desc;
  if (l1) l1.textContent = datos.lbl1;
  if (v1) v1.textContent = datos.val1;
  if (l2) l2.textContent = datos.lbl2;
  if (v2) v2.textContent = datos.val2;
  if (l3) l3.textContent = datos.lbl3;
  if (v3) v3.textContent = datos.val3;
  if (l4) l4.textContent = datos.lbl4;
  if (v4) v4.textContent = datos.val4;

  if (materias) {
    materias.innerHTML = datos.materias
      .map((m) => `<a href="malla.html" class="materia-chip">${esc(m)}</a>`)
      .join('');
  }
}


/* ---------- 5. Carga de datos diferida ---------- */

const SECCIONES = {
  perfil: () => cargarDatos('perfil').then(pintarPerfil),
  grupos: () => cargarDatos('grupos').then(pintarGrupos),
};

function cargarSeccion(seccion) {
  const cargar = SECCIONES[seccion.dataset.carga];
  if (cargar) {
    cargar().catch((error) => mostrarErrorDeCarga(seccion.querySelector('.contenedor'), error));
  }
}

// Carga inicial
cargarDatos('programa')
  .then(pintarPrograma)
  .catch((error) => mostrarErrorDeCarga($('#programa-contenido'), error));

configurarSimuladorCicloMinero();
iniciarGemeloDigital();

const porCargar = $$('[data-carga]');
if ('IntersectionObserver' in window) {
  const vigilante = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      vigilante.unobserve(e.target);
      cargarSeccion(e.target);
    });
  }, { rootMargin: '400px 0px' });
  porCargar.forEach((seccion) => vigilante.observe(seccion));
} else {
  porCargar.forEach(cargarSeccion);
}


/* =========================================================
   6. GEMELO DIGITAL 4.0: MINA Y METALURGIA EN 3D
   Simulación interactiva de Galería/Veta o Crisol de Fundición
   ========================================================= */

function iniciarGemeloDigital() {
  const canvas = $('#canvas-minas-digital');
  const consoleBox = $('#digital-twin-console');
  if (!canvas || !consoleBox) return;

  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let W = 0;
  let H = 0;

  function redimensionar() {
    W = canvas.parentElement.clientWidth || 460;
    H = canvas.parentElement.clientHeight || 215;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
  }

  redimensionar();
  window.addEventListener('resize', redimensionar);

  // Modo actual: 'mineria' (galería/veta/vagoneta) o 'metalurgia' (crisol/oro líquido)
  let modoActual = 'mineria';
  let rotX = 0.2;
  let rotY = -0.3;
  let targetRotX = 0.2;
  let targetRotY = -0.3;

  // Interacción suave con mouse para paralaje 3D
  consoleBox.addEventListener('mousemove', (e) => {
    const rect = consoleBox.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetRotY = -0.3 + nx * 0.35;
    targetRotX = 0.2 - ny * 0.25;
  });

  consoleBox.addEventListener('mouseleave', () => {
    targetRotX = 0.2;
    targetRotY = -0.3;
  });

  // Conmutador de modos
  const btnMin = $('#btn-dt-mineria');
  const btnMet = $('#btn-dt-metalurgia');
  const modoLabel = $('#dt-modo-label');
  const hudL1 = $('#hud-l1');
  const hudVal1 = $('#hud-val1');
  const hudSub1 = $('#hud-sub1');
  const hudL2 = $('#hud-l2');
  const hudVal2 = $('#hud-val2');
  const hudSub2 = $('#hud-sub2');
  const dtM1 = $('#dt-m1-lbl');
  const dtMet1 = $('#dt-met1');
  const dtM2 = $('#dt-m2-lbl');
  const dtMet2 = $('#dt-met2');
  const dtM3 = $('#dt-m3-lbl');
  const dtMet3 = $('#dt-met3');

  function setModo(nuevoModo) {
    modoActual = nuevoModo;
    if (nuevoModo === 'mineria') {
      btnMin?.classList.add('is-active');
      btnMet?.classList.remove('is-active');
      if (modoLabel) modoLabel.textContent = 'EXTRACCIÓN SUBTERRÁNEA ACTIVA';
      if (hudL1) hudL1.textContent = 'MACIZO ROCOSO (RMR)';
      if (hudVal1) hudVal1.textContent = '74 · CLASE II';
      if (hudSub1) hudSub1.textContent = 'ROCA BUENA · ESTABLE';
      if (hudL2) hudL2.textContent = 'ESFUERZO PRINCIPAL (σ₁)';
      if (hudVal2) hudVal2.textContent = '24.8 MPA';
      if (hudSub2) hudSub2.textContent = 'PROFUNDIDAD 450 M';
      if (dtM1) dtM1.textContent = 'AVANCE DE GALERÍA';
      if (dtMet1) dtMet1.textContent = '4.8 M / DÍA';
      if (dtM2) dtM2.textContent = 'LEY DE CABEZA Au';
      if (dtMet2) dtMet2.textContent = '6.85 G/T';
      if (dtM3) dtM3.textContent = 'SISTEMA SOSTENIMIENTO';
      if (dtMet3) dtMet3.textContent = 'SHOTCRETE + PERNOS SWELLEX';
    } else {
      btnMet?.classList.add('is-active');
      btnMin?.classList.remove('is-active');
      if (modoLabel) modoLabel.textContent = 'COLADA DE FUNDICIÓN ACTIVA';
      if (hudL1) hudL1.textContent = 'TEMPERATURA CRISOL';
      if (hudVal1) hudVal1.textContent = '1,140 °C';
      if (hudSub1) hudSub1.textContent = 'ORO/PLATA FUNDIDO';
      if (hudL2) hudL2.textContent = 'RECUPERACIÓN METALÚRGICA';
      if (hudVal2) hudVal2.textContent = '94.8 %';
      if (hudSub2) hudSub2.textContent = 'CIRCUITO DE FLOTACIÓN';
      if (dtM1) dtM1.textContent = 'CAUDAL DE PULPA';
      if (dtMet1) dtMet1.textContent = '420 T / H';
      if (dtM2) dtM2.textContent = 'LEY CONCENTRADO';
      if (dtMet2) dtMet2.textContent = '78.2 % Au-Ag';
      if (dtM3) dtM3.textContent = 'PRODUCTO DE PLANTA';
      if (dtMet3) dtMet3.textContent = 'LINGOTE BULLION 99.9%';
    }
  }

  btnMin?.addEventListener('click', () => setModo('mineria'));
  btnMet?.addEventListener('click', () => setModo('metalurgia'));

  // Partículas para veta/galería (chispas y polvo dorado) o crisol (chispas incandescentes de colada)
  const NUM_PARTICULAS = 85;
  const particulas = [];
  for (let i = 0; i < NUM_PARTICULAS; i++) {
    particulas.push({
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.006,
      radius: 1.2 + Math.random() * 2.4,
      angle: Math.random() * Math.PI * 2,
      dist: 10 + Math.random() * 50,
      seed: Math.random()
    });
  }

  // Proyección 3D a 2D (escalada para vista compacta de 215px)
  const FOV = 320;
  function proyectar(p3d) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = p3d.x * cosY + p3d.z * sinY;
    const z1 = -p3d.x * sinY + p3d.z * cosY;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const py = p3d.y * 0.72; // Escala vertical compacta para encuadre nítido
    const y2 = py * cosX - z1 * sinX;
    const z2 = py * sinX + z1 * cosX;

    const scale = FOV / (FOV + z2 + 200);
    return {
      x: W / 2 + x1 * scale,
      y: H / 2 + y2 * scale,
      scale: scale,
      z: z2
    };
  }

  let cartPos = 0;
  let cartDir = 1;
  let sparkTick = 0;

  function bucleRender() {
    ctx.clearRect(0, 0, W, H);

    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;
    sparkTick += 0.03;

    if (modoActual === 'mineria') {
      // ----------------------------------------------------
      // MODO 1: GALERÍA SUBTERRÁNEA & VETA DE ORO (MINE STOPE)
      // ----------------------------------------------------

      // 1. Red de vetillas y fracturas mineralizadas (Stockwork aurífero natural)
      const vetas = [
        [{ x: -140, y: -45, z: -50 }, { x: -80, y: -25, z: -30 }, { x: -30, y: -40, z: -10 }, { x: 30, y: -30, z: 20 }, { x: 100, y: -45, z: 50 }],
        [{ x: -90, y: 10, z: -60 }, { x: -45, y: -5, z: -20 }, { x: 10, y: 15, z: 10 }, { x: 75, y: -5, z: 40 }, { x: 130, y: 20, z: 70 }],
        [{ x: -40, y: -70, z: -20 }, { x: -20, y: -35, z: 0 }, { x: 25, y: -20, z: 20 }, { x: 60, y: -50, z: 40 }]
      ];

      vetas.forEach((veta, idx) => {
        // Halo de alteración hidrotermal
        ctx.lineWidth = idx === 0 ? 8 : 5;
        ctx.strokeStyle = 'rgba(255, 193, 7, 0.22)';
        ctx.beginPath();
        veta.forEach((p, i) => {
          const pt = proyectar(p);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Filamento de oro nativo
        ctx.lineWidth = idx === 0 ? 2.5 : 1.6;
        ctx.strokeStyle = idx === 0 ? '#FFC107' : '#FFECB3';
        ctx.beginPath();
        veta.forEach((p, i) => {
          const pt = proyectar(p);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Nódulos minerales incrustados en la roca
        veta.forEach((p) => {
          const pt = proyectar(p);
          ctx.fillStyle = '#FFF176';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (idx === 0 ? 3 : 2) * pt.scale, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // 2. Arcos de sostenimiento de la galería (Frames de acero en herradura)
      const numArcos = 7;
      for (let i = 0; i < numArcos; i++) {
        const zPos = -120 + i * 45;
        const arcAlpha = Math.min(1, Math.max(0.2, (zPos + 140) / 200));

        // Arco de sostenimiento
        ctx.strokeStyle = `rgba(189, 189, 189, ${arcAlpha * 0.8})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        
        // Pata izquierda
        const p1 = proyectar({ x: -60, y: 55, z: zPos });
        const p2 = proyectar({ x: -60, y: -10, z: zPos });
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Bóveda superior
        for (let a = Math.PI; a >= 0; a -= Math.PI / 8) {
          const rx = Math.cos(a) * 60;
          const ry = -10 - Math.sin(a) * 45;
          const pa = proyectar({ x: rx, y: ry, z: zPos });
          ctx.lineTo(pa.x, pa.y);
        }

        // Pata derecha
        const p3 = proyectar({ x: 60, y: 55, z: zPos });
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();

        // Pernos de roca radiales en cada arco
        ctx.strokeStyle = `rgba(255, 193, 7, ${arcAlpha * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        const perno1A = proyectar({ x: -60, y: -20, z: zPos });
        const perno1B = proyectar({ x: -85, y: -35, z: zPos });
        ctx.beginPath(); ctx.moveTo(perno1A.x, perno1A.y); ctx.lineTo(perno1B.x, perno1B.y); ctx.stroke();
        const perno2A = proyectar({ x: 0, y: -55, z: zPos });
        const perno2B = proyectar({ x: 0, y: -80, z: zPos });
        ctx.beginPath(); ctx.moveTo(perno2A.x, perno2A.y); ctx.lineTo(perno2B.x, perno2B.y); ctx.stroke();
        const perno3A = proyectar({ x: 60, y: -20, z: zPos });
        const perno3B = proyectar({ x: 85, y: -35, z: zPos });
        ctx.beginPath(); ctx.moveTo(perno3A.x, perno3A.y); ctx.lineTo(perno3B.x, perno3B.y); ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Rieles de transporte minero en el suelo de la galería
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = '#BDBDBD';
      // Riel izquierdo y derecho
      const rIzqA = proyectar({ x: -22, y: 55, z: -130 });
      const rIzqB = proyectar({ x: -22, y: 55, z: 140 });
      ctx.beginPath(); ctx.moveTo(rIzqA.x, rIzqA.y); ctx.lineTo(rIzqB.x, rIzqB.y); ctx.stroke();

      const rDerA = proyectar({ x: 22, y: 55, z: -130 });
      const rDerB = proyectar({ x: 22, y: 55, z: 140 });
      ctx.beginPath(); ctx.moveTo(rDerA.x, rDerA.y); ctx.lineTo(rDerB.x, rDerB.y); ctx.stroke();

      // Durmientes de riel
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 193, 7, 0.4)';
      for (let tz = -120; tz <= 130; tz += 25) {
        const da = proyectar({ x: -28, y: 56, z: tz });
        const db = proyectar({ x: 28, y: 56, z: tz });
        ctx.beginPath(); ctx.moveTo(da.x, da.y); ctx.lineTo(db.x, db.y); ctx.stroke();
      }

      // 4. Vagoneta minera animada sobre los rieles
      cartPos += 0.8 * cartDir;
      if (cartPos > 85) cartDir = -1;
      if (cartPos < -85) cartDir = 1;

      const pCartBase = proyectar({ x: 0, y: 48, z: cartPos });
      const cw = 28 * pCartBase.scale;
      const ch = 20 * pCartBase.scale;

      // Caja de la vagoneta
      ctx.fillStyle = '#212121';
      ctx.strokeStyle = '#FFC107';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pCartBase.x - cw / 2, pCartBase.y - ch, cw, ch, 3);
      ctx.fill();
      ctx.stroke();

      // Carga de mineral aurífero brillando en la vagoneta
      ctx.fillStyle = '#FFC107';
      ctx.beginPath();
      ctx.arc(pCartBase.x, pCartBase.y - ch + 2, cw * 0.35, Math.PI, 0);
      ctx.fill();

      // Ruedas de acero
      ctx.fillStyle = '#BDBDBD';
      ctx.beginPath();
      ctx.arc(pCartBase.x - cw * 0.35, pCartBase.y + 2, 4 * pCartBase.scale, 0, Math.PI * 2);
      ctx.arc(pCartBase.x + cw * 0.35, pCartBase.y + 2, 4 * pCartBase.scale, 0, Math.PI * 2);
      ctx.fill();

      // 5. Partículas de oro y polvo de ventilación en la galería
      particulas.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const pz = -120 + p.t * 240;
        const px = Math.sin(p.seed * 8 + sparkTick) * 45;
        const py = -30 + Math.cos(p.seed * 5 + sparkTick) * 35;

        const proj = proyectar({ x: px, y: py, z: pz });
        const alpha = Math.sin(p.t * Math.PI);
        ctx.fillStyle = p.seed > 0.4 ? `rgba(255, 193, 7, ${alpha * 0.9})` : `rgba(255, 236, 179, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.radius * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

    } else {
      // ----------------------------------------------------
      // MODO 2: METALURGIA EXTRACTIVA & CRISOL DE FUNDICIÓN
      // ----------------------------------------------------

      // 1. Silueta 3D del Crisol de Fundición
      const ptCrisol = proyectar({ x: -45, y: -30, z: 0 });
      const cRad = 46 * ptCrisol.scale;

      // Resplandor de calor alrededor del crisol
      const gradHeat = ctx.createRadialGradient(ptCrisol.x, ptCrisol.y, 10, ptCrisol.x, ptCrisol.y, cRad * 2.2);
      gradHeat.addColorStop(0, 'rgba(255, 193, 7, 0.4)');
      gradHeat.addColorStop(0.6, 'rgba(216, 67, 21, 0.2)');
      gradHeat.addColorStop(1, 'transparent');
      ctx.fillStyle = gradHeat;
      ctx.beginPath();
      ctx.arc(ptCrisol.x, ptCrisol.y, cRad * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Cuerpo refractario del crisol
      ctx.fillStyle = '#1c1c1c';
      ctx.strokeStyle = '#FFC107';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(ptCrisol.x, ptCrisol.y - 15, cRad, cRad * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Vientre del crisol
      ctx.beginPath();
      ctx.moveTo(ptCrisol.x - cRad, ptCrisol.y - 15);
      ctx.lineTo(ptCrisol.x - cRad * 0.7, ptCrisol.y + 45);
      ctx.quadraticCurveTo(ptCrisol.x, ptCrisol.y + 60, ptCrisol.x + cRad * 0.7, ptCrisol.y + 45);
      ctx.lineTo(ptCrisol.x + cRad, ptCrisol.y - 15);
      ctx.fillStyle = '#212121';
      ctx.fill();
      ctx.stroke();

      // Superficie de metal fundido dentro del crisol (oro incandescente)
      ctx.fillStyle = '#FFC107';
      ctx.beginPath();
      ctx.ellipse(ptCrisol.x, ptCrisol.y - 15, cRad * 0.85, cRad * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Chorro de colada continua cayendo hacia la lingotera
      const ptMold = proyectar({ x: 55, y: 70, z: 0 });
      ctx.lineWidth = 6.5;
      ctx.strokeStyle = '#FFC107';
      ctx.beginPath();
      ctx.moveTo(ptCrisol.x + cRad * 0.75, ptCrisol.y - 12);
      ctx.quadraticCurveTo(ptCrisol.x + cRad * 1.1, ptCrisol.y + 25, ptMold.x, ptMold.y - 10);
      ctx.stroke();

      // Hilo central blanco ardiente
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(ptCrisol.x + cRad * 0.75, ptCrisol.y - 12);
      ctx.quadraticCurveTo(ptCrisol.x + cRad * 1.1, ptCrisol.y + 25, ptMold.x, ptMold.y - 10);
      ctx.stroke();

      // 3. Lingotera con oro líquido acumulándose
      const mW = 75 * ptMold.scale;
      const mH = 24 * ptMold.scale;
      ctx.fillStyle = '#181818';
      ctx.strokeStyle = '#BDBDBD';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(ptMold.x - mW / 2, ptMold.y - mH / 2, mW, mH, 4);
      ctx.fill();
      ctx.stroke();

      // Lingote dorado fundido en su interior
      ctx.fillStyle = '#FFC107';
      ctx.beginPath();
      ctx.roundRect(ptMold.x - mW * 0.42, ptMold.y - mH * 0.35, mW * 0.84, mH * 0.7, 2);
      ctx.fill();

      // 4. Chispas de fundición pirometalúrgica estallando
      particulas.forEach((p) => {
        p.t += p.speed * 1.3;
        if (p.t > 1) p.t = 0;

        const burstAng = p.angle;
        const burstDist = p.t * p.dist * 1.5;
        const sx = (ptMold.x) + Math.cos(burstAng) * burstDist;
        const sy = (ptMold.y - 10) - Math.sin(burstAng) * burstDist * 0.8 + Math.pow(p.t, 2) * 22;

        const alpha = Math.max(0, 1 - p.t);
        ctx.fillStyle = p.seed > 0.5 ? `rgba(255, 238, 88, ${alpha})` : `rgba(255, 193, 7, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, p.radius * 0.9, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    requestAnimationFrame(bucleRender);
  }

  bucleRender();
}
