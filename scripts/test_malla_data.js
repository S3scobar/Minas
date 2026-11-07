const fs = require('fs');

const plan = JSON.parse(fs.readFileSync('data/malla/plan.json', 'utf8'));
const componentes = JSON.parse(fs.readFileSync('data/malla/componentes.json', 'utf8'));
const asignaturas = JSON.parse(fs.readFileSync('data/malla/asignaturas.json', 'utf8'));

console.log('--- VALIDATING MALLA DATA ---');
const asigMap = new Map();
asignaturas.forEach(a => asigMap.set(a.codigo, a));

let totalCreditosPlan = 0;
const semCreds = [];

plan.forEach(sem => {
  let sCreds = 0;
  sem.items.forEach(item => {
    if (item.tipo === 'asignatura') {
      const asig = asigMap.get(item.codigo);
      if (!asig) {
        console.error(`[ERROR] Asignatura ${item.codigo} en semestre ${sem.semestre} no existe en asignaturas.json`);
      } else {
        sCreds += asig.creditos;
      }
    } else if (item.tipo === 'bolsa') {
      sCreds += item.creditos;
    }
  });
  semCreds.push({ semestre: sem.semestre, creditos: sCreds, esperado: sem.creditos });
  totalCreditosPlan += sCreds;
});

console.log('Semestres:', semCreds);
console.log('Total créditos plan calculados:', totalCreditosPlan);
console.log('Total créditos esperados: 180');

// Validate prerequisites
let prereqCount = 0;
asignaturas.forEach(asig => {
  if (asig.prerrequisitos && Array.isArray(asig.prerrequisitos)) {
    asig.prerrequisitos.forEach(pr => {
      prereqCount++;
      if (!pr.includes('%') && !asigMap.has(pr)) {
        console.warn(`[WARN] Prerequisito ${pr} de materia ${asig.codigo} (${asig.nombre}) no está en asignaturas.json`);
      }
    });
  }
});
console.log('Total prerrequisitos verificados:', prereqCount);

// Validate components and agrupaciones
const compIds = new Set(componentes.componentes.map(c => c.id));
const agrupIds = new Set(componentes.agrupaciones.map(a => a.id));

let compErrors = 0;
asignaturas.forEach(asig => {
  if (!agrupIds.has(asig.agrupacion)) {
    console.error(`[ERROR] Agrupación ${asig.agrupacion} de materia ${asig.codigo} no existe en componentes.json`);
    compErrors++;
  }
});
console.log('Agrupación / Component errors:', compErrors);
console.log('Validation finished.');
