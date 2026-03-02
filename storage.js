// ==========================================
// Veri Katmanı — localStorage Yönetimi
// ==========================================

const STORAGE_KEYS = {
    schedule: 'ajanda_weekly_schedule',
    fitness: 'ajanda_fitness_programs',
    apiKey: 'ajanda_gemini_api_key'
};

// ---------- Schedule ----------
function getSchedule() {
    const stored = localStorage.getItem(STORAGE_KEYS.schedule);
    if (stored) {
        try { return JSON.parse(stored); }
        catch { /* fallthrough */ }
    }
    return structuredClone(DEFAULT_WEEKLY_SCHEDULE);
}

function saveSchedule(schedule) {
    localStorage.setItem(STORAGE_KEYS.schedule, JSON.stringify(schedule));
}

// ---------- Fitness Programs ----------
function getFitnessPrograms() {
    const stored = localStorage.getItem(STORAGE_KEYS.fitness);
    if (stored) {
        try { return JSON.parse(stored); }
        catch { /* fallthrough */ }
    }
    return structuredClone(DEFAULT_FITNESS_PROGRAMS);
}

function saveFitnessPrograms(programs) {
    localStorage.setItem(STORAGE_KEYS.fitness, JSON.stringify(programs));
}

// ---------- API Key ----------
function getApiKey() {
    return localStorage.getItem(STORAGE_KEYS.apiKey) || '';
}

function saveApiKey(key) {
    localStorage.setItem(STORAGE_KEYS.apiKey, key.trim());
}

// ---------- Reset ----------
function resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.schedule);
    localStorage.removeItem(STORAGE_KEYS.fitness);
}
