/* ==============================================================================
   PORTAL WEB OFICIAL · INGENIERÍA DE MINAS Y METALURGIA · UNAL SEDE MEDELLÍN
   Arquitectura de software, maquetación y desarrollo integral por:
   Santiago Escobar Arias · Representante Estudiantil de Sistemas e Informática
   Canales Oficiales e Información de Ingeniería de Minas y Metalurgia:
   José Avelino Pérez Romero · Representante Estudiantil
   Facultad de Minas — Universidad Nacional de Colombia, Sede Medellín
   ============================================================================== */

/**
 * sofIA — Asistente Virtual Inteligente de Ingeniería de Minas y Metalurgia
 * Arquitectura modular autónoma en Vanilla JavaScript.
 * Procesa consultas sobre malla curricular, prerrequisitos, semilleros (ÍGNEA, SME, ARMA, Rocas),
 * alianzas, cambio de carrera / traslados, creador de la plataforma, fechas del calendario y recursos en Drive.
 */
(() => {
  'use strict';

  // ==========================================================================
  // 1. CONFIGURACIÓN, RECURSOS Y AVATAR HOLOGRÁFICO
  // ==========================================================================

  const SOFIA_CFG = {
    nombre: 'sofIA',
    titulo: 'Asistente Inteligente de Minas y Metalurgia',
    institucion: 'Universidad Nacional de Colombia · Sede Medellín',
    facultad: 'Facultad de Minas',
    programa: 'Ingeniería de Minas y Metalurgia',
    repreNombre: 'José Avelino Pérez Romero',
    repreWhatsApp: 'https://wa.me/573219818486',
    repreTelefono: '(+57) 321 981 8486',
    repreInstagramPersonal: 'https://www.instagram.com/jperomero?xtok=MWFoM3Y3bDU0a3JsdQ%3D%3D&utm_source=qr',
    repreInstagramOficial: 'https://www.instagram.com/repreminasymetalurgiaun?rpxt=ZTNsOGxqbDQ5Y3Jv',
    usuarioInstagramOficial: '@repreminasymetalurgiaun',
    grupoOficialWhatsApp: 'https://chat.whatsapp.com/BpKyya2ef7P2tDTpXu6Ywd?s=sw&p=i&mlu=4&ilr=4&iam=2',
    canalWhatsApp: 'https://whatsapp.com/channel/0029VbAmtMII7BeInge1o61H',
    driveRecursos: 'https://drive.google.com/drive/u/4/folders/1N2g1Db6bL1YUdycsTLm0p7Zhqoiruc4s',
    asesoriaMinasCorreo: 'asesorestu_med@unal.edu.co',
    asesoriaMinasTel: '(+57 604) 430 9653',
    tramitesMinasUrl: 'https://minas.medellin.unal.edu.co/estudiantes/gestion-de-asuntos-estudiantiles/gae-solicitudes-estudiantiles',
    creadorNombre: 'Santiago Escobar Arias',
    creadorRol: 'Representante Estudiantil de Ingeniería de Sistemas e Informática · Creador de la Web',
    creadorWhatsApp: 'https://wa.me/573123772091',
    creadorCorreo: 'saescobara@unal.edu.co',
    creadorInstagram: 'https://www.instagram.com/s_escobar__/',
  };

  // SVG Holográfico de sofIA (Estilo Cortana / Inteligencia de Minas con oro minero y carbón grafito)
  const SOFIA_SVG_AVATAR = `<svg class="sofia-avatar-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="sofiaMinasGrad" x1="10%" y1="10%" x2="90%" y2="90%">
        <stop offset="0%" stop-color="#FFC107"/>
        <stop offset="50%" stop-color="#D49E00"/>
        <stop offset="100%" stop-color="#212121"/>
      </linearGradient>
      <radialGradient id="sofiaMinasGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFC107" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#D49E00" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#121212" stop-opacity="0"/>
      </radialGradient>
      <filter id="sofiaMinasFiltro" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#sofiaMinasGlow)" opacity="0.35"/>
    <circle cx="50" cy="50" r="42" stroke="url(#sofiaMinasGrad)" stroke-width="2.5" stroke-dasharray="6 3" opacity="0.85"/>
    <circle cx="50" cy="50" r="35" stroke="#FFC107" stroke-width="1.2" opacity="0.6"/>
    <!-- Silueta holográfica estilizada -->
    <path d="M50 22 C41 22 34 29 34 39 C34 47 38 52 42 56 C44 58 45 61 45 64 L55 64 C55 61 56 58 58 56 C62 52 66 47 66 39 C66 29 59 22 50 22 Z" fill="url(#sofiaMinasGrad)" filter="url(#sofiaMinasFiltro)"/>
    <path d="M43 67 L57 67 L55 72 L45 72 Z" fill="#FFC107" opacity="0.9"/>
    <path d="M46 74 L54 74 L53 77 L47 77 Z" fill="#D49E00" opacity="0.8"/>
    <!-- Ojos digitales / Núcleo de datos -->
    <circle cx="44.5" cy="39" r="2.2" fill="#FFFFFF"/>
    <circle cx="55.5" cy="39" r="2.2" fill="#FFFFFF"/>
    <circle cx="50" cy="46" r="1.5" fill="#FFFFFF" opacity="0.8"/>
    <!-- Vetas de mineral en ondas de transmisión -->
    <circle cx="50" cy="50" r="28" stroke="#FFFFFF" stroke-width="0.8" stroke-dasharray="2 6" opacity="0.5"/>
  </svg>`;

  // ==========================================================================
  // 2. BASE DE CONOCIMIENTO Y DATOS DINÁMICOS
  // ==========================================================================

  const datos = {
    asignaturas: [],
    componentes: null,
    plan: null,
    info: null,
    programa: null,
    perfil: null,
    grupos: [],
    convenios: null,
  };

  const indices = {
    materiasPorCodigo: new Map(),
    materiasPorNombre: new Map(),
    aliasMaterias: new Map(),
    materiasPorSemestre: new Map(),
    calendarioFilas: [],
  };

  const estadoSofia = {
    abierto: false,
    vozHabilitada: false,
    historial: [],
    cargando: true,
  };

  // Normalizador de texto para búsquedas tolerantes a acentos y mayúsculas
  function normalizar(texto) {
    if (!texto) return '';
    return texto
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Carga de datos JSON oficiales de Ingeniería de Minas y Metalurgia
  async function cargarDatos() {
    try {
      const peticiones = [
        fetch('data/malla/asignaturas.json').then((r) => (r.ok ? r.json() : [])).catch(() => []),
        fetch('data/malla/componentes.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/malla/plan.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/info.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/programa.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/perfil.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/grupos.json').then((r) => (r.ok ? r.json() : [])).catch(() => []),
        fetch('data/convenios/alianzas-estrategicas.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ];

      const [asigs, comp, plan, info, prog, perfil, grupos, convenios] = await Promise.all(peticiones);

      datos.asignaturas = Array.isArray(asigs) ? asigs : [];
      datos.componentes = comp;
      datos.plan = plan;
      datos.info = info;
      datos.programa = prog;
      datos.perfil = perfil;
      datos.grupos = Array.isArray(grupos) ? grupos : [];
      datos.convenios = convenios;

      construirIndices();
      estadoSofia.cargando = false;
    } catch (err) {
      console.warn('[sofIA Minas] Advertencia al cargar datos:', err);
      estadoSofia.cargando = false;
    }
  }

  // Indexación y diccionario de sinónimos/alias de materias de Minas y Metalurgia
  function construirIndices() {
    indices.materiasPorCodigo.clear();
    indices.materiasPorNombre.clear();
    indices.aliasMaterias.clear();
    indices.materiasPorSemestre.clear();
    indices.calendarioFilas = [];

    datos.asignaturas.forEach((asig) => {
      indices.materiasPorCodigo.set(asig.codigo, asig);
      indices.materiasPorNombre.set(normalizar(asig.nombre), asig);

      const sem = asig.semestre || 0;
      if (!indices.materiasPorSemestre.has(sem)) {
        indices.materiasPorSemestre.set(sem, []);
      }
      indices.materiasPorSemestre.get(sem).push(asig);
    });

    // Alias exhaustivos para las 88 materias de Minas y Metalurgia
    const ALIAS_MATERIAS = [
      [['calculo 1', 'calculo diferencial', 'diferencial'], 'Cálculo Diferencial'],
      [['geometria vectorial', 'vectorial'], 'Geometría Vectorial y Analítica'],
      [['calculo 2', 'calculo integral', 'integral'], 'Cálculo Integral'],
      [['algebra lineal', 'lineal'], 'Álgebra Lineal'],
      [['estadistica 1', 'estadistica', 'probabilidad y estadistica'], 'Estadística I'],
      [['quimica general', 'quimica 1', 'quimica'], 'Química General'],
      [['fisica 1', 'mecanica', 'fisica mecanica'], 'Física Mecánica'],
      [['fundamentos de programacion', 'programacion', 'python', 'sistemas'], 'Fundamentos de Programación'],
      [['calculo 3', 'calculo en varias variables', 'varias variables'], 'Cálculo en Varias Variables'],
      [['ecuaciones diferenciales', 'ecuaciones', 'ed'], 'Ecuaciones Diferenciales'],
      [['matematicas especiales', 'especiales'], 'Matemáticas Especiales'],
      [['metodos numericos', 'numericos'], 'Métodos Numéricos'],
      [['estadistica 2', 'estadistica ii'], 'Estadística II'],
      [['fisica 2', 'electricidad y magnetismo', 'electromagnetismo', 'fem'], 'Física de Electricidad y Magnetismo'],
      [['fisica 3', 'oscilaciones ondas y optica', 'ondas', 'optica', 'foo'], 'Física de Oscilaciones, Ondas y Óptica'],
      [['fisica moderna'], 'Física Moderna'],
      [['laboratorio de fisica moderna', 'lab fisica moderna'], 'Laboratorio de Física Moderna'],
      [['ciencias de los materiales', 'materiales'], 'Ciencias de los Materiales'],
      [['investigacion de operaciones', 'io'], 'Investigación de Operaciones'],
      [['geologia fisica', 'geologia 1'], 'Geología Física'],
      [['topografia', 'topo'], 'Topografía'],
      [['elementos de geologia estructural', 'geologia estructural', 'estructural'], 'Elementos de Geología Estructural'],
      [['mineralogia', 'minerales'], 'Mineralogía'],
      [['yacimientos minerales', 'yacimientos'], 'Yacimientos Minerales'],
      [['geologia de minas'], 'Geología de Minas'],
      [['practica de campo 1', 'campo 1', 'campo i'], 'Práctica de Campo I'],
      [['mineralogia aplicada y de procesos', 'mineralogia aplicada'], 'Mineralogía Aplicada y de Procesos'],
      [['prospeccion y exploracion de recursos minerales', 'exploracion minera'], 'Prospección y Exploración de Recursos Minerales'],
      [['microscopia optica de minerales opacos', 'minerales opacos'], 'Microscopía Óptica de Minerales Opacos'],
      [['recursos energeticos', 'energia'], 'Recursos Energéticos'],
      [['rocas y minerales en la industria', 'minerales industriales'], 'Rocas y Minerales en la Industria'],
      [['simulacion geoestadistica de yacimientos minerales', 'geoestadistica'], 'Simulación Geoestadística de Yacimientos Minerales'],
      [['topicos especiales en geologia de minas'], 'Tópicos Especiales en Geología de Minas'],
      [['mecanica aplicada'], 'Mecánica Aplicada'],
      [['mecanica de fluidos', 'fluidos'], 'Mecánica de Fluidos'],
      [['geomecanica', 'mecanica de rocas'], 'Geomecánica'],
      [['mecanica estructural'], 'Mecánica Estructural'],
      [['mecanica de materiales'], 'Mecánica de Materiales'],
      [['mecanica de suelos', 'suelos'], 'Mecánica de Suelos'],
      [['geotecnia', 'estabilidad de taludes'], 'Geotecnia'],
      [['geomecanica minera'], 'Geomecánica Minera'],
      [['termodinamica general', 'termo', 'termodinamica'], 'Termodinámica General'],
      [['mineralurgia', 'procesamiento de minerales', 'conminucion'], 'Mineralurgia'],
      [['metalurgia extractiva', 'metalurgia'], 'Metalurgia Extractiva'],
      [['balances de materia y energia en procesos metalurgicos', 'balances metalurgicos'], 'Balances de Materia y Energía en Procesos Metalúrgicos'],
      [['pirometalurgia', 'fundicion', 'hornos'], 'Pirometalurgia'],
      [['flotacion de minerales', 'flotacion'], 'Flotación de Minerales'],
      [['quimica metalurgica'], 'Química Metalúrgica'],
      [['diseno y dimensionamiento de equipos de mineria', 'equipos de mineria'], 'Diseño y Dimensionamiento de Equipos de Minería'],
      [['hidrometalurgia', 'lixiviacion'], 'Hidrometalurgia'],
      [['electrometalurgia', 'electroobtencion'], 'Electrometalurgia'],
      [['beneficio de minerales'], 'Beneficio de Minerales'],
      [['electroquimica metalurgica'], 'Electroquímica Metalúrgica'],
      [['topicos especiales en beneficio de minerales'], 'Tópicos Especiales en Beneficio de Minerales'],
      [['perforacion y fragmentacion de rocas', 'perforacion y voladuras', 'voladuras', 'explosivos'], 'Perforación y Fragmentación de Rocas'],
      [['sostenimiento de minas', 'sostenimiento', 'pernos', 'shotcrete'], 'Sostenimiento de Minas'],
      [['planeamiento minero', 'planificacion minera', 'diseno de minas'], 'Planeamiento Minero'],
      [['transporte minero', 'carguio y acarreo', 'acarreo'], 'Transporte Minero'],
      [['ambientes mineros', 'ventilacion de minas', 'ventilacion'], 'Ambientes Mineros'],
      [['mineria de superficie', 'cielo abierto', 'open pit'], 'Minería de Superficie'],
      [['mineria subterranea', 'subterranea'], 'Minería Subterránea'],
      [['practica de campo 2', 'campo 2', 'campo ii'], 'Práctica de Campo II'],
      [['introduccion al control minero metalurgico', 'control minero'], 'Introducción al Control Minero-Metalúrgico'],
      [['simulacion minero metalurgica', 'simulacion minera'], 'Simulación Minero-Metalúrgica'],
      [['explotacion de canteras', 'canteras'], 'Explotación de Canteras'],
      [['legislacion minera', 'codigo de minas'], 'Legislación Minera'],
      [['topicos especiales en mineria'], 'Tópicos Especiales en Minería'],
      [['fundamentos de proyectos en ingenieria', 'proyectos 1', 'fpi'], 'Fundamentos de Proyectos en Ingeniería'],
      [['estructuracion y evaluacion de proyectos de ingenieria', 'evaluacion de proyectos', 'proyectos 2'], 'Estructuración y Evaluación de Proyectos de Ingeniería'],
      [['proyecto integrado de ingenieria', 'pii', 'proyecto integrado'], 'Proyecto Integrado de Ingeniería'],
      [['introduccion a la ingenieria de minas y metalurgia', 'intro minas', 'introduccion'], 'Introducción a la Ingeniería de Minas y Metalurgia'],
      [['economia de minas', 'economia minera'], 'Economía de Minas'],
      [['cierre de minas', 'post mineria'], 'Cierre de Minas'],
      [['sistemas de gestion aplicados a la mineria'], 'Sistemas de Gestión Aplicados a la Minería'],
      [['desarrollo sostenible y mineria', 'mineria sostenible'], 'Desarrollo Sostenible y Minería'],
      [['ecologia general', 'ecologia'], 'Ecología General'],
      [['biologia general', 'biologia'], 'Biología General'],
      [['estimacion de costos en mineria', 'costos en mineria'], 'Estimación de Costos en Minería'],
      [['etica en la profesionalizacion de ingenieros', 'etica'], 'Ética en la Profesionalización de Ingenieros'],
      [['introduccion a la seguridad minera', 'seguridad minera'], 'Introducción a la Seguridad Minera'],
      [['estrategias de gestion y gerencia de proyectos en ingenieria', 'gerencia de proyectos'], 'Estrategias de Gestión y Gerencia de Proyectos en Ingeniería'],
      [['gestion de proyectos de desarrollo y metodologia general ajustada', 'mga'], 'Gestión de Proyectos de Desarrollo y Metodología General Ajustada'],
      [['proyectos de innovacion y desarrollo'], 'Proyectos de Innovación y Desarrollo'],
      [['toma de decision para el diseno en ingenieria'], 'Toma de Decisión para el Diseño en Ingeniería'],
      [['fundamentos de ciclo de vida para ingenieria', 'ciclo de vida'], 'Fundamentos de Ciclo de Vida para Ingeniería'],
      [['trabajo de grado', 'tesis', 'grado', 'monografia'], 'Trabajo de Grado'],
      [['practica de extension', 'pasantia', 'practica profesional', 'practica'], 'Práctica de Extensión'],
      [['cursos de posgrado', 'materias de posgrado', 'posgrado'], 'Cursos de Posgrado'],
    ];

    ALIAS_MATERIAS.forEach(([aliases, nombreReal]) => {
      const match = datos.asignaturas.find((a) => normalizar(a.nombre) === normalizar(nombreReal));
      if (match) {
        aliases.forEach((alias) => indices.aliasMaterias.set(normalizar(alias), match));
      }
    });

    // Indexar calendario académico oficial de la Facultad de Minas
    if (datos.info?.guias) {
      const guiaCal = datos.info.guias.find((g) => g.id === 'calendario-academico');
      if (guiaCal?.calendario?.grupos) {
        guiaCal.calendario.grupos.forEach((grupo) => {
          if (Array.isArray(grupo.filas)) {
            grupo.filas.forEach((fila) => {
              indices.calendarioFilas.push({
                evento: fila.evento,
                eventoNorm: normalizar(fila.evento),
                fecha: fila.fecha,
                grupo: grupo.titulo,
              });
            });
          }
        });
      }
    }
  }

  // ==========================================================================
  // 3. MOTOR DE RESPUESTAS E INTENCIONES (NATURAL LANGUAGE PROCESSOR)
  // ==========================================================================

  function responderPregunta(consultaOriginal) {
    const pregunta = (consultaOriginal || '').trim();
    const preguntaNorm = normalizar(pregunta);

    if (!preguntaNorm) {
      return {
        texto: 'Por favor escribe tu consulta sobre el programa de Ingeniería de Minas y Metalurgia, la malla curricular, materias, prerrequisitos, semilleros (ÍGNEA, SME, ARMA), trámites o recursos de estudio.',
        chips: ['¿Qué es la malla curricular?', '¿Qué tipo de materias hay?', '¿Por qué estudiar Minas?'],
      };
    }

    // ------------------------------------------------------------------------
    // 1. Saludos y Presentación
    // ------------------------------------------------------------------------
    if (/^(hola|buen(as|os)?|saludos|hey|que tal|iniciar|comenzar|hi|hello)$/.test(preguntaNorm) || preguntaNorm.startsWith('hola sofia')) {
      return {
        texto: `¡Hola! Soy **${SOFIA_CFG.nombre}**, tu asistente inteligente del programa de **${SOFIA_CFG.programa}** de la **${SOFIA_CFG.facultad}** (UNAL Medellín).

Pregúntame con total confianza sobre:
- **Malla Curricular y prerrequisitos** de las 88 asignaturas del plan.
- **Tipos de materias** y componentes (Fundamentación, Disciplinar, Libre Elección).
- **¿Por qué estudiar Minas y Metalurgia?** y fortalezas en explotación y beneficio.
- **¿Quién es el creador de la web?**
- **¿Quién es el representante estudiantil?** (José Avelino Pérez Romero).
- **Semilleros y capítulos técnicos:** ÍGNEA, SME, ARMA y Semillero de Rocas.
- **¿Cómo hacer cambio de carrera / traslados?** ante la Facultad de Minas.
- **Alianzas estratégicas** (ICETEX, Sapiencia, Metro Cívica, software minero especializado).
- **Banco de Recursos / Drive oficial** con parciales, memorias de cálculo y talleres.

¿Sobre qué tema te gustaría consultar hoy?`,
        chips: [
          '¿Qué es la malla curricular?',
          '¿Qué tipo de materias hay?',
          '¿Por qué estudiar Minas?',
          '¿Quién es el creador de la web?',
          'Contacto del Representante',
          'Semilleros (ÍGNEA, SME, ARMA)',
        ],
      };
    }

    // ------------------------------------------------------------------------
    // 2. ¿Quién es el Creador de la Web? (Requisito clave)
    // ------------------------------------------------------------------------
    if (/creador|quien creo|quien hizo|quien desarrollo|desarrollador|autor|santiago escobar|santiago|quien construyo esta web|quien programo/.test(preguntaNorm)) {
      return {
        texto: `### Creador y Arquitecto de Software de la Plataforma 💻

Este portal web oficial, sus simuladores de avance, la malla curricular interactiva y yo (**${SOFIA_CFG.nombre}**) fuimos creados y desarrollados integralmente por:

👨‍💻 **${SOFIA_CFG.creadorNombre}**
- **Rol:** ${SOFIA_CFG.creadorRol}.
- **Propósito:** Brindar herramientas digitales de vanguardia, transparentes y gratuitas para fortalecer la vida académica, el seguimiento curricular y el bienestar de los estudiantes de la **Facultad de Minas**.
- **Canal de contacto directo:**
  - WhatsApp: [Chat con Santiago Escobar](${SOFIA_CFG.creadorWhatsApp}) \`(+57 312 377 2091)\`
  - Correo institucional: \`${SOFIA_CFG.creadorCorreo}\`
  - Instagram: [@s_escobar__](${SOFIA_CFG.creadorInstagram})

El proyecto cuenta con propiedad intelectual y derechos de autor conforme a la Ley 23 de 1982 y normativas de software de la UNAL Medellín.`,
        chips: ['Contacto del Representante', '¿Qué es la malla curricular?', 'Banco de Recursos en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 3. ¿Quién es el Representante Estudiantil?
    // ------------------------------------------------------------------------
    if (/repre|representante|representacion|jose avelino|jperomero|contacto repre|quien es el representante/.test(preguntaNorm)) {
      return {
        texto: `### Representación Estudiantil · Ing. de Minas y Metalurgia ⛏️

Nuestra carrera cuenta con representación activa ante el Comité Asesor y la Facultad de Minas:

👤 **${SOFIA_CFG.repreNombre}**
- **Cargo:** Representante Estudiantil de Ingeniería de Minas y Metalurgia.
- **WhatsApp de contacto:** [Chat con José Avelino](${SOFIA_CFG.repreWhatsApp}) \`${SOFIA_CFG.repreTelefono}\`
- **Instagram personal:** [Instagram @jperomero](${SOFIA_CFG.repreInstagramPersonal})
- **Instagram oficial de la carrera:** [${SOFIA_CFG.usuarioInstagramOficial}](${SOFIA_CFG.repreInstagramOficial})
- **Comunidad oficial en WhatsApp:**
  - [Grupo Oficial de WhatsApp](${SOFIA_CFG.grupoOficialWhatsApp})
  - [Canal Oficial de WhatsApp](${SOFIA_CFG.canalWhatsApp})

Escríbele para dudas sobre materias, acompañamiento en trámites curriculares o iniciativas del programa.`,
        chips: ['Grupo Oficial de WhatsApp', 'Banco de Recursos en Drive', 'Portal Solicitudes SGS'],
      };
    }

    // ------------------------------------------------------------------------
    // 4. ¿Qué es la Malla Curricular? / Malla en general
    // ------------------------------------------------------------------------
    if (/que es la malla|malla curricular|explicar la malla|como funciona la malla|ver la malla|entender la malla/.test(preguntaNorm)) {
      return {
        texto: `La **Malla Curricular de Ingeniería de Minas y Metalurgia** (Plan Acuerdo 036 de 2014 del Consejo Académico, Código SIA **3532**, SNIES **118**) es la hoja de ruta formativa de **10 semestres** y **180 créditos**:

- **Semáforo interactivo:** Al hacer clic en cualquier asignatura en la [Malla Curricular](malla.html), se iluminan en **amarillo** sus prerrequisitos y en **verde** las materias que te desbloquea a futuro.
- **Colores por componente:** Carbón oscuro (\`#212121\`) para formación disciplinar, oro fundición (\`#D49E00\`) para fundamentación y plata acero (\`#BDBDBD\`) para libre elección.
- **Sombreado de materias aprobadas:** Al cargar tu historia académica en la sección [Mi Avance](avance.html), puedes activar el interruptor *"Sombreado de materias aprobadas"* para ver tu avance reflejado en tiempo real sobre la malla.
- **Banco de materiales:** En la pestaña de Malla tienes acceso directo a la [Carpeta Oficial de Recursos en Google Drive](${SOFIA_CFG.driveRecursos}) con parciales, talleres y guías de laboratorio.`,
        chips: ['¿Qué tipo de materias hay?', 'Prerrequisitos de Perforación y Voladuras', 'Ver Banco en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 5. ¿Qué tipo de materias hay? (Componentes y Distribución)
    // ------------------------------------------------------------------------
    if (/que tipo de materias|tipos de materias|componentes|agrupaciones|tipologia|creditos del plan|cuantos creditos son|como se dividen las materias/.test(preguntaNorm)) {
      return {
        texto: `En el plan curricular de **Ingeniería de Minas y Metalurgia** existen **3 grandes componentes de formación** que totalizan **180 créditos**:

1. **Componente de Fundamentación (45 créditos):**
   - **Matemáticas, Probabilidad y Estadística (19 cr):** Cálculo Diferencial, Integral, Geometría Vectorial, Álgebra Lineal y Estadística I.
   - **Química (3 cr):** Química General.
   - **Física (4 cr):** Física Mecánica.
   - **Herramientas de Informática (3 cr):** Fundamentos de Programación (Python).
   - **Optativas de Fundamentación (16 cr):** Varias Variables, Ecuaciones Diferenciales, Métodos Numéricos, Electricidad y Magnetismo o Física Moderna.

2. **Componente de Formación Disciplinar o Profesional (99 créditos):**
   - **Geología de Minas (24 cr):** Geología Física, Mineralogía, Geología Estructural, Yacimientos Minerales, Práctica de Campo I y Geología de Minas.
   - **Geomecánica (13 cr):** Mecánica Aplicada, Geomecánica y Mecánica de Fluidos.
   - **Beneficio de Minerales y Metalurgia (15 cr):** Termodinámica General, Mineralurgia, Metalurgia Extractiva, Pirometalurgia y Flotación.
   - **Tecnología Minera (24 cr):** Perforación y Voladura de Rocas, Sostenimiento, Transporte Minero, Minería de Superficie, Minería Subterránea, Ambientes Mineros, Planeamiento Minero y Práctica de Campo II.
   - **Proyectos en Ingeniería (10 cr):** FPI, Formulación de Proyectos y Proyecto Integrado.
   - **Área Integradora (7 cr):** Introducción a la carrera, Economía de Minas, Cierre de Minas y Sostenibilidad.
   - **Trabajo de Grado (6 cr):** En el décimo semestre.

3. **Componente de Libre Elección (36 créditos = 20% del plan):**
   - Para complementar tu perfil con software minero (Datamine, Surpac), idiomas, posgrados o materias de otras ingenierías.`,
        chips: ['¿Por qué estudiar Minas?', 'Prerrequisitos de Mineralurgia', 'Ir a Mi Avance'],
      };
    }

    // ------------------------------------------------------------------------
    // 6. ¿Por qué estudiar Minas y Metalurgia? / Fortalezas únicas
    // ------------------------------------------------------------------------
    if (/por que estudiar minas|por que estudiar ingenieria de minas|fortalezas|ventajas|campos de accion|perfil del egresado|a que se dedica|por que minas/.test(preguntaNorm)) {
      return {
        texto: `**¿Por qué estudiar Ingeniería de Minas y Metalurgia en la UNAL Medellín?**

Nuestro programa en la **Facultad de Minas** es el pilar histórico y de mayor renombre en el país:

1. **Cuna de la Escuela Nacional de Minas (1887):**
   Es el programa fundacional de la ingeniería colombiana. Bajo el lema *«Trabajo y Rectitud»*, ha forjado a los líderes industriales del país y se posiciona en el **Top Global de los QS World University Rankings** en Minería e Ingeniería de Minerales.

2. **Doble Pilar Tecnológico Único:**
   Integra de forma holística la **explotación minera** (diseño subterráneo y a cielo abierto, perforación, voladuras de rocas, ventilación y geomecánica) con la **metalurgia extractiva** (procesamiento de menas, flotación, lixiviación, pirometalurgia y refinación).

3. **Minerales Críticos para la Transición Energética:**
   Sin minería no hay transición energética. Los ingenieros de minas y metalurgia extraen y refinan los metales indispensables para el mundo sostenible: **cobre, níquel, litio, hierro, oro y tierras raras** para turbinas eólicas, paneles solares y baterías eléctricas.

4. **Sostenibilidad, Seguridad y Cierre de Minas:**
   Formación de vanguardia en seguridad minera integral, gestión socioambiental, convivencia comunitaria y planes de cierre post-minería.

5. **Ecosistema de Semilleros y Capítulos:**
   Capítulos internacionales **SME** y **ARMA**, y semilleros de investigación como **ÍGNEA** y el **Semillero de Ingeniería de Rocas**.`,
        chips: ['Semilleros (ÍGNEA, SME, ARMA)', 'Ver Malla Curricular', '¿Quién es el creador de la web?'],
      };
    }

    // ------------------------------------------------------------------------
    // 7. ¿Cómo hacer cambio de carrera / Traslado de programa?
    // ------------------------------------------------------------------------
    if (/cambio de carrera|traslado|cambiarme de carrera|cambiarme de programa|traslado de programa|pasarme a|homologacion/.test(preguntaNorm)) {
      return {
        texto: `**¿Cómo solicitar Traslado de Programa Curricular (Cambio de carrera)?**

El trámite oficial de traslado se realiza ante el Consejo de la **Facultad de Minas** conforme al Estatuto Estudiantil (**Acuerdo 008 de 2008** del CSU):

1. **Requisitos Normativos Básicos:**
   - Tener la condición de estudiante activo en la UNAL.
   - Contar con un **P.A.P.A. competitivo** (cada comité de carrera evalúa el corte de cupos disponibles).
   - Tener suficiente **cupo de créditos disponibles** en el SIA para culminar el nuevo plan de estudios.
   - Haber cursado al menos el número de créditos exigido en tu programa de origen.

2. **Procedimiento de Radicación:**
   - La convocatoria se abre semestralmente conforme al Calendario Académico de la sede.
   - Se radica formalmente mediante el **SGS (Sistema de Gestión de Solicitudes)** de la Facultad de Minas:
     🔗 [Portal de Solicitudes GAE Minas](${SOFIA_CFG.tramitesMinasUrl})
   - Seleccionas la solicitud *«Traslado de programa curricular»*, adjuntas tu carta de motivación y soportes.

3. **Asesoría y Acompañamiento:**
   - Si tienes dudas sobre tu cupo de créditos o asignaturas convalidables, escribe desde tu correo institucional a **Asesoría Estudiantil de Minas**: \`${SOFIA_CFG.asesoriaMinasCorreo}\` (Campus Robledo, Bloque M4).`,
        chips: ['Portal Solicitudes SGS', 'Calendario académico', '¿Qué es el P.A.P.A.?'],
      };
    }

    // ------------------------------------------------------------------------
    // 8. Alianzas Estratégicas para el Bienestar
    // ------------------------------------------------------------------------
    if (/alianza|alianzas|convenio|convenios|sapiencia|icetex|metro|civica|beneficios de bienestar|becas/.test(preguntaNorm)) {
      return {
        texto: `**Alianzas Estratégicas y Convenios (UNAL Sede Medellín y Facultad de Minas):**

1. **Alianzas de Permanencia y Bienestar:**
   - **ICETEX:** Líneas de crédito tradicionales, condonables y subsidios de sostenimiento.
   - **Sapiencia (Alcaldía de Medellín):** Fondos de Presupuesto Participativo, Fondo EPM y Becas Medellín para matrícula y gastos académicos.
   - **Metro de Medellín (Cívica Estudiante):** Tarifa preferencial con descuento superior al 50% en Metro, Tranvía, Metrocable y Metroplús.
   - **Auxilios de Bienestar UNAL:** Apoyo alimentario, bono de transporte y residencias estudiantiles (gestión en Bloque M4 Robledo / Bloque 11A Volador).

2. **Convenios de Software Minero y Tecnológico:**
   - **Software Minero-Metalúrgico Especializado:** Acceso en salas de cómputo de la Facultad de Minas a **Datamine, Surpac, AutoCAD Civil 3D, Rocscience (Dips, Slide, RS2)** y simuladores de ventilación y procesos.
   - **GitHub Student Developer Pack:** Cuentas Pro, GitHub Copilot gratuito y créditos en la nube (AWS, Azure, DigitalOcean).
   - **Autodesk Educación:** Licencias completas gratuitas con correo institucional \`@unal.edu.co\`.
   - **JetBrains & Microsoft 365:** Herramientas completas para estudiantes.

Consulta todos los convenios en la sección [Convenios](convenios.html).`,
        chips: ['Ver sección Convenios', 'Auxilios de Bienestar', '¿Quién es el creador de la web?'],
      };
    }

    // ------------------------------------------------------------------------
    // 9. Unidad Compartida / Google Drive de Recursos
    // ------------------------------------------------------------------------
    if (/drive|unidad compartida|banco de recursos|material de estudio|parciales pasados|parciales viejos|talleres|apuntes|libros/.test(preguntaNorm)) {
      return {
        texto: `### Carpeta Oficial de Recursos · Ing. de Minas y Metalurgia 📚

Los talleres, parciales anteriores, memorias de cálculo, guías de laboratorio (mineralurgia, fundición, rocas) y libros guía están centralizados en el **Google Drive Oficial de Recursos**:

🔗 **[Abrir Carpeta de Recursos de Minas en Google Drive](${SOFIA_CFG.driveRecursos})**

💡 *Recomendación:* Inicia sesión con tu correo institucional (\`@unal.edu.co\`) para tener acceso completo e inmediato a todas las carpetas organizadas por semestre y asignatura.`,
        chips: ['Ver Malla Curricular', 'Grupo Oficial de WhatsApp', 'Prerrequisitos de materias'],
      };
    }

    // ------------------------------------------------------------------------
    // 10. Prerrequisitos de materias específicas (Evaluado con alta prioridad si hay match de materia o consulta de prereq)
    // ------------------------------------------------------------------------
    const esConsultaPrereq = /prerrequisit|prerequisit|requisito|que pide|que necesito para ver|para matricular|correquisit|abrir|correr/.test(preguntaNorm);
    const materiaEncontrada = buscarAsignaturaPorTexto(preguntaNorm);

    if (materiaEncontrada && (esConsultaPrereq || preguntaNorm.includes(normalizar(materiaEncontrada.nombre)))) {
      const preCodigos = materiaEncontrada.prerrequisitos || [];
      const correqCodigos = materiaEncontrada.correquisitos || [];

      let detallePrereq = '';
      if (preCodigos.length === 0) {
        detallePrereq = 'No tiene prerrequisitos. La puedes matricular desde tu primer semestre (según tu cupo de créditos y cita del SIA).';
      } else {
        const nombresPre = preCodigos.map((cod) => {
          const preMat = indices.materiasPorCodigo.get(cod);
          return preMat ? `• **${preMat.nombre}** (\`${cod}\`)` : `• Asignatura código \`${cod}\``;
        }).join('\n');
        detallePrereq = `**Prerrequisito(s) necesario(s):**\n${nombresPre}`;
      }

      let detalleCorreq = '';
      if (correqCodigos.length > 0) {
        const nombresCorreq = correqCodigos.map((cod) => {
          const cMat = indices.materiasPorCodigo.get(cod);
          return cMat ? `• **${cMat.nombre}** (\`${cod}\`)` : `• Asignatura código \`${cod}\``;
        }).join('\n');
        detalleCorreq = `\n\n**Correquisito(s) (simultáneos):**\n${nombresCorreq}`;
      }

      const semestreTxt = materiaEncontrada.semestre ? `Semestre sugerido: **${materiaEncontrada.semestre}°**` : 'Asignatura Optativa';
      const obligatoriaTxt = materiaEncontrada.obligatoria ? 'Obligatoria' : 'Optativa';

      const chipsPre = preCodigos
        .map((cod) => indices.materiasPorCodigo.get(cod))
        .filter(Boolean)
        .map((m) => `Prerrequisitos de ${m.nombre}`);

      return {
        texto: `### ${materiaEncontrada.nombre} (\`${materiaEncontrada.codigo}\`)

${detallePrereq}${detalleCorreq}

- **Créditos:** ${materiaEncontrada.creditos}
- **Tipología:** ${obligatoriaTxt} (${materiaEncontrada.agrupacion || 'General'})
- **Nivel:** ${semestreTxt}

Puedes consultar esta asignatura interactiva en la [Malla Curricular](malla.html).`,
        chips: chipsPre.length > 0 ? chipsPre.slice(0, 3) : ['Ver Malla Curricular', 'Banco de Recursos en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 11. Semilleros y Grupos Estudiantiles (ÍGNEA, SME, ARMA, Rocas)
    // ------------------------------------------------------------------------
    if (/semillero|semilleros|ignea|sme|arma|semillero de rocas|ingenieria de rocas|grupos estudiantiles|capitulo/.test(preguntaNorm)) {
      return {
        texto: `### Semilleros de Investigación y Capítulos Técnicos en Minas 🔬

En Ingeniería de Minas y Metalurgia la vida estudiantil y científica es muy dinámica:

1. **ÍGNEA (Semillero de Investigación Oficial):**
   - Semillero enfocado en investigación minera, procesos metalúrgicos y geociencias aplicadas.
   - 👉 **[Unirse al WhatsApp de ÍGNEA](https://chat.whatsapp.com/LWxg0Bv2r55APkfKyvRexM?s=qt&p=a&mlu=4)**

2. **SME Student Chapter UNALMED:**
   - Capítulo internacional de la *Society for Mining, Metallurgy & Exploration*.
   - 👉 **[Unirse al WhatsApp de SME](https://chat.whatsapp.com/CGHlFz4jj8CHTLNzpZTPtr)**

3. **ARMA Student Chapter UNALMED:**
   - Capítulo internacional de la *American Rock Mechanics Association*.
   - 👉 **[Unirse al WhatsApp de ARMA](https://chat.whatsapp.com/EEyCCwDYAblArkmokROcEc)**

4. **Semillero de Ingeniería de Rocas:**
   - Investigación especializada en geomecánica, macizos rocosos y voladuras.
   - 👉 **[Unirse al WhatsApp de Rocas](https://chat.whatsapp.com/C373uhYVdNV9koMYJxT5Q2?s=sw&p=i&mlu=4&ilr=4&iam=2)**`,
        chips: ['WhatsApp de ÍGNEA', 'WhatsApp de SME', 'Banco de Recursos en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 11. Grupos de WhatsApp de estudio / de materias
    // ------------------------------------------------------------------------
    if (/grupo de whatsapp|grupos de whatsapp|wpp de materias|grupo de estudio|comunidad de wpp/.test(preguntaNorm)) {
      return {
        texto: `### Grupos de WhatsApp y Redes de Estudio 💬

- Contamos con el **[Grupo Oficial de WhatsApp de Minas y Metalurgia](${SOFIA_CFG.grupoOficialWhatsApp})** y el **[Canal Oficial de WhatsApp](${SOFIA_CFG.canalWhatsApp})**.
- Si administras el grupo de WhatsApp de alguna materia de Minas y deseas que lo vinculemos en la [Malla Curricular](malla.html), escribe al representante o contacta al creador del portal para sumarlo directamente a la ficha del curso.`,
        chips: ['Grupo Oficial de WhatsApp', 'Canal Oficial de WhatsApp', 'Banco en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 12. Materias de último semestre / Décimo semestre en Minas
    // ------------------------------------------------------------------------
    if (/ultimo semestre|ultimos semestres|decimo semestre|semestre 10|10 semestre|materias para graduarme|terminar la carrera/.test(preguntaNorm)) {
      return {
        texto: `En el **10° y último semestre** de Ingeniería de Minas y Metalurgia el plan está diseñado para culminar tu formación:

1. **Trabajo de Grado (\`3007480\` - 6 créditos):**
   Modalidades oficiales en la Facultad de Minas:
   - **Práctica de Extensión (\`3010681\`):** Pasantía empresarial en empresas mineras (Drummond, Cerrejón, Cerro Matoso, Mineros S.A., Continental Gold) o plantas metalúrgicas.
   - **Proyecto de Investigación:** En laboratorios de beneficio, geomecánica o en semilleros como ÍGNEA o Rocas.
   - **Asignaturas de Posgrado (\`3007481\`):** Cursar materias de maestría en la Facultad de Minas.

2. **Créditos Disciplinares y Optativas Restantes:**
   Completar materias como Planeamiento Minero, Práctica de Campo II o Cierre de Minas.

3. **Créditos de Libre Elección:**
   Tener aprobados los **36 créditos** exigidos.

4. **Requisitos de Grado:**
   - Cumplir la suficiencia en idioma extranjero (Inglés B1/B2 según tu cohorte).
   - Tener aprobados los **180 créditos** del plan.

Consulta tu progreso en [Mi Avance](avance.html).`,
        chips: ['Prerrequisitos de Trabajo de Grado', 'Ir a Mi Avance', 'Ver Malla Curricular'],
      };
    }

    // ------------------------------------------------------------------------
    // 14. Materias por semestre (Semestre 1 al 10)
    // ------------------------------------------------------------------------
    const matchSem = preguntaNorm.match(/semestre\s*([1-9]|10)\b|primer semestre|segundo semestre|tercer semestre|cuarto semestre|quinto semestre|sexto semestre|septimo semestre|octavo semestre|noveno semestre|decimo semestre/);
    if (matchSem) {
      let numSem = 0;
      if (matchSem[1]) {
        numSem = parseInt(matchSem[1], 10);
      } else {
        const ord = matchSem[0];
        if (ord.includes('primer')) numSem = 1;
        else if (ord.includes('segund')) numSem = 2;
        else if (ord.includes('tercer')) numSem = 3;
        else if (ord.includes('cuart')) numSem = 4;
        else if (ord.includes('quint')) numSem = 5;
        else if (ord.includes('sext')) numSem = 6;
        else if (ord.includes('septim')) numSem = 7;
        else if (ord.includes('octav')) numSem = 8;
        else if (ord.includes('noven')) numSem = 9;
        else if (ord.includes('decim')) numSem = 10;
      }

      if (numSem >= 1 && numSem <= 10) {
        const materiasSem = indices.materiasPorSemestre.get(numSem) || [];
        if (materiasSem.length > 0) {
          const listaTxt = materiasSem
            .map((asig) => {
              const preCount = asig.prerrequisitos?.length || 0;
              const preTxt = preCount === 0 ? '_Sin prereq_' : `_${preCount} prerrequisito(s)_`;
              return `• **${asig.nombre}** (\`${asig.codigo}\`, ${asig.creditos} cr) — ${preTxt}`;
            })
            .join('\n');

          const creditosTotal = materiasSem.reduce((acc, m) => acc + (m.creditos || 0), 0);

          return {
            texto: `### Asignaturas sugeridas para Semestre ${numSem}° (${creditosTotal} créditos en la ruta)

${listaTxt}

Puedes explorar sus relaciones en la [Malla Curricular](malla.html).`,
            chips: materiasSem.slice(0, 3).map((m) => `Prerrequisitos de ${m.nombre}`),
          };
        }
      }
    }

    // ------------------------------------------------------------------------
    // 15. Cancelación de materias o cancelación de semestre
    // ------------------------------------------------------------------------
    if (/cancelar|cancelacion|cancelaciones|extemporanea|retirar materia|plazo cancelar|hasta cuando cancelar/.test(preguntaNorm)) {
      return {
        texto: `**Plazos y Condiciones para Cancelar Asignaturas en la Facultad de Minas (Pregrado):**

1. **Semana 3 (Cancelación sin pérdida de créditos):**
   - Es el periodo en el SIA donde puedes retirar asignaturas y los créditos regresan completos a tu bolsa disponible para futuros semestres.

2. **Semana 8 (Cancelación ordinaria con pérdida de créditos):**
   - Puedes cancelar la materia en el SIA hasta esta semana. No afectará tu promedio, pero esos créditos no se devuelven a tu bolsa.

3. **Cancelación Extemporánea (Por fuerza mayor o enfermedad):**
   - Si superaste la semana 8 y sufriste una calamidad médica, psicológica o laboral comprobable, radicas la solicitud ante el **SGS de la Facultad de Minas**:
     🔗 [Portal Solicitudes SGS Minas](${SOFIA_CFG.tramitesMinasUrl})
   - Adjuntas los certificados médicos avalados por Bienestar Universitario (Bloque M4 / Robledo).`,
        chips: ['Portal Solicitudes SGS', 'Calendario académico', 'Asesoría Estudiantil'],
      };
    }

    // ------------------------------------------------------------------------
    // 16. Consultas del Calendario Académico
    // ------------------------------------------------------------------------
    if (/calendario|fechas|cuando empiezan clases|cuando terminan|semana de induccion|recesos|evaluacion docente/.test(preguntaNorm)) {
      if (indices.calendarioFilas.length > 0) {
        const palabrasClave = preguntaNorm.split(' ').filter((p) => p.length > 3);
        const coincidencias = indices.calendarioFilas.filter((f) =>
          palabrasClave.some((p) => f.eventoNorm.includes(p))
        );

        if (coincidencias.length > 0) {
          const listado = coincidencias
            .slice(0, 5)
            .map((c) => `• **${c.evento}:** ${c.fecha} _(${c.grupo})_`)
            .join('\n');

          return {
            texto: `**Fechas encontradas en el Calendario Académico Oficial:**\n\n${listado}\n\nPuedes revisar todas las fechas en la guía de [Información General](info.html).`,
            chips: ['Cancelar materias', 'Citas del SIA', 'Bolsa de créditos'],
          };
        }
      }

      return {
        texto: `El **Calendario Académico Oficial (2026-2S)** de la UNAL Sede Medellín establece los hitos clave para matrícula, inicio de clases, cancelaciones y cierre de actas.

Consulta la tabla completa de fechas discriminada por semanas en la sección de [Información General](info.html).`,
        chips: ['Plazos para cancelar materias', 'Citas del SIA', 'Bolsa de créditos'],
      };
    }

    // ------------------------------------------------------------------------
    // 17. P.A.P.A., Citas SIA y Bolsa de Créditos
    // ------------------------------------------------------------------------
    if (/papa|promedio|citas sia|dninfoa|bolsa de creditos|cupo de creditos|creditos adicionales|como calcular el papa/.test(preguntaNorm)) {
      return {
        texto: `**Conceptos Clave del Sistema Académico SIA:**

- **P.A.P.A. (Promedio Aritmético Ponderado Acumulado):**
  Se calcula multiplicando la calificación final de cada materia cursada (aprobada o reprobada) por sus créditos, sumando los productos y dividiéndolos entre el total de créditos cursados.
  Determina tu grupo de citación para matrícula, adjudicación de becas y traslados de programa.

- **Citas DNINFOA:**
  Se asignan en 4 grupos de prelación basados en tu P.A.P.A. del periodo anterior y avance de carrera:
  - *Grupo 1:* Estudiantes con mejores promedios y deportistas representativos.
  - *Grupos 2, 3 y 4:* Orden sucesivo de cita para inscripción de asignaturas.

- **Bolsa de Créditos:**
  Recibes un cupo inicial para tu plan (180 créditos en Minas). Si mantienes un P.A.P.A. sobresaliente, puedes solicitar créditos adicionales a la Vicedecanatura Académica de Minas vía SGS.

Calcula tu proyección en [Mi Avance](avance.html) o lee la guía completa en [Información General](info.html).`,
        chips: ['Ir a Mi Avance', '¿Cómo hacer cambio de carrera?', 'Ver Malla Curricular'],
      };
    }

    // ------------------------------------------------------------------------
    // 18. Horas de Corresponsabilidad
    // ------------------------------------------------------------------------
    if (/corresponsabilidad|horas de corresponsabilidad|servicio social|beneficiarios bienestar/.test(preguntaNorm)) {
      return {
        texto: `**Horas de Corresponsabilidad en la UNAL:**

Si eres beneficiario de apoyos socioeconómicos de Bienestar Universitario (Gestión Alimentaria, Residencias o Bonos de Transporte):
- Debes cumplir entre **20 y 40 horas** por semestre de actividades solidarias en dependencias de la universidad.
- En la Facultad de Minas puedes cumplirlas apoyando salas de cómputo, laboratorios de mineralurgia, geomecánica, biblioteca de Robledo o eventos académicos.
- El registro y legalización se realiza en el sistema de Bienestar Universitario.`,
        chips: ['Auxilios de Bienestar', 'Información General', 'Contacto Asesoría Minas'],
      };
    }

    // ------------------------------------------------------------------------
    // 19. Bus Intercampus (Robledo <-> Volador <-> Río)
    // ------------------------------------------------------------------------
    if (/bus intercampus|intercampus|ruta de bus|transporte entre campus|como ir a robledo|como ir al volador/.test(preguntaNorm)) {
      return {
        texto: `**Servicio de Bus Intercampus UNAL Sede Medellín:**

Conecta de forma gratuita a la comunidad universitaria entre los campus de la sede:
- **Ruta Robledo ↔ Volador:** Vital para estudiantes de la Facultad de Minas que tienen asignaturas de fundamentación o bienestar en El Volador.
- **Ruta Volador ↔ Campus del Río:** Conexión con laboratorios y posgrados.
- **Horarios:** Salidas continuas de lunes a viernes entre las **06:00 a.m. y las 08:30 p.m.** (cada 20 a 30 minutos según el tráfico).
- **Requisito:** Presentar carné institucional físico o digital en la aplicación móvil UNAL.

Consulta el mapa y paraderos en la pestaña de [Intercampus](intercampus.html).`,
        chips: ['Ver sección Intercampus', 'Convenio Metro Cívica', 'Información General'],
      };
    }

    // ------------------------------------------------------------------------
    // 20. Búsqueda en FAQs del portal
    // ------------------------------------------------------------------------
    if (datos.info?.faq && Array.isArray(datos.info.faq)) {
      const matchFaq = datos.info.faq.find((item) => {
        const pregNorm = normalizar(item.pregunta);
        const palabras = preguntaNorm.split(' ').filter((w) => w.length > 3);
        return palabras.filter((w) => pregNorm.includes(w)).length >= 2;
      });

      if (matchFaq) {
        return {
          texto: `**${matchFaq.pregunta}**\n\n${matchFaq.respuesta}`,
          chips: ['¿Qué es la malla curricular?', 'Banco de Recursos en Drive', 'Contacto del Representante'],
        };
      }
    }

    // ------------------------------------------------------------------------
    // 21. Fallback / Respuesta por defecto inteligente
    // ------------------------------------------------------------------------
    return {
      texto: `No encontré una coincidencia exacta para tu consulta, pero estoy lista para orientarte en cualquiera de estos temas oficiales de **Ingeniería de Minas y Metalurgia**:

- **Malla y Prerrequisitos:** Pregúntame por materias como *Perforación y Voladura de Rocas*, *Mineralurgia*, *Metalurgia Extractiva*, *Minería Subterránea*, *Sostenimiento*, etc.
- **Tipos de materias:** Cómo se distribuyen los 180 créditos del plan.
- **¿Por qué estudiar Minas y Metalurgia?** y fortalezas en la transición energética y minería sostenible.
- **¿Quién es el creador de la web?**
- **Contacto del Representante:** José Avelino Pérez Romero.
- **Semilleros:** ÍGNEA, SME, ARMA y Semillero de Rocas.
- **¿Cómo hacer cambio de carrera / traslados?** ante la Facultad de Minas.
- **Banco de Recursos en Drive:** Parciales y talleres organizados por semestre.`,
      chips: [
        '¿Qué es la malla curricular?',
        '¿Qué tipo de materias hay?',
        '¿Por qué estudiar Minas?',
        '¿Quién es el creador de la web?',
        'Contacto del Representante',
        'Semilleros (ÍGNEA, SME, ARMA)',
      ],
    };
  }

  // Búsqueda inteligente de asignaturas por texto y alias
  function buscarAsignaturaPorTexto(textoNorm) {
    // 1. Por código numérico directo
    const matchCod = textoNorm.match(/\b(\d{7}|10000\d{2}-m)\b/i);
    if (matchCod) {
      const codigo = matchCod[1].toUpperCase();
      if (indices.materiasPorCodigo.has(codigo)) {
        return indices.materiasPorCodigo.get(codigo);
      }
    }

    // 2. Por nombre oficial de la asignatura (priorizando nombres más largos)
    const nombresOrdenados = Array.from(indices.materiasPorNombre.entries()).sort(
      (a, b) => b[0].length - a[0].length
    );
    for (const [nomNorm, asig] of nombresOrdenados) {
      if (textoNorm.includes(nomNorm)) {
        return asig;
      }
    }

    // 3. Por alias ordenados de mayor a menor longitud
    const aliasOrdenados = Array.from(indices.aliasMaterias.entries()).sort(
      (a, b) => b[0].length - a[0].length
    );

    for (const [alias, asig] of aliasOrdenados) {
      if (alias.length <= 4) {
        const regexAlias = new RegExp(`\\b${alias.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
        if (regexAlias.test(textoNorm)) {
          return asig;
        }
      } else if (textoNorm.includes(alias)) {
        return asig;
      }
    }

    return null;
  }

  // ==========================================================================
  // 4. GENERACIÓN DEL DOM Y ELEMENTOS DE INTERFAZ
  // ==========================================================================

  function crearElementosDOM() {
    if (document.getElementById('sofia-contenedor-global')) return;

    const contenedorGlobal = document.createElement('div');
    contenedorGlobal.id = 'sofia-contenedor-global';
    contenedorGlobal.className = 'sofia-flotante-wrap';

    // 1. Globo de bienvenida (tooltip)
    const globo = document.createElement('div');
    globo.className = 'sofia-globo-bienvenida';
    globo.id = 'sofia-globo';
    globo.setAttribute('role', 'status');
    globo.innerHTML = `
      <span class="sofia-globo-texto">👋 ¿Dudas con materias o trámites? <strong>Pregúntale a sofIA</strong></span>
      <button class="sofia-globo-cerrar" id="sofia-globo-cerrar" type="button" aria-label="Cerrar aviso">✕</button>
    `;

    // 2. Botón flotante circular
    const boton = document.createElement('button');
    boton.className = 'sofia-boton';
    boton.id = 'sofia-btn-toggle';
    boton.type = 'button';
    boton.setAttribute('aria-label', 'Abrir asistente virtual sofIA de Minas y Metalurgia');
    boton.setAttribute('aria-expanded', 'false');
    boton.innerHTML = `
      <span class="sofia-boton__halo" aria-hidden="true"></span>
      ${SOFIA_SVG_AVATAR}
      <span class="sofia-boton__badge" title="sofIA en línea"></span>
    `;

    // 3. Ventana modal de conversación
    const ventana = document.createElement('section');
    ventana.className = 'sofia-ventana';
    ventana.id = 'sofia-ventana';
    ventana.setAttribute('aria-label', 'Chat con asistente virtual sofIA');
    ventana.hidden = true;

    ventana.innerHTML = `
      <header class="sofia-cabecera">
        <div class="sofia-cabecera__identidad">
          <div class="sofia-cabecera__avatar-wrap" aria-hidden="true">
            ${SOFIA_SVG_AVATAR}
          </div>
          <div class="sofia-cabecera__datos">
            <div class="sofia-cabecera__nombre-wrap">
              <h2 class="sofia-cabecera__nombre">sofIA</h2>
              <span class="sofia-cabecera__tag">UNAL</span>
            </div>
            <span class="sofia-cabecera__estado">
              <span class="sofia-cabecera__punto-estado" aria-hidden="true"></span>
              En línea · Asistente de Minas
            </span>
          </div>
        </div>
        <div class="sofia-cabecera__acciones">
          <button class="sofia-btn-icono" id="sofia-btn-limpiar" type="button" title="Reiniciar conversación" aria-label="Reiniciar conversación">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
          <button class="sofia-btn-icono" id="sofia-btn-cerrar" type="button" title="Cerrar chat" aria-label="Cerrar chat">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <div class="sofia-mensajes" id="sofia-mensajes" role="log" aria-live="polite">
        <!-- Los mensajes se inyectan dinámicamente aquí -->
      </div>

      <form class="sofia-formulario" id="sofia-form" autocomplete="off">
        <input
          type="text"
          class="sofia-input"
          id="sofia-input"
          placeholder="Pregúntale a sofIA sobre la malla, materias, alianzas..."
          aria-label="Escribe tu consulta para sofIA"
          maxlength="240"
        />
        <button class="sofia-btn-enviar" id="sofia-btn-enviar" type="submit" aria-label="Enviar mensaje a sofIA">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>

      <div class="sofia-pie-aviso">
        sofIA consulta la base oficial del portal de Ingeniería de Minas y Metalurgia UNAL.
      </div>
    `;

    contenedorGlobal.appendChild(globo);
    contenedorGlobal.appendChild(ventana);
    contenedorGlobal.appendChild(boton);
    document.body.appendChild(contenedorGlobal);

    vincularEventos();
    agregarMensajeInicial();
  }

  // ==========================================================================
  // 5. MANIPULACIÓN DEL DOM Y RENDER DE MENSAJES
  // ==========================================================================

  function agregarMensajeInicial() {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor || contenedor.children.length > 0) return;

    const textoBienvenida = `¡Hola! Soy **${SOFIA_CFG.nombre}**, tu asistente holográfica de **${SOFIA_CFG.programa}** de la **${SOFIA_CFG.facultad}** (UNAL Medellín).

Estoy conectada a toda la información oficial: malla curricular, tipos de materias, prerrequisitos, semilleros (ÍGNEA, SME, ARMA, Rocas), alianzas de bienestar, cambio de carrera, creador de la plataforma, fechas del calendario y la Carpeta de Recursos en Drive. ¿En qué te puedo colaborar hoy?`;

    const chipsIniciales = [
      '¿Qué es la malla curricular?',
      '¿Qué tipo de materias hay?',
      '¿Por qué estudiar Minas?',
      '¿Quién es el creador de la web?',
      'Contacto del Representante',
      'Semilleros (ÍGNEA, SME, ARMA)',
      '¿Cómo hacer cambio de carrera?',
      'Ver Banco en Drive',
    ];

    agregarMensajeAlDOM('bot', textoBienvenida, chipsIniciales);
    contenedor.scrollTop = 0;
  }

  function agregarMensajeAlDOM(remitente, textoMarkdown, chips = []) {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor) return;

    const fila = document.createElement('div');
    fila.className = `sofia-mensaje-fila sofia-mensaje-fila--${remitente}`;

    if (remitente === 'bot') {
      const avatarWrap = document.createElement('div');
      avatarWrap.className = 'sofia-mensaje-avatar';
      avatarWrap.setAttribute('aria-hidden', 'true');
      avatarWrap.innerHTML = SOFIA_SVG_AVATAR;
      fila.appendChild(avatarWrap);
    }

    const burbuja = document.createElement('div');
    burbuja.className = 'sofia-burbuja';
    burbuja.innerHTML = formatearMarkdown(textoMarkdown);

    if (chips && chips.length > 0) {
      const contenedorChips = document.createElement('div');
      contenedorChips.className = 'sofia-chips-contenedor';
      chips.forEach((chipTexto) => {
        const chipBtn = document.createElement('button');
        chipBtn.className = 'sofia-chip';
        chipBtn.type = 'button';
        chipBtn.textContent = chipTexto;
        chipBtn.addEventListener('click', () => {
          procesarConsultaUsuario(chipTexto);
        });
        contenedorChips.appendChild(chipBtn);
      });
      burbuja.appendChild(contenedorChips);
    }

    fila.appendChild(burbuja);
    contenedor.appendChild(fila);
    contenedor.scrollTop = contenedor.scrollHeight;
  }

  function mostrarIndicadorEscribiendo() {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor) return;

    const fila = document.createElement('div');
    fila.className = 'sofia-mensaje-fila sofia-mensaje-fila--bot';
    fila.id = 'sofia-escribiendo-indicador';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'sofia-mensaje-avatar';
    avatarWrap.setAttribute('aria-hidden', 'true');
    avatarWrap.innerHTML = SOFIA_SVG_AVATAR;

    const burbuja = document.createElement('div');
    burbuja.className = 'sofia-burbuja sofia-escribiendo';
    burbuja.innerHTML = `
      <span class="sofia-escribiendo-punto"></span>
      <span class="sofia-escribiendo-punto"></span>
      <span class="sofia-escribiendo-punto"></span>
    `;

    fila.appendChild(avatarWrap);
    fila.appendChild(burbuja);
    contenedor.appendChild(fila);
    contenedor.scrollTop = contenedor.scrollHeight;
  }

  function removerIndicadorEscribiendo() {
    const el = document.getElementById('sofia-escribiendo-indicador');
    if (el) el.remove();
  }

  // Parseador ligero de Markdown seguro a HTML
  function formatearMarkdown(md) {
    if (!md) return '';
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Encabezados h3
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

    // Negritas e itálicas
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Código en línea
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Enlaces markdown [texto](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Listas con viñetas • o -
    html = html.replace(/^[•\-] (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Saltos de línea a párrafos
    const parrafos = html.split(/\n\n+/);
    return parrafos
      .map((p) => {
        p = p.trim();
        if (p.startsWith('<h3>') || p.startsWith('<ul>') || p.startsWith('<li>')) return p;
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
  }

  // ==========================================================================
  // 6. EVENTOS Y CONTROLADORES DE INTERFAZ
  // ==========================================================================

  function abrirSofia() {
    const ventana = document.getElementById('sofia-ventana');
    const btn = document.getElementById('sofia-btn-toggle');
    const globo = document.getElementById('sofia-globo');
    if (!ventana || !btn) return;

    ventana.hidden = false;
    void ventana.offsetWidth;
    ventana.classList.add('is-abierta');
    btn.setAttribute('aria-expanded', 'true');
    estadoSofia.abierto = true;

    if (globo) {
      globo.style.display = 'none';
      sessionStorage.setItem('minas.sofia.globo_oculto', '1');
    }

    setTimeout(() => {
      document.getElementById('sofia-input')?.focus();
      const contenedor = document.getElementById('sofia-mensajes');
      if (contenedor && contenedor.children.length > 1) {
        contenedor.scrollTop = contenedor.scrollHeight;
      }
    }, 200);
  }

  function cerrarSofia() {
    const ventana = document.getElementById('sofia-ventana');
    const btn = document.getElementById('sofia-btn-toggle');
    if (!ventana || !btn) return;

    ventana.classList.remove('is-abierta');
    btn.setAttribute('aria-expanded', 'false');
    estadoSofia.abierto = false;

    setTimeout(() => {
      if (!estadoSofia.abierto) {
        ventana.hidden = true;
      }
    }, 280);
  }

  function procesarConsultaUsuario(texto) {
    const consultaLimpia = (texto || '').trim();
    if (!consultaLimpia) return;

    agregarMensajeAlDOM('usuario', consultaLimpia);

    const input = document.getElementById('sofia-input');
    if (input) input.value = '';

    mostrarIndicadorEscribiendo();

    setTimeout(() => {
      removerIndicadorEscribiendo();
      const respuesta = responderPregunta(consultaLimpia);
      agregarMensajeAlDOM('bot', respuesta.texto, respuesta.chips);
    }, 320);
  }

  function vincularEventos() {
    const btnToggle = document.getElementById('sofia-btn-toggle');
    const btnCerrar = document.getElementById('sofia-btn-cerrar');
    const btnLimpiar = document.getElementById('sofia-btn-limpiar');
    const globoCerrar = document.getElementById('sofia-globo-cerrar');
    const globo = document.getElementById('sofia-globo');
    const formulario = document.getElementById('sofia-form');
    const contenedorMensajes = document.getElementById('sofia-mensajes');

    btnToggle?.addEventListener('click', () => {
      if (estadoSofia.abierto) {
        cerrarSofia();
      } else {
        abrirSofia();
      }
    });

    btnCerrar?.addEventListener('click', cerrarSofia);

    globo?.addEventListener('click', (e) => {
      if (e.target.id === 'sofia-globo-cerrar') return;
      abrirSofia();
    });

    globoCerrar?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (globo) globo.style.display = 'none';
      sessionStorage.setItem('minas.sofia.globo_oculto', '1');
    });

    btnLimpiar?.addEventListener('click', () => {
      if (contenedorMensajes) {
        contenedorMensajes.innerHTML = '';
        agregarMensajeInicial();
      }
    });

    formulario?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('sofia-input');
      if (input && input.value) {
        procesarConsultaUsuario(input.value);
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && estadoSofia.abierto) {
        cerrarSofia();
      }
    });

    if (sessionStorage.getItem('minas.sofia.globo_oculto') === '1' && globo) {
      globo.style.display = 'none';
    }
  }

  // ==========================================================================
  // 7. INICIALIZACIÓN Y API PÚBLICA (WINDOW.SOFIA)
  // ==========================================================================

  function moduloSofia() {
    cargarDatos();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', crearElementosDOM);
    } else {
      crearElementosDOM();
    }
  }

  moduloSofia();

  // Exposición controlada en window para integración con otros módulos
  window.sofIA = {
    abrir: abrirSofia,
    cerrar: cerrarSofia,
    preguntar: procesarConsultaUsuario,
    responder: responderPregunta,
    inicializar: cargarDatos,
  };
})();
