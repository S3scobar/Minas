const fs = require('fs');
const path = require('path');

// 1. Componentes y Agrupaciones
const componentesData = {
  componentes: [
    {
      id: "fundamentacion",
      nombre: "Fundamentación",
      color: "#D49E00", // Tono dorado ámbar intenso para fundamentación
      descripcion: "Ciencias básicas: matemáticas, física, química y programación que constituyen el cimiento analítico y conceptual para la ingeniería."
    },
    {
      id: "disciplinar",
      nombre: "Formación disciplinar o profesional",
      color: "#212121", // Negro grafito / carbón industrial para el núcleo disciplinar
      descripcion: "Geología de minas, geomecánica, tecnología de explotación subterránea y a cielo abierto, mineralurgia, metalurgia extractiva y proyectos."
    },
    {
      id: "libre-eleccion",
      nombre: "Libre elección",
      color: "#BDBDBD", // Plata / Acero metalúrgico para libre elección
      descripcion: "Créditos de libre elección (20% del plan = 36 créditos) para complementar con profundizaciones técnicas, humanísticas, idiomas o posgrados."
    }
  ],
  agrupaciones: [
    {
      id: "matematicas-probabilidad-estadistica",
      componente: "fundamentacion",
      nombre: "Matemáticas, Probabilidad y Estadística",
      exigidos: 19,
      obligatorios: 19,
      optativos: 0
    },
    {
      id: "quimica",
      componente: "fundamentacion",
      nombre: "Química",
      exigidos: 3,
      obligatorios: 3,
      optativos: 0
    },
    {
      id: "fisica",
      componente: "fundamentacion",
      nombre: "Física",
      exigidos: 4,
      obligatorios: 4,
      optativos: 0
    },
    {
      id: "herramientas-informatica",
      componente: "fundamentacion",
      nombre: "Herramientas de Informática",
      exigidos: 3,
      obligatorios: 3,
      optativos: 0
    },
    {
      id: "optativas-fundamentacion",
      componente: "fundamentacion",
      nombre: "Optativas de Fundamentación",
      exigidos: 16,
      obligatorios: 0,
      optativos: 16
    },
    {
      id: "geologia-minas",
      componente: "disciplinar",
      nombre: "Geología de Minas",
      exigidos: 24,
      obligatorios: 21,
      optativos: 3
    },
    {
      id: "geomecanica",
      componente: "disciplinar",
      nombre: "Geomecánica",
      exigidos: 13,
      obligatorios: 10,
      optativos: 3
    },
    {
      id: "beneficio-minerales-metalurgia",
      componente: "disciplinar",
      nombre: "Beneficio de Minerales y Metalurgia",
      exigidos: 15,
      obligatorios: 9,
      optativos: 6
    },
    {
      id: "tecnologia-minera",
      componente: "disciplinar",
      nombre: "Tecnología Minera",
      exigidos: 24,
      obligatorios: 21,
      optativos: 3
    },
    {
      id: "proyectos-ingenieria",
      componente: "disciplinar",
      nombre: "Proyectos en Ingeniería",
      exigidos: 10,
      obligatorios: 10,
      optativos: 0
    },
    {
      id: "area-integradora",
      componente: "disciplinar",
      nombre: "Área Integradora",
      exigidos: 7,
      obligatorios: 1,
      optativos: 6
    },
    {
      id: "trabajo-de-grado",
      componente: "disciplinar",
      nombre: "Trabajo de Grado",
      exigidos: 6,
      obligatorios: 6,
      optativos: 0
    },
    {
      id: "libre-eleccion",
      componente: "libre-eleccion",
      nombre: "Libre Elección",
      exigidos: 36,
      obligatorios: 0,
      optativos: 36
    }
  ]
};

// 2. Plan por Semestres
const planData = [
  {
    semestre: 1,
    creditos: 19,
    items: [
      { tipo: "asignatura", codigo: "1000004-M" },
      { tipo: "asignatura", codigo: "1000008-M" },
      { tipo: "asignatura", codigo: "3006829" },
      { tipo: "asignatura", codigo: "3007000" },
      { tipo: "asignatura", codigo: "3007476" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  },
  {
    semestre: 2,
    creditos: 19,
    items: [
      { tipo: "asignatura", codigo: "1000005-M" },
      { tipo: "asignatura", codigo: "1000003-M" },
      { tipo: "asignatura", codigo: "1000019-M" },
      { tipo: "asignatura", codigo: "3007714" },
      { tipo: "asignatura", codigo: "3007401" }
    ]
  },
  {
    semestre: 3,
    creditos: 17,
    items: [
      { tipo: "asignatura", codigo: "3010651" },
      { tipo: "bolsa", agrupacion: "optativas-fundamentacion", creditos: 4, nombre: "Optativa de Fundamentación*" },
      { tipo: "bolsa", agrupacion: "optativas-fundamentacion", creditos: 4, nombre: "Optativa de Fundamentación*" },
      { tipo: "asignatura", codigo: "3007767" },
      { tipo: "asignatura", codigo: "3007455" }
    ]
  },
  {
    semestre: 4,
    creditos: 19,
    items: [
      { tipo: "bolsa", agrupacion: "optativas-fundamentacion", creditos: 4, nombre: "Optativa de Fundamentación*" },
      { tipo: "asignatura", codigo: "3010435" },
      { tipo: "asignatura", codigo: "3007456" },
      { tipo: "asignatura", codigo: "3010431" },
      { tipo: "asignatura", codigo: "3010408" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  },
  {
    semestre: 5,
    creditos: 17,
    items: [
      { tipo: "bolsa", agrupacion: "optativas-fundamentacion", creditos: 4, nombre: "Optativa de Fundamentación*" },
      { tipo: "asignatura", codigo: "3010478" },
      { tipo: "asignatura", codigo: "3007716" },
      { tipo: "asignatura", codigo: "3007722" },
      { tipo: "bolsa", agrupacion: "tecnologia-minera", creditos: 3, nombre: "Optativa Disciplinar*" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  },
  {
    semestre: 6,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3007720" },
      { tipo: "asignatura", codigo: "3009302" },
      { tipo: "asignatura", codigo: "3010428" },
      { tipo: "asignatura", codigo: "3006960" },
      { tipo: "bolsa", agrupacion: "geomecanica", creditos: 3, nombre: "Optativa Disciplinar*" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  },
  {
    semestre: 7,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3007713" },
      { tipo: "asignatura", codigo: "3010690" },
      { tipo: "asignatura", codigo: "3007712" },
      { tipo: "asignatura", codigo: "3010407" },
      { tipo: "bolsa", agrupacion: "beneficio-minerales-metalurgia", creditos: 3, nombre: "Optativa Disciplinar*" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  },
  {
    semestre: 8,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3007700" },
      { tipo: "asignatura", codigo: "3009301" },
      { tipo: "bolsa", agrupacion: "beneficio-minerales-metalurgia", creditos: 3, nombre: "Optativa Disciplinar*" },
      { tipo: "bolsa", agrupacion: "geologia-minas", creditos: 3, nombre: "Optativa Disciplinar*" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  },
  {
    semestre: 9,
    creditos: 17,
    items: [
      { tipo: "asignatura", codigo: "3008748" },
      { tipo: "asignatura", codigo: "3007717" },
      { tipo: "asignatura", codigo: "3010439" },
      { tipo: "bolsa", agrupacion: "area-integradora", creditos: 3, nombre: "Optativa Disciplinar*" },
      { tipo: "bolsa", agrupacion: "area-integradora", creditos: 3, nombre: "Optativa Disciplinar*" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  },
  {
    semestre: 10,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3007480" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" },
      { tipo: "bolsa", agrupacion: "libre-eleccion", creditos: 3, nombre: "Libre Elección" }
    ]
  }
];

// 3. Catálogo completo de Asignaturas
const asignaturasData = [
  // --- Matemáticas, Probabilidad y Estadística ---
  {
    codigo: "1000004-M",
    nombre: "Cálculo Diferencial",
    creditos: 4,
    obligatoria: true,
    agrupacion: "matematicas-probabilidad-estadistica",
    semestre: 1,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "1000008-M",
    nombre: "Geometría Vectorial y Analítica",
    creditos: 4,
    obligatoria: true,
    agrupacion: "matematicas-probabilidad-estadistica",
    semestre: 1,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "1000005-M",
    nombre: "Cálculo Integral",
    creditos: 4,
    obligatoria: true,
    agrupacion: "matematicas-probabilidad-estadistica",
    semestre: 2,
    prerrequisitos: ["1000004-M"],
    whatsapp: ""
  },
  {
    codigo: "1000003-M",
    nombre: "Álgebra Lineal",
    creditos: 4,
    obligatoria: true,
    agrupacion: "matematicas-probabilidad-estadistica",
    semestre: 2,
    prerrequisitos: ["1000008-M"],
    whatsapp: ""
  },
  {
    codigo: "3010651",
    nombre: "Estadística I",
    creditos: 3,
    obligatoria: true,
    agrupacion: "matematicas-probabilidad-estadistica",
    semestre: 3,
    prerrequisitos: ["1000005-M"],
    whatsapp: ""
  },

  // --- Química ---
  {
    codigo: "3006829",
    nombre: "Química General",
    creditos: 3,
    obligatoria: true,
    agrupacion: "quimica",
    semestre: 1,
    prerrequisitos: [],
    whatsapp: ""
  },

  // --- Física ---
  {
    codigo: "1000019-M",
    nombre: "Física Mecánica",
    creditos: 4,
    obligatoria: true,
    agrupacion: "fisica",
    semestre: 2,
    prerrequisitos: ["1000004-M", "1000008-M"],
    whatsapp: ""
  },

  // --- Herramientas de Informática ---
  {
    codigo: "3010435",
    nombre: "Fundamentos de Programación",
    creditos: 3,
    obligatoria: true,
    agrupacion: "herramientas-informatica",
    semestre: 4,
    prerrequisitos: ["1000003-M"],
    whatsapp: ""
  },

  // --- Optativas de Fundamentación ---
  {
    codigo: "1000006-M",
    nombre: "Cálculo en Varias Variables",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000005-M"],
    whatsapp: ""
  },
  {
    codigo: "1000007-M",
    nombre: "Ecuaciones Diferenciales",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000005-M", "1000003-M"],
    whatsapp: ""
  },
  {
    codigo: "3006905",
    nombre: "Matemáticas Especiales",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000007-M"],
    whatsapp: ""
  },
  {
    codigo: "3006907",
    nombre: "Métodos Numéricos",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000005-M", "1000003-M"],
    whatsapp: ""
  },
  {
    codigo: "3006915",
    nombre: "Estadística II",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["3010651"],
    whatsapp: ""
  },
  {
    codigo: "1000017-M",
    nombre: "Física de Electricidad y Magnetismo",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000019-M", "1000005-M"],
    whatsapp: ""
  },
  {
    codigo: "1000020-M",
    nombre: "Física de Oscilaciones, Ondas y Óptica",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000019-M", "1000007-M"],
    whatsapp: ""
  },
  {
    codigo: "1000018-M",
    nombre: "Física Moderna",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000020-M"],
    whatsapp: ""
  },
  {
    codigo: "3006852",
    nombre: "Laboratorio de Física Moderna",
    creditos: 1,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000018-M"],
    whatsapp: ""
  },
  {
    codigo: "3007309",
    nombre: "Ciencias de los Materiales",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["3006829"],
    whatsapp: ""
  },
  {
    codigo: "3007324",
    nombre: "Investigación de Operaciones",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-fundamentacion",
    semestre: null,
    prerrequisitos: ["1000003-M"],
    whatsapp: ""
  },

  // --- Geología de Minas ---
  {
    codigo: "3007000",
    nombre: "Geología Física",
    creditos: 4,
    obligatoria: true,
    agrupacion: "geologia-minas",
    semestre: 1,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3007401",
    nombre: "Topografía",
    creditos: 3,
    obligatoria: true,
    agrupacion: "geologia-minas",
    semestre: 2,
    prerrequisitos: ["3007476"],
    whatsapp: ""
  },
  {
    codigo: "3007767",
    nombre: "Elementos de Geología Estructural",
    creditos: 3,
    obligatoria: true,
    agrupacion: "geologia-minas",
    semestre: 3,
    prerrequisitos: ["3007000", "3007401"],
    whatsapp: ""
  },
  {
    codigo: "3007714",
    nombre: "Mineralogía",
    creditos: 4,
    obligatoria: true,
    agrupacion: "geologia-minas",
    semestre: 2,
    prerrequisitos: ["3007000"],
    whatsapp: ""
  },
  {
    codigo: "3010431",
    nombre: "Yacimientos Minerales",
    creditos: 3,
    obligatoria: true,
    agrupacion: "geologia-minas",
    semestre: 4,
    prerrequisitos: ["3007714"],
    whatsapp: ""
  },
  {
    codigo: "3009301",
    nombre: "Geología de Minas",
    creditos: 3,
    obligatoria: true,
    agrupacion: "geologia-minas",
    semestre: 8,
    prerrequisitos: ["3010431", "3010651", "3007712", "3007722"],
    whatsapp: ""
  },
  {
    codigo: "3007722",
    nombre: "Práctica de Campo I",
    creditos: 1,
    obligatoria: true,
    agrupacion: "geologia-minas",
    semestre: 5,
    prerrequisitos: ["3010431", "3007714"],
    whatsapp: ""
  },
  {
    codigo: "3007228",
    nombre: "Mineralogía Aplicada y de Procesos",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geologia-minas",
    semestre: null,
    prerrequisitos: ["3007714"],
    whatsapp: ""
  },
  {
    codigo: "3007454",
    nombre: "Prospección y Exploración de Recursos Minerales",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geologia-minas",
    semestre: null,
    prerrequisitos: ["3010431"],
    whatsapp: ""
  },
  {
    codigo: "3010257",
    nombre: "Microscopía Óptica de Minerales Opacos",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geologia-minas",
    semestre: null,
    prerrequisitos: ["3007714"],
    whatsapp: ""
  },
  {
    codigo: "3007448",
    nombre: "Recursos Energéticos",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geologia-minas",
    semestre: null,
    prerrequisitos: ["3010431"],
    whatsapp: ""
  },
  {
    codigo: "3007718",
    nombre: "Rocas y Minerales en la Industria",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geologia-minas",
    semestre: null,
    prerrequisitos: ["3010431"],
    whatsapp: ""
  },
  {
    codigo: "3010528",
    nombre: "Simulación Geoestadística de Yacimientos Minerales",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geologia-minas",
    semestre: null,
    prerrequisitos: ["3009301"],
    whatsapp: ""
  },
  {
    codigo: "3010531",
    nombre: "Tópicos Especiales en Geología de Minas",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geologia-minas",
    semestre: null,
    prerrequisitos: ["3009301"],
    whatsapp: ""
  },

  // --- Geomecánica ---
  {
    codigo: "3007455",
    nombre: "Mecánica Aplicada",
    creditos: 3,
    obligatoria: true,
    agrupacion: "geomecanica",
    semestre: 3,
    prerrequisitos: ["1000019-M"],
    whatsapp: ""
  },
  {
    codigo: "3006960",
    nombre: "Mecánica de Fluidos",
    creditos: 4,
    obligatoria: true,
    agrupacion: "geomecanica",
    semestre: 6,
    prerrequisitos: ["3007455"],
    whatsapp: ""
  },
  {
    codigo: "3007456",
    nombre: "Geomecánica",
    creditos: 3,
    obligatoria: true,
    agrupacion: "geomecanica",
    semestre: 4,
    prerrequisitos: ["3007455"],
    whatsapp: ""
  },
  {
    codigo: "3010450",
    nombre: "Mecánica Estructural",
    creditos: 4,
    obligatoria: false,
    agrupacion: "geomecanica",
    semestre: null,
    prerrequisitos: ["3007455"],
    whatsapp: ""
  },
  {
    codigo: "3010449",
    nombre: "Mecánica de Materiales",
    creditos: 4,
    obligatoria: false,
    agrupacion: "geomecanica",
    semestre: null,
    prerrequisitos: ["3007455"],
    whatsapp: ""
  },
  {
    codigo: "3010447",
    nombre: "Mecánica de Suelos",
    creditos: 4,
    obligatoria: false,
    agrupacion: "geomecanica",
    semestre: null,
    prerrequisitos: ["3007455", "3007000"],
    whatsapp: ""
  },
  {
    codigo: "3007711",
    nombre: "Geotecnia",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geomecanica",
    semestre: null,
    prerrequisitos: ["3007456"],
    whatsapp: ""
  },
  {
    codigo: "3011042",
    nombre: "Geomecánica Minera",
    creditos: 3,
    obligatoria: false,
    agrupacion: "geomecanica",
    semestre: null,
    prerrequisitos: ["3007720", "3007712", "3007713"],
    whatsapp: ""
  },

  // --- Beneficio de Minerales y Metalurgia ---
  {
    codigo: "3010478",
    nombre: "Termodinámica General",
    creditos: 3,
    obligatoria: true,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: 5,
    prerrequisitos: ["1000019-M"],
    whatsapp: ""
  },
  {
    codigo: "3009302",
    nombre: "Mineralurgia",
    creditos: 3,
    obligatoria: true,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: 6,
    prerrequisitos: ["3010478"],
    whatsapp: ""
  },
  {
    codigo: "3010690",
    nombre: "Metalurgia Extractiva",
    creditos: 3,
    obligatoria: true,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: 7,
    prerrequisitos: ["3009302"],
    whatsapp: ""
  },
  {
    codigo: "3007483",
    nombre: "Balances de Materia y Energía en Procesos Metalúrgicos",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3010478"],
    whatsapp: ""
  },
  {
    codigo: "3007580",
    nombre: "Pirometalurgia",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3010690"],
    whatsapp: ""
  },
  {
    codigo: "3008658",
    nombre: "Flotación de Minerales",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3009302"],
    whatsapp: ""
  },
  {
    codigo: "3008198",
    nombre: "Química Metalúrgica",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3006829"],
    whatsapp: ""
  },
  {
    codigo: "3009300",
    nombre: "Diseño y Dimensionamiento de Equipos de Minería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3007712"],
    whatsapp: ""
  },
  {
    codigo: "3009668",
    nombre: "Hidrometalurgia",
    creditos: 4,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3010690"],
    whatsapp: ""
  },
  {
    codigo: "3009770",
    nombre: "Electrometalurgia",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3010690"],
    whatsapp: ""
  },
  {
    codigo: "3007724",
    nombre: "Beneficio de Minerales",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3009302"],
    whatsapp: ""
  },
  {
    codigo: "3009707",
    nombre: "Electroquímica Metalúrgica",
    creditos: 4,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3010690"],
    whatsapp: ""
  },
  {
    codigo: "3010429",
    nombre: "Tópicos Especiales en Beneficio de Minerales",
    creditos: 3,
    obligatoria: false,
    agrupacion: "beneficio-minerales-metalurgia",
    semestre: null,
    prerrequisitos: ["3010690"],
    whatsapp: ""
  },

  // --- Tecnología Minera ---
  {
    codigo: "3007716",
    nombre: "Perforación y Fragmentación de Rocas",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 5,
    prerrequisitos: ["3007456"],
    whatsapp: ""
  },
  {
    codigo: "3007720",
    nombre: "Sostenimiento de Minas",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 6,
    prerrequisitos: ["3007456"],
    whatsapp: ""
  },
  {
    codigo: "3008748",
    nombre: "Planeamiento Minero",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 9,
    prerrequisitos: ["3009301"],
    whatsapp: ""
  },
  {
    codigo: "3010428",
    nombre: "Transporte Minero",
    creditos: 2,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 6,
    prerrequisitos: ["3007716"],
    whatsapp: ""
  },
  {
    codigo: "3007700",
    nombre: "Ambientes Mineros",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 8,
    prerrequisitos: ["3006960"],
    whatsapp: ""
  },
  {
    codigo: "3007712",
    nombre: "Minería de Superficie",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 7,
    prerrequisitos: ["3007456", "3010428"],
    whatsapp: ""
  },
  {
    codigo: "3007713",
    nombre: "Minería Subterránea",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 7,
    prerrequisitos: ["3007720", "3007712"],
    whatsapp: ""
  },
  {
    codigo: "3007717",
    nombre: "Práctica de Campo II",
    creditos: 1,
    obligatoria: true,
    agrupacion: "tecnologia-minera",
    semestre: 9,
    prerrequisitos: ["3007712", "3007722"],
    whatsapp: ""
  },
  {
    codigo: "3008602",
    nombre: "Introducción al Control Minero-Metalúrgico",
    creditos: 3,
    obligatoria: false,
    agrupacion: "tecnologia-minera",
    semestre: null,
    prerrequisitos: ["3010478"],
    whatsapp: ""
  },
  {
    codigo: "3009031",
    nombre: "Simulación Minero-Metalúrgica",
    creditos: 3,
    obligatoria: false,
    agrupacion: "tecnologia-minera",
    semestre: null,
    prerrequisitos: ["3010690"],
    whatsapp: ""
  },
  {
    codigo: "3010534",
    nombre: "Explotación de Canteras",
    creditos: 3,
    obligatoria: false,
    agrupacion: "tecnologia-minera",
    semestre: null,
    prerrequisitos: ["3007712"],
    whatsapp: ""
  },
  {
    codigo: "3008659",
    nombre: "Legislación Minera",
    creditos: 3,
    obligatoria: false,
    agrupacion: "tecnologia-minera",
    semestre: null,
    prerrequisitos: ["3007476"],
    whatsapp: ""
  },
  {
    codigo: "3009361",
    nombre: "Tópicos Especiales en Minería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "tecnologia-minera",
    semestre: null,
    prerrequisitos: ["3007712"],
    whatsapp: ""
  },

  // --- Proyectos en Ingeniería ---
  {
    codigo: "3010408",
    nombre: "Fundamentos de Proyectos en Ingeniería",
    creditos: 3,
    obligatoria: true,
    agrupacion: "proyectos-ingenieria",
    semestre: 4,
    prerrequisitos: ["3007476"],
    whatsapp: ""
  },
  {
    codigo: "3010407",
    nombre: "Estructuración y Evaluación de Proyectos de Ingeniería",
    creditos: 3,
    obligatoria: true,
    agrupacion: "proyectos-ingenieria",
    semestre: 7,
    prerrequisitos: ["3010408"],
    whatsapp: ""
  },
  {
    codigo: "3010439",
    nombre: "Proyecto Integrado de Ingeniería",
    creditos: 4,
    obligatoria: true,
    agrupacion: "proyectos-ingenieria",
    semestre: 9,
    prerrequisitos: ["3010407"],
    whatsapp: ""
  },

  // --- Área Integradora ---
  {
    codigo: "3007476",
    nombre: "Introducción a la Ingeniería de Minas y Metalurgia",
    creditos: 1,
    obligatoria: true,
    agrupacion: "area-integradora",
    semestre: 1,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3007704",
    nombre: "Economía de Minas",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3007712", "3007713"],
    whatsapp: ""
  },
  {
    codigo: "3007723",
    nombre: "Cierre de Minas",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3008748", "3007712"],
    whatsapp: ""
  },
  {
    codigo: "3008661",
    nombre: "Sistemas de Gestión Aplicados a la Minería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3007712"],
    whatsapp: ""
  },
  {
    codigo: "3010102",
    nombre: "Desarrollo Sostenible y Minería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3007713", "3007712"],
    whatsapp: ""
  },
  {
    codigo: "3007022",
    nombre: "Ecología General",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "1000009-M",
    nombre: "Biología General",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3010533",
    nombre: "Estimación de Costos en Minería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3009224",
    nombre: "Ética en la Profesionalización de Ingenieros",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3010291",
    nombre: "Introducción a la Seguridad Minera",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3010674",
    nombre: "Estrategias de Gestión y Gerencia de Proyectos en Ingeniería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3010407"],
    whatsapp: ""
  },
  {
    codigo: "3010537",
    nombre: "Gestión de Proyectos de Desarrollo y Metodología General Ajustada",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3010407"],
    whatsapp: ""
  },
  {
    codigo: "3010668",
    nombre: "Proyectos de Innovación y Desarrollo",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3010407"],
    whatsapp: ""
  },
  {
    codigo: "3010669",
    nombre: "Toma de Decisión para el Diseño en Ingeniería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3010407"],
    whatsapp: ""
  },
  {
    codigo: "3010535",
    nombre: "Fundamentos de Ciclo de Vida para Ingeniería",
    creditos: 3,
    obligatoria: false,
    agrupacion: "area-integradora",
    semestre: null,
    prerrequisitos: ["3010439"],
    whatsapp: ""
  },

  // --- Trabajo de Grado ---
  {
    codigo: "3007480",
    nombre: "Trabajo de Grado",
    creditos: 6,
    obligatoria: true,
    agrupacion: "trabajo-de-grado",
    semestre: 10,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3010681",
    nombre: "Práctica de Extensión",
    creditos: 6,
    obligatoria: false,
    agrupacion: "trabajo-de-grado",
    semestre: null,
    prerrequisitos: [],
    whatsapp: ""
  },
  {
    codigo: "3007481",
    nombre: "Cursos de Posgrado",
    creditos: 6,
    obligatoria: false,
    agrupacion: "trabajo-de-grado",
    semestre: null,
    prerrequisitos: [],
    whatsapp: ""
  }
];

fs.writeFileSync(path.join(__dirname, '../data/malla/componentes.json'), JSON.stringify(componentesData, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, '../data/malla/plan.json'), JSON.stringify(planData, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, '../data/malla/asignaturas.json'), JSON.stringify(asignaturasData, null, 2), 'utf-8');

console.log('Malla files successfully generated!');
