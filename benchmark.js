const { performance } = require('perf_hooks');
const fs = require('fs');

// Mock DOM Environment
class Element {
  constructor(tag) {
    this.tag = tag;
    this.innerHTML = '';
    this.className = '';
    this.children = [];
    this.style = {
      setProperty: () => {}
    };
    this.classList = {
      add: () => {},
      remove: () => {},
      contains: () => false
    };
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener() {}

  closest() {
    return new Element('div');
  }

  querySelector() {
    return new Element('div');
  }

  querySelectorAll() {
    return [];
  }
}

class DocumentFragment {
  constructor() {
    this.children = [];
  }
  appendChild(child) {
    this.children.push(child);
  }
}

const mockDocument = {
  getElementById: (id) => new Element('div'),
  createElement: (tag) => new Element(tag),
  createDocumentFragment: () => new DocumentFragment(),
  addEventListener: () => {},
  body: { style: { overflow: '' }, appendChild: () => {} },
  querySelectorAll: () => []
};

global.document = mockDocument;

global.WORKOUT_TYPES = {
  fitness: { label: 'Fitness', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', icon: '🏋️' },
  swimming: { label: 'Yüzme', color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', icon: '🏊' },
  running: { label: 'Koşu', color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)', icon: '🏃' },
  rest: { label: 'Dinlenme', color: '#94a3b8', bg: 'rgba(148,163,184,0.10)', border: 'rgba(148,163,184,0.3)', icon: '😴' }
};

global.WEEKLY_SCHEDULE = [
  { day: 'Pzt', workout: 'rest', classes: [{name: 'C1', time: '10'}], fitnessDay: null },
  { day: 'Sal', workout: 'fitness', classes: [{name: 'C2', time: '11'}], fitnessDay: 1 },
  { day: 'Çar', workout: 'running', classes: [], fitnessDay: null },
  { day: 'Per', workout: 'fitness', classes: [{name: 'C3', time: '12'}], fitnessDay: 2 },
  { day: 'Cum', workout: 'swimming', classes: [], fitnessDay: null },
  { day: 'Cmt', workout: 'fitness', classes: [], fitnessDay: 3 },
  { day: 'Paz', workout: 'swimming', classes: [], fitnessDay: null },
];

global.FITNESS_PROGRAMS = {};
global.getApiKey = () => '';
global.unlockApp = () => {};
global.getSchedule = () => global.WEEKLY_SCHEDULE;
global.getFitnessPrograms = () => global.FITNESS_PROGRAMS;

// Load app.js code
const appCode = fs.readFileSync('./app.js', 'utf8');

// We evaluate the code in current context
// Since app.js doesn't export, evaluating it directly adds functions to global scope
eval(appCode);

// Run benchmark
function runBenchmark() {
  const ITERATIONS = 10000;

  // Warmup
  for(let i=0; i<100; i++) {
    renderWeeklyGrid();
  }

  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    renderWeeklyGrid();
  }
  const end = performance.now();

  console.log(`RenderWeeklyGrid benchmark (${ITERATIONS} iterations):`);
  console.log(`Total time: ${(end - start).toFixed(2)} ms`);
  console.log(`Average time per call: ${((end - start) / ITERATIONS).toFixed(4)} ms`);
}

runBenchmark();
